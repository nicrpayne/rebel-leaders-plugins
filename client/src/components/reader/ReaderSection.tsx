import { useRef, useEffect, useState } from "react";
import TypewriterHeading from "./TypewriterHeading";

interface ReaderSectionProps {
  /** Section heading text (displayed in pager/LCD style) */
  heading: string;
  /** Whether this section is currently in view (triggers typing animation) */
  isInView: boolean;
  /** Section index for staggered animation timing */
  index: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * A single content section within the ReaderPanel.
 * Heading uses the pager-style typewriter effect.
 * Body content uses warm serif typography.
 */
export default function ReaderSection({
  heading,
  isInView,
  index,
  children,
  className = "",
}: ReaderSectionProps) {
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  // Once seen, stay revealed (no re-animation on scroll back)
  useEffect(() => {
    if (isInView && !hasBeenSeen) {
      setHasBeenSeen(true);
    }
  }, [isInView, hasBeenSeen]);

  return (
    <div
      className={`transition-opacity duration-700 ease-out ${
        hasBeenSeen ? "opacity-100" : "opacity-0 translate-y-4"
      } ${className}`}
      style={{
        transitionDelay: hasBeenSeen ? "0ms" : `${index * 150}ms`,
      }}
    >
      {/* Section Heading — Pager/LCD style */}
      {hasBeenSeen && (
        <TypewriterHeading
          text={heading}
          delay={index * 200 + 100}
          speed={45}
          showCursorAfter={false}
          className="text-sm md:text-base mb-4"
        />
      )}

      {/* Section Body — Warm serif typography */}
      <div
        className="font-serif text-base md:text-lg leading-relaxed"
        style={{
          color: "rgba(60, 35, 15, 0.85)",
          transition: "opacity 0.5s ease",
          transitionDelay: `${index * 200 + 400}ms`,
          opacity: hasBeenSeen ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
