import os

template_path = 'c:/Users/atong/Documents/antigravity/personal website/articles/ai-literacy.html'
output_path = 'c:/Users/atong/Documents/antigravity/personal website/articles/ai-literacy-oecd-guide.html'

with open(template_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract header before <article>
header_end_idx = content.find('<article')
header_part = content[:header_end_idx]

# Extract footer after </article>
footer_start_idx = content.find('</article>') + len('</article>')
footer_part = content[footer_start_idx:]

new_title_tag = '<title>เมื่อ AI ไม่ใช่แค่วิชาคอมพิวเตอร์: ถอดรหัสคู่มือ OECD กับการบูรณาการ AI Literacy - อภิสิทธิ์ ธงไชย</title>'
header_part = header_part.replace('<title>AI Literacy คืออะไร? ครูควรเข้าใจอย่างไร และจะส่งเสริมผู้เรียนในยุค AI ได้อย่างไร - อภิสิทธิ์ ธงไชย</title>', new_title_tag)

new_article_content = '''<article class="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-8">
            
            <!-- Article Header -->
            <div class="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-8">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/50 text-violet-750 dark:text-violet-300 border border-violet-100 dark:border-violet-900/30">
                    💡 OECD Framework & AI Literacy
                </div>
                <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                    เมื่อ AI ไม่ใช่แค่วิชาคอมพิวเตอร์: ถอดรหัสคู่มือ OECD กับการบูรณาการ ‘AI Literacy’ ในทุกวิชา
                </h1>
                <p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    การเตรียมเยาวชนให้พร้อมก้าวสู่โลกอนาคตอย่างมั่นใจ ปลอดภัย และรู้เท่าทัน
                </p>
                <div class="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 pt-2">
                    <span class="flex items-center gap-1">
                        👤 โดย ดร.อภิสิทธิ์ ธงไชย
                    </span>
                    <span>•</span>
                    <span class="flex items-center gap-1">
                        📅 สิงหาคม 2026
                    </span>
                </div>
            </div>

            <!-- Article Body -->
            <div class="space-y-6 text-slate-700 dark:text-slate-350 leading-relaxed text-base md:text-lg">
                
                <p>ในวันที่ปัญญาประดิษฐ์ (AI) เข้ามามีบทบาทในชีวิตประจำวันและการเรียนรู้อย่างรวดเร็ว คำถามสำคัญที่ครูและนักการศึกษามักพบเจอคือ: <strong>“เราควรจำกัดการสอนเรื่อง AI ไว้แค่วิชาคอมพิวเตอร์หรือไม่?”</strong> หรือ <strong>“เราจำเป็นต้องเพิ่มวิชาใหม่เข้ามาในหลักสูตรที่แน่นอยู่แล้ว?”</strong></p>

                <!-- Section 1 -->
                <div class="space-y-3 pt-4">
                    <p>เร็วๆ นี้ องค์การเพื่อความร่วมมือทางเศรษฐกิจและการพัฒนา (OECD) ได้ออกคู่มือฉบับสำคัญในชื่อ <strong>“Navigating AI in Education: A Cross-Subject Guide for Teachers and Educators”</strong> (สามารถดาวน์โหลดและอ่านเอกสารฉบับเต็มได้ที่ <a href="https://drive.google.com/file/d/1BdbvMJJOU70Ohkd0M5wVfqg92X-rB1Mg/view" target="_blank" class="text-brand-600 dark:text-brand-400 hover:underline">ลิงก์นี้</a>)</p>
                    
                    <blockquote class="border-l-4 border-brand-500 bg-slate-50 dark:bg-slate-950 p-5 rounded-r-2xl text-slate-650 dark:text-slate-400 italic">
                        💡 “AI Literacy ไม่ใช่เรื่องของการยัดเยียดเนื้อหาใหม่จนล้นตารางสอน แต่คือการใช้ ‘เลนส์เฉพาะตัว’ ของแต่ละวิชา ช่วยให้ผู้เรียนเข้าใจ ประเมิน และรู้เท่าทัน AI ได้อย่างลึกซึ้งและรอบด้าน”
                    </blockquote>
                    <p>เพราะการรู้เท่าทัน AI ไม่ได้จำกัดอยู่แค่ทักษะทางเทคนิค (Technical Skills) แต่คือทักษะการคิดเชิงวิพากษ์และจริยธรรม (Critical & Ethical Thinking) ที่ต้องบูรณาการผ่าน 6 กลุ่มสาระหลัก ดังนี้ครับ:</p>
                </div>

                <!-- Section 2 -->
                <div class="space-y-4 pt-6">
                    <div class="grid gap-6 mt-2">
                        <!-- Component 1 -->
                        <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">📚 1. ภาษาและการรู้หนังสือ (Languages & Literacy)</h3>
                            <p class="text-sm">AI ช่วยร่างข้อความและสรุปบทความได้อย่างรวดเร็ว แต่ในห้องเรียนภาษา นี่คือโอกาสทองในการสอนเรื่อง “น้ำเสียงเฉพาะตัว” (Human Voice) และ “ความรับผิดชอบในการสื่อสาร” ชวนผู้เรียนเปรียบเทียบงานเขียนของตนเองกับ AI เพื่อค้นหาคุณค่าที่ปัญญาประดิษฐ์เลียนแบบไม่ได้ พร้อมฝึกทักษะ Fact-checking ตรวจสอบความถูกต้องของข้อมูล</p>
                        </div>

                        <!-- Component 2 -->
                        <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">🏛️ 2. มนุษยศาสตร์และสังคมศึกษา (Humanities & Social Studies)</h3>
                            <p class="text-sm">ชวนผู้เรียนมอง AI ในฐานะปรากฏการณ์ทางสังคม วิเคราะห์ว่าอัลกอริทึมในการคัดกรองข่าวสาร (Curation) ส่งผลต่อความคิดเห็นและมุมมองต่อโลกอย่างไร รวมถึงตรวจสอบอคติ (Bias) และมุมมองทางประวัติศาสตร์หรือวัฒนธรรมที่อาจตกหล่นไปในชุดข้อมูลฝึกฝน</p>
                        </div>

                        <!-- Component 3 -->
                        <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">📐 3. คณิตศาสตร์ (Mathematics)</h3>
                            <p class="text-sm">เปลี่ยนสมการและสถิติให้มีชีวิต เพราะเบื้องหลังของ Machine Learning คือ “ฟังก์ชันทางคณิตศาสตร์” และ “การกระจายตัวของข้อมูลทางสถิติ” เมื่อนักเรียนเข้าใจคณิตศาสตร์ พวกเขาจะเข้าใจหลักการคาดการณ์ของโมเดล และสามารถประเมินความน่าเชื่อถือของผลลัพธ์ได้อย่างมีเหตุผล</p>
                        </div>
                        
                        <!-- Component 4 -->
                        <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">🔬 4. วิทยาศาสตร์ (Science)</h3>
                            <p class="text-sm">ฝึกใช้ AI เป็นผู้ช่วยระดมสมมติฐานใหม่ๆ แต่ยังคงหัวใจของการสืบเสาะทางวิทยาศาสตร์ นั่นคือ “การทดลองและหลักฐานเชิงประจักษ์” พร้อมทั้งชวนมองประเด็นความยั่งยืนอย่าง “AI Environmental Footprint” หรือปริมาณพลังงานและทรัพยากรที่ใช้ในการประมวลผลโมเดล AI</p>
                        </div>
                        
                        <!-- Component 5 -->
                        <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">🎨 5. ศิลปะและสาขาสร้างสรรค์ (Arts & Creative Disciplines)</h3>
                            <p class="text-sm">เมื่อ Generative AI สร้างภาพและดนตรีได้ในเสี้ยววินาที ห้องเรียนศิลปะจึงเป็นพื้นที่สำคัญในการถกเถียงเรื่อง “จริยธรรม ลิขสิทธิ์ และความยินยอมของเจ้าของผลงาน” ตลอดจนการสนับสนุนให้นักเรียนใช้ AI เป็นเพียงเครื่องมือจุดประกาย แต่ยังคงการตัดสินใจและเจตจำนงของมนุษย์ไว้เป็นแกนกลาง</p>
                        </div>
                        
                        <!-- Component 6 -->
                        <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">💻 6. วิทยาการคำนวณ (Computer Science)</h3>
                            <p class="text-sm">ยกระดับผู้เรียนจากการเป็นเพียง "ผู้ใช้งาน" (Consumers) ไปสู่การเป็น "ผู้ออกแบบและผู้ประเมินอย่างมีความรับผิดชอบ" (Responsible Creators & Evaluators) ทำความเข้าใจกลไกของข้อมูล อัลกอริทึม และตระหนักถึงผลกระทบเชิงจริยธรรมของเทคโนโลยีที่มีต่อสังคม</p>
                        </div>
                    </div>
                </div>

                <!-- Section 3 -->
                <div class="space-y-4 pt-6">
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span class="w-1.5 h-6 bg-brand-500 rounded-full"></span>
                        🔑 ชุดคำถาม 3 มิติ (Key Questions)
                    </h2>
                    <p>ชุดคำถามที่ครูสามารถนำไปชวนคิดในชั้นเรียนได้ทันที:</p>
                    <div class="bg-brand-50/50 dark:bg-slate-950 border border-brand-100/50 dark:border-slate-800 rounded-2xl p-6 space-y-4 text-sm">
                        <div class="grid gap-3">
                            <div><strong>• In the Moment (ขณะใช้งาน):</strong> ผลลัพธ์นี้ถูกต้องหรือไม่? มีจุดไหนที่บ่งบอกว่าเป็นภาษาของ AI?</div>
                            <div><strong>• Exploring Further (มองลึกขึ้น):</strong> ระบบนี้ถูกออกแบบมาเพื่อใคร? มีมุมมองหรือกลุ่มคนใดที่ถูกมองข้าม?</div>
                            <div><strong>• Reflective Use (สะท้อนคิด):</strong> การใช้ AI ช่วยทำงานนี้ ทำให้เราคิดวิเคราะห์น้อยลงหรือช่วยขยายกรอบคิด? ความเป็นเจ้าของผลงานยังเป็นของเราหรือไม่?</div>
                        </div>
                    </div>
                </div>

                <!-- Section 4 -->
                <div class="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        🎯 บทสรุปสำหรับผู้สอนและนักการศึกษา
                    </h2>
                    <p>
                        เทคโนโลยีและเครื่องมือ AI อาจเปลี่ยนแปลงอย่างรวดเร็วทุกวัน แต่ "รากฐานทางความคิด" — การตั้งคำถาม การตรวจสอบข้อเท็จจริง และความรับผิดชอบเชิงจริยธรรม — เป็นทักษะที่ยั่งยืน
                    </p>
                    <p>
                        AI Literacy จึงไม่ใช่หน้าที่ของครูวิชาใดวิชาหนึ่งเพียงลำพัง แต่เป็น <strong>“ความรับผิดชอบร่วมกันของทุกคนในระบบการศึกษา”</strong> เพื่อเตรียมเยาวชนให้พร้อมก้าวสู่โลกอนาคตอย่างมั่นใจ ปลอดภัย และรู้เท่าทันครับ 💡🌱
                    </p>
                    <div class="flex flex-wrap gap-2 pt-4">
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#AIEducation</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#AILiteracy</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#การศึกษาไทย</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#นวัตกรรมการศึกษา</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#OECD</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#ทักษะแห่งอนาคต</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#ครูยุคใหม่</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#EdTech</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#CriticalThinking</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#การจัดการเรียนรู้</span>
                    </div>
                </div>

            </div>
        </article>'''

full_content = header_part + new_article_content + footer_part
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(full_content)
print('Done!')
