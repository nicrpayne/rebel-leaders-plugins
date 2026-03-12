import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";

/* ─────────────────────────────────────────────
   CABINET DECK — V5.1
   Full hero image background (pager bank + deck + atmosphere)
   with CSS overlay zones for interactive elements:
   - 4 pager screens (dynamic text from GRAVITAS)
   - Cartridge slot (load bay with insert/eject animations)
   - 3 buttons (PROGRAM=READ, FROMNET=RUN, EJECT)
   ───────────────────────────────────────────── */

const SPINE_CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine_transparent_95539dfa.png";
const CABINET_HERO_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/fLHdQJImZxvFSNJX.webp";

/* ── Pager screen positions (% of hero image) ── */
/* ── Per-screen perspective transforms ──
   The hero image has slight camera perspective — screens aren't perfectly
   straight-on. We apply a tiny CSS 3D transform to each overlay so it
   matches the trapezoidal shape of the bezel in the image.
   Screen 1 (far left): left edge closer to camera → rotateY slightly
   Screen 4 (far right): right edge closer to camera → rotateY opposite
   Screens 2-3 (center): minimal rotation                              */
const PAGER_SCREENS = [
  { id: "identity",     left: 22.6, top: 17.6, width: 11.0, height: 10.625,
    transform: "perspective(350px) rotateY(-3.5deg) rotateX(-0.5deg)" },
  { id: "relationship", left: 37.3, top: 17.2, width: 11.8, height: 12.5,
    transform: "perspective(600px) rotateY(1deg) rotateX(-0.3deg)" },
  { id: "vision",       left: 50.5, top: 17.8, width: 12.5, height: 11.5,
    transform: "perspective(600px) rotateY(-1deg) rotateX(-0.3deg)" },
  { id: "culture",      left: 65.0, top: 17.8, width: 11.5, height: 10.5,
    transform: "perspective(400px) rotateY(-2.5deg) rotateX(-0.5deg)" },
];

/* ── Button positions (% of hero image) ── */
const BUTTONS = {
  program: { left: 72.6, top: 66.5, width: 4.4, height: 14.0 },
  fromnet: { left: 78.9, top: 66.8, width: 4.2, height: 13.7 },
  eject:   { left: 85.0, top: 66.9, width: 3.7, height: 13.6 },
};

/* ── Cartridge slot position (% of hero image) ── */
const SLOT = { left: 28.8, top: 59.2, width: 31.2, height: 18.8 };

/* ── Pager screen idle messages ── */
const IDLE_MESSAGES = [
  { line1: "AWAITING", line2: "SIGNAL..." },
  { line1: "STANDBY", line2: "MODE" },
  { line1: "NO DATA", line2: "RECEIVED" },
  { line1: "SYSTEM", line2: "READY" },
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
  isReaderOpen: boolean;
  gravitasScores: GravitasScores | null;
  isReceivingSignal: boolean;
  bottleneckCategory: string | null;
}

/* ── Pager Screen Sub-component ── */
function PagerScreen({
  line1,
  line2,
  isActive,
  isReceivingSignal,
  screenIndex,
}: {
  line1: string;
  line2: string;
  isActive: boolean;
  isReceivingSignal: boolean;
  screenIndex: number;
}) {
  const [showCursor, setShowCursor] = useState(true);
  const [flickerOpacity, setFlickerOpacity] = useState(1);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530 + screenIndex * 70); // Slightly different blink rate per screen
    return () => clearInterval(interval);
  }, [screenIndex]);

  // Random flicker — each screen flickers independently
  useEffect(() => {
    const scheduleFlicker = () => {
      // Random delay between 3-12 seconds
      const delay = 3000 + Math.random() * 9000;
      const timer = setTimeout(() => {
        // Quick flicker: drop opacity briefly
        setFlickerOpacity(0.3 + Math.random() * 0.3);
        setTimeout(() => {
          setFlickerOpacity(1);
          // Sometimes double-flicker
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

  // Text color: bright phosphor green on the dark LCD
  const textColor = isActive
    ? "#33ff33" // Bright active green
    : "#22cc44"; // Slightly dimmer idle green

  const glowColor = isActive
    ? "0 0 8px rgba(51,255,51,0.6), 0 0 2px rgba(51,255,51,0.9)"
    : "0 0 4px rgba(34,204,68,0.3), 0 0 1px rgba(34,204,68,0.6)";

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center overflow-hidden"
      style={{
        fontFamily: 'var(--font-lcd)',
        opacity: flickerOpacity,
        transition: flickerOpacity < 1 ? 'none' : 'opacity 0.15s ease',
        padding: '8% 10%',
      }}
    >
      {/* LCD background — fully opaque to cover baked-in image text */}
      <div
        className="absolute pointer-events-none rounded-[1px]"
        style={{
          inset: "-2px",
          background: "linear-gradient(170deg, #1a2a12 0%, #142210 25%, #0f1a0c 50%, #142210 75%, #1a2a12 100%)",
        }}
      />
      {/* Very subtle scanline overlay — just enough to feel CRT-ish */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          backgroundSize: "100% 4px",
          mixBlendMode: "multiply",
        }}
      />

      {/* ── Display Optics Layer 1: Inner edge darkening ── */}
      {/* Radial gradient vignette + inset box-shadows = bezel-glass mask */}
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

      {/* ── Display Optics Layer 2: Glass reflection ── */}
      {/* Faint top-edge highlight simulating light hitting the glass surface */}
      <div
        className="absolute inset-0 pointer-events-none z-[16] rounded-[2px]"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 15%, rgba(255,255,255,0) 35%)",
          mixBlendMode: "screen",
          opacity: 0.55,
        }}
      />

      <span
        className={cn(
          "relative z-10 block truncate uppercase leading-none",
          isReceivingSignal && "animate-pulse"
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
          isReceivingSignal && "animate-pulse"
        )}
        style={{
          color: textColor,
          textShadow: glowColor,
          fontSize: "clamp(7px, 1.2vw, 14px)",
          letterSpacing: "0.06em",
        }}
      >
        {line2}
        {/* Blinking cursor */}
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

export default function CabinetDeck({
  loadedEntry,
  onEject,
  onRead,
  onRun,
  isReaderOpen,
  gravitasScores,
  isReceivingSignal,
  bottleneckCategory,
}: CabinetDeckProps) {
  // Animation phases for cartridge
  const [animPhase, setAnimPhase] = useState<"idle" | "inserting" | "loaded" | "ejecting">("idle");
  const [displayEntry, setDisplayEntry] = useState<CodexEntry | null>(null);
  const prevLoadedIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const currentId = loadedEntry?.id;
    const prevId = prevLoadedIdRef.current;

    if (loadedEntry && currentId !== prevId) {
      setDisplayEntry(loadedEntry);
      setAnimPhase("inserting");
      const timer = setTimeout(() => setAnimPhase("loaded"), 400);
      prevLoadedIdRef.current = currentId;
      return () => clearTimeout(timer);
    } else if (!loadedEntry && prevId) {
      setAnimPhase("ejecting");
      const timer = setTimeout(() => {
        setAnimPhase("idle");
        setDisplayEntry(null);
      }, 450);
      prevLoadedIdRef.current = undefined;
      return () => clearTimeout(timer);
    }
  }, [loadedEntry]);

  /* ── Build pager screen messages ── */
  const getPagerMessages = useCallback(() => {
    if (isReceivingSignal) {
      return [
        { line1: "INCOMING", line2: "SIGNAL!" },
        { line1: bottleneckCategory?.toUpperCase() || "SCAN", line2: "DETECTED" },
        { line1: "LOADING", line2: "PROTOCOL..." },
        { line1: "STAND", line2: "BY..." },
      ];
    }
    if (loadedEntry) {
      const cat = loadedEntry.flywheel_node?.[0]?.toUpperCase() || "CODEX";
      return [
        { line1: "LOADED", line2: cat },
        { line1: loadedEntry.id.replace("MOVE_", "").substring(0, 12), line2: "ACTIVE" },
        { line1: "READY", line2: "TO READ" },
        { line1: "STATUS", line2: "ONLINE" },
      ];
    }
    if (gravitasScores) {
      const dims = ["identity", "relationship", "vision", "culture"] as const;
      return dims.map(d => {
        const score = gravitasScores[d];
        const status = score < 50 ? "LOW" : score < 65 ? "WATCH" : score < 80 ? "GOOD" : "STRONG";
        return {
          line1: d.toUpperCase(),
          line2: `${score} ${status}`,
        };
      });
    }
    return IDLE_MESSAGES;
  }, [isReceivingSignal, loadedEntry, gravitasScores, bottleneckCategory]);

  const pagerMessages = getPagerMessages();
  const isActive = !!(gravitasScores || loadedEntry || isReceivingSignal);

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
          {/* Static "screen off" layer — always visible, covers baked-in image text.
              When the LCD flickers, this dark dead-screen shows through instead of the image. */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: "-4px",
              background: "radial-gradient(ellipse at 50% 50%, #1a1c18 0%, #0e100c 40%, #080a07 100%)",
              borderRadius: "2px",
            }}
          />
          <PagerScreen
            line1={pagerMessages[idx]?.line1 || ""}
            line2={pagerMessages[idx]?.line2 || ""}
            isActive={isActive}
            isReceivingSignal={isReceivingSignal}
            screenIndex={idx}
          />
        </div>
      ))}

      {/* ── CARTRIDGE SLOT OVERLAY ── */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: `${SLOT.left}%`,
          top: `${SLOT.top}%`,
          width: `${SLOT.width}%`,
          height: `${SLOT.height}%`,
        }}
      >
        {displayEntry && (
          <div
            key={animPhase === "ejecting" ? displayEntry.id : displayEntry.id + "-active"}
            className={cn(
              "absolute inset-0 z-10 flex items-center justify-center transform-gpu will-change-transform",
              animPhase === "inserting" && "animate-in fade-in zoom-in-90 duration-300 ease-out",
              animPhase === "ejecting" && "animate-out fade-out zoom-out-90 duration-300 ease-in fill-mode-forwards",
              animPhase === "loaded" && "opacity-100 scale-100"
            )}
          >
            <img
              src={SPINE_CDN}
              alt="Cartridge Spine"
              className="absolute inset-0 w-full h-full object-fill drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] scale-[1.02]"
            />
            <div
              className="absolute w-[70%] h-[60%] flex flex-col items-center justify-center text-center"
              style={{ transform: "rotate(-0.5deg)" }}
            >
              <div className="absolute inset-0 bg-[#e6dcc3]/40 blur-sm rounded-full mix-blend-hard-light -z-10" />
              <h3 className="font-serif text-[#1a120a] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] font-black uppercase leading-tight tracking-widest px-2 drop-shadow-[0_0_3px_rgba(230,220,195,1)] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                {displayEntry.title}
              </h3>
              <span className="font-mono text-[5px] sm:text-[6px] md:text-[7px] text-[#2a1d10]/80 mt-0.5 tracking-tighter font-bold drop-shadow-[0_0_2px_rgba(230,220,195,1)]">
                {displayEntry.id}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── BUTTON OVERLAYS (invisible hit zones) ── */}
      {/* PROGRAM = READ */}
      <button
        onClick={onRead}
        disabled={!loadedEntry}
        className={cn(
          "absolute z-40 cursor-pointer transition-all",
          "hover:brightness-125 active:scale-95",
          !loadedEntry && "cursor-default"
        )}
        style={{
          left: `${BUTTONS.program.left}%`,
          top: `${BUTTONS.program.top}%`,
          width: `${BUTTONS.program.width}%`,
          height: `${BUTTONS.program.height}%`,
          background: "transparent",
          border: "none",
        }}
        title="READ PROTOCOL"
      />

      {/* FROMNET = RUN */}
      <button
        onClick={onRun}
        disabled={!loadedEntry}
        className={cn(
          "absolute z-40 cursor-pointer transition-all",
          "hover:brightness-125 active:scale-95",
          !loadedEntry && "cursor-default"
        )}
        style={{
          left: `${BUTTONS.fromnet.left}%`,
          top: `${BUTTONS.fromnet.top}%`,
          width: `${BUTTONS.fromnet.width}%`,
          height: `${BUTTONS.fromnet.height}%`,
          background: "transparent",
          border: "none",
        }}
        title="RUN PROTOCOL"
      />

      {/* EJECT */}
      <button
        onClick={onEject}
        disabled={!loadedEntry}
        className={cn(
          "absolute z-40 cursor-pointer transition-all",
          "hover:brightness-125 active:scale-95",
          !loadedEntry && "cursor-default"
        )}
        style={{
          left: `${BUTTONS.eject.left}%`,
          top: `${BUTTONS.eject.top}%`,
          width: `${BUTTONS.eject.width}%`,
          height: `${BUTTONS.eject.height}%`,
          background: "transparent",
          border: "none",
        }}
        title="EJECT CARTRIDGE"
      />

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
          <div className="text-xs sm:text-sm md:text-base mb-4 text-amber-500/80 tracking-widest">
            AUTO-LOADING PROTOCOL...
          </div>
          <div className="w-48 sm:w-64 h-1 bg-amber-900/30 rounded-full overflow-hidden border border-amber-900/50">
            <div
              className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
              style={{
                animation: "grow-width 2.5s ease-in-out forwards",
              }}
            />
          </div>
        </div>
      )}

      {/* Keyframe for signal loading bar */}
      <style>{`
        @keyframes grow-width {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
