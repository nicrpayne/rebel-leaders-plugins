import { cn } from "@/lib/utils";

interface LCDScreenProps {
  text: string;
  subtext?: string;
  className?: string;
}

export default function LCDScreen({ text, subtext, className }: LCDScreenProps) {
  return (
    <div className={cn("relative bg-[#0a1a0a] border-4 border-[#333] rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,1)] overflow-hidden flex flex-col", className)}>
      {/* Scanlines (Crisper) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]" />
      
      {/* Glow (Subtle) */}
      <div className="absolute inset-0 bg-green-500/5 blur-xl pointer-events-none" />

      {/* Content Container - Flex Column for proper spacing */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full p-6 text-center">
        
        {/* Main Text - Auto-scaling logic via CSS clamp or just smaller base size */}
        <div className="flex-1 flex items-center justify-center w-full">
          <h2 className="font-pixel text-green-400/90 text-[10px] md:text-[11px] leading-loose tracking-widest drop-shadow-[0_0_4px_rgba(74,222,128,0.6)] blur-[0.3px] uppercase max-w-[90%]">
            {text}
          </h2>
        </div>

        {/* Subtext - Anchored at bottom if needed, or just below */}
        {subtext && (
          <div className="mt-4 pt-2 border-t border-green-900/30 w-full">
            <p className="font-pixel text-green-600/80 text-[8px] uppercase tracking-[0.2em] drop-shadow-[0_0_2px_rgba(74,222,128,0.4)] blur-[0.2px]">
              {subtext}
            </p>
          </div>
        )}
      </div>

      {/* Glass Reflection (Top-Left Highlight) */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-30" />
    </div>
  );
}
