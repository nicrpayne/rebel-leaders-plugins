import { useState, useEffect } from "react";

interface TypewriterHeadingProps {
  text: string;
  /** Delay before typing starts (ms) */
  delay?: number;
  /** Speed per character (ms) */
  speed?: number;
  /** Whether to show the blinking cursor after typing completes */
  showCursorAfter?: boolean;
  className?: string;
}

/**
 * Pager-style typewriter heading with blinking cursor.
 * Uses the LCD/pixel font to match the Codex hardware aesthetic.
 * The heading types on character by character, then the cursor blinks.
 */
export default function TypewriterHeading({
  text,
  delay = 200,
  speed = 60,
  showCursorAfter = true,
  className = "",
}: TypewriterHeadingProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Type-on effect
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);

    const startTimeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const shouldShowCursor = isTyping || showCursorAfter;

  return (
    <div
      className={`font-[var(--font-lcd)] uppercase tracking-[0.15em] select-none ${className}`}
      style={{
        fontFamily: "var(--font-lcd)",
        color: "#8a6d3b",
        textShadow: "0 0 4px rgba(138,109,59,0.5), 0 0 1px rgba(138,109,59,0.7)",
      }}
    >
      {displayedText}
      {shouldShowCursor && (
        <span
          style={{
            opacity: showCursor ? 0.9 : 0,
            transition: "opacity 0.08s",
            marginLeft: "2px",
            color: "#8a6d3b",
            textShadow: "0 0 4px rgba(138,109,59,0.5)"
          }}
        >
          _
        </span>
      )}
    </div>
  );
}
