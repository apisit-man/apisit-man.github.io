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
   * Reconstructs the ancient Martian lowland plain and outflow channel basin
   * with rolling dunes, rocky escarpment ridges, and smooth sedimentary deposits.
   */
  getHeight(x, z) {
    const r = Math.sqrt(x * x + z * z);

    // 1. Lowland basin & escarpment ridge profile
    let basinElev = 0;
    if (r > 35 && r < 105) {
      const t = (r - 35) / 70; // 0 to 1
      basinElev = Math.sin(t * Math.PI) * 3.2; // Ridge rises +3.2m
    } else if (r >= 105) {
      basinElev = 0.4 - (r - 105) * 0.04;
    }

    // 2. Rolling Martian dunes
    const d1 = Math.sin(x * 0.05 + z * 0.035) * 1.1;
    const d2 = Math.cos(x * 0.08 - z * 0.065) * 0.55;
    const d3 = Math.sin(x * 0.16 + z * 0.12) * 0.22;
    const ripples = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 0.05;

    // 3. Chryse Planitia Meteorite Impact Crater (Excavated bowl + uplifted ejecta rim)
    const cdx = x - 8.0;
    const cdz = z - 60.0;
    const cr = Math.hypot(cdx, cdz);
    let craterElev = 0;
    if (cr < 28.0) {
      const bowl = cr < 14.0 ? -2.2 * (1.0 - Math.pow(cr / 14.0, 2)) : 0;
      const rim = 1.65 * Math.exp(-Math.pow(cr - 14.0, 2) / 20.48);
      craterElev = bowl + rim;
    }

    return basinElev + d1 + d2 + d3 + ripples + craterElev;
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

    // Impact Crater Rim Ejecta Breccia Boulders (Chryse Crater Rim: x=8, z=60)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const rimRadius = 13.5 + Math.random() * 2.2;
      const rx = 8.0 + Math.cos(angle) * rimRadius;
      const rz = 60.0 + Math.sin(angle) * rimRadius;
      const ry = this.getHeight(rx, rz);

      const rScale = 0.8 + Math.random() * 1.2;
      const ejectaRock = new THREE.Mesh(rockGeom1, rockMat2);
      ejectaRock.position.set(rx, ry + rScale * 0.32, rz);
      ejectaRock.rotation.set(Math.random() * 0.6, Math.random() * Math.PI * 2, Math.random() * 0.6);
      ejectaRock.scale.set(rScale * 1.1, rScale * 0.7, rScale * 1.1);
      ejectaRock.castShadow = true;
      ejectaRock.receiveShadow = true;
      this.scene.add(ejectaRock);
      this.rocks.push({ position: new THREE.Vector3(rx, ry, rz), radius: rScale * 0.9 });
    }
  }

  /**
   * Scientific Sample exploration sites with on-board Spectrometer investigation data
   * Aligned with NGSS secondary science inquiry (Observation -> Spectral Data -> Claim)
   */
  initSamples() {
    const sampleConfigs = [
      {
        id: 'alpha',
        name: 'Sample Alpha: Unknown Layered Outcrop',
        thaiName: 'ตัวอย่าง แอลฟา: แร่ซัลเฟตไฮเดรต (Hydrated Sulfates)',
        unknownTitle: 'ตัวอย่างปริศนา ALPHA (Site Alpha Outcrop)',
        siteType: 'แหล่งตะกอนชั้นหินสีอ่อน (Light-toned Layered Outcrop)',
        x: -28,
        z: 32,
        color: 0x38bdf8,
        description: 'แร่ไฮเดรตซัลเฟต (Hydrated Sulfate เช่น Jarosite/Gypsum) หลักฐานการระเหยของน้ำเค็มสภาพกรดในยุค Hesperian',
        stemFact: 'แร่ซัลเฟตที่มีน้ำในผลึก (Hydrated Sulfates) เกิดจากการระเหยแห้งของแอ่งน้ำเค็มที่มีสภาพเป็นกรดในปลายยุคเฮสพีเรียน (Late Hesperian)',
        waterEvidence: '+++ (หลักฐานชั้นเอก: เกิดจากการระเหยแห้งของแหล่งน้ำโบราณ)',
        waterEvidenceLevel: 3,
        spectrometer: {
          hydration: 'HIGH (88% ± 4%)',
          hydrationVal: 88,
          sulfate: 'HIGH (สัญญาณแร่ซัลเฟต Fe/Mg เด่นชัด)',
          sulfateVal: 85,
          iron: 'MEDIUM (สารประกอบเหล็กออกไซด์)',
          ironVal: 52,
          silicate: 'LOW (< 25%)',
          silicateVal: 22,
          magnetism: 'LOW (< 5 nT)',
          magnetismVal: 8,
          visualTexture: 'ตะกอนหินสีสว่างซ้อนทับเป็นชั้นริ้ว (Light-toned layered sedimentary beds)'
        },
        spectralData: {
          hydrationIndex: 88,
          keyAbsorption: '1.4, 1.9 & 2.4 µm (H₂O, SO₄²⁻)',
          absorption14: 0.72,
          absorption19: 0.88,
          absorptionMetal: 0.76,
          readingText: 'ตรวจพบแถบดูดกลืนน้ำลึก 1.9 µm และซัลเฟต 2.4 µm บ่งชี้แร่ไฮเดรตซัลเฟตจากการระเหยแห้งของน้ำเค็มสภาพกรด'
        },
        inquiryQuestion: {
          prompt: 'จากแถบดูดกลืนแสงที่ 1.9 µm และ 2.4 µm ร่วมกับปริมาณน้ำในผลึก 88% สเปกตรัมนี้บ่งชี้ข้อสรุปใดเกี่ยวกับประวัติศาสตร์น้ำใน Chryse Planitia?',
          choices: [
            { text: 'ก. แร่ไฮเดรตซัลเฟต (Hydrated Sulfate เช่น Jarosite/Gypsum) ที่ตกตะกอนเมื่อแอ่งน้ำเค็มสภาพกรดระเหยแห้งในปลายยุค Hesperian' },
            { text: 'ข. หินบะซอลต์ภูเขาไฟสดใหม่ที่ไม่เคยสัมผัสน้ำหรือความชื้นเลยตลอด 4 พันล้านปี' },
            { text: 'ค. ชั้นน้ำแข็งแห้งคาร์บอนไดออกไซด์บริสุทธิ์ที่ควบแน่นจากพายุฤดูหนาว' }
          ],
          correctIndex: 0,
          explanation: 'การดูดกลืนที่ 1.9 µm เป็นเอกลักษณ์ของโมเลกุล H₂O ในผลึกแร่ซัลเฟต ยืนยันว่าในอดีตเคยมีแอ่งน้ำเค็มระเหยแห้งตกตะกอนในสภาวะกรด (เช่นเดียวกับที่ยาน Opportunity ค้นพบที่ Meridiani Planum)'
        },
        waterEvidencePoints: 3,
        options: [
          'แร่ไฮเดรตซัลเฟต (Hydrated Sulfate เช่น Jarosite หรือ Gypsum)',
          'หินบะซอลต์ภูเขาไฟที่ยังไม่ผุพัง (Unaltered Olivine Basalt)',
          'แร่เหล็กแม่เหล็กบริสุทธิ์ (Pure Magnetite Ore)',
          'ทรายควอตซ์แห้งแล้งจากพายุหมุน (Dry Quartz Dune Sand)'
        ],
        correctOption: 0,
        claimFeedback: 'ถูกต้อง! สเปกตรัมแสดงการดูดกลืนคลื่นของพันธะ H₂O และ SO₄²⁻ อย่างเด่นชัด บ่งชี้ว่าเป็นแร่ซัลเฟตที่ตกตะกอนเมื่อแหล่งน้ำเค็มสภาพกรดระเหยแห้งในปลายยุค Hesperian'
      },
      {
        id: 'beta',
        name: 'Sample Beta: Ancient Clay Beds',
        thaiName: 'ตัวอย่าง บีตา: แร่ดินเหนียวฟิลโลซิลิเกต (Phyllosilicate Clay)',
        unknownTitle: 'ตัวอย่างปริศนา BETA (Site Beta Clay Basin)',
        siteType: 'ลานหินแตกระแหงหลายเหลี่ยมโบราณ (Polygonal Mudstone Bed)',
        x: 38,
        z: 36,
        color: 0xa855f7,
        description: 'แร่ดินเหนียวฟิลโลซิลิเกต (Phyllosilicate Clay) เกิดจากการทำปฏิกิริยาระหว่างหินกับน้ำสภาพเป็นกลางเป็นเวลายาวนานในยุค Noachian',
        stemFact: 'ฟิลโลซิลิเกต (Phyllosilicates เช่น Smectite) เป็นแร่ดินเหนียวที่ต้องอาศัยน้ำในสภาวะเป็นกลาง/ด่างแช่ขังเป็นเวลานานหลายล้านปี',
        waterEvidence: '+++ (หลักฐานชั้นเอก: บ่งชี้สภาพน้ำจืดแช่ขังยาวนาน เอื้อต่อสารอินทรีย์)',
        waterEvidenceLevel: 3,
        spectrometer: {
          hydration: 'VERY HIGH (94% ± 3%)',
          hydrationVal: 94,
          sulfate: 'LOW (< 15%)',
          sulfateVal: 14,
          iron: 'MEDIUM (Al-Mg Silicate Clay)',
          ironVal: 48,
          silicate: 'HIGH (โครงสร้างซิลิเกตแบบชั้น Phyllosilicate)',
          silicateVal: 92,
          magnetism: 'LOW (< 4 nT)',
          magnetismVal: 6,
          visualTexture: 'ลานหินโคลนแตกระแหงเป็นรูปทรงหลายเหลี่ยม (Polygonal fractured mudstone)'
        },
        spectralData: {
          hydrationIndex: 94,
          keyAbsorption: '1.4, 1.9 & 2.2 µm (Al-OH / Fe-OH)',
          absorption14: 0.85,
          absorption19: 0.94,
          absorptionMetal: 0.92,
          readingText: 'ตรวจพบแถบดูดกลืนน้ำลึก 1.9 µm และแถบดูดกลืนหมู่ไฮดรอกซิลโลหะ 2.2 µm โครงสร้างผลึกดินเหนียวแบบชั้น (Smectite)'
        },
        inquiryQuestion: {
          prompt: 'แถบดูดกลืนคมชัดที่ 1.4, 1.9 และ 2.2 µm ของแร่ดินเหนียวฟิลโลซิลิเกต (Phyllosilicates) เป็นหลักฐานบ่งชี้สภาพแวดล้อมโบราณแบบใด?',
          choices: [
            { text: 'ก. เกิดจากการปะทุของลาวาแห้งแล้งอุณหภูมิสูงกว่า 1,200°C โดยปราศจากน้ำ' },
            { text: 'ข. สภาพแวดล้อมน้ำจืดแช่ขังยาวนานที่มี pH เป็นกลางในยุค Noachian ซึ่งเอื้อต่อการกำเนิดสารอินทรีย์และสิ่งมีชีวิตโบราณ' },
            { text: 'ค. ฝุ่นทรายควอตซ์ที่ถูกลมพัดพามาสะสมตัวในสภาพแห้งแล้งจัด' }
          ],
          correctIndex: 1,
          explanation: 'แร่ดินเหนียวฟิลโลซิลิเกต (Phyllosilicate Clay) ต้องอาศัยน้ำในสภาวะ pH เป็นกลาง/ด่างอ่อน แช่ขังทำปฏิกิริยากับหินเป็นเวลานับแสนถึงล้านปีในยุคโนอาเชียน (Noachian) ถือเป็นหลักฐานชิ้นสำคัญที่สุดของการมีน้ำของเหลวคงตัวยาวนาน'
        },
        waterEvidencePoints: 3,
        options: [
          'แก้วภูเขาไฟออบซิเดียนที่เย็นตัวเฉียบพลัน (Volcanic Obsidian Glass)',
          'แร่ดินเหนียวฟิลโลซิลิเกต (Phyllosilicate Clay Minerals เช่น Smectite)',
          'หินอุกกาบาตเหล็กตกค้าง (Iron-Nickel Meteorite Fragment)',
          'น้ำแข็งแห้งคาร์บอนไดออกไซด์บริสุทธิ์ (Pure Dry Ice CO₂)'
        ],
        correctOption: 1,
        claimFeedback: 'ยอดเยี่ยม! แร่ดินเหนียวฟิลโลซิลิเกต (Phyllosilicates) ต้องการน้ำจืดสภาพเป็นกลาง/ด่างแช่ขังเป็นระยะเวลานานหลายล้านปีในยุค Noachian ถือเป็นสภาพแวดล้อมที่เอื้อต่อชีวดาราศาสตร์โบราณที่สุด'
      },
      {
        id: 'gamma',
        name: 'Sample Gamma: Olivine Basalt Outcrop',
        thaiName: 'ตัวอย่าง แกมมา: หินบะซอลต์โอลิวีนบนยอดผา (Olivine Basalt)',
        unknownTitle: 'ตัวอย่างปริศนา GAMMA (Site Gamma Escarpment)',
        siteType: 'สันผาหินภูเขาไฟสีเข้มสูงชัน (Volcanic Ridge Escarpment)',
        x: -42,
        z: -45,
        color: 0x22c55e,
        description: 'หินภูเขาไฟอุดมด้วยโอลิวีน (Olivine-rich Basalt) ที่ยังคงสภาพสดใหม่ บันทึกการสิ้นสุดของยุคที่มีน้ำสู่ความแห้งแล้งในยุค Amazonian',
        stemFact: 'แร่โอลิวีนสลายตัวอย่างรวดเร็วมากเมื่อสัมผัสน้ำ การพบโอลิวีนที่ยังไม่ผุพังยืนยันว่าบริเวณนี้แห้งแล้งและหนาวจัดมานานหลายพันล้านปี',
        waterEvidence: '+ (หลักฐานเชิงลบ: หินไม่ถูกน้ำแปรสภาพ ยืนยันการเข้าสู่ยุคแห้งแล้งจัด)',
        waterEvidenceLevel: 1,
        spectrometer: {
          hydration: 'VERY LOW (< 4%)',
          hydrationVal: 4,
          sulfate: 'NONE (0%)',
          sulfateVal: 2,
          iron: 'HIGH (Fe-Pyroxene & Basaltic glass)',
          ironVal: 78,
          silicate: 'HIGH (แมกนีเซียม-เหล็กซิลิเกต Olivine)',
          silicateVal: 91,
          magnetism: 'MEDIUM (สนามแม่เหล็กพื้นผิวปานกลาง)',
          magnetismVal: 42,
          visualTexture: 'หินผลึกเนื้อแน่นสีเข้มทึบ มีเม็ดผลึกสีเขียวมะกอกแฝงอยู่ (Dark dense crystalline basalt)'
        },
        spectralData: {
          hydrationIndex: 4,
          keyAbsorption: '1.0 µm (Fe²⁺ Crystal Field) / ไร้สัญญาณน้ำ',
          absorption14: 0.05,
          absorption19: 0.04,
          absorptionMetal: 0.12,
          readingText: 'แถบดูดกลืนกว้างที่ 1.0 µm สอดคล้องกับ Fe²⁺ ในโอลิวีน ปราศจากแถบดูดกลืนของน้ำ (H₂O) หรือไฮดรอกซิล (OH)'
        },
        inquiryQuestion: {
          prompt: 'การพบแร่โอลิวีน (Olivine) ในสภาพสดใหม่ที่ไม่ผุพังบนยอดผาหินภูเขาไฟ ให้ข้อสรุปเชิงประจักษ์ใดต่อวิวัฒนาการบรรยากาศดาวอังคาร?',
          choices: [
            { text: 'ก. โอลิวีนทำปฏิกิริยากับน้ำได้เร็วมาก การที่ยังไม่ผุพังยืนยันว่าหลังยุคน้ำหลาก ดาวอังคารได้เข้าสู่ยุค Amazonian ที่แห้งแล้งจัดและไม่มีน้ำสัมผัสกับหินนี้อีกเลย' },
            { text: 'ข. เป็นหลักฐานว่าบริเวณนี้มีมหาสมุทรน้ำจืดลึกท่วมขังต่อเนื่องมาจนถึงปัจจุบัน' },
            { text: 'ค. โอลิวีนเป็นหินตะกอนที่ตกผลึกจากน้ำทะเลสาบน้ำอุ่น' }
          ],
          correctIndex: 0,
          explanation: 'โอลิวีน (Olivine) เป็นแร่ที่ทนต่อน้ำได้ต่ำมาก หากสัมผัสน้ำจะแปรสภาพเป็นเซอร์เพนทีนหรือดินเหนียวอย่างรวดเร็ว การคงอยู่ของโอลิวีนสดจึงเป็นหลักฐานเชิงประจักษ์ของการยุติลงของยุคที่มีน้ำของเหลว'
        },
        waterEvidencePoints: 3,
        options: [
          'หินบะซอลต์ภูเขาไฟอุดมด้วยโอลิวีน (Olivine-rich Basalt Outcrop)',
          'คราบเกลือระเหยแห้งโบราณ (Evaporite Salt Crust)',
          'หินปูนที่เกิดจากสิ่งมีชีวิตในทะเล (Biogenic Marine Limestone)',
          'ชั้นดินพีตอินทรีย์ดึกดำบรรพ์ (Ancient Organic Peat Layer)'
        ],
        correctOption: 0,
        claimFeedback: 'ถูกต้องตามหลักธรณีเคมี! โอลิวีน (Olivine) ทำปฏิกิริยากับน้ำได้ไวมาก การที่โอลิวีนยังคงความสดใหม่อยู่บนยอดผา พิสูจน์ว่าหลังจากยุคน้ำไหลบ่า ดาวอังคารได้เข้าสู่ยุค Amazonian ที่แห้งแล้งจัดและไม่มีน้ำสัมผัสกับหินนี้อีกเลย'
      },
      {
        id: 'delta',
        name: 'Sample Delta: Paleomagnetic Crustal Rock',
        thaiName: 'ตัวอย่าง เดลตา: หินเปลือกดาวแม่เหล็กดึกดำบรรพ์ (Paleomagnetic Crust)',
        unknownTitle: 'ตัวอย่างปริศนา DELTA (Site Delta Crustal Bedrock)',
        siteType: 'ชั้นหินเปลือกดาวโบราณ (Deep Crustal Basement Bedrock)',
        x: 36,
        z: -55,
        color: 0xf59e0b,
        description: 'ผลึกไททาโนแมกนีไทต์ในหินเปลือกดาวโบราณ เก็บรักษารอยสนามแม่เหล็กตกค้างในยุคที่แกนกลางดาวอังคารยังมีไดนาโม',
        stemFact: 'ดาวอังคารเคยมีสนามแม่เหล็กโลกปกป้องชั้นบรรยากาศเมื่อ 4 พันล้านปีก่อน เมื่อแกนกลางเย็นตัวลง ลมสุริยะจึงพัดทำลายชั้นบรรยากาศ (ยืนยันโดย NASA MAVEN)',
        waterEvidence: '++ (หลักฐานด้านวิวัฒนาการบรรยากาศ: ยืนยันว่าดาวเคยมีเกราะแม่เหล็กปกป้องน้ำและอากาศ)',
        waterEvidenceLevel: 2,
        spectrometer: {
          hydration: 'LOW (6% ± 2%)',
          hydrationVal: 6,
          sulfate: 'LOW (< 8%)',
          sulfateVal: 5,
          iron: 'VERY HIGH (ผลึกไททาโนแมกนีไทต์ Fe-Ti)',
          ironVal: 88,
          silicate: 'MEDIUM (หินเปลือกดาวโบราณ)',
          silicateVal: 55,
          magnetism: 'VERY HIGH ANOMALY (สนามแม่เหล็กตกค้างสูงผิดปกติ 142 nT)',
          magnetismVal: 96,
          visualTexture: 'หินดานโบราณเนื้อแกร่ง มีผลึกแม่เหล็กเรียงตัวตามแกนสนามแม่เหล็กโบราณ (Remanent magnetic bedrock)'
        },
        spectralData: {
          hydrationIndex: 6,
          keyAbsorption: 'สนามแม่เหล็กตกค้าง 142 nT / ไททาโนแมกนีไทต์',
          absorption14: 0.08,
          absorption19: 0.06,
          absorptionMetal: 0.22,
          readingText: 'ตรวจพบสัญญาณสนามแม่เหล็กตกค้างในเนื้อหินสูงผิดปกติ 142 nT ร่วมกับผลึกไททาโนแมกนีไทต์ (Titanomagnetite)'
        },
        inquiryQuestion: {
          prompt: 'สนามแม่เหล็กตกค้างโบราณ (Remanent Paleomagnetism) ในหินเปลือกดาว สัมพันธ์อย่างไรกับการสูญเสียน้ำและชั้นบรรยากาศของดาวอังคาร?',
          choices: [
            { text: 'ก. สนามแม่เหล็กไม่มีความเกี่ยวข้องใดๆ กับชั้นบรรยากาศหรือสภาพน้ำของดาวอังคาร' },
            { text: 'ข. เป็นหลักฐานว่าดาวอังคารเคยมีสนามแม่เหล็กไดนาโมปกป้องชั้นบรรยากาศ เมื่อแกนกลางเย็นตัวลงเกราะแม่เหล็กจึงดับสูญ ทำให้ลมสุริยะพัดทำลายบรรยากาศและน้ำจนระเหิดสู่อวกาศ' },
            { text: 'ค. บ่งชี้ว่าปัจจุบันดาวอังคารยังมีแกนกลางเหล็กเหลวไหลเวียนรุนแรงกว่าโลก' }
          ],
          correctIndex: 1,
          explanation: 'การตรวจพบสนามแม่เหล็กตกค้างในหินเปลือกดาวโบราณยืนยันว่าดาวอังคารเคยมีเกราะแม่เหล็กป้องกันลมสุริยะ เมื่อไดนาโมในแกนกลางหยุดทำงาน บรรยากาศจึงถูกลมสุริยะกัดเซาะจนความดันลดลงต่ำกว่าจุดร่วมสามของน้ำ (Water Triple Point 611 Pa) ส่งผลให้น้ำของเหลวไม่สามารถคงสภาพอยู่บนพื้นผิวได้อีก'
        },
        waterEvidencePoints: 3,
        options: [
          'หินเปลือกดาวโบราณที่มีสนามแม่เหล็กตกค้าง (Remanent Paleomagnetic Rock)',
          'ขั้วแม่เหล็กดาวอังคารในยุคปัจจุบันที่เพิ่งเกิดขึ้น (Active Modern Geomagnetic Pole)',
          'ชิ้นส่วนซากดาวเทียมที่ตกลงมา (Fallen Spacecraft Debris)',
          'หินกรวดมนแม่น้ำที่กลิ้งตัวมา (River Conglomerate)'
        ],
        correctOption: 0,
        claimFeedback: 'ยอดเยี่ยม! สนามแม่เหล็กตกค้าง (Remanent Magnetism) เป็นหลักฐานว่าดาวอังคารเคยมีกระบวนการไดนาโมในแกนกลางสร้างสนามแม่เหล็กระดับดาวเคราะห์ คอยเป็นเกราะกันลมสุริยะ เมื่อสนามแม่เหล็กนี้ดับลง บรรยากาศและน้ำจึงถูกลมสุริยะพัดพาออกสู่อวกาศ (สอดคล้องกับยาน NASA MAVEN)'
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
        unknownTitle: cfg.unknownTitle,
        siteType: cfg.siteType,
        position: new THREE.Vector3(cfg.x, y, cfg.z),
        color: cfg.color,
        description: cfg.description,
        stemFact: cfg.stemFact,
        waterEvidence: cfg.waterEvidence,
        waterEvidenceLevel: cfg.waterEvidenceLevel,
        spectrometer: cfg.spectrometer,
        spectralData: cfg.spectralData,
        inquiryQuestion: cfg.inquiryQuestion,
        waterEvidencePoints: cfg.waterEvidencePoints,
        options: cfg.options,
        correctOption: cfg.correctOption,
        claimFeedback: cfg.claimFeedback,
        group: group,
        coreMesh: coreMesh,
        collected: false,
        analyzed: false,
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
