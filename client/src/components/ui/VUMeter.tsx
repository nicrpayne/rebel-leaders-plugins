import { cn } from "@/lib/utils";

interface VUMeterProps {
  value: number; // 0 to 100
  label?: string;
  className?: string;
}

export default function VUMeter({ value, label, className }: VUMeterProps) {
  // Map 0-100 to -50deg to +50deg (Clamped Range)
  const rotation = -50 + (value / 100) * 100;

  return (
    <div className={cn("relative w-48 h-32 bg-[#111] rounded-lg border-4 border-[#222] shadow-[0_10px_20px_rgba(0,0,0,0.8)] overflow-hidden", className)}>
      
      {/* 1. CHASSIS / BACKPLATE (Dark Metal) */}
      <div className="absolute inset-0 bg-[#1a1a1a] shadow-[inset_0_0_20px_rgba(0,0,0,1)]" />
      
      {/* Inner Bevel (Depth Cue) */}
      <div className="absolute inset-0 border-t border-black/50 border-b border-white/10 pointer-events-none" />

      {/* 2. DIAL FACE (Markings & Branding) */}
      <div className="absolute inset-0 flex items-end justify-center pb-4">
        <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
          {/* Tick Marks (Radial Lines, NOT Needles) */}
          {[...Array(11)].map((_, i) => {
            const rot = -50 + (i * 10);
            const isRed = i > 7;
            return (
              <line
                key={i}
                x1="100" y1="100" x2="100" y2="85"
                stroke={isRed ? "#ef4444" : "#c5a059"}
                strokeWidth={i % 5 === 0 ? 2 : 1}
                transform={`rotate(${rot} 100 100)`}
                className="opacity-80"
              />
            );
          })}
          
          {/* Arc Line */}
          <path d="M 25 100 A 75 75 0 0 1 175 100" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="2 2" />
        </svg>

        {/* Embossed Brand Plate (Bottom Center) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#151515] px-3 py-1 rounded-sm border border-[#222] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.05)]">
          <span className="text-[8px] font-pixel text-[#444] tracking-widest uppercase drop-shadow-[0_1px_0_rgba(255,255,255,0.05)]">
            REBEL LEADERS
          </span>
        </div>

        {/* Serial Number (Corner Detail) */}
        <div className="absolute bottom-2 right-2 text-[6px] font-pixel text-[#333] tracking-widest">
          RL-OS v1.0
        </div>
        
        {/* Label (Moved out of the way) */}
        {label && (
          <div className="absolute bottom-2 left-2 text-[6px] font-pixel text-[#555] tracking-widest uppercase">
            {label}
          </div>
        )}
      </div>

      {/* 3. NEEDLE (Single, Red, Shadowed) */}
      <div 
        className="absolute bottom-[-10%] left-1/2 w-0.5 h-[85%] bg-[#ef4444] origin-bottom transition-transform duration-500 ease-out z-10"
        style={{ 
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.5))" // Shadow lifts it off the dial
        }}
      >
        {/* Needle Hub (Pivot Point) */}
        <div className="w-4 h-4 bg-[#111] rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 border-2 border-[#333] shadow-lg" />
      </div>

      {/* 4. GLASS OVERLAY (Reflection & Vignette) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Diagonal Reflection */}
        <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/5 to-transparent transform -skew-x-12 origin-top-left" />
        
        {/* Vignette (Dark Corners) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
        
        {/* Inner Shadow (Bevel Depth) */}
        <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]" />
      </div>

    </div>
  );
}
