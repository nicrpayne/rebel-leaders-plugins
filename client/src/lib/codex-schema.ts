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
  use_when: string; // One-liner diagnostic trigger
  
  // Content
  script: string; // The exact words to say
  protocol: string[]; // Step-by-step execution guide
  why_it_works?: string; // Optional, collapsible theory
  watch_for?: string[]; // Pitfalls to avoid
  
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
    use_when: "Use when you've had a heated interaction and the air feels thick, but you haven't addressed it yet.",
    script: "I realized I came in hot yesterday. I was focused on the deadline, but I missed the point you were making about capacity. I want to clean that up. Can we reset?",
    protocol: [
      "Wait at least 2 hours but no more than 48 hours.",
      "Request a 10-minute sync (face-to-face or video, never text).",
      "Own your part specifically (don't say 'we both got heated').",
      "Ask for a reset, not forgiveness."
    ],
    why_it_works: "Speed is the variable. Repairing within 48 hours prevents the 'narrative gap' where the other person invents a story about your motives.",
    watch_for: ["Don't explain WHY you were angry.", "Don't ask them to apologize back."]
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
    use_when: "Use when the team is treating a new initiative as 'just another task' instead of a strategic shift.",
    script: "We aren't doing this because corporate asked. We are doing this because if we don't solve [Problem X] by Q3, we lose our ability to [Core Mission Y]. This is about protecting our standard.",
    protocol: [
      "Identify the 'Default Future' (what happens if we do nothing).",
      "Identify the 'Altered Future' (what happens if we succeed).",
      "Present the gap as the enemy, not the workload."
    ],
    why_it_works: "People don't buy 'what' or 'how' until they feel the 'why'. Framing it as protection of standards triggers loss aversion and pride."
  }
];
