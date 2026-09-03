const searchData = {
    th: [
        {
            title: "CodeQuest: Monkey Adventure",
            description: "เกมสอนเขียนโค้ดสไตล์ CodeMonkey ระดับ ม.ต้น (ว4.2 สสวท.) ครอบคลุม Sequence, Loop, ออบเจกต์เต่า และ if-else พร้อมระบบ Level Builder สร้างด่านเองได้",
            tags: ["codequest", "codemonkey", "เกมสอนโค้ด", "โค้ดดิ้ง", "coding", "วิทยาการคำนวณ", "สร้างด่าน", "level builder", "ว4.2", "เกมการศึกษา", "algorithm", "loop", "python", "javascript"],
            url: "./projects/code-monkey-prototype/index.html",
            type: "Game",
            icon: "🐒"
        },
        {
            title: "AI Prompt Builder",
            description: "ผู้ช่วยเขียน prompt ที่มีประสิทธิภาพ ทำหน้าที่เสมือนล่าม ช่วยเรียบเรียงความคิดให้เป็นคำสั่งที่ชัดเจน เพื่อให้ AI เข้าใจและทำงานได้ตรงประเด็น",
            tags: ["ai", "prompt", "builder", "เครื่องมือช่วยสอน", "เครื่องมือ", "คำสั่ง"],
            url: "./applications/prompt-builder/index.html",
            type: "Tool",
            icon: "🪄"
        },
        {
            title: "Cyber Logic: รวมเกมฝึกสมอง",
            description: "ชุดเกมกระดานฝึกสมองสายวิทยาการคำนวณ เช่น ซูโดกุ ทาคูซุ โนโนแกรม ถอดรหัสฐานสอง และวงจรตรรกะ",
            tags: ["เกมฝึกสมอง", "วิทยาการคำนวณ", "sudoku", "nonogram", "logic", "binary", "ตรรกะ", "เกมการศึกษา"],
            url: "./projects/puzzle-collection/index.html",
            type: "Game",
            icon: "🧠"
        },
        {
            title: "ไซเบอร์โรเวอร์ (Cyber Rover)",
            description: "เกมเขียนโปรแกรมบังคับยานสำรวจด้วยบล็อกคำสั่ง (Loop และ If-Else) ภายใต้หน่วยความจำที่จำกัด",
            tags: ["เกมฝึกสมอง", "วิทยาการคำนวณ", "coding", "algorithm", "loop", "เขียนโปรแกรม", "หุ่นยนต์", "โค้ดดิ้ง"],
            url: "./projects/puzzle-collection/algorithmlogic.html",
            type: "Game",
            icon: "🤖"
        },
        {
            title: "ถอดรหัสพิกเซล (Pixel Decoder)",
            description: "เกมถอดรหัสลับการบีบอัดข้อมูลแบบ Run-Length Encoding (RLE) แล้วระบายสีเพื่อกู้คืนภาพพิกเซล",
            tags: ["เกมฝึกสมอง", "วิทยาการคำนวณ", "pixel", "rle", "ถอดรหัส", "ศิลปะพิกเซล", "บีบอัดข้อมูล", "พิกเซล"],
            url: "./projects/puzzle-collection/pixeldecoder.html",
            type: "Game",
            icon: "👾"
        },
        {
            title: "Friction Match: จับคู่แรงเสียดทาน",
            description: "มินิเกมจับคู่คำศัพท์วิทยาศาสตร์เรื่องแรงเสียดทาน ทบทวนความรู้ผ่านการลากเส้นเชื่อมโยง",
            tags: ["มินิเกมการเรียนรู้", "science game", "วิทยาศาสตร์", "แรงเสียดทาน", "friction", "จับคู่", "ลากเส้น"],
            url: "./projects/friction matching/index.html",
            type: "Game",
            icon: "🛹"
        },
        {
            title: "Neon Path Puzzle",
            description: "เกมปริศนาลากเส้นสไตล์นีออนสุดท้าทาย ฝึกสมอง การวางแผน และการแก้ปัญหา เหมาะสำหรับทุกวัย",
            tags: ["มินิเกมฝึกสมอง", "puzzle", "neon", "เกม", "ลากเส้น", "เกมการศึกษา", "ปริศนา", "ฝึกสมอง", "แก้ปัญหา"],
            url: "./projects/line-tracing-puzzle/index.html",
            type: "Game",
            icon: "🧩"
        },
        {
            title: "ของใช้ไปบ้านไหน? (Home Sort Game)",
            description: "เกมจำแนกสิ่งของเครื่องใช้สำหรับเด็กปฐมวัย ดูภาพ ฟังเสียงคำศัพท์ภาษาไทย แล้วพาของใช้กลับไปอยู่ในห้องที่ถูกต้อง",
            tags: ["ของใช้ไปบ้านไหน", "home sort", "ของใช้", "บ้านไหน", "เด็กปฐมวัย", "ปฐมวัย", "เด็กเล็ก", "จัดหมวดหมู่", "จำแนกสิ่งของ", "คำศัพท์", "เกมการศึกษา", "ตรรกะ", "logic", "kids game", "อนุบาล"],
            url: "./projects/home-sort-game/index.html",
            type: "Game",
            icon: "🏠"
        },

        {
            title: "One Stroke Adventure",
            description: "เกมลากเส้นครั้งเดียวปริศนาสุดท้าทาย ลากเส้นผ่านทุกจุดโดยไม่ซ้ำเส้นเดิม",
            tags: ["ลากเส้น", "one stroke", "ครั้งเดียว", "เกม", "puzzle", "ผจญภัย", "เกมปริศนา", "ฝึกสมอง"],
            url: "./projects/one-stroke-adventure/index.html",
            type: "Game",
            icon: "✏️"
        },
        {
            title: "ปัญหาลับ 60 วินาที (Secret Problem Challenge)",
            description: "มินิเกมแข่งขันแก้ปัญหาภายใต้ความกดดันของเวลา 60 วินาที ฝึกไหวพริบและการตัดสินใจ",
            tags: ["เกม", "ปัญหาลับ", "60 วินาที", "ท้าทาย", "challenge", "problem", "แก้ปัญหา", "ความกดดัน", "เวลา"],
            url: "./projects/problem-alert/index.html",
            type: "Game",
            icon: "⏱️"
        },
        {
            title: "Kahoot Clone System",
            description: "ระบบควิซแบบ Kahoot สร้างเกมตอบคำถามของคุณเองได้ง่ายๆ และฟรี โดยใช้ Google Sheets เป็นฐานข้อมูลและระบบจับเวลาที่แม่นยำ",
            tags: ["เครื่องมือช่วยสอน", "classroom tool", "quiz", "เกม", "kahoot", "ตอบคำถาม", "ควิซ", "ห้องเรียน"],
            url: "./projects/kahoot-clone/index.html",
            type: "Tool",
            icon: "🏆"
        },
        {
            title: "Team Spotlight: สุ่มทีมนำเสนอ",
            description: "เครื่องมือสุ่มลำดับทีมนำเสนอแบบไม่ซ้ำ พร้อมแอนิเมชัน เสียงลุ้น และประวัติลำดับสำหรับใช้ในห้องเรียน",
            tags: ["สุ่มทีม", "นำเสนอ", "เครื่องมือช่วยสอน", "random team", "presentation", "classroom tool", "จับฉลาก", "ห้องเรียน"],
            url: "./projects/team-randomizer/index.html",
            type: "Tool",
            icon: "✨"
        },
        {
            title: "Classroom Activity Timer",
            description: "นาฬิกาจับเวลาและนับถอยหลังช่วยบริหารชั้นเรียน รองรับระบบตั้งการนับถอยหลังทั่วไป จับเวลาการทำกิจกรรมเดี่ยว หรือการทำงานกลุ่มแบบสลับรอบ (Interval)",
            tags: ["จับเวลา", "เครื่องมือช่วยสอน", "timer", "classroom tool", "นาฬิกา", "นับถอยหลัง", "บริหารชั้นเรียน"],
            url: "./projects/activity-timer/index.html",
            type: "Tool",
            icon: "⏱️"
        },
        {
            title: "Projectile Simulator",
            description: "แบบจำลองสถานการณ์การเคลื่อนที่แบบวิถีโค้ง ปรับค่าปัจจัยฟิสิกส์ได้สมจริง เช่น แรงต้านอากาศ แรงลม มุมยิง น้ำหนักวัตถุ และแรงโน้มถ่วงของดาวแต่ละดวง",
            tags: ["ฟิสิกส์ศึกษา", "simulation", "วิถีโค้ง", "projectile", "physics", "วิทยาศาสตร์", "ฟิสิกส์", "จำลอง"],
            url: "./projects/projectile-game/index.html",
            type: "Simulation",
            icon: "☄️"
        },
        {
            title: "Pendulum Simulator",
            description: "แบบจำลองลูกตุ้มนาฬิกา (Pendulum) เรียนรู้หลักการทางฟิสิกส์ พลังงานจลน์ พลังงานศักย์ และแรงตึงเชือก แบบอินเทอร์แอกทีฟ",
            tags: ["ฟิสิกส์ศึกษา", "simulation", "ลูกตุ้ม", "pendulum", "physics", "วิทยาศาสตร์", "ฟิสิกส์", "พลังงานจลน์", "พลังงานศักย์", "จำลอง"],
            url: "./projects/pendulum/pendulum.html",
            type: "Simulation",
            icon: "⏳"
        },
        {
            title: "Innovation Mixer",
            description: "มินิเกมนำเข้าสู่บทเรียนแบบสุ่มโจทย์ความท้าทาย เพื่อระดมไอเดียออกแบบนวัตกรรม โดยการผสานสิ่งของ ความสามารถพิเศษ และกลุ่มเป้าหมายผู้ใช้งาน",
            tags: ["มินิเกมการเรียนรู้", "creative thinking", "innovation", "เกม", "ออกแบบ", "นวัตกรรม", "ระดมสมอง", "ไอเดีย"],
            url: "./projects/index.html",
            type: "Game",
            icon: "🎲"
        },
        {
            title: "AI & Media Literacy Map",
            description: "แผนภาพแนวคิด กิจกรรมการเรียนรู้ และคำถามกระตุ้นความคิดเรื่องปัญญาประดิษฐ์เชิงโต้ตอบสำหรับครูผู้สอน อิงตามกรอบสากล OECD และ EC",
            tags: ["การรู้เท่าทัน ai", "interactive map", "ai literacy", "แผนภาพ", "แผนการสอน", "สื่อการสอน", "oecd", "mindmap"],
            url: "./projects/ai-literacy/index.html",
            type: "Interactive",
            icon: "🧠"
        },
        {
            title: "AI Literacy Game (นักสืบข้อมูล)",
            description: "เกมสวมบทบาทนักสืบข้อมูลเพื่อจับผิด AI ที่สร้างข้อมูลเท็จ อคติ และสื่อสังเคราะห์ เพื่อพัฒนาทักษะ AI Literacy และ Critical Thinking",
            tags: ["เกมการศึกษา", "ai literacy", "นักสืบ", "critical thinking", "ตรวจสอบข้อมูล", "อคติ ai", "เกม ai", "จับผิด"],
            url: "./projects/ai literacy game/index.html",
            type: "Game",
            icon: "🕵️‍♂️"
        },
        {
            title: "QR Code Generator",
            description: "เครื่องมือสร้างคิวอาร์โค้ดฟรี ทำงานบนเบราว์เซอร์ ไม่ต้องพึ่งพาเซิร์ฟเวอร์ ปลอดภัยและไม่มีวันหมดอายุ",
            tags: ["เครื่องมืออรรถประโยชน์", "utility", "qr code", "สร้าง", "generator", "เครื่องมือฟรี"],
            url: "./applications/qrcodegenerator/index.html",
            type: "Utility",
            icon: "📱"
        },
        {
            title: "เกี่ยวกับฉัน (About Me)",
            description: "ประวัติการทำงาน การศึกษา และความเชี่ยวชาญของ ดร.อภิสิทธิ์ ธงไชย",
            tags: ["ประวัติ", "about", "cv", "resume", "ติดต่อ", "อภิสิทธิ์ ธงไชย", "การศึกษา", "ผลงาน", "วิทยากร", "สสวท"],
            url: "about.html",
            type: "Page",
            icon: "👤"
        },
        {
            title: "บทความวิชาการระดับนานาชาติ (International Publications)",
            description: "รวบรวมบทความวิจัยระดับนานาชาติทางด้านสะเต็มศึกษา เทคโนโลยี และการเรียนรู้",
            tags: ["วิจัย", "บทความ", "publication", "research", "paper", "stem", "สะเต็ม", "วารสาร", "ตีพิมพ์"],
            url: "#publications",
            type: "Research",
            icon: "📚"
        },
        {
            title: 'ใช้ AI อย่างไร ให้เป็น "เพื่อนคู่คิด" ไม่ใช่ "ผู้คิดแทน"',
            description: "บทความแบ่งปันแนวคิดการประยุกต์ใช้ AI ในการเรียนการสอนอย่างเหมาะสม ตีพิมพ์ในนิตยสาร สสวท.",
            tags: ["ai", "เพื่อนคู่คิด", "บทความ", "นิตยสาร", "สสวท", "ai in education", "ประยุกต์ใช้", "ครู"],
            url: "https://emagazine.ipst.ac.th/258/4/",
            type: "Article",
            icon: "🤝"
        },
        {
            title: 'AI Literacy คืออะไร? ครูควรเข้าใจอย่างไร',
            description: "บทความเจาะลึกความหมายและขอบเขตของการรู้เท่าทันปัญญาประดิษฐ์ (AI Literacy) สำหรับครูและการส่งเสริมผู้เรียน",
            tags: ["ai literacy", "บทความ", "รู้เท่าทัน ai", "ครู", "ผู้เรียน", "การศึกษา", "บทความ ai", "สื่อสาร"],
            url: "./articles/ai-literacy.html",
            type: "Article",
            icon: "📰"
        },
        {
            title: 'เรื่องเล่าประสบการณ์ Dublin Ireland (Pocketbook)',
            description: "หนังสือบันทึกประสบการณ์และแรงบันดาลใจจากการเดินทางไปฝึกอบรมและใช้ชีวิต 1 เดือนเต็ม ณ เมืองดับลิน ประเทศไอร์แลนด์ สอดแทรกเกร็ดความรู้ วัฒนธรรม และมุมมองการศึกษา",
            tags: ["travel", "inspiration", "ireland", "dublin", "หนังสือ", "ประสบการณ์", "แรงบันดาลใจ", "ท่องเที่ยว", "ไอร์แลนด์", "ดับลิน"],
            url: "./assets/docs/Ireland_pocketbook_Apisit.pdf",
            type: "Article",
            icon: "🎒"
        },
        {
            title: "AI English Tutor",
            description: "ระบบฝึกสนทนาภาษาอังกฤษส่วนตัว ประเมินระดับ CEFR บันทึกสถิติความก้าวหน้า พร้อมควิซทบทวนคำศัพท์และไวยากรณ์",
            tags: ["ai english tutor", "english", "tutor", "ภาษาอังกฤษ", "ฝึกภาษา", "cefr", "สนทนา", "คำศัพท์", "ไวยากรณ์", "ai", "เครื่องมือช่วยสอน"],
            url: "./applications/english-tutor/index.html",
            type: "Tool",
            icon: "🗣️"
        },
        {
            title: "Concept Check & Student Review",
            description: "ระบบตรวจสอบความเข้าใจและแนวคิดคลาดเคลื่อนของผู้เรียน พร้อมเครื่องมือวิเคราะห์สรุปคำตอบสำหรับครูผู้สอน",
            tags: ["concept check", "ประเมินผล", "ตรวจสอบความเข้าใจ", "แนวคิดคลาดเคลื่อน", "misconceptions", "วัดผล", "เครื่องมือช่วยสอน", "ครู"],
            url: "./applications/concept-check/index.html",
            type: "Tool",
            icon: "📝"
        },
        {
            title: "Kids Circuit Game (เกมวงจรไฟฟ้าเด็ก)",
            description: "เกมจำลองการต่อวงจรไฟฟ้าพื้นฐานสำหรับเด็กปฐมวัยและประถม เรียนรู้ขั้วบวก ขั้วลบ สวิตช์ หลอดไฟ และมอเตอร์ผ่านการทดลองเสมือนจริง",
            tags: ["วงจรไฟฟ้า", "circuit", "kids game", "วิทยาศาสตร์เด็ก", "ไฟฟ้า", "ประถม", "สวิตช์", "หลอดไฟ", "เกมการศึกษา", "stem"],
            url: "./projects/kids-circuit-game/index.html",
            type: "Game",
            icon: "💡"
        },
        {
            title: "SpeakQuest: Pronunciation Quest",
            description: "เกมฝึกออกเสียงคำศัพท์ภาษาอังกฤษผ่านไมโครโฟน โดยใช้ AI วิเคราะห์ความถูกต้องของการออกเสียงแบบเรียลไทม์",
            tags: ["speakquest", "pronunciation", "ออกเสียง", "ฝึกพูด", "ภาษาอังกฤษ", "english speech", "ai วิเคราะห์เสียง", "เกมการศึกษา"],
            url: "./projects/pronunciation-quest/index.html",
            type: "Game",
            icon: "🎙️"
        },
        {
            title: "Rocket Quiz Game (เกมจรวดฟิสิกส์)",
            description: "เกมควิซตอบคำถามแข่งขันปล่อยจรวดลม ทบทวนความรู้ฟิสิกส์ แรงดัน และการเคลื่อนที่ เหมาะสำหรับกิจกรรมกลุ่มในห้องเรียน",
            tags: ["rocket quiz", "จรวด", "ฟิสิกส์", "ควิซ", "เกมตอบคำถาม", "แรงดัน", "การเคลื่อนที่", "เกมห้องเรียน", "quiz game"],
            url: "./projects/game_rocketquiz/index.html",
            type: "Game",
            icon: "🚀"
        },
        {
            title: "Friction Explorer (ห้องทดลองแรงเสียดทาน)",
            description: "แบบจำลองการทดลองวิทยาศาสตร์เรื่องแรงเสียดทาน ทดสอบแรงฉุด ค่าสัมประสิทธิ์แรงเสียดทานบนพื้นผิวและมวลรูปแบบต่างๆ",
            tags: ["friction explorer", "แรงเสียดทาน", "การทดลอง", "ฟิสิกส์", "วิทยาศาสตร์", "simulation", "แบบจำลอง", "แรงฉุด"],
            url: "./projects/friction-explorer/index.html",
            type: "Simulation",
            icon: "🔬"
        },
        {
            title: "Mission Control AI (ศูนย์ควบคุมอวกาศ)",
            description: "มินิเกมจำลองสถานการณ์ควบคุมภารกิจยานอวกาศ ผสานการตัดสินใจร่วมกับระบบ AI ในสถานการณ์ฉุกเฉิน",
            tags: ["mission control", "อวกาศ", "space", "เกม ai", "ศูนย์ควบคุม", "การตัดสินใจ", "เกมการศึกษา", "critical thinking"],
            url: "./projects/mission-control-ai/index.html",
            type: "Game",
            icon: "🛰️"
        },
        {
            title: "Physics Pilot (นักบินฟิสิกส์)",
            description: "เกมจำลองการบินประยุกต์หลักการฟิสิกส์ เรียนรู้เรื่องแรงยก แรงต้าน แรงขับ และแรงโน้มถ่วงในการควบคุมเครื่องบิน",
            tags: ["physics pilot", "เครื่องบิน", "การบิน", "ฟิสิกส์", "แรงยก", "aerodynamics", "เกมฟิสิกส์", "simulation"],
            url: "./projects/physics-pilot/index.html",
            type: "Game",
            icon: "✈️"
        },
        {
            title: "Science Sort Sprint (สปีดควิซวิทยาศาสตร์)",
            description: "เกมประลองความเร็วในการจำแนกหมวดหมู่วิทยาศาสตร์ ครอบคลุม ฟิสิกส์ เคมี ชีววิทยา และโลกและอวกาศ",
            tags: ["science sort", "sort sprint", "จำแนกหมวดหมู่", "วิทยาศาสตร์", "ฟิสิกส์", "เคมี", "ชีววิทยา", "ดาราศาสตร์", "สปีดควิซ", "เกม"],
            url: "./projects/science-sort-sprint/sort-sprint-hub.html",
            type: "Game",
            icon: "🧬"
        },
        {
            title: "Pixel Art Studio (ศิลปะพิกเซล)",
            description: "เครื่องมือและเกมวาดภาพพิกเซลอาร์ต ฝึกการคิดเชิงคำนวณ การเข้ารหัสภาพสี และตรรกะการจัดเก็บข้อมูล",
            tags: ["pixel art", "ศิลปะพิกเซล", "วาดภาพ", "พิกเซล", "ตรรกะ", "coding", "วิทยาการคำนวณ", "เกมฝึกสมอง"],
            url: "./projects/puzzle-collection/pixel-art/index.html",
            type: "Game",
            icon: "🎨"
        },
        {
            title: "บทความ: อัปเดตและแนวโน้ม AI ในการศึกษา",
            description: "บทความเจาะลึกความก้าวหน้า นโยบาย และแนวโน้มล่าสุดของการประยุกต์ใช้ AI ในแวดวงการศึกษาทั่วโลก",
            tags: ["ai updates", "แนวโน้ม ai", "ai education", "บทความ", "การศึกษา", "เทคโนโลยีการศึกษา", "นวัตกรรม"],
            url: "./articles/ai-education-updates.html",
            type: "Article",
            icon: "📊"
        },
        {
            title: "บทความ: กิจกรรม AI Literacy ในชั้นเรียน",
            description: "รวมแนวทางและตัวอย่างกิจกรรมการเรียนรู้เพื่อสร้างทักษะการรู้เท่าทัน AI สำหรับนักเรียนระดับต่างๆ",
            tags: ["ai literacy activities", "กิจกรรมในชั้นเรียน", "แผนการสอน", "รู้เท่าทัน ai", "บทความ", "ครู", "ใบกิจกรรม"],
            url: "./articles/ai-literacy-classroom-activities.html",
            type: "Article",
            icon: "💡"
        },
        {
            title: "บทความ: แนวทาง OECD เรื่อง AI Literacy",
            description: "สรุปสาระสำคัญของกรอบแนวคิดและแนวทางการพัฒนาสมรรถนะการรู้เท่าทัน AI ตามมาตรฐาน OECD",
            tags: ["oecd", "ai literacy guide", "มาตรฐานสากล", "สมรรถนะ ai", "บทความ", "การศึกษา", "นโยบาย"],
            url: "./articles/ai-literacy-oecd-guide.html",
            type: "Article",
            icon: "🌐"
        }
    ],
    en: [
        {
            title: "CodeQuest: Monkey Adventure",
            description: "CodeMonkey-inspired educational coding game for middle schoolers. Covers Sequences, Loops, Object methods, and Conditionals with a built-in Level Builder.",
            tags: ["codequest", "codemonkey", "coding game", "educational game", "computing science", "level builder", "algorithm", "loop", "javascript", "stem"],
            url: "./projects/code-monkey-prototype/index.html",
            type: "Game",
            icon: "🐒"
        },
        {
            title: "AI Prompt Builder",
            description: "An effective prompt writing assistant that helps organize your thoughts into clear instructions for AI.",
            tags: ["ai", "prompt", "builder", "tool", "assistant", "generator"],
            url: "./applications/prompt-builder/index.html",
            type: "Tool",
            icon: "🪄"
        },
        {
            title: "Cyber Logic Puzzle Collection",
            description: "A collection of brain-training games for computing science including Sudoku, Takuzu, Nonogram, Binary, and Logic Gates.",
            tags: ["brain training", "computing science", "sudoku", "nonogram", "logic", "binary", "educational game", "puzzle"],
            url: "./projects/puzzle-collection/index.html",
            type: "Game",
            icon: "🧠"
        },
        {
            title: "Cyber Rover",
            description: "A block-based coding game to program a rover using loops and conditions under limited memory.",
            tags: ["brain training", "computing science", "coding", "algorithm", "loop", "programming", "robot", "block coding"],
            url: "./projects/puzzle-collection/algorithmlogic.html",
            type: "Game",
            icon: "🤖"
        },
        {
            title: "Pixel Decoder",
            description: "A data compression game. Decode Run-Length Encoding (RLE) and paint the grid to reveal hidden pixel art.",
            tags: ["brain training", "computing science", "pixel", "rle", "decoding", "pixel art", "data compression", "puzzle"],
            url: "./projects/puzzle-collection/pixeldecoder.html",
            type: "Game",
            icon: "👾"
        },
        {
            title: "Friction Match",
            description: "A fun vocabulary matching mini-game on Friction. Review physics concepts by drawing connecting lines.",
            tags: ["science game", "learning game", "friction", "physics", "matching", "line drawing"],
            url: "./projects/friction matching/index.html",
            type: "Game",
            icon: "🛹"
        },
        {
            title: "Neon Path Puzzle",
            description: "A challenging neon-style line tracing puzzle game. Train your brain, planning, and problem-solving skills.",
            tags: ["puzzle game", "puzzle", "neon", "game", "line tracing", "educational game", "brain training", "problem solving"],
            url: "./projects/line-tracing-puzzle/index.html",
            type: "Game",
            icon: "🧩"
        },
        {
            title: "Home Sort Game",
            description: "A cute item sorting game for young children. Look at pictures, listen to words, and sort household items into the right rooms.",
            tags: ["home sort", "sorting game", "kids game", "early childhood", "kindergarten", "vocabulary", "educational game", "logic", "categories"],
            url: "./projects/home-sort-game/index.html",
            type: "Game",
            icon: "🏠"
        },

        {
            title: "One Stroke Adventure",
            description: "An adventurous one-stroke drawing puzzle. Trace all points without crossing the same path.",
            tags: ["line drawing", "one stroke", "single stroke", "game", "puzzle", "adventure", "brain training"],
            url: "./projects/one-stroke-adventure/index.html",
            type: "Game",
            icon: "✏️"
        },
        {
            title: "Secret Problem Challenge (60 Seconds)",
            description: "A mini-game challenging you to solve a problem under the pressure of a 60-second timer.",
            tags: ["game", "secret problem", "60 seconds", "challenge", "problem solving", "time pressure", "timer"],
            url: "./projects/problem-alert/index.html",
            type: "Game",
            icon: "⏱️"
        },
        {
            title: "Kahoot Clone System",
            description: "Create your own live quiz games easily and for free, using Google Sheets as a database with precise millisecond timing.",
            tags: ["teaching aid", "classroom tool", "quiz", "game", "kahoot", "questions", "answers", "live quiz"],
            url: "./projects/kahoot-clone/index.html",
            type: "Tool",
            icon: "🏆"
        },
        {
            title: "Team Spotlight: Presentation Randomizer",
            description: "A no-repeat presentation order randomizer with suspenseful animation, sound, and a complete classroom history.",
            tags: ["team randomizer", "presentation", "teaching aid", "classroom tool", "random order", "student teams"],
            url: "./projects/team-randomizer/index.html",
            type: "Tool",
            icon: "✨"
        },
        {
            title: "Classroom Activity Timer",
            description: "Stopwatch and countdown timer for classroom management. Supports standard countdowns, group activities, and interval training timers.",
            tags: ["timer", "teaching aid", "classroom tool", "stopwatch", "countdown", "interval", "management"],
            url: "./projects/activity-timer/index.html",
            type: "Tool",
            icon: "⏱️"
        },
        {
            title: "Projectile Simulator",
            description: "Interactive simulation for projectile motion. Adjust physical factors like air resistance, wind, launch angle, mass, and planetary gravity.",
            tags: ["physics education", "simulation", "projectile", "physics", "science", "gravity", "motion"],
            url: "./projects/projectile-game/index.html",
            type: "Simulation",
            icon: "☄️"
        },
        {
            title: "Pendulum Simulator",
            description: "Interactive pendulum simulation to learn physics principles like kinetic energy, potential energy, and tension.",
            tags: ["physics education", "simulation", "pendulum", "physics", "science", "kinetic energy", "potential energy", "tension"],
            url: "./projects/pendulum/pendulum.html",
            type: "Simulation",
            icon: "⏳"
        },
        {
            title: "Innovation Mixer",
            description: "A creative brainstorming mini-game that randomly pairs an object, a special ability, and a user group to challenge students to innovate.",
            tags: ["learning game", "creative thinking", "innovation", "brainstorming", "design", "mixer", "ideas"],
            url: "./projects/index.html",
            type: "Game",
            icon: "🎲"
        },
        {
            title: "AI & Media Literacy Map",
            description: "Interactive mindmap of concepts, classroom activities, and inquiry prompts about AI literacy for educators, aligned with OECD & EC frameworks.",
            tags: ["ai literacy", "interactive map", "mindmap", "oecd", "teaching plan", "educators", "media literacy"],
            url: "./projects/ai-literacy/index.html",
            type: "Interactive",
            icon: "🧠"
        },
        {
            title: "AI Literacy Game (Data Detective)",
            description: "A role-playing detective game to spot AI-generated hallucinations, bias, and deepfakes to develop AI Literacy and Critical Thinking.",
            tags: ["educational game", "ai literacy", "detective", "critical thinking", "bias", "fake news", "hallucinations"],
            url: "./projects/ai literacy game/index.html",
            type: "Game",
            icon: "🕵️‍♂️"
        },
        {
            title: "QR Code Generator",
            description: "Free browser-based QR code generator. Runs entirely on your device with no external API needed. Fast and secure.",
            tags: ["utility tool", "utility", "qr code", "generator", "free tool", "browser tool"],
            url: "./applications/qrcodegenerator/index.html",
            type: "Utility",
            icon: "📱"
        },
        {
            title: "About Me",
            description: "Career path, education, and expertise of Dr. Apisit Tongchai.",
            tags: ["about", "profile", "cv", "resume", "contact", "apisit tongchai", "education", "experience", "ipst"],
            url: "about.html",
            type: "Page",
            icon: "👤"
        },
        {
            title: "International Publications",
            description: "A collection of international research articles on STEM education, technology, and learning.",
            tags: ["research", "publication", "paper", "stem", "technology", "learning", "journal"],
            url: "#publications",
            type: "Research",
            icon: "📚"
        },
        {
            title: 'How to use AI as a "Partner" instead of a "Thinker"',
            description: "An article sharing ideas on appropriate AI application in education, published in IPST Magazine.",
            tags: ["ai", "partner", "article", "magazine", "ipst", "ai in education", "teaching"],
            url: "https://emagazine.ipst.ac.th/258/4/",
            type: "Article",
            icon: "🤝"
        },
        {
            title: "What is AI Literacy?",
            description: "An in-depth article exploring AI Literacy for educators and how to empower students in the AI era.",
            tags: ["ai literacy", "article", "educators", "students", "education", "ai generation", "guide"],
            url: "./articles/ai-literacy.html",
            type: "Article",
            icon: "📰"
        },
        {
            title: "AI English Tutor",
            description: "Personal AI English conversation tutor. Evaluates CEFR levels, tracks progress, and generates review quizzes.",
            tags: ["ai english tutor", "english", "tutor", "language learning", "cefr", "speaking", "vocabulary", "grammar", "ai tool"],
            url: "./applications/english-tutor/index.html",
            type: "Tool",
            icon: "🗣️"
        },
        {
            title: "Concept Check & Student Review",
            description: "Student conceptual understanding & misconception diagnostic system with teacher analytics dashboard.",
            tags: ["concept check", "assessment", "misconceptions", "evaluation", "student review", "analytics", "teaching tool", "educators"],
            url: "./applications/concept-check/index.html",
            type: "Tool",
            icon: "📝"
        },
        {
            title: "Kids Circuit Game",
            description: "Interactive virtual electric circuit simulator for early learners. Explore polarity, switches, lights, and motors.",
            tags: ["electric circuit", "circuit", "kids game", "stem", "elementary science", "switches", "lights", "educational game"],
            url: "./projects/kids-circuit-game/index.html",
            type: "Game",
            icon: "💡"
        },
        {
            title: "SpeakQuest: Pronunciation Quest",
            description: "AI-powered English pronunciation practice game. Analyzes microphone speech accuracy in real time.",
            tags: ["speakquest", "pronunciation", "speech practice", "english learning", "speech recognition", "ai audio", "educational game"],
            url: "./projects/pronunciation-quest/index.html",
            type: "Game",
            icon: "🎙️"
        },
        {
            title: "Rocket Quiz Game",
            description: "A fun competitive air-compressed rocket quiz game to review physics principles of pressure and motion in the classroom.",
            tags: ["rocket quiz", "rocket", "physics game", "quiz", "pressure", "motion", "classroom game", "group quiz"],
            url: "./projects/game_rocketquiz/index.html",
            type: "Game",
            icon: "🚀"
        },
        {
            title: "Friction Explorer",
            description: "Interactive friction laboratory simulation. Test traction, normal force, and friction coefficients across multiple surfaces.",
            tags: ["friction explorer", "friction", "physics simulation", "science lab", "normal force", "traction", "simulation"],
            url: "./projects/friction-explorer/index.html",
            type: "Simulation",
            icon: "🔬"
        },
        {
            title: "Mission Control AI",
            description: "Spacecraft mission control simulation game. Practice human-AI collaborative decision making under emergency scenarios.",
            tags: ["mission control", "space", "ai simulation", "decision making", "spacecraft", "critical thinking", "educational game"],
            url: "./projects/mission-control-ai/index.html",
            type: "Game",
            icon: "🛰️"
        },
        {
            title: "Physics Pilot",
            description: "Flight simulator game teaching principles of aerodynamics, lift, drag, thrust, and gravity.",
            tags: ["physics pilot", "flight simulator", "aerodynamics", "physics", "lift", "drag", "thrust", "airplane game"],
            url: "./projects/physics-pilot/index.html",
            type: "Game",
            icon: "✈️"
        },
        {
            title: "Science Sort Sprint",
            description: "Fast-paced science categorization quiz challenge covering Physics, Chemistry, Biology, and Earth & Space.",
            tags: ["science sort", "sort sprint", "categorization", "science quiz", "physics", "chemistry", "biology", "astronomy", "speed quiz"],
            url: "./projects/science-sort-sprint/sort-sprint-hub.html",
            type: "Game",
            icon: "🧬"
        },
        {
            title: "Pixel Art Studio",
            description: "Pixel art creation and puzzle game teaching computational thinking, color encoding, and data representation.",
            tags: ["pixel art", "pixel", "drawing", "coding", "computational thinking", "color encoding", "brain training"],
            url: "./projects/puzzle-collection/pixel-art/index.html",
            type: "Game",
            icon: "🎨"
        },
        {
            title: "AI in Education: Updates & Trends",
            description: "In-depth insights into recent advancements, policies, and trends in AI application across global education.",
            tags: ["ai updates", "ai trends", "ai in education", "article", "educational technology", "innovation", "research"],
            url: "./articles/ai-education-updates.html",
            type: "Article",
            icon: "📊"
        },
        {
            title: "AI Literacy Classroom Activities",
            description: "Practical guides and classroom learning activities to build AI literacy competencies for students.",
            tags: ["ai literacy activities", "classroom activities", "lesson plans", "ai education", "teachers", "worksheets"],
            url: "./articles/ai-literacy-classroom-activities.html",
            type: "Article",
            icon: "💡"
        },
        {
            title: "OECD Guidelines on AI Literacy",
            description: "Key takeaways and framework analysis of international OECD standards for AI literacy competencies.",
            tags: ["oecd", "ai literacy guide", "international standards", "competencies", "policy", "article", "education framework"],
            url: "./articles/ai-literacy-oecd-guide.html",
            type: "Article",
            icon: "🌐"
        }
    ]
};
