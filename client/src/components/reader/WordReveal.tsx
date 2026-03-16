import { useState, useEffect, useRef, useMemo } from "react";

interface WordRevealProps {
  /** The full text string to reveal word-by-word */
  text: string;
  /** Delay before the reveal starts (ms) */
  delay?: number;
  /** Base time between each word appearing (ms) */
  wordInterval?: number;
  /** Random jitter added to wordInterval (ms) — creates organic pacing */
  jitter?: number;
  /** Whether the reveal should be active (trigger) */
  isActive?: boolean;
  /** Additional className for the container */
  className?: string;
  /** Inline style overrides */
  style?: React.CSSProperties;
}

/**
 * Reveals text word-by-word like a pager receiving a transmission.
 * Each new word arrives with a brief amber glow pulse that fades.
 * Supports jitter so multiple instances run at slightly different paces —
 * all lines populate left-to-right together but not quite in sync.
 */
export default function WordReveal({
  text,
  delay = 300,
  wordInterval = 90,
  jitter = 25,
  isActive = true,
  className = "",
  style = {},
}: WordRevealProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [glowIndex, setGlowIndex] = useState(-1);
  const hasStarted = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  useEffect(() => {
    if (!isActive || hasStarted.current) return;
    hasStarted.current = true;

    // Pre-compute jittered timing for each word
    let cumulative = delay;
    const schedule: number[] = [];
    for (let i = 0; i < words.length; i++) {
      const jitterAmount = Math.round((Math.random() - 0.5) * 2 * jitter);
      cumulative += wordInterval + jitterAmount;
      schedule.push(cumulative);
    }

    // Schedule each word reveal independently
    schedule.forEach((time, i) => {
      const t = setTimeout(() => {
        setVisibleCount(i + 1);
        setGlowIndex(i);

        // Clear glow after pulse
        const g = setTimeout(() => {
          setGlowIndex((prev) => (prev === i ? -1 : prev));
        }, 200);
        timeoutsRef.current.push(g);
      }, time);
      timeoutsRef.current.push(t);
    });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [isActive, words.length, delay, wordInterval, jitter]);

  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            opacity: i < visibleCount ? 1 : 0,
            transition: "opacity 0.18s ease-out",
            textShadow:
              i === glowIndex
                ? "0 0 8px rgba(197,160,89,0.6), 0 0 2px rgba(197,160,89,0.3)"
                : "none",
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
