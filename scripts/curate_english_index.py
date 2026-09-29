import re
from bs4 import BeautifulSoup

def curate_english_index():
    with open('index-en.html', 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')

    # 1. Update filter tab numbers
    tablist = soup.find('div', id='filter-tabs')
    if tablist:
        buttons = tablist.find_all('button')
        tab_labels = {
            'all': ('🌟 Featured Highlights', '23'),
            'tools': ('🛠️ Teaching Tools', '6'),
            'science': ('⚛️ Science & Medical 3D', '6'),
            'logic': ('🧩 Logic & Coding', '6'),
            'ai': ('🤖 Educational AI', '5')
        }
        for btn in buttons:
            f_val = btn.get('data-filter')
            if f_val in tab_labels:
                txt, count = tab_labels[f_val]
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
        'tools': ['Rain Watch Thailand', 'Kahoot Clone System', 'Classroom Activity Timer', 'Team Spotlight', 'SpeakQuest', 'QR Code Generator'],
        'science': ['Brain Atlas 3D', 'Human Atlas 3D', 'Photoelectric Effect', 'Projectile Simulator', 'Pendulum Simulator', 'Friction Explorer'],
        'logic': ['Circuit Racing 3D', 'Ferrari Race 3D', 'Mars Hexapod 3D', 'Arrow Escape — Pro Puzzle', 'CodeQuest: Monkey Adventure', 'Cyber Rover Coding'],
        'ai': ['AI Prompt Builder', 'Mission Control AI', 'AI & Media Literacy Map', 'AI Literacy Game', 'Concept Check AI']
    }

    premier_ribbons = {
        'Brain Atlas 3D': ('bg-gradient-to-l from-cyan-500 to-blue-600', '🧠', 'FEATURED SIMULATION'),
        'Circuit Racing 3D': ('bg-gradient-to-l from-emerald-600 to-teal-600', '🏁', 'FEATURED 3D GAME'),
    }

    kept_cards = []
    for c in cards:
        h4 = c.find('h4')
        title = h4.get_text(strip=True) if h4 else ''
        cat = c.get('data-category')

        is_curated = False
        if cat in curated_map:
            for query in curated_map[cat]:
                if query in title:
                    is_curated = True
                    break

        if is_curated:
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
                if badge_div:
                    badge_div.decompose()

            kept_cards.append(c)

    grid.clear()
    for kc in kept_cards:
        grid.append(kc)

    # 3. Add Category Hub Card Banner after games-grid
    existing_banner = soup.find('div', id='category-portal-hub')
    if existing_banner:
        existing_banner.decompose()

    banner_html = """
    <div id="category-portal-hub" class="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-100/90 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>📂</span> <span>Explore Complete Catalogs by Category</span>
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    The homepage showcases 5-6 curated flagship highlights per category. Explore the complete collection of 44 projects on dedicated sub-pages.
                </p>
            </div>
            <a href="sitemap.html" class="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors whitespace-nowrap">
                View Full Site Map →
            </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Tools Subpage Card -->
            <a href="category-tools.html" class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">🛠️</span>
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">8 Items</span>
                    </div>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Teaching Tools</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">Real-time GIS radar, Kahoot clone, timers, and student randomizer</p>
                </div>
                <div class="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between">
                    <span>Explore All Tools</span>
                    <span>→</span>
                </div>
            </a>

            <!-- Science Subpage Card -->
            <a href="category-science.html" class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">⚛️</span>
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300">11 Items</span>
                    </div>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Science &amp; Medical 3D</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">Brain &amp; Human Atlas 3D, Photoelectric quantum lab, projectile physics</p>
                </div>
                <div class="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center justify-between">
                    <span>Explore All Simulations</span>
                    <span>→</span>
                </div>
            </a>

            <!-- Logic Subpage Card -->
            <a href="category-logic.html" class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">🧩</span>
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">20 Items</span>
                    </div>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Logic &amp; Coding</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">Circuit Racing 3D, Mars Hexapod, Arrow Escape, logic gates &amp; Sudoku</p>
                </div>
                <div class="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                    <span>Explore All Puzzles</span>
                    <span>→</span>
                </div>
            </a>

            <!-- AI Subpage Card -->
            <a href="category-ai.html" class="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-2xl p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">🤖</span>
                        <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">5 Items</span>
                    </div>
                    <h4 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Educational AI</h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">AI Prompt Builder, Mission Control AI, AI Literacy Map, Concept Check</p>
                </div>
                <div class="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center justify-between">
                    <span>Explore All AI Projects</span>
                    <span>→</span>
                </div>
            </a>
        </div>
    </div>
    """
    banner_soup = BeautifulSoup(banner_html, 'html.parser').find('div')
    grid.insert_after(banner_soup)

    # 4. Update Navbar dropdown in index-en.html
    nav_drop = soup.find('div', class_=lambda cl: cl and 'group-hover:opacity-100' in cl)
    if nav_drop:
        drop_inner = nav_drop.find('div', class_=lambda cl: cl and 'bg-white' in cl)
        if drop_inner:
            new_drop_content = """
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 overflow-hidden">
                <div class="px-4 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    Category Portals
                </div>
                <a href="category-tools.html" class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <span class="flex items-center gap-2"><span>🛠️</span> <span>Teaching Tools</span></span>
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">8</span>
                </a>
                <a href="category-science.html" class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <span class="flex items-center gap-2"><span>⚛️</span> <span>Science &amp; Medical 3D</span></span>
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300">11</span>
                </a>
                <a href="category-logic.html" class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <span class="flex items-center gap-2"><span>🧩</span> <span>Logic &amp; Coding</span></span>
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">20</span>
                </a>
                <a href="category-ai.html" class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <span class="flex items-center gap-2"><span>🤖</span> <span>Educational AI</span></span>
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">5</span>
                </a>
                <div class="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                    <a href="#innovations" onclick="filterCategory('all')" class="block px-4 py-1.5 text-xs text-brand-600 dark:text-brand-400 font-semibold hover:bg-brand-50 dark:hover:bg-brand-950/40 transition-colors">
                        🌟 View Homepage Highlights (23)
                    </a>
                </div>
            </div>
            """
            new_drop_soup = BeautifulSoup(new_drop_content, 'html.parser').find('div')
            drop_inner.replace_with(new_drop_soup)

    with open('index-en.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print(f"Curated index-en.html successfully with {len(kept_cards)} cards.")

if __name__ == '__main__':
    curate_english_index()
