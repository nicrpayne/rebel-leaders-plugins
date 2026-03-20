/**
 * GravitasTour
 *
 * Custom 3-step spotlight tour for first-time Gravitas users.
 * Uses getBoundingClientRect + CSS clip-path to create a real cutout
 * spotlight that works regardless of the Gravitas stacking context.
 *
 * Targets three elements by data-tour attribute:
 *   data-tour="gravitas-display"  — the green CRT statement display
 *   data-tour="gravitas-knob"     — the INTENSITY rotary knob
 *   data-tour="gravitas-next"     — the NEXT button
 *
 * Portability: zero coupling to GravitasShell or GravityCheck internals.
 * The only requirement is that the three data-tour attributes exist in the DOM.
 *
 * Props:
 *   onComplete — called when the tour finishes or is dismissed
 */

import { useState, useEffect, useCallback, useRef } from "react";

interface TourStep {
  selector: string;
  title: string;
  description: string;
  popoverSide: "top" | "bottom" | "left" | "right";
  doneBtnText?: string;
}

const STEPS: TourStep[] = [
  {
    selector: '[data-tour="gravitas-display"]',
    title: "THE STATEMENT",
    description:
      "Each statement describes a leadership pattern. Read it carefully — then rate how true it is for you right now.",
    popoverSide: "bottom",
  },
  {
    selector: '[data-tour="gravitas-knob"]',
    title: "INTENSITY KNOB",
    description:
      "Turn the knob to rate the statement. Low intensity means it rarely applies. High intensity means it's deeply true.",
    popoverSide: "left",
  },
  {
    selector: '[data-tour="gravitas-next"]',
    title: "ADVANCE THE SCAN",
    description:
      "When you've set your intensity, press NEXT to lock in your reading and move to the next statement.",
    popoverSide: "top",
    doneBtnText: "BEGIN SCAN",
  },
];

const PAD = 12; // padding around spotlight cutout in px

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function getRect(selector: string): Rect | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

interface GravitasTourProps {
  onComplete: () => void;
}

export function GravitasTour({ onComplete }: GravitasTourProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [visible, setVisible] = useState(false);
  const [popoverReady, setPopoverReady] = useState(false);
  const rafRef = useRef<number | null>(null);

  const step = STEPS[stepIndex];

  // Measure the target element and update rect on every frame so it
  // stays in sync even if the layout shifts slightly
  const measureRect = useCallback(() => {
    if (!step) return;
    const r = getRect(step.selector);
    if (r) setRect(r);
    rafRef.current = requestAnimationFrame(measureRect);
  }, [step]);

  useEffect(() => {
    // Short delay to let the scan interface fully render
    const t = setTimeout(() => {
      setVisible(true);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    setPopoverReady(false);
    rafRef.current = requestAnimationFrame(measureRect);
    const t = setTimeout(() => setPopoverReady(true), 100);
    return () => {
      clearTimeout(t);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, measureRect, stepIndex]);

  const handleNext = useCallback(() => {
    if (stepIndex < STEPS.length - 1) {
      setPopoverReady(false);
      setTimeout(() => setStepIndex((i) => i + 1), 80);
    } else {
      onComplete();
    }
  }, [stepIndex, onComplete]);

  const handleBack = useCallback(() => {
    if (stepIndex > 0) {
      setPopoverReady(false);
      setTimeout(() => setStepIndex((i) => i - 1), 80);
    }
  }, [stepIndex]);

  const handleClose = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Always render the dark overlay immediately to prevent flash.
  // Only the spotlight cutout and popover wait for `visible`.
  if (!step) return null;

  // Build the clip-path polygon that cuts a hole around the target element.
  // The polygon traces the viewport edges, then cuts inward around the spotlight.
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let clipPath = "none";
  let spotTop = 0, spotLeft = 0, spotRight = 0, spotBottom = 0;

  if (rect) {
    spotTop = Math.max(0, rect.top - PAD);
    spotLeft = Math.max(0, rect.left - PAD);
    spotRight = Math.min(vw, rect.left + rect.width + PAD);
    spotBottom = Math.min(vh, rect.top + rect.height + PAD);

    // Polygon: outer rect (clockwise) + inner cutout (counter-clockwise)
    clipPath = `polygon(
      0px 0px,
      ${vw}px 0px,
      ${vw}px ${vh}px,
      0px ${vh}px,
      0px 0px,
      ${spotLeft}px ${spotTop}px,
      ${spotLeft}px ${spotBottom}px,
      ${spotRight}px ${spotBottom}px,
      ${spotRight}px ${spotTop}px,
      ${spotLeft}px ${spotTop}px
    )`;
  }

  // Popover positioning
  const popoverWidth = 280;
  const popoverGap = 14;

  let popTop = 0;
  let popLeft = 0;

  if (rect) {
    switch (step.popoverSide) {
      case "bottom":
        popTop = spotBottom + popoverGap;
        popLeft = rect.left + rect.width / 2 - popoverWidth / 2;
        break;
      case "top":
        popTop = spotTop - popoverGap - 160; // approx popover height
        popLeft = rect.left + rect.width / 2 - popoverWidth / 2;
        break;
      case "left":
        popTop = rect.top + rect.height / 2 - 80;
        popLeft = spotLeft - popoverWidth - popoverGap;
        break;
      case "right":
        popTop = rect.top + rect.height / 2 - 80;
        popLeft = spotRight + popoverGap;
        break;
    }
    // Clamp to viewport
    popLeft = Math.max(12, Math.min(vw - popoverWidth - 12, popLeft));
    popTop = Math.max(12, Math.min(vh - 220, popTop));
  }

  const isLast = stepIndex === STEPS.length - 1;

  return (
    <>
      {/* Dark overlay — always present, cutout only appears when rect is ready */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "rgba(0,0,0,0.72)",
          clipPath: (visible && rect) ? clipPath : undefined,
          pointerEvents: "none",
          transition: "clip-path 0.3s ease",
        }}
      />

      {/* Spotlight border glow — only when visible */}
      {visible && rect && (
        <div
          style={{
            position: "fixed",
            top: spotTop,
            left: spotLeft,
            width: spotRight - spotLeft,
            height: spotBottom - spotTop,
            zIndex: 9999,
            border: "1px solid rgba(74, 222, 128, 0.5)",
            borderRadius: 4,
            boxShadow: "0 0 0 2px rgba(74, 222, 128, 0.12), inset 0 0 12px rgba(74, 222, 128, 0.05)",
            pointerEvents: "none",
            transition: "all 0.25s ease",
          }}
        />
      )}

      {/* Popover card — only render when visible, rect is known, and ready to show */}
      {visible && rect && (
      <div
        style={{
          position: "fixed",
          top: popTop,
          left: popLeft,
          width: popoverWidth,
          zIndex: 10000,
          background: "#0a0d0a",
          border: "1px solid #2a3d2a",
          borderRadius: 4,
          boxShadow: "0 0 0 1px rgba(74,222,128,0.06), 0 16px 48px rgba(0,0,0,0.8)",
          fontFamily: "monospace",
          overflow: "hidden",
          opacity: popoverReady ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#0e120e",
            borderBottom: "1px solid #1a2a1a",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.24em",
              color: "#4ade80",
              textShadow: "0 0 8px rgba(74,222,128,0.35)",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {step.title}
          </span>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              color: "#2d4a2d",
              cursor: "pointer",
              fontSize: 14,
              lineHeight: 1,
              padding: "0 0 0 8px",
              fontFamily: "monospace",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4a7a4a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#2d4a2d")}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "12px 14px 10px",
            fontSize: 10,
            lineHeight: 1.8,
            letterSpacing: "0.05em",
            color: "#7a9a7a",
          }}
        >
          {step.description}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "10px 14px 12px",
            borderTop: "1px solid #1a2a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          {/* Progress */}
          <span style={{ fontSize: 8, letterSpacing: "0.2em", color: "#2d4a2d" }}>
            {stepIndex + 1} / {STEPS.length}
          </span>

          <div style={{ display: "flex", gap: 6 }}>
            {stepIndex > 0 && (
              <button
                onClick={handleBack}
                style={{
                  background: "transparent",
                  border: "1px solid #1a2a1a",
                  color: "#3a5a3a",
                  borderRadius: 2,
                  padding: "5px 10px",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "monospace",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2d4a2d";
                  e.currentTarget.style.color = "#4a7a4a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1a2a1a";
                  e.currentTarget.style.color = "#3a5a3a";
                }}
              >
                ‹ BACK
              </button>
            )}
            <button
              onClick={handleNext}
              style={{
                background: "#0e2a14",
                border: "1px solid #3db84a",
                color: "#4ade80",
                borderRadius: 2,
                padding: "5px 10px",
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "monospace",
                boxShadow: "0 0 8px rgba(74,222,128,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#142e1a";
                e.currentTarget.style.boxShadow = "0 0 16px rgba(74,222,128,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0e2a14";
                e.currentTarget.style.boxShadow = "0 0 8px rgba(74,222,128,0.08)";
              }}
            >
              {isLast ? (step.doneBtnText ?? "DONE") : "NEXT ›"}
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
