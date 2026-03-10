import { CodexEntry } from "./codex-schema";

export const CODEX_ENTRIES: CodexEntry[] = [
  {
    id: "MOVE_TRUTH_WEATHER",
    pack: "Core Protocols v1",
    title: "Truth Weather",
    category: "Culture",
    flywheel_node: ["Culture"],
    leak_types: ["silence", "avoidance", "performative-harmony"],
    dominant_forces: ["fear", "status", "conflict-avoidance"],
    time_commitment: "10–15 min",
    briefing: {
      objective: "Normalize emotional truth so leadership isn’t forced through performance.",
      use_when: [
        "Meetings feel ‘fine’ but nothing real is being said.",
        "Tension is leaking sideways.",
        "People are waiting for the leader to speak first."
      ],
      avoid: [
        "Fixing or solving the feelings shared.",
        "Allowing commentary or debate on someone's check-in."
      ],
      outcome: "Breaks the spell of performative normalcy and lowers the cost of honesty."
    },
    difficulty: 2,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Normalizes emotional truth so leadership isn’t forced through performance.",
    script: "“Before we jump in — quick Truth Weather. One sentence each: what’s the real weather in the room right now? I’ll go first. I’m noticing ______ and I’m feeling ______. No fixing yet — just naming.”",
    protocol: [
      "Set rule: one sentence each, no commentary.",
      "Model first with calm specificity (not drama).",
      "Go around once. If someone passes, accept it: “Pass is allowed.”",
      "Ask one closing question: “What would make this meeting 10% more honest?”",
      "Capture 1–2 constraints to address later (not now)."
    ],
    why_it_works: "It breaks the spell of performative normalcy and lowers the cost of honesty by making truth small, shared, and non-punitive.",
    context_tags: ["meeting_start", "tension", "remote"]
  },
  {
    id: "MOVE_REPAIR_48H",
    pack: "Core Protocols v1",
    title: "Repair in 48 Hours",
    category: "Conflict",
    flywheel_node: ["Relationship"],
    leak_types: ["relational-drift", "resentment", "micro-breach"],
    dominant_forces: ["avoidance", "defensiveness"],
    time_commitment: "10–30 min",
    briefing: {
      objective: "Train repair speed and emotional responsibility without shame.",
      use_when: [
        "A moment landed wrong and you can feel distance forming.",
        "You reacted defensively in a meeting.",
        "Trust feels slightly eroded after an interaction."
      ],
      avoid: [
        "Waiting more than 48 hours.",
        "Using 'but' to justify your behavior."
      ],
      outcome: "Preserves trust bandwidth and teaches the team that rupture is normal and repair is expected."
    },
    difficulty: 3,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Trains repair speed and emotional responsibility without shame.",
    script: "“Hey — I think something got strained between us. Here’s my part: ______. I imagine that may have landed as ______. How did it land for you? And what would repair look like from your side?”",
    protocol: [
      "Do it within 48 hours (the whole point).",
      "Lead with your part first (no ‘but’).",
      "Ask how it landed. Do not argue with their answer.",
      "Name one concrete repair action you’ll take.",
      "Agree on a simple future signal: “If this happens again, tell me by saying ______.”"
    ],
    why_it_works: "Small repairs prevent story-building. Fast repair preserves trust bandwidth and teaches the team that rupture is normal and repair is expected.",
    context_tags: ["1on1", "conflict", "trust"]
  },
  {
    id: "MOVE_NAME_THE_COST",
    pack: "Core Protocols v1",
    title: "Name the Cost of Truth",
    category: "Identity",
    flywheel_node: ["Identity"],
    leak_types: ["withholding", "people-pleasing", "image-management"],
    dominant_forces: ["fear", "approval", "scarcity"],
    time_commitment: "5–10 min",
    briefing: {
      objective: "Reduce fear-based masking by making truth-cost visible and discussable.",
      use_when: [
        "People aren’t saying what they know.",
        "Important topics get discussed in side channels.",
        "The meeting meeting happens after the real meeting."
      ],
      avoid: [
        "Punishing the messenger.",
        "Dismissing the fear as irrational."
      ],
      outcome: "Surfaces hidden incentives. Once the cost is visible, courage becomes rational instead of heroic."
    },
    difficulty: 2,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Reduces fear-based masking by making truth-cost visible and discussable.",
    script: "“I think we’re paying a tax for not saying the true thing. What’s the cost of the truth staying hidden? And what’s the cost of saying it out loud?”",
    protocol: [
      "Write two columns: ‘Cost of silence’ and ‘Cost of speaking’.",
      "Let people answer anonymously first if needed (sticky notes).",
      "Name one protection you can offer: time, role clarity, or process.",
      "Invite one person (not everyone) to speak the ‘true thing’ first.",
      "Close with a next step: “What do we do in the next 7 days?”"
    ],
    why_it_works: "It surfaces the hidden incentives. Once the cost is visible, courage becomes rational instead of heroic.",
    context_tags: ["meeting", "culture", "fear"]
  },
  {
    id: "MOVE_DECISION_RIGHTS_MAP",
    pack: "Core Protocols v1",
    title: "Decision Rights Map",
    category: "Alignment",
    flywheel_node: ["Vision"],
    leak_types: ["thrash", "politics", "rework"],
    dominant_forces: ["control", "ambiguity"],
    time_commitment: "20–45 min",
    briefing: {
      objective: "Clarify authority and coordination so execution stops paying an ambiguity tax.",
      use_when: [
        "Work keeps looping because nobody knows who decides.",
        "Decisions are revisited constantly.",
        "People feel disempowered or blocked."
      ],
      avoid: [
        "Assigning 'everyone' as a decider.",
        "Leaving the 'Consult' list undefined."
      ],
      outcome: "Reduces politics by removing ambiguity. Most 'alignment problems' are actually authority problems."
    },
    difficulty: 3,
    keys_primary: ["Leading"],
    keys_secondary: ["Technical Proficiency"],
    keys_notes: "Clarifies authority and coordination so execution stops paying an ambiguity tax.",
    script: "“Let’s end the confusion. For this decision: who recommends, who decides, who must be consulted, and who just needs to be informed?”",
    protocol: [
      "Pick one live decision that’s causing churn.",
      "Assign: Recommend / Decide / Consult / Inform (RDCI).",
      "Write decision criteria (3 bullets max).",
      "Set deadline and decision meeting.",
      "Publish the map in the same place everyone works."
    ],
    why_it_works: "Most ‘alignment problems’ are actually authority and clarity problems. Decision rights reduce politics by removing ambiguity.",
    context_tags: ["planning", "governance", "clarity"]
  },
  {
    id: "MOVE_MEETING_REWRITE",
    pack: "Core Protocols v1",
    title: "Meeting Rewrite",
    category: "Culture",
    flywheel_node: ["Culture"],
    leak_types: ["fatigue", "noise", "calendar-bloat"],
    dominant_forces: ["default-behavior", "avoidance"],
    time_commitment: "15–30 min",
    briefing: {
      objective: "Redesign rituals so culture forms people instead of draining them.",
      use_when: [
        "Recurring meetings drain energy and create little value.",
        "People are multitasking during calls.",
        "The calendar is full but output is low."
      ],
      avoid: [
        "Keeping a meeting just because 'we always have it'.",
        "Inviting people 'just in case'."
      ],
      outcome: "Breaks unconscious loops and restores time as a sign of respect."
    },
    difficulty: 2,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Redesigns rituals so culture forms people instead of draining them.",
    script: "“This meeting exists because we’re afraid of something. What is it? And what’s the smallest ritual that would address that fear without stealing everyone’s week?”",
    protocol: [
      "Pick one recurring meeting.",
      "Define its fear (‘what breaks if we cancel it?’).",
      "Define success output (one artifact).",
      "Cut duration by 50% and reduce attendees to ‘makers + deciders’.",
      "Add a kill-switch: “If no output 2 weeks in a row, it dies.”"
    ],
    why_it_works: "Meetings become identity rituals. Rewriting them breaks unconscious loops and restores time as a sign of respect.",
    context_tags: ["audit", "efficiency", "culture"]
  },
  {
    id: "MOVE_STOP_LIST",
    pack: "Core Protocols v1",
    title: "Stop List",
    category: "Vision",
    flywheel_node: ["Vision"],
    leak_types: ["overcommitment", "blurred-priorities", "burnout"],
    dominant_forces: ["scarcity", "status", "people-pleasing"],
    time_commitment: "20–30 min",
    briefing: {
      objective: "Restore integrity by making tradeoffs explicit and protecting capacity.",
      use_when: [
        "Everything is ‘priority’ and the team is overloaded.",
        "Quality is slipping due to volume.",
        "People are working late to 'catch up'."
      ],
      avoid: [
        "Adding 'just one more thing'.",
        "Pretending capacity is infinite."
      ],
      outcome: "Converts vague stress into concrete tradeoffs and protects the team from performative commitments."
    },
    difficulty: 2,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Restores integrity by making tradeoffs explicit and protecting capacity.",
    script: "“If everything is priority, nothing is. What are we willing to stop, delay, or de-scope so the ‘yes’ we keep is real?”",
    protocol: [
      "List top 10 active commitments.",
      "Circle the 2 that matter most.",
      "Create a ‘Stop/Delay’ list of at least 3 items.",
      "Message stakeholders with simple rationale + new dates.",
      "Revisit weekly until trust is rebuilt."
    ],
    why_it_works: "Capacity is moral. A Stop List converts vague stress into concrete tradeoffs and protects the team from performative commitments.",
    context_tags: ["planning", "prioritization", "burnout"]
  },
  {
    id: "MOVE_MINORITY_REPORT",
    pack: "Core Protocols v1",
    title: "Minority Report",
    category: "Alignment",
    flywheel_node: ["Relationship"],
    leak_types: ["false-consensus", "silent-dissent", "backchanneling"],
    dominant_forces: ["fear", "status", "conflict-avoidance"],
    time_commitment: "10–15 min",
    briefing: {
      objective: "Train psychological safety for disagreement and improve decision quality.",
      use_when: [
        "Decisions feel ‘agreed’ publicly but contested privately afterward.",
        "The room goes silent when a plan is presented.",
        "You suspect 'groupthink' is happening."
      ],
      avoid: [
        "Punishing the dissenter.",
        "Debating the dissent immediately (just listen first)."
      ],
      outcome: "Makes dissent socially safe by making it role-based. Great teams metabolize conflict."
    },
    difficulty: 3,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Trains psychological safety for disagreement and improves decision quality.",
    script: "“Before we decide — I want the Minority Report. If you disagree, your job is to protect us from our blind spot. What are we missing?”",
    protocol: [
      "Ask for dissent before the decision is finalized.",
      "Invite specifically: “Who sees a risk we’re ignoring?”",
      "Thank dissent out loud (make it prestigious).",
      "Capture risks + mitigations.",
      "Decide, then commit: “We disagree and commit.”"
    ],
    why_it_works: "It makes dissent socially safe by making it role-based. Great teams don’t avoid conflict; they metabolize it.",
    context_tags: ["decision-making", "risk", "safety"]
  },
  {
    id: "MOVE_FRIDGE_RIGHTS_AUDIT",
    pack: "Core Protocols v1",
    title: "Fridge Rights Audit",
    category: "Relationship",
    flywheel_node: ["Relationship"],
    leak_types: ["low-belonging", "thin-relationships", "transactional-teams"],
    dominant_forces: ["busyness", "distance"],
    time_commitment: "10–20 min",
    briefing: {
      objective: "Turn belonging into a measurable signal and nudge relational investment.",
      use_when: [
        "Team interacts only as roles; relationships feel thin.",
        "New members feel like outsiders.",
        "Remote work has created distance."
      ],
      avoid: [
        "Forcing intimacy.",
        "Ignoring the low scores."
      ],
      outcome: "Makes belonging tangible and actionable."
    },
    difficulty: 2,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Turns belonging into a measurable signal and nudges relational investment.",
    script: "“Quick diagnostic: if you walked into my house, would you feel ‘fridge rights’ — like you could grab water without asking? On this team, do we have that kind of belonging?”",
    protocol: [
      "Explain ‘fridge rights’ in one sentence.",
      "Have each person rate 1–5 privately, then share patterns.",
      "Ask: “What would raise it one point?”",
      "Pick one ritual (shared meal, buddy check-in, off-stage time).",
      "Re-measure in 2 weeks."
    ],
    why_it_works: "Belonging is often vague. ‘Fridge rights’ is a concrete metaphor that allows people to name the distance without blame.",
    context_tags: ["teambuilding", "remote", "onboarding"]
  },
  {
    id: "MOVE_DISAGREE_AND_COMMIT",
    pack: "Core Protocols v1",
    title: "Disagree and Commit",
    category: "Alignment",
    flywheel_node: ["Vision"],
    leak_types: ["stalling", "consensus-trap", "passive-resistance"],
    dominant_forces: ["fear", "perfectionism"],
    time_commitment: "5–10 min",
    briefing: {
      objective: "Create closure and momentum by reframing decisions as learning.",
      use_when: [
        "Team debates forever; nobody wants to be wrong.",
        "Decisions get delayed for 'more data'.",
        "People are waiting for perfect consensus."
      ],
      avoid: [
        "Faking agreement.",
        "Re-litigating the decision after the meeting."
      ],
      outcome: "Reduces perfectionism and reframes decisions as learning, not identity."
    },
    difficulty: 3,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Creates closure and momentum by reframing decisions as learning.",
    script: "“We’ve heard enough to decide. We can disagree and commit — but we can’t stall. What decision are we making, by when, and what will we learn?”",
    protocol: [
      "State the decision in one sentence.",
      "Take a quick vote: support / can live with / cannot support.",
      "If ‘cannot support’, ask what would move it to ‘can live with’.",
      "Decide and set an experiment window.",
      "Write it down and move."
    ],
    why_it_works: "Execution requires closure. This reduces perfectionism and reframes decisions as learning, not identity.",
    context_tags: ["decision-making", "speed", "execution"]
  },
  {
    id: "MOVE_THE_ONE_THING",
    pack: "Core Protocols v1",
    title: "The One Thing",
    category: "Vision",
    flywheel_node: ["Vision"],
    leak_types: ["diffuse-focus", "low-leverage-work"],
    dominant_forces: ["noise", "scarcity"],
    time_commitment: "10–15 min",
    briefing: {
      objective: "Train focus and protect what matters most this week.",
      use_when: [
        "You’re busy but not effective.",
        "Priorities keep shifting.",
        "The team is doing 'good work' but missing the main goal."
      ],
      avoid: [
        "Picking 3 'One Things'.",
        "Changing the goal mid-week."
      ],
      outcome: "Builds a culture where ‘important’ is protected from the 'urgent'."
    },
    difficulty: 2,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Trains focus and protects what matters most this week.",
    script: "“If we could only make one thing true by the end of this week, what would matter most?”",
    protocol: [
      "Ask individually first, then converge.",
      "Pick one weekly ‘win condition’.",
      "Define the smallest proof it happened.",
      "Say no to one other thing explicitly.",
      "Review on Friday: did we protect it?"
    ],
    why_it_works: "High-performing teams create focus by subtraction. This builds a culture where ‘important’ is protected.",
    context_tags: ["planning", "focus", "productivity"]
  },
  {
    id: "MOVE_THE_MIRROR",
    pack: "Core Protocols v1",
    title: "The Mirror Move",
    category: "Relationship",
    flywheel_node: ["Relationship"],
    leak_types: ["misunderstanding", "escalation", "defensiveness"],
    dominant_forces: ["fear", "ego"],
    time_commitment: "8–15 min",
    briefing: {
      objective: "Force understanding before persuasion and reduce escalation.",
      use_when: [
        "A conversation is getting heated.",
        "People are talking past each other.",
        "You feel misunderstood."
      ],
      avoid: [
        "Paraphrasing to change their meaning.",
        "Adding your own opinion while mirroring."
      ],
      outcome: "Shifts the nervous system from threat to understanding."
    },
    difficulty: 3,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Forces understanding before persuasion and reduces escalation.",
    script: "“Before I respond, let me mirror what I heard: ______. Is that accurate? What did I miss?”",
    protocol: [
      "Pause the debate. Require mirroring before rebuttal.",
      "One person speaks; the other mirrors.",
      "Only after an accurate mirror can they respond.",
      "Repeat once if needed.",
      "Close with: “What do you need next?”"
    ],
    why_it_works: "Mirroring shifts the nervous system from threat to understanding. It forces accuracy before persuasion.",
    context_tags: ["conflict", "communication", "empathy"]
  },
  {
    id: "MOVE_TRUST_MICRO_DEPOSIT",
    pack: "Core Protocols v1",
    title: "Trust Micro-Deposit",
    category: "Relationship",
    flywheel_node: ["Relationship"],
    leak_types: ["low-trust", "guardedness"],
    dominant_forces: ["fear", "history"],
    time_commitment: "5–8 min",
    briefing: {
      objective: "Rebuild trust through tiny, kept promises instead of speeches.",
      use_when: [
        "Trust is low and you need a tiny step that’s real.",
        "A relationship feels stalled.",
        "You've broken a promise recently."
      ],
      avoid: [
        "Over-promising.",
        "Making a speech about how trustworthy you are."
      ],
      outcome: "Rebuilds safety without forcing big vulnerability."
    },
    difficulty: 2,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Rebuilds trust through tiny, kept promises instead of speeches.",
    script: "“What’s one small promise I can make — and keep — by tomorrow that would rebuild a bit of trust?”",
    protocol: [
      "Ask for one small, testable promise.",
      "Confirm it’s realistic (no heroics).",
      "Do it within 24 hours.",
      "Follow up: “Did that help, even 5%?”",
      "Repeat weekly until trust returns."
    ],
    why_it_works: "Trust is built through kept promises, not speeches. Micro-deposits rebuild safety without forcing big vulnerability.",
    context_tags: ["trust", "repair", "integrity"]
  },
  {
    id: "MOVE_CLARITY_CONTRACT",
    pack: "Core Protocols v1",
    title: "Clarity Contract",
    category: "Alignment",
    flywheel_node: ["Identity"],
    leak_types: ["role-confusion", "anxiety", "overlap"],
    dominant_forces: ["ambiguity", "control"],
    time_commitment: "15–25 min",
    briefing: {
      objective: "Reduce anxiety by defining ownership and escalation paths.",
      use_when: [
        "People aren’t sure what ‘their job’ is.",
        "Team members keep stepping on each other.",
        "Tasks are falling through the cracks."
      ],
      avoid: [
        "Leaving 'gray areas' undefined.",
        "Assuming everyone knows their role."
      ],
      outcome: "Lowers anxiety and politics. Gives people stable ground to act with agency."
    },
    difficulty: 3,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Reduces anxiety by defining ownership and escalation paths.",
    script: "“Let’s write a clarity contract: what I own, what I don’t own, and how you can count on me.”",
    protocol: [
      "Each person writes: Own / Don’t Own / Collaborate.",
      "Compare overlaps and gaps.",
      "Define escalation path (when to involve others).",
      "Publish contracts in shared space.",
      "Revisit monthly for 3 months."
    ],
    why_it_works: "Role clarity lowers anxiety and politics. It gives people stable ground to act with agency.",
    context_tags: ["roles", "onboarding", "clarity"]
  },
  {
    id: "MOVE_COACHING_3_QUESTIONS",
    pack: "Coaching Pack v1",
    title: "3 Coaching Questions",
    category: "Relationship",
    flywheel_node: ["Relationship"],
    leak_types: ["dependency", "low-agency", "leader-bottleneck"],
    dominant_forces: ["control", "speed"],
    time_commitment: "5–12 min",
    briefing: {
      objective: "Train agency and thinking instead of leader dependency.",
      use_when: [
        "Someone brings you a problem and you want to grow their agency instead of solving it.",
        "You feel like the bottleneck for every decision.",
        "Team members ask 'what should I do?' constantly."
      ],
      avoid: [
        "Giving the answer immediately.",
        "Asking 'Why did you do that?' (triggers defensiveness)."
      ],
      outcome: "Rewires the relationship from dependency to agency while still providing support."
    },
    difficulty: 2,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Trains agency and thinking instead of leader dependency.",
    script: "“What do you think is really going on? What have you tried? What’s one option you haven’t considered yet?”",
    protocol: [
      "Ask the 3 questions in order.",
      "Reflect back their thinking (one sentence).",
      "Offer 1 nudge only if they’re stuck.",
      "Ask them to choose one next step.",
      "Close with: “When will you update me?”"
    ],
    why_it_works: "It rewires the relationship from dependency to agency while still providing support.",
    context_tags: ["coaching", "mentoring", "delegation"]
  },
  {
    id: "MOVE_FEEDBACK_SBI",
    pack: "Coaching Pack v1",
    title: "SBI Feedback (No Shame)",
    category: "Relationship",
    flywheel_node: ["Relationship"],
    leak_types: ["defensiveness", "vague-feedback", "resentment"],
    dominant_forces: ["fear", "approval", "conflict-avoidance"],
    time_commitment: "10–15 min",
    briefing: {
      objective: "Protect dignity while making change concrete and learnable.",
      use_when: [
        "You need to give feedback without triggering identity threat.",
        "Previous feedback hasn't landed.",
        "You're avoiding a difficult conversation."
      ],
      avoid: [
        "Using generalizations ('You always...').",
        "Attacking their character or intent."
      ],
      outcome: "Separates behavior from identity and makes change concrete, lowering defensiveness."
    },
    difficulty: 3,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Protects dignity while making change concrete and learnable.",
    script: "“Can I share an observation? In [situation], when you [behavior], the impact was [impact]. My request is [specific request]. How does that land?”",
    protocol: [
      "Ask permission (reduces threat).",
      "Use Situation–Behavior–Impact (no character judgments).",
      "Make a single clear request (not a list).",
      "Ask how it landed; listen without rebuttal.",
      "Agree on one observable change + a follow-up date."
    ],
    why_it_works: "It separates behavior from identity and makes change concrete, which lowers defensiveness and increases learning.",
    context_tags: ["feedback", "growth", "performance"]
  },
  {
    id: "MOVE_FEEDFORWARD",
    pack: "Coaching Pack v1",
    title: "Feedforward Future Swap",
    category: "Identity",
    flywheel_node: ["Identity"],
    leak_types: ["stuck-patterns", "shame", "past-focus"],
    dominant_forces: ["fear", "perfectionism"],
    time_commitment: "12–20 min",
    briefing: {
      objective: "Shift focus from shame to future action and experiment-based learning.",
      use_when: [
        "Feedback loops keep becoming post-mortems.",
        "You want a forward-facing shift.",
        "The team is stuck dwelling on past mistakes."
      ],
      avoid: [
        "Rehashing the past error.",
        "Focusing on blame."
      ],
      outcome: "Reduces shame and increases agency, accelerating learning and motivation."
    },
    difficulty: 2,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Shifts focus from shame to future action and experiment-based learning.",
    script: "“Let’s do this forward instead of backward. For the next time you’re in that situation, what’s one move you want to try? I’ll offer two ideas too.”",
    protocol: [
      "Name the target moment (specific situation).",
      "Ask them for one new move (ownership first).",
      "Offer 1–2 options (not 10).",
      "Choose one move to test within 7 days.",
      "Follow up: what happened, what to adjust."
    ],
    why_it_works: "Future orientation reduces shame and increases agency, which accelerates learning and motivation.",
    context_tags: ["growth", "learning", "future-focus"]
  },
  {
    id: "MOVE_ACCOUNTABILITY_WITH_CARE",
    pack: "Coaching Pack v1",
    title: "Accountability With Care",
    category: "Relationship",
    flywheel_node: ["Relationship"],
    leak_types: ["avoidance", "enabling", "drift"],
    dominant_forces: ["approval", "fear"],
    time_commitment: "10–20 min",
    briefing: {
      objective: "Build trust by combining care with clear standards and follow-through.",
      use_when: [
        "You need to hold a standard without becoming harsh or vague.",
        "Performance is slipping but you like the person.",
        "You've been 'too nice' and now it's a problem."
      ],
      avoid: [
        "Being 'nice' instead of kind (kindness is honest).",
        "Setting a standard you won't enforce."
      ],
      outcome: "Builds trust and performance. Care without standards is enabling; standards without care is threat."
    },
    difficulty: 4,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Builds trust by combining care with clear standards and follow-through.",
    script: "“I care about you and I’m going to be clear. The expectation is ______. Right now we’re at ______. What’s your plan to close the gap, and what support do you need?”",
    protocol: [
      "Name care + clarity together (not one without the other).",
      "State expectation and current reality (evidence-based).",
      "Ask for their plan first (agency).",
      "Offer support after they propose a plan.",
      "Set a check-in date and define what ‘good’ looks like."
    ],
    why_it_works: "Care without standards is enabling; standards without care is threat. Combining both builds trust and performance.",
    context_tags: ["performance", "management", "culture"]
  },
  {
    id: "MOVE_BOUNDARY_NO_WITH_YES",
    pack: "Coaching Pack v1",
    title: "No With a Clean Yes",
    category: "Identity",
    flywheel_node: ["Identity"],
    leak_types: ["overcommitment", "resentment", "people-pleasing"],
    dominant_forces: ["fear", "approval", "scarcity"],
    time_commitment: "5–10 min",
    briefing: {
      objective: "Train integrity and boundary clarity under pressure.",
      use_when: [
        "You need to say no without damaging relationship or integrity.",
        "You are chronically overcommitted.",
        "You feel resentful about your workload."
      ],
      avoid: [
        "Over-explaining your 'No'.",
        "Saying 'Maybe' when you mean 'No'."
      ],
      outcome: "Protects trust. A clean ‘no’ prevents hidden resentment and clarifies reality without drama."
    },
    difficulty: 2,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Trains integrity and boundary clarity under pressure.",
    script: "“I can’t take that on. What I *can* do is ______. If the priority changes, we can revisit.”",
    protocol: [
      "Say no directly (no long justification).",
      "Offer a clean yes (one alternative or one constraint).",
      "Name the tradeoff if needed (what you’re protecting).",
      "Invite reprioritization (not negotiation-by-guilt).",
      "Follow up in writing if it affects scope."
    ],
    why_it_works: "A clean ‘no’ protects trust. It prevents hidden resentment and clarifies reality without drama.",
    context_tags: ["boundaries", "integrity", "self-management"]
  },
  {
    id: "MOVE_RECOVER_AFTER_MISS",
    pack: "Coaching Pack v1",
    title: "Recover After You Missed It",
    category: "Identity",
    flywheel_node: ["Relationship"],
    leak_types: ["shame", "avoidance", "trust-loss"],
    dominant_forces: ["fear", "perfectionism"],
    time_commitment: "5–10 min",
    briefing: {
      objective: "Demonstrate resilience and integrity after a failure.",
      use_when: [
        "You dropped the ball.",
        "You missed a deadline or commitment.",
        "You feel the urge to hide or make excuses."
      ],
      avoid: [
        "Blaming external factors.",
        "Over-apologizing (it looks like seeking reassurance)."
      ],
      outcome: "Turns a failure into a trust-building moment. Integrity is about repair, not perfection."
    },
    difficulty: 3,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Demonstrates resilience and integrity after a failure.",
    script: "“I missed this. I own the impact. Here is my plan to fix it: ______. I will update you by [time].”",
    protocol: [
      "Own it immediately (speed matters).",
      "State the impact (show you get it).",
      "State the fix (action, not just words).",
      "Close the loop when it's done."
    ],
    why_it_works: "Owning a miss builds more trust than hiding it. It shows you value the standard more than your ego.",
    context_tags: ["integrity", "resilience", "trust"]
  },
  {
    id: "MOVE_NORTH_STAR_SENTENCE",
    pack: "Core Protocols v1",
    title: "North Star Sentence",
    category: "Vision",
    flywheel_node: ["Vision"],
    leak_types: ["diffuse-focus", "blurred-priorities", "noise"],
    dominant_forces: ["ambiguity", "noise", "speed"],
    time_commitment: "10–20 min",
    briefing: {
      objective: "Create a shared sentence of success so the team can align effort without constant retranslation.",
      use_when: [
        "People describe the goal in different words.",
        "The team is busy but not obviously moving toward the same outcome.",
        "A project has energy but lacks a crisp center."
      ],
      avoid: [
        "Writing a slogan instead of a real aim.",
        "Trying to include every stakeholder preference in one sentence."
      ],
      outcome: "Gives the team a portable definition of success that reduces drift and improves day-to-day alignment."
    },
    difficulty: 2,
    keys_primary: ["Leading"],
    keys_secondary: ["Technical Proficiency"],
    keys_notes: "Creates a shared sentence of success so the team can align effort without constant retranslation.",
    script: "\u201CBefore we keep moving, I want us to get painfully clear. If this goes well, what is the one sentence we want to be true at the end? My draft is: ______. What needs to change so we can all stand behind it?\u201D",
    protocol: [
      "Draft a first sentence before the meeting (do not start from a blank page).",
      "Read it out loud and ask for edits toward clarity, not inclusivity theater.",
      "Pressure-test it with one question: \u201CWould this help us choose what to do this week?\u201D",
      "Finalize one sentence and remove extra qualifiers.",
      "Repeat it in planning, updates, and decisions for the next 2 weeks."
    ],
    why_it_works: "Teams often drift because the goal lives as vibes, not language. A single sentence creates shared meaning, lowers interpretation error, and gives decisions a reference point.",
    proof: {
      research: [
        "Goal-setting research consistently shows that specific, shared goals improve effort, persistence, and performance compared with vague aspirations.",
        "Teams coordinate better when they can anchor choices to a common mental model. Clear language reduces interpretation error and rework."
      ],
      books: [
        { title: "Measure What Matters", author: "John Doerr" },
        { title: "The 4 Disciplines of Execution", author: "Chris McChesney, Sean Covey, and Jim Huling" }
      ],
      field_notes: [
        "Ancient wisdom named the power of speech to make reality social; modern teams still move at the speed of shared language.",
        "A North Star sentence is not branding. It is a compression tool for collective attention."
      ]
    },
    context_tags: ["planning", "clarity", "focus"]
  },
  {
    id: "MOVE_KILL_THE_GHOST_GOAL",
    pack: "Core Protocols v1",
    title: "Kill the Ghost Goal",
    category: "Vision",
    flywheel_node: ["Vision"],
    leak_types: ["drift", "rework", "blurred-priorities"],
    dominant_forces: ["history", "avoidance", "ambiguity"],
    time_commitment: "15–25 min",
    briefing: {
      objective: "Retire outdated goals so the team stops serving a mission that no longer deserves its energy.",
      use_when: [
        "People keep optimizing for an old target after the context changed.",
        "You hear conflicting definitions of what still matters.",
        "A previous priority is still haunting decisions, metrics, or meetings."
      ],
      avoid: [
        "Quietly changing direction without saying what is ending.",
        "Shaming people for following yesterday's instructions."
      ],
      outcome: "Releases hidden drag by replacing unspoken legacy priorities with present-tense clarity."
    },
    difficulty: 3,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Retires outdated goals so the team stops serving a mission that no longer deserves its energy.",
    script: "\u201CI think we have a ghost goal in the system \u2014 something that used to matter, and people are still serving it because we never buried it out loud. The old goal was ______. It made sense then. It is not the goal now. What do we need to stop doing so our behavior matches reality?\u201D",
    protocol: [
      "Name the old goal explicitly and give it context without mocking it.",
      "State what changed: market, strategy, timing, ownership, or learning.",
      "List 2\u20133 behaviors or rituals still serving the ghost goal.",
      "Retire those behaviors publicly and assign replacements.",
      "Repeat the new priority in the next planning cycle so the burial sticks."
    ],
    why_it_works: "Teams rarely waste effort because they are lazy; they waste effort because old priorities remain emotionally or politically alive. Naming and retiring the ghost goal clears legacy drag without blaming the people who carried it.",
    proof: {
      research: [
        "Strategic drift often persists because legacy goals remain embedded in habits, incentives, and meeting structures long after leadership has moved on.",
        "Sensemaking research suggests that teams need explicit narrative updates when context changes; otherwise they continue acting from stale assumptions."
      ],
      books: [
        { title: "Leading Change", author: "John P. Kotter" },
        { title: "Good Strategy/Bad Strategy", author: "Richard Rumelt" }
      ],
      field_notes: [
        "Humans keep serving what was once sacred until someone marks the season change.",
        "Many execution problems are not failures of effort but failures of burial."
      ]
    },
    context_tags: ["planning", "clarity", "execution"]
  },
  {
    id: "MOVE_WIN_CONDITION",
    pack: "Core Protocols v1",
    title: "Win Condition",
    category: "Vision",
    flywheel_node: ["Vision"],
    leak_types: ["low-leverage-work", "diffuse-focus", "misunderstanding"],
    dominant_forces: ["ambiguity", "busyness", "noise"],
    time_commitment: "10–15 min",
    briefing: {
      objective: "Define the concrete condition of success so effort can be judged against what actually matters.",
      use_when: [
        "The team is working hard but 'done' feels subjective.",
        "A project update sounds active but not directional.",
        "People disagree about what success would look like."
      ],
      avoid: [
        "Confusing activity with evidence.",
        "Defining success in a way nobody can observe."
      ],
      outcome: "Turns motion into measurable direction and helps the team distinguish progress from performance theater."
    },
    difficulty: 2,
    keys_primary: ["Leading"],
    keys_secondary: ["Technical Proficiency"],
    keys_notes: "Defines the concrete condition of success so effort can be judged against what actually matters.",
    script: "\u201CLet's stop talking about effort for a second. What would have to be true for us to call this a real win \u2014 not 'busy,' not 'in progress,' but a win? I want one observable condition: ______.\u201D",
    protocol: [
      "Ask for one observable condition that would prove success.",
      "Strip out vague words like better, aligned, improved, or underway.",
      "Test it with: \u201CWould an outsider know if we achieved this?\u201D",
      "Write the win condition in the work tracker or project brief.",
      "Use it to judge scope changes and weekly progress."
    ],
    why_it_works: "People over-index on visible effort when the definition of success is fuzzy. A win condition shifts attention from activity to evidence and improves prioritization, accountability, and learning.",
    proof: {
      research: [
        "Teams perform better when goals are specific and outcomes can be observed. Clear success criteria improve attention, feedback loops, and execution quality.",
        "Implementation quality improves when people know what evidence to look for rather than merely what tasks to complete."
      ],
      books: [
        { title: "Measure What Matters", author: "John Doerr" },
        { title: "The Checklist Manifesto", author: "Atul Gawande" }
      ],
      field_notes: [
        "A win condition is the difference between a mission and a mood.",
        "Clarity becomes compassionate when people can tell whether they are succeeding without reading the leader's face."
      ]
    },
    context_tags: ["planning", "execution", "clarity"]
  },
  {
    id: "MOVE_TRADEOFF_TALK",
    pack: "Core Protocols v1",
    title: "Tradeoff Talk",
    category: "Alignment",
    flywheel_node: ["Vision"],
    leak_types: ["overcommitment", "blurred-priorities", "burnout"],
    dominant_forces: ["scarcity", "approval", "avoidance"],
    time_commitment: "10–20 min",
    briefing: {
      objective: "Force honest choice-making by naming what this priority will cost and what it will displace.",
      use_when: [
        "A new priority is being added as if it has no cost.",
        "People say yes in meetings and panic afterward.",
        "The team keeps absorbing scope without removing anything."
      ],
      avoid: [
        "Pretending capacity is elastic.",
        "Letting the conversation stay at the level of aspiration."
      ],
      outcome: "Restores integrity by linking every yes to a real no and making capacity visible."
    },
    difficulty: 3,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Forces honest choice-making by naming what this priority will cost and what it will displace.",
    script: "\u201CBefore we say yes, I want the tradeoff out loud. If we choose ______, what are we not choosing? What gets slower, smaller, or later? I don't want a fantasy yes \u2014 I want a real one.\u201D",
    protocol: [
      "Name the proposed yes in one sentence.",
      "Ask: \u201CWhat does this push, pause, shrink, or kill?\u201D",
      "Write the tradeoffs where everyone can see them.",
      "Decide only after the cost is spoken in plain language.",
      "Message the downstream changes to affected people within 24 hours."
    ],
    why_it_works: "Teams lose trust when leaders make costless promises in a costly world. Tradeoff Talk reconnects strategy to capacity and helps people experience clarity as honesty, not control.",
    proof: {
      research: [
        "Research on workload and role stress shows that overload and conflicting demands increase burnout, errors, and disengagement when priorities are not pruned.",
        "Strategic focus improves when leaders make tradeoffs explicit. Good strategy is often defined more by what is excluded than by what is admired."
      ],
      books: [
        { title: "Good Strategy/Bad Strategy", author: "Richard Rumelt" },
        { title: "Essentialism", author: "Greg McKeown" }
      ],
      field_notes: [
        "Every yes is a kingdom decision: it reveals what rules and what serves.",
        "Tradeoffs feel harsh only in cultures addicted to imaginary abundance."
      ]
    },
    context_tags: ["planning", "prioritization", "burnout"]
  },
  {
    id: "MOVE_PERMISSION_SLIP",
    pack: "Core Protocols v1",
    title: "Permission Slip",
    category: "Culture",
    flywheel_node: ["Culture"],
    leak_types: ["silence", "low-agency", "performative-harmony"],
    dominant_forces: ["fear", "status", "approval"],
    time_commitment: "5–10 min",
    briefing: {
      objective: "Lower hesitation by explicitly authorizing the behavior the culture claims to want.",
      use_when: [
        "People are waiting for invisible approval before acting honestly or proactively.",
        "The stated value is clear but behavior stays cautious.",
        "A team is polite, compliant, and slower than it needs to be."
      ],
      avoid: [
        "Giving permission without protection.",
        "Saying 'be candid' while rewarding image management."
      ],
      outcome: "Converts vague cultural aspiration into explicit social permission, which increases agency and reduces performative caution."
    },
    difficulty: 2,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Lowers hesitation by explicitly authorizing the behavior the culture claims to want.",
    script: "\u201CI'm going to make this easier to do, not harder. You have permission to ______ here. If you see a risk, say it. If you need clarity, ask for it. If something feels off, name it. I would rather have clean truth than polished hesitation.\u201D",
    protocol: [
      "Name the exact behavior you are authorizing.",
      "Tie it to a real scenario people face this week.",
      "State how you will respond when someone uses that permission.",
      "Invite one small use of it immediately in the room.",
      "Reinforce it publicly the first time someone actually does it."
    ],
    why_it_works: "Many teams do not lack values; they lack usable permission. Explicit authorization lowers social uncertainty and helps people act before safety is fully felt.",
    proof: {
      research: [
        "Psychological safety increases speaking-up behavior when leaders signal that candor is welcome and will not be punished.",
        "Behavior change strengthens when desired actions are made specific, visible, and socially reinforced rather than merely praised in principle."
      ],
      books: [
        { title: "The Fearless Organization", author: "Amy C. Edmondson" },
        { title: "Turn the Ship Around!", author: "L. David Marquet" }
      ],
      field_notes: [
        "Cultures often preach courage while withholding permission.",
        "A permission slip is not softness; it is a release of trapped agency."
      ]
    },
    context_tags: ["culture", "safety", "communication"]
  },
  {
    id: "MOVE_SHADOW_NORMS",
    pack: "Core Protocols v1",
    title: "Shadow Norms",
    category: "Culture",
    flywheel_node: ["Culture"],
    leak_types: ["performative-harmony", "silence", "drift"],
    dominant_forces: ["status", "fear", "default-behavior"],
    time_commitment: "15–25 min",
    briefing: {
      objective: "Surface the unwritten rules actually governing behavior so the team can choose culture on purpose.",
      use_when: [
        "The official values sound good but daily behavior tells a different story.",
        "People know how to survive here but not how to say it out loud.",
        "A team keeps repeating the same pattern without owning the rule underneath it."
      ],
      avoid: [
        "Using the exercise to shame the team.",
        "Stopping at naming without changing one norm in practice."
      ],
      outcome: "Exposes the hidden operating system so culture becomes discussable, not mystical."
    },
    difficulty: 3,
    keys_primary: ["Leading"],
    keys_secondary: ["Emotional"],
    keys_notes: "Surfaces the unwritten rules actually governing behavior so the team can choose culture on purpose.",
    script: "\u201CLet's name the shadow norms \u2014 the unwritten rules people actually have to follow to survive here. Finish the sentence: 'Around here, you get rewarded for ______ and you get punished for ______.' I want the real answers, not the brochure.\u201D",
    protocol: [
      "Ask people to complete the sentence privately first.",
      "Cluster the responses into repeated unwritten rules.",
      "Circle one shadow norm causing the most distortion.",
      "Name one visible behavior that would contradict it this week.",
      "Have the leader model that contradiction publicly."
    ],
    why_it_works: "Culture is shaped less by stated values than by rewarded behaviors and tolerated violations. Naming shadow norms turns an invisible social field into something leaders can interrupt and redesign.",
    proof: {
      research: [
        "Organizational culture research shows that informal norms and incentive patterns often drive behavior more strongly than official values statements.",
        "People adapt quickly to perceived reward and punishment signals, even when those signals contradict stated expectations."
      ],
      books: [
        { title: "Diagnosing and Changing Organizational Culture", author: "Kim S. Cameron and Robert E. Quinn" },
        { title: "The Culture Code", author: "Daniel Coyle" }
      ],
      field_notes: [
        "Every culture has a catechism and a shadow catechism. The second one usually wins.",
        "When people finally name the real rules, shame often drops and agency begins."
      ]
    },
    context_tags: ["culture", "audit", "safety"]
  },
  {
    id: "MOVE_ENERGY_LEAK_CHECK",
    pack: "Core Protocols v1",
    title: "Energy Leak Check",
    category: "Culture",
    flywheel_node: ["Culture"],
    leak_types: ["fatigue", "burnout", "noise"],
    dominant_forces: ["busyness", "default-behavior", "avoidance"],
    time_commitment: "10–20 min",
    briefing: {
      objective: "Identify the recurring drains that quietly shrink people so the team can recover usable energy.",
      use_when: [
        "People leave meetings smaller, flatter, or more scattered than they entered.",
        "Morale is low but the team can't name one obvious cause.",
        "Output is slowing because energy is being bled off in too many small ways."
      ],
      avoid: [
        "Treating exhaustion as a personal weakness problem.",
        "Listing leaks without removing at least one."
      ],
      outcome: "Turns vague depletion into specific, fixable drains and helps the team protect energy as a leadership resource."
    },
    difficulty: 2,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Identifies the recurring drains that quietly shrink people so the team can recover usable energy.",
    script: "\u201CI don't want to normalize drain. What are the top three energy leaks on this team right now \u2014 the things that leave people smaller than they came in? Let's name them cleanly, then kill one.\u201D",
    protocol: [
      "Ask each person to list 1\u20133 recurring drains.",
      "Group the answers into themes: meeting, tool, role, people, or process.",
      "Vote on the leak costing the most energy for the least return.",
      "Remove, reduce, or redesign one leak within 7 days.",
      "Check back in 2 weeks: \u201CDid energy come back?\u201D"
    ],
    why_it_works: "Burnout is often cumulative, not dramatic. Naming energy leaks helps teams move from vague exhaustion to targeted redesign, which increases both morale and execution capacity.",
    proof: {
      research: [
        "Burnout research points to workload, control, fairness, and value incongruence as recurring drivers of depletion in teams and organizations.",
        "Small friction costs compound. Repeated interruptions, unclear expectations, and low-value meetings steadily erode cognitive bandwidth and motivation."
      ],
      books: [
        { title: "Burnout", author: "Emily Nagoski and Amelia Nagoski" },
        { title: "Dying for a Paycheck", author: "Jeffrey Pfeffer" }
      ],
      field_notes: [
        "People usually do not burn out from one fire; they leak out through a hundred tiny cracks.",
        "Energy is not a soft metric. It is the carrying capacity of leadership."
      ]
    },
    context_tags: ["burnout", "culture", "efficiency"]
  },
  {
    id: "MOVE_SAFE_TO_SAY",
    pack: "Core Protocols v1",
    title: "Safe to Say",
    category: "Culture",
    flywheel_node: ["Culture"],
    leak_types: ["silence", "guardedness", "backchanneling"],
    dominant_forces: ["fear", "status", "conflict-avoidance"],
    time_commitment: "8–15 min",
    briefing: {
      objective: "Create a repeatable sentence frame that lowers the social risk of speaking honestly in real time.",
      use_when: [
        "People save the real conversation for after the meeting.",
        "A team needs honesty but does not yet have the nerve for free-form candor.",
        "You want a reusable way to interrupt politeness without creating chaos."
      ],
      avoid: [
        "Using the frame as a weapon.",
        "Inviting honesty and then punishing the first person who uses it."
      ],
      outcome: "Gives the team a shared linguistic handle for candor, making honesty easier to access under pressure."
    },
    difficulty: 2,
    keys_primary: ["Emotional"],
    keys_secondary: ["Leading"],
    keys_notes: "Creates a repeatable sentence frame that lowers the social risk of speaking honestly in real time.",
    script: "\u201CI want to give us a phrase we can use when something needs to be said without making it dramatic. Try this: 'I want to say something that might be uncomfortable, but I think it will help us.' If you use that sentence here, we stop and listen.\u201D",
    protocol: [
      "Introduce one sentence frame for respectful candor.",
      "Explain what happens when someone uses it: pause, listen, no punishment.",
      "Model it yourself once with a real example.",
      "Invite the team to use the frame in the next live discussion.",
      "Protect the first few uses so the phrase gains trust."
    ],
    why_it_works: "People often need language before they need bravery. A shared frame reduces the cognitive and social cost of initiating candor, especially in cultures trained toward politeness and deference.",
    proof: {
      research: [
        "Speaking-up behavior increases when teams have clear conversational norms and predictable leader responses to dissent or discomfort.",
        "Conversation design matters: scripts and sentence stems reduce initiation friction and help people engage in difficult dialogue more effectively."
      ],
      books: [
        { title: "Crucial Conversations", author: "Kerry Patterson, Joseph Grenny, Ron McMillan, and Al Switzler" },
        { title: "The Fearless Organization", author: "Amy C. Edmondson" }
      ],
      field_notes: [
        "Truth Weather names the climate; Safe to Say gives people a door handle.",
        "Sometimes the holiest thing a leader can give a room is a sentence people are allowed to stand inside."
      ]
    },
    context_tags: ["communication", "safety", "meeting"]
  }
];
