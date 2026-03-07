import { cn } from "@/lib/utils";

export default function Assets() {
  return (
    <div className="min-h-screen bg-black p-8 text-gold font-mono">
      <h1 className="text-2xl mb-8 font-pixel">ASSET INSPECTION CANVAS</h1>

      <div className="grid grid-cols-1 gap-12">
        
        {/* 1. DECK FACE */}
        <section>
          <h2 className="text-xl mb-4 border-b border-gold/30 pb-2">1. DECK FACE (21:9)</h2>
          <p className="mb-2 text-sm text-gold/60">Raw Image URL: https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_deck_face_wide-5wRwynP7E8tErdVLcFv4Nz.webp</p>
          <div className="border border-gold/20 p-4 bg-gray-900/50">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_deck_face_wide-5wRwynP7E8tErdVLcFv4Nz.webp" 
              alt="Deck Face" 
              className="w-full max-w-[800px]"
            />
          </div>
        </section>

        {/* 2. CARTRIDGE SPINE */}
        <section>
          <h2 className="text-xl mb-4 border-b border-gold/30 pb-2">2. CARTRIDGE SPINE</h2>
          <p className="mb-2 text-sm text-gold/60">Raw Image URL: https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine-FRQgHyfCgopKrtm3CwhgBC.webp</p>
          <div className="border border-gold/20 p-4 bg-gray-900/50">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine-FRQgHyfCgopKrtm3CwhgBC.webp" 
              alt="Cartridge Spine" 
              className="w-full max-w-[600px]"
            />
          </div>
        </section>

        {/* 3. COMPOSITION TEST */}
        <section>
          <h2 className="text-xl mb-4 border-b border-gold/30 pb-2">3. COMPOSITION TEST (Overlay)</h2>
          <p className="mb-2 text-sm text-gold/60">Cartridge (Opacity 80%) over Deck Face</p>
          <div className="relative w-full max-w-[800px] aspect-[21/9] border border-gold/20">
            {/* Deck */}
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_deck_face_wide-5wRwynP7E8tErdVLcFv4Nz.webp" 
              className="absolute inset-0 w-full h-full object-contain z-10"
            />
            {/* Cartridge Placeholder Box */}
            <div className="absolute top-[40%] left-[21%] w-[46%] h-[18%] bg-red-500/50 z-20 flex items-center justify-center border border-red-500">
              <span className="text-white font-bold bg-black/50 px-2">SLOT AREA</span>
            </div>
             {/* Cartridge Image */}
             <div className="absolute top-[35%] left-[20%] w-[48%] h-[28%] z-30 opacity-80 pointer-events-none">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663030438402/6XMovZHp9ctGFaj4XUiVdL/codex_cartridge_spine-FRQgHyfCgopKrtm3CwhgBC.webp"
                  className="w-full h-full object-fill"
                />
             </div>
          </div>
        </section>

      </div>
    </div>
  );
}
