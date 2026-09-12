/**
 * ==========================================================================
 * Ferrari SF90 Stradale 3D Showcase - Application Logic
 * Powered by Three.js & Web Audio API
 * Developed for Dr. Apisit Tongchai's Educational Portfolio
 * ==========================================================================
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { FERRARI_GLB_BASE64, FERRARI_AO_BASE64 } from './models/ferrari_model_data.js';
import { FERRARI_CATALOG, getFerrariModelById } from './ferrari_catalog.js';

// ==========================================================================
// 1. Application State & Engineering Hotspots Data
// ==========================================================================
const state = {
  currentModelId: 'sf90',  // Selected from 10 iconic Ferrari models
  currentMode: 'showroom', // 'showroom' | 'xray' | 'aero' | 'launch'
  customizerTarget: 'paint', // 'paint' | 'caliper' | 'rim'
  paintColor: '#e61d24',   // Default Rosso Corsa
  caliperColor: '#f8cc00', // Default Giallo Modena
  rimFinish: '#1e293b',    // Titanium Dark
  gurneyFlapAngle: 1.0,    // 0 = low-drag, 1 = high downforce (Default to 1.0 for high downforce display)
  aeroVisualMode: 'smoke', // 'smoke' | 'cfd'
  aeroVectorsVisible: true,
  aeroAirspeed: 250,       // km/h
  isAudioMuted: true,
  isAutoRotate: false,
  isLaunching: false,
  launchSpeed: 0,
  launchProgress: 0,
  activeHotspot: null,
  isCustomModelLoaded: false,
  hotspotsVisible: true
};
window.state = state;

// Official & Historic Ferrari Customization Palettes
const FERRARI_PALETTES = {
  paint: [
    { name: 'Rosso Corsa', hex: '#e61d24', desc: 'Classic Formula 1 Racing Red' },
    { name: 'Rosso Scuderia', hex: '#ff2800', desc: 'Scuderia Team Vibrant Red' },
    { name: 'Rosso Mugello', hex: '#730014', desc: 'Deep Wine Mugello Red' },
    { name: 'Giallo Modena', hex: '#f8cc00', desc: 'Prancing Horse Canary Yellow' },
    { name: 'Nero Daytona', hex: '#11141a', desc: 'Deep Metallic Carbon Black' },
    { name: 'Bianco Avus', hex: '#f8fafc', desc: 'Pure Alpine Ice White' },
    { name: 'Blu Tour de France', hex: '#0a2e5c', desc: 'Metallic Grand Touring Blue' },
    { name: 'Blu Pozzi', hex: '#071426', desc: 'Heritage Midnight Blue' },
    { name: 'Verde British', hex: '#0d3822', desc: 'Vintage Endurance Racing Green' },
    { name: 'Grigio Silverstone', hex: '#4b5563', desc: 'Gunmetal Titanium Grey' },
    { name: 'Arancio Dino', hex: '#ea580c', desc: 'Historic 1970 Dino Orange' },
    { name: 'Azzurro Dino', hex: '#0284c7', desc: 'Historic Dino Sky Blue' }
  ],
  caliper: [
    { name: 'Giallo Modena', hex: '#f8cc00', desc: 'Canary Yellow Brembo Calipers' },
    { name: 'Rosso Corsa', hex: '#e61d24', desc: 'Racing Red Calipers' },
    { name: 'Nero Carbon', hex: '#1e293b', desc: 'Satin Black Calipers' },
    { name: 'Alluminio', hex: '#cbd5e1', desc: 'Anodized Silver Calipers' },
    { name: 'Oro Racing', hex: '#d97706', desc: 'Motorsport Gold Calipers' },
    { name: 'Blu Elettrico', hex: '#00e5ff', desc: 'Cyan Electric Calipers' }
  ],
  rim: [
    { name: 'Titanium Dark', hex: '#1e293b', desc: 'Satin Dark Titanium' },
    { name: 'Liquid Silver', hex: '#e2e8f0', desc: 'High-Gloss Chrome Silver' },
    { name: 'Grigio Corsa', hex: '#475569', desc: 'Matte Gunmetal Alloy' },
    { name: 'Gloss Black', hex: '#0a0a0a', desc: 'Piano Black Finish' },
    { name: 'Racing Gold', hex: '#b45309', desc: 'Campagnolo Vintage Gold' }
  ]
};

let currentFerrariModel = getFerrariModelById('sf90');
let hotspotsData = currentFerrariModel.hotspots;
let activeModelParts = null;
let baseFerrariGltfScene = null;

// Hotspots and models are loaded dynamically from FERRARI_CATALOG

// ==========================================================================
// 2. Three.js Scene Setup & Variables
// ==========================================================================
let scene, camera, renderer, controls;
let carGroup, bodyMeshGroup, powertrainGroup, aeroGroup, wheelsGroup;
let gurneyFlapMesh = null;
let aeroSimulationGroup = null;
let aeroCurvesData = [];
let aeroGuideLinesMesh = null;
let aeroParticlePoints = null;
const aeroParticlesData = [];
let aeroVectorsGroup = null;
let frontForceVectorMesh = null;
let rearForceVectorMesh = null;
const tireMeshes = [];
const rimMeshes = [];
const caliperMeshes = [];
const paintMaterials = [];
const dimmableMaterials = [];
let shadowMesh = null;
let groundLightRing = null;

// Camera Tween State
let isCameraAnimating = false;
let camStartPos = new THREE.Vector3();
let camEndPos = new THREE.Vector3();
let camStartTarget = new THREE.Vector3();
let camEndTarget = new THREE.Vector3();
let camAnimAlpha = 0;

// ==========================================================================
// 3. Web Audio API Engine & Authentic Ferrari Acoustic System
// ==========================================================================
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isInitialized = false;
    this.engineGain = null;
    this.osc1 = null;
    this.osc2 = null;
    this.electricGain = null;
    this.electricOsc = null;
    this.compressor = null;
    this.masterGain = null;

    // Authentic High-Fidelity Exhaust Audio Assets Cache
    this.audioBuffers = {};
    this.loadingBuffers = false;
    this.activeRealSource = null;
    this.activeRealGain = null;
    this.activeRealType = null;
  }

  init() {
    if (this.isInitialized) {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    // Studio Dynamics Compressor for punchy, authentic exhaust acoustics
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(10, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(5, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.18, this.ctx.currentTime);
    this.compressor.connect(this.ctx.destination);

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(state.isAudioMuted ? 0 : 1, this.ctx.currentTime);
    this.masterGain.connect(this.compressor);

    // Procedural Synth Backup / Idle Engine
    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(45, this.ctx.currentTime);

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(90, this.ctx.currentTime);

    const waveshaper = this.ctx.createWaveShaper();
    waveshaper.curve = this.makeDistortionCurve(18);

    this.osc1.connect(waveshaper);
    this.osc2.connect(waveshaper);
    waveshaper.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);

    this.osc1.start();
    this.osc2.start();

    // Hybrid Electric Whine Oscillator
    this.electricGain = this.ctx.createGain();
    this.electricGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.electricOsc = this.ctx.createOscillator();
    this.electricOsc.type = 'sine';
    this.electricOsc.frequency.setValueAtTime(1400, this.ctx.currentTime);

    this.electricOsc.connect(this.electricGain);
    this.electricGain.connect(this.masterGain);
    this.electricOsc.start();

    this.isInitialized = true;

    // Asynchronously preload recorded authentic Ferrari audio assets
    this.preloadRealAudio();
  }

  async preloadRealAudio() {
    if (this.loadingBuffers || (this.audioBuffers.v8 && this.audioBuffers.v12 && this.audioBuffers.gto)) return;
    this.loadingBuffers = true;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!this.ctx && AudioContext) {
      this.ctx = new AudioContext();
    }
    if (!this.ctx) {
      this.loadingBuffers = false;
      return;
    }

    const soundFiles = {
      v8: './sounds/ferrari_v8_launch.mp3',
      v12: './sounds/ferrari_v12_f1_launch.mp3',
      gto: './sounds/ferrari_250gto_v12.mp3'
    };

    for (const [key, url] of Object.entries(soundFiles)) {
      if (this.audioBuffers[key]) continue;
      try {
        const resp = await fetch(url);
        if (resp.ok) {
          const arrayBuffer = await resp.arrayBuffer();
          this.ctx.decodeAudioData(
            arrayBuffer,
            (decoded) => {
              this.audioBuffers[key] = decoded;
              console.log(`[Ferrari Audio] Authentic sound asset ready: ${key} (${decoded.duration.toFixed(1)}s, ${decoded.numberOfChannels}ch)`);
              const badge = document.getElementById('shelf-sound-badge');
              if (badge) badge.classList.add('ready');
            },
            (err) => {
              console.warn(`[Ferrari Audio] Decode failed for ${key}:`, err);
            }
          );
        }
      } catch (e) {
        console.warn(`[Ferrari Audio] Fetch failed for ${url}:`, e);
      }
    }
    this.loadingBuffers = false;
  }

  playRealLaunch(modelId, durationSec = 2.5) {
    this.init();
    if (state.isAudioMuted || !this.ctx) return false;

    // Stop any currently running launch audio
    this.stopRealLaunch(0.05);

    const modelCfg = (currentFerrariModel && currentFerrariModel.sound) ? currentFerrariModel.sound : {
      realType: 'v8',
      offset: 0.0,
      hasElectricWhine: true
    };
    const realType = modelCfg.realType || 'v8';
    const startOffset = typeof modelCfg.offset === 'number' ? modelCfg.offset : 0.0;
    const buffer = this.audioBuffers[realType];

    if (!buffer) {
      console.log(`[Ferrari Audio] Real audio buffer '${realType}' still loading, falling back smoothly to procedural synth.`);
      return false;
    }

    try {
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      // Staging launch control throttle revs during 3-2-1 countdown (t=0 to t=1.0s)
      gain.gain.setValueAtTime(0.55, now);
      // Explosive acceleration roar at green light (t=1.0s)
      gain.gain.linearRampToValueAtTime(0.95, now + 1.0);
      // Peak full throttle acceleration
      gain.gain.setValueAtTime(1.0, now + 1.2);
      // Smooth fade-out after crossing 60 MPH
      const fadeOutStart = now + 1.0 + durationSec + 0.4;
      gain.gain.setValueAtTime(1.0, fadeOutStart);
      gain.gain.exponentialRampToValueAtTime(0.001, fadeOutStart + 1.0);

      source.connect(gain);
      gain.connect(this.masterGain);

      source.start(now, startOffset);
      source.stop(fadeOutStart + 1.05);

      this.activeRealSource = source;
      this.activeRealGain = gain;
      this.activeRealType = realType;

      const badge = document.getElementById('shelf-sound-badge');
      if (badge) badge.classList.add('playing');

      source.onended = () => {
        if (this.activeRealSource === source) {
          this.activeRealSource = null;
          this.activeRealGain = null;
          this.activeRealType = null;
        }
        if (badge) badge.classList.remove('playing');
      };

      // Mute the synthetic engine oscillators so pure authentic engine audio shines
      if (this.engineGain) {
        this.engineGain.gain.setTargetAtTime(0.02, now, 0.05);
      }

      // Hybrid electric whine can blend in if enabled for SF90 / LaFerrari
      if (modelCfg.hasElectricWhine && this.electricGain) {
        this.electricGain.gain.setValueAtTime(0.04, now + 1.0);
        this.electricGain.gain.linearRampToValueAtTime(0.14, now + 1.0 + durationSec * 0.7);
        this.electricGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0 + durationSec + 0.4);
      }

      return true;
    } catch (err) {
      console.warn('[Ferrari Audio] playRealLaunch error:', err);
      return false;
    }
  }

  stopRealLaunch(fadeTime = 0.3) {
    if (this.activeRealGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.activeRealGain.gain.linearRampToValueAtTime(0.001, now + fadeTime);
        const src = this.activeRealSource;
        setTimeout(() => {
          try {
            if (src) src.stop();
          } catch (e) {}
        }, fadeTime * 1000 + 50);
      } catch (e) {}
    }
    this.activeRealSource = null;
    this.activeRealGain = null;
    this.activeRealType = null;
    const badge = document.getElementById('shelf-sound-badge');
    if (badge) badge.classList.remove('playing');
  }

  makeDistortionCurve(amount) {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  playBeep(freq = 880, duration = 0.1) {
    if (state.isAudioMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playUiClick(pitch = 1400) {
    if (state.isAudioMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.35, this.ctx.currentTime + 0.02);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.02);
    } catch (e) {}
  }

  updateEngineRPM(rpmFactor) {
    if (!this.isInitialized || state.isAudioMuted) {
      if (this.engineGain) this.engineGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      if (this.electricGain) this.electricGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      return;
    }

    // If real launch audio is currently playing, only modulate electric whine (if hybrid)
    if (this.activeRealSource) {
      const soundCfg = (currentFerrariModel && currentFerrariModel.sound) ? currentFerrariModel.sound : {};
      if (soundCfg.hasElectricWhine && this.electricOsc) {
        this.electricOsc.frequency.setTargetAtTime(1200 + rpmFactor * 2800, this.ctx.currentTime, 0.05);
      }
      return;
    }

    const soundCfg = (currentFerrariModel && currentFerrariModel.sound) ? currentFerrariModel.sound : { baseFreq: 45, maxFreq: 185, hasElectricWhine: true, volume: 0.22 };
    const baseFreq = soundCfg.baseFreq + rpmFactor * (soundCfg.maxFreq - soundCfg.baseFreq);
    
    // Engine architecture acoustic harmonic profiles
    const id = currentFerrariModel ? currentFerrariModel.id : 'sf90';
    if (id === 'laferrari' || id === 'enzo' || id === 'superfast812') {
      // Screaming high-rev Formula 1 style V12 overtone
      this.osc1.frequency.setTargetAtTime(baseFreq * 1.15, this.ctx.currentTime, 0.05);
      this.osc2.frequency.setTargetAtTime(baseFreq * 2.0, this.ctx.currentTime, 0.05);
    } else if (id === 'gto250') {
      // Classic vintage Colombo V12 induction rasp
      this.osc1.frequency.setTargetAtTime(baseFreq * 1.05, this.ctx.currentTime, 0.05);
      this.osc2.frequency.setTargetAtTime(baseFreq * 1.75, this.ctx.currentTime, 0.05);
    } else if (id === 'testarossa') {
      // 180° Flat-12 Boxer mechanical rhythm
      this.osc1.frequency.setTargetAtTime(baseFreq * 1.08, this.ctx.currentTime, 0.05);
      this.osc2.frequency.setTargetAtTime(baseFreq * 1.62, this.ctx.currentTime, 0.05);
    } else {
      // Twin-Turbo & Atmospheric V8 (SF90, F40, 488 Pista, 458, Roma)
      this.osc1.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.05);
      this.osc2.frequency.setTargetAtTime(baseFreq * 1.5, this.ctx.currentTime, 0.05);
    }

    const targetVolume = (0.15 + rpmFactor * 0.25) * (soundCfg.volume ? (soundCfg.volume / 0.22) : 1.0);
    this.engineGain.gain.setTargetAtTime(targetVolume, this.ctx.currentTime, 0.05);

    if (soundCfg.hasElectricWhine) {
      this.electricOsc.frequency.setTargetAtTime(1200 + rpmFactor * 2600, this.ctx.currentTime, 0.05);
      this.electricGain.gain.setTargetAtTime(0.08 + rpmFactor * 0.12, this.ctx.currentTime, 0.05);
    } else {
      this.electricGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
    }
  }

  mute() {
    this.stopRealLaunch(0.15);
    if (this.engineGain) this.engineGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.02);
    if (this.electricGain) this.electricGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.02);
    if (this.masterGain) this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.02);
  }

  unmute() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(1, this.ctx.currentTime, 0.02);
    }
  }
}

const audio = new AudioSynthesizer();
window.audio = audio;

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// ==========================================================================
// 4. Parametric Powertrain Generator for 10 Iconic Ferrari Models
// ==========================================================================
function createModelPowertrain(model) {
  const ptGroup = new THREE.Group();
  ptGroup.name = `Powertrain_${model.id}`;
  ptGroup.visible = state.currentMode === 'xray';

  const engineRedMat = new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    metalness: 0.88,
    roughness: 0.25,
    emissive: 0x660000,
    emissiveIntensity: 0.25
  });
  const engineBlackMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    metalness: 0.75,
    roughness: 0.35
  });
  const silverPlenumMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.94,
    roughness: 0.15
  });
  const motorCyanMat = new THREE.MeshStandardMaterial({
    color: 0x00e5ff,
    metalness: 0.85,
    roughness: 0.2,
    emissive: 0x00a3cc,
    emissiveIntensity: 0.55
  });
  const batteryGreenMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    metalness: 0.65,
    roughness: 0.3,
    emissive: 0x047857,
    emissiveIntensity: 0.4
  });
  const cableOrangeMat = new THREE.MeshStandardMaterial({
    color: 0xff6600,
    roughness: 0.4,
    emissive: 0xff4400,
    emissiveIntensity: 0.2
  });
  const turboGoldMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.9,
    roughness: 0.2
  });
  const intercoolerSilverMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.88,
    roughness: 0.3
  });
  const carbonBulkheadMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.45,
    metalness: 0.7
  });

  const id = model.id;

  if (id === 'sf90') {
    // 1. Mid 4.0L Twin-Turbo V8 Engine Block
    const v8Block = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.36, 0.72), engineRedMat);
    v8Block.position.set(0, 0.44, 0.55);
    ptGroup.add(v8Block);

    // Twin Hot-V Turbos
    const turboGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.16, 16);
    turboGeo.rotateZ(Math.PI / 2);
    const turboL = new THREE.Mesh(turboGeo, turboGoldMat);
    turboL.position.set(-0.35, 0.52, 0.55);
    const turboR = new THREE.Mesh(turboGeo, turboGoldMat);
    turboR.position.set(0.35, 0.52, 0.55);
    ptGroup.add(turboL, turboR);

    // Dual Front Motors (RAC-e)
    const mGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.22, 16);
    mGeo.rotateZ(Math.PI / 2);
    const fMotorL = new THREE.Mesh(mGeo, motorCyanMat);
    fMotorL.position.set(-0.42, 0.34, -1.25);
    const fMotorR = new THREE.Mesh(mGeo, motorCyanMat);
    fMotorR.position.set(0.42, 0.34, -1.25);
    ptGroup.add(fMotorL, fMotorR);

    // Rear MGUK Motor
    const mguk = new THREE.Mesh(mGeo, motorCyanMat);
    mguk.position.set(0, 0.38, 1.25);
    ptGroup.add(mguk);

    // 7.9 kWh Battery Pack
    const bat = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.12, 0.65), batteryGreenMat);
    bat.position.set(0, 0.23, -0.15);
    ptGroup.add(bat);

    // High-Voltage Orange Cables
    const cableGeo = new THREE.CylinderGeometry(0.018, 0.018, 1.5, 8);
    cableGeo.rotateX(Math.PI / 2);
    const cL = new THREE.Mesh(cableGeo, cableOrangeMat);
    cL.position.set(-0.22, 0.25, -0.55);
    const cR = new THREE.Mesh(cableGeo, cableOrangeMat);
    cR.position.set(0.22, 0.25, -0.55);
    ptGroup.add(cL, cR);

    // Carbon Bulkhead
    const bh = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.52, 0.05), carbonBulkheadMat);
    bh.position.set(0, 0.52, 0.05);
    ptGroup.add(bh);

  } else if (id === 'laferrari') {
    // Mid 6.3L 65° V12 Block
    const v12Block = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.38, 0.95), engineRedMat);
    v12Block.position.set(0, 0.46, 0.55);
    ptGroup.add(v12Block);

    // Dual Silver Intake Plenums
    const plGeo = new THREE.BoxGeometry(0.22, 0.12, 0.88);
    const plL = new THREE.Mesh(plGeo, silverPlenumMat);
    plL.position.set(-0.18, 0.68, 0.55);
    const plR = new THREE.Mesh(plGeo, silverPlenumMat);
    plR.position.set(0.18, 0.68, 0.55);
    ptGroup.add(plL, plR);

    // Rear HY-KERS Electric Motor (Cyan)
    const kersMotor = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.28, 16), motorCyanMat);
    kersMotor.rotation.z = Math.PI / 2;
    kersMotor.position.set(0, 0.38, 1.30);
    ptGroup.add(kersMotor);

    // 120-cell Floor Battery Pack
    const bat = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.10, 0.85), batteryGreenMat);
    bat.position.set(0, 0.22, 0.05);
    ptGroup.add(bat);

    // Orange KERS Power Conduit
    const cGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.1, 8);
    cGeo.rotateX(Math.PI / 2);
    const cable = new THREE.Mesh(cGeo, cableOrangeMat);
    cable.position.set(0, 0.26, 0.70);
    ptGroup.add(cable);

  } else if (id === 'f40') {
    // Mid 2.9L Twin-Turbo V8
    const v8Block = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.35, 0.68), engineRedMat);
    v8Block.position.set(0, 0.42, 0.60);
    ptGroup.add(v8Block);

    // Twin Behr Top Intercoolers (Silver finned boxes)
    const icGeo = new THREE.BoxGeometry(0.38, 0.14, 0.34);
    const icL = new THREE.Mesh(icGeo, intercoolerSilverMat);
    icL.position.set(-0.25, 0.68, 0.55);
    const icR = new THREE.Mesh(icGeo, intercoolerSilverMat);
    icR.position.set(0.25, 0.68, 0.55);
    ptGroup.add(icL, icR);

    // Twin IHI Turbos
    const tGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.16, 16);
    tGeo.rotateZ(Math.PI / 2);
    const tL = new THREE.Mesh(tGeo, turboGoldMat);
    tL.position.set(-0.38, 0.42, 0.78);
    const tR = new THREE.Mesh(tGeo, turboGoldMat);
    tR.position.set(0.38, 0.42, 0.78);
    ptGroup.add(tL, tR);

    // Gated 5-speed Transaxle Casing
    const trans = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.28, 0.42), silverPlenumMat);
    trans.position.set(0, 0.34, 1.35);
    ptGroup.add(trans);

  } else if (id === 'enzo') {
    // Mid 6.0L 65° Tipo F140B V12 Block
    const v12Block = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.38, 0.95), engineRedMat);
    v12Block.position.set(0, 0.46, 0.58);
    ptGroup.add(v12Block);

    // Carbon fiber ram-air intake plenums
    const plGeo = new THREE.BoxGeometry(0.24, 0.13, 0.85);
    const plL = new THREE.Mesh(plGeo, carbonBulkheadMat);
    plL.position.set(-0.18, 0.68, 0.58);
    const plR = new THREE.Mesh(plGeo, carbonBulkheadMat);
    plR.position.set(0.18, 0.68, 0.58);
    ptGroup.add(plL, plR);

    // 6-Speed Electrohydraulic Transaxle
    const trans = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.30, 0.46), silverPlenumMat);
    trans.position.set(0, 0.36, 1.32);
    ptGroup.add(trans);

    // Dry Sump Tank
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.32, 16), silverPlenumMat);
    tank.position.set(0.38, 0.52, 0.12);
    ptGroup.add(tank);

  } else if (id === 'f458') {
    // Mid 4.5L Flat-Plane V8 (9,000 RPM)
    const v8Block = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.35, 0.68), engineRedMat);
    v8Block.position.set(0, 0.44, 0.55);
    ptGroup.add(v8Block);

    // Red Crackle-Finish Dual Intake Manifolds
    const plGeo = new THREE.BoxGeometry(0.22, 0.12, 0.64);
    const plL = new THREE.Mesh(plGeo, engineRedMat);
    plL.position.set(-0.16, 0.64, 0.55);
    const plR = new THREE.Mesh(plGeo, engineRedMat);
    plR.position.set(0.16, 0.64, 0.55);
    ptGroup.add(plL, plR);

    // 7-Speed DCT Transaxle
    const trans = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.28, 0.42), silverPlenumMat);
    trans.position.set(0, 0.35, 1.25);
    ptGroup.add(trans);

  } else if (id === 'pista') {
    // Mid 3.9L Twin-Turbo V8
    const v8Block = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.35, 0.68), engineRedMat);
    v8Block.position.set(0, 0.44, 0.55);
    ptGroup.add(v8Block);

    // Carbon Fiber Intake Plenums
    const plGeo = new THREE.BoxGeometry(0.22, 0.12, 0.64);
    const plL = new THREE.Mesh(plGeo, carbonBulkheadMat);
    plL.position.set(-0.16, 0.64, 0.55);
    const plR = new THREE.Mesh(plGeo, carbonBulkheadMat);
    plR.position.set(0.16, 0.64, 0.55);
    ptGroup.add(plL, plR);

    // Twin Turbos with Gold Heat Shield
    const tGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.16, 16);
    tGeo.rotateZ(Math.PI / 2);
    const tL = new THREE.Mesh(tGeo, turboGoldMat);
    tL.position.set(-0.35, 0.50, 0.55);
    const tR = new THREE.Mesh(tGeo, turboGoldMat);
    tR.position.set(0.35, 0.50, 0.55);
    ptGroup.add(tL, tR);

    // Internal S-Duct Passage in Front
    const sDuct = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.18, 0.75), carbonBulkheadMat);
    sDuct.position.set(0, 0.35, -1.55);
    ptGroup.add(sDuct);

  } else if (id === 'testarossa') {
    // Mid 4.9L 180° Flat-12 Boxer Engine (Wide Low-Profile)
    const flat12Block = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.22, 0.88), engineRedMat);
    flat12Block.position.set(0, 0.36, 0.60);
    ptGroup.add(flat12Block);

    // Bosch K-Jetronic Intake Manifold Runners
    const intakeManifold = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.10, 0.72), silverPlenumMat);
    intakeManifold.position.set(0, 0.50, 0.60);
    ptGroup.add(intakeManifold);

    // Dual Side-Mounted Water Radiators
    const radGeo = new THREE.BoxGeometry(0.12, 0.32, 0.55);
    const radL = new THREE.Mesh(radGeo, intercoolerSilverMat);
    radL.position.set(-0.72, 0.36, 0.35);
    const radR = new THREE.Mesh(radGeo, intercoolerSilverMat);
    radR.position.set(0.72, 0.36, 0.35);
    ptGroup.add(radL, radR);

    // 5-speed Manual Transaxle Below Crankshaft
    const trans = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.25, 0.44), silverPlenumMat);
    trans.position.set(0, 0.24, 1.25);
    ptGroup.add(trans);

  } else if (id === 'gto250') {
    // Front-Mid 3.0L Colombo V12 (Black crackle finish)
    const colomboBlock = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.36, 0.86), engineBlackMat);
    colomboBlock.position.set(0, 0.44, -1.05);
    ptGroup.add(colomboBlock);

    // 6x Twin-Choke Weber Carburetors with 12 Chrome Trumpets
    for (let i = -2.5; i <= 2.5; i += 1) {
      const weber = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.11), silverPlenumMat);
      weber.position.set(0, 0.64, -1.05 + i * 0.13);
      ptGroup.add(weber);

      const stackGeo = new THREE.CylinderGeometry(0.022, 0.016, 0.08, 12);
      const stackL = new THREE.Mesh(stackGeo, silverPlenumMat);
      stackL.position.set(-0.06, 0.71, -1.05 + i * 0.13);
      const stackR = new THREE.Mesh(stackGeo, silverPlenumMat);
      stackR.position.set(0.06, 0.71, -1.05 + i * 0.13);
      ptGroup.add(stackL, stackR);
    }

    // Front Copper/Brass Radiator Core
    const rad = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.34, 0.08), turboGoldMat);
    rad.position.set(0, 0.36, -1.85);
    ptGroup.add(rad);

    // 5-Speed Manual Dog-Leg Transmission
    const trans = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.45), silverPlenumMat);
    trans.position.set(0, 0.32, -0.2);
    ptGroup.add(trans);

  } else if (id === 'superfast812') {
    // Front-Mid 6.5L NA V12
    const v12Block = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.38, 0.95), engineRedMat);
    v12Block.position.set(0, 0.45, -0.95);
    ptGroup.add(v12Block);

    // Variable Geometry Carbon Intake Plenum
    const plGeo = new THREE.BoxGeometry(0.24, 0.13, 0.88);
    const plL = new THREE.Mesh(plGeo, carbonBulkheadMat);
    plL.position.set(-0.18, 0.66, -0.95);
    const plR = new THREE.Mesh(plGeo, carbonBulkheadMat);
    plR.position.set(0.18, 0.66, -0.95);
    ptGroup.add(plL, plR);

    // Rear Transaxle 7-Speed DCT
    const trans = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.30, 0.48), silverPlenumMat);
    trans.position.set(0, 0.36, 1.25);
    ptGroup.add(trans);

    // Rear 4WS Electric Steering Actuators (Cyan)
    const steerGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.18, 16);
    steerGeo.rotateZ(Math.PI / 2);
    const sL = new THREE.Mesh(steerGeo, motorCyanMat);
    sL.position.set(-0.48, 0.36, 1.45);
    const sR = new THREE.Mesh(steerGeo, motorCyanMat);
    sR.position.set(0.48, 0.36, 1.45);
    ptGroup.add(sL, sR);

  } else if (id === 'roma') {
    // Front-Mid 3.9L Twin-Turbo V8
    const v8Block = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.35, 0.70), engineRedMat);
    v8Block.position.set(0, 0.42, -0.95);
    ptGroup.add(v8Block);

    // Twin Scroll Turbos
    const tGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.16, 16);
    tGeo.rotateZ(Math.PI / 2);
    const tL = new THREE.Mesh(tGeo, turboGoldMat);
    tL.position.set(-0.32, 0.44, -0.95);
    const tR = new THREE.Mesh(tGeo, turboGoldMat);
    tR.position.set(0.32, 0.44, -0.95);
    ptGroup.add(tL, tR);

    // Rear 8-Speed DCT Transmission
    const trans = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.28, 0.44), silverPlenumMat);
    trans.position.set(0, 0.36, 1.25);
    ptGroup.add(trans);
  }

  return ptGroup;
}

// ==========================================================================
// 5. Model-Specific Aerodynamics & Iconic Styling Features (10 Models)
// ==========================================================================
function createModelAeroAndStyling(model) {
  const group = new THREE.Group();
  group.name = `Styling_${model.id}`;

  const carbonMat = new THREE.MeshStandardMaterial({ color: 0x14161a, roughness: 0.38, metalness: 0.75 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.98, roughness: 0.08 });
  const exhaustMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95, roughness: 0.15 });
  const exhaustInnerMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
  const ledMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
  const tailRedMat = new THREE.MeshBasicMaterial({ color: 0xff002b });

  const id = model.id;

  if (id === 'sf90') {
    // 1. Patented Active Shut-off Gurney Flap
    const gurneyGeo = new THREE.BoxGeometry(1.18, 0.035, 0.24);
    gurneyFlapMesh = new THREE.Mesh(gurneyGeo, carbonMat);
    gurneyFlapMesh.position.set(0, 0.73, 1.88);
    gurneyFlapMesh.castShadow = true;
    group.add(gurneyFlapMesh);

    // 2. High-Mounted Twin Titanium Exhaust Tips
    const exGeo = new THREE.CylinderGeometry(0.062, 0.062, 0.14, 16);
    exGeo.rotateX(Math.PI / 2);
    [-0.13, 0.13].forEach((x) => {
      const ex = new THREE.Mesh(exGeo, exhaustMat);
      ex.position.set(x, 0.59, 2.15);
      const exIn = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.142, 16), exhaustInnerMat);
      exIn.rotateX(Math.PI / 2);
      exIn.position.set(x, 0.59, 2.152);
      group.add(ex, exIn);
    });

    // 3. Matrix LED Daytime Running Lights (DRLs)
    const drlGeo = new THREE.BoxGeometry(0.18, 0.025, 0.02);
    const drlL1 = new THREE.Mesh(drlGeo, ledMat);
    drlL1.position.set(-0.68, 0.49, -1.94);
    drlL1.rotation.y = 0.25;
    const drlR1 = new THREE.Mesh(drlGeo, ledMat);
    drlR1.position.set(0.68, 0.49, -1.94);
    drlR1.rotation.y = -0.25;
    group.add(drlL1, drlR1);

  } else if (id === 'laferrari') {
    // Active Rear Spoiler
    const wing = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.04, 0.28), carbonMat);
    wing.position.set(0, 0.74, 1.90);
    gurneyFlapMesh = wing;
    group.add(wing);

    // F1 Nose Vertical Aero Keel
    const f1Keel = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.22, 0.48), carbonMat);
    f1Keel.position.set(0, 0.24, -2.15);
    group.add(f1Keel);

    // Cockpit Roof Scoop
    const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.42), carbonMat);
    scoop.position.set(0, 0.88, 0.15);
    group.add(scoop);

    // Quad Rear Exhausts
    const exGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.14, 16);
    exGeo.rotateX(Math.PI / 2);
    [-0.42, -0.30, 0.30, 0.42].forEach((x) => {
      const ex = new THREE.Mesh(exGeo, exhaustMat);
      ex.position.set(x, 0.52, 2.18);
      group.add(ex);
    });

    // F1 HY-KERS Central Red Rain Light
    const kersLight = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.02), tailRedMat);
    kersLight.position.set(0, 0.22, 2.22);
    group.add(kersLight);

  } else if (id === 'f40') {
    // Iconic High Box Rear Wing
    const uprightGeo = new THREE.BoxGeometry(0.045, 0.48, 0.34);
    const upL = new THREE.Mesh(uprightGeo, carbonMat);
    upL.position.set(-0.84, 0.94, 1.95);
    const upR = new THREE.Mesh(uprightGeo, carbonMat);
    upR.position.set(0.84, 0.94, 1.95);

    const wingPlane = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.045, 0.32), carbonMat);
    wingPlane.position.set(0, 1.16, 1.98);
    gurneyFlapMesh = wingPlane;
    group.add(upL, upR, wingPlane);

    // Triple Center Exhausts (2 Main + 1 Wastegate)
    const mainExGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.14, 16);
    mainExGeo.rotateX(Math.PI / 2);
    const wasteExGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.14, 16);
    wasteExGeo.rotateX(Math.PI / 2);

    const exL = new THREE.Mesh(mainExGeo, exhaustMat);
    exL.position.set(-0.11, 0.36, 2.18);
    const exR = new THREE.Mesh(mainExGeo, exhaustMat);
    exR.position.set(0.11, 0.36, 2.18);
    const exCenter = new THREE.Mesh(wasteExGeo, exhaustMat);
    exCenter.position.set(0, 0.36, 2.18);
    group.add(exL, exR, exCenter);

    // NACA Ducts on Front Bonnet
    const nacaGeo = new THREE.BoxGeometry(0.12, 0.02, 0.24);
    const nacaL = new THREE.Mesh(nacaGeo, carbonMat);
    nacaL.position.set(-0.35, 0.38, -1.35);
    const nacaR = new THREE.Mesh(nacaGeo, carbonMat);
    nacaR.position.set(0.35, 0.38, -1.35);
    group.add(nacaL, nacaR);

    // Rear Polycarbonate Louvered Deck
    for (let i = 0; i < 4; i++) {
      const louver = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.015, 0.04), carbonMat);
      louver.position.set(0, 0.70 - i * 0.03, 0.85 + i * 0.22);
      group.add(louver);
    }

  } else if (id === 'enzo') {
    // Active Rear Flap
    const wing = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.035, 0.22), carbonMat);
    wing.position.set(0, 0.76, 1.92);
    gurneyFlapMesh = wing;
    group.add(wing);

    // F1 Needle Nose Cone (Bonnet Center Ridge)
    const f1Nose = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.035, 0.45), carbonMat);
    f1Nose.position.set(0, 0.36, -1.98);
    f1Nose.rotation.x = 0.08;
    group.add(f1Nose);

    // Roof Center Spine
    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 1.15), carbonMat);
    spine.position.set(0, 0.88, -0.1);
    group.add(spine);

    // Quad Protruding Cylindrical Taillights
    const tlGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.08, 16);
    tlGeo.rotateX(Math.PI / 2);
    [-0.65, -0.45, 0.45, 0.65].forEach((x) => {
      const tl = new THREE.Mesh(tlGeo, tailRedMat);
      tl.position.set(x, 0.70, 2.18);
      group.add(tl);
    });

    // Dual Tunnel Quad Exhausts
    const exGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.12, 16);
    exGeo.rotateX(Math.PI / 2);
    [-0.38, -0.26, 0.26, 0.38].forEach((x) => {
      const ex = new THREE.Mesh(exGeo, exhaustMat);
      ex.position.set(x, 0.25, 2.2);
      group.add(ex);
    });

  } else if (id === 'f458') {
    // Triple Center Exhaust Tips
    const exGeo = new THREE.CylinderGeometry(0.048, 0.048, 0.14, 16);
    exGeo.rotateX(Math.PI / 2);
    [-0.085, 0, 0.085].forEach((x) => {
      const ex = new THREE.Mesh(exGeo, chromeMat);
      ex.position.set(x, 0.38, 2.18);
      group.add(ex);
    });

    // Deformable Front Winglets in Radiator Mouth
    const wingletGeo = new THREE.BoxGeometry(0.24, 0.02, 0.12);
    const wL = new THREE.Mesh(wingletGeo, carbonMat);
    wL.position.set(-0.35, 0.22, -2.15);
    wL.rotation.z = -0.15;
    const wR = new THREE.Mesh(wingletGeo, carbonMat);
    wR.position.set(0.35, 0.22, -2.15);
    wR.rotation.z = 0.15;
    group.add(wL, wR);

    // Swept-back Vertical Headlight Bars
    const hlGeo = new THREE.BoxGeometry(0.035, 0.02, 0.45);
    const hlL = new THREE.Mesh(hlGeo, ledMat);
    hlL.position.set(-0.68, 0.52, -1.68);
    hlL.rotation.y = 0.18;
    const hlR = new THREE.Mesh(hlGeo, ledMat);
    hlR.position.set(0.68, 0.52, -1.68);
    hlR.rotation.y = -0.18;
    group.add(hlL, hlR);

  } else if (id === 'pista') {
    // S-Duct Inverted Hood Scoop
    const sDuctTop = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.06, 0.65), carbonMat);
    sDuctTop.position.set(0, 0.41, -1.45);
    sDuctTop.rotation.x = -0.12;
    group.add(sDuctTop);

    // Front Bumper Carbon Dive Planes (Canards)
    const canardGeo = new THREE.BoxGeometry(0.22, 0.02, 0.14);
    const cL = new THREE.Mesh(canardGeo, carbonMat);
    cL.position.set(-0.86, 0.26, -2.02);
    cL.rotation.z = -0.25;
    const cR = new THREE.Mesh(canardGeo, carbonMat);
    cR.position.set(0.86, 0.26, -2.02);
    cR.rotation.z = 0.25;
    group.add(cL, cR);

    // Raised Twin Exhausts
    const exGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.14, 16);
    exGeo.rotateX(Math.PI / 2);
    [-0.22, 0.22].forEach((x) => {
      const ex = new THREE.Mesh(exGeo, exhaustMat);
      ex.position.set(x, 0.52, 2.18);
      group.add(ex);
    });

    // Suspended Rear Lip Spoiler
    const lip = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.045, 0.18), carbonMat);
    lip.position.set(0, 0.77, 1.95);
    gurneyFlapMesh = lip;
    group.add(lip);

  } else if (id === 'testarossa') {
    // 5 Horizontal Side Strakes on Each Door/Haunch
    for (let i = 0; i < 5; i++) {
      const y = 0.26 + i * 0.045;
      const strakeGeo = new THREE.BoxGeometry(0.04, 0.018, 1.35);
      const sL = new THREE.Mesh(strakeGeo, carbonMat);
      sL.position.set(-0.92, y, 0.45);
      const sR = new THREE.Mesh(strakeGeo, carbonMat);
      sR.position.set(0.92, y, 0.45);
      group.add(sL, sR);
    }

    // Full-Width Rear Black Grille Louvers
    for (let i = 0; i < 6; i++) {
      const y = 0.44 + i * 0.038;
      const louver = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.015, 0.03), carbonMat);
      louver.position.set(0, y, 2.22);
      group.add(louver);
    }

    // Pop-up Headlamp Housings
    const popGeo = new THREE.BoxGeometry(0.24, 0.025, 0.24);
    const pL = new THREE.Mesh(popGeo, carbonMat);
    pL.position.set(-0.48, 0.42, -1.75);
    const pR = new THREE.Mesh(popGeo, carbonMat);
    pR.position.set(0.48, 0.42, -1.75);
    group.add(pL, pR);

    // Quad Chrome Exhaust Tips
    const exGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.14, 16);
    exGeo.rotateX(Math.PI / 2);
    [-0.55, -0.45, 0.45, 0.55].forEach((x) => {
      const ex = new THREE.Mesh(exGeo, chromeMat);
      ex.position.set(x, 0.22, 2.18);
      group.add(ex);
    });

  } else if (id === 'gto250') {
    // Triple D-Shaped Nose Vents
    const ventGeo = new THREE.BoxGeometry(0.16, 0.04, 0.03);
    const vC = new THREE.Mesh(ventGeo, carbonMat);
    vC.position.set(0, 0.42, -2.12);
    const vL = new THREE.Mesh(ventGeo, carbonMat);
    vL.position.set(-0.25, 0.40, -2.08);
    const vR = new THREE.Mesh(ventGeo, carbonMat);
    vR.position.set(0.25, 0.40, -2.08);
    group.add(vC, vL, vR);

    // Oval Egg-Crate Front Chrome Grille
    const grille = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.16, 0.03), chromeMat);
    grille.position.set(0, 0.26, -2.10);
    group.add(grille);

    // Classic Kamm Ducktail Rear Spoiler
    const ducktail = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.06, 0.14), carbonMat);
    ducktail.position.set(0, 0.75, 1.95);
    ducktail.rotation.x = -0.2;
    gurneyFlapMesh = ducktail;
    group.add(ducktail);

    // Quad Vintage Straight-Pipe Exhausts (Slash-cut)
    const exGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.18, 16);
    exGeo.rotateX(Math.PI / 2);
    [-0.46, -0.36, 0.36, 0.46].forEach((x) => {
      const ex = new THREE.Mesh(exGeo, chromeMat);
      ex.position.set(x, 0.24, 2.22);
      group.add(ex);
    });

    // Vintage Knock-Off Center Spinners (3 ears)
    const spinGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 6);
    spinGeo.rotateZ(Math.PI / 2);
    [-1.25, 1.45].forEach((z) => {
      [-0.88, 0.88].forEach((x) => {
        const sp = new THREE.Mesh(spinGeo, chromeMat);
        sp.position.set(x, 0.36, z);
        group.add(sp);
      });
    });

  } else if (id === 'superfast812') {
    // Muscular Bonnet Vents
    const ventGeo = new THREE.BoxGeometry(0.14, 0.02, 0.32);
    const vL = new THREE.Mesh(ventGeo, carbonMat);
    vL.position.set(-0.35, 0.46, -1.1);
    const vR = new THREE.Mesh(ventGeo, carbonMat);
    vR.position.set(0.35, 0.46, -1.1);
    group.add(vL, vR);

    // Quad Round Taillights
    const tlGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
    tlGeo.rotateX(Math.PI / 2);
    [-0.62, -0.42, 0.42, 0.62].forEach((x) => {
      const tl = new THREE.Mesh(tlGeo, tailRedMat);
      tl.position.set(x, 0.64, 2.2);
      group.add(tl);
    });

    // Quad Aggressive Exhaust Pipes
    const exGeo = new THREE.CylinderGeometry(0.052, 0.052, 0.15, 16);
    exGeo.rotateX(Math.PI / 2);
    [-0.48, -0.36, 0.36, 0.48].forEach((x) => {
      const ex = new THREE.Mesh(exGeo, exhaustMat);
      ex.position.set(x, 0.30, 2.18);
      group.add(ex);
    });

    // Active Multi-Stage Diffuser Flap
    const diffFlap = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.04, 0.22), carbonMat);
    diffFlap.position.set(0, 0.74, 1.92);
    gurneyFlapMesh = diffFlap;
    group.add(diffFlap);

  } else if (id === 'roma') {
    // Shark-Nose Monolithic Perforated Grille Mesh
    const grille = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.16, 0.03), carbonMat);
    grille.position.set(0, 0.28, -2.10);
    group.add(grille);

    // Horizontal Slit Headlights
    const hlGeo = new THREE.BoxGeometry(0.16, 0.02, 0.03);
    const hlL = new THREE.Mesh(hlGeo, ledMat);
    hlL.position.set(-0.68, 0.46, -1.90);
    const hlR = new THREE.Mesh(hlGeo, ledMat);
    hlR.position.set(0.68, 0.46, -1.90);
    group.add(hlL, hlR);

    // Retractable Mobile Glass Spoiler
    const spoiler = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.03, 0.25), carbonMat);
    spoiler.position.set(0, 0.72, 1.85);
    gurneyFlapMesh = spoiler;
    group.add(spoiler);

    // Quad Seamless Flush Exhausts
    const exGeo = new THREE.CylinderGeometry(0.046, 0.046, 0.14, 16);
    exGeo.rotateX(Math.PI / 2);
    [-0.46, -0.35, 0.35, 0.46].forEach((x) => {
      const ex = new THREE.Mesh(exGeo, chromeMat);
      ex.position.set(x, 0.28, 2.18);
      group.add(ex);
    });
  }

  return group;
}

// ==========================================================================
// 6. Sculpted Procedural Ferrari SF90 Model Generator (High-Detail Supercar)
// ==========================================================================
function createFerrariSF90Procedural() {
  const root = new THREE.Group();
  root.name = 'Ferrari_SF90_Stradale_Sculpted';

  bodyMeshGroup = new THREE.Group();
  bodyMeshGroup.name = 'Body_Group';

  aeroGroup = new THREE.Group();
  aeroGroup.name = 'Aero_Group';

  wheelsGroup = new THREE.Group();
  wheelsGroup.name = 'Wheels_Group';

  const carPaintMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(state.paintColor),
    metalness: 0.88,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    reflectivity: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 1.0
  });
  paintMaterials.push(carPaintMat);

  const carbonFiberMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.38,
    metalness: 0.75,
    transparent: true,
    opacity: 1.0
  });
  dimmableMaterials.push(carbonFiberMat);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0f172a,
    metalness: 0.1,
    roughness: 0.03,
    transmission: 0.88,
    ior: 1.52,
    transparent: true,
    opacity: 0.8
  });

  const tireRubberMat = new THREE.MeshStandardMaterial({ color: 0x1c1e22, roughness: 0.85, metalness: 0.1 });
  const caliperMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(state.caliperColor), metalness: 0.7, roughness: 0.25 });
  caliperMeshes.push(caliperMat);
  const brakeRotorMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.88, roughness: 0.3 });

  // 1. Carbon Underbody Floor Pan
  const underFloorGeo = new THREE.BoxGeometry(1.78, 0.08, 4.45);
  const underFloor = new THREE.Mesh(underFloorGeo, carbonFiberMat);
  underFloor.position.set(0, 0.12, 0.08);
  underFloor.castShadow = true;
  bodyMeshGroup.add(underFloor);

  // 2. Central Monocoque Cabin Tub
  const centerTubGeo = new THREE.BoxGeometry(1.48, 0.28, 2.55);
  const centerTub = new THREE.Mesh(centerTubGeo, carPaintMat);
  centerTub.position.set(0, 0.26, 0.1);
  centerTub.castShadow = true;
  centerTub.receiveShadow = true;
  bodyMeshGroup.add(centerTub);

  // 3. Sloping Low Front Bonnet & S-Duct (Tapered Wedge)
  const hoodGeo = new THREE.BoxGeometry(1.42, 0.17, 1.55);
  const hoodMesh = new THREE.Mesh(hoodGeo, carPaintMat);
  hoodMesh.position.set(0, 0.33, -1.35);
  hoodMesh.rotation.x = 0.06;
  hoodMesh.castShadow = true;
  bodyMeshGroup.add(hoodMesh);

  // Front Pointed Nose Cone
  const noseGeo = new THREE.BoxGeometry(1.22, 0.13, 0.46);
  const noseMesh = new THREE.Mesh(noseGeo, carPaintMat);
  noseMesh.position.set(0, 0.26, -2.12);
  noseMesh.castShadow = true;
  bodyMeshGroup.add(noseMesh);

  // Front Carbon Fiber Splitter
  const frontSplitterGeo = new THREE.BoxGeometry(1.88, 0.04, 0.46);
  const frontSplitter = new THREE.Mesh(frontSplitterGeo, carbonFiberMat);
  frontSplitter.position.set(0, 0.12, -2.18);
  frontSplitter.castShadow = true;
  bodyMeshGroup.add(frontSplitter);

  // Front Left & Right Muscular Fenders (Wheel Arches - Overlapping seamlessly)
  const frontFenderGeo = new THREE.BoxGeometry(0.32, 0.34, 1.45);
  const fenderFL = new THREE.Mesh(frontFenderGeo, carPaintMat);
  fenderFL.position.set(-0.76, 0.37, -1.25);
  const fenderFR = new THREE.Mesh(frontFenderGeo, carPaintMat);
  fenderFR.position.set(0.76, 0.37, -1.25);
  fenderFL.castShadow = true;
  fenderFR.castShadow = true;
  bodyMeshGroup.add(fenderFL, fenderFR);

  // Matrix LED Headlight Slits
  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe });
  const headlightGeo = new THREE.BoxGeometry(0.18, 0.03, 0.22);
  const hlL = new THREE.Mesh(headlightGeo, headlightMat);
  hlL.position.set(-0.70, 0.45, -1.82);
  hlL.rotation.y = 0.2;
  const hlR = new THREE.Mesh(headlightGeo, headlightMat);
  hlR.position.set(0.70, 0.45, -1.82);
  hlR.rotation.y = -0.2;
  bodyMeshGroup.add(hlL, hlR);

  // 4. Side Skirts & Radiator Air Scoops
  const skirtGeo = new THREE.BoxGeometry(0.24, 0.20, 1.65);
  const skirtL = new THREE.Mesh(skirtGeo, carPaintMat);
  skirtL.position.set(-0.76, 0.22, 0.1);
  const skirtR = new THREE.Mesh(skirtGeo, carPaintMat);
  skirtR.position.set(0.76, 0.22, 0.1);
  bodyMeshGroup.add(skirtL, skirtR);

  // Side Air Intake Inlets
  const intakeMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.9 });
  const intakeGeo = new THREE.BoxGeometry(0.05, 0.14, 0.48);
  const inL = new THREE.Mesh(intakeGeo, intakeMat);
  inL.position.set(-0.88, 0.31, 0.55);
  const inR = new THREE.Mesh(intakeGeo, intakeMat);
  inR.position.set(0.88, 0.31, 0.55);
  bodyMeshGroup.add(inL, inR);

  // 5. Rear Muscular Haunches (Wide Fenders)
  const rearHaunchGeo = new THREE.BoxGeometry(0.36, 0.40, 1.55);
  const leftHaunch = new THREE.Mesh(rearHaunchGeo, carPaintMat);
  leftHaunch.position.set(-0.78, 0.43, 1.45);
  const rightHaunch = new THREE.Mesh(rearHaunchGeo, carPaintMat);
  rightHaunch.position.set(0.78, 0.43, 1.45);
  leftHaunch.castShadow = true;
  rightHaunch.castShadow = true;
  bodyMeshGroup.add(leftHaunch, rightHaunch);

  // 6. Cockpit Canopy (Smooth Aerodynamic Bubble)
  const cabinGeo = new THREE.SphereGeometry(1.0, 32, 16);
  cabinGeo.scale(0.70, 0.35, 1.28);
  const cabinMesh = new THREE.Mesh(cabinGeo, glassMat);
  cabinMesh.position.set(0, 0.58, -0.15);
  cabinMesh.castShadow = true;
  bodyMeshGroup.add(cabinMesh);

  // Assetto Fiorano Contrast Carbon Roof Panel
  const roofGeo = new THREE.BoxGeometry(1.08, 0.035, 1.18);
  const roofMesh = new THREE.Mesh(roofGeo, carbonFiberMat);
  roofMesh.position.set(0, 0.82, -0.15);
  roofMesh.castShadow = true;
  bodyMeshGroup.add(roofMesh);

  // 7. Rear Engine Glass Deck Cover
  const engineCoverGeo = new THREE.BoxGeometry(0.98, 0.025, 0.98);
  const engineCover = new THREE.Mesh(engineCoverGeo, glassMat);
  engineCover.position.set(0, 0.65, 0.85);
  bodyMeshGroup.add(engineCover);

  // 8. Rear Carbon Diffuser, Quad Taillights & Dual Center Exhausts
  const diffuserGeo = new THREE.BoxGeometry(1.82, 0.16, 0.48);
  const diffuserMesh = new THREE.Mesh(diffuserGeo, carbonFiberMat);
  diffuserMesh.position.set(0, 0.16, 2.12);
  bodyMeshGroup.add(diffuserMesh);

  // SF90 Signature High-Mounted Dual Exhausts
  const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.95, roughness: 0.2 });
  const exhaustGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.12, 16);
  exhaustGeo.rotateX(Math.PI / 2);
  const exhL = new THREE.Mesh(exhaustGeo, exhaustMat);
  exhL.position.set(-0.11, 0.48, 2.18);
  const exhR = new THREE.Mesh(exhaustGeo, exhaustMat);
  exhR.position.set(0.11, 0.48, 2.18);
  bodyMeshGroup.add(exhL, exhR);

  const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xff002b });
  const tailLightGeo = new THREE.BoxGeometry(0.20, 0.045, 0.03);
  const tl1 = new THREE.Mesh(tailLightGeo, tailLightMat);
  tl1.position.set(-0.62, 0.62, 2.2);
  const tl2 = new THREE.Mesh(tailLightGeo, tailLightMat);
  tl2.position.set(-0.36, 0.62, 2.2);
  const tl3 = new THREE.Mesh(tailLightGeo, tailLightMat);
  tl3.position.set(0.36, 0.62, 2.2);
  const tl4 = new THREE.Mesh(tailLightGeo, tailLightMat);
  tl4.position.set(0.62, 0.62, 2.2);
  bodyMeshGroup.add(tl1, tl2, tl3, tl4);

  // 9. 5-Spoke Star Forged Wheels & Drilled Carbon-Ceramic Brakes
  const wheelPositions = [
    { x: -0.84, y: 0.36, z: -1.25, isRear: false },
    { x: 0.83, y: 0.36, z: -1.25, isRear: false },
    { x: -0.82, y: 0.36, z: 1.45, isRear: true },
    { x: 0.82, y: 0.36, z: 1.45, isRear: true }
  ];

  wheelPositions.forEach((pos) => {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(pos.x, pos.y, pos.z);

    const radius = 0.36;
    const width = pos.isRear ? 0.28 : 0.24;

    // Tire
    const tireGeo = new THREE.CylinderGeometry(radius, radius, width, 28);
    tireGeo.rotateZ(Math.PI / 2);
    const tire = new THREE.Mesh(tireGeo, tireRubberMat);
    tire.castShadow = true;
    wheelGroup.add(tire);
    tireMeshes.push(wheelGroup);

    // Star Rim
    const rimMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(state.rimFinish), metalness: 0.94, roughness: 0.16 });
    rimMeshes.push(rimMat);
    const rimGeo = new THREE.CylinderGeometry(radius * 0.78, radius * 0.78, width * 1.02, 16);
    rimGeo.rotateZ(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, rimMat);
    wheelGroup.add(rim);

    // Ferrari Yellow Center Cap
    const capMat = new THREE.MeshStandardMaterial({ color: 0xf8cc00, metalness: 0.8, roughness: 0.2 });
    const capGeo = new THREE.CylinderGeometry(0.045, 0.045, width * 1.04, 16);
    capGeo.rotateZ(Math.PI / 2);
    const cap = new THREE.Mesh(capGeo, capMat);
    wheelGroup.add(cap);

    // Drilled Brake Rotor
    const rotorGeo = new THREE.CylinderGeometry(radius * 0.65, radius * 0.65, 0.03, 20);
    rotorGeo.rotateZ(Math.PI / 2);
    const rotor = new THREE.Mesh(rotorGeo, brakeRotorMat);
    rotor.position.x = pos.x > 0 ? -0.06 : 0.06;
    wheelGroup.add(rotor);

    // Brembo Brake Caliper
    const caliperGeo = new THREE.BoxGeometry(0.06, 0.14, 0.16);
    const caliper = new THREE.Mesh(caliperGeo, caliperMat);
    caliper.position.set(pos.x > 0 ? -0.06 : 0.06, radius * 0.35, 0);
    wheelGroup.add(caliper);

    wheelsGroup.add(wheelGroup);
  });

  root.add(bodyMeshGroup);
  root.add(aeroGroup);
  root.add(wheelsGroup);

  activeModelParts = createModelAeroAndStyling(currentFerrariModel);
  root.add(activeModelParts);

  powertrainGroup = createModelPowertrain(currentFerrariModel);
  root.add(powertrainGroup);

  return root;
}

// ==========================================================================
// 7. Professional Wind Tunnel & CFD Aerodynamic Simulation Engine
// Grounded in SAE J2084 & Ferrari SF90 Stradale Aerodynamic Disclosures
// ==========================================================================

// Soft radial Gaussian alpha texture for photorealistic wind tunnel smoke
function createSmokeParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.88)');
  grad.addColorStop(0.50, 'rgba(255, 255, 255, 0.40)');
  grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.12)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Scientific CFD Turbo/Jet Colormap for local velocity magnitude
function getCfdVelocityColor(vRatio, targetColor) {
  // vRatio typically ranges from 0.35 (stagnation) to 1.60 (peak canopy acceleration)
  const t = THREE.MathUtils.clamp((vRatio - 0.35) / 1.25, 0, 1);
  if (t < 0.25) {
    const k = t / 0.25;
    targetColor.setRGB(0.12, 0.10 + k * 0.70, 1.0); // Stagnation Deep Indigo -> Royal Blue
  } else if (t < 0.50) {
    const k = (t - 0.25) / 0.25;
    targetColor.setRGB(0.0, 0.90 + k * 0.10, 0.90 - k * 0.80); // Cyan -> Free-stream Green
  } else if (t < 0.75) {
    const k = (t - 0.50) / 0.25;
    targetColor.setRGB(k, 1.0 - k * 0.10, 0.0); // Green -> High-energy Yellow
  } else {
    const k = (t - 0.75) / 0.25;
    targetColor.setRGB(1.0, 0.90 - k * 0.85, 0.02); // Yellow -> Crimson / Flame Peak
  }
  return targetColor;
}

// Generates 32 curvilinear aerodynamic streamlines based on Ferrari SF90 CAD profile
function generateStreamlineControlPoints(flapAngle) {
  const streamlines = [];

  // 1. Centerline & Upper Canopy Flow (10 Streamlines)
  const canopyX = [-0.44, -0.32, -0.20, -0.09, -0.02, 0.02, 0.09, 0.20, 0.32, 0.44];
  canopyX.forEach((x0) => {
    const absX = Math.abs(x0);
    const signX = x0 >= 0 ? 1 : -1;

    // Upwash parameters based on active Shut-Off Gurney flap (0 = Low Drag, 1 = High Downforce)
    const upwashY = flapAngle * 0.70;
    const wakeSpread = flapAngle * 0.28;

    const pts = [
      new THREE.Vector3(x0, 0.38 + absX * 0.04, -3.8),               // Wind Tunnel Rake Emitter
      new THREE.Vector3(x0 * 0.96, 0.38 + absX * 0.05, -2.6),
      new THREE.Vector3(x0 * 0.92, 0.48 + (0.5 - absX) * 0.12, -1.9), // Nose Stagnation
      new THREE.Vector3(x0 * 0.85, 0.60 + (0.5 - absX) * 0.08, -1.2), // Hood Contour
      new THREE.Vector3(x0 * 0.76, 0.78 + (0.5 - absX) * 0.06, -0.5), // Windshield Cowl
      new THREE.Vector3(x0 * 0.68, 1.05 + (0.5 - absX) * 0.08, 0.15), // Raked Windshield
      new THREE.Vector3(x0 * 0.64, 1.17 + (0.5 - absX) * 0.04, 0.50), // Roof Peak (Max Velocity)
      new THREE.Vector3(x0 * 0.68, 1.03 + (0.5 - absX) * 0.05, 0.95), // Rear Window Slope
      new THREE.Vector3(x0 * 0.76, 0.84 + (0.5 - absX) * 0.03, 1.45), // Engine Cover Glass
      new THREE.Vector3(x0 * 0.82, 0.74, 1.88),                        // Shut-off Gurney Entry
      // Tail Deflection (LD = Flat; HD = Rooster-tail upwash + vortex curl):
      new THREE.Vector3(x0 * 0.86 + signX * wakeSpread * 0.12, 0.72 + upwashY * 0.35, 2.2),
      new THREE.Vector3(x0 * 0.92 + signX * wakeSpread * 0.32, 0.68 + upwashY * 0.85, 2.7),
      new THREE.Vector3(x0 * 0.98 + signX * wakeSpread * 0.62, 0.65 + upwashY * 1.12, 3.4),
      new THREE.Vector3(x0 * 1.04 + signX * wakeSpread * 0.92, 0.62 + upwashY * 1.25, 4.2)
    ];
    streamlines.push({ type: 'canopy', points: pts });
  });

  // 2. Flank Waistline & Side Radiator Scoops (8 Streamlines)
  const flankX = [-1.15, -0.98, -0.84, -0.70, 0.70, 0.84, 0.98, 1.15];
  flankX.forEach((x0) => {
    const pts = [
      new THREE.Vector3(x0, 0.44, -3.8),
      new THREE.Vector3(x0 * 1.04, 0.44, -2.5),
      new THREE.Vector3(x0 * 1.08, 0.48, -1.8), // Split around front bumper
      new THREE.Vector3(x0 * 1.02, 0.52, -1.1), // Arches over front wheel
      new THREE.Vector3(x0 * 0.92, 0.54, -0.3), // Pinches in along sculpted door waistline
      new THREE.Vector3(x0 * 0.90, 0.56, 0.3),
      new THREE.Vector3(x0 * 0.95, 0.60, 0.75), // Suctioned into side intercooler scoop!
      new THREE.Vector3(x0 * 1.04, 0.65, 1.4),  // Discharges over muscular rear haunches
      new THREE.Vector3(x0 * 1.08, 0.68, 2.1),  // Exits past tail lights
      new THREE.Vector3(x0 * 1.12, 0.66, 3.2),
      new THREE.Vector3(x0 * 1.16, 0.64, 4.2)
    ];
    streamlines.push({ type: 'flank', points: pts });
  });

  // 3. Underbody Venturi & Blown Diffuser (8 Streamlines)
  const underbodyX = [-0.62, -0.42, -0.24, -0.09, 0.09, 0.24, 0.42, 0.62];
  underbodyX.forEach((x0) => {
    const pts = [
      new THREE.Vector3(x0, 0.15, -3.8),
      new THREE.Vector3(x0, 0.14, -2.4),
      new THREE.Vector3(x0, 0.12, -1.5),       // Sucked under front carbon splitter
      new THREE.Vector3(x0, 0.11, -0.5),       // Venturi flat floor
      new THREE.Vector3(x0, 0.11, 0.5),
      new THREE.Vector3(x0 * 1.05, 0.13, 1.2), // Approaching rear axle
      new THREE.Vector3(x0 * 1.20, 0.25, 1.6), // Enters upswept rear diffuser
      new THREE.Vector3(x0 * 1.35, 0.38, 2.1), // Diffuser expansion throat
      new THREE.Vector3(x0 * 1.50, 0.46, 2.8), // Expanding upward into exhaust wake
      new THREE.Vector3(x0 * 1.65, 0.50, 4.0)
    ];
    streamlines.push({ type: 'underbody', points: pts });
  });

  // 4. A-Pillar & Mirror Vortex Shedding (4 Streamlines)
  [-1, 1].forEach((signX) => {
    [0, 1].forEach((vIdx) => {
      const yBase = 0.82 + vIdx * 0.08;
      const pts = [
        new THREE.Vector3(signX * 0.88, yBase, -3.8),
        new THREE.Vector3(signX * 0.92, yBase, -1.8),
        new THREE.Vector3(signX * 0.98, yBase + 0.02, -0.6),
        new THREE.Vector3(signX * 1.05, yBase + 0.04, -0.15), // Peels off mirror housing
        new THREE.Vector3(signX * 1.02, yBase + 0.06, 0.35),  // Corkscrew along greenhouse
        new THREE.Vector3(signX * 0.98, yBase + 0.04, 0.95),
        new THREE.Vector3(signX * 1.02, yBase + 0.02, 1.65),
        new THREE.Vector3(signX * 1.08, yBase, 2.6),
        new THREE.Vector3(signX * 1.15, yBase - 0.04, 4.0)
      ];
      streamlines.push({ type: 'mirror', points: pts });
    });
  });

  // 5. Front Wheel Arch Extraction Louvers (2 Streamlines)
  [-1, 1].forEach((signX) => {
    const pts = [
      new THREE.Vector3(signX * 0.82, 0.35, -2.4),
      new THREE.Vector3(signX * 0.96, 0.48, -1.3),
      new THREE.Vector3(signX * 1.18, 0.52, -0.5), // Blown outward past front wheel arch
      new THREE.Vector3(signX * 1.25, 0.54, 0.4),
      new THREE.Vector3(signX * 1.28, 0.55, 1.6),
      new THREE.Vector3(signX * 1.30, 0.56, 3.8)
    ];
    streamlines.push({ type: 'wheel', points: pts });
  });

  return streamlines;
}

// Builds the curves, lines, and particle clouds
function createAeroSimulation() {
  aeroSimulationGroup = new THREE.Group();
  aeroSimulationGroup.name = 'Professional_Aero_Simulation';
  aeroSimulationGroup.visible = false;

  // 1. Build 3D Catmull-Rom Curves
  rebuildAeroStreamlinesData();

  // 2. Continuous Streamline Guide Filaments Mesh
  const guideLinesGeo = new THREE.BufferGeometry();
  const guidePositions = [];
  const guideColors = [];
  const tempCol = new THREE.Color();

  aeroCurvesData.forEach((item) => {
    const curve = item.curve;
    const segs = 40;
    for (let j = 0; j < segs; j++) {
      const u1 = j / segs;
      const u2 = (j + 1) / segs;
      const p1 = curve.getPointAt(u1);
      const p2 = curve.getPointAt(u2);
      guidePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);

      const v1 = estimateLocalVelocityRatio(item.type, p1.z, state.gurneyFlapAngle);
      const v2 = estimateLocalVelocityRatio(item.type, p2.z, state.gurneyFlapAngle);
      getCfdVelocityColor(v1, tempCol);
      guideColors.push(tempCol.r, tempCol.g, tempCol.b);
      getCfdVelocityColor(v2, tempCol);
      guideColors.push(tempCol.r, tempCol.g, tempCol.b);
    }
  });

  guideLinesGeo.setAttribute('position', new THREE.Float32BufferAttribute(guidePositions, 3));
  guideLinesGeo.setAttribute('color', new THREE.Float32BufferAttribute(guideColors, 3));

  const guideLinesMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.32,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  aeroGuideLinesMesh = new THREE.LineSegments(guideLinesGeo, guideLinesMat);
  aeroSimulationGroup.add(aeroGuideLinesMesh);

  // 3. Flowing Smoke Streaklets (Train of soft particles along each streamline)
  const particlesPerStreamline = 20;
  const totalParticles = aeroCurvesData.length * particlesPerStreamline;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(totalParticles * 3);
  const particleColors = new Float32Array(totalParticles * 3);

  aeroParticlesData.length = 0;
  let pIdx = 0;
  aeroCurvesData.forEach((item, sIdx) => {
    for (let k = 0; k < particlesPerStreamline; k++) {
      const u = (k / particlesPerStreamline + Math.random() * 0.04) % 1.0;
      aeroParticlesData.push({
        curveIdx: sIdx,
        u: u,
        speed: 0.38 + Math.random() * 0.08
      });

      const pt = item.curve.getPointAt(u);
      particlePositions[pIdx * 3] = pt.x;
      particlePositions[pIdx * 3 + 1] = pt.y;
      particlePositions[pIdx * 3 + 2] = pt.z;

      particleColors[pIdx * 3] = 0.9;
      particleColors[pIdx * 3 + 1] = 0.98;
      particleColors[pIdx * 3 + 2] = 1.0;
      pIdx++;
    }
  });

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  const smokeTexture = createSmokeParticleTexture();
  const particleMat = new THREE.PointsMaterial({
    map: smokeTexture,
    size: 0.16,
    transparent: true,
    opacity: 0.88,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  aeroParticlePoints = new THREE.Points(particleGeo, particleMat);
  aeroSimulationGroup.add(aeroParticlePoints);

  // 4. 3D Downforce Load Force Vectors
  aeroVectorsGroup = createDownforceVectors();
  aeroSimulationGroup.add(aeroVectorsGroup);

  return aeroSimulationGroup;
}

// Recomputes the curves when Gurney Flap changes
function rebuildAeroStreamlinesData() {
  const rawData = generateStreamlineControlPoints(state.gurneyFlapAngle);
  aeroCurvesData = rawData.map((item) => {
    const curve = new THREE.CatmullRomCurve3(item.points, false, 'centripetal', 0.4);
    return {
      type: item.type,
      curve: curve
    };
  });
}

// Updates guidelines geometry when flap moves or visual mode changes
function rebuildAeroStreamlines() {
  rebuildAeroStreamlinesData();

  if (!aeroGuideLinesMesh) return;
  const guidePositions = aeroGuideLinesMesh.geometry.attributes.position.array;
  const guideColors = aeroGuideLinesMesh.geometry.attributes.color.array;
  const tempCol = new THREE.Color();

  let pOffset = 0;
  aeroCurvesData.forEach((item) => {
    const curve = item.curve;
    const segs = 40;
    for (let j = 0; j < segs; j++) {
      const u1 = j / segs;
      const u2 = (j + 1) / segs;
      const p1 = curve.getPointAt(u1);
      const p2 = curve.getPointAt(u2);

      guidePositions[pOffset * 3] = p1.x;
      guidePositions[pOffset * 3 + 1] = p1.y;
      guidePositions[pOffset * 3 + 2] = p1.z;

      guidePositions[(pOffset + 1) * 3] = p2.x;
      guidePositions[(pOffset + 1) * 3 + 1] = p2.y;
      guidePositions[(pOffset + 1) * 3 + 2] = p2.z;

      if (state.aeroVisualMode === 'cfd') {
        const v1 = estimateLocalVelocityRatio(item.type, p1.z, state.gurneyFlapAngle);
        const v2 = estimateLocalVelocityRatio(item.type, p2.z, state.gurneyFlapAngle);
        getCfdVelocityColor(v1, tempCol);
        guideColors[pOffset * 3] = tempCol.r;
        guideColors[pOffset * 3 + 1] = tempCol.g;
        guideColors[pOffset * 3 + 2] = tempCol.b;

        getCfdVelocityColor(v2, tempCol);
        guideColors[(pOffset + 1) * 3] = tempCol.r;
        guideColors[(pOffset + 1) * 3 + 1] = tempCol.g;
        guideColors[(pOffset + 1) * 3 + 2] = tempCol.b;
      } else {
        guideColors[pOffset * 3] = 0.45;
        guideColors[pOffset * 3 + 1] = 0.85;
        guideColors[pOffset * 3 + 2] = 1.0;

        guideColors[(pOffset + 1) * 3] = 0.45;
        guideColors[(pOffset + 1) * 3 + 1] = 0.85;
        guideColors[(pOffset + 1) * 3 + 2] = 1.0;
      }

      pOffset += 2;
    }
  });

  aeroGuideLinesMesh.geometry.attributes.position.needsUpdate = true;
  aeroGuideLinesMesh.geometry.attributes.color.needsUpdate = true;
}

// Estimates local velocity magnitude ratio (|V| / V_inf) for CFD colormap
function estimateLocalVelocityRatio(type, z, flapAngle) {
  if (type === 'canopy') {
    if (z < -2.1) return 0.95; // Upstream approach
    if (z < -1.8) return 0.38; // Nose stagnation zone
    if (z < -0.4) return 1.15; // Hood acceleration
    if (z < 0.2) return 1.30;  // Windshield ramp
    if (z < 0.7) return 1.55;  // Canopy peak maximum velocity
    if (z < 1.4) return 1.18;  // Rear glass slope
    if (z < 1.9) return flapAngle > 0.6 ? 0.55 : 0.95; // Gurney dam deceleration
    return 0.85; // Wake region
  } else if (type === 'underbody') {
    if (z < -1.8) return 0.65;
    if (z < 1.0) return 1.25;  // Venturi throat underbody
    if (z < 2.0) return 1.48;  // High-expansion rear diffuser
    return 0.75;
  } else if (type === 'flank') {
    if (z < -1.0) return 1.10;
    if (z < 0.3) return 0.95;
    if (z < 1.1) return 1.35;  // Intercooler scoop suction
    return 0.90;
  } else if (type === 'mirror') {
    if (z < 0.2) return 1.40;  // A-pillar vortex acceleration
    return 0.80;
  }
  return 1.0;
}

// Creates 3D Downforce Load Force Vectors (Front splitter & Rear active wing)
function createDownforceVectors() {
  const group = new THREE.Group();
  group.name = 'Downforce_Load_Vectors';

  // 1. Front Downforce Vector (Splitter & Vortex Strakes)
  const frontGroup = new THREE.Group();
  frontGroup.position.set(0, 0.25, -2.05);

  const frontMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
  const frontConeGeo = new THREE.ConeGeometry(0.065, 0.14, 16);
  const frontCone = new THREE.Mesh(frontConeGeo, frontMat);
  frontCone.rotation.x = Math.PI; // Point downwards
  frontCone.position.y = 0.07;
  frontGroup.add(frontCone);

  const frontShaftGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.35, 16);
  const frontShaft = new THREE.Mesh(frontShaftGeo, frontMat);
  frontShaft.position.y = 0.14 + 0.175;
  frontGroup.add(frontShaft);

  frontForceVectorMesh = frontGroup;
  group.add(frontGroup);

  // 2. Rear Downforce Vector (Active Shut-Off Gurney Area)
  const rearGroup = new THREE.Group();
  rearGroup.position.set(0, 0.78, 1.88);

  const rearMat = new THREE.MeshBasicMaterial({ color: 0xff2800 });
  const rearConeGeo = new THREE.ConeGeometry(0.085, 0.18, 16);
  const rearCone = new THREE.Mesh(rearConeGeo, rearMat);
  rearCone.rotation.x = Math.PI; // Point downwards
  rearCone.position.y = 0.09;
  rearGroup.add(rearCone);

  const rearShaftGeo = new THREE.CylinderGeometry(0.030, 0.030, 0.50, 16);
  const rearShaft = new THREE.Mesh(rearShaftGeo, rearMat);
  rearShaft.position.y = 0.18 + 0.25;
  rearGroup.add(rearShaft);

  rearForceVectorMesh = rearGroup;
  group.add(rearGroup);

  return group;
}

// Main update loop for aerodynamic streamlines & particles
function updateAeroParticles(delta) {
  if (!aeroSimulationGroup || !aeroParticlePoints || aeroCurvesData.length === 0) return;

  const positions = aeroParticlePoints.geometry.attributes.position.array;
  const colors = aeroParticlePoints.geometry.attributes.color.array;
  const tempCol = new THREE.Color();
  const speedScale = (state.aeroAirspeed / 250) * (state.isLaunching ? 3.0 : 1.0);

  aeroParticlesData.forEach((p, idx) => {
    const curveItem = aeroCurvesData[p.curveIdx];
    if (!curveItem) return;

    // Advance along curve
    p.u = (p.u + p.speed * delta * speedScale) % 1.0;
    const pt = curveItem.curve.getPointAt(p.u);

    positions[idx * 3] = pt.x;
    positions[idx * 3 + 1] = pt.y;
    positions[idx * 3 + 2] = pt.z;

    // Evaluate color
    if (state.aeroVisualMode === 'cfd') {
      const vRatio = estimateLocalVelocityRatio(curveItem.type, pt.z, state.gurneyFlapAngle);
      getCfdVelocityColor(vRatio, tempCol);

      // Fade out at extreme boundaries
      let alpha = 1.0;
      if (pt.z < -3.2) alpha = THREE.MathUtils.clamp((pt.z - (-3.8)) / 0.6, 0, 1);
      else if (pt.z > 3.4) alpha = THREE.MathUtils.clamp(1.0 - (pt.z - 3.4) / 0.8, 0, 1);

      colors[idx * 3] = tempCol.r * alpha;
      colors[idx * 3 + 1] = tempCol.g * alpha;
      colors[idx * 3 + 2] = tempCol.b * alpha;
    } else {
      // Photorealistic Laser Wind Tunnel Smoke Mode
      let alpha = 1.0;
      if (pt.z < -3.0) alpha = THREE.MathUtils.clamp((pt.z - (-3.8)) / 0.8, 0, 1);
      else if (pt.z > 3.0) alpha = THREE.MathUtils.clamp(1.0 - (pt.z - 3.0) / 1.1, 0, 1);

      // Subtle cyan-white laser smoke glow
      colors[idx * 3] = 0.88 * alpha;
      colors[idx * 3 + 1] = 0.98 * alpha;
      colors[idx * 3 + 2] = 1.0 * alpha;
    }
  });

  aeroParticlePoints.geometry.attributes.position.needsUpdate = true;
  aeroParticlePoints.geometry.attributes.color.needsUpdate = true;

  // Update Downforce Vectors dynamically
  if (rearForceVectorMesh) {
    const flap = state.gurneyFlapAngle;
    const rearScale = 0.65 + flap * 0.70;
    rearForceVectorMesh.scale.set(1, rearScale, 1);
  }
}

// Telemetry HUD & Flap Controller
function setAeroFlap(val) {
  state.gurneyFlapAngle = THREE.MathUtils.clamp(val, 0, 1);
  const slider = document.getElementById('flap-slider');
  if (slider) slider.value = state.gurneyFlapAngle;

  if (gurneyFlapMesh) {
    gurneyFlapMesh.position.y = 0.74 - state.gurneyFlapAngle * 0.08;
    gurneyFlapMesh.rotation.x = state.gurneyFlapAngle * 0.35;
  }

  // Recompute streamline trajectories with active upwash
  rebuildAeroStreamlines();

  // Update telemetry display
  updateAeroTelemetryUI();

  // Update preset button active state
  document.querySelectorAll('.aero-preset-btn').forEach((btn) => {
    const fVal = parseFloat(btn.dataset.flap);
    btn.classList.toggle('active', Math.abs(fVal - state.gurneyFlapAngle) < 0.05);
  });
}

function setAeroVisualMode(mode) {
  state.aeroVisualMode = mode;
  document.getElementById('btn-aero-mode-smoke')?.classList.toggle('active', mode === 'smoke');
  document.getElementById('btn-aero-mode-cfd')?.classList.toggle('active', mode === 'cfd');
  if (aeroGuideLinesMesh) {
    aeroGuideLinesMesh.material.opacity = (mode === 'cfd' ? 0.60 : 0.25);
  }
  if (aeroParticlePoints) {
    aeroParticlePoints.material.size = (mode === 'cfd' ? 0.20 : 0.16);
  }
  rebuildAeroStreamlines();
}

function setAeroVectorsVisible(visible) {
  state.aeroVectorsVisible = visible;
  document.getElementById('btn-aero-vectors')?.classList.toggle('active', visible);
  if (aeroVectorsGroup) {
    aeroVectorsGroup.visible = visible && state.currentMode === 'aero';
  }
}

function updateAeroTelemetryUI() {
  const flap = state.gurneyFlapAngle;
  const speed = state.aeroAirspeed || 250;
  const speedFactor = Math.pow(speed / 250, 2);

  const totalDownforce = Math.round((180 + 210 * flap) * speedFactor);
  const frontDownforce = Math.round((70 + 30 * flap) * speedFactor);
  const rearDownforce = totalDownforce - frontDownforce;
  const frontPct = Math.round((frontDownforce / totalDownforce) * 100);
  const rearPct = 100 - frontPct;
  const cd = (0.285 + 0.070 * flap).toFixed(3);
  const ld = (1.45 + 0.65 * flap).toFixed(2);

  const downforceEl = document.getElementById('aero-downforce-val');
  const balanceValEl = document.getElementById('aero-balance-val');
  const balanceKgEl = document.getElementById('aero-balance-kg');
  const cdEl = document.getElementById('aero-cd-val');
  const effEl = document.getElementById('aero-eff-val');
  const modeTagEl = document.getElementById('aero-mode-tag');

  if (downforceEl) downforceEl.textContent = totalDownforce;
  if (balanceValEl) balanceValEl.textContent = `${frontPct} : ${rearPct}`;
  if (balanceKgEl) balanceKgEl.textContent = `${frontDownforce} KG : ${rearDownforce} KG`;
  if (cdEl) cdEl.textContent = cd;
  if (effEl) effEl.textContent = `L/D: ${ld}`;

  if (modeTagEl) {
    if (flap < 0.25) {
      modeTagEl.textContent = 'LOW DRAG (LD)';
      modeTagEl.className = 'aero-tag tag-ld';
    } else if (flap > 0.75) {
      modeTagEl.textContent = 'HIGH DOWNFORCE (HD)';
      modeTagEl.className = 'aero-tag tag-hd';
    } else {
      modeTagEl.textContent = 'BALANCED AERO';
      modeTagEl.className = 'aero-tag tag-balanced';
    }
  }
}

// ==========================================================================
// 8. Official Ferrari High-Poly Model Setup
// ==========================================================================
function setupOfficialFerrariModel(gltfScene) {
  console.log('Integrating Official CAD-Grade Ferrari Model (51-Mesh Masterpiece)...');
  
  while (carGroup.children.length > 0) {
    carGroup.remove(carGroup.children[0]);
  }

  const carModel = gltfScene;

  paintMaterials.length = 0;
  dimmableMaterials.length = 0;
  rimMeshes.length = 0;
  tireMeshes.length = 0;
  caliperMeshes.length = 0;

  // 1. Body Material (High-Gloss Clearcoat Automotive Lacquer)
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(state.paintColor),
    metalness: 0.88,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    ior: 1.5,
    reflectivity: 0.95,
    transparent: true,
    opacity: 1.0
  });
  paintMaterials.push(bodyMaterial);

  // 2. Rims Material (Forged Metallic Alloy)
  const rimMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(state.rimFinish),
    metalness: 0.95,
    roughness: 0.15
  });
  rimMeshes.push(rimMaterial);

  // 3. Automotive Glass
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.02,
    transmission: 0.92,
    ior: 1.52,
    transparent: true,
    opacity: 0.85
  });

  // 4. Carbon Fiber Trim & Aerodynamic Weave
  const carbonMaterial = new THREE.MeshStandardMaterial({
    color: 0x14161a,
    roughness: 0.65,
    metalness: 0.25,
    transparent: true,
    opacity: 1.0
  });
  dimmableMaterials.push(carbonMaterial);

  // 5. Matte Gray Plastic Trim & Honeycomb Grills
  const plasticGrayMaterial = new THREE.MeshStandardMaterial({
    color: 0x16181d,
    roughness: 0.8,
    metalness: 0.1,
    transparent: true,
    opacity: 1.0
  });
  dimmableMaterials.push(plasticGrayMaterial);

  // 6. Polished Mirror Chrome & Prancing Horse Emblems
  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.98,
    roughness: 0.05
  });

  // 7. Drilled Carbon-Ceramic Brake Discs
  const brakeDiscMaterial = new THREE.MeshStandardMaterial({
    color: 0x5a6268,
    metalness: 0.85,
    roughness: 0.35
  });

  // 8. Yellow Brembo Caliper Material
  const caliperMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(state.caliperColor),
    metalness: 0.75,
    roughness: 0.25
  });
  caliperMeshes.push(caliperMaterial);

  // 9. Ferrari Yellow Shield Badges & Wheel Center Caps
  const ferrariYellowBadgeMat = new THREE.MeshStandardMaterial({
    color: 0xf8cc00,
    metalness: 0.5,
    roughness: 0.25
  });

  // 10. Vulcanized Tire Rubber
  const tireRubberMaterial = new THREE.MeshStandardMaterial({
    color: 0x1c1e22,
    roughness: 0.85,
    metalness: 0.1
  });

  // 11. Headlights Glass & Daytime Running LEDs
  const ledLightMaterial = new THREE.MeshBasicMaterial({
    color: 0xf8fafc
  });

  // 12. Taillights Ruby Red
  const taillightRedMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff002b,
    transmission: 0.65,
    roughness: 0.1,
    emissive: 0x770000,
    emissiveIntensity: 0.8
  });

  // 13. Interior Leather & Alcantara
  const leatherMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e2229,
    roughness: 0.75,
    metalness: 0.08
  });
  const interiorDarkMaterial = new THREE.MeshStandardMaterial({
    color: 0x14161a,
    roughness: 0.82,
    metalness: 0.1
  });

  // Traverse and apply materials to official nodes
  carModel.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = true;
    child.receiveShadow = true;

    const name = (child.name || '').toLowerCase();
    const parentName = (child.parent && child.parent.name ? child.parent.name : '').toLowerCase();
    const matName = Array.isArray(child.material) 
      ? child.material.map(m => m.name).join(' ') 
      : (child.material && child.material.name ? child.material.name : '');
    const allNames = `${name} ${parentName} ${matName}`.toLowerCase();

    // 1. Ferrari Yellow Badges & Center Caps (Must check before generic trim)
    if (allNames.includes('yellow') || name.includes('yellow') || name.includes('centre') || parentName.includes('centre')) {
      child.material = ferrariYellowBadgeMat;
    } else if (allNames.includes('body_color') || name === 'body' || parentName === 'body') {
      child.material = bodyMaterial;
    } else if (allNames.includes('glass') && !allNames.includes('taillight')) {
      child.material = glassMaterial;
    } else if (name.includes('rim_') || parentName.includes('rim_')) {
      child.material = rimMaterial;
    } else if (allNames.includes('tire')) {
      child.material = tireRubberMaterial;
    } else if (name === 'brake' || parentName === 'brake') {
      child.material = caliperMaterial;
    } else if (allNames.includes('brakes')) {
      child.material = brakeDiscMaterial;
    } else if (allNames.includes('chrome') || allNames.includes('metal') || allNames.includes('nuts')) {
      child.material = chromeMaterial;
    } else if (allNames.includes('taillight') || allNames.includes('lights_red')) {
      child.material = taillightRedMaterial;
    } else if (allNames.includes('leds') || allNames.includes('lights') || allNames.includes('projector') || allNames.includes('turn_signal')) {
      child.material = ledLightMaterial;
    } else if (allNames.includes('interior_light') || allNames.includes('interior_dark') || allNames.includes('carpet') || allNames.includes('steering_column')) {
      child.material = interiorDarkMaterial;
    } else if (allNames.includes('leather')) {
      child.material = leatherMaterial;
    } else if (allNames.includes('plastic') || allNames.includes('grills') || allNames.includes('wipers') || allNames.includes('wheel')) {
      child.material = plasticGrayMaterial;
    } else if (allNames.includes('carbon') || allNames.includes('dodgerblue') || allNames.includes('blue') || allNames.includes('trim')) {
      child.material = carbonMaterial;
    } else {
      child.material = carbonMaterial;
    }
  });

  // Track wheels for rotation animation during launch
  ['wheel_fl', 'wheel_fr', 'wheel_rl', 'wheel_rr'].forEach((wName) => {
    const w = carModel.getObjectByName(wName);
    if (w) tireMeshes.push(w);
  });

  baseFerrariGltfScene = carModel;
  activeModelParts = createModelAeroAndStyling(currentFerrariModel);
  carModel.add(activeModelParts);

  powertrainGroup = createModelPowertrain(currentFerrariModel);
  carModel.add(powertrainGroup);

  carGroup.add(carModel);
  console.log(`Official Ferrari CAD Model Ready for ${currentFerrariModel.name}!`);

  if (typeof window !== 'undefined' && window.location.search.includes('test=1')) {
    setTimeout(() => {
      try {
        const dataUrl = renderer.domElement.toDataURL('image/png');
        fetch('/api/screenshot', { method: 'POST', body: dataUrl });
      } catch (e) {
        console.error('Screenshot err:', e);
      }
    }, 1200);
  }
}

function setupFerrariProcedural() {
  console.log('Rendering Sculpted Ferrari SF90 Supercar Model...');
  while (carGroup.children.length > 0) {
    carGroup.remove(carGroup.children[0]);
  }
  const procModel = createFerrariSF90Procedural();
  carGroup.add(procModel);
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 450);
  }
}

/**
 * Dynamic Responsive Camera & Viewport Manager
 * Ensures optimal framing for any device aspect ratio (Mobile portrait, landscape, tablet, desktop)
 */
function updateResponsiveCamera() {
  if (!renderer || !camera) return;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspect = width / height;

  camera.aspect = aspect;

  // Adaptive FOV for different screen aspect ratios:
  // Baseline desktop/laptop landscape FOV is 40°.
  // In portrait orientation (phones aspect ~0.45-0.56, tablets aspect ~0.65-0.75),
  // a fixed vertical FOV narrows the horizontal view frustum severely,
  // clipping front/rear bumpers of the vehicle.
  // We dynamically adjust FOV so that the entire Ferrari fits elegantly on all devices.
  if (aspect < 0.6) {
    // Mobile Portrait (e.g. 390x844, 375x667)
    camera.fov = Math.min(74, Math.max(40, 40 / Math.pow(aspect, 0.82)));
  } else if (aspect < 1.0) {
    // Tablet Portrait (e.g. 820x1180)
    camera.fov = Math.min(58, Math.max(40, 40 / Math.pow(aspect, 0.72)));
  } else if (aspect < 1.35) {
    // Compact Landscape / Square (e.g. iPad 4:3 1024x768)
    camera.fov = Math.min(46, Math.max(40, 40 / Math.pow(aspect, 0.45)));
  } else {
    // Standard Desktop & Mobile Landscape (aspect >= 1.35)
    camera.fov = 40;
  }

  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// ==========================================================================
// 9. Scene Initialization, Studio Lighting & Ground
// ==========================================================================
function initScene() {
  const container = document.getElementById('canvas-container');
  const canvas = document.getElementById('webgl-canvas');

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#07090e');
  scene.fog = new THREE.FogExp2('#07090e', 0.045);

  // Camera (Cinematic Front Three-Quarter Hero View)
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.set(4.4, 1.8, -4.6);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  // Apply responsive FOV immediately
  updateResponsiveCamera();

  // -------------------------------------------------------------
  // PBR Studio Environment (Softbox Reflections)
  // -------------------------------------------------------------
  const environment = new RoomEnvironment();
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(environment).texture;

  // OrbitControls
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.02; // Keep camera above floor
  controls.minDistance = 2.2;
  controls.maxDistance = 12.0;
  controls.target.set(0, 0.45, 0.15);

  // -------------------------------------------------------------
  // Studio Lighting (Complementary Automotive Softboxes)
  // -------------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Key Light
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
  keyLight.position.set(4, 7, 3);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 18;
  keyLight.shadow.camera.left = -3.5;
  keyLight.shadow.camera.right = 3.5;
  keyLight.shadow.camera.top = 3.5;
  keyLight.shadow.camera.bottom = -3.5;
  keyLight.shadow.bias = -0.0005;
  scene.add(keyLight);

  // Rim Light (Subtle Cool Softbox)
  const rimLight = new THREE.DirectionalLight(0xe2e8f0, 0.9);
  rimLight.position.set(-5, 4, -4);
  scene.add(rimLight);

  // Fill Light (Warm Studio Ambient Fill)
  const fillLight = new THREE.DirectionalLight(0xfff7ed, 0.65);
  fillLight.position.set(4, 2, -4);
  scene.add(fillLight);

  // -------------------------------------------------------------
  // Ground Shadow Plane & Studio Circular Grid
  // -------------------------------------------------------------
  const floorGeo = new THREE.PlaneGeometry(35, 35);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x06080e,
    roughness: 0.85,
    metalness: 0.2
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Ambient Occlusion Contact Shadow Mesh (Embedded Base64 Texture)
  const shadowTexture = new THREE.TextureLoader().load(FERRARI_AO_BASE64);
  const contactShadowGeo = new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4);
  const contactShadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    blending: THREE.MultiplyBlending,
    toneMapped: false,
    transparent: true,
    opacity: 0.88,
    premultipliedAlpha: true,
    depthWrite: false
  });
  shadowMesh = new THREE.Mesh(contactShadowGeo, contactShadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.set(0, 0.004, 0.17);
  shadowMesh.renderOrder = 2;
  scene.add(shadowMesh);

  // Dynamic Studio Floor Reflection Halo Ring (Tints dynamically to car exterior paint)
  const ringGeo = new THREE.RingGeometry(0.8, 3.6, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(state.paintColor),
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  groundLightRing = new THREE.Mesh(ringGeo, ringMat);
  groundLightRing.rotation.x = -Math.PI / 2;
  groundLightRing.position.set(0, 0.003, 0.15);
  groundLightRing.renderOrder = 1;
  scene.add(groundLightRing);

  // Subtle circular showroom grid
  const gridHelper = new THREE.PolarGridHelper(7, 16, 8, 32, 0x1e293b, 0x0f172a);
  gridHelper.position.y = 0.002;
  scene.add(gridHelper);

  // Root Car Group
  carGroup = new THREE.Group();
  carGroup.name = 'Ferrari_Car_Root';
  scene.add(carGroup);

  // Aerodynamic Streamlines Simulation Group (Smoke & CFD Flow Filaments)
  aeroSimulationGroup = createAeroSimulation();
  aeroSimulationGroup.visible = false;
  scene.add(aeroSimulationGroup);

  // -------------------------------------------------------------
  // 1. Render Sculpted Model Immediately (Zero Waiting Time!)
  // -------------------------------------------------------------
  setupFerrariProcedural();
  hideLoadingScreen();

  // -------------------------------------------------------------
  // 2. Load High-Poly CAD Model with DRACO Decoder in Background
  // -------------------------------------------------------------
  try {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('draco/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    const arrayBuffer = base64ToArrayBuffer(FERRARI_GLB_BASE64);
    gltfLoader.parse(
      arrayBuffer,
      '',
      (gltf) => {
        setupOfficialFerrariModel(gltf.scene);
      },
      (err) => {
        console.warn('GLTF/Draco parsing error:', err);
      }
    );
  } catch (parseErr) {
    console.warn('GLTF loader exception:', parseErr);
  }
}

// ==========================================================================
// 10. GLTF / GLB Loader for User-Uploaded Models
// ==========================================================================
function setupModelImporter() {
  const fileInput = document.getElementById('file-importer');
  if (!fileInput) return;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('draco/');
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    loadExternalModel(url, gltfLoader);
  });

  // Drag & Drop Support
  window.addEventListener('dragover', (e) => e.preventDefault());
  window.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.glb') || file.name.endsWith('.gltf')) {
        const url = URL.createObjectURL(file);
        loadExternalModel(url, gltfLoader);
      }
    }
  });
}

function loadExternalModel(url, loader) {
  const loadingText = document.getElementById('loading-text');
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.display = 'flex';
    loadingScreen.style.opacity = '1';
    if (loadingText) loadingText.textContent = 'Importing Custom AI 3D Model...';
  }

  loader.load(
    url,
    (gltf) => {
      while (carGroup.children.length > 0) {
        carGroup.remove(carGroup.children[0]);
      }
      const newModel = gltf.scene;

      const box = new THREE.Box3().setFromObject(newModel);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scaleFactor = 4.7 / maxDim;
      newModel.scale.setScalar(scaleFactor);

      box.setFromObject(newModel);
      box.getCenter(center);
      newModel.position.x = -center.x;
      newModel.position.y = -box.min.y;
      newModel.position.z = -center.z;

      newModel.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          if (node.material && (node.name.toLowerCase().includes('body') || node.name.toLowerCase().includes('paint'))) {
            paintMaterials.push(node.material);
            node.material.color.set(state.paintColor);
          }
        }
      });

      carGroup.add(newModel);
      state.isCustomModelLoaded = true;

      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.style.display = 'none', 500);
      }
    },
    (xhr) => {
      if (loadingText && xhr.total > 0) {
        const pct = Math.round((xhr.loaded / xhr.total) * 100);
        loadingText.textContent = `Loading: ${pct}%`;
      }
    },
    (err) => {
      console.error('Error loading 3D file:', err);
      alert('Could not parse GLTF/GLB file. Using default Ferrari SF90 model.');
      hideLoadingScreen();
    }
  );
}

// ==========================================================================
// 11. Mode Controllers (Showroom, X-Ray, Aero, Launch)
// ==========================================================================
function switchMode(newMode) {
  state.currentMode = newMode;
  audio.playUiClick(1100);

  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-mode') === newMode);
  });

  const launchShelfGroup = document.getElementById('launch-shelf-group');
  const shelfControls = document.getElementById('shelf-controls');
  const aeroSliderGroup = document.getElementById('aero-slider-group');
  const aeroTelemetryShelf = document.getElementById('aero-telemetry-shelf');
  const colorSwatchGroup = document.getElementById('color-swatch-group');
  const xrayInfoGroup = document.getElementById('xray-info-group');

  if (launchShelfGroup) launchShelfGroup.style.display = newMode === 'launch' ? 'flex' : 'none';
  if (aeroSliderGroup) aeroSliderGroup.style.display = 'none';
  if (aeroTelemetryShelf) aeroTelemetryShelf.style.display = newMode === 'aero' ? 'flex' : 'none';
  if (colorSwatchGroup) colorSwatchGroup.style.display = newMode === 'showroom' ? 'flex' : 'none';
  if (xrayInfoGroup) xrayInfoGroup.style.display = newMode === 'xray' ? 'flex' : 'none';

  // Audio behavior
  if (newMode === 'launch') {
    state.isAudioMuted = false;
    const audioBtn = document.getElementById('btn-audio-toggle');
    if (audioBtn) audioBtn.innerHTML = '🔊';
    audio.init();
    audio.unmute();
    audio.preloadRealAudio();
    audio.updateEngineRPM(0.3);
  } else {
    audio.stopRealLaunch(0.15);
    audio.mute();
  }

  // Visual Shaders / Geometry state
  if (newMode === 'xray') {
    paintMaterials.forEach((mat) => {
      mat.transparent = true;
      mat.opacity = 0.18;
      mat.metalness = 0.05;
      mat.roughness = 0.4;
      mat.clearcoat = 0.0;
      mat.depthWrite = false;
      mat.needsUpdate = true;
    });
    dimmableMaterials.forEach((mat) => {
      mat.transparent = true;
      mat.opacity = 0.18;
      mat.metalness = 0.05;
      mat.depthWrite = false;
      mat.needsUpdate = true;
    });
    if (powertrainGroup) powertrainGroup.visible = true;
    if (aeroSimulationGroup) aeroSimulationGroup.visible = false;
  } else if (newMode === 'aero') {
    paintMaterials.forEach((mat) => {
      mat.transparent = false;
      mat.opacity = 1.0;
      mat.metalness = 0.88;
      mat.roughness = 0.18;
      mat.clearcoat = 1.0;
      mat.depthWrite = true;
      mat.needsUpdate = true;
    });
    dimmableMaterials.forEach((mat) => {
      mat.transparent = false;
      mat.opacity = 1.0;
      mat.metalness = 0.25;
      mat.depthWrite = true;
      mat.needsUpdate = true;
    });
    if (powertrainGroup) powertrainGroup.visible = false;
    if (aeroSimulationGroup) {
      aeroSimulationGroup.visible = true;
      updateAeroTelemetryUI();
      setAeroFlap(state.gurneyFlapAngle);
      if (aeroVectorsGroup) {
        aeroVectorsGroup.visible = state.aeroVectorsVisible;
      }
    }
  } else {
    paintMaterials.forEach((mat) => {
      mat.transparent = false;
      mat.opacity = 1.0;
      mat.metalness = 0.88;
      mat.roughness = 0.18;
      mat.clearcoat = 1.0;
      mat.depthWrite = true;
      mat.needsUpdate = true;
    });
    dimmableMaterials.forEach((mat) => {
      mat.transparent = false;
      mat.opacity = 1.0;
      mat.metalness = 0.25;
      mat.depthWrite = true;
      mat.needsUpdate = true;
    });
    if (powertrainGroup) powertrainGroup.visible = false;
    if (aeroSimulationGroup) aeroSimulationGroup.visible = false;
  }
}

let launchMuteTimer = null;

// 0-60 Launch Simulator Action
function triggerLaunchSimulation() {
  if (state.isLaunching) return;
  state.isLaunching = true;
  state.launchProgress = 0;
  state.launchSpeed = 0;

  if (launchMuteTimer) {
    clearTimeout(launchMuteTimer);
    launchMuteTimer = null;
  }

  // Unmute and activate engine audio for launch
  state.isAudioMuted = false;
  const audioBtn = document.getElementById('btn-audio-toggle');
  if (audioBtn) audioBtn.innerHTML = '🔊';
  audio.init();
  audio.unmute();
  const speedoNum = document.getElementById('speedo-number');
  const speedoKmh = document.getElementById('speedo-kmh');
  const launchTimer = document.getElementById('stat-launch-time');
  const gForceVal = document.getElementById('stat-g-force');
  const launchBtn = document.getElementById('btn-launch-trigger');
  const revLeds = document.querySelectorAll('.rev-led');

  if (launchBtn) {
    launchBtn.disabled = true;
    launchBtn.innerHTML = '<span>⏳</span><span>LAUNCHING...</span>';
  }
  revLeds.forEach((led) => led.classList.remove('active'));

  // 3-2-1 Countdown Audio Beeps (F1 Starting Lights)
  audio.playBeep(440, 0.08);
  setTimeout(() => audio.playBeep(440, 0.08), 500);
  setTimeout(() => audio.playBeep(880, 0.25), 1000);

  const startTime = performance.now();
  const launchDuration = (currentFerrariModel && currentFerrariModel.launch && currentFerrariModel.launch.duration) || 2500;
  const targetTimeSec = (currentFerrariModel && currentFerrariModel.launch && parseFloat(currentFerrariModel.launch.targetTime)) || 2.5;
  const maxG = (currentFerrariModel && currentFerrariModel.launch && currentFerrariModel.launch.maxG) || 1.35;

  // Trigger authentic high-fidelity recorded Ferrari launch audio synchronized with 3-2-1 staging!
  audio.playRealLaunch(currentFerrariModel ? currentFerrariModel.id : 'sf90', launchDuration / 1000);

  function stepLaunch(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / launchDuration, 1.0);

    const curvedT = Math.pow(t, 0.85);
    state.launchSpeed = Math.round(curvedT * 60);

    if (speedoNum) speedoNum.textContent = state.launchSpeed;
    if (speedoKmh) speedoKmh.textContent = `${Math.round(state.launchSpeed * 1.60934)} KM/H`;
    if (launchTimer) launchTimer.textContent = `${(t * targetTimeSec).toFixed(2)}s`;
    if (gForceVal) {
      const g = (maxG - t * 0.25).toFixed(2);
      gForceVal.textContent = `${g} G`;
    }

    // F1 Shift Rev LEDs
    const activeLeds = Math.min(Math.floor(curvedT * 5) + 1, 5);
    revLeds.forEach((led, idx) => {
      led.classList.toggle('active', idx < activeLeds);
    });

    // Engine Audio Pitch Scaling (modulates electric whine if real audio active, or synthesizes engine if fallback)
    audio.updateEngineRPM(0.3 + curvedT * 0.7);

    // Camera Vibration
    if (t < 0.95) {
      camera.position.x += (Math.random() - 0.5) * 0.02;
      camera.position.y += (Math.random() - 0.5) * 0.02;
    }

    // Wheel spin
    tireMeshes.forEach((tire) => {
      tire.rotation.x -= curvedT * 0.5;
    });

    if (t < 1.0) {
      requestAnimationFrame(stepLaunch);
    } else {
      state.isLaunching = false;
      revLeds.forEach((led) => led.classList.add('active'));
      if (launchBtn) {
        launchBtn.disabled = false;
        const targetStr = (currentFerrariModel && currentFerrariModel.launch) ? currentFerrariModel.launch.targetTime : '2.5s';
        launchBtn.innerHTML = `<span>🚀</span><span id="btn-launch-text">RE-LAUNCH (0-60 IN ${targetStr})</span>`;
      }
      launchMuteTimer = setTimeout(() => {
        audio.stopRealLaunch(0.8);
        if (state.currentMode === 'launch' && !state.isAudioMuted) {
          audio.updateEngineRPM(0.3);
        } else {
          audio.mute();
        }
      }, 1200);
    }
  }

  setTimeout(() => requestAnimationFrame(stepLaunch), 1000);
}
window.triggerLaunchSimulation = triggerLaunchSimulation;

// ==========================================================================
// 12. Hotspots Projection & Educational Cards
// ==========================================================================
const hotspotRaycaster = new THREE.Raycaster();
const hotspotDir = new THREE.Vector3();

function updateHotspotsScreenPosition() {
  const container = document.getElementById('canvas-container');
  if (!container || !camera) return;

  const width = container.clientWidth;
  const height = container.clientHeight;
  const tempV = new THREE.Vector3();

  hotspotsData.forEach((hotspot) => {
    const badge = document.getElementById(`hotspot-${hotspot.id}`);
    if (!badge) return;

    if (!state.hotspotsVisible || state.currentMode === 'launch') {
      badge.style.display = 'none';
      return;
    }

    if (state.currentMode === 'aero' && hotspot.system !== 'aero') {
      badge.style.display = 'none';
      return;
    }

    if (state.currentMode === 'xray' && hotspot.system === 'aero') {
      badge.style.display = 'none';
      return;
    }

    // Depth / Occlusion check: hide hotspots on the far side behind the car body in solid modes
    if (state.currentMode !== 'xray' && carGroup && carGroup.children.length > 0) {
      hotspotDir.subVectors(hotspot.coords, camera.position);
      const targetDist = hotspotDir.length();
      hotspotDir.normalize();
      hotspotRaycaster.set(camera.position, hotspotDir);
      const hits = hotspotRaycaster.intersectObjects(carGroup.children, true);
      if (hits.length > 0 && hits[0].distance < targetDist - 0.35) {
        badge.style.display = 'none';
        return;
      }
    }

    tempV.copy(hotspot.coords);
    tempV.project(camera);

    if (tempV.z > 1) {
      badge.style.display = 'none';
      return;
    }

    badge.style.display = 'flex';
    const x = (tempV.x * 0.5 + 0.5) * width;
    const y = (-(tempV.y * 0.5) + 0.5) * height;
    badge.style.left = `${x}px`;
    badge.style.top = `${y}px`;
  });
}

function animateCameraTo(targetCamPos, targetLookAt, duration = 1200) {
  isCameraAnimating = true;
  camStartPos.copy(camera.position);
  camEndPos.copy(targetCamPos);
  camStartTarget.copy(controls.target);
  camEndTarget.copy(targetLookAt);
  camAnimAlpha = 0;

  const startTime = performance.now();

  function tweenCam(now) {
    const elapsed = now - startTime;
    camAnimAlpha = Math.min(elapsed / duration, 1);
    const ease = camAnimAlpha < 0.5
      ? 4 * camAnimAlpha * camAnimAlpha * camAnimAlpha
      : 1 - Math.pow(-2 * camAnimAlpha + 2, 3) / 2;

    camera.position.lerpVectors(camStartPos, camEndPos, ease);
    controls.target.lerpVectors(camStartTarget, camEndTarget, ease);
    controls.update();

    if (camAnimAlpha < 1) {
      requestAnimationFrame(tweenCam);
    } else {
      isCameraAnimating = false;
    }
  }

  requestAnimationFrame(tweenCam);
}

function openHotspotModal(hotspot) {
  state.activeHotspot = hotspot;
  const modal = document.getElementById('detail-modal');
  const title = document.getElementById('modal-title');
  const specsBox = document.getElementById('modal-specs');
  const desc = document.getElementById('modal-desc');
  const descTh = document.getElementById('modal-desc-th');

  if (!modal) return;

  if (title) title.textContent = hotspot.title;
  if (desc) desc.textContent = hotspot.desc;
  if (descTh) descTh.textContent = hotspot.descTh;

  if (specsBox) {
    specsBox.innerHTML = '';
    hotspot.specs.forEach((sp) => {
      const spBadge = document.createElement('span');
      spBadge.className = 'spec-badge';
      spBadge.textContent = sp;
      specsBox.appendChild(spBadge);
    });
  }

  modal.classList.add('active');
  animateCameraTo(hotspot.camPos, hotspot.camTarget, 1000);
}

function closeHotspotModal() {
  state.activeHotspot = null;
  const modal = document.getElementById('detail-modal');
  if (modal) modal.classList.remove('active');
}

// ==========================================================================
// 12.5. Ferrari Bespoke Customizer (Paint, Calipers, Wheels)
// ==========================================================================
function renderCustomizerSwatches() {
  const container = document.getElementById('swatches-container');
  if (!container) return;
  container.innerHTML = '';

  const target = state.customizerTarget || 'paint';
  const palette = FERRARI_PALETTES[target] || FERRARI_PALETTES.paint;
  const currentColor = target === 'paint' ? state.paintColor : (target === 'caliper' ? state.caliperColor : state.rimFinish);

  palette.forEach((item) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    const isActive = item.hex.toLowerCase() === currentColor.toLowerCase();
    btn.className = `swatch-btn ${isActive ? 'active' : ''}`;
    btn.style.background = item.hex;
    btn.title = `${item.name} (${item.hex}) - ${item.desc}`;
    btn.setAttribute('data-color', item.hex);
    btn.setAttribute('data-name', item.name);

    btn.addEventListener('click', () => {
      applyColorToTarget(target, item.hex, item.name);
    });

    container.appendChild(btn);
  });

  // Update Custom Color Input
  const pickerInput = document.getElementById('custom-color-input');
  if (pickerInput && currentColor && currentColor.startsWith('#') && currentColor.length === 7) {
    pickerInput.value = currentColor;
  }

  updateActiveColorBadge(target, currentColor);
}

function applyColorToTarget(target, hex, customName = '') {
  if (target === 'paint') {
    state.paintColor = hex;
    paintMaterials.forEach((mat) => {
      if (mat) mat.color.set(hex);
    });
    if (groundLightRing && groundLightRing.material) {
      groundLightRing.material.color.set(hex);
    }
  } else if (target === 'caliper') {
    state.caliperColor = hex;
    caliperMeshes.forEach((mat) => {
      if (mat) mat.color.set(hex);
    });
  } else if (target === 'rim') {
    state.rimFinish = hex;
    rimMeshes.forEach((mat) => {
      if (mat) mat.color.set(hex);
    });
  }

  audio.playUiClick(1600);

  // Update active state in swatches
  const container = document.getElementById('swatches-container');
  if (container) {
    container.querySelectorAll('.swatch-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-color').toLowerCase() === hex.toLowerCase());
    });
  }

  // Update Color Picker input value
  const pickerInput = document.getElementById('custom-color-input');
  if (pickerInput && hex.startsWith('#') && hex.length === 7) {
    pickerInput.value = hex;
  }

  updateActiveColorBadge(target, hex, customName);
}

function updateActiveColorBadge(target, hex, customName = '') {
  const badge = document.getElementById('active-color-name');
  if (!badge) return;

  const palette = FERRARI_PALETTES[target] || [];
  const found = palette.find((p) => p.hex.toLowerCase() === hex.toLowerCase());
  const displayName = customName || (found ? found.name : `Custom (${hex.toUpperCase()})`);

  let targetPrefix = 'ตัวถัง';
  if (target === 'caliper') targetPrefix = 'คาลิปเปอร์';
  if (target === 'rim') targetPrefix = 'ล้อแม็ก';

  badge.textContent = `${targetPrefix}: ${displayName}`;
}

function setupCustomizerListeners() {
  // Target tabs (Body, Caliper, Rim)
  document.querySelectorAll('.customizer-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.customizer-tab').forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      state.customizerTarget = tab.getAttribute('data-target');
      audio.playUiClick(1500);
      renderCustomizerSwatches();
    });
  });

  // Custom color input (picker) - Live Realtime Input & Change
  const pickerInput = document.getElementById('custom-color-input');
  if (pickerInput) {
    pickerInput.addEventListener('input', (e) => {
      applyColorToTarget(state.customizerTarget, e.target.value);
    });
    pickerInput.addEventListener('change', (e) => {
      applyColorToTarget(state.customizerTarget, e.target.value);
    });
  }

  // Reset Factory Colors Button
  const resetBtn = document.getElementById('btn-reset-color');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.paintColor = '#e61d24';
      state.caliperColor = '#f8cc00';
      state.rimFinish = '#1e293b';

      paintMaterials.forEach((mat) => { if (mat) mat.color.set(state.paintColor); });
      caliperMeshes.forEach((mat) => { if (mat) mat.color.set(state.caliperColor); });
      rimMeshes.forEach((mat) => { if (mat) mat.color.set(state.rimFinish); });
      if (groundLightRing && groundLightRing.material) {
        groundLightRing.material.color.set(state.paintColor);
      }

      audio.playUiClick(900);
      renderCustomizerSwatches();
    });
  }

  // Initial render of swatches
  renderCustomizerSwatches();
}

// ==========================================================================
// 13. Event Listeners & UI Binding
// ==========================================================================
function setupUIEventListeners() {
  // Mode Selector Buttons
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      switchMode(mode);
    });
  });

  // Ferrari Bespoke Customizer Listeners (Paint, Calipers, Wheels)
  setupCustomizerListeners();

  // Camera Presets
  const cameraPresets = {
    iso: { pos: new THREE.Vector3(4.4, 1.8, -4.6), target: new THREE.Vector3(0, 0.45, 0.15) },
    hero: { pos: new THREE.Vector3(4.4, 1.8, -4.6), target: new THREE.Vector3(0, 0.45, 0.15) },
    front: { pos: new THREE.Vector3(0, 1.1, -4.8), target: new THREE.Vector3(0, 0.45, -0.2) },
    side: { pos: new THREE.Vector3(4.8, 0.85, 0.15), target: new THREE.Vector3(0, 0.5, 0.15) },
    rear: { pos: new THREE.Vector3(0, 1.2, 4.8), target: new THREE.Vector3(0, 0.55, 0.3) },
    top: { pos: new THREE.Vector3(0, 7.5, 0.2), target: new THREE.Vector3(0, 0, 0.2) }
  };

  document.querySelectorAll('.cam-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cam-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const presetName = btn.getAttribute('data-cam');
      if (cameraPresets[presetName]) {
        animateCameraTo(cameraPresets[presetName].pos, cameraPresets[presetName].target);
      }
    });
  });

  // Hotspots Toggle Button
  const hotspotsBtn = document.getElementById('btn-hotspots-toggle');
  if (hotspotsBtn) {
    hotspotsBtn.addEventListener('click', () => {
      state.hotspotsVisible = !state.hotspotsVisible;
      hotspotsBtn.classList.toggle('active', state.hotspotsVisible);
      if (!state.hotspotsVisible) {
        hotspotsData.forEach((h) => {
          const badge = document.getElementById(`hotspot-${h.id}`);
          if (badge) badge.style.display = 'none';
        });
      }
    });
  }

  // Shut-Off Gurney Flap Slider & Presets
  const flapSlider = document.getElementById('flap-slider');
  if (flapSlider) {
    flapSlider.addEventListener('input', (e) => {
      setAeroFlap(parseFloat(e.target.value));
    });
  }

  document.querySelectorAll('.aero-preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const flapVal = parseFloat(btn.getAttribute('data-flap'));
      setAeroFlap(flapVal);
    });
  });

  // Flow Visualization Toggles (Smoke Rake vs CFD Velocity Colormap)
  const btnSmoke = document.getElementById('btn-aero-mode-smoke');
  if (btnSmoke) {
    btnSmoke.addEventListener('click', () => setAeroVisualMode('smoke'));
  }
  const btnCfd = document.getElementById('btn-aero-mode-cfd');
  if (btnCfd) {
    btnCfd.addEventListener('click', () => setAeroVisualMode('cfd'));
  }

  // 3D Downforce Load Force Vectors Toggle
  const btnVectors = document.getElementById('btn-aero-vectors');
  if (btnVectors) {
    btnVectors.addEventListener('click', () => {
      setAeroVectorsVisible(!state.aeroVectorsVisible);
    });
  }

  // Launch Button
  const launchBtn = document.getElementById('btn-launch-trigger');
  if (launchBtn) {
    launchBtn.addEventListener('click', triggerLaunchSimulation);
  }

  // Audio Toggle
  const audioBtn = document.getElementById('btn-audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      state.isAudioMuted = !state.isAudioMuted;
      audioBtn.innerHTML = state.isAudioMuted ? '🔇' : '🔊';
      if (!state.isAudioMuted) {
        audio.init();
        audio.unmute();
        audio.preloadRealAudio();
        if (state.currentMode === 'launch') audio.updateEngineRPM(0.3);
      } else {
        audio.mute();
      }
    });
  }

  // Auto-Rotate Toggle
  const rotateBtn = document.getElementById('btn-rotate-toggle');
  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      state.isAutoRotate = !state.isAutoRotate;
      controls.autoRotate = state.isAutoRotate;
      controls.autoRotateSpeed = 1.4;
      rotateBtn.classList.toggle('active', state.isAutoRotate);
    });
  }

  // Modal Close
  const closeBtn = document.getElementById('modal-close-btn');
  const backdrop = document.getElementById('detail-modal');
  if (closeBtn) closeBtn.addEventListener('click', closeHotspotModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeHotspotModal();
    });
  }

  // Setup Hotspots Clicking
  hotspotsData.forEach((hotspot) => {
    const badge = document.getElementById(`hotspot-${hotspot.id}`);
    if (badge) {
      badge.addEventListener('click', () => openHotspotModal(hotspot));
    }
  });

  // Window Resize & Orientation Change
  window.addEventListener('resize', updateResponsiveCamera);
  window.addEventListener('orientationchange', () => {
    setTimeout(updateResponsiveCamera, 120);
  });

  // Battery & GPU saving when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      audio.mute();
    }
  });
}

// ==========================================================================
// 14. Dynamic Model Switching & Hotspots Rendering (10 Ferrari Models)
// ==========================================================================
function renderHotspotsForModel(model) {
  const container = document.getElementById('hotspots-container');
  if (!container) return;
  container.innerHTML = '';

  hotspotsData = model.hotspots || [];

  hotspotsData.forEach((hotspot) => {
    const badge = document.createElement('div');
    badge.id = `hotspot-${hotspot.id}`;
    badge.className = 'hotspot-badge';
    badge.setAttribute('data-system', hotspot.system);
    badge.innerHTML = `
      <span class="hotspot-dot"></span>
      <span>${hotspot.titleTh || hotspot.title}</span>
    `;
    badge.addEventListener('click', () => openHotspotModal(hotspot));
    container.appendChild(badge);
  });
}

function switchFerrariModel(modelId) {
  const model = getFerrariModelById(modelId);
  if (!model) return;
  state.currentModelId = model.id;
  currentFerrariModel = model;

  // If a launch was running, cleanly cancel previous launch audio & state
  if (launchMuteTimer) {
    clearTimeout(launchMuteTimer);
    launchMuteTimer = null;
  }
  if (state.isLaunching) {
    state.isLaunching = false;
    state.launchProgress = 0;
    state.launchSpeed = 0;
    audio.stopRealLaunch(0.05);
    const launchBtn = document.getElementById('btn-launch-trigger');
    if (launchBtn) launchBtn.disabled = false;
  }

  // Dynamic Browser Tab Title Reflecting Selected Ferrari Model
  document.title = `${model.name} (${model.year}) | Ferrari 10 Iconic Models 3D Showcase - ดร.อภิสิทธิ์ ธงไชย`;

  audio.playUiClick(1200);
  console.log(`Switching Ferrari Model to: ${model.name} (${model.year})...`);

  // 1. Swap 3D Model Specific Parts & Powertrain
  const targetParent = baseFerrariGltfScene || (carGroup && carGroup.children[0]) || carGroup;
  if (targetParent) {
    if (activeModelParts) {
      targetParent.remove(activeModelParts);
      activeModelParts.traverse((c) => {
        if (c.geometry) c.geometry.dispose();
      });
      activeModelParts = null;
    }
    if (powertrainGroup) {
      targetParent.remove(powertrainGroup);
      powertrainGroup.traverse((c) => {
        if (c.geometry) c.geometry.dispose();
      });
      powertrainGroup = null;
    }

    activeModelParts = createModelAeroAndStyling(model);
    targetParent.add(activeModelParts);

    powertrainGroup = createModelPowertrain(model);
    targetParent.add(powertrainGroup);

    // Apply current bespoke customization (paint, calipers, rims) to the newly active model
    paintMaterials.forEach((mat) => {
      if (mat) mat.color.set(state.paintColor);
    });
    caliperMeshes.forEach((mat) => {
      if (mat) mat.color.set(state.caliperColor);
    });
    rimMeshes.forEach((mat) => {
      if (mat) mat.color.set(state.rimFinish);
    });
    renderCustomizerSwatches();
  }

  // 2. Update Header Title & Specs Ribbon
  const badgeEl = document.getElementById('header-car-badge');
  const yearEl = document.getElementById('header-car-year');
  const titleEl = document.getElementById('header-car-title');
  if (badgeEl) {
    badgeEl.textContent = model.badge;
    badgeEl.style.background = model.badgeColor || 'var(--ferrari-red)';
    badgeEl.style.color = model.badgeColor === '#f8cc00' ? '#000' : '#fff';
  }
  if (yearEl) yearEl.textContent = model.year;
  if (titleEl) titleEl.innerHTML = model.titleHtml;

  // Specs Ribbon
  const hpValEl = document.getElementById('spec-hp-val');
  const hpLblEl = document.getElementById('spec-hp-lbl');
  const engValEl = document.getElementById('spec-engine-val');
  const engLblEl = document.getElementById('spec-engine-lbl');
  const motValEl = document.getElementById('spec-motors-val');
  const motLblEl = document.getElementById('spec-motors-lbl');
  const accValEl = document.getElementById('spec-accel-val');
  const accLblEl = document.getElementById('spec-accel-lbl');
  const spdValEl = document.getElementById('spec-speed-val');
  const spdLblEl = document.getElementById('spec-speed-lbl');

  if (hpValEl && model.specs.hp) hpValEl.textContent = model.specs.hp;
  if (hpLblEl && model.specs.hpSub) hpLblEl.textContent = model.specs.hpSub;
  if (engValEl && model.specs.engine) engValEl.textContent = model.specs.engine;
  if (engLblEl && model.specs.engineSub) engLblEl.textContent = model.specs.engineSub;
  if (motValEl && model.specs.motors) motValEl.textContent = model.specs.motors;
  if (motLblEl && model.specs.motorsSub) motLblEl.textContent = model.specs.motorsSub;
  if (accValEl && model.specs.accel) accValEl.textContent = model.specs.accel;
  if (accLblEl && model.specs.accelSub) accLblEl.textContent = model.specs.accelSub;
  if (spdValEl && model.specs.speed) spdValEl.textContent = model.specs.speed;
  if (spdLblEl && model.specs.speedSub) spdLblEl.textContent = model.specs.speedSub;

  // X-Ray Pill & Button Label
  const xrayGroup = document.getElementById('xray-info-group');
  if (xrayGroup && model.xrayPill && model.xrayPill.html) {
    xrayGroup.innerHTML = model.xrayPill.html;
  }
  const xrayBtnText = document.getElementById('btn-mode-xray-text');
  if (xrayBtnText && model.xrayLabel) {
    xrayBtnText.textContent = model.xrayLabel;
  }

  // Launch Button & Telemetry
  const launchBtnText = document.getElementById('btn-launch-text');
  if (launchBtnText) {
    launchBtnText.textContent = `LAUNCH (0-60 IN ${model.launch.targetTime})`;
  }
  const tractionVal = document.getElementById('stat-traction-val');
  if (tractionVal) {
    tractionVal.textContent = model.launch.drivetrain;
  }
  const soundLabelEl = document.getElementById('shelf-sound-label');
  if (soundLabelEl) {
    soundLabelEl.textContent = (model.sound && model.sound.label) ? model.sound.label : 'AUTHENTIC EXHAUST AUDIO';
  }

  // Aero Telemetry Shelf
  const aeroDeviceName = document.getElementById('aero-device-name');
  if (aeroDeviceName && model.aero.device) {
    aeroDeviceName.textContent = `${model.aero.device}:`;
  }
  const downforceValEl = document.getElementById('aero-downforce-val');
  if (downforceValEl && model.specs.downforce) {
    downforceValEl.textContent = parseInt(model.specs.downforce) || 390;
  }

  // 4. Update Hotspots
  renderHotspotsForModel(model);

  // 5. Update Active Card in Modal
  document.querySelectorAll('.model-card').forEach((card) => {
    const isActive = card.getAttribute('data-model-id') === model.id;
    card.classList.toggle('active', isActive);
    const btn = card.querySelector('.model-card-btn');
    if (btn) {
      btn.textContent = isActive ? 'กำลังแสดงผล (Current Model)' : 'เลือกรุ่นนี้ (Select Model)';
    }
    let activeTag = card.querySelector('.model-card-active-tag');
    if (isActive) {
      if (!activeTag) {
        activeTag = document.createElement('span');
        activeTag.className = 'model-card-active-tag';
        activeTag.textContent = '✓';
        card.appendChild(activeTag);
      }
    } else if (activeTag) {
      activeTag.remove();
    }
  });

  // Re-apply current mode shaders/visibilities
  switchMode(state.currentMode);
}
window.switchFerrariModel = switchFerrariModel;

function initModelSelectorModal() {
  const grid = document.getElementById('model-grid-container');
  const modal = document.getElementById('model-selector-modal');
  const btnTrigger = document.getElementById('btn-model-picker');
  const btnClose = document.getElementById('btn-close-model-modal');
  const btnPrev = document.getElementById('btn-prev-model');
  const btnNext = document.getElementById('btn-next-model');

  if (!grid) return;
  grid.innerHTML = '';

  FERRARI_CATALOG.forEach((m) => {
    const card = document.createElement('article');
    card.className = `model-card ${m.id === state.currentModelId ? 'active' : ''}`;
    card.setAttribute('data-model-id', m.id);

    card.innerHTML = `
      <div class="model-card-top">
        <span class="model-card-year">${m.year}</span>
        <span class="model-card-badge" style="border-color:${m.badgeColor || '#e61d24'}; color:${m.badgeColor || '#e61d24'}; background:${m.badgeColor || '#e61d24'}1a;">
          ${m.badge}
        </span>
      </div>
      <div>
        <h3 class="model-card-title">${m.name}</h3>
        <p class="model-card-category">${m.category}</p>
      </div>
      <div class="model-card-specs">
        <div class="model-mini-spec">
          <span class="model-mini-val" style="color:#ff2800;">${m.specs.hp}</span>
          <span class="model-mini-lbl">Power</span>
        </div>
        <div class="model-mini-spec">
          <span class="model-mini-val" style="color:#f8cc00;">${m.specs.accel}</span>
          <span class="model-mini-lbl">0-60</span>
        </div>
        <div class="model-mini-spec">
          <span class="model-mini-val">${m.specs.speed}</span>
          <span class="model-mini-lbl">Top Speed</span>
        </div>
      </div>
      <button type="button" class="model-card-btn">
        ${m.id === state.currentModelId ? 'กำลังแสดงผล (Current Model)' : 'เลือกรุ่นนี้ (Select Model)'}
      </button>
      ${m.id === state.currentModelId ? '<span class="model-card-active-tag">✓</span>' : ''}
    `;

    card.addEventListener('click', () => {
      switchFerrariModel(m.id);
      if (modal) modal.style.display = 'none';
    });

    grid.appendChild(card);
  });

  // Category Filter Tabs
  const CATEGORY_MAP = {
    halo: ['sf90', 'laferrari', 'enzo'],
    turbo: ['f40', 'pista', 'roma'],
    na: ['testarossa', 'f458', 'gto250', 'superfast812']
  };

  const filterTabs = document.querySelectorAll('.model-filter-tab');
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const filter = tab.getAttribute('data-filter');
      audio.playUiClick(1300);

      document.querySelectorAll('.model-card').forEach((card) => {
        const id = card.getAttribute('data-model-id');
        if (filter === 'all' || (CATEGORY_MAP[filter] && CATEGORY_MAP[filter].includes(id))) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal open / close handlers
  if (btnTrigger) {
    btnTrigger.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'flex';
        audio.playUiClick(1400);
      }
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
        audio.playUiClick(1000);
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        audio.playUiClick(1000);
      }
    });
  }

  // 1-Click Quick Cycle Prev & Next Buttons
  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      const currIdx = FERRARI_CATALOG.findIndex((m) => m.id === state.currentModelId);
      const prevIdx = (currIdx - 1 + FERRARI_CATALOG.length) % FERRARI_CATALOG.length;
      switchFerrariModel(FERRARI_CATALOG[prevIdx].id);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      const currIdx = FERRARI_CATALOG.findIndex((m) => m.id === state.currentModelId);
      const nextIdx = (currIdx + 1) % FERRARI_CATALOG.length;
      switchFerrariModel(FERRARI_CATALOG[nextIdx].id);
    });
  }
}

// ==========================================================================
// 14.5. Keyboard Shortcuts & Interactive Help Modal
// ==========================================================================
function initKeyboardShortcutsAndHelp() {
  const helpModal = document.getElementById('help-modal');
  const btnHelp = document.getElementById('btn-help-modal');
  const btnCloseHelp = document.getElementById('btn-close-help-modal');

  function openHelp() {
    if (helpModal) {
      helpModal.style.display = 'flex';
      audio.playUiClick(1500);
    }
  }

  function closeHelp() {
    if (helpModal) {
      helpModal.style.display = 'none';
      audio.playUiClick(1000);
    }
  }

  if (btnHelp) btnHelp.addEventListener('click', openHelp);
  if (btnCloseHelp) btnCloseHelp.addEventListener('click', closeHelp);
  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) closeHelp();
    });
  }

  // Global Keyboard Shortcuts Listener
  window.addEventListener('keydown', (e) => {
    // Ignore keystrokes inside input fields (e.g., color picker or text boxes)
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
      return;
    }

    // Escape: Dismiss all active modals
    if (e.key === 'Escape') {
      const detailModal = document.getElementById('detail-modal');
      const modelModal = document.getElementById('model-selector-modal');
      if (detailModal && detailModal.classList.contains('active')) {
        closeHotspotModal();
      }
      if (modelModal && modelModal.style.display === 'flex') {
        modelModal.style.display = 'none';
      }
      if (helpModal && helpModal.style.display === 'flex') {
        closeHelp();
      }
      return;
    }

    // 1 - 4: Switch Showcase Modes
    if (e.key === '1') {
      switchMode('showroom');
      return;
    }
    if (e.key === '2') {
      switchMode('xray');
      return;
    }
    if (e.key === '3') {
      switchMode('aero');
      return;
    }
    if (e.key === '4') {
      switchMode('launch');
      return;
    }

    // Space: Launch 0-60 simulation immediately
    if (e.code === 'Space') {
      e.preventDefault();
      if (state.currentMode !== 'launch') {
        switchMode('launch');
      }
      triggerLaunchSimulation();
      return;
    }

    // Cycle Next / Prev Ferrari Model: [ / ] or Left / Right Arrows
    if (e.key === '[' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const currIdx = FERRARI_CATALOG.findIndex((m) => m.id === state.currentModelId);
      const prevIdx = (currIdx - 1 + FERRARI_CATALOG.length) % FERRARI_CATALOG.length;
      switchFerrariModel(FERRARI_CATALOG[prevIdx].id);
      return;
    }
    if (e.key === ']' || e.key === 'ArrowRight') {
      e.preventDefault();
      const currIdx = FERRARI_CATALOG.findIndex((m) => m.id === state.currentModelId);
      const nextIdx = (currIdx + 1) % FERRARI_CATALOG.length;
      switchFerrariModel(FERRARI_CATALOG[nextIdx].id);
      return;
    }

    // M: Toggle Engine Sound
    if (e.key.toLowerCase() === 'm') {
      const audioBtn = document.getElementById('btn-audio-toggle');
      if (audioBtn) audioBtn.click();
      return;
    }

    // R: Toggle Auto-Rotate 360°
    if (e.key.toLowerCase() === 'r') {
      const rotateBtn = document.getElementById('btn-rotate-toggle');
      if (rotateBtn) rotateBtn.click();
      return;
    }

    // H: Toggle Engineering Hotspot Labels
    if (e.key.toLowerCase() === 'h') {
      const hotspotsBtn = document.getElementById('btn-hotspots-toggle');
      if (hotspotsBtn) hotspotsBtn.click();
      return;
    }

    // ? or /: Toggle Help & Shortcuts Modal
    if (e.key === '?' || (e.key === '/' && !e.shiftKey)) {
      e.preventDefault();
      if (helpModal && helpModal.style.display === 'flex') {
        closeHelp();
      } else {
        openHelp();
      }
      return;
    }
  });
}

// ==========================================================================
// 15. Main Animation & Render Loop
// ==========================================================================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  if (document.hidden) return;

  const delta = clock.getDelta();

  if (!isCameraAnimating) {
    controls.update();
  }

  // Update wind tunnel particles if active
  if (state.currentMode === 'aero' || state.isLaunching) {
    updateAeroParticles(delta);
  }

  // Project 3D Hotspots to screen space
  updateHotspotsScreenPosition();

  renderer.render(scene, camera);
}

// ==========================================================================
// 16. Application Bootstrap
// ==========================================================================
function startApp() {
  try {
    console.log('Initializing Ferrari 10 Iconic Models 3D Showcase...');
    initScene();
    initModelSelectorModal();
    initKeyboardShortcutsAndHelp();
    renderHotspotsForModel(currentFerrariModel);
    setupModelImporter();
    setupUIEventListeners();
    animate();

    // First user gesture unlocks audio & decodes authentic Ferrari sound buffers
    const unlockAudio = () => {
      audio.init();
      audio.preloadRealAudio();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    // Preload audio files in background
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => audio.preloadRealAudio());
    } else {
      setTimeout(() => audio.preloadRealAudio(), 800);
    }

    console.log('Ferrari 3D Showcase running successfully!');
  } catch (err) {
    console.error('Fatal error starting 3D Showcase:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
