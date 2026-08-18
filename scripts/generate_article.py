import os

template_path = 'c:/Users/atong/Documents/antigravity/personal website/articles/ai-literacy.html'
output_path = 'c:/Users/atong/Documents/antigravity/personal website/articles/ai-education-updates.html'

with open(template_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract header before <article>
header_end_idx = content.find('<article')
header_part = content[:header_end_idx]

# Extract footer after </article>
footer_start_idx = content.find('</article>') + len('</article>')
footer_part = content[footer_start_idx:]

new_title_tag = '<title>อัปเดตงานวิจัยและเทรนด์ใหม่ล่าสุดเกี่ยวกับ AI in Education - อภิสิทธิ์ ธงไชย</title>'
header_part = header_part.replace('<title>AI Literacy คืออะไร? ครูควรเข้าใจอย่างไร และจะส่งเสริมผู้เรียนในยุค AI ได้อย่างไร - อภิสิทธิ์ ธงไชย</title>', new_title_tag)

new_article_content = '''<article class="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-8">
            
            <!-- Article Header -->
            <div class="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-8">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-950/50 text-violet-750 dark:text-violet-300 border border-violet-100 dark:border-violet-900/30">
                    🛡️ AI in Education
                </div>
                <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                    อัปเดตงานวิจัยและเทรนด์ใหม่ล่าสุดเกี่ยวกับ AI in Education
                </h1>
                <p class="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    ระบบเตือนภัยล่วงหน้า, การลดภาวะหมดไฟของครู และการจับผิด AI Hallucination
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
                
                <p>สวัสดีครับ! อัปเดตงานวิจัยและเทรนด์ใหม่ล่าสุดเกี่ยวกับ AI in Education ประจำวันครับ วันนี้ชวนติดตาม 3 ประเด็นสำคัญเรื่อง "ระบบ AI เตือนภัยล่วงหน้าเพื่อดูแลนักเรียน (Early Warning Systems)", "AI กับการลดภาวะหมดไฟของครู (Teacher Burnout)" และ "การฝึกทักษะจับผิด AI Hallucination" ครับ</p>

                <!-- Section 1 -->
                <div class="space-y-3 pt-4">
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span class="w-1.5 h-6 bg-brand-500 rounded-full"></span>
                        🛡️ AI ดูแลผู้เรียนรอบด้าน: ตั้งแต่ระบบเตือนภัยล่วงหน้า สู่การลดภาระงานครู 💡
                    </h2>
                    <p>เมื่อการนำ AI มาใช้ในโรงเรียนไม่ได้หยุดอยู่แค่การสอนในห้องเรียน แต่ขยายไปสู่การวิเคราะห์พฤติกรรมการเรียนรู้เพื่อช่วยเหลือผู้เรียนได้ทันท่วงที สรุปสาระสำคัญจากงานวิจัยล่าสุดได้ดังนี้ครับ:</p>
                </div>

                <!-- Section 2 -->
                <div class="space-y-4 pt-6">
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span class="w-1.5 h-6 bg-brand-500 rounded-full"></span>
                        🌐 ข้อค้นพบจากงานวิจัยระดับสากล
                    </h2>
                    
                    <div class="grid gap-6 mt-4">
                        <!-- Component 1 -->
                        <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">ระบบเตือนภัยล่วงหน้า (AI-Driven Early Warning System: EWS)</h3>
                            <p class="text-sm">งานวิจัยใน <a href="https://www.researchgate.net/publication/403631934_AI-BASED_EARLY_WARNING_SYSTEM_EWS_PREDICTING_DROPOUT_AND_LOW_ACADEMIC_PERFORMANCE_RISK_USING_LEARNING_ANALYTICS_DATA" target="_blank" class="text-brand-600 dark:text-brand-400 hover:underline font-semibold">ResearchGate (2026)</a> และผลการทดลองทางคลินิกการศึกษาใน <a href="https://impactinternationaljournals.com/publications/index.php/ojs/article/view/472/386" target="_blank" class="text-brand-600 dark:text-brand-400 hover:underline font-semibold">Impact International Journals (2026)</a> ชี้ว่า การใช้การวิเคราะห์การเรียนรู้ (Learning Analytics) ร่วมกับ Machine Learning ช่วยให้สถานศึกษาระบุกลุ่มนักเรียนที่มีความเสี่ยงต่อผลการเรียนถดถอยหรือเสี่ยงหลุดออกจากระบบได้ตั้งแต่เนิ่นๆ ส่งผลให้ครูเข้าช่วยเหลือได้ตรงจุดและเพิ่มอัตราการคงอยู่ของนักเรียน (Student Retention) ได้อย่างมีนัยสำคัญ</p>
                        </div>

                        <!-- Component 2 -->
                        <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">คืนเวลาให้ครู ลดความเหนื่อยล้าสะสม</h3>
                            <p class="text-sm">รายงานสังเคราะห์ใน <a href="https://openeducat.org/articles/reducing-teacher-burnout-with-ai/" target="_blank" class="text-brand-600 dark:text-brand-400 hover:underline font-semibold">OpenEduCat (2026)</a> และ <a href="https://www.k12dive.com/news/can-ai-save-teachers-time-and-reduce-burnout/823917/" target="_blank" class="text-brand-600 dark:text-brand-400 hover:underline font-semibold">K-12 Dive</a> ระบุว่า การให้ AI ช่วยจัดการงานเอกสาร การออกแบบแผนการสอนแบบแยกตามกลุ่มความสามารถ (Differentiated Instruction) และการสร้างคลังข้อสอบ ช่วยลดเวลาทำงานนอกเวลาของครูลงได้อย่างมาก ซึ่งเป็นกุญแจสำคัญในการป้องกันภาวะหมดไฟ (Burnout) ของครูผู้สอน</p>
                        </div>

                        <!-- Component 3 -->
                        <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                            <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">เปลี่ยนจุดอ่อน AI สู่การฝึกคิดวิเคราะห์ (Fact-Checking AI Hallucination)</h3>
                            <p class="text-sm">งานวิจัยจาก <a href="https://arxiv.org/html/2602.17671v1" target="_blank" class="text-brand-600 dark:text-brand-400 hover:underline font-semibold">ArXiv / ResearchGate (2026)</a> และ <a href="https://scale.stanford.edu/ai/repository/distinguishing-fact-fiction-student-traits-attitudes-and-ai-hallucination-detection" target="_blank" class="text-brand-600 dark:text-brand-400 hover:underline font-semibold">Stanford University Repository</a> เสนอให้ใช้ปรากฏการณ์ที่ AI สร้างข้อมูลผิดพลาด (AI Hallucination) เป็นแบบฝึกหัดในห้องเรียน โดยให้นักเรียนฝึกสืบค้น ตรวจสอบแหล่งอ้างอิง และประเมินความน่าเชื่อถือ ซึ่งช่วยพัฒนาทักษะการคิดวิเคราะห์ (Critical Thinking) ได้เป็นอย่างดี</p>
                        </div>
                    </div>
                </div>

                <!-- Section 3 -->
                <div class="space-y-4 pt-6">
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span class="w-1.5 h-6 bg-brand-500 rounded-full"></span>
                        🇹🇭 แนวทางการขับเคลื่อนในประเทศไทย
                    </h2>
                    <div class="bg-brand-50/50 dark:bg-slate-950 border border-brand-100/50 dark:border-slate-800 rounded-2xl p-6 space-y-4 text-sm">
                        <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">ส่งเสริมการใช้ AI เพื่อลดภาระและสร้างความปลอดภัย</h3>
                        <p>ตามแนวทางของ <strong>กระทรวงศึกษาธิการ</strong> ได้เน้นย้ำการนำ "คู่มือการใช้ AI ในระดับการศึกษาขั้นพื้นฐาน" มาเป็นแนวทางหลักให้ครูเลือกใช้เครื่องมือ AI ช่วยสร้างสรรค์สื่อและบริหารจัดการชั้นเรียนอย่างมีจริยธรรมและคุ้มครองข้อมูลส่วนบุคคลของนักเรียน</p>
                    </div>
                </div>

                <!-- Section 4 -->
                <div class="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        📌 สรุปข้อคิดสำหรับนักการศึกษา:
                    </h2>
                    <blockquote class="border-l-4 border-brand-500 bg-slate-50 dark:bg-slate-950 p-5 rounded-r-2xl text-slate-650 dark:text-slate-400 italic">
                        "เป้าหมายสูงสุดของการนำ AI เข้ามาช่วยงานการศึกษา คือการดึงงานเอกสารและงานซ้ำซ้อนออกจากครู เพื่อคืนเวลาอันมีค่าให้ครูได้กลับไปทำหน้าที่ที่สำคัญที่สุด นั่นคือการ <strong>ดูแล ให้คำปรึกษา และสร้างแรงบันดาลใจ</strong> แก่ผู้เรียนเป็นรายบุคคลครับ"
                    </blockquote>
                    <div class="flex flex-wrap gap-2 pt-4">
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#AInEducation</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#LearningAnalytics</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#EarlyWarningSystem</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#TeacherWellbeing</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#CriticalThinking</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#AIHallucination</span>
                        <span class="text-sm text-brand-600 dark:text-brand-400 font-semibold">#การศึกษาไทย</span>
                    </div>
                </div>

            </div>
        </article>'''

full_content = header_part + new_article_content + footer_part
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(full_content)
print('Done!')
