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
    this.dpadState = { up: false, down: false, left: false, right: false };
    this.steerMode = 'camera'; // 'camera' (ตามมุมมองกล้อง) or 'rover' (ตามหัวหุ่น)

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

      if (e.code === 'KeyR') this.toggleSteerMode();
      if (e.code === 'KeyL') this.toggleLeveler();
      if (e.code === 'KeyG') this.toggleGait();
      if (e.code === 'KeyE') this.toggleExperimentsModal();
      if (e.code === 'KeyC') this.toggleCameraMode();
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
      ribbonTimer: document.getElementById('ribbon-timer-val')
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
    if (this.ui.gaitExpModal) {
      this.ui.gaitExpModal.classList.add('hidden');
    }
    this.audio.playScan();
  }

  runLevelerTrial(trial) {
    const expTiltA = document.getElementById('exp-tilt-a');
    const expJitterA = document.getElementById('exp-jitter-a');
    const expStabA = document.getElementById('exp-stab-a');
    const expTiltB = document.getElementById('exp-tilt-b');
    const expJitterB = document.getElementById('exp-jitter-b');
    const expStabB = document.getElementById('exp-stab-b');

    if (trial === 'a') {
      // Trial A: OFF
      this.leveler.enabled = false;
      if (this.ui.levelerStatus) {
        this.ui.levelerStatus.textContent = 'OFF (TRIAL A)';
        this.ui.levelerStatus.className = 'text-rose-400 font-bold';
      }
      if (expTiltA) expTiltA.textContent = '21.4° (เอียงเต็มพิกัด)';
      if (expJitterA) expJitterA.textContent = '±5.2° (ไร้ตัวซับแรงสั่น)';
      if (expStabA) expStabA.textContent = '28% (เสี่ยงคว่ำ)';
      this.audio.playAlert();
    } else {
      // Trial B: ON
      this.leveler.enabled = true;
      if (this.ui.levelerStatus) {
        this.ui.levelerStatus.textContent = 'ON (ACTIVE TRIAL B)';
        this.ui.levelerStatus.className = 'text-emerald-400 font-bold';
      }
      if (expTiltB) expTiltB.textContent = '3.1° (ปรับระนาบคงที่)';
      if (expJitterB) expJitterB.textContent = '±0.3° (Damping 0.08)';
      if (expStabB) expStabB.textContent = '92% (เสถียรภาพสูงสุด)';
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

    if (this.ui.cerReportModal) {
      this.ui.cerReportModal.classList.remove('hidden');
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
    if (this.ui.solarCosVal) this.ui.solarCosVal.textContent = `cos θ: ${this.solarCosTheta.toFixed(2)}`;
    if (this.ui.solarVal) this.ui.solarVal.textContent = `+${this.solarCharging.toFixed(2)} kW`;

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

    // Update Mobile Ribbon live indicators
    if (this.ui.ribbonSpeed) this.ui.ribbonSpeed.textContent = `${effectiveDisplaySpeed.toFixed(1)} m/s`;
    if (this.ui.ribbonBattery) this.ui.ribbonBattery.textContent = `${Math.round(this.battery)}%`;
    if (this.ui.ribbonSamples) this.ui.ribbonSamples.textContent = `${this.collectedSamples.size}/${this.totalSamples}`;

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
