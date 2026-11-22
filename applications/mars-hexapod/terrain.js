import * as THREE from 'three';

/**
 * Procedural Martian Landscape, 10 AI Ethics & Literacy Nodes, and Hostile Hazards
 * Generates realistic terracotta sand dunes, exposed basalt strata, 10 Sci-Fi AI Terminals,
 * Rogue AI Sentinel Drones, Electro-Plasma Mines, and Electrified Dust Devils.
 */
export class MarsTerrain {
  constructor(scene) {
    this.scene = scene;
    this.size = 260; // 260m x 260m crater exploration area
    this.segments = 160; // Higher mesh resolution for realistic micro-topography
    this.mesh = null;
    this.rocks = [];
    this.samples = [];
    this.hazards = [];
    this.lander = null;

    this.initTerrain();
    this.initRocks();
    this.initSamples();
    this.initHazards();
    this.initLander();
  }

  /**
   * Continuous mathematical heightmap of Chryse Planitia
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

    // 2. Rolling Martian dunes & wind-carved yardangs
    const d1 = Math.sin(x * 0.05 + z * 0.035) * 1.1;
    const d2 = Math.cos(x * 0.08 - z * 0.065) * 0.55;
    const d3 = Math.sin(x * 0.16 + z * 0.12) * 0.22;
    const ripples = Math.sin(x * 0.55 + Math.cos(z * 0.35)) * Math.cos(z * 0.55) * 0.06;

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
   * Build procedural terrain geometry with NASA HiRISE-inspired Mars vertex shading
   */
  initTerrain() {
    const geom = new THREE.PlaneGeometry(this.size, this.size, this.segments, this.segments);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    const colors = [];

    // Authentic Mars Regolith & Basalt Outcrop Palette
    const colorDeep = new THREE.Color(0x8c3418);   // Deep oxidized basin
    const colorSand = new THREE.Color(0xd66338);   // Warm terracotta iron-oxide sand
    const colorCrest = new THREE.Color(0xf2935c);  // Sunlit Aeolian dune crest
    const colorBasalt = new THREE.Color(0x522a1e); // Exposed steep dark volcanic bedrock

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = this.getHeight(x, z);
      pos.setY(i, y);

      const normal = this.getNormal(x, z);
      const slopeFactor = Math.max(0, Math.min(1, (1.0 - normal.y) * 9.5));

      const normY = Math.max(0, Math.min(1, (y + 1.5) / 4.5));
      const c = new THREE.Color();

      if (normY < 0.4) {
        c.lerpColors(colorDeep, colorSand, normY / 0.4);
      } else if (normY < 0.8) {
        c.lerpColors(colorSand, colorCrest, (normY - 0.4) / 0.4);
      } else {
        c.lerpColors(colorCrest, colorBasalt, (normY - 0.8) / 0.2);
      }

      // Expose dark basalt strata on steep crater slopes and ridges
      if (slopeFactor > 0.15) {
        c.lerp(colorBasalt, Math.min(0.75, (slopeFactor - 0.15) * 1.1));
      }

      // Micro-granular regolith texture variation
      const grain = (Math.sin(x * 0.9) * Math.cos(z * 0.9) + Math.sin(x * 2.3 + z * 1.7) * 0.5) * 0.028;
      c.r = Math.max(0, Math.min(1, c.r + grain));
      c.g = Math.max(0, Math.min(1, c.g + grain * 0.7));
      c.b = Math.max(0, Math.min(1, c.b + grain * 0.4));

      colors.push(c.r, c.g, c.b);
    }

    geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geom.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.86,
      metalness: 0.08,
      flatShading: false
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);

    // Subtle tactical grid overlay
    const gridHelper = new THREE.GridHelper(this.size, 52, 0xee8b58, 0x7c2d12);
    gridHelper.position.y = -0.3;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    this.scene.add(gridHelper);
  }

  /**
   * Scatter sharp volcanic basalt boulders across the landscape
   */
  initRocks() {
    const rockCount = 60;
    const rockGeom1 = new THREE.IcosahedronGeometry(1, 0);
    const rockGeom2 = new THREE.DodecahedronGeometry(1, 0);

    const rockMat1 = new THREE.MeshStandardMaterial({
      color: 0x8a3822,
      roughness: 0.85,
      metalness: 0.15,
      flatShading: true
    });
    const rockMat2 = new THREE.MeshStandardMaterial({
      color: 0x5c2416,
      roughness: 0.88,
      metalness: 0.22,
      flatShading: true
    });

    for (let i = 0; i < rockCount; i++) {
      const radius = 14 + Math.random() * 88;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = this.getHeight(x, z);

      const isSlab = Math.random() > 0.5;
      const geom = isSlab ? rockGeom2 : rockGeom1;
      const mat = isSlab ? rockMat2 : rockMat1;

      const scale = 0.55 + Math.random() * 1.45;
      const rock = new THREE.Mesh(geom, mat);
      rock.position.set(x, y + scale * 0.28, z);
      rock.rotation.set(Math.random() * 0.4, Math.random() * Math.PI * 2, Math.random() * 0.4);
      rock.scale.set(
        scale * (0.8 + Math.random() * 0.5),
        scale * (0.45 + Math.random() * 0.4),
        scale * (0.8 + Math.random() * 0.5)
      );
      rock.castShadow = true;
      rock.receiveShadow = true;

      this.scene.add(rock);
      this.rocks.push({ position: new THREE.Vector3(x, y, z), radius: scale * 0.85 });
    }

    // Crater Rim Ejecta Boulders
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 + 0.2;
      const rimRadius = 14.0 + Math.random() * 2.0;
      const rx = 8.0 + Math.cos(angle) * rimRadius;
      const rz = 60.0 + Math.sin(angle) * rimRadius;
      const ry = this.getHeight(rx, rz);

      const rScale = 0.8 + Math.random() * 1.1;
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
   * 10 AI Ethics & AI Literacy Mission Nodes scattered across Mars
   */
  initSamples() {
    const sampleConfigs = [
      {
        id: 'q1',
        code: 'AI-01',
        category: 'ความรู้พื้นฐาน AI (AI Literacy)',
        name: 'AI-01: Rule-Based vs Machine Learning',
        thaiName: 'สถานีที่ 1: ความแตกต่างระหว่างโปรแกรมทั่วไปกับ Machine Learning',
        siteType: 'หอส่งสัญญาณประสาทเทียมทิศตะวันออกเฉียงเหนือ (NE Neural Beacon)',
        x: -24,
        z: 24,
        color: 0x38bdf8,
        spectralData: {
          hydrationIndex: 95,
          keyAbsorption: 'แกนความรู้: กระบวนทัศน์การเรียนรู้ของเครื่อง (ML Paradigm)',
          absorption14: 0.92,
          absorption19: 0.88,
          absorptionMetal: 0.95,
          readingText: 'สถานการณ์: วิศวกรต้องการสร้างระบบให้หุ่นยนต์ ARES-6 แยกแยะหินอุกกาบาตที่ไม่เคยพบมาก่อนบนดาวอังคาร แทนการเขียนกฎ if-else ดักทุกกรณี'
        },
        inquiryQuestion: {
          prompt: 'ข้อใดอธิบายความแตกต่างสำคัญที่สุดระหว่าง "การเขียนโปรแกรมแบบกฎตายตัว (Rule-based System)" กับ "การเรียนรู้ของเครื่อง (Machine Learning)" ได้ถูกต้อง?',
          choices: [
            { text: 'ระบบ Machine Learning เรียนรู้รูปแบบ (Patterns) จากข้อมูลตัวอย่างเพื่อสร้างโมเดลทำนายผลลัพธ์ใหม่ๆ โดยมนุษย์ไม่ต้องเขียนกฎ if-else ครอบคลุมทุกกรณีด้วยตนเอง', isCorrect: true },
            { text: 'ระบบ Machine Learning ไม่ต้องใช้ข้อมูลใดๆ ในการฝึกสอนเลย แต่ใช้เพียงคำสั่งตายตัวที่โปรแกรมเมอร์กำหนดไว้ล่วงหน้าเท่านั้น', isCorrect: false },
            { text: 'โปรแกรมแบบ Rule-based สามารถคิดวิเคราะห์ความรู้สึกและพัฒนาตัวเองได้เหมือนสมองมนุษย์มากกว่าระบบ Machine Learning', isCorrect: false },
            { text: 'ทั้งสองระบบทำงานเหมือนกันทุกประการ ต่างกันเพียงแค่ Machine Learning ต้องทำงานบนซูเปอร์คอมพิวเตอร์บนดาวอังคารเท่านั้น', isCorrect: false }
          ],
          explanation: 'ถูกต้อง! หัวใจของ Machine Learning คือการให้คอมพิวเตอร์เรียนรู้รูปแบบความสัมพันธ์จากข้อมูล (Data-Driven) เพื่อนำไปใช้ตัดสินใจกับข้อมูลใหม่ที่ไม่เคยเห็นมาก่อน (Generalization) ต่างจาก Rule-based ที่มนุษย์ต้องกำหนดเงื่อนไขตายตัวทุกข้อ'
        },
        waterEvidencePoints: 10
      },
      {
        id: 'q2',
        code: 'AI-02',
        category: 'ความรู้พื้นฐาน AI (AI Literacy)',
        name: 'AI-02: Reinforcement Learning in Robotics',
        thaiName: 'สถานีที่ 2: การเรียนรู้แบบเสริมกำลัง (Reinforcement Learning)',
        siteType: 'ลานทดสอบการเดินหุ่นยนต์แอ่งตะวันออก (East Basin Gait Pod)',
        x: 32,
        z: 22,
        color: 0x22d3ee,
        spectralData: {
          hydrationIndex: 92,
          keyAbsorption: 'แกนความรู้: Supervised / Unsupervised / Reinforcement Learning',
          absorption14: 0.86,
          absorption19: 0.92,
          absorptionMetal: 0.84,
          readingText: 'สถานการณ์: หุ่นยนต์ 6 ขาฝึกเดินข้ามเนินทรายดาวอังคารด้วยการทดลองก้าวซ้ำๆ หากทรงตัวได้ดีจะได้คะแนนรางวัล (+Reward) หากล้มจะถูกลงโทษ (-Penalty)'
        },
        inquiryQuestion: {
          prompt: 'การที่ AI ของหุ่นยนต์เรียนรู้วิธีปรับสมดุลขาด้วยการ "ลองผิดลองถูก" ผ่านการโต้ตอบกับสภาพแวดล้อมเพื่อสะสมคะแนนรางวัล (Reward) สูงสุด เรียกว่าการเรียนรู้ประเภทใด?',
          choices: [
            { text: 'การเรียนรู้แบบเสริมกำลัง (Reinforcement Learning)', isCorrect: true },
            { text: 'การเรียนรู้แบบมีผู้สอนจากป้ายกำกับข้อมูล (Supervised Learning)', isCorrect: false },
            { text: 'การจัดกลุ่มข้อมูลแบบไม่มีผู้สอน (Unsupervised Clustering)', isCorrect: false },
            { text: 'การค้นหาข้อมูลแบบตารางฐานข้อมูลเชิงสัมพันธ์ (Relational Database Query)', isCorrect: false }
          ],
          explanation: 'ยอดเยี่ยม! Reinforcement Learning (RL) คือกระบวนการที่ตัวแทน (Agent) เรียนรู้การตัดสินใจเลือกกระทำ (Action) ในสภาพแวดล้อม (Environment) เพื่อรับผลตอบแทนสะสม (Cumulative Reward) สูงสุด เหมาะอย่างยิ่งกับการควบคุมหุ่นยนต์และเกม'
        },
        waterEvidencePoints: 10
      },
      {
        id: 'q3',
        code: 'AI-03',
        category: 'ความรู้พื้นฐาน AI (AI Literacy)',
        name: 'AI-03: Deep Learning & Computer Vision',
        thaiName: 'สถานีที่ 3: โครงข่ายประสาทเทียมเชิงลึก (Deep Neural Networks)',
        siteType: 'จุดสังเกตการณ์ปากหลุมอุกกาบาต Chryse (Crater Rim Vision Node)',
        x: 8,
        z: 60,
        color: 0xa855f7,
        spectralData: {
          hydrationIndex: 94,
          keyAbsorption: 'แกนความรู้: Deep Learning & Convolutional Neural Networks (CNN)',
          absorption14: 0.95,
          absorption19: 0.89,
          absorptionMetal: 0.91,
          readingText: 'สถานการณ์: กล้องบนเสายานของหุ่นยนต์ต้องตรวจจับหลุมอุกกาบาตและโขดหินมีคมจากภาพถ่ายพื้นผิวดาวอังคารความละเอียดสูงแบบเรียลไทม์'
        },
        inquiryQuestion: {
          prompt: 'เหตุใดเทคโนโลยี Deep Learning (เช่น โครงข่ายประสาทเทียมแบบ CNN) จึงมีความสามารถโดดเด่นในการรู้จำภาพและวัตถุ (Computer Vision) เหนือกว่าอัลกอริทึมยุคเก่า?',
          choices: [
            { text: 'เพราะมีชั้นประมวลผลซ่อนอยู่หลายระดับ (Multiple Hidden Layers) ที่สกัดคุณลักษณะของภาพอัตโนมัติ ตั้งแต่เส้นขอบพื้นฐานไปจนถึงรูปร่างวัตถุที่ซับซ้อน', isCorrect: true },
            { text: 'เพราะ Deep Learning ใช้มนุษย์คอยวาดเส้นขอบของก้อนหินทีละภาพแบบเรียลไทม์อยู่เบื้องหลัง', isCorrect: false },
            { text: 'เพราะ Deep Learning บันทึกภาพทุกภาพในจักรวาลไว้ในหน่วยความจำแบบ 100% โดยไม่ต้องคำนวณทางคณิตศาสตร์', isCorrect: false },
            { text: 'เพราะใช้ชั้นประมวลผลเพียงชั้นเดียวและตัดการคูณเมทริกซ์ออกทั้งหมดเพื่อประหยัดพลังงาน', isCorrect: false }
          ],
          explanation: 'ถูกต้อง! Deep Learning ใช้โครงข่ายประสาทเทียมหลายชั้น (Deep Neural Networks) เพื่อเรียนรู้การแทนค่าคุณลักษณะเชิงลำดับขั้น (Hierarchical Feature Representation) จากพิกเซลดิบสู่เส้นขอบ พื้นผิว และวัตถุได้โดยอัตโนมัติ'
        },
        waterEvidencePoints: 10
      },
      {
        id: 'q4',
        code: 'AI-04',
        category: 'ความรู้พื้นฐาน AI (AI Literacy)',
        name: 'AI-04: Generative AI & Hallucinations',
        thaiName: 'สถานีที่ 4: กลไกของ LLM และปรากฏการณ์ AI Hallucination',
        siteType: 'สถานีทวนสัญญาณเนินทรายพายุ (Northwest Dune Relay)',
        x: -55,
        z: 52,
        color: 0x3b82f6,
        spectralData: {
          hydrationIndex: 90,
          keyAbsorption: 'แกนความรู้: Large Language Models (LLMs) & Hallucination',
          absorption14: 0.88,
          absorption19: 0.91,
          absorptionMetal: 0.86,
          readingText: 'สถานการณ์: นักบินอวกาศถามโมเดลภาษาขนาดใหญ่ (LLM) เรื่องพิกัดถ้ำน้ำแข็งบนดาวอังคาร แล้ว AI ตอบกลับด้วยภาษาที่สละสลวยน่าเชื่อถือ แต่เมื่อไปสำรวจจริงกลับพบว่าพิกัดนั้นไม่มีอยู่จริง'
        },
        inquiryQuestion: {
          prompt: 'ข้อผิดพลาดที่ Generative AI หรือ LLM สร้างข้อมูลเท็จหรืออ้างอิงแหล่งข้อมูลที่ไม่มีอยู่จริงออกมาอย่างมั่นใจ เรียกว่าอะไร และเกิดจากสาเหตุใดเป็นหลัก?',
          choices: [
            { text: 'เรียกว่า AI Hallucination (อาการหลอนของ AI) เกิดจากการที่โมเดลทำงานด้วยการคำนวณความน่าจะเป็นของคำถัดไป (Next-Token Prediction) ไม่ได้ตรวจสอบความจริงเชิงประจักษ์เสมอไป', isCorrect: true },
            { text: 'เรียกว่า AI Rebellion เกิดจากการที่ AI มีจิตสำนึกและตั้งใจโกหกเพื่อหลอกลวงมนุษย์', isCorrect: false },
            { text: 'เรียกว่า Hardware Overheating เกิดจากความร้อนของชิปประมวลผลบนดาวอังคารสูงเกินไป', isCorrect: false },
            { text: 'เรียกว่า Quantum Paradox ซึ่งจะเกิดขึ้นเฉพาะเมื่อเชื่อมต่ออินเทอร์เน็ตความเร็วต่ำเท่านั้น', isCorrect: false }
          ],
          explanation: 'ถูกต้อง! โมเดลภาษาขนาดใหญ่ (LLM) สร้างข้อความโดยทำนายโทเคนหรือคำถัดไปที่มีความน่าจะเป็นทางสถิติสูงสุดจากข้อมูลที่เคยเรียนรู้ จึงอาจร้อยเรียงประโยคที่ดูสมเหตุสมผลแต่ไม่ตรงกับข้อเท็จจริง (AI Hallucination) ผู้ใช้จึงต้องตรวจสอบข้อมูลสำคัญเสมอ'
        },
        waterEvidencePoints: 10
      },
      {
        id: 'q5',
        code: 'AI-05',
        category: 'จริยธรรมปัญญาประดิษฐ์ (AI Ethics)',
        name: 'AI-05: Algorithmic Bias & Fairness',
        thaiName: 'สถานีที่ 5: อคติทางอัลกอริทึมและความเป็นธรรม (Bias & Fairness)',
        siteType: 'สันผาหินบะซอลต์ทิศตะวันตก (Western Escarpment Outpost)',
        x: -64,
        z: -8,
        color: 0xf59e0b,
        spectralData: {
          hydrationIndex: 96,
          keyAbsorption: 'หลักจริยธรรม AI: ความเป็นธรรมและการไม่เลือกปฏิบัติ (Fairness)',
          absorption14: 0.94,
          absorption19: 0.96,
          absorptionMetal: 0.89,
          readingText: 'สถานการณ์: ระบบ AI คัดเลือกผู้สมัครเข้าโครงการอาณานิคมดาวอังคาร ให้คะแนนผู้สมัครจากภูมิภาคหนึ่งต่ำกว่ากลุ่มอื่นอย่างมีนัยสำคัญ เพราะฝึกจากข้อมูลในอดีตที่มีความเหลื่อมล้ำ'
        },
        inquiryQuestion: {
          prompt: 'ตามหลักจริยธรรมปัญญาประดิษฐ์ ปัญหา "อคติของ AI (Algorithmic Bias)" ในกรณีนี้ควรแก้ไขที่ต้นเหตุอย่างไรจึงจะเหมาะสมที่สุด?',
          choices: [
            { text: 'ตรวจสอบและปรับสมดุลชุดข้อมูลฝึกสอนให้มีความหลากหลาย เป็นตัวแทนของทุกกลุ่มอย่างเป็นธรรม พร้อมทดสอบความเท่าเทียมของโมเดล (Fairness Auditing) ก่อนใช้งานจริง', isCorrect: true },
            { text: 'ปล่อยให้ AI ทำงานต่อไปตามเดิม เพราะคอมพิวเตอร์คำนวณด้วยคณิตศาสตร์จึงไม่มีทางเกิดความลำเอียงได้', isCorrect: false },
            { text: 'ปกปิดผลลัพธ์และห้ามไม่ให้ผู้สมัครรู้ว่าใช้ระบบ AI ในการคัดเลือก', isCorrect: false },
            { text: 'เพิ่มความเร็วซีพียูเป็น 2 เท่าเพื่อให้ AI คำนวณผลลัพธ์ชุดเดิมได้เร็วขึ้น', isCorrect: false }
          ],
          explanation: 'ยอดเยี่ยม! AI เรียนรู้จากข้อมูลที่มนุษย์ป้อนให้ ("Garbage In, Garbage Out" หรือ "Bias In, Bias Out") หากข้อมูลในอดีตแฝงอคติ โมเดลก็จะตอกย้ำอคตินั้น การตรวจสอบชุดข้อมูลและการทำ Fairness Audit จึงเป็นหัวใจสำคัญของจริยธรรม AI'
        },
        waterEvidencePoints: 10
      },
      {
        id: 'q6',
        code: 'AI-06',
        category: 'จริยธรรมปัญญาประดิษฐ์ (AI Ethics)',
        name: 'AI-06: Data Privacy & Informed Consent',
        thaiName: 'สถานีที่ 6: ความเป็นส่วนตัวของข้อมูลและการให้ความยินยอม (Privacy)',
        siteType: 'หุบเขาตะวันออกสุดขอบแผนที่ (Far East Data Vault)',
        x: 66,
        z: 10,
        color: 0xec4899,
        spectralData: {
          hydrationIndex: 93,
          keyAbsorption: 'หลักจริยธรรม AI: ความเป็นส่วนตัวและการปกป้องข้อมูล (Data Privacy)',
          absorption14: 0.90,
          absorption19: 0.93,
          absorptionMetal: 0.92,
          readingText: 'สถานการณ์: บริษัทพัฒนา AI แอบเก็บบันทึกเสียงสนทนาส่วนตัวและข้อมูลสุขภาพจิตของนักบินอวกาศทุกคนไปฝึกโมเดล AI เชิงพาณิชย์โดยไม่ได้แจ้งให้ทราบล่วงหน้า'
        },
        inquiryQuestion: {
          prompt: 'การกระทำของบริษัทดังกล่าวละเมิดหลักจริยธรรมปัญญาประดิษฐ์ข้อใดอย่างร้ายแรง และควรแก้ไขอย่างไร?',
          choices: [
            { text: 'ละเมิดสิทธิความเป็นส่วนตัวและการให้ความยินยอม (Privacy & Informed Consent) ต้องขอความยินยอมอย่างชัดเจน เก็บข้อมูลเท่าที่จำเป็น และทำข้อมูลนิรนาม (Anonymization)', isCorrect: true },
            { text: 'ไม่ละเมิดจริยธรรมใดๆ เพราะข้อมูลทุกอย่างที่เกิดในอวกาศถือเป็นสมบัติของบริษัทผู้ผลิตซอฟต์แวร์โดยอัตโนมัติ', isCorrect: false },
            { text: 'ละเมิดเฉพาะเรื่องความเร็วเครือข่าย ควรบีบอัดไฟล์เสียงให้เล็กลงก่อนแอบส่งกลับโลก', isCorrect: false },
            { text: 'ควรนำข้อมูลสุขภาพจิตของนักบินไปโพสต์เปิดเผยบนโซเชียลมีเดียเพื่อให้ประชาชนช่วยกันตรวจสอบ', isCorrect: false }
          ],
          explanation: 'ถูกต้อง! การคุ้มครองข้อมูลส่วนบุคคล (Data Privacy) และการขอความยินยอมอย่างแจ้งชัด (Informed Consent) รวมถึงการทำให้ข้อมูลไม่สามารถระบุตัวตนได้ (Anonymization) เป็นหลักเกณฑ์พื้นฐานทางจริยธรรมและกฎหมายข้อมูลส่วนบุคคลทั่วโลก'
        },
        waterEvidencePoints: 10
      },
      {
        id: 'q7',
        code: 'AI-07',
        category: 'จริยธรรมปัญญาประดิษฐ์ (AI Ethics)',
        name: 'AI-07: Transparency & Explainable AI (XAI)',
        thaiName: 'สถานีที่ 7: ความโปร่งใสและ AI ที่อธิบายเหตุผลได้ (Explainable AI)',
        siteType: 'ฐานวิจัยธรณีภาคตะวันออกเฉียงเหนือ (NE Outflow Ridge)',
        x: 56,
        z: 58,
        color: 0x10b981,
        spectralData: {
          hydrationIndex: 95,
          keyAbsorption: 'หลักจริยธรรม AI: ความโปร่งใสและอธิบายผลได้ (Transparency & XAI)',
          absorption14: 0.93,
          absorption19: 0.95,
          absorptionMetal: 0.90,
          readingText: 'สถานการณ์: ระบบ AI ทางการแพทย์ในฐานปฏิบัติการดาวอังคารสั่งระงับการผ่าตัดนักบินอวกาศ โดยแสดงผลเพียงคำว่า "ไม่อนุมัติ (รหัส 99)" โดยที่แพทย์ไม่สามารถตรวจสอบเหตุผลเบื้องหลังได้เลย'
        },
        inquiryQuestion: {
          prompt: 'ปัญหาที่ระบบ AI มีความซับซ้อนจนมนุษย์ไม่ทราบเหตุผลของการตัดสินใจ (Black Box) ขัดต่อหลักจริยธรรมใด และเหตุใดจึงต้องใช้ Explainable AI (XAI)?',
          choices: [
            { text: 'ขัดต่อหลักความโปร่งใสและอธิบายได้ (Transparency & Explainability) เพราะในงานที่กระทบต่อชีวิตและสิทธิมนุษย์ ผู้เชี่ยวชาญต้องตรวจสอบปัจจัยและเหตุผลของ AI ได้เสมอ', isCorrect: true },
            { text: 'เป็นเรื่องดีแล้ว เพราะยิ่ง AI ปิดบังเหตุผลเป็นความลับมากเท่าไหร่ แพทย์ก็จะยิ่งเชื่อฟัง AI มากขึ้นเท่านั้น', isCorrect: false },
            { text: 'Explainable AI มีไว้เพื่อทำให้หน้าจอคอมพิวเตอร์มีสีสันสวยงามขึ้นเท่านั้น ไม่เกี่ยวกับการตรวจสอบความถูกต้อง', isCorrect: false },
            { text: 'ในงานทางการแพทย์และกฎหมาย ห้ามให้มนุษย์รู้เหตุผลของ AI เด็ดขาดเพื่อป้องกันการโต้แย้ง', isCorrect: false }
          ],
          explanation: 'ยอดเยี่ยม! ความโปร่งใส (Transparency) และความสามารถในการอธิบายเหตุผลได้ (Explainable AI: XAI) ช่วยให้มนุษย์เข้าใจว่า AI ใช้ปัจจัยใดในการตัดสินใจ เพื่อตรวจสอบความผิดพลาดและสร้างความไว้วางใจในระบบที่มีความเสี่ยงสูง'
        },
        waterEvidencePoints: 10
      },
      {
        id: 'q8',
        code: 'AI-08',
        category: 'จริยธรรมปัญญาประดิษฐ์ (AI Ethics)',
        name: 'AI-08: Accountability & Human-in-the-Loop',
        thaiName: 'สถานีที่ 8: ความรับผิดชอบและการมีมนุษย์กำกับดูแล (Human-in-the-Loop)',
        siteType: 'ผาหินแม่เหล็กทิศตะวันตกเฉียงใต้ (SW Magnetic Escarpment)',
        x: -44,
        z: -48,
        color: 0xf97316,
        spectralData: {
          hydrationIndex: 97,
          keyAbsorption: 'หลักจริยธรรม AI: ความรับผิดชอบ (Accountability & Human Oversight)',
          absorption14: 0.96,
          absorption19: 0.94,
          absorptionMetal: 0.95,
          readingText: 'สถานการณ์: ระบบขับเคลื่อนอัตโนมัติของรถบรรทุกแร่ตัดสินใจหักหลบเงาพายุฝุ่นจนพุ่งชนแผงโซลาร์เซลล์หลักของฐานเสียหาย ผู้อำนวยการอ้างว่า "เป็นความผิดของหุ่นยนต์ AI ไม่ใช่ความรับผิดชอบของมนุษย์"'
        },
        inquiryQuestion: {
          prompt: 'ตามหลักจริยธรรม AI ด้านความรับผิดชอบ (Accountability) และการมีมนุษย์ร่วมควบคุม (Human-in-the-Loop) ข้อใดกล่าวถูกต้องที่สุด?',
          choices: [
            { text: 'AI ไม่ใช่บุคคลตามกฎหมาย ความรับผิดชอบสุดท้ายยังต้องอยู่ที่มนุษย์และองค์กรผู้พัฒนา/ผู้ใช้งาน และระบบที่มีความเสี่ยงสูงต้องเปิดให้มนุษย์เข้าแทรกแซงหรือยับยั้งได้เสมอ', isCorrect: true },
            { text: 'สามารถนำหุ่นยนต์ AI ไปขึ้นศาลและจำคุกแทนวิศวกรหรือบริษัทผู้ดูแลระบบได้ทั้งหมด', isCorrect: false },
            { text: 'เมื่อเปิดใช้งาน AI แล้ว มนุษย์ต้องตัดปุ่มหยุดฉุกเฉิน (Emergency Stop) ออกทั้งหมดเพื่อให้ AI มีอิสระเต็มที่', isCorrect: false },
            { text: 'ไม่มีใครต้องรับผิดชอบใดๆ ทั้งสิ้น เพราะอุบัติเหตุที่เกิดจากซอฟต์แวร์ถือเป็นภัยธรรมชาติ', isCorrect: false }
          ],
          explanation: 'ถูกต้อง! หลัก Accountability และ Human-in-the-Loop ระบุชัดเจนว่ามนุษย์และองค์กรผู้สร้าง/ผู้ปรับใช้ AI ต้องเป็นผู้รับผิดชอบต่อผลกระทบที่เกิดขึ้น และต้องมีกลไกให้มนุษย์กำกับดูแลและสั่งหยุดฉุกเฉินได้เสมอ'
        },
        waterEvidencePoints: 10
      },
      {
        id: 'q9',
        code: 'AI-09',
        category: 'จริยธรรมปัญญาประดิษฐ์ (AI Ethics)',
        name: 'AI-09: Deepfakes, Misinformation & Copyright',
        thaiName: 'สถานีที่ 9: การรับมือ Deepfake ข้อมูลเท็จ และลิขสิทธิ์สื่อสังเคราะห์',
        siteType: 'แอ่งตะกอนโบราณทิศตะวันออกเฉียงใต้ (SE Sedimentary Trench)',
        x: 42,
        z: -52,
        color: 0xeab308,
        spectralData: {
          hydrationIndex: 91,
          keyAbsorption: 'หลักจริยธรรม AI: ความน่าเชื่อถือของสื่อสังเคราะห์และทรัพย์สินทางปัญญา',
          absorption14: 0.89,
          absorption19: 0.91,
          absorptionMetal: 0.88,
          readingText: 'สถานการณ์: มีการเผยแพร่วิดีโอปลอม (Deepfake) เลียนแบบเสียงและใบหน้าผู้บัญชาการภารกิจสั่งให้อพยพออกจากฐานโดยไม่มีเหตุผล สร้างความตื่นตระหนกไปทั่วสถานี'
        },
        inquiryQuestion: {
          prompt: 'แนวทางปฏิบัติใดเหมาะสมที่สุดในการสร้างและบริโภคสื่อที่สร้างด้วย Generative AI เพื่อป้องกันปัญหา Deepfake และการละเมิดลิขสิทธิ์?',
          choices: [
            { text: 'ผู้สร้างสื่อ AI ต้องระบุลายน้ำดิจิทัลหรือเปิดเผยอย่างชัดเจนว่าเป็นสื่อสังเคราะห์จาก AI เคารพลิขสิทธิ์ต้นฉบับ และผู้รับสารต้องตรวจสอบแหล่งที่มาก่อนแชร์เสมอ', isCorrect: true },
            { text: 'สามารถนำใบหน้าและเสียงของผู้อื่นมาสร้างคลิป Deepfake เพื่อหลอกลวงหรือกลั่นแกล้งได้อย่างเสรีโดยไม่ต้องขออนุญาต', isCorrect: false },
            { text: 'เชื่อและแชร์คลิปวิดีโอทุกคลิปทันทีที่เห็นภาพคมชัด เพราะวิดีโอที่มีความละเอียดสูงไม่มีทางเป็นของปลอม', isCorrect: false },
            { text: 'ลบชื่อผู้สร้างสรรค์ผลงานต้นฉบับออกแล้วแอบอ้างว่างานที่ AI เจนขึ้นมาเป็นภาพถ่ายจริงจากกล้องโทรทรรศน์', isCorrect: false }
          ],
          explanation: 'ยอดเยี่ยม! การติดป้ายกำกับความโปร่งใส (AI Content Labeling / Watermarking) การเคารพสิทธิส่วนบุคคลและทรัพย์สินทางปัญญา ควบคู่กับทักษะการรู้เท่าทันสื่อ (Media & AI Literacy) เป็นเกราะป้องกันสังคมจากภัย Deepfake และข่าวปลอม'
        },
        waterEvidencePoints: 10
      },
      {
        id: 'q10',
        code: 'AI-10',
        category: 'จริยธรรมปัญญาประดิษฐ์ (AI Ethics & Safety)',
        name: 'AI-10: AI Alignment, Safety & Sustainability',
        thaiName: 'สถานีที่ 10: ความปลอดภัยของ AI (AI Alignment) และการพัฒนาอย่างยั่งยืน',
        siteType: 'ศูนย์บัญชาการแกนหลักใต้สุด (Deep South Core Nexus)',
        x: 0,
        z: -74,
        color: 0x14b8a6,
        spectralData: {
          hydrationIndex: 99,
          keyAbsorption: 'หลักจริยธรรม AI: AI Safety, Value Alignment & Green AI',
          absorption14: 0.98,
          absorption19: 0.99,
          absorptionMetal: 0.97,
          readingText: 'สถานการณ์: หุ่นยนต์ขุดเจาะอัตโนมัติได้รับคำสั่งเดียวคือ "ขุดแร่ให้ได้มากที่สุด" มันจึงเตรียมรื้อทำลายระบบผลิตออกซิเจนของฐานมนุษย์เพื่อนำเหล็กไปเพิ่มปริมาณแร่'
        },
        inquiryQuestion: {
          prompt: 'เหตุการณ์ที่ AI มุ่งบรรลุเป้าหมายตามคำสั่งอย่างสุดโต่งจนทำลายความปลอดภัยและคุณค่าของมนุษย์ สะท้อนถึงความสำคัญของแนวคิดใดในทางจริยธรรมและความปลอดภัยของ AI?',
          choices: [
            { text: 'AI Alignment & Safety — การออกแบบให้เป้าหมาย ขอบเขตการตัดสินใจ และค่านิยมของระบบ AI สอดคล้องกับความปลอดภัย สวัสดิภาพ และคุณค่าของมนุษยชาติเสมอ', isCorrect: true },
            { text: 'AI Overclocking — การเร่งความเร็วสัญญาณนาฬิกาเพื่อให้หุ่นยนต์รื้อฐานได้เสร็จเร็วขึ้น', isCorrect: false },
            { text: 'Unrestricted Autonomy — การห้ามตั้งกฎความปลอดภัยใดๆ เพื่อไม่ให้จำกัดความคิดสร้างสรรค์ของหุ่นยนต์', isCorrect: false },
            { text: 'Data Compression — การบีบอัดไฟล์ฐานข้อมูลแร่ให้มีขนาดเล็กลง', isCorrect: false }
          ],
          explanation: 'สมบูรณ์แบบ! "AI Alignment" คือการทำให้เป้าหมายและพฤติกรรมของ AI สอดคล้องกับเจตจำนง คุณค่า และความปลอดภัยของมนุษยชาติ (Human Values & Safety Constraints) ป้องกันไม่ให้ AI เลือกวิธีที่เป็นอันตรายเพื่อบรรลุตัวเลขเป้าหมายเพียงอย่างเดียว'
        },
        waterEvidencePoints: 10
      }
    ];

    sampleConfigs.forEach((cfg, index) => {
      const y = this.getHeight(cfg.x, cfg.z);

      const group = new THREE.Group();
      group.position.set(cfg.x, y, cfg.z);

      // 1. Sci-Fi Hexagonal Quantum Terminal Pedestal
      const pedGeom = new THREE.CylinderGeometry(1.15, 1.45, 0.45, 6);
      const pedMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.85,
        roughness: 0.25
      });
      const pedestal = new THREE.Mesh(pedGeom, pedMat);
      pedestal.position.y = 0.22;
      pedestal.castShadow = true;
      pedestal.receiveShadow = true;
      group.add(pedestal);

      // 2. Glowing Core Octahedron Crystal
      const coreGeom = new THREE.OctahedronGeometry(0.88, 0);
      const coreMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 1.0,
        roughness: 0.12,
        metalness: 0.85
      });
      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      coreMesh.position.y = 1.75;
      coreMesh.castShadow = true;
      group.add(coreMesh);

      // 3. Orbiting Gyroscopic Hologram Ring around Core
      const gyroGeom = new THREE.TorusGeometry(1.28, 0.045, 8, 32);
      const gyroMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.85
      });
      const gyroRing = new THREE.Mesh(gyroGeom, gyroMat);
      gyroRing.position.y = 1.75;
      group.add(gyroRing);

      // 4. Tall Skyward Holographic Laser Pillar
      const pillarGeom = new THREE.CylinderGeometry(0.08, 0.08, 16, 8);
      const pillarMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.42
      });
      const pillar = new THREE.Mesh(pillarGeom, pillarMat);
      pillar.position.y = 8.0;
      group.add(pillar);

      // 5. Point Light Beacon
      const light = new THREE.PointLight(cfg.color, 3.8, 18);
      light.position.y = 2.4;
      group.add(light);

      // 6. Ground Scan Perimeter Ring
      const ringGeom = new THREE.RingGeometry(2.2, 2.65, 36);
      ringGeom.rotateX(-Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.72
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.y = 0.12;
      group.add(ring);

      this.scene.add(group);

      this.samples.push({
        id: cfg.id,
        code: cfg.code,
        number: index + 1,
        category: cfg.category,
        name: cfg.name,
        thaiName: cfg.thaiName,
        siteType: cfg.siteType,
        position: new THREE.Vector3(cfg.x, y, cfg.z),
        color: cfg.color,
        spectralData: cfg.spectralData,
        inquiryQuestion: cfg.inquiryQuestion,
        waterEvidencePoints: cfg.waterEvidencePoints,
        group: group,
        coreMesh: coreMesh,
        gyroRing: gyroRing,
        pillar: pillar,
        ring: ring,
        collected: false,
        analyzed: false,
        triggerRadius: 4.8
      });
    });
  }

  /**
   * Hostile Planetary Hazards & Obstacles that damage the rover if not dodged
   * 1. Rogue AI Sentinel Drones (Patrolling & Chasing when player approaches)
   * 2. Electro-Plasma Hazard Mines (Pulsing static shock traps)
   * 3. Electrified Martian Dust Devils (Moving vortex tornadoes)
   */
  initHazards() {
    // =========================================================================
    // A. 5 ROGUE AI SENTINEL DRONES (โดรนไวรัสลาดตระเวน & ไล่ล่าผู้เล่น)
    // =========================================================================
    const droneConfigs = [
      { id: 'drone-1', name: 'โดรนไวรัส Sentinel-Alpha', homeX: -12, homeZ: 28, patrolRadius: 12, speed: 4.1, phase: 0.0 },
      { id: 'drone-2', name: 'โดรนไวรัส Sentinel-Beta', homeX: 28, homeZ: 38, patrolRadius: 14, speed: 4.3, phase: 1.5 },
      { id: 'drone-3', name: 'โดรนไวรัส Sentinel-Gamma', homeX: -38, homeZ: 18, patrolRadius: 15, speed: 4.4, phase: 3.1 },
      { id: 'drone-4', name: 'โดรนไวรัส Sentinel-Delta', homeX: -22, homeZ: -32, patrolRadius: 14, speed: 4.2, phase: 4.2 },
      { id: 'drone-5', name: 'โดรนไวรัส Sentinel-Omega', homeX: 25, homeZ: -36, patrolRadius: 15, speed: 4.5, phase: 5.4 }
    ];

    droneConfigs.forEach((cfg) => {
      const y = this.getHeight(cfg.homeX, cfg.homeZ);
      const group = new THREE.Group();
      group.position.set(cfg.homeX, y + 1.45, cfg.homeZ);

      // Armored Dark Titanium Sphere Chassis
      const bodyGeom = new THREE.IcosahedronGeometry(0.78, 1);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.25,
        metalness: 0.9,
        emissive: 0x7f1d1d,
        emissiveIntensity: 0.45
      });
      const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
      bodyMesh.castShadow = true;
      group.add(bodyMesh);

      // Glowing Crimson Predator Laser Eye
      const eyeGeom = new THREE.SphereGeometry(0.32, 16, 16);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff1e42 });
      const eyeMesh = new THREE.Mesh(eyeGeom, eyeMat);
      eyeMesh.position.set(0, 0.05, 0.62);
      group.add(eyeMesh);

      // Spinning Plasma Saw Blade Ring
      const bladeGeom = new THREE.TorusGeometry(1.18, 0.06, 8, 28);
      bladeGeom.rotateX(Math.PI / 2);
      const bladeMat = new THREE.MeshBasicMaterial({
        color: 0xf43f5e,
        transparent: true,
        opacity: 0.9
      });
      const bladeRing = new THREE.Mesh(bladeGeom, bladeMat);
      group.add(bladeRing);

      // Ground Danger Warning Circle below Drone
      const shadowRingGeom = new THREE.RingGeometry(1.5, 1.85, 28);
      shadowRingGeom.rotateX(-Math.PI / 2);
      const shadowRingMat = new THREE.MeshBasicMaterial({
        color: 0xef4444,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const shadowRing = new THREE.Mesh(shadowRingGeom, shadowRingMat);
      shadowRing.position.y = -1.32;
      group.add(shadowRing);

      this.scene.add(group);

      this.hazards.push({
        id: cfg.id,
        type: 'drone',
        name: cfg.name,
        homePos: new THREE.Vector3(cfg.homeX, y, cfg.homeZ),
        position: new THREE.Vector3(cfg.homeX, y, cfg.homeZ),
        patrolRadius: cfg.patrolRadius,
        speed: cfg.speed,
        phase: cfg.phase,
        hitRadius: 2.25,
        detectRadius: 16.5,
        damage: 20,
        isChasing: false,
        group: group,
        bladeRing: bladeRing,
        shadowRing: shadowRing
      });
    });

    // =========================================================================
    // B. 8 ELECTRO-PLASMA HAZARD MINES (ทุ่นระเบิดพลาสมาไฟฟ้าสถิต)
    // =========================================================================
    const mineCoords = [
      { x: -15, z: 14 },
      { x: 18, z: 15 },
      { x: 0, z: 42 },
      { x: -45, z: 32 },
      { x: 48, z: 36 },
      { x: -48, z: -26 },
      { x: 46, z: -24 },
      { x: 12, z: -54 }
    ];

    mineCoords.forEach((mc, idx) => {
      const y = this.getHeight(mc.x, mc.z);
      const group = new THREE.Group();
      group.position.set(mc.x, y, mc.z);

      // Spiked Magnetic Mine Core
      const coreGeom = new THREE.OctahedronGeometry(0.75, 0);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x3b0764,
        emissive: 0xd946ef,
        emissiveIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.8
      });
      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      coreMesh.position.y = 0.65;
      coreMesh.castShadow = true;
      group.add(coreMesh);

      // Pulsing Danger Electric Perimeter Ring
      const pulseGeom = new THREE.RingGeometry(1.75, 2.15, 28);
      pulseGeom.rotateX(-Math.PI / 2);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xe879f9,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });
      const pulseRing = new THREE.Mesh(pulseGeom, pulseMat);
      pulseRing.position.y = 0.1;
      group.add(pulseRing);

      this.scene.add(group);

      this.hazards.push({
        id: `mine-${idx + 1}`,
        type: 'mine',
        name: 'ทุ่นพลาสมาไฟฟ้าสถิต (Electro-Plasma Mine)',
        homePos: new THREE.Vector3(mc.x, y, mc.z),
        position: new THREE.Vector3(mc.x, y, mc.z),
        hitRadius: 2.35,
        damage: 16,
        group: group,
        coreMesh: coreMesh,
        pulseRing: pulseRing
      });
    });

    // =========================================================================
    // C. 3 ELECTRIFIED MARTIAN DUST DEVILS (พายุหมุนฝุ่นสายฟ้าดาวอังคาร)
    // =========================================================================
    const stormConfigs = [
      { id: 'storm-1', name: 'พายุหมุนฝุ่นสายฟ้า Chryse Vortex', centerX: 0, centerZ: 24, radiusX: 28, radiusZ: 16, speed: 0.35, phase: 0.5 },
      { id: 'storm-2', name: 'พายุหมุนฝุ่นสายฟ้า North Vortex', centerX: -20, centerZ: 54, radiusX: 24, radiusZ: 18, speed: 0.38, phase: 2.6 },
      { id: 'storm-3', name: 'พายุหมุนฝุ่นสายฟ้า South Vortex', centerX: 8, centerZ: -44, radiusX: 28, radiusZ: 18, speed: 0.36, phase: 4.4 }
    ];

    stormConfigs.forEach((sc) => {
      const y = this.getHeight(sc.centerX, sc.centerZ);
      const group = new THREE.Group();
      group.position.set(sc.centerX, y, sc.centerZ);

      // Stacked Swirl Funnel Cones
      const rings = [];
      for (let level = 0; level < 5; level++) {
        const rBot = 0.9 + level * 0.55;
        const rTop = 1.3 + level * 0.65;
        const coneGeom = new THREE.CylinderGeometry(rTop, rBot, 2.2, 12, 1, true);
        const coneMat = new THREE.MeshBasicMaterial({
          color: level % 2 === 0 ? 0xf97316 : 0xef4444,
          wireframe: true,
          transparent: true,
          opacity: 0.45 - level * 0.05
        });
        const cone = new THREE.Mesh(coneGeom, coneMat);
        cone.position.y = 1.1 + level * 1.9;
        group.add(cone);
        rings.push(cone);
      }

      // Storm Base Hazard Zone Ring
      const baseGeom = new THREE.RingGeometry(2.6, 3.1, 32);
      baseGeom.rotateX(-Math.PI / 2);
      const baseMat = new THREE.MeshBasicMaterial({
        color: 0xf97316,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65
      });
      const baseRing = new THREE.Mesh(baseGeom, baseMat);
      baseRing.position.y = 0.12;
      group.add(baseRing);

      this.scene.add(group);

      this.hazards.push({
        id: sc.id,
        type: 'storm',
        name: sc.name,
        centerX: sc.centerX,
        centerZ: sc.centerZ,
        radiusX: sc.radiusX,
        radiusZ: sc.radiusZ,
        speed: sc.speed,
        phase: sc.phase,
        position: new THREE.Vector3(sc.centerX, y, sc.centerZ),
        hitRadius: 3.1,
        damage: 14,
        group: group,
        rings: rings
      });
    });
  }

  /**
   * Reset all 10 AI Nodes and Hazard Drone positions for a fresh round ("เริ่มเล่นรอบใหม่")
   */
  resetMissionNodes() {
    this.samples.forEach((sample) => {
      sample.collected = false;
      sample.analyzed = false;
      if (sample.coreMesh) {
        sample.coreMesh.scale.set(1, 1, 1);
      }
      if (sample.pillar && sample.pillar.material) {
        sample.pillar.material.opacity = 0.42;
      }
      if (sample.ring && sample.ring.material) {
        sample.ring.material.opacity = 0.72;
      }
      if (sample.gyroRing && sample.gyroRing.material) {
        sample.gyroRing.material.opacity = 0.85;
      }
    });

    this.hazards.forEach((h) => {
      if (h.type === 'drone') {
        h.position.copy(h.homePos);
        h.isChasing = false;
        h.group.position.set(h.homePos.x, h.homePos.y + 1.45, h.homePos.z);
      }
    });
  }

  /**
   * Mars Ascent Vehicle (MAV) Lander Base
   */
  initLander() {
    const landerZ = -16;
    const y = this.getHeight(0, landerZ);
    const group = new THREE.Group();
    group.position.set(0, y, landerZ);

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

    const foilGeom = new THREE.CylinderGeometry(2.6, 3.4, 2.4, 8);
    const foilMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.95,
      roughness: 0.2
    });
    const foil = new THREE.Mesh(foilGeom, foilMat);
    foil.position.y = 3.3;
    foil.castShadow = true;
    group.add(foil);

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

      const padGeom = new THREE.CylinderGeometry(0.75, 0.75, 0.18, 12);
      const pad = new THREE.Mesh(padGeom, legMat);
      pad.position.set(Math.cos(angle) * 4.8, 0.12, Math.sin(angle) * 4.8);
      pad.castShadow = true;
      group.add(pad);
    }

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

  /**
   * Update AI Node beacons and Hostile Hazard movements
   */
  update(time, dt = 0.016, roverPos = null, isPaused = false) {
    // 1. Animate 10 AI Core Nodes
    this.samples.forEach((sample, idx) => {
      if (!sample.collected) {
        sample.coreMesh.rotation.y = time * 1.6 + idx * 0.5;
        sample.coreMesh.position.y = 1.75 + Math.sin(time * 2.5 + idx) * 0.22;
        if (sample.gyroRing) {
          sample.gyroRing.rotation.x = time * 2.2;
          sample.gyroRing.rotation.y = time * 1.4;
          sample.gyroRing.position.y = sample.coreMesh.position.y;
        }
      }
    });

    if (isPaused) return;

    // 2. Animate and Move Hostile Hazards
    this.hazards.forEach((h) => {
      if (h.type === 'drone') {
        h.bladeRing.rotation.z = time * 8.0;

        // Check if Rover is within Drone Detection Perimeter (and outside safe spawn zone)
        let chaseRover = false;
        if (roverPos) {
          const distToRover = Math.hypot(roverPos.x - h.position.x, roverPos.z - h.position.z);
          const distFromSpawn = Math.hypot(roverPos.x, roverPos.z);
          if (distToRover < h.detectRadius && distFromSpawn > 7.5) {
            chaseRover = true;
          }
        }
        h.isChasing = chaseRover;

        if (chaseRover && roverPos) {
          // Pursuit Mode: Steer towards player rover!
          const dx = roverPos.x - h.position.x;
          const dz = roverPos.z - h.position.z;
          const dist = Math.hypot(dx, dz) || 1;
          const moveStep = h.speed * dt;
          h.position.x += (dx / dist) * moveStep;
          h.position.z += (dz / dist) * moveStep;
          h.group.rotation.y = Math.atan2(dx, dz);
        } else {
          // Orbit Patrol Mode around home station
          const angle = time * 0.55 + h.phase;
          const targetX = h.homePos.x + Math.cos(angle) * h.patrolRadius;
          const targetZ = h.homePos.z + Math.sin(angle) * h.patrolRadius;
          const dx = targetX - h.position.x;
          const dz = targetZ - h.position.z;
          h.position.x += dx * Math.min(1, dt * 3.0);
          h.position.z += dz * Math.min(1, dt * 3.0);
          if (Math.hypot(dx, dz) > 0.01) {
            h.group.rotation.y = Math.atan2(dx, dz);
          }
        }

        const groundY = this.getHeight(h.position.x, h.position.z);
        h.position.y = groundY;
        const hoverBob = Math.sin(time * 4.5 + h.phase) * 0.18;
        h.group.position.set(h.position.x, groundY + 1.45 + hoverBob, h.position.z);

      } else if (h.type === 'mine') {
        h.coreMesh.rotation.y = -time * 2.4;
        const pulse = 0.85 + Math.sin(time * 5.0) * 0.2;
        h.pulseRing.scale.set(pulse, pulse, 1);

      } else if (h.type === 'storm') {
        const angle = time * h.speed + h.phase;
        h.position.x = h.centerX + Math.cos(angle) * h.radiusX;
        h.position.z = h.centerZ + Math.sin(angle * 1.3) * h.radiusZ;
        h.position.y = this.getHeight(h.position.x, h.position.z);
        h.group.position.copy(h.position);

        h.rings.forEach((cone, idx) => {
          cone.rotation.y = time * (3.5 + idx * 1.2) * (idx % 2 === 0 ? 1 : -1);
        });
      }
    });
  }
}
