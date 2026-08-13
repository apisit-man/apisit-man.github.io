# ตั้งค่าระบบ Backend (Google Apps Script)

ระบบหน้าเว็บมีการเชื่อมต่อกับ Backend หลายส่วนแยกกัน เพื่อความปลอดภัยและการจัดการที่ง่ายขึ้น

---

## 1. ระบบบันทึกค่าใช้จ่าย (Expense Admin)

1. สร้าง Google Sheet สำหรับข้อมูลค่าใช้จ่าย หรือเปิดชีตที่ต้องการใช้
2. เปิด **ส่วนขยาย → Apps Script**
3. นำเนื้อหาใน `expense-api.gs` ไปแทนโค้ดเดิม
4. เปิด **Project Settings → Script Properties** และเพิ่ม:
   - `ADMIN_PIN` — รหัสผ่านที่ต้องการใช้ ควรยาวและเดายาก
   - `SPREADSHEET_ID` — ID ของ Google Sheet ที่ใช้เก็บข้อมูล
5. เรียกฟังก์ชัน `setupExpenseSheets` หนึ่งครั้ง และอนุญาตสิทธิ์ Google Sheets/Drive
6. เลือก **Deploy → New deployment → Web app**
7. ตั้ง **Execute as: Me** และ **Who has access: Anyone**
8. คัดลอก **Web App URL** ที่ได้ ไปใส่ในตัวแปร `apiUrl` ภายในไฟล์ `assets/js/admin-config.js`

*หมายเหตุ: เมื่อมีการแก้ `expense-api.gs` ภายหลัง ให้สร้าง version ใหม่ใน deployment เดิม เพื่อให้ URL เดิมยังใช้งานต่อได้*

---

## 2. ระบบ AI Chatbot (Prompt Builder)

1. ไปที่ [script.google.com](https://script.google.com/) และคลิก **New Project**
2. ตั้งชื่อโปรเจกต์ (เช่น Prompt Builder API)
3. นำเนื้อหาใน `prompt-api.gs` ไปแทนโค้ดเดิม
4. เปิด **Project Settings → Script Properties** และเพิ่ม:
   - `GEMINI_API_KEY` — API Key ที่ได้จาก Google AI Studio
5. เลือก **Deploy → New deployment → Web app**
6. ตั้ง **Execute as: Me** และ **Who has access: Anyone**
7. คัดลอก **Web App URL** ที่ได้ ไปใส่ในตัวแปร `promptApiUrl` ภายในไฟล์ `assets/js/admin-config.js`

---

## 3. ระบบ Concept Check AI

1. สร้าง Google Sheet ใหม่ แล้วเปิด **ส่วนขยาย → Apps Script**
2. นำเนื้อหาใน `concept-check-api.gs` ไปแทนไฟล์สคริปต์เดิม
3. เพิ่มไฟล์ HTML ใน Apps Script ชื่อ `concept-check-bridge` แล้วนำเนื้อหาใน `concept-check-bridge.html` ไปใส่
4. เปิด **Project Settings → Script Properties** และเพิ่ม:
   - `OPENAI_API_KEY` — API key ของ OpenAI
   - `OPENAI_MODEL` — ไม่บังคับ; ค่าเริ่มต้นคือ `gpt-4.1-mini`
   - `ADMIN_AUTH_URL` — ไม่บังคับ; URL ของ Expense Admin backend ที่ใช้ตรวจ session เดียวกับหน้า Admin Center
5. เลือก **Deploy → New deployment → Web app**
6. ตั้ง **Execute as: Me** และ **Who has access: Anyone**
7. คัดลอก Web App URL ไปใส่ใน `DEFAULT_GAS_URL` ของ `applications/concept-check/app.js`

หน้า Concept Check ใช้ iframe bridge และ `postMessage` เพื่อหลีกเลี่ยงปัญหา CORS ของ GitHub Pages โดย bridge รับคำขอเฉพาะจาก `https://apisit-man.github.io` และ localhost สำหรับการทดสอบเท่านั้น

เมื่อแก้ backend หรือ bridge ภายหลัง ให้สร้าง version ใหม่ใน deployment เดิม เพื่อคง URL เดิมไว้

---

## 4. ระบบ Personalized English Tutor

1. ไปที่ [script.google.com](https://script.google.com/) และสร้างโปรเจกต์ใหม่ หรือเปิดโปรเจกต์ English Tutor เดิม
2. นำเนื้อหาใน `english-tutor-api.gs` ไปแทนโค้ดเดิม
3. เปิด **Project Settings → Script Properties** และเพิ่ม:
   - `OPENAI_API_KEY` — API key ของ OpenAI
   - `OPENAI_MODEL` — ไม่บังคับ; ค่าเริ่มต้นคือ `gpt-4o`
   - `ENGLISH_TUTOR_SS_ID` — ไม่บังคับ; หากไม่ระบุ ระบบจะสร้าง Google Sheet ชื่อ `English Tutor Data` ให้อัตโนมัติ
4. เลือก **Deploy → New deployment → Web app**
5. ตั้ง **Execute as: Me** และ **Who has access: Anyone**
6. เปิดหน้า English Tutor กดปุ่ม Settings แล้ววาง Web App URL
7. กรอกโปรไฟล์ส่วนตัวและเริ่มแบบประเมินระดับครั้งแรก

ระบบจะสร้างแท็บ `ChatHistory`, `TutorProfile`, `LearningMemory` และ `Vocabulary` เพื่อเก็บประวัติ เป้าหมายการเรียน ข้อสังเกตระยะยาว และรอบทบทวนคำศัพท์ หากใช้ deployment เดิม ให้สร้าง version ใหม่หลังเปลี่ยนโค้ด โดยไม่ต้องเปลี่ยน Web App URL

---

## การตั้งค่าไฟล์ `admin-config.js`

หลังจากที่คุณได้ URL ทั้ง 2 ตัวแล้ว ไฟล์ `assets/js/admin-config.js` ควรจะมีหน้าตาดังนี้:

```javascript
window.ADMIN_CONFIG = {
    apiUrl: 'YOUR_EXPENSE_API_URL',
    promptApiUrl: 'YOUR_PROMPT_API_URL'
};
```

---

### ข้อมูลเพิ่มเติมสำหรับระบบค่าใช้จ่าย
- ระบบจะยกเลิก session เมื่อไม่มีการใช้งาน 30 นาที หรือเมื่อครบ 6 ชั่วโมงนับจากการเข้าสู่ระบบ
- ข้อมูลจะถูกสร้างในสองแท็บ: `CarExpenses` และ `PersonalExpenses`
- ใบเสร็จจะถูกเก็บในโฟลเดอร์ `Expense Receipts` บน Google Drive (ไม่เป็นไฟล์สาธารณะ)
