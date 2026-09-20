/**
 * Brain Atlas 3D - Stereotaxic Probe & MNI Coordinate Measurement Engine
 * Simulates clinical neurosurgical navigation, Deep Brain Stimulation (DBS) targeting,
 * and Euclidean distance calculation across the FreeSurfer MNI152 coordinate space.
 */

import * as THREE from 'three';
import { BRAIN_STRUCTURES } from './brain-data.js';
import { sound } from './audio.js';

export class StereotaxicProbe {
  constructor(options = {}) {
    this.scene = options.scene;
    this.onCoordinateChange = options.onCoordinateChange || (() => {});
    this.onTargetLock = options.onTargetLock || (() => {});

    this.isActive = false;
    this.coords = { x: 0, y: 0, z: 0 }; // mm in MNI space
    this.nearestLandmark = null;
    this.nearestDistance = Infinity;
    this.lastBeepedId = null;

    this.probeGroup = new THREE.Group();
    this.probeGroup.visible = false;
    this.cursorMesh = null;
    this.crosshairLines = null;

    if (this.scene) {
      this.init3DObjects();
    }
  }

  init3DObjects() {
    // 1. Glowing Probe Tip Sphere
    const sphereGeo = new THREE.SphereGeometry(2.5, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true
    });
    this.cursorMesh = new THREE.Mesh(sphereGeo, sphereMat);
    this.probeGroup.add(this.cursorMesh);

    // 2. Inner high-intensity center core
    const coreGeo = new THREE.SphereGeometry(1.0, 8, 8);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.probeGroup.add(coreMesh);

    // 3. Orthogonal 3-Axis Crosshair Lines (Sagittal X, Coronal Y, Axial Z)
    const lineMatX = new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.75 }); // Red X
    const lineMatY = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.75 }); // Green Y
    const lineMatZ = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.75 }); // Blue Z

    // X-axis line (-100 to +100 mm)
    const geoX = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-100, 0, 0), new THREE.Vector3(100, 0, 0)]);
    this.lineX = new THREE.Line(geoX, lineMatX);
    this.probeGroup.add(this.lineX);

    // Y-axis line (-120 to +90 mm)
    const geoY = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -120, 0), new THREE.Vector3(0, 90, 0)]);
    this.lineY = new THREE.Line(geoY, lineMatY);
    this.probeGroup.add(this.lineY);

    // Z-axis line (-80 to +90 mm)
    const geoZ = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -80), new THREE.Vector3(0, 0, 90)]);
    this.lineZ = new THREE.Line(geoZ, lineMatZ);
    this.probeGroup.add(this.lineZ);

    this.scene.add(this.probeGroup);
  }

  toggleProbe() {
    this.isActive = !this.isActive;
    this.probeGroup.visible = this.isActive;
    if (this.isActive) {
      sound.playSelectChime();
      this.updatePosition();
    } else {
      sound.playHoverTick();
    }
    return this.isActive;
  }

  setCoordinates(x, y, z) {
    if (typeof x === 'number') this.coords.x = Math.round(x);
    if (typeof y === 'number') this.coords.y = Math.round(y);
    if (typeof z === 'number') this.coords.z = Math.round(z);

    this.updatePosition();
  }

  stepCoordinate(axis, delta) {
    if (this.coords[axis] !== undefined) {
      this.coords[axis] += delta;
      this.updatePosition();
      sound.playSliceTick();
    }
  }

  updatePosition() {
    const { x, y, z } = this.coords;
    this.probeGroup.position.set(x, y, z);

    // Calculate nearest landmark
    this.calculateNearestLandmark();

    // Trigger lock sound if entering close proximity
    if (this.nearestDistance <= 12 && this.nearestLandmark && this.lastBeepedId !== this.nearestLandmark.id) {
      this.lastBeepedId = this.nearestLandmark.id;
      sound.playStereotaxicLock();
    } else if (this.nearestDistance > 16) {
      this.lastBeepedId = null;
    }

    this.onCoordinateChange({
      coords: { ...this.coords },
      nearestLandmark: this.nearestLandmark,
      distance: this.nearestDistance
    });
  }

  calculateNearestLandmark() {
    let minDist = Infinity;
    let closest = null;
    const { x, y, z } = this.coords;

    BRAIN_STRUCTURES.forEach(struct => {
      if (struct.center && Array.isArray(struct.center)) {
        const dx = x - struct.center[0];
        const dy = y - struct.center[1];
        const dz = z - struct.center[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < minDist) {
          minDist = dist;
          closest = struct;
        }
      }
    });

    this.nearestLandmark = closest;
    this.nearestDistance = Math.round(minDist * 10) / 10;
  }

  jumpToStructure(structureId) {
    const struct = BRAIN_STRUCTURES.find(s => s.id === structureId);
    if (struct && struct.center) {
      this.setCoordinates(struct.center[0], struct.center[1], struct.center[2]);
      sound.playStereotaxicLock();
      this.onTargetLock(struct);
    }
  }
}
