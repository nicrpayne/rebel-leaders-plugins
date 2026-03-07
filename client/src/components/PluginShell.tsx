import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PluginShellProps {
  children: ReactNode;
  title?: string;
  category?: string;
  className?: string;
  footerControls?: ReactNode;
}

export default function PluginShell({ 
  children, 
  title = "GRAVITY CHECK", 
  category = "MIRROR",
  className,
  footerControls
}: PluginShellProps) {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-8 font-sans selection:bg-green-900 selection:text-green-50">
      
      {/* Main Chassis - The "Physical" Unit */}
      <div className={cn(
        "relative w-full max-w-5xl bg-[#111] rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-[#222]",
        "before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] before:opacity-[0.03] before:pointer-events-none", // Subtle texture
        className
      )}>
        
        {/* Industrial Screw Details (Corners) */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#1a1a1a] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center z-30">
          <div className="w-1.5 h-[1px] bg-[#0a0a0a] rotate-45" />
        </div>
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#1a1a1a] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center z-30">
          <div className="w-1.5 h-[1px] bg-[#0a0a0a] -rotate-12" />
        </div>
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#1a1a1a] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center z-30">
          <div className="w-1.5 h-[1px] bg-[#0a0a0a] rotate-90" />
        </div>
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[#1a1a1a] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] flex items-center justify-center z-30">
          <div className="w-1.5 h-[1px] bg-[#0a0a0a] rotate-180" />
        </div>

        {/* Top Header Strip - Recessed */}
        <div className="h-14 bg-[#0a0a0a] border-b border-[#222] flex items-center justify-between px-6 md:px-8 relative overflow-hidden z-20">
          {/* Left: Title & Category */}
          <div className="flex flex-col z-10">
            <h1 className="text-gold font-pixel text-lg md:text-xl tracking-[0.2em] uppercase drop-shadow-[0_0_5px_rgba(197,160,89,0.3)]">
              {title}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[#444] font-pixel text-[9px] tracking-widest uppercase">TYPE:</span>
              <span className="text-[#666] font-pixel text-[9px] tracking-widest uppercase">{category}</span>
            </div>
          </div>

          {/* Right: Status LEDs & Nameplate Mount */}
          <div className="flex items-center gap-6 z-10">
            {/* Status LEDs */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
                <span className="text-[8px] font-pixel text-[#333] tracking-widest">PWR</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
                <span className="text-[8px] font-pixel text-[#333] tracking-widest">CLIP</span>
              </div>
            </div>

            {/* MOUNTING POINT: Horizon Nameplate (Top-Right) */}
            {/* 
               Spec: "Screwed-on professional plate"
               - Asset: horizon_plate.png (transparent)
               - Placement: Top-right near PWR/CLIP
               - Rotation: 0deg to +2deg (Precision)
               - Styling: Crisp shadow, sits above chassis
               - Mobile: Hidden to save space, or scaled down significantly
            */}
            <div className="hidden md:block relative w-24 h-8 ml-4 opacity-90 hover:opacity-100 transition-opacity">
               {/* Placeholder using current logo - Replace src with 'horizon_plate.png' later */}
               <img 
                 src="https://cdn.manus.space/2026-03-06-17-48-36-398032/RebelLogo.png" 
                 alt="Rebel Leaders Nameplate" 
                 className="w-full h-full object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]"
                 style={{ transform: 'rotate(0deg)' }}
               />
            </div>
          </div>
          
          {/* Header Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Main Content Area - Recessed "Screen" */}
        <div className="p-6 md:p-10 bg-[#0e0e0e] relative min-h-[400px] z-10">
          {/* Inner Shadow for Depth */}
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none z-0" />
          
          {/* Content Container */}
          <div className="relative z-10">
            {children}
          </div>

          {/* MOUNTING POINT: Worn Sticker (Bottom-Left) */}
          {/* 
             Spec: "Worn vinyl sticker"
             - Asset: nic_sticker_worn.png (transparent)
             - Placement: Bottom-left chassis zone (above footer)
             - Rotation: -6deg to -10deg (Human/Rebellious)
             - Styling: Subtle shadow + slight edge lift
             - Mobile: Scaled down and positioned to not overlap controls
          */}
          <div className="absolute bottom-4 left-4 w-16 md:bottom-10 md:left-10 md:w-24 z-20 pointer-events-none mix-blend-normal opacity-80 md:opacity-90">
             {/* Placeholder using current sprite - Replace src with 'nic_sticker_worn.png' later */}
             <img 
               src="https://cdn.manus.space/2026-03-06-17-48-36-398032/nic_victory_v4-3.png" 
               alt="Nic Sticker" 
               className="w-full h-auto drop-shadow-[2px_4px_6px_rgba(0,0,0,0.5)]"
               style={{ transform: 'rotate(-8deg)' }}
             />
          </div>
        </div>

        {/* Bottom Footer Strip - Control Surface */}
        <div className="h-10 bg-[#111] border-t border-[#222] flex items-center justify-between px-4 md:px-6 relative z-20">
          {/* Left: Mode Toggles */}
          <div className="flex items-center gap-4 pl-16 md:pl-32"> {/* Padding left to clear the sticker on mobile too */}
            <div className="hidden md:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-[#333] shadow-inner" />
              <span className="text-[9px] font-pixel text-[#444] tracking-widest uppercase">MODE:</span>
              <span className="text-[9px] font-pixel text-gold tracking-widest uppercase">STANDARD</span>
            </div>
            <div className="hidden md:block w-[1px] h-3 bg-[#222]" />
            <div className="hidden md:flex items-center gap-2">
              <span className="text-[9px] font-pixel text-[#444] tracking-widest uppercase">SIDECHAIN:</span>
              <span className="text-[9px] font-pixel text-red-900 tracking-widest uppercase">OFF</span>
            </div>
          </div>

          {/* Right: Version & Footer Controls */}
          <div className="flex items-center gap-4 md:gap-6">
            {footerControls}
            <div className="w-[1px] h-3 bg-[#222]" />
            <span className="text-[9px] font-pixel text-[#333] tracking-[0.2em]">V.1.0.4</span>
            <div className="hidden md:block w-2 h-2 rounded-full bg-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" /> {/* Screw */}
          </div>
        </div>

      </div>
    </div>
  );
}
