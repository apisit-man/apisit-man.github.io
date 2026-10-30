from pathlib import Path
from playwright.sync_api import sync_playwright
P=Path('/mnt/data/stem-tug-of-war')
HTML=(P.parent/'STEM_Tug_of_War_Standalone.html').read_text('utf8')
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 page=browser.new_page(viewport={'width':1440,'height':900},accept_downloads=True)
 page.set_default_timeout(9000)
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content(HTML,wait_until='domcontentloaded')
 page.locator('#home-play').click();page.locator('#setup-start').click()
 for round_n in (1,2):
  for i in range(6):
   qtext=page.locator('#blue-question').inner_text()
   correct=page.evaluate('''text=>{const q=window.STEM_BUILTIN_QUESTIONS.find(q=>q.question===text);return q&&q.correctIndex;}''',qtext)
   assert correct is not None,(round_n,i,qtext)
   page.locator(f'#blue-answers button[data-choice="{correct}"]').click()
   if i<5:
    page.wait_for_timeout(650)
    assert page.locator('#blue-stats').inner_text().startswith('✓ '+str(i+1)),page.locator('#blue-stats').inner_text()
  assert page.locator('#screen-result').is_visible()
  print('round',round_n,'result title',page.locator('#result-title').inner_text(),flush=True)
  if round_n==1:
   assert 'ชนะรอบนี้' in page.locator('#result-title').inner_text()
   page.locator('#result-next').click()
  else:
   assert 'คว้าชัยทั้งเกม' in page.locator('#result-title').inner_text()
   assert 'แข่งใหม่' in page.locator('#result-next').inner_text()
 page.screenshot(path=str(P/'result-preview.png'),full_page=True)
 page.locator('#result-next').click()
 assert page.locator('#screen-battle').is_visible(),'restart match'
 assert page.locator('#hud-blue-wins').inner_text()=='☆ ☆'
 page.on('dialog',lambda dialog:dialog.accept())
 page.locator('#battle-exit').click()
 page.locator('#home-studio').click()
 assert page.locator('#studio-total').inner_text()=='100'
 page.locator('#studio-add').click()
 page.locator('#q-text').fill('เหตุใดจึงควรทดสอบต้นแบบหลายครั้งก่อนเลือกแนวทาง?')
 page.locator('#q-category').select_option('design')
 for i,v in enumerate(['เพื่อลดความคลาดเคลื่อน','เพื่อให้เครื่องมือแพงขึ้น','เพื่อให้คะแนนสวย','เพื่อเปลี่ยนชื่อทีม']):page.locator(f'#q-choice-{i}').fill(v)
 page.locator('#q-correct').select_option('0')
 page.locator('#q-explanation').fill('การทดสอบซ้ำช่วยตรวจความสม่ำเสมอและประเมินความคลาดเคลื่อน')
 page.locator('#question-form button[type=submit]').click()
 assert page.locator('#studio-total').inner_text()=='101'
 page.locator('#studio-search').fill('เหตุใดจึงควรทดสอบต้นแบบหลายครั้ง')
 assert page.locator('.question-tile').count()==1
 page.locator('.tile-actions button[data-action=edit]').click()
 page.locator('#q-text').fill('เหตุใดจึงควรทดสอบต้นแบบซ้ำหลายครั้ง?')
 page.locator('#question-form button[type=submit]').click()
 page.locator('#studio-search').fill('ทดสอบต้นแบบซ้ำ')
 assert 'ทดสอบต้นแบบซ้ำ' in page.locator('.question-tile h4').inner_text()
 with page.expect_download() as event:page.locator('#studio-export').click()
 download=event.value
 print('downloaded',download.suggested_filename,flush=True)
 assert download.suggested_filename=='stem-tug-questions.json'
 page.locator('.tile-actions button[data-action=delete]').click()
 assert page.locator('#studio-total').inner_text()=='100'
 print('CRUD, export, match: PASS; JS errors',errors,flush=True)
 assert not errors,errors
 browser.close()
