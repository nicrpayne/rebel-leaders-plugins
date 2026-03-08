import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { CodexEntry } from "@/lib/codex-schema";

interface ReaderDrawerProps {
  entry: CodexEntry;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "READ" | "RUN";
}

export default function ReaderDrawer({
  entry,
  isOpen,
  onClose,
  initialMode = "READ"
}: ReaderDrawerProps) {
  const [activeTab, setActiveTab] = useState<"BRIEFING" | "SCRIPT" | "EXECUTION" | "PROOF">("BRIEFING");
  const [mode, setMode] = useState<"READ" | "RUN">(initialMode);
  const [checklist, setChecklist] = useState<boolean[]>([]);

  // Detect Coaching Entry
  const isCoaching = entry.pack === "Core Protocols v1" || entry.title.toLowerCase().includes("coaching");

  // Sync mode when initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setActiveTab("BRIEFING"); // Always start with Briefing
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = ''; // Unlock scroll
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialMode]);

  // Initialize checklist based on protocol steps
  const steps = entry.protocol || entry.script.split("\n").filter(line => line.trim().length > 0);

  const toggleStep = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
  };

  if (!isOpen) return null;

  // Use React Portal to render at the body level, bypassing all parent stacking contexts
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex justify-center font-sans">
      {/* Backdrop - Dimmed & Locked */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Drawer Panel - Mechanical Extraction from Top */}
      <div className="relative w-full md:max-w-3xl h-[90vh] mt-[5vh] flex flex-col animate-in slide-in-from-top-[10%] duration-300 ease-[cubic-bezier(0.2,0.0,0.2,1)] z-50 shadow-2xl rounded-b-lg overflow-hidden select-none">
        
        {/* Drawer Frame Background */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[#080808] border border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
           {/* Mechanical Rail/Hinge Visual */}
           <div className="absolute top-0 left-0 right-0 h-2 bg-[#111] border-b border-[#333] flex justify-center items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-[#333]" />
              <div className="w-1 h-1 rounded-full bg-[#333]" />
              <div className="w-1 h-1 rounded-full bg-[#333]" />
           </div>
           
           {/* Extracted Label */}
           <div className="absolute top-3 right-4 text-[8px] font-pixel text-amber-900/40 tracking-widest uppercase">
              READER DRAWER // EXTRACTED
           </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full bg-[#080808]">
        
          {/* Header - Tactical Briefing Style */}
          <div className="p-6 md:p-8 border-b border-[#222] bg-[#0c0c0c] relative overflow-hidden flex-shrink-0 mt-2">
            {/* Punch Card Header Image */}
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_punchcard_header-JtB8WXchbX2yc6P7JMTyZr.webp"
              alt="Header Pattern"
              className="absolute top-0 left-0 right-0 h-4 w-full object-cover opacity-30 pointer-events-none"
            />

            <div className="relative z-10 mt-4 flex justify-between items-start">
              <div className="w-full">
                  {/* File Stamp Metadata */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 font-mono text-[10px] text-[#666] tracking-widest uppercase border-b border-[#222] pb-2">
                    <span className="text-amber-500">ID: {entry.id}</span>
                    <span>//</span>
                    <span>SECTOR: {entry.category}</span>
                    <span>//</span>
                    <span>TIME: {entry.time_commitment}</span>
                    <span>//</span>
                    <span>DIFF: {"★".repeat(entry.difficulty)}{"☆".repeat(5 - entry.difficulty)}</span>
                  </div>

                  {/* Big Serif Title */}
                  <h2 className="font-serif text-3xl md:text-5xl text-amber-100 mb-4 leading-none tracking-tight">
                    {entry.title}
                  </h2>

                  {/* One-Line Objective */}
                  {entry.briefing && (
                    <div className="flex gap-3 items-start">
                      <span className="font-pixel text-[10px] text-amber-500 bg-amber-900/20 px-1 py-0.5 mt-1">OBJ:</span>
                      <p className="font-mono text-sm text-amber-500/90 leading-relaxed select-text">
                        {entry.briefing.objective}
                      </p>
                    </div>
                  )}
              </div>
              
              <button 
                onClick={onClose}
                className="text-[#444] hover:text-amber-500 transition-colors p-2 -mr-2 -mt-2"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-[#0a0a0a] scrollbar-thin scrollbar-thumb-amber-900/20 scrollbar-track-[#050505]">
            
            {mode === "READ" ? (
              <div className="p-6 md:p-8">
                  {/* Tabs */}
                  <div className="flex gap-6 mb-8 border-b border-[#222] overflow-x-auto scrollbar-hide">
                      {["BRIEFING", "SCRIPT", "EXECUTION", "PROOF"].map((tab) => (
                          <button
                              key={tab}
                              onClick={() => setActiveTab(tab as any)}
                              className={cn(
                                  "pb-2 text-xs font-pixel tracking-widest transition-colors relative whitespace-nowrap",
                                  activeTab === tab ? "text-amber-500" : "text-[#555] hover:text-[#888]"
                              )}
                          >
                              {tab}
                              {activeTab === tab && (
                                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
                              )}
                          </button>
                      ))}
                  </div>

                  {/* Tab Content */}
                  <div className="font-serif text-lg leading-relaxed text-[#ccc]">
                      
                      {/* --- BRIEFING TAB --- */}
                      {activeTab === "BRIEFING" && entry.briefing && (
                          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 select-text">
                              
                              {/* Mission Objective (Typewriter Effect) */}
                              <div className="p-6 bg-[#0c0c0c] border border-[#222] border-l-2 border-l-amber-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-10 font-pixel text-[100px] leading-none text-amber-500 pointer-events-none select-none">
                                  ?
                                </div>
                                <h3 className="font-pixel text-[10px] text-amber-500 mb-3 uppercase tracking-widest select-none">Mission Objective</h3>
                                <p className="font-mono text-lg text-amber-100 leading-relaxed">
                                  {entry.briefing.objective}
                                </p>
                              </div>

                              {/* Coaching Specific: Why It Works */}
                              {isCoaching && entry.why_it_works && (
                                <div className="p-4 bg-amber-900/5 border border-amber-900/20 rounded-sm">
                                  <h3 className="font-pixel text-[10px] text-amber-500/70 mb-2 uppercase tracking-widest select-none">Why It Works</h3>
                                  <p className="text-sm font-sans text-amber-100/80 italic">
                                    "{entry.why_it_works}"
                                  </p>
                                </div>
                              )}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Use When */}
                                <div>
                                  <h3 className="font-pixel text-[10px] text-[#666] mb-3 uppercase tracking-widest border-b border-[#222] pb-1 select-none">Use When</h3>
                                  <ul className="space-y-3">
                                    {entry.briefing.use_when.map((item, i) => (
                                      <li key={i} className="flex gap-3 text-sm font-sans text-[#ccc]">
                                        <span className="text-amber-500/50 mt-1 select-none">Target</span>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Avoid */}
                                <div>
                                  <h3 className="font-pixel text-[10px] text-[#666] mb-3 uppercase tracking-widest border-b border-[#222] pb-1 select-none">Avoid</h3>
                                  <ul className="space-y-3">
                                    {entry.briefing.avoid.map((item, i) => (
                                      <li key={i} className="flex gap-3 text-sm font-sans text-[#999]">
                                        <span className="text-red-900/50 mt-1 select-none">X</span>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Outcome (Only show if not Coaching, or if Coaching doesn't have why_it_works) */}
                              {(!isCoaching || !entry.why_it_works) && (
                                <div className="p-4 bg-amber-900/5 border border-amber-900/20 rounded-sm">
                                  <h3 className="font-pixel text-[10px] text-amber-500/70 mb-2 uppercase tracking-widest select-none">Expected Outcome</h3>
                                  <p className="text-sm font-sans text-amber-100/80 italic">
                                    "{entry.briefing.outcome}"
                                  </p>
                                </div>
                              )}

                              {/* Primary CTAs */}
                              <div className="pt-4 flex flex-col gap-3 select-none">
                                <button 
                                  onClick={() => setMode("RUN")}
                                  className="w-full py-4 bg-amber-500 text-black font-pixel text-xs tracking-[0.2em] hover:bg-amber-400 transition-all uppercase flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                                >
                                  <span>▶</span>
                                  {isCoaching ? "INITIATE COACHING SEQUENCE" : "INITIATE RUN MODE"}
                                </button>
                                <button 
                                  onClick={() => setActiveTab("SCRIPT")}
                                  className="w-full py-3 border border-[#333] text-[#888] font-pixel text-[10px] tracking-[0.2em] hover:text-amber-500 hover:border-amber-500/30 transition-all uppercase"
                                >
                                  VIEW SCRIPT SOURCE
                                </button>
                              </div>
                          </div>
                      )}

                      {/* --- SCRIPT TAB --- */}
                      {activeTab === "SCRIPT" && (
                          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 select-text">
                              <div className="p-6 bg-[#111] border border-[#333] font-mono text-sm md:text-base text-amber-100 leading-loose whitespace-pre-wrap relative group">
                                  {entry.script}
                                  
                                  {/* Copy Button */}
                                  <button 
                                    onClick={() => navigator.clipboard.writeText(entry.script)}
                                    className="absolute top-4 right-4 p-2 bg-[#222] border border-[#444] text-[#888] hover:text-amber-500 hover:border-amber-500 transition-all opacity-0 group-hover:opacity-100"
                                    title="Copy to Clipboard"
                                  >
                                    <span className="font-pixel text-[10px] uppercase tracking-widest">COPY</span>
                                  </button>
                              </div>
                          </div>
                      )}

                      {/* --- EXECUTION TAB --- */}
                      {activeTab === "EXECUTION" && (
                          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 select-text">
                              <ol className="space-y-6 list-decimal list-inside font-mono text-sm text-[#ccc]">
                                  {entry.protocol.map((step, i) => (
                                      <li key={i} className="pl-4 border-l border-[#333]">
                                          <span className="text-amber-100">{step}</span>
                                      </li>
                                  ))}
                              </ol>
                          </div>
                      )}

                      {/* --- PROOF TAB --- */}
                      {activeTab === "PROOF" && entry.proof && (
                          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 select-text">
                              
                              {/* Research */}
                              {entry.proof.research && (
                                <div>
                                  <h3 className="font-pixel text-[10px] text-[#666] mb-4 uppercase tracking-widest border-b border-[#222] pb-1 select-none">Research & Data</h3>
                                  <ul className="space-y-4">
                                    {entry.proof.research.map((item, i) => (
                                      <li key={i} className="flex gap-3 text-sm font-sans text-[#ccc]">
                                        <span className="text-amber-500/50 mt-1 select-none">●</span>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Books */}
                              {entry.proof.books && (
                                <div>
                                  <h3 className="font-pixel text-[10px] text-[#666] mb-4 uppercase tracking-widest border-b border-[#222] pb-1 select-none">Reference Library</h3>
                                  <div className="grid grid-cols-1 gap-4">
                                    {entry.proof.books.map((book, i) => (
                                      <div key={i} className="p-4 bg-[#111] border border-[#222] flex flex-col">
                                        <span className="font-serif text-amber-100 text-lg italic">{book.title}</span>
                                        <span className="font-mono text-xs text-[#666] uppercase tracking-widest mt-1">{book.author}</span>
                                        {book.chapter && (
                                          <span className="font-mono text-xs text-amber-500/70 mt-2">
                                            See: {book.chapter}
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Field Notes */}
                              {entry.proof.field_notes && (
                                <div>
                                  <h3 className="font-pixel text-[10px] text-[#666] mb-4 uppercase tracking-widest border-b border-[#222] pb-1 select-none">Field Notes</h3>
                                  <div className="p-6 bg-[#151515] border-l-2 border-amber-900/50 italic text-[#999] font-serif">
                                    {entry.proof.field_notes.map((note, i) => (
                                      <p key={i} className="mb-4 last:mb-0">"{note}"</p>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                      )}
                  </div>
              </div>
            ) : (
              /* --- RUN MODE (CHECKLIST) --- */
              <div className="p-6 md:p-8 h-full flex flex-col animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between mb-8 border-b border-amber-900/30 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-amber-500 animate-pulse rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                      <h3 className="font-pixel text-xs text-amber-500 tracking-[0.2em] uppercase">
                        {isCoaching ? "COACHING SEQUENCE ACTIVE" : "RUN MODE ACTIVE"}
                      </h3>
                    </div>
                    <button 
                      onClick={() => setMode("READ")}
                      className="text-[#666] hover:text-amber-500 font-pixel text-[10px] tracking-widest uppercase transition-colors"
                    >
                      ABORT SEQUENCE
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {steps.map((step, index) => (
                      <div 
                        key={index}
                        onClick={() => toggleStep(index)}
                        className={cn(
                          "p-4 border transition-all cursor-pointer group relative overflow-hidden",
                          checklist[index] 
                            ? "bg-amber-900/10 border-amber-500/30 opacity-50" 
                            : "bg-[#111] border-[#333] hover:border-amber-500/50"
                        )}
                      >
                        <div className="flex gap-4 items-start relative z-10">
                          <div className={cn(
                            "w-6 h-6 border flex items-center justify-center transition-all mt-0.5 flex-shrink-0",
                            checklist[index] 
                              ? "bg-amber-500 border-amber-500 text-black" 
                              : "border-[#444] text-transparent group-hover:border-amber-500/50"
                          )}>
                            ✓
                          </div>
                          <p className={cn(
                            "font-mono text-sm md:text-base transition-all leading-relaxed",
                            checklist[index] ? "text-amber-500/50 line-through" : "text-amber-100"
                          )}>
                            {step}
                          </p>
                        </div>
                        
                        {/* Progress Bar Background */}
                        {checklist[index] && (
                           <div className="absolute inset-0 bg-amber-500/5 pointer-events-none" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Progress Footer */}
                  <div className="mt-6 pt-6 border-t border-[#222] flex items-center justify-between">
                     <div className="font-pixel text-[10px] text-[#666] tracking-widest uppercase">
                        PROGRESS: {checklist.filter(Boolean).length} / {steps.length}
                     </div>
                     {checklist.filter(Boolean).length === steps.length && (
                        <div className="font-pixel text-xs text-amber-500 tracking-widest uppercase animate-pulse">
                           SEQUENCE COMPLETE
                        </div>
                     )}
                  </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
