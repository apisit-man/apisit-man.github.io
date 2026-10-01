import re
from bs4 import BeautifulSoup

def restructure_english_homepage():
    with open('index-en.html', 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')

    # Update Desktop Dropdown
    desktop_dropdown = soup.find('div', class_=lambda c: c and 'group-hover:visible' in c and 'z-50' in c)
    if desktop_dropdown:
        new_desktop_dropdown_html = """
<div class="absolute left-0 mt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pt-2">
<div class="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 overflow-hidden">
<div class="px-4 py-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    Category Portals (5 Domains)
                </div>
<a class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" href="category-gis.html">
<span class="flex items-center gap-2"><span>🌍</span> <span>Geo-Informatics &amp; Earth Data</span></span>
<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">2</span>
</a>
<a class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" href="category-science.html">
<span class="flex items-center gap-2"><span>⚛️</span> <span>Science &amp; Medical 3D</span></span>
<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300">11</span>
</a>
<a class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" href="category-logic.html">
<span class="flex items-center gap-2"><span>🧩</span> <span>Logic &amp; Coding</span></span>
<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">21</span>
</a>
<a class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" href="category-ai.html">
<span class="flex items-center gap-2"><span>🤖</span> <span>Educational AI</span></span>
<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">5</span>
</a>
<a class="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors" href="category-tools.html">
<span class="flex items-center gap-2"><span>🛠️</span> <span>Teaching Tools</span></span>
<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">6</span>
</a>
<div class="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
<a class="block px-4 py-1.5 text-xs text-brand-600 dark:text-brand-400 font-semibold hover:bg-brand-50 dark:hover:bg-brand-950/40 transition-colors" href="#innovations" onclick="filterCategory('all')">
                        🌟 View Homepage Highlights (14)
                    </a>
</div>
</div>
</div>
"""
        desktop_dropdown.replace_with(BeautifulSoup(new_desktop_dropdown_html, 'html.parser'))

    # Update Mobile Links
    mobile_category_links = soup.find('div', id='mobile-menu')
    if mobile_category_links:
        # find the links for category-tools, category-science, etc.
        tools_link = mobile_category_links.find('a', href='category-tools.html')
        if tools_link and tools_link.parent:
            parent = tools_link.parent
            # replace the last category links with the new 5 links
            for old_cat_link in parent.find_all('a', href=re.compile(r'category-.*\.html')):
                old_cat_link.decompose()
            new_mobile_cats = """
<a class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center justify-between" href="category-gis.html"><span>🌍 Geo-Informatics &amp; Earth Data</span> <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700">2</span></a>
<a class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center justify-between" href="category-science.html"><span>⚛️ Science &amp; Medical 3D</span> <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700">11</span></a>
<a class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center justify-between" href="category-logic.html"><span>🧩 Logic &amp; Coding</span> <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700">21</span></a>
<a class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center justify-between" href="category-ai.html"><span>🤖 Educational AI</span> <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700">5</span></a>
<a class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center justify-between" href="category-tools.html"><span>🛠️ Teaching Tools</span> <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700">6</span></a>
"""
            parent.append(BeautifulSoup(new_mobile_cats, 'html.parser'))

    # Games Grid in index-en.html
    grid = soup.find('div', id='games-grid')
    if not grid:
        print("Error: games-grid not found in index-en.html")
        return

    cards = grid.find_all('div', recursive=False)
    
    # Check if Bangkok Road Watch card is needed
    road_watch_card_en = """
<div class="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900/80 border-2 border-blue-400/70 dark:border-blue-500/70 shadow-lg shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" data-category="gis">
<div class="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl shadow-md flex items-center gap-1"><span>🗺️</span> <span>LIVE MAP &amp; RADAR</span></div>
<div class="space-y-4 pt-1">
<div class="flex items-center gap-3">
<div class="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
<span class="text-2xl">🗺️</span>
</div>
<div>
<h4 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Bangkok Road Watch</h4>
<span class="text-xs font-semibold text-blue-600 dark:text-blue-400">Interactive Map &amp; Flood Watch</span>
</div>
</div>
<p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
Interactive spatial monitoring system for flood-prone spots and real-time traffic across 31 main arteries in Bangkok. Zoom to real streets, Chao Phraya river, and satellite imagery with CCTV feeds.
</p>
<div class="flex flex-wrap gap-1.5 pt-1">
<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/30">GIS &amp; Smart City</span>
<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Leaflet &amp; GIS</span>
<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/30">Satellite &amp; CCTV</span>
</div>
</div>
<div class="pt-6">
<a class="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30" href="./projects/bangkokflood/index.html">
🗺️ Open Bangkok Road Watch
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
</a>
</div>
</div>
"""
    
    selected_specs = [
        ('Rain Watch Thailand', 'gis'),
        ('Brain Atlas 3D', 'science'),
        ('Human Atlas 3D', 'science'),
        ('Photoelectric Effect', 'science'),
        ('Circuit Racing 3D', 'logic'),
        ('Mars Hexapod 3D', 'logic'),
        ('Smart Maze Suite', 'logic'),
        ('Arrow Escape — Pro Puzzle', 'logic'),
        ('AI Prompt Builder', 'ai'),
        ('Mission Control AI', 'ai'),
        ('Concept Check AI', 'ai'),
        ('Classroom Activity Timer', 'tools'),
        ('Team Spotlight', 'tools')
    ]

    selected_cards = [BeautifulSoup(road_watch_card_en, 'html.parser').find('div')]

    for spec_title, new_cat in selected_specs:
        found = False
        for c in cards:
            h = c.find(['h3', 'h4'])
            t = h.text.strip() if h else ''
            if spec_title.lower() in t.lower() or t.lower() in spec_title.lower():
                c['data-category'] = new_cat
                selected_cards.append(c)
                found = True
                break
        if not found:
            print(f"Warning: {spec_title} not found in index-en.html")

    print(f"Extracted {len(selected_cards)} cards for index-en.html")

    # Update grid classes for cleaner 4-col responsive layout
    grid['class'] = ['grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-6']
    grid.clear()
    for c in selected_cards:
        grid.append(c)

    # 5 Category Hub Cards for English
    portal_hub_en_html = """
<!-- 5 Category Hub Cards for Direct Full Access -->
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8" id="category-portal-cards">
    <!-- GIS -->
    <a href="category-gis.html" class="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-blue-200/80 dark:border-blue-900/50 hover:border-blue-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">🌍</span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">2 Items</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Geo-Informatics & Earth</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">Real-time flood watch, CCTV road monitoring & live weather radar</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between">
            <span>Explore Hub</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </a>
    <!-- Science -->
    <a href="category-science.html" class="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-cyan-200/80 dark:border-cyan-900/50 hover:border-cyan-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600">⚛️</span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300">11 Items</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Science & Medical 3D</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">3D Human Anatomy, Brain Atlas & MRI, Photoelectric effect lab</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center justify-between">
            <span>Explore Hub</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </a>
    <!-- Logic -->
    <a href="category-logic.html" class="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-emerald-200/80 dark:border-emerald-900/50 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">🧩</span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">21 Items</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Logic & Coding</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">Mars Hexapod rover, Circuit Racing 3D, Logic gates & mazes</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
            <span>Explore Hub</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </a>
    <!-- AI -->
    <a href="category-ai.html" class="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-purple-200/80 dark:border-purple-900/50 hover:border-purple-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">🤖</span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">5 Items</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Educational AI</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">AI Prompt Builder for teachers, Space Mission Control & Concept Check</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-purple-600 dark:text-purple-400 flex items-center justify-between">
            <span>Explore Hub</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </a>
    <!-- Tools -->
    <a href="category-tools.html" class="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-amber-200/80 dark:border-amber-900/50 hover:border-amber-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between col-span-2 sm:col-span-1">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">🛠️</span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300">6 Items</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Teaching Tools</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">Classroom activity timer, Student randomizer, QR generator</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between">
            <span>Explore Hub</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </a>
</div>
"""

    # Filter Tabs HTML for English
    filter_tabs_en_html = """
<div aria-label="Tool Categories" class="inline-flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 mb-8" id="filter-tabs" role="tablist">
<button aria-selected="true" class="filter-btn active px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm transition-all duration-300" data-filter="all" onclick="filterCategory('all')" role="tab">🌟 Featured <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300">14</span></button>
<button aria-selected="false" class="filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-300" data-filter="gis" onclick="filterCategory('gis')" role="tab">🌍 Geo-Informatics <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200/70 dark:bg-slate-600/50 text-slate-500 dark:text-slate-400">2</span></button>
<button aria-selected="false" class="filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-300" data-filter="science" onclick="filterCategory('science')" role="tab">⚛️ Science 3D <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200/70 dark:bg-slate-600/50 text-slate-500 dark:text-slate-400">3</span></button>
<button aria-selected="false" class="filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-300" data-filter="logic" onclick="filterCategory('logic')" role="tab">🧩 Logic &amp; Coding <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200/70 dark:bg-slate-600/50 text-slate-500 dark:text-slate-400">4</span></button>
<button aria-selected="false" class="filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-300" data-filter="ai" onclick="filterCategory('ai')" role="tab">🤖 Educational AI <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200/70 dark:bg-slate-600/50 text-slate-500 dark:text-slate-400">3</span></button>
<button aria-selected="false" class="filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-300" data-filter="tools" onclick="filterCategory('tools')" role="tab">🛠️ Teaching Tools <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200/70 dark:bg-slate-600/50 text-slate-500 dark:text-slate-400">2</span></button>
</div>
"""

    # Bottom Discovery Banner for English
    bottom_banner_en_html = """
<div class="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-50/70 via-slate-50 to-indigo-50/60 dark:from-slate-900 dark:via-brand-950/20 dark:to-slate-900 border border-brand-200/60 dark:border-brand-800/40 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-sm">
    <div class="space-y-1.5 max-w-xl">
        <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
            <span>📚</span> <span>Looking for more specialized simulations and classroom tools?</span>
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The full laboratory library contains over 45 interactive applications, 3D simulations, and coding puzzles categorized by academic domain:
        </p>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-2">
        <a href="category-gis.html" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">🌍 Geo-Informatics (2)</a>
        <a href="category-science.html" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-cyan-500 hover:text-cyan-600 transition-all shadow-sm">⚛️ Science 3D (11)</a>
        <a href="category-logic.html" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm">🧩 Logic &amp; Coding (21)</a>
        <a href="category-ai.html" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-purple-500 hover:text-purple-600 transition-all shadow-sm">🤖 Educational AI (5)</a>
        <a href="category-tools.html" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-amber-500 hover:text-amber-600 transition-all shadow-sm">🛠️ Teaching Tools (6)</a>
    </div>
</div>
"""

    # Replace Filter Tabs in index-en.html
    old_tabs = soup.find('div', id='filter-tabs')
    if old_tabs:
        old_tabs.replace_with(BeautifulSoup(filter_tabs_en_html, 'html.parser'))

    # Insert Category Hub Cards before Divider
    divider_parent = soup.find('div', class_=lambda c: c and 'flex-col' in c and 'sm:flex-row' in c and 'mb-6' in c)
    if divider_parent:
        divider_parent.insert_before(BeautifulSoup(portal_hub_en_html, 'html.parser'))

    # Insert Bottom Discovery Banner after grid
    grid.insert_after(BeautifulSoup(bottom_banner_en_html, 'html.parser'))

    with open('index-en.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print("Successfully updated index-en.html!")

if __name__ == '__main__':
    restructure_english_homepage()
