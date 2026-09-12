/**
 * ==========================================================================
 * Professional Circuit Racing - 3D Track & Environment Engine
 * Non-intersecting ~2,250m Grand Prix Circuit with daytime sky dome,
 * 3D drifting clouds, distant mountain ranges, high-resolution tarmac,
 * white track lines, rubber racing grooves, 3D FIA kerbs, Armco guardrails,
 * tire barriers, motorsport sponsor billboards, and spectator grandstands.
 * ==========================================================================
 */

import * as THREE from 'three';

export const TRACKS_DATA = [
  {
    id: 'monza',
    name: 'Autodromo Nazionale Monza',
    shortName: 'Monza GP',
    country: '🇮🇹 Italy',
    flag: '🇮🇹',
    length: '2,250 m',
    turns: 11,
    tag: 'HIGH SPEED',
    description: 'The legendary Italian Temple of Speed with long flat-out straights and sweeping Parabolica.',
    skyColors: { top: 0x1d4ed8, bottom: 0xbae6fd },
    kerbColors: ['#ef4444', '#ffffff'] // Red & White
  },
  {
    id: 'spa',
    name: 'Circuit de Spa-Francorchamps',
    shortName: 'Spa GP',
    country: '🇧🇪 Belgium',
    flag: '🇧🇪',
    length: '2,650 m',
    turns: 19,
    tag: 'ROLLERCOASTER',
    description: 'The Ardennes roller-coaster featuring steep Eau Rouge climbs, Kemmel straight, and Pouhon.',
    skyColors: { top: 0x0f766e, bottom: 0xbae6fd },
    kerbColors: ['#eab308', '#dc2626'] // Gold & Red
  },
  {
    id: 'suzuka',
    name: 'Suzuka International Circuit',
    shortName: 'Suzuka GP',
    country: '🇯🇵 Japan',
    flag: '🇯🇵',
    length: '2,400 m',
    turns: 18,
    tag: 'TECHNICAL APEX',
    description: 'World-renowned technical circuit featuring flowing S-Curves, Degner, and flat-out 130R.',
    skyColors: { top: 0x1e3a8a, bottom: 0xfbcfe8 },
    kerbColors: ['#2563eb', '#ffffff'] // Blue & White
  }
];

export class RacingTrack {
  constructor(scene, trackId = 'monza') {
    this.scene = scene;
    this.trackId = trackId;
    this.currentTrackConfig = TRACKS_DATA.find(t => t.id === trackId) || TRACKS_DATA[0];

    // Master root group for clean disposal and memory management
    this.trackGroup = new THREE.Group();
    this.trackGroup.name = `RacingTrack_${this.trackId}`;
    this.scene.add(this.trackGroup);

    this.roadWidth = 14; // Width of asphalt track in meters
    this.curbWidth = 1.4; // 3D FIA Curb width
    this.barrierDistance = this.roadWidth * 0.5 + this.curbWidth + 3.8; // Distance to continuous perimeter barriers (12.2m)
    this.trackLength = 0;
    this.curve = null;
    this.samplesCount = 600; // Resolution of track spline sampling
    this.samples = []; // Cached sample points { pos, tan, norm, binorm, t, dist }
    this.checkpoints = []; // Sector timing gates
    this.collisionObstacles = []; // Barrier collision segments
    this.clouds = []; // Drifting 3D clouds
    this.gantryLights = [];

    this.initSpline();
    this.buildSkyDome();
    this.buildMountainRanges();
    this.buildClouds();
    this.buildTerrain();
    this.buildTrackMeshes();
    this.buildTracksideProps();
    this.buildStartFinishGantry();
    this.buildGrandstands();
  }

  dispose() {
    if (this.trackGroup) {
      this.scene.remove(this.trackGroup);
      this.trackGroup.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      this.trackGroup = null;
    }
  }

  initSpline() {
    let rawPoints = [];

    if (this.trackId === 'spa') {
      // Spa-Francorchamps Circuit (Belgium)
      rawPoints = [
        new THREE.Vector3(0, 0, 50),       // 0: Start / Grid Straight
        new THREE.Vector3(0, 0, -60),      // 1: Finish Line Gantry
        new THREE.Vector3(0, 0, -190),     // 2: La Source Exit
        new THREE.Vector3(60, 0, -260),    // 3: Eau Rouge Drop
        new THREE.Vector3(150, 0, -320),   // 4: Raidillon Crest
        new THREE.Vector3(260, 0, -350),   // 5: Kemmel Straight 1
        new THREE.Vector3(370, 0, -310),   // 6: Kemmel Straight 2
        new THREE.Vector3(440, 0, -210),   // 7: Les Combes Chicane
        new THREE.Vector3(450, 0, -90),    // 8: Malmedy
        new THREE.Vector3(400, 0, 40),     // 9: Bruxelles Hairpin 1
        new THREE.Vector3(310, 0, 140),    // 10: Bruxelles Hairpin 2
        new THREE.Vector3(200, 0, 210),    // 11: Rivage
        new THREE.Vector3(90, 0, 240),     // 12: Speaker's Corner
        new THREE.Vector3(-30, 0, 270),    // 13: Pouhon Entry
        new THREE.Vector3(-150, 0, 270),   // 14: Pouhon Apex
        new THREE.Vector3(-250, 0, 220),   // 15: Fagnes Chicane
        new THREE.Vector3(-320, 0, 130),   // 16: Campus
        new THREE.Vector3(-350, 0, 20),    // 17: Stavelot Sweeper
        new THREE.Vector3(-320, 0, -90),   // 18: Blanchimont High Speed
        new THREE.Vector3(-240, 0, -170),  // 19: Blanchimont Exit
        new THREE.Vector3(-140, 0, -130),  // 20: Bus Stop Braking
        new THREE.Vector3(-75, 0, -30),    // 21: Bus Stop Apex
        new THREE.Vector3(-55, 0, 65),     // 22: Pit Straight Entry
        new THREE.Vector3(0, 0, 95)        // 23: Align to Grid
      ];
    } else if (this.trackId === 'suzuka') {
      // Suzuka International Circuit (Japan)
      rawPoints = [
        new THREE.Vector3(0, 0, 50),       // 0: Start / Grid Straight
        new THREE.Vector3(0, 0, -60),      // 1: Finish Line Gantry
        new THREE.Vector3(0, 0, -200),     // 2: Main Straight End
        new THREE.Vector3(65, 0, -275),    // 3: First Corner
        new THREE.Vector3(160, 0, -310),   // 4: Turn 2
        new THREE.Vector3(250, 0, -270),   // 5: S-Curves Entry
        new THREE.Vector3(320, 0, -180),   // 6: S-Curves Mid
        new THREE.Vector3(340, 0, -70),    // 7: S-Curves Exit
        new THREE.Vector3(290, 0, 30),     // 8: Dunlop Curve
        new THREE.Vector3(210, 0, 120),    // 9: Degner 1
        new THREE.Vector3(120, 0, 170),    // 10: Degner 2
        new THREE.Vector3(30, 0, 180),     // 11: Under-Pass Straight
        new THREE.Vector3(-60, 0, 240),    // 12: Hairpin Approach
        new THREE.Vector3(-150, 0, 265),   // 13: Hairpin 180 Apex
        new THREE.Vector3(-230, 0, 220),   // 14: Hairpin Exit
        new THREE.Vector3(-300, 0, 130),   // 15: 200R Sweeper
        new THREE.Vector3(-340, 0, 20),    // 16: Spoon Curve 1
        new THREE.Vector3(-310, 0, -80),   // 17: Spoon Curve 2
        new THREE.Vector3(-230, 0, -170),  // 18: Back Straight Speed
        new THREE.Vector3(-140, 0, -140),  // 19: 130R Apex
        new THREE.Vector3(-80, 0, -45),    // 20: 130R Exit
        new THREE.Vector3(-60, 0, 45),     // 21: Casio Triangle Chicane
        new THREE.Vector3(-20, 0, 95),     // 22: Chicane Exit
        new THREE.Vector3(0, 0, 95)        // 23: Align to Grid Straight
      ];
    } else {
      // Default: Autodromo Nazionale Monza (Italy) - 24 points
      rawPoints = [
        new THREE.Vector3(0, 0, 50),       // 0: Start / Grid Straight
        new THREE.Vector3(0, 0, -60),      // 1: Finish Line Gantry
        new THREE.Vector3(0, 0, -220),     // 2: End of Main Straight
        new THREE.Vector3(70, 0, -310),    // 3: Turn 1 (Curva Grande Entry)
        new THREE.Vector3(200, 0, -330),   // 4: Turn 1 Apex
        new THREE.Vector3(320, 0, -260),   // 5: Turn 2 Exit
        new THREE.Vector3(380, 0, -140),   // 6: Straight
        new THREE.Vector3(410, 0, 20),     // 7: High Speed Sweeper
        new THREE.Vector3(380, 0, 160),    // 8: Hairpin Approach
        new THREE.Vector3(280, 0, 230),    // 9: Hairpin Apex 180°
        new THREE.Vector3(180, 0, 200),    // 10: Hairpin Exit
        new THREE.Vector3(100, 0, 140),    // 11: Esses 1
        new THREE.Vector3(30, 0, 210),     // 12: Esses 2
        new THREE.Vector3(-60, 0, 240),    // 13: South Turn
        new THREE.Vector3(-180, 0, 220),   // 14: Back Straight Entry
        new THREE.Vector3(-280, 0, 140),   // 15: Back Straight Full Throttle
        new THREE.Vector3(-320, 0, 20),    // 16: Back Straight High Speed
        new THREE.Vector3(-290, 0, -110),  // 17: Sweeping North Turn
        new THREE.Vector3(-210, 0, -180),  // 18: Chicane Entry
        new THREE.Vector3(-120, 0, -120),  // 19: Chicane Apex
        new THREE.Vector3(-80, 0, -30),    // 20: Parabolica Entry
        new THREE.Vector3(-70, 0, 70),     // 21: Parabolica Sweeper
        new THREE.Vector3(-30, 0, 110),    // 22: Parabolica Exit
        new THREE.Vector3(0, 0, 95)        // 23: Align onto Main Straight
      ];
    }

    this.curve = new THREE.CatmullRomCurve3(rawPoints, true, 'centripetal', 0.5);
    this.trackLength = this.curve.getLength();


    // Cache dense spline samples with cumulative distances
    let cumulativeDist = 0;
    let prevPos = this.curve.getPointAt(0);

    for (let i = 0; i <= this.samplesCount; i++) {
      const u = i / this.samplesCount;
      const pos = this.curve.getPointAt(u);
      if (i > 0) {
        cumulativeDist += pos.distanceTo(prevPos);
      }
      prevPos = pos;

      const tan = this.curve.getTangentAt(u).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const norm = new THREE.Vector3().crossVectors(tan, up).normalize();
      const binorm = new THREE.Vector3().crossVectors(norm, tan).normalize();
      this.samples.push({ u, pos, tan, norm, binorm, dist: cumulativeDist });
    }

    // 4 Sector timing checkpoints
    const cpFractions = [0.0, 0.28, 0.55, 0.82];
    this.checkpoints = cpFractions.map((u, idx) => ({
      index: idx,
      u: u,
      pos: this.curve.getPointAt(u),
      tan: this.curve.getTangentAt(u)
    }));
  }

  /**
   * 1. Grand Prix Daytime Sky Dome (Azure Zenith -> Sky Blue -> Horizon)
   */
  buildSkyDome() {
    const vertexShader = `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + offset).y;
        gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
      }
    `;

    const uniforms = {
      topColor: { value: new THREE.Color(0x1d4ed8) },    // Azure Zenith
      bottomColor: { value: new THREE.Color(0xbae6fd) }, // Soft Sky Blue
      offset: { value: 60 },
      exponent: { value: 0.65 }
    };

    const skyGeo = new THREE.SphereGeometry(1400, 32, 24);
    const skyMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.BackSide,
      depthWrite: false
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    this.trackGroup.add(sky);

    // Glowing Sun Disc
    const sunGeo = new THREE.CircleGeometry(48, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xfffde7,
      transparent: true,
      opacity: 0.95
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(380, 520, 240);
    sunMesh.lookAt(0, 0, 0);
    this.trackGroup.add(sunMesh);
  }

  /**
   * 2. Distant Mountains on the Horizon (Panoramic Ring)
   */
  buildMountainRanges() {
    const mountainGroup = new THREE.Group();
    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0x5b7aa6,
      roughness: 0.95,
      metalness: 0.05,
      flatShading: true
    });

    const numPeaks = 52;
    const radius = 1050;

    for (let i = 0; i < numPeaks; i++) {
      const angle = (i / numPeaks) * Math.PI * 2;
      const height = 100 + Math.sin(i * 1.8) * 50 + Math.cos(i * 3.2) * 35;
      const baseWidth = 100 + Math.random() * 60;

      const coneGeo = new THREE.ConeGeometry(baseWidth, height, 6);
      const peak = new THREE.Mesh(coneGeo, mountainMat);

      const x = Math.cos(angle) * (radius + (Math.random() - 0.5) * 80);
      const z = Math.sin(angle) * (radius + (Math.random() - 0.5) * 80);

      peak.position.set(x, height * 0.45, z);
      peak.rotation.y = Math.random() * Math.PI;
      mountainGroup.add(peak);
    }

    this.trackGroup.add(mountainGroup);
  }

  /**
   * 3. 3D Procedural Cumulus Clouds Drifting Overhead
   */
  buildClouds() {
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.05,
      transparent: true,
      opacity: 0.88,
      flatShading: true
    });

    for (let i = 0; i < 30; i++) {
      const cloudGroup = new THREE.Group();
      const puffsCount = 5 + Math.floor(Math.random() * 4);

      for (let p = 0; p < puffsCount; p++) {
        const radius = 20 + Math.random() * 18;
        const puffGeo = new THREE.DodecahedronGeometry(radius, 1);
        const puff = new THREE.Mesh(puffGeo, cloudMat);
        puff.position.set(
          (p - puffsCount * 0.5) * 24 + (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 22
        );
        puff.scale.set(1.4, 0.65, 1.0);
        cloudGroup.add(puff);
      }

      const x = (Math.random() - 0.5) * 1600;
      const y = 230 + Math.random() * 90;
      const z = (Math.random() - 0.5) * 1600;
      cloudGroup.position.set(x, y, z);
      this.trackGroup.add(cloudGroup);
      this.clouds.push(cloudGroup);
    }
  }

  updateClouds(dt = 0.016) {
    this.clouds.forEach(cloud => {
      cloud.position.x += dt * 5.5;
      if (cloud.position.x > 850) cloud.position.x = -850;
    });
  }

  /**
   * 4. Level Lush Landscape Terrain
   */
  buildTerrain() {
    const grassCanvas = document.createElement('canvas');
    grassCanvas.width = 512;
    grassCanvas.height = 512;
    const gctx = grassCanvas.getContext('2d');

    gctx.fillStyle = '#2f6b32';
    gctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 6000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = Math.random() * 4 + 2;
      const h = Math.random() * 4 + 2;
      gctx.fillStyle = Math.random() > 0.5 ? '#3b7d3e' : '#265929';
      gctx.fillRect(x, y, w, h);
    }

    const grassTex = new THREE.CanvasTexture(grassCanvas);
    grassTex.wrapS = THREE.RepeatWrapping;
    grassTex.wrapT = THREE.RepeatWrapping;
    grassTex.repeat.set(70, 70);

    const terrainGeo = new THREE.PlaneGeometry(2800, 2800, 16, 16);
    terrainGeo.rotateX(-Math.PI / 2);

    const terrainMat = new THREE.MeshStandardMaterial({
      map: grassTex,
      roughness: 0.92,
      metalness: 0.05
    });

    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.position.y = 0.0;
    terrain.receiveShadow = true;
    this.trackGroup.add(terrain);
  }

  /**
   * 5. Photorealistic Track Meshes: Asphalt + White Lines + 3D FIA Kerbs + Barriers
   */
  buildTrackMeshes() {
    const segments = this.samplesCount;
    const halfRoad = this.roadWidth * 0.5;
    const curbW = this.curbWidth;

    // Road Ribbon
    const roadGeo = new THREE.BufferGeometry();
    const roadVertices = [];
    const roadNormals = [];
    const roadUvs = [];
    const roadIndices = [];

    // 3D Beveled FIA Kerbs (Left & Right)
    const curbGeo = new THREE.BufferGeometry();
    const curbVertices = [];
    const curbNormals = [];
    const curbUvs = [];
    const curbIndices = [];

    // Armco Metallic Guardrails
    const barrierGeo = new THREE.BufferGeometry();
    const barrierVertices = [];
    const barrierNormals = [];
    const barrierUvs = [];
    const barrierIndices = [];

    // Catch Debris Safety Fencing
    const fenceGeo = new THREE.BufferGeometry();
    const fenceVertices = [];
    const fenceNormals = [];
    const fenceUvs = [];
    const fenceIndices = [];

    // Gravel Runoff Beds
    const gravelGeo = new THREE.BufferGeometry();
    const gravelVertices = [];
    const gravelNormals = [];
    const gravelUvs = [];
    const gravelIndices = [];

    for (let i = 0; i <= segments; i++) {
      const s = this.samples[i % segments];
      const p = s.pos;
      const n = s.norm;
      // Exact distance-based UV repeat (1 repeat every 6.0 meters)
      const v = s.dist / 6.0;

      // Road Vertices: Left (-halfRoad) to Right (+halfRoad)
      const pL = p.clone().addScaledVector(n, -halfRoad);
      const pR = p.clone().addScaledVector(n, halfRoad);

      roadVertices.push(pL.x, 0.03, pL.z);
      roadVertices.push(pR.x, 0.03, pR.z);
      roadNormals.push(0, 1, 0, 0, 1, 0);
      roadUvs.push(0.0, v, 1.0, v);

      // 3D Beveled Curbs:
      const cL_out = p.clone().addScaledVector(n, -(halfRoad + curbW));
      const cL_mid = p.clone().addScaledVector(n, -(halfRoad + curbW * 0.5));
      const cR_mid = p.clone().addScaledVector(n, (halfRoad + curbW * 0.5));
      const cR_out = p.clone().addScaledVector(n, (halfRoad + curbW));

      // Left curb vertices
      curbVertices.push(cL_out.x, 0.01, cL_out.z);
      curbVertices.push(cL_mid.x, 0.07, cL_mid.z);
      curbVertices.push(pL.x, 0.04, pL.z);

      // Right curb vertices
      curbVertices.push(pR.x, 0.04, pR.z);
      curbVertices.push(cR_mid.x, 0.07, cR_mid.z);
      curbVertices.push(cR_out.x, 0.01, cR_out.z);

      curbNormals.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
      const curbV = s.dist / 1.6;
      curbUvs.push(0, curbV, 0.5, curbV, 1, curbV, 0, curbV, 0.5, curbV, 1, curbV);

      // Gravel Runoff (Outside curbs up to perimeter barrier)
      const bDist = this.barrierDistance;
      const gL_out = p.clone().addScaledVector(n, -bDist);
      const gR_out = p.clone().addScaledVector(n, bDist);
      gravelVertices.push(gL_out.x, 0.015, gL_out.z);
      gravelVertices.push(cL_out.x, 0.015, cL_out.z);
      gravelVertices.push(cR_out.x, 0.015, cR_out.z);
      gravelVertices.push(gR_out.x, 0.015, gR_out.z);
      gravelNormals.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
      gravelUvs.push(0, v, 1, v, 0, v, 1, v);

      // 1. Armco W-Beam Corrugated Barriers (Left & Right)
      const bL = p.clone().addScaledVector(n, -bDist);
      const bR = p.clone().addScaledVector(n, bDist);

      // Left Armco (Corrugated ridges facing inward towards track)
      barrierVertices.push(bL.x, 0.20, bL.z);
      barrierVertices.push(bL.x + n.x * 0.08, 0.52, bL.z + n.z * 0.08);
      barrierVertices.push(bL.x, 0.84, bL.z);
      barrierVertices.push(bL.x + n.x * 0.08, 1.18, bL.z + n.z * 0.08);

      // Right Armco (Corrugated ridges facing inward towards track)
      barrierVertices.push(bR.x, 0.20, bR.z);
      barrierVertices.push(bR.x - n.x * 0.08, 0.52, bR.z - n.z * 0.08);
      barrierVertices.push(bR.x, 0.84, bR.z);
      barrierVertices.push(bR.x - n.x * 0.08, 1.18, bR.z - n.z * 0.08);

      barrierNormals.push(n.x, 0, n.z, n.x, 0, n.z, n.x, 0, n.z, n.x, 0, n.z);
      barrierNormals.push(-n.x, 0, -n.z, -n.x, 0, -n.z, -n.x, 0, -n.z, -n.x, 0, -n.z);

      const bUv = s.dist / 2.0;
      barrierUvs.push(0, bUv, 0.33, bUv, 0.66, bUv, 1.0, bUv);
      barrierUvs.push(0, bUv, 0.33, bUv, 0.66, bUv, 1.0, bUv);

      // 2. High Debris Catch Safety Fencing (y = 1.18m to y = 2.75m)
      fenceVertices.push(bL.x, 1.18, bL.z);
      fenceVertices.push(bL.x - n.x * 0.12, 2.75, bL.z - n.z * 0.12);
      fenceVertices.push(bR.x, 1.18, bR.z);
      fenceVertices.push(bR.x + n.x * 0.12, 2.75, bR.z + n.z * 0.12);

      fenceNormals.push(n.x, 0, n.z, n.x, 0, n.z, -n.x, 0, -n.z, -n.x, 0, -n.z);
      const fUv = s.dist / 3.0;
      fenceUvs.push(0, fUv, 1, fUv, 0, fUv, 1, fUv);

      if (i < segments) {
        // Road quads
        const r1 = i * 2;
        roadIndices.push(r1, r1 + 1, r1 + 2);
        roadIndices.push(r1 + 1, r1 + 3, r1 + 2);

        // Curb quads (Left: 0,1,2, Right: 3,4,5)
        const cBase = i * 6;
        curbIndices.push(cBase, cBase + 1, cBase + 6);
        curbIndices.push(cBase + 1, cBase + 7, cBase + 6);
        curbIndices.push(cBase + 1, cBase + 2, cBase + 7);
        curbIndices.push(cBase + 2, cBase + 8, cBase + 7);

        curbIndices.push(cBase + 3, cBase + 4, cBase + 9);
        curbIndices.push(cBase + 4, cBase + 10, cBase + 9);
        curbIndices.push(cBase + 4, cBase + 5, cBase + 10);
        curbIndices.push(cBase + 5, cBase + 11, cBase + 10);

        // Gravel quads
        const gBase = i * 4;
        gravelIndices.push(gBase, gBase + 1, gBase + 4);
        gravelIndices.push(gBase + 1, gBase + 5, gBase + 4);
        gravelIndices.push(gBase + 2, gBase + 3, gBase + 6);
        gravelIndices.push(gBase + 3, gBase + 7, gBase + 6);

        // Armco quads (Left: 3 quads, Right: 3 quads)
        const b0 = i * 8;
        const n0 = (i + 1) * 8;
        barrierIndices.push(b0, n0, b0 + 1);
        barrierIndices.push(b0 + 1, n0, n0 + 1);
        barrierIndices.push(b0 + 1, n0 + 1, b0 + 2);
        barrierIndices.push(b0 + 2, n0 + 1, n0 + 2);
        barrierIndices.push(b0 + 2, n0 + 2, b0 + 3);
        barrierIndices.push(b0 + 3, n0 + 2, n0 + 3);

        const b0R = i * 8 + 4;
        const n0R = (i + 1) * 8 + 4;
        barrierIndices.push(b0R, b0R + 1, n0R);
        barrierIndices.push(b0R + 1, n0R + 1, n0R);
        barrierIndices.push(b0R + 1, b0R + 2, n0R + 1);
        barrierIndices.push(b0R + 2, n0R + 2, n0R + 1);
        barrierIndices.push(b0R + 2, b0R + 3, n0R + 2);
        barrierIndices.push(b0R + 3, n0R + 3, n0R + 2);

        // Fence quads (Left & Right)
        const f0 = i * 4;
        const fn0 = (i + 1) * 4;
        fenceIndices.push(f0, fn0, f0 + 1);
        fenceIndices.push(f0 + 1, fn0, fn0 + 1);

        const f0R = i * 4 + 2;
        const fn0R = (i + 1) * 4 + 2;
        fenceIndices.push(f0R, f0R + 1, fn0R);
        fenceIndices.push(f0R + 1, fn0R + 1, fn0R);
      }
    }

    roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadVertices, 3));
    roadGeo.setAttribute('normal', new THREE.Float32BufferAttribute(roadNormals, 3));
    roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(roadUvs, 2));
    roadGeo.setIndex(roadIndices);

    curbGeo.setAttribute('position', new THREE.Float32BufferAttribute(curbVertices, 3));
    curbGeo.setAttribute('normal', new THREE.Float32BufferAttribute(curbNormals, 3));
    curbGeo.setAttribute('uv', new THREE.Float32BufferAttribute(curbUvs, 2));
    curbGeo.setIndex(curbIndices);

    gravelGeo.setAttribute('position', new THREE.Float32BufferAttribute(gravelVertices, 3));
    gravelGeo.setAttribute('normal', new THREE.Float32BufferAttribute(gravelNormals, 3));
    gravelGeo.setAttribute('uv', new THREE.Float32BufferAttribute(gravelUvs, 2));
    gravelGeo.setIndex(gravelIndices);

    barrierGeo.setAttribute('position', new THREE.Float32BufferAttribute(barrierVertices, 3));
    barrierGeo.setAttribute('normal', new THREE.Float32BufferAttribute(barrierNormals, 3));
    barrierGeo.setAttribute('uv', new THREE.Float32BufferAttribute(barrierUvs, 2));
    barrierGeo.setIndex(barrierIndices);

    fenceGeo.setAttribute('position', new THREE.Float32BufferAttribute(fenceVertices, 3));
    fenceGeo.setAttribute('normal', new THREE.Float32BufferAttribute(fenceNormals, 3));
    fenceGeo.setAttribute('uv', new THREE.Float32BufferAttribute(fenceUvs, 2));
    fenceGeo.setIndex(fenceIndices);

    // High-Resolution Procedural Asphalt Texture
    const asphaltTex = this.createAsphaltTexture();
    asphaltTex.wrapS = THREE.RepeatWrapping;
    asphaltTex.wrapT = THREE.RepeatWrapping;
    asphaltTex.anisotropy = 8;

    const roadMat = new THREE.MeshStandardMaterial({
      map: asphaltTex,
      roughness: 0.82,
      metalness: 0.12
    });

    // 3D FIA Red/White Kerb Texture
    const curbTex = this.createCurbTexture();
    curbTex.wrapS = THREE.RepeatWrapping;
    curbTex.wrapT = THREE.RepeatWrapping;
    curbTex.anisotropy = 4;

    const curbMat = new THREE.MeshStandardMaterial({
      map: curbTex,
      roughness: 0.65,
      metalness: 0.1
    });

    // Sandy Tan Gravel Runoff Material
    const gravelTex = this.createGravelTexture();
    gravelTex.wrapS = THREE.RepeatWrapping;
    gravelTex.wrapT = THREE.RepeatWrapping;
    gravelTex.repeat.set(2, 40);

    const gravelMat = new THREE.MeshStandardMaterial({
      map: gravelTex,
      roughness: 0.95,
      metalness: 0.05
    });

    // Corrugated Galvanized Steel Armco Guardrail
    const barrierMat = new THREE.MeshStandardMaterial({
      color: 0xc8d0dc,
      metalness: 0.92,
      roughness: 0.25,
      side: THREE.DoubleSide
    });

    // High Catch Debris Wire Fencing Material
    const fenceTex = this.createFenceTexture();
    const fenceMat = new THREE.MeshStandardMaterial({
      map: fenceTex,
      transparent: true,
      opacity: 0.88,
      roughness: 0.65,
      metalness: 0.35,
      side: THREE.DoubleSide
    });

    const roadMesh = new THREE.Mesh(roadGeo, roadMat);
    roadMesh.receiveShadow = true;
    this.trackGroup.add(roadMesh);

    const curbMesh = new THREE.Mesh(curbGeo, curbMat);
    curbMesh.receiveShadow = true;
    this.trackGroup.add(curbMesh);

    const gravelMesh = new THREE.Mesh(gravelGeo, gravelMat);
    gravelMesh.receiveShadow = true;
    this.trackGroup.add(gravelMesh);

    const barrierMesh = new THREE.Mesh(barrierGeo, barrierMat);
    barrierMesh.castShadow = true;
    barrierMesh.receiveShadow = true;
    this.trackGroup.add(barrierMesh);

    const fenceMesh = new THREE.Mesh(fenceGeo, fenceMat);
    fenceMesh.castShadow = true;
    fenceMesh.receiveShadow = true;
    this.trackGroup.add(fenceMesh);

    // Continuous Vertical Steel I-Beam Support Posts
    const postCount = Math.floor(segments / 2) * 2;
    const postGeo = new THREE.BoxGeometry(0.14, 2.75, 0.16);
    const postMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.85,
      roughness: 0.35
    });
    const postMesh = new THREE.InstancedMesh(postGeo, postMat, postCount);
    postMesh.castShadow = true;
    postMesh.receiveShadow = true;

    const dummy = new THREE.Object3D();
    const bDist = this.barrierDistance;
    let postIdx = 0;
    for (let i = 0; i < segments; i += 2) {
      const s = this.samples[i];
      const p = s.pos;
      const n = s.norm;
      const t = s.tan;

      // Left post
      const pL = p.clone().addScaledVector(n, -bDist);
      dummy.position.set(pL.x, 1.375, pL.z);
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), t);
      dummy.updateMatrix();
      postMesh.setMatrixAt(postIdx++, dummy.matrix);

      // Right post
      const pR = p.clone().addScaledVector(n, bDist);
      dummy.position.set(pR.x, 1.375, pR.z);
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), t);
      dummy.updateMatrix();
      postMesh.setMatrixAt(postIdx++, dummy.matrix);
    }
    postMesh.instanceMatrix.needsUpdate = true;
    this.trackGroup.add(postMesh);

    // Store barrier segments for collision detection
    for (let i = 0; i < segments; i += 2) {
      const s = this.samples[i];
      const n = s.norm;
      this.collisionObstacles.push({
        left: s.pos.clone().addScaledVector(n, -bDist),
        right: s.pos.clone().addScaledVector(n, bDist)
      });
    }

    this.buildStartingGrid();
  }

  createAsphaltTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // 1. Dark charcoal asphalt tarmac base
    ctx.fillStyle = '#262930';
    ctx.fillRect(0, 0, 1024, 1024);

    // 2. Fine asphalt aggregate noise
    const imgData = ctx.getImageData(0, 0, 1024, 1024);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 28;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);

    // 3. Dark rubber racing groove bands (where racing slicks leave rubber deposits)
    const grooveGradL = ctx.createLinearGradient(160, 0, 360, 0);
    grooveGradL.addColorStop(0, 'rgba(12, 14, 18, 0.0)');
    grooveGradL.addColorStop(0.5, 'rgba(10, 12, 16, 0.45)');
    grooveGradL.addColorStop(1, 'rgba(12, 14, 18, 0.0)');
    ctx.fillStyle = grooveGradL;
    ctx.fillRect(160, 0, 200, 1024);

    const grooveGradR = ctx.createLinearGradient(660, 0, 860, 0);
    grooveGradR.addColorStop(0, 'rgba(12, 14, 18, 0.0)');
    grooveGradR.addColorStop(0.5, 'rgba(10, 12, 16, 0.45)');
    grooveGradR.addColorStop(1, 'rgba(12, 14, 18, 0.0)');
    ctx.fillStyle = grooveGradR;
    ctx.fillRect(660, 0, 200, 1024);

    // 4. Solid White Outer Boundary Track Lines (Left & Right)
    ctx.fillStyle = '#f8fafc';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 4;
    ctx.fillRect(28, 0, 22, 1024);
    ctx.fillRect(974, 0, 22, 1024);

    // 5. White Dashed Centerline
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 14;
    ctx.setLineDash([70, 70]);
    ctx.beginPath();
    ctx.moveTo(512, 0);
    ctx.lineTo(512, 1024);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
  }

  createCurbTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Alternating vibrant FIA Red & Pure White blocks (customized by circuit theme)
    const [colorA, colorB] = (this.currentTrackConfig && this.currentTrackConfig.kerbColors) || ['#ef4444', '#ffffff'];
    ctx.fillStyle = colorA;
    ctx.fillRect(0, 0, 256, 128);
    ctx.fillStyle = colorB;
    ctx.fillRect(0, 128, 256, 128);


    // Edge bevel shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 122, 256, 12);
    ctx.fillRect(0, 250, 256, 6);

    return new THREE.CanvasTexture(canvas);
  }

  createGravelTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#c9a875'; // Sandy tan
    ctx.fillRect(0, 0, 256, 256);

    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      ctx.fillStyle = Math.random() > 0.5 ? '#b89460' : '#dbbe8e';
      ctx.fillRect(x, y, 3, 3);
    }
    return new THREE.CanvasTexture(canvas);
  }

  createFenceTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 128, 128);

    // Cross diamond wire mesh
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = -128; i <= 256; i += 16) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 128, 128);
      ctx.moveTo(i, 128);
      ctx.lineTo(i + 128, 0);
    }
    ctx.stroke();

    // 4 Horizontal heavy steel tension cables
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    [8, 44, 84, 120].forEach((y) => {
      ctx.moveTo(0, y);
      ctx.lineTo(128, y);
    });
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(160, 2);
    return tex;
  }

  buildStartingGrid() {
    // 1. High-Contrast Checkered Finish Line at z = -60
    const finishCanvas = document.createElement('canvas');
    finishCanvas.width = 1024;
    finishCanvas.height = 256;
    const fctx = finishCanvas.getContext('2d');
    fctx.fillStyle = '#ffffff';
    fctx.fillRect(0, 0, 1024, 256);

    // Thick white boundary lines
    fctx.fillStyle = '#dc2626';
    fctx.fillRect(0, 0, 1024, 20);
    fctx.fillRect(0, 236, 1024, 20);

    // 4 rows of alternating checkered tiles
    fctx.fillStyle = '#0a0a0f';
    const cols = 32;
    const rows = 4;
    const tileW = 1024 / cols;
    const tileH = (256 - 40) / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if ((r + c) % 2 === 0) {
          fctx.fillRect(c * tileW, 20 + r * tileH, tileW, tileH);
        }
      }
    }

    const finishTex = new THREE.CanvasTexture(finishCanvas);
    const finishGeo = new THREE.PlaneGeometry(this.roadWidth - 0.2, 5.0);
    const finishMat = new THREE.MeshStandardMaterial({
      map: finishTex,
      roughness: 0.5,
      metalness: 0.1,
      polygonOffset: true,
      polygonOffsetFactor: -2
    });
    const finishMesh = new THREE.Mesh(finishGeo, finishMat);
    finishMesh.rotation.x = -Math.PI / 2;
    finishMesh.position.set(0, 0.05, -60);
    this.trackGroup.add(finishMesh);

    // 2. Official Staggered F1 Grid Start Boxes (P1 to P6)
    this.gridSlots = [
      { slot: 1, pos: new THREE.Vector3(-3.0, 0.05, 30), rotY: 0 },
      { slot: 2, pos: new THREE.Vector3(3.0, 0.05, 20), rotY: 0 },
      { slot: 3, pos: new THREE.Vector3(-3.0, 0.05, 10), rotY: 0 },
      { slot: 4, pos: new THREE.Vector3(3.0, 0.05, 0), rotY: 0 },
      { slot: 5, pos: new THREE.Vector3(-3.0, 0.05, -10), rotY: 0 },
      { slot: 6, pos: new THREE.Vector3(3.0, 0.05, -20), rotY: 0 }
    ];

    this.gridSlots.forEach((slot) => {
      // Paint numbered box on tarmac
      const boxCanvas = document.createElement('canvas');
      boxCanvas.width = 256;
      boxCanvas.height = 256;
      const bctx = boxCanvas.getContext('2d');

      // Grid box outline
      bctx.strokeStyle = '#ffffff';
      bctx.lineWidth = 14;
      bctx.strokeRect(14, 14, 228, 228);

      // Yellow pole marker bar
      bctx.fillStyle = slot.slot === 1 ? '#fbbf24' : '#ffffff';
      bctx.fillRect(14, 14, 228, 28);

      // Grid position number
      bctx.fillStyle = '#ffffff';
      bctx.font = '900 110px sans-serif';
      bctx.textAlign = 'center';
      bctx.textBaseline = 'middle';
      bctx.fillText(`${slot.slot}`, 128, 145);

      const boxTex = new THREE.CanvasTexture(boxCanvas);
      const slotGeo = new THREE.PlaneGeometry(3.6, 5.0);
      const slotMat = new THREE.MeshBasicMaterial({
        map: boxTex,
        transparent: true,
        opacity: 0.9,
        polygonOffset: true,
        polygonOffsetFactor: -1
      });
      const slotMesh = new THREE.Mesh(slotGeo, slotMat);
      slotMesh.rotation.x = -Math.PI / 2;
      slotMesh.position.set(slot.pos.x, 0.04, slot.pos.z);
      this.trackGroup.add(slotMesh);
    });
  }

  buildTracksideProps() {
    this.buildSponsorBillboards();
    this.buildTireWalls();
    this.buildDistanceMarkers();
    this.buildRealisticTrees();
  }

  buildSponsorBillboards() {
    const sponsors = [
      { name: 'PIRELLI', bg: '#dc2626', fg: '#facc15' },
      { name: 'BREMBO', bg: '#b91c1c', fg: '#ffffff' },
      { name: 'SHELL V-POWER', bg: '#eab308', fg: '#b91c1c' },
      { name: 'SCUDERIA FERRARI', bg: '#991b1b', fg: '#ffffff' },
      { name: 'ROLEX OYSTER', bg: '#14532d', fg: '#facc15' },
      { name: 'MOBIL 1 RACING', bg: '#1e3a8a', fg: '#ffffff' },
      { name: 'AWS CLOUD', bg: '#0f172a', fg: '#f97316' },
      { name: 'DHL MOTORSPORT', bg: '#ca8a04', fg: '#dc2626' }
    ];

    const boardMatArray = sponsors.map(sp => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = sp.bg;
      ctx.fillRect(0, 0, 512, 128);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(0, 0, 512, 12);
      ctx.fillRect(0, 116, 512, 12);

      ctx.fillStyle = sp.fg;
      ctx.font = '900 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sp.name, 256, 64);

      const tex = new THREE.CanvasTexture(canvas);
      return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.35, metalness: 0.1 });
    });

    const boardLocations = [
      { u: 0.08, side: 1 },  // Main straight
      { u: 0.18, side: -1 }, // Turn 1 approach
      { u: 0.26, side: 1 },  // Turn 2
      { u: 0.36, side: -1 }, // Sweeper
      { u: 0.48, side: 1 },  // Hairpin entry
      { u: 0.58, side: -1 }, // Hairpin exit
      { u: 0.68, side: 1 },  // Back straight high speed
      { u: 0.78, side: -1 }, // Chicane entry
      { u: 0.88, side: 1 },  // Parabolica
      { u: 0.96, side: -1 }  // Straight entry
    ];

    const boardGeo = new THREE.BoxGeometry(10, 2.2, 0.35);
    const postGeo = new THREE.CylinderGeometry(0.12, 0.12, 3.2, 8);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });

    boardLocations.forEach((loc, idx) => {
      const sample = this.samples[Math.floor(loc.u * this.samplesCount)];
      if (!sample) return;

      const group = new THREE.Group();
      const dist = (this.roadWidth * 0.5 + this.curbWidth + 4.8) * loc.side;
      const pos = sample.pos.clone().addScaledVector(sample.norm, dist);

      const mat = boardMatArray[idx % boardMatArray.length];
      const board = new THREE.Mesh(boardGeo, mat);
      board.position.y = 2.4;
      board.castShadow = true;
      group.add(board);

      const p1 = new THREE.Mesh(postGeo, postMat);
      p1.position.set(-4, 1.6, 0);
      const p2 = new THREE.Mesh(postGeo, postMat);
      p2.position.set(4, 1.6, 0);
      group.add(p1, p2);

      group.position.copy(pos);
      group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), sample.tan);
      this.trackGroup.add(group);
    });
  }

  buildTireWalls() {
    const tireMatRed = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.8 });
    const tireMatWhite = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 });
    const tireMatBlue = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.8 });
    const mats = [tireMatRed, tireMatWhite, tireMatBlue];

    const tireGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.36, 12);
    // 9 Key outside runoff impact zones around the circuit
    const impactZones = [
      { u: 0.15, side: 1 },  // Turn 1 Curva Grande outside
      { u: 0.22, side: -1 }, // Turn 2 Apex outside
      { u: 0.30, side: 1 },  // Turn 3 Sweeper outside
      { u: 0.45, side: 1 },  // Hairpin approach outside
      { u: 0.52, side: -1 }, // Hairpin 180° apex outside
      { u: 0.62, side: 1 },  // Esses outside
      { u: 0.72, side: -1 }, // Back Straight braking zone outside
      { u: 0.84, side: 1 },  // Chicane entry outside
      { u: 0.94, side: -1 }  // Parabolica high speed exit outside
    ];

    impactZones.forEach((zone) => {
      const sample = this.samples[Math.floor(zone.u * this.samplesCount)];
      if (!sample) return;

      const group = new THREE.Group();
      // Place tire stacks snugly in front of Armco perimeter guardrails
      const dist = (this.barrierDistance - 0.55) * zone.side;

      for (let stack = -4; stack <= 4; stack++) {
        const stackPos = sample.pos.clone()
          .addScaledVector(sample.norm, dist)
          .addScaledVector(sample.tan, stack * 1.05);

        for (let t = 0; t < 3; t++) {
          const tire = new THREE.Mesh(tireGeo, mats[(Math.abs(stack) + t) % 3]);
          tire.position.copy(stackPos);
          tire.position.y = 0.18 + t * 0.36;
          tire.castShadow = true;
          group.add(tire);
        }
      }
      this.trackGroup.add(group);
    });
  }

  buildDistanceMarkers() {
    const distances = ['200', '150', '100', '50'];
    const markerGeo = new THREE.BoxGeometry(1.2, 1.8, 0.15);
    const postGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.4, 8);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x475569 });

    // Turn 1 approach braking zone
    const baseSampleIdx = Math.floor(0.12 * this.samplesCount);

    distances.forEach((distStr, idx) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 192;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 128, 192);
      ctx.fillStyle = '#09090b';
      ctx.fillRect(6, 6, 116, 180);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '900 64px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(distStr, 64, 96);

      const tex = new THREE.CanvasTexture(canvas);
      const markerMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4 });

      const sample = this.samples[baseSampleIdx + idx * 8];
      if (!sample) return;

      const group = new THREE.Group();
      const pos = sample.pos.clone().addScaledVector(sample.norm, -(this.roadWidth * 0.5 + this.curbWidth + 2.2));

      const board = new THREE.Mesh(markerGeo, markerMat);
      board.position.y = 1.4;
      const post = new THREE.Mesh(postGeo, postMat);
      post.position.y = 0.7;
      group.add(board, post);

      group.position.copy(pos);
      group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), sample.tan);
      this.trackGroup.add(group);
    });
  }

  buildRealisticTrees() {
    const treeGroup = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });

    const foliageMats = [
      new THREE.MeshStandardMaterial({ color: 0x1b4332, roughness: 0.82, flatShading: true }),
      new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.82, flatShading: true }),
      new THREE.MeshStandardMaterial({ color: 0x40916c, roughness: 0.82, flatShading: true }),
      new THREE.MeshStandardMaterial({ color: 0x52b788, roughness: 0.82, flatShading: true })
    ];

    const trunkGeo = new THREE.CylinderGeometry(0.35, 0.55, 5, 8);

    for (let i = 0; i < 140; i++) {
      const angle = (i / 140) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const dist = 140 + Math.random() * 340;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      const pt = new THREE.Vector3(x, 0, z);
      const nearest = this.getClosestSplineSample(pt);

      if (nearest && pt.distanceTo(nearest.pos) > (this.roadWidth * 0.5 + 16)) {
        const tree = new THREE.Group();
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 2.5;
        trunk.castShadow = true;
        tree.add(trunk);

        const fMat = foliageMats[i % foliageMats.length];
        const tiers = 3;
        for (let t = 0; t < tiers; t++) {
          const r = 3.4 - t * 0.8;
          const leaves = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 1), fMat);
          leaves.position.y = 4.8 + t * 2.2;
          leaves.castShadow = true;
          tree.add(leaves);
        }

        const scale = 0.85 + Math.random() * 0.65;
        tree.scale.set(scale, scale, scale);
        tree.position.set(x, 0, z);
        treeGroup.add(tree);
      }
    }

    this.trackGroup.add(treeGroup);
  }

  buildStartFinishGantry() {
    const gantryGroup = new THREE.Group();
    this.gantryGroup = gantryGroup;
    gantryGroup.position.set(0, 0, -60);
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.88,
      roughness: 0.28
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626, // Racing Red Accent
      metalness: 0.6,
      roughness: 0.3
    });
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.85
    });

    // 1. Concrete Pylon Footings (Outside Armco barriers)
    const footingGeo = new THREE.BoxGeometry(1.6, 0.8, 2.2);
    const leftFooting = new THREE.Mesh(footingGeo, baseMat);
    leftFooting.position.set(-13.5, 0.4, 0);
    const rightFooting = new THREE.Mesh(footingGeo, baseMat);
    rightFooting.position.set(13.5, 0.4, 0);
    gantryGroup.add(leftFooting, rightFooting);

    // 2. Twin Structural Vertical Steel Truss Towers
    const towerGeo = new THREE.BoxGeometry(0.85, 10.2, 1.2);
    const leftTower = new THREE.Mesh(towerGeo, steelMat);
    leftTower.position.set(-13.5, 5.5, 0);
    const rightTower = new THREE.Mesh(towerGeo, steelMat);
    rightTower.position.set(13.5, 5.5, 0);
    gantryGroup.add(leftTower, rightTower);

    // Lattice diagonal braces on towers
    const braceGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 6);
    for (let h = 2; h <= 8; h += 2.2) {
      const bL1 = new THREE.Mesh(braceGeo, steelMat);
      bL1.position.set(-13.5, h, 0);
      bL1.rotation.z = Math.PI / 4;
      const bR1 = new THREE.Mesh(braceGeo, steelMat);
      bR1.position.set(13.5, h, 0);
      bR1.rotation.z = -Math.PI / 4;
      gantryGroup.add(bL1, bR1);
    }

    // 3. Overhead Horizontal Truss Bridge (Clearance > 7.5m over track!)
    const bridgeSpan = 27.5;
    const bridgeTopGeo = new THREE.BoxGeometry(bridgeSpan, 0.7, 1.6);
    const bridgeTop = new THREE.Mesh(bridgeTopGeo, steelMat);
    bridgeTop.position.set(0, 10.2, 0);

    const bridgeBottomGeo = new THREE.BoxGeometry(bridgeSpan, 0.6, 1.4);
    const bridgeBottom = new THREE.Mesh(bridgeBottomGeo, steelMat);
    bridgeBottom.position.set(0, 7.8, 0);

    gantryGroup.add(bridgeTop, bridgeBottom);

    // Diagonal Lattice Cross-Braces across overhead span
    for (let x = -11.5; x <= 11.5; x += 3.2) {
      const cross1 = new THREE.Mesh(braceGeo, steelMat);
      cross1.position.set(x, 9.0, 0);
      cross1.rotation.z = Math.PI / 4;
      const cross2 = new THREE.Mesh(braceGeo, steelMat);
      cross2.position.set(x, 9.0, 0);
      cross2.rotation.z = -Math.PI / 4;
      gantryGroup.add(cross1, cross2);
    }

    // 4. Double-Sided Illuminated "START / FINISH" Digital Display Board
    const bannerCanvas = document.createElement('canvas');
    bannerCanvas.width = 1024;
    bannerCanvas.height = 256;
    const bctx = bannerCanvas.getContext('2d');

    // High-tech carbon fiber background
    bctx.fillStyle = '#090d16';
    bctx.fillRect(0, 0, 1024, 256);

    // Glowing Neon Cyan & Red borders
    bctx.fillStyle = '#dc2626';
    bctx.fillRect(0, 0, 1024, 18);
    bctx.fillRect(0, 238, 1024, 18);
    bctx.fillStyle = '#38bdf8';
    bctx.fillRect(0, 18, 1024, 6);
    bctx.fillRect(0, 232, 1024, 6);

    // Checkered Flag graphic blocks on both ends
    const sq = 28;
    for (let cy = 24; cy < 232; cy += sq) {
      for (let cx = 0; cx < 140; cx += sq) {
        if (((cx / sq) + (cy / sq)) % 2 === 0) {
          bctx.fillStyle = '#ffffff';
          bctx.fillRect(cx + 20, cy, sq, sq);
          bctx.fillRect(1024 - 160 + cx, cy, sq, sq);
        }
      }
    }

    // Main Illuminated Banner Text
    bctx.fillStyle = '#ffffff';
    bctx.font = '900 68px sans-serif';
    bctx.textAlign = 'center';
    bctx.textBaseline = 'middle';
    bctx.fillText('🏁 START / FINISH 🏁', 512, 95);

    bctx.font = '800 30px monospace';
    bctx.fillStyle = '#38bdf8';
    bctx.fillText('CIRCUIT GRAND PRIX CHAMPIONSHIP', 512, 168);

    bctx.font = '700 20px sans-serif';
    bctx.fillStyle = '#facc15';
    bctx.fillText('⏱️ OFFICIAL TIMING • ROLEX • PIRELLI', 512, 206);

    const bannerTex = new THREE.CanvasTexture(bannerCanvas);
    const bannerMat = new THREE.MeshStandardMaterial({
      map: bannerTex,
      roughness: 0.3,
      metalness: 0.2
    });

    const bannerGeo = new THREE.BoxGeometry(16.5, 2.8, 0.45);
    const bannerMeshFront = new THREE.Mesh(bannerGeo, bannerMat);
    bannerMeshFront.position.set(0, 9.0, 0.4);
    bannerMeshFront.castShadow = true;
    gantryGroup.add(bannerMeshFront);

    // Rear face banner
    const bannerMeshBack = new THREE.Mesh(bannerGeo, bannerMat);
    bannerMeshBack.position.set(0, 9.0, -0.4);
    bannerMeshBack.rotation.y = Math.PI;
    gantryGroup.add(bannerMeshBack);

    // 5. Five F1 Starting Light Pods suspended directly beneath the gantry
    this.gantryLights = [];
    const podHousingGeo = new THREE.BoxGeometry(1.0, 1.7, 0.4);
    const housingMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.95 });

    for (let i = 0; i < 5; i++) {
      const pod = new THREE.Group();
      const housing = new THREE.Mesh(podHousingGeo, housingMat);
      pod.add(housing);

      // Light bulb lens
      const lensGeo = new THREE.CircleGeometry(0.32, 20);
      const bulbMesh = new THREE.Mesh(
        lensGeo,
        new THREE.MeshBasicMaterial({ color: 0x220505 })
      );
      bulbMesh.position.set(0, 0.22, 0.21);
      pod.add(bulbMesh);

      // Upper yellow indicator
      const amberMesh = new THREE.Mesh(
        new THREE.CircleGeometry(0.18, 16),
        new THREE.MeshBasicMaterial({ color: 0x332200 })
      );
      amberMesh.position.set(0, -0.45, 0.21);
      pod.add(amberMesh);

      const xPos = -3.2 + i * 1.6;
      pod.position.set(xPos, 6.7, 0);
      gantryGroup.add(pod);
      this.gantryLights.push(bulbMesh);
    }

    this.trackGroup.add(gantryGroup);
  }


  setGantryLights(redLightsCount, isGreen = false) {
    if (!this.gantryLights) return;
    this.gantryLights.forEach((light, idx) => {
      if (isGreen) {
        light.material.color.setHex(0x22c55e); // Bright Green GO!
      } else if (idx < redLightsCount) {
        light.material.color.setHex(0xef4444); // Bright Red Light
      } else {
        light.material.color.setHex(0x220505); // Inactive dark red
      }
    });
  }

  buildGrandstands() {
    const standGroup = new THREE.Group();
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85 });
    const seatMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.55 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.25 });

    // Main Pit Straight Grandstand placed cleanly ALONGSIDE the straight (Parallel to Z)
    // Runs from z = -140 to z = +20 alongside the straight
    // Situated at X = 24m to 38m (Safely outside the Armco barrier at X = 12.2m)
    const standLength = 160;
    const tiers = 8;

    for (let i = 0; i < tiers; i++) {
      const tierHeight = (i + 1) * 0.95;
      // Width (in X) = 1.8m, Height (in Y) = 0.95m, Length (in Z) = 160m
      const tierGeo = new THREE.BoxGeometry(1.8, 0.95, standLength);
      const tierMesh = new THREE.Mesh(tierGeo, concreteMat);
      tierMesh.position.set(24 + i * 1.6, tierHeight - 0.47, -55);
      tierMesh.castShadow = true;
      tierMesh.receiveShadow = true;
      standGroup.add(tierMesh);

      // Seats on tier
      const seatGeo = new THREE.BoxGeometry(1.2, 0.35, standLength - 4);
      const seatMesh = new THREE.Mesh(seatGeo, seatMat);
      seatMesh.position.set(24 + i * 1.6, tierHeight + 0.18, -55);
      standGroup.add(seatMesh);
    }

    // Curved Overhead Canopy
    const roofGeo = new THREE.BoxGeometry(20, 0.4, standLength + 8);
    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    roofMesh.position.set(29, 11.5, -55);
    roofMesh.rotation.z = -0.15;
    roofMesh.castShadow = true;
    standGroup.add(roofMesh);

    // Support pillars along outside
    const pillarGeo = new THREE.CylinderGeometry(0.35, 0.35, 12, 8);
    for (let z = -120; z <= 10; z += 35) {
      const pillar = new THREE.Mesh(pillarGeo, roofMat);
      pillar.position.set(36, 6, z);
      standGroup.add(pillar);
    }

    // Pit Building on Left Side of Main Straight (X = -20m, Z = -130 to +20)
    const pitWallGeo = new THREE.BoxGeometry(0.8, 1.3, 140);
    const pitWall = new THREE.Mesh(pitWallGeo, concreteMat);
    pitWall.position.set(-20, 0.65, -55);
    pitWall.castShadow = true;
    standGroup.add(pitWall);

    this.trackGroup.add(standGroup);
  }


  getClosestSplineSample(worldPos) {
    let minD = Infinity;
    let best = this.samples[0];
    for (let i = 0; i < this.samples.length; i++) {
      const d = worldPos.distanceToSquared(this.samples[i].pos);
      if (d < minD) {
        minD = d;
        best = this.samples[i];
      }
    }
    return best;
  }

  evaluateSurface(worldPos) {
    const sample = this.getClosestSplineSample(worldPos);
    if (!sample) return { type: 'tarmac', grip: 1.0, drag: 1.0 };

    const distFromCenter = worldPos.distanceTo(sample.pos);
    const halfRoad = this.roadWidth * 0.5;

    if (distFromCenter <= halfRoad) {
      return { type: 'tarmac', grip: 1.0, drag: 1.0, dist: distFromCenter };
    } else if (distFromCenter <= halfRoad + this.curbWidth) {
      return { type: 'curb', grip: 0.88, drag: 1.15, dist: distFromCenter };
    } else if (distFromCenter <= halfRoad + this.curbWidth + 5.0) {
      return { type: 'gravel', grip: 0.45, drag: 2.8, dist: distFromCenter };
    } else {
      return { type: 'grass', grip: 0.35, drag: 3.5, dist: distFromCenter };
    }
  }

  getTrackProgress(worldPos) {
    const sample = this.getClosestSplineSample(worldPos);
    return sample ? sample.u : 0;
  }
}
