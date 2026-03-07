import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

interface VUMeterProps {
  value: number; // 0 to 100
  label?: string;
  className?: string;
}

export default function VUMeter({ value, label, className }: VUMeterProps) {
  // Realistic Needle Physics
  const [needleRotation, setNeedleRotation] = useState(-45);
  const requestRef = useRef<number>(0);
  const rotationRef = useRef(-45);
  const velocityRef = useRef(0);
  
  useEffect(() => {
    // Map 0-100 to -45deg to +45deg (Standard VU arc)
    const targetRotation = -45 + (value / 100) * 90;
    
    // Physics constants
    const tension = 0.08; // Spring stiffness (lower = looser)
    const damping = 0.85; // Friction (higher = less bounce)
    
    const animate = () => {
      const diff = targetRotation - rotationRef.current;
      
      // Spring physics
      velocityRef.current += diff * tension;
      velocityRef.current *= damping;
      rotationRef.current += velocityRef.current;
      
      // Clamp rotation to physical limits (-50 to +50)
      rotationRef.current = Math.max(-50, Math.min(50, rotationRef.current));
      
      setNeedleRotation(rotationRef.current);
      
      // Continue animation if there's still significant movement or distance
      if (Math.abs(diff) > 0.1 || Math.abs(velocityRef.current) > 0.1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [value]);

  return (
    <div className={cn("relative w-48 h-32 bg-[#181818] rounded-sm border border-[#222] shadow-[0_4px_10px_rgba(0,0,0,0.8)] overflow-hidden select-none", className)}>
      
      {/* 1. CHASSIS / BACKPLATE (Dark Metal) */}
      <div className="absolute inset-0 bg-[#151515]" />
      
      {/* Inner Shadow (Depth) */}
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,1)] z-10 pointer-events-none" />

      {/* 2. DIAL FACE (Markings) */}
      <div className="absolute inset-0 z-0 flex items-end justify-center pb-2">
        <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
          {/* Arc Background */}
          <path 
            d="M 30 100 A 70 70 0 0 1 170 100" 
            fill="none" 
            stroke="#222" 
            strokeWidth="1" 
            strokeLinecap="round"
            strokeDasharray="2 2"
          />
          
          {/* Tick Marks */}
          {[...Array(11)].map((_, i) => {
            const rot = -45 + (i * 9); // 90 degree total range / 10 intervals
            const isRed = i >= 7; // Top 30% is red zone
            const isMajor = i % 5 === 0; // 0, 5, 10 are major ticks
            
            // Calculate tick positions based on rotation
            // Center is 100, 110 (slightly below bottom edge for pivot)
            const angleRad = (rot - 90) * (Math.PI / 180);
            const innerR = 65;
            const outerR = isMajor ? 85 : 75;
            
            const x1 = 100 + innerR * Math.cos(angleRad);
            const y1 = 110 + innerR * Math.sin(angleRad);
            const x2 = 100 + outerR * Math.cos(angleRad);
            const y2 = 110 + outerR * Math.sin(angleRad);
            
            // Text Position
            const textR = 95;
            const textX = 100 + textR * Math.cos(angleRad);
            const textY = 110 + textR * Math.sin(angleRad);

            return (
              <g key={i}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isRed ? "#ef4444" : "#e5e5e5"}
                  strokeWidth={isMajor ? 2 : 1}
                  className="opacity-80"
                />
                {/* Numbers for Major Ticks */}
                {isMajor && (
                  <text 
                    x={textX} 
                    y={textY} 
                    fill={isRed ? "#ef4444" : "#888"}
                    fontSize="8"
                    fontFamily="monospace"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontWeight="bold"
                  >
                    {i === 0 ? "-20" : i === 5 ? "0" : "+3"}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* VU Label */}
          <text x="100" y="85" fill="#444" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">VU</text>
        </svg>
      </div>

      {/* 3. NEEDLE (Single, Red, Shadowed) */}
      <div 
        className="absolute bottom-[-10px] left-1/2 w-[2px] h-[90px] bg-[#ef4444] origin-bottom z-20 pointer-events-none"
        style={{ 
          transform: `translateX(-50%) rotate(${needleRotation}deg)`,
          filter: "drop-shadow(2px 2px 1px rgba(0,0,0,0.4))", // Shadow lifts it off the dial
          transition: "transform 0.016s linear" // Smooth out the JS animation slightly
        }}
      />
      
      {/* Pivot Cap (Metal Circle) */}
      <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#333] to-[#000] border border-[#111] shadow-lg z-30 flex items-center justify-center pointer-events-none">
         <div className="w-2 h-2 rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
      </div>

      {/* 4. GLASS OVERLAY (Reflection & Vignette) */}
      <div className="absolute inset-0 pointer-events-none z-40 rounded-sm overflow-hidden mix-blend-screen opacity-30">
        {/* Diagonal Reflection (Sharp) */}
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-b from-white/10 via-transparent to-transparent transform -rotate-45 pointer-events-none" />
        
        {/* Top Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30" />
      </div>
      
      {/* Scratches/Dust (Subtle Texture) */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none z-50" />

    </div>
  );
}
