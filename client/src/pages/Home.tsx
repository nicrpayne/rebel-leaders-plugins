import { Link } from "wouter";
import { cn } from "@/lib/utils";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050a05] text-[#e6c885] font-serif selection:bg-[#c5a059] selection:text-[#050a05] relative overflow-x-hidden">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-20 pointer-events-none fixed" />
      
      {/* Top Bar (Recreated for Preview Context) */}
      <div className="h-20 flex items-center px-8 justify-between bg-[#0f1f0f]/90 backdrop-blur-sm relative z-50 border-b border-[#8a6d3b]/10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <img src="/home/ubuntu/upload/RebelLogo.png" alt="Rebel Leaders" className="h-8 w-auto opacity-80" />
            <span className="font-pixel text-[#c5a059] text-sm tracking-widest">REBEL LEADERS</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-[#e6c885]/60">
            <a href="#" className="hover:text-[#c5a059] transition-colors">THE MAP</a>
            <a href="#" className="text-[#c5a059] border-b border-[#c5a059]">WORKBENCH</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors">THE SHELF</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors">RESIDENCY</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors">ABOUT</a>
          </nav>
        </div>
        
        <button className="bg-[#c5a059] text-[#050a05] px-4 py-2 font-pixel text-[10px] hover:bg-[#e6c885] transition-colors shadow-[2px_2px_0px_0px_rgba(138,109,59,0.5)] active:translate-y-0.5 active:shadow-none">
          NEW PLAYER
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 text-center z-10">
        <div className="container mx-auto px-4">
          <div className="font-pixel text-[#8a6d3b] text-[10px] tracking-[0.2em] uppercase mb-4">Rebel OS // Plugins</div>
          <h1 className="font-serif text-5xl md:text-7xl text-[#e6c885] mb-6 italic">The Workbench</h1>
          <p className="font-serif text-xl md:text-2xl text-[#e6c885]/70 max-w-2xl mx-auto leading-relaxed">
            Tools for the resistance. Diagnostics, protocols, and maps to navigate the organizational wilderness.
          </p>
        </div>
      </div>

      {/* Gold Separator Line */}
      <div className="relative z-10 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-[#8a6d3b] to-transparent w-full opacity-50" />
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050a05] px-4">
          <div className="w-2 h-2 border border-[#c5a059] rotate-45" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 pb-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Filter - Now below the fold */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-10">
              <div>
                <h3 className="font-pixel text-[10px] text-[#8a6d3b] mb-6 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8a6d3b] inline-block" />
                  Categories
                </h3>
                <div className="space-y-1 border-l border-[#8a6d3b]/20 pl-4">
                  {["ALL", "MIRROR", "MAP", "MOVE", "SIGNAL"].map((cat) => (
                    <div 
                      key={cat}
                      className={cn(
                        "font-serif text-lg py-1 cursor-pointer transition-all relative",
                        cat === "ALL" 
                          ? "text-[#c5a059] font-bold" 
                          : "text-[#e6c885]/50 hover:text-[#e6c885]"
                      )}
                    >
                      {cat === "ALL" && (
                        <span className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#c5a059] rounded-full" />
                      )}
                      {cat}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-pixel text-[10px] text-[#8a6d3b] mb-6 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8a6d3b] inline-block" />
                  Status
                </h3>
                <div className="space-y-1 border-l border-[#8a6d3b]/20 pl-4">
                  {["INSTALLED", "AVAILABLE", "UPDATES"].map((stat) => (
                    <div key={stat} className="font-serif text-lg text-[#e6c885]/50 hover:text-[#e6c885] cursor-pointer py-1 transition-all">
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Plugin Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {PLUGINS.map((plugin) => (
                <Link key={plugin.id} href={plugin.link}>
                  <div className={cn(
                    "group relative bg-[#0f1f0f] border border-[#8a6d3b]/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(197,160,89,0.2)] hover:border-[#c5a059]/50 flex flex-col h-full",
                    plugin.status !== "ACTIVE" && "opacity-70 grayscale-[0.5]"
                  )}>
                    {/* Corner flourishes */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#8a6d3b]/50 group-hover:border-[#c5a059] transition-colors" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#8a6d3b]/50 group-hover:border-[#c5a059] transition-colors" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#8a6d3b]/50 group-hover:border-[#c5a059] transition-colors" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#8a6d3b]/50 group-hover:border-[#c5a059] transition-colors" />

                    {/* Cover Image */}
                    <div className="aspect-[16/9] bg-[#050a05] relative overflow-hidden m-1 border border-[#8a6d3b]/10">
                      {plugin.image ? (
                        <img 
                          src={plugin.image} 
                          alt={plugin.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 sepia-[0.4] group-hover:sepia-0"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#8a6d3b] font-pixel text-4xl">
                          ?
                        </div>
                      )}
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f0f] via-[#c5a059]/5 to-transparent opacity-90 mix-blend-overlay" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className={cn(
                          "text-[10px] font-pixel px-2 py-1 border backdrop-blur-sm shadow-sm",
                          plugin.status === "ACTIVE" 
                            ? "bg-[#c5a059] text-[#050a05] border-[#c5a059]" 
                            : "bg-[#0f1f0f]/80 border-[#8a6d3b] text-[#8a6d3b]"
                        )}>
                          {plugin.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-serif text-[#e6c885] text-2xl italic group-hover:text-[#c5a059] transition-colors">
                            {plugin.title}
                          </h3>
                          <div className="text-[10px] font-pixel text-[#8a6d3b] mt-1 tracking-widest uppercase opacity-70">
                            {plugin.category} // V.1.0.4
                          </div>
                        </div>
                      </div>
                      
                      <p className="font-serif text-[#e6c885]/70 leading-relaxed flex-1 text-lg">
                        {plugin.desc}
                      </p>

                      {/* Action Bar */}
                      <div className="pt-4 mt-4 border-t border-[#8a6d3b]/20 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[10px] font-pixel text-[#8a6d3b]">REBEL OS</span>
                        <span className="text-[10px] font-pixel text-[#c5a059] flex items-center gap-2 group-hover:translate-x-1 transition-transform cursor-pointer">
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

      {/* Rebel HUD removed — handled by main site */}
    </div>
  );
}
