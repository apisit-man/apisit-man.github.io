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

export class SocraticAITutor {
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

export const socraticCoach = new SocraticAITutor();
