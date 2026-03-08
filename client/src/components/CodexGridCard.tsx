import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";

interface CodexGridCardProps {
  entry: CodexEntry;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export default function CodexGridCard({ entry, isActive, onClick, className }: CodexGridCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer transition-all duration-300 ease-out transform hover:scale-105 hover:z-20",
        "w-64 h-40", // Fixed aspect ratio for the cassette
        isActive ? "z-30 scale-105 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]" : "hover:drop-shadow-xl",
        className
      )}
    >
      {/* Shadow for depth when sitting on shelf */}
      <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/60 blur-md rounded-full transform scale-x-90" />

      {/* Main Cartridge Container */}
      <div className="relative w-full h-full">
        
        {/* Layer 1: Black Cartridge Body (Base) */}
        <img 
           src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_body_5224ef43.png"
           alt="Cartridge Body"
           className="absolute inset-0 w-full h-full object-contain drop-shadow-lg"
        />

        {/* Layer 2: Yellow Label Strip (Overlay) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
           {/* The label image itself */}
           <img 
             src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_label_strip_47bfb435.png"
             alt="Label Strip"
             className="w-[88%] h-auto object-contain transform translate-y-[2px]" 
           />
           
           {/* Layer 3: Text Content Printed on Label */}
           <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pt-1">
              
              {/* Title Area - Centered on the label strip */}
              <div className="w-[65%] text-center transform -rotate-1 translate-y-[1px]">
                <h4 className={cn(
                  "font-serif text-[10px] md:text-[11px] leading-tight text-[#1a1a1a] font-black tracking-wide uppercase line-clamp-2 opacity-90 mix-blend-multiply",
                  "drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]" // Letterpress effect
                )}>
                  {entry.title}
                </h4>
              </div>

              {/* Metadata - Below title */}
              <div className="absolute bottom-[28%] w-[60%] flex justify-between items-center px-1 opacity-75 mix-blend-multiply transform -rotate-1">
                  <span className="font-handwriting text-[9px] text-[#2a2a2a] font-bold">
                    #{entry.id.split("_")[1]?.substring(0, 4) || "001"}
                  </span>
                  <span className="font-pixel text-[6px] text-[#2a2a2a] tracking-widest border border-[#2a2a2a] px-0.5 rounded-[1px]">
                    {entry.time_commitment}
                  </span>
              </div>
           </div>
        </div>
        
        {/* Active Glow Overlay */}
        {isActive && (
          <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay rounded-lg pointer-events-none animate-pulse" />
        )}

      </div>
    </div>
  );
}
