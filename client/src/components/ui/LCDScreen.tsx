import { cn } from "@/lib/utils";

interface LCDScreenProps {
  text: string;
  subtext?: string;
  className?: string;
}

export default function LCDScreen({ text, subtext, className }: LCDScreenProps) {
  return (
    <div className={cn("relative bg-[#0a1a0a] border-4 border-[#333] rounded-lg p-6 shadow-inner overflow-hidden", className)}>
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]" />
      
      {/* Glow */}
      <div className="absolute inset-0 bg-green-500/5 blur-xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center space-y-4">
        <h2 className="font-pixel text-green-400 text-lg md:text-xl leading-relaxed tracking-wide drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">
          {text}
        </h2>
        {subtext && (
          <p className="font-pixel text-green-600/80 text-xs uppercase tracking-widest">
            {subtext}
          </p>
        )}
      </div>

      {/* Glass Reflection */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-30" />
    </div>
  );
}
