import { Link } from "wouter";
import { cn } from "@/lib/utils";

const PLUGINS = [
  {
    id: "gravity-check",
    title: "Gravity Check",
    category: "MIRROR",
    desc: "15 questions. 3 minutes. Reveal the hidden forces shaping your team's orbit.",
    status: "ACTIVE",
    link: "/gravity-check",
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
    <div className="min-h-screen bg-[#050a05] text-[#e6c885] font-serif selection:bg-[#c5a059] selection:text-[#050a05] relative overflow-hidden">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-20 pointer-events-none" />
      
      {/* Top Bar */}
      <div className="h-20 border-b border-[#8a6d3b]/30 flex items-center px-8 justify-between bg-[#0f1f0f]/90 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <img src="/home/ubuntu/upload/RebelLogo.png" alt="Rebel Leaders" className="h-8 w-auto opacity-80" />
            <span className="font-pixel text-[#c5a059] text-sm tracking-widest">REBEL LEADERS</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-[#e6c885]/60">
            <a href="#" className="hover:text-[#c5a059] transition-colors">THE MAP</a>
            <a href="#" className="text-[#c5a059] border-b border-[#c5a059]">ARMORY</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors">THE SHELF</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors">RESIDENCY</a>
            <a href="#" className="hover:text-[#c5a059] transition-colors">ABOUT</a>
          </nav>
        </div>
        
        <button className="bg-[#c5a059] text-[#050a05] px-4 py-2 font-pixel text-[10px] hover:bg-[#e6c885] transition-colors shadow-[2px_2px_0px_0px_rgba(138,109,59,0.5)] active:translate-y-0.5 active:shadow-none">
          NEW PLAYER
        </button>
      </div>

      <div className="flex h-[calc(100vh-5rem)] relative z-10">
        {/* Sidebar Filter */}
        <div className="w-72 border-r border-[#8a6d3b]/30 bg-[#0f1f0f]/80 p-8 hidden md:flex flex-col gap-10 backdrop-blur-sm">
          <div>
            <h3 className="font-pixel text-[10px] text-[#8a6d3b] mb-6 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#8a6d3b] inline-block" />
              Categories
            </h3>
            <div className="space-y-1">
              {["ALL", "MIRROR", "MAP", "MOVE", "SIGNAL"].map((cat) => (
                <div 
                  key={cat}
                  className={cn(
                    "font-serif text-lg py-2 px-4 cursor-pointer transition-all border-l-2",
                    cat === "ALL" 
                      ? "border-[#c5a059] text-[#c5a059] bg-[#c5a059]/5" 
                      : "border-transparent text-[#e6c885]/60 hover:text-[#e6c885] hover:border-[#8a6d3b]/50"
                  )}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-pixel text-[10px] text-[#8a6d3b] mb-6 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#8a6d3b] inline-block" />
              Status
            </h3>
            <div className="space-y-1">
              {["INSTALLED", "AVAILABLE", "UPDATES"].map((stat) => (
                <div key={stat} className="font-serif text-lg text-[#e6c885]/60 hover:text-[#e6c885] cursor-pointer py-2 px-4 border-l-2 border-transparent hover:border-[#8a6d3b]/50 transition-all">
                  {stat}
                </div>
              ))}
            </div>
          </div>
          
          {/* Rebel HUD */}
          <div className="mt-auto border border-[#8a6d3b]/50 bg-[#050a05]/80 p-4 relative">
            {/* Corner flourishes */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#c5a059]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#c5a059]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#c5a059]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#c5a059]" />
            
            <div className="flex justify-between items-center mb-2">
              <span className="font-pixel text-[10px] text-[#c5a059]">REBEL HUD</span>
              <span className="font-pixel text-[10px] text-[#8a6d3b]">▼</span>
            </div>
            
            <div className="space-y-3 mt-4">
              <div>
                <div className="flex justify-between text-[10px] font-pixel text-[#8a6d3b] mb-1">
                  <span>XP</span>
                  <span>50%</span>
                </div>
                <div className="h-1.5 bg-[#1a2e1a] w-full border border-[#8a6d3b]/30">
                  <div className="h-full bg-[#c5a059] w-1/2" />
                </div>
              </div>
              
              <div className="flex justify-between text-[10px] font-pixel text-[#8a6d3b]">
                <span>PAGES 6/9</span>
                <span>SECRETS 0/5</span>
              </div>
              
              <div className="flex justify-between text-[10px] font-pixel text-[#8a6d3b]">
                <span>TIME IN REBELLION</span>
                <span>13m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 p-8 overflow-y-auto relative">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl text-[#e6c885] mb-2 italic">The Armory</h1>
            <p className="font-serif text-xl text-[#e6c885]/60 mb-12 max-w-2xl">
              Tools for the resistance. Diagnostics, protocols, and maps to navigate the organizational wilderness.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PLUGINS.map((plugin) => (
                <Link key={plugin.id} href={plugin.link}>
                  <div className={cn(
                    "group relative bg-[#0f1f0f] border border-[#8a6d3b]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(197,160,89,0.3)] hover:border-[#c5a059]/60 flex flex-col h-full",
                    plugin.status !== "ACTIVE" && "opacity-70 grayscale-[0.5]"
                  )}>
                    {/* Corner flourishes for cards */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#8a6d3b] group-hover:border-[#c5a059] transition-colors" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#8a6d3b] group-hover:border-[#c5a059] transition-colors" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#8a6d3b] group-hover:border-[#c5a059] transition-colors" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#8a6d3b] group-hover:border-[#c5a059] transition-colors" />

                    {/* Cover Image */}
                    <div className="aspect-[16/9] bg-[#050a05] relative overflow-hidden m-1 border border-[#8a6d3b]/10">
                      {plugin.image ? (
                        <img 
                          src={plugin.image} 
                          alt={plugin.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 sepia-[0.3] group-hover:sepia-0"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#8a6d3b] font-pixel text-4xl">
                          ?
                        </div>
                      )}
                      
                      {/* Overlay Gradient - Warm */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f0f] via-[#c5a059]/10 to-transparent opacity-80 mix-blend-overlay" />
                      
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
                          <div className="text-[10px] font-pixel text-[#8a6d3b] mt-1 tracking-widest uppercase">
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
    </div>
  );
}
