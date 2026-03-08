import { CodexEntry } from "./codex-schema";

export const CODEX_ENTRIES: CodexEntry[] = [
  {
    id: "MOVE_REPAIR_48H",
    title: "Repair in 48 Hours",
    category: "Conflict",
    flywheel_node: ["Relationship"],
    leak_types: ["rupture_hang", "silence_tax", "politics_drag", "relational-drift", "resentment", "micro-breach"],
    dominant_forces: ["avoidance_unrepaired_rupture", "image_performance", "avoidance", "defensiveness"],
    time_commitment: "10 min",
    difficulty: 3,
    pack: "Core Protocols v1",
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Trains repair speed and emotional responsibility without shame.",
    why_it_works: "Small repairs prevent story-building. Fast repair preserves trust bandwidth and teaches the team that rupture is normal and repair is expected.",
    trigger_point: "repair",
    keys: ["emotional", "leading"],
    briefing: {
      objective: "Close the narrative gap before it hardens into resentment.",
      use_when: [
        "You've had a heated interaction and the air feels thick.",
        "You notice a team member avoiding eye contact or Slack replies.",
        "You feel a lingering 'hangover' from a previous meeting.",
        "A moment landed wrong and you can feel distance forming."
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
    checklist: [
      { id: "step1", label: "Schedule 10-min sync within 48h", time_box: "2 min" },
      { id: "step2", label: "Name the rupture (1 sentence)", micro_prompt: "I think something got strained..." },
      { id: "step3", label: "Own your part", micro_prompt: "Here's my part: ____" },
      { id: "step4", label: "Ask impact", micro_prompt: "How did it land for you?" },
      { id: "step5", label: "Make repair request", micro_prompt: "What would repair look like?" },
      { id: "step6", label: "Close with commitment" }
    ],
    proof: {
      research: [
        { claim: "Successful relationships aren't defined by lack of conflict, but by the speed and quality of repair.", source: "Gottman Institute" },
        { claim: "Unresolved social threat triggers the same neural pathways as physical pain, reducing cognitive function.", source: "Neuroscience" }
      ],
      books: [
        { title: "The Culture Code", author: "Daniel Coyle", chapter_or_section: "Share Vulnerability" },
        { title: "Crucial Conversations", author: "Patterson et al." }
      ],
      field_notes: [
        { note: "In high-stakes environments (SEAL teams, ER units), repair must happen immediately to maintain operational integrity." }
      ]
    },
    context_tags: ["1on1", "peer", "direct_report"]
  },
  {
    id: "MOVE_TRUTH_WEATHER",
    title: "Truth Weather",
    category: "Culture",
    flywheel_node: ["Identity"],
    leak_types: ["silence_tax", "scarcity_weather", "meeting_drain", "silence", "avoidance", "performative-harmony"],
    dominant_forces: ["fear_scarcity", "image_performance", "fear", "status", "conflict-avoidance"],
    time_commitment: "3 min",
    difficulty: 2,
    pack: "Core Protocols v1",
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Normalizes emotional truth so leadership isn’t forced through performance.",
    why_it_works: "It breaks the spell of performative normalcy and lowers the cost of honesty by making truth small, shared, and non-punitive.",
    trigger_point: "meeting",
    keys: ["emotional", "leading"],
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
    checklist: [
      { id: "step1", label: "Open meeting with prompt", micro_prompt: "What weather are you bringing?" },
      { id: "step2", label: "Leader goes first", micro_prompt: "Model brevity + honesty" },
      { id: "step3", label: "Round robin (no fixing)", time_box: "3 min" },
      { id: "step4", label: "Close and begin meeting" }
    ],
    proof: {
      research: [
        { claim: "Psychological safety is the #1 predictor of high-performing teams.", source: "Google Aristotle Project" },
        { claim: "Naming an emotion reduces its intensity in the amygdala (affect labeling).", source: "Neuroscience" }
      ],
      books: [
        { title: "No Hard Feelings", author: "Liz Fosslien & Mollie West Duffy" },
        { title: "Radical Candor", author: "Kim Scott" }
      ],
      field_notes: [
        { note: "Pilots use 'weather reports' to align on conditions before takeoff. This is the same principle for social dynamics." }
      ]
    },
    context_tags: ["team_meeting", "kickoff"]
  },
  {
    id: "MOVE_NAME_THE_COST",
    title: "Name the Cost of Truth",
    category: "Identity",
    flywheel_node: ["Identity"],
    leak_types: ["silence_tax", "politics_drag", "withholding", "people-pleasing", "image-management"],
    dominant_forces: ["image_performance", "fear_scarcity", "fear", "approval", "scarcity"],
    time_commitment: "15 min",
    difficulty: 4,
    pack: "Core Protocols v1",
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Reduces fear-based masking by making truth-cost visible and discussable.",
    why_it_works: "It surfaces the hidden incentives. Once the cost is visible, courage becomes rational instead of heroic.",
    trigger_point: "meeting",
    keys: ["emotional", "leading"],
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
    checklist: [
      { id: "step1", label: "Ask the question", micro_prompt: "What does it cost to tell the truth here?" },
      { id: "step2", label: "Capture answers verbatim", time_box: "5 min" },
      { id: "step3", label: "Select one cost to reduce" },
      { id: "step4", label: "Commit to one visible change" },
      { id: "step5", label: "Schedule 2-week review" }
    ],
    proof: {
      research: [
        { claim: "Interpersonal risk is a key barrier to learning.", source: "Amy Edmondson" },
        { claim: "High-reliability organizations obsess over failure and encourage reporting errors without punishment.", source: "HRO Theory" }
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
    leak_types: ["meaning_collapse", "meeting_drain", "role_fog", "scarcity_weather", "overcommitment", "blurred-priorities", "burnout"],
    dominant_forces: ["meaning_drift", "control_forcing", "scarcity", "status", "people-pleasing"],
    time_commitment: "20 min",
    difficulty: 3,
    pack: "Core Protocols v1",
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Restores integrity by making tradeoffs explicit and protecting capacity.",
    why_it_works: "Capacity is moral. A Stop List converts vague stress into concrete tradeoffs and protects the team from performative commitments.",
    trigger_point: "decision",
    keys: ["leading", "emotional"],
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
    checklist: [
      { id: "step1", label: "List active initiatives", time_box: "5 min" },
      { id: "step2", label: "Select 1-2 items to stop" },
      { id: "step3", label: "Publish Stop List" },
      { id: "step4", label: "Schedule weekly review" }
    ],
    proof: {
      research: [
        { claim: "Excessive WIP degrades decision quality and increases error rates.", source: "Cognitive Load Theory" },
        { claim: "Essentialism isn't about doing more things; it's about doing the right things.", source: "Greg McKeown" }
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
    leak_types: ["role_fog", "politics_drag", "meeting_drain", "thrash", "politics", "rework"],
    dominant_forces: ["control_forcing", "image_performance", "control", "ambiguity"],
    time_commitment: "15 min",
    difficulty: 2,
    pack: "Core Protocols v1",
    keys_primary: ["Leading"],
    keys_secondary: ["Technical Proficiency"],
    keys_notes: "Clarifies authority and coordination so execution stops paying an ambiguity tax.",
    why_it_works: "Most ‘alignment problems’ are actually authority and clarity problems. Decision rights reduce politics by removing ambiguity.",
    trigger_point: "decision",
    keys: ["leading", "technical"],
    briefing: {
      objective: "Eliminate role fog and the 'ambiguity tax' on decisions.",
      use_when: [
        "Confusion about ownership creates churn.",
        "Decisions are revisited multiple times.",
        "Politics are used to influence outcomes.",
        "Work keeps looping because nobody knows who decides."
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
      "Write it somewhere visible and link it in your recurring meeting doc.",
      "When confusion hits, point to the map."
    ],
    checklist: [
      { id: "step1", label: "Select domain", micro_prompt: "Roadmap, Hiring, etc." },
      { id: "step2", label: "Define Owner & Decider" },
      { id: "step3", label: "Define Consult & Inform" },
      { id: "step4", label: "Publish and link" }
    ],
    proof: {
      research: [
        { claim: "Role clarity reduces stress and increases job satisfaction.", source: "Organizational Psychology" },
        { claim: "DACI/RACI frameworks reduce decision latency.", source: "Management Science" }
      ],
      books: [
        { title: "High Output Management", author: "Andy Grove" }
      ]
    },
    context_tags: ["planning", "project_kickoff"]
  },
  {
    id: "MOVE_MEETING_REWRITE",
    title: "Meeting Rewrite",
    category: "Culture",
    flywheel_node: ["Culture"],
    leak_types: ["meeting_drain", "silence_tax", "role_fog", "boredom", "waste", "low-energy"],
    dominant_forces: ["control_forcing", "apathy_drift", "inertia", "obligation"],
    time_commitment: "10 min",
    difficulty: 2,
    pack: "Core Protocols v1",
    keys_primary: ["Leading"],
    keys_secondary: ["Technical Proficiency"],
    keys_notes: "Reclaims time and energy by deleting or refactoring zombie meetings.",
    why_it_works: "Meetings are the operating system of culture. Bad meetings are a tax on everything. Rewriting them signals that time is respected.",
    trigger_point: "meeting",
    keys: ["leading", "technical"],
    briefing: {
      objective: "Eliminate low-value time sinks and restore meeting purpose.",
      use_when: [
        "People dread the recurring meeting.",
        "Agendas are vague or nonexistent.",
        "People are multitasking during the call."
      ],
      avoid: [
        "Keeping a meeting just because 'we always have it'.",
        "Inviting people 'just in case'."
      ],
      outcome: "Frees up capacity and increases engagement in the meetings that remain."
    },
    script: "This meeting isn’t serving us anymore. Let’s kill it, shorten it, or change the goal.\n\nIf we keep it, what is the ONE decision we need to make?",
    protocol: [
      "Audit your calendar for 'zombie meetings'.",
      "Cancel one recurring meeting this week as an experiment.",
      "For the rest: require a clear purpose and agenda.",
      "Shorten 60m meetings to 45m or 30m."
    ],
    checklist: [
      { id: "step1", label: "Audit calendar", time_box: "5 min" },
      { id: "step2", label: "Cancel one zombie meeting" },
      { id: "step3", label: "Refactor remaining meetings", micro_prompt: "Purpose + Agenda" },
      { id: "step4", label: "Shorten durations" }
    ],
    proof: {
      research: [
        { claim: "Executives spend ~23 hours/week in meetings, often with low ROI.", source: "HBR" },
        { claim: "Parkinson's Law: Work expands to fill the time available.", source: "Cyril Northcote Parkinson" }
      ],
      books: [
        { title: "Death by Meeting", author: "Patrick Lencioni" }
      ]
    },
    context_tags: ["calendar_audit", "productivity"]
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
    trigger_point: "meeting",
    keys: ["leading", "spiritual"],
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
    checklist: [
      { id: "step1", label: "Identify Default Future" },
      { id: "step2", label: "Identify Altered Future" },
      { id: "step3", label: "Present the Gap" }
    ],
    proof: {
      research: [
        { claim: "Simon Sinek's 'Golden Circle' theory demonstrates that inspiration starts with 'Why'.", source: "Simon Sinek" },
        { claim: "Loss aversion bias makes people more motivated to avoid a loss (the Default Future) than to acquire a gain.", source: "Behavioral Economics" }
      ],
      books: [
        { title: "Start with Why", author: "Simon Sinek" },
        { title: "Made to Stick", author: "Chip & Dan Heath" }
      ]
    }
  }
];
