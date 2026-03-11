import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import GravitasShell from "@/components/GravitasShell";
import RotaryKnob from "@/components/ui/RotaryKnob";
import VUMeter from "@/components/ui/VUMeter";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import LCDScreen from "@/components/ui/LCDScreen";
import { questions } from "@/lib/questions";
import { calculateScore } from "@/lib/scoring";
import { cn } from "@/lib/utils";

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
  osc.frequency.exponentialRampToValueAtTime(
    100,
    audioCtx.currentTime + 0.05
  );
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

export default function GravityCheck() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | string>>({});
  const [knobValue, setKnobValue] = useState(50);
  const [switchValue, setSwitchValue] = useState<"A" | "B" | null>(null);
  const [, setLocation] = useLocation();

  // Sound effect for knob
  useEffect(() => {
    playTickSound();
  }, [Math.floor(knobValue / 5)]);

  // Sound effect for switch
  useEffect(() => {
    if (switchValue) playClunkSound();
  }, [switchValue]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = (currentQuestionIndex + 1) / questions.length;

  const handleNext = () => {
    playClunkSound();
    const answer =
      currentQuestion.type === "slider" ? knobValue : switchValue;
    if (answer === null) return;

    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const finalAnswers: Record<number, number> = {};

      let currentAnswerValue = 0;
      if (currentQuestion.type === "slider") {
        currentAnswerValue = 1 + (knobValue / 100) * 4;
      } else {
        currentAnswerValue = switchValue === "A" ? 1 : 5;
      }
      finalAnswers[currentQuestion.id] = currentAnswerValue;

      Object.entries(answers).forEach(([k, v]) => {
        if (typeof v === "number") {
          finalAnswers[Number(k)] = 1 + (v / 100) * 4;
        } else {
          finalAnswers[Number(k)] = v === "A" ? 1 : 5;
        }
      });

      const results = calculateScore(finalAnswers);
      localStorage.setItem("gravityCheckResults", JSON.stringify(results));
      setLocation("/results");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setKnobValue(50);
      setSwitchValue(null);
    }
  };

  // Footer Next/Initialize button
  const footerControls = (
    <button
      onClick={handleNext}
      disabled={currentQuestion.type === "scenario" && !switchValue}
      className={cn(
        "group flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-b from-[#1a1a20] to-[#141418] border border-[#2a2a32] rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-150",
        "hover:border-[rgba(197,160,89,0.3)] hover:bg-gradient-to-b hover:from-[#1e1e24] hover:to-[#18181c] hover:shadow-[0_0_12px_rgba(197,160,89,0.08)]",
        "active:translate-y-[1px] active:shadow-none",
        "disabled:opacity-40 disabled:cursor-not-allowed"
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
        isLastQuestion
          ? "text-green-400"
          : "text-amber-400 animate-pulse"
      }
      signalCategory={currentQuestion.category}
      progress={progress}
      totalQuestions={questions.length}
    >
      {/* Instrument Cluster — 3-column grid */}
      <div className="grid grid-cols-[1fr_1.4fr_1fr] gap-4 items-center h-full relative z-10">
        {/* LEFT: VU Meter or Option A */}
        <div className="flex justify-center items-center h-full">
          {currentQuestion.type === "slider" ? (
            <div className="transform scale-[0.85] origin-center">
              <VUMeter value={knobValue} />
            </div>
          ) : (
            <div className="w-full max-w-[160px] text-center space-y-2">
              <div className="text-[8px] tracking-[0.2em] text-[#3a3a44] uppercase">
                OPTION A
              </div>
              <div
                onClick={() => setSwitchValue("A")}
                className={cn(
                  "p-3 bg-[#111114] border border-[#2a2a32] rounded-[2px] text-[10px] font-serif italic text-gray-400 transition-all duration-200 cursor-pointer",
                  "hover:border-[rgba(197,160,89,0.4)] hover:text-gray-300",
                  "shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]",
                  switchValue === "A" &&
                    "border-[rgba(197,160,89,0.8)] text-[#c5a059] shadow-[0_0_10px_rgba(197,160,89,0.1)] bg-[#141418]"
                )}
              >
                &ldquo;{currentQuestion.options?.A}&rdquo;
              </div>
            </div>
          )}
        </div>

        {/* CENTER: CRT Display */}
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-[280px]">
            {/* CRT Housing */}
            <div className="relative bg-gradient-to-b from-[#0e0e12] to-[#0a0a0d] border-2 border-[#1a1a22] rounded-md p-1.5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(0,0,0,0.5)]">
              {/* Inner bezel */}
              <div className="absolute inset-[3px] rounded border border-white/[0.02] pointer-events-none" />

              {/* CRT Screen */}
              <div className="relative bg-[#061208] rounded p-4 min-h-[100px] flex flex-col items-center justify-center overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
                {/* Scanlines */}
                <div
                  className="absolute inset-0 pointer-events-none z-[25]"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                  }}
                />
                {/* Phosphor glow */}
                <div
                  className="absolute inset-0 pointer-events-none z-[5]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(74, 222, 128, 0.06) 0%, transparent 70%)",
                  }}
                />
                {/* Screen reflection */}
                <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/[0.025] to-transparent pointer-events-none z-[35] rounded-t" />
                {/* CRT curvature vignette */}
                <div
                  className="absolute inset-0 rounded pointer-events-none z-[30]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)",
                  }}
                />

                {/* Field Rings */}
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

                {/* Question Text */}
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

                {/* Subtext */}
                <div
                  className="relative z-20 text-[7px] text-green-400/50 tracking-[0.25em] mt-2.5 pt-2 border-t border-green-400/10 w-full text-center uppercase"
                  style={{
                    textShadow: "0 0 4px rgba(74, 222, 128, 0.3)",
                  }}
                >
                  Q.{currentQuestionIndex + 1} // {currentQuestion.category}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Knob or Option B */}
        <div className="flex justify-center items-center h-full">
          {currentQuestion.type === "slider" ? (
            <div className="transform scale-[0.85] origin-center">
              <RotaryKnob
                value={knobValue}
                min={0}
                max={100}
                onChange={setKnobValue}
                label="INTENSITY"
              />
            </div>
          ) : (
            <div className="w-full max-w-[160px] flex flex-col items-center gap-4">
              <div className="w-full text-center space-y-2">
                <div className="text-[8px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  OPTION B
                </div>
                <div
                  onClick={() => setSwitchValue("B")}
                  className={cn(
                    "p-3 bg-[#111114] border border-[#2a2a32] rounded-[2px] text-[10px] font-serif italic text-gray-400 transition-all duration-200 cursor-pointer",
                    "hover:border-[rgba(197,160,89,0.4)] hover:text-gray-300",
                    "shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]",
                    switchValue === "B" &&
                      "border-[rgba(197,160,89,0.8)] text-[#c5a059] shadow-[0_0_10px_rgba(197,160,89,0.1)] bg-[#141418]"
                  )}
                >
                  &ldquo;{currentQuestion.options?.B}&rdquo;
                </div>
              </div>
              <ToggleSwitch
                value={switchValue}
                onChange={setSwitchValue}
                labelA="A"
                labelB="B"
              />
            </div>
          )}
        </div>
      </div>

      {/* Gravitas-specific animations */}
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
