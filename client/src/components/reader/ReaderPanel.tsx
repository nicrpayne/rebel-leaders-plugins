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

interface ReaderPanelProps {
  entry: CodexEntry;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "READ" | "RUN";
}

/**
 * The Lantern Panel — an immersive reader that replaces the ReaderDrawer.
 * Renders the Codex entry content inside a warm amber glass panel
 * with the office/Codex station scene as a blurred background.
 *
 * Content is organized into four sections:
 * 1. Why This Found You (use_when + avoid signals)
 * 2. What This Opens (objective + outcome + flywheel nodes)
 * 3. The Practice (script + protocol steps, RUN mode lives here)
 * 4. What to Notice (watch_for + reflective cues)
 */
export default function ReaderPanel({
  entry,
  isOpen,
  onClose,
  initialMode = "READ",
}: ReaderPanelProps) {
  const [mode, setMode] = useState<"READ" | "RUN">(initialMode);
  const [activeSection, setActiveSection] = useState(0);
  const [checklist, setChecklist] = useState<boolean[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Section definitions
  const sections = [
    "WHY THIS FOUND YOU",
    "WHAT THIS OPENS",
    "THE PRACTICE",
    "WHAT TO NOTICE",
  ];

  // Reset state when entry changes or panel opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setActiveSection(0);
      setIsClosing(false);
      setIsEntering(true);
      setChecklist(
        new Array(
          (entry.protocol || entry.script.split("\n").filter((l) => l.trim())).length
        ).fill(false)
      );
      document.body.style.overflow = "hidden";
      // Trigger enter animation after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsEntering(false);
        });
      });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialMode, entry]);

  // Track which section is in view via scroll position
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

  // Toggle checklist step
  const toggleStep = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
  };

  // Close with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 350);
  };

  // Derive content from entry
  const steps =
    entry.protocol || entry.script.split("\n").filter((line) => line.trim().length > 0);
  const allChecked = checklist.length > 0 && checklist.every(Boolean);

  if (!isOpen) return null;

  // Animation state
  const isVisible = !isEntering && !isClosing;

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

      {/* Dim overlay on background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(0,0,0,0.25)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* ── Panel Container ── */}
      <div
        className="relative"
        style={{
          width: "min(780px, 95vw)",
          height: "96vh",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {/* Panel Frame Image — fills the container */}
        <img
          src={PANEL_FRAME_URL}
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
          style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))" }}
          draggable={false}
        />

        {/*
          The panel frame image has internal structure:
          - The glass/parchment area sits roughly at:
            top: ~5%, bottom: ~92%, left: ~10%, right: ~90%
          - There's a nameplate strip at the very bottom (~92-97%)
          - Small screws/indicators at corners
          
          All interactive elements must be positioned RELATIVE to the
          panel container, within these bounds.
        */}

        {/* Section Indicators — inside left edge of glass */}
        <div
          className="absolute z-30"
          style={{
            left: "12%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <SectionIndicator total={sections.length} activeIndex={activeSection} />
        </div>

        {/* Close Button — inside top-right of glass area */}
        <button
          onClick={handleClose}
          className="absolute z-30 transition-all duration-200 hover:opacity-70"
          style={{
            top: "6%",
            right: "12%",
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

        {/* Mode Toggle — inside the nameplate area at bottom of frame */}
        <div
          className="absolute z-30 flex gap-3"
          style={{
            bottom: "4%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {(["READ", "RUN"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
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
        {/*
          Positioned to sit inside the glass/parchment area of the frame image.
          The frame has ~10% bezel on each side, ~5% at top, ~8% at bottom (above nameplate).
        */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="absolute overflow-y-auto overflow-x-hidden"
          style={{
            top: "6%",
            bottom: "9%",
            left: "15%",
            right: "12%",
            /* Hide scrollbar for cleaner look */
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            .reader-glass-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          <div className="reader-glass-scroll px-3 md:px-5 py-5 md:py-7">
            {/* ── Title ── */}
            <div className="mb-6 md:mb-8">
              <h1
                className="font-serif text-xl md:text-2xl lg:text-3xl leading-tight mb-2"
                style={{ color: "rgba(55, 30, 12, 0.9)" }}
              >
                {entry.title}
              </h1>
              <div
                className="flex flex-wrap items-center gap-2 mt-2"
                style={{
                  fontFamily: "var(--font-lcd)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "rgba(138, 109, 59, 0.7)",
                }}
              >
                <span>{entry.id}</span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span>{entry.difficulty}/5</span>
                <span style={{ opacity: 0.4 }}>|</span>
                <span>{entry.time_commitment}</span>
              </div>
            </div>

            {/* ── Section 1: Why This Found You ── */}
            <div
              ref={(el) => { sectionRefs.current[0] = el; }}
              className="mb-8 md:mb-10"
            >
              <ReaderSection
                heading="WHY THIS FOUND YOU"
                isInView={true}
                index={0}
              >
                <div className="space-y-3">
                  {entry.briefing.use_when.map((item, i) => (
                    <p
                      key={i}
                      className="font-serif text-sm md:text-base leading-relaxed"
                      style={{ color: "rgba(55, 30, 12, 0.8)" }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
                {entry.briefing.avoid.length > 0 && (
                  <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(138, 109, 59, 0.15)" }}>
                    <p
                      className="font-serif text-xs md:text-sm italic"
                      style={{ color: "rgba(100, 65, 30, 0.5)" }}
                    >
                      Not when: {entry.briefing.avoid.join(" ")}
                    </p>
                  </div>
                )}
              </ReaderSection>
            </div>

            {/* ── Section 2: What This Opens ── */}
            <div
              ref={(el) => { sectionRefs.current[1] = el; }}
              className="mb-8 md:mb-10"
            >
              <ReaderSection
                heading="WHAT THIS OPENS"
                isInView={activeSection >= 1}
                index={1}
              >
                <p
                  className="font-serif text-sm md:text-base leading-relaxed mb-3"
                  style={{ color: "rgba(55, 30, 12, 0.85)" }}
                >
                  {entry.briefing.objective}
                </p>
                <p
                  className="font-serif text-sm md:text-base leading-relaxed"
                  style={{ color: "rgba(55, 30, 12, 0.75)" }}
                >
                  {entry.briefing.outcome}
                </p>
                {/* Flywheel node tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {entry.flywheel_node.map((node) => (
                    <span
                      key={node}
                      style={{
                        fontFamily: "var(--font-lcd)",
                        fontSize: "9px",
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

            {/* ── Section 3: The Practice ── */}
            <div
              ref={(el) => { sectionRefs.current[2] = el; }}
              className="mb-8 md:mb-10"
            >
              <ReaderSection
                heading="THE PRACTICE"
                isInView={activeSection >= 2}
                index={2}
              >
                {mode === "READ" ? (
                  <>
                    {/* Script */}
                    <div
                      className="mb-5 p-3 md:p-4 relative"
                      style={{
                        background: "rgba(138, 109, 59, 0.06)",
                        borderLeft: "2px solid rgba(138, 109, 59, 0.25)",
                      }}
                    >
                      <p
                        className="font-serif text-sm md:text-base leading-relaxed italic"
                        style={{ color: "rgba(55, 30, 12, 0.85)" }}
                      >
                        &ldquo;{entry.script}&rdquo;
                      </p>
                    </div>

                    {/* Protocol Steps */}
                    <div className="space-y-3">
                      {steps.map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <span
                            className="flex-shrink-0"
                            style={{
                              fontFamily: "var(--font-lcd)",
                              fontSize: "11px",
                              color: "rgba(138, 109, 59, 0.45)",
                              minWidth: "20px",
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p
                            className="font-serif text-sm md:text-base leading-relaxed"
                            style={{ color: "rgba(55, 30, 12, 0.8)" }}
                          >
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* RUN Mode — Interactive checklist */
                  <div className="space-y-3">
                    {steps.map((step, i) => (
                      <div
                        key={i}
                        className="flex gap-3 items-start cursor-pointer group"
                        onClick={() => toggleStep(i)}
                      >
                        {/* Checkbox */}
                        <div
                          className="mt-0.5 flex-shrink-0 transition-all duration-300"
                          style={{
                            width: "16px",
                            height: "16px",
                            border: `1px solid ${
                              checklist[i]
                                ? "rgba(138, 109, 59, 0.6)"
                                : "rgba(138, 109, 59, 0.3)"
                            }`,
                            background: checklist[i]
                              ? "rgba(138, 109, 59, 0.12)"
                              : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--font-lcd)",
                            fontSize: "11px",
                            color: "rgba(138, 109, 59, 0.8)",
                          }}
                        >
                          {checklist[i] ? "✓" : ""}
                        </div>
                        <p
                          className="font-serif text-sm md:text-base leading-relaxed transition-all duration-300"
                          style={{
                            color: checklist[i]
                              ? "rgba(55, 30, 12, 0.35)"
                              : "rgba(55, 30, 12, 0.8)",
                            textDecoration: checklist[i] ? "line-through" : "none",
                          }}
                        >
                          {step}
                        </p>
                      </div>
                    ))}

                    {/* Completion state */}
                    {allChecked && (
                      <div
                        className="mt-5 pt-3 text-center"
                        style={{ borderTop: "1px solid rgba(138, 109, 59, 0.15)" }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-lcd)",
                            fontSize: "11px",
                            letterSpacing: "0.15em",
                            color: "rgba(138, 109, 59, 0.7)",
                            textShadow: "0 0 4px rgba(197,160,89,0.2)",
                          }}
                        >
                          SEQUENCE COMPLETE
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </ReaderSection>
            </div>

            {/* ── Section 4: What to Notice ── */}
            <div
              ref={(el) => { sectionRefs.current[3] = el; }}
              className="mb-8 md:mb-10"
            >
              <ReaderSection
                heading="WHAT TO NOTICE"
                isInView={activeSection >= 3}
                index={3}
              >
                {/* Watch for items */}
                {entry.watch_for && entry.watch_for.length > 0 && (
                  <div className="space-y-3 mb-5">
                    {entry.watch_for.map((item, i) => (
                      <p
                        key={i}
                        className="font-serif text-sm md:text-base leading-relaxed"
                        style={{ color: "rgba(55, 30, 12, 0.8)" }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                )}

                {/* Proof / Research */}
                {entry.proof && (
                  <div className="space-y-4">
                    {entry.proof.research && entry.proof.research.length > 0 && (
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-lcd)",
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            color: "rgba(138, 109, 59, 0.45)",
                            marginBottom: "6px",
                          }}
                        >
                          RESEARCH
                        </div>
                        {entry.proof.research.map((item, i) => (
                          <p
                            key={i}
                            className="font-serif text-xs md:text-sm leading-relaxed mb-2"
                            style={{ color: "rgba(55, 30, 12, 0.6)" }}
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    )}

                    {entry.proof.books && entry.proof.books.length > 0 && (
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-lcd)",
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            color: "rgba(138, 109, 59, 0.45)",
                            marginBottom: "6px",
                          }}
                        >
                          SOURCES
                        </div>
                        {entry.proof.books.map((book, i) => (
                          <p
                            key={i}
                            className="font-serif text-xs md:text-sm italic mb-1"
                            style={{ color: "rgba(55, 30, 12, 0.55)" }}
                          >
                            {book.title} — {book.author}
                            {book.chapter ? ` (${book.chapter})` : ""}
                          </p>
                        ))}
                      </div>
                    )}

                    {entry.proof.field_notes && entry.proof.field_notes.length > 0 && (
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-lcd)",
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            color: "rgba(138, 109, 59, 0.45)",
                            marginBottom: "6px",
                          }}
                        >
                          FIELD NOTES
                        </div>
                        {entry.proof.field_notes.map((note, i) => (
                          <p
                            key={i}
                            className="font-serif text-xs md:text-sm leading-relaxed mb-2"
                            style={{ color: "rgba(55, 30, 12, 0.6)" }}
                          >
                            {note}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </ReaderSection>
            </div>

            {/* ── End of File marker ── */}
            <div
              className="text-center py-4"
              style={{
                fontFamily: "var(--font-lcd)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: "rgba(138, 109, 59, 0.25)",
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
