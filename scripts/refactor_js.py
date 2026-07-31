import os
import re

html_files = ['index.html', 'index-en.html', 'about.html']

for filepath in html_files:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # JS extraction: remove old inline script block
    # It starts with <script>\s*// Mobile menu toggle
    js_pattern1 = re.compile(r'<script>\s*// Mobile menu toggle.*?</script>', re.DOTALL)
    
    # Second script block starts with document.addEventListener('DOMContentLoaded', () => {\n            const searchModal
    js_pattern2 = re.compile(r'<script>\s*document\.addEventListener\(\'DOMContentLoaded\', \(\) => {\s*const searchModal.*?</script>', re.DOTALL)
    
    if js_pattern1.search(content):
        content = js_pattern1.sub('<script src="assets/js/main.js"></script>', content)
        
    if js_pattern2.search(content):
        # We replace the second script block with an empty string since main.js contains both
        content = js_pattern2.sub('', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Refactoring JS completed.")
