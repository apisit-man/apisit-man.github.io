import os
import re
from bs4 import BeautifulSoup

def build_category_pages():
    with open('index.html', 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    grid = soup.find('div', id='games-grid')
    cards = grid.find_all('div', recursive=False)

    categories = {
        'tools': {
            'filename': 'category-tools.html',
            'icon': '🛠️',
            'title_th': 'เครื่องมือช่วยสอน',
            'title_en': 'Teaching Tools & Classroom Utilities',
            'desc': 'รวมเว็บแอปพลิเคชัน เครื่องมือช่วยจัดการชั้นเรียน สุ่มกลุ่ม จับเวลา ระบบแผนที่ และเครื่องมือสำรวจข้อมูลเชิงพื้นที่สำหรับการจัดการเรียนรู้',
            'accent': 'blue',
            'items': []
        },
        'science': {
            'filename': 'category-science.html',
            'icon': '⚛️',
            'title_th': 'แบบจำลองวิทย์-การแพทย์',
            'title_en': 'Science & Medical Simulations',
            'desc': 'คลังแบบจำลองฟิสิกส์ การทดลองเสมือนจริง (Virtual Lab) และกายวิภาคศาสตร์ 3 มิติเชิงลึก (3D Human & Brain Atlas) ใช้งานได้ฟรีผ่านเว็บเบราว์เซอร์',
            'accent': 'cyan',
            'items': []
        },
        'logic': {
            'filename': 'category-logic.html',
            'icon': '🧩',
            'title_th': 'ตรรกะ & โค้ดดิ้ง',
            'title_en': 'Logic & Coding Games',
            'desc': 'คลังมินิเกมตรรกะ ปริศนาอัลกอริทึม การแก้ปัญหาเชิงคำนวณ เกมแข่งรถ และแบบจำลองสำรวจ 3 มิติ สำหรับฝึกทักษะการคิดอย่างเป็นระบบ',
            'accent': 'emerald',
            'items': []
        },
        'ai': {
            'filename': 'category-ai.html',
            'icon': '🤖',
            'title_th': 'AI เพื่อการศึกษา',
            'title_en': 'Educational AI & Literacy',
            'desc': 'สื่อนวัตกรรมการเรียนรู้ปัญญาประดิษฐ์ เครื่องมือวิศวกรรมพรอมต์ (Prompt Builder) แผนที่มโนทัศน์การรู้เท่าทัน AI และระบบวินิจฉัยมโนมติ',
            'accent': 'purple',
            'items': []
        }
    }

    for c in cards:
        cat = c.get('data-category')
        if cat in categories:
            categories[cat]['items'].append(c)

    # HTML Template
    template = """<!DOCTYPE html>
<html lang="th" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title_th} ({title_en}) - ดร.อภิสิทธิ์ ธงไชย</title>
    
    <!-- SEO & Metadata -->
    <meta name="description" content="{desc}">
    <meta name="author" content="ดร.อภิสิทธิ์ ธงไชย">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://apisit-man.github.io/{filename}">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="{icon} {title_th} - ดร.อภิสิทธิ์ ธงไชย">
    <meta property="og:description" content="{desc}">
    <meta property="og:url" content="https://apisit-man.github.io/{filename}">
    <meta property="og:image" content="https://apisit-man.github.io/assets/images/profile.jpg">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Prompt & Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind Custom Configuration -->
    <script>
        tailwind.config = {{
            darkMode: 'class',
            theme: {{
                extend: {{
                    fontFamily: {{
                        sans: ['Plus Jakarta Sans', 'Prompt', 'sans-serif'],
                        prompt: ['Prompt', 'sans-serif'],
                    }},
                    colors: {{
                        brand: {{
                            50: '#f5f3ff',
                            100: '#ede9fe',
                            200: '#ddd6fe',
                            300: '#c4b5fd',
                            400: '#a78bfa',
                            500: '#8b5cf6',
                            600: '#7c3aed',
                            700: '#6d28d9',
                            800: '#5b21b6',
                            900: '#4c1d95',
                        }},
                    }}
                }}
            }}
        }}
    </script>
    
    <!-- Theme Switcher Init script -->
    <script>
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {{
            document.documentElement.classList.add('dark');
        }} else {{
            document.documentElement.classList.remove('dark');
        }}
    </script>
</head>
<body class="bg-[#fafafa] dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans antialiased transition-colors duration-300 min-h-screen flex flex-col justify-between">

    <!-- Header & Navigation -->
    <header class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300">
        <nav class="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <a href="index.html" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60">
                    <span>←</span>
                    <span>กลับหน้าแรก</span>
                </a>
                <span class="border-r border-slate-200 dark:border-slate-700/80 h-4 mx-1 hidden sm:inline-block"></span>
                <span class="text-sm font-bold text-slate-900 dark:text-white hidden sm:flex items-center gap-1.5">
                    <span>{icon}</span> <span>{title_th}</span>
                </span>
            </div>
            
            <div class="flex items-center space-x-2 sm:space-x-3">
                <a href="index.html#innovations" class="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 hidden md:inline">คลังสื่อทั้งหมด</a>
                <a href="sitemap.html" class="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60">แผนผังเว็บ</a>

                <!-- Theme Toggle Button -->
                <button id="theme-toggle" class="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="Toggle Theme">
                    <svg id="theme-toggle-sun" class="w-4 h-4 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path></svg>
                    <svg id="theme-toggle-moon" class="w-4 h-4 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                </button>
            </div>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 sm:px-6 py-10 max-w-7xl flex-grow">
        
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
            <a href="index.html" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">หน้าแรก</a>
            <span>/</span>
            <a href="index.html#innovations" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">คลังสื่อการสอน</a>
            <span>/</span>
            <span class="text-slate-800 dark:text-slate-200 font-semibold">{title_th}</span>
        </nav>

        <!-- Category Hero Banner -->
        <div class="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950 border border-slate-200/70 dark:border-slate-800/80 shadow-sm relative overflow-hidden">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div class="space-y-3 max-w-3xl">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
                        <span>{icon}</span> <span>หมวดหมู่ผลงาน</span>
                        <span class="px-1.5 py-0.2 rounded-md bg-brand-200/60 dark:bg-brand-800/60 text-[10px]">{count} รายการ</span>
                    </div>
                    <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {title_th}
                    </h1>
                    <p class="text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400">
                        {title_en}
                    </p>
                    <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {desc}
                    </p>
                </div>

                <!-- Category Search Bar -->
                <div class="w-full md:w-80 flex-shrink-0">
                    <label for="category-search" class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">ค้นหาเฉพาะในหมวดนี้:</label>
                    <div class="relative">
                        <input type="text" id="category-search" placeholder="🔍 พิมพ์คำค้นหา..." 
                            class="w-full px-3.5 py-2.5 pl-9 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all shadow-sm">
                        <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <div class="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 flex justify-between">
                        <span id="results-count">แสดงผล {count} จาก {count} รายการ</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cross-Category Navigation Chips -->
        <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-medium no-scrollbar">
            <span class="text-slate-400 dark:text-slate-500 whitespace-nowrap">หมวดหมู่อื่นๆ:</span>
            {other_pills}
        </div>

        <!-- Full Cards Grid for this Category -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="category-grid">
            {cards_html}
        </div>

        <!-- Empty State -->
        <div id="category-empty" class="hidden text-center py-16 bg-white/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 mt-6">
            <span class="text-4xl">🔍</span>
            <h3 class="text-base font-bold text-slate-700 dark:text-slate-300 mt-3">ไม่พบผลงานที่ตรงกับคำค้นหา</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">ลองเปลี่ยนคำค้นหา หรือกดล้างการค้นหาเพื่อดูผลงานทั้งหมด</p>
            <button onclick="document.getElementById('category-search').value=''; filterCategoryCards();" class="mt-4 px-4 py-2 text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 rounded-xl hover:bg-brand-100 transition-colors">
                แสดงผลงานทั้งหมดในหมวดนี้
            </button>
        </div>

    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 py-8 transition-colors duration-300">
        <div class="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-center sm:text-left">
                <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    &copy; 2026 ดร.อภิสิทธิ์ ธงไชย (Dr. Apisit Tongchai) • นักวิจัยและนักการศึกษา
                </p>
                <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    คลังสื่อและนวัตกรรมการเรียนรู้เชิงปฏิสัมพันธ์ (Interactive Learning Innovations)
                </p>
            </div>
            <div class="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <a href="index.html" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">หน้าแรก</a>
                <a href="about.html" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">เกี่ยวกับฉัน</a>
                <a href="sitemap.html" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">แผนผังเว็บ</a>
            </div>
        </div>
    </footer>

    <!-- Interactive Filtering & Theme Scripts -->
    <script>
        // Theme toggle logic
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {{
            themeBtn.addEventListener('click', () => {{
                if (document.documentElement.classList.contains('dark')) {{
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                }} else {{
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                }}
            }});
        }}

        // In-category search filter logic
        const searchInput = document.getElementById('category-search');
        const grid = document.getElementById('category-grid');
        const emptyState = document.getElementById('category-empty');
        const resultsCount = document.getElementById('results-count');
        const totalItems = {count};

        function filterCategoryCards() {{
            const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
            if (!grid) return;
            const cards = grid.children;
            let visible = 0;

            for (let i = 0; i < cards.length; i++) {{
                const card = cards[i];
                const text = card.textContent.toLowerCase();
                const matches = !query || text.includes(query);
                if (matches) {{
                    card.style.display = 'flex';
                    visible++;
                }} else {{
                    card.style.display = 'none';
                }}
            }}

            if (emptyState) {{
                emptyState.classList.toggle('hidden', visible > 0);
            }}
            if (resultsCount) {{
                resultsCount.textContent = `แสดงผล ${{visible}} จาก ${{totalItems}} รายการ`;
            }}
        }}

        if (searchInput) {{
            searchInput.addEventListener('input', filterCategoryCards);
        }}
    </script>
</body>
</html>
"""

    all_keys = ['tools', 'science', 'logic', 'ai']

    for cat_key, cat_data in categories.items():
        # Clean badges in items for category page (remove redundant ribbon badges for uncluttered view)
        cleaned_cards = []
        for card_el in cat_data['items']:
            # Clone card soup
            card_soup = BeautifulSoup(str(card_el), 'html.parser')
            # In category full view, cards look cleaner without top-0 right-0 ribbons, or keep only premier 1
            # Let's inspect card title
            h4 = card_soup.find('h4')
            title = h4.get_text(strip=True) if h4 else ''
            
            badge_div = card_soup.find('div', class_=lambda c: c and 'absolute top-0 right-0' in c)
            # Only keep badge for premier items
            premier_items = ['Brain Atlas 3D', 'Circuit Racing 3D', 'ทางไหนดี (Road Watch)']
            if badge_div and not any(p in title for p in premier_items):
                badge_div.decompose()
            cleaned_cards.append(str(card_soup))

        cards_html = '\n'.join(cleaned_cards)

        # Build other pills
        other_pills_list = []
        for ok in all_keys:
            if ok == cat_key:
                other_pills_list.append(f'<span class="px-3 py-1.5 rounded-xl bg-brand-500 text-white font-bold">{categories[ok]["icon"]} {categories[ok]["title_th"]} (ปัจจุบัน)</span>')
            else:
                other_pills_list.append(f'<a href="{categories[ok]["filename"]}" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-950/60 hover:text-brand-600 dark:hover:text-brand-400 transition-colors whitespace-nowrap">{categories[ok]["icon"]} {categories[ok]["title_th"]} ({len(categories[ok]["items"])})</a>')

        other_pills = '\n'.join(other_pills_list)

        html_out = template.format(
            title_th=cat_data['title_th'],
            title_en=cat_data['title_en'],
            desc=cat_data['desc'],
            filename=cat_data['filename'],
            icon=cat_data['icon'],
            count=len(cat_data['items']),
            cards_html=cards_html,
            other_pills=other_pills
        )

        with open(cat_data['filename'], 'w', encoding='utf-8') as f:
            f.write(html_out)
        print(f"Generated {cat_data['filename']} with {len(cat_data['items'])} items.")

if __name__ == '__main__':
    build_category_pages()
