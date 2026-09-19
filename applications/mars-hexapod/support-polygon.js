import * as THREE from 'three';

/**
 * Dynamic Support Polygon & Static Stability Margin Visualizer
 * Dr. Apisit Tongchai - STEM Educational Robotics Kinematics
 * 
 * In legged robotics, the Support Polygon is the convex hull of all foot contact points
 * on the ground. The Static Stability Margin (S) is the shortest horizontal distance
 * from the projected Center of Mass (CoM) to the boundary of this polygon.
 * 
 * - Tripod Gait (Duty Factor β = 0.5): 3 legs in stance -> Triangular Support Polygon
 * - Wave Gait   (Duty Factor β = 0.83): 5 legs in stance -> Pentagonal Support Polygon
 */
export class SupportPolygonVisualizer {
  constructor(scene) {
    this.scene = scene;
    this.visible = true;

    // Max vertices for 6-legged hexapod
    this.maxVertices = 8;

    // 1. Translucent ground fill mesh
    this.geom = new THREE.BufferGeometry();
    this.posArray = new Float32Array(this.maxVertices * 3 * 3); // Triangle fan
    this.posAttr = new THREE.BufferAttribute(this.posArray, 3);
    this.geom.setAttribute('position', this.posAttr);

    this.meshMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(this.geom, this.meshMat);
    this.mesh.renderOrder = 2;
    this.scene.add(this.mesh);

    // 2. Glowing perimeter outline
    this.lineGeom = new THREE.BufferGeometry();
    this.linePosArray = new Float32Array((this.maxVertices + 1) * 3);
    this.linePosAttr = new THREE.BufferAttribute(this.linePosArray, 3);
    this.lineGeom.setAttribute('position', this.linePosAttr);

    this.lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
      linewidth: 2
    });
    this.line = new THREE.Line(this.lineGeom, this.lineMat);
    this.line.renderOrder = 3;
    this.scene.add(this.line);

    // 3. Center of Mass (CoM) ground projection beacon
    const comGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16);
    this.comMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.9
    });
    this.comMesh = new THREE.Mesh(comGeom, this.comMat);
    this.comMesh.renderOrder = 4;
    this.scene.add(this.comMesh);

    // CoM vertical plumb-line
    const plumbGeom = new THREE.BufferGeometry();
    plumbGeom.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 1.2, 0], 3));
    this.plumbLine = new THREE.Line(
      plumbGeom,
      new THREE.LineBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.6 })
    );
    this.scene.add(this.plumbLine);

    this.stats = {
      area: 0,
      stabilityMargin: 0,
      contactCount: 0
    };
  }

  setVisible(visible) {
    this.visible = visible;
    this.mesh.visible = visible;
    this.line.visible = visible;
    this.comMesh.visible = visible;
    this.plumbLine.visible = visible;
  }

  toggleVisible() {
    this.setVisible(!this.visible);
    return this.visible;
  }

  /**
   * Calculates minimum horizontal distance from point P(x, z) to line segment A-B
   */
  distPointToSegment(px, pz, ax, az, bx, bz) {
    const dx = bx - ax;
    const dz = bz - az;
    const lenSq = dx * dx + dz * dz;
    if (lenSq < 0.0001) return Math.hypot(px - ax, pz - az);

    // Project point onto segment parameter t in [0, 1]
    let t = ((px - ax) * dx + (pz - az) * dz) / lenSq;
    t = Math.max(0, Math.min(1, t));

    const projX = ax + t * dx;
    const projZ = az + t * dz;
    return Math.hypot(px - projX, pz - projZ);
  }

  /**
   * Updates Support Polygon geometry from grounded foot contacts
   * 
   * @param {Array<THREE.Vector3>} contacts - World coordinates of grounded stance feet
   * @param {THREE.Vector3} roverPos - World coordinate of rover Center of Mass
   * @param {string} gaitMode - 'tripod' or 'wave'
   * @param {number} slopeDeg - Current terrain inclination in degrees
   */
  update(contacts, roverPos, gaitMode = 'tripod', slopeDeg = 0) {
    if (!this.visible || !contacts || contacts.length < 3) {
      this.mesh.visible = false;
      this.line.visible = false;
      this.comMesh.visible = false;
      this.plumbLine.visible = false;
      return this.stats;
    }

    this.mesh.visible = true;
    this.line.visible = true;
    this.comMesh.visible = true;
    this.plumbLine.visible = true;

    // 1. Calculate horizontal centroid of contact points
    let cx = 0;
    let cz = 0;
    contacts.forEach(c => {
      cx += c.x;
      cz += c.z;
    });
    cx /= contacts.length;
    cz /= contacts.length;

    // 2. Sort contact points radially (angular sort) to form valid convex perimeter
    const sorted = [...contacts].sort((a, b) => {
      const angleA = Math.atan2(a.z - cz, a.x - cx);
      const angleB = Math.atan2(b.z - cz, b.x - cx);
      return angleA - angleB;
    });

    const n = sorted.length;

    // 3. Calculate Static Stability Margin (S) = min dist from CoM(x, z) to polygon edges
    let minMargin = 999.0;
    let polygonArea = 0;

    for (let i = 0; i < n; i++) {
      const a = sorted[i];
      const b = sorted[(i + 1) % n];

      // Distance to edge
      const d = this.distPointToSegment(roverPos.x, roverPos.z, a.x, a.z, b.x, b.z);
      if (d < minMargin) minMargin = d;

      // Gauss shoelace formula for polygon area
      polygonArea += (a.x * b.z - b.x * a.z);
    }
    polygonArea = Math.abs(polygonArea) * 0.5;

    // 4. Color coding based on stability & gait
    let activeColor = 0x38bdf8; // Cyan for tripod
    let outlineColor = 0x7dd3fc;

    if (gaitMode === 'wave') {
      activeColor = 0xf59e0b; // Amber for wave
      outlineColor = 0xfde047;
    }

    if (minMargin < 0.28 || slopeDeg > 22.0) {
      activeColor = 0xf43f5e; // Rose/red for tip risk
      outlineColor = 0xf87171;
    }

    this.meshMat.color.setHex(activeColor);
    this.lineMat.color.setHex(outlineColor);

    // 5. Update ground fill triangle fan geometry
    // Root vertex at centroid (lifted 3cm above ground to eliminate z-fighting)
    const groundLift = 0.035;
    let posIdx = 0;

    for (let i = 0; i < n; i++) {
      const a = sorted[i];
      const b = sorted[(i + 1) % n];

      // Triangle: (Centroid, a, b)
      this.posArray[posIdx++] = cx;
      this.posArray[posIdx++] = roverPos.y + groundLift;
      this.posArray[posIdx++] = cz;

      this.posArray[posIdx++] = a.x;
      this.posArray[posIdx++] = a.y + groundLift;
      this.posArray[posIdx++] = a.z;

      this.posArray[posIdx++] = b.x;
      this.posArray[posIdx++] = b.y + groundLift;
      this.posArray[posIdx++] = b.z;
    }
    this.geom.setDrawRange(0, n * 3);
    this.posAttr.needsUpdate = true;

    // 6. Update perimeter outline line
    let lineIdx = 0;
    for (let i = 0; i <= n; i++) {
      const pt = sorted[i % n];
      this.linePosArray[lineIdx++] = pt.x;
      this.linePosArray[lineIdx++] = pt.y + groundLift + 0.005;
      this.linePosArray[lineIdx++] = pt.z;
    }
    this.lineGeom.setDrawRange(0, n + 1);
    this.linePosAttr.needsUpdate = true;

    // 7. Update Center of Mass ground projection beacon
    this.comMesh.position.set(roverPos.x, roverPos.y + groundLift + 0.01, roverPos.z);
    this.plumbLine.position.set(roverPos.x, roverPos.y + groundLift, roverPos.z);

    this.stats = {
      area: polygonArea,
      stabilityMargin: minMargin,
      contactCount: n
    };

    return this.stats;
  }
}
