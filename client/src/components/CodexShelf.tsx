import { useRef } from "react";
import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";
import { FlywheelNode } from "@/lib/codex-schema";

/* ─────────────────────────────────────────────
   SHELF CATEGORY CONFIG
   Maps flywheel nodes to display order & colors
   ───────────────────────────────────────────── */
const SHELF_SECTIONS: { key: FlywheelNode; label: string }[] = [
  { key: "Identity",     label: "IDENTITY" },
  { key: "Relationship", label: "RELATIONSHIP" },
  { key: "Vision",       label: "VISION" },
  { key: "Culture",      label: "CULTURE" },
];

/* ─────────────────────────────────────────────
   HELPER: Group entries by primary flywheel node
   ───────────────────────────────────────────── */
function groupByFlywheel(entries: CodexEntry[]): Record<FlywheelNode, CodexEntry[]> {
  const groups: Record<FlywheelNode, CodexEntry[]> = {
    Identity: [],
    Relationship: [],
    Vision: [],
    Culture: [],
  };
  entries.forEach((e) => {
    const primary = e.flywheel_node[0] || "Culture";
    groups[primary].push(e);
  });
  return groups;
}

/* ─────────────────────────────────────────────
   SPINE CARTRIDGE (Vertical, standing on shelf)
   Uses the exact cartridge spine image from the Load Bay
   ───────────────────────────────────────────── */
const SPINE_CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine_transparent_95539dfa.png";

interface SpineProps {
  entry: CodexEntry;
  isLoaded: boolean;
  onClick: () => void;
  tilt?: number;
  offsetY?: number;
}

function CartridgeSpine({ entry, isLoaded, onClick, tilt = 0, offsetY = 0 }: SpineProps) {
  // The spine image is naturally horizontal (1920x1072, ~1.79:1).
  // In the deck (LoadBay), it renders horizontally with object-fill.
  // On the shelf, we want it standing VERTICAL like a book spine.
  // Strategy: Create a horizontal inner container matching the image aspect ratio,
  // then rotate the entire inner container 90° so it stands upright.
  // The outer button is portrait-shaped to hold the rotated result.

  // Outer dimensions: portrait container that holds the rotated spine
  // Inner (pre-rotation): a horizontal rectangle matching the deck proportions
  // After 90° rotation: width becomes height and vice versa

  return (
    <button
      onClick={onClick}
      disabled={isLoaded}
      className={cn(
        "relative flex-shrink-0 group transition-all duration-300 ease-out cursor-pointer",
        // Portrait outer container: larger for label readability
        "w-[63px] md:w-[74px] lg:w-[80px] h-[205px] md:h-[238px] lg:h-[272px]",
        // Pull up so it sits ON TOP of the shelf ledge, ledge visible below
        "mb-[74px] md:mb-[80px] lg:mb-[84px]",
        // Negative horizontal margin to pack spines tightly (outer container is wider than visible spine)
        "-mx-[18px] md:-mx-[20px] lg:-mx-[22px]",
        isLoaded
          ? "opacity-0 pointer-events-none scale-95"
          : "opacity-100 hover:translate-y-[-8px] hover:brightness-125 active:scale-95"
      )}
      style={{
        transform: isLoaded ? undefined : `rotate(${tilt}deg) translateY(${offsetY}px)`,
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      title={entry.title}
    >
      {/* Rotated inner container: starts horizontal (matching spine aspect), then rotated 90° */}
      <div
        className="absolute top-1/2 left-1/2 overflow-hidden rounded-[3px]"
        style={{
          // Pre-rotation dimensions: horizontal rectangle
          // Width = outer height, Height = outer width (they swap after rotation)
          width: "205px",
          height: "63px",
          transform: "translate(-50%, -50%) rotate(90deg)",
        }}
      >
        {/* Spine image — rendered exactly like the deck: fill the container */}
        <img
          src={SPINE_CDN}
          alt={entry.title}
          className="absolute inset-0 w-full h-full object-fill drop-shadow-[2px_4px_8px_rgba(0,0,0,0.7)]"
          draggable={false}
        />

        {/* Text overlay — same approach as the deck, NOT rotated (already inside rotated container) */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none"
          style={{ transform: "rotate(-0.5deg)" }}
        >
          <span className="font-serif text-[#1a120a] text-[8px] md:text-[9px] lg:text-[10px] font-black uppercase leading-tight tracking-wider px-2 drop-shadow-[0_0_3px_rgba(230,220,195,1)] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] line-clamp-2">
            {entry.title}
          </span>
          <span className="font-mono text-[5px] md:text-[6px] text-[#2a1d10]/70 mt-0.5 tracking-tight font-bold drop-shadow-[0_0_2px_rgba(230,220,195,1)]">
            {entry.id}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────
   FLAT CARTRIDGE (Horizontal, laid on shelf)
   Same spine image, natural horizontal orientation
   ───────────────────────────────────────────── */
interface FlatSpineProps {
  entry: CodexEntry;
  isLoaded: boolean;
  onClick: () => void;
  tilt?: number;
}

function CartridgeFlat({ entry, isLoaded, onClick, tilt = 0 }: FlatSpineProps) {
  // Same physical object as CartridgeSpine, just not rotated (laid flat on its side)
  // The spine image is naturally horizontal, so we render it at the same dimensions
  // as the inner rotated container of CartridgeSpine: w=205, h=63 (at base size)
  return (
    <button
      onClick={onClick}
      disabled={isLoaded}
      className={cn(
        "relative flex-shrink-0 group transition-all duration-300 ease-out cursor-pointer",
        "w-[145px] md:w-[168px] lg:w-[190px] h-[44px] md:h-[52px] lg:h-[56px]",
        isLoaded
          ? "opacity-0 pointer-events-none scale-95"
          : "opacity-100 hover:translate-x-[4px] hover:brightness-125 active:scale-95"
      )}
      style={{ transform: `rotate(${tilt}deg)` }}
      title={entry.title}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[3px]">
        <img
          src={SPINE_CDN}
          alt={entry.title}
          className="absolute inset-0 w-full h-full object-fill drop-shadow-[2px_4px_8px_rgba(0,0,0,0.7)]"
          draggable={false}
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
        <span className="font-serif text-[#1a120a] text-[8px] md:text-[9px] lg:text-[10px] font-black uppercase leading-tight tracking-wider px-2 drop-shadow-[0_0_3px_rgba(230,220,195,1)] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] line-clamp-1">
          {entry.title}
        </span>
        <span className="font-mono text-[5px] md:text-[6px] text-[#2a1d10]/70 mt-0.5 tracking-tight font-bold drop-shadow-[0_0_2px_rgba(230,220,195,1)]">
          {entry.id}
        </span>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────
   SHELF SECTION LABEL (Category divider on shelf)
   ───────────────────────────────────────────── */
function ShelfLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center px-2 py-1.5 bg-[#1a1208]/90 border border-amber-900/40 rounded-[2px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] min-w-fit">
      <span className="font-pixel text-[7px] md:text-[8px] text-amber-600/80 tracking-[0.15em] uppercase whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WOOD SHELF RAIL (Horizontal divider)
   ───────────────────────────────────────────── */
function ShelfRail() {
  return (
    <div className="relative w-full h-[8px] my-1">
      {/* Main rail */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5d4037] via-[#4e342e] to-[#3e2723] rounded-[1px] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]" />
      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8d6e63]/40 to-transparent" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SHELF COMPONENT
   Category tabs are handled by the parent page.
   This component only renders the physical shelf.
   ───────────────────────────────────────────── */
interface CodexShelfProps {
  entries: CodexEntry[];
  loadedEntryId: string | null;
  onLoad: (entry: CodexEntry) => void;
  activeCategory: string;
  recentEntryIds?: string[];
}

export default function CodexShelf({
  entries,
  loadedEntryId,
  onLoad,
  activeCategory,
  recentEntryIds = [],
}: CodexShelfProps) {
  const grouped = groupByFlywheel(entries);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Deterministic "random" tilts per entry for the imperfect shelf feel
  const getTilt = (id: string, range: number) => {
    const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return ((hash % (range * 20)) - range * 10) / 10;
  };
  const getOffsetY = (id: string) => {
    const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return (hash % 8) - 4;
  };

  // Filter sections based on active category
  const visibleSections =
    activeCategory === "ALL"
      ? SHELF_SECTIONS
      : SHELF_SECTIONS.filter((s) => s.key.toUpperCase() === activeCategory);

  // Build the "recently used" / flat stack entries
  const flatEntries: CodexEntry[] = [];
  if (recentEntryIds.length > 0) {
    recentEntryIds.forEach((id) => {
      const found = entries.find((e) => e.id === id);
      if (found) flatEntries.push(found);
    });
  }
  if (flatEntries.length < 3) {
    const remaining = entries.filter((e) => !flatEntries.find((f) => f.id === e.id));
    const picks = remaining.slice(0, 3 - flatEntries.length);
    flatEntries.push(...picks);
  }

  return (
    <div className="relative w-full overflow-hidden rounded-sm border border-[#2a1d10]/50">
      {/* Shelf Background Image — full coverage */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/codex_shelf_bg.png')",
          backgroundSize: "cover",
        }}
      />

      {/* Dark vignette overlay */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-[2] flex flex-col pt-3 pr-3 pb-3 pl-4 md:pt-5 md:pr-5 md:pb-5 md:pl-5 lg:pt-6 lg:pr-6 lg:pb-6 lg:pl-6">

        {/* ── TOP SHELF: All cartridges grouped by flywheel category ── */}
        <div
          ref={scrollRef}
          className="flex items-end gap-0 overflow-x-auto pb-0 pt-2 scrollbar-thin scrollbar-thumb-amber-900/30 scrollbar-track-transparent scroll-smooth min-h-[220px] md:min-h-[260px] lg:min-h-[300px]"
        >
          {visibleSections.map((section, sIdx) => {
            const sectionEntries = grouped[section.key];
            if (sectionEntries.length === 0) return null;
            return (
              <div key={section.key} className="flex items-end gap-0">
                {/* Category divider labels removed from inline — shown on shelf rail instead */}
                {/* Cartridge spines */}
                {sectionEntries.map((entry) => (
                  <CartridgeSpine
                    key={entry.id}
                    entry={entry}
                    isLoaded={loadedEntryId === entry.id}
                    onClick={() => onLoad(entry)}
                    tilt={0}
                    offsetY={0}
                  />
                ))}
              </div>
            );
          })}
        </div>

        {/* ── SHELF RAIL ── */}
        <ShelfRail />

        {/* ── BOTTOM SHELF: Recommended + Recent stacks ── */}
        <div className="flex items-end gap-6 md:gap-8 px-8 md:px-10 lg:px-12 py-3 min-h-[80px] md:min-h-[100px]">
          {/* Single flat cartridge test — first entry */}
          {entries.length > 0 && (
            <CartridgeFlat
              entry={entries[0]}
              isLoaded={loadedEntryId === entries[0].id}
              onClick={() => onLoad(entries[0])}
              tilt={0}
            />
          )}
        </div>
      </div>
    </div>
  );
}
