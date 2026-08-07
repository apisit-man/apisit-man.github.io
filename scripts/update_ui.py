import re

filepath = r"c:\Users\atong\Documents\antigravity\personal website\index.html"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Desktop Navigation
desktop_nav_old = r'<a href="#innovations" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">สื่อและนวัตกรรม</a>'
desktop_nav_new = r'''<div class="relative group">
                    <a href="#innovations" onclick="filterCategory('all')" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1 cursor-pointer">
                        คลังสื่อการสอน
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </a>
                    <div class="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pt-2">
                        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 overflow-hidden">
                            <a href="#innovations" onclick="filterCategory('all')" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">🌟 ดูทั้งหมด</a>
                            <a href="#innovations" onclick="filterCategory('tools')" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">🛠️ เครื่องมือช่วยสอน</a>
                            <a href="#innovations" onclick="filterCategory('science')" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">⚛️ แบบจำลองวิทย์-ฟิสิกส์</a>
                            <a href="#innovations" onclick="filterCategory('logic')" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">🧩 ตรรกะ & โค้ดดิ้ง</a>
                            <a href="#innovations" onclick="filterCategory('ai')" class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">🤖 AI เพื่อการศึกษา</a>
                        </div>
                    </div>
                </div>'''
content = content.replace(desktop_nav_old, desktop_nav_new)

# 2. Update Mobile Navigation
mobile_nav_old = r'<a href="#innovations" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1">สื่อและนวัตกรรม</a>'
mobile_nav_new = r'''<a href="#innovations" onclick="filterCategory('all')" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1">คลังสื่อการสอน</a>
                <div class="pl-4 flex flex-col space-y-3">
                    <a href="#innovations" onclick="filterCategory('tools')" class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">🛠️ เครื่องมือช่วยสอน</a>
                    <a href="#innovations" onclick="filterCategory('science')" class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">⚛️ แบบจำลองวิทย์-ฟิสิกส์</a>
                    <a href="#innovations" onclick="filterCategory('logic')" class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">🧩 ตรรกะ & โค้ดดิ้ง</a>
                    <a href="#innovations" onclick="filterCategory('ai')" class="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">🤖 AI เพื่อการศึกษา</a>
                </div>'''
content = content.replace(mobile_nav_old, mobile_nav_new)

# 3. Add Filter Tabs
filter_tabs_html = r'''
            <div class="flex flex-wrap justify-center md:justify-start gap-3 mb-10" id="filter-tabs">
                <button onclick="filterCategory('all')" class="filter-btn active px-5 py-2.5 rounded-full text-sm font-bold bg-brand-600 text-white shadow-md shadow-brand-500/20 hover:scale-105 transition-all duration-300" data-filter="all">🌟 ทั้งหมด</button>
                <button onclick="filterCategory('tools')" class="filter-btn px-5 py-2.5 rounded-full text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-800 transition-all duration-300" data-filter="tools">🛠️ เครื่องมือช่วยสอน</button>
                <button onclick="filterCategory('science')" class="filter-btn px-5 py-2.5 rounded-full text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-800 transition-all duration-300" data-filter="science">⚛️ แบบจำลองวิทย์-ฟิสิกส์</button>
                <button onclick="filterCategory('logic')" class="filter-btn px-5 py-2.5 rounded-full text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-800 transition-all duration-300" data-filter="logic">🧩 ตรรกะ & โค้ดดิ้ง</button>
                <button onclick="filterCategory('ai')" class="filter-btn px-5 py-2.5 rounded-full text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-slate-800 transition-all duration-300" data-filter="ai">🤖 AI เพื่อการศึกษา</button>
            </div>
'''
# Insert after </div> which closes the space-y-4 div
# Using regex to find the exact spot
pattern_insert_filter = r'(<h2 class="text-3xl font-bold[^>]*>สื่อและนวัตกรรมการเรียนรู้.*?</p>\s*</div>)'
content = re.sub(pattern_insert_filter, r'\1' + filter_tabs_html, content, flags=re.DOTALL)

# 4. Add data-category tags to each game card
# We will match the title of the game and replace the opening <div class="p-6 rounded-2xl... group">
def inject_data_category(html_content, title_keyword, category):
    # Regex: Find the div starting with <div class="p-6 rounded-2xl... group"> that eventually contains the title_keyword
    # This requires looking ahead or matching the whole block.
    # It's easier to just match the specific block.
    pattern = re.compile(rf'(<div class="p-6 rounded-2xl[^>]*bg-white[^>]*group")([^>]*>.*?{title_keyword})', re.DOTALL | re.IGNORECASE)
    return pattern.sub(rf'\1 data-category="{category}"\2', html_content)

content = inject_data_category(content, 'ของใช้ไปบ้านไหน', 'logic')
content = inject_data_category(content, 'Neon Path Puzzle', 'logic')
content = inject_data_category(content, 'เกมต่อวงจรไฟฟ้า', 'science')
content = inject_data_category(content, 'One Stroke Adventure', 'logic')
content = inject_data_category(content, 'โยงคู่ไม่ให้ชน', 'logic')
content = inject_data_category(content, 'Kahoot Clone System', 'tools')
content = inject_data_category(content, 'Classroom Activity Timer', 'tools')
content = inject_data_category(content, 'Projectile Simulator', 'science')
content = inject_data_category(content, 'Pendulum Simulator', 'science')
content = inject_data_category(content, 'AI Literacy', 'ai')
content = inject_data_category(content, 'Mission Control AI', 'ai')
content = inject_data_category(content, 'Science Sort Sprint', 'science')
content = inject_data_category(content, 'Friction Matching', 'science')
content = inject_data_category(content, 'Puzzle Collection', 'logic')

# Fix the grid container to have an id so we can target cards easily
content = content.replace('<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">', '<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8" id="games-grid">')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html UI successfully.")
