import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";

interface CodexGridCardProps {
  entry: CodexEntry;
  isActive: boolean;
  onClick: () => void;
}

export default function CodexGridCard({ entry, isActive, onClick }: CodexGridCardProps) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "group relative border border-[#222] bg-[#0a0a0a] hover:bg-[#111] transition-all cursor-pointer overflow-hidden h-32 flex flex-col justify-center items-center hover:border-amber-900/40",
        isActive ? "border-amber-500/50 ring-1 ring-amber-500/30" : ""
      )}
    >
      {/* Layer 1: Black Cartridge Body (Base) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
         <img 
           src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_body-ZG8BxnnKoGhVsGqXr3P6PG.png"
           alt="Cartridge Body"
           className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity scale-110"
           style={{ objectPosition: 'center' }}
         />
      </div>

      {/* Layer 2: Yellow Label Strip (Overlay) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
         <div className="relative w-[90%] h-[50%] transform translate-y-[10%]">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_label_strip-PafJwKwKtmKnhwpPDbNKMe.png"
              alt="Label Strip"
              className="absolute inset-0 w-full h-full object-contain drop-shadow-md"
            />
            
            {/* Layer 3: Text Content Printed on Label */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 pb-1 z-20">
                <h4 className={cn(
                  "font-mono text-[10px] leading-tight text-[#2a2a2a] font-bold tracking-tight uppercase line-clamp-2 opacity-85 mix-blend-multiply w-full",
                  "transform rotate-[-0.5deg]" // Slight rotation to match label skew
                )}>
                  {entry.title}
                </h4>
                <div className="flex justify-between items-center w-full mt-1 px-2 opacity-70 mix-blend-multiply">
                    <span className="font-handwriting text-[8px] text-[#2a2a2a]">
                      {entry.id.split("_")[1]}
                    </span>
                    <span className="font-pixel text-[6px] text-[#2a2a2a] tracking-widest">
                      {entry.time_commitment}
                    </span>
                </div>
            </div>
         </div>
      </div>
      
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute top-2 right-2 z-20">
            <span className="text-amber-500 font-pixel text-[8px] tracking-widest animate-pulse bg-black/80 px-1 py-0.5 rounded border border-amber-500/50">
                ACTIVE
            </span>
        </div>
      )}
    </div>
  );
}
