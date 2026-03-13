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
const STATUE_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/FLleLCCpIbXNFGAi.png";
const JOURNAL_1_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/zWRQfTmONtObpdxL.png"; // Parable of the Shipwrecked Leaders
const JOURNAL_2_CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/azSuVoekkFnNjqzv.png"; // Rebellious Hope

interface SpineProps {
  entry: CodexEntry;
  isLoaded: boolean;
  onClick: () => void;
  tilt?: number;
  offsetY?: number;
  offsetX?: number;      // visual-only horizontal shift (translateX) — does NOT affect neighbors
  gapBefore?: number;    // real layout gap (marginLeft override) — DOES push neighbors
  useCenter?: boolean;   // use center center transform origin (for flat/laid cartridges)
}

function CartridgeSpine({ entry, isLoaded, onClick, tilt = 0, offsetY = 0, offsetX = 0, gapBefore, useCenter = false }: SpineProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoaded}
      className={cn(
        "relative flex-shrink-0 group transition-all duration-300 ease-out cursor-pointer",
        "w-[63px] md:w-[74px] lg:w-[80px] h-[205px] md:h-[238px] lg:h-[272px]",
        // Sits on the shelf surface, behind the metal guard rail
        "mb-0",
        // Negative horizontal margin to pack spines tightly
        "-mx-[18px] md:-mx-[20px] lg:-mx-[22px]",
        isLoaded
          ? "opacity-0 pointer-events-none scale-95"
          : "opacity-100 hover:translate-y-[-8px] hover:brightness-125 active:scale-95"
      )}
      style={{
        transform: isLoaded ? undefined : `translateY(${offsetY}px) rotate(${tilt}deg)`,
        transformOrigin: tilt !== 0 ? (useCenter ? "center center" : "bottom center") : undefined,
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        left: offsetX ? `${offsetX}px` : undefined,
        ...(gapBefore !== undefined ? { marginLeft: `${gapBefore}px` } : {}),
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
   TOP SHELF ARRANGEMENT — per-cartridge personality
   Subtle tilts, vertical offsets, and spacing gaps
   to create a lived-in, organic look.
   tilt:      degrees of rotation (+ = lean right, - = lean left)
   offsetY:   vertical shift in px (+ = down, - = up)
   offsetX:   visual-only horizontal shift via translateX — does NOT affect neighbors
   gapBefore: real layout spacing via marginLeft — DOES push/pull neighbors
   ───────────────────────────────────────────── */
interface CartridgeArrangement {
  tilt: number;
  offsetY: number;
  offsetX: number;       // translateX — visual only, no layout impact
  gapBefore?: number;    // marginLeft override — layout impact, pushes neighbors
  useCenter?: boolean;   // use center center transform origin (for flat/laid cartridges)
}

const TOP_SHELF_ARRANGEMENT: Record<string, CartridgeArrangement> = {
  // === IDENTITY SECTION (positions 1-4) ===
  // 1. Name the Cost — straight, anchoring the left wall, nudged forward
  MOVE_NAME_THE_COST:          { tilt: 0,    offsetY: 4,  offsetX: 0 },
  // 2. Clarity Contract — straight, nudged forward
  MOVE_CLARITY_CONTRACT:       { tilt: 0,    offsetY: 4,  offsetX: 0 },
  // 3. Feedforward — slight tilt, nudged forward, the one #4 leans on
  MOVE_FEEDFORWARD:            { tilt: 0.3,  offsetY: 4,  offsetX: 0 },
  // 4. No With a Clean Yes — leaning left onto #3, slid left to nestle against it
  MOVE_BOUNDARY_NO_WITH_YES:   { tilt: -13, offsetY: -2, offsetX: 50 },

  // === RELATIONSHIP SECTION (positions 5-13) ===
  // 5. Repair in 48 Hours — small real gap before it (section break), mostly straight
  MOVE_REPAIR_48H:             { tilt: 0.2,  offsetY: 0,  offsetX: 30, gapBefore: 6 },
  // 6. Minority Report — straight
  MOVE_MINORITY_REPORT:        { tilt: 0,    offsetY: 0,  offsetX: 30 },
  // 7. Fridge Rights Audit — straight, nudged forward
  MOVE_FRIDGE_RIGHTS_AUDIT:    { tilt: 0,    offsetY: 4,  offsetX: 30 },
  // 8. The Mirror Move — domino lean right, slid right to close gap with #9
  MOVE_THE_MIRROR:             { tilt: 18,   offsetY: -1, offsetX: 30 },
  // 9. Trust Micro-Deposit — domino lean right, slid right to lean into #10
  MOVE_TRUST_MICRO_DEPOSIT:    { tilt: 20,   offsetY: -3, offsetX: 30 },
  // 10. 3 Coaching Questions — the backstop, straight and sturdy
  MOVE_COACHING_3_QUESTIONS:   { tilt: 0,    offsetY: 0,  offsetX: 100 },
  // 11. SBI Feedback — straight
  MOVE_FEEDBACK_SBI:           { tilt: 0.3,  offsetY: 0,  offsetX: 100 },
  // 12. Accountability With Care — slight lean
  MOVE_ACCOUNTABILITY_WITH_CARE: { tilt: -1.0, offsetY: 1, offsetX: 100 },
  // 13. Recover After You Missed It — end of row, slight lean right (resting against nothing)
  MOVE_RECOVER_AFTER_MISS:     { tilt: 1.2,  offsetY: 0,  offsetX: 100 },
};

/* ─────────────────────────────────────────────
   BOTTOM SHELF ARRANGEMENT — per-cartridge personality
   Same system as top shelf: tilt, offsetX, offsetY, gapBefore
   ───────────────────────────────────────────── */
const BOTTOM_SHELF_ARRANGEMENT: Record<string, CartridgeArrangement> = {
  // === VISION SECTION ===
  MOVE_DECISION_RIGHTS_MAP:    { tilt: -90, offsetY: 63, offsetX: 78, useCenter: true },
  MOVE_STOP_LIST:              { tilt: -90, offsetY: 29, offsetX: 49, useCenter: true },
  MOVE_DISAGREE_AND_COMMIT:    { tilt: -90, offsetY: -7, offsetX: 52, useCenter: true },
  MOVE_THE_ONE_THING:          { tilt: 0, offsetY: 0, offsetX: 200 },
  MOVE_NORTH_STAR_SENTENCE:    { tilt: 0, offsetY: 0, offsetX: 200 },
  MOVE_KILL_THE_GHOST_GOAL:    { tilt: 0, offsetY: 0, offsetX: 200 },
  MOVE_WIN_CONDITION:          { tilt: 0, offsetY: 0, offsetX: 200 },
  MOVE_TRADEOFF_TALK:          { tilt: 0, offsetY: 0, offsetX: 200 },
  // === CULTURE SECTION ===
  MOVE_TRUTH_WEATHER:          { tilt: 0, offsetY: 0, offsetX: 200 },
  MOVE_MEETING_REWRITE:        { tilt: 0, offsetY: 0, offsetX: 200 },
  MOVE_PERMISSION_SLIP:        { tilt: 0, offsetY: 0, offsetX: 200 },
  MOVE_SHADOW_NORMS:           { tilt: 0, offsetY: 0, offsetX: 200 },
  MOVE_ENERGY_LEAK_CHECK:      { tilt: 0, offsetY: 0, offsetX: 200 },
  MOVE_SAFE_TO_SAY:            { tilt: 0, offsetY: 0, offsetX: 200 },
};

/* ─────────────────────────────────────────────
   SHELF FILTER BAR (Built into the shelf trim)
   Uses generated bronze/wood trim texture image
   Embossed text with warm amber light bleed
   ───────────────────────────────────────────── */
/* ── Per-tab "lighting personality" ──
   Each tab has unique imperfections — like old backlit labels
   where each bulb has aged differently, some bezels are more
   worn, some reflectors sit slightly off-center.              */
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

        {/* ── TOP EDGE: dark recess ── */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none z-[2]"
          style={{
            background: "linear-gradient(to bottom, rgba(10,7,4,0.7) 0%, rgba(15,10,6,0.3) 100%)",
          }}
        />
        {/* ── BOTTOM EDGE: dark recess ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none z-[2]"
          style={{
            background: "linear-gradient(to top, rgba(10,7,4,0.7) 0%, rgba(15,10,6,0.3) 100%)",
          }}
        />

        {FILTER_TABS.map((tab, idx) => {
          const isActive = activeCategory === tab.key;
          const g = tab.glow;   // per-tab glow personality
          const s = tab.strip;  // per-tab gold strip personality
          const sp = tab.spill; // per-tab bottom spill personality
          const t = tab.text;   // per-tab text glow personality
          return (
            <button
              key={tab.key}
              onClick={() => onCategoryChange(tab.key)}
              className={cn(
                "relative flex-1 py-3 md:py-3.5 lg:py-4 cursor-pointer transition-all duration-500 z-[1]",
                isActive ? "z-10" : ""
              )}
            >
              {/* ── PER-TAB GOLD STRIPS with unique wear/brightness ── */}
              {/* Top gold strip — unique opacity & center per tab */}
              <div
                className="absolute top-[3px] left-[-2px] right-[-2px] h-[2px] pointer-events-none z-[3] transition-all duration-500"
                style={{
                  background: isActive
                    ? `linear-gradient(to right, transparent 0%, rgba(210,150,50,${s.topOp * 0.6}) 15%, rgba(225,165,55,${s.topOp}) ${s.topShift}%, rgba(210,150,50,${s.topOp * 0.6}) 85%, transparent 100%)`
                    : `linear-gradient(to right, transparent 0%, rgba(165,120,45,${s.topOp * 0.25}) 20%, rgba(175,130,50,${s.topOp * 0.38}) ${s.topShift}%, rgba(165,120,45,${s.topOp * 0.25}) 80%, transparent 100%)`,
                }}
              />
              {/* Top gold strip glow — unique position */}
              {isActive && (
                <div
                  className="absolute top-[2px] left-[8%] right-[8%] h-[6px] pointer-events-none z-[2]"
                  style={{
                    background: `radial-gradient(ellipse 80% 100% at ${s.topShift}% 100%, rgba(210,148,45,${s.topOp * 0.18}) 0%, transparent 100%)`,
                    filter: "blur(2px)",
                  }}
                />
              )}
              {/* Bottom gold strip — unique opacity & center per tab */}
              <div
                className="absolute bottom-[3px] left-[-2px] right-[-2px] h-[2px] pointer-events-none z-[3] transition-all duration-500"
                style={{
                  background: isActive
                    ? `linear-gradient(to right, transparent 0%, rgba(210,150,50,${s.botOp * 0.6}) 15%, rgba(225,165,55,${s.botOp}) ${s.botShift}%, rgba(210,150,50,${s.botOp * 0.6}) 85%, transparent 100%)`
                    : `linear-gradient(to right, transparent 0%, rgba(165,120,45,${s.botOp * 0.25}) 20%, rgba(175,130,50,${s.botOp * 0.38}) ${s.botShift}%, rgba(165,120,45,${s.botOp * 0.25}) 80%, transparent 100%)`,
                }}
              />
              {/* Bottom gold strip glow — unique position */}
              {isActive && (
                <div
                  className="absolute bottom-[2px] left-[8%] right-[8%] h-[6px] pointer-events-none z-[2]"
                  style={{
                    background: `radial-gradient(ellipse 80% 100% at ${s.botShift}% 0%, rgba(210,148,45,${s.botOp * 0.12}) 0%, transparent 100%)`,
                    filter: "blur(3px)",
                  }}
                />
              )}

              {/* ── ACTIVE STATE: unique glow shape per tab ── */}
              {isActive && (
                <>
                  {/* Tight glow — unique size, position, opacity */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse ${g.rx}% ${g.ry}% at ${g.cx}% ${g.cy}%, rgba(210,145,40,${g.op}) 0%, transparent 100%)`,
                    }}
                  />
                  {/* Ambient warmth — unique spread */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse ${g.ambRx}% 70% at ${g.cx}% ${g.cy}%, rgba(195,130,35,${g.ambOp}) 0%, transparent 100%)`,
                    }}
                  />
                  {/* Bottom light spill — unique asymmetric spread */}
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

              {/* ── INACTIVE STATE: subtle warmth — also slightly unique ── */}
              {!isActive && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at ${g.cx}% ${g.cy}%, rgba(110,80,35,0.04) 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* ── LABEL TEXT: embossed/engraved with unique glow intensity ── */}
              <span
                className={cn(
                  "relative z-10 font-pixel tracking-[0.18em] uppercase transition-all duration-500",
                  "text-[11px] md:text-[13px] lg:text-[15px]",
                )}
                style={isActive ? {
                  color: "#e8b84a",
                  textShadow: [
                    `0 0 6px rgba(225,170,45,${t.hotOp})`,     // tight hot glow — unique intensity
                    `0 0 14px rgba(210,148,40,${t.midOp})`,    // medium spread — unique
                    `0 0 30px rgba(195,130,30,${t.outerOp})`,  // soft outer halo — unique
                    "0 1px 0 rgba(0,0,0,0.6)",                // depth shadow (engraved)
                    "0 -1px 0 rgba(240,200,120,0.2)",         // top highlight catch
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
   SHELF RAIL (Front edge / lip of the shelf plank)
   Uses the generated wood rail texture but blends
   its top and bottom edges into the surrounding
   shelf wood so it reads as one continuous piece.
   ───────────────────────────────────────────── */
function ShelfRail() {
  return (
    <div className="relative w-full h-[44px] md:h-[52px] lg:h-[60px] z-[3]">
      {/* Rail container — clipped to match the shelf ledge width (~75%) */}
      <div
        className="relative h-full"
        style={{ width: "75%" }}
      >
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
        {/* Right edge fade — rail fades out at its endpoint */}
        <div
          className="absolute top-0 right-0 bottom-0 w-[20px] pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(15,12,8,0.9) 0%, rgba(20,15,10,0.4) 40%, transparent 100%)",
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
      {/* ── SWORD-BEARER STATUE (right side, spanning both shelves) ── */}
      <div
        className="absolute z-[15] pointer-events-none"
        style={{
          width: '48%',
          bottom: '7%',
          right: '-12%',
          overflow: 'visible',
        }}
      >
        {/* The statue image — relative so it establishes container height */}
        <img
          src={STATUE_CDN}
          alt="The Sword-Bearer"
          className="relative z-[2] block"
          style={{
            width: '100%',
            height: 'auto',
            filter: 'brightness(0.85) contrast(1.12) saturate(0.9)',
          }}
          draggable={false}
        />

        {/* Backlight halo — warm golden, focused on lower half (not head) */}
        <div
          className="absolute z-[1]"
          style={{
            top: '40%',
            left: '10%',
            width: '80%',
            height: '60%',
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(210,160,60,0.12) 0%, rgba(180,130,40,0.06) 40%, transparent 70%)',
            filter: 'blur(18px)',
          }}
        />

        {/* Sword glow — INTENSIFIED cyan, pulled UP away from head */}
        <div
          className="absolute z-[4]"
          style={{
            top: '-18%',
            left: '20%',
            width: '70%',
            height: '40%',
            background: 'radial-gradient(ellipse 50% 70% at 55% 80%, rgba(120,240,255,0.45) 0%, rgba(80,220,240,0.18) 30%, transparent 65%)',
            filter: 'blur(10px)',
            animation: 'swordPulse 3s ease-in-out infinite alternate',
          }}
        />
        {/* Sword core — tight white-hot center, high up on sword only */}
        <div
          className="absolute z-[5]"
          style={{
            top: '-12%',
            left: '32%',
            width: '36%',
            height: '22%',
            background: 'radial-gradient(ellipse 25% 65% at 55% 85%, rgba(220,255,255,0.55) 0%, rgba(140,235,250,0.15) 45%, transparent 70%)',
            filter: 'blur(5px)',
            animation: 'swordPulse 3s ease-in-out infinite alternate',
          }}
        />
        {/* Sword blade white overlay — subtle, tight on the blade edge */}
        <div
          className="absolute z-[6]"
          style={{
            top: '-5%',
            left: '37%',
            width: '12%',
            height: '28%',
            background: 'linear-gradient(to top, rgba(255,255,255,0.08) 0%, rgba(200,250,255,0.2) 40%, rgba(255,255,255,0.35) 70%, rgba(200,250,255,0.15) 100%)',
            filter: 'blur(3px)',
            borderRadius: '40%',
            animation: 'swordPulse 3s ease-in-out infinite alternate',
          }}
        />

        {/* Light shaft — vertical beam extending up from sword */}
        <div
          className="absolute z-[3]"
          style={{
            top: '-25%',
            left: '36%',
            width: '28%',
            height: '40%',
            background: 'linear-gradient(to top, rgba(120,240,255,0.15) 0%, rgba(100,220,240,0.06) 50%, transparent 100%)',
            filter: 'blur(8px)',
            animation: 'swordPulse 3s ease-in-out infinite alternate',
          }}
        />

        {/* Secondary glow — reduced, pushed up to sword zone only */}
        <div
          className="absolute z-[0]"
          style={{
            top: '-10%',
            left: '-5%',
            width: '110%',
            height: '45%',
            background: 'radial-gradient(ellipse 60% 50% at 55% 70%, rgba(80,220,240,0.07) 0%, rgba(60,200,220,0.03) 40%, transparent 65%)',
            filter: 'blur(25px)',
          }}
        />

        {/* Floating dust particles — CSS animated */}
        <div className="absolute z-[6]" style={{ top: '0%', left: '10%', width: '80%', height: '100%', overflow: 'visible' }}>
          {[...Array(18)].map((_, i) => (
            <div
              key={`dust-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${1.5 + (i % 4) * 0.8}px`,
                height: `${1.5 + (i % 4) * 0.8}px`,
                left: `${8 + (i * 5.2) % 84}%`,
                bottom: `${5 + (i * 7.3) % 80}%`,
                background: i % 3 === 0
                  ? 'rgba(200,250,255,0.7)'
                  : i % 3 === 1
                    ? 'rgba(220,180,80,0.6)'
                    : 'rgba(255,255,255,0.45)',
                animation: `dustFloat${i % 4} ${4 + (i % 3) * 2}s ease-in-out infinite`,
                animationDelay: `${(i * 0.7) % 5}s`,
              }}
            />
          ))}
        </div>

        {/* ── WARM ORANGE AMBIENT — full shelf height, JACKED UP ── */}
        <div
          className="absolute z-[1]"
          style={{
            bottom: '0%',
            left: '-15%',
            width: '130%',
            height: '115%',
            background: 'radial-gradient(ellipse 75% 90% at 50% 92%, rgba(255,130,20,0.55) 0%, rgba(240,110,15,0.3) 18%, rgba(210,90,10,0.15) 40%, rgba(180,80,10,0.06) 60%, transparent 82%)',
            filter: 'blur(16px)',
            animation: 'emberPulse 4s ease-in-out infinite alternate',
          }}
        />
        {/* Orange ambient — secondary fill reaching to shelf ceiling */}
        <div
          className="absolute z-[0]"
          style={{
            bottom: '-10%',
            left: '-25%',
            width: '150%',
            height: '140%',
            background: 'radial-gradient(ellipse 65% 85% at 50% 88%, rgba(255,150,30,0.25) 0%, rgba(230,120,20,0.12) 30%, rgba(200,90,10,0.05) 55%, rgba(180,80,10,0.02) 70%, transparent 85%)',
            filter: 'blur(28px)',
          }}
        />
        {/* Golden ember glow at base — warm fire/embers on the rock */}
        <div
          className="absolute z-[3]"
          style={{
            bottom: '2%',
            left: '15%',
            width: '70%',
            height: '22%',
            background: 'radial-gradient(ellipse 80% 60% at 50% 85%, rgba(255,170,40,0.35) 0%, rgba(230,130,20,0.18) 35%, rgba(200,100,10,0.06) 60%, transparent 80%)',
            filter: 'blur(8px)',
            animation: 'emberPulse 4s ease-in-out infinite alternate',
          }}
        />
        {/* Ember sparkle points */}
        <div
          className="absolute z-[4]"
          style={{
            bottom: '5%',
            left: '20%',
            width: '60%',
            height: '14%',
            background: 'radial-gradient(ellipse 40% 50% at 30% 70%, rgba(255,180,40,0.35) 0%, transparent 70%), radial-gradient(ellipse 35% 45% at 70% 60%, rgba(255,200,60,0.28) 0%, transparent 70%)',
            filter: 'blur(4px)',
            animation: 'emberPulse 4s ease-in-out infinite alternate-reverse',
          }}
        />

        {/* Sword cyan reflection on shelf surface */}
        <div
          className="absolute z-[1]"
          style={{
            bottom: '0%',
            left: '5%',
            width: '90%',
            height: '18%',
            background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(80,220,240,0.15) 0%, transparent 70%)',
            filter: 'blur(14px)',
            animation: 'swordPulse 3s ease-in-out infinite alternate',
          }}
        />

      </div>

      {/* ── JOURNALS (bottom shelf, to the left of statue) ── */}
      <img
        src={JOURNAL_1_CDN}
        alt="Parable of the Shipwrecked Leaders"
        className="absolute z-[14] pointer-events-none"
        style={{
          bottom: '3%',
          right: '-7%',
          height: '75%',
          width: 'auto',
          transform: 'rotate(-4deg)',
          transformOrigin: 'bottom center',
          filter: 'brightness(0.7) contrast(1.15) saturate(0.8)',
        }}
        draggable={false}
      />
      <img
        src={JOURNAL_2_CDN}
        alt="Rebellious Hope"
        className="absolute z-[12] pointer-events-none"
        style={{
          bottom: '2%',
          right: '-6%',
          height: '65%',
          width: 'auto',
          transform: 'rotate(0deg)',
          transformOrigin: 'bottom center',
          filter: 'brightness(0.7) contrast(1.15) saturate(0.8)',
        }}
        draggable={false}
      />

      {/* Animation keyframes — sword glow, dust particles, ember pulse */}
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
        <div className="relative pl-0 pr-4 md:pr-5 lg:pr-6 pt-0">
          <div
            ref={scrollRefTop}
            className="flex items-end gap-0 overflow-visible pb-0 pt-0 h-[225px] md:h-[265px] lg:h-[305px]"
          >
            {topVisible.map((section) => {
              const sectionEntries = grouped[section.key];
              if (sectionEntries.length === 0) return null;
              return (
                <div key={section.key} className="flex items-end gap-0">
                  {sectionEntries.map((entry) => {
                    const arrangement = TOP_SHELF_ARRANGEMENT[entry.id] || { tilt: 0, offsetY: 0, offsetX: 0 };
                    return (
                      <CartridgeSpine
                        key={entry.id}
                        entry={entry}
                        isLoaded={loadedEntryId === entry.id}
                        onClick={() => onLoad(entry)}
                        tilt={arrangement.tilt}
                        offsetY={arrangement.offsetY}
                        offsetX={arrangement.offsetX}
                        gapBefore={arrangement.gapBefore}
                        useCenter={arrangement.useCenter}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── SHELF RAIL between top and bottom ── */}
        {/* <ShelfRail /> */}

        {/* ── BOTTOM SHELF: Vision + Culture cartridges (always rendered) ── */}
        <div className="relative pl-0 pr-4 md:pr-5 lg:pr-6 pb-0">
          <div
            ref={scrollRefBottom}
            className="flex items-end gap-0 overflow-visible pb-0 pt-0 h-[220px] md:h-[260px] lg:h-[300px]"
          >
            {bottomVisible.map((section) => {
              const sectionEntries = grouped[section.key];
              if (sectionEntries.length === 0) return null;
              return (
                <div key={section.key} className="flex items-end gap-0">
                  {sectionEntries.map((entry) => {
                    const arrangement = BOTTOM_SHELF_ARRANGEMENT[entry.id] || { tilt: 0, offsetY: 0, offsetX: 0 };
                    return (
                      <CartridgeSpine
                        key={entry.id}
                        entry={entry}
                        isLoaded={loadedEntryId === entry.id}
                        onClick={() => onLoad(entry)}
                        tilt={arrangement.tilt}
                        offsetY={arrangement.offsetY}
                        offsetX={arrangement.offsetX}
                        gapBefore={arrangement.gapBefore}
                        useCenter={arrangement.useCenter}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── BOTTOM RAIL (closes the cabinet) ── */}
        {/* <ShelfRail /> */}
      </div>
    </div>
  );
}
