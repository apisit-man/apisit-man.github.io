# ตั้งค่าระบบ Backend (Google Apps Script)

ระบบหน้าเว็บมีการเชื่อมต่อกับ Backend 2 ส่วนแยกกัน เพื่อความปลอดภัยและการจัดการที่ง่ายขึ้น คุณจำเป็นต้องสร้างโปรเจกต์ Google Apps Script 2 โปรเจกต์แยกกันดังนี้

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
