import re
from bs4 import BeautifulSoup

def restructure_thai_homepage():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'html.parser')
    grid = soup.find('div', id='games-grid')
    if not grid:
        print("Error: games-grid not found in index.html")
        return

    cards = grid.find_all('div', recursive=False)
    
    selected_specs = [
        # (search_title, new_category)
        ('ทางไหนดี (Road Watch)', 'gis'),
        ('ระบบติดตามน้ำฝน (Rain Watch)', 'gis'),
        ('Brain Atlas 3D', 'science'),
        ('Human Atlas 3D', 'science'),
        ('Photoelectric Effect Lab', 'science'),
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

    selected_cards = []
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
            print(f"Warning: {spec_title} not found in index.html")

    print(f"Extracted {len(selected_cards)} cards for index.html")

    # Update grid classes for cleaner 4-col responsive layout
    grid['class'] = ['grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-6']
    grid.clear()
    for c in selected_cards:
        grid.append(c)

    # Prepare Category Hub Cards (5 portals)
    portal_hub_html = """
<!-- 5 Category Hub Cards for Direct Full Access -->
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8" id="category-portal-cards">
    <!-- GIS -->
    <a href="category-gis.html" class="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-blue-200/80 dark:border-blue-900/50 hover:border-blue-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">🌍</span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">2 รายการ</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">ภูมิสารสนเทศ & ข้อมูลเมือง</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">แผนที่เฝ้าระวังน้ำท่วม 31 จุด กทม. และเรดาร์ตรวจวัดน้ำฝนสด</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between">
            <span>เข้าสู่คลังเต็ม</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </a>
    <!-- Science -->
    <a href="category-science.html" class="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-cyan-200/80 dark:border-cyan-900/50 hover:border-cyan-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600">⚛️</span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300">11 รายการ</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">แบบจำลองวิทย์-การแพทย์</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">กายวิภาคศาสตร์ 3D, Brain Atlas, โฟโตอิเล็กทริก และวิถีโค้ง</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center justify-between">
            <span>เข้าสู่คลังเต็ม</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </a>
    <!-- Logic -->
    <a href="category-logic.html" class="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-emerald-200/80 dark:border-emerald-900/50 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">🧩</span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">21 รายการ</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">ตรรกะ & โค้ดดิ้ง</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">หุ่นยนต์สำรวจ Mars, Circuit Racing 3D, Logic Gate และเขาวงกต</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
            <span>เข้าสู่คลังเต็ม</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </a>
    <!-- AI -->
    <a href="category-ai.html" class="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-purple-200/80 dark:border-purple-900/50 hover:border-purple-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">🤖</span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">5 รายการ</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">AI เพื่อการศึกษา</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">AI Prompt Builder สำหรับครู, จำลองสถานการณ์อวกาศ และ Concept Check</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-purple-600 dark:text-purple-400 flex items-center justify-between">
            <span>เข้าสู่คลังเต็ม</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </a>
    <!-- Tools -->
    <a href="category-tools.html" class="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-amber-200/80 dark:border-amber-900/50 hover:border-amber-500 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between col-span-2 sm:col-span-1">
        <div>
            <div class="flex items-center justify-between mb-2">
                <span class="text-2xl p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">🛠️</span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300">6 รายการ</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">เครื่องมือช่วยสอน</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">ตัวจับเวลากิจกรรมกลุ่ม, สุ่มชื่อนักเรียน, ฝึกออกเสียง และ QR Code</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between">
            <span>เข้าสู่คลังเต็ม</span>
            <span class="group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </a>
</div>
"""

    # Filter Tabs HTML
    filter_tabs_html = """
<div aria-label="หมวดหมู่สื่อการสอน" class="inline-flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 mb-8" id="filter-tabs" role="tablist">
<button aria-selected="true" class="filter-btn active px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm transition-all duration-300" data-filter="all" onclick="filterCategory('all')" role="tab">🌟 ไฮไลต์เด่น <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300">14</span></button>
<button aria-selected="false" class="filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-300" data-filter="gis" onclick="filterCategory('gis')" role="tab">🌍 ภูมิสารสนเทศฯ <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200/70 dark:bg-slate-600/50 text-slate-500 dark:text-slate-400">2</span></button>
<button aria-selected="false" class="filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-300" data-filter="science" onclick="filterCategory('science')" role="tab">⚛️ วิทย์-การแพทย์ <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200/70 dark:bg-slate-600/50 text-slate-500 dark:text-slate-400">3</span></button>
<button aria-selected="false" class="filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-300" data-filter="logic" onclick="filterCategory('logic')" role="tab">🧩 ตรรกะ &amp; โค้ดดิ้ง <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200/70 dark:bg-slate-600/50 text-slate-500 dark:text-slate-400">4</span></button>
<button aria-selected="false" class="filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-300" data-filter="ai" onclick="filterCategory('ai')" role="tab">🤖 AI เพื่อการศึกษา <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200/70 dark:bg-slate-600/50 text-slate-500 dark:text-slate-400">3</span></button>
<button aria-selected="false" class="filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50 transition-all duration-300" data-filter="tools" onclick="filterCategory('tools')" role="tab">🛠️ เครื่องมือช่วยสอน <span class="ml-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200/70 dark:bg-slate-600/50 text-slate-500 dark:text-slate-400">2</span></button>
</div>
"""

    # Bottom Discovery Banner HTML
    bottom_banner_html = """
<div class="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-50/70 via-slate-50 to-indigo-50/60 dark:from-slate-900 dark:via-brand-950/20 dark:to-slate-900 border border-brand-200/60 dark:border-brand-800/40 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-sm">
    <div class="space-y-1.5 max-w-xl">
        <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
            <span>📚</span> <span>ต้องการสำรวจสื่อและเครื่องมือเพิ่มเติมตามกลุ่มสาระ?</span>
        </h3>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            เว็บไซต์มีคลังสื่อเต็มรูปแบบรวมกว่า 45 รายการ พร้อมแนวทางการจัดกิจกรรมการเรียนรู้ในชั้นเรียน สามารถเลือกเปิดดูแยกตามหมวดหมู่ได้ทันที:
        </p>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-2">
        <a href="category-gis.html" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">🌍 ภูมิสารสนเทศ (2)</a>
        <a href="category-science.html" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-cyan-500 hover:text-cyan-600 transition-all shadow-sm">⚛️ วิทย์-การแพทย์ (11)</a>
        <a href="category-logic.html" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm">🧩 ตรรกะ & โค้ดดิ้ง (21)</a>
        <a href="category-ai.html" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-purple-500 hover:text-purple-600 transition-all shadow-sm">🤖 AI เพื่อการศึกษา (5)</a>
        <a href="category-tools.html" class="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-amber-500 hover:text-amber-600 transition-all shadow-sm">🛠️ เครื่องมือช่วยสอน (6)</a>
    </div>
</div>
"""

    # Replace Filter Tabs
    old_tabs = soup.find('div', id='filter-tabs')
    if old_tabs:
        new_tabs_soup = BeautifulSoup(filter_tabs_html, 'html.parser')
        old_tabs.replace_with(new_tabs_soup)

    # Insert Category Hub Cards before Divider
    divider_parent = soup.find('div', class_=lambda c: c and 'flex-col' in c and 'sm:flex-row' in c and 'mb-6' in c)
    if divider_parent:
        portal_soup = BeautifulSoup(portal_hub_html, 'html.parser')
        divider_parent.insert_before(portal_soup)

    # Insert Bottom Discovery Banner after grid
    banner_soup = BeautifulSoup(bottom_banner_html, 'html.parser')
    grid.insert_after(banner_soup)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))
    print("Successfully updated index.html!")

if __name__ == '__main__':
    restructure_thai_homepage()
