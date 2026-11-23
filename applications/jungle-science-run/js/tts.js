// ระบบสังเคราะห์เสียงอ่านโจทย์ด้วย Web Speech API (Text-to-Speech)
// รองรับภาษาไทย (th-TH) พร้อมระบบเลือกเสียงและควบคุมความเร็วที่เหมาะกับการเล่นเกม

export class TTSManager {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.enabled = true;
    this.thaiVoice = null;
    this.currentUtterance = null;
    this.rate = 1.05; // เร็วขึ้นเล็กน้อยเพื่อให้อ่านทันก่อนถึงประตู
    this.pitch = 1.0;
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const findVoice = () => {
      const voices = this.synth.getVoices();
      // ค้นหาเสียงภาษาไทย (th-TH หรือภาษาที่ขึ้นต้นด้วย th)
      this.thaiVoice = voices.find((v) => v.lang === 'th-TH' || v.lang.startsWith('th')) || null;
    };

    findVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = findVoice;
    }
  }

  isSupported() {
    return !!this.synth;
  }

  setEnabled(val) {
    this.enabled = !!val;
    if (!this.enabled) {
      this.stop();
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  /**
   * อ่านข้อความ
   * @param {string} text - ข้อความภาษาไทย
   * @param {Object} options - { onEnd, onError, force }
   */
  speak(text, { onEnd = null, onError = null, force = false } = {}) {
    if (!this.synth) return false;
    if (!this.enabled && !force) return false;
    if (!text || !text.trim()) return false;

    // ยกเลิกข้อความก่อนหน้าทันทีเพื่อไม่ให้เสียงทับซ้อนกัน
    this.stop();

    try {
      const u = new SpeechSynthesisUtterance(text.trim());
      if (this.thaiVoice) {
        u.voice = this.thaiVoice;
        u.lang = this.thaiVoice.lang;
      } else {
        u.lang = 'th-TH';
      }

      u.rate = this.rate;
      u.pitch = this.pitch;

      u.onend = () => {
        this.currentUtterance = null;
        if (typeof onEnd === 'function') onEnd();
      };

      u.onerror = (e) => {
        this.currentUtterance = null;
        if (typeof onError === 'function') onError(e);
      };

      this.currentUtterance = u;
      this.synth.speak(u);
      return true;
    } catch (err) {
      console.warn('TTS speak error:', err);
      return false;
    }
  }

  /**
   * อ่านโจทย์คำถามวิทยาศาสตร์
   * @param {Object} qObj - อ็อบเจกต์คำถาม { q, a, topic }
   * @param {boolean} includeOptions - ควรอ่านตัวเลือกด้วยหรือไม่
   */
  speakQuestion(qObj, includeOptions = false) {
    if (!qObj || !qObj.q) return;
    let text = qObj.q;
    if (includeOptions && Array.isArray(qObj.a)) {
      text += ' ตัวเลือกที่ 1: ' + qObj.a[0] + ' ตัวเลือกที่ 2: ' + qObj.a[1] + ' ตัวเลือกที่ 3: ' + qObj.a[2];
    }
    return this.speak(text);
  }
}

export const tts = new TTSManager();
