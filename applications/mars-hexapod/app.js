import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BodyLeveler } from './leveler.js';
import { MarsTerrain } from './terrain.js';
import { HexapodRobot, HexapodGait } from './robot.js';
import { SoundEngine } from './audio.js';
import { MarsDustSystem } from './dust.js';
import { WaterPhaseDiagram } from './phase-diagram.js';
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
    this.dpadState = { up: false, down: false, left: false, right: false };
    this.steerMode = 'camera'; // 'camera' (ตามมุมมองกล้อง) or 'rover' (ตามหัวหุ่น)
    this.touchControlsVisible = true;
    this.batterySaver = false;

    // Movement & Kinematics
    this.inputVector = new THREE.Vector3();
    this.moveSpeed = 6.2;      // m/s
    this.turnSpeed = 1.8;      // rad/s
    this.currentSpeed = 0;
    this.currentTurnRate = 0;
    this.battery = 100.0;       // %
    this.solarCharging = 0.0;  // kW

    // Mission & Planetary Inquiry State
    this.collectedSamples = new Set();
    this.totalSamples = 4;
    this.missionComplete = false;
    this.missionStartTime = Date.now();
    this.stabilityWarnings = 0;
    this.lastCollisionAlertTime = 0;
    this.collisionAlertTimer = null;
    this.lastSlipWarningTime = 0;
    this.levelerTrial = null;
    this.dust = null;
    this.phaseDiagram = null;

    // Scientific Inquiry State (CER Framework & In-situ Spectrometry)
    this.solarCosTheta = 0.88;
    this.investigation = {
      evidenceScore: 0,
      maxScore: 12,
      sampleResults: {},
      activeSample: null,
      correctCount: 0,
      spectrometerOpen: false
    };

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

  getAdaptivePixelRatio() {
    const isMobile = /Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 0 && (window.innerWidth <= 1024 || window.innerHeight <= 768));
    return isMobile ? Math.min(window.devicePixelRatio || 1, 1.6) : Math.min(window.devicePixelRatio || 1, 2.0);
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
    this.renderer.setPixelRatio(this.getAdaptivePixelRatio());
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

    // 3. Procedural Martian Dust Particle System (g_mars = 3.72 m/s²)
    this.dust = new MarsDustSystem(this.scene);

    // 4. Gait Kinematics Controller with acoustic footstep & dust puff integration
    this.gait = new HexapodGait(this.hexapod, this.terrain, this.audio, this.dust);

    // 5. BodyLeveler Controller (Snippet 1 conformance)
    this.leveler = new BodyLeveler(this.hexapod);
  }

  initControls() {
    // Keyboard listeners
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      this.audio.init();

      if (e.code === 'KeyR') this.toggleSteerMode();
      if (e.code === 'KeyL') this.toggleLeveler();
      if (e.code === 'KeyG') this.toggleGait();
      if (e.code === 'KeyE') this.toggleExperimentsModal();
      if (e.code === 'KeyC') this.toggleCameraMode();
      if (e.code === 'KeyF') this.toggleFullscreen();
      if (e.code === 'KeyM') this.toggleMute();
      if (e.code === 'KeyH') this.toggleInspector();

      // Visual indicator feedback on on-screen D-Pad buttons
      if (e.code === 'ArrowUp' || e.code === 'KeyW') document.getElementById('btn-dpad-up')?.classList.add('active');
      if (e.code === 'ArrowDown' || e.code === 'KeyS') document.getElementById('btn-dpad-down')?.classList.add('active');
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') document.getElementById('btn-dpad-left')?.classList.add('active');
      if (e.code === 'ArrowRight' || e.code === 'KeyD') document.getElementById('btn-dpad-right')?.classList.add('active');
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;

      if (e.code === 'ArrowUp' || e.code === 'KeyW') document.getElementById('btn-dpad-up')?.classList.remove('active');
      if (e.code === 'ArrowDown' || e.code === 'KeyS') document.getElementById('btn-dpad-down')?.classList.remove('active');
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') document.getElementById('btn-dpad-left')?.classList.remove('active');
      if (e.code === 'ArrowRight' || e.code === 'KeyD') document.getElementById('btn-dpad-right')?.classList.remove('active');
    });

    // 2. Virtual Joystick handling for mobile touch & desktop mouse
    const joystickZone = document.getElementById('joystick-zone');
    const joystickKnob = document.getElementById('joystick-knob');
    if (joystickZone && joystickKnob) {
      let activePointerId = null;
      let startX = 0;
      let startY = 0;
      const maxRadius = 45;

      const handleStart = (clientX, clientY, id) => {
        activePointerId = id;
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
        const dist = Math.hypot(dx, dy);

        if (dist > maxRadius) {
          dx = (dx / dist) * maxRadius;
          dy = (dy / dist) * maxRadius;
        }

        joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
        // Normalize: x is right/left (-1 to 1), y is forward/backward (-1 to 1)
        this.joystickVector.set(dx / maxRadius, -dy / maxRadius);
      };

      const handleEnd = () => {
        activePointerId = null;
        this.joystickActive = false;
        joystickKnob.style.transform = 'translate(0px, 0px)';
        this.joystickVector.set(0, 0);
      };

      // Pointer events (handles both mouse click/drag and touch)
      joystickZone.addEventListener('pointerdown', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('dpad-arrow')) return;
        e.preventDefault();
        handleStart(e.clientX, e.clientY, e.pointerId);
        if (joystickZone.setPointerCapture) {
          try { joystickZone.setPointerCapture(e.pointerId); } catch (_) {}
        }
      });

      window.addEventListener('pointermove', (e) => {
        if (!this.joystickActive || e.pointerId !== activePointerId) return;
        handleMove(e.clientX, e.clientY);
      });

      const endJoy = (e) => {
        if (e.pointerId === activePointerId) {
          handleEnd();
          if (joystickZone.releasePointerCapture) {
            try { joystickZone.releasePointerCapture(e.pointerId); } catch (_) {}
          }
        }
      };
      window.addEventListener('pointerup', endJoy);
      window.addEventListener('pointercancel', endJoy);

      // Touch fallback for older mobile browsers
      joystickZone.addEventListener('touchstart', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('dpad-arrow')) return;
        e.preventDefault();
        const t = e.changedTouches[0];
        handleStart(t.clientX, t.clientY, t.identifier);
      }, { passive: false });

      window.addEventListener('touchmove', (e) => {
        if (!this.joystickActive) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          if (t.identifier === activePointerId) {
            handleMove(t.clientX, t.clientY);
            break;
          }
        }
      }, { passive: false });

      window.addEventListener('touchend', (e) => {
        if (!this.joystickActive) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === activePointerId) {
            handleEnd();
            break;
          }
        }
      });
    }

    // 3. On-screen D-Pad arrow buttons (▲ ▼ ◀ ▶)
    const dpadButtons = [
      { id: 'btn-dpad-up', dir: 'up' },
      { id: 'btn-dpad-down', dir: 'down' },
      { id: 'btn-dpad-left', dir: 'left' },
      { id: 'btn-dpad-right', dir: 'right' }
    ];

    dpadButtons.forEach(({ id, dir }) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      const press = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dpadState[dir] = true;
        btn.classList.add('active');
        this.audio.init();
      };
      const release = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dpadState[dir] = false;
        btn.classList.remove('active');
      };

      btn.addEventListener('pointerdown', press);
      btn.addEventListener('pointerup', release);
      btn.addEventListener('pointercancel', release);
      btn.addEventListener('mouseleave', release);

      btn.addEventListener('touchstart', press, { passive: false });
      btn.addEventListener('touchend', release, { passive: false });
      btn.addEventListener('touchcancel', release, { passive: false });
    });

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
      solarCosVal: document.getElementById('hud-solar-cos'),
      solarAngleVal: document.getElementById('hud-solar-angle'),
      solarEffBar: document.getElementById('hud-solar-eff-bar'),
      solarStatus: document.getElementById('hud-solar-status'),
      sampleCounter: document.getElementById('hud-sample-count'),
      evidenceScoreVal: document.getElementById('hud-evidence-score'),
      evidenceBar: document.getElementById('hud-evidence-bar'),
      atmoBox: document.getElementById('hud-atmo-box'),
      btnExperimentsNav: document.getElementById('btn-experiments'),
      btnExperimentsDock: document.getElementById('btn-open-experiments'),
      steerBtn: document.getElementById('btn-toggle-steer'),
      steerBtnText: document.getElementById('hud-steer-btn-text'),
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
      // Spectrometer Inquiry Modal elements
      spectrometerModal: document.getElementById('spectrometer-modal'),
      specSiteBadge: document.getElementById('spec-site-badge'),
      specSampleName: document.getElementById('spec-sample-name'),
      specHydrationPill: document.getElementById('spec-hydration-pill'),
      specPeakLabel: document.getElementById('spec-peak-label'),
      specBar14: document.getElementById('spec-bar-14'),
      specVal14: document.getElementById('spec-val-14'),
      specBar19: document.getElementById('spec-bar-19'),
      specVal19: document.getElementById('spec-val-19'),
      specBarMetal: document.getElementById('spec-bar-metal'),
      specValMetal: document.getElementById('spec-val-metal'),
      specInstrumentReading: document.getElementById('spec-instrument-reading'),
      specInquiryPrompt: document.getElementById('spec-inquiry-prompt'),
      specChoicesContainer: document.getElementById('spec-choices-container'),
      specFeedback: document.getElementById('spec-feedback'),
      btnConfirmSample: document.getElementById('btn-confirm-sample'),
      // STEM Experiment & CER Modals
      levelerExpModal: document.getElementById('leveler-experiment-modal'),
      gaitExpModal: document.getElementById('gait-experiment-modal'),
      atmoModal: document.getElementById('atmo-modal'),
      cerReportModal: document.getElementById('cer-report-modal'),
      cerFinalScore: document.getElementById('cer-final-score'),
      cerAccuracyRate: document.getElementById('cer-accuracy-rate'),
      cerFinalTime: document.getElementById('cer-final-time'),
      cerRankTitle: document.getElementById('cer-rank-title'),
      legDots: [
        document.getElementById('leg-0'),
        document.getElementById('leg-1'),
        document.getElementById('leg-2'),
        document.getElementById('leg-3'),
        document.getElementById('leg-4'),
        document.getElementById('leg-5')
      ],
      minimapCanvas: document.getElementById('minimap-canvas'),
      warningToast: document.getElementById('warning-toast'),
      // Mobile Micro Ribbon & Collapsible Drawer elements
      mobileHudToggleBtn: document.getElementById('btn-mobile-hud-toggle'),
      ribbonHudToggleBtn: document.getElementById('btn-ribbon-hud-toggle'),
      closeMobileHudBtn: document.getElementById('btn-close-mobile-hud'),
      telemetryDrawer: document.getElementById('telemetry-drawer'),
      ribbonSpeed: document.getElementById('ribbon-speed-val'),
      ribbonBattery: document.getElementById('ribbon-battery-val'),
      ribbonSamples: document.getElementById('ribbon-sample-val'),
      ribbonTimer: document.getElementById('ribbon-timer-val'),
      // Integrated Nav Telemetry (Landscape / Widescreen)
      navSpeed: document.getElementById('nav-speed-val'),
      navBattery: document.getElementById('nav-battery-val'),
      navSamples: document.getElementById('nav-sample-val'),
      navTimer: document.getElementById('nav-timer-val'),
      // Fullscreen buttons & icons
      btnFullscreen: document.getElementById('btn-fullscreen'),
      fullscreenIcon: document.getElementById('fullscreen-icon'),
      fullscreenText: document.getElementById('fullscreen-text'),
      btnDockFullscreen: document.getElementById('btn-dock-fullscreen'),
      dockFullscreenIcon: document.getElementById('dock-fullscreen-icon'),
      btnRibbonFullscreen: document.getElementById('btn-ribbon-fullscreen'),
      ribbonFullscreenIcon: document.getElementById('ribbon-fullscreen-icon'),
      // Mobile Mode Center UI
      mobileMenuModal: document.getElementById('mobile-menu-modal'),
      btnMobileMenuNav: document.getElementById('btn-mobile-menu-toggle'),
      btnMobileMenuRibbon: document.getElementById('btn-ribbon-mobile-menu'),
      btnMobileModalFullscreen: document.getElementById('btn-mobile-modal-fullscreen'),
      mobileModalFsIcon: document.getElementById('mobile-modal-fs-icon'),
      mobileModalFsText: document.getElementById('mobile-modal-fs-text'),
      mobileModalFsStatus: document.getElementById('mobile-modal-fs-status'),
      mMenuSpeed: document.getElementById('m-menu-speed-val'),
      mMenuBattery: document.getElementById('m-menu-battery-val'),
      mMenuStability: document.getElementById('m-menu-stability-val'),
      mMenuSamples: document.getElementById('m-menu-samples-val'),
      mBtnSteer: document.getElementById('m-btn-steer'),
      mTileSteerVal: document.getElementById('m-tile-steer-val'),
      mBtnLeveler: document.getElementById('m-btn-leveler'),
      mTileLevelerVal: document.getElementById('m-tile-leveler-val'),
      mBtnGait: document.getElementById('m-btn-gait'),
      mTileGaitVal: document.getElementById('m-tile-gait-val'),
      mBtnCam: document.getElementById('m-btn-cam'),
      mTileCamVal: document.getElementById('m-tile-cam-val'),
      mBtnCamReset: document.getElementById('m-btn-cam-reset'),
      mBtnAudio: document.getElementById('m-btn-audio'),
      mTileAudioVal: document.getElementById('m-tile-audio-val'),
      btnToggleTouchControls: document.getElementById('btn-toggle-touch-controls'),
      lblTouchControlsState: document.getElementById('lbl-touch-controls-state'),
      btnToggleMobilePerf: document.getElementById('btn-toggle-mobile-perf'),
      lblMobilePerfState: document.getElementById('lbl-mobile-perf-state'),
      mBtnOpenExperiments: document.getElementById('m-btn-open-experiments'),
      mBtnOpenHud: document.getElementById('m-btn-open-hud'),
      mBtnOpenBriefing: document.getElementById('m-btn-open-briefing'),
      bottomDock: document.querySelector('.bottom-dock'),
      waypointLayer: document.getElementById('waypoint-markers-layer'),
      waypointHudBar: document.getElementById('waypoint-hud-bar')
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
      this.renderer.setPixelRatio(this.getAdaptivePixelRatio());
    });

    // Mobile Telemetry & Radar Drawer Toggle Handlers
    const toggleMobileDrawer = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (this.ui.telemetryDrawer) {
        this.ui.telemetryDrawer.classList.toggle('mobile-open');
        if (this.ui.telemetryDrawer.classList.contains('mobile-open')) {
          this.drawMinimap();
        }
      }
      this.audio.init();
    };

    const closeMobileDrawer = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (this.ui.telemetryDrawer) {
        this.ui.telemetryDrawer.classList.remove('mobile-open');
      }
    };

    if (this.ui.mobileHudToggleBtn) {
      this.ui.mobileHudToggleBtn.addEventListener('click', toggleMobileDrawer);
    }
    if (this.ui.ribbonHudToggleBtn) {
      this.ui.ribbonHudToggleBtn.addEventListener('click', toggleMobileDrawer);
    }
    if (this.ui.closeMobileHudBtn) {
      this.ui.closeMobileHudBtn.addEventListener('click', closeMobileDrawer);
    }

    // Close drawer if clicking the backdrop area outside panel cards
    if (this.ui.telemetryDrawer) {
      this.ui.telemetryDrawer.addEventListener('click', (e) => {
        if (e.target === this.ui.telemetryDrawer) {
          closeMobileDrawer(e);
        }
      });
    }

    // Button event bindings
    if (this.ui.steerBtn) {
      this.ui.steerBtn.addEventListener('click', () => this.toggleSteerMode());
    }
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
    if (this.ui.btnFullscreen) {
      this.ui.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
    }
    if (this.ui.btnDockFullscreen) {
      this.ui.btnDockFullscreen.addEventListener('click', () => this.toggleFullscreen());
    }
    if (this.ui.btnRibbonFullscreen) {
      this.ui.btnRibbonFullscreen.addEventListener('click', () => this.toggleFullscreen());
    }

    // Mobile Mode Center Event Listeners
    if (this.ui.btnMobileMenuNav) {
      this.ui.btnMobileMenuNav.addEventListener('click', () => this.toggleMobileMenu());
    }
    if (this.ui.btnMobileMenuRibbon) {
      this.ui.btnMobileMenuRibbon.addEventListener('click', () => this.toggleMobileMenu());
    }
    if (this.ui.btnMobileModalFullscreen) {
      this.ui.btnMobileModalFullscreen.addEventListener('click', () => this.toggleFullscreen());
    }
    if (this.ui.mBtnSteer) {
      this.ui.mBtnSteer.addEventListener('click', () => this.toggleSteerMode());
    }
    if (this.ui.mBtnLeveler) {
      this.ui.mBtnLeveler.addEventListener('click', () => this.toggleLeveler());
    }
    if (this.ui.mBtnGait) {
      this.ui.mBtnGait.addEventListener('click', () => this.toggleGait());
    }
    if (this.ui.mBtnCam) {
      this.ui.mBtnCam.addEventListener('click', () => this.toggleCameraMode());
    }
    if (this.ui.mBtnCamReset) {
      this.ui.mBtnCamReset.addEventListener('click', () => this.resetCamera());
    }
    if (this.ui.mBtnAudio) {
      this.ui.mBtnAudio.addEventListener('click', () => this.toggleMute());
    }
    if (this.ui.btnToggleTouchControls) {
      this.ui.btnToggleTouchControls.addEventListener('click', () => this.toggleTouchControls());
    }
    if (this.ui.btnToggleMobilePerf) {
      this.ui.btnToggleMobilePerf.addEventListener('click', () => this.toggleMobilePerformance());
    }
    if (this.ui.mBtnOpenExperiments) {
      this.ui.mBtnOpenExperiments.addEventListener('click', () => {
        this.closeMobileMenu();
        this.toggleExperimentsModal();
      });
    }
    if (this.ui.mBtnOpenHud) {
      this.ui.mBtnOpenHud.addEventListener('click', () => {
        this.closeMobileMenu();
        if (this.ui.telemetryDrawer) this.ui.telemetryDrawer.classList.toggle('mobile-open');
      });
    }
    if (this.ui.mBtnOpenBriefing) {
      this.ui.mBtnOpenBriefing.addEventListener('click', () => {
        this.closeMobileMenu();
        const modal = document.getElementById('briefing-modal');
        if (modal) modal.classList.toggle('hidden');
      });
    }

    const onFullscreenChange = () => {
      this.updateFullscreenUI();
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);
    document.addEventListener('MSFullscreenChange', onFullscreenChange);

    // STEM Inquiry Lab & Modals
    if (this.ui.btnExperimentsNav) {
      this.ui.btnExperimentsNav.addEventListener('click', () => this.toggleExperimentsModal());
    }
    if (this.ui.btnExperimentsDock) {
      this.ui.btnExperimentsDock.addEventListener('click', () => this.toggleExperimentsModal());
    }
    if (this.ui.atmoBox) {
      this.ui.atmoBox.addEventListener('click', () => this.openAtmoModal());
    }
    if (this.ui.btnConfirmSample) {
      this.ui.btnConfirmSample.addEventListener('click', () => this.confirmSampleCollection());
    }

    const btnTrialA = document.getElementById('btn-run-trial-a');
    if (btnTrialA) btnTrialA.addEventListener('click', () => this.runLevelerTrial('a'));

    const btnTrialB = document.getElementById('btn-run-trial-b');
    if (btnTrialB) btnTrialB.addEventListener('click', () => this.runLevelerTrial('b'));

    const btnExportCer = document.getElementById('btn-export-cer');
    if (btnExportCer) {
      btnExportCer.addEventListener('click', () => this.exportCERReport());
    }

    const btnSelectTripod = document.getElementById('btn-select-tripod');
    if (btnSelectTripod) btnSelectTripod.addEventListener('click', () => this.selectGait('tripod'));

    const btnSelectWave = document.getElementById('btn-select-wave');
    if (btnSelectWave) btnSelectWave.addEventListener('click', () => this.selectGait('wave'));

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
        if (targetId === 'spectrometer-modal') {
          this.investigation.spectrometerOpen = false;
        }
      });
    });

    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay && overlay.id !== 'welcome-modal') {
          overlay.classList.add('hidden');
          if (overlay.id === 'spectrometer-modal') {
            this.investigation.spectrometerOpen = false;
          }
        }
      });
    });
  }

  toggleSteerMode() {
    this.steerMode = this.steerMode === 'camera' ? 'rover' : 'camera';
    const isCam = this.steerMode === 'camera';
    const labelText = isCam ? 'STEER: มุมกล้อง (R)' : 'STEER: หัวหุ่น (R)';
    if (this.ui.steerBtnText) {
      this.ui.steerBtnText.textContent = labelText;
    } else if (this.ui.steerBtn) {
      this.ui.steerBtn.innerHTML = `<span>🕹️</span> <span>${labelText}</span>`;
    }
    this.updateMobileMenuUI();
    this.audio.playScan();
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
    this.updateMobileMenuUI();
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
    if (!isTripod) {
      this.showWaveEngagedToast();
    }
    this.updateMobileMenuUI();
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

    this.updateMobileMenuUI();
    this.audio.playScan();
  }

  toggleMute() {
    const muted = this.audio.toggleMute();
    if (this.ui.muteBtn) {
      this.ui.muteBtn.textContent = muted ? '🔇 AUDIO: OFF' : '🔊 AUDIO: ON';
    }
    this.updateMobileMenuUI();
  }

  toggleInspector() {
    const modal = document.getElementById('inspector-modal');
    if (modal) modal.classList.toggle('hidden');
  }

  isFullscreen() {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  toggleFullscreen() {
    this.audio.init();
    try {
      if (!this.isFullscreen()) {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
          docEl.requestFullscreen().catch((err) => {
            console.warn('requestFullscreen error:', err);
          });
        } else if (docEl.webkitRequestFullscreen) {
          docEl.webkitRequestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
          docEl.mozRequestFullScreen();
        } else if (docEl.msRequestFullscreen) {
          docEl.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch((err) => {
            console.warn('exitFullscreen error:', err);
          });
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
    }
    this.audio.playScan();
    setTimeout(() => this.updateFullscreenUI(), 100);
  }

  updateFullscreenUI() {
    const isFull = this.isFullscreen();
    document.body.classList.toggle('is-fullscreen', isFull);
    const icon = isFull ? '🗗' : '⛶';
    const label = isFull ? 'ย่อจอ' : 'เต็มจอ';
    const title = isFull ? 'ออกจากโหมดเต็มจอ (F หรือ Esc)' : 'เปิดโหมดเต็มจอ (F)';

    if (this.ui.fullscreenIcon) this.ui.fullscreenIcon.textContent = icon;
    if (this.ui.fullscreenText) this.ui.fullscreenText.textContent = label;
    if (this.ui.btnFullscreen) {
      this.ui.btnFullscreen.title = title;
      this.ui.btnFullscreen.classList.toggle('active', isFull);
    }

    if (this.ui.dockFullscreenIcon) this.ui.dockFullscreenIcon.textContent = icon;
    if (this.ui.btnDockFullscreen) {
      this.ui.btnDockFullscreen.title = title;
      this.ui.btnDockFullscreen.classList.toggle('active', isFull);
    }

    if (this.ui.ribbonFullscreenIcon) this.ui.ribbonFullscreenIcon.textContent = icon;
    if (this.ui.btnRibbonFullscreen) {
      this.ui.btnRibbonFullscreen.title = isFull ? 'ออกจากโหมดเต็มจอ' : 'เปิดโหมดเต็มจอ';
      this.ui.btnRibbonFullscreen.classList.toggle('active', isFull);
    }

    // Update Mobile Mode Center Fullscreen Hero Card
    if (this.ui.mobileModalFsIcon) this.ui.mobileModalFsIcon.textContent = icon;
    if (this.ui.mobileModalFsText) {
      this.ui.mobileModalFsText.textContent = isFull ? 'ออกจากโหมดเต็มจอ (Windowed)' : 'โหมดเต็มจอ (Fullscreen Mode)';
    }
    if (this.ui.mobileModalFsStatus) {
      this.ui.mobileModalFsStatus.textContent = isFull ? 'เต็มจออยู่ (Active)' : 'แตะเพื่อเปิด';
    }
    if (this.ui.btnMobileModalFullscreen) {
      this.ui.btnMobileModalFullscreen.classList.toggle('active', isFull);
    }
  }

  openMobileMenu() {
    if (!this.ui.mobileMenuModal) return;
    this.audio.init();
    this.audio.playScan();
    this.updateFullscreenUI();
    this.updateMobileMenuUI();
    this.ui.mobileMenuModal.classList.remove('hidden');
  }

  closeMobileMenu() {
    if (this.ui.mobileMenuModal) {
      this.ui.mobileMenuModal.classList.add('hidden');
    }
  }

  toggleMobileMenu() {
    if (!this.ui.mobileMenuModal) return;
    if (this.ui.mobileMenuModal.classList.contains('hidden')) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  updateMobileMenuUI() {
    if (this.ui.mTileSteerVal) {
      this.ui.mTileSteerVal.textContent = this.steerMode === 'camera' ? 'มุมกล้อง' : 'หัวหุ่น';
    }
    if (this.ui.mTileLevelerVal) {
      const isEn = this.leveler.enabled;
      this.ui.mTileLevelerVal.textContent = isEn ? 'ON' : 'OFF';
      this.ui.mTileLevelerVal.className = isEn ? 'm-tile-tag text-emerald-400' : 'm-tile-tag text-rose-400';
    }
    if (this.ui.mTileGaitVal) {
      const isTripod = this.gait.mode === 'tripod';
      this.ui.mTileGaitVal.textContent = isTripod ? 'Tripod' : 'Wave';
      this.ui.mTileGaitVal.className = isTripod ? 'm-tile-tag text-cyan-400' : 'm-tile-tag text-amber-400';
    }
    if (this.ui.mTileCamVal) {
      const camNames = {
        'orbit-follow': 'อิสระ 360°',
        'top-down': 'มุมสูงโดรน',
        'mast-cam': 'เสายาน POV',
        'inspect': 'ตรวจสภาพ'
      };
      this.ui.mTileCamVal.textContent = camNames[this.cameraMode] || 'กล้อง';
    }
    if (this.ui.mTileAudioVal) {
      const isMuted = this.audio.isMuted;
      this.ui.mTileAudioVal.textContent = isMuted ? 'OFF' : 'ON';
      this.ui.mTileAudioVal.className = isMuted ? 'm-tile-tag text-rose-400' : 'm-tile-tag text-emerald-400';
    }
    if (this.ui.lblTouchControlsState && this.ui.btnToggleTouchControls) {
      this.ui.lblTouchControlsState.textContent = this.touchControlsVisible ? 'แสดงปุ่ม' : 'ซ่อนปุ่ม';
      this.ui.btnToggleTouchControls.classList.toggle('active', this.touchControlsVisible);
    }
    if (this.ui.lblMobilePerfState && this.ui.btnToggleMobilePerf) {
      this.ui.lblMobilePerfState.textContent = this.batterySaver ? 'ประหยัดแบตเตอรี่' : 'มาตรฐาน (คมชัด)';
      this.ui.btnToggleMobilePerf.classList.toggle('active', !this.batterySaver);
    }
  }

  toggleTouchControls() {
    this.touchControlsVisible = !this.touchControlsVisible;
    if (this.ui.bottomDock) {
      this.ui.bottomDock.classList.toggle('touch-hidden', !this.touchControlsVisible);
    }
    if (this.ui.lblTouchControlsState && this.ui.btnToggleTouchControls) {
      this.ui.lblTouchControlsState.textContent = this.touchControlsVisible ? 'แสดงปุ่ม' : 'ซ่อนปุ่ม';
      this.ui.btnToggleTouchControls.classList.toggle('active', this.touchControlsVisible);
    }
    this.audio.playScan();
  }

  toggleMobilePerformance() {
    this.batterySaver = !this.batterySaver;
    const ratio = this.batterySaver ? 1.0 : this.getAdaptivePixelRatio();
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (this.ui.lblMobilePerfState && this.ui.btnToggleMobilePerf) {
      this.ui.lblMobilePerfState.textContent = this.batterySaver ? 'ประหยัดแบตเตอรี่' : 'มาตรฐาน (คมชัด)';
      this.ui.btnToggleMobilePerf.classList.toggle('active', !this.batterySaver);
    }
    this.audio.playScan();
  }

  getInputVector() {
    let rawY = 0; // +1 = Forward / Up on screen, -1 = Backward / Down on screen
    let rawX = 0; // +1 = Right on screen, -1 = Left on screen

    // Keyboard inputs
    if (this.keys['KeyW'] || this.keys['ArrowUp']) rawY += 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) rawY -= 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) rawX -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) rawX += 1;

    // Virtual Joystick inputs
    if (this.joystickActive) {
      rawY += this.joystickVector.y;
      rawX += this.joystickVector.x;
    }

    // On-screen D-Pad buttons inputs
    if (this.dpadState) {
      if (this.dpadState.up) rawY += 1;
      if (this.dpadState.down) rawY -= 1;
      if (this.dpadState.left) rawX -= 1;
      if (this.dpadState.right) rawX += 1;
    }

    // Clamp total magnitude to 1
    const mag = Math.hypot(rawX, rawY);
    if (mag > 1) {
      rawX /= mag;
      rawY /= mag;
    }

    // Spacebar Emergency Brake
    if (this.keys['Space']) {
      rawX = 0;
      rawY = 0;
    }

    return { rawX, rawY };
  }

  updateRoverPhysics(dt) {
    const { rawX, rawY } = this.getInputVector();
    const gaitSpeedFactor = this.gait.mode === 'tripod' ? 1.0 : 0.65;
    const inputMag = Math.hypot(rawX, rawY);

    let targetSpeed = 0;
    let targetTurnRate = 0;

    if (this.steerMode === 'camera') {
      // =========================================================================
      // 1. CAMERA-RELATIVE STEERING (มุมมองของผู้ใช้ / ตามมุมมองกล้อง)
      // =========================================================================
      if (inputMag > 0.05) {
        // Project camera forward vector onto the horizontal XZ plane
        const camForward = new THREE.Vector3();
        this.camera.getWorldDirection(camForward);
        camForward.y = 0;

        if (camForward.lengthSq() < 0.0001) {
          // If camera is pitched straight down (e.g. top-down satellite view)
          const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
          camForward.set(camUp.x, 0, camUp.z);
        }
        camForward.normalize();

        // Camera right vector on horizontal plane
        const camRight = new THREE.Vector3(camForward.z, 0, -camForward.x);

        // Desired world-space movement vector from user camera view
        const desiredDir = new THREE.Vector3();
        desiredDir.addScaledVector(camForward, rawY); // Up/Down on screen
        desiredDir.addScaledVector(camRight, rawX);   // Right/Left on screen

        if (desiredDir.lengthSq() > 0.001) {
          desiredDir.normalize();
          const targetYaw = Math.atan2(desiredDir.x, desiredDir.z);

          // Calculate shortest angular difference between current heading and target
          let diffYaw = targetYaw - this.hexapod.rotation.y;
          diffYaw = Math.atan2(Math.sin(diffYaw), Math.cos(diffYaw));

          // Proportional steering turn rate towards target heading
          const turnFactor = Math.max(-1.0, Math.min(1.0, diffYaw * 2.8));
          targetTurnRate = turnFactor * this.turnSpeed * gaitSpeedFactor;

          // Alignment factor: how closely current chassis heading points to target
          const alignment = Math.max(0.0, Math.cos(diffYaw));
          // Accelerate forward as heading aligns; turn in place when pointing away
          targetSpeed = inputMag * this.moveSpeed * gaitSpeedFactor * Math.pow(alignment, 1.25);
        }
      }
    } else {
      // =========================================================================
      // 2. ROVER-CENTRIC STEERING (ตามหัวหุ่นยนต์ / Classic Tank Controls)
      // =========================================================================
      targetSpeed = rawY * this.moveSpeed * gaitSpeedFactor;
      targetTurnRate = rawX * this.turnSpeed * gaitSpeedFactor;
    }

    // Dynamic slope traction & static stability margin evaluation
    const groundNormal = this.terrain.getNormal(this.hexapod.position.x, this.hexapod.position.z);
    const slopeCos = Math.max(0, Math.min(1, groundNormal.y));
    const slopeRad = Math.acos(slopeCos);
    const slopeDeg = slopeRad * (180 / Math.PI);

    if (slopeDeg > 13.0) {
      if (this.gait.mode === 'tripod') {
        // Tripod gait (50% duty cycle, 3-leg polygon): severe traction loss & sliding on steep dunes
        const slip = Math.min(0.65, (slopeDeg - 13.0) / 18.0);
        targetSpeed *= (1.0 - slip * 0.85);

        // Micro-shudder jitter reflecting foot slippage on loose regolith
        if (this.leveler && Math.abs(this.currentSpeed) > 0.05) {
          this.leveler.currentPitch += (Math.random() - 0.5) * 0.04 * slip;
          this.leveler.currentRoll += (Math.random() - 0.5) * 0.04 * slip;
        }

        // Stability Index degradation
        this.leveler.stabilityIndex = Math.max(8, this.leveler.stabilityIndex - Math.round(slip * 35));

        // Telemetry slip warning
        const now = Date.now();
        if (now - this.lastSlipWarningTime > 2800) {
          this.lastSlipWarningTime = now;
          this.showSlipAlert(slopeDeg);
          this.audio.playTractionSlip();
        }
      } else {
        // Wave gait (83.3% duty cycle, 5-leg polygon): maximum static stability margin and climbing grip
        this.leveler.stabilityIndex = Math.min(100, this.leveler.stabilityIndex + 8);
      }
    }

    // Fast deceleration if emergency braking with Space
    if (this.keys['Space']) {
      this.currentSpeed *= 0.76;
      this.currentTurnRate *= 0.76;
    } else {
      const accelFactor = this.steerMode === 'camera' ? 0.16 : 0.14;
      const turnAccelFactor = this.steerMode === 'camera' ? 0.22 : 0.18;
      this.currentSpeed += (targetSpeed - this.currentSpeed) * accelFactor;
      this.currentTurnRate += (targetTurnRate - this.currentTurnRate) * turnAccelFactor;
    }

    // Apply rotation (yaw) from smoothed turn rate
    if (Math.abs(this.currentTurnRate) > 0.008) {
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

    // Physics-based Solar Irradiance Model: P = P_max * max(0, n_panel · L_sun) * (1 - tau_dust)
    // Dynamic normal of rover chassis based on leveler pitch/roll and rover heading
    const panelNormal = new THREE.Vector3(0, 1, 0);
    panelNormal.applyEuler(new THREE.Euler(this.leveler.currentPitch, 0, this.leveler.currentRoll, 'ZXY'));
    panelNormal.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.hexapod.rotation.y);
    panelNormal.normalize();

    const sunDir = new THREE.Vector3(80, 110, -60).normalize();
    this.solarCosTheta = Math.max(0, panelNormal.dot(sunDir));
    const dustTau = 0.10; // 10% atmospheric dust attenuation
    this.solarCharging = 0.50 * this.solarCosTheta * (1.0 - dustTau);
    this.battery = Math.min(100, this.battery + this.solarCharging * dt * 0.12);
    this.hexapod.updateSolarGlow(this.solarCosTheta);

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

  showSlipAlert(slopeDeg) {
    if (!this.ui.warningToast) return;
    const titleEl = document.getElementById('warning-title');
    const descEl = document.getElementById('warning-desc');
    if (titleEl) titleEl.textContent = `⚠️ ขาไถลลื่น: ลาดชันสูง ${slopeDeg.toFixed(0)}° (TRIPOD SLIP)`;
    if (descEl) descEl.textContent = 'โหมด Tripod (3 ขา) มีพื้นที่ฐานแคบเกินไปบนทางชัน! กด [G] สลับเป็น WAVE GAIT เพื่อกระจายน้ำหนัก 5 ขา';
    this.ui.warningToast.classList.remove('hidden');

    if (this.collisionAlertTimer) clearTimeout(this.collisionAlertTimer);
    this.collisionAlertTimer = setTimeout(() => {
      if (this.leveler && this.leveler.tiltAngleDeg <= 28) {
        this.ui.warningToast.classList.add('hidden');
      }
    }, 2500);
  }

  showWaveEngagedToast() {
    if (!this.ui.warningToast) return;
    const titleEl = document.getElementById('warning-title');
    const descEl = document.getElementById('warning-desc');
    if (titleEl) titleEl.textContent = '🧗 เปิดโหมด WAVE GAIT: ยึดเกาะพื้นผิวด้วย 5 ขา (MAX STABILITY)';
    if (descEl) descEl.textContent = 'Duty Cycle 83.3% ขยายรูปหลายเหลี่ยมฐานรองรับ ให้แรงฉุดสูงสุดสำหรับปีนเนินทรายและสันผา';
    this.ui.warningToast.classList.remove('hidden');

    if (this.collisionAlertTimer) clearTimeout(this.collisionAlertTimer);
    this.collisionAlertTimer = setTimeout(() => {
      this.ui.warningToast.classList.add('hidden');
    }, 2200);
  }

  checkMissions() {
    const roverPos = this.hexapod.position;

    // 1. Science Sample detection
    this.terrain.samples.forEach((sample) => {
      if (!sample.collected && !this.investigation.spectrometerOpen) {
        const dist = roverPos.distanceTo(sample.position);
        if (dist <= sample.triggerRadius) {
          this.openSpectrometerModal(sample);
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

  openSpectrometerModal(sample) {
    if (this.investigation.spectrometerOpen || sample.collected) return;
    this.investigation.spectrometerOpen = true;
    this.investigation.activeSample = sample;

    // Halt forward rover speed slightly to stabilize for scanning
    this.currentSpeed *= 0.3;

    if (!this.investigation.sampleResults[sample.id]) {
      this.investigation.sampleResults[sample.id] = {
        attempts: 0,
        solved: false,
        earnedPoints: 0
      };
    }

    if (this.ui.specSiteBadge) this.ui.specSiteBadge.textContent = sample.id.toUpperCase();
    if (this.ui.specSampleName) this.ui.specSampleName.textContent = sample.thaiName;
    if (this.ui.specHydrationPill) {
      this.ui.specHydrationPill.textContent = `💧 น้ำ: ${sample.spectralData.hydrationIndex}%`;
      this.ui.specHydrationPill.className = sample.spectralData.hydrationIndex >= 70 ? 'water-evidence-pill high' : (sample.spectralData.hydrationIndex >= 30 ? 'water-evidence-pill medium' : 'water-evidence-pill low');
    }

    if (this.ui.specPeakLabel) this.ui.specPeakLabel.textContent = `แถบดูดกลืนหลัก: ${sample.spectralData.keyAbsorption}`;
    if (this.ui.specBar14) this.ui.specBar14.style.width = `${Math.round(sample.spectralData.absorption14 * 100)}%`;
    if (this.ui.specVal14) this.ui.specVal14.textContent = `-${sample.spectralData.absorption14.toFixed(2)}`;
    if (this.ui.specBar19) this.ui.specBar19.style.width = `${Math.round(sample.spectralData.absorption19 * 100)}%`;
    if (this.ui.specVal19) this.ui.specVal19.textContent = `-${sample.spectralData.absorption19.toFixed(2)}`;
    if (this.ui.specBarMetal) this.ui.specBarMetal.style.width = `${Math.round(sample.spectralData.absorptionMetal * 100)}%`;
    if (this.ui.specValMetal) this.ui.specValMetal.textContent = `-${sample.spectralData.absorptionMetal.toFixed(2)}`;

    if (this.ui.specInstrumentReading) this.ui.specInstrumentReading.textContent = sample.spectralData.readingText;
    if (this.ui.specInquiryPrompt) this.ui.specInquiryPrompt.textContent = sample.inquiryQuestion.prompt;

    // Render choice options
    if (this.ui.specChoicesContainer) {
      this.ui.specChoicesContainer.innerHTML = '';
      const tags = ['ก', 'ข', 'ค'];
      sample.inquiryQuestion.choices.forEach((c, idx) => {
        const choiceCard = document.createElement('div');
        choiceCard.className = 'inquiry-choice-card';
        choiceCard.innerHTML = `
          <div class="choice-tag">${tags[idx]}</div>
          <div class="choice-text">${c.text}</div>
        `;
        choiceCard.addEventListener('click', () => this.handleChoiceSelection(sample, idx, choiceCard));
        this.ui.specChoicesContainer.appendChild(choiceCard);
      });
    }

    if (this.ui.specFeedback) {
      this.ui.specFeedback.className = 'hidden';
      this.ui.specFeedback.innerHTML = '';
    }

    if (this.ui.btnConfirmSample) {
      this.ui.btnConfirmSample.disabled = true;
      this.ui.btnConfirmSample.innerHTML = '🔒 กรุณาเลือกข้อสรุปทางวิทยาศาสตร์ที่ถูกต้อง';
    }

    if (this.ui.spectrometerModal) {
      this.ui.spectrometerModal.classList.remove('hidden');
    }
    this.audio.playScan();
  }

  handleChoiceSelection(sample, choiceIdx, cardEl) {
    const result = this.investigation.sampleResults[sample.id];
    if (result.solved) return; // already solved

    result.attempts++;
    const isCorrect = (choiceIdx === sample.inquiryQuestion.correctIndex);

    // Remove previous active styles on choices
    if (this.ui.specChoicesContainer) {
      const cards = this.ui.specChoicesContainer.querySelectorAll('.inquiry-choice-card');
      cards.forEach((c) => c.classList.remove('selected', 'incorrect'));
    }

    if (isCorrect) {
      result.solved = true;
      cardEl.classList.add('correct');

      // Points: 3 for first try, 2 for 2nd try, 1 for subsequent
      const earned = result.attempts === 1 ? sample.waterEvidencePoints : (result.attempts === 2 ? Math.max(1, sample.waterEvidencePoints - 1) : 1);
      result.earnedPoints = earned;
      this.investigation.evidenceScore += earned;
      if (result.attempts === 1) this.investigation.correctCount++;

      if (this.ui.specFeedback) {
        this.ui.specFeedback.className = 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 p-3 rounded-xl';
        this.ui.specFeedback.innerHTML = `
          <strong style="color: #4ade80;">✅ สรุปผลถูกต้องตามหลักฐานสเปกโตรมิเตอร์!</strong><br>
          ${sample.inquiryQuestion.explanation}<br>
          <span style="color: #38bdf8; font-weight: 800; font-family: var(--font-mono); margin-top: 4px; display: inline-block;">
            +${earned} คะแนนหลักฐานน้ำโบราณ (CER Evidence Score)
          </span>
        `;
        this.ui.specFeedback.classList.remove('hidden');
      }

      if (this.ui.btnConfirmSample) {
        this.ui.btnConfirmSample.disabled = false;
        this.ui.btnConfirmSample.innerHTML = `📥 บันทึกข้อมูลและเก็บตัวอย่าง (${sample.thaiName}) ➔`;
      }
      this.audio.playVictory();
    } else {
      cardEl.classList.add('incorrect');
      if (this.ui.specFeedback) {
        this.ui.specFeedback.className = 'bg-rose-950/70 border border-rose-500/40 text-rose-200 p-3 rounded-xl';
        this.ui.specFeedback.innerHTML = `
          <strong style="color: #f43f5e;">❌ ข้อสรุปยังไม่สอดคล้องกับหลักฐาน:</strong><br>
          สังเกตแถบดูดกลืนหลักที่ <strong>${sample.spectralData.keyAbsorption}</strong> และปริมาณน้ำในโครงสร้าง <strong>${sample.spectralData.hydrationIndex}%</strong> ลองทบทวนข้อสรุปอื่น
        `;
        this.ui.specFeedback.classList.remove('hidden');
      }
      this.audio.playCollision();
    }

    this.updateHUD();
  }

  confirmSampleCollection() {
    const sample = this.investigation.activeSample;
    if (!sample) return;

    sample.collected = true;
    this.collectedSamples.add(sample.id);

    // Visual effect: shrink beacon core and dim pillar
    if (sample.coreMesh) sample.coreMesh.scale.set(0.2, 0.2, 0.2);
    if (sample.group) {
      sample.group.children.forEach((c) => {
        if (c.material && c.material.opacity) c.material.opacity = 0.15;
      });
    }

    this.audio.playScan();

    if (this.ui.spectrometerModal) {
      this.ui.spectrometerModal.classList.add('hidden');
    }
    this.investigation.spectrometerOpen = false;

    this.updateHUD();

    if (this.collectedSamples.size === this.totalSamples) {
      this.audio.playVictory();
    }
  }

  toggleExperimentsModal() {
    if (this.ui.levelerExpModal) {
      this.ui.levelerExpModal.classList.toggle('hidden');
    }
    this.audio.playScan();
  }

  openAtmoModal() {
    if (this.ui.atmoModal) {
      this.ui.atmoModal.classList.remove('hidden');
      if (!this.phaseDiagram) {
        this.phaseDiagram = new WaterPhaseDiagram('atmo-phase-canvas');
      }
      if (this.phaseDiagram) {
        requestAnimationFrame(() => {
          this.phaseDiagram.initCanvasSize();
          this.phaseDiagram.syncUI();
          this.phaseDiagram.render();
        });
      }
    }
    this.audio.playScan();
  }

  openGaitExpModal() {
    if (this.ui.gaitExpModal) {
      this.ui.gaitExpModal.classList.remove('hidden');
    }
    this.audio.playScan();
  }

  selectGait(mode) {
    this.gait.setMode(mode);
    const isTripod = mode === 'tripod';
    if (this.ui.gaitStatus) {
      this.ui.gaitStatus.textContent = isTripod ? 'TRIPOD (FAST)' : 'WAVE (STABLE)';
      this.ui.gaitStatus.className = isTripod ? 'text-cyan-400 font-bold' : 'text-amber-400 font-bold';
    }
    if (!isTripod) {
      this.showWaveEngagedToast();
    }
    if (this.ui.gaitExpModal) {
      this.ui.gaitExpModal.classList.add('hidden');
    }
    this.audio.playScan();
  }

  runLevelerTrial(trial) {
    this.audio.playScan();
    const isTrialA = trial === 'a';

    // Set Leveler hardware state according to trial
    this.leveler.enabled = !isTrialA;
    if (this.ui.levelerStatus) {
      this.ui.levelerStatus.textContent = isTrialA ? 'OFF (TRIAL A)' : 'ON (ACTIVE TRIAL B)';
      this.ui.levelerStatus.className = isTrialA ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold';
    }

    const progressEl = document.getElementById('exp-telemetry-progress');
    const textEl = document.getElementById('exp-progress-text');
    const pctEl = document.getElementById('exp-progress-pct');
    if (progressEl) progressEl.classList.remove('hidden');
    if (textEl) textEl.textContent = `📡 กำลังบันทึกข้อมูลโทรมาตรการทรงตัวสด (${isTrialA ? 'Trial A: ปิดระบบ' : 'Trial B: เปิดระบบ'})...`;
    if (pctEl) pctEl.textContent = '0%';

    const statusEl = document.getElementById(isTrialA ? 'exp-status-a' : 'exp-status-b');
    if (statusEl) {
      statusEl.textContent = 'กำลังสุ่มวัดสด...';
      statusEl.style.color = '#38bdf8';
    }

    this.levelerTrial = {
      trial,
      duration: 3.5,
      elapsed: 0,
      samples: [],
      lastBeep: 0
    };
  }

  updateLevelerTrial(dt) {
    if (!this.levelerTrial) return;
    const t = this.levelerTrial;
    t.elapsed += dt;

    // Periodic telemetry beep every 0.6s
    if (t.elapsed - t.lastBeep > 0.6) {
      t.lastBeep = t.elapsed;
      this.audio.playFootstep();
    }

    // Dynamic ground terrain normal at current rover position
    const groundNormal = this.terrain.getNormal(this.hexapod.position.x, this.hexapod.position.z);
    const slopeDeg = Math.acos(Math.max(0, Math.min(1, groundNormal.y))) * (180 / Math.PI);

    // Current body tilt angle and stability margin
    let currentTilt = 0;
    if (this.leveler.tiltAngleDeg !== undefined) {
      currentTilt = this.leveler.tiltAngleDeg;
    } else {
      currentTilt = Math.hypot(this.leveler.currentPitch, this.leveler.currentRoll) * (180 / Math.PI);
    }

    const currentStab = this.leveler.stabilityIndex !== undefined ? this.leveler.stabilityIndex : 100;

    // Simulate micro-variation or sample actual physics
    if (t.trial === 'a') {
      // Unlevelled chassis experiences full slope tilt + un-damped terrain bumps
      const sampleTilt = Math.max(16.5, slopeDeg * 0.95 + (Math.random() - 0.5) * 4.2);
      const sampleStab = Math.max(15, Math.min(45, currentStab - 50 + (Math.random() - 0.5) * 12));
      t.samples.push({ tilt: sampleTilt, stab: sampleStab, slope: Math.max(18, slopeDeg) });
    } else {
      // Active Leveler successfully flattens body with 0.08 low-pass damping
      const sampleTilt = Math.max(1.8, Math.min(5.2, currentTilt + (Math.random() - 0.5) * 0.6));
      const sampleStab = Math.max(85, Math.min(99, 93 + (Math.random() - 0.5) * 4));
      t.samples.push({ tilt: sampleTilt, stab: sampleStab, slope: Math.max(18, slopeDeg) });
    }

    const pct = Math.min(100, Math.round((t.elapsed / t.duration) * 100));
    const pctEl = document.getElementById('exp-progress-pct');
    if (pctEl) pctEl.textContent = `${pct}%`;

    if (t.elapsed >= t.duration) {
      this.finishLevelerTrial();
    }
  }

  finishLevelerTrial() {
    if (!this.levelerTrial) return;
    const t = this.levelerTrial;
    this.levelerTrial = null;

    const progressEl = document.getElementById('exp-telemetry-progress');
    if (progressEl) progressEl.classList.add('hidden');

    const n = t.samples.length || 1;
    let sumTilt = 0;
    let sumStab = 0;
    let sumSlope = 0;
    t.samples.forEach(s => {
      sumTilt += s.tilt;
      sumStab += s.stab;
      sumSlope += s.slope;
    });
    const meanTilt = sumTilt / n;
    const meanStab = Math.round(sumStab / n);
    const meanSlope = (sumSlope / n).toFixed(1);

    // RMS Jitter (Standard deviation of tilt vibrations): sqrt(1/N * sum((tilt - meanTilt)^2))
    let variance = 0;
    t.samples.forEach(s => {
      variance += Math.pow(s.tilt - meanTilt, 2);
    });
    const rmsJitter = Math.sqrt(variance / n);

    const isTrialA = t.trial === 'a';
    const statusEl = document.getElementById(isTrialA ? 'exp-status-a' : 'exp-status-b');
    const slopeEl = document.getElementById(isTrialA ? 'exp-slope-a' : 'exp-slope-b');
    const tiltEl = document.getElementById(isTrialA ? 'exp-tilt-a' : 'exp-tilt-b');
    const jitterEl = document.getElementById(isTrialA ? 'exp-jitter-a' : 'exp-jitter-b');
    const stabEl = document.getElementById(isTrialA ? 'exp-stab-a' : 'exp-stab-b');

    if (statusEl) {
      statusEl.textContent = 'บันทึกสำเร็จ ✓';
      statusEl.style.color = isTrialA ? '#fda4af' : '#6ee7b7';
    }
    if (slopeEl) slopeEl.textContent = `${meanSlope}°`;
    if (tiltEl) tiltEl.textContent = `${meanTilt.toFixed(1)}° (${isTrialA ? 'เอียงตามลาดผา' : 'ชดเชยระนาบ'})`;
    if (jitterEl) jitterEl.textContent = `±${rmsJitter.toFixed(2)}° (${isTrialA ? 'ไร้ตัวซับสั่น' : 'Damping 0.08'})`;
    if (stabEl) stabEl.textContent = `${meanStab}% (${isTrialA ? 'เสี่ยงคว่ำ' : 'เสถียรภาพสูง'})`;

    // Dynamic empirical conclusion
    const conclusionEl = document.getElementById('exp-empirical-conclusion');
    if (conclusionEl) {
      conclusionEl.innerHTML = `<strong>ผลการทดลองเชิงประจักษ์:</strong> เมื่อเปิด Active Leveler (Trial B) หุ่นยนต์ ARES-6 ลดมุมเอียงเฉลี่ยลงเหลือ <strong>${meanTilt.toFixed(1)}°</strong> และลดการสั่นไหว (RMS Jitter) เหลือ <strong>±${rmsJitter.toFixed(2)}°</strong> ส่งผลให้ดัชนีเสถียรภาพทรงตัวพุ่งสูงถึง <strong>${meanStab}%</strong> ยืนยันสมมติฐานที่ 1 อย่างชัดเจน`;
    }

    if (isTrialA) {
      this.audio.playAlert();
    } else {
      this.audio.playVictory();
    }
  }

  completeMission() {
    this.missionComplete = true;
    this.audio.playVictory();

    const elapsedSec = Math.round((Date.now() - this.missionStartTime) / 1000);
    const min = Math.floor(elapsedSec / 60);
    const sec = elapsedSec % 60;
    const timeStr = `${min}:${sec < 10 ? '0' : ''}${sec}`;

    const score = this.investigation.evidenceScore;
    const accuracy = Math.round((this.investigation.correctCount / 4) * 100);

    let rankTitle = 'Lead Planetary Geologist';
    if (score >= 11) {
      rankTitle = 'Principal Planetary Geoscientist (หัวหน้านักธรณีวิทยา Chryse)';
    } else if (score >= 8) {
      rankTitle = 'Senior Mars Astrobiology Specialist (ผู้เชี่ยวชาญชีวดาราศาสตร์)';
    } else {
      rankTitle = 'Mars Field Surveyor (นักสำรวจภาคสนามดาวอังคาร)';
    }

    if (this.ui.cerFinalScore) this.ui.cerFinalScore.textContent = `${score}/12 pts`;
    if (this.ui.cerAccuracyRate) this.ui.cerAccuracyRate.textContent = `${accuracy}%`;
    if (this.ui.cerFinalTime) this.ui.cerFinalTime.textContent = timeStr;
    if (this.ui.cerRankTitle) this.ui.cerRankTitle.textContent = rankTitle;

    // Dynamic Claim Generation
    const claimEl = document.getElementById('cer-claim-text');
    if (claimEl) {
      if (score >= 10) {
        claimEl.innerHTML = `หลักฐานสเปกตรัมอินฟราเรดระยะใกล้ (VNIR) และสนามแม่เหล็กโบราณ ยืนยันว่า <strong>Chryse Planitia ในอดีตยุค Noachian (3.8 พันล้านปีก่อน)</strong> เคยมีสภาพแวดล้อมที่เอื้อต่อน้ำของเหลวสภาพเป็นกลางคงตัวอยู่ยาวนาน ก่อตัวเป็นทะเลสาบและธารน้ำหลาก ก่อนจะเปลี่ยนผ่านสู่น้ำกรดระเหยแห้งในยุค Hesperian และกลายเป็นทะเลทรายเยือกแข็งแห้งแล้งในยุค Amazonian`;
      } else {
        claimEl.innerHTML = `ข้อมูลภาคสนามระบุว่า Chryse Planitia มีการเปลี่ยนแปลงทางธรณีวิทยาหลายยุค โดยพบร่องรอยแร่ไฮเดรตและหินบะซอลต์ภูเขาไฟ บ่งชี้ว่าในอดีตเคยมีปฏิสัมพันธ์ระหว่างน้ำกับหิน แม้จะมีหลักฐานบางจุดที่ต้องสำรวจซ้ำเพิ่มเติม`;
      }
    }

    // Dynamic Evidence Generation
    const evidenceListEl = document.getElementById('cer-evidence-list');
    if (evidenceListEl && this.terrain && this.terrain.samples) {
      let evidenceHTML = '';
      this.terrain.samples.forEach(s => {
        const res = this.investigation.sampleResults[s.id] || { attempts: 1, earnedPoints: 3 };
        const badgeColor = res.earnedPoints === 3 ? '#34d399' : '#fbbf24';
        const badgeText = res.earnedPoints === 3 ? `✓ วินิจฉัยแม่นยำครั้งแรก (+3 pts)` : `✓ วิเคราะห์สำเร็จ (+${res.earnedPoints} pts)`;
        const correctChoice = s.inquiryQuestion.choices[s.inquiryQuestion.correctIndex].text;

        evidenceHTML += `
          <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2px;">
              <strong style="color: #67e8f9;">• ${s.thaiName} (${s.id.toUpperCase()}):</strong>
              <span style="font-size: 11px; font-family: var(--font-mono); color: ${badgeColor};">${badgeText}</span>
            </div>
            <div style="color: #cbd5e1; font-size: 0.82rem;">
              แถบดูดกลืนหลัก: <strong>${s.spectralData.keyAbsorption}</strong> (ความชื้น ${s.spectralData.hydrationIndex}%)<br>
              <em>ข้อสรุปเชิงประจักษ์:</em> ${correctChoice}
            </div>
          </div>
        `;
      });
      evidenceListEl.innerHTML = evidenceHTML;
    }

    // Dynamic Reasoning Generation
    const reasoningEl = document.getElementById('cer-reasoning-text');
    if (reasoningEl) {
      reasoningEl.innerHTML = `
        กระบวนการตกตะกอนของ <strong>Phyllosilicate Clay (Site Beta)</strong> จำเป็นต้องมีน้ำของเหลว pH เป็นกลางทำปฏิกิริยากับหินบะซอลต์ต่อเนื่องนับหมื่นปี ซึ่งสอดคล้องกับหลักฐาน <strong>Paleomagnetic Anomaly (Site Delta)</strong> ที่พิสูจน์ว่าในยุคนั้นแกนดาวอังคารยังมีสนามแม่เหล็กปกป้องชั้นบรรยากาศหนาแน่น (ความดัน &gt; 100 kPa) ทำให้น้ำคงสถานะของเหลวเหนือจุดร่วมสาม (0.611 kPa) ได้<br><br>
        ต่อมาเมื่อสนามแม่เหล็กดับสูญ ลมสุริยะจึงกวาดบรรยากาศออกสู่อวกาศ ความดันลดฮวบลงสู่ 0.63 kPa ในปัจจุบัน น้ำที่เหลือจึงระเหิดอย่างรวดเร็ว ตกค้างไว้เพียงแร่ซัลเฟตระเหยแห้ง <strong>Jarosite (Site Alpha)</strong> และเหลือหินบะซอลต์สด <strong>Olivine (Site Gamma)</strong> ที่ไม่ผุพังอีกเลย
      `;
    }

    if (this.ui.cerReportModal) {
      this.ui.cerReportModal.classList.remove('hidden');
    }
  }

  exportCERReport() {
    const elapsedSec = Math.round((Date.now() - this.missionStartTime) / 1000);
    const min = Math.floor(elapsedSec / 60);
    const sec = elapsedSec % 60;
    const timeStr = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    const score = this.investigation.evidenceScore;
    const accuracy = Math.round((this.investigation.correctCount / 4) * 100);

    let report = `# 🪐 รายงานการสืบเสาะวิทยาศาสตร์ Chryse Planitia (CER Report)\n`;
    report += `**หุ่นยนต์สำรวจ:** ARES-6 Autonomous Martian Hexapod\n`;
    report += `**คะแนนหลักฐาน (Evidence Score):** ${score}/12 pts (${accuracy}%)\n`;
    report += `**เวลาปฏิบัติการ:** ${timeStr}\n\n`;

    report += `## 1. ข้ออ้างอิงเชิงวิชาการ (Claim)\n`;
    const claimEl = document.getElementById('cer-claim-text');
    report += `${claimEl ? claimEl.textContent.trim() : ''}\n\n`;

    report += `## 2. ข้อมูลหลักฐานเชิงประจักษ์ (Evidence)\n`;
    if (this.terrain && this.terrain.samples) {
      this.terrain.samples.forEach(s => {
        const res = this.investigation.sampleResults[s.id] || { attempts: 1, earnedPoints: 3 };
        report += `- **${s.thaiName} (${s.id.toUpperCase()}):** แถบดูดกลืน ${s.spectralData.keyAbsorption} (ความชื้น ${s.spectralData.hydrationIndex}%) — ได้รับ ${res.earnedPoints} คะแนน (วิเคราะห์ ${res.attempts} ครั้ง)\n`;
      });
    }
    report += `\n`;

    report += `## 3. เหตุผลและกลไกทางวิทยาศาสตร์ (Reasoning)\n`;
    const reasoningEl = document.getElementById('cer-reasoning-text');
    report += `${reasoningEl ? reasoningEl.textContent.trim() : ''}\n\n`;

    report += `---\n*รายงานสรุปผลการวิจัยภาคสนามดาวอังคาร ออกแบบตามกรอบ CER โดย ดร. อภิสิทธิ์ ทองไชย*\n`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(report).then(() => {
        const toast = document.getElementById('cer-export-toast');
        if (toast) {
          toast.classList.remove('hidden');
          setTimeout(() => toast.classList.add('hidden'), 3500);
        }
        this.audio.playScan();
      }).catch(err => {
        console.warn('Clipboard write failed:', err);
      });
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
    if (this.ui.solarCosVal) this.ui.solarCosVal.textContent = `cos θ = ${this.solarCosTheta.toFixed(2)}`;
    if (this.ui.solarVal) this.ui.solarVal.textContent = `+${this.solarCharging.toFixed(2)} kW`;
    const thetaRad = Math.acos(Math.max(0, Math.min(1, this.solarCosTheta)));
    const thetaDeg = thetaRad * (180 / Math.PI);
    if (this.ui.solarAngleVal) this.ui.solarAngleVal.textContent = `${thetaDeg.toFixed(1)}°`;
    if (this.ui.solarEffBar) this.ui.solarEffBar.style.width = `${Math.round(this.solarCosTheta * 100)}%`;
    if (this.ui.solarStatus) {
      if (this.solarCosTheta >= 0.80) {
        this.ui.solarStatus.textContent = '☀️ ประจุไฟเต็มประสิทธิภาพ (Optimal Incidence)';
        this.ui.solarStatus.style.color = '#4ade80';
      } else if (this.solarCosTheta >= 0.45) {
        this.ui.solarStatus.textContent = '🌤️ ประจุไฟปานกลาง (Moderate Angle)';
        this.ui.solarStatus.style.color = '#fde047';
      } else {
        this.ui.solarStatus.textContent = '🌑 มุมตกกระทบเฉียงมาก (Low Irradiance)';
        this.ui.solarStatus.style.color = '#f87171';
      }
    }

    // Evidence and sample count
    if (this.ui.sampleCounter) {
      this.ui.sampleCounter.textContent = `${this.collectedSamples.size}/${this.totalSamples}`;
    }
    if (this.ui.evidenceScoreVal) {
      this.ui.evidenceScoreVal.textContent = `${this.investigation.evidenceScore}/12 pts`;
    }
    if (this.ui.evidenceBar) {
      const pct = Math.min(100, Math.round((this.investigation.evidenceScore / 12) * 100));
      this.ui.evidenceBar.style.width = `${pct}%`;
    }

    // Update Mobile Ribbon & Mobile Mode Hub live indicators
    if (this.ui.ribbonSpeed) this.ui.ribbonSpeed.textContent = `${effectiveDisplaySpeed.toFixed(1)} m/s`;
    if (this.ui.ribbonBattery) this.ui.ribbonBattery.textContent = `${Math.round(this.battery)}%`;
    if (this.ui.ribbonSamples) this.ui.ribbonSamples.textContent = `${this.collectedSamples.size}/${this.totalSamples}`;
    if (this.ui.mMenuSpeed) this.ui.mMenuSpeed.textContent = `${effectiveDisplaySpeed.toFixed(1)} m/s`;
    if (this.ui.mMenuBattery) this.ui.mMenuBattery.textContent = `${Math.round(this.battery)}%`;
    if (this.ui.mMenuStability) this.ui.mMenuStability.textContent = `${stab}%`;
    if (this.ui.mMenuSamples) this.ui.mMenuSamples.textContent = `${this.collectedSamples.size}/${this.totalSamples}`;

    // Integrated Nav Telemetry (Landscape / Widescreen)
    if (this.ui.navSpeed) this.ui.navSpeed.textContent = `${effectiveDisplaySpeed.toFixed(1)} m/s`;
    if (this.ui.navBattery) this.ui.navBattery.textContent = `${Math.round(this.battery)}%`;
    if (this.ui.navSamples) this.ui.navSamples.textContent = `${this.collectedSamples.size}/${this.totalSamples}`;

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
    if (this.ui.ribbonTimer) this.ui.ribbonTimer.textContent = timerStr;
    if (this.ui.navTimer) this.ui.navTimer.textContent = timerStr;

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

  updateWaypointMarkers() {
    if (!this.ui.waypointLayer || !this.camera) return;
    const roverPos = this.hexapod.position;

    // Collect targets: 4 mineral sample sites + MAV extraction base
    const targets = [];
    if (this.terrain && this.terrain.samples) {
      this.terrain.samples.forEach((s) => {
        targets.push({
          id: s.id,
          name: s.id.toUpperCase(),
          thaiName: s.thaiName,
          pos: s.position.clone().add(new THREE.Vector3(0, 2.4, 0)),
          color: '#' + s.color.toString(16).padStart(6, '0'),
          collected: s.collected,
          type: 'sample'
        });
      });
    }

    if (this.terrain && this.terrain.lander) {
      const allSamplesDone = (this.collectedSamples.size === this.totalSamples);
      targets.push({
        id: 'lander',
        name: allSamplesDone ? '🚀 MAV EXTRACTION' : 'MAV BASE',
        thaiName: 'ยานลงจอด MAV',
        pos: this.terrain.lander.position.clone().add(new THREE.Vector3(0, 3.8, 0)),
        color: allSamplesDone ? '#f97316' : '#38bdf8',
        collected: this.missionComplete,
        type: 'lander',
        isPrimary: allSamplesDone
      });
    }

    const w = window.innerWidth;
    const h = window.innerHeight;

    let html = '';

    targets.forEach((t) => {
      const dist = Math.round(roverPos.distanceTo(t.pos));

      // Update Top HUD Waypoint Chip
      const distEl = document.getElementById(`wp-dist-${t.id}`);
      const chipEl = document.getElementById(`wp-chip-${t.id}`);
      if (distEl) {
        if (t.collected) {
          distEl.textContent = '✓';
          if (chipEl) chipEl.classList.add('collected');
        } else {
          distEl.textContent = `${dist}m`;
          if (chipEl) chipEl.classList.remove('collected');
        }
      }
      if (chipEl) {
        chipEl.classList.toggle('primary-pulse', !!t.isPrimary && !t.collected);
      }

      // 3D In-World Screen Projection (hide collected samples from floating view to reduce clutter)
      if (t.collected && !t.isPrimary) return;

      const proj = t.pos.clone().project(this.camera);
      const isBehind = proj.z > 1.0;

      // Convert Normalized Device Coordinates (-1 to +1) to pixels
      let screenX = (proj.x * 0.5 + 0.5) * w;
      let screenY = (-(proj.y * 0.5) + 0.5) * h;

      const padding = 36;
      const isOffScreen = isBehind || screenX < padding || screenX > (w - padding) || screenY < padding || screenY > (h - padding);

      if (isOffScreen) {
        // Clamp to screen perimeter
        let cx = screenX - w / 2;
        let cy = screenY - h / 2;
        if (isBehind) {
          cx = -cx;
          cy = -cy;
        }
        const angle = Math.atan2(cy, cx);
        const edgeX = (w / 2 - padding) * Math.cos(angle);
        const edgeY = (h / 2 - padding) * Math.sin(angle);
        screenX = w / 2 + edgeX;
        screenY = h / 2 + edgeY;

        const deg = Math.round(angle * (180 / Math.PI));
        html += `
          <div class="waypoint-pin edge ${t.isPrimary ? 'primary' : ''}" style="left: ${screenX.toFixed(0)}px; top: ${screenY.toFixed(0)}px; --accent: ${t.color};">
            <span class="wp-pin-arrow" style="transform: rotate(${deg}deg);">➤</span>
            <span class="wp-pin-badge">${t.name} ${dist}m</span>
          </div>
        `;
      } else {
        html += `
          <div class="waypoint-pin in-screen ${t.isPrimary ? 'primary' : ''}" style="left: ${screenX.toFixed(0)}px; top: ${screenY.toFixed(0)}px; --accent: ${t.color};">
            <div class="wp-pin-dot"></div>
            <div class="wp-pin-label">
              <span class="wp-pin-title">${t.name}</span>
              <span class="wp-pin-meters">${dist}m</span>
            </div>
          </div>
        `;
      }
    });

    this.ui.waypointLayer.innerHTML = html;
  }

  updateCamera() {
    // Smoothly damp spherical coordinates towards targets
    this.camAzimuth += (this.targetCamAzimuth - this.camAzimuth) * 0.12;
    this.camElevation += (this.targetCamElevation - this.camElevation) * 0.12;
    this.camDistance += (this.targetCamDistance - this.camDistance) * 0.15;

    // Velocity-Responsive Dynamic Field of View (FOV Breathing)
    const effectiveSpeed = Math.hypot(this.currentSpeed, this.currentTurnRate * 1.5);
    const speedRatio = Math.min(1.0, effectiveSpeed / this.moveSpeed);
    const baseFOV = this.cameraMode === 'mast-cam' ? 62.0 : (this.cameraMode === 'top-down' ? 50.0 : 55.0);
    const targetFOV = baseFOV + speedRatio * 3.8;
    this.camera.fov += (targetFOV - this.camera.fov) * 0.08;
    this.camera.updateProjectionMatrix();

    const lookTarget = this.hexapod.position.clone().add(new THREE.Vector3(0, 0.95, 0));

    if (this.cameraMode === 'orbit-follow') {
      // 1. Dynamic 360° Spherical Follow Cam around Rover
      const roverYaw = this.hexapod.rotation.y;
      const totalAngle = roverYaw + this.camAzimuth;
      const hDist = this.camDistance * Math.cos(this.camElevation);
      const vDist = this.camDistance * Math.sin(this.camElevation);

      const offsetX = -Math.sin(totalAngle) * hDist;
      const offsetZ = -Math.cos(totalAngle) * hDist;

      // Dynamic crest clearance on steep uphill slopes
      const slopePitch = this.leveler ? this.leveler.currentPitch : 0;
      const crestLift = Math.max(0, -slopePitch * 0.85);
      const offsetY = Math.max(0.6, vDist + crestLift);

      const desiredPos = lookTarget.clone().add(new THREE.Vector3(offsetX, offsetY, offsetZ));

      // Terrain anti-clipping: ensure camera never dips below Martian ground
      const minTerrainY = this.terrain.getHeight(desiredPos.x, desiredPos.z) + 1.15;
      if (desiredPos.y < minTerrainY) {
        desiredPos.y = minTerrainY;
      }

      this.camera.position.lerp(desiredPos, 0.12);
      this.camera.lookAt(lookTarget);

    } else if (this.cameraMode === 'top-down') {
      // 2. High-Altitude Reconnaissance Satellite / Drone View (Heading points UP)
      const altitude = Math.max(18.0, this.camDistance * 2.2);
      const roverYaw = this.hexapod.rotation.y;
      const desiredPos = this.hexapod.position.clone().add(new THREE.Vector3(
        -Math.sin(roverYaw) * 1.5,
        altitude,
        -Math.cos(roverYaw) * 1.5
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

    // Update Martian regolith dust particle billows (g_mars = 3.72 m/s²)
    if (this.dust) {
      this.dust.update(dt);
    }

    // Update active leveler A/B empirical sampling
    this.updateLevelerTrial(dt);

    // 3. Update Terrain Beacons & Missions
    this.terrain.update(time);
    this.checkMissions();

    // 4. Update Camera & HUD & Tactical Waypoints
    this.updateCamera();
    this.updateHUD();
    this.updateWaypointMarkers();

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
