const searchData = {
    th: [
        {
            title: "Neon Path Puzzle",
            description: "เกมปริศนาลากเส้นสไตล์นีออนสุดท้าทาย ฝึกสมอง การวางแผน และการแก้ปัญหา เหมาะสำหรับทุกวัย",
            tags: ["มินิเกมฝึกสมอง", "puzzle", "neon", "เกม", "ลากเส้น", "เกมการศึกษา", "ปริศนา", "ฝึกสมอง", "แก้ปัญหา"],
            url: "./learning games/line-tracing-puzzle/index.html",
            type: "Game",
            icon: "🧩"
        },
        {
            title: "โยงคู่ไม่ให้ชน (Connect No Cross)",
            description: "เกมลับสมองประลองปัญญา ลากเส้นจับคู่สัญลักษณ์ที่เหมือนกันโดยไม่ให้เส้นตัดกัน",
            tags: ["เกมฝึกสมอง", "puzzle", "connect", "เกม", "ลากเส้น", "ไม่ให้ชน", "โยงเส้น", "ปริศนา"],
            url: "./learning games/connect-no-cross-game/index.html",
            type: "Game",
            icon: "🔗"
        },
        {
            title: "One Stroke Adventure",
            description: "เกมลากเส้นครั้งเดียวปริศนาสุดท้าทาย ลากเส้นผ่านทุกจุดโดยไม่ซ้ำเส้นเดิม",
            tags: ["ลากเส้น", "one stroke", "ครั้งเดียว", "เกม", "puzzle", "ผจญภัย", "เกมปริศนา", "ฝึกสมอง"],
            url: "./learning games/one-stroke-adventure/index.html",
            type: "Game",
            icon: "✏️"
        },
        {
            title: "ปัญหาลับ 60 วินาที (Secret Problem Challenge)",
            description: "มินิเกมแข่งขันแก้ปัญหาภายใต้ความกดดันของเวลา 60 วินาที ฝึกไหวพริบและการตัดสินใจ",
            tags: ["เกม", "ปัญหาลับ", "60 วินาที", "ท้าทาย", "challenge", "problem", "แก้ปัญหา", "ความกดดัน", "เวลา"],
            url: "./learning games/problem-alert/index.html",
            type: "Game",
            icon: "⏱️"
        },
        {
            title: "Kahoot Clone System",
            description: "ระบบควิซแบบ Kahoot สร้างเกมตอบคำถามของคุณเองได้ง่ายๆ และฟรี โดยใช้ Google Sheets เป็นฐานข้อมูลและระบบจับเวลาที่แม่นยำ",
            tags: ["เครื่องมือช่วยสอน", "classroom tool", "quiz", "เกม", "kahoot", "ตอบคำถาม", "ควิซ", "ห้องเรียน"],
            url: "./learning games/kahoot-clone/index.html",
            type: "Tool",
            icon: "🏆"
        },
        {
            title: "Classroom Activity Timer",
            description: "นาฬิกาจับเวลาและนับถอยหลังช่วยบริหารชั้นเรียน รองรับระบบตั้งการนับถอยหลังทั่วไป จับเวลาการทำกิจกรรมเดี่ยว หรือการทำงานกลุ่มแบบสลับรอบ (Interval)",
            tags: ["จับเวลา", "เครื่องมือช่วยสอน", "timer", "classroom tool", "นาฬิกา", "นับถอยหลัง", "บริหารชั้นเรียน"],
            url: "./learning games/activity-timer/index.html",
            type: "Tool",
            icon: "⏱️"
        },
        {
            title: "Projectile Simulator",
            description: "แบบจำลองสถานการณ์การเคลื่อนที่แบบวิถีโค้ง ปรับค่าปัจจัยฟิสิกส์ได้สมจริง เช่น แรงต้านอากาศ แรงลม มุมยิง น้ำหนักวัตถุ และแรงโน้มถ่วงของดาวแต่ละดวง",
            tags: ["ฟิสิกส์ศึกษา", "simulation", "วิถีโค้ง", "projectile", "physics", "วิทยาศาสตร์", "ฟิสิกส์", "จำลอง"],
            url: "./learning games/projectile-game/index.html",
            type: "Simulation",
            icon: "☄️"
        },
        {
            title: "Pendulum Simulator",
            description: "แบบจำลองลูกตุ้มนาฬิกา (Pendulum) เรียนรู้หลักการทางฟิสิกส์ พลังงานจลน์ พลังงานศักย์ และแรงตึงเชือก แบบอินเทอร์แอกทีฟ",
            tags: ["ฟิสิกส์ศึกษา", "simulation", "ลูกตุ้ม", "pendulum", "physics", "วิทยาศาสตร์", "ฟิสิกส์", "พลังงานจลน์", "พลังงานศักย์", "จำลอง"],
            url: "./learning games/pendulum/pendulum.html",
            type: "Simulation",
            icon: "⏳"
        },
        {
            title: "Innovation Mixer",
            description: "มินิเกมนำเข้าสู่บทเรียนแบบสุ่มโจทย์ความท้าทาย เพื่อระดมไอเดียออกแบบนวัตกรรม โดยการผสานสิ่งของ ความสามารถพิเศษ และกลุ่มเป้าหมายผู้ใช้งาน",
            tags: ["มินิเกมการเรียนรู้", "creative thinking", "innovation", "เกม", "ออกแบบ", "นวัตกรรม", "ระดมสมอง", "ไอเดีย"],
            url: "./learning games/index.html",
            type: "Game",
            icon: "🎲"
        },
        {
            title: "AI & Media Literacy Map",
            description: "แผนภาพแนวคิด กิจกรรมการเรียนรู้ และคำถามกระตุ้นความคิดเรื่องปัญญาประดิษฐ์เชิงโต้ตอบสำหรับครูผู้สอน อิงตามกรอบสากล OECD และ EC",
            tags: ["การรู้เท่าทัน ai", "interactive map", "ai literacy", "แผนภาพ", "แผนการสอน", "สื่อการสอน", "oecd", "mindmap"],
            url: "./learning games/ai-literacy/index.html",
            type: "Interactive",
            icon: "🧠"
        },
        {
            title: "AI Literacy Game (นักสืบข้อมูล)",
            description: "เกมสวมบทบาทนักสืบข้อมูลเพื่อจับผิด AI ที่สร้างข้อมูลเท็จ อคติ และสื่อสังเคราะห์ เพื่อพัฒนาทักษะ AI Literacy และ Critical Thinking",
            tags: ["เกมการศึกษา", "ai literacy", "นักสืบ", "critical thinking", "ตรวจสอบข้อมูล", "อคติ ai", "เกม ai", "จับผิด"],
            url: "./learning games/ai literacy game/index.html",
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
            url: "./Ireland_pocketbook_Apisit.pdf",
            type: "Article",
            icon: "🎒"
        }
    ],
    en: [
        {
            title: "Neon Path Puzzle",
            description: "A challenging neon-style line tracing puzzle game. Train your brain, planning, and problem-solving skills.",
            tags: ["puzzle game", "puzzle", "neon", "game", "line tracing", "educational game", "brain training", "problem solving"],
            url: "./learning games/line-tracing-puzzle/index.html",
            type: "Game",
            icon: "🧩"
        },
        {
            title: "Connect No Cross",
            description: "A challenging brain puzzle game. Connect matching symbols without the lines intersecting.",
            tags: ["brain puzzle", "puzzle", "connect", "game", "line drawing", "no cross", "matching"],
            url: "./learning games/connect-no-cross-game/index.html",
            type: "Game",
            icon: "🔗"
        },
        {
            title: "One Stroke Adventure",
            description: "An adventurous one-stroke drawing puzzle. Trace all points without crossing the same path.",
            tags: ["line drawing", "one stroke", "single stroke", "game", "puzzle", "adventure", "brain training"],
            url: "./learning games/one-stroke-adventure/index.html",
            type: "Game",
            icon: "✏️"
        },
        {
            title: "Secret Problem Challenge (60 Seconds)",
            description: "A mini-game challenging you to solve a problem under the pressure of a 60-second timer.",
            tags: ["game", "secret problem", "60 seconds", "challenge", "problem solving", "time pressure", "timer"],
            url: "./learning games/problem-alert/index.html",
            type: "Game",
            icon: "⏱️"
        },
        {
            title: "Kahoot Clone System",
            description: "Create your own live quiz games easily and for free, using Google Sheets as a database with precise millisecond timing.",
            tags: ["teaching aid", "classroom tool", "quiz", "game", "kahoot", "questions", "answers", "live quiz"],
            url: "./learning games/kahoot-clone/index.html",
            type: "Tool",
            icon: "🏆"
        },
        {
            title: "Classroom Activity Timer",
            description: "Stopwatch and countdown timer for classroom management. Supports standard countdowns, group activities, and interval training timers.",
            tags: ["timer", "teaching aid", "classroom tool", "stopwatch", "countdown", "interval", "management"],
            url: "./learning games/activity-timer/index.html",
            type: "Tool",
            icon: "⏱️"
        },
        {
            title: "Projectile Simulator",
            description: "Interactive simulation for projectile motion. Adjust physical factors like air resistance, wind, launch angle, mass, and planetary gravity.",
            tags: ["physics education", "simulation", "projectile", "physics", "science", "gravity", "motion"],
            url: "./learning games/projectile-game/index.html",
            type: "Simulation",
            icon: "☄️"
        },
        {
            title: "Pendulum Simulator",
            description: "Interactive pendulum simulation to learn physics principles like kinetic energy, potential energy, and tension.",
            tags: ["physics education", "simulation", "pendulum", "physics", "science", "kinetic energy", "potential energy", "tension"],
            url: "./learning games/pendulum/pendulum.html",
            type: "Simulation",
            icon: "⏳"
        },
        {
            title: "Innovation Mixer",
            description: "A creative brainstorming mini-game that randomly pairs an object, a special ability, and a user group to challenge students to innovate.",
            tags: ["learning game", "creative thinking", "innovation", "brainstorming", "design", "mixer", "ideas"],
            url: "./learning games/index.html",
            type: "Game",
            icon: "🎲"
        },
        {
            title: "AI & Media Literacy Map",
            description: "Interactive mindmap of concepts, classroom activities, and inquiry prompts about AI literacy for educators, aligned with OECD & EC frameworks.",
            tags: ["ai literacy", "interactive map", "mindmap", "oecd", "teaching plan", "educators", "media literacy"],
            url: "./learning games/ai-literacy/index.html",
            type: "Interactive",
            icon: "🧠"
        },
        {
            title: "AI Literacy Game (Data Detective)",
            description: "A role-playing detective game to spot AI-generated hallucinations, bias, and deepfakes to develop AI Literacy and Critical Thinking.",
            tags: ["educational game", "ai literacy", "detective", "critical thinking", "bias", "fake news", "hallucinations"],
            url: "./learning games/ai literacy game/index.html",
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
            url: "about-en.html",
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
        }
    ]
};
