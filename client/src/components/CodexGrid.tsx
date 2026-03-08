import { CodexEntry } from "@/lib/codex-schema";
import CodexSpine from "@/components/CodexSpine";

interface CodexGridProps {
  entries: CodexEntry[];
  loadedEntryId: string | null;
  onLoad: (entry: CodexEntry) => void;
}

export default function CodexGrid({ entries, loadedEntryId, onLoad }: CodexGridProps) {
  // Group entries into rows of 3 for the shelf layout
  const rows = [];
  for (let i = 0; i < entries.length; i += 3) {
    rows.push(entries.slice(i, i + 3));
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto pb-24 px-4">
      
      {/* Shelf Unit Container */}
      <div className="flex flex-col gap-16">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="relative group">
            
            {/* The Shelf Beam (Background) */}
            <div className="absolute bottom-0 left-0 right-0 h-20 z-0 flex items-end">
               {/* Tiled Beam Texture */}
               <div 
                 className="w-full h-full bg-repeat-x opacity-90"
                 style={{ 
                   backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/shelf_beam_straight-UFM9Koc2WcndumZAVKCvY5.webp')",
                   backgroundSize: 'auto 100%'
                 }}
               />
               {/* Shadow under the shelf */}
               <div className="absolute -bottom-6 left-0 right-0 h-6 bg-black/80 blur-lg" />
            </div>

            {/* The Cartridges on the Shelf */}
            <div className="relative z-10 flex justify-center gap-6 px-8 items-end pb-4">
              {row.map((entry) => (
                <div key={entry.id} className="w-full max-w-xs transform transition-transform hover:-translate-y-2 duration-200">
                  <CodexSpine
                    entry={entry}
                    isActive={loadedEntryId === entry.id}
                    onClick={() => onLoad(entry)}
                  />
                </div>
              ))}
              
              {/* Empty slots filler if row is incomplete */}
              {row.length < 3 && Array.from({ length: 3 - row.length }).map((_, i) => (
                 <div key={`empty-${i}`} className="w-full max-w-xs h-16 opacity-0" />
              ))}
            </div>

            {/* Atmospheric Details (Randomly placed) */}
            {rowIndex % 2 === 0 && (
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/shelf_detail_wires-LCzUDw7KPprZH2FVYWygnT.webp"
                className="absolute -bottom-2 right-12 w-16 h-16 object-contain opacity-60 pointer-events-none z-20"
                alt="Wires"
              />
            )}
            {rowIndex % 3 === 0 && (
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/shelf_detail_tool-ADMbZH8ynfLnw6dmqKuqhv.webp"
                className="absolute -bottom-1 left-16 w-12 h-12 object-contain opacity-50 pointer-events-none z-20 transform rotate-45"
                alt="Tool"
              />
            )}

          </div>
        ))}
      </div>

    </div>
  );
}
