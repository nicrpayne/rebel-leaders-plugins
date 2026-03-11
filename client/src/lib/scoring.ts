import { allQuestions, type Dimension } from "./questions";

export interface ScoringResult {
  identity: number;
  relationship: number;
  vision: number;
  culture: number;
  total: number;
  archetype: string;
  description: string;
  leak: string;
  leakDescription: string;
  force: string;
  forceDescription: string;
  firstMove: string;
  firstMoveDescription: string;
}

export function calculateScore(answers: Record<number, number>): ScoringResult {
  // Dynamically calculate dimension scores based on answered questions
  const dimensionScores: Record<Dimension, number[]> = {
    IDENTITY: [],
    RELATIONSHIP: [],
    VISION: [],
    CULTURE: [],
  };

  // Collect scores by dimension
  for (const [idStr, score] of Object.entries(answers)) {
    const id = parseInt(idStr);
    const question = allQuestions.find((q) => q.id === id);
    if (question) {
      dimensionScores[question.category].push(score);
    }
  }

  // Average each dimension
  const avg = (arr: number[]) =>
    arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const identity = avg(dimensionScores.IDENTITY);
  const relationship = avg(dimensionScores.RELATIONSHIP);
  const vision = avg(dimensionScores.VISION);
  const culture = avg(dimensionScores.CULTURE);

  const total = (identity + relationship + vision + culture) / 4;

  // ─────────────────────────────────────────────────
  // ARCHETYPES — The Gravitational State of Your World
  // ─────────────────────────────────────────────────
  let archetype = "";
  let description = "";
  let firstMove = "";
  let firstMoveDescription = "";

  if (total < 2.0) {
    archetype = "DEAD ORBIT";
    description =
      "Your world has lost its gravitational pull. Energy is bleeding into the void. Bodies are present, but spirits departed long ago. This is not a team—it is a collection of ghosts haunting the same office.";
    firstMove = "THE OXYGEN PROTOCOL";
    firstMoveDescription =
      "Stop everything. Before strategy, before vision, before any grand ambitions—your people need to breathe. Strip away every non-essential demand. Rebuild the most basic form of psychological safety: the knowledge that it is safe to speak, safe to fail, safe to be human here. You cannot light a fire in a vacuum.";
  } else if (total < 2.8) {
    archetype = "FRICTION BELT";
    description =
      "There is motion, but it grinds. Every stride forward demands twice the energy it should. The heat you feel is not passion—it is the friction of misaligned forces scraping against each other. Effort is high. Progress is low. Something fundamental is out of alignment.";
    firstMove = "THE ALIGNMENT RITUAL";
    firstMoveDescription =
      "Gather your people. Not for a status update—for a reckoning. Name the two or three competing gravitational forces that are pulling the team apart. Then make the hard call: choose one star to orbit. Kill the others with gratitude and grief, but kill them. A body cannot orbit two suns.";
  } else if (total < 3.5) {
    archetype = "COMPENSATION ORBIT";
    description =
      "The system is cracked, but heroic individuals are holding the sky up with their bare hands. You are burning people as fuel to maintain altitude. The mythology says 'we have a great team.' The truth is: you have great individuals compensating for a broken architecture. This is not sustainable. Heroes eventually fall.";
    firstMove = "THE WEIGHT REDISTRIBUTION";
    firstMoveDescription =
      "Identify the three places where a single person is load-bearing for an entire system. Then let those systems fail—safely, intentionally, in controlled conditions. Watch what breaks. That is where the real work lives. Stop rewarding heroism and start building structures that do not require it.";
  } else if (total < 4.2) {
    archetype = "EMERGING GRAVITY";
    description =
      "Something real is forming here. The core is growing dense and magnetic. People are drawn to the work itself, not just the paycheck or the prestige. You can feel the pull strengthening. This is the critical phase—the moment where potential becomes orbit. Feed the fire. Protect the flame.";
    firstMove = "THE HORIZON CAST";
    firstMoveDescription =
      "Your people are ready to run. Give them a destination that makes their pulse quicken and their palms sweat. Paint a future so vivid and so audacious that it scares and excites them in equal measure. Then step back and watch them sprint toward it. Your job now is to clear the path, not carry the torch.";
  } else {
    archetype = "FULL ORBIT";
    description =
      "A self-sustaining gravitational field. Your culture is a force of nature—it attracts the extraordinary and repels the mediocre without conscious effort. The system generates its own energy. The leader's role has shifted from architect to guardian. Your task now is not to build, but to protect what has been built, and to ensure it outlives you.";
    firstMove = "THE LEGACY CODEX";
    firstMoveDescription =
      "Write down the unwritten laws. The invisible forces that made this culture possible—the stories, the rituals, the sacred 'no's, the things you would never compromise—codify them. Not as corporate policy, but as living wisdom. Because the greatest threat to a thriving culture is the assumption that it will simply continue on its own.";
  }

  // ─────────────────────────────────────────────────
  // LEAK — The Crack Where Light Escapes
  // ─────────────────────────────────────────────────
  const scores = {
    IDENTITY: identity,
    RELATIONSHIP: relationship,
    VISION: vision,
    CULTURE: culture,
  };
  const leak = Object.entries(scores).reduce((a, b) =>
    a[1] < b[1] ? a : b
  )[0];

  let leakDescription = "";
  switch (leak) {
    case "IDENTITY":
      leakDescription =
        "ROLE FOG — Your people are wandering in a mist. They show up, they perform, but they have lost the thread of *who they are* and *why they matter* in this story. Without a clear sense of self, every challenge becomes an existential crisis instead of a worthy opponent.";
      break;
    case "RELATIONSHIP":
      leakDescription =
        "THE SILENCE TAX — The most expensive thing in your world is the truth that never gets spoken. Unvoiced fears, swallowed frustrations, and polite fictions are silently bankrupting the trust reserves. The longer the silence compounds, the higher the interest.";
      break;
    case "VISION":
      leakDescription =
        "DRIFT — The ship is moving, but no one is steering toward a star. There is motion without meaning, activity without direction. Your people are rowing hard, but the horizon keeps shifting. Motion is not progress. Speed without a heading is just expensive wandering.";
      break;
    case "CULTURE":
      leakDescription =
        "THEATER — The rituals have become performances. People are acting out 'work' rather than doing the work that matters. The meetings, the updates, the ceremonies—they look right from the outside, but inside they are hollow. Energy is being spent on appearance, not impact.";
      break;
  }

  // ─────────────────────────────────────────────────
  // FORCE — The Strongest Current in Your Field
  // ─────────────────────────────────────────────────
  const force = Object.entries(scores).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];
  let forceDescription = "";
  switch (force) {
    case "IDENTITY":
      forceDescription =
        "SOVEREIGN AGENCY — Your people know who they are. They carry an inner compass that does not waver when the storms hit. This is your deepest asset: humans who lead from identity, not from fear.";
      break;
    case "RELATIONSHIP":
      forceDescription =
        "FORGED BONDS — The connections between your people are your most powerful force. Trust this deep does not come from team-building exercises; it was earned in the fire. Guard it fiercely.";
      break;
    case "VISION":
      forceDescription =
        "MAGNETIC NORTH — Your mission burns bright enough to pull people through the dark. When the purpose is this clear, alignment becomes effortless and sacrifice becomes voluntary.";
      break;
    case "CULTURE":
      forceDescription =
        "LIVING RHYTHM — Your rituals and norms generate genuine energy. The way you gather, decide, and celebrate creates a heartbeat that sustains the organism even when individual cells are tired.";
      break;
  }

  return {
    identity: Number(identity.toFixed(1)),
    relationship: Number(relationship.toFixed(1)),
    vision: Number(vision.toFixed(1)),
    culture: Number(culture.toFixed(1)),
    total: Number(total.toFixed(1)),
    archetype,
    description,
    leak,
    leakDescription,
    force,
    forceDescription,
    firstMove,
    firstMoveDescription,
  };
}
