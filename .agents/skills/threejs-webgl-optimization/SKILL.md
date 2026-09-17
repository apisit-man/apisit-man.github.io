---
name: threejs-webgl-optimization
description: >-
  Expert guidelines and code patterns for developing, optimizing, and debugging Three.js and WebGL 3D applications,
  interactive car showcases, aerodynamic simulations, and science atlases. Use when working on Three.js scenes,
  particle effects (exhaust smoke/flame), GLTF/Draco asset loading, mobile 60 FPS performance, and WebGL memory disposal.
---

# Three.js & WebGL Optimization Guide

This skill provides production-tested patterns for high-performance 3D web applications in this repository (e.g., Ferrari SF90, Circuit Racing, Mars Hexapod, and 3D Anatomical Atlases).

---

## 1. Scene Initialization & Color Accuracy (Three.js r160 - r185+)

Always configure the renderer with correct modern color management and tone mapping:

```javascript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('webgl-canvas'),
  antialias: true,
  powerPreference: 'high-performance',
  alpha: false
});

// Color management & tone mapping
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

// Clamp DPR to max 2.0 to protect mobile GPUs from 3x/4x pixel overload
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
renderer.setSize(window.innerWidth, window.innerHeight);

// Shadow map settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Realistic environment lighting with RoomEnvironment
const pmremGenerator = new THREE.PMREMGenerator(renderer);
const environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environment = environment;
```

---

## 2. Preventing Memory Leaks & Proper Disposal

When switching car models, environments, or reloading assets, WebGL buffers **must** be explicitly disposed. Failing to do so causes browser crashes on mobile iOS/Android due to memory buildup.

### Recursive Model Disposal Pattern:
```javascript
export function disposeHierarchy(rootObject) {
  if (!rootObject) return;

  rootObject.traverse((node) => {
    if (node.isMesh) {
      if (node.geometry) {
        node.geometry.dispose();
      }

      if (node.material) {
        if (Array.isArray(node.material)) {
          node.material.forEach((mat) => disposeMaterial(mat));
        } else {
          disposeMaterial(node.material);
        }
      }
    }
  });

  if (rootObject.parent) {
    rootObject.parent.remove(rootObject);
  }
}

function disposeMaterial(mat) {
  // Dispose all associated textures
  [
    'map', 'normalMap', 'roughnessMap', 'metalnessMap',
    'aoMap', 'bumpMap', 'emissiveMap', 'envMap'
  ].forEach((textureKey) => {
    if (mat[textureKey] && typeof mat[textureKey].dispose === 'function') {
      mat[textureKey].dispose();
    }
  });
  mat.dispose();
}
```

---

## 3. High-Performance Volumetric FX (Exhaust Smoke, Flame & Wind Lines)

Avoid heavy mesh instancing or post-processing bloom on mobile. Instead, use point sprites (`THREE.Points`) or reusable billboard quads with additive blending:

```javascript
// Additive Particle Material Pattern
const particleTexture = createCircularGradientTexture(); // or loaded canvas/sprite
const particleMaterial = new THREE.PointsMaterial({
  size: 0.25,
  map: particleTexture,
  transparent: true,
  opacity: 0.8,
  depthWrite: false, // Critical for avoiding transparent sorting artifacts
  blending: THREE.AdditiveBlending,
  vertexColors: true
});

// Update loop: reuse pre-allocated Float32Array buffers rather than recreating geometries
function updateParticles(positions, velocities, colors, dt) {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Update coordinates in place
    positions[i * 3 + 0] += velocities[i * 3 + 0] * dt;
    positions[i * 3 + 1] += velocities[i * 3 + 1] * dt;
    positions[i * 3 + 2] += velocities[i * 3 + 2] * dt;
  }
  particleGeometry.attributes.position.needsUpdate = true;
  particleGeometry.attributes.color.needsUpdate = true;
}
```

---

## 4. Draco & GLTF Optimized Loading

When bundling models or loading GLTF/GLB models:
- Always use `DRACOLoader` with a locally-hosted decoder directory (`./draco/`) to avoid external CDN network failures.
- Set `gltfLoader.setDRACOLoader(dracoLoader)`.
- Pre-cache decoded models if multiple views switch between them.

---

## 5. Mobile & Responsive Viewport Handling

```javascript
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
}
```
