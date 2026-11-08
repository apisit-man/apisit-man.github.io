export default async function handler(req, res) {
  // CORS Configuration for GitHub Pages & local dev
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY environment variable on server.' });
  }

  const { context } = req.body || {};
  if (!context) {
    return res.status(400).json({ error: 'Missing physics context in request body.' });
  }

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

  const promptText = `
[ข้อมูลสถานะฟิสิกส์ในเกมขณะนี้]
- ด่านปัจจุบัน: ด่านที่ ${context.levelNumber || 1} - "${context.levelTitle || ''}"
- วัตถุประสงค์ของด่าน: ${context.levelGoal || ''}
- สถานการณ์ที่เกิดขึ้น: ${context.issueDescription || ''}
- ความสูงจุดปล่อยรถ (h_start): ${context.initialHeight ?? 0} เมตร
- ความสูง ณ จุดเกิดเหตุ (h): ${context.currentHeight ?? 0} เมตร
- ความเร็วของรถ (v): ${context.speedKmh ?? 0} km/h (${context.speedMs ?? 0} m/s)
- แรง G (G-force): ${context.gForce ?? 0} g
- แรงโน้มถ่วง (g): ${context.gravity ?? 9.8} m/s²
- พลังงานศักย์ (Ep): ${context.epKj ?? 0} kJ
- พลังงานจลน์ (Ek): ${context.ekKj ?? 0} kJ

ช่วยตั้งคำถามแบบโสเครตีส (Socratic inquiry) เพื่อให้นักเรียนเข้าใจสาเหตุและหาทางปรับปรุงรางด้วยตนเอง:
`;

  try {
    const ACTIVE_MODEL = 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${ACTIVE_MODEL}:generateContent?key=${apiKey}`;
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

    return res.status(200).json({
      success: true,
      source: 'serverless-gemini',
      message: aiReply.trim()
    });
  } catch (err) {
    console.error('Gemini Socratic Coach API error:', err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
