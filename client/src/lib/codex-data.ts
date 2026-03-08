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
    difficulty: 3,
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
    script: "Hey — I think something got strained between us.\n\nHere’s my part: _____.\n\nI imagine that may have landed as _____.\n\nHow did it land for you?\n\nWhat would repair look like from your side?\n\nThank you. Here’s what I’m committing to next time: _____.",
    protocol: [
      "Schedule a 10-minute repair window within 48 hours (so it doesn’t grow teeth).",
      "Open with naming the rupture in one sentence. No backstory.",
      "Own your part (behavior), then name possible impact (guess, not accusation).",
      "Ask how it landed; listen without rebuttal.",
      "Make a repair request: one specific change for next time.",
      "Close with gratitude + one commitment each."
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
    },
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
    difficulty: 2,
    briefing: {
      objective: "Normalize honesty and reduce masking in high-stakes meetings.",
      use_when: [
        "Meetings feel performative, tense, or weirdly 'fine'.",
        "The real conversation happens in the hallway after the meeting.",
        "Energy is low and people are checking out."
      ],
      avoid: [
        "Trying to 'fix' someone's weather.",
        "Turning it into a long emotional check-in."
      ],
      outcome: "Lowers the cost of truth and creates a baseline of reality for the meeting."
    },
    script: "Before we start: what weather are you bringing in today? One sentence. No fixing.\n\nI’ll go first: _____.\n\nThank you. Let’s begin.",
    protocol: [
      "Run at the start of any meeting that matters.",
      "Leader models honesty first (short and clean).",
      "Round-robin: one sentence each; no commentary.",
      "If someone overshares, gently restate: ‘one sentence, then we’ll keep moving.’"
    ],
    proof: {
      research: [
        "Psychological safety is the #1 predictor of high-performing teams (Google Aristotle Project).",
        "Naming an emotion reduces its intensity in the amygdala (affect labeling)."
      ],
      books: [
        { title: "No Hard Feelings", author: "Liz Fosslien & Mollie West Duffy" },
        { title: "Radical Candor", author: "Kim Scott" }
      ],
      field_notes: [
        "Pilots use 'weather reports' to align on conditions before takeoff. This is the same principle for social dynamics."
      ]
    },
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
    difficulty: 4,
    briefing: {
      objective: "Identify and reduce the hidden penalties for speaking up.",
      use_when: [
        "People don't speak plainly in meetings.",
        "Important topics get discussed in DMs instead of the room.",
        "There is a history of 'shooting the messenger'."
      ],
      avoid: [
        "Punishing the first honest answer through tone.",
        "Debating intentions instead of impact."
      ],
      outcome: "Breaks the spell of silence and creates a flywheel of candor."
    },
    script: "I want to ask a real question: what does it cost to tell the truth here?\n\nNot what should happen—what actually happens.\n\nWhat would lower that cost by 10% this month?",
    protocol: [
      "Ask the question in a small group (5–10) first.",
      "Capture answers verbatim without defending.",
      "Choose one cost to reduce (e.g., retaliation, embarrassment, being labeled ‘negative’).",
      "Make one visible change that proves you meant it (policy, ritual, protection, clarity).",
      "Revisit in 2 weeks: ‘Did the cost change?’"
    ],
    proof: {
      research: [
        "Amy Edmondson's research on psychological safety highlights 'interpersonal risk' as a key barrier to learning.",
        "High-reliability organizations (HROs) obsess over failure and encourage reporting errors without punishment."
      ],
      books: [
        { title: "The Fearless Organization", author: "Amy Edmondson" }
      ]
    },
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
    difficulty: 3,
    briefing: {
      objective: "Restore integrity by actively stopping work to protect capacity.",
      use_when: [
        "Everything is labeled 'priority'.",
        "The team is overloaded and burnout is rising.",
        "Your 'yes' feels like a lie."
      ],
      avoid: [
        "Stopping invisible work no one feels.",
        "Letting exceptions quietly re-enter."
      ],
      outcome: "Reduces threat load, clarifies tradeoffs, and signals leadership protection."
    },
    script: "We’re going to stop pretending everything matters equally.\n\nHere are the things we are actively stopping or pausing this month: _____.\n\nIf we don’t stop something, our ‘yes’ isn’t real.",
    protocol: [
      "List current active initiatives (not hopes—actual work).",
      "Pick 1–2 to stop/pause/reduce visibly.",
      "Publish the stop list where people can see it.",
      "Review weekly for 2 minutes: ‘Did we actually stop?’"
    ],
    proof: {
      research: [
        "Cognitive load theory suggests that excessive WIP (work in progress) degrades decision quality and increases error rates.",
        "Essentialism isn't about doing more things; it's about doing the right things."
      ],
      books: [
        { title: "Essentialism", author: "Greg McKeown" },
        { title: "The One Thing", author: "Gary Keller" }
      ]
    },
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
    difficulty: 2,
    briefing: {
      objective: "Eliminate role fog and the 'ambiguity tax' on decisions.",
      use_when: [
        "Confusion about ownership creates churn.",
        "Decisions are revisited multiple times.",
        "Politics are used to influence outcomes."
      ],
      avoid: [
        "Treating 'consult' as a veto.",
        "Naming a decider who won't decide."
      ],
      outcome: "Speeds up execution and reduces anxiety about authority."
    },
    script: "For this area, let’s clarify decision rights so we stop paying the ambiguity tax.\n\nOwner = drives the work. Decider = final call. Consult = input. Inform = kept in loop.",
    protocol: [
      "Pick one hot domain (roadmap, scope, hiring, priorities).",
      "Fill Owner/Decider/Consult/Inform live in the meeting.",
      "Write it somewhere visible and link it in your recurring meeting.",
      "Run it for 2 weeks, then adjust."
    ],
    proof: {
      research: [
        "Bain & Company's RAPID framework improves decision effectiveness by clarifying roles.",
        "Role ambiguity is a primary source of workplace stress."
      ],
      books: [
        { title: "Decide & Deliver", author: "Marcia W. Blenko et al." }
      ]
    },
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
    difficulty: 2,
    briefing: {
      objective: "Transform a draining ritual into a productive tool.",
      use_when: [
        "Your most frequent meeting produces fatigue, not clarity.",
        "People are multitasking during the call.",
        "There is no clear output."
      ],
      avoid: [
        "Letting updates swallow the timebox.",
        "Pretending a decision will happen when it can't."
      ],
      outcome: "Changes the lived reality of the team by redesigning a core ritual."
    },
    script: "We’re rewriting this meeting like a tool: purpose, output, roles, and a timebox.\n\nIf we can’t name the output, we shouldn’t be meeting.",
    protocol: [
      "Choose the most hated recurring meeting.",
      "Define Purpose (one sentence) and Output (decision/plan/clarity).",
      "Assign roles: facilitator, timekeeper, decider.",
      "Timebox 20–30% shorter than current.",
      "Ban updates unless they directly serve the output.",
      "Run it twice before judging."
    ],
    proof: {
      research: [
        "Studies show that 50% of meeting time is wasted, contributing to 'Zoom fatigue' and reduced productivity.",
        "Rituals shape culture more than values statements."
      ],
      books: [
        { title: "The Art of Gathering", author: "Priya Parker" }
      ]
    },
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
    difficulty: 3,
    briefing: {
      objective: "Stop the overwhelm by capping active work.",
      use_when: [
        "The team is overwhelmed because too much is active at once.",
        "Projects are started but not finished.",
        "Quality is slipping due to context switching."
      ],
      avoid: [
        "Secretly continuing 'Not Now' work.",
        "Allowing exception creep."
      ],
      outcome: "Lowers nervous-system load and restores the confidence of completion."
    },
    script: "We’re not overwhelmed because we’re weak. We’re overwhelmed because we’re overloaded.\n\nWe’re putting a cap on active work so we can finish what matters.",
    protocol: [
      "Count active initiatives (anything consuming real time).",
      "Set a cap (often 3–5).",
      "Move everything else to ‘Not Now’ (visible).",
      "Weekly: only add one new thing when one exits."
    ],
    proof: {
      research: [
        "Kanban principles show that limiting WIP improves flow and reduces cycle time.",
        "Context switching reduces productivity by up to 40%."
      ],
      books: [
        { title: "Personal Kanban", author: "Jim Benson" }
      ]
    },
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
    difficulty: 3,
    briefing: {
      objective: "Legitimize dissent to prevent groupthink and fragile decisions.",
      use_when: [
        "Decisions feel fragile because dissent happens in private.",
        "Everyone agrees too quickly.",
        "You suspect the 'Abilene Paradox' (agreement to something no one wants)."
      ],
      avoid: [
        "Punishing the messenger.",
        "Using it to stall indefinitely."
      ],
      outcome: "Flips dissent from 'disloyalty' to 'value' and extracts wisdom from skeptics."
    },
    script: "Before we finalize: who will offer a minority report—the best argument against this plan?\n\nThis isn’t sabotage. It’s love for reality.",
    protocol: [
      "Ask for a minority report before finalizing any significant decision.",
      "Listen without rebuttal.",
      "Ask: ‘Does this change our decision, or just our risk mitigation?’",
      "Thank the dissenter visibly."
    ],
    proof: {
      research: [
        "Devil's advocacy improves decision quality by challenging assumptions.",
        "Constructive conflict is essential for innovation."
      ],
      books: [
        { title: "Originals", author: "Adam Grant" }
      ]
    },
    context_tags: ["decision_making", "strategy"]
  }
];
