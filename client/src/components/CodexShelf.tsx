import { useRef } from "react";
import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";
import { FlywheelNode } from "@/lib/codex-schema";

/* ─────────────────────────────────────────────
   SHELF CATEGORY CONFIG
   Top shelf: Identity + Relationship
   Bottom shelf: Vision + Culture
   ───────────────────────────────────────────── */
const TOP_SHELF_SECTIONS: { key: FlywheelNode; label: string }[] = [
  { key: "Identity",     label: "IDENTITY" },
  { key: "Relationship", label: "RELATIONSHIP" },
];

const BOTTOM_SHELF_SECTIONS: { key: FlywheelNode; label: string }[] = [
  { key: "Vision",  label: "VISION" },
  { key: "Culture", label: "CULTURE" },
];

const ALL_SECTIONS = [...TOP_SHELF_SECTIONS, ...BOTTOM_SHELF_SECTIONS];

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
  return (
    <button
      onClick={onClick}
      disabled={isLoaded}
      className={cn(
        "relative flex-shrink-0 group transition-all duration-300 ease-out cursor-pointer",
        "w-[63px] md:w-[74px] lg:w-[80px] h-[205px] md:h-[238px] lg:h-[272px]",
        // Pull up so it sits ON TOP of the shelf ledge, ledge visible below
        "mb-[80px] md:mb-[86px] lg:mb-[90px]",
        // Negative horizontal margin to pack spines tightly
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
      <div
        className="absolute top-1/2 left-1/2 overflow-hidden rounded-[3px]"
        style={{
          width: "205px",
          height: "63px",
          transform: "translate(-50%, -50%) rotate(90deg)",
        }}
      >
        <img
          src={SPINE_CDN}
          alt={entry.title}
          className="absolute inset-0 w-full h-full object-fill drop-shadow-[2px_4px_8px_rgba(0,0,0,0.7)]"
          draggable={false}
        />
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
   SHELF FILTER BAR (Built into the shelf trim)
   Uses generated bronze/wood trim texture image
   Embossed text with warm amber light bleed
   ───────────────────────────────────────────── */
const FILTER_TABS = [
  { key: "ALL",          label: "ALL" },
  { key: "IDENTITY",     label: "IDENTITY" },
  { key: "RELATIONSHIP", label: "RELATIONSHIP" },
  { key: "VISION",       label: "VISION" },
  { key: "CULTURE",      label: "CULTURE" },
];

function ShelfFilterBar({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}) {
  return (
    <div className="relative w-full">
      {/* Trim texture background — the physical molding strip */}
      <div
        className="relative flex items-stretch justify-center gap-0 overflow-hidden"
        style={{
          backgroundImage: "url('/assets/trim_bar_texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: [
            "0 4px 12px rgba(0,0,0,0.5)",          // cast shadow below onto shelf
            "0 8px 24px rgba(0,0,0,0.3)",           // softer, wider shadow spread
            "inset 0 2px 4px rgba(0,0,0,0.3)",      // top inner shadow (recessed top edge)
            "inset 0 -1px 3px rgba(0,0,0,0.2)",     // bottom inner shadow
          ].join(", "),
        }}
      >
        {/* Darken overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />

        {/* ── TOP GOLD ACCENT STRIP — worn brass inlay ── */}
        {/* Dark recess above the gold line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none z-[2]"
          style={{
            background: "linear-gradient(to bottom, rgba(10,7,4,0.7) 0%, rgba(15,10,6,0.3) 100%)",
          }}
        />
        {/* The gold strip itself — warm, slightly uneven */}
        <div
          className="absolute top-[3px] left-0 right-0 h-[2px] pointer-events-none z-[2]"
          style={{
            background: "linear-gradient(to right, rgba(120,90,40,0.15) 0%, rgba(180,140,60,0.4) 8%, rgba(200,160,70,0.5) 20%, rgba(170,130,55,0.35) 35%, rgba(195,155,65,0.5) 50%, rgba(175,135,55,0.4) 65%, rgba(200,160,70,0.5) 80%, rgba(180,140,60,0.4) 92%, rgba(120,90,40,0.15) 100%)",
          }}
        />
        {/* Warm glow bleeding from the top gold strip */}
        <div
          className="absolute top-[3px] left-[5%] right-[5%] h-[6px] pointer-events-none z-[1]"
          style={{
            background: "linear-gradient(to right, transparent, rgba(200,155,55,0.08) 20%, rgba(210,165,60,0.1) 50%, rgba(200,155,55,0.08) 80%, transparent)",
            filter: "blur(2px)",
          }}
        />

        {/* ── BOTTOM GOLD ACCENT STRIP — worn brass inlay ── */}
        {/* The gold strip itself — warm, slightly uneven */}
        <div
          className="absolute bottom-[3px] left-0 right-0 h-[2px] pointer-events-none z-[2]"
          style={{
            background: "linear-gradient(to right, rgba(120,90,40,0.15) 0%, rgba(175,135,55,0.35) 10%, rgba(195,155,65,0.5) 25%, rgba(180,140,60,0.4) 40%, rgba(200,160,70,0.5) 55%, rgba(175,135,55,0.35) 70%, rgba(195,155,65,0.5) 85%, rgba(175,135,55,0.35) 95%, rgba(120,90,40,0.15) 100%)",
          }}
        />
        {/* Dark recess below the gold line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none z-[2]"
          style={{
            background: "linear-gradient(to top, rgba(10,7,4,0.7) 0%, rgba(15,10,6,0.3) 100%)",
          }}
        />
        {/* Warm glow bleeding from the bottom gold strip */}
        <div
          className="absolute bottom-[1px] left-[5%] right-[5%] h-[6px] pointer-events-none z-[1]"
          style={{
            background: "linear-gradient(to right, transparent, rgba(200,155,55,0.06) 20%, rgba(210,165,60,0.08) 50%, rgba(200,155,55,0.06) 80%, transparent)",
            filter: "blur(3px)",
          }}
        />

        {FILTER_TABS.map((tab, idx) => {
          const isActive = activeCategory === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onCategoryChange(tab.key)}
              className={cn(
                "relative flex-1 py-3 md:py-3.5 lg:py-4 cursor-pointer transition-all duration-500 z-[1]",
                // No borders — divisions are implied by light and shadow
                isActive ? "z-10" : ""
              )}
            >
              {/* ── ACTIVE STATE: text-centric warm glow ── */}
              {isActive && (
                <>
                  {/* Tight glow hugging the text — the text is the light source */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse 35% 50% at 50% 50%, rgba(220,165,50,0.14) 0%, transparent 100%)",
                    }}
                  />
                  {/* Very subtle ambient warmth — just enough to tint the metal, not wash it out */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(200,150,40,0.06) 0%, transparent 100%)",
                    }}
                  />
                  {/* Bottom light spill — soft warm glow seeping down */}
                  <div
                    className="absolute -bottom-[2px] left-[15%] right-[15%] h-[6px] rounded-full pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(210,155,40,0.2) 0%, transparent 100%)",
                      filter: "blur(3px)",
                    }}
                  />
                  {/* Top edge subtle reflection */}
                  <div
                    className="absolute top-[1px] left-[20%] right-[20%] h-[1px] pointer-events-none"
                    style={{
                      background: "linear-gradient(to right, transparent, rgba(200,160,50,0.15) 30%, rgba(220,170,60,0.2) 50%, rgba(200,160,50,0.15) 70%, transparent)",
                    }}
                  />
                </>
              )}

              {/* ── INACTIVE STATE: very subtle warmth ── */}
              {!isActive && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 50%, rgba(120,90,40,0.04) 0%, transparent 70%)",
                  }}
                />
              )}

              {/* ── TAB DIVIDERS: subtle shadow lines between tabs (not borders) ── */}
              {idx > 0 && (
                <div
                  className="absolute left-0 top-[15%] bottom-[15%] w-[1px] pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 70%, transparent)",
                  }}
                />
              )}

              {/* ── LABEL TEXT: embossed/engraved into metal ── */}
              <span
                className={cn(
                  "relative z-10 font-pixel tracking-[0.18em] uppercase transition-all duration-500",
                  "text-[9px] md:text-[10px] lg:text-[11px]",
                )}
                style={isActive ? {
                  // Active: bright gold text — THE brightest element, light radiates from here
                  color: "#f0d264",
                  textShadow: [
                    "0 0 6px rgba(240,200,60,0.8)",    // tight hot glow right on the letters
                    "0 0 14px rgba(230,175,50,0.5)",   // medium spread
                    "0 0 30px rgba(210,155,40,0.2)",   // soft outer halo
                    "0 1px 0 rgba(0,0,0,0.6)",         // depth shadow below (engraved)
                    "0 -1px 0 rgba(255,230,150,0.2)",  // top highlight catch
                  ].join(", "),
                } : {
                  // Inactive: dim engraved text — recessed into the metal
                  color: "#6b5a42",
                  textShadow: [
                    "0 1px 0 rgba(80,65,40,0.3)",     // subtle bevel highlight below
                    "0 -1px 0 rgba(0,0,0,0.4)",       // shadow above (recessed)
                    "0 0 4px rgba(100,80,50,0.1)",     // very faint warmth
                  ].join(", "),
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SHELF RAIL (Front edge / lip of the shelf plank)
   Uses the generated wood rail texture but blends
   its top and bottom edges into the surrounding
   shelf wood so it reads as one continuous piece.
   ───────────────────────────────────────────── */
function ShelfRail() {
  return (
    <div className="relative w-full h-[22px] md:h-[26px] lg:h-[30px] z-[3]">
      {/* Texture layer — the real wood rail image */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: "url('/assets/shelf_rail_texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 45%",
        }}
      />
      {/* Top edge blend — fades the texture into the shelf above */}
      <div
        className="absolute top-0 left-0 right-0 h-[6px] md:h-[8px] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(30,22,14,0.7) 0%, transparent 100%)",
        }}
      />
      {/* Top highlight — warm light catching the rounded lip */}
      <div
        className="absolute top-[2px] left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent 5%, rgba(160,130,80,0.35) 20%, rgba(180,145,90,0.4) 50%, rgba(160,130,80,0.35) 80%, transparent 95%)",
        }}
      />
      {/* Bottom edge blend — fades the texture into the shelf below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[6px] md:h-[8px] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(10,8,5,0.8) 0%, rgba(20,15,10,0.4) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SHELF COMPONENT
   Two shelves: Top (Identity + Relationship standing)
                Bottom (Vision + Culture standing)
   Filter bar integrated into the trim above top shelf
   ───────────────────────────────────────────── */
interface CodexShelfProps {
  entries: CodexEntry[];
  loadedEntryId: string | null;
  onLoad: (entry: CodexEntry) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  recentEntryIds?: string[];
}

export default function CodexShelf({
  entries,
  loadedEntryId,
  onLoad,
  activeCategory,
  onCategoryChange,
  recentEntryIds = [],
}: CodexShelfProps) {
  const grouped = groupByFlywheel(entries);
  const scrollRefTop = useRef<HTMLDivElement>(null);
  const scrollRefBottom = useRef<HTMLDivElement>(null);

  // Determine which sections are visible based on active filter
  const getVisibleSections = (shelfSections: typeof TOP_SHELF_SECTIONS) => {
    if (activeCategory === "ALL") return shelfSections;
    return shelfSections.filter((s) => s.key.toUpperCase() === activeCategory);
  };

  const topVisible = getVisibleSections(TOP_SHELF_SECTIONS);
  const bottomVisible = getVisibleSections(BOTTOM_SHELF_SECTIONS);

  // Shelf structure is always visible — only contents change with filter

  return (
    <div className="relative w-full overflow-hidden rounded-sm">
      {/* Shelf Background Image — full coverage */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/codex_shelf_bg.png')",
          backgroundSize: "cover",
        }}
      />

      {/* Dark vignette overlay — organic, not uniform */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/25 via-transparent to-black/40 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-[2] flex flex-col">

        {/* ── INTEGRATED FILTER BAR (bronze trim with backlit tabs) ── */}
        <ShelfFilterBar
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />

        {/* ── TOP SHELF: Identity + Relationship cartridges (always rendered) ── */}
        <div className="px-4 md:px-5 lg:px-6 pt-2">
          <div
            ref={scrollRefTop}
            className="flex items-end gap-0 overflow-x-auto pb-0 pt-2 scrollbar-thin scrollbar-thumb-amber-900/30 scrollbar-track-transparent scroll-smooth h-[220px] md:h-[260px] lg:h-[300px]"
          >
            {topVisible.map((section) => {
              const sectionEntries = grouped[section.key];
              if (sectionEntries.length === 0) return null;
              return (
                <div key={section.key} className="flex items-end gap-0">
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
        </div>

        {/* ── SHELF RAIL between top and bottom ── */}
        <ShelfRail />

        {/* ── BOTTOM SHELF: Vision + Culture cartridges (always rendered) ── */}
        <div className="px-4 md:px-5 lg:px-6 pb-2">
          <div
            ref={scrollRefBottom}
            className="flex items-end gap-0 overflow-x-auto pb-0 pt-2 scrollbar-thin scrollbar-thumb-amber-900/30 scrollbar-track-transparent scroll-smooth h-[220px] md:h-[260px] lg:h-[300px]"
          >
            {bottomVisible.map((section) => {
              const sectionEntries = grouped[section.key];
              if (sectionEntries.length === 0) return null;
              return (
                <div key={section.key} className="flex items-end gap-0">
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
        </div>

        {/* ── BOTTOM RAIL (closes the cabinet) ── */}
        <ShelfRail />
      </div>
    </div>
  );
}
