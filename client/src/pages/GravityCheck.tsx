import { useState } from "react";
import { useLocation } from "wouter";
import PluginShell from "@/components/PluginShell";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { calculateScore } from "@/lib/scoring";

// Question Types
type QuestionType = "SLIDER" | "SCENARIO";

interface Question {
  id: number;
  type: QuestionType;
  text: string;
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
    text: "We have 'fridge rights' with each other—we can be unpolished and real.",
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

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate results using the real scoring engine
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
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Progress Bar */}
        <div className="w-full bg-forest-deep h-2 border border-wood rounded-full overflow-hidden">
          <div 
            className="h-full bg-gold transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Area */}
        <div className="min-h-[300px] flex flex-col justify-center space-y-8">
          <div className="space-y-2 text-center">
            <span className="text-gold/50 font-pixel text-xs tracking-widest">
              {currentQuestion.category} SIGNAL CHECK
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-gold-light leading-tight">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Interaction Area */}
          <div className="pt-8 px-4 md:px-12">
            {currentQuestion.type === "SLIDER" ? (
              <div className="space-y-6">
                <Slider
                  defaultValue={[3]}
                  max={5}
                  min={1}
                  step={1}
                  onValueChange={(vals) => handleAnswer(vals[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs font-pixel text-muted-foreground uppercase tracking-wider">
                  <span>Strongly Disagree</span>
                  <span>Strongly Agree</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options?.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={cn(
                      "p-6 border-2 border-wood bg-forest-deep/50 hover:bg-forest hover:border-gold transition-all text-left group",
                      answers[currentQuestion.id] === opt.value && "border-gold bg-forest"
                    )}
                  >
                    <div className={cn(
                      "w-4 h-4 border border-gold rounded-full mb-4 group-hover:bg-gold/20",
                      answers[currentQuestion.id] === opt.value && "bg-gold"
                    )} />
                    <span className="font-serif text-lg text-gold-light">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end pt-8 border-t border-wood/30">
          <Button 
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className="bg-gold hover:bg-gold-light text-forest-deep font-pixel text-xs px-8 py-6 tracking-widest"
          >
            {isLastQuestion ? "CALCULATE ORBIT" : "NEXT SIGNAL >"}
          </Button>
        </div>
      </div>
    </PluginShell>
  );
}
