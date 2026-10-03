# คู่มือการติดตั้ง Contact Form (Google Sheets + Apps Script)

ระบบฟอร์มติดต่อนี้เชื่อมต่อแบบฟอร์มบนเว็บไซต์ `about.html` เข้ากับ **Google Sheets** เพื่อเก็บบันทึกประวัติ และส่งอีเมลแจ้งเตือนเข้า **a.tongchai@gmail.com** ทันที พร้อมปุ่ม Reply เพื่อตอบกลับหาผู้ส่ง

---

## ขั้นตอนการติดตั้ง (ทำเพียงครั้งเดียว ประมาณ 3 นาที)

### 1. สร้าง Google Sheet
1. เปิดเบราว์เซอร์ไปที่ [sheets.new](https://sheets.new)
2. ตั้งชื่อไฟล์สเปรดชีต เช่น `Website Contacts - Apisit Thongchai`

### 2. นำโค้ด Google Apps Script ไปวาง
1. ในหน้า Google Sheet ให้คลิกเมนูด้านบน: **ส่วนขยาย (Extensions)** ➔ **Apps Script**
2. ลบโค้ดเริ่มต้นทั้งหมดในไฟล์ `Code.gs` ออก
3. เปิดไฟล์ [`google-apps-script/contact-api.gs`](contact-api.gs) ในโปรเจกต์นี้ แล้วคัดลอกโค้ดทั้งหมดไปวางในหน้า Apps Script
4. กดปุ่มบันทึก 💾 (Save project)

### 3. ปรับใช้เป็น Web App (Deploy)
1. คลิกปุ่มสีน้ำเงินด้านขวาบน **การปรับใช้ (Deploy)** ➔ **การปรับใช้ใหม่ (New deployment)**
2. คลิกไอคอนฟันเฟือง ⚙️ ทางซ้าย แล้วเลือก **เว็บแอป (Web app)**
3. กำหนดค่าดังนี้:
   - **คำอธิบาย (Description):** `Website Contact API v1`
   - **เรียกใช้ในฐานะ (Execute as):** `ฉัน (Me)`
   - **ผู้มีสิทธิ์เข้าถึง (Who has access):** `ทุกคน (Anyone)` *(⚠️ สำคัญมาก: ต้องเลือก Everyone/Anyone เพื่อให้ผู้เข้าชมหน้าเว็บส่งข้อความได้)*
4. คลิกปุ่ม **ปรับใช้ (Deploy)**
5. หากมีหน้าต่างขึ้นมาขอสิทธิ์ ให้คลิก **ให้สิทธิ์เข้าถึง (Authorize access)** ➔ เลือกบัญชี Google ➔ คลิก **ขั้นสูง (Advanced)** ➔ คลิก **ไปที่ Website Contact API (ไม่ปลอดภัย / Unsafe)** ➔ คลิก **อนุญาต (Allow)**
6. เมื่อเสร็จสิ้น จะได้ **URL ของเว็บแอป (Web App URL)** ที่มีลักษณะดังนี้:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
7. คัดลอก URL นี้ไว้

### 4. นำ Web App URL ไปใส่ในหน้าเว็บ
1. เปิดไฟล์ `about.html`
2. ค้นหาบรรทัด:
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. นำ Web App URL ที่ได้มาวางแทนที่ข้อความดังกล่าว
4. บันทึกและ Push ขึ้น GitHub Pages เพื่อใช้งานจริงได้ทันที!
