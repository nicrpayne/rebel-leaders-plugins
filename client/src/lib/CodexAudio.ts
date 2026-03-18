// Codex audio engine — synthesized sounds + file-based sounds for load/eject

class CodexAudioEngine {
  private ctx: AudioContext | null = null;
  private loadBuffer: AudioBuffer | null = null;
  private ejectBuffer: AudioBuffer | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("click", () => this.init(), { once: true });
      window.addEventListener("keydown", () => this.init(), { once: true });
    }
  }

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Preload sound files immediately after context is created
      this.preloadSounds();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private async preloadSounds() {
    if (!this.ctx) return;
    try {
      const [loadRes, ejectRes] = await Promise.all([
        fetch("/assets/sounds/cartridge-load.mp3"),
        fetch("/assets/sounds/cartridge-eject.mp3"),
      ]);
      const [loadArr, ejectArr] = await Promise.all([
        loadRes.arrayBuffer(),
        ejectRes.arrayBuffer(),
      ]);
      [this.loadBuffer, this.ejectBuffer] = await Promise.all([
        this.ctx.decodeAudioData(loadArr),
        this.ctx.decodeAudioData(ejectArr),
      ]);
    } catch (e) {
      // Silently fall back to synthesized sounds if files fail to load
      console.warn("[CodexAudio] Could not load sound files:", e);
    }
  }

  private playBuffer(buffer: AudioBuffer) {
    if (!this.ctx) return;
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.ctx.destination);
    source.start();
  }

  // Load cartridge sound — uses file if preloaded, falls back to synthesized
  playLoad() {
    this.init();
    if (!this.ctx) return;
    if (this.loadBuffer) {
      this.playBuffer(this.loadBuffer);
      return;
    }
    // Synthesized fallback
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.1);
    gain.gain.setValueAtTime(0.8, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  // High-pitched "Beep" for Read button
  playClick() {
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "square";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);
    
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  // Force resume audio context
  resume() {
    this.init();
  }

  // Eject cartridge sound — uses file if preloaded, falls back to synthesized
  playEject() {
    this.init();
    if (!this.ctx) return;
    if (this.ejectBuffer) {
      this.playBuffer(this.ejectBuffer);
      return;
    }
    // Synthesized fallback
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.linearRampToValueAtTime(100, t + 0.2);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(t);
  }
}

export const codexAudio = new CodexAudioEngine();
