/**
 * useGravitasOnboarding
 *
 * Orchestration hook for the Gravitas first-run onboarding experience.
 * Manages the two-phase flow:
 *   Phase 1 — GravitasWelcome modal (shown on first visit)
 *   Phase 2 — GravitasTour spotlight tour (fires after welcome is dismissed)
 *
 * After the tour completes, onTourComplete is called so the host can
 * reset scanMode back to null — returning the user to mode select.
 *
 * localStorage key: "gravitas_intro_seen"
 *   Not set → show welcome modal
 *   Set to "welcome_only" → skip welcome, show tour
 *   Set to "complete" → skip everything
 *
 * Portability: this hook + its two child components are fully self-contained.
 * No dependencies on GravitasShell, GravityCheck state, or routing.
 */

import { useState, useCallback } from "react";
import { GravitasWelcome } from "./GravitasWelcome";
import { GravitasTour } from "./GravitasTour";

const STORAGE_KEY = "gravitas_intro_seen";

type OnboardingPhase = "welcome" | "tour" | "done";

interface UseGravitasOnboardingOptions {
  /** Called when BEGIN SCAN is clicked — use to temporarily set scan mode so tour has targets. */
  onBeginScan?: () => void;
  /** Called when the tour finishes — use to reset scan mode back to null for mode select. */
  onTourComplete?: () => void;
}

export function useGravitasOnboarding({ onBeginScan, onTourComplete }: UseGravitasOnboardingOptions = {}) {
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
    try {
      localStorage.setItem(STORAGE_KEY, "welcome_only");
    } catch {}
    // Temporarily set scan mode so the tour has question UI elements to spotlight
    onBeginScan?.();
    setPhase("tour");
  }, [onBeginScan]);

  const handleSkip = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "complete");
    } catch {}
    setPhase("done");
  }, []);

  const handleTourComplete = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "complete");
    } catch {}
    // Reset scan mode back to null so user sees mode select after tour
    onTourComplete?.();
    setPhase("done");
  }, [onTourComplete]);

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
