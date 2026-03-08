export type CodexCategory = "Conflict" | "Vision" | "Alignment" | "Culture" | "Identity" | "Relationship";
export type FlywheelNode = "Identity" | "Relationship" | "Vision" | "Culture";
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface CodexEntry {
  id: string;
  title: string;
  category: CodexCategory;
  
  // Routing Keys (for Side-Chain Logic)
  flywheel_node: FlywheelNode[];
  leak_types: string[]; // e.g., "silence_tax", "meeting_drain"
  dominant_forces: string[]; // e.g., "fear_scarcity", "image_performance"
  context_tags: string[]; // e.g., "remote", "new_team", "exec", "1on1"
  
  // Metadata
  difficulty: Difficulty;
  time_commitment: string; // e.g., "10 min"
  pack?: string; // e.g., "Core Protocols v1", "Coaching Pack v1"
  
  // Tactical Briefing (New Structure)
  briefing: {
    objective: string; // One-sentence mission objective
    use_when: string[]; // 3 bullet points
    avoid: string[]; // 1-2 bullet points
    outcome: string; // What changes if you run it
  };
  
  // Content
  script: string; // The exact words to say
  protocol: string[]; // Step-by-step execution guide
  
  // Coaching Pack Specific Fields
  keys_primary?: string[];
  keys_secondary?: string[];
  keys_notes?: string;
  why_it_works?: string;
  
  // Proof / Research (New Structure)
  proof?: {
    research?: string[]; // 2-4 bullet points (1-2 sentences each)
    books?: { title: string; author: string; chapter?: string }[];
    field_notes?: string[]; // Ancient wisdom / modern science tie-ins
  };
  
  // Legacy fields (to be deprecated or mapped)
  use_when?: string; 
  watch_for?: string[]; 
  
  // Status
  is_premium?: boolean; // For future gating
}

// Placeholder Data for UI Development
export const MOCK_CODEX_ENTRIES: CodexEntry[] = [
  {
    id: "MOVE_REPAIR_48H",
    title: "Repair in 48 Hours",
    category: "Conflict",
    flywheel_node: ["Relationship", "Culture"],
    leak_types: ["silence_tax", "trust_erosion"],
    dominant_forces: ["fear_scarcity"],
    context_tags: ["1on1", "peer", "direct_report"],
    difficulty: 3,
    time_commitment: "15 min",
    briefing: {
      objective: "Close the narrative gap before it hardens into resentment.",
      use_when: [
        "You've had a heated interaction and the air feels thick.",
        "You notice a team member avoiding eye contact or Slack replies.",
        "You feel a lingering 'hangover' from a previous meeting."
      ],
      avoid: [
        "Waiting for the 'perfect time' (it doesn't exist).",
        "Explaining WHY you were angry (just own the impact)."
      ],
      outcome: "Restores psychological safety and prevents a single bad moment from becoming a permanent dynamic."
    },
    script: "I realized I came in hot yesterday. I was focused on the deadline, but I missed the point you were making about capacity. I want to clean that up. Can we reset?",
    protocol: [
      "Wait at least 2 hours but no more than 48 hours.",
      "Request a 10-minute sync (face-to-face or video, never text).",
      "Own your part specifically (don't say 'we both got heated').",
      "Ask for a reset, not forgiveness."
    ],
    proof: {
      research: [
        "Gottman Institute studies show that successful relationships aren't defined by lack of conflict, but by the speed and quality of repair.",
        "Neuroscience indicates that unresolved social threat triggers the same neural pathways as physical pain, reducing cognitive function."
      ],
      books: [
        { title: "The Culture Code", author: "Daniel Coyle", chapter: "Share Vulnerability" },
        { title: "Crucial Conversations", author: "Patterson et al." }
      ],
      field_notes: [
        "In high-stakes environments (SEAL teams, ER units), repair must happen immediately to maintain operational integrity."
      ]
    }
  },
  {
    id: "MOVE_VISION_CAST",
    title: "The 'Why Now' Frame",
    category: "Vision",
    flywheel_node: ["Vision", "Identity"],
    leak_types: ["alignment_drift", "purpose_void"],
    dominant_forces: ["apathy_drift"],
    context_tags: ["team_meeting", "kickoff", "all_hands"],
    difficulty: 2,
    time_commitment: "5 min",
    briefing: {
      objective: "Transform a generic task into a strategic imperative.",
      use_when: [
        "The team treats a new initiative as 'just another task'.",
        "Energy is low during a kickoff meeting.",
        "You hear 'we'll get to it if we have time'."
      ],
      avoid: [
        "Focusing only on the 'what' or 'how'.",
        "Using corporate buzzwords without connecting to the mission."
      ],
      outcome: "Shifts the team from compliance to commitment by connecting the task to survival or identity."
    },
    script: "We aren't doing this because corporate asked. We are doing this because if we don't solve [Problem X] by Q3, we lose our ability to [Core Mission Y]. This is about protecting our standard.",
    protocol: [
      "Identify the 'Default Future' (what happens if we do nothing).",
      "Identify the 'Altered Future' (what happens if we succeed).",
      "Present the gap as the enemy, not the workload."
    ],
    proof: {
      research: [
        "Simon Sinek's 'Golden Circle' theory demonstrates that inspiration starts with 'Why'.",
        "Loss aversion bias makes people more motivated to avoid a loss (the Default Future) than to acquire a gain."
      ],
      books: [
        { title: "Start with Why", author: "Simon Sinek" },
        { title: "Made to Stick", author: "Chip & Dan Heath" }
      ]
    }
  }
];
