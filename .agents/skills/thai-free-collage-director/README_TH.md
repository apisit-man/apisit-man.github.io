# Thai Free Collage Director v1.0 (Antigravity)

สกิลฟรีสำหรับเปลี่ยนเรื่องสั้นภาษาไทยเป็นคลิปแนวตั้ง 9:16 ด้วยภาพประกอบแบบกระดาษตัด การ์ตูน 2D และ Motion Graphics จากโค้ดในเครื่อง **ไม่เรียก Atlas Cloud, Remotion หรือ API เสียเงิน** รองรับ Windows/macOS/Linux ที่มี Python, FFmpeg และฟอนต์ไทย

## ติดตั้งบน Windows 10/11

1. แตกไฟล์ `skill.zip` และคัดลอกโฟลเดอร์ `thai-free-collage-director` ทั้งโฟลเดอร์ไปที่ `<โฟลเดอร์โปรเจกต์>/.agents/skills/`
2. เปิด Antigravity ในโปรเจกต์นั้นและเปิด Terminal (PowerShell)
3. ติดตั้ง Python 3 จาก python.org หรือ `winget install Python.Python.3.12`
4. ติดตั้ง FFmpeg จาก `winget install Gyan.FFmpeg` (หากไม่มีอยู่แล้ว) แล้วเปิด Terminal ใหม่
5. ติดตั้ง Pillow: `py -m pip install -r .agents/skills/thai-free-collage-director/requirements.txt`
6. ทดสอบ `ffmpeg -version` และ `py -c "from PIL import Image; print('OK')"`

## สั่งงานกับ Antigravity

พิมพ์ใน Agent Chat:

`/thai-free-collage-director สร้างคลิป 9:16 ความยาว 30 วินาที เรื่อง เด็กสองคนใช้ AI เป็นเพื่อนคู่คิด ไม่ใช้ API เสียเงิน ให้ได้ไฟล์ MP4 พร้อมซับภาษาไทยและเพลงที่สร้างในเครื่อง`

หาก slash command ไม่ปรากฏ ให้สั่งเป็นภาษาธรรมชาติ: `ใช้สกิล thai-free-collage-director ที่ .agents/skills เพื่อสร้างเรื่องนี้ ...` และตรวจ path / โหลดหน้าต่างใหม่

## สร้างวิดีโอพร้อมเสียงพากย์ AI Studio และเพลง (Windows)

ภายในโฟลเดอร์สกิล:

```powershell
# 1. ตรวจสอบ Storyboard
py scripts/validate.py examples/sample-storyboard.json

# 2. เรนเดอร์ Preview 540x960 พร้อมเสียงพากย์ Google AI Studio (Puck) + เพลงพื้นหลัง
py scripts/render.py --storyboard examples/sample-storyboard.json --output out/preview.mp4 --preview --tts auto --voice Puck --music auto

# 3. เรนเดอร์จริงระดับ Full HD 1080x1920 24fps
py scripts/render.py --storyboard examples/sample-storyboard.json --output out/final.mp4 --width 1080 --fps 24 --tts auto --voice Puck --music auto
```

### ตัวเลือกเสียงพากย์ (Voices):
- `Puck`: เสียงผู้ชายร่าเริง เป็นกันเอง เหมาะกับผู้ดำเนินเรื่อง (Default)
- `Aoede`: เสียงผู้หญิงอบอุ่น นุ่มนวล เหมาะกับคุณครูหรือเรื่องราวซึ้งๆ
- `Zephyr`: เสียงสดใส ชัดถ้อยชัดคำ เหมาะกับคลิปให้ความรู้ STEM
- `Kore`: เสียงสุขุม สงบ เหมาะกับข้อคิดชีวิต
- `Fenrir`: เสียงตื่นเต้น กระตือรือร้น
- หรือใช้เสียงบรรยายที่อัดเอง: `--audio narration.wav`

*หมายเหตุ: สกิลจะดึง `GEMINI_API_KEY` ในเครื่องมาสังเคราะห์เสียงพากย์ไทยที่เป็นธรรมชาติจากโมเดล `gemini-3.8-flash-tts` ทันที และมีระบบสลับไปใช้ Edge TTS สำรองอัตโนมัติหากออฟไลน์*

## ตั้งค่าสไตล์ให้เป็นของตัวเอง

แก้ไขรหัสสีใน `assets/style-profile.json` และเรียก render พร้อม `--style assets/style-profile.json` เพื่อให้ทุกตอนใช้ชุดสีประจำของคุณ ตัวสกิลจะใช้ลักษณะ Paper Collage แบบเดียวกันทุกฉาก คุณสามารถปรับข้อความและ `motif` ใน JSON ได้โดยไม่ต้องสร้างวิดีโอด้วย API

## อินพุตเรื่องใหม่

- ให้ AI Agent สร้าง `production/storyboard.json` จากเนื้อเรื่องไทยที่คุณส่ง (ทางเลือกคุณภาพสูงกว่า)
- หรือใช้ตัวแบ่งข้อความอัตโนมัติแบบพื้นฐานโดยตรง: `py scripts/story_to_json.py --file examples/sample-story.txt --title "AI เป็นเพื่อนคู่คิด" --duration 30 --out production/storyboard.json`
- จากนั้นให้ `py scripts/validate.py production/storyboard.json` และ render

## ผลลัพธ์

- `.mp4` แนวตั้ง H.264 (เสียง AAC หากใช้เพลงหรือไฟล์บรรยาย)
- `.srt` คำบรรยายภาษาไทย
- `-contact-sheet.jpg` ภาพสรุปฉาก
- `.qa.json` รายงานเทคนิคจาก FFprobe

## ใส่ภาพการ์ตูนสไตล์ของตัวเอง

ทำภาพประกอบ PNG พื้นหลังโปร่งใสด้วยตัวเองหรือให้ Agent วาดเป็นเวกเตอร์แล้วแปลงเป็น PNG จัดไว้ข้างไฟล์ JSON ในโฟลเดอร์ `art/` และเพิ่ม `"art": "art/scene1.png"` ลงในแต่ละฉาก ระบบจะใช้ภาพนั้นแทนลายการ์ตูนสำเร็จรูป ขยับภาพและประกอบ Paper Collage โดยไม่เสียเครดิต API วิธีนี้ช่วยให้ใกล้เคียงลุคต้นฉบับและรักษาตัวละครให้เหมือนกันทุกตอนมากขึ้น

## คุณภาพและข้อจำกัด

สกิลนี้ **ไม่ใช่การเรียกใช้ Vox Director ของ Alisa** และ **ไม่สามารถสร้างฉากตัวละครสมจริงจากเรื่องสั้นได้แบบโมเดล AI Video** แทนที่ด้วยกราฟิก original แบบตัดกระดาษ + การเคลื่อนไหวจากโค้ด ซึ่งควบคุมและแก้ไขซ้ำได้โดยไม่มีค่าเครดิตสร้างภาพ/วิดีโอ คุณภาพขึ้นกับการกำกับ storyboard และการปรับภาพโดย Agent ขณะสร้างโปรเจกต์

เวอร์ชันนี้ยัง **ไม่มี Text-to-Speech ภาษาไทยอัตโนมัติที่รับประกันได้แบบ offline** หากต้องการเสียงพูด ให้ใส่ไฟล์เสียงตนเอง (MP3/WAV/M4A) เพิ่มได้ หรือให้ agent ตรวจและเลือกบริการ/voice ในเครื่องที่มีสิทธิ์ใช้งานอยู่จริง ห้ามอ้างว่าได้เสียงโดยไม่มีไฟล์เสียง

## ลิขสิทธิ์ / ค่าใช้จ่าย

ตัวโค้ดสกิลนี้ทำใหม่ภายใต้ MIT License, ใช้ Pillow (HPND) และ FFmpeg (GPL/LGPL ขึ้นกับ build) ไม่เก็บ API key ไม่ใช้บริการเสียเงิน และไม่แถมไฟล์ฟอนต์ผู้ใช้ต้องติดตั้งฟอนต์ไทยที่มีสิทธิ์ใช้งานบนเครื่องเอง ไม่มีการนำโค้ดหรือ assets ของ Vox Director มาคัดลอก
