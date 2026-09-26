# ทางไหนดี — Bangkok Road Watch (สมุดบันทึกถนนกรุงเทพฯ)

เว็บแอปพลิเคชันสำหรับสำรวจ ติดตาม และบันทึกจุดเฝ้าระวังน้ำท่วมและสภาพการจราจรในกรุงเทพฯ ฉบับส่วนตัว พัฒนาโดย **ดร.อภิสิทธิ์ ธงไชย** (นักวิจัยและนักการศึกษา) 

โครงการนี้ทำงานแบบ 100% Client-side ไม่มีภาระผูกพันกับ Server สามารถโฮสต์บน **GitHub Pages** ได้ทันที หรือดับเบิลคลิกเปิดใช้งานบนเครื่องได้

---

## วิธีเปิดใช้งาน

1. **แบบแยกไฟล์ (สำหรับพัฒนาและโฮสต์บนเว็บ):** ดับเบิลคลิกที่ [index.html](file:///c:/Users/atong/Documents/antigravity/personal%20website/projects/bangkokflood/index.html) เพื่อเปิดใน Chrome, Edge, Firefox หรือ Safari ไม่ต้องติดตั้ง Build tool หรือลง Library ใด ๆ ทั้งสิ้น
2. **แบบไฟล์เดี่ยว (All-in-one Portable):** ดับเบิลคลิกที่ [standalone.html](file:///c:/Users/atong/Documents/antigravity/personal%20website/projects/bangkokflood/standalone.html) รวม HTML + CSS + Data + JS ไว้ในไฟล์เดียว สามารถก๊อบปี้ส่งต่อทาง LINE หรือเปิดบนเครื่องที่ไม่มีอินเทอร์เน็ตได้ทันที

---

## คุณสมบัติเด่นที่ได้รับการปรับปรุง (Key Features)

### 🗺️ 1. แผนที่อินเทอร์แอคทีฟถนนจริง ซูมเข้า-ออกได้ละเอียด (Interactive Real-World Map)
- **แผนที่จริงระดับถนน (Real Basemap):** ใช้แผนที่จาก **Esri World Street Map & Esri World Imagery (Satellite)** แสดงแนวถนนจริง สี่แยก ทางด่วน คลองระบายน้ำ และสถานีรถไฟฟ้าอย่างครบถ้วน โดยไม่มีการบล็อก `file:///` ไม่มีลายน้ำ และไม่ต้องใช้ API Key
- **ซูมเข้า-ออกได้อิสระ (Smooth Zoom Level 9 → 19):** ใช้ลูกกลิ้งเมาส์, ทัชสองนิ้วแบบ Pinch-to-zoom บนมือถือ หรือปุ่ม `+` / `-` เพื่อเจาะดูจุดเสี่ยงในระดับซอย
- **Multi Map Mode:** สามารถกดสลับมุมมองระหว่าง `[ 🗺️ ถนน ]` (แผนที่ถนนคมชัด), `[ 🛰️ ดาวเทียม ]` (ภาพถ่ายดาวเทียมความละเอียดสูง), และ `[ 📐 ผังภาพรวม ]` (ผังเรขาคณิต SVG) ได้ทันที
- **Auto-Fit & FlyTo ตามโซน:** เมื่อคลิกเลือกโซน (เหนือ, กลาง, ตะวันออก, ฝั่งธนบุรี) แผนที่จะบิน (FlyTo) และซูมปรับขอบเขตโฟกัสเฉพาะโซนนั้นให้อัตโนมัติ พร้อมปุ่ม `🎯 กทม.` เพื่อรีเซ็ตกลับสู่ภาพรวมเมืองหลวง
- **Interactive Popup & Casing:** เส้นทางวาดทับตามแนวถนนจริง พร้อมขอบเส้นนูน (Casing) และหมุดตัวเลข 1..31 เมื่อแตะหมุดจะแสดงการ์ดย่อและปุ่มเปิด Google Maps นำทาง

### 🎨 2. ความสวยงามและการจัดวาง (Modern Aesthetics & UI)
- **Modern Dashboard & Split-screen Layout:** บนหน้าจอคอมพิวเตอร์ แผนที่จะถูกจัดให้อยู่คู่ขนานแบบ Sticky ทางฝั่งซ้าย ทำให้สำรวจแผนที่ไปพร้อมกับรายการถนนได้โดยไม่ต้องเลื่อนขึ้น-ลงสลับไปมา
- **Theme Support (Light / Dark Mode):** แผนที่สลับแผนที่ฐาน (Tile Layer) ตามธีมสีอัตโนมัติ (CartoDB Voyager สว่างใส / CartoDB Dark Matter เท่ คมชัด) พร้อมบันทึกสถานะธีมไว้ในเบราว์เซอร์

### ✨ 3. ความน่าสนใจและการโต้ตอบ (Interactive & Engaging)
- **Two-way Map ↔ List Interaction:**
  - ชี้เมาส์ที่การ์ดในรายการ → เส้นทางและหมุดบนแผนที่จะสว่างเด่นขึ้นทันที
  - แตะปุ่ม `📍 ซูมดู` บนการ์ด → แผนที่บินไปซูมเจาะจงถนนเส้นนั้นที่ระดับ 14 ทันที
  - แตะหมายเลขหมุดหรือเส้นทางบนแผนที่ → เลื่อนหน้าจอไปยังการ์ดพร้อมเอฟเฟกต์กะพริบไฮไลต์
- **Top 3 Critical Roads Strip:** แถบสรุปด่วน 3 ถนนที่เสียเวลามากที่สุดไว้บนสุด เพื่อให้เห็นสถานการณ์สำคัญได้ใน 3 วินาที
- **Zone Distribution Meter:** แถบสัดส่วนแสดงจำนวนถนนที่ได้รับผลกระทบตามโซน สามารถคลิกที่แถบหรือชื่อโซนเพื่อกรองและซูมทันที
- **Live Relative Time & Animated Counters:** แสดงสถานะเวลาบันทึกล่าสุดพร้อมไฟกะพริบ และตัวเลขนับแบบเคลื่อนไหว (Animated Count-up)

### 📱 4. ความสะดวกในการใช้งาน (User-Friendly UX)
- **Visual Form Mode (แบบฟอร์มแก้ไขถนน):** มีแท็บฟอร์มให้เลือกถนนเพื่อแก้ไข เพิ่มถนนใหม่ หรือลบถนนได้อย่างสะดวกโดยไม่ต้องพิมพ์ JSON ด้วยตนเอง (พร้อมแท็บ Raw JSON สำหรับนำเข้า/ส่งออก)
- **Copy Summary for Sharing:** ปุ่ม `📋 คัดลอกสรุป` คลิกเดียวเพื่อจัดฟอร์แมตข้อความสรุปสถานการณ์ สำหรับส่งต่อในกลุ่ม LINE, Messenger หรือครอบครัวก่อนออกเดินทาง
- **Smart Filters & Sorting:** กรองเฉพาะ "จุดที่มีการปิดทาง", "ล่าช้า > 20 นาที" หรือจัดเรียงตามเวลาล่าช้า (มากไปน้อย/น้อยไปมาก) และตามชื่อถนน ก-ฮ
- **Mobile Floating Toggle:** ปุ่มลอยตัวด้านล่างบนจอมือถือ `[ 🗺️ สลับดูแผนที่ / 📋 สลับดูรายการ ]` ให้กระโดดไปมาระหว่างแผนที่กับลิสต์ได้อย่างรวดเร็วด้วยมือเดียว

---

## โครงสร้างไฟล์ในโปรเจกต์

- [index.html](file:///c:/Users/atong/Documents/antigravity/personal%20website/projects/bangkokflood/index.html) — โครงสร้างหน้าเว็บหลักและ Semantic Markup พร้อมการเชื่อมต่อ Leaflet Map
- [styles.css](file:///c:/Users/atong/Documents/antigravity/personal%20website/projects/bangkokflood/styles.css) — สไตล์ชีตระบบ ดีไซน์โมเดิร์น แดชบอร์ด ดาร์กโหมด และสไตล์ของหมุดแผนที่
- [data.js](file:///c:/Users/atong/Documents/antigravity/personal%20website/projects/bangkokflood/data.js) — ข้อมูลตั้งต้น (`window.DEFAULT_SNAPSHOT`) 31 ถนนพร้อมพิกัดจริง
- [app.js](file:///c:/Users/atong/Documents/antigravity/personal%20website/projects/bangkokflood/app.js) — ลอจิกการคำนวณ พิกัดแผนที่ ระบบซูม FlyTo Leaflet ระบบกรอง และ LocalStorage
- [standalone.html](file:///c:/Users/atong/Documents/antigravity/personal%20website/projects/bangkokflood/standalone.html) — ไฟล์เดี่ยวรวมทุกอย่างสำหรับการพกพา

---

## การเผยแพร่บน GitHub Pages

โปรเจกต์นี้ตั้งอยู่ในโฟลเดอร์ `projects/bangkokflood/` ของพื้นที่ส่วนตัว เมื่อ Commit และ Push ขึ้น Repository `apisit-man/apisit-man.github.io` แล้ว จะสามารถเข้าชมผ่าน URL:
```text
https://apisit-man.github.io/projects/bangkokflood/
```
(หรือสามารถคัดลอกไฟล์ [standalone.html](file:///c:/Users/atong/Documents/antigravity/personal%20website/projects/bangkokflood/standalone.html) ไปวางไว้ที่หน้าหลักเพื่อเข้าถึงได้ทันทีตามต้องการ)
