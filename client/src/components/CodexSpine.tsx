import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";

interface CodexSpineProps {
  entry: CodexEntry;
  isActive: boolean;
  onClick: () => void;
}

export default function CodexSpine({ entry, isActive, onClick }: CodexSpineProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group relative h-16 w-full cursor-pointer transition-all duration-200 ease-out",
        "hover:translate-x-4 hover:z-10", // Slide out effect
        isActive ? "z-20 translate-x-4" : ""
      )}
    >
      {/* Shadow for depth when stacked */}
      <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/50 blur-md z-0" />

      {/* Main Spine Container */}
      <div className={cn(
        "relative w-full h-full flex items-center justify-center overflow-hidden rounded-sm shadow-lg",
        "bg-[#111] border-y border-[#222] border-r border-[#333]", // Plastic casing feel
        isActive ? "ring-1 ring-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : ""
      )}>
        
        {/* Texture: Plastic Grain */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay pointer-events-none" />

        {/* Layer 1: The Spine Image (Cropped/Positioned) */}
        {/* We use the spine asset but stretch it to fill the 'rack unit' slot */}
        <img 
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine_transparent_95539dfa.png"
          alt="Cartridge Spine"
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />

        {/* Layer 2: The Label Area */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Label Background - slightly yellowed/aged paper texture */}
          <div className={cn(
            "w-[70%] h-[65%] bg-[#e6dcc3] rounded-sm shadow-[inset_0_0_5px_rgba(0,0,0,0.2)] transform -skew-x-1",
            "flex items-center justify-between px-4 overflow-hidden",
            "border border-[#d1c7b0]"
          )}>
            
            {/* ID (Handwritten style) */}
            <span className="font-handwriting text-[#2a1d10] text-sm md:text-base font-bold opacity-90 transform -rotate-1">
              {entry.id.split("_")[1] || entry.id}
            </span>

            {/* Title (Stamped style) */}
            <span className="font-serif text-[#1a120a] text-[10px] md:text-xs font-black uppercase tracking-widest text-right line-clamp-1 flex-1 ml-4 opacity-85">
              {entry.title}
            </span>

          </div>
        </div>

        {/* Active Light (LED) */}
        <div className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300",
          isActive ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,1)]" : "bg-[#332211] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"
        )} />

      </div>
    </div>
  );
}
