import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";

interface LoadBayProps {
  loadedEntry: CodexEntry | null;
  onEject: () => void;
  onRead: () => void;
  onRun: () => void;
  isReaderOpen: boolean;
  className?: string;
}

export default function LoadBay({
  loadedEntry,
  onEject,
  onRead,
  onRun,
  isReaderOpen,
  className
}: LoadBayProps) {
  return (
    <div className={cn(
      "w-full bg-[#0c0c0c] border-b border-[#222] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
      className
    )}>
      
      {/* --- LEFT: LOAD SLOT --- */}
      <div className="w-full md:w-2/3 relative">
        <div className="relative h-20 bg-[#050505] border border-[#222] rounded-sm flex items-center px-6 overflow-hidden shadow-inner group">
          
          {/* Slot Mechanics (Visual) */}
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#111] border-r border-[#222]" />
          <div className="absolute top-0 bottom-0 right-0 w-2 bg-[#111] border-l border-[#222]" />
          
          {/* Empty State Text */}
          {!loadedEntry && (
            <div className="w-full text-center">
              <span className="font-pixel text-xs text-[#333] tracking-[0.2em] animate-pulse">
                INSERT PROTOCOL CARTRIDGE
              </span>
            </div>
          )}

          {/* Loaded Cartridge (Animated) */}
          {loadedEntry && (
            <div key={loadedEntry.id} className="w-full flex items-center justify-between animate-in slide-in-from-bottom duration-500 fade-in zoom-in-95">
              <div className="flex flex-col">
                <span className="font-pixel text-[9px] text-amber-500/70 tracking-widest mb-1">
                  LOADED: {loadedEntry.id}
                </span>
                <h3 className="font-mono text-xl md:text-2xl text-amber-100 truncate pr-4">
                  {loadedEntry.title}
                </h3>
              </div>
              
              {/* Status Indicator */}
              <div className="hidden md:flex items-center gap-2 bg-amber-900/10 px-3 py-1 rounded border border-amber-900/20">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
                <span className="font-pixel text-[8px] text-amber-500 tracking-widest">DECRYPTED</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- RIGHT: TRANSPORT CONTROLS --- */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        
        {/* READ Button */}
        <button
          onClick={onRead}
          disabled={!loadedEntry}
          className={cn(
            "h-12 px-6 font-pixel text-[10px] tracking-widest border transition-all flex items-center justify-center gap-2 min-w-[100px]",
            !loadedEntry 
              ? "bg-[#111] text-[#333] border-[#222] cursor-not-allowed"
              : isReaderOpen
                ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "bg-[#1a1a1a] text-amber-500 border-amber-500/30 hover:border-amber-500 hover:bg-[#222]"
          )}
        >
          <span className="w-2 h-2 bg-current rounded-full" />
          READ
        </button>

        {/* RUN Button */}
        <button
          onClick={onRun}
          disabled={!loadedEntry}
          className={cn(
            "h-12 px-6 font-pixel text-[10px] tracking-widest border transition-all flex items-center justify-center gap-2 min-w-[100px]",
            !loadedEntry 
              ? "bg-[#111] text-[#333] border-[#222] cursor-not-allowed"
              : "bg-[#1a1a1a] text-[#888] border-[#333] hover:text-amber-100 hover:border-amber-500/50 hover:bg-[#222]"
          )}
        >
          <span className="text-lg leading-none">▶</span>
          RUN
        </button>

        {/* EJECT Button */}
        <button
          onClick={onEject}
          disabled={!loadedEntry}
          className={cn(
            "h-12 w-12 flex items-center justify-center border transition-all",
            !loadedEntry 
              ? "bg-[#111] text-[#333] border-[#222] cursor-not-allowed"
              : "bg-[#0a0a0a] text-[#666] border-[#333] hover:text-red-500 hover:border-red-900/50 hover:bg-[#111]"
          )}
          title="EJECT"
        >
          ⏏
        </button>

      </div>
    </div>
  );
}
