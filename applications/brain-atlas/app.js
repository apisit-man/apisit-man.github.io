/**
 * Brain Atlas 3D - Medical-Grade Human Brain Anatomy & 3D MPR Slicer
 * Developed for Dr. Apisit Tongchai - Biology Educational Media
 * Data Reference: FreeSurfer Pial Surface Clinical Segmentation (OpenNeuro ds006128)
 * & TopCoW Circle of Willis Angiography Benchmark
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { BRAIN_STRUCTURES, EDUCATIONAL_PRESETS } from './brain-data.js';
import { sound } from './audio.js';
import { QuestManager } from './quest.js';
import { LesionSimulator } from './lesion-simulator.js';
import { CaseStudyManager } from './case-studies.js';
import { EEGLaboratory, EEG_BANDS, EEG_STATES } from './eeg-lab.js';
import { I18nManager } from './i18n.js';
import { StereotaxicProbe } from './stereotaxic-probe.js';
import { socraticTutor } from './socratic-tutor.js';
import { WhiteMatterTracts } from './white-matter-tracts.js';
import { synapseLab, NEUROTRANSMITTERS, PHARMACOLOGY_CHALLENGES } from './synapse-lab.js';

// ============================================================================
// State Management
// ============================================================================
const state = {
  cortexOpacity: 1.0,
  colorMode: 'realistic', // 'realistic' (natural tissue) or 'functional' (color-coded lobes)
  cuttingPlaneMode: 'none', // 'none', 'axial', 'coronal', 'sagittal'
  sliceCoord: { x: 0, y: 0, z: 0 }, // coordinates in mm
  sliceRange: {
    axial: { min: -50, max: 50, current: 0 },
    coronal: { min: -60, max: 50, current: 0 },
    sagittal: { min: -50, max: 50, current: 0 }
  },
  planeFlipped: false,
  selectedId: null,
  hoveredId: null,
  isolatedId: null,
  isMprVisible: false,
  systems: {
    cerebrum: true,
    vasculature: true,
    limbic: true,
    ventricles: true,
    brainstem: true,
    cerebellum: true
  },
  contrast: 1.1,
  isDraggingCanvas: null, // 'axial', 'coronal', 'sagittal'
  lastSliceTick: 0
};

// ============================================================================
// Three.js Globals
// ============================================================================
let scene, camera, renderer, controls;
let raycaster, mouse;
let brainGroup; // Root group centered at (0,0,0)
let gltfRootGroup; // Group containing loaded GLTF meshes
let internalStructuresGroup; // Group for Ventricles, Thalamus, Vasculature
let clippingPlane;
let planeHelperMesh;
let targetPinpointMarker; // Pulsing 3D beacon for selected structure & quest targets
let questManager; // Neuro-Pinpoint Quest controller
let lesionSimulator; // Virtual Clinical Lesion & Stroke simulator
let caseStudyManager; // Clinical Detective Case Study controller
let eegLab; // Interactive EEG Brainwave Studio controller
let i18nManager; // Bilingual Internationalization Manager
let stereotaxicProbe; // 3D Stereotaxic MNI Coordinate Probe
let whiteMatterTracts; // 3D White Matter Tractography Controller
let animationFrameId;

// Maps mesh / structure IDs to Object3D
const structureMeshMap = new Map(); // id -> THREE.Object3D
const gltfMeshMap = new Map(); // mesh.name -> THREE.Mesh

// MPR 2D Canvases
const mprPanels = {
  axial: { canvas: null, ctx: null, size: 220 },
  coronal: { canvas: null, ctx: null, size: 220 },
  sagittal: { canvas: null, ctx: null, size: 220 }
};

// ============================================================================
// Material Color Configurations
// ============================================================================
const PALETTES = {
  realistic: {
    cortex: 0xded4c5, // Natural living cortical gray matter
    cerebellum: 0xcbbeab, // Cerebellar folia tone
    brainstem: 0xe2d7c7, // Ivory white matter tracts
    corpusCallosum: 0xede6da, // White matter commissure
    hippocampus: 0xcbb29c,
    amygdala: 0xbd9a84,
    thalamus: 0xd4c2af,
    ventricles: 0x38bdf8,
    vasculature: 0xe11d48 // Arterial blood red
  },
  functional: {
    'frontal-lobe': 0x3b82f6, // Sapphire Blue
    'prefrontal-cortex': 0x06b6d4, // Cyan
    'parietal-lobe': 0x10b981, // Emerald Green
    'temporal-lobe': 0x8b5cf6, // Royal Purple
    'occipital-lobe': 0xf97316, // Sunset Orange
    'cerebellum': 0x14b8a6, // Teal
    'brain-stem': 0xf43f5e, // Rose Red
    'corpus-callosum': 0xeab308, // Gold
    'hippocampus': 0xf59e0b, // Amber
    'amygdala': 0xef4444, // Crimson
    'thalamus': 0xfacc15,
    'ventricles': 0x06b6d4,
    'vasculature': 0xdc2626
  }
};

// ============================================================================
// Bootstrap Application
// ============================================================================
function bootstrap() {
  initThree();
  initMPRCanvases();
  setupClippingPlane();
  setupPinpointMarker();
  buildInternalStructures();
  loadClinicalBrainModel();
  initQuestSystem();
  initLesionSimulator();
  initCaseStudies();
  initEEGLab();
  initI18n();
  initStereotaxicProbe();
  initWhiteMatterTracts();
  initSynapseLab();
  initPWA();
  setupEventListeners();
  renderMPRSlices();

  // Select default Frontal Lobe or handle URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const presetParam = urlParams.get('preset');
  const structParam = urlParams.get('structure') || urlParams.get('id');
  const modeParam = urlParams.get('mode');
  const peelParam = urlParams.get('peel');
  const mprParam = urlParams.get('mpr');
  const questParam = urlParams.get('quest');

  if (modeParam === 'functional') {
    setColorMode('functional');
  }

  if (peelParam !== null) {
    const val = parseFloat(peelParam);
    if (!isNaN(val)) {
      const slider = document.getElementById('cortex-opacity-slider');
      if (slider) slider.value = val;
      updateCortexOpacity(val);
    }
  }

  if (mprParam === 'true' || mprParam === '1') {
    const btnToggleMpr = document.getElementById('btn-toggle-mpr');
    if (btnToggleMpr) btnToggleMpr.click();
  }

  if (questParam === 'true' || questParam === '1') {
    questManager.startQuest();
  } else if (presetParam) {
    applyPreset(presetParam);
  } else if (structParam) {
    selectStructure(structParam, true);
  } else {
    selectStructure('frontal_lobe_left', false);
  }

  // Animation Loop
  animate();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}

// ============================================================================
// Three.js Engine Setup
// ============================================================================
function initThree() {
  const container = document.getElementById('viewport-container');
  const canvas = document.getElementById('webgl-canvas');

  const width = (container && container.clientWidth) ? container.clientWidth : window.innerWidth;
  const height = (container && container.clientHeight) ? container.clientHeight : (window.innerHeight - 56);

  // Scene
  scene = new THREE.Scene();
  scene.background = null; // Transparent to show dark obsidian gradient

  // Camera
  camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
  camera.position.set(0, 15, 210);

  // Renderer with Local Clipping
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.localClippingEnabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 40;
  controls.maxDistance = 380;
  controls.target.set(0, 0, 0);

  // Raycaster & Mouse
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2(-999, -999);

  // Lighting
  setupLighting();

  // Root Anatomy Group
  brainGroup = new THREE.Group();
  brainGroup.name = 'BrainRoot';
  scene.add(brainGroup);

  gltfRootGroup = new THREE.Group();
  gltfRootGroup.name = 'FreeSurferClinicalGroup';
  brainGroup.add(gltfRootGroup);

  internalStructuresGroup = new THREE.Group();
  internalStructuresGroup.name = 'InternalStructuresGroup';
  brainGroup.add(internalStructuresGroup);

  // Window Resize
  window.addEventListener('resize', onWindowResize);
}

function setupLighting() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xe2e8f0, 0x090d16, 0.75);
  scene.add(hemiLight);

  // Key Light
  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
  dirLight1.position.set(80, 100, 90);
  scene.add(dirLight1);

  // Fill Light (Subtle Cyan Rim)
  const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.1);
  dirLight2.position.set(-80, -30, -60);
  scene.add(dirLight2);

  // Bottom Fill Light
  const dirLight3 = new THREE.DirectionalLight(0xa855f7, 0.7);
  dirLight3.position.set(0, -70, 70);
  scene.add(dirLight3);
}

function setupClippingPlane() {
  clippingPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);

  const planeGeom = new THREE.PlaneGeometry(160, 160);
  const planeMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  planeHelperMesh = new THREE.Mesh(planeGeom, planeMat);

  // Glowing wireframe border
  const edges = new THREE.EdgesGeometry(planeGeom);
  const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
  const line = new THREE.LineSegments(edges, lineMat);
  planeHelperMesh.add(line);

  planeHelperMesh.visible = false;
  scene.add(planeHelperMesh);
}

function setupPinpointMarker() {
  targetPinpointMarker = new THREE.Group();
  targetPinpointMarker.name = 'TargetPinpointMarker';

  // 1. Horizontal targeting ring
  const ringGeom = new THREE.RingGeometry(3.5, 5.0, 32);
  ringGeom.rotateX(Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
    depthTest: false
  });
  const ring = new THREE.Mesh(ringGeom, ringMat);
  targetPinpointMarker.add(ring);

  // 2. Center glowing sphere beacon
  const coreGeom = new THREE.SphereGeometry(1.6, 16, 16);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x34d399,
    transparent: true,
    opacity: 0.9,
    depthTest: false
  });
  const core = new THREE.Mesh(coreGeom, coreMat);
  targetPinpointMarker.add(core);

  // 3. Subtle vertical guide needle
  const stemGeom = new THREE.CylinderGeometry(0.18, 0.18, 14, 8);
  stemGeom.translate(0, 7, 0);
  const stemMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.6,
    depthTest: false
  });
  const stem = new THREE.Mesh(stemGeom, stemMat);
  targetPinpointMarker.add(stem);

  targetPinpointMarker.visible = false;
  targetPinpointMarker.renderOrder = 999;
  scene.add(targetPinpointMarker);
}

// ============================================================================
// FreeSurfer Clinical GLTF Model Loader (Authentic Sulci & Gyri)
// ============================================================================
function loadClinicalBrainModel() {
  const loader = new GLTFLoader();
  const loadingOverlay = document.getElementById('loading-overlay');
  const loadingBar = document.getElementById('loading-bar');
  const loadingText = document.getElementById('loading-text');

  const onModelReady = (gltf) => {
    // 1. Calculate bounding box and center precisely at (0, 0, 0)
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    gltf.scene.position.sub(center);

    // 2. Iterate meshes and configure medical PBR materials
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        const meshName = child.name;

        // Skip low-poly hit proxies
        if (meshName.startsWith('hit-proxy--')) {
          child.visible = false;
          return;
        }

        // Hide unified cortex in favor of individual segmented lobes for clickable interaction
        if (meshName === 'unified-cortex') {
          child.visible = false;
          return;
        }

        // Compute smooth vertex normals
        child.geometry.computeVertexNormals();

        // Create standard medical material
        const initialColor = getMeshColor(meshName, state.colorMode);
        const isCortexLobe = isCorticalLobe(meshName);

        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(initialColor),
          roughness: isCortexLobe ? 0.42 : 0.38,
          metalness: 0.04,
          side: THREE.DoubleSide,
          clippingPlanes: state.cuttingPlaneMode !== 'none' ? [clippingPlane] : [],
          clipShadows: true,
          transparent: false,
          opacity: 1.0
        });

        child.material = mat;
        child.userData = {
          meshName: meshName,
          isCorticalLobe: isCortexLobe,
          originalColor: initialColor
        };

        gltfMeshMap.set(meshName, child);
      }
    });

    gltfRootGroup.add(gltf.scene);

    // Hide loading overlay smoothly
    if (loadingOverlay) {
      if (loadingBar) loadingBar.style.width = '100%';
      if (loadingText) loadingText.textContent = 'โหลดแบบจำลองเสร็จสมบูรณ์';
      setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => { loadingOverlay.style.display = 'none'; }, 500);
      }, 350);
    }

    // Update cortex opacity to initial state
    updateCortexOpacity(state.cortexOpacity);
  };

  // Option A: If embedded base64 model data exists (Offline file:// direct double-click)
  if (window.BRAIN_MODEL_B64) {
    if (loadingText) loadingText.textContent = 'กำลังประมวลผลข้อมูล 3D (โหมดออฟไลน์)...';
    if (loadingBar) loadingBar.style.width = '70%';

    // Defer slightly to allow UI to render spinner
    setTimeout(() => {
      try {
        const binStr = window.atob(window.BRAIN_MODEL_B64);
        const len = binStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binStr.charCodeAt(i);
        }
        loader.parse(bytes.buffer, '', onModelReady, (err) => {
          console.error('Parse error:', err);
        });
      } catch (e) {
        console.error('Base64 decode error:', e);
      }
    }, 40);
    return;
  }

  // Option B: Standard HTTP/HTTPS fetch (Online / Local web server)
  loader.load(
    'models/brain-atlas.glb',
    onModelReady,
    (xhr) => {
      if (xhr.total > 0 && loadingBar) {
        const pct = Math.round((xhr.loaded / xhr.total) * 100);
        loadingBar.style.width = `${pct}%`;
        if (loadingText) loadingText.textContent = `กำลังโหลดแบบจำลองสมอง 3 มิติ... ${pct}%`;
      }
    },
    (err) => {
      console.error('Error loading brain GLB model:', err);
      if (loadingText) {
        loadingText.innerHTML = `
          <span style="color: #ef4444;">ไม่สามารถโหลดโมเดล 3D ผ่าน file:// โดยตรง</span><br>
          <span style="font-size: 0.75rem; color: #94a3b8;">กรุณาเปิดผ่าน start-brain-atlas.bat หรือรันบนเว็บเบราว์เซอร์</span>
        `;
      }
    }
  );
}

function isCorticalLobe(name) {
  return [
    'frontal-lobe',
    'prefrontal-cortex',
    'parietal-lobe',
    'temporal-lobe',
    'occipital-lobe'
  ].includes(name);
}

function getMeshColor(name, mode) {
  if (mode === 'realistic') {
    if (isCorticalLobe(name)) return PALETTES.realistic.cortex;
    if (name === 'cerebellum') return PALETTES.realistic.cerebellum;
    if (name === 'brain-stem') return PALETTES.realistic.brainstem;
    if (name === 'corpus-callosum') return PALETTES.realistic.corpusCallosum;
    if (name === 'hippocampus') return PALETTES.realistic.hippocampus;
    if (name === 'amygdala') return PALETTES.realistic.amygdala;
    return PALETTES.realistic.cortex;
  } else {
    return PALETTES.functional[name] || 0x3b82f6;
  }
}

// ============================================================================
// Internal Structures Builder (Vasculature, Ventricles, Deep Nuclei)
// ============================================================================
function buildInternalStructures() {
  BRAIN_STRUCTURES.forEach(struct => {
    let mesh = null;
    if (struct.system === 'vasculature') {
      mesh = createVasculatureMesh(struct);
    } else if (struct.system === 'ventricles') {
      mesh = createVentricularMesh(struct);
    } else if (struct.id === 'thalamus') {
      mesh = createThalamusMesh(struct);
    }

    if (mesh) {
      mesh.userData = { id: struct.id, data: struct };
      structureMeshMap.set(struct.id, mesh);
      internalStructuresGroup.add(mesh);
    }
  });
}

function createThalamusMesh(struct) {
  const group = new THREE.Group();
  const color = state.colorMode === 'realistic' ? PALETTES.realistic.thalamus : PALETTES.functional.thalamus;

  // Bilateral ovoid thalamic bodies
  [-1, 1].forEach(side => {
    const geom = new THREE.SphereGeometry(7.5, 32, 32);
    geom.scale(1.0, 1.45, 0.95);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.35,
      metalness: 0.1,
      clippingPlanes: state.cuttingPlaneMode !== 'none' ? [clippingPlane] : []
    });
    const m = new THREE.Mesh(geom, mat);
    m.position.set(side * 8, -12, -2);
    m.userData = { id: struct.id, data: struct };
    group.add(m);
  });

  return group;
}

function createVentricularMesh(struct) {
  const group = new THREE.Group();
  const color = state.colorMode === 'realistic' ? PALETTES.realistic.ventricles : PALETTES.functional.ventricles;
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.2,
    metalness: 0.1,
    transparent: true,
    opacity: 0.65,
    clippingPlanes: state.cuttingPlaneMode !== 'none' ? [clippingPlane] : [],
    side: THREE.DoubleSide
  });

  if (struct.id === 'lateral_ventricles') {
    [-1, 1].forEach(side => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 5, -8, 18),   // Anterior Horn
        new THREE.Vector3(side * 11, 4, 14),   // Body
        new THREE.Vector3(side * 14, 8, -6),   // Atrium
        new THREE.Vector3(side * 12, -2, -22), // Posterior Horn
        new THREE.Vector3(side * 20, -18, -2)  // Inferior / Temporal Horn
      ]);
      const geom = new THREE.TubeGeometry(curve, 32, 2.6, 12, false);
      const m = new THREE.Mesh(geom, mat);
      m.userData = { id: struct.id, data: struct };
      group.add(m);
    });
  } else if (struct.id === 'third_fourth_ventricles') {
    // 3rd Ventricle slit
    const geom3 = new THREE.BoxGeometry(2.4, 14, 18);
    const m3 = new THREE.Mesh(geom3, mat);
    m3.position.set(0, -12, 0);
    group.add(m3);

    // Aqueduct of Sylvius
    const aquaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -18, -4),
      new THREE.Vector3(0, -28, -10)
    ]);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(aquaCurve, 12, 1.2, 8, false), mat));

    // 4th Ventricle tent-shaped cavity
    const geom4 = new THREE.ConeGeometry(5, 12, 4);
    geom4.rotateX(-0.4);
    const m4 = new THREE.Mesh(geom4, mat);
    m4.position.set(0, -36, -14);
    group.add(m4);
  }

  return group;
}

function createVasculatureMesh(struct) {
  const group = new THREE.Group();
  const color = state.colorMode === 'realistic' ? PALETTES.realistic.vasculature : PALETTES.functional.vasculature;
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.22,
    metalness: 0.15,
    emissive: new THREE.Color(0x881337),
    emissiveIntensity: 0.35,
    clippingPlanes: state.cuttingPlaneMode !== 'none' ? [clippingPlane] : []
  });

  if (struct.id === 'circle_of_willis') {
    // Anastomotic ring at skull base / interpeduncular fossa
    const ringCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -18, 12),     // ACoA (Anterior)
      new THREE.Vector3(7, -19, 8),      // Right ICA / ACA junction
      new THREE.Vector3(9, -21, 0),      // Right PCoA
      new THREE.Vector3(4, -22, -6),     // Right PCA / Basilar bifurcation
      new THREE.Vector3(-4, -22, -6),    // Left PCA / Basilar bifurcation
      new THREE.Vector3(-9, -21, 0),     // Left PCoA
      new THREE.Vector3(-7, -19, 8),     // Left ICA / ACA junction
      new THREE.Vector3(0, -18, 12)      // Loop close
    ]);
    const ringGeom = new THREE.TubeGeometry(ringCurve, 36, 1.5, 10, true);
    group.add(new THREE.Mesh(ringGeom, mat));
  } else if (struct.id === 'basilar_vertebral_artery') {
    // Basilar trunk along anterior pons
    const basilarCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -42, -16), // Vertebral junction (pontomedullary sulcus)
      new THREE.Vector3(0, -32, -11), // Mid-pons groove
      new THREE.Vector3(0, -22, -6)   // Basilar apex bifurcation into PCA
    ]);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(basilarCurve, 20, 1.8, 10, false), mat));

    // Bilateral Vertebral arteries
    [-1, 1].forEach(side => {
      const vertCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 8, -58, -20),
        new THREE.Vector3(side * 5, -50, -18),
        new THREE.Vector3(0, -42, -16)
      ]);
      group.add(new THREE.Mesh(new THREE.TubeGeometry(vertCurve, 16, 1.6, 10, false), mat));
    });
  } else if (struct.id === 'middle_cerebral_artery') {
    // Bilateral MCA trees extending laterally into Sylvian fissure
    [-1, 1].forEach(side => {
      const m1Curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 7, -19, 8),
        new THREE.Vector3(side * 18, -19, 8),
        new THREE.Vector3(side * 30, -20, 10)
      ]);
      group.add(new THREE.Mesh(new THREE.TubeGeometry(m1Curve, 20, 1.6, 10, false), mat));

      // M2 branches into lateral sulcus
      const m2Sup = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 30, -20, 10),
        new THREE.Vector3(side * 38, -10, 16),
        new THREE.Vector3(side * 42, 4, 18)
      ]);
      const m2Inf = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 30, -20, 10),
        new THREE.Vector3(side * 40, -24, 6),
        new THREE.Vector3(side * 44, -30, -2)
      ]);
      group.add(new THREE.Mesh(new THREE.TubeGeometry(m2Sup, 16, 1.2, 8, false), mat));
      group.add(new THREE.Mesh(new THREE.TubeGeometry(m2Inf, 16, 1.2, 8, false), mat));
    });
  } else if (struct.id === 'anterior_cerebral_artery') {
    // Bilateral ACA curving up over the corpus callosum
    [-1, 1].forEach(side => {
      const acaCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 2.5, -18, 12),
        new THREE.Vector3(side * 2.2, -4, 18),
        new THREE.Vector3(side * 2.2, 10, 19),
        new THREE.Vector3(side * 2.5, 18, 10),
        new THREE.Vector3(side * 2.5, 12, -6)
      ]);
      group.add(new THREE.Mesh(new THREE.TubeGeometry(acaCurve, 28, 1.4, 10, false), mat));
    });
  } else if (struct.id === 'venous_sinuses') {
    // Superior Sagittal Sinus arched along the superior midline vault
    const sssCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 22, 50),   // Anterior crista galli
      new THREE.Vector3(0, 48, 30),   // Frontal vertex
      new THREE.Vector3(0, 55, 0),    // Superior sagittal apex
      new THREE.Vector3(0, 48, -35),  // Parietal curvature
      new THREE.Vector3(0, 18, -62),  // Occipital vault
      new THREE.Vector3(0, -10, -64)  // Confluence of sinuses (Torcular Herophili)
    ]);
    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.3,
      emissive: 0x0369a1,
      clippingPlanes: state.cuttingPlaneMode !== 'none' ? [clippingPlane] : []
    });
    group.add(new THREE.Mesh(new THREE.TubeGeometry(sssCurve, 32, 3.2, 12, false), blueMat));
  }

  return group;
}

// ============================================================================
// Color Mode Switching (Realistic Tissue vs Functional Lobes)
// ============================================================================
function setColorMode(mode) {
  state.colorMode = mode;

  // Update FreeSurfer GLTF meshes
  gltfMeshMap.forEach((mesh, name) => {
    const targetColor = getMeshColor(name, mode);
    mesh.material.color.setHex(targetColor);
    mesh.userData.originalColor = targetColor;
  });

  // Update internal structures (Thalamus, Ventricles, Vasculature)
  structureMeshMap.forEach((mesh, id) => {
    mesh.traverse(child => {
      if (child.isMesh && child.material) {
        let col = 0xffffff;
        if (id === 'thalamus') {
          col = mode === 'realistic' ? PALETTES.realistic.thalamus : PALETTES.functional.thalamus;
        } else if (id.includes('ventricle')) {
          col = mode === 'realistic' ? PALETTES.realistic.ventricles : PALETTES.functional.ventricles;
        } else if (id.includes('artery') || id.includes('circle_of_willis')) {
          col = mode === 'realistic' ? PALETTES.realistic.vasculature : PALETTES.functional.vasculature;
        }
        child.material.color.setHex(col);
      }
    });
  });

  // Update button UI
  const textEl = document.getElementById('color-mode-text');
  const btn = document.getElementById('btn-toggle-color-mode');
  if (textEl && btn) {
    if (mode === 'realistic') {
      textEl.textContent = 'สีเนื้อเยื่อจริง';
      btn.classList.add('active');
    } else {
      textEl.textContent = 'สีแยกกลีบสมอง';
      btn.classList.remove('active');
    }
  }
}

// ============================================================================
// Cortex Peeling & Opacity Control
// ============================================================================
function updateCortexOpacity(val) {
  state.cortexOpacity = parseFloat(val);

  const badge = document.getElementById('cortex-opacity-badge');
  if (badge) badge.textContent = `${Math.round(state.cortexOpacity * 100)}%`;

  gltfMeshMap.forEach((mesh, name) => {
    if (mesh.userData.isCorticalLobe) {
      if (state.cortexOpacity >= 0.98) {
        mesh.visible = state.systems.cerebrum;
        mesh.material.transparent = false;
        mesh.material.opacity = 1.0;
        mesh.material.depthWrite = true;
      } else if (state.cortexOpacity > 0.02) {
        mesh.visible = state.systems.cerebrum;
        mesh.material.transparent = true;
        mesh.material.opacity = state.cortexOpacity;
        mesh.material.depthWrite = false; // Prevents translucent shell from hiding inner structures
      } else {
        mesh.visible = false;
      }
      mesh.material.needsUpdate = true;
    }
  });
}

// ============================================================================
// Interactive 3D Cutting Plane Logic
// ============================================================================
function setCuttingPlaneMode(mode) {
  state.cuttingPlaneMode = mode;

  // Highlight active button
  document.querySelectorAll('#cutting-plane-group .seg-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.plane === mode);
  });

  const sliceSliderWrapper = document.getElementById('slice-slider-wrapper');
  const slider = document.getElementById('plane-slice-slider');

  if (mode === 'none') {
    planeHelperMesh.visible = false;
    updateAllMaterialsClipping([]);
    if (sliceSliderWrapper) sliceSliderWrapper.style.display = 'none';
    return;
  }

  if (sliceSliderWrapper) sliceSliderWrapper.style.display = 'inline-flex';
  planeHelperMesh.visible = true;

  // Configure slider bounds
  const range = state.sliceRange[mode];
  if (slider) {
    slider.min = range.min;
    slider.max = range.max;
    slider.value = range.current;
  }

  updateCuttingPlaneOrientation();
  updateCuttingPlanePosition(range.current);
}

function updateCuttingPlaneOrientation() {
  const sign = state.planeFlipped ? -1 : 1;

  if (state.cuttingPlaneMode === 'axial') {
    clippingPlane.normal.set(0, 0, sign * -1);
    planeHelperMesh.rotation.set(0, 0, 0);
  } else if (state.cuttingPlaneMode === 'coronal') {
    clippingPlane.normal.set(0, sign * -1, 0);
    planeHelperMesh.rotation.set(Math.PI / 2, 0, 0);
  } else if (state.cuttingPlaneMode === 'sagittal') {
    clippingPlane.normal.set(sign * -1, 0, 0);
    planeHelperMesh.rotation.set(0, Math.PI / 2, 0);
  }

  updateAllMaterialsClipping([clippingPlane]);
}

function updateCuttingPlanePosition(val) {
  const numVal = parseFloat(val);
  state.sliceRange[state.cuttingPlaneMode].current = numVal;

  if (state.cuttingPlaneMode === 'axial') {
    state.sliceCoord.z = numVal;
    planeHelperMesh.position.set(0, 0, numVal);
    clippingPlane.constant = (state.planeFlipped ? -1 : 1) * numVal;
  } else if (state.cuttingPlaneMode === 'coronal') {
    state.sliceCoord.y = numVal;
    planeHelperMesh.position.set(0, numVal, 0);
    clippingPlane.constant = (state.planeFlipped ? -1 : 1) * numVal;
  } else if (state.cuttingPlaneMode === 'sagittal') {
    state.sliceCoord.x = numVal;
    planeHelperMesh.position.set(numVal, 0, 0);
    clippingPlane.constant = (state.planeFlipped ? -1 : 1) * numVal;
  }

  const badge = document.getElementById('plane-pos-badge');
  if (badge) badge.textContent = `${Math.round(numVal)} mm`;

  const rounded = Math.round(numVal);
  if (state.lastSliceTick !== rounded) {
    state.lastSliceTick = rounded;
    sound.playSliceTick();
  }

  renderMPRSlices();
}

function updateAllMaterialsClipping(planes) {
  gltfMeshMap.forEach(mesh => {
    if (mesh.material) {
      mesh.material.clippingPlanes = planes;
      mesh.material.needsUpdate = true;
    }
  });

  structureMeshMap.forEach(mesh => {
    mesh.traverse(child => {
      if (child.isMesh && child.material) {
        child.material.clippingPlanes = planes;
        child.material.needsUpdate = true;
      }
    });
  });
}

// ============================================================================
// Multi-Planar Reconstruction (MPR) 2D Slicing Engine
// ============================================================================
function initMPRCanvases() {
  ['axial', 'coronal', 'sagittal'].forEach(plane => {
    const canvas = document.getElementById(`mpr-${plane}-canvas`);
    if (canvas) {
      mprPanels[plane].canvas = canvas;
      mprPanels[plane].ctx = canvas.getContext('2d');
      canvas.width = mprPanels[plane].size;
      canvas.height = mprPanels[plane].size;

      canvas.addEventListener('mousedown', (e) => onMPRMouseDown(e, plane));
    }
  });

  window.addEventListener('mousemove', onMPRMouseMove);
  window.addEventListener('mouseup', onMPRMouseUp);
}

function onMPRMouseDown(e, plane) {
  state.isDraggingCanvas = plane;
  handleMPRClick(e, plane);
}

function onMPRMouseMove(e) {
  if (!state.isDraggingCanvas) return;
  handleMPRClick(e, state.isDraggingCanvas);
}

function onMPRMouseUp() {
  state.isDraggingCanvas = null;
}

function handleMPRClick(e, plane) {
  const panel = mprPanels[plane];
  const rect = panel.canvas.getBoundingClientRect();
  const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

  if (plane === 'axial') {
    state.sliceCoord.x = (x - 0.5) * 100;
    state.sliceCoord.y = (0.5 - y) * 120;
  } else if (plane === 'coronal') {
    state.sliceCoord.x = (x - 0.5) * 100;
    state.sliceCoord.z = (0.5 - y) * 100;
  } else if (plane === 'sagittal') {
    state.sliceCoord.y = (0.5 - x) * 120;
    state.sliceCoord.z = (0.5 - y) * 100;
  }

  // If 3D cutting plane matches, sync position
  const slider = document.getElementById('plane-slice-slider');
  if (state.cuttingPlaneMode === 'axial' && slider) {
    slider.value = state.sliceCoord.z;
    updateCuttingPlanePosition(state.sliceCoord.z);
  } else if (state.cuttingPlaneMode === 'coronal' && slider) {
    slider.value = state.sliceCoord.y;
    updateCuttingPlanePosition(state.sliceCoord.y);
  } else if (state.cuttingPlaneMode === 'sagittal' && slider) {
    slider.value = state.sliceCoord.x;
    updateCuttingPlanePosition(state.sliceCoord.x);
  }

  renderMPRSlices();
}

function renderMPRSlices() {
  renderAxialSlice();
  renderCoronalSlice();
  renderSagittalSlice();
  updateHUDReadouts();
}

function renderAxialSlice() {
  const { ctx, size } = mprPanels.axial;
  if (!ctx) return;
  const z = state.sliceCoord.z;

  ctx.fillStyle = '#05070c';
  ctx.fillRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  ctx.save();
  ctx.translate(cx, cy);

  // Outer skull
  const skullW = 75;
  const skullH = 92;
  ctx.strokeStyle = `rgba(180, 200, 220, ${0.4 * state.contrast})`;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.ellipse(0, 3, skullW, skullH, 0, 0, Math.PI * 2);
  ctx.stroke();

  // CSF Space
  ctx.fillStyle = `rgba(15, 20, 30, ${0.9 * state.contrast})`;
  ctx.beginPath();
  ctx.ellipse(0, 3, skullW - 4, skullH - 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cortex Ribbon
  const brainW = 68;
  const brainH = 84;
  ctx.fillStyle = `rgba(130, 140, 155, ${0.85 * state.contrast})`;
  ctx.beginPath();
  ctx.ellipse(0, 3, brainW, brainH, 0, 0, Math.PI * 2);
  ctx.fill();

  // White matter centrum semiovale
  ctx.fillStyle = `rgba(185, 195, 210, ${0.9 * state.contrast})`;
  ctx.beginPath();
  ctx.ellipse(0, 2, brainW * 0.78, brainH * 0.76, 0, 0, Math.PI * 2);
  ctx.fill();

  // Longitudinal Fissure
  ctx.strokeStyle = '#05070c';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -brainH);
  ctx.lineTo(0, brainH);
  ctx.stroke();

  // Lateral Ventricles (visible at mid-superior levels)
  if (z > -20 && z < 30) {
    const vScale = Math.cos((z / 30) * (Math.PI / 2));
    ctx.fillStyle = `rgba(10, 15, 25, ${0.95 * state.contrast})`;
    [-1, 1].forEach(side => {
      ctx.beginPath();
      ctx.ellipse(side * 14 * vScale, -4, 5 * vScale, 20 * vScale, side * 0.2, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Virtual Lesion Pathology Overlay
  renderMPRLesionOverlay(ctx, 'axial', size);

  // Crosshair
  drawCrosshairs(ctx, cx, cy, size, state.sliceCoord.x / 100, -state.sliceCoord.y / 120);

  ctx.restore();
}

function renderCoronalSlice() {
  const { ctx, size } = mprPanels.coronal;
  if (!ctx) return;
  const y = state.sliceCoord.y;

  ctx.fillStyle = '#05070c';
  ctx.fillRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  ctx.save();
  ctx.translate(cx, cy);

  // Skull
  const skullW = 75;
  const skullH = 75;
  ctx.strokeStyle = `rgba(180, 200, 220, ${0.4 * state.contrast})`;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, skullW, skullH, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Brain
  ctx.fillStyle = `rgba(130, 140, 155, ${0.85 * state.contrast})`;
  ctx.beginPath();
  ctx.ellipse(0, 0, skullW - 8, skullH - 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // White matter
  ctx.fillStyle = `rgba(185, 195, 210, ${0.9 * state.contrast})`;
  ctx.beginPath();
  ctx.ellipse(0, 0, (skullW - 8) * 0.8, (skullH - 8) * 0.78, 0, 0, Math.PI * 2);
  ctx.fill();

  // Interhemispheric fissure
  ctx.strokeStyle = '#05070c';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -(skullH - 8));
  ctx.lineTo(0, skullH - 8);
  ctx.stroke();

  // Virtual Lesion Pathology Overlay
  renderMPRLesionOverlay(ctx, 'coronal', size);

  // Crosshair
  drawCrosshairs(ctx, cx, cy, size, state.sliceCoord.x / 100, -state.sliceCoord.z / 100);

  ctx.restore();
}

function renderSagittalSlice() {
  const { ctx, size } = mprPanels.sagittal;
  if (!ctx) return;
  const x = state.sliceCoord.x;

  ctx.fillStyle = '#05070c';
  ctx.fillRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  ctx.save();
  ctx.translate(cx, cy);

  // Calvarium
  const skullW = 82;
  const skullH = 72;
  ctx.strokeStyle = `rgba(180, 200, 220, ${0.4 * state.contrast})`;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.ellipse(-2, -4, skullW, skullH, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Hemisphere
  ctx.fillStyle = `rgba(130, 140, 155, ${0.85 * state.contrast})`;
  ctx.beginPath();
  ctx.ellipse(-2, -4, skullW - 8, skullH - 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cerebellum (inferior posterior)
  ctx.fillStyle = `rgba(145, 155, 165, ${0.9 * state.contrast})`;
  ctx.beginPath();
  ctx.ellipse(32, 34, 25, 20, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Brainstem & Pons
  ctx.fillStyle = `rgba(175, 185, 195, ${0.9 * state.contrast})`;
  ctx.beginPath();
  ctx.ellipse(8, 38, 14, 25, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Corpus Callosum C-shape (Midline)
  if (Math.abs(x) < 14) {
    ctx.strokeStyle = `rgba(230, 235, 245, ${0.95 * state.contrast})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(-2, 0, 24, Math.PI * 0.9, Math.PI * 2.1, false);
    ctx.stroke();
  }

  // Virtual Lesion Pathology Overlay
  renderMPRLesionOverlay(ctx, 'sagittal', size);

  // Crosshair
  drawCrosshairs(ctx, cx, cy, size, -state.sliceCoord.y / 120, -state.sliceCoord.z / 100);

  ctx.restore();
}

function renderMPRLesionOverlay(ctx, plane, size) {
  if (!lesionSimulator || !lesionSimulator.isLesionActive()) return;

  const activeId = lesionSimulator.getActiveLesionId();
  const struct = BRAIN_STRUCTURES.find(s => s.id === activeId);
  if (!struct || !struct.center) return;

  const [lx, ly, lz] = struct.center;

  let dist = 999;
  let normX = 0;
  let normY = 0;

  if (plane === 'axial') {
    dist = Math.abs(state.sliceCoord.z - lz);
    normX = lx / 100;
    normY = -ly / 120;
  } else if (plane === 'coronal') {
    dist = Math.abs(state.sliceCoord.y - ly);
    normX = lx / 100;
    normY = -lz / 100;
  } else if (plane === 'sagittal') {
    dist = Math.abs(state.sliceCoord.x - lx);
    normX = -ly / 120;
    normY = -lz / 100;
  }

  // If slice plane is within 24mm of the lesion centroid
  if (dist < 24) {
    const intensity = Math.max(0.2, 1 - (dist / 24));
    const px = normX * (size / 2);
    const py = normY * (size / 2);
    const radius = 18 * intensity + 5;

    // 1. Ischemic Penumbra / Edema outer halo
    const grad = ctx.createRadialGradient(px, py, radius * 0.2, px, py, radius);
    grad.addColorStop(0, `rgba(239, 68, 68, ${0.85 * intensity})`);
    grad.addColorStop(0.5, `rgba(220, 38, 38, ${0.45 * intensity})`);
    grad.addColorStop(1, 'rgba(239, 68, 68, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fill();

    // 2. Hypodense necrotic core
    ctx.fillStyle = `rgba(5, 5, 10, ${0.9 * intensity})`;
    ctx.beginPath();
    ctx.arc(px, py, radius * 0.45, 0, Math.PI * 2);
    ctx.fill();

    // 3. Pathology label
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 8px monospace';
    ctx.fillText('INFARCT', px - 18, py - radius - 2);
  }
}

function drawCrosshairs(ctx, cx, cy, size, normX, normY) {
  const crossX = normX * (size / 2);
  const crossY = normY * (size / 2);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);

  ctx.beginPath();
  ctx.moveTo(crossX, -cy);
  ctx.lineTo(crossX, cy);
  ctx.moveTo(-cx, crossY);
  ctx.lineTo(cx, crossY);
  ctx.stroke();
  ctx.setLineDash([]);
}

function updateHUDReadouts() {
  const axialIdx = document.getElementById('axial-idx');
  const coronalIdx = document.getElementById('coronal-idx');
  const sagittalIdx = document.getElementById('sagittal-idx');

  if (axialIdx) axialIdx.textContent = `Z: ${Math.round(state.sliceCoord.z)} mm`;
  if (coronalIdx) coronalIdx.textContent = `Y: ${Math.round(state.sliceCoord.y)} mm`;
  if (sagittalIdx) sagittalIdx.textContent = `X: ${Math.round(state.sliceCoord.x)} mm`;

  const hudCoords = document.getElementById('hud-coords');
  if (hudCoords) {
    hudCoords.textContent = `MNI (${Math.round(state.sliceCoord.x)}, ${Math.round(state.sliceCoord.y)}, ${Math.round(state.sliceCoord.z)})`;
  }
}

// ============================================================================
// Structure Selection & Bilingual Medical Inspector Card
// ============================================================================
function selectStructure(id, moveCamera = true) {
  state.selectedId = id;
  const struct = BRAIN_STRUCTURES.find(s => s.id === id);
  if (!struct) return;

  // Audio feedback
  sound.playSelectChime();

  // Position 3D Pinpoint Target Marker
  if (targetPinpointMarker && struct.center) {
    targetPinpointMarker.position.set(struct.center[0], struct.center[1], struct.center[2]);
    targetPinpointMarker.visible = true;
  }

  // Unhighlight all, highlight selected
  structureMeshMap.forEach((mesh, mId) => {
    const isTarget = mId === id;
    mesh.traverse(child => {
      if (child.isMesh && child.material) {
        child.material.emissive = new THREE.Color(isTarget ? 0x38bdf8 : 0x000000);
        child.material.emissiveIntensity = isTarget ? 0.6 : 0.0;
      }
    });
  });

  // Highlight FreeSurfer GLTF meshes
  gltfMeshMap.forEach((mesh, name) => {
    const isTarget =
      (id.includes('frontal') && (name === 'frontal-lobe' || name === 'prefrontal-cortex')) ||
      (id.includes('parietal') && name === 'parietal-lobe') ||
      (id.includes('temporal') && name === 'temporal-lobe') ||
      (id.includes('occipital') && name === 'occipital-lobe') ||
      (id.includes('cerebellum') && name === 'cerebellum') ||
      (id.includes('brainstem') && name === 'brain-stem') ||
      (id === 'hippocampus' && name === 'hippocampus') ||
      (id === 'amygdala' && name === 'amygdala') ||
      (id === 'corpus_callosum' && name === 'corpus-callosum');

    if (mesh.material) {
      mesh.material.emissive = new THREE.Color(isTarget ? 0x0ea5e9 : 0x000000);
      mesh.material.emissiveIntensity = isTarget ? 0.45 : 0.0;
    }
  });

  // Update Inspector Card
  updateInspectorUI(struct);

  // Center crosshair coordinates
  if (struct.center) {
    state.sliceCoord.x = struct.center[0];
    state.sliceCoord.y = struct.center[1];
    state.sliceCoord.z = struct.center[2];
    renderMPRSlices();
  }

  // Camera lerp
  if (moveCamera && struct.center) {
    const target = new THREE.Vector3(struct.center[0], struct.center[1], struct.center[2]);
    controls.target.lerp(target, 0.8);
  }

  // Sync with Clinical Detective Case UI if active
  const caseCurrentAtlas = document.getElementById('case-current-selected-atlas');
  if (caseCurrentAtlas) {
    caseCurrentAtlas.textContent = `${struct.nameTh} (${struct.nameEn})`;
  }
  const caseStructSelect = document.getElementById('case-suspected-structure-select');
  if (caseStructSelect) {
    caseStructSelect.value = id;
  }
}

function isolateStructure(id) {
  if (state.isolatedId === id) {
    // Un-isolate
    state.isolatedId = null;
    gltfMeshMap.forEach(m => m.visible = true);
    structureMeshMap.forEach(m => m.visible = true);
    updateCortexOpacity(state.cortexOpacity);
  } else {
    state.isolatedId = id;
    gltfMeshMap.forEach(m => m.visible = false);
    structureMeshMap.forEach((m, mId) => {
      m.visible = mId === id;
    });
  }
}

// ============================================================================
// Neuro-Pinpoint Quest Controller & HUD
// ============================================================================
function initQuestSystem() {
  questManager = new QuestManager({
    onSelectTarget: (id) => selectStructure(id, true),
    onApplyPeel: (opacity) => {
      const slider = document.getElementById('cortex-opacity-slider');
      if (slider) slider.value = opacity;
      updateCortexOpacity(opacity);
    },
    onCameraFocus: (coords) => {
      if (coords && controls) {
        controls.target.set(coords[0], coords[1], coords[2]);
      }
    },
    onUpdateHUD: (data) => updateQuestHUD(data)
  });
}

function updateQuestHUD(data) {
  const questCard = document.getElementById('quest-hud-card');
  const btnQuest = document.getElementById('btn-toggle-quest');
  const toast = document.getElementById('quest-celebrate-toast');

  if (!questCard) return;

  if (!data.isActive) {
    questCard.style.display = 'none';
    if (btnQuest) btnQuest.classList.remove('active');
    if (toast) toast.style.display = 'none';
    return;
  }

  questCard.style.display = 'flex';
  if (btnQuest) btnQuest.classList.add('active');

  const q = data.question;
  if (!q) return;

  const levelBadge = document.getElementById('quest-level-badge');
  const progressText = document.getElementById('quest-progress-text');
  const streakBadge = document.getElementById('quest-streak-badge');
  const scoreBadge = document.getElementById('quest-score-badge');
  const promptEl = document.getElementById('quest-prompt-th');
  const symptomEl = document.getElementById('quest-symptom-text');
  const hintEl = document.getElementById('quest-hint-text');
  const hintBox = document.getElementById('quest-hint-box');

  if (levelBadge) levelBadge.textContent = q.levelNameTh;
  if (progressText) progressText.textContent = `ข้อที่ ${data.currentIndex + 1} / ${data.totalQuestions}`;
  if (streakBadge) streakBadge.textContent = `🔥 สตรีค: ${data.streak}`;
  if (scoreBadge) scoreBadge.textContent = `⭐ ${data.score} XP`;
  if (promptEl) promptEl.textContent = q.promptTh;
  if (symptomEl) symptomEl.textContent = q.symptomTh;
  if (hintEl) hintEl.textContent = q.hintTh;
  if (hintBox) hintBox.style.display = 'none';
  const questSocraticBox = document.getElementById('quest-socratic-box');
  if (questSocraticBox && !data.resultEvent) questSocraticBox.style.display = 'none';

  // Handle result event
  if (data.resultEvent) {
    if (data.resultEvent.correct && toast) {
      if (questSocraticBox) questSocraticBox.style.display = 'none';
      const toastTitle = document.getElementById('toast-title');
      const toastScore = document.getElementById('toast-score');
      const toastFact = document.getElementById('toast-fact');

      if (toastTitle) toastTitle.textContent = `🎉 ถูกต้องยอดเยี่ยม! (${data.resultEvent.attempts === 1 ? 'ครั้งแรก!' : 'พยายามสำเร็จ'})`;
      if (toastScore) toastScore.textContent = `+${data.resultEvent.points} XP`;
      if (toastFact) toastFact.textContent = q.funFactTh;

      toast.style.display = 'flex';
    } else if (!data.resultEvent.correct && questSocraticBox) {
      const questSocraticText = document.getElementById('quest-socratic-text');
      const target = BRAIN_STRUCTURES.find(s => s.id === q.targetId);
      const sel = BRAIN_STRUCTURES.find(s => s.id === data.resultEvent.selectedId);
      const diag = socraticTutor.diagnoseQuestSelection(target, sel, i18nManager?.currentLang);
      if (diag && questSocraticText) {
        questSocraticText.textContent = diag.feedback;
        questSocraticBox.style.display = 'flex';
      }
    }
  }
}

// ============================================================================
// Virtual Clinical Lesion & Stroke Simulator Controller
// ============================================================================
function initLesionSimulator() {
  lesionSimulator = new LesionSimulator({
    onLesionChange: (data) => updateLesionUI(data)
  });
}

function updateLesionUI(data) {
  const panel = document.getElementById('inspector-lesion-panel');
  const btnLesion = document.getElementById('btn-inspector-lesion');

  if (!data.isActive) {
    if (panel) panel.style.display = 'none';
    if (btnLesion) {
      btnLesion.classList.remove('active');
      btnLesion.innerHTML = '<span>⚡</span> <span>จำลองรอยโรค</span>';
    }
    restoreHealthyMaterials();
    renderMPRSlices();
    return;
  }

  if (panel) panel.style.display = 'flex';
  if (btnLesion) {
    btnLesion.classList.add('active');
    btnLesion.innerHTML = '<span>⚡</span> <span>รอยโรคแอคทีฟ</span>';
  }

  const p = data.profile;
  if (!p) return;

  const severityEl = document.getElementById('lesion-severity');
  const titleEl = document.getElementById('lesion-syndrome-title');
  const speechEl = document.getElementById('lesion-speech');
  const motorEl = document.getElementById('lesion-motor');
  const visionEl = document.getElementById('lesion-vision');
  const radioEl = document.getElementById('lesion-radiology');

  if (severityEl) severityEl.textContent = `ระดับความรุนแรง: ${p.severityTh}`;
  if (titleEl) titleEl.textContent = p.syndromeTh;
  if (speechEl) speechEl.textContent = p.speechDeficitTh;
  if (motorEl) motorEl.textContent = p.motorDeficitTh;
  if (visionEl) visionEl.textContent = p.visionDeficitTh;
  if (radioEl) radioEl.textContent = p.radiologyTh;

  renderVisualFieldPerimetry(data.activeId);
  renderMPRSlices();
}

function restoreHealthyMaterials() {
  setColorMode(state.colorMode);
  updateCortexOpacity(state.cortexOpacity);
  if (state.selectedId) {
    selectStructure(state.selectedId, false);
  }
}

function renderVisualFieldPerimetry(lesionId) {
  const canvas = document.getElementById('visual-field-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  ctx.fillStyle = '#06080e';
  ctx.fillRect(0, 0, w, h);

  const eyes = [
    { name: 'OS (ตาซ้าย)', cx: 45, cy: 30, r: 20 },
    { name: 'OD (ตาขวา)', cx: 115, cy: 30, r: 20 }
  ];

  eyes.forEach(eye => {
    // Normal healthy visual field (green-tinted sensitivity)
    ctx.fillStyle = 'rgba(16, 185, 129, 0.45)';
    ctx.beginPath();
    ctx.arc(eye.cx, eye.cy, eye.r, 0, Math.PI * 2);
    ctx.fill();

    // Crosshairs
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(eye.cx - eye.r, eye.cy);
    ctx.lineTo(eye.cx + eye.r, eye.cy);
    ctx.moveTo(eye.cx, eye.cy - eye.r);
    ctx.lineTo(eye.cx, eye.cy + eye.r);
    ctx.stroke();

    // Deficit Shading
    if (lesionId === 'occipital_lobe_left') {
      // Right Homonymous Hemianopsia (Right half of BOTH eyes blinded)
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(eye.cx, eye.cy, eye.r, -Math.PI / 2, Math.PI / 2, false);
      ctx.fill();
    } else if (lesionId === 'occipital_lobe_right') {
      // Left Homonymous Hemianopsia (Left half of BOTH eyes blinded)
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(eye.cx, eye.cy, eye.r, Math.PI / 2, -Math.PI / 2, false);
      ctx.fill();
    }

    // Outer border
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(eye.cx, eye.cy, eye.r, 0, Math.PI * 2);
    ctx.stroke();

    // Label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(eye.name, eye.cx, eye.cy + eye.r + 11);
  });
}

// ============================================================================
// Clinical Detective Case Studies Controller & Modal
// ============================================================================
function initCaseStudies() {
  caseStudyManager = new CaseStudyManager({
    onSelectStructure: (id, focusCamera) => {
      selectStructure(id, focusCamera);
    },
    onAlignMpr: (slicePos) => {
      if (slicePos.axial !== undefined) {
        state.sliceRange.axial.current = slicePos.axial;
        state.sliceCoord.z = slicePos.axial;
      }
      if (slicePos.coronal !== undefined) {
        state.sliceRange.coronal.current = slicePos.coronal;
        state.sliceCoord.y = slicePos.coronal;
      }
      if (slicePos.sagittal !== undefined) {
        state.sliceRange.sagittal.current = slicePos.sagittal;
        state.sliceCoord.x = slicePos.sagittal;
      }

      // If a cutting plane is active in 3D, update its slider and plane
      if (state.cuttingPlaneMode !== 'none') {
        const currentVal = state.sliceRange[state.cuttingPlaneMode].current;
        const planeSlider = document.getElementById('plane-slice-slider');
        if (planeSlider) planeSlider.value = currentVal;
        updateCuttingPlanePosition(currentVal);
      }

      // Make sure floating MPR window is open so students see the result!
      const floatingMprWindow = document.getElementById('floating-mpr-window');
      const btnToggleMpr = document.getElementById('btn-toggle-mpr');
      if (floatingMprWindow) {
        state.isMprVisible = true;
        floatingMprWindow.style.display = 'flex';
        if (btnToggleMpr) btnToggleMpr.classList.add('active');
      }

      renderMPRSlices();
    },
    onSimulateLesion: (targetId) => {
      if (lesionSimulator) {
        lesionSimulator.activateLesion(targetId);
      }
    },
    onApplyPeel: (opacity) => {
      const opacitySlider = document.getElementById('cortex-opacity-slider');
      if (opacitySlider) opacitySlider.value = opacity;
      updateCortexOpacity(opacity);
    },
    onUpdateUI: (data) => updateCaseModalUI(data)
  });

  // Populate structure dropdown once structures are loaded
  populateCaseStructureDropdown();
}

function populateCaseStructureDropdown() {
  const select = document.getElementById('case-suspected-structure-select');
  if (!select) return;

  select.innerHTML = '<option value="">-- เลือกโครงสร้างที่สงสัยว่าเกิดรอยโรค --</option>' +
    BRAIN_STRUCTURES.map(s => `<option value="${s.id}">${s.nameTh} (${s.nameEn})</option>`).join('');
}

function updateCaseModalUI(data) {
  const modal = document.getElementById('case-modal');
  const btnToggle = document.getElementById('btn-toggle-cases');

  if (!modal) return;

  if (!data.isActive) {
    modal.style.display = 'none';
    if (btnToggle) btnToggle.classList.remove('active');
    return;
  }

  modal.style.display = 'flex';
  if (btnToggle) btnToggle.classList.add('active');

  const c = data.currentCase;
  if (!c) return;

  // Header
  const titleEl = document.getElementById('case-title');
  const subTitleEl = document.getElementById('case-subtitle');
  const xpChip = document.getElementById('case-xp-chip');
  const statusChip = document.getElementById('case-status-chip');

  if (titleEl) titleEl.textContent = `เคสที่ ${c.caseNumber}: ${c.titleTh}`;
  if (subTitleEl) subTitleEl.textContent = c.titleEn;
  if (xpChip) xpChip.textContent = `⭐ ${data.diagnosticXP} XP`;

  if (statusChip) {
    if (data.isCurrentSolved) {
      statusChip.textContent = '✅ วินิจฉัยสำเร็จแล้ว';
      statusChip.className = 'case-stat-chip case-status-solved';
    } else {
      statusChip.textContent = '📝 รอดำเนินการ';
      statusChip.className = 'case-stat-chip case-status-pending';
    }
  }

  // Update Case Pills
  for (let i = 0; i < data.totalCases; i++) {
    const pill = document.getElementById(`case-pill-${i}`);
    if (pill) {
      pill.classList.toggle('active', i === data.currentIndex);
    }
  }

  // Tab 1: Intake
  const patientNameEl = document.getElementById('case-patient-name');
  const patientDemogEl = document.getElementById('case-patient-demog');
  const bpEl = document.getElementById('case-vital-bp');
  const hrEl = document.getElementById('case-vital-hr');
  const rrEl = document.getElementById('case-vital-rr');
  const spo2El = document.getElementById('case-vital-spo2');
  const complaintEl = document.getElementById('case-chief-complaint');
  const historyEl = document.getElementById('case-history-text');
  const examListEl = document.getElementById('case-exam-list');

  if (patientNameEl) patientNameEl.textContent = c.patientName;
  if (patientDemogEl) patientDemogEl.textContent = `อายุ ${c.age} ปี · ${c.sex} · ${c.occupation}`;
  if (bpEl) bpEl.textContent = c.vitals.bp;
  if (hrEl) hrEl.textContent = c.vitals.hr;
  if (rrEl) rrEl.textContent = c.vitals.rr;
  if (spo2El) spo2El.textContent = c.vitals.spo2;
  if (complaintEl) complaintEl.textContent = c.chiefComplaint;
  if (historyEl) historyEl.textContent = c.history;

  if (examListEl) {
    examListEl.innerHTML = c.physicalExam.map(e => `
      <div class="exam-item">
        <div class="exam-item-sys">${e.system}</div>
        <div class="exam-item-desc">${e.finding}</div>
      </div>
    `).join('');
  }

  // Tab 2: 3D & Imaging
  const targetStructEl = document.getElementById('case-target-structure');
  const targetMniEl = document.getElementById('case-target-mni');
  const targetVascularEl = document.getElementById('case-target-vascular');
  const currentAtlasEl = document.getElementById('case-current-selected-atlas');

  if (targetStructEl) targetStructEl.textContent = `${c.targetStructureNameTh}`;
  if (targetMniEl) targetMniEl.textContent = `(${c.mniCoords[0]}, ${c.mniCoords[1]}, ${c.mniCoords[2]})`;
  if (targetVascularEl) targetVascularEl.textContent = c.vascularTerritory;

  const currentStruct = BRAIN_STRUCTURES.find(s => s.id === state.selectedId);
  if (currentAtlasEl) {
    currentAtlasEl.textContent = currentStruct ? `${currentStruct.nameTh} (${currentStruct.nameEn})` : 'ยังไม่ได้คลิกเลือก';
  }

  // Tab 3: Verdict
  const diagOptsEl = document.getElementById('case-diag-options');
  const mechOptsEl = document.getElementById('case-mech-options');
  const structSelectEl = document.getElementById('case-suspected-structure-select');

  if (diagOptsEl) {
    diagOptsEl.innerHTML = c.differentialOptions.map((opt, i) => `
      <label class="radio-option-item">
        <input type="radio" name="case-diag" value="${opt.id}" ${i === 0 ? 'checked' : ''}>
        <span>${opt.textTh}</span>
      </label>
    `).join('');
  }

  if (mechOptsEl) {
    mechOptsEl.innerHTML = c.mechanismOptions.map((opt, i) => `
      <label class="radio-option-item">
        <input type="radio" name="case-mech" value="${opt.id}" ${i === 0 ? 'checked' : ''}>
        <span>${opt.textTh}</span>
      </label>
    `).join('');
  }

  if (structSelectEl && state.selectedId) {
    structSelectEl.value = state.selectedId;
  }

  // Submission / CER Report State
  const formCard = document.getElementById('case-form-card');
  const cerCard = document.getElementById('case-cer-card');

  if (data.submissionResult) {
    const res = data.submissionResult;
    if (cerCard) cerCard.style.display = 'flex';

    const cerScoreTitle = document.getElementById('cer-score-title');
    const cerScoreSub = document.getElementById('cer-score-sub');
    const cerClaim = document.getElementById('cer-text-claim');
    const cerEvidence = document.getElementById('cer-text-evidence');
    const cerReasoning = document.getElementById('cer-text-reasoning');

    if (res.isFullCorrect) {
      if (cerScoreTitle) cerScoreTitle.textContent = '🎉 ยอดเยี่ยมมาก! วินิจฉัยถูกต้องสมบูรณ์ (100% Diagnostic Accuracy)';
      if (cerScoreSub) cerScoreSub.textContent = `+${res.pointsEarned} Diagnostic XP (รวมสะสม: ${data.diagnosticXP} XP)`;
    } else {
      if (cerScoreTitle) cerScoreTitle.textContent = '🔍 การวินิจฉัยยังไม่สมบูรณ์ ตรวจสอบหลักฐานเพิ่มเติม';
      if (cerScoreSub) cerScoreSub.textContent = 'ลองตรวจสอบอาการแขนขาอ่อนแรง หรือพิกัดภาพสแกน MRI อีกครั้ง';
    }

    if (cerClaim) cerClaim.textContent = c.cer.claimTh;
    if (cerEvidence) cerEvidence.textContent = c.cer.evidenceTh;
    if (cerReasoning) cerReasoning.textContent = c.cer.reasoningTh;
  } else {
    if (cerCard) cerCard.style.display = 'none';
    const caseSocraticCard = document.getElementById('case-socratic-card');
    if (caseSocraticCard) caseSocraticCard.style.display = 'none';
  }
}

// ============================================================================
// Interactive EEG Brainwave Studio Controller & Oscilloscope
// ============================================================================
function initEEGLab() {
  eegLab = new EEGLaboratory({
    canvasId: 'eeg-oscilloscope-canvas',
    onStateChange: (st) => updateEEGUI(st),
    onDipoleUpdate: (dipole) => {
      // Dipole pulse data used in animate() loop
    }
  });

  eegLab.init();
  updateEEGUI(eegLab.getCurrentState());
}

function updateEEGUI(st) {
  if (!st || !eegLab) return;

  // Update active preset button
  for (let i = 0; i < EEG_STATES.length; i++) {
    const pill = document.getElementById(`eeg-preset-${i}`);
    if (pill) {
      pill.classList.toggle('active', i === eegLab.currentStateIndex);
    }
  }

  const band = EEG_BANDS[st.band];
  const bandBadge = document.getElementById('eeg-band-badge');
  const freqRange = document.getElementById('eeg-freq-range');
  const socraticText = document.getElementById('eeg-socratic-text');
  const originText = document.getElementById('eeg-origin-text');

  if (bandBadge && band) {
    bandBadge.textContent = `${band.nameTh} · ${band.dominantFreq} Hz`;
    bandBadge.style.color = band.color;
    bandBadge.style.borderColor = band.color;
    bandBadge.style.backgroundColor = `${band.color}25`;
  }

  if (freqRange && band) {
    freqRange.textContent = `ช่วงความถี่: ${band.rangeHz} (${band.amplitudeUv} µV)`;
  }

  if (socraticText) {
    socraticText.textContent = st.socraticTh;
  }

  if (originText && band) {
    originText.textContent = `${band.originTh} · สภาวะ: ${band.stateTh}`;
  }
}

function updateInspectorUI(struct) {
  if (!struct) return;
  const card = document.getElementById('inspector-card');
  const tagEl = document.getElementById('inspector-tag');
  const titleThEl = document.getElementById('inspector-title-th');
  const titleEnEl = document.getElementById('inspector-title-en');
  const descEl = document.getElementById('inspector-desc');
  const bulletsEl = document.getElementById('inspector-bullets');
  const clinicalEl = document.getElementById('inspector-clinical');

  const isEn = i18nManager && i18nManager.currentLang === 'en';
  if (tagEl) tagEl.textContent = isEn ? (struct.systemNameEn || struct.systemNameTh) : struct.systemNameTh;
  if (titleThEl) titleThEl.textContent = isEn ? struct.nameEn : struct.nameTh;
  if (titleEnEl) titleEnEl.textContent = isEn ? struct.nameTh : struct.nameEn;
  if (descEl) descEl.textContent = isEn ? (struct.descriptionEn || struct.descriptionTh) : struct.descriptionTh;

  if (bulletsEl) {
    bulletsEl.innerHTML = '';
    const funcs = isEn ? (struct.functionsEn || struct.functionsTh || []) : (struct.functionsTh || []);
    funcs.forEach(fn => {
      const li = document.createElement('li');
      li.textContent = fn;
      bulletsEl.appendChild(li);
    });
  }

  if (clinicalEl) {
    const clinTitle = isEn ? '🩺 Clinical Significance & Pathologies' : '🩺 ความสำคัญทางการแพทย์ / โรคที่เกี่ยวข้อง';
    const clinDesc = isEn ? (struct.clinicalEn || struct.clinicalTh || 'No specific clinical pathology') : (struct.clinicalTh || 'ไม่มีข้อมูลคลินิกเฉพาะ');
    clinicalEl.innerHTML = `
      <div class="clinical-tag">${clinTitle}</div>
      <div>${clinDesc}</div>
    `;
  }

  if (card) card.classList.remove('collapsed');
}

// ============================================================================
// Bilingual Internationalization (i18n) Controller
// ============================================================================
function initI18n() {
  i18nManager = new I18nManager({
    onLanguageChange: (lang) => {
      const langText = document.getElementById('lang-text');
      if (langText) langText.textContent = lang === 'th' ? 'EN' : 'TH';

      // Refresh inspector card if structure is selected
      if (state.selectedId) {
        const struct = BRAIN_STRUCTURES.find(s => s.id === state.selectedId);
        if (struct) updateInspectorUI(struct);
      }

      // Refresh probe display
      if (stereotaxicProbe && stereotaxicProbe.isActive) {
        updateProbeUI({
          coords: stereotaxicProbe.coords,
          nearestLandmark: stereotaxicProbe.nearestLandmark,
          distance: stereotaxicProbe.nearestDistance
        });
      }
    }
  });

  i18nManager.applyTranslations();
  const langText = document.getElementById('lang-text');
  if (langText) langText.textContent = i18nManager.currentLang === 'th' ? 'EN' : 'TH';
}

// ============================================================================
// Stereotaxic MNI Coordinate Probe Controller
// ============================================================================
function initStereotaxicProbe() {
  stereotaxicProbe = new StereotaxicProbe({
    scene: scene,
    onCoordinateChange: (data) => {
      updateProbeUI(data);
    },
    onTargetLock: (struct) => {
      if (struct) {
        selectStructure(struct.id, true);
      }
    }
  });
}

function updateProbeUI(data) {
  const { coords, nearestLandmark, distance } = data;
  const elX = document.getElementById('probe-coord-x');
  const elY = document.getElementById('probe-coord-y');
  const elZ = document.getElementById('probe-coord-z');
  const elDist = document.getElementById('probe-nearest-dist');
  const elName = document.getElementById('probe-nearest-name');

  if (elX) elX.textContent = `${coords.x > 0 ? '+' : ''}${coords.x} mm`;
  if (elY) elY.textContent = `${coords.y > 0 ? '+' : ''}${coords.y} mm`;
  if (elZ) elZ.textContent = `${coords.z > 0 ? '+' : ''}${coords.z} mm`;

  if (elDist) {
    elDist.textContent = isFinite(distance) ? `${distance.toFixed(1)} mm` : '--';
    if (distance <= 12) {
      elDist.style.backgroundColor = 'rgba(16, 185, 129, 0.25)';
      elDist.style.color = '#34d399';
    } else {
      elDist.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
      elDist.style.color = '#38bdf8';
    }
  }

  if (elName) {
    if (nearestLandmark) {
      const isEn = i18nManager && i18nManager.currentLang === 'en';
      const name = isEn ? nearestLandmark.nameEn : (nearestLandmark.nameTh || nearestLandmark.nameEn);
      elName.textContent = name;
    } else {
      elName.textContent = '--';
    }
  }
}

// ============================================================================
// 3D White Matter Tractography Controller
// ============================================================================
function initWhiteMatterTracts() {
  whiteMatterTracts = new WhiteMatterTracts({ scene: brainGroup || scene });
}

// ============================================================================
// Synaptic Biophysics Laboratory & Neurotransmission Studio
// ============================================================================
function initSynapseLab() {
  synapseLab.onVmChange = (vm) => {
    const indicator = document.getElementById('vm-state-indicator');
    if (indicator) {
      if (vm >= -55) {
        indicator.textContent = `Action Potential: ${vm.toFixed(1)} mV`;
        indicator.style.color = '#fde047';
        indicator.style.borderColor = '#facc15';
      } else if (vm < -72) {
        indicator.textContent = `Hyperpolarization: ${vm.toFixed(1)} mV`;
        indicator.style.color = '#c084fc';
        indicator.style.borderColor = '#a855f7';
      } else {
        indicator.textContent = `Resting: ${vm.toFixed(1)} mV`;
        indicator.style.color = '#7dd3fc';
        indicator.style.borderColor = 'rgba(56, 189, 248, 0.3)';
      }
    }
  };

  synapseLab.onEventLogged = (evt) => {
    const feed = document.getElementById('synapse-event-feed');
    if (!feed) return;
    const isEn = i18nManager && i18nManager.currentLang === 'en';
    const text = isEn ? evt.textEn : evt.textTh;
    const item = document.createElement('div');
    item.className = `feed-item ${evt.type}`;
    item.textContent = text;
    feed.prepend(item);
    if (feed.children.length > 12) {
      feed.removeChild(feed.lastChild);
    }
  };
}

// ============================================================================
// Progressive Web App (PWA) Offline Classroom & Service Worker
// ============================================================================
let deferredPwaPrompt = null;

function initPWA() {
  // 1. Register Service Worker for offline classroom support
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('[PWA] Service Worker registered in scope:', reg.scope))
        .catch(err => console.warn('[PWA] Service Worker registration failed:', err));
    });
  }

  // 2. Capture install prompt for in-app install button
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
    const btnInstall = document.getElementById('btn-pwa-install');
    if (btnInstall) {
      btnInstall.style.display = 'inline-flex';
    }
  });

  const btnInstall = document.getElementById('btn-pwa-install');
  if (btnInstall) {
    btnInstall.addEventListener('click', async () => {
      if (!deferredPwaPrompt) return;
      btnInstall.style.display = 'none';
      deferredPwaPrompt.prompt();
      const { outcome } = await deferredPwaPrompt.userChoice;
      console.log('[PWA] User response to install prompt:', outcome);
      deferredPwaPrompt = null;
    });
  }
}


// ============================================================================
// Guided Educational Tours / Presets
// ============================================================================


function applyPreset(presetId) {
  const preset = EDUCATIONAL_PRESETS.find(p => p.id === presetId);
  if (!preset) return;

  if (preset.cameraPos) {
    camera.position.set(preset.cameraPos[0], preset.cameraPos[1], preset.cameraPos[2]);
  }
  if (preset.targetPos) {
    controls.target.set(preset.targetPos[0], preset.targetPos[1], preset.targetPos[2]);
  }

  // Cortex opacity
  const opacitySlider = document.getElementById('cortex-opacity-slider');
  if (opacitySlider) {
    opacitySlider.value = preset.cortexOpacity;
    updateCortexOpacity(preset.cortexOpacity);
  }

  // Cutting plane
  setCuttingPlaneMode(preset.cuttingPlane);
  if (preset.cuttingPlane !== 'none') {
    updateCuttingPlanePosition(preset.slicePos);
  }

  // Select key structure
  if (preset.infoId) {
    selectStructure(preset.infoId, false);
  }
}

// ============================================================================
// Event Listeners & UI Binding
// ============================================================================
function setupEventListeners() {
  // 1. Cortex Peeling Slider
  const opacitySlider = document.getElementById('cortex-opacity-slider');
  if (opacitySlider) {
    opacitySlider.addEventListener('input', (e) => updateCortexOpacity(e.target.value));
  }

  // 2. Color Mode Toggle Button
  const btnColorMode = document.getElementById('btn-toggle-color-mode');
  if (btnColorMode) {
    btnColorMode.addEventListener('click', () => {
      const nextMode = state.colorMode === 'realistic' ? 'functional' : 'realistic';
      setColorMode(nextMode);
    });
  }

  // 3. 3D Slicing Segmented Buttons
  document.querySelectorAll('#cutting-plane-group .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => setCuttingPlaneMode(btn.dataset.plane));
  });

  // Slice Position Slider
  const planeSlider = document.getElementById('plane-slice-slider');
  if (planeSlider) {
    planeSlider.addEventListener('input', (e) => updateCuttingPlanePosition(e.target.value));
  }

  // Flip Plane Normal
  const flipBtn = document.getElementById('btn-flip-plane');
  if (flipBtn) {
    flipBtn.addEventListener('click', () => {
      state.planeFlipped = !state.planeFlipped;
      updateCuttingPlaneOrientation();
      updateCuttingPlanePosition(state.sliceRange[state.cuttingPlaneMode].current);
    });
  }

  // 4. Toggle Floating MRI Window (PiP)
  const btnToggleMpr = document.getElementById('btn-toggle-mpr');
  const floatingMprWindow = document.getElementById('floating-mpr-window');
  const btnCloseMpr = document.getElementById('btn-close-mpr');

  if (btnToggleMpr && floatingMprWindow) {
    btnToggleMpr.addEventListener('click', () => {
      state.isMprVisible = !state.isMprVisible;
      floatingMprWindow.style.display = state.isMprVisible ? 'flex' : 'none';
      btnToggleMpr.classList.toggle('active', state.isMprVisible);
    });
  }

  if (btnCloseMpr && floatingMprWindow) {
    btnCloseMpr.addEventListener('click', () => {
      state.isMprVisible = false;
      floatingMprWindow.style.display = 'none';
      if (btnToggleMpr) btnToggleMpr.classList.remove('active');
    });
  }

  // 5. Anatomical Layers Popover Dropdown
  const btnToggleLayers = document.getElementById('btn-toggle-layers');
  const layersDropdown = document.getElementById('layers-dropdown');

  if (btnToggleLayers && layersDropdown) {
    btnToggleLayers.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = layersDropdown.style.display === 'block';
      layersDropdown.style.display = isOpen ? 'none' : 'block';
      // Close tours dropdown if open
      const toursDropdown = document.getElementById('tours-dropdown');
      if (toursDropdown) toursDropdown.style.display = 'none';
    });

    layersDropdown.querySelectorAll('input[data-system]').forEach(sw => {
      sw.addEventListener('change', (e) => {
        const sys = e.target.dataset.system;
        const visible = e.target.checked;
        state.systems[sys] = visible;

        if (sys === 'cerebrum') {
          updateCortexOpacity(state.cortexOpacity);
        } else if (sys === 'cerebellum') {
          const m = gltfMeshMap.get('cerebellum');
          if (m) m.visible = visible;
        } else if (sys === 'brainstem') {
          const m = gltfMeshMap.get('brain-stem');
          if (m) m.visible = visible;
        } else if (sys === 'limbic') {
          ['hippocampus', 'amygdala', 'corpus-callosum'].forEach(k => {
            const m = gltfMeshMap.get(k);
            if (m) m.visible = visible;
          });
          const thal = structureMeshMap.get('thalamus');
          if (thal) thal.visible = visible;
        } else if (sys === 'vasculature') {
          ['circle_of_willis', 'basilar_vertebral_artery', 'middle_cerebral_artery', 'anterior_cerebral_artery', 'venous_sinuses'].forEach(k => {
            const m = structureMeshMap.get(k);
            if (m) m.visible = visible;
          });
        } else if (sys === 'ventricles') {
          ['lateral_ventricles', 'third_fourth_ventricles'].forEach(k => {
            const m = structureMeshMap.get(k);
            if (m) m.visible = visible;
          });
        }
      });
    });
  }

  // 6. Educational Tours Dropdown
  const btnToggleTours = document.getElementById('btn-toggle-tours');
  const toursDropdown = document.getElementById('tours-dropdown');

  if (btnToggleTours && toursDropdown) {
    btnToggleTours.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = toursDropdown.style.display === 'block';
      toursDropdown.style.display = isOpen ? 'none' : 'block';
      if (layersDropdown) layersDropdown.style.display = 'none';
    });

    toursDropdown.querySelectorAll('.tour-item').forEach(btn => {
      btn.addEventListener('click', () => {
        applyPreset(btn.dataset.preset);
        toursDropdown.style.display = 'none';
      });
    });
  }

  // Close dropdowns on outside click
  window.addEventListener('click', () => {
    if (layersDropdown) layersDropdown.style.display = 'none';
    if (toursDropdown) toursDropdown.style.display = 'none';
  });

  // 7. Camera Quick Dock Views
  document.querySelectorAll('.dock-btn[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      document.querySelectorAll('.dock-btn[data-view]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (view === 'anterior') camera.position.set(0, 5, 200);
      else if (view === 'posterior') camera.position.set(0, 5, -200);
      else if (view === 'superior') camera.position.set(0, 200, 5);
      else if (view === 'lateral_left') camera.position.set(-200, 5, 0);
      else if (view === 'lateral_right') camera.position.set(200, 5, 0);
      else if (view === 'inferior') camera.position.set(0, -200, 5);
      else if (view === 'reset') {
        camera.position.set(0, 15, 210);
        controls.target.set(0, 0, 0);
      }
    });
  });

  // 8. Search Autocomplete
  const searchInput = document.getElementById('structure-search');
  const searchDropdown = document.getElementById('search-dropdown');
  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchDropdown.style.display = 'none';
        return;
      }
      const matches = BRAIN_STRUCTURES.filter(s =>
        s.nameEn.toLowerCase().includes(q) ||
        s.nameTh.toLowerCase().includes(q) ||
        s.systemNameTh.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        searchDropdown.innerHTML = '<div style="padding: 10px; font-size: 0.75rem; color: #64748b;">ไม่พบโครงสร้างที่ค้นหา</div>';
        searchDropdown.style.display = 'block';
        return;
      }

      searchDropdown.innerHTML = matches.map(m => `
        <div class="search-result-item" data-id="${m.id}">
          <div>
            <div class="search-result-name">${m.nameTh}</div>
            <div class="search-result-sub">${m.nameEn} · ${m.systemNameTh}</div>
          </div>
          <span style="font-size: 0.75rem; color: #38bdf8;">→</span>
        </div>
      `).join('');
      searchDropdown.style.display = 'block';

      searchDropdown.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          selectStructure(item.dataset.id);
          searchDropdown.style.display = 'none';
          searchInput.value = '';
        });
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape') {
        searchDropdown.style.display = 'none';
      }
    });
  }

  // 9. Inspector Action Buttons
  const btnFocus = document.getElementById('btn-inspector-focus');
  if (btnFocus) {
    btnFocus.addEventListener('click', () => {
      if (state.selectedId) selectStructure(state.selectedId, true);
    });
  }

  const btnIsolate = document.getElementById('btn-inspector-isolate');
  if (btnIsolate) {
    btnIsolate.addEventListener('click', () => {
      if (state.selectedId) isolateStructure(state.selectedId);
    });
  }

  const btnCloseInspector = document.getElementById('btn-inspector-close');
  if (btnCloseInspector) {
    btnCloseInspector.addEventListener('click', () => {
      document.getElementById('inspector-card').classList.add('collapsed');
    });
  }

  // 9b. Virtual Lesion / Stroke Simulation Buttons
  const btnInspectorLesion = document.getElementById('btn-inspector-lesion');
  const btnLesionRestore = document.getElementById('btn-lesion-restore');

  if (btnInspectorLesion) {
    btnInspectorLesion.addEventListener('click', () => {
      if (state.selectedId && lesionSimulator) {
        lesionSimulator.toggleLesion(state.selectedId);
      }
    });
  }

  if (btnLesionRestore) {
    btnLesionRestore.addEventListener('click', () => {
      if (lesionSimulator) {
        lesionSimulator.deactivateLesion();
      }
    });
  }

  // 10. Contrast Slider
  const contrastSlider = document.getElementById('mpr-contrast-slider');
  if (contrastSlider) {
    contrastSlider.addEventListener('input', (e) => {
      state.contrast = parseFloat(e.target.value);
      renderMPRSlices();
    });
  }

  // 11. 3D Canvas Click & Hover Picking
  const canvas = document.getElementById('webgl-canvas');
  canvas.addEventListener('mousemove', onCanvasMouseMove);
  canvas.addEventListener('click', onCanvasClick);

  // 12. Audio Mute Toggle Button
  const btnToggleSound = document.getElementById('btn-toggle-sound');
  const soundIcon = document.getElementById('sound-icon');
  const soundText = document.getElementById('sound-text');

  function updateSoundUI() {
    if (!btnToggleSound) return;
    if (sound.isMuted) {
      btnToggleSound.classList.add('muted');
      if (soundIcon) soundIcon.textContent = '🔇';
      if (soundText) soundText.textContent = 'ปิดเสียง';
    } else {
      btnToggleSound.classList.remove('muted');
      if (soundIcon) soundIcon.textContent = '🔊';
      if (soundText) soundText.textContent = 'เสียง';
    }
  }
  updateSoundUI();

  if (btnToggleSound) {
    btnToggleSound.addEventListener('click', () => {
      sound.toggleMute();
      updateSoundUI();
      if (!sound.isMuted) sound.playSelectChime();
    });
  }

  // 13. Neuro-Pinpoint Quest Controls
  const btnToggleQuest = document.getElementById('btn-toggle-quest');
  const btnCloseQuest = document.getElementById('btn-quest-close');
  const btnQuestPrev = document.getElementById('btn-quest-prev');
  const btnQuestNext = document.getElementById('btn-quest-next');
  const btnQuestHint = document.getElementById('btn-quest-hint');
  const btnQuestAssist = document.getElementById('btn-quest-assist');
  const btnToastNext = document.getElementById('btn-toast-next');

  if (btnToggleQuest) {
    btnToggleQuest.addEventListener('click', () => {
      questManager.toggleQuest();
    });
  }

  if (btnCloseQuest) {
    btnCloseQuest.addEventListener('click', () => {
      questManager.stopQuest();
    });
  }

  if (btnQuestPrev) {
    btnQuestPrev.addEventListener('click', () => {
      questManager.prevQuestion();
    });
  }

  if (btnQuestNext) {
    btnQuestNext.addEventListener('click', () => {
      questManager.nextQuestion();
    });
  }

  if (btnQuestHint) {
    btnQuestHint.addEventListener('click', () => {
      const hintBox = document.getElementById('quest-hint-box');
      if (hintBox) {
        const isShown = hintBox.style.display === 'flex';
        hintBox.style.display = isShown ? 'none' : 'flex';
        sound.playHoverTick();
      }
    });
  }

  if (btnQuestAssist) {
    btnQuestAssist.addEventListener('click', () => {
      questManager.autoAssistScaffold();
    });
  }

  if (btnToastNext) {
    btnToastNext.addEventListener('click', () => {
      const toast = document.getElementById('quest-celebrate-toast');
      if (toast) toast.style.display = 'none';
      questManager.nextQuestion();
    });
  }

  // 14. Clinical Detective Case Studies Controls
  const btnToggleCases = document.getElementById('btn-toggle-cases');
  const btnCaseClose = document.getElementById('btn-case-close');
  const btnCasePrev = document.getElementById('btn-case-prev');
  const btnCaseNext = document.getElementById('btn-case-next');
  const btnCaseAlign3D = document.getElementById('btn-case-align-3d');
  const btnCaseAlignMpr = document.getElementById('btn-case-align-mpr');
  const btnCaseSimulateLesion = document.getElementById('btn-case-simulate-lesion');
  const btnSubmitDiagnosis = document.getElementById('btn-submit-diagnosis');
  const btnExportCaseCer = document.getElementById('btn-export-case-cer');

  if (btnToggleCases) {
    btnToggleCases.addEventListener('click', () => {
      if (caseStudyManager) caseStudyManager.toggleModal();
    });
  }

  if (btnCaseClose) {
    btnCaseClose.addEventListener('click', () => {
      if (caseStudyManager) caseStudyManager.closeModal();
    });
  }

  // Case Selector Buttons (Pills 0 to 5)
  document.querySelectorAll('.case-pill-btn[data-case]').forEach(btn => {
    btn.addEventListener('click', () => {
      const caseIdx = parseInt(btn.dataset.case, 10);
      if (caseStudyManager) caseStudyManager.selectCase(caseIdx);
    });
  });

  // Case Tabs Navigation (Intake, Imaging, Verdict)
  const caseTabBtns = document.querySelectorAll('.case-tab-nav-btn[data-tab]');
  caseTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      caseTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.case-tab-content').forEach(pane => {
        pane.style.display = 'none';
        pane.classList.remove('active');
      });

      const activePane = document.getElementById(`case-tab-pane-${tabName}`);
      if (activePane) {
        activePane.style.display = 'block';
        activePane.classList.add('active');
      }

      sound.playHoverTick();
    });
  });

  if (btnCaseAlign3D) {
    btnCaseAlign3D.addEventListener('click', () => {
      if (caseStudyManager) caseStudyManager.align3DFocus();
    });
  }

  if (btnCaseAlignMpr) {
    btnCaseAlignMpr.addEventListener('click', () => {
      if (caseStudyManager) caseStudyManager.alignMprSlices();
    });
  }

  if (btnCaseSimulateLesion) {
    btnCaseSimulateLesion.addEventListener('click', () => {
      if (caseStudyManager) caseStudyManager.triggerSimulateLesion();
    });
  }

  if (btnSubmitDiagnosis) {
    btnSubmitDiagnosis.addEventListener('click', () => {
      const diagChecked = document.querySelector('input[name="case-diag"]:checked');
      const mechChecked = document.querySelector('input[name="case-mech"]:checked');
      const structSelect = document.getElementById('case-suspected-structure-select');

      const diagId = diagChecked ? diagChecked.value : null;
      const mechId = mechChecked ? mechChecked.value : null;
      const structId = structSelect ? structSelect.value : null;

      if (!diagId || !mechId || !structId) {
        alert('กรุณาเลือกคำวินิจฉัย กลไกการเกิดโรค และโครงสร้างสมองให้ครบถ้วนก่อนยืนยัน');
        return;
      }

      if (caseStudyManager) {
        const result = caseStudyManager.submitDiagnosis(diagId, mechId, structId);
        const caseSocraticCard = document.getElementById('case-socratic-card');
        if (result && !result.isFullCorrect && caseSocraticCard) {
          const isEn = i18nManager && i18nManager.currentLang === 'en';
          const diagnosed = socraticTutor.diagnoseCaseSubmission(result.caseItem.id, diagId, mechId, structId);
          if (diagnosed) {
            const misEl = document.getElementById('socratic-misconception');
            const misText = document.getElementById('socratic-misconception-text');
            const qEl = document.getElementById('socratic-question-text');
            const aEl = document.getElementById('socratic-analogy');
            const aText = document.getElementById('socratic-analogy-text');
            const tweakBtn = document.getElementById('btn-socratic-tweak');
            const tweakText = document.getElementById('socratic-tweak-text');

            if (misEl && misText) {
              misText.textContent = isEn ? (diagnosed.misconceptionEn || diagnosed.misconceptionTh) : (diagnosed.misconceptionTh || diagnosed.misconceptionEn);
              misEl.style.display = 'block';
            }

            if (qEl) {
              qEl.textContent = isEn ? (diagnosed.socraticQuestionEn || diagnosed.socraticQuestionTh || diagnosed.feedbackEn) : (diagnosed.socraticQuestionTh || diagnosed.feedbackTh);
            }

            if (aEl && aText) {
              const analogy = isEn ? diagnosed.counterExampleEn : diagnosed.counterExampleTh;
              if (analogy) {
                aText.textContent = analogy;
                aEl.style.display = 'block';
              } else {
                aEl.style.display = 'none';
              }
            }

            if (tweakBtn && tweakText) {
              if (diagnosed.recommendedTweak) {
                tweakText.textContent = diagnosed.recommendedTweak.text;
                tweakBtn.style.display = 'flex';
                tweakBtn.onclick = () => {
                  if (diagnosed.recommendedTweak.action === 'focus_broca') {
                    selectStructure('frontal_lobe_left', true);
                  } else if (diagnosed.recommendedTweak.action === 'focus_cerebellum') {
                    selectStructure('cerebellum', true);
                  } else if (diagnosed.recommendedTweak.action === 'focus_hippocampus') {
                    selectStructure('hippocampus', true);
                  } else if (diagnosed.recommendedTweak.action === 'focus_pons') {
                    selectStructure('brainstem_pons', true);
                  } else {
                    caseStudyManager.align3DFocus();
                  }
                  sound.playSelectChime();
                };
              } else {
                tweakBtn.style.display = 'none';
              }
            }

            caseSocraticCard.style.display = 'flex';
          }
        } else if (result && result.isFullCorrect && caseSocraticCard) {
          caseSocraticCard.style.display = 'none';
        }
      }
    });
  }

  // Socratic Preceptor Consultation Buttons
  const btnConsultSocratic = document.getElementById('btn-consult-socratic');
  const btnCloseSocratic = document.getElementById('btn-close-socratic');
  const btnSocraticTweak = document.getElementById('btn-socratic-tweak');
  const caseSocraticCard = document.getElementById('case-socratic-card');

  if (btnConsultSocratic) {
    btnConsultSocratic.addEventListener('click', () => {
      if (!caseStudyManager) return;
      const curCase = caseStudyManager.getCurrentCase();
      const hint = socraticTutor.getGeneralSocraticHint(curCase, i18nManager?.currentLang);
      if (hint && caseSocraticCard) {
        const misEl = document.getElementById('socratic-misconception');
        const qEl = document.getElementById('socratic-question-text');
        const aEl = document.getElementById('socratic-analogy');
        const tweakBtn = document.getElementById('btn-socratic-tweak');

        if (misEl) misEl.style.display = 'none';
        if (aEl) aEl.style.display = 'none';
        if (tweakBtn) tweakBtn.style.display = 'none';
        if (qEl) qEl.textContent = hint.question;

        caseSocraticCard.style.display = 'flex';
      }
    });
  }

  if (btnCloseSocratic) {
    btnCloseSocratic.addEventListener('click', () => {
      if (caseSocraticCard) caseSocraticCard.style.display = 'none';
      sound.playHoverTick();
    });
  }

  if (btnExportCaseCer) {
    btnExportCaseCer.addEventListener('click', async () => {
      if (caseStudyManager) {
        const ok = await caseStudyManager.copyCERToClipboard();
        if (ok) {
          const toast = document.getElementById('case-export-toast');
          if (toast) {
            toast.style.display = 'flex';
            setTimeout(() => {
              toast.style.display = 'none';
            }, 3200);
          }
        }
      }
    });
  }

  if (btnCasePrev) {
    btnCasePrev.addEventListener('click', () => {
      if (caseStudyManager) caseStudyManager.prevCase();
    });
  }

  if (btnCaseNext) {
    btnCaseNext.addEventListener('click', () => {
      if (caseStudyManager) caseStudyManager.nextCase();
    });
  }

  // 15. Interactive EEG Brainwave Studio Controls
  const btnToggleEEG = document.getElementById('btn-toggle-eeg');
  const modalEEG = document.getElementById('eeg-modal');
  const btnCloseEEG = document.getElementById('btn-eeg-close');
  const btnSoundEEG = document.getElementById('btn-eeg-sound');
  const soundIconEEG = document.getElementById('eeg-sound-icon');
  const soundTextEEG = document.getElementById('eeg-sound-text');
  const sliderGainEEG = document.getElementById('eeg-gain-slider');
  const badgeGainEEG = document.getElementById('eeg-gain-badge');

  function updateEEGSoundUI(isOn) {
    if (!btnSoundEEG) return;
    btnSoundEEG.classList.toggle('active', isOn);
    if (soundIconEEG) soundIconEEG.textContent = isOn ? '🔊' : '🔈';
    if (soundTextEEG) soundTextEEG.textContent = isOn ? 'เสียงเปิดอยู่' : 'เสียงคลื่นสมอง';
  }

  if (btnToggleEEG) {
    btnToggleEEG.addEventListener('click', () => {
      if (eegLab) {
        const isActive = eegLab.toggleLab();
        if (modalEEG) modalEEG.style.display = isActive ? 'flex' : 'none';
        btnToggleEEG.classList.toggle('active', isActive);
        updateEEGSoundUI(eegLab.isSonificationOn);
      }
    });
  }

  if (btnCloseEEG) {
    btnCloseEEG.addEventListener('click', () => {
      if (eegLab) {
        eegLab.toggleLab();
        if (modalEEG) modalEEG.style.display = 'none';
        if (btnToggleEEG) btnToggleEEG.classList.remove('active');
        updateEEGSoundUI(false);
      }
    });
  }

  if (btnSoundEEG) {
    btnSoundEEG.addEventListener('click', () => {
      if (eegLab) {
        const isOn = eegLab.toggleSonification();
        updateEEGSoundUI(isOn);
      }
    });
  }

  // EEG State Presets (Pills 0 to 4)
  document.querySelectorAll('.eeg-preset-pill[data-eeg-state]').forEach(btn => {
    btn.addEventListener('click', () => {
      const stateIdx = parseInt(btn.dataset.eegState, 10);
      if (eegLab) {
        eegLab.setState(stateIdx);
        if (eegLab.isSonificationOn) {
          eegLab.toggleSonification(true);
        }
      }
    });
  });

  if (sliderGainEEG) {
    sliderGainEEG.addEventListener('input', (e) => {
      const g = parseFloat(e.target.value);
      if (eegLab) eegLab.setGain(g);
      if (badgeGainEEG) badgeGainEEG.textContent = `${g.toFixed(1)}x`;
    });
  }

  // 16. Language Toggle (Bilingual TH/EN)
  const btnToggleLang = document.getElementById('btn-toggle-lang');
  if (btnToggleLang) {
    btnToggleLang.addEventListener('click', () => {
      if (i18nManager) {
        i18nManager.toggleLanguage();
        sound.playSelectChime();
      }
    });
  }

  // 17. Stereotaxic MNI Probe Controls
  const btnToggleProbe = document.getElementById('btn-toggle-probe');
  const btnCloseProbe = document.getElementById('btn-close-probe');
  const probeDockCard = document.getElementById('probe-dock-card');
  const btnProbeLock = document.getElementById('btn-probe-lock');

  if (btnToggleProbe) {
    btnToggleProbe.addEventListener('click', () => {
      if (stereotaxicProbe) {
        const active = stereotaxicProbe.toggleProbe();
        if (probeDockCard) probeDockCard.style.display = active ? 'flex' : 'none';
        btnToggleProbe.classList.toggle('active', active);
        if (active) {
          updateProbeUI({
            coords: stereotaxicProbe.coords,
            nearestLandmark: stereotaxicProbe.nearestLandmark,
            distance: stereotaxicProbe.nearestDistance
          });
        }
      }
    });
  }

  if (btnCloseProbe) {
    btnCloseProbe.addEventListener('click', () => {
      if (stereotaxicProbe && stereotaxicProbe.isActive) {
        stereotaxicProbe.toggleProbe();
      }
      if (probeDockCard) probeDockCard.style.display = 'none';
      if (btnToggleProbe) btnToggleProbe.classList.remove('active');
    });
  }

  // Stepper buttons for probe
  document.querySelectorAll('.probe-step-btn[data-probe-axis]').forEach(btn => {
    btn.addEventListener('click', () => {
      const axis = btn.dataset.probeAxis;
      const step = parseInt(btn.dataset.probeStep, 10);
      if (stereotaxicProbe && axis && !isNaN(step)) {
        stereotaxicProbe.stepCoordinate(axis, step);
      }
    });
  });

  if (btnProbeLock) {
    btnProbeLock.addEventListener('click', () => {
      if (stereotaxicProbe && stereotaxicProbe.nearestLandmark) {
        stereotaxicProbe.jumpToStructure(stereotaxicProbe.nearestLandmark.id);
      }
    });
  }

  // 18. Quest Socratic Clue Controls
  const btnQuestSocratic = document.getElementById('btn-quest-socratic');
  const btnCloseQuestSocratic = document.getElementById('btn-close-quest-socratic');
  const questSocraticBox = document.getElementById('quest-socratic-box');

  if (btnQuestSocratic) {
    btnQuestSocratic.addEventListener('click', () => {
      if (!questManager || !questManager.isActive) return;
      const q = questManager.getCurrentQuestion();
      if (q && questSocraticBox) {
        const target = BRAIN_STRUCTURES.find(s => s.id === q.targetId);
        const sel = state.selectedId ? BRAIN_STRUCTURES.find(s => s.id === state.selectedId) : null;
        const diag = socraticTutor.diagnoseQuestSelection(target, sel || target, i18nManager?.currentLang);
        if (diag) {
          const tText = document.getElementById('quest-socratic-text');
          if (tText) tText.textContent = diag.feedback;
          questSocraticBox.style.display = 'flex';
        }
      }
    });
  }

  if (btnCloseQuestSocratic) {
    btnCloseQuestSocratic.addEventListener('click', () => {
      if (questSocraticBox) questSocraticBox.style.display = 'none';
      sound.playHoverTick();
    });
  }

  // 19. 3D White Matter Tractography Toggle
  const btnToggleTracts = document.getElementById('btn-toggle-tracts');
  if (btnToggleTracts) {
    btnToggleTracts.addEventListener('click', () => {
      if (whiteMatterTracts) {
        const active = whiteMatterTracts.toggleTracts();
        btnToggleTracts.classList.toggle('active', active);
      }
    });
  }

  // 20. Synapse & Neurotransmission Lab Modal & Controls
  const btnToggleSynapse = document.getElementById('btn-toggle-synapse');
  const btnSynapseClose = document.getElementById('btn-synapse-close');
  const synapseModal = document.getElementById('synapse-modal');

  if (btnToggleSynapse) {
    btnToggleSynapse.addEventListener('click', () => {
      if (synapseModal) {
        const isVisible = synapseModal.style.display !== 'none';
        synapseModal.style.display = isVisible ? 'none' : 'flex';
        btnToggleSynapse.classList.toggle('active', !isVisible);
        if (!isVisible) {
          synapseLab.init();
          sound.playHoverTick();
        } else {
          synapseLab.stopLoop();
        }
      }
    });
  }

  if (btnSynapseClose) {
    btnSynapseClose.addEventListener('click', () => {
      if (synapseModal) synapseModal.style.display = 'none';
      if (btnToggleSynapse) btnToggleSynapse.classList.remove('active');
      synapseLab.stopLoop();
      sound.playHoverTick();
    });
  }

  // Neurotransmitter selector pills
  const ntButtons = document.querySelectorAll('.synapse-pill');
  ntButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      ntButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const ntId = btn.dataset.nt;
      const nt = synapseLab.setNeurotransmitter(ntId);
      if (nt) {
        const isEn = i18nManager && i18nManager.currentLang === 'en';
        const titleEl = document.getElementById('synapse-info-title');
        const descEl = document.getElementById('synapse-info-desc');
        const typeEl = document.getElementById('synapse-meta-type');
        const ionEl = document.getElementById('synapse-meta-ion');
        const recEl = document.getElementById('synapse-meta-receptor');

        if (titleEl) titleEl.textContent = isEn ? nt.nameEn : nt.nameTh;
        if (descEl) descEl.textContent = isEn ? nt.summaryEn : nt.summaryTh;
        if (typeEl) typeEl.textContent = isEn ? `Type: ${nt.type}` : `ชนิด: ${nt.type}`;
        if (ionEl) ionEl.textContent = isEn ? `Ion: ${nt.ion}` : `ไอออน: ${nt.ion}`;
        if (recEl) recEl.textContent = isEn ? `Receptor: ${nt.receptorNameEn}` : `ตัวรับ: ${nt.receptorNameTh}`;
      }
    });
  });

  // Drug Challenge selector
  const drugSelect = document.getElementById('synapse-drug-select');
  if (drugSelect) {
    drugSelect.addEventListener('change', () => {
      const drug = synapseLab.setDrugChallenge(drugSelect.value);
      if (drug) {
        const isEn = i18nManager && i18nManager.currentLang === 'en';
        const cTitle = document.getElementById('synapse-challenge-title');
        const cDesc = document.getElementById('synapse-challenge-desc');
        if (cTitle) cTitle.textContent = isEn ? drug.nameEn : drug.nameTh;
        if (cDesc) cDesc.textContent = isEn ? drug.effectEn : drug.effectTh;
      }
    });
  }

  // Fire AP button
  const btnFireAp = document.getElementById('btn-fire-ap');
  if (btnFireAp) {
    btnFireAp.addEventListener('click', () => {
      synapseLab.fireActionPotential();
    });
  }

  // Spike Train button
  const btnSpikeTrain = document.getElementById('btn-toggle-spike-train');
  if (btnSpikeTrain) {
    btnSpikeTrain.addEventListener('click', () => {
      const nextActive = !synapseLab.isSpikeTrainActive;
      synapseLab.toggleSpikeTrain(nextActive);
      btnSpikeTrain.classList.toggle('active', nextActive);
      sound.playHoverTick();
    });
  }
}



// ============================================================================
// Raycasting & Hit Detection
// ============================================================================
function onCanvasMouseMove(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(brainGroup.children, true);

  const tooltip = document.getElementById('hover-tooltip');

  if (intersects.length > 0) {
    const hit = intersects[0];
    const structId = resolveStructureIdFromHit(hit);
    if (structId) {
      if (state.hoveredId !== structId) {
        state.hoveredId = structId;
        sound.playHoverTick();
      }
      const struct = BRAIN_STRUCTURES.find(s => s.id === structId);
      if (struct && tooltip) {
        const isEn = i18nManager && i18nManager.currentLang === 'en';
        tooltip.textContent = isEn ? `${struct.nameEn} (${struct.nameTh})` : `${struct.nameTh} (${struct.nameEn})`;
        tooltip.style.left = `${e.clientX}px`;
        tooltip.style.top = `${e.clientY}px`;
        tooltip.style.display = 'block';
        return;
      }
    }
  } else {
    state.hoveredId = null;
  }

  if (tooltip) tooltip.style.display = 'none';
}

function onCanvasClick(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(brainGroup.children, true);

  if (intersects.length > 0) {
    const hit = intersects[0];
    const structId = resolveStructureIdFromHit(hit);
    if (structId) {
      selectStructure(structId);
      if (questManager && questManager.isActive) {
        questManager.evaluateSelection(structId);
      }
    }
  }
}

function resolveStructureIdFromHit(hit) {
  let obj = hit.object;

  // 1. Direct userData id (internal structures: vasculature, ventricles, thalamus)
  if (obj.userData && obj.userData.id) return obj.userData.id;
  while (obj.parent && obj.parent !== brainGroup) {
    if (obj.userData && obj.userData.id) return obj.userData.id;
    obj = obj.parent;
  }

  // 2. FreeSurfer GLTF meshes
  const hitObj = hit.object;
  const meshName = hitObj.name;
  const point = hit.point;

  if (meshName === 'frontal-lobe' || meshName === 'prefrontal-cortex') {
    return point.x < 0 ? 'frontal_lobe_left' : 'frontal_lobe_right';
  } else if (meshName === 'parietal-lobe') {
    return point.x < 0 ? 'parietal_lobe_left' : 'parietal_lobe_right';
  } else if (meshName === 'temporal-lobe') {
    return point.x < 0 ? 'temporal_lobe_left' : 'temporal_lobe_right';
  } else if (meshName === 'occipital-lobe') {
    return point.x < 0 ? 'occipital_lobe_left' : 'occipital_lobe_right';
  } else if (meshName === 'cerebellum') {
    return 'cerebellum';
  } else if (meshName === 'brain-stem') {
    if (point.y > -25) return 'brainstem_midbrain';
    if (point.y > -45) return 'brainstem_pons';
    return 'brainstem_medulla';
  } else if (meshName === 'hippocampus') {
    return 'hippocampus';
  } else if (meshName === 'amygdala') {
    return 'amygdala';
  } else if (meshName === 'corpus-callosum') {
    return 'corpus_callosum';
  }

  return null;
}

function onWindowResize() {
  const container = document.getElementById('viewport-container');
  if (!container || !renderer || !camera) return;

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// ============================================================================
// Main Render Loop
// ============================================================================
function animate() {
  animationFrameId = requestAnimationFrame(animate);

  controls.update();

  // 3D Pinpoint Target Marker Pulse Animation
  if (targetPinpointMarker && targetPinpointMarker.visible) {
    const t = performance.now() * 0.003;
    const pulse = 1.0 + 0.22 * Math.sin(t * 3.5);
    targetPinpointMarker.scale.set(pulse, pulse, pulse);
    targetPinpointMarker.rotation.y += 0.015;
  }

  // 3D Lesion Ischemic Flickering Pulse
  if (lesionSimulator && lesionSimulator.isLesionActive()) {
    const t = performance.now() * 0.006;
    const flicker = 0.5 + 0.45 * Math.sin(t * 4);

    // FreeSurfer GLTF meshes
    gltfMeshMap.forEach((mesh, name) => {
      let isAffected = false;
      if (name.includes('frontal') && (lesionSimulator.isStructureAffected('frontal_lobe_left') || lesionSimulator.isStructureAffected('frontal_lobe_right'))) isAffected = true;
      if (name.includes('parietal') && (lesionSimulator.isStructureAffected('parietal_lobe_left') || lesionSimulator.isStructureAffected('parietal_lobe_right'))) isAffected = true;
      if (name.includes('temporal') && (lesionSimulator.isStructureAffected('temporal_lobe_left') || lesionSimulator.isStructureAffected('temporal_lobe_right'))) isAffected = true;
      if (name.includes('occipital') && (lesionSimulator.isStructureAffected('occipital_lobe_left') || lesionSimulator.isStructureAffected('occipital_lobe_right'))) isAffected = true;
      if (name === 'cerebellum' && lesionSimulator.isStructureAffected('cerebellum')) isAffected = true;
      if (name === 'brain-stem' && (lesionSimulator.isStructureAffected('brainstem_midbrain') || lesionSimulator.isStructureAffected('brainstem_pons') || lesionSimulator.isStructureAffected('brainstem_medulla'))) isAffected = true;
      if (name === 'hippocampus' && lesionSimulator.isStructureAffected('hippocampus')) isAffected = true;
      if (name === 'amygdala' && lesionSimulator.isStructureAffected('amygdala')) isAffected = true;
      if (name === 'corpus-callosum' && lesionSimulator.isStructureAffected('corpus_callosum')) isAffected = true;

      if (isAffected && mesh.material) {
        mesh.material.emissive.setRGB(flicker * 0.85, 0.04, 0.04);
        mesh.material.emissiveIntensity = flicker * 0.8;
      }
    });

    // Internal Structures (Vasculature, Ventricles, Thalamus)
    structureMeshMap.forEach((mesh, id) => {
      if (lesionSimulator.isStructureAffected(id)) {
        mesh.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.emissive.setRGB(flicker * 0.9, 0.04, 0.04);
            child.material.emissiveIntensity = flicker * 0.85;
          }
        });
      }
    });
  }

  // 3D EEG Cortical Electrical Ripple Animation
  if (eegLab && eegLab.isActive && (!lesionSimulator || !lesionSimulator.isLesionActive())) {
    const st = eegLab.getCurrentState();
    const band = EEG_BANDS[st.band];
    const freq = band ? band.dominantFreq : 10;
    const t = performance.now() * 0.001;
    // Oscillation wave matching dominant rhythm frequency
    const ripple = 0.5 + 0.5 * Math.sin(2 * Math.PI * freq * t);
    const activeLobe = st.activeLobe;

    gltfMeshMap.forEach((mesh, name) => {
      let isLobeActive = false;
      if (activeLobe === 'all') isLobeActive = true;
      else if (activeLobe && name.includes(activeLobe)) isLobeActive = true;

      if (isLobeActive && mesh.material) {
        if (st.id === 'state_absence_seizure') {
          // Sharp amber/gold electrical surge across the whole cortex
          mesh.material.emissive.setRGB(ripple * 0.95, ripple * 0.75, 0.05);
          mesh.material.emissiveIntensity = ripple * 0.9;
        } else if (st.band === 'alpha') {
          // Emerald glow in occipital/parietal
          mesh.material.emissive.setRGB(0.04, ripple * 0.85, 0.45);
          mesh.material.emissiveIntensity = ripple * 0.65;
        } else if (st.band === 'beta') {
          // Fast amber/cyan flicker in frontal
          mesh.material.emissive.setRGB(ripple * 0.85, ripple * 0.7, 0.1);
          mesh.material.emissiveIntensity = ripple * 0.6;
        } else if (st.band === 'delta') {
          // Deep indigo slow wave swell
          mesh.material.emissive.setRGB(0.25 * ripple, 0.3 * ripple, 0.9 * ripple);
          mesh.material.emissiveIntensity = ripple * 0.7;
        } else if (st.band === 'theta') {
          // Cyan rhythm in temporal
          mesh.material.emissive.setRGB(0.05, 0.75 * ripple, 0.9 * ripple);
          mesh.material.emissiveIntensity = ripple * 0.6;
        }
      }
    });
  }

  // 3D White Matter Axonal Pulse Glow
  if (whiteMatterTracts) {
    whiteMatterTracts.update(performance.now() * 0.001);
  }

  renderer.render(scene, camera);
}


