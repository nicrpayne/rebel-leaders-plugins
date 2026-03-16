import { useEffect, useRef, useState } from "react";

interface SectionIndicatorProps {
  /** Total number of sections */
  total: number;
  /** Index of the currently active section (0-based) */
  activeIndex: number;
  className?: string;
}

/**
 * Indicator dots on the left edge of the lantern panel frame.
 *
 * Behavior:
 *  - Dots at or below activeIndex are "lit" (amber glow, already passed)
 *  - The active dot pulses with a warm breathing glow
 *  - Unlit dots have a subtle idle breathing animation (dim, alive)
 *  - When activeIndex advances, the newly lit dot flares briefly
 */
export default function SectionIndicator({
  total,
  activeIndex,
  className = "",
}: SectionIndicatorProps) {
  const prevIndex = useRef(activeIndex);
  const [flareIndex, setFlareIndex] = useState(-1);

  // Detect section change → trigger flare on the newly active dot
  useEffect(() => {
    if (activeIndex !== prevIndex.current) {
      setFlareIndex(activeIndex);
      const t = setTimeout(() => setFlareIndex(-1), 600);
      prevIndex.current = activeIndex;
      return () => clearTimeout(t);
    }
  }, [activeIndex]);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: total }).map((_, i) => {
        const isLit = i <= activeIndex;
        const isActive = i === activeIndex;
        const isFlaring = i === flareIndex;

        return (
          <div
            key={i}
            className="relative"
            style={{ width: "8px", height: "8px" }}
          >
            {/* Outer glow ring (visible when lit) */}
            {isLit && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "transparent",
                  boxShadow: isFlaring
                    ? "0 0 12px 3px rgba(245,158,11,0.9), 0 0 20px 6px rgba(245,158,11,0.4)"
                    : isActive
                    ? "0 0 8px 2px rgba(245,158,11,0.6), 0 0 14px 4px rgba(245,158,11,0.25)"
                    : "0 0 4px 1px rgba(245,158,11,0.3)",
                  animation: isFlaring
                    ? "indicator-flare 0.6s ease-out"
                    : isActive
                    ? "indicator-pulse 2.2s ease-in-out infinite"
                    : undefined,
                  transition: "box-shadow 0.5s ease",
                }}
              />
            )}

            {/* Core dot */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-500"
              style={{
                background: isLit
                  ? isActive
                    ? "radial-gradient(circle at 40% 35%, #ffdd66 0%, #f59e0b 45%, #d97706 100%)"
                    : "radial-gradient(circle at 40% 35%, #f0c050 0%, #d97706 50%, #b45309 100%)"
                  : "radial-gradient(circle at 40% 35%, #3a2a15 0%, #2a1f10 60%, #1a1208 100%)",
                boxShadow: isLit
                  ? "inset 0 -1px 2px rgba(0,0,0,0.3)"
                  : "inset 0 -1px 2px rgba(0,0,0,0.5)",
                animation: !isLit ? "indicator-breathe 3.5s ease-in-out infinite" : undefined,
                animationDelay: !isLit ? `${i * 400}ms` : undefined,
              }}
            />
          </div>
        );
      })}

      {/* Keyframe animations injected via style tag */}
      <style>{`
        @keyframes indicator-pulse {
          0%, 100% {
            box-shadow: 0 0 8px 2px rgba(245,158,11,0.6), 0 0 14px 4px rgba(245,158,11,0.25);
          }
          50% {
            box-shadow: 0 0 12px 3px rgba(245,158,11,0.8), 0 0 20px 6px rgba(245,158,11,0.4);
          }
        }

        @keyframes indicator-flare {
          0% {
            box-shadow: 0 0 4px 1px rgba(245,158,11,0.3);
            transform: scale(1);
          }
          30% {
            box-shadow: 0 0 16px 5px rgba(245,158,11,1), 0 0 28px 8px rgba(245,158,11,0.5);
            transform: scale(1.3);
          }
          100% {
            box-shadow: 0 0 8px 2px rgba(245,158,11,0.6), 0 0 14px 4px rgba(245,158,11,0.25);
            transform: scale(1);
          }
        }

        @keyframes indicator-breathe {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.65;
          }
        }
      `}</style>
    </div>
  );
}
