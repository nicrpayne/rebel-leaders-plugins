import { useState } from "react";
import { useLocation } from "wouter";
import PluginShell from "@/components/PluginShell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { calculateScore } from "@/lib/scoring";
import RotaryKnob from "@/components/ui/RotaryKnob";
import VUMeter from "@/components/ui/VUMeter";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import LCDScreen from "@/components/ui/LCDScreen";

// Question Types
type QuestionType = "SLIDER" | "SCENARIO";

interface Question {
  id: number;
  type: QuestionType;
  text: string;
  subtext?: string;
  category: "IDENTITY" | "RELATIONSHIP" | "VISION" | "CULTURE";
  options?: { label: string; value: number }[]; // For scenario questions
}

const QUESTIONS: Question[] = [
  // IDENTITY (3 Questions)
  {
    id: 1,
    type: "SLIDER",
    text: "I feel a deep sense of personal agency in my role, not just a list of tasks.",
    category: "IDENTITY"
  },
  {
    id: 2,
    type: "SCENARIO",
    text: "When you make a mistake here, what is the immediate internal reaction?",
    category: "IDENTITY",
    options: [
      { label: "Hide it. Fix it before anyone sees.", value: 1 },
      { label: "Own it. Share it so we can learn.", value: 5 }
    ]
  },
  {
    id: 3,
    type: "SLIDER",
    text: "I know exactly who I am as a leader, separate from my title or performance.",
    category: "IDENTITY"
  },

  // RELATIONSHIP (3 Questions)
  {
    id: 4,
    type: "SLIDER",
    text: "We have 'fridge rights' with each other.",
    subtext: "I could walk into their kitchen, open the fridge, and make a sandwich and they wouldn't raise an eyebrow.",
    category: "RELATIONSHIP"
  },
  {
    id: 5,
    type: "SCENARIO",
    text: "When a team member is struggling, the dominant response is:",
    category: "RELATIONSHIP",
    options: [
      { label: "Judgment. 'Why can't they keep up?'", value: 1 },
      { label: "Curiosity. 'What's actually going on?'", value: 5 }
    ]
  },
  {
    id: 6,
    type: "SLIDER",
    text: "Conflict here is frequent, healthy, and resolves without lingering resentment.",
    category: "RELATIONSHIP"
  },

  // VISION (3 Questions)
  {
    id: 7,
    type: "SLIDER",
    text: "Our vision is a gravity well—it pulls us forward even when we're tired.",
    category: "VISION"
  },
  {
    id: 8,
    type: "SCENARIO",
    text: "If we hit a major roadmap block, the team usually:",
    category: "VISION",
    options: [
      { label: "Scrambles. Panic. 'What do we do now?'", value: 1 },
      { label: "Pivots. Calm. 'The goal hasn't changed.'", value: 5 }
    ]
  },
  {
    id: 9,
    type: "SLIDER",
    text: "I can clearly articulate *why* our work matters to the world in one sentence.",
    category: "VISION"
  },

  // CULTURE (3 Questions)
  {
    id: 10,
    type: "SLIDER",
    text: "Our rituals (meetings, reviews) give us energy rather than draining it.",
    category: "CULTURE"
  },
  {
    id: 11,
    type: "SCENARIO",
    text: "The 'unwritten rules' of this place reward:",
    category: "CULTURE",
    options: [
      { label: "Busyness. Looking like you're working hard.", value: 1 },
      { label: "Impact. Actually moving the needle.", value: 5 }
    ]
  },
  {
    id: 12,
    type: "SLIDER",
    text: "We celebrate 'who people are becoming' as much as 'what they are doing'.",
    category: "CULTURE"
  }
];

export default function GravityCheck() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [, setLocation] = useLocation();

  const currentQuestion = QUESTIONS[currentStep];
  const isLastQuestion = currentStep === QUESTIONS.length - 1;

  // Default knob value to 3 (midpoint) if not answered yet
  const currentKnobValue = answers[currentQuestion.id] || 3;

  const handleAnswer = (value: number | "A" | "B") => {
    if (typeof value === "string") {
      // Handle toggle switch logic
      const val = value === "A" ? currentQuestion.options![0].value : currentQuestion.options![1].value;
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
    } else {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const result = calculateScore(answers);
      localStorage.setItem("gravity_check_results", JSON.stringify(result));
      setLocation("/results");
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <PluginShell title="GRAVITY CHECK" category="MIRROR">
      <div className="max-w-4xl mx-auto">
        {/* The Rack Unit Faceplate */}
        <div className="relative bg-[#1a1a1a] border-t-2 border-b-2 border-[#333] shadow-2xl rounded-lg overflow-hidden">
          {/* Rack Ears */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#111] border-r border-[#333] flex flex-col justify-between py-4 items-center">
            <div className="w-4 h-4 rounded-full bg-[#222] border border-[#444] shadow-inner" />
            <div className="w-4 h-4 rounded-full bg-[#222] border border-[#444] shadow-inner" />
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-[#111] border-l border-[#333] flex flex-col justify-between py-4 items-center">
            <div className="w-4 h-4 rounded-full bg-[#222] border border-[#444] shadow-inner" />
            <div className="w-4 h-4 rounded-full bg-[#222] border border-[#444] shadow-inner" />
          </div>

          {/* Main Interface Area */}
          <div className="mx-8 p-8 md:p-12 space-y-8 bg-[url('/metal-texture.png')] bg-repeat">
            
            {/* Top Section: Signal Category & Progress */}
            <div className="flex justify-between items-center border-b border-[#333] pb-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-pixel text-gold/70 tracking-widest uppercase">
                  SIGNAL INPUT: {currentQuestion.category}
                </span>
              </div>
              <div className="w-32 h-2 bg-[#111] rounded-full overflow-hidden border border-[#333]">
                <div 
                  className="h-full bg-gold transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Middle Section: The Hardware Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Control (VU Meter or Switch A) */}
              <div className="lg:col-span-3 flex justify-center order-2 lg:order-1">
                {currentQuestion.type === "SLIDER" ? (
                  <VUMeter 
                    value={(currentKnobValue / 5) * 100} 
                    label="SIGNAL STRENGTH" 
                  />
                ) : (
                  <div className="text-center space-y-2">
                    <div className={cn(
                      "w-4 h-4 rounded-full mx-auto transition-colors duration-300",
                      answers[currentQuestion.id] === currentQuestion.options![0].value ? "bg-gold shadow-[0_0_10px_#c5a059]" : "bg-[#222]"
                    )} />
                    <span className="text-[10px] font-pixel text-gold/50 tracking-widest">CHANNEL A</span>
                  </div>
                )}
              </div>

              {/* Center Screen (LCD) */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <LCDScreen 
                  text={currentQuestion.text} 
                  subtext={currentQuestion.subtext}
                  className="h-48 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Right Control (Knob or Switch B) */}
              <div className="lg:col-span-3 flex justify-center order-3">
                {currentQuestion.type === "SLIDER" ? (
                  <RotaryKnob
                    value={currentKnobValue}
                    min={1}
                    max={5}
                    step={0.1} // Smooth dragging
                    onChange={(val) => handleAnswer(val)}
                    label="GAIN"
                  />
                ) : (
                  <ToggleSwitch
                    value={
                      answers[currentQuestion.id] === currentQuestion.options![0].value ? "A" :
                      answers[currentQuestion.id] === currentQuestion.options![1].value ? "B" : null
                    }
                    onChange={(val) => handleAnswer(val)}
                    labelA={currentQuestion.options![0].label}
                    labelB={currentQuestion.options![1].label}
                  />
                )}
              </div>
            </div>

            {/* Bottom Section: Navigation */}
            <div className="flex justify-end pt-8 border-t border-[#333] mt-8">
              <Button 
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className="bg-[#222] hover:bg-[#333] text-gold border border-[#444] font-pixel text-xs px-8 py-6 tracking-widest shadow-lg active:translate-y-1 transition-all"
              >
                {isLastQuestion ? "CALCULATE ORBIT" : "NEXT SIGNAL >"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PluginShell>
  );
}
