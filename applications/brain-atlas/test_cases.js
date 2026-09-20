// Test clinical cases data model and CaseStudyManager logic
global.window = {};
global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); }
};

async function testCases() {
  const { CLINICAL_CASES, CaseStudyManager } = await import('./case-studies.js');

  console.log(`Loaded ${CLINICAL_CASES.length} clinical cases.`);

  if (CLINICAL_CASES.length !== 6) {
    throw new Error(`Expected 6 cases, got ${CLINICAL_CASES.length}`);
  }

  // Verify all 6 cases have complete structure
  CLINICAL_CASES.forEach((c, idx) => {
    console.log(`Checking Case #${c.caseNumber}: ${c.titleEn}`);
    if (!c.titleTh || !c.patientName || !c.chiefComplaint || !c.history) {
      throw new Error(`Case #${c.caseNumber} missing required intake fields`);
    }
    if (!c.vitals || !c.vitals.bp || !c.vitals.hr || !c.vitals.rr || !c.vitals.spo2) {
      throw new Error(`Case #${c.caseNumber} missing vitals`);
    }
    if (!Array.isArray(c.physicalExam) || c.physicalExam.length < 3) {
      throw new Error(`Case #${c.caseNumber} physicalExam must have at least 3 systems`);
    }
    if (!c.targetId || !c.mniCoords || !c.slicePos || !c.vascularTerritory) {
      throw new Error(`Case #${c.caseNumber} missing anatomical or imaging specs`);
    }
    if (!c.differentialOptions.some(o => o.isCorrect)) {
      throw new Error(`Case #${c.caseNumber} missing correct differential option`);
    }
    if (!c.mechanismOptions.some(o => o.isCorrect)) {
      throw new Error(`Case #${c.caseNumber} missing correct mechanism option`);
    }
    if (!c.cer || !c.cer.claimTh || !c.cer.evidenceTh || !c.cer.reasoningTh) {
      throw new Error(`Case #${c.caseNumber} missing CER claim, evidence, or reasoning`);
    }
  });

  // Test CaseStudyManager
  let lastUIState = null;
  const mgr = new CaseStudyManager({
    onUpdateUI: (data) => {
      lastUIState = data;
    }
  });

  mgr.openModal(0);
  if (!mgr.isActive || lastUIState.currentIndex !== 0) {
    throw new Error('CaseStudyManager openModal failed');
  }

  // Test Case 1 Diagnosis submission (Somchai / Broca stroke)
  const case1 = CLINICAL_CASES[0];
  const correctDiag = case1.differentialOptions.find(o => o.isCorrect).id;
  const correctMech = case1.mechanismOptions.find(o => o.isCorrect).id;

  const result = mgr.submitDiagnosis(correctDiag, correctMech, case1.targetId);
  console.log(`Case 1 submission evaluated: fullCorrect = ${result.isFullCorrect}, points = ${result.pointsEarned}`);
  if (!result.isFullCorrect || result.pointsEarned !== 100) {
    throw new Error('Case 1 diagnosis evaluation expected to be 100% correct');
  }

  // Test CER Markdown generation
  const md = mgr.generateCERMarkdown(case1);
  if (!md.includes('ผู้ป่วยมีภาวะขาดเลือดเฉียบพลัน') || !md.includes('Left Frontal Lobe Infarct')) {
    throw new Error('CER Markdown generation missing expected claim text');
  }
  console.log('CER Markdown generated successfully:\n', md.substring(0, 300) + '...\n');

  // Test navigation
  mgr.nextCase();
  if (mgr.currentIndex !== 1) {
    throw new Error('nextCase failed');
  }
  mgr.prevCase();
  if (mgr.currentIndex !== 0) {
    throw new Error('prevCase failed');
  }

  console.log('ALL Clinical Cases and CaseStudyManager tests PASSED successfully!');
}

testCases().catch(err => {
  console.error('Test FAILED:', err);
  process.exit(1);
});
