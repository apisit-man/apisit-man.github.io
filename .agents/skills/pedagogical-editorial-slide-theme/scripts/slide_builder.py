"""
Slide Builder Helper Module for Pedagogical Editorial Slide Theme
สคริปต์แม่แบบสร้างองค์ประกอบสไลด์สไตล์ Gemini Notebook / Critical AI Literacy
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN

# ==========================================
# 1. COLOR PALETTE DEFINITION (ระบบสี)
# ==========================================
# Backgrounds
BG_DEEP_NAVY = RGBColor(11, 25, 44)         # #0B192C (Dark Mode Main)
BG_LIGHT_BLUE = RGBColor(238, 242, 246)     # #EEF2F6 (Light Blueprint)
BG_WHITE = RGBColor(255, 255, 255)          # #FFFFFF

# Cards & Surfaces
SURFACE_DARK_NAVY = RGBColor(18, 38, 67)    # #122643
SURFACE_LIGHT_CARD = RGBColor(245, 248, 252)# #F5F8FC
BORDER_COOL_SLATE = RGBColor(180, 195, 210) # #B4C3D2
BORDER_TECH_BLUE = RGBColor(30, 60, 102)    # #1E3C66

# Editorial Accents (จุดเน้นลายมือ/ไฮไลต์)
ACCENT_CYBER_YELLOW = RGBColor(255, 230, 0) # #FFE600 (Cyber Highlight / Hand-annotation)
ACCENT_VIBRANT_ORANGE = RGBColor(255, 107, 0)# #FF6B00 (Contrast Callout)
ACCENT_TECH_CYAN = RGBColor(0, 210, 255)    # #00D2FF (Glow / Node Link)
ACCENT_STICKY_YELLOW = RGBColor(254, 240, 138) # #FEF08A (Sticky note card)

# Typography Colors
TEXT_TITLE_DARK = RGBColor(11, 25, 44)      # #0B192C
TEXT_TITLE_LIGHT = RGBColor(255, 255, 255)  # #FFFFFF
TEXT_BODY_DARK = RGBColor(30, 41, 59)       # #1E293B
TEXT_BODY_LIGHT = RGBColor(226, 232, 240)   # #E2E8F0
TEXT_MUTED_SLATE = RGBColor(100, 116, 139)  # #64748B

# Fonts
FONT_HEADING = "Prompt"       # หรือ IBM Plex Sans Thai / Google Sans
FONT_BODY = "Sarabun"         # หรือ Google Sans / Noto Sans Thai
FONT_ANNOTATION = "Itim"      # หรือ Charm / Mali (ลายมือสะดุดตา)
FONT_FALLBACK = "Leelawadee UI"

def create_presentation():
    """สร้าง Presentation ขนาด 16:9 มาตรฐาน (13.333 x 7.5 นิ้ว)"""
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    return prs

def set_slide_background(slide, color):
    """ตั้งค่าสีพื้นหลังเต็มสไลด์"""
    background = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5)
    )
    background.fill.solid()
    background.fill.fore_color.rgb = color
    background.line.fill.background()
    return background

def add_header(slide, title_text, kicker_text=None, is_dark_mode=False):
    """สร้าง Slide Header (Title + Kicker) แบบ Editorial Blueprint"""
    left = Inches(0.60)
    top = Inches(0.40)
    width = Inches(11.5)
    
    tb = slide.shapes.add_textbox(left, top, width, Inches(1.1))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    
    if kicker_text:
        p_kicker = tf.paragraphs[0]
        p_kicker.text = kicker_text
        p_kicker.font.name = FONT_HEADING
        p_kicker.font.size = Pt(12)
        p_kicker.font.bold = True
        p_kicker.font.color.rgb = ACCENT_TECH_CYAN if is_dark_mode else TEXT_MUTED_SLATE
        p_title = tf.add_paragraph()
    else:
        p_title = tf.paragraphs[0]
        
    p_title.text = title_text
    p_title.font.name = FONT_HEADING
    p_title.font.size = Pt(28)
    p_title.font.bold = True
    p_title.font.color.rgb = TEXT_TITLE_LIGHT if is_dark_mode else TEXT_TITLE_DARK

def add_banner_footer(slide, text, bg_color=SURFACE_DARK_NAVY, text_color=TEXT_TITLE_LIGHT, border_color=ACCENT_TECH_CYAN):
    """สร้างแถบ Banner ล่างสไลด์สำหรับสรุปประเด็นคม (Golden Takeaway Banner)"""
    left = Inches(0.60)
    top = Inches(6.50)
    width = Inches(12.133)
    height = Inches(0.65)
    
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(1.5)
    else:
        shape.line.fill.background()
        
    tf = shape.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.name = FONT_HEADING
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = text_color
    p.alignment = PP_ALIGN.CENTER
    return shape

def add_handwritten_callout(slide, text, left, top, width, height, color=ACCENT_CYBER_YELLOW, font_size=20):
    """สร้างกล่องข้อความลายมือแทรกคอมเมนต์สะกิดใจ (Handwritten Annotation)"""
    tb = slide.shapes.add_textbox(left, top, width, height)
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.name = FONT_ANNOTATION
    p.font.size = Pt(font_size)
    p.font.bold = True
    p.font.color.rgb = color
    return tb

def add_card(slide, left, top, width, height, bg_color, border_color=None, border_width=1.0):
    """สร้างกล่องการ์ดเนื้อหาพร้อมขอบเส้น"""
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_width)
    else:
        shape.line.fill.background()
    return shape
