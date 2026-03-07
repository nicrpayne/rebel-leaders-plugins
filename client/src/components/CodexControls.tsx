import { cn } from "@/lib/utils";
import { useState } from "react";

interface CodexControlsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export default function CodexControls({
  activeCategory,
  onCategoryChange,
  className
}: CodexControlsProps) {
  // Visual state for sliders (randomized positions for aesthetic)
  const [sliderValues, setSliderValues] = useState([75, 40, 60, 25]);

  const categories = ["ALL", "CONFLICT", "VISION", "ALIGNMENT", "CULTURE"];

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      
      {/* --- FREQUENCY SLIDERS (Visual Only) --- */}
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-pixel text-amber-900/80 tracking-widest uppercase">
          SIGNAL FREQUENCY
        </label>
        <div className="flex justify-between gap-2 h-32 bg-[#050505] border border-[#222] p-3 rounded-sm relative overflow-hidden shadow-inner">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_9px,#111_10px)] bg-[length:100%_10px] pointer-events-none" />
          
          {sliderValues.map((val, i) => (
            <div key={i} className="relative h-full w-4 flex justify-center group">
              {/* Track */}
              <div className="absolute top-0 bottom-0 w-[2px] bg-[#1a1a1a] rounded-full" />
              
              {/* Fill */}
              <div 
                className="absolute bottom-0 w-[2px] bg-amber-900/40 rounded-full transition-all duration-300 group-hover:bg-amber-500/50"
                style={{ height: `${val}%` }}
              />

              {/* Thumb (Draggable-looking) */}
              <div 
                className="absolute w-3 h-6 bg-[#111] border border-[#333] rounded-[1px] shadow-[0_2px_4px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing hover:border-amber-500/50 hover:bg-[#1a1a1a] transition-all z-10 flex flex-col items-center justify-center gap-[2px]"
                style={{ bottom: `calc(${val}% - 12px)` }}
                onClick={() => {
                    const newVals = [...sliderValues];
                    newVals[i] = Math.random() * 80 + 10;
                    setSliderValues(newVals);
                }}
              >
                <div className="w-2 h-[1px] bg-[#222]" />
                <div className="w-2 h-[1px] bg-[#222]" />
                <div className="w-2 h-[1px] bg-amber-500/50" />
                <div className="w-2 h-[1px] bg-[#222]" />
                <div className="w-2 h-[1px] bg-[#222]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECTOR SWITCHES (Functional) --- */}
      <div className="flex flex-col gap-4">
        <label className="text-[10px] font-pixel text-amber-900/80 tracking-widest uppercase">
          ACTIVE SECTORS
        </label>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className="group flex items-center gap-3 w-full text-left hover:bg-amber-900/5 p-1 rounded transition-colors"
              >
                {/* Toggle Switch Graphic */}
                <div className="relative w-8 h-4 bg-[#080808] border border-[#333] rounded-full shadow-inner transition-colors group-hover:border-amber-900/30">
                  <div 
                    className={cn(
                      "absolute top-0.5 w-3 h-3 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-all duration-200",
                      isActive 
                        ? "right-0.5 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" 
                        : "left-0.5 bg-[#333]"
                    )} 
                  />
                </div>
                
                {/* Label */}
                <span className={cn(
                  "text-[10px] font-mono tracking-wider transition-colors",
                  isActive ? "text-amber-400" : "text-amber-900/60 group-hover:text-amber-700"
                )}>
                  {cat}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- DECRYPTION STATUS --- */}
      <div className="mt-auto pt-6 border-t border-[#222]">
        <div className="flex justify-between items-end mb-2">
            <span className="text-[9px] font-pixel text-amber-900/60">ENCRYPTION</span>
            <span className="text-[9px] font-pixel text-amber-500">NONE</span>
        </div>
        <div className="w-full h-1 bg-[#111] rounded-full overflow-hidden">
            <div className="h-full bg-amber-900/20 w-full" />
        </div>
        <div className="flex gap-1 mt-1">
            {[...Array(12)].map((_, i) => (
                <div key={i} className="flex-1 h-0.5 bg-amber-900/10" />
            ))}
        </div>
      </div>

    </div>
  );
}
