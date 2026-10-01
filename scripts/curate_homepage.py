import re
from bs4 import BeautifulSoup

def curate_thai_index():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')

    # 1. Update filter tab numbers
    tablist = soup.find('div', id='filter-tabs')
    if tablist:
        buttons = tablist.find_all('button')
        tab_labels = {
            'all': ('🌟 ไฮไลต์เด่น', '23'),
            'tools': ('🛠️ เครื่องมือช่วยสอน', '6'),
            'science': ('⚛️ แบบจำลองวิทย์-การแพทย์', '6'),
            'logic': ('🧩 ตรรกะ & โค้ดดิ้ง', '6'),
            'ai': ('🤖 AI เพื่อการศึกษา', '5')
        }
        for btn in buttons:
            f_val = btn.get('data-filter')
            if f_val in tab_labels:
                txt, count = tab_labels[f_val]
                badge = btn.find('span')
                if badge:
                    badge.string = count
                # replace text before span
                # We can update innerHTML nicely
                btn_class = btn.get('class', [])
                active = 'active' in btn_class
                bg_span = 'bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300' if active else 'bg-slate-200/70 dark:bg-slate-600/50 text-slate-500 dark:text-slate-400'
                btn.clear()
                btn.append(f"{txt} ")
                new_span = soup.new_tag('span', **{
                    'class': f"ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold {bg_span}"
                })
                new_span.string = count
                btn.append(new_span)

    # 2. Curate cards in games-grid
    grid = soup.find('div', id='games-grid')
    cards = grid.find_all('div', recursive=False)

    curated_map = {
        'tools': ['ทางไหนดี', 'ระบบติดตามน้ำฝน', 'Kahoot Clone System', 'Classroom Activity Timer', 'Team Spotlight', 'SpeakQuest'],
        'science': ['Brain Atlas 3D', 'Human Atlas 3D', 'Photoelectric Effect Lab', 'Projectile Simulator', 'Pendulum Simulator', 'Friction Explorer'],
        'logic': ['Circuit Racing 3D', 'Ferrari Race 3D', 'Mars Hexapod 3D', 'Arrow Escape — Pro Puzzle', 'CodeQuest: Monkey Adventure', 'ไซเบอร์โรเวอร์'],
        'ai': ['AI Prompt Builder', 'AI & Media Literacy Map', 'AI Literacy Game', 'Concept Check AI']
    }

    premier_ribbons = {
        'Brain Atlas 3D': ('bg-gradient-to-l from-cyan-500 to-blue-600', '🧠', 'FEATURED SIMULATION'),
        'Circuit Racing 3D': ('bg-gradient-to-l from-emerald-600 to-teal-600', '🏁', 'FEATURED 3D GAME'),
        'ทางไหนดี': ('bg-gradient-to-l from-blue-600 to-indigo-600', '🗺️', 'LIVE MAP & RADAR')
    }

    kept_cards = []
    for c in cards:
        h4 = c.find('h4')
        title = h4.get_text(strip=True) if h4 else ''
        cat = c.get('data-category')

        # Check if card matches any curated
        is_curated = False
        if cat in curated_map:
            for query in curated_map[cat]:
                if query in title:
                    is_curated = True
                    break

        if is_curated:
            # Check ribbon badge
            badge_div = c.find('div', class_=lambda cl: cl and 'absolute top-0 right-0' in cl)
            premier_key = None
            for pk in premier_ribbons:
                if pk in title:
                    premier_key = pk
                    break

            if premier_key:
                grad, icon, label = premier_ribbons[premier_key]
                new_ribbon_html = f'<div class="absolute top-0 right-0 {grad} text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl shadow-md flex items-center gap-1"><span>{icon}</span> <span>{label}</span></div>'
                new_ribbon_soup = BeautifulSoup(new_ribbon_html, 'html.parser').find('div')
                if badge_div:
                    badge_div.replace_with(new_ribbon_soup)
                else:
                    c.insert(0, new_ribbon_soup)
            else:
                # Remove badge to prevent clutter
                if badge_div:
                    badge_div.decompose()

            kept_cards.append(c)

    # Empty the grid and re-add kept cards
    grid.clear()
    for kc in kept_cards:
        grid.append(kc)

    # 3. Add Category Hub Card Banner after games-grid if not present
    existing_banner = soup.find('div', id='category-portal-hub')
    if existing_banner:
        existing_banner.decompose()

    banner_html = """
    <div id="category-portal-hub" class="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>📂</span> <span>สำรวจคลังผลงานฉบับสมบูรณ์แยกตามหมวดหมู่</span>
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    หน้าแรกคัดสรรเฉพาะ 5-6 ไฮไลต์เด่นต่อหมวด เพื่อความกระชับและไม่สับสน ท่านสามารถเลือกเข้าชมผลงานฉบับเต็มทั้งหมด 44 ชิ้นในหน้าย่อยเฉพาะทางได้ทันที
                </p>
            </div>
            <a href="sitemap.html" class="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors whitespace-nowrap">
                ดูแผนผังสารบัญรวมทั้งหมด →
            </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Tools Subpage Card -->
            <a href="category-tools.html" class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">🛠️</span>
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">8 รายการ</span>
                    </div>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">เครื่องมือช่วยสอน</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">แผนที่จราจร-น้ำฝน กทม., Kahoot clone, ระบบจับเวลา, และสุ่มกลุ่ม</p>
                </div>
                <div class="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between">
                    <span>ดูทั้งหมดในหมวดนี้</span>
                    <span>→</span>
                </div>
            </a>

            <!-- Science Subpage Card -->
            <a href="category-science.html" class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">⚛️</span>
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300">11 รายการ</span>
                    </div>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">แบบจำลองวิทย์-การแพทย์</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">Brain & Human Atlas 3D, โฟโตอิเล็กทริก, การเคลื่อนที่วิถีโค้ง, แรงเสียดทาน</p>
                </div>
                <div class="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center justify-between">
                    <span>ดูทั้งหมดในหมวดนี้</span>
                    <span>→</span>
                </div>
            </a>

            <!-- Logic Subpage Card -->
            <a href="category-logic.html" class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">🧩</span>
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">20 รายการ</span>
                    </div>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">ตรรกะ &amp; โค้ดดิ้ง</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">Circuit Racing 3D, Mars Hexapod, Arrow Escape, ปริศนาโค้ดดิ้งและ Sudoku</p>
                </div>
                <div class="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                    <span>ดูทั้งหมดในหมวดนี้</span>
                    <span>→</span>
                </div>
            </a>

            <!-- AI Subpage Card -->
            <a href="category-ai.html" class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">🤖</span>
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">4 รายการ</span>
                    </div>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">AI เพื่อการศึกษา</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">AI Prompt Builder, แผนที่ AI Literacy, Concept Check</p>
                </div>
                <div class="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center justify-between">
                    <span>ดูทั้งหมดในหมวดนี้</span>
                    <span>→</span>
                </div>
            </a>
        </div>
    </div>
    """
    banner_soup = BeautifulSoup(banner_html, 'html.parser').find('div')
    grid.insert_after(banner_soup)

    # 4. Update Navbar dropdown to link to category pages
    nav_drop = soup.find('div', class_=lambda cl: cl and 'group-hover:opacity-100' in cl)
    if nav_drop:
        # replace inner dropdown with category links
        drop_inner = nav_drop.find('div', class_=lambda cl: cl and 'bg-white' in cl)
        if drop_inner:
            new_drop_content = """
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 overflow-hidden">
                <div class="px-4 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    หน้าย่อยแยกตามหมวดหมู่
                </div>
                <a href="category-tools.html" class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <span class="flex items-center gap-2"><span>🛠️</span> <span>เครื่องมือช่วยสอน</span></span>
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">8</span>
                </a>
                <a href="category-science.html" class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <span class="flex items-center gap-2"><span>⚛️</span> <span>แบบจำลองวิทย์-การแพทย์</span></span>
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300">11</span>
                </a>
                <a href="category-logic.html" class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <span class="flex items-center gap-2"><span>🧩</span> <span>ตรรกะ &amp; โค้ดดิ้ง</span></span>
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">20</span>
                </a>
                <a href="category-ai.html" class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <span class="flex items-center gap-2"><span>🤖</span> <span>AI เพื่อการศึกษา</span></span>
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">5</span>
                </a>
                <div class="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                    <a href="#innovations" onclick="filterCategory('all')" class="block px-4 py-1.5 text-xs text-brand-600 dark:text-brand-400 font-semibold hover:bg-brand-50 dark:hover:bg-brand-950/40 transition-colors">
                        🌟 ดูไฮไลต์หน้าแรก (23 รายการ)
                    </a>
                </div>
            </div>
            """
            new_drop_soup = BeautifulSoup(new_drop_content, 'html.parser').find('div')
            drop_inner.replace_with(new_drop_soup)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print(f"Curated index.html successfully with {len(kept_cards)} cards.")

if __name__ == '__main__':
    curate_thai_index()
