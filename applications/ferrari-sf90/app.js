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

// STEM & Engineering Hotspots (positions in 3D world coordinates)
const hotspotsData = [
  {
    id: 'v8-engine',
    system: 'engine',
    title: '4.0L Twin-Turbo V8 Engine (F154 FA)',
    titleTh: 'เครื่องยนต์ 4.0 ลิตร Twin-Turbo V8 (F154 FA)',
    coords: new THREE.Vector3(0, 0.65, 0.45),
    camPos: new THREE.Vector3(1.6, 1.8, 1.6),
    camTarget: new THREE.Vector3(0, 0.65, 0.45),
    specs: ['769 HP @ 7,500 rpm', '800 Nm Torque @ 6,000 rpm', '350-bar Direct Injection', 'Flat-Plane Crankshaft'],
    desc: 'The internal combustion core is Ferrari’s most powerful V8 ever produced. Featuring redesigned intake and exhaust ducts, a flat-plane crankshaft, and 350-bar direct fuel injection. The turbos are mounted centrally between the cylinder banks ("hot-V") for near-zero turbo lag and rapid throttle response.',
    descTh: 'หัวใจสันดาปภายในที่เป็นเครื่องยนต์ V8 ที่ทรงพลังที่สุดในประวัติศาสตร์ของ Ferrari พัฒนาท่อไอดีและไอเสียใหม่ ข้อเหวี่ยงแบบ Flat-Plane และระบบฉีดตรงแรงดันสูง 350 บาร์ วางเทอร์โบแบบ Hot-V เพื่อการตอบสนองที่รวดเร็วไร้ Turbo Lag'
  },
  {
    id: 'front-motors',
    system: 'motors',
    title: 'RAC-e Dual Front Electric Motors',
    titleTh: 'มอเตอร์ไฟฟ้าคู่หน้า RAC-e (ระบบกระจายแรงบิดอิสระ)',
    coords: new THREE.Vector3(0, 0.38, -1.35),
    camPos: new THREE.Vector3(1.8, 1.1, -2.4),
    camTarget: new THREE.Vector3(0, 0.38, -1.35),
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
    coords: new THREE.Vector3(0, 0.28, -0.2),
    camPos: new THREE.Vector3(0, 2.8, -0.2),
    camTarget: new THREE.Vector3(0, 0.28, -0.2),
    specs: ['7.9 kWh Capacity', '350V Architecture', 'Low Center of Gravity', 'PHEV External Plug-in Port'],
    desc: 'Mounted low beneath the floor just behind the cockpit seats, the compact 7.9 kWh battery balances the vehicle’s weight distribution. It can be charged via an external plug or in Charge mode directly from the V8 engine while driving.',
    descTh: 'ติดตั้งใต้ท้องรถด้านหลังเบาะนั่งห้องโดยสาร เพื่อให้จุดศูนย์ถ่วงต่ำที่สุดเท่าที่จะเป็นไปได้ แบตเตอรี่ขนาด 7.9 kWh รองรับการเสียบปลั๊กชาร์จไฟจากภายนอก (PHEV) หรือชาร์จด้วยเครื่องยนต์ V8 ขณะขับขี่'
  },
  {
    id: 'chassis-bulkhead',
    system: 'chassis',
    title: 'Hollow Aluminum Chassis & Carbon Bulkhead',
    titleTh: 'แชสซีอะลูมิเนียมหล่อกลวง & ผนังคาร์บอนไฟเบอร์',
    coords: new THREE.Vector3(0.5, 0.65, 0.0),
    camPos: new THREE.Vector3(2.2, 1.5, 0.2),
    camTarget: new THREE.Vector3(0, 0.6, 0.0),
    specs: ['Hollow Aluminum Castings', 'Carbon-Fiber Rear Bulkhead', '+20% Bending Stiffness', '+40% Torsional Rigidity'],
    desc: 'To offset the hybrid battery and motors weight, Ferrari engineered an all-new multi-material chassis. It uses hollow aluminum extrusion castings for optimal strength-to-weight ratio and an ultra-stiff carbon-fiber bulkhead behind the cabin that shields the driver and eliminates cabin vibration.',
    descTh: 'เพื่อชดเชยน้ำหนักของแบตเตอรี่และมอเตอร์ไฟฟ้า จึงออกแบบแชสซีผสมผสานด้วยอะลูมิเนียมหล่อกลวง และผนังกั้นห้องโดยสารด้านหลังที่ทำจากคาร์บอนไฟเบอร์ เพิ่มความแข็งแกร่งต้านแรงบิดขึ้น 40% และป้องกันเสียงรบกวน'
  },
  {
    id: 'active-aero',
    system: 'aero',
    title: 'Patented Shut-off Gurney Flap',
    titleTh: 'สปอยเลอร์แอโรไดนามิกแบบ Shut-off Gurney (สิทธิบัตร Ferrari)',
    coords: new THREE.Vector3(0, 0.8, 1.9),
    camPos: new THREE.Vector3(0, 1.4, 3.2),
    camTarget: new THREE.Vector3(0, 0.75, 1.8),
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
let energyPulseParticles = null;
const tireMeshes = [];
const rimMeshes = [];
const caliperMeshes = [];
const paintMaterials = [];
let groundMirror, groundGrid;

// Camera Tween State
let isCameraAnimating = false;
let camStartPos = new THREE.Vector3();
let camEndPos = new THREE.Vector3();
let camStartTarget = new THREE.Vector3();
let camEndTarget = new THREE.Vector3();
let camAnimAlpha = 0;

// ==========================================================================
// 3. Web Audio API Synthesizer (Zero External File Dependencies)
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

    // Engine V8 Oscillators (Low frequency rumble)
    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(45, this.ctx.currentTime);

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(90, this.ctx.currentTime);

    // Distortion / Saturation for Exhaust Roar
    const waveshaper = this.ctx.createWaveShaper();
    waveshaper.curve = this.makeDistortionCurve(18);

    this.osc1.connect(waveshaper);
    this.osc2.connect(waveshaper);
    waveshaper.connect(this.engineGain);
    this.engineGain.connect(this.ctx.destination);

    this.osc1.start();
    this.osc2.start();

    // Electric Motor High-Pitch Whine
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
    // rpmFactor ranges from 0 (idle) to 1 (redline 8,000 rpm)
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

// ==========================================================================
// 4. Procedural High-Detail Ferrari SF90 Stradale Model Generator
// ==========================================================================
function createFerrariSF90Procedural() {
  const root = new THREE.Group();
  root.name = 'Ferrari_SF90_Stradale';

  bodyMeshGroup = new THREE.Group();
  bodyMeshGroup.name = 'Body_Group';

  powertrainGroup = new THREE.Group();
  powertrainGroup.name = 'Powertrain_Group';

  aeroGroup = new THREE.Group();
  aeroGroup.name = 'Aero_Group';

  wheelsGroup = new THREE.Group();
  wheelsGroup.name = 'Wheels_Group';

  // -------------------------------------------------------------
  // Materials Setup (PBR Automotive Clearcoat)
  // -------------------------------------------------------------
  const carPaintMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(state.paintColor),
    metalness: 0.88,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    reflectivity: 0.95
  });
  paintMaterials.push(carPaintMat);

  const carbonFiberMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.45,
    metalness: 0.7
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0f172a,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.82,
    ior: 1.52,
    transparent: true,
    opacity: 0.75
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.95,
    roughness: 0.08
  });

  const tireRubberMat = new THREE.MeshStandardMaterial({
    color: 0x1e2024,
    roughness: 0.85,
    metalness: 0.1
  });

  const caliperMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(state.caliperColor),
    metalness: 0.7,
    roughness: 0.25
  });
  caliperMeshes.push(caliperMat);

  const brakeRotorMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.85,
    roughness: 0.35
  });

  // -------------------------------------------------------------
  // Bodywork: Monocoque & Main Panels
  // -------------------------------------------------------------
  // Lower Body Tub / Belly
  const lowerBodyGeo = new THREE.BoxGeometry(1.78, 0.24, 4.3);
  const lowerBody = new THREE.Mesh(lowerBodyGeo, carPaintMat);
  lowerBody.position.set(0, 0.22, 0);
  lowerBody.castShadow = true;
  lowerBody.receiveShadow = true;
  bodyMeshGroup.add(lowerBody);

  // Aerodynamic Low-Slung Front Bonnet
  const hoodShape = new THREE.Shape();
  hoodShape.moveTo(-0.84, 0);
  hoodShape.lineTo(0.84, 0);
  hoodShape.lineTo(0.72, 1.4);
  hoodShape.lineTo(-0.72, 1.4);
  hoodShape.closePath();

  const hoodExtrudeSettings = { depth: 0.18, bevelEnabled: true, bevelSegments: 4, steps: 2, bevelSize: 0.04, bevelThickness: 0.04 };
  const hoodGeo = new THREE.ExtrudeGeometry(hoodShape, hoodExtrudeSettings);
  hoodGeo.rotateX(-Math.PI / 2);
  const hoodMesh = new THREE.Mesh(hoodGeo, carPaintMat);
  hoodMesh.position.set(0, 0.32, -1.9);
  hoodMesh.castShadow = true;
  bodyMeshGroup.add(hoodMesh);

  // Front Aerodynamic Nostrils / Vortex Indents
  const nostrilGeo = new THREE.BoxGeometry(0.32, 0.08, 0.6);
  const leftNostril = new THREE.Mesh(nostrilGeo, carbonFiberMat);
  leftNostril.position.set(-0.35, 0.42, -1.5);
  const rightNostril = new THREE.Mesh(nostrilGeo, carbonFiberMat);
  rightNostril.position.set(0.35, 0.42, -1.5);
  bodyMeshGroup.add(leftNostril, rightNostril);

  // Front Carbon Fiber Splitter
  const frontSplitterGeo = new THREE.BoxGeometry(1.86, 0.05, 0.4);
  const frontSplitter = new THREE.Mesh(frontSplitterGeo, carbonFiberMat);
  frontSplitter.position.set(0, 0.12, -2.15);
  bodyMeshGroup.add(frontSplitter);

  // Cabin Glasshouse Canopy
  const cabinGeo = new THREE.CylinderGeometry(0.68, 0.82, 1.65, 16, 1, false);
  cabinGeo.scale(1.0, 0.52, 1.15);
  const cabinMesh = new THREE.Mesh(cabinGeo, glassMat);
  cabinMesh.position.set(0, 0.68, -0.15);
  cabinMesh.castShadow = true;
  bodyMeshGroup.add(cabinMesh);

  // Roof Panel
  const roofGeo = new THREE.BoxGeometry(1.22, 0.05, 1.35);
  const roofMesh = new THREE.Mesh(roofGeo, carPaintMat);
  roofMesh.position.set(0, 0.94, -0.15);
  bodyMeshGroup.add(roofMesh);

  // Sculpted Sidepods & Radiator Air Intakes
  const leftPodGeo = new THREE.BoxGeometry(0.24, 0.35, 1.6);
  const leftPod = new THREE.Mesh(leftPodGeo, carPaintMat);
  leftPod.position.set(-0.95, 0.35, 0.15);
  const rightPod = new THREE.Mesh(leftPodGeo, carPaintMat);
  rightPod.position.set(0.95, 0.35, 0.15);
  bodyMeshGroup.add(leftPod, rightPod);

  // Intake Scoop Meshes (Dark Carbon Grilles)
  const intakeGeo = new THREE.BoxGeometry(0.08, 0.22, 0.5);
  const leftIntake = new THREE.Mesh(intakeGeo, carbonFiberMat);
  leftIntake.position.set(-0.98, 0.38, 0.35);
  const rightIntake = new THREE.Mesh(intakeGeo, carbonFiberMat);
  rightIntake.position.set(0.98, 0.38, 0.35);
  bodyMeshGroup.add(leftIntake, rightIntake);

  // Rear Engine Deck Cover (Transparent Glass Window)
  const engineCoverGeo = new THREE.BoxGeometry(1.1, 0.04, 1.15);
  const engineCover = new THREE.Mesh(engineCoverGeo, glassMat);
  engineCover.position.set(0, 0.72, 0.95);
  bodyMeshGroup.add(engineCover);

  // Rear Haunches & Fenders
  const haunchGeo = new THREE.BoxGeometry(0.38, 0.42, 1.4);
  const leftHaunch = new THREE.Mesh(haunchGeo, carPaintMat);
  leftHaunch.position.set(-0.88, 0.45, 1.1);
  const rightHaunch = new THREE.Mesh(haunchGeo, carPaintMat);
  rightHaunch.position.set(0.88, 0.45, 1.1);
  bodyMeshGroup.add(leftHaunch, rightHaunch);

  // Rear Carbon Diffuser & Vertical Fins
  const diffuserGeo = new THREE.BoxGeometry(1.78, 0.18, 0.5);
  const diffuserMesh = new THREE.Mesh(diffuserGeo, carbonFiberMat);
  diffuserMesh.position.set(0, 0.18, 2.05);
  bodyMeshGroup.add(diffuserMesh);

  // Quad Iconic Rectangular Taillights
  const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xff002b });
  const tailLightGeo = new THREE.BoxGeometry(0.24, 0.06, 0.04);
  const tl1 = new THREE.Mesh(tailLightGeo, tailLightMat);
  tl1.position.set(-0.68, 0.65, 2.16);
  const tl2 = new THREE.Mesh(tailLightGeo, tailLightMat);
  tl2.position.set(-0.38, 0.65, 2.16);
  const tl3 = new THREE.Mesh(tailLightGeo, tailLightMat);
  tl3.position.set(0.38, 0.65, 2.16);
  const tl4 = new THREE.Mesh(tailLightGeo, tailLightMat);
  tl4.position.set(0.68, 0.65, 2.16);
  bodyMeshGroup.add(tl1, tl2, tl3, tl4);

  // High-Mounted Center Twin Exhaust Pipes
  const exhaustGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.12, 16);
  exhaustGeo.rotateX(Math.PI / 2);
  const exLeft = new THREE.Mesh(exhaustGeo, chromeMat);
  exLeft.position.set(-0.12, 0.58, 2.18);
  const exRight = new THREE.Mesh(exhaustGeo, chromeMat);
  exRight.position.set(0.12, 0.58, 2.18);
  bodyMeshGroup.add(exLeft, exRight);

  // -------------------------------------------------------------
  // Active Aerodynamics: Patented Shut-off Gurney Flap
  // -------------------------------------------------------------
  const gurneyBaseGeo = new THREE.BoxGeometry(1.15, 0.04, 0.28);
  gurneyFlapMesh = new THREE.Mesh(gurneyBaseGeo, carbonFiberMat);
  gurneyFlapMesh.position.set(0, 0.74, 1.88);
  aeroGroup.add(gurneyFlapMesh);

  // -------------------------------------------------------------
  // Powertrain Internals (PHEV V8 + 3 Electric Motors + Battery)
  // -------------------------------------------------------------
  // 1. Mid-Rear 4.0L Twin-Turbo V8 Engine Block
  const v8BlockGeo = new THREE.BoxGeometry(0.65, 0.38, 0.72);
  const v8BlockMat = new THREE.MeshStandardMaterial({
    color: 0xdc2626, // Crimson red engine heads
    metalness: 0.85,
    roughness: 0.25,
    emissive: 0x550000,
    emissiveIntensity: 0.2
  });
  const v8Mesh = new THREE.Mesh(v8BlockGeo, v8BlockMat);
  v8Mesh.position.set(0, 0.46, 0.55);
  v8Mesh.name = 'Engine_V8';
  powertrainGroup.add(v8Mesh);

  // Twin Turbochargers (Gold Heat-Shielded Cylinders)
  const turboMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 });
  const turboGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.18, 16);
  turboGeo.rotateZ(Math.PI / 2);
  const turboL = new THREE.Mesh(turboGeo, turboMat);
  turboL.position.set(-0.36, 0.55, 0.55);
  const turboR = new THREE.Mesh(turboGeo, turboMat);
  turboR.position.set(0.36, 0.55, 0.55);
  powertrainGroup.add(turboL, turboR);

  // 2. Front Dual Electric Motors (RAC-e)
  const motorMat = new THREE.MeshStandardMaterial({
    color: 0x00e5ff, // Electric cyan
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x0088cc,
    emissiveIntensity: 0.4
  });
  const motorGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.24, 16);
  motorGeo.rotateZ(Math.PI / 2);

  const frontMotorL = new THREE.Mesh(motorGeo, motorMat);
  frontMotorL.position.set(-0.45, 0.32, -1.35);
  const frontMotorR = new THREE.Mesh(motorGeo, motorMat);
  frontMotorR.position.set(0.45, 0.32, -1.35);
  powertrainGroup.add(frontMotorL, frontMotorR);

  // 3. Rear Electric Motor (MGUK)
  const mgukMotor = new THREE.Mesh(motorGeo, motorMat);
  mgukMotor.position.set(0, 0.38, 1.18);
  powertrainGroup.add(mgukMotor);

  // 4. Centrally Mounted 7.9 kWh Battery Pack
  const batteryGeo = new THREE.BoxGeometry(0.95, 0.12, 0.7);
  const batteryMat = new THREE.MeshStandardMaterial({
    color: 0x10b981, // Emerald green
    metalness: 0.6,
    roughness: 0.3,
    emissive: 0x047857,
    emissiveIntensity: 0.3
  });
  const batteryMesh = new THREE.Mesh(batteryGeo, batteryMat);
  batteryMesh.position.set(0, 0.24, -0.2);
  powertrainGroup.add(batteryMesh);

  // High Voltage Power Conduits (Orange Cables)
  const cableMat = new THREE.MeshStandardMaterial({ color: 0xff6600, roughness: 0.4 });
  const cableGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.8, 8);
  cableGeo.rotateX(Math.PI / 2);
  const cableLeft = new THREE.Mesh(cableGeo, cableMat);
  cableLeft.position.set(-0.25, 0.26, -0.6);
  const cableRight = new THREE.Mesh(cableGeo, cableMat);
  cableRight.position.set(0.25, 0.26, -0.6);
  powertrainGroup.add(cableLeft, cableRight);

  // 5. Carbon-Fiber Rear Bulkhead & Aluminum Spaceframe
  const bulkheadGeo = new THREE.BoxGeometry(1.3, 0.55, 0.06);
  const bulkheadMesh = new THREE.Mesh(bulkheadGeo, carbonFiberMat);
  bulkheadMesh.position.set(0, 0.55, 0.08);
  powertrainGroup.add(bulkheadMesh);

  // -------------------------------------------------------------
  // Wheels, Carbon Brakes & Brembo Calipers
  // -------------------------------------------------------------
  const wheelPositions = [
    { x: -0.92, y: 0.33, z: -1.35, isRear: false }, // Front Left
    { x: 0.92, y: 0.33, z: -1.35, isRear: false },  // Front Right
    { x: -0.94, y: 0.35, z: 1.35, isRear: true },   // Rear Left (wider stance)
    { x: 0.94, y: 0.35, z: 1.35, isRear: true }     // Rear Right (wider stance)
  ];

  wheelPositions.forEach((pos) => {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(pos.x, pos.y, pos.z);

    const radius = pos.isRear ? 0.35 : 0.33;
    const width = pos.isRear ? 0.28 : 0.24;

    // Rubber Tire
    const tireGeo = new THREE.CylinderGeometry(radius, radius, width, 24);
    tireGeo.rotateZ(Math.PI / 2);
    const tire = new THREE.Mesh(tireGeo, tireRubberMat);
    tire.castShadow = true;
    wheelGroup.add(tire);
    tireMeshes.push(tire);

    // Alloy Star Rim
    const rimMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(state.rimFinish), metalness: 0.92, roughness: 0.15 });
    rimMeshes.push(rimMat);
    const rimGeo = new THREE.CylinderGeometry(radius * 0.76, radius * 0.76, width * 1.02, 16);
    rimGeo.rotateZ(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, rimMat);
    wheelGroup.add(rim);

    // Drilled Carbon-Ceramic Brake Rotor
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

  // Assemble into root
  root.add(bodyMeshGroup);
  root.add(aeroGroup);
  root.add(powertrainGroup);
  root.add(wheelsGroup);

  return root;
}

// ==========================================================================
// 5. Wind Tunnel Aerodynamic Particles & Energy Pulse System
// ==========================================================================
function createAeroParticleSystem() {
  const particleCount = 450;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2.2;     // X width
    positions[i * 3 + 1] = 0.15 + Math.random() * 0.85; // Y height
    positions[i * 3 + 2] = -3.5 + Math.random() * 7.0;  // Z length
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

    // Curve flow over the car hood and active rear flap
    const z = positions[i * 3 + 2];
    if (z > -2.0 && z < 1.8) {
      if (z < -0.8) {
        positions[i * 3 + 1] = THREE.MathUtils.lerp(positions[i * 3 + 1], 0.48, 0.08);
      } else if (z < 0.8) {
        positions[i * 3 + 1] = THREE.MathUtils.lerp(positions[i * 3 + 1], 0.95, 0.08);
      } else {
        // Over rear wing
        const targetY = state.gurneyFlapAngle > 0.6 ? 0.68 : 0.82;
        positions[i * 3 + 1] = THREE.MathUtils.lerp(positions[i * 3 + 1], targetY, 0.1);
      }
    }

    // Reset when past rear diffuser
    if (positions[i * 3 + 2] > 3.8) {
      positions[i * 3 + 2] = -3.5;
      positions[i * 3] = (Math.random() - 0.5) * 2.2;
      positions[i * 3 + 1] = 0.2 + Math.random() * 0.7;
    }
  }
  particleAeroSystem.geometry.attributes.position.needsUpdate = true;
}

// ==========================================================================
// 6. Scene Initialization, Studio Lighting & Ground
// ==========================================================================
function initScene() {
  const container = document.getElementById('canvas-container');
  const canvas = document.getElementById('webgl-canvas');

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#07090e');
  scene.fog = new THREE.FogExp2('#07090e', 0.045);

  // Camera (Cinematic Front Three-Quarter Hero View)
  camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.set(4.4, 2.0, -4.6);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // OrbitControls
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.02; // Keep camera above floor
  controls.minDistance = 2.4;
  controls.maxDistance = 12.0;
  controls.target.set(0, 0.45, 0);

  // -------------------------------------------------------------
  // Studio Lighting (Automotive Studio Softboxes)
  // -------------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  // Overhead Key Light
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
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

  // Cool Blue-Cyan Rim Light
  const rimLight = new THREE.DirectionalLight(0x00e5ff, 1.6);
  rimLight.position.set(-5, 4, -4);
  scene.add(rimLight);

  // Warm Red Accent Fill Light
  const fillLight = new THREE.DirectionalLight(0xff3344, 0.9);
  fillLight.position.set(4, 2, -4);
  scene.add(fillLight);

  // -------------------------------------------------------------
  // Ground Shadow Plane & Studio Circular Grid
  // -------------------------------------------------------------
  const floorGeo = new THREE.PlaneGeometry(35, 35);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0a0e17,
    roughness: 0.65,
    metalness: 0.4
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Subtle circular showroom grid
  const gridHelper = new THREE.PolarGridHelper(7, 16, 8, 32, 0x1e293b, 0x0f172a);
  gridHelper.position.y = 0.002;
  scene.add(gridHelper);

  // -------------------------------------------------------------
  // Add Ferrari SF90 Model & Aero System
  // -------------------------------------------------------------
  carGroup = createFerrariSF90Procedural();
  scene.add(carGroup);

  particleAeroSystem = createAeroParticleSystem();
  scene.add(particleAeroSystem);

  // Hide loading screen
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display = 'none', 500);
  }
}

// ==========================================================================
// 7. GLTF / GLB Loader for Custom AI Models
// ==========================================================================
function setupModelImporter() {
  const fileInput = document.getElementById('file-importer');
  if (!fileInput) return;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
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
      scene.remove(carGroup);
      carGroup = gltf.scene;

      // Auto-center & compute bounding box
      const box = new THREE.Box3().setFromObject(carGroup);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Normalize scale to real car length ~4.7m
      const maxDim = Math.max(size.x, size.y, size.z);
      const scaleFactor = 4.7 / maxDim;
      carGroup.scale.setScalar(scaleFactor);

      // Recalculate box after scale
      box.setFromObject(carGroup);
      box.getCenter(center);
      carGroup.position.x = -center.x;
      carGroup.position.y = -box.min.y; // Sit flat on floor
      carGroup.position.z = -center.z;

      // Apply shadows
      carGroup.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
          if (node.material && (node.name.toLowerCase().includes('body') || node.name.toLowerCase().includes('paint'))) {
            paintMaterials.push(node.material);
            node.material.color.set(state.paintColor);
          }
        }
      });

      scene.add(carGroup);
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
      alert('Could not parse GLTF/GLB file. Using default procedural Ferrari SF90.');
      if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.style.display = 'none', 500);
      }
    }
  );
}

// ==========================================================================
// 8. Mode Controllers (Showroom, X-Ray, Aero, Launch)
// ==========================================================================
function switchMode(newMode) {
  state.currentMode = newMode;

  // Update UI Tab buttons
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-mode') === newMode);
  });

  const launchHud = document.getElementById('launch-hud');
  const shelfControls = document.getElementById('shelf-controls');
  const aeroSliderGroup = document.getElementById('aero-slider-group');
  const colorSwatchGroup = document.getElementById('color-swatch-group');

  // Hide or Show specific mode overlays
  if (launchHud) launchHud.classList.toggle('active', newMode === 'launch');
  if (aeroSliderGroup) aeroSliderGroup.style.display = newMode === 'aero' ? 'flex' : 'none';
  if (colorSwatchGroup) colorSwatchGroup.style.display = newMode === 'showroom' ? 'flex' : 'none';

  // Audio behavior
  if (newMode === 'launch') {
    audio.init();
    audio.updateEngineRPM(0.3); // Idle revs
  } else {
    audio.mute();
  }

  // Visual Shaders / Geometry state
  if (newMode === 'xray') {
    // Semi-transparent ghost body
    paintMaterials.forEach((mat) => {
      mat.transparent = true;
      mat.opacity = 0.22;
      mat.wireframe = false;
    });
    if (powertrainGroup) powertrainGroup.visible = true;
    if (particleAeroSystem) particleAeroSystem.material.opacity = 0.0;
  } else if (newMode === 'aero') {
    // Solid body + active wind particles
    paintMaterials.forEach((mat) => {
      mat.transparent = false;
      mat.opacity = 1.0;
    });
    if (powertrainGroup) powertrainGroup.visible = true;
    if (particleAeroSystem) particleAeroSystem.material.opacity = 0.75;
  } else {
    // Showroom & Launch mode
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
  const launchTimer = document.getElementById('stat-launch-time');
  const gForceVal = document.getElementById('stat-g-force');
  const launchBtn = document.getElementById('btn-launch-trigger');

  if (launchBtn) {
    launchBtn.disabled = true;
    launchBtn.textContent = '🚀 LAUNCH IN PROGRESS...';
  }

  // 3-2-1 Countdown Audio Beeps
  audio.playBeep(440, 0.08);
  setTimeout(() => audio.playBeep(440, 0.08), 500);
  setTimeout(() => audio.playBeep(880, 0.25), 1000);

  const startTime = performance.now();
  const launchDuration = 2500; // Exact 2.50s for 0-60 mph!

  function stepLaunch(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / launchDuration, 1.0);

    // Realistic non-linear supercar acceleration curve (rapid AWD initial bite)
    const curvedT = Math.pow(t, 0.85);
    state.launchSpeed = Math.round(curvedT * 60);

    if (speedoNum) speedoNum.textContent = state.launchSpeed;
    if (launchTimer) launchTimer.textContent = `${(t * 2.5).toFixed(2)}s`;
    if (gForceVal) {
      // Peaks at 1.35 G initially, stabilizes to 1.1 G
      const g = (1.35 - t * 0.25).toFixed(2);
      gForceVal.textContent = `${g} G`;
    }

    // Engine Audio Pitch Scaling
    audio.updateEngineRPM(0.3 + curvedT * 0.7);

    // Camera Vibration / Shake effect
    if (t < 0.95) {
      camera.position.x += (Math.random() - 0.5) * 0.02;
      camera.position.y += (Math.random() - 0.5) * 0.02;
    }

    // Wheel spin
    tireMeshes.forEach((tire) => {
      tire.rotation.x += curvedT * 0.45;
    });

    if (t < 1.0) {
      requestAnimationFrame(stepLaunch);
    } else {
      state.isLaunching = false;
      if (launchBtn) {
        launchBtn.disabled = false;
        launchBtn.textContent = 'RE-LAUNCH (0-60 IN 2.5s)';
      }
      setTimeout(() => audio.mute(), 1000);
    }
  }

  setTimeout(() => requestAnimationFrame(stepLaunch), 1000);
}

// ==========================================================================
// 9. Hotspots Projection & Educational Cards
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

    // Only display hotspots when enabled and in Showroom/X-Ray modes
    if (!state.hotspotsVisible || state.currentMode === 'launch') {
      badge.style.display = 'none';
      return;
    }

    tempV.copy(hotspot.coords);
    tempV.project(camera);

    // Check if behind camera
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
    // Smooth easeInOutCubic
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
      const pill = document.createElement('span');
      pill.className = 'spec-badge-pill';
      pill.textContent = sp;
      specsBox.appendChild(pill);
    });
  }

  modal.classList.add('open');
  animateCameraTo(hotspot.camPos, hotspot.camTarget);
}

function closeHotspotModal() {
  const modal = document.getElementById('detail-modal');
  if (modal) modal.classList.remove('open');
  state.activeHotspot = null;
}

// ==========================================================================
// 10. Event Listeners & UI Binding
// ==========================================================================
function setupUIEventListeners() {
  // Mode switcher tabs
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      switchMode(mode);
    });
  });

  // Paint Color Swatches
  document.querySelectorAll('.swatch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.swatch-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const color = btn.getAttribute('data-color');
      state.paintColor = color;
      paintMaterials.forEach((mat) => mat.color.set(color));
    });
  });

  // Camera Quick-Jump Angles
  const cameraPresets = {
    iso: { pos: new THREE.Vector3(4.4, 2.0, -4.6), target: new THREE.Vector3(0, 0.45, 0) },
    front: { pos: new THREE.Vector3(0, 0.95, -4.6), target: new THREE.Vector3(0, 0.45, 0) },
    side: { pos: new THREE.Vector3(4.8, 0.85, 0), target: new THREE.Vector3(0, 0.5, 0) },
    rear: { pos: new THREE.Vector3(0, 1.2, 4.8), target: new THREE.Vector3(0, 0.55, 0) },
    top: { pos: new THREE.Vector3(0, 7.5, 0.1), target: new THREE.Vector3(0, 0, 0) }
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
        // Retract/lower wedge for downforce
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
// 11. Main Animation & Render Loop
// ==========================================================================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  // Skip rendering calculations when browser tab is inactive to save GPU/battery
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
// 12. Application Bootstrap
// ==========================================================================
function startApp() {
  try {
    console.log('Initializing Ferrari SF90 Stradale 3D Showcase...');
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
  // DOM already loaded, initialize immediately
  startApp();
}
