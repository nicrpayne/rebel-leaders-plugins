import { CodexEntry } from "@/lib/codex-schema";
import CodexSpine from "@/components/CodexSpine";

interface CodexGridProps {
  entries: CodexEntry[];
  loadedEntryId: string | null;
  onLoad: (entry: CodexEntry) => void;
}

export default function CodexGrid({ entries, loadedEntryId, onLoad }: CodexGridProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto pb-12">
      
      {/* Rack Frame (Visual Container) */}
      <div className="border-x-4 border-[#1a1a1a] bg-[#050505] p-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
        
        {/* The Stack */}
        <div className="flex flex-col gap-1">
          {entries.map((entry) => (
            <CodexSpine
              key={entry.id}
              entry={entry}
              isActive={loadedEntryId === entry.id}
              onClick={() => onLoad(entry)}
            />
          ))}
        </div>

      </div>

      {/* Rack Footer (Visual Detail) */}
      <div className="h-4 bg-[#1a1a1a] w-full mt-1 flex justify-between px-4 items-center">
        <div className="w-2 h-2 rounded-full bg-[#333]" />
        <div className="w-2 h-2 rounded-full bg-[#333]" />
      </div>

    </div>
  );
}
