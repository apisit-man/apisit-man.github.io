import re

def build():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    with open('styles.css', 'r', encoding='utf-8') as f:
        css = f.read()
    with open('data.js', 'r', encoding='utf-8') as f:
        data_js = f.read()
    with open('app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # Replace CSS
    html = re.sub(
        r'<link rel="stylesheet" href="styles\.css[^"]*">',
        lambda m: '<style>\n' + css + '\n</style>',
        html
    )

    # Replace JS scripts
    combined_js = '<script>\n/* === data.js === */\n' + data_js + '\n\n/* === app.js === */\n' + app_js + '\n</script>'
    html = re.sub(
        r'<script src="data\.js[^"]*"></script>\s*<script src="app\.js[^"]*"></script>',
        lambda m: combined_js,
        html
    )

    with open('standalone.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully built standalone.html")

if __name__ == '__main__':
    build()
