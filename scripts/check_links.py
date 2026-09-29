import os
import re

files_to_check = [
    'index.html',
    'index-en.html',
    'sitemap.html',
    'category-tools.html',
    'category-science.html',
    'category-logic.html',
    'category-ai.html'
]

broken = []
checked_count = 0

for doc in files_to_check:
    with open(doc, 'r', encoding='utf-8') as f:
        content = f.read()

    hrefs = re.findall(r'href=["\']([^"\']+)["\']', content)
    for h in hrefs:
        if h.startswith(('http://', 'https://', 'mailto:', 'tel:', '#', 'javascript:')):
            continue
        path = h.split('#')[0].split('?')[0]
        if not path:
            continue
        checked_count += 1
        if path.startswith('./'):
            path = path[2:]
        resolved = os.path.abspath(path)
        if not os.path.exists(resolved):
            broken.append((doc, h, path))

print(f"Total internal links checked: {checked_count}")
if broken:
    print(f"❌ Broken links found ({len(broken)}):")
    for b in broken:
        print(f"  In {b[0]}: {b[1]} -> {b[2]} not found")
else:
    print("✅ All internal links exist and are 100% valid!")
