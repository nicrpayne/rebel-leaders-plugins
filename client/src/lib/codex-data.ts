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
    leak_types: ["silence_tax", "scarcity_weather", "meeting_drain", "silence", "avoidance", "performative-harmony"],
    dominant_forces: ["fear_scarcity", "image_performance", "fear", "status", "conflict-avoidance"],
    time_commitment: "3 min",
    difficulty: 2,
    pack: "Core Protocols v1",
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Normalizes emotional truth so leadership isn’t forced through performance.",
    why_it_works: "It breaks the spell of performative normalcy and lowers the cost of honesty by making truth small, shared, and non-punitive.",
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
    leak_types: ["silence_tax", "politics_drag", "withholding", "people-pleasing", "image-management"],
    dominant_forces: ["image_performance", "fear_scarcity", "fear", "approval", "scarcity"],
    time_commitment: "15 min",
    difficulty: 4, // Kept original difficulty
    pack: "Core Protocols v1",
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Reduces fear-based masking by making truth-cost visible and discussable.",
    why_it_works: "It surfaces the hidden incentives. Once the cost is visible, courage becomes rational instead of heroic.",
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
    leak_types: ["meaning_collapse", "meeting_drain", "role_fog", "scarcity_weather", "overcommitment", "blurred-priorities", "burnout"],
    dominant_forces: ["meaning_drift", "control_forcing", "scarcity", "status", "people-pleasing"],
    time_commitment: "20 min",
    difficulty: 3,
    pack: "Core Protocols v1",
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Restores integrity by making tradeoffs explicit and protecting capacity.",
    why_it_works: "Capacity is moral. A Stop List converts vague stress into concrete tradeoffs and protects the team from performative commitments.",
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
    leak_types: ["role_fog", "politics_drag", "meeting_drain", "thrash", "politics", "rework"],
    dominant_forces: ["control_forcing", "image_performance", "control", "ambiguity"],
    time_commitment: "15 min",
    difficulty: 2,
    pack: "Core Protocols v1",
    keys_primary: ["Leading"],
    keys_secondary: ["Technical Proficiency"],
    keys_notes: "Clarifies authority and coordination so execution stops paying an ambiguity tax.",
    why_it_works: "Most ‘alignment problems’ are actually authority and clarity problems. Decision rights reduce politics by removing ambiguity.",
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
    leak_types: ["meeting_drain", "politics_drag", "role_fog", "fatigue", "noise", "calendar-bloat"],
    dominant_forces: ["control_forcing", "meaning_drift", "default-behavior", "avoidance"],
    time_commitment: "20 min",
    difficulty: 2,
    pack: "Core Protocols v1",
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Redesigns rituals so culture forms people instead of draining them.",
    why_it_works: "Meetings become identity rituals. Rewriting them breaks unconscious loops and restores time as a sign of respect.",
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
        "Quality is slipping"
      ],
      avoid: [
        "Setting limits but not enforcing them.",
        "Allowing 'shadow work' to bypass the limit."
      ],
      outcome: "Forces prioritization and increases flow by reducing context switching."
    },
    script: "We are doing too much to do any of it well. We are setting a WIP limit of [Number] items per person/team. Nothing new starts until something finishes.",
    protocol: [
      "Visualize all current work (Kanban board or list).",
      "Set a hard limit on items in 'Doing' column.",
      "When limit is reached, block new work until a slot opens.",
      "Celebrate finishing, not starting."
    ],
    proof: {
      research: [
        "Little's Law proves that reducing WIP decreases cycle time (speed of delivery).",
        "Multitasking reduces productivity by up to 40% due to context switching costs."
      ],
      books: [
        { title: "Making Work Visible", author: "Dominica DeGrandis" }
      ]
    },
    context_tags: ["agile", "workflow"]
  },
  {
    id: "MOVE_MINORITY_REPORT",
    title: "Minority Report",
    category: "Alignment",
    flywheel_node: ["Relationship"],
    leak_types: ["false-consensus", "silent-dissent", "backchanneling"],
    dominant_forces: ["fear", "status", "conflict-avoidance"],
    time_commitment: "10–15 min",
    difficulty: 3,
    pack: "Core Protocols v1",
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Trains psychological safety for disagreement and improves decision quality.",
    why_it_works: "It makes dissent socially safe by making it role-based. Great teams don’t avoid conflict; they metabolize it.",
    briefing: {
      objective: "Legitimize dissent to prevent groupthink and false consensus.",
      use_when: [
        "Decisions feel ‘agreed’ publicly but contested privately afterward.",
        "Everyone nods but energy is low.",
        "You suspect people are holding back risks."
      ],
      avoid: [
        "Punishing the dissenter.",
        "Debating the feedback immediately (just listen first)."
      ],
      outcome: "Improves decision quality and psychological safety by making disagreement a valued contribution."
    },
    script: "Before we decide — I want the Minority Report. If you disagree, your job is to protect us from our blind spot. What are we missing?",
    protocol: [
      "Ask for dissent before the decision is finalized.",
      "Invite specifically: “Who sees a risk we’re ignoring?”",
      "Thank dissent out loud (make it prestigious).",
      "Capture risks + mitigations.",
      "Decide, then commit: “We disagree and commit.”"
    ],
    proof: {
      research: [
        "Research on 'Devil's Advocate' roles shows they improve group decision quality by 25%.",
        "Constructive conflict is a hallmark of high-performing teams."
      ],
      books: [
        { title: "Think Again", author: "Adam Grant" }
      ]
    },
    context_tags: ["decision_making", "strategy"]
  },
  {
    id: "MOVE_FRIDGE_RIGHTS_AUDIT",
    title: "Fridge Rights Audit",
    category: "Relationship",
    flywheel_node: ["Relationship"],
    leak_types: ["low-belonging", "thin-relationships", "transactional-teams"],
    dominant_forces: ["busyness", "distance"],
    time_commitment: "10–20 min",
    difficulty: 2,
    pack: "Core Protocols v1",
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Turns belonging into a measurable signal and nudges relational investment.",
    why_it_works: "Belonging isn't a vibe; it's a set of permissions. Naming the level of permission makes it safe to increase it.",
    briefing: {
      objective: "Assess and deepen the level of psychological safety and belonging.",
      use_when: [
        "Team interacts only as roles; relationships feel thin.",
        "New team formation.",
        "Remote teams feeling disconnected."
      ],
      avoid: [
        "Forcing intimacy.",
        "Judging low scores (it's data, not failure)."
      ],
      outcome: "Turns belonging into a measurable signal and nudges relational investment."
    },
    script: "Quick diagnostic: if you walked into my house, would you feel ‘fridge rights’ — like you could grab water without asking? On this team, do we have that kind of belonging?",
    protocol: [
      "Explain ‘fridge rights’ in one sentence.",
      "Have each person rate 1–5 privately, then share patterns.",
      "Ask: “What would raise it one point?”",
      "Pick one ritual (shared meal, buddy check-in, off-stage time).",
      "Re-measure in 2 weeks."
    ],
    proof: {
      research: [
        "Belonging is a fundamental human need (Maslow).",
        "Teams with high belonging have 56% better job performance (HBR)."
      ],
      books: [
        { title: "The Culture Code", author: "Daniel Coyle" }
      ]
    },
    context_tags: ["team_building", "offsite"]
  }
];
