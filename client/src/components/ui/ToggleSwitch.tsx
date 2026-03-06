import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  value: "A" | "B" | null;
  onChange: (value: "A" | "B") => void;
  labelA?: string;
  labelB?: string;
  className?: string;
}

export default function ToggleSwitch({ value, onChange, labelA, labelB, className }: ToggleSwitchProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative w-16 h-32 bg-[#1a1a1a] rounded-lg border-2 border-[#333] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] p-2 flex flex-col justify-between items-center">
        {/* Metal Plate Texture */}
        <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-10 pointer-events-none mix-blend-overlay" />
        
        {/* Screw Heads */}
        <div className="w-2 h-2 rounded-full bg-[#222] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_1px_1px_rgba(0,0,0,0.8)] border border-[#111] flex items-center justify-center">
          <div className="w-1 h-[1px] bg-black/50 rotate-45" />
        </div>
        <div className="w-2 h-2 rounded-full bg-[#222] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_1px_1px_rgba(0,0,0,0.8)] border border-[#111] flex items-center justify-center">
          <div className="w-1 h-[1px] bg-black/50 rotate-45" />
        </div>

        {/* Switch Body */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-20 bg-[#0a0a0a] rounded-full border border-[#222] cursor-pointer shadow-inner"
          onClick={() => onChange(value === "A" ? "B" : "A")}
        >
          {/* The Toggle Lever */}
          <div 
            className={cn(
              "w-full h-10 bg-gradient-to-b from-[#444] to-[#222] rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] border border-[#333] transition-all duration-200 ease-out transform",
              value === "A" ? "-translate-y-1" : "translate-y-9",
              !value && "translate-y-4 opacity-50" // Neutral state
            )}
          >
            {/* Highlight */}
            <div className="w-4 h-2 bg-white/10 rounded-full mx-auto mt-1 blur-[1px]" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex flex-col gap-8 text-[10px] font-pixel text-[#666] tracking-widest uppercase text-center">
        <span className={cn("transition-all duration-300", value === "A" && "text-gold drop-shadow-[0_0_5px_rgba(197,160,89,0.5)]")}>{labelA || "A"}</span>
        <span className={cn("transition-all duration-300", value === "B" && "text-gold drop-shadow-[0_0_5px_rgba(197,160,89,0.5)]")}>{labelB || "B"}</span>
      </div>
    </div>
  );
}
