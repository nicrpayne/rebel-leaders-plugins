import { useEffect, useState } from "react";
import PluginShell from "@/components/PluginShell";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { ScoringResult } from "@/lib/scoring";
import { generateDebriefPDF } from "@/lib/pdf";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Results() {
  const [results, setResults] = useState<ScoringResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("gravity_check_results");
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

  if (!results) return (
    <PluginShell title="ORBIT ANALYSIS" category="MIRROR">
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
    <PluginShell title="ORBIT ANALYSIS" category="MIRROR">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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

          <div className="pt-8 space-y-4">
            <Button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="w-full bg-gold hover:bg-gold-light text-forest-deep font-pixel py-6 tracking-widest"
            >
              {isGenerating ? "GENERATING..." : "DOWNLOAD DEBRIEF PDF"}
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handleShare}
                variant="outline" 
                className="border-wood text-gold hover:bg-forest font-pixel py-6 text-xs"
              >
                SHARE SIGNAL
              </Button>
              <Link href="/">
                <Button variant="outline" className="w-full border-wood text-gold hover:bg-forest font-pixel py-6 text-xs">
                  RETURN TO ARMORY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PluginShell>
  );
}
