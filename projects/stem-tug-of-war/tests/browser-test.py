from playwright.sync_api import sync_playwright
from pathlib import Path
P=Path('/mnt/data/stem-tug-of-war')
HTML=(P.parent/'STEM_Tug_of_War_Standalone.html').read_text(encoding='utf8')
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 page=browser.new_page(viewport={'width':1440,'height':900},device_scale_factor=1)
 errors=[]
 page.on('pageerror',lambda ex:errors.append(str(ex)))
 page.set_content(HTML,wait_until='domcontentloaded')
 page.screenshot(path=str(P/'home-preview.png'),full_page=True)
 print('Home title',page.locator('h1').inner_text())
 assert page.locator('#screen-home').is_visible()
 page.locator('#home-play').click()
 assert page.locator('#screen-setup').is_visible()
 print('question count',page.locator('#setup-question-count').inner_text())
 page.screenshot(path=str(P/'setup-preview.png'),full_page=True)
 page.locator('#setup-start').click()
 assert page.locator('#screen-battle').is_visible()
 assert page.locator('#blue-answers button').count()==4
 assert page.locator('#red-answers button').count()==4
 assert page.locator('#battle-timer').inner_text().startswith('01:')
 print('Blue question:',page.locator('#blue-question').inner_text())
 page.screenshot(path=str(P/'battle-preview.png'),full_page=True)
 page.locator('#blue-answers button').first.click()
 page.wait_for_timeout(650)
 print('after answer',page.locator('#blue-stats').inner_text())
 assert page.locator('#blue-stats').inner_text() != '✓ 0 · × 0'
 page.locator('#battle-pause').click()
 assert page.locator('#battle-shade').is_visible()
 prev=page.locator('#battle-timer').inner_text()
 page.wait_for_timeout(1100)
 assert page.locator('#battle-timer').inner_text()==prev
 page.locator('#battle-resume').click()
 assert page.locator('#battle-shade').is_hidden()
 # Simultaneous click event simulated via DOM dispatch on the same tick.
 page.evaluate('''() => {
   const blue = document.querySelector('#blue-answers button:not(:disabled)');
   const red = document.querySelector('#red-answers button:not(:disabled)');
   blue.click();red.click();
 }''')
 page.wait_for_timeout(650)
 print('after both',page.locator('#blue-stats').inner_text(),page.locator('#red-stats').inner_text())
 page.on('dialog',lambda dialog:dialog.accept())
 page.locator('#battle-exit').click()
 page.close()
 page=browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
 page.on('pageerror',lambda ex:errors.append(str(ex)))
 page.set_content(HTML,wait_until='domcontentloaded')
 page.screenshot(path=str(P/'mobile-preview.png'),full_page=True)
 assert page.locator('#home-play').is_visible()
 page.locator('#home-studio').click()
 assert page.locator('#studio-total').inner_text()=='100'
 page.locator('#studio-add').click()
 assert page.locator('#question-dialog').is_visible()
 page.locator('#dialog-close').click()
 page.locator('#studio-back').click()
 page.locator('#home-play').click()
 page.locator('#setup-start').click()
 page.screenshot(path=str(P/'mobile-battle-preview.png'),full_page=True)
 assert page.locator('#blue-answers button').count()==4
 assert page.locator('#red-answers button').count()==4
 print('Mobile scroll width',page.evaluate('document.documentElement.scrollWidth'),'viewport',page.evaluate('innerWidth'))
 print('JS errors:',errors)
 assert not errors,errors
 browser.close()
