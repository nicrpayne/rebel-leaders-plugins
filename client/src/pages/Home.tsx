import { Link } from "wouter";
import { cn } from "@/lib/utils";

const PLUGINS = [
  {
    id: "gravity-check",
    title: "GRAVITY CHECK",
    category: "MIRROR",
    desc: "12 questions. 3 minutes. Reveal the hidden forces shaping your team's orbit.",
    status: "ACTIVE",
    link: "/gravity-check"
  },
  {
    id: "codex",
    title: "THE CODEX",
    category: "MOVE",
    desc: "A library of high-leverage leadership scripts and protocols.",
    status: "LOCKED",
    link: "#"
  },
  {
    id: "laas",
    title: "LAAS CALIBRATOR",
    category: "MAP",
    desc: "Leadership As A Service. Measure your team's dependency ratio.",
    status: "LOCKED",
    link: "#"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-forest-deep p-4 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b-2 border-wood pb-8">
          <h1 className="text-4xl md:text-6xl text-gold font-pixel tracking-widest">
            THE ARMORY
          </h1>
          <p className="text-muted-foreground font-serif text-xl max-w-2xl">
            Tools for the rebellion. Maps to see where you are. Mirrors to see who you are. Moves to change the game.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLUGINS.map((plugin) => (
            <Link key={plugin.id} href={plugin.link}>
              <div className={cn(
                "group relative border-4 border-wood bg-forest p-8 h-80 flex flex-col justify-between transition-all duration-300",
                plugin.status === "ACTIVE" 
                  ? "hover:border-gold hover:shadow-[0_0_30px_rgba(197,160,89,0.2)] cursor-pointer" 
                  : "opacity-50 grayscale cursor-not-allowed"
              )}>
                {/* Status Badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-forest-deep border border-wood text-[10px] font-pixel text-muted-foreground">
                  {plugin.status}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="text-xs font-pixel text-gold/50 tracking-widest">
                    {plugin.category}
                  </div>
                  <h3 className="text-2xl text-gold font-pixel leading-tight group-hover:text-gold-light">
                    {plugin.title}
                  </h3>
                  <p className="font-serif text-lg text-muted-foreground group-hover:text-foreground transition-colors">
                    {plugin.desc}
                  </p>
                </div>

                {/* Footer */}
                <div className="w-full h-1 bg-wood/30 mt-auto overflow-hidden">
                  {plugin.status === "ACTIVE" && (
                    <div className="h-full bg-gold w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
