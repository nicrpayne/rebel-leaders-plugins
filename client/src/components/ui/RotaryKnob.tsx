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

export default function RotaryKnob({ value, min, max, step = 1, onChange, label, className }: RotaryKnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef<number>(0);
  const startValue = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
    startValue.current = value;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    startValue.current = value;
  };

  useEffect(() => {
    const handleMove = (clientY: number) => {
      if (!isDragging) return;
      const deltaY = startY.current - clientY;
      const range = max - min;
      const deltaValue = (deltaY / 200) * range; // Sensitivity
      let newValue = startValue.current + deltaValue;
      newValue = Math.max(min, Math.min(max, newValue));
      
      // Snap to step
      if (step) {
        newValue = Math.round(newValue / step) * step;
      }
      
      onChange(newValue);
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientY);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientY);

    const handleEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, min, max, step, onChange]);

  // Calculate rotation (-135deg to +135deg)
  const percentage = (value - min) / (max - min);
  const rotation = -135 + (percentage * 270);

  return (
    <div className={cn("flex flex-col items-center gap-4 select-none", className)}>
      <div 
        className="relative w-24 h-24 cursor-ns-resize group"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Shadow behind knob (Lift) */}
        <div className="absolute inset-2 rounded-full bg-black/80 blur-md transform translate-y-2" />

        {/* The Knob SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
            <radialGradient id="knobGradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
              <stop offset="0%" stopColor="#333" />
              <stop offset="100%" stopColor="#111" />
            </radialGradient>
            <filter id="innerShadow">
              <feOffset dx="0" dy="1" />
              <feGaussianBlur stdDeviation="1" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="black" floodOpacity="0.5" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>

          {/* Outer Ring (Knurled Texture Base) */}
          <circle cx="50" cy="50" r="48" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1" />
          
          {/* Inner Face (Matte Plastic) */}
          <circle cx="50" cy="50" r="40" fill="url(#knobGradient)" stroke="#333" strokeWidth="0.5" />

          {/* Rotating Group */}
          <g transform={`rotate(${rotation} 50 50)`}>
            {/* The Notch (Indented) */}
            <rect x="48" y="15" width="4" height="12" rx="1" fill="#000" />
            <rect x="49" y="16" width="2" height="10" rx="0.5" fill="#fff" fillOpacity="0.8" />
          </g>

          {/* Top-Left Highlight (Specular) */}
          <path d="M 20 20 Q 50 5 80 20" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.1" strokeLinecap="round" />
        </svg>

        {/* Tick Marks (Static Ring) */}
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {[...Array(11)].map((_, i) => {
              const rot = -135 + (i * 27);
              return (
                <line
                  key={i}
                  x1="50" y1="-10" x2="50" y2="-2"
                  stroke="#444"
                  strokeWidth="2"
                  transform={`rotate(${rot} 50 50)`}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Label */}
      {label && (
        <div className="text-[10px] font-pixel text-[#666] tracking-widest uppercase drop-shadow-sm mt-2">
          {label}
        </div>
      )}
    </div>
  );
}
