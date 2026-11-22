import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BodyLeveler } from './leveler.js';
import { MarsTerrain } from './terrain.js';
import { HexapodRobot, HexapodGait } from './robot.js';
import { SoundEngine } from './audio.js';
import { MarsDustSystem } from './dust.js';
import { WaterPhaseDiagram } from './phase-diagram.js';
import { SupportPolygonVisualizer } from './support-polygon.js';
import { KinematicsInspector } from './kinematics-inspector.js';
import { OrbitalGIS } from './orbital-gis.js';
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

    // Mission & AI Ethics Survival State (10 Questions + Hull HP)
    this.collectedSamples = new Set();
    this.totalSamples = 10;
    this.missionComplete = false;
    this.missionStartTime = Date.now();
    this.finalElapsedSec = null;
    this.lastAnnouncedMinute = 0;
    this.minuteToastTimer = null;

    // Hull Integrity (HP) & Hazard Damage State
    this.hullHP = 100;
    this.maxHullHP = 100;
    this.isGameOver = false;
    this.invulnerableUntil = 0;
    this.lastDamageCause = '';
    this.damageFlashTimer = null;

    this.stabilityWarnings = 0;
    this.lastCollisionAlertTime = 0;
    this.collisionAlertTimer = null;
    this.lastSlipWarningTime = 0;
    this.levelerTrial = null;
    this.dust = null;
    this.phaseDiagram = null;
    this.supportPolygon = null;
    this.kinematicsInspector = null;
    this.orbitalGis = null;
    this.trialHistory = [];
    this.dustTau = 0.10;

    // AI Ethics & Literacy Inquiry State
    this.solarCosTheta = 0.88;
    this.investigation = {
      evidenceScore: 0,
      maxScore: 100,
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

    // 6. Dynamic Support Polygon & Static Stability Margin Visualizer (STEM Kinematics)
    this.supportPolygon = new SupportPolygonVisualizer(this.scene);

    // 7. STEM Robotics Kinematics & 3-DOF Joint Inspector
    this.kinematicsInspector = new KinematicsInspector();

    // 8. Orbital Satellite Reconnaissance GIS & Topographic Transect Engine
    this.orbitalGis = new OrbitalGIS(this.terrain, this.hexapod);
  }

  initControls() {
    // Keyboard listeners
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      this.audio.init();

      if (e.code === 'KeyR') this.toggleSteerMode();
      if (e.code === 'KeyL') this.toggleLeveler();
      if (e.code === 'KeyG') this.toggleGait();
      if (e.code === 'KeyP') this.toggleSupportPolygon();
      if (e.code === 'KeyE') this.toggleExperimentsModal();
      if (e.code === 'KeyC') this.toggleCameraMode();
      if (e.code === 'KeyF') this.toggleFullscreen();
      if (e.code === 'KeyM') this.toggleMute();
      if (e.code === 'KeyH') this.toggleInspector();
      if (e.code === 'KeyO') this.toggleOrbitalGIS();

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
      waypointHudBar: document.getElementById('waypoint-hud-bar'),
      // Hull HP, Threat & Game Over UI
      hpVal: document.getElementById('hud-hp-val'),
      hpBar: document.getElementById('hud-hp-bar'),
      navHp: document.getElementById('nav-hp-val'),
      ribbonHp: document.getElementById('ribbon-hp-val'),
      threatAlert: document.getElementById('hud-threat-alert'),
      damageOverlay: document.getElementById('damage-overlay'),
      minuteToast: document.getElementById('minute-toast'),
      minuteToastText: document.getElementById('minute-toast-text'),
      gameOverModal: document.getElementById('gameover-modal'),
      gameOverCauseText: document.getElementById('gameover-cause-text'),
      gameOverQuestionsVal: document.getElementById('gameover-questions-val'),
      gameOverTimeVal: document.getElementById('gameover-time-val'),
      gameOverScoreVal: document.getElementById('gameover-score-val'),
      btnGameOverRestart: document.getElementById('btn-gameover-restart'),
      btnGameOverContinue: document.getElementById('btn-gameover-continue'),
      btnVictoryRestart: document.getElementById('btn-victory-restart'),
      btnReplayCheer: document.getElementById('btn-replay-cheer'),
      btnNavRestart: document.getElementById('btn-nav-restart')
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

    if (this.ui.btnGameOverRestart) {
      this.ui.btnGameOverRestart.addEventListener('click', () => this.restartMission());
    }
    if (this.ui.btnGameOverContinue) {
      this.ui.btnGameOverContinue.addEventListener('click', () => this.emergencyRepairContinue());
    }
    if (this.ui.btnVictoryRestart) {
      this.ui.btnVictoryRestart.addEventListener('click', () => this.restartMission());
    }
    if (this.ui.btnNavRestart) {
      this.ui.btnNavRestart.addEventListener('click', () => this.restartMission());
    }
    if (this.ui.btnReplayCheer) {
      this.ui.btnReplayCheer.addEventListener('click', () => {
        this.audio.playGrandCelebration();
        this.emitVictoryFireworks();
      });
    }

    // Allow clicking top Waypoint Chips (AI-01..AI-10) to orient camera towards that station
    const wpChips = document.querySelectorAll('.waypoint-chip[data-target]');
    wpChips.forEach((chip) => {
      chip.style.cursor = 'pointer';
      chip.addEventListener('click', () => {
        const targetId = chip.getAttribute('data-target');
        const sample = this.terrain.samples.find(s => s.id === targetId);
        if (sample && this.hexapod) {
          const dx = sample.position.x - this.hexapod.position.x;
          const dz = sample.position.z - this.hexapod.position.z;
          const worldAngle = Math.atan2(dx, dz);
          this.targetCamAzimuth = worldAngle - this.hexapod.rotation.y;
          this.audio.playScan();
        }
      });
    });

    const btnExportCsv = document.getElementById('btn-export-trials-csv');
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', () => this.exportTrialsCSV());
    }

    const sliderTau = document.getElementById('atmo-slider-tau');
    const valTau = document.getElementById('atmo-val-tau');
    if (sliderTau) {
      sliderTau.addEventListener('input', (e) => {
        this.dustTau = parseFloat(e.target.value);
        const pct = Math.round((1.0 - this.dustTau) * 100);
        let condition = 'ฟ้าโปร่ง';
        if (this.dustTau >= 0.40) condition = 'พายุฝุ่นดาวอังคารรุนแรง (Global Dust Storm)';
        else if (this.dustTau >= 0.25) condition = 'หมอกฝุ่นหนาทึบ (Dust Haze)';
        else if (this.dustTau >= 0.15) condition = 'ฝุ่นฟุ้งกระจายปานกลาง';
        if (valTau) valTau.textContent = `τ = ${this.dustTau.toFixed(2)} (${condition} ${pct}% แสงส่องถึง)`;
        if (this.scene && this.scene.fog) {
          this.scene.fog.density = 0.007 + this.dustTau * 0.018;
        }
      });
    }

    const btnTogglePolygon = document.getElementById('btn-toggle-polygon');
    if (btnTogglePolygon) {
      btnTogglePolygon.addEventListener('click', () => this.toggleSupportPolygon());
    }

    const btnTogglePolygonModal = document.getElementById('btn-toggle-polygon-modal');
    if (btnTogglePolygonModal) {
      btnTogglePolygonModal.addEventListener('click', () => this.toggleSupportPolygon());
    }

    const btnSelectTripod = document.getElementById('btn-select-tripod');
    if (btnSelectTripod) btnSelectTripod.addEventListener('click', () => this.selectGait('tripod'));

    const btnSelectWave = document.getElementById('btn-select-wave');
    if (btnSelectWave) btnSelectWave.addEventListener('click', () => this.selectGait('wave'));

    const btnInspector = document.getElementById('btn-inspector');
    if (btnInspector) {
      btnInspector.addEventListener('click', () => this.toggleInspector());
    }

    const btnNavGis = document.getElementById('btn-orbital-gis');
    if (btnNavGis) {
      btnNavGis.addEventListener('click', () => this.toggleOrbitalGIS());
    }

    const btnToggleGis = document.getElementById('btn-toggle-gis');
    if (btnToggleGis) {
      btnToggleGis.addEventListener('click', () => this.toggleOrbitalGIS());
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
    this.audio.playGaitShift();
  }

  toggleSupportPolygon() {
    if (this.supportPolygon) {
      const isVis = this.supportPolygon.toggleVisible();
      this.audio.playScan();
      const btn = document.getElementById('btn-toggle-polygon');
      if (btn) {
        btn.classList.toggle('border-cyan-400', isVis);
        btn.classList.toggle('text-cyan-400', isVis);
      }
      const btnModal = document.getElementById('btn-toggle-polygon-modal');
      if (btnModal) {
        btnModal.textContent = isVis ? 'ซ่อนผังฐานค้ำยัน (Polygon)' : 'แสดงผังฐานค้ำยัน (Polygon)';
      }
    }
  }

  exportTrialsCSV() {
    this.audio.playScan();
    let csv = 'Trial,MeanSlopeDeg,MeanTiltDeg,RMSJitterDeg,StabilityIndexPct,SampleCount,Timestamp\n';
    if (this.trialHistory.length === 0) {
      const groundNormal = this.terrain.getNormal(this.hexapod.position.x, this.hexapod.position.z);
      const slopeDeg = Math.acos(Math.max(0, Math.min(1, groundNormal.y))) * (180 / Math.PI);
      const tilt = (this.leveler.tiltAngleDeg || 0).toFixed(2);
      const stab = this.leveler.stabilityIndex || 100;
      csv += `CURRENT,${slopeDeg.toFixed(2)},${tilt},0.00,${stab},1,${new Date().toISOString()}\n`;
    } else {
      this.trialHistory.forEach((h) => {
        csv += `${h.trial},${h.meanSlope},${h.meanTilt},${h.rmsJitter},${h.meanStab},${h.sampleCount},${h.timestamp}\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ARES6_Leveler_Trials_ChrysePlanitia_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    if (modal) {
      modal.classList.toggle('hidden');
      if (!modal.classList.contains('hidden')) {
        this.audio.playScan();
        if (this.kinematicsInspector) {
          setTimeout(() => {
            this.kinematicsInspector.resizeCanvas();
            this.kinematicsInspector.renderIKCanvas();
          }, 50);
        }
      }
    }
  }

  toggleOrbitalGIS() {
    if (this.orbitalGis) {
      this.orbitalGis.toggleModal();
      this.audio.playScan();
    }
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
    if (this.isGameOver || this.investigation.spectrometerOpen) {
      return { rawX: 0, rawY: 0 };
    }
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

        // Camera right vector on horizontal plane (Right-handed cross product: camForward x Up)
        const camRight = new THREE.Vector3(-camForward.z, 0, camForward.x);

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
      // In Three.js right-handed Y-up coordinates, positive rotation.y turns left (CCW),
      // so right input (rawX > 0) must produce negative turnRate (CW right turn).
      targetTurnRate = -rawX * this.turnSpeed * gaitSpeedFactor;
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

        // High-speed rock collision inflicts minor hull damage (-5% HP)
        if (Math.abs(this.currentSpeed) > 3.2 && !this.missionComplete) {
          this.applyDamage(5, 'พุ่งชนโขดหินบะซอลต์มีคมด้วยความเร็วสูง');
        }

        // Mechanical shudder: simulate bumper tactile impact on body leveler
        if (this.leveler) {
          this.leveler.currentPitch += (Math.random() - 0.5) * 0.05;
          this.leveler.currentRoll += (Math.random() - 0.5) * 0.05;
        }
      }
    }

    // =========================================================================
    // HOSTILE PLANETARY HAZARDS (Rogue AI Drones, Plasma Mines, Dust Devils)
    // =========================================================================
    if (!this.isGameOver && !this.missionComplete && !this.investigation.spectrometerOpen && this.terrain.hazards) {
      let anyChasing = false;
      let minHazardDist = 999;

      for (let i = 0; i < this.terrain.hazards.length; i++) {
        const h = this.terrain.hazards[i];
        if (h.isChasing) anyChasing = true;

        const dx = tentativePos.x - h.position.x;
        const dz = tentativePos.z - h.position.z;
        const dist = Math.hypot(dx, dz);
        if (dist < minHazardDist) minHazardDist = dist;

        const hitDist = h.hitRadius + 1.25;
        if (dist < hitDist) {
          // Push rover back away from hazard center (Knockback)
          const nx = dist > 0.001 ? dx / dist : Math.sin(this.hexapod.rotation.y);
          const nz = dist > 0.001 ? dz / dist : Math.cos(this.hexapod.rotation.y);
          tentativePos.x = h.position.x + nx * (hitDist + 1.4);
          tentativePos.z = h.position.z + nz * (hitDist + 1.4);
          this.currentSpeed = -2.2;

          this.applyDamage(h.damage, `ถูกโจมตีโดย ${h.name}`);
          if (this.dust) {
            this.dust.emitFootstepPuff(tentativePos, 18);
          }
          break;
        }
      }

      if (this.ui.threatAlert) {
        if (anyChasing) {
          this.ui.threatAlert.textContent = '⚠️ โดรนไวรัสกำลังไล่ล่า! รีบหนี!';
          this.ui.threatAlert.style.color = '#f43f5e';
        } else if (minHazardDist < 12) {
          this.ui.threatAlert.textContent = '⚡ ระวังสิ่งกีดขวางอันตรายใกล้เคียง';
          this.ui.threatAlert.style.color = '#fbbf24';
        } else {
          this.ui.threatAlert.textContent = 'ปลอดภัย';
          this.ui.threatAlert.style.color = '#4ade80';
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
    const dustTau = this.dustTau !== undefined ? this.dustTau : 0.10;
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

  formatMinutesSeconds(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m < 10 ? '0' : ''}${m} นาที ${s < 10 ? '0' : ''}${s} วินาที`;
  }

  applyDamage(amount, causeText, canKill = true) {
    if (this.isGameOver || this.missionComplete) return;
    const now = Date.now();
    if (canKill && now < this.invulnerableUntil) return;

    if (canKill) {
      this.invulnerableUntil = now + 1250; // 1.25s post-hit invulnerability
    }

    this.lastDamageCause = causeText;
    const minAllowed = canKill ? 0 : 1;
    this.hullHP = Math.max(minAllowed, this.hullHP - amount);

    this.audio.playDamageAlert();

    // Red Screen Flash Vignette
    if (this.ui.damageOverlay) {
      this.ui.damageOverlay.classList.add('active');
      if (this.damageFlashTimer) clearTimeout(this.damageFlashTimer);
      this.damageFlashTimer = setTimeout(() => {
        this.ui.damageOverlay?.classList.remove('active');
      }, 360);
    }

    // Center Warning Toast
    if (this.ui.warningToast) {
      const titleEl = document.getElementById('warning-title');
      const descEl = document.getElementById('warning-desc');
      if (titleEl) titleEl.textContent = `💥 เกราะเสียหาย -${amount}% HP! (เหลือ ${Math.round(this.hullHP)}%)`;
      if (descEl) descEl.textContent = `${causeText} — รีบหลบหลีกหรือหนีออกจากรัศมีอันตราย!`;
      this.ui.warningToast.classList.remove('hidden');

      if (this.collisionAlertTimer) clearTimeout(this.collisionAlertTimer);
      this.collisionAlertTimer = setTimeout(() => {
        this.ui.warningToast?.classList.add('hidden');
      }, 2200);
    }

    if (this.leveler) {
      this.leveler.currentPitch += (Math.random() - 0.5) * 0.14;
      this.leveler.currentRoll += (Math.random() - 0.5) * 0.14;
    }

    this.updateHUD();

    if (this.hullHP <= 0 && canKill) {
      this.triggerGameOver(causeText);
    }
  }

  triggerGameOver(causeText) {
    if (this.isGameOver) return;
    this.isGameOver = true;
    this.currentSpeed = 0;
    this.currentTurnRate = 0;
    this.audio.updateMotor(0);
    this.audio.playGameOver();

    // Close quiz modal if open
    if (this.ui.spectrometerModal) {
      this.ui.spectrometerModal.classList.add('hidden');
    }
    this.investigation.spectrometerOpen = false;

    const elapsedSec = Math.floor((Date.now() - this.missionStartTime) / 1000);
    if (this.ui.gameOverCauseText) {
      this.ui.gameOverCauseText.textContent = `สาเหตุ: ${causeText || 'ถูกโจมตีจนเกราะหุ่นยนต์เหลือ 0%'}`;
    }
    if (this.ui.gameOverQuestionsVal) {
      this.ui.gameOverQuestionsVal.textContent = `${this.collectedSamples.size} / ${this.totalSamples} ข้อ`;
    }
    if (this.ui.gameOverTimeVal) {
      this.ui.gameOverTimeVal.textContent = this.formatMinutesSeconds(elapsedSec);
    }
    if (this.ui.gameOverScoreVal) {
      this.ui.gameOverScoreVal.textContent = `${this.investigation.evidenceScore} pts`;
    }

    if (this.ui.gameOverModal) {
      this.ui.gameOverModal.classList.remove('hidden');
    }
  }

  restartMission() {
    this.audio.init();
    this.audio.playScan();

    // Reset Game Over & Mission Completion Flags
    this.isGameOver = false;
    this.missionComplete = false;
    this.hullHP = 100;
    this.battery = 100.0;
    this.currentSpeed = 0;
    this.currentTurnRate = 0;
    this.invulnerableUntil = Date.now() + 2000;
    this.missionStartTime = Date.now();
    this.finalElapsedSec = null;
    this.lastAnnouncedMinute = 0;

    // Reset Collected AI Nodes & Scores
    this.collectedSamples.clear();
    this.investigation = {
      evidenceScore: 0,
      maxScore: 100,
      sampleResults: {},
      activeSample: null,
      correctCount: 0,
      spectrometerOpen: false
    };

    // Reset 3D Terrain AI Beacons and Patrol Drones
    if (this.terrain && typeof this.terrain.resetMissionNodes === 'function') {
      this.terrain.resetMissionNodes();
    }

    // Respawn Rover at safe landing zone (0, y, 0)
    const spawnY = this.terrain.getHeight(0, 0);
    this.hexapod.position.set(0, spawnY, 0);
    this.hexapod.rotation.y = 0;
    this.resetCamera();

    // Hide modals
    if (this.ui.gameOverModal) this.ui.gameOverModal.classList.add('hidden');
    if (this.ui.cerReportModal) this.ui.cerReportModal.classList.add('hidden');
    if (this.ui.spectrometerModal) this.ui.spectrometerModal.classList.add('hidden');
    if (this.ui.damageOverlay) this.ui.damageOverlay.classList.remove('active');

    this.updateHUD();
    this.updateWaypointMarkers();
  }

  emergencyRepairContinue() {
    this.audio.init();
    this.audio.playVictory();

    this.isGameOver = false;
    this.hullHP = 100;
    this.battery = 100.0;
    this.currentSpeed = 0;
    this.currentTurnRate = 0;
    this.invulnerableUntil = Date.now() + 3500; // 3.5s shield after repair

    if (this.ui.gameOverModal) {
      this.ui.gameOverModal.classList.add('hidden');
    }
    if (this.ui.damageOverlay) {
      this.ui.damageOverlay.classList.remove('active');
    }

    this.updateHUD();
  }

  emitVictoryFireworks() {
    if (!this.dust || !this.hexapod) return;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const pos = this.hexapod.position.clone().add(
        new THREE.Vector3(Math.cos(angle) * 2.5, 1.2, Math.sin(angle) * 2.5)
      );
      this.dust.emitFootstepPuff(pos, 14);
    }
  }

  checkMissions() {
    if (this.isGameOver || this.missionComplete) return;
    const roverPos = this.hexapod.position;

    // Detect proximity to any of the 10 AI Core Nodes
    this.terrain.samples.forEach((sample) => {
      if (!sample.collected && !this.investigation.spectrometerOpen) {
        const dist = roverPos.distanceTo(sample.position);
        if (dist <= sample.triggerRadius) {
          this.openSpectrometerModal(sample);
        }
      }
    });
  }

  openSpectrometerModal(sample) {
    if (this.investigation.spectrometerOpen || sample.collected || this.isGameOver) return;
    this.investigation.spectrometerOpen = true;
    this.investigation.activeSample = sample;

    // Halt rover movement while answering the question
    this.currentSpeed = 0;
    this.currentTurnRate = 0;
    this.audio.updateMotor(0);

    if (!this.investigation.sampleResults[sample.id]) {
      this.investigation.sampleResults[sample.id] = {
        attempts: 0,
        solved: false,
        earnedPoints: 0
      };
    }

    if (this.ui.specSiteBadge) {
      this.ui.specSiteBadge.textContent = `${sample.code || sample.id.toUpperCase()} (${this.collectedSamples.size + 1}/10)`;
    }
    if (this.ui.specSampleName) this.ui.specSampleName.textContent = sample.thaiName;
    if (this.ui.specHydrationPill) {
      this.ui.specHydrationPill.textContent = `🛡️ โดรนหยุดชั่วคราว | เกราะ ${Math.round(this.hullHP)}%`;
      this.ui.specHydrationPill.className = 'water-evidence-pill high';
    }

    if (this.ui.specPeakLabel) {
      this.ui.specPeakLabel.textContent = sample.category || sample.spectralData.keyAbsorption;
    }
    if (this.ui.specInstrumentReading) {
      this.ui.specInstrumentReading.textContent = sample.spectralData.readingText;
    }
    if (this.ui.specInquiryPrompt) {
      this.ui.specInquiryPrompt.textContent = sample.inquiryQuestion.prompt;
    }

    // Shuffle 4 multiple choice options so players think carefully every round
    const rawChoices = sample.inquiryQuestion.choices.map((c, idx) => ({
      text: c.text.replace(/^[กขคง]\.\s*/, ''),
      isCorrect: c.isCorrect !== undefined ? c.isCorrect : (idx === sample.inquiryQuestion.correctIndex)
    }));
    for (let i = rawChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = rawChoices[i];
      rawChoices[i] = rawChoices[j];
      rawChoices[j] = temp;
    }

    if (this.ui.specChoicesContainer) {
      this.ui.specChoicesContainer.innerHTML = '';
      const tags = ['ก', 'ข', 'ค', 'ง'];
      rawChoices.forEach((c, idx) => {
        const choiceCard = document.createElement('div');
        choiceCard.className = 'inquiry-choice-card';
        choiceCard.innerHTML = `
          <div class="choice-tag">${tags[idx] || (idx + 1)}</div>
          <div class="choice-text">${c.text}</div>
        `;
        choiceCard.addEventListener('click', () => this.handleChoiceSelection(sample, c.isCorrect, choiceCard));
        this.ui.specChoicesContainer.appendChild(choiceCard);
      });
    }

    if (this.ui.specFeedback) {
      this.ui.specFeedback.className = 'hidden';
      this.ui.specFeedback.innerHTML = '';
    }

    if (this.ui.btnConfirmSample) {
      this.ui.btnConfirmSample.disabled = true;
      this.ui.btnConfirmSample.innerHTML = '🔒 กรุณาเลือกคำตอบที่ถูกต้องเพื่อปลดล็อกสถานี AI นี้';
    }

    if (this.ui.spectrometerModal) {
      this.ui.spectrometerModal.classList.remove('hidden');
    }
    this.audio.playScan();
  }

  handleChoiceSelection(sample, isCorrect, cardEl) {
    const result = this.investigation.sampleResults[sample.id];
    if (result.solved) return; // already solved

    result.attempts++;

    // Remove previous active styles on choices
    if (this.ui.specChoicesContainer) {
      const cards = this.ui.specChoicesContainer.querySelectorAll('.inquiry-choice-card');
      cards.forEach((c) => c.classList.remove('selected', 'incorrect'));
    }

    if (isCorrect) {
      result.solved = true;
      cardEl.classList.add('correct');

      // Points: 10 for first try, 7 for 2nd try, 5 for subsequent
      const maxPts = sample.waterEvidencePoints || 10;
      const earned = result.attempts === 1 ? maxPts : (result.attempts === 2 ? 7 : 5);
      result.earnedPoints = earned;
      this.investigation.evidenceScore += earned;

      let repairBonusText = '';
      if (result.attempts === 1) {
        this.investigation.correctCount++;
        if (this.hullHP < 100) {
          this.hullHP = Math.min(100, this.hullHP + 8);
          repairBonusText = ' · 🛡️ โบนัสซ่อมแซมเกราะ +8% HP!';
        }
      }

      if (this.ui.specFeedback) {
        this.ui.specFeedback.className = 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 p-3 rounded-xl';
        this.ui.specFeedback.innerHTML = `
          <strong style="color: #4ade80;">✅ คำตอบถูกต้อง! ปลดล็อกสถานี ${sample.code} สำเร็จ</strong><br>
          ${sample.inquiryQuestion.explanation}<br>
          <span style="color: #38bdf8; font-weight: 800; font-family: var(--font-mono); margin-top: 4px; display: inline-block;">
            +${earned} คะแนน AI Literacy &amp; Ethics${repairBonusText}
          </span>
        `;
        this.ui.specFeedback.classList.remove('hidden');
      }

      const nextCount = this.collectedSamples.size + 1;
      if (this.ui.btnConfirmSample) {
        this.ui.btnConfirmSample.disabled = false;
        this.ui.btnConfirmSample.innerHTML = nextCount >= this.totalSamples
          ? '🎉 บันทึกข้อที่ 10/10 &amp; เฉลิมฉลองชัยชนะภารกิจ!'
          : `📥 บันทึกสถานีที่ ${nextCount}/10 และออกเดินทางต่อ ➔`;
      }
      this.audio.playVictory();
    } else {
      cardEl.classList.add('incorrect');
      // Minor firewall feedback shock (-4% HP, non-lethal while inside modal)
      this.hullHP = Math.max(1, this.hullHP - 4);
      if (this.ui.specHydrationPill) {
        this.ui.specHydrationPill.textContent = `⚡ ตอบผิด ไฟกระชาก -4% | เกราะเหลือ ${Math.round(this.hullHP)}%`;
      }

      if (this.ui.specFeedback) {
        this.ui.specFeedback.className = 'bg-rose-950/70 border border-rose-500/40 text-rose-200 p-3 rounded-xl';
        this.ui.specFeedback.innerHTML = `
          <strong style="color: #f43f5e;">❌ คำตอบยังไม่ถูกต้อง (เกราะลด -4% HP จากระบบป้องกันไฟร์วอลล์):</strong><br>
          วิเคราะห์หลักการของ <strong>${sample.spectralData.keyAbsorption}</strong> จากสถานการณ์จำลองด้านบน แล้วเลือกคำตอบที่ถูกต้องอีกครั้ง!
        `;
        this.ui.specFeedback.classList.remove('hidden');
      }
      this.audio.playWrongAnswer();
    }

    this.updateHUD();
  }

  confirmSampleCollection() {
    const sample = this.investigation.activeSample;
    if (!sample) return;

    sample.collected = true;
    this.collectedSamples.add(sample.id);

    // Grant 2.0s shield when exiting quiz modal so nearby drones cannot ambush immediately
    this.invulnerableUntil = Date.now() + 2000;

    // Visual effect: shrink beacon core and dim pillar
    if (sample.coreMesh) sample.coreMesh.scale.set(0.25, 0.25, 0.25);
    if (sample.group) {
      sample.group.children.forEach((c) => {
        if (c.material && c.material.opacity) c.material.opacity = 0.15;
      });
    }

    if (this.ui.spectrometerModal) {
      this.ui.spectrometerModal.classList.add('hidden');
    }
    this.investigation.spectrometerOpen = false;

    this.updateHUD();
    this.updateWaypointMarkers();

    if (this.collectedSamples.size >= this.totalSamples) {
      this.completeMission();
    } else {
      this.audio.playScan();
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
    this.audio.playGaitShift();
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

    // Record trial into history for CSV export
    this.trialHistory.push({
      trial: t.trial.toUpperCase(),
      meanSlope: parseFloat(meanSlope),
      meanTilt: parseFloat(meanTilt.toFixed(2)),
      rmsJitter: parseFloat(rmsJitter.toFixed(2)),
      meanStab: meanStab,
      sampleCount: n,
      timestamp: new Date().toISOString()
    });

    if (isTrialA) {
      this.audio.playAlert();
    } else {
      this.audio.playVictory();
    }
  }

  completeMission() {
    if (this.missionComplete) return;
    this.missionComplete = true;
    this.currentSpeed = 0;
    this.currentTurnRate = 0;
    this.audio.updateMotor(0);

    // Play Grand Celebratory Cheering & Victory Fanfare SFX!
    this.audio.playGrandCelebration();
    this.emitVictoryFireworks();

    const elapsedSec = Math.round((Date.now() - this.missionStartTime) / 1000);
    this.finalElapsedSec = elapsedSec;
    const timeStr = this.formatMinutesSeconds(elapsedSec);

    const score = this.investigation.evidenceScore;
    const accuracy = Math.round((this.investigation.correctCount / this.totalSamples) * 100);

    let rankTitle = 'Chief AI Ethics & Literacy Commander';
    if (score >= 90) {
      rankTitle = 'Master AI Ethics Guardian (ผู้พิทักษ์จริยธรรม AI สูงสุด)';
    } else if (score >= 75) {
      rankTitle = 'Senior AI Governance Specialist (ผู้เชี่ยวชาญธรรมาภิบาล AI)';
    } else {
      rankTitle = 'Mars AI Field Explorer (นักสำรวจปัญญาประดิษฐ์ภาคสนาม)';
    }

    if (this.ui.cerFinalScore) this.ui.cerFinalScore.textContent = `${score}/100 pts`;
    if (this.ui.cerAccuracyRate) this.ui.cerAccuracyRate.textContent = `${accuracy}% (${this.investigation.correctCount}/10)`;
    if (this.ui.cerFinalTime) this.ui.cerFinalTime.textContent = timeStr;
    if (this.ui.cerRankTitle) this.ui.cerRankTitle.textContent = rankTitle;

    const claimEl = document.getElementById('cer-claim-text');
    if (claimEl) {
      claimEl.innerHTML = `ขอแสดงความยินดี! คุณบังคับหุ่นยนต์ <strong>ARES-6</strong> หลบหลีกโดรนไวรัส ทุ่นพลาสมา และพายุหมุนฝุ่นสายฟ้า พร้อมตอบคำถามครบทั้ง <strong>10 สถานี (AI-01 ถึง AI-10)</strong> สำเร็จภายในเวลา <strong>${timeStr}</strong> โดยเหลือพลังเกราะ <strong>${Math.round(this.hullHP)}% HP</strong>!`;
    }

    const evidenceListEl = document.getElementById('cer-evidence-list');
    if (evidenceListEl && this.terrain && this.terrain.samples) {
      let evidenceHTML = '';
      this.terrain.samples.forEach((s) => {
        const res = this.investigation.sampleResults[s.id] || { attempts: 1, earnedPoints: 10 };
        const badgeColor = res.attempts === 1 ? '#34d399' : '#fbbf24';
        const badgeText = res.attempts === 1 ? `✓ ตอบถูกครั้งแรก (+${res.earnedPoints} pts)` : `✓ ผ่านด่าน (+${res.earnedPoints} pts)`;
        const correctChoiceObj = s.inquiryQuestion.choices.find(c => c.isCorrect) || s.inquiryQuestion.choices[0];

        evidenceHTML += `
          <div style="margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2px;">
              <strong style="color: #67e8f9;">• ${s.thaiName} (${s.code}):</strong>
              <span style="font-size: 11px; font-family: var(--font-mono); color: ${badgeColor};">${badgeText}</span>
            </div>
            <div style="color: #cbd5e1; font-size: 0.81rem;">
              <em>หลักการสำคัญ:</em> ${correctChoiceObj.text}
            </div>
          </div>
        `;
      });
      evidenceListEl.innerHTML = evidenceHTML;
    }

    const reasoningEl = document.getElementById('cer-reasoning-text');
    if (reasoningEl) {
      reasoningEl.innerHTML = `
        <strong>1. ความรู้พื้นฐานของเอไอ (AI Literacy):</strong> เข้าใจกลไกการเรียนรู้จากข้อมูลของ <em>Machine Learning</em>, การลองผิดลองถูกเพื่อรับรางวัลใน <em>Reinforcement Learning</em>, โครงข่ายประสาทเทียมหลายชั้นใน <em>Deep Learning</em> และข้อจำกัดเรื่องอาการหลอน <em>(AI Hallucination)</em> ของโมเดลภาษาขนาดใหญ่ (LLM)<br><br>
        <strong>2. จริยธรรมปัญญาประดิษฐ์ (AI Ethics):</strong> ยึดมั่นในความเป็นธรรมไม่เลือกปฏิบัติ <em>(Fairness &amp; Anti-Bias)</em>, การคุ้มครองข้อมูลส่วนบุคคล <em>(Data Privacy)</em>, ความโปร่งใสที่อธิบายเหตุผลได้ <em>(Explainable AI)</em>, ความรับผิดชอบของมนุษย์ <em>(Accountability &amp; Human-in-the-Loop)</em>, การรู้เท่าทันสื่อปลอม <em>(Deepfakes)</em> และความปลอดภัยสอดคล้องคุณค่ามนุษยชาติ <em>(AI Alignment)</em>
      `;
    }

    if (this.ui.cerReportModal) {
      this.ui.cerReportModal.classList.remove('hidden');
    }
  }

  exportCERReport() {
    const elapsedSec = this.finalElapsedSec || Math.round((Date.now() - this.missionStartTime) / 1000);
    const timeStr = this.formatMinutesSeconds(elapsedSec);
    const score = this.investigation.evidenceScore;
    const accuracy = Math.round((this.investigation.correctCount / this.totalSamples) * 100);

    let report = `# 🤖 รายงานภารกิจพิชิต 10 สถานี: จริยธรรม AI & ความรู้พื้นฐาน AI\n`;
    report += `**หุ่นยนต์สำรวจ:** ARES-6 Autonomous Martian Hexapod\n`;
    report += `**คะแนนรวม:** ${score}/100 pts (ตอบถูกครั้งแรก ${accuracy}%)\n`;
    report += `**เวลาที่ใช้ไปทั้งหมด:** ${timeStr}\n`;
    report += `**เกราะหุ่นยนต์คงเหลือ:** ${Math.round(this.hullHP)}% HP\n\n`;

    report += `## บันทึกการปลดล็อกทั้ง 10 สถานี (AI-01 ถึง AI-10)\n`;
    if (this.terrain && this.terrain.samples) {
      this.terrain.samples.forEach((s) => {
        const res = this.investigation.sampleResults[s.id] || { attempts: 1, earnedPoints: 10 };
        report += `- **${s.thaiName} (${s.code}):** ได้รับ ${res.earnedPoints} คะแนน (ตอบ ${res.attempts} ครั้ง)\n`;
      });
    }
    report += `\n---\n*สื่อการเรียนรู้ AI Literacy & AI Ethics พัฒนาโดย ดร.อภิสิทธิ์ ธงไชย*\n`;

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

    // Hull Integrity (HP) survival bar
    const hp = Math.max(0, Math.round(this.hullHP));
    const hpColor = hp > 60 ? '#4ade80' : (hp > 30 ? '#fbbf24' : '#f43f5e');
    if (this.ui.hpVal) {
      this.ui.hpVal.textContent = `${hp}%`;
      this.ui.hpVal.style.color = hpColor;
    }
    if (this.ui.hpBar) {
      this.ui.hpBar.style.width = `${hp}%`;
      this.ui.hpBar.className = hp > 60 ? 'gauge-bar bg-emerald-500' : (hp > 30 ? 'gauge-bar bg-amber-500' : 'gauge-bar bg-rose-500');
    }
    if (this.ui.navHp) {
      this.ui.navHp.textContent = `HP ${hp}%`;
      this.ui.navHp.style.color = hpColor;
    }
    if (this.ui.ribbonHp) {
      this.ui.ribbonHp.textContent = `${hp}%`;
      this.ui.ribbonHp.style.color = hpColor;
    }

    // Warning alert if rover tilt exceeds safe threshold
    if (this.leveler.tiltAngleDeg > 28) {
      if (this.ui.warningToast) {
        this.ui.warningToast.classList.remove('hidden');
      }
      this.audio.playAlert();
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

    // AI Mission Question Counter & Score
    if (this.ui.sampleCounter) {
      this.ui.sampleCounter.textContent = `${this.collectedSamples.size} / ${this.totalSamples} ข้อ`;
    }
    if (this.ui.evidenceScoreVal) {
      this.ui.evidenceScoreVal.textContent = `${this.investigation.evidenceScore}/100 pts`;
    }
    if (this.ui.evidenceBar) {
      const pct = Math.min(100, Math.round((this.collectedSamples.size / this.totalSamples) * 100));
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
    if (this.ui.navSamples) this.ui.navSamples.textContent = `${this.collectedSamples.size}/${this.totalSamples} ข้อ`;

    // 6-Leg stance status indicators
    this.hexapod.legs.forEach((leg, idx) => {
      const dot = this.ui.legDots[idx];
      if (dot) {
        dot.className = leg.isGrounded ? 'leg-dot grounded' : 'leg-dot swing';
      }
    });

    // Active Mission Elapsed Timer (Explicit Minutes & Seconds)
    const elapsedSec = this.missionComplete && this.finalElapsedSec !== null
      ? this.finalElapsedSec
      : Math.floor((Date.now() - this.missionStartTime) / 1000);
    const m = Math.floor(elapsedSec / 60);
    const s = elapsedSec % 60;
    const shortTimerStr = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    const fullTimerStr = `${m < 10 ? '0' : ''}${m} นาที ${s < 10 ? '0' : ''}${s} วินาที`;

    const timerEl = document.getElementById('hud-mission-timer');
    if (timerEl) timerEl.textContent = fullTimerStr;
    if (this.ui.ribbonTimer) this.ui.ribbonTimer.textContent = shortTimerStr;
    if (this.ui.navTimer) this.ui.navTimer.textContent = fullTimerStr;

    // Announce every elapsed minute milestone
    if (!this.missionComplete && !this.isGameOver && m > this.lastAnnouncedMinute) {
      this.lastAnnouncedMinute = m;
      if (this.ui.minuteToast && this.ui.minuteToastText) {
        this.ui.minuteToastText.textContent = `⏱️ เวลาผ่านไปแล้ว ${m} นาที! (ตอบถูกแล้ว ${this.collectedSamples.size}/10 ข้อ · เกราะ ${hp}% HP)`;
        this.ui.minuteToast.classList.remove('hidden');
        if (this.minuteToastTimer) clearTimeout(this.minuteToastTimer);
        this.minuteToastTimer = setTimeout(() => {
          this.ui.minuteToast?.classList.add('hidden');
        }, 4200);
      }
    }

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
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 85 * scale, 0, Math.PI * 2);
    ctx.stroke();

    // Draw Rock Obstacles as subtle tactical blips
    if (this.terrain.rocks) {
      ctx.fillStyle = 'rgba(180, 83, 9, 0.35)';
      for (let i = 0; i < this.terrain.rocks.length; i++) {
        const rock = this.terrain.rocks[i];
        const rx = w / 2 + rock.position.x * scale;
        const rz = h / 2 - rock.position.z * scale;
        ctx.beginPath();
        ctx.arc(rx, rz, Math.max(1.0, rock.radius * scale * 0.65), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw Hostile Hazards (Red for Drones, Purple for Mines, Orange rings for Storms)
    if (this.terrain.hazards) {
      this.terrain.hazards.forEach((haz) => {
        const hx = w / 2 + haz.position.x * scale;
        const hz = h / 2 - haz.position.z * scale;
        if (haz.type === 'drone') {
          ctx.fillStyle = haz.isChasing ? '#ff1e42' : '#ef4444';
          ctx.beginPath();
          ctx.arc(hx, hz, haz.isChasing ? 3.8 : 2.8, 0, Math.PI * 2);
          ctx.fill();
        } else if (haz.type === 'mine') {
          ctx.fillStyle = '#d946ef';
          ctx.beginPath();
          ctx.arc(hx, hz, 2.0, 0, Math.PI * 2);
          ctx.fill();
        } else if (haz.type === 'storm') {
          ctx.strokeStyle = '#f97316';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(hx, hz, 3.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    }

    // Draw 10 AI Question Stations
    this.terrain.samples.forEach((sample) => {
      const sx = w / 2 + sample.position.x * scale;
      const sz = h / 2 - sample.position.z * scale;
      ctx.fillStyle = sample.collected ? '#475569' : '#' + sample.color.toString(16).padStart(6, '0');
      ctx.beginPath();
      ctx.arc(sx, sz, sample.collected ? 2.2 : 4.2, 0, Math.PI * 2);
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

    // Collect targets: 10 AI Ethics & Literacy stations
    const targets = [];
    let nearestUncollectedId = null;
    let nearestDist = Infinity;

    if (this.terrain && this.terrain.samples) {
      this.terrain.samples.forEach((s) => {
        const d = Math.round(roverPos.distanceTo(s.position));
        if (!s.collected && d < nearestDist) {
          nearestDist = d;
          nearestUncollectedId = s.id;
        }
        targets.push({
          id: s.id,
          name: s.code || s.id.toUpperCase(),
          thaiName: s.thaiName,
          pos: s.position.clone().add(new THREE.Vector3(0, 2.5, 0)),
          color: '#' + s.color.toString(16).padStart(6, '0'),
          collected: s.collected,
          dist: d,
          isNearest: false
        });
      });
    }

    targets.forEach((t) => {
      if (t.id === nearestUncollectedId) t.isNearest = true;
    });

    const w = window.innerWidth;
    const h = window.innerHeight;
    const topSafeY = 124;
    const bottomSafeY = h - 105;
    const sidePadding = 44;

    let html = '';

    targets.forEach((t) => {
      const dist = t.dist;

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
        chipEl.classList.toggle('primary-pulse', !!t.isNearest && !t.collected);
      }

      // Hide already-collected stations from floating 3D view
      if (t.collected) return;

      const proj = t.pos.clone().project(this.camera);
      const isBehind = proj.z > 1.0;

      let screenX = (proj.x * 0.5 + 0.5) * w;
      let screenY = (-(proj.y * 0.5) + 0.5) * h;

      const isOffScreen = isBehind || screenX < sidePadding || screenX > (w - sidePadding) || screenY < topSafeY || screenY > bottomSafeY;

      if (isOffScreen) {
        // Only show off-screen directional edge arrow for the NEAREST uncollected station to keep viewport clean
        if (!t.isNearest) return;

        let cx = screenX - w / 2;
        let cy = screenY - h / 2;
        if (isBehind) {
          cx = -cx;
          cy = -cy;
        }
        const angle = Math.atan2(cy, cx);
        const halfW = w / 2 - sidePadding;
        const halfH = (bottomSafeY - topSafeY) / 2;
        const centerSafeY = (topSafeY + bottomSafeY) / 2;

        screenX = w / 2 + halfW * Math.cos(angle);
        screenY = centerSafeY + halfH * Math.sin(angle);

        const deg = Math.round(angle * (180 / Math.PI));
        html += `
          <div class="waypoint-pin edge primary" style="left: ${screenX.toFixed(0)}px; top: ${screenY.toFixed(0)}px; --accent: ${t.color};">
            <span class="wp-pin-arrow" style="transform: rotate(${deg}deg);">➤</span>
            <span class="wp-pin-badge">เป้าหมายใกล้สุด: ${t.name} (${dist}m)</span>
          </div>
        `;
      } else {
        html += `
          <div class="waypoint-pin in-screen ${t.isNearest ? 'primary' : ''}" style="left: ${screenX.toFixed(0)}px; top: ${screenY.toFixed(0)}px; --accent: ${t.color};">
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

      // Dynamic Support Polygon & Static Stability Margin (STEM Kinematics)
      if (this.supportPolygon) {
        const groundNormal = this.terrain.getNormal(this.hexapod.position.x, this.hexapod.position.z);
        const slopeDeg = Math.acos(Math.max(0, Math.min(1, groundNormal.y))) * (180 / Math.PI);
        const stats = this.supportPolygon.update(groundedContacts, this.hexapod.position, this.gait.mode, slopeDeg);
        const contactsEl = document.getElementById('gait-telemetry-contacts');
        const areaEl = document.getElementById('gait-telemetry-area');
        const marginEl = document.getElementById('gait-telemetry-margin');
        if (contactsEl) contactsEl.textContent = `${stats.contactCount}/6`;
        if (areaEl) areaEl.textContent = `${stats.area.toFixed(2)} m²`;
        if (marginEl) marginEl.textContent = `${stats.stabilityMargin.toFixed(2)} m`;
      }
    }

    // Update Martian regolith dust particle billows (g_mars = 3.72 m/s²)
    if (this.dust) {
      this.dust.update(dt);
    }

    // Update active leveler A/B empirical sampling
    this.updateLevelerTrial(dt);

    // Update live 6-leg joint telemetry when Kinematics Inspector is active
    if (this.kinematicsInspector && this.hexapod && this.hexapod.legs) {
      const inspectorModal = document.getElementById('inspector-modal');
      if (inspectorModal && !inspectorModal.classList.contains('hidden')) {
        this.kinematicsInspector.updateLiveTelemetry(this.hexapod.legs);
      }
    }

    // Update Orbital Reconnaissance GIS map & transect when active
    if (this.orbitalGis && this.hexapod) {
      this.orbitalGis.update(this.hexapod.position, this.hexapod.rotation.y);
    }

    // 3. Update Terrain Beacons, Hostile Hazards & Missions
    const welcomeModal = document.getElementById('welcome-modal');
    const isWelcomeOpen = welcomeModal && !welcomeModal.classList.contains('hidden');
    const isPaused = this.isGameOver || this.missionComplete || this.investigation.spectrometerOpen || isWelcomeOpen;
    this.terrain.update(time, dt, this.hexapod.position, isPaused);
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
  window.marsApp = new MarsGameApp();
});
