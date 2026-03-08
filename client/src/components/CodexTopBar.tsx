import { cn } from "@/lib/utils";

interface CodexTopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isDimmed: boolean;
}

export default function CodexTopBar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  isDimmed
}: CodexTopBarProps) {
  return (
    <div className={cn(
      "flex flex-col md:flex-row gap-4 items-center justify-between border-b border-amber-900/20 pb-6 sticky top-0 bg-[#080808]/95 backdrop-blur z-30 pt-2 transition-opacity duration-500",
      isDimmed ? "opacity-30 pointer-events-none" : "opacity-100"
    )}>
      {/* Search Input - "Data Query" */}
      <div className="relative w-full md:w-96 group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-amber-500/50 font-pixel text-[10px]">&gt;</span>
        </div>
        <input 
          type="text" 
          placeholder="QUERY PROTOCOLS..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#050505] border border-amber-900/30 text-amber-500 font-mono text-xs py-2 pl-8 pr-4 focus:outline-none focus:border-amber-500/50 focus:shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-all placeholder:text-amber-900/40 rounded-sm"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <div className="w-1.5 h-1.5 bg-amber-500/20 animate-pulse rounded-full" />
        </div>
      </div>

      {/* Category Tabs - "Sector Select" */}
      <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
        {["ALL", "CONFLICT", "VISION", "ALIGNMENT", "CULTURE"].map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "px-3 py-1.5 text-[9px] font-pixel tracking-widest border transition-all whitespace-nowrap rounded-sm",
              activeCategory === cat 
                ? "bg-amber-500/10 text-amber-500 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.1)]" 
                : "bg-transparent text-amber-900/60 border-transparent hover:text-amber-400 hover:border-amber-900/30"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
