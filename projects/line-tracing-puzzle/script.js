// Web Audio API Procedural Synthesizer for high-fidelity interactive game audio
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

const MUTE_STORAGE_KEY = 'neonpath_muted';
let isMuted = false;
try {
    isMuted = localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
} catch (e) {
    isMuted = false;
}

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

// Mobile Haptic Feedback
function triggerHaptic(type) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
            if (type === 'snap') navigator.vibrate(12);
            else if (type === 'error') navigator.vibrate([25, 30, 25]);
            else if (type === 'undo') navigator.vibrate(18);
            else if (type === 'win') navigator.vibrate([40, 50, 40, 50, 80]);
        } catch (e) {
            // Silently catch if vibrations are disallowed by browser policy
        }
    }
}

// Pentatonic Scale (C4 to C7) for harmonious, non-fatiguing auditory progression
const PENTATONIC_SCALE = [
    261.63, 293.66, 329.63, 392.00, 440.00,  // C4, D4, E4, G4, A4
    523.25, 587.33, 659.25, 783.99, 880.00,  // C5, D5, E5, G5, A5
    1046.50, 1174.66, 1318.51, 1567.98, 1760.00, // C6, D6, E6, G6, A6
    2093.00, 2349.32, 2637.02, 3135.96, 3520.00  // C7, D7, E7, G7, A7
];

function playStepTone(stepIndex, totalSteps) {
    if (isMuted) return;
    const ctx = getAudioContext();
    const noteIdx = Math.min(stepIndex, PENTATONIC_SCALE.length - 1);
    const freq = PENTATONIC_SCALE[noteIdx % PENTATONIC_SCALE.length];
    const now = ctx.currentTime;
    
    // Dual oscillator: fundamental sine + soft bell overtone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // Octave overtone
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, now);
    
    // Dynamic soft percussive envelope
    const duration = 0.14;
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
}

function playUndoTone(stepIndex) {
    if (isMuted) return;
    const ctx = getAudioContext();
    const noteIdx = Math.max(0, Math.min(stepIndex, PENTATONIC_SCALE.length - 1));
    const freq = PENTATONIC_SCALE[noteIdx % PENTATONIC_SCALE.length];
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(100, freq * 0.75), now + 0.12);
    
    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.12);
}

function playErrorTone() {
    if (isMuted) return;
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Gentle detuned dual tone instead of abrasive buzzer
    [220, 233.08].forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
    });
}

function playWinChime() {
    if (isMuted) return;
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C Major pentatonic
    
    arpeggio.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteTime = now + (i * 0.08);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);
        
        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.linearRampToValueAtTime(0.15, noteTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.45);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(noteTime);
        osc.stop(noteTime + 0.45);
    });
}

// Confetti Effect
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiParticles = [];
let confettiAnimationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfetti() {
    const colors = ['#00ffcc', '#ff007f', '#ffd700', '#ffffff'];
    for (let i = 0; i < 100; i++) {
        confettiParticles.push({
            x: canvas.width / 2,
            y: canvas.height / 2 + 50,
            r: Math.random() * 6 + 2,
            dx: Math.random() * 10 - 5,
            dy: Math.random() * -10 - 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngle: 0,
            tiltAngleInc: (Math.random() * 0.07) + 0.05
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach((p, index) => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle) * 2;
        p.dy += 0.1; // gravity
        p.x += p.dx;
        p.y += p.dy;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();

        if (p.y > canvas.height) {
            confettiParticles.splice(index, 1);
        }
    });

    if (confettiParticles.length > 0) {
        confettiAnimationId = requestAnimationFrame(drawConfetti);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function fireConfetti() {
    confettiParticles = [];
    createConfetti();
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    drawConfetti();
}


// Curated Pedagogical Curriculum & Graph Constraint Data Model
const curatedLevels = [
    {
        id: 1,
        chapter: 1,
        title: "The Corner Paradox",
        titleTh: "ปริศนามุมตาราง",
        size: 3,
        startCell: 0,
        obstacles: [],
        oneWay: {},
        waypoints: {},
        concept: "Vertex Degrees",
        conceptTh: "ระดับขั้นของจุดยอด",
        desc: "มุมตารางมีเพียง 2 เส้นเชื่อม (Degree = 2) วางแผนเก็บมุมก่อนทางเข้า-ออกจะถูกปิดตาย!"
    },
    {
        id: 2,
        chapter: 1,
        title: "Perimeter Perimeter",
        titleTh: "อุปสรรคขอบตาราง",
        size: 3,
        startCell: 3,
        obstacles: [0],
        oneWay: {},
        waypoints: {},
        concept: "Boundary Traversal",
        conceptTh: "การท่องแนวขอบ",
        desc: "จุดมุมถูกบล็อกด้วยสิ่งกีดขวาง ต้องเดินเลาะขอบตารางเพื่อเชื่อมทุกเซลล์"
    },
    {
        id: 3,
        chapter: 1,
        title: "The Bottleneck Bridge",
        titleTh: "สะพานคอขวด",
        size: 4,
        startCell: 15,
        obstacles: [12],
        oneWay: {},
        waypoints: {},
        concept: "Cut Vertices",
        conceptTh: "จุดตัดคอขวด",
        desc: "ตาราง 4x4 ที่มีมุมล่างถูกบล็อก ฝึกมองภาพรวมและวิเคราะห์จุดตัด"
    },
    {
        id: 4,
        chapter: 2,
        title: "One-Way Stream",
        titleTh: "กระแสน้ำทางเดียว",
        size: 4,
        startCell: 13,
        obstacles: [6],
        oneWay: { 5: 'down' },
        waypoints: {},
        concept: "Directed Digraph",
        conceptTh: "กราฟระบุทิศทาง",
        desc: "ลูกศรสีส้ม (One-Way Arrow): บังคับให้เดินออกจากช่องนี้ลงข้างล่างเท่านั้น!"
    },
    {
        id: 5,
        chapter: 2,
        title: "The Rotary Junction",
        titleTh: "วงเวียนชุมทาง",
        size: 4,
        startCell: 6,
        obstacles: [5, 14],
        oneWay: { 8: 'up' },
        waypoints: {},
        concept: "Flow Constraints",
        conceptTh: "ข้อจำกัดการไหล",
        desc: "ลูกศรชี้ขึ้นที่ช่อง 8 บังคับทิศทางไหลของกระแสเส้นทาง"
    },
    {
        id: 6,
        chapter: 2,
        title: "Directed Flow Maze",
        titleTh: "เขาวงกตทิศทาง",
        size: 5,
        startCell: 19,
        obstacles: [14, 24],
        oneWay: { 12: 'down' },
        waypoints: {},
        concept: "Cycle Avoidance",
        conceptTh: "การหลีกเลี่ยงวังวน",
        desc: "ตาราง 5x5 ขนาดใหญ่ขึ้น พร้อมลูกศรควบคุมการไหลตรงกึ่งกลาง"
    },
    {
        id: 7,
        chapter: 3,
        title: "Topological Checkpoint",
        titleTh: "จุดตรวจลำดับขั้น",
        size: 4,
        startCell: 13,
        obstacles: [9],
        oneWay: {},
        waypoints: { 1: 1, 7: 2 },
        concept: "Topological Order",
        conceptTh: "การเรียงลำดับจุดตรวจ",
        desc: "ต้องเดินผ่านจุดตรวจ ① ก่อน แล้วจึงเดินผ่านจุดตรวจ ②"
    },
    {
        id: 8,
        chapter: 3,
        title: "Sequential Tour",
        titleTh: "การสำรวจตามลำดับ",
        size: 5,
        startCell: 16,
        obstacles: [4, 11],
        oneWay: {},
        waypoints: { 6: 1, 24: 2 },
        concept: "Constrained Tour",
        conceptTh: "วิถีแฮมิลตันแบบมีเงื่อนไข",
        desc: "ผสานการเดินทาง 5x5 ให้ผ่านจุดตรวจ ① และ ② อย่างแม่นยำ"
    },
    {
        id: 9,
        chapter: 3,
        title: "Grand Master Graph",
        titleTh: "ปรมาจารย์ทฤษฎีกราฟ",
        size: 5,
        startCell: 19,
        obstacles: [4, 14],
        oneWay: { 16: 'right' },
        waypoints: { 11: 1, 5: 2 },
        concept: "Master Synthesis",
        conceptTh: "การสังเคราะห์มโนมติรวม",
        desc: "ผสานครบทุกมโนมติ: อุปสรรค, ลูกศรทางเดียว และจุดตรวจลำดับขั้น!"
    }
];

const proceduralConfig = {
    id: 10,
    chapter: 4,
    title: "Infinite Procedural Matrix",
    titleTh: "เมทริกซ์สุ่มไร้ที่สิ้นสุด",
    concept: "Algorithmic Generation",
    conceptTh: "การสร้างแบบสุ่ม",
    desc: "โหมดสุ่มด่านอัตโนมัติ สำหรับฝึกฝนอย่างไม่จำกัด!",
    oneWay: {},
    waypoints: {}
};

// LocalStorage Mastery Tracking
const STORAGE_KEY = 'neon_path_mastery_v2';

function getProgress() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch(e) {
        return {};
    }
}

function saveLevelClear(levelId, timeSeconds) {
    try {
        const prog = getProgress();
        if (!prog[levelId] || timeSeconds < prog[levelId].bestTime) {
            prog[levelId] = {
                cleared: true,
                bestTime: timeSeconds
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
        }
    } catch(e) {
        console.warn('LocalStorage error:', e);
    }
}

function formatSeconds(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// Socratic Computational Thinking & Graph Theory Reflections
const levelReflections = {
    1: {
        question: "ทำไมจุดมุมของตาราง (Corner Cells) จึงมีความสำคัญอย่างยิ่งในการวางแผนเส้นทางวิถีแฮมิลตัน?",
        options: [
            "เพราะจุดมุมมี Degree = 2 (มีทางเชื่อมเพียง 2 ทาง) จึงต้องถูกใช้เป็นจุดเริ่ม จุดจบ หรือต้องเลี้ยวผ่านเสมอ",
            "เพราะจุดมุมสามารถลากทะลุขอบตารางข้ามไปอีกฝั่งได้ทันที",
            "เพราะจุดมุมไม่มีสิ่งกีดขวางใดๆ เข้ามาอยู่ใกล้ได้"
        ],
        answer: 0,
        explanation: "<strong>💡 ดีกรีของจุดยอด (Vertex Degree):</strong> ในตาราง 2 มิติ จุดมุมจะมีทางเข้า-ออกเพียง 2 ทาง (Degree = 2) หากเราเดินผ่านช่องรอบข้างจนหมดโดยไม่แวะจุดมุม ช่องนั้นจะกลายเป็น <em>Isolated Node</em> ที่ไม่มีทางเข้าเหลืออยู่!"
    },
    2: {
        question: "ในตาราง 3×3 จุดกึ่งกลางมี Degree สูงสุดถึง 4 ทาง ทำไมการรีบเดินเข้าจุดกึ่งกลางเร็วเกินไปจึงมักทำให้ติดทางตัน?",
        options: [
            "เพราะการเดินตัดผ่านตรงกลางจะกั้นขอบรอบนอก (Perimeter) ขาดออกจากกันเป็นสองฝั่งอิสระ",
            "เพราะจุดกึ่งกลางถูกล็อกห้ามเดินผ่านในกฎทฤษฎีกราฟ",
            "เพราะจุดกึ่งกลางจะลดคะแนนของผู้เล่นลงทีละก้าว"
        ],
        answer: 0,
        explanation: "<strong>🧩 ปัญหาคอขวด (Cut Vertex):</strong> จุดกึ่งกลางทำหน้าที่เสมือน 'สะพาน' เมื่อเราเดินเหยียบผ่าน จุดนั้นจะถูกตัดออกจากกราฟ ส่งผลให้เส้นรอบนอกถูกแบ่งออกเป็น 2 ส่วนย่อยที่ไม่สามารถเชื่อมหากันได้อีก!"
    },
    3: {
        question: "จุดในตารางที่ทำหน้าที่เป็น 'สะพานคอขวด' ซึ่งหากถูกตัดออกจะทำให้กราฟแยกเป็นสองส่วน มีชื่อทางวิชาการว่าอะไร?",
        options: [
            "Cut Vertex (หรือ Articulation Point)",
            "Eulerian Cycle Point",
            "Isolated Island Node"
        ],
        answer: 0,
        explanation: "<strong>🌉 จุดตัดคอขวด (Cut Vertex):</strong> ในการค้นหาวิถีแฮมิลตัน เราต้องระวังการเดินผ่าน Cut Vertex ให้ถูกจังหวะ เพราะเมื่อข้ามสะพานไปแล้ว เราจะไม่สามารถย้อนกลับมาเก็บจุดในฝั่งเดิมได้อีกต่อไป!"
    },
    4: {
        question: "ในกราฟระบุทิศทาง (Directed Graph) การมีช่องลูกศรทางเดียว (One-Way) ส่งผลต่อคุณสมบัติทางทอพอโลยีอย่างไร?",
        options: [
            "ความสมมาตรหายไป (Asymmetric Flow): In-degree และ Out-degree แยกจากกัน ทำให้ไม่สามารถเดินย้อนทางเดิมได้",
            "ทำให้ผู้เล่นไม่สามารถใช้ปุ่ม Undo ถอยหลังได้",
            "ทำให้จำนวนจุดยอดทั้งหมดในตารางเพิ่มขึ้นเป็นสองเท่า"
        ],
        answer: 0,
        explanation: "<strong>➡️ กราฟระบุทิศทาง (Directed Graph):</strong> เส้นเชื่อมในกราฟนี้มีทิศทางชัดเจน ผู้เล่นต้องคำนวณ 'ทางเข้า' และ 'ทางออก' แยกจากกัน เป็นพื้นฐานของ State Transition ในวิทยาการคอมพิวเตอร์!"
    },
    5: {
        question: "ในด่านวงเวียน (The Rotary Junction) การตัดสินใจเดินเข้าสู่วงเวียนทางเดียวต้องคำนึงถึงสิ่งใดเป็นสำคัญ?",
        options: [
            "ต้องแน่ใจว่าเมื่อเดินวนรอบวงเวียนแล้ว จะยังมีช่องทางออกที่ยังไม่ได้เดินผ่านเหลืออยู่",
            "ต้องหมุนตามเข็มนาฬิกาให้ครบอย่างน้อย 3 รอบก่อนออก",
            "ต้องเดินเข้าทางทิศตะวันออกเฉียงเหนือเท่านั้น"
        ],
        answer: 0,
        explanation: "<strong>🔄 ลูปและทางออก (Directed Cycles & Exits):</strong> ในกราฟที่มีวงวนแบบทางเดียว หากช่องทางออกถูกเดินปิดทางไปก่อนหน้านี้ การเดินเข้าสู่วงเวียนจะกลายเป็นการเดินเข้าสู่ Deadlock Trap ทันที!"
    },
    6: {
        question: "การแก้โจทย์ตารางขนาดใหญ่ที่มีลูกศรหลายจุด อาศัยเสาหลักใดของ Computational Thinking ชัดเจนที่สุด?",
        options: [
            "Algorithms & Decomposition: การย่อยตารางเป็นโซนย่อยและวางลำดับแผนการเดินแบบมีเงื่อนไขล่วงหน้า",
            "Brute Force: การเดาสุ่มทางไปเรื่อยๆ โดยไม่คิดล่วงหน้า",
            "Hardware Overclocking: การเพิ่มความเร็วรอบของเครื่องประมวลผล"
        ],
        answer: 0,
        explanation: "<strong>🧠 Decomposition & Algorithms:</strong> การย่อยปัญหาใหญ่ (ตาราง 5×5) ออกเป็นช่วงย่อยตามกระแสการไหลของลูกศร ช่วยลดพื้นที่การค้นหา (State Space Search) ได้อย่างมีประสิทธิภาพ!"
    },
    7: {
        question: "การบังคับให้เดินเก็บจุดตรวจตามลำดับ ① → ② สอดคล้องกับขั้นตอนวิธีใดในวิทยาการคอมพิวเตอร์?",
        options: [
            "Topological Sorting (การจัดลำดับเชิงทอพอโลยี สำหรับงานที่มีเงื่อนไขก่อน-หลัง)",
            "Binary Search (การค้นหาแบบทวิภาค)",
            "Bubble Sort (การเรียงลำดับแบบฟองสบู่)"
        ],
        answer: 0,
        explanation: "<strong>🎯 Topological Sorting:</strong> ใช้จัดการงานที่มีความสัมพันธ์แบบมีเงื่อนไข (Dependencies) เช่น ระบบการคอมไพล์โปรแกรม (Build Pipeline) ที่ไฟล์ A ต้องถูกสร้างก่อนไฟล์ B เสมอ!"
    },
    8: {
        question: "เมื่อมีจุดตรวจเรียงลำดับหลายจุดในพื้นที่ขนาดใหญ่ กลยุทธ์ Divide and Conquer ช่วยได้อย่างไร?",
        options: [
            "ช่วยแปลงโจทย์ใหญ่ 1 ข้อ ให้กลายเป็นโจทย์ย่อยสั้นๆ หลายช่วง (Start → ① → ② → ③)",
            "ช่วยให้สามารถเดินทะลุกำแพงสิ่งกีดขวางได้",
            "ช่วยข้ามจุดตรวจตัวเลขโดยไม่ต้องเดินผ่าน"
        ],
        answer: 0,
        explanation: "<strong>✂️ Divide and Conquer (การแบ่งและพิชิต):</strong> จุดตรวจทำให้เราสามารถโฟกัสแก้ปัญหาเส้นทางทีละช่วงย่อย ช่วยลดภาระทางความคิด (Cognitive Load) และป้องกันการหลงทางในพื้นที่ขนาดใหญ่!"
    },
    9: {
        question: "ด่านนี้รวมทั้ง 'ระดับขั้น (Degrees)', 'ทางเดียว (One-Way)' และ 'จุดตรวจ (Waypoints)' บ่งบอกถึงการแก้ปัญหาแบบใด?",
        options: [
            "Multi-Constraint Optimization: การค้นหาวิถีแฮมิลตันภายใต้ระบบข้อจำกัดพหุคูณ",
            "Single Variable Testing: การทดสอบตัวแปรเดี่ยว",
            "Unconstrained Random Walk: การเดินสุ่มอย่างไร้จุดหมาย"
        ],
        answer: 0,
        explanation: "<strong>🏆 Master of Discrete Logic:</strong> ยินดีด้วย! คุณได้ประยุกต์ใช้ทั้ง Degree Analysis, Flow Constraints, และ Topological Sequencing ในการพิชิตวิถีแฮมิลตันที่ซับซ้อนได้อย่างสมบูรณ์แบบ!"
    }
};

function generateSolvableLevel(size, numObstacles) {
    const totalCells = size * size;
    const targetLength = totalCells - numObstacles;
    
    function checkSolvable(start, obs) {
        let iterations = 0;
        function dfs(path) {
            if (path.length === targetLength) return true;
            iterations++;
            if (iterations > 3000) return false; 
            const lastCell = path[path.length - 1];
            const x = lastCell % size;
            const y = Math.floor(lastCell / size);
            const deltas = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
            for (let d of deltas) {
                const nx = x + d.x;
                const ny = y + d.y;
                if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
                    const idx = ny * size + nx;
                    if (!obs.includes(idx) && !path.includes(idx)) {
                        if (dfs([...path, idx])) return true;
                    }
                }
            }
            return false;
        }
        return dfs([start]);
    }

    while (true) {
        const start = Math.floor(Math.random() * totalCells);
        const obs = [];
        while (obs.length < numObstacles) {
            const r = Math.floor(Math.random() * totalCells);
            if (r !== start && !obs.includes(r)) obs.push(r);
        }
        if (checkSolvable(start, obs)) {
            return { startCell: start, obstacles: obs };
        }
    }
}

let currentLevelIndex = 0;
let currentLevelConfig = curatedLevels[0];
let gridSize = 3;
let totalCells = 9;
let startCell = 0;
let obstacles = [];
let path = [];
let isDrawing = false;
let gameWon = false;
let currentPointerPos = null;

let isGraphMode = false;

const gridContainer = document.getElementById('grid');
const levelDisplay = document.getElementById('level-display');
const levelLabel = document.getElementById('level-label');
const levelTitleDisplay = document.getElementById('level-title-display');
const conceptBadgeDisplay = document.getElementById('concept-badge-display');
const levelModal = document.getElementById('level-modal');
const levelGridList = document.getElementById('level-grid-list');
const closeLevelModalBtn = document.getElementById('close-level-modal-btn');
const hintBtn = document.getElementById('hint-btn');
const undoBtn = document.getElementById('undo-btn');
const restartBtn = document.getElementById('restart-btn');
const graphModeBtn = document.getElementById('graph-mode-btn');
const nodeCounter = document.getElementById('node-counter');
const progressPercent = document.getElementById('progress-percent');
const pathProgressFill = document.getElementById('path-progress-fill');
const overlay = document.getElementById('message-overlay');
const nextLevelBtn = document.getElementById('next-level-btn');
const msgText = document.getElementById('message-text');
const timerDisplay = document.getElementById('timer-display');
const timeTakenText = document.getElementById('time-taken-text');
const reflectionContainer = document.getElementById('reflection-container');
const reflectionQuestion = document.getElementById('reflection-question');
const reflectionOptions = document.getElementById('reflection-options');
const reflectionFeedback = document.getElementById('reflection-feedback');
const replayPathBtn = document.getElementById('replay-path-btn');
const infoBtn = document.getElementById('info-btn');
const infoOverlay = document.getElementById('info-overlay');
const closeInfoBtn = document.getElementById('close-info-btn');
const diagnosticPanel = document.getElementById('diagnostic-panel');
const diagnosticTitle = document.getElementById('diagnostic-title');
const diagnosticBody = document.getElementById('diagnostic-body');
const closeDiagnosticBtn = document.getElementById('close-diagnostic-btn');
const architectBtn = document.getElementById('architect-btn');
const architectModal = document.getElementById('architect-modal');
const closeArchitectBtn = document.getElementById('close-architect-btn');
const architectGrid = document.getElementById('architect-grid');
const architectStatus = document.getElementById('architect-status');
const verifyCustomBtn = document.getElementById('verify-custom-btn');
const playCustomBtn = document.getElementById('play-custom-btn');
const shareCustomBtn = document.getElementById('share-custom-btn');
const soundToggleBtn = document.getElementById('sound-toggle-btn');
const soundIconOn = document.getElementById('sound-icon-on');
const soundIconOff = document.getElementById('sound-icon-off');
const telemetryCounter = document.getElementById('telemetry-counter');
const eulerBtn = document.getElementById('euler-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const fullscreenEnterIcon = document.getElementById('fullscreen-enter-icon');
const fullscreenExitIcon = document.getElementById('fullscreen-exit-icon');
const eulerModal = document.getElementById('euler-modal');
const closeEulerBtn = document.getElementById('close-euler-btn');
const eulerTabKonigsberg = document.getElementById('euler-tab-konigsberg');
const eulerTabHouse = document.getElementById('euler-tab-house');
const eulerSvg = document.getElementById('euler-svg');
const eulerStatusBox = document.getElementById('euler-status-box');
const eulerToggleBridgeBtn = document.getElementById('euler-toggle-bridge-btn');
const eulerSimulateBtn = document.getElementById('euler-simulate-btn');
const eulerResetBtn = document.getElementById('euler-reset-btn');
const replaySpeedBtn = document.getElementById('replay-speed-btn');

const REPLAY_SPEEDS = [1, 2, 0.5];
let currentSpeedIndex = 0;

function toggleReplaySpeed() {
    currentSpeedIndex = (currentSpeedIndex + 1) % REPLAY_SPEEDS.length;
    const speed = REPLAY_SPEEDS[currentSpeedIndex];
    if (replaySpeedBtn) {
        replaySpeedBtn.textContent = `${speed}× Speed`;
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn('Fullscreen request failed:', err);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                console.warn('Exit fullscreen failed:', err);
            });
        }
    }
}

function updateFullscreenUI() {
    const isFull = !!document.fullscreenElement;
    if (fullscreenEnterIcon && fullscreenExitIcon) {
        if (isFull) {
            fullscreenEnterIcon.classList.add('hidden');
            fullscreenExitIcon.classList.remove('hidden');
            if (fullscreenBtn) fullscreenBtn.title = "ออกจากโหมดเต็มจอ [F]";
        } else {
            fullscreenEnterIcon.classList.remove('hidden');
            fullscreenExitIcon.classList.add('hidden');
            if (fullscreenBtn) fullscreenBtn.title = "โหมดเต็มจอสำหรับกระดานเรียน (Fullscreen) [F]";
        }
    }
}
document.addEventListener('fullscreenchange', updateFullscreenUI);

let moveCount = 0;
let undoCount = 0;

function updateSoundUI() {
    if (!soundIconOn || !soundIconOff) return;
    if (isMuted) {
        soundIconOn.classList.add('hidden');
        soundIconOff.classList.remove('hidden');
        if (soundToggleBtn) {
            soundToggleBtn.classList.add('muted');
            soundToggleBtn.title = "เปิดเสียง (Unmute) [V]";
        }
    } else {
        soundIconOn.classList.remove('hidden');
        soundIconOff.classList.add('hidden');
        if (soundToggleBtn) {
            soundToggleBtn.classList.remove('muted');
            soundToggleBtn.title = "ปิดเสียง (Mute) [V]";
        }
    }
}

function toggleSound() {
    isMuted = !isMuted;
    try {
        localStorage.setItem(MUTE_STORAGE_KEY, isMuted ? 'true' : 'false');
    } catch (e) {
        console.warn('LocalStorage error:', e);
    }
    updateSoundUI();
}

function updateTelemetryDisplay() {
    if (telemetryCounter) {
        telemetryCounter.textContent = `Moves: ${moveCount} • Undos: ${undoCount}`;
    }
}

let isReplaying = false;
let replayTimer = null;

function renderReflectionCard(levelId) {
    if (!reflectionContainer || !reflectionQuestion || !reflectionOptions || !reflectionFeedback) return;
    
    const data = levelReflections[levelId] || {
        question: "ในทฤษฎีกราฟ 'วิถีแฮมิลตัน' (Hamiltonian Path) มีนิยามสำคัญอย่างไร?",
        options: [
            "เส้นทางที่เดินผ่านทุกจุดยอด (Vertices) ในกราฟ โดยผ่านแต่ละจุดยอดเพียงครั้งเดียว",
            "เส้นทางที่เดินผ่านทุกเส้นเชื่อม (Edges) ซ้ำกี่ครั้งก็ได้",
            "เส้นทางที่เริ่มต้นและสิ้นสุดที่จุดเดิมเสมอ"
        ],
        answer: 0,
        explanation: "<strong>📐 Hamiltonian vs Eulerian:</strong> วิถีแฮมิลตันคือการเดินผ่านทุก 'จุดยอด' (Vertex) ครบพอดีโดยไม่ซ้ำ แตกต่างจากวิถีออยเลอร์ (Eulerian Path) ที่ต้องเดินผ่านทุก 'เส้นเชื่อม' (Edge)!"
    };

    reflectionQuestion.textContent = data.question;
    reflectionOptions.innerHTML = '';
    reflectionFeedback.classList.add('hidden');
    reflectionFeedback.innerHTML = '';

    data.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'reflection-opt-btn';
        btn.innerHTML = `<strong>${['ก', 'ข', 'ค'][optIdx]}.</strong> ${optText}`;
        btn.addEventListener('click', () => {
            getAudioContext();
            const allBtns = reflectionOptions.querySelectorAll('.reflection-opt-btn');
            if (optIdx === data.answer) {
                btn.classList.add('correct');
                playStepTone(12, 12);
                allBtns.forEach(b => b.disabled = true);
                reflectionFeedback.innerHTML = `
                    <div style="color:#00ffcc; font-weight:700; margin-bottom:4px;">✓ ยอดเยี่ยมมาก! คำตอบถูกต้อง (+100 Concept XP)</div>
                    <div>${data.explanation}</div>
                `;
                reflectionFeedback.classList.remove('hidden');
            } else {
                btn.classList.add('incorrect');
                playErrorTone();
                reflectionFeedback.innerHTML = `
                    <div style="color:#ff6688; font-weight:700; margin-bottom:4px;">✕ ยังไม่ถูกต้อง ลองคิดทบทวนดูอีกครั้งนะ!</div>
                `;
                reflectionFeedback.classList.remove('hidden');
            }
        });
        reflectionOptions.appendChild(btn);
    });
}

function playSolutionReplay() {
    if (isReplaying || path.length === 0) return;
    isReplaying = true;
    getAudioContext();

    const fullPath = [...path];
    overlay.classList.add('hidden');
    
    // Clear path visually to replay from step 1
    path = [fullPath[0]];
    updateCellVisuals();
    playStepTone(1, fullPath.length);

    let stepIndex = 1;
    clearInterval(replayTimer);
    const intervalMs = Math.round(170 / REPLAY_SPEEDS[currentSpeedIndex]);
    replayTimer = setInterval(() => {
        if (stepIndex < fullPath.length) {
            path.push(fullPath[stepIndex]);
            playStepTone(path.length, fullPath.length);
            updateCellVisuals();
            stepIndex++;
        } else {
            clearInterval(replayTimer);
            isReplaying = false;
            playWinChime();
            setTimeout(() => {
                overlay.classList.remove('hidden');
            }, 600);
        }
    }, intervalMs);
}

// ==========================================
// Graph Architect / Custom Level Sandbox
// ==========================================
let archSize = 3;
let archTool = 'start';
let archStartCell = 0;
let archObstacles = [];
let archOneWay = {};
let archWaypoints = {};
let archSolvable = false;

function renderArchitectGrid() {
    if (!architectGrid) return;
    architectGrid.innerHTML = '';
    architectGrid.style.gridTemplateColumns = `repeat(${archSize}, 1fr)`;
    architectGrid.style.gridTemplateRows = `repeat(${archSize}, 1fr)`;

    const total = archSize * archSize;
    for (let i = 0; i < total; i++) {
        const cell = document.createElement('div');
        cell.className = 'arch-cell';
        cell.dataset.index = i;

        if (i === archStartCell) {
            cell.classList.add('arch-start');
        } else if (archObstacles.includes(i)) {
            cell.classList.add('arch-obstacle');
        } else if (archOneWay[i]) {
            cell.classList.add('arch-oneway', `arch-oneway-${archOneWay[i]}`);
        } else if (archWaypoints[i] !== undefined) {
            cell.classList.add('arch-waypoint');
            cell.setAttribute('data-wp', archWaypoints[i]);
        }

        cell.addEventListener('click', () => handleArchCellClick(i));
        architectGrid.appendChild(cell);
    }
}

function handleArchCellClick(idx) {
    archSolvable = false;
    if (playCustomBtn) playCustomBtn.disabled = true;
    if (shareCustomBtn) shareCustomBtn.disabled = true;
    if (architectStatus) {
        architectStatus.className = 'architect-status';
        architectStatus.textContent = 'มีการแก้ไขตาราง — กรุณากด "ตรวจสอบความถูกต้อง" เพื่อวิเคราะห์วิถีแฮมิลตัน';
    }

    if (archTool === 'start') {
        archStartCell = idx;
        archObstacles = archObstacles.filter(o => o !== idx);
        delete archOneWay[idx];
        delete archWaypoints[idx];
    } else if (archTool === 'obstacle') {
        if (idx === archStartCell) return;
        delete archOneWay[idx];
        delete archWaypoints[idx];
        if (archObstacles.includes(idx)) {
            archObstacles = archObstacles.filter(o => o !== idx);
        } else {
            archObstacles.push(idx);
        }
    } else if (archTool === 'oneway') {
        if (idx === archStartCell || archObstacles.includes(idx)) return;
        delete archWaypoints[idx];
        const dirs = ['up', 'right', 'down', 'left'];
        const currentDir = archOneWay[idx];
        if (!currentDir) {
            archOneWay[idx] = 'up';
        } else {
            const nextIdx = dirs.indexOf(currentDir) + 1;
            if (nextIdx < dirs.length) {
                archOneWay[idx] = dirs[nextIdx];
            } else {
                delete archOneWay[idx];
            }
        }
    } else if (archTool === 'waypoint') {
        if (idx === archStartCell || archObstacles.includes(idx)) return;
        delete archOneWay[idx];
        if (archWaypoints[idx] !== undefined) {
            delete archWaypoints[idx];
        } else {
            const existingOrders = Object.values(archWaypoints);
            const nextOrder = existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;
            archWaypoints[idx] = nextOrder;
        }
    } else if (archTool === 'clear') {
        if (idx !== archStartCell) {
            archObstacles = archObstacles.filter(o => o !== idx);
            delete archOneWay[idx];
            delete archWaypoints[idx];
        }
    }

    renderArchitectGrid();
}

function verifyArchitectLevel() {
    getAudioContext();
    const total = archSize * archSize;
    const targetLength = total - archObstacles.length;

    if (targetLength < 3) {
        if (architectStatus) {
            architectStatus.className = 'architect-status unsolvable';
            architectStatus.textContent = '✕ ตารางมีจำนวนช่องว่างน้อยเกินไป (ต้องมีอย่างน้อย 3 ช่อง)';
        }
        playErrorTone();
        return;
    }

    function getCoordsCustom(i) {
        return { x: i % archSize, y: Math.floor(i / archSize) };
    }

    function checkAllowedCustom(fromIdx, toIdx, curPath) {
        const c1 = getCoordsCustom(fromIdx);
        const c2 = getCoordsCustom(toIdx);
        const dx = c2.x - c1.x;
        const dy = c2.y - c1.y;

        if (archOneWay[fromIdx]) {
            const dir = archOneWay[fromIdx];
            let ok = false;
            if (dir === 'up' && dx === 0 && dy === -1) ok = true;
            if (dir === 'down' && dx === 0 && dy === 1) ok = true;
            if (dir === 'left' && dx === -1 && dy === 0) ok = true;
            if (dir === 'right' && dx === 1 && dy === 0) ok = true;
            if (!ok) return false;
        }

        if (archWaypoints[toIdx] !== undefined) {
            const req = archWaypoints[toIdx];
            for (const [wpCell, wpOrder] of Object.entries(archWaypoints)) {
                if (wpOrder < req && !curPath.includes(parseInt(wpCell))) {
                    return false;
                }
            }
        }
        return true;
    }

    let iters = 0;
    function solveCustom(p) {
        if (p.length === targetLength) return p;
        iters++;
        if (iters > 80000) return null;

        const last = p[p.length - 1];
        const c = getCoordsCustom(last);
        const deltas = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
        const nbrs = [];

        for (const d of deltas) {
            const nx = c.x + d.x;
            const ny = c.y + d.y;
            if (nx >= 0 && nx < archSize && ny >= 0 && ny < archSize) {
                const nIdx = ny * archSize + nx;
                if (!archObstacles.includes(nIdx) && !p.includes(nIdx)) {
                    if (checkAllowedCustom(last, nIdx, p)) {
                        nbrs.push(nIdx);
                    }
                }
            }
        }

        nbrs.sort((a, b) => {
            const ca = getCoordsCustom(a);
            const cb = getCoordsCustom(b);
            let degA = 0, degB = 0;
            for (const d of deltas) {
                const nxa = ca.x + d.x, nya = ca.y + d.y;
                if (nxa >= 0 && nxa < archSize && nya >= 0 && nya < archSize) {
                    const idxA = nya * archSize + nxa;
                    if (!archObstacles.includes(idxA) && !p.includes(idxA)) degA++;
                }
                const nxb = cb.x + d.x, nyb = cb.y + d.y;
                if (nxb >= 0 && nxb < archSize && nyb >= 0 && nyb < archSize) {
                    const idxB = nyb * archSize + nxb;
                    if (!archObstacles.includes(idxB) && !p.includes(idxB)) degB++;
                }
            }
            return degA - degB;
        });

        for (const n of nbrs) {
            const sol = solveCustom([...p, n]);
            if (sol) return sol;
        }
        return null;
    }

    const solution = solveCustom([archStartCell]);
    if (solution) {
        archSolvable = true;
        if (playCustomBtn) playCustomBtn.disabled = false;
        if (shareCustomBtn) shareCustomBtn.disabled = false;
        if (architectStatus) {
            architectStatus.className = 'architect-status solvable';
            architectStatus.innerHTML = `<strong>✓ ตรวจสอบผ่าน (Solvable):</strong> พบวิถีแฮมิลตันสมบูรณ์ (${solution.length}/${targetLength} ช่อง) — พร้อมเล่นและแชร์ให้เพื่อน!`;
        }
        playStepTone(12, 12);
    } else {
        archSolvable = false;
        if (playCustomBtn) playCustomBtn.disabled = true;
        if (shareCustomBtn) shareCustomBtn.disabled = true;
        if (architectStatus) {
            architectStatus.className = 'architect-status unsolvable';
            architectStatus.innerHTML = `<strong>✕ ด่านนี้ไม่มีคำตอบ (Unsolvable):</strong> ไม่พบวิถีแฮมิลตันที่สามารถเดินครบทุกช่องได้ ลองตรวจสอบจุดมุมที่โดนตัดขาด หรือปรับทิศทางลูกศร`;
        }
        playErrorTone();
    }
}

function playCustomLevel() {
    if (!archSolvable) return;
    currentLevelConfig = {
        id: 'custom',
        isCustom: true,
        size: archSize,
        title: 'Custom Graph Puzzle',
        titleTh: 'ด่านสร้างเอง (Custom)',
        concept: 'Graph Architect',
        conceptTh: 'ด่านสร้างโดยผู้เรียน',
        startCell: archStartCell,
        obstacles: [...archObstacles],
        oneWay: {...archOneWay},
        waypoints: {...archWaypoints}
    };
    if (architectModal) architectModal.classList.add('hidden');
    initLevel();
}

function shareCustomLevel() {
    if (!archSolvable) return;
    const payload = {
        s: archSize,
        st: archStartCell,
        o: archObstacles,
        w: archOneWay,
        p: archWaypoints
    };
    const encoded = encodeURIComponent(btoa(JSON.stringify(payload)));
    const url = `${window.location.origin}${window.location.pathname}#custom=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
        showToast("คัดลอกลิงก์ด่านเรียบร้อย! ส่งให้เพื่อนเปิดเล่นได้ทันที");
    }).catch(() => {
        showToast("URL: " + url);
    });
}

function loadCustomLevelFromHash() {
    if (window.location.hash.startsWith('#custom=')) {
        try {
            const raw = decodeURIComponent(window.location.hash.replace('#custom=', ''));
            const payload = JSON.parse(atob(raw));
            if (payload && payload.s && payload.st !== undefined) {
                currentLevelConfig = {
                    id: 'custom',
                    isCustom: true,
                    size: payload.s,
                    title: 'Classmate Custom Puzzle',
                    titleTh: 'ด่านท้าทายจากเพื่อน',
                    concept: 'Peer Problem Posing',
                    conceptTh: 'ด่านสร้างโดยเพื่อน',
                    startCell: payload.st,
                    obstacles: payload.o || [],
                    oneWay: payload.w || {},
                    waypoints: payload.p || {}
                };
                return true;
            }
        } catch(e) {
            console.warn('Failed to parse custom level hash', e);
        }
    }
    return false;
}

// ==========================================
// Euler's Bridges Interactive Lab (1736)
// ==========================================
let currentEulerMode = 'konigsberg';
let hasEighthBridge = false;
let isEulerSimulating = false;
let eulerSimTimer = null;

const KONIGSBERG_NODES = {
    A: { x: 220, y: 50, label: 'A (ฝั่งเหนือ)' },
    B: { x: 220, y: 210, label: 'B (ฝั่งใต้)' },
    C: { x: 100, y: 130, label: 'C (เกาะกลาง)' },
    D: { x: 340, y: 130, label: 'D (ฝั่งตะวันออก)' }
};

const KONIGSBERG_BRIDGES = [
    { id: 'b0', u: 'A', v: 'C', d: 'M 220 50 Q 140 45 100 130' },
    { id: 'b1', u: 'A', v: 'C', d: 'M 220 50 Q 180 110 100 130' },
    { id: 'b2', u: 'B', v: 'C', d: 'M 220 210 Q 180 150 100 130' },
    { id: 'b3', u: 'B', v: 'C', d: 'M 220 210 Q 140 215 100 130' },
    { id: 'b4', u: 'A', v: 'D', d: 'M 220 50 L 340 130' },
    { id: 'b5', u: 'B', v: 'D', d: 'M 220 210 L 340 130' },
    { id: 'b6', u: 'C', v: 'D', d: 'M 100 130 L 340 130' },
    { id: 'b7', u: 'A', v: 'B', d: 'M 220 50 Q 285 130 220 210', isEighth: true }
];

const HOUSE_NODES = {
    V0: { x: 220, y: 35, label: 'V0 (หลังคา)' },
    V1: { x: 140, y: 105, label: 'V1 (บนซ้าย)' },
    V2: { x: 300, y: 105, label: 'V2 (บนขวา)' },
    V3: { x: 140, y: 220, label: 'V3 (ล่างซ้าย)' },
    V4: { x: 300, y: 220, label: 'V4 (ล่างขวา)' }
};

const HOUSE_EDGES = [
    { id: 'h0', u: 'V0', v: 'V1', d: 'M 220 35 L 140 105' },
    { id: 'h1', u: 'V0', v: 'V2', d: 'M 220 35 L 300 105' },
    { id: 'h2', u: 'V1', v: 'V2', d: 'M 140 105 L 300 105' },
    { id: 'h3', u: 'V1', v: 'V3', d: 'M 140 105 L 140 220' },
    { id: 'h4', u: 'V2', v: 'V4', d: 'M 300 105 L 300 220' },
    { id: 'h5', u: 'V3', v: 'V4', d: 'M 140 220 L 300 220' },
    { id: 'h6', u: 'V1', v: 'V4', d: 'M 140 105 L 300 220' },
    { id: 'h7', u: 'V2', v: 'V3', d: 'M 300 105 L 140 220' }
];

function renderEulerLab() {
    if (!eulerSvg || !eulerStatusBox) return;
    if (eulerSimTimer) clearInterval(eulerSimTimer);
    isEulerSimulating = false;
    eulerSvg.innerHTML = '';

    const isKonigsberg = (currentEulerMode === 'konigsberg');
    const nodes = isKonigsberg ? KONIGSBERG_NODES : HOUSE_NODES;
    let edges = isKonigsberg ? KONIGSBERG_BRIDGES : HOUSE_EDGES;
    if (isKonigsberg && !hasEighthBridge) {
        edges = edges.filter(e => !e.isEighth);
    }

    // 1. Calculate vertex degrees
    const degrees = {};
    for (const key of Object.keys(nodes)) degrees[key] = 0;
    edges.forEach(e => {
        degrees[e.u]++;
        degrees[e.v]++;
    });

    // 2. Render Edges (Bridges)
    edges.forEach(edge => {
        const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathEl.setAttribute('d', edge.d);
        pathEl.setAttribute('id', `euler-edge-${edge.id}`);
        pathEl.setAttribute('class', `euler-edge ${edge.isEighth ? 'bridge8' : ''}`);
        eulerSvg.appendChild(pathEl);
    });

    // 3. Render Nodes (Landmasses)
    Object.keys(nodes).forEach(key => {
        const n = nodes[key];
        const deg = degrees[key];
        const isOdd = deg % 2 !== 0;

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute('id', `euler-node-${key}`);
        g.setAttribute('class', `euler-node ${isOdd ? 'odd' : 'even'}`);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('cx', n.x);
        circle.setAttribute('cy', n.y);
        circle.setAttribute('r', 20);
        circle.setAttribute('class', 'euler-node-circle');
        g.appendChild(circle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', n.x);
        text.setAttribute('y', n.y - 4);
        text.setAttribute('class', 'euler-node-label');
        text.textContent = key;
        g.appendChild(text);

        const degBadge = document.createElementNS("http://www.w3.org/2000/svg", "text");
        degBadge.setAttribute('x', n.x);
        degBadge.setAttribute('y', n.y + 10);
        degBadge.setAttribute('class', 'euler-degree-text');
        degBadge.textContent = `deg: ${deg} (${isOdd ? 'คี่' : 'คู่'})`;
        g.appendChild(degBadge);

        eulerSvg.appendChild(g);
    });

    // 4. Update Status Banner & Action Buttons
    if (isKonigsberg) {
        if (eulerToggleBridgeBtn) {
            eulerToggleBridgeBtn.classList.remove('hidden');
            eulerToggleBridgeBtn.textContent = hasEighthBridge ? "➖ เอาสะพานที่ 8 ออก" : "➕ เพิ่มสะพานที่ 8 (Make Solvable)";
        }
        if (eulerSimulateBtn) {
            eulerSimulateBtn.disabled = !hasEighthBridge;
        }

        if (!hasEighthBridge) {
            eulerStatusBox.className = "euler-status-box impossible";
            eulerStatusBox.innerHTML = `
                <div style="font-weight:700; color:#ff3366; margin-bottom:4px;">🔴 เป็นไปไม่ได้ (Mathematically Impossible): มีจุดยอดดีกรีคี่ 4 จุด</div>
                <div>ทฤษฎีบทของออยเลอร์ (1736): กราฟจะมีวิถีออยเลอร์ได้ก็ต่อเมื่อมีจุดยอดดีกรีคี่ <strong>ไม่เกิน 2 จุด</strong> (0 หรือ 2)<br>
                สะพานโคนิกส์แบร์กเดิมมีจุดยอดดีกรีคี่ทั้ง 4 จุด (A:3, B:3, C:5, D:3) จึงไม่มีผู้ใดสามารถเดินข้ามสะพานครบทุกสะพานโดยไม่ซ้ำได้เลย!<br>
                👉 <em>แตะปุ่ม "เพิ่มสะพานที่ 8" เพื่อปรับเปลี่ยน Degree Parity ให้กราฟแก้ได้!</em></div>
            `;
        } else {
            eulerStatusBox.className = "euler-status-box solvable";
            eulerStatusBox.innerHTML = `
                <div style="font-weight:700; color:#00ffcc; margin-bottom:4px;">🟢 มีวิถีออยเลอร์แล้ว (Solvable Eulerian Trail)!</div>
                <div>เมื่อสร้างสะพานที่ 8 (เส้นประสีชมพู เชื่อม A กับ B) จุด A และ B มีดีกรีเพิ่มเป็น 4 (คู่)<br>
                ทำให้เหลือจุดยอดดีกรีคี่เพียง <strong>2 จุดพอดี</strong> (จุด C:5 และจุด D:3)!<br>
                ✨ ตามทฤษฎีบท: สามารถลากเส้นผ่านครบทั้ง 8 สะพานได้ โดยเริ่มต้นที่ C และสิ้นสุดที่ D (หรือเริ่มที่ D จบที่ C)</div>
            `;
        }
    } else {
        // House of Euler
        if (eulerToggleBridgeBtn) eulerToggleBridgeBtn.classList.add('hidden');
        if (eulerSimulateBtn) eulerSimulateBtn.disabled = false;

        eulerStatusBox.className = "euler-status-box solvable";
        eulerStatusBox.innerHTML = `
            <div style="font-weight:700; color:#00ffcc; margin-bottom:4px;">🟢 บ้านของออยเลอร์ (House of Euler Envelope Puzzle)</div>
            <div>มีจุดยอดดีกรีคี่ <strong>2 จุดพอดี</strong> คือ V3 (ล่างซ้าย deg:3) และ V4 (ล่างขวา deg:3) ส่วน V0, V1, V2 มีดีกรีคู่<br>
            ✏️ ทฤษฎีบทการันตี: สามารถวาดรูปบ้านนี้แบบ "ลากเส้นรวดเดียวไม่ยกมือและไม่ซ้ำเส้น" ได้เสมอ โดยต้องเริ่มที่จุดคี่ (V3 หรือ V4) และจบที่จุดคี่อีกจุด!</div>
        `;
    }
}

function simulateEulerianTrail() {
    if (isEulerSimulating) return;
    isEulerSimulating = true;
    getAudioContext();

    const isKonigsberg = (currentEulerMode === 'konigsberg');
    const trail = isKonigsberg
        ? ['b0', 'b4', 'b5', 'b3', 'b1', 'b7', 'b2', 'b6']
        : ['h3', 'h0', 'h1', 'h2', 'h6', 'h4', 'h7', 'h5'];

    document.querySelectorAll('.euler-edge').forEach(e => e.classList.remove('active'));

    let step = 0;
    clearInterval(eulerSimTimer);
    eulerSimTimer = setInterval(() => {
        if (step < trail.length) {
            const edgeId = `euler-edge-${trail[step]}`;
            const edgeEl = document.getElementById(edgeId);
            if (edgeEl) edgeEl.classList.add('active');
            playStepTone(step + 1, trail.length);
            triggerHaptic('snap');
            step++;
        } else {
            clearInterval(eulerSimTimer);
            isEulerSimulating = false;
            playWinChime();
            triggerHaptic('win');
        }
    }, 450);
}

// Directional and Waypoint Constraint Checker
function isStepAllowed(fromIdx, toIdx, currentPath) {
    if (fromIdx === null || fromIdx === undefined) return { allowed: true };
    const c1 = getCoords(fromIdx);
    const c2 = getCoords(toIdx);
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;

    // 1. One-Way outgoing constraint on fromIdx
    if (currentLevelConfig && currentLevelConfig.oneWay && currentLevelConfig.oneWay[fromIdx]) {
        const dir = currentLevelConfig.oneWay[fromIdx];
        let ok = false;
        if (dir === 'up' && dx === 0 && dy === -1) ok = true;
        if (dir === 'down' && dx === 0 && dy === 1) ok = true;
        if (dir === 'left' && dx === -1 && dy === 0) ok = true;
        if (dir === 'right' && dx === 1 && dy === 0) ok = true;
        if (!ok) {
            const dirNames = { up: 'ขึ้นบน ↑', down: 'ลงล่าง ↓', left: 'ไปทางซ้าย ←', right: 'ไปทางขวา →' };
            return {
                allowed: false,
                reason: `ช่องนี้เป็นทางเดียว (One-Way): ต้องเดิน${dirNames[dir]}เท่านั้น!`
            };
        }
    }

    // 2. Waypoint sequential collection constraint on toIdx
    if (currentLevelConfig && currentLevelConfig.waypoints && currentLevelConfig.waypoints[toIdx] !== undefined) {
        const req = currentLevelConfig.waypoints[toIdx];
        for (const [wpCell, wpOrder] of Object.entries(currentLevelConfig.waypoints)) {
            if (wpOrder < req && !currentPath.includes(parseInt(wpCell))) {
                return {
                    allowed: false,
                    reason: `ต้องเดินผ่านจุดตรวจลำดับที่ ${wpOrder} ก่อนจุดนี้!`
                };
            }
        }
    }

    return { allowed: true };
}

// Timer Logic
let timerInterval;
let startTime;
let elapsedTime = 0;

function startTimer() {
    clearInterval(timerInterval);
    startTime = Date.now();
    elapsedTime = 0;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatSeconds(elapsedTime);
}

function showToast(msg) {
    const toast = document.getElementById("copy-toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = "block";
    clearTimeout(toast.toastTimeout);
    toast.toastTimeout = setTimeout(() => toast.style.display = "none", 3200);
}

function initLevel() {
    if (currentLevelConfig && currentLevelConfig.isCustom) {
        gridSize = currentLevelConfig.size;
        totalCells = gridSize * gridSize;
        startCell = currentLevelConfig.startCell;
        obstacles = [...currentLevelConfig.obstacles];
    } else if (currentLevelIndex < curatedLevels.length) {
        currentLevelConfig = curatedLevels[currentLevelIndex];
        gridSize = currentLevelConfig.size;
        totalCells = gridSize * gridSize;
        startCell = currentLevelConfig.startCell;
        obstacles = [...currentLevelConfig.obstacles];
    } else {
        // Procedural scaling level
        const scale = Math.min(6, 4 + Math.floor((currentLevelIndex - curatedLevels.length) / 2));
        const numObs = Math.min(5, 2 + Math.floor((currentLevelIndex - curatedLevels.length) / 2));
        gridSize = scale;
        totalCells = gridSize * gridSize;
        const generated = generateSolvableLevel(gridSize, numObs);
        startCell = generated.startCell;
        obstacles = generated.obstacles;
        currentLevelConfig = {
            id: currentLevelIndex + 1,
            size: scale,
            title: `Matrix #${currentLevelIndex - curatedLevels.length + 1}`,
            concept: "Infinite Mode",
            conceptTh: "โหมดสุ่มอัตโนมัติ",
            oneWay: {},
            waypoints: {}
        };
    }

    if (replayTimer) clearInterval(replayTimer);
    isReplaying = false;

    path = [];
    isDrawing = false;
    gameWon = false;
    currentPointerPos = null;
    moveCount = 0;
    undoCount = 0;
    updateTelemetryDisplay();
    overlay.classList.add('hidden');
    infoOverlay.classList.add('hidden');
    if (levelModal) levelModal.classList.add('hidden');
    if (architectModal) architectModal.classList.add('hidden');
    if (diagnosticPanel) diagnosticPanel.classList.add('hidden');
    document.querySelectorAll('.culprit-node').forEach(el => el.classList.remove('culprit-node'));
    
    if (levelLabel) levelLabel.textContent = currentLevelConfig.isCustom ? 'Custom' : `Level ${currentLevelIndex + 1}`;
    if (levelTitleDisplay) levelTitleDisplay.textContent = currentLevelConfig.isCustom ? currentLevelConfig.title : `L${currentLevelIndex + 1}: ${currentLevelConfig.title}`;
    if (conceptBadgeDisplay) conceptBadgeDisplay.textContent = currentLevelConfig.concept || currentLevelConfig.conceptTh;
    
    startTimer();
    
    // Setup Grid CSS
    gridContainer.style.setProperty('--grid-size', gridSize);
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
    renderGrid();
    updateCellVisuals();
}

function renderGrid() {
    gridContainer.innerHTML = '';
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "path-svg");
    gridContainer.appendChild(svg);
    
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        
        if (obstacles.includes(i)) {
            cell.classList.add('obstacle');
        } else if (i === startCell) {
            cell.classList.add('start');
        }

        // Check for One-Way constraint
        if (currentLevelConfig.oneWay && currentLevelConfig.oneWay[i]) {
            const dir = currentLevelConfig.oneWay[i];
            cell.classList.add('oneway-tile', `oneway-${dir}`);
            cell.title = `ทางเดียว: บังคับเดิน${dir.toUpperCase()}`;
        }

        // Check for Waypoint constraint
        if (currentLevelConfig.waypoints && currentLevelConfig.waypoints[i] !== undefined) {
            cell.classList.add('waypoint-node');
            cell.setAttribute('data-waypoint', currentLevelConfig.waypoints[i]);
            cell.title = `จุดตรวจลำดับที่ ${currentLevelConfig.waypoints[i]}`;
        }
        
        // Desktop Events
        cell.addEventListener('mousedown', handlePointerDown);
        cell.addEventListener('mouseenter', handlePointerEnter);
        
        gridContainer.appendChild(cell);
    }
}

// Coordinate utilities
function getCoords(index) {
    return { x: index % gridSize, y: Math.floor(index / gridSize) };
}

function areAdjacent(idx1, idx2) {
    const c1 = getCoords(idx1);
    const c2 = getCoords(idx2);
    const dx = Math.abs(c1.x - c2.x);
    const dy = Math.abs(c1.y - c2.y);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}

function getValidCandidates() {
    if (path.length === 0) return [startCell];
    const lastIdx = path[path.length - 1];
    const c = getCoords(lastIdx);
    const deltas = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
    const candidates = [];
    
    for (let d of deltas) {
        const nx = c.x + d.x;
        const ny = c.y + d.y;
        if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
            const idx = ny * gridSize + nx;
            if (!obstacles.includes(idx) && !path.includes(idx)) {
                if (isStepAllowed(lastIdx, idx, path).allowed) {
                    candidates.push(idx);
                }
            }
        }
    }
    return candidates;
}

function stepForward(targetIdx) {
    if (gameWon || path.includes(targetIdx) || obstacles.includes(targetIdx)) return false;
    
    const lastIdx = path.length > 0 ? path[path.length - 1] : null;
    const check = isStepAllowed(lastIdx, targetIdx, path);
    if (!check.allowed) {
        playErrorTone();
        triggerHaptic('error');
        showToast(check.reason);
        const cell = document.querySelector(`.cell[data-index="${targetIdx}"]`);
        if (cell) {
            cell.classList.add('error-flash');
            setTimeout(() => cell.classList.remove('error-flash'), 600);
        }
        return false;
    }

    const targetLength = totalCells - obstacles.length;
    path.push(targetIdx);
    moveCount++;
    updateTelemetryDisplay();
    playStepTone(path.length, targetLength);
    triggerHaptic('snap');
    updateCellVisuals();
    checkWin();
    return true;
}

function undoStep() {
    if (gameWon || path.length <= 1) return false;
    path.pop();
    undoCount++;
    updateTelemetryDisplay();
    playUndoTone(path.length);
    triggerHaptic('undo');
    updateCellVisuals();
    return true;
}

// Graph Theory Topological Analyzer
function analyzeGraphTopology(currentPath) {
    const targetLength = totalCells - obstacles.length;
    const pathToCheck = currentPath.length > 0 ? currentPath : [startCell];
    const tip = pathToCheck[pathToCheck.length - 1];
    const visitedSet = new Set(pathToCheck);
    const unvisited = [];
    
    for (let i = 0; i < totalCells; i++) {
        if (!obstacles.includes(i) && !visitedSet.has(i)) {
            unvisited.push(i);
        }
    }

    if (unvisited.length === 0) {
        return {
            solvable: true,
            status: 'WIN',
            nextStep: null,
            degrees: {},
            culpritNodes: [],
            components: []
        };
    }

    // 1. Calculate vertex degrees in induced subgraph of (unvisited + tip)
    const degrees = {};
    const unvisitedSet = new Set(unvisited);
    const tipNeighbors = [];
    const tipCoords = getCoords(tip);
    const deltas = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];

    for (let d of deltas) {
        const nx = tipCoords.x + d.x;
        const ny = tipCoords.y + d.y;
        if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
            const idx = ny * gridSize + nx;
            if (unvisitedSet.has(idx)) {
                tipNeighbors.push(idx);
            }
        }
    }

    for (const v of unvisited) {
        const c = getCoords(v);
        let deg = 0;
        for (let d of deltas) {
            const nx = c.x + d.x;
            const ny = c.y + d.y;
            if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                const idx = ny * gridSize + nx;
                if (unvisitedSet.has(idx) || idx === tip) {
                    deg++;
                }
            }
        }
        degrees[v] = deg;
    }

    // 2. Dead-end and Critical Vertices
    const zeroDegreeNodes = unvisited.filter(v => degrees[v] === 0);
    const oneDegreeNodes = unvisited.filter(v => degrees[v] === 1);

    // 3. Connected Components on Unvisited Vertices (BFS)
    const components = [];
    const visitedBFS = new Set();

    for (const startNode of unvisited) {
        if (!visitedBFS.has(startNode)) {
            const comp = [];
            const queue = [startNode];
            visitedBFS.add(startNode);
            while (queue.length > 0) {
                const curr = queue.shift();
                comp.push(curr);
                const c = getCoords(curr);
                for (let d of deltas) {
                    const nx = c.x + d.x;
                    const ny = c.y + d.y;
                    if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                        const neighbor = ny * gridSize + nx;
                        if (unvisitedSet.has(neighbor) && !visitedBFS.has(neighbor)) {
                            visitedBFS.add(neighbor);
                            queue.push(neighbor);
                        }
                    }
                }
            }
            components.push(comp);
        }
    }

    // 4. Bipartite Checkerboard Parity Invariant
    let blackUnvisited = 0;
    let whiteUnvisited = 0;
    for (const v of unvisited) {
        const c = getCoords(v);
        if ((c.x + c.y) % 2 === 0) blackUnvisited++;
        else whiteUnvisited++;
    }
    const parityFeasible = Math.abs(blackUnvisited - whiteUnvisited) <= 1;

    // 5. Brute-Force DFS Continuation Check
    searchIterations = 0;
    const sol = findSolution(pathToCheck);
    const nextStep = (sol && sol.length > pathToCheck.length) ? sol[pathToCheck.length] : null;

    // 6. Diagnose Failure Root Cause
    let failureReason = null;
    let culpritNodes = [];

    if (!sol) {
        if (tipNeighbors.length === 0) {
            failureReason = 'TIP_TRAPPED';
            culpritNodes = [tip];
        } else if (zeroDegreeNodes.length > 0) {
            failureReason = 'ISOLATED_CELL';
            culpritNodes = zeroDegreeNodes;
        } else if (components.length > 1) {
            failureReason = 'DISCONNECTED_ISLANDS';
            culpritNodes = components.slice(1).flat();
        } else if (oneDegreeNodes.length >= 2) {
            failureReason = 'MULTIPLE_DEAD_ENDS';
            culpritNodes = oneDegreeNodes;
        } else if (!parityFeasible) {
            failureReason = 'PARITY_IMBALANCE';
            culpritNodes = [tip];
        } else {
            failureReason = 'TOPOLOGICAL_DEADLOCK';
            culpritNodes = [tip];
        }
    }

    return {
        solvable: !!sol,
        nextStep,
        degrees,
        components,
        zeroDegreeNodes,
        oneDegreeNodes,
        tipNeighbors,
        failureReason,
        culpritNodes
    };
}

function renderGraphModeDegrees(analysis) {
    const cells = document.querySelectorAll('.cell');
    
    cells.forEach((cell, idx) => {
        const existingBadge = cell.querySelector('.degree-badge');
        if (existingBadge) existingBadge.remove();
        cell.classList.remove('critical-degree', 'trapped-degree');

        if (!isGraphMode) return;

        if (!path.includes(idx) && !obstacles.includes(idx) && analysis && analysis.degrees[idx] !== undefined) {
            const deg = analysis.degrees[idx];
            const badge = document.createElement('span');
            badge.className = 'degree-badge';
            badge.textContent = `${deg}`;
            cell.appendChild(badge);

            if (deg === 1) {
                cell.classList.add('critical-degree');
            } else if (deg === 0) {
                cell.classList.add('trapped-degree');
            }
        }
    });
}

function updateCellVisuals() {
    const targetLength = totalCells - obstacles.length;
    const cells = document.querySelectorAll('.cell');
    
    // Update Dynamic Hamiltonian Progress HUD
    if (nodeCounter) {
        nodeCounter.textContent = `Visited: ${path.length} / ${targetLength}`;
    }
    const pct = targetLength > 0 ? Math.round((path.length / targetLength) * 100) : 0;
    if (progressPercent) {
        progressPercent.textContent = `${pct}%`;
    }
    if (pathProgressFill) {
        pathProgressFill.style.width = `${pct}%`;
    }
    if (undoBtn) {
        undoBtn.disabled = (path.length <= 1 || gameWon);
    }

    const validCandidates = (isDrawing && !gameWon) ? getValidCandidates() : [];

    cells.forEach((cell, idx) => {
        const oldStep = cell.querySelector('.step-order-badge');
        if (oldStep) oldStep.remove();

        cell.classList.remove('path', 'target-candidate', 'snap-active');
        const pathStep = path.indexOf(idx);
        if (pathStep !== -1) {
            cell.classList.add('path');
            if (gameWon) {
                const stepBadge = document.createElement('span');
                stepBadge.className = 'step-order-badge';
                stepBadge.textContent = `${pathStep + 1}`;
                cell.appendChild(stepBadge);
            }
        } else if (validCandidates.includes(idx)) {
            cell.classList.add('target-candidate');
        }

        if (cell.classList.contains('waypoint-node')) {
            cell.classList.toggle('waypoint-collected', path.includes(idx));
        }
    });

    const analysis = analyzeGraphTopology(path);
    renderGraphModeDegrees(analysis);

    drawPathLines();
}

function drawPathLines() {
    const svg = document.getElementById('path-svg');
    if (!svg) return;
    
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    
    if (path.length === 0) return;
    
    const gridRect = svg.getBoundingClientRect();
    
    const points = path.map(idx => {
        const cell = document.querySelector(`.cell[data-index="${idx}"]`);
        if (!cell) return null;
        const rect = cell.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - gridRect.left;
        const cy = rect.top + rect.height / 2 - gridRect.top;
        return {x: cx, y: cy};
    }).filter(p => p !== null);
    
    if (points.length >= 2) {
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        polyline.setAttribute("points", points.map(p => `${p.x},${p.y}`).join(" "));
        polyline.setAttribute("class", "path-line");
        svg.appendChild(polyline);
    }
    
    if (isDrawing && currentPointerPos && points.length > 0 && !gameWon) {
        const lastPoint = points[points.length - 1];
        const pointerX = currentPointerPos.x - gridRect.left;
        const pointerY = currentPointerPos.y - gridRect.top;
        
        if (pointerX >= -60 && pointerX <= gridRect.width + 60 && pointerY >= -60 && pointerY <= gridRect.height + 60) {
            const activeLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            activeLine.setAttribute("x1", lastPoint.x);
            activeLine.setAttribute("y1", lastPoint.y);
            activeLine.setAttribute("x2", pointerX);
            activeLine.setAttribute("y2", pointerY);
            activeLine.setAttribute("class", "path-line active-line");
            svg.appendChild(activeLine);
        }
    }
}

function checkWin() {
    const targetLength = totalCells - obstacles.length;
    if (path.length === targetLength) {
        gameWon = true;
        isDrawing = false;
        currentPointerPos = null;
        stopTimer();
        playWinChime();
        triggerHaptic('win');
        fireConfetti();
        if (diagnosticPanel) diagnosticPanel.classList.add('hidden');
        document.querySelectorAll('.culprit-node').forEach(el => el.classList.remove('culprit-node'));
        updateCellVisuals();
        
        // Save progress to LocalStorage
        saveLevelClear(currentLevelIndex + 1, elapsedTime);

        const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
        const seconds = (elapsedTime % 60).toString().padStart(2, '0');
        if (timeTakenText) {
            timeTakenText.textContent = `⏱️ เวลา: ${minutes}:${seconds} • เส้นทาง: ${path.length} ช่อง`;
        }

        // Render Socratic Computational Thinking Reflection
        renderReflectionCard(currentLevelIndex + 1);
        
        setTimeout(() => {
            overlay.classList.remove('hidden');
            msgText.textContent = currentLevelIndex < curatedLevels.length 
                ? `Level ${currentLevelIndex + 1} Cleared!` 
                : "Infinite Matrix Cleared!";
            nextLevelBtn.onclick = () => {
                currentLevelIndex++;
                initLevel();
            };
        }, 850);
    }
}

// DFS Solver for Hints
let searchIterations = 0;

function findSolution(currentPath) {
    const targetLength = totalCells - obstacles.length;
    if (currentPath.length === targetLength) return currentPath;

    searchIterations++;
    if (searchIterations > 100000) return null; // Safety guard

    const lastCell = currentPath[currentPath.length - 1];
    const neighbors = [];
    const c = getCoords(lastCell);
    const deltas = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
    
    for (let d of deltas) {
        const nx = c.x + d.x;
        const ny = c.y + d.y;
        if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
            const idx = ny * gridSize + nx;
            if (!obstacles.includes(idx) && !currentPath.includes(idx)) {
                if (isStepAllowed(lastCell, idx, currentPath).allowed) {
                    neighbors.push(idx);
                }
            }
        }
    }

    // Heuristic: prioritize neighbors with fewer available unvisited neighbors (Warnsdorff's heuristic for fast solve)
    neighbors.sort((a, b) => {
        const ca = getCoords(a);
        const cb = getCoords(b);
        let degA = 0, degB = 0;
        for (let d of deltas) {
            const na = (ca.y + d.y) * gridSize + (ca.x + d.x);
            if (ca.x + d.x >= 0 && ca.x + d.x < gridSize && ca.y + d.y >= 0 && ca.y + d.y < gridSize) {
                if (!obstacles.includes(na) && !currentPath.includes(na)) degA++;
            }
            const nb = (cb.y + d.y) * gridSize + (cb.x + d.x);
            if (cb.x + d.x >= 0 && cb.x + d.x < gridSize && cb.y + d.y >= 0 && cb.y + d.y < gridSize) {
                if (!obstacles.includes(nb) && !currentPath.includes(nb)) degB++;
            }
        }
        return degA - degB;
    });

    for (let n of neighbors) {
        const sol = findSolution([...currentPath, n]);
        if (sol) return sol;
    }
    
    return null;
}

function showHint() {
    if (gameWon) return;
    getAudioContext();
    
    document.querySelectorAll('.hint-flash').forEach(el => el.classList.remove('hint-flash'));
    document.querySelectorAll('.error-flash').forEach(el => el.classList.remove('error-flash'));
    document.querySelectorAll('.culprit-node').forEach(el => el.classList.remove('culprit-node'));

    const pathToCheck = path.length > 0 ? path : [startCell];
    const analysis = analyzeGraphTopology(pathToCheck);

    if (diagnosticPanel) diagnosticPanel.classList.remove('hidden');

    if (analysis.solvable && analysis.nextStep !== null) {
        const nextIdx = analysis.nextStep;
        const nextCell = document.querySelector(`.cell[data-index="${nextIdx}"]`);
        if (nextCell) {
            nextCell.classList.add('hint-flash');
            playStepTone(pathToCheck.length + 1, totalCells - obstacles.length);
            
            setTimeout(() => {
                if (nextCell.classList.contains('hint-flash')) {
                    nextCell.classList.remove('hint-flash');
                }
            }, 3500);
        }

        const nextCoords = getCoords(nextIdx);
        const deg = analysis.degrees[nextIdx] !== undefined ? analysis.degrees[nextIdx] : 2;
        if (diagnosticTitle) diagnosticTitle.textContent = "Socratic Graph Insight";
        if (diagnosticBody) {
            diagnosticBody.innerHTML = `
                <div class="diag-status-row">
                    <span class="diag-badge solvable">✓ Solvable Path Exists</span>
                    <span style="font-size:0.75rem; color:#888;">Step ${pathToCheck.length + 1} of ${totalCells - obstacles.length}</span>
                </div>
                <div>
                    วิถีแฮมิลตันยังสามารถเดินต่อไปได้สำเร็จ!
                </div>
                <div class="socratic-tip">
                    <strong>💡 การวิเคราะห์ระดับขั้น (Degree Heuristic):</strong>
                    ช่องกระพริบสีทอง <strong>(${nextCoords.x + 1}, ${nextCoords.y + 1})</strong> มีดีกรีเชื่อมต่อ ${deg} ทาง — ตามหลัก Warnsdorff's Rule ควรเลือกเดินผ่านช่องที่มีทางออกจำกัดก่อน เพื่อป้องกันทางตันในอนาคต!
                </div>
            `;
        }
    } else {
        playErrorTone();

        if (path.length > 0) {
            path.forEach(idx => {
                const cell = document.querySelector(`.cell[data-index="${idx}"]`);
                if (cell) {
                    cell.classList.add('error-flash');
                    setTimeout(() => cell.classList.remove('error-flash'), 1200);
                }
            });
        }

        if (analysis.culpritNodes && analysis.culpritNodes.length > 0) {
            analysis.culpritNodes.forEach(idx => {
                const cell = document.querySelector(`.cell[data-index="${idx}"]`);
                if (cell) cell.classList.add('culprit-node');
            });
        }

        let diagnosisExplanation = "";
        let socraticPrompt = "";

        switch (analysis.failureReason) {
            case 'DISCONNECTED_ISLANDS':
                diagnosisExplanation = `กราฟส่วนที่เหลือถูกตัดแบ่งออกเป็น <strong>${analysis.components.length} ส่วนย่อยอิสระ (Disconnected Components)</strong>! เกิดเซลล์เกาะโดดเดี่ยวที่ไม่สามารถเชื่อมถึงกันได้`;
                socraticPrompt = `<strong>🧩 ปัญหาคอขวด (Cut Vertex):</strong> วิถีแฮมิลตันเป็นเส้นทางต่อเนื่องเส้นเดียว หากเส้นที่คุณลากไปกั้นทางจนตารางแยกเป็นสองฝั่ง จะไม่มีทางเดินครบทุกช่องได้ — <strong>กด Undo (Z) ย้อนกลับไปเปิดทางเชื่อม</strong>`;
                break;
            case 'ISOLATED_CELL':
                diagnosisExplanation = `พบเซลล์ที่มี <strong>ระดับขั้นเป็น 0 (Degree = 0)</strong>! ช่องนี้ไม่มีทางเชื่อมต่อเหลืออยู่เลย จึงเป็นไปไม่ได้ที่จะเดินผ่าน`;
                socraticPrompt = `<strong>🔎 Dead-end Lookahead:</strong> สังเกตช่องที่มีกรอบสีแดงกระพริบ ช่องนั้นถูกล้อมรอบจนไม่เหลือทางเข้า — <strong>กด Undo (Z) เพื่อคืนทางเข้าให้ช่องนี้</strong>`;
                break;
            case 'MULTIPLE_DEAD_ENDS':
                diagnosisExplanation = `พบช่องที่มีทางเข้า-ออกเหลือเพียง 1 ทาง <strong>(Degree = 1) จำนวน ${analysis.oneDegreeNodes.length} ช่อง</strong>!`;
                socraticPrompt = `<strong>📐 ทฤษฎีวิถีแฮมิลตัน:</strong> เส้นทางสามารถมี "จุดสิ้นสุด" ได้เพียงจุดเดียวเท่านั้น หากมีช่อง Degree ≤ 1 พร้อมกันมากกว่า 1 ช่อง กราฟจะไม่สามารถแก้ได้`;
                break;
            case 'PARITY_IMBALANCE':
                diagnosisExplanation = `เกิดความไม่สมดุลของ <strong>Bipartite Checkerboard Parity</strong> ระหว่างช่องสีดำและสีขาวที่เหลืออยู่`;
                socraticPrompt = `<strong>♟️ กราฟ 2 สี (Bipartite Invariant):</strong> ทุกก้าวเดินจะต้องสลับสีเสมอ (เหมือนตารางหมากรุก) หากจำนวนช่องสลับสีไม่สัมพันธ์กับตำแหน่งปัจจุบัน จะไม่มีวิถีแฮมิลตันเกิดขึ้นได้`;
                break;
            default:
                diagnosisExplanation = `หัวเส้นทางปัจจุบันติดทางตัน ไม่สามารถขยายเส้นทางเพื่อครอบคลุมทุกช่องได้`;
                socraticPrompt = `<strong>🔄 Backtracking Algorithm:</strong> เมื่อพบทางตัน อัลกอริทึมจะย้อนรอยกลับ (Backtrack) — <strong>กด Undo (Z) หรือ Backspace เพื่อลองเส้นทางใหม่</strong>`;
                break;
        }

        if (diagnosticTitle) diagnosticTitle.textContent = "Topological Dead-End Diagnosis";
        if (diagnosticBody) {
            diagnosticBody.innerHTML = `
                <div class="diag-status-row">
                    <span class="diag-badge deadend">✕ Dead End Detected</span>
                    <span style="font-size:0.75rem; color:#ff8888;">ทางตันทางทอพอโลยี</span>
                </div>
                <div>
                    ${diagnosisExplanation}
                </div>
                <div class="socratic-tip">
                    ${socraticPrompt}
                </div>
            `;
        }
    }

    renderGraphModeDegrees(analysis);
}

// Magnetic Snapping Engine: Evaluates pointer proximity against candidate nodes
function checkMagneticSnap(clientX, clientY) {
    if (!isDrawing || gameWon) return;
    
    const candidates = getValidCandidates();
    const backtrackIdx = (path.length > 1) ? path[path.length - 2] : null;
    
    let bestCandidate = null;
    let shortestDist = Infinity;
    let isBacktrack = false;

    // Forward Candidates
    for (const candIdx of candidates) {
        const cell = document.querySelector(`.cell[data-index="${candIdx}"]`);
        if (cell) {
            const rect = cell.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(clientX - cx, clientY - cy);
            const snapThreshold = rect.width * 0.58;
            
            if (dist < snapThreshold && dist < shortestDist) {
                shortestDist = dist;
                bestCandidate = candIdx;
                isBacktrack = false;
            }
        }
    }

    // Backtrack Candidate
    if (backtrackIdx !== null) {
        const cell = document.querySelector(`.cell[data-index="${backtrackIdx}"]`);
        if (cell) {
            const rect = cell.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(clientX - cx, clientY - cy);
            const snapThreshold = rect.width * 0.58;
            
            if (dist < snapThreshold && dist < shortestDist) {
                shortestDist = dist;
                bestCandidate = backtrackIdx;
                isBacktrack = true;
            }
        }
    }

    if (bestCandidate !== null) {
        if (isBacktrack) {
            undoStep();
        } else {
            stepForward(bestCandidate);
        }
    }
}

// Interaction Handlers
function handlePointerDown(e) {
    if (gameWon) return;
    getAudioContext();
    
    const targetIdx = parseInt(e.target.dataset.index);
    if (isNaN(targetIdx) || obstacles.includes(targetIdx)) return;

    if (path.length === 0 && targetIdx === startCell) {
        isDrawing = true;
        stepForward(targetIdx);
    } else if (path.length > 0 && targetIdx === path[path.length - 1]) {
        isDrawing = true; // Resume dragging from path tip
        updateCellVisuals();
    } else if (path.length > 0 && targetIdx === startCell) {
        // Reset path back to start if clicking start directly
        path = [];
        isDrawing = true;
        stepForward(startCell);
    }
}

function handlePointerEnter(e) {
    if (!isDrawing || gameWon) return;
    
    const targetIdx = parseInt(e.target.dataset.index);
    if (isNaN(targetIdx) || obstacles.includes(targetIdx)) return;

    const lastIdx = path[path.length - 1];
    if (areAdjacent(lastIdx, targetIdx)) {
        if (!path.includes(targetIdx)) {
            stepForward(targetIdx);
        } else if (path.length > 1 && targetIdx === path[path.length - 2]) {
            undoStep();
        }
    }
}

// Global Up / Release Events
document.addEventListener('mouseup', () => {
    isDrawing = false;
    currentPointerPos = null;
    updateCellVisuals();
});

document.addEventListener('touchend', () => {
    isDrawing = false;
    currentPointerPos = null;
    updateCellVisuals();
});

document.addEventListener('mousemove', (e) => {
    if (isDrawing && !gameWon) {
        currentPointerPos = { x: e.clientX, y: e.clientY };
        checkMagneticSnap(e.clientX, e.clientY);
        drawPathLines();
    }
});

// Mobile Touch Support with Magnetic Snap
gridContainer.addEventListener('touchmove', (e) => {
    if (!isDrawing || gameWon) return;
    e.preventDefault(); // Lock viewport scrolling while tracing
    
    const touch = e.touches[0];
    currentPointerPos = { x: touch.clientX, y: touch.clientY };
    checkMagneticSnap(touch.clientX, touch.clientY);
    drawPathLines();
}, { passive: false });

gridContainer.addEventListener('touchstart', (e) => {
    if (gameWon) return;
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement && targetElement.classList.contains('cell')) {
        handlePointerDown({ target: targetElement });
    }
});

// Level Selection Modal Renderer
function renderLevelModal() {
    if (!levelGridList) return;
    levelGridList.innerHTML = '';
    const prog = getProgress();

    curatedLevels.forEach((lvl, idx) => {
        const isCleared = prog[lvl.id] && prog[lvl.id].cleared;
        const bestTime = isCleared ? formatSeconds(prog[lvl.id].bestTime) : null;
        const isActive = (currentLevelIndex === idx);

        const card = document.createElement('div');
        card.className = `level-card ${isActive ? 'active' : ''} ${isCleared ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="level-card-top">
                <span class="level-card-title">Level ${lvl.id} (${lvl.size}×${lvl.size})</span>
                <span>${isCleared ? '⭐' : ''}</span>
            </div>
            <div style="font-size: 0.72rem; color: #00ffcc; font-weight: 600;">${lvl.title}</div>
            <div class="level-card-concept">${lvl.conceptTh || lvl.concept}</div>
            ${bestTime ? `<div class="level-card-time">⏱️ ${bestTime}</div>` : ''}
        `;
        card.addEventListener('click', () => {
            currentLevelIndex = idx;
            initLevel();
            if (levelModal) levelModal.classList.add('hidden');
        });
        levelGridList.appendChild(card);
    });

    // Infinite Mode Card
    const infIdx = curatedLevels.length;
    const isInfActive = (currentLevelIndex >= infIdx);
    const infCard = document.createElement('div');
    infCard.className = `level-card ${isInfActive ? 'active' : ''}`;
    infCard.innerHTML = `
        <div class="level-card-top">
            <span class="level-card-title">Level ∞ (Infinite)</span>
            <span>♾️</span>
        </div>
        <div style="font-size: 0.72rem; color: #ff007f; font-weight: 600;">Procedural Matrix</div>
        <div class="level-card-concept">สร้างด่านสุ่มอัตโนมัติไม่รู้จบ</div>
    `;
    infCard.addEventListener('click', () => {
        currentLevelIndex = infIdx;
        initLevel();
        if (levelModal) levelModal.classList.add('hidden');
    });
    levelGridList.appendChild(infCard);
}

// Keyboard Controls (Accessibility & Chromebook ergonomics)
window.addEventListener('keydown', (e) => {
    // If modal overlays are visible
    if (!overlay.classList.contains('hidden') || !infoOverlay.classList.contains('hidden') || (levelModal && !levelModal.classList.contains('hidden')) || (architectModal && !architectModal.classList.contains('hidden')) || (eulerModal && !eulerModal.classList.contains('hidden'))) {
        if (e.key === 'Escape') {
            infoOverlay.classList.add('hidden');
            if (levelModal) levelModal.classList.add('hidden');
            if (architectModal) architectModal.classList.add('hidden');
            if (eulerModal) eulerModal.classList.add('hidden');
        } else if (e.key === 'Enter') {
            infoOverlay.classList.add('hidden');
            if (levelModal) levelModal.classList.add('hidden');
            if (architectModal) architectModal.classList.add('hidden');
            if (eulerModal) eulerModal.classList.add('hidden');
            if (!overlay.classList.contains('hidden')) {
                nextLevelBtn.click();
            }
        }
        return;
    }

    if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        if (architectModal) {
            if (architectModal.classList.contains('hidden')) {
                renderArchitectGrid();
                architectModal.classList.remove('hidden');
            } else {
                architectModal.classList.add('hidden');
            }
        }
        return;
    }

    if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        if (eulerModal) {
            if (eulerModal.classList.contains('hidden')) {
                getAudioContext();
                renderEulerLab();
                eulerModal.classList.remove('hidden');
            } else {
                eulerModal.classList.add('hidden');
            }
        }
        return;
    }

    if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
        return;
    }

    if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        if (levelModal) {
            if (levelModal.classList.contains('hidden')) {
                renderLevelModal();
                levelModal.classList.remove('hidden');
            } else {
                levelModal.classList.add('hidden');
            }
        }
        return;
    }

    if (e.key === 'z' || e.key === 'Z' || e.key === 'Backspace') {
        e.preventDefault();
        undoStep();
        return;
    }

    if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        initLevel();
        return;
    }

    if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        showHint();
        return;
    }

    if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        if (graphModeBtn) graphModeBtn.click();
        return;
    }

    if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        toggleSound();
        return;
    }

    let dx = 0, dy = 0;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') dy = -1;
    else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') dy = 1;
    else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') dx = -1;
    else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') dx = 1;

    if (dx !== 0 || dy !== 0) {
        e.preventDefault();
        if (gameWon) return;
        getAudioContext();

        if (path.length === 0) {
            stepForward(startCell);
            return;
        }

        const lastIdx = path[path.length - 1];
        const c = getCoords(lastIdx);
        const nx = c.x + dx;
        const ny = c.y + dy;

        if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
            const targetIdx = ny * gridSize + nx;
            if (path.length > 1 && targetIdx === path[path.length - 2]) {
                undoStep();
            } else if (!path.includes(targetIdx) && !obstacles.includes(targetIdx)) {
                stepForward(targetIdx);
            } else {
                playErrorTone();
            }
        } else {
            playErrorTone();
        }
    }
});

// Button Click Bindings
if (levelDisplay) {
    levelDisplay.addEventListener('click', () => {
        getAudioContext();
        renderLevelModal();
        if (levelModal) levelModal.classList.remove('hidden');
    });
}

if (closeLevelModalBtn) {
    closeLevelModalBtn.addEventListener('click', () => {
        if (levelModal) levelModal.classList.add('hidden');
    });
}

if (levelModal) {
    levelModal.addEventListener('click', (e) => {
        if (e.target === levelModal) {
            levelModal.classList.add('hidden');
        }
    });
}

if (undoBtn) {
    undoBtn.addEventListener('click', () => {
        getAudioContext();
        undoStep();
    });
}

if (graphModeBtn) {
    graphModeBtn.addEventListener('click', () => {
        getAudioContext();
        isGraphMode = !isGraphMode;
        graphModeBtn.classList.toggle('active', isGraphMode);
        playStepTone(isGraphMode ? 8 : 2, totalCells - obstacles.length);
        updateCellVisuals();
    });
}

if (closeDiagnosticBtn) {
    closeDiagnosticBtn.addEventListener('click', () => {
        if (diagnosticPanel) diagnosticPanel.classList.add('hidden');
        document.querySelectorAll('.culprit-node').forEach(el => el.classList.remove('culprit-node'));
    });
}

restartBtn.addEventListener('click', () => {
    getAudioContext();
    initLevel();
});

hintBtn.addEventListener('click', showHint);

infoBtn.addEventListener('click', () => {
    infoOverlay.classList.remove('hidden');
});

closeInfoBtn.addEventListener('click', () => {
    infoOverlay.classList.add('hidden');
});

if (replayPathBtn) {
    replayPathBtn.addEventListener('click', () => {
        playSolutionReplay();
    });
}

if (architectBtn) {
    architectBtn.addEventListener('click', () => {
        getAudioContext();
        renderArchitectGrid();
        if (architectModal) architectModal.classList.remove('hidden');
    });
}

if (closeArchitectBtn) {
    closeArchitectBtn.addEventListener('click', () => {
        if (architectModal) architectModal.classList.add('hidden');
    });
}

if (architectModal) {
    architectModal.addEventListener('click', (e) => {
        if (e.target === architectModal) {
            architectModal.classList.add('hidden');
        }
    });
}

// Wire Size Buttons
document.querySelectorAll('.arch-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.arch-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        archSize = parseInt(btn.dataset.size);
        archStartCell = 0;
        archObstacles = [];
        archOneWay = {};
        archWaypoints = {};
        archSolvable = false;
        if (playCustomBtn) playCustomBtn.disabled = true;
        if (shareCustomBtn) shareCustomBtn.disabled = true;
        if (architectStatus) {
            architectStatus.className = 'architect-status';
            architectStatus.textContent = `เปลี่ยนขนาดเป็น ${archSize}×${archSize} เรียบร้อย — แตะที่ช่องเพื่อวางเครื่องมือ`;
        }
        renderArchitectGrid();
    });
});

// Wire Palette Tool Buttons
document.querySelectorAll('.palette-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        archTool = btn.dataset.tool;
    });
});

if (verifyCustomBtn) {
    verifyCustomBtn.addEventListener('click', verifyArchitectLevel);
}

if (playCustomBtn) {
    playCustomBtn.addEventListener('click', playCustomLevel);
}

if (shareCustomBtn) {
    shareCustomBtn.addEventListener('click', shareCustomLevel);
}

if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
        getAudioContext();
        toggleSound();
    });
}

if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
}

if (replaySpeedBtn) {
    replaySpeedBtn.addEventListener('click', toggleReplaySpeed);
}

if (eulerBtn) {
    eulerBtn.addEventListener('click', () => {
        getAudioContext();
        renderEulerLab();
        if (eulerModal) eulerModal.classList.remove('hidden');
    });
}

if (closeEulerBtn) {
    closeEulerBtn.addEventListener('click', () => {
        if (eulerModal) eulerModal.classList.add('hidden');
    });
}

if (eulerModal) {
    eulerModal.addEventListener('click', (e) => {
        if (e.target === eulerModal) {
            eulerModal.classList.add('hidden');
        }
    });
}

if (eulerTabKonigsberg) {
    eulerTabKonigsberg.addEventListener('click', () => {
        currentEulerMode = 'konigsberg';
        eulerTabKonigsberg.classList.add('active');
        if (eulerTabHouse) eulerTabHouse.classList.remove('active');
        renderEulerLab();
    });
}

if (eulerTabHouse) {
    eulerTabHouse.addEventListener('click', () => {
        currentEulerMode = 'house';
        eulerTabHouse.classList.add('active');
        if (eulerTabKonigsberg) eulerTabKonigsberg.classList.remove('active');
        renderEulerLab();
    });
}

if (eulerToggleBridgeBtn) {
    eulerToggleBridgeBtn.addEventListener('click', () => {
        hasEighthBridge = !hasEighthBridge;
        renderEulerLab();
    });
}

if (eulerSimulateBtn) {
    eulerSimulateBtn.addEventListener('click', simulateEulerianTrail);
}

if (eulerResetBtn) {
    eulerResetBtn.addEventListener('click', () => {
        hasEighthBridge = false;
        renderEulerLab();
    });
}

// Initialize game on load
document.addEventListener('DOMContentLoaded', () => {
    // Need user interaction to unlock audio in browsers, so we resume context on first click anywhere
    document.body.addEventListener('click', () => {
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    }, { once: true });
    
    updateSoundUI();
    loadCustomLevelFromHash();
    initLevel();
});


// Share Functions
const gameUrl = "https://apisit-man.github.io/learning%20games/line-tracing-puzzle/";
const shareText = "มาฝึกสมอง ประลองปัญญากับเกมลากเส้น Neon Path! เกมที่ช่วยฝึก Logical Thinking และแก้ปัญหา ไปลองเล่นกันเลย!";

function copyLink(msg = "คัดลอกลิงก์สำเร็จ!") {
    navigator.clipboard.writeText(gameUrl).then(() => {
        const toast = document.getElementById("copy-toast");
        toast.textContent = msg;
        toast.style.display = "block";
        setTimeout(() => toast.style.display = "none", 3000);
    });
}

function shareLine() {
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(gameUrl)}&text=${encodeURIComponent(shareText)}`, "_blank");
}

function shareFB() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}`, "_blank");
}

function shareIG() {
    if (navigator.share) {
        navigator.share({
            title: 'Neon Path',
            text: shareText,
            url: gameUrl
        }).catch(console.error);
    } else {
        copyLink("คัดลอกลิงก์แล้ว! นำไปวางใน IG ได้เลยครับ");
    }
}

