export type QuestionType = "slider" | "scenario";

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  subtext?: string;
  category: "IDENTITY" | "RELATIONSHIP" | "VISION" | "CULTURE";
  options?: { A: string; B: string }; // For scenario questions
}

export const questions: Question[] = [
  // IDENTITY (3 Questions)
  {
    id: 1,
    type: "slider",
    text: "I feel a deep sense of personal agency in my role, not just a list of tasks.",
    category: "IDENTITY"
  },
  {
    id: 2,
    type: "scenario",
    text: "When you make a mistake here, what is the immediate internal reaction?",
    category: "IDENTITY",
    options: {
      A: "Hide it. Fix it before anyone sees.",
      B: "Own it. Share it so we can learn."
    }
  },
  {
    id: 3,
    type: "slider",
    text: "I know exactly who I am as a leader, separate from my title or performance.",
    category: "IDENTITY"
  },

  // RELATIONSHIP (3 Questions)
  {
    id: 4,
    type: "slider",
    text: "We have 'fridge rights' with each other.",
    subtext: "I could walk into their kitchen, open the fridge, and make a sandwich and they wouldn't raise an eyebrow.",
    category: "RELATIONSHIP"
  },
  {
    id: 5,
    type: "scenario",
    text: "When a team member is struggling, the dominant response is:",
    category: "RELATIONSHIP",
    options: {
      A: "Judgment. 'Why can't they keep up?'",
      B: "Curiosity. 'What's actually going on?'"
    }
  },
  {
    id: 6,
    type: "slider",
    text: "Conflict here is frequent, healthy, and resolves without lingering resentment.",
    category: "RELATIONSHIP"
  },

  // VISION (3 Questions)
  {
    id: 7,
    type: "slider",
    text: "Our vision is a gravity well—it pulls us forward even when we're tired.",
    category: "VISION"
  },
  {
    id: 8,
    type: "scenario",
    text: "If we hit a major roadmap block, the team usually:",
    category: "VISION",
    options: {
      A: "Scrambles. Panic. 'What do we do now?'",
      B: "Pivots. Calm. 'The goal hasn't changed.'"
    }
  },
  {
    id: 9,
    type: "slider",
    text: "I can clearly articulate *why* our work matters to the world in one sentence.",
    category: "VISION"
  },

  // CULTURE (3 Questions)
  {
    id: 10,
    type: "slider",
    text: "Our rituals (meetings, reviews) give us energy rather than draining it.",
    category: "CULTURE"
  },
  {
    id: 11,
    type: "scenario",
    text: "The 'unwritten rules' of this place reward:",
    category: "CULTURE",
    options: {
      A: "Busyness. Looking like you're working hard.",
      B: "Impact. Actually moving the needle."
    }
  },
  {
    id: 12,
    type: "slider",
    text: "We celebrate 'who people are becoming' as much as 'what they are doing'.",
    category: "CULTURE"
  }
];
