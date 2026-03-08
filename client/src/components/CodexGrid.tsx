import { CodexEntry } from "@/lib/codex-schema";
import CodexGridCard from "@/components/CodexGridCard";
import CodexSpine from "@/components/CodexSpine";
import { cn } from "@/lib/utils";

interface CodexGridProps {
  entries: CodexEntry[];
  loadedEntryId: string | null;
  onLoad: (entry: CodexEntry) => void;
}

export default function CodexGrid({ entries, loadedEntryId, onLoad }: CodexGridProps) {
  // Split entries into two groups:
  // 1. Top Shelf: Spines (First 12 entries) - Tightly packed
  // 2. Bottom Shelves: Stacks (Remaining entries) - Piled up
  const spineEntries = entries.slice(0, 12);
  const stackEntries = entries.slice(12);

  // Group stack entries into rows of 3 for the bottom shelves
  const stackRows = [];
  for (let i = 0; i < stackEntries.length; i += 3) {
    stackRows.push(stackEntries.slice(i, i + 3));
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto pb-24 px-4">
      
      {/* Cabinet Frame Container */}
      <div className="relative p-8 md:p-12 bg-[#050505] rounded-sm shadow-2xl overflow-hidden min-h-[800px]">
        
        {/* Cabinet Frame Background (The "Furniture") */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           {/* Main Frame Image */}
           <img 
             src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/cabinet_frame-YYRfgWxawa8H7hsmtpgJKu.png"
             className="w-full h-full object-fill opacity-100"
             alt="Cabinet Frame"
           />
           {/* Inner Shadow for depth */}
           <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
           
           {/* Spotlight Overlay - Warm, moody lighting */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.05),transparent_70%)] mix-blend-screen pointer-events-none" />
        </div>

        {/* Shelf Unit Container */}
        <div className="relative z-10 flex flex-col gap-24 py-16 px-8 md:px-16">
          
          {/* --- TOP SHELF: SPINES (Tight Row) --- */}
          <div className="relative group w-full">
             {/* Shelf Beam */}
             <div className="absolute bottom-0 left-0 right-0 h-20 z-0 flex items-end">
                 <div 
                   className="w-full h-full bg-repeat-x opacity-90"
                   style={{ 
                     backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/shelf_beam_straight-UFM9Koc2WcndumZAVKCvY5.webp')",
                     backgroundSize: 'auto 100%'
                   }}
                 />
                 <div className="absolute -bottom-6 left-0 right-0 h-6 bg-black/80 blur-lg" />
             </div>

             {/* Spines Container - Flex row, tightly packed */}
             <div className="relative z-10 flex justify-center items-end gap-1 px-4 pb-2 w-full overflow-visible">
                {spineEntries.map((entry) => (
                  <div key={entry.id} className="w-10 md:w-12 flex-shrink-0 transform transition-transform hover:-translate-y-1">
                    <CodexSpine
                      entry={entry}
                      isActive={loadedEntryId === entry.id}
                      onClick={() => onLoad(entry)}
                    />
                  </div>
                ))}
             </div>
          </div>

          {/* --- BOTTOM SHELVES: STACKS (Piles) --- */}
          {stackRows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative group w-full">
              
              {/* Shelf Beam */}
              <div className="absolute bottom-0 left-0 right-0 h-24 z-0 flex items-end">
                 <div 
                   className="w-full h-full bg-repeat-x opacity-90"
                   style={{ 
                     backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/shelf_beam_straight-UFM9Koc2WcndumZAVKCvY5.webp')",
                     backgroundSize: 'auto 100%'
                   }}
                 />
                 <div className="absolute -bottom-8 left-0 right-0 h-8 bg-black/80 blur-xl" />
              </div>

              {/* Stacks Container */}
              <div className="relative z-10 flex justify-center gap-12 md:gap-24 items-end pb-6 px-4 w-full">
                {row.map((entry, i) => (
                  <div 
                    key={entry.id} 
                    className="relative group/stack cursor-pointer"
                    onClick={() => onLoad(entry)}
                  >
                    {/* Stack Effect: Fake cartridges underneath */}
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[#111] rounded-sm transform translate-y-2 translate-x-1 opacity-50 pointer-events-none border border-[#222]" />
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[#1a1a1a] rounded-sm transform translate-y-1 translate-x-0.5 opacity-70 pointer-events-none border border-[#333]" />
                    
                    {/* The Actual Cartridge */}
                    <div className={cn(
                      "transform transition-all duration-300 group-hover/stack:-translate-y-2 group-hover/stack:rotate-0",
                      // Random rotation for "messy stack" feel
                      i % 2 === 0 ? "rotate-1" : "-rotate-1"
                    )}>
                      <CodexGridCard
                        entry={entry}
                        isActive={loadedEntryId === entry.id}
                        onClick={() => onLoad(entry)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Atmospheric Details */}
              {rowIndex === 0 && (
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/worn_journals-6V7HD3tR3KNhSZ2bpTifhC.png"
                  className="absolute -bottom-2 right-12 w-32 md:w-40 object-contain opacity-90 pointer-events-none z-20 transform -rotate-3 drop-shadow-2xl"
                  alt="Worn Journals"
                />
              )}
              
              {rowIndex % 2 !== 0 && (
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/shelf_detail_wires-LCzUDw7KPprZH2FVYWygnT.webp"
                  className="absolute -bottom-4 left-8 w-24 h-24 object-contain opacity-60 pointer-events-none z-20"
                  alt="Wires"
                />
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
