import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { MOCK_CODEX_ENTRIES, CodexEntry } from "@/lib/codex-schema";
import PluginShell from "@/components/PluginShell";

export default function Codex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedEntry, setSelectedEntry] = useState<CodexEntry | null>(null);
  const [recommendedEntries, setRecommendedEntries] = useState<CodexEntry[]>([]);
  const [hasGravityResults, setHasGravityResults] = useState(false);

  // Load Gravity Check Results & Filter Recommendations
  useEffect(() => {
    const savedResults = localStorage.getItem("gravityCheckResults");
    if (savedResults) {
      setHasGravityResults(true);
      // TODO: Implement real filtering logic based on savedResults (bottleneck/leak_type)
      // For now, just show the first 2 as "Recommended"
      setRecommendedEntries(MOCK_CODEX_ENTRIES.slice(0, 2));
    }
  }, []);

  // Filter Logic
  const filteredEntries = MOCK_CODEX_ENTRIES.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          entry.script.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || entry.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PluginShell title="THE CODEX" category="MOVE" footerControls={null}>
      <div className="flex flex-col h-full max-w-6xl mx-auto w-full gap-8">
        
        {/* --- TOP BAR: SEARCH & FILTER --- */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-white/10 pb-6">
          {/* Search Input */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-gold/50 font-pixel text-[10px]">&gt;</span>
            </div>
            <input 
              type="text" 
              placeholder="SEARCH PROTOCOLS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#333] text-gold font-pixel text-xs py-3 pl-8 pr-4 focus:outline-none focus:border-gold/50 focus:shadow-[0_0_15px_rgba(197,160,89,0.1)] transition-all placeholder:text-[#444]"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="w-1.5 h-1.5 bg-gold/20 animate-pulse rounded-full" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {["ALL", "CONFLICT", "VISION", "ALIGNMENT", "CULTURE"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1.5 text-[9px] font-pixel tracking-widest border transition-all whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-gold text-[#050a05] border-gold shadow-[0_0_10px_rgba(197,160,89,0.3)]" 
                    : "bg-transparent text-[#666] border-transparent hover:text-gold hover:border-gold/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- RECOMMENDATION ENGINE (SIDE-CHAIN PAYOFF) --- */}
        {hasGravityResults && recommendedEntries.length > 0 && !searchQuery && activeCategory === "ALL" && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <h3 className="font-pixel text-[10px] text-green-500 tracking-[0.2em] uppercase">
                Recommended for your signal
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedEntries.map(entry => (
                <div 
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className="group relative bg-[#0f1f0f] border border-green-900/30 p-6 cursor-pointer hover:border-green-500/50 hover:bg-[#132613] transition-all duration-300"
                >
                  {/* "Match" Badge */}
                  <div className="absolute top-0 right-0 bg-green-900/20 border-b border-l border-green-500/30 px-2 py-1">
                    <span className="text-[8px] font-pixel text-green-400">98% MATCH</span>
                  </div>

                  <h4 className="font-serif text-xl text-[#e6c885] italic mb-2 group-hover:text-white transition-colors">
                    {entry.title}
                  </h4>
                  <p className="font-display text-sm text-[#888] line-clamp-2 mb-4 group-hover:text-[#aaa]">
                    {entry.use_when}
                  </p>
                  
                  <div className="flex items-center gap-4 text-[9px] font-pixel text-[#555]">
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-[#444] rounded-full" />
                      {entry.time_commitment}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-[#444] rounded-full" />
                      LVL {entry.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- MAIN LIBRARY GRID --- */}
        {!hasGravityResults && !searchQuery && (
          <div className="bg-[#1a1a1a] border border-[#333] p-6 text-center mb-8">
            <h3 className="font-pixel text-xs text-gold mb-2">CALIBRATION REQUIRED</h3>
            <p className="font-serif text-[#888] text-sm mb-4 max-w-md mx-auto">
              Run the Gravity Check diagnostic to unlock personalized protocol recommendations based on your team's specific friction points.
            </p>
            <Link href="/gravity-check">
              <button className="bg-[#333] hover:bg-gold hover:text-black text-[#888] px-4 py-2 font-pixel text-[9px] transition-colors border border-[#444]">
                INITIATE DIAGNOSTIC
              </button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredEntries.map((entry) => (
            <div 
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="group relative bg-[#0a0a0a] border border-[#222] p-5 cursor-pointer hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_20px_-5px_rgba(197,160,89,0.1)]"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-1 h-1 bg-[#333] group-hover:bg-gold transition-colors" />
              <div className="absolute top-0 right-0 w-1 h-1 bg-[#333] group-hover:bg-gold transition-colors" />
              <div className="absolute bottom-0 left-0 w-1 h-1 bg-[#333] group-hover:bg-gold transition-colors" />
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-[#333] group-hover:bg-gold transition-colors" />

              <div className="flex justify-between items-start mb-3">
                <span className="text-[8px] font-pixel text-[#444] uppercase tracking-widest group-hover:text-gold/70 transition-colors">
                  {entry.category}
                </span>
                <span className="text-[8px] font-pixel text-[#333] border border-[#222] px-1.5 py-0.5 rounded group-hover:border-gold/20 group-hover:text-gold/50">
                  {entry.id.split('_')[1]}
                </span>
              </div>

              <h4 className="font-serif text-lg text-[#ccc] group-hover:text-gold transition-colors mb-2 leading-tight">
                {entry.title}
              </h4>
              
              <p className="text-xs text-[#666] font-display leading-relaxed line-clamp-3 mb-4 group-hover:text-[#888]">
                {entry.use_when}
              </p>

              <div className="mt-auto pt-3 border-t border-[#1a1a1a] flex justify-between items-center">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-1 h-2 rounded-[1px]", 
                        i < entry.difficulty ? "bg-[#333] group-hover:bg-gold/40" : "bg-[#111]"
                      )} 
                    />
                  ))}
                </div>
                <span className="text-[9px] font-pixel text-[#444] group-hover:text-gold transition-colors">
                  ACCESS →
                </span>
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
          
          {/* Panel */}
          <div className="relative w-full max-w-2xl bg-[#080808] border-l border-gold/20 h-full shadow-[-20px_0_50px_rgba(0,0,0,0.8)] flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-8 border-b border-[#222] flex justify-between items-start bg-[#0c0c0c]">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[9px] font-pixel text-gold bg-gold/10 px-2 py-1 border border-gold/20">
                    {selectedEntry.category}
                  </span>
                  <span className="text-[9px] font-pixel text-[#555]">
                    {selectedEntry.time_commitment}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-[#e6c885] italic">
                  {selectedEntry.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedEntry(null)}
                className="text-[#444] hover:text-gold transition-colors p-2"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              
              {/* Use When */}
              <div className="bg-[#111] border-l-2 border-gold/30 p-4">
                <h4 className="font-pixel text-[9px] text-[#666] uppercase mb-2">DIAGNOSTIC TRIGGER</h4>
                <p className="font-display text-[#ccc] text-sm italic">
                  "{selectedEntry.use_when}"
                </p>
              </div>

              {/* The Script */}
              <div>
                <h3 className="font-pixel text-xs text-gold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  THE SCRIPT
                </h3>
                <div className="bg-[#151515] border border-[#222] p-6 rounded-sm relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-50" />
                  <p className="font-serif text-xl text-[#e6c885] leading-relaxed whitespace-pre-wrap">
                    {selectedEntry.script}
                  </p>
                </div>
              </div>

              {/* The Protocol */}
              <div>
                <h3 className="font-pixel text-xs text-[#888] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#444] rounded-full" />
                  EXECUTION PROTOCOL
                </h3>
                <div className="space-y-4">
                  {selectedEntry.protocol.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 border border-[#333] flex items-center justify-center text-[10px] font-pixel text-[#555]">
                        {i + 1}
                      </div>
                      <p className="font-display text-[#aaa] text-sm pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why It Works (Collapsible) */}
              {selectedEntry.why_it_works && (
                <div className="border-t border-[#222] pt-6 mt-8">
                  <h4 className="font-pixel text-[9px] text-[#444] uppercase mb-2">SOURCE CODE // WHY IT WORKS</h4>
                  <p className="font-display text-[#666] text-xs leading-relaxed">
                    {selectedEntry.why_it_works}
                  </p>
                </div>
              )}

            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-[#222] bg-[#0c0c0c] flex justify-between items-center">
              <button className="text-[10px] font-pixel text-[#555] hover:text-[#888] flex items-center gap-2">
                <span className="text-lg">♡</span> SAVE TO FAVORITES
              </button>
              <button className="bg-gold text-black px-6 py-2 font-pixel text-[10px] hover:bg-[#e6c885] shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                MARK AS COMPLETE
              </button>
            </div>

          </div>
        </div>
      )}

    </PluginShell>
  );
}
