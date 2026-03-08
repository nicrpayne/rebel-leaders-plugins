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

                              {/* Outcome */}
                              <div className="p-4 bg-amber-900/5 border border-amber-900/20 rounded-sm">
                                <h3 className="font-pixel text-[10px] text-amber-500/70 mb-2 uppercase tracking-widest select-none">Expected Outcome</h3>
                                <p className="text-sm font-sans text-amber-100/80 italic">
                                  "{entry.briefing.outcome}"
                                </p>
                              </div>

                              {/* Primary CTAs */}
                              <div className="pt-4 flex flex-col gap-3 select-none">
                                <button 
                                  onClick={() => setMode("RUN")}
                                  className="w-full py-4 bg-amber-500 text-black font-pixel text-xs tracking-[0.2em] hover:bg-amber-400 transition-all uppercase flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                                >
                                  <span>▶</span>
                                  INITIATE RUN MODE
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
                          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                              <div className="flex justify-between items-center mb-2 select-none">
                                <span className="font-pixel text-[10px] text-[#666] uppercase tracking-widest">Verbatim Script</span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(entry.script);
                                    const btn = document.getElementById("copy-btn-script");
                                    if (btn) {
                                       const originalText = btn.innerText;
                                       btn.innerText = "COPIED";
                                       btn.classList.add("text-amber-500");
                                       setTimeout(() => {
                                          btn.innerText = "COPY TO CLIPBOARD";
                                          btn.classList.remove("text-amber-500");
                                       }, 2000);
                                    }
                                  }}
                                  id="copy-btn-script"
                                  className="text-[10px] font-pixel text-[#555] hover:text-amber-500 transition-colors uppercase tracking-widest flex items-center gap-2"
                                >
                                  <span>⎘</span>
                                  COPY TO CLIPBOARD
                                </button>
                              </div>

                              <div className="whitespace-pre-wrap prose prose-invert prose-amber max-w-none p-8 bg-[#0c0c0c] border border-[#222] rounded-sm font-serif text-xl leading-relaxed text-amber-100/90 shadow-inner select-text">
                                  {entry.script}
                              </div>
                          </div>
                      )}

                      {/* --- EXECUTION TAB --- */}
                      {activeTab === "EXECUTION" && (
                          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 select-text">
                              <div className="flex justify-between items-center mb-4 select-none">
                                <p className="text-sm font-sans text-[#888] italic">
                                    Step-by-step execution guide.
                                </p>
                                <button 
                                  onClick={() => setMode("RUN")}
                                  className="text-[10px] font-pixel text-amber-500 border border-amber-500/30 px-3 py-1 hover:bg-amber-500/10 transition-colors uppercase tracking-widest"
                                >
                                  Start Checklist
                                </button>
                              </div>
                              
                              {steps.map((step, i) => (
                                  <div key={i} className="flex gap-4 p-4 border border-[#222] bg-[#0c0c0c]">
                                      <span className="font-pixel text-amber-900/50 text-xs pt-1 select-none">0{i + 1}</span>
                                      <p className="text-base font-sans text-[#ccc]">{step}</p>
                                  </div>
                              ))}
                          </div>
                      )}

                      {/* --- PROOF TAB --- */}
                      {activeTab === "PROOF" && entry.proof && (
                          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 select-text">
                              
                              {/* Research */}
                              {entry.proof.research && (
                                <div>
                                  <h3 className="font-pixel text-[10px] text-amber-500 mb-4 uppercase tracking-widest flex items-center gap-2 select-none">
                                    <span className="w-2 h-2 bg-amber-500/50 rounded-full"></span>
                                    Research & Data
                                  </h3>
                                  <ul className="space-y-4">
                                    {entry.proof.research.map((item, i) => (
                                      <li key={i} className="p-4 bg-[#0c0c0c] border border-[#222] text-sm font-sans text-[#ccc] leading-relaxed">
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Books */}
                              {entry.proof.books && (
                                <div>
                                  <h3 className="font-pixel text-[10px] text-amber-500 mb-4 uppercase tracking-widest flex items-center gap-2 select-none">
                                    <span className="w-2 h-2 bg-amber-500/50 rounded-full"></span>
                                    Reference Material
                                  </h3>
                                  <div className="grid grid-cols-1 gap-3">
                                    {entry.proof.books.map((book, i) => (
                                      <div key={i} className="flex items-center justify-between p-3 border border-[#222] hover:border-amber-500/30 transition-colors">
                                        <div>
                                          <div className="text-amber-100 font-serif italic">{book.title}</div>
                                          <div className="text-xs text-[#666] font-mono">{book.author}</div>
                                        </div>
                                        {book.chapter && (
                                          <div className="text-[10px] font-pixel text-[#444] bg-[#111] px-2 py-1 select-none">
                                            {book.chapter}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Field Notes */}
                              {entry.proof.field_notes && (
                                <div>
                                  <h3 className="font-pixel text-[10px] text-amber-500 mb-4 uppercase tracking-widest flex items-center gap-2 select-none">
                                    <span className="w-2 h-2 bg-amber-500/50 rounded-full"></span>
                                    Field Notes
                                  </h3>
                                  <div className="p-4 bg-[#111] border-l-2 border-[#333] text-sm font-mono text-[#888] italic">
                                    {entry.proof.field_notes.map((note, i) => (
                                      <p key={i}>{note}</p>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                      )}
                  </div>
              </div>
            ) : (
              /* RUN MODE (Checklist) */
              <div className="p-6 md:p-8 space-y-6 animate-in slide-in-from-right duration-300 select-none">
                  <div className="flex items-center justify-between mb-4">
                      <span className="font-pixel text-[10px] text-amber-500 tracking-widest animate-pulse">EXECUTION IN PROGRESS</span>
                      <span className="font-mono text-xs text-[#666]">
                          {checklist.filter(Boolean).length} / {steps.length} COMPLETE
                      </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-1 bg-[#222] w-full mb-8 relative overflow-hidden">
                      <div 
                          className="h-full bg-amber-500 transition-all duration-300 relative z-10"
                          style={{ width: `${(checklist.filter(Boolean).length / steps.length) * 100}%` }}
                      />
                      {/* Background Grid Pattern */}
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                  </div>

                  <div className="space-y-2">
                      {steps.map((step, i) => (
                          <div 
                              key={i}
                              onClick={() => toggleStep(i)}
                              className={cn(
                                  "flex gap-4 p-4 border cursor-pointer transition-all duration-200 select-none group",
                                  checklist[i] 
                                      ? "bg-amber-900/10 border-amber-500/30 opacity-50" 
                                      : "bg-[#0c0c0c] border-[#222] hover:border-amber-500/50 hover:bg-[#111]"
                              )}
                          >
                              <div className={cn(
                                  "w-6 h-6 border flex items-center justify-center flex-shrink-0 transition-colors",
                                  checklist[i] ? "bg-amber-500 border-amber-500" : "border-[#444] group-hover:border-amber-500/50"
                              )}>
                                  {checklist[i] && <span className="text-black font-bold text-xs">✓</span>}
                              </div>
                              <p className={cn(
                                  "text-base transition-colors font-sans",
                                  checklist[i] ? "text-amber-500/50 line-through" : "text-[#ccc] group-hover:text-amber-100"
                              )}>{step}</p>
                          </div>
                      ))}
                  </div>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-[#222] bg-[#0c0c0c] flex justify-between items-center flex-shrink-0 z-20 select-none">
              <div className="text-[10px] font-pixel text-[#444]">END OF FILE // {entry.id}</div>
              <div className="flex gap-4">
                  {mode === "READ" ? (
                      <div className="text-[9px] font-mono text-[#333]">
                        READ_ONLY_MODE
                      </div>
                  ) : (
                      <button 
                          onClick={() => setMode("READ")}
                          className="text-[#666] hover:text-amber-500 border border-transparent hover:border-amber-500/30 px-4 py-2 font-pixel text-[10px] transition-all uppercase tracking-widest"
                      >
                          ABORT RUN
                      </button>
                  )}
              </div>
          </div>

        </div> {/* End Content Container */}
      </div>
    </div>,
    document.body
  );
}
