// Unit test for Socratic Tutor and White Matter Tractography modules
global.window = {};
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); }
};
global.document = {
  querySelectorAll: () => []
};

async function testSocraticAndTracts() {
  const { SocraticTutor, CLINICAL_MISCONCEPTIONS } = await import('./socratic-tutor.js');
  const { WhiteMatterTracts } = await import('./white-matter-tracts.js');
  const THREE = await import('three');

  console.log('--- Testing SocraticTutor ---');
  const tutor = new SocraticTutor();

  // Test 1: Broca vs Wernicke Misconception diagnosis
  console.log('Test 1: Diagnosing Wernicke misconception in Broca stroke case...');
  const brocaEval = tutor.diagnoseCaseSubmission(
    'case_stroke_broca',
    'diag_wernicke_aphasia',
    'mech_embolic',
    'frontal_lobe_left'
  );
  if (!brocaEval) throw new Error('Failed to diagnose Broca vs Wernicke misconception');
  if (brocaEval.type !== 'diagnosis_misconception') throw new Error('Expected type "diagnosis_misconception"');
  if (!brocaEval.socraticQuestionTh.includes('Wernicke') || !brocaEval.socraticQuestionEn.includes('Wernicke')) {
    throw new Error('Socratic question missing expected clinical conflict keywords');
  }
  if (!brocaEval.counterExampleTh || !brocaEval.counterExampleEn) {
    throw new Error('Missing counter-example analogy in diagnosis evaluation');
  }
  if (!brocaEval.recommendedTweak || !brocaEval.recommendedTweak.action) {
    throw new Error('Missing recommended 3D tweak action');
  }
  console.log('Broca misconception correctly diagnosed with Socratic question & analogy.');

  // Test 2: Cerebellar ataxia resting vs intention tremor
  console.log('Test 2: Diagnosing Parkinson vs Cerebellar tremor misconception...');
  const ataxiaEval = tutor.diagnoseCaseSubmission(
    'case_cerebellar_ataxia',
    'diag_parkinson_tremor',
    null,
    null
  );
  if (!ataxiaEval || !ataxiaEval.misconceptionEn.includes('resting tremor')) {
    throw new Error('Failed to identify Parkinson tremor misconception in ataxia case');
  }
  console.log('Ataxia intention tremor misconception correctly identified.');

  // Test 3: Structural misconception (e.g. wrong lobe selected)
  console.log('Test 3: Diagnosing structural misconception (Left Temporal selected for Broca)...');
  const structEval = tutor.diagnoseCaseSubmission(
    'case_stroke_broca',
    'diag_broca_stroke', // Correct diagnosis
    'mech_embolic',
    'temporal_lobe_left' // Incorrect structure
  );
  if (!structEval || structEval.type !== 'structure_misconception') {
    throw new Error('Failed to diagnose wrong structure misconception');
  }
  if (!structEval.feedbackTh.includes('Temporal Lobe') || !structEval.feedbackEn.includes('Temporal Lobe')) {
    throw new Error('Structural misconception feedback missing structure references');
  }
  console.log('Structural misconception correctly identified.');

  // Test 4: General Socratic Inquiry (Consult Preceptor)
  console.log('Test 4: General Socratic hint generation (TH & EN)...');
  const mockCase = {
    titleTh: 'ผู้ป่วย Phineas Gage',
    titleEn: 'Patient Phineas Gage'
  };
  const hintTh = tutor.getGeneralSocraticHint(mockCase, 'th');
  const hintEn = tutor.getGeneralSocraticHint(mockCase, 'en');
  if (!hintTh.question.includes('Phineas Gage') || !hintEn.question.includes('Phineas Gage')) {
    throw new Error('Preceptor general question failed to embed case context');
  }
  if (!hintTh.chips || hintTh.chips.length < 3 || !hintEn.chips || hintEn.chips.length < 3) {
    throw new Error('Preceptor prompt chips missing or incomplete');
  }
  console.log('General Socratic hints verified for both languages.');

  // Test 5: Quest Selection Socratic clue
  console.log('Test 5: Quest incorrect click Socratic inquiry...');
  const target = { nameTh: 'สมองน้อย', nameEn: 'Cerebellum', descriptionTh: 'ควบคุมการทรงตัว', descriptionEn: 'Motor coordination and balance' };
  const selected = { nameTh: 'ก้านสมองส่วนพอนส์', nameEn: 'Pons', system: 'Brainstem', systemNameTh: 'ก้านสมอง' };
  const questClueTh = tutor.diagnoseQuestSelection(target, selected, 'th');
  const questClueEn = tutor.diagnoseQuestSelection(target, selected, 'en');
  if (!questClueTh.feedback.includes('ก้านสมองส่วนพอนส์') || !questClueEn.feedback.includes('Pons')) {
    throw new Error('Quest Socratic feedback missing selected structure name');
  }
  console.log('Quest Socratic feedback verified.');

  console.log('SocraticTutor verified successfully!');

  console.log('--- Testing WhiteMatterTracts ---');
  const mockScene = new THREE.Scene();
  const tracts = new WhiteMatterTracts({ scene: mockScene });

  if (tracts.isVisible !== false) throw new Error('Tracts must start invisible');
  if (tracts.tractGroup.visible !== false) throw new Error('tractGroup should start not visible');
  if (!mockScene.children.includes(tracts.tractGroup)) {
    throw new Error('tractGroup was not added to scene');
  }

  // Verify meshes inside tractGroup
  const tractMeshes = tracts.tractGroup.children;
  console.log(`White matter tract meshes generated: ${tractMeshes.length}`);
  if (tractMeshes.length < 6) {
    throw new Error(`Expected at least 6 tract bundles, got ${tractMeshes.length}`);
  }

  // Check IDs of tracts
  const tractIds = tractMeshes.map(m => m.userData?.id);
  const requiredIds = [
    'corticospinal_left',
    'corticospinal_right',
    'arcuate_left',
    'arcuate_right',
    'optic_radiation_left',
    'optic_radiation_right',
    'cc_radiation_anterior',
    'cc_radiation_posterior'
  ];
  for (const id of requiredIds) {
    if (!tractIds.includes(id)) {
      throw new Error(`Missing required tract: ${id}`);
    }
  }

  // Test visibility toggle
  const state1 = tracts.toggleTracts();
  if (state1 !== true || tracts.isVisible !== true || tracts.tractGroup.visible !== true) {
    throw new Error('toggleTracts() failed to show tracts');
  }

  const state2 = tracts.toggleTracts();
  if (state2 !== false || tracts.isVisible !== false || tracts.tractGroup.visible !== false) {
    throw new Error('toggleTracts() failed to hide tracts');
  }

  // Test setTractsVisible
  tracts.setTractsVisible(true);
  if (tracts.isVisible !== true) throw new Error('setTractsVisible(true) failed');

  // Test update pulse animation loop
  tracts.update(1.5);
  const sampleMaterial = tracts.animatedMaterials[0].material;
  if (typeof sampleMaterial.emissiveIntensity !== 'number' || sampleMaterial.emissiveIntensity <= 0) {
    throw new Error('update() did not modulate emissiveIntensity');
  }

  console.log('WhiteMatterTracts verified successfully!');
  console.log('ALL Socratic AI Tutor & White Matter Tracts tests PASSED!');
}

testSocraticAndTracts().catch(err => {
  console.error('Test FAILED:', err);
  process.exit(1);
});
