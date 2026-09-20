/**
 * Brain Atlas 3D - Neuro-Pinpoint Quest System
 * Aligned with Secondary Biology (ม.ปลาย ระบบประสาท) & Pre-Med Inquiry
 * Provides scaffolded gamified exploration, clinical detective challenges, and instant feedback.
 */

import { BRAIN_STRUCTURES } from './brain-data.js';
import { sound } from './audio.js';

export const QUEST_QUESTIONS = [
  {
    id: 'quest_broca',
    level: 1,
    levelNameTh: 'ระดับ 1: พื้นฐานกลีบสมอง',
    targetId: 'frontal_lobe_left',
    promptTh: '🎯 ตามหา "ศูนย์ควบคุมการพูดและการวางแผน" (Broca\'s Area & Motor Cortex) ซึ่งควบคุมกล้ามเนื้อฝั่งขวา',
    promptEn: 'Find the Left Frontal Lobe (Broca\'s Area & Motor Executive)',
    symptomTh: 'ผู้ป่วยเข้าใจภาษาที่คนอื่นพูดทุกอย่าง แต่ไม่สามารถเปล่งเสียงพูดออกมาเป็นประโยคได้ (Broca\'s Aphasia)',
    hintTh: 'อยู่บริเวณส่วนหน้าสุดของสมองใหญ่ (Cerebrum) ซีกซ้าย สังเกต Precentral Gyrus',
    funFactTh: '💡 ทราบหรือไม่? สมองกลีบหน้าซีกซ้ายเป็นจุดที่พบรอยโรคของกรณีผู้ป่วย "Tan" ที่นายแพทย์ Paul Broca ค้นพบในปี ค.ศ. 1861',
    recommendedPeel: 1.0,
    system: 'cerebrum'
  },
  {
    id: 'quest_vision',
    level: 1,
    levelNameTh: 'ระดับ 1: ประสาทรับสัมผัส',
    targetId: 'occipital_lobe_left',
    altTargetIds: ['occipital_lobe_right'],
    promptTh: '🎯 ตามหา "ศูนย์กลางการมองเห็นและการแปลผลภาพ" (Primary Visual Cortex - V1)',
    promptEn: 'Find the Occipital Lobe (Visual Processing Center)',
    symptomTh: 'หากถูกกระแทกที่ท้ายทอยอย่างแรง อาจเห็นดาวประกายแสง หรือสูญเสียการมองเห็นชั่วคราว',
    hintTh: 'อยู่บริเวณด้านหลังสุดของสมองใหญ่ (Occipital Pole) บริเวณแนวร่อง Calcarine Sulcus',
    funFactTh: '💡 ลานสายตาซีกขวาจะถูกส่งข้ามไปประมวลผลที่สมองกลีบท้ายทอยซีกซ้าย และลานสายตาซีกซ้ายจะส่งไปที่ซีกขวา!',
    recommendedPeel: 1.0,
    system: 'cerebrum'
  },
  {
    id: 'quest_cerebellum',
    level: 1,
    levelNameTh: 'ระดับ 1: การประสานงานกล้ามเนื้อ',
    targetId: 'cerebellum',
    promptTh: '🎯 ตามหา "สมองน้อย" ซึ่งบรรจุเซลล์ประสาทมากกว่า 50% ของทั้งสมอง ทำหน้าที่ควบคุมการทรงตัวและความแม่นยำ',
    promptEn: 'Find the Cerebellum (The Little Brain & Motor Coordination)',
    symptomTh: 'ผู้ป่วยเดินเซคล้ายคนเมา (Ataxia), กะระยะชี้นิ้วไม่ถูก (Dysmetria) แม้กล้ามเนื้อจะไม่อ่อนแรง',
    hintTh: 'อยู่ด้านหลังและด้านล่างของกะโหลกศีรษะ (Posterior Fossa) ใต้สมองกลีบท้ายทอย มีรอยพับเป็นริ้วละเอียด (Folia)',
    funFactTh: '💡 แอลกอฮอล์จะกดการทำงานของเซลล์ Purkinje ในสมองน้อยเป็นอันดับแรกๆ ทำให้ผู้ดื่มสูญเสียการทรงตัวและเดินเป๋!',
    recommendedPeel: 1.0,
    system: 'cerebellum'
  },
  {
    id: 'quest_memory',
    level: 2,
    levelNameTh: 'ระดับ 2: ระบบลิมบิกและความจำ',
    targetId: 'hippocampus',
    promptTh: '🎯 ตามหาโครงสร้างรูป "เขาม้าน้ำ" ในสมองส่วนลึก ซึ่งทำหน้าที่เปลี่ยนความจำระยะสั้นให้กลายเป็นความจำระยะยาว',
    promptEn: 'Find the Hippocampus (Memory Consolidation & Spatial Navigation)',
    symptomTh: 'ผู้ป่วยจำเรื่องราวในอดีตวัยเด็กได้ แต่ไม่สามารถสร้างความทรงจำใหม่หลังเกิดเหตุการณ์ได้เลย (กรณีศึกษาผู้ป่วย H.M.)',
    hintTh: 'ลองลอกผิวเปลือกสมองออก (Peel Cortex < 30%) เพื่อมองเข้าไปในกลีบขมับส่วนใน (Medial Temporal Lobe)',
    funFactTh: '💡 คำว่า Hippocampus มาจากภาษากรีกโบราณ hippos (ม้า) + kampos (สัตว์ประหลาดทะเล) เพราะรูปร่างคล้ายเขาม้าน้ำตัวจิ๋ว',
    recommendedPeel: 0.2,
    system: 'limbic'
  },
  {
    id: 'quest_alarm',
    level: 2,
    levelNameTh: 'ระดับ 2: ศูนย์อารมณ์และสัญชาตญาณ',
    targetId: 'amygdala',
    promptTh: '🎯 ตามหากลุ่มนิวเคลียสรูป "อัลมอนด์" ซึ่งทำหน้าที่เป็นศูนย์เตือนภัย รับรู้ความกลัว และกระตุ้นโหมดสู้หรือหนี (Fight or Flight)',
    promptEn: 'Find the Amygdala (Threat Evaluation & Fear Conditioning)',
    symptomTh: 'หากถูกทำลายทั้งสองข้าง ผู้ป่วยจะไม่รู้สึกกลัวสิ่งใดเลย แม้แต่งูพิษ แมงมุม หรือสถานการณ์คุกคามชีวิต (Klüver-Bucy Syndrome)',
    hintTh: 'อยู่ติดกับส่วนหัวของฮิปโปแคมปัส ในส่วนลึกของสมองกลีบขมับ',
    funFactTh: '💡 อะมิกดาลาสามารถสั่งการตอบสนองต่อภัยอันตรายได้เร็วกว่าที่สมองใหญ่ส่วนคิด (Cortex) จะตระหนักรู้ถึง 0.02 วินาที!',
    recommendedPeel: 0.2,
    system: 'limbic'
  },
  {
    id: 'quest_relay',
    level: 2,
    levelNameTh: 'ระดับ 2: ชุมทางสัญญาณประสาท',
    targetId: 'thalamus',
    promptTh: '🎯 ตามหา "สถานีถ่ายทอดสัญญาณประสาทสัมผัส" (Relay Station) ที่คัดกรองข้อมูลเกือบทุกชนิด (ยกเว้นกลิ่น) สู่เปลือกสมอง',
    promptEn: 'Find the Thalamus (Principal Sensory & Motor Relay Station)',
    symptomTh: 'ผู้ป่วยเกิดอาการปวดแสบร้อนอย่างรุนแรงเมื่อถูกลูบผิวเบาๆ (Thalamic Pain Syndrome)',
    hintTh: 'ก้อนรูปไข่คู่ขนาดใหญ่ ตั้งอยู่ใจกลางสมองส่วนกลาง เหนือก้านสมอง ลองเปิดระนาบตัด Axial หรือลอกเปลือกสมอง',
    funFactTh: '💡 สัญญาณรับกลิ่น (Olfaction) เป็นประสาทสัมผัสเดียวที่ไม่ต้องผ่านทาลามัส แต่ส่งตรงเข้าสู่วงจรลิมบิก ทำให้กลิ่นกระตุ้นอารมณ์ความทรงจำได้ทรงพลัง!',
    recommendedPeel: 0.15,
    system: 'limbic'
  },
  {
    id: 'quest_vital',
    level: 2,
    levelNameTh: 'ระดับ 2: ศูนย์สัญญาณชีพ',
    targetId: 'brainstem_medulla',
    promptTh: '🎯 ตามหาก้านสมองส่วนล่างสุด "ศูนย์ควบคุมสัญญาณชีพ" ที่สั่งการเต้นของหัวใจ ความดันเลือด และการหายใจอัตโนมัติ',
    promptEn: 'Find the Medulla Oblongata (Vital Cardiac & Respiratory Center)',
    symptomTh: 'การบาดเจ็บบริเวณนี้ทำให้หัวใจและระบบหายใจหยุดทำงานทันที และทำให้เสียชีวิตเฉียบพลัน',
    hintTh: 'อยู่ปลายล่างสุดของก้านสมอง ก่อนที่จะต่อเข้ากับไขสันหลัง (Spinal Cord) ตรงฐานกะโหลก',
    funFactTh: '💡 เมดัลลายังเป็นศูนย์ควบคุมรีเฟล็กซ์คุ้มกันร่างกาย เช่น การไอ จาม กลืน อาเจียน และสะอึก!',
    recommendedPeel: 0.25,
    system: 'brainstem'
  },
  {
    id: 'quest_bridge',
    level: 2,
    levelNameTh: 'ระดับ 2: สะพานใยประสาทเชื่อมสมอง',
    targetId: 'corpus_callosum',
    promptTh: '🎯 ตามหากลุ่มใยประสาทสีขาวหนาแน่นกว่า 200 ล้านเส้น ที่ทำหน้าที่เชื่อมต่อและส่งสัญญาณข้ามระหว่างสมองซีกซ้ายและขวา',
    promptEn: 'Find the Corpus Callosum (Interhemispheric White Matter Bridge)',
    symptomTh: 'เมื่อถูกตัดแยก (Split-Brain) สมองซีกซ้ายและขวาจะไม่สามารถสื่อสารกันได้ ผู้ป่วยจะหยิบของด้วยมือซ้ายแต่บอกชื่อสิ่งนั้นไม่ได้!',
    hintTh: 'โครงสร้างรูปโค้ง C ทอดตัวตามแนวกึ่งกลางเหนือโพรงสมอง ลองสังเกตในมุมมองด้านข้าง Sagittal',
    funFactTh: '💡 ในยุค 1960s การผ่าตัดตัด Corpus Callosum เพื่อรักษาโรคลมชัก นำไปสู่งานวิจัยรางวัลโนเบลของ Roger Sperry เรื่องหน้าที่ของสมองสองซีก!',
    recommendedPeel: 0.2,
    system: 'limbic'
  },
  {
    id: 'quest_stroke_ring',
    level: 3,
    levelNameTh: 'ระดับ 3: วงแหวนหลอดเลือดคลินิก',
    targetId: 'circle_of_willis',
    promptTh: '🎯 ตามหา "วงแหวนหลอดเลือดแดงบายพาส" ที่ฐานสมอง ซึ่งเป็นตำแหน่งที่พบบ่อยที่สุดของโรคหลอดเลือดสมองโป่งพอง (Aneurysm)',
    promptEn: 'Find the Circle of Willis (Arterial Anastomotic Ring)',
    symptomTh: 'หากจุดเชื่อมต่อของวงแหวนนี้โป่งพองและแตก (Ruptured Aneurysm) จะเกิดเลือดออกใต้เยื่อหุ้มสมอง (SAH) ปวดหัวรุนแรงที่สุดในชีวิตทันที',
    hintTh: 'ปรับมุมมองไปที่ฐานสมอง (Inferior / Base View) ลอกผิวสมองลงเหลือ < 15% จะเห็นวงแหวนสีแดงสดคล้องรอบท่อ Pituitary',
    funFactTh: '💡 วงแหวนนี้ทำหน้าที่คล้าย "วงเวียนจราจร" หากหลอดเลือดคาโรติดข้างใดข้างหนึ่งตีบตัน เลือดจากอีกฝั่งจะสามารถไหลอ้อมมาช่วยเลี้ยงได้ทันที!',
    recommendedPeel: 0.1,
    system: 'vasculature'
  },
  {
    id: 'quest_mca_stroke',
    level: 3,
    levelNameTh: 'ระดับ 3: หลอดเลือดอัมพฤกษ์ยอดฮิต',
    targetId: 'middle_cerebral_artery',
    promptTh: '🎯 ตามหา "หลอดเลือดแดงสมองขนาดใหญ่ที่สุด" (MCA) ซึ่งแตกแขนงไปเลี้ยงศูนย์สั่งการใบหน้า แขน และศูนย์ภาษา',
    promptEn: 'Find the Middle Cerebral Artery (MCA)',
    symptomTh: 'เป็นหลอดเลือดที่เกิดโรคหลอดเลือดสมองตีบ (Ischemic Stroke) บ่อยที่สุด ทำให้หน้าเบี้ยว แขนขาครึ่งซีกอ่อนแรง และพูดไม่ชัด (FAST)',
    hintTh: 'หลอดเลือดแดงคู่ที่แตกแขนงทอดยาวออกไปทางด้านข้าง เข้าสู่ร่องลึก Sylvian Fissure ของสมองทั้งสองข้าง',
    funFactTh: '💡 หลักการ FAST ของโรคหลอดเลือดสมองคือ: F (Face หน้าเบี้ยว) A (Arm แขนตก) S (Speech พูดไม่ชัด) T (Time รีบไป รพ. ภายใน 4.5 ชม.)',
    recommendedPeel: 0.15,
    system: 'vasculature'
  },
  {
    id: 'quest_csf_cushion',
    level: 3,
    levelNameTh: 'ระดับ 3: โพรงของเหลวพยุงสมอง',
    targetId: 'lateral_ventricles',
    promptTh: '🎯 ตามหา "โพรงสมองคู่รูปตัว C ขนาดใหญ่" ที่ผลิตและบรรจุน้ำหล่อเลี้ยงสมองและไขสันหลัง (CSF) เพื่อพยุงสมองไม่ให้ยุบจากน้ำหนักตัวเอง',
    promptEn: 'Find the Lateral Ventricles (C-shaped CSF Reservoirs)',
    symptomTh: 'หากท่อระบายน้ำไขสันหลังอุดตัน โพรงนี้จะขยายใหญ่ขึ้นจนบีบอัดเนื้อสมอง เรียกว่า "ภาวะโพรงสมองคั่งน้ำ" (Hydrocephalus)',
    hintTh: 'มองห่อท่อโปร่งแสงสีฟ้าครามทรงโค้งสองข้าง ขนานไปกับสมองใหญ่ทั้งสองซีก',
    funFactTh: '💡 สมองมนุษย์หนักราว 1,400 กรัม แต่เมื่อลอยตัวอยู่ในน้ำหล่อเลี้ยงสมอง (CSF) น้ำหนักประสิทธิผลจะเหลือเพียงประมาณ 50 กรัมเท่านั้น!',
    recommendedPeel: 0.2,
    system: 'ventricles'
  },
  {
    id: 'quest_pons_bridge',
    level: 3,
    levelNameTh: 'ระดับ 3: ก้านสมองและสะพานเชื่อม',
    targetId: 'brainstem_pons',
    promptTh: '🎯 ตามหาโครงสร้างก้านสมองส่วนกลางที่พองนูน ทำหน้าที่เป็นสะพานเชื่อมโยงสัญญาณระหว่างสมองใหญ่ สมองน้อย และควบคุมจังหวะการหายใจ',
    promptEn: 'Find the Pons (Respiratory Rhythm & Pontine Bridge)',
    symptomTh: 'หลอดเลือด Basilar อุดตันที่บริเวณนี้อาจทำให้เกิด "Locked-in Syndrome": ผู้ป่วยรู้ตัวและได้ยินทุกอย่างแต่ขยับร่างกายไม่ได้เลยยกเว้นกลอกตา',
    hintTh: 'อยู่ตรงกลางของก้านสมอง เหนือเมดัลลา และอยู่หน้าสมองน้อย มีลักษณะนูนโป่งออกมาด้านหน้าอย่างชัดเจน',
    funFactTh: '💡 คำว่า Pons เป็นภาษาละตินแปลว่า "สะพาน" (Bridge) เพราะมีใยประสาทพาดขวางเชื่อมโยงไปยังสมองน้อยทั้งสองซีก',
    recommendedPeel: 0.25,
    system: 'brainstem'
  }
];

export class QuestManager {
  constructor(options = {}) {
    this.onSelectTarget = options.onSelectTarget || (() => {});
    this.onApplyPeel = options.onApplyPeel || (() => {});
    this.onCameraFocus = options.onCameraFocus || (() => {});
    this.onUpdateHUD = options.onUpdateHUD || (() => {});

    this.isActive = false;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.attemptsThisQuestion = 0;
    this.completedCount = 0;
    this.answeredHistory = new Map(); // questionId -> { attempts, correct }

    this.initStorage();
  }

  initStorage() {
    try {
      const savedScore = localStorage.getItem('brain_quest_score');
      const savedBest = localStorage.getItem('brain_quest_best_streak');
      if (savedScore) this.score = parseInt(savedScore, 10) || 0;
      if (savedBest) this.bestStreak = parseInt(savedBest, 10) || 0;
    } catch (e) {}
  }

  saveStorage() {
    try {
      localStorage.setItem('brain_quest_score', String(this.score));
      localStorage.setItem('brain_quest_best_streak', String(this.bestStreak));
    } catch (e) {}
  }

  startQuest(startIndex = 0) {
    this.isActive = true;
    this.currentIndex = Math.max(0, Math.min(startIndex, QUEST_QUESTIONS.length - 1));
    this.attemptsThisQuestion = 0;
    sound.playModePulse();
    this.dispatchUpdate();
  }

  stopQuest() {
    this.isActive = false;
    this.dispatchUpdate();
  }

  toggleQuest() {
    if (this.isActive) {
      this.stopQuest();
    } else {
      this.startQuest(this.currentIndex);
    }
    return this.isActive;
  }

  getCurrentQuestion() {
    return QUEST_QUESTIONS[this.currentIndex];
  }

  /**
   * Evaluates user's selected structure against target
   */
  evaluateSelection(selectedId) {
    if (!this.isActive) return null;

    const q = this.getCurrentQuestion();
    if (!q) return null;

    this.attemptsThisQuestion++;

    const isMatch = (selectedId === q.targetId) ||
      (q.altTargetIds && q.altTargetIds.includes(selectedId));

    if (isMatch) {
      // Correct!
      const pointsEarned = Math.max(10, 50 - (this.attemptsThisQuestion - 1) * 15);
      this.score += pointsEarned;
      this.streak++;
      if (this.streak > this.bestStreak) this.bestStreak = this.streak;
      this.completedCount++;
      this.answeredHistory.set(q.id, { attempts: this.attemptsThisQuestion, correct: true });
      this.saveStorage();

      sound.playCorrectChord();

      const result = {
        correct: true,
        points: pointsEarned,
        totalScore: this.score,
        streak: this.streak,
        question: q,
        attempts: this.attemptsThisQuestion,
        hasNext: this.currentIndex < QUEST_QUESTIONS.length - 1
      };

      this.dispatchUpdate(result);
      return result;
    } else {
      // Incorrect!
      this.streak = 0;
      sound.playTryAgainTone();

      const result = {
        correct: false,
        points: 0,
        totalScore: this.score,
        streak: 0,
        question: q,
        selectedId,
        attempts: this.attemptsThisQuestion
      };

      this.dispatchUpdate(result);
      return result;
    }
  }

  nextQuestion() {
    if (this.currentIndex < QUEST_QUESTIONS.length - 1) {
      this.currentIndex++;
      this.attemptsThisQuestion = 0;
      sound.playSelectChime();
      this.dispatchUpdate();
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.attemptsThisQuestion = 0;
      sound.playSelectChime();
      this.dispatchUpdate();
    }
  }

  autoAssistScaffold() {
    const q = this.getCurrentQuestion();
    if (!q) return;

    if (typeof q.recommendedPeel === 'number') {
      this.onApplyPeel(q.recommendedPeel);
    }
    sound.playHoverTick();
  }

  dispatchUpdate(resultEvent = null) {
    this.onUpdateHUD({
      isActive: this.isActive,
      question: this.getCurrentQuestion(),
      currentIndex: this.currentIndex,
      totalQuestions: QUEST_QUESTIONS.length,
      score: this.score,
      streak: this.streak,
      bestStreak: this.bestStreak,
      completedCount: this.completedCount,
      resultEvent
    });
  }
}
