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
  // Calculate dimension scores (average of 3 questions each)
  const identity = ((answers[1] || 0) + (answers[2] || 0) + (answers[3] || 0)) / 3;
  const relationship = ((answers[4] || 0) + (answers[5] || 0) + (answers[6] || 0)) / 3;
  const vision = ((answers[7] || 0) + (answers[8] || 0) + (answers[9] || 0)) / 3;
  const culture = ((answers[10] || 0) + (answers[11] || 0) + (answers[12] || 0)) / 3;

  const total = (identity + relationship + vision + culture) / 4;

  // Determine Archetype
  let archetype = "";
  let description = "";
  let firstMove = "";
  let firstMoveDescription = "";

  if (total < 2.5) {
    archetype = "DEAD ORBIT";
    description = "Your team has lost its gravitational pull. Energy is dissipating into the void. People are showing up, but their hearts checked out miles ago.";
    firstMove = "THE OXYGEN PROTOCOL";
    firstMoveDescription = "Stop all non-essential initiatives. Focus entirely on re-establishing psychological safety. Your team is suffocating; they need air, not more tasks.";
  } else if (total < 3.2) {
    archetype = "FRICTION BELT";
    description = "You have movement, but it's grinding. Every step forward requires disproportionate effort. The heat you feel isn't passion; it's the friction of misalignment.";
    firstMove = "THE CLARITY AUDIT";
    firstMoveDescription = "Identify the conflicting priorities that are grinding your gears. Remove one major project that is causing drag but adding no velocity.";
  } else if (total < 3.8) {
    archetype = "COMPENSATION ORBIT";
    description = "The system is broken, but heroic individuals are holding it together. You are burning people as fuel to maintain altitude. This is not sustainable.";
    firstMove = "THE DELEGATION RESET";
    firstMoveDescription = "Stop hero-ing. Identify where you are personally propping up a broken system and let it fail safely so you can fix the root cause.";
  } else if (total < 4.5) {
    archetype = "EMERGING GRAVITY";
    description = "You are building something real. The core is dense and magnetic. People are drawn to the work, not just the paycheck. Keep feeding the fire.";
    firstMove = "THE VISION CASTING";
    firstMoveDescription = "Amplify the 'why'. Your team is ready to run; give them a horizon line that scares and excites them in equal measure.";
  } else {
    archetype = "FULL ORBIT";
    description = "A self-sustaining ecosystem. Your culture is a gravity well that attracts talent and repels mediocrity automatically. The leader's job now is guardianship.";
    firstMove = "THE LEGACY LOCK";
    firstMoveDescription = "Codify your culture. Write down the 'unwritten rules' that made this possible so they can survive beyond your direct tenure.";
  }

  // Determine Leak (Lowest Score)
  const scores = { IDENTITY: identity, RELATIONSHIP: relationship, VISION: vision, CULTURE: culture };
  const leak = Object.entries(scores).reduce((a, b) => a[1] < b[1] ? a : b)[0];

  let leakDescription = "";
  switch (leak) {
    case "IDENTITY":
      leakDescription = "ROLE FOG: People don't know who they are or why they matter here.";
      break;
    case "RELATIONSHIP":
      leakDescription = "SILENCE TAX: The cost of things left unsaid is bankrupting your trust.";
      break;
    case "VISION":
      leakDescription = "DRIFT: You are moving, but without a destination. Motion vs. Progress.";
      break;
    case "CULTURE":
      leakDescription = "THEATER: You are performing 'work' rather than creating impact.";
      break;
  }

  // Determine Force (Highest Score)
  const force = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  let forceDescription = "";
  switch (force) {
    case "IDENTITY":
      forceDescription = "AGENCY: Your people feel powerful and capable.";
      break;
    case "RELATIONSHIP":
      forceDescription = "TRUST: The bonds between people are your strongest asset.";
      break;
    case "VISION":
      forceDescription = "PURPOSE: The mission is clear and compelling.";
      break;
    case "CULTURE":
      forceDescription = "RHYTHM: Your rituals create energy and momentum.";
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
    firstMoveDescription
  };
}
