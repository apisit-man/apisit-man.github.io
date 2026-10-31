---
name: ipst-academic-doc-theme
description: |
  Generate, format, and style formal Thai academic Word (.docx) documents, operational manuals,
  assessment guidelines, workshop handbooks, and paired PDF exports following IPST (สสวท.) and Thai
  academic publication standards. Use this skill whenever the user asks to:
  - Create, format, or style formal Word documents (.docx) or PDFs in Thai academic / IPST style.
  - Generate teacher operational manuals (คู่มือปฏิบัติการ), training handbooks (เอกสารประกอบการอบรม),
    curriculum frameworks, or policy/guideline documents.
  - Format assessment rubrics, observation checklists, student evidence matrices, or printable workshop forms.
  - Implement standard Thai typography with TH SarabunPSK / TH Sarabun New with explicit OpenXML <w:rFonts>
    (w:ascii, w:hAnsi, w:cs) ensuring zero font drift on Windows Word.
  - Apply the IPST academic color palette: Deep Royal Blue (#003366), Vibrant Teal (#00838F), Slate Navy (#0F172A),
    Light Slate Surface (#F1F5F9), and Amber accent (#D97706).
  - Export the generated .docx to a publication-ready PDF using Windows Word COM automation.
---

# IPST Academic Document Theme (คู่มือการสร้างเอกสารทางการและคู่มือปฏิบัติการ สสวท. ด้วย Word & PDF)

แนวทางการสร้าง จัดฟอร์แมต และออกแบบเอกสารวิชาการทางการ คู่มือปฏิบัติการสำหรับผู้จัดอบรม/ครู เอกสารประกอบการประชุมเชิงปฏิบัติการ และแบบประเมินสมรรถนะ ในรูปแบบ **Microsoft Word (.docx)** และ **PDF** ตามมาตรฐานของ **สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (สสวท. - IPST)** และมาตรฐานงานสารบรรณ/สิ่งพิมพ์ทางวิชาการไทย

---

## 1. ปรัชญาและมาตรฐานการจัดพิมพ์ (Design Philosophy & Specifications)

1. **ความเป็นทางการและสง่างาม (Dignified Academic Authority):** เหมาะสำหรับใช้เป็นคู่มือทางการ เอกสารประกอบหลักสูตร แฟ้มประเมินวิทยฐานะ หรือแจกจ่ายในเวทีการอบรมระดับชาติ
2. **ความถูกต้องสมบูรณ์ของภาษาไทย 100% (Zero Thai Font Drift):** แก้ปัญหาฟอนต์เพี้ยน สระลอย วรรณยุกต์ซ้อน หรือ Word สลับไปใช้ฟอนต์อื่น โดยการบังคับแท็ก OpenXML `<w:rFonts>` ทั้ง 3 ระบบ (`w:ascii`, `w:hAnsi`, `w:cs`) เป็น `TH SarabunPSK` เสมอ
3. **โครงสร้างอ่านง่ายและเป็นลำดับชั้น (Clear Visual Hierarchy):** มีการใช้สีประจำหน่วยงาน (IPST Blue & Teal) ตกแต่งหัวตาราง กล่องเน้นข้อความ (Callout Box) และแถบข้อสังเกตอย่างลงตัว
4. **พร้อมสั่งพิมพ์และแจกจ่ายได้ทันที (Print & Share Ready):** มีระยะขอบมาตรฐาน A4, หมายเลขหน้า, หัวกระดาษ/ท้ายกระดาษ, และมีภาคผนวกที่เป็นแบบฟอร์มพร้อมเช็กถูก `[  ]` และเส้นประเขียนตอบ

---

## 2. อัตลักษณ์และระบบสีทางการ (Official Academic Color Palette)

| บทบาทสี | ชื่อสี | รหัส HEX | ค่า RGB | วัตถุประสงค์การใช้งาน |
|---|---|:---:|:---:|---|
| **Primary Brand** | IPST Deep Royal Blue | `#003366` | `(0, 51, 102)` | หัวเรื่องเอกสาร (Doc Title), หัวข้อหลัก (H1), พื้นหลังหัวตาราง (Table Header) |
| **Secondary Accent** | Vibrant Teal | `#00838F` | `(0, 131, 143)` | หัวข้อย่อย (H2), สัญลักษณ์หัวข้อย่อย (Bullet Symbol), ขอบกล่องเน้น |
| **Dark Neutral** | Deep Slate Navy | `#0F172A` | `(15, 23, 42)` | ตัวอักษรเนื้อความหลัก (Body Text) ให้ความคมชัดและอ่านสบายตา |
| **Secondary Neutral**| Slate Gray | `#475569` | `(71, 85, 105)` | ข้อความหัว/ท้ายกระดาษ (Header/Footer), คำอธิบายเชิงอรรถ, ข้อความระบุสังกัด |
| **Surface Shading** | Slate Light Tint | `#F1F5F9` | `(241, 245, 249)` | พื้นหลังกล่องเน้นข้อความ (Callout Box), พื้นหลังแถวหัวข้อในตาราง |
| **Highlight Accent** | Warm Amber | `#D97706` | `(217, 119, 6)` | สัญลักษณ์ดาว (★), สมรรถนะเฉพาะไทย, ข้อความเตือนหรือข้อควรระวัง |
| **Subtle Border** | Slate Border Line | `#CBD5E1` | `(203, 213, 225)`| เส้นขอบตารางแนวนอนแบบบาง ช่วยแบ่งแถวข้อมูลอย่างประณีต |

---

## 3. ระบบตัวอักษรและระยะย่อหน้า (Typography & Paragraph Metrics)

### 3.1 สเกลขนาดตัวอักษรมาตรฐาน (TH SarabunPSK):
* **ชื่อเอกสารหลัก (Document Title):** `20 – 22 pt` (Bold, จัดกึ่งกลาง, สี Deep Royal Blue `#003366`)
* **ชื่อหน่วยงาน / ส่วนหัวปก:** `16 pt` (Bold, จัดกึ่งกลาง, สี Teal `#00838F`)
* **หัวข้อหลักระดับที่ 1 (Heading 1):** `18 pt` (Bold, ชิดซ้าย, สี Deep Royal Blue, เว้นก่อนหน้า 14pt, หลัง 4pt)
* **หัวข้อย่อยระดับที่ 2 (Heading 2):** `16.5 pt` (Bold, ชิดซ้าย, สี Vibrant Teal, เว้นก่อนหน้า 10pt, หลัง 2pt)
* **เนื้อความทั่วไป (Body Text):** `16 pt` (Regular, สี Deep Slate Navy `#0F172A`, ย่อหน้าบรรทัดแรก 0.5 นิ้ว / 1.27 ซม., ระยะบรรทัด 1.15 เท่า, เว้นหลังย่อหน้า 4pt)
* **ข้อความในตาราง (Table Text):**
  * หัวตาราง (Table Header): `14.5 – 15 pt` (Bold, ตัวหนังสือสีขาว บนพื้นสี Deep Royal Blue)
  * ข้อมูลในแถว (Table Data): `13.5 – 14 pt` (Regular, สี Deep Slate Navy)
* **หัวกระดาษและท้ายกระดาษ (Header & Footer):** `13 pt` (Regular, สี Slate Gray `#475569`)

### 3.2 กฎการตั้งค่า OpenXML เพื่อป้องกันฟอนต์เพี้ยน:
เมื่อใช้ `python-docx` ต้องแนบแท็ก `<w:rFonts>` ไปยัง run เสมอ:
```python
from docx.oxml import parse_xml
from docx.oxml.ns import qn, nsdecls

def apply_academic_font(run, font_name="TH SarabunPSK", size_pt=16, bold=False, italic=False, color_rgb=None):
    run.font.name = font_name
    run.font.size = Pt(size_pt)
    run.font.bold = bold
    run.font.italic = italic
    if color_rgb:
        run.font.color.rgb = color_rgb
    
    rPr = run._r.get_or_add_rPr()
    rFonts = rPr.find(qn('w:rFonts'))
    if rFonts is None:
        xml = f'<w:rFonts {nsdecls("w")} w:ascii="{font_name}" w:hAnsi="{font_name}" w:cs="{font_name}"/>'
        rPr.append(parse_xml(xml))
    else:
        rFonts.set(qn('w:ascii'), font_name)
        rFonts.set(qn('w:hAnsi'), font_name)
        rFonts.set(qn('w:cs'), font_name)
```

---

## 4. โครงสร้างและองค์ประกอบหลักของเอกสาร (Document Architecture)

เอกสารวิชาการหรือคู่มือปฏิบัติการที่สมบูรณ์ ควรมีโครงสร้าง 7 ส่วนหลัก:

```
[หน้าปกทางการ (Cover / Title Section)]
   ├── ตราสัญลักษณ์ สสวท. (Logo_IPST_transparent.png ขนาดกว้าง 1.2 นิ้ว)
   ├── ชื่อหน่วยงานและสังกัด (กระทรวงศึกษาธิการ)
   ├── ชื่อคู่มือ / โครงการ (20-22pt Bold)
   └── คำอธิบายบริบทและปี พ.ศ.
       ↓
[หมวดที่ 1: บทนำและหลักการประเมิน (Philosophy & Core Principles)]
   ├── วัตถุประสงค์เชิงสมรรถนะ
   └── กล่องเน้นหลักการ (Callout Box แถบสีด้านซ้ายหนา 24 sz พื้นสี Slate Light)
       ↓
[หมวดที่ 2: กรอบการประเมินครู 3 ระยะ (Teacher Assessment Toolkit)]
   ├── Input: การประเมินแผนการจัดการเรียนรู้ (พร้อมตารางเกณฑ์ Rubric 4 ระดับ)
   ├── Process: การสังเกตชั้นเรียนจริง (Classroom Walkthrough & Safety)
   └── Impact: แฟ้มสะท้อนคิดหลังสอน (AAR) และการมีส่วนร่วมในเครือข่าย PLC
       ↓
[หมวดที่ 3: เมทริกซ์ร่องรอยผลงานนักเรียน (Student Evidence Matrix)]
   └── ตาราง 4 คอลัมน์ (โดเมนความรู้, ร่องรอย ป.1-3, ร่องรอย ป.4-6, วิธีตรวจประเมิน)
       ↓
[หมวดที่ 4: ภารกิจพิเศษและจุดเน้นสำคัญ (High-Stakes Competencies)]
   └── เช่น สมรรถนะ 1.6 ★ ความปลอดภัยไซเบอร์ มิจฉาชีพ และ Deepfake (ระดับ ●● นำไปใช้)
       ↓
[หมวดที่ 5: แผนผังการปฏิบัติงานและขยายผล (Cascading Roadmap)]
   └── ตารางแผนงาน 4 เดือน (นิเทศติดตาม → PLC ถอดบทเรียน → นิทรรศการ Show & Share)
       ↓
[ภาคผนวก: เครื่องมือประเมินพร้อมพิมพ์ใช้งาน (Printable Appendices)]
   ├── แบบสังเกตชั้นเรียนเชิงกัลยาณมิตร พร้อมช่องเช็ก [  ] พบ / [  ] ไม่พบ
   └── ใบงานภารกิจ / แบบบันทึกสำหรับนักเรียน พร้อมเส้นประเขียนตอบ
```

---

## 5. การจัดรูปแบบตารางและกล่องเน้นข้อความ (Tables & Callout Boxes)

### 5.1 การจัดขอบตารางและ Padding (Table Formatting):
ตารางทางการของ สสวท. จะไม่ใช้เส้นขอบแนวตั้งทึบทุกช่อง (No heavy gridlines) แต่จะใช้เส้นแบ่งแนวนอนบางๆ สี Slate `#CBD5E1` และเปิดหัวตารางด้วยสีน้ำเงินเข้ม `#003366`:

```python
def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
    """กำหนดระยะขอบภายในเซลล์ (dxa: 20 dxa = 1 pt) ช่วยให้ตารางไม่อึดอัด"""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'  <w:top w:w="{top}" w:type="dxa"/>'
        f'  <w:bottom w:w="{bottom}" w:type="dxa"/>'
        f'  <w:left w:w="{left}" w:type="dxa"/>'
        f'  <w:right w:w="{right}" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)

def set_table_borders(table, hex_color="CBD5E1"):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'  <w:top w:val="single" w:sz="6" w:space="0" w:color="{hex_color}"/>'
        f'  <w:bottom w:val="single" w:sz="8" w:space="0" w:color="{hex_color}"/>'
        f'  <w:insideH w:val="single" w:sz="4" w:space="0" w:color="{hex_color}"/>'
        f'  <w:insideV w:val="none"/>'
        f'  <w:left w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)
```

### 5.2 การสร้างกล่องเน้นข้อความ (Accent Callout Box):
สร้างเป็นตาราง 1x1 ที่มีเส้นขอบหนาด้านซ้ายเส้นเดียว (ขนาด 24 sz) และพื้นหลังสีเทาอ่อน `#F1F5F9`:

```python
def add_callout_box(doc, title, text, bg_hex="F1F5F9", border_hex="003366"):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    table.columns[0].width = Inches(6.8)
    
    cell = table.cell(0, 0)
    set_cell_margins(cell, top=160, bottom=160, left=240, right=200)
    set_cell_background(cell, bg_hex)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'  <w:left w:val="single" w:sz="24" w:space="0" w:color="{border_hex}"/>'
        f'  <w:top w:val="none"/>'
        f'  <w:bottom w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    r_t = p.add_run(title + "\n")
    apply_academic_font(r_t, size_pt=16, bold=True, color_rgb=COLOR_PRIMARY)
    
    r_b = p.add_run(text)
    apply_academic_font(r_b, size_pt=15, bold=False, color_rgb=COLOR_DARK)
```

---

## 6. สคริปต์แปลง Word เป็น PDF อัตโนมัติ (Automated Word-to-PDF Conversion)

เมื่อสร้างไฟล์ `.docx` เสร็จเรียบร้อยแล้ว สามารถแปลงเป็น `.pdf` ด้วยความละเอียดสูงและฝังฟอนต์สมบูรณ์ผ่าน PowerShell Word COM Script:

```powershell
$docxPath = (Get-Item ".\your_document.docx").FullName
$pdfPath = [System.IO.Path]::ChangeExtension($docxPath, ".pdf")

$word = $null
$doc = $null
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Open($docxPath)
    $wdExportFormatPDF = 17
    $doc.ExportAsFixedFormat($pdfPath, $wdExportFormatPDF)
    Write-Host "Export successful: $pdfPath"
} finally {
    if ($doc -ne $null) { $doc.Close([ref]0) }
    if ($word -ne $null) {
        $word.Quit()
        [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
    }
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}
```

---

## 7. เช็กลิสต์ตรวจทานคุณภาพก่อนส่งมอบ (Quality Assurance Checklist)

* [ ] **ฟอนต์:** ตรวจสอบว่าทุก Paragraph, Run, และ Cell ใช้ `TH SarabunPSK` (มีทั้ง `w:ascii` และ `w:cs`)
* [ ] **ระยะขอบ:** หน้ากระดาษ A4 ขอบ 1.0 นิ้วรอบด้าน
* [ ] **โลโก้:** ใส่ภาพ `Logo_IPST_transparent.png` กว้างประมาณ 1.2 นิ้ว ที่หน้าปกจัดกึ่งกลาง
* [ ] **หัว/ท้ายกระดาษ:** ระบุชื่อคู่มือและสังกัด สสวท. ฟอนต์ 13pt สีเทา
* [ ] **ตาราง:** หัวตารางพื้นสี Deep Royal Blue `#003366` ตัวอักษรขาว มี padding เซลล์ไม่อึดอัด
* [ ] **ภาคผนวก:** มีแบบฟอร์มพร้อมพิมพ์แจก มีช่องเช็กถูก `[  ]` และเส้นประเขียนตอบ
* [ ] **PDF:** แปลงเป็น PDF เรียบร้อย และตรวจสอบว่าสระ/วรรณยุกต์ไม่ลอยหรือซ้อนกัน
