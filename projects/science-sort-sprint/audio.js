// Science Sort Sprint - Web Audio Synthesizer (EdTech Harmonic Sound Engine)
// Zero-dependency, pleasant soft-sine & marimba envelopes with volume control and persistence.

class SoundFX {
    constructor() {
        this.ctx = null;
        const savedMute = localStorage.getItem('scienceSortMuted');
        this.enabled = savedMute !== 'true';
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.enabled = !this.enabled;
        localStorage.setItem('scienceSortMuted', (!this.enabled).toString());
        return this.enabled;
    }

    isMuted() {
        return !this.enabled;
    }

    // Play a gentle chime tone with soft bell/marimba attack & decay
    playChime(freq, duration = 0.3, vol = 0.08, type = 'sine') {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        // Soft Bell Envelope (Attack -> Fast Decay)
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(vol, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
    }

    // Correct Answer: Pleasant ascending major chord (C5 -> E5 -> G5)
    playCorrect() {
        if (!this.enabled) return;
        this.playChime(523.25, 0.22, 0.07); // C5
        setTimeout(() => this.playChime(659.25, 0.28, 0.08), 80); // E5
    }

    // Wrong Answer: Gentle low double-tap (non-punishing, encouraging)
    playWrong() {
        if (!this.enabled) return;
        this.playChime(261.63, 0.18, 0.07, 'triangle'); // C4
        setTimeout(() => this.playChime(220.00, 0.25, 0.08, 'triangle'), 110); // A3
    }

    // Combo Streak: Ascending sparkling arpeggio
    playCombo(streak = 3) {
        if (!this.enabled) return;
        const base = Math.min(streak, 8);
        const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
        const n1 = notes[(base - 3) % notes.length];
        const n2 = notes[(base - 2) % notes.length];
        const n3 = notes[(base - 1) % notes.length];

        this.playChime(n1, 0.2, 0.06);
        setTimeout(() => this.playChime(n2, 0.2, 0.07), 70);
        setTimeout(() => this.playChime(n3, 0.35, 0.09), 140);
    }

    // Level Up Fanfare
    playLevelUp() {
        if (!this.enabled) return;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playChime(freq, 0.35, 0.08), idx * 90);
        });
    }

    // Subtle tick for cards near bottom
    playTick() {
        if (!this.enabled) return;
        this.playChime(800, 0.05, 0.02, 'triangle');
    }

    // Freeze Card: Icy crystalline glissando
    playFreeze() {
        if (!this.enabled) return;
        this.playChime(987.77, 0.3, 0.06);
        setTimeout(() => this.playChime(1174.66, 0.3, 0.07), 80);
        setTimeout(() => this.playChime(1318.51, 0.4, 0.08), 160);
    }

    // Game Over: Gentle melancholic cadence
    playGameOver() {
        if (!this.enabled) return;
        this.playChime(392.00, 0.3, 0.07, 'triangle'); // G4
        setTimeout(() => this.playChime(349.23, 0.3, 0.07, 'triangle'), 180); // F4
        setTimeout(() => this.playChime(329.63, 0.35, 0.08, 'triangle'), 360); // E4
        setTimeout(() => this.playChime(261.63, 0.6, 0.09, 'triangle'), 540); // C4
    }

    // Pause blip
    playPause() {
        if (!this.enabled) return;
        this.playChime(440, 0.12, 0.04);
    }
}

const sfx = new SoundFX();
