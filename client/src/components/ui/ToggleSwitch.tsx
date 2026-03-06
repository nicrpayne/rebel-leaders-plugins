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
      <div className="relative w-16 h-32 bg-[#1a1a1a] rounded-lg border-2 border-[#333] shadow-inner p-2 flex flex-col justify-between items-center">
        {/* Metal Plate Texture */}
        <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-10 pointer-events-none" />
        
        {/* Screw Heads */}
        <div className="w-2 h-2 rounded-full bg-[#444] shadow-sm border border-[#222]" />
        <div className="w-2 h-2 rounded-full bg-[#444] shadow-sm border border-[#222]" />

        {/* Switch Body */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-20 bg-[#111] rounded-full border border-[#333] cursor-pointer"
          onClick={() => onChange(value === "A" ? "B" : "A")}
        >
          {/* The Toggle Lever */}
          <div 
            className={cn(
              "w-full h-10 bg-gradient-to-b from-[#666] to-[#333] rounded-full shadow-lg border border-[#555] transition-all duration-200 ease-out transform",
              value === "A" ? "-translate-y-1" : "translate-y-9",
              !value && "translate-y-4 opacity-50" // Neutral state
            )}
          >
            {/* Highlight */}
            <div className="w-4 h-2 bg-white/20 rounded-full mx-auto mt-1" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex flex-col gap-8 text-xs font-pixel text-gold/70 tracking-widest uppercase text-center">
        <span className={cn(value === "A" && "text-gold drop-shadow-glow")}>{labelA || "A"}</span>
        <span className={cn(value === "B" && "text-gold drop-shadow-glow")}>{labelB || "B"}</span>
      </div>
    </div>
  );
}
