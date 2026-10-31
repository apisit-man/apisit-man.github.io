---
name: google-slides-generator
description: Create professional 16:9 Widescreen presentation slides (compatible with Google Slides & PowerPoint) using python-pptx with structured card layouts, typography hierarchy, IPST/academic color schemes, and speaker notes.
---

# Google Slides & Presentation Generator Skill

This skill provides comprehensive instructions for generating 16:9 Widescreen presentation files (`.pptx`) that import directly into Google Slides or Microsoft PowerPoint with professional formatting, visual hierarchy, card layouts, and speaker notes.

## Key Design Principles
1. **Aspect Ratio**: Always 16:9 Widescreen (13.333" x 7.5").
2. **Color Palette**:
   - Primary: `#003366` (Deep Navy)
   - Secondary: `#0099DA` (Sky Blue)
   - Accent 1: `#F26522` (Vibrant Orange)
   - Accent 2: `#10B981` (Science Green)
   - Accent 3: `#F59E0B` (Academic Gold)
   - Background: `#F8FAFC` (Clean White) or `#071E3D` (Dark Navy for Cover/Closing)
   - Card Surface: `#FFFFFF` with `#E2E8F0` border
   - Body Text: `#1E293B` (Dark Slate)
3. **Typography**:
   - Cover Title: 38-42 pt Bold
   - Slide Title: 28-30 pt Bold
   - Subtitle / Tag: 14-16 pt
   - Card Heading: 16-18 pt Bold
   - Card Body Text: 13.5-14.5 pt (Bold-Lead Bullets)
4. **Speaker Notes**: Every slide includes notes for presentation duration and speech script.

## 5. Anti-Column-Fatigue & Modern Layout Variety (Strict Rule)
- **Never repeat multi-column vertical cards on consecutive slides.** Relying only on 2/3/4-column cards makes decks look monotonous and boxy.
- **Rotate across non-column visual archetypes** across the deck:
  1. **Hero Banner + Horizontal Stacked Strips (`hero_quote_horizontal`)**: Full-width dark vision banner on top + 3 full-width horizontal rows with colored left header blocks.
  2. **Asymmetric Bento Box Grid (`bento_grid`)**: 1 large dark featured card on the left + 1 wide horizontal card on top-right + 2 smaller tinted square cards on bottom-right.
  3. **Central Hub & Spoke Diagram (`hub_spoke`)**: Central badge/hub connected via axis lines to 4 quadrant nodes.
  4. **Connected Horizontal Pipeline (`process_flow`)**: Numbered steps connected by directional arrows (`➔`) + a full-width bottom feedback loop banner.
  5. **Big Metric Callouts + Horizontal Spotlights (`stat_spotlight`)**: 3 large stat numbers (`28-34pt`) at the top + 2 full-width horizontal story stripes below.
  6. **Left Insight Panel + Stepped Roadmap (`stepped_roadmap`)**: Dark summary panel on the left + 3 stair-stepped horizontal roadmap bars on the right.
- **Reusable Reference Implementation**: Delegate to or reuse `.agents/skills/ipst-presentation-slides/scripts/generate_ipst_slides.py`, which implements all 7 layout archetypes natively.
