import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";
import { CODEX_ENTRIES } from "@/lib/codex-data";
import { getBestCartridge, type GravitasSignal, type RankingRationale } from "@/lib/codex-ranking";
import CabinetDeck from "@/components/CabinetDeck";
import ReaderDrawer from "@/components/ReaderDrawer";
import { ReaderPanel } from "@/components/reader";
import CodexShelf from "@/components/CodexShelf";

/* ─────────────────────────────────────────────
   CODEX V5 — Full Cabinet Layout
   Hero image cabinet (pager bank + deck) on top,
   shelves below, all in one cohesive view.
   ───────────────────────────────────────────── */

interface GravitasScores {
  identity: number;
  relationship: number;
  vision: number;
  culture: number;
}

export default function Codex() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [loadedEntry, setLoadedEntry] = useState<CodexEntry | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [readerMode, setReaderMode] = useState<"READ" | "RUN">("READ");
  const [recentEntryIds, setRecentEntryIds] = useState<string[]>([]);
  const [gravitasScores, setGravitasScores] = useState<GravitasScores | null>(null);
  const [isReceivingSignal, setIsReceivingSignal] = useState(false);
  const [bottleneckCategory, setBottleneckCategory] = useState<string | null>(null);
  const [firstMove, setFirstMove] = useState<string | null>(null);
  const [rankingRationale, setRankingRationale] = useState<RankingRationale | null>(null);
  const [gravitasSignalData, setGravitasSignalData] = useState<GravitasSignal | null>(null);

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
    const firstMoveParam = params.get("firstMove");

    if (signal === "received") {
      setIsReceivingSignal(true);
      setBottleneckCategory(bottleneck);
      if (firstMoveParam) setFirstMove(decodeURIComponent(firstMoveParam));
      import("@/lib/CodexAudio").then(({ codexAudio }) => {
        codexAudio.playLoad();
      });

      if (bottleneck) {
        // Build a GravitasSignal from stored results + URL params
        const savedResults = localStorage.getItem("gravityCheckResults");
        let gravitasSignal: GravitasSignal | null = null;
        if (savedResults) {
          try {
            const r = JSON.parse(savedResults);
            gravitasSignal = {
              identity: r.identity ?? 3,
              relationship: r.relationship ?? 3,
              vision: r.vision ?? 3,
              culture: r.culture ?? 3,
              leak: bottleneck,
              force: r.force ?? "",
              firstMove: firstMoveParam ? decodeURIComponent(firstMoveParam) : (r.firstMove ?? ""),
              total: r.total ?? 12,
            };
          } catch {}
        }

        // Use ranking function if we have a full signal, otherwise fall back
        let targetEntry: CodexEntry;
        if (gravitasSignal) {
          const best = getBestCartridge(CODEX_ENTRIES, gravitasSignal);
          targetEntry = best ? best.entry : CODEX_ENTRIES[0];
          // Store rationale for pager telemetry + log for debugging
          if (best) {
            setRankingRationale(best.rationale);
            console.log("[Codex Ranking] Top cartridge:", best.entry.title, "Score:", best.score);
            console.log("[Codex Ranking] Rationale:", best.rationale);
          }
          setGravitasSignalData(gravitasSignal);
        } else {
          // Fallback: simple bottleneck mapping if no stored results
          let targetId = "";
          switch (bottleneck) {
            case "IDENTITY": targetId = "MOVE_NAME_THE_COST"; break;
            case "RELATIONSHIP": targetId = "MOVE_REPAIR_48H"; break;
            case "VISION": targetId = "MOVE_STOP_LIST"; break;
            case "CULTURE": targetId = "MOVE_MEETING_REWRITE"; break;
            default: targetId = "MOVE_REPAIR_48H";
          }
          targetEntry = CODEX_ENTRIES.find((e) => e.id === targetId) || CODEX_ENTRIES[0];
        }
        setTimeout(() => {
          handleLoad(targetEntry);
          setIsReceivingSignal(false);
        }, 3000);
      } else {
        setTimeout(() => setIsReceivingSignal(false), 2500);
      }
      window.history.replaceState({}, "", "/codex");
    }

    // Parse GRAVITAS scores
    const savedResults = localStorage.getItem("gravityCheckResults");
    if (savedResults) {
      try {
        const results = JSON.parse(savedResults);
        setGravitasScores({
          identity: results.identity,
          relationship: results.relationship,
          vision: results.vision,
          culture: results.culture,
        });
        // Find bottleneck
        const scores = [
          { category: "Identity", score: results.identity },
          { category: "Relationship", score: results.relationship },
          { category: "Vision", score: results.vision },
          { category: "Culture", score: results.culture },
        ];
        scores.sort((a, b) => a.score - b.score);
        setBottleneckCategory(scores[0].category);
      } catch {
        setGravitasScores(null);
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
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-amber-900 selection:text-amber-50">
      <div className="w-full max-w-6xl mx-auto">

        {/* ── CABINET DECK (Hero image with overlays) ── */}
        <CabinetDeck
          loadedEntry={loadedEntry}
          onEject={handleEject}
          onRead={handleRead}
          onRun={handleRun}
          isReaderOpen={isReaderOpen}
          gravitasScores={gravitasScores}
          isReceivingSignal={isReceivingSignal}
          bottleneckCategory={bottleneckCategory}
          firstMove={firstMove}
          rankingRationale={rankingRationale}
          gravitasSignalData={gravitasSignalData}
        />

        {/* ── SHELVES (directly below cabinet, no gap) ── */}
        <div className={cn(
          "relative -mt-1 transition-all duration-500",
          isReaderOpen ? "opacity-40 pointer-events-none blur-[1px]" : "opacity-100"
        )}>
          <CodexShelf
            entries={CODEX_ENTRIES}
            loadedEntryId={loadedEntry?.id || null}
            onLoad={handleLoad}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            recentEntryIds={recentEntryIds}
          />
        </div>
      </div>

      {/* ── READER PANEL (Lantern Panel) ── */}
      {loadedEntry && (
        <ReaderPanel
          entry={loadedEntry}
          isOpen={isReaderOpen}
          onClose={() => setIsReaderOpen(false)}
          initialMode={readerMode}
        />
      )}
    </div>
  );
}
