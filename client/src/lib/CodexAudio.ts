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

  // Physical button push-in — short, clunky mechanical click
  // (placeholder synth — will be replaced with recorded sample)
  playButtonPress() {
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Layer 1: sharp transient click (like a switch contact)
    const click = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    click.type = "square";
    click.frequency.setValueAtTime(1200, t);
    click.frequency.exponentialRampToValueAtTime(200, t + 0.015);
    clickGain.gain.setValueAtTime(0.15, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
    click.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    click.start(t);
    click.stop(t + 0.03);

    // Layer 2: low thud body (the button bottoming out)
    const thud = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thud.type = "sine";
    thud.frequency.setValueAtTime(120, t);
    thud.frequency.exponentialRampToValueAtTime(50, t + 0.04);
    thudGain.gain.setValueAtTime(0.2, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    thud.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    thud.start(t);
    thud.stop(t + 0.07);
  }

  // Physical button pop-out — lighter, springy release
  // (placeholder synth — will be replaced with recorded sample)
  playButtonRelease() {
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Higher-pitched, lighter click — the spring pushing back
    const click = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    click.type = "triangle";
    click.frequency.setValueAtTime(600, t);
    click.frequency.exponentialRampToValueAtTime(1800, t + 0.012);
    clickGain.gain.setValueAtTime(0.08, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
    click.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    click.start(t);
    click.stop(t + 0.025);
  }

  // Sustained scan processing tone — warm, physical, rhythmic
  // Returns a stop function to end the tone early if needed
  playScanTone(durationSec: number): () => void {
    this.init();
    if (!this.ctx) return () => {};
    const t = this.ctx.currentTime;
    const ctx = this.ctx;

    // Master gain for the whole scan tone
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, t);
    master.gain.linearRampToValueAtTime(0.18, t + 0.3); // fade in
    master.gain.setValueAtTime(0.18, t + durationSec - 0.4);
    master.gain.linearRampToValueAtTime(0, t + durationSec); // fade out
    master.connect(ctx.destination);

    // Layer 1: warm carrier hum — low sine with slow LFO wobble
    const carrier = ctx.createOscillator();
    carrier.type = "sine";
    carrier.frequency.setValueAtTime(220, t); // A3
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(3, t); // 3Hz wobble — like a machine idling
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(8, t); // ±8Hz pitch wobble
    lfo.connect(lfoGain);
    lfoGain.connect(carrier.frequency);
    carrier.connect(master);
    carrier.start(t);
    carrier.stop(t + durationSec);
    lfo.start(t);
    lfo.stop(t + durationSec);

    // Layer 2: rhythmic pulse — soft clicks like a scanning head moving
    const pulseInterval = 0.15; // ~6.7 clicks per second
    const pulseNodes: OscillatorNode[] = [];
    for (let i = 0; i < durationSec / pulseInterval; i++) {
      const pt = t + i * pulseInterval;
      if (pt >= t + durationSec - 0.2) break;
      const pulse = ctx.createOscillator();
      const pGain = ctx.createGain();
      pulse.type = "triangle";
      pulse.frequency.setValueAtTime(800 + Math.sin(i * 0.3) * 200, pt);
      pGain.gain.setValueAtTime(0.03, pt);
      pGain.gain.exponentialRampToValueAtTime(0.001, pt + 0.04);
      pulse.connect(pGain);
      pGain.connect(master);
      pulse.start(pt);
      pulse.stop(pt + 0.05);
      pulseNodes.push(pulse);
    }

    // Layer 3: filtered noise bed — like the machine vibrating
    const noiseLen = ctx.sampleRate * durationSec;
    const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
    const noiseData = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) noiseData[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(300, t);
    noiseFilter.Q.setValueAtTime(2, t);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, t);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start(t);
    noise.stop(t + durationSec);

    // Return stop function
    return () => {
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      } catch (_) {}
    };
  }

  // Scan complete — satisfying mechanical resolution
  playScanComplete() {
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Layer 1: solid "ka-chunk" — low impact
    const thud = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thud.type = "sine";
    thud.frequency.setValueAtTime(180, t);
    thud.frequency.exponentialRampToValueAtTime(60, t + 0.08);
    thudGain.gain.setValueAtTime(0.25, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    thud.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    thud.start(t);
    thud.stop(t + 0.15);

    // Layer 2: warm confirmation tone — ascending, rewarding
    const tone1 = this.ctx.createOscillator();
    const tone1Gain = this.ctx.createGain();
    tone1.type = "sine";
    tone1.frequency.setValueAtTime(440, t + 0.06); // A4
    tone1Gain.gain.setValueAtTime(0, t);
    tone1Gain.gain.linearRampToValueAtTime(0.12, t + 0.08);
    tone1Gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    tone1.connect(tone1Gain);
    tone1Gain.connect(this.ctx.destination);
    tone1.start(t + 0.06);
    tone1.stop(t + 0.3);

    const tone2 = this.ctx.createOscillator();
    const tone2Gain = this.ctx.createGain();
    tone2.type = "sine";
    tone2.frequency.setValueAtTime(659, t + 0.12); // E5 — a fifth up
    tone2Gain.gain.setValueAtTime(0, t);
    tone2Gain.gain.linearRampToValueAtTime(0.1, t + 0.14);
    tone2Gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    tone2.connect(tone2Gain);
    tone2Gain.connect(this.ctx.destination);
    tone2.start(t + 0.12);
    tone2.stop(t + 0.4);
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
