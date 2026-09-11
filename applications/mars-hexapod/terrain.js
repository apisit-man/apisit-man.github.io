import * as THREE from 'three';

/**
 * Procedural Martian Landscape & Mission Extraction Sites
 * Generates natural terracotta sand dunes, basalt boulders, and scientific beacons.
 */
export class MarsTerrain {
  constructor(scene) {
    this.scene = scene;
    this.size = 260; // 260m x 260m crater exploration area
    this.segments = 130;
    this.mesh = null;
    this.rocks = [];
    this.samples = [];
    this.lander = null;

    this.initTerrain();
    this.initRocks();
    this.initSamples();
    this.initLander();
  }

  /**
   * Continuous mathematical heightmap of Chryse Planitia
   * Gives natural rolling Martian dunes, crater bowl, and smooth valleys.
   */
  getHeight(x, z) {
    const r = Math.sqrt(x * x + z * z);

    // 1. Crater bowl & outer rim profile
    let craterElev = 0;
    if (r > 35 && r < 105) {
      const t = (r - 35) / 70; // 0 to 1
      craterElev = Math.sin(t * Math.PI) * 3.2; // Rim rises +3.2m
    } else if (r >= 105) {
      craterElev = 0.4 - (r - 105) * 0.04;
    }

    // 2. Rolling Martian dunes
    const d1 = Math.sin(x * 0.05 + z * 0.035) * 1.1;
    const d2 = Math.cos(x * 0.08 - z * 0.065) * 0.55;
    const d3 = Math.sin(x * 0.16 + z * 0.12) * 0.22;
    const ripples = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 0.05;

    return craterElev + d1 + d2 + d3 + ripples;
  }

  /**
   * Compute surface normal at any world (x, z)
   */
  getNormal(x, z) {
    const delta = 0.25;
    const hL = this.getHeight(x - delta, z);
    const hR = this.getHeight(x + delta, z);
    const hD = this.getHeight(x, z - delta);
    const hU = this.getHeight(x, z + delta);

    const normal = new THREE.Vector3((hL - hR) / (2 * delta), 1.0, (hD - hU) / (2 * delta));
    normal.normalize();
    return normal;
  }

  /**
   * Build procedural terrain geometry with NASA-style Mars vertex shading
   */
  initTerrain() {
    const geom = new THREE.PlaneGeometry(this.size, this.size, this.segments, this.segments);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    const colors = [];

    // Authentic Mars Palette
    const colorDeep = new THREE.Color(0xa34424);  // Deep iron oxide valley
    const colorSand = new THREE.Color(0xd4653b);  // Warm terracotta sand
    const colorCrest = new THREE.Color(0xee8b58); // Sunlit dune crest
    const colorRock = new THREE.Color(0xb8522e);  // Basalt outcrop

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = this.getHeight(x, z);
      pos.setY(i, y);

      // Height & slope based color blend
      const normY = Math.max(0, Math.min(1, (y + 1.5) / 4.5));
      const c = new THREE.Color();

      if (normY < 0.4) {
        c.lerpColors(colorDeep, colorSand, normY / 0.4);
      } else if (normY < 0.8) {
        c.lerpColors(colorSand, colorCrest, (normY - 0.4) / 0.4);
      } else {
        c.lerpColors(colorCrest, colorRock, (normY - 0.8) / 0.2);
      }

      // Subtle noise variation for granular sand realism
      const grain = (Math.sin(x * 0.8) * Math.cos(z * 0.8)) * 0.03;
      c.r += grain;
      c.g += grain * 0.7;

      colors.push(c.r, c.g, c.b);
    }

    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.85,
      metalness: 0.1,
      flatShading: false
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);

    // Subtle coordinate grid overlay for scientific telemetry
    const gridHelper = new THREE.GridHelper(this.size, 52, 0xee8b58, 0x7c2d12);
    gridHelper.position.y = -0.3;
    gridHelper.material.opacity = 0.18;
    gridHelper.material.transparent = true;
    this.scene.add(gridHelper);
  }

  /**
   * Scatter basalt rocks away from the landing zone
   */
  initRocks() {
    const rockCount = 65;
    
    // Realistic angular ventifact rock geometries
    const rockGeom1 = new THREE.IcosahedronGeometry(1, 0); // Sharp faceted boulder
    const rockGeom2 = new THREE.DodecahedronGeometry(1, 0); // Tabular slab boulder
    
    // Authentic Martian Basalt Palettes (Rust-coated volcanic rock)
    const rockMat1 = new THREE.MeshStandardMaterial({
      color: 0x8a3822, // Iron oxide oxidized crust
      roughness: 0.85,
      metalness: 0.12,
      flatShading: true
    });
    const rockMat2 = new THREE.MeshStandardMaterial({
      color: 0x61281a, // Darker olivine-rich basalt
      roughness: 0.90,
      metalness: 0.18,
      flatShading: true
    });

    for (let i = 0; i < rockCount; i++) {
      // Keep clear radius around spawn
      const radius = 11 + Math.random() * 88;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = this.getHeight(x, z);

      const isSlab = Math.random() > 0.5;
      const geom = isSlab ? rockGeom2 : rockGeom1;
      const mat = isSlab ? rockMat2 : rockMat1;

      const scale = 0.5 + Math.random() * 1.5;
      const rock = new THREE.Mesh(geom, mat);
      // Half-buried in Martian sand
      rock.position.set(x, y + scale * 0.28, z);
      rock.rotation.set(Math.random() * 0.4, Math.random() * Math.PI * 2, Math.random() * 0.4);
      rock.scale.set(scale * (0.8 + Math.random() * 0.5), scale * (0.45 + Math.random() * 0.4), scale * (0.8 + Math.random() * 0.5));
      rock.castShadow = true;
      rock.receiveShadow = true;

      this.scene.add(rock);
      this.rocks.push({ position: new THREE.Vector3(x, y, z), radius: scale * 0.85 });
    }
  }

  /**
   * Scientific Sample extraction sites with 3D glowing beacons
   */
  initSamples() {
    const sampleConfigs = [
      {
        id: 'alpha',
        name: 'Sample Alpha: Hematite Spherules',
        thaiName: 'ตัวอย่าง แอลฟา: เฮมาไทต์ทรงกลม (Martian Blueberries)',
        x: -28,
        z: 32,
        color: 0x38bdf8,
        description: 'แร่เฮมาไทต์ทรงกลม หลักฐานสำคัญของการมีน้ำในสถานะของเหลวในอดีตของดาวอังคาร',
        stemFact: 'แร่เฮมาไทต์ (Fe₂O₃) ก่อตัวจากการตกตะกอนในแหล่งน้ำที่มีสภาพเป็นกรด บ่งชี้ว่าไครซีพลานิเทียเคยมีสภาพแวดล้อมชุ่มชื้น'
      },
      {
        id: 'beta',
        name: 'Sample Beta: Subsurface Perchlorate Ice',
        thaiName: 'ตัวอย่าง บีตา: น้ำแข็งเปอร์คลอเรตใต้ผิวดิน',
        x: 38,
        z: 36,
        color: 0xa855f7,
        description: 'ผลึกน้ำแข็งใต้ดินผสมเกลือเปอร์คลอเรต แหล่งข้อมูลสำคัญสำหรับชีวดาราศาสตร์',
        stemFact: 'เกลือเปอร์คลอเรตช่วยลดจุดเยือกแข็งของน้ำ ทำให้น้ำคงสภาพของเหลวที่อุณหภูมิติดลบ เป็นสารตั้งต้นในการสกัดออกซิเจน'
      },
      {
        id: 'gamma',
        name: 'Sample Gamma: Olivine Basalt Outcrop',
        thaiName: 'ตัวอย่าง แกมมา: หินบะซอลต์โอลิวีนบนยอดผา',
        x: -42,
        z: -45,
        color: 0x22c55e,
        description: 'หินภูเขาไฟอุดมด้วยโอลิวีนบนขอบแอ่งหลุมอุกกาบาต บันทึกประวัติศาสตร์การปะทุของภูเขาไฟ',
        stemFact: 'โอลิวีนสลายตัวอย่างรวดเร็วเมื่อเจอน้ำ การพบหินโอลิวีนที่ยังสดบนยอดผาช่วยยืนยันการเปลี่ยนแปลงของสภาพภูมิอากาศสู่ความแห้งแล้ง'
      },
      {
        id: 'delta',
        name: 'Sample Delta: Paleomagnetic Nanocrystals',
        thaiName: 'ตัวอย่าง เดลตา: ผลึกแม่เหล็กโบราณ',
        x: 36,
        z: -55,
        color: 0xf59e0b,
        description: 'ผลึกแมกนีไทต์ที่เก็บประจุสนามแม่เหล็กดึกดำบรรพ์ของดาวอังคาร',
        stemFact: 'ดาวอังคารสูญเสียสนามแม่เหล็กโลกไปเมื่อ 4 พันล้านปีก่อน ผลึกนี้ช่วยไขปริศนาการสูญเสียชั้นบรรยากาศของดาวเคราะห์'
      }
    ];

    sampleConfigs.forEach((cfg) => {
      const y = this.getHeight(cfg.x, cfg.z);

      const group = new THREE.Group();
      group.position.set(cfg.x, y, cfg.z);

      // Glowing crystal core
      const coreGeom = new THREE.OctahedronGeometry(0.85, 0);
      const coreMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.9,
        roughness: 0.15,
        metalness: 0.8
      });
      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      coreMesh.position.y = 1.6;
      coreMesh.castShadow = true;
      group.add(coreMesh);

      // Holographic laser pillar
      const pillarGeom = new THREE.CylinderGeometry(0.06, 0.06, 12, 8);
      const pillarMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.4
      });
      const pillar = new THREE.Mesh(pillarGeom, pillarMat);
      pillar.position.y = 6.0;
      group.add(pillar);

      // Light beacon
      const light = new THREE.PointLight(cfg.color, 3.5, 16);
      light.position.y = 2.2;
      group.add(light);

      // Ground beacon ring
      const ringGeom = new THREE.RingGeometry(1.8, 2.2, 32);
      ringGeom.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.y = 0.08;
      group.add(ring);

      this.scene.add(group);

      this.samples.push({
        id: cfg.id,
        name: cfg.name,
        thaiName: cfg.thaiName,
        position: new THREE.Vector3(cfg.x, y, cfg.z),
        color: cfg.color,
        description: cfg.description,
        stemFact: cfg.stemFact,
        group: group,
        coreMesh: coreMesh,
        collected: false,
        triggerRadius: 4.8
      });
    });
  }

  /**
   * Mars Ascent Vehicle (MAV) Lander Base
   * Positioned behind the rover deployment zone at (0, y, -16)
   */
  initLander() {
    const landerZ = -16;
    const y = this.getHeight(0, landerZ);
    const group = new THREE.Group();
    group.position.set(0, y, landerZ);

    // 1. Octagonal White Insulated Base Stage
    const baseGeom = new THREE.CylinderGeometry(3.6, 4.4, 2.0, 8);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.8,
      roughness: 0.25
    });
    const base = new THREE.Mesh(baseGeom, baseMat);
    base.position.y = 1.3;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    // 2. Gold Kapton Thermal Foil Middle Stage
    const foilGeom = new THREE.CylinderGeometry(2.6, 3.4, 2.4, 8);
    const foilMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Gold foil
      metalness: 0.95,
      roughness: 0.2
    });
    const foil = new THREE.Mesh(foilGeom, foilMat);
    foil.position.y = 3.3;
    foil.castShadow = true;
    group.add(foil);

    // 3. Ascent Rocket Capsule
    const coneGeom = new THREE.ConeGeometry(2.4, 3.6, 8);
    const coneMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.7,
      roughness: 0.3
    });
    const cone = new THREE.Mesh(coneGeom, coneMat);
    cone.position.y = 6.1;
    cone.castShadow = true;
    group.add(cone);

    // 4. Heavy-Duty Quad Landing Struts
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const legGeom = new THREE.CylinderGeometry(0.14, 0.14, 4.8);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85 });
      const leg = new THREE.Mesh(legGeom, legMat);
      leg.position.set(Math.cos(angle) * 3.4, 1.1, Math.sin(angle) * 3.4);
      leg.rotation.z = Math.cos(angle) * 0.65;
      leg.rotation.x = Math.sin(angle) * 0.65;
      leg.castShadow = true;
      group.add(leg);

      // Footpad
      const padGeom = new THREE.CylinderGeometry(0.75, 0.75, 0.18, 12);
      const pad = new THREE.Mesh(padGeom, legMat);
      pad.position.set(Math.cos(angle) * 4.8, 0.12, Math.sin(angle) * 4.8);
      pad.castShadow = true;
      group.add(pad);
    }

    // 5. Extraction Perimeter Ring
    const ringGeom = new THREE.RingGeometry(7.2, 7.8, 36);
    ringGeom.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.position.y = 0.08;
    group.add(ring);

    this.scene.add(group);
    this.lander = {
      position: new THREE.Vector3(0, y, landerZ),
      radius: 8.0,
      group: group
    };
  }

  update(time) {
    this.samples.forEach((sample) => {
      if (!sample.collected) {
        sample.coreMesh.rotation.y = time * 1.5;
        sample.coreMesh.position.y = 1.6 + Math.sin(time * 2.5) * 0.25;
      }
    });
  }
}
