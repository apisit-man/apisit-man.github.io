export type Locale = 'th' | 'en';

export interface TranslationDictionary {
  siteTitle: string;
  subtitle: string;
  navLessons: string;
  pilotBadge: string;
  teacherMode: string;
  exitTeacherMode: string;
  fullscreen: string;
  exitFullscreen: string;
  printWorksheet: string;
  resetExperiment: string;
  resetAllProgress: string;
  confirmResetAll: string;
  view2D: string;
  view3D: string;
  webglFallbackNotice: string;
  switchTo2D: string;
  benchHint: string;
  resetCamera: string;
  powerOn: string;
  powerOff: string;
  switchOnShort: string;
  switchOffShort: string;
  switchClickHint: string;
  wireConnected: string;
  wireDisconnected: string;
  wireClickHint: string;
  polarityForward: string;
  polarityReverse: string;
  polarityFwdShort: string;
  polarityRevShort: string;
  longLegToPlus: string;
  longLegToMinus: string;
  anode: string;
  cathode: string;
  resistor: string;
  colorBandsLabel: string;
  supplyVoltage: string;
  battery: string;
  current: string;
  actualCurrent: string;
  predictedCurrent: string;
  resistorVoltage: string;
  resistorPower: string;
  ledVoltage: string;
  gapVoltage: string;
  materialLabel: string;
  ledColorLabel: string;
  breadboardPresetLabel: string;
  presetValidSeries: string;
  presetShortedStrip: string;
  presetOpenGap: string;
  presetMisaligned: string;
  status: string;
  statusConducting: string;
  statusReverseBiased: string;
  statusPowerOff: string;
  statusWireBroken: string;
  statusInsulatorBlocked: string;
  statusBelowThreshold: string;
  statusOvercurrent: string;
  statusShortedStrip: string;
  statusOpenTrench: string;
  statusMisalignedRow: string;
  statusInvalid: string;
  tabOverview: string;
  tabExperiment: string;
  tabMaths: string;
  tabTeacher: string;
  learningObjectives: string;
  realisticAnatomyTitle: string;
  realisticLedNote: string;
  realisticResistorNote: string;
  realisticBreadboardNote: string;
  // Maths tab
  mathsKvlTitle: string;
  mathsKvlDesc: string;
  mathsOhmTitle: string;
  mathsSubstitute: string;
  mathsResultCurrent: string;
  mathsNonConducting: string;
  mathsPredictedWhenOn: string;
  mathsPowerTitle: string;
  mathsPowerResult: string;
  mathsZeroCurrentNote: string;
  // Pedagogical flow: Predict -> Experiment -> Observe -> Explain
  step1PredictTitle: string;
  submitPrediction: string;
  predictionSubmitted: string;
  selectPredictionAlert: string;
  step2ExperimentTitle: string;
  step2ExperimentHint: string;
  step3ObserveTitle: string;
  step3ObservePrompt: string;
  obsTableCondition: string;
  obsTableCurrent: string;
  obsTableLedState: string;
  obsLit: string;
  obsDark: string;
  obsActiveFlow: string;
  obsNoFlow: string;
  obsNotRecorded: string;
  recordObservationBtn: string;
  observationRecorded: string;
  step4ExplainTitle: string;
  saveExplanationBtn: string;
  explanationSaved: string;
  enterExplanationAlert: string;
  explainPlaceholder: string;
  // Teacher mode
  teacherAnswerKey: string;
  teacherRubric: string;
  teacherPedagogicalNotes: string;
  teacherRevealAnswers: string;
  teacherHideAnswers: string;
  modelLimitationsNote: string;
  // Progress
  progressStatus: string;
  progressVisited: string;
  progressExperimented: string;
  progressCompleted: string;
  progressCorrect: string;
  // Unknown route / Lesson directory
  unknownRouteTitle: string;
  unknownRouteDesc: string;
  availableLessonsTitle: string;
  deferredLessonsTitle: string;
  deferredBadge: string;
  openLessonBtn: string;
  // Personal Website Navigation & Independent Author Branding
  homeLink: string;
  themeToggle: string;
  footerDevelopedBy: string;
  footerAuthorName: string;
  footerRole: string;
  footerCopyright: string;
}

export const translations: Record<Locale, TranslationDictionary> = {
  th: {
    siteTitle: 'Electronics Learning Lab',
    subtitle: 'ห้องทดลองอิเล็กทรอนิกส์เสมือนจริงสำหรับการเรียนรู้แบบสืบเสาะ',
    navLessons: 'บทเรียน P1 (6 บท)',
    pilotBadge: 'P1 Classroom Pilot · 6 บทเรียน',
    teacherMode: 'โหมดครู',
    exitTeacherMode: 'ปิดโหมดครู',
    fullscreen: 'เต็มจอ',
    exitFullscreen: 'ออกจากเต็มจอ',
    printWorksheet: 'พิมพ์ใบกิจกรรม',
    resetExperiment: 'รีเซ็ตค่าการทดลอง',
    resetAllProgress: 'ล้างความก้าวหน้าทั้งหมด',
    confirmResetAll: 'ยืนยันการล้างความก้าวหน้าทั้งหมดของทุกบทเรียนในเครื่องนี้หรือไม่?',
    view2D: 'แผนภาพวงจรและอุปกรณ์สมจริง 2D (SVG)',
    view3D: 'โต๊ะทดลองเสมือนจริง 3D (Three.js)',
    webglFallbackNotice: 'เบราว์เซอร์หรืออุปกรณ์นี้ไม่รองรับ WebGL ระบบได้สลับมาใช้แผนภาพวงจร 2D ที่ทำงานได้ครบทุกฟังก์ชัน',
    switchTo2D: 'สลับไปที่แผนภาพวงจร 2D',
    benchHint: 'ลากเพื่อหมุนมุมกล้อง 360° · เลื่อนลูกกลิ้งเพื่อซูม · อุปกรณ์จำลองตามสัดส่วนจริง',
    resetCamera: 'รีเซ็ตมุมกล้อง',
    powerOn: 'สวิตช์ไฟ: เปิด (ON)',
    powerOff: 'สวิตช์ไฟ: ปิด (OFF)',
    switchOnShort: 'เปิด',
    switchOffShort: 'ปิด',
    switchClickHint: 'สวิตช์ (คลิก)',
    wireConnected: 'สายไฟขากลับ: เชื่อมต่อครบ',
    wireDisconnected: 'สายไฟขากลับ: หลุด/วงจรขาด',
    wireClickHint: 'จุดต่อสาย (คลิก)',
    polarityForward: 'ขั้ว LED: ต่อถูกขั้ว (ขายาวเข้า +)',
    polarityReverse: 'ขั้ว LED: ต่อกลับขั้ว (ขายาวเข้า −)',
    polarityFwdShort: 'ถูกขั้ว (คลิกสลับ)',
    polarityRevShort: 'กลับขั้ว (คลิกสลับ)',
    longLegToPlus: 'ขายาว (แอโนด +) ต่อด้านขั้วบวก',
    longLegToMinus: 'ขายาว (แอโนด +) ต่อด้านขั้วลบ (กลับขั้ว)',
    anode: 'แอโนด (+)',
    cathode: 'แคโทด (−)',
    resistor: 'ตัวต้านทาน',
    colorBandsLabel: 'แถบสี 4 แถบ:',
    supplyVoltage: 'แรงดันแหล่งจ่าย',
    battery: 'แบตเตอรี่',
    current: 'กระแสไฟฟ้าในวงจร',
    actualCurrent: 'กระแสไฟฟ้าที่ไหลจริง',
    predictedCurrent: 'กระแสคาดการณ์ (เมื่อวงจรนำกระแส)',
    resistorVoltage: 'แรงดันตกคร่อมตัวต้านทาน (Vr)',
    resistorPower: 'กำลังไฟฟ้าตัวต้านทาน (Pr)',
    ledVoltage: 'แรงดันตกคร่อม LED (Vf)',
    gapVoltage: 'แรงดันตกคร่อมจุดที่วงจรเปิด (Vgap)',
    materialLabel: 'วัสดุที่นำมาทดสอบในช่องว่าง:',
    ledColorLabel: 'ชนิดของหลอด LED:',
    breadboardPresetLabel: 'รูปแบบการเสียบขาบนเบรดบอร์ด:',
    presetValidSeries: '1. ต่ออนุกรมถูกต้อง (B12 เชื่อม C12 ไป C16)',
    presetShortedStrip: '2. ลัดวงจรในแถบเดียวกัน (ขา LED อยู่ C12 และ D12)',
    presetOpenGap: '3. ข้ามร่องกลางโดยไม่เชื่อมสาย (E12 ไป F12)',
    presetMisaligned: '4. เสียบขาคนละคอลัมน์ไม่ชนกัน (B12 กับ C13)',
    status: 'สถานะวงจร',
    statusConducting: 'วงจรปิดสมบูรณ์: กระแสไฟฟ้าไหลผ่านตามแบบจำลอง',
    statusReverseBiased: 'ไดโอดต่อกลับขั้ว (ไบแอสกลับ): กั้นกระแสไฟฟ้า หลอด LED ไม่สว่าง',
    statusPowerOff: 'สวิตช์เปิดอยู่ (ปิดไฟ): ไม่มีกระแสไหล แต่ขั้วแบตเตอรี่ยังมีศักย์ไฟฟ้า',
    statusWireBroken: 'สายไฟขากลับหลุดออก (วงจรเปิด): ไม่มีกระแสไหล และมีแรงดันตกคร่อมที่จุดขาด',
    statusInsulatorBlocked: 'วัสดุที่เลือกเป็นฉนวนไฟฟ้า: กั้นกระแสไฟฟ้าไม่ให้ไหลครบวงจร (I = 0 mA)',
    statusBelowThreshold: 'แรงดันแหล่งจ่ายต่ำกว่าแรงดันทำงานของ LED (Vs ≤ Vf) จึงยังไม่นำกระแส',
    statusOvercurrent: 'คำเตือนกระแสเกินเกณฑ์แบบจำลอง (> 20 mA): เสี่ยงทำให้หลอด LED จริงเสียหาย',
    statusShortedStrip: 'ข้อผิดพลาดบนเบรดบอร์ด: ขา LED ทั้งสองเสียบอยู่ในแถบโลหะคอลัมน์ 12 เดียวกัน ทำให้ลัดวงจรข้ามหลอด LED!',
    statusOpenTrench: 'ข้อผิดพลาดบนเบรดบอร์ด: ร่องกลางแยกแถบ A–E ออกจาก F–J ทำให้วงจรขาด (I = 0 mA)',
    statusMisalignedRow: 'ข้อผิดพลาดบนเบรดบอร์ด: ขาตัวต้านทาน (คอลัมน์ 12) กับขา LED (คอลัมน์ 13) อยู่คนละแถบโลหะ จึงไม่เชื่อมถึงกัน',
    statusInvalid: 'ข้อมูลวงจรไม่ถูกต้อง: ความต้านทานต้องมากกว่าศูนย์และเป็นค่าจำกัด',
    tabOverview: 'แนวคิดและกายวิภาคอุปกรณ์',
    tabExperiment: 'กิจกรรมสืบเสาะ 4 ขั้น',
    tabMaths: 'สมการและกราฟคำนวณ',
    tabTeacher: 'คู่มือครูและเฉลย',
    learningObjectives: 'จุดประสงค์การเรียนรู้:',
    realisticAnatomyTitle: 'โครงสร้างกายวิภาคของอุปกรณ์จริง (Component Anatomy)',
    realisticLedNote: 'หลอด LED 5 มม.: สังเกตขั้วแคโทด (−) ได้จากรอยบากแบนที่ฐานพลาสติก ถ้วยสะท้อนแสงขนาดใหญ่ (Anvil) ด้านใน และขาสั้น ส่วนแอโนด (+) มีแกนโลหะเล็ก (Post) และขายาว',
    realisticResistorNote: 'ตัวต้านทานฟิล์มคาร์บอน: ไม่มีขั้ว อ่านค่าโอห์มจากแถบสี 4 แถบ (หลักที่ 1, หลักที่ 2, ตัวคูณ และแถบความคลาดเคลื่อนสีทอง ±5%)',
    realisticBreadboardNote: 'เบรดบอร์ด 400 จุด: รู 5 รูแนวตั้ง (A–E และ F–J) เชื่อมกันด้วยคลิปสปริงโลหะใต้บอร์ด คั่นกลางด้วยร่องแยก IC ส่วนรางไฟ +/− เชื่อมตามแนวนอน',
    mathsKvlTitle: '1. ความสัมพันธ์ของแรงดันในวงจร (KVL)',
    mathsKvlDesc: 'ผลรวมแรงดันตกคร่อมในวงจรและสถานะศักย์ไฟฟ้าปัจจุบัน:',
    mathsOhmTitle: '2. สมการคำนวณกระแสไฟฟ้า',
    mathsSubstitute: 'แทนค่าในสมการ:',
    mathsResultCurrent: 'กระแสไฟฟ้าที่ไหลจริง:',
    mathsNonConducting: 'วงจรไม่ได้นำกระแสผ่านโหลดในขณะนี้ (I = 0.00 mA)',
    mathsPredictedWhenOn: 'กระแสคาดการณ์เมื่อต่อครบวงจร:',
    mathsPowerTitle: '3. กำลังไฟฟ้าที่ตัวต้านทาน',
    mathsPowerResult: 'กำลังไฟฟ้าที่สูญเสียในตัวต้านทาน:',
    mathsZeroCurrentNote: 'หมายเหตุ: การที่กระแสเป็นศูนย์ไม่ได้แปลว่าทุกจุดในวงจรมีแรงดันเป็นศูนย์ แหล่งจ่ายและขั้วที่เปิดวงจรยังมีศักย์ไฟฟ้าตกคร่อมอยู่',
    step1PredictTitle: 'ขั้นที่ 1: ทำนายผลลัพธ์ (Predict)',
    submitPrediction: 'บันทึกคำทำนาย',
    predictionSubmitted: 'บันทึกคำทำนายแล้ว — ไปทดลองในขั้นที่ 2 เพื่อพิสูจน์กัน!',
    selectPredictionAlert: 'กรุณาเลือกคำทำนายก่อนกดบันทึก',
    step2ExperimentTitle: 'ขั้นที่ 2: ทดลองเปลี่ยนตัวแปร (Experiment)',
    step2ExperimentHint: 'ปรับตัวควบคุมด้านซ้ายหรือคลิกบนอุปกรณ์ในแผนภาพเพื่อสำรวจครบทุกเงื่อนไข:',
    step3ObserveTitle: 'ขั้นที่ 3: บันทึกผลการสังเกต (Observe)',
    step3ObservePrompt: 'ตารางเปรียบเทียบค่าที่วัดได้จริงจากการทดลอง:',
    obsTableCondition: 'เงื่อนไขการทดลอง',
    obsTableCurrent: 'กระแสที่วัดได้',
    obsTableLedState: 'สถานะวงจร / หลอดไฟ',
    obsLit: 'สว่าง (นำกระแส)',
    obsDark: 'ไม่สว่าง (0 mA)',
    obsActiveFlow: 'มีกระแสไหล',
    obsNoFlow: 'ไม่มีกระแสไหล',
    obsNotRecorded: 'รอการทดลอง...',
    recordObservationBtn: 'ยืนยันตารางผลการสังเกต',
    observationRecorded: 'บันทึกตารางผลการสังเกตครบถ้วนแล้ว',
    step4ExplainTitle: 'ขั้นที่ 4: อธิบายและเชื่อมโยงความรู้ (Explain & Transfer)',
    saveExplanationBtn: 'ส่งคำตอบและจบกิจกรรมบทนี้',
    explanationSaved: 'ส่งคำตอบครบทุกขั้นตอนแล้ว',
    enterExplanationAlert: 'กรุณาเลือกคำตอบเชื่อมโยงและพิมพ์คำอธิบายสรุปก่อนบันทึก',
    explainPlaceholder: 'เขียนสรุปสิ่งที่ค้นพบและเชื่อมโยงกับหลักการทางไฟฟ้า...',
    teacherAnswerKey: 'แนวคำตอบสำหรับครูผู้สอน:',
    teacherRubric: 'เกณฑ์ตรวจคำอธิบายอิสระ: นักเรียนควรอ้างอิงหลักฐานค่ากระแสไฟฟ้า (mA) จากตารางสังเกตการณ์ควบคู่กับเหตุผลทางกายภาพของวงจร',
    teacherPedagogicalNotes: 'ข้อเสนอแนะในการจัดการชั้นเรียน:',
    teacherRevealAnswers: 'แสดงแนวคำตอบ',
    teacherHideAnswers: 'ซ่อนแนวคำตอบ',
    modelLimitationsNote: 'ขอบเขตของแบบจำลอง: ใช้แบบจำลองค่าคงที่ระดับชั้นเรียน (Vf คงที่ตามสี LED, ตัวนำและฉนวนในอุดมคติ, ไม่จำลองความร้อนสะสมหรือการพังทลายย้อนกลับของไดโอด) หากต่อวงจรจริงต้องตรวจสอบ Datasheet ของอุปกรณ์เสมอ',
    progressStatus: 'ความก้าวหน้า',
    progressVisited: 'เข้าชมแล้ว',
    progressExperimented: 'ทดลองแล้ว',
    progressCompleted: 'ทำกิจกรรมครบแล้ว',
    progressCorrect: 'ตอบคำถามถูกต้อง',
    unknownRouteTitle: 'ไม่พบบทเรียนตามลิงก์ที่ระบุ',
    unknownRouteDesc: 'คุณสามารถเลือกบทเรียนทั้ง 6 บทในชุดนำร่อง P1 ได้จากรายการด้านล่าง:',
    availableLessonsTitle: 'บทเรียนที่เปิดใช้งานแล้ว (P1 Classroom Pilot — 6 บทเรียน)',
    deferredLessonsTitle: 'บทเรียนในแผนขยายหลักสูตรระยะถัดไป (P3 — ยังไม่เปิดใช้งาน)',
    deferredBadge: 'เตรียมพัฒนาในระยะ P3',
    openLessonBtn: 'เปิดบทเรียน',
    homeLink: 'กลับหน้าหลัก',
    themeToggle: 'สลับโหมดมืด/สว่าง',
    footerDevelopedBy: 'พัฒนาและเผยแพร่โดย',
    footerAuthorName: 'ดร.อภิสิทธิ์ ธงไชย (Dr. Apisit Tongchai)',
    footerRole: 'นักวิจัยและนักการศึกษา',
    footerCopyright: '© 2026 อภิสิทธิ์ ธงไชย. สงวนลิขสิทธิ์ทั้งหมด (All Rights Reserved) · เว็บไซต์พอร์ตโฟลิโอส่วนตัว'
  },
  en: {
    siteTitle: 'Electronics Learning Lab',
    subtitle: 'Interactive virtual electronics laboratory for guided inquiry learning',
    navLessons: 'P1 Lessons (6)',
    pilotBadge: 'P1 Classroom Pilot · 6 Lessons',
    teacherMode: 'Teacher Mode',
    exitTeacherMode: 'Exit Teacher Mode',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen',
    printWorksheet: 'Print Worksheet',
    resetExperiment: 'Reset Experiment',
    resetAllProgress: 'Reset All Progress',
    confirmResetAll: 'Are you sure you want to reset all saved progress across all lessons on this device?',
    view2D: '2D Schematic & Realistic Anatomy (SVG)',
    view3D: '3D Virtual Workbench (Three.js)',
    webglFallbackNotice: 'WebGL is unavailable in this browser or device. Showing the complete 2D interactive schematic instead.',
    switchTo2D: 'Switch to 2D Schematic',
    benchHint: 'Drag to orbit 360° · Scroll to zoom · Realistic physical component geometry',
    resetCamera: 'Reset Camera',
    powerOn: 'Power Switch: ON',
    powerOff: 'Power Switch: OFF',
    switchOnShort: 'ON',
    switchOffShort: 'OFF',
    switchClickHint: 'Switch (Click)',
    wireConnected: 'Return Wire: Connected',
    wireDisconnected: 'Return Wire: Disconnected (Open Gap)',
    wireClickHint: 'Wire (Click)',
    polarityForward: 'LED Polarity: Forward (Long leg to +)',
    polarityReverse: 'LED Polarity: Reverse (Long leg to −)',
    polarityFwdShort: 'Forward (Click to flip)',
    polarityRevShort: 'Reverse (Click to flip)',
    longLegToPlus: 'Long leg (Anode +) connected toward positive',
    longLegToMinus: 'Long leg (Anode +) connected toward negative (Reversed)',
    anode: 'Anode (+)',
    cathode: 'Cathode (−)',
    resistor: 'Resistor',
    colorBandsLabel: '4-Band Code:',
    supplyVoltage: 'Supply Voltage',
    battery: 'Battery',
    current: 'Circuit Current',
    actualCurrent: 'Actual Simulated Current',
    predictedCurrent: 'Predicted Closed-Loop Current',
    resistorVoltage: 'Resistor Voltage Drop (Vr)',
    resistorPower: 'Resistor Power (Pr)',
    ledVoltage: 'LED Voltage Drop (Vf)',
    gapVoltage: 'Open-Break Voltage (Vgap)',
    materialLabel: 'Test Sample in Clips:',
    ledColorLabel: 'LED Type / Forward Voltage:',
    breadboardPresetLabel: 'Breadboard Wiring Placement:',
    presetValidSeries: '1. Valid Series (B12 to C12, LED to C16)',
    presetShortedStrip: '2. Same-Strip Short (Both LED leads in C12 & D12)',
    presetOpenGap: '3. Unbridged Center Gap (E12 across trench to F12)',
    presetMisaligned: '4. Misaligned Columns (Resistor in B12, LED in C13)',
    status: 'Circuit Status',
    statusConducting: 'Complete conducting circuit: current flows according to the model.',
    statusReverseBiased: 'Reverse-biased diode: blocks current flow in this low-voltage model; LED remains off.',
    statusPowerOff: 'Switch is open (Power OFF): zero current flows, though supply terminals retain voltage.',
    statusWireBroken: 'Return wire is disconnected (Open Circuit): zero current flows and full supply voltage appears across the break.',
    statusInsulatorBlocked: 'Selected sample is an electrical insulator: blocks current flow (I = 0 mA).',
    statusBelowThreshold: 'Supply voltage is at or below the LED forward threshold (Vs ≤ Vf); zero current in this approximation.',
    statusOvercurrent: 'Model overcurrent warning (> 20 mA): exceeds conservative classroom rating.',
    statusShortedStrip: 'Breadboard Fault: Both LED leads are plugged into column 12\'s strip, shorting out the LED!',
    statusOpenTrench: 'Breadboard Fault: The center trench isolates A–E from F–J, leaving the circuit open (I = 0 mA).',
    statusMisalignedRow: 'Breadboard Fault: Resistor (Column 12) and LED Anode (Column 13) are in separate unconnected strips.',
    statusInvalid: 'Invalid model input: resistance must be finite and greater than zero.',
    tabOverview: 'Concepts & Anatomy',
    tabExperiment: '4-Step Inquiry',
    tabMaths: 'Equations & Charts',
    tabTeacher: 'Teacher Guide',
    learningObjectives: 'Learning Objectives:',
    realisticAnatomyTitle: 'Realistic Component Anatomy',
    realisticLedNote: '5mm Epoxy LED: Identify the Cathode (−) by the flat rim notch, the larger internal anvil reflector cup, and shorter lead; Anode (+) has the smaller post and longer lead.',
    realisticResistorNote: 'Carbon-Film Resistor: Non-polarized; value is marked by 4 EIA color bands (1st digit, 2nd digit, multiplier, and Gold ±5% tolerance).',
    realisticBreadboardNote: '400-Point Solderless Breadboard: 5 vertical holes per column strip (A–E and F–J) share a hidden spring clip split by the center IC trench; power rails (+/−) run horizontally.',
    mathsKvlTitle: '1. Voltage Relationships (KVL)',
    mathsKvlDesc: 'Voltage drops and terminal potentials in the current circuit state:',
    mathsOhmTitle: '2. Current Calculation Equation',
    mathsSubstitute: 'Substitute values:',
    mathsResultCurrent: 'Actual simulated current:',
    mathsNonConducting: 'Load is not conducting right now (I = 0.00 mA)',
    mathsPredictedWhenOn: 'Predicted current when loop conducts:',
    mathsPowerTitle: '3. Resistor Power Dissipation',
    mathsPowerResult: 'Power dissipated by resistor:',
    mathsZeroCurrentNote: 'Note: Zero current does not imply every node has zero voltage. The battery and open/blocked terminals still hold potential difference.',
    step1PredictTitle: 'Step 1: Predict',
    submitPrediction: 'Save Prediction',
    predictionSubmitted: 'Prediction saved — test your idea in Step 2!',
    selectPredictionAlert: 'Please choose a prediction option before saving.',
    step2ExperimentTitle: 'Step 2: Experiment',
    step2ExperimentHint: 'Use the controls on the left or click components on the diagram to test both conditions:',
    step3ObserveTitle: 'Step 3: Record Observations',
    step3ObservePrompt: 'Comparison table of measurements recorded from your experiment:',
    obsTableCondition: 'Experimental Condition',
    obsTableCurrent: 'Measured Current',
    obsTableLedState: 'Circuit / Lamp State',
    obsLit: 'Lit (Conducting)',
    obsDark: 'Off (0 mA)',
    obsActiveFlow: 'Current Flows',
    obsNoFlow: 'Zero Current',
    obsNotRecorded: 'Awaiting test...',
    recordObservationBtn: 'Confirm Observation Table',
    observationRecorded: 'Observation table confirmed.',
    step4ExplainTitle: 'Step 4: Explain & Transfer',
    saveExplanationBtn: 'Submit Explanation & Complete Lesson',
    explanationSaved: 'Activity completed and submitted.',
    enterExplanationAlert: 'Please select an answer for the transfer question and write your explanation before submitting.',
    explainPlaceholder: 'Summarize your findings and connect them to electrical principles...',
    teacherAnswerKey: 'Teacher Answer Key & Rubric:',
    teacherRubric: 'Free-Response Rubric: Look for students citing measured current (mA) from their observation table alongside the physical circuit mechanism.',
    teacherPedagogicalNotes: 'Classroom Facilitation Notes:',
    teacherRevealAnswers: 'Reveal Answer Key',
    teacherHideAnswers: 'Hide Answer Key',
    modelLimitationsNote: 'Model Limitations: Uses constant classroom approximations (fixed Vf per LED color, ideal insulator cutoff, no thermal runaway or reverse breakdown). Always check component datasheets for real hardware.',
    progressStatus: 'Progress',
    progressVisited: 'Visited',
    progressExperimented: 'Experimented',
    progressCompleted: 'Activity Completed',
    progressCorrect: 'Answered Correctly',
    unknownRouteTitle: 'Requested Lesson Route Not Found',
    unknownRouteDesc: 'Select any of the 6 lessons in the P1 Classroom Pilot below:',
    availableLessonsTitle: 'Available Lessons (P1 Classroom Pilot — 6 Lessons)',
    deferredLessonsTitle: 'Planned Curriculum Expansion (P3 — Deferred)',
    deferredBadge: 'Planned for P3',
    openLessonBtn: 'Open Lesson',
    homeLink: 'Home',
    themeToggle: 'Toggle Dark/Light Theme',
    footerDevelopedBy: 'Developed & Published by',
    footerAuthorName: 'Dr. Apisit Tongchai',
    footerRole: 'Independent Educator & Researcher',
    footerCopyright: '© 2026 Apisit Tongchai. All Rights Reserved · Personal Portfolio Website'
  }
};
