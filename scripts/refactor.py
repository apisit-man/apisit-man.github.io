import os
import re

html_files = ['index.html', 'index-en.html', 'about.html']

for filepath in html_files:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # CSS extraction
    css_pattern = re.compile(r'<style>\s*/\* Custom scrollbar styles \*/.*?</style>', re.DOTALL)
    if css_pattern.search(content):
        content = css_pattern.sub('<link rel="stylesheet" href="assets/css/style.css">', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Refactoring CSS completed.")
