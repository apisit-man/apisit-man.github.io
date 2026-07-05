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
        name: "ด่าน 1: เป้าหมายบนพื้น (ง่าย)",
        target: { x: 800, y: 466, radius: 24 },
        obstacle: null,
        portals: null,
        windLocked: true, // Level 1 is always calm
        description: "ปรับมุมยิงเป้าหมายที่ตั้งอยู่บนพื้นหญ้าตรงหน้า"
    },
    {
        id: 2,
        name: "ด่าน 2: เป้าหมายบนอากาศ (ปานกลาง)",
        target: { x: 830, y: 220, radius: 20 },
        obstacle: null,
        portals: null,
        windLocked: false,
        description: "เป้าหมายลอยสูงขึ้น ปรับมุมชันและคำนึงถึงทิศทางลม"
    },
    {
        id: 3,
        name: "ด่าน 3: สิ่งกีดขวาง (ยาก)",
        target: { x: 820, y: 466, radius: 20 },
        obstacle: { x: 450, y: 220, width: 40, height: 270, moving: false },
        portals: null,
        windLocked: false,
        description: "เป้าหมายหลบอยู่หลังกำแพงกั้นตรงกลาง ต้องยิงวิถีโค้งย้อยข้าม"
    },
    {
        id: 4,
        name: "ด่าน 4: กำแพงเคลื่อนไหว (ท้าทาย)",
        target: { x: 840, y: 466, radius: 20 },
        obstacle: { 
            x: 460, 
            y: 250, 
            width: 40, 
            height: 240, 
            moving: true, 
            minY: 100, 
            maxY: 320, 
            dir: 1, 
            speed: 140 
        },
        portals: null,
        windLocked: false,
        description: "กำแพงขยับขึ้นลงแนวตั้ง เล็งและกะจังหวะยิงกระสุนให้ข้ามช่องว่าง"
    },
    {
        id: 5,
        name: "ด่าน 5: ประตูมิติวาร์ป (ขั้นสูง)",
        target: { x: 860, y: 280, radius: 20 },
        obstacle: { x: 740, y: 300, width: 30, height: 190 }, // small barrier protecting target
        portals: { 
            blue: { x: 380, y: 360, r: 24 }, 
            orange: { x: 680, y: 160, r: 24 } 
        },
        windLocked: false,
        description: "ยิงผ่านประตูมิติสีฟ้าเพื่อวาร์ปกระสุนมาออกทางประตูสีส้มเข้าเป้าหมาย"
    }
];

// --- Audio Effects ---
const winSound = new Audio('cheer.wav');

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
const nextLevelBtn = document.getElementById('nextLevelBtn');
const retryLevelBtn = document.getElementById('retryLevelBtn');
const restartGameBtn = document.getElementById('restartGameBtn');
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
        currentWind = 0;
        hudWind.textContent = "💨 0.0 m/s";
    } else {
        // Random wind speed between -18 m/s (left) and +18 m/s (right)
        // In px/s^2, scaled by 6: -108 to +108
        const windVal = -15 + Math.random() * 30; 
        currentWind = windVal * VELOCITY_SCALE;
        const dirSymbol = windVal >= 0 ? "➔" : "⬅";
        hudWind.textContent = `💨 ${Math.abs(windVal).toFixed(1)} m/s ${dirSymbol}`;
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

// --- Event Handlers Setup ---
function setupEventListeners() {
    // Planetary Select changes
    gravityPreset.addEventListener('change', (e) => {
        activePlanetKey = e.target.value;
        runTheoreticalCalculation();
    });

    // Slider Aiming (Angle)
    angleSlider.addEventListener('input', (e) => {
        angleDegrees = parseInt(e.target.value);
        updateAngleUI();
    });

    // Slider Velocity (Speed)
    velocitySlider.addEventListener('input', (e) => {
        const mps = parseInt(e.target.value);
        velocityVal.textContent = `${mps} m/s`;
        hudVelocity.textContent = `${mps} m/s`;
        launchSpeed = mps * VELOCITY_SCALE; // conversion scale mapping
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
    if (levelClearedOverlay.classList.contains('active') || 
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
        justTeleported: false
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
        if (activeBall.y >= GROUND_Y) {
            groundCollision = true;
            collided = true;
        }

        // Obstacle check
        if (obstacleState) {
            const obs = obstacleState;
            if (activeBall.x >= obs.x && activeBall.x <= obs.x + obs.width &&
                activeBall.y >= obs.y && activeBall.y <= obs.y + obs.height) {
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
    winMessage.textContent = `ชนะด่าน ${LEVELS[currentLevelIndex].id}!`;

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

    drawPastTrails();
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
    const gradient = ctx.createLinearGradient(obs.x, obs.y, obs.x + obs.width, obs.y + obs.height);
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = gradient;
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(244, 63, 94, 0.4)';
    ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
    ctx.shadowBlur = 0;
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
    ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
    
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#0b0f19';
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.radius * 0.65, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.radius * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(target.x, target.y + target.radius);
    ctx.lineTo(target.x, GROUND_Y);
    ctx.stroke();
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
    if (ball.trail.length > 1) {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(ball.trail[0].x, ball.trail[0].y);
        for (let pt of ball.trail) {
            ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
    }

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

    ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(x, y);

    const stepDt = 0.05;
    const lvl = LEVELS[currentLevelIndex];
    const gVal = GRAVITY_PRESETS[activePlanetKey].gVal;

    for (let t = 0; t < 3.5; t += stepDt) {
        // apply wind prediction
        const windAcceleration = currentWind * dragMultiplier;
        vx += windAcceleration * stepDt;
        vy += gVal * stepDt;

        x += vx * stepDt;
        y += vy * stepDt;

        ctx.lineTo(x, y);

        if (y >= GROUND_Y) {
            break;
        }

        if (lvl.obstacle && !lvl.obstacle.moving) {
            const obs = lvl.obstacle;
            if (x >= obs.x && x <= obs.x + obs.width && y >= obs.y && y <= obs.y + obs.height) {
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
