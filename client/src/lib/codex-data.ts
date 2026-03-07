import { CodexEntry } from "./codex-schema";

export const CODEX_ENTRIES: CodexEntry[] = [
  {
    id: "MOVE_REPAIR_48H",
    title: "Repair in 48 Hours",
    category: "Conflict",
    flywheel_node: ["Relationship"],
    leak_types: ["rupture_hang", "silence_tax", "politics_drag"],
    dominant_forces: ["avoidance_unrepaired_rupture", "image_performance"],
    time_commitment: "10 min",
    use_when: "Tension flares (or goes quiet) and you can feel the relationship strain starting to calcify.",
    difficulty: 3,
    script: "Hey — I think something got strained between us.\n\nHere’s my part: _____.\n\nI imagine that may have landed as _____.\n\nHow did it land for you?\n\nWhat would repair look like from your side?\n\nThank you. Here’s what I’m committing to next time: _____.",
    protocol: [
      "Schedule a 10-minute repair window within 48 hours (so it doesn’t grow teeth).",
      "Open with naming the rupture in one sentence. No backstory.",
      "Own your part (behavior), then name possible impact (guess, not accusation).",
      "Ask how it landed; listen without rebuttal.",
      "Make a repair request: one specific change for next time.",
      "Close with gratitude + one commitment each."
    ],
    why_it_works: "Most teams don’t lack trust—they lack repair speed. This protocol reduces relational debt by closing loops before stories harden. It shifts conflict from courtroom facts to impact, values, and commitments.",
    watch_for: [
      "Defensiveness disguised as ‘clarifying facts.’",
      "Turning repair into a performance of humility.",
      "Skipping commitments (“glad we talked” without behavior change)."
    ],
    context_tags: ["1on1", "peer", "direct_report"]
  },
  {
    id: "MOVE_TRUTH_WEATHER",
    title: "Truth Weather",
    category: "Culture",
    flywheel_node: ["Identity"],
    leak_types: ["silence_tax", "scarcity_weather", "meeting_drain"],
    dominant_forces: ["fear_scarcity", "image_performance"],
    time_commitment: "3 min",
    use_when: "Meetings feel performative, tense, or weirdly ‘fine’—and the real room is elsewhere.",
    difficulty: 2,
    script: "Before we start: what weather are you bringing in today? One sentence. No fixing.\n\nI’ll go first: _____.\n\nThank you. Let’s begin.",
    protocol: [
      "Run at the start of any meeting that matters.",
      "Leader models honesty first (short and clean).",
      "Round-robin: one sentence each; no commentary.",
      "If someone overshares, gently restate: ‘one sentence, then we’ll keep moving.’"
    ],
    why_it_works: "Teams don’t become honest by policy. They become honest through repeated contact with reality. This normalizes presence, reduces masking, and lowers the cost of truth without turning the meeting into therapy.",
    watch_for: [
      "Leader ‘solving’ someone’s weather.",
      "Turning it into a long emotional check-in."
    ],
    context_tags: ["team_meeting", "kickoff"]
  },
  {
    id: "MOVE_NAME_THE_COST",
    title: "Name the Cost of Truth",
    category: "Identity",
    flywheel_node: ["Identity"],
    leak_types: ["silence_tax", "politics_drag"],
    dominant_forces: ["image_performance", "fear_scarcity"],
    time_commitment: "15 min",
    use_when: "People don’t speak plainly; important topics get discussed in DMs instead of the room.",
    difficulty: 4,
    script: "I want to ask a real question: what does it cost to tell the truth here?\n\nNot what should happen—what actually happens.\n\nWhat would lower that cost by 10% this month?",
    protocol: [
      "Ask the question in a small group (5–10) first.",
      "Capture answers verbatim without defending.",
      "Choose one cost to reduce (e.g., retaliation, embarrassment, being labeled ‘negative’).",
      "Make one visible change that proves you meant it (policy, ritual, protection, clarity).",
      "Revisit in 2 weeks: ‘Did the cost change?’"
    ],
    why_it_works: "Cultures are governed by hidden penalties. Naming the penalty breaks the spell. Small visible reductions in ‘truth cost’ create a flywheel of candor and repair.",
    watch_for: [
      "Punishing the first honest answer through tone or later consequences.",
      "Turning the conversation into a debate about intentions."
    ],
    context_tags: ["team_meeting", "all_hands"]
  },
  {
    id: "MOVE_STOP_LIST",
    title: "Stop List",
    category: "Vision",
    flywheel_node: ["Vision"],
    leak_types: ["meaning_collapse", "meeting_drain", "role_fog", "scarcity_weather"],
    dominant_forces: ["meaning_drift", "control_forcing"],
    time_commitment: "20 min",
    use_when: "Everything is ‘priority,’ the team is overloaded, and your yes feels like a lie.",
    difficulty: 3,
    script: "We’re going to stop pretending everything matters equally.\n\nHere are the things we are actively stopping or pausing this month: _____.\n\nIf we don’t stop something, our ‘yes’ isn’t real.",
    protocol: [
      "List current active initiatives (not hopes—actual work).",
      "Pick 1–2 to stop/pause/reduce visibly.",
      "Publish the stop list where people can see it.",
      "Review weekly for 2 minutes: ‘Did we actually stop?’"
    ],
    why_it_works: "A stop list restores integrity. It reduces threat load, clarifies tradeoffs, and signals that leadership is protecting the team from infinite demand.",
    watch_for: [
      "Stopping invisible work no one feels.",
      "Letting exceptions quietly re-enter."
    ],
    context_tags: ["planning", "strategy"]
  },
  {
    id: "MOVE_DECISION_RIGHTS",
    title: "Decision Rights Map",
    category: "Alignment",
    flywheel_node: ["Vision"],
    leak_types: ["role_fog", "politics_drag", "meeting_drain"],
    dominant_forces: ["control_forcing", "image_performance"],
    time_commitment: "15 min",
    use_when: "Confusion about ownership creates churn, politics, and repeat debates.",
    difficulty: 2,
    script: "For this area, let’s clarify decision rights so we stop paying the ambiguity tax.\n\nOwner = drives the work. Decider = final call. Consult = input. Inform = kept in loop.",
    protocol: [
      "Pick one hot domain (roadmap, scope, hiring, priorities).",
      "Fill Owner/Decider/Consult/Inform live in the meeting.",
      "Write it somewhere visible and link it in your recurring meeting.",
      "Run it for 2 weeks, then adjust."
    ],
    why_it_works: "Role fog creates anxiety, which becomes politics. Decision clarity reduces backchannels and speeds learning.",
    watch_for: [
      "Treating ‘consult’ as veto.",
      "Naming a decider who won’t decide."
    ],
    context_tags: ["project_kickoff", "role_clarity"]
  },
  {
    id: "MOVE_MEETING_REWRITE",
    title: "Meeting Rewrite",
    category: "Culture",
    flywheel_node: ["Culture"],
    leak_types: ["meeting_drain", "politics_drag", "role_fog"],
    dominant_forces: ["control_forcing", "meaning_drift"],
    time_commitment: "20 min",
    use_when: "Your most frequent meeting produces fatigue, not clarity.",
    difficulty: 2,
    script: "We’re rewriting this meeting like a tool: purpose, output, roles, and a timebox.\n\nIf we can’t name the output, we shouldn’t be meeting.",
    protocol: [
      "Choose the most hated recurring meeting.",
      "Define Purpose (one sentence) and Output (decision/plan/clarity).",
      "Assign roles: facilitator, timekeeper, decider.",
      "Timebox 20–30% shorter than current.",
      "Ban updates unless they directly serve the output.",
      "Run it twice before judging."
    ],
    why_it_works: "Meetings are culture rituals. Redesigning one high-frequency ritual changes the lived reality of the team faster than any values statement.",
    watch_for: [
      "Letting updates swallow the timebox.",
      "Pretending a decision will happen when it can’t."
    ],
    context_tags: ["recurring_meeting", "team_sync"]
  },
  {
    id: "MOVE_WIP_LIMIT",
    title: "WIP Limit",
    category: "Culture",
    flywheel_node: ["Culture"],
    leak_types: ["scarcity_weather", "hero_subsidy", "meeting_drain"],
    dominant_forces: ["fear_scarcity", "control_forcing"],
    time_commitment: "10 min",
    use_when: "The team is overwhelmed because too much is active at once.",
    difficulty: 3,
    script: "We’re not overwhelmed because we’re weak. We’re overwhelmed because we’re overloaded.\n\nWe’re putting a cap on active work so we can finish what matters.",
    protocol: [
      "Count active initiatives (anything consuming real time).",
      "Set a cap (often 3–5).",
      "Move everything else to ‘Not Now’ (visible).",
      "Weekly: only add one new thing when one exits."
    ],
    why_it_works: "WIP limits lower nervous-system load and restore completion. Completing work rebuilds confidence and reduces scarcity weather.",
    watch_for: [
      "Secretly continuing ‘Not Now’ work.",
      "Exception creep."
    ],
    context_tags: ["sprint_planning", "workload_management"]
  },
  {
    id: "MOVE_MINORITY_REPORT",
    title: "Minority Report",
    category: "Alignment",
    flywheel_node: ["Relationship"],
    leak_types: ["politics_drag", "silence_tax", "role_fog"],
    dominant_forces: ["image_performance", "fear_scarcity"],
    time_commitment: "5 min",
    use_when: "Decisions feel fragile because dissent happens in private after the meeting.",
    difficulty: 3,
    script: "Before we finalize: who will offer a minority report—the best argument against this plan?\n\nThis isn’t sabotage. It’s love for reality.",
    protocol: [
      "Ask for a minority report before finalizing any significant decision.",
      "Listen without rebuttal.",
      "Ask: ‘Does this change our decision, or just our risk mitigation?’",
      "Thank the dissenter visibly."
    ],
    why_it_works: "It flips dissent from 'disloyalty' to 'value.' It extracts the wisdom from the skeptics and prevents the 'Abilene Paradox' (where everyone agrees to something no one wants).",
    watch_for: [
      "Punishing the messenger.",
      "Using it to stall indefinitely."
    ],
    context_tags: ["decision_making", "strategy"]
  }
];
