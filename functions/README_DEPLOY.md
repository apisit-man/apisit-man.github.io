# วิธีการ Deploy Google Cloud Functions / Firebase Cloud Functions สำหรับ Live Quiz

ระบบนี้ใช้ **Google Cloud Functions (Serverless Backend)** ในการ:
1. **ซ่อนเฉลย (Anti-cheat)**: เฉลยคำตอบถูกต้องจะถูกเก็บไว้ที่ Cloud Functions หลังบ้าน ไม่ถูกส่งมาที่เครื่องผู้เล่น
2. **Server-Side Scoring**: คำนวณคะแนนและเช็กเวลาหมดเวลาจาก Server เพื่อความแม่นยำสูง
3. **อัตโนมัติจัด Top 3**: ประมวลผลและส่งผลคะแนน Top 3 กลับมายัง Realtime Database อย่างปลอดภัย

---

## ขั้นตอนการติดตั้งและ Deploy (ใช้เวลา 2-3 นาที)

### 1. ติดตั้ง Firebase CLI (หากยังไม่มี)
เปิด PowerShell หรือ Command Prompt:
```bash
npm install -g firebase-tools
```

### 2. ล็อกอินด้วยบัญชี Google ของท่าน
```bash
firebase login
```
*(เบราว์เซอร์จะเปิดขึ้นมาเพื่อให้ท่านกดยืนยันการล็อกอิน)*

### 3. เชื่อมต่อโปรเจกต์
เข้าไปที่โฟลเดอร์ของโปรเจกต์:
```powershell
cd "c:\Users\atong\Documents\antigravity\personal website"
firebase use --add
```
*(เลือกโปรเจกต์ Firebase ที่ท่านสร้างไว้)*

### 4. ติดตั้ง Dependency ของ Functions
```powershell
cd functions
npm install
cd ..
```

### 5. Deploy Cloud Functions ขึ้น Google Cloud
```powershell
firebase deploy --only functions,database
```

เมื่อ Deploy เสร็จสิ้น ฟังก์ชันทั้งหมด:
- `hostStartQuestion`
- `submitAnswerSecure`
- `hostReviewQuestion`
- `hostFinishGame`
จะพร้อมใช้งานบน Google Cloud และทำงานร่วมกับหน้า `quiz.html` และ `quiz-host.html` ได้ทันทีแบบ 100%
