import { CodexEntry } from "@/lib/codex-schema";
import CodexGridCard from "@/components/CodexGridCard";

interface CodexGridProps {
  entries: CodexEntry[];
  loadedEntryId: string | null;
  onLoad: (entry: CodexEntry) => void;
}

export default function CodexGrid({ entries, loadedEntryId, onLoad }: CodexGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
      {entries.map((entry) => (
        <CodexGridCard
          key={entry.id}
          entry={entry}
          isActive={loadedEntryId === entry.id}
          onClick={() => onLoad(entry)}
        />
      ))}
    </div>
  );
}
