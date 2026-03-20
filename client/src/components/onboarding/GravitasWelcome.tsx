/**
 * GravitasWelcome
 *
 * Self-contained welcome modal for first-time Gravitas users.
 * Renders over the Gravitas interface (which is blurred/dimmed behind it).
 * Styled to match the Gravitas instrument aesthetic — dark chassis, phosphor green,
 * monospace type, same header bar language.
 *
 * Props:
 *   onBegin  — called when user clicks "Begin Scan" or dismisses
 *   onSkip   — called when user clicks "I've been here before — skip intro"
 *
 * Portability: this component has zero dependencies on GravitasShell or
 * GravityCheck internals. Drop it anywhere with a dark background and it works.
 */

import { useEffect, useRef, useCallback } from "react";


interface GravitasWelcomeProps {
  onBegin: () => void;
  onSkip: () => void;
}

export function GravitasWelcome({ onBegin, onSkip }: GravitasWelcomeProps) {
  const beginRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the Begin Scan button for keyboard accessibility
  useEffect(() => {
    beginRef.current?.focus();
  }, []);

  const handleBegin = useCallback(() => {
    onBegin();
  }, [onBegin]);

  return (
    /* Full-screen backdrop — blurs and dims whatever is behind */
    <>
    <style>{`
      @keyframes gravitas-fade-in {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
    `}</style>
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backdropFilter: "blur(6px)",
        background: "rgba(0,0,0,0.72)",
        animation: "gravitas-fade-in 0.4s ease forwards",
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="gravitas-welcome-title"
    >
      {/* Card chassis — mirrors the Gravitas instrument panel language */}
      <div
        className="relative flex flex-col w-[480px] max-w-[92vw]"
        style={{
          background: "#0a0d0a",
          border: "1px solid #2a3d2a",
          borderRadius: "4px",
          boxShadow:
            "0 0 0 1px rgba(74,222,128,0.06), 0 24px 64px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* ── Header bar ─────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{
            background: "#0e120e",
            borderBottom: "1px solid #1a2a1a",
            borderRadius: "4px 4px 0 0",
          }}
        >
          <div className="flex items-center gap-2">
            {/* PWR dot */}
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "#3db84a", boxShadow: "0 0 6px #3db84a88" }}
            />
            {/* SIG dot */}
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "#c5a059", boxShadow: "0 0 4px #c5a05966" }}
            />
          </div>
          <span
            className="text-[9px] tracking-[0.22em] uppercase"
            style={{ color: "#2d4a2d", fontFamily: "monospace" }}
          >
            SIGNAL INPUT ● GRAVITAS
          </span>
        </div>

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center px-8 pt-7 pb-6 gap-0">
          {/* Title */}
          <h2
            id="gravitas-welcome-title"
            className="text-[13px] tracking-[0.28em] uppercase mb-1"
            style={{
              color: "#4ade80",
              fontFamily: "monospace",
              textShadow: "0 0 12px rgba(74,222,128,0.4)",
            }}
          >
            INITIALIZING SCAN
          </h2>

          {/* Dot separator */}
          <div className="flex gap-[6px] mb-5 mt-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="inline-block w-[3px] h-[3px] rounded-full"
                style={{ background: "#1e3a1e" }}
              />
            ))}
          </div>

          {/* Copy — three short lines */}
          <p
            className="text-center text-[11px] leading-[1.9] tracking-[0.06em] mb-6"
            style={{ color: "#8aaa8a", fontFamily: "monospace", maxWidth: "340px" }}
          >
            Gravitas is a diagnostic instrument for leaders.
            <br />
            It reads the forces shaping how you lead.
            <br />
            <span style={{ color: "#6a8a6a" }}>
              Answer honestly. It takes about 4 minutes.
            </span>
          </p>

          {/* ── Readout strip ──────────────────────────────────────── */}
          <div
            className="w-full flex justify-around py-2 mb-6"
            style={{
              background: "#0c100c",
              border: "1px solid #1a2a1a",
              borderRadius: "2px",
            }}
          >
            {[
              { label: "FIELD LOCK", value: "ACQUIRING", valueColor: "#b84a3a" },
              { label: "ORBIT", value: "—", valueColor: "#4a6a4a" },
              { label: "COHERENCE", value: "—", valueColor: "#4a6a4a" },
              { label: "GRAVITY SCAN", value: "READY", valueColor: "#c5a059" },
            ].map(({ label, value, valueColor }) => (
              <div key={label} className="flex flex-col items-center gap-[3px]">
                <span
                  className="text-[7px] tracking-[0.2em] uppercase"
                  style={{ color: "#2d4a2d", fontFamily: "monospace" }}
                >
                  {label}
                </span>
                <span
                  className="text-[8px] tracking-[0.15em] uppercase"
                  style={{ color: valueColor, fontFamily: "monospace" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* ── Begin Scan button ──────────────────────────────────── */}
          <button
            ref={beginRef}
            onClick={handleBegin}
            className="w-full py-[10px] text-[11px] tracking-[0.28em] uppercase transition-all duration-150"
            style={{
              background: "#0e2a14",
              border: "1px solid #3db84a",
              borderRadius: "3px",
              color: "#4ade80",
              fontFamily: "monospace",
              boxShadow: "0 0 12px rgba(74,222,128,0.08)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#142e1a";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 20px rgba(74,222,128,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#0e2a14";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 12px rgba(74,222,128,0.08)";
            }}
          >
            BEGIN SCAN ›
          </button>

          {/* ── Skip link ──────────────────────────────────────────── */}
          <button
            onClick={onSkip}
            className="mt-3 text-[8px] tracking-[0.15em] uppercase transition-colors duration-150"
            style={{
              color: "#2d4a2d",
              fontFamily: "monospace",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#4a7a4a")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#2d4a2d")
            }
          >
            I've been here before — skip intro
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
