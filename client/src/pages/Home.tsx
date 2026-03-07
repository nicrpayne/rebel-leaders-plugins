import { Link } from "wouter";
import { cn } from "@/lib/utils";

const PLUGINS = [
  {
    id: "gravity-check",
    title: "GRAVITY CHECK",
    category: "MIRROR",
    desc: "12 questions. 3 minutes. Reveal the hidden forces shaping your team's orbit.",
    status: "ACTIVE",
    link: "/gravity-check",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/gravity_check_field_cover-hq3AnpZqCJZFJU9Wrxiwic.webp"
  },
  {
    id: "codex",
    title: "THE CODEX",
    category: "MOVE",
    desc: "A library of high-leverage leadership scripts and protocols.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/gravity_check_space_cover-CxYFd82JzE7j3vM9k7PJnF.webp" // Using previous gen as placeholder for Codex
  },
  {
    id: "laas",
    title: "LAAS CALIBRATOR",
    category: "MAP",
    desc: "Leadership As A Service. Measure your team's dependency ratio.",
    status: "LOCKED",
    link: "#",
    image: null
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121214] text-[#e0e0e0] font-sans selection:bg-[#2a2a2e] selection:text-white">
      {/* Top Bar */}
      <div className="h-14 border-b border-[#2a2a2e] flex items-center px-6 justify-between bg-[#18181b]">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-[#3a3a3e]" />
          <span className="font-bold tracking-wider text-sm text-[#8a8a8e]">REBEL OS // ARMORY</span>
        </div>
        <div className="flex gap-4 text-xs font-mono text-[#5a5a5e]">
          <span>CPU: 12%</span>
          <span>MEM: 4.2GB</span>
        </div>
      </div>

      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Sidebar Filter */}
        <div className="w-64 border-r border-[#2a2a2e] bg-[#18181b] p-6 hidden md:flex flex-col gap-8">
          <div>
            <h3 className="text-xs font-bold text-[#5a5a5e] mb-4 uppercase tracking-widest">Categories</h3>
            <div className="space-y-2">
              {["ALL", "MIRROR", "MAP", "MOVE", "SIGNAL"].map((cat) => (
                <div 
                  key={cat}
                  className={cn(
                    "text-sm py-1 px-2 rounded cursor-pointer transition-colors",
                    cat === "ALL" ? "bg-[#2a2a2e] text-white" : "text-[#8a8a8e] hover:text-white hover:bg-[#2a2a2e]/50"
                  )}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#5a5a5e] mb-4 uppercase tracking-widest">Status</h3>
            <div className="space-y-2">
              {["INSTALLED", "AVAILABLE", "UPDATES"].map((stat) => (
                <div key={stat} className="text-sm text-[#8a8a8e] hover:text-white cursor-pointer py-1 px-2">
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 bg-[#121214] p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PLUGINS.map((plugin) => (
              <Link key={plugin.id} href={plugin.link}>
                <div className={cn(
                  "group relative bg-[#1e1e20] rounded-lg overflow-hidden border border-[#2a2a2e] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#3a3a3e]",
                  plugin.status !== "ACTIVE" && "opacity-60 grayscale cursor-not-allowed pointer-events-none"
                )}>
                  {/* Cover Image */}
                  <div className="aspect-[16/9] bg-[#0a0a0c] relative overflow-hidden">
                    {plugin.image ? (
                      <img 
                        src={plugin.image} 
                        alt={plugin.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#2a2a2e] font-mono text-4xl">
                        ?
                      </div>
                    )}
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e20] via-transparent to-transparent opacity-60" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded border backdrop-blur-sm",
                        plugin.status === "ACTIVE" 
                          ? "bg-green-500/10 border-green-500/30 text-green-400" 
                          : "bg-[#2a2a2e]/50 border-[#3a3a3e] text-[#5a5a5e]"
                      )}>
                        {plugin.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-green-400 transition-colors">
                          {plugin.title}
                        </h3>
                        <div className="text-[10px] font-mono text-[#5a5a5e] mt-0.5">
                          {plugin.category} // V.1.0.4
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-[#8a8a8e] line-clamp-2 leading-relaxed">
                      {plugin.desc}
                    </p>

                    {/* Action Bar */}
                    <div className="pt-3 mt-2 border-t border-[#2a2a2e] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-[10px] font-mono text-[#5a5a5e]">REBEL OS</span>
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        LAUNCH <span className="text-green-400">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
