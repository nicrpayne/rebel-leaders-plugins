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
  const [bottleneckReason, setBottleneckReason] = useState<string>("");

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
      try {
        const results = JSON.parse(savedResults);
        
        // Find lowest score
        const scores = [
          { category: "Identity", score: results.identity },
          { category: "Conflict", score: results.relationship }, // Map Relationship -> Conflict category
          { category: "Vision", score: results.vision },
          { category: "Culture", score: results.culture }
        ];
        
        // Sort by score ascending
        scores.sort((a, b) => a.score - b.score);
        const lowest = scores[0];
        
        // Set reason
        setBottleneckReason(`Reason: Low ${lowest.category} Score detected`);
        
        // Filter recommendations: Top 3 matching the lowest category
        let recs = CODEX_ENTRIES.filter(e => e.category === lowest.category);
        
        // Priority Logic: If Identity or Relationship, prioritize Coaching Pack (Core Protocols v1)
        // New Logic: Prioritize entries where trigger_point === "1:1" and/or leak_types contains dependency|low-agency|leader-bottleneck
        if (lowest.category === "Identity" || lowest.category === "Conflict") { // Conflict maps to Relationship in data
             recs.sort((a, b) => {
                 const aPriority = (a.trigger_point === "1:1" || a.leak_types.some(l => ["dependency", "low-agency", "leader-bottleneck"].includes(l))) ? 1 : 0;
                 const bPriority = (b.trigger_point === "1:1" || b.leak_types.some(l => ["dependency", "low-agency", "leader-bottleneck"].includes(l))) ? 1 : 0;
                 
                 if (aPriority !== bPriority) return bPriority - aPriority;
                 
                 // Secondary sort: Coaching Pack
                 const aIsCoaching = a.pack === "Core Protocols v1" ? 1 : 0;
                 const bIsCoaching = b.pack === "Core Protocols v1" ? 1 : 0;
                 return bIsCoaching - aIsCoaching;
             });
        }
        
        // If we need more, add from second lowest
        if (recs.length < 3 && scores[1]) {
           const secondary = CODEX_ENTRIES.filter(e => e.category === scores[1].category);
           recs = [...recs, ...secondary];
        }
        
        setRecommendedEntries(recs.slice(0, 3));
        
      } catch (e) {
        console.error("Failed to parse gravity results", e);
        setHasGravityResults(false);
      }
    }
  }, []);

  // Filter Logic
  const filteredEntries = CODEX_ENTRIES.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          entry.script.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === "COACHING") {
       // Coaching Filter Logic
       // trigger_point === "1:1" OR leak_types includes dependency|low-agency|leader-bottleneck OR title contains "Coaching"
       const is1on1 = entry.trigger_point === "1:1";
       const hasCoachingLeak = entry.leak_types.some(l => ["dependency", "low-agency", "leader-bottleneck"].includes(l));
       const hasCoachingTitle = entry.title.toLowerCase().includes("coaching");
       
       return matchesSearch && (is1on1 || hasCoachingLeak || hasCoachingTitle);
    }

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

  // Initialize Audio Context on first interaction
  useEffect(() => {
    const initAudio = () => {
      import("@/lib/CodexAudio").then(({ codexAudio }) => {
        codexAudio.resume();
      });
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
    
    window.addEventListener("click", initAudio);
    window.addEventListener("keydown", initAudio);
    
    return () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
  }, []);

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
           {/* Deck State Indicators (Visible when Reader is Open) */}
           {isReaderOpen && (
             <div className="flex gap-4 mr-4 animate-in fade-in duration-500">
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-pixel text-amber-500/50 tracking-widest">STATUS</span>
                  <span className="text-[10px] font-pixel text-amber-500 tracking-widest">LOADED</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-pixel text-amber-500/50 tracking-widest">MODE</span>
                  <span className="text-[10px] font-pixel text-amber-500 tracking-widest animate-pulse">
                    {readerMode}
                  </span>
                </div>
             </div>
           )}

           <div className="flex flex-col items-end">
              <span className="text-[8px] font-pixel text-amber-900/60 tracking-widest">BUFFER</span>
              <div className="w-16 h-1 bg-amber-900/20 rounded-full overflow-hidden">
                 <div className="h-full bg-amber-700/50 w-[40%]" />
              </div>
           </div>
        </div>
      }
    >
      <div className={cn(
        "flex flex-col h-full w-full gap-6 overflow-y-auto pr-2 pb-20 scrollbar-thin scrollbar-thumb-amber-900/20 scrollbar-track-transparent transition-all duration-500",
        isReaderOpen ? "opacity-40 pointer-events-none blur-[1px]" : "opacity-100" // Dim background when reader is open
      )}>
        
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
        <div className={cn(
          "flex flex-col md:flex-row gap-4 items-center justify-between border-b border-amber-900/20 pb-6 sticky top-0 bg-[#080808]/95 backdrop-blur z-30 pt-2 transition-opacity duration-500",
          loadedEntry ? "opacity-30 pointer-events-none" : "opacity-100" // Dim when loaded
        )}>
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
              className="w-full bg-[#050505] border border-amber-900/30 text-amber-500 font-mono text-xs py-2 pl-8 pr-4 focus:outline-none focus:border-amber-500/50 focus:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all placeholder-amber-900/50"
            />
            {/* Scanline effect on focus */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-amber-500/50 w-0 group-focus-within:w-full transition-all duration-500" />
          </div>

          {/* Category Tabs - "Sector Select" */}
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {["ALL", "COACHING", "CONFLICT", "VISION", "CULTURE", "IDENTITY", "ALIGNMENT"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "font-pixel text-[10px] tracking-widest px-3 py-1 transition-all whitespace-nowrap border border-transparent",
                  activeCategory === cat 
                    ? "text-amber-500 border-amber-500/30 bg-amber-900/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]" 
                    : "text-amber-900/60 hover:text-amber-500/80 hover:border-amber-900/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- PRIORITY TRANSMISSION (GRAVITY CHECK RESULTS) --- */}
        {hasGravityResults && recommendedEntries.length > 0 && !searchQuery && activeCategory === "ALL" && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-amber-500 animate-pulse rounded-full" />
              <h3 className="font-pixel text-xs text-amber-500 tracking-[0.2em] uppercase">
                PRIORITY TRANSMISSION
              </h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-900/50 to-transparent" />
            </div>
            
            {/* Reason Line */}
            <div className="mb-4 font-mono text-[10px] text-amber-500/70 uppercase tracking-widest pl-4 border-l border-amber-900/30">
               {bottleneckReason}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {recommendedEntries.map((entry, i) => (
                <div 
                  key={entry.id}
                  onClick={() => handleLoad(entry)}
                  className="group relative border border-amber-500/30 bg-amber-900/5 hover:bg-amber-900/10 transition-all cursor-pointer overflow-hidden h-48 flex flex-col justify-between p-5 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-amber-500/60"
                >
                  {/* Scanline Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
                  
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-pixel text-[8px] text-amber-500 tracking-widest">REC_0{i+1}</span>
                      <span className="font-mono text-[10px] text-amber-500/50">{entry.time_commitment}</span>
                    </div>
                    <h4 className="font-serif text-xl text-amber-100 leading-tight group-hover:text-amber-400 transition-colors">
                      {entry.title}
                    </h4>
                  </div>

                  <div className="flex justify-between items-end">
                     <div className="flex gap-1">
                        {entry.leak_types.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[8px] font-mono text-amber-900/60 uppercase border border-amber-900/20 px-1">
                            {tag.replace("-", " ")}
                          </span>
                        ))}
                     </div>
                     <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity font-pixel text-[10px] tracking-widest">
                        LOAD &gt;
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- MAIN LIBRARY GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntries.map((entry) => (
            <div 
              key={entry.id}
              onClick={() => handleLoad(entry)}
              className={cn(
                "group relative border border-[#222] bg-[#0a0a0a] hover:bg-[#111] transition-all cursor-pointer overflow-hidden h-32 flex flex-col justify-between p-4 hover:border-amber-900/40",
                loadedEntry?.id === entry.id ? "border-amber-500/50 bg-amber-900/10" : ""
              )}
            >
              <div className="flex justify-between items-start">
                <h4 className={cn(
                  "font-serif text-lg leading-tight transition-colors",
                  loadedEntry?.id === entry.id ? "text-amber-400" : "text-[#888] group-hover:text-[#ccc]"
                )}>
                  {entry.title}
                </h4>
                <span className="font-pixel text-[8px] text-[#444] group-hover:text-[#666] tracking-widest">
                  {entry.id.split("_")[1]}
                </span>
              </div>

              <div className="flex justify-between items-end">
                 <span className="font-mono text-[10px] text-[#444] group-hover:text-[#666] uppercase tracking-widest">
                    {entry.category} // {entry.time_commitment}
                 </span>
                 {loadedEntry?.id === entry.id && (
                    <span className="text-amber-500 font-pixel text-[8px] tracking-widest animate-pulse">
                       ACTIVE
                    </span>
                 )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEntries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-amber-900/40 font-mono text-sm">
            <span>NO PROTOCOLS FOUND</span>
            <span className="text-xs mt-2">ADJUST QUERY PARAMETERS</span>
          </div>
        )}

      </div>

      {/* --- READER DRAWER (The "Machine" Interface) --- */}
      {loadedEntry && (
        <ReaderDrawer 
          entry={loadedEntry}
          isOpen={isReaderOpen}
          onClose={() => {
             setIsReaderOpen(false);
             // Optional: Clear loaded entry on close? No, keep it loaded in deck.
          }}
          initialMode={readerMode}
        />
      )}
    </CodexShell>
  );
}
