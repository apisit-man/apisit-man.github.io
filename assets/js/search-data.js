const searchData = {
    th: [
        {
            title: "แผนผังเว็บไซต์ (Sitemap)",
            description: "สารบัญและแผนผังเว็บไซต์รวบรวมทุกลิงก์ของ อภิสิทธิ์ ธงไชย: แอปพลิเคชัน 3 มิติ, แบบจำลองฟิสิกส์, สื่อการสอนสะเต็ม และคลังบทความวิชาการทั้งหมด",
            tags: ["แผนผังเว็บไซต์", "sitemap", "สารบัญ", "รวมลิงก์", "โครงสร้างเว็บ", "เว็บทั้งหมด", "nav"],
            url: "./sitemap.html",
            type: "Page",
            icon: "🗺️"
        },
        {
            title: "หมวดหมู่: ภูมิสารสนเทศและสิ่งแวดล้อม (GIS & Earth Data)",
            description: "คลังผลงานระบบภูมิสารสนเทศและสิ่งแวดล้อม: แผนที่เฝ้าระวังน้ำท่วม 31 จุด กทม. (Road Watch) และระบบตรวจวัดเรดาร์น้ำฝนสด Time-Series (Rain Watch)",
            tags: ["หมวดหมู่", "ภูมิสารสนเทศ", "gis", "สิ่งแวดล้อม", "น้ำท่วม", "เรดาร์น้ำฝน", "สภาพอากาศ", "แผนที่", "earth data", "bkk flood", "category"],
            url: "./category-gis.html",
            type: "หมวดหมู่",
            icon: "🌍"
        },
        {
            title: "หมวดหมู่: เกม 3D & สันทนาการ (3D Games & Arcade Simulators)",
            description: "คลัง 3 มินิเกม 3 มิติและซิมูเลเตอร์ยานยนต์สมจริง: Circuit Racing 3D, Ferrari Race 3D Mobile Touch Edition และ Ferrari SF90 Stradale 3D",
            tags: ["หมวดหมู่", "เกม", "เกม 3d", "แข่งรถ", "ferrari", "circuit racing", "arcade", "simulator", "three.js", "webgl", "สันทนาการ", "category"],
            url: "./category-games.html",
            type: "หมวดหมู่",
            icon: "🎮"
        },
        {
            title: "หมวดหมู่: แบบจำลองวิทยาศาสตร์และการแพทย์ (Science & Medical 3D)",
            description: "คลัง 12 แบบจำลองเสมือนจริง: Brain Atlas 3D, Human Gross Anatomy 3D, Mars Hexapod 3D, ห้องทดลองโฟโตอิเล็กทริก, การเคลื่อนที่วิถีโค้ง, การแกว่งลูกตุ้ม และการทดลองแรงเสียดทาน",
            tags: ["หมวดหมู่", "วิทยาศาสตร์", "ฟิสิกส์", "การแพทย์", "กายวิภาค", "3d", "แบบจำลอง", "three.js", "science", "medical", "physics", "simulation", "category"],
            url: "./category-science.html",
            type: "หมวดหมู่",
            icon: "⚛️"
        },
        {
            title: "หมวดหมู่: ตรรกะ วิทยาการคำนวณ และโค้ดดิ้ง (Logic & Coding)",
            description: "คลัง 17 เกมปริศนาและแบบจำลองอัลกอริทึม: Arrow Escape, CodeQuest, Smart Maze Suite, PhotoSlide Quest, Cyber Logic, Nonogram และ Sudoku",
            tags: ["หมวดหมู่", "ตรรกะ", "วิทยาการคำนวณ", "โค้ดดิ้ง", "coding", "algorithm", "computational thinking", "เกมฝึกสมอง", "puzzle", "logic", "เกมการศึกษา", "category"],
            url: "./category-logic.html",
            type: "หมวดหมู่",
            icon: "🧩"
        },
        {
            title: "หมวดหมู่: AI เพื่อการศึกษา (Educational AI)",
            description: "คลัง 4 โครงการปัญญาประดิษฐ์เพื่อการเรียนรู้: AI Prompt Builder สำหรับครู, แผนที่ AI Literacy, เกม Data Detective และ Concept Check AI",
            tags: ["หมวดหมู่", "ai", "ปัญญาประดิษฐ์", "ai literacy", "prompt builder", "การศึกษา", "ครู", "concept check", "genai", "category"],
            url: "./category-ai.html",
            type: "หมวดหมู่",
            icon: "🤖"
        },
        {
            title: "หมวดหมู่: เครื่องมือช่วยสอน (Classroom Teaching Tools)",
            description: "คลัง 6 เครื่องมือสำหรับครูและห้องเรียน: นาฬิกาจับเวลากิจกรรมกลุ่ม (Activity Timer), สุ่มทีมนำเสนอ (Team Spotlight), คลังแบบทดสอบ Kahoot Clone, เกมฝึกออกเสียง SpeakQuest และสร้าง QR Code",
            tags: ["หมวดหมู่", "เครื่องมือช่วยสอน", "ครู", "ห้องเรียน", "จับเวลา", "สุ่มทีม", "kahoot", "teaching tools", "classroom", "qr code", "category"],
            url: "./category-tools.html",
            type: "หมวดหมู่",
            icon: "🛠️"
        },
        {
            title: "ทางไหนดี (Road Watch - แผนที่เฝ้าระวังน้ำท่วม 31 จุด กทม.)",
            description: "ระบบแผนที่อินเทอร์แอ็กทีฟสำรวจจุดเฝ้าระวังน้ำท่วมและสภาพจราจร 31 เส้นทางหลักทั่วกรุงเทพฯ พร้อมภาพถ่ายดาวเทียม ลำดับจุดวิกฤต และเครื่องมือจัดการข้อมูลเส้นทาง",
            tags: ["ทางไหนดี", "road watch", "น้ำท่วม", "กทม", "bangkok flood", "แผนที่", "map", "gis", "leaflet", "สภาพจราจร", "ดาวเทียม", "31 จุด", "ภูมิสารสนเทศ"],
            url: "./projects/bangkokflood/index.html",
            type: "Application",
            icon: "🗺️"
        },
        {
            title: "ระบบติดตามน้ำฝน (Rain Watch - เรดาร์ตรวจวัดน้ำฝนสดและข้อมูล Time-Series)",
            description: "ระบบติดตามปริมาณน้ำฝนเชิงพื้นที่และวิเคราะห์ข้อมูลสภาพอากาศ Time-Series ทุก 15 นาทีทั่วกรุงเทพฯ และปริมณฑล พร้อมแผนที่เรดาร์ Pulse Animation และกราฟแนวโน้มรายสถานี",
            tags: ["ระบบติดตามน้ำฝน", "rain watch", "เรดาร์น้ำฝน", "เรดาร์ตรวจอากาศ", "ฝนตก", "สภาพอากาศ", "time-series", "ปริมาณน้ำฝน", "อุตุนิยมวิทยา", "gis", "สิ่งแวดล้อม"],
            url: "./projects/rainthailand/index.html",
            type: "Application",
            icon: "🌧️"
        },
        {
            title: "PhotoSlide Quest (เกมตัวต่อเลื่อนภาพปริศนา 15-Puzzle)",
            description: "เกมตัวต่อเลื่อนภาพปริศนาฝึกตรรกะและการวางแผนเชิงขั้นตอน เรียนรู้ทฤษฎีการันตีแก้ได้ 100% (Inversion Parity) และขั้นตอนวิธีค้นหา A* Search (Manhattan Distance) พร้อมระบบอัปโหลดรูปภาพ",
            tags: ["photoslide quest", "sliding puzzle", "15 puzzle", "ตัวต่อเลื่อนภาพ", "เกมเลื่อนตัวเลข", "a* search", "manhattan distance", "inversion parity", "วิทยาการคำนวณ", "ตรรกะ", "logic"],
            url: "./projects/sliding-puzzle/index.html",
            type: "Game",
            icon: "🧩"
        },
        {
            title: "Smart Maze Suite (เขาวงกตอัจฉริยะ - เกมและเครื่องมือสร้างใบงาน)",
            description: "เครื่องมือสร้างเขาวงกตอัจฉริยะและเกมฝึกกระบวนการคิดเชิงคำนวณ (Computational Thinking) รองรับทั้งการเล่นแบบโต้ตอบบนเว็บ (Touch, D-Pad, Keyboard) และการพิมพ์ใบงานสำหรับห้องเรียนพร้อมเฉลยเส้นทาง สลับรูปทรงเรขาคณิต วงกลม และข้าวหลามตัดได้ตามต้องการ",
            tags: ["maze", "เขาวงกต", "smart maze", "maze generator", "สร้างเขาวงกต", "ใบงาน", "worksheet", "วิทยาการคำนวณ", "computational thinking", "เกมตรรกะ", "logic", "puzzle", "พิมพ์ใบงาน", "ปริศนา", "อัลกอริทึม", "stem", "เกมการศึกษา"],
            url: "./projects/maze-generator/index.html",
            type: "Game",
            icon: "🌀"
        },
        {
            title: "Arrow Escape (Pro Puzzle & Topological Sorting)",
            description: "เกมปริศนาตรรกะและการวางแผนเส้นทาง เรียนรู้แนวคิดวิทยาการคำนวณ (Topological Sorting & Deadlock Avoidance) เคลียร์ลูกศรตามลำดับความขึ้นต่อกัน พร้อมระบบสังเคราะห์เสียง Web Audio",
            tags: ["arrow escape", "arrow puzzle", "ปริศนาลูกศร", "เกมลูกศร", "topological sorting", "deadlock", "วิทยาการคำนวณ", "ตรรกะ", "logic", "puzzle", "เกม", "เกมการศึกษา"],
            url: "./projects/arrow-puzzle/index.html",
            type: "Game",
            icon: "🏹"
        },
        {
            title: "Brain Atlas 3D (แบบจำลองกายวิภาคสมองและระบบประสาท 3 มิติ)",
            description: "แบบจำลองสมองมนุษย์ 3 มิติเชิงลึก FreeSurfer 7T Pial Surface ระบบลอกผิวสมอง (Cortex Peeling) วงแหวนหลอดเลือด Circle of Willis และระนาบตัดขวาง MRI 3 ทิศทาง (Axial, Coronal, Sagittal)",
            tags: ["brain atlas", "สมอง", "ระบบประสาท", "กายวิภาค", "neuroanatomy", "ชีววิทยา", "mri", "circle of willis", "หลอดเลือดสมอง", "แพทย์", "เตรียมแพทย์", "นักศึกษาแพทย์", "ม.6", "three.js", "3d", "แบบจำลอง 3d", "freesurfer", "mpr", "วิทยาศาสตร์"],
            url: "./applications/brain-atlas/index.html",
            type: "Application",
            icon: "🧠"
        },
        {
            title: "Human Atlas 3D (Gross Anatomy)",
            description: "แบบจำลองโครงกระดูกมนุษย์ 3 มิติ 206 ชิ้นตามมาตรฐานสากล (Britannica: แกนกลาง 80 ชิ้น + รยางค์ 126 ชิ้น) ระบบแยกชิ้นส่วนแนวตั้ง (Explode View) ป้ายกำกับ 3D และเกร็ดความรู้ทางคลินิก",
            tags: ["human atlas", "atlas", "กายวิภาค", "กระดูก", "โครงกระดูก", "นักศึกษาแพทย์", "แพทย์", "หมอ", "anatomy", "skeleton", "gross anatomy", "206 bones", "britannica", "explode view", "แบบจำลอง 3d", "three.js", "webgl", "medical", "วิทยาศาสตร์"],
            url: "./applications/human-atlas/index.html",
            type: "Application",
            icon: "💀"
        },
        {
            title: "Photoelectric Effect Interactive Lab (ห้องทดลองปรากฏการณ์โฟโตอิเล็กทริก)",
            description: "ห้องปฏิบัติการฟิสิกส์เสมือนจริงเรื่องปรากฏการณ์โฟโตอิเล็กทริก จำลองทวิภาวะคลื่น-อนุภาค วัดศักย์หยุดยั้ง ฟังก์ชันงาน หาค่าคงตัวของพลังค์ และท้าทายกับภารกิจวิเคราะห์โลหะปริศนา",
            tags: ["photoelectric effect", "ปรากฏการณ์โฟโตอิเล็กทริก", "โฟโตอิเล็กตรอน", "ฟิสิกส์", "ฟิสิกส์ควอนตัม", "quantum", "planck", "ค่าคงตัวของพลังค์", "ศักย์หยุดยั้ง", "stopping potential", "ฟังก์ชันงาน", "work function", "ไอน์สไตน์", "einstein", "ห้องทดลองเสมือน", "simulation", "ฟิสิกส์ ม.ปลาย", "วิทยาศาสตร์"],
            url: "./projects/photoelectriceffect/index.html",
            type: "Application",
            icon: "⚡"
        },
        {
            title: "Mars Hexapod 3D: Chryse Planitia (หุ่นยนต์ 6 ขา & วิทยาศาสตร์ดาวเคราะห์)",
            description: "เกมจำลองภารกิจขับหุ่นยนต์ 6 ขา ARES-6 สำรวจที่ราบลุ่มโบราณ Chryse Planitia บนดาวอังคาร ระบบ Active Chassis Leveling ปรับสมดุลอัตโนมัติบนทางลาด สลับท่าเดิน Tripod/Wave Gait สเปกโตรมิเตอร์สะท้อนแสง VNIR รวบรวมหลักฐานน้ำโบราณสังเคราะห์ข้อสรุป CER รองรับโหมดมือถือและเต็มจอ",
            tags: ["mars hexapod", "hexapod", "หุ่นยนต์", "robotics", "inverse kinematics", "ik", "tripod gait", "wave gait", "chassis leveler", "active leveler", "ดาวอังคาร", "mars", "chryse planitia", "vnir", "spectroscopy", "สเปกโตรมิเตอร์", "cer", "วิทยาศาสตร์", "ฟิสิกส์", "planetary science", "simulation", "three.js", "3d", "webgl", "เกม", "game", "mobile mode", "โหมดมือถือ", "fullscreen", "เต็มจอ"],
            url: "./applications/mars-hexapod/index.html",
            type: "Game",
            icon: "🪐"
        },
        {
            title: "คู่มือภารกิจ Mars Hexapod 3D (Mission Guide & Science Pedagogy)",
            description: "คู่มือการเล่น แผนผังภารกิจ การควบคุมหุ่นยนต์ ARES-6 ระบบสเปกโตรมิเตอร์ VNIR แหล่งแร่ 4 ยุคทางธรณีวิทยา กรอบข้อสรุป CER และวิธีใช้งานศูนย์ควบคุมโหมดมือถือ (Mobile Mode Center)",
            tags: ["mars hexapod", "mars", "ดาวอังคาร", "คู่มือ", "guide", "how to play", "วิธีเล่น", "chryse planitia", "ares-6", "หุ่นยนต์", "robotics", "vnir", "cer", "tripod gait", "wave gait", "mobile mode", "โหมดมือถือ", "fullscreen", "เต็มจอ"],
            url: "./applications/mars-hexapod/guide.html",
            type: "Document",
            icon: "📖"
        },
        {
            title: "Circuit Racing Grand Prix 3D (PC)",
            description: "เกมแข่งรถเซอร์กิต 3 มิติระดับโปรบนเว็บเบราว์เซอร์ ปรับแต่งรุ่นรถ Ferrari, สีตัวถัง, ชื่อนักแข่ง ประลองความเร็วกับบอท AI 5 คัน ฟิสิกส์สมจริง",
            tags: ["circuit racing", "racing", "เกมแข่งรถ", "ferrari", "f1", "แข่งรถ", "three.js", "webgl", "grand prix", "ai", "physics", "logic", "ตรรกะ", "coding"],
            url: "./applications/circuit-racing/index.html",
            type: "Game",
            icon: "🏁"
        },
        {
            title: "Ferrari Circuit Racing 3D (Mobile Touch Edition)",
            description: "เกมแข่งรถ Ferrari 3 มิติเวอร์ชันพิเศษสำหรับจอมือถือและแท็บเล็ต ปุ่มสัมผัสสองมือ Dual-Thumb ซูเปอร์คาร์ SF90, F40, LaFerrari, 458 GT3 เสียงเครื่องยนต์ V8/V12 สมจริง",
            tags: ["ferrari", "circuit racing", "mobile", "เกมแข่งรถมือถือ", "touch racing", "ซูเปอร์คาร์", "มือถือ", "three.js", "3d", "webgl", "logic", "ตรรกะ"],
            url: "./applications/circuit-racing-mobile/index.html",
            type: "Game",
            icon: "📱"
        },
        {
            title: "2021 Ferrari SF90 Stradale 3D (PHEV Supercar)",
            description: "แบบจำลอง 3 มิติเชิงลึก Ferrari SF90 Stradale รถไฮบริด PHEV 986 แรงม้า โหมด X-Ray ขุมพลัง V8 และมอเตอร์ไฟฟ้า 3 ตัว แอโรไดนามิกส์ และซิมูเลเตอร์ 0-60 ไมล์/ชม. ใน 2.5 วินาที",
            tags: ["ferrari", "sf90", "stradale", "phev", "hybrid", "supercar", "ซูเปอร์คาร์", "รถยนต์", "วิศวกรรม", "ฟิสิกส์", "stem", "แอโรไดนามิก", "three.js", "3d", "webgl", "launch control", "logic", "ตรรกะ"],
            url: "./applications/ferrari-sf90/index.html",
            type: "Application",
            icon: "🏎️"
        },
        {
            title: "CodeQuest: Monkey Adventure",
            description: "เกมสอนเขียนโค้ดสไตล์ CodeMonkey ระดับ ม.ต้น (ว4.2 วิทยาการคำนวณ) ครอบคลุม Sequence, Loop, ออบเจกต์เต่า และ if-else พร้อมระบบ Level Builder สร้างด่านเองได้",
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
            title: "Human Atlas 3D (แบบจำลองกายวิภาคศาสตร์ 3 มิติ)",
            description: "แบบจำลองกายวิภาคศาสตร์มนุษย์ 3 มิติเชิงโต้ตอบ แยกโครงสร้างตามระบบอวัยวะ ฟีเจอร์ Explode View ขยายชิ้นส่วน และระบุข้อมูลเชิงลึก",
            tags: ["3D", "anatomy", "กายวิภาค", "ร่างกาย", "แพทย์", "อวัยวะ", "threejs", "webgl", "human atlas"],
            url: "./applications/human-atlas/index.html",
            type: "Application",
            icon: "🫀"
        },
        {
            title: "เกี่ยวกับฉัน (About Me)",
            description: "ประวัติการทำงาน การศึกษา และความเชี่ยวชาญของ อภิสิทธิ์ ธงไชย",
            tags: ["ประวัติ", "about", "cv", "resume", "ติดต่อ", "อภิสิทธิ์ ธงไชย", "การศึกษา", "ผลงาน", "วิทยากร"],
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
            tags: ["ai", "เพื่อนคู่คิด", "บทความ", "นิตยสาร", "ai in education", "ประยุกต์ใช้", "ครู"],
            url: "https://emagazine.ipst.ac.th/258/4/",
            type: "Article",
            icon: "🤝"
        },
        {
            title: "เปลี่ยนคลิปวิดีโอเป็นแล็บฟิสิกส์: วิเคราะห์การแผ่และคาบของคลื่นน้ำด้วย Python บน Google Colab",
            description: "แนวทางการนำ Computer Vision และ Python มาเปลี่ยนคลิปวิดีโอคลื่นน้ำธรรมดาให้เป็นการทดลองฟิสิกส์เชิงปริมาณ พร้อมแนวทางการจัดกิจกรรมในชั้นเรียนและการเชื่อมโยงสูตรฟิสิกส์",
            tags: ["ฟิสิกส์", "คลื่นน้ำ", "computer vision", "opencv", "python", "google colab", "fft", "fast fourier transform", "การทดลองในชั้นเรียน", "สะเต็มศึกษา", "วิทยาการคำนวณ", "บทความ"],
            url: "./articles/physics-water-wave-python.html",
            type: "Article",
            icon: "🌊"
        },
        {
            title: "สมองนำทาง AI ตามหลัง (Brain First, AI Second): เราควรใช้ AI อย่างไร เพื่อให้เรายังได้คิดและเรียนรู้",
            description: "ถอดรหัสงานวิจัย MIT Media Lab เรื่องหนี้ทางปัญญา (Cognitive Debt) เมื่อใช้ AI ช่วยเขียน สู่แนวคิด Brain First, AI Second ให้เราเป็นผู้คิด และ AI เป็นคู่คิดเคียงข้าง",
            tags: ["สมองนำทาง ai ตามหลัง", "brain first ai second", "cognitive debt", "หนี้ทางปัญญา", "mit media lab", "eeg", "chatgpt", "gemini", "ai in education", "การศึกษา", "ครู", "การเรียนรู้", "บทความ"],
            url: "./articles/brain-first-ai-second.html",
            type: "Article",
            icon: "🧠"
        },
        {
            title: "ก้าวข้ามแค่ 'ใช้เป็น' สู่ 'รู้เท่าทันเชิงวิพากษ์' (AI Critical Literacy): ทักษะจำเป็นที่สุดของมนุษย์ในวันที่ AI เก่งขึ้นทุกวินาที",
            description: "ทำไมแค่สอนเขียน Prompt หรือใช้ GenAI ให้เป็นจึงไม่เพียงพออีกต่อไป ถอดรหัส 4 เสาหลักของ AI Critical Literacy สู่ห้องเรียนจริง พร้อม Interactive Socratic Challenge ในบทความ",
            tags: ["ai critical literacy", "critical thinking", "รู้เท่าทัน ai", "socratic ai", "จริยธรรม ai", "hallucination", "algorithmic bias", "ai in education", "ครู", "การศึกษา", "บทความ"],
            url: "./articles/ai-critical-literacy.html",
            type: "Article",
            icon: "🧭"
        },
        {
            title: 'เมื่อผู้สร้าง AI ทิ้งเงินล้านเพื่อเตือนภัยมนุษยชาติ: บทเรียนจาก Jacob Coxon ที่ครูต้องฉุกคิดใหม่',
            description: "ถอดรหัสข่าวสะเทือนวงการเมื่อนักวิจัย Anthropic ลาออกเพื่อเตือนภัย Superintelligence สู่บทเรียนสำคัญสำหรับครู: ทำไมการสอน AI ต้องก้าวข้ามวิธีใช้เครื่องมือ สู่การสร้างมนุษย์ผู้รู้เท่าทันและมีเจตจำนงทางจริยธรรม",
            tags: ["ai safety", "anthropic", "jacob coxon", "superintelligence", "จริยธรรม ai", "ai in education", "ครู", "การศึกษา", "alignment", "ความปลอดภัย", "บทความ"],
            url: "./articles/ai-safety-educators-reflection.html",
            type: "Article",
            icon: "🚨"
        },
        {
            title: "เมื่อ AI ทำการบ้านแทนได้: ปรับการประเมินผลจากการ “จับผิด” สู่การวัด “สมรรถนะจริง”",
            description: "ก้าวข้ามกับดักของ AI Detector สู่วิธีการประเมินตามสภาพจริง (Authentic Assessment) ที่วัดกระบวนการคิด ร่องรอยการเรียนรู้ และสมรรถนะที่แท้จริงของผู้เรียนในยุค GenAI",
            tags: ["authentic assessment", "การประเมินตามสภาพจริง", "ai detector", "การประเมินผล", "ai in education", "บทความ", "การศึกษา", "ครู"],
            url: "./articles/ai-authentic-assessment.html",
            type: "Article",
            icon: "🎯"
        },
        {
            title: "AI Literacy ในห้องเรียนจริง: 10 กิจกรรมที่ครูทำได้ทันที",
            description: "รวม 10 กิจกรรม AI Literacy ที่ครูนำไปใช้ในห้องเรียนได้ทันที จัดตาม 4 มิติของ AILit Framework: Engage, Create, Manage, Shape พร้อมตารางสรุประดับชั้น เวลา และทักษะ",
            tags: ["ai literacy", "กิจกรรมห้องเรียน", "classroom activities", "การสอน", "แผนการสอน", "ai in education", "ครู", "บทความ"],
            url: "./articles/ai-literacy-classroom-activities.html",
            type: "Article",
            icon: "🎯"
        },
        {
            title: "เมื่อ AI ไม่ใช่แค่วิชาคอมพิวเตอร์: ถอดรหัสคู่มือ OECD กับการบูรณาการ ‘AI Literacy’",
            description: "AI Literacy ไม่ใช่เรื่องของการยัดเยียดเนื้อหาใหม่ แต่คือการใช้เลนส์เฉพาะตัวของแต่ละวิชา ช่วยให้ผู้เรียนเข้าใจ ประเมิน และรู้เท่าทัน AI ได้อย่างลึกซึ้ง",
            tags: ["oecd", "ai literacy", "กรอบสมรรถนะ", "oecd framework", "บูรณาการ", "ai in education", "บทความ", "การศึกษา"],
            url: "./articles/ai-literacy-oecd-guide.html",
            type: "Article",
            icon: "💡"
        },
        {
            title: "อัปเดตงานวิจัยและเทรนด์ใหม่ล่าสุดเกี่ยวกับ AI in Education",
            description: "สรุปสาระสำคัญจากงานวิจัยล่าสุด: ระบบ AI เตือนภัยล่วงหน้าเพื่อดูแลนักเรียน, AI กับการลดภาวะหมดไฟของครู และการฝึกทักษะจับผิด AI Hallucination",
            tags: ["ai in education", "งานวิจัย", "เทรนด์ ai", "early warning", "teacher burnout", "hallucination", "บทความ"],
            url: "./articles/ai-education-updates.html",
            type: "Article",
            icon: "🛡️"
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
        },
        {
            title: "บทความ: เมื่อ AI ทำการบ้านแทนได้ - การประเมินตามสภาพจริง (Authentic Assessment)",
            description: "ปรับกระบวนทัศน์การประเมินผลจากการจับผิด AI สู่การวัดสมรรถนะจริง กระบวนการคิด ร่องรอยการเรียนรู้ และรูบริกยุค AI",
            tags: ["authentic assessment", "การประเมินตามสภาพจริง", "ai detector", "รูบริก", "การประเมินผล", "genai", "บทความ", "การศึกษา", "ครู"],
            url: "./articles/ai-authentic-assessment.html",
            type: "Article",
            icon: "🎯"
        }
    ],
    en: [
        {
            title: "Site Map (Sitemap & Directory)",
            description: "Comprehensive site index and link directory for Dr. Apisit Thongchai: 3D interactive applications, physics simulations, STEM classroom tools, and full publication archives.",
            tags: ["sitemap", "site map", "index", "all links", "directory", "navigation", "nav"],
            url: "./sitemap.html",
            type: "Page",
            icon: "🗺️"
        },
        {
            title: "Category: Geo-Informatics & Earth Data",
            description: "Collection of interactive spatial data systems: Bangkok 31 Flood Watch Map (Road Watch) and Thailand Real-Time Rainfall Radar & Time-Series (Rain Watch).",
            tags: ["category", "gis", "geo-informatics", "earth data", "flood map", "rainfall radar", "weather", "bangkok", "hub"],
            url: "./category-gis.html",
            type: "Category",
            icon: "🌍"
        },
        {
            title: "Category: 3D Games & Arcade Simulators",
            description: "Collection of 3 real-time 3D games and vehicle simulators: Circuit Racing 3D Grand Prix, Ferrari Race 3D Mobile Edition, and Ferrari SF90 Stradale 3D.",
            tags: ["category", "games", "3d", "racing", "ferrari", "arcade", "simulator", "three.js", "webgl", "entertainment", "hub"],
            url: "./category-games.html",
            type: "Category",
            icon: "🎮"
        },
        {
            title: "Category: Science & Medical 3D Simulations",
            description: "Explore 12 interactive virtual simulations: 3D Brain Atlas, Human Skeleton Anatomy, Mars Hexapod 3D, Photoelectric Effect Lab, Projectile Physics, and Pendulum Simulator.",
            tags: ["category", "science", "medical", "physics", "simulation", "3d", "anatomy", "brain", "three.js", "hub"],
            url: "./category-science.html",
            type: "Category",
            icon: "⚛️"
        },
        {
            title: "Category: Logic, Algorithms & Coding Games",
            description: "Explore 17 computational puzzles and simulations: Arrow Escape, CodeQuest, Smart Maze Suite, PhotoSlide Quest, and Cyber Logic.",
            tags: ["category", "logic", "algorithms", "coding", "computational thinking", "puzzle", "game", "robotics", "hub"],
            url: "./category-logic.html",
            type: "Category",
            icon: "🧩"
        },
        {
            title: "Category: Educational AI & AI Literacy",
            description: "Collection of 4 educational AI projects: AI Prompt Builder for Educators, AI Literacy Interactive Map, Data Detective Game, and Concept Check AI.",
            tags: ["category", "ai", "educational ai", "ai literacy", "prompt builder", "teachers", "concept check", "hub"],
            url: "./category-ai.html",
            type: "Category",
            icon: "🤖"
        },
        {
            title: "Category: Classroom Teaching Tools",
            description: "Collection of 6 classroom utility tools: Activity Timer, Team Spotlight Randomizer, Kahoot Clone System, SpeakQuest Pronunciation Quest, Kids Circuit, and QR Code Generator.",
            tags: ["category", "teaching tools", "classroom tools", "teachers", "timer", "team randomizer", "kahoot", "education", "hub"],
            url: "./category-tools.html",
            type: "Category",
            icon: "🛠️"
        },
        {
            title: "Road Watch (Bangkok Interactive Map & Flood Watch)",
            description: "Interactive GIS map monitoring 31 flood-prone locations and traffic across Bangkok. Features high-res satellite layers, Chao Phraya river routes, and route status tools.",
            tags: ["road watch", "bangkok flood", "flood map", "gis", "leaflet", "bangkok traffic", "satellite", "earth data"],
            url: "./projects/bangkokflood/index.html",
            type: "Application",
            icon: "🗺️"
        },
        {
            title: "Rain Watch (Thailand Real-Time Rainfall Monitoring & Radar)",
            description: "Real-time spatial rainfall monitoring and 15-minute time-series weather analysis for Bangkok metropolitan area. Features live radar pulse animation and station trend charts.",
            tags: ["rain watch", "rainfall radar", "weather radar", "meteorology", "precipitation", "time-series", "gis", "thailand"],
            url: "./projects/rainthailand/index.html",
            type: "Application",
            icon: "🌧️"
        },
        {
            title: "PhotoSlide Quest (15-Puzzle & Algorithmic Sliding Puzzle)",
            description: "Visual sliding tile puzzle demonstrating computational problem-solving, solvability guarantee (Inversion Parity), and A* Search heuristics (Manhattan Distance).",
            tags: ["photoslide quest", "sliding puzzle", "15 puzzle", "puzzle", "a* search", "manhattan distance", "computational thinking", "algorithm", "logic"],
            url: "./projects/sliding-puzzle/index.html",
            type: "Game",
            icon: "🧩"
        },
        {
            title: "Smart Maze Suite (Algorithmic Labyrinth & Worksheet Generator)",
            description: "Interactive procedural maze generator and Computational Thinking puzzle game. Features dual modes: responsive browser play (Touch swipe, Virtual D-Pad, Keyboard) and classroom-ready printable worksheets with instant solution keys.",
            tags: ["maze", "maze generator", "smart maze", "labyrinth", "worksheet", "printable worksheet", "computational thinking", "logic puzzle", "puzzle", "algorithm", "bfs", "stem", "educational game"],
            url: "./projects/maze-generator/index.html",
            type: "Game",
            icon: "🌀"
        },
        {
            title: "Arrow Escape (Pro Puzzle & Topological Sorting)",
            description: "Logic & spatial reasoning puzzle demonstrating Topological Sorting & Deadlock Avoidance in Computer Science. Clear arrows in dependency order with Web Audio synthesis and bilingual support.",
            tags: ["arrow escape", "arrow puzzle", "puzzle", "topological sorting", "deadlock avoidance", "computer science", "logic", "spatial reasoning", "game", "educational game"],
            url: "./projects/arrow-puzzle/index.html",
            type: "Game",
            icon: "🏹"
        },
        {
            title: "Brain Atlas 3D (Interactive Neuroanatomy & MRI Simulator)",
            description: "Interactive 3D human brain atlas featuring FreeSurfer pial surface segmentation, cortex peeling slider, Circle of Willis cerebral vasculature, and synchronized 3-plane MRI scan simulator (Axial, Coronal, Sagittal).",
            tags: ["brain atlas", "brain", "neuroanatomy", "mri", "cross-section", "circle of willis", "cortex peeling", "biology", "medical", "anatomy", "three.js", "webgl", "3d model", "science", "medical student"],
            url: "./applications/brain-atlas/index.html",
            type: "Application",
            icon: "🧠"
        },
        {
            title: "Human Atlas 3D (Gross Anatomy)",
            description: "Interactive 206-bone medical skeleton based on Encyclopaedia Britannica standards (80 axial + 126 appendicular), vertical explode view, 3D callout labels, and high-yield clinical pearls.",
            tags: ["human atlas", "atlas", "anatomy", "gross anatomy", "skeleton", "bones", "medical student", "medical", "206 bones", "britannica", "explode view", "3d model", "three.js", "webgl", "medicine", "science"],
            url: "./applications/human-atlas/index.html",
            type: "Application",
            icon: "💀"
        },
        {
            title: "Photoelectric Effect Interactive Lab",
            description: "Interactive quantum physics simulation exploring wave-particle duality. Measure stopping potential, work function, determine Planck's constant, and solve mystery metal challenges.",
            tags: ["photoelectric effect", "quantum physics", "photoelectron", "planck constant", "stopping potential", "work function", "einstein", "wave-particle duality", "virtual lab", "physics simulation", "high school physics", "stem"],
            url: "./projects/photoelectriceffect/index.html",
            type: "Application",
            icon: "⚡"
        },
        {
            title: "Mars Hexapod 3D: Chryse Planitia (Planetary Science & Robotics)",
            description: "Interactive 6-legged ARES-6 rover simulator exploring ancient Martian outflow plains in Chryse Planitia. Features Active Chassis Leveling, Tripod & Wave Gaits, in-situ VNIR reflectance spectroscopy, CER scientific inquiry framework, and Mobile Operations Hub with Fullscreen mode.",
            tags: ["mars hexapod", "hexapod", "robotics", "robot", "inverse kinematics", "ik", "tripod gait", "wave gait", "chassis leveler", "active leveler", "mars", "chryse planitia", "vnir", "spectroscopy", "cer", "planetary science", "physics", "simulation", "three.js", "3d", "webgl", "game", "mobile mode", "fullscreen"],
            url: "./applications/mars-hexapod/index.html",
            type: "Game",
            icon: "🪐"
        },
        {
            title: "Mars Hexapod 3D: Mission Guide & Inquiry Manual",
            description: "Comprehensive operation guide and planetary science manual for ARES-6 hexapod. Details keyboard and touch controls, VNIR spectra interpretation, 4 geological epochs, CER report synthesis, and Mobile Mode Center.",
            tags: ["mars hexapod", "guide", "manual", "how to play", "chryse planitia", "ares-6", "robotics", "vnir", "cer", "tripod gait", "wave gait", "mobile mode", "fullscreen"],
            url: "./applications/mars-hexapod/guide.html",
            type: "Document",
            icon: "📖"
        },
        {
            title: "Circuit Racing Grand Prix 3D (PC)",
            description: "Professional 3D circuit racing simulator on web browsers. Race Ferrari supercars against 5 intelligent AI rivals with realistic physics and engine telemetry.",
            tags: ["circuit racing", "racing", "game", "ferrari", "f1", "three.js", "webgl", "grand prix", "physics", "supercar", "logic", "coding"],
            url: "./applications/circuit-racing/index.html",
            type: "Game",
            icon: "🏁"
        },
        {
            title: "Ferrari Circuit Racing 3D (Mobile Edition)",
            description: "Tailored mobile touch edition of the 3D Ferrari circuit racing game. Ergonomic dual-thumb steering & pedals, authentic SF90/F40/LaFerrari models, and roaring V8/V12 audio.",
            tags: ["ferrari", "circuit racing", "mobile", "touch controls", "phone racing", "supercar", "three.js", "3d", "webgl", "logic"],
            url: "./applications/circuit-racing-mobile/index.html",
            type: "Game",
            icon: "📱"
        },
        {
            title: "2021 Ferrari SF90 Stradale 3D (PHEV Supercar)",
            description: "Interactive 3D model of the 986 HP Ferrari SF90 Stradale PHEV. Features PHEV powertrain X-Ray (V8 + 3 electric motors), active aerodynamics (Shut-off Gurney flap), and a 0-60 mph launch simulator.",
            tags: ["ferrari", "sf90", "stradale", "phev", "hybrid", "supercar", "automotive", "physics", "stem", "aerodynamics", "three.js", "3d", "webgl", "launch control", "logic"],
            url: "./applications/ferrari-sf90/index.html",
            type: "Application",
            icon: "🏎️"
        },
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
            title: "Human Atlas 3D",
            description: "Interactive 3D human anatomy explorer featuring multi-system layer filtering, 3D radial explode view, and real-time medical part inspection.",
            tags: ["3D", "anatomy", "medical", "biology", "organs", "skeleton", "threejs", "webgl", "human atlas"],
            url: "./applications/human-atlas/index.html",
            type: "Application",
            icon: "🫀"
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
            title: "Transforming Video Clips into a Physics Lab: Analyzing Water Waves with Python on Google Colab",
            description: "A hands-on computational physics guide using Computer Vision, OpenCV, and FFT on Google Colab to measure water wave velocity and frequency from simple smartphone videos.",
            tags: ["physics", "water waves", "computer vision", "python", "google colab", "fft", "stem education", "computational science", "article"],
            url: "./articles/physics-water-wave-python.html",
            type: "Article",
            icon: "🌊"
        },
        {
            title: "Brain First, AI Second: How to Use AI While Retaining Cognitive Agency & Deep Learning",
            description: "Analyzing MIT Media Lab's research on Cognitive Debt in LLM-assisted writing and introducing the Brain First, AI Second framework for educators and learners.",
            tags: ["brain first ai second", "cognitive debt", "mit media lab", "neuroscience", "ai in education", "pedagogy", "chatgpt", "article"],
            url: "./articles/brain-first-ai-second.html",
            type: "Article",
            icon: "🧠"
        },
        {
            title: "When AI Creators Walk Away: Lessons from Jacob Coxon for Educators",
            description: "Analyzing the warning from former Anthropic & OpenAI researcher Jacob Coxon on superintelligence risks and what it means for rethinking AI education, ethics, and human agency.",
            tags: ["ai safety", "anthropic", "jacob coxon", "superintelligence", "ai ethics", "ai in education", "educators", "alignment", "article"],
            url: "./articles/ai-safety-educators-reflection.html",
            type: "Article",
            icon: "🚨"
        },
        {
            title: "When AI Can Do Homework: Moving from Cheating Detection to Authentic Assessment",
            description: "Moving past the AI detector trap towards authentic assessment that evaluates student thought processes and true competencies in the GenAI era.",
            tags: ["authentic assessment", "ai in education", "ai detector", "evaluation", "assessment", "article"],
            url: "./articles/ai-authentic-assessment.html",
            type: "Article",
            icon: "🎯"
        },
        {
            title: "AI Literacy in Practice: 10 Ready-to-Use Classroom Activities",
            description: "10 actionable classroom activities categorized by the 4 dimensions of AILit Framework: Engage, Create, Manage, Shape.",
            tags: ["ai literacy", "classroom activities", "teaching", "lesson plans", "ai in education", "article"],
            url: "./articles/ai-literacy-classroom-activities.html",
            type: "Article",
            icon: "🎯"
        },
        {
            title: "Beyond Computer Science: Decoding the OECD Guide on Integrating AI Literacy",
            description: "Integrating AI literacy across subject disciplines through the OECD framework to foster critical understanding of AI.",
            tags: ["oecd", "ai literacy", "framework", "curriculum", "ai in education", "article"],
            url: "./articles/ai-literacy-oecd-guide.html",
            type: "Article",
            icon: "💡"
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
        },
        {
            title: "Authentic Assessment in the GenAI Era",
            description: "Rethinking educational assessment: Moving beyond flawed AI detectors toward process-based, authentic competency evaluation in the AI age.",
            tags: ["authentic assessment", "ai assessment", "ai detectors", "rubrics", "educational evaluation", "genai", "article", "teachers"],
            url: "./articles/ai-authentic-assessment.html",
            type: "Article",
            icon: "🎯"
        }
    ]
};
