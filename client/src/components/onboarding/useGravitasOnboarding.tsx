/**
 * useGravitasOnboarding
 *
 * Orchestration hook for the Gravitas first-run onboarding experience.
 * Manages the two-phase flow:
 *   Phase 1 — GravitasWelcome modal (shown on first visit)
 *   Phase 2 — GravitasTour spotlight tour (fires after welcome is dismissed)
 *
 * localStorage key: "gravitas_intro_seen"
 *   Not set → show welcome modal
 *   Set to "welcome_only" → skip welcome, show tour
 *   Set to "complete" → skip everything
 *
 * Usage in GravityCheck.tsx:
 *   const { OnboardingUI } = useGravitasOnboarding();
 *   return (
 *     <GravitasShell ...>
 *       <OnboardingUI />
 *       ... rest of content ...
 *     </GravitasShell>
 *   );
 *
 * Portability: this hook + its two child components are fully self-contained.
 * No dependencies on GravitasShell, GravityCheck state, or routing.
 */

import { useState, useCallback, useEffect } from "react";
import { GravitasWelcome } from "./GravitasWelcome";
import { GravitasTour } from "./GravitasTour";

const STORAGE_KEY = "gravitas_intro_seen";

type OnboardingPhase = "welcome" | "tour" | "done";

interface UseGravitasOnboardingOptions {
  /** Called when BEGIN SCAN is clicked — use to auto-select scan mode so tour fires immediately. */
  onBeginScan?: () => void;
}

export function useGravitasOnboarding({ onBeginScan }: UseGravitasOnboardingOptions = {}) {
  const [phase, setPhase] = useState<OnboardingPhase>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "complete") return "done";
      if (stored === "welcome_only") return "tour";
      return "welcome";
    } catch {
      return "welcome";
    }
  });

  const handleBegin = useCallback(() => {
    // Welcome dismissed → auto-select scan mode then advance to tour
    try {
      localStorage.setItem(STORAGE_KEY, "welcome_only");
    } catch {}
    // Trigger scan mode selection so the tour has elements to spotlight
    onBeginScan?.();
    setPhase("tour");
  }, [onBeginScan]);

  const handleSkip = useCallback(() => {
    // User has been here before → skip everything
    try {
      localStorage.setItem(STORAGE_KEY, "complete");
    } catch {}
    setPhase("done");
  }, []);

  const handleTourComplete = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "complete");
    } catch {}
    setPhase("done");
  }, []);

  // The component to render — returns null when onboarding is done
  function OnboardingUI() {
    if (phase === "welcome") {
      return <GravitasWelcome onBegin={handleBegin} onSkip={handleSkip} />;
    }
    if (phase === "tour") {
      return <GravitasTour onComplete={handleTourComplete} />;
    }
    return null;
  }

  return { OnboardingUI, phase };
}
