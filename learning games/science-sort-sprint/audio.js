class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playTone(freq, type, duration, vol = 0.1) {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playCorrect() {
        this.init();
        this.playTone(600, 'sine', 0.1, 0.1);
        setTimeout(() => this.playTone(800, 'sine', 0.2, 0.1), 100);
    }

    playWrong() {
        this.init();
        this.playTone(300, 'sawtooth', 0.1, 0.1);
        setTimeout(() => this.playTone(200, 'sawtooth', 0.3, 0.15), 100);
    }

    playCombo() {
        this.init();
        this.playTone(400, 'square', 0.1, 0.05);
        setTimeout(() => this.playTone(600, 'square', 0.1, 0.05), 100);
        setTimeout(() => this.playTone(800, 'square', 0.2, 0.05), 200);
        setTimeout(() => this.playTone(1200, 'sine', 0.4, 0.1), 300);
    }

    playGameOver() {
        this.init();
        this.playTone(400, 'sawtooth', 0.2, 0.1);
        setTimeout(() => this.playTone(350, 'sawtooth', 0.2, 0.1), 200);
        setTimeout(() => this.playTone(300, 'sawtooth', 0.2, 0.1), 400);
        setTimeout(() => this.playTone(250, 'sawtooth', 0.6, 0.15), 600);
    }
}

const sfx = new SoundFX();
