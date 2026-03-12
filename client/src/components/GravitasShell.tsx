import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GravitasShellProps {
  children: ReactNode;
  className?: string;
  footerControls?: ReactNode;
  status?: string;
  statusColor?: string;
  signalCategory?: string;
  progress?: number; // 0-1 for level bar
  totalQuestions?: number;
  hideCalibration?: boolean;
  hideCalStamp?: boolean;
}

export default function GravitasShell({
  children,
  className,
  footerControls,
  status = "SEARCHING...",
  statusColor = "text-amber-400 animate-pulse",
  signalCategory = "IDENTITY",
  progress = 0,
  totalQuestions = 12,
  hideCalibration = false,
  hideCalStamp = false,
}: GravitasShellProps) {
  const dustRef = useRef<HTMLDivElement>(null);

  // Generate dust particles on mount
  useEffect(() => {
    const container = dustRef.current;
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      const dust = document.createElement("div");
      dust.className = "gravitas-dust";
      dust.style.left = `${Math.random() * 100}%`;
      dust.style.animationDuration = `${15 + Math.random() * 25}s`;
      dust.style.animationDelay = `${Math.random() * 20}s`;
      const size = 1 + Math.random() * 2;
      dust.style.width = `${size}px`;
      dust.style.height = `${size}px`;
      dust.style.opacity = `${0.03 + Math.random() * 0.05}`;
      container.appendChild(dust);
    }
  }, []);

  const activeSegments = Math.round(progress * 12);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden font-mono">
      {/* Scene Container — maintains 16:9 aspect ratio */}
      <div
        className={cn(
          "relative w-full max-w-[177.78vh] overflow-hidden",
          className
        )}
        style={{ aspectRatio: "16/9" }}
      >
        {/* Background Art — the generated frame image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/gravitas/gravitas-frame.webp')",
            backgroundSize: "100% 100%",
          }}
        />

        {/* CRT green light spill onto frame */}
        <div
          className="absolute pointer-events-none z-[1]"
          style={{
            left: "30%",
            top: "35%",
            width: "40%",
            height: "30%",
            background:
              "radial-gradient(ellipse at center, rgba(74, 222, 128, 0.03) 0%, transparent 70%)",
          }}
        />

        {/* Dust Particles */}
        <div
          ref={dustRef}
          className="absolute inset-0 pointer-events-none z-[100] overflow-hidden"
        />

        {/* CSS UI Overlay — positioned inside the dark panel of the frame */}
        <div
          className="absolute flex flex-col overflow-hidden"
          style={{
            left: "18.5%",
            top: "35%",
            width: "62.4%",
            height: "45%",
            background: "#0c0c0e",
          }}
        >
          {/* Engraved Side Labels */}
          <div
            className="absolute text-[5px] tracking-[0.3em] text-white/[0.04] uppercase z-[5]"
            style={{
              writingMode: "vertical-rl",
              left: "4px",
              top: "50%",
              transform: "translateY(-50%) rotate(180deg)",
            }}
          >
            RL-GRV-MK2 // FIELD DIAGNOSTICS
          </div>
          <div
            className="absolute text-[5px] tracking-[0.3em] text-white/[0.04] uppercase z-[5]"
            style={{
              writingMode: "vertical-rl",
              right: "4px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            REBEL LEADERS // OBSERVATORY
          </div>

          {/* Header Panel */}
          <div className="h-[48px] min-h-[48px] bg-gradient-to-b from-[#0d0d10] to-[#0a0a0d] border-b border-[#1a1a22] flex items-center justify-between px-5 relative">
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

            {/* Status Cluster (title hidden — engraved in frame image) */}
            <div className="flex items-center gap-3.5">
              {/* PWR LED */}
              <div className="flex items-center gap-1">
                <div className="w-[5px] h-[5px] rounded-full bg-green-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5),0_0_6px_rgba(34,197,94,0.3),0_0_12px_rgba(34,197,94,0.1)]" />
                <span className="text-[7px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  PWR
                </span>
              </div>
              {/* SIG LED */}
              <div className="flex items-center gap-1">
                <div className="w-[5px] h-[5px] rounded-full bg-amber-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_0_6px_rgba(212,160,68,0.4)] animate-pulse" />
                <span className="text-[7px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  SIG
                </span>
              </div>
              {/* CLIP LED */}
              <div className="flex items-center gap-1">
                <div className="w-[5px] h-[5px] rounded-full bg-red-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
                <span className="text-[7px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  CLIP
                </span>
              </div>
            </div>

            {/* Serial Plate */}
            <div className="bg-gradient-to-br from-[#1a1a20] to-[#141418] border border-[#1a1a22] rounded-[2px] px-2 py-[3px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
              <span className="text-[7px] tracking-[0.15em] text-[#3a3a44]">
                RL-001 // ONLINE
              </span>
            </div>
          </div>

          {/* Main Instrument Area */}
          <div className="flex-1 px-5 py-3 bg-[#0c0c0e] relative flex flex-col justify-between overflow-hidden">
            {/* Ambient light from above */}
            <div
              className="absolute top-0 left-[30%] -translate-x-1/2 w-1/2 h-20 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top, rgba(197, 160, 89, 0.04) 0%, transparent 100%)",
              }}
            />
            {/* Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] pointer-events-none" />

            {/* Signal Input Bar */}
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/[0.03] relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-[8px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  Signal Input
                </span>
                <div className="w-px h-2.5 bg-[#2a2a32]" />
                <div className="w-1 h-1 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5),0_0_12px_rgba(74,222,128,0.2)] animate-pulse" />
                <span className="text-[10px] tracking-[0.25em] text-[#c5a059] uppercase drop-shadow-[0_0_8px_rgba(197,160,89,0.3)]">
                  {signalCategory}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-px bg-[#0a0a0e] p-[2px] border border-[#1a1a22] rounded-[1px] shadow-inner">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-[3px] h-2 rounded-[1px] transition-all duration-300",
                        i < activeSegments
                          ? "bg-green-400 shadow-[0_0_4px_rgba(74,222,128,0.4)]"
                          : "bg-[#111]"
                      )}
                    />
                  ))}
                </div>
                <div className="w-px h-2.5 bg-[#2a2a32]" />
                <span className="text-[8px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  Level
                </span>
              </div>
            </div>

            {/* Main Content — instruments go here */}
            <div className="flex-1 relative z-10">{children}</div>

            {/* Calibration Readouts */}
            {!hideCalibration && (
            <div className="flex items-center justify-center gap-5 pt-1.5 mt-1 border-t border-white/[0.03] relative z-10">
              <div className="flex flex-col items-center gap-[2px]">
                <span className="text-[6px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  Field Lock
                </span>
                <span className="text-[9px] tracking-[0.15em] text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.5)] shadow-green-400">
                  ACQUIRED
                </span>
              </div>
              <div className="w-px h-5 bg-[#1a1a22]" />
              <div className="flex flex-col items-center gap-[2px]">
                <span className="text-[6px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  Drift
                </span>
                <span className="text-[9px] tracking-[0.15em] text-amber-400 drop-shadow-[0_0_6px_rgba(212,160,68,0.5)]">
                  0.3&deg;
                </span>
              </div>
              <div className="w-px h-5 bg-[#1a1a22]" />
              <div className="flex flex-col items-center gap-[2px]">
                <span className="text-[6px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  Coherence
                </span>
                <span className="text-[9px] tracking-[0.15em] text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.5)]">
                  87%
                </span>
              </div>
              <div className="w-px h-5 bg-[#1a1a22]" />
              <div className="flex flex-col items-center gap-[2px]">
                <span className="text-[6px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  Noise Floor
                </span>
                <span className="text-[9px] tracking-[0.15em] text-[#8a8a96] drop-shadow-[0_0_4px_rgba(138,138,150,0.3)]">
                  -42dB
                </span>
              </div>
              <div className="w-px h-5 bg-[#1a1a22]" />
              <div className="flex flex-col items-center gap-[2px]">
                <span className="text-[6px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  Gravity Bias
                </span>
                <span className="text-[9px] tracking-[0.15em] text-amber-400 drop-shadow-[0_0_6px_rgba(212,160,68,0.5)]">
                  {signalCategory}
                </span>
              </div>
            </div>
            )}

            {/* Calibration Stamp — inside panel, bottom-right */}
            {!hideCalStamp && (
            <div className="absolute bottom-[6px] right-3 z-40">
              <div className="bg-[rgba(20,20,24,0.8)] border border-[#1a1a22] px-1.5 py-[2px] rounded-[1px]">
                <span className="text-[5px] tracking-[0.15em] text-[#3a3a44] uppercase">
                  CAL: 2026.03 // UNIT RL-GRV-001
                </span>
              </div>
            </div>
            )}

          </div>

          {/* Footer Panel */}
          <div className="h-9 min-h-9 bg-gradient-to-b from-[#111114] to-[#0e0e11] border-t border-[#1a1a22] flex items-center justify-between px-5 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-[5px]">
                <div className="w-1 h-1 rounded-full bg-[#111] border border-[#2a2a32] shadow-inner" />
                <span className="text-[7px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  Mode:
                </span>
                <span className="text-[7px] tracking-[0.2em] text-[#c5a059] uppercase">
                  Standard
                </span>
              </div>
              <div className="w-px h-2.5 bg-[#2a2a32]" />
              <div className="flex items-center gap-[5px]">
                <span className="text-[7px] tracking-[0.2em] text-[#3a3a44] uppercase">
                  Sidechain:
                </span>
                <span
                  className={cn(
                    "text-[7px] tracking-[0.2em] uppercase",
                    statusColor
                  )}
                >
                  {status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {footerControls}
              <div className="w-px h-2.5 bg-[#2a2a32]" />
              <span className="text-[7px] tracking-[0.2em] text-[#3a3a44]">
                V.2.0.0
              </span>
              <div className="w-[7px] h-[7px] rounded-full bg-[#0a0a0e] border border-[#1a1a20] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />
            </div>
          </div>
        </div>



        {/* Sticker — slapped on the chassis, below the panel */}
        <div
          className="absolute z-[50] transition-transform duration-300 hover:rotate-[-8deg] hover:scale-105"
          style={{
            bottom: "12%",
            left: "calc(26% - 100px)",
            transform: "rotate(-5deg)",
          }}
        >
          <img
            src="/assets/gravitas/nic-sticker.webp"
            alt="Nic Sword Bearer"
            className="w-[120px] h-auto drop-shadow-[2px_4px_6px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      {/* Global Gravitas Styles */}
      <style>{`
        .gravitas-dust {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          animation: gravitas-drift linear infinite;
        }
        @keyframes gravitas-drift {
          0% { transform: translateY(100%) translateX(0); opacity: 0; }
          10% { opacity: 0.06; }
          90% { opacity: 0.06; }
          100% { transform: translateY(-10%) translateX(30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
