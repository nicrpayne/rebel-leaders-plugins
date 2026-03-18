// Codex audio engine — synthesized sounds + file-based sounds for load/eject

class CodexAudioEngine {
  private ctx: AudioContext | null = null;
  private loadBuffer: AudioBuffer | null = null;
  private ejectBuffer: AudioBuffer | null = null;
  private vhsButtonBuffer: AudioBuffer | null = null;
  private deviceButtonBuffer: AudioBuffer | null = null;
  private preloadPromise: Promise<void> | null = null;

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
      this.preloadPromise = this.preloadSounds();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private async preloadSounds() {
    if (!this.ctx) return;
    try {
      const [loadRes, ejectRes, vhsRes, deviceRes] = await Promise.all([
        fetch("/assets/sounds/cartridge-load.mp3"),
        fetch("/assets/sounds/cartridge-eject.mp3"),
        fetch("/assets/sounds/vhs-button-press.mp3"),
        fetch("/assets/sounds/device-button-press.mp3"),
      ]);
      const [loadArr, ejectArr, vhsArr, deviceArr] = await Promise.all([
        loadRes.arrayBuffer(),
        ejectRes.arrayBuffer(),
        vhsRes.arrayBuffer(),
        deviceRes.arrayBuffer(),
      ]);
      [this.loadBuffer, this.ejectBuffer, this.vhsButtonBuffer, this.deviceButtonBuffer] = await Promise.all([
        this.ctx.decodeAudioData(loadArr),
        this.ctx.decodeAudioData(ejectArr),
        this.ctx.decodeAudioData(vhsArr),
        this.ctx.decodeAudioData(deviceArr),
      ]);
    } catch (e) {
      // Silently fall back to synthesized sounds if files fail to load
      console.warn("[CodexAudio] Could not load sound files:", e);
    }
  }

  private playBuffer(buffer: AudioBuffer, volume: number = 1.0) {
    if (!this.ctx) return;
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    if (volume !== 1.0) {
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      source.connect(gain);
      gain.connect(this.ctx.destination);
    } else {
      source.connect(this.ctx.destination);
    }
    source.start();
  }

  // Load cartridge sound — waits for preload on first call, falls back to synthesized
  async playLoad() {
    this.init();
    if (!this.ctx) return;
    // Wait for preload to finish if it's still in progress
    if (this.preloadPromise && !this.loadBuffer) {
      await this.preloadPromise;
    }
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

  // SCAN button press — VHS cassette mechanical click (recorded sample)
  // Falls back to synthesized if file not loaded
  playButtonPress() {
    this.init();
    if (!this.ctx) return;
    if (this.vhsButtonBuffer) {
      this.playBuffer(this.vhsButtonBuffer, 2.5); // boosted volume to match load/eject
      return;
    }
    // Synthesized fallback
    const t = this.ctx.currentTime;
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
  }

  // READ button press — device mechanical click (recorded sample)
  // Falls back to synthesized if file not loaded
  playButtonRelease() {
    this.init();
    if (!this.ctx) return;
    if (this.deviceButtonBuffer) {
      this.playBuffer(this.deviceButtonBuffer, 2.5); // boosted volume to match load/eject
      return;
    }
    // Synthesized fallback
    const t = this.ctx.currentTime;
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

  // Scan processing tone — R2-D2 style chirp sequence
  // Rapid melodic bleeps with personality, like a droid analyzing data
  // Returns a stop function to end the tone early if needed
  playScanTone(durationSec: number): () => void {
    this.init();
    if (!this.ctx) return () => {};
    const t = this.ctx.currentTime;
    const ctx = this.ctx;

    // Master gain with fade in/out
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, t);
    master.gain.linearRampToValueAtTime(0.22, t + 0.08);
    master.gain.setValueAtTime(0.22, t + durationSec - 0.3);
    master.gain.linearRampToValueAtTime(0, t + durationSec);
    master.connect(ctx.destination);

    // ── Chirp phrase generator ──
    // Build a sequence of short melodic "phrases" like R2-D2 chatter.
    // Each phrase is 3-6 rapid notes with pitch jumps, slides, and varied waveforms.
    const notes: { start: number; freq: number; endFreq: number; dur: number; wave: OscillatorType; vol: number }[] = [];

    // Pentatonic-ish scale for pleasant bleeps (C5-ish range)
    const scale = [523, 587, 659, 784, 880, 1047, 1175, 1319, 1568, 1760];
    const waves: OscillatorType[] = ["square", "sawtooth", "triangle", "sine"];

    // Seed a pseudo-random sequence so it sounds consistent but organic
    let seed = 42;
    const rand = () => { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; };

    let cursor = 0.05; // start offset
    const endTime = durationSec - 0.3;

    while (cursor < endTime) {
      // Each phrase: 3-6 rapid notes
      const phraseLen = 3 + Math.floor(rand() * 4);
      const wave = waves[Math.floor(rand() * waves.length)];
      const baseIdx = Math.floor(rand() * 6); // start somewhere in the scale

      for (let n = 0; n < phraseLen && cursor < endTime; n++) {
        const noteIdx = Math.min(Math.max(baseIdx + Math.floor(rand() * 5) - 2, 0), scale.length - 1);
        const freq = scale[noteIdx];
        // Occasional pitch slide (the signature R2-D2 "whoop")
        const slide = rand() > 0.65;
        const endIdx = Math.min(Math.max(noteIdx + (rand() > 0.5 ? 3 : -3), 0), scale.length - 1);
        const endFreq = slide ? scale[endIdx] : freq;
        // Note duration: short staccato (40-100ms)
        const dur = 0.04 + rand() * 0.06;
        // Volume variation for expressiveness
        const vol = 0.12 + rand() * 0.1;

        notes.push({ start: cursor, freq, endFreq, dur, wave, vol });
        cursor += dur + 0.01 + rand() * 0.02; // tiny gap between notes in a phrase
      }

      // Gap between phrases (80-200ms of silence)
      cursor += 0.08 + rand() * 0.12;
    }

    // ── Render all chirp notes ──
    for (const note of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = note.wave;
      const nt = t + note.start;
      osc.frequency.setValueAtTime(note.freq, nt);
      if (note.endFreq !== note.freq) {
        osc.frequency.exponentialRampToValueAtTime(note.endFreq, nt + note.dur);
      }
      // Snappy attack, quick decay — gives each note a "bleep" quality
      gain.gain.setValueAtTime(0.001, nt);
      gain.gain.linearRampToValueAtTime(note.vol, nt + 0.005);
      gain.gain.setValueAtTime(note.vol, nt + note.dur * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, nt + note.dur);
      osc.connect(gain);
      gain.connect(master);
      osc.start(nt);
      osc.stop(nt + note.dur + 0.01);
    }

    // ── Subtle low hum underneath — gives it body/presence ──
    const hum = ctx.createOscillator();
    hum.type = "sine";
    hum.frequency.setValueAtTime(110, t);
    const humGain = ctx.createGain();
    humGain.gain.setValueAtTime(0.04, t);
    hum.connect(humGain);
    humGain.connect(master);
    hum.start(t);
    hum.stop(t + durationSec);

    // Return stop function
    return () => {
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
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
