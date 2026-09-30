import math
import random
import time
import json

DIRS = [{'x': 1, 'y': 0}, {'x': -1, 'y': 0}, {'x': 0, 'y': 1}, {'x': 0, 'y': -1}]

def get_mask(shape_type, w, h):
    cx = (w - 1) / 2.0
    cy = (h - 1) / 2.0
    valid = []
    
    if shape_type == 'circle':
        radius = (min(w, h) - 2.5) / 2.0
        for y in range(1, h - 1):
            for x in range(1, w - 1):
                if math.hypot(x - cx, y - cy) <= radius:
                    valid.append((x, y))
    elif shape_type == 'heart':
        rx = (w - 2.0) / 2.45
        ry = (h - 2.0) / 2.45
        cy_heart = cy + ry * 0.12
        for y in range(1, h - 1):
            for x in range(1, w - 1):
                u = (x - cx) / rx
                v = -(y - cy_heart) / ry
                term1 = u * u + v * v - 1.0
                if term1 * term1 * term1 - (u * u) * (v * v * v) <= 0.05:
                    valid.append((x, y))
    return set(valid)

def deduplicate_points(pts):
    clean = [pts[0]]
    for p in pts[1:]:
        if p['x'] != clean[-1]['x'] or p['y'] != clean[-1]['y']:
            clean.append(p)
    return clean

def compress_collinear(chain):
    pts = deduplicate_points(chain)
    if len(pts) <= 2:
        return pts
    compressed = [pts[0]]
    for i in range(1, len(pts) - 1):
        p_prev = compressed[-1]
        p_c = pts[i]
        p_next = pts[i+1]
        d1x = 1 if p_c['x'] > p_prev['x'] else (-1 if p_c['x'] < p_prev['x'] else 0)
        d1y = 1 if p_c['y'] > p_prev['y'] else (-1 if p_c['y'] < p_prev['y'] else 0)
        d2x = 1 if p_next['x'] > p_c['x'] else (-1 if p_next['x'] < p_c['x'] else 0)
        d2y = 1 if p_next['y'] > p_c['y'] else (-1 if p_next['y'] < p_c['y'] else 0)
        if d1x != d2x or d1y != d2y:
            compressed.append(p_c)
    compressed.append(pts[-1])
    return deduplicate_points(compressed)

def raycast_hit(head, dx, dy, target_arrow):
    pts = target_arrow['points']
    for i in range(len(pts) - 1):
        p1 = pts[i]
        p2 = pts[i+1]
        min_x, max_x = min(p1['x'], p2['x']), max(p1['x'], p2['x'])
        min_y, max_y = min(p1['y'], p2['y']), max(p1['y'], p2['y'])
        if dx > 0:
            if p1['x'] == p2['x'] and p1['x'] > head['x'] + 0.05 and min_y - 0.35 <= head['y'] <= max_y + 0.35:
                return True
            if p1['y'] == p2['y'] and abs(head['y'] - p1['y']) < 0.35 and max_x > head['x'] + 0.05:
                return True
        elif dx < 0:
            if p1['x'] == p2['x'] and p1['x'] < head['x'] - 0.05 and min_y - 0.35 <= head['y'] <= max_y + 0.35:
                return True
            if p1['y'] == p2['y'] and abs(head['y'] - p1['y']) < 0.35 and min_x < head['x'] - 0.05:
                return True
        elif dy > 0:
            if p1['y'] == p2['y'] and p1['y'] > head['y'] + 0.05 and min_x - 0.35 <= head['x'] <= max_x + 0.35:
                return True
            if p1['x'] == p2['x'] and abs(head['x'] - p1['x']) < 0.35 and max_y > head['y'] + 0.05:
                return True
        elif dy < 0:
            if p1['y'] == p2['y'] and p1['y'] < head['y'] - 0.05 and min_x - 0.35 <= head['x'] <= max_x + 0.35:
                return True
            if p1['x'] == p2['x'] and abs(head['x'] - p1['x']) < 0.35 and min_y < head['y'] - 0.05:
                return True
    return False

def check_self_obstruction(pts):
    head = pts[-1]
    prev = pts[-2]
    dx = 1 if head['x'] > prev['x'] else (-1 if head['x'] < prev['x'] else 0)
    dy = 1 if head['y'] > prev['y'] else (-1 if head['y'] < prev['y'] else 0)
    for i in range(len(pts) - 2):
        p1 = pts[i]
        p2 = pts[i+1]
        min_x, max_x = min(p1['x'], p2['x']), max(p1['x'], p2['x'])
        min_y, max_y = min(p1['y'], p2['y']), max(p1['y'], p2['y'])
        if dx > 0:
            if p1['x'] == p2['x'] and p1['x'] > head['x'] + 0.05 and min_y - 0.35 <= head['y'] <= max_y + 0.35: return True
            if p1['y'] == p2['y'] and abs(head['y'] - p1['y']) < 0.35 and max_x > head['x'] + 0.05: return True
        elif dx < 0:
            if p1['x'] == p2['x'] and p1['x'] < head['x'] - 0.05 and min_y - 0.35 <= head['y'] <= max_y + 0.35: return True
            if p1['y'] == p2['y'] and abs(head['y'] - p1['y']) < 0.35 and min_x < head['x'] - 0.05: return True
        elif dy > 0:
            if p1['y'] == p2['y'] and p1['y'] > head['y'] + 0.05 and min_x - 0.35 <= head['x'] <= max_x + 0.35: return True
            if p1['x'] == p2['x'] and abs(head['x'] - p1['x']) < 0.35 and max_y > head['y'] + 0.05: return True
        elif dy < 0:
            if p1['y'] == p2['y'] and p1['y'] < head['y'] - 0.05 and min_x - 0.35 <= head['x'] <= max_x + 0.35: return True
            if p1['x'] == p2['x'] and abs(head['x'] - p1['x']) < 0.35 and min_y < head['y'] - 0.05: return True
    return False

def check_has_cycle(adj):
    visited = {u: 0 for u in adj}
    def dfs(u):
        visited[u] = 1
        for v in adj.get(u, set()):
            if v not in visited: continue
            if visited[v] == 1: return True
            if visited[v] == 0:
                if dfs(v): return True
        visited[u] = 2
        return False
    for u in adj:
        if visited[u] == 0:
            if dfs(u): return True
    return False

def solve_check(arrows):
    remaining = set(a['id'] for a in arrows)
    order = []
    
    arrow_meta = {}
    for a in arrows:
        pts = a['points']
        head = pts[-1]
        prev = pts[-2]
        dx = 1 if head['x'] > prev['x'] else (-1 if head['x'] < prev['x'] else 0)
        dy = 1 if head['y'] > prev['y'] else (-1 if head['y'] < prev['y'] else 0)
        arrow_meta[a['id']] = {
            'head': head,
            'dx': dx,
            'dy': dy,
            'pts': pts
        }

    def is_blocked(a_id, active_set):
        meta = arrow_meta[a_id]
        head = meta['head']
        dx, dy = meta['dx'], meta['dy']
        
        for other_id in active_set:
            o_pts = arrow_meta[other_id]['pts']
            is_self = (other_id == a_id)
            seg_count = len(o_pts) - 2 if is_self else len(o_pts) - 1
            
            for i in range(seg_count):
                p1 = o_pts[i]
                p2 = o_pts[i+1]
                min_x, max_x = min(p1['x'], p2['x']), max(p1['x'], p2['x'])
                min_y, max_y = min(p1['y'], p2['y']), max(p1['y'], p2['y'])
                
                if dx > 0:
                    if p1['x'] == p2['x'] and p1['x'] > head['x'] + 0.05 and min_y - 0.35 <= head['y'] <= max_y + 0.35: return True
                    if p1['y'] == p2['y'] and abs(head['y'] - p1['y']) < 0.35 and max_x > head['x'] + 0.05: return True
                elif dx < 0:
                    if p1['x'] == p2['x'] and p1['x'] < head['x'] - 0.05 and min_y - 0.35 <= head['y'] <= max_y + 0.35: return True
                    if p1['y'] == p2['y'] and abs(head['y'] - p1['y']) < 0.35 and min_x < head['x'] - 0.05: return True
                elif dy > 0:
                    if p1['y'] == p2['y'] and p1['y'] > head['y'] + 0.05 and min_x - 0.35 <= head['x'] <= max_x + 0.35: return True
                    if p1['x'] == p2['x'] and abs(head['x'] - p1['x']) < 0.35 and max_y > head['y'] + 0.05: return True
                elif dy < 0:
                    if p1['y'] == p2['y'] and p1['y'] < head['y'] - 0.05 and min_x - 0.35 <= head['x'] <= max_x + 0.35: return True
                    if p1['x'] == p2['x'] and abs(head['x'] - p1['x']) < 0.35 and min_y < head['y'] - 0.05: return True
        return False

    initial_free = 0
    round_idx = 0
    while remaining:
        freed = [a_id for a_id in remaining if not is_blocked(a_id, remaining)]
        if not freed:
            return False, order, initial_free
        if round_idx == 0:
            initial_free = len(freed)
        chosen = freed[0]
        remaining.remove(chosen)
        order.append(chosen)
        round_idx += 1

    return True, order, initial_free

def generate_complex_level(shape_type, grid_n, target_arrows, min_arrows, max_initial_free, min_bends=4, max_bends=7, seed=None):
    if seed is not None:
        random.seed(seed)
        
    mask = get_mask(shape_type, grid_n, grid_n)
    valid_cells = list(mask)
    if not valid_cells:
        return None

    best_fallback = None

    for attempt_board in range(30):
        occupied = set()
        arrows = []
        adj = {}

        for attempt in range(2200):
            avail = [c for c in valid_cells if c not in occupied]
            if not avail: break
            start = random.choice(avail)

            # Choose archetype:
            # 0: Multi-turn Spiral (4-6 turns)
            # 1: Long Meandering Snake (4-6 turns)
            # 2: Interlocking Hairpin Wrap (3-5 turns)
            # 3: Winding Corridor (4-7 turns)
            # 4: Short Key (2 turns)
            arch = random.choices([0, 1, 2, 3, 4], weights=[32, 28, 20, 15, 5])[0]
            chain = [{'x': start[0], 'y': start[1]}]
            cur = chain[0]

            if arch == 0: # Multi-turn Spiral / Coil
                cw = random.random() > 0.5
                sdirs = [DIRS[0], DIRS[2], DIRS[1], DIRS[3]] if cw else [DIRS[0], DIRS[3], DIRS[1], DIRS[2]]
                sd_i = random.randint(0, 3)
                num_turns = random.randint(4, 6)
                lens = [random.randint(3, 5), random.randint(3, 4), random.randint(2, 4), random.randint(2, 3), random.randint(1, 2), 1][:num_turns]
                ok = True
                for i, l in enumerate(lens):
                    cd = sdirs[(sd_i + i) % 4]
                    for s in range(1, l + 1):
                        nx, ny = cur['x'] + cd['x'], cur['y'] + cd['y']
                        if (nx, ny) not in mask or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                            ok = False; break
                        chain.append({'x': nx, 'y': ny})
                        cur = chain[-1]
                    if not ok: break
                if not ok or len(chain) < 5: continue

            elif arch == 1: # Long Meandering Snake (Square Waves)
                md = random.choice(DIRS)
                cd = {'x': -md['y'], 'y': md['x']}
                steps = random.randint(3, 5)
                sgn = 1
                ok = True
                for _ in range(steps):
                    l_lat = random.randint(1, 3)
                    for _ in range(l_lat):
                        nx, ny = cur['x'] + cd['x'] * sgn, cur['y'] + cd['y'] * sgn
                        if (nx, ny) not in mask or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                            ok = False; break
                        chain.append({'x': nx, 'y': ny})
                        cur = chain[-1]
                    if not ok: break
                    l_fwd = random.randint(1, 3)
                    for _ in range(l_fwd):
                        nx, ny = cur['x'] + md['x'], cur['y'] + md['y']
                        if (nx, ny) not in mask or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                            ok = False; break
                        chain.append({'x': nx, 'y': ny})
                        cur = chain[-1]
                    if not ok: break
                    sgn = -sgn
                if not ok or len(chain) < 5: continue

            elif arch == 2: # Interlocking Hairpin Wrap
                d1 = random.choice(DIRS)
                perp = {'x': -d1['y'], 'y': d1['x']} if random.random() > 0.5 else {'x': d1['y'], 'y': -d1['x']}
                d2 = {'x': -d1['x'], 'y': -d1['y']}
                perp2 = {'x': -perp['x'], 'y': -perp['y']}
                ok = True
                path_segs = [(d1, random.randint(2, 4)), (perp, 1), (d2, random.randint(2, 4)), (perp2, 1), (d1, random.randint(1, 3))]
                for d, l in path_segs:
                    for _ in range(l):
                        nx, ny = cur['x'] + d['x'], cur['y'] + d['y']
                        if (nx, ny) not in mask or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                            ok = False; break
                        chain.append({'x': nx, 'y': ny})
                        cur = chain[-1]
                    if not ok: break
                if not ok or len(chain) < 5: continue

            elif arch == 3: # Winding Corridor (Multi-turn)
                bends = random.randint(min_bends, max_bends)
                last_d = None
                ok = True
                for _ in range(bends):
                    seg_l = random.randint(1, 3)
                    v_dirs = [d for d in DIRS if not (last_d and ((d['x'] == last_d['x'] and d['y'] == last_d['y']) or (d['x'] == -last_d['x'] and d['y'] == -last_d['y'])))]
                    random.shuffle(v_dirs)
                    chosen_d = None
                    for d in v_dirs:
                        can = True
                        for s in range(1, seg_l + 1):
                            nx, ny = cur['x'] + d['x'] * s, cur['y'] + d['y'] * s
                            if (nx, ny) not in mask or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                                can = False; break
                        if can:
                            chosen_d = d; break
                    if not chosen_d: break
                    for s in range(1, seg_l + 1):
                        chain.append({'x': cur['x'] + chosen_d['x'], 'y': cur['y'] + chosen_d['y']})
                    cur = chain[-1]
                    last_d = chosen_d
                if len(chain) < 4: continue

            else: # Short key
                d1 = random.choice(DIRS)
                perp = {'x': -d1['y'], 'y': d1['x']} if random.random() > 0.5 else {'x': d1['y'], 'y': -d1['x']}
                ok = True
                for d, l in [(d1, random.randint(1, 3)), (perp, random.randint(1, 2))]:
                    for _ in range(l):
                        nx, ny = cur['x'] + d['x'], cur['y'] + d['y']
                        if (nx, ny) not in mask or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                            ok = False; break
                        chain.append({'x': nx, 'y': ny})
                        cur = chain[-1]
                    if not ok: break
                if not ok or len(chain) < 2: continue

            # Compress collinear points with GUARANTEED DEDUPLICATION
            compressed = compress_collinear(chain)
            if len(compressed) < 2:
                continue
            if compressed[-1]['x'] == compressed[-2]['x'] and compressed[-1]['y'] == compressed[-2]['y']:
                continue

            if check_self_obstruction(compressed):
                continue

            new_id = len(arrows)
            new_arrow = {'id': new_id, 'points': compressed}
            head = compressed[-1]
            prev = compressed[-2]
            dx = 1 if head['x'] > prev['x'] else (-1 if head['x'] < prev['x'] else 0)
            dy = 1 if head['y'] > prev['y'] else (-1 if head['y'] < prev['y'] else 0)

            # Dependencies
            new_deps = set()
            for other in arrows:
                if raycast_hit(head, dx, dy, other):
                    new_deps.add(other['id'])

            current_free = sum(1 for a in arrows if len(adj.get(a['id'], set())) == 0)
            if current_free >= max_initial_free and len(new_deps) == 0:
                continue

            rev_deps = []
            for other in arrows:
                oh = other['points'][-1]
                op = other['points'][-2]
                odx = 1 if oh['x'] > op['x'] else (-1 if oh['x'] < op['x'] else 0)
                ody = 1 if oh['y'] > op['y'] else (-1 if oh['y'] < op['y'] else 0)
                if raycast_hit(oh, odx, ody, new_arrow):
                    rev_deps.append(other['id'])

            adj[new_id] = new_deps
            for oid in rev_deps:
                adj[oid].add(new_id)

            if check_has_cycle(adj):
                del adj[new_id]
                for oid in rev_deps:
                    adj[oid].remove(new_id)
                continue

            arrows.append(new_arrow)
            for p in chain:
                occupied.add((p['x'], p['y']))

            if len(arrows) >= target_arrows:
                break

        if len(arrows) >= int(min_arrows * 0.70):
            solv, order, initial_free = solve_check(arrows)
            if solv:
                for idx, a in enumerate(arrows): a['id'] = idx
                candidate = {
                    'w': grid_n,
                    'h': grid_n,
                    'shape': shape_type,
                    'arrows': arrows,
                    'initial_free': initial_free,
                    'order': order
                }
                if len(arrows) >= min_arrows and 1 <= initial_free <= max_initial_free:
                    return candidate
                if best_fallback is None or len(candidate['arrows']) > len(best_fallback['arrows']):
                    best_fallback = candidate

    return best_fallback

TITLES = {
    21: "Level 21 (Disc Awakening)",
    22: "Level 22 (Twin Spirals)",
    23: "Level 23 (Serpentine Disc)",
    24: "Level 24 (Vortex Lock)",
    25: "Level 25 (Mandala Matrix)",
    26: "Level 26 (Spiral Labyrinth)",
    27: "Level 27 (Centripetal Knot)",
    28: "Level 28 (Radial Cascade)",
    29: "Level 29 (Interlocking Combs)",
    30: "Level 30 (Tactical Pinnacle)",
    31: "Level 31 (Heartstring Overture)",
    32: "Level 32 (Cupid's Vortex)",
    33: "Level 33 (Crimson Coil)",
    34: "Level 34 (Dual Auricle Maze)",
    35: "Level 35 (Valentine Knot)",
    36: "Level 36 (Cardioid Matrix)",
    37: "Level 37 (Labyrinth of Hearts)",
    38: "Level 38 (Pulsing Labyrinth)",
    39: "Level 39 (Coronary Enigma)",
    40: "Level 40 (Heart of Eternity)"
}

def main():
    print("Generating High-Difficulty Campaign: Levels 21–30 (Circle) & Levels 31–40 (Heart)...", flush=True)
    results = []

    # Calibration table
    # (lvl, shape, grid_n, target_arrows, min_arrows, max_initial_free)
    specs = [
        # Levels 21-30: Circular Labyrinth (high complexity, 36-66 arrows, max 2-3 initial free)
        (21, 'circle', 21, 38, 34, 3),
        (22, 'circle', 21, 41, 36, 3),
        (23, 'circle', 22, 44, 38, 3),
        (24, 'circle', 22, 47, 41, 3),
        (25, 'circle', 23, 50, 44, 3),
        (26, 'circle', 23, 53, 47, 3),
        (27, 'circle', 24, 57, 50, 3),
        (28, 'circle', 25, 60, 52, 3),
        (29, 'circle', 25, 63, 55, 3),
        (30, 'circle', 26, 66, 58, 2),

        # Levels 31-40: Heart Labyrinth (รูปหัวใจ, 50-86 arrows, max 1-2 initial free!)
        (31, 'heart', 26, 54, 48, 2),
        (32, 'heart', 26, 58, 51, 2),
        (33, 'heart', 27, 62, 54, 2),
        (34, 'heart', 27, 65, 57, 2),
        (35, 'heart', 28, 69, 60, 2),
        (36, 'heart', 28, 73, 64, 2),
        (37, 'heart', 29, 77, 68, 2),
        (38, 'heart', 29, 80, 71, 2),
        (39, 'heart', 30, 84, 75, 2),
        (40, 'heart', 30, 88, 78, 2),
    ]

    for lvl_num, shape_type, gn, tgt, mn, mf in specs:
        t0 = time.time()
        lvl = None
        for seed_try in range(6):
            seed = lvl_num * 10007 + seed_try * 1543
            lvl = generate_complex_level(shape_type, gn, tgt, mn, mf, min_bends=4, max_bends=7, seed=seed)
            if lvl and len(lvl['arrows']) >= mn and lvl['initial_free'] <= mf:
                break
        if not lvl:
            lvl = generate_complex_level(shape_type, gn, tgt, mn - 4, mf + 1, min_bends=3, max_bends=6, seed=lvl_num * 999)

        lvl_data = {
            "title": TITLES[lvl_num],
            "w": lvl['w'],
            "h": lvl['h'],
            "shape": shape_type,
            "isCircular": (shape_type == 'circle'),
            "isHeart": (shape_type == 'heart'),
            "arrows": lvl['arrows']
        }
        results.append(lvl_data)
        elapsed = time.time() - t0
        print(f"[{lvl_num}/40] {TITLES[lvl_num]} ({shape_type.upper()}): {len(lvl['arrows'])} arrows, Init Free: {lvl['initial_free']}, Grid: {lvl['w']}x{lvl['h']} in {elapsed:.2f}s", flush=True)

    with open('projects/arrow-puzzle/campaign_21_40.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print("Saved all 20 Levels (21–30 Circular, 31–40 Heart) to campaign_21_40.json!", flush=True)

if __name__ == '__main__':
    main()
