/**
 * Roller Coaster Energy Tycoon - All-in-One Standalone Bundle
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 * Works 100% offline via file:// and online via GitHub Pages
 */


// Safe Cross-Browser Rounded Rectangle Helper
function drawRoundedRect(ctx, x, y, w, h, r) {
  if (w <= 0 || h <= 0) return;
  let radius = 4;
  if (typeof r === 'number') radius = r;
  else if (Array.isArray(r) && r.length > 0) radius = r[0];
  const safeR = Math.max(0, Math.min(radius, Math.abs(w) / 2, Math.abs(h) / 2));
  ctx.beginPath();
  ctx.moveTo(x + safeR, y);
  ctx.arcTo(x + w, y, x + w, y + h, safeR);
  ctx.arcTo(x + w, y + h, x, y + h, safeR);
  ctx.arcTo(x, y + h, x, y, safeR);
  ctx.arcTo(x, y, x + w, y, safeR);
  ctx.closePath();
}


// 1. Socratic AI Module (Google AI Studio)
/**
 * socratic-ai.js - Socratic AI Physics Tutor using Google AI Studio (Gemini API)
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 * Implements Posner's Conceptual Change & Socratic Scaffolding (edtech-socratic-ai)
 */

const STORAGE_KEY = 'gemini_api_key';
const ACTIVE_MODEL = 'gemini-2.5-flash';

const SOCRATIC_SYSTEM_INSTRUCTION = `
คุณคือ "โค้ชฟิสิกส์ AI (Socratic Physics Coach)" ประจำเกม Roller Coaster Energy Tycoon 
สำหรับนักเรียนระดับมัธยมศึกษาตอนต้น (ม.1 - ม.3 / อายุ 12-15 ปี)

เป้าหมายของคุณ:
1. ช่วยเหลือและชวนนักเรียนคิดตามแนวคิด "การจัดการเรียนรู้แบบโสเครตีส (Socratic Method)" และ "ทฤษฎีการเปลี่ยนมโนทัศน์ (Conceptual Change)"
2. **กฎเหล็กข้อที่ 1:** ห้ามบอกคำตอบหรือตัวเลขที่ต้องตั้งตรงๆ เด็ดขาด! (NEVER give direct answers)
3. **การวินิจฉัย (Diagnosis):** เมื่อนักเรียนเกิดปัญหา เช่น "รถร่วงตกจากยอดลูป" หรือ "รถไหลถอยหลัง" ให้วิเคราะห์ว่าเขากำลังเข้าใจฟิสิกส์คลาดเคลื่อนเรื่องใด (เช่น คิดว่าความสูงปล่อยเท่ากับความสูงลูปก็พอแล้ว โดยลืมว่าที่ยอดลูปต้องมีความเร็ว v >= √(gR) เพื่อต้านแรงโน้มถ่วง)
4. **การชวนคิด (Socratic Question):** ตั้งคำถามกระตุ้น 1-2 ข้อสั้นๆ ให้ฉุกคิด และแนะนำให้สังเกตตัวแปร เช่น ความสูงปล่อย (Ep), ความเร็วที่ยอดลูป (Ek), หรือรัศมีความโค้ง (R)
5. **น้ำเสียง:** เป็นกันเอง สุภาพ สนุกสนาน ให้กำลังใจ และใช้ภาษาไทยที่เข้าใจง่ายสำหรับเด็ก ม.ต้น
6. ตอบให้กระชับ ไม่เกิน 3-4 ประโยคต่อครั้ง
`;

class SocraticAITutor {
  constructor() {
    this.apiKey = localStorage.getItem(STORAGE_KEY) || '';
  }

  getApiKey() {
    return this.apiKey;
  }

  setApiKey(key) {
    this.apiKey = (key || '').trim();
    if (this.apiKey) {
      localStorage.setItem(STORAGE_KEY, this.apiKey);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    return !!this.apiKey;
  }

  hasApiKey() {
    return !!this.apiKey;
  }

  /**
   * Request Socratic Guidance from Gemini API with fallback to static hints
   */
  async askCoach(context) {
    // If no API Key is configured, return curated offline Socratic hint immediately
    if (!this.apiKey) {
      return {
        source: 'offline',
        message: context.fallbackHint || '💡 คำใบ้ฟิสิกส์: ลองสังเกตความสูงเริ่มต้นเทียบกับความสูงของยอดเนินถัดไป พลังงานศักย์สามารถเปลี่ยนเป็นพลังงานจลน์ได้อย่างไรบ้างนะ?'
      };
    }

    const promptText = `
[ข้อมูลสถานะฟิสิกส์ในเกมขณะนี้]
- ด่านปัจจุบัน: ด่านที่ ${context.levelNumber} - "${context.levelTitle}"
- วัตถุประสงค์ของด่าน: ${context.levelGoal}
- สถานการณ์ที่เกิดขึ้น: ${context.issueDescription}
- ความสูงจุดปล่อยรถ (h_start): ${context.initialHeight} เมตร
- ความสูง ณ จุดเกิดเหตุ (h): ${context.currentHeight} เมตร
- ความเร็วของรถ (v): ${context.speedKmh} km/h (${context.speedMs} m/s)
- แรง G (G-force): ${context.gForce} g
- แรงโน้มถ่วง (g): ${context.gravity} m/s²
- พลังงานศักย์ (Ep): ${context.epKj} kJ
- พลังงานจลน์ (Ek): ${context.ekKj} kJ

ช่วยตั้งคำถามแบบโสเครตีส (Socratic inquiry) เพื่อให้นักเรียนเข้าใจสาเหตุและหาทางปรับปรุงรางด้วยตนเอง:
`;

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${ACTIVE_MODEL}:generateContent?key=${this.apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: promptText }]
          }],
          systemInstruction: {
            parts: [{ text: SOCRATIC_SYSTEM_INSTRUCTION }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 250
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiReply) {
        throw new Error('Empty response from Gemini API');
      }

      return {
        source: 'gemini',
        message: aiReply.trim()
      };
    } catch (err) {
      console.warn('Gemini API call failed, falling back to offline hint:', err);
      return {
        source: 'fallback',
        message: `(เชื่อมต่อ Gemini ไม่สำเร็จ: ${err.message})\n\n${context.fallbackHint || '💡 คำใบ้ฟิสิกส์: ลองสังเกตกฎการอนุรักษ์พลังงานกล Ep = Ek ดูสิครับ!'}`
      };
    }
  }
}

const socraticCoach = new SocraticAITutor();


// 2. Procedural Web Audio Engine
/**
 * audio.js - Procedural Web Audio API Sound Synthesizer for Roller Coaster
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 * 
 * Synthesizes:
 * 1. Ratchet Lift Hill Chain (คลิก-แก็ก-แก็ก)
 * 2. Aerodynamic Wind Noise (เสียงลมปะทะแปรผันตามความเร็ว)
 * 3. Metal Rail Rumble & Brake Squeal (เสียงเหล็กสั่นสะเทือนและเบรก)
 * 4. Passenger Thrill Scream & Cheer (เสียงหวีดร้องและเฮเมื่อพุ่งลงเนิน)
 * 5. Failure / Derail Impact Clatter (เสียงตกราง)
 */

class CoasterAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.windNode = null;
    this.windGain = null;
    this.windFilter = null;
    this.rumbleNode = null;
    this.rumbleGain = null;
    this.liftTimer = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.setupContinuousWind();
    this.setupContinuousRumble();
    this.isInitialized = true;
  }

  ensureContext() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.windGain) this.windGain.gain.setValueAtTime(0, this.ctx.currentTime);
      if (this.rumbleGain) this.rumbleGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  setupContinuousWind() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    this.windFilter = this.ctx.createBiquadFilter();
    this.windFilter.type = 'bandpass';
    this.windFilter.frequency.setValueAtTime(250, this.ctx.currentTime);
    this.windFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    whiteNoise.connect(this.windFilter);
    this.windFilter.connect(this.windGain);
    this.windGain.connect(this.ctx.destination);
    whiteNoise.start(0);
  }

  setupContinuousRumble() {
    if (!this.ctx) return;
    // Low frequency rumble for wheels on steel tubular rails
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(45, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(90, this.ctx.currentTime);

    this.rumbleGain = this.ctx.createGain();
    this.rumbleGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    osc.connect(filter);
    filter.connect(this.rumbleGain);
    this.rumbleGain.connect(this.ctx.destination);
    osc.start(0);
  }

  /**
   * Modulates sound continuous loops in real-time based on coaster speed (km/h)
   */
  updateDynamicAudio(speedKmh, gForce, isRunning) {
    if (!this.ctx || this.isMuted || !isRunning) {
      if (this.windGain) this.windGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      if (this.rumbleGain) this.rumbleGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      return;
    }

    const normSpeed = Math.min(1.0, Math.max(0, speedKmh / 120)); // 0 to 1

    // Wind noise pitch & volume
    if (this.windFilter && this.windGain) {
      const freq = 200 + normSpeed * 1200; // 200Hz to 1400Hz
      const vol = normSpeed * 0.28;
      this.windFilter.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.05);
      this.windGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.05);
    }

    // Rail rumble
    if (this.rumbleGain) {
      const rumbleVol = normSpeed * 0.15;
      this.rumbleGain.gain.setTargetAtTime(rumbleVol, this.ctx.currentTime, 0.05);
    }
  }

  /**
   * Ratchet lift click
   */
  playLiftClick() {
    if (!this.ctx || this.isMuted) return;
    this.ensureContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(980, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  /**
   * Passenger thrill cheer / scream
   */
  playScream() {
    if (!this.ctx || this.isMuted) return;
    this.ensureContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    // Frequency sweep imitating playful scream
    osc.frequency.setValueAtTime(650, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.15);
    osc.frequency.linearRampToValueAtTime(520, this.ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  /**
   * Metal brake screech when pulling into station
   */
  playBrakeSound() {
    if (!this.ctx || this.isMuted) return;
    this.ensureContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.36);
  }

  /**
   * Crash / derailment sound
   */
  playCrashSound() {
    if (!this.ctx || this.isMuted) return;
    this.ensureContext();

    // Noise burst + low thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.45);
  }

  /**
   * UI Click / Snap node feedback
   */
  playNodeSnap() {
    if (!this.ctx || this.isMuted) return;
    this.ensureContext();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }
}

const soundManager = new CoasterAudio();


// 3. Campaign Levels
/**
 * levels.js - 10 Progressive STEM Campaign Levels for Roller Coaster Energy Tycoon
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 */

const CAMPAIGN_LEVELS = [
  {
    id: 1,
    titleTh: "ดิ่งพสุธาเนินแรก (The First Drop)",
    titleEn: "The First Drop",
    gradeBadge: "ม.1 (ว2.3 งานและพลังงาน)",
    descriptionTh: "เรียนรู้การเปลี่ยนรูปพลังงานศักย์โน้มถ่วง (Ep) เป็นพลังงานจลน์ (Ek) ปรับความสูงเนินปล่อยรถให้สูงพอที่จะส่งรถไฟเหาะพุ่งข้ามเนินที่สองไปถึงเส้นชัย!",
    descriptionEn: "Learn gravitational potential to kinetic energy conversion. Adjust the initial drop hill high enough to carry the train over the second hill!",
    targetGoalTh: "ทำความเร็วสูงสุดอย่างน้อย 60 km/h และวิ่งข้ามเนินที่สองถึงเส้นชัยโดยไม่ไหลถอยหลัง",
    targetGoalEn: "Reach at least 60 km/h and cross the second hill to the finish without rolling back.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: พลังงานกลรวมไม่สูญหาย (Ep = Ek)! ถ้าเนินที่สองสูงกว่าเนินแรก รถจะยังมีพลังงานพอที่จะปีนขึ้นไปถึงหรือไม่?",
    socraticHintEn: "Physics Hint: Mechanical energy is conserved! Can the coaster climb a hill that is taller than its starting height?",
    gravity: 9.8,
    frictionMode: false,
    budget: 8000,
    controlPoints: [
      { x: 40, y: 180 },  // Station drop
      { x: 180, y: 460 }, // Valley bottom
      { x: 380, y: 260 }, // Hill 2 to overcome
      { x: 560, y: 460 }, // Valley 2
      { x: 740, y: 380 }, // Finish
      { x: 920, y: 380 }
    ],
    validate(physics, ratings) {
      if (physics.isFinished && ratings.maxSpeedKmh >= 60 && !physics.isRollback) {
        return { success: true, message: "🎉 ยอดเยี่ยม! รถไฟเหาะเปลี่ยนรูปพลังงานศักย์เป็นพลังงานจลน์พุ่งข้ามเนินสำเร็จ!" };
      }
      if (physics.isRollback) {
        return { success: false, message: "❌ รถไหลถอยหลัง! เนินปล่อยรถยังสูงไม่พอ หรือเนินที่สองสูงเกินไป ลองดึงจุดแรกให้สูงขึ้น" };
      }
      if (ratings.maxSpeedKmh < 60) {
        return { success: false, message: "❌ ความเร็วยังไม่ถึง 60 km/h ลองเพิ่มความสูงเนินแรกเพื่อสะสม Ep มากขึ้น" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 2,
    titleTh: "หุบเขาแรง G (The Valley of G-Force)",
    titleEn: "The Valley of G-Force",
    gradeBadge: "ม.2 (ว2.2 แรงสู่ศูนย์กลาง)",
    descriptionTh: "เมื่อรถพุ่งลงมาจากเนินสูง ก้นหุบเขาจะเกิดแรงสู่ศูนย์กลางมหาศาลกดผู้โดยสารลงกับเบาะ ออกแบบความโค้งของหุบเขาไม่ให้แคบเกินไป เพื่อคุมแรง G ไม่ให้เกิน 3.5g!",
    descriptionEn: "At the bottom of a drop, centripetal acceleration presses riders into their seats. Adjust the valley curvature so G-force stays below 3.5g!",
    targetGoalTh: "ทำความเร็วที่ก้นหุบเขาอย่างน้อย 75 km/h โดยควบคุมแรง G สูงสุดไม่เกิน 3.5g",
    targetGoalEn: "Reach at least 75 km/h at the valley bottom while keeping peak G-force under 3.5g.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: แรง G = 1 + v²/(g·R) หากต้องการลดแรง G แต่ยังรักษาความเร็ว v ไว้ เราควรขยายรัศมีความโค้ง R ของหุบเขาให้กว้างขึ้นหรือแคบลง?",
    socraticHintEn: "Physics Hint: G = 1 + v²/(g·R). To reduce G while keeping speed high, should the curve radius R be wider or sharper?",
    gravity: 9.8,
    frictionMode: false,
    budget: 9000,
    controlPoints: [
      { x: 40, y: 120 },
      { x: 260, y: 480 }, // Sharp valley
      { x: 500, y: 300 },
      { x: 750, y: 400 },
      { x: 920, y: 400 }
    ],
    validate(physics, ratings) {
      if (physics.isFinished) {
        if (ratings.maxG > 3.5) {
          return { success: false, message: `❌ แรง G สูงถึง ${ratings.maxG}g (เกิน 3.5g)! ผู้โดยสารเวียนหัว ลองปรับก้นหุบเขาให้โค้งกว้างขึ้น` };
        }
        if (ratings.maxSpeedKmh < 75) {
          return { success: false, message: `❌ ความเร็วสูงสุดเพียง ${ratings.maxSpeedKmh} km/h (เป้าหมาย 75 km/h)` };
        }
        return { success: true, message: `🎉 สมบูรณ์แบบ! ความเร็ว ${ratings.maxSpeedKmh} km/h และแรง G เพียง ${ratings.maxG}g นุ่มนวลปลอดภัย!` };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 3,
    titleTh: "ลูปวงกลมมรณะ (The Classic Loop)",
    titleEn: "The Classic Loop",
    gradeBadge: "ม.2 (ว2.2 และ ว2.3 การเคลื่อนที่แบบวงกลม)",
    descriptionTh: "ท้าทายกฎฟิสิกส์คลาสสิก! เพื่อให้รถวิ่งตีลังกาครบรอบโดยไม่ร่วงหล่นที่จุดยอดลูป ความเร็วที่ยอดต้องไม่ต่ำกว่าความเร็ววิกฤต v_min = √(g·R) และความสูงเริ่มต้นต้อง h ≥ 2.5R!",
    descriptionEn: "Master the vertical loop! To prevent the train from falling off at the apex, speed must satisfy v ≥ √(g·R) (initial height h ≥ 2.5R).",
    targetGoalTh: "สร้างรถไฟเหาะตีลังกา 1 Loop ผ่านฉลุยโดยรถไม่ร่วงหล่น (G-force ที่จุดยอด ≥ 0.0g)",
    targetGoalEn: "Clear a vertical loop without derailing (G-force at the apex ≥ 0.0g).",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: ที่จุดสูงสุดของลูป แรงโน้มถ่วงดึงลง ถ้าความเร็วเหวี่ยงหนีศูนย์ไม่พอ แรงปฏิกิริยา N จะกลายเป็นลบ และรถจะร่วงลงมา!",
    socraticHintEn: "Physics Hint: At the top of the loop, gravity pulls downward. If centripetal force is insufficient, normal force N < 0 and the cart falls!",
    gravity: 9.8,
    frictionMode: false,
    budget: 12000,
    controlPoints: [
      { x: 40, y: 100 },  // High drop
      { x: 220, y: 480 }, // Entry
      { x: 340, y: 240 }, // Loop apex
      { x: 460, y: 480 }, // Exit
      { x: 700, y: 420 },
      { x: 920, y: 420 }
    ],
    validate(physics, ratings) {
      if (physics.isDerailing) {
        return { success: false, message: "❌ รถร่วงตกรางที่ยอด Loop! ความเร็วเหวี่ยงหนีศูนย์ไม่พอ ลองเพิ่มความสูงจุดปล่อยหรือลดขนาด Loop ลง" };
      }
      if (physics.isFinished) {
        return { success: true, message: "🎉 ยอดเยี่ยมมาก! รถไฟเหาะผ่าน Loop ตีลังกาสำเร็จตามกฎ v ≥ √(g·R)!" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 4,
    titleTh: "ปริศนาลูปหยดน้ำ (Clothoid vs Circle)",
    titleEn: "Clothoid vs Circle Loop",
    gradeBadge: "ม.2 - ม.3 (วิศวกรรมโครงสร้างและการลดแรงกระแทก)",
    descriptionTh: "ในความเป็นจริง ลูปวงกลมจะสร้างแรงกระแทกบริเวณทางเข้าสูงถึง 6g วิศวกรจึงประดิษฐ์ 'ลูปรูปหยดน้ำ (Clothoid)' ที่ค่อยๆ แคบลง ปรับแต่งรูปทรงเพื่อคุมแรง G ไม่ให้เกิน 4.0g!",
    descriptionEn: "Circular loops produce brutal 6g shock spikes at entry. Real roller coasters use tear-drop Clothoid loops. Tune the curve to keep peak G under 4.0g!",
    targetGoalTh: "ผ่าน Loop ตีลังกาโดยแรง G สูงสุดตลอดเส้นทางไม่เกิน 4.0g",
    targetGoalEn: "Clear the inversion loop while keeping peak G-force below 4.0g throughout.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: ทางเข้าลูปควรมีรัศมีกว้าง แล้วค่อยๆ แคบลงที่จุดยอด เพื่อเกลี่ยแรงสู่ศูนย์กลางให้สม่ำเสมอ",
    socraticHintEn: "Physics Hint: The entrance should have a gentle wide radius, tapering tighter at the top to distribute centripetal acceleration evenly.",
    gravity: 9.8,
    frictionMode: false,
    budget: 13000,
    controlPoints: [
      { x: 40, y: 110 },
      { x: 200, y: 480 },
      { x: 320, y: 260 },
      { x: 440, y: 480 },
      { x: 700, y: 400 },
      { x: 920, y: 400 }
    ],
    validate(physics, ratings) {
      if (physics.isDerailing) {
        return { success: false, message: "❌ รถร่วงตกราง! ต้องรักษาความเร็วให้พอดีผ่านจุดยอด" };
      }
      if (physics.isFinished) {
        if (ratings.maxG > 4.0) {
          return { success: false, message: `❌ แรง G สูงถึง ${ratings.maxG}g (เกิน 4.0g)! ขยายทางเข้า-ออกลูปให้กว้างขึ้นเพื่อลดแรงกระแทก` };
        }
        return { success: true, message: `🎉 เยี่ยมยอด! ผ่านลูปได้ปลอดภัยด้วยแรง G เพียง ${ratings.maxG}g สไตล์ Clothoid Loop มืออาชีพ!` };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 5,
    titleTh: "ท้าทายแรงเสียดทาน (Friction Factor)",
    titleEn: "Friction Factor",
    gradeBadge: "ม.2 (ว2.3 งานและพลังงานกับการสูญเสีย)",
    descriptionTh: "เปิดใช้งานแรงต้านอากาศและแรงเสียดทานล้อจริง! พลังงานกลบางส่วนจะเปลี่ยนเป็นพลังงานความร้อน (W_loss) ต้องคำนวณชดเชยเพื่อให้รถไม่ติดหล่มก่อนถึงสถานี",
    descriptionEn: "Realistic friction and air drag enabled! Mechanical energy degrades into heat. Compensate for energy loss so the train reaches the station.",
    targetGoalTh: "เปิดโหมดแรงเสียดทานจริง และวิ่งข้ามเนินสุดท้ายเข้าเทียบชานชาลาสำเร็จ",
    targetGoalEn: "Enable realistic friction and clear the final hill to arrive safely at the station.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: E_total = Ep + Ek + W_loss เมื่อมีแรงเสียดทาน ความสูงเริ่มต้นต้องเผื่อไว้มากกว่าเดิมเท่าใด?",
    socraticHintEn: "Physics Hint: E_total = Ep + Ek + W_loss. When friction exists, how much higher must the start drop be?",
    gravity: 9.8,
    frictionMode: true,
    budget: 11000,
    controlPoints: [
      { x: 40, y: 100 },
      { x: 250, y: 470 },
      { x: 500, y: 290 },
      { x: 720, y: 440 },
      { x: 920, y: 400 }
    ],
    validate(physics, ratings) {
      if (physics.isRollback) {
        return { success: false, message: "❌ พลังงานสูญเสียไปกับแรงเสียดทานจนรถหมดแรงปีนเนิน! เพิ่มความสูงเนินปล่อยรถเพื่อสะสม Ep เผื่อไว้" };
      }
      if (physics.isFinished) {
        return { success: true, message: "🎉 ยอดเยี่ยม! คุณคำนวณชดเชยการสูญเสียพลังงานเนื่องจากแรงเสียดทานได้อย่างแม่นยำ!" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 6,
    titleTh: "ดับเบิ้ลลูปมหาประลัย (Double Loop Mayhem)",
    titleEn: "Double Loop Mayhem",
    gradeBadge: "ม.2 - ม.3 (พลังงานต่อเนื่องและการอนุรักษ์)",
    descriptionTh: "สร้างรถไฟเหาะตีลังกาสองลูปติดต่อกัน! ลูปที่สองต้องมีขนาดสัมพันธ์กับพลังงานที่เหลืออยู่อย่างไรจึงจะผ่านได้ทั้งคู่?",
    descriptionEn: "Design consecutive double inversion loops! How must the second loop size relate to the remaining energy to clear both safely?",
    targetGoalTh: "ผ่านลูปตีลังกาทั้ง 2 จุดสำเร็จโดยไม่ร่วง และไม่ติดหล่ม",
    targetGoalEn: "Clear both inversion loops successfully without derailing or stalling.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: หลังจากผ่านลูปแรก รถมีความเร็วลดลง ดังนั้นลูปที่สองควรจะเตี้ยกว่าหรือสูงกว่าลูปแรก?",
    socraticHintEn: "Physics Hint: After exiting the first loop, kinetic energy is lower. Should the second loop be lower or taller than the first?",
    gravity: 9.8,
    frictionMode: false,
    budget: 15000,
    controlPoints: [
      { x: 40, y: 80 },
      { x: 180, y: 470 },
      { x: 280, y: 220 }, // Loop 1
      { x: 380, y: 470 },
      { x: 490, y: 290 }, // Loop 2 (should be lower!)
      { x: 600, y: 470 },
      { x: 800, y: 420 },
      { x: 920, y: 420 }
    ],
    validate(physics, ratings) {
      if (physics.isDerailing) {
        return { success: false, message: "❌ รถร่วงตกราง! ตรวจสอบความสูงของลูปที่สองให้เหมาะสมกับพลังงานที่เหลืออยู่" };
      }
      if (physics.isRollback) {
        return { success: false, message: "❌ รถติดหล่มระหว่างลูป! พลังงานไม่พอข้ามลูปที่สอง" };
      }
      if (physics.isFinished) {
        return { success: true, message: "🎉 มหัศจรรย์! พิชิตดับเบิ้ลลูป 2 จังหวะอย่างสมบูรณ์แบบ!" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 7,
    titleTh: "เนินไร้น้ำหนัก (The Zero-G Camelback)",
    titleEn: "The Zero-G Camelback",
    gradeBadge: "ม.3 (สภาพไร้น้ำหนักและ Airtime)",
    descriptionTh: "ผู้โดยสารต้องการความตื่นเต้น! ออกแบบเนินลูกระนาด (Camelback Hill) ให้ผู้โดยสารได้สัมผัสสภาวะตัวลอยไร้น้ำหนัก (0g ≤ G ≤ 0.2g) อย่างน้อย 1.2 วินาที",
    descriptionEn: "Give passengers pure thrill! Shape a camelback hill so riders experience weightlessness (0g ≤ G ≤ 0.2g) for at least 1.2 seconds without violent negative Gs.",
    targetGoalTh: "ทำเวลาสภาวะไร้น้ำหนัก (Airtime) สะสมอย่างน้อย 1.2 วินาที และแรง G ต่ำสุดไม่ติดลบเกิน -1.0g",
    targetGoalEn: "Achieve at least 1.2 seconds of accumulated airtime with minimum G staying above -1.0g.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: เมื่อรถพุ่งขึ้นสู่ยอดเนินด้วยความเร็วสูง แรงสู่ศูนย์กลางที่เหวี่ยงขึ้นจะหักล้างกับแรงโน้มถ่วง ทำให้ตัวลอยขึ้นจากเบาะ!",
    socraticHintEn: "Physics Hint: Cresting a hill at high speed creates upward acceleration that counteracts gravity, producing zero-G airtime!",
    gravity: 9.8,
    frictionMode: false,
    budget: 12000,
    controlPoints: [
      { x: 40, y: 100 },
      { x: 220, y: 480 },
      { x: 420, y: 240 }, // Camelback peak
      { x: 620, y: 480 },
      { x: 800, y: 400 },
      { x: 920, y: 400 }
    ],
    validate(physics, ratings) {
      if (physics.isFinished) {
        if (parseFloat(ratings.airtimeSec) < 1.2) {
          return { success: false, message: `❌ เวลาไร้น้ำหนักได้เพียง ${ratings.airtimeSec} วินาที (เป้าหมาย 1.2 วินาที)! ลองปรับความโค้งยอดเนินให้พุ่งขึ้นเร็วขึ้น` };
        }
        if (parseFloat(ratings.minG) < -1.0) {
          return { success: false, message: `⚠️ แรง G ติดลบถึง ${ratings.minG}g (อันตรายเกินไป)! ผู้โดยสารอาจกระเด็นหลุด ปรับยอดเนินให้โค้งมนขึ้น` };
        }
        return { success: true, message: `🎉 สุดยอด! ผู้โดยสารได้ลอยตัวไร้น้ำหนักถึง ${ratings.airtimeSec} วินาที สนุกตื่นเต้นปลอดภัย!` };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 8,
    titleTh: "รางเบรกแม่เหล็กหยุดฉุกเฉิน (Magnetic Brakes)",
    titleEn: "Magnetic Brakes",
    gradeBadge: "ม.3 (ว2.3 แรงต้านและงานที่ทำให้หยุด)",
    descriptionTh: "รถไฟเหาะความเร็ว 90 km/h พุ่งเข้าใกล้สถานี! ต้องออกแบบรางเบรกให้ชะลอความเร็วลงเหลือต่ำกว่า 20 km/h อย่างนุ่มนวล โดยผู้โดยสารไม่กระแทกคอเคล็ด",
    descriptionEn: "Train approaching the station at 90 km/h! Design the braking section to decelerate under 20 km/h gently without severe neck jerk.",
    targetGoalTh: "ชะลอความเร็วก่อนเข้าเส้นชัยเหลือต่ำกว่า 20 km/h โดยไม่เกิดแรงดึงกระชากเกินขีดจำกัด",
    targetGoalEn: "Decelerate before the finish line to under 20 km/h smoothly.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: การลดความเร็วทำได้ด้วยการสร้างเนินต้านแรงโน้มถ่วง (เปลี่ยน Ek กลับเป็น Ep) ก่อนเข้าสู่รางระดับระนาบ",
    socraticHintEn: "Physics Hint: Deceleration can be assisted by gravity hills (converting Ek back into Ep) before entering flat station brakes.",
    gravity: 9.8,
    frictionMode: false,
    budget: 11000,
    controlPoints: [
      { x: 40, y: 80 },
      { x: 300, y: 480 },
      { x: 600, y: 320 }, // Brake incline
      { x: 800, y: 360 },
      { x: 920, y: 360 }
    ],
    validate(physics, ratings) {
      if (physics.isFinished) {
        return { success: true, message: "🎉 จอดเทียบชานชาลาได้อย่างนุ่มนวลและปลอดภัยตามมาตรฐานสากล!" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 9,
    titleTh: "รถไฟเหาะบนดาวอังคาร (Martian Coaster)",
    titleEn: "Planetary Coaster: Mars",
    gradeBadge: "ม.3 (ว3.1 ดาราศาสตร์และแรงโน้มถ่วงต่างดาว)",
    descriptionTh: "ยินดีต้อนรับสู่สวนสนุกบนดาวอังคาร! ด้วยแรงโน้มถ่วง g = 3.71 m/s² (เพียง 38% ของโลก) การเคลื่อนที่จะเป็นอย่างไร? ต้องปรับขนาดลูปและความสูงอย่างไร?",
    descriptionEn: "Welcome to Mars! With gravity g = 3.71 m/s² (38% of Earth), how do loops and drops behave under lower gravitational pull?",
    targetGoalTh: "พิชิตลูปตีลังกาบนดาวอังคาร (g = 3.71 m/s²) สำเร็จด้วยความเร็วสมดุล",
    targetGoalEn: "Clear a vertical loop under Martian gravity (g = 3.71 m/s²).",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: เมื่อ g ลดลง ความเร็ววิกฤต v_min = √(g·R) จะลดลงด้วย ทำให้สามารถสร้างลูปที่ใหญ่ขึ้นได้ด้วยความสูงปล่อยเท่าเดิม!",
    socraticHintEn: "Physics Hint: Lower g reduces critical speed v_min = √(g·R), allowing larger loops with the same drop height!",
    gravity: 3.71,
    frictionMode: false,
    budget: 14000,
    controlPoints: [
      { x: 40, y: 140 },
      { x: 220, y: 480 },
      { x: 380, y: 220 }, // Giant Martian Loop!
      { x: 540, y: 480 },
      { x: 740, y: 420 },
      { x: 920, y: 420 }
    ],
    validate(physics, ratings) {
      if (physics.isDerailing) {
        return { success: false, message: "❌ ตกรางบนดาวอังคาร! ตรวจสอบความเร็วเทียบกับแรงโน้มถ่วง 3.71 m/s²" };
      }
      if (physics.isFinished) {
        return { success: true, message: "🎉 สำเร็จ! คุณคือวิศวกรผู้สร้างรถไฟเหาะข้ามดวงดาวเครื่องแรกของมนุษยชาติ!" };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  },
  {
    id: 10,
    titleTh: "สวนสนุกในฝัน (The Ultimate Energy Tycoon)",
    titleEn: "The Ultimate Energy Tycoon",
    gradeBadge: "ม.1 - ม.3 (บูรณาการสะเต็มศึกษาและเศรษฐศาสตร์)",
    descriptionTh: "ภารกิจใหญ่ระดับผู้บริหารสวนสนุก! ออกแบบรถไฟเหาะในฝันที่ทำคะแนนความตื่นเต้น (Excitement) ไม่ต่ำกว่า 75 คะแนน ได้รับมาตรฐานความปลอดภัย EXCELLENT!",
    descriptionEn: "The ultimate Tycoon challenge! Design a dream coaster scoring at least 75 Excitement with EXCELLENT Safety rating.",
    targetGoalTh: "คะแนน Excitement ≥ 75, ความปลอดภัยระดับ EXCELLENT และวิ่งครบรอบอย่างราบรื่น",
    targetGoalEn: "Achieve Excitement ≥ 75, EXCELLENT Safety, and clear the complete circuit.",
    socraticHintTh: "💡 คำใบ้ฟิสิกส์: ผสมผสานทั้งการดิ่งลงเนินสูง (High Drop), แอร์ไทม์ (Airtime), และลูปที่นุ่มนวล โดยคุมแรง G ให้อยู่ในช่วง 2.0g - 3.8g",
    socraticHintEn: "Physics Hint: Combine tall drops, zero-G airtime hills, and smooth loops while pacing G-forces within 2.0g to 3.8g.",
    gravity: 9.8,
    frictionMode: false,
    budget: 20000,
    controlPoints: [
      { x: 40, y: 80 },
      { x: 180, y: 480 },
      { x: 290, y: 260 },
      { x: 400, y: 480 },
      { x: 550, y: 240 },
      { x: 700, y: 480 },
      { x: 820, y: 380 },
      { x: 920, y: 380 }
    ],
    validate(physics, ratings) {
      if (physics.isFinished) {
        if (ratings.safetyStatus !== 'EXCELLENT') {
          return { success: false, message: `❌ ความปลอดภัยยังไม่ผ่าน (${ratings.safetyStatus})! ${ratings.message}` };
        }
        if (ratings.excitement < 75) {
          return { success: false, message: `❌ คะแนนความตื่นเต้นได้ ${ratings.excitement} (เป้าหมาย 75 คะแนน)! เพิ่มความเร็วหรือช่วงแอร์ไทม์` };
        }
        return { success: true, message: `🏆 ยินดีด้วยอย่างยิ่ง! คุณผ่านการทดสอบเป็นสุดยอดวิศวกร Roller Coaster Energy Tycoon ตัวจริง!` };
      }
      return { success: false, message: "กดปล่อยรถเพื่อทดสอบ!" };
    }
  }
];


// 4. Physics Engine
/**
 * physics.js - Roller Coaster Energy Tycoon Physics Engine
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 * 
 * Implements:
 * 1. Catmull-Rom Track Spline Arc-Length Parameterization
 * 2. Conservation of Mechanical Energy (Ep = mgh, Ek = 1/2 m v^2)
 * 3. Rolling Friction & Aerodynamic Drag (W_loss)
 * 4. Normal Force & Real-time G-Force (N / mg)
 * 5. Critical Velocity & Inversion Fall-off Detection (v_min = sqrt(g*R))
 */

class CoasterPhysics {
  constructor(options = {}) {
    this.gravity = options.gravity ?? 9.8; // m/s^2 (Earth=9.8, Moon=1.62, Mars=3.71)
    this.cartMass = options.cartMass ?? 1200; // kg (3-car train with passengers)
    this.frictionCoeff = options.frictionCoeff ?? 0.00; // rolling resistance (0.00 in ideal mode)
    this.airDragCoeff = options.airDragCoeff ?? 0.00; // aerodynamic drag (0.00 in ideal mode)
    this.airDensity = 1.225; // kg/m^3
    this.frontalArea = 1.8; // m^2
    this.dragCoeffCd = 0.45; // sleek coaster car

    // Track arc-length sampled cache
    this.trackLength = 0;
    this.samples = []; // array of { s, x, y, h, angle, curvature, radius, curveSign }

    // Simulation dynamic state
    this.s = 0; // current position along track in meters
    this.v = 0; // velocity in m/s
    this.a = 0; // acceleration in m/s^2
    this.direction = 1; // +1 forward, -1 backward (rollback)
    this.isRunning = false;
    this.isDerailing = false;
    this.isRollback = false;
    this.isFinished = false;

    // Energy stats
    this.initialHeight = 0;
    this.initialEnergy = 0;
    this.currentEp = 0;
    this.currentEk = 0;
    this.accumulatedLoss = 0;
    this.gForce = 1.0;
    this.maxSpeed = 0;
    this.maxG = 1.0;
    this.minG = 1.0;
    this.airtimeSeconds = 0;
    this.inversionCount = 0;
  }

  setGravity(g) {
    this.gravity = Number(g) || 9.8;
  }

  setFrictionMode(isRealistic) {
    if (isRealistic) {
      this.frictionCoeff = 0.015;
      this.airDragCoeff = 0.5 * this.airDensity * this.frontalArea * this.dragCoeffCd;
    } else {
      this.frictionCoeff = 0.0;
      this.airDragCoeff = 0.0;
    }
  }

  /**
   * Builds an arc-length parameterized track from an array of 2D control points [{x, y}, ...].
   * Converts Canvas Y (downwards) to physical Height (meters from baseline).
   */
  buildTrack(controlPoints, baselineY = 600, scalePixelsPerMeter = 20) {
    if (!controlPoints || controlPoints.length < 2) {
      this.samples = [];
      this.trackLength = 0;
      return;
    }

    const n = controlPoints.length;
    const rawPoints = [];
    const stepT = 0.02; // fine interpolation step

    // Catmull-Rom spline sampling
    for (let i = 0; i < n - 1; i++) {
      const p0 = controlPoints[Math.max(0, i - 1)];
      const p1 = controlPoints[i];
      const p2 = controlPoints[i + 1];
      const p3 = controlPoints[Math.min(n - 1, i + 2)];

      for (let t = 0; t <= 1; t += stepT) {
        const t2 = t * t;
        const t3 = t2 * t;

        // Standard Catmull-Rom formula
        const x = 0.5 * (
          (2 * p1.x) +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
        );
        const y = 0.5 * (
          (2 * p1.y) +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
        );

        // First derivative (dx/dt, dy/dt)
        const dx = 0.5 * (
          (-p0.x + p2.x) +
          2 * (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t +
          3 * (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t2
        );
        const dy = 0.5 * (
          (-p0.y + p2.y) +
          2 * (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t +
          3 * (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t2
        );

        // Second derivative (d2x/dt2, d2y/dt2)
        const d2x = 0.5 * (
          2 * (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) +
          6 * (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t
        );
        const d2y = 0.5 * (
          2 * (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) +
          6 * (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t
        );

        // Curvature kappa = |x' y'' - y' x''| / (x'^2 + y'^2)^(3/2)
        const speedSq = dx * dx + dy * dy;
        const speed = Math.sqrt(speedSq) || 1e-6;
        const curvature = Math.abs(dx * d2y - dy * d2x) / Math.pow(speedSq, 1.5);
        // Signed curvature: positive if turning left/up (concave up), negative if concave down
        const signedCross = dx * d2y - dy * d2x;
        const curveSign = signedCross < 0 ? 1 : -1;

        // Angle in radians (in standard math coordinates: y is flipped)
        const angle = Math.atan2(-dy, dx);

        rawPoints.push({
          x,
          y,
          dx,
          dy,
          angle,
          curvature: curvature * scalePixelsPerMeter, // convert 1/px to 1/m
          curveSign
        });
      }
    }

    // Now build arc-length parameterization
    this.samples = [];
    let accumulatedDistance = 0;
    this.samples.push({
      s: 0,
      x: rawPoints[0].x,
      y: rawPoints[0].y,
      h: (baselineY - rawPoints[0].y) / scalePixelsPerMeter,
      angle: rawPoints[0].angle,
      curvature: rawPoints[0].curvature,
      radius: rawPoints[0].curvature > 1e-5 ? 1 / rawPoints[0].curvature : 9999,
      curveSign: rawPoints[0].curveSign
    });

    for (let i = 1; i < rawPoints.length; i++) {
      const pPrev = rawPoints[i - 1];
      const pCurr = rawPoints[i];
      const distPx = Math.hypot(pCurr.x - pPrev.x, pCurr.y - pPrev.y);
      const distM = distPx / scalePixelsPerMeter;
      accumulatedDistance += distM;

      const heightM = (baselineY - pCurr.y) / scalePixelsPerMeter;
      const radiusM = pCurr.curvature > 1e-4 ? Math.max(1.5, 1 / pCurr.curvature) : 9999;

      this.samples.push({
        s: accumulatedDistance,
        x: pCurr.x,
        y: pCurr.y,
        h: Math.max(0, heightM),
        angle: pCurr.angle,
        curvature: pCurr.curvature,
        radius: radiusM,
        curveSign: pCurr.curveSign
      });
    }

    this.trackLength = accumulatedDistance;
    this.resetSimulation();
  }

  /**
   * Resets coaster to starting position on track.
   */
  resetSimulation() {
    this.s = 0;
    this.v = 0.5; // slight starting push out of station (0.5 m/s)
    this.a = 0;
    this.direction = 1;
    this.isRunning = false;
    this.isDerailing = false;
    this.isRollback = false;
    this.isFinished = false;
    this.accumulatedLoss = 0;
    this.maxSpeed = 0;
    this.maxG = 1.0;
    this.minG = 1.0;
    this.airtimeSeconds = 0;
    this.inversionCount = 0;

    if (this.samples.length > 0) {
      this.initialHeight = this.samples[0].h;
      this.initialEnergy = this.cartMass * this.gravity * this.initialHeight;
      this.updateStateAtDistance(0);
    }
  }

  /**
   * Interpolate sample at arc length s meters.
   */
  getSampleAtDistance(distance) {
    if (this.samples.length === 0) return null;
    const clampedS = Math.max(0, Math.min(distance, this.trackLength));

    // Binary search for efficiency
    let low = 0;
    let high = this.samples.length - 1;

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (this.samples[mid].s < clampedS) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const idx = Math.max(0, Math.min(low, this.samples.length - 1));
    if (idx === 0) return this.samples[0];

    const s0 = this.samples[idx - 1];
    const s1 = this.samples[idx];
    const segmentLen = s1.s - s0.s;
    const alpha = segmentLen > 1e-6 ? (clampedS - s0.s) / segmentLen : 0;

    return {
      s: clampedS,
      x: s0.x + (s1.x - s0.x) * alpha,
      y: s0.y + (s1.y - s0.y) * alpha,
      h: s0.h + (s1.h - s0.h) * alpha,
      angle: s0.angle + (s1.angle - s0.angle) * alpha,
      curvature: s0.curvature + (s1.curvature - s0.curvature) * alpha,
      radius: s0.radius + (s1.radius - s0.radius) * alpha,
      curveSign: alpha > 0.5 ? s1.curveSign : s0.curveSign
    };
  }

  updateStateAtDistance(sDist) {
    const sample = this.getSampleAtDistance(sDist);
    if (!sample) return;

    // Potential energy Ep = m * g * h
    this.currentEp = this.cartMass * this.gravity * sample.h;

    // Kinetic energy Ek = 1/2 * m * v^2
    this.currentEk = 0.5 * this.cartMass * (this.v * this.v);

    // Centripetal acceleration a_c = v^2 / R
    const a_c = (this.v * this.v) / (sample.radius || 9999);

    // G-Force calculation:
    // Normal force per unit mass:
    // When upright on flat: G = 1.0
    // In a valley (curveSign > 0): G = cos(theta) + a_c / g
    // At hill crest (curveSign < 0): G = cos(theta) - a_c / g
    // In vertical loop: angle passes +- PI
    const cosAngle = Math.cos(sample.angle);
    const gCentripetal = (a_c / this.gravity) * sample.curveSign;
    this.gForce = cosAngle + gCentripetal;

    // Check stats
    const speedKmh = Math.abs(this.v) * 3.6;
    if (speedKmh > this.maxSpeed) this.maxSpeed = speedKmh;
    if (this.gForce > this.maxG) this.maxG = this.gForce;
    if (this.gForce < this.minG) this.minG = this.gForce;

    // Airtime (weightlessness) count
    if (this.gForce < 0.2 && this.isRunning) {
      this.airtimeSeconds += 0.016; // approx 1 frame
    }
  }

  /**
   * Main Physics Tick (dt in seconds)
   */
  update(dt) {
    if (!this.isRunning || this.isDerailing || this.isFinished || this.samples.length < 2) {
      return;
    }

    // Clamp dt to avoid physics explosion
    const clampedDt = Math.min(dt, 0.04);
    const sample = this.getSampleAtDistance(this.s);
    if (!sample) return;

    // 1. Gravity acceleration along track tangent: a_tangent = -g * sin(theta)
    // When moving forward and track slopes downward (sin(theta) < 0), cart accelerates forward (+a)
    const sinAngle = Math.sin(sample.angle);
    let a_gravity = -this.gravity * sinAngle;

    // 2. Friction & Air Drag losses
    let frictionForce = 0;
    if (this.frictionCoeff > 0 || this.airDragCoeff > 0) {
      const normalForce = Math.abs(this.cartMass * this.gravity * Math.cos(sample.angle));
      const rollingResistance = this.frictionCoeff * normalForce;
      const aerodynamicDrag = this.airDragCoeff * (this.v * this.v);
      frictionForce = rollingResistance + aerodynamicDrag;
      this.accumulatedLoss += (frictionForce * Math.abs(this.v) * clampedDt);
    }

    const a_friction = (frictionForce / this.cartMass) * Math.sign(this.v);

    // Net acceleration
    this.a = a_gravity - a_friction;

    // Integrate velocity and position
    this.v += this.a * clampedDt;
    this.s += this.v * clampedDt;

    // Check for roll-back (insufficient energy to crest hill)
    if (this.v <= 0 && this.s > 5) {
      // Cart came to a halt on an uphill section
      this.isRollback = true;
      // In realistic coaster, anti-rollback ratchets catch it or it rolls backward
      this.v = 0;
      this.isRunning = false;
    }

    // Check for loop derailment (Centripetal force insufficient at upside-down point)
    // If angle is inverted (abs(angle) > 2.2 rad or ~125 deg) and G-force < -0.1g (rider falls off track)
    if (Math.abs(sample.angle) > 2.2 && this.gForce < -0.2) {
      this.isDerailing = true;
      this.isRunning = false;
    }

    // Check for track completion
    if (this.s >= this.trackLength) {
      this.s = this.trackLength;
      this.v = 0;
      this.isRunning = false;
      this.isFinished = true;
    }

    this.updateStateAtDistance(this.s);
  }

  /**
   * Computes Tycoon Scores based on real roller coaster engineering metrics
   */
  getTycoonRatings() {
    // Excitement Score (0-100): Rewards high speed, airtime, and safe loops
    let excitement = 30;
    excitement += Math.min(35, (this.maxSpeed / 100) * 35); // up to 35 pts from speed
    excitement += Math.min(25, this.airtimeSeconds * 12); // up to 25 pts from airtime
    if (this.maxG >= 2.5 && this.maxG <= 4.0) excitement += 10; // optimal intense sweet spot

    // Intensity Score (0-100): High G-forces and rapid drops
    let intensity = (this.maxG / 5.0) * 60 + (this.maxSpeed / 120) * 40;

    // Nausea / Danger Score (0-100)
    let nausea = 10;
    if (this.maxG > 4.2) nausea += (this.maxG - 4.2) * 30;
    if (this.minG < -1.0) nausea += Math.abs(this.minG + 1.0) * 40;

    // Safety Verdict
    let safetyStatus = 'EXCELLENT';
    let safetyColor = 'emerald';
    let message = 'รถไฟเหาะวิ่งอย่างราบรื่นและปลอดภัยตามกฎการอนุรักษ์พลังงานกล!';

    if (this.isDerailing) {
      safetyStatus = 'DERAILED';
      safetyColor = 'rose';
      message = '⚠️ อันตราย! ความเร็วที่จุดยอด Loop ต่ำกว่าความเร็ววิกฤต (v < √(g·R)) รถร่วงหลุดจากราง!';
    } else if (this.isRollback) {
      safetyStatus = 'ROLLBACK';
      safetyColor = 'amber';
      message = '⚡ พลังงานจลน์ไม่เพียงพอข้ามยอดเนิน (Ek < Ep) รถไหลถอยหลังกลับ!';
    } else if (this.maxG > 4.5) {
      safetyStatus = 'DANGEROUS G-FORCE';
      safetyColor = 'rose';
      message = '⚠️ แรง G สูงเกิน 4.5g ผู้โดยสารเสี่ยงหมดสติ (Blackout Risk)! ควรกว้างรัศมีหุบเขาเพิ่มขึ้น';
    } else if (this.minG < -1.5) {
      safetyStatus = 'EXTREME NEGATIVE G';
      safetyColor = 'rose';
      message = '⚠️ แรง G ติดลบเกิน -1.5g ผู้โดยสารเสี่ยงเส้นเลือดในตาแตก (Redout Risk)!';
    }

    return {
      excitement: Math.min(100, Math.round(excitement)),
      intensity: Math.min(100, Math.round(intensity)),
      nausea: Math.min(100, Math.round(nausea)),
      safetyStatus,
      safetyColor,
      message,
      maxSpeedKmh: Math.round(this.maxSpeed),
      maxG: this.maxG.toFixed(2),
      minG: this.minG.toFixed(2),
      airtimeSec: this.airtimeSeconds.toFixed(1)
    };
  }
}


// 5. Track Renderer
/**
 * track-renderer.js - High-DPI 2D Canvas Renderer for Roller Coaster Energy Tycoon
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 */

class TrackRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;
    this.width = canvas.width;
    this.height = canvas.height;

    // Viewport transform (Pan & Zoom)
    this.scale = 1.0;
    this.offsetX = 40;
    this.offsetY = 0;
    this.baselineY = 520;
    this.pixelsPerMeter = 14;

    // Visual options
    this.showVectors = true;
    this.showEnergyOverlay = true;
    this.showGrid = true;
    this.selectedNodeIndex = -1;

    this.resize();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const parent = this.canvas.parentElement;
    const computedW = rect.width || (parent ? parent.clientWidth : 0) || window.innerWidth - 32 || 960;
    const computedH = rect.height || (parent ? parent.clientHeight : 0) || Math.round(computedW * (9 / 16)) || 540;

    this.width = Math.max(320, computedW);
    this.height = Math.max(300, computedH);
    this.dpr = window.devicePixelRatio || 1;

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);

    // Keep baseline near bottom of canvas
    this.baselineY = Math.max(260, this.height - 60);
    this.pixelsPerMeter = Math.max(8, (this.baselineY - 40) / 45);
  }

  /**
   * Main Render Loop
   */
  render(physics, controlPoints, isEditMode = true) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Sky & Scenic Background
    this.drawBackground();

    // 2. Draw Height Grid & Ground
    if (this.showGrid) {
      this.drawHeightGrid();
    }
    this.drawGround();

    // 3. Draw Track Supports (Pylons & Lattice Trusses)
    if (physics.samples && physics.samples.length > 1) {
      this.drawTrackSupports(physics.samples);
      // 4. Draw Modern Tubular Steel Rails & Ties
      this.drawRailsAndTies(physics.samples);
    }

    // 5. Draw Control Nodes (if in edit mode)
    if (isEditMode && controlPoints) {
      this.drawControlNodes(controlPoints);
    }

    // 6. Draw Coaster Train & Passengers
    if (physics.samples && physics.samples.length > 0) {
      this.drawCoasterTrain(physics);
    }

    // 7. Draw Canvas HUD Overlays (Energy Graph, Speedometer, G-meter)
    if (this.showEnergyOverlay) {
      this.drawEnergyGraph(physics);
    }
  }

  drawBackground() {
    const ctx = this.ctx;
    const skyGradient = ctx.createLinearGradient(0, 0, 0, this.baselineY);
    skyGradient.addColorStop(0, '#0f172a'); // slate-900
    skyGradient.addColorStop(0.5, '#1e293b'); // slate-800
    skyGradient.addColorStop(1, '#334155'); // slate-700

    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, this.width, this.baselineY);

    // Draw distant mountain silhouettes
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.beginPath();
    ctx.moveTo(0, this.baselineY);
    ctx.lineTo(0, this.baselineY - 140);
    ctx.lineTo(160, this.baselineY - 220);
    ctx.lineTo(340, this.baselineY - 150);
    ctx.lineTo(520, this.baselineY - 260);
    ctx.lineTo(750, this.baselineY - 170);
    ctx.lineTo(950, this.baselineY - 240);
    ctx.lineTo(this.width, this.baselineY - 130);
    ctx.lineTo(this.width, this.baselineY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawGround() {
    const ctx = this.ctx;
    // Ground gradient
    const groundGrad = ctx.createLinearGradient(0, this.baselineY, 0, this.height);
    groundGrad.addColorStop(0, '#15803d'); // green-700
    groundGrad.addColorStop(0.2, '#166534'); // green-800
    groundGrad.addColorStop(1, '#052e16'); // green-950

    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, this.baselineY, this.width, this.height - this.baselineY);

    // Ground top border highlight
    ctx.strokeStyle = '#4ade80'; // green-400
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, this.baselineY);
    ctx.lineTo(this.width, this.baselineY);
    ctx.stroke();
  }

  drawHeightGrid() {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.lineWidth = 1;

    // Draw horizontal height lines every 10 meters
    for (let h = 0; h <= 60; h += 10) {
      const y = this.baselineY - (h * this.pixelsPerMeter);
      if (y < 20) break;

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();

      // Label on the left
      ctx.fillText(`${h} m`, 8, y - 3);
    }
    ctx.restore();
  }

  /**
   * Draws structural lattice steel pylons anchoring the track to the ground
   */
  drawTrackSupports(samples) {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)'; // slate-400
    ctx.lineWidth = 3;

    // Place a support pillar every ~60 pixels horizontally
    const spacingPx = 65;
    const count = Math.floor(this.width / spacingPx);

    for (let i = 1; i < count; i++) {
      const targetX = i * spacingPx;
      // Find sample closest to targetX
      const sample = samples.find(s => Math.abs(s.x - targetX) < 12);
      if (sample && sample.y < this.baselineY - 15) {
        // Main vertical pole
        ctx.beginPath();
        ctx.moveTo(sample.x, sample.y + 12);
        ctx.lineTo(sample.x, this.baselineY);
        ctx.stroke();

        // Concrete footer at ground
        ctx.fillStyle = '#64748b';
        ctx.fillRect(sample.x - 7, this.baselineY - 4, 14, 6);

        // Diagonal truss cross-bracing if tall
        const pillarHeight = this.baselineY - sample.y;
        if (pillarHeight > 100) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
          ctx.lineWidth = 1.5;
          const numBays = Math.floor(pillarHeight / 50);
          for (let b = 0; b < numBays; b++) {
            const yTop = sample.y + 12 + (b * 50);
            const yBot = yTop + 50;
            ctx.beginPath();
            ctx.moveTo(sample.x - 12, yTop);
            ctx.lineTo(sample.x + 12, yBot);
            ctx.moveTo(sample.x + 12, yTop);
            ctx.lineTo(sample.x - 12, yBot);
            ctx.stroke();
          }
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
          ctx.lineWidth = 3;
        }
      }
    }
    ctx.restore();
  }

  /**
   * Draws realistic dual steel tubular coaster rails and cross ties
   */
  drawRailsAndTies(samples) {
    const ctx = this.ctx;
    const n = samples.length;
    if (n < 2) return;

    const railOffset = 6; // distance from center line to each rail

    // 1. Draw Central Backbone Spine Tube (thick dark steel)
    ctx.save();
    ctx.strokeStyle = '#1e293b'; // dark backbone
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(samples[0].x, samples[0].y + 6);
    for (let i = 1; i < n; i++) {
      ctx.lineTo(samples[i].x, samples[i].y + 6);
    }
    ctx.stroke();
    ctx.restore();

    // 2. Draw Cross-Ties (หมอนรองราง)
    ctx.save();
    ctx.strokeStyle = '#cbd5e1'; // light steel ties
    ctx.lineWidth = 2.5;
    // Step every few samples
    const tieStep = 4;
    for (let i = 0; i < n; i += tieStep) {
      const s = samples[i];
      // Normal vector
      const nx = -Math.sin(s.angle);
      const ny = -Math.cos(s.angle);

      ctx.beginPath();
      ctx.moveTo(s.x - nx * (railOffset + 2), s.y - ny * (railOffset + 2));
      ctx.lineTo(s.x + nx * (railOffset + 2), s.y + ny * (railOffset + 2));
      ctx.stroke();
    }
    ctx.restore();

    // 3. Draw Left/Upper Tubular Rail (Bright Cyan/Teal)
    ctx.save();
    ctx.strokeStyle = '#06b6d4'; // cyan-500
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const s = samples[i];
      const nx = -Math.sin(s.angle);
      const ny = -Math.cos(s.angle);
      const rx = s.x - nx * railOffset;
      const ry = s.y - ny * railOffset;
      if (i === 0) ctx.moveTo(rx, ry);
      else ctx.lineTo(rx, ry);
    }
    ctx.stroke();

    // 4. Draw Right/Lower Tubular Rail (Electric Purple/Rose accent)
    ctx.strokeStyle = '#f43f5e'; // rose-500
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const s = samples[i];
      const nx = -Math.sin(s.angle);
      const ny = -Math.cos(s.angle);
      const rx = s.x + nx * railOffset;
      const ry = s.y + ny * railOffset;
      if (i === 0) ctx.moveTo(rx, ry);
      else ctx.lineTo(rx, ry);
    }
    ctx.stroke();
    ctx.restore();
  }

  /**
   * Draws interactive control nodes for dragging/editing the track
   */
  drawControlNodes(points) {
    const ctx = this.ctx;
    ctx.save();

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const isSelected = (i === this.selectedNodeIndex);
      const heightM = Math.max(0, (this.baselineY - p.y) / this.pixelsPerMeter).toFixed(1);

      // Node shadow & base circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, isSelected ? 12 : 9, 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? '#ec4899' : '#38bdf8'; // pink or cyan
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Pulsing outer ring if selected
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.45)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Height Badge above node
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      drawRoundedRect(ctx, p.x - 22, p.y - 28, 44, 18, 4);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 9px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${heightM}m`, p.x, p.y - 16);
    }
    ctx.restore();
  }

  /**
   * Draws the 3-car coaster train, wheels, and passengers with reaction emojis
   */
  drawCoasterTrain(physics) {
    const ctx = this.ctx;
    const carSpacingM = 2.4; // distance between cars in meters
    const numCars = 3;

    // Passenger reaction emoji selection based on physics state
    let emoji = '😃';
    const speedKmh = Math.abs(physics.v) * 3.6;
    const g = physics.gForce;

    if (physics.isDerailing) {
      emoji = '💀';
    } else if (physics.isRollback) {
      emoji = '😱';
    } else if (g < 0.1) {
      emoji = '🤩'; // Airtime excitement
    } else if (g > 4.2) {
      emoji = '😵'; // Blackout danger
    } else if (speedKmh > 85) {
      emoji = '😲';
    } else if (speedKmh > 40) {
      emoji = '😄';
    }

    for (let c = numCars - 1; c >= 0; c--) {
      const carDist = physics.s - (c * carSpacingM * physics.direction);
      const sample = physics.getSampleAtDistance(carDist);
      if (!sample) continue;

      ctx.save();
      ctx.translate(sample.x, sample.y);
      // Rotate car along track tangent
      ctx.rotate(-sample.angle);

      // Invert car drawing if moving backward
      if (physics.direction < 0) {
        ctx.scale(-1, 1);
      }

      // Car Body Dimensions
      const carLength = 26;
      const carHeight = 14;

      // Draw Wheels (Top and Under-friction wheels)
      ctx.fillStyle = '#334155'; // wheel dark slate
      // Front & Rear top wheels
      ctx.beginPath();
      ctx.arc(-8, 3, 4, 0, Math.PI * 2);
      ctx.arc(8, 3, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Car Body
      const carGrad = ctx.createLinearGradient(-carLength / 2, -carHeight, carLength / 2, 0);
      if (c === 0) {
        // Lead Engine Car (Gold/Orange)
        carGrad.addColorStop(0, '#f59e0b');
        carGrad.addColorStop(1, '#ea580c');
      } else {
        // Trailing Passenger Cars (Cyan/Teal)
        carGrad.addColorStop(0, '#06b6d4');
        carGrad.addColorStop(1, '#0284c7');
      }

      ctx.fillStyle = carGrad;
      ctx.beginPath();
      drawRoundedRect(ctx, -carLength / 2, -carHeight, carLength, carHeight, [4, 8, 2, 2]);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Front bumper / headlight on lead car
      if (c === 0) {
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(carLength / 2 - 2, -carHeight / 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw 2 Passengers per car
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, -5, -carHeight - 4);
      ctx.fillText(emoji, 5, -carHeight - 4);

      // Draw Coupler to next car
      if (c < numCars - 1) {
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-carLength / 2, -4);
        ctx.lineTo(-carLength / 2 - 6, -4);
        ctx.stroke();
      }

      // Draw Vectors on the Lead Car
      if (c === 0 && this.showVectors && physics.isRunning) {
        this.drawPhysicsVectors(ctx, physics, sample);
      }

      ctx.restore();
    }
  }

  /**
   * Draws Velocity and Normal Force Vectors emanating from the lead coaster car
   */
  drawPhysicsVectors(ctx, physics, sample) {
    const vScale = 0.8;
    const vLen = physics.v * vScale;

    // 1. Velocity Vector (Cyan Arrow along car direction)
    ctx.save();
    ctx.strokeStyle = '#22d3ee'; // cyan-400
    ctx.fillStyle = '#22d3ee';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(vLen, -8);
    ctx.stroke();

    // Arrowhead
    if (Math.abs(vLen) > 4) {
      const dir = Math.sign(vLen);
      ctx.beginPath();
      ctx.moveTo(vLen, -8);
      ctx.lineTo(vLen - 5 * dir, -12);
      ctx.lineTo(vLen - 5 * dir, -4);
      ctx.closePath();
      ctx.fill();
    }

    // 2. Normal / Centripetal Vector (Gold Arrow pointing perpendicular to track)
    const gLen = -(physics.gForce * 12);
    ctx.strokeStyle = '#fbbf24'; // amber-400
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(0, -8 + gLen);
    ctx.stroke();

    if (Math.abs(gLen) > 4) {
      const gDir = Math.sign(gLen);
      ctx.beginPath();
      ctx.moveTo(0, -8 + gLen);
      ctx.lineTo(-4, -8 + gLen - 5 * gDir);
      ctx.lineTo(4, -8 + gLen - 5 * gDir);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  /**
   * Draws Live Stacked Energy Bar on Canvas HUD (Ep, Ek, Loss)
   */
  drawEnergyGraph(physics) {
    const ctx = this.ctx;
    const barX = 20;
    const barY = 20;
    const barW = 200;
    const barH = 14;

    const totalE = physics.initialEnergy || (physics.currentEp + physics.currentEk) || 1;
    const epFraction = Math.max(0, Math.min(1, physics.currentEp / totalE));
    const ekFraction = Math.max(0, Math.min(1, physics.currentEk / totalE));
    const lossFraction = Math.max(0, Math.min(1, physics.accumulatedLoss / totalE));

    ctx.save();
    // Glass HUD container background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.beginPath();
    drawRoundedRect(ctx, barX - 8, barY - 10, barW + 16, 68, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Title
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px "Plus Jakarta Sans", Prompt, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('⚡ พลังงานกลรวม (Total Energy Conservation)', barX, barY + 4);

    // Stacked Energy Bar
    const epW = barW * epFraction;
    const ekW = barW * ekFraction;
    const lossW = barW * lossFraction;

    // Bar background
    ctx.fillStyle = 'rgba(51, 65, 85, 0.6)';
    ctx.beginPath();
    drawRoundedRect(ctx, barX, barY + 12, barW, barH, 4);
    ctx.fill();

    // Ep Segment (Emerald Green)
    if (epW > 0) {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      drawRoundedRect(ctx, barX, barY + 12, epW, barH, [4, 0, 0, 4]);
      ctx.fill();
    }

    // Ek Segment (Bright Blue)
    if (ekW > 0) {
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      drawRoundedRect(ctx, barX + epW, barY + 12, Math.min(barW - epW, ekW), barH, 0);
      ctx.fill();
    }

    // Loss Segment (Orange/Red)
    if (lossW > 0 && barX + epW + ekW < barX + barW) {
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      drawRoundedRect(ctx, barX + epW + ekW, barY + 12, Math.min(barW - epW - ekW, lossW), barH, [0, 4, 4, 0]);
      ctx.fill();
    }

    // Legend
    ctx.font = '9px Prompt, sans-serif';
    // Ep legend
    ctx.fillStyle = '#34d399';
    ctx.fillRect(barX, barY + 34, 8, 8);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`Ep: ${(physics.currentEp / 1000).toFixed(1)} kJ`, barX + 12, barY + 41);

    // Ek legend
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(barX + 85, barY + 34, 8, 8);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`Ek: ${(physics.currentEk / 1000).toFixed(1)} kJ`, barX + 97, barY + 41);

    ctx.restore();
  }
}


// 6. Application Controller
/**
 * app.js - Main Application Controller for Roller Coaster Energy Tycoon
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 */


class CoasterApp {
  constructor() {
    this.canvas = document.getElementById('coasterCanvas');
    this.renderer = new TrackRenderer(this.canvas);
    this.physics = new CoasterPhysics();

    this.currentMode = 'campaign'; // 'campaign' or 'sandbox'
    this.currentLevelIdx = 0;
    this.lang = 'th'; // 'th' or 'en'

    // Editable track control points
    this.controlPoints = [];
    this.draggingNodeIdx = -1;
    this.lastTime = performance.now();
    this.animationFrameId = null;

    // Default Sandbox Template
    this.sandboxPoints = [
      { x: 50, y: 120 },
      { x: 220, y: 480 },
      { x: 380, y: 220 },
      { x: 520, y: 480 },
      { x: 720, y: 340 },
      { x: 920, y: 380 }
    ];

    this.init();
  }

  init() {
    this.renderer.resize();
    this.setupEventListeners();
    this.setupAIModal();
    this.loadLevel(0);
    this.startLoop();

    // Resize event
    window.addEventListener('resize', () => {
      this.renderer.resize();
      this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
    });

    // Handle initial orientation or container layout delay
    setTimeout(() => {
      this.renderer.resize();
      this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
      this.renderer.render(this.physics, this.controlPoints, true);
    }, 150);
  }

  loadLevel(levelIdx) {
    this.currentLevelIdx = levelIdx;
    const lvl = CAMPAIGN_LEVELS[levelIdx];
    if (!lvl) return;

    this.renderer.resize();
    const w = this.renderer.width;
    const base = this.renderer.baselineY;
    const scaleX = Math.max(0.35, w / 960);
    const scaleY = Math.max(0.35, base / 500);

    // Deep copy and adapt points to screen resolution
    this.controlPoints = lvl.controlPoints.map(p => ({
      x: Math.round(Math.max(25, Math.min(w - 25, p.x * scaleX))),
      y: Math.round(Math.max(30, Math.min(base - 10, p.y * scaleY)))
    }));
    this.physics.setGravity(lvl.gravity);
    this.physics.setFrictionMode(lvl.frictionMode);

    // Update UI elements
    const lvlSelect = document.getElementById('levelSelect');
    if (lvlSelect) lvlSelect.value = levelIdx;

    const gravitySelect = document.getElementById('gravitySelect');
    if (gravitySelect) gravitySelect.value = lvl.gravity.toString();

    const frictionCheckbox = document.getElementById('frictionToggle');
    if (frictionCheckbox) frictionCheckbox.checked = lvl.frictionMode;

    const lvlTitle = document.getElementById('levelTitle');
    if (lvlTitle) lvlTitle.textContent = this.lang === 'th' ? lvl.titleTh : lvl.titleEn;

    const lvlBadge = document.getElementById('levelBadge');
    if (lvlBadge) lvlBadge.textContent = lvl.gradeBadge;

    const lvlDesc = document.getElementById('levelDesc');
    if (lvlDesc) lvlDesc.textContent = this.lang === 'th' ? lvl.descriptionTh : lvl.descriptionEn;

    const lvlGoal = document.getElementById('levelGoal');
    if (lvlGoal) lvlGoal.textContent = this.lang === 'th' ? lvl.targetGoalTh : lvl.targetGoalEn;

    const feedbackBox = document.getElementById('feedbackBox');
    if (feedbackBox) {
      feedbackBox.classList.add('hidden');
      feedbackBox.textContent = '';
    }

    // Rebuild track & reset simulation
    this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
    this.updateHUD();
  }

  switchMode(mode) {
    this.currentMode = mode;
    const campaignPanel = document.getElementById('campaignPanel');
    const sandboxPanel = document.getElementById('sandboxPanel');
    const tabCampaign = document.getElementById('tabCampaign');
    const tabSandbox = document.getElementById('tabSandbox');

    if (mode === 'campaign') {
      if (campaignPanel) campaignPanel.classList.remove('hidden');
      if (sandboxPanel) sandboxPanel.classList.add('hidden');
      if (tabCampaign) {
        tabCampaign.classList.add('bg-brand-600', 'text-white');
        tabCampaign.classList.remove('text-slate-400');
      }
      if (tabSandbox) {
        tabSandbox.classList.remove('bg-brand-600', 'text-white');
        tabSandbox.classList.add('text-slate-400');
      }
      this.loadLevel(this.currentLevelIdx);
    } else {
      if (campaignPanel) campaignPanel.classList.add('hidden');
      if (sandboxPanel) sandboxPanel.classList.remove('hidden');
      if (tabSandbox) {
        tabSandbox.classList.add('bg-brand-600', 'text-white');
        tabSandbox.classList.remove('text-slate-400');
      }
      if (tabCampaign) {
        tabCampaign.classList.remove('bg-brand-600', 'text-white');
        tabCampaign.classList.add('text-slate-400');
      }
      this.controlPoints = JSON.parse(JSON.stringify(this.sandboxPoints));
      this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
    }
  }

  setupEventListeners() {
    // 1. Run / Pause / Reset Buttons
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        soundManager.ensureContext();
        if (this.physics.isFinished || this.physics.isDerailing || this.physics.isRollback) {
          this.physics.resetSimulation();
        }
        this.physics.isRunning = true;
        soundManager.playLiftClick();
      });
    }

    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        this.physics.isRunning = !this.physics.isRunning;
      });
    }

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.physics.resetSimulation();
        const feedbackBox = document.getElementById('feedbackBox');
        if (feedbackBox) feedbackBox.classList.add('hidden');
      });
    }

    // 2. Mode Switches
    const tabCampaign = document.getElementById('tabCampaign');
    const tabSandbox = document.getElementById('tabSandbox');
    if (tabCampaign) tabCampaign.addEventListener('click', () => this.switchMode('campaign'));
    if (tabSandbox) tabSandbox.addEventListener('click', () => this.switchMode('sandbox'));

    // 3. Level Select Dropdown
    const levelSelect = document.getElementById('levelSelect');
    if (levelSelect) {
      levelSelect.addEventListener('change', (e) => {
        this.loadLevel(parseInt(e.target.value, 10));
      });
    }

    // 4. Gravity & Friction Options
    const gravitySelect = document.getElementById('gravitySelect');
    if (gravitySelect) {
      gravitySelect.addEventListener('change', (e) => {
        this.physics.setGravity(parseFloat(e.target.value));
        this.physics.resetSimulation();
      });
    }

    const frictionToggle = document.getElementById('frictionToggle');
    if (frictionToggle) {
      frictionToggle.addEventListener('change', (e) => {
        this.physics.setFrictionMode(e.target.checked);
        this.physics.resetSimulation();
      });
    }

    // 5. Vectors & Audio Toggles
    const vectorToggle = document.getElementById('vectorToggle');
    if (vectorToggle) {
      vectorToggle.addEventListener('change', (e) => {
        this.renderer.showVectors = e.target.checked;
      });
    }

    const muteBtn = document.getElementById('muteBtn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = soundManager.toggleMute();
        muteBtn.textContent = isMuted ? '🔇 เสียง: ปิด' : '🔊 เสียง: เปิด';
      });
    }

    // 6. Socratic AI Coach Button (Ask AI Tutor)
    const askCoachBtn = document.getElementById('askCoachBtn');
    if (askCoachBtn) {
      askCoachBtn.addEventListener('click', () => this.triggerSocraticCoach());
    }

    // 7. Sandbox Track Controls (Add/Remove Node)
    const addNodeBtn = document.getElementById('addNodeBtn');
    if (addNodeBtn) {
      addNodeBtn.addEventListener('click', () => {
        const n = this.controlPoints.length;
        if (n >= 12) {
          alert('จำนวนจุดดัดรางสูงสุด 12 จุด');
          return;
        }
        const lastP = this.controlPoints[n - 1];
        const newX = Math.min(this.canvas.width - 40, lastP.x + 80);
        const newY = lastP.y;
        this.controlPoints.push({ x: newX, y: newY });
        this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
        soundManager.playNodeSnap();
      });
    }

    const removeNodeBtn = document.getElementById('removeNodeBtn');
    if (removeNodeBtn) {
      removeNodeBtn.addEventListener('click', () => {
        if (this.controlPoints.length <= 3) {
          alert('ต้องมีจุดดัดรางอย่างน้อย 3 จุด');
          return;
        }
        this.controlPoints.pop();
        this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
        soundManager.playNodeSnap();
      });
    }

    // 8. Preset Loops & Hills for Sandbox
    const presetLoopBtn = document.getElementById('presetLoopBtn');
    if (presetLoopBtn) {
      presetLoopBtn.addEventListener('click', () => {
        this.controlPoints = [
          { x: 50, y: 100 },
          { x: 220, y: 480 },
          { x: 340, y: 220 }, // loop apex
          { x: 460, y: 480 },
          { x: 700, y: 380 },
          { x: 920, y: 380 }
        ];
        this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
        soundManager.playNodeSnap();
      });
    }

    const presetDoubleHillBtn = document.getElementById('presetDoubleHillBtn');
    if (presetDoubleHillBtn) {
      presetDoubleHillBtn.addEventListener('click', () => {
        this.controlPoints = [
          { x: 50, y: 120 },
          { x: 220, y: 480 },
          { x: 400, y: 220 }, // Hill 1
          { x: 580, y: 480 },
          { x: 740, y: 280 }, // Hill 2
          { x: 920, y: 420 }
        ];
        this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
        soundManager.playNodeSnap();
      });
    }

    // 9. Interactive Drag & Drop on Canvas (Touch & Mouse)
    this.setupPointerDrag();
  }

  /**
   * Gemini API Key Management Modal Setup
   */
  setupAIModal() {
    const configKeyBtn = document.getElementById('configKeyBtn');
    const keyModal = document.getElementById('keyModal');
    const saveKeyBtn = document.getElementById('saveKeyBtn');
    const closeKeyBtn = document.getElementById('closeKeyBtn');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const keyStatus = document.getElementById('keyStatus');

    if (configKeyBtn && keyModal) {
      configKeyBtn.addEventListener('click', () => {
        if (apiKeyInput) apiKeyInput.value = socraticCoach.getApiKey();
        keyModal.classList.remove('hidden');
      });
    }

    if (closeKeyBtn && keyModal) {
      closeKeyBtn.addEventListener('click', () => keyModal.classList.add('hidden'));
    }

    if (saveKeyBtn && apiKeyInput && keyModal) {
      saveKeyBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        socraticCoach.setApiKey(key);
        if (keyStatus) {
          keyStatus.textContent = key ? '✅ บันทึก Gemini API Key เรียบร้อยแล้ว!' : 'ℹ️ ล้าง API Key แล้ว (ใช้คำใบ้ออฟไลน์)';
          keyStatus.className = 'text-xs text-emerald-400 mt-2';
        }
        setTimeout(() => {
          keyModal.classList.add('hidden');
        }, 1200);
      });
    }
  }

  /**
   * Triggers the Socratic AI Coach with live physical context
   */
  async triggerSocraticCoach() {
    const hintModal = document.getElementById('hintModal');
    const hintText = document.getElementById('hintText');
    const hintBadge = document.getElementById('hintSourceBadge');
    const closeHintBtn = document.getElementById('closeHintBtn');

    if (!hintModal || !hintText) return;

    hintModal.classList.remove('hidden');
    hintText.innerHTML = '<span class="inline-flex items-center gap-2"><svg class="animate-spin h-4 w-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg> โค้ช AI กำลังวิเคราะห์สถานะฟิสิกส์ของรถไฟเหาะ...</span>';
    if (hintBadge) hintBadge.textContent = 'วิเคราะห์...';

    if (closeHintBtn) {
      closeHintBtn.onclick = () => hintModal.classList.add('hidden');
    }

    const lvl = CAMPAIGN_LEVELS[this.currentLevelIdx] || {};
    const sample = this.physics.getSampleAtDistance(this.physics.s) || {};

    let issueDescription = 'รถไฟเหาะกำลังวิ่งหรือทดสอบอยู่ตามปกติ';
    if (this.physics.isDerailing) {
      issueDescription = 'รถร่วงหลุดตกจากรางที่ยอด Loop คว่ำหัว เพราะความเร็วเหวี่ยงหนีศูนย์ไม่เพียงพอต้านแรงโน้มถ่วง';
    } else if (this.physics.isRollback) {
      issueDescription = 'รถวิ่งขึ้นเนินไม่พ้นและหมดแรงจนไหลถอยหลัง (Rollback) เพราะ Ek ไม่พอเปลี่ยนเป็น Ep';
    } else if (this.physics.gForce > 4.2) {
      issueDescription = 'แรง G พุ่งสูงเกิน 4.2g ทำให้ผู้โดยสารเสี่ยงหมดสติ (Blackout)';
    }

    const context = {
      levelNumber: this.currentLevelIdx + 1,
      levelTitle: lvl.titleTh || 'โหมดสร้างอิสระ',
      levelGoal: lvl.targetGoalTh || 'ทดสอบออกแบบรางให้ปลอดภัย',
      issueDescription,
      initialHeight: this.physics.initialHeight.toFixed(1),
      currentHeight: (sample.h || 0).toFixed(1),
      speedKmh: Math.round(Math.abs(this.physics.v) * 3.6),
      speedMs: Math.abs(this.physics.v).toFixed(1),
      gForce: this.physics.gForce.toFixed(2),
      gravity: this.physics.gravity,
      epKj: (this.physics.currentEp / 1000).toFixed(1),
      ekKj: (this.physics.currentEk / 1000).toFixed(1),
      fallbackHint: lvl.socraticHintTh
    };

    const result = await socraticCoach.askCoach(context);
    hintText.textContent = result.message;

    if (hintBadge) {
      if (result.source === 'gemini') {
        hintBadge.textContent = '🤖 Gemini 2.5 Flash';
        hintBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30';
      } else {
        hintBadge.textContent = '💡 คำใบ้ฟิสิกส์มาตรฐาน (ออฟไลน์)';
        hintBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600';
      }
    }
  }

  /**
   * Pointer Drag Setup for Canvas Control Points
   */
  setupPointerDrag() {
    const canvas = this.canvas;

    const getCanvasPos = (evt) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
      const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const onPointerDown = (evt) => {
      const pos = getCanvasPos(evt);
      const hitRadius = 22;

      // Find if clicking any control node
      for (let i = 0; i < this.controlPoints.length; i++) {
        const p = this.controlPoints[i];
        if (Math.hypot(p.x - pos.x, p.y - pos.y) <= hitRadius) {
          this.draggingNodeIdx = i;
          this.renderer.selectedNodeIndex = i;
          soundManager.ensureContext();
          soundManager.playNodeSnap();
          if (evt.cancelable) evt.preventDefault();
          break;
        }
      }
    };

    const onPointerMove = (evt) => {
      if (this.draggingNodeIdx === -1) return;
      const pos = getCanvasPos(evt);

      // Clamp coordinates to safe canvas zone
      const clampedX = Math.max(30, Math.min(canvas.width / this.renderer.dpr - 30, pos.x));
      const clampedY = Math.max(40, Math.min(this.renderer.baselineY, pos.y));

      this.controlPoints[this.draggingNodeIdx].x = clampedX;
      this.controlPoints[this.draggingNodeIdx].y = clampedY;

      // Rebuild track dynamically
      this.physics.buildTrack(this.controlPoints, this.renderer.baselineY, this.renderer.pixelsPerMeter);
      if (evt.cancelable) evt.preventDefault();
    };

    const onPointerUp = () => {
      if (this.draggingNodeIdx !== -1) {
        this.draggingNodeIdx = -1;
        this.renderer.selectedNodeIndex = -1;
      }
    };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
  }

  startLoop() {
    const loop = (currentTime) => {
      try {
        let dt = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Clamp dt to 0.04s (25 fps floor) to avoid tunnelling
        dt = Math.min(dt, 0.04);

        // Update Physics
        this.physics.update(dt);

        // Update Procedural Sound
        const speedKmh = Math.abs(this.physics.v) * 3.6;
        soundManager.updateDynamicAudio(speedKmh, this.physics.gForce, this.physics.isRunning);

        // Render Canvas
        this.renderer.render(this.physics, this.controlPoints, true);

        // Update HUD
        this.updateHUD();

        // Check level validation when run ends
        if (this.currentMode === 'campaign' && (this.physics.isFinished || this.physics.isDerailing || this.physics.isRollback)) {
          this.checkCampaignObjective();
        }
      } catch (loopErr) {
        console.error('Coaster loop error:', loopErr);
      }

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  updateHUD() {
    const speedKmh = Math.round(Math.abs(this.physics.v) * 3.6);
    const sample = this.physics.getSampleAtDistance(this.physics.s);
    const heightM = sample ? sample.h.toFixed(1) : '0.0';
    const gVal = this.physics.gForce.toFixed(2);

    const speedEl = document.getElementById('hudSpeed');
    if (speedEl) speedEl.textContent = `${speedKmh} km/h`;

    const heightEl = document.getElementById('hudHeight');
    if (heightEl) heightEl.textContent = `${heightM} m`;

    const gForceEl = document.getElementById('hudGForce');
    if (gForceEl) {
      gForceEl.textContent = `${gVal} g`;
      if (this.physics.gForce > 4.2 || this.physics.gForce < -1.2) {
        gForceEl.className = 'text-base font-extrabold text-rose-500';
      } else if (this.physics.gForce < 0.2) {
        gForceEl.className = 'text-base font-extrabold text-cyan-400';
      } else {
        gForceEl.className = 'text-base font-extrabold text-emerald-400';
      }
    }

    const epEl = document.getElementById('hudEp');
    if (epEl) epEl.textContent = `${(this.physics.currentEp / 1000).toFixed(1)} kJ`;

    const ekEl = document.getElementById('hudEk');
    if (ekEl) ekEl.textContent = `${(this.physics.currentEk / 1000).toFixed(1)} kJ`;

    // Tycoon ratings
    const ratings = this.physics.getTycoonRatings();
    const excitementEl = document.getElementById('tycoonExcitement');
    if (excitementEl) excitementEl.textContent = `${ratings.excitement}/100`;

    const safetyEl = document.getElementById('tycoonSafety');
    if (safetyEl) {
      safetyEl.textContent = ratings.safetyStatus;
      safetyEl.className = `text-xs font-bold px-2 py-0.5 rounded text-white bg-${ratings.safetyColor}-600`;
    }

    // KaTeX Formula Synchronization
    this.updateKaTeXFormula(heightM, speedKmh, gVal);
  }

  updateKaTeXFormula(heightM, speedKmh, gVal) {
    const formulaContainer = document.getElementById('katexFormula');
    if (!formulaContainer || typeof katex === 'undefined') return;

    const vMs = (parseFloat(speedKmh) / 3.6).toFixed(1);
    const latex = `E_{\\text{tot}} = mgh + \\frac{1}{2}mv^2 \\implies v = ${vMs}\\text{ m/s},\\quad G = ${gVal}\\text{g}`;

    try {
      katex.render(latex, formulaContainer, {
        throwOnError: false,
        displayMode: false
      });
    } catch (e) {
      // Ignore KaTeX render errors during rapid updates
    }
  }

  checkCampaignObjective() {
    const lvl = CAMPAIGN_LEVELS[this.currentLevelIdx];
    if (!lvl) return;

    const ratings = this.physics.getTycoonRatings();
    const result = lvl.validate(this.physics, ratings);

    const feedbackBox = document.getElementById('feedbackBox');
    if (feedbackBox) {
      feedbackBox.classList.remove('hidden');
      if (result.success) {
        feedbackBox.className = 'p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/60 text-emerald-300 text-xs sm:text-sm font-semibold shadow-md';
        feedbackBox.innerHTML = `${result.message} <button id="nextLevelBtn" class="ml-2 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors">ด่านถัดไป ➔</button>`;
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            if (this.currentLevelIdx < CAMPAIGN_LEVELS.length - 1) {
              this.loadLevel(this.currentLevelIdx + 1);
            } else {
              alert('ยินดีด้วย! คุณพิชิตครบทั้ง 10 ด่านของ Roller Coaster Energy Tycoon แล้ว!');
            }
          });
        }
      } else {
        feedbackBox.className = 'p-3 rounded-xl bg-rose-950/70 border border-rose-500/60 text-rose-300 text-xs sm:text-sm font-semibold shadow-md';
        feedbackBox.textContent = result.message;
      }
    }
  }
}

// Instantiate on DOM load



// Auto-start on load (handles both early and late script execution)
function startCoasterApp() {
  if (!window.coasterApp) {
    try {
      window.coasterApp = new CoasterApp();
      console.log('Roller Coaster Energy Tycoon initialized successfully!');
    } catch (err) {
      console.error('CoasterApp init error:', err);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startCoasterApp);
} else {
  startCoasterApp();
}
