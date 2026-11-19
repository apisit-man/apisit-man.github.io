import unittest, sys, json
from pathlib import Path
SKILL=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(SKILL/'scripts'))
from render import inspect_story,fmt_srt_time,wrap_text,clusters,emblem,PALETTES
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
if __name__=='__main__':unittest.main()
