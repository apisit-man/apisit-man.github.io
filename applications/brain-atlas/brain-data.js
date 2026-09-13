/**
 * Brain Atlas 3D - Comprehensive Neuroanatomical Knowledgebase
 * Based on SPL/NAC Harvard Brain Atlas, 7T MRI Human Phantom & TopCoW Circle of Willis
 * Designed for High School (สสวท. ม.6 ระบบประสาท) and Pre-Med Neuroanatomy Education
 */

export const BRAIN_STRUCTURES = [
  // =========================================================================
  // 1. CEREBRAL CORTEX (เปลือกสมองใหญ่) - แบ่งตามกลีบสมอง (Cerebral Lobes)
  // =========================================================================
  {
    id: 'frontal_lobe_left',
    nameEn: 'Left Frontal Lobe',
    nameTh: 'สมองกลีบหน้าซีกซ้าย (Frontal Lobe)',
    system: 'cerebrum',
    systemNameTh: 'สมองใหญ่ (Cerebrum)',
    color: '#3b82f6', // Bright Blue
    center: [-28, 20, 20],
    descriptionEn: 'The anterior part of the cerebral cortex involved in executive functions, voluntary motor control, cognitive planning, and language expression.',
    descriptionTh: 'ส่วนหน้าสุดของสมองใหญ่ ทำหน้าที่เกี่ยวกับการคิดขั้นสูง การวางแผน การตัดสินใจ การควบคุมการเคลื่อนไหวของกล้ามเนื้อ และบุคลิกภาพ',
    functionsTh: [
      'ศูนย์ควบคุมการเคลื่อนไหวตามสั่ง (Primary Motor Cortex - Precentral Gyrus)',
      'การคิดวิเคราะห์ ตัดสินใจ และการยับยั้งชั่งใจ (Prefrontal Cortex)',
      'ศูนย์การพูดและสื่อสารภาษาด้านการออกเสียง (Broca\'s Area)',
      'การทำงานของความจำขณะทำงาน (Working Memory)'
    ],
    clinicalTh: 'หากเกิดโรคหลอดเลือดสมอง (Stroke) ตีบที่กิ่งหลอดเลือด MCA ซ้าย อาจทำให้เกิดภาวะ Broca\'s Aphasia (พูดไม่ได้หรือพูดติดขัด แต่ยังเข้าใจความหมาย) และอัมพาตกล้ามเนื้อซีกขวา'
  },
  {
    id: 'frontal_lobe_right',
    nameEn: 'Right Frontal Lobe',
    nameTh: 'สมองกลีบหน้าซีกขวา (Frontal Lobe)',
    system: 'cerebrum',
    systemNameTh: 'สมองใหญ่ (Cerebrum)',
    color: '#60a5fa',
    center: [28, 20, 20],
    descriptionEn: 'Right hemisphere frontal region responsible for non-verbal reasoning, spatial cognition, emotional expression, and voluntary motor control of the left body.',
    descriptionTh: 'สมองส่วนหน้าซีกขวา ควบคุมการเคลื่อนไหวของร่างกายฝั่งซ้าย ควบคุมอารมณ์ สมาธิ ความคิดสร้างสรรค์ และการตระหนักรู้ต่อตนเองและสภาพแวดล้อม',
    functionsTh: [
      'ควบคุมกล้ามเนื้อร่างกายซีกซ้าย',
      'การจัดลำดับความคิดสร้างสรรค์และมิติสัมพันธ์',
      'การควบคุมพฤติกรรมและการตอบสนองทางสังคม'
    ],
    clinicalTh: 'การบาดเจ็บรุนแรงบริเวณกลีบหน้าส่วนหน้า (Orbitofrontal Cortex) อาจทำให้บุคลิกภาพเปลี่ยนไป ขาดการยับยั้งชั่งใจ คล้ายกรณีประวัติศาสตร์ของ Phineas Gage'
  },
  {
    id: 'parietal_lobe_left',
    nameEn: 'Left Parietal Lobe',
    nameTh: 'สมองกลีบข้างซีกซ้าย (Parietal Lobe)',
    system: 'cerebrum',
    systemNameTh: 'สมองใหญ่ (Cerebrum)',
    color: '#10b981', // Emerald
    center: [-28, 20, -34],
    descriptionEn: 'Integrates somatosensory inputs, spatial manipulation, numerical processing, and language comprehension.',
    descriptionTh: 'ทำหน้าที่ประมวลผลการรับความรู้สึกทางกาย (สัมผัส อุณหภูมิ ความเจ็บปวด) จากร่างกายซีกขวา รวมถึงการคำนวณและเข้าใจภาษา',
    functionsTh: [
      'ศูนย์รับความรู้สึกปฐมภูมิ (Primary Somatosensory Cortex - Postcentral Gyrus)',
      'การแปลผลความรู้สึกเจ็บปวด สัมผัส และตำแหน่งข้อต่อ (Proprioception)',
      'การอ่าน เขียน และคำนวณตัวเลข (Angular & Supramarginal Gyrus)'
    ],
    clinicalTh: 'ภาวะ Gerstmann Syndrome เกิดจากรอยโรคที่ Angular Gyrus ซ้าย ทำให้เกิดอาการไม่รู้ซ้าย-ขวา (Left-Right Confusion), คิดเลขไม่ได้ (Acalculia), เขียนไม่ได้ (Agraphia)'
  },
  {
    id: 'parietal_lobe_right',
    nameEn: 'Right Parietal Lobe',
    nameTh: 'สมองกลีบข้างซีกขวา (Parietal Lobe)',
    system: 'cerebrum',
    systemNameTh: 'สมองใหญ่ (Cerebrum)',
    color: '#34d399',
    center: [28, 20, -34],
    descriptionEn: 'Crucial for visuospatial attention, mental rotation, and body schema representation.',
    descriptionTh: 'รับความรู้สึกจากร่างกายซีกซ้าย และมีความสำคัญอย่างยิ่งต่อการประมวลผลมิติสัมพันธ์และการรับรู้แผนที่ร่างกายในอวกาศ',
    functionsTh: [
      'การรับรู้มิติสัมพันธ์และการนำทางในสภาพแวดล้อม',
      'การตระหนักรู้ร่างกายตนเองและการกำหนดทิศทาง',
      'การแปลผลความรู้สึกสัมผัสจากร่างกายซีกซ้าย'
    ],
    clinicalTh: 'ภาวะ Hemispatial Neglect (การละเลยพื้นที่ซีกซ้าย) มักเกิดจากหลอดเลือด MCA ซีกขวาตีบ ผู้ป่วยจะมองข้ามหรือไม่รับรู้สิ่งของและร่างกายฝั่งซ้ายของตนเอง'
  },
  {
    id: 'temporal_lobe_left',
    nameEn: 'Left Temporal Lobe',
    nameTh: 'สมองกลีบขมับซีกซ้าย (Temporal Lobe)',
    system: 'cerebrum',
    systemNameTh: 'สมองใหญ่ (Cerebrum)',
    color: '#8b5cf6', // Violet
    center: [-40, -18, -10],
    descriptionEn: 'Houses the primary auditory cortex and Wernicke’s area, essential for auditory perception, speech comprehension, and long-term memory access.',
    descriptionTh: 'ศูนย์กลางการประมวลผลเสียง การได้ยิน และความเข้าใจภาษา (Wernicke\'s Area) ตลอดจนเชื่อมต่อกับโครงสร้างความจำ',
    functionsTh: [
      'ศูนย์รับและแปลผลเสียง (Primary Auditory Cortex)',
      'ความเข้าใจภาษาและความหมายของคำพูด (Wernicke\'s Area)',
      'การประมวลผลความจำเชิงความหมาย (Semantic Memory)'
    ],
    clinicalTh: 'รอยโรคที่ Wernicke\'s area ทำให้เกิด Wernicke\'s Aphasia: ผู้ป่วยสามารถพูดคล่องแต่น้ำคำไร้ความหมาย ไม่เข้าใจภาษาที่ได้ยิน (Fluent / Receptive Aphasia)'
  },
  {
    id: 'temporal_lobe_right',
    nameEn: 'Right Temporal Lobe',
    nameTh: 'สมองกลีบขมับซีกขวา (Temporal Lobe)',
    system: 'cerebrum',
    systemNameTh: 'สมองใหญ่ (Cerebrum)',
    color: '#a78bfa',
    center: [40, -18, -10],
    descriptionEn: 'Involved in musical perception, prosody of speech, facial recognition (Fusiform Gyrus), and environmental sound processing.',
    descriptionTh: 'ประมวลผลทำนองดนตรี น้ำเสียง และการจดจำใบหน้าคน (บริเวณ Fusiform Face Area)',
    functionsTh: [
      'การรับรู้จังหวะ ดนตรี และโทนเสียงอารมณ์',
      'การจดจำใบหน้าและอารมณ์ทางสีหน้า (Prosopagnosia locus)',
      'การประมวลผลภาพขั้นสูงในด้านการระบุวัตถุ (Ventral Visual Stream)'
    ],
    clinicalTh: 'การบาดเจ็บบริเวณ Fusiform Gyrus อาจทำให้เกิดภาวะ Prosopagnosia (ภาวะจำใบหน้าคนไม่ได้ แม้เป็นคนสนิทหรือตนเองในกระจก)'
  },
  {
    id: 'occipital_lobe_left',
    nameEn: 'Left Occipital Lobe',
    nameTh: 'สมองกลีบท้ายทอยซีกซ้าย (Occipital Lobe)',
    system: 'cerebrum',
    systemNameTh: 'สมองใหญ่ (Cerebrum)',
    color: '#f97316', // Orange
    center: [-22, -14, -52],
    descriptionEn: 'The visual processing center of the brain, containing the primary visual cortex (V1) receiving signals from the right visual hemifield.',
    descriptionTh: 'ศูนย์กลางการมองเห็นและการประมวลผลภาพ รับสัญญาณแสงจากลานสายตาซีกขวาผ่าน Calcarine Sulcus',
    functionsTh: [
      'ศูนย์รับสัญญาณภาพปฐมภูมิ (Primary Visual Cortex - Striate Cortex / V1)',
      'วิเคราะห์สี ขอบ รูปร่าง และการเคลื่อนไหวของภาพ',
      'ส่งต่อข้อมูลภาพไปยังสมองส่วนอื่นเพื่อแปลความหมาย'
    ],
    clinicalTh: 'ภาวะหลอดเลือด PCA ซ้ายอุดตัน อาจทำให้เกิด Homonymous Hemianopsia ด้านขวา (ตามองไม่เห็นลานสายตาซีกขวาของตาทั้งสองข้าง)'
  },
  {
    id: 'occipital_lobe_right',
    nameEn: 'Right Occipital Lobe',
    nameTh: 'สมองกลีบท้ายทอยซีกขวา (Occipital Lobe)',
    system: 'cerebrum',
    systemNameTh: 'สมองใหญ่ (Cerebrum)',
    color: '#fb923c',
    center: [22, -14, -52],
    descriptionEn: 'Processes visual information from the left visual field, decoding shape, color, motion, and contrast.',
    descriptionTh: 'ประมวลผลข้อมูลภาพจากลานสายตาซีกซ้าย ควบคุมการจำแนกภาพ ลวดลาย ความลึก และการเคลื่อนไหว',
    functionsTh: [
      'ศูนย์ประมวลผลภาพปฐมภูมิฝั่งขวา',
      'การจำแนกการเคลื่อนไหวและความลึก (3D Depth Perception)',
      'การส่งผ่านข้อมูลภาพสู่ Dorsal และ Ventral Streams'
    ],
    clinicalTh: 'อาการ Anton-Babinski Syndrome (ตาบอดแต่ไม่ยอมรับว่าบอดและสร้างภาพจินตนาการขึ้นแทน) เกิดจากการเสียหายของกลีบท้ายทอยทั้งสองข้าง'
  },

  // =========================================================================
  // 2. LIMBIC SYSTEM & DEEP NUCLEI (ระบบลิมบิกและสมองส่วนลึก)
  // =========================================================================
  {
    id: 'corpus_callosum',
    nameEn: 'Corpus Callosum',
    nameTh: 'คอร์ปัส คัลโลซัม (Corpus Callosum)',
    system: 'limbic',
    systemNameTh: 'สมองส่วนลึก & ใยประสาทนำส่ง',
    color: '#f43f5e', // Rose
    center: [0, 3, 11],
    descriptionEn: 'The largest white matter tract in the human brain, connecting the left and right cerebral hemispheres with over 200 million axonal fibers.',
    descriptionTh: 'กลุ่มใยประสาทสีขาวที่ใหญ่ที่สุดในสมอง ประกอบด้วยเส้นใยประสาทกว่า 200 ล้านเส้น เชื่อมโยงและส่งผ่านข้อมูลระหว่างสมองซีกซ้ายและขวา',
    functionsTh: [
      'ประสานการทำงานระหว่างสมองสองซีกให้สอดคล้องกัน',
      'การส่งต่อข้อมูลการมองเห็นและการเคลื่อนไหวข้ามซีก',
      'แบ่งออกเป็นส่วน Genu (หน้า), Body (กลาง), Splenium (หลัง)'
    ],
    clinicalTh: 'การผ่าตัดตัดแยก Corpus Callosum (Callosotomy) เคยใช้รักษาโรคลมชักขั้นรุนแรง ทำให้เกิดปรากฏการณ์ "Split-Brain" ที่สมองสองซีกเรียนรู้แยกอิสระจากกัน'
  },
  {
    id: 'thalamus',
    nameEn: 'Thalamus (Bilateral)',
    nameTh: 'ทาลามัส (Thalamus)',
    system: 'limbic',
    systemNameTh: 'ระบบลิมบิกและสมองส่วนลึก',
    color: '#eab308', // Amber / Gold
    center: [0, -12, -2],
    descriptionEn: 'The principal sensory and motor relay station of the brain, gating almost all sensory modalities (except olfaction) before reaching the cortex.',
    descriptionTh: 'สถานีถ่ายทอดสัญญาณประสาท (Relay Station) ที่สำคัญที่สุด ทำหน้าที่คัดกรองและส่งต่อสัญญาณประสาทสัมผัสเกือบทุกชนิด (ยกเว้นกลิ่น) สู่เปลือกสมอง',
    functionsTh: [
      'สถานีส่งสัญญาณรับความรู้สึกสัมผัส ตา หู และการรับรู้รส',
      'การควบคุมวงจรความตื่นตัวของสมองและระดับสติสัมปชัญญะ (Reticular Activating System)',
      'การทำงานเชื่อมโยงกับ Basal Ganglia ในการควบคุมความราบรื่นของการเคลื่อนไหว'
    ],
    clinicalTh: 'กลุ่มอาการ Thalamic Pain Syndrome (Dejerine-Roussy) เกิดจากหลอดเลือดเลี้ยงทาลามัสอุดตัน ทำให้เกิดอาการปวดแสบร้อนอย่างรุนแรงต่อสิ่งเร้าธรรมดา'
  },
  {
    id: 'hypothalamus',
    nameEn: 'Hypothalamus',
    nameTh: 'ไฮโปทาลามัส (Hypothalamus)',
    system: 'limbic',
    systemNameTh: 'ระบบลิมบิกและระบบประสาทอัตโนมัติ',
    color: '#ec4899', // Pink
    center: [0, -18, 6],
    descriptionEn: 'The master regulator of autonomic, endocrine, and homeostatic physiological functions, connecting the nervous and endocrine systems via the pituitary gland.',
    descriptionTh: 'ศูนย์ควบคุมดุลยภาพของร่างกาย (Homeostasis) เชื่อมโยงระบบประสาทเข้ากับระบบต่อมไร้ท่อผ่านต่อมใต้สมอง (Pituitary Gland)',
    functionsTh: [
      'ควบคุมอุณหภูมิร่างกาย ดุลยภาพน้ำ และความดันโลหิต',
      'ควบคุมความรู้สึกหิว อิ่ม กระหาย และน้ำหนักตัว',
      'ควบคุมนาฬิกาชีวภาพและวงจรการนอนหลับ (Suprachiasmatic Nucleus)',
      'หลั่งฮอร์โมนสั่งการต่อมใต้สมอง (CRH, TRH, GnRH, Oxytocin, Vasopressin)'
    ],
    clinicalTh: 'ความผิดปกติที่ไฮโปทาลามัสอาจทำให้เกิดโรคเบาจืด (Diabetes Insipidus จากขาด ADH) หรือภาวะอุณหภูมิร่างกายแปรปรวนอย่างรุนแรง'
  },
  {
    id: 'hippocampus',
    nameEn: 'Hippocampus (Left & Right)',
    nameTh: 'ฮิปโปแคมปัส (Hippocampus - เขาม้าน้ำ)',
    system: 'limbic',
    systemNameTh: 'ระบบลิมบิกและวงจรความจำ (Limbic System)',
    color: '#14b8a6', // Teal
    center: [0, -21, -8],
    descriptionEn: 'A seahorse-shaped curved structure in the medial temporal lobe, indispensable for converting short-term memory into long-term declarative memory and spatial navigation.',
    descriptionTh: 'โครงสร้างรูปเขาม้าน้ำในสมองส่วนลึก ทำหน้าที่สำคัญที่สุดในการสร้าง แปลง และรวบรวมความจำระยะสั้นเป็นความจำระยะยาว (Consolidation) และการสร้างแผนที่ในสมอง',
    functionsTh: [
      'การแปลงความจำระยะสั้นเป็นความจำระยะยาวถาวร (Declarative Memory)',
      'การสร้างแผนที่พิกัดและการนำทางในสิ่งแวดล้อม (Place cells & Grid cells)',
      'การเกิดเซลล์ประสาทใหม่ในสมองผู้ใหญ่ (Adult Neurogenesis ใน Dentate Gyrus)'
    ],
    clinicalTh: 'เป็นโครงสร้างแรกๆ ที่ถูกทำลายใน "โรคอัลไซเมอร์ (Alzheimer\'s Disease)" ส่งผลให้ผู้ป่วยสูญเสียความจำเหตุการณ์ใหม่ๆ ก่อน และหากถูกตัดออกทั้งสองข้างจะจำสิ่งใหม่ไม่ได้เลย (กรณีผู้ป่วย H.M.)'
  },
  {
    id: 'amygdala',
    nameEn: 'Amygdala (Left & Right)',
    nameTh: 'อะมิกดาลา (Amygdala)',
    system: 'limbic',
    systemNameTh: 'ระบบลิมบิกและศูนย์อารมณ์',
    color: '#d946ef', // Fuchsia
    center: [0, -28, 11],
    descriptionEn: 'Almond-shaped cluster of nuclei located deep in the temporal lobes, orchestrating emotional responses, threat detection, and fear conditioning.',
    descriptionTh: 'กลุ่มนิวเคลียสรูปอัลมอนด์ ทำหน้าที่เป็นศูนย์เตือนภัยของสมอง ประมวลผลอารมณ์ โดยเฉพาะความกลัว การระวังภัย และสัญชาตญาณสู้หรือหนี (Fight or Flight)',
    functionsTh: [
      'การประเมินภัยคุกคามและการเรียนรู้ความกลัว (Fear Conditioning)',
      'การกระตุ้นการหลั่งอะดรีนาลีนเมื่อเผชิญสถานการณ์ฉุกเฉิน',
      'การบันทึกความทรงจำที่ผูกพันกับอารมณ์อย่างลึกซึ้ง'
    ],
    clinicalTh: 'กลุ่มอาการ Klüver-Bucy Syndrome เกิดจากอะมิกดาล่าถูกทำลายทั้งสองข้าง ทำให้สัตว์หรือมนุษย์ไร้ความกลัวโดยสิ้นเชิง และมีความต้องการกินสิ่งแปลกปลอม'
  },
  {
    id: 'basal_ganglia',
    nameEn: 'Basal Ganglia (Caudate & Putamen)',
    nameTh: 'ปมประสาทเบซัล (Basal Ganglia)',
    system: 'limbic',
    systemNameTh: 'ระบบควบคุมการเคลื่อนไหวสมองส่วนลึก',
    color: '#ca8a04',
    center: [0, -10, 4],
    descriptionEn: 'Subcortical nuclei involved in motor control, procedural learning, habit formation, and action selection.',
    descriptionTh: 'กลุ่มนิวเคลียสใต้เปลือกสมอง (Caudate Nucleus, Putamen, Globus Pallidus) ทำหน้าที่ปรับจูนความนุ่มนวลและควบคุมการเคลื่อนไหวอัตโนมัติ',
    functionsTh: [
      'ควบคุมการเริ่มต้นและหยุดการเคลื่อนไหวของกล้ามเนื้ออย่างราบรื่น',
      'การเรียนรู้ทักษะและการสร้างนิสัย (Procedural Memory & Habit)',
      'การเชื่อมโยงระบบการให้รางวัลผ่านสารสื่อประสาทโดปามีน (Dopamine Circuit)'
    ],
    clinicalTh: 'การตายของเซลล์ประสาทสร้างโดปามีนใน Substantia Nigra ที่ส่งสัญญาณมายัง Basal Ganglia เป็นสาเหตุของ "โรคพาร์กินสัน (Parkinson\'s Disease)" ทำให้มีอาการสั่น เกร็ง เคลื่อนไหวช้า'
  },

  // =========================================================================
  // 3. VENTRICULAR SYSTEM & CSF (ระบบโพรงสมองและน้ำหล่อเลี้ยง)
  // =========================================================================
  {
    id: 'lateral_ventricles',
    nameEn: 'Lateral Ventricles (Left & Right)',
    nameTh: 'โพรงสมองข้าง (Lateral Ventricles)',
    system: 'ventricles',
    systemNameTh: 'ระบบโพรงสมอง (Ventricular System)',
    color: '#06b6d4', // Cyan
    center: [0, -10, 0],
    descriptionEn: 'C-shaped cavities within each cerebral hemisphere, filled with Cerebrospinal Fluid (CSF) produced by the choroid plexus.',
    descriptionTh: 'โพรงโค้งรูปตัว C ขนาดใหญ่ที่สุดภายในสมองทั้งสองซีก เป็นแหล่งผลิตและบรรจุน้ำเลี้ยงสมองและไขสันหลัง (Cerebrospinal Fluid - CSF) โดย Choroid Plexus',
    functionsTh: [
      'สร้างและกักเก็บน้ำหล่อเลี้ยงสมองและไขสันหลัง (CSF)',
      'ลดแรงกระแทก ช่วยให้สมองลอยตัวอยู่ในกะโหลกศีรษะ (Buoyancy Effect)',
      'ขนส่งสารอาหารและระบายของเสียออกจากเนื้อเยื่อประสาท'
    ],
    clinicalTh: 'ภาวะโพรงสมองคั่งน้ำ (Hydrocephalus) เกิดจากการอุดกั้นของการไหลเวียน CSF ทำให้โพรงสมองขยายตัว ดันเนื้อสมอง และเพิ่มความดันในกะโหลกศีรษะ (ICP)'
  },
  {
    id: 'third_fourth_ventricles',
    nameEn: '3rd & 4th Ventricles and Aqueduct',
    nameTh: 'โพรงสมองที่ 3, 4 และท่อเชื่อม (Cerebral Aqueduct)',
    system: 'ventricles',
    systemNameTh: 'ระบบโพรงสมอง (Ventricular System)',
    color: '#22d3ee',
    center: [0, -26, -6],
    descriptionEn: 'Midline CSF channels connecting the lateral ventricles down to the central canal of the spinal cord and subarachnoid space.',
    descriptionTh: 'ช่องทางเดินน้ำไขสันหลังแนวตรงกลาง จากโพรงสมองที่ 3 ลอดผ่านท่อ Sylvian Aqueduct ไปยังโพรงสมองที่ 4 และระบายสู่ช่องใต้เยื่อหุ้มสมอง',
    functionsTh: [
      'ทางผ่านสำคัญในการไหลเวียนของน้ำ CSF จากสมองส่วนบนสู่ส่วนล่าง',
      'ระบาย CSF ออกสู่ Subarachnoid space ผ่านรู Luschka และ Magendie',
      'ช่วยกระจายแรงดันไฮโดรลิกภายในระบบประสาทส่วนกลาง'
    ],
    clinicalTh: 'Aqueductal Stenosis (ท่อทางเดินน้ำสมองตีบตัน) เป็นสาเหตุสำคัญของ Hydrocephalus ในทารกแรกเกิด ต้องรักษาด้วยการเจาะระบาย (VP Shunt)'
  },

  // =========================================================================
  // 4. BRAINSTEM & CEREBELLUM (ก้านสมองและสมองน้อย)
  // =========================================================================
  {
    id: 'brainstem_midbrain',
    nameEn: 'Midbrain (Mesencephalon)',
    nameTh: 'สมองส่วนกลาง (Midbrain)',
    system: 'brainstem',
    systemNameTh: 'ก้านสมอง (Brainstem)',
    color: '#a855f7', // Purple
    center: [0, -22, -8],
    descriptionEn: 'The uppermost part of the brainstem, mediating auditory/visual reflexes (Superior/Inferior Colliculi) and dopamine generation (Substantia Nigra).',
    descriptionTh: 'ส่วนบนสุดของก้านสมอง ทำหน้าที่เป็นทางผ่านของสัญญาณประสาท ศูนย์ควบคุมรีเฟล็กซ์การมองเห็น การได้ยิน และการเคลื่อนไหวของลูกตา',
    functionsTh: [
      'ศูนย์รีเฟล็กซ์การมองเห็นและการได้ยิน (Tectum / Colliculi)',
      'แหล่งผลิตสารโดปามีนที่สำคัญ (Substantia Nigra & VTA)',
      'ต้นกำเนิดเส้นประสาทสมองคู่ที่ 3 (Oculomotor) และ 4 (Trochlear)'
    ],
    clinicalTh: 'รอยโรคที่ก้านสมองส่วนกลางอาจทำให้หนังตาตก ลูกตาไม่ขยับ (Oculomotor Nerve Palsy) และอาการสั่นผิดปกติ'
  },
  {
    id: 'brainstem_pons',
    nameEn: 'Pons',
    nameTh: 'พอนส์ (Pons)',
    system: 'brainstem',
    systemNameTh: 'ก้านสมอง (Brainstem)',
    color: '#9333ea',
    center: [0, -36, -14],
    descriptionEn: 'Bulbous structure serving as a bridge between the cerebrum, cerebellum, and medulla, housing respiratory rhythm centers.',
    descriptionTh: 'ก้านสมองส่วนกลางที่มีลักษณะพองนูน ทำหน้าที่เป็นสะพานเชื่อมโยงข้อมูลระหว่างสมองใหญ่ สมองน้อย และไขสันหลัง พร้อมควบคุมจังหวะการหายใจ',
    functionsTh: [
      'ควบคุมจังหวะและอัตราการหายใจ (Pneumotaxic & Apneustic Centers)',
      'เชื่อมโยงการสั่งการเคลื่อนไหวจากเปลือกสมองสู่สมองน้อย (Pontine Nuclei)',
      'ต้นกำเนิดเส้นประสาทสมองคู่ที่ 5 (Trigeminal), 6 (Abducens), 7 (Facial)'
    ],
    clinicalTh: 'กลุ่มอาการ Locked-in Syndrome เกิดจากหลอดเลือด Basilar ตีบทำให้พอนส์ขาดเลือด ผู้ป่วยรู้สึกตัวทุกอย่างแต่เป็นอัมพาตทั้งตัว ขยับได้เพียงลูกตาแนวดิ่ง'
  },
  {
    id: 'brainstem_medulla',
    nameEn: 'Medulla Oblongata',
    nameTh: 'เมดัลลา ออบลองกาตา (Medulla Oblongata)',
    system: 'brainstem',
    systemNameTh: 'ก้านสมอง (Brainstem)',
    color: '#7e22ce',
    center: [0, -54, -18],
    descriptionEn: 'The lowermost brainstem directly continuous with the spinal cord; the vital autonomic center for cardiac, vasomotor, and respiratory control.',
    descriptionTh: 'ก้านสมองส่วนล่างสุดที่เชื่อมต่อกับไขสันหลัง เป็นศูนย์ควบคุมสัญญาณชีพ (Vital Center) ที่จำเป็นต่อการมีชีวิตของมนุษย์',
    functionsTh: [
      'ศูนย์ควบคุมการเต้นของหัวใจและความดันโลหิต (Cardiac & Vasomotor Center)',
      'ศูนย์ควบคุมการหายใจอัตโนมัติ (Respiratory Rhythmicity Center)',
      'ศูนย์รีเฟล็กซ์การกลืน การอาเจียน การไอ การจาม และการสะอึก',
      'จุดไขว้ของเส้นใยประสาทสั่งการซ้าย-ขวา (Pyramidal Decussation)'
    ],
    clinicalTh: 'การบาดเจ็บรุนแรงที่เมดัลลา (เช่น กะโหลกยุบกดทับหรือสมองเคลื่อนผ่าน Foramen Magnum) จะทำให้หัวใจและระบบหายใจหยุดทำงานทันทีและเสียชีวิต'
  },
  {
    id: 'cerebellum',
    nameEn: 'Cerebellum (Little Brain)',
    nameTh: 'ซีรีเบลลัม / สมองน้อย (Cerebellum)',
    system: 'cerebellum',
    systemNameTh: 'สมองน้อย (Cerebellum)',
    color: '#10b981', // Emerald / Green
    center: [0, -42, -41],
    descriptionEn: 'Contains more than 50% of the brain’s total neurons; vital for motor coordination, equilibrium, posture, and precision timing.',
    descriptionTh: 'สมองน้อยรูปคล้ายดอกกะหล่ำ บรรจุเซลล์ประสาทมากกว่าครึ่งหนึ่งของสมองทั้งหมด ทำหน้าที่ประมวลผลการทรงตัว ความแม่นยำ และการประสานงานของกล้ามเนื้อ',
    functionsTh: [
      'การทรงตัวของร่างกายและการรักษาจุดศูนย์ถ่วง (Equilibrium & Posture)',
      'ความแม่นยำและการประสานงานกล้ามเนื้อให้ลื่นไหล (Fine Motor Control)',
      'การคำนวณระยะทางและแรงในการเคลื่อนไหว (Motor Timing)',
      'การจดจำทักษะการเคลื่อนไหว เช่น ปั่นจักรยาน เล่นดนตรี'
    ],
    clinicalTh: 'ภาวะ Cerebellar Ataxia (อาการเซ) เกิดจากสมองน้อยเสียหาย ผู้ป่วยจะเดินเซคล้ายคนเมา ชี้นิ้วไม่ตรงเป้า (Dysmetria) และตากระตุก (Nystagmus)'
  },

  // =========================================================================
  // 5. CEREBRAL VASCULATURE (ระบบหลอดเลือดสมอง & CIRCLE OF WILLIS)
  // =========================================================================
  {
    id: 'circle_of_willis',
    nameEn: 'Circle of Willis (Arterial Ring)',
    nameTh: 'วงแหวนหลอดเลือดวิลลิส (Circle of Willis)',
    system: 'vasculature',
    systemNameTh: 'ระบบหลอดเลือดแดงสมอง (Cerebral Vasculature)',
    color: '#ef4444', // Medical Crimson Red
    center: [0, -20, 10],
    descriptionEn: 'The critical anastomotic arterial ring at the base of the brain that equalizes blood pressure and provides collateral circulation between anterior and posterior circulations.',
    descriptionTh: 'วงแหวนหลอดเลือดแดงสำคัญที่ฐานสมอง ทำหน้าที่เชื่อมโยงระบบไหลเวียนเลือดระหว่างหลอดเลือดแดงใหญ่ Carotid และ Vertebrobasilar เพื่อเป็นทางเบี่ยงหล่อเลี้ยงฉุกเฉิน',
    functionsTh: [
      'ปรับสมดุลแรงดันเลือดแดงที่เข้าสู่สมองทั้งสองซีก',
      'เป็นระบบสำรองหลอดเลือด (Collateral Circulation) หากมีเส้นใดเส้นหนึ่งตีบ',
      'จ่ายเลือดแดงที่มีออกซิเจนสูงเข้าสู่เนื้อเยื่อสมองอย่างต่อเนื่อง'
    ],
    clinicalTh: 'จุดเชื่อมต่อของวงแหวนนี้ (โดยเฉพาะ ACoA และ PCoA) เป็นตำแหน่งที่พบบ่อยที่สุดของ "โรคหลอดเลือดสมองโป่งพอง (Berry Aneurysm)" ซึ่งหากแตกจะเกิดเลือดออกใต้เยื่อหุ้มสมอง (SAH)'
  },
  {
    id: 'basilar_vertebral_artery',
    nameEn: 'Basilar & Vertebral Arteries',
    nameTh: 'หลอดเลือดเบซิลาร์และเวอร์ทีบรัล (Basilar & Vertebral Arteries)',
    system: 'vasculature',
    systemNameTh: 'ระบบหลอดเลือดแดงสมอง',
    color: '#dc2626',
    center: [0, -40, -14],
    descriptionEn: 'Posterior circulation arteries formed by the union of two vertebral arteries, delivering blood to the brainstem, cerebellum, and occipital lobes.',
    descriptionTh: 'หลอดเลือดแดงด้านหลัง ทอดตัวขึ้นมาตามกระดูกคอและแนวก้านสมอง ส่งเลือดไปเลี้ยงก้านสมอง สมองน้อย และส่งต่อให้ Posterior Cerebral Artery',
    functionsTh: [
      'จ่ายเลือดแดงไปเลี้ยงก้านสมองและศูนย์สัญญาณชีพ',
      'จ่ายเลือดไปเลี้ยงสมองน้อยผ่านกิ่ง AICA, PICA, SCA',
      'จุดบรรจบสำคัญที่รอยต่อพอนส์-เมดัลลา'
    ],
    clinicalTh: 'Basilar Artery Occlusion เป็นภาวะฉุกเฉินทางสมองที่รุนแรงที่สุด มีอัตราการเสียชีวิตสูงมากหากไม่ได้รับการละลายลิ่มเลือดหรือดึงลิ่มเลือดทันที'
  },
  {
    id: 'middle_cerebral_artery',
    nameEn: 'Middle Cerebral Artery (MCA)',
    nameTh: 'หลอดเลือดแดงมิดเดิลซีรีบรัล (Middle Cerebral Artery - MCA)',
    system: 'vasculature',
    systemNameTh: 'ระบบหลอดเลือดแดงสมอง',
    color: '#f87171',
    center: [0, -20, 12],
    descriptionEn: 'The largest branch of the internal carotid artery, supplying the lateral surface of the frontal, parietal, and temporal lobes (motor, sensory, language centers).',
    descriptionTh: 'หลอดเลือดแดงสมองขนาดใหญ่ที่สุด แตกแขนงจากหลอดเลือด Carotid ไปเลี้ยงพื้นผิวด้านข้างของสมองเกือบทั้งหมด รวมถึงศูนย์สั่งการ ศูนย์รับความรู้สึก และศูนย์ภาษา',
    functionsTh: [
      'ส่งเลือดไปเลี้ยงพื้นที่สั่งการและรับความรู้สึกของใบหน้า แขน และมือ',
      'หล่อเลี้ยงศูนย์ภาษา Broca และ Wernicke ในสมองซีกซ้าย',
      'หล่อเลี้ยงสมองส่วนลึกผ่านแขนง Lenticulostriate Arteries'
    ],
    clinicalTh: 'เป็นหลอดเลือดที่เกิด "โรคหลอดเลือดสมองขาดเลือด (Ischemic Stroke)" บ่อยที่สุดในคลินิก ทำให้เกิดอาการหน้าเบี้ยว แขนขาอ่อนแรงครึ่งซีก และพูดไม่ชัด (FAST Protocol)'
  },
  {
    id: 'anterior_cerebral_artery',
    nameEn: 'Anterior Cerebral Artery (ACA)',
    nameTh: 'หลอดเลือดแดงแอนทีเรียร์ซีรีบรัล (Anterior Cerebral Artery - ACA)',
    system: 'vasculature',
    systemNameTh: 'ระบบหลอดเลือดแดงสมอง',
    color: '#ea580c',
    center: [0, 2, 18],
    descriptionEn: 'Supplies the medial surface of the frontal and parietal lobes, including the leg/foot motor and sensory representation.',
    descriptionTh: 'หลอดเลือดแดงที่ทอดตัวขึ้นไปเลี้ยงพื้นผิวด้านในของสมองกลีบหน้าและกลีบข้าง ควบคุมการสั่งการและการรับความรู้สึกของขาและเท้า',
    functionsTh: [
      'ส่งเลือดไปเลี้ยงสมองส่วนสั่งการและรับความรู้สึกบริเวณขาและเท้า',
      'หล่อเลี้ยงส่วนหน้าของ Corpus Callosum',
      'เชื่อมต่อกันด้วย Anterior Communicating Artery (ACoA)'
    ],
    clinicalTh: 'การอุดตันของ ACA ทำให้เกิดอัมพาตและชาเน้นเฉพาะที่ "ขาและเท้า" ของฝั่งตรงข้าม ร่วมกับความผิดปกติด้านพฤติกรรมและการเดิน'
  },
  {
    id: 'venous_sinuses',
    nameEn: 'Superior Sagittal & Dural Sinuses',
    nameTh: 'แอ่งหลอดเลือดดำเยื่อหุ้มสมอง (Dural Venous Sinuses)',
    system: 'vasculature',
    systemNameTh: 'ระบบหลอดเลือดดำสมอง (Cerebral Venous Drainage)',
    color: '#0284c7', // Dark Cyan / Blue
    center: [0, 10, 30],
    descriptionEn: 'Large venous channels situated between the endosteal and meningeal layers of the dura mater, collecting deoxygenated blood and reabsorbed CSF.',
    descriptionTh: 'ทางเดินหลอดเลือดดำขนาดใหญ่ระหว่างชั้นเยื่อหุ้มสมอง ทำหน้าที่รวบรวมเลือดดำที่ใช้แล้ว และรับการดูดซึมกลับของน้ำไขสันหลังผ่าน Arachnoid Granulations',
    functionsTh: [
      'ระบายเลือดดำจากสมองกลับสู่หลอดเลือด Internal Jugular Vein ที่ลำคอ',
      'เป็นจุดดูดซึมน้ำหล่อเลี้ยงสมอง (CSF) กลับเข้าสู่กระแสเลือด',
      'รักษาสมดุลแรงดันในกะโหลกศีรษะ'
    ],
    clinicalTh: 'ภาวะลิ่มเลือดอุดตันในหลอดเลือดดำสมอง (Cerebral Venous Sinus Thrombosis - CVST) ทำให้ปวดศีรษะรุนแรง ตาพร่ามัว และชัก'
  }
];

// Preset views for quick educational tours
export const EDUCATIONAL_PRESETS = [
  {
    id: 'overview',
    titleTh: '🧠 ภาพรวมสมองทั้งใบ',
    titleEn: 'Whole Brain Overview',
    subtitleTh: 'Cerebral Lobes & Surface Anatomy',
    cameraPos: [0, 15, 210],
    targetPos: [0, 0, 0],
    cortexOpacity: 1.0,
    cuttingPlane: 'none',
    slicePos: 0,
    activeSystems: ['cerebrum', 'limbic', 'ventricles', 'brainstem', 'cerebellum', 'vasculature'],
    infoId: 'frontal_lobe_left'
  },
  {
    id: 'vasculature',
    titleTh: '🩸 วงแหวนหลอดเลือด Circle of Willis',
    titleEn: 'Cerebral Angiography & Circle of Willis',
    subtitleTh: 'Arterial tree & Collateral network',
    cameraPos: [15, -60, 160],
    targetPos: [0, -20, 10],
    cortexOpacity: 0.15, // Peel cortex to reveal blood vessels!
    cuttingPlane: 'none',
    slicePos: 0,
    activeSystems: ['vasculature', 'brainstem'],
    infoId: 'circle_of_willis'
  },
  {
    id: 'limbic_memory',
    titleTh: '⚡ ระบบลิมบิก & ความจำ',
    titleEn: 'Limbic System & Hippocampus',
    subtitleTh: 'Memory, Emotion & Thalamic Relay',
    cameraPos: [-50, 15, 140],
    targetPos: [0, -15, 0],
    cortexOpacity: 0.20,
    cuttingPlane: 'none',
    slicePos: 0,
    activeSystems: ['limbic', 'ventricles'],
    infoId: 'hippocampus'
  },
  {
    id: 'axial_slice',
    titleTh: '🔪 ภาพตัดขวางระดับทาลามัส (Axial Cut)',
    titleEn: 'Axial Cross-Section at Thalamus',
    subtitleTh: '3D MPR Slicing & Internal Anatomy',
    cameraPos: [0, 170, 70],
    targetPos: [0, 0, 0],
    cortexOpacity: 1.0,
    cuttingPlane: 'axial',
    slicePos: 0,
    activeSystems: ['cerebrum', 'limbic', 'ventricles', 'vasculature'],
    infoId: 'thalamus'
  },
  {
    id: 'brainstem_vital',
    titleTh: '🫀 ก้านสมอง & ศูนย์สัญญาณชีพ',
    titleEn: 'Brainstem & Cerebellum',
    subtitleTh: 'Midbrain, Pons, Medulla & Equilibrium',
    cameraPos: [-60, -35, 140],
    targetPos: [0, -40, -15],
    cortexOpacity: 0.22,
    cuttingPlane: 'none',
    slicePos: 0,
    activeSystems: ['brainstem', 'cerebellum'],
    infoId: 'brainstem_medulla'
  },
  {
    id: 'ventricles_csf',
    titleTh: '💧 โพรงสมอง & น้ำไขสันหลัง (CSF)',
    titleEn: 'Ventricular System & CSF Dynamics',
    subtitleTh: 'Lateral, 3rd, 4th Ventricles & Hydrocephalus',
    cameraPos: [60, 25, 140],
    targetPos: [0, -10, 0],
    cortexOpacity: 0.20,
    cuttingPlane: 'none',
    slicePos: 0,
    activeSystems: ['ventricles', 'limbic'],
    infoId: 'lateral_ventricles'
  }
];
