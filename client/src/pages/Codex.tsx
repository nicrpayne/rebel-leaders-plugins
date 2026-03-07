import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";
import { CODEX_ENTRIES } from "@/lib/codex-data";
import CodexShell from "@/components/CodexShell";
import ReaderDrawer from "@/components/ReaderDrawer";

export default function Codex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [loadedEntry, setLoadedEntry] = useState<CodexEntry | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [readerMode, setReaderMode] = useState<"READ" | "RUN">("READ");
  const [recommendedEntries, setRecommendedEntries] = useState<CodexEntry[]>([]);
  const [hasGravityResults, setHasGravityResults] = useState(false);
  const [isReceivingSignal, setIsReceivingSignal] = useState(false);

  // Load Gravity Check Results & Filter Recommendations
  useEffect(() => {
    // Check for signal transmission
    const params = new URLSearchParams(window.location.search);
    const signal = params.get("signal");
    const bottleneck = params.get("bottleneck");

    if (signal === "received") {
      setIsReceivingSignal(true);
      // Play signal sound
      import("@/lib/CodexAudio").then(({ codexAudio }) => {
        codexAudio.playLoad(); // Use load sound for signal
      });
      
      // Auto-Load Logic
      if (bottleneck) {
        // Map bottleneck to specific protocol ID
        let targetId = "";
        switch (bottleneck) {
          case "IDENTITY": targetId = "MOVE_NAME_THE_COST"; break; // "Truth Weather" or similar
          case "RELATIONSHIP": targetId = "MOVE_REPAIR_48H"; break;
          case "VISION": targetId = "MOVE_STOP_LIST"; break;
          case "CULTURE": targetId = "MOVE_MEETING_REWRITE"; break;
          default: targetId = "MOVE_REPAIR_48H";
        }

        const targetEntry = CODEX_ENTRIES.find(e => e.id === targetId) || CODEX_ENTRIES[0];
        
        // Sequence: Signal (2.5s) -> Load (0.5s) -> Ready
        setTimeout(() => {
          setLoadedEntry(targetEntry);
          playSound("load");
          setIsReceivingSignal(false);
        }, 3000); // Increased to 3s for better pacing
      } else {
         setTimeout(() => setIsReceivingSignal(false), 2500);
      }
      
      // Clear URL
      window.history.replaceState({}, "", "/codex");
    }

    const savedResults = localStorage.getItem("gravityCheckResults");
    if (savedResults) {
      setHasGravityResults(true);
      // Filter recommendations based on bottleneck if available, otherwise show generic
      // For now, we'll just keep the existing logic or improve it later
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

  // Sound Effects
  const playSound = (type: "load" | "eject" | "click") => {
    // Use synthesized audio engine for reliability
    import("@/lib/CodexAudio").then(({ codexAudio }) => {
      switch (type) {
        case "load": codexAudio.playLoad(); break;
        case "eject": codexAudio.playEject(); break;
        case "click": codexAudio.playClick(); break;
      }
    });
  };

  // Interaction Handlers
  const handleLoad = (entry: CodexEntry) => {
    setLoadedEntry(entry);
    playSound("load");
  };

  const handleEject = () => {
    setLoadedEntry(null);
    setIsReaderOpen(false);
    playSound("eject");
  };

  const handleRead = () => {
    if (loadedEntry) {
      setReaderMode("READ");
      setIsReaderOpen(true);
      playSound("click");
    }
  };

  const handleRun = () => {
    if (loadedEntry) {
      setReaderMode("RUN");
      setIsReaderOpen(true);
    }
  };

  return (
    <CodexShell 
      title="THE CODEX" 
      category="ARCHIVE" 
      status={isReceivingSignal ? "RECEIVING..." : "ONLINE"}
      statusColor={isReceivingSignal ? "text-amber-500 animate-pulse" : "text-amber-900"}
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
      loadedEntry={loadedEntry}
      onEject={handleEject}
      onRead={handleRead}
      onRun={handleRun}
      isReaderOpen={isReaderOpen}
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
          <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center font-pixel text-amber-500 backdrop-blur-md">
            <div className="text-2xl md:text-4xl mb-8 animate-pulse tracking-[0.2em] text-center px-4">
              SIGNAL RECEIVED: {new URLSearchParams(window.location.search).get("bottleneck") || "UNKNOWN"}
            </div>
            <div className="text-sm md:text-base mb-4 text-amber-500/80 tracking-widest">
              AUTO-LOADING PROTOCOL...
            </div>
            <div className="w-64 h-1 bg-amber-900/30 rounded-full overflow-hidden border border-amber-900/50">
              <div className="h-full bg-amber-500 animate-[width_2.5s_ease-in-out_forwards] shadow-[0_0_10px_rgba(245,158,11,0.8)]" style={{ width: "0%" }} />
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
                  onClick={() => handleLoad(entry)}
                  className={cn(
                    "group relative bg-[#0a0a0a] border p-4 cursor-pointer transition-all duration-300 flex gap-4 items-center",
                    loadedEntry?.id === entry.id 
                      ? "border-amber-500 bg-amber-900/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]" 
                      : "border-amber-500/30 hover:border-amber-500 hover:bg-[#111]"
                  )}
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
                  
                  <div className="text-amber-500/50 group-hover:text-amber-500">
                    {loadedEntry?.id === entry.id ? "LOADED" : "LOAD"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- MAIN LIBRARY GRID - "DATA CARTRIDGES" --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 px-2">
          {filteredEntries.map((entry, index) => (
            <div 
              key={entry.id}
              onClick={() => handleLoad(entry)}
              className={cn(
                "group relative aspect-[1200/260] cursor-pointer transition-all duration-200",
                loadedEntry?.id === entry.id 
                  ? "translate-y-0 opacity-100 ring-2 ring-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)] z-10" 
                  : "hover:-translate-y-1 hover:brightness-110 opacity-80 hover:opacity-100"
              )}
            >
              {/* Rack Slot Background (Rails) */}
              <div className="absolute -inset-1 border border-amber-900/10 rounded-sm pointer-events-none" />
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 font-pixel text-[6px] text-amber-900/30 -rotate-90">
                {index % 2 === 0 ? `A${Math.floor(index/2) + 1}` : `B${Math.floor(index/2) + 1}`}
              </div>
              {/* Cartridge Body Image */}
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_body-C4DC7BQ3WfAArvo6KbDhyY.webp"
                alt="Cartridge"
                className="absolute inset-0 w-full h-full object-contain drop-shadow-md"
              />

              {/* Label Strip Image */}
              <div className="absolute top-[15%] left-[5%] right-[15%] bottom-[15%] flex items-center">
                 <img 
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_label_strip-LwPDAbUA3zduFwXko3kUQC.webp"
                    alt="Label"
                    className="absolute inset-0 w-full h-full object-contain opacity-90"
                 />
                 
                 {/* Dynamic Label Text */}
                 <div className="relative z-20 w-full h-full flex items-center px-4 md:px-8 gap-3">
                    {/* ID Area */}
                    <div className="w-[20%] flex justify-center">
                      <span className="font-mono text-[8px] md:text-[10px] text-amber-900/80 font-bold tracking-tighter rotate-90 md:rotate-0">
                        {entry.id}
                      </span>
                    </div>
                    
                    {/* Title Area */}
                    <div className="flex-1 pl-3 border-l border-amber-900/40 overflow-hidden">
                      <h3 className="font-serif text-xs md:text-sm text-[#3d2409] font-black truncate uppercase tracking-wide drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]">
                        {entry.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                         <span className="font-pixel text-[6px] md:text-[8px] text-[#5c3a15] font-bold uppercase truncate">
                           {entry.category}
                         </span>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* --- READER DRAWER (Slide-Over) --- */}
      {loadedEntry && (
        <ReaderDrawer 
          entry={loadedEntry}
          isOpen={isReaderOpen}
          initialMode={readerMode}
          onClose={() => setIsReaderOpen(false)}
        />
      )}
    </CodexShell>
  );
}
