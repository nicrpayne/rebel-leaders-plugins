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

import { useState, useEffect } from "react";

export default function LoadBay({
  loadedEntry,
  onEject,
  onRead,
  onRun,
  isReaderOpen,
  className
}: LoadBayProps) {
  const [animState, setAnimState] = useState<"idle" | "inserting" | "loaded" | "ejecting">("idle");
  const [displayEntry, setDisplayEntry] = useState<CodexEntry | null>(null);

  useEffect(() => {
    if (loadedEntry && loadedEntry.id !== displayEntry?.id) {
      // New entry loaded: Start insert animation
      setAnimState("inserting");
      setDisplayEntry(loadedEntry);
      const timer = setTimeout(() => setAnimState("loaded"), 500);
      return () => clearTimeout(timer);
    } else if (!loadedEntry && displayEntry) {
      // Entry removed: Start eject animation
      setAnimState("ejecting");
      const timer = setTimeout(() => {
        setAnimState("idle");
        setDisplayEntry(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loadedEntry, displayEntry]);

  return (
    <div className={cn(
      "w-full bg-[#0c0c0c] border-b border-[#222] p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
      className
    )}>
      
      {/* --- LEFT: LOAD SLOT --- */}
      <div className="w-full md:w-2/3 relative flex justify-center md:justify-start overflow-visible">
        {/* Slot Frame Container */}
        <div className="relative w-full max-w-[600px] aspect-[1400/320] min-h-[80px] overflow-visible">
          {/* Background Cavity */}
          <div className="absolute inset-[5%] bg-[#050505] shadow-inner rounded-sm overflow-hidden" />

          {/* Slot Frame Image */}
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_slot_frame-K5Sx8tjtQTyAwbsbBxfJ9J.webp"
            alt="Load Bay Slot"
            className="absolute inset-0 w-full h-full object-contain z-40 pointer-events-none mix-blend-multiply brightness-125 contrast-125"
          />
          
          {/* Empty State Text */}
          {!loadedEntry && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <span className="font-pixel text-[10px] md:text-xs text-amber-900/40 tracking-[0.2em] animate-pulse mb-2">
                INSERT PROTOCOL
              </span>
              <span className="font-mono text-[8px] text-amber-900/30 tracking-widest uppercase">
                Select a cartridge below
              </span>
              {/* Scanline Animation */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(245,158,11,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent h-[20%] w-full animate-[scan_3s_linear_infinite] pointer-events-none" />
            </div>
          )}

          {/* Loaded Cartridge (Animated) */}
          {displayEntry && (
            <div 
              key={displayEntry.id} 
              className={cn(
                "absolute inset-[8%] z-20 flex items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                animState === "inserting" && "translate-x-[100%] opacity-0 scale-95",
                animState === "loaded" && "translate-x-0 opacity-100 scale-100",
                animState === "ejecting" && "translate-x-[100%] opacity-0 scale-95"
              )}
            >
              {/* Signal Lock Indicator */}
              <div className={cn(
                "absolute -top-6 right-0 flex items-center gap-2 transition-opacity duration-300",
                animState === "loaded" ? "opacity-100" : "opacity-0"
              )}>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
                <span className="font-pixel text-[8px] text-amber-500 tracking-widest">SIGNAL LOCKED</span>
              </div>
              {/* Cartridge Body */}
              <div className="relative w-full h-full">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_body-C4DC7BQ3WfAArvo6KbDhyY.webp"
                  alt="Cartridge"
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-lg"
                />
                
                {/* Label Strip */}
                <div className="absolute top-[15%] left-[5%] right-[15%] bottom-[15%] flex items-center">
                   <img 
                      src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_label_strip-LwPDAbUA3zduFwXko3kUQC.webp"
                      alt="Label"
                      className="absolute inset-0 w-full h-full object-contain opacity-90"
                   />
                   
                   {/* Dynamic Label Text */}
                   <div className="relative z-20 w-full h-full flex items-center px-4 md:px-10 gap-2 md:gap-4">
                      {/* ID Area */}
                      <div className="w-[15%] md:w-[20%] flex justify-center">
                        <span className="font-mono text-[8px] md:text-xs text-amber-900/80 font-bold tracking-tighter rotate-90 md:rotate-0">
                          {displayEntry.id}
                        </span>
                      </div>
                      
                      {/* Title Area */}
                      <div className="flex-1 pl-2 md:pl-4 border-l border-amber-900/20 overflow-hidden">
                        <h3 className="font-serif text-xs md:text-lg text-amber-900 font-bold truncate uppercase tracking-wide">
                          {displayEntry.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                           <span className="font-pixel text-[6px] md:text-[8px] text-amber-900/60 uppercase truncate">
                             {displayEntry.time_commitment}
                           </span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- RIGHT: TRANSPORT CONTROLS --- */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
        
        {/* READ Button */}
        <button
          onClick={onRead}
          disabled={!loadedEntry}
          className={cn(
            "h-12 px-6 font-pixel text-[10px] tracking-widest border transition-all flex items-center justify-center gap-2 min-w-[100px] relative overflow-hidden group",
            !loadedEntry 
              ? "bg-[#111] text-[#333] border-[#222] cursor-not-allowed"
              : isReaderOpen
                ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                : "bg-[#1a1a1a] text-amber-500 border-amber-500/50 hover:border-amber-500 hover:bg-[#222] animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          )}
        >
          {loadedEntry && !isReaderOpen && (
             <div className="absolute inset-0 bg-amber-500/10 animate-[pulse_1s_ease-in-out_infinite]" />
          )}
          <span className={cn("w-2 h-2 rounded-full transition-colors", isReaderOpen ? "bg-black" : "bg-amber-500")} />
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
