import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PluginShellProps {
  children: ReactNode;
  title?: string;
  category?: string;
  className?: string;
  footerControls?: ReactNode; // New prop for integrated footer controls
}

export default function PluginShell({ children, title, category, className, footerControls }: PluginShellProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-foreground font-sans selection:bg-gold/30 flex flex-col items-center justify-center p-4 md:p-8">
      {/* The Rack Unit Chassis - More Compact & "Box-like" */}
      <div className={cn(
        "relative w-full max-w-[840px] bg-[#141414] rounded-sm overflow-hidden shadow-2xl select-none",
        // Chassis Bevel & Depth - Thicker, more industrial
        "border-t border-white/10 border-b border-black/80 border-x border-white/5",
        "shadow-[0_0_0_1px_rgba(0,0,0,1),0_20px_60px_rgba(0,0,0,0.9)]",
        className
      )}>
        
        {/* Top Specular Highlight (Anodized Metal Look) - Unified Light Source (Top-Left) */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/20 via-white/10 to-transparent z-20 pointer-events-none" />

        {/* Header Strip - Compact & Integrated */}
        <header className="relative bg-[#0f0f0f] border-b border-black/60 px-8 py-4 flex justify-between items-center z-10 shadow-md">
          {/* Subtle Texture */}
          <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-5 pointer-events-none mix-blend-overlay" />
          
          <div className="flex items-center gap-4 relative z-10">
            {/* Power/Status Light */}
            <div className="w-3 h-3 rounded-full bg-[#222] border border-[#000] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center">
               <div className="w-1.5 h-1.5 bg-gold/60 rounded-full shadow-[0_0_4px_rgba(197,160,89,0.4)] animate-pulse" />
            </div>

            <div className="flex flex-col gap-0.5">
              <h1 className="font-pixel text-gold text-xs tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] uppercase">
                {title || "REBEL OS"}
              </h1>
              {category && (
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-pixel text-[#444] tracking-widest uppercase">TYPE:</span>
                  <span className="text-[8px] font-pixel text-[#666] tracking-widest uppercase">{category}</span>
                </div>
              )}
            </div>
          </div>

          {/* Status LEDs (Micro-detail) - Darker, more subtle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-900/40 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)] border border-black/80" />
              <span className="text-[8px] font-pixel text-[#333] tracking-widest uppercase">PWR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-900/20 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)] border border-black/80" />
              <span className="text-[8px] font-pixel text-[#333] tracking-widest uppercase">CLIP</span>
            </div>
          </div>
        </header>

        {/* Main Content Area - Tighter Padding */}
        <main className="relative z-10 bg-[#111] px-8 py-8">
          {/* Inner Shadow for Depth */}
          <div className="absolute inset-0 shadow-[inset_0_10px_40px_rgba(0,0,0,0.6)] pointer-events-none z-0" />
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>

          {/* Manufacturer's Badge (Nic Sprite) - Embossed Plate Look */}
          <div className="absolute bottom-6 left-8 z-0 hidden md:flex items-center gap-0 opacity-40 mix-blend-overlay pointer-events-none">
             {/* Plate Background (Embossed) */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20 rounded-sm transform scale-110 blur-[1px]" />
             
            {/* REBEL Text */}
            <span className="font-pixel text-[9px] text-[#222] tracking-[0.2em] drop-shadow-[0_1px_0_rgba(255,255,255,0.03)] -mr-5 relative z-10">
              REBEL
            </span>

            {/* The Sprite */}
            <div className="relative w-20 h-20 flex items-center justify-center -my-6 z-0">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/nic-badge_395aa958.png" 
                alt="Rebel Leaders Badge" 
                className="w-full h-full object-contain pixelated filter brightness-0 opacity-60 drop-shadow-[0_1px_0_rgba(255,255,255,0.03)]"
              />
            </div>

            {/* LEADERS Text */}
            <span className="font-pixel text-[9px] text-[#222] tracking-[0.2em] drop-shadow-[0_1px_0_rgba(255,255,255,0.03)] -ml-5 relative z-10">
              LEADERS
            </span>
          </div>
        </main>

        {/* Footer Strip - Integrated Controls */}
        <footer className="relative bg-[#0f0f0f] border-t border-white/5 px-8 py-3 flex justify-between items-center z-10 h-14 shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-8 pl-32 md:pl-48"> {/* Offset to clear badge */}
            <div className="flex items-center gap-2 group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
               <span className="text-[8px] font-pixel text-[#444] tracking-widest uppercase group-hover:text-[#666]">MODE</span>
               <div className="px-1.5 py-0.5 bg-[#080808] border border-[#222] rounded-[1px] text-[8px] font-pixel text-gold/60 shadow-inner group-hover:text-gold group-hover:border-gold/30 transition-colors">
                 STANDARD
               </div>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
               <span className="text-[8px] font-pixel text-[#444] tracking-widest uppercase group-hover:text-[#666]">SIDECHAIN</span>
               <div className="px-1.5 py-0.5 bg-[#080808] border border-[#222] rounded-[1px] text-[8px] font-pixel text-red-900/40 shadow-inner group-hover:text-red-500/60 group-hover:border-red-900/30 transition-colors">
                 OFF
               </div>
            </div>
          </div>
          
          {/* Right Side: Integrated Footer Controls (Next Button, etc.) */}
          <div className="flex items-center gap-5">
             {footerControls}
             <div className="h-4 w-[1px] bg-[#222] mx-1" />
             <div className="text-[8px] font-pixel text-[#222] tracking-widest opacity-50">
               V.1.0.4
             </div>
          </div>
        </footer>

        {/* Rack Screws (Industrial Detail) - Inset into corners */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#181818] border border-[#000] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center z-20">
          <div className="w-1.5 h-[1px] bg-[#000] rotate-45 opacity-50" />
          <div className="w-[1px] h-1.5 bg-[#000] rotate-45 opacity-50" />
        </div>
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#181818] border border-[#000] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center z-20">
          <div className="w-1.5 h-[1px] bg-[#000] -rotate-12 opacity-50" />
          <div className="w-[1px] h-1.5 bg-[#000] -rotate-12 opacity-50" />
        </div>
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#181818] border border-[#000] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center z-20">
          <div className="w-1.5 h-[1px] bg-[#000] rotate-90 opacity-50" />
          <div className="w-[1px] h-1.5 bg-[#000] rotate-90 opacity-50" />
        </div>
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[#181818] border border-[#000] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center z-20">
          <div className="w-1.5 h-[1px] bg-[#000] rotate-0 opacity-50" />
          <div className="w-[1px] h-1.5 bg-[#000] rotate-0 opacity-50" />
        </div>

      </div>
    </div>
  );
}
