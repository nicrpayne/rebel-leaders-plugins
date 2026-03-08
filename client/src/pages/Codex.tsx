import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";
import { CODEX_ENTRIES } from "@/lib/codex-data";
import CodexShell from "@/components/CodexShell";
import ReaderDrawer from "@/components/ReaderDrawer";
import CodexGridCard from "@/components/CodexGridCard";
import CodexTopBar from "@/components/CodexTopBar";
import CodexGrid from "@/components/CodexGrid";

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
        // If not enough, fill with others
        let recs = CODEX_ENTRIES.filter(e => e.category === lowest.category);
        
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
        <CodexTopBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          isDimmed={!!loadedEntry}
        />

        {/* --- RECOMMENDATION ENGINE (SIDE-CHAIN PAYOFF) --- */}
        {hasGravityResults && recommendedEntries.length > 0 && !searchQuery && activeCategory === "ALL" && (
          <div className={cn(
            "mb-4 bg-amber-900/5 border border-amber-900/20 p-4 rounded-sm relative overflow-hidden transition-opacity duration-500",
            loadedEntry ? "opacity-30 pointer-events-none" : "opacity-100" // Dim when loaded
          )}>
            <div className="absolute top-0 right-0 p-2 opacity-20">
                <div className="w-16 h-16 border-2 border-amber-500 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 border border-amber-500 rounded-full" />
                </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <div className="w-2 h-2 bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              <h3 className="font-pixel text-[10px] text-amber-500 tracking-[0.2em] uppercase">
                Priority Transmission
              </h3>
            </div>
            
            {/* Reason Line */}
            <div className="mb-4 relative z-10">
               <p className="font-mono text-xs text-amber-500/70 italic">
                 {bottleneckReason}
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              {recommendedEntries.map(entry => (
                <CodexGridCard
                  key={entry.id}
                  entry={entry}
                  isActive={loadedEntry?.id === entry.id}
                  onClick={() => handleLoad(entry)}
                />
              ))}
            </div>
          </div>
        )}

        {/* --- CALIBRATION REQUIRED (Empty State) --- */}
        {!hasGravityResults && !searchQuery && activeCategory === "ALL" && (
           <div className={cn(
            "mb-4 bg-[#0a0a0a] border border-dashed border-amber-900/30 p-6 rounded-sm flex flex-col items-center justify-center text-center gap-4 transition-opacity duration-500",
            loadedEntry ? "opacity-30 pointer-events-none" : "opacity-100"
           )}>
              <div className="w-12 h-12 border border-amber-900/50 rounded-full flex items-center justify-center animate-pulse">
                 <span className="text-amber-900 text-xl">!</span>
              </div>
              <div>
                 <h3 className="font-pixel text-xs text-amber-900 tracking-widest uppercase mb-2">Calibration Required</h3>
                 <p className="font-mono text-sm text-[#666] max-w-md">
                    Codex is operating in passive mode. Run a Gravity Check to unlock personalized protocol recommendations.
                 </p>
              </div>
              <Link href="/gravity-check">
                 <button className="px-6 py-2 bg-amber-900/10 border border-amber-900/30 text-amber-500 font-pixel text-[10px] tracking-widest hover:bg-amber-900/20 hover:border-amber-500/50 transition-all uppercase">
                    Initiate Gravity Check
                 </button>
              </Link>
           </div>
        )}

        {/* --- PROTOCOL GRID --- */}
        <CodexGrid 
          entries={filteredEntries}
          loadedEntryId={loadedEntry?.id || null}
          onLoad={handleLoad}
        />

      </div>

      {/* --- READER DRAWER --- */}
      {loadedEntry && (
        <ReaderDrawer 
          entry={loadedEntry}
          isOpen={isReaderOpen}
          onClose={() => {
            setIsReaderOpen(false);
            // Optional: Revert to READ mode on close? Or keep state?
            // Keeping state allows resuming where left off.
          }}
          initialMode={readerMode}
        />
      )}
    </CodexShell>
  );
}
