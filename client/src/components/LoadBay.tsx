import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";
import { useState, useEffect, useRef } from "react";

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
  // Animation phases: idle -> inserting -> loaded -> ejecting
  const [animPhase, setAnimPhase] = useState<"idle" | "inserting" | "loaded" | "ejecting">("idle");
  const [displayEntry, setDisplayEntry] = useState<CodexEntry | null>(null);
  
  const prevLoadedIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const currentId = loadedEntry?.id;
    const prevId = prevLoadedIdRef.current;

    // Case 1: New entry loaded
    if (loadedEntry && currentId !== prevId) {
      setDisplayEntry(loadedEntry);
      setAnimPhase("inserting"); // Trigger CSS animation

      // After animation completes, switch to static "loaded" state
      const timer = setTimeout(() => setAnimPhase("loaded"), 400); // Match CSS duration
      
      prevLoadedIdRef.current = currentId;
      return () => clearTimeout(timer);
    } 
    // Case 2: Entry removed (eject)
    else if (!loadedEntry && prevId) {
      setAnimPhase("ejecting"); // Trigger CSS animation
      
      const timer = setTimeout(() => {
        setAnimPhase("idle");
        setDisplayEntry(null);
      }, 400); // Match CSS duration
      
      prevLoadedIdRef.current = undefined;
      return () => clearTimeout(timer);
    }
  }, [loadedEntry]);

  return (
    <div className={cn(
      "w-full flex flex-col items-center py-8 relative z-30 pointer-events-none select-none", 
      className
    )}>
      
      {/* --- STATUS OVERLAY --- */}
      <div className={cn(
        "mb-4 font-pixel text-xs md:text-sm tracking-[0.2em] transition-all duration-500 text-center",
        loadedEntry ? "text-amber-500 opacity-100" : "text-amber-900/30 opacity-0"
      )}>
        STATUS: LOADED // {loadedEntry?.title || "EMPTY"}
      </div>

      {/* --- 8-TRACK DECK FACE --- */}
      <div className="relative w-full max-w-[1000px] aspect-[21/9] shadow-2xl pointer-events-auto">
        
        {/* Deck Faceplate Image - z-20 */}
        <img 
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_deck_face_wide-5wRwynP7E8tErdVLcFv4Nz.webp"
          alt="Codex Deck"
          className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
        />

        {/* --- SLOT AREA --- */}
        {/* z-30 (ABOVE deck face) but using clip-path to mask the cartridge so it looks 'inside' */}
        {/* Removed the black background to reveal the original deck slot image */}
        <div className="absolute top-[40%] left-[21%] w-[46%] h-[18%] z-30 overflow-hidden rounded-sm">
          
          {/* Loaded Cartridge Spine */}
          {displayEntry && (
            <div 
              // KEY IS BACK: Forces remount on every ID change -> triggers CSS animation immediately
              key={displayEntry.id} 
              className={cn(
                "absolute inset-0 z-10 flex items-center justify-center transform-gpu will-change-transform",
                
                // CSS Keyframe Animations - PUSH IN EFFECT
                animPhase === "inserting" && "animate-in fade-in zoom-in-90 duration-300 ease-out",
                animPhase === "ejecting" && "animate-out fade-out zoom-out-90 duration-300 ease-in",
                
                // Static States
                animPhase === "loaded" && "opacity-100 scale-100"
              )}
            >
              {/* Spine Image */}
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine_transparent_95539dfa.png"
                alt="Cartridge Spine"
                className="absolute inset-0 w-full h-full object-fill drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              />
              
              {/* --- TEXT OVERLAY (No Beige Box) --- */}
              {/* Text sits directly on the cartridge label with shadow for readability */}
              <div 
                className="absolute w-[65%] h-[55%] flex flex-col items-center justify-center text-center"
                style={{
                  transform: 'rotate(-0.5deg)',
                }}
              >
                <h3 className="font-serif text-[#2a1d10] text-[10px] md:text-[11px] font-black uppercase leading-tight tracking-widest mix-blend-multiply opacity-90 px-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                  {displayEntry.title}
                </h3>
                <span className="font-mono text-[6px] text-[#2a1d10]/60 mt-0.5 tracking-tighter drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                  {displayEntry.id}
                </span>
              </div>

            </div>
          )}
        </div>

        {/* --- TRANSPORT BUTTONS --- */}
        <div className="absolute top-[40%] right-[13%] w-[14%] h-[20%] z-40 flex gap-3 items-center justify-center">
          <button
            onClick={onRead}
            disabled={!loadedEntry}
            className={cn(
              "w-1/2 h-full opacity-0 transition-all cursor-pointer rounded-sm active:scale-95 active:brightness-125",
              !loadedEntry && "cursor-not-allowed"
            )}
            title="READ PROTOCOL"
          />
          <button
            onClick={onEject}
            disabled={!loadedEntry}
            className={cn(
              "w-1/2 h-full opacity-0 transition-all cursor-pointer rounded-sm active:scale-95 active:brightness-125",
              !loadedEntry && "cursor-not-allowed"
            )}
            title="EJECT CARTRIDGE"
          />
        </div>

        {/* --- STATUS LIGHTS --- */}
        <div className={cn(
          "absolute top-[25%] right-[13%] w-[14%] h-[8%] z-40 bg-amber-500/60 blur-md transition-opacity duration-300 mix-blend-screen pointer-events-none rounded-full",
          loadedEntry ? "opacity-100 animate-pulse" : "opacity-0"
        )} />

      </div>
    </div>
  );
}
