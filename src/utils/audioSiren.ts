/**
 * Aegis Acoustic Siren Engine
 * Synthesizes multi-frequency pulsating alarm sirens and calm recovery bowls
 * using native Web Audio API with zero external audio assets.
 */

class AudioSirenEngine {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Start high-urgency escalating acoustic warble siren
   */
  public startSiren(volume = 0.8) {
    if (this.isPlaying) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      // Fast attack to specified volume
      this.gainNode.gain.exponentialRampToValueAtTime(Math.min(volume, 1.0), this.ctx.currentTime + 0.3);
      this.gainNode.connect(this.ctx.destination);

      // Primary oscillator (sweeps 800Hz to 1250Hz)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(900, this.ctx.currentTime);

      // Secondary harmonizing oscillator (offset for dissonance)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'square';
      this.osc2.frequency.setValueAtTime(940, this.ctx.currentTime);

      // LFO for periodic warble sweep (3 Hz)
      this.lfo = this.ctx.createOscillator();
      this.lfo.type = 'sine';
      this.lfo.frequency.setValueAtTime(3.2, this.ctx.currentTime);

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(320, this.ctx.currentTime);

      this.lfo.connect(lfoGain);
      lfoGain.connect(this.osc1.frequency);
      lfoGain.connect(this.osc2.frequency);

      this.osc1.connect(this.gainNode);
      this.osc2.connect(this.gainNode);

      this.osc1.start();
      this.osc2.start();
      this.lfo.start();

      this.isPlaying = true;
    } catch (err) {
      console.warn('Audio Siren initiation restricted by browser policy:', err);
    }
  }

  /**
   * Disarm and stop siren
   */
  public stopSiren() {
    if (!this.isPlaying || !this.ctx) return;
    try {
      if (this.gainNode) {
        this.gainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      }
      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.lfo?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.lfo?.disconnect();
        } catch {}
        this.osc1 = null;
        this.osc2 = null;
        this.lfo = null;
        this.gainNode = null;
        this.isPlaying = false;
      }, 200);
    } catch (err) {
      this.isPlaying = false;
    }
  }

  /**
   * Play soothing Tibetan singing bowl chime upon disarm / recovery reset
   */
  public playCalmChime() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chimeGain = this.ctx.createGain();
      chimeGain.gain.setValueAtTime(0.3, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
      chimeGain.connect(this.ctx.destination);

      const freqs = [432, 864, 1296];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.connect(chimeGain);
        osc.start(now + idx * 0.05);
        osc.stop(now + 3.0);
      });
    } catch {}
  }

  /**
   * Play single urgent alert pulse
   */
  public playBeepPulse() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const sirenEngine = new AudioSirenEngine();
