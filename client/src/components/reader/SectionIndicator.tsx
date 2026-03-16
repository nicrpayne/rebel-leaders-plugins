interface SectionIndicatorProps {
  /** Total number of sections */
  total: number;
  /** Index of the currently active section (0-based) */
  activeIndex: number;
  className?: string;
}

/**
 * Small indicator dots that sit on the left edge of the panel frame.
 * The active section's dot glows amber; others are dim.
 */
export default function SectionIndicator({
  total,
  activeIndex,
  className = "",
}: SectionIndicatorProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="transition-all duration-500"
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background:
              i === activeIndex
                ? "radial-gradient(circle at 40% 35%, #ffcc44 0%, #f59e0b 40%, #b45309 100%)"
                : "radial-gradient(circle at 40% 35%, #4a3a20 0%, #2a1f10 60%, #1a1208 100%)",
            boxShadow:
              i === activeIndex
                ? "0 0 6px rgba(245,158,11,0.6), 0 0 2px rgba(245,158,11,0.9)"
                : "none",
          }}
        />
      ))}
    </div>
  );
}
