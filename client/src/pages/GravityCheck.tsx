import { useState } from "react";
import { useLocation } from "wouter";
import PluginShell from "@/components/PluginShell";
import RotaryKnob from "@/components/ui/RotaryKnob";
import VUMeter from "@/components/ui/VUMeter";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import LCDScreen from "@/components/ui/LCDScreen";
import { questions } from "@/lib/questions";
import { calculateScore } from "@/lib/scoring";
import { cn } from "@/lib/utils";

export default function GravityCheck() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | string>>({});
  const [knobValue, setKnobValue] = useState(50); // Default to center
  const [switchValue, setSwitchValue] = useState<"A" | "B" | null>(null);
  const [, setLocation] = useLocation();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNext = () => {
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

  return (
    <PluginShell title="GRAVITY CHECK" category="MIRROR">
      <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
        
        {/* Top Control Bar - Consolidated Row with Matched Baselines */}
        <div className="flex justify-between items-end border-b border-white/5 pb-4">
          {/* Left: Signal Input */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-pixel text-[#666] tracking-widest uppercase w-24 text-right">SIGNAL INPUT</span>
            <div className="h-4 w-[1px] bg-[#333]" /> {/* Vertical Divider */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
              <span className="text-sm font-pixel text-gold tracking-widest uppercase drop-shadow-sm">
                {currentQuestion.category}
              </span>
            </div>
          </div>

          {/* Right: Level (Mirrored Padding) */}
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5 bg-[#111] p-1 rounded border border-[#333] shadow-inner">
              {[...Array(12)].map((_, i) => {
                const isActive = i < (currentQuestionIndex + 1);
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "w-1.5 h-3 rounded-[1px] transition-all duration-300",
                      isActive ? "bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]" : "bg-[#222]"
                    )} 
                  />
                );
              })}
            </div>
            <div className="h-4 w-[1px] bg-[#333]" /> {/* Vertical Divider */}
            <span className="text-[10px] font-pixel text-[#666] tracking-widest uppercase w-24 text-left">LEVEL</span>
          </div>
        </div>

        {/* Main Interface Rack - Centered Cluster with Equal Gutters */}
        <div className="relative bg-[#111] rounded-lg border border-[#222] shadow-inner p-8">
          {/* Background Texture */}
          <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-5 pointer-events-none mix-blend-overlay" />

          {/* The Cluster Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center relative z-10">
            
            {/* Left Module: Meter or Switch A */}
            <div className="w-full flex justify-center">
              {currentQuestion.type === "slider" ? (
                <VUMeter value={knobValue} label="SIGNAL STRENGTH" />
              ) : (
                <div className="w-full max-w-[240px] text-center space-y-4">
                  <div className="font-pixel text-[10px] text-[#666] uppercase tracking-widest mb-2">OPTION A</div>
                  <div 
                    onClick={() => setSwitchValue("A")}
                    className={cn(
                      "p-6 bg-[#1a1a1a] border-2 rounded-sm text-sm font-serif italic text-gray-400 transition-all duration-300 cursor-pointer hover:border-gold/50 hover:text-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]",
                      switchValue === "A" ? "border-gold text-gold shadow-[0_0_15px_rgba(197,160,89,0.15)] bg-[#222]" : "border-[#333]"
                    )}
                  >
                    "{currentQuestion.options?.A}"
                  </div>
                </div>
              )}
            </div>

            {/* Center Module: LCD Screen */}
            <div className="w-full flex justify-center">
              <LCDScreen 
                text={currentQuestion.text} 
                subtext={`Q.${currentQuestionIndex + 1} // ${currentQuestion.category}`}
                className="h-48 w-full max-w-[320px]"
              />
            </div>

            {/* Right Module: Knob or Switch B */}
            <div className="w-full flex justify-center">
              {currentQuestion.type === "slider" ? (
                <RotaryKnob 
                  value={knobValue} 
                  min={0} 
                  max={100} 
                  onChange={setKnobValue}
                  label="GAIN" 
                />
              ) : (
                <div className="w-full max-w-[240px] flex flex-col items-center gap-6">
                  <div className="w-full text-center">
                    <div className="font-pixel text-[10px] text-[#666] uppercase tracking-widest mb-2">OPTION B</div>
                    <div 
                      onClick={() => setSwitchValue("B")}
                      className={cn(
                        "p-6 bg-[#1a1a1a] border-2 rounded-sm text-sm font-serif italic text-gray-400 transition-all duration-300 cursor-pointer hover:border-gold/50 hover:text-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]",
                        switchValue === "B" ? "border-gold text-gold shadow-[0_0_15px_rgba(197,160,89,0.15)] bg-[#222]" : "border-[#333]"
                      )}
                    >
                      "{currentQuestion.options?.B}"
                    </div>
                  </div>
                  
                  {/* Toggle Switch centered below options */}
                  <div className="pt-2">
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

        {/* Bottom Control: Next Button - Anchored to Right Rail */}
        <div className="flex justify-end pt-2 border-t border-white/5">
          <button
            onClick={handleNext}
            disabled={currentQuestion.type === "scenario" && !switchValue}
            className={cn(
              "group relative px-10 py-4 bg-[#222] border-2 border-[#444] rounded-sm shadow-[0_4px_0_#111] active:shadow-none active:translate-y-[4px] transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:border-gold/50 hover:text-gold hover:shadow-[0_4px_0_#111,0_0_15px_rgba(197,160,89,0.1)]"
            )}
          >
            <span className="font-pixel text-xs tracking-[0.2em] uppercase text-[#888] group-hover:text-gold transition-colors">
              {isLastQuestion ? "INITIALIZE ORBIT" : "NEXT SIGNAL"}
            </span>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[#666] rotate-45 group-hover:border-gold transition-colors group-hover:translate-x-1 duration-300" />
          </button>
        </div>

      </div>
    </PluginShell>
  );
}
