import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RotaryKnobProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
}

export default function RotaryKnob({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  className
}: RotaryKnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const startValueRef = useRef<number>(0);

  // Calculate rotation based on value (map min-max to -135deg to +135deg)
  const percentage = (value - min) / (max - min);
  const rotation = -135 + (percentage * 270);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startYRef.current = e.clientY;
    startValueRef.current = value;
    document.body.style.cursor = "ns-resize";
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startYRef.current = e.touches[0].clientY;
    startValueRef.current = value;
    document.body.style.overflow = "hidden"; // Prevent scroll while dragging
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaY = startYRef.current - e.clientY;
      const sensitivity = 200; // Pixels to full range
      const deltaValue = (deltaY / sensitivity) * (max - min);
      
      let newValue = startValueRef.current + deltaValue;
      newValue = Math.max(min, Math.min(max, newValue));
      
      // Snap to step
      if (step) {
        newValue = Math.round(newValue / step) * step;
      }
      
      onChange(newValue);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const deltaY = startYRef.current - e.touches[0].clientY;
      const sensitivity = 200;
      const deltaValue = (deltaY / sensitivity) * (max - min);
      
      let newValue = startValueRef.current + deltaValue;
      newValue = Math.max(min, Math.min(max, newValue));
      
      if (step) {
        newValue = Math.round(newValue / step) * step;
      }
      
      onChange(newValue);
    };

    const handleEnd = () => {
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.overflow = "";
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, min, max, step, onChange]);

  return (
    <div className={cn("flex flex-col items-center gap-4 select-none", className)}>
      <div 
        ref={knobRef}
        className="relative w-24 h-24 cursor-ns-resize group"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Knob Body (SVG) */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
          {/* Base Shadow */}
          <circle cx="50" cy="50" r="48" fill="#1a1a1a" />
          
          {/* Metal Texture Gradient */}
          <defs>
            <linearGradient id="knobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#333" />
              <stop offset="50%" stopColor="#111" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main Knob */}
          <circle cx="50" cy="50" r="45" fill="url(#knobGradient)" stroke="#444" strokeWidth="1" />
          
          {/* Indicator Line */}
          <g transform={`rotate(${rotation} 50 50)`}>
            <rect x="48" y="10" width="4" height="20" rx="2" fill="#c5a059" filter="url(#glow)" />
          </g>
          
          {/* Tick Marks */}
          {[...Array(11)].map((_, i) => {
            const tickRot = -135 + (i * 27);
            return (
              <line
                key={i}
                x1="50" y1="2" x2="50" y2="8"
                stroke={i / 10 <= percentage ? "#c5a059" : "#333"}
                strokeWidth="2"
                transform={`rotate(${tickRot} 50 50)`}
                className="transition-colors duration-200"
              />
            );
          })}
        </svg>
      </div>
      
      {label && (
        <div className="text-xs font-pixel text-gold/70 tracking-widest uppercase">
          {label}
        </div>
      )}
    </div>
  );
}
