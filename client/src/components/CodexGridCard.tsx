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
      {/* Cassette Tape Image Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
         <img 
           src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_punchcard_header-JtB8WXchbX2yc6P7JMTyZr.webp"
           alt="Cassette Tape"
           className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
           style={{ objectPosition: 'center' }}
         />
      </div>

      {/* Overlay Content on the Yellow Label Area */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center pt-8 px-8">
        {/* Title positioned to align with the tape label */}
        <div className="transform translate-y-2 w-full text-center">
            <h4 className={cn(
              "font-handwriting text-lg leading-tight text-[#2a2a2a] font-bold tracking-tight opacity-80 mix-blend-multiply truncate",
            )}>
              {entry.title}
            </h4>
             <span className="font-mono text-[9px] text-[#2a2a2a] opacity-60 block mt-0.5 uppercase tracking-widest">
              {entry.id.split("_")[1]} // {entry.time_commitment}
            </span>
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
