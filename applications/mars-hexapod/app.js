import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BodyLeveler } from './leveler.js';
import { MarsTerrain } from './terrain.js';
import { HexapodRobot, HexapodGait } from './robot.js';
import { SoundEngine } from './audio.js';
import { createMarsEnvironmentMap } from './materials.js';

/**
 * Mars Hexapod Explorer - Main Application Controller
 * Dr. Apisit Tongchai - STEM Educational Robotics WebGL Simulation
 */
class MarsGameApp {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.canvas = document.getElementById('webgl-canvas');

    // Timing & Engine
    this.clock = new THREE.Clock();
    this.audio = new SoundEngine();

    // Input state
    this.keys = {};
    this.joystickVector = new THREE.Vector2(0, 0);
    this.joystickActive = false;

    // Movement & Kinematics
    this.inputVector = new THREE.Vector3();
    this.moveSpeed = 6.2;      // m/s
    this.turnSpeed = 1.8;      // rad/s
    this.currentSpeed = 0;
    this.currentTurnRate = 0;
    this.battery = 100.0;       // %
    this.solarCharging = 0.0;  // kW

    // Mission State
    this.collectedSamples = new Set();
    this.totalSamples = 4;
    this.missionComplete = false;
    this.missionStartTime = Date.now();
    this.stabilityWarnings = 0;
    this.lastCollisionAlertTime = 0;
    this.collisionAlertTimer = null;

    // Camera modes & spherical coordinates for 360° interactive view
    this.cameraModes = ['orbit-follow', 'top-down', 'mast-cam', 'inspect'];
    this.cameraModeIndex = 0;
    this.cameraMode = this.cameraModes[this.cameraModeIndex]; // 'orbit-follow' by default

    this.camAzimuth = 0;         // current horizontal angle relative to robot heading
    this.targetCamAzimuth = 0;
    this.camElevation = 0.38;     // current elevation angle (pitch)
    this.targetCamElevation = 0.38;
    this.camDistance = 8.5;       // current distance from robot center
    this.targetCamDistance = 8.5;

    // Pointer drag & gesture tracking
    this.isPointerDown = false;
    this.lastPointerX = 0;
    this.lastPointerY = 0;
    this.touchPinchStartDist = 0;
    this.touchPinchStartCamDist = 8.5;

    // Scene setup
    this.initScene();
    this.initEntities();
    this.initControls();
    this.initUI();
    this.bindEvents();

    // Start loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initScene() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Martian Atmosphere
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x130a08); // Dark reddish Martian twilight
    this.scene.fog = new THREE.FogExp2(0xc0542a, 0.009); // Mars atmospheric dust haze

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    this.camera.position.set(0, 8, -12);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    // Set Procedural Mars HDR Environment Map for Realistic Metallic Specular Reflections
    const marsEnvMap = createMarsEnvironmentMap(this.renderer);
    if (marsEnvMap) {
      this.scene.environment = marsEnvMap;
    }

    // 4. Orbit Controls (for inspection mode)
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.05;
    this.orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
    this.orbitControls.minDistance = 2.5;
    this.orbitControls.maxDistance = 60;
    this.orbitControls.enabled = false;

    // 5. Lighting
    // Warm Sun on Mars (low intensity compared to Earth)
    const sunLight = new THREE.DirectionalLight(0xffeedd, 2.3);
    sunLight.position.set(80, 110, -60);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 300;
    sunLight.shadow.camera.left = -40;
    sunLight.shadow.camera.right = 40;
    sunLight.shadow.camera.top = 40;
    sunLight.shadow.camera.bottom = -40;
    sunLight.shadow.bias = -0.0005;
    this.scene.add(sunLight);
    this.sunLight = sunLight;

    // Ambient fill (dust reflection)
    const hemiLight = new THREE.HemisphereLight(0xff9966, 0x442211, 0.9);
    this.scene.add(hemiLight);

    // Starfield for deep space look
    const starGeom = new THREE.BufferGeometry();
    const starCount = 600;
    const starCoords = [];
    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 400;
      starCoords.push(
        r * Math.sin(phi) * Math.cos(theta),
        Math.abs(r * Math.cos(phi)) + 20, // Keep in upper hemisphere
        r * Math.sin(phi) * Math.sin(theta)
      );
    }
    starGeom.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, transparent: true, opacity: 0.8 });
    this.stars = new THREE.Points(starGeom, starMat);
    this.scene.add(this.stars);
  }

  initEntities() {
    // 1. Procedural Terrain & Mission Targets
    this.terrain = new MarsTerrain(this.scene);

    // 2. ARES-6 Hexapod Robot
    this.hexapod = new HexapodRobot(this.scene);

    // Spawn robot centered in exploration field facing forward (+Z)
    const spawnX = 0;
    const spawnZ = 0;
    const spawnY = this.terrain.getHeight(spawnX, spawnZ);
    this.hexapod.position.set(spawnX, spawnY, spawnZ);
    this.hexapod.rotation.y = 0;

    // Immediately place camera behind robot on load
    this.camera.position.set(spawnX, spawnY + 3.2, spawnZ - 7.5);
    this.camera.lookAt(spawnX, spawnY + 0.9, spawnZ);
    this.orbitControls.target.set(spawnX, spawnY + 0.9, spawnZ);

    // 3. Gait Kinematics Controller with acoustic footstep integration
    this.gait = new HexapodGait(this.hexapod, this.terrain, this.audio);

    // 4. BodyLeveler Controller (Snippet 1 conformance)
    this.leveler = new BodyLeveler(this.hexapod);
  }

  initControls() {
    // Keyboard listeners
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      this.audio.init();

      if (e.code === 'KeyL') this.toggleLeveler();
      if (e.code === 'KeyG') this.toggleGait();
      if (e.code === 'KeyC') this.toggleCameraMode();
      if (e.code === 'KeyM') this.toggleMute();
      if (e.code === 'KeyH') this.toggleInspector();
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Touch / Virtual Joystick handling for mobile & tablet
    const joystickZone = document.getElementById('joystick-zone');
    const joystickKnob = document.getElementById('joystick-knob');
    if (joystickZone && joystickKnob) {
      let touchId = null;
      let startX = 0;
      let startY = 0;
      const maxRadius = 45;

      const handleStart = (clientX, clientY, id) => {
        touchId = id;
        this.joystickActive = true;
        this.audio.init();
        const rect = joystickZone.getBoundingClientRect();
        startX = rect.left + rect.width / 2;
        startY = rect.top + rect.height / 2;
        handleMove(clientX, clientY);
      };

      const handleMove = (clientX, clientY) => {
        let dx = clientX - startX;
        let dy = clientY - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > maxRadius) {
          dx = (dx / dist) * maxRadius;
          dy = (dy / dist) * maxRadius;
        }

        joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
        // Normalize: x is turning (-1 to 1), y is forward/backward (-1 to 1)
        this.joystickVector.set(dx / maxRadius, -dy / maxRadius);
      };

      const handleEnd = () => {
        touchId = null;
        this.joystickActive = false;
        joystickKnob.style.transform = 'translate(0px, 0px)';
        this.joystickVector.set(0, 0);
      };

      joystickZone.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const t = e.changedTouches[0];
        handleStart(t.clientX, t.clientY, t.identifier);
      }, { passive: false });

      window.addEventListener('touchmove', (e) => {
        if (!this.joystickActive) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          if (t.identifier === touchId) {
            handleMove(t.clientX, t.clientY);
            break;
          }
        }
      }, { passive: false });

      window.addEventListener('touchend', (e) => {
        if (!this.joystickActive) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === touchId) {
            handleEnd();
            break;
          }
        }
      });
    }

    // Pointer / Mouse interaction on canvas for 360° terrain & rover viewing
    const canvas = this.canvas || this.renderer.domElement;

    canvas.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      this.isPointerDown = true;
      this.lastPointerX = e.clientX;
      this.lastPointerY = e.clientY;
      this.audio.init();
      if (canvas.setPointerCapture) {
        try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.isPointerDown) return;
      const dx = e.clientX - this.lastPointerX;
      const dy = e.clientY - this.lastPointerY;
      this.lastPointerX = e.clientX;
      this.lastPointerY = e.clientY;

      // Rotate azimuth (horizontal) and elevation (vertical)
      this.targetCamAzimuth -= dx * 0.0055;
      this.targetCamElevation += dy * 0.0045;
      // Clamp elevation so camera cannot flip upside down
      this.targetCamElevation = Math.max(0.06, Math.min(Math.PI / 2 - 0.04, this.targetCamElevation));
    });

    const endPointer = (e) => {
      this.isPointerDown = false;
      if (canvas.releasePointerCapture && e.pointerId !== undefined) {
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      }
    };
    window.addEventListener('pointerup', endPointer);
    window.addEventListener('pointercancel', endPointer);

    // Mouse wheel zoom
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 1.12 : 0.89;
      this.targetCamDistance = Math.max(3.0, Math.min(38.0, this.targetCamDistance * zoomFactor));
    }, { passive: false });

    // Touch pinch-to-zoom on mobile/tablet canvas
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        this.touchPinchStartDist = Math.sqrt(dx * dx + dy * dy);
        this.touchPinchStartCamDist = this.targetCamDistance;
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && this.touchPinchStartDist > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ratio = this.touchPinchStartDist / Math.max(dist, 1);
        this.targetCamDistance = Math.max(3.0, Math.min(38.0, this.touchPinchStartCamDist * ratio));
      }
    }, { passive: true });
  }

  initUI() {
    // Cache DOM HUD elements
    this.ui = {
      pitchVal: document.getElementById('hud-pitch-val'),
      rollVal: document.getElementById('hud-roll-val'),
      horizonBar: document.getElementById('hud-horizon-bar'),
      stabilityVal: document.getElementById('hud-stability-val'),
      stabilityBar: document.getElementById('hud-stability-bar'),
      altitudeVal: document.getElementById('hud-altitude-val'),
      speedVal: document.getElementById('hud-speed-val'),
      batteryVal: document.getElementById('hud-battery-val'),
      batteryBar: document.getElementById('hud-battery-bar'),
      solarVal: document.getElementById('hud-solar-val'),
      sampleCounter: document.getElementById('hud-sample-count'),
      levelerBtn: document.getElementById('btn-toggle-leveler'),
      levelerStatus: document.getElementById('hud-leveler-status'),
      gaitBtn: document.getElementById('btn-toggle-gait'),
      gaitStatus: document.getElementById('hud-gait-status'),
      cameraBtn: document.getElementById('btn-toggle-cam'),
      camBtnText: document.getElementById('hud-cam-btn-text'),
      zoomInBtn: document.getElementById('btn-zoom-in'),
      zoomOutBtn: document.getElementById('btn-zoom-out'),
      camResetBtn: document.getElementById('btn-cam-reset'),
      muteBtn: document.getElementById('btn-toggle-audio'),
      sampleModal: document.getElementById('sample-modal'),
      sampleTitle: document.getElementById('sample-title'),
      sampleDesc: document.getElementById('sample-desc'),
      sampleFact: document.getElementById('sample-fact'),
      victoryModal: document.getElementById('victory-modal'),
      legDots: [
        document.getElementById('leg-0'),
        document.getElementById('leg-1'),
        document.getElementById('leg-2'),
        document.getElementById('leg-3'),
        document.getElementById('leg-4'),
        document.getElementById('leg-5')
      ],
      minimapCanvas: document.getElementById('minimap-canvas'),
      warningToast: document.getElementById('warning-toast')
    };

    this.minimapCtx = this.ui.minimapCanvas ? this.ui.minimapCanvas.getContext('2d') : null;
    this.drawMinimap();
    this.updateHUD();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });

    // Button event bindings
    if (this.ui.levelerBtn) {
      this.ui.levelerBtn.addEventListener('click', () => this.toggleLeveler());
    }
    if (this.ui.gaitBtn) {
      this.ui.gaitBtn.addEventListener('click', () => this.toggleGait());
    }
    if (this.ui.cameraBtn) {
      this.ui.cameraBtn.addEventListener('click', () => this.toggleCameraMode());
    }
    if (this.ui.zoomInBtn) {
      this.ui.zoomInBtn.addEventListener('click', () => this.zoomIn());
    }
    if (this.ui.zoomOutBtn) {
      this.ui.zoomOutBtn.addEventListener('click', () => this.zoomOut());
    }
    if (this.ui.camResetBtn) {
      this.ui.camResetBtn.addEventListener('click', () => this.resetCamera());
    }
    if (this.ui.muteBtn) {
      this.ui.muteBtn.addEventListener('click', () => this.toggleMute());
    }

    const btnInspector = document.getElementById('btn-inspector');
    if (btnInspector) {
      btnInspector.addEventListener('click', () => this.toggleInspector());
    }

    const btnBriefing = document.getElementById('btn-briefing');
    if (btnBriefing) {
      btnBriefing.addEventListener('click', () => {
        const modal = document.getElementById('briefing-modal');
        if (modal) modal.classList.toggle('hidden');
      });
    }

    const closeBtns = document.querySelectorAll('.modal-close');
    closeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-target');
        const modal = document.getElementById(targetId);
        if (modal) modal.classList.add('hidden');
      });
    });
  }

  toggleLeveler() {
    this.leveler.enabled = !this.leveler.enabled;
    const isEn = this.leveler.enabled;
    if (this.ui.levelerStatus) {
      this.ui.levelerStatus.textContent = isEn ? 'ON (ACTIVE)' : 'OFF (DISABLED)';
      this.ui.levelerStatus.className = isEn ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold';
    }
    if (this.ui.levelerBtn) {
      this.ui.levelerBtn.classList.toggle('border-emerald-500', isEn);
      this.ui.levelerBtn.classList.toggle('border-rose-500', !isEn);
    }
    this.audio.playScan();
  }

  toggleGait() {
    const nextMode = this.gait.mode === 'tripod' ? 'wave' : 'tripod';
    this.gait.setMode(nextMode);
    const isTripod = nextMode === 'tripod';

    if (this.ui.gaitStatus) {
      this.ui.gaitStatus.textContent = isTripod ? 'TRIPOD (FAST)' : 'WAVE (STABLE)';
      this.ui.gaitStatus.className = isTripod ? 'text-cyan-400 font-bold' : 'text-amber-400 font-bold';
    }
    this.audio.playScan();
  }

  zoomIn() {
    this.targetCamDistance = Math.max(3.0, this.targetCamDistance * 0.82);
    this.audio.playScan();
  }

  zoomOut() {
    this.targetCamDistance = Math.min(38.0, this.targetCamDistance * 1.22);
    this.audio.playScan();
  }

  resetCamera() {
    this.targetCamAzimuth = 0;
    this.targetCamElevation = 0.38;
    this.targetCamDistance = 8.5;
    this.audio.playScan();
  }

  toggleCameraMode() {
    this.cameraModeIndex = (this.cameraModeIndex + 1) % this.cameraModes.length;
    this.cameraMode = this.cameraModes[this.cameraModeIndex];

    const isInspect = this.cameraMode === 'inspect';
    this.orbitControls.enabled = isInspect;
    if (isInspect) {
      const lookTarget = this.hexapod.position.clone().add(new THREE.Vector3(0, 0.95, 0));
      this.orbitControls.target.copy(lookTarget);
    }

    const modeLabels = {
      'orbit-follow': 'CAM: อิสระ (C)',
      'top-down': 'CAM: มุมสูง (C)',
      'mast-cam': 'CAM: เสายาน (C)',
      'inspect': 'CAM: ตรวจสภาพ (C)'
    };

    const labelText = modeLabels[this.cameraMode] || 'CAM (C)';
    if (this.ui.camBtnText) {
      this.ui.camBtnText.textContent = labelText;
    } else if (this.ui.cameraBtn) {
      this.ui.cameraBtn.textContent = `🎥 ${labelText}`;
    }

    this.audio.playScan();
  }

  toggleMute() {
    const muted = this.audio.toggleMute();
    if (this.ui.muteBtn) {
      this.ui.muteBtn.textContent = muted ? '🔇 AUDIO: OFF' : '🔊 AUDIO: ON';
    }
  }

  toggleInspector() {
    const modal = document.getElementById('inspector-modal');
    if (modal) modal.classList.toggle('hidden');
  }

  getInputVector() {
    let moveFwd = 0;
    let turn = 0;

    // Keyboard inputs
    if (this.keys['KeyW'] || this.keys['ArrowUp']) moveFwd += 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) moveFwd -= 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) turn -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) turn += 1;

    // Virtual Joystick inputs
    if (this.joystickActive) {
      moveFwd += this.joystickVector.y;
      turn += this.joystickVector.x;
    }

    // Clamp
    moveFwd = Math.max(-1, Math.min(1, moveFwd));
    turn = Math.max(-1, Math.min(1, turn));

    return { moveFwd, turn };
  }

  updateRoverPhysics(dt) {
    const { moveFwd, turn } = this.getInputVector();

    // Gait speed multiplier: Wave is slower but rock-steady
    const gaitSpeedFactor = this.gait.mode === 'tripod' ? 1.0 : 0.65;

    // Target linear speed and angular turn rate
    const targetSpeed = moveFwd * this.moveSpeed * gaitSpeedFactor;
    const targetTurnRate = turn * this.turnSpeed * gaitSpeedFactor;

    this.currentSpeed += (targetSpeed - this.currentSpeed) * 0.14;
    this.currentTurnRate += (targetTurnRate - this.currentTurnRate) * 0.18;

    // Apply rotation (yaw) from smoothed turn rate
    if (Math.abs(this.currentTurnRate) > 0.01) {
      this.hexapod.rotation.y += this.currentTurnRate * dt;
    }

    // Heading vector
    let forwardDir = new THREE.Vector3(
      Math.sin(this.hexapod.rotation.y),
      0,
      Math.cos(this.hexapod.rotation.y)
    );

    // Tentative target position before collision resolution
    const tentativePos = this.hexapod.position.clone();
    if (Math.abs(this.currentSpeed) > 0.01) {
      tentativePos.addScaledVector(forwardDir, this.currentSpeed * dt);
      this.battery = Math.max(0, this.battery - dt * 0.25);
    }

    // =========================================================================
    // PHYSICAL OBSTACLE COLLISION & SLIDING DEFLECTION ("ชนและหลีกหนี")
    // =========================================================================
    const obstacles = [];

    // 1. MAV Lander base & landing struts
    if (this.terrain.lander) {
      obstacles.push({
        x: this.terrain.lander.position.x,
        z: this.terrain.lander.position.z,
        radius: 4.6, // Solid collision perimeter
        type: 'lander'
      });
    }

    // 2. Scattered basalt boulders
    if (this.terrain.rocks && this.terrain.rocks.length > 0) {
      for (let i = 0; i < this.terrain.rocks.length; i++) {
        const r = this.terrain.rocks[i];
        obstacles.push({
          x: r.position.x,
          z: r.position.z,
          radius: r.radius,
          type: 'rock'
        });
      }
    }

    const roverRadius = 1.65; // Bounding radius of hexapod body and leg span
    let collisionDetected = false;

    // Multi-pass relaxation solver (prevents tunneling and handles rock clusters)
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        const dx = tentativePos.x - obs.x;
        const dz = tentativePos.z - obs.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        const minDist = obs.radius + roverRadius;

        if (dist < minDist && dist > 0.001) {
          collisionDetected = true;

          // Normal vector pointing from obstacle to rover
          const nx = dx / dist;
          const nz = dz / dist;

          // 1. Position Resolution: Push rover outside the obstacle perimeter
          tentativePos.x = obs.x + nx * minDist;
          tentativePos.z = obs.z + nz * minDist;

          // 2. Sliding Deflection ("หลีกหนี"):
          // Tangent vector along obstacle surface contour
          const dotNormal = forwardDir.x * nx + forwardDir.z * nz;

          if (dotNormal < 0) {
            // Heading into obstacle: calculate tangent and glide along perimeter
            const tx = -nz;
            const tz = nx;
            const dotTangent = forwardDir.x * tx + forwardDir.z * tz;
            const tangentSign = dotTangent >= 0 ? 1 : -1;

            // Apply evasive deflection yaw steering away from obstacle ("หลีกหนี")
            const evasionTorque = tangentSign * 2.6 * dt;
            this.hexapod.rotation.y += evasionTorque;

            // Recalculate forward direction
            forwardDir.set(
              Math.sin(this.hexapod.rotation.y),
              0,
              Math.cos(this.hexapod.rotation.y)
            );

            // Impact absorption deceleration
            this.currentSpeed *= 0.86;
          }
        }
      }
    }

    // Trigger physical impact audio and telemetry toast
    if (collisionDetected) {
      const now = Date.now();
      if (now - this.lastCollisionAlertTime > 750) {
        this.lastCollisionAlertTime = now;
        this.audio.playCollision();
        this.showCollisionAlert();

        // Mechanical shudder: simulate bumper tactile impact on body leveler
        if (this.leveler) {
          this.leveler.currentPitch += (Math.random() - 0.5) * 0.05;
          this.leveler.currentRoll += (Math.random() - 0.5) * 0.05;
        }
      }
    }

    // Apply finalized position to rover
    this.hexapod.position.x = tentativePos.x;
    this.hexapod.position.z = tentativePos.z;

    // Dynamic ground elevation tracking
    const groundY = this.terrain.getHeight(this.hexapod.position.x, this.hexapod.position.z);
    this.hexapod.position.y += (groundY - this.hexapod.position.y) * 0.15;

    // Solar recharge (higher elevation = clearer sunlight)
    const altitude = this.hexapod.position.y;
    this.solarCharging = Math.max(0.1, 0.4 + (altitude / 5.0) * 0.3);
    this.battery = Math.min(100, this.battery + this.solarCharging * dt * 0.12);

    // Audio motor whine based on combined linear drive & turn effort
    const driveIntensity = Math.max(
      Math.abs(this.currentSpeed) / this.moveSpeed,
      Math.abs(this.currentTurnRate) / this.turnSpeed
    );
    this.audio.updateMotor(driveIntensity);

    // Rover input vector for telemetry tracking
    this.inputVector.set(
      Math.sin(this.hexapod.rotation.y) * this.currentSpeed,
      0,
      Math.cos(this.hexapod.rotation.y) * this.currentSpeed
    );
  }

  showCollisionAlert() {
    if (!this.ui.warningToast) return;
    const titleEl = document.getElementById('warning-title');
    const descEl = document.getElementById('warning-desc');

    if (titleEl) titleEl.textContent = '🛡️ ป้องกันการชน: ระบบหลบหลีกอัตโนมัติทำงาน (DEFLECTION ACTIVE)';
    if (descEl) descEl.textContent = 'ตรวจพบหินบะซอลต์/ฐานยาน - ระบบกลไกทำการเบี่ยงทิศทางหลบหลีกรอบสิ่งกีดขวาง';
    this.ui.warningToast.classList.remove('hidden');

    if (this.collisionAlertTimer) clearTimeout(this.collisionAlertTimer);
    this.collisionAlertTimer = setTimeout(() => {
      if (this.leveler && this.leveler.tiltAngleDeg <= 28) {
        this.ui.warningToast.classList.add('hidden');
      }
    }, 1300);
  }

  checkMissions() {
    const roverPos = this.hexapod.position;

    // 1. Science Sample detection
    this.terrain.samples.forEach((sample) => {
      if (!sample.collected) {
        const dist = roverPos.distanceTo(sample.position);
        if (dist <= sample.triggerRadius) {
          this.collectSample(sample);
        }
      }
    });

    // 2. MAV Lander extraction check
    if (this.terrain.lander) {
      const distToLander = roverPos.distanceTo(this.terrain.lander.position);
      if (distToLander <= this.terrain.lander.radius && this.collectedSamples.size === this.totalSamples && !this.missionComplete) {
        this.completeMission();
      }
    }
  }

  collectSample(sample) {
    sample.collected = true;
    this.collectedSamples.add(sample.id);

    // Visual effect: shrink beacon core and turn off pillar
    sample.coreMesh.scale.set(0.2, 0.2, 0.2);
    sample.group.children.forEach((c) => {
      if (c.material && c.material.opacity) c.material.opacity = 0.15;
    });

    this.audio.playScan();

    // Update HUD count
    if (this.ui.sampleCounter) {
      this.ui.sampleCounter.textContent = `${this.collectedSamples.size}/${this.totalSamples}`;
    }

    // Show Sample Modal with Science facts
    if (this.ui.sampleTitle) this.ui.sampleTitle.textContent = sample.thaiName;
    if (this.ui.sampleDesc) this.ui.sampleDesc.textContent = sample.description;
    if (this.ui.sampleFact) this.ui.sampleFact.textContent = sample.stemFact;
    if (this.ui.sampleModal) this.ui.sampleModal.classList.remove('hidden');
  }

  completeMission() {
    this.missionComplete = true;
    this.audio.playVictory();

    const elapsedSec = Math.round((Date.now() - this.missionStartTime) / 1000);
    const min = Math.floor(elapsedSec / 60);
    const sec = elapsedSec % 60;
    const timeStr = `${min}:${sec < 10 ? '0' : ''}${sec}`;

    const victoryTimeEl = document.getElementById('victory-time');
    const victoryStabilityEl = document.getElementById('victory-stability');
    const victoryBatteryEl = document.getElementById('victory-battery');

    if (victoryTimeEl) victoryTimeEl.textContent = timeStr;
    if (victoryStabilityEl) victoryStabilityEl.textContent = `${this.leveler.stabilityIndex}%`;
    if (victoryBatteryEl) victoryBatteryEl.textContent = `${Math.round(this.battery)}%`;

    if (this.ui.victoryModal) {
      this.ui.victoryModal.classList.remove('hidden');
    }
  }

  updateHUD() {
    const pitchDeg = (this.leveler.currentPitch * 180 / Math.PI).toFixed(1);
    const rollDeg = (this.leveler.currentRoll * 180 / Math.PI).toFixed(1);

    if (this.ui.pitchVal) this.ui.pitchVal.textContent = `${pitchDeg}°`;
    if (this.ui.rollVal) this.ui.rollVal.textContent = `${rollDeg}°`;

    // Artificial horizon bar translation & rotation
    if (this.ui.horizonBar) {
      const translateY = this.leveler.currentPitch * 45;
      const rotateDeg = -this.leveler.currentRoll * (180 / Math.PI);
      this.ui.horizonBar.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) rotate(${rotateDeg}deg)`;
    }

    // Stability Index gauge
    const stab = this.leveler.stabilityIndex;
    if (this.ui.stabilityVal) this.ui.stabilityVal.textContent = `${stab}%`;
    if (this.ui.stabilityBar) {
      this.ui.stabilityBar.style.width = `${stab}%`;
      this.ui.stabilityBar.className = stab > 70 ? 'h-full bg-emerald-500' : (stab > 35 ? 'h-full bg-amber-500' : 'h-full bg-rose-500');
    }

    // Warning alert if rover tilt exceeds safe threshold
    if (this.leveler.tiltAngleDeg > 28) {
      if (this.ui.warningToast) {
        this.ui.warningToast.classList.remove('hidden');
      }
      this.audio.playAlert();
    } else {
      if (this.ui.warningToast) {
        this.ui.warningToast.classList.add('hidden');
      }
    }

    // Telemetry stats
    if (this.ui.altitudeVal) this.ui.altitudeVal.textContent = `${this.hexapod.position.y.toFixed(1)} m`;
    const effectiveDisplaySpeed = Math.hypot(this.currentSpeed, this.currentTurnRate * 1.6);
    if (this.ui.speedVal) this.ui.speedVal.textContent = `${effectiveDisplaySpeed.toFixed(1)} m/s`;
    if (this.ui.batteryVal) this.ui.batteryVal.textContent = `${Math.round(this.battery)}%`;
    if (this.ui.batteryBar) this.ui.batteryBar.style.width = `${Math.round(this.battery)}%`;
    if (this.ui.solarVal) this.ui.solarVal.textContent = `+${this.solarCharging.toFixed(2)} kW`;

    // 6-Leg stance status indicators
    this.hexapod.legs.forEach((leg, idx) => {
      const dot = this.ui.legDots[idx];
      if (dot) {
        dot.className = leg.isGrounded ? 'leg-dot grounded' : 'leg-dot swing';
      }
    });

    // Active Mission Elapsed Timer
    const elapsedSec = Math.floor((Date.now() - this.missionStartTime) / 1000);
    const m = Math.floor(elapsedSec / 60);
    const s = elapsedSec % 60;
    const timerStr = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    const timerEl = document.getElementById('hud-mission-timer');
    if (timerEl) timerEl.textContent = timerStr;

    // Minimap update
    this.drawMinimap();
  }

  drawMinimap() {
    if (!this.minimapCtx) return;
    const ctx = this.minimapCtx;
    const w = this.ui.minimapCanvas.width;
    const h = this.ui.minimapCanvas.height;
    const scale = w / 260; // 260m terrain scale

    ctx.clearRect(0, 0, w, h);

    // Draw crater boundary circle
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 85 * scale, 0, Math.PI * 2);
    ctx.stroke();

    // Draw Rock Obstacles as subtle tactical blips
    if (this.terrain.rocks) {
      ctx.fillStyle = 'rgba(180, 83, 9, 0.45)';
      for (let i = 0; i < this.terrain.rocks.length; i++) {
        const rock = this.terrain.rocks[i];
        const rx = w / 2 + rock.position.x * scale;
        const rz = h / 2 - rock.position.z * scale;
        ctx.beginPath();
        ctx.arc(rx, rz, Math.max(1.2, rock.radius * scale * 0.7), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw MAV Lander at actual location (0, -16)
    const landerZ = this.terrain.lander ? this.terrain.lander.position.z : -16;
    const lx = w / 2 + 0 * scale;
    const lz = h / 2 - landerZ * scale;
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(lx, lz, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Lander safety zone ring
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(lx, lz, 8.0 * scale, 0, Math.PI * 2);
    ctx.stroke();

    // Draw Samples
    this.terrain.samples.forEach((sample) => {
      const sx = w / 2 + sample.position.x * scale;
      const sz = h / 2 - sample.position.z * scale;
      ctx.fillStyle = sample.collected ? '#64748b' : '#' + sample.color.toString(16).padStart(6, '0');
      ctx.beginPath();
      ctx.arc(sx, sz, sample.collected ? 2.5 : 4.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Rover Position & Direction Needle
    const rx = w / 2 + this.hexapod.position.x * scale;
    const rz = h / 2 - this.hexapod.position.z * scale;

    ctx.save();
    ctx.translate(rx, rz);
    ctx.rotate(this.hexapod.rotation.y);

    // Heading triangle pointing up (+Z)
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(4, 4);
    ctx.lineTo(-4, 4);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  updateCamera() {
    // Smoothly damp spherical coordinates towards targets
    this.camAzimuth += (this.targetCamAzimuth - this.camAzimuth) * 0.12;
    this.camElevation += (this.targetCamElevation - this.camElevation) * 0.12;
    this.camDistance += (this.targetCamDistance - this.camDistance) * 0.15;

    const lookTarget = this.hexapod.position.clone().add(new THREE.Vector3(0, 0.95, 0));

    if (this.cameraMode === 'orbit-follow') {
      // 1. Dynamic 360° Spherical Follow Cam around Rover
      const roverYaw = this.hexapod.rotation.y;
      const totalAngle = roverYaw + this.camAzimuth;
      const hDist = this.camDistance * Math.cos(this.camElevation);
      const vDist = this.camDistance * Math.sin(this.camElevation);

      const offsetX = -Math.sin(totalAngle) * hDist;
      const offsetZ = -Math.cos(totalAngle) * hDist;
      const offsetY = Math.max(0.6, vDist);

      const desiredPos = lookTarget.clone().add(new THREE.Vector3(offsetX, offsetY, offsetZ));

      // Terrain anti-clipping: ensure camera never dips below Martian ground
      const minTerrainY = this.terrain.getHeight(desiredPos.x, desiredPos.z) + 1.15;
      if (desiredPos.y < minTerrainY) {
        desiredPos.y = minTerrainY;
      }

      this.camera.position.lerp(desiredPos, 0.12);
      this.camera.lookAt(lookTarget);

    } else if (this.cameraMode === 'top-down') {
      // 2. High-Altitude Reconnaissance Satellite / Drone View
      const altitude = Math.max(18.0, this.camDistance * 2.2);
      const roverYaw = this.hexapod.rotation.y;
      const desiredPos = this.hexapod.position.clone().add(new THREE.Vector3(
        Math.sin(roverYaw) * 2.0,
        altitude,
        Math.cos(roverYaw) * 2.0
      ));
      this.camera.position.lerp(desiredPos, 0.12);
      this.camera.lookAt(lookTarget);

    } else if (this.cameraMode === 'mast-cam') {
      // 3. First-Person View from Rover Mast Head
      const roverYaw = this.hexapod.rotation.y;
      const fwd = new THREE.Vector3(Math.sin(roverYaw), 0, Math.cos(roverYaw));
      const mastPos = this.hexapod.position.clone().add(new THREE.Vector3(
        fwd.x * 0.45,
        1.35,
        fwd.z * 0.45
      ));
      const forwardTarget = mastPos.clone().add(new THREE.Vector3(
        fwd.x * 12.0,
        -0.9,
        fwd.z * 12.0
      ));
      this.camera.position.lerp(mastPos, 0.25);
      this.camera.lookAt(forwardTarget);

    } else if (this.cameraMode === 'inspect') {
      // 4. Free Orbit Inspection
      const delta = lookTarget.clone().sub(this.orbitControls.target);
      this.camera.position.add(delta);
      this.orbitControls.target.copy(lookTarget);
      this.orbitControls.update();
    }
  }

  /**
   * Main Simulation Loop
   * Contains exact integration of Snippet 1 & Snippet 2
   */
  animate() {
    requestAnimationFrame(this.animate);

    const dt = Math.min(this.clock.getDelta(), 0.1);
    const time = this.clock.getElapsedTime();

    // 1. Update Rover movement & input
    this.updateRoverPhysics(dt);

    // 2. Exact Snippet 2 Integration:
    if (this.gait && this.hexapod) {
      this.gait.update(dt, this.currentSpeed, this.currentTurnRate);

      // Collect world-space contact points of grounded stance legs
      const groundedContacts = [];
      this.hexapod.legs.forEach((leg) => {
        if (leg.isGrounded) {
          // Use authentic terrain contact coordinates, preventing
          // runaway positive feedback loop with robot.body elevation
          groundedContacts.push(leg.worldFootPos.clone());
        }
      });

      // Level chassis dynamically against the terrain slope (Snippet 1 execution)
      this.leveler.update(groundedContacts, this.gait.bodyHeight);
    }

    // 3. Update Terrain Beacons & Missions
    this.terrain.update(time);
    this.checkMissions();

    // 4. Update Camera & HUD
    this.updateCamera();
    this.updateHUD();

    // 5. Sun position tracking rover shadow
    if (this.sunLight) {
      this.sunLight.target.position.copy(this.hexapod.position);
      this.sunLight.target.updateMatrixWorld();
    }

    // 6. Render
    this.renderer.render(this.scene, this.camera);
  }
}

// Boot application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  new MarsGameApp();
});
