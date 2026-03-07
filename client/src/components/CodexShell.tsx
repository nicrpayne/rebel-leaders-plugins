import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import LoadBay from "./LoadBay";
import { CodexEntry } from "@/lib/codex-schema";

interface CodexShellProps {
  children: ReactNode;
  title?: string;
  category?: string;
  className?: string;
  footerControls?: ReactNode;
  status?: string;
  statusColor?: string;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  loadedEntry: CodexEntry | null;
  onEject: () => void;
  onRead: () => void;
  onRun: () => void;
  isReaderOpen: boolean;
}

export default function CodexShell({ 
  children, 
  title = "THE CODEX", 
  category = "ARCHIVE",
  className,
  footerControls,
  status = "STANDBY",
  statusColor = "text-amber-900",
  activeCategory,
  onCategoryChange,
  loadedEntry,
  onEject,
  onRead,
  onRun,
  isReaderOpen
}: CodexShellProps) {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-8 font-sans selection:bg-amber-900 selection:text-amber-50">
      
      {/* Main Chassis - The "Rack Unit" */}
      <div className={cn(
        "relative w-full max-w-6xl bg-[#080808] rounded-sm shadow-[0_0_60px_rgba(217,119,6,0.05),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-[#1a1a1a]",
        "before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] before:opacity-[0.05] before:pointer-events-none",
        className
      )}>
        
        {/* Rack Ears (Left & Right) */}
        <div className="absolute top-0 bottom-0 -left-4 w-4 bg-[#111] border-r border-[#222] flex flex-col justify-between py-4 items-center">
           <div className="w-2 h-3 rounded-full bg-[#050505] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-[#222]" />
           <div className="w-2 h-3 rounded-full bg-[#050505] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-[#222]" />
           <div className="w-2 h-3 rounded-full bg-[#050505] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-[#222]" />
           <div className="w-2 h-3 rounded-full bg-[#050505] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-[#222]" />
        </div>
        <div className="absolute top-0 bottom-0 -right-4 w-4 bg-[#111] border-l border-[#222] flex flex-col justify-between py-4 items-center">
           <div className="w-2 h-3 rounded-full bg-[#050505] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-[#222]" />
           <div className="w-2 h-3 rounded-full bg-[#050505] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-[#222]" />
           <div className="w-2 h-3 rounded-full bg-[#050505] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-[#222]" />
           <div className="w-2 h-3 rounded-full bg-[#050505] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-[#222]" />
        </div>

        {/* Top Header Strip - Data Bank Style */}
        <div className="h-16 bg-[#0c0c0c] border-b border-[#222] flex items-center justify-between px-6 md:px-8 relative overflow-hidden z-20">
          {/* Left: Title & Identity */}
          <div className="flex items-center gap-4 z-10">
            <div className="w-10 h-10 border border-amber-900/30 bg-amber-950/10 flex items-center justify-center">
                <div className="w-6 h-6 border-t-2 border-b-2 border-amber-600/50" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-amber-500 font-pixel text-xl md:text-2xl tracking-[0.15em] uppercase drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                {title}
              </h1>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-amber-900/60 font-pixel text-[9px] tracking-widest uppercase">UNIT:</span>
                <span className="text-amber-700 font-pixel text-[9px] tracking-widest uppercase">{category}</span>
              </div>
            </div>
          </div>

          {/* Right: Data Stream Indicators */}
          <div className="flex items-center gap-8 z-10">
            {/* Activity Lights */}
            <div className="flex gap-1">
                {[1,2,3,4].map(i => (
                    <div key={i} className={cn(
                        "w-1 h-4 bg-amber-900/20 border border-amber-900/30",
                        i === 1 && "bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.5)] animate-pulse"
                    )} />
                ))}
            </div>
            
            <div className="text-right hidden md:block">
                <div className="text-[10px] font-mono text-amber-900/80 tracking-widest">MEM_BANK_01</div>
                <div className="text-[10px] font-mono text-amber-500 tracking-widest">ONLINE</div>
            </div>
          </div>
          
          {/* Header Background Scanline */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(245,158,11,0.05)_50%,transparent_100%)] opacity-50 pointer-events-none" />
        </div>

        {/* --- LOAD BAY (The "Deck") --- */}
        <LoadBay 
          loadedEntry={loadedEntry}
          onEject={onEject}
          onRead={onRead}
          onRun={onRun}
          isReaderOpen={isReaderOpen}
        />

        {/* Main Content Area - The "Vault" */}
        <div className="p-0 bg-[#050505] relative min-h-[600px] z-10 flex flex-col">
          
          {/* Content - The "Data Grid" */}
          <div className="flex-1 relative bg-[#080808] p-6 md:p-10 overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[length:40px_40px] opacity-20 pointer-events-none" />
             
             {/* Content Container */}
             <div className="relative z-10 h-full">
                {children}
             </div>
          </div>
        </div>

        {/* Bottom Footer Strip - Status Line */}
        <div className="h-12 bg-[#0c0c0c] border-t border-[#222] flex items-center justify-between px-6 relative z-20">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-amber-900/60">SYSTEM_READY</span>
            <div className="w-1 h-1 rounded-full bg-amber-900/40" />
            <span className={cn("text-[10px] font-mono tracking-widest", statusColor)}>{status}</span>
          </div>

          <div className="flex items-center gap-6">
            {footerControls}
            <div className="w-[1px] h-4 bg-[#222]" />
            <span className="text-[10px] font-pixel text-amber-900/40 tracking-widest">V.2.0.1</span>
          </div>
        </div>

      </div>
    </div>
  );
}
