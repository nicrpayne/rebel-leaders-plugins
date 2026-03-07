import { useEffect, useState } from "react";
import PluginShell from "@/components/PluginShell";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { ScoringResult } from "@/lib/scoring";
import { generateDebriefPDF } from "@/lib/pdf";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Audio Context for sound effects
const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

const playDataSound = () => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  // Data transmission sound (rapid beeps)
  const now = audioCtx.currentTime;
  osc.type = 'square';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.setValueAtTime(1200, now + 0.1);
  osc.frequency.setValueAtTime(800, now + 0.2);
  
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 0.3);
};

export default function Results() {
  const [, setLocation] = useLocation();
  const [results, setResults] = useState<ScoringResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);

  useEffect(() => {
    // Check both keys for compatibility
    const stored = localStorage.getItem("gravityCheckResults") || localStorage.getItem("gravity_check_results");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  const handleDownload = async () => {
    if (!results) return;
    setIsGenerating(true);
    try {
      await generateDebriefPDF(results);
      toast.success("Signal Report downloaded.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate report.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    if (!results) return;
    const text = `I just ran a Gravity Check on my team. My orbit is: ${results.archetype}. Find your signal at rebel-leader.com`;
    if (navigator.share) {
      navigator.share({
        title: "Gravity Check Results",
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Result copied to clipboard.");
    }
  };

  const handleSideChain = () => {
    setIsTransmitting(true);
    playDataSound();
    
    // Simulate transmission delay
    setTimeout(() => {
      setLocation("/codex?signal=received");
    }, 1500);
  };

  if (!results) return (
    <PluginShell title="ORBIT ANALYSIS" category="MIRROR" footerControls={null}>
      <div className="flex items-center justify-center h-96">
        <div className="text-gold font-pixel animate-pulse">CALCULATING ORBIT...</div>
      </div>
    </PluginShell>
  );

  const chartData = [
    { subject: "IDENTITY", A: results.identity, fullMark: 5 },
    { subject: "RELATIONSHIP", A: results.relationship, fullMark: 5 },
    { subject: "VISION", A: results.vision, fullMark: 5 },
    { subject: "CULTURE", A: results.culture, fullMark: 5 },
  ];

  return (
    <PluginShell title="ORBIT ANALYSIS" category="MIRROR" footerControls={null}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-20">
        {/* Visual Centerpiece: Radar Chart */}
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="w-full aspect-square max-w-[400px] relative border border-wood/30 bg-forest-deep/50 rounded-full p-8">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#5d4037" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#c5a059", fontSize: 10, fontFamily: "Press Start 2P" }} />
                <Radar
                  name="Gravity"
                  dataKey="A"
                  stroke="#c5a059"
                  strokeWidth={2}
                  fill="#c5a059"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
            
            {/* Decorative Overlay */}
            <div className="absolute inset-0 border-4 border-wood rounded-full pointer-events-none opacity-20" />
          </div>
          
          {/* Dominant Force Card */}
          <div className="w-full max-w-[400px] border border-wood bg-forest p-4 space-y-2">
            <div className="text-[10px] font-pixel text-gold/50 tracking-widest uppercase">
              DOMINANT FORCE
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gold font-pixel">{results.force}</span>
              <div className="h-2 w-2 bg-gold rounded-full animate-pulse" />
            </div>
            <p className="text-sm font-serif text-muted-foreground">
              {results.forceDescription}
            </p>
          </div>
        </div>

        {/* Text Analysis */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="text-xs font-pixel text-muted-foreground tracking-widest">
              DETECTED ORBIT
            </div>
            <h2 className="text-3xl md:text-5xl font-pixel text-gold uppercase leading-tight">
              {results.archetype}
            </h2>
            <p className="font-serif text-xl text-gold-light leading-relaxed border-l-2 border-gold pl-6 py-2">
              {results.description}
            </p>
          </div>

          <div className="space-y-4 bg-forest-deep/30 p-6 border border-wood/50">
            <div className="text-xs font-pixel text-destructive tracking-widest uppercase">
              PRIMARY LEAK DETECTED: {results.leak}
            </div>
            <p className="font-serif text-lg text-muted-foreground leading-relaxed">
              {results.leakDescription}
            </p>
          </div>

          {/* --- SIDE-CHAIN ACTION --- */}
          <div className="pt-8 space-y-6 border-t border-wood/30">
            <div className="w-full space-y-4">
              <button
                onClick={handleSideChain}
                disabled={isTransmitting}
                className={cn(
                  "w-full group relative overflow-hidden bg-[#1a1a1a] border border-gold/30 hover:border-gold hover:bg-[#222] transition-all duration-300 py-6 px-8",
                  isTransmitting && "border-amber-500 bg-amber-900/20"
                )}
              >
                {/* Progress Bar Background */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-amber-500/10 transform -translate-x-full transition-transform duration-[1500ms] ease-linear",
                    isTransmitting && "translate-x-0"
                  )} 
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex flex-col items-start text-left">
                    <span className={cn(
                      "font-pixel text-[10px] tracking-[0.2em] uppercase mb-1 transition-colors",
                      isTransmitting ? "text-amber-400" : "text-[#666] group-hover:text-gold/70"
                    )}>
                      {isTransmitting ? "TRANSMITTING..." : "RECOMMENDED ACTION"}
                    </span>
                    <span className={cn(
                      "font-display text-xl tracking-wide transition-colors",
                      isTransmitting ? "text-amber-400" : "text-gold group-hover:text-white"
                    )}>
                      {isTransmitting ? "SIDE-CHAINING TO CODEX" : "INITIATE SIDE-CHAIN PROTOCOL"}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className={cn(
                    "w-8 h-8 border border-current flex items-center justify-center transition-all duration-300 rounded-sm",
                    isTransmitting ? "text-amber-400 rotate-90 border-amber-500" : "text-[#444] group-hover:text-gold group-hover:border-gold"
                  )}>
                    <span className="font-pixel text-lg leading-none">→</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handleDownload}
                disabled={isGenerating}
                variant="outline"
                className="border-wood text-gold hover:bg-forest font-pixel py-6 text-[10px] tracking-widest"
              >
                {isGenerating ? "GENERATING..." : "DOWNLOAD PDF"}
              </Button>
              <Button 
                onClick={handleShare}
                variant="outline" 
                className="border-wood text-gold hover:bg-forest font-pixel py-6 text-[10px] tracking-widest"
              >
                SHARE SIGNAL
              </Button>
            </div>
            
            <div className="text-center pt-4">
              <Link href="/">
                <span className="text-[9px] font-pixel text-[#444] hover:text-[#666] cursor-pointer border-b border-transparent hover:border-[#444] transition-colors">
                  RETURN TO ARMORY
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PluginShell>
  );
}
