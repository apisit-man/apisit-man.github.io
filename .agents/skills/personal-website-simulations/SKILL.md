---
name: personal-website-simulations
description: |
  Standard design system, visual identity, layout architecture, and physics visualization guidelines for
  Dr. Apisit Tongchai's personal website and portfolio (apisit-man.github.io).
  Activate this skill whenever:
  - Creating, developing, refining, or designing new web applications, interactive simulations, STEM tools, or 2D/3D games for the user's personal website.
  - The user asks to "match with my personal web/site/portfolio", "add to my personal website", or mentions apisit-man.github.io.
  - Converting physics/math/STEM equations into interactive web tools (2D Canvas, WebGL, Three.js).
  - Designing visualizations that must be fully responsive, adaptable, or fit across any device (desktop, tablet, mobile/phone) with visual-first hierarchy.
---

# Personal Website Simulation & Web App Skill (apisit-man.github.io)

คู่มือและมาตรฐานการออกแบบ สร้าง และปรับแต่งเว็บแอปพลิเคชัน สื่อการเรียนรู้จำลองเชิงโต้ตอบ (Interactive Simulations) และเกม 3D สำหรับ **เว็บไซต์ส่วนตัวและพอร์ตโฟลิโอ ดร.อภิสิทธิ์ ธงไชย (apisit-man.github.io)**

---

## 1. กฎเหล็กด้านอัตลักษณ์และความเป็นอิสระ (Strict Personal Branding)

> [!IMPORTANT]
> **การปฏิบัติตาม `.geminirules` อย่างเคร่งครัด 100%:**
> 1. เว็บไซต์นี้เป็น **พอร์ตโฟลิโอและห้องทดลองวิจัยอิสระส่วนตัว** ของ **ดร.อภิสิทธิ์ ธงไชย (Dr. Apisit Tongchai)**
> 2. **ห้ามใส่ตราสัญลักษณ์ ข้อความ หรือแอบอ้าง** ว่าเป็นผลงานหรือสื่อทางการขององค์กร/สถาบันใดๆ เช่น "สสวท.", "IPST" หรือหน่วยงานต้นสังกัด
> 3. ตำแหน่งทางการที่ใช้ระบุตัวตน: `"ดร.อภิสิทธิ์ ธงไชย"`, `"นักวิจัยและนักการศึกษา"`, หรือ `"Independent Educator & Researcher"`

---

## 2. ระบบดีไซน์และจานสี (Design System & Color Palette)

ใช้ **Tailwind CSS** (CDN หรือ Build) เป็นมาตรฐานหลัก:

| องค์ประกอบ | ข้อมูลจำเพาะ (Specifications) | คลาส Tailwind / รหัสสี |
|---|---|---|
| **Primary Brand Gradient** | ม่วงครามแบรนด์ถึงคราม | `bg-gradient-to-r from-brand-600 to-indigo-600` (`#7c3aed` ถึง `#4f46e5`) |
| **Brand Colors** | Palette ม่วง (Violet) | `brand-50` (`#f5f3ff`) ถึง `brand-900` (`#4c1d95`), ค่าหลัก `brand-600` (`#7c3aed`) |
| **Light Background** | ขาวนวลสบายตา | `bg-[#fafafa]` หรือ `bg-slate-50` |
| **Dark Background** | มิดไนท์เนวี่เข้ม | `dark:bg-slate-950` (`#020617` หรือ `#050914`) |
| **Cards & Surfaces** | Frosted Glass / ขาวมน | Light: `bg-white/80 border-slate-200/80 shadow-sm`, Dark: `bg-slate-900/80 border-slate-800/80` |
| **Text Primary** | คมชัด สบายตา | Light: `text-slate-900`, Dark: `text-white` หรือ `text-slate-200` |
| **Text Muted** | รายละเอียด / คำอธิบาย | `text-slate-500 dark:text-slate-400` |

### ระบบตัวอักษร (Typography)
- **ภาษาไทย (Thai Text):** ฟอนต์ **`Prompt`** (สะอาด ทันสมัย อ่านง่ายบนทุกหน้าจอ)
- **ภาษาอังกฤษ (Latin Text):** ฟอนต์ **`Plus Jakarta Sans`**
- **ตัวเลข สูตร และค่าตัวแปร (Monospace):** ฟอนต์ **`JetBrains Mono`**

```html
<!-- Google Fonts Standard Import -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### ระบบสลับธีม (Theme Toggle System)
ทุกหน้าต้องรองรับการจำค่าผ่าน `localStorage.getItem('theme')` และตรวจสอบ `prefers-color-scheme`:
```javascript
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  if (typeof update3DTheme === 'function') update3DTheme(isDark);
}
```

---

## 3. สถาปัตยกรรมเลย์เอาต์ (Layout & UX Rules)

> [!CAUTION]
> **กฎเหล็ก "No Nested Scrollbars":**
> - **ห้ามใช้ Scrollbar ซ้อนด้านในเด็ดขาด** (เช่น การล็อกความสูงของ Sidebar ด้านซ้ายจนมีแถบเลื่อนแยก)
> - จัดโครงสร้างให้การ์ดควบคุม ตัวแปร ($d, f, \Delta\phi, A$) และผลการคำนวณ **มองเห็นครบในระดับสายตา**
> - ทั้งหน้าเว็บต้องมีเพียง **Scrollbar หลักของหน้าต่างเบราว์เซอร์ทางขวาสุดเพียงแถบเดียว** (Single Window Scroll)

### โครงสร้างหน้าเว็บและแถบนำทางมาตรฐาน (Standard Wireframe & Navigation Rules)

> [!CAUTION]
> **กฎเหล็กด้านแถบนำทางและตำแหน่งดาวน์โหลด CV (Strict Navbar & CV Placement Rule):**
> 1. **ห้ามใส่ปุ่มหรือลิงก์ "ดาวน์โหลด CV" (Download CV) บนแถบนำทาง (Header / Navbar) เด็ดขาด:**
>    - ทั้งบน Desktop Header และ Mobile Drawer Menu ในทุกหน้าของเว็บไซต์ (รวมถึง `index.html`, `about.html`, บทความใน `articles/`, เครื่องมือใน `applications/`, และแบบจำลองใน `projects/`)
> 2. **ตำแหน่งที่ถูกต้องของลิงก์ดาวน์โหลด CV:**
>    - ลิงก์ดาวน์โหลด CV อนุญาตให้จัดวางได้ **เฉพาะในหน้าประวัติส่วนตัว (Biography / `about.html`)** เท่านั้น โดยวางเป็นลิงก์ละเอียดอ่อน (Subtle Link) ในส่วนการ์ดติดต่อ/ประวัติส่วนตัวท้ายหน้า ตามการปรับปรุงโครงสร้างล่าสุด (Commit `1220e3a: refactor(ui): streamline CV download placement and hero CTA buttons`)
> 3. **โครงสร้างแถบนำทางมาตรฐาน (Standard Desktop Navbar Links):**
>    - `หน้าแรก` (href="index.html" หรือ "../index.html")
>    - `เกี่ยวกับฉัน` (href="about.html" หรือ "../about.html") — ลิงก์ตรงไปยังหน้าประวัติส่วนตัว (Biography) เสมอ
>    - `คลังสื่อการสอน / สื่อและนวัตกรรม`
>    - `บทความและงานวิจัย` (หรือ `บทความและแหล่งเรียนรู้`)
>    - `ติดต่อ` (href="#contact" หรือ "about.html#contact")
>    - ตัวแบ่งแนวตั้ง (Divider `h-5`)
>    - ปุ่มสลับธีม (Sun/Moon icon)
>    - ปุ่มสลับภาษา (EN)
>    *(หมายเหตุ: ต้องไม่มีปุ่มหรือเมนู ดาวน์โหลด CV)*

1. **Sticky Header:** 
   - ปุ่มย้อนกลับ `← หน้าแรก` (href="../../index.html") หรือ แถบนำทางมาตรฐานตามกฎข้างต้น
   - ชื่อแอปพลิเคชัน + ระบุสังกัด `"ดร.อภิสิทธิ์ ธงไชย · คลังแบบจำลองฟิสิกส์เชิงโต้ตอบ"`
   - ปุ่มสลับโหมดมุมมอง (เช่น 2D ถาดคลื่น / 3D Dynamic Surface)
   - ปุ่มสลับธีม Dark/Light (Sun/Moon icon)
2. **Breadcrumb & Hero Section:** 
   - เส้นทางนำทาง `หน้าแรก / แบบจำลองวิทย์-การแพทย์ / [ชื่อแอป]`
   - หัวข้อและป้ายกำกับเทคโนโลยี (เช่น `⚡ สมการคลื่น PDE 2D`)
3. **Main Content Grid (Responsive Visual-First Hierarchy):**
   - **บนมือถือ/แท็บเล็ต (Mobile & Tablet):** สลับให้ **จอจำลองภาพคลื่น (Canvas/3D Viewport) ขึ้นมาแสดงเป็นอันดับแรก (`order-1 lg:order-2`)** เพื่อให้ผู้ใช้เห็นการทดลองทันทีที่เปิดหน้าเว็บ และให้กล่องควบคุม/สไลเดอร์อยู่ด้านล่าง (`order-2 lg:order-1`)
   - **บนคอมพิวเตอร์ (Desktop):** จัดเป็น 2 คอลัมน์คู่ขนาน (แผงควบคุม 5 ส่วนด้านซ้าย : จอจำลอง 7 ส่วนด้านขวา)
   - ป้ายสัญลักษณ์ลอยตัว (Floating Legend) ให้ซ่อนหรือย่อบนจอมือถือ (`hidden sm:block`) เพื่อไม่ให้บดบังผืนน้ำ
4. **Footer:** ข้อมูลผู้จัดทำ ลิขสิทธิ์ และลิงก์ Social Icons ครบถ้วน

---

## 4. มาตรฐานการจำลอง 3D ด้วย Three.js (High-Visibility 3D)

เพื่อป้องกันปัญหาผืนน้ำ/วัตถุ 3D กลืนเป็นสีเดียวจนมองไม่เห็นความสูงต่ำ:

1. **เปิดใช้งาน Dynamic Vertex Colors:**
   - อย่าใช้วัสดุสีทึบเรียบ ให้ใช้ `vertexColors: true` บน `MeshStandardMaterial`
   - คำนวณสี RGB ลงใน `geometry.attributes.color` ตามระดับความสูง $u$:
     - **สันคลื่น (Crest / $+u$):** ฟ้าสว่าง/Cyan (`#22d3ee`) เรืองแสง
     - **ท้องคลื่น (Trough / $-u$):** แดงกุหลาบ/Crimson (`#f43f5e`)
     - **แนวบัพ/ผิวนิ่ง (Node / $u \approx 0$):** สีเข้ม Slate Neutral (`#1e293b`)
2. **ระบบควบคุมความชัน (Elevation Gain):**
   - มีตัวคูณปรับความสูงของยอดคลื่นใน 3D เสมอ (เช่น ค่าเริ่มต้น $3.5\times$ ถึง $5\times$)
3. **ระบบแสงและแกนสายตาอ้างอิง:**
   - วาง `GridHelper` ด้านล่างเพื่อเป็นแกนสายตาวัดความสูง-ต่ำ
   - วางไฟแบบ Directional Lights สองทิศทาง (Key Light สีขาว + Rim Light สีฟ้า/ส้ม) เพื่อเน้นเงามิติ

---

## 5. มาตรฐานการเรนเดอร์สมการคณิตศาสตร์และสูตรฟิสิกส์ (KaTeX Math Rendering Standard)

> [!IMPORTANT]
> **การแสดงผลสูตรคณิตศาสตร์และฟิสิกส์ในเว็บแอป:**
> - **ห้ามปล่อยให้โค้ดสูตรหลุดเป็น Raw LaTeX** เช่น `$\lambda$` หรือ `$\frac{\partial^2 u}{\partial t^2}$`
> - ให้ติดตั้ง **KaTeX (CDN)** พร้อม extension `auto-render` เสมอ เพราะโหลดเร็วกว่า MathJax 10 เท่า และไม่เกิดปัญหากะพริบ
> - ในแอปพลิเคชันที่มีการอัปเดตตัวเลข/สัญลักษณ์แบบ Real-time (เช่น การเลื่อน Slider) ต้องมีคำสั่ง Re-render กำกับเสมอ

### โค้ดติดตั้งในส่วน `<head>`:
```html
<!-- KaTeX for High-Performance LaTeX Math Rendering -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]});"></script>
```

### การตั้งค่าการเรนเดอร์แบบไดนามิกใน JavaScript:
```javascript
// เรียกซ้ำเมื่อมีการอัปเดตตัวแปรสด
if (window.renderMathInElement) {
  renderMathInElement(document.body, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ],
    throwOnError: false
  });
}
```

---

## 6. ส่วนท้ายเว็บและลิขสิทธิ์ (Official Footer Template)

ใช้โค้ด Footer นี้ที่ส่วนล่างสุดของทุกแอปพลิเคชันเสมอ:

```html
<footer class="bg-slate-100 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 text-center py-8 px-4 transition-colors space-y-2 mt-8">
  <div class="flex items-center justify-center gap-3 mb-2">
    <a aria-label="LinkedIn" class="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" href="https://www.linkedin.com/in/apisit-tongchai-6a5333100/" target="_blank">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 0 0-1.64 1.64c0 .91.73 1.64 1.64 1.64 1 0 1.64-.73 1.64-1.64 0-.91-.64-1.64-1.64-1.64Z"></path></svg>
    </a>
    <a aria-label="Facebook" class="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" href="https://web.facebook.com/apisit.tongchai" target="_blank">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"></path></svg>
    </a>
    <a aria-label="YouTube" class="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" href="https://www.youtube.com/@lifelucky" target="_blank">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="m10 15 5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 22c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73Z"></path></svg>
    </a>
    <a aria-label="GitHub" class="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" href="https://github.com/apisit-man" target="_blank">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path></svg>
    </a>
  </div>
  <p class="text-xs font-semibold text-slate-700 dark:text-slate-300">
    พัฒนาและเผยแพร่โดย ดร.อภิสิทธิ์ ธงไชย (Dr. Apisit Tongchai) · นักวิจัยและนักการศึกษา
  </p>
  <p class="text-[11px] text-slate-500 dark:text-slate-400">
    © 2026 อภิสิทธิ์ ธงไชย. สงวนลิขสิทธิ์ทั้งหมด (All Rights Reserved) · เว็บไซต์พอร์ตโฟลิโอส่วนตัว 
    <a href="https://apisit-man.github.io" class="hover:text-brand-600 dark:hover:text-brand-400 font-medium">apisit-man.github.io</a>
  </p>
  <p class="text-[10px] text-slate-400 dark:text-slate-500 pt-1">
    ขับเคลื่อนการเรียนรู้ด้วยวิทยาศาสตร์ เทคโนโลยีสะเต็ม (STEM) และปัญญาประดิษฐ์เพื่อการศึกษา
  </p>
</footer>
```

---

## 7. มาตรฐานการสร้าง QR Code คมชัดสูงและสแกนระยะไกล (Distance-Friendly & Logo-Safe QR Standard)

เมื่อสร้างหรือปรับปรุงระบบสร้าง QR Code ในแอปพลิเคชันของเว็บไซต์ (เช่น `applications/qrcodegenerator/`):

1. **ใช้ไลบรารี `qrcode-generator@1.4.4` แทน `qrcodejs@1.0.0`**:
   - เปิดการรองรับภาษาไทย (UTF-8) เสมอด้วย `qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8']`
   - ใช้ `qrcode(0, ecc)` เพื่อให้เลือก QR Version ที่ต่ำที่สุดโดยอัตโนมัติ (ลดความหนาแน่นของตาราง $N \times N$ ให้เม็ดสีมีขนาดใหญ่ที่สุด)
2. **การวาดพิกัดแบบ Pixel-Snapped + ขอบขาวมาตรฐาน 4 โมดูล**:
   - บวกขอบขาว (Quiet Zone) 4 โมดูลรอบด้านเสมอ (`totalModules = n + 8`)
   - คำนวณพิกัดแต่ละโมดูลด้วย `Math.round((c + 4) * unit)` เพื่อป้องกันขอบเบลอ (Sub-pixel Anti-aliasing)
3. **ระบบใส่โลโก้ตรงกลางแบบไม่ทำให้จุดแหว่ง (Center Logo Exclusion & Smart ECC)**:
   - เมื่อไม่มีโลโก้: ใช้ค่าเริ่มต้น ECC ระดับ `M` (หรือ `L`) เพื่อให้เม็ด QR โปร่งและสแกนระยะไกลง่ายที่สุด
   - เมื่อผู้ใช้เพิ่มโลโก้ตรงกลาง: สลับ ECC เป็นระดับ `H (30%)` อัตโนมัติ และคำนวณโซนตรงกลางแบบสมมาตร (`span % 2 === n % 2`) เพื่องดวาดเม็ดสีดำใต้กรอบโลโก้ ป้องกันเม็ดสีแหว่งครึ่งที่ทำให้สแกนไม่ติด
   - **มาตรฐานโลโก้เริ่มต้น (AT Portrait Logo Standard)**: แอปพลิเคชันที่สร้าง QR Code บนเว็บไซต์ (เช่น `applications/qrcodegenerator/`, `projects/kahoot-classroom/`, `projects/kahoot-clone/`) ให้ฝังโลโก้ประจำตัว AT (`assets/images/at-logo.jpg` หรือ `./logo.jpg`) ไว้ในกรอบวงกลมสีขาวตรงกลาง QR Code (`shape === 'circle'`) พร้อมโมดัลขยายเต็มจอ 1024×1024 px สำหรับโปรเจกเตอร์หน้าห้องเรียน
   - รองรับการส่งออกทั้ง **PNG ความละเอียดสูง (`512px`, `1024px`, `2048px`)** และ **Vector SVG** (ฝังโลโก้ด้วย `<image href="data:..." clip-path="..."/>`)

---

## 8. รูปแบบการจัดแสดงผลงานเด่น (Hero Spotlight Carousel Architecture)

เมื่อสร้างหรือปรับแต่ง Hero Spotlight Showcase บนหน้าแรก (`index.html`, `index-en.html`) หรือหน้ารวมหมวดหมู่:

1. **โครงสร้าง 2 ฝั่งสมดุล (Split Layout)**:
   - **ฝั่งซ้าย**: Tag Category พร้อมจุด Ping เรืองแสง, Title + Subtitle Badge (Gradient Pill), Description ชวนติดตาม, Feature Tags บ่งบอกความสามารถ 5 รายการ, และปุ่ม Call to Action ชัดเจน
   - **ฝั่งขวา**: Futuristic Blueprint HUD Card (เวกเตอร์ SVG หรือ Interactive Canvas) พร้อม Top Status Bar, Grid Metrics 4 ช่อง และทำให้อยู่ในแท็ก `<a>` ที่สามารถคลิกเข้าสู่แอปพลิเคชันได้โดยตรง
2. **ระบบหมุนเวียนอัตโนมัติ (Auto-Rotate Engine)**:
   - ตั้งรอบหมุนเวียน **5 วินาที (5,000ms)** พร้อมแถบ Progress Bar วิ่งบอกเวลาด้านบน
   - **Pause on Hover & Touch**: หยุดจับเวลาชั่วคราวเมื่อผู้ใช้นำเมาส์ไปชี้หรือแตะสัมผัสบนมือถือ เพื่อให้อ่านข้อมูลได้สะดวก
   - **Mobile Touch Gestures**: รองรับการปัด Swipe ซ้าย-ขวาบนมือถือและแท็บเล็ต
   - **Manual Navigation**: มีปุ่มลูกศร `<` `>`, จุด Indicator Dots พร้อมแอนิเมชันขยายจุดที่เลือก (`w-8`), และตัวนับเลข `N / Total`

---

## 9. การจัดวางและกรองผลงานวิชาการ (Academic Research Layout & Filter Pattern)

เมื่อนำเสนอเอกสารวิจัย บทความวิชาการ หรือผลงานตีพิมพ์ (Publications):

1. **ป้องกัน Asymmetric Layout & Dead Space**:
   - หากมีกลุ่มข้อมูลเพียง 2 หมวด (เช่น บทความนานาชาติ vs บทความในประเทศ) **ห้ามใช้ Grid 3 คอลัมน์ (`md:grid-cols-3`)** เพราะจะเกิดพื้นที่ว่างเปล่าขนาดใหญ่ทางขวา
   - ใช้ **Balanced 2-Column Grid (`grid-cols-1 md:grid-cols-2`)** เสมอ เพื่อให้การ์ดมีความกว้างเหมาะสมและอ่านชื่อบทความยาวได้สบายตา
2. **Segmented Control Filter Tabs**:
   - ใช้แท็บกรองสไตล์ Segmented Control ด้านบน: `[ทั้งหมด | บทความนานาชาติ | บทความในประเทศ]`
   - มี Badge ตัวเลขนับจำนวนแบบ Dynamic และเปลี่ยนสถานะ Active ด้วย CSS Transition
3. **Year Badges & Semantic Tags**:
   - แสดงปี พ.ศ./ค.ศ. ที่มุมขวาบนของการ์ดทุกใบเพื่อความรวดเร็วในการกวาดสายตา (Scannability)
   - ใช้สี Badge แยกความแตกต่างตามระดับดัชนี เช่น ฐานข้อมูลนานาชาติ (Indigo/Blue) และฐานข้อมูลในประเทศ (Violet/Purple)
4. **Preserve Anchor IDs**:
   - คง `id="paper-..."` ของการ์ดแต่ละใบไว้เสมอ เพื่อรองรับการคลิกมาจาก Search Modal หรือการส่งลิงก์แฮชตรงจากภายนอก


---

## 9. Universal Classroom Live Quiz Architecture (`projects/kahoot-classroom/`)

When building or extending real-time classroom quiz and assessment tools for teachers across any subject:
1. **3-Mode Configurable Student Identification**:
   - **Mode A (Default — Classroom Numbers `1` to `N`)**: Default to `1–40` (configurable `2–100`) with instant quick-pick chips on mobile so students can join in one tap without typing.
   - **Mode B (Prefix + Number)**: Custom prefix such as `S01–S40`, `M01–M35`, or workshop `T01–T53`.
   - **Mode C (Custom Named Roster)**: Paste `เลขที่, ชื่อ-นามสกุล` from Excel/Google Sheets or upload CSV to display student names on Host badges, leaderboards, podiums, and exported CSV reports.
2. **Dynamic Room PIN & Dual-Sync Isolation**:
   - Scope both `BroadcastChannel` (`kahoot_universal_${ROOM_PIN}`) and WSS MQTT topics (`apisit-man/kahoot/universal_${ROOM_PIN}/host` and `/player`) by `roomPin`, and embed `?role=player&pin=${ROOM_PIN}&mode=${mode}&count=${count}` in the QR code so multiple classrooms can run concurrently without crosstalk.
3. **Gamified Speed Bonus & Item Analysis**:
   - Default scoring to **Gamified Speed Bonus** (`+10` base points for correct answer + `+5, +4, +3, +2, +1` for the top 5 fastest correct responders per question), with an option for Standard 1-point assessment mode and an end-of-game **Classroom Item Analysis** (% correct per question).
4. **Companion User Guide Page (`guide.html` via `target="_blank"`)**:
   - Complex classroom tools should provide a dedicated companion manual page (e.g., `projects/kahoot-classroom/guide.html`) accessible via a prominent **"📖 คู่มือใช้งาน"** button in the Header and Studio Action Bar that opens in a new tab (`target="_blank" rel="noopener noreferrer"`), allowing teachers to reference instructions, copy Excel/CSV templates, or copy Google Apps Script snippets without interrupting a live classroom session.
