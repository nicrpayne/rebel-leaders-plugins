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
      // Linear shove animation timing
      const timer = setTimeout(() => setAnimState("loaded"), 300);
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
      "w-full flex justify-center py-8 relative z-30",
      className
    )}>
      
      {/* --- 8-TRACK DECK FACE --- */}
      <div className="relative w-full max-w-[800px] aspect-[16/9] md:aspect-[2.5/1] shadow-2xl">
        
        {/* Deck Faceplate Image */}
        <img 
          src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_deck_face-cQ6mUMQzkvPYMVNBkTtfkB.webp"
          alt="Codex Deck"
          className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
        />

        {/* --- SLOT AREA (Behind Faceplate) --- */}
        {/* The slot is roughly in the center-left of the image. 
            We position the cartridge relative to this "maw". 
            Based on the image description, slot is central. 
            We'll use absolute positioning to align with the image's slot. */}
        <div className="absolute top-[35%] left-[15%] w-[45%] h-[30%] z-30 flex items-center justify-center perspective-[1000px]">
          
          {/* Internal Slot Darkness/Shadow */}
          <div className="absolute inset-0 bg-black/80 shadow-[inset_0_0_20px_rgba(0,0,0,1)]" />

          {/* Loaded Cartridge Spine */}
          {displayEntry && (
            <div 
              key={displayEntry.id} 
              className={cn(
                "relative w-[95%] h-[85%] transition-all duration-300 ease-linear shadow-xl",
                // Linear "Shove" Animation (Z-axis or Scale)
                animState === "inserting" && "translate-y-[20%] scale-110 opacity-0",
                animState === "loaded" && "translate-y-0 scale-100 opacity-100",
                animState === "ejecting" && "translate-y-[20%] scale-110 opacity-0"
              )}
            >
              {/* Spine Image */}
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine-FRQgHyfCgopKrtm3CwhgBC.webp"
                alt="Cartridge Spine"
                className="absolute inset-0 w-full h-full object-fill rounded-sm"
              />
              
              {/* Dynamic Label Text on Spine */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[70%] h-[60%] flex flex-col items-center justify-center text-center overflow-hidden">
                  <h3 className="font-serif text-[#3d342b] text-[10px] md:text-sm font-bold uppercase leading-tight tracking-widest opacity-80 mix-blend-multiply">
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
        {/* We overlay invisible (or styled) buttons over the image's button area 
            to make them interactive. The image has buttons on the right. */}
        <div className="absolute top-[35%] right-[10%] w-[25%] h-[30%] z-30 flex gap-2 items-center justify-center">
          
          {/* READ / PROGRAM Button */}
          <button
            onClick={onRead}
            disabled={!loadedEntry}
            className={cn(
              "w-1/2 h-full opacity-50 hover:opacity-80 bg-amber-500/30 border-2 border-red-500 transition-opacity cursor-pointer rounded-sm",
              !loadedEntry && "cursor-not-allowed"
            )}
            title="READ PROTOCOL"
          />

          {/* EJECT Button */}
          <button
            onClick={onEject}
            disabled={!loadedEntry}
            className={cn(
              "w-1/2 h-full opacity-50 hover:opacity-80 bg-red-500/30 border-2 border-red-500 transition-opacity cursor-pointer rounded-sm",
              !loadedEntry && "cursor-not-allowed"
            )}
            title="EJECT CARTRIDGE"
          />
        </div>

        {/* --- STATUS LIGHTS OVERLAY --- */}
        {/* Amber glow over the indicator lights area when loaded */}
        <div className={cn(
          "absolute top-[15%] right-[10%] w-[25%] h-[10%] z-40 bg-amber-500/50 blur-md transition-opacity duration-300 mix-blend-screen pointer-events-none",
          loadedEntry ? "opacity-100 animate-pulse" : "opacity-0"
        )} />

      </div>

      {/* --- MOBILE CONTROLS (Visible only on small screens if image buttons are too small) --- */}
      <div className="md:hidden absolute -bottom-12 flex gap-4 w-full justify-center">
         <button 
            onClick={onRead}
            disabled={!loadedEntry}
            className="bg-amber-900/80 text-amber-100 px-4 py-2 rounded font-pixel text-xs border border-amber-500/50"
         >
            READ
         </button>
         <button 
            onClick={onEject}
            disabled={!loadedEntry}
            className="bg-red-900/80 text-red-100 px-4 py-2 rounded font-pixel text-xs border border-red-500/50"
         >
            EJECT
         </button>
      </div>

    </div>
  );
}
