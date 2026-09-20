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

/**
 * Procedural Volumetric Smoke Texture Generator
 * Uses multi-lobed organic radial gradients on an HTML5 canvas to produce
 * a soft, billowy vapor puff texture with zero external asset dependencies.
 */
function createVolumetricSmokeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);

  const lobes = [
    { x: 64, y: 64, r: 52, a: 0.80 },
    { x: 48, y: 52, r: 38, a: 0.60 },
    { x: 80, y: 50, r: 36, a: 0.55 },
    { x: 50, y: 76, r: 40, a: 0.60 },
    { x: 78, y: 74, r: 38, a: 0.55 },
    { x: 64, y: 44, r: 32, a: 0.50 }
  ];

  for (let i = 0; i < lobes.length; i++) {
    const l = lobes[i];
    const grad = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
    grad.addColorStop(0.0, `rgba(255, 255, 255, ${l.a})`);
    grad.addColorStop(0.35, `rgba(240, 245, 250, ${l.a * 0.75})`);
    grad.addColorStop(0.70, `rgba(210, 220, 230, ${l.a * 0.30})`);
    grad.addColorStop(1.0, 'rgba(180, 200, 220, 0.0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(l.x, l.y, l.r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

/**
 * Procedural Luminous Flame Burst Texture Generator
 * Creates an ultra-hot incandescent core transitioning to amber/crimson combustion fringe.
 */
function createLuminousFlameTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');     // Super-hot white core
  grad.addColorStop(0.20, 'rgba(125, 211, 252, 0.95)');   // Cyan boundary
  grad.addColorStop(0.45, 'rgba(251, 146, 60, 0.85)');    // Luminous amber flame
  grad.addColorStop(0.75, 'rgba(239, 68, 68, 0.40)');     // Crimson fringe
  grad.addColorStop(1.0, 'rgba(180, 20, 0, 0.0)');        // Fade to transparent

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(64, 64, 60, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

class GrandPrixGame {
  constructor() {
    this.state = 'LOBBY'; // 'LOBBY' | 'COUNTDOWN' | 'RACING' | 'FINISHED'
    
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

    // Particles (Tire Smoke & Wall Collision Sparks & Exhaust Flame/Smoke)
    this.smokeParticles = [];
    this.sparkParticles = [];
    this.flameParticles = [];
    this.exhaustSmokeParticles = [];

    // 3D Preview in Lobby
    this.previewCarGroup = null;
    this.bottomHintTimeout = null;

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
    this.hemiLight = hemiLight;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambientLight);
    this.ambientLight = ambientLight;

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
    console.log(`[Circuit] Switched to track: ${trackId}`);
  }


  setupHUD() {
    this.hud = new RacingHUD(this.track);
  }

  setupParticleSystem() {
    // Generate reusable procedural textures
    this.smokeTexture = createVolumetricSmokeTexture();
    this.flameTexture = createLuminousFlameTexture();

    // 1. Tire Drift Smoke (Volumetric Camera-Facing Sprites)
    const tireSmokeBaseMat = new THREE.SpriteMaterial({
      map: this.smokeTexture,
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    for (let i = 0; i < 40; i++) {
      const mesh = new THREE.Sprite(tireSmokeBaseMat.clone());
      mesh.visible = false;
      this.scene.add(mesh);
      this.smokeParticles.push({
        mesh,
        life: 0,
        maxLife: 0.65,
        baseOpacity: 0.35,
        startScale: 0.4,
        endScale: 2.8,
        rotSpeed: 0,
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

    // 3. Exhaust Flame Particles (Luminous Volumetric Additive Sprites)
    const flameBaseMat = new THREE.SpriteMaterial({
      map: this.flameTexture,
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    for (let i = 0; i < 36; i++) {
      const mesh = new THREE.Sprite(flameBaseMat.clone());
      mesh.visible = false;
      this.scene.add(mesh);
      this.flameParticles.push({
        mesh,
        life: 0,
        maxLife: 0.16,
        baseOpacity: 0.95,
        startScale: 0.3,
        endScale: 0.1,
        rotSpeed: 0,
        velocity: new THREE.Vector3()
      });
    }

    // 4. Exhaust Smoke & Vapor Particles (Soft billowy expansion with fluid drag & buoyancy)
    const exhSmokeBaseMat = new THREE.SpriteMaterial({
      map: this.smokeTexture,
      color: 0x475569, // Carbon soot tone initially
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    for (let i = 0; i < 48; i++) {
      const mesh = new THREE.Sprite(exhSmokeBaseMat.clone());
      mesh.visible = false;
      this.scene.add(mesh);
      this.exhaustSmokeParticles.push({
        mesh,
        life: 0,
        maxLife: 0.58,
        baseOpacity: 0.45,
        startScale: 0.14,
        endScale: 1.85,
        rotSpeed: 0,
        startColor: new THREE.Color(0x334155),
        endColor: new THREE.Color(0xcbd5e1),
        velocity: new THREE.Vector3()
      });
    }
  }

  spawnSmoke(pos, intensity = 1.0) {
    const p = this.smokeParticles.find(item => item.life <= 0);
    if (!p) return;

    p.mesh.position.copy(pos);
    p.mesh.position.y += 0.25;
    p.mesh.visible = true;
    p.maxLife = 0.65 + Math.random() * 0.2;
    p.life = p.maxLife;
    p.baseOpacity = (0.35 + intensity * 0.2) * (0.8 + Math.random() * 0.4);
    p.mesh.material.opacity = p.baseOpacity;
    p.startScale = 0.35 + Math.random() * 0.15;
    p.endScale = (2.2 + intensity * 1.0) * (0.85 + Math.random() * 0.3);
    p.mesh.scale.set(p.startScale, p.startScale, 1);
    p.mesh.material.rotation = Math.random() * Math.PI * 2;
    p.rotSpeed = (Math.random() - 0.5) * 2.5;
    p.velocity.set(
      (Math.random() - 0.5) * 1.5,
      Math.random() * 1.5 + 0.6,
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

  spawnExhaustFlame(pos, yaw, intensity = 1.0, isPop = false) {
    const p = this.flameParticles.find(item => item.life <= 0);
    if (!p) return;

    p.mesh.position.copy(pos);
    p.mesh.position.y += (Math.random() - 0.5) * 0.02;
    p.mesh.visible = true;
    p.maxLife = isPop ? 0.18 : 0.12;
    p.life = p.maxLife;

    const baseSize = isPop ? (0.60 + Math.random() * 0.25) : (0.24 + intensity * 0.22);
    p.startScale = baseSize;
    p.endScale = baseSize * 0.25;
    p.mesh.scale.set(p.startScale, p.startScale, 1);
    p.mesh.material.rotation = Math.random() * Math.PI * 2;
    p.rotSpeed = (Math.random() - 0.5) * 6.0;

    if (isPop || intensity > 0.85) {
      p.mesh.material.color.setHex(Math.random() < 0.35 ? 0x67e8f9 : 0xffbe26);
    } else {
      p.mesh.material.color.setHex(0xff6b00);
    }
    p.baseOpacity = Math.min(1.0, 0.8 + intensity * 0.2);
    p.mesh.material.opacity = p.baseOpacity;

    const backX = Math.sin(yaw);
    const backZ = Math.cos(yaw);
    const ejectSpeed = isPop ? (12.0 + Math.random() * 5.0) : (6.0 + intensity * 5.0);
    p.velocity.set(
      backX * ejectSpeed + (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.2) * 0.4,
      backZ * ejectSpeed + (Math.random() - 0.5) * 0.8
    );
  }

  spawnExhaustSmoke(pos, yaw, intensity = 1.0) {
    const p = this.exhaustSmokeParticles.find(item => item.life <= 0);
    if (!p) return;

    // Position at exhaust tip with slight randomized jitter
    p.mesh.position.copy(pos);
    p.mesh.position.y += 0.03 + (Math.random() - 0.5) * 0.03;
    p.mesh.visible = true;
    p.maxLife = 0.58 + Math.random() * 0.22;
    p.life = p.maxLife;

    p.baseOpacity = (0.38 + intensity * 0.32) * (0.85 + Math.random() * 0.3);
    p.mesh.material.opacity = p.baseOpacity;

    // Small initial diameter (0.12 - 0.18m, matching exhaust pipe) expanding up to 1.85m
    p.startScale = 0.12 + Math.random() * 0.08;
    p.endScale = (1.5 + intensity * 0.8) * (0.9 + Math.random() * 0.3);
    p.mesh.scale.set(p.startScale, p.startScale, 1);

    p.mesh.material.rotation = Math.random() * Math.PI * 2;
    p.rotSpeed = (Math.random() - 0.5) * 3.5;

    // Color: start with dark carbon soot
    p.startColor.setHex(0x334155);
    p.endColor.setHex(0xcbd5e1);
    p.mesh.material.color.copy(p.startColor);

    // Eject velocity: shoots rearwards from tailpipe, then rapidly slows down
    const backX = Math.sin(yaw);
    const backZ = Math.cos(yaw);
    const ejectSpeed = 4.0 + intensity * 4.5 + (Math.random() - 0.5) * 1.5;
    p.velocity.set(
      backX * ejectSpeed + (Math.random() - 0.5) * 1.2,
      Math.random() * 0.6 + 0.3,
      backZ * ejectSpeed + (Math.random() - 0.5) * 1.2
    );
  }

  updateParticles(dt) {
    // 1. Tire Drift Smoke (Soft Volumetric Billowing)
    this.smokeParticles.forEach(p => {
      if (p.life > 0) {
        p.life -= dt;
        p.velocity.y += 0.6 * dt; // Gentle thermal rise
        p.velocity.x *= Math.max(0, 1 - 0.9 * dt);
        p.velocity.z *= Math.max(0, 1 - 0.9 * dt);
        p.mesh.position.addScaledVector(p.velocity, dt);
        p.mesh.material.rotation += p.rotSpeed * dt;

        const progress = Math.min(1.0, Math.max(0, 1.0 - (p.life / p.maxLife)));
        const scale = p.startScale + Math.pow(progress, 0.6) * (p.endScale - p.startScale);
        p.mesh.scale.set(scale, scale, 1);
        p.mesh.material.opacity = Math.pow(1.0 - progress, 1.25) * p.baseOpacity;

        if (p.life <= 0) {
          p.mesh.visible = false;
        }
      }
    });

    // 2. Barrier Sparks
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

    // 3. Exhaust Flame (Luminous fiery burst)
    this.flameParticles.forEach(p => {
      if (p.life > 0) {
        p.life -= dt;
        p.mesh.position.addScaledVector(p.velocity, dt);
        p.mesh.material.rotation += p.rotSpeed * dt;

        const progress = Math.min(1.0, Math.max(0, 1.0 - (p.life / p.maxLife)));
        const scale = p.startScale - progress * (p.startScale - p.endScale);
        p.mesh.scale.set(Math.max(0.01, scale), Math.max(0.01, scale), 1);
        p.mesh.material.opacity = (1.0 - progress) * p.baseOpacity;

        if (p.life <= 0) p.mesh.visible = false;
      }
    });

    // 4. Exhaust Smoke (Photorealistic Volumetric Puff with Fluid Expansion)
    this.exhaustSmokeParticles.forEach(p => {
      if (p.life > 0) {
        p.life -= dt;

        // Fluid physics: thermal buoyancy & aerodynamic slipstream drag
        p.velocity.y += 0.75 * dt;
        p.velocity.x *= Math.max(0, 1 - 1.4 * dt);
        p.velocity.z *= Math.max(0, 1 - 1.4 * dt);
        p.mesh.position.addScaledVector(p.velocity, dt);
        p.mesh.material.rotation += p.rotSpeed * dt;

        const progress = Math.min(1.0, Math.max(0, 1.0 - (p.life / p.maxLife)));

        // Non-linear fluid expansion: fast initial dispersion from high pressure, billows wide
        const scale = p.startScale + Math.pow(progress, 0.52) * (p.endScale - p.startScale);
        p.mesh.scale.set(scale, scale, 1);

        // Smooth cubic opacity dissipation
        p.mesh.material.opacity = Math.pow(1.0 - progress, 1.35) * p.baseOpacity;

        // Color transition: dark carbon soot mixes with air into soft vapor haze
        if (p.startColor && p.endColor) {
          p.mesh.material.color.copy(p.startColor).lerp(p.endColor, progress);
        }

        if (p.life <= 0) p.mesh.visible = false;
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

      // Fullscreen toggle (F key, f, or Thai 'ด')
      if (e.code === 'KeyF' || e.key === 'f' || e.key === 'F' || e.key === 'ด') {
        if (!document.activeElement || (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'SELECT')) {
          this.toggleFullscreen();
        }
      }

      // Close Help modal on Escape if active
      if (e.code === 'Escape') {
        const helpModal = document.getElementById('controls-help-modal');
        if (helpModal && helpModal.classList.contains('active')) {
          helpModal.classList.remove('active');
          return;
        }
      }

      // Pause toggle (Escape key, P key, or Thai 'ย')
      if (e.code === 'Escape' || e.code === 'KeyP' || e.key === 'p' || e.key === 'P' || e.key === 'ย') {
        if (this.state === 'RACING' || this.state === 'COUNTDOWN') {
          this.pauseRace();
        } else if (this.state === 'PAUSED') {
          this.resumeRace();
        }
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

    // Universal audio unlocker on first user gesture for showroom lobby music
    const unlockLobbyAudio = () => {
      if (this.audio) {
        if (!this.audio.initialized) this.audio.init();
        if (this.audio.ctx && this.audio.ctx.state === 'suspended') {
          this.audio.ctx.resume().catch(() => {});
        }
        if (this.state === 'LOBBY' && !this.audio.isLobbyMusicPlaying) {
          this.audio.playLobbyMusic(1.0);
        }
      }
    };
    window.addEventListener('click', unlockLobbyAudio, { once: true });
    window.addEventListener('touchstart', unlockLobbyAudio, { once: true, passive: true });
    window.addEventListener('keydown', unlockLobbyAudio, { once: true });

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

    // HUD Pause Button
    const pauseBtn = document.getElementById('btn-pause');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        if (this.state === 'RACING' || this.state === 'COUNTDOWN') {
          this.pauseRace();
        } else if (this.state === 'PAUSED') {
          this.resumeRace();
        }
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
        pauseMuteBtn.textContent = isMuted ? '🔇 เปิดเสียง (M)' : '🔊 ปิดเสียง (M)';
        if (muteBtn) muteBtn.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    const pauseCamBtn = document.getElementById('btn-pause-cam');
    if (pauseCamBtn) {
      pauseCamBtn.addEventListener('click', () => this.cycleCamera());
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

    // Fullscreen Mode Buttons
    const navFsBtn = document.getElementById('btn-toggle-fullscreen');
    if (navFsBtn) {
      navFsBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    const hudFsBtn = document.getElementById('btn-hud-fullscreen');
    if (hudFsBtn) {
      hudFsBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    const pauseFsBtn = document.getElementById('btn-pause-fullscreen');
    if (pauseFsBtn) {
      pauseFsBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    // Pause menu Help Guide button
    const pauseHelpBtn = document.getElementById('btn-pause-help');
    if (pauseHelpBtn) {
      pauseHelpBtn.addEventListener('click', () => {
        const helpModal = document.getElementById('controls-help-modal');
        if (helpModal) helpModal.classList.add('active');
      });
    }

    // Listen to Fullscreen changes
    document.addEventListener('fullscreenchange', () => this.updateFullscreenUI());
    document.addEventListener('webkitfullscreenchange', () => this.updateFullscreenUI());
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

    // Optional Toggle for on-screen controls (Top-Right HUD Action)
    const toggleTouchBtn = document.getElementById('btn-toggle-touch');
    const virtualControlsEl = document.getElementById('hud-virtual-controls');
    if (toggleTouchBtn && virtualControlsEl) {
      toggleTouchBtn.addEventListener('click', () => {
        const isCurrentlyShown = virtualControlsEl.classList.contains('user-visible');
        if (isCurrentlyShown) {
          virtualControlsEl.classList.remove('user-visible');
          virtualControlsEl.classList.add('user-hidden');
          toggleTouchBtn.style.color = '';
          toggleTouchBtn.style.borderColor = '';
        } else {
          virtualControlsEl.classList.add('user-visible');
          virtualControlsEl.classList.remove('user-hidden');
          toggleTouchBtn.style.color = '#38bdf8';
          toggleTouchBtn.style.borderColor = '#38bdf8';
        }
      });
    }
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

  toggleFullscreen() {
    try {
      const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.body.classList.contains('fullscreen-simulated'));
      if (!isFS) {
        const docEl = document.documentElement;
        const requestFS = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
        if (requestFS) {
          requestFS.call(docEl).then(() => {
            this.updateFullscreenUI();
          }).catch(err => {
            console.warn('Standard Fullscreen request failed:', err);
            this.handleFullscreenFallback(true);
          });
        } else {
          this.handleFullscreenFallback(true);
        }
      } else {
        if (document.body.classList.contains('fullscreen-simulated')) {
          this.handleFullscreenFallback(false);
        } else {
          const exitFS = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
          if (exitFS) {
            exitFS.call(document).then(() => {
              this.updateFullscreenUI();
            }).catch(err => {
              console.warn('Exit fullscreen failed:', err);
              this.handleFullscreenFallback(false);
            });
          } else {
            this.handleFullscreenFallback(false);
          }
        }
      }
    } catch (err) {
      console.warn('Error toggling fullscreen:', err);
      this.handleFullscreenFallback();
    }
  }

  handleFullscreenFallback(enable) {
    const shouldEnable = enable !== undefined ? enable : !document.body.classList.contains('fullscreen-simulated');
    if (shouldEnable) {
      document.body.classList.add('fullscreen-simulated');
      window.scrollTo(0, 1);
    } else {
      document.body.classList.remove('fullscreen-simulated');
    }
    if (this.renderer && this.camera) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
    this.updateFullscreenUI();
  }

  updateFullscreenUI() {
    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.body.classList.contains('fullscreen-simulated'));

    // Lobby top nav button
    const btnNavFs = document.getElementById('btn-toggle-fullscreen');
    if (btnNavFs) {
      const iconEl = btnNavFs.querySelector('.fs-icon');
      const labelEl = btnNavFs.querySelector('.fs-label');
      if (iconEl) iconEl.textContent = isFs ? '🗗' : '⛶';
      if (labelEl) labelEl.textContent = isFs ? 'Exit Full screen' : 'Full screen';
      btnNavFs.setAttribute('title', isFs ? 'Exit Full screen (F)' : 'Full screen (F)');
    }

    // HUD in-game button
    const hudFsBtn = document.getElementById('btn-hud-fullscreen');
    if (hudFsBtn) {
      hudFsBtn.textContent = isFs ? '🗗' : '⛶';
      hudFsBtn.setAttribute('title', isFs ? 'Exit Full screen (F)' : 'Full screen (F)');
    }

    // Pause menu button
    const pauseFsBtn = document.getElementById('btn-pause-fullscreen');
    if (pauseFsBtn) {
      pauseFsBtn.textContent = isFs ? '🗗 Exit Full screen (F)' : '⛶ Full screen (F)';
    }
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

    // Track / Circuit Selection Cards
    const trackCards = document.querySelectorAll('.track-card');
    trackCards.forEach(card => {
      card.addEventListener('click', () => {
        trackCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const trackId = card.dataset.track;
        this.switchTrack(trackId);
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

    // Help Modal Toggle & Centered Dialog Handling
    const helpBtn = document.getElementById('btn-toggle-help');
    const helpModal = document.getElementById('controls-help-modal');
    const helpClose = document.getElementById('btn-close-help');
    const helpGotIt = document.getElementById('btn-got-it-help');

    if (helpBtn && helpModal) {
      helpBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        helpModal.classList.toggle('active');
      });
    }

    if (helpClose && helpModal) {
      helpClose.addEventListener('click', (e) => {
        e.stopPropagation();
        helpModal.classList.remove('active');
      });
    }

    if (helpGotIt && helpModal) {
      helpGotIt.addEventListener('click', (e) => {
        e.stopPropagation();
        helpModal.classList.remove('active');
      });
    }

    // Close when clicking backdrop or outside modal-card
    if (helpModal) {
      helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal || e.target.classList.contains('help-backdrop')) {
          helpModal.classList.remove('active');
        }
      });
    }

    // 360-degree Interactive Mouse & Touch Drag in Showroom
    let isDragging = false;
    let prevX = 0;
    let idleTimer = null;
    this.isAutoRotating = true;

    const startDrag = (clientX) => {
      if (this.state !== 'LOBBY') return;
      isDragging = true;
      prevX = clientX;
      this.isAutoRotating = false;
      if (idleTimer) clearTimeout(idleTimer);
    };

    const moveDrag = (clientX) => {
      if (!isDragging || this.state !== 'LOBBY' || !this.previewCarGroup) return;
      const deltaX = clientX - prevX;
      prevX = clientX;
      this.previewCarGroup.rotation.y += deltaX * 0.009;
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        this.isAutoRotating = true;
      }, 2500);
    };

    window.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, input, select, a, .showroom-dock, .lobby-header, .controls-help-modal')) return;
      startDrag(e.clientX);
    });
    window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    window.addEventListener('mouseup', endDrag);

    window.addEventListener('touchstart', (e) => {
      if (e.target.closest('button, input, select, a, .showroom-dock, .lobby-header, .controls-help-modal')) return;
      if (e.touches.length > 0) startDrag(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) moveDrag(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', endDrag);
  }

  enterLobby() {
    this.state = 'LOBBY';
    if (this.audio) {
      this.audio.stopEngine(0.1);
      this.audio.playLobbyMusic(1.0);
    }

    // Clean up race cars
    if (this.playerCar) {
      this.scene.remove(this.playerCar.mesh);
      this.playerCar = null;
    }
    this.aiRacers.forEach(ai => this.scene.remove(ai.car.mesh));
    this.aiRacers = [];
    this.allCarsPhysics = [];

    // Hide any modals
    const pauseModal = document.getElementById('pause-modal');
    if (pauseModal) pauseModal.style.display = 'none';
    const podiumModal = document.getElementById('podium-modal');
    if (podiumModal) podiumModal.classList.remove('active');

    // Show Lobby UI, hide HUD and Countdown
    document.getElementById('lobby-overlay').style.display = 'flex';
    document.getElementById('racing-hud').style.display = 'none';
    document.getElementById('countdown-overlay').style.display = 'none';

    // Reset HUD controls hint toast state
    const bottomHint = document.getElementById('hud-bottom-hint');
    if (bottomHint) {
      bottomHint.classList.remove('fade-out');
      if (this.bottomHintTimeout) clearTimeout(this.bottomHintTimeout);
      this.bottomHintTimeout = null;
    }

    // Build 3D Preview Car in the center of the showroom
    this.createPreviewCar();
  }

  /**
   * ==========================================================================
   * In-Game Pause & Resume System
   * ==========================================================================
   */
  pauseRace() {
    if (this.state !== 'RACING' && this.state !== 'COUNTDOWN') return;
    this.prevStateBeforePause = this.state;
    this.state = 'PAUSED';
    this.pauseStartTime = performance.now();

    if (this.audio) {
      this.audio.stopEngine(0.15);
    }

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

    // Compensate race elapsed time so pause doesn't penalize lap times!
    const pauseDuration = performance.now() - this.pauseStartTime;
    this.raceStartTime += pauseDuration;
    this.currentLapStartTime += pauseDuration;

    const pauseModal = document.getElementById('pause-modal');
    if (pauseModal) {
      pauseModal.style.display = 'none';
    }

    this.state = this.prevStateBeforePause || 'RACING';
    this.keys = {}; // Clear any stuck keys during pause

    if (this.audio) {
      this.audio.startEngine();
    }
  }

  restartRace() {
    const pauseModal = document.getElementById('pause-modal');
    if (pauseModal) {
      pauseModal.style.display = 'none';
    }
    this.startRaceCountdown();
  }

  exitToGarage() {
    this.enterLobby();
  }

  getPlayerRank() {
    if (!this.allCarsPhysics || this.allCarsPhysics.length === 0) return 1;
    const standings = [...this.allCarsPhysics].map(phys => {
      const sample = this.track ? this.track.getClosestSplineSample(phys.position) : null;
      const u = sample ? sample.u : 0;
      return { physics: phys, score: phys.lapCount + u };
    }).sort((a, b) => b.score - a.score);
    const rank = standings.findIndex(item => item.physics.isPlayer) + 1;
    return rank > 0 ? rank : 1;
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
    this.previewCarGroup.position.set(0, 0.05, -10.5); // Centered in showroom
    this.previewCarGroup.rotation.y = Math.PI * 0.82; // Face 3/4 front towards camera
    this.scene.add(this.previewCarGroup);

    // Position camera for a cinematic 3/4 showroom hero view
    this.camera.position.set(3.4, 1.35, -6.8);
    this.camera.lookAt(0, 0.5, -10.5);
    this.camera.fov = 50;
    this.camera.updateProjectionMatrix();
    this.isAutoRotating = true;
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
    this.audio.stopLobbyMusic(0.8);
    this.audio.startEngine();

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

    const soundType = (this.playerCar.modelConfig && this.playerCar.modelConfig.soundType) || 'v8';
    const isTurbo = Boolean(this.playerCar.modelConfig && (this.playerCar.modelConfig.id === 'sf90_gt' || this.playerCar.modelConfig.id === 'f40_lm'));
    this.audio.setCarProfile(this.playerConfig.modelId, soundType, isTurbo);

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

    // Auto-fade controls hint toast after 4.5s so bottom screen is completely clean and comfortable to view
    const bottomHint = document.getElementById('hud-bottom-hint');
    if (bottomHint) {
      bottomHint.classList.remove('fade-out');
      if (this.bottomHintTimeout) clearTimeout(this.bottomHintTimeout);
      this.bottomHintTimeout = setTimeout(() => {
        bottomHint.classList.add('fade-out');
      }, 4500);
    }
  }

  /**
   * ==========================================================================
   * Main Simulation Loop: Input, Physics, AI, Camera, and HUD
   * ==========================================================================
   */
  animate() {
    requestAnimationFrame(this.animate);

    const dt = this.clock.getDelta();

    // Update dynamic track animations (drifting clouds, rotating Suzuka Ferris wheel, Spa valley mist)
    if (this.track && this.track.update) {
      this.track.update(dt);
    }

    if (this.state === 'LOBBY') {
      // Rotate 3D car in Showroom if auto-rotating
      if (this.previewCarGroup && this.isAutoRotating) {
        this.previewCarGroup.rotation.y += dt * 0.35;
      }
      this.renderer.render(this.scene, this.camera);
      return;
    }

    if (this.state === 'PAUSED') {
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
          const soundType = (this.playerCar.modelConfig && this.playerCar.modelConfig.soundType) || 'v8';
          const isTurbo = Boolean(this.playerCar.modelConfig && (this.playerCar.modelConfig.id === 'sf90_gt' || this.playerCar.modelConfig.id === 'f40_lm'));
          this.audio.updateEngine(this.playerPhysics.rpm, 0, this.controls.throttle, true, {
            soundType,
            hasTurbo: isTurbo,
            brake: 0,
            gear: 1,
            dt
          });
        }

      }

      // 2. Update Player Physics
      const activeAudio = (this.state === 'RACING' || this.state === 'COUNTDOWN') ? this.audio : null;
      this.playerPhysics.update(dt, this.controls, this.track, activeAudio);

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

      // Exhaust Flame and Smoke FX on Acceleration & Gearshift Backfires
      if (this.playerCar && typeof this.playerCar.getExhaustWorldPositions === 'function') {
        const exhaustTips = this.playerCar.getExhaustWorldPositions();
        const throttle = this.playerPhysics.filteredThrottle;
        const isGearShiftPop = this.playerPhysics.gearShiftPopTimer > 0;
        const isAccelerating = (this.state === 'COUNTDOWN' && throttle > 0.08) || (throttle > 0.20 && this.playerPhysics.speed > -0.5);

        if (exhaustTips.length >= 2) {
          if (isGearShiftPop) {
            // Intense twin backfire pop from both exhaust pipes!
            this.spawnExhaustFlame(exhaustTips[0], this.playerPhysics.yaw, 1.0, true);
            this.spawnExhaustFlame(exhaustTips[1], this.playerPhysics.yaw, 1.0, true);
            this.spawnExhaustSmoke(exhaustTips[0], this.playerPhysics.yaw, 0.9);
            this.spawnExhaustSmoke(exhaustTips[1], this.playerPhysics.yaw, 0.9);
          } else if (isAccelerating) {
            // High-octane fiery exhaust jets when accelerating
            const flameChance = throttle > 0.6 ? 0.75 : 0.45;
            if (Math.random() < flameChance) {
              const tip = Math.random() < 0.5 ? exhaustTips[0] : exhaustTips[1];
              this.spawnExhaustFlame(tip, this.playerPhysics.yaw, throttle, false);
            }
            // Continuous exhaust smoke puffs
            if (Math.random() < 0.65) {
              const tip = Math.random() < 0.5 ? exhaustTips[0] : exhaustTips[1];
              this.spawnExhaustSmoke(tip, this.playerPhysics.yaw, throttle);
            }
          }
        }
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
            if (ai.controller.controls.throttle > 0.55 && Math.random() < 0.25 && typeof ai.car.getExhaustWorldPositions === 'function') {
              const aiTips = ai.car.getExhaustWorldPositions();
              if (aiTips.length >= 2) {
                const tip = Math.random() < 0.5 ? aiTips[0] : aiTips[1];
                this.spawnExhaustSmoke(tip, ai.physics.yaw, 0.6);
                if (Math.random() < 0.3) {
                  this.spawnExhaustFlame(tip, ai.physics.yaw, 0.6, false);
                }
              }
            }
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
    if (this.audio) {
      this.audio.stopEngine(0.5);
      this.audio.playCheckeredFlag();
    }

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
    window.app = window.game;
  });
} else {
  window.game = new GrandPrixGame();
  window.app = window.game;
}

