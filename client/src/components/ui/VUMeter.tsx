import { cn } from "@/lib/utils";

interface VUMeterProps {
  value: number; // 0 to 100
  label?: string;
  className?: string;
}

export default function VUMeter({ value, label, className }: VUMeterProps) {
  // Map 0-100 to -45deg to +45deg
  const rotation = -45 + (value / 100) * 90;

  return (
    <div className={cn("relative w-32 h-20 bg-[#1a1a1a] rounded-t-lg border-2 border-[#333] overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]", className)}>
      {/* Glass Reflection */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-20" />
      
      {/* Background Scale */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full flex items-end justify-center pb-2">
        <svg viewBox="0 0 100 60" className="w-full h-full">
          {/* Arc */}
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#333" strokeWidth="2" />
          
          {/* Ticks */}
          {[...Array(11)].map((_, i) => {
            const rot = -45 + (i * 9);
            const isRed = i > 7;
            return (
              <line
                key={i}
                x1="50" y1="50" x2="50" y2="15"
                stroke={isRed ? "#ef4444" : "#c5a059"}
                strokeWidth={i % 5 === 0 ? 2 : 1}
                transform={`rotate(${rot} 50 50)`}
                className="opacity-80"
              />
            );
          })}
        </svg>
      </div>

      {/* Needle (Animated) */}
      <div 
        className="absolute bottom-2 left-1/2 w-0.5 h-16 bg-red-500 origin-bottom transition-transform duration-300 ease-out z-10 shadow-[0_0_5px_rgba(239,68,68,0.5)]"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      >
        <div className="w-2 h-2 bg-black rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 border border-[#333]" />
      </div>

      {/* Label */}
      {label && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] font-pixel text-gold/50 tracking-widest uppercase z-20 drop-shadow-sm">
          {label}
        </div>
      )}
    </div>
  );
}
