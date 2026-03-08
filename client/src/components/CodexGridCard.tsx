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
        "group relative border border-[#222] bg-[#0a0a0a] hover:bg-[#111] transition-all cursor-pointer overflow-hidden h-48 flex flex-col justify-between hover:border-amber-900/40",
        isActive ? "border-amber-500/50 bg-amber-900/10" : ""
      )}
    >
      {/* Tape Texture Background */}
      <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
         <img 
           src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_punchcard_header-JtB8WXchbX2yc6P7JMTyZr.webp"
           alt="Tape"
           className="h-full w-full object-cover grayscale brightness-75 contrast-125"
         />
      </div>

      {/* Tape Label Area (Content Overlay) */}
      <div className="relative z-10 p-5 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
           <span className="font-pixel text-[8px] text-[#aaa] group-hover:text-[#ccc] tracking-widest bg-black/80 px-1 py-0.5 rounded backdrop-blur-sm border border-white/10">
              {entry.id.split("_")[1]}
           </span>
           <span className="font-mono text-[10px] text-[#aaa] group-hover:text-[#ccc] uppercase tracking-widest bg-black/80 px-1 py-0.5 rounded backdrop-blur-sm border border-white/10">
              {entry.id.split("_")[2] || "GEN"}
           </span>
        </div>
        
        {/* Title as "Handwritten" Label */}
        <div className="bg-[#e0d5b7] text-black px-3 py-2 transform -rotate-1 shadow-lg mx-auto w-full max-w-[90%] text-center border border-[#b8aa8a] mt-4">
            <h4 className={cn(
              "font-serif text-lg leading-tight text-[#2a2a2a] font-bold tracking-tight",
            )}>
              {entry.title}
            </h4>
        </div>

        <div className="flex justify-between items-end mt-auto">
           <span className="font-mono text-[10px] text-[#ccc] group-hover:text-white uppercase tracking-widest bg-black/80 px-1 py-0.5 rounded backdrop-blur-sm border border-white/10">
              {entry.category} // {entry.time_commitment}
           </span>
           {isActive && (
              <span className="text-amber-500 font-pixel text-[8px] tracking-widest animate-pulse bg-black/90 px-1 py-0.5 rounded border border-amber-500/50">
                 ACTIVE
              </span>
           )}
        </div>
      </div>
    </div>
  );
}
