import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import GravitasShell from "@/components/GravitasShell";
import { ScoringResult } from "@/lib/scoring";
import { cn } from "@/lib/utils";

// Audio Context for sound effects
const audioCtx =
  typeof window !== "undefined"
    ? new (window.AudioContext || (window as any).webkitAudioContext)()
    : null;

const playRevealSound = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  // Deep resonant tone — like a signal locking
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 1.5);
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 1.5);

  // High harmonic ping
  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = "sine";
  osc2.frequency.setValueAtTime(880, now + 0.3);
  gain2.gain.setValueAtTime(0.06, now + 0.3);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.start(now + 0.3);
  osc2.stop(now + 1.0);
};

const playTransmitSound = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  [800, 1200, 800, 1400, 600].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, now + i * 0.08);
    gain.gain.setValueAtTime(0.06, now + i * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.06);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 0.06);
  });
};

// Dimension bar component
function DimensionBar({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth((value / 5) * 100);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-[7px] tracking-[0.2em] text-[#3a3a44] uppercase w-[80px] text-right shrink-0">
        {label}
      </span>
      <div className="flex-1 h-[6px] bg-[#0a0a0e] border border-[#1a1a22] rounded-[1px] overflow-hidden shadow-inner">
        <div
          className="h-full rounded-[1px] transition-all duration-1000 ease-out"
          style={{
            width: `${animatedWidth}%`,
            background: color,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
      <span
        className="text-[9px] tracking-[0.15em] w-[28px] text-right shrink-0"
        style={{ color, textShadow: `0 0 4px ${color}40` }}
      >
        {value.toFixed(1)}
      </span>
    </div>
  );
}

export default function Results() {
  const [, setLocation] = useLocation();
  const [results, setResults] = useState<ScoringResult | null>(null);
  const [phase, setPhase] = useState<"loading" | "reveal" | "complete">("loading");
  const [isTransmitting, setIsTransmitting] = useState(false);

  useEffect(() => {
    const stored =
      localStorage.getItem("gravityCheckResults") ||
      localStorage.getItem("gravity_check_results");
    if (stored) {
      setResults(JSON.parse(stored));
      // Staged reveal
      setTimeout(() => {
        playRevealSound();
        setPhase("reveal");
      }, 800);
      setTimeout(() => setPhase("complete"), 2500);
    }
  }, []);

  const handleSideChain = () => {
    setIsTransmitting(true);
    playTransmitSound();
    setTimeout(() => {
      let bottleneck = "CULTURE";
      if (results) {
        const scores = [
          { id: "IDENTITY", val: results.identity },
          { id: "RELATIONSHIP", val: results.relationship },
          { id: "VISION", val: results.vision },
          { id: "CULTURE", val: results.culture },
        ];
        scores.sort((a, b) => a.val - b.val);
        bottleneck = scores[0].id;
      }
      const firstMove = results?.firstMove ? encodeURIComponent(results.firstMove) : "";
      setLocation(`/codex?signal=received&bottleneck=${bottleneck}&firstMove=${firstMove}`);
    }, 1500);
  };

  // Loading state
  if (!results || phase === "loading") {
    return (
      <GravitasShell
        status="PROCESSING FIELD DATA..."
        statusColor="text-amber-400 animate-pulse"
        signalCategory="IDENTITY"
        progress={1}
        totalQuestions={20}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 relative z-10">
          <div className="relative w-16 h-16">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-green-400/20"
                style={{
                  animation: `gravitas-scan-ring 2s ease-in-out infinite ${i * 0.5}s`,
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.5)] animate-pulse" />
            </div>
          </div>
          <div
            className="text-[9px] tracking-[0.3em] text-green-400/60 uppercase"
            style={{ textShadow: "0 0 4px rgba(74,222,128,0.2)" }}
          >
            COMPUTING GRAVITATIONAL FIELD...
          </div>
        </div>
        <style>{`
          @keyframes gravitas-scan-ring {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(2); opacity: 0; }
          }
        `}</style>
      </GravitasShell>
    );
  }

  // Determine colors
  const getArchetypeColor = () => {
    if (results.total < 2.0) return "#ef4444"; // red
    if (results.total < 2.8) return "#f97316"; // orange
    if (results.total < 3.5) return "#eab308"; // yellow
    if (results.total < 4.2) return "#4ade80"; // green
    return "#22d3ee"; // cyan
  };

  const archetypeColor = getArchetypeColor();

  const footerControls = (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSideChain}
        disabled={isTransmitting}
        className={cn(
          "group flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-b from-[#1a1a20] to-[#141418] border rounded-[2px] transition-all duration-150",
          isTransmitting
            ? "border-amber-500/40 shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            : "hover:border-[rgba(197,160,89,0.3)] hover:shadow-[0_0_12px_rgba(197,160,89,0.08)] active:translate-y-[1px] active:shadow-none",
          !isTransmitting && "sidechain-glow"
        )}
      >
        <span
          className={cn(
            "text-[8px] tracking-[0.2em] uppercase transition-colors",
            isTransmitting
              ? "text-amber-400 animate-pulse"
              : "sidechain-glow-text group-hover:text-[#c5a059]"
          )}
        >
          {isTransmitting ? "TRANSMITTING..." : "SIDE-CHAIN TO CODEX"}
        </span>
      </button>
      <Link href="/gravity-check">
        <span className="text-[7px] tracking-[0.15em] text-[#3a3a44] hover:text-[#5a5a66] cursor-pointer uppercase transition-colors">
          RE-SCAN
        </span>
      </Link>
    </div>
  );

  return (
    <GravitasShell
      footerControls={footerControls}
      status="FIELD ANALYSIS COMPLETE"
      statusColor="text-green-400"
      signalCategory={results.force}
      progress={1}
      totalQuestions={20}
      hideCalStamp
    >
      {/* Results Layout — scrollable within instrument area */}
      <div className="h-full overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10 pr-1">
        <div className="flex flex-col gap-4 py-2">

          {/* ROW 1: Archetype + Dimension Bars */}
          <div className="grid grid-cols-[1fr_1fr] gap-4">
            {/* Archetype Card */}
            <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${archetypeColor}08 0%, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <div className="text-[6px] tracking-[0.3em] text-[#3a3a44] uppercase mb-1">
                  DETECTED ORBIT
                </div>
                <div
                  className={cn(
                    "text-[14px] tracking-[0.2em] uppercase font-bold mb-2 transition-all duration-1000",
                    phase === "reveal" || phase === "complete"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  )}
                  style={{
                    color: archetypeColor,
                    textShadow: `0 0 12px ${archetypeColor}60, 0 0 30px ${archetypeColor}20`,
                  }}
                >
                  {results.archetype}
                </div>
                <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em]">
                  {results.description}
                </div>
                {/* Total Score */}
                <div className="mt-2 pt-2 border-t border-white/[0.03] flex items-center gap-2">
                  <span className="text-[6px] tracking-[0.2em] text-[#3a3a44] uppercase">
                    FIELD STRENGTH
                  </span>
                  <span
                    className="text-[12px] tracking-[0.1em] font-bold"
                    style={{
                      color: archetypeColor,
                      textShadow: `0 0 6px ${archetypeColor}40`,
                    }}
                  >
                    {results.total}
                  </span>
                  <span className="text-[6px] text-[#3a3a44]">/ 5.0</span>
                </div>
              </div>
            </div>

            {/* Dimension Bars */}
            <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 flex flex-col justify-center gap-2.5">
              <div className="text-[6px] tracking-[0.3em] text-[#3a3a44] uppercase mb-1">
                DIMENSIONAL FIELD MAP
              </div>
              <DimensionBar
                label="IDENTITY"
                value={results.identity}
                color="#4ade80"
                delay={400}
              />
              <DimensionBar
                label="RELATIONSHIP"
                value={results.relationship}
                color="#22d3ee"
                delay={600}
              />
              <DimensionBar
                label="VISION"
                value={results.vision}
                color="#c5a059"
                delay={800}
              />
              <DimensionBar
                label="CULTURE"
                value={results.culture}
                color="#a78bfa"
                delay={1000}
              />
            </div>
          </div>

          {/* ROW 2: Leak + Force */}
          <div className="grid grid-cols-[1fr_1fr] gap-4">
            {/* Leak */}
            <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at center, rgba(239,68,68,0.03) 0%, transparent 70%)",
              }} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)] animate-pulse" />
                  <span className="text-[6px] tracking-[0.3em] text-red-400/60 uppercase">
                    PRIMARY LEAK DETECTED
                  </span>
                </div>
                <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em]">
                  {results.leakDescription}
                </div>
              </div>
            </div>

            {/* Force */}
            <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at center, rgba(74,222,128,0.03) 0%, transparent 70%)",
              }} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
                  <span className="text-[6px] tracking-[0.3em] text-green-400/60 uppercase">
                    DOMINANT FORCE
                  </span>
                </div>
                <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em]">
                  {results.forceDescription}
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: First Move */}
          <div className="bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border border-[#1a1a22] rounded p-3 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse at center, rgba(197,160,89,0.03) 0%, transparent 70%)",
            }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] shadow-[0_0_6px_rgba(197,160,89,0.5)]" />
                <span className="text-[6px] tracking-[0.3em] text-[#c5a059]/60 uppercase">
                  PRESCRIBED FIRST MOVE
                </span>
              </div>
              <div
                className="text-[10px] tracking-[0.15em] text-[#c5a059] uppercase mb-1.5 font-bold"
                style={{ textShadow: "0 0 6px rgba(197,160,89,0.3)" }}
              >
                {results.firstMove}
              </div>
              <div className="text-[8px] leading-[1.9] text-[#8a8a96] tracking-[0.05em]">
                {results.firstMoveDescription}
              </div>
            </div>
          </div>

          {/* Return link */}
          <div className="text-center pt-1 pb-2">
            <Link href="/">
              <span className="text-[6px] tracking-[0.2em] text-[#2a2a32] hover:text-[#3a3a44] cursor-pointer uppercase transition-colors">
                RETURN TO WORKBENCH
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom scrollbar + sidechain glow styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0a0a0e;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1a1a22;
          border-radius: 1px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2a2a32;
        }
        @keyframes sidechain-pulse {
          0%, 100% {
            border-color: rgba(197,160,89,0.15);
            box-shadow: 0 0 6px rgba(197,160,89,0.06), 0 2px 4px rgba(0,0,0,0.4);
          }
          50% {
            border-color: rgba(197,160,89,0.45);
            box-shadow: 0 0 18px rgba(197,160,89,0.15), 0 0 40px rgba(197,160,89,0.06), 0 2px 4px rgba(0,0,0,0.4);
          }
        }
        .sidechain-glow {
          animation: sidechain-pulse 2.5s ease-in-out infinite;
        }
        @keyframes sidechain-text-pulse {
          0%, 100% {
            color: #5a5a66;
            text-shadow: none;
          }
          50% {
            color: #c5a059;
            text-shadow: 0 0 8px rgba(197,160,89,0.3);
          }
        }
        .sidechain-glow-text {
          animation: sidechain-text-pulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </GravitasShell>
  );
}
