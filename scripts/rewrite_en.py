import re

file_path = 'c:/Users/atong/Documents/antigravity/personal website/index-en.html'
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Desktop Nav
    content = re.sub(
        r'<a href="#tools" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Teaching Tools</a>',
        '<a href="#innovations" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Portfolio & Innovations</a>',
        content
    )
    content = re.sub(
        r'<a href="#publications" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Publications & Resources</a>',
        '<a href="#publications" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Publications & Articles</a>',
        content
    )
    content = re.sub(
        r'<a href="apisit_cv\.pdf" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors inline-flex items-center gap-1\.5" target="_blank">\s*<span>Download CV</span>\s*<svg.*?</svg>\s*</a>',
        '<a href="apisit_cv.pdf" class="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-brand-500/20 flex items-center gap-1.5" target="_blank"><span>Download CV</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></a>',
        content,
        flags=re.DOTALL
    )

    # 2. Update Mobile Nav
    content = re.sub(
        r'<a href="#tools" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1">Teaching Tools</a>',
        '<a href="#innovations" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1">Portfolio & Innovations</a>',
        content
    )
    content = re.sub(
        r'<a href="#publications" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1">Publications & Resources</a>',
        '<a href="#publications" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-1">Publications & Articles</a>',
        content
    )

    # 3. Hero Section
    content = re.sub(
        r'<a href="#tools" class="px-6 py-3\.5 rounded-xl font-semibold bg-brand-600 hover:bg-brand-700 dark:bg-brand-600 dark:hover:bg-brand-500 text-white shadow-lg hover:shadow-brand-500/20 hover:-translate-y-0\.5 transition-all duration-300 text-center">\s*⏱️ Try Teaching Tools\s*</a>',
        '<a href="#innovations" class="px-6 py-3.5 rounded-xl font-semibold bg-brand-600 hover:bg-brand-700 dark:bg-brand-600 dark:hover:bg-brand-500 text-white shadow-lg hover:shadow-brand-500/20 hover:-translate-y-0.5 transition-all duration-300 text-center">\n                        ⏱️ Try Interactive Tools\n                    </a>',
        content
    )

    # 4. Innovations Section (formerly #tools)
    content = re.sub(
        r'<section id="tools" class="py-20 border-t border-slate-200/50 dark:border-slate-800/50">',
        '<section id="innovations" class="py-20 border-t border-slate-200/50 dark:border-slate-800/50">',
        content
    )
    content = re.sub(
        r'Featured Teaching Tools \(Classroom Interactive Tools\)',
        'Interactive Tools & Games',
        content
    )
    content = re.sub(
        r'Free web applications for lesson introduction, time management, and physics simulations.',
        'Free web applications, board games, and learning activities for lesson introduction and classroom management.',
        content
    )


    # 5. Publications Section
    content = re.sub(
        r'Knowledge & Resource Hub',
        'Publications & Articles',
        content
    )
    content = re.sub(
        r'Collection of national and international research articles, ideas for learning management, and STEM activity games.',
        'Collection of national and international research articles, alongside articles and ideas for learning management.',
        content
    )

    # Remove Tabs UI
    content = re.sub(
        r'<!-- Showcase Hub Filter Tabs -->[\s\S]*?</div>\s*</div>',
        '',
        content
    )

    # Modify Academic section header & wrapper
    content = re.sub(
        r'<div id="showcase-academic" class="space-y-10">',
        '<div id="showcase-academic" class="space-y-10">\n                <!-- Section Title for Academic -->\n                <div class="mb-8 border-b border-slate-200/50 dark:border-slate-800/50 pb-4">\n                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white">📚 Academic Publications</h3>\n                </div>',
        content
    )

    # Modify Articles section header & wrapper (remove hidden class)
    content = re.sub(
        r'<div id="showcase-articles" class="space-y-6 hidden">',
        '<div id="showcase-articles" class="space-y-6 mt-16">\n                <!-- Section Title for Articles -->\n                <div class="mb-8 border-b border-slate-200/50 dark:border-slate-800/50 pb-4">\n                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white">✍️ Articles & Ideas</h3>\n                </div>',
        content
    )

    # Remove Resources section entirely
    content = re.sub(
        r'<!-- 3\. Resources, Activities & Games Tab Content \(hidden by default\) -->[\s\S]*?<!-- Contact Section -->',
        '<!-- Contact Section -->',
        content
    )

    # Remove JavaScript for tabs
    content = re.sub(
        r'// Showcase Hub Tab Switcher[\s\S]*?}\n',
        '',
        content
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Successfully modified index-en.html')
except Exception as e:
    print(f"Error: {e}")
