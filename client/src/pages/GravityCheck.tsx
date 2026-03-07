import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import PluginShell from "@/components/PluginShell";
import RotaryKnob from "@/components/ui/RotaryKnob";
import VUMeter from "@/components/ui/VUMeter";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import LCDScreen from "@/components/ui/LCDScreen";
import { questions } from "@/lib/questions";
import { calculateScore } from "@/lib/scoring";
import { cn } from "@/lib/utils";

// Audio Context for sound effects
const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

const playTickSound = () => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
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
  osc.type = 'square';
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
  const [knobValue, setKnobValue] = useState(50); // Default to center
  const [switchValue, setSwitchValue] = useState<"A" | "B" | null>(null);
  const [, setLocation] = useLocation();

  // Sound effect for knob
  useEffect(() => {
    // Only play tick if value changed significantly to avoid spam
    playTickSound();
  }, [Math.floor(knobValue / 5)]); // Tick every 5 units

  // Sound effect for switch
  useEffect(() => {
    if (switchValue) playClunkSound();
  }, [switchValue]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
    playClunkSound();
    // Save answer
    const answer = currentQuestion.type === "slider" ? knobValue : switchValue;
    if (answer === null) return; // Prevent skipping without answer

    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate and save results
      const finalAnswers: Record<number, number> = {};
      
      // Add the current answer first
      let currentAnswerValue = 0;
      if (currentQuestion.type === "slider") {
        // Map 0-100 knob value to 1-5 scale
        currentAnswerValue = 1 + (knobValue / 100) * 4;
      } else {
        currentAnswerValue = switchValue === "A" ? 1 : 5; // A=1, B=5 based on previous logic
      }
      finalAnswers[currentQuestion.id] = currentAnswerValue;

      // Add previous answers
      Object.entries(answers).forEach(([k, v]) => {
        if (typeof v === "number") {
           // It was a knob value (0-100), map to 1-5
           finalAnswers[Number(k)] = 1 + (v / 100) * 4;
        } else {
           // It was "A" or "B"
           finalAnswers[Number(k)] = v === "A" ? 1 : 5;
        }
      });

      const results = calculateScore(finalAnswers);
      localStorage.setItem("gravityCheckResults", JSON.stringify(results));
      setLocation("/results");
    } else {
      // Reset for next question
      setCurrentQuestionIndex((prev) => prev + 1);
      setKnobValue(50);
      setSwitchValue(null);
    }
  };

  // Integrated Footer Control (Next Button) - Hardware Style
  const footerControls = (
    <button
      onClick={handleNext}
      disabled={currentQuestion.type === "scenario" && !switchValue}
      className={cn(
        "group relative flex items-center gap-3 px-4 py-1.5 bg-[#181818] border border-[#333] rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.5)] active:translate-y-[1px] active:shadow-none transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed",
        "hover:border-gold/40 hover:bg-[#222] hover:shadow-[0_0_8px_rgba(197,160,89,0.1)]"
      )}
    >
      <span className="font-pixel text-[9px] tracking-[0.15em] uppercase text-[#888] group-hover:text-gold transition-colors">
        {isLastQuestion ? "INITIALIZE" : "NEXT"}
      </span>
      {/* Arrow Icon */}
      <div className="w-1.5 h-1.5 border-t border-r border-[#666] rotate-45 group-hover:border-gold transition-colors" />
    </button>
  );

  return (
    <PluginShell title="GRAVITY CHECK" category="MIRROR" footerControls={footerControls}>
      <div className="flex flex-col gap-6 md:gap-8 w-full max-w-4xl mx-auto">
        
        {/* Top Control Bar - Consolidated Row with Matched Baselines */}
        <div className="flex justify-between items-end border-b border-white/5 pb-4 px-2">
          {/* Left: Signal Input */}
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-pixel text-[#555] tracking-widest uppercase w-24 text-right hidden md:block">SIGNAL INPUT</span>
            <div className="h-3 w-[1px] bg-[#333] hidden md:block" /> {/* Vertical Divider */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] md:text-xs font-pixel text-gold tracking-widest uppercase drop-shadow-sm">
                {currentQuestion.category}
              </span>
            </div>
          </div>

          {/* Right: Level (Mirrored Padding) */}
          <div className="flex items-center gap-4">
            <div className="flex gap-[1px] bg-[#0a0a0a] p-[2px] rounded-[1px] border border-[#222] shadow-inner">
              {[...Array(12)].map((_, i) => {
                const isActive = i < (currentQuestionIndex + 1);
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "w-1 h-2.5 rounded-[0.5px] transition-all duration-300",
                      isActive ? "bg-green-500 shadow-[0_0_3px_rgba(34,197,94,0.6)]" : "bg-[#1a1a1a]"
                    )} 
                  />
                );
              })}
            </div>
            <div className="h-3 w-[1px] bg-[#333] hidden md:block" /> {/* Vertical Divider */}
            <span className="text-[9px] font-pixel text-[#555] tracking-widest uppercase w-24 text-left hidden md:block">LEVEL</span>
          </div>
        </div>

        {/* Main Interface Rack - Centered Cluster with Equal Gutters */}
        <div className="relative flex items-center justify-center min-h-[300px]">
          
          {/* The Cluster Grid - Mobile Reflow: Meter -> CRT -> Knob */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center justify-items-center w-full max-w-3xl relative z-10">
            
            {/* Left Module: Meter or Switch A */}
            <div className="w-full flex justify-center items-center h-full order-1 md:order-1">
              {currentQuestion.type === "slider" ? (
                <div className="transform scale-90 md:scale-100 origin-center">
                   <VUMeter value={knobValue} />
                </div>
              ) : (
                <div className="w-full max-w-[200px] text-center space-y-3 hidden md:block">
                  <div className="font-pixel text-[9px] text-[#555] uppercase tracking-widest mb-1">OPTION A</div>
                  <div 
                    onClick={() => setSwitchValue("A")}
                    className={cn(
                      "p-4 bg-[#161616] border border-[#333] rounded-[2px] text-xs font-serif italic text-gray-400 transition-all duration-200 cursor-pointer hover:border-gold/40 hover:text-gray-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]",
                      switchValue === "A" ? "border-gold/80 text-gold shadow-[0_0_10px_rgba(197,160,89,0.1)] bg-[#1a1a1a]" : ""
                    )}
                  >
                    "{currentQuestion.options?.A}"
                  </div>
                </div>
              )}
            </div>

            {/* Center Module: LCD Screen - Hero Element */}
            <div className="w-full flex justify-center items-center h-full order-2 md:order-2">
              <div className="transform scale-100 origin-center w-full max-w-[320px]">
                <LCDScreen 
                  text={currentQuestion.text} 
                  subtext={`Q.${currentQuestionIndex + 1} // ${currentQuestion.category}`}
                  className="h-32 md:h-40 w-full shadow-[0_0_30px_rgba(0,255,0,0.05)]"
                />
              </div>
            </div>

            {/* Right Module: Knob or Switch B */}
            <div className="w-full flex justify-center items-center h-full order-3 md:order-3">
              {currentQuestion.type === "slider" ? (
                <div className="transform scale-90 md:scale-100 origin-center">
                  <RotaryKnob 
                    value={knobValue} 
                    min={0} 
                    max={100} 
                    onChange={setKnobValue}
                    label="INTENSITY" 
                  />
                </div>
              ) : (
                <div className="w-full max-w-[200px] flex flex-col items-center gap-5">
                  {/* Mobile Only: Option A (moved here for vertical stack) */}
                  <div className="w-full text-center md:hidden space-y-3 mb-4">
                    <div className="font-pixel text-[9px] text-[#555] uppercase tracking-widest mb-1">OPTION A</div>
                    <div 
                      onClick={() => setSwitchValue("A")}
                      className={cn(
                        "p-4 bg-[#161616] border border-[#333] rounded-[2px] text-xs font-serif italic text-gray-400 transition-all duration-200 cursor-pointer hover:border-gold/40 hover:text-gray-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]",
                        switchValue === "A" ? "border-gold/80 text-gold shadow-[0_0_10px_rgba(197,160,89,0.1)] bg-[#1a1a1a]" : ""
                      )}
                    >
                      "{currentQuestion.options?.A}"
                    </div>
                  </div>

                  <div className="w-full text-center">
                    <div className="font-pixel text-[9px] text-[#555] uppercase tracking-widest mb-1 md:block hidden">OPTION B</div>
                    <div className="font-pixel text-[9px] text-[#555] uppercase tracking-widest mb-1 md:hidden">OPTION B</div>
                    <div 
                      onClick={() => setSwitchValue("B")}
                      className={cn(
                        "p-4 bg-[#161616] border border-[#333] rounded-[2px] text-xs font-serif italic text-gray-400 transition-all duration-200 cursor-pointer hover:border-gold/40 hover:text-gray-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]",
                        switchValue === "B" ? "border-gold/80 text-gold shadow-[0_0_10px_rgba(197,160,89,0.1)] bg-[#1a1a1a]" : ""
                      )}
                    >
                      "{currentQuestion.options?.B}"
                    </div>
                  </div>
                  
                  {/* Toggle Switch centered below options */}
                  <div className="pt-1">
                    <ToggleSwitch 
                      value={switchValue} 
                      onChange={setSwitchValue}
                      labelA="A"
                      labelB="B"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </PluginShell>
  );
}
