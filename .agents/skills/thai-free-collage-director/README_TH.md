# Thai Free Collage Director v2.0 (Antigravity)

สกิลสำหรับเปลี่ยนเรื่องสั้นและงานค้นคว้าภาษาไทยเป็นคลิปแนวตั้ง 9:16 ระดับมืออาชีพ ด้วยสไตล์ **Modern Paper Collage + 3D Papercraft / Claymation** ฟอนต์สมัยใหม่ (`Kanit`) การเน้นคำสำคัญ (`**keyword**`) เสียงพากย์คนเดียวกันตลอดทั้งคลิปจาก **Google AI Studio TTS (`gemini-3.8-flash-tts`)** พร้อมระบบซิงค์จังหวะ Silence Valley อัตโนมัติ, Edge TTS สำรองเมื่อออฟไลน์, และดนตรีบรรเลง Lo-Fi ในเครื่อง

---

## จุดเด่นของเวอร์ชัน v2.0
1. **3D Papercraft / Claymation เฉพาะฉาก (`generate_scene_art.py`):** สร้างภาพประกอบไดโอรามา 3 มิติให้ตรงกับเนื้อหาจริงของทุกฉาก พร้อมไดคัทโปร่งใสอัตโนมัติ (Edge-Connected Alpha Cutout + ขอบสติกเกอร์กระดาษ)
2. **เสียงพากย์คนเดียวกัน 100% (`generate_tts.py`):** สังเคราะห์เสียงพากย์ทั้งเรื่องในคำสั่งเดียว (Single-Pass Synthesis) เพื่อไม่ให้โทนเสียงเปลี่ยนกลางคัน พร้อม **Numpy RMS Silence-Valley Alignment** จับจังหวะเว้นวรรคหายใจให้ภาพตัดตรงเสียงพูดพอดี
3. **Modern Thai Typography (`render.py`):** ใช้ฟอนต์ `Kanit-Bold` / `Kanit-Medium` พร้อมไฮไลต์คำสำคัญด้วยเครื่องหมาย `**คำสำคัญ**`, ป้ายสถิติ 3 มิติ (`badge`), แถบเทป Washi, กล้องซูม Ken Burns, Spring Physics และป้ายอ้างอิงแหล่งข้อมูล (`source`)

---

## คำสั่งใช้งานด่วน (Windows PowerShell)

```powershell
# 1. ตรวจสอบความถูกต้องของ Storyboard
python scripts/validate.py production/storyboard.json

# 2. สร้างภาพ 3D Papercraft โปร่งใสเฉพาะฉาก (และตรวจสอบภาพใน art/ ก่อนเรนเดอร์)
python scripts/generate_scene_art.py --storyboard production/storyboard.json --sticker-border

# 3. เรนเดอร์ Full HD (1080x1920, 24fps) พร้อมเสียงพากย์คนเดียว + เพลงคลอ
python scripts/render.py --storyboard production/storyboard.json --output out/final.mp4 --width 1080 --fps 24 --tts auto --voice Zephyr --music auto --style assets/style-profile.json
```

### ตัวเลือกเสียงพากย์ (`--voice`):
- `Puck`: เสียงผู้ชายร่าเริง กระชับ เร้าใจ (เหมาะกับคลิปไวรัล/เตือนภัย)
- `Zephyr`: เสียงสดใส ฉะฉาน สไตล์เล่าความรู้วิทยาศาสตร์
- `Aoede`: เสียงผู้หญิงอบอุ่น นุ่มนวล
- `Kore`: เสียงสุขุม นิ่งลึก
- `Fenrir`: เสียงพลังงานสูง กระตือรือร้น
- หรือใส่ไฟล์เสียงอัดเอง: `--audio path/to/narration.wav`

ดูแนวทางการเขียนบทและการตรวจคุณภาพทั้งหมดได้ใน [references/production-playbook.md](references/production-playbook.md) และ [references/storyboard-schema.md](references/storyboard-schema.md)
