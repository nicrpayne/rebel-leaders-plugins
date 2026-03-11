import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import GravitasShell from "@/components/GravitasShell";
import RotaryKnob from "@/components/ui/RotaryKnob";
import VUMeter from "@/components/ui/VUMeter";
import { getQuestions, type Question } from "@/lib/questions";
import { calculateScore } from "@/lib/scoring";
import { cn } from "@/lib/utils";

type ScanMode = "SCAN" | "DEEP_SCAN";

// Audio Context for sound effects
const audioCtx =
  typeof window !== "undefined"
    ? new (window.AudioContext || (window as any).webkitAudioContext)()
    : null;

const playTickSound = () => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(2000, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
};

const playClunkSound = () => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
};

const playBootSound = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  [400, 600, 900].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + i * 0.12);
    gain.gain.setValueAtTime(0.08, now + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.15);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now + i * 0.12);
    osc.stop(now + i * 0.12 + 0.15);
  });
};

function ModeSelect({ onSelect }: { onSelect: (mode: ScanMode) => void }) {
  const [hoveredMode, setHoveredMode] = useState<ScanMode | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 relative z-10">
      <div className="text-center mb-2">
        <div className="text-[8px] tracking-[0.3em] text-[#3a3a44] uppercase mb-2">
          SELECT SCAN DEPTH
        </div>
        <div
          className="text-green-400 text-[9px] tracking-[0.2em] uppercase"
          style={{
            textShadow: "0 0 6px rgba(74, 222, 128, 0.4)",
            animation: "gravitas-crt-flicker 8s linear infinite",
          }}
        >
          HOW DEEP DO YOU WANT TO GO?
        </div>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => { playBootSound(); onSelect("SCAN"); }}
          onMouseEnter={() => setHoveredMode("SCAN")}
          onMouseLeave={() => setHoveredMode(null)}
          className={cn(
            "group relative flex flex-col items-center gap-3 px-6 py-4 bg-gradient-to-b from-[#111116] to-[#0c0c0f] border rounded transition-all duration-300",
            hoveredMode === "SCAN"
              ? "border-green-400/40 shadow-[0_0_20px_rgba(74,222,128,0.08)]"
              : "border-[#1a1a22] hover:border-[#2a2a32]"
          )}
        >
          <div className={cn(
            "absolute inset-0 rounded transition-opacity duration-300",
            hoveredMode === "SCAN" ? "opacity-100" : "opacity-0"
          )} style={{ background: "radial-gradient(ellipse at center, rgba(74,222,128,0.03) 0%, transparent 70%)" }} />

          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full border border-green-400/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-green-400/30 shadow-[0_0_8px_rgba(74,222,128,0.3)]" />
            </div>
            <span className="text-[11px] tracking-[0.25em] text-green-400 uppercase font-bold"
              style={{ textShadow: "0 0 4px rgba(74, 222, 128, 0.3)" }}>
              SCAN
            </span>
            <span className="text-[7px] tracking-[0.15em] text-[#3a3a44] uppercase">
              20 READINGS // ~4 MIN
            </span>
            <span className="text-[6px] tracking-[0.1em] text-[#2a2a32] uppercase mt-1 max-w-[120px] text-center leading-relaxed">
              SURFACE-LEVEL FIELD READING. FAST. DIRECTIONAL.
            </span>
          </div>
        </button>

        <button
          onClick={() => { playBootSound(); onSelect("DEEP_SCAN"); }}
          onMouseEnter={() => setHoveredMode("DEEP_SCAN")}
          onMouseLeave={() => setHoveredMode(null)}
          className={cn(
            "group relative flex flex-col items-center gap-3 px-6 py-4 bg-gradient-to-b from-[#111116] to-[#0c0c0f] border rounded transition-all duration-300",
            hoveredMode === "DEEP_SCAN"
              ? "border-amber-400/40 shadow-[0_0_20px_rgba(212,160,68,0.08)]"
              : "border-[#1a1a22] hover:border-[#2a2a32]"
          )}
        >
          <div className={cn(
            "absolute inset-0 rounded transition-opacity duration-300",
            hoveredMode === "DEEP_SCAN" ? "opacity-100" : "opacity-0"
          )} style={{ background: "radial-gradient(ellipse at center, rgba(212,160,68,0.03) 0%, transparent 70%)" }} />

          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full border border-amber-400/20 flex items-center justify-center relative">
              <div className="absolute w-7 h-7 rounded-full border border-amber-400/15" />
              <div className="w-3 h-3 rounded-full bg-amber-400/40 shadow-[0_0_8px_rgba(212,160,68,0.4)]" />
            </div>
            <span className="text-[11px] tracking-[0.25em] text-[#c5a059] uppercase font-bold"
              style={{ textShadow: "0 0 4px rgba(197, 160, 89, 0.3)" }}>
              DEEP SCAN
            </span>
            <span className="text-[7px] tracking-[0.15em] text-[#3a3a44] uppercase">
              52 READINGS // ~12 MIN
            </span>
            <span className="text-[6px] tracking-[0.1em] text-[#2a2a32] uppercase mt-1 max-w-[120px] text-center leading-relaxed">
              FULL GRAVITATIONAL MAPPING. THOROUGH. REVELATORY.
            </span>
          </div>
        </button>
      </div>

      <style>{`
        @keyframes gravitas-crt-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.97; }
          94% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function GravityCheck() {
  const [scanMode, setScanMode] = useState<ScanMode | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [knobValue, setKnobValue] = useState(50);
  const [, setLocation] = useLocation();

  const activeQuestions: Question[] = scanMode ? getQuestions(scanMode) : [];
  const currentQuestion = activeQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === activeQuestions.length - 1;
  const progress = activeQuestions.length > 0
    ? (currentQuestionIndex + 1) / activeQuestions.length
    : 0;

  const knobDetent = Math.floor(knobValue / 5);
  useEffect(() => {
    if (scanMode) playTickSound();
  }, [knobDetent]);

  const handleNext = useCallback(() => {
    if (!currentQuestion) return;
    playClunkSound();

    const score = 1 + (knobValue / 100) * 4;
    const newAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const results = calculateScore(newAnswers);
      localStorage.setItem("gravityCheckResults", JSON.stringify(results));
      setLocation("/results");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setKnobValue(50);
    }
  }, [currentQuestion, knobValue, answers, isLastQuestion, setLocation]);

  if (!scanMode) {
    return (
      <GravitasShell
        status="AWAITING DEPTH SELECTION"
        statusColor="text-[#3a3a44]"
        signalCategory="IDENTITY"
        progress={0}
        totalQuestions={20}
      >
        <ModeSelect onSelect={(mode) => setScanMode(mode)} />
      </GravitasShell>
    );
  }

  const footerControls = (
    <button
      onClick={handleNext}
      className={cn(
        "group flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-b from-[#1a1a20] to-[#141418] border border-[#2a2a32] rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-150",
        "hover:border-[rgba(197,160,89,0.3)] hover:bg-gradient-to-b hover:from-[#1e1e24] hover:to-[#18181c] hover:shadow-[0_0_12px_rgba(197,160,89,0.08)]",
        "active:translate-y-[1px] active:shadow-none"
      )}
    >
      <span className="text-[8px] tracking-[0.2em] uppercase text-[#5a5a66] group-hover:text-[#c5a059] transition-colors">
        {isLastQuestion ? "INITIALIZE" : "NEXT"}
      </span>
      <div className="w-1 h-1 border-t border-r border-[#5a5a66] rotate-45 group-hover:border-[#c5a059] transition-colors" />
    </button>
  );

  return (
    <GravitasShell
      footerControls={footerControls}
      status={isLastQuestion ? "SIGNAL LOCKED" : "SEARCHING..."}
      statusColor={
        isLastQuestion ? "text-green-400" : "text-amber-400 animate-pulse"
      }
      signalCategory={currentQuestion?.category || "IDENTITY"}
      progress={progress}
      totalQuestions={activeQuestions.length}
    >
      <div className="grid grid-cols-[1fr_1.4fr_1fr] gap-4 items-center h-full relative z-10">
        <div className="flex justify-center items-center h-full">
          <div className="transform scale-[0.85] origin-center">
            <VUMeter value={knobValue} />
          </div>
        </div>

        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-[280px]">
            <div className="relative bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border-2 border-[#1a1a22] rounded-md p-1.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-[3px] rounded border border-white/[0.02] pointer-events-none" />

              <div className="relative bg-[#061208] rounded p-4 min-h-[100px] flex flex-col items-center justify-center overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
                <div
                  className="absolute inset-0 pointer-events-none z-[25]"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none z-[5]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(74, 222, 128, 0.06) 0%, transparent 70%)",
                  }}
                />
                <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/[0.025] to-transparent pointer-events-none z-[35] rounded-t" />
                <div
                  className="absolute inset-0 rounded pointer-events-none z-[30]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)",
                  }}
                />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] z-[2] pointer-events-none">
                  {[60, 110, 160, 210].map((size, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 rounded-full border border-green-400/[0.04]"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        transform: "translate(-50%, -50%)",
                        animation: `gravitas-ring-pulse 6s ease-in-out infinite ${i}s`,
                      }}
                    />
                  ))}
                </div>

                {currentQuestion && (
                  <>
                    <div
                      className="relative z-20 text-green-400 text-[10px] leading-[2] tracking-[0.2em] text-center uppercase"
                      style={{
                        textShadow:
                          "0 0 6px rgba(74, 222, 128, 0.6), 0 0 20px rgba(74, 222, 128, 0.2)",
                        filter: "blur(0.3px)",
                        animation: "gravitas-crt-flicker 8s linear infinite",
                      }}
                    >
                      {currentQuestion.text}
                    </div>

                    {currentQuestion.subtext && (
                      <div
                        className="relative z-20 text-[7px] text-green-400/40 tracking-[0.15em] mt-2 text-center italic"
                        style={{
                          textShadow: "0 0 4px rgba(74, 222, 128, 0.2)",
                        }}
                      >
                        {currentQuestion.subtext}
                      </div>
                    )}

                    <div
                      className="relative z-20 text-[7px] text-green-400/50 tracking-[0.25em] mt-2.5 pt-2 border-t border-green-400/10 w-full text-center uppercase"
                      style={{
                        textShadow: "0 0 4px rgba(74, 222, 128, 0.3)",
                      }}
                    >
                      Q.{currentQuestionIndex + 1} OF {activeQuestions.length} // {currentQuestion.category}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center h-full">
          <div className="transform scale-[0.85] origin-center">
            <RotaryKnob
              value={knobValue}
              min={0}
              max={100}
              onChange={setKnobValue}
              label="INTENSITY"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gravitas-ring-pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.02); }
        }
        @keyframes gravitas-crt-flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.97; }
          94% { opacity: 1; }
        }
      `}</style>
    </GravitasShell>
  );
}
