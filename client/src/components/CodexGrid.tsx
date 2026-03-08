import { CodexEntry } from "@/lib/codex-schema";
import CodexGridCard from "@/components/CodexGridCard";

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
      
      {/* Cabinet Frame Container */}
      <div className="relative p-8 md:p-12 bg-[#050505] rounded-sm shadow-2xl overflow-hidden">
        
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
        </div>

        {/* Shelf Unit Container */}
        <div className="relative z-10 flex flex-col gap-24 py-16 px-8 md:px-16">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="relative group">
              
              {/* The Shelf Beam (Background) */}
              <div className="absolute bottom-0 left-0 right-0 h-24 z-0 flex items-end">
                 {/* Tiled Beam Texture */}
                 <div 
                   className="w-full h-full bg-repeat-x opacity-90"
                   style={{ 
                     backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/shelf_beam_straight-UFM9Koc2WcndumZAVKCvY5.webp')",
                     backgroundSize: 'auto 100%'
                   }}
                 />
                 {/* Shadow under the shelf */}
                 <div className="absolute -bottom-8 left-0 right-0 h-8 bg-black/80 blur-xl" />
              </div>

              {/* The Cartridges on the Shelf - Standing Face Out */}
              <div className="relative z-10 flex justify-center gap-8 md:gap-12 items-end pb-6 px-4">
                {row.map((entry, i) => (
                  <div 
                    key={entry.id} 
                    className="transform transition-all duration-300 hover:-translate-y-2"
                    style={{
                      // Slight random rotation for "hand-placed" feel
                      transform: `rotate(${rowIndex % 2 === 0 ? (i % 2 === 0 ? '1deg' : '-1deg') : (i % 2 === 0 ? '-0.5deg' : '0.5deg')})`
                    }}
                  >
                    <CodexGridCard
                      entry={entry}
                      isActive={loadedEntryId === entry.id}
                      onClick={() => onLoad(entry)}
                    />
                  </div>
                ))}
                
                {/* Empty slots filler if row is incomplete */}
                {row.length < 3 && Array.from({ length: 3 - row.length }).map((_, i) => (
                   <div key={`empty-${i}`} className="w-64 h-40 opacity-0" />
                ))}
              </div>

              {/* Atmospheric Details (Randomly placed) */}
              
              {/* Worn Journals (Prop) - Only on the first shelf for now */}
              {rowIndex === 0 && (
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/worn_journals-6V7HD3tR3KNhSZ2bpTifhC.png"
                  className="absolute -bottom-2 right-8 w-32 md:w-40 object-contain opacity-90 pointer-events-none z-20 transform rotate-2 drop-shadow-2xl"
                  alt="Worn Journals"
                />
              )}

              {/* Wires - On alternating shelves */}
              {rowIndex % 2 !== 0 && (
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/shelf_detail_wires-LCzUDw7KPprZH2FVYWygnT.webp"
                  className="absolute -bottom-4 left-12 w-24 h-24 object-contain opacity-60 pointer-events-none z-20"
                  alt="Wires"
                />
              )}
              
              {/* Tool - Random placement */}
              {rowIndex % 3 === 0 && rowIndex !== 0 && (
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/shelf_detail_tool-ADMbZH8ynfLnw6dmqKuqhv.webp"
                  className="absolute -bottom-2 left-20 w-16 h-16 object-contain opacity-50 pointer-events-none z-20 transform rotate-12"
                  alt="Tool"
                />
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
