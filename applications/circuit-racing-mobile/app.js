/**
 * ==========================================================================
 * Ferrari Circuit Racing 3D - Mobile Edition
 * Main Application Controller (Optimized for Mobile Viewports & Touch Driving)
 * Powered by Three.js & Web Audio API
 * Developed for Dr. Apisit Tongchai's Educational Portfolio
 * ==========================================================================
 */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RacingTrack } from './track.js';
import { RacingCar, CAR_MODELS_DATA, initFerrariMasterModel } from './car.js';
import { VehiclePhysics } from './physics.js';
import { AIRacingController } from './ai.js';
import { RacingAudio } from './audio.js';
import { RacingHUD } from './hud.js';

class GrandPrixMobileGame {
  constructor() {
    this.state = 'LOBBY'; // 'LOBBY' | 'COUNTDOWN' | 'RACING' | 'PAUSED' | 'FINISHED'
    
    // Player Configuration (from Lobby)
    this.playerConfig = {
      driverName: 'Dr. Apisit',
      nationality: '🇹🇭',
      modelId: 'sf90_gt',
      trackId: 'monza',
      paintColor: '#e61d24',
      racingNumber: 7,
      totalLaps: 3
    };

    // Pause State Tracking
    this.prevStateBeforePause = null;
    this.pauseStartTime = 0;

    // Three.js Core
    this.container = document.getElementById('canvas-container');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();

    // Game Systems
    this.track = null;
    this.audio = new RacingAudio();
    this.hud = null;

    // Racers
    this.playerCar = null;
    this.playerPhysics = null;
    this.aiRacers = [];
    this.allCarsPhysics = [];

    // Camera System
    this.cameraMode = 'chase'; // 'chase' | 'hood' | 'tv'
    this.cameraLookTarget = new THREE.Vector3();
    this.cameraLookTargetInitialized = false;

    // Controls
    this.keys = {};
    this.virtualControls = {
      throttle: false,
      brake: false,
      steerLeft: false,
      steerRight: false,
      handbrake: false
    };
    this.controls = { throttle: 0, brake: 0, steer: 0, handbrake: false };

    // Race Timing & Progress
    this.raceStartTime = 0;
    this.currentLapStartTime = 0;
    this.currentLapTime = 0;
    this.bestLapTime = 0;
    this.lapTimes = [];
    this.raceResults = [];

    // Particles (Tire Smoke & Wall Collision Sparks)
    this.smokeParticles = [];
    this.sparkParticles = [];

    // 3D Preview in Lobby
    this.previewCarGroup = null;
    this.isAutoRotating = true;

    this.init();
  }

  async init() {
    this.setupScene();
    this.setupLighting();
    this.setupTrack();
    this.setupHUD();
    this.setupEventListeners();
    this.setupVirtualControls();
    this.setupLobbyUI();
    this.setupParticleSystem();

    // Preload & decode official CAD Ferrari model
    await initFerrariMasterModel();

    // Start in Lobby with 3D rotating preview
    this.enterLobby();

    // Start main render loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    // Autostart URL parameters support for testing and automated verification
    if (typeof window !== 'undefined' && window.location.search.includes('autostart=1')) {
      this.startRaceCountdown();
      if (window.location.search.includes('autolaunch=1')) {
        this.launchRace();
        if (window.location.search.includes('drive=1')) {
          this.virtualControls.throttle = true;
        }
      }
    }
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbae6fd);
    this.scene.fog = new THREE.FogExp2(0xbae6fd, 0.0011);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const initialFov = aspect < 1.0 ? 70 : 58;
    this.camera = new THREE.PerspectiveCamera(initialFov, aspect, 0.1, 1500);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(width, height);
    // Highest visual fidelity matching original, up to 2x for Retina & OLED screens
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    // Automotive PBR Softbox Studio Environment Reflections
    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(environment).texture;

    this.container.appendChild(this.renderer.domElement);
  }

  setupLighting() {
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x2f6b32, 0.85);
    this.scene.add(hemiLight);
    this.hemiLight = hemiLight;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambientLight);
    this.ambientLight = ambientLight;

    // Directional Sunlight with full 2048 sharp shadow map for pristine visual fidelity
    const sunLight = new THREE.DirectionalLight(0xfffbeb, 2.2);
    sunLight.position.set(220, 340, 180);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 800;
    const d = 160;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0004;
    this.scene.add(sunLight);
    this.sunLight = sunLight;
  }

  setupTrack() {
    this.track = new RacingTrack(this.scene, this.playerConfig.trackId || 'monza');
    this.track.applyAtmosphere(this.scene, this.sunLight, this.hemiLight, this.ambientLight, this.renderer);
  }

  switchTrack(trackId) {
    if (this.track) {
      this.track.dispose();
    }
    this.playerConfig.trackId = trackId;
    this.track = new RacingTrack(this.scene, trackId);
    this.track.applyAtmosphere(this.scene, this.sunLight, this.hemiLight, this.ambientLight, this.renderer);
    if (this.hud) {
      this.hud.setTrack(this.track);
    }
  }

  setupHUD() {
    this.hud = new RacingHUD(this.track);
  }

  setupParticleSystem() {
    // Mobile-optimized particle pools (24 smoke, 20 sparks)
    const smokeGeo = new THREE.DodecahedronGeometry(0.35, 1);
    const smokeMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.4
    });

    for (let i = 0; i < 24; i++) {
      const mesh = new THREE.Mesh(smokeGeo, smokeMat.clone());
      mesh.visible = false;
      this.scene.add(mesh);
      this.smokeParticles.push({
        mesh,
        life: 0,
        maxLife: 0.55,
        velocity: new THREE.Vector3()
      });
    }

    const sparkGeo = new THREE.BoxGeometry(0.08, 0.08, 0.22);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });

    for (let i = 0; i < 20; i++) {
      const mesh = new THREE.Mesh(sparkGeo, sparkMat);
      mesh.visible = false;
      this.scene.add(mesh);
      this.sparkParticles.push({
        mesh,
        life: 0,
        maxLife: 0.32,
        velocity: new THREE.Vector3()
      });
    }
  }

  spawnSmoke(pos, intensity = 1.0) {
    const p = this.smokeParticles.find(item => item.life <= 0);
    if (!p) return;
    p.mesh.position.copy(pos);
    p.mesh.position.y += 0.2;
    p.mesh.visible = true;
    p.life = p.maxLife;
    p.mesh.material.opacity = 0.45 * intensity;
    p.mesh.scale.set(1, 1, 1);
    p.velocity.set(
      (Math.random() - 0.5) * 1.5,
      Math.random() * 1.8 + 0.8,
      (Math.random() - 0.5) * 1.5
    );
  }

  spawnSparks(pos, normal) {
    for (let i = 0; i < 5; i++) {
      const p = this.sparkParticles.find(item => item.life <= 0);
      if (!p) break;
      p.mesh.position.copy(pos);
      p.mesh.position.y += 0.4 + Math.random() * 0.4;
      p.mesh.visible = true;
      p.life = p.maxLife * (0.6 + Math.random() * 0.4);
      p.velocity.set(
        normal.x * (Math.random() * 8 + 4) + (Math.random() - 0.5) * 4,
        Math.random() * 5 + 2.5,
        normal.z * (Math.random() * 8 + 4) + (Math.random() - 0.5) * 4
      );
    }
  }

  updateParticles(dt) {
    this.smokeParticles.forEach(p => {
      if (p.life > 0) {
        p.life -= dt;
        p.mesh.position.addScaledVector(p.velocity, dt);
        const scale = 1 + (1 - p.life / p.maxLife) * 3.2;
        p.mesh.scale.set(scale, scale, scale);
        p.mesh.material.opacity = (p.life / p.maxLife) * 0.4;
        if (p.life <= 0) p.mesh.visible = false;
      }
    });

    this.sparkParticles.forEach(p => {
      if (p.life > 0) {
        p.life -= dt;
        p.velocity.y -= 22 * dt;
        p.mesh.position.addScaledVector(p.velocity, dt);
        if (p.life <= 0) p.mesh.visible = false;
      }
    });
  }

  setupEventListeners() {
    // Keyboard support (for testing / external tablet keyboards)
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.key) {
        this.keys[e.key] = true;
        this.keys[e.key.toLowerCase()] = true;
      }
      if (!this.audio.initialized) this.audio.init();

      const preventKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', ' '];
      if (preventKeys.includes(e.code) || preventKeys.includes(e.key)) {
        e.preventDefault();
      }

      if (e.code === 'KeyC' || e.key === 'c') this.cycleCamera();
      if (e.code === 'KeyM' || e.key === 'm') {
        const isMuted = this.audio.toggleMute();
        const muteBtn = document.getElementById('btn-mute');
        if (muteBtn) muteBtn.textContent = isMuted ? '🔇' : '🔊';
      }
      if (e.code === 'KeyR' || e.key === 'r') {
        if (this.state === 'RACING') this.resetPlayerToTrack();
      }
      if (e.code === 'Escape' || e.code === 'KeyP' || e.key === 'p') {
        if (this.state === 'RACING' || this.state === 'COUNTDOWN') this.pauseRace();
        else if (this.state === 'PAUSED') this.resumeRace();
      }
      if (this.state === 'COUNTDOWN' && (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp')) {
        this.launchRace();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      if (e.key) {
        this.keys[e.key] = false;
        this.keys[e.key.toLowerCase()] = false;
      }
    });

    window.addEventListener('blur', () => {
      this.keys = {};
    });

    // Mobile Audio unlocking on first user interaction
    const unlockAudio = () => {
      if (!this.audio.initialized) {
        this.audio.init();
      }
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('click', unlockAudio, { passive: true });

    // Handle screen resize & orientation change with responsive debounce
    const onResizeOrRotate = () => {
      this.handleScreenResize();
      setTimeout(() => this.handleScreenResize(), 80);
      setTimeout(() => this.handleScreenResize(), 250);
    };
    window.addEventListener('resize', onResizeOrRotate);
    window.addEventListener('orientationchange', onResizeOrRotate);
    if (window.screen && window.screen.orientation) {
      window.screen.orientation.addEventListener('change', onResizeOrRotate);
    }

    // Fullscreen Toggle Actions
    const fsLobbyBtn = document.getElementById('btn-fullscreen-lobby');
    if (fsLobbyBtn) {
      fsLobbyBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    const fsHudBtn = document.getElementById('btn-fullscreen-hud');
    if (fsHudBtn) {
      fsHudBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    const fsPauseBtn = document.getElementById('btn-pause-fullscreen');
    if (fsPauseBtn) {
      fsPauseBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    document.addEventListener('fullscreenchange', () => this.updateFullscreenUI());
    document.addEventListener('webkitfullscreenchange', () => this.updateFullscreenUI());
    document.addEventListener('mozfullscreenchange', () => this.updateFullscreenUI());
    document.addEventListener('MSFullscreenChange', () => this.updateFullscreenUI());

    // Top Bar Quick Actions
    const muteBtn = document.getElementById('btn-mute');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = this.audio.toggleMute();
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    const camBtn = document.getElementById('btn-camera');
    if (camBtn) {
      camBtn.addEventListener('click', () => this.cycleCamera());
    }

    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetPlayerToTrack());
    }

    const pauseBtn = document.getElementById('btn-pause');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        if (this.state === 'RACING' || this.state === 'COUNTDOWN') this.pauseRace();
        else if (this.state === 'PAUSED') this.resumeRace();
      });
    }

    // In-Game Pause Modal Action Buttons
    const pauseResumeBtn = document.getElementById('btn-pause-resume');
    if (pauseResumeBtn) {
      pauseResumeBtn.addEventListener('click', () => this.resumeRace());
    }

    const pauseRestartBtn = document.getElementById('btn-pause-restart');
    if (pauseRestartBtn) {
      pauseRestartBtn.addEventListener('click', () => this.restartRace());
    }

    const pauseExitBtn = document.getElementById('btn-pause-exit');
    if (pauseExitBtn) {
      pauseExitBtn.addEventListener('click', () => this.exitToGarage());
    }

    const pauseMuteBtn = document.getElementById('btn-pause-mute');
    if (pauseMuteBtn) {
      pauseMuteBtn.addEventListener('click', () => {
        const isMuted = this.audio.toggleMute();
        pauseMuteBtn.textContent = isMuted ? '🔇 เปิดเสียง' : '🔊 ปิดเสียง';
        if (muteBtn) muteBtn.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    const pauseCamBtn = document.getElementById('btn-pause-cam');
    if (pauseCamBtn) {
      pauseCamBtn.addEventListener('click', () => this.cycleCamera());
    }

    // Countdown overlay click/tap bypass
    const countdownOverlay = document.getElementById('countdown-overlay');
    if (countdownOverlay) {
      countdownOverlay.addEventListener('click', () => {
        if (this.state === 'COUNTDOWN') this.launchRace();
      });
      countdownOverlay.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (this.state === 'COUNTDOWN') this.launchRace();
      }, { passive: false });
    }

    // Dismiss orientation hint banner
    const tipBanner = document.getElementById('orientation-tip-banner');
    const closeTipBtn = document.getElementById('btn-close-orientation-tip');
    if (closeTipBtn && tipBanner) {
      closeTipBtn.addEventListener('click', () => {
        tipBanner.style.display = 'none';
      });
    }
  }

  handleScreenResize() {
    if (!this.renderer || !this.camera) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const isPortrait = aspect < 1.0;

    this.camera.aspect = aspect;

    if (this.state === 'LOBBY') {
      this.updateLobbyFraming(isPortrait);
    } else {
      if (this.cameraMode === 'chase') {
        const baseFov = isPortrait ? Math.min(82, 58 / Math.sqrt(Math.max(0.48, aspect))) : 58;
        this.camera.fov = baseFov;
      }
    }

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.checkOrientationTip();
  }

  updateLobbyFraming(isPortrait) {
    if (!this.previewCarGroup || !this.camera) return;
    if (isPortrait) {
      // Portrait framing: ground car at y=0.05, camera higher and tilted down
      this.previewCarGroup.position.set(0, 0.05, -11.2);
      this.previewCarGroup.rotation.y = Math.PI * 0.82;
      this.camera.position.set(3.8, 2.2, -6.0);
      this.camera.lookAt(0, -0.2, -11.2);
      this.camera.fov = 66;
    } else {
      // Landscape framing: lower camera, closer zoom, centered
      this.previewCarGroup.position.set(0, 0.05, -10.5);
      this.previewCarGroup.rotation.y = Math.PI * 0.82;
      this.camera.position.set(3.4, 1.35, -6.8);
      this.camera.lookAt(0, 0.5, -10.5);
      this.camera.fov = 50;
    }
    this.camera.updateProjectionMatrix();
  }

  toggleFullscreen() {
    const doc = document;
    const docEl = document.documentElement;
    const isFS = !!(doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement);

    if (!isFS) {
      const requestFS = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
      if (requestFS) {
        requestFS.call(docEl).catch(err => console.warn('Fullscreen request failed:', err));
      }
    } else {
      const exitFS = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen;
      if (exitFS) {
        exitFS.call(doc).catch(err => console.warn('Exit fullscreen failed:', err));
      }
    }
    this.updateFullscreenUI();
  }

  updateFullscreenUI() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    const lobbyBtn = document.getElementById('btn-fullscreen-lobby');
    if (lobbyBtn) {
      lobbyBtn.innerHTML = isFS ? '<span>🗗 ย่อจอ</span>' : '<span>⛶ เต็มจอ</span>';
    }
    const hudBtn = document.getElementById('btn-fullscreen-hud');
    if (hudBtn) {
      hudBtn.textContent = isFS ? '🗗' : '⛶';
    }
    const pauseBtn = document.getElementById('btn-pause-fullscreen');
    if (pauseBtn) {
      const str = pauseBtn.querySelector('strong');
      if (str) str.textContent = isFS ? 'ออกจากโหมดเต็มจอ (EXIT FULLSCREEN)' : 'เล่นแบบเต็มจอ (FULLSCREEN)';
    }
  }

  checkOrientationTip() {
    const tipBanner = document.getElementById('orientation-tip-banner');
    if (!tipBanner) return;
    // Show gentle landscape recommendation in portrait mode
    if (window.innerHeight > window.innerWidth) {
      tipBanner.style.display = 'flex';
    } else {
      tipBanner.style.display = 'none';
    }
  }

  /**
   * Binds virtual touch pedals and steering buttons for mobile with multi-touch sliding support
   */
  setupVirtualControls() {
    const triggerHaptic = (ms = 18) => {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(ms); } catch (err) {}
      }
    };

    const controlDefs = [
      { id: 'btn-touch-gas', prop: 'throttle' },
      { id: 'btn-touch-brake', prop: 'brake' },
      { id: 'btn-touch-drift', prop: 'handbrake' },
      { id: 'btn-touch-left', prop: 'steerLeft' },
      { id: 'btn-touch-right', prop: 'steerRight' }
    ];

    const buttons = controlDefs.map(def => ({
      id: def.id,
      prop: def.prop,
      el: document.getElementById(def.id)
    })).filter(item => item.el !== null);

    const setControlActive = (btnObj, active) => {
      if (this.virtualControls[btnObj.prop] !== active) {
        this.virtualControls[btnObj.prop] = active;
        if (active) {
          btnObj.el.classList.add('active');
          triggerHaptic(20);
          if (!this.audio.initialized) this.audio.init();
          if (this.state === 'COUNTDOWN') this.launchRace();
        } else {
          btnObj.el.classList.remove('active');
        }
      }
    };

    // Helper: evaluate which button is under coordinate (x, y)
    const findButtonAtPoint = (x, y) => {
      const hit = document.elementFromPoint(x, y);
      if (!hit) return null;
      const btnEl = hit.classList.contains('virtual-touch-btn') ? hit : hit.closest('.virtual-touch-btn');
      if (!btnEl) return null;
      return buttons.find(b => b.el === btnEl || b.id === btnEl.id) || null;
    };

    // Helper: evaluate all active touches across the screen
    const updateAllTouches = (touches) => {
      const activeButtons = new Set();
      for (let i = 0; i < touches.length; i++) {
        const t = touches[i];
        const found = findButtonAtPoint(t.clientX, t.clientY);
        if (found) {
          activeButtons.add(found);
        }
      }
      buttons.forEach(b => {
        setControlActive(b, activeButtons.has(b));
      });
    };

    // 1. Direct Touch Events on individual buttons (Instantaneous response)
    buttons.forEach(b => {
      b.el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setControlActive(b, true);
      }, { passive: false });

      b.el.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateAllTouches(e.touches);
      }, { passive: false });

      b.el.addEventListener('touchcancel', (e) => {
        e.preventDefault();
        setControlActive(b, false);
      }, { passive: false });

      // Mouse fallback for desktop testing
      b.el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        setControlActive(b, true);
      });
      b.el.addEventListener('mouseup', (e) => {
        e.preventDefault();
        setControlActive(b, false);
      });
      b.el.addEventListener('mouseleave', (e) => {
        e.preventDefault();
        setControlActive(b, false);
      });
    });

    // 2. Sliding Finger Tracking (Touchmove) across steering & pedals zones
    const virtualControlsContainer = document.getElementById('hud-virtual-controls');
    if (virtualControlsContainer) {
      virtualControlsContainer.addEventListener('touchmove', (e) => {
        e.preventDefault();
        updateAllTouches(e.touches);
      }, { passive: false });
    }

    // 3. Global Touch Safety Release (Prevent stuck steering or throttle)
    window.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) {
        buttons.forEach(b => setControlActive(b, false));
      } else {
        updateAllTouches(e.touches);
      }
    });

    window.addEventListener('touchcancel', (e) => {
      if (e.touches.length === 0) {
        buttons.forEach(b => setControlActive(b, false));
      } else {
        updateAllTouches(e.touches);
      }
    });
  }

  isKeyPressed(codes = [], keys = []) {
    for (const c of codes) {
      if (this.keys[c]) return true;
    }
    for (const k of keys) {
      if (this.keys[k] || this.keys[k.toLowerCase()]) return true;
    }
    return false;
  }

  cycleCamera() {
    if (this.cameraMode === 'chase') {
      this.cameraMode = 'hood';
    } else if (this.cameraMode === 'hood') {
      this.cameraMode = 'tv';
    } else {
      this.cameraMode = 'chase';
    }

    const camBadge = document.getElementById('hud-cam-mode');
    if (camBadge) {
      camBadge.textContent = this.cameraMode.toUpperCase();
    }
  }

  resetPlayerToTrack() {
    if (!this.playerPhysics || !this.track) return;
    const sample = this.track.getClosestSplineSample(this.playerPhysics.position);
    if (!sample) return;

    const tan = sample.tan;
    const heading = Math.atan2(-tan.x, -tan.z);
    this.playerPhysics.setPosition(sample.pos.clone().add(new THREE.Vector3(0, 0.1, 0)), heading);
    this.playerPhysics.speed = 0;
  }

  /**
   * Pre-Race Setup Lobby UI & 3D Interactive Preview
   */
  setupLobbyUI() {
    const driverInput = document.getElementById('input-driver-name');
    const flagSelect = document.getElementById('select-nationality');
    const numInput = document.getElementById('input-racing-number');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const customColorInput = document.getElementById('input-custom-color');
    const carCards = document.querySelectorAll('.car-model-card');
    const trackCards = document.querySelectorAll('.track-card');
    const lapsSelect = document.getElementById('select-laps');
    const startBtn = document.getElementById('btn-start-race');

    // Mobile Showroom Tabs Switcher
    const tabButtons = document.querySelectorAll('.showroom-tab-btn');
    const tabPanes = document.querySelectorAll('.showroom-tab-pane');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetId = btn.dataset.tab;
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });

    // Populate Driver Name
    if (driverInput) {
      driverInput.value = this.playerConfig.driverName;
      driverInput.addEventListener('input', (e) => {
        this.playerConfig.driverName = e.target.value.trim() || 'Driver';
      });
    }

    // Nationality Flag
    if (flagSelect) {
      flagSelect.addEventListener('change', (e) => {
        this.playerConfig.nationality = e.target.value;
      });
    }

    // Racing Number
    if (numInput) {
      numInput.value = this.playerConfig.racingNumber;
      numInput.addEventListener('input', (e) => {
        this.playerConfig.racingNumber = parseInt(e.target.value, 10) || 7;
      });
    }

    // Color swatches
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        colorSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        const color = swatch.dataset.color;
        this.playerConfig.paintColor = color;
        this.updatePreviewCarColor(color);
      });
    });

    if (customColorInput) {
      customColorInput.addEventListener('input', (e) => {
        this.playerConfig.paintColor = e.target.value;
        this.updatePreviewCarColor(e.target.value);
      });
    }

    // Car models selection
    carCards.forEach(card => {
      card.addEventListener('click', () => {
        carCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const model = card.dataset.model;
        this.playerConfig.modelId = model;
        this.updatePreviewCarModel(model);
      });
    });

    // Track selection
    trackCards.forEach(card => {
      card.addEventListener('click', () => {
        trackCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const track = card.dataset.track;
        this.switchTrack(track);
      });
    });

    // Total Laps selection
    if (lapsSelect) {
      lapsSelect.addEventListener('change', (e) => {
        this.playerConfig.totalLaps = parseInt(e.target.value, 10) || 3;
      });
    }

    // Start Race Button
    if (startBtn) {
      const handleStart = () => {
        if (document.activeElement && document.activeElement.blur) {
          document.activeElement.blur();
        }
        window.focus();
        this.startRaceCountdown();
      };
      startBtn.addEventListener('click', handleStart);
    }

    // Play Again button (Podium)
    const playAgainBtn = document.getElementById('btn-play-again');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        document.getElementById('podium-modal').classList.remove('active');
        this.startRaceCountdown();
      });
    }

    // Back to Garage button (Podium)
    const backGarageBtn = document.getElementById('btn-back-garage');
    if (backGarageBtn) {
      backGarageBtn.addEventListener('click', () => {
        document.getElementById('podium-modal').classList.remove('active');
        this.enterLobby();
      });
    }

    // Help modal toggle
    const helpBtn = document.getElementById('btn-toggle-help');
    const helpModal = document.getElementById('controls-help-modal');
    const closeHelpBtn = document.getElementById('btn-close-help');

    if (helpBtn && helpModal) {
      helpBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        helpModal.classList.toggle('active');
      });
    }

    if (closeHelpBtn && helpModal) {
      closeHelpBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        helpModal.classList.remove('active');
      });
    }

    window.addEventListener('click', (e) => {
      if (helpModal && helpModal.classList.contains('active')) {
        if (!e.target.closest('#controls-help-modal') && !e.target.closest('#btn-toggle-help')) {
          helpModal.classList.remove('active');
        }
      }
    });

    // 360-degree Interactive Touch Drag in Showroom
    let isDragging = false;
    let previousTouchX = 0;
    let resumeRotateTimeout = null;

    const startDrag = (x) => {
      if (this.state !== 'LOBBY') return;
      isDragging = true;
      previousTouchX = x;
      this.isAutoRotating = false;
      if (resumeRotateTimeout) clearTimeout(resumeRotateTimeout);
    };

    const moveDrag = (x) => {
      if (!isDragging || this.state !== 'LOBBY' || !this.previewCarGroup) return;
      const deltaX = x - previousTouchX;
      previousTouchX = x;
      this.previewCarGroup.rotation.y += deltaX * 0.009;
    };

    const endDrag = () => {
      if (isDragging) {
        isDragging = false;
        if (resumeRotateTimeout) clearTimeout(resumeRotateTimeout);
        resumeRotateTimeout = setTimeout(() => {
          this.isAutoRotating = true;
        }, 2500);
      }
    };

    // Canvas container touch rotation
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
      canvasContainer.addEventListener('mousedown', (e) => startDrag(e.clientX));
      window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
      window.addEventListener('mouseup', endDrag);

      canvasContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) startDrag(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) moveDrag(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener('touchend', endDrag);
    }
  }

  enterLobby() {
    this.state = 'LOBBY';
    if (this.audio) this.audio.stopEngine(0.1);

    if (this.playerCar) {
      this.scene.remove(this.playerCar.mesh);
      this.playerCar = null;
    }
    this.aiRacers.forEach(r => this.scene.remove(r.car.mesh));
    this.aiRacers = [];
    this.allCarsPhysics = [];

    const pauseModal = document.getElementById('pause-modal');
    if (pauseModal) pauseModal.style.display = 'none';

    const podiumModal = document.getElementById('podium-modal');
    if (podiumModal) podiumModal.classList.remove('active');

    document.getElementById('lobby-overlay').style.display = 'flex';
    document.getElementById('racing-hud').style.display = 'none';
    document.getElementById('countdown-overlay').style.display = 'none';

    this.checkOrientationTip();
    this.createPreviewCar();
  }

  pauseRace() {
    if (this.state !== 'RACING' && this.state !== 'COUNTDOWN') return;
    this.prevStateBeforePause = this.state;
    this.state = 'PAUSED';
    this.pauseStartTime = performance.now();
    if (this.audio) this.audio.stopEngine(0.15);

    const pauseModal = document.getElementById('pause-modal');
    if (pauseModal) {
      const carInfo = document.getElementById('pause-info-car');
      const trackInfo = document.getElementById('pause-info-track');
      const posInfo = document.getElementById('pause-info-pos');
      const lapInfo = document.getElementById('pause-info-lap');

      if (carInfo && this.playerCar && this.playerCar.modelConfig) {
        carInfo.textContent = this.playerCar.modelConfig.name;
      }
      if (trackInfo && this.track && this.track.currentTrackConfig) {
        trackInfo.textContent = `${this.track.currentTrackConfig.flag} ${this.track.currentTrackConfig.shortName}`;
      }
      if (posInfo) {
        const rank = this.getPlayerRank();
        posInfo.textContent = `P${rank} / ${this.allCarsPhysics.length || 6}`;
      }
      if (lapInfo && this.playerPhysics) {
        lapInfo.textContent = `LAP ${Math.min(this.playerConfig.totalLaps, this.playerPhysics.lapCount + 1)} / ${this.playerConfig.totalLaps}`;
      }

      pauseModal.style.display = 'flex';
    }
  }

  resumeRace() {
    if (this.state !== 'PAUSED') return;
    const pauseDuration = performance.now() - this.pauseStartTime;
    this.raceStartTime += pauseDuration;
    this.currentLapStartTime += pauseDuration;

    const pauseModal = document.getElementById('pause-modal');
    if (pauseModal) pauseModal.style.display = 'none';

    this.state = this.prevStateBeforePause || 'RACING';
    this.keys = {};
    if (this.audio) this.audio.startEngine();
  }

  restartRace() {
    const pauseModal = document.getElementById('pause-modal');
    if (pauseModal) pauseModal.style.display = 'none';
    this.startRaceCountdown();
  }

  exitToGarage() {
    this.enterLobby();
  }

  getPlayerRank() {
    if (!this.allCarsPhysics || this.allCarsPhysics.length === 0) return 1;
    const sorted = [...this.allCarsPhysics].map(physics => {
      const sample = this.track ? this.track.getClosestSplineSample(physics.position) : null;
      const u = sample ? sample.u : 0;
      return { physics, score: physics.lapCount + u };
    }).sort((a, b) => b.score - a.score);

    const playerIdx = sorted.findIndex(item => item.physics.isPlayer);
    return playerIdx >= 0 ? playerIdx + 1 : 1;
  }

  createPreviewCar() {
    if (this.previewCarGroup) {
      this.scene.remove(this.previewCarGroup);
    }

    this.previewCar = new RacingCar(this.playerConfig.modelId, {
      driverName: this.playerConfig.driverName,
      nationality: this.playerConfig.nationality,
      paintColor: this.playerConfig.paintColor,
      racingNumber: this.playerConfig.racingNumber
    });

    this.previewCarGroup = new THREE.Group();
    this.previewCarGroup.add(this.previewCar.mesh);

    this.scene.add(this.previewCarGroup);

    const aspect = window.innerWidth / window.innerHeight;
    this.updateLobbyFraming(aspect < 1.0);
    this.isAutoRotating = true;
  }

  updatePreviewCarColor(color) {
    if (this.previewCar) {
      this.previewCar.setPaintColor(color);
    }
  }

  updatePreviewCarModel(modelId) {
    this.createPreviewCar();
  }

  startRaceCountdown() {
    this.audio.init();
    this.audio.startEngine();

    document.getElementById('lobby-overlay').style.display = 'none';
    document.getElementById('podium-modal').classList.remove('active');

    if (this.previewCarGroup) {
      this.scene.remove(this.previewCarGroup);
      this.previewCarGroup = null;
    }

    if (this.playerCar) {
      this.scene.remove(this.playerCar.mesh);
    }
    this.aiRacers.forEach(r => this.scene.remove(r.car.mesh));
    this.aiRacers = [];
    this.allCarsPhysics = [];

    // Player Car Setup
    this.playerCar = new RacingCar(this.playerConfig.modelId, {
      driverName: this.playerConfig.driverName,
      nationality: this.playerConfig.nationality,
      paintColor: this.playerConfig.paintColor,
      racingNumber: this.playerConfig.racingNumber,
      isAI: false
    });
    this.scene.add(this.playerCar.mesh);
    this.playerPhysics = new VehiclePhysics(this.playerCar, true);

    const soundType = (this.playerCar.modelConfig && this.playerCar.modelConfig.soundType) || 'v8';
    const hasTurbo = !!(this.playerCar.modelConfig && (this.playerCar.modelConfig.id === 'sf90_gt' || this.playerCar.modelConfig.id === 'f40_lm'));
    this.audio.setCarProfile(this.playerConfig.modelId, soundType, hasTurbo);

    // AI Grid Generation (5 AI Racers)
    const aiEntries = AIRacingController.generateRandomGrid(this.playerConfig.modelId);
    aiEntries.forEach(entry => {
      this.scene.add(entry.car.mesh);
      const aiCtrl = new AIRacingController(entry.car, entry.physics, this.track);
      this.aiRacers.push({
        car: entry.car,
        physics: entry.physics,
        controller: aiCtrl,
        driver: entry.driver
      });
    });

    // Place 6 cars on starting grid slots (Player in P3 for exciting overtaking!)
    const gridOrder = [
      this.aiRacers[0].physics,
      this.aiRacers[1].physics,
      this.playerPhysics,
      this.aiRacers[2].physics,
      this.aiRacers[3].physics,
      this.aiRacers[4].physics
    ];

    gridOrder.forEach((physics, idx) => {
      const slot = this.track.gridSlots[idx];
      physics.setPosition(slot.pos.clone(), 0);
      physics.lapCount = 0;
      this.allCarsPhysics.push(physics);
    });

    // Camera initial framing
    const pPos = this.playerPhysics.position;
    const aspect = window.innerWidth / window.innerHeight;
    const startCamFov = aspect < 1.0 ? 70 : 58;
    this.camera.position.set(pPos.x, pPos.y + 2.0, pPos.z + 5.8);
    this.camera.lookAt(pPos.x, pPos.y + 0.9, pPos.z - 12);
    this.camera.fov = startCamFov;
    this.camera.updateProjectionMatrix();
    this.cameraLookTargetInitialized = false;

    // Show Mobile HUD
    document.getElementById('racing-hud').style.display = 'block';

    this.raceStartTime = performance.now();
    this.currentLapStartTime = this.raceStartTime;
    this.lapTimes = [];
    this.bestLapTime = 0;
    this.state = 'COUNTDOWN';

    this.runF1CountdownSequence();
  }

  runF1CountdownSequence() {
    const overlay = document.getElementById('countdown-overlay');
    if (overlay) overlay.style.display = 'block';

    const lights = overlay ? overlay.querySelectorAll('.countdown-light') : [];
    lights.forEach(l => l.classList.remove('red', 'green'));

    const txt = document.getElementById('countdown-text');
    if (txt) {
      txt.textContent = 'FORMATION GRID READY';
      txt.style.color = '#f8fafc';
    }

    const fallbackTimeout = setTimeout(() => {
      this.launchRace();
    }, 2800);

    let step = 0;
    const lightInterval = setInterval(() => {
      try {
        if (step < 3) {
          if (lights[step]) lights[step].classList.add('red');
          this.track.setGantryLights(step + 1, false);
          this.audio.playCountdownBeep(false);
          step++;
          if (txt) txt.textContent = `RED LIGHT ${step}...`;
        } else {
          clearInterval(lightInterval);
          clearTimeout(fallbackTimeout);
          setTimeout(() => {
            this.launchRace();
          }, 450);
        }
      } catch (err) {
        clearInterval(lightInterval);
        clearTimeout(fallbackTimeout);
        this.launchRace();
      }
    }, 450);
  }

  launchRace() {
    if (this.state === 'RACING') return;

    const overlay = document.getElementById('countdown-overlay');
    const txt = document.getElementById('countdown-text');
    const lights = overlay ? overlay.querySelectorAll('.countdown-light') : [];

    lights.forEach(l => {
      l.classList.remove('red');
      l.classList.add('green');
    });

    this.track.setGantryLights(0, true);
    this.audio.playCountdownBeep(true);

    if (txt) {
      txt.textContent = 'LIGHTS OUT & AWAY WE GO!';
      txt.style.color = '#22c55e';
    }

    this.state = 'RACING';
    this.raceStartTime = performance.now();
    this.currentLapStartTime = this.raceStartTime;

    setTimeout(() => {
      if (overlay) overlay.style.display = 'none';
    }, 800);
  }

  animate() {
    requestAnimationFrame(this.animate);
    const dt = this.clock.getDelta();

    if (this.track && this.track.update) {
      this.track.update(dt);
    }

    // State 1: Showroom Lobby
    if (this.state === 'LOBBY') {
      if (this.previewCarGroup && this.isAutoRotating) {
        this.previewCarGroup.rotation.y += dt * 0.35;
      }
      this.renderer.render(this.scene, this.camera);
      return;
    }

    // State 2: Paused
    if (this.state === 'PAUSED') {
      this.renderer.render(this.scene, this.camera);
      return;
    }

    // State 3: Racing or Starting Countdown
    if (this.state === 'RACING' || this.state === 'COUNTDOWN') {
      this.processPlayerControls();

      // Revving engine during countdown
      if (this.state === 'COUNTDOWN') {
        this.playerPhysics.speed = 0;
        this.playerPhysics.speedKmh = 0;
        this.controls.brake = 0;
        if (this.controls.throttle > 0) {
          this.playerPhysics.rpm = THREE.MathUtils.lerp(this.playerPhysics.rpm, 7800, dt * 8);
          const soundType = (this.playerCar.modelConfig && this.playerCar.modelConfig.soundType) || 'v8';
          const hasTurbo = !!(this.playerCar.modelConfig && (this.playerCar.modelConfig.id === 'sf90_gt' || this.playerCar.modelConfig.id === 'f40_lm'));
          this.audio.updateEngine(this.playerPhysics.rpm, 0, this.controls.throttle, true, {
            soundType,
            hasTurbo,
            brake: 0,
            gear: 1,
            dt
          });
        }
      }

      // Update Player Physics & Audio
      const audioToUpdate = (this.state === 'RACING' || this.state === 'COUNTDOWN') ? this.audio : null;
      this.playerPhysics.update(dt, this.controls, this.track, audioToUpdate);

      // Visuals
      if (this.playerCar) {
        this.playerCar.updateVisuals(
          this.playerPhysics.speedKmh,
          this.playerPhysics.steerAngle,
          this.controls.brake > 0.1 || this.controls.handbrake,
          dt
        );
      }

      // Tire smoke on drift
      if (this.playerPhysics.driftFactor > 0.25 || (this.playerPhysics.speed > 10 && this.controls.handbrake)) {
        const leftTire = this.playerCar.rearWheelLeft ? this.playerCar.rearWheelLeft.getWorldPosition(new THREE.Vector3()) : this.playerPhysics.position;
        const rightTire = this.playerCar.rearWheelRight ? this.playerCar.rearWheelRight.getWorldPosition(new THREE.Vector3()) : this.playerPhysics.position;
        this.spawnSmoke(leftTire, this.playerPhysics.driftFactor);
        this.spawnSmoke(rightTire, this.playerPhysics.driftFactor);
      }

      // Barrier sparks on wall hit
      if (this.playerPhysics.hitBarrierThisFrame) {
        this.spawnSparks(this.playerPhysics.position, this.playerPhysics.lastImpactNormal);
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try { navigator.vibrate(40); } catch (e) {}
        }
      }

      // Update AI Opponents
      this.aiRacers.forEach(racer => {
        if (this.state === 'RACING') {
          racer.controller.update(dt, this.allCarsPhysics);
          racer.physics.update(dt, racer.controller.controls, this.track, null);
          if (racer.car) {
            racer.car.updateVisuals(racer.physics.speedKmh, racer.physics.steerAngle, racer.controller.controls.brake > 0.1, dt);
          }
        }
      });

      // Car vs Car Collisions
      for (let i = 0; i < this.allCarsPhysics.length; i++) {
        for (let j = i + 1; j < this.allCarsPhysics.length; j++) {
          VehiclePhysics.checkCarCollision(this.allCarsPhysics[i], this.allCarsPhysics[j], this.audio);
        }
      }

      // Check Lap Checkpoints
      if (this.state === 'RACING') {
        this.checkLapProgression();
      }

      // Update Camera & Particles
      this.updateCamera(dt);
      this.updateParticles(dt);

      // Update HUD
      const curLapDuration = (performance.now() - this.currentLapStartTime) / 1000;
      this.hud.update(this.playerPhysics, this.allCarsPhysics, {
        totalLaps: this.playerConfig.totalLaps,
        currentLapTime: Math.max(0, curLapDuration),
        bestLapTime: this.bestLapTime
      });

      // Check Race Finished
      if (this.playerPhysics.lapCount >= this.playerConfig.totalLaps && this.state === 'RACING') {
        this.finishRace();
      }
    }

    // Dynamic Clouds & Sun shadow following
    if (this.track && this.track.updateClouds) {
      this.track.updateClouds(dt);
    }
    if (this.playerPhysics && this.sunLight) {
      this.sunLight.position.x = this.playerPhysics.position.x + 120;
      this.sunLight.position.z = this.playerPhysics.position.z + 80;
      this.sunLight.target.position.copy(this.playerPhysics.position);
      this.sunLight.target.updateMatrixWorld();
    }

    this.renderer.render(this.scene, this.camera);
  }

  processPlayerControls() {
    const isGas = this.isKeyPressed(['KeyW', 'ArrowUp'], ['w', 'up', 'ไ', 'ำ']) || this.virtualControls.throttle;
    const isBrake = this.isKeyPressed(['KeyS', 'ArrowDown'], ['s', 'down', 'ห']) || this.virtualControls.brake;
    const isLeft = this.isKeyPressed(['KeyA', 'ArrowLeft'], ['a', 'left', 'ฟ']) || this.virtualControls.steerLeft;
    const isRight = this.isKeyPressed(['KeyD', 'ArrowRight'], ['d', 'right', 'ก']) || this.virtualControls.steerRight;
    const isHandbrake = this.isKeyPressed(['Space'], [' ', 'spacebar']) || this.virtualControls.handbrake;

    this.controls.throttle = isGas ? 1.0 : 0.0;
    this.controls.brake = isBrake ? 1.0 : 0.0;

    let steerVal = 0;
    if (isLeft) steerVal += 1.0;
    if (isRight) steerVal -= 1.0;
    this.controls.steer = steerVal;
    this.controls.handbrake = isHandbrake;
  }

  checkLapProgression() {
    const p = this.playerPhysics;
    const sample = this.track.getClosestSplineSample(p.position);
    if (!sample) return;

    const u = sample.u;
    if (u > 0.25 && u < 0.35) p.lastCheckpoint = Math.max(p.lastCheckpoint, 1);
    if (u > 0.50 && u < 0.60) p.lastCheckpoint = Math.max(p.lastCheckpoint, 2);
    if (u > 0.78 && u < 0.88) p.lastCheckpoint = Math.max(p.lastCheckpoint, 3);

    // Lap Completion
    if (p.lastCheckpoint === 3 && u < 0.08) {
      p.lapCount++;
      p.lastCheckpoint = 0;

      const now = performance.now();
      const lapTime = (now - this.currentLapStartTime) / 1000;
      this.lapTimes.push(lapTime);

      if (this.bestLapTime === 0 || lapTime < this.bestLapTime) {
        this.bestLapTime = lapTime;
      }
      this.currentLapStartTime = now;

      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(60); } catch (e) {}
      }
    }

    // AI Checkpoints
    this.aiRacers.forEach(r => {
      const s = this.track.getClosestSplineSample(r.physics.position);
      if (s) {
        const uVal = s.u;
        if (uVal > 0.25 && uVal < 0.35) r.physics.lastCheckpoint = Math.max(r.physics.lastCheckpoint, 1);
        if (uVal > 0.78 && uVal < 0.88) r.physics.lastCheckpoint = Math.max(r.physics.lastCheckpoint, 3);
        if (r.physics.lastCheckpoint === 3 && uVal < 0.08) {
          r.physics.lapCount++;
          r.physics.lastCheckpoint = 0;
        }
      }
    });
  }

  updateCamera(dt) {
    if (!this.playerPhysics) return;

    const pPos = this.playerPhysics.position;
    const yaw = this.playerPhysics.yaw;
    const speedRatio = Math.min(1.0, Math.abs(this.playerPhysics.speedKmh) / 280);

    const aspect = window.innerWidth / window.innerHeight;
    const isPortrait = aspect < 1.0;

    if (this.cameraMode === 'chase') {
      // Dynamic camera elevation & distance tailored for mobile portrait vs landscape
      const distMult = isPortrait ? 1.32 : 1.0;
      const heightMult = isPortrait ? 1.4 : 1.0;

      const dist = (5.6 + speedRatio * 1.8) * distMult;
      const height = (1.9 + speedRatio * 0.4) * heightMult;

      const camX = pPos.x + Math.sin(yaw) * dist;
      const camY = pPos.y + height;
      const camZ = pPos.z + Math.cos(yaw) * dist;

      const targetCamPos = new THREE.Vector3(camX, camY, camZ);
      this.camera.position.lerp(targetCamPos, dt * 9.5);

      // Look Target
      const lookDist = 12 + speedRatio * 8;
      const lookY = isPortrait ? 1.2 : 0.9;
      const lookTarget = new THREE.Vector3(
        pPos.x - Math.sin(yaw) * lookDist,
        pPos.y + lookY,
        pPos.z - Math.cos(yaw) * lookDist
      );

      if (this.cameraLookTargetInitialized) {
        this.cameraLookTarget.lerp(lookTarget, dt * 10.5);
      } else {
        this.cameraLookTarget.copy(lookTarget);
        this.cameraLookTargetInitialized = true;
      }
      this.camera.lookAt(this.cameraLookTarget);

      // Dynamic FOV based on speed + aspect ratio
      const baseFov = isPortrait ? Math.min(82, 58 / Math.sqrt(Math.max(0.48, aspect))) : 58;
      const targetFov = baseFov + speedRatio * 14;
      this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, targetFov, dt * 6);
      this.camera.updateProjectionMatrix();

    } else if (this.cameraMode === 'hood') {
      const hoodOffset = -0.4;
      this.camera.position.set(
        pPos.x - Math.sin(yaw) * hoodOffset,
        pPos.y + 0.95,
        pPos.z - Math.cos(yaw) * hoodOffset
      );
      this.camera.lookAt(
        pPos.x - Math.sin(yaw) * 20,
        pPos.y + 0.8,
        pPos.z - Math.cos(yaw) * 20
      );
      this.camera.fov = isPortrait ? 80 : 72;
      this.camera.updateProjectionMatrix();

    } else {
      // Broadcast TV Cam
      const sample = this.track.getClosestSplineSample(pPos);
      const camHeight = 7;
      const tvPos = sample.pos.clone().addScaledVector(sample.norm, 16).add(new THREE.Vector3(0, camHeight, 0));
      this.camera.position.lerp(tvPos, dt * 2.5);
      this.camera.lookAt(pPos.x, pPos.y + 1, pPos.z);
    }
  }

  finishRace() {
    this.state = 'FINISHED';
    if (this.audio) {
      this.audio.stopEngine(0.5);
      this.audio.playCheckeredFlag();
    }

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate([60, 80, 120]); } catch (e) {}
    }

    const totalRaceTime = (performance.now() - this.raceStartTime) / 1000;

    const sortedCars = [...this.allCarsPhysics].map(physics => {
      const sample = this.track.getClosestSplineSample(physics.position);
      const u = sample ? sample.u : 0;
      return { physics, score: physics.lapCount + u };
    }).sort((a, b) => b.score - a.score);

    const playerRank = sortedCars.findIndex(item => item.physics.isPlayer) + 1;

    const podiumModal = document.getElementById('podium-modal');
    const podiumTitle = document.getElementById('podium-title');
    const podiumRankBadge = document.getElementById('podium-rank-badge');
    const tbody = document.getElementById('podium-results-tbody');

    if (podiumTitle) {
      if (playerRank === 1) {
        podiumTitle.textContent = '🏆 GRAND PRIX CHAMPION! 🏆';
        podiumTitle.style.color = '#fbbf24';
      } else if (playerRank <= 3) {
        podiumTitle.textContent = '🍾 PODIUM FINISH! 🍾';
        podiumTitle.style.color = '#38bdf8';
      } else {
        podiumTitle.textContent = '🏁 RACE COMPLETED';
        podiumTitle.style.color = '#e2e8f0';
      }
    }

    if (podiumRankBadge) {
      podiumRankBadge.textContent = `P${playerRank}`;
    }

    if (tbody) {
      let rows = '';
      sortedCars.forEach((item, idx) => {
        const car = item.physics.car;
        const isPlayer = item.physics.isPlayer;
        const pos = idx + 1;
        const gap = isPlayer ? this.hud.formatTime(totalRaceTime) : `+${(idx * 1.8 + Math.random() * 0.4).toFixed(2)}s`;
        const best = isPlayer ? this.hud.formatTime(this.bestLapTime) : `01:${(12 + idx * 0.8).toFixed(2)}`;

        rows += `
          <tr class="${isPlayer ? 'player-row' : ''}">
            <td class="pos-cell pos-${pos}">${pos}</td>
            <td class="driver-cell">${car.nationality || '🏁'} ${car.driverName || 'Racer'} ${isPlayer ? '⭐' : ''}</td>
            <td class="time-cell">${gap}</td>
            <td class="best-cell">${best}</td>
          </tr>
        `;
      });
      tbody.innerHTML = rows;
    }

    if (podiumModal) {
      podiumModal.classList.add('active');
    }
  }
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  new GrandPrixMobileGame();
});
