import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link } from "wouter";

interface PluginShellProps {
  children: ReactNode;
  title?: string;
  category?: string;
  className?: string;
}

export default function PluginShell({ children, title, category, className }: PluginShellProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground font-sans selection:bg-gold/30 flex flex-col items-center justify-center p-4 md:p-8">
      {/* The Rack Unit Chassis */}
      <div className={cn(
        "relative w-full max-w-5xl bg-[#1a1a1a] rounded-lg overflow-hidden shadow-2xl",
        // Chassis Bevel & Depth
        "border-t border-white/10 border-b border-black/50 border-x border-white/5",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.8)]",
        className
      )}>
        
        {/* Top Specular Highlight (Anodized Metal Look) */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none" />

        {/* Header Strip */}
        <header className="relative bg-[#111] border-b border-black/50 px-6 py-4 flex justify-between items-center z-10 shadow-md">
          {/* Subtle Texture */}
          <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-5 pointer-events-none mix-blend-overlay" />
          
          <div className="flex items-center gap-4 relative z-10">
            <Link href="/">
              <div className="w-8 h-8 bg-[#222] rounded-full border border-[#333] flex items-center justify-center shadow-inner cursor-pointer hover:bg-[#2a2a2a] transition-colors group">
                <div className="w-4 h-4 bg-gold/80 rounded-sm group-hover:bg-gold transition-colors shadow-[0_0_5px_rgba(197,160,89,0.3)]" />
              </div>
            </Link>
            <div className="flex flex-col">
              <h1 className="font-pixel text-gold text-sm tracking-[0.2em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {title || "REBEL OS"}
              </h1>
              {category && (
                <span className="text-[10px] font-pixel text-[#666] tracking-widest uppercase mt-0.5">
                  TYPE: {category}
                </span>
              )}
            </div>
          </div>

          {/* Status LEDs (Micro-detail) */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] border border-black/50" />
              <span className="text-[9px] font-pixel text-[#444] tracking-widest">PWR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] border border-black/50" />
              <span className="text-[9px] font-pixel text-[#444] tracking-widest">CLIP</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 bg-[#161616]">
          {/* Inner Shadow for Depth */}
          <div className="absolute inset-0 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] pointer-events-none z-0" />
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>

          {/* Manufacturer's Badge (Nic Sprite) - Standalone Icon */}
          <div className="absolute bottom-6 left-6 z-0 hidden md:block">
            {/* The Sprite - Black Silhouette & Resized (Doubled from w-12 h-12 to w-24 h-24) */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/nic-badge_395aa958.png" 
                alt="Rebel Leaders Badge" 
                className="w-full h-full object-contain pixelated filter brightness-0 opacity-30 drop-shadow-[0_1px_1px_rgba(255,255,255,0.05)]"
              />
            </div>
          </div>
        </main>

        {/* Footer Strip */}
        <footer className="relative bg-[#111] border-t border-white/5 px-6 py-3 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-pixel text-[#444] tracking-widest">
              MODE: STANDARD
            </span>
            <span className="text-[9px] font-pixel text-[#444] tracking-widest">
              SIDECHAIN: <span className="text-red-900/50">OFF</span>
            </span>
          </div>
          <div className="text-[9px] font-pixel text-[#333] tracking-widest">
            V.1.0.4 // REBEL-LEADER.COM
          </div>
        </footer>

        {/* Rack Screws (Embedded Feel) */}
        <div className="absolute top-4 left-2 w-3 h-3 rounded-full bg-[#222] border border-[#111] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center z-20">
          <div className="w-1.5 h-[1px] bg-[#000] rotate-45 opacity-50" />
          <div className="w-[1px] h-1.5 bg-[#000] rotate-45 opacity-50" />
        </div>
        <div className="absolute top-4 right-2 w-3 h-3 rounded-full bg-[#222] border border-[#111] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center z-20">
          <div className="w-1.5 h-[1px] bg-[#000] -rotate-12 opacity-50" />
          <div className="w-[1px] h-1.5 bg-[#000] -rotate-12 opacity-50" />
        </div>
        <div className="absolute bottom-4 left-2 w-3 h-3 rounded-full bg-[#222] border border-[#111] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center z-20">
          <div className="w-1.5 h-[1px] bg-[#000] rotate-90 opacity-50" />
          <div className="w-[1px] h-1.5 bg-[#000] rotate-90 opacity-50" />
        </div>
        <div className="absolute bottom-4 right-2 w-3 h-3 rounded-full bg-[#222] border border-[#111] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center z-20">
          <div className="w-1.5 h-[1px] bg-[#000] rotate-0 opacity-50" />
          <div className="w-[1px] h-1.5 bg-[#000] rotate-0 opacity-50" />
        </div>

      </div>
    </div>
  );
}
