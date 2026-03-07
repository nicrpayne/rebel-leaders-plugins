import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";
import { useState, useEffect } from "react";

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
  const [animState, setAnimState] = useState<"idle" | "inserting" | "loaded" | "ejecting">("idle");
  const [displayEntry, setDisplayEntry] = useState<CodexEntry | null>(null);

  useEffect(() => {
    if (loadedEntry && loadedEntry.id !== displayEntry?.id) {
      // New entry loaded: Start insert animation
      setAnimState("inserting");
      setDisplayEntry(loadedEntry);
      // Simple timeout for animation
      const timer = setTimeout(() => setAnimState("loaded"), 50); // Start animation almost immediately
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
      "w-full flex justify-center py-8 relative z-30 pointer-events-none", // pointer-events-none on container to prevent blocking clicks below
      className
    )}>
      
      {/* --- 8-TRACK DECK FACE (WIDER) --- */}
      <div className="relative w-full max-w-[1000px] aspect-[21/9] shadow-2xl pointer-events-auto"> {/* pointer-events-auto on the deck itself */}
        
        {/* Deck Faceplate Image */}
        <img 
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_deck_face_wide-5wRwynP7E8tErdVLcFv4Nz.webp"
          alt="Codex Deck"
          className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
        />

        {/* --- SLOT AREA (Behind Faceplate) --- */}
        {/* Re-aligned for the new wider image. 
            Slot is roughly centered horizontally, slightly lower than vertical center.
            Based on 21:9 image, slot is roughly 50% width, centered. */}
        <div className="absolute top-[38%] left-[20%] w-[50%] h-[22%] z-30 flex items-center justify-center overflow-hidden">
          
          {/* Internal Slot Darkness/Shadow */}
          <div className="absolute inset-0 bg-black/90 shadow-[inset_0_0_30px_rgba(0,0,0,1)] rounded-sm z-0" />

          {/* Loaded Cartridge Spine */}
          {displayEntry && (
            <div 
              key={displayEntry.id} 
              className={cn(
                "relative w-[96%] h-[88%] transition-all duration-300 ease-out shadow-xl origin-bottom z-10",
                // Simplified 2D Slide Animation
                // Inserting: Starts small and low (outside), moves to normal size and position
                animState === "inserting" && "translate-y-[110%] scale-95 opacity-0",
                animState === "loaded" && "translate-y-0 scale-100 opacity-100",
                animState === "ejecting" && "translate-y-[110%] scale-95 opacity-0"
              )}
            >
              {/* Spine Image */}
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine-FRQgHyfCgopKrtm3CwhgBC.webp"
                alt="Cartridge Spine"
                className="absolute inset-0 w-full h-full object-fill rounded-sm brightness-90"
              />
              
              {/* Dynamic Label Text on Spine */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[70%] h-[60%] flex flex-col items-center justify-center text-center overflow-hidden">
                  <h3 className="font-serif text-[#3d342b] text-[10px] md:text-sm font-bold uppercase leading-tight tracking-widest opacity-80 mix-blend-multiply drop-shadow-sm">
                    {displayEntry.title}
                  </h3>
                  <span className="font-mono text-[6px] md:text-[8px] text-[#3d342b]/60 mt-1">
                    {displayEntry.id}
                  </span>
                </div>
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
              "w-1/2 h-full opacity-0 hover:opacity-20 bg-amber-500 transition-all cursor-pointer rounded-sm active:scale-95 active:brightness-125",
              !loadedEntry && "cursor-not-allowed opacity-0"
            )}
            title="READ PROTOCOL"
          />

          {/* EJECT Button (Right) */}
          <button
            onClick={onEject}
            disabled={!loadedEntry}
            className={cn(
              "w-1/2 h-full opacity-0 hover:opacity-20 bg-red-500 transition-all cursor-pointer rounded-sm active:scale-95 active:brightness-125",
              !loadedEntry && "cursor-not-allowed opacity-0"
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

      {/* --- MOBILE CONTROLS (Visible only on small screens if image buttons are too small) --- */}
      <div className="md:hidden absolute -bottom-12 flex gap-4 w-full justify-center pointer-events-auto">
         <button 
            onClick={onRead}
            disabled={!loadedEntry}
            className="bg-amber-900/80 text-amber-100 px-4 py-2 rounded font-pixel text-xs border border-amber-500/50 active:bg-amber-700"
         >
            READ
         </button>
         <button 
            onClick={onEject}
            disabled={!loadedEntry}
            className="bg-red-900/80 text-red-100 px-4 py-2 rounded font-pixel text-xs border border-red-500/50 active:bg-red-700"
         >
            EJECT
         </button>
      </div>

    </div>
  );
}
