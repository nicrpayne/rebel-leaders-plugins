export type Dimension = "IDENTITY" | "RELATIONSHIP" | "VISION" | "CULTURE";
export type ScanDepth = "SCAN" | "DEEP";

export interface Question {
  id: number;
  text: string;
  subtext?: string;
  category: Dimension;
  depth: ScanDepth; // "SCAN" = included in both modes; "DEEP" = only in Deep Scan
}

// ─────────────────────────────────────────────────
// IDENTITY — Who are we? (Agency, Self-Awareness, Ownership)
// ─────────────────────────────────────────────────
const identity: Question[] = [
  // SCAN (5)
  {
    id: 1,
    text: "I operate from a deep sense of personal agency, rather than just executing a list of tasks.",
    category: "IDENTITY",
    depth: "SCAN",
  },
  {
    id: 2,
    text: "When I stumble, my instinct is to bring the mistake into the light rather than bury it in the dark.",
    category: "IDENTITY",
    depth: "SCAN",
  },
  {
    id: 3,
    text: "I know exactly who I am as a leader, independent of the titles or accolades bestowed upon me.",
    category: "IDENTITY",
    depth: "SCAN",
  },
  {
    id: 4,
    text: "We do not wear armor here; people bring their unedited, whole selves to the arena.",
    category: "IDENTITY",
    depth: "SCAN",
  },
  {
    id: 5,
    text: "The spirit of our crew is so distinct, a stranger could feel our gravity within an hour.",
    category: "IDENTITY",
    depth: "SCAN",
  },
  // DEEP (8)
  {
    id: 6,
    text: "I can distill my leadership philosophy into a single truth—and my team would recognize it instantly.",
    category: "IDENTITY",
    depth: "DEEP",
  },
  {
    id: 7,
    text: "We honor the wisdom of 'I don't know'; saying it here costs you zero credibility.",
    category: "IDENTITY",
    depth: "DEEP",
  },
  {
    id: 8,
    text: "The weight of my role forces me to grow in ways that feel profoundly intentional.",
    category: "IDENTITY",
    depth: "DEEP",
  },
  {
    id: 9,
    text: "We search for depth of character before we ever look at the sharpness of a sword.",
    category: "IDENTITY",
    depth: "DEEP",
  },
  {
    id: 10,
    text: "I feel more aligned with my true nature here than I do almost anywhere else.",
    category: "IDENTITY",
    depth: "DEEP",
  },
  {
    id: 11,
    text: "Our scars have made us antifragile, not timid or cautious.",
    category: "IDENTITY",
    depth: "DEEP",
  },
  {
    id: 12,
    text: "There is a clear 'before and after' for those who walk through our doors.",
    subtext: "They emerge as a more potent version of themselves.",
    category: "IDENTITY",
    depth: "DEEP",
  },
  {
    id: 13,
    text: "The distance between who I actually am and who I project to be at work is practically zero.",
    category: "IDENTITY",
    depth: "DEEP",
  },
];

// ─────────────────────────────────────────────────
// RELATIONSHIP — How do we connect? (Trust, Safety, Belonging)
// ─────────────────────────────────────────────────
const relationship: Question[] = [
  // SCAN (5)
  {
    id: 14,
    text: "We have 'fridge rights' with one another.",
    subtext: "I could walk into their kitchen, open the fridge, and make a sandwich—and they wouldn't even blink.",
    category: "RELATIONSHIP",
    depth: "SCAN",
  },
  {
    id: 15,
    text: "When a comrade is faltering, our immediate reflex is deep curiosity, not swift judgment.",
    category: "RELATIONSHIP",
    depth: "SCAN",
  },
  {
    id: 16,
    text: "We clash often and passionately, yet the dust settles without leaving a trace of bitterness.",
    category: "RELATIONSHIP",
    depth: "SCAN",
  },
  {
    id: 17,
    text: "I would trust the people beside me with my legacy, not just with my daily deliverables.",
    category: "RELATIONSHIP",
    depth: "SCAN",
  },
  {
    id: 18,
    text: "When new souls arrive, they are not merely 'onboarded'; they are initiated into the tribe.",
    category: "RELATIONSHIP",
    depth: "SCAN",
  },
  // DEEP (8)
  {
    id: 19,
    text: "I know the battles my comrades are fighting outside these walls, and they know mine.",
    category: "RELATIONSHIP",
    depth: "DEEP",
  },
  {
    id: 20,
    text: "We deliver heavy truths looking each other in the eye, never whispering them in the shadows.",
    category: "RELATIONSHIP",
    depth: "DEEP",
  },
  {
    id: 21,
    text: "We feast on each other's victories without a single drop of envy.",
    category: "RELATIONSHIP",
    depth: "DEEP",
  },
  {
    id: 22,
    text: "There are no sacred cows here—every assumption can be brought to the altar and questioned.",
    category: "RELATIONSHIP",
    depth: "DEEP",
  },
  {
    id: 23,
    text: "We signal for help early and often; it is seen as a sign of self-awareness, never weakness.",
    category: "RELATIONSHIP",
    depth: "DEEP",
  },
  {
    id: 24,
    text: "Our shared lore, inside jokes, and quiet rituals bind us tighter than any contract could.",
    category: "RELATIONSHIP",
    depth: "DEEP",
  },
  {
    id: 25,
    text: "If a member of the crew departed tomorrow, the loss would be felt in our bones, not just our capacity.",
    category: "RELATIONSHIP",
    depth: "DEEP",
  },
  {
    id: 26,
    text: "Hierarchy does not warp our truth—the most resonant idea wins, regardless of who speaks it.",
    category: "RELATIONSHIP",
    depth: "DEEP",
  },
];

// ─────────────────────────────────────────────────
// VISION — Where are we going? (Purpose, Direction, Resilience)
// ─────────────────────────────────────────────────
const vision: Question[] = [
  // SCAN (5)
  {
    id: 27,
    text: "Our vision is a massive gravity well—it pulls us forward even when our legs are heavy.",
    category: "VISION",
    depth: "SCAN",
  },
  {
    id: 28,
    text: "When we hit an impenetrable wall, we pivot with the calm of water, rather than shattering like glass.",
    category: "VISION",
    depth: "SCAN",
  },
  {
    id: 29,
    text: "I can articulate the exact dent we are trying to put in the universe in a single breath.",
    category: "VISION",
    depth: "SCAN",
  },
  {
    id: 30,
    text: "Every soul here knows our true north without needing to consult a map.",
    category: "VISION",
    depth: "SCAN",
  },
  {
    id: 31,
    text: "We ruthlessly say 'no' to shiny distractions because we are fiercely devoted to the great work.",
    category: "VISION",
    depth: "SCAN",
  },
  // DEEP (8)
  {
    id: 32,
    text: "Our strategy feels like an epic saga we are actively writing, not a spreadsheet we are merely updating.",
    category: "VISION",
    depth: "DEEP",
  },
  {
    id: 33,
    text: "We have the courage to burn down projects that no longer serve the mission, regardless of the sunk cost.",
    category: "VISION",
    depth: "DEEP",
  },
  {
    id: 34,
    text: "The team intuitively knows the difference between the noise of the urgent and the quiet weight of the important.",
    category: "VISION",
    depth: "DEEP",
  },
  {
    id: 35,
    text: "The horizon we are chasing terrifies us slightly—in the exact way that it should.",
    category: "VISION",
    depth: "DEEP",
  },
  {
    id: 36,
    text: "We have identified the 'dragon' we are here to slay, and that shared enemy unites us deeply.",
    category: "VISION",
    depth: "DEEP",
  },
  {
    id: 37,
    text: "We feel the momentum of our progress daily, not just when the quarter ends.",
    category: "VISION",
    depth: "DEEP",
  },
  {
    id: 38,
    text: "If all external deadlines vanished tomorrow, this crew would still move with fierce urgency.",
    category: "VISION",
    depth: "DEEP",
  },
  {
    id: 39,
    text: "When we speak of the years ahead, the room fills with electricity, not anxiety.",
    category: "VISION",
    depth: "DEEP",
  },
];

// ─────────────────────────────────────────────────
// CULTURE — How does it feel? (Rituals, Energy, Norms)
// ─────────────────────────────────────────────────
const culture: Question[] = [
  // SCAN (5)
  {
    id: 40,
    text: "Our gathering rituals act as a forge, generating heat and energy rather than slowly bleeding us dry.",
    category: "CULTURE",
    depth: "SCAN",
  },
  {
    id: 41,
    text: "The invisible currents of this place reward true kinetic impact, not the mere theater of busyness.",
    category: "CULTURE",
    depth: "SCAN",
  },
  {
    id: 42,
    text: "We honor 'who people are becoming' with just as much reverence as 'what they are producing'.",
    category: "CULTURE",
    depth: "SCAN",
  },
  {
    id: 43,
    text: "A traveler entering our space would describe the atmosphere as 'electric'—never 'stagnant' or 'fearful'.",
    category: "CULTURE",
    depth: "SCAN",
  },
  {
    id: 44,
    text: "We guard each other's deep work time with the ferocity of a shield wall.",
    category: "CULTURE",
    depth: "SCAN",
  },
  // DEEP (8)
  {
    id: 45,
    text: "We protect at least one sacred ritual that exists purely for joy—requiring zero ROI to justify it.",
    category: "CULTURE",
    depth: "DEEP",
  },
  {
    id: 46,
    text: "Wisdom flows like water here; hoarding knowledge to build personal fiefdoms is culturally lethal.",
    category: "CULTURE",
    depth: "DEEP",
  },
  {
    id: 47,
    text: "The root system of our culture is so deep, it would thrive even if the current canopy of leadership fell.",
    category: "CULTURE",
    depth: "DEEP",
  },
  {
    id: 48,
    text: "We actively prune dead processes, rather than letting the bureaucratic vines choke out the light.",
    category: "CULTURE",
    depth: "DEEP",
  },
  {
    id: 49,
    text: "We view rest as a vital weapon for the long campaign, not a weakness to be hidden.",
    category: "CULTURE",
    depth: "DEEP",
  },
  {
    id: 50,
    text: "People pour their extra energy into the work because they care deeply, never because the whip is cracking.",
    category: "CULTURE",
    depth: "DEEP",
  },
  {
    id: 51,
    text: "We speak a dialect all our own—metaphors and shorthand that would sound like a foreign tongue to outsiders.",
    category: "CULTURE",
    depth: "DEEP",
  },
  {
    id: 52,
    text: "The way we treat each other when the doors are locked perfectly mirrors the legend we project to the world.",
    category: "CULTURE",
    depth: "DEEP",
  },
];

// ─────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────

/** All questions across all dimensions */
export const allQuestions: Question[] = [
  ...identity,
  ...relationship,
  ...vision,
  ...culture,
];

/** SCAN mode: 5 per dimension = 20 questions */
export const scanQuestions: Question[] = allQuestions.filter(
  (q) => q.depth === "SCAN"
);

/** DEEP SCAN mode: all questions = 52 */
export const deepScanQuestions: Question[] = allQuestions;

/** Helper to get questions by mode */
export function getQuestions(mode: "SCAN" | "DEEP_SCAN"): Question[] {
  return mode === "SCAN" ? scanQuestions : deepScanQuestions;
}

/** Legacy export for backward compatibility */
export const questions = scanQuestions;
