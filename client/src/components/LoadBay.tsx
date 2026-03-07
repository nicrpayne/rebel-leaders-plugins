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
  // New animation phases: idle -> preInsert -> inserting -> loaded -> ejecting
  const [animPhase, setAnimPhase] = useState<"idle" | "preInsert" | "inserting" | "loaded" | "ejecting">("idle");
  const [displayEntry, setDisplayEntry] = useState<CodexEntry | null>(null);
  
  // Keep track of the previous loadedEntry ID to detect changes
  const prevLoadedIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const currentId = loadedEntry?.id;
    const prevId = prevLoadedIdRef.current;

    // Case 1: New entry loaded (from empty or from another entry)
    if (loadedEntry && currentId !== prevId) {
      // If we already have a display entry (hot swap), eject first? 
      // For now, let's just instant-swap or animate in.
      // To keep it simple and robust: Always start the insert sequence for the new entry.
      
      setDisplayEntry(loadedEntry);
      setAnimPhase("preInsert");

      // Trigger animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimPhase("inserting");
        });
      });

      // Complete animation
      const timer = setTimeout(() => setAnimPhase("loaded"), 320);
      
      prevLoadedIdRef.current = currentId;
      return () => clearTimeout(timer);
    } 
    // Case 2: Entry removed (eject)
    else if (!loadedEntry && prevId) {
      setAnimPhase("ejecting");
      
      const timer = setTimeout(() => {
        setAnimPhase("idle");
        setDisplayEntry(null);
      }, 260);
      
      prevLoadedIdRef.current = undefined;
      return () => clearTimeout(timer);
    }
  }, [loadedEntry]);

  return (
    <div className={cn(
      "w-full flex flex-col items-center py-8 relative z-30 pointer-events-none select-none", // select-none to prevent text selection during drag
      className
    )}>
      
      {/* --- STATUS OVERLAY (Above Deck) --- */}
      <div className={cn(
        "mb-4 font-pixel text-xs md:text-sm tracking-[0.2em] transition-all duration-500 text-center",
        loadedEntry ? "text-amber-500 opacity-100" : "text-amber-900/30 opacity-0"
      )}>
        STATUS: LOADED // {loadedEntry?.title || "EMPTY"}
      </div>

      {/* --- 8-TRACK DECK FACE (WIDER) --- */}
      <div className="relative w-full max-w-[1000px] aspect-[21/9] shadow-2xl pointer-events-auto"> {/* pointer-events-auto on the deck itself */}
        
        {/* Deck Faceplate Image - z-20 */}
        <img 
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_deck_face_wide-5wRwynP7E8tErdVLcFv4Nz.webp"
          alt="Codex Deck"
          className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
        />

        {/* --- SLOT AREA (Behind Faceplate) --- */}
        {/* Re-aligned for the new wider image. 
            Slot is roughly centered horizontally, slightly lower than vertical center.
            Based on 21:9 image, slot is roughly 50% width, centered. */}
        <div className="absolute top-[40%] left-[21%] w-[46%] h-[18%] z-10 overflow-hidden rounded-sm">
          
          {/* Internal Slot Darkness/Shadow - NO BORDER */}
          {/* Dark Void Background - Pushed to z-0 (inside slot container) */}
          <div className="absolute inset-0 bg-[#050a05] shadow-[inset_0_0_30px_rgba(0,0,0,1)] z-0" />

          {/* Loaded Cartridge Spine */}
          {displayEntry && (
            <div 
              key={displayEntry.id} 
              className={cn(
                // Sizing: Height 100% of slot (snug fit), Width 100%
                // Position: Absolute inside the overflow-hidden slot
                "absolute inset-0 z-10 flex items-center justify-center transform-gpu will-change-transform",
                
                // Animation States
                animPhase === "preInsert" && "translate-y-[120%]", // Start below slot
                animPhase === "inserting" && "transition-transform duration-300 ease-out translate-y-0", // Slide up
                animPhase === "loaded" && "translate-y-0", // Static final state
                animPhase === "ejecting" && "transition-transform duration-250 ease-in translate-y-[120%]" // Slide down
              )}
            >
              {/* Spine Image - TRANSPARENT PNG */}
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine_transparent_95539dfa.png"
                alt="Cartridge Spine"
                className="absolute inset-0 w-full h-full object-fill drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" // Reduced shadow for "inserted" look
              />
              
              {/* --- PHYSICAL LABEL OVERLAY --- */}
              {/* This sits ON TOP of the cartridge image to cover the baked-in "PROTOCOL" text */}
              <div 
                className="absolute w-[65%] h-[55%] bg-[#d8c6a2] flex flex-col items-center justify-center text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(0,0,0,0.35)]"
                style={{
                  transform: 'rotate(-0.5deg)', // Subtle imperfection
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.1%22/%3E%3C/svg%3E")', // Subtle noise texture
                }}
              >
                {/* Title */}
                <h3 className="font-serif text-[#2a1d10] text-[10px] md:text-[11px] font-black uppercase leading-tight tracking-widest mix-blend-multiply opacity-90 px-1">
                  {displayEntry.title}
                </h3>
                {/* ID Stamp */}
                <span className="font-mono text-[6px] text-[#2a1d10]/60 mt-0.5 tracking-tighter">
                  {displayEntry.id}
                </span>
              </div>

            </div>
          )}
        </div>

        {/* --- TRANSPORT BUTTONS OVERLAY --- */}
        {/* Re-aligned for the new wider image. Buttons are to the right of the slot. */}
        <div className="absolute top-[40%] right-[13%] w-[14%] h-[20%] z-30 flex gap-3 items-center justify-center">
          
          {/* READ / PROGRAM Button (Left) */}
          <button
            onClick={onRead}
            disabled={!loadedEntry}
            className={cn(
              "w-1/2 h-full opacity-0 transition-all cursor-pointer rounded-sm active:scale-95 active:brightness-125",
              !loadedEntry && "cursor-not-allowed"
            )}
            title="READ PROTOCOL"
          />

          {/* EJECT Button (Right) */}
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

        {/* --- STATUS LIGHTS OVERLAY --- */}
        {/* Re-aligned for the new wider image. Lights are above the buttons. */}
        <div className={cn(
          "absolute top-[25%] right-[13%] w-[14%] h-[8%] z-40 bg-amber-500/60 blur-md transition-opacity duration-300 mix-blend-screen pointer-events-none rounded-full",
          loadedEntry ? "opacity-100 animate-pulse" : "opacity-0"
        )} />

      </div>



    </div>
  );
}
