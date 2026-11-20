import unittest, sys, json
from pathlib import Path
SKILL=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(SKILL/'scripts'))
from render import (
    inspect_story, fmt_srt_time, wrap_text, clusters, emblem, PALETTES,
    ease_out_back, make_paper_texture, draw_badge_pill, font_path,
    caption_font_path, parse_highlight_markup, map_lines_to_highlights, draw_source_pill
)
from story_to_json import build
class TestCore(unittest.TestCase):
    def test_five_shots(self):
        shots=inspect_story(json.loads((SKILL/'examples/sample-storyboard.json').read_text('utf8')))
        self.assertEqual(len(shots),5)
    def test_invalid_duration(self):
        with self.assertRaises(ValueError): inspect_story({'shots':[{'duration':0,'headline':'a','caption':'b'}]})
    def test_thai_cluster(self):
        self.assertEqual(''.join(clusters('แม่น้ำ')), 'แม่น้ำ')
    def test_story_import(self):
        b=build('ตัวอย่างแรก\nตัวอย่างสอง',30)
        self.assertEqual(len(b['shots']),2)
        self.assertEqual(sum(x['duration'] for x in b['shots']),30)
    def test_srt(self):
        self.assertEqual(fmt_srt_time(62.123),'00:01:02,123')
    def test_motifs(self):
        self.assertEqual(emblem('robot',PALETTES[0]).size,(520,520))
    def test_tts_import(self):
        import generate_tts
        self.assertIn("Puck", generate_tts.VOICE_MAP_EDGE)
        self.assertTrue(callable(generate_tts.align_shots_to_single_wav))
    def test_scene_art_import(self):
        import generate_scene_art
        self.assertTrue(callable(generate_scene_art.remove_background_cutout))
    def test_editorial_visuals(self):
        self.assertAlmostEqual(ease_out_back(1.0), 1.0, places=4)
        tex = make_paper_texture(120, 200, PALETTES[0], 0)
        self.assertEqual(tex.size, (120, 200))
        fp = font_path()
        cap_fp = caption_font_path()
        if fp:
            badge = draw_badge_pill("40% ไม่รู้ตัว!", fp, PALETTES[0], 1.0)
            self.assertIsNotNone(badge)
            src = draw_source_pill("ที่มา: กรมควบคุมโรค", cap_fp or fp, PALETTES[0], 1.0)
            self.assertIsNotNone(src)
    def test_highlight_markup(self):
        raw = "คนไทย **1 ใน 10** กำลังเสี่ยง **เบาหวาน**"
        plain, mask = parse_highlight_markup(raw)
        self.assertEqual(plain, "คนไทย 1 ใน 10 กำลังเสี่ยง เบาหวาน")
        self.assertEqual(len(plain), len(mask))
        self.assertTrue(mask[plain.index("1")])
        self.assertFalse(mask[0])
        mapped = map_lines_to_highlights(raw, ["คนไทย 1 ใน 10", "กำลังเสี่ยง เบาหวาน"])
        self.assertEqual(len(mapped), 2)
        self.assertTrue(any(mapped[0]))
        self.assertTrue(any(mapped[1]))
if __name__=='__main__':unittest.main()
