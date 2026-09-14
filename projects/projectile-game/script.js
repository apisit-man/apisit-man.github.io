/* ==========================================================================
   Projectile Simulator - Script Logic
   STEM Physics simulation with interactive aim, levels, and particle FX
   ========================================================================== */

// --- Physics Scale Factors ---
const PIXELS_PER_METER = 1.6;
const VELOCITY_SCALE = 6;        // px/s per m/s
const ACCELERATION_SCALE = 22.5; // px/s^2 per m/s^2

// --- Gravity Presets (mapped to SI and Canvas scale) ---
const GRAVITY_PRESETS = {
    earth: { name: "โลก", gVal: 9.8 * ACCELERATION_SCALE, gSI: 9.8, label: "9.8 m/s²" },
    moon: { name: "ดวงจันทร์", gVal: 1.6 * ACCELERATION_SCALE, gSI: 1.6, label: "1.6 m/s²" },
    mars: { name: "ดาวอังคาร", gVal: 3.7 * ACCELERATION_SCALE, gSI: 3.7, label: "3.7 m/s²" },
    jupiter: { name: "ดาวพฤหัส", gVal: 24.8 * ACCELERATION_SCALE, gSI: 24.8, label: "24.8 m/s²" }
};

const BALL_RADIUS = 10;
const CANNON_BASE_X = 80;
const CANNON_BASE_Y = 470;     // Ground Y=480, pivot Y=470
const CANNON_LENGTH = 65;
const GROUND_Y = 490;
const MAX_AMMO = 3;

// Fireworks Palette
const FIREWORK_COLORS = ['#06b6d4', '#f43f5e', '#f59e0b', '#10b981', '#a855f7', '#ec4899', '#f97316'];

// --- Level Design Definitions ---
const LEVELS = [
    {
        id: 1,
        name: "ด่าน 1: พื้นฐานการยิง (Basic Motion)",
        target: { x: 750, y: 466, radius: 24 },
        obstacle: null,
        portals: null,
        windLocked: true, 
        description: "ปรับมุมยิงและความเร็วต้น เพื่อให้กระสุนตกลงเป้าหมายบนระนาบเดียวกันพอดี",
        reflection: "ความเร็วต้น (Velocity) และมุมยิง (Angle) มีผลต่อระยะทาง (R) อย่างไรบ้าง?"
    },
    {
        id: 2,
        name: "ด่าน 2: เป้าหมายต่างระดับ (Vertical Displacement)",
        target: { x: 800, y: 250, radius: 24 },
        obstacle: { x: 750, y: 274, width: 100, height: 216, moving: false, visualType: 'island' }, // Platform
        portals: null,
        windLocked: true,
        description: "เป้าหมายอยู่บนพื้นที่สูงขึ้น สูตรคำนวณระยะทางแบบเดิมบนพื้นราบจะใช้ไม่ได้โดยตรง!",
        reflection: "เมื่อเป้าหมายอยู่สูงขึ้น ทำไมจึงต้องใช้มุมยิงที่สูงกว่า 45 องศาเพื่อให้ยิงได้ไกลเท่าเดิม?"
    },
    {
        id: 3,
        name: "ด่าน 3: ข้ามกำแพงสูง (Fixed Obstacle)",
        target: { x: 800, y: 466, radius: 24 },
        obstacle: { x: 450, y: 150, width: 30, height: 340, moving: false, visualType: 'brick_tower' },
        portals: null,
        windLocked: true,
        description: "คุณต้องหาความเร็วและมุมยิงที่ทำให้ 'ความสูงสูงสุด (H)' พ้นกำแพง และ 'ระยะตก (R)' ถึงเป้าหมาย",
        reflection: "การเพิ่มมุมยิงให้สูงขึ้นมากๆ (เช่น 70°) ส่งผลต่อระยะเวลาที่ลูกปืนอยู่ในอากาศอย่างไร?"
    },
    {
        id: 4,
        name: "ด่าน 4: สองเส้นทาง (Two Trajectories)",
        target: { x: 820, y: 466, radius: 24 },
        obstacle: { x: 450, y: 200, width: 30, height: 160, moving: false, visualType: 'ufo_cargo' }, // Floating wall
        portals: null,
        windLocked: true,
        description: "กำแพงนี้ลอยอยู่กลางอากาศ คุณสามารถเลือกยิงวิถีโค้งสูง 'ข้าม' กำแพง หรือยิงวิถีพุ่งเรียบ 'ลอด' ใต้กำแพงก็ได้!",
        reflection: "คุณทราบหรือไม่ว่า ในความเร็วต้นเท่ากัน มุม 30° และ 60° จะตกที่ระยะทาง (R) เท่ากันเป๊ะ?"
    },
    {
        id: 5,
        name: "ด่าน 5: ผลกระทบของลม (Environmental Effects)",
        target: { x: 800, y: 466, radius: 24 },
        obstacle: { x: 500, y: 150, width: 30, height: 340, moving: false, visualType: 'mountain' },
        portals: null,
        windLocked: false,
        description: "ลมพัดแรง! ลมจะสร้าง 'ความเร่งแนวนอน' ทำให้ระยะตกเปลี่ยนไป คุณต้องชดเชยแรงลมนี้",
        reflection: "ถ้าลมพัดต้านทิศทางการยิง ความเร็วแนวนอน (Vx) ของโปรเจกไทล์จะคงที่หรือไม่?"
    },
    {
        id: 6,
        name: "ด่าน 6: กะเวลา (Timing Challenge)",
        target: { x: 850, y: 466, radius: 24 },
        obstacle: { 
            x: 550, 
            y: 200, 
            width: 40, 
            height: 290, 
            moving: true, 
            minY: 50, 
            maxY: 300, 
            dir: 1, 
            speed: 120,
            visualType: 'elevator'
        },
        portals: null,
        windLocked: false,
        description: "วิถีโปรเจกไทล์ต้องใช้ 'เวลา (t)' ในการเคลื่อนที่ คุณต้องกะจังหวะให้ลูกปืนผ่านไปตอนที่กำแพงเปิดช่อง",
        reflection: "การยิงวิถีโค้งโด่ง (มุมสูง) หรือการยิงวิถีพุ่ง (มุมต่ำ) แบบไหนใช้ 'เวลาลอยในอากาศ (T)' นานกว่ากัน?"
    },
    {
        id: 7,
        name: "ด่านพิเศษ: โบนัสมิติพิศวง (Portal Challenge)",
        target: { x: 850, y: 226, radius: 24 },
        obstacle: { x: 620, y: 100, width: 40, height: 390, moving: false, visualType: 'vault_door' },
        portals: { 
            blue: { x: 400, y: 400, r: 24 }, 
            orange: { x: 740, y: 140, r: 24 } 
        },
        windLocked: false,
        description: "กำแพงปิดตาย! ยิงใส่ประตูมิติสีฟ้า เพื่อวาร์ปโมเมนตัมทั้งหมดไปออกที่ประตูมิติสีส้ม",
        reflection: "ทิศทางและความเร็วของลูกปืนตอนออกจากประตูสีส้ม สัมพันธ์กับตอนที่เข้าประตูสีฟ้าอย่างไร?"
    }
];

// --- Audio Effects ---
const winSound = new Audio('cheer2.aac');

function playWinSound() {
    winSound.currentTime = 0; // reset to beginning
    winSound.play().catch(err => console.warn("Audio playback blocked by browser security policy:", err));
}

// --- State Variables ---
let currentLevelIndex = 0;
let angleDegrees = 45;
let launchSpeed = 65 * VELOCITY_SCALE;          // Default velocity v₀ (65 m/s)
let score = 0;                  // Total running score
let scoreAtLevelStart = 0;      // Score checkpoint at level start
let ammoRemaining = MAX_AMMO;
let isVictoryState = false;

// Physics parameters
let activePlanetKey = "earth";  // Active gravity planet preset
let currentWind = 0;            // Horizontal wind acceleration (px/s²)
let selectedProjectile = "standard"; // "standard", "pingpong", "steel", "bouncy"

// Physics objects
let activeBall = null;        
let pastPaths = [];           
let particles = [];           
let targetState = null;       
let obstacleState = null;       // Copy of obstacle details (needed if moving)

// Portals state (Level 5)
let portalState = null;

// Victory Fireworks objects
let fwRockets = [];           
let fwSparks = [];            
let fwSpawnTimer = 0;         

// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// DOM Elements
const appContainer = document.querySelector('.app-container');
const gravityPreset = document.getElementById('gravityPreset');
const angleSlider = document.getElementById('angleSlider');
const angleVal = document.getElementById('angleVal');
const velocitySlider = document.getElementById('velocitySlider');
const velocityVal = document.getElementById('velocityVal');
const windSlider = document.getElementById('windSlider');
const windVal = document.getElementById('windVal');
const hudAngle = document.getElementById('hudAngle');
const hudVelocity = document.getElementById('hudVelocity');
const hudWind = document.getElementById('hudWind');
const hudDistance = document.getElementById('hudDistance');
const hudMaxHeight = document.getElementById('hudMaxHeight');
const shootBtn = document.getElementById('shootBtn');
const clearPathsBtn = document.getElementById('clearPathsBtn');
const levelBadge = document.getElementById('levelBadge');
const scoreBadge = document.getElementById('scoreBadge');
const levelClearedOverlay = document.getElementById('levelClearedOverlay');
const levelFailedOverlay = document.getElementById('levelFailedOverlay');
const gameCompleteOverlay = document.getElementById('gameCompleteOverlay');
const gameIntroOverlay = document.getElementById('gameIntroOverlay');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const retryLevelBtn = document.getElementById('retryLevelBtn');
const restartGameBtn = document.getElementById('restartGameBtn');
const startGameBtn = document.getElementById('startGameBtn');
const winMessage = document.getElementById('winMessage');
const levelClearedDesc = document.getElementById('levelClearedDesc');
const statShots = document.getElementById('statShots');
const statAccuracy = document.getElementById('statAccuracy');
const medalIcon = document.getElementById('medalIcon');
const medalTitle = document.getElementById('medalTitle');
const medalBadge = document.getElementById('medalBadge');
const finalScore = document.getElementById('finalScore');

// Calculator DOM Elements
const calcV0 = document.getElementById('calcV0');
const calcTheta = document.getElementById('calcTheta');
const calcApplyBtn = document.getElementById('calcApplyBtn');
const calcResR = document.getElementById('calcResR');
const calcResH = document.getElementById('calcResH');
const calcResVx = document.getElementById('calcResVx');
const calcResVy = document.getElementById('calcResVy');
const calcResT = document.getElementById('calcResT');

// --- Initialization ---
function init() {
    loadLevel(0);
    setupEventListeners();
    runTheoreticalCalculation();
    
    // Start Game Loop
    let lastTime = 0;
    function loop(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const dt = (timestamp - lastTime) / 1000;
        
        update(Math.min(dt, 0.1));
        render();
        
        lastTime = timestamp;
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

// --- Load Level State ---
function loadLevel(index) {
    currentLevelIndex = index;
    const lvl = LEVELS[currentLevelIndex];
    
    // Setup Level State
    ammoRemaining = MAX_AMMO;
    activeBall = null;
    pastPaths = [];
    particles = [];
    isVictoryState = false;
    
    // Set score to start checkpoint
    score = scoreAtLevelStart;
    scoreBadge.textContent = score;
    
    // Setup dynamic coordinates copy
    targetState = { ...lvl.target };
    
    if (lvl.obstacle) {
        obstacleState = { ...lvl.obstacle };
    } else {
        obstacleState = null;
    }
    
    if (lvl.portals) {
        portalState = { ...lvl.portals };
    } else {
        portalState = null;
    }
    
    // Generate Wind
    if (lvl.windLocked) {
        setWind(0);
        if (windSlider) windSlider.disabled = true;
        const decWind = document.getElementById('decWind');
        const incWind = document.getElementById('incWind');
        if (decWind) decWind.disabled = true;
        if (incWind) incWind.disabled = true;
    } else {
        const initWind = Math.round(-15 + Math.random() * 30);
        setWind(initWind);
        if (windSlider) windSlider.disabled = false;
        const decWind = document.getElementById('decWind');
        const incWind = document.getElementById('incWind');
        if (decWind) decWind.disabled = false;
        if (incWind) incWind.disabled = false;
    }
    
    // Reset control fields to Level defaults
    angleDegrees = 45;
    angleSlider.value = 45;
    angleVal.textContent = '45°';
    hudAngle.textContent = '45°';
    
    launchSpeed = 65 * VELOCITY_SCALE; // Default speed: 65 m/s
    velocitySlider.value = 65;
    velocityVal.textContent = '65 m/s';
    hudVelocity.textContent = '65 m/s';
    
    // Reset projectile selection UI
    document.querySelectorAll('.btn-proj').forEach(btn => {
        if (btn.getAttribute('data-type') === 'standard') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    selectedProjectile = "standard";
    
    // Update HTML badge
    levelBadge.textContent = `ด่าน ${lvl.id}`;
    levelClearedOverlay.classList.remove('active');
    levelFailedOverlay.classList.remove('active');
    gameCompleteOverlay.classList.remove('active');
    appContainer.classList.remove('victory-active');
    
    fwRockets = [];
    fwSparks = [];
    
    updateAmmoUI();
    runTheoreticalCalculation();
    
    hudDistance.textContent = '0.0 m';
    hudMaxHeight.textContent = '0.0 m';
}

// --- Update Ammo dots ---
function updateAmmoUI() {
    const ammoDotsContainer = document.getElementById('hudAmmo');
    if (!ammoDotsContainer) return;
    
    ammoDotsContainer.innerHTML = '';
    for (let i = 0; i < MAX_AMMO; i++) {
        const dot = document.createElement('span');
        dot.className = 'ammo-dot';
        if (i < ammoRemaining) {
            dot.classList.add('active');
        } else {
            dot.classList.add('spent');
        }
        ammoDotsContainer.appendChild(dot);
    }
}

// --- Helper Functions to set controls ---
function setAngle(deg) {
    angleDegrees = Math.max(0, Math.min(90, deg));
    angleSlider.value = angleDegrees;
    updateAngleUI();
}

function setVelocity(mps) {
    const val = Math.max(30, Math.min(100, mps));
    velocitySlider.value = val;
    velocityVal.textContent = `${val} m/s`;
    hudVelocity.textContent = `${val} m/s`;
    launchSpeed = val * VELOCITY_SCALE;
}

function setWind(mps) {
    const val = Math.max(-20, Math.min(20, mps));
    if (windSlider) windSlider.value = val;
    if (windVal) windVal.textContent = `${val} m/s`;
    
    currentWind = val * VELOCITY_SCALE;
    
    if (hudWind) {
        const dirSymbol = val >= 0 ? "➔" : "⬅";
        hudWind.textContent = `💨 ${Math.abs(val).toFixed(1)} m/s ${dirSymbol}`;
    }
}

// --- Event Handlers Setup ---
function setupEventListeners() {
    // Planetary Select changes
    gravityPreset.addEventListener('change', (e) => {
        activePlanetKey = e.target.value;
        runTheoreticalCalculation();
    });

    // Slider Aiming (Angle)
    angleSlider.addEventListener('input', (e) => {
        setAngle(parseInt(e.target.value));
    });

    // Slider Velocity (Speed)
    velocitySlider.addEventListener('input', (e) => {
        setVelocity(parseInt(e.target.value));
    });

    // Slider Wind
    if (windSlider) {
        windSlider.addEventListener('input', (e) => {
            setWind(parseInt(e.target.value));
        });
    }

    // Fine-tune buttons events
    document.getElementById('decAngle').addEventListener('click', () => {
        setAngle(angleDegrees - 1);
    });
    document.getElementById('incAngle').addEventListener('click', () => {
        setAngle(angleDegrees + 1);
    });
    document.getElementById('decVelocity').addEventListener('click', () => {
        const currentMps = Math.round(launchSpeed / VELOCITY_SCALE);
        setVelocity(currentMps - 1);
    });
    document.getElementById('incVelocity').addEventListener('click', () => {
        const currentMps = Math.round(launchSpeed / VELOCITY_SCALE);
        setVelocity(currentMps + 1);
    });
    
    document.getElementById('decWind').addEventListener('click', () => {
        if (!document.getElementById('decWind').disabled && windSlider) {
            setWind(parseInt(windSlider.value) - 1);
        }
    });
    document.getElementById('incWind').addEventListener('click', () => {
        if (!document.getElementById('incWind').disabled && windSlider) {
            setWind(parseInt(windSlider.value) + 1);
        }
    });

    // Projectile Selector Buttons
    document.querySelectorAll('.btn-proj').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-proj').forEach(b => b.classList.remove('active'));
            const type = e.target.getAttribute('data-type');
            e.target.classList.add('active');
            selectedProjectile = type;
        });
    });

    // Shoot Button
    shootBtn.addEventListener('click', () => {
        fireProjectile();
    });

    // Clear Paths Button
    clearPathsBtn.addEventListener('click', () => {
        pastPaths = [];
    });

    // (startGameBtn listener is handled via inline onclick in HTML)

    // Next Level Modal Button
    nextLevelBtn.addEventListener('click', () => {
        if (currentLevelIndex + 1 < LEVELS.length) {
            scoreAtLevelStart = score;
            loadLevel(currentLevelIndex + 1);
        } else {
            triggerVictoryCelebration();
        }
    });

    // Retry Level Modal Button
    retryLevelBtn.addEventListener('click', () => {
        loadLevel(currentLevelIndex);
    });

    // Restart Button
    restartGameBtn.addEventListener('click', () => {
        score = 0;
        scoreAtLevelStart = 0;
        loadLevel(0);
    });

    // Interactive Calculator binds
    const updateCalculations = () => {
        runTheoreticalCalculation();
    };
    calcV0.addEventListener('input', updateCalculations);
    calcTheta.addEventListener('input', updateCalculations);

    // Apply values from calculator
    calcApplyBtn.addEventListener('click', () => {
        const theta = Math.max(0, Math.min(90, parseInt(calcTheta.value) || 0));
        const v0 = Math.max(30, Math.min(100, parseInt(calcV0.value) || 30));
        
        // Sync values to calculator inputs
        calcTheta.value = theta;
        calcV0.value = v0;
        
        // Apply to controls
        angleDegrees = theta;
        angleSlider.value = theta;
        updateAngleUI();
        
        velocitySlider.value = v0;
        velocityVal.textContent = `${v0} m/s`;
        hudVelocity.textContent = `${v0} m/s`;
        launchSpeed = v0 * VELOCITY_SCALE;
        
        runTheoreticalCalculation();
    });

    // Interactive Canvas Mouse Aiming
    let isAiming = false;

    function handleAim(clientX, clientY) {
        if (activeBall || isVictoryState ||
            (gameIntroOverlay && gameIntroOverlay.parentNode && gameIntroOverlay.classList.contains('active')) ||
            levelClearedOverlay.classList.contains('active') || 
            levelFailedOverlay.classList.contains('active') ||
            gameCompleteOverlay.classList.contains('active')) {
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const mx = (clientX - rect.left) * scaleX;
        const my = (clientY - rect.top) * scaleY;
        
        const dx = mx - CANNON_BASE_X;
        const dy = CANNON_BASE_Y - my;
        
        let rad = Math.atan2(dy, dx);
        let deg = Math.round(rad * (180 / Math.PI));
        
        if (deg < 0) deg = 0;
        if (deg > 90) deg = 90;
        
        angleDegrees = deg;
        angleSlider.value = deg;
        updateAngleUI();
    }

    canvas.addEventListener('mousedown', (e) => {
        isAiming = true;
        handleAim(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
        if (isAiming) {
            handleAim(e.clientX, e.clientY);
        }
    });

    window.addEventListener('mouseup', () => {
        isAiming = false;
    });

    canvas.addEventListener('touchstart', (e) => {
        isAiming = true;
        if (e.touches.length > 0) {
            handleAim(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (isAiming && e.touches.length > 0) {
            handleAim(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
        isAiming = false;
    });

    // Full Screen Button logic
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const docEl = document.documentElement;
            if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
                // Enter fullscreen
                if (docEl.requestFullscreen) {
                    docEl.requestFullscreen().catch(err => console.error(err));
                } else if (docEl.webkitRequestFullscreen) { /* Safari */
                    docEl.webkitRequestFullscreen();
                } else if (docEl.mozRequestFullScreen) { /* Firefox */
                    docEl.mozRequestFullScreen();
                } else if (docEl.msRequestFullscreen) { /* IE11 */
                    docEl.msRequestFullscreen();
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) { /* Firefox */
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
            }
        });
        
        // Listen to all vendor-prefixed fullscreen events to toggle button text
        const updateFullscreenUI = () => {
            const isFull = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            if (isFull) {
                fullscreenBtn.innerHTML = '🗗 Exit Full Screen';
                fullscreenBtn.title = 'Exit Full Screen';
                document.body.classList.add('is-fullscreen');
            } else {
                fullscreenBtn.innerHTML = '🖥️ Full Screen';
                fullscreenBtn.title = 'Full Screen';
                document.body.classList.remove('is-fullscreen');
            }
        };

        document.addEventListener('fullscreenchange', updateFullscreenUI);
        document.addEventListener('webkitfullscreenchange', updateFullscreenUI);
        document.addEventListener('mozfullscreenchange', updateFullscreenUI);
        document.addEventListener('MSFullscreenChange', updateFullscreenUI);
    }
}

function updateAngleUI() {
    angleVal.textContent = `${angleDegrees}°`;
    hudAngle.textContent = `${angleDegrees}°`;
}

// --- Kinematics Math Calculator Logic ---
function runTheoreticalCalculation() {
    const v0 = parseFloat(calcV0.value) || 0;
    const thetaDeg = parseFloat(calcTheta.value) || 0;
    const thetaRad = thetaDeg * (Math.PI / 180);
    
    const gPreset = GRAVITY_PRESETS[activePlanetKey];
    const g = gPreset.gSI;

    // Formulas:
    // Range R = (v₀² * sin(2θ)) / g
    // Max Height H = (v₀² * sin²(θ)) / (2g)
    const range = (Math.pow(v0, 2) * Math.sin(2 * thetaRad)) / g;
    const maxHeight = (Math.pow(v0, 2) * Math.pow(Math.sin(thetaRad), 2)) / (2 * g);
    const vx = v0 * Math.cos(thetaRad);
    const vy = v0 * Math.sin(thetaRad);
    const timeOfFlight = (2 * v0 * Math.sin(thetaRad)) / g;

    calcResR.textContent = `${Math.max(0, range).toFixed(1)} m`;
    calcResH.textContent = `${Math.max(0, maxHeight).toFixed(1)} m`;
    calcResVx.textContent = `${Math.max(0, vx).toFixed(1)} m/s`;
    calcResVy.textContent = `${Math.max(0, vy).toFixed(1)} m/s`;
    calcResT.textContent = `${Math.max(0, timeOfFlight).toFixed(2)} s`;
}

// --- Fire Projectile ---
function fireProjectile() {
    if (activeBall || ammoRemaining <= 0 || isVictoryState) return;
    if ((gameIntroOverlay && gameIntroOverlay.parentNode && gameIntroOverlay.classList.contains('active')) ||
        levelClearedOverlay.classList.contains('active') || 
        levelFailedOverlay.classList.contains('active') ||
        gameCompleteOverlay.classList.contains('active')) {
        return;
    }

    ammoRemaining--;
    updateAmmoUI();

    const rad = angleDegrees * (Math.PI / 180);
    
    // Muzzle coordinates
    const muzzleX = CANNON_BASE_X + CANNON_LENGTH * Math.cos(rad);
    const muzzleY = CANNON_BASE_Y - CANNON_LENGTH * Math.sin(rad);

    // Apply Projectile-specific features
    let speed = launchSpeed;
    let dragMultiplier = 1.0;
    let bounces = 0;

    if (selectedProjectile === "steel") {
        // Heavy steel reduces muzzle velocity by 20% but ignores wind
        speed = launchSpeed * 0.8;
        dragMultiplier = 0.0;
    } else if (selectedProjectile === "pingpong") {
        // Ping pong is extremely light, affected twice as much by wind
        dragMultiplier = 2.2;
    } else if (selectedProjectile === "bouncy") {
        // Bouncy ball can bounce up to 2 times
        bounces = 2;
        dragMultiplier = 0.8;
    }

    activeBall = {
        x: muzzleX,
        y: muzzleY,
        vx: speed * Math.cos(rad),
        vy: -speed * Math.sin(rad),
        trail: [],
        maxHeight: muzzleY,
        drag: dragMultiplier,
        bouncesLeft: bounces,
        justTeleported: false,
        timeInAir: 0
    };
    
    // Launch flash colors matching the ammunition types
    const sparkColor = selectedProjectile === "bouncy" ? "#ec4899" : 
                       selectedProjectile === "steel" ? "#94a3b8" : 
                       selectedProjectile === "pingpong" ? "#a855f7" : "#06b6d4";
    
    createSparks(muzzleX, muzzleY, sparkColor, 8);
}

// --- Spawn sparks helper ---
function createSparks(x, y, color, count = 15) {
    for (let i = 0; i < count; i++) {
        const speed = 50 + Math.random() * 150;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
            x: x,
            y: y,
            vx: speed * Math.cos(angle),
            vy: speed * Math.sin(angle),
            radius: 2 + Math.random() * 3,
            color: color,
            alpha: 1,
            life: 0.5 + Math.random() * 0.5
        });
    }
}

// --- Firework Launch Helper ---
function spawnFireworkRocket() {
    const x = 150 + Math.random() * (canvas.width - 300);
    const y = canvas.height;
    const targetY = 80 + Math.random() * 200;
    const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
    
    const vy = -380 - Math.random() * 120;
    const vx = -40 + Math.random() * 80;
    
    fwRockets.push({ x, y, vx, vy, color, targetY });
}

// --- Explode Firework ---
function explodeFirework(x, y, color) {
    const sparkCount = 65 + Math.floor(Math.random() * 20);
    for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 60 + Math.random() * 160;
        
        fwSparks.push({
            x: x,
            y: y,
            vx: speed * Math.cos(angle),
            vy: speed * Math.sin(angle),
            color: color,
            alpha: 1.0,
            decay: 0.014 + Math.random() * 0.014,
            size: 1.5 + Math.random() * 2.2
        });
    }
}

// --- Update Loop ---
function update(dt) {
    if (isVictoryState) {
        fwSpawnTimer -= dt;
        if (fwSpawnTimer <= 0) {
            spawnFireworkRocket();
            fwSpawnTimer = 0.6 + Math.random() * 0.7;
        }

        // Update Rockets
        for (let i = fwRockets.length - 1; i >= 0; i--) {
            const r = fwRockets[i];
            r.x += r.vx * dt;
            r.y += r.vy * dt;
            r.vy += 80 * dt;

            if (r.vy >= 0 || r.y <= r.targetY) {
                explodeFirework(r.x, r.y, r.color);
                fwRockets.splice(i, 1);
            }
        }

        // Update Sparks
        for (let i = fwSparks.length - 1; i >= 0; i--) {
            const s = fwSparks[i];
            s.x += s.vx * dt;
            s.y += s.vy * dt;
            s.vy += 90 * dt;
            
            s.vx *= 0.95;
            s.vy *= 0.95;

            s.alpha -= s.decay;

            if (s.alpha <= 0) {
                fwSparks.splice(i, 1);
            }
        }
        return;
    }

    // 1. Update moving obstacles (Level 4)
    if (obstacleState && obstacleState.moving) {
        obstacleState.y += obstacleState.speed * obstacleState.dir * dt;
        if (obstacleState.y > obstacleState.maxY) {
            obstacleState.y = obstacleState.maxY;
            obstacleState.dir = -1;
        } else if (obstacleState.y < obstacleState.minY) {
            obstacleState.y = obstacleState.minY;
            obstacleState.dir = 1;
        }
    }

    // 2. Projectile update loop
    if (activeBall) {
        activeBall.timeInAir += dt;
        activeBall.trail.push({ x: activeBall.x, y: activeBall.y });
        if (activeBall.trail.length > 100) activeBall.trail.shift();

        // Apply wind (accelerating in x direction, scaled by projectile drag value)
        const windAcceleration = currentWind * activeBall.drag;
        activeBall.vx += windAcceleration * dt;

        // Apply gravity preset
        const gVal = GRAVITY_PRESETS[activePlanetKey].gVal;
        activeBall.vy += gVal * dt;

        // Move position
        activeBall.x += activeBall.vx * dt;
        activeBall.y += activeBall.vy * dt;

        if (activeBall.y < activeBall.maxHeight) {
            activeBall.maxHeight = activeBall.y;
        }

        // Realtime stats updates
        const currentDistance = (activeBall.x - CANNON_BASE_X) / PIXELS_PER_METER;
        const currentMaxHeight = (CANNON_BASE_Y - activeBall.maxHeight) / PIXELS_PER_METER;
        hudDistance.textContent = `${Math.max(0, currentDistance).toFixed(1)} m`;
        hudMaxHeight.textContent = `${Math.max(0, currentMaxHeight).toFixed(1)} m`;

        let collided = false;
        let groundCollision = false;
        let obstacleCollision = false;

        // Ground check
        if (activeBall.y + BALL_RADIUS >= GROUND_Y) {
            groundCollision = true;
            collided = true;
        }

        // Obstacle check
        if (obstacleState) {
            const obs = obstacleState;
            if (activeBall.x + BALL_RADIUS >= obs.x && activeBall.x - BALL_RADIUS <= obs.x + obs.width &&
                activeBall.y + BALL_RADIUS >= obs.y && activeBall.y - BALL_RADIUS <= obs.y + obs.height) {
                obstacleCollision = true;
                collided = true;
            }
        }

        // Bouncy Ball reflections
        if (collided && activeBall.bouncesLeft > 0) {
            activeBall.bouncesLeft--;
            createSparks(activeBall.x, activeBall.y, '#ec4899', 12);
            
            if (groundCollision) {
                activeBall.y = GROUND_Y;
                activeBall.vy = -activeBall.vy * 0.7; // rebound coefficient
                activeBall.vx = activeBall.vx * 0.8;  // friction loss
            } else if (obstacleCollision) {
                const obs = obstacleState;
                // Calculate overlap depths to find which side it collided with
                const fromLeft = Math.abs(activeBall.x - obs.x);
                const fromRight = Math.abs(activeBall.x - (obs.x + obs.width));
                const fromTop = Math.abs(activeBall.y - obs.y);
                const fromBottom = Math.abs(activeBall.y - (obs.y + obs.height));

                const minOverlap = Math.min(fromLeft, fromRight, fromTop, fromBottom);

                if (minOverlap === fromLeft) {
                    activeBall.x = obs.x - 2;
                    activeBall.vx = -activeBall.vx * 0.7;
                } else if (minOverlap === fromRight) {
                    activeBall.x = obs.x + obs.width + 2;
                    activeBall.vx = -activeBall.vx * 0.7;
                } else if (minOverlap === fromTop) {
                    activeBall.y = obs.y - 2;
                    activeBall.vy = -activeBall.vy * 0.7;
                } else {
                    activeBall.y = obs.y + obs.height + 2;
                    activeBall.vy = -activeBall.vy * 0.7;
                }
            }
            collided = false; // Reset collision state as it bounced
        }

        // Out of Bounds check
        if (activeBall && (activeBall.x < 0 || activeBall.x > canvas.width)) {
            collided = true;
        }

        // Target check
        if (activeBall) {
            const dx = activeBall.x - targetState.x;
            const dy = activeBall.y - targetState.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist <= BALL_RADIUS + targetState.radius) {
                createSparks(targetState.x, targetState.y, '#f59e0b', 35);
                handleLevelCleared();
                return;
            }
        }

        // Portals Portal collision (Level 5)
        if (activeBall && portalState) {
            const pBlue = portalState.blue;
            const pOrange = portalState.orange;

            // Blue portal detection
            const dxBlue = activeBall.x - pBlue.x;
            const dyBlue = activeBall.y - pBlue.y;
            const dBlue = Math.sqrt(dxBlue * dxBlue + dyBlue * dyBlue);

            if (dBlue <= BALL_RADIUS + pBlue.r && !activeBall.justTeleported) {
                // Teleport to orange
                activeBall.x = pOrange.x;
                activeBall.y = pOrange.y;
                activeBall.justTeleported = true;
                
                // Teleport effect spark flash
                createSparks(pBlue.x, pBlue.y, '#3b82f6', 15);
                createSparks(pOrange.x, pOrange.y, '#f97316', 15);
            }

            // Reset teleport lock once it flies away from both portals
            if (activeBall.justTeleported) {
                const dxOrange = activeBall.x - pOrange.x;
                const dyOrange = activeBall.y - pOrange.y;
                const dOrange = Math.sqrt(dxOrange * dxOrange + dyOrange * dyOrange);
                
                if (dBlue > pBlue.r + 15 && dOrange > pOrange.r + 15) {
                    activeBall.justTeleported = false;
                }
            }
        }

        // Final deactivation if collision holds
        if (collided) {
            pastPaths.push({
                points: [...activeBall.trail, { x: activeBall.x, y: activeBall.y }],
                color: 'rgba(148, 163, 184, 0.25)'
            });
            
            // Calculate reason
            let reason = "วิถีไม่ตรงเป้าหมาย";
            if (obstacleCollision && obstacleState) {
                if (activeBall.y > obstacleState.y + obstacleState.height / 2) {
                    reason = "วิถีต่ำเกินไปจนชนกำแพง ลองเพิ่มมุมยิงหรือความเร็ว";
                } else {
                    reason = "ชนสิ่งกีดขวาง ลองปรับมุมหรือความเร็วใหม่";
                }
            } else if (groundCollision && targetState) {
                if (activeBall.x < targetState.x - targetState.radius) {
                    reason = "กระสุนตกก่อนถึงเป้าหมาย (ระยะ R สั้นไป)";
                } else if (activeBall.x > targetState.x + targetState.radius) {
                    reason = "กระสุนเลยเป้าหมาย (ระยะ R ไกลเกินไป)";
                } else {
                    reason = "เกือบโดนแล้ว! ปรับอีกนิดเดียว";
                }
            }

            const finalDistance = (activeBall.x - CANNON_BASE_X) / PIXELS_PER_METER;
            const finalMaxHeight = (CANNON_BASE_Y - activeBall.maxHeight) / PIXELS_PER_METER;
            const timeOfFlight = activeBall.timeInAir;
            const impactSpeed = Math.sqrt(activeBall.vx*activeBall.vx + activeBall.vy*activeBall.vy) / VELOCITY_SCALE;

            document.getElementById('feedbackReason').textContent = reason;
            document.getElementById('fbMaxHeight').textContent = `${Math.max(0, finalMaxHeight).toFixed(1)} m`;
            document.getElementById('fbDistance').textContent = `${Math.max(0, finalDistance).toFixed(1)} m`;
            document.getElementById('fbTime').textContent = `${timeOfFlight.toFixed(2)} s`;
            document.getElementById('fbImpact').textContent = `${impactSpeed.toFixed(1)} m/s`;
            
            const toast = document.getElementById('shotFeedbackToast');
            if (toast) {
                toast.style.display = 'block';
                setTimeout(() => {
                    toast.style.display = 'none';
                }, 5000);
            }

            activeBall = null;

            if (ammoRemaining === 0) {
                handleLevelFailed();
            }
        }
    }

    // Update active particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        p.alpha = Math.max(0, p.life);
        
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

// --- Level Success Hook ---
function handleLevelCleared() {
    activeBall = null;
    
    // Play cheer audio
    playWinSound();
    
    const shotsUsed = MAX_AMMO - ammoRemaining;
    const accuracy = Math.round((1 / shotsUsed) * 100);
    
    statShots.textContent = shotsUsed;
    statAccuracy.textContent = `${accuracy}%`;
    winMessage.textContent = `ผ่านด่าน ${LEVELS[currentLevelIndex].id}!`;
    
    const reflectionElement = document.getElementById('reflectionQuestion');
    if (reflectionElement) {
        reflectionElement.textContent = LEVELS[currentLevelIndex].reflection || "ทำได้เยี่ยมมาก!";
    }

    // Award Medal based on accuracy / shots used
    let medalTxt = "";
    let medalStarStr = "";
    let pointsAwarded = 50;

    if (shotsUsed === 1) {
        medalIcon.textContent = "🥇";
        medalTxt = "เหรียญทอง (Sniper)";
        medalStarStr = "⭐️⭐️⭐️";
        pointsAwarded = 150;
        levelClearedDesc.textContent = "สุดยอดความแม่นยำ! คุณยิงโดนเป้าหมายได้ในการยิงครั้งแรก!";
    } else if (shotsUsed === 2) {
        medalIcon.textContent = "🥈";
        medalTxt = "เหรียญเงิน (Marksman)";
        medalStarStr = "⭐️⭐️";
        pointsAwarded = 100;
        levelClearedDesc.textContent = "ยอดเยี่ยม! คุณวิเคราะห์ความคลาดเคลื่อนและปรับแก้ได้ดีในนัดที่สอง";
    } else {
        medalIcon.textContent = "🥉";
        medalTxt = "เหรียญทองแดง (Shooter)";
        medalStarStr = "⭐️";
        pointsAwarded = 50;
        levelClearedDesc.textContent = "สำเร็จ! คุณยิงทำลายเป้าหมายได้สำเร็จตามข้อจำกัดกระสุน";
    }

    score += pointsAwarded;
    scoreBadge.textContent = score;

    medalTitle.textContent = medalTxt;
    document.querySelector('.medal-stars').textContent = medalStarStr;

    if (currentLevelIndex === LEVELS.length - 1) {
        setTimeout(() => {
            triggerVictoryCelebration();
        }, 500);
        return;
    }
    
    setTimeout(() => {
        levelClearedOverlay.classList.add('active');
    }, 400);
}

// --- Level Failure Hook ---
function handleLevelFailed() {
    activeBall = null;
    setTimeout(() => {
        levelFailedOverlay.classList.add('active');
    }, 400);
}

// --- Victory Celebration ---
function triggerVictoryCelebration() {
    isVictoryState = true;
    
    appContainer.classList.add('victory-active');
    finalScore.textContent = score;
    gameCompleteOverlay.classList.add('active');
    
    fwSpawnTimer = 0;
    for (let i = 0; i < 3; i++) {
        setTimeout(spawnFireworkRocket, i * 250);
    }
}

// --- Rendering Loop ---
function render() {
    // 1. Victory Fireworks Screen
    if (isVictoryState) {
        ctx.fillStyle = 'rgba(9, 13, 22, 0.16)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Rockets
        for (let r of fwRockets) {
            ctx.save();
            ctx.fillStyle = r.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = r.color;
            ctx.beginPath();
            ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Draw Sparks
        for (let s of fwSparks) {
            ctx.save();
            ctx.globalAlpha = s.alpha;
            ctx.fillStyle = s.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = s.color;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        return;
    }

    // 2. Normal Gameplay Canvas Rendering
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    // Draw Obstacles (Wall)
    if (obstacleState) {
        drawObstacle(obstacleState);
    }

    // Draw Teleport Portals (Level 5)
    if (portalState) {
        drawPortals(portalState);
    }

    // Draw Target
    if (targetState) {
        drawTarget(targetState);
    }

    drawGround();

    // Trajectory Predict Line
    if (!activeBall && ammoRemaining > 0 &&
        !levelClearedOverlay.classList.contains('active') &&
        !levelFailedOverlay.classList.contains('active')) {
        drawPrediction();
    }

    // drawPastTrails();
    drawCannon();

    if (activeBall) {
        drawProjectile(activeBall);
    }

    drawParticles();
}

// --- Sub-draw methods ---

function drawGrid() {
    ctx.strokeStyle = 'rgba(32, 46, 76, 0.15)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawGround() {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
    ctx.strokeStyle = '#202e4c';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(canvas.width, GROUND_Y);
    ctx.stroke();
}

function drawObstacle(obs) {
    ctx.save();
    
    // Draw the core visual depending on type
    if (obs.visualType === 'island') {
        // Floating island with grass
        ctx.fillStyle = '#5c4033'; // Dirt
        ctx.fillRect(obs.x, obs.y + 10, obs.width, obs.height - 10);
        ctx.fillStyle = '#4ade80'; // Grass
        ctx.fillRect(obs.x, obs.y, obs.width, 10);
        
        // Vines
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(obs.x + 10, obs.y + 10, 3, 20);
        ctx.fillRect(obs.x + obs.width - 15, obs.y + 10, 4, 30);
        ctx.fillRect(obs.x + 25, obs.y + 10, 2, 12);
        
        // Little flowers
        ctx.fillStyle = '#f472b6';
        ctx.beginPath(); ctx.arc(obs.x + 15, obs.y + 5, 2, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(obs.x + obs.width - 20, obs.y + 5, 2, 0, Math.PI*2); ctx.fill();
    } 
    else if (obs.visualType === 'brick_tower') {
        // Brick wall
        ctx.fillStyle = '#7f1d1d'; // Dark red brick
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        // Bricks pattern
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        for(let i = 0; i < obs.height; i+= 15) {
            ctx.fillRect(obs.x, obs.y + i, obs.width, 2);
            let offset = (i % 30 === 0) ? 0 : 15;
            ctx.fillRect(obs.x + offset, obs.y + i, 2, 15);
            if(offset === 0 && obs.width > 30) {
                 ctx.fillRect(obs.x + 30, obs.y + i, 2, 15);
            }
        }
        // Battlement
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(obs.x - 4, obs.y, 12, -12);
        ctx.fillRect(obs.x + obs.width - 8, obs.y, 12, -12);
        
        // Little bird on top
        ctx.fillStyle = '#facc15'; // yellow bird
        ctx.beginPath(); ctx.arc(obs.x + 4, obs.y - 16, 4, 0, Math.PI*2); ctx.fill(); // body
        ctx.beginPath(); ctx.arc(obs.x + 7, obs.y - 20, 3, 0, Math.PI*2); ctx.fill(); // head
        ctx.fillStyle = '#f97316'; // beak
        ctx.beginPath(); ctx.moveTo(obs.x+9, obs.y-20); ctx.lineTo(obs.x+13, obs.y-19); ctx.lineTo(obs.x+9, obs.y-18); ctx.fill();
    }
    else if (obs.visualType === 'ufo_cargo') {
        // Cargo box (hitbox)
        ctx.fillStyle = '#92400e';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        // Wood planks and cross
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 2;
        ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y);
        ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
        ctx.moveTo(obs.x + obs.width, obs.y);
        ctx.lineTo(obs.x, obs.y + obs.height);
        ctx.stroke();
        
        // UFO holding it
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.ellipse(obs.x + obs.width/2, obs.y - 25, obs.width * 1.2, 10, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(obs.x + obs.width/2, obs.y - 28, 12, Math.PI, 0);
        ctx.fill();
        
        // Tractor beam / Rope
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(obs.x + obs.width/2, obs.y - 15);
        ctx.lineTo(obs.x + obs.width/2, obs.y);
        ctx.stroke();
    }
    else if (obs.visualType === 'mountain') {
        // Mountain rock base
        ctx.fillStyle = '#334155';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        // Jagged edges
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y);
        ctx.lineTo(obs.x - 12, obs.y + 40);
        ctx.lineTo(obs.x, obs.y + 80);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(obs.x + obs.width, obs.y);
        ctx.lineTo(obs.x + obs.width + 12, obs.y + 50);
        ctx.lineTo(obs.x + obs.width, obs.y + 90);
        ctx.fill();
        
        // Snow cap
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y);
        ctx.lineTo(obs.x + obs.width, obs.y);
        ctx.lineTo(obs.x + obs.width, obs.y + 15);
        ctx.lineTo(obs.x + obs.width/2 + 5, obs.y + 25);
        ctx.lineTo(obs.x + 5, obs.y + 10);
        ctx.fill();
    }
    else if (obs.visualType === 'elevator') {
        // Metal elevator
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        // Caution stripes
        ctx.fillStyle = '#eab308';
        for(let i = 0; i < obs.height; i+= 30) {
            ctx.beginPath();
            ctx.moveTo(obs.x, obs.y + i);
            ctx.lineTo(obs.x + obs.width, obs.y + i + 15);
            ctx.lineTo(obs.x + obs.width, obs.y + i + 25);
            ctx.lineTo(obs.x, obs.y + i + 10);
            ctx.fill();
        }
        
        // Glass window
        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.fillRect(obs.x + 10, obs.y + 20, obs.width - 20, obs.height - 40);
    }
    else if (obs.visualType === 'vault_door') {
        // Giant vault door
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.strokeRect(obs.x + 4, obs.y + 4, obs.width - 8, obs.height - 8);
        
        // Glowy circular lock
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(obs.x + obs.width/2, obs.y + obs.height/2, 10, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#06b6d4';
        ctx.strokeRect(obs.x + 12, obs.y + obs.height/2 - 20, obs.width - 24, 40);
        ctx.shadowBlur = 0;
    }
    else {
        // Fallback default gradient
        const gradient = ctx.createLinearGradient(obs.x, obs.y, obs.x + obs.width, obs.y + obs.height);
        gradient.addColorStop(0, '#1e293b');
        gradient.addColorStop(1, '#0f172a');
        ctx.fillStyle = gradient;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }
    
    // Always draw a subtle Hitbox outline to maintain physics fairness and clarity
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
    ctx.setLineDash([]);
    ctx.restore();

    // Draw dimensions text
    ctx.fillStyle = 'rgba(248, 250, 252, 0.8)';
    ctx.font = '13px "Outfit", "Sarabun"';
    ctx.textAlign = 'center';
    
    const physicalHeight = (obs.height / PIXELS_PER_METER).toFixed(1);
    const physicalDist = ((obs.x - CANNON_BASE_X) / PIXELS_PER_METER).toFixed(1);
    
    // Position text dynamically based on what we added above the obstacle
    let textYOffset = -10;
    if (obs.visualType === 'ufo_cargo') textYOffset = -42;
    else if (obs.visualType === 'brick_tower') textYOffset = -18;

    ctx.fillText(`H: ${physicalHeight}m`, obs.x + obs.width / 2, obs.y + textYOffset);
    
    if (obs.y + obs.height >= GROUND_Y) {
        ctx.fillText(`X: ${physicalDist}m`, obs.x + obs.width / 2, obs.y + obs.height - 10);
    } else {
        ctx.fillText(`X: ${physicalDist}m`, obs.x + obs.width / 2, obs.y + obs.height + 18);
    }
}

function drawPortals(portals) {
    const pulse = Math.abs(Math.sin(Date.now() / 200)) * 4;
    
    // Draw Blue Entrance Portal
    ctx.save();
    ctx.shadowBlur = 10 + pulse;
    ctx.shadowColor = '#3b82f6';
    ctx.fillStyle = 'rgba(59, 130, 246, 0.25)';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(portals.blue.x, portals.blue.y, portals.blue.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Inner swirl
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(portals.blue.x, portals.blue.y, portals.blue.r * 0.6, Date.now() / 1000, Date.now() / 1000 + Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Draw Orange Exit Portal
    ctx.save();
    ctx.shadowBlur = 10 + pulse;
    ctx.shadowColor = '#f97316';
    ctx.fillStyle = 'rgba(249, 115, 22, 0.25)';
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(portals.orange.x, portals.orange.y, portals.orange.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Inner swirl
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(portals.orange.x, portals.orange.y, portals.orange.r * 0.6, -Date.now() / 1000, -Date.now() / 1000 + Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

function drawTarget(target) {
    const pulseFactor = 2 + Math.abs(Math.sin(Date.now() / 250)) * 4;
    ctx.shadowBlur = 8 + pulseFactor;
    ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
    
    // Apple Body
    ctx.fillStyle = '#ef4444'; // Red apple
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Apple reflection highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(target.x - target.radius*0.4, target.y - target.radius*0.3, target.radius*0.3, target.radius*0.15, -Math.PI/4, 0, Math.PI*2);
    ctx.fill();

    // Stem
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(target.x, target.y - target.radius + 2);
    ctx.quadraticCurveTo(target.x + 5, target.y - target.radius - 8, target.x + 10, target.y - target.radius - 10);
    ctx.stroke();

    // Leaf
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(target.x + 12, target.y - target.radius - 4, 8, 4, -Math.PI/6, 0, Math.PI*2);
    ctx.fill();
    
    // Support Stand
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(target.x, target.y + target.radius);
    ctx.lineTo(target.x, GROUND_Y);
    ctx.stroke();

    // Draw dimensions text
    ctx.fillStyle = 'rgba(245, 158, 11, 0.9)';
    ctx.font = '13px "Outfit", "Sarabun"';
    ctx.textAlign = 'center';
    
    const physicalDist = ((target.x - CANNON_BASE_X) / PIXELS_PER_METER).toFixed(1);
    
    if (target.y + target.radius < GROUND_Y - 5) {
        const physicalHeight = ((GROUND_Y - target.y) / PIXELS_PER_METER).toFixed(1);
        ctx.fillText(`H: ${physicalHeight}m`, target.x + 30, target.y + 10);
        ctx.fillText(`X: ${physicalDist}m`, target.x, GROUND_Y - 10);
    } else {
        ctx.fillText(`X: ${physicalDist}m`, target.x, target.y - target.radius - 10);
    }
}

function drawCannon() {
    const rad = angleDegrees * (Math.PI / 180);

    ctx.save();
    ctx.translate(CANNON_BASE_X, CANNON_BASE_Y);
    ctx.rotate(-rad);

    const barrelGrad = ctx.createLinearGradient(0, -12, CANNON_LENGTH, 12);
    barrelGrad.addColorStop(0, '#1e293b');
    barrelGrad.addColorStop(0.5, '#38bdf8');
    barrelGrad.addColorStop(1, '#0284c7');

    ctx.fillStyle = barrelGrad;
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'rgba(6, 182, 212, 0.4)';
    ctx.fillRect(0, -12, CANNON_LENGTH, 24);

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(CANNON_LENGTH - 4, -13, 4, 26);
    
    ctx.restore();

    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(CANNON_BASE_X, CANNON_BASE_Y, 26, Math.PI, 0);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(CANNON_BASE_X, CANNON_BASE_Y, 6, 0, Math.PI * 2);
    ctx.fill();
}

function drawProjectile(ball) {
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#06b6d4';

    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
}

function drawPrediction() {
    const rad = angleDegrees * (Math.PI / 180);
    const muzzleX = CANNON_BASE_X + CANNON_LENGTH * Math.cos(rad);
    const muzzleY = CANNON_BASE_Y - CANNON_LENGTH * Math.sin(rad);

    let x = muzzleX;
    let y = muzzleY;

    // Apply projectile characteristics to speed/drag prediction
    let speed = launchSpeed;
    let dragMultiplier = 1.0;
    
    if (selectedProjectile === "steel") {
        speed = launchSpeed * 0.8;
        dragMultiplier = 0.0;
    } else if (selectedProjectile === "pingpong") {
        dragMultiplier = 2.2;
    } else if (selectedProjectile === "bouncy") {
        dragMultiplier = 0.8;
    }

    let vx = speed * Math.cos(rad);
    let vy = -speed * Math.sin(rad);

    const stepDt = 0.05;
    const lvl = LEVELS[currentLevelIndex];
    const gVal = GRAVITY_PRESETS[activePlanetKey].gVal;

    let maxPredictionTime = 0;
    if (currentLevelIndex === 0) {
        maxPredictionTime = 10.0;
    } else if (currentLevelIndex === 1 || currentLevelIndex === 2) {
        maxPredictionTime = 0.5;
    } else {
        maxPredictionTime = 0;
    }

    if (maxPredictionTime <= 0) return;

    ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let t = 0; t < maxPredictionTime; t += stepDt) {
        // apply wind prediction
        const windAcceleration = currentWind * dragMultiplier;
        vx += windAcceleration * stepDt;
        vy += gVal * stepDt;

        x += vx * stepDt;
        y += vy * stepDt;

        ctx.lineTo(x, y);

        if (y + BALL_RADIUS >= GROUND_Y) {
            break;
        }

        if (lvl.obstacle && !lvl.obstacle.moving) {
            const obs = lvl.obstacle;
            if (x + BALL_RADIUS >= obs.x && x - BALL_RADIUS <= obs.x + obs.width && 
                y + BALL_RADIUS >= obs.y && y - BALL_RADIUS <= obs.y + obs.height) {
                break;
            }
        }
    }
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawPastTrails() {
    ctx.lineWidth = 1.5;
    for (let path of pastPaths) {
        ctx.strokeStyle = path.color;
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let pt of path.points) {
            ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
    }
}

function drawParticles() {
    for (let p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// --- Start the Game on DOM Load ---
window.addEventListener('DOMContentLoaded', () => {
    init();
});
