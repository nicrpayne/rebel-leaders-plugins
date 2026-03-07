import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";
import { CODEX_ENTRIES } from "@/lib/codex-data";
import CodexShell from "@/components/CodexShell";

export default function Codex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedEntry, setSelectedEntry] = useState<CodexEntry | null>(null);
  const [recommendedEntries, setRecommendedEntries] = useState<CodexEntry[]>([]);
  const [hasGravityResults, setHasGravityResults] = useState(false);
  const [isReceivingSignal, setIsReceivingSignal] = useState(false);

  // Load Gravity Check Results & Filter Recommendations
  useEffect(() => {
    // Check for signal transmission
    const params = new URLSearchParams(window.location.search);
    if (params.get("signal") === "received") {
      setIsReceivingSignal(true);
      // Play signal sound
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"); // Placeholder SFX
      audio.volume = 0.2;
      audio.play().catch(() => {});
      
      // Clear URL
      window.history.replaceState({}, "", "/codex");
      
      // End animation after delay
      setTimeout(() => setIsReceivingSignal(false), 2500);
    }

    const savedResults = localStorage.getItem("gravityCheckResults");
    if (savedResults) {
      setHasGravityResults(true);
      // TODO: Implement real filtering logic based on savedResults (bottleneck/leak_type)
      // For now, just show the first 2 as "Recommended"
      setRecommendedEntries(CODEX_ENTRIES.slice(0, 2));
    }
  }, []);

  // Filter Logic
  const filteredEntries = CODEX_ENTRIES.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          entry.script.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || entry.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <CodexShell 
      title="THE CODEX" 
      category="ARCHIVE" 
      status={isReceivingSignal ? "RECEIVING..." : "ONLINE"}
      statusColor={isReceivingSignal ? "text-amber-500 animate-pulse" : "text-amber-900"}
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      footerControls={
        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end">
              <span className="text-[8px] font-pixel text-amber-900/60 tracking-widest">BUFFER</span>
              <div className="w-16 h-1 bg-amber-900/20 rounded-full overflow-hidden">
                 <div className="h-full bg-amber-700/50 w-[40%]" />
              </div>
           </div>
        </div>
      }
    >
      <div className="flex flex-col h-full w-full gap-6 overflow-y-auto pr-2 pb-20 scrollbar-thin scrollbar-thumb-amber-900/20 scrollbar-track-transparent">
        
        {/* --- SIGNAL ACQUISITION OVERLAY --- */}
        {isReceivingSignal && (
          <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center font-pixel text-amber-500 backdrop-blur-sm">
            <div className="text-4xl mb-4 animate-pulse tracking-[0.2em]">INCOMING DATA STREAM</div>
            <div className="w-64 h-2 bg-amber-900/30 rounded-full overflow-hidden border border-amber-900/50">
              <div className="h-full bg-amber-500 animate-[width_2s_ease-in-out_forwards] shadow-[0_0_10px_rgba(245,158,11,0.8)]" style={{ width: "0%" }} />
            </div>
            <div className="mt-4 text-xs tracking-widest opacity-70 font-mono">
              DECRYPTING PROTOCOLS // 100%
            </div>
          </div>
        )}

        {/* --- TOP BAR: SEARCH & FILTER --- */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-amber-900/20 pb-6 sticky top-0 bg-[#080808]/95 backdrop-blur z-30 pt-2">
          {/* Search Input - "Data Query" */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-amber-500/50 font-pixel text-[10px]">&gt;</span>
            </div>
            <input 
              type="text" 
              placeholder="QUERY PROTOCOLS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-amber-900/30 text-amber-500 font-mono text-xs py-2 pl-8 pr-4 focus:outline-none focus:border-amber-500/50 focus:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all placeholder:text-amber-900/40 rounded-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="w-1.5 h-1.5 bg-amber-500/20 animate-pulse rounded-full" />
            </div>
          </div>

          {/* Category Tabs - "Sector Select" */}
          <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {["ALL", "CONFLICT", "VISION", "ALIGNMENT", "CULTURE"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 text-[9px] font-pixel tracking-widest border transition-all whitespace-nowrap rounded-sm",
                  activeCategory === cat 
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.1)]" 
                    : "bg-transparent text-amber-900/60 border-transparent hover:text-amber-400 hover:border-amber-900/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- RECOMMENDATION ENGINE (SIDE-CHAIN PAYOFF) --- */}
        {hasGravityResults && recommendedEntries.length > 0 && !searchQuery && activeCategory === "ALL" && (
          <div className="mb-4 bg-amber-900/5 border border-amber-900/20 p-4 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20">
                <div className="w-16 h-16 border-2 border-amber-500 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 border border-amber-500 rounded-full" />
                </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <div className="w-2 h-2 bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              <h3 className="font-pixel text-[10px] text-amber-500 tracking-[0.2em] uppercase">
                Priority Transmission
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {recommendedEntries.map(entry => (
                <div 
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className="group relative bg-[#0a0a0a] border border-amber-500/30 p-4 cursor-pointer hover:border-amber-500 hover:bg-[#111] transition-all duration-300 flex gap-4 items-center"
                >
                  {/* Tape Reel Icon */}
                  <div className="w-12 h-12 bg-[#151515] rounded-full border border-[#333] flex items-center justify-center group-hover:border-amber-500/50 group-hover:animate-[spin_4s_linear_infinite]">
                     <div className="w-4 h-4 bg-[#222] rounded-full border border-[#444] flex items-center justify-center">
                        <div className="w-1 h-1 bg-amber-900/50 rounded-full" />
                     </div>
                     <div className="absolute w-10 h-10 border border-dashed border-[#333] rounded-full" />
                  </div>

                  <div className="flex-1">
                      <h4 className="font-mono text-sm text-amber-100 group-hover:text-amber-400 transition-colors mb-1">
                        {entry.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-pixel text-amber-900/80 bg-amber-900/10 px-1">MATCH 98%</span>
                        <span className="text-[8px] font-pixel text-[#444]">{entry.category}</span>
                      </div>
                  </div>
                  
                  <div className="text-amber-500/50 group-hover:text-amber-500">→</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- MAIN LIBRARY GRID - "DATA CARTRIDGES" --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntries.map((entry) => (
            <div 
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="group relative bg-[#0a0a0a] border border-[#222] p-0 cursor-pointer hover:border-amber-500/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
            >
              {/* Cartridge Label Top */}
              <div className="h-8 bg-[#111] border-b border-[#222] flex items-center justify-between px-3 group-hover:bg-amber-900/10 transition-colors">
                 <span className="text-[8px] font-pixel text-[#555] group-hover:text-amber-500/70">{entry.id}</span>
                 <div className="flex gap-0.5">
                    <div className="w-1 h-1 bg-[#333] rounded-full" />
                    <div className="w-1 h-1 bg-[#333] rounded-full" />
                    <div className="w-1 h-1 bg-[#333] rounded-full" />
                 </div>
              </div>

              {/* Cartridge Body */}
              <div className="p-4 relative">
                  {/* Decorative Lines */}
                  <div className="absolute top-0 bottom-0 left-2 w-[1px] bg-[#151515]" />
                  <div className="absolute top-0 bottom-0 right-2 w-[1px] bg-[#151515]" />

                  <div className="pl-4 pr-2">
                    <h4 className="font-mono text-sm text-[#ccc] group-hover:text-amber-400 transition-colors mb-2 line-clamp-1">
                        {entry.title}
                    </h4>
                    <p className="text-[10px] text-[#666] font-mono leading-relaxed line-clamp-2 mb-3 group-hover:text-[#888]">
                        {entry.use_when}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1a1a1a] border-dashed">
                        <span className="text-[8px] font-pixel text-[#444] uppercase">{entry.category}</span>
                        <div className="w-2 h-2 bg-[#111] border border-[#333] group-hover:bg-amber-500 group-hover:border-amber-500 transition-colors shadow-[0_0_5px_rgba(0,0,0,0)] group-hover:shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                    </div>
                  </div>
              </div>
              
              {/* Cartridge Bottom Grip */}
              <div className="h-2 bg-[#0e0e0e] border-t border-[#1a1a1a] flex justify-center gap-1 items-center">
                 <div className="w-[1px] h-full bg-[#222]" />
                 <div className="w-[1px] h-full bg-[#222]" />
                 <div className="w-[1px] h-full bg-[#222]" />
                 <div className="w-[1px] h-full bg-[#222]" />
                 <div className="w-[1px] h-full bg-[#222]" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* --- READER MODAL (Slide-Over) --- */}
      {selectedEntry && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedEntry(null)}
          />
          
          {/* Panel - "The Reader" */}
          <div className="relative w-full max-w-2xl bg-[#080808] border-l border-amber-500/20 h-full shadow-[-20px_0_50px_rgba(0,0,0,0.8)] flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Header - Punch Card Style */}
            <div className="p-8 border-b border-[#222] flex justify-between items-start bg-[#0c0c0c] relative overflow-hidden">
              {/* Punch Card Holes */}
              <div className="absolute top-2 left-0 right-0 flex justify-between px-4 opacity-20">
                 {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-1 h-2 bg-amber-900 rounded-sm" />
                 ))}
              </div>

              <div className="relative z-10 mt-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[9px] font-pixel text-amber-500 bg-amber-900/20 px-2 py-1 border border-amber-500/20">
                    {selectedEntry.category}
                  </span>
                  <span className="text-[9px] font-pixel text-[#555]">
                    {selectedEntry.time_commitment}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-amber-100 mb-2 italic">
                  {selectedEntry.title}
                </h2>
                <div className="text-[10px] font-mono text-amber-900/60 tracking-widest">PROTOCOL_ID: {selectedEntry.id}</div>
              </div>
              <button 
                onClick={() => setSelectedEntry(null)}
                className="text-[#444] hover:text-amber-500 transition-colors p-2 mt-4"
              >
                ✕
              </button>
            </div>

            {/* Content Scroll */}
            <div className="flex-1 overflow-y-auto p-8 font-serif text-lg leading-relaxed text-[#aaa] scrollbar-thin scrollbar-thumb-amber-900/20 scrollbar-track-[#050505]">
              
              <div className="mb-8 p-6 bg-[#0a0a0a] border border-[#222] border-l-2 border-l-amber-500/30 shadow-inner">
                <h3 className="font-pixel text-[10px] text-amber-500 mb-3 uppercase tracking-widest">Objective</h3>
                <p className="text-[#ccc] font-sans text-sm leading-relaxed">{selectedEntry.use_when}</p>
              </div>

              <div className="prose prose-invert prose-amber max-w-none">
                <div className="whitespace-pre-wrap text-[#ccc]">
                    {selectedEntry.script}
                </div>
              </div>

              {/* Footer Action */}
              <div className="mt-12 pt-8 border-t border-[#222] flex justify-between items-center">
                 <div className="text-[10px] font-pixel text-[#444]">END OF FILE</div>
                 <button className="bg-amber-900/20 hover:bg-amber-500 hover:text-black text-amber-500 border border-amber-500/30 px-6 py-3 font-pixel text-xs transition-all uppercase tracking-widest">
                    Download Protocol
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CodexShell>
  );
}
