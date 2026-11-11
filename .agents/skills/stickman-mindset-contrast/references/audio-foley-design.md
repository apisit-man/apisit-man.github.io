# Audio & Foley Sound Design: Stickman Split-Screen

Sound design is 50% of the viral impact in these videos. The contrast between the **harsh, strained mechanical sounds of the top scene** and the **soothing, continuous natural flow of the bottom scene** creates deep emotional resonance.

---

## 1. Sound Structure & Timeline (8–10s Loop)

| Time | Scene | Sound Cue | Type | Emotion / Effect |
| :--- | :--- | :--- | :--- | :--- |
| `00:00 - 00:02` | Top | Heavy Footstep + Wood Creak | SFX | Heavy labor, physical strain, fatigue. |
| `00:01.5` | Top | Strained Grunt (`Ugh...`) | Voice / Foley | Struggle and exhaustion. |
| `00:02.8` | Top | Trip & Stumble Whoosh | SFX | Sudden loss of control. |
| `00:03.2` | Top | Heavy Body Slam + Bucket Crash | SFX | Shock, failure, collapse. |
| `00:03.4` | Top | Water Splash & Spilling Slosh | SFX | Loss of accumulated effort / wasted time. |
| `00:04.2` | Top | Defeated Sigh / Pant (`Huuuuh...`) | Voice / Foley | Helplessness and burnout. |
| `00:00 - End` | Bottom | Calming Water Stream Flow | Ambient SFX | Steady passive cashflow, continuous flow. |
| `00:00 - End` | Overall | Slowed + Reverb Melancholic BGM | Music | Viral emotional tone (phased synth, sad lo-fi). |

---

## 2. Web Audio API Procedural Synthesizer

You can generate 100% of these sound effects purely using the browser's native `AudioContext` without requiring external MP3 files:

```javascript
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.waterNoiseNode = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Wood creak under strain
  playCreak() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.35);
    
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  // Crash / Bucket Thud & Floor Impact
  playImpactCrash() {
    if (!this.ctx) return;
    // Low frequency thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(110, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(25, this.ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);

    // Noise clatter for bucket metal/wood impact
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.5, this.ctx.currentTime);
    
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start();
  }

  // Water splash / spill
  playWaterSplash() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(300, this.ctx.currentTime + 0.6);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  // Continuous soothing water flow loop (Bottom Scene)
  startPassiveWaterStream() {
    if (!this.ctx || this.waterNoiseNode) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.waterNoiseNode = this.ctx.createBufferSource();
    this.waterNoiseNode.buffer = buffer;
    this.waterNoiseNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(950, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    this.waterNoiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    this.waterNoiseNode.start();
  }
}
```
