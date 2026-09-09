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

// ==========================================================================
// 1. Application State & Engineering Hotspots Data
// ==========================================================================
const state = {
  currentMode: 'showroom', // 'showroom' | 'xray' | 'aero' | 'launch'
  paintColor: '#e61d24',   // Default Rosso Corsa
  caliperColor: '#f8cc00', // Default Giallo Modena
  rimFinish: '#1e293b',    // Titanium Dark
  gurneyFlapAngle: 0.5,    // 0 = low-drag, 1 = high downforce
  isAudioMuted: true,
  isAutoRotate: false,
  isLaunching: false,
  launchSpeed: 0,
  launchProgress: 0,
  activeHotspot: null,
  isCustomModelLoaded: false,
  hotspotsVisible: true
};

// STEM & Engineering Hotspots
const hotspotsData = [
  {
    id: 'v8-engine',
    system: 'engine',
    title: '4.0L Twin-Turbo V8 Engine (F154 FA)',
    titleTh: 'เครื่องยนต์ 4.0 ลิตร Twin-Turbo V8 (F154 FA)',
    coords: new THREE.Vector3(0, 0.65, 0.55),
    camPos: new THREE.Vector3(1.6, 1.8, 1.6),
    camTarget: new THREE.Vector3(0, 0.65, 0.55),
    specs: ['769 HP @ 7,500 rpm', '800 Nm Torque @ 6,000 rpm', '350-bar Direct Injection', 'Flat-Plane Crankshaft'],
    desc: 'The internal combustion core is Ferrari’s most powerful V8 ever produced. Featuring redesigned intake and exhaust ducts, a flat-plane crankshaft, and 350-bar direct fuel injection. The turbos are mounted centrally between the cylinder banks ("hot-V") for near-zero turbo lag and rapid throttle response.',
    descTh: 'หัวใจสันดาปภายในที่เป็นเครื่องยนต์ V8 ที่ทรงพลังที่สุดในประวัติศาสตร์ของ Ferrari พัฒนาท่อไอดีและไอเสียใหม่ ข้อเหวี่ยงแบบ Flat-Plane และระบบฉีดตรงแรงดันสูง 350 บาร์ วางเทอร์โบแบบ Hot-V เพื่อการตอบสนองที่รวดเร็วไร้ Turbo Lag'
  },
  {
    id: 'front-motors',
    system: 'motors',
    title: 'RAC-e Dual Front Electric Motors',
    titleTh: 'มอเตอร์ไฟฟ้าคู่หน้า RAC-e (ระบบกระจายแรงบิดอิสระ)',
    coords: new THREE.Vector3(0, 0.38, -1.25),
    camPos: new THREE.Vector3(1.8, 1.1, -2.2),
    camTarget: new THREE.Vector3(0, 0.38, -1.25),
    specs: ['2x Independent Motors', '133 HP combined', 'Full Torque Vectoring', 'Reverse & EV Mode (eDrive)'],
    desc: 'The front axle hosts two independent electric motors known as RAC-e (Regolatore Assetto Curva Elettrico). They provide AWD traction, torque vectoring during cornering by varying wheel speeds, and power the car completely in pure electric eDrive mode for up to 25 km (15.5 miles). They also handle reverse gear!',
    descTh: 'เพลาหน้าติดตั้งมอเตอร์ไฟฟ้าอิสระ 2 ตัว (RAC-e) ช่วยสร้างระบบขับเคลื่อน 4 ล้อ (AWD) และกระจายแรงบิดขณะเข้าโค้งได้อย่างแม่นยำ นอกจากนี้ยังทำหน้าที่ขับเคลื่อนในโหมดไฟฟ้าล้วนได้ไกล 25 กม. และทำหน้าที่ถอยหลังโดยไม่ต้องใช้เกียร์ถอยหลังกลไก'
  },
  {
    id: 'rear-mguk',
    system: 'motors',
    title: 'Rear MGUK Electric Motor & 8-Speed DCT',
    titleTh: 'มอเตอร์ไฟฟ้าด้านหลัง MGUK & เกียร์ 8 สปีดคลัตช์คู่',
    coords: new THREE.Vector3(0, 0.42, 1.25),
    camPos: new THREE.Vector3(-1.8, 1.2, 2.2),
    camTarget: new THREE.Vector3(0, 0.42, 1.25),
    specs: ['F1-derived MGUK', '84 HP', '8-speed Dual-Clutch Transmission', 'Kinetic Energy Recovery'],
    desc: 'Sandwiched between the V8 engine and the ultra-compact 8-speed dual-clutch transmission sits the MGUK (Motor Generator Unit, Kinetic). Derived from Ferrari’s Formula 1 racing technology, it recovers braking energy, assists during gear shifts, and adds instant low-end electric boost.',
    descTh: 'มอเตอร์ไฟฟ้าตัวที่สามถ่ายทอดเทคโนโลยีโดยตรงจากรถแข่ง Formula 1 (MGUK) ติดตั้งคั่นกลางระหว่างเครื่องยนต์ V8 และชุดเกียร์ 8 สปีด ช่วยชาร์จพลังงานกลับขณะเบรก ช่วยให้การเปลี่ยนเกียร์ราบรื่นและเพิ่มอัตราเร่งฉับพลัน'
  },
  {
    id: 'battery-pack',
    system: 'engine',
    title: '7.9 kWh Lithium-Ion High-Voltage Battery',
    titleTh: 'แบตเตอรี่ลิเธียมไอออนแรงดันสูง 7.9 kWh',
    coords: new THREE.Vector3(0, 0.28, -0.15),
    camPos: new THREE.Vector3(0, 2.8, -0.15),
    camTarget: new THREE.Vector3(0, 0.28, -0.15),
    specs: ['7.9 kWh Capacity', '350V Architecture', 'Low Center of Gravity', 'PHEV External Plug-in Port'],
    desc: 'Mounted low beneath the floor just behind the cockpit seats, the compact 7.9 kWh battery balances the vehicle’s weight distribution. It can be charged via an external plug or in Charge mode directly from the V8 engine while driving.',
    descTh: 'ติดตั้งใต้ท้องรถด้านหลังเบาะนั่งห้องโดยสาร เพื่อให้จุดศูนย์ถ่วงต่ำที่สุดเท่าที่จะเป็นไปได้ แบตเตอรี่ขนาด 7.9 kWh รองรับการเสียบปลั๊กชาร์จไฟจากภายนอก (PHEV) หรือชาร์จด้วยเครื่องยนต์ V8 ขณะขับขี่'
  },
  {
    id: 'chassis-bulkhead',
    system: 'chassis',
    title: 'Hollow Aluminum Chassis & Carbon Bulkhead',
    titleTh: 'แชสซีอะลูมิเนียมหล่อกลวง & ผนังคาร์บอนไฟเบอร์',
    coords: new THREE.Vector3(0.5, 0.65, 0.05),
    camPos: new THREE.Vector3(2.2, 1.5, 0.2),
    camTarget: new THREE.Vector3(0, 0.6, 0.05),
    specs: ['Hollow Aluminum Castings', 'Carbon-Fiber Rear Bulkhead', '+20% Bending Stiffness', '+40% Torsional Rigidity'],
    desc: 'To offset the hybrid battery and motors weight, Ferrari engineered an all-new multi-material chassis. It uses hollow aluminum extrusion castings for optimal strength-to-weight ratio and an ultra-stiff carbon-fiber bulkhead behind the cabin that shields the driver and eliminates cabin vibration.',
    descTh: 'เพื่อชดเชยน้ำหนักของแบตเตอรี่และมอเตอร์ไฟฟ้า จึงออกแบบแชสซีผสมผสานด้วยอะลูมิเนียมหล่อกลวง และผนังกั้นห้องโดยสารด้านหลังที่ทำจากคาร์บอนไฟเบอร์ เพิ่มความแข็งแกร่งต้านแรงบิดขึ้น 40% และป้องกันเสียงรบกวน'
  },
  {
    id: 'active-aero',
    system: 'aero',
    title: 'Patented Shut-off Gurney Flap',
    titleTh: 'สปอยเลอร์แอโรไดนามิกแบบ Shut-off Gurney (สิทธิบัตร Ferrari)',
    coords: new THREE.Vector3(0, 0.78, 1.88),
    camPos: new THREE.Vector3(0, 1.4, 3.2),
    camTarget: new THREE.Vector3(0, 0.75, 1.85),
    specs: ['390 kg Downforce @ 250 km/h', 'Active Wedge Retraction', 'Low Drag / High Downforce', 'Integrated Rear Brake Light'],
    desc: 'At high speeds in a straight line (Low Drag mode), the mobile wedge flap stays flush with the body to achieve the 211 mph top speed. When braking or cornering (High Downforce mode), an electric actuator lowers the center wedge, exposing the air scoop and generating 390 kg of stabilizing downforce at 155 mph (250 km/h).',
    descTh: 'ระบบแอโรไดนามิกแอคทีฟด้านหลัง ในทางตรง flap จะยกเรียบสนิทเพื่อลดแรงต้านอากาศจนแตะ 340 กม./ชม. (211 mph) แต่เมื่อเบรกหรือเข้าโค้ง ลิ้นตรงกลางจะหักตัวลงเพื่อเบี่ยงลมขึ้นสร้างแรงกด Downforce สูงถึง 390 กก. ช่วยให้เกาะถนนอย่างมั่นคง'
  }
];

// ==========================================================================
// 2. Three.js Scene Setup & Variables
// ==========================================================================
let scene, camera, renderer, controls;
let carGroup, bodyMeshGroup, powertrainGroup, aeroGroup, wheelsGroup;
let gurneyFlapMesh = null;
let particleAeroSystem = null;
const tireMeshes = [];
const rimMeshes = [];
const caliperMeshes = [];
const paintMaterials = [];
let shadowMesh = null;

// Camera Tween State
let isCameraAnimating = false;
let camStartPos = new THREE.Vector3();
let camEndPos = new THREE.Vector3();
let camStartTarget = new THREE.Vector3();
let camEndTarget = new THREE.Vector3();
let camAnimAlpha = 0;

// ==========================================================================
// 3. Web Audio API Synthesizer
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
  }

  init() {
    if (this.isInitialized) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

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
    this.engineGain.connect(this.ctx.destination);

    this.osc1.start();
    this.osc2.start();

    this.electricGain = this.ctx.createGain();
    this.electricGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.electricOsc = this.ctx.createOscillator();
    this.electricOsc.type = 'sine';
    this.electricOsc.frequency.setValueAtTime(1400, this.ctx.currentTime);

    this.electricOsc.connect(this.electricGain);
    this.electricGain.connect(this.ctx.destination);
    this.electricOsc.start();

    this.isInitialized = true;
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
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  updateEngineRPM(rpmFactor) {
    if (!this.isInitialized || state.isAudioMuted) {
      if (this.engineGain) this.engineGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      if (this.electricGain) this.electricGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      return;
    }
    const baseFreq = 45 + rpmFactor * 140;
    this.osc1.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.05);
    this.osc2.frequency.setTargetAtTime(baseFreq * 1.5, this.ctx.currentTime, 0.05);
    this.electricOsc.frequency.setTargetAtTime(1200 + rpmFactor * 2600, this.ctx.currentTime, 0.05);

    const targetVolume = 0.15 + rpmFactor * 0.25;
    this.engineGain.gain.setTargetAtTime(targetVolume, this.ctx.currentTime, 0.05);
    this.electricGain.gain.setTargetAtTime(0.08 + rpmFactor * 0.12, this.ctx.currentTime, 0.05);
  }

  mute() {
    if (this.engineGain) this.engineGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.02);
    if (this.electricGain) this.electricGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.02);
  }
}

const audio = new AudioSynthesizer();

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
// 4. Internal PHEV Powertrain Components (Engine, Motors, Battery)
// ==========================================================================
function createPHEVPowertrain() {
  const ptGroup = new THREE.Group();
  ptGroup.name = 'PHEV_Powertrain_Group';
  ptGroup.visible = false; // Only visible in X-Ray & Aero modes

  // 1. Mid-Rear 4.0L Twin-Turbo V8 Engine Block (F154 FA)
  const v8BlockGeo = new THREE.BoxGeometry(0.68, 0.36, 0.72);
  const v8BlockMat = new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    metalness: 0.88,
    roughness: 0.25,
    emissive: 0x660000,
    emissiveIntensity: 0.25
  });
  const v8Mesh = new THREE.Mesh(v8BlockGeo, v8BlockMat);
  v8Mesh.position.set(0, 0.44, 0.55);
  v8Mesh.name = 'Engine_V8';
  ptGroup.add(v8Mesh);

  // Twin Turbochargers
  const turboMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 });
  const turboGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.16, 16);
  turboGeo.rotateZ(Math.PI / 2);
  const turboL = new THREE.Mesh(turboGeo, turboMat);
  turboL.position.set(-0.35, 0.52, 0.55);
  const turboR = new THREE.Mesh(turboGeo, turboMat);
  turboR.position.set(0.35, 0.52, 0.55);
  ptGroup.add(turboL, turboR);

  // 2. Front Dual Electric Motors (RAC-e)
  const motorMat = new THREE.MeshStandardMaterial({
    color: 0x00e5ff,
    metalness: 0.85,
    roughness: 0.2,
    emissive: 0x00a3cc,
    emissiveIntensity: 0.55
  });
  const motorGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.22, 16);
  motorGeo.rotateZ(Math.PI / 2);

  const frontMotorL = new THREE.Mesh(motorGeo, motorMat);
  frontMotorL.position.set(-0.42, 0.34, -1.25);
  const frontMotorR = new THREE.Mesh(motorGeo, motorMat);
  frontMotorR.position.set(0.42, 0.34, -1.25);
  ptGroup.add(frontMotorL, frontMotorR);

  // 3. Rear Electric Motor (MGUK)
  const mgukMotor = new THREE.Mesh(motorGeo, motorMat);
  mgukMotor.position.set(0, 0.38, 1.25);
  ptGroup.add(mgukMotor);

  // 4. Centrally Mounted 7.9 kWh Battery Pack
  const batteryGeo = new THREE.BoxGeometry(0.92, 0.12, 0.65);
  const batteryMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    metalness: 0.65,
    roughness: 0.3,
    emissive: 0x047857,
    emissiveIntensity: 0.4
  });
  const batteryMesh = new THREE.Mesh(batteryGeo, batteryMat);
  batteryMesh.position.set(0, 0.23, -0.15);
  ptGroup.add(batteryMesh);

  // High Voltage Power Conduits (Orange Cables)
  const cableMat = new THREE.MeshStandardMaterial({ color: 0xff6600, roughness: 0.4, emissive: 0xff4400, emissiveIntensity: 0.2 });
  const cableGeo = new THREE.CylinderGeometry(0.018, 0.018, 1.5, 8);
  cableGeo.rotateX(Math.PI / 2);
  const cableLeft = new THREE.Mesh(cableGeo, cableMat);
  cableLeft.position.set(-0.22, 0.25, -0.55);
  const cableRight = new THREE.Mesh(cableGeo, cableMat);
  cableRight.position.set(0.22, 0.25, -0.55);
  ptGroup.add(cableLeft, cableRight);

  // 5. Carbon-Fiber Rear Bulkhead
  const carbonMat = new THREE.MeshStandardMaterial({ color: 0x181a1f, roughness: 0.45, metalness: 0.7 });
  const bulkheadGeo = new THREE.BoxGeometry(1.25, 0.52, 0.05);
  const bulkheadMesh = new THREE.Mesh(bulkheadGeo, carbonMat);
  bulkheadMesh.position.set(0, 0.52, 0.05);
  ptGroup.add(bulkheadMesh);

  return ptGroup;
}

// ==========================================================================
// 5. SF90 Specific Aerodynamics & Styling Additions
// ==========================================================================
function createSF90SpecificParts() {
  const group = new THREE.Group();
  group.name = 'SF90_Specific_Additions';

  const carbonMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.35,
    metalness: 0.8
  });

  // 1. Patented Active Shut-off Gurney Flap
  const gurneyGeo = new THREE.BoxGeometry(1.18, 0.035, 0.24);
  gurneyFlapMesh = new THREE.Mesh(gurneyGeo, carbonMat);
  gurneyFlapMesh.position.set(0, 0.73, 1.88);
  gurneyFlapMesh.castShadow = true;
  group.add(gurneyFlapMesh);

  // 2. High-Mounted Twin Titanium Exhaust Tips
  const exhaustMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.96,
    roughness: 0.12
  });
  const exhaustInnerMat = new THREE.MeshBasicMaterial({ color: 0x090d16 });
  const exGeo = new THREE.CylinderGeometry(0.062, 0.062, 0.14, 16);
  exGeo.rotateX(Math.PI / 2);

  const exLeft = new THREE.Mesh(exGeo, exhaustMat);
  exLeft.position.set(-0.13, 0.59, 2.15);
  const exLeftInner = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.142, 16), exhaustInnerMat);
  exLeftInner.rotateX(Math.PI / 2);
  exLeftInner.position.set(-0.13, 0.59, 2.152);

  const exRight = new THREE.Mesh(exGeo, exhaustMat);
  exRight.position.set(0.13, 0.59, 2.15);
  const exRightInner = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.142, 16), exhaustInnerMat);
  exRightInner.rotateX(Math.PI / 2);
  exRightInner.position.set(0.13, 0.59, 2.152);

  group.add(exLeft, exLeftInner, exRight, exRightInner);

  // 3. Matrix LED Daytime Running Lights (DRLs)
  const ledMat = new THREE.MeshBasicMaterial({ color: 0xb0f0ff });
  const drlGeo = new THREE.BoxGeometry(0.18, 0.025, 0.02);
  const drlL1 = new THREE.Mesh(drlGeo, ledMat);
  drlL1.position.set(-0.68, 0.49, -1.94);
  drlL1.rotation.y = 0.25;

  const drlR1 = new THREE.Mesh(drlGeo, ledMat);
  drlR1.position.set(0.68, 0.49, -1.94);
  drlR1.rotation.y = -0.25;

  group.add(drlL1, drlR1);

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
    ior: 1.5
  });
  paintMaterials.push(carPaintMat);

  const carbonFiberMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.38,
    metalness: 0.75
  });

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

  const sf90Additions = createSF90SpecificParts();
  root.add(sf90Additions);

  powertrainGroup = createPHEVPowertrain();
  root.add(powertrainGroup);

  return root;
}

// ==========================================================================
// 7. Wind Tunnel Aerodynamic Particles
// ==========================================================================
function createAeroParticleSystem() {
  const particleCount = 450;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2.2;
    positions[i * 3 + 1] = 0.15 + Math.random() * 0.85;
    positions[i * 3 + 2] = -3.5 + Math.random() * 7.0;
    velocities[i] = 4.5 + Math.random() * 3.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));

  const material = new THREE.PointsMaterial({
    color: 0x00ffcc,
    size: 0.055,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  particleSystem.name = 'Aero_Streamlines';
  return particleSystem;
}

function updateAeroParticles(delta) {
  if (!particleAeroSystem) return;
  const positions = particleAeroSystem.geometry.attributes.position.array;
  const velocities = particleAeroSystem.geometry.attributes.velocity.array;
  const count = positions.length / 3;

  for (let i = 0; i < count; i++) {
    positions[i * 3 + 2] += velocities[i] * delta * (state.isLaunching ? 4.0 : 1.5);

    const z = positions[i * 3 + 2];
    if (z > -2.0 && z < 1.8) {
      if (z < -0.8) {
        positions[i * 3 + 1] = THREE.MathUtils.lerp(positions[i * 3 + 1], 0.48, 0.08);
      } else if (z < 0.8) {
        positions[i * 3 + 1] = THREE.MathUtils.lerp(positions[i * 3 + 1], 0.95, 0.08);
      } else {
        const targetY = state.gurneyFlapAngle > 0.6 ? 0.68 : 0.82;
        positions[i * 3 + 1] = THREE.MathUtils.lerp(positions[i * 3 + 1], targetY, 0.1);
      }
    }

    if (positions[i * 3 + 2] > 3.8) {
      positions[i * 3 + 2] = -3.5;
      positions[i * 3] = (Math.random() - 0.5) * 2.2;
      positions[i * 3 + 1] = 0.2 + Math.random() * 0.7;
    }
  }
  particleAeroSystem.geometry.attributes.position.needsUpdate = true;
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
    reflectivity: 0.95
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
    metalness: 0.25
  });

  // 5. Matte Gray Plastic Trim & Honeycomb Grills
  const plasticGrayMaterial = new THREE.MeshStandardMaterial({
    color: 0x16181d,
    roughness: 0.8,
    metalness: 0.1
  });

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

  const sf90Parts = createSF90SpecificParts();
  carModel.add(sf90Parts);

  powertrainGroup = createPHEVPowertrain();
  carModel.add(powertrainGroup);

  carGroup.add(carModel);
  console.log('Official Ferrari SF90 Stradale model ready!');

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

  // Subtle circular showroom grid
  const gridHelper = new THREE.PolarGridHelper(7, 16, 8, 32, 0x1e293b, 0x0f172a);
  gridHelper.position.y = 0.002;
  scene.add(gridHelper);

  // Root Car Group
  carGroup = new THREE.Group();
  carGroup.name = 'Ferrari_Car_Root';
  scene.add(carGroup);

  // Aero Particles
  particleAeroSystem = createAeroParticleSystem();
  scene.add(particleAeroSystem);

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

  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-mode') === newMode);
  });

  const launchShelfGroup = document.getElementById('launch-shelf-group');
  const shelfControls = document.getElementById('shelf-controls');
  const aeroSliderGroup = document.getElementById('aero-slider-group');
  const colorSwatchGroup = document.getElementById('color-swatch-group');
  const xrayInfoGroup = document.getElementById('xray-info-group');

  if (launchShelfGroup) launchShelfGroup.style.display = newMode === 'launch' ? 'flex' : 'none';
  if (aeroSliderGroup) aeroSliderGroup.style.display = newMode === 'aero' ? 'flex' : 'none';
  if (colorSwatchGroup) colorSwatchGroup.style.display = newMode === 'showroom' ? 'flex' : 'none';
  if (xrayInfoGroup) xrayInfoGroup.style.display = newMode === 'xray' ? 'flex' : 'none';

  // Audio behavior
  if (newMode === 'launch') {
    audio.init();
    audio.updateEngineRPM(0.3);
  } else {
    audio.mute();
  }

  // Visual Shaders / Geometry state
  if (newMode === 'xray') {
    paintMaterials.forEach((mat) => {
      mat.transparent = true;
      mat.opacity = 0.22;
      mat.wireframe = false;
    });
    if (powertrainGroup) powertrainGroup.visible = true;
    if (particleAeroSystem) particleAeroSystem.material.opacity = 0.0;
  } else if (newMode === 'aero') {
    paintMaterials.forEach((mat) => {
      mat.transparent = false;
      mat.opacity = 1.0;
    });
    if (powertrainGroup) powertrainGroup.visible = true;
    if (particleAeroSystem) particleAeroSystem.material.opacity = 0.75;
  } else {
    paintMaterials.forEach((mat) => {
      mat.transparent = false;
      mat.opacity = 1.0;
    });
    if (particleAeroSystem) particleAeroSystem.material.opacity = 0.0;
  }
}

// 0-60 Launch Simulator Action
function triggerLaunchSimulation() {
  if (state.isLaunching) return;
  state.isLaunching = true;
  state.launchProgress = 0;
  state.launchSpeed = 0;

  audio.init();
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

  // 3-2-1 Countdown Audio Beeps
  audio.playBeep(440, 0.08);
  setTimeout(() => audio.playBeep(440, 0.08), 500);
  setTimeout(() => audio.playBeep(880, 0.25), 1000);

  const startTime = performance.now();
  const launchDuration = 2500; // Exact 2.50s for 0-60 mph!

  function stepLaunch(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / launchDuration, 1.0);

    const curvedT = Math.pow(t, 0.85);
    state.launchSpeed = Math.round(curvedT * 60);

    if (speedoNum) speedoNum.textContent = state.launchSpeed;
    if (speedoKmh) speedoKmh.textContent = `${Math.round(state.launchSpeed * 1.60934)} KM/H`;
    if (launchTimer) launchTimer.textContent = `${(t * 2.5).toFixed(2)}s`;
    if (gForceVal) {
      const g = (1.35 - t * 0.25).toFixed(2);
      gForceVal.textContent = `${g} G`;
    }

    // F1 Shift Rev LEDs
    const activeLeds = Math.min(Math.floor(curvedT * 5) + 1, 5);
    revLeds.forEach((led, idx) => {
      led.classList.toggle('active', idx < activeLeds);
    });

    // Engine Audio Pitch Scaling
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
        launchBtn.innerHTML = '<span>🚀</span><span>RE-LAUNCH (0-60 IN 2.5s)</span>';
      }
      setTimeout(() => audio.mute(), 1000);
    }
  }

  setTimeout(() => requestAnimationFrame(stepLaunch), 1000);
}

// ==========================================================================
// 12. Hotspots Projection & Educational Cards
// ==========================================================================
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

  // Color Swatches
  document.querySelectorAll('.swatch-btn').forEach((swatch) => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.swatch-btn').forEach((s) => s.classList.remove('active'));
      swatch.classList.add('active');
      const hex = swatch.getAttribute('data-color');
      state.paintColor = hex;
      paintMaterials.forEach((mat) => {
        if (mat) mat.color.set(hex);
      });
    });
  });

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

  // Shut-Off Gurney Flap Slider
  const flapSlider = document.getElementById('flap-slider');
  if (flapSlider) {
    flapSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      state.gurneyFlapAngle = val;
      if (gurneyFlapMesh) {
        gurneyFlapMesh.position.y = 0.74 - val * 0.08;
        gurneyFlapMesh.rotation.x = val * 0.35;
      }
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

  // Window Resize
  window.addEventListener('resize', () => {
    if (!renderer || !camera) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Battery & GPU saving when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      audio.mute();
    }
  });
}

// ==========================================================================
// 14. Main Animation & Render Loop
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
// 15. Application Bootstrap
// ==========================================================================
function startApp() {
  try {
    console.log('Initializing Ferrari SF90 Stradale 3D Showcase (Photorealistic CAD Edition)...');
    initScene();
    setupModelImporter();
    setupUIEventListeners();
    animate();
    console.log('Ferrari SF90 Stradale 3D Showcase running successfully!');
  } catch (err) {
    console.error('Fatal error starting 3D Showcase:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
