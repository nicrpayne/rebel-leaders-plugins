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
   ASSET URLs
   ───────────────────────────────────────────── */
const SPINE_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/CsmUKCVLeilIqNNJ.png";
const STATUE_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/FLleLCCpIbXNFGAi.png";
const JOURNAL_1_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/zWRQfTmONtObpdxL.png";
const JOURNAL_2_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/azSuVoekkFnNjqzv.png";

/* ─────────────────────────────────────────────
   GLOBAL CARTRIDGE SIZING
   Change these to resize every cartridge at once.

   SPINE_HEIGHT — how tall each cartridge stands (px)
   SPINE_WIDTH  — how wide/thick each cartridge is (px)
   SPINE_GAP    — default gap between cartridges (px, negative = overlap)
   ───────────────────────────────────────────── */
const SPINE_HEIGHT = 270;
const SPINE_WIDTH  = 145;
const SPINE_GAP    = -8;

// The spine image is horizontal — we rotate it 90° to make it stand upright.
// These are the inner image container dimensions (swapped from the above).
const _CTR_W = SPINE_HEIGHT;
const _CTR_H = SPINE_WIDTH;

/* ─────────────────────────────────────────────
   CARTRIDGE ARRANGEMENT TYPE
   Controls the artistic placement of each cartridge.

   tilt      — lean in degrees. + = right, - = left.
   offsetY   — nudge up/down in px. + = down, - = up.
   offsetX   — nudge left/right in px. + = right, - = left.
               This is PURELY VISUAL — it does not affect the hitbox or neighbors.
               Use gapBefore to create real layout spacing instead.
   gapBefore — overrides the default SPINE_GAP before this cartridge only (px).
               Use this to create a visible gap at section breaks, or to
               pull a cartridge closer to its neighbor.
   useCenter — rotates from center instead of bottom. Use for flat/laid cartridges.
   ───────────────────────────────────────────── */
interface CartridgeArrangement {
  tilt: number;
  offsetY: number;
  offsetX: number;
  gapBefore?: number;
  useCenter?: boolean;
}

/* ─────────────────────────────────────────────
   TOP SHELF ARRANGEMENT
   Fresh baseline — all offsetX zeroed.
   Tilts and offsetY preserved from original art direction.
   gapBefore used for section break between Identity and Relationship.

   Tune from here. Small numbers — think ±5 to ±20 for fine nudges.
   ───────────────────────────────────────────── */
const TOP_SHELF_ARRANGEMENT: Record<string, CartridgeArrangement> = {
  // === IDENTITY SECTION ===
  MOVE_NAME_THE_COST:            { tilt: 0,    offsetY: 4,  offsetX: 0, gapBefore: -35 },
  MOVE_CLARITY_CONTRACT:         { tilt: 0,    offsetY: 4,  offsetX: 0, gapBefore: -105 },
  MOVE_FEEDFORWARD:              { tilt: 0,    offsetY: 4,  offsetX: 0, gapBefore: -100 },
  MOVE_BOUNDARY_NO_WITH_YES:     { tilt: -13,  offsetY: -2, offsetX: 0, gapBefore: -55 },

  // === RELATIONSHIP SECTION ===
  // gapBefore: 16 creates a visible section break
  MOVE_REPAIR_48H:               { tilt: 0.2,  offsetY: 0,  offsetX: 0, gapBefore: -110 },
  MOVE_MINORITY_REPORT:          { tilt: 0,    offsetY: 0,  offsetX: 0, gapBefore: -100 },
  MOVE_FRIDGE_RIGHTS_AUDIT:      { tilt: 0,    offsetY: 4,  offsetX: 0, gapBefore: -100 },
  MOVE_THE_MIRROR:               { tilt: 18,   offsetY: -1, offsetX: 0, gapBefore: -90 },
  MOVE_TRUST_MICRO_DEPOSIT:      { tilt: 20,   offsetY: -3, offsetX: 0, gapBefore: -100 },
  MOVE_COACHING_3_QUESTIONS:     { tilt: 0,    offsetY: 0,  offsetX: 0, gapBefore: -32 },
  MOVE_FEEDBACK_SBI:             { tilt: 0.3,  offsetY: 0,  offsetX: 0, gapBefore: -105 },
  MOVE_ACCOUNTABILITY_WITH_CARE: { tilt: -12,  offsetY: 1,  offsetX: 0, gapBefore: -58 },
  MOVE_RECOVER_AFTER_MISS:       { tilt: 12,   offsetY: 0,  offsetX: 0, gapBefore: -33 },
};

/* ─────────────────────────────────────────────
   BOTTOM SHELF ARRANGEMENT
   Bottom shelf was already clean (offsetX: 0 throughout).
   Preserved exactly as-is.
   ───────────────────────────────────────────── */
const BOTTOM_SHELF_ARRANGEMENT: Record<string, CartridgeArrangement> = {
  // === VISION SECTION ===
  // First 3 laid flat, stacked like a pile
  MOVE_DECISION_RIGHTS_MAP:  { tilt: -90, offsetY: 55,  offsetX: 0, useCenter: true, gapBefore: 45 },
  MOVE_STOP_LIST:            { tilt: -90, offsetY: 12,  offsetX: 0, useCenter: true, gapBefore: -130 },
  MOVE_DISAGREE_AND_COMMIT:  { tilt: -90, offsetY: -35, offsetX: 0, useCenter: true, gapBefore: -150 },
  // Remaining Vision standing upright
  MOVE_THE_ONE_THING:        { tilt: 0,    offsetY: -27, offsetX: 0, gapBefore: -20 },
  MOVE_NORTH_STAR_SENTENCE:  { tilt: 0.3,  offsetY: -25, offsetX: 0, gapBefore: -100 },
  MOVE_KILL_THE_GHOST_GOAL:  { tilt: -90, offsetY: 55, offsetX: 0, useCenter: true },
  MOVE_WIN_CONDITION:        { tilt: -90, offsetY: 14, offsetX: 0, useCenter: true, gapBefore: -143 },
  MOVE_TRADEOFF_TALK:        { tilt: -90, offsetY: -30, offsetX: 0, useCenter: true, gapBefore: -147 },
  // === CULTURE SECTION ===
  MOVE_TRUTH_WEATHER:        { tilt: -90, offsetY: -73, offsetX: 0, useCenter: true, gapBefore: -148 },
  MOVE_MEETING_REWRITE:      { tilt: -15,  offsetY: -30, offsetX: 0, gapBefore: 5 },
  MOVE_PERMISSION_SLIP:      { tilt: -17,  offsetY: -28, offsetX: 0, gapBefore: -100 },
  MOVE_SHADOW_NORMS:         { tilt: -90, offsetY: 55, offsetX: 0, useCenter: true, gapBefore: -30 },
  MOVE_ENERGY_LEAK_CHECK:    { tilt: 0,    offsetY: 1, offsetX: 0 },
  MOVE_SAFE_TO_SAY:          { tilt: 0.5,  offsetY: 0, offsetX: 0 },
};

/* ─────────────────────────────────────────────
   CARTRIDGE SPINE — 3-layer architecture

   Layer 1: <div> layout shell
     - Sets width, height, marginLeft (real layout spacing)
     - Never transforms. Hitbox lives here, permanently.

   Layer 2: <button> hitbox
     - Fills the layout shell exactly (absolute inset-0)
     - Handles click, disabled, cursor
     - Never transforms

   Layer 3: <div> visual
     - Gets all the transforms: tilt, offsetY, offsetX
     - Gets the hover lift animation
     - Gets the image and label inside it
     - Transforms here are purely cosmetic — they never
       move the clickable area

   This means: no matter how tilted, shifted, or animated
   a cartridge looks, hovering and clicking always works
   exactly where the cartridge visually appears.
   ───────────────────────────────────────────── */
interface SpineProps {
  entry: CodexEntry;
  isLoaded: boolean;
  onClick: () => void;
  tilt?: number;
  offsetY?: number;
  offsetX?: number;
  gapBefore?: number;
  useCenter?: boolean;
  zIndex?: number;
}

function CartridgeSpine({
  entry,
  isLoaded,
  onClick,
  tilt = 0,
  offsetY = 0,
  offsetX = 0,
  gapBefore,
  useCenter = false,
  zIndex,
}: SpineProps) {
  const marginLeft = gapBefore !== undefined
    ? `${gapBefore}px`
    : `${SPINE_GAP}px`;

  const transformOrigin = tilt !== 0
    ? (useCenter ? "center center" : "bottom center")
    : undefined;

  return (
    <div
      className="relative flex-shrink-0 group/spine pointer-events-none"
      style={{
        width: `${SPINE_WIDTH}px`,
        height: `${SPINE_HEIGHT}px`,
        marginLeft,
      }}
    >
      {/* ── LAYER 2: Invisible button hitbox — narrow, no children, pointer-events-auto ── */}
      <button
        onClick={onClick}
        disabled={isLoaded}
        title={entry.title}
        className={cn(
          "absolute top-0 bottom-0 cursor-pointer pointer-events-auto z-10",
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        style={{
          left: '35px',
          right: '18px',
        }}
      />

      {/* ── LAYER 3: Visual — purely decorative, pointer-events-none, reacts via group-hover ── */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-all duration-300 ease-out",
          !isLoaded && "group-hover/spine:brightness-125",
        )}
        style={{
          transform: isLoaded
            ? undefined
            : `translateY(${offsetY}px) translateX(${offsetX}px) rotate(${tilt}deg)`,
          transformOrigin,
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Hover lift — wraps the image so lift doesn't fight with tilt origin */}
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-300 ease-out",
            !isLoaded && "group-hover/spine:-translate-y-2"
          )}
        >
          {/* Inner-lamp glow — sits behind the image, blurs outward like internal warmth */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none transition-opacity duration-500",
              !isLoaded ? "opacity-0 group-hover/spine:opacity-100" : "opacity-0"
            )}
            style={{
              background: 'radial-gradient(ellipse 60% 80% at 50% 60%, rgba(210,160,40,0.6) 0%, rgba(180,130,30,0.2) 45%, transparent 75%)',
              filter: 'blur(8px)',
              zIndex: 0,
            }}
          />
          {/* Inner image container: horizontal image rotated 90° to stand upright */}
          <div
            className="absolute top-1/2 left-1/2 overflow-hidden rounded-[3px]"
            style={{
              zIndex: 1,
              width: `${_CTR_W}px`,
              height: `${_CTR_H}px`,
              transform: "translate(-50%, -50%) rotate(90deg)",
            }}
          >
            <img
              src={SPINE_CDN}
              alt={entry.title}
              className="absolute inset-0 w-full h-full object-fill drop-shadow-[2px_4px_8px_rgba(0,0,0,0.7)]"
              draggable={false}
            />
            {/* Text label on the parchment area */}
            <div
              className="absolute flex flex-col items-center justify-center text-center z-10 pointer-events-none"
              style={{
                top: "10%",
                height: "80%",
                left: "10%",
                width: "58%",
              }}
            >
              <span
                className="uppercase leading-tight px-1 line-clamp-2"
                style={{
                  fontFamily: "'Courier New', 'Courier', monospace",
                  fontSize: "9px",
                  fontWeight: 900,
                  color: "#1a120a",
                  letterSpacing: "0.1em",
                  textShadow: "0 0 2px rgba(230,220,195,0.8)",
                }}
              >
                {entry.title}
              </span>
              <span
                style={{
                  fontFamily: "'Courier New', 'Courier', monospace",
                  fontSize: "5px",
                  fontWeight: 700,
                  color: "rgba(42,29,16,0.7)",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 2px rgba(230,220,195,0.8)",
                  marginTop: "2px",
                }}
              >
                {entry.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SHELF FILTER BAR
   Unchanged from original.
   ───────────────────────────────────────────── */
const FILTER_TABS = [
  { key: "ALL",          label: "ALL",
    glow: { cx: 48, cy: 48, rx: 32, ry: 45, op: 0.13, ambRx: 55, ambOp: 0.055 },
    strip: { topOp: 0.75, botOp: 0.85, topShift: 48, botShift: 52 },
    spill: { left: 18, right: 12, op: 0.18, blur: 3 },
    text: { hotOp: 0.85, midOp: 0.5, outerOp: 0.22 },
  },
  { key: "IDENTITY",     label: "IDENTITY",
    glow: { cx: 52, cy: 46, rx: 38, ry: 52, op: 0.16, ambRx: 62, ambOp: 0.065 },
    strip: { topOp: 0.82, botOp: 0.7, topShift: 53, botShift: 47 },
    spill: { left: 12, right: 18, op: 0.22, blur: 4 },
    text: { hotOp: 0.9, midOp: 0.55, outerOp: 0.18 },
  },
  { key: "RELATIONSHIP", label: "RELATIONSHIP",
    glow: { cx: 47, cy: 52, rx: 30, ry: 48, op: 0.12, ambRx: 52, ambOp: 0.05 },
    strip: { topOp: 0.68, botOp: 0.78, topShift: 45, botShift: 50 },
    spill: { left: 16, right: 14, op: 0.16, blur: 3 },
    text: { hotOp: 0.78, midOp: 0.45, outerOp: 0.2 },
  },
  { key: "VISION",       label: "VISION",
    glow: { cx: 54, cy: 50, rx: 36, ry: 55, op: 0.15, ambRx: 58, ambOp: 0.06 },
    strip: { topOp: 0.88, botOp: 0.65, topShift: 55, botShift: 44 },
    spill: { left: 10, right: 20, op: 0.2, blur: 4 },
    text: { hotOp: 0.82, midOp: 0.52, outerOp: 0.24 },
  },
  { key: "CULTURE",      label: "CULTURE",
    glow: { cx: 46, cy: 47, rx: 34, ry: 50, op: 0.14, ambRx: 56, ambOp: 0.058 },
    strip: { topOp: 0.72, botOp: 0.82, topShift: 50, botShift: 55 },
    spill: { left: 20, right: 10, op: 0.19, blur: 3 },
    text: { hotOp: 0.88, midOp: 0.48, outerOp: 0.16 },
  },
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
      <div
        className="relative flex items-stretch justify-center gap-0 overflow-hidden"
        style={{
          backgroundImage: "url('/assets/trim_bar_texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: [
            "0 4px 12px rgba(0,0,0,0.5)",
            "0 8px 24px rgba(0,0,0,0.3)",
            "inset 0 2px 4px rgba(0,0,0,0.3)",
            "inset 0 -1px 3px rgba(0,0,0,0.2)",
          ].join(", "),
        }}
      >
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />
        <div
          className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none z-[2]"
          style={{ background: "linear-gradient(to bottom, rgba(10,7,4,0.7) 0%, rgba(15,10,6,0.3) 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none z-[2]"
          style={{ background: "linear-gradient(to top, rgba(10,7,4,0.7) 0%, rgba(15,10,6,0.3) 100%)" }}
        />

        {FILTER_TABS.map((tab) => {
          const isActive = activeCategory === tab.key;
          const g = tab.glow;
          const s = tab.strip;
          const sp = tab.spill;
          const t = tab.text;
          return (
            <button
              key={tab.key}
              onClick={() => onCategoryChange(tab.key)}
              className={cn(
                "relative flex-1 py-3 md:py-3.5 lg:py-4 cursor-pointer transition-all duration-500 z-[1]",
                isActive ? "z-10" : ""
              )}
            >
              <div
                className="absolute top-[3px] left-[-2px] right-[-2px] h-[2px] pointer-events-none z-[3] transition-all duration-500"
                style={{
                  background: isActive
                    ? `linear-gradient(to right, transparent 0%, rgba(210,150,50,${s.topOp * 0.6}) 15%, rgba(225,165,55,${s.topOp}) ${s.topShift}%, rgba(210,150,50,${s.topOp * 0.6}) 85%, transparent 100%)`
                    : `linear-gradient(to right, transparent 0%, rgba(165,120,45,${s.topOp * 0.25}) 20%, rgba(175,130,50,${s.topOp * 0.38}) ${s.topShift}%, rgba(165,120,45,${s.topOp * 0.25}) 80%, transparent 100%)`,
                }}
              />
              {isActive && (
                <div
                  className="absolute top-[2px] left-[8%] right-[8%] h-[6px] pointer-events-none z-[2]"
                  style={{
                    background: `radial-gradient(ellipse 80% 100% at ${s.topShift}% 100%, rgba(210,148,45,${s.topOp * 0.18}) 0%, transparent 100%)`,
                    filter: "blur(2px)",
                  }}
                />
              )}
              <div
                className="absolute bottom-[3px] left-[-2px] right-[-2px] h-[2px] pointer-events-none z-[3] transition-all duration-500"
                style={{
                  background: isActive
                    ? `linear-gradient(to right, transparent 0%, rgba(210,150,50,${s.botOp * 0.6}) 15%, rgba(225,165,55,${s.botOp}) ${s.botShift}%, rgba(210,150,50,${s.botOp * 0.6}) 85%, transparent 100%)`
                    : `linear-gradient(to right, transparent 0%, rgba(165,120,45,${s.botOp * 0.25}) 20%, rgba(175,130,50,${s.botOp * 0.38}) ${s.botShift}%, rgba(165,120,45,${s.botOp * 0.25}) 80%, transparent 100%)`,
                }}
              />
              {isActive && (
                <div
                  className="absolute bottom-[2px] left-[8%] right-[8%] h-[6px] pointer-events-none z-[2]"
                  style={{
                    background: `radial-gradient(ellipse 80% 100% at ${s.botShift}% 0%, rgba(210,148,45,${s.botOp * 0.12}) 0%, transparent 100%)`,
                    filter: "blur(3px)",
                  }}
                />
              )}
              {isActive && (
                <>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse ${g.rx}% ${g.ry}% at ${g.cx}% ${g.cy}%, rgba(210,145,40,${g.op}) 0%, transparent 100%)` }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse ${g.ambRx}% 70% at ${g.cx}% ${g.cy}%, rgba(195,130,35,${g.ambOp}) 0%, transparent 100%)` }}
                  />
                  <div
                    className="absolute -bottom-[2px] h-[6px] rounded-full pointer-events-none"
                    style={{
                      left: `${sp.left}%`,
                      right: `${sp.right}%`,
                      background: `radial-gradient(ellipse 70% 100% at ${g.cx}% 0%, rgba(200,138,35,${sp.op}) 0%, transparent 100%)`,
                      filter: `blur(${sp.blur}px)`,
                    }}
                  />
                </>
              )}
              {!isActive && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at ${g.cx}% ${g.cy}%, rgba(110,80,35,0.04) 0%, transparent 70%)` }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 font-pixel tracking-[0.18em] uppercase transition-all duration-500",
                  "text-[11px] md:text-[13px] lg:text-[15px]",
                )}
                style={isActive ? {
                  color: "#e8b84a",
                  textShadow: [
                    `0 0 6px rgba(225,170,45,${t.hotOp})`,
                    `0 0 14px rgba(210,148,40,${t.midOp})`,
                    `0 0 30px rgba(195,130,30,${t.outerOp})`,
                    "0 1px 0 rgba(0,0,0,0.6)",
                    "0 -1px 0 rgba(240,200,120,0.2)",
                  ].join(", "),
                } : {
                  color: "#6b5a42",
                  textShadow: [
                    "0 1px 0 rgba(80,65,40,0.3)",
                    "0 -1px 0 rgba(0,0,0,0.4)",
                    "0 0 4px rgba(100,80,50,0.1)",
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
   MAIN SHELF COMPONENT
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

  const getVisibleSections = (shelfSections: typeof TOP_SHELF_SECTIONS) => {
    if (activeCategory === "ALL") return shelfSections;
    return shelfSections.filter((s) => s.key.toUpperCase() === activeCategory);
  };

  const topVisible = getVisibleSections(TOP_SHELF_SECTIONS);
  const bottomVisible = getVisibleSections(BOTTOM_SHELF_SECTIONS);

  return (
    <div className="relative w-full overflow-hidden rounded-sm">

      {/* ── SWORD-BEARER STATUE ── */}
      <div
        className="absolute z-[15] pointer-events-none"
        style={{ width: "48%", bottom: "5%", right: "-12%", overflow: "visible" }}
      >
        <img
          src={STATUE_CDN}
          alt="The Sword-Bearer"
          className="relative z-[2] block"
          style={{ width: "100%", height: "auto", filter: "brightness(0.85) contrast(1.12) saturate(0.9)" }}
          draggable={false}
        />
        {/* Backlight halo */}
        <div className="absolute z-[1]" style={{ top: "40%", left: "10%", width: "80%", height: "60%", background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(210,160,60,0.12) 0%, rgba(180,130,40,0.06) 40%, transparent 70%)", filter: "blur(18px)" }} />
        {/* Sword glow */}
        <div className="absolute z-[4]" style={{ top: "-18%", left: "20%", width: "70%", height: "40%", background: "radial-gradient(ellipse 50% 70% at 55% 80%, rgba(120,240,255,0.45) 0%, rgba(80,220,240,0.18) 30%, transparent 65%)", filter: "blur(10px)", animation: "swordPulse 3s ease-in-out infinite alternate" }} />
        <div className="absolute z-[5]" style={{ top: "-12%", left: "32%", width: "36%", height: "22%", background: "radial-gradient(ellipse 25% 65% at 55% 85%, rgba(220,255,255,0.55) 0%, rgba(140,235,250,0.15) 45%, transparent 70%)", filter: "blur(5px)", animation: "swordPulse 3s ease-in-out infinite alternate" }} />
        <div className="absolute z-[6]" style={{ top: "-5%", left: "37%", width: "12%", height: "28%", background: "linear-gradient(to top, rgba(255,255,255,0.08) 0%, rgba(200,250,255,0.2) 40%, rgba(255,255,255,0.35) 70%, rgba(200,250,255,0.15) 100%)", filter: "blur(3px)", borderRadius: "40%", animation: "swordPulse 3s ease-in-out infinite alternate" }} />
        <div className="absolute z-[3]" style={{ top: "-25%", left: "36%", width: "28%", height: "40%", background: "linear-gradient(to top, rgba(120,240,255,0.15) 0%, rgba(100,220,240,0.06) 50%, transparent 100%)", filter: "blur(8px)", animation: "swordPulse 3s ease-in-out infinite alternate" }} />
        <div className="absolute z-[0]" style={{ top: "-10%", left: "-5%", width: "110%", height: "45%", background: "radial-gradient(ellipse 60% 50% at 55% 70%, rgba(80,220,240,0.07) 0%, rgba(60,200,220,0.03) 40%, transparent 65%)", filter: "blur(25px)" }} />
        {/* Dust particles */}
        <div className="absolute z-[6]" style={{ top: "0%", left: "10%", width: "80%", height: "100%", overflow: "visible" }}>
          {[...Array(18)].map((_, i) => (
            <div
              key={`dust-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${1.5 + (i % 4) * 0.8}px`,
                height: `${1.5 + (i % 4) * 0.8}px`,
                left: `${8 + (i * 5.2) % 84}%`,
                bottom: `${5 + (i * 7.3) % 80}%`,
                background: i % 3 === 0 ? "rgba(200,250,255,0.7)" : i % 3 === 1 ? "rgba(220,180,80,0.6)" : "rgba(255,255,255,0.45)",
                animation: `dustFloat${i % 4} ${4 + (i % 3) * 2}s ease-in-out infinite`,
                animationDelay: `${(i * 0.7) % 5}s`,
              }}
            />
          ))}
        </div>
        {/* Orange ambient */}
        <div className="absolute z-[1]" style={{ top: "15%", left: "-15%", width: "130%", height: "85%", background: "radial-gradient(ellipse 70% 70% at 50% 45%, rgba(255,130,20,0.5) 0%, rgba(240,110,15,0.25) 20%, rgba(210,90,10,0.12) 40%, rgba(180,80,10,0.04) 60%, transparent 80%)", filter: "blur(18px)", animation: "emberPulse 4s ease-in-out infinite alternate" }} />
        <div className="absolute z-[0]" style={{ top: "5%", left: "-25%", width: "150%", height: "110%", background: "radial-gradient(ellipse 65% 70% at 50% 45%, rgba(255,150,30,0.2) 0%, rgba(230,120,20,0.08) 35%, rgba(200,90,10,0.03) 55%, transparent 75%)", filter: "blur(30px)" }} />
        {/* Sword reflection on shelf */}
        <div className="absolute z-[1]" style={{ bottom: "0%", left: "5%", width: "90%", height: "18%", background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(80,220,240,0.15) 0%, transparent 70%)", filter: "blur(14px)", animation: "swordPulse 3s ease-in-out infinite alternate" }} />
      </div>

      {/* ── JOURNALS ── */}
      <img
        src={JOURNAL_1_CDN}
        alt="Parable of the Shipwrecked Leaders"
        className="absolute z-[14] pointer-events-none"
        style={{ bottom: "1%", right: "-7%", height: "75%", width: "auto", transform: "rotate(-4deg)", transformOrigin: "bottom center", filter: "brightness(0.7) contrast(1.15) saturate(0.8)" }}
        draggable={false}
      />
      <img
        src={JOURNAL_2_CDN}
        alt="Rebellious Hope"
        className="absolute z-[12] pointer-events-none"
        style={{ bottom: "2%", right: "-8%", height: "65%", width: "auto", transform: "rotate(-3deg)", transformOrigin: "bottom center", filter: "brightness(0.7) contrast(1.15) saturate(0.8)" }}
        draggable={false}
      />

      {/* Animation keyframes */}
      <style>{`
        @keyframes swordPulse {
          0% { opacity: 0.65; }
          50% { opacity: 0.9; }
          100% { opacity: 1; }
        }
        @keyframes emberPulse {
          0% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.8; transform: scale(1); }
        }
        @keyframes dustFloat0 {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.6; }
          100% { transform: translateY(-60px) translateX(8px); opacity: 0; }
        }
        @keyframes dustFloat1 {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 0.7; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-80px) translateX(-6px); opacity: 0; }
        }
        @keyframes dustFloat2 {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-50px) translateX(12px); opacity: 0; }
        }
        @keyframes dustFloat3 {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          25% { opacity: 0.9; }
          75% { opacity: 0.5; }
          100% { transform: translateY(-70px) translateX(-10px); opacity: 0; }
        }
      `}</style>

      {/* Shelf background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/codex_shelf_bg.png')", backgroundSize: "cover" }}
      />

      {/* Vignette overlays */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/25 via-transparent to-black/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-[2] flex flex-col">

        <ShelfFilterBar activeCategory={activeCategory} onCategoryChange={onCategoryChange} />

        {/* ── TOP SHELF ── */}
        <div className="relative pl-0 pr-4 md:pr-5 lg:pr-6 pt-0">
          <div
            ref={scrollRefTop}
            className="flex items-end gap-0 overflow-visible pb-0 pt-0"
            style={{ minHeight: `${SPINE_HEIGHT + 30}px` }}
          >
            {topVisible.map((section) => {
              const sectionEntries = grouped[section.key];
              if (sectionEntries.length === 0) return null;
              return (
                <div key={section.key} className="flex items-end gap-0">
                  {sectionEntries.map((entry, idx) => {
                    const a = TOP_SHELF_ARRANGEMENT[entry.id] || { tilt: 0, offsetY: 0, offsetX: 0 };
                    return (
                      <CartridgeSpine
                        key={entry.id}
                        entry={entry}
                        isLoaded={loadedEntryId === entry.id}
                        onClick={() => onLoad(entry)}
                        tilt={a.tilt}
                        offsetY={a.offsetY}
                        offsetX={a.offsetX}
                        gapBefore={a.gapBefore}
                        useCenter={a.useCenter}
                        zIndex={sectionEntries.length - idx}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── BOTTOM SHELF ── */}
        <div className="relative pl-0 pr-4 md:pr-5 lg:pr-6 pb-0">
          <div
            ref={scrollRefBottom}
            className="flex items-end gap-0 overflow-visible pb-0 pt-0"
            style={{ minHeight: `${SPINE_HEIGHT + 30}px` }}
          >
            {bottomVisible.map((section) => {
              const sectionEntries = grouped[section.key];
              if (sectionEntries.length === 0) return null;
              return (
                <div key={section.key} className="flex items-end gap-0">
                  {sectionEntries.map((entry, idx) => {
                    const a = BOTTOM_SHELF_ARRANGEMENT[entry.id] || { tilt: 0, offsetY: 0, offsetX: 0 };
                    return (
                      <CartridgeSpine
                        key={entry.id}
                        entry={entry}
                        isLoaded={loadedEntryId === entry.id}
                        onClick={() => onLoad(entry)}
                        tilt={a.tilt}
                        offsetY={a.offsetY}
                        offsetX={a.offsetX}
                        gapBefore={a.gapBefore}
                        useCenter={a.useCenter}
                        zIndex={sectionEntries.length - idx}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
