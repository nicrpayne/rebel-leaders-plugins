import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";
import type { RankingRationale, GravitasSignal } from "@/lib/codex-ranking";

/* ─────────────────────────────────────────────
   CABINET DECK — V7
   - 4 pager screens with TICKER TAPE mode (scrolls across all 4 as one strip)
   - Cartridge slot with insert/eject animations
   - 3 invisible button hit zones (no visual overlays — user will supply button images)
   - 3 indicator lights above buttons (CSS amber glow)
   - Full ritual: Load → Scan → Read → Eject
   - Ticker tape triggers on load, scan complete, and idle ambient
   ───────────────────────────────────────────── */

const SPINE_CDN_OLD = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine_transparent_95539dfa.png";
const SPINE_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/CsmUKCVLeilIqNNJ.png";
const CABINET_HERO_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/fLHdQJImZxvFSNJX.webp";

/* ── Pager screen positions (% of hero image) ── */
const PAGER_SCREENS = [
  { id: "identity",     left: 22.75, top: 17.6, width: 10.85, height: 10.625,
    transform: "perspective(350px) rotateY(-3.5deg) rotateX(-0.5deg)" },
  { id: "relationship", left: 36.9, top: 17.65, width: 11.1, height: 11.1,
    transform: "perspective(500px) rotateY(-1.5deg) rotateX(-0.3deg)" },
  { id: "vision",       left: 51.2, top: 17.43, width: 11.3, height: 10.9,
    transform: "perspective(500px) rotateY(1.5deg) rotateX(-0.3deg)" },
  { id: "culture",      left: 65.8, top: 17.3, width: 11.2, height: 10.8,
    transform: "perspective(350px) rotateY(3.5deg) rotateX(-0.5deg)" },
];

/* ── Button hit zones (invisible, generous click area — % of hero image) ── */
const BUTTON_HITZONES = {
  read:  { left: 72.0, top: 64.0, width: 5.4, height: 17.0 },
  scan:  { left: 78.2, top: 64.0, width: 5.2, height: 17.0 },
  eject: { left: 84.2, top: 64.0, width: 4.8, height: 17.0 },
};

/* ── Indicator light positions (% of hero image) — above each button ── */
const INDICATOR_LIGHTS = [
  { left: 73.4, top: 66.2, width: 2.8, height: 4.0 },  // above READ
  { left: 79.7, top: 66.4, width: 2.6, height: 3.8 },  // above SCAN
  { left: 85.7, top: 66.5, width: 2.4, height: 3.7 },  // above EJECT
];

/* ── Cartridge slot position (% of hero image) ── */
const SLOT = { left: 28.8, top: 59.2, width: 31.2, height: 18.8 };

/* ── Deck state machine ── */
type DeckPhase = "idle" | "loaded" | "scanning" | "scanned";

/* ── Scanning animation text sequences ── */
const SCAN_SEQUENCE = [
  [{ line1: "SCANNING", line2: "..." }, { line1: "READING", line2: "HEADER..." }, { line1: "PARSING", line2: "METADATA" }, { line1: "STAND", line2: "BY..." }],
  [{ line1: "CATEGORY", line2: "FOUND" }, { line1: "ANALYZING", line2: "FIELD..." }, { line1: "CHECKING", line2: "CONTEXT" }, { line1: "ROUTING", line2: "DATA..." }],
  [{ line1: "DECODING", line2: "SIGNAL" }, { line1: "INTENSITY", line2: "CALC..." }, { line1: "MATCHING", line2: "PROFILE" }, { line1: "INDEXING", line2: "..." }],
];

/* ── Pager screen idle messages ── */
const IDLE_MESSAGES = [
  { line1: "AWAITING", line2: "SIGNAL..." },
  { line1: "STANDBY", line2: "MODE" },
  { line1: "NO DATA", line2: "RECEIVED" },
  { line1: "SYSTEM", line2: "READY" },
];

/* ── Ticker tape messages ── */
const IDLE_TICKER_MESSAGES = [
  ">>> CODEX RELAY NETWORK ACTIVE ... SIGNAL NOMINAL ... AWAITING INPUT >>>",
  ">>> ARCHIVE STATUS: ONLINE ... ALL SECTORS NOMINAL ... STANDING BY >>>",
  ">>> TRUST EQUATION MONITORING ... NO ANOMALIES DETECTED ... IDLE >>>",
  ">>> RELAY 01 CLEAR ... RELAY 02 CLEAR ... SYSTEM READY >>>",
];

interface GravitasScores {
  identity: number;
  relationship: number;
  vision: number;
  culture: number;
}

interface CabinetDeckProps {
  loadedEntry: CodexEntry | null;
  onEject: () => void;
  onRead: () => void;
  onRun: () => void;
  playSound: (type: "load" | "eject" | "click" | "buttonPress" | "buttonRelease" | "scanTone" | "scanComplete") => void;
  isReaderOpen: boolean;
  gravitasScores: GravitasScores | null;
  isReceivingSignal: boolean;
  bottleneckCategory: string | null;
  firstMove: string | null;
  rankingRationale: RankingRationale | null;
  gravitasSignalData: GravitasSignal | null;
}

/* ── Ticker Tape Sub-component ──
   Each screen renders its own TickerTape instance, but they all share the same
   `progress` value (0→1) driven by the parent. The parent uses a single
   requestAnimationFrame loop and passes progress down.

   The trick: we model a virtual strip that spans all 4 screens plus the gaps
   between them. The text starts off-screen to the RIGHT of screen 4 (rightmost)
   and scrolls LEFT, exiting off-screen to the LEFT of screen 1 (leftmost).

   Each screen knows its physical left-edge position (in % of the hero image).
   We use those real positions to compute where each screen's viewport sits
   within the virtual strip, so the text flows naturally through the gaps.
*/
function TickerTapeWindow({
  text,
  progress,
  screenLeftPct,
  screenWidthPct,
  stripLeftPct,
  stripRightPct,
}: {
  text: string;
  progress: number;          // 0→1 global animation progress
  screenLeftPct: number;     // this screen's left % in hero image
  screenWidthPct: number;    // this screen's width % in hero image
  stripLeftPct: number;      // leftmost screen's left edge %
  stripRightPct: number;     // rightmost screen's right edge %
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [localX, setLocalX] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const containerW = containerRef.current.offsetWidth;
    const textW = textRef.current.scrollWidth;

    // The virtual strip spans from stripLeftPct to stripRightPct of the hero.
    // We need to map percentages to pixels relative to the hero width.
    // But we only know our own container width and our own screen width %.
    // heroWidth ≈ containerW / (screenWidthPct / 100)
    const heroW = containerW / (screenWidthPct / 100);

    // Virtual strip in pixels
    const stripLeftPx = (stripLeftPct / 100) * heroW;
    const stripRightPx = (stripRightPct / 100) * heroW;
    const stripWidthPx = stripRightPx - stripLeftPx;

    // This screen's left edge in pixels (within the hero)
    const myLeftPx = (screenLeftPct / 100) * heroW;

    // Text starts fully off-screen right (at stripRightPx + some padding)
    // Text ends fully off-screen left (at stripLeftPx - textW - some padding)
    const startX = stripRightPx + textW * 0.1;  // start just past right edge
    const endX = stripLeftPx - textW * 1.1;      // end past left edge
    const totalTravel = startX - endX;

    // Current text left edge position in hero-pixel space
    const textLeftPx = startX - progress * totalTravel;

    // Convert to local coordinates (relative to this screen's left edge)
    const local = textLeftPx - myLeftPx;

    setLocalX(local);
  }, [progress, text, screenLeftPct, screenWidthPct, stripLeftPct, stripRightPct]);

  const textColor = "#33ff33";
  const glowColor = "0 0 8px rgba(51,255,51,0.6), 0 0 2px rgba(51,255,51,0.9)";

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden flex items-center"
      style={{
        fontFamily: 'var(--font-lcd)',
      }}
    >
      <div
        ref={textRef}
        className="whitespace-nowrap absolute"
        style={{
          color: textColor,
          textShadow: `${glowColor}, 0 0 6px rgba(70,255,120,0.22)`,
          fontSize: "clamp(10px, 1.8vw, 20px)",
          letterSpacing: "0.1em",
          left: 0,
          transform: localX !== null ? `translateX(${localX}px)` : 'translateX(200%)',
          willChange: 'transform',
        }}
      >
        {text}
      </div>
    </div>
  );
}

/* ── Pager Screen Sub-component (static two-line mode) ── */
function PagerScreen({
  line1,
  line2,
  isActive,
  isScanning,
  screenIndex,
}: {
  line1: string;
  line2: string;
  isActive: boolean;
  isScanning: boolean;
  screenIndex: number;
}) {
  const [showCursor, setShowCursor] = useState(true);
  const [flickerOpacity, setFlickerOpacity] = useState(1);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530 + screenIndex * 70);
    return () => clearInterval(interval);
  }, [screenIndex]);

  // Random flicker — each screen flickers independently
  useEffect(() => {
    const scheduleFlicker = () => {
      const delay = 6000 + Math.random() * 18000;
      const timer = setTimeout(() => {
        setFlickerOpacity(0.3 + Math.random() * 0.3);
        setTimeout(() => {
          setFlickerOpacity(1);
          if (Math.random() > 0.6) {
            setTimeout(() => {
              setFlickerOpacity(0.4);
              setTimeout(() => setFlickerOpacity(1), 50);
            }, 80);
          }
        }, 40 + Math.random() * 60);
        scheduleFlicker();
      }, delay);
      return timer;
    };
    const timer = scheduleFlicker();
    return () => clearTimeout(timer);
  }, []);

  const textColor = isActive ? "#33ff33" : "#22cc44";
  const glowColor = isActive
    ? "0 0 8px rgba(51,255,51,0.6), 0 0 2px rgba(51,255,51,0.9)"
    : "0 0 4px rgba(34,204,68,0.3), 0 0 1px rgba(34,204,68,0.6)";

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center overflow-hidden"
      style={{
        fontFamily: 'var(--font-lcd)',
        opacity: isScanning ? (flickerOpacity * (0.6 + Math.random() * 0.4)) : flickerOpacity,
        transition: flickerOpacity < 1 ? 'none' : 'opacity 0.15s ease',
        padding: '8% 10%',
      }}
    >
      <span
        className={cn(
          "relative z-10 block truncate uppercase leading-none",
          isScanning && "animate-pulse"
        )}
        style={{
          color: textColor,
          textShadow: `${glowColor}, 0 0 6px rgba(70,255,120,0.22)`,
          fontSize: "clamp(8px, 1.4vw, 16px)",
          letterSpacing: "0.08em",
        }}
      >
        {line1}
      </span>
      <span
        className={cn(
          "relative z-10 block truncate uppercase leading-none mt-[0.15em]",
          isScanning && "animate-pulse"
        )}
        style={{
          color: textColor,
          textShadow: glowColor,
          fontSize: "clamp(7px, 1.2vw, 14px)",
          letterSpacing: "0.06em",
        }}
      >
        {line2}
        <span
          style={{
            color: textColor,
            opacity: showCursor ? 0.9 : 0,
            transition: "opacity 0.08s",
            marginLeft: "1px",
            textShadow: glowColor,
          }}
        >
          _
        </span>
      </span>
    </div>
  );
}

/* ── Indicator Light Sub-component ── */
function IndicatorLight({ isOn, isPulsing }: { isOn: boolean; isPulsing: boolean }) {
  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none transition-all duration-500",
        isPulsing && "animate-pulse"
      )}
      style={{
        background: isOn
          ? "radial-gradient(circle at 40% 35%, #ffcc44 0%, #f59e0b 30%, #b45309 70%, #78350f 100%)"
          : "radial-gradient(circle at 40% 35%, #4a3a20 0%, #2a1f10 50%, #1a1208 100%)",
        boxShadow: isOn
          ? [
              "0 0 6px rgba(245,158,11,0.8)",
              "0 0 14px rgba(245,158,11,0.4)",
              "0 0 28px rgba(245,158,11,0.2)",
              "inset 0 -1px 2px rgba(0,0,0,0.3)",
              "inset 0 1px 1px rgba(255,255,255,0.3)",
            ].join(", ")
          : [
              "inset 0 -1px 2px rgba(0,0,0,0.4)",
              "inset 0 1px 1px rgba(255,255,255,0.05)",
            ].join(", "),
        opacity: isOn ? 1 : 0.6,
      }}
    />
  );
}

/* ── Screen LCD Background (shared by both ticker and static modes) ── */
function ScreenLCDBackground() {
  return (
    <>
      {/* LCD background */}
      <div
        className="absolute pointer-events-none rounded-[1px]"
        style={{
          inset: "-2px",
          background: "linear-gradient(170deg, #1a2a12 0%, #142210 25%, #0f1a0c 50%, #142210 75%, #1a2a12 100%)",
        }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          backgroundSize: "100% 4px",
          mixBlendMode: "multiply",
        }}
      />
      {/* Edge darkening */}
      <div
        className="absolute inset-0 pointer-events-none z-[15] rounded-[2px]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.15) 63%, rgba(0,0,0,0.42) 100%)",
          boxShadow: [
            "inset 0 0 24px rgba(0,0,0,0.6)",
            "inset 0 0 50px rgba(0,0,0,0.38)",
            "inset 0 11px 20px rgba(255,255,255,0.05)",
            "inset 0 -9px 16px rgba(0,0,0,0.4)",
          ].join(", "),
        }}
      />
      {/* Glass reflection */}
      <div
        className="absolute inset-0 pointer-events-none z-[16] rounded-[2px]"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 15%, rgba(255,255,255,0) 35%)",
          mixBlendMode: "screen",
          opacity: 0.55,
        }}
      />
    </>
  );
}

export default function CabinetDeck({
  loadedEntry,
  onEject,
  onRead,
  onRun,
  playSound,
  isReaderOpen,
  gravitasScores,
  isReceivingSignal,
  bottleneckCategory,
  firstMove,
  rankingRationale,
  gravitasSignalData,
}: CabinetDeckProps) {
  // Cartridge animation phases
  const [animPhase, setAnimPhase] = useState<"idle" | "inserting" | "loaded" | "ejecting">("idle");
  const [displayEntry, setDisplayEntry] = useState<CodexEntry | null>(null);
  const prevLoadedIdRef = useRef<string | undefined>(undefined);

  // Deck ritual state machine
  const [deckPhase, setDeckPhase] = useState<DeckPhase>("idle");
  const [scanStep, setScanStep] = useState(0);
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Ticker tape state
  const [tickerMode, setTickerMode] = useState(false);
  const [tickerText, setTickerText] = useState("");
  const [tickerProgress, setTickerProgress] = useState(0);
  const tickerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickerAnimRef = useRef<number>(0);
  const tickerStartRef = useRef<number>(0);
  const tickerDurationRef = useRef<number>(6000);

  // Compute the virtual strip bounds from screen positions (leftmost left edge to rightmost right edge)
  const stripLeftPct = PAGER_SCREENS[0].left;
  const stripRightPct = PAGER_SCREENS[PAGER_SCREENS.length - 1].left + PAGER_SCREENS[PAGER_SCREENS.length - 1].width;

  // Idle ticker — fires periodically when no cartridge is loaded
  const idleTickerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start a ticker crawl — single rAF loop drives all 4 screens
  const startTicker = useCallback((text: string, durationMs = 6000, onDone?: () => void) => {
    // Cancel any existing ticker
    if (tickerAnimRef.current) cancelAnimationFrame(tickerAnimRef.current);
    if (tickerTimeoutRef.current) clearTimeout(tickerTimeoutRef.current);

    setTickerText(text);
    setTickerMode(true);
    setTickerProgress(0);
    tickerDurationRef.current = durationMs;
    tickerStartRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - tickerStartRef.current;
      const p = Math.min(elapsed / durationMs, 1);
      setTickerProgress(p);
      if (p < 1) {
        tickerAnimRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete — settle back to static after a short pause
        tickerTimeoutRef.current = setTimeout(() => {
          setTickerMode(false);
          setTickerText("");
          onDone?.();
        }, 400);
      }
    };

    tickerAnimRef.current = requestAnimationFrame(animate);
  }, []);

  // Schedule idle ticker messages
  useEffect(() => {
    if (deckPhase !== "idle" || loadedEntry) {
      if (idleTickerRef.current) clearTimeout(idleTickerRef.current);
      return;
    }

    const scheduleIdle = () => {
      const delay = 15000 + Math.random() * 25000; // 15-40s between idle tickers
      idleTickerRef.current = setTimeout(() => {
        const msg = IDLE_TICKER_MESSAGES[Math.floor(Math.random() * IDLE_TICKER_MESSAGES.length)];
      startTicker(msg, 14000, () => {
        scheduleIdle();
        });
      }, delay);
    };

    // First idle ticker after a short delay
    idleTickerRef.current = setTimeout(() => {
      const msg = IDLE_TICKER_MESSAGES[Math.floor(Math.random() * IDLE_TICKER_MESSAGES.length)];
startTicker(msg, 14000, () => {
          scheduleIdle();
        });
      }, 5000);

    return () => {
      if (idleTickerRef.current) clearTimeout(idleTickerRef.current);
    };
  }, [deckPhase, loadedEntry, startTicker]);

  // Handle cartridge load/eject animations
  useEffect(() => {
    const currentId = loadedEntry?.id;
    const prevId = prevLoadedIdRef.current;

    if (loadedEntry && currentId !== prevId) {
      setDisplayEntry(loadedEntry);
      setAnimPhase("inserting");
      setScanStep(0);

      // Set deck phase immediately so SCAN button is available right away
      setDeckPhase("loaded");

      // Ticker on load (purely visual — does not gate button availability)
      const title = loadedEntry.title?.toUpperCase() || "UNKNOWN";
      const cat = loadedEntry.flywheel_node?.[0]?.toUpperCase() || "CODEX";
      // Include match telemetry if ranking rationale is available
      if (rankingRationale && gravitasSignalData) {
        const matchPct = Math.min(Math.round((rankingRationale.total / 100) * 100), 99);
        const leakLabel = gravitasSignalData.leak?.toUpperCase() || "UNKNOWN";
        startTicker(
          `>>> CARTRIDGE LOADED: ${title} ... ${cat} CLASS ... MATCH ${matchPct}% ... LEAK: ${leakLabel} ... PRESS SCAN TO ANALYZE >>>`,
          13000
        );
      } else {
        startTicker(
          `>>> CARTRIDGE LOADED: ${title} ... ${cat} CLASS ... AWAITING SCAN ... PRESS SCAN TO ANALYZE >>>`,
          12000
        );
      }

      const timer = setTimeout(() => setAnimPhase("loaded"), 400);
      prevLoadedIdRef.current = currentId;
      return () => clearTimeout(timer);
    } else if (!loadedEntry && prevId) {
      setAnimPhase("ejecting");
      setDeckPhase("idle");
      setScanStep(0);
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);

      // Ticker on eject
      startTicker(">>> CARTRIDGE EJECTED ... DECK CLEAR ... STANDING BY >>>", 10000);

      const timer = setTimeout(() => {
        setAnimPhase("idle");
        setDisplayEntry(null);
      }, 450);
      prevLoadedIdRef.current = undefined;
      return () => clearTimeout(timer);
    }
  }, [loadedEntry, startTicker, rankingRationale, gravitasSignalData]);

  // SCAN animation sequence
  const handleScan = useCallback(() => {
    if (!loadedEntry || deckPhase !== "loaded") return;

    // VHS cassette button press (recorded sample)
    playSound("buttonPress");

    // Start scan tone (sustained for full scan duration)
    setTimeout(() => playSound("scanTone"), 200);

    setDeckPhase("scanning");
    setScanStep(0);
    setTickerMode(false); // cancel any running ticker

    // Cycle through scan animation steps
    let step = 0;
    const totalSteps = SCAN_SEQUENCE.length;
    const stepDuration = 600;

    const advanceStep = () => {
      step++;
      if (step < totalSteps) {
        setScanStep(step);
        scanTimerRef.current = setTimeout(advanceStep, stepDuration);
      } else {
        // Scan complete — fire ticker with results, then settle to scanned state
        const cat = loadedEntry.category?.toUpperCase() || "UNKNOWN";
        const node = loadedEntry.flywheel_node?.[0]?.toUpperCase() || "—";
        const diff = loadedEntry.difficulty || 0;
        const diffLabel = diff <= 2 ? "LOW" : diff <= 3 ? "MEDIUM" : "HIGH";

        // Scan complete sound
        playSound("scanComplete");

        // Set deck phase immediately so READ button is available right away
        setDeckPhase("scanned");
        setScanStep(0);

        // Ticker on scan complete — include diagnostic telemetry when available
        const nodeSegment = node && node !== cat ? ` ... ${node}` : "";
        if (rankingRationale && gravitasSignalData) {
          const matchPct = Math.min(Math.round((rankingRationale.total / 100) * 100), 99);
          const leakCount = rankingRationale.leakOverlapDetails?.length || 0;
          const forceCount = rankingRationale.forceOverlapDetails?.length || 0;
          const topLeak = rankingRationale.leakOverlapDetails?.[0]?.toUpperCase() || "";
          const bottleneck = gravitasSignalData.leak?.toUpperCase() || "";
          startTicker(
            `>>> SCAN COMPLETE ... ${cat}${nodeSegment} ... FIT ${matchPct}% ... ${leakCount} LEAK MATCH${leakCount !== 1 ? "ES" : ""} ... ${forceCount} FORCE ALIGN${forceCount !== 1 ? "S" : ""} ... BOTTLENECK: ${bottleneck} ... PROTOCOL READY ... PRESS READ >>>`,
            15000
          );
        } else {
          const context = loadedEntry.context_tags?.[0]?.toUpperCase().replace(/_/g, " ") || "GENERAL";
          startTicker(
            `>>> SCAN COMPLETE ... ${cat}${nodeSegment} ... INTENSITY ${diff} ${diffLabel} ... ${context} ... PROTOCOL READY ... PRESS READ >>>`,
            14000
          );
        }
      }
    };

    scanTimerRef.current = setTimeout(advanceStep, stepDuration);
  }, [loadedEntry, deckPhase, startTicker, rankingRationale, gravitasSignalData, playSound]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
      if (tickerTimeoutRef.current) clearTimeout(tickerTimeoutRef.current);
      if (idleTickerRef.current) clearTimeout(idleTickerRef.current);
    };
  }, []);

  /* ── Build pager screen messages based on deck phase (static mode) ── */
  const getSeverityLabel = (score: number) =>
    score < 50 ? "CRITICAL" : score < 60 ? "LOW" : score < 70 ? "WATCH" : score < 80 ? "STABLE" : "STRONG";

  // Short codenames for archetype pager display
  const archetypeShortName = (name: string | null | undefined): string => {
    if (!name) return "";
    const upper = name.toUpperCase();
    if (upper.includes("OXYGEN")) return "OXYGEN";
    if (upper.includes("ALIGNMENT")) return "ALIGNMENT";
    if (upper.includes("WEIGHT")) return "WEIGHT REDIST";
    if (upper.includes("HORIZON")) return "HORIZON";
    if (upper.includes("LEGACY")) return "LEGACY";
    if (upper.includes("RESISTANCE")) return "RESISTANCE";
    if (upper.includes("FIELD")) return "FIELD MANUAL";
    return upper.replace(/^THE\s+/i, "").substring(0, 13);
  };

  const getPagerMessages = useCallback(() => {
    if (isReceivingSignal) {
      const fmDisplay = archetypeShortName(firstMove);
      // Show actual leak + force from signal data if available
      const leakDisplay = gravitasSignalData?.leak?.toUpperCase() || "SCAN";
      const forceDisplay = gravitasSignalData?.force?.toUpperCase() || "";
      return [
        { line1: "INCOMING", line2: "SIGNAL!" },
        { line1: "LEAK:", line2: leakDisplay },
        { line1: fmDisplay ? "ARCHETYPE:" : "LOADING", line2: fmDisplay || "PROTOCOL..." },
        { line1: forceDisplay ? "FORCE:" : "ROUTING", line2: forceDisplay || "DATA..." },
      ];
    }

    switch (deckPhase) {
      case "loaded": {
        const cat = loadedEntry?.flywheel_node?.[0]?.toUpperCase() || "CODEX";
        const title = loadedEntry?.title?.substring(0, 14).toUpperCase() || "UNKNOWN";
        // If we have rationale, show match score and top leak overlap
        if (rankingRationale) {
          const matchPct = Math.min(Math.round((rankingRationale.total / 100) * 100), 99);
          const topLeak = rankingRationale.leakOverlapDetails?.[0]?.substring(0, 14).toUpperCase() || "—";
          return [
            { line1: "CARTRIDGE", line2: "LOADED" },
            { line1: title, line2: cat },
            { line1: "MATCH:", line2: `${matchPct}%` },
            { line1: "SCAN TO", line2: "ANALYZE" },
          ];
        }
        return [
          { line1: "CARTRIDGE", line2: "LOADED" },
          { line1: title, line2: cat },
          { line1: "AWAITING", line2: "SCAN..." },
          { line1: "READY", line2: "FOR SCAN" },
        ];
      }

      case "scanning": {
        const seq = SCAN_SEQUENCE[scanStep] || SCAN_SEQUENCE[0];
        return seq;
      }

      case "scanned": {
        if (!loadedEntry) return IDLE_MESSAGES;
        // If we have full rationale from ranking, show detailed telemetry
        if (rankingRationale && gravitasSignalData) {
          const matchPct = Math.min(Math.round((rankingRationale.total / 100) * 100), 99);
          const leakCount = rankingRationale.leakOverlapDetails?.length || 0;
          const forceCount = rankingRationale.forceOverlapDetails?.length || 0;
          const bottleneckLabel = gravitasSignalData.leak?.toUpperCase() || "—";
          const sevScore = gravitasSignalData[gravitasSignalData.leak?.toLowerCase() as keyof GravitasSignal] as number;
          const sevLabel = typeof sevScore === "number" ? getSeverityLabel(sevScore) : "—";
          return [
            { line1: bottleneckLabel, line2: sevLabel },
            { line1: `${leakCount} LEAK${leakCount !== 1 ? "S" : ""}`, line2: "MATCHED" },
            { line1: `${forceCount} FORCE${forceCount !== 1 ? "S" : ""}`, line2: "ALIGNED" },
            { line1: "FIT:", line2: `${matchPct}%` },
          ];
        }
        // Fallback: basic cartridge info
        const cat = loadedEntry.category?.toUpperCase() || "UNKNOWN";
        const diff = loadedEntry.difficulty || 0;
        const diffLabel = diff <= 2 ? "LOW" : diff <= 3 ? "MEDIUM" : "HIGH";
        const context = loadedEntry.context_tags?.[0]?.toUpperCase().replace(/_/g, " ") || "GENERAL";
        return [
          { line1: "CATEGORY", line2: cat },
          { line1: "INTENSITY", line2: `${diff} ${diffLabel}` },
          { line1: "CONTEXT", line2: context },
          { line1: "PROTOCOL", line2: "READY" },
        ];
      }

      default: {
        // Idle state: show GRAVITAS dimension scores with severity labels
        if (gravitasSignalData) {
          const dims = ["identity", "relationship", "vision", "culture"] as const;
          return dims.map(d => {
            const score = Math.round(gravitasSignalData[d] as number);
            const label = getSeverityLabel(score);
            return { line1: d.toUpperCase(), line2: `${score} ${label}` };
          });
        }
        if (gravitasScores) {
          const dims = ["identity", "relationship", "vision", "culture"] as const;
          return dims.map(d => {
            const score = gravitasScores[d];
            const status = score < 50 ? "LOW" : score < 65 ? "WATCH" : score < 80 ? "GOOD" : "STRONG";
            return { line1: d.toUpperCase(), line2: `${score} ${status}` };
          });
        }
        return IDLE_MESSAGES;
      }
    }
  }, [isReceivingSignal, loadedEntry, gravitasScores, gravitasSignalData, rankingRationale, bottleneckCategory, firstMove, deckPhase, scanStep]);

  const pagerMessages = getPagerMessages();
  const isActive = deckPhase !== "idle" || !!gravitasScores || isReceivingSignal;
  const isScanning = deckPhase === "scanning";

  // Button enabled states
  const canRead = deckPhase === "scanned" && !!loadedEntry;
  const canScan = deckPhase === "loaded" && !!loadedEntry;
  const canEject = !!loadedEntry;

  // Indicator light states
  const lights = [
    { isOn: canRead || isReaderOpen, isPulsing: isReaderOpen || deckPhase === "scanned" },
    { isOn: isScanning || deckPhase === "scanned", isPulsing: isScanning },
    { isOn: !!loadedEntry, isPulsing: false },
  ];

  return (
    <div className="relative w-full select-none">
      {/* ── HERO IMAGE ── */}
      <img
        src={CABINET_HERO_CDN}
        alt="The Codex Cabinet"
        className="w-full h-auto block"
        draggable={false}
      />

      {/* ── PAGER SCREEN OVERLAYS ── */}
      {PAGER_SCREENS.map((screen, idx) => (
        <div
          key={screen.id}
          className="absolute overflow-hidden"
          style={{
            left: `${screen.left}%`,
            top: `${screen.top}%`,
            width: `${screen.width}%`,
            height: `${screen.height}%`,
            transform: screen.transform,
            transformOrigin: "center center",
            borderRadius: "3px",
          }}
        >
          {/* LCD background layer (always present) */}
          <ScreenLCDBackground />

          {/* Content layer: ticker tape OR static messages */}
          {tickerMode ? (
            <TickerTapeWindow
              text={tickerText}
              progress={tickerProgress}
              screenLeftPct={screen.left}
              screenWidthPct={screen.width}
              stripLeftPct={stripLeftPct}
              stripRightPct={stripRightPct}
            />
          ) : (
            <PagerScreen
              line1={pagerMessages[idx]?.line1 || ""}
              line2={pagerMessages[idx]?.line2 || ""}
              isActive={isActive}
              isScanning={isScanning}
              screenIndex={idx}
            />
          )}
        </div>
      ))}

      {/* ── CARTRIDGE SLOT OVERLAY ── */}
      <div
        className="absolute"
        style={{
          left: `${SLOT.left}%`,
          top: `${SLOT.top}%`,
          width: `${SLOT.width}%`,
          height: `${SLOT.height}%`,
          overflow: 'visible',
        }}
      >
        {displayEntry && (
          <div
            className="absolute z-10"
            style={{
              left: '65%',
              top: '80%',
              transform: 'translate(-50%, -50%)',
              width: '171%',
              height: '169%',
            }}
          >
          <div
            key={animPhase === "ejecting" ? displayEntry.id : displayEntry.id + "-active"}
            className={cn(
              "w-full h-full flex items-center justify-center transform-gpu will-change-transform",
              animPhase === "inserting" && "animate-in fade-in zoom-in-90 duration-300 ease-out",
              animPhase === "ejecting" && "animate-out fade-out zoom-out-90 duration-300 ease-in fill-mode-forwards",
              animPhase === "loaded" && "opacity-100 scale-100"
            )}
          >
            <img
              src={SPINE_CDN}
              alt="Cartridge Spine"
              className="absolute inset-0 w-full h-full object-fill drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            />
            {/* Text overlay — positioned on the parchment label area (left ~78% of cartridge) */}
            <div
              className="absolute top-0 flex flex-col items-center justify-center text-center"
              style={{ left: '18%', width: '62%', height: '100%', marginTop: '-1%' }}
            >
              <h3
                className="uppercase leading-tight px-2 line-clamp-3"
                style={{
                  fontFamily: "'Courier New', 'Courier', monospace",
                  fontSize: 'clamp(9px, 1.25vw, 14px)',
                  fontWeight: 900,
                  color: '#1a120a',
                  letterSpacing: '0.08em',
                  textShadow: '0 0 2px rgba(230,220,195,0.8), 0 1px 0 rgba(255,255,255,0.4)',
                  wordBreak: 'break-word',
                }}
              >
                {displayEntry.title}
              </h3>
              <span
                className="mt-0"
                style={{
                  fontFamily: "'Courier New', 'Courier', monospace",
                  fontSize: 'clamp(6px, 0.8vw, 10px)',
                  fontWeight: 700,
                  color: 'rgba(42,29,16,0.7)',
                  letterSpacing: '0.08em',
                  textShadow: '0 0 2px rgba(230,220,195,0.8)',
                }}
              >
                {displayEntry.id}
              </span>
            </div>
          </div>
          </div>
        )}
      </div>

      {/* ── INDICATOR LIGHTS (above buttons) ── */}
      {INDICATOR_LIGHTS.map((light, idx) => (
        <div
          key={`light-${idx}`}
          className="absolute"
          style={{
            left: `${light.left}%`,
            top: `${light.top}%`,
            width: `${light.width}%`,
            height: `${light.height}%`,
          }}
        >
          <IndicatorLight isOn={lights[idx].isOn} isPulsing={lights[idx].isPulsing} />
        </div>
      ))}

      {/* ── BUTTON HIT ZONES (invisible, generous click areas) ── */}
      {/* No visual overlays — baked-in button images show through. User will supply corrected button images later. */}
      {/* READ */}
      <button
        onClick={() => { if (canRead) onRead(); }}
        disabled={!canRead}
        className={cn(
          "absolute z-40 transition-all",
          canRead ? "cursor-pointer active:scale-95" : "cursor-default"
        )}
        style={{
          left: `${BUTTON_HITZONES.read.left}%`,
          top: `${BUTTON_HITZONES.read.top}%`,
          width: `${BUTTON_HITZONES.read.width}%`,
          height: `${BUTTON_HITZONES.read.height}%`,
          background: "transparent",
          border: "none",
          outline: "none",
          padding: 0,
        }}
        title="READ PROTOCOL"
      >
        <img
          src="/labels/label_read.png"
          alt="READ"
          className="absolute pointer-events-none select-none"
          style={{
            top: '62%',
            left: '0%',
            width: '140%',
            height: 'auto',
            transform: 'rotate(-2.1deg)',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))',
          }}
        />
      </button>
      {/* SCAN */}
      <button
        onClick={handleScan}
        disabled={!canScan}
        className={cn(
          "absolute z-40 transition-all",
          canScan ? "cursor-pointer active:scale-95" : "cursor-default"
        )}
        style={{
          left: `${BUTTON_HITZONES.scan.left}%`,
          top: `${BUTTON_HITZONES.scan.top}%`,
          width: `${BUTTON_HITZONES.scan.width}%`,
          height: `${BUTTON_HITZONES.scan.height}%`,
          background: "transparent",
          border: "none",
          outline: "none",
          padding: 0,
        }}
        title="SCAN CARTRIDGE"
      >
        <img
          src="/labels/label_scan.png"
          alt="SCAN"
          className="absolute pointer-events-none select-none"
          style={{
            top: '62%',
            left: '0%',
            width: '140%',
            height: 'auto',
            transform: 'rotate(2.1deg)',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))',
          }}
        />
      </button>
      {/* EJECT */}
      <button
        onClick={() => { if (canEject) onEject(); }}
        disabled={!canEject}
        className={cn(
          "absolute z-40 transition-all",
          canEject ? "cursor-pointer active:scale-95" : "cursor-default"
        )}
        style={{
          left: `${BUTTON_HITZONES.eject.left}%`,
          top: `${BUTTON_HITZONES.eject.top}%`,
          width: `${BUTTON_HITZONES.eject.width}%`,
          height: `${BUTTON_HITZONES.eject.height}%`,
          background: "transparent",
          border: "none",
          outline: "none",
          padding: 0,
        }}
        title="EJECT CARTRIDGE"
      >
        <img
          src="/labels/label_eject.png"
          alt="EJECT"
          className="absolute pointer-events-none select-none"
          style={{
            top: '62%',
            left: '8%',
            width: '140%',
            height: 'auto',
            transform: 'rotate(-0.6deg)',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))',
          }}
        />
      </button>

      {/* ── STATUS GLOW (when cartridge loaded) ── */}
      <div
        className={cn(
          "absolute pointer-events-none transition-opacity duration-500 mix-blend-screen rounded-full",
          loadedEntry ? "opacity-60 animate-pulse" : "opacity-0"
        )}
        style={{
          left: "73%",
          top: "58%",
          width: "16%",
          height: "6%",
          background: "radial-gradient(ellipse, rgba(245,158,11,0.5) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* ── SIGNAL ACQUISITION OVERLAY ── */}
      {isReceivingSignal && (
        <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm rounded-sm"
          style={{ fontFamily: 'var(--font-lcd)' }}
        >
          <div className="text-xl sm:text-2xl md:text-4xl mb-6 animate-pulse tracking-[0.2em] text-center px-4 text-amber-500">
            SIGNAL RECEIVED: {bottleneckCategory?.toUpperCase() || "UNKNOWN"}
          </div>
          {firstMove && (
            <div className="text-xs sm:text-sm md:text-base mb-2 text-amber-500/60 tracking-widest">
              FIRST MOVE: {firstMove.toUpperCase()}
            </div>
          )}
          <div className="text-xs sm:text-sm md:text-base mb-4 text-amber-500/80 tracking-widest">
            AUTO-LOADING PROTOCOL...
          </div>
          <div className="w-48 sm:w-64 h-1 bg-amber-900/30 rounded-full overflow-hidden border border-amber-900/50">
            <div
              className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
              style={{ animation: "grow-width 2.5s ease-in-out forwards" }}
            />
          </div>
        </div>
      )}

      {/* Keyframes */}
      <style>{`
        @keyframes grow-width {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
