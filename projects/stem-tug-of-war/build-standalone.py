from pathlib import Path
from html import escape
base=Path(__file__).resolve().parent
out=base/'STEM_Tug_of_War_Standalone.html'
html=(base/'index.html').read_text(encoding='utf8')
css=(base/'css/style.css').read_text(encoding='utf8')
# Standalone is guaranteed functional even without access to Google Fonts.
css='\n'.join(line for line in css.splitlines() if not line.startswith('@import url('))
html=html.replace('<link rel="stylesheet" href="./css/style.css">','<style>\n'+css+'\n</style>')
for name in ['game-core.js','questions.js','app.js']:
    js=(base/'js'/name).read_text(encoding='utf8')
    html=html.replace(f'<script src="./js/{name}"></script>','<script>\n'+js+'\n</script>')
out.write_text(html,encoding='utf8')
print(out,round(out.stat().st_size/1024),'KB')
