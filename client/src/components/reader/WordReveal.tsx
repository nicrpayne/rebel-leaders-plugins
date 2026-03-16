import { useState, useEffect, useRef } from "react";

interface WordRevealProps {
  /** The full text string to reveal word-by-word */
  text: string;
  /** Delay before the reveal starts (ms) */
  delay?: number;
  /** Time between each word appearing (ms) */
  wordInterval?: number;
  /** Whether the reveal should be active (trigger) */
  isActive?: boolean;
  /** Additional className for the container */
  className?: string;
  /** Inline style overrides */
  style?: React.CSSProperties;
}

/**
 * Reveals text word-by-word like a pager receiving a transmission.
 * Each new word arrives with a brief amber glow pulse that fades,
 * giving the feeling of data being received rather than static text.
 */
export default function WordReveal({
  text,
  delay = 300,
  wordInterval = 55,
  isActive = true,
  className = "",
  style = {},
}: WordRevealProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [glowIndex, setGlowIndex] = useState(-1);
  const hasStarted = useRef(false);

  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    if (!isActive || hasStarted.current) return;
    hasStarted.current = true;

    const startTimeout = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        if (count <= words.length) {
          setVisibleCount(count);
          setGlowIndex(count - 1);

          // Clear glow after a short pulse
          setTimeout(() => {
            setGlowIndex((prev) => (prev === count - 1 ? -1 : prev));
          }, 180);
        } else {
          clearInterval(interval);
        }
      }, wordInterval);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [isActive, words.length, delay, wordInterval]);

  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            opacity: i < visibleCount ? 1 : 0,
            transition: "opacity 0.15s ease-out",
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
