import math
import random
import time
import json

DIRS = [{'x': 1, 'y': 0}, {'x': -1, 'y': 0}, {'x': 0, 'y': 1}, {'x': 0, 'y': -1}]

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

def generate_single_circular_level(grid_n, target_arrows, min_arrows, max_initial_free, seed):
    random.seed(seed)
    cx, cy = grid_n / 2.0, grid_n / 2.0
    radius = (grid_n - 2.5) / 2.0

    def in_circle(x, y):
        return math.hypot(x - cx, y - cy) <= radius

    valid_cells = [(x, y) for x in range(1, grid_n) for y in range(1, grid_n) if in_circle(x, y)]

    for attempt_board in range(40):
        occupied = set()
        arrows = []
        adj = {}

        for attempt in range(1600):
            avail = [c for c in valid_cells if c not in occupied]
            if not avail: break
            start = random.choice(avail)

            # Proportions: Spirals, Meanders, U-turns, Corridors, Keys
            arch = random.choices([0, 1, 2, 3, 4], weights=[28, 26, 20, 16, 10])[0]
            chain = [{'x': start[0], 'y': start[1]}]
            cur = chain[0]

            if arch == 0: # Spiral / Coil
                cw = random.random() > 0.5
                sdirs = [DIRS[0], DIRS[2], DIRS[1], DIRS[3]] if cw else [DIRS[0], DIRS[3], DIRS[1], DIRS[2]]
                sd_i = random.randint(0, 3)
                lens = [random.randint(2, 4), random.randint(2, 3), random.randint(2, 3), random.randint(1, 2)]
                ok = True
                for i, l in enumerate(lens):
                    cd = sdirs[(sd_i + i) % 4]
                    for s in range(1, l + 1):
                        nx, ny = cur['x'] + cd['x'], cur['y'] + cd['y']
                        if not in_circle(nx, ny) or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                            ok = False; break
                        chain.append({'x': nx, 'y': ny})
                        cur = chain[-1]
                    if not ok: break
                if not ok or len(chain) < 4: continue

            elif arch == 1: # Snake / Meander
                md = random.choice(DIRS)
                cd = {'x': -md['y'], 'y': md['x']}
                steps = random.randint(2, 4)
                sgn = 1
                ok = True
                for _ in range(steps):
                    for _ in range(random.randint(1, 2)):
                        nx, ny = cur['x'] + cd['x'] * sgn, cur['y'] + cd['y'] * sgn
                        if not in_circle(nx, ny) or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                            ok = False; break
                        chain.append({'x': nx, 'y': ny})
                        cur = chain[-1]
                    if not ok: break
                    for _ in range(random.randint(1, 2)):
                        nx, ny = cur['x'] + md['x'], cur['y'] + md['y']
                        if not in_circle(nx, ny) or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                            ok = False; break
                        chain.append({'x': nx, 'y': ny})
                        cur = chain[-1]
                    if not ok: break
                    sgn = -sgn
                if not ok or len(chain) < 4: continue

            elif arch == 2: # Hairpin U-turn
                d1 = random.choice(DIRS)
                perp = {'x': -d1['y'], 'y': d1['x']} if random.random() > 0.5 else {'x': d1['y'], 'y': -d1['x']}
                d2 = {'x': -d1['x'], 'y': -d1['y']}
                ok = True
                for d, l in [(d1, random.randint(2, 3)), (perp, 1), (d2, random.randint(2, 3))]:
                    for _ in range(l):
                        nx, ny = cur['x'] + d['x'], cur['y'] + d['y']
                        if not in_circle(nx, ny) or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                            ok = False; break
                        chain.append({'x': nx, 'y': ny})
                        cur = chain[-1]
                    if not ok: break
                if not ok or len(chain) < 4: continue

            elif arch == 3: # Multi-turn corridor
                bends = random.randint(2, 4)
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
                            if not in_circle(nx, ny) or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                                can = False; break
                        if can:
                            chosen_d = d; break
                    if not chosen_d: break
                    for s in range(1, seg_l + 1):
                        chain.append({'x': cur['x'] + chosen_d['x'], 'y': cur['y'] + chosen_d['y']})
                    cur = chain[-1]
                    last_d = chosen_d
                if len(chain) < 3: continue

            else: # Locking Pin (Key: 1 turn or straight)
                d1 = random.choice(DIRS)
                perp = {'x': -d1['y'], 'y': d1['x']} if random.random() > 0.5 else {'x': d1['y'], 'y': -d1['x']}
                ok = True
                for d, l in [(d1, random.randint(1, 2)), (perp, 1)]:
                    for _ in range(l):
                        nx, ny = cur['x'] + d['x'], cur['y'] + d['y']
                        if not in_circle(nx, ny) or (nx, ny) in occupied or any(p['x']==nx and p['y']==ny for p in chain):
                            ok = False; break
                        chain.append({'x': nx, 'y': ny})
                        cur = chain[-1]
                    if not ok: break
                if not ok or len(chain) < 2: continue

            # Compress
            compressed = [chain[0]]
            for i in range(1, len(chain) - 1):
                p_prev = compressed[-1]
                p_c = chain[i]
                p_next = chain[i+1]
                d1x = 1 if p_c['x'] > p_prev['x'] else (-1 if p_c['x'] < p_prev['x'] else 0)
                d1y = 1 if p_c['y'] > p_prev['y'] else (-1 if p_c['y'] < p_prev['y'] else 0)
                d2x = 1 if p_next['x'] > p_c['x'] else (-1 if p_next['x'] < p_c['x'] else 0)
                d2y = 1 if p_next['y'] > p_c['y'] else (-1 if p_next['y'] < p_c['y'] else 0)
                if d1x != d2x or d1y != d2y:
                    compressed.append(p_c)
            compressed.append(chain[-1])

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

        if len(arrows) >= min_arrows:
            solv, order, initial_free = solve_check(arrows)
            if solv and 1 <= initial_free <= max_initial_free:
                for idx, a in enumerate(arrows): a['id'] = idx
                return {
                    'w': grid_n,
                    'h': grid_n,
                    'arrows': arrows,
                    'initial_free': initial_free,
                    'order': order
                }

    # Fallback to best solvable
    if len(arrows) >= min_arrows:
        solv, order, initial_free = solve_check(arrows)
        if solv:
            for idx, a in enumerate(arrows): a['id'] = idx
            return {
                'w': grid_n,
                'h': grid_n,
                'arrows': arrows,
                'initial_free': initial_free,
                'order': order
            }
    return None

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
    31: "Level 31 (Labyrinthine Core)",
    32: "Level 32 (Quad Vortex)",
    33: "Level 33 (Chamber of Coils)",
    34: "Level 34 (Celestial Disc)",
    35: "Level 35 (Topological Abyss)",
    36: "Level 36 (Hyper-Dense Ring)",
    37: "Level 37 (Labyrinth of Minos)",
    38: "Level 38 (Fractal Coils)",
    39: "Level 39 (Penultimate Enigma)",
    40: "Level 40 (Grandmaster Ultimate)"
}

def main():
    print("Generating Grandmaster Circular Campaign (Levels 21–40)...")
    results = []

    # Calibration table
    specs = [
        # lvl, grid_n, target, min, max_free
        (21, 20, 34, 30, 4),
        (22, 20, 36, 32, 4),
        (23, 21, 38, 34, 4),
        (24, 21, 40, 36, 4),
        (25, 22, 42, 38, 4),
        (26, 22, 44, 40, 4),
        (27, 23, 46, 42, 4),
        (28, 23, 48, 44, 3),
        (29, 23, 50, 46, 3),
        (30, 24, 52, 48, 3),
        (31, 24, 52, 48, 3),
        (32, 24, 54, 50, 3),
        (33, 25, 56, 52, 3),
        (34, 25, 58, 54, 3),
        (35, 25, 60, 56, 3),
        (36, 26, 62, 58, 3),
        (37, 26, 64, 60, 3),
        (38, 26, 65, 62, 3),
        (39, 27, 68, 64, 3),
        (40, 27, 70, 66, 3),
    ]

    for lvl_num, gn, tgt, mn, mf in specs:
        t0 = time.time()
        lvl = None
        for seed_try in range(10):
            seed = lvl_num * 10007 + seed_try * 1237
            lvl = generate_single_circular_level(gn, tgt, mn, mf, seed)
            if lvl and len(lvl['arrows']) >= mn:
                break
        if not lvl:
            # Fallback slightly relaxed
            lvl = generate_single_circular_level(gn, tgt, mn - 4, mf + 2, lvl_num * 555)

        lvl_data = {
            "title": TITLES[lvl_num],
            "w": lvl['w'],
            "h": lvl['h'],
            "isCircular": True,
            "arrows": lvl['arrows']
        }
        results.append(lvl_data)
        elapsed = time.time() - t0
        print(f"[{lvl_num}/40] {TITLES[lvl_num]}: {len(lvl['arrows'])} arrows, Init Free: {lvl['initial_free']}, Grid: {lvl['w']}x{lvl['h']} in {elapsed:.2f}s")

    with open('projects/arrow-puzzle/campaign_21_40.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print("Saved all 20 Grandmaster Circular Levels to campaign_21_40.json!")

if __name__ == '__main__':
    main()
