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
      
      // Extend timer slightly to ensure animation finishes before unmount
      const timer = setTimeout(() => {
        setAnimPhase("idle");
        setDisplayEntry(null);
      }, 450); // Increased buffer to prevent flicker
      
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
        {/* MAXIMIZED GEOMETRY: Width 49%, Height 29% */}
        {/* Left adjusted to 19.5% to center the 49% width */}
        {/* Top adjusted to 35% to center the 29% height */}
        <div className="absolute top-[35%] left-[19.5%] w-[49%] h-[29%] z-30 overflow-hidden rounded-sm">
          
          {/* Loaded Cartridge Spine */}
          {displayEntry && (
            <div 
              // Use ID as key ONLY when inserting to trigger mount animation.
              // When ejecting, we MUST keep the same key so React doesn't remount it (which kills the exit animation).
              key={animPhase === "ejecting" ? displayEntry.id : displayEntry.id + "-active"}
              className={cn(
                "absolute inset-0 z-10 flex items-center justify-center transform-gpu will-change-transform",
                
                // CSS Keyframe Animations - PUSH IN EFFECT
                animPhase === "inserting" && "animate-in fade-in zoom-in-90 duration-300 ease-out",
                
                // Eject Animation - Explicitly defined to avoid conflicts
                animPhase === "ejecting" && "animate-out fade-out zoom-out-90 duration-300 ease-in fill-mode-forwards",
                
                // Static States
                animPhase === "loaded" && "opacity-100 scale-100"
              )}
            >
              {/* Spine Image - FORCED STRETCH to fill the expanded slot */}
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine_transparent_95539dfa.png"
                alt="Cartridge Spine"
                className="absolute inset-0 w-full h-full object-fill drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] scale-[1.02]" 
              />
              
              {/* --- TEXT OVERLAY (Enhanced Legibility) --- */}
              {/* Uses backdrop-blur and heavy text-shadow to obscure background text without a visible box */}
              <div 
                className="absolute w-[70%] h-[60%] flex flex-col items-center justify-center text-center"
                style={{
                  transform: 'rotate(-0.5deg)',
                }}
              >
                {/* Subtle blur patch behind text to soften the background "PROTOCOL" */}
                <div className="absolute inset-0 bg-[#e6dcc3]/40 blur-sm rounded-full mix-blend-hard-light -z-10" />
                
                <h3 className="font-serif text-[#1a120a] text-[11px] md:text-[12px] font-black uppercase leading-tight tracking-widest px-2 drop-shadow-[0_0_3px_rgba(230,220,195,1)] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                  {displayEntry.title}
                </h3>
                <span className="font-mono text-[7px] text-[#2a1d10]/80 mt-0.5 tracking-tighter font-bold drop-shadow-[0_0_2px_rgba(230,220,195,1)]">
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
