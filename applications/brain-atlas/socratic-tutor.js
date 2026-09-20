/**
 * Brain Atlas 3D - Socratic AI Clinical Preceptor & Misconception Diagnosis Engine
 * Built on Conceptual Change Model & Posner's Cognitive Conflict Scaffolding
 * (Ref: edtech-socratic-ai skill & neuroanatomy clinical education)
 */

import { sound } from './audio.js';

/**
 * Expert Diagnostic Misconception Matrix for Clinical Case Studies
 */
export const CLINICAL_MISCONCEPTIONS = {
  case_stroke_broca: {
    // Correct: Ischemic Stroke (MCA) -> Left Inferior Frontal Gyrus (Broca)
    wrongDiagnoses: {
      diag_wernicke_aphasia: {
        misconceptionTh: 'สับสนระหว่างศูนย์สั่งการเปล่งคำพูด (Motor Speech Output) กับศูนย์ทำความเข้าใจภาษา (Sensory Comprehension)',
        misconceptionEn: 'Confusing motor speech production (Broca) with language comprehension (Wernicke)',
        socraticQuestionTh: '💡 สังเกตผลตรวจ Mental Status ในเวชระเบียน: ผู้ป่วยสามารถเข้าใจคำสั่งซับซ้อน 3 ขั้นตอนและพยักหน้าตอบได้ถูกต้องสมบูรณ์ ถ้าเป็น Wernicke\'s Aphasia ผู้ป่วยจะพูดจาน้ำไหลไฟดับแต่จับใจความไม่ได้และไม่เข้าใจสิ่งที่ฟังหรือไม่? จุดที่บกพร่องของผู้ป่วยรายนี้อยู่ที่ "การเข้าใจ" หรือ "การขยับกล้ามเนื้อเปล่งคำ"?',
        socraticQuestionEn: '💡 Note the Mental Status exam: The patient comprehends complex 3-step commands perfectly. In Wernicke\'s aphasia, speech is fluent but nonsensical ("word salad") with severe loss of comprehension. Is this patient suffering from comprehension failure, or motor articulation arrest?',
        counterExampleTh: 'เปรียบเสมือนนักดนตรีที่อ่านโน้ตเพลงออกทุกตัวและได้ยินเสียงเพลงในหัวชัดเจน แต่สายเครื่องดนตรีขาดจึงเล่นเสียงออกมาไม่ได้',
        counterExampleEn: 'Like a musician who reads sheet music perfectly and hears the song in their head, but has broken strings and cannot produce the acoustic notes.',
        recommendedTweak: { action: 'focus_broca', text: 'ตรวจดูบริเวณ Left Inferior Frontal Gyrus และเปรียบเทียบกับ Temporal Lobe' }
      },
      diag_basilar_stroke: {
        misconceptionTh: 'เข้าใจผิดว่าความผิดปกติด้านการพูดเฉพาะจุดเกิดจากการขาดเลือดที่ก้านสมองส่วนหลัง (Posterior Circulation)',
        misconceptionEn: 'Attributing focal cortical speech arrest to posterior circulation / brainstem failure',
        socraticQuestionTh: '💡 หลอดเลือด Basilar Artery ส่งเลือดไปเลี้ยงก้านสมอง (Pons/Medulla) และศูนย์การตื่นตัว (RAS) หากก้านสมองขาดเลือด ผู้ป่วยมักหมดสติ หรือเป็นอัมพาตทั้งสี่รยางค์ (Quadriplegia) แต่นี่ผู้ป่วยรู้สึกตัวดีและแขนขาข้างซ้ายขยับได้ปกติ หลอดเลือดเส้นใดที่เลี้ยงเปลือกสมองซีกซ้ายด้านข้าง?',
        socraticQuestionEn: '💡 The basilar artery supplies the brainstem (pons/medulla) and the reticular activating system. Basilar occlusion typically causes coma or quadriplegia. Why is this patient fully alert with completely normal left limbs?',
        counterExampleTh: 'หากสถานีไฟฟ้าย่อยดับเพียงเขตเดียว ไฟจะดับเฉพาะซอยนั้น ไม่ได้แปลว่าเขื่อนหลักทั้งประเทศพังทลาย',
        counterExampleEn: 'A blown neighborhood substation cuts power to one block, not the entire national power grid.',
        recommendedTweak: { action: 'align_mca', text: 'สำรวจแนวหลอดเลือด Middle Cerebral Artery (MCA) ที่ทอดเข้าสู่ Sylvian Fissure' }
      },
      diag_bell_palsy: {
        misconceptionTh: 'สับสนระหว่างอัมพาตเส้นประสาทสมองส่วนปลาย (LMN Facial Palsy) กับอัมพาตเซลล์ประสาทสั่งการส่วนบน (UMN Cortical Stroke)',
        misconceptionEn: 'Confusing lower motor neuron CN VII Bell\'s palsy with upper motor neuron hemispheric stroke',
        socraticQuestionTh: '💡 สังเกตอาการทางระบบประสาท: ผู้ป่วยรายนี้มีแขนขวาตกอ่อนแรง (Arm drift) และพูดไม่ได้ร่วมด้วย Bell\'s palsy เกิดจากเส้นประสาทสมองคู่ที่ 7 อักเสบ จะทำให้แขนขาอ่อนแรงหรือสูญเสียภาษาได้หรือไม่?',
        socraticQuestionEn: '💡 In Bell\'s palsy, isolated cranial nerve VII inflammation causes facial paralysis. Can a peripheral facial nerve lesion ever cause right arm paralysis or loss of expressive language?',
        counterExampleTh: 'สายไฟสวิตช์ไฟหน้าบ้านขาด จะไม่ทำให้เครื่องซักผ้าในครัวและคอมพิวเตอร์ในห้องนอนดับพร้อมกัน',
        counterExampleEn: 'A severed front porch light switch does not trip the washing machine circuit in the kitchen.',
        recommendedTweak: { action: 'view_homunculus', text: 'ดูแผนผัง Homunculus ของ Motor Strip ที่ควบคุมทั้งใบหน้าและมือ' }
      }
    },
    wrongStructures: {
      temporal_lobe_left: {
        feedbackTh: 'คุณเลือก Temporal Lobe ซีกซ้าย ซึ่งเป็นที่ตั้งของ Wernicke\'s Area (ความเข้าใจภาษา) แต่ผู้ป่วยรายนี้เข้าใจภาษาได้ดีเยี่ยม ส่วนที่ควบคุมการเปล่งคำพูดอยู่ใน Frontal Lobe บริเวณใด?',
        feedbackEn: 'You selected the Left Temporal Lobe (Wernicke\'s area for comprehension). But this patient understands language flawlessly. Which frontal lobe gyrus controls speech motor output?'
      },
      brainstem_pons: {
        feedbackTh: 'ก้านสมองส่วน Pons ควบคุมการทำงานของเส้นประสาทสมองและสะพานเชื่อมสมองน้อย แต่ศูนย์รวมโปรแกรมภาษาชั้นสูง (Higher Cortical Speech) อยู่ที่ผิวเปลือกสมองส่วนใด?',
        feedbackEn: 'The pons mediates cranial nerve nuclei and cerebellar coordination, but higher cortical language programming resides in the cerebral cortex.'
      }
    }
  },

  case_phineas_gage: {
    wrongDiagnoses: {
      diag_broca_stroke: {
        misconceptionTh: 'เข้าใจผิดว่าการบาดเจ็บที่สมองกลีบหน้าต้องทำให้พูดไม่ได้เสมอไป โดยไม่ได้แยกแยะระหว่าง Motor Cortex กับ Prefrontal Cortex',
        misconceptionEn: 'Assuming any frontal lobe trauma causes speech arrest without distinguishing Prefrontal from Broca\'s area',
        socraticQuestionTh: '💡 รายงานทางการแพทย์ระบุว่า Phineas Gage ยังพูดคุย สื่อสาร เล่าเรื่อง และใช้เหตุผลทางภาษาได้ตามปกติ แต่สิ่งที่เปลี่ยนไปโดยสิ้นเชิงคือ "บุคลิกภาพ อารมณ์ และความเคารพต่อผู้อื่น" สมองกลีบหน้าส่วนใดที่ทำหน้าที่ควบคุมบุคลิกภาพ จริยธรรม และการยับยั้งชั่งใจ (Executive Function)?',
        socraticQuestionEn: '💡 Dr. Harlow noted Gage spoke fluently and retained intellect, but "Gage was no longer Gage"—becoming profane, irreverent, and impulsive. Which specific prefrontal subregion controls social inhibition and emotional morality?',
        counterExampleTh: 'เหมือนรถยนต์ที่เครื่องยนต์และพวงมาลัยทำงานได้ปกติ แต่ระบบเบรกและกฎระเบียบคนขับเสียไป',
        counterExampleEn: 'Like a car with a perfectly functioning engine and transmission, but missing brakes and a driver who ignores traffic laws.',
        recommendedTweak: { action: 'focus_prefrontal', text: 'สังเกตบริเวณ Orbitofrontal / Ventromedial Prefrontal Cortex เหนือเบ้าตา' }
      },
      diag_alzheimer_dementia: {
        misconceptionTh: 'สับสนระหว่างการเสื่อมของระบบความจำทั่วทั้งสมอง (Alzheimer) กับการสูญเสียการควบคุมทางสังคมแบบเฉียบพลันจากอุบัติเหตุ (Frontal Lobe Trauma)',
        misconceptionEn: 'Confusing progressive neurodegenerative memory decline with acute traumatic orbitofrontal disinhibition',
        socraticQuestionTh: '💡 Phineas Gage ยังจดจำอดีต จดจำเพื่อนร่วมงาน และทำงานคำนวณเงินค่าจ้างได้แม่นยำ ไม่ได้มีความจำเสื่อม สาเหตุของความก้าวร้าวเกิดขึ้นทันทีหลังแท่งเหล็กพุ่งทะลุเบ้าตาขึ้นสู่สมองส่วนใด?',
        socraticQuestionEn: '💡 Gage retained autobiographical memory and mathematical competence without amnesia. His behavioral change occurred immediately following a tamping iron penetration through which cranial zone?',
        counterExampleTh: 'สมุดบันทึกไม่ได้เปียกน้ำจนตัวหนังสือเลือนหายไป แต่ผู้ถือสมุดตัดสินใจฉีกหน้าที่ไม่พอใจทิ้งเพราะขาดการยับยั้งชั่งใจ',
        counterExampleEn: 'The ledger pages did not fade over decades; the accountant simply lost his temper and ripped pages in impulsive rage.',
        recommendedTweak: { action: 'align_sagittal', text: 'ตรวจดูวิถีของแท่งเหล็กในระนาบผ่าตัด Sagittal' }
      }
    }
  },

  case_patient_hm: {
    wrongDiagnoses: {
      diag_retrograde_amnesia: {
        misconceptionTh: 'สับสนระหว่างการสูญเสียความจำในอดีต (Retrograde) กับการไม่สามารถสร้างความจำใหม่หลังเกิดเหตุการณ์ (Anterograde)',
        misconceptionEn: 'Confusing loss of past memories (retrograde) with inability to form new declarative memories (anterograde)',
        socraticQuestionTh: '💡 ดร.เบรนดา มิลเนอร์ พบว่า H.M. สามารถจำเรื่องราวในวัยเด็กและครอบครัวก่อนอายุ 27 ปีได้แจ่มชัด แต่เขากลับจำไม่ได้ว่าเพิ่งคุยกับหมอเมื่อ 5 นาทีที่แล้ว สิ่งนี้คือการสูญเสียความจำเก่า หรือความล้มเหลวในการแปลงความจำระยะสั้นเป็นความจำระยะยาว (Consolidation)?',
        socraticQuestionEn: '💡 Dr. Brenda Milner demonstrated H.M. recalled his childhood vividly, but forgot meeting his doctor 5 minutes earlier. Is this a retrieval failure of old memories, or a failure to consolidate new working memories into long-term storage?',
        counterExampleTh: 'ฮาร์ดดิสก์ที่มีข้อมูลเก่ายังอ่านได้ปกติ แต่หัวบันทึกข้อมูลใหม่ (Write-head) พัง ไม่สามารถ Save ไฟล์ใหม่ลงไปได้อีก',
        counterExampleEn: 'A computer hard drive can read old files from 1950, but the write-head is broken and cannot save any new document.',
        recommendedTweak: { action: 'focus_hippocampus', text: 'โฟกัสที่ฮิปโปแคมปัส (Hippocampus) ในส่วนลึกของ Temporal Lobe' }
      }
    }
  },

  case_cerebellar_ataxia: {
    wrongDiagnoses: {
      diag_parkinson_tremor: {
        misconceptionTh: 'สับสนระหว่างอาการสั่นขณะอยู่นิ่ง (Resting Tremor / Parkinson) กับอาการสั่นเมื่อตั้งใจเอื้อมมือแตะเป้าหมาย (Intention Tremor / Cerebellar)',
        misconceptionEn: 'Confusing basal ganglia resting tremor (pill-rolling) with cerebellar intention tremor (target overshoot)',
        socraticQuestionTh: '💡 สังเกตการทดสอบ Finger-to-Nose: เมื่อวางมืออยู่นิ่งๆ แขนของคนไข้ไม่สั่นเลย แต่อาการสั่นรุนแรงขึ้นเรื่อยๆ เมื่อปลายนิ้วเข้าใกล้จมูกแพทย์ (Intention Tremor) อาการสั่นของพาร์กินสันจะเกิดขึ้นตอนอยู่นิ่งหรือตอนเคลื่อนไหว?',
        socraticQuestionEn: '💡 Note the finger-to-nose test: At rest, the patient\'s hand is calm. Tremor erupts only as the finger nears the examiner\'s nose (Intention tremor / Dysmetria). Does Parkinson\'s tremor occur at rest or during intentional reaching?',
        counterExampleTh: 'พาร์กินสันเหมือนเครื่องยนต์เดินเบาแล้วตัวถังสั่น แต่สมองน้อยเหมือนระบบนำวิถีขีปนาวุธที่แกว่งซ้ายขวาเลยเป้าหมายไปมา (Over-correcting)',
        counterExampleEn: 'Parkinson\'s is like an idling car engine vibrating at a stoplight; cerebellar ataxia is like a missile guidance computer oscillating wildly as it overshoots its target.',
        recommendedTweak: { action: 'focus_cerebellum', text: 'ตรวจดูเปลือกสมองน้อย Cerebellar Hemisphere และ Vermis' }
      },
      diag_motor_cortex_stroke: {
        misconceptionTh: 'เข้าใจผิดว่าการเดินเซเกิดจากกล้ามเนื้อเป็นอัมพาต (Weakness) แทนที่จะเป็นการสูญเสียการประสานงาน (Incoordination)',
        misconceptionEn: 'Assuming staggering gait is due to muscle motor weakness rather than sensory-motor calibration loss',
        socraticQuestionTh: '💡 กำลังกล้ามเนื้อของผู้ป่วยรายนี้วัดได้ Grade 5/5 เต็ม (แรงดีปกติทุกมัด!) คนไข้ไม่ได้เป็นอัมพาต แต่อวัยวะใดทำหน้าที่เป็น "ผู้ตรวจทานและปรับแต่งความราบรื่นของการเคลื่อนไหว"?',
        socraticQuestionEn: '💡 Motor power examination showed Grade 5/5 strength throughout. If the muscles are strong, which organ calibrates real-time timing and motor coordination?',
        counterExampleTh: 'นักเต้นที่มีแรงขาแข็งแรงมาก แต่มึนเมาจนก้าวขาผิดจังหวะและกะระยะบันไดพลาด',
        counterExampleEn: 'A dancer with Olympic leg strength who has consumed too much alcohol and cannot gauge step distance.',
        recommendedTweak: { action: 'focus_cerebellum', text: 'สำรวจสมองน้อย (Cerebellum) และหลอดเลือด PICA/SCA' }
      }
    }
  },

  case_homonymous_hemianopsia: {
    wrongDiagnoses: {
      diag_chiasm_adenoma: {
        misconceptionTh: 'สับสนระหว่างรอยโรคที่ Optic Chiasm (Bitemporal / มองไม่เห็นขอบนอกสองข้าง) กับรอยโรคหลัง Chiasm (Homonymous / มองไม่เห็นครึ่งซีกเดียวกันของตาทั้งสองข้าง)',
        misconceptionEn: 'Confusing optic chiasm bitemporal hemianopsia (tunnel vision) with post-chiasmatic homonymous hemianopsia',
        socraticQuestionTh: '💡 ดูภาพผลตรวจลานสายตา Perimetry: ผู้ป่วยมองไม่เห็น "ครึ่งซีกขวา" ของทั้งตาซ้ายและตาขวา (Right Homonymous Hemianopsia) ถ้าก้อนเนื้องอกกดทับที่จุดตัด Optic Chiasm จะทำให้สูญเสียลานสายตาด้านในหรือด้านนอกของตาทั้งสองข้าง (Bitemporal)?',
        socraticQuestionEn: '💡 Examine the perimetry map: The patient is blind in the right hemifield of BOTH eyes. Optic chiasm compression from a pituitary adenoma damages decussating nasal fibers, causing bitemporal tunnel vision. Why is this patient blind to the entire right side of the universe?',
        counterExampleTh: 'กากบาทแยกทางรถไฟ: หากตัดตรงกากบาท รางทั้งสองข้างจะเสียด้านนอก แต่ถ้าตัดสายไฟหลังชุมทาง สายไฟจากทั้งสองตู้จะดับไปพร้อมกันครึ่งขบวน',
        counterExampleEn: 'Cutting the rail junction crossover halts outer traffic; cutting the line far behind the junction plunges the entire right track into darkness.',
        recommendedTweak: { action: 'align_occipital', text: 'ตรวจดู Primary Visual Cortex (V1) รอบร่อง Calcarine Sulcus ในกลีบท้ายทอยซีกซ้าย' }
      }
    }
  },

  case_locked_in_syndrome: {
    wrongDiagnoses: {
      diag_persistent_vegetative: {
        misconceptionTh: 'เข้าใจผิดว่าการเป็นอัมพาตทั้งตัวและพูดไม่ได้หมายถึงการสูญเสียสติสัมปชัญญะหรือสมองตาย',
        misconceptionEn: 'Equating complete motor paralysis and anarthria with unconsciousness or brain death',
        socraticQuestionTh: '💡 สังเกตสัญญาณคลื่นสมอง EEG ในห้องแล็บ: ผู้ป่วยมีคลื่น Alpha 10 Hz ที่สมบูรณ์แบบ และสามารถสื่อสารตอบคำถาม "ใช่/ไม่ใช่" โดยการ "กะพริบตาและกลอกตาขึ้นลง" ตามสั่งได้! ถ้าคนไข้ยังมีความรู้สึกนึกคิดสมบูรณ์ 100% แต่สายสัญญาณสั่งการ motor ทั้งหมดถูกตัดขาดที่ก้านสมองส่วนหน้า—ภาวะนี้เรียกว่าอะไร?',
        socraticQuestionEn: '💡 Look at the EEG: Normal reactive posterior 10-Hz alpha rhythm. The patient blinks once for "yes" and twice for "no" on command using vertical gaze (CN III). If consciousness is 100% intact but motor output is severed in the ventral pons, what is this condition?',
        counterExampleTh: 'เหมือนนักบินอวกาศที่มีสติสัมปชัญญะและวิทยุรับฟังคำสั่งได้ชัดเจน แต่สวิตช์ส่งสัญญาณเสียงและคันบังคับยานถูกล็อกตายจากภายนอก',
        counterExampleEn: 'Like an astronaut who hears every word from ground control over their radio headset, but whose microphone and thruster controls have been physically unplugged.',
        recommendedTweak: { action: 'focus_pons', text: 'สำรวจ Ventral Pons และหลอดเลือด Basilar Artery' }
      }
    }
  }
};

/**
 * Socratic AI Tutor Controller
 */
export class SocraticTutor {
  constructor(options = {}) {
    this.onPreceptorSpeech = options.onPreceptorSpeech || (() => {});
    this.onSuggestedAction = options.onSuggestedAction || (() => {});
  }

  /**
   * Evaluate student's diagnostic choices and return tailored Socratic inquiry
   */
  diagnoseCaseSubmission(caseId, selectedDiagId, selectedMechId, suspectedStructureId) {
    const caseMisconceptions = CLINICAL_MISCONCEPTIONS[caseId];
    if (!caseMisconceptions) return null;

    let diagnosedIssue = null;

    // 1. Check if wrong diagnosis was selected
    if (selectedDiagId && caseMisconceptions.wrongDiagnoses && caseMisconceptions.wrongDiagnoses[selectedDiagId]) {
      diagnosedIssue = {
        type: 'diagnosis_misconception',
        ...caseMisconceptions.wrongDiagnoses[selectedDiagId]
      };
    }
    // 2. Or check if wrong structure was chosen
    else if (suspectedStructureId && caseMisconceptions.wrongStructures && caseMisconceptions.wrongStructures[suspectedStructureId]) {
      diagnosedIssue = {
        type: 'structure_misconception',
        ...caseMisconceptions.wrongStructures[suspectedStructureId]
      };
    }

    if (diagnosedIssue) {
      sound.playSocraticPrompt();
    }

    return diagnosedIssue;
  }

  /**
   * Provide a guided exploratory inquiry when student asks for preceptor guidance
   */
  getGeneralSocraticHint(caseItem, lang = 'th') {
    if (!caseItem) return null;
    sound.playSocraticPrompt();

    const isEn = lang === 'en';
    return {
      title: isEn ? '👨‍⚕️ Clinical Preceptor Socratic Inquiry' : '👨‍⚕️ คำถามนำทางจากอาจารย์แพทย์ (Socratic Inquiry)',
      question: isEn ?
        `Consider patient ${caseItem.titleEn || ''}: review the vital clues in the Intake record. Which specific functional modality (speech articulation, comprehension, visual field, coordination, or executive inhibition) is impaired while preserving others?` :
        `พิจารณาคนไข้ "${caseItem.titleTh}": ลองทบทวนอาการสำคัญในเวชระเบียน ระบบการทำงานใดของสมองที่เสียไป (การเปล่งเสียง, ความเข้าใจ, ลานสายตา, การประสานงาน, หรือการยับยั้งชั่งใจ) โดยที่ระบบอื่นยังทำงานได้ปกติ? สิ่งนี้บอกอะไรเกี่ยวกับตำแหน่งรอยโรค?`,
      chips: isEn ? [
        'Analyze Mental Status',
        'Inspect MRI Contrast Slices',
        'Trace Blood Supply'
      ] : [
        'วิเคราะห์ผลตรวจ Mental Status',
        'ดูภาพสแกน MRI ตัดระนาบ',
        'ตรวจหาหลอดเลือดที่ส่งไปเลี้ยง'
      ]
    };
  }

  /**
   * Socratic Clue generator for Quest Mode when student clicks incorrect structure
   */
  diagnoseQuestSelection(targetStructure, selectedStructure, lang = 'th') {
    if (!targetStructure || !selectedStructure) return null;

    const isEn = lang === 'en';
    sound.playSocraticPrompt();

    return {
      title: isEn ? '🦉 Dr. Socratic Clue' : '🦉 ข้อสังเกตจาก ดร.โสเครตีส',
      feedback: isEn ?
        `You selected "${selectedStructure.nameEn}". While it is part of the ${selectedStructure.system}, our target structure "${targetStructure.nameEn}" is responsible for ${targetStructure.descriptionEn?.slice(0, 100)}... How do their anatomical locations differ?` :
        `คุณเลือก "${selectedStructure.nameTh}" ซึ่งเป็นส่วนหนึ่งของ ${selectedStructure.systemNameTh} แต่เป้าหมายของเรามีหน้าที่หลักคือ "${targetStructure.descriptionTh?.slice(0, 100)}..." ลองสังเกตความแตกต่างของตำแหน่งใน 3D ดูอีกครั้ง!`
    };
  }
}

export const socraticTutor = new SocraticTutor();
