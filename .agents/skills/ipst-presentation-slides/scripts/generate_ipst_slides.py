"""
IPST Presentation Slides Generator Script (Reusable Utility)
Generate modern, professional, academic presentations in IPST (สสวท.) style.
Includes balanced typographic scale (3-Tier Hierarchy) and Bold-Lead Bullets.
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# IPST Official Color Palette
IPST_NAVY = RGBColor(0, 51, 102)          # #003366 Deep Royal Blue
IPST_DEEP = RGBColor(7, 30, 61)           # #071E3D Midnight Navy
IPST_CYAN = RGBColor(0, 153, 218)         # #0099DA Tech Cyan
IPST_CYAN_LIGHT = RGBColor(240, 249, 255)   # #F0F9FF Light Cyan Background
IPST_CYAN_BORDER = RGBColor(186, 230, 253)  # #BAE6FD
IPST_ORANGE = RGBColor(242, 101, 34)      # #F26522 Vibrant Orange
IPST_GREEN = RGBColor(16, 185, 129)       # #10B981 Science Green
IPST_GOLD = RGBColor(245, 158, 11)        # #F59E0B Academic Gold

BG_LIGHT = RGBColor(248, 250, 252)        # #F8FAFC Clean Slate Background
CARD_BG = RGBColor(255, 255, 255)         # #FFFFFF Pure White
CARD_BORDER = RGBColor(226, 232, 240)     # #E2E8F0 Subtle Border
TEXT_DARK = RGBColor(30, 41, 59)          # #1E293B Slate Dark
TEXT_SUB = RGBColor(71, 85, 105)          # #475569 Slate Mid
TEXT_MUTED = RGBColor(148, 163, 184)      # #94A3B8 Slate Muted
TEXT_WHITE = RGBColor(255, 255, 255)

FONT_FAMILY = "Leelawadee UI"

def set_flat_shape(shape, fill_color, border_color=None, border_width=1):
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_width)
    else:
        shape.line.fill.background()

def add_bold_lead_bullet(tf, bold_prefix, normal_text, font_size=14, prefix_color=IPST_NAVY, space_after=8):
    p = tf.add_paragraph()
    p.space_after = Pt(space_after)
    
    r1 = p.add_run()
    r1.text = bold_prefix + " "
    r1.font.name = FONT_FAMILY
    r1.font.size = Pt(font_size)
    r1.font.bold = True
    r1.font.color.rgb = prefix_color

    r2 = p.add_run()
    r2.text = normal_text
    r2.font.name = FONT_FAMILY
    r2.font.size = Pt(font_size)
    r2.font.bold = False
    r2.font.color.rgb = TEXT_DARK

def create_ipst_header(slide, section_name, slide_num, total_slides, logo_path=None):
    # Category Tag Badge (12pt Bold)
    tag = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.35), Inches(5.0), Inches(0.4))
    set_flat_shape(tag, IPST_CYAN_LIGHT, IPST_CYAN_BORDER, 1)
    tf = tag.text_frame
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]
    p.text = section_name
    p.font.name = FONT_FAMILY
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = IPST_NAVY

    # Counter
    num_box = slide.shapes.add_textbox(Inches(9.8), Inches(0.35), Inches(1.8), Inches(0.4))
    p_n = num_box.text_frame.paragraphs[0]
    p_n.text = f"สไลด์ {slide_num} จาก {total_slides}"
    p_n.font.name = FONT_FAMILY
    p_n.font.size = Pt(12)
    p_n.font.color.rgb = TEXT_SUB
    p_n.alignment = PP_ALIGN.RIGHT

    # Logo
    if logo_path and os.path.exists(logo_path):
        slide.shapes.add_picture(logo_path, Inches(11.9), Inches(0.22), height=Inches(0.68))

def create_ipst_deck(slides_data, output_path, logo_path=None):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]
    total_slides = len(slides_data)

    for idx, item in enumerate(slides_data):
        slide = prs.slides.add_slide(blank_layout)
        is_cover = item.get("is_cover", False)
        is_closing = item.get("is_closing", False)

        if is_cover or is_closing:
            bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
            set_flat_shape(bg, IPST_NAVY, None)

            top_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.12))
            set_flat_shape(top_line, IPST_CYAN, None)

            if logo_path and os.path.exists(logo_path):
                logo_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(0.65), Inches(1.6), Inches(1.6))
                set_flat_shape(logo_card, CARD_BG, None)
                slide.shapes.add_picture(logo_path, Inches(1.3), Inches(0.73), width=Inches(1.4), height=Inches(1.44))
        else:
            bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
            set_flat_shape(bg, BG_LIGHT, None)

            create_ipst_header(slide, item.get("section", "สสวท. Academic Workshop"), idx + 1, total_slides, logo_path)

            tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.73), Inches(1.15))
            tf = tb.text_frame
            tf.word_wrap = True
            tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
            
            p1 = tf.paragraphs[0]
            p1.text = item.get("title", "")
            p1.font.name = FONT_FAMILY
            p1.font.size = Pt(28)
            p1.font.bold = True
            p1.font.color.rgb = IPST_NAVY
            p1.space_after = Pt(4)

            p2 = tf.add_paragraph()
            p2.text = item.get("subtitle", "")
            p2.font.name = FONT_FAMILY
            p2.font.size = Pt(15)
            p2.font.color.rgb = IPST_CYAN

        if "notes" in item:
            notes_slide = slide.notes_slide
            tf = notes_slide.notes_text_frame
            tf.text = f"[เวลาบรรยายโดยประมาณ]: {item.get('duration', '4-5 นาที')}\n\n[Speaker Notes / บทพูดวิทยากร]:\n{item['notes']}"

    prs.save(output_path)
    return output_path
