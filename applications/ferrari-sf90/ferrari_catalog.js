/**
 * ==========================================================================
 * Ferrari 10 Iconic Models Catalog & Engineering Specifications
 * Developed for Dr. Apisit Tongchai's STEM Education Portfolio
 * ==========================================================================
 */

import * as THREE from 'three';

export const FERRARI_CATALOG = [
  {
    id: 'sf90',
    name: 'Ferrari SF90 Stradale',
    titleHtml: 'FERRARI <span>SF90</span> STRADALE',
    year: '2021 PRODUCTION',
    category: 'Modern Flagship Hypercar',
    badge: 'PHEV HYBRID',
    badgeColor: '#00e5ff',
    xrayLabel: 'PHEV X-Ray',
    heroColor: '#e61d24',
    engineType: 'v8_hybrid',
    hasElectricWhine: true,
    specs: {
      hp: '986 HP',
      hpSub: 'Combined',
      engine: '4.0L V8',
      engineSub: 'Twin-Turbo',
      motors: '3 MOTORS',
      motorsSub: 'Electric e-4WD',
      accel: '2.5s',
      accelSub: '0-60 MPH',
      speed: '211 MPH',
      speedSub: 'Top Speed',
      downforce: '390 KG'
    },
    launch: {
      duration: 2500, // 2.50s
      targetTime: '2.50s',
      maxG: 1.35,
      drivetrain: 'e-4WD',
      drivetrainDesc: 'Torque Vectoring AWD'
    },
    sound: {
      baseFreq: 45,
      maxFreq: 185,
      hasElectricWhine: true,
      volume: 0.22
    },
    aero: {
      device: 'Active Shut-off Gurney Flap',
      downforceKg: '390 KG DOWNFORCE',
      initialValue: 1.0
    },
    xrayPill: {
      html: '<span class="xray-badge">⚡ 3 MOTORS (220 HP)</span><span class="xray-plus">+</span><span class="xray-badge" style="color:#f87171;border-color:rgba(239,68,68,0.4);">🔥 4.0L V8 TWIN-TURBO (769 HP)</span><span class="xray-equals">=</span><span class="xray-badge" style="color:#fbbf24;border-color:rgba(245,158,11,0.5);font-weight:800;">🏆 986 HP COMBINED (e-4WD)</span>'
    },
    hotspots: [
      {
        id: 'v8-engine',
        system: 'engine',
        title: '4.0L Twin-Turbo V8 Engine (F154 FA)',
        titleTh: 'เครื่องยนต์ 4.0 ลิตร Twin-Turbo V8 (F154 FA)',
        coords: new THREE.Vector3(0, 0.65, 0.55),
        camPos: new THREE.Vector3(1.6, 1.8, 1.6),
        camTarget: new THREE.Vector3(0, 0.65, 0.55),
        specs: ['769 HP @ 7,500 rpm', '800 Nm Torque @ 6,000 rpm', '350-bar Direct Injection', 'Flat-Plane Crankshaft'],
        desc: 'The internal combustion core is Ferrari’s most powerful V8 ever produced. Featuring redesigned intake and exhaust ducts, a flat-plane crankshaft, and 350-bar direct fuel injection.',
        descTh: 'หัวใจสันดาปภายในที่เป็นเครื่องยนต์ V8 ที่ทรงพลังที่สุดในประวัติศาสตร์ของ Ferrari พัฒนาท่อไอดีและไอเสียใหม่ ข้อเหวี่ยงแบบ Flat-Plane และระบบฉีดตรงแรงดันสูง 350 บาร์ วางเทอร์โบแบบ Hot-V เพื่อการตอบสนองที่รวดเร็วไร้ Turbo Lag'
      },
      {
        id: 'front-motors',
        system: 'motors',
        title: 'RAC-e Dual Front Electric Motors',
        titleTh: 'มอเตอร์ไฟฟ้าคู่หน้า RAC-e (ระบบกระจายแรงบิดอิสระ)',
        coords: new THREE.Vector3(0, 0.38, -1.25),
        camPos: new THREE.Vector3(1.8, 1.1, -2.2),
        camTarget: new THREE.Vector3(0, 0.38, -1.25),
        specs: ['2x Independent Motors', '133 HP combined', 'Full Torque Vectoring', 'Reverse & EV Mode (eDrive)'],
        desc: 'The front axle hosts two independent electric motors known as RAC-e (Regolatore Assetto Curva Elettrico). They provide AWD traction and torque vectoring during high-speed cornering.',
        descTh: 'เพลาหน้าติดตั้งมอเตอร์ไฟฟ้าอิสระ 2 ตัว (RAC-e) ช่วยสร้างระบบขับเคลื่อน 4 ล้อ (AWD) และกระจายแรงบิดขณะเข้าโค้งได้อย่างแม่นยำ'
      },
      {
        id: 'rear-mguk',
        system: 'motors',
        title: 'Rear MGUK Electric Motor & 8-Speed DCT',
        titleTh: 'มอเตอร์ไฟฟ้าด้านหลัง MGUK & เกียร์ 8 สปีดคลัตช์คู่',
        coords: new THREE.Vector3(0, 0.42, 1.25),
        camPos: new THREE.Vector3(-1.8, 1.2, 2.2),
        camTarget: new THREE.Vector3(0, 0.42, 1.25),
        specs: ['F1-derived MGUK', '84 HP', '8-speed Dual-Clutch Transmission', 'Kinetic Energy Recovery'],
        desc: 'Sandwiched between the V8 engine and the 8-speed dual-clutch transmission sits the MGUK (Motor Generator Unit, Kinetic) derived directly from Ferrari F1 technology.',
        descTh: 'มอเตอร์ไฟฟ้าตัวที่สามถ่ายทอดเทคโนโลยีโดยตรงจากรถแข่ง Formula 1 (MGUK) ติดตั้งคั่นกลางระหว่างเครื่องยนต์ V8 และชุดเกียร์ 8 สปีด ช่วยชาร์จพลังงานกลับขณะเบรก'
      },
      {
        id: 'battery-pack',
        system: 'engine',
        title: '7.9 kWh Lithium-Ion High-Voltage Battery',
        titleTh: 'แบตเตอรี่ลิเธียมไอออนแรงดันสูง 7.9 kWh',
        coords: new THREE.Vector3(0, 0.28, -0.15),
        camPos: new THREE.Vector3(0, 2.8, -0.15),
        camTarget: new THREE.Vector3(0, 0.28, -0.15),
        specs: ['7.9 kWh Capacity', '350V Architecture', 'Low Center of Gravity', 'PHEV External Plug-in Port'],
        desc: 'Mounted low beneath the floor just behind the cockpit seats, the compact 7.9 kWh battery balances the vehicle’s weight distribution.',
        descTh: 'ติดตั้งใต้ท้องรถด้านหลังเบาะนั่งห้องโดยสาร เพื่อให้จุดศูนย์ถ่วงต่ำที่สุดเท่าที่จะเป็นไปได้ แบตเตอรี่ขนาด 7.9 kWh รองรับการเสียบปลั๊กชาร์จไฟจากภายนอก (PHEV)'
      },
      {
        id: 'chassis-bulkhead',
        system: 'chassis',
        title: 'Hollow Aluminum Chassis & Carbon Bulkhead',
        titleTh: 'แชสซีอะลูมิเนียมหล่อกลวง & ผนังคาร์บอนไฟเบอร์',
        coords: new THREE.Vector3(0.5, 0.65, 0.05),
        camPos: new THREE.Vector3(2.2, 1.5, 0.2),
        camTarget: new THREE.Vector3(0, 0.6, 0.05),
        specs: ['Hollow Aluminum Castings', 'Carbon-Fiber Rear Bulkhead', '+20% Bending Stiffness', '+40% Torsional Rigidity'],
        desc: 'To offset the hybrid battery and motors weight, Ferrari engineered an all-new multi-material chassis using hollow aluminum extrusion castings and an ultra-stiff carbon bulkhead.',
        descTh: 'เพื่อชดเชยน้ำหนักของแบตเตอรี่และมอเตอร์ไฟฟ้า จึงออกแบบแชสซีผสมผสานด้วยอะลูมิเนียมหล่อกลวง และผนังกั้นห้องโดยสารด้านหลังที่ทำจากคาร์บอนไฟเบอร์'
      },
      {
        id: 'active-aero',
        system: 'aero',
        title: 'Patented Shut-off Gurney Flap',
        titleTh: 'ปีกแอคทีฟแอร์โรไดนามิก Shut-off Gurney',
        coords: new THREE.Vector3(0, 0.74, 1.88),
        camPos: new THREE.Vector3(-1.6, 1.4, 2.8),
        camTarget: new THREE.Vector3(0, 0.74, 1.88),
        specs: ['390 kg Downforce @ 250 km/h', 'Low-Drag / High-Downforce Modes', 'Active Solenoid Actuators', 'Patented Ferrari Invention'],
        desc: 'A mobile spoiler element integrated into the rear tail. In straight-line acceleration, it closes for low aerodynamic drag; during braking and cornering, it drops down to generate 390 kg of downforce.',
        descTh: 'สปอยเลอร์แบบแยกส่วนที่สามารถปรับมุมกดได้ด้วยระบบคอมพิวเตอร์ ช่วยสร้างแรงกดลงสู่พื้นถนนสูงสุดถึง 390 กก. ที่ความเร็ว 250 กม./ชม.'
      }
    ]
  },
  {
    id: 'laferrari',
    name: 'Ferrari LaFerrari',
    titleHtml: 'FERRARI <span>LAFERRARI</span> HY-KERS',
    year: '2013 HYPERCAR',
    category: 'Hypercar Holy Trinity',
    badge: 'HY-KERS V12',
    badgeColor: '#fbbf24',
    xrayLabel: 'HY-KERS X-Ray',
    heroColor: '#e61d24',
    engineType: 'v12_hybrid',
    hasElectricWhine: true,
    specs: {
      hp: '950 HP',
      hpSub: 'Combined',
      engine: '6.3L V12',
      engineSub: '9,250 RPM Screamer',
      motors: '1 HY-KERS',
      motorsSub: '161 HP F1 Boost',
      accel: '2.6s',
      accelSub: '0-60 MPH',
      speed: '218 MPH',
      speedSub: 'Top Speed',
      downforce: '360 KG'
    },
    launch: {
      duration: 2600,
      targetTime: '2.60s',
      maxG: 1.30,
      drivetrain: 'RWD',
      drivetrainDesc: 'F1 7-Speed Dual Clutch'
    },
    sound: {
      baseFreq: 58,
      maxFreq: 245,
      hasElectricWhine: true,
      volume: 0.24
    },
    aero: {
      device: 'Active Front Guide Vanes & Dynamic Rear Wing',
      downforceKg: '360 KG DOWNFORCE',
      initialValue: 0.8
    },
    xrayPill: {
      html: '<span class="xray-badge" style="color:#fbbf24;border-color:rgba(245,158,11,0.4);">⚡ F1 HY-KERS (161 HP)</span><span class="xray-plus">+</span><span class="xray-badge" style="color:#f87171;border-color:rgba(239,68,68,0.4);">🔥 6.3L V12 NA (789 HP @ 9,250 RPM)</span><span class="xray-equals">=</span><span class="xray-badge" style="color:#10b981;border-color:rgba(16,185,129,0.5);font-weight:800;">🏆 950 HP TOTAL</span>'
    },
    hotspots: [
      {
        id: 'v12-engine',
        system: 'engine',
        title: '6.3L Naturally Aspirated 65° V12 (F140 FE)',
        titleTh: 'เครื่องยนต์ 6.3 ลิตร V12 ไร้ระบบอัดอากาศ (F140 FE)',
        coords: new THREE.Vector3(0, 0.65, 0.60),
        camPos: new THREE.Vector3(1.8, 1.8, 1.8),
        camTarget: new THREE.Vector3(0, 0.65, 0.60),
        specs: ['789 HP @ 9,000 RPM', '9,250 RPM Redline', '13.5:1 Compression Ratio', 'Variable Length Intakes'],
        desc: 'The greatest naturally aspirated road-going V12 engine in Ferrari history, revving to an ear-splitting 9,250 RPM with variable-geometry intake tracts derived from F1.',
        descTh: 'เครื่องยนต์ V12 ไร้ระบบอัดอากาศที่ทรงพลังที่สุด ให้กำลัง 789 แรงม้า พร้อมลากรอบได้สูงถึง 9,250 รอบ/นาที ท่อไอดีแปรผันถ่ายทอดจากรถแข่ง F1'
      },
      {
        id: 'hy-kers',
        system: 'motors',
        title: 'F1-Derived HY-KERS Electric Module',
        titleTh: 'ระบบมอเตอร์ไฟฟ้า HY-KERS ถ่ายทอดจาก F1',
        coords: new THREE.Vector3(0, 0.40, 1.35),
        camPos: new THREE.Vector3(-1.8, 1.2, 2.2),
        camTarget: new THREE.Vector3(0, 0.40, 1.35),
        specs: ['161 HP (120 kW) Electric Boost', '270 Nm Instant Torque', 'Magneti Marelli Co-development', 'Continuous KERS Recovery'],
        desc: 'Developed with Magneti Marelli, the high-voltage motor is coupled directly to the 7-speed dual-clutch transmission to fill torque gaps at low RPM.',
        descTh: 'มอเตอร์ไฟฟ้าแรงดันสูงทำงานร่วมกับเกียร์คลัตช์คู่ 7 สปีด ช่วยเติมแรงบิดทันทีในรอบต่ำ ทำให้เครื่องยนต์ V12 ตอบสนองได้คมกริบไร้ความหน่วง'
      },
      {
        id: 'carbon-tub',
        system: 'chassis',
        title: 'T1000 Carbon-Fiber Monocoque (Hand-Laid)',
        titleTh: 'โครงสร้างคาร์บอนไฟเบอร์โมโนค็อก T1000 ทำมือ',
        coords: new THREE.Vector3(0, 0.50, 0.0),
        camPos: new THREE.Vector3(2.2, 1.6, 0.0),
        camTarget: new THREE.Vector3(0, 0.50, 0.0),
        specs: ['4 Different Carbon Types (T800, T1000)', 'Kevlar Underbody Protection', '+27% Torsional Rigidity', 'Integrated Fixed Bucket Seats'],
        desc: 'Engineered by Ferrari’s F1 technical director Rory Byrne. Four specialized aerospace carbon fibers are autoclaved together, with seats bonded directly into the chassis.',
        descTh: 'ออกแบบโดยทีมวิศวกร F1 ผสมผสานคาร์บอนไฟเบอร์ 4 เกรดอุตสาหกรรมอวกาศ และหล่อเบาะนั่งเชื่อมเป็นชิ้นเดียวกับตัวถังเพื่อจุดศูนย์ถ่วงต่ำสุด'
      },
      {
        id: 'active-rear-wing',
        system: 'aero',
        title: 'Active Rear Wing & Dynamic Diffuser Flaps',
        titleTh: 'สปอยเลอร์หลังและดิฟฟิวเซอร์แอคทีฟแปรผัน',
        coords: new THREE.Vector3(0, 0.72, 1.95),
        camPos: new THREE.Vector3(-1.6, 1.4, 2.8),
        camTarget: new THREE.Vector3(0, 0.72, 1.95),
        specs: ['360 kg Downforce @ 200 km/h', 'Synchronized Front/Rear Aero', 'Automatic Airbrake Function', 'Zero Drag Penalty on Straights'],
        desc: 'Sensors analyze vehicle dynamics 100 times per second, deploying the rear wing and underbody diffuser flaps in perfect synchronization with front guide vanes.',
        descTh: 'ระบบควบคุมแบบเรียลไทม์ปรับมุมยกของสปอยเลอร์หลังและครีบดิฟฟิวเซอร์ใต้ท้องรถ สัมพันธ์กับทิศทางการเลี้ยวและแรงเบรกอัตโนมัติ'
      },
      {
        id: 'carbon-brakes',
        system: 'chassis',
        title: 'Brembo Carbon-Ceramic CCM-R Braking System',
        titleTh: 'เบรกคาร์บอนเซรามิก Brembo CCM-R เกรดมอเตอร์สปอร์ต',
        coords: new THREE.Vector3(0.78, 0.35, 1.25),
        camPos: new THREE.Vector3(1.5, 0.6, 1.6),
        camTarget: new THREE.Vector3(0.78, 0.35, 1.25),
        specs: ['398 mm Front / 380 mm Rear Rotors', 'Extruded Monobloc Calipers', 'Thermal Dissipation Fins', 'Integrated with KERS Regeneration'],
        desc: 'Lightweight motorsport-derived discs engineered for extreme temperature endurance without fading, working seamlessly with KERS regenerative braking.',
        descTh: 'จานเบรกคาร์บอนเซรามิกขนาดใหญ่ 398 มม. ทนความร้อนสูงไม่เฟด พร้อมแปลงพลังงานจลน์จากการเบรกกลับไปชาร์จแบตเตอรี่ไฮบริด'
      },
      {
        id: 'f1-cabin',
        system: 'chassis',
        title: 'F1 Cockpit with Adjustable Pedal Box',
        titleTh: 'ห้องโดยสารสไตล์ Formula 1 แป้นเหยียบปรับเลื่อน',
        coords: new THREE.Vector3(0, 0.62, -0.2),
        camPos: new THREE.Vector3(0.6, 1.2, -0.2),
        camTarget: new THREE.Vector3(0, 0.58, -0.2),
        specs: ['Fixed Seat Layout', 'Moveable Steering & Pedals', 'Flat-Top/Bottom F1 Wheel', 'Manettino Dial Selection'],
        desc: 'Because the seat is bonded to the chassis to save 50 kg, the pedals and steering wheel move toward the driver to create a tailored F1 driving position.',
        descTh: 'เบาะนั่งยึดตายตัวกับแชสซี จึงออกแบบให้ชุดแป้นเหยียบและพวงมาลัยเลื่อนปรับตำแหน่งเข้าหาตัวผู้ขับขี่ ถอดแบบมาจากท่านั่งรถแข่ง F1'
      }
    ]
  },
  {
    id: 'f40',
    name: 'Ferrari F40',
    titleHtml: 'FERRARI <span>F40</span> TWIN-TURBO',
    year: '1987 ICON',
    category: 'Golden Turbo Era Legend',
    badge: 'TWIN-TURBO V8',
    badgeColor: '#ef4444',
    xrayLabel: 'Twin-Turbo X-Ray',
    heroColor: '#e61d24',
    engineType: 'v8_turbo',
    hasElectricWhine: false,
    specs: {
      hp: '471 HP',
      hpSub: 'At 7,000 RPM',
      engine: '2.9L V8',
      engineSub: 'Twin IHI Turbos',
      motors: 'MANUAL',
      motorsSub: '5-Speed Gated',
      accel: '3.8s',
      accelSub: '0-60 MPH',
      speed: '201 MPH',
      speedSub: 'First 200+ MPH Car',
      downforce: '320 KG'
    },
    launch: {
      duration: 3800,
      targetTime: '3.80s',
      maxG: 1.15,
      drivetrain: 'RWD',
      drivetrainDesc: 'Gated 5-Speed Manual'
    },
    sound: {
      baseFreq: 42,
      maxFreq: 175,
      hasElectricWhine: false,
      volume: 0.26
    },
    aero: {
      device: 'Fixed Iconic Carbon-Composite Rear Wing',
      downforceKg: '320 KG DOWNFORCE',
      initialValue: 0.9
    },
    xrayPill: {
      html: '<span class="xray-badge" style="color:#ef4444;border-color:rgba(239,68,68,0.4);">🔥 2.9L TWIN-TURBO V8 (471 HP)</span><span class="xray-plus">+</span><span class="xray-badge" style="color:#94a3b8;border-color:rgba(148,163,184,0.4);">⚙️ 5-SPEED GATED MANUAL</span><span class="xray-equals">=</span><span class="xray-badge" style="color:#f8cc00;border-color:rgba(248,204,0,0.5);font-weight:800;">⚡ 201 MPH TOP SPEED</span>'
    },
    hotspots: [
      {
        id: 'f40-engine',
        system: 'engine',
        title: '2.9L Tipo F120A Twin-Turbo V8',
        titleTh: 'เครื่องยนต์ 2.9 ลิตร Tipo F120A ทวินเทอร์โบ V8',
        coords: new THREE.Vector3(0, 0.65, 0.65),
        camPos: new THREE.Vector3(1.6, 1.7, 1.8),
        camTarget: new THREE.Vector3(0, 0.65, 0.65),
        specs: ['471 HP @ 7,000 RPM', '577 Nm Torque', 'Twin IHI Turbochargers (1.1 bar)', 'Dual Behr Air-to-Air Intercoolers'],
        desc: 'Enzo Ferrari’s final masterpiece. A 2,936cc twin-turbo V8 breathing through massive top-mounted intercoolers, known for its explosive boost delivery.',
        descTh: 'ผลงานชิ้นเอกชิ้นสุดท้ายที่ได้รับการอนุมัติจาก Enzo Ferrari เครื่องยนต์ V8 2.9 ลิตร พ่วงเทอร์โบคู่ IHI อัดอากาศผ่านอินเตอร์คูลเลอร์คู่ขนาดใหญ่'
      },
      {
        id: 'f40-wing',
        system: 'aero',
        title: 'Iconic High-Rise Rear Wing & Louvered Lexan',
        titleTh: 'ปีกหลังขนาดใหญ่ระดับตำนาน & ฝากระโปรง Lexan',
        coords: new THREE.Vector3(0, 0.95, 2.05),
        camPos: new THREE.Vector3(-1.8, 1.5, 2.8),
        camTarget: new THREE.Vector3(0, 0.95, 2.05),
        specs: ['Molded Kevlar/Carbon Construction', 'Slotted Engine Cooling Louvers', 'Negative Lift at 200 MPH', 'Integrated F40 Logo'],
        desc: 'The defining visual signature of supercar history. The high-downforce rear wing works with a vented polycarbonate Lexan rear window that extracts scorching turbo heat.',
        descTh: 'ปีกหลังทรงสูงที่กลายเป็นไอคอนของโลกซูเปอร์คาร์ ผลิตจากคาร์บอน-เคฟลาร์ พร้อมกระจกหลัง Lexan เจาะช่องระบายความร้อนเทอร์โบ'
      },
      {
        id: 'naca-ducts',
        system: 'aero',
        title: 'Aerospace NACA Cooling Ducts',
        titleTh: 'ช่องดักลมระบายความร้อน NACA อุตสาหกรรมอวกาศ',
        coords: new THREE.Vector3(0.72, 0.45, 0.70),
        camPos: new THREE.Vector3(1.6, 0.9, 0.8),
        camTarget: new THREE.Vector3(0.72, 0.45, 0.70),
        specs: ['Submerged Inlets', 'Minimal Aerodynamic Drag Penalty', 'Feeds Oil & Brake Coolers', 'Formula 1 Inspired'],
        desc: 'Pioneered by the National Advisory Committee for Aeronautics (NACA). The sunken triangular ducts channel cooling airflow into the engine without disturbing surface flow.',
        descTh: 'ช่องดักลมสามเหลี่ยมคว่ำแบบฝังตัวถัง ช่วยดักอากาศเข้าสู่หม้อน้ำและระบบระบายความร้อนโดยไม่สูญเสียค่าสัมประสิทธิ์แรงเสียดทาน'
      },
      {
        id: 'kevlar-body',
        system: 'chassis',
        title: 'Kevlar, Carbon-Fiber & Nomex Tubular Chassis',
        titleTh: 'ตัวถังและโครงสร้างเคฟลาร์ คาร์บอนไฟเบอร์ และโนเม็กซ์',
        coords: new THREE.Vector3(0, 0.45, -0.1),
        camPos: new THREE.Vector3(2.2, 1.4, 0.0),
        camTarget: new THREE.Vector3(0, 0.45, -0.1),
        specs: ['1,100 kg Dry Weight', 'Steel Spaceframe with Carbon Panels', 'No Power Steering or ABS', 'Minimalist Race-Ready Tub'],
        desc: 'Weighing only 1,100 kg, the F40 had no door handles, no stereo, no sound deadening, and green composite resin visible through the ultra-thin paint.',
        descTh: 'น้ำหนักเบาเพียง 1,100 กก. ไร้มือจับประตู ไร้ระบบพวงมาลัยเพาเวอร์และระบบเบรก ABS พ่นสีบางจนมองเห็นลายเส้นใยเคฟลาร์และเรซินสีเขียว'
      },
      {
        id: 'gated-shifter',
        system: 'chassis',
        title: 'Open-Gated 5-Speed Manual Dog-Leg Shifter',
        titleTh: 'คันเกียร์กระปุก 5 สปีด ร่องเหล็กเปิด (Dog-Leg)',
        coords: new THREE.Vector3(0.1, 0.48, -0.1),
        camPos: new THREE.Vector3(0.6, 1.1, -0.1),
        camTarget: new THREE.Vector3(0.1, 0.48, -0.1),
        specs: ['Solid Aluminum Shift Gate', 'Dog-Leg First Gear (Down & Left)', 'Twin-Plate Clutch', 'Tactile Mechanical Clack'],
        desc: 'The quintessential analog supercar experience. First gear is down and left (dog-leg) to keep second and third gears in direct alignment for track driving.',
        descTh: 'เกียร์ 1 อยู่ตำแหน่งซ้ายล่าง (Dog-Leg) เพื่อให้เกียร์ 2 และ 3 อยู่ในแนวเดียวกัน เหมาะสำหรับการขับขี่ในสนามแข่ง พร้อมเสียงคลิกของคันเกียร์โลหะ'
      },
      {
        id: 'speedline-wheels',
        system: 'chassis',
        title: 'Speedline Split-Rim Center-Lock Wheels',
        titleTh: 'ล้อแม็ก Speedline ชิ้นส่วนแยก ดุมกลาง Center-Lock',
        coords: new THREE.Vector3(0.78, 0.35, 1.25),
        camPos: new THREE.Vector3(1.5, 0.6, 1.4),
        camTarget: new THREE.Vector3(0.78, 0.35, 1.25),
        specs: ['17-inch Diameter', '335/35 ZR17 Ultra-Wide Rear Rubber', 'Single Center-Lock Nut', 'Modular 3-Piece Alloy'],
        desc: 'Massive 335 mm rear tires wrapped around three-piece Speedline wheels secured with a single motorsport center-lock nut.',
        descTh: 'ยางหลังหน้ากว้างพิเศษขนาด 335 มม. ยึดด้วยน็อตดุมกลางตัวเดียว (Center-Lock) แบบเดียวกับรถแข่ง Group C'
      }
    ]
  },
  {
    id: 'enzo',
    name: 'Ferrari Enzo Ferrari',
    titleHtml: 'FERRARI <span>ENZO</span> FERRARI',
    year: '2002 HALO',
    category: 'Millennial F1 Technology Era',
    badge: '6.0L NA V12',
    badgeColor: '#fbbf24',
    xrayLabel: 'V12 X-Ray',
    heroColor: '#e61d24',
    engineType: 'v12_na',
    hasElectricWhine: false,
    specs: {
      hp: '651 HP',
      hpSub: 'At 7,800 RPM',
      engine: '6.0L V12',
      engineSub: 'Tipo F140 B',
      motors: 'F1 PADDLE',
      motorsSub: '6-Speed Automated',
      accel: '3.14s',
      accelSub: '0-60 MPH',
      speed: '221 MPH',
      speedSub: 'Top Speed',
      downforce: '775 KG'
    },
    launch: {
      duration: 3140,
      targetTime: '3.14s',
      maxG: 1.25,
      drivetrain: 'RWD',
      drivetrainDesc: 'Electrohydraulic 6-Speed'
    },
    sound: {
      baseFreq: 54,
      maxFreq: 220,
      hasElectricWhine: false,
      volume: 0.25
    },
    aero: {
      device: 'Active Flaps & Dual Venturi Tunnels',
      downforceKg: '775 KG DOWNFORCE',
      initialValue: 0.85
    },
    xrayPill: {
      html: '<span class="xray-badge" style="color:#fbbf24;border-color:rgba(245,158,11,0.4);">🔥 6.0L 65° V12 (651 HP)</span><span class="xray-plus">+</span><span class="xray-badge" style="color:#00e5ff;border-color:rgba(0,229,255,0.4);">🏎️ F1 PADDLE SHIFT (150ms)</span><span class="xray-equals">=</span><span class="xray-badge" style="color:#e61d24;border-color:rgba(230,29,36,0.5);font-weight:800;">🏆 221 MPH (775 KG DOWNFORCE)</span>'
    },
    hotspots: [
      {
        id: 'enzo-v12',
        system: 'engine',
        title: '6.0L 65° Naturally Aspirated V12 (F140 B)',
        titleTh: 'เครื่องยนต์ 6.0 ลิตร 65° V12 ไร้ระบบอัดอากาศ (F140 B)',
        coords: new THREE.Vector3(0, 0.65, 0.60),
        camPos: new THREE.Vector3(1.6, 1.7, 1.8),
        camTarget: new THREE.Vector3(0, 0.65, 0.60),
        specs: ['651 HP @ 7,800 RPM', '657 Nm Torque', 'Bosh Motronic ME7', 'Dry-Sump Lubrication'],
        desc: 'The founding father of Ferrari’s modern V12 engine family. A pure 6.0-liter atmospheric unit producing 651 horsepower without turbochargers or superchargers.',
        descTh: 'ต้นกำเนิดเครื่องยนต์ V12 ยุคใหม่ของ Ferrari ขนาด 6.0 ลิตร มุมเอียง 65 องศา ให้กำลัง 651 แรงม้า ตอบสนองเฉียบคมด้วยระบบหล่อลื่นแบบ Dry-Sump'
      },
      {
        id: 'f1-nose',
        system: 'aero',
        title: 'F1-Inspired Pointed Nose & Front Flaps',
        titleTh: 'จมูกหน้าทรงรถแข่ง F1 พร้อมปีกดักลมแอคทีฟ',
        coords: new THREE.Vector3(0, 0.32, -2.15),
        camPos: new THREE.Vector3(-1.6, 0.8, -2.5),
        camTarget: new THREE.Vector3(0, 0.32, -2.15),
        specs: ['Ken Okuyama Design', 'Direct F1 Aerodynamic Transposition', 'Split Radiator Inlets', 'Composite Construction'],
        desc: 'Pininfarina design directed by Ken Okuyama, featuring a raised central nose cone reminiscent of Michael Schumacher’s championship-winning Ferrari F1 cars.',
        descTh: 'ดีไซน์ Pininfarina โดย Ken Okuyama ออกแบบจมูกหน้ารถยกสูงแบบเดียวกับรถแข่ง Formula 1 ของ Michael Schumacher แยกช่องดักลมระบายความร้อนซ้าย-ขวา'
      },
      {
        id: 'venturi-tunnels',
        system: 'aero',
        title: 'Underbody Ground-Effect Venturi Tunnels',
        titleTh: 'ช่องอุโมงค์ Venturi ใต้ท้องรถสร้างแรงดูด Ground Effect',
        coords: new THREE.Vector3(0, 0.18, 1.40),
        camPos: new THREE.Vector3(1.8, 0.6, 1.8),
        camTarget: new THREE.Vector3(0, 0.18, 1.40),
        specs: ['775 kg Downforce @ 300 km/h', 'Underfloor Suction Effect', 'Diffuser Active Flaps', 'Eliminated Large Fixed Wing'],
        desc: 'Instead of an unsightly giant rear wing, the Enzo uses massive underbody Venturi tunnels that generate an astonishing 775 kg of downforce via Bernoulli suction.',
        descTh: 'แทนที่จะใช้ปีกหลังขนาดใหญ่ Enzo ออกแบบอุโมงค์ดูดอากาศ Venturi ใต้ท้องรถตามหลักการของเบอร์นูลลี สร้างแรงกดมหาศาลถึง 775 กก. ที่ 300 กม./ชม.'
      },
      {
        id: 'f1-transmission',
        system: 'chassis',
        title: '6-Speed Electrohydraulic F1 Automated Transmission',
        titleTh: 'เกียร์ออโตเมติก F1 พร้อมแป้นแพดเดิลชิฟต์ (เปลี่ยนใน 150ms)',
        coords: new THREE.Vector3(0, 0.40, 1.20),
        camPos: new THREE.Vector3(-1.6, 1.2, 1.8),
        camTarget: new THREE.Vector3(0, 0.40, 1.20),
        specs: ['150 ms Shift Speed', 'Carbon-Fiber Column Paddles', 'LED Shift Lights on Steering Wheel', 'Triple Carbon Clutch Plates'],
        desc: 'Lightning-fast gear shifts executed in just 150 milliseconds via hydraulic actuators, governed by driver paddles mounted to the steering column.',
        descTh: 'ระบบเกียร์ไฮดรอลิกไฟฟ้าที่เปลี่ยนเกียร์ได้เร็วในเวลาเพียง 150 มิลลิวินาที สั่งการผ่านแป้นคาร์บอนไฟเบอร์หลังพวงมาลัย'
      },
      {
        id: 'dihedral-doors',
        system: 'chassis',
        title: 'Aerodynamic Dihedral Butterfly Doors',
        titleTh: 'ประตูปีกผีเสื้อ Dihedral เปิดเฉียงขึ้น 45 องศา',
        coords: new THREE.Vector3(0.80, 0.65, -0.2),
        camPos: new THREE.Vector3(2.0, 1.4, -0.2),
        camTarget: new THREE.Vector3(0.80, 0.65, -0.2),
        specs: ['Roof Section Cutout', 'Integrated Side Air Ducts', 'Carbon-Fiber Construction', 'Easy Helmet Clearance'],
        desc: 'The dramatic doors carry part of the roof and front fender with them, allowing the driver easy access while wearing a racing helmet.',
        descTh: 'ประตูเปิดเฉียงขึ้นพร้อมส่วนหลังคาและซุ้มล้อหน้า ช่วยให้อากาศไหลเข้าสู่หม้อน้ำด้านข้าง และช่วยให้ผู้ขับขึ้นลงได้สะดวกแม้ยามสวมหมวกกันน็อก'
      },
      {
        id: 'carbon-ceramic-first',
        system: 'chassis',
        title: 'Brembo Carbon-Ceramic (CCM) Discs (First on Ferrari Road Car)',
        titleTh: 'จานเบรกคาร์บอนเซรามิก Brembo รุ่นแรกของรถถนน Ferrari',
        coords: new THREE.Vector3(0.76, 0.35, -1.25),
        camPos: new THREE.Vector3(1.5, 0.5, -1.25),
        camTarget: new THREE.Vector3(0.76, 0.35, -1.25),
        specs: ['380 mm Front Carbon Discs', 'Zero Fade Performance', '12.5 kg Weight Reduction per Corner', 'Formula 1 Proven'],
        desc: 'The very first Ferrari road car ever equipped with carbon-ceramic brakes, cutting un-sprung rotational mass while providing race-grade stopping power.',
        descTh: 'รถยนต์สำหรับวิ่งบนถนนรุ่นแรกของ Ferrari ที่ติดตั้งจานเบรกคาร์บอนเซรามิก ลดน้ำหนักใต้สปริงได้ข้างละ 12.5 กก.'
      }
    ]
  },
  {
    id: 'f458',
    name: 'Ferrari 458 Italia',
    titleHtml: 'FERRARI <span>458</span> ITALIA',
    year: '2009 MODERN CLASSIC',
    category: 'Peak Atmospheric V8 Era',
    badge: '9,000 RPM V8',
    badgeColor: '#f8cc00',
    xrayLabel: 'V8 NA X-Ray',
    heroColor: '#e61d24',
    engineType: 'v8_na',
    hasElectricWhine: false,
    specs: {
      hp: '562 HP',
      hpSub: 'At 9,000 RPM',
      engine: '4.5L V8',
      engineSub: 'Flat-Plane NA',
      motors: '7-SPEED',
      motorsSub: 'Dual-Clutch DCT',
      accel: '3.3s',
      accelSub: '0-60 MPH',
      speed: '202 MPH',
      speedSub: 'Top Speed',
      downforce: '140 KG'
    },
    launch: {
      duration: 3300,
      targetTime: '3.30s',
      maxG: 1.20,
      drivetrain: 'RWD',
      drivetrainDesc: 'E-Diff3 & F1-Trac'
    },
    sound: {
      baseFreq: 50,
      maxFreq: 215,
      hasElectricWhine: false,
      volume: 0.24
    },
    aero: {
      device: 'Aeroelastic Deformable Front Winglets',
      downforceKg: '140 KG DOWNFORCE',
      initialValue: 0.7
    },
    xrayPill: {
      html: '<span class="xray-badge" style="color:#f8cc00;border-color:rgba(248,204,0,0.4);">🔥 4.5L FLAT-PLANE V8 (562 HP @ 9,000 RPM)</span><span class="xray-plus">+</span><span class="xray-badge" style="color:#10b981;border-color:rgba(16,185,129,0.4);">⚡ E-DIFF3 + F1-TRAC</span><span class="xray-equals">=</span><span class="xray-badge" style="color:#00e5ff;border-color:rgba(0,229,255,0.5);font-weight:800;">🏆 202 MPH PINNACLE NA V8</span>'
    },
    hotspots: [
      {
        id: 'v8-f136',
        system: 'engine',
        title: '4.5L Flat-Plane Crankshaft V8 (Tipo F136 FB)',
        titleTh: 'เครื่องยนต์ 4.5 ลิตร ข้อเหวี่ยง Flat-Plane V8 (F136 FB)',
        coords: new THREE.Vector3(0, 0.65, 0.55),
        camPos: new THREE.Vector3(1.6, 1.7, 1.6),
        camTarget: new THREE.Vector3(0, 0.65, 0.55),
        specs: ['562 HP @ 9,000 RPM', '125 HP / Liter (Record for NA)', '12.5:1 Compression Ratio', 'Formula 1 Piston Geometry'],
        desc: 'Widely praised as the finest naturally aspirated V8 engine ever made. Holding a world-record specific output of 125 HP per liter without any forced induction.',
        descTh: 'เครื่องยนต์ V8 ไร้ระบบอัดอากาศที่ยอดเยี่ยมที่สุด สร้างสถิติโลก 125 แรงม้าต่อลิตร ลากรอบได้สะใจถึง 9,000 รอบ/นาที'
      },
      {
        id: 'triple-exhaust',
        system: 'engine',
        title: 'Signature Triple Central Exhaust Outlets',
        titleTh: 'ท่อไอเสียออกกลาง 3 ท่อระดับเอกลักษณ์ (Triple Exhaust)',
        coords: new THREE.Vector3(0, 0.38, 2.15),
        camPos: new THREE.Vector3(-1.5, 0.8, 2.6),
        camTarget: new THREE.Vector3(0, 0.38, 2.15),
        specs: ['Tribute to Ferrari F40', 'Active Acoustic Bypass Valves', 'Outer Pipes for Low RPM', 'Center Pipe for High-RPM Screaming'],
        desc: 'Echoing the legendary F40, the outer twin pipes flow exhaust at normal speeds, while the central third pipe opens its valve at 3,000+ RPM for acoustic perfection.',
        descTh: 'ท่อไอเสีย 3 ท่อตรงกลางเพื่อเป็นเกียรติแก่ F40 ท่อด้านข้างทำงานในรอบต่ำ ท่อตรงกลางเปิดวาล์วบายพาสในรอบสูงเพื่อขับเสียงคำราม'
      },
      {
        id: 'deformable-winglets',
        system: 'aero',
        title: 'Aeroelastic Deformable Front Winglets',
        titleTh: 'ปีกดักลมด้านหน้ายืดหยุ่นแปรผันตามความเร็ว (Aeroelastic)',
        coords: new THREE.Vector3(0, 0.28, -2.15),
        camPos: new THREE.Vector3(-1.6, 0.7, -2.5),
        camTarget: new THREE.Vector3(0, 0.28, -2.15),
        specs: ['Flexible Elastomer Material', 'Passively Deforms at High Speed', 'Reduces Drag on Straights', 'Increases Downforce in Braking'],
        desc: 'The front grille features small winglets made of aeroelastic material that deflect downwards at high speed to reduce aerodynamic drag and channel air under the car.',
        descTh: 'ปีกดักลมในกระจังหน้าผลิตจากวัสดุยืดหยุ่น เมื่อความเร็วสูงขึ้นจะโค้งตัวลงอัตโนมัติเพื่อลดแรงต้านอากาศ และคืนรูปเพื่อสร้างแรงกดในโค้ง'
      },
      {
        id: 'e-diff3',
        system: 'chassis',
        title: 'Integrated E-Diff3 & F1-Trac Traction System',
        titleTh: 'ระบบเฟืองท้ายไฟฟ้า E-Diff3 และ F1-Trac',
        coords: new THREE.Vector3(0, 0.36, 1.25),
        camPos: new THREE.Vector3(1.6, 0.9, 1.5),
        camTarget: new THREE.Vector3(0, 0.36, 1.25),
        specs: ['Active Torque Transfer to Outside Wheel', '+32% Corner Exit Acceleration', 'Controlled via Manettino Dial', 'Race-Derived Algorithms'],
        desc: 'Electronically controlled limited-slip differential that transfers torque to the outer rear wheel during hard cornering for explosive exit speeds.',
        descTh: 'เฟืองท้ายไฟฟ้าอัจฉริยะที่กระจายแรงบิดสู่ล้อหลังด้านนอกขณะเข้าโค้ง ช่วยให้เร่งออกจากโค้งได้เร็วกว่าเดิมถึง 32%'
      },
      {
        id: 'led-headlights',
        system: 'chassis',
        title: 'Swept-Back Bi-Xenon Headlights with LED Eyebrows',
        titleTh: 'ไฟหน้า Bi-Xenon ทรงเฉี่ยวพร้อมไฟเลี้ยว LED แบบเส้นสาย',
        coords: new THREE.Vector3(0.68, 0.48, -1.8),
        camPos: new THREE.Vector3(1.4, 0.9, -1.8),
        camTarget: new THREE.Vector3(0.68, 0.48, -1.8),
        specs: ['20 Vertical LED DRLs', 'Integrated Cooling Vent for Front Radiators', 'Pininfarina Styling', 'Aerodynamic Form Factor'],
        desc: 'The tall headlights incorporate internal ducting that vents cooling air from the front wheel arches to reduce turbulence.',
        descTh: 'ไฟหน้าแนวตั้งพร้อมท่อระบายลมในตัวที่ช่วยระบายความร้อนจากซุ้มล้อหน้าเพื่อลดกระแสลมหมุนวน'
      },
      {
        id: 'pininfarina-cockpit',
        system: 'chassis',
        title: 'Pininfarina Cockpit with Manettino Control',
        titleTh: 'ห้องโดยสาร Pininfarina ปุ่มปรับ Manettino บนพวงมาลัย',
        coords: new THREE.Vector3(0, 0.62, -0.15),
        camPos: new THREE.Vector3(0.5, 1.2, -0.15),
        camTarget: new THREE.Vector3(0, 0.60, -0.15),
        specs: ['Eliminated Stalks on Steering Column', 'Turn Signals on Steering Wheel', 'F1-Trac Manettino (5 Modes)', 'Driver-Focused Ergonomics'],
        desc: 'Consulted by Michael Schumacher, all primary controls including indicators, lights, and suspension settings are placed directly on the steering wheel.',
        descTh: 'ร่วมทดสอบและให้คำปรึกษาโดย Michael Schumacher ย้ายสวิตช์ไฟเลี้ยวและแตรมาไว้บนพวงมาลัยเพื่อไม่ต้องละมือขณะควบคุมรถ'
      }
    ]
  },
  {
    id: 'pista',
    name: 'Ferrari 488 Pista',
    titleHtml: 'FERRARI <span>488 PISTA</span> S-DUCT',
    year: '2018 TRACK SPECIAL',
    category: 'Special Series Turbo Track Rocket',
    badge: '710 HP TWIN-TURBO',
    badgeColor: '#ef4444',
    xrayLabel: 'Twin-Turbo X-Ray',
    heroColor: '#e61d24',
    engineType: 'v8_turbo',
    hasElectricWhine: false,
    specs: {
      hp: '710 HP',
      hpSub: 'At 8,000 RPM',
      engine: '3.9L V8',
      engineSub: 'Award-Winning Turbo',
      motors: '7-SPEED',
      motorsSub: 'F1 Dual Clutch',
      accel: '2.85s',
      accelSub: '0-60 MPH',
      speed: '211 MPH',
      speedSub: 'Top Speed',
      downforce: '390 KG'
    },
    launch: {
      duration: 2850,
      targetTime: '2.85s',
      maxG: 1.30,
      drivetrain: 'RWD',
      drivetrainDesc: 'Variable Boost Management'
    },
    sound: {
      baseFreq: 46,
      maxFreq: 195,
      hasElectricWhine: false,
      volume: 0.25
    },
    aero: {
      device: 'Formula 1 S-Duct & Blown Spoiler',
      downforceKg: '390 KG DOWNFORCE',
      initialValue: 0.95
    },
    xrayPill: {
      html: '<span class="xray-badge" style="color:#ef4444;border-color:rgba(239,68,68,0.4);">🔥 3.9L TWIN-TURBO V8 (710 HP)</span><span class="xray-plus">+</span><span class="xray-badge" style="color:#00e5ff;border-color:rgba(0,229,255,0.4);">💨 F1 S-DUCT DOWNFORCE</span><span class="xray-equals">=</span><span class="xray-badge" style="color:#f8cc00;border-color:rgba(248,204,0,0.5);font-weight:800;">🏆 2.85s 0-60 (TRACK SPECIAL)</span>'
    },
    hotspots: [
      {
        id: 'pista-engine',
        system: 'engine',
        title: '3.9L Twin-Turbocharged V8 (F154 CD)',
        titleTh: 'เครื่องยนต์ 3.9 ลิตร ทวินเทอร์โบ V8 (F154 CD)',
        coords: new THREE.Vector3(0, 0.65, 0.55),
        camPos: new THREE.Vector3(1.6, 1.7, 1.6),
        camTarget: new THREE.Vector3(0, 0.65, 0.55),
        specs: ['710 HP @ 8,000 RPM', '770 Nm Torque', 'Titanium Connecting Rods', '4x International Engine of Year Winner'],
        desc: 'The most powerful V8 engine in Ferrari history at launch. Derived from the 488 Challenge race car with titanium connecting rods and carbon-fiber plenum.',
        descTh: 'เครื่องยนต์ V8 เจ้าของรางวัล International Engine of the Year 4 ปีซ้อน ก้านสูบไทเทเนียมและท่อไอดีคาร์บอนไฟเบอร์ถ่ายทอดจากรถแข่ง Challenge'
      },
      {
        id: 's-duct',
        system: 'aero',
        title: 'Formula 1 Patented Front S-Duct',
        titleTh: 'ช่องลม S-Duct ด้านหน้าตามหลักอากาศพลศาสตร์ Formula 1',
        coords: new THREE.Vector3(0, 0.38, -1.75),
        camPos: new THREE.Vector3(0, 1.4, -2.4),
        camTarget: new THREE.Vector3(0, 0.38, -1.75),
        specs: ['Air Intake Through Front Bumper', 'Exhausts Over Front Bonnet', '+18% Front Downforce', 'Derived from F1 Racing Aerodynamics'],
        desc: 'Air entering the front bumper is accelerated through an upward-curved S-shaped duct and exits through a scoop on the hood, creating massive suction on the front axle.',
        descTh: 'อากาศจากกันชนหน้าจะถูกเร่งความเร็วผ่านท่อทรง S แล้วพ่นออกทางฝากระโปรงหน้า สร้างแรงกดให้ล้อคู่หน้าเกาะถนนอย่างมั่นคง'
      },
      {
        id: 'blown-spoiler',
        system: 'aero',
        title: 'Suspended Blown Rear Spoiler & Diffusers',
        titleTh: 'สปอยเลอร์หลังแบบ Blown Spoiler และครีบดิฟฟิวเซอร์',
        coords: new THREE.Vector3(0, 0.74, 1.95),
        camPos: new THREE.Vector3(-1.6, 1.3, 2.6),
        camTarget: new THREE.Vector3(0, 0.74, 1.95),
        specs: ['Air Enters Rear Deck Vent', 'Blown Out Below Trailing Lip', '+20% Rear Downforce', 'Dual High-Mounted Exhaust Outlets'],
        desc: 'Air passes beneath the spoiler through an engineered slot to extract suction from the underbody diffusers, maintaining stability at 200+ MPH.',
        descTh: 'อากาศจะไหลลอดใต้สปอยเลอร์ช่วยดึงกระแสลมจากดิฟฟิวเซอร์ใต้ท้องรถ เพิ่มแรงกดส่วนท้าย 20% โดยไม่ต้องติดปีกสูง'
      },
      {
        id: 'weight-reduction',
        system: 'chassis',
        title: 'Extreme 90 kg Weight Reduction Program',
        titleTh: 'โปรแกรมลดน้ำหนักตัวถังลง 90 กิโลกรัม',
        coords: new THREE.Vector3(0, 0.50, 0.0),
        camPos: new THREE.Vector3(2.0, 1.5, 0.0),
        camTarget: new THREE.Vector3(0, 0.50, 0.0),
        specs: ['Carbon-Fiber Bonnet, Bumpers & Wing', 'Lexan Rear Window', 'Carbon-Fiber Wheels Option', '1,280 kg Dry Weight'],
        desc: 'Extensive use of motorsport carbon fiber cuts 90 kg compared to the 488 GTB, achieving a weight-to-power ratio of 1.78 kg/HP.',
        descTh: 'ใช้วัสดุคาร์บอนไฟเบอร์รอบคัน กระจกหลัง Lexan ทำให้น้ำหนักตัวถังเปล่าลดลงเหลือ 1,280 กก. อัตราส่วนน้ำหนักต่อแรงม้าเพียง 1.78 กก./แรงม้า'
      },
      {
        id: 'side-slip-control',
        system: 'chassis',
        title: 'Side Slip Angle Control (SSC 6.0)',
        titleTh: 'ระบบควบคุมมุมดริฟต์และสลิป Side Slip Control 6.0',
        coords: new THREE.Vector3(0, 0.35, 1.25),
        camPos: new THREE.Vector3(1.6, 0.9, 1.5),
        camTarget: new THREE.Vector3(0, 0.35, 1.25),
        specs: ['Ferrari Dynamic Enhancer (FDE)', 'Automatic Caliper Pressure Modulation', 'Predictive Handling Algorithms', 'Effortless Track Drifting'],
        desc: 'Uses Ferrari Dynamic Enhancer software to micro-adjust brake caliper pressure on individual wheels, allowing drivers to hold controllable drifts on limit.',
        descTh: 'ระบบประมวลผลอัจฉริยะที่ช่วยปรับแรงดันเบรกของแต่ละล้ออย่างละเอียดในเสี้ยววินาที ช่วยให้ผู้ขับควบคุมรถขณะดริฟต์ได้อย่างมั่นใจ'
      },
      {
        id: 'carbon-rims',
        system: 'chassis',
        title: 'Ultra-Lightweight 20-inch Carbon-Fiber Wheels',
        titleTh: 'ล้อแม็กผลิตจากคาร์บอนไฟเบอร์แท้ขนาด 20 นิ้ว',
        coords: new THREE.Vector3(0.78, 0.35, -1.25),
        camPos: new THREE.Vector3(1.4, 0.5, -1.25),
        camTarget: new THREE.Vector3(0.78, 0.35, -1.25),
        specs: ['-40% Lighter than Alloy Wheels', 'Aerospace Aerospace Resin', 'White Michelin Cup 2 R Rubber', 'Reduced Rotational Inertia'],
        desc: 'First time Ferrari offered full one-piece carbon wheels, reducing un-sprung weight by 40% for lightning-fast suspension response.',
        descTh: 'ครั้งแรกที่ Ferrari นำเสนอออปชันล้อคาร์บอนไฟเบอร์ทั้งวง ลดน้ำหนักได้ถึง 40% ช่วยให้ช่วงล่างตอบสนองได้ว่องไวไร้ความเฉื่อย'
      }
    ]
  },
  {
    id: 'testarossa',
    name: 'Ferrari Testarossa',
    titleHtml: 'FERRARI <span>TESTAROSSA</span> 180° FLAT-12',
    year: '1984 80s ICON',
    category: '1980s Pop-Culture & Grand Touring Icon',
    badge: '5.0L FLAT-12',
    badgeColor: '#f8cc00',
    xrayLabel: 'Flat-12 X-Ray',
    heroColor: '#e61d24',
    engineType: 'flat12',
    hasElectricWhine: false,
    specs: {
      hp: '385 HP',
      hpSub: 'At 6,300 RPM',
      engine: '4.9L Flat-12',
      engineSub: '48 Valves Redhead',
      motors: 'MANUAL',
      motorsSub: '5-Speed Gated',
      accel: '5.2s',
      accelSub: '0-60 MPH',
      speed: '180 MPH',
      speedSub: 'Top Speed',
      downforce: 'LOW DRAG'
    },
    launch: {
      duration: 5200,
      targetTime: '5.20s',
      maxG: 0.95,
      drivetrain: 'RWD',
      drivetrainDesc: 'Gated 5-Speed Transaxle'
    },
    sound: {
      baseFreq: 40,
      maxFreq: 165,
      hasElectricWhine: false,
      volume: 0.25
    },
    aero: {
      device: 'Side Radiator Strakes ("Egg-Slicer")',
      downforceKg: '180 MPH HIGH SPEED STABILITY',
      initialValue: 0.5
    },
    xrayPill: {
      html: '<span class="xray-badge" style="color:#f8cc00;border-color:rgba(248,204,0,0.4);">🔥 4.9L 180° FLAT-12 (385 HP)</span><span class="xray-plus">+</span><span class="xray-badge" style="color:#cbd5e1;border-color:rgba(203,213,225,0.4);">❄️ DUAL SIDE RADIATORS</span><span class="xray-equals">=</span><span class="xray-badge" style="color:#ef4444;border-color:rgba(239,68,68,0.5);font-weight:800;">🏆 1980s POP CULTURE ICON</span>'
    },
    hotspots: [
      {
        id: 'flat-12-engine',
        system: 'engine',
        title: '4.9L 180° Flat-12 (Tipo 113) "Testa Rossa"',
        titleTh: 'เครื่องยนต์ 4.9 ลิตร 180° Flat-12 (ฝาสูบแดง Testa Rossa)',
        coords: new THREE.Vector3(0, 0.62, 0.65),
        camPos: new THREE.Vector3(1.6, 1.7, 1.8),
        camTarget: new THREE.Vector3(0, 0.62, 0.65),
        specs: ['385 HP @ 6,300 RPM', '490 Nm Torque', '48 Valves (4 Per Cyl)', 'Red Camshaft Covers ("Testarossa")'],
        desc: 'Named "Testarossa" (Red Head) for its brilliant red camshaft covers. The 180° Flat-12 engine has a low center of gravity and distinctive harmonic purr.',
        descTh: 'ที่มาของชื่อ "Testarossa" (หัวแดง) มาจากฝาสูบเครื่องยนต์พ่นสีแดง บล็อกเครื่อง 12 สูบนอน 180 องศา จุดศูนย์ถ่วงต่ำ เสียงคำรามอันไพเราะ'
      },
      {
        id: 'side-strakes',
        system: 'aero',
        title: 'Iconic Side Radiator Strakes ("Egg Slicers")',
        titleTh: 'ครีบรีดอากาศข้างประตูระดับตำนาน ("Egg Slicer")',
        coords: new THREE.Vector3(0.85, 0.45, 0.40),
        camPos: new THREE.Vector3(1.8, 0.9, 0.5),
        camTarget: new THREE.Vector3(0.85, 0.45, 0.40),
        specs: ['Pininfarina Masterstroke', 'Mandated by Safety Regulations', 'Feeds Dual Side-Mounted Radiators', 'Miami Vice Cultural Symbol'],
        desc: 'To keep the cabin cool, radiators were relocated to the sides. Pininfarina added the horizontal slats to comply with laws prohibiting large open holes on cars.',
        descTh: 'เพื่อแก้ปัญหาห้องโดยสารร้อน จึงย้ายหม้อน้ำมาไว้ด้านข้าง และออกแบบครีบรีดอากาศแนวนอนตามกฎหมายความปลอดภัย กลายเป็นสัญลักษณ์ยุค 80s'
      },
      {
        id: 'pop-up-lights',
        system: 'chassis',
        title: 'Retractable Pop-Up Headlights',
        titleTh: 'ไฟหน้าแบบพับเก็บได้ (Pop-Up Headlights)',
        coords: new THREE.Vector3(0.55, 0.42, -1.8),
        camPos: new THREE.Vector3(1.4, 0.8, -2.1),
        camTarget: new THREE.Vector3(0.55, 0.42, -1.8),
        specs: ['Dual Electric Actuators', 'Ultra-Low Nose Profile When Retracted', 'Classic Wedge Styling', 'Carello Halogen Lamps'],
        desc: 'The retractable headlamps allowed Pininfarina to design an ultra-low, aerodynamic wedge front end without compromising nighttime visibility.',
        descTh: 'ไฟหน้าพับเก็บได้ด้วยระบบมอเตอร์ไฟฟ้า ช่วยให้ส่วนหน้ารถลาดต่ำลู่ลมได้เต็มที่ในเวลากลางวัน และเปิดขึ้นส่องสว่างในเวลากลางคืน'
      },
      {
        id: 'wide-rear-track',
        system: 'chassis',
        title: 'Ultra-Wide 1,976 mm Rear Track Haunches',
        titleTh: 'ซุ้มล้อหลังกว้างพิเศษ 1,976 มม. บรรจุหม้อน้ำคู่',
        coords: new THREE.Vector3(0.82, 0.48, 1.45),
        camPos: new THREE.Vector3(1.8, 1.2, 1.8),
        camTarget: new THREE.Vector3(0.82, 0.48, 1.45),
        specs: ['1,976 mm Overall Width', 'Accommodates Side Radiators', 'Trapezoidal Wedge Profile', 'No Rear Wing Required'],
        desc: 'The dramatic wedge shape expands toward the rear to house the radiators, creating an unmistakable aggressive road presence without needing a rear wing.',
        descTh: 'รูปทรงลิ่มขยายกว้างออกทางด้านท้ายเพื่อรองรับหม้อน้ำคู่ ทำให้ตัวรถมีรูปทรงสปอร์ตโดดเด่นและทรงตัวได้ดีเยี่ยมโดยไม่ต้องติดปีกหลัง'
      },
      {
        id: 'single-mirror',
        system: 'chassis',
        title: 'Original "Monospecchio" High-Mounted Mirror',
        titleTh: 'กระจกมองข้างเดี่ยวทรงสูง "Monospecchio"',
        coords: new THREE.Vector3(-0.75, 0.72, -0.45),
        camPos: new THREE.Vector3(-1.4, 1.1, -0.45),
        camTarget: new THREE.Vector3(-0.75, 0.72, -0.45),
        specs: ['Mounted High on A-Pillar', 'Overcame High Rear Fender Blindspot', 'Sought-After Collector Trait', 'Single Driver-Side Only'],
        desc: 'Early models had only one mirror mounted high on the A-pillar to allow the driver to see over the towering rear haunches, becoming a collector sensation.',
        descTh: 'ในรุ่นแรก กระจกมองข้างถูกติดตั้งสูงบนเสา A ฝั่งคนขับ เพื่อให้มองข้ามซุ้มล้อหลังขนาดใหญ่ได้ กลายเป็นเอกลักษณ์ที่นักสะสมตามหา'
      },
      {
        id: 'rear-louvers',
        system: 'aero',
        title: 'Full-Width Black Rear Grille & Slotted Taillights',
        titleTh: 'กระจังหลังซี่ระแนงสีดำพาดเต็มคันพร้อมไฟท้ายซ่อน',
        coords: new THREE.Vector3(0, 0.48, 2.15),
        camPos: new THREE.Vector3(0, 1.1, 2.7),
        camTarget: new THREE.Vector3(0, 0.48, 2.15),
        specs: ['Heat Dissipation From Engine Bay', 'Hidden Integrated Taillights', 'Black Horizontal Slats', 'Quad Chrome Exhausts'],
        desc: 'Black horizontal slats run completely across the rear, concealing the rectangular taillights and allowing cooling air to escape from the 5.0L engine bay.',
        descTh: 'แถบระแนงสีดำพาดตลอดความกว้างด้านท้าย ซ่อนไฟท้ายทรงสี่เหลี่ยมไว้ด้านใน ช่วยระบายความร้อนสะสมออกจากห้องเครื่องยนต์'
      }
    ]
  },
  {
    id: 'gto250',
    name: 'Ferrari 250 GTO',
    titleHtml: 'FERRARI <span>250 GTO</span> VINTAGE',
    year: '1962 LEGEND',
    category: 'Vintage Homologation Masterpiece',
    badge: 'COLOMBO V12',
    badgeColor: '#e61d24',
    xrayLabel: 'Colombo V12 X-Ray',
    heroColor: '#e61d24',
    engineType: 'v12_classic',
    hasElectricWhine: false,
    specs: {
      hp: '296 HP',
      hpSub: 'At 7,500 RPM',
      engine: '3.0L V12',
      engineSub: 'Gioacchino Colombo',
      motors: 'MANUAL',
      motorsSub: '5-Speed Synchro',
      accel: '5.4s',
      accelSub: '0-60 MPH',
      speed: '174 MPH',
      speedSub: 'Top Speed',
      downforce: 'HISTORIC AERO'
    },
    launch: {
      duration: 5400,
      targetTime: '5.40s',
      maxG: 0.90,
      drivetrain: 'RWD',
      drivetrainDesc: '5-Speed Manual Gated'
    },
    sound: {
      baseFreq: 52,
      maxFreq: 200,
      hasElectricWhine: false,
      volume: 0.23
    },
    aero: {
      device: 'Triple D-Intakes & Kamm Ducktail Spoiler',
      downforceKg: '1960s WIND TUNNEL AERO',
      initialValue: 0.4
    },
    xrayPill: {
      html: '<span class="xray-badge" style="color:#f87171;border-color:rgba(239,68,68,0.4);">🔥 3.0L COLOMBO V12 (296 HP)</span><span class="xray-plus">+</span><span class="xray-badge" style="color:#f8cc00;border-color:rgba(248,204,0,0.4);">⛽ 6 WEBER TWIN-CHOKES</span><span class="xray-equals">=</span><span class="xray-badge" style="color:#00e5ff;border-color:rgba(0,229,255,0.5);font-weight:800;">🏆 $70M+ COLLECTOR MASTERPIECE</span>'
    },
    hotspots: [
      {
        id: 'colombo-v12',
        system: 'engine',
        title: '3.0L Colombo Tipo 168/62 Comp V12',
        titleTh: 'เครื่องยนต์ 3.0 ลิตร Colombo V12 (Tipo 168/62)',
        coords: new THREE.Vector3(0, 0.62, -0.65),
        camPos: new THREE.Vector3(1.5, 1.5, -0.5),
        camTarget: new THREE.Vector3(0, 0.62, -0.65),
        specs: ['296 HP @ 7,500 RPM', '6 Twin-Choke Weber Carburetors', 'Dry Sump Lubrication', 'Aluminum Block & Cylinder Heads'],
        desc: 'Engineered by Gioacchino Colombo. A pure racing V12 breathing through 6 twin-choke Weber carburetors, winning the FIA GT World Championship three years in a row.',
        descTh: 'เครื่องยนต์ในตำนานของ Gioacchino Colombo บล็อก V12 แคมเดี่ยว จ่ายน้ำมันด้วยคาร์บูเรเตอร์ Weber 6 ตัว คว้าแชมป์โลก GT 3 ปีซ้อน'
      },
      {
        id: 'triple-d-intakes',
        system: 'aero',
        title: 'Removable D-Shaped Nose Air Intakes',
        titleTh: 'ช่องดักลมหน้ารูปตัว D ถอดฝาปิดได้ 3 ช่อง',
        coords: new THREE.Vector3(0, 0.48, -2.15),
        camPos: new THREE.Vector3(0, 1.2, -2.7),
        camTarget: new THREE.Vector3(0, 0.48, -2.15),
        specs: ['Removable Cover Plates', 'Adjusted for Ambient Racing Temps', 'Hand-Hammered Aluminum', 'Giotto Bizzarrini Aero'],
        desc: 'The three D-shaped openings on the nose could be opened or sealed with bolted covers depending on track temperature and cooling requirements.',
        descTh: 'ช่องดักลมรูปตัว D สามช่องบนฝากระโปรงหน้า สามารถถอดหรือขันฝาปิดได้ตามอุณหภูมิสนามแข่ง เคาะขึ้นรูปด้วยมือจากอะลูมิเนียม'
      },
      {
        id: 'kamm-tail',
        system: 'aero',
        title: 'Wind Tunnel Tested Kamm-Tail & Ducktail Spoiler',
        titleTh: 'บั้นท้ายตัดแบบ Kamm-Tail และสปอยเลอร์หางเป็ด',
        coords: new THREE.Vector3(0, 0.72, 2.05),
        camPos: new THREE.Vector3(-1.5, 1.3, 2.6),
        camTarget: new THREE.Vector3(0, 0.72, 2.05),
        specs: ['Kamm Effect Aerodynamics', 'Integrated Rear Lip Spoiler', 'Tested in Pisa University Wind Tunnel', 'Zero Tail Lift at Speed'],
        desc: 'Developed in a university wind tunnel, the abruptly chopped Kamm tail and upturned ducktail spoiler neutralized high-speed rear lift down the Mulsanne Straight.',
        descTh: 'พัฒนาขึ้นในอุโมงค์ลม มหาวิทยาลัยปิซา บั้นท้ายตัดตามหลัก Kamm Effect พร้อมตวัดปลายหางเป็ด ช่วยลดแรงยกตัวขณะทำความเร็วบนทางตรงเลอม็อง'
      },
      {
        id: 'scaglietti-body',
        system: 'chassis',
        title: 'Hand-Beaten Scaglietti Aluminum Bodywork',
        titleTh: 'ตัวถังอะลูมิเนียมเคาะขึ้นรูปด้วยมือจากสำนัก Scaglietti',
        coords: new THREE.Vector3(0.68, 0.52, 0.2),
        camPos: new THREE.Vector3(1.8, 1.2, 0.2),
        camTarget: new THREE.Vector3(0.68, 0.52, 0.2),
        specs: ['Only 36 Units Ever Produced', 'No Two Cars Are Exactly Alike', 'Tubular Steel Chassis', 'Weighs Just 880 kg'],
        desc: 'Hammered over wooden bucks by master craftsmen at Carrozzeria Scaglietti. Only 36 units were ever built, making each car an irreplaceable work of rolling art.',
        descTh: 'เคาะขึ้นรูปด้วยมือจากแผ่นอะลูมิเนียมโดยช่างฝีมือ Scaglietti ผลิตเพียง 36 คันในโลก แต่ละคันมีเอกลักษณ์เฉพาะตัว น้ำหนักเบาเพียง 880 กก.'
      },
      {
        id: 'borrani-wires',
        system: 'chassis',
        title: 'Borrani Knock-Off Wire Wheels',
        titleTh: 'ล้อซี่ลวด Borrani ถอดเร็วด้วยค้อนเคาะดุม (Knock-Off)',
        coords: new THREE.Vector3(0.74, 0.35, -1.25),
        camPos: new THREE.Vector3(1.4, 0.5, -1.25),
        camTarget: new THREE.Vector3(0.74, 0.35, -1.25),
        specs: ['Hand-Laced Wire Spokes', 'Central Winged Spinner Nut', 'Rapid Pit Stop Swapping', 'Borrani Milano Heritage'],
        desc: 'Classic Italian Borrani wire wheels with hand-laced spokes and a single winged central knock-off spinner, designed for rapid wheel changes during pit stops.',
        descTh: 'ล้อซี่ลวด Borrani สุดคลาสสิกจากมิลาน ถอดเปลี่ยนได้รวดเร็วในพิตสต็อปด้วยการเคาะปีกดุมกลาง (Winged Spinner)'
      },
      {
        id: 'vintage-cockpit',
        system: 'chassis',
        title: 'Stripped Racing Cockpit with Blue Cloth Seats',
        titleTh: 'ห้องโดยสารนักแข่งสายพันธุ์แท้ เบาะผ้าสีน้ำเงิน',
        coords: new THREE.Vector3(0, 0.58, -0.1),
        camPos: new THREE.Vector3(0.5, 1.1, -0.1),
        camTarget: new THREE.Vector3(0, 0.56, -0.1),
        specs: ['Wood-Rimmed Nardi Steering Wheel', 'Exposed Gated Gearshift', 'No Speedometer (Tachometer Centered)', 'Pure Racing Functionality'],
        desc: 'A sparse competition interior with bare metal floors, a wood-rimmed Nardi steering wheel, and an instrument cluster dominated solely by the rev counter.',
        descTh: 'ห้องโดยสารรถแข่งขนานแท้ พื้นโลหะเปลือย พวงมาลัย Nardi ก้านไม้ และหน้าปัดวัดรอบเครื่องยนต์ตรงกลางโดยไม่มีมาตรวัดความเร็ว'
      }
    ]
  },
  {
    id: 'superfast812',
    name: 'Ferrari 812 Superfast',
    titleHtml: 'FERRARI <span>812</span> SUPERFAST',
    year: '2017 V12 GT',
    category: 'Front-Mid Atmospheric V12 Flagship',
    badge: '6.5L V12 789 HP',
    badgeColor: '#fbbf24',
    xrayLabel: 'V12 X-Ray',
    heroColor: '#e61d24',
    engineType: 'v12_na',
    hasElectricWhine: false,
    specs: {
      hp: '789 HP',
      hpSub: 'At 8,500 RPM',
      engine: '6.5L V12',
      engineSub: 'Front-Mid NA',
      motors: 'VIRTUAL',
      motorsSub: 'Rear-Wheel Steering',
      accel: '2.9s',
      accelSub: '0-60 MPH',
      speed: '211 MPH',
      speedSub: 'Top Speed',
      downforce: '210 KG'
    },
    launch: {
      duration: 2900,
      targetTime: '2.90s',
      maxG: 1.25,
      drivetrain: 'RWD',
      drivetrainDesc: '7-Speed Dual Clutch'
    },
    sound: {
      baseFreq: 56,
      maxFreq: 235,
      hasElectricWhine: false,
      volume: 0.25
    },
    aero: {
      device: 'Active Front Underbody & Aerodynamic Rear Ducts',
      downforceKg: '210 KG DOWNFORCE',
      initialValue: 0.8
    },
    xrayPill: {
      html: '<span class="xray-badge" style="color:#fbbf24;border-color:rgba(245,158,11,0.4);">🔥 6.5L 65° V12 NA (789 HP)</span><span class="xray-plus">+</span><span class="xray-badge" style="color:#00e5ff;border-color:rgba(0,229,255,0.4);">🔄 4-WHEEL STEERING (PCV 2.0)</span><span class="xray-equals">=</span><span class="xray-badge" style="color:#e61d24;border-color:rgba(230,29,36,0.5);font-weight:800;">🏆 211 MPH V12 FLAGSHIP</span>'
    },
    hotspots: [
      {
        id: 'superfast-v12',
        system: 'engine',
        title: '6.5L Naturally Aspirated 65° V12 (Tipo F140 GA)',
        titleTh: 'เครื่องยนต์ 6.5 ลิตร V12 ไร้ระบบอัดอากาศ (F140 GA)',
        coords: new THREE.Vector3(0, 0.65, -0.60),
        camPos: new THREE.Vector3(1.6, 1.7, -0.4),
        camTarget: new THREE.Vector3(0, 0.65, -0.60),
        specs: ['789 HP @ 8,500 RPM', '718 Nm Torque @ 7,000 RPM', '350-bar Direct Injection', 'Most Powerful Production NA V12'],
        desc: 'The most powerful naturally aspirated production engine in the world upon release, displacing a colossal 6.5 liters and revving to 8,900 RPM.',
        descTh: 'เครื่องยนต์ V12 ไร้ระบบอัดอากาศขนาด 6.5 ลิตร ที่ทรงพลังที่สุดในสายการผลิต 789 แรงม้า พร้อมระบบฉีดตรงแรงดันสูง 350 บาร์'
      },
      {
        id: 'rear-steering',
        system: 'chassis',
        title: 'Virtual Short Wheelbase 2.0 (Rear-Wheel Steering)',
        titleTh: 'ระบบเลี้ยวล้อหลัง Virtual Short Wheelbase 2.0',
        coords: new THREE.Vector3(0, 0.38, 1.25),
        camPos: new THREE.Vector3(-1.6, 1.0, 1.6),
        camTarget: new THREE.Vector3(0, 0.38, 1.25),
        specs: ['Active Rear Wheel Steering Angle', 'Simulates Shorter Wheelbase in Tight Corners', 'Extends Wheelbase for High-Speed Stability', 'Integrated with Electric Power Steering'],
        desc: 'Electric actuators pivot the rear wheels to make this massive front-engine GT feel as nimble as a mid-engine lightweight sports car through hairpins.',
        descTh: 'ระบบบังคับเลี้ยวล้อหลังด้วยมอเตอร์ไฟฟ้า ช่วยให้รถเลี้ยวเข้าโค้งแคบได้คล่องตัวเหมือนรถฐานล้อสั้น และนิ่งมั่นคงในความเร็วสูง'
      },
      {
        id: 'active-front-flaps',
        system: 'aero',
        title: 'Active Aerodynamic Underbody Flaps',
        titleTh: 'ครีบแอโรไดนามิกใต้ท้องรถเปิด-ปิดอัตโนมัติ',
        coords: new THREE.Vector3(0, 0.22, -1.95),
        camPos: new THREE.Vector3(-1.5, 0.6, -2.2),
        camTarget: new THREE.Vector3(0, 0.22, -1.95),
        specs: ['Open at 180 km/h (112 MPH)', 'Channels Airflow to Underfloor Diffusers', 'Reduces Drag on High-Speed Runs', 'Maintains Front Axle Balance'],
        desc: 'Mechanical flaps beneath the front splitter open at 180 km/h using aerodynamic pressure alone to bleed off excess drag on high-speed Autobahn sprints.',
        descTh: 'ครีบใต้ท้องรถส่วนหน้าเปิดออกอัตโนมัติที่ความเร็ว 180 กม./ชม. ด้วยแรงดันลม ช่วยลดแรงต้านอากาศในความเร็วสูง'
      },
      {
        id: 'tail-bypass-ducts',
        system: 'aero',
        title: 'Aerodynamic Bypass Ducts Around Taillights',
        titleTh: 'ช่องลมบายพาสทะลุไฟท้ายลดกระแสลมหมุนวน',
        coords: new THREE.Vector3(0.72, 0.65, 1.85),
        camPos: new THREE.Vector3(1.5, 1.1, 2.0),
        camTarget: new THREE.Vector3(0.72, 0.65, 1.85),
        specs: ['Air Inlets Behind Rear Quarter Windows', 'Exits Beside Round Taillights', 'Relieves Pressure in Wheel Arches', 'Increases Rear Downforce'],
        desc: 'Air is swallowed near the rear windows and routed cleanly through channels flanking the circular taillights to eliminate turbulent drag behind the car.',
        descTh: 'ช่องดักลมข้างกระจกหลังจะส่งกระแสลมลอดผ่านช่องข้างไฟท้าย ช่วยสลายลมหมุนวนด้านหลังรถและเพิ่มแรงกด'
      },
      {
        id: 'fastback-silhouette',
        system: 'chassis',
        title: 'High-Tail Fastback Silhouette & Quad Exhausts',
        titleTh: 'ทรงท้ายลาด Fastback ย้อนยุค Daytona 365 GTB/4',
        coords: new THREE.Vector3(0, 0.65, 1.40),
        camPos: new THREE.Vector3(1.8, 1.4, 1.6),
        camTarget: new THREE.Vector3(0, 0.65, 1.40),
        specs: ['Homage to 1969 Ferrari 365 GTB4 Daytona', 'Muscular Rear Wheel Arches', 'Quad Circular Tail Lights', 'Quad Chrome Exhaust Tips'],
        desc: 'Designed by Ferrari Styling Centre, drawing timeless inspiration from the iconic 1969 365 GTB/4 Daytona fastback racer.',
        descTh: 'ออกแบบโดย Ferrari Styling Centre ถ่ายทอดความงามคลาสสิกของรถแข่ง 365 GTB/4 Daytona ในอดีต พร้อมไฟท้ายกลมคู่และท่อไอเสีย 4 ท่อ'
      },
      {
        id: 'eps-steering',
        system: 'chassis',
        title: 'Ferrari First Electric Power Steering (EPS)',
        titleTh: 'พวงมาลัยไฟฟ้า EPS ตัวแรกในประวัติศาสตร์ Ferrari',
        coords: new THREE.Vector3(0, 0.55, -0.2),
        camPos: new THREE.Vector3(0.5, 1.1, -0.2),
        camTarget: new THREE.Vector3(0, 0.52, -0.2),
        specs: ['Ferrari Peak Performance (FPP) Feedback', 'Ferrari Power Oversteer (FPO) Countersteering Assistance', 'Instant Wheel Feedback', 'Integrated with SSC 5.0'],
        desc: 'The first Ferrari to employ electric power steering, programmed with patented algorithms that gently nudge the steering wheel to help the driver catch oversteer slides.',
        descTh: 'Ferrari รุ่นแรกที่ใช้พวงมาลัยไฟฟ้า พร้อมระบบช่วยเตือนและสร้างแรงต้านที่พวงมาลัยเพื่อช่วยผู้ขับแก้อาการปัดเป๋ายามท้ายปัด (Oversteer)'
      }
    ]
  },
  {
    id: 'roma',
    name: 'Ferrari Roma',
    titleHtml: 'FERRARI <span>ROMA</span> COUPE',
    year: '2020 MODERN GT',
    category: 'La Nuova Dolce Vita Grand Tourer',
    badge: '3.9L TURBO V8',
    badgeColor: '#10b981',
    xrayLabel: 'Turbo V8 X-Ray',
    heroColor: '#e61d24',
    engineType: 'v8_turbo',
    hasElectricWhine: false,
    specs: {
      hp: '612 HP',
      hpSub: 'At 7,500 RPM',
      engine: '3.9L V8',
      engineSub: 'Twin-Turbocharged',
      motors: '8-SPEED',
      motorsSub: 'F1 Dual Clutch (SF90)',
      accel: '3.4s',
      accelSub: '0-60 MPH',
      speed: '199 MPH',
      speedSub: 'Top Speed',
      downforce: '95 KG'
    },
    launch: {
      duration: 3400,
      targetTime: '3.40s',
      maxG: 1.18,
      drivetrain: 'RWD',
      drivetrainDesc: 'Variable Boost 8-Speed DCT'
    },
    sound: {
      baseFreq: 44,
      maxFreq: 180,
      hasElectricWhine: false,
      volume: 0.23
    },
    aero: {
      device: 'Mobile Active Rear Spoiler (3 Deploy Modes)',
      downforceKg: '95 KG DOWNFORCE @ 250 KM/H',
      initialValue: 0.6
    },
    xrayPill: {
      html: '<span class="xray-badge" style="color:#10b981;border-color:rgba(16,185,129,0.4);">🔥 3.9L TWIN-TURBO V8 (612 HP)</span><span class="xray-plus">+</span><span class="xray-badge" style="color:#00e5ff;border-color:rgba(0,229,255,0.4);">⚙️ 8-SPEED DCT (SF90 DERIVED)</span><span class="xray-equals">=</span><span class="xray-badge" style="color:#fbbf24;border-color:rgba(245,158,11,0.5);font-weight:800;">🏆 LA NUOVA DOLCE VITA GT</span>'
    },
    hotspots: [
      {
        id: 'roma-engine',
        system: 'engine',
        title: '3.9L 90° Twin-Turbo V8 (F154 Family)',
        titleTh: 'เครื่องยนต์ 3.9 ลิตร ทวินเทอร์โบ V8 (ตระกูล F154)',
        coords: new THREE.Vector3(0, 0.62, -0.65),
        camPos: new THREE.Vector3(1.6, 1.6, -0.4),
        camTarget: new THREE.Vector3(0, 0.62, -0.65),
        specs: ['612 HP @ 7,500 RPM', '760 Nm Torque @ 3,000-5,750 RPM', 'Gasoline Particulate Filter (GPF)', 'Redesigned Cam Profiles'],
        desc: 'Mounted in the front-mid position for a 50:50 weight balance. Features redesigned cam profiles and a turbo speed sensor that spins up to 165,000 RPM.',
        descTh: 'วางตำแหน่งเครื่องยนต์แบบ Front-Mid เพื่อการกระจายน้ำหนักหน้า-หลัง 50:50 เทอร์โบชาร์จเจอร์หมุนรอบจัด 165,000 รอบ/นาที'
      },
      {
        id: 'shark-nose-grille',
        system: 'aero',
        title: 'Monolithic Perforated Shark-Nose Grille',
        titleTh: 'กระจังหน้าชิ้นเดียวทรงฉลามแบบฉลุตาข่ายโมเดิร์น',
        coords: new THREE.Vector3(0, 0.38, -2.15),
        camPos: new THREE.Vector3(0, 1.0, -2.7),
        camTarget: new THREE.Vector3(0, 0.38, -2.15),
        specs: ['Minimalist Italian Sculpture', 'Perforated Body-Colored Surface', 'Eliminated Vents and Trim', 'Pure Form Follows Function'],
        desc: 'Reinterprets 1950s and 60s Ferrari grand tourers with a modern, monolithic radiator grille perforated directly into the painted front bodywork.',
        descTh: 'ตีความเส้นสายรถสปอร์ตยุค 60s สู่ศตวรรษที่ 21 กระจังหน้าฉลุรูบนผิวตัวถังสีเดียวกับตัวรถ ไร้กรอบและสิ่งตกแต่งที่ไม่จำเป็น'
      },
      {
        id: 'active-rear-glass-spoiler',
        system: 'aero',
        title: 'Mobile Active Rear Spoiler Integrated in Rear Screen',
        titleTh: 'สปอยเลอร์หลังแอคทีฟซ่อนแนบเนียนใต้กระจกหลัง',
        coords: new THREE.Vector3(0, 0.72, 1.85),
        camPos: new THREE.Vector3(-1.6, 1.3, 2.5),
        camTarget: new THREE.Vector3(0, 0.72, 1.85),
        specs: ['3 Deploy Angles: LD, MD (30%), HD (135°)', 'Generates 95 kg Downforce @ 250 km/h', 'Flushes Level with Bodywork when Stored', 'Automatic Speed & G-Force Actuation'],
        desc: 'Completely invisible when retracted, the spoiler rises into Medium Downforce or tilts to a steep 135° High Downforce angle during emergency braking.',
        descTh: 'เมื่อพับเก็บจะเรียบเนียนเป็นชิ้นเดียวกับกระจกหลัง และยกตัวขึ้น 3 ระดับอัตโนมัติตามความเร็ว สร้างแรงกดสูงสุด 95 กก.'
      },
      {
        id: 'dual-cockpit',
        system: 'chassis',
        title: 'Dual Cockpit Architecture with 8.4-inch Screen',
        titleTh: 'ห้องโดยสารคู่ Dual Cockpit พร้อมจอกลางแนวตั้ง 8.4 นิ้ว',
        coords: new THREE.Vector3(0, 0.58, -0.15),
        camPos: new THREE.Vector3(0.5, 1.2, -0.15),
        camTarget: new THREE.Vector3(0, 0.55, -0.15),
        specs: ['Symmetrical Driver & Passenger Pods', '16-inch Curved Digital Cluster', 'F1-Style Chrome Gate H-Shifter for Reverse', 'Passenger Touchscreen Option'],
        desc: 'Creates two distinct cells for driver and companion, featuring a 16-inch curved digital instrument cluster and a modern metal gate H-shifter tribute.',
        descTh: 'ออกแบบแยกสัดส่วนชัดเจนระหว่างผู้ขับขี่และผู้โดยสาร หน้าปัดโค้งขนาดใหญ่ 16 นิ้ว พร้อมแป้นเกียร์โลหะจำลองร่องเกียร์กระปุกในอดีต'
      },
      {
        id: 'eight-speed-dct',
        system: 'chassis',
        title: 'Compact 8-Speed Dual-Clutch Transmission (SF90 Shared)',
        titleTh: 'ชุดเกียร์ 8 สปีดคลัตช์คู่ขนาดกะทัดรัด (ถ่ายทอดจาก SF90)',
        coords: new THREE.Vector3(0, 0.38, 1.20),
        camPos: new THREE.Vector3(-1.5, 0.9, 1.5),
        camTarget: new THREE.Vector3(0, 0.38, 1.20),
        specs: ['6 kg Lighter Than Previous 7-Speed', 'Tighter Packaging with Wet Clutch', 'Improved Fuel Efficiency & Rapid Shifts', 'Low Drag Fluid Dynamics'],
        desc: 'Derived from the SF90 Stradale transmission, this ultra-compact 8-speed gearbox reduces weight by 6 kg while providing faster shift execution.',
        descTh: 'ชุดเกียร์ 8 สปีดคลัตช์คู่ที่เบากว่าเกียร์ 7 สปีดเดิม 6 กก. ถ่ายทอดมาจาก SF90 ช่วยให้อัตราทดต่อเนื่องและเปลี่ยนเกียร์ในพริบตา'
      },
      {
        id: 'matrix-lights',
        system: 'chassis',
        title: 'Horizontal Slit Full-LED Headlamps',
        titleTh: 'ไฟหน้า Full-LED เส้นขอบแนวนอนคมกริบ',
        coords: new THREE.Vector3(0.68, 0.44, -1.8),
        camPos: new THREE.Vector3(1.4, 0.8, -1.8),
        camTarget: new THREE.Vector3(0.68, 0.44, -1.8),
        specs: ['Minimalist Horizontal LED Bar', 'Integrated Matrix Adaptive High-Beam', 'Flushed Seamless Body Integration', 'Iconic Lighting Signature'],
        desc: 'A linear horizontal light strip cuts across the headlights, giving the Roma an instantly recognizable nocturnal identity.',
        descTh: 'ไฟหน้า LED เส้นขอบแนวนอนผ่ากลางโคมไฟ สร้างเอกลักษณ์ยามค่ำคืนที่สะกดทุกสายตา'
      }
    ]
  }
];

export function getFerrariModelById(id) {
  return FERRARI_CATALOG.find((m) => m.id === id) || FERRARI_CATALOG[0];
}
