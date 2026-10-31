# Image Generation Prompts Guide (คู่มือสร้าง Prompt รูปประกอบสไตล์ Gemini Notebook Editorial)

คู่มือนี้รวบรวมเทคนิค โครงสร้าง Prompt และคีย์เวิร์ดเฉพาะ สำหรับสร้างภาพประกอบสไลด์ ให้ได้โทนภาพ กราฟิก และอารมณ์ตรงตามเอกสารต้นฉบับ *Critical AI Literacy for Educators* อย่างแม่นยำ

---

## 1. คุณลักษณะทางภาพ (Visual Style Attributes)

ภาพประกอบในสไตล์นี้ไม่ใช่ภาพสต็อกธรรมดา และไม่ใช่ภาพการ์ตูนเด็กแบบแฟนตาซีทั่วไป แต่มีเอกลักษณ์ 4 ประการ:
1. **Tech-Blueprint & HUD Overlay:** มีเส้นผังพิมพ์เขียว เส้นวงจร กราฟิกเรดาร์ กริดตารางจางๆ ด้านหลัง
2. **Glowing Neon Accents on Deep Surfaces:** แสงเรืองรองโทนสี Cyber Yellow (`#FFE600`), Electric Cyan/Blue (`#00F2FE`), Neon Orange
3. **Metaphorical & Conceptual Visuals:** นำเสนอแนวคิดนามธรรมให้เป็นรูปธรรม (เช่น AI เป็นตู้สล็อตเสี่ยงโชค, คำตอบถูกซ่อนไว้หลังรอยฉีก, ตราชั่งประเมินคุณค่า)
4. **Cinematic 3D with Clean 2D Editorial Contrast:** ตัววัตถุมีมิติ แสงเงาสวยงาม แต่จัดวางในกรอบการ์ดหรือเฟรมสไตล์สื่อสารมวลชนที่สะอาดตา

---

## 2. สูตรโครงสร้าง Prompt (Standard Prompt Formula)

```text
[Main Subject / Metaphor], [Composition & Layout], [Visual Style & Technique], [Color Palette & Lighting], [Background Elements], --ar 16:9 / --ar 1:1, high detail, clean editorial graphic
```

### คีย์เวิร์ดควบคุมสไตล์ที่ต้องใส่ (Crucial Style Keywords):
- `clean modern editorial illustration`
- `conceptual pedagogical graphic`
- `dark tech aesthetic with blueprint circuit grid background`
- `vibrant glowing accents in electric cyber yellow, neon orange, and tech cyan`
- `metaphorical composition, sharp details, 3D render with vector graphic elements`
- `no messy text, isolated on solid or sleek tech surface`

---

## 3. ตัวอย่าง Prompt ตามรูปแบบหลัก (Prompt Templates by Archetype)

### แบบที่ 1: "The Split Reality / Next-Token Predictor" (ความจริงเบื้องหลัง AI)
* **แนวคิด:** เอกสารหรูหราฝั่งซ้าย ถูกฉีกเผยให้เห็นกลไกตู้สล็อตแมชชีนคำนวณสถิติฝั่งขวา
* **Prompt:**
> "A conceptual split-view editorial illustration. On the left side, a glowing sleek digital document glowing with neat formal typography. The document is ripped and torn in the middle, revealing on the right side a retro-futuristic slot machine mechanism with glowing reels showing probability numbers and branching decision trees, blueprint circuitry background, deep slate blue background, glowing electric yellow and vibrant orange neon highlights, clean 3D isometric tech style, high resolution --ar 16:9"

### แบบที่ 2: "The Warning Polaroid / Absurd AI Output" (ภาพถ่ายโพลารอยด์เคสตัวอย่าง)
* **แนวคิด:** ภาพเคสความผิดพลาดของ AI เช่น พิซซ่าทากาว, บอทคอลเซ็นเตอร์, ลิงก์ปลอม
* **Prompt (Pizza Glue Case):**
> "A realistic macro photograph of a delicious slice of cheese pizza with melted cheese, with a robotic futuristic hand holding a clear bottle of glue over it, creative conceptual metaphor for AI hallucinations, professional studio lighting, dark textured background, clean modern editorial composition --ar 1:1"
* **Prompt (Customer Service AI Liability):**
> "A cute modern white robot with headset sitting at an airport check-in desk, looking nervous, in the background a passenger airplane on an airstrip through large windows, modern 3D render style, clean corporate editorial lighting --ar 1:1"

### แบบที่ 3: "The Algorithm X-Ray Black Box" (กล่องดำอัลกอริทึมแปลงสัญญาณ)
* **แนวคิด:** กล่องเครื่องจักร AI สีน้ำเงินเข้ม รับข้อมูลดิบเข้ามา แล้วฉายลำแสงโปรเจกเตอร์สีส้ม/เหลืองขยายความเกินจริง
* **Prompt:**
> "A dark blue mechanical tech module labeled as an AI black-box algorithm with gears and glowing circuits, receiving a simple pulse wave from the left, and projecting a wide intense glowing cone of neon amber light onto a futuristic digital clipboard on the right, architectural blueprint grid background, tech HUD interface, clean pedagogical diagram aesthetic, 3D vector illustration --ar 16:9"

### แบบที่ 4: "The 3 Pillars of Classroom Safety" (3 เสาหลักโรมันสไตล์โมเดิร์นเทค)
* **แนวคิด:** สถาปัตยกรรม 3 เสาหลักรองรับหน้าจั่วการเรียนรู้ AI เสาแต่ละต้นบรรจุกลไกเรืองแสง
* **Prompt:**
> "A clean architectural Greek temple facade made of dark navy-blue high-tech metal columns, three illuminated pillars each containing glowing neon microchips and gears, blueprint schematics drawn on a soft pale slate background, subtle yellow sticky note aesthetic at the base, modern educational concept art, crisp vector 3D render --ar 16:9"

### แบบที่ 5: "The Balance Scale of Process vs Output" (ตราชั่งเปรียบเทียบกระบวนการกับชิ้นงาน)
* **แนวคิด:** ตราชั่งเอียง ข้างหนึ่งเป็นเอกสารลอยได้ ข้างหนึ่งเป็นคนกำลังพูดประเมิน
* **Prompt:**
> "A modern tech balance scale on a clean engineering grid background. On the lighter side, a floating glowing digital paper document. On the heavier, weighed-down side, a glowing yellow card with an icon of a student speaking into a microphone with gears turning, representing authentic human understanding over automated AI output, minimalist editorial 3D style --ar 16:9"

### แบบที่ 6: "The 4-Step Infinity Flow / Critical Loop" (ลูป 4 ขั้นตอน หยุด-ถาม-ตรวจ-มนุษย์)
* **แนวคิด:** 4 วงแหวนท่อพลังงานเรืองแสงสีทอง/เหลือง เชื่อมกันเป็นวงรอบพร้อมไอคอนปุ่มไฮเทค
* **Prompt:**
> "Four interconnected circular glowing neon cyber-yellow pipes forming an infinite continuous process loop, each circle containing a glossy metallic dark blue button with a glowing white icon (pause icon, magnifying glass search icon, checkmark clipboard icon, and human brain heart icon), deep navy backdrop with subtle tech radar lines, ultra-clean UI presentation graphic --ar 16:9"

### แบบที่ 7: "The AI Assessment Lighthouse / Signal Tower" (หอคอยสัญญาณระดับ AI)
* **แนวคิด:** เสาไฟสัญญาณ 5 ระดับ สีแดง ส้ม เหลือง เขียวอ่อน เขียวเข้ม
* **Prompt:**
> "A vertical high-tech indicator tower with 5 glowing circular lamp levels, colored from bottom to top: bright red, warm orange, amber yellow, lime green, and vibrant emerald green, architectural blueprint paper background with gridlines, crisp modern educational infograph style, clean 3D illustration --ar 1:1"

---

## 4. ข้อพึงระวังในการ Prompt ภาพ (Best Practices & Pitfalls)

1. **หลีกเลี่ยงข้อความในภาพ (Avoid embedded text):** อย่าสั่งให้ AI เจนข้อความภาษาไทยหรือประโยคยาวลงในภาพ เพราะตัวอักษรจะเพี้ยน ให้เจนเฉพาะกราฟิก/สัญลักษณ์ แล้วนำมาใส่ข้อความด้วย `python-pptx`
2. **คุมสัดส่วน Aspect Ratio ให้สัมพันธ์กับเลย์เอาต์:**
   - ใช้ `--ar 16:9` สำหรับภาพพื้นหลังเต็ม หรือภาพเปรียบเทียบแนวนอน
   - ใช้ `--ar 1:1` หรือ `--ar 4:3` สำหรับภาพเพื่อใส่ในการ์ดหรือเฟรมโพลารอยด์
3. **คุมแสงให้สอดคล้องกับธีมมืด/สว่าง:** ถ้าวางบนสไลด์สีอ่อน ให้ขอ "isolated on clean pale blue-gray surface" หรือถ้าใช้ในสไลด์มืด ให้ขอ "deep midnight navy background with glowing neon edges"
