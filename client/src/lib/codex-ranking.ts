/**
 * codex-ranking.ts
 * 
 * Standalone ranking function that scores all Codex cartridges against
 * a GRAVITAS result. Replaces the hardcoded 4-cartridge switch statement.
 * 
 * Scoring Philosophy:
 * - Bottleneck (where to begin) is the primary driver
 * - Leak-type semantic overlap provides interpreted relevance
 * - Severity-difficulty matching makes recommendations feel human
 * - Archetype alignment is a light tiebreaker, not a primary selector
 * 
 * All weights are configurable in RANKING_WEIGHTS.
 */

import type { CodexEntry, FlywheelNode } from "./codex-schema";

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface GravitasSignal {
  identity: number;
  relationship: number;
  vision: number;
  culture: number;
  leak: string;        // "IDENTITY" | "RELATIONSHIP" | "VISION" | "CULTURE"
  force: string;       // highest dimension key
  firstMove: string;   // archetype name, e.g. "THE HORIZON CAST"
  total: number;
}

export interface RankedCartridge {
  entry: CodexEntry;
  score: number;
  rationale: RankingRationale;
}

export interface RankingRationale {
  bottleneckMatch: number;
  secondLowestMatch: number;
  leakOverlap: number;
  leakOverlapDetails: string[];
  forceOverlap: number;
  forceOverlapDetails: string[];
  severityFit: number;
  archetypeBonus: number;
  total: number;
}

// ─────────────────────────────────────────────────
// Configurable Weights (tune these anytime)
// ─────────────────────────────────────────────────

export const RANKING_WEIGHTS = {
  bottleneckMatch: 40,

  // Second-lowest: conditional on closeness to bottleneck
  secondLowest_close: 15,    // within 0.4 of bottleneck
  secondLowest_moderate: 8,  // within 0.8 of bottleneck
  secondLowest_far: 3,       // further than 0.8

  // Leak-type overlap: diminishing returns, capped
  leakOverlap: [8, 6, 4, 2],  // 1st match, 2nd, 3rd, 4th+
  leakOverlapCap: 20,

  // Dominant force overlap: diminishing returns, capped
  forceOverlap: [5, 4, 3],    // 1st match, 2nd, 3rd+
  forceOverlapCap: 12,

  // Severity-difficulty match
  severityFit: 10,

  // Archetype alignment (light tiebreaker)
  archetypeBonus: 3,
};

// ─────────────────────────────────────────────────
// Semantic Mapping: GRAVITAS leaks → cartridge leak_types
// ─────────────────────────────────────────────────

const LEAK_SEMANTIC_MAP: Record<string, string[]> = {
  IDENTITY: [
    "role-confusion", "anxiety", "image-management", "stuck-patterns",
    "shame", "past-focus", "overlap", "withholding", "people-pleasing",
    "resentment", "overcommitment",
  ],
  RELATIONSHIP: [
    "silence", "guardedness", "trust-loss", "low-trust", "withholding",
    "backchanneling", "thin-relationships", "low-belonging",
    "transactional-teams", "defensiveness", "misunderstanding",
    "escalation", "silent-dissent", "false-consensus", "avoidance",
    "enabling", "relational-drift", "micro-breach", "vague-feedback",
    "dependency", "leader-bottleneck",
  ],
  VISION: [
    "drift", "diffuse-focus", "blurred-priorities", "overcommitment",
    "stalling", "consensus-trap", "low-leverage-work", "noise",
    "passive-resistance", "thrash", "rework",
  ],
  CULTURE: [
    "performative-harmony", "fatigue", "calendar-bloat", "burnout",
    "politics", "default-behavior", "rework", "thrash", "noise",
    "silence", "low-agency",
  ],
};

// ─────────────────────────────────────────────────
// Semantic Mapping: GRAVITAS force → cartridge dominant_forces
// ─────────────────────────────────────────────────

const FORCE_SEMANTIC_MAP: Record<string, string[]> = {
  IDENTITY: [
    "fear", "perfectionism", "ego", "control", "defensiveness",
    "approval",
  ],
  RELATIONSHIP: [
    "fear", "conflict-avoidance", "approval", "distance",
    "people-pleasing", "avoidance",
  ],
  VISION: [
    "ambiguity", "noise", "speed", "scarcity", "busyness",
  ],
  CULTURE: [
    "default-behavior", "status", "avoidance", "busyness", "history",
  ],
};

// ─────────────────────────────────────────────────
// Archetype → cartridge character mapping (light tiebreaker)
// ─────────────────────────────────────────────────

const ARCHETYPE_DIFFICULTY_AFFINITY: Record<string, number[]> = {
  "THE OXYGEN PROTOCOL": [1, 2],       // severe → simple, stabilizing
  "THE ALIGNMENT RITUAL": [2, 3],      // friction → mid-range
  "THE WEIGHT REDISTRIBUTION": [3, 4], // compensation → structural
  "THE HORIZON CAST": [2, 3],          // emerging → growth-oriented
  "THE LEGACY CODEX": [3, 4, 5],       // full orbit → advanced
};

// ─────────────────────────────────────────────────
// Core Ranking Function
// ─────────────────────────────────────────────────

export function rankCartridges(
  entries: CodexEntry[],
  signal: GravitasSignal
): RankedCartridge[] {

  const W = RANKING_WEIGHTS;

  // Determine the bottleneck flywheel node
  const bottleneckNode = leakToFlywheelNode(signal.leak);

  // Determine the second-lowest dimension
  const dimensionScores: [string, number][] = [
    ["IDENTITY", signal.identity],
    ["RELATIONSHIP", signal.relationship],
    ["VISION", signal.vision],
    ["CULTURE", signal.culture],
  ];
  const sorted = [...dimensionScores].sort((a, b) => a[1] - b[1]);
  const lowestScore = sorted[0][1];
  const secondLowestKey = sorted[1][0];
  const secondLowestScore = sorted[1][1];
  const secondLowestNode = leakToFlywheelNode(secondLowestKey);
  const secondLowestGap = secondLowestScore - lowestScore;

  // Get the relevant leak_types and dominant_forces for this signal
  const relevantLeakTypes = LEAK_SEMANTIC_MAP[signal.leak] || [];
  const relevantForces = FORCE_SEMANTIC_MAP[signal.leak] || [];

  // Score each cartridge
  const ranked: RankedCartridge[] = entries.map((entry) => {
    const rationale: RankingRationale = {
      bottleneckMatch: 0,
      secondLowestMatch: 0,
      leakOverlap: 0,
      leakOverlapDetails: [],
      forceOverlap: 0,
      forceOverlapDetails: [],
      severityFit: 0,
      archetypeBonus: 0,
      total: 0,
    };

    // 1. Primary: flywheel_node matches bottleneck
    if (entry.flywheel_node.includes(bottleneckNode)) {
      rationale.bottleneckMatch = W.bottleneckMatch;
    }

    // 2. Secondary: flywheel_node matches second-lowest (conditional on closeness)
    if (entry.flywheel_node.includes(secondLowestNode)) {
      if (secondLowestGap <= 0.4) {
        rationale.secondLowestMatch = W.secondLowest_close;
      } else if (secondLowestGap <= 0.8) {
        rationale.secondLowestMatch = W.secondLowest_moderate;
      } else {
        rationale.secondLowestMatch = W.secondLowest_far;
      }
    }

    // 3. Leak-type semantic overlap (capped, diminishing returns)
    const matchedLeaks = entry.leak_types.filter((lt) =>
      relevantLeakTypes.includes(lt)
    );
    let leakTotal = 0;
    matchedLeaks.forEach((lt, i) => {
      const pts = W.leakOverlap[Math.min(i, W.leakOverlap.length - 1)];
      leakTotal += pts;
    });
    rationale.leakOverlap = Math.min(leakTotal, W.leakOverlapCap);
    rationale.leakOverlapDetails = matchedLeaks;

    // 4. Dominant force overlap (capped, diminishing returns)
    const matchedForces = entry.dominant_forces.filter((df) =>
      relevantForces.includes(df)
    );
    let forceTotal = 0;
    matchedForces.forEach((df, i) => {
      const pts = W.forceOverlap[Math.min(i, W.forceOverlap.length - 1)];
      forceTotal += pts;
    });
    rationale.forceOverlap = Math.min(forceTotal, W.forceOverlapCap);
    rationale.forceOverlapDetails = matchedForces;

    // 5. Severity-difficulty match
    rationale.severityFit = scoreSeverityFit(lowestScore, entry.difficulty);

    // 6. Archetype alignment (light tiebreaker)
    rationale.archetypeBonus = scoreArchetypeAlignment(
      signal.firstMove,
      entry.difficulty
    );

    // Total
    rationale.total =
      rationale.bottleneckMatch +
      rationale.secondLowestMatch +
      rationale.leakOverlap +
      rationale.forceOverlap +
      rationale.severityFit +
      rationale.archetypeBonus;

    return { entry, score: rationale.total, rationale };
  });

  // Sort descending by score, then by difficulty (prefer accessible) as final tiebreaker
  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.entry.difficulty - b.entry.difficulty;
  });

  return ranked;
}

// ─────────────────────────────────────────────────
// Helper: Convert GRAVITAS leak key to FlywheelNode
// ─────────────────────────────────────────────────

function leakToFlywheelNode(leak: string): FlywheelNode {
  const map: Record<string, FlywheelNode> = {
    IDENTITY: "Identity",
    RELATIONSHIP: "Relationship",
    VISION: "Vision",
    CULTURE: "Culture",
  };
  return map[leak] || "Identity";
}

// ─────────────────────────────────────────────────
// Helper: Score severity-difficulty fit
// ─────────────────────────────────────────────────

function scoreSeverityFit(bottleneckScore: number, difficulty: number): number {
  const W = RANKING_WEIGHTS;

  // Severe (< 2.5): prefer difficulty 1-2 (accessible, stabilizing)
  // Moderate (2.5-3.5): prefer difficulty 2-3 (mid-range)
  // Mild (> 3.5): prefer difficulty 3-5 (advanced, nuanced)

  if (bottleneckScore < 2.5) {
    // Severe: difficulty 1-2 gets full points, 3 gets half, 4-5 gets nothing
    if (difficulty <= 2) return W.severityFit;
    if (difficulty === 3) return Math.round(W.severityFit * 0.5);
    return 0;
  } else if (bottleneckScore <= 3.5) {
    // Moderate: difficulty 2-3 gets full points, 1 and 4 get half, 5 gets nothing
    if (difficulty >= 2 && difficulty <= 3) return W.severityFit;
    if (difficulty === 1 || difficulty === 4) return Math.round(W.severityFit * 0.5);
    return 0;
  } else {
    // Mild: difficulty 3-5 gets full points, 2 gets half, 1 gets nothing
    if (difficulty >= 3) return W.severityFit;
    if (difficulty === 2) return Math.round(W.severityFit * 0.5);
    return 0;
  }
}

// ─────────────────────────────────────────────────
// Helper: Score archetype alignment (light tiebreaker)
// ─────────────────────────────────────────────────

function scoreArchetypeAlignment(
  firstMove: string,
  difficulty: number
): number {
  const W = RANKING_WEIGHTS;
  const affinities = ARCHETYPE_DIFFICULTY_AFFINITY[firstMove];
  if (!affinities) return 0;
  return affinities.includes(difficulty) ? W.archetypeBonus : 0;
}

// ─────────────────────────────────────────────────
// Utility: Get top N ranked cartridges
// ─────────────────────────────────────────────────

export function getTopCartridges(
  entries: CodexEntry[],
  signal: GravitasSignal,
  n: number = 5
): RankedCartridge[] {
  return rankCartridges(entries, signal).slice(0, n);
}

// ─────────────────────────────────────────────────
// Utility: Get the single best cartridge for auto-load
// ─────────────────────────────────────────────────

export function getBestCartridge(
  entries: CodexEntry[],
  signal: GravitasSignal
): RankedCartridge | null {
  const ranked = rankCartridges(entries, signal);
  return ranked.length > 0 ? ranked[0] : null;
}
