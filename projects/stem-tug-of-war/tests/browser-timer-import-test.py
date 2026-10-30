from pathlib import Path
from playwright.sync_api import sync_playwright
import json
P=Path('/mnt/data/stem-tug-of-war')
HTML=(P.parent/'STEM_Tug_of_War_Standalone.html').read_text('utf8')
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 page=browser.new_page(viewport={'width':1280,'height':800})
 page.set_default_timeout(7000)
 page.on('dialog',lambda dlg:dlg.accept())
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.clock.install()
 page.set_content(HTML,wait_until='domcontentloaded')
 page.locator('#home-play').click();page.locator('#setup-start').click()
 page.clock.fast_forward(60050)
 assert page.locator('#screen-result').is_visible(),'timer ends round at 60s'
 assert page.locator('#result-title').inner_text().startswith('เสมอกัน'),'0 tug points => tie'
 print('TIME: 60s => draw PASS',flush=True)
 page.locator('#result-home').click();page.locator('#home-studio').click()
 sample={'questions':[{'id':'IMPORTED-DEMO','category':'systems','difficulty':'easy','question':'การเปิดปุ่มสวิตช์ส่งผลใดต่อระบบไฟฟ้าในวงจรที่สมบูรณ์?','choices':['วงจรเปิดไฟไม่ไหล','วงจรปิดให้ไฟไหล','ทำให้แสงสะท้อน','ทำให้สายไฟยาวขึ้น'],'correctIndex':1,'explanation':'วงจรปิดยอมให้กระแสไฟฟ้าไหลเมื่อมีแหล่งจ่ายและอุปกรณ์ที่ต่อครบ'}]}
 page.locator('#studio-import-file').set_input_files(files=[{'name':'demo.json','mimeType':'application/json','buffer':json.dumps(sample,ensure_ascii=False).encode('utf-8')}])
 assert page.locator('#studio-total').inner_text()=='101'
 page.locator('#studio-search').fill('IMPORTED-DEMO')
 assert page.locator('.question-tile').count()==1
 print('JSON IMPORT: PASS',flush=True)
 page.locator('#studio-reset').click()
 assert page.locator('#studio-total').inner_text()=='100'
 print('RESET BANK: PASS; JS errors:',errors,flush=True)
 assert not errors
 browser.close()
