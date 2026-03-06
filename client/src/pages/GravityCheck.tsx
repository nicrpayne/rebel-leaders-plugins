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
      // Convert answers to number-only format for scoring if needed
      // The scoring function expects Record<number, number>
      // We need to ensure switch values are numbers before passing
      const numericAnswers: Record<number, number> = {};
      Object.entries(newAnswers).forEach(([key, val]) => {
        if (typeof val === "string") {
           // If it's "A" or "B", we need to map it back to the value
           // But wait, the switchValue state is "A" or "B", but we need the numeric value
           // Let's fix the state logic below
        } else {
          numericAnswers[Number(key)] = val as number;
        }
      });
      
      // Actually, let's just fix the handleNext logic to store the numeric value directly
      // But for now, let's just pass the numeric map we build here
      // Re-mapping logic:
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
           // We need to find the question to know which is 1 and which is 5
           // But for simplicity, let's assume A=1 (negative) and B=5 (positive) as per the questions file
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
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        
        {/* Top Control Bar (LED Progress & Signal Input) */}
        <div className="flex justify-between items-end px-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-pixel text-[#666] tracking-widest uppercase">SIGNAL INPUT</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
              <span className="text-sm font-pixel text-gold tracking-widest uppercase drop-shadow-sm">
                {currentQuestion.category}
              </span>
            </div>
          </div>

          {/* LED Segment Progress Bar */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[8px] font-pixel text-[#444] tracking-widest uppercase">LEVEL</span>
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
          </div>
        </div>

        {/* Main Interface Rack */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#111] p-8 rounded-lg border border-[#222] shadow-inner relative">
          {/* Background Texture */}
          <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-5 pointer-events-none mix-blend-overlay" />

          {/* Left Module: Meter or Switch A */}
          <div className="md:col-span-4 flex justify-center order-2 md:order-1">
            {currentQuestion.type === "slider" ? (
              <VUMeter value={knobValue} label="SIGNAL STRENGTH" />
            ) : (
              <div className="text-center space-y-4">
                <div className="font-pixel text-xs text-[#888] uppercase tracking-widest mb-2">OPTION A</div>
                <div className={cn(
                  "p-4 bg-[#1a1a1a] border-2 rounded text-sm font-serif italic text-gray-400 transition-all duration-300 cursor-pointer hover:border-gold/50",
                  switchValue === "A" ? "border-gold text-gold shadow-[0_0_10px_rgba(197,160,89,0.2)]" : "border-[#333]"
                )} onClick={() => setSwitchValue("A")}>
                  "{currentQuestion.options?.A}"
                </div>
              </div>
            )}
          </div>

          {/* Center Module: LCD Screen */}
          <div className="md:col-span-4 order-1 md:order-2">
            <LCDScreen 
              text={currentQuestion.text} 
              subtext={`Q.${currentQuestionIndex + 1} // ${currentQuestion.category}`}
              className="h-48"
            />
          </div>

          {/* Right Module: Knob or Switch B */}
          <div className="md:col-span-4 flex justify-center order-3">
            {currentQuestion.type === "slider" ? (
              <RotaryKnob 
                value={knobValue} 
                min={0} 
                max={100} 
                onChange={setKnobValue}
                label="GAIN" 
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="text-center w-full">
                  <div className="font-pixel text-xs text-[#888] uppercase tracking-widest mb-2">OPTION B</div>
                  <div className={cn(
                    "p-4 bg-[#1a1a1a] border-2 rounded text-sm font-serif italic text-gray-400 transition-all duration-300 mb-4 cursor-pointer hover:border-gold/50",
                    switchValue === "B" ? "border-gold text-gold shadow-[0_0_10px_rgba(197,160,89,0.2)]" : "border-[#333]"
                  )} onClick={() => setSwitchValue("B")}>
                    "{currentQuestion.options?.B}"
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

        {/* Bottom Control: Next Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handleNext}
            disabled={currentQuestion.type === "scenario" && !switchValue}
            className={cn(
              "group relative px-8 py-3 bg-[#222] border-2 border-[#444] rounded shadow-[0_4px_0_#111] active:shadow-none active:translate-y-[4px] transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:border-gold/50 hover:text-gold hover:shadow-[0_4px_0_#111,0_0_10px_rgba(197,160,89,0.2)]"
            )}
          >
            <span className="font-pixel text-xs tracking-[0.2em] uppercase text-[#888] group-hover:text-gold transition-colors">
              {isLastQuestion ? "INITIALIZE ORBIT" : "NEXT SIGNAL"}
            </span>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[#666] rotate-45 group-hover:border-gold transition-colors group-hover:translate-x-1 duration-300" />
          </button>
        </div>

      </div>
    </PluginShell>
  );
}
