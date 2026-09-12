/**
 * ==========================================================================
 * Professional Circuit Racing - High-Fidelity 3D Supercars Engine
 * Integrates the official CAD-Grade 51-Mesh Ferrari Model (ferrari_official.glb)
 * with DRACO decompression, PBR clearcoat automotive lacquer, chrome 5-star
 * forged alloy rims, yellow Brembo calipers, cross-drilled rotors, Scuderia
 * yellow badges, clear cockpit glass, steerable front wheel hubs, spinning
 * tires, active LED braking lights, and contact AO shadow.
 * ==========================================================================
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { FERRARI_GLB_BASE64, FERRARI_AO_BASE64 } from './models/ferrari_model_data.js';

export const CAR_MODELS_DATA = [
  {
    id: 'sf90_gt',
    name: 'Ferrari SF90 Stradale GT',
    badge: 'PHEV HYBRID',
    topSpeed: 340, // km/h
    acceleration: 2.5, // 0-100 km/h (s)
    handling: 9.6,
    braking: 9.4,
    description: 'Twin-Turbo V8 + 3 Electric Motors e-4WD flagship hypercar.',
    baseColor: '#e61d24', // Rosso Corsa
    soundType: 'v8'
  },
  {
    id: 'f40_lm',
    name: 'Ferrari F40 Competizione',
    badge: 'TWIN-TURBO V8',
    topSpeed: 367,
    acceleration: 2.8,
    handling: 9.2,
    braking: 8.9,
    description: 'Pure analog twin-turbo legend with iconic high boxed rear wing.',
    baseColor: '#dc2626', // Rosso Scuderia
    soundType: 'v8'
  },
  {
    id: 'laferrari_xx',
    name: 'LaFerrari FXX-K Hypercar',
    badge: 'HY-KERS V12',
    topSpeed: 355,
    acceleration: 2.4,
    handling: 9.8,
    braking: 9.7,
    description: 'V12 hybrid track weapon with dual fin rear aero stabilizers.',
    baseColor: '#18181b', // Nero Carbon / Matte Black
    soundType: 'v12'
  },
  {
    id: 'gt3_458',
    name: 'Ferrari 458 Italia GT3',
    badge: 'NATURAL ASPIRATED V8',
    topSpeed: 325,
    acceleration: 2.9,
    handling: 9.7,
    braking: 9.5,
    description: 'High-downforce GT3 endurance racer with massive swan-neck wing.',
    baseColor: '#facc15', // Giallo Modena
    soundType: 'v8'
  },
  {
    id: 'daytona_sp3',
    name: 'Ferrari Daytona SP3',
    badge: '6.5L V12',
    topSpeed: 345,
    acceleration: 2.7,
    handling: 9.4,
    braking: 9.2,
    description: 'Sculpted targa prototype celebrating historic 24-hour endurance victories.',
    baseColor: '#2563eb', // Blu Tour de France
    soundType: 'v12'
  },
  {
    id: 'enzo_gt',
    name: 'Ferrari Enzo GT',
    badge: 'FORMULA 1 V12',
    topSpeed: 350,
    acceleration: 2.8,
    handling: 9.3,
    braking: 9.3,
    description: 'F1-inspired nose cone and naturally aspirated 6.0-liter V12 roar.',
    baseColor: '#ea580c', // Rosso Dino
    soundType: 'v12'
  }
];

// Master CAD Template Cache
let masterFerrariTemplate = null;
let isMasterLoading = false;
const loadCallbacks = [];

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Initializes and parses the master official CAD Ferrari SF90 model.
 * Returns a Promise that resolves when the master template is ready.
 */
export function initFerrariMasterModel() {
  if (masterFerrariTemplate) {
    return Promise.resolve(masterFerrariTemplate);
  }

  if (isMasterLoading) {
    return new Promise((resolve) => {
      loadCallbacks.push(resolve);
    });
  }

  isMasterLoading = true;

  return new Promise((resolve) => {
    try {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('draco/');
      dracoLoader.setDecoderConfig({ type: 'wasm' });

      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader);

      const arrayBuffer = base64ToArrayBuffer(FERRARI_GLB_BASE64);
      gltfLoader.parse(
        arrayBuffer,
        '',
        (gltf) => {
          masterFerrariTemplate = gltf.scene;
          console.log('Official CAD Ferrari SF90 3D Model loaded successfully (51 meshes)!');
          isMasterLoading = false;
          resolve(masterFerrariTemplate);
          while (loadCallbacks.length > 0) {
            loadCallbacks.shift()(masterFerrariTemplate);
          }
        },
        (parseErr) => {
          console.warn('Draco/GLTF parse failed, trying fallback:', parseErr);
          isMasterLoading = false;
          resolve(null);
        }
      );
    } catch (err) {
      console.warn('GLTF loader exception:', err);
      isMasterLoading = false;
      resolve(null);
    }
  });
}

// Pre-trigger model loading immediately on module evaluation
if (typeof window !== 'undefined') {
  initFerrariMasterModel().catch(() => {});
}

export class RacingCar {
  constructor(modelId = 'sf90_gt', options = {}) {
    this.modelId = modelId;
    this.modelConfig = CAR_MODELS_DATA.find(m => m.id === modelId) || CAR_MODELS_DATA[0];

    this.driverName = options.driverName || 'Driver';
    this.nationality = options.nationality || '🇹🇭';
    this.racingNumber = options.racingNumber || Math.floor(Math.random() * 89 + 10);
    this.paintColor = options.paintColor || this.modelConfig.baseColor;
    this.stripeColor = options.stripeColor || '#ffffff';
    this.caliperColor = options.caliperColor || '#facc15';
    this.isAI = options.isAI || false;

    this.mesh = new THREE.Group();
    this.mesh.name = `Car_${this.driverName}`;

    this.bodyMaterials = [];
    this.tireMeshes = [];
    this.frontWheelLeft = null;
    this.frontWheelRight = null;
    this.rearWheelLeft = null;
    this.rearWheelRight = null;
    this.flPivot = null;
    this.frPivot = null;
    this.taillightMaterial = null;
    this.headlightMaterial = null;

    this.buildCar();
  }

  buildCar() {
    if (masterFerrariTemplate) {
      this.buildFromOfficialCAD(masterFerrariTemplate);
    } else {
      // Build high-detail procedural mesh first, then replace once CAD parses
      this.buildHighDetailProcedural();
      initFerrariMasterModel().then((template) => {
        if (template && this.mesh) {
          while (this.mesh.children.length > 0) {
            this.mesh.remove(this.mesh.children[0]);
          }
          this.bodyMaterials = [];
          this.tireMeshes = [];
          this.buildFromOfficialCAD(template);
        }
      });
    }
  }

  /**
   * Builds the car using the official 51-mesh CAD Ferrari SF90 model!
   */
  buildFromOfficialCAD(templateScene) {
    const carModel = templateScene.clone(true);

    // 1. PBR Automotive Clearcoat Paint Material
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(this.paintColor),
      metalness: 0.88,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      ior: 1.5,
      reflectivity: 0.95,
      transparent: false,
      opacity: 1.0
    });
    this.bodyMaterials.push(bodyMat);

    // 2. Chrome 5-Star Split-Spoke Forged Alloy Rims (Matches reference image)
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.14
    });

    // 3. Transparent Automotive Glass (Cockpit visible)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.05,
      roughness: 0.02,
      transmission: 0.88,
      ior: 1.52,
      transparent: true,
      opacity: 0.82
    });

    // 4. Yellow Brembo Caliper Material
    const caliperMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.caliperColor),
      metalness: 0.75,
      roughness: 0.25
    });

    // 5. Drilled Carbon-Ceramic Brake Discs
    const brakeDiscMat = new THREE.MeshStandardMaterial({
      color: 0x5a6268,
      metalness: 0.85,
      roughness: 0.35
    });

    // 6. Ferrari Yellow Shield Badges & Center Caps
    const badgeMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      metalness: 0.5,
      roughness: 0.25
    });

    // 7. Carbon Fiber Aerodynamics (Diffusers, Splitters, Side Skirts)
    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x14161a,
      roughness: 0.55,
      metalness: 0.35
    });

    // 8. Vulcanized Rubber Tires (Pirelli P-Zero)
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x181a1e,
      roughness: 0.88,
      metalness: 0.1
    });

    // 9. LED Matrix Headlights
    this.headlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xf8fafc
    });

    // 10. Glowing Taillights
    this.taillightMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff002b,
      emissive: 0x660000,
      emissiveIntensity: 0.8,
      transmission: 0.65,
      roughness: 0.1
    });

    // 11. Cockpit Leather & Alcantara Interior
    const interiorMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.78,
      metalness: 0.1
    });

    // 12. Polished Chrome Trims & Exhausts
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.05
    });

    // 13. Matte Dark Plastic
    const plasticMat = new THREE.MeshStandardMaterial({
      color: 0x16181d,
      roughness: 0.8,
      metalness: 0.1
    });

    // Traverse and assign materials to CAD nodes
    carModel.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;

      const name = (child.name || '').toLowerCase();
      const parentName = (child.parent && child.parent.name ? child.parent.name : '').toLowerCase();
      const allNames = `${name} ${parentName}`.toLowerCase();

      // Priority 1: Ferrari Yellow Badges & Wheel Center Caps
      if (allNames.includes('yellow') || name.includes('yellow') || allNames.includes('centre')) {
        child.material = badgeMat;
      }
      // Priority 2: Exterior Body Paint
      else if (allNames.includes('body') || allNames.includes('paint')) {
        child.material = bodyMat;
      }
      // Priority 3: Windshield & Windows
      else if (allNames.includes('glass') && !allNames.includes('taillight')) {
        child.material = glassMat;
      }
      // Priority 4: 5-Star Metallic Alloy Rims
      else if (name.includes('rim_') || parentName.includes('rim_')) {
        child.material = rimMat;
      }
      // Priority 5: Tires
      else if (allNames.includes('tire')) {
        child.material = tireMat;
      }
      // Priority 6: Brembo Calipers
      else if (name === 'brake' || parentName === 'brake') {
        child.material = caliperMat;
      }
      // Priority 7: Carbon-Ceramic Rotors
      else if (allNames.includes('brakes')) {
        child.material = brakeDiscMat;
      }
      // Priority 8: Chrome & Nuts
      else if (allNames.includes('chrome') || allNames.includes('nuts')) {
        child.material = chromeMat;
      }
      // Priority 9: Taillights
      else if (allNames.includes('taillight') || allNames.includes('lights_red')) {
        child.material = this.taillightMaterial;
      }
      // Priority 10: Headlights & LEDs
      else if (allNames.includes('leds') || allNames.includes('lights') || allNames.includes('projector') || allNames.includes('turn_signal')) {
        child.material = this.headlightMaterial;
      }
      // Priority 11: Interior Cockpit
      else if (allNames.includes('interior_light') || allNames.includes('interior_dark') || allNames.includes('carpet') || allNames.includes('steering_column')) {
        child.material = interiorMat;
      } else if (allNames.includes('leather')) {
        child.material = interiorMat;
      }
      // Priority 12: Plastic & Grilles
      else if (allNames.includes('plastic') || allNames.includes('grills') || allNames.includes('wipers') || allNames.includes('wheel')) {
        child.material = plasticMat;
      }
      // Priority 13: Carbon Fiber Diffusers & Trims
      else {
        child.material = carbonMat;
      }
    });

    // -------------------------------------------------------------
    // Wheel Setup: Steering Pivots for Front Wheels & Spin Nodes
    // -------------------------------------------------------------
    const wheelFL = carModel.getObjectByName('wheel_fl');
    const wheelFR = carModel.getObjectByName('wheel_fr');
    const wheelRL = carModel.getObjectByName('wheel_rl');
    const wheelRR = carModel.getObjectByName('wheel_rr');

    if (wheelFL) {
      this.frontWheelLeft = wheelFL;
      this.tireMeshes.push(wheelFL);

      // Wrap in a Steering Pivot Group
      const flPos = wheelFL.position.clone();
      const pivot = new THREE.Group();
      pivot.name = 'SteerPivot_FL';
      pivot.position.copy(flPos);
      wheelFL.position.set(0, 0, 0);
      if (wheelFL.parent) {
        wheelFL.parent.remove(wheelFL);
      }
      pivot.add(wheelFL);
      carModel.add(pivot);
      this.flPivot = pivot;
    }

    if (wheelFR) {
      this.frontWheelRight = wheelFR;
      this.tireMeshes.push(wheelFR);

      // Wrap in a Steering Pivot Group
      const frPos = wheelFR.position.clone();
      const pivot = new THREE.Group();
      pivot.name = 'SteerPivot_FR';
      pivot.position.copy(frPos);
      wheelFR.position.set(0, 0, 0);
      if (wheelFR.parent) {
        wheelFR.parent.remove(wheelFR);
      }
      pivot.add(wheelFR);
      carModel.add(pivot);
      this.frPivot = pivot;
    }

    if (wheelRL) {
      this.rearWheelLeft = wheelRL;
      this.tireMeshes.push(wheelRL);
    }

    if (wheelRR) {
      this.rearWheelRight = wheelRR;
      this.tireMeshes.push(wheelRR);
    }

    // -------------------------------------------------------------
    // Model-Specific Aerodynamics (Tailored for each car model)
    // -------------------------------------------------------------
    const aeroParts = this.buildModelSpecificAero(this.modelId, carbonMat, bodyMat);
    if (aeroParts) carModel.add(aeroParts);

    // -------------------------------------------------------------
    // Ambient Occlusion Contact Shadow Plane (Ground Shadow)
    // -------------------------------------------------------------
    const shadowTexture = new THREE.TextureLoader().load(FERRARI_AO_BASE64);
    const shadowGeo = new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      blending: THREE.MultiplyBlending,
      toneMapped: false,
      transparent: true,
      opacity: 0.88,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, 0.005, 0.17);
    shadowMesh.renderOrder = 2;
    carModel.add(shadowMesh);

    this.mesh.add(carModel);
  }

  /**
   * Adds iconic aerodynamic wings and styling tailored to the chosen model
   */
  buildModelSpecificAero(modelId, carbonMat, bodyMat) {
    const aeroGroup = new THREE.Group();
    aeroGroup.name = `Aero_${modelId}`;

    if (modelId === 'f40_lm') {
      // Iconic F40 High Boxed Rear Wing
      const uprightMat = carbonMat;
      const wingMat = bodyMat;

      // Twin Uprights
      [-0.78, 0.78].forEach(x => {
        const uprightGeo = new THREE.BoxGeometry(0.05, 0.42, 0.32);
        const upright = new THREE.Mesh(uprightGeo, uprightMat);
        upright.position.set(x, 0.88, 1.88);
        upright.castShadow = true;
        aeroGroup.add(upright);
      });

      // Main Top Airfoil
      const wingGeo = new THREE.BoxGeometry(1.94, 0.05, 0.38);
      const wing = new THREE.Mesh(wingGeo, wingMat);
      wing.position.set(0, 1.08, 1.88);
      wing.rotation.x = -0.06;
      wing.castShadow = true;
      aeroGroup.add(wing);

      // Endplates
      [-0.97, 0.97].forEach(x => {
        const epGeo = new THREE.BoxGeometry(0.04, 0.28, 0.48);
        const ep = new THREE.Mesh(epGeo, wingMat);
        ep.position.set(x, 1.04, 1.88);
        aeroGroup.add(ep);
      });

    } else if (modelId === 'laferrari_xx') {
      // FXX-K Dual Rear Aerodynamic Stabilizer Fins
      [-0.82, 0.82].forEach((x, idx) => {
        const finGeo = new THREE.BoxGeometry(0.04, 0.32, 0.42);
        const fin = new THREE.Mesh(finGeo, carbonMat);
        fin.position.set(x, 0.85, 1.86);
        fin.rotation.y = (idx === 0 ? 0.12 : -0.12);
        fin.rotation.z = (idx === 0 ? -0.14 : 0.14);
        fin.castShadow = true;
        aeroGroup.add(fin);

        const tipGeo = new THREE.BoxGeometry(0.24, 0.03, 0.28);
        const tip = new THREE.Mesh(tipGeo, carbonMat);
        tip.position.set(x + (idx === 0 ? -0.08 : 0.08), 1.0, 1.86);
        aeroGroup.add(tip);
      });

    } else if (modelId === 'gt3_458') {
      // FIA GT3 Swan-Neck High Downforce Wing
      [-0.48, 0.48].forEach(x => {
        const pylonGeo = new THREE.BoxGeometry(0.04, 0.46, 0.24);
        const pylon = new THREE.Mesh(pylonGeo, carbonMat);
        pylon.position.set(x, 0.94, 1.82);
        pylon.rotation.x = 0.22;
        aeroGroup.add(pylon);
      });

      const wingGeo = new THREE.BoxGeometry(1.88, 0.04, 0.38);
      const wing = new THREE.Mesh(wingGeo, carbonMat);
      wing.position.set(0, 1.12, 1.94);
      wing.rotation.x = -0.09;
      wing.castShadow = true;
      aeroGroup.add(wing);

      // Large GT3 Endplates
      [-0.94, 0.94].forEach(x => {
        const epGeo = new THREE.BoxGeometry(0.03, 0.36, 0.48);
        const ep = new THREE.Mesh(epGeo, carbonMat);
        ep.position.set(x, 1.08, 1.94);
        aeroGroup.add(ep);
      });

    } else if (modelId === 'enzo_gt') {
      // Central F1 Shark Fin Stabilizer
      const finGeo = new THREE.BoxGeometry(0.04, 0.28, 1.1);
      const fin = new THREE.Mesh(finGeo, carbonMat);
      fin.position.set(0, 0.92, 1.25);
      fin.castShadow = true;
      aeroGroup.add(fin);

    } else {
      // SF90 Active Shut-off Gurney Flap & Titanium Exhaust Tips
      const flapGeo = new THREE.BoxGeometry(1.18, 0.035, 0.24);
      const flap = new THREE.Mesh(flapGeo, carbonMat);
      flap.position.set(0, 0.73, 1.88);
      flap.castShadow = true;
      aeroGroup.add(flap);
    }

    return aeroGroup;
  }

  /**
   * Procedural fallback used during initial boot before CAD buffer parses
   */
  buildHighDetailProcedural() {
    const carRoot = new THREE.Group();
    const length = 4.65;
    const width = 2.05;

    const paintMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(this.paintColor),
      metalness: 0.88,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      ior: 1.5,
      reflectivity: 0.95
    });
    this.bodyMaterials.push(paintMat);

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x14161a,
      roughness: 0.45,
      metalness: 0.65
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.05,
      roughness: 0.02,
      transmission: 0.88,
      ior: 1.52,
      transparent: true,
      opacity: 0.85
    });

    // Floor Pan
    const floor = new THREE.Mesh(new THREE.BoxGeometry(width * 0.92, 0.06, length * 0.96), carbonMat);
    floor.position.set(0, 0.12, 0.05);
    carRoot.add(floor);

    // Front Splitter
    const splitter = new THREE.Mesh(new THREE.BoxGeometry(width * 0.98, 0.04, 0.55), carbonMat);
    splitter.position.set(0, 0.11, -length * 0.46);
    carRoot.add(splitter);

    // Monocoque Tub
    const tub = new THREE.Mesh(new THREE.BoxGeometry(width * 0.76, 0.28, length * 0.55), paintMat);
    tub.position.set(0, 0.26, 0.05);
    carRoot.add(tub);

    // Hood & Nose
    const hood = new THREE.Mesh(new THREE.BoxGeometry(width * 0.72, 0.16, length * 0.34), paintMat);
    hood.position.set(0, 0.32, -length * 0.28);
    hood.rotation.x = -0.09;
    carRoot.add(hood);

    // Cabin Canopy
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(width * 0.62, 0.34, length * 0.38), glassMat);
    canopy.position.set(0, 0.52, 0.02);
    carRoot.add(canopy);

    // Wheels
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95, roughness: 0.15 });
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x181a1e, roughness: 0.85 });

    const wheelOffsets = [
      { name: 'FL', x: -0.84, z: -1.15, isFront: true },
      { name: 'FR', x: 0.83, z: -1.15, isFront: true },
      { name: 'RL', x: -0.82, z: 1.49, isFront: false },
      { name: 'RR', x: 0.82, z: 1.49, isFront: false }
    ];

    wheelOffsets.forEach(w => {
      const wheelGroup = new THREE.Group();
      wheelGroup.name = `wheel_${w.name.toLowerCase()}`;

      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.28, 24), tireMat);
      tire.rotation.z = Math.PI / 2;
      wheelGroup.add(tire);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.285, 16), rimMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(rim);

      if (w.isFront) {
        const pivot = new THREE.Group();
        pivot.position.set(w.x, 0.36, w.z);
        pivot.add(wheelGroup);
        carRoot.add(pivot);
        if (w.name === 'FL') {
          this.flPivot = pivot;
          this.frontWheelLeft = wheelGroup;
        } else {
          this.frPivot = pivot;
          this.frontWheelRight = wheelGroup;
        }
      } else {
        wheelGroup.position.set(w.x, 0.36, w.z);
        carRoot.add(wheelGroup);
        if (w.name === 'RL') this.rearWheelLeft = wheelGroup;
        else this.rearWheelRight = wheelGroup;
      }
      this.tireMeshes.push(wheelGroup);
    });

    this.mesh.add(carRoot);
  }

  /**
   * Update visual states: wheel spin, front wheel steering angle, and braking lights
   */
  updateVisuals(speedKmh, steerAngle, isBraking = false, dt = 0.016) {
    // 1. Wheel spin rotation based on forward speed
    const spinSpeed = (speedKmh / 3.6) / 0.36; // rad/s = v / r
    const deltaRotation = spinSpeed * dt;
    this.spinWheels(deltaRotation);

    // 2. Front wheel steering pivot
    this.setSteeringAngle(steerAngle);

    // 3. Dynamic Taillight Braking Flare
    this.setBrakeLights(isBraking);
  }

  /**
   * Turns the front wheels smoothly
   */
  setSteeringAngle(angle) {
    if (this.flPivot) this.flPivot.rotation.y = angle;
    if (this.frPivot) this.frPivot.rotation.y = angle;
  }

  /**
   * Spins all 4 wheels
   */
  spinWheels(rotDelta) {
    this.tireMeshes.forEach(wheel => {
      wheel.rotation.x -= rotDelta;
    });
  }

  /**
   * Dynamic taillight brake illumination
   */
  setBrakeLights(isBraking) {
    if (this.taillightMaterial) {
      if (isBraking) {
        this.taillightMaterial.emissiveIntensity = 2.8;
        this.taillightMaterial.color.setHex(0xff002b);
      } else {
        this.taillightMaterial.emissiveIntensity = 0.7;
        this.taillightMaterial.color.setHex(0x880015);
      }
    }
  }

  /**
   * Updates body paint color in real time (for showroom preview)
   */
  setPaintColor(hexColor) {
    this.paintColor = hexColor;
    const c = new THREE.Color(hexColor);
    this.bodyMaterials.forEach(m => {
      m.color.copy(c);
    });
  }
}
