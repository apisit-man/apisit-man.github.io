/**
 * ==========================================================================
 * Professional Circuit Racing - Main Application Controller
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

class GrandPrixGame {
  constructor() {
    this.state = 'LOBBY'; // 'LOBBY' | 'COUNTDOWN' | 'RACING' | 'FINISHED'
    
    // Player Configuration (from Lobby)
    this.playerConfig = {
      driverName: 'Dr. Apisit',
      nationality: '🇹🇭',
      modelId: 'sf90_gt',
      paintColor: '#e61d24',
      racingNumber: 7,
      totalLaps: 3
    };

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
    this.aiRacers = []; // [{ car, physics, controller, driver }]
    this.allCarsPhysics = [];

    // Camera System
    this.cameraMode = 'chase'; // 'chase' | 'hood' | 'tv'
    this.cameraOffset = new THREE.Vector3(0, 3.2, 7.8);
    this.cameraLookOffset = new THREE.Vector3(0, 1.2, -4.0);
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
          this.keys['KeyW'] = true;
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
    this.camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 1500);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    // -------------------------------------------------------------
    // Automotive PBR Softbox Studio Environment Reflections
    // Gives car lacquer paint and chrome rims realistic glossy reflections!
    // -------------------------------------------------------------
    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(environment).texture;

    this.container.appendChild(this.renderer.domElement);
  }

  setupLighting() {
    // Natural outdoor sky dome light & ground bounce
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x2f6b32, 0.85);
    this.scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambientLight);

    // Brilliant Warm Directional Sunlight with Shadows
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
    this.track = new RacingTrack(this.scene);
  }

  setupHUD() {
    this.hud = new RacingHUD(this.track);
  }

  setupParticleSystem() {
    // 1. Tire Smoke Particles
    const smokeGeo = new THREE.SphereGeometry(0.35, 6, 6);
    const smokeMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.4
    });

    for (let i = 0; i < 40; i++) {
      const mesh = new THREE.Mesh(smokeGeo, smokeMat.clone());
      mesh.visible = false;
      this.scene.add(mesh);
      this.smokeParticles.push({
        mesh,
        life: 0,
        maxLife: 0.6,
        velocity: new THREE.Vector3()
      });
    }

    // 2. High-Speed Barrier Collision Spark Particles
    const sparkGeo = new THREE.BoxGeometry(0.08, 0.08, 0.25);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    for (let i = 0; i < 35; i++) {
      const mesh = new THREE.Mesh(sparkGeo, sparkMat);
      mesh.visible = false;
      this.scene.add(mesh);
      this.sparkParticles.push({
        mesh,
        life: 0,
        maxLife: 0.35,
        velocity: new THREE.Vector3()
      });
    }
  }

  spawnSmoke(pos, intensity = 1.0) {
    const particle = this.smokeParticles.find(p => p.life <= 0);
    if (!particle) return;

    particle.mesh.position.copy(pos);
    particle.mesh.position.y += 0.2;
    particle.mesh.visible = true;
    particle.life = particle.maxLife;
    particle.mesh.material.opacity = 0.45 * intensity;
    particle.mesh.scale.set(1, 1, 1);
    particle.velocity.set(
      (Math.random() - 0.5) * 1.5,
      Math.random() * 1.8 + 0.8,
      (Math.random() - 0.5) * 1.5
    );
  }

  spawnSparks(pos, normal) {
    const sparkCount = 6;
    for (let i = 0; i < sparkCount; i++) {
      const p = this.sparkParticles.find(sp => sp.life <= 0);
      if (!p) break;
      p.mesh.position.copy(pos);
      p.mesh.position.y += 0.4 + Math.random() * 0.4;
      p.mesh.visible = true;
      p.life = p.maxLife * (0.6 + Math.random() * 0.4);
      p.velocity.set(
        normal.x * (Math.random() * 9 + 4) + (Math.random() - 0.5) * 5,
        Math.random() * 5 + 2.5,
        normal.z * (Math.random() * 9 + 4) + (Math.random() - 0.5) * 5
      );
    }
  }

  updateParticles(dt) {
    this.smokeParticles.forEach(p => {
      if (p.life > 0) {
        p.life -= dt;
        p.mesh.position.addScaledVector(p.velocity, dt);
        const s = 1.0 + (1.0 - p.life / p.maxLife) * 3.5;
        p.mesh.scale.set(s, s, s);
        p.mesh.material.opacity = (p.life / p.maxLife) * 0.4;

        if (p.life <= 0) {
          p.mesh.visible = false;
        }
      }
    });

    this.sparkParticles.forEach(p => {
      if (p.life > 0) {
        p.life -= dt;
        p.velocity.y -= 22.0 * dt; // Gravity
        p.mesh.position.addScaledVector(p.velocity, dt);
        if (p.life <= 0) {
          p.mesh.visible = false;
        }
      }
    });
  }

  /**
   * Comprehensive Keyboard & Input Event Listeners
   * Supports US layout, Thai layout, and virtual keys
   */
  setupEventListeners() {
    // Keyboard inputs
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.key) {
        this.keys[e.key] = true;
        this.keys[e.key.toLowerCase()] = true;
      }

      // Audio init on user gesture
      if (!this.audio.initialized) {
        this.audio.init();
      }

      // Prevent scrolling or button click triggers on gameplay keys
      const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', ' '];
      if (gameKeys.includes(e.code) || gameKeys.includes(e.key)) {
        e.preventDefault();
      }

      // Camera switch (C key, c, or Thai 'แ')
      if (e.code === 'KeyC' || e.key === 'c' || e.key === 'C' || e.key === 'แ') {
        this.cycleCamera();
      }

      // Audio mute toggle (M key, m, or Thai 'ท')
      if (e.code === 'KeyM' || e.key === 'm' || e.key === 'M' || e.key === 'ท') {
        const isMuted = this.audio.toggleMute();
        const muteBtn = document.getElementById('btn-mute');
        if (muteBtn) muteBtn.textContent = isMuted ? '🔇' : '🔊';
      }

      // Quick Track Reset (R key, r, or Thai 'พ')
      if ((e.code === 'KeyR' || e.key === 'r' || e.key === 'R' || e.key === 'พ') && this.state === 'RACING') {
        this.resetPlayerToTrack();
      }

      // Launch bypass during countdown (Space or W / Up launches immediately)
      if (this.state === 'COUNTDOWN' && (e.code === 'Space' || e.key === ' ' || e.code === 'KeyW' || e.key === 'w' || e.key === 'W' || e.code === 'ArrowUp')) {
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

    // Clear stuck keys if window loses focus
    window.addEventListener('blur', () => {
      this.keys = {};
    });

    // Window resize
    window.addEventListener('resize', () => {
      if (!this.renderer || !this.camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });

    // Canvas click to re-focus window
    if (this.container) {
      this.container.addEventListener('click', () => {
        window.focus();
      });
      this.container.addEventListener('touchstart', () => {
        window.focus();
      }, { passive: true });
    }

    // Audio Mute Button
    const muteBtn = document.getElementById('btn-mute');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = this.audio.toggleMute();
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    // Camera Switch Button
    const camBtn = document.getElementById('btn-camera');
    if (camBtn) {
      camBtn.addEventListener('click', () => this.cycleCamera());
    }

    // Reset Track Button
    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetPlayerToTrack());
    }

    // Countdown overlay click bypass
    const countdownOverlay = document.getElementById('countdown-overlay');
    if (countdownOverlay) {
      countdownOverlay.addEventListener('click', () => {
        if (this.state === 'COUNTDOWN') {
          this.launchRace();
        }
      });
    }
  }

  /**
   * Binds virtual touch pedals and steering buttons for mobile/mouse
   */
  setupVirtualControls() {
    const bindBtn = (id, controlProp) => {
      const el = document.getElementById(id);
      if (!el) return;

      const setOn = (e) => {
        e.preventDefault();
        this.virtualControls[controlProp] = true;
        el.classList.add('active');
        if (!this.audio.initialized) this.audio.init();
        if (this.state === 'COUNTDOWN') this.launchRace();
      };

      const setOff = (e) => {
        e.preventDefault();
        this.virtualControls[controlProp] = false;
        el.classList.remove('active');
      };

      el.addEventListener('mousedown', setOn);
      el.addEventListener('mouseup', setOff);
      el.addEventListener('mouseleave', setOff);
      el.addEventListener('touchstart', setOn, { passive: false });
      el.addEventListener('touchend', setOff, { passive: false });
      el.addEventListener('touchcancel', setOff, { passive: false });
    };

    bindBtn('btn-touch-gas', 'throttle');
    bindBtn('btn-touch-brake', 'brake');
    bindBtn('btn-touch-left', 'steerLeft');
    bindBtn('btn-touch-right', 'steerRight');
    bindBtn('btn-touch-drift', 'handbrake');
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
      camBadge.textContent = this.cameraMode.toUpperCase() + ' CAM';
    }
  }

  resetPlayerToTrack() {
    if (!this.playerPhysics || !this.track) return;
    const sample = this.track.getClosestSplineSample(this.playerPhysics.position);
    if (!sample) return;

    // Reset onto tarmac centerline facing forward
    const tan = sample.tan;
    const heading = Math.atan2(-tan.x, -tan.z);
    this.playerPhysics.setPosition(sample.pos.clone().add(new THREE.Vector3(0, 0.1, 0)), heading);
    this.playerPhysics.speed = 0;
  }

  /**
   * ==========================================================================
   * Pre-Race Setup Lobby UI & 3D Interactive Preview
   * ==========================================================================
   */
  setupLobbyUI() {
    const driverInput = document.getElementById('input-driver-name');
    const flagSelect = document.getElementById('select-nationality');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const customColorInput = document.getElementById('input-custom-color');
    const carCards = document.querySelectorAll('.car-model-card');
    const lapsSelect = document.getElementById('select-laps');
    const startBtn = document.getElementById('btn-start-race');

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

    // Car Model Cards
    carCards.forEach(card => {
      card.addEventListener('click', () => {
        carCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const modelId = card.dataset.model;
        this.playerConfig.modelId = modelId;
        this.updatePreviewCarModel(modelId);
      });
    });

    // Laps Selector
    if (lapsSelect) {
      lapsSelect.addEventListener('change', (e) => {
        this.playerConfig.totalLaps = parseInt(e.target.value, 10) || 3;
      });
    }

    // Start Grand Prix Button
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        if (document.activeElement && document.activeElement.blur) {
          document.activeElement.blur();
        }
        window.focus();
        this.startRaceCountdown();
      });
    }

    // Play Again Button in Podium Modal
    const playAgainBtn = document.getElementById('btn-play-again');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        document.getElementById('podium-modal').classList.remove('active');
        this.startRaceCountdown();
      });
    }

    const garageBtn = document.getElementById('btn-back-garage');
    if (garageBtn) {
      garageBtn.addEventListener('click', () => {
        document.getElementById('podium-modal').classList.remove('active');
        this.enterLobby();
      });
    }
  }

  enterLobby() {
    this.state = 'LOBBY';

    // Show Lobby UI, hide HUD and Countdown
    document.getElementById('lobby-overlay').style.display = 'flex';
    document.getElementById('racing-hud').style.display = 'none';
    document.getElementById('countdown-overlay').style.display = 'none';

    // Build 3D Preview Car in the center of the showroom
    this.createPreviewCar();
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
    this.previewCarGroup.position.set(0.5, 0.1, -10.5); // Located in showroom
    this.scene.add(this.previewCarGroup);

    // Position camera for a cinematic 3/4 showroom hero view
    this.camera.position.set(3.8, 1.8, -6.0);
    this.camera.lookAt(0.5, 0.6, -10.5);
  }

  updatePreviewCarColor(hex) {
    if (this.previewCar) {
      this.previewCar.setPaintColor(hex);
    }
  }

  updatePreviewCarModel(modelId) {
    this.createPreviewCar();
  }

  /**
   * ==========================================================================
   * Race Setup, Countdown & Starting Grid Initialization
   * ==========================================================================
   */
  startRaceCountdown() {
    this.audio.init();

    // 1. Hide Lobby and Result Modals
    document.getElementById('lobby-overlay').style.display = 'none';
    document.getElementById('podium-modal').classList.remove('active');

    // 2. Remove any preview car
    if (this.previewCarGroup) {
      this.scene.remove(this.previewCarGroup);
      this.previewCarGroup = null;
    }

    // 3. Clear existing race cars from scene
    if (this.playerCar) this.scene.remove(this.playerCar.mesh);
    this.aiRacers.forEach(ai => this.scene.remove(ai.car.mesh));
    this.aiRacers = [];
    this.allCarsPhysics = [];

    // 4. Create Player's Official Race Car
    this.playerCar = new RacingCar(this.playerConfig.modelId, {
      driverName: this.playerConfig.driverName,
      nationality: this.playerConfig.nationality,
      paintColor: this.playerConfig.paintColor,
      racingNumber: this.playerConfig.racingNumber,
      isAI: false
    });
    this.scene.add(this.playerCar.mesh);

    this.playerPhysics = new VehiclePhysics(this.playerCar, true);

    // 5. Generate 5 Randomized AI Competitors
    const generatedAI = AIRacingController.generateRandomGrid(this.playerConfig.modelId);
    generatedAI.forEach(aiItem => {
      this.scene.add(aiItem.car.mesh);
      const controller = new AIRacingController(aiItem.car, aiItem.physics, this.track);
      this.aiRacers.push({
        car: aiItem.car,
        physics: aiItem.physics,
        controller,
        driver: aiItem.driver
      });
    });

    // 6. Assign Grid Slots (6 total cars)
    // Slot 1 (Pole): AI 1, Slot 2: AI 2, Slot 3: Player, Slot 4-6: AI 3-5
    const gridOrder = [
      this.aiRacers[0].physics,
      this.aiRacers[1].physics,
      this.playerPhysics, // Player starts P3 on grid
      this.aiRacers[2].physics,
      this.aiRacers[3].physics,
      this.aiRacers[4].physics
    ];

    gridOrder.forEach((phys, idx) => {
      const slot = this.track.gridSlots[idx];
      phys.setPosition(slot.pos.clone(), 0);
      phys.lapCount = 0;
      this.allCarsPhysics.push(phys);
    });

    // 7. Position camera directly behind the player's car
    const playerPos = this.playerPhysics.position;
    this.camera.position.set(playerPos.x, playerPos.y + 1.9, playerPos.z + 5.6);
    this.camera.lookAt(playerPos.x, playerPos.y + 0.9, playerPos.z - 12.0);
    this.camera.fov = 58;
    this.camera.updateProjectionMatrix();
    this.cameraLookTargetInitialized = false;

    // 8. Show HUD & initialize timers
    document.getElementById('racing-hud').style.display = 'block';
    this.raceStartTime = performance.now();
    this.currentLapStartTime = this.raceStartTime;
    this.lapTimes = [];
    this.bestLapTime = 0;

    // 9. Start F1 Countdown Sequence
    this.state = 'COUNTDOWN';
    this.runF1CountdownSequence();
  }

  runF1CountdownSequence() {
    const countdownOverlay = document.getElementById('countdown-overlay');
    if (countdownOverlay) countdownOverlay.style.display = 'block';

    const lightPods = countdownOverlay ? countdownOverlay.querySelectorAll('.countdown-light') : [];
    lightPods.forEach(p => p.classList.remove('red', 'green'));

    const bannerText = document.getElementById('countdown-text');
    if (bannerText) {
      bannerText.textContent = 'FORMATION GRID READY';
      bannerText.style.color = '#f8fafc';
    }

    // Failsafe timer: after 2.8 seconds, ALWAYS unlock and start racing!
    const failsafe = setTimeout(() => {
      this.launchRace();
    }, 2800);

    // Fast, crisp 3-light countdown (0.5s per light -> 1.5s total!)
    let count = 0;
    const interval = setInterval(() => {
      try {
        if (count < 3) {
          if (lightPods[count]) lightPods[count].classList.add('red');
          this.track.setGantryLights(count + 1, false);
          this.audio.playCountdownBeep(false);
          count++;
          if (bannerText) bannerText.textContent = `RED LIGHT ${count}...`;
        } else {
          clearInterval(interval);
          clearTimeout(failsafe);
          setTimeout(() => {
            this.launchRace();
          }, 450);
        }
      } catch (err) {
        console.warn('Countdown sequence error:', err);
        clearInterval(interval);
        clearTimeout(failsafe);
        this.launchRace();
      }
    }, 450);
  }

  launchRace() {
    if (this.state === 'RACING') return;

    const countdownOverlay = document.getElementById('countdown-overlay');
    const bannerText = document.getElementById('countdown-text');
    const lightPods = countdownOverlay ? countdownOverlay.querySelectorAll('.countdown-light') : [];

    lightPods.forEach(p => {
      p.classList.remove('red');
      p.classList.add('green');
    });

    this.track.setGantryLights(0, true);
    this.audio.playCountdownBeep(true);

    if (bannerText) {
      bannerText.textContent = 'LIGHTS OUT & AWAY WE GO!';
      bannerText.style.color = '#22c55e';
    }

    this.state = 'RACING';
    this.raceStartTime = performance.now();
    this.currentLapStartTime = this.raceStartTime;

    // Fade out countdown overlay after 800ms
    setTimeout(() => {
      if (countdownOverlay) countdownOverlay.style.display = 'none';
    }, 800);
  }

  /**
   * ==========================================================================
   * Main Simulation Loop: Input, Physics, AI, Camera, and HUD
   * ==========================================================================
   */
  animate() {
    requestAnimationFrame(this.animate);

    const dt = this.clock.getDelta();

    if (this.state === 'LOBBY') {
      // Rotate 3D car in Showroom
      if (this.previewCarGroup) {
        this.previewCarGroup.rotation.y += dt * 0.45;
      }
      this.renderer.render(this.scene, this.camera);
      return;
    }

    if (this.state === 'RACING' || this.state === 'COUNTDOWN') {
      // 1. Process Player Input
      this.processPlayerControls();

      // In countdown, allow revving the engine on grid!
      if (this.state === 'COUNTDOWN') {
        this.playerPhysics.speed = 0;
        this.playerPhysics.speedKmh = 0;
        this.controls.brake = 0;
        if (this.controls.throttle > 0) {
          this.playerPhysics.rpm = THREE.MathUtils.lerp(this.playerPhysics.rpm, 7800, dt * 8);
          this.audio.updateEngine(this.playerPhysics.rpm, 0, true, true);
        }
      }

      // 2. Update Player Physics
      this.playerPhysics.update(dt, this.controls, this.track, this.audio);

      // Update Player Car Visual Animations (wheel spin, front steering, brake lights)
      if (this.playerCar) {
        this.playerCar.updateVisuals(
          this.playerPhysics.speedKmh,
          this.playerPhysics.steerAngle,
          this.controls.brake > 0.1 || this.controls.handbrake,
          dt
        );
      }

      // Check tire drift smoke emission
      if (this.playerPhysics.driftFactor > 0.25 || (this.playerPhysics.speed > 10 && this.controls.handbrake)) {
        const leftRear = this.playerCar.rearWheelLeft ? this.playerCar.rearWheelLeft.getWorldPosition(new THREE.Vector3()) : this.playerPhysics.position;
        const rightRear = this.playerCar.rearWheelRight ? this.playerCar.rearWheelRight.getWorldPosition(new THREE.Vector3()) : this.playerPhysics.position;
        this.spawnSmoke(leftRear, this.playerPhysics.driftFactor);
        this.spawnSmoke(rightRear, this.playerPhysics.driftFactor);
      }

      // Barrier collision spark effects
      if (this.playerPhysics.hitBarrierThisFrame) {
        this.spawnSparks(this.playerPhysics.position, this.playerPhysics.lastImpactNormal);
      }

      // 3. Update AI Opponents
      this.aiRacers.forEach(ai => {
        if (this.state === 'RACING') {
          ai.controller.update(dt, this.allCarsPhysics);
          ai.physics.update(dt, ai.controller.controls, this.track, null);
          if (ai.car) {
            ai.car.updateVisuals(
              ai.physics.speedKmh,
              ai.physics.steerAngle,
              ai.controller.controls.brake > 0.1,
              dt
            );
          }
        }
      });

      // 4. Car-to-Car Collisions across all 6 cars
      for (let i = 0; i < this.allCarsPhysics.length; i++) {
        for (let j = i + 1; j < this.allCarsPhysics.length; j++) {
          VehiclePhysics.checkCarCollision(this.allCarsPhysics[i], this.allCarsPhysics[j], this.audio);
        }
      }

      // 5. Track Lap Progression & Sector Timing
      if (this.state === 'RACING') {
        this.checkLapProgression();
      }

      // 6. Update Camera to Follow Player
      this.updateCamera(dt);

      // 7. Update Particles
      this.updateParticles(dt);

      // 8. Update HUD & Telemetry
      const currentLapTimeSec = (performance.now() - this.currentLapStartTime) / 1000;
      this.hud.update(this.playerPhysics, this.allCarsPhysics, {
        totalLaps: this.playerConfig.totalLaps,
        currentLapTime: Math.max(0, currentLapTimeSec),
        bestLapTime: this.bestLapTime
      });

      // 9. Check Race Finish Condition
      if (this.playerPhysics.lapCount >= this.playerConfig.totalLaps && this.state === 'RACING') {
        this.finishRace();
      }
    }

    // Drift 3D clouds across Grand Prix sky
    if (this.track && this.track.updateClouds) {
      this.track.updateClouds(dt);
    }

    // Keep Sun Light Centered on Player for Shadows
    if (this.playerPhysics && this.sunLight) {
      this.sunLight.position.x = this.playerPhysics.position.x + 120;
      this.sunLight.position.z = this.playerPhysics.position.z + 80;
      this.sunLight.target.position.copy(this.playerPhysics.position);
      this.sunLight.target.updateMatrixWorld();
    }

    this.renderer.render(this.scene, this.camera);
  }

  processPlayerControls() {
    const isUp = this.isKeyPressed(['KeyW', 'ArrowUp'], ['w', 'up', 'ไ']) || this.virtualControls.throttle;
    const isDown = this.isKeyPressed(['KeyS', 'ArrowDown'], ['s', 'down', 'ห']) || this.virtualControls.brake;
    const isLeft = this.isKeyPressed(['KeyA', 'ArrowLeft'], ['a', 'left', 'ฟ']) || this.virtualControls.steerLeft;
    const isRight = this.isKeyPressed(['KeyD', 'ArrowRight'], ['d', 'right', 'ก']) || this.virtualControls.steerRight;
    const isHandbrake = this.isKeyPressed(['Space'], [' ', 'spacebar']) || this.virtualControls.handbrake;

    this.controls.throttle = isUp ? 1.0 : 0.0;
    this.controls.brake = isDown ? 1.0 : 0.0;

    let steer = 0;
    if (isLeft) steer += 1.0;
    if (isRight) steer -= 1.0;
    this.controls.steer = steer;

    this.controls.handbrake = isHandbrake;
  }

  checkLapProgression() {
    const p = this.playerPhysics;
    const sample = this.track.getClosestSplineSample(p.position);
    if (!sample) return;

    const u = sample.u;

    // Checkpoint detection to prevent shortcutting
    if (u > 0.25 && u < 0.35) p.lastCheckpoint = Math.max(p.lastCheckpoint, 1);
    if (u > 0.50 && u < 0.60) p.lastCheckpoint = Math.max(p.lastCheckpoint, 2);
    if (u > 0.78 && u < 0.88) p.lastCheckpoint = Math.max(p.lastCheckpoint, 3);

    // Finish line crossing: Crossed from u > 0.90 to u < 0.10 having passed CP 3
    if (p.lastCheckpoint === 3 && u < 0.08) {
      p.lapCount++;
      p.lastCheckpoint = 0;

      const now = performance.now();
      const lapDuration = (now - this.currentLapStartTime) / 1000;
      this.lapTimes.push(lapDuration);
      if (this.bestLapTime === 0 || lapDuration < this.bestLapTime) {
        this.bestLapTime = lapDuration;
      }
      this.currentLapStartTime = now;
      console.log(`[Grand Prix] Player completed Lap ${p.lapCount}: ${lapDuration.toFixed(2)}s`);
    }

    // Also update AI laps automatically
    this.aiRacers.forEach(ai => {
      const aiSample = this.track.getClosestSplineSample(ai.physics.position);
      if (aiSample) {
        const aiu = aiSample.u;
        if (aiu > 0.25 && aiu < 0.35) ai.physics.lastCheckpoint = Math.max(ai.physics.lastCheckpoint, 1);
        if (aiu > 0.78 && aiu < 0.88) ai.physics.lastCheckpoint = Math.max(ai.physics.lastCheckpoint, 3);
        if (ai.physics.lastCheckpoint === 3 && aiu < 0.08) {
          ai.physics.lapCount++;
          ai.physics.lastCheckpoint = 0;
        }
      }
    });
  }

  updateCamera(dt) {
    if (!this.playerPhysics) return;

    const carPos = this.playerPhysics.position;
    const yaw = this.playerPhysics.yaw;
    const speedRatio = Math.min(1.0, Math.abs(this.playerPhysics.speedKmh) / 280);

    if (this.cameraMode === 'chase') {
      // Dynamic Chase Cam: Closer, more grounded and cinematic
      const dist = 5.6 + speedRatio * 1.8;
      const height = 1.9 + speedRatio * 0.4;

      const backX = Math.sin(yaw) * dist;
      const backZ = Math.cos(yaw) * dist;
      const targetCamPos = new THREE.Vector3(carPos.x + backX, carPos.y + height, carPos.z + backZ);

      this.camera.position.lerp(targetCamPos, dt * 9.5);

      const lookAheadDist = 12.0 + speedRatio * 8.0;
      const lookX = -Math.sin(yaw) * lookAheadDist;
      const lookZ = -Math.cos(yaw) * lookAheadDist;
      const targetLook = new THREE.Vector3(carPos.x + lookX, carPos.y + 0.9, carPos.z + lookZ);

      if (!this.cameraLookTargetInitialized) {
        this.cameraLookTarget.copy(targetLook);
        this.cameraLookTargetInitialized = true;
      } else {
        this.cameraLookTarget.lerp(targetLook, dt * 10.5);
      }
      this.camera.lookAt(this.cameraLookTarget);

      // Speed FOV distortion (tunnel vision effect)
      this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, 58 + speedRatio * 14, dt * 6);
      this.camera.updateProjectionMatrix();

    } else if (this.cameraMode === 'hood') {
      // Cockpit / Hood camera
      const forwardX = -Math.sin(yaw) * 0.4;
      const forwardZ = -Math.cos(yaw) * 0.4;
      this.camera.position.set(carPos.x + forwardX, carPos.y + 0.95, carPos.z + forwardZ);

      const lookX = -Math.sin(yaw) * 20.0;
      const lookZ = -Math.cos(yaw) * 20.0;
      this.camera.lookAt(carPos.x + lookX, carPos.y + 0.8, carPos.z + lookZ);
      this.camera.fov = 72;
      this.camera.updateProjectionMatrix();

    } else {
      // Trackside TV Orbit Cam
      const sample = this.track.getClosestSplineSample(carPos);
      const camHeight = 7.0;
      const camDist = 18.0;
      const sidePos = sample.pos.clone().addScaledVector(sample.norm, 16).add(new THREE.Vector3(0, camHeight, 0));
      this.camera.position.lerp(sidePos, dt * 2.5);
      this.camera.lookAt(carPos.x, carPos.y + 1.0, carPos.z);
    }
  }

  /**
   * ==========================================================================
   * Race Finish & Podium Celebration Modal
   * ==========================================================================
   */
  finishRace() {
    this.state = 'FINISHED';
    this.audio.playCheckeredFlag();

    const totalRaceTime = (performance.now() - this.raceStartTime) / 1000;

    // Calculate final standings
    const standings = [...this.allCarsPhysics].map(phys => {
      const sample = this.track.getClosestSplineSample(phys.position);
      const u = sample ? sample.u : 0;
      return {
        physics: phys,
        score: phys.lapCount + u
      };
    }).sort((a, b) => b.score - a.score);

    const playerRank = standings.findIndex(s => s.physics.isPlayer) + 1;

    // Populate Podium Modal
    const modal = document.getElementById('podium-modal');
    const podiumTitle = document.getElementById('podium-title');
    const podiumBadge = document.getElementById('podium-rank-badge');
    const resultsTbody = document.getElementById('podium-results-tbody');

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

    if (podiumBadge) {
      podiumBadge.textContent = `P${playerRank}`;
    }

    if (resultsTbody) {
      let html = '';
      standings.forEach((item, idx) => {
        const car = item.physics.car;
        const isPlayer = item.physics.isPlayer;
        const pos = idx + 1;
        const totalTimeStr = isPlayer ? this.hud.formatTime(totalRaceTime) : `+${(idx * 1.8 + Math.random() * 0.4).toFixed(2)}s`;
        const bestLapStr = isPlayer ? this.hud.formatTime(this.bestLapTime) : `01:${(12 + idx * 0.8).toFixed(2)}`;

        html += `
          <tr class="${isPlayer ? 'player-row' : ''}">
            <td class="pos-cell">${pos === 1 ? '🥇' : (pos === 2 ? '🥈' : (pos === 3 ? '🥉' : pos))}</td>
            <td>${car.nationality}</td>
            <td class="driver-cell"><strong>${car.driverName}</strong> ${isPlayer ? '(YOU)' : ''}</td>
            <td>${car.modelConfig.name}</td>
            <td>${totalTimeStr}</td>
            <td>${bestLapStr}</td>
          </tr>
        `;
      });
      resultsTbody.innerHTML = html;
    }

    modal.classList.add('active');
  }
}

// Instantiate game safely whether DOM is already ready or still loading
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    window.game = new GrandPrixGame();
  });
} else {
  window.game = new GrandPrixGame();
}
