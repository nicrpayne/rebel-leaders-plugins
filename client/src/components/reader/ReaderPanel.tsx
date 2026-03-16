import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { CodexEntry } from "@/lib/codex-schema";
import ReaderSection from "./ReaderSection";
import SectionIndicator from "./SectionIndicator";

// Asset URLs
const PANEL_FRAME_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/KWcjkbZRoapBmsUL.png";
const BACKGROUND_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/sIVygxbdzRPJyTkp.png";

/*
  Panel image analysis (1792 x 2400):
  - Panel (non-transparent) bounds: 9.4% - 90.6% x, 6.7% - 93.3% y
  - Glass (strict amber) area: 19.1% - 80.6% x, 18.2% - 79.5% y
  - Nameplate area: ~88% - 93% y
  - Aspect ratio: 0.747 (w/h)
  
  Strategy: Lock the container to the image's aspect ratio so the image
  fills it exactly (no letterboxing). Then position content using
  percentages relative to the full image dimensions.
*/
const PANEL_ASPECT = 1792 / 2400; // 0.747

/* ── Shared style constants ── */
const LCD_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-lcd)",
  fontSize: "8px",
  letterSpacing: "0.12em",
  color: "rgba(138, 109, 59, 0.4)",
  marginBottom: "5px",
};

const BODY_COLOR = "rgba(35, 18, 5, 0.9)";
const BODY_SOFT = "rgba(35, 18, 5, 0.75)";
const DIVIDER = "1px solid rgba(138, 109, 59, 0.15)";

interface ReaderPanelProps {
  entry: CodexEntry;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "READ" | "RUN";
  /** Skip the fade-in animation (used when restoring from URL hash) */
  skipEnterAnimation?: boolean;
}

/**
 * The Lantern Panel — an immersive reader for Codex entries.
 *
 * Content architecture (4 sections):
 *   1. WHY THIS FOUND YOU   — use_when, avoid, category
 *   2. WHAT THIS OPENS       — objective, outcome, why_it_works, flywheel tags
 *   3. THE PRACTICE           — script (with copy), protocol steps, keys, RUN mode
 *   4. WHAT TO NOTICE         — keys_notes, why_it_works reflection, proof, resources
 */
export default function ReaderPanel({
  entry,
  isOpen,
  onClose,
  initialMode = "READ",
  skipEnterAnimation = false,
}: ReaderPanelProps) {
  const [mode, setMode] = useState<"READ" | "RUN">(initialMode);
  const [activeSection, setActiveSection] = useState(0);
  const [checklist, setChecklist] = useState<boolean[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(!skipEnterAnimation);
  const [scriptCopied, setScriptCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const practiceRef = useRef<HTMLDivElement | null>(null);

  const sections = [
    "WHY THIS FOUND YOU",
    "WHAT THIS OPENS",
    "THE PRACTICE",
    "WHAT TO NOTICE",
  ];

  const steps =
    entry.protocol || entry.script.split("\n").filter((line) => line.trim().length > 0);
  const allChecked = checklist.length > 0 && checklist.every(Boolean);
  const completedCount = checklist.filter(Boolean).length;

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setActiveSection(0);
      setIsClosing(false);
      setIsEntering(skipEnterAnimation ? false : true);
      setScriptCopied(false);
      setChecklist(new Array(steps.length).fill(false));
      document.body.style.overflow = "hidden";
      if (!skipEnterAnimation) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsEntering(false);
          });
        });
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialMode, entry]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const containerHeight = container.clientHeight;

    let closest = 0;
    let closestDistance = Infinity;

    sectionRefs.current.forEach((ref, i) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const relativeTop = rect.top - containerRect.top;
        const distance = Math.abs(relativeTop - containerHeight * 0.3);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = i;
        }
      }
    });

    setActiveSection(closest);
  }, []);

  const toggleStep = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 350);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(entry.script).then(() => {
      setScriptCopied(true);
      setTimeout(() => setScriptCopied(false), 2000);
    });
  };

  const handleSwitchToRun = () => {
    setMode("RUN");
    // Auto-scroll to The Practice section
    setTimeout(() => {
      const practiceEl = sectionRefs.current[2];
      if (practiceEl && scrollRef.current) {
        practiceEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  if (!isOpen) return null;

  const isVisible = !isEntering && !isClosing;

  /* ── Helper: check if "What to Notice" has any content ── */
  const hasProof = entry.proof && (
    (entry.proof.research && entry.proof.research.length > 0) ||
    (entry.proof.books && entry.proof.books.length > 0) ||
    (entry.proof.field_notes && entry.proof.field_notes.length > 0)
  );
  const hasResources = entry.resources && (
    (entry.resources.videos && entry.resources.videos.length > 0) ||
    (entry.resources.writings && entry.resources.writings.length > 0) ||
    (entry.resources.links && entry.resources.links.length > 0)
  );
  const hasReflectionContent = entry.why_it_works || entry.keys_notes;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* ── Background Scene ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BACKGROUND_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
        onClick={handleClose}
      />

      {/* Dim overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(0,0,0,0.2)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* ── Panel Container ── */}
      <div
        className="relative"
        style={{
          height: "115vh",
          width: `calc(115vh * ${PANEL_ASPECT})`,
          maxWidth: "100vw",
          marginTop: "-2vh",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {/* Panel Frame Image */}
        <img
          src={PANEL_FRAME_URL}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{
            objectFit: "fill",
            filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))",
          }}
          draggable={false}
        />

        {/* Section Indicators — each dot is absolutely positioned to sit in its frame hole */}
        <SectionIndicator total={sections.length} activeIndex={activeSection} />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute z-30 transition-all duration-200 hover:opacity-70"
          style={{
            top: "17%",
            right: "20%",
            fontFamily: "var(--font-lcd)",
            color: "rgba(100, 65, 30, 0.5)",
            fontSize: "13px",
            letterSpacing: "0.1em",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 6px",
          }}
          title="Close"
        >
          [X]
        </button>

        {/* Mode Toggle — Nameplate area */}
        <div
          className="absolute z-30 flex gap-3"
          style={{
            bottom: "13%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {(["READ", "RUN"] as const).map((m) => (
            <button
              key={m}
              onClick={() => m === "RUN" ? handleSwitchToRun() : setMode(m)}
              className="transition-all duration-200"
              style={{
                fontFamily: "var(--font-lcd)",
                fontSize: "12px",
                letterSpacing: "0.15em",
                padding: "2px 12px",
                color: mode === m ? "#c5a059" : "#5d4037",
                textShadow:
                  mode === m ? "0 0 4px rgba(197,160,89,0.4)" : "none",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              [{m}]
            </button>
          ))}
        </div>

        {/* ── Glass Content Area ── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="absolute overflow-y-auto overflow-x-hidden"
          style={{
            top: "18%",
            left: "22%",
            width: "56%",
            height: "60%",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            .reader-glass-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          <div className="reader-glass-scroll px-2 md:px-4 py-4 md:py-6">

            {/* ── Title ── */}
            <div className="mb-5 md:mb-7">
              <h1
                className="font-serif font-semibold text-xl md:text-2xl lg:text-3xl leading-tight mb-2"
                style={{ color: "rgba(35, 18, 5, 0.95)" }}
              >
                {entry.title}
              </h1>
              <div
                className="flex flex-wrap items-center gap-2 mt-2"
                style={{
                  fontFamily: "var(--font-lcd)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "rgba(100, 65, 30, 0.8)",
                }}
              >
                <span>{entry.category.toUpperCase()}</span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span>{entry.difficulty}/5</span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span>{entry.time_commitment}</span>
              </div>
            </div>

            {/* ════════════════════════════════════════════
                SECTION 1: WHY THIS FOUND YOU
                Recognition — "this surfaced for a reason"
                Data: briefing.use_when, briefing.avoid
               ════════════════════════════════════════════ */}
            <div
              ref={(el) => { sectionRefs.current[0] = el; }}
              className="mb-7 md:mb-9"
            >
              <ReaderSection
                heading="WHY THIS FOUND YOU"
                isInView={true}
                index={0}
              >
                <div className="space-y-2">
                  {entry.briefing.use_when.map((item, i) => (
                    <p
                      key={i}
                      className="font-serif font-semibold text-base md:text-lg leading-relaxed"
                      style={{ color: BODY_COLOR }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
                {entry.briefing.avoid.length > 0 && (
                  <div className="mt-3 pt-3" style={{ borderTop: DIVIDER }}>
                    <p
                      className="font-serif font-semibold text-sm md:text-base italic"
                      style={{ color: "rgba(35, 18, 5, 0.85)" }}
                    >
                      Not when: {entry.briefing.avoid.join(" ")}
                    </p>
                  </div>
                )}
              </ReaderSection>
            </div>

            {/* ════════════════════════════════════════════
                SECTION 2: WHAT THIS OPENS
                Orientation — "what this is really about"
                Data: briefing.objective, briefing.outcome,
                      why_it_works, flywheel_node tags
               ════════════════════════════════════════════ */}
            <div
              ref={(el) => { sectionRefs.current[1] = el; }}
              className="mb-7 md:mb-9"
            >
              <ReaderSection
                heading="WHAT THIS OPENS"
                isInView={activeSection >= 1}
                index={1}
              >
                <p
                  className="font-serif font-semibold text-base md:text-lg leading-relaxed mb-3"
                  style={{ color: BODY_COLOR }}
                >
                  {entry.briefing.objective}
                </p>
                <p
                  className="font-serif font-semibold text-base md:text-lg leading-relaxed"
                  style={{ color: "rgba(35, 18, 5, 0.85)" }}
                >
                  {entry.briefing.outcome}
                </p>

                {/* Why It Works — the deeper mechanism */}
                {entry.why_it_works && (
                  <div className="mt-4 pt-3" style={{ borderTop: DIVIDER }}>
                    <div style={LCD_LABEL}>WHY IT WORKS</div>
                    <p
                      className="font-serif font-medium text-sm md:text-base leading-relaxed"
                      style={{ color: BODY_SOFT }}
                    >
                      {entry.why_it_works}
                    </p>
                  </div>
                )}

                {/* Flywheel node tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {entry.flywheel_node.map((node) => (
                    <span
                      key={node}
                      style={{
                        fontFamily: "var(--font-lcd)",
                        fontSize: "8px",
                        letterSpacing: "0.12em",
                        color: "rgba(138, 109, 59, 0.6)",
                        padding: "1px 5px",
                        border: "1px solid rgba(138, 109, 59, 0.2)",
                      }}
                    >
                      {node.toUpperCase()}
                    </span>
                  ))}
                </div>
              </ReaderSection>
            </div>

            {/* ════════════════════════════════════════════
                SECTION 3: THE PRACTICE
                Practice — "what to try, gently and concretely"
                Data: script (with copy), protocol steps,
                      keys_primary, keys_secondary
                Modes: READ (view) and RUN (interactive checklist)
               ════════════════════════════════════════════ */}
            <div
              ref={(el) => {
                sectionRefs.current[2] = el;
                practiceRef.current = el;
              }}
              className="mb-7 md:mb-9"
            >
              <ReaderSection
                heading="THE PRACTICE"
                isInView={activeSection >= 2}
                index={2}
              >
                {mode === "READ" ? (
                  <>
                    {/* Verbatim Script */}
                    <div
                      className="mb-4 p-3 relative"
                      style={{
                        background: "rgba(138, 109, 59, 0.06)",
                        borderLeft: "2px solid rgba(138, 109, 59, 0.25)",
                      }}
                    >
                      <p
                        className="font-serif font-semibold text-base md:text-lg leading-relaxed italic"
                        style={{ color: BODY_COLOR }}
                      >
                        &ldquo;{entry.script}&rdquo;
                      </p>
                      {/* Copy button */}
                      <button
                        onClick={handleCopyScript}
                        className="mt-2 transition-all duration-200 hover:opacity-80"
                        style={{
                          fontFamily: "var(--font-lcd)",
                          fontSize: "8px",
                          letterSpacing: "0.12em",
                          color: scriptCopied ? "rgba(138, 109, 59, 0.8)" : "rgba(138, 109, 59, 0.4)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        {scriptCopied ? "COPIED" : "COPY SCRIPT"}
                      </button>
                    </div>

                    {/* Protocol Steps */}
                    <div className="space-y-3">
                      {steps.map((step, i) => (
                        <div key={i} className="flex gap-2">
                          <span
                            className="flex-shrink-0"
                            style={{
                              fontFamily: "var(--font-lcd)",
                              fontSize: "10px",
                              color: "rgba(138, 109, 59, 0.4)",
                              minWidth: "18px",
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p
                            className="font-serif font-semibold text-base md:text-lg leading-relaxed"
                            style={{ color: BODY_COLOR }}
                          >
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Skill Keys */}
                    {(entry.keys_primary || entry.keys_secondary) && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-3" style={{ borderTop: DIVIDER }}>
                        {entry.keys_primary?.map((key) => (
                          <span
                            key={key}
                            style={{
                              fontFamily: "var(--font-lcd)",
                              fontSize: "8px",
                              letterSpacing: "0.12em",
                              color: "rgba(138, 109, 59, 0.7)",
                              padding: "1px 5px",
                              border: "1px solid rgba(138, 109, 59, 0.3)",
                            }}
                          >
                            {key.toUpperCase()}
                          </span>
                        ))}
                        {entry.keys_secondary?.map((key) => (
                          <span
                            key={key}
                            style={{
                              fontFamily: "var(--font-lcd)",
                              fontSize: "8px",
                              letterSpacing: "0.12em",
                              color: "rgba(138, 109, 59, 0.45)",
                              padding: "1px 5px",
                              border: "1px solid rgba(138, 109, 59, 0.15)",
                            }}
                          >
                            {key.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}


                  </>
                ) : (
                  /* ── RUN MODE ── */
                  <div>
                    {/* Progress header */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        style={{
                          fontFamily: "var(--font-lcd)",
                          fontSize: "9px",
                          letterSpacing: "0.15em",
                          color: "rgba(138, 109, 59, 0.7)",
                        }}
                      >
                        {allChecked ? "SEQUENCE COMPLETE" : "EXECUTING"}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-lcd)",
                          fontSize: "9px",
                          letterSpacing: "0.1em",
                          color: "rgba(138, 109, 59, 0.5)",
                        }}
                      >
                        {String(completedCount).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div
                      className="mb-5 relative overflow-hidden"
                      style={{
                        height: "2px",
                        background: "rgba(138, 109, 59, 0.12)",
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 h-full transition-all duration-500 ease-out"
                        style={{
                          width: `${steps.length > 0 ? (completedCount / steps.length) * 100 : 0}%`,
                          background: allChecked
                            ? "rgba(197, 160, 89, 0.9)"
                            : "rgba(197, 160, 89, 0.6)",
                          boxShadow: allChecked
                            ? "0 0 8px rgba(197, 160, 89, 0.4)"
                            : "none",
                        }}
                      />
                    </div>

                    {/* Interactive checklist */}
                    <div className="space-y-3">
                      {steps.map((step, i) => {
                        const isComplete = checklist[i];
                        const isNext = !isComplete && checklist.slice(0, i).every(Boolean) && (i === 0 || checklist[i - 1]);

                        return (
                          <div
                            key={i}
                            className="flex gap-2 items-start cursor-pointer group"
                            onClick={() => toggleStep(i)}
                          >
                            <div
                              className="mt-0.5 flex-shrink-0 transition-all duration-300"
                              style={{
                                width: "15px",
                                height: "15px",
                                border: `1px solid ${
                                  isComplete
                                    ? "rgba(138, 109, 59, 0.6)"
                                    : isNext
                                    ? "rgba(197, 160, 89, 0.7)"
                                    : "rgba(138, 109, 59, 0.3)"
                                }`,
                                background: isComplete
                                  ? "rgba(138, 109, 59, 0.12)"
                                  : "transparent",
                                boxShadow: isNext
                                  ? "0 0 6px rgba(197, 160, 89, 0.25)"
                                  : "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "var(--font-lcd)",
                                fontSize: "10px",
                                color: "rgba(138, 109, 59, 0.8)",
                              }}
                            >
                              {isComplete ? "\u2713" : ""}
                            </div>
                            <p
                              className="font-serif font-semibold text-base md:text-lg leading-relaxed transition-all duration-300"
                              style={{
                                color: isComplete
                                  ? "rgba(35, 18, 5, 0.35)"
                                  : isNext
                                  ? BODY_COLOR
                                  : "rgba(35, 18, 5, 0.55)",
                                textDecoration: isComplete ? "line-through" : "none",
                              }}
                            >
                              {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Completion message */}
                    {allChecked && (
                      <div
                        className="mt-4 pt-3 text-center"
                        style={{ borderTop: DIVIDER }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-lcd)",
                            fontSize: "10px",
                            letterSpacing: "0.15em",
                            color: "rgba(138, 109, 59, 0.7)",
                            textShadow: "0 0 4px rgba(197,160,89,0.2)",
                          }}
                        >
                          SEQUENCE COMPLETE
                        </p>
                        <p
                          className="font-serif font-medium text-sm italic mt-2"
                          style={{ color: BODY_SOFT }}
                        >
                          Trust the protocol. Review outcomes in 7 days.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </ReaderSection>
            </div>

            {/* ════════════════════════════════════════════
                SECTION 4: WHAT TO NOTICE
                Reflection — "what this may be revealing"
                Data: why_it_works (reflection), keys_notes,
                      proof (research, books, field_notes),
                      resources (videos, writings, links)
               ════════════════════════════════════════════ */}
            <div
              ref={(el) => { sectionRefs.current[3] = el; }}
              className="mb-7 md:mb-9"
            >
              <ReaderSection
                heading="WHAT TO NOTICE"
                isInView={activeSection >= 3}
                index={3}
              >
                {/* Reflection text — keys_notes as the contemplative seed */}
                {entry.keys_notes && (
                  <p
                    className="font-serif font-semibold text-base md:text-lg leading-relaxed mb-4"
                    style={{ color: BODY_COLOR }}
                  >
                    {entry.keys_notes}
                  </p>
                )}

                {/* Legacy watch_for (currently 0 entries have this, but kept for safety) */}
                {entry.watch_for && entry.watch_for.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {entry.watch_for.map((item, i) => (
                      <p
                        key={i}
                        className="font-serif font-semibold text-base md:text-lg leading-relaxed"
                        style={{ color: BODY_COLOR }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                )}

                {/* ── Proof Section ── */}
                {hasProof && (
                  <div className="space-y-4 mt-4 pt-3" style={{ borderTop: DIVIDER }}>
                    {entry.proof!.research && entry.proof!.research.length > 0 && (
                      <div>
                        <div style={LCD_LABEL}>RESEARCH</div>
                        {entry.proof!.research.map((item, i) => (
                          <p
                            key={i}
                            className="font-serif font-medium text-sm md:text-base leading-relaxed mb-1"
                            style={{ color: BODY_SOFT }}
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    )}

                    {entry.proof!.books && entry.proof!.books.length > 0 && (
                      <div>
                        <div style={LCD_LABEL}>SOURCES</div>
                        {entry.proof!.books.map((book, i) => (
                          <div key={i} className="mb-1">
                            {book.link ? (
                              <a
                                href={book.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-serif font-semibold text-sm md:text-base italic hover:opacity-70 transition-opacity"
                                style={{ color: "rgba(35, 18, 5, 0.85)" }}
                              >
                                {book.title} — {book.author}
                                {book.chapter ? ` (${book.chapter})` : ""}
                              </a>
                            ) : (
                              <p
                                className="font-serif font-semibold text-sm md:text-base italic"
                                style={{ color: "rgba(35, 18, 5, 0.85)" }}
                              >
                                {book.title} — {book.author}
                                {book.chapter ? ` (${book.chapter})` : ""}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {entry.proof!.field_notes && entry.proof!.field_notes.length > 0 && (
                      <div>
                        <div style={LCD_LABEL}>FIELD NOTES</div>
                        {entry.proof!.field_notes.map((note, i) => (
                          <p
                            key={i}
                            className="font-serif font-medium text-sm md:text-base leading-relaxed mb-1"
                            style={{ color: BODY_SOFT }}
                          >
                            {note}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ── Extended Resources ── */}
                {hasResources && (
                  <div className="space-y-4 mt-4 pt-3" style={{ borderTop: DIVIDER }}>
                    {/* Videos */}
                    {entry.resources!.videos && entry.resources!.videos.length > 0 && (
                      <div>
                        <div style={LCD_LABEL}>WATCH</div>
                        {entry.resources!.videos.map((video, i) => (
                          <a
                            key={i}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mb-2 hover:opacity-70 transition-opacity"
                          >
                            <p
                              className="font-serif font-semibold text-sm md:text-base"
                              style={{ color: "rgba(35, 18, 5, 0.85)" }}
                            >
                              {video.title}
                              {video.duration && (
                                <span
                                  style={{
                                    fontFamily: "var(--font-lcd)",
                                    fontSize: "8px",
                                    color: "rgba(138, 109, 59, 0.4)",
                                    marginLeft: "8px",
                                  }}
                                >
                                  {video.duration}
                                </span>
                              )}
                            </p>
                            {video.description && (
                              <p
                                className="font-serif text-sm"
                                style={{ color: BODY_SOFT }}
                              >
                                {video.description}
                              </p>
                            )}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Writings */}
                    {entry.resources!.writings && entry.resources!.writings.length > 0 && (
                      <div>
                        <div style={LCD_LABEL}>READ</div>
                        {entry.resources!.writings.map((writing, i) => (
                          <div key={i} className="mb-2">
                            {writing.url ? (
                              <a
                                href={writing.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-70 transition-opacity"
                              >
                                <p
                                  className="font-serif font-semibold text-sm md:text-base"
                                  style={{ color: "rgba(35, 18, 5, 0.85)" }}
                                >
                                  {writing.title}
                                </p>
                              </a>
                            ) : (
                              <p
                                className="font-serif font-semibold text-sm md:text-base"
                                style={{ color: "rgba(35, 18, 5, 0.85)" }}
                              >
                                {writing.title}
                              </p>
                            )}
                            {writing.description && (
                              <p
                                className="font-serif text-sm"
                                style={{ color: BODY_SOFT }}
                              >
                                {writing.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    {entry.resources!.links && entry.resources!.links.length > 0 && (
                      <div>
                        <div style={LCD_LABEL}>EXPLORE</div>
                        {entry.resources!.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 mb-2 hover:opacity-70 transition-opacity"
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-lcd)",
                                fontSize: "7px",
                                letterSpacing: "0.1em",
                                color: "rgba(138, 109, 59, 0.4)",
                                textTransform: "uppercase",
                              }}
                            >
                              {link.type}
                            </span>
                            <p
                              className="font-serif font-semibold text-sm md:text-base"
                              style={{ color: "rgba(35, 18, 5, 0.85)" }}
                            >
                              {link.title}
                            </p>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ── Coming Soon state ── */}
                {!hasProof && !hasResources && !hasReflectionContent && (
                  <p
                    className="font-serif font-medium text-sm italic"
                    style={{ color: "rgba(138, 109, 59, 0.35)" }}
                  >
                    Resources gathering. More to come.
                  </p>
                )}

                {/* Coming Soon for resources specifically (when we have proof/reflection but no resources yet) */}
                {!hasResources && (hasProof || hasReflectionContent) && (
                  <div className="mt-4 pt-3" style={{ borderTop: DIVIDER }}>
                    <p
                      className="font-serif font-medium text-sm italic"
                      style={{ color: "rgba(138, 109, 59, 0.3)" }}
                    >
                      Videos, writings, and deeper resources arriving soon.
                    </p>
                  </div>
                )}
              </ReaderSection>
            </div>

            {/* ── End of File marker ── */}
            <div
              className="text-center py-3"
              style={{
                fontFamily: "var(--font-lcd)",
                fontSize: "8px",
                letterSpacing: "0.15em",
                color: "rgba(138, 109, 59, 0.2)",
              }}
            >
              END OF FILE // {entry.id}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
