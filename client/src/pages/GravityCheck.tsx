import { useState, useEffect, useCallback } from "react";
import { useGravitasOnboarding } from "@/components/onboarding";
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
  const now = audioCtx.currentTime;
  // Warm coin chime — two quick ascending tones, Mario-inspired
  const t1 = audioCtx.createOscillator();
  const g1 = audioCtx.createGain();
  t1.type = "sine";
  t1.frequency.setValueAtTime(988, now); // B5
  g1.gain.setValueAtTime(0.12, now);
  g1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  t1.connect(g1);
  g1.connect(audioCtx.destination);
  t1.start(now);
  t1.stop(now + 0.12);

  const t2 = audioCtx.createOscillator();
  const g2 = audioCtx.createGain();
  t2.type = "sine";
  t2.frequency.setValueAtTime(1319, now + 0.07); // E6
  g2.gain.setValueAtTime(0.10, now + 0.07);
  g2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  t2.connect(g2);
  g2.connect(audioCtx.destination);
  t2.start(now + 0.07);
  t2.stop(now + 0.22);
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
    <div className="flex flex-col items-center justify-center h-full gap-3 relative z-10">
      <div className="text-center mb-0">
        <div className="text-[8px] tracking-[0.3em] text-[#3a3a44] uppercase mb-1">
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

      <div className="flex gap-4">
        <button
          onClick={() => { playBootSound(); onSelect("SCAN"); }}
          onMouseEnter={() => setHoveredMode("SCAN")}
          onMouseLeave={() => setHoveredMode(null)}
          className={cn(
            "group relative flex flex-col items-center gap-2 px-5 py-3 bg-gradient-to-b from-[#111116] to-[#0c0c0f] border rounded transition-all duration-300",
            hoveredMode === "SCAN"
              ? "border-green-400/40 shadow-[0_0_20px_rgba(74,222,128,0.08)]"
              : "border-[#1a1a22] hover:border-[#2a2a32]"
          )}
        >
          <div className={cn(
            "absolute inset-0 rounded transition-opacity duration-300",
            hoveredMode === "SCAN" ? "opacity-100" : "opacity-0"
          )} style={{ background: "radial-gradient(ellipse at center, rgba(74,222,128,0.03) 0%, transparent 70%)" }} />

          <div className="relative z-10 flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full border border-green-400/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-green-400/30 shadow-[0_0_8px_rgba(74,222,128,0.3)]" />
            </div>
            <span className="text-[11px] tracking-[0.25em] text-green-400 uppercase font-bold"
              style={{ textShadow: "0 0 4px rgba(74, 222, 128, 0.3)" }}>
              SCAN
            </span>
            <span className="text-[7px] tracking-[0.15em] text-[#7a7a8a] uppercase">
              20 READINGS // ~4 MIN
            </span>
            <span className="text-[6px] tracking-[0.1em] text-[#6a6a7a] uppercase mt-0.5 max-w-[120px] text-center leading-snug">
              SURFACE-LEVEL FIELD READING. FAST. DIRECTIONAL.
            </span>
          </div>
        </button>

        <button
          onClick={() => { playBootSound(); onSelect("DEEP_SCAN"); }}
          onMouseEnter={() => setHoveredMode("DEEP_SCAN")}
          onMouseLeave={() => setHoveredMode(null)}
          className={cn(
            "group relative flex flex-col items-center gap-2 px-5 py-3 bg-gradient-to-b from-[#111116] to-[#0c0c0f] border rounded transition-all duration-300",
            hoveredMode === "DEEP_SCAN"
              ? "border-amber-400/40 shadow-[0_0_20px_rgba(212,160,68,0.08)]"
              : "border-[#1a1a22] hover:border-[#2a2a32]"
          )}
        >
          <div className={cn(
            "absolute inset-0 rounded transition-opacity duration-300",
            hoveredMode === "DEEP_SCAN" ? "opacity-100" : "opacity-0"
          )} style={{ background: "radial-gradient(ellipse at center, rgba(212,160,68,0.03) 0%, transparent 70%)" }} />

          <div className="relative z-10 flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full border border-amber-400/20 flex items-center justify-center relative">
              <div className="absolute w-6 h-6 rounded-full border border-amber-400/15" />
              <div className="w-3 h-3 rounded-full bg-amber-400/40 shadow-[0_0_8px_rgba(212,160,68,0.4)]" />
            </div>
            <span className="text-[11px] tracking-[0.25em] text-[#c5a059] uppercase font-bold"
              style={{ textShadow: "0 0 4px rgba(197, 160, 89, 0.3)" }}>
              DEEP SCAN
            </span>
            <span className="text-[7px] tracking-[0.15em] text-[#7a7a8a] uppercase">
              52 READINGS // ~12 MIN
            </span>
            <span className="text-[6px] tracking-[0.1em] text-[#6a6a7a] uppercase mt-0.5 max-w-[120px] text-center leading-snug">
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
  const { OnboardingUI } = useGravitasOnboarding({
    onBeginScan: () => setScanMode("SCAN"),
    onTourComplete: () => setScanMode(null),
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [knobValue, setKnobValue] = useState(50);
  const [knobTouched, setKnobTouched] = useState(false);
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
      setKnobTouched(false);
    }
  }, [currentQuestion, knobValue, answers, isLastQuestion, setLocation]);

  const onboardingOverlay = <OnboardingUI />;

  if (!scanMode) {
    return (
      <>
      {onboardingOverlay}
      <GravitasShell
        status="AWAITING DEPTH SELECTION"
        statusColor="text-[#3a3a44]"
        signalCategory="IDENTITY"
        progress={0}
        totalQuestions={20}
        hideCalibration
        footerControls={
          <a
            href="/"
            style={{ color: "rgba(160, 160, 180, 0.4)", fontFamily: "'VT323', monospace", fontSize: "13px", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(160, 160, 180, 0.8)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(160, 160, 180, 0.4)")}
          >
            WORKBENCH
          </a>
        }
      >
        <ModeSelect onSelect={(mode) => setScanMode(mode)} />
      </GravitasShell>
      </>
    );
  }

  const footerControls = (
    <>
      <a
        href="/"
        style={{ color: "rgba(160, 160, 180, 0.4)", fontFamily: "'VT323', monospace", fontSize: "13px", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(160, 160, 180, 0.8)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(160, 160, 180, 0.4)")}
      >
        WORKBENCH
      </a>
    <button
      data-tour="gravitas-next"
      onClick={handleNext}
      className={cn(
        "group flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-b from-[#1a1a20] to-[#141418] border rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-300",
        knobTouched
          ? "border-green-400/50 shadow-[0_0_12px_rgba(74,222,128,0.15)]"
          : "border-[#2a2a32]",
        "hover:border-[rgba(74,222,128,0.5)] hover:shadow-[0_0_16px_rgba(74,222,128,0.2)]",
        "active:translate-y-[1px] active:shadow-none"
      )}
      style={knobTouched ? { animation: "gravitas-next-pulse 2s ease-in-out infinite" } : undefined}
    >
      <span className={cn(
        "text-[8px] tracking-[0.2em] uppercase transition-colors duration-300",
        knobTouched
          ? "text-green-400"
          : "text-[#5a5a66] group-hover:text-green-400"
      )}>
        {isLastQuestion ? "INITIALIZE" : "NEXT"}
      </span>
      <div className={cn(
        "w-1 h-1 border-t border-r rotate-45 transition-colors duration-300",
        knobTouched
          ? "border-green-400"
          : "border-[#5a5a66] group-hover:border-green-400"
      )} />
    </button>
    </>
  );

  return (
    <>
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

              <div className="relative bg-[#061208] rounded p-4 h-[140px] flex flex-col items-center justify-center overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
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
                      data-tour="gravitas-display"
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
          <div className="transform scale-[0.85] origin-center" data-tour="gravitas-knob">
            <RotaryKnob
              value={knobValue}
              min={0}
              max={100}
              onChange={(v: number) => { setKnobValue(v); if (!knobTouched) setKnobTouched(true); }}
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
        @keyframes gravitas-next-pulse {
          0%, 100% { box-shadow: 0 0 8px rgba(74,222,128,0.1); }
          50% { box-shadow: 0 0 16px rgba(74,222,128,0.25), 0 0 4px rgba(74,222,128,0.1) inset; }
        }
      `}</style>
    </GravitasShell>
    {onboardingOverlay}
    </>
  );
}
