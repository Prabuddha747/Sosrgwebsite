// Plain (non-React) Web Audio singleton. Created lazily on first user
// gesture — browser autoplay policy requires this, and it also satisfies
// CLAUDE.md Section 4's "never autoplays loud" by construction: nothing
// plays before the visitor has interacted at all.
//
// Ships a placeholder low-tone drone now; real composed audio swaps in
// later by changing what's connected here, with no scene code changes
// (per the approved "ship hooks now, defer final audio" call).
class AudioManagerImpl {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private freqData: Uint8Array | null = null;
  private unlocked = false;
  private maxGain = 0.5;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctor();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  isUnlocked() {
    return this.unlocked;
  }

  unlock(volume: number, muted: boolean) {
    const ctx = this.ensureContext();
    if (ctx.state === "suspended") void ctx.resume();
    this.unlocked = true;
    this.setVolume(volume);
    this.setMuted(muted);
  }

  setVolume(volume: number) {
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.setTargetAtTime(volume * this.maxGain, this.ctx.currentTime, 0.2);
  }

  setMuted(muted: boolean) {
    if (!this.masterGain || !this.ctx) return;
    if (muted) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.15);
    }
  }

  /** One spatial anchor with a soft placeholder drone routed through it. */
  createPlaceholderAnchor(): PannerNode {
    const ctx = this.ensureContext();
    const panner = ctx.createPanner();
    panner.panningModel = "HRTF";
    panner.distanceModel = "inverse";
    panner.refDistance = 2;
    panner.maxDistance = 40;
    panner.rolloffFactor = 1;
    panner.connect(this.masterGain!);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 96;
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.16;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain);
    lfoGain.connect(oscGain.gain);

    osc.connect(oscGain);
    oscGain.connect(panner);
    osc.start();
    lfo.start();

    return panner;
  }

  updateListener(position: [number, number, number], forward: [number, number, number], up: [number, number, number]) {
    if (!this.ctx) return;
    const listener = this.ctx.listener;
    const t = this.ctx.currentTime;
    if (listener.positionX) {
      listener.positionX.setTargetAtTime(position[0], t, 0.05);
      listener.positionY.setTargetAtTime(position[1], t, 0.05);
      listener.positionZ.setTargetAtTime(position[2], t, 0.05);
      listener.forwardX.setTargetAtTime(forward[0], t, 0.05);
      listener.forwardY.setTargetAtTime(forward[1], t, 0.05);
      listener.forwardZ.setTargetAtTime(forward[2], t, 0.05);
      listener.upX.setTargetAtTime(up[0], t, 0.05);
      listener.upY.setTargetAtTime(up[1], t, 0.05);
      listener.upZ.setTargetAtTime(up[2], t, 0.05);
    }
  }

  /** Normalized 0-1 amplitude from the analyser — feeds shader uniforms. */
  getAmplitude(): number {
    if (!this.analyser || !this.freqData) return 0;
    // TS's dom lib types getByteFrequencyData as wanting Uint8Array<ArrayBuffer>
    // specifically; the constructor below always allocates its own ArrayBuffer,
    // so this cast is safe, not a behavior change.
    this.analyser.getByteFrequencyData(this.freqData as Uint8Array<ArrayBuffer>);
    let sum = 0;
    for (let i = 0; i < this.freqData.length; i++) sum += this.freqData[i];
    return sum / this.freqData.length / 255;
  }
}

export const audioManager = new AudioManagerImpl();
