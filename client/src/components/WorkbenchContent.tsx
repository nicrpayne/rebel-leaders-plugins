import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

// --- DATA ---
const PLUGINS = [
  {
    id: "gravity-check",
    title: "GRAVITAS",
    category: "MIRROR",
    desc: "15 questions. 3 minutes. Reveal the hidden forces shaping your team's orbit.",
    status: "ACTIVE",
    link: "/gravitas",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/gravity_check_field_cover-hq3AnpZqCJZFJU9Wrxiwic.webp"
  },
  {
    id: "codex",
    title: "The Codex",
    category: "MOVE",
    desc: "A library of high-leverage leadership scripts and protocols.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cover-GFY7usmeN4FzNRmJ64c5wD.webp"
  },
  {
    id: "laas",
    title: "LaaS Calibrator",
    category: "MAP",
    desc: "Leadership As A Service. Measure your team's dependency ratio.",
    status: "LOCKED",
    link: "#",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/laas_calibrator_cover-YcDCAQRmWtFr53Pcpd8CL5.webp"
  }
];

export default function WorkbenchContent() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  return (
    <div className="container mx-auto px-4 pb-24 relative z-10">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* --- SIDEBAR FILTER --- */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-10">
            {/* Categories */}
            <div>
              <h3 className="font-pixel text-[10px] text-[var(--color-gold-dim)] mb-6 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-gold-dim)] inline-block" />
                Categories
              </h3>
              <div className="space-y-1 border-l border-[var(--color-gold)]/20 pl-4">
                {["ALL", "MIRROR", "MAP", "MOVE", "SIGNAL"].map((cat) => (
                  <div 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "font-display text-lg py-1 cursor-pointer transition-all relative",
                      activeCategory === cat 
                        ? "text-[var(--color-gold)] font-bold" 
                        : "text-[var(--color-parchment)]/50 hover:text-[var(--color-parchment)]"
                    )}
                  >
                    {activeCategory === cat && (
                      <span className="absolute -left-[19px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full" />
                    )}
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="font-pixel text-[10px] text-[var(--color-gold-dim)] mb-6 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-gold-dim)] inline-block" />
                Status
              </h3>
              <div className="space-y-1 border-l border-[var(--color-gold)]/20 pl-4">
                {["INSTALLED", "AVAILABLE", "UPDATES"].map((stat) => (
                  <div key={stat} className="font-display text-lg text-[var(--color-parchment)]/50 hover:text-[var(--color-parchment)] cursor-pointer py-1 transition-all">
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- PLUGIN GRID --- */}
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {PLUGINS.map((plugin) => (
              <Link key={plugin.id} href={plugin.link}>
                <div className={cn(
                  "group relative bg-[var(--color-card)] border border-[var(--color-gold)]/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(197,160,89,0.2)] hover:border-[var(--color-gold)]/50 flex flex-col h-full cursor-pointer",
                  plugin.status !== "ACTIVE" && "opacity-70 grayscale-[0.5]"
                )}>
                  {/* Corner flourishes */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-gold)]/50 group-hover:border-[var(--color-gold)] transition-colors" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color-gold)]/50 group-hover:border-[var(--color-gold)] transition-colors" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color-gold)]/50 group-hover:border-[var(--color-gold)] transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-gold)]/50 group-hover:border-[var(--color-gold)] transition-colors" />

                  {/* Cover Image */}
                  <div className="aspect-[16/9] bg-black relative overflow-hidden m-1 border border-[var(--color-gold)]/10">
                    {plugin.image ? (
                      <img 
                        src={plugin.image} 
                        alt={plugin.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 sepia-[0.4] group-hover:sepia-0"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--color-gold-dim)] font-pixel text-4xl">
                        ?
                      </div>
                    )}
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] via-[var(--color-gold)]/5 to-transparent opacity-90 mix-blend-overlay" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className={cn(
                        "text-[10px] font-pixel px-2 py-1 border backdrop-blur-sm shadow-sm",
                        plugin.status === "ACTIVE" 
                          ? "bg-[var(--color-gold)] text-[var(--color-forest-deep)] border-[var(--color-gold)]" 
                          : "bg-[var(--color-card)]/80 border-[var(--color-gold-dim)] text-[var(--color-gold-dim)]"
                      )}>
                        {plugin.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-display text-[var(--color-parchment)] text-2xl italic group-hover:text-[var(--color-gold)] transition-colors">
                          {plugin.title}
                        </h3>
                        <div className="text-[10px] font-pixel text-[var(--color-gold-dim)] mt-1 tracking-widest uppercase opacity-70">
                          {plugin.category} // V.1.0.4
                        </div>
                      </div>
                    </div>
                    
                    <p className="font-display text-[var(--color-parchment)]/70 leading-relaxed flex-1 text-lg">
                      {plugin.desc}
                    </p>

                    {/* Action Bar */}
                    <div className="pt-4 mt-4 border-t border-[var(--color-gold)]/20 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] font-pixel text-[var(--color-gold-dim)]">REBEL OS</span>
                      <span className="text-[10px] font-pixel text-[var(--color-gold)] flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        LAUNCH <span className="text-lg leading-none">→</span>
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
