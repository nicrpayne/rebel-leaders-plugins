import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PluginShellProps {
  children: ReactNode;
  title: string;
  category: "MAP" | "MIRROR" | "MOVE";
  className?: string;
}

export default function PluginShell({ children, title, category, className }: PluginShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className={cn(
        "w-full max-w-4xl bg-forest-deep border-4 border-wood shadow-2xl relative overflow-hidden",
        className
      )}>
        {/* Header */}
        <div className="bg-forest border-b-2 border-wood p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gold rounded-full animate-pulse" />
            <h1 className="text-gold text-sm md:text-base tracking-widest font-pixel uppercase">
              {title}
            </h1>
          </div>
          <div className="px-2 py-1 bg-forest-light border border-gold/30 text-gold text-[10px] font-pixel uppercase tracking-wider">
            {category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-12 relative">
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" 
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")' }} />
          
          {children}
        </div>

        {/* Footer */}
        <div className="bg-forest-deep border-t-2 border-wood p-3 flex justify-between items-center text-[10px] text-muted-foreground font-pixel">
          <div>REBEL OS v1.0</div>
          <div className="flex gap-4">
            <span className="opacity-50">SIDECHAIN: OFF</span>
            <span className="text-gold">SIGNAL: ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
