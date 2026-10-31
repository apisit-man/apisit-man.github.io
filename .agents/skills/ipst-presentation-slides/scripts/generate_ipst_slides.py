"""
IPST Presentation Slides Generator Script (Modern Creative Non-Column Architecture)
Generate modern, executive, academic presentations in IPST (สสวท.) style without repetitive column fatigue.

Supported Layout Archetypes (`layout` key per slide):
1. "cover_modern"          - Asymmetric geometric hero cover with floating metric/agenda pills
2. "hero_quote_horizontal" - Full-width Deep Navy vision banner + 3 horizontal stacked strips
3. "bento_grid"            - Asymmetric Bento Grid (1 Large Dark Hero Box + 1 Wide Top Box + 2 Bottom Boxes)
4. "hub_spoke"             - Central Ecosystem Hub connected to 4 Quadrant Spoke Nodes
5. "process_flow"          - Connected 6-Stage Horizontal Pipeline Flow + Bottom Feedback Loop Banner
6. "stat_spotlight"        - 3 Giant Metric Callout Cards on top + 2 Full-Width Horizontal Spotlight Stripes
7. "stepped_roadmap"       - Left Dark Insight Panel + Right 3 Stepped Strategic Roadmap Bars
8. "cards"                 - Classic 2, 3, or 4 column cards (when symmetric comparison is needed)
9. "closing_modern"        - Midnight Navy closing banner with 3 horizontal official channel strips
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# IPST Official Color Palette
IPST_NAVY = RGBColor(0, 51, 102)            # #003366 Deep Royal Blue
IPST_DEEP = RGBColor(7, 30, 61)             # #071E3D Midnight Navy
IPST_CYAN = RGBColor(0, 153, 218)           # #0099DA Tech Cyan
IPST_CYAN_LIGHT = RGBColor(235, 248, 255)   # #EBF8FF Soft Cyan Tint
IPST_CYAN_BORDER = RGBColor(186, 230, 253)  # #BAE6FD
IPST_ORANGE = RGBColor(242, 101, 34)        # #F26522 Vibrant Orange
IPST_ORANGE_LIGHT = RGBColor(255, 247, 237) # #FFF7ED Soft Orange Tint
IPST_GREEN = RGBColor(16, 185, 129)         # #10B981 Science Green
IPST_GREEN_LIGHT = RGBColor(236, 253, 245)  # #ECFDF5 Soft Green Tint
IPST_GOLD = RGBColor(245, 158, 11)          # #F59E0B Academic Gold
IPST_GOLD_LIGHT = RGBColor(254, 252, 232)   # #FEFCE8 Soft Gold Tint

BG_LIGHT = RGBColor(241, 245, 249)          # #F1F5F9 Modern Crisp Slate Canvas
CARD_BG = RGBColor(255, 255, 255)           # #FFFFFF Pure White
CARD_BORDER = RGBColor(203, 213, 225)       # #CBD5E1 Clean Border
TEXT_DARK = RGBColor(15, 23, 42)            # #0F172A Deep Slate Ink
TEXT_SUB = RGBColor(71, 85, 105)            # #475569 Slate Mid
TEXT_MUTED = RGBColor(148, 163, 184)        # #94A3B8 Slate Muted
TEXT_WHITE = RGBColor(255, 255, 255)
TEXT_CYAN_BRIGHT = RGBColor(125, 211, 252)  # #7DD3FC Light Cyan on Dark Navy

ACCENT_MAP = {
    "navy": IPST_NAVY,
    "deep": IPST_DEEP,
    "cyan": IPST_CYAN,
    "orange": IPST_ORANGE,
    "green": IPST_GREEN,
    "gold": IPST_GOLD,
}

TINT_MAP = {
    "navy": IPST_CYAN_LIGHT,
    "cyan": IPST_CYAN_LIGHT,
    "orange": IPST_ORANGE_LIGHT,
    "green": IPST_GREEN_LIGHT,
    "gold": IPST_GOLD_LIGHT,
}

FONT_FAMILY = "Leelawadee UI"


def set_flat_shape(shape, fill_color, border_color=None, border_width=1):
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_width)
    else:
        shape.line.fill.background()


def resolve_accent(color_val):
    if isinstance(color_val, RGBColor):
        return color_val
    return ACCENT_MAP.get(str(color_val).lower(), IPST_NAVY)


def resolve_tint(color_val):
    return TINT_MAP.get(str(color_val).lower(), CARD_BG)


def add_bold_lead_bullet(tf, bold_prefix, normal_text, font_size=14, prefix_color=IPST_NAVY, text_color=TEXT_DARK, space_after=6):
    p = tf.add_paragraph()
    p.space_after = Pt(space_after)
    p.line_spacing = 1.22

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
    r2.font.color.rgb = text_color


def get_default_logo_path():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    skill_logo = os.path.join(os.path.dirname(script_dir), "assets", "Logo_IPST_transparent.png")
    if os.path.exists(skill_logo):
        return skill_logo
    cwd_logo = os.path.join(os.getcwd(), "Logo_IPST_transparent.png")
    return cwd_logo if os.path.exists(cwd_logo) else None


def create_ipst_header(slide, section_name, slide_num, total_slides, duration_str=None, logo_path=None):
    # Left Accent Pill + Section Tag
    tag = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.30), Inches(5.8), Inches(0.40))
    set_flat_shape(tag, IPST_NAVY, None)
    tf = tag.text_frame
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf.margin_left = Inches(0.20)
    p = tf.paragraphs[0]
    p.text = section_name
    p.font.name = FONT_FAMILY
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE

    # Slide Counter & Pacing Pill
    counter_label = f"สไลด์ {slide_num} / {total_slides}" + (f"  •  ⏱ {duration_str}" if duration_str else "")
    num_box = slide.shapes.add_textbox(Inches(8.5), Inches(0.32), Inches(3.15), Inches(0.38))
    p_n = num_box.text_frame.paragraphs[0]
    p_n.text = counter_label
    p_n.font.name = FONT_FAMILY
    p_n.font.size = Pt(11.5)
    p_n.font.bold = True
    p_n.font.color.rgb = TEXT_SUB
    p_n.alignment = PP_ALIGN.RIGHT

    # Top-Right Compact IPST Logo
    if logo_path and os.path.exists(logo_path):
        slide.shapes.add_picture(logo_path, Inches(11.9), Inches(0.18), height=Inches(0.66))


def render_cover_or_closing(slide, item, logo_path, is_closing=False):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    set_flat_shape(bg, IPST_DEEP if is_closing else IPST_NAVY, None)

    # Decorative Modern Right Architectural Shapes
    deco1 = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(12.85), 0, Inches(0.483), Inches(7.5))
    set_flat_shape(deco1, IPST_CYAN, None)
    deco2 = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(12.62), 0, Inches(0.23), Inches(7.5))
    set_flat_shape(deco2, IPST_GOLD if not is_closing else IPST_ORANGE, None)

    # Left Vertical Accent Strip next to Hero Title
    v_strip = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.85), Inches(2.38), Inches(0.14), Inches(2.15))
    set_flat_shape(v_strip, IPST_CYAN if not is_closing else IPST_GOLD, None)

    # Top-Left Rounded White Logo Card + Institution Identity
    if logo_path and os.path.exists(logo_path):
        logo_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.85), Inches(0.55), Inches(1.52), Inches(1.52))
        set_flat_shape(logo_card, CARD_BG, None)
        slide.shapes.add_picture(logo_path, Inches(0.95), Inches(0.62), width=Inches(1.32), height=Inches(1.36))

    org_tb = slide.shapes.add_textbox(Inches(2.60), Inches(0.68), Inches(9.5), Inches(1.35))
    org_tf = org_tb.text_frame
    org_tf.word_wrap = True
    p_org1 = org_tf.paragraphs[0]
    p_org1.text = item.get("kicker", "สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (สสวท.)")
    p_org1.font.name = FONT_FAMILY
    p_org1.font.size = Pt(18)
    p_org1.font.bold = True
    p_org1.font.color.rgb = IPST_GOLD

    p_org2 = org_tf.add_paragraph()
    p_org2.text = item.get("kicker_en", "The Institute for the Promotion of Teaching Science and Technology (IPST)")
    p_org2.font.name = FONT_FAMILY
    p_org2.font.size = Pt(13.5)
    p_org2.font.color.rgb = TEXT_CYAN_BRIGHT
    p_org2.space_before = Pt(4)

    # Hero Title & Subtitle
    tb = slide.shapes.add_textbox(Inches(1.20), Inches(2.32), Inches(11.0), Inches(2.3))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p1 = tf.paragraphs[0]
    p1.text = item.get("title", "")
    p1.font.name = FONT_FAMILY
    p1.font.size = Pt(38)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_WHITE
    p1.space_after = Pt(10)

    if item.get("subtitle"):
        p2 = tf.add_paragraph()
        p2.text = item.get("subtitle", "")
        p2.font.name = FONT_FAMILY
        p2.font.size = Pt(18.5)
        p2.font.bold = True
        p2.font.color.rgb = IPST_GOLD if is_closing else TEXT_CYAN_BRIGHT

    # Bottom Horizontal Strips (Instead of boxy columns)
    highlights = item.get("highlights", [])
    if highlights:
        start_y = Inches(4.82)
        strip_h = Inches(0.66)
        gap_y = Inches(0.12)
        strip_colors = [IPST_CYAN, IPST_GOLD, IPST_GREEN]

        for idx_h, (b_prefix, b_text) in enumerate(highlights[:3]):
            sy = start_y + idx_h * (strip_h + gap_y)
            ac = strip_colors[idx_h % len(strip_colors)]

            # Horizontal Glass-style Card
            row_bg = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.85), sy, Inches(11.35), strip_h)
            set_flat_shape(row_bg, IPST_DEEP if not is_closing else IPST_NAVY, ac, 1.5)

            # Left Pill Tag inside row
            pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.95), sy + Inches(0.10), Inches(3.15), strip_h - Inches(0.20))
            set_flat_shape(pill, ac, None)
            ptf = pill.text_frame
            ptf.vertical_anchor = MSO_ANCHOR.MIDDLE
            pp = ptf.paragraphs[0]
            pp.alignment = PP_ALIGN.CENTER
            pp.text = b_prefix.replace("•", "").strip().rstrip(":")
            pp.font.name = FONT_FAMILY
            pp.font.size = Pt(13.5)
            pp.font.bold = True
            pp.font.color.rgb = IPST_DEEP if ac == IPST_GOLD else TEXT_WHITE

            # Right Horizontal Description
            rtb = slide.shapes.add_textbox(Inches(4.30), sy + Inches(0.12), Inches(7.75), strip_h - Inches(0.20))
            rtf = rtb.text_frame
            rtf.word_wrap = True
            rtf.vertical_anchor = MSO_ANCHOR.MIDDLE
            rp = rtf.paragraphs[0]
            rp.text = b_text
            rp.font.name = FONT_FAMILY
            rp.font.size = Pt(14.5)
            rp.font.color.rgb = TEXT_WHITE


def render_hero_quote_horizontal(slide, item):
    # Top Full-Width Hero Vision Banner (No columns!)
    banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.10), Inches(11.733), Inches(1.42))
    set_flat_shape(banner, IPST_NAVY, None)

    left_bar = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.10), Inches(0.16), Inches(1.42))
    set_flat_shape(left_bar, IPST_GOLD, None)

    btb = slide.shapes.add_textbox(Inches(1.18), Inches(2.22), Inches(11.1), Inches(1.2))
    btf = btb.text_frame
    btf.word_wrap = True
    btf.margin_left = btf.margin_top = btf.margin_right = btf.margin_bottom = 0

    bp1 = btf.paragraphs[0]
    bp1.text = item.get("banner_kicker", "★ วิสัยทัศน์หลัก (NATIONAL VISION)")
    bp1.font.name = FONT_FAMILY
    bp1.font.size = Pt(13)
    bp1.font.bold = True
    bp1.font.color.rgb = IPST_GOLD
    bp1.space_after = Pt(4)

    bp2 = btf.add_paragraph()
    bp2.text = item.get("banner_quote", "")
    bp2.font.name = FONT_FAMILY
    bp2.font.size = Pt(18)
    bp2.font.bold = True
    bp2.font.color.rgb = TEXT_WHITE

    # 3 Full-Width Stacked Horizontal Strips Below
    rows = item.get("rows", [])
    start_y = Inches(3.72)
    row_h = Inches(1.02)
    gap_y = Inches(0.16)

    for r_idx, r_data in enumerate(rows[:3]):
        ry = start_y + r_idx * (row_h + gap_y)
        accent_rgb = resolve_accent(r_data.get("accent", "cyan"))

        row_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), ry, Inches(11.733), row_h)
        set_flat_shape(row_card, CARD_BG, accent_rgb, 1.75)

        # Left Colored Header Block inside the Horizontal Strip
        left_blk = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), ry, Inches(3.15), row_h)
        set_flat_shape(left_blk, accent_rgb, None)
        ltf = left_blk.text_frame
        ltf.word_wrap = True
        ltf.vertical_anchor = MSO_ANCHOR.MIDDLE
        ltf.margin_left = Inches(0.22)
        ltf.margin_right = Inches(0.15)

        lp1 = ltf.paragraphs[0]
        lp1.text = r_data.get("heading", "")
        lp1.font.name = FONT_FAMILY
        lp1.font.size = Pt(15.5)
        lp1.font.bold = True
        lp1.font.color.rgb = TEXT_WHITE

        if r_data.get("sub"):
            lp2 = ltf.add_paragraph()
            lp2.text = r_data["sub"]
            lp2.font.name = FONT_FAMILY
            lp2.font.size = Pt(11.5)
            lp2.font.color.rgb = IPST_GOLD_LIGHT if accent_rgb == IPST_NAVY else TEXT_WHITE

        # Right Horizontal Text Flow
        rtb = slide.shapes.add_textbox(Inches(4.18), ry + Inches(0.12), Inches(8.15), row_h - Inches(0.24))
        rtf = rtb.text_frame
        rtf.word_wrap = True
        rtf.vertical_anchor = MSO_ANCHOR.MIDDLE
        rtf.margin_left = rtf.margin_top = rtf.margin_right = rtf.margin_bottom = 0

        for b_idx, (b_prefix, b_text) in enumerate(r_data.get("bullets", [])):
            p = rtf.paragraphs[0] if b_idx == 0 else rtf.add_paragraph()
            p.space_after = Pt(3)
            r1 = p.add_run()
            r1.text = b_prefix + " "
            r1.font.name = FONT_FAMILY
            r1.font.size = Pt(14)
            r1.font.bold = True
            r1.font.color.rgb = accent_rgb

            r2 = p.add_run()
            r2.text = b_text
            r2.font.name = FONT_FAMILY
            r2.font.size = Pt(14)
            r2.font.color.rgb = TEXT_DARK


def render_bento_grid(slide, item):
    bento = item.get("bento", [])
    if len(bento) < 4:
        return

    # Box 0: Left Large Dark Navy Hero Bento Card (x=0.80, y=2.12, w=4.55, h=4.90)
    b0 = bento[0]
    hero = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.12), Inches(4.55), Inches(4.90))
    set_flat_shape(hero, IPST_NAVY, None)
    hero_top = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(2.12), Inches(4.55), Inches(0.12))
    set_flat_shape(hero_top, IPST_GOLD, None)

    htb = slide.shapes.add_textbox(Inches(1.12), Inches(2.40), Inches(3.95), Inches(4.4))
    htf = htb.text_frame
    htf.word_wrap = True
    htf.margin_left = htf.margin_top = htf.margin_right = htf.margin_bottom = 0

    hp_tag = htf.paragraphs[0]
    hp_tag.text = b0.get("tag", "CORE PILLAR 01 // ต้นน้ำการศึกษาชาติ")
    hp_tag.font.name = FONT_FAMILY
    hp_tag.font.size = Pt(12.5)
    hp_tag.font.bold = True
    hp_tag.font.color.rgb = IPST_GOLD
    hp_tag.space_after = Pt(6)

    hp_title = htf.add_paragraph()
    hp_title.text = b0.get("heading", "")
    hp_title.font.name = FONT_FAMILY
    hp_title.font.size = Pt(21)
    hp_title.font.bold = True
    hp_title.font.color.rgb = TEXT_WHITE
    hp_title.space_after = Pt(12)

    for b_prefix, b_text in b0.get("bullets", []):
        add_bold_lead_bullet(
            htf,
            b_prefix,
            b_text,
            font_size=14,
            prefix_color=TEXT_CYAN_BRIGHT,
            text_color=TEXT_WHITE,
            space_after=10,
        )

    # Box 1: Top-Right Wide Horizontal Bento Card (x=5.58, y=2.12, w=6.95, h=2.22)
    b1 = bento[1]
    ac1 = resolve_accent(b1.get("accent", "cyan"))
    card1 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.58), Inches(2.12), Inches(6.95), Inches(2.22))
    set_flat_shape(card1, CARD_BG, ac1, 2)

    badge1 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.82), Inches(2.34), Inches(2.4), Inches(0.36))
    set_flat_shape(badge1, ac1, None)
    bp1 = badge1.text_frame.paragraphs[0]
    bp1.alignment = PP_ALIGN.CENTER
    bp1.text = b1.get("tag", "PILLAR 02 // กลางน้ำ")
    bp1.font.name = FONT_FAMILY
    bp1.font.size = Pt(11.5)
    bp1.font.bold = True
    bp1.font.color.rgb = TEXT_WHITE

    tb1 = slide.shapes.add_textbox(Inches(5.82), Inches(2.78), Inches(6.48), Inches(1.45))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = tf1.margin_top = tf1.margin_right = tf1.margin_bottom = 0
    p1_t = tf1.paragraphs[0]
    p1_t.text = b1.get("heading", "")
    p1_t.font.name = FONT_FAMILY
    p1_t.font.size = Pt(17.5)
    p1_t.font.bold = True
    p1_t.font.color.rgb = IPST_NAVY
    p1_t.space_after = Pt(6)

    for b_prefix, b_text in b1.get("bullets", []):
        add_bold_lead_bullet(tf1, b_prefix, b_text, font_size=13.5, prefix_color=ac1, space_after=4)

    # Box 2 & Box 3: Bottom-Right Pair of Bento Cards (y=4.54, h=2.48, w=3.36 each)
    for idx_b, b_data in enumerate([bento[2], bento[3]]):
        bx = Inches(5.58) + idx_b * Inches(3.59)
        by = Inches(4.54)
        bw = Inches(3.36)
        bh = Inches(2.48)
        ac = resolve_accent(b_data.get("accent", "green" if idx_b == 0 else "orange"))
        tint = resolve_tint(b_data.get("accent", "green" if idx_b == 0 else "orange"))

        b_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, by, bw, bh)
        set_flat_shape(b_card, tint, ac, 2)

        bt = slide.shapes.add_textbox(bx + Inches(0.24), by + Inches(0.20), bw - Inches(0.48), bh - Inches(0.32))
        btf2 = bt.text_frame
        btf2.word_wrap = True
        btf2.margin_left = btf2.margin_top = btf2.margin_right = btf2.margin_bottom = 0

        ptag = btf2.paragraphs[0]
        ptag.text = b_data.get("tag", f"PILLAR 0{idx_b + 3}")
        ptag.font.name = FONT_FAMILY
        ptag.font.size = Pt(11.5)
        ptag.font.bold = True
        ptag.font.color.rgb = ac
        ptag.space_after = Pt(2)

        ptitle = btf2.add_paragraph()
        ptitle.text = b_data.get("heading", "")
        ptitle.font.name = FONT_FAMILY
        ptitle.font.size = Pt(16.5)
        ptitle.font.bold = True
        ptitle.font.color.rgb = IPST_NAVY
        ptitle.space_after = Pt(6)

        for b_prefix, b_text in b_data.get("bullets", []):
            add_bold_lead_bullet(btf2, b_prefix, b_text, font_size=13, prefix_color=ac, space_after=4)


def render_hub_spoke(slide, item):
    # Horizontal & Vertical Connector Bars through Center (cx=6.666, cy=4.55)
    h_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(3.5), Inches(4.50), Inches(6.33), Inches(0.10))
    set_flat_shape(h_line, IPST_CYAN, None)
    v_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(6.61), Inches(3.05), Inches(0.10), Inches(3.00))
    set_flat_shape(v_line, IPST_CYAN, None)

    # 4 Quadrant Spoke Cards (w=4.05, h=2.22)
    spokes = item.get("spokes", [])
    coords = [
        (Inches(0.80), Inches(2.12)),  # Top-Left
        (Inches(8.48), Inches(2.12)),  # Top-Right
        (Inches(0.80), Inches(4.78)),  # Bottom-Left
        (Inches(8.48), Inches(4.78)),  # Bottom-Right
    ]

    for idx_s, s_data in enumerate(spokes[:4]):
        sx, sy = coords[idx_s]
        sw, sh = Inches(4.05), Inches(2.22)
        ac = resolve_accent(s_data.get("accent", "navy"))

        scard = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, sx, sy, sw, sh)
        set_flat_shape(scard, CARD_BG, ac, 2)

        # Top Accent Pill
        s_strip = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, sx, sy, sw, Inches(0.10))
        set_flat_shape(s_strip, ac, None)

        stb = slide.shapes.add_textbox(sx + Inches(0.24), sy + Inches(0.20), sw - Inches(0.48), sh - Inches(0.30))
        stf = stb.text_frame
        stf.word_wrap = True
        stf.margin_left = stf.margin_top = stf.margin_right = stf.margin_bottom = 0

        sp_t = stf.paragraphs[0]
        sp_t.text = s_data.get("heading", "")
        sp_t.font.name = FONT_FAMILY
        sp_t.font.size = Pt(16)
        sp_t.font.bold = True
        sp_t.font.color.rgb = ac
        sp_t.space_after = Pt(6)

        for b_prefix, b_text in s_data.get("bullets", []):
            add_bold_lead_bullet(stf, b_prefix, b_text, font_size=13, prefix_color=IPST_NAVY, space_after=4)

    # Central Ecosystem Hub (x=5.02, y=3.48, w=3.30, h=2.14)
    hub_outer = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.02), Inches(3.48), Inches(3.30), Inches(2.14))
    set_flat_shape(hub_outer, IPST_CYAN, None)

    hub_inner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.12), Inches(3.58), Inches(3.10), Inches(1.94))
    set_flat_shape(hub_inner, IPST_NAVY, IPST_GOLD, 2)

    htf = hub_inner.text_frame
    htf.word_wrap = True
    htf.vertical_anchor = MSO_ANCHOR.MIDDLE
    hp1 = htf.paragraphs[0]
    hp1.alignment = PP_ALIGN.CENTER
    hp1.text = item.get("hub_kicker", "IPST DIGITAL HUB")
    hp1.font.name = FONT_FAMILY
    hp1.font.size = Pt(12)
    hp1.font.bold = True
    hp1.font.color.rgb = IPST_GOLD
    hp1.space_after = Pt(4)

    hp2 = htf.add_paragraph()
    hp2.alignment = PP_ALIGN.CENTER
    hp2.text = item.get("hub_title", "ระบบนิเวศการเรียนรู้\nยุคดิจิทัลและ AI")
    hp2.font.name = FONT_FAMILY
    hp2.font.size = Pt(17)
    hp2.font.bold = True
    hp2.font.color.rgb = TEXT_WHITE


def render_process_flow(slide, item):
    steps = item.get("steps", [])
    # Two Horizontal Flow Tracks (Track 1: Steps 1-3 at y=2.15, Track 2: Steps 4-6 at y=4.22)
    track_y = [Inches(2.15), Inches(4.22)]
    card_w = Inches(3.58)
    card_h = Inches(1.88)
    gap_x = Inches(0.49)

    # Background Horizontal Track Connector Bars
    for ty in track_y:
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(1.5), ty + Inches(0.90), Inches(10.3), Inches(0.08))
        set_flat_shape(bar, IPST_CYAN, None)

    for idx_st, st_data in enumerate(steps[:6]):
        row = idx_st // 3
        col = idx_st % 3
        sx = Inches(0.80) + col * (card_w + gap_x)
        sy = track_y[row]
        ac = resolve_accent(st_data.get("accent", "navy"))

        scard = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, sx, sy, card_w, card_h)
        set_flat_shape(scard, CARD_BG, ac, 2)

        # Number Pill Badge on Top-Left of Step
        nb = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, sx + Inches(0.20), sy + Inches(0.16), Inches(0.58), Inches(0.38))
        set_flat_shape(nb, ac, None)
        np = nb.text_frame.paragraphs[0]
        np.alignment = PP_ALIGN.CENTER
        np.text = f"0{idx_st + 1}"
        np.font.name = FONT_FAMILY
        np.font.size = Pt(13)
        np.font.bold = True
        np.font.color.rgb = TEXT_WHITE

        # Step Heading beside badge
        htb = slide.shapes.add_textbox(sx + Inches(0.88), sy + Inches(0.14), card_w - Inches(1.02), Inches(0.45))
        hp = htb.text_frame.paragraphs[0]
        hp.text = st_data.get("heading", "")
        hp.font.name = FONT_FAMILY
        hp.font.size = Pt(15.5)
        hp.font.bold = True
        hp.font.color.rgb = IPST_NAVY

        # Step Body Bullets
        btb = slide.shapes.add_textbox(sx + Inches(0.20), sy + Inches(0.62), card_w - Inches(0.40), card_h - Inches(0.70))
        btf = btb.text_frame
        btf.word_wrap = True
        btf.margin_left = btf.margin_top = btf.margin_right = btf.margin_bottom = 0
        for b_prefix, b_text in st_data.get("bullets", []):
            add_bold_lead_bullet(btf, b_prefix, b_text, font_size=13, prefix_color=ac, space_after=3)

        # Arrow Chevron between columns
        if col < 2:
            arr = slide.shapes.add_textbox(sx + card_w + Inches(0.05), sy + Inches(0.68), Inches(0.40), Inches(0.45))
            ap = arr.text_frame.paragraphs[0]
            ap.alignment = PP_ALIGN.CENTER
            ap.text = "➔"
            ap.font.name = FONT_FAMILY
            ap.font.size = Pt(20)
            ap.font.bold = True
            ap.font.color.rgb = ac

    # Bottom Full-Width Continuous Feedback Loop Banner
    fb = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(6.28), Inches(11.733), Inches(0.72))
    set_flat_shape(fb, IPST_NAVY, IPST_GOLD, 1.5)
    fbtf = fb.text_frame
    fbtf.vertical_anchor = MSO_ANCHOR.MIDDLE
    fbp = fbtf.paragraphs[0]
    fbp.alignment = PP_ALIGN.CENTER
    fbp.text = item.get(
        "feedback_banner",
        "↻ วงจรสะท้อนผลเชิงระบบ (Research-to-Policy Loop): ผลวิจัยจากชั้นเรียนจริง (ขั้นที่ 6) ถูกนำกลับมาปรับปรุงมาตรฐานหลักสูตรและสื่อ (ขั้นที่ 1) อย่างต่อเนื่อง",
    )
    fbp.font.name = FONT_FAMILY
    fbp.font.size = Pt(13.5)
    fbp.font.bold = True
    fbp.font.color.rgb = IPST_GOLD


def render_stat_spotlight(slide, item):
    # Top Row: 3 Big Number Callout Badges (y=2.12, h=1.42)
    stats = item.get("stats", [])
    stat_w = Inches(3.68)
    stat_h = Inches(1.42)
    gap_x = Inches(0.34)

    for idx_st, st in enumerate(stats[:3]):
        sx = Inches(0.80) + idx_st * (stat_w + gap_x)
        ac = resolve_accent(st.get("accent", "navy"))
        tint = resolve_tint(st.get("accent", "navy"))

        scard = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, sx, Inches(2.12), stat_w, stat_h)
        set_flat_shape(scard, tint, ac, 2)

        stb = slide.shapes.add_textbox(sx + Inches(0.22), Inches(2.20), stat_w - Inches(0.44), stat_h - Inches(0.16))
        stf = stb.text_frame
        stf.word_wrap = True
        stf.margin_left = stf.margin_top = stf.margin_right = stf.margin_bottom = 0

        p_num = stf.paragraphs[0]
        p_num.text = st.get("number", "")
        p_num.font.name = FONT_FAMILY
        p_num.font.size = Pt(28)
        p_num.font.bold = True
        p_num.font.color.rgb = ac
        p_num.space_after = Pt(2)

        p_lbl = stf.add_paragraph()
        p_lbl.text = st.get("label", "")
        p_lbl.font.name = FONT_FAMILY
        p_lbl.font.size = Pt(13)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = TEXT_DARK

    # Bottom Area: 2 Full-Width Horizontal Spotlight Stripes (y=3.74 and y=5.46, h=1.54 each)
    spotlights = item.get("spotlights", [])
    for idx_sp, sp in enumerate(spotlights[:2]):
        sy = Inches(3.74) + idx_sp * Inches(1.72)
        sh = Inches(1.54)
        ac = resolve_accent(sp.get("accent", "navy"))

        sp_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), sy, Inches(11.733), sh)
        set_flat_shape(sp_card, CARD_BG, ac, 2)

        # Left Colored Spotlight Header Block
        l_blk = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), sy, Inches(3.55), sh)
        set_flat_shape(l_blk, ac, None)
        ltf = l_blk.text_frame
        ltf.word_wrap = True
        ltf.vertical_anchor = MSO_ANCHOR.MIDDLE
        ltf.margin_left = Inches(0.24)
        ltf.margin_right = Inches(0.18)

        lp1 = ltf.paragraphs[0]
        lp1.text = sp.get("heading", "")
        lp1.font.name = FONT_FAMILY
        lp1.font.size = Pt(16.5)
        lp1.font.bold = True
        lp1.font.color.rgb = TEXT_WHITE

        if sp.get("sub"):
            lp2 = ltf.add_paragraph()
            lp2.text = sp["sub"]
            lp2.font.name = FONT_FAMILY
            lp2.font.size = Pt(11.5)
            lp2.font.color.rgb = TEXT_WHITE

        # Right Bullet Points inside Horizontal Stripe
        rtb = slide.shapes.add_textbox(Inches(4.55), sy + Inches(0.14), Inches(7.78), sh - Inches(0.28))
        rtf = rtb.text_frame
        rtf.word_wrap = True
        rtf.vertical_anchor = MSO_ANCHOR.MIDDLE
        rtf.margin_left = rtf.margin_top = rtf.margin_right = rtf.margin_bottom = 0

        for b_idx, (b_prefix, b_text) in enumerate(sp.get("bullets", [])):
            p = rtf.paragraphs[0] if b_idx == 0 else rtf.add_paragraph()
            p.space_after = Pt(4)
            r1 = p.add_run()
            r1.text = b_prefix + " "
            r1.font.name = FONT_FAMILY
            r1.font.size = Pt(13.5)
            r1.font.bold = True
            r1.font.color.rgb = ac

            r2 = p.add_run()
            r2.text = b_text
            r2.font.name = FONT_FAMILY
            r2.font.size = Pt(13.5)
            r2.font.color.rgb = TEXT_DARK


def render_stepped_roadmap(slide, item):
    # Left Dark Navy Insight Panel (x=0.80, y=2.12, w=4.15, h=4.90)
    left_data = item.get("left_panel", {})
    l_panel = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.80), Inches(2.12), Inches(4.15), Inches(4.90))
    set_flat_shape(l_panel, IPST_NAVY, None)

    l_top = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.80), Inches(2.12), Inches(4.15), Inches(0.12))
    set_flat_shape(l_top, IPST_CYAN, None)

    ltb = slide.shapes.add_textbox(Inches(1.08), Inches(2.38), Inches(3.60), Inches(4.45))
    ltf = ltb.text_frame
    ltf.word_wrap = True
    ltf.margin_left = ltf.margin_top = ltf.margin_right = ltf.margin_bottom = 0

    lp0 = ltf.paragraphs[0]
    lp0.text = left_data.get("tag", "GLOBAL BENCHMARK // มาตรฐานสากล")
    lp0.font.name = FONT_FAMILY
    lp0.font.size = Pt(12)
    lp0.font.bold = True
    lp0.font.color.rgb = IPST_GOLD
    lp0.space_after = Pt(6)

    lp1 = ltf.add_paragraph()
    lp1.text = left_data.get("heading", "")
    lp1.font.name = FONT_FAMILY
    lp1.font.size = Pt(20)
    lp1.font.bold = True
    lp1.font.color.rgb = TEXT_WHITE
    lp1.space_after = Pt(12)

    for b_prefix, b_text in left_data.get("bullets", []):
        add_bold_lead_bullet(
            ltf,
            b_prefix,
            b_text,
            font_size=13.5,
            prefix_color=TEXT_CYAN_BRIGHT,
            text_color=TEXT_WHITE,
            space_after=8,
        )

    # Right 3 Ascending Stepped Roadmap Bars (Staircase Progression)
    steps = item.get("roadmap_steps", [])
    # Visual staircase indenting rightward as we go from Phase 1 to Phase 3
    step_configs = [
        (Inches(5.20), Inches(2.12), Inches(6.73)),  # Phase 1
        (Inches(5.50), Inches(3.78), Inches(6.73)),  # Phase 2
        (Inches(5.80), Inches(5.44), Inches(6.73)),  # Phase 3
    ]

    for idx_r, r_data in enumerate(steps[:3]):
        rx, ry, rw = step_configs[idx_r]
        rh = Inches(1.50)
        ac = resolve_accent(r_data.get("accent", "cyan"))

        rcard = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, rx, ry, rw, rh)
        set_flat_shape(rcard, CARD_BG, ac, 2)

        # Left Step Pill
        spill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, rx + Inches(0.18), ry + Inches(0.18), Inches(1.65), Inches(0.36))
        set_flat_shape(spill, ac, None)
        sp_p = spill.text_frame.paragraphs[0]
        sp_p.alignment = PP_ALIGN.CENTER
        sp_p.text = r_data.get("phase", f"PHASE 0{idx_r + 1}")
        sp_p.font.name = FONT_FAMILY
        sp_p.font.size = Pt(11.5)
        sp_p.font.bold = True
        sp_p.font.color.rgb = TEXT_WHITE

        # Heading beside Phase Pill
        htb = slide.shapes.add_textbox(rx + Inches(1.98), ry + Inches(0.14), rw - Inches(2.15), Inches(0.42))
        hp = htb.text_frame.paragraphs[0]
        hp.text = r_data.get("heading", "")
        hp.font.name = FONT_FAMILY
        hp.font.size = Pt(16)
        hp.font.bold = True
        hp.font.color.rgb = IPST_NAVY

        # Body bullets inside roadmap step
        btb = slide.shapes.add_textbox(rx + Inches(0.20), ry + Inches(0.60), rw - Inches(0.40), rh - Inches(0.68))
        btf = btb.text_frame
        btf.word_wrap = True
        btf.margin_left = btf.margin_top = btf.margin_right = btf.margin_bottom = 0
        for b_prefix, b_text in r_data.get("bullets", []):
            add_bold_lead_bullet(btf, b_prefix, b_text, font_size=13.5, prefix_color=ac, space_after=3)


def render_classic_cards(slide, item):
    cards = item.get("cards", [])
    if not cards:
        return
    n_cols = len(cards)
    gap_val = 0.35 if n_cols <= 3 else 0.28
    gap = Inches(gap_val)
    card_w = Inches((11.733 - gap_val * (n_cols - 1)) / n_cols)
    card_h = Inches(4.85)
    card_y = Inches(2.15)

    for c_idx, card_data in enumerate(cards):
        accent_rgb = resolve_accent(card_data.get("accent", "navy"))
        card_x = Inches(0.8) + c_idx * (card_w + gap)

        c_shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, card_x, card_y, card_w, card_h)
        set_flat_shape(c_shape, CARD_BG, CARD_BORDER, 1.25)

        top_strip = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, card_x, card_y, card_w, Inches(0.10))
        set_flat_shape(top_strip, accent_rgb, None)

        pad_x = Inches(0.30 if n_cols <= 3 else 0.22)
        c_tb = slide.shapes.add_textbox(card_x + pad_x, card_y + Inches(0.26), card_w - (pad_x * 2), card_h - Inches(0.45))
        c_tf = c_tb.text_frame
        c_tf.word_wrap = True
        c_tf.margin_left = c_tf.margin_top = c_tf.margin_right = c_tf.margin_bottom = 0

        cp_title = c_tf.paragraphs[0]
        cp_title.text = card_data.get("heading", "")
        cp_title.font.name = FONT_FAMILY
        cp_title.font.size = Pt(17 if n_cols <= 3 else 16)
        cp_title.font.bold = True
        cp_title.font.color.rgb = accent_rgb
        cp_title.space_after = Pt(8)

        body_pt = 14 if n_cols <= 3 else 13.5
        for b_prefix, b_text in card_data.get("bullets", []):
            add_bold_lead_bullet(c_tf, b_prefix, b_text, font_size=body_pt, prefix_color=accent_rgb, space_after=8)


def create_ipst_deck(slides_data, output_path, logo_path=None):
    if logo_path is None:
        logo_path = get_default_logo_path()

    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]
    total_slides = len(slides_data)

    for idx, item in enumerate(slides_data):
        slide = prs.slides.add_slide(blank_layout)
        layout = item.get("layout", "")
        is_cover = item.get("is_cover", False) or layout == "cover_modern"
        is_closing = item.get("is_closing", False) or layout == "closing_modern"

        if is_cover or is_closing:
            render_cover_or_closing(slide, item, logo_path, is_closing=is_closing)
        else:
            bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
            set_flat_shape(bg, BG_LIGHT, None)

            create_ipst_header(
                slide,
                item.get("section", "สสวท. Academic Presentation"),
                idx + 1,
                total_slides,
                duration_str=item.get("duration"),
                logo_path=logo_path,
            )

            tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.82), Inches(11.73), Inches(1.18))
            tf = tb.text_frame
            tf.word_wrap = True
            tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

            p1 = tf.paragraphs[0]
            p1.text = item.get("title", "")
            p1.font.name = FONT_FAMILY
            p1.font.size = Pt(27)
            p1.font.bold = True
            p1.font.color.rgb = IPST_NAVY
            p1.space_after = Pt(3)

            p2 = tf.add_paragraph()
            p2.text = item.get("subtitle", "")
            p2.font.name = FONT_FAMILY
            p2.font.size = Pt(15)
            p2.font.bold = True
            p2.font.color.rgb = IPST_CYAN

            if layout == "hero_quote_horizontal":
                render_hero_quote_horizontal(slide, item)
            elif layout == "bento_grid":
                render_bento_grid(slide, item)
            elif layout == "hub_spoke":
                render_hub_spoke(slide, item)
            elif layout == "process_flow":
                render_process_flow(slide, item)
            elif layout == "stat_spotlight":
                render_stat_spotlight(slide, item)
            elif layout == "stepped_roadmap":
                render_stepped_roadmap(slide, item)
            else:
                render_classic_cards(slide, item)

        if "notes" in item:
            notes_slide = slide.notes_slide
            tf = notes_slide.notes_text_frame
            tf.text = f"[เวลาบรรยายโดยประมาณ]: {item.get('duration', '2 นาที')}\n\n[Speaker Notes / บทพูดวิทยากร]:\n{item['notes']}"

    prs.save(output_path)
    return output_path


def build_introduce_ipst_15min_deck(output_path="IPST_15Min_Official_Introduction.pptx"):
    slides_data = [
        # Slide 1: Asymmetric Hero Cover with Horizontal Agenda Pills (1.5 mins)
        {
            "layout": "cover_modern",
            "kicker": "สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (สสวท.) | กระทรวงศึกษาธิการ",
            "kicker_en": "The Institute for the Promotion of Teaching Science and Technology (IPST)",
            "title": "รู้จัก สสวท.: องค์กรหลักขับเคลื่อนการศึกษา\nวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยีของประเทศไทย",
            "subtitle": "ยกระดับสมรรถนะเยาวชนไทย สร้างฐานกำลังคนด้านวิทยาศาสตร์และนวัตกรรมสู่อนาคต (บรรยาย 15 นาที)",
            "highlights": [
                ("ช่วงที่ 1 (นาทีที่ 0–5)", "จุดยืนเชิงยุทธศาสตร์ วิสัยทัศน์ และสถาปัตยกรรม 4 ภารกิจหลักระดับชาติของ สสวท."),
                ("ช่วงที่ 2 (นาทีที่ 5–11)", "ระบบนิเวศสื่อดิจิทัล วงจรคุณภาพ 6 ขั้น ทุน พสวท. และโอลิมปิกวิชาการระดับโลก"),
                ("ช่วงที่ 3 (นาทีที่ 11–15)", "ศูนย์วิจัยประเมินผลนานาชาติ (PISA / TIMSS) และโรดแมปการศึกษาไทยในยุค AI"),
            ],
            "duration": "1.5 นาที",
            "notes": (
                "สวัสดีทุกท่านครับ/ค่ะ วันนี้เราจะพาท่านทำความรู้จักกับ สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี หรือ สสวท. (IPST) "
                "ภายในเวลา 15 นาที ผ่านดีไซน์สไลด์ยุคใหม่ที่สะท้อนภาพลักษณ์องค์กรนวัตกรรมทางการศึกษาของประเทศ"
            ),
        },
        # Slide 2: Hero Vision Banner + 3 Horizontal Stacked Strips (No Vertical Columns!) (2.0 mins)
        {
            "layout": "hero_quote_horizontal",
            "section": "ส่วนที่ 1: รู้จักองค์กร | วิสัยทัศน์และบทบาทหลักเชิงยุทธศาสตร์",
            "title": "กว่า 5 ทศวรรษแห่งการวางรากฐานวิทยาศาสตร์และเทคโนโลยีไทย",
            "subtitle": "จากจุดเริ่มต้นปี พ.ศ. 2515 สู่การเป็นองค์กรหลักในการยกระดับความฉลาดรู้ด้านวิทย์-คณิต-เทคโนโลยีของประเทศ",
            "banner_kicker": "★ วิสัยทัศน์องค์กร (IPST NATIONAL VISION)",
            "banner_quote": "“เป็นองค์กรหลักในการขับเคลื่อนและยกระดับคุณภาพการศึกษาวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยีของประเทศสู่มาตรฐานสากล เพื่อสร้างเยาวชนไทยให้เป็นนักคิดและนวัตกรในโลกยุคดิจิทัล”",
            "rows": [
                {
                    "heading": "จุดกำเนิดและสถานะองค์กร",
                    "sub": "Est. 1972 | Ministry of Education",
                    "accent": "navy",
                    "bullets": [
                        ("• หน่วยงานในกำกับกระทรวงศึกษาธิการ:", "ก่อตั้งเมื่อ พ.ศ. 2515 ด้วยความร่วมมือกับโครงการพัฒนาแห่งสหประชาชาติ (UNDP) และ UNESCO"),
                        ("• ความคล่องตัวเชิงวิชาการ:", "บริหารงานด้วยความเป็นอิสระทางวิชาการเพื่อบุกเบิกนวัตกรรมหลักสูตรและการสอนให้ทันการเปลี่ยนแปลงของโลก"),
                    ],
                },
                {
                    "heading": "พันธกิจหลักตามกฎหมาย",
                    "sub": "Core Statutory Mandates",
                    "accent": "cyan",
                    "bullets": [
                        ("• ต้นน้ำถึงปลายน้ำของการเรียนรู้:", "รับผิดชอบตั้งแต่การวิจัยพัฒนาหลักสูตร หนังสือเรียน สื่อดิจิทัล การพัฒนาครู ไปจนถึงการวัดและประเมินผล"),
                        ("• สร้างกำลังคนความสามารถพิเศษ:", "บริหารโครงการทุน พสวท. และคัดเลือกผู้แทนประเทศไทยเข้าแข่งขันโอลิมปิกวิชาการนานาชาติ"),
                    ],
                },
                {
                    "heading": "ค่านิยมและการทำงานเชิงรุก",
                    "sub": "Evidence-Based & Future-Ready",
                    "accent": "orange",
                    "bullets": [
                        ("• ขับเคลื่อนด้วยข้อมูลวิจัยจริง:", "ใช้ผลการประเมินระดับชาติและนานาชาติ (PISA/TIMSS) มาออกแบบนโยบายลดความเหลื่อมล้ำ"),
                        ("• ผสานเครือข่ายทั่วประเทศ:", "ทำงานร่วมกับมหาวิทยาลัย โรงเรียน และหน่วยงานภาครัฐ-เอกชนทั้งในและต่างประเทศ"),
                    ],
                },
            ],
            "duration": "2.0 นาที",
            "notes": (
                "สไลด์นี้แสดงวิสัยทัศน์หลักของ สสวท. ด้านบน และแบ่งโครงสร้างพันธกิจออกเป็น 3 แถบแนวนอน "
                "เพื่อให้เห็นพัฒนาการตั้งแต่ก่อตั้งในปี 2515 พันธกิจหลักตามกฎหมาย และวิธีการทำงานที่ยึดข้อมูลวิจัยเป็นฐาน"
            ),
        },
        # Slide 3: Asymmetric Bento Box Grid (4 Core Missions) (2.0 mins)
        {
            "layout": "bento_grid",
            "section": "ส่วนที่ 1: รู้จักองค์กร | สถาปัตยกรรม 4 ภารกิจหลัก (Bento Overview)",
            "title": "4 ภารกิจเสาหลักในการขับเคลื่อนระบบนิเวศการศึกษา SMT",
            "subtitle": "บูรณาการตั้งแต่ต้นน้ำ (มาตรฐานหลักสูตร) กลางน้ำ (ครูและชั้นเรียน) สู่การสร้างคนคุณภาพสูงและวิจัยระดับสากล",
            "bento": [
                {
                    "tag": "CORE PILLAR 01 // ต้นน้ำทางวิชาการ",
                    "heading": "วิจัยและพัฒนาหลักสูตร\nหนังสือเรียน และสื่อมาตรฐาน",
                    "bullets": [
                        ("• มาตรฐานหลักสูตรแกนกลาง:", "กำหนดตัวชี้วัดและสาระการเรียนรู้วิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยี ตั้งแต่ปฐมวัยถึงมัธยมปลาย"),
                        ("• หนังสือเรียนและคู่มือครู:", "พัฒนาสื่อการเรียนรู้ที่เน้นการสืบเสาะหาความรู้ (Inquiry) และการคิดวิเคราะห์แก้ปัญหา"),
                        ("• บุกเบิกวิชาแห่งอนาคต:", "ริเริ่มวิชาวิทยาการคำนวณ (Computing Science) การออกแบบและเทคโนโลยี และ AI Literacy"),
                    ],
                },
                {
                    "tag": "PILLAR 02 // กลางน้ำ: ยกระดับวิชาชีพครู",
                    "heading": "การพัฒนาครู บุคลากรทางการศึกษา และเครือข่ายชั้นเรียนทั่วประเทศ",
                    "accent": "cyan",
                    "bullets": [
                        ("• อบรมเชิงปฏิบัติการและระบบออนไลน์:", "พัฒนาสมรรถนะครูให้จัดการเรียนรู้เชิงรุก (Active Learning) และใช้สื่อดิจิทัลในชั้นเรียนได้จริง"),
                        ("• เครือข่ายครูแกนนำและศูนย์พี่เลี้ยง:", "สร้างชุมชนการเรียนรู้ทางวิชาชีพ (PLC) ร่วมกับมหาวิทยาลัยและโรงเรียนศูนย์ขยายผลทุกภูมิภาค"),
                    ],
                },
                {
                    "tag": "PILLAR 03 // อัจฉริยภาพ",
                    "heading": "บ่มเพาะผู้มีความสามารถพิเศษ",
                    "accent": "green",
                    "bullets": [
                        ("• ทุน พสวท. (DPST):", "สร้างนักวิจัยระดับปริญญาเอกเพื่อเป็นกำลังหลักของประเทศ"),
                        ("• โอลิมปิกวิชาการโลก:", "ส่งผู้แทนไทยแข่งขัน 5 สาขาวิชาในเวทีนานาชาติ"),
                    ],
                },
                {
                    "tag": "PILLAR 04 // มาตรฐานสากล",
                    "heading": "วิจัยและประเมินผลนานาชาติ",
                    "accent": "orange",
                    "bullets": [
                        ("• ศูนย์แห่งชาติ PISA & TIMSS:", "ประเมินสมรรถนะนักเรียนร่วมกับ OECD และ IEA"),
                        ("• ชี้เป้านโยบายระดับชาติ:", "วิเคราะห์ข้อมูลเพื่อลดช่องว่างคุณภาพการศึกษา"),
                    ],
                },
            ],
            "duration": "2.0 นาที",
            "notes": (
                "แทนที่จะวางเป็นคอลัมน์เท่าๆ กัน เราจัดวางแบบ Bento Grid โดยให้กล่องใหญ่ด้านซ้ายคือหัวใจต้นน้ำของ สสวท. "
                "คือการทำหลักสูตรและสื่อ ส่วนด้านขวาคือการขยายผลสู่ครู การดูแลเด็กอัจฉริยภาพ และการประเมินผลระดับโลก"
            ),
        },
        # Slide 4: Central Hub & Spoke Ecosystem Diagram (2.0 mins)
        {
            "layout": "hub_spoke",
            "section": "ส่วนที่ 2: นวัตกรรมการเรียนรู้ | ระบบนิเวศดิจิทัลและสื่อสมัยใหม่",
            "title": "ระบบนิเวศนวัตกรรมการเรียนรู้ดิจิทัลของ สสวท.",
            "subtitle": "เชื่อมโยงหลักสูตรฐานสมรรถนะเข้ากับแพลตฟอร์มออนไลน์ ห้องปฏิบัติการเสมือน และความฉลาดรู้ด้าน AI",
            "hub_kicker": "IPST LEARNING HUB",
            "hub_title": "ระบบนิเวศการเรียนรู้\nยุคดิจิทัลและ AI",
            "spokes": [
                {
                    "heading": "01 // วิทยาการคำนวณ & Design Thinking",
                    "accent": "navy",
                    "bullets": [
                        ("• การคิดเชิงคำนวณ (Computational Thinking):", "ปูพื้นฐานการแก้ปัญหาอย่างเป็นขั้นตอนและการเขียนโปรแกรมตั้งแต่ระดับประถมศึกษา"),
                        ("• การออกแบบและเทคโนโลยี:", "ฝึกกระบวนการคิดเชิงออกแบบเพื่อสร้างชิ้นงานแก้ปัญหาจริง"),
                    ],
                },
                {
                    "heading": "02 // แพลตฟอร์ม Project 14 & SciMath",
                    "accent": "cyan",
                    "bullets": [
                        ("• Project 14 เรียนฟรีทุกที่ทุกเวลา:", "คลังวิดีโอการสอนออนไลน์ตรงตามหลักสูตร ช่วยลดความเหลื่อมล้ำทั่วประเทศ"),
                        ("• คลังความรู้ SciMath:", "แหล่งรวมแผนการสอน บทความวิชาการ และสื่อมัลติมีเดียสำหรับครูและนักเรียน"),
                    ],
                },
                {
                    "heading": "03 // ห้องปฏิบัติการเสมือน & Interactive Sim",
                    "accent": "green",
                    "bullets": [
                        ("• สถานการณ์จำลองเชิงโต้ตอบ:", "เปลี่ยนสมการและแนวคิดนามธรรมให้เป็นภาพจำลอง 2D/3D ที่ปรับตัวแปรและทดลองได้ทันที"),
                        ("• ชุดทดลองวิทยาศาสตร์มาตรฐาน:", "ออกแบบอุปกรณ์ปฏิบัติการที่ปลอดภัยและประยุกต์ใช้วัสดุในท้องถิ่นได้"),
                    ],
                },
                {
                    "heading": "04 // สะเต็มศึกษา (STEM) & AI Literacy",
                    "accent": "orange",
                    "bullets": [
                        ("• บูรณาการข้ามศาสตร์สู่โลกอาชีพ:", "เชื่อมโยงวิทย์-คณิต-เทคโนโลยีเข้ากับโจทย์ชุมชน สิ่งแวดล้อม และอุตสาหกรรมยุคใหม่"),
                        ("• กรอบสมรรถนะ AI Literacy:", "สร้างภูมิคุ้มกันการคิดวิพากษ์และการใช้ AI อย่างสร้างสรรค์และมีจริยธรรม"),
                    ],
                },
            ],
            "duration": "2.0 นาที",
            "notes": (
                "สไลด์นี้ใช้แผนภาพ Hub & Spoke โดยมีระบบนิเวศดิจิทัลของ สสวท. เป็นแกนกลาง เชื่อมโยง 4 มิติสำคัญ "
                "ได้แก่ วิชาวิทยาการคำนวณ แพลตฟอร์ม Project 14/SciMath ห้องปฏิบัติการเสมือน และการบูรณาการ STEM & AI Literacy"
            ),
        },
        # Slide 5: Connected 6-Stage Horizontal Pipeline Flow (2.0 mins)
        {
            "layout": "process_flow",
            "section": "ส่วนที่ 2: นวัตกรรมการเรียนรู้ | วงจรขับเคลื่อนคุณภาพครบวงจร",
            "title": "สายพานการขับเคลื่อนคุณภาพการศึกษา 6 ขั้นตอนของ สสวท.",
            "subtitle": "กระบวนการทำงานต่อเนื่องตั้งแต่การวิจัยกำหนดมาตรฐาน ไปจนถึงการติดตามผลในชั้นเรียนเพื่อพัฒนาต่อเนื่อง",
            "steps": [
                {
                    "heading": "วิจัยและกำหนดมาตรฐาน",
                    "accent": "navy",
                    "bullets": [
                        ("• วิเคราะห์แนวโน้มโลก:", "ออกแบบกรอบสมรรถนะและตัวชี้วัดที่ทันสมัย"),
                        ("• เชื่อมโยงทุกช่วงชั้น:", "วางลำดับพัฒนาการเรียนรู้ปฐมวัย–ม.ปลาย"),
                    ],
                },
                {
                    "heading": "สร้างสื่อและนวัตกรรม",
                    "accent": "cyan",
                    "bullets": [
                        ("• หนังสือเรียนและดิจิทัล:", "ผลิตสื่อมาตรฐานและ Interactive Simulation"),
                        ("• ทดลองใช้จริง (Pilot):", "นำร่องในโรงเรียนเครือข่ายก่อนขยายผล"),
                    ],
                },
                {
                    "heading": "พัฒนาครูและผู้นำวิชาการ",
                    "accent": "green",
                    "bullets": [
                        ("• อบรมเชิงปฏิบัติการ:", "เน้นให้ครูลงมือทดลองและออกแบบการสอน"),
                        ("• ระบบอบรมออนไลน์:", "ขยายผลครอบคลุมครูทั่วประเทศ"),
                    ],
                },
                {
                    "heading": "สร้างชุมชนวิชาชีพ (PLC)",
                    "accent": "orange",
                    "bullets": [
                        ("• ศูนย์พี่เลี้ยงระดับภูมิภาค:", "โค้ชชิ่งและเปิดชั้นเรียน (Lesson Study)"),
                        ("• เครือข่ายครูแกนนำ:", "แลกเปลี่ยนแนวปฏิบัติที่ดีระหว่างโรงเรียน"),
                    ],
                },
                {
                    "heading": "วัดและประเมินสมรรถนะ",
                    "accent": "gold",
                    "bullets": [
                        ("• Formative Assessment:", "วินิจฉัยความเข้าใจคลาดเคลื่อนระหว่างเรียน"),
                        ("• ข้อสอบวัดการคิดขั้นสูง:", "ประเมินการแก้ปัญหาในสถานการณ์จริง"),
                    ],
                },
                {
                    "heading": "วิจัยติดตามและปรับปรุง",
                    "accent": "navy",
                    "bullets": [
                        ("• วิจัยผลการใช้หลักสูตร:", "เก็บข้อมูลเชิงประจักษ์จากห้องเรียนทั่วไทย"),
                        ("• ข้อเสนอแนะเชิงนโยบาย:", "ป้อนกลับเพื่อยกระดับหลักสูตรรอบถัดไป"),
                    ],
                },
            ],
            "feedback_banner": "↻ วงจรสะท้อนผลเชิงระบบ (Continuous Improvement Loop): ข้อมูลวิจัยจากชั้นเรียนจริง (ขั้นที่ 6) ถูกนำกลับมาปรับปรุงมาตรฐานหลักสูตรและสื่อ (ขั้นที่ 1) อย่างต่อเนื่อง",
            "duration": "2.0 นาที",
            "notes": (
                "สไลด์นี้แสดงสายพานการทำงาน 6 ขั้นตอนที่มีลูกศรเชื่อมโยงต่อเนื่องกัน พร้อมแถบ Feedback Loop ด้านล่าง "
                "ชี้ให้เห็นว่าทุกครั้งที่นำหลักสูตรและสื่อลงสู่ห้องเรียน สสวท. จะมีงานวิจัยติดตามผลเพื่อนำกลับมาพัฒนาในรอบถัดไปเสมอ"
            ),
        },
        # Slide 6: Big Metric Callouts + 2 Horizontal Spotlight Stripes (2.0 mins)
        {
            "layout": "stat_spotlight",
            "section": "ส่วนที่ 3: การสร้างกำลังคนคุณภาพสูง | พสวท. และโอลิมปิกวิชาการ",
            "title": "การบ่มเพาะผู้มีความสามารถพิเศษและตัวแทนประเทศไทยระดับโลก",
            "subtitle": "สร้างนักวิทยาศาสตร์และนักวิจัยแนวหน้าของประเทศ พร้อมสร้างชื่อเสียงในเวทีโอลิมปิกวิชาการนานาชาติ",
            "stats": [
                {
                    "number": "40+ ปี พสวท.",
                    "label": "ทุนต่อเนื่อง ม.ปลาย ถึง ป.เอก สร้างนักวิจัยและอาจารย์มหาวิทยาลัยทั่วไทย",
                    "accent": "navy",
                },
                {
                    "number": "5 สาขาโอลิมปิก",
                    "label": "คณิตศาสตร์ ฟิสิกส์ เคมี ชีววิทยา และคอมพิวเตอร์ ในเวทีแข่งขันระดับโลก",
                    "accent": "gold",
                },
                {
                    "number": "77 จังหวัดทั่วไทย",
                    "label": "ขยายโอกาสการคัดเลือกและค่ายบ่มเพาะอัจฉริยภาพร่วมกับศูนย์ สอวน. และโรงเรียนศูนย์",
                    "accent": "cyan",
                },
            ],
            "spotlights": [
                {
                    "heading": "โครงการ พสวท. (DPST Scholarship)",
                    "sub": "Development & Promotion of Science and Technology Talents",
                    "accent": "navy",
                    "bullets": [
                        ("• ทุนการศึกษาต่อเนื่องครบวงจร:", "ดูแลนักเรียนผู้มีศักยภาพสูงตั้งแต่ระดับมัธยมศึกษาตอนปลาย ปริญญาตรี-โท-เอก ทั้งในและต่างประเทศ"),
                        ("• ค่ายวิชาการและทักษะการวิจัยเข้มข้น:", "ฝึกทำวิจัยร่วมกับนักวิทยาศาสตร์ชั้นนำ ปลูกฝังจิตวิญญาณนักวิจัยเพื่อกลับมาสร้างนวัตกรรมให้ประเทศ"),
                    ],
                },
                {
                    "heading": "โอลิมปิกวิชาการนานาชาติ (International Olympiads)",
                    "sub": "IMO • IPhO • IChO • IBO • IOI — Thailand National Team",
                    "accent": "orange",
                    "bullets": [
                        ("• คัดเลือกและอบรมผู้แทนประเทศไทย:", "ทำงานร่วมกับมูลนิธิ สอวน. และมหาวิทยาลัยชั้นนำ เพื่อเตรียมเยาวชนไทยสู่เวทีแข่งขันระดับโลก"),
                        ("• ยกระดับมาตรฐานวิชาการในประเทศ:", "นำองค์ความรู้และโจทย์ท้าทายระดับสากลมาพัฒนาเป็นสื่อเสริมศักยภาพและค่ายวิชาการแก่โรงเรียนทั่วประเทศ"),
                    ],
                },
            ],
            "duration": "2.0 นาที",
            "notes": (
                "สไลด์นี้ใช้ตัวเลขสถิติขนาดใหญ่ 3 กล่องด้านบนเพื่อดึงสายตาผู้ฟังทันที แล้วตามด้วยแถบ Spotlight แนวนอน 2 แถบด้านล่าง "
                "เพื่อเจาะลึกโครงการ พสวท. และโครงการโอลิมปิกวิชาการนานาชาติ"
            ),
        },
        # Slide 7: Left Global Benchmark Panel + Right 3 Stepped Roadmap Bars (2.0 mins)
        {
            "layout": "stepped_roadmap",
            "section": "ส่วนที่ 4: มาตรฐานสากลและอนาคต | PISA, TIMSS และโรดแมปยุค AI",
            "title": "การประเมินสมรรถนะระดับนานาชาติและโรดแมปสู่อนาคต",
            "subtitle": "ใช้ฐานข้อมูลการประเมินระดับโลกขับเคลื่อนการลดความเหลื่อมล้ำและยกระดับการเรียนรู้ด้วย AI",
            "left_panel": {
                "tag": "GLOBAL BENCHMARK // ศูนย์แห่งชาติ",
                "heading": "ศูนย์แห่งชาติโครงการ\nPISA และ TIMSS",
                "bullets": [
                    ("• ร่วมมือกับ OECD และ IEA:", "ดำเนินการประเมินความฉลาดรู้ด้านวิทยาศาสตร์ คณิตศาสตร์ และการอ่านของนักเรียนไทยเทียบกับมาตรฐานโลก"),
                    ("• พัฒนาระบบสอบดิจิทัล:", "สร้างคลังข้อสอบและระบบฝึกทักษะ Computer-Based Assessment ให้โรงเรียนทั่วประเทศใช้ฟรี"),
                    ("• ชี้เป้าลดความเหลื่อมล้ำ:", "วิเคราะห์ปัจจัยความสำเร็จเพื่อสนับสนุนโรงเรียนที่ต้องการการยกระดับเป็นพิเศษ"),
                ],
            },
            "roadmap_steps": [
                {
                    "phase": "STEP 01 // FOUNDATION",
                    "heading": "ลดช่องว่างและขยายโอกาสการเข้าถึงสื่อคุณภาพสูง",
                    "accent": "cyan",
                    "bullets": [
                        ("• สื่อดิจิทัลเข้าถึงทุกพื้นที่:", "ยกระดับคลังสื่อฟรีและชุดทดลองสำหรับโรงเรียนขนาดเล็กและพื้นที่ห่างไกล"),
                    ],
                },
                {
                    "phase": "STEP 02 // TRANSFORMATION",
                    "heading": "พลิกโฉมการจัดการเรียนรู้และการวัดสมรรถนะยุคดิจิทัล",
                    "accent": "green",
                    "bullets": [
                        ("• เน้นการคิดวิเคราะห์แก้ปัญหา:", "ขับเคลื่อนชั้นเรียนสืบเสาะหาความรู้และประเมินสมรรถนะด้วยสถานการณ์จริง"),
                    ],
                },
                {
                    "phase": "STEP 03 // AI FRONTIER",
                    "heading": "AI-Powered Learning & สมรรถนะเพื่อความยั่งยืน",
                    "accent": "orange",
                    "bullets": [
                        ("• การเรียนรู้รายบุคคลด้วย AI:", "พัฒนาเครื่องมือ AI ผู้ช่วยครูและติวเตอร์โสเครติส พร้อมรับมือโจทย์โลกสีเขียว"),
                    ],
                },
            ],
            "duration": "2.0 นาที",
            "notes": (
                "สไลด์ที่ 7 จัดวางแบบแผงข้อมูลเชิงลึกด้านซ้าย (PISA & TIMSS) คู่กับบันไดโรดแมป 3 ระยะด้านขวา "
                "แสดงทิศทางก้าวต่อไปของ สสวท. ตั้งแต่การลดความเหลื่อมล้ำ การยกระดับการวัดสมรรถนะดิจิทัล ไปจนถึงการใช้ AI เพื่อการเรียนรู้รายบุคคล"
            ),
        },
        # Slide 8: Modern Closing Banner with Horizontal Channel Strips (1.5 mins)
        {
            "layout": "closing_modern",
            "kicker": "สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยี (สสวท.)",
            "kicker_en": "924 ถนนสุขุมวิท แขวงพระโขนง เขตคลองเตย กรุงเทพมหานคร 10110 | โทร. 0-2392-4021",
            "title": "ร่วมขับเคลื่อนอนาคตการศึกษาไทย\nด้วยวิทยาศาสตร์ คณิตศาสตร์ และเทคโนโลยี",
            "subtitle": "ขอขอบคุณทุกท่าน | เปิดเวทีซักถามและแลกเปลี่ยนความคิดเห็น (Q&A Session)",
            "highlights": [
                ("เว็บไซต์หลัก สสวท.", "https://www.ipst.ac.th — ข่าวสาร หลักสูตร ประกาศทุน พสวท. และโครงการอบรมครูทั่วประเทศ"),
                ("แพลตฟอร์มการเรียนรู้ดิจิทัล", "Project 14 (proj14.ipst.ac.th) และคลังความรู้ SciMath (www.scimath.org)"),
                ("นิตยสารและสื่อวิชาการ สสวท.", "https://emagazine.ipst.ac.th — บทความวิชาการและนวัตกรรมการเรียนรู้ยุคใหม่"),
            ],
            "duration": "1.5 นาที",
            "notes": (
                "ขอขอบคุณทุกท่านที่ร่วมรับฟังภาพรวมของ สสวท. ตลอด 15 นาทีนี้ "
                "ทุกท่านสามารถเข้าถึงคลังสื่อดิจิทัลและติดตามข่าวสารได้ที่เว็บไซต์หลักของ สสวท. ยินดีรับฟังคำถามและข้อแลกเปลี่ยนครับ/ค่ะ"
            ),
        },
    ]
    return create_ipst_deck(slides_data, output_path)


if __name__ == "__main__":
    out = build_introduce_ipst_15min_deck("IPST_15Min_Official_Introduction.pptx")
    print(f"Saved modernized 15-minute IPST introduction deck to: {os.path.abspath(out)}")
