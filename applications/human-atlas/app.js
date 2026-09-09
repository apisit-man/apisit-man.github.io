import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { embeddedModels } from './models-data.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// ============================================================================
// State & Configuration
// ============================================================================
const state = {
  explodeProgress: 0,
  selectedMesh: null,
  hoveredMesh: null,
  isolatedMesh: null,
  activeTab: 'all',
  visibleCount: 2234,
  systems: {
    skeleton: { name: 'Skeleton', count: 206, color: '#94a3b8', visible: true, group: 'skeleton' },
    muscles: { name: 'Muscles', count: 402, color: '#ef4444', visible: true, group: 'muscles' },
    heart: { name: 'Heart & Cardiac', count: 23, color: '#dc2626', visible: true, group: 'organs' },
    sensory: { name: 'Sensory organs', count: 45, color: '#06b6d4', visible: true, group: 'organs' },
    arteries: { name: 'Arteries', count: 639, color: '#e11d48', visible: true, group: 'organs' },
    veins: { name: 'Veins', count: 404, color: '#3b82f6', visible: true, group: 'organs' },
    nervous: { name: 'Nervous system', count: 139, color: '#eab308', visible: true, group: 'organs' },
    respiratory: { name: 'Respiratory', count: 119, color: '#14b8a6', visible: true, group: 'organs' },
    organs: { name: 'Visceral organs', count: 219, color: '#f97316', visible: true, group: 'organs' }
  }
};

const anatomyMeshes = [];
let scene, camera, renderer, controls;
let raycaster, mouse;
let systemGroups = {};
let cameraTargetPos = null;
let cameraTargetLook = null;

// ============================================================================
// Initialization
// ============================================================================
function init() {
  const canvas = document.getElementById('webgl-canvas');
  const viewport = document.getElementById('viewport');

  // Scene
  scene = new THREE.Scene();
  scene.background = null; // transparent to allow css studio gradient

  // Camera
  camera = new THREE.PerspectiveCamera(40, viewport.clientWidth / viewport.clientHeight, 0.1, 50);
  camera.position.set(0, 0.95, 2.7);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(viewport.clientWidth, viewport.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 0.5;
  controls.maxDistance = 5.5;
  controls.target.set(0, 0.92, 0);
  controls.maxPolarAngle = Math.PI / 2 + 0.15; // don't go too far below platform
  controls.addEventListener('start', () => {
    cameraTargetPos = null;
    cameraTargetLook = null;
  });

  // Raycaster
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2(-999, -999);

  // Lighting
  setupLighting();

  // Studio Podium
  setupPodium();

  // Anatomical System Groups
  Object.keys(state.systems).forEach(sysKey => {
    const group = new THREE.Group();
    group.name = `sys_${sysKey}`;
    scene.add(group);
    systemGroups[sysKey] = group;
  });

  // UI Setup & Listeners
  setupEventListeners();

  // Load Full-Body Medical Skeleton as default model
  loadModelPreset('full-body-skeleton');

  // Render loop
  animate();
}

// ============================================================================
// Scene Lighting & Environment
// ============================================================================
function setupLighting() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
  keyLight.position.set(3, 4, 3);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.bias = -0.0001;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.7);
  fillLight.position.set(-3, 2.5, 2);
  scene.add(fillLight);

  const backRimLight = new THREE.DirectionalLight(0xffffff, 0.9);
  backRimLight.position.set(0, 3, -3);
  scene.add(backRimLight);

  const softUnderLight = new THREE.DirectionalLight(0xf1f5f9, 0.4);
  softUnderLight.position.set(0, -2, 0);
  scene.add(softUnderLight);
}

function setupPodium() {
  const podiumGroup = new THREE.Group();
  podiumGroup.position.set(0, 0, 0);

  // Round medical display base
  const diskGeo = new THREE.CylinderGeometry(0.72, 0.76, 0.035, 64);
  const diskMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.35,
    metalness: 0.05
  });
  const disk = new THREE.Mesh(diskGeo, diskMat);
  disk.position.y = -0.018;
  disk.receiveShadow = true;
  podiumGroup.add(disk);

  // Soft glowing outer ring
  const ringGeo = new THREE.RingGeometry(0.76, 0.88, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xdbeafe,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.45
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -0.017;
  podiumGroup.add(ring);

  scene.add(podiumGroup);
}

// ============================================================================
// Procedural Anatomical Model Builder
// ============================================================================
function buildAnatomyModel() {
  // Shared Materials
  const boneMat = new THREE.MeshStandardMaterial({ color: 0xede8dc, roughness: 0.42, metalness: 0.05 });
  const muscleMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.55, metalness: 0.1 });
  const heartMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.3, metalness: 0.15 });
  const arteryMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.25, metalness: 0.1 });
  const veinMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.25, metalness: 0.1 });
  const lungMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.6, transparent: true, opacity: 0.88 });
  const organMat = new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.45, metalness: 0.05 });
  const nerveMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.3, metalness: 0.1 });
  const brainMat = new THREE.MeshStandardMaterial({ color: 0xf3d0bc, roughness: 0.55 });
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1 });

  // --------------------------------------------------------------------------
  // 1. SKELETON
  // --------------------------------------------------------------------------
  // Cranium (Skull)
  registerPart(
    createMesh(new THREE.SphereGeometry(0.095, 24, 20), boneMat, [0, 1.62, 0], [1, 1.15, 1.05]),
    {
      name: 'Cranium (Skull)',
      latin: 'Cranium',
      system: 'skeleton',
      desc: 'Rigid bony framework encasing the brain, supporting facial architecture, and housing primary sensory organs.',
      explodeOffset: [0, 0.45, 0.1]
    }
  );

  // Mandible (Jawbone)
  registerPart(
    createMesh(new THREE.TorusGeometry(0.045, 0.016, 12, 20, Math.PI), boneMat, [0, 1.54, 0.04], [1, 1, 1], [Math.PI/2, 0, 0]),
    {
      name: 'Mandible (Lower Jaw)',
      latin: 'Mandibula',
      system: 'skeleton',
      desc: 'The largest and strongest bone of the human face; forms the lower jaw and holds the lower teeth in place.',
      explodeOffset: [0, 0.35, 0.3]
    }
  );

  // Spine (Vertebral Column)
  const spineGroup = new THREE.Group();
  for (let i = 0; i < 18; i++) {
    const y = 1.44 - i * 0.03;
    const curveZ = Math.sin(i * 0.35) * 0.02 - 0.03;
    const vert = createMesh(new THREE.CylinderGeometry(0.025, 0.027, 0.02, 16), boneMat, [0, y, curveZ]);
    spineGroup.add(vert);
  }
  registerPart(spineGroup, {
    name: 'Vertebral Column (Spine)',
    latin: 'Columna vertebralis',
    system: 'skeleton',
    desc: 'Flexible column of 33 segmented vertebrae protecting the spinal cord and anchoring the thoracic rib cage.',
    explodeOffset: [0, 0, -0.4]
  });

  // Rib Cage & Sternum
  const ribGroup = new THREE.Group();
  // Sternum
  const sternum = createMesh(new THREE.BoxGeometry(0.03, 0.18, 0.015), boneMat, [0, 1.25, 0.12]);
  ribGroup.add(sternum);
  // Rib pairs
  for (let r = 0; r < 8; r++) {
    const y = 1.34 - r * 0.022;
    const radX = 0.11 + r * 0.006;
    const radZ = 0.08 + r * 0.004;
    const leftRib = createRib(radX, radZ, y, true, boneMat);
    const rightRib = createRib(radX, radZ, y, false, boneMat);
    ribGroup.add(leftRib, rightRib);
  }
  registerPart(ribGroup, {
    name: 'Thoracic Cage (Ribs & Sternum)',
    latin: 'Cavea thoracis',
    system: 'skeleton',
    desc: 'Anatomical cage composed of 12 bilateral pairs of ribs protecting vital cardiopulmonary organs.',
    explodeOffset: [0, 0.05, 0.45]
  });

  // Clavicles (Collar bones)
  registerPart(
    createMesh(new THREE.CylinderGeometry(0.012, 0.012, 0.28, 12), boneMat, [0, 1.41, 0.05], [1, 1, 1], [0, 0, Math.PI / 2]),
    {
      name: 'Clavicles (Collar Bones)',
      latin: 'Clavicula',
      system: 'skeleton',
      desc: 'Long S-shaped bones acting as struts connecting the sternum to the shoulder girdles.',
      explodeOffset: [0, 0.25, 0.25]
    }
  );

  // Pelvis
  registerPart(
    createMesh(new THREE.TorusGeometry(0.12, 0.038, 14, 24, Math.PI * 1.2), boneMat, [0, 0.90, -0.01], [1.3, 1, 0.8], [Math.PI * 0.45, 0, 0]),
    {
      name: 'Pelvic Girdle',
      latin: 'Pelvis',
      system: 'skeleton',
      desc: 'Basin-shaped ring of bones connecting the trunk and legs, supporting abdominal weight and protecting pelvic viscera.',
      explodeOffset: [0, -0.15, -0.2]
    }
  );

  // Arms (Humerus, Radius, Ulna)
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    const x = side * 0.24;
    // Humerus
    registerPart(
      createMesh(new THREE.CylinderGeometry(0.018, 0.016, 0.26, 14), boneMat, [x, 1.24, 0]),
      {
        name: `${sideName} Humerus (Arm Bone)`,
        latin: 'Os humeri',
        system: 'skeleton',
        desc: 'Upper arm bone running from shoulder socket to elbow joint.',
        explodeOffset: [side * 0.55, 0.1, 0]
      }
    );
    // Radius & Ulna (Forearm)
    registerPart(
      createMesh(new THREE.CylinderGeometry(0.014, 0.012, 0.24, 14), boneMat, [x * 1.15, 0.95, 0]),
      {
        name: `${sideName} Radius & Ulna (Forearm)`,
        latin: 'Radius et Ulna',
        system: 'skeleton',
        desc: 'Paired parallel bones of the forearm enabling wrist rotation (pronation and supination).',
        explodeOffset: [side * 0.75, 0, 0]
      }
    );
    // Hand
    registerPart(
      createMesh(new THREE.BoxGeometry(0.02, 0.09, 0.04), boneMat, [x * 1.2, 0.77, 0]),
      {
        name: `${sideName} Manus (Hand)`,
        latin: 'Manus',
        system: 'skeleton',
        desc: 'Complex structure composed of 27 carpals, metacarpals, and phalanges.',
        explodeOffset: [side * 0.85, -0.1, 0]
      }
    );
  });

  // Legs (Femur, Tibia, Fibula, Foot)
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    const x = side * 0.11;
    // Femur
    registerPart(
      createMesh(new THREE.CylinderGeometry(0.024, 0.021, 0.38, 16), boneMat, [x, 0.68, 0]),
      {
        name: `${sideName} Femur (Thigh Bone)`,
        latin: 'Os femoris',
        system: 'skeleton',
        desc: 'The longest, heaviest, and strongest tubular bone in the entire human skeleton.',
        explodeOffset: [side * 0.45, -0.15, 0]
      }
    );
    // Patella (Knee)
    registerPart(
      createMesh(new THREE.SphereGeometry(0.022, 14, 14), boneMat, [x, 0.48, 0.035], [1, 1.2, 0.8]),
      {
        name: `${sideName} Patella (Kneecap)`,
        latin: 'Patella',
        system: 'skeleton',
        desc: 'Thick circular-triangular sesamoid bone protecting the knee articulation and enhancing quadriceps leverage.',
        explodeOffset: [side * 0.45, -0.15, 0.35]
      }
    );
    // Tibia & Fibula (Shin)
    registerPart(
      createMesh(new THREE.CylinderGeometry(0.02, 0.015, 0.38, 16), boneMat, [x, 0.26, 0]),
      {
        name: `${sideName} Tibia & Fibula (Lower Leg)`,
        latin: 'Tibia et Fibula',
        system: 'skeleton',
        desc: 'Weight-bearing shin bone paired laterally with the stabilizing fibula.',
        explodeOffset: [side * 0.45, -0.25, 0]
      }
    );
    // Foot
    registerPart(
      createMesh(new THREE.BoxGeometry(0.045, 0.035, 0.14), boneMat, [x, 0.03, 0.03]),
      {
        name: `${sideName} Pes (Foot & Tarsus)`,
        latin: 'Pes',
        system: 'skeleton',
        desc: 'Arched mechanical foundation sustaining bilateral standing equilibrium and locomotion.',
        explodeOffset: [side * 0.45, -0.3, 0.2]
      }
    );
  });

  // --------------------------------------------------------------------------
  // 2. MUSCULAR SYSTEM
  // --------------------------------------------------------------------------
  // Pectoralis Major (Chest)
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    registerPart(
      createMesh(new THREE.BoxGeometry(0.1, 0.1, 0.04), muscleMat, [side * 0.07, 1.28, 0.13], [1, 1, 0.8], [0, 0, side * 0.2]),
      {
        name: `${sideName} Pectoralis Major`,
        latin: 'Musculus pectoralis major',
        system: 'muscles',
        desc: 'Broad, fan-shaped muscle spanning the chest, responsible for flexure, adduction, and internal rotation of the humerus.',
        explodeOffset: [side * 0.35, 0.1, 0.6]
      }
    );
  });

  // Deltoids (Shoulders)
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    registerPart(
      createMesh(new THREE.SphereGeometry(0.055, 16, 14), muscleMat, [side * 0.23, 1.36, 0], [1.1, 1.4, 1.1]),
      {
        name: `${sideName} Deltoid Muscle`,
        latin: 'Musculus deltoideus',
        system: 'muscles',
        desc: 'Triangular muscle capping the glenohumeral joint; prime mover for shoulder abduction.',
        explodeOffset: [side * 0.65, 0.2, 0.1]
      }
    );
  });

  // Biceps Brachii
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    registerPart(
      createMesh(new THREE.CylinderGeometry(0.03, 0.026, 0.18, 14), muscleMat, [side * 0.24, 1.22, 0.02]),
      {
        name: `${sideName} Biceps Brachii`,
        latin: 'Musculus biceps brachii',
        system: 'muscles',
        desc: 'Two-headed anterior arm muscle executing forearm flexion and supination.',
        explodeOffset: [side * 0.7, 0.05, 0.3]
      }
    );
  });

  // Abdominal Rectus (Six-Pack)
  registerPart(
    createMesh(new THREE.BoxGeometry(0.12, 0.24, 0.035), muscleMat, [0, 1.08, 0.11], [1, 1, 0.8]),
    {
      name: 'Rectus Abdominis (Abdominals)',
      latin: 'Musculus rectus abdominis',
      system: 'muscles',
      desc: 'Paired vertical muscle strap flexing the lumbar spine and compressing the abdominal viscera.',
      explodeOffset: [0, 0, 0.65]
    }
  );

  // Quadriceps (Thighs)
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    registerPart(
      createMesh(new THREE.CylinderGeometry(0.05, 0.038, 0.32, 16), muscleMat, [side * 0.11, 0.69, 0.02]),
      {
        name: `${sideName} Quadriceps Femoris`,
        latin: 'Musculus quadriceps femoris',
        system: 'muscles',
        desc: 'Massive four-headed muscle group on the front of the thigh, key extensor of the knee joint.',
        explodeOffset: [side * 0.45, -0.1, 0.55]
      }
    );
  });

  // Gastrocnemius (Calf)
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    registerPart(
      createMesh(new THREE.SphereGeometry(0.042, 14, 14), muscleMat, [side * 0.11, 0.32, -0.025], [1, 1.8, 1.1]),
      {
        name: `${sideName} Gastrocnemius (Calf)`,
        latin: 'Musculus gastrocnemius',
        system: 'muscles',
        desc: 'Powerful superficial calf muscle flexing the foot at the ankle and flexing the leg at the knee.',
        explodeOffset: [side * 0.45, -0.2, -0.45]
      }
    );
  });

  // --------------------------------------------------------------------------
  // 3. HEART & CARDIOVASCULAR
  // --------------------------------------------------------------------------
  const heartMesh = createMesh(new THREE.SphereGeometry(0.045, 18, 18), heartMat, [-0.02, 1.26, 0.05], [1.1, 1.3, 1.0]);
  registerPart(heartMesh, {
    name: 'Human Heart (Myocardium)',
    latin: 'Cor',
    system: 'heart',
    desc: 'Central muscular pump circulating ~5 liters of blood per minute through systemic and pulmonary vasculature.',
    explodeOffset: [-0.25, 0.1, 0.4]
  });

  // Aortic Arch
  const aortaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.02, 1.29, 0.04),
    new THREE.Vector3(-0.01, 1.35, 0.03),
    new THREE.Vector3(0.01, 1.34, -0.01),
    new THREE.Vector3(0.00, 1.10, -0.03),
    new THREE.Vector3(0.00, 0.88, -0.02)
  ]);
  const aortaMesh = new THREE.Mesh(new THREE.TubeGeometry(aortaCurve, 24, 0.012, 12, false), arteryMat.clone());
  registerPart(aortaMesh, {
    name: 'Aorta (Main Systemic Artery)',
    latin: 'Aorta thoracica et abdominalis',
    system: 'arteries',
    desc: 'The largest arterial conduit in the body delivering oxygen-rich systemic blood from the left ventricle.',
    explodeOffset: [0.05, 0.1, 0.25]
  });

  // Common Carotid Arteries (Neck)
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    registerPart(
      createMesh(new THREE.CylinderGeometry(0.006, 0.006, 0.14, 10), arteryMat, [side * 0.025, 1.48, 0.03]),
      {
        name: `${sideName} Common Carotid Artery`,
        latin: 'Arteria carotis communis',
        system: 'arteries',
        desc: 'Major vascular vessel supplying oxygenated blood to the brain, neck, and face.',
        explodeOffset: [side * 0.2, 0.3, 0.3]
      }
    );
  });

  // Femoral Arteries
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    registerPart(
      createMesh(new THREE.CylinderGeometry(0.007, 0.005, 0.38, 10), arteryMat, [side * 0.09, 0.68, 0.01]),
      {
        name: `${sideName} Femoral Artery`,
        latin: 'Arteria femoralis',
        system: 'arteries',
        desc: 'Chief arterial supplier to the lower limb, originating from the external iliac artery.',
        explodeOffset: [side * 0.35, -0.15, 0.2]
      }
    );
  });

  // Vena Cava & Jugular Veins
  const venaCava = createMesh(new THREE.CylinderGeometry(0.011, 0.011, 0.32, 12), veinMat, [0.025, 1.15, -0.01]);
  registerPart(venaCava, {
    name: 'Inferior & Superior Vena Cava',
    latin: 'Vena cava',
    system: 'veins',
    desc: 'Large systemic veins returning deoxygenated blood from the upper and lower body into the right atrium.',
    explodeOffset: [0.15, 0.05, 0.15]
  });

  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    registerPart(
      createMesh(new THREE.CylinderGeometry(0.007, 0.007, 0.14, 10), veinMat, [side * 0.035, 1.48, 0.02]),
      {
        name: `${sideName} Internal Jugular Vein`,
        latin: 'Vena jugularis interna',
        system: 'veins',
        desc: 'Major vein draining blood from the brain, cranial vault, and superficial parts of the face.',
        explodeOffset: [side * 0.25, 0.25, 0.1]
      }
    );
  });

  // --------------------------------------------------------------------------
  // 4. RESPIRATORY SYSTEM
  // --------------------------------------------------------------------------
  // Trachea (Windpipe)
  registerPart(
    createMesh(new THREE.CylinderGeometry(0.014, 0.014, 0.11, 14), boneMat, [0, 1.38, 0.04]),
    {
      name: 'Trachea (Windpipe)',
      latin: 'Trachea',
      system: 'respiratory',
      desc: 'Cartilaginous airway conducting inhaled air into the bronchial tree of the lungs.',
      explodeOffset: [0, 0.2, 0.35]
    }
  );

  // Lungs
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    const lungMesh = createMesh(
      new THREE.SphereGeometry(0.075, 18, 16),
      lungMat,
      [side * 0.08, 1.25, 0.01],
      [0.85, 1.45, 0.9]
    );
    registerPart(lungMesh, {
      name: `${sideName} Lung (Pulmo)`,
      latin: side === -1 ? 'Pulmo sinister' : 'Pulmo dexter',
      system: 'respiratory',
      desc: `${sideName} primary respiratory organ mediating alveolar gas exchange (O2 uptake & CO2 expiration).`,
      explodeOffset: [side * 0.45, 0.1, 0.3]
    });
  });

  // --------------------------------------------------------------------------
  // 5. VISCERAL ORGANS
  // --------------------------------------------------------------------------
  // Liver
  registerPart(
    createMesh(new THREE.SphereGeometry(0.085, 18, 16), organMat, [0.055, 1.12, 0.04], [1.3, 0.8, 1.0]),
    {
      name: 'Liver (Hepar)',
      latin: 'Hepar',
      system: 'organs',
      desc: 'Largest internal metabolic organ; performs detoxification, protein synthesis, and bile production.',
      explodeOffset: [0.35, 0, 0.5]
    }
  );

  // Stomach
  registerPart(
    createMesh(new THREE.SphereGeometry(0.065, 18, 16), organMat, [-0.05, 1.11, 0.03], [0.9, 1.2, 0.9]),
    {
      name: 'Stomach (Gaster)',
      latin: 'Ventriculus / Gaster',
      system: 'organs',
      desc: 'J-shaped muscular organ initiating acid enzymatic digestion of bolus into chyme.',
      explodeOffset: [-0.35, 0, 0.45]
    }
  );

  // Kidneys
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    registerPart(
      createMesh(new THREE.SphereGeometry(0.035, 14, 14), organMat, [side * 0.07, 1.04, -0.04], [0.75, 1.2, 0.8]),
      {
        name: `${sideName} Kidney (Ren)`,
        latin: 'Ren',
        system: 'organs',
        desc: 'Bean-shaped organ filtering waste metabolites, regulating electrolyte balance, and generating urine.',
        explodeOffset: [side * 0.35, -0.05, -0.45]
      }
    );
  });

  // Intestines
  registerPart(
    createMesh(new THREE.TorusGeometry(0.07, 0.038, 14, 20), organMat, [0, 0.98, 0.05], [1.1, 1, 1], [Math.PI/2, 0, 0]),
    {
      name: 'Intestinal Tract (Enteron)',
      latin: 'Intestinum',
      system: 'organs',
      desc: 'Extensive gastrointestinal tubular network absorbing nutrients, water, and electrolytes.',
      explodeOffset: [0, -0.1, 0.55]
    }
  );

  // --------------------------------------------------------------------------
  // 6. NERVOUS SYSTEM
  // --------------------------------------------------------------------------
  // Brain (Cerebrum)
  registerPart(
    createMesh(new THREE.SphereGeometry(0.075, 20, 18), brainMat, [0, 1.64, -0.005], [1, 0.9, 1.15]),
    {
      name: 'Cerebrum (Brain Hemispheres)',
      latin: 'Cerebrum',
      system: 'nervous',
      desc: 'Central neurological epicenter coordinating cognition, perception, voluntary movement, and homeostatic regulation.',
      explodeOffset: [0, 0.55, -0.05]
    }
  );

  // Spinal Cord
  registerPart(
    createMesh(new THREE.CylinderGeometry(0.009, 0.008, 0.55, 12), nerveMat, [0, 1.20, -0.03]),
    {
      name: 'Spinal Cord (Medulla spinalis)',
      latin: 'Medulla spinalis',
      system: 'nervous',
      desc: 'Primary cylindrical conduit transmitting neural impulses between peripheral nerves and the encephalon.',
      explodeOffset: [0, 0.05, -0.55]
    }
  );

  // Sciatic Nerves
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    registerPart(
      createMesh(new THREE.CylinderGeometry(0.004, 0.003, 0.42, 8), nerveMat, [side * 0.07, 0.65, -0.03]),
      {
        name: `${sideName} Sciatic Nerve`,
        latin: 'Nervus ischiadicus',
        system: 'nervous',
        desc: 'The thickest individual peripheral nerve in the human body, innervating the posterior thigh, leg, and foot.',
        explodeOffset: [side * 0.35, -0.1, -0.3]
      }
    );
  });

  // --------------------------------------------------------------------------
  // 7. SENSORY ORGANS
  // --------------------------------------------------------------------------
  [-1, 1].forEach(side => {
    const sideName = side === -1 ? 'Left' : 'Right';
    registerPart(
      createMesh(new THREE.SphereGeometry(0.015, 14, 14), eyeMat, [side * 0.034, 1.63, 0.08]),
      {
        name: `${sideName} Eye (Bulbus oculi)`,
        latin: 'Bulbus oculi',
        system: 'sensory',
        desc: 'Visual sensory organ transducing photoreceptor photon stimuli into electrical retinal signals.',
        explodeOffset: [side * 0.25, 0.4, 0.45]
      }
    );
  });
}

// Helper: Create Rib
function createRib(radX, radZ, y, isLeft, material) {
  const curve = new THREE.EllipseCurve(
    0, 0,
    radX, radZ,
    isLeft ? 0 : Math.PI,
    isLeft ? Math.PI : Math.PI * 2,
    false,
    0
  );
  const points = curve.getPoints(20).map(p => new THREE.Vector3(p.x, y, p.y));
  const ribGeo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 18, 0.005, 8, false);
  return new THREE.Mesh(ribGeo, material.clone());
}

// Helper: Create Mesh with transforms
function createMesh(geometry, material, pos = [0,0,0], scale = [1,1,1], rot = [0,0,0]) {
  const mesh = new THREE.Mesh(geometry, material.clone());
  mesh.position.set(...pos);
  mesh.scale.set(...scale);
  mesh.rotation.set(...rot);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

// Helper: Register Part with metadata & explode offsets
function registerPart(meshOrGroup, meta) {
  meshOrGroup.userData = {
    ...meta,
    assembledPos: meshOrGroup.position.clone(),
    explodedVector: new THREE.Vector3(...(meta.explodeOffset || [0, 0, 0])),
    baseColor: meshOrGroup.material?.color ? meshOrGroup.material.color.clone() : new THREE.Color(0xffffff)
  };

  // Add to system group if not already parented in a hierarchy
  if (!meshOrGroup.parent) {
    if (systemGroups[meta.system]) {
      systemGroups[meta.system].add(meshOrGroup);
    } else {
      scene.add(meshOrGroup);
    }
  }

  anatomyMeshes.push(meshOrGroup);
}

// ============================================================================
// Explode Vector Engine
// ============================================================================
function updateExplode(progress) {
  state.explodeProgress = progress;
  const t = progress / 100;

  anatomyMeshes.forEach(mesh => {
    const assembled = mesh.userData.assembledPos;
    const offset = mesh.userData.explodedVector;
    
    mesh.position.x = assembled.x + offset.x * t;
    mesh.position.y = assembled.y + offset.y * t;
    mesh.position.z = assembled.z + offset.z * t;
  });

  // Update UI text
  const percentEl = document.getElementById('explode-percent');
  const stateTextEl = document.getElementById('assembly-state-text');
  percentEl.textContent = `${Math.round(progress)}%`;

  if (progress === 0) {
    stateTextEl.textContent = 'Assembled';
  } else if (progress < 50) {
    stateTextEl.textContent = 'Partial expansion';
  } else if (progress < 90) {
    stateTextEl.textContent = 'Layer separation';
  } else {
    stateTextEl.textContent = 'Full anatomical explosion';
  }
}

// ============================================================================
// UI & Event Handlers
// ============================================================================
function initUI() {
  const systemsList = document.getElementById('systems-list');
  systemsList.innerHTML = '';

  const badgeEl = document.getElementById('systems-count-badge');
  if (badgeEl) badgeEl.textContent = Object.keys(state.systems).length;

  Object.entries(state.systems).forEach(([sysKey, sysData]) => {
    const row = document.createElement('div');
    row.className = 'system-row';
    row.dataset.system = sysKey;
    row.dataset.group = sysData.group;

    row.innerHTML = `
      <div class="system-meta">
        <span class="system-dot" style="background-color: ${sysData.color}"></span>
        <span class="system-name">${sysData.name}</span>
      </div>
      <div class="system-count-wrap">
        <span class="system-count">${sysData.count}</span>
        <label class="switch">
          <input type="checkbox" checked data-sys-toggle="${sysKey}">
          <span class="slider-toggle"></span>
        </label>
      </div>
    `;
    systemsList.appendChild(row);
  });

  updateVisibleCount();
}

function updateVisibleCount() {
  let count = 0;
  Object.entries(state.systems).forEach(([key, sys]) => {
    if (sys.visible) count += sys.count;
  });
  state.visibleCount = count;
  const countEl = document.getElementById('visible-parts-count');
  if (countEl) countEl.textContent = `${count.toLocaleString()} pieces visible`;
}

function setupEventListeners() {
  const canvas = document.getElementById('webgl-canvas');
  const explodeSlider = document.getElementById('explode-slider');
  const btnExplodeReset = document.getElementById('btn-explode-reset');
  const btnToggleAll = document.getElementById('btn-toggle-all');
  const filterTabs = document.querySelectorAll('.tab-btn');
  const cameraBtns = document.querySelectorAll('[data-cam]');
  const btnCamReset = document.getElementById('btn-cam-reset');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const searchInput = document.getElementById('structure-search');
  const searchDropdown = document.getElementById('search-dropdown');
  const btnInfo = document.getElementById('btn-info');
  const infoDialog = document.getElementById('info-dialog');
  const btnCloseDialog = document.getElementById('btn-close-dialog');
  const fileImporter = document.getElementById('file-importer');
  const btnCloseInspect = document.getElementById('btn-close-inspect');
  const btnIsolatePart = document.getElementById('btn-isolate-part');
  const btnFocusPart = document.getElementById('btn-focus-part');
  const modelSelector = document.getElementById('model-selector');

  // Model Preset Selector
  if (modelSelector) {
    modelSelector.addEventListener('change', (e) => {
      loadModelPreset(e.target.value);
    });
  }

  // Explode slider
  explodeSlider.addEventListener('input', (e) => {
    updateExplode(parseFloat(e.target.value));
  });

  btnExplodeReset.addEventListener('click', () => {
    explodeSlider.value = 0;
    updateExplode(0);
  });

  // Systems toggles
  document.getElementById('systems-list').addEventListener('change', (e) => {
    if (e.target.matches('[data-sys-toggle]')) {
      const sysKey = e.target.dataset.sysToggle;
      const isChecked = e.target.checked;
      state.systems[sysKey].visible = isChecked;

      if (systemGroups[sysKey]) {
        systemGroups[sysKey].visible = isChecked;
      }
      anatomyMeshes.forEach(m => {
        if (m.userData.system === sysKey) {
          m.visible = isChecked;
        }
      });
      updateVisibleCount();
    }
  });

  // Toggle All
  let allHidden = false;
  btnToggleAll.addEventListener('click', () => {
    allHidden = !allHidden;
    btnToggleAll.textContent = allHidden ? 'Show all' : 'Hide all';

    Object.keys(state.systems).forEach(key => {
      state.systems[key].visible = !allHidden;
      if (systemGroups[key]) systemGroups[key].visible = !allHidden;
      anatomyMeshes.forEach(m => {
        if (m.userData.system === key) {
          m.visible = !allHidden;
        }
      });
      const checkbox = document.querySelector(`[data-sys-toggle="${key}"]`);
      if (checkbox) checkbox.checked = !allHidden;
    });
    updateVisibleCount();
  });

  // Filter Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabMode = tab.dataset.tab;

      const rows = document.querySelectorAll('.system-row');
      rows.forEach(row => {
        const sysGroup = row.dataset.group;
        if (tabMode === 'all') {
          row.style.display = 'flex';
        } else if (tabMode === sysGroup) {
          row.style.display = 'flex';
        } else if (tabMode === 'axial' && (sysGroup === 'axial' || sysGroup === 'skeleton')) {
          row.style.display = 'flex';
        } else if (tabMode === 'appendicular' && (sysGroup === 'appendicular' || sysGroup === 'organs' || sysGroup === 'muscles')) {
          row.style.display = 'flex';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // Camera presets
  cameraBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cameraBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.cam;

      if (mode === 'front') tweenCamera([0, 0.95, 2.7], [0, 0.92, 0]);
      else if (mode === 'side') tweenCamera([2.6, 0.95, 0], [0, 0.92, 0]);
      else if (mode === 'back') tweenCamera([0, 0.95, -2.7], [0, 0.92, 0]);
      else if (mode === 'iso') tweenCamera([1.8, 1.4, 2.0], [0, 0.92, 0]);
    });
  });

  btnCamReset.addEventListener('click', () => {
    tweenCamera([0, 0.95, 2.7], [0, 0.92, 0]);
  });

  // Fullscreen
  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  // Mouse move for Raycast Hover
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    handleRaycastHover(e.clientX, e.clientY);
  });

  // Click for Inspection
  canvas.addEventListener('click', (e) => {
    handleRaycastClick();
  });

  // Close inspection
  btnCloseInspect.addEventListener('click', () => {
    closeInspectCard();
  });

  btnIsolatePart.addEventListener('click', () => {
    if (!state.selectedMesh) return;
    toggleIsolatePart(state.selectedMesh);
  });

  btnFocusPart.addEventListener('click', () => {
    if (!state.selectedMesh) return;
    focusOnMesh(state.selectedMesh, true);
  });

  // Search
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      searchDropdown.classList.add('hidden');
      return;
    }

    const matches = anatomyMeshes.filter(m => 
      m.userData.name.toLowerCase().includes(query) || 
      m.userData.latin.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
      searchDropdown.innerHTML = matches.slice(0, 8).map(m => `
        <div class="search-item" data-part-name="${m.userData.name}">
          <span>${m.userData.name}</span>
          <span class="search-item-system">${m.userData.system}</span>
        </div>
      `).join('');
      searchDropdown.classList.remove('hidden');
    } else {
      searchDropdown.innerHTML = `<div style="padding:8px 12px; font-size:12px; color:#94a3b8;">No structures found</div>`;
      searchDropdown.classList.remove('hidden');
    }
  });

  searchDropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.search-item');
    if (!item) return;
    const name = item.dataset.partName;
    const mesh = anatomyMeshes.find(m => m.userData.name === name);
    if (mesh) {
      selectPart(mesh);
      searchInput.value = '';
      searchDropdown.classList.add('hidden');
      focusOnMesh(mesh, true);
    }
  });

  // Regional Quick-Jump Presets Bar
  const dock = document.getElementById('region-quick-dock');
  if (dock) {
    dock.addEventListener('click', (e) => {
      const btn = e.target.closest('.dock-btn');
      if (!btn) return;
      jumpToRegion(btn.dataset.region);
    });
  }

  // Lab Spotter Quiz Listeners
  const btnQuizToggle = document.getElementById('btn-quiz-toggle');
  if (btnQuizToggle) {
    btnQuizToggle.addEventListener('click', () => {
      if (quizState.active) {
        exitSpotterQuiz();
      } else {
        startSpotterQuiz();
      }
    });
  }

  const btnQuizClose = document.getElementById('btn-quiz-close');
  if (btnQuizClose) {
    btnQuizClose.addEventListener('click', exitSpotterQuiz);
  }

  const btnQuizNext = document.getElementById('btn-quiz-next');
  if (btnQuizNext) {
    btnQuizNext.addEventListener('click', () => {
      loadQuizStation(quizState.currentIndex + 1);
    });
  }

  const btnQuizRestart = document.getElementById('btn-quiz-restart');
  if (btnQuizRestart) {
    btnQuizRestart.addEventListener('click', startSpotterQuiz);
  }

  const btnQuizFinish = document.getElementById('btn-quiz-finish');
  if (btnQuizFinish) {
    btnQuizFinish.addEventListener('click', exitSpotterQuiz);
  }

  // Global Key shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === 'Escape') {
      closeInspectCard();
      searchDropdown.classList.add('hidden');
      infoDialog.close();
      if (quizState.active) exitSpotterQuiz();
    }
  });

  // Info Dialog
  btnInfo.addEventListener('click', () => infoDialog.showModal());
  btnCloseDialog.addEventListener('click', () => infoDialog.close());

  // 3D File Drag & Drop / File Input
  fileImporter.addEventListener('change', handleFileUpload);
  window.addEventListener('dragover', (e) => e.preventDefault());
  window.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      loadGLBFile(e.dataTransfer.files[0]);
    }
  });

  // Window resize
  window.addEventListener('resize', onWindowResize);
}

// ============================================================================
// Raycasting & Interaction
// ============================================================================
function handleRaycastHover(clientX, clientY) {
  const tooltip = document.getElementById('hover-tooltip');
  raycaster.setFromCamera(mouse, camera);

  // Filter only visible meshes
  const visibleMeshes = [];
  anatomyMeshes.forEach(obj => {
    if (obj.isMesh && obj.visible && (!obj.parent || obj.parent.visible)) {
      visibleMeshes.push(obj);
    } else if (obj.isGroup && obj.visible && (!obj.parent || obj.parent.visible)) {
      obj.traverse(child => {
        if (child.isMesh) visibleMeshes.push(child);
      });
    }
  });

  const intersects = raycaster.intersectObjects(visibleMeshes, false);

  if (intersects.length > 0) {
    let hitMesh = intersects[0].object;
    // Find parent registered part if inside a group
    let registeredPart = anatomyMeshes.find(m => m === hitMesh || (m.isGroup && m.children.includes(hitMesh)));
    const target = registeredPart || hitMesh;

    if (state.hoveredMesh !== target) {
      if (state.hoveredMesh && state.hoveredMesh !== state.selectedMesh) {
        unhighlightMesh(state.hoveredMesh);
      }
      state.hoveredMesh = target;
      if (target !== state.selectedMesh) {
        highlightMesh(target);
      }
    }

    document.body.style.cursor = 'pointer';
    tooltip.textContent = target.userData?.name || 'Anatomical Structure';
    tooltip.style.left = `${clientX}px`;
    tooltip.style.top = `${clientY}px`;
    tooltip.classList.remove('hidden');
  } else {
    if (state.hoveredMesh && state.hoveredMesh !== state.selectedMesh) {
      unhighlightMesh(state.hoveredMesh);
    }
    state.hoveredMesh = null;
    document.body.style.cursor = 'default';
    tooltip.classList.add('hidden');
  }
}

function handleRaycastClick() {
  if (state.hoveredMesh) {
    selectPart(state.hoveredMesh);
  }
}

function selectPart(part) {
  if (state.selectedMesh && state.selectedMesh !== part) {
    unhighlightMesh(state.selectedMesh);
  }

  state.selectedMesh = part;
  highlightMesh(part, true);
  showInspectCard(part);
}

function highlightMesh(part, isSelected = false) {
  const highlightColor = isSelected ? new THREE.Color(0x38bdf8) : new THREE.Color(0xfde047);

  const apply = (m) => {
    if (m.material) {
      m.material.emissive = highlightColor;
      m.material.emissiveIntensity = isSelected ? 0.45 : 0.25;
    }
  };

  if (part.isMesh) apply(part);
  else if (part.isGroup) part.traverse(child => { if (child.isMesh) apply(child); });
}

function unhighlightMesh(part) {
  const restore = (m) => {
    if (m.material) {
      m.material.emissive = new THREE.Color(0x000000);
      m.material.emissiveIntensity = 0;
    }
  };

  if (part.isMesh) restore(part);
  else if (part.isGroup) part.traverse(child => { if (child.isMesh) restore(child); });
}

// ============================================================================
// Medical Student Knowledge Base: Landmarks, Clinical Pearls & Thai Nomenclature
// ============================================================================
function getMedicalDetails(name, category) {
  const n = (name || '').toLowerCase();
  
  // Femur
  if (n.includes('femur')) {
    return {
      thai: 'กระดูกต้นขา (Femur)',
      landmarks: ['Greater trochanter', 'Lesser trochanter', 'Intertrochanteric crest', 'Linea aspera', 'Fovea capitis', 'Adductor tubercle'],
      clinical: 'Femoral neck fractures in elderly jeopardize medial circumflex femoral artery → high risk of Avascular Necrosis (AVN). Spiral shaft fractures risk massive blood loss (up to 1.5 L into thigh compartment).'
    };
  }
  // Patella
  if (n.includes('patella')) {
    return {
      thai: 'กระดูกสะบ้า (Patella)',
      landmarks: ['Base (superior)', 'Apex (inferior)', 'Articular facets (medial/lateral)'],
      clinical: 'Largest sesamoid bone in human body, embedded in quadriceps tendon. Lateral dislocation is most common due to Q-angle and vector of vastus lateralis.'
    };
  }
  // Tibia
  if (n.includes('tibia')) {
    return {
      thai: 'กระดูกหน้าแข้ง (Tibia)',
      landmarks: ['Tibial plateau', 'Tibial tuberosity (patellar tendon insertion)', 'Anterior border (shin)', 'Medial malleolus', 'Soleal line'],
      clinical: 'Tibial tuberosity avulsion occurs in adolescents (Osgood-Schlatter disease). Tibial shaft is most common site for open (compound) fractures and acute compartment syndrome.'
    };
  }
  // Fibula
  if (n.includes('fibula')) {
    return {
      thai: 'กระดูกน่อง (Fibula)',
      landmarks: ['Head of fibula', 'Neck of fibula', 'Shaft', 'Lateral malleolus'],
      clinical: 'Fracture of the neck of fibula frequently lacerates/compresses the Common Fibular (Peroneal) Nerve → leads to Foot Drop (loss of dorsiflexion & eversion, steppage gait).'
    };
  }
  // Humerus
  if (n.includes('humerus')) {
    return {
      thai: 'กระดูกต้นแขน (Humerus)',
      landmarks: ['Head', 'Anatomical neck', 'Surgical neck', 'Greater/Lesser tubercles', 'Radial groove', 'Medial/Lateral epicondyles', 'Trochlea & Capitulum'],
      clinical: 'Classic ARM fractures: Surgical neck → Axillary nerve; Midshaft → Radial nerve (wrist drop); Supracondylar → Median nerve & Brachial artery; Medial epicondyle → Ulnar nerve.'
    };
  }
  // Radius
  if (n.includes('radius')) {
    return {
      thai: 'กระดูกเรเดียส / ปลายแขนด้านนอก (Radius)',
      landmarks: ['Radial head', 'Radial neck', 'Radial tuberosity (biceps insertion)', 'Styloid process', "Lister's tubercle", 'Ulnar notch'],
      clinical: "FOOSH injury causes Colles' fracture (dinner fork deformity with dorsal displacement). Lister's tubercle serves as a pulley for the Extensor Pollicis Longus (EPL) tendon."
    };
  }
  // Ulna
  if (n.includes('ulna')) {
    return {
      thai: 'กระดูกอัลนา / ปลายแขนด้านใน (Ulna)',
      landmarks: ['Olecranon process', 'Coronoid process', 'Trochlear notch', 'Radial notch', 'Ulnar tuberosity', 'Styloid process'],
      clinical: 'Olecranon fracture disrupts triceps extension mechanism. Nightstick fracture = isolated ulnar midshaft fracture from direct defensive blow.'
    };
  }
  // Clavicle
  if (n.includes('clavicle')) {
    return {
      thai: 'กระดูกไหปลาร้า (Clavicle)',
      landmarks: ['Sternal end', 'Acromial end', 'Conoid tubercle', 'Trapezoid line', 'Subclavian groove'],
      clinical: 'Most commonly fractured bone in the body, typically at junction of middle and lateral thirds. Fragment displacement risks puncture of subclavian vessels and brachial plexus trunks.'
    };
  }
  // Scapula
  if (n.includes('scapula')) {
    return {
      thai: 'กระดูกสะบัก (Scapula)',
      landmarks: ['Spine of scapula', 'Acromion process', 'Coracoid process', 'Glenoid cavity', 'Supraspinous / Infraspinous / Subscapular fossae'],
      clinical: 'Winging of scapula occurs with Long Thoracic Nerve lesion (denervating Serratus Anterior). Coracoid process anchors Pectoralis minor, Coracobrachialis, and Short head of Biceps.'
    };
  }
  // Scaphoid
  if (n.includes('scaphoid')) {
    return {
      thai: 'กระดูกสแคฟอยด์ / กระดูกรูปเรือ (Scaphoid)',
      landmarks: ['Tubercle of scaphoid', 'Waist of scaphoid', 'Proximal pole', 'Articular facets for radius & trapezium'],
      clinical: 'Most frequently fractured carpal bone (FOOSH). Palpable tenderness in Anatomical Snuffbox. High risk of Avascular Necrosis (AVN) of proximal pole due to retrograde blood supply from radial artery.'
    };
  }
  // Lunate
  if (n.includes('lunate')) {
    return {
      thai: 'กระดูกลูเนต / กระดูกพระจันทร์เสี้ยว (Lunate)',
      landmarks: ['Proximal convex articular surface', 'Distal concave surface for capitate'],
      clinical: 'Most commonly dislocated carpal bone; anterior displacement into carpal tunnel compresses the Median Nerve (acute carpal tunnel syndrome). Avascular necrosis = Kienböck disease.'
    };
  }
  // Triquetrum
  if (n.includes('triquetrum')) {
    return {
      thai: 'กระดูกไตรควิทรัม / กระดูกสามเหลี่ยม (Triquetrum)',
      landmarks: ['Oval facet for pisiform', 'Pyramidal body'],
      clinical: 'Second most common carpal fracture (usually dorsal chip fracture from forced hyperflexion).'
    };
  }
  // Pisiform
  if (n.includes('pisiform')) {
    return {
      thai: 'กระดูกพิสิฟอร์ม / กระดูกถั่ว (Pisiform)',
      landmarks: ['Articular facet for triquetrum', 'Free palmar projection'],
      clinical: "Sesamoid bone embedded within Flexor Carpi Ulnaris (FCU) tendon; forms medial boundary of Guyon's canal transmitting ulnar nerve and artery."
    };
  }
  // Hamate
  if (n.includes('hamate')) {
    return {
      thai: 'กระดูกฮาเมต (Hamate)',
      landmarks: ['Hook of hamate (Hamulus)', 'Articular surfaces for 4th & 5th metacarpals'],
      clinical: "Fracture of hook of hamate occurs in golfers, baseball batters, or racquet players. May injure deep branch of Ulnar Nerve or Ulnar Artery in Guyon's canal."
    };
  }
  // Capitate
  if (n.includes('capitate')) {
    return {
      thai: 'กระดูกแคปิเตต (Capitate)',
      landmarks: ['Head of capitate', 'Neck', 'Body'],
      clinical: 'Largest carpal bone, occupies central position of the wrist; keystones the transverse and longitudinal carpal arches.'
    };
  }
  // Trapezium
  if (n.includes('trapezium')) {
    return {
      thai: 'กระดูกทราพีเซียม (Trapezium)',
      landmarks: ['Saddle-shaped facet for 1st metacarpal', 'Trapezium tubercle', 'Groove for FCR'],
      clinical: 'Saddle joint with first metacarpal allows thumb opposition. Most common site of wrist osteoarthritis (basal thumb arthritis).'
    };
  }
  // Trapezoid
  if (n.includes('trapezoid')) {
    return {
      thai: 'กระดูกทราพีซอยด์ (Trapezoid)',
      landmarks: ['Wedge-shaped body', 'Facet for 2nd metacarpal'],
      clinical: 'Deepest and least mobile carpal bone, nestled securely in distal carpal row.'
    };
  }
  // Talus
  if (n.includes('talus')) {
    return {
      thai: 'กระดูกทาลัส / กระดูกข้อเท้า (Talus)',
      landmarks: ['Trochlea tali (articular dome)', 'Head of talus', 'Neck of talus', 'Lateral & posterior processes', 'Sulcus tali'],
      clinical: 'Only bone with no direct muscular or tendinous attachments. Snowboarder fracture = lateral process fracture. Talus neck fracture has high incidence of AVN (Hawkins classification).'
    };
  }
  // Calcaneus
  if (n.includes('calcaneus')) {
    return {
      thai: 'กระดูกส้นเท้า (Calcaneus)',
      landmarks: ['Calcaneal tuberosity', 'Sustentaculum tali', 'Peroneal trochlea', 'Articular facets for talus & cuboid'],
      clinical: "Largest tarsal bone. 'Lover fracture' / Don Juan fracture from jumping from heights (axial load) — often associated with lumbar burst fractures (L1). Evaluated via Böhler angle (< 20° indicates compression)."
    };
  }
  // Navicular
  if (n.includes('navicular')) {
    return {
      thai: 'กระดูกรูปเรือเท้า (Navicular)',
      landmarks: ['Tuberosity of navicular (Tibialis posterior insertion)'],
      clinical: 'Keystone of medial longitudinal foot arch. Accessory navicular bone can cause chronic midfoot pain.'
    };
  }
  // Cuboid
  if (n.includes('cuboid')) {
    return {
      thai: 'กระดูกคิวบอยด์ (Cuboid)',
      landmarks: ['Tuberosity of cuboid', 'Groove for Fibularis longus tendon'],
      clinical: 'Supports lateral longitudinal arch; serves as pulley for Fibularis (Peroneus) longus tendon passing across sole.'
    };
  }
  // Atlas C1
  if (n.includes('atlas')) {
    return {
      thai: 'กระดูกสันหลังคอชิ้นที่ 1 / แอตลาส (Atlas - C1)',
      landmarks: ['Anterior arch & tubercle', 'Posterior arch & groove for vertebral artery', 'Lateral masses & superior articular facets (kidney-shaped)', 'Transverse foramen'],
      clinical: 'No vertebral body or spinous process. Jefferson fracture = burst fracture of anterior and posterior arches from axial blow (e.g. diving into shallow water). Transverse ligament holds dens.'
    };
  }
  // Axis C2
  if (n.includes('axis')) {
    return {
      thai: 'กระดูกสันหลังคอชิ้นที่ 2 / แอกซิส (Axis - C2)',
      landmarks: ['Odontoid process (Dens)', 'Bifid spinous process', 'Superior articular facets', 'Transverse foramen'],
      clinical: "Hangman fracture = traumatic spondylolisthesis of C2 (fracture of pars interarticularis) from forceful hyperextension. Odontoid fractures (Anderson-D'Alonzo Type II is most prone to nonunion)."
    };
  }
  // Vertebra / Spine
  if (n.includes('vertebra') || n.includes('lumbar') || n.includes('cervical') || n.includes('thoracic vertebra')) {
    return {
      thai: 'กระดูกสันหลัง (Vertebra)',
      landmarks: ['Vertebral body', 'Vertebral arch (pedicles & laminae)', 'Spinous process', 'Transverse processes', 'Superior/Inferior articular facets'],
      clinical: 'Lumbar disc herniation (most common at L4-L5 and L5-S1) compresses exiting nerve roots, causing sciatica and radiculopathy. Spondylolysis affects pars interarticularis (Scotty dog with collar).'
    };
  }
  // Sacrum
  if (n.includes('sacrum')) {
    return {
      thai: 'กระดูกกระเบนเหน็บ (Sacrum)',
      landmarks: ['Sacral promontory', 'Sacral canal', 'Anterior/Posterior sacral foramina', 'Auricular surface (SI joint)', 'Median sacral crest'],
      clinical: 'Formed by fusion of 5 sacral vertebrae. Sacral fractures risk injuring sacral plexus roots (S1-S4) leading to neurogenic bladder and bowel dysfunction.'
    };
  }
  // Coccyx
  if (n.includes('coccyx')) {
    return {
      thai: 'กระดูกก้นกบ (Coccyx)',
      landmarks: ['Coccygeal cornua', 'Transverse processes'],
      clinical: 'Vestigial tailbone formed of 3-5 fused segments; serves as anchor for Levator ani and Gluteus maximus. Coccydynia results from falls on buttocks or childbirth.'
    };
  }
  // Sternum
  if (n.includes('sternum') || n.includes('manubrium') || n.includes('xiphoid')) {
    return {
      thai: 'กระดูกสันอก (Sternum)',
      landmarks: ['Manubrium', 'Sternal angle (Angle of Louis)', 'Body of sternum', 'Xiphoid process', 'Jugular/Clavicular notches'],
      clinical: 'Sternal Angle (Angle of Louis at T4/T5 level) is a critical landmark: 2nd costal cartilage, tracheal bifurcation (carina), aortic arch origin/termination, and azygos vein entry to SVC.'
    };
  }
  // Rib
  if (n.includes('rib') || n.includes('costa')) {
    return {
      thai: 'กระดูกซี่โครง (Rib)',
      landmarks: ['Head (2 articular demifacets)', 'Neck', 'Tubercle', 'Angle', 'Costal groove (houses VAN: Vein, Artery, Nerve)'],
      clinical: 'Costal groove on inferior border protects Intercostal VAN (thoracocentesis needle must be placed over superior border of lower rib!). Flail chest occurs when ≥ 3 adjacent ribs are fractured in ≥ 2 places.'
    };
  }
  // Frontal
  if (n.includes('frontal')) {
    return {
      thai: 'กระดูกหน้าผาก (Frontal bone)',
      landmarks: ['Supraorbital margin & foramen/notch', 'Glabella', 'Frontal sinus', 'Zygomatic process of frontal bone'],
      clinical: 'Forms roof of orbits and anterior cranial fossa floor. Frontal sinus infection can erode into anterior cranial fossa or orbit.'
    };
  }
  // Parietal
  if (n.includes('parietal')) {
    return {
      thai: 'กระดูกข้างขม่อม (Parietal bone)',
      landmarks: ['Sagittal border', 'Coronal border', 'Lambdoid border', 'Squamosal border', 'Parietal eminence'],
      clinical: 'Forms calvarial vertex. Parietal skull fracture crossing meningeal grooves can lacerate middle meningeal vessels.'
    };
  }
  // Temporal
  if (n.includes('temporal')) {
    return {
      thai: 'กระดูกขมับ (Temporal bone)',
      landmarks: ['Squamous part', 'Petrous part (houses inner ear/cochlea)', 'Mastoid process', 'Styloid process', 'Zygomatic process', 'Carotid canal', 'Jugular fossa'],
      clinical: 'Pterion is the thin junction of frontal, parietal, sphenoid, and temporal bones overlying the Middle Meningeal Artery → blunt trauma causes Epidural Hematoma (lucid interval, lentiform CT).'
    };
  }
  // Occipital
  if (n.includes('occipital')) {
    return {
      thai: 'กระดูกท้ายทอย (Occipital bone)',
      landmarks: ['Foramen magnum', 'Occipital condyles (articulates with C1 atlas)', 'External occipital protuberance (Inion)', 'Superior/Inferior nuchal lines', 'Hypoglossal canal'],
      clinical: 'Foramen magnum transmits medulla oblongata, vertebral arteries, and spinal roots of CN XI. Tonsillar herniation (Chiari malformation or intracranial mass effect) compresses respiratory center in medulla.'
    };
  }
  // Sphenoid
  if (n.includes('sphenoid')) {
    return {
      thai: 'กระดูกสฟีนอยด์ / กระดูกรูปลิ่ม (Sphenoid bone)',
      landmarks: ['Body & Sella turcica (houses pituitary gland)', 'Greater & Lesser wings', 'Optic canal', 'Superior orbital fissure', 'Foramen rotundum, ovale, spinosum'],
      clinical: 'Keystone bone of the skull base. Pituitary adenoma expands sella turcica, compressing optic chiasm causing Bitemporal Hemianopsia. Middle meningeal artery passes through Foramen spinosum.'
    };
  }
  // Ethmoid
  if (n.includes('ethmoid')) {
    return {
      thai: 'กระดูกเอทมอยด์ (Ethmoid bone)',
      landmarks: ['Cribriform plate (perforations for CN I olfactory fibers)', 'Crista galli', 'Perpendicular plate (bony nasal septum)', 'Superior & Middle nasal conchae'],
      clinical: 'Fracture of the cribriform plate from midface trauma causes CSF rhinorrhea (clear fluid dripping from nose testing positive for beta-2 transferrin) and anosmia.'
    };
  }
  // Mandible
  if (n.includes('mandib')) {
    return {
      thai: 'กระดูกขากรรไกรล่าง (Mandible)',
      landmarks: ['Body', 'Ramus', 'Condylar process (TMJ joint)', 'Coronoid process', 'Mental foramen', 'Mandibular foramen (inferior alveolar nerve)'],
      clinical: 'Only mobile bone of skull. Dental anesthesia targets inferior alveolar nerve at mandibular foramen before dental procedures. Mandibular fractures are often bilateral (ring principle).'
    };
  }
  // Maxilla
  if (n.includes('maxilla')) {
    return {
      thai: 'กระดูกขากรรไกรบน (Maxilla)',
      landmarks: ['Alveolar process (upper teeth)', 'Palatine process (hard palate)', 'Infraorbital foramen', 'Maxillary sinus (largest paranasal sinus)'],
      clinical: 'Midfacial fracture patterns classified by Le Fort system (Type I, II, III). Maxillary sinusitis is most common paranasal sinus infection due to high, non-dependent ostium.'
    };
  }
  // Pelvis / Hip
  if (n.includes('hip') || n.includes('ilium') || n.includes('ischium') || n.includes('pubis') || n.includes('pelvi') || n.includes('acetabul') || n.includes('innominate')) {
    return {
      thai: 'กระดูกเชิงกราน / อุ้งเชิงกราน (Pelvic Girdle & Os Coxae)',
      landmarks: ['Iliac crest', 'ASIS (Anterior Superior Iliac Spine)', 'AIIS', 'Ischial tuberosity (hamstring origin)', 'Ischial spine', 'Acetabulum', 'Pubic symphysis'],
      clinical: 'Open-book pelvic fractures disrupt pelvic ring, causing massive life-threatening retroperitoneal bleeding from internal iliac venous plexus and superior gluteal artery. Pelvic binder is essential.'
    };
  }

  // Default fallback for any category
  const catNames = {
    skull: 'กะโหลกศีรษะและใบหน้า (Cranium & Facial Skeleton)',
    spine: 'แนวกระดูกสันหลัง (Vertebral Column)',
    thorax: 'กรงอกและซี่โครง (Thoracic Cage)',
    upper_limbs: 'ระยางค์แขนและหัวไหล่ (Upper Extremity)',
    hands: 'มือและกระดูกข้อมือ (Manus & Carpal Bones)',
    lower_limbs: 'กระดูกขาและเชิงกราน (Lower Extremity & Pelvis)',
    feet: 'เท้าและกระดูกข้อเท้า (Pes & Tarsal Bones)'
  };

  return {
    thai: catNames[category] || 'ชิ้นส่วนทางกายวิภาคศาสตร์ (Anatomical Structure)',
    landmarks: ['Articular surface', 'Cortical bone', 'Muscular/ligamentous attachment'],
    clinical: 'Standard anatomical structure documented in Terminologia Anatomica and evaluated in Gross Anatomy Spotter exams.'
  };
}

function showInspectCard(part) {
  const card = document.getElementById('inspect-card');
  const meta = part.userData || {};

  const systemDisplayNames = {
    skull: 'CRANIUM & FACIAL',
    spine: 'VERTEBRAL COLUMN',
    thorax: 'THORACIC CAGE',
    upper_limbs: 'UPPER EXTREMITY',
    hands: 'MANUS (HAND BONES)',
    lower_limbs: 'LOWER EXTREMITY',
    feet: 'PES (FOOT BONES)',
    skeleton: 'SKELETAL SYSTEM',
    muscles: 'MUSCULAR SYSTEM',
    heart: 'CARDIAC ORGAN',
    respiratory: 'RESPIRATORY SYSTEM'
  };

  document.getElementById('card-system').textContent = systemDisplayNames[meta.system] || (meta.system || 'STRUCTURE').toUpperCase();
  document.getElementById('card-title').textContent = meta.name || 'Anatomical Part';
  document.getElementById('card-latin').textContent = meta.latin ? `TA: ${meta.latin}` : '';

  // Medical student additions: Thai name, Bony landmarks, High-yield clinical pearl
  const medDetails = getMedicalDetails(meta.name, meta.system);
  const thaiEl = document.getElementById('card-thai');
  if (thaiEl) thaiEl.textContent = medDetails.thai;

  const tagsContainer = document.getElementById('card-landmarks-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = (medDetails.landmarks || []).map(lm => `<span class="landmark-tag">${lm}</span>`).join('');
  }

  const clinicalEl = document.getElementById('card-clinical-text');
  if (clinicalEl) {
    clinicalEl.textContent = medDetails.clinical;
  }

  document.getElementById('card-desc').textContent = meta.desc || 'No physiological description available.';
  document.getElementById('card-category').textContent = meta.system || 'General';

  const pos = part.position;
  document.getElementById('card-coords').textContent = `X:${pos.x.toFixed(2)} Y:${pos.y.toFixed(2)} Z:${pos.z.toFixed(2)}`;

  card.classList.remove('hidden');
}

function closeInspectCard() {
  const card = document.getElementById('inspect-card');
  card.classList.add('hidden');
  if (state.selectedMesh) {
    unhighlightMesh(state.selectedMesh);
    state.selectedMesh = null;
  }
  if (state.isolatedMesh) {
    restoreIsolation();
  }
}

function toggleIsolatePart(part) {
  if (state.isolatedMesh === part) {
    restoreIsolation();
    document.getElementById('btn-isolate-part').textContent = 'Isolate';
  } else {
    state.isolatedMesh = part;
    anatomyMeshes.forEach(m => {
      if (m !== part) {
        setMeshOpacity(m, 0.12);
      } else {
        setMeshOpacity(m, 1.0);
      }
    });
    document.getElementById('btn-isolate-part').textContent = 'Unisolate';
  }
}

function restoreIsolation() {
  state.isolatedMesh = null;
  anatomyMeshes.forEach(m => setMeshOpacity(m, 1.0));
  document.getElementById('btn-isolate-part').textContent = 'Isolate';
}

function setMeshOpacity(obj, opacity) {
  const set = (m) => {
    if (m.material) {
      m.material.transparent = opacity < 1.0;
      m.material.opacity = opacity;
    }
  };
  if (obj.isMesh) set(obj);
  else if (obj.isGroup) obj.traverse(child => { if (child.isMesh) set(child); });
}

// ============================================================================
// Camera Animations & Smart Framing
// ============================================================================
function tweenCamera(targetPos, targetLook) {
  cameraTargetPos = new THREE.Vector3(...targetPos);
  cameraTargetLook = new THREE.Vector3(...targetLook);
}

function focusOnMesh(mesh, tight = true) {
  if (!mesh) return;
  const box = new THREE.Box3().setFromObject(mesh);
  const sphere = new THREE.Sphere();
  box.getBoundingSphere(sphere);

  const radius = sphere.radius || 0.05;
  // Adaptive distance based on actual dimensions
  const dist = tight 
    ? Math.max(radius * 2.6, 0.12)
    : Math.max(radius * 4.2, 0.35);

  const targetLook = [sphere.center.x, sphere.center.y, sphere.center.z];
  const targetPos = [sphere.center.x, sphere.center.y + dist * 0.22, sphere.center.z + dist];

  tweenCamera(targetPos, targetLook);
}

function jumpToRegion(regionKey) {
  const dockBtns = document.querySelectorAll('.dock-btn');
  dockBtns.forEach(b => b.classList.toggle('active', b.dataset.region === regionKey));

  if (regionKey === 'all') {
    tweenCamera([0, 0.95, 2.7], [0, 0.92, 0]);
    return;
  }

  const regionViews = {
    skull: { pos: [0, 1.70, 0.65], look: [0, 1.62, 0] },
    spine: { pos: [0, 1.25, 1.15], look: [0, 1.15, 0] },
    thorax: { pos: [0, 1.30, 0.95], look: [0, 1.25, 0] },
    hands: { pos: [0.36, 0.90, 0.52], look: [0.30, 0.85, 0] },
    lower_limbs: { pos: [0, 0.92, 1.10], look: [0, 0.85, 0] },
    feet: { pos: [0.15, 0.14, 0.55], look: [0.12, 0.06, 0] }
  };

  if (regionViews[regionKey]) {
    const v = regionViews[regionKey];
    tweenCamera(v.pos, v.look);
  }
}

// ============================================================================
// Lab Spotter Quiz System (Medical Gross Anatomy Exam Simulation)
// ============================================================================
const quizState = {
  active: false,
  currentIndex: 0,
  score: 0,
  stations: [],
  targetMesh: null,
  timerSeconds: 60,
  timerInterval: null,
  missedStations: []
};

function startSpotterQuiz() {
  if (anatomyMeshes.length === 0) return;

  // Filter prominent medical bones with defined names
  const candidates = anatomyMeshes.filter(m => {
    const n = (m.userData.name || '').toLowerCase();
    const isCartilage = n.includes('cartilage') || n.includes('disc') || n.includes('ligament') || n.includes('pulposus');
    return !isCartilage && m.visible && m.userData.name && m.userData.name.length > 2;
  });

  if (candidates.length < 4) return;

  // Shuffle and pick 10 distinct bones
  const shuffled = [...candidates].sort(() => 0.5 - Math.random());
  const selectedBones = shuffled.slice(0, 10);

  quizState.active = true;
  quizState.currentIndex = 0;
  quizState.score = 0;
  quizState.missedStations = [];
  quizState.stations = selectedBones.map(target => {
    // Pick 3 distractors from candidates with different names
    const distractors = candidates
      .filter(c => c.userData.name !== target.userData.name)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(c => c.userData.name);
    
    // Shuffle options
    const options = [...distractors, target.userData.name].sort(() => 0.5 - Math.random());
    return {
      targetMesh: target,
      options
    };
  });

  // UI state
  closeInspectCard();
  const toggleBtn = document.getElementById('btn-quiz-toggle');
  if (toggleBtn) toggleBtn.classList.add('active');
  document.getElementById('quiz-hud').classList.remove('hidden');
  document.getElementById('quiz-question-view').classList.remove('hidden');
  document.getElementById('quiz-summary-view').classList.add('hidden');

  loadQuizStation(0);
}

function loadQuizStation(index) {
  if (index >= quizState.stations.length) {
    finishSpotterQuiz();
    return;
  }

  quizState.currentIndex = index;
  const station = quizState.stations[index];
  const target = station.targetMesh;

  // Clean previous target pulsing
  if (quizState.targetMesh) {
    unhighlightMesh(quizState.targetMesh);
  }
  quizState.targetMesh = target;

  // Camera focus on target
  focusOnMesh(target, true);

  // Update HUD text
  document.getElementById('quiz-station-tag').textContent = `Station ${index + 1} / ${quizState.stations.length}`;
  const optionsEl = document.getElementById('quiz-options');
  optionsEl.innerHTML = '';

  station.options.forEach(optName => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    const latin = getLatinTerm(optName);
    btn.innerHTML = `<span>${optName}</span><span style="font-size:11px;font-style:italic;color:#64748b;">${latin}</span>`;
    btn.addEventListener('click', () => handleQuizAnswer(optName, btn));
    optionsEl.appendChild(btn);
  });

  // Hide feedback
  document.getElementById('quiz-feedback').classList.add('hidden');

  // Reset & Start Timer
  clearInterval(quizState.timerInterval);
  quizState.timerSeconds = 60;
  updateQuizTimerUI();
  quizState.timerInterval = setInterval(() => {
    quizState.timerSeconds--;
    updateQuizTimerUI();
    if (quizState.timerSeconds <= 0) {
      clearInterval(quizState.timerInterval);
      handleQuizTimeout();
    }
  }, 1000);
}

function updateQuizTimerUI() {
  const timerText = document.getElementById('quiz-timer-text');
  const timerBar = document.getElementById('quiz-timer-bar');
  if (timerText) timerText.textContent = `⏱️ ${quizState.timerSeconds}s`;
  if (timerBar) {
    const pct = Math.max(0, (quizState.timerSeconds / 60) * 100);
    timerBar.style.width = `${pct}%`;
    timerBar.className = 'quiz-timer-fill';
    if (quizState.timerSeconds < 15) timerBar.classList.add('danger');
    else if (quizState.timerSeconds < 30) timerBar.classList.add('warning');
  }
}

function handleQuizAnswer(selectedName, clickedBtn) {
  clearInterval(quizState.timerInterval);

  const station = quizState.stations[quizState.currentIndex];
  const correctName = station.targetMesh.userData.name;
  const isCorrect = (selectedName === correctName);

  // Disable all options
  const optionButtons = document.querySelectorAll('.quiz-opt-btn');
  optionButtons.forEach(btn => {
    btn.disabled = true;
    const titleSpan = btn.querySelector('span');
    if (titleSpan && titleSpan.textContent === correctName) {
      btn.classList.add('correct');
    }
  });

  if (!isCorrect && clickedBtn) {
    clickedBtn.classList.add('incorrect');
  }

  // Feedback Box
  const feedbackEl = document.getElementById('quiz-feedback');
  const iconEl = document.getElementById('quiz-feedback-icon');
  const titleEl = document.getElementById('quiz-feedback-title');
  const headerEl = document.getElementById('quiz-feedback-header');
  const descEl = document.getElementById('quiz-feedback-desc');
  const nextBtn = document.getElementById('btn-quiz-next');

  const details = getMedicalDetails(correctName, station.targetMesh.userData.system);

  if (isCorrect) {
    quizState.score++;
    iconEl.textContent = '✅';
    titleEl.textContent = 'Correct Answer!';
    headerEl.className = 'feedback-header correct';
    descEl.innerHTML = `<strong>${details.thai}</strong><br>${details.clinical}`;
  } else {
    quizState.missedStations.push({
      name: correctName,
      thai: details.thai,
      clinical: details.clinical
    });
    iconEl.textContent = '❌';
    titleEl.textContent = `Incorrect — Target is ${correctName}`;
    headerEl.className = 'feedback-header incorrect';
    descEl.innerHTML = `<strong>${details.thai}</strong><br>${details.clinical}`;
  }

  const isLast = (quizState.currentIndex === quizState.stations.length - 1);
  nextBtn.textContent = isLast ? 'View Results 🏁' : 'Next Station →';
  feedbackEl.classList.remove('hidden');
}

function handleQuizTimeout() {
  const station = quizState.stations[quizState.currentIndex];
  handleQuizAnswer('', null);
}

function finishSpotterQuiz() {
  clearInterval(quizState.timerInterval);
  if (quizState.targetMesh) {
    unhighlightMesh(quizState.targetMesh);
    quizState.targetMesh = null;
  }

  document.getElementById('quiz-question-view').classList.add('hidden');
  document.getElementById('quiz-summary-view').classList.remove('hidden');

  document.getElementById('summary-score-num').textContent = quizState.score;
  const headlineEl = document.getElementById('summary-headline');
  const subtextEl = document.getElementById('summary-subtext');

  if (quizState.score >= 9) {
    headlineEl.textContent = '🌟 Outstanding Osteology Mastery!';
    subtextEl.textContent = 'Excellent! You demonstrated distinction-level spotter recall.';
  } else if (quizState.score >= 7) {
    headlineEl.textContent = '👍 Solid Preclinical Performance!';
    subtextEl.textContent = 'Well done! You passed the gross anatomy station exam.';
  } else if (quizState.score >= 5) {
    headlineEl.textContent = '📚 Promising Effort!';
    subtextEl.textContent = 'Review your missed structures and clinical correlations below.';
  } else {
    headlineEl.textContent = '🩺 Practice Makes Perfect!';
    subtextEl.textContent = 'Spend more time exploring bone landmarks in 3D and retake.';
  }

  const missedList = document.getElementById('summary-missed-list');
  const missedBox = document.getElementById('summary-missed-box');
  if (quizState.missedStations.length > 0) {
    missedBox.style.display = 'block';
    missedList.innerHTML = quizState.missedStations.map(m => `
      <div class="summary-missed-item">
        <strong>${m.name}</strong> (${m.thai})
        <div style="font-size:11px;color:#475569;margin-top:2px;">${m.clinical}</div>
      </div>
    `).join('');
  } else {
    missedBox.style.display = 'none';
  }
}

function exitSpotterQuiz() {
  clearInterval(quizState.timerInterval);
  quizState.active = false;
  if (quizState.targetMesh) {
    unhighlightMesh(quizState.targetMesh);
    quizState.targetMesh = null;
  }
  const toggleBtn = document.getElementById('btn-quiz-toggle');
  if (toggleBtn) toggleBtn.classList.remove('active');
  document.getElementById('quiz-hud').classList.add('hidden');
  jumpToRegion('all');
}

// ============================================================================
// Model Presets & GLTF/GLB Loader
// ============================================================================
function clearScene() {
  closeInspectCard();
  // Remove all anatomy meshes
  anatomyMeshes.forEach(m => {
    if (m.parent) m.parent.remove(m);
  });
  anatomyMeshes.length = 0;

  // Clear system groups
  Object.values(systemGroups).forEach(group => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
  });

  // Reset explode slider
  const explodeSlider = document.getElementById('explode-slider');
  if (explodeSlider) explodeSlider.value = 0;
  updateExplode(0);
}

// ============================================================================
// Anatomical Bone Categorization & Naming Helpers
// ============================================================================
function categorizeBone(name) {
  const n = (name || '').toLowerCase();
  
  // Feet (tarsals, metatarsals, toe phalanges)
  if (n.includes('calcaneus') || n.includes('talus') || n.includes('cuboid') || n.includes('navicular') || 
      n.includes('cuneiform') || n.includes('metatarsal') || n.includes('toe') || n.includes('foot') || 
      n.includes('hallux')) {
    return 'feet';
  }

  // Hands (carpal, metacarpal, finger phalanges)
  if (n.includes('carpal') || n.includes('scaphoid') || n.includes('lunate') || n.includes('triquetrum') || 
      n.includes('pisiform') || n.includes('trapezium') || n.includes('trapezoid') || n.includes('capitate') || 
      n.includes('hamate') || n.includes('metacarpal') || n.includes('thumb') ||
      (n.includes('phalanx') && !n.includes('foot') && !n.includes('toe')) ||
      (n.includes('finger') && !n.includes('foot') && !n.includes('toe')) ||
      (n.includes('hand') && !n.includes('foot'))) {
    return 'hands';
  }

  // Upper Limbs (Clavicle, Scapula, Humerus, Radius, Ulna)
  if (n.includes('clavicle') || n.includes('scapula') || n.includes('humerus') || n.includes('radius') || 
      n.includes('ulna')) {
    return 'upper_limbs';
  }

  // Lower Limbs (Pelvis, Femur, Patella, Tibia, Fibula)
  if (n.includes('femur') || n.includes('patella') || n.includes('tibia') || n.includes('fibula') || 
      n.includes('hip') || n.includes('ilium') || n.includes('ischium') || n.includes('pubis') || 
      n.includes('pelvi') || n.includes('acetabul') || n.includes('innominate')) {
    return 'lower_limbs';
  }

  // Thorax (Ribs & Sternum)
  if (n.includes('rib') || n.includes('costa') || n.includes('sternum') || n.includes('manubrium') || 
      n.includes('xiphoid') || n.includes('costal')) {
    return 'thorax';
  }

  // Skull (Cranium, Facial bones, Teeth, Laryngeal & nasal cartilages, Ossicles)
  if (n.includes('skull') || n.includes('cranium') || n.includes('frontal') || n.includes('parietal') || 
      n.includes('occipital') || n.includes('temporal') || n.includes('sphenoid') || n.includes('ethmoid') || 
      n.includes('maxilla') || n.includes('mandib') || n.includes('zygomatic') || n.includes('nasal') || 
      n.includes('lacrimal') || n.includes('palatine') || n.includes('vomer') || n.includes('concha') || 
      n.includes('incus') || n.includes('malleus') || n.includes('stapes') || n.includes('hyoid') || 
      n.includes('thyroid cartilage') || n.includes('cricoid') || n.includes('arytenoid') || n.includes('epiglott') || 
      n.includes('corniculate') || n.includes('calvaria') || n.includes('ear') || n.includes('tooth') || 
      n.includes('teeth') || n.includes('incisor') || n.includes('canine') || n.includes('molar') || 
      n.includes('premolar') || n.includes('alar cartilage')) {
    return 'skull';
  }

  // Spine (Vertebrae C1-C7, T1-T12, L1-L5, Sacrum, Coccyx, Discs, Ligaments)
  if (n.includes('vertebra') || n.includes('cervical') || n.includes('thoracic vertebra') || 
      n.includes('lumbar') || n.includes('sacrum') || n.includes('coccyx') || n.includes('atlas') || 
      n.includes('axis') || n.includes('spine') || n.includes('intervertebral') || n.includes('ligament') || 
      n.includes('pulposus') || n.includes('symphysis')) {
    return 'spine';
  }

  return 'skull';
}

function getIndividualExplodeOffset(name, category, worldPos) {
  const n = (name || '').toLowerCase();
  const x = worldPos.x;
  const y = worldPos.y;
  const z = worldPos.z;
  const signX = x >= 0 ? 1 : -1;

  let expX = 0, expY = 0, expZ = 0;

  if (category === 'skull') {
    // Medical Beauchene exploded cranium & viscerocranium
    if (n.includes('frontal')) {
      expX = 0; expY = 0.60; expZ = 0.35;
    } else if (n.includes('parietal')) {
      expX = signX * 0.42; expY = 0.55; expZ = -0.08;
    } else if (n.includes('occipital')) {
      expX = 0; expY = 0.15; expZ = -0.48;
    } else if (n.includes('temporal')) {
      expX = signX * 0.52; expY = 0.25; expZ = -0.12;
    } else if (n.includes('sphenoid')) {
      expX = 0; expY = 0.38; expZ = 0.08;
    } else if (n.includes('ethmoid')) {
      expX = 0; expY = 0.46; expZ = 0.28;
    } else if (n.includes('mandib')) {
      expX = 0; expY = -0.36; expZ = 0.38;
    } else if (n.includes('maxilla')) {
      expX = signX * 0.24; expY = 0.06; expZ = 0.40;
    } else if (n.includes('zygomatic')) {
      expX = signX * 0.46; expY = 0.18; expZ = 0.34;
    } else if (n.includes('nasal')) {
      expX = signX * 0.08; expY = 0.38; expZ = 0.48;
    } else if (n.includes('lacrimal')) {
      expX = signX * 0.18; expY = 0.32; expZ = 0.38;
    } else if (n.includes('palatine')) {
      expX = signX * 0.14; expY = -0.06; expZ = 0.18;
    } else if (n.includes('vomer') || n.includes('concha')) {
      expX = signX * 0.08; expY = 0.16; expZ = 0.32;
    } else if (n.includes('incus') || n.includes('malleus') || n.includes('stapes')) {
      expX = signX * 0.70; expY = 0.25; expZ = -0.08;
    } else if (n.includes('tooth') || n.includes('incisor') || n.includes('canine') || n.includes('molar') || n.includes('premolar')) {
      const isLower = n.includes('lower');
      let archZ = 0.46;
      let archX = signX * 0.16;
      if (n.includes('canine')) { archX = signX * 0.24; archZ = 0.44; }
      else if (n.includes('premolar')) { archX = signX * 0.30; archZ = 0.38; }
      else if (n.includes('molar')) { archX = signX * 0.36; archZ = 0.28; }
      expX = archX;
      expY = isLower ? -0.48 : -0.15;
      expZ = archZ;
    } else if (n.includes('hyoid') || n.includes('cartilage') || n.includes('epiglott')) {
      expX = signX * 0.14; expY = -0.46; expZ = 0.26;
    } else {
      expX = signX * 0.28; expY = 0.35; expZ = 0.22;
    }
  } else if (category === 'spine') {
    // Individual vertebrae and intervertebral discs accordion explosion
    const dy = y - 1.25;
    expX = 0;
    expY = dy * 1.05; // Expands every vertebra up/down along its natural position
    expZ = -0.42;    // Displaces whole spine backward out of thorax
    if (n.includes('disc') || n.includes('pulposus')) {
      expZ = -0.34;  // Discs float slightly anterior to vertebrae for clear intervertebral inspection
    }
    if (n.includes('sacrum') || n.includes('coccyx')) {
      expY = dy * 1.15;
      expZ = -0.48;
    }
  } else if (category === 'thorax') {
    // Sternum and individual ribs 1 to 12
    if (n.includes('manubrium')) {
      expX = 0; expY = 0.32; expZ = 0.48;
    } else if (n.includes('xiphoid')) {
      expX = 0; expY = -0.22; expZ = 0.48;
    } else if (n.includes('sternum')) {
      expX = 0; expY = 0.06; expZ = 0.48;
    } else {
      // Extract rib order 1 to 12
      const ribMatch = n.match(/(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|\d+)/i);
      const ribNames = {
        'first': 1, 'second': 2, 'third': 3, 'fourth': 4, 'fifth': 5, 'sixth': 6,
        'seventh': 7, 'eighth': 8, 'ninth': 9, 'tenth': 10, 'eleventh': 11, 'twelfth': 12
      };
      let ribNum = 5;
      if (ribMatch) {
        const raw = ribMatch[0].toLowerCase();
        ribNum = ribNames[raw] || parseInt(raw) || 5;
      }
      const isCartilage = n.includes('cartilage');
      const zOffset = isCartilage ? 0.42 : (ribNum >= 11 ? -0.15 : 0.24);
      expX = signX * (0.32 + ribNum * 0.025);
      expY = (6 - ribNum) * 0.04;
      expZ = zOffset;
    }
  } else if (category === 'upper_limbs') {
    // Shoulder girdle and arm bones
    if (n.includes('clavicle')) {
      expX = signX * 0.36; expY = 0.24; expZ = 0.24;
    } else if (n.includes('scapula')) {
      expX = signX * 0.46; expY = 0.12; expZ = -0.30;
    } else if (n.includes('humerus')) {
      expX = signX * 0.60; expY = 0.02; expZ = 0.02;
    } else if (n.includes('radius')) {
      expX = signX * 0.74; expY = -0.06; expZ = 0.16;
    } else if (n.includes('ulna')) {
      expX = signX * 0.70; expY = -0.06; expZ = -0.16;
    }
  } else if (category === 'hands') {
    // Disarticulated carpals, metacarpals and phalanges
    if (n.includes('scaphoid') || n.includes('lunate') || n.includes('triquetrum') || n.includes('pisiform')) {
      // Proximal carpal row
      expX = signX * 0.78; expY = 0.03; expZ = 0.02;
    } else if (n.includes('trapezium') || n.includes('trapezoid') || n.includes('capitate') || n.includes('hamate') || n.includes('carpal')) {
      // Distal carpal row
      expX = signX * 0.86; expY = -0.04; expZ = 0.02;
    } else {
      let fingerIdx = 3;
      if (n.includes('first finger') || n.includes('thumb') || n.includes('first metacarpal')) fingerIdx = 1;
      else if (n.includes('second finger') || n.includes('second metacarpal')) fingerIdx = 2;
      else if (n.includes('third finger') || n.includes('third metacarpal')) fingerIdx = 3;
      else if (n.includes('fourth finger') || n.includes('fourth metacarpal')) fingerIdx = 4;
      else if (n.includes('fifth finger') || n.includes('fifth metacarpal')) fingerIdx = 5;

      const fanZ = (3 - fingerIdx) * 0.10;
      let distMul = 0.94;
      if (n.includes('distal')) distMul = 1.38;
      else if (n.includes('middle')) distMul = 1.22;
      else if (n.includes('proximal')) distMul = 1.08;
      else if (n.includes('metacarpal')) distMul = 0.94;

      expX = signX * (0.88 * distMul);
      expY = -0.12 * distMul;
      expZ = fanZ;
    }
  } else if (category === 'lower_limbs') {
    // Pelvic girdle and leg bones
    if (n.includes('hip') || n.includes('ilium') || n.includes('ischium') || n.includes('pubis') || n.includes('pelvi') || n.includes('acetabul')) {
      expX = signX * 0.32; expY = 0.06; expZ = 0.10;
    } else if (n.includes('femur')) {
      expX = signX * 0.50; expY = 0.00; expZ = -0.02;
    } else if (n.includes('patella')) {
      expX = signX * 0.50; expY = -0.04; expZ = 0.44; // Patella lifts forward off femoral condyles
    } else if (n.includes('tibia')) {
      expX = signX * 0.44; expY = -0.24; expZ = 0.08;
    } else if (n.includes('fibula')) {
      expX = signX * 0.65; expY = -0.24; expZ = -0.16; // Fibula separates posterolaterally
    }
  } else if (category === 'feet') {
    // Tarsals, metatarsals, phalanges
    if (n.includes('talus')) {
      expX = signX * 0.38; expY = 0.08; expZ = 0.28;
    } else if (n.includes('calcaneus')) {
      expX = signX * 0.38; expY = -0.14; expZ = -0.24; // Heel backward
    } else if (n.includes('navicular') || n.includes('cuboid') || n.includes('cuneiform')) {
      expX = signX * 0.40; expY = -0.04; expZ = 0.40;
    } else {
      let toeIdx = 3;
      if (n.includes('first finger') || n.includes('first metatarsal') || n.includes('hallux')) toeIdx = 1;
      else if (n.includes('second finger') || n.includes('second metatarsal')) toeIdx = 2;
      else if (n.includes('third finger') || n.includes('third metatarsal')) toeIdx = 3;
      else if (n.includes('fourth finger') || n.includes('fourth metatarsal')) toeIdx = 4;
      else if (n.includes('fifth finger') || n.includes('fifth metatarsal')) toeIdx = 5;

      const fanX = signX * (0.34 + toeIdx * 0.02);
      let distZ = 0.52;
      if (n.includes('distal')) distZ = 0.76;
      else if (n.includes('middle')) distZ = 0.68;
      else if (n.includes('proximal')) distZ = 0.60;
      else if (n.includes('metatarsal')) distZ = 0.48;

      expX = fanX;
      expY = -0.12 - (distZ - 0.48) * 0.15;
      expZ = distZ;
    }
  }

  return [expX, expY, expZ];
}

function formatBoneName(name) {
  if (!name) return 'Anatomical Structure';
  let formatted = name.trim();
  let side = '';
  if (/\.r(\.\d+)?$/i.test(formatted)) {
    side = ' (Right)';
    formatted = formatted.replace(/\.r(\.\d+)?$/i, '');
  } else if (/\.l(\.\d+)?$/i.test(formatted)) {
    side = ' (Left)';
    formatted = formatted.replace(/\.l(\.\d+)?$/i, '');
  } else if (/femurr$/i.test(formatted)) {
    side = ' (Right)';
    formatted = 'Femur';
  } else if (/femurl$/i.test(formatted)) {
    side = ' (Left)';
    formatted = 'Femur';
  } else if (/[a-z]r$/i.test(formatted) && !/(femur|scapular|lumbar|ocular|molar|alveolar)/i.test(formatted)) {
    side = ' (Right)';
    formatted = formatted.slice(0, -1);
  } else if (/[a-z]l$/i.test(formatted) && !/(carpal|nasal|palatal|costal|vertebral|distal|proximal|middle|temporal|parietal|occipital|sacral|coccygeal)/i.test(formatted)) {
    side = ' (Left)';
    formatted = formatted.slice(0, -1);
  } else if (/\.001$/.test(formatted)) {
    side = ' (Left)';
    formatted = formatted.replace(/\.001$/, '');
  } else if (/\.002$/.test(formatted)) {
    side = ' (Right)';
    formatted = formatted.replace(/\.002$/, '');
  } else {
    formatted = formatted.replace(/\.\d+$/, '');
  }
  formatted = formatted.replace(/_/g, ' ').trim();
  const midline = ['atlas', 'axis', 'sacrum', 'coccyx', 'sternum', 'manubrium', 'xiphoid', 'nuchal ligament', 'anterior longitudinal ligament', 'ligamenta flava', 'sacrococcygeal', 'vertebra'];
  if (midline.some(m => formatted.toLowerCase().includes(m))) {
    side = '';
  }
  return formatted + side;
}

function getLatinTerm(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('femur')) return 'Os femoris';
  if (n.includes('tibia')) return 'Tibia';
  if (n.includes('fibula')) return 'Fibula';
  if (n.includes('patella')) return 'Patella';
  if (n.includes('humerus')) return 'Humerus';
  if (n.includes('radius')) return 'Radius';
  if (n.includes('ulna')) return 'Ulna';
  if (n.includes('clavicle')) return 'Clavicula';
  if (n.includes('scapula')) return 'Scapula';
  if (n.includes('sternum')) return 'Sternum';
  if (n.includes('atlas')) return 'Atlas (C1)';
  if (n.includes('axis')) return 'Axis (C2)';
  if (n.includes('sacrum')) return 'Os sacrum';
  if (n.includes('coccyx')) return 'Os coccygis';
  if (n.includes('frontal')) return 'Os frontale';
  if (n.includes('parietal')) return 'Os parietale';
  if (n.includes('temporal')) return 'Os temporale';
  if (n.includes('occipital')) return 'Os occipitale';
  if (n.includes('sphenoid')) return 'Os sphenoidale';
  if (n.includes('ethmoid')) return 'Os ethmoidale';
  if (n.includes('mandib')) return 'Mandibula';
  if (n.includes('maxilla')) return 'Maxilla';
  if (n.includes('calcaneus')) return 'Calcaneus';
  if (n.includes('talus')) return 'Talus';
  if (n.includes('navicular')) return 'Os naviculare';
  if (n.includes('cuboid')) return 'Os cuboideum';
  if (n.includes('scaphoid')) return 'Os scaphoideum';
  if (n.includes('lunate')) return 'Os lunatum';
  if (n.includes('triquetrum')) return 'Os triquetrum';
  if (n.includes('pisiform')) return 'Os pisiforme';
  if (n.includes('trapezium')) return 'Os trapezium';
  if (n.includes('trapezoid')) return 'Os trapezoideum';
  if (n.includes('capitate')) return 'Os capitatum';
  if (n.includes('hamate')) return 'Os hamatum';
  if (n.includes('rib') || n.includes('costa')) return 'Costa';
  return name;
}

function getBoneDescription(name, category) {
  const n = name.toLowerCase();
  if (n.includes('femur')) return 'Longest, heaviest, and strongest bone in the human body; bears body weight and articulates at hip and knee joints.';
  if (n.includes('tibia')) return 'Shinbone; second largest bone in the human body, key weight-bearing component of the lower leg.';
  if (n.includes('fibula')) return 'Slender calf bone lateral to tibia; provides attachment sites for muscles and forms lateral malleolus.';
  if (n.includes('patella')) return 'Kneecap; large sesamoid bone embedded within the quadriceps tendon to increase mechanical advantage.';
  if (n.includes('humerus')) return 'Upper arm bone articulating with scapula at shoulder joint and radius/ulna at elbow.';
  if (n.includes('radius')) return 'Lateral forearm bone allowing pronation and supination of the hand.';
  if (n.includes('ulna')) return 'Medial forearm bone forming hinge joint of elbow via olecranon process.';
  if (n.includes('clavicle')) return 'Collarbone; strut bone connecting axial skeleton to shoulder girdle.';
  if (n.includes('scapula')) return 'Shoulder blade; flat bone anchoring pectoral muscles with glenoid cavity for humerus.';
  if (n.includes('atlas')) return 'First cervical vertebra (C1); supports the cranium and enables nodding motion.';
  if (n.includes('axis')) return 'Second cervical vertebra (C2); features dens (odontoid process) enabling rotational pivot of head.';
  if (n.includes('sacrum')) return 'Shield-shaped bony structure at the base of lumbar vertebrae formed by five fused sacral vertebrae.';
  if (n.includes('coccyx')) return 'Tailbone; vestigial caudal terminus of vertebral column providing ligament and pelvic floor muscle attachments.';
  if (n.includes('sternum')) return 'Breastbone; flat central bone of anterior chest wall articulating with ribs via costal cartilages.';
  if (n.includes('rib') || n.includes('costa')) return 'Curved thoracic bone forming protective cage around thoracic viscera and facilitating respiration.';
  if (n.includes('frontal')) return 'Unpaired cranial bone forming forehead, upper eye sockets, and anterior cranial fossa.';
  if (n.includes('parietal')) return 'Bilateral cranial bone forming superior and lateral roof of the skull.';
  if (n.includes('temporal')) return 'Lateral cranial bone housing middle and inner ear auditory apparatus.';
  if (n.includes('occipital')) return 'Posterior cranial bone featuring foramen magnum for spinal cord transmission.';
  if (n.includes('mandib')) return 'Lower jawbone; only movable bone of the adult skull, housing lower dentition.';
  if (n.includes('maxilla')) return 'Upper jawbone; forms midface, nasal cavity floor, and upper dental arch.';
  if (n.includes('calcaneus')) return 'Heel bone; largest tarsal bone providing lever arm for Achilles tendon.';
  if (n.includes('talus')) return 'Ankle bone; transmits entire body weight from tibia/fibula down into the foot arch.';

  if (category === 'skull') return 'Cranial or facial bone protecting sensory apparatus and brain, providing structural support for mastication.';
  if (category === 'spine') return 'Axial skeletal vertebra or disc providing flexible support, neural protection, and shock absorption.';
  if (category === 'thorax') return 'Thoracic cage component protecting thoracic viscera and participating in respiratory mechanics.';
  if (category === 'upper_limbs') return 'Appendicular upper limb bone enabling multiaxial positioning, reaching, and dexterity.';
  if (category === 'hands') return 'Carpal, metacarpal, or phalangeal bone enabling high-precision grip and tactile manipulation.';
  if (category === 'lower_limbs') return 'Weight-bearing pelvic or lower extremity bone supporting bipedal locomotion and stability.';
  if (category === 'feet') return 'Tarsal, metatarsal, or phalangeal bone providing shock absorption and propulsion during gait.';
  return 'Authentic human skeletal structure documented in Terminologia Anatomica.';
}

function loadModelPreset(presetKey) {
  clearScene();
  const captionEl = document.querySelector('.model-caption');
  const subEl = document.querySelector('.brand-sub');

  if (presetKey === 'procedural-full') {
    state.systems = {
      skeleton: { name: 'Skeleton', count: 206, color: '#94a3b8', visible: true, group: 'skeleton' },
      muscles: { name: 'Muscles', count: 402, color: '#ef4444', visible: true, group: 'muscles' },
      heart: { name: 'Heart & Cardiac', count: 23, color: '#dc2626', visible: true, group: 'organs' },
      sensory: { name: 'Sensory organs', count: 45, color: '#06b6d4', visible: true, group: 'organs' },
      arteries: { name: 'Arteries', count: 639, color: '#e11d48', visible: true, group: 'organs' },
      veins: { name: 'Veins', count: 404, color: '#3b82f6', visible: true, group: 'organs' },
      nervous: { name: 'Nervous system', count: 139, color: '#eab308', visible: true, group: 'organs' },
      respiratory: { name: 'Respiratory', count: 119, color: '#14b8a6', visible: true, group: 'organs' },
      organs: { name: 'Visceral organs', count: 219, color: '#f97316', visible: true, group: 'organs' }
    };
    buildAnatomyModel();
    initUI();
    if (captionEl) captionEl.textContent = 'ADULT HUMAN · MALE';
    if (subEl) subEl.textContent = '2,234 modeled pieces · BodyParts3D Compatible';
    tweenCamera([0, 0.95, 2.7], [0, 0.92, 0]);
    return;
  }

  // Load external medical GLB models
  let glbPath = '';
  let presetTitle = '';
  let modelSub = '';
  let systemName = 'skeleton';
  let targetCam = [0, 1.2, 1.6];
  let targetLook = [0, 1.1, 0];

  if (presetKey === 'full-body-skeleton') {
    glbPath = './models/skeletal_male.glb';
    presetTitle = 'FULL-BODY MEDICAL SKELETON (335 BONES)';
    modelSub = '335 กระดูกและข้อต่อ · สื่อการสอนชีววิทยา-การแพทย์ ดร.อภิสิทธิ์ ธงไชย (สสวท.)';
    targetCam = [0, 0.95, 2.7];
    targetLook = [0, 0.92, 0];
  } else if (presetKey === 'skeleton-thoracic') {
    glbPath = './models/skeleton-thoracic.glb';
    presetTitle = 'THORACIC SKELETON & LIMB BONES (LUMC SCAN)';
    modelSub = '51 modeled bones · Leiden Univ. Medical Center (AnatomyTOOL)';
    systemName = 'skeleton';
    targetCam = [0, 1.15, 2.05];
    targetLook = [0, 1.05, 0];
  } else if (presetKey === 'respiratory-system') {
    glbPath = './models/respiratory-system.glb';
    presetTitle = 'TRACHEOBRONCHIAL TREE & LUNG LOBES';
    modelSub = '35 pulmonary structures · Anatria-3D / Z-Anatomy';
    systemName = 'respiratory';
    targetCam = [0, 1.15, 1.4];
    targetLook = [0, 1.1, 0];
  } else if (presetKey === 'heart-cardiac') {
    glbPath = './models/heart-cardiac.glb';
    presetTitle = 'HUMAN HEART · MYOCARDIUM & VESSELS';
    modelSub = 'High-Resolution Cardiac Organ · BodyParts3D';
    systemName = 'heart';
    targetCam = [0, 1.05, 0.95];
    targetLook = [0, 1.0, 0];
  }

  if (embeddedModels && embeddedModels[presetKey]) {
    glbPath = embeddedModels[presetKey];
  }

  if (captionEl) captionEl.textContent = 'LOADING 3D MEDICAL MODEL...';

  gltfLoader.load(glbPath, (gltf) => {
    const root = gltf.scene;
    const isFullSkeleton = (presetKey === 'full-body-skeleton');

    // Calculate bounding box to normalize scale and center
    const bbox = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    bbox.getSize(size);

    if (isFullSkeleton) {
      // 1.76m height for adult human male skeleton
      const scale = 1.76 / (size.y || 1);
      root.scale.setScalar(scale);

      bbox.setFromObject(root);
      const center = new THREE.Vector3();
      bbox.getCenter(center);
      root.position.x = -center.x;
      root.position.y = 0.04 - bbox.min.y; // feet rest on platform (y = 0.04)
      root.position.z = -center.z;
    } else {
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = (presetKey === 'heart-cardiac' ? 0.45 : 0.85) / (maxDim || 1);
      root.scale.setScalar(scale);

      bbox.setFromObject(root);
      const center = new THREE.Vector3();
      bbox.getCenter(center);
      root.position.x = -center.x;
      root.position.y = 1.05 - center.y;
      root.position.z = -center.z;
    }

    // Register all meshes safely
    const meshes = [];
    root.traverse((child) => {
      if (child.isMesh) meshes.push(child);
    });

    const boneMat = new THREE.MeshStandardMaterial({
      color: 0xf3ede2,
      roughness: 0.38,
      metalness: 0.04
    });
    const cartilageMat = new THREE.MeshStandardMaterial({
      color: 0xc4dded,
      roughness: 0.22,
      metalness: 0.02,
      transparent: true,
      opacity: 0.88
    });

    root.updateMatrixWorld(true);

    meshes.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      const meshWorldPos = new THREE.Vector3();
      child.getWorldPosition(meshWorldPos);

      if (isFullSkeleton) {
        const cat = categorizeBone(child.name);
        const cleanName = formatBoneName(child.name);
        const desc = getBoneDescription(cleanName, cat);

        const isCartilage = /cartilage|ligament|pulposus/i.test(child.name);
        child.material = isCartilage ? cartilageMat.clone() : boneMat.clone();

        const [expX, expY, expZ] = getIndividualExplodeOffset(child.name, cat, meshWorldPos);

        registerPart(child, {
          name: cleanName,
          latin: getLatinTerm(cleanName),
          system: cat,
          desc: desc,
          explodeOffset: [expX, expY, expZ]
        });
      } else {
        if (child.material) {
          child.material = child.material.clone();
        }

        const dx = meshWorldPos.x;
        const dy = meshWorldPos.y - 1.05;
        const dz = meshWorldPos.z;
        const dist = Math.sqrt(dx * dx + dz * dz) + 0.1;
        const expX = (dx / dist) * 0.45;
        const expY = dy * 0.2;
        const expZ = (dz / dist) * 0.45;

        const cleanName = child.name ? child.name.replace(/_/g, ' ').replace(/\.r/gi, ' (Right)').replace(/\.l/gi, ' (Left)') : 'Anatomical Structure';
        registerPart(child, {
          name: cleanName,
          latin: child.name || '',
          system: systemName,
          desc: `Authentic anatomical component from ${modelSub}`,
          explodeOffset: [expX, expY, expZ]
        });
      }
    });

    if (isFullSkeleton) {
      const catMeta = {
        skull: { name: 'Cranium & Facial (Skull)', color: '#f59e0b', group: 'axial' },
        spine: { name: 'Vertebral Column & Discs', color: '#8b5cf6', group: 'axial' },
        thorax: { name: 'Thoracic Cage & Ribs', color: '#06b6d4', group: 'axial' },
        upper_limbs: { name: 'Shoulder & Arm Bones', color: '#10b981', group: 'appendicular' },
        hands: { name: 'Carpals & Hand Bones', color: '#3b82f6', group: 'appendicular' },
        lower_limbs: { name: 'Pelvis & Lower Extremities', color: '#ec4899', group: 'appendicular' },
        feet: { name: 'Tarsals & Foot Bones', color: '#f97316', group: 'appendicular' }
      };
      state.systems = {};
      Object.entries(catMeta).forEach(([key, info]) => {
        const count = anatomyMeshes.filter(m => m.userData.system === key).length;
        if (count > 0) {
          state.systems[key] = {
            name: info.name,
            count,
            color: info.color,
            visible: true,
            group: info.group
          };
        }
      });
    } else {
      state.systems = {
        [systemName]: {
          name: systemName.charAt(0).toUpperCase() + systemName.slice(1),
          count: anatomyMeshes.length,
          color: systemName === 'skeleton' ? '#94a3b8' : (systemName === 'respiratory' ? '#14b8a6' : '#dc2626'),
          visible: true,
          group: systemName === 'skeleton' ? 'skeleton' : 'organs'
        }
      };
    }

    scene.add(root);
    initUI();
    updateExplode(0);

    if (captionEl) captionEl.textContent = presetTitle;
    if (subEl) subEl.textContent = modelSub;
    tweenCamera(targetCam, targetLook);
  }, undefined, (err) => {
    console.error('Error loading preset', err);
    if (captionEl) captionEl.textContent = 'ERROR LOADING MODEL';
  });
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) loadGLBFile(file);
}

function loadGLBFile(file) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function (e) {
    clearScene();
    gltfLoader.parse(e.target.result, '', (gltf) => {
      const model = gltf.scene;
      
      const bbox = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      bbox.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 0.85 / (maxDim || 1);
      model.scale.setScalar(scale);

      bbox.setFromObject(model);
      const center = new THREE.Vector3();
      bbox.getCenter(center);
      model.position.x = -center.x;
      model.position.y = 1.05 - center.y;
      model.position.z = -center.z;

      const meshes = [];
      model.traverse((child) => {
        if (child.isMesh) meshes.push(child);
      });

      meshes.forEach((child) => {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = child.material.clone();
        }

        const meshWorldPos = new THREE.Vector3();
        child.getWorldPosition(meshWorldPos);
        const dx = meshWorldPos.x;
        const dy = meshWorldPos.y - 1.05;
        const dz = meshWorldPos.z;
        const dist = Math.sqrt(dx * dx + dz * dz) + 0.1;

        registerPart(child, {
          name: child.name || 'Imported Part',
          latin: child.name || '',
          system: 'skeleton',
          desc: `Imported 3D Mesh from ${file.name}`,
          explodeOffset: [(dx / dist) * 0.45, dy * 0.2, (dz / dist) * 0.45]
        });
      });

      state.systems = {
        imported: {
          name: 'Imported Model',
          count: anatomyMeshes.length,
          color: '#3b82f6',
          visible: true,
          group: 'skeleton'
        }
      };

      scene.add(model);
      initUI();
      updateExplode(0);

      const captionEl = document.querySelector('.model-caption');
      const subEl = document.querySelector('.brand-sub');
      if (captionEl) captionEl.textContent = `CUSTOM 3D: ${file.name.toUpperCase()}`;
      if (subEl) subEl.textContent = `${anatomyMeshes.length} modeled parts · User Upload`;
      tweenCamera([0, 1.15, 1.6], [0, 1.05, 0]);
    }, (err) => {
      console.error('GLTF Parse Error', err);
      alert('Failed to parse 3D file. Please ensure it is a valid .glb/.gltf file.');
    });
  };
}

// ============================================================================
// Window Resize & Render Loop
// ============================================================================
function onWindowResize() {
  const viewport = document.getElementById('viewport');
  camera.aspect = viewport.clientWidth / viewport.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(viewport.clientWidth, viewport.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // Smooth camera position tweening
  if (cameraTargetPos && cameraTargetLook) {
    camera.position.lerp(cameraTargetPos, 0.08);
    controls.target.lerp(cameraTargetLook, 0.08);

    if (camera.position.distanceTo(cameraTargetPos) < 0.01) {
      cameraTargetPos = null;
      cameraTargetLook = null;
    }
  }

  // Pulsing highlight for active quiz target bone
  if (quizState.active && quizState.targetMesh) {
    const pulse = 0.35 + 0.35 * Math.sin(performance.now() * 0.006);
    const m = quizState.targetMesh;
    const setPulse = (mesh) => {
      if (mesh.material) {
        mesh.material.emissive = new THREE.Color(0x6366f1);
        mesh.material.emissiveIntensity = pulse;
      }
    };
    if (m.isMesh) setPulse(m);
    else if (m.isGroup) m.traverse(c => { if (c.isMesh) setPulse(c); });
  }

  controls.update();
  renderer.render(scene, camera);
}

// Start application
window.addEventListener('DOMContentLoaded', init);
