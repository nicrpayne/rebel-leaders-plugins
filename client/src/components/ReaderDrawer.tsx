import { useState, useEffect } from "react";
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
  const [activeTab, setActiveTab] = useState<"SCRIPT" | "PROTOCOL" | "WHY">("SCRIPT");
  const [mode, setMode] = useState<"READ" | "RUN">(initialMode);
  const [checklist, setChecklist] = useState<boolean[]>([]);

  // Sync mode when initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Initialize checklist based on protocol steps
  const steps = entry.script.split("\n").filter(line => line.trim().length > 0);

  const toggleStep = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div className="relative w-full md:max-w-2xl h-full flex flex-col animate-in slide-in-from-right duration-300 z-50">
        
        {/* Drawer Frame Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
           <div className="absolute inset-y-0 right-0 w-[95%] bg-[#080808] shadow-[-20px_0_50px_rgba(0,0,0,0.9)]" />
           <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_reader_drawer_frame-S3VJCi4oxJEsrLps74v8Yn.webp"
              alt="Drawer Frame"
              className="absolute top-0 bottom-0 left-0 w-12 h-full object-cover object-left"
           />
        </div>

        {/* Content Container (Offset for frame) */}
        <div className="relative z-10 flex flex-col h-full pl-8 md:pl-12 bg-[#080808] ml-2">
        
          {/* Header - Tape Deck Style */}
          <div className="p-6 md:p-8 border-b border-[#222] bg-[#0c0c0c] relative overflow-hidden flex-shrink-0">
            {/* Punch Card Header Image */}
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_punchcard_header-JtB8WXchbX2yc6P7JMTyZr.webp"
              alt="Header Pattern"
              className="absolute top-0 left-0 right-0 h-4 w-full object-cover opacity-30 pointer-events-none"
            />

            <div className="relative z-10 mt-2 flex justify-between items-start">
              <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[9px] font-pixel text-amber-500 bg-amber-900/20 px-2 py-1 border border-amber-500/20">
                      {entry.category}
                    </span>
                    <span className="text-[9px] font-pixel text-[#555]">
                      {entry.time_commitment}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-4xl text-amber-100 mb-2 italic leading-tight">
                    {entry.title}
                  </h2>
                  <div className="text-[10px] font-mono text-amber-900/60 tracking-widest">PROTOCOL_ID: {entry.id}</div>
              </div>
              
              <button 
                onClick={onClose}
                className="text-[#444] hover:text-amber-500 transition-colors p-2 -mr-2"
              >
                ✕
              </button>
            </div>

            {/* Mode Switcher (Read vs Run) */}
            <div className="flex gap-4 mt-6 border-t border-[#222] pt-4">
               <button 
                 onClick={() => setMode("READ")}
                 className={cn(
                   "text-[10px] font-pixel tracking-widest uppercase transition-colors",
                   mode === "READ" ? "text-amber-500 border-b border-amber-500" : "text-[#555] hover:text-amber-500/50"
                 )}
               >
                 READ MODE
               </button>
               <button 
                 onClick={() => setMode("RUN")}
                 className={cn(
                   "text-[10px] font-pixel tracking-widest uppercase transition-colors",
                   mode === "RUN" ? "text-amber-500 border-b border-amber-500" : "text-[#555] hover:text-amber-500/50"
                 )}
               >
                 RUN CHECKLIST
               </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-[#0a0a0a] scrollbar-thin scrollbar-thumb-amber-900/20 scrollbar-track-[#050505]">
            
            {mode === "READ" ? (
              <div className="p-6 md:p-8">
                  {/* Tabs */}
                  <div className="flex gap-6 mb-8 border-b border-[#222]">
                      {["SCRIPT", "PROTOCOL", "WHY"].map((tab) => (
                          <button
                              key={tab}
                              onClick={() => setActiveTab(tab as any)}
                              className={cn(
                                  "pb-2 text-xs font-mono transition-colors relative",
                                  activeTab === tab ? "text-amber-100" : "text-[#555] hover:text-[#888]"
                              )}
                          >
                              {tab}
                              {activeTab === tab && (
                                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-amber-500" />
                              )}
                          </button>
                      ))}
                  </div>

                  {/* Tab Content */}
                  <div className="font-serif text-lg leading-relaxed text-[#ccc]">
                      {activeTab === "SCRIPT" && (
                          <div className="space-y-6">
                              {/* Primary Action: Copy Script */}
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(entry.script);
                                  // Could add a toast here if available, or just change button text temporarily
                                  const btn = document.getElementById("copy-btn-primary");
                                  if (btn) {
                                     const originalText = btn.innerText;
                                     btn.innerText = "COPIED TO CLIPBOARD";
                                     btn.classList.add("bg-amber-500", "text-black");
                                     setTimeout(() => {
                                        btn.innerText = originalText;
                                        btn.classList.remove("bg-amber-500", "text-black");
                                     }, 2000);
                                  }
                                }}
                                id="copy-btn-primary"
                                className="w-full py-4 border border-amber-500/50 text-amber-500 font-pixel text-xs tracking-[0.2em] hover:bg-amber-500/10 transition-all uppercase flex items-center justify-center gap-3 group"
                              >
                                <span className="text-lg">⎘</span>
                                COPY SCRIPT TO CLIPBOARD
                              </button>

                              <div className="whitespace-pre-wrap prose prose-invert prose-amber max-w-none p-6 bg-[#0c0c0c] border border-[#222] rounded-sm">
                                  {entry.script}
                              </div>
                          </div>
                      )}
                      {activeTab === "PROTOCOL" && (
                          <div className="space-y-4">
                              <p className="text-sm font-sans text-[#888] italic">
                                  Step-by-step execution guide.
                              </p>
                              {steps.map((step, i) => (
                                  <div key={i} className="flex gap-4 p-4 border border-[#222] bg-[#0c0c0c]">
                                      <span className="font-pixel text-amber-900/50 text-xs pt-1">{i + 1}</span>
                                      <p className="text-base">{step}</p>
                                  </div>
                              ))}
                          </div>
                      )}
                      {activeTab === "WHY" && (
                          <div className="p-6 bg-[#0c0c0c] border border-[#222] border-l-2 border-l-amber-500/30">
                              <h3 className="font-pixel text-[10px] text-amber-500 mb-3 uppercase tracking-widest">Objective</h3>
                              <p className="text-[#ccc] font-sans text-sm leading-relaxed">{entry.use_when}</p>
                          </div>
                      )}
                  </div>
              </div>
            ) : (
              /* RUN MODE (Checklist) */
              <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center justify-between mb-4">
                      <span className="font-pixel text-[10px] text-amber-500 tracking-widest">EXECUTION PROGRESS</span>
                      <span className="font-mono text-xs text-[#666]">
                          {checklist.filter(Boolean).length} / {steps.length} COMPLETE
                      </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-1 bg-[#222] w-full mb-8">
                      <div 
                          className="h-full bg-amber-500 transition-all duration-300"
                          style={{ width: `${(checklist.filter(Boolean).length / steps.length) * 100}%` }}
                      />
                  </div>

                  <div className="space-y-2">
                      {steps.map((step, i) => (
                          <div 
                              key={i}
                              onClick={() => toggleStep(i)}
                              className={cn(
                                  "flex gap-4 p-4 border cursor-pointer transition-all duration-200 select-none",
                                  checklist[i] 
                                      ? "bg-amber-900/10 border-amber-500/30 opacity-50" 
                                      : "bg-[#0c0c0c] border-[#222] hover:border-amber-500/30"
                              )}
                          >
                              <div className={cn(
                                  "w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-colors",
                                  checklist[i] ? "bg-amber-500 border-amber-500" : "border-[#444]"
                              )}>
                                  {checklist[i] && <span className="text-black font-bold text-xs">✓</span>}
                              </div>
                              <p className={cn(
                                  "text-base transition-colors",
                                  checklist[i] ? "text-amber-500/50 line-through" : "text-[#ccc]"
                              )}>{step}</p>
                          </div>
                      ))}
                  </div>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-[#222] bg-[#0c0c0c] flex justify-between items-center flex-shrink-0">
              <div className="text-[10px] font-pixel text-[#444]">END OF FILE // {entry.id}</div>
              <div className="flex gap-4">
                  {mode === "READ" && (
                      <button 
                          onClick={() => setMode("RUN")}
                          className="bg-amber-900/20 hover:bg-amber-500 hover:text-black text-amber-500 border border-amber-500/30 px-6 py-3 font-pixel text-xs transition-all uppercase tracking-widest flex items-center gap-2"
                      >
                          <span>▶</span>
                          INITIATE RUN MODE
                      </button>
                  )}
                  {mode === "RUN" && (
                      <button 
                          onClick={() => setMode("READ")}
                          className="text-[#666] hover:text-amber-500 border border-transparent hover:border-amber-500/30 px-4 py-2 font-pixel text-[10px] transition-all uppercase tracking-widest"
                      >
                          RETURN TO READ
                      </button>
                  )}
              </div>
          </div>

        </div> {/* End Content Container */}
      </div>
    </div>
  );
}
