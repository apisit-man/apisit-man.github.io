import json

with open('projects/arrow-puzzle/generated_levels.json', 'r', encoding='utf-8') as f:
    levels = json.load(f)

print(f"Loaded {len(levels)} levels.")
dup_heads = 0
dup_any = 0
short_arrows = 0

for lvl_idx, lvl in enumerate(levels):
    for arr in lvl.get('arrows', []):
        pts = arr['points']
        if len(pts) < 2:
            short_arrows += 1
            print(f"Level {lvl_idx+1} arrow {arr['id']}: len < 2")
            continue
        p_head = pts[-1]
        p_prev = pts[-2]
        if p_head['x'] == p_prev['x'] and p_head['y'] == p_prev['y']:
            dup_heads += 1
            print(f"Level {lvl_idx+1} arrow {arr['id']}: HEAD IS IDENTICAL TO PREV! {p_head}")
        for i in range(len(pts) - 1):
            if pts[i]['x'] == pts[i+1]['x'] and pts[i]['y'] == pts[i+1]['y']:
                dup_any += 1

print(f"Results -> Total adjacent duplicates: {dup_any}, Duplicates at HEAD: {dup_heads}, Short: {short_arrows}")
