# คู่มือ Deploy Self-Hosted Cobalt API ฟรี (สำหรับ YouTube, Facebook, Instagram)

คู่มือนี้ใช้สำหรับเปิด **Cobalt API ส่วนตัว** เพื่อให้หน้าเว็บ `https://apisit-man.github.io/applications/video-downloader/` สามารถดาวน์โหลดวิดีโอ **YouTube, Facebook และ Instagram** (รวมถึง TikTok) เป็นไฟล์ `.mp4` / `.mp3` ได้โดยตรงแบบไร้โฆษณา

---

## วิธีที่ 1: Deploy ฟรีบน Koyeb (⭐ แนะนำที่สุด — ใช้เวลา ~3 นาที)

Koyeb รองรับ Docker Image โดยตรงโดยไม่ต้องเขียนโค้ดหรือ Build เอง:

1. สมัครและเข้าสู่ระบบที่ [https://app.koyeb.com](https://app.koyeb.com)
2. กด **Create Service** → เลือก **Web Service** → เลือก **Docker**
3. ในช่อง **Image** ให้วาง:
   ```text
   ghcr.io/imputnet/cobalt:latest
   ```
4. เลือก Instance แบบ **Free** (ภูมิภาคแนะนำ: Singapore หรือ Frankfurt)
5. ในหัวข้อ **Environment Variables** ให้เพิ่มตัวแปรดังนี้:
   | Key | Value | คำอธิบาย |
   | :--- | :--- | :--- |
   | `API_URL` | `https://<ชื่อแอปของคุณ>.koyeb.app/` | URL สาธารณะของแอป (**ต้องมี `/` ปิดท้าย**) |
   | `API_PORT` | `9000` | พอร์ตที่ Cobalt รัน |
   | `CORS_URL` | `https://apisit-man.github.io` | อนุญาตให้เฉพาะเว็บพอร์ตโฟลิโอของคุณเรียกใช้งานได้ |
   | `DURATION_LIMIT` | `10800` | จำกัดความยาววิดีโอสูงสุด (3 ชั่วโมง) |
   | `RATELIMIT_MAX` | `20` | จำกัด 20 ครั้งต่อนาทีต่อผู้ใช้ |
   | `RATELIMIT_WINDOW` | `60` | ช่วงเวลา Rate Limit (วินาที) |
6. ในหัวข้อ **Exposed Ports** ตั้งพอร์ตเป็น `9000` (HTTP)
7. กด **Deploy** แล้วรอประมาณ 1–2 นาทีจนสถานะเป็น **Healthy**

> [!TIP]
> หลัง Deploy เสร็จ ให้คัดลอก URL ของ Koyeb (เช่น `https://my-cobalt-apisit.koyeb.app/`) ไปตรวจสอบโดยเปิดในเบราว์เซอร์ หากขึ้นข้อมูล JSON ที่มีคำว่า `"cobalt": {"version": ...}` แสดงว่าพร้อมใช้งาน 100%

---

## วิธีที่ 2: Deploy ฟรีบน Hugging Face Docker Spaces

1. เข้าไปที่ [https://huggingface.co/new-space](https://huggingface.co/new-space)
2. ตั้งชื่อ Space (เช่น `my-cobalt-api`), เลือก SDK เป็น **Docker** → **Blank**, เลือก Hardware เป็น **CPU basic (Free)**
3. อัปโหลดไฟล์ `Dockerfile` จากโฟลเดอร์ `cloud-backend/` นี้ขึ้นไปใน Space
4. ไปที่ **Settings → Variables and secrets** แล้วเพิ่ม Variable:
   - `API_URL` = `https://<username>-<spacename>.hf.space/` (ต้องมี `/` ปิดท้าย)
   - `CORS_URL` = `https://apisit-man.github.io`
5. รอ Space Build เสร็จและสถานะเป็น **Running**

---

## ขั้นตอนเชื่อมต่อกับหน้าเว็บ GitHub Pages

เมื่อได้ลิงก์ Cobalt API ของคุณแล้ว สามารถเชื่อมต่อได้ 2 วิธี:

1. **ทดสอบทันทีผ่านหน้าเว็บ**:
   - เปิดหน้า `https://apisit-man.github.io/applications/video-downloader/`
   - กดปุ่ม **⚙️ ตั้งค่า Backend (Cobalt API)**
   - วางลิงก์ API ของคุณแล้วกด **ทดสอบการเชื่อมต่อ & บันทึก**
2. **ตั้งค่าถาวรให้ผู้เข้าชมทุกคนใช้งานได้ทันที**:
   - เปิดไฟล์ `applications/video-downloader/index.html`
   - ค้นหาบรรทัด `const DEFAULT_COBALT_API = '';`
   - ใส่ URL ของคุณลงไป เช่น `const DEFAULT_COBALT_API = 'https://my-cobalt-apisit.koyeb.app/';`
   - Commit และ Push ขึ้น GitHub Pages
