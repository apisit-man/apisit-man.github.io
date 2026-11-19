import argparse, json
from pathlib import Path
from render import inspect_story
ap=argparse.ArgumentParser();ap.add_argument('storyboard');a=ap.parse_args()
s=inspect_story(json.loads(Path(a.storyboard).read_text(encoding='utf-8-sig')))
print(f'Valid storyboard: {len(s)} shots; {sum(x["duration"] for x in s):.1f} seconds')
