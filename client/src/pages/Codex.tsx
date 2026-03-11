import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";
import { CODEX_ENTRIES } from "@/lib/codex-data";
import CodexShell from "@/components/CodexShell";
import ReaderDrawer from "@/components/ReaderDrawer";
import CodexShelf from "@/components/CodexShelf";

/* Flywheel-based categories for the shelf */
const SHELF_CATEGORIES = ["ALL", "IDENTITY", "RELATIONSHIP", "VISION", "CULTURE"] as const;

export default function Codex() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [loadedEntry, setLoadedEntry] = useState<CodexEntry | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [readerMode, setReaderMode] = useState<"READ" | "RUN">("READ");
  const [recentEntryIds, setRecentEntryIds] = useState<string[]>([]);
  const [hasGravityResults, setHasGravityResults] = useState(false);
  const [isReceivingSignal, setIsReceivingSignal] = useState(false);
  const [bottleneckReason, setBottleneckReason] = useState<string>("");

  // Load recent entries from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("codexRecentEntries");
      if (saved) setRecentEntryIds(JSON.parse(saved));
    } catch {}
  }, []);

  // Save recent entries when they change
  const addToRecent = (entryId: string) => {
    setRecentEntryIds((prev) => {
      const updated = [entryId, ...prev.filter((id) => id !== entryId)].slice(0, 5);
      localStorage.setItem("codexRecentEntries", JSON.stringify(updated));
      return updated;
    });
  };

  // Load GRAVITAS Results & Signal Handling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const signal = params.get("signal");
    const bottleneck = params.get("bottleneck");

    if (signal === "received") {
      setIsReceivingSignal(true);
      import("@/lib/CodexAudio").then(({ codexAudio }) => {
        codexAudio.playLoad();
      });

      if (bottleneck) {
        let targetId = "";
        switch (bottleneck) {
          case "IDENTITY": targetId = "MOVE_NAME_THE_COST"; break;
          case "RELATIONSHIP": targetId = "MOVE_REPAIR_48H"; break;
          case "VISION": targetId = "MOVE_STOP_LIST"; break;
          case "CULTURE": targetId = "MOVE_MEETING_REWRITE"; break;
          default: targetId = "MOVE_REPAIR_48H";
        }
        const targetEntry = CODEX_ENTRIES.find((e) => e.id === targetId) || CODEX_ENTRIES[0];
        setTimeout(() => {
          handleLoad(targetEntry);
          setIsReceivingSignal(false);
        }, 3000);
      } else {
        setTimeout(() => setIsReceivingSignal(false), 2500);
      }
      window.history.replaceState({}, "", "/codex");
    }

    const savedResults = localStorage.getItem("gravityCheckResults");
    if (savedResults) {
      setHasGravityResults(true);
      try {
        const results = JSON.parse(savedResults);
        const scores = [
          { category: "Identity", score: results.identity },
          { category: "Relationship", score: results.relationship },
          { category: "Vision", score: results.vision },
          { category: "Culture", score: results.culture },
        ];
        scores.sort((a, b) => a.score - b.score);
        const lowest = scores[0];
        setBottleneckReason(`Low ${lowest.category} Score detected`);
      } catch {
        setHasGravityResults(false);
      }
    }
  }, []);

  // Sound Effects
  const playSound = (type: "load" | "eject" | "click") => {
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
    addToRecent(entry.id);
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
      <div
        className={cn(
          "flex flex-col h-full w-full gap-4 overflow-y-auto pr-2 pb-20 scrollbar-thin scrollbar-thumb-amber-900/20 scrollbar-track-transparent transition-all duration-500",
          isReaderOpen ? "opacity-40 pointer-events-none blur-[1px]" : "opacity-100"
        )}
      >
        {/* ── SIGNAL ACQUISITION OVERLAY ── */}
        {isReceivingSignal && (
          <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center font-pixel text-amber-500 backdrop-blur-md">
            <div className="text-2xl md:text-4xl mb-8 animate-pulse tracking-[0.2em] text-center px-4">
              SIGNAL RECEIVED:{" "}
              {new URLSearchParams(window.location.search).get("bottleneck") || "UNKNOWN"}
            </div>
            <div className="text-sm md:text-base mb-4 text-amber-500/80 tracking-widest">
              AUTO-LOADING PROTOCOL...
            </div>
            <div className="w-64 h-1 bg-amber-900/30 rounded-full overflow-hidden border border-amber-900/50">
              <div
                className="h-full bg-amber-500 animate-[width_2.5s_ease-in-out_forwards] shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        )}

        {/* ── GRAVITAS PROMPT (No Results) ── */}
        {!hasGravityResults && (
          <div
            className={cn(
              "bg-[#0a0a0a]/60 border border-dashed border-amber-900/30 p-4 rounded-sm flex items-center justify-between gap-4 transition-opacity duration-500",
              loadedEntry ? "opacity-30 pointer-events-none" : "opacity-100"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-amber-900/50 rounded-full flex items-center justify-center animate-pulse flex-shrink-0">
                <span className="text-amber-900 text-sm">!</span>
              </div>
              <div>
                <h3 className="font-pixel text-[9px] text-amber-900 tracking-widest uppercase">
                  Calibration Required
                </h3>
                <p className="font-mono text-[10px] text-[#666] mt-0.5">
                  Run GRAVITAS to unlock personalized protocol recommendations.
                </p>
              </div>
            </div>
            <Link href="/gravity-check">
              <button className="px-4 py-2 bg-amber-900/10 border border-amber-900/30 text-amber-500 font-pixel text-[8px] tracking-widest hover:bg-amber-900/20 hover:border-amber-500/50 transition-all uppercase whitespace-nowrap">
                Initiate
              </button>
            </Link>
          </div>
        )}

        {/* ── GRAVITAS RESULTS BANNER ── */}
        {hasGravityResults && bottleneckReason && (
          <div
            className={cn(
              "bg-amber-900/5 border border-amber-900/20 p-3 rounded-sm flex items-center gap-3 transition-opacity duration-500",
              loadedEntry ? "opacity-30 pointer-events-none" : "opacity-100"
            )}
          >
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />
            <span className="font-mono text-[10px] text-amber-500/70 italic">
              {bottleneckReason}
            </span>
          </div>
        )}

        {/* ── THE SHELF (filter tabs are now built into the shelf trim) ── */}
        <CodexShelf
          entries={CODEX_ENTRIES}
          loadedEntryId={loadedEntry?.id || null}
          onLoad={handleLoad}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          recentEntryIds={recentEntryIds}
        />
      </div>

      {/* ── READER DRAWER ── */}
      {loadedEntry && (
        <ReaderDrawer
          entry={loadedEntry}
          isOpen={isReaderOpen}
          onClose={() => setIsReaderOpen(false)}
          initialMode={readerMode}
        />
      )}
    </CodexShell>
  );
}
