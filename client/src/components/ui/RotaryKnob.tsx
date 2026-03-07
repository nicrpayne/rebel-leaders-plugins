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
  const knobRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    startY.current = e.clientY;
    startValue.current = value;
    
    // Capture pointer for consistent tracking even if mouse leaves element
    (e.target as Element).setPointerCapture(e.pointerId);
    
    // Add global dragging class to body to prevent text selection/cursor changes
    document.body.classList.add('knob-dragging');
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaY = startY.current - e.clientY;
    const range = max - min;
    // Sensitivity: 200px drag = full range
    const deltaValue = (deltaY / 200) * range; 
    
    let newValue = startValue.current + deltaValue;
    newValue = Math.max(min, Math.min(max, newValue));
    
    // Snap to step
    if (step) {
      newValue = Math.round(newValue / step) * step;
    }
    
    onChange(newValue);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
    document.body.classList.remove('knob-dragging');
  };

  // Calculate rotation (-135deg to +135deg)
  const percentage = (value - min) / (max - min);
  const rotation = -135 + (percentage * 270);

  return (
    <div className={cn("flex flex-col items-center gap-4 select-none touch-none", className)}>
      <div 
        ref={knobRef}
        className="relative w-24 h-24 cursor-ns-resize group touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'none' }}
      >
        {/* Shadow behind knob (Lift) - Unified Light Source (Top-Left) */}
        <div className="absolute inset-2 rounded-full bg-black/60 blur-md transform translate-y-2 translate-x-1" />

        {/* The Knob SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible pointer-events-none">
          <defs>
            {/* Main Body Gradient - Top-Left Light Source */}
            <linearGradient id="knobBodyGradient" x1="20%" y1="20%" x2="80%" y2="80%">
              <stop offset="0%" stopColor="#2a2a2a" />
              <stop offset="50%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#050505" />
            </linearGradient>
            
            {/* Top Face Gradient - Subtle radial for matte finish */}
            <radialGradient id="knobFaceGradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
              <stop offset="0%" stopColor="#333" />
              <stop offset="100%" stopColor="#111" />
            </radialGradient>
            
            {/* Knurling Pattern */}
            <pattern id="knurling" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
               <rect width="2" height="4" fill="#151515" />
               <rect x="2" width="2" height="4" fill="#1a1a1a" />
            </pattern>
          </defs>

          {/* Outer Ring (Knurled Texture Base) */}
          <circle cx="50" cy="50" r="48" fill="url(#knurling)" stroke="#0a0a0a" strokeWidth="1" />
          <circle cx="50" cy="50" r="48" fill="black" fillOpacity="0.3" /> {/* Darken knurling */}
          
          {/* Inner Body (Side) */}
          <circle cx="50" cy="50" r="44" fill="url(#knobBodyGradient)" stroke="#000" strokeWidth="0.5" />
          
          {/* Top Face (Matte Plastic) */}
          <circle cx="50" cy="50" r="38" fill="url(#knobFaceGradient)" stroke="#333" strokeWidth="0.5" />
          
          {/* Inner Shadow for Top Face (Depth) */}
          <circle cx="50" cy="50" r="38" fill="none" stroke="black" strokeWidth="2" strokeOpacity="0.3" />

          {/* Rotating Group */}
          <g transform={`rotate(${rotation} 50 50)`}>
            {/* The Indicator Line (Indented) */}
            <rect x="48.5" y="18" width="3" height="14" rx="1" fill="#000" fillOpacity="0.8" />
            <rect x="49.5" y="19" width="1" height="12" rx="0.5" fill="#fff" fillOpacity="0.9" />
          </g>

          {/* Top-Left Highlight (Specular Reflection) - Consistent Light Source */}
          <path d="M 25 25 Q 50 10 75 25" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.15" strokeLinecap="round" />
          
          {/* Bottom-Right Rim Light (Bounce) */}
          <path d="M 30 75 Q 50 85 70 75" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.05" strokeLinecap="round" />
        </svg>

        {/* Tick Marks (Static Ring) - Outside the knob */}
        <div className="absolute -inset-3 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {[...Array(11)].map((_, i) => {
              const rot = -135 + (i * 27);
              const isActive = rotation >= rot;
              return (
                <g key={i} transform={`rotate(${rot} 50 50)`}>
                   <line
                    x1="50" y1="2" x2="50" y2="8"
                    stroke={isActive ? "#666" : "#333"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Label */}
      {label && (
        <div className="text-[10px] font-pixel text-[#555] tracking-widest uppercase drop-shadow-sm mt-1 select-none">
          {label}
        </div>
      )}
    </div>
  );
}
