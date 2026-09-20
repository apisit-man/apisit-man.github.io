/**
 * Brain Atlas 3D - Clinical Detective Case Study System
 * Aligned with Secondary Biology (ม.ปลาย ระบบประสาท), AP Biology & Pre-Med Inquiry
 * Features Claim-Evidence-Reasoning (CER) framework, real clinical vignettes, and diagnostic evaluation.
 */

import { BRAIN_STRUCTURES } from './brain-data.js';
import { sound } from './audio.js';

export const CLINICAL_CASES = [
  {
    id: 'case_stroke_broca',
    caseNumber: 1,
    titleTh: 'ผู้บริหารหมดคำพูดกะทันหันกลางห้องประชุม',
    titleEn: 'The Boardroom Executive with Sudden Mutism',
    patientName: 'คุณสมชาย (นาย ก.)',
    age: 58,
    sex: 'ชาย (Male)',
    occupation: 'ผู้บริหารฝ่ายการเงิน (CFO)',
    chiefComplaint: 'พูดไม่ออก สั่งคำไม่ได้ และแขนขวาตกห้อยขณะกำลังพรีเซนต์งาน',
    vitals: {
      bp: '178/104 mmHg',
      hr: '88 bpm',
      rr: '18 /min',
      spo2: '98%',
      temp: '36.8 °C'
    },
    history: 'ผู้ป่วยมีประวัติความดันโลหิตสูงและสูบบุหรี่จัดมานาน 20 ปี แต่ขาดยาต่อเนื่อง 3 เดือน ก่อนมาโรงพยาบาล 45 นาที ขณะกำลังยืนรายงานผลประกอบการ ผู้ป่วยหยุดพูดกะทันหัน ปากเบี้ยว และเอกสารหลุดจากมือขวา ญาติจึงรีบนำส่งห้องฉุกเฉิน (FAST Protocol)',
    physicalExam: [
      {
        system: 'กล้ามเนื้อและการเคลื่อนไหว (Motor)',
        finding: 'แขนขวาอ่อนแรงปานกลาง (Grade 3/5 ยกต้านแรงโน้มถ่วงได้แต่ต้านแรงหมอไม่ได้), ขาขวาเดินลากเล็กน้อย (Grade 4/5), หน้าเบี้ยวปากตกซีกขวา'
      },
      {
        system: 'การพูดและภาษา (Speech & Fluency)',
        finding: 'ไม่สามารถพูดเป็นประโยคได้ พูดได้เพียงคำสั้นๆ ติดขัด เช่น "...น้ำ... ไป..." แต่น่าทึ่งที่ผู้ป่วยเข้าใจคำสั่งที่หมอพูดทุกอย่าง สามารถชู 2 นิ้วและแตะหูซ้ายตามสั่งได้ถูกต้องทันที'
      },
      {
        system: 'ประสาทรับสัมผัส (Sensory)',
        finding: 'การรับความรู้สึกสัมผัสและความเจ็บปวดที่ผิวหนังยังคงปกติทั้งสองซีก'
      },
      {
        system: 'เส้นประสาทสมอง (Cranial Nerves)',
        finding: 'Central Facial Palsy ซีกขวา: รอยยิ้มเบี้ยวซีกขวา มุมปากตก แต่ยังสามารถยักคิ้วและหลับตาแน่นได้ทั้งสองข้าง'
      }
    ],
    targetId: 'frontal_lobe_left',
    targetStructureNameTh: 'สมองกลีบหน้าซีกซ้าย (Left Frontal Lobe / Broca\'s Area)',
    targetStructureNameEn: 'Left Frontal Lobe (Broca\'s Area & M1)',
    mniCoords: [-48, 14, 18],
    slicePos: { axial: 18, coronal: 14, sagittal: -48 },
    cortexPeel: 1.0,
    vascularTerritory: 'Left Middle Cerebral Artery (MCA) Superior Division',
    differentialOptions: [
      { id: 'diag_broca', textTh: 'Left Broca\'s Area Infarct & Contralateral Hemiparesis (หลอดเลือดสมอง MCA แขนงบนซีกซ้ายขาดเลือด)', isCorrect: true },
      { id: 'diag_wernicke', textTh: 'Left Wernicke\'s Receptive Aphasia (หลอดเลือดสมองส่วนขมับขาดเลือด/พูดจาไม่รู้เรื่อง)', isCorrect: false },
      { id: 'diag_cerebellum', textTh: 'Cerebellar Hemorrhage (เลือดออกในสมองน้อย)', isCorrect: false },
      { id: 'diag_parkinson', textTh: 'Early-onset Parkinson\'s Disease (โรคพาร์กินสันระยะแรก)', isCorrect: false }
    ],
    mechanismOptions: [
      { id: 'mech_mca_sup', textTh: 'Left MCA Superior Division Thromboembolism (ลิ่มเลือดอุดกั้นหลอดเลือดแดงสมองส่วนกลางแขนงบน)', isCorrect: true },
      { id: 'mech_pca', textTh: 'Left PCA Occlusion (หลอดเลือดแดงสมองส่วนหลังซีกซ้ายอุดตัน)', isCorrect: false },
      { id: 'mech_basilar', textTh: 'Basilar Artery Thrombosis (หลอดเลือดแดงก้านสมองอุดตัน)', isCorrect: false },
      { id: 'mech_trauma', textTh: 'Blunt Skull Fracture (กะโหลกศีรษะแตกร้าวจากการกระแทก)', isCorrect: false }
    ],
    cer: {
      claimTh: 'ผู้ป่วยมีภาวะขาดเลือดเฉียบพลันที่สมองกลีบหน้าซีกซ้าย (Left Frontal Lobe Infarct / Broca\'s Area) จากการอุดตันของหลอดเลือด Left MCA Superior Division',
      evidenceTh: '1) ผู้ป่วยมีภาวะบกพร่องในการเปล่งเสียงพูดแต่เข้าใจภาษาได้สมบูรณ์ (Expressive Non-fluent Aphasia) ซึ่งตรงกับหน้าที่ของ Broca\'s Area (Brodmann area 44/45)\n2) แขนขวาและใบหน้าล่างขวาอ่อนแรง (Contralateral Hemiparesis) สอดคล้องกับการเรียงตัวของ Motor Homunculus ใน Precentral Gyrus ซีกซ้าย\n3) ภาพตัดขวาง MRI T1 ปรากฏรอยโรค Hypodensity ที่ระนาบพิกัด MNI (-48, 14, 18)',
      reasoningTh: 'หลอดเลือด MCA Superior Division ซีกซ้ายทำหน้าที่หล่อเลี้ยงเปลือกสมองส่วนสั่งการและศูนย์วางแผนการพูด เส้นประสาทสั่งการกล้ามเนื้อ (Corticospinal tract) จะทอดข้ามไปยังร่างกายฝั่งตรงข้ามที่จุดไขว้ปิรามิดในก้านสมอง (Decussation of Pyramids at Medulla) ทำให้รอยโรคในสมองซีกซ้ายแสดงอาการอ่อนแรงที่ร่างกายซีกขวาเสมอ'
    }
  },
  {
    id: 'case_trauma_gage',
    caseNumber: 2,
    titleTh: 'ชะตากรรมของโฟร์แมนรถไฟ: แท่งเหล็กทะลวงกะโหลก',
    titleEn: 'The Railroad Foreman\'s Tamping Iron (Phineas Gage Case)',
    patientName: 'นายฟิเนแอส เกจ (Phineas Gage)',
    age: 25,
    sex: 'ชาย (Male)',
    occupation: 'หัวหน้าคนงานวางรางรถไฟ (Railroad Foreman)',
    chiefComplaint: 'บุคลิกภาพแปรเปลี่ยนเป็นคนละคน ก้าวร้าว ขาดความยับยั้งชั่งใจหลังอุบัติเหตุแท่งเหล็กพุ่งทะลุกะโหลก',
    vitals: {
      bp: '124/78 mmHg',
      hr: '74 bpm',
      rr: '16 /min',
      spo2: '99%',
      temp: '37.0 °C'
    },
    history: 'ขณะกำลังใช้แท่งเหล็กกระทุ้งดินปืนลงในรูก้อนหิน ประกายไฟเกิดปะทุระเบิดขึ้น ส่งผลให้แท่งเหล็กกระทุ้งดิน (ยาว 1.1 เมตร หนัก 6 กก.) พุ่งทะลุใต้โหนกแก้มซ้าย ผ่านด้านหลังเบ้าตา ทะลุสมองกลีบหน้า และพุ่งลอยออกทางยอดกะโหลกศีรษะ ผู้ป่วยรอดชีวิตอย่างไม่น่าเชื่อ แต่เพื่อร่วมงานกล่าวว่า "เกจไม่ใช่เกจคนเดิมอีกต่อไป"',
    physicalExam: [
      {
        system: 'กล้ามเนื้อและการเคลื่อนไหว (Motor)',
        finding: 'กำลังกล้ามเนื้อ 5/5 สมบูรณ์ทั้งตัว แขนขาขยับได้คล่องแคล่ว ไม่มีอาการอัมพาตหรือเดินเซ'
      },
      {
        system: 'การพูดและสติปัญญาพื้นฐาน (Speech & Cognition)',
        finding: 'พูดได้คล่องแคล่ว ไวยากรณ์ถูกต้อง แต่ใช้คำหยาบคาย ด่าทอเพื่อนร่วมงาน และขาดความเกรงใจอย่างรุนแรง'
      },
      {
        system: 'พฤติกรรมและการบริหารจัดการ (Behavior & Executive Function)',
        finding: 'สูญเสียความยับยั้งชั่งใจ (Disinhibition), วางแผนการทำงานล่วงหน้าไม่ได้, ไม่สามารถประเมินผลกระทบของการกระทำตนเองได้, จากเดิมเป็นคนสุภาพ สุขุม และมีภาวะผู้นำ กลายเป็นคนอารมณ์ฉุนเฉียว เอาแต่ใจ'
      },
      {
        system: 'การมองเห็น (Vision)',
        finding: 'ตาซ้ายสูญเสียการมองเห็นเนื่องจากทางเดินแท่งเหล็กทำลายเบ้าตาซ้าย แต่ลานสายตาตาขวาปกติ'
      }
    ],
    targetId: 'frontal_lobe_right',
    targetStructureNameTh: 'สมองกลีบหน้าส่วนหน้า (Prefrontal & Orbitofrontal Cortex)',
    targetStructureNameEn: 'Prefrontal & Orbitofrontal Cortex',
    mniCoords: [24, 48, -8],
    slicePos: { axial: -8, coronal: 48, sagittal: 24 },
    cortexPeel: 1.0,
    vascularTerritory: 'Anterior Cerebral Artery (ACA) / Traumatic Mechanical Laceration',
    differentialOptions: [
      { id: 'diag_prefrontal', textTh: 'Prefrontal & Orbitofrontal Cortex Injury (การบาดเจ็บสมองกลีบหน้าส่วนหน้าและศูนย์บริหารอารมณ์)', isCorrect: true },
      { id: 'diag_occipital', textTh: 'Occipital Lobe Traumatic Blindness (ตาบอดจากการบาดเจ็บสมองท้ายทอย)', isCorrect: false },
      { id: 'diag_medulla', textTh: 'Medullary Vital Center Failure (ก้านสมองส่วนสัญญาณชีพวาย)', isCorrect: false },
      { id: 'diag_parkinson', textTh: 'Basal Ganglia Tremor Disorder (โรคสั่นจากการเสื่อมของเบซัลแกงเกลีย)', isCorrect: false }
    ],
    mechanismOptions: [
      { id: 'mech_penetrating_trauma', textTh: 'Penetrating High-Velocity Mechanical Trauma (วัตถุเจาะทะลุทำลายเนื้อเยื่อเปลือกสมองส่วนหน้า)', isCorrect: true },
      { id: 'mech_thrombus', textTh: 'Atherosclerotic Thrombus (ลิ่มเลือดไขมันอุดตันในหลอดเลือด)', isCorrect: false },
      { id: 'mech_infection', textTh: 'Viral Encephalitis (สมองอักเสบจากเชื้อไวรัส)', isCorrect: false },
      { id: 'mech_aneurysm', textTh: 'Ruptured Saccular Aneurysm (เส้นเลือดโป่งพองแตกในโพรงกะโหลก)', isCorrect: false }
    ],
    cer: {
      claimTh: 'ผู้ป่วยได้รับบาดเจ็บรุนแรงบริเวณสมองกลีบหน้าส่วนหน้า (Prefrontal & Orbitofrontal Cortex) ส่งผลให้เกิดกลุ่มอาการสูญเสียการควบคุมพฤติกรรมและการบริหารจัดการ (Frontal Executive Dysfunction Syndrome)',
      evidenceTh: '1) กำลังกล้ามเนื้อและการเข้าใจภาษายังคงสมบูรณ์ (ไม่มีรอยโรคที่ Motor Cortex หรือ Wernicke)\n2) พฤติกรรมสูญเสียความยับยั้งชั่งใจ (Disinhibition), การตัดสินใจทางสังคมล้มเหลว, และความสามารถในการวางแผนระยะยาวหายไป\n3) วิถีการพุ่งของแท่งเหล็กตัดผ่านเนื้อเยื่อ Ventromedial Prefrontal Cortex และเส้นใยประสาทเชื่อมโยงกับระบบลิมบิก',
      reasoningTh: 'Prefrontal Cortex โดยเฉพาะส่วน Orbitofrontal และ Ventromedial ทำหน้าที่เป็น "ศูนย์ควบคุมบริหารระดับสูง" (Executive Control) ยับยั้งแรงขับอารมณ์ดิบจาก Amygdala และประเมินความเหมาะสมทางศีลธรรมและสังคม เมื่อโครงสร้างนี้ถูกทำลาย สัญชาตญาณอารมณ์จึงไม่ถูกควบคุม แม้สมองส่วนสั่งการกล้ามเนื้อจะไม่เสียหายเลย'
    }
  },
  {
    id: 'case_amnesia_hm',
    caseNumber: 3,
    titleTh: 'บุรุษผู้ติดอยู่ในอดีต: ความจำใหม่ที่ไม่อาจสร้างขึ้น',
    titleEn: 'The Patient Who Cannot Form Tomorrow (Patient H.M.)',
    patientName: 'เฮนรี (ผู้ป่วย H.M.)',
    age: 27,
    sex: 'ชาย (Male)',
    occupation: 'ผู้ป่วยหลังผ่าตัดรักษาโรคลมชัก',
    chiefComplaint: 'ไม่สามารถสร้างความทรงจำใหม่ได้เลยหลังการผ่าตัด แม้เวลาจะผ่านไปเพียง 2-3 นาที',
    vitals: {
      bp: '120/80 mmHg',
      hr: '72 bpm',
      rr: '14 /min',
      spo2: '99%',
      temp: '36.7 °C'
    },
    history: 'ผู้ป่วยมีอาการลมชักรุนแรงตั้งแต่วัยเด็กที่ไม่สามารถควบคุมได้ด้วยยา เพื่อหยุดยั้งจุดกำเนิดคลื่นชัก ศัลยแพทย์ระบบประสาทจึงตัดสินใจผ่าตัดตัดเนื้อสมองกลีบขมับส่วนในทั้งสองข้างออก (Bilateral Medial Temporal Lobectomy) ผลการผ่าตัดสามารถหยุดอาการชักได้สำเร็จ แต่เกิดผลข้างเคียงทางความจำที่พลิกประวัติศาสตร์ประสาทวิทยา',
    physicalExam: [
      {
        system: 'ความจำระยะยาวในอดีต (Retrograde Memory)',
        finding: 'จำเรื่องราวในวัยเด็ก บ้านเกิด โรงเรียน และเหตุการณ์ต่างๆ ก่อนปีที่ผ่าตัดได้อย่างละเอียดและแม่นยำ'
      },
      {
        system: 'ความจำสร้างใหม่ (Anterograde Declarative Memory)',
        finding: 'บกพร่องอย่างสิ้นเชิง: เมื่อแพทย์พูดคุยและเดินออกจากห้องไป 3 นาที แล้วกลับเข้ามาใหม่ ผู้ป่วยจะจำไม่ได้เลยว่าเคยพบแพทย์มาก่อน และคิดว่าตนเองยังอายุ 27 ปีอยู่เสมอ'
      },
      {
        system: 'ความจำทักษะกล้ามเนื้อ (Procedural Motor Memory)',
        finding: 'น่าทึ่งอย่างยิ่ง: เมื่อให้นักวิจัยทดสอบให้วาดรูปดาวโดยมองผ่านกระจกเงา (Mirror Tracing) ผู้ป่วยทำผิดพลาดน้อยลงเรื่อยๆ ในแต่ละวันจนวาดได้อย่างชำนาญ (ทักษะพัฒนาขึ้นสมบูรณ์) แต่ทุกครั้งที่ให้ทำ ผู้ป่วยจะยืนยันว่าตน "ไม่เคยเห็นการทดสอบนี้มาก่อนในชีวิต"'
      },
      {
        system: 'ระดับสติปัญญา (IQ) และการใช้ภาษา',
        finding: 'IQ ปกติ (112), พูดคุยสื่อสารโต้ตอบได้ปกติ, ทวนตัวเลขสั้นๆ ตามหลังได้ (Working memory ปกติ)'
      }
    ],
    targetId: 'hippocampus',
    targetStructureNameTh: 'ฮิปโปแคมปัส (Hippocampus & Medial Temporal Lobe)',
    targetStructureNameEn: 'Hippocampus (Medial Temporal Lobe)',
    mniCoords: [-26, -20, -16],
    slicePos: { axial: -16, coronal: -20, sagittal: -26 },
    cortexPeel: 0.15,
    vascularTerritory: 'Posterior Cerebral Artery (PCA) Branches & Anterior Choroidal Artery',
    differentialOptions: [
      { id: 'diag_hippocampus_amnesia', textTh: 'Bilateral Hippocampal / Medial Temporal Amnesia (สูญเสียความจำเหตุการณ์สร้างใหม่จากการขาดฮิปโปแคมปัส)', isCorrect: true },
      { id: 'diag_broca', textTh: 'Broca\'s Expressive Aphasia (สูญเสียการเปล่งคำพูด)', isCorrect: false },
      { id: 'diag_huntington', textTh: 'Huntington\'s Disease (โรคฮันติงตันการเคลื่อนไหวผิดปกติ)', isCorrect: false },
      { id: 'diag_vertigo', textTh: 'Benign Paroxysmal Positional Vertigo (หินปูนในหูชั้นในหลุด)', isCorrect: false }
    ],
    mechanismOptions: [
      { id: 'mech_surgical_resection', textTh: 'Bilateral Surgical Resection of Hippocampi (การผ่าตัดตัดฮิปโปแคมปัสสองข้างเพื่อระงับลมชัก)', isCorrect: true },
      { id: 'mech_carotid_stenosis', textTh: 'Internal Carotid Stenosis (หลอดเลือดแดงแคโรติดตีบแคบ)', isCorrect: false },
      { id: 'mech_parietal_infarct', textTh: 'Parietal Lobe Ischemia (การขาดเลือดที่สมองกลีบข้าง)', isCorrect: false },
      { id: 'mech_spinal_cord', textTh: 'Spinal Cord Hemisection (ไขสันหลังฉีกขาดครึ่งซีก)', isCorrect: false }
    ],
    cer: {
      claimTh: 'ผู้ป่วยมีภาวะสูญเสียความจำสร้างใหม่แบบถาวร (Severe Anterograde Declarative Amnesia) จากการสูญเสียโครงสร้าง Hippocampus ในสมองกลีบขมับส่วนในทั้งสองข้าง',
      evidenceTh: '1) ความจำแบบประกาศชัด (Declarative memory: ชื่อคน, เหตุการณ์, วันเวลา) ไม่สามารถบันทึกเข้าสู่ความจำระยะยาวได้\n2) ความจำด้านทักษะและการเคลื่อนไหว (Procedural memory) ยังคงเรียนรู้และพัฒนาได้เป็นปกติ\n3) ภาพตัดขวาง Coronal MRI ยืนยันการหายไปของโครงสร้างรูปเขาม้าน้ำ (Hippocampus) บริเวณขอบในของสมองกลีบขมับที่ MNI (-26, -20, -16)',
      reasoningTh: 'Hippocampus มีบทบาทสำคัญอย่างยิ่งในการผนึกรอยความจำ (Memory Consolidation) เปลี่ยนความจำระยะสั้นให้เป็นรหัสความจำระยะยาวส่งไปเก็บที่ Cortex แต่ฮิปโปแคมปัสไม่ได้ทำหน้าที่จัดเก็บทักษะกล้ามเนื้อ (ซึ่งประมวลผลโดย Basal Ganglia และ Cerebellum) ทำให้ความจำทั้งสองระบบแยกเป็นอิสระจากกัน'
    }
  },
  {
    id: 'case_ataxia_cerebellum',
    caseNumber: 4,
    titleTh: 'นักยิมนาสติกทรงตัวไม่ได้: มือสั่นและเดินเซเฉียบพลัน',
    titleEn: 'The Stumbling Tightrope Gymnast (Acute Cerebellar Ataxia)',
    patientName: 'น้องกัญญา (ด.ญ. ข.)',
    age: 16,
    sex: 'หญิง (Female)',
    occupation: 'นักกีฬายิมนาสติกทีมโรงเรียน',
    chiefComplaint: 'เดินเซคล้ายคนเมา กะระยะชี้นิ้วไม่ถูก และมือสั่นเมื่อพยายามจะเอื้อมหยิบสิ่งของ',
    vitals: {
      bp: '114/72 mmHg',
      hr: '76 bpm',
      rr: '16 /min',
      spo2: '100%',
      temp: '37.1 °C'
    },
    history: 'ผู้ป่วยมีประวัติเป็นไข้หวัดและการติดเชื้อทางเดินหายใจเมื่อ 2 สัปดาห์ก่อน หลังจากไข้หาย 4 วัน เริ่มสังเกตเห็นว่าเดินเซ ก้าวขาไม่สัมพันธ์กัน ทำแก้วน้ำหล่น และเขียนหนังสือตัวโตสะเปะสะปะ ไม่สามารถซ้อมยิมนาสติกได้',
    physicalExam: [
      {
        system: 'กำลังกล้ามเนื้อ (Motor Strength)',
        finding: 'กำลังกล้ามเนื้อแขนขา 5/5 สมบูรณ์ทั้งสองข้าง (ไม่มีอัมพฤกษ์หรือกล้ามเนื้อลีบ)'
      },
      {
        system: 'การทดสอบความแม่นยำ (Finger-to-Nose Test)',
        finding: 'มีอาการสั่นรุนแรงเฉพาะตอนที่ปลายนิ้วกำลังจะแตะถึงจมูก (Intention / Kinetic Tremor) และชี้นิ้วเลยจมูกไปโดนแก้ม (Dysmetria / Past-pointing)'
      },
      {
        system: 'การประสานงานกล้ามเนื้อ (Coordination)',
        finding: 'ไม่สามารถพลิกฝ่ามือหงายคว่ำสลับกันอย่างรวดเร็วได้ (Dysdiadochokinesia), รีเฟล็กซ์เข่าแกว่งไปมาคล้ายลูกตุ้มนาฬิกา (Pendular Knee Jerk)'
      },
      {
        system: 'การทรงตัวและการเดิน (Gait & Balance)',
        finding: 'เดินกางขากว้างเพื่อกันล้ม (Wide-based ataxic gait) และไม่สามารถเดินต่อส้นเท้าเป็นเส้นตรงได้ (Tandem gait failed)'
      },
      {
        system: 'ลูกตาและการพูด (Eyes & Scanning Speech)',
        finding: 'ตากระตุกไปมาในแนวนอนเมื่อเหลือบมองข้าง (Horizontal Nystagmus), เสียงพูดขาดเป็นห้วงๆ ตะกุกตะกัก (Scanning speech)'
      }
    ],
    targetId: 'cerebellum',
    targetStructureNameTh: 'สมองน้อย (Cerebellum & Vermis)',
    targetStructureNameEn: 'Cerebellum (Folia & Cerebellar Vermis)',
    mniCoords: [0, -56, -26],
    slicePos: { axial: -26, coronal: -56, sagittal: 0 },
    cortexPeel: 1.0,
    vascularTerritory: 'PICA (Posterior Inferior Cerebellar Artery) & AICA / Post-viral Autoimmune',
    differentialOptions: [
      { id: 'diag_cerebellar_ataxia', textTh: 'Acute Cerebellar Ataxia & Vermis Dysfunction (ภาวะสมองน้อยอักเสบสูญเสียการประสานงานและการทรงตัว)', isCorrect: true },
      { id: 'diag_stroke_m1', textTh: 'Primary Motor Cortex Infarct (เปลือกสมองสั่งการขาดเลือด/อัมพาตครึ่งซีก)', isCorrect: false },
      { id: 'diag_wernicke', textTh: 'Wernicke\'s Receptive Aphasia (ไม่เข้าใจภาษา)', isCorrect: false },
      { id: 'diag_carpal_tunnel', textTh: 'Carpal Tunnel Syndrome (พังผืดกดทับเส้นประสาทข้อมือ)', isCorrect: false }
    ],
    mechanismOptions: [
      { id: 'mech_post_viral_cerebellitis', textTh: 'Post-Viral Acute Cerebellitis / Immune Inflammation (การอักเสบของสมองน้อยจากระบบภูมิคุ้มกันหลังติดเชื้อไวรัส)', isCorrect: true },
      { id: 'mech_mca_infarct', textTh: 'Middle Cerebral Artery Occlusion (หลอดเลือดสมองส่วนกลางอุดตัน)', isCorrect: false },
      { id: 'mech_optic_neuritis', textTh: 'Isolated Optic Neuritis (เส้นประสาทตาอักเสบ)', isCorrect: false },
      { id: 'mech_subdural_bleed', textTh: 'Chronic Subdural Hematoma (ก้อนเลือดออกใต้เยื่อหุ้มสมอง)', isCorrect: false }
    ],
    cer: {
      claimTh: 'ผู้ป่วยมีภาวะสูญเสียการประสานงานของกล้ามเนื้อจากสมองน้อยเฉียบพลัน (Acute Cerebellar Ataxia with Kinetic Intention Tremor)',
      evidenceTh: '1) กำลังกล้ามเนื้อปกติ 5/5 แต่พบ Intention Tremor, Dysmetria และ Dysdiadochokinesia\n2) เดินเซกางขา (Wide-based gait), มี Nystagmus และการพูดแบบ Scanning speech\n3) ภาพสแกน MRI ระนาบ Coronal และ Sagittal พบบวมอักเสบที่ Cerebellar Vermis และซีกสมองน้อยที่ MNI (0, -56, -26)',
      reasoningTh: 'เซลล์ Purkinje ในสมองน้อยทำหน้าที่เปรียบเทียบคำสั่งการเคลื่อนไหวจากสมองใหญ่กับสัญญาณรับความรู้สึกจากกล้ามเนื้อ (Motor Error Correction) เพื่อปรับแต่งให้การเคลื่อนไหวแม่นยำราบรื่น เมื่อสมองน้อยอักเสบ วงจรฟีดแบ็กกะระยะจึงเสียไป เกิดอาการสั่นเมื่อใกล้ถึงเป้าหมายและการเดินเซ แม้แรงกล้ามเนื้อจะเต็มที่ก็ตาม'
    }
  },
  {
    id: 'case_vision_hemianopsia',
    caseNumber: 5,
    titleTh: 'โลกครึ่งขวาที่หายไป: ชนขอบประตูและอ่านหนังสือไม่ได้',
    titleEn: 'The Sudden Loss of the Right World (Right Homonymous Hemianopsia)',
    patientName: 'คุณประเสริฐ (นาย ค.)',
    age: 64,
    sex: 'ชาย (Male)',
    occupation: 'ข้าราชการบำนาญ',
    chiefComplaint: 'มองไม่เห็นพื้นที่ฝั่งขวาของตาทั้งสองข้าง เดินชนประตูและคนฝั่งขวาตลอดเวลา อ่านหนังสือได้เพียงครึ่งประโยค',
    vitals: {
      bp: '165/95 mmHg',
      hr: '82 bpm',
      rr: '16 /min',
      spo2: '98%',
      temp: '36.9 °C'
    },
    history: 'ขณะกำลังนั่งดูข่าวโทรทัศน์ ผู้ป่วยรู้สึกตกใจเมื่อพบว่ามองเห็นภาพจอโทรทัศน์เพียงครึ่งซีกซ้าย เมื่อหยิบหนังสือพิมพ์มาอ่าน พบว่าอ่านได้เฉพาะคำต้นประโยค แต่ไม่สามารถกวาดสายตาไปอ่านคำทางขวาได้ เมื่อทดลองปิดตาทีละข้าง พบว่า "ตาทั้งสองข้างมองไม่เห็นครึ่งขวาเหมือนกันทั้งคู่" ไม่มีอาการแขนขาอ่อนแรงหรือพูดไม่ชัด',
    physicalExam: [
      {
        system: 'ความคมชัดสายตาตรงกลาง (Visual Acuity)',
        finding: '20/20 ในจุดกึ่งกลางสายตา การมองตรงไปข้างหน้าชัดเจนดี'
      },
      {
        system: 'ลานสายตาสองตา (Visual Field Perimetry)',
        finding: 'ตาทั้งสองข้าง (OS และ OD) สูญเสียลานสายตาซีกขวา 50% อย่างสมบูรณ์แบบ (Right Homonymous Hemianopsia โดยมี Macular Sparing เล็กน้อย)'
      },
      {
        system: 'การเคลื่อนไหวลูกตา (Ocular Motility)',
        finding: 'กล้ามเนื้อกลอกลูกตาทำงานได้สมบูรณ์ทั้งสองข้าง รูม่านตาตอบสนองต่อแสงปกติ'
      },
      {
        system: 'กำลังกล้ามเนื้อและการพูด (Motor & Speech)',
        finding: 'กำลังกล้ามเนื้อ 5/5 เท่ากันทั้งสองข้าง การพูดคล่องแคล่ว ตอบคำถามถูกต้อง ไม่มีอัมพาตใบหน้า'
      }
    ],
    targetId: 'occipital_lobe_left',
    targetStructureNameTh: 'สมองกลีบท้ายทอยซีกซ้าย (Left Occipital Lobe / V1)',
    targetStructureNameEn: 'Left Occipital Lobe (Primary Visual Cortex V1)',
    mniCoords: [-16, -92, 4],
    slicePos: { axial: 4, coronal: -92, sagittal: -16 },
    cortexPeel: 1.0,
    vascularTerritory: 'Left Posterior Cerebral Artery (PCA) Calcarine Branch',
    differentialOptions: [
      { id: 'diag_left_v1_infarct', textTh: 'Left Occipital Lobe / V1 Infarct (สมองกลีบท้ายทอยซีกซ้ายขาดเลือด / Right Homonymous Hemianopsia)', isCorrect: true },
      { id: 'diag_cataract', textTh: 'Bilateral Cataract (โรคต้อกระจกสองข้าง)', isCorrect: false },
      { id: 'diag_chiasm_tumor', textTh: 'Pituitary Chiasm Compression (เนื้องอกกดทับส่วนไขว้ประสาทตา / Bitemporal Hemianopsia)', isCorrect: false },
      { id: 'diag_glaucoma', textTh: 'Acute Angle-Closure Glaucoma (ต้อหินมุมปิดเฉียบพลัน)', isCorrect: false }
    ],
    mechanismOptions: [
      { id: 'mech_pca_occlusion', textTh: 'Left Posterior Cerebral Artery (PCA) Occlusion (หลอดเลือดแดงสมองส่วนหลังซีกซ้ายอุดตัน)', isCorrect: true },
      { id: 'mech_retinal_detachment', textTh: 'Bilateral Retinal Detachment (จอประสาทตาลอกหลุด)', isCorrect: false },
      { id: 'mech_facial_nerve', textTh: 'Bell\'s Palsy (อัมพาตเส้นประสาทใบหน้า)', isCorrect: false },
      { id: 'mech_trigeminal', textTh: 'Trigeminal Neuralgia (อาการปวดเส้นประสาทใบหน้า)', isCorrect: false }
    ],
    cer: {
      claimTh: 'ผู้ป่วยมีภาวะตาบอดลานสายตาซีกขวาของตาทั้งสองข้าง (Right Homonymous Hemianopsia) จากการขาดเลือดของสมองกลีบท้ายทอยซีกซ้าย (Left Occipital Lobe / V1) ในอาณาเขตหลอดเลือด Left PCA',
      evidenceTh: '1) ลานสายตาตาทั้งสองข้างบอดครึ่งขวาแบบเหมือนกันทุกประการ (Homonymous Hemianopsia)\n2) กำลังกล้ามเนื้อและการเคลื่อนไหวลูกตาเป็นปกติสมบูรณ์\n3) ภาพตัดขวาง Axial MRI พบรอยโรคขาดเลือดรูปสามเหลี่ยม (Wedge-shaped hypodensity) บริเวณร่อง Calcarine Sulcus ซีกซ้าย ที่ MNI (-16, -92, 4)',
      reasoningTh: 'สัญญาณแสงจากลานสายตาฝั่งขวาของทั้งสองตา (Nasal retina ตาขวา และ Temporal retina ตาซ้าย) จะส่งข้ามผ่าน Optic Chiasm และรวมกันใน Optic Tract ซีกซ้าย เพื่อส่งไปยัง Primary Visual Cortex (V1) ของสมองกลีบท้ายทอยซีกซ้าย รอยโรคที่กลีบท้ายทอยซ้ายจึงตัดขาดการมองเห็นของลานสายตาขวาทั้งหมด'
    }
  },
  {
    id: 'case_locked_in_pons',
    caseNumber: 6,
    titleTh: 'อัมพาตทั้งร่างแต่สติยังตื่น: ภาวะขังในตนเอง',
    titleEn: 'The Frightening Silent Paralysis (Locked-in Syndrome)',
    patientName: 'คุณณรงค์ (นาย ง.)',
    age: 52,
    sex: 'ชาย (Male)',
    occupation: 'วิศวกรควบคุมระบบ',
    chiefComplaint: 'ตื่นขึ้นมาขยับแขนขาไม่ได้ พูดไม่ได้ อ้าปากไม่ได้ แต่ยังรู้สึกตัวและได้ยินทุกสิ่ง',
    vitals: {
      bp: '170/100 mmHg',
      hr: '90 bpm',
      rr: '14 /min',
      spo2: '97%',
      temp: '37.0 °C'
    },
    history: 'ผู้ป่วยมีอาการเวียนศีรษะและเดินเซนำมาก่อน 2 วัน รุ่งเช้าผู้ป่วยตื่นขึ้นมาพบว่าขยับร่างกายไม่ได้เลย ไม่สามารถเปล่งเสียงเรียกคนในบ้านได้ ญาติพบตัวในสภาพนอนนิ่ง คิดว่าหมดสติจึงรีบเรียกรถพยาบาลฉุกเฉิน',
    physicalExam: [
      {
        system: 'กำลังกล้ามเนื้อแขนขาและลำตัว (Motor Strength)',
        finding: 'อัมพาตทั้งสี่รยางค์โดยสิ้นเชิง (Tetraplegia, Grade 0/5) กล้ามเนื้ออ่อนปวกเปียก ไม่สามารถขยับแขน ขา คอ หรือลำตัวได้เลย'
      },
      {
        system: 'การพูดและการกลืน (Speech & Swallowing)',
        finding: 'ไม่สามารถเปล่งเสียงพูดได้เลยแม้แต่คำเดียว (Anarthria) และไม่สามารถกลืนน้ำลายหรืออ้าปากได้'
      },
      {
        system: 'ระดับสติสัมปชัญญะและการสื่อสาร (Consciousness & Communication)',
        finding: 'น่าทึ่งอย่างยิ่ง: ผู้ป่วย "ลืมตาและกลอกตาขึ้นลงในแนวดิ่งได้ตามคำสั่ง" สามารถกะพริบตา 2 ครั้งแทนคำว่า "ใช่" และ 1 ครั้งแทน "ไม่ใช่" ผู้ป่วยรับรู้ เข้าใจ และจำเหตุการณ์รอบตัวได้สมบูรณ์ 100%'
      },
      {
        system: 'คลื่นไฟฟ้าสมอง (EEG)',
        finding: 'คลื่นไฟฟ้าสมองแสดงสภาวะตื่นตัวปกติ (Normal awake EEG pattern) ยืนยันว่าไม่ได้อยู่ในภาวะโคม่าหรือสมองตาย'
      }
    ],
    targetId: 'brainstem_pons',
    targetStructureNameTh: 'ก้านสมองส่วนพอนส์ (Ventral Pons / Basilar Artery Territory)',
    targetStructureNameEn: 'Brainstem Pons (Ventral Basilar Territory)',
    mniCoords: [0, -18, -32],
    slicePos: { axial: -32, coronal: -18, sagittal: 0 },
    cortexPeel: 0.25,
    vascularTerritory: 'Basilar Artery (Paramedian Pontine Branches)',
    differentialOptions: [
      { id: 'diag_locked_in', textTh: 'Locked-in Syndrome (กลุ่มอาการขังในตนเองจากก้านสมองส่วนพอนส์ขาดเลือด)', isCorrect: true },
      { id: 'diag_brain_death', textTh: 'Brain Death (ภาวะสมองตาย)', isCorrect: false },
      { id: 'diag_coma', textTh: 'Deep Hepatic Coma (โคม่าจากภาวะตับวาย)', isCorrect: false },
      { id: 'diag_huntington', textTh: 'Huntington\'s Chorea (โรคฮันติงตัน)', isCorrect: false }
    ],
    mechanismOptions: [
      { id: 'mech_basilar_thrombosis', textTh: 'Basilar Artery Thrombosis / Ventral Pontine Infarct (ลิ่มเลือดอุดตันหลอดเลือดแดงเบซิลาร์ทำลายเนื้อสมองพอนส์ส่วนหน้า)', isCorrect: true },
      { id: 'mech_mca_infarct', textTh: 'Middle Cerebral Artery Occlusion (หลอดเลือดสมองส่วนกลางอุดตัน)', isCorrect: false },
      { id: 'mech_temporal_bleed', textTh: 'Temporal Lobe Hematoma (ก้อนเลือดออกในกลีบขมับ)', isCorrect: false },
      { id: 'mech_vestibular_swelling', textTh: 'Vestibular Schwannoma (เนื้องอกเส้นประสาทการได้ยิน)', isCorrect: false }
    ],
    cer: {
      claimTh: 'ผู้ป่วยมีกลุ่มอาการขังในตนเอง (Locked-in Syndrome) จากการขาดเลือดทำลายเนื้อเยื่อก้านสมองส่วนหน้าของพอนส์ (Ventral Pons) จากการอุดตันของหลอดเลือดแดง Basilar Artery',
      evidenceTh: '1) อัมพาตทั้งสี่รยางค์ (Quadriplegia) และเส้นประสาทสมองส่วนล่าง แต่ "การกลอกตาแนวดิ่งและการกะพริบตายังทำงานได้ปกติ"\n2) สติสัมปชัญญะและการรับรู้สมบูรณ์ คลื่นไฟฟ้าสมองตื่นตัวปกติ\n3) ภาพตัดขวาง Sagittal และ Axial MRI พบรอยโรคขาดเลือดขนาดใหญ่ที่ Ventral Pons ที่ MNI (0, -18, -32)',
      reasoningTh: 'เส้นใยประสาทสั่งการกล้ามเนื้อทั้งหมด (Corticospinal และ Corticobulbar tracts) ทอดผ่านเนื้อเยื่อ Ventral Pons จึงถูกตัดขาดอย่างสิ้นเชิง ทำให้ร่างกายเป็นอัมพาตทั้งหมด แต่ระบบควบคุมสติสัมปชัญญะ (Reticular Activating System) อยู่ใน Tegmentum ด้านหลัง และศูนย์ควบคุมการกลอกตาแนวดิ่งอยู่ใน Midbrain (CN III) ซึ่งไม่ได้รับผลกระทบ ทำให้ผู้ป่วยยังคงรู้สึกตัวและสื่อสารผ่านการกะพริบตาได้'
    }
  }
];

export class CaseStudyManager {
  constructor(options = {}) {
    this.onSelectStructure = options.onSelectStructure || (() => {});
    this.onAlignMpr = options.onAlignMpr || (() => {});
    this.onSimulateLesion = options.onSimulateLesion || (() => {});
    this.onApplyPeel = options.onApplyPeel || (() => {});
    this.onUpdateUI = options.onUpdateUI || (() => {});

    this.currentIndex = 0;
    this.isActive = false;
    this.diagnosticXP = 0;
    this.solvedCases = new Set();
    this.submittedDiagnoses = new Map(); // caseId -> { isCorrect, selectedDiag, selectedMech, timestamp }

    this.loadStorage();
  }

  loadStorage() {
    try {
      const saved = localStorage.getItem('brain_atlas_cases');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.diagnosticXP = parsed.xp || 0;
        if (Array.isArray(parsed.solved)) {
          this.solvedCases = new Set(parsed.solved);
        }
      }
    } catch (e) {}
  }

  saveStorage() {
    try {
      localStorage.setItem('brain_atlas_cases', JSON.stringify({
        xp: this.diagnosticXP,
        solved: Array.from(this.solvedCases)
      }));
    } catch (e) {}
  }

  getCurrentCase() {
    return CLINICAL_CASES[this.currentIndex];
  }

  toggleModal() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      sound.playSelectChime();
    } else {
      sound.playHoverTick();
    }
    this.dispatchUpdate();
  }

  openModal(caseIndex = null) {
    if (typeof caseIndex === 'number' && caseIndex >= 0 && caseIndex < CLINICAL_CASES.length) {
      this.currentIndex = caseIndex;
    }
    this.isActive = true;
    sound.playSelectChime();
    this.dispatchUpdate();
  }

  closeModal() {
    this.isActive = false;
    sound.playHoverTick();
    this.dispatchUpdate();
  }

  selectCase(index) {
    if (index >= 0 && index < CLINICAL_CASES.length) {
      this.currentIndex = index;
      sound.playSelectChime();
      this.dispatchUpdate();
    }
  }

  nextCase() {
    if (this.currentIndex < CLINICAL_CASES.length - 1) {
      this.selectCase(this.currentIndex + 1);
    }
  }

  prevCase() {
    if (this.currentIndex > 0) {
      this.selectCase(this.currentIndex - 1);
    }
  }

  /**
   * Auto-focus 3D Camera and highlight target structure
   */
  align3DFocus() {
    const c = this.getCurrentCase();
    if (!c) return;

    if (typeof c.cortexPeel === 'number') {
      this.onApplyPeel(c.cortexPeel);
    }
    this.onSelectStructure(c.targetId, true);
    sound.playSelectChime();
  }

  /**
   * Auto-align 2D MPR Slices (Axial, Coronal, Sagittal) to target lesion coordinates
   */
  alignMprSlices() {
    const c = this.getCurrentCase();
    if (!c || !c.slicePos) return;

    this.onAlignMpr(c.slicePos);
    sound.playSliceTick();
  }

  /**
   * Cross-link with Virtual Lesion Simulator
   */
  triggerSimulateLesion() {
    const c = this.getCurrentCase();
    if (!c) return;

    this.onSimulateLesion(c.targetId);
  }

  /**
   * Evaluate student diagnostic submission
   */
  submitDiagnosis(selectedDiagId, selectedMechId, suspectedStructureId) {
    const c = this.getCurrentCase();
    if (!c) return null;

    sound.playDiagnosticPulse();

    const isDiagCorrect = c.differentialOptions.some(opt => opt.id === selectedDiagId && opt.isCorrect);
    const isMechCorrect = c.mechanismOptions.some(opt => opt.id === selectedMechId && opt.isCorrect);
    const isStructCorrect = (suspectedStructureId === c.targetId) ||
      (c.targetId === 'frontal_lobe_right' && suspectedStructureId === 'frontal_lobe_left'); // bilateral allowance for Gage

    const isFullCorrect = isDiagCorrect && isMechCorrect && isStructCorrect;

    let pointsEarned = 0;
    if (isFullCorrect) {
      pointsEarned = 100;
      if (!this.solvedCases.has(c.id)) {
        this.solvedCases.add(c.id);
        this.diagnosticXP += pointsEarned;
        this.saveStorage();
      }
      sound.playDiagnosticSuccess();
    } else {
      sound.playTryAgainTone();
    }

    const submissionResult = {
      isFullCorrect,
      isDiagCorrect,
      isMechCorrect,
      isStructCorrect,
      pointsEarned,
      totalXP: this.diagnosticXP,
      caseItem: c,
      selectedDiagId,
      selectedMechId,
      suspectedStructureId
    };

    this.submittedDiagnoses.set(c.id, submissionResult);
    this.dispatchUpdate(submissionResult);

    return submissionResult;
  }

  /**
   * Generate formatted Markdown CER report for teacher / classroom submission
   */
  generateCERMarkdown(c) {
    if (!c) c = this.getCurrentCase();
    const submission = this.submittedDiagnoses.get(c.id);
    const statusText = submission && submission.isFullCorrect ? 'วินิจฉัยถูกต้องสมบูรณ์ (100% Accurate)' : 'อยู่ระหว่างการสืบสวนรอยโรค';

    return `# 🩺 รายงานผลการสืบสวนรอยโรคสมอง (Clinical Diagnostic CER Report)
**ผู้สืบสวน:** นักเรียนแพทย์/นักเรียนชีววิทยา (Brain Atlas 3D)
**เคสผู้ป่วยที่ ${c.caseNumber}:** ${c.titleTh} (${c.titleEn})
**สถานะการวินิจฉัย:** ${statusText}
**คะแนนการวินิจฉัย:** +${submission ? submission.pointsEarned : 0} XP (รวมสะสม: ${this.diagnosticXP} XP)

---

### 1. ข้อมูลผู้ป่วยและอาการสำคัญ (Patient Profile & Presentation)
- **ชื่อผู้ป่วย:** ${c.patientName} (${c.sex}, อายุ ${c.age} ปี)
- **อาชีพ:** ${c.occupation}
- **อาการสำคัญ (Chief Complaint):** ${c.chiefComplaint}
- **สัญญาณชีพ (Vital Signs):** ความดัน ${c.vitals.bp} | ชีพจร ${c.vitals.hr} | หายใจ ${c.vitals.rr} | SpO2 ${c.vitals.spo2}
- **ประวัติการเจ็บป่วย (HPI):** ${c.history}

---

### 2. หลักฐานการตรวจร่างกายระบบประสาท (Neurological Examination)
${c.physicalExam.map(e => `- **${e.system}:** ${e.finding}`).join('\n')}

---

### 3. ผลการวิเคราะห์ภาพสแกน 3D และ MRI (Imaging & Neuroanatomy)
- **โครงสร้างรอยโรคที่ระบุ (Anatomical Locus):** ${c.targetStructureNameTh} (${c.targetStructureNameEn})
- **พิกัดมาตรฐานสากล MNI Coordinates:** (${c.mniCoords[0]}, ${c.mniCoords[1]}, ${c.mniCoords[2]})
- **ระนาบตัดขวาง MRI:** Axial Z: ${c.slicePos.axial} mm | Coronal Y: ${c.slicePos.coronal} mm | Sagittal X: ${c.slicePos.sagittal} mm
- **อาณาเขตหลอดเลือดที่เกี่ยวข้อง:** ${c.vascularTerritory}

---

### 4. บทสรุปการวินิจฉัยตามกรอบ CER (Claim - Evidence - Reasoning)

#### 📌 ข้อวินิจฉัย (Claim):
${c.cer.claimTh}

#### 🔬 หลักฐานทางการแพทย์เชิงประจักษ์ (Evidence):
${c.cer.evidenceTh}

#### 🧠 คำอธิบายกลไกทางประสาทวิทยา (Reasoning):
${c.cer.reasoningTh}

---
*รายงานนี้จัดทำขึ้นผ่านระบบ Brain Atlas 3D Interactive Medical Engineering Engine เพื่อการศึกษาชีววิทยาและวิทยาศาสตร์การแพทย์*
`;
  }

  async copyCERToClipboard() {
    const c = this.getCurrentCase();
    if (!c) return false;

    const md = this.generateCERMarkdown(c);
    try {
      await navigator.clipboard.writeText(md);
      sound.playSelectChime();
      return true;
    } catch (e) {
      console.warn('Clipboard write failed:', e);
      return false;
    }
  }

  dispatchUpdate(submissionResult = null) {
    this.onUpdateUI({
      isActive: this.isActive,
      currentCase: this.getCurrentCase(),
      currentIndex: this.currentIndex,
      totalCases: CLINICAL_CASES.length,
      diagnosticXP: this.diagnosticXP,
      solvedCount: this.solvedCases.size,
      isCurrentSolved: this.solvedCases.has(this.getCurrentCase().id),
      submissionResult: submissionResult || this.submittedDiagnoses.get(this.getCurrentCase().id)
    });
  }
}
