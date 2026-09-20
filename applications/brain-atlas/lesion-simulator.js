/**
 * Brain Atlas 3D - Virtual Clinical Lesion & Stroke Simulator
 * Grounded in Clinical Neuroanatomy, Vascular Supply Territories & Medical Imaging
 * Designed for High School (ม.ปลาย) & Pre-Med Biological Sciences
 */

import { sound } from './audio.js';

export const LESION_PROFILES = {
  frontal_lobe_left: {
    syndromeTh: 'ภาวะสูญเสียการพูดและการสั่งการซีกขวา (Broca\'s Aphasia & Hemiparesis)',
    syndromeEn: 'Broca\'s Motor Aphasia & Contralateral Hemiparesis',
    pathologyType: 'ischemia',
    severityTh: 'รุนแรง (Critical)',
    motorDeficitTh: 'กล้ามเนื้อใบหน้าและแขนขวาอ่อนแรง (Facial droop & Right arm weakness)',
    speechDeficitTh: 'พูดไม่ได้หรือพูดตะกุกตะกัก น้ำคำขาดตอน แต่งประโยคไม่ได้ แต่ "เข้าใจ" คำพูดผู้อื่นเป็นอย่างดี',
    visionDeficitTh: 'ลานสายตาปกติ หรืออาจมีกล้ามเนื้อลูกตาไม่หันมองไปทางขวา',
    clinicalSigns: ['Broca\'s Expressive Aphasia', 'Right Hemiplegia', 'Depression/Frustration'],
    radiologyTh: 'MRI T1: Hypointense signal บริเวณ Left Inferior Frontal Gyrus (Brodmann 44/45)',
    affectedTerritory: ['frontal_lobe_left']
  },
  frontal_lobe_right: {
    syndromeTh: 'ภาวะบุคลิกภาพเปลี่ยนและสูญเสียการควบคุมพฤติกรรม (Frontal Lobe Syndrome)',
    syndromeEn: 'Right Frontal Lobe Syndrome & Left Hemiparesis',
    pathologyType: 'trauma',
    severityTh: 'ปานกลางถึงรุนแรง',
    motorDeficitTh: 'กล้ามเนื้อร่างกายซีกซ้ายอ่อนแรง การเคลื่อนไหวช้าลง',
    speechDeficitTh: 'การพูดคล่อง แต่ขาดน้ำเสียงอารมณ์ (Aprosodia) พูดจาขวานผ่าซาก',
    visionDeficitTh: 'ปกติ',
    clinicalSigns: ['Personality Alteration (Phineas Gage)', 'Disinhibition', 'Left Motor Weakness'],
    radiologyTh: 'MRI T1: Low signal / T2 FLAIR Hyperintensity บริเวณ Orbitofrontal & Prefrontal cortex',
    affectedTerritory: ['frontal_lobe_right']
  },
  temporal_lobe_left: {
    syndromeTh: 'ภาวะพูดคล่องแต่ไม่เข้าใจภาษา (Wernicke\'s Aphasia / Receptive Aphasia)',
    syndromeEn: 'Wernicke\'s Receptive Aphasia',
    pathologyType: 'ischemia',
    severityTh: 'รุนแรง',
    motorDeficitTh: 'กล้ามเนื้อมักไม่อ่อนแรงหรืออ่อนแรงเพียงเล็กน้อย',
    speechDeficitTh: 'พูดได้คล่องแคล่ว แต่น้ำคำไร้ความหมาย (Word Salad) และ "ไม่เข้าใจ" ภาษาที่ผู้อื่นสื่อสารเลย',
    visionDeficitTh: 'อาจมีจุดบอดที่ลานสายตาขวาบน (Right Superior Quadrantanopia จาก Meyer\'s loop)',
    clinicalSigns: ['Sensory Aphasia (Word Salad)', 'Anosognosia (ไม่รู้ตัวว่าตนเองสื่อสารไม่รู้เรื่อง)', 'Auditory Agnosia'],
    radiologyTh: 'MRI T1: Hypointensity บริเวณ Left Superior Temporal Gyrus (Brodmann 22)',
    affectedTerritory: ['temporal_lobe_left']
  },
  temporal_lobe_right: {
    syndromeTh: 'ภาวะจำใบหน้าคนไม่ได้และไม่เข้าใจดนตรี (Prosopagnosia & Amusia)',
    syndromeEn: 'Prosopagnosia & Sensory Amusia',
    pathologyType: 'ischemia',
    severityTh: 'ปานกลาง',
    motorDeficitTh: 'ปกติ',
    speechDeficitTh: 'พูดได้ปกติ แต่ไม่เข้าใจทำนอง อารมณ์ และความรู้สึกของน้ำเสียง',
    visionDeficitTh: 'มองเห็นวัตถุชัดเจน แต่ "สมองไม่สามารถจำแนกใบหน้าคน" ได้ แม้กระทั่งใบหน้าตนเองในกระจก',
    clinicalSigns: ['Prosopagnosia (Face Blindness)', 'Amusia (บกพร่องด้านดนตรี)', 'Topographical Disorientation'],
    radiologyTh: 'MRI T1: รอยโรคที่ Right Fusiform Gyrus (Occipitotemporal cortex)',
    affectedTerritory: ['temporal_lobe_right']
  },
  parietal_lobe_left: {
    syndromeTh: 'กลุ่มอาการเกิร์สต์แมนน์ (Gerstmann\'s Syndrome)',
    syndromeEn: 'Gerstmann\'s Syndrome & Apraxia',
    pathologyType: 'ischemia',
    severityTh: 'ปานกลางถึงรุนแรง',
    motorDeficitTh: 'บกพร่องในการทำท่าทางตามสั่ง (Ideomotor Apraxia)',
    speechDeficitTh: 'เขียนหนังสือไม่ได้ (Agraphia) แม้กล้ามเนื้อมือจะไม่เป็นอัมพาต',
    visionDeficitTh: 'สับสนซ้าย-ขวา (Left-Right Disorientation) และจำแนกนิ้วมือตนเองไม่ได้ (Finger Agnosia)',
    clinicalSigns: ['Agraphia (เขียนไม่ได้)', 'Acalculia (คิดเลขไม่ได้)', 'Left-Right Confusion', 'Finger Agnosia'],
    radiologyTh: 'MRI T1: Hypointense lesion บริเวณ Left Angular Gyrus',
    affectedTerritory: ['parietal_lobe_left']
  },
  parietal_lobe_right: {
    syndromeTh: 'ภาวะละเลยพื้นที่ซีกซ้าย (Hemispatial Neglect Syndrome)',
    syndromeEn: 'Hemispatial Neglect & Asomatognosia',
    pathologyType: 'ischemia',
    severityTh: 'รุนแรงมาก',
    motorDeficitTh: 'กล้ามเนื้อซีกซ้ายอ่อนแรง และผู้ป่วยมัก "ปฏิเสธว่าแขนซ้ายเป็นของตนเอง"',
    speechDeficitTh: 'ปกติ',
    visionDeficitTh: 'ผู้ป่วยจะละเลยสิ่งแวดล้อมฝั่งซ้ายทั้งหมด เช่น กินข้าวเฉพาะครึ่งจานขวา วาดนาฬิกาเฉพาะฝั่งขวา',
    clinicalSigns: ['Hemispatial Neglect', 'Anosognosia', 'Loss of Spatial Navigation'],
    radiologyTh: 'MRI T1: รอยโรคขาดเลือดขนาดใหญ่ที่ Right Inferior Parietal Lobule',
    affectedTerritory: ['parietal_lobe_right']
  },
  occipital_lobe_left: {
    syndromeTh: 'ภาวะตาบอดลานสายตาซีกขวา (Right Homonymous Hemianopsia)',
    syndromeEn: 'Right Homonymous Hemianopsia',
    pathologyType: 'ischemia',
    severityTh: 'รุนแรงด้านการมองเห็น',
    motorDeficitTh: 'ปกติ',
    speechDeficitTh: 'อ่านหนังสือไม่ได้แต่เขียนได้ (Alexia without Agraphia ถ้าโดน Splenium ด้วย)',
    visionDeficitTh: '⚠️ ตาทั้งสองข้าง "มองไม่เห็นพื้นที่ครึ่งซีกขวา" อย่างสิ้นเชิง (ลานสายตาหายไป 50%)',
    clinicalSigns: ['Right Homonymous Hemianopsia', 'Color Agnosia', 'Alexia without Agraphia'],
    radiologyTh: 'MRI T1: Wedge-shaped wedge hypodensity บริเวณ Left Calcarine Sulcus',
    affectedTerritory: ['occipital_lobe_left']
  },
  occipital_lobe_right: {
    syndromeTh: 'ภาวะตาบอดลานสายตาซีกซ้าย (Left Homonymous Hemianopsia)',
    syndromeEn: 'Left Homonymous Hemianopsia',
    pathologyType: 'ischemia',
    severityTh: 'รุนแรงด้านการมองเห็น',
    motorDeficitTh: 'ปกติ',
    speechDeficitTh: 'ปกติ',
    visionDeficitTh: '⚠️ ตาทั้งสองข้าง "มองไม่เห็นพื้นที่ครึ่งซีกซ้าย" อย่างสิ้นเชิง (ลานสายตาหายไป 50%)',
    clinicalSigns: ['Left Homonymous Hemianopsia', 'Metamorphopsia', 'Impaired Depth Perception'],
    radiologyTh: 'MRI T1: รอยโรคบริเวณ Right Visual Cortex V1',
    affectedTerritory: ['occipital_lobe_right']
  },
  cerebellum: {
    syndromeTh: 'ภาวะสมองน้อยสูญเสียการประสานงาน (Cerebellar Ataxia & Intention Tremor)',
    syndromeEn: 'Cerebellar Ataxia & Kinetic Tremor',
    pathologyType: 'ischemia',
    severityTh: 'ปานกลางถึงรุนแรง',
    motorDeficitTh: '⚠️ เดินเซคล้ายคนเมาอย่างรุนแรง (Ataxic Gait), สั่นเมื่อกำลังจะหยิบของ (Intention Tremor), ชี้นิ้วไม่ตรงเป้า (Dysmetria)',
    speechDeficitTh: 'เสียงพูดขาดเป็นห้วงๆ ตะกุกตะกักคล้ายสะอึก (Scanning Speech)',
    visionDeficitTh: 'ตากระตุกอย่างรวดเร็ว (Nystagmus), มองภาพสั่นไหว (Oscillopsia)',
    clinicalSigns: ['Dysdiadochokinesia', 'Ataxic Gait', 'Pendular Reflexes', 'Nystagmus'],
    radiologyTh: 'MRI T2/FLAIR: High signal บริเวณ Cerebellar Hemisphere หรือ Vermis',
    affectedTerritory: ['cerebellum']
  },
  hippocampus: {
    syndromeTh: 'ภาวะสูญเสียความจำสร้างใหม่ถาวร (Anterograde Amnesia - กรณีผู้ป่วย H.M.)',
    syndromeEn: 'Bilateral Anterograde Amnesia & Alzheimer\'s Core Locus',
    pathologyType: 'degeneration',
    severityTh: 'รุนแรงมาก',
    motorDeficitTh: 'ทักษะกล้ามเนื้อเดิมยังทำได้ (Procedural memory ปกติ)',
    speechDeficitTh: 'พูดคุยโต้ตอบได้ปกติ แต่เมื่อเวลาผ่านไป 2 นาที จะลืมหมดสิ้นว่าเคยคุยอะไรกัน',
    visionDeficitTh: 'ปกติ แต่จำแผนที่สถานที่ใหม่ไม่ได้ หลงทางตลอดเวลา (Spatial disorientation)',
    clinicalSigns: ['Inability to form new declarative memories', 'Temporal lobe epilepsy', 'Alzheimer atrophy'],
    radiologyTh: 'MRI T1 Coronal: Severe bilateral hippocampal volume loss (Medial Temporal Lobe Atrophy - MTA Score 3-4)',
    affectedTerritory: ['hippocampus']
  },
  amygdala: {
    syndromeTh: 'กลุ่มอาการคลูเวอร์-บูซี (Klüver-Bucy Syndrome & Loss of Fear)',
    syndromeEn: 'Klüver-Bucy Syndrome',
    pathologyType: 'trauma',
    severityTh: 'ปานกลาง',
    motorDeficitTh: 'ปกติ',
    speechDeficitTh: 'ปกติ',
    visionDeficitTh: 'หยิบวัตถุทุกอย่างเข้าปากเพื่อสำรวจ (Hyperorality) และไร้สัญชาตญาณกลัวภัยอันตราย',
    clinicalSigns: ['Placidity (ไร้ความกลัว)', 'Hyperorality', 'Hypermetamorphosis', 'Psychic Blindness'],
    radiologyTh: 'MRI T1: Bilateral anterior temporal lobe / amygdaloid necrosis',
    affectedTerritory: ['amygdala']
  },
  thalamus: {
    syndromeTh: 'กลุ่มอาการปวดทาลามัสและชาครึ่งซีก (Dejerine-Roussy Syndrome)',
    syndromeEn: 'Thalamic Pain Syndrome (Dejerine-Roussy)',
    pathologyType: 'ischemia',
    severityTh: 'รุนแรง',
    motorDeficitTh: 'อ่อนแรงชั่วคราว ตามด้วยมือเกร็งค้าง (Thalamic Hand)',
    speechDeficitTh: 'อาจมีเสียงแผ่วเบา หรือระดับความตื่นตัวลดลง (Somnolence / Coma)',
    visionDeficitTh: 'ชาครึ่งซีกร่างกายอย่างรุนแรง และไวต่อความเจ็บปวดผิดปกติ สัมผัสเบาๆ จะปวดแสบร้อนทรมาน',
    clinicalSigns: ['Central Post-Stroke Pain', 'Contralateral Hemi-anesthesia', 'Thalamic Hand'],
    radiologyTh: 'MRI DWI/FLAIR: Lacunar infarct บริเวณ Ventroposterolateral (VPL) nucleus ของทาลามัส',
    affectedTerritory: ['thalamus']
  },
  brainstem_medulla: {
    syndromeTh: 'กลุ่มอาการก้านสมองส่วนล่างขาดเลือดและสัญญาณชีพวิกฤต (Wallenberg Syndrome)',
    syndromeEn: 'Lateral Medullary Syndrome (Wallenberg) & Vital Failure',
    pathologyType: 'ischemia',
    severityTh: '⚠️ วิกฤตถึงแก่ชีวิต (Life Threatening)',
    motorDeficitTh: 'กลืนลำบากสำลัก (Dysphagia), เสียงแหบ (Hoarseness จากเส้นประสาทสมองคู่ 9, 10)',
    speechDeficitTh: 'พูดไม่ชัด เสียงแหบพร่า',
    visionDeficitTh: 'เวียนศีรษะบ้านหมุนรุนแรง ตากระตุก ชาใบหน้าซีกเดียวกันและชาตัวฝั่งตรงข้าม (Crossed Hemisensory loss)',
    clinicalSigns: ['Horner\'s Syndrome', 'Dysphagia', 'Severe Vertigo', 'Risk of Cardiorespiratory arrest'],
    radiologyTh: 'MRI DWI: Bright signal lesion ที่ Dorsolateral Medulla (PICA/Vertebral occlusion)',
    affectedTerritory: ['brainstem_medulla']
  },
  brainstem_pons: {
    syndromeTh: 'กลุ่มอาการขังในตนเอง (Locked-in Syndrome จาก Basilar Artery ตีบ)',
    syndromeEn: 'Locked-in Syndrome (Ventral Pontine Infarct)',
    pathologyType: 'ischemia',
    severityTh: '⚠️ วิกฤตสูงสุด (Catastrophic)',
    motorDeficitTh: '⚠️ อัมพาตทั้งตัวอย่างสมบูรณ์แบบ (Tetraplegia) ไม่สามารถขยับแขนขา ลำตัว หรือใบหน้าได้เลย',
    speechDeficitTh: 'ไม่สามารถเปล่งเสียงพูดหรือขยับปากได้',
    visionDeficitTh: 'รู้สึกตัว สติสัมปชัญญะสมบูรณ์ ได้ยินทุกอย่าง แต่ "สื่อสารได้เพียงการกะพริบตาและกลอกตาแนวดิ่ง"',
    clinicalSigns: ['Quadriplegia', 'Anarthria', 'Preserved Consciousness & Vertical Eye Movement'],
    radiologyTh: 'MRI T1/DWI: Massive bilateral ventral pontine infarction sparing the tegmentum',
    affectedTerritory: ['brainstem_pons']
  },
  circle_of_willis: {
    syndromeTh: 'หลอดเลือดสมองโป่งพองแตกและเลือดออกใต้เยื่อหุ้มสมอง (Aneurysmal Subarachnoid Hemorrhage)',
    syndromeEn: 'Ruptured Berry Aneurysm & Subarachnoid Hemorrhage (SAH)',
    pathologyType: 'hemorrhage',
    severityTh: '⚠️ ฉุกเฉินวิกฤตสูงสุด (Neurosurgical Emergency)',
    motorDeficitTh: 'คอแข็งเกร็ง (Nuchal rigidity), แขนขาอ่อนแรง, ชัก',
    speechDeficitTh: 'สับสน กระสับกระส่าย ซึมลงอย่างรวดเร็ว',
    visionDeficitTh: 'ปวดศีรษะรุนแรงที่สุดในชีวิตแบบฟ้าผ่า (Thunderclap Headache), แพ้แสง (Photophobia)',
    clinicalSigns: ['Thunderclap Headache', 'Meningeal Irritation (Kernig/Brudzinski)', 'Sudden Collapse'],
    radiologyTh: 'Non-Contrast CT: Star-shaped hyperdense blood ใน Basal Cisterns และ Sylvian Fissures',
    affectedTerritory: ['circle_of_willis', 'middle_cerebral_artery', 'anterior_cerebral_artery']
  },
  middle_cerebral_artery: {
    syndromeTh: 'หลอดเลือดสมองใหญ่ขาดเลือดเฉียบพลัน (Malignant MCA Infarction - Fast Stroke)',
    syndromeEn: 'Acute Middle Cerebral Artery (MCA) Territory Stroke',
    pathologyType: 'ischemia',
    severityTh: '⚠️ วิกฤตระดับสูงสุด (Major Stroke)',
    motorDeficitTh: '⚠️ ใบหน้าเบี้ยว แขนและขาซีกตรงข้ามเป็นอัมพาตครึ่งซีก (Contralateral Hemiplegia โดยแขนอ่อนแรงมากกว่าขา)',
    speechDeficitTh: 'หากเป็น MCA ซ้าย: สูญเสียภาษาพูดทั้งหมด (Global Aphasia); หากเป็น MCA ขวา: ละเลยร่างกายซีกซ้าย',
    visionDeficitTh: 'สูญเสียลานสายตาซีกตรงข้าม (Homonymous Hemianopsia) ตาเบนมองไปทางรอยโรค',
    clinicalSigns: ['FAST Positive (Face, Arm, Speech, Time)', 'Global Aphasia (Left MCA)', 'Malignant Cerebral Edema'],
    radiologyTh: 'MRI DWI: High-intensity signal ครอบคลุมพื้นที่ Frontal, Parietal และ Temporal lobes 2 ใน 3',
    affectedTerritory: ['middle_cerebral_artery', 'frontal_lobe_left', 'parietal_lobe_left', 'temporal_lobe_left']
  },
  anterior_cerebral_artery: {
    syndromeTh: 'หลอดเลือดแอนทีเรียร์ซีรีบรัลตีบ (ACA Infarction - อัมพาตขาและเท้า)',
    syndromeEn: 'Anterior Cerebral Artery (ACA) Territory Stroke',
    pathologyType: 'ischemia',
    severityTh: 'รุนแรง',
    motorDeficitTh: '⚠️ อัมพาตและชาเน้นหนักเฉพาะที่ "ขาและเท้า" ของฝั่งตรงข้าม (Contralateral Leg > Arm)',
    speechDeficitTh: 'ขาดแรงจูงใจในการพูดหรือขยับ (Abulia / Akinetic Mutism), กลั้นปัสสาวะไม่อยู่',
    visionDeficitTh: 'ปกติ',
    clinicalSigns: ['Leg > Arm Hemiparesis', 'Abulia & Apathy', 'Urinary Incontinence', 'Grasp Reflex'],
    radiologyTh: 'MRI T1: Infarct บริเวณ Parasagittal Cortex และ Paracentral Lobule',
    affectedTerritory: ['anterior_cerebral_artery', 'frontal_lobe_left', 'corpus_callosum']
  },
  basilar_vertebral_artery: {
    syndromeTh: 'หลอดเลือดเบซิลาร์อุดตันเฉียบพลัน (Basilar Artery Occlusion - BAO)',
    syndromeEn: 'Basilar Artery Thrombosis & Posterior Circulation Crisis',
    pathologyType: 'ischemia',
    severityTh: '⚠️ วิกฤตอันตรายถึงแก่ชีวิตสูงสุด (Mortality > 80% if untreated)',
    motorDeficitTh: 'อัมพาต 4 รยางค์ (Quadriparesis), กล้ามเนื้อเกร็งกระตุก (Decerebrate posturing)',
    speechDeficitTh: 'ไม่สามารถสื่อสารได้ หมดสติเข้าสู่ภาวะโคม่าอย่างรวดเร็ว',
    visionDeficitTh: 'ลูกตาแกว่งผิดปกติ (Skew deviation), รูม่านตาหดเล็กเท่ารูเข็ม (Pinpoint pupils)',
    clinicalSigns: ['Sudden Coma', 'Crossed neurological deficits', 'High mortality without thrombectomy'],
    radiologyTh: 'CTA/MRA: "Empty Basilar Sign" ขาดสัญญาณการไหลเวียนเลือดตลอดความยาวของก้านสมอง',
    affectedTerritory: ['basilar_vertebral_artery', 'brainstem_pons', 'brainstem_medulla', 'cerebellum']
  }
};

export class LesionSimulator {
  constructor(options = {}) {
    this.activeId = null;
    this.onLesionChange = options.onLesionChange || (() => {});
  }

  isLesionActive() {
    return this.activeId !== null;
  }

  getActiveLesionId() {
    return this.activeId;
  }

  getActiveLesionData() {
    if (!this.activeId) return null;
    return LESION_PROFILES[this.activeId] || null;
  }

  /**
   * Activates virtual lesion on specified structure or artery
   */
  activateLesion(structureId) {
    const profile = LESION_PROFILES[structureId];
    if (!profile) {
      // Default fallback profile if not specifically mapped
      this.activeId = structureId;
      sound.playLesionWarning();
      this.dispatch();
      return {
        syndromeTh: 'รอยโรคเนื้อเยื่อประสาทเฉพาะที่ (Focal Neuro-lesion)',
        syndromeEn: 'Focal Neurological Deficit',
        pathologyType: 'ischemia',
        severityTh: 'ปานกลาง',
        motorDeficitTh: 'ขึ้นอยู่กับขนาดและตำแหน่งของรอยโรค',
        speechDeficitTh: 'ปกติ หรืออาจบกพร่องตามเครือข่ายประสาท',
        visionDeficitTh: 'ปกติ',
        clinicalSigns: ['Focal Neurological Sign'],
        radiologyTh: 'MRI T1: Focal hypointense lesion',
        affectedTerritory: [structureId]
      };
    }

    this.activeId = structureId;
    sound.playLesionWarning();
    this.dispatch();
    return profile;
  }

  /**
   * Restores healthy biological tissue
   */
  deactivateLesion() {
    if (this.activeId) {
      this.activeId = null;
      sound.playHealChime();
      this.dispatch();
    }
  }

  toggleLesion(structureId) {
    if (this.activeId === structureId) {
      this.deactivateLesion();
      return false;
    } else {
      this.activateLesion(structureId);
      return true;
    }
  }

  /**
   * Returns whether a given structure ID is within the active lesion's ischemic territory
   */
  isStructureAffected(structId) {
    if (!this.activeId) return false;
    if (this.activeId === structId) return true;

    const profile = LESION_PROFILES[this.activeId];
    if (profile && profile.affectedTerritory) {
      return profile.affectedTerritory.includes(structId);
    }
    return false;
  }

  dispatch() {
    this.onLesionChange({
      isActive: this.isLesionActive(),
      activeId: this.activeId,
      profile: this.getActiveLesionData()
    });
  }
}
