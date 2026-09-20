/**
 * Brain Atlas 3D - 3D White Matter Tractography & Neural Connectome Engine
 * Visualizes major axonal fiber bundles connecting cortical and subcortical networks:
 * - Corticospinal Tract (CST - Motor descending pathway)
 * - Arcuate Fasciculus (Language pathway connecting Wernicke & Broca)
 * - Optic Radiations (Geniculocalcarine visual pathway with Meyer's loop)
 * - Corpus Callosum Radiations (Interhemispheric commissural pathway)
 */

import * as THREE from 'three';
import { sound } from './audio.js';

export class WhiteMatterTracts {
  constructor(options = {}) {
    this.scene = options.scene;
    this.isVisible = false;
    this.tractGroup = new THREE.Group();
    this.tractGroup.name = 'WhiteMatterTracts';
    this.tractGroup.visible = false;

    this.animatedMaterials = [];

    if (this.scene) {
      this.buildTracts();
      this.scene.add(this.tractGroup);
    }
  }

  buildTracts() {
    // 1. Corticospinal Tract (CST) - Golden Yellow
    // Descends from Precentral Gyrus -> Corona Radiata -> Internal Capsule -> Brainstem Pyramids
    const cstPointsLeft = [
      new THREE.Vector3(-38, -12, 52), // Motor cortex
      new THREE.Vector3(-28, -10, 36), // Corona radiata
      new THREE.Vector3(-18, -12, 14), // Internal capsule
      new THREE.Vector3(-10, -18, -8), // Cerebral peduncle
      new THREE.Vector3(-8, -26, -22), // Pons
      new THREE.Vector3(-5, -34, -36), // Medullary pyramid
      new THREE.Vector3(2, -44, -50)   // Pyramidal decussation (crossing)
    ];

    const cstPointsRight = [
      new THREE.Vector3(38, -12, 52),
      new THREE.Vector3(28, -10, 36),
      new THREE.Vector3(18, -12, 14),
      new THREE.Vector3(10, -18, -8),
      new THREE.Vector3(8, -26, -22),
      new THREE.Vector3(5, -34, -36),
      new THREE.Vector3(-2, -44, -50)
    ];

    this.createTractMesh(cstPointsLeft, 0xfacc15, 1.4, 'corticospinal_left', 'Corticospinal Tract (Left)');
    this.createTractMesh(cstPointsRight, 0xfacc15, 1.4, 'corticospinal_right', 'Corticospinal Tract (Right)');

    // 2. Arcuate Fasciculus - Vibrant Cyan
    // Arches around Sylvian fissure connecting Wernicke's area to Broca's area
    const arcuatePointsLeft = [
      new THREE.Vector3(-52, -42, 12), // Wernicke's area (STG)
      new THREE.Vector3(-46, -52, 22), // Posterior arch (Parietal operculum)
      new THREE.Vector3(-38, -32, 28), // Superior longitudinal fasciculus
      new THREE.Vector3(-42, -6, 22),  // Frontal subcortical
      new THREE.Vector3(-46, 18, 14)   // Broca's area (IFG)
    ];

    const arcuatePointsRight = [
      new THREE.Vector3(52, -42, 12),
      new THREE.Vector3(46, -52, 22),
      new THREE.Vector3(38, -32, 28),
      new THREE.Vector3(42, -6, 22),
      new THREE.Vector3(46, 18, 14)
    ];

    this.createTractMesh(arcuatePointsLeft, 0x06b6d4, 1.3, 'arcuate_left', 'Arcuate Fasciculus (Left - Speech Arch)');
    this.createTractMesh(arcuatePointsRight, 0x06b6d4, 1.3, 'arcuate_right', 'Arcuate Fasciculus (Right)');

    // 3. Optic Radiations (Geniculocalcarine Tract) - Electric Magenta
    // From LGN arching anteriorly (Meyer's loop) and posteriorly into Occipital V1
    const opticPointsLeft = [
      new THREE.Vector3(-18, -22, -2), // LGN Thalamus
      new THREE.Vector3(-30, -10, -8), // Meyer's loop (Temporal sweep)
      new THREE.Vector3(-36, -42, 4),  // Lateral ventricle wall
      new THREE.Vector3(-28, -66, 8),  // Subcortical occipital
      new THREE.Vector3(-14, -82, 6)   // Primary Visual Cortex V1 (Calcarine)
    ];

    const opticPointsRight = [
      new THREE.Vector3(18, -22, -2),
      new THREE.Vector3(30, -10, -8),
      new THREE.Vector3(36, -42, 4),
      new THREE.Vector3(28, -66, 8),
      new THREE.Vector3(14, -82, 6)
    ];

    this.createTractMesh(opticPointsLeft, 0xec4899, 1.2, 'optic_radiation_left', 'Optic Radiations & Meyer\'s Loop (Left)');
    this.createTractMesh(opticPointsRight, 0xec4899, 1.2, 'optic_radiation_right', 'Optic Radiations & Meyer\'s Loop (Right)');

    // 4. Corpus Callosum Transverse Radiations - Emerald Green
    // Massive commissural arches crossing the midline
    const ccAnterior = [
      new THREE.Vector3(-36, 26, 22),
      new THREE.Vector3(-16, 24, 12),
      new THREE.Vector3(0, 24, 10),    // Genu midline
      new THREE.Vector3(16, 24, 12),
      new THREE.Vector3(36, 26, 22)
    ];

    const ccPosterior = [
      new THREE.Vector3(-34, -42, 24),
      new THREE.Vector3(-16, -34, 16),
      new THREE.Vector3(0, -32, 14),   // Splenium midline
      new THREE.Vector3(16, -34, 16),
      new THREE.Vector3(34, -42, 24)
    ];

    this.createTractMesh(ccAnterior, 0x10b981, 1.5, 'cc_radiation_anterior', 'Corpus Callosum Genu Radiations');
    this.createTractMesh(ccPosterior, 0x10b981, 1.5, 'cc_radiation_posterior', 'Corpus Callosum Splenium Radiations');
  }

  createTractMesh(points, colorHex, radius, id, name) {
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 48, radius, 8, false);

    const material = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity: 0.45,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { id, name, isTract: true };

    this.animatedMaterials.push({
      material,
      baseColor: colorHex,
      speed: 2.0 + Math.random() * 1.5
    });

    this.tractGroup.add(mesh);
  }

  toggleTracts() {
    this.isVisible = !this.isVisible;
    this.tractGroup.visible = this.isVisible;
    if (this.isVisible) {
      sound.playTractFlow();
    } else {
      sound.playHoverTick();
    }
    return this.isVisible;
  }

  setTractsVisible(visible) {
    this.isVisible = !!visible;
    this.tractGroup.visible = this.isVisible;
    if (this.isVisible) {
      sound.playTractFlow();
    }
  }

  /**
   * Called inside requestAnimationFrame animate() loop
   * Creates rhythmic axonal action potential pulse glow
   */
  update(timeSeconds) {
    if (!this.isVisible) return;

    this.animatedMaterials.forEach((item, idx) => {
      const pulse = 0.45 + 0.35 * Math.sin(timeSeconds * item.speed + idx);
      item.material.emissiveIntensity = pulse;
    });
  }
}
