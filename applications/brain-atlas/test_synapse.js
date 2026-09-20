// Unit test for Synapse Laboratory and Neurotransmission Biophysics Module
global.window = {};
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); }
};

function createMockCanvas(w = 700, h = 320) {
  return {
    width: w,
    height: h,
    getContext: () => ({
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 1,
      font: '',
      shadowColor: '',
      shadowBlur: 0,
      clearRect: () => {},
      fillRect: () => {},
      strokeRect: () => {},
      beginPath: () => {},
      closePath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      arc: () => {},
      bezierCurveTo: () => {},
      fill: () => {},
      stroke: () => {},
      save: () => {},
      restore: () => {},
      translate: () => {},
      fillText: () => {},
      setLineDash: () => {},
      createLinearGradient: () => ({
        addColorStop: () => {}
      })
    })
  };
}

global.document = {
  getElementById: (id) => {
    if (id === 'synapse-canvas') return createMockCanvas(700, 320);
    if (id === 'synapse-vm-canvas') return createMockCanvas(700, 110);
    return null;
  }
};

global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.performance = { now: () => Date.now() };

async function testSynapseLab() {
  const { NEUROTRANSMITTERS, PHARMACOLOGY_CHALLENGES, SynapseLaboratory } = await import('./synapse-lab.js');

  console.log('--- Testing NEUROTRANSMITTERS Dictionary ---');
  const requiredNTs = ['glutamate', 'gaba', 'acetylcholine', 'dopamine', 'serotonin'];
  requiredNTs.forEach(ntId => {
    const nt = NEUROTRANSMITTERS[ntId];
    if (!nt || !nt.nameTh || !nt.nameEn || !nt.ion) {
      throw new Error(`Invalid neurotransmitter definition: ${ntId}`);
    }
    console.log(`Transmitter: ${nt.nameEn} (Ion: ${nt.ion}, Type: ${nt.type}, deltaVm: ${nt.deltaVm} mV)`);
  });

  if (NEUROTRANSMITTERS.glutamate.type !== 'excitatory' || NEUROTRANSMITTERS.glutamate.deltaVm <= 0) {
    throw new Error('Glutamate must be excitatory with positive deltaVm');
  }
  if (NEUROTRANSMITTERS.gaba.type !== 'inhibitory' || NEUROTRANSMITTERS.gaba.deltaVm >= 0) {
    throw new Error('GABA must be inhibitory with negative deltaVm');
  }
  console.log('NEUROTRANSMITTERS verified.');

  console.log('--- Testing PHARMACOLOGY_CHALLENGES Dictionary ---');
  const requiredDrugs = ['normal', 'botox', 'curare', 'ssri', 'benzodiazepine', 'organophosphate'];
  requiredDrugs.forEach(dId => {
    const d = PHARMACOLOGY_CHALLENGES[dId];
    if (!d || !d.nameTh || !d.nameEn || !d.effectTh) {
      throw new Error(`Invalid pharmacology challenge: ${dId}`);
    }
  });

  if (PHARMACOLOGY_CHALLENGES.botox.vesicleFusionBlocked !== true) {
    throw new Error('Botox must flag vesicleFusionBlocked as true');
  }
  if (PHARMACOLOGY_CHALLENGES.curare.receptorBlocked !== true) {
    throw new Error('Curare must flag receptorBlocked as true');
  }
  if (PHARMACOLOGY_CHALLENGES.ssri.reuptakeInhibited !== true) {
    throw new Error('SSRI must flag reuptakeInhibited as true');
  }
  if (PHARMACOLOGY_CHALLENGES.benzodiazepine.allostericGaba !== true) {
    throw new Error('Benzodiazepine must flag allostericGaba as true');
  }
  console.log('PHARMACOLOGY_CHALLENGES verified.');

  console.log('--- Testing SynapseLaboratory Physics & Simulation ---');
  let loggedEvents = [];
  let latestVm = null;

  const lab = new SynapseLaboratory({
    canvasId: 'synapse-canvas',
    vmCanvasId: 'synapse-vm-canvas',
    onVmChange: (vm) => { latestVm = vm; },
    onEventLogged: (evt) => { loggedEvents.push(evt); }
  });

  lab.init();

  if (lab.receptors.length !== 8) throw new Error(`Expected 8 receptors, got ${lab.receptors.length}`);
  if (lab.vesicles.length !== 14) throw new Error(`Expected 14 vesicles, got ${lab.vesicles.length}`);
  if (lab.currentVm !== -70.0) throw new Error(`Resting Vm should be -70 mV, got ${lab.currentVm}`);

  // Test Normal AP firing
  console.log('Testing Normal Action Potential firing...');
  lab.fireActionPotential();
  if (lab.calciumIons.length === 0) throw new Error('Calcium influx failed on action potential firing');
  if (lab.isPresynapticDepolarized !== true) throw new Error('Terminal should be depolarized');

  // Step physics through exocytosis and cleft diffusion
  for (let step = 0; step < 30; step++) {
    lab.updatePhysics(0.02);
  }

  console.log(`Particles active: Ca2+=${lab.calciumIons.length}, Transmitters in cleft=${lab.transmitterMolecules.length}`);
  if (lab.transmitterMolecules.length === 0) {
    throw new Error('No neurotransmitter molecules released into synaptic cleft');
  }

  // Test Botox Challenge
  console.log('Testing Botox SNARE blockage challenge...');
  lab.setDrugChallenge('botox');
  loggedEvents = [];
  lab.fireActionPotential();

  const botoxBlocked = loggedEvents.some(e => e.type === 'blocked');
  if (!botoxBlocked) {
    throw new Error('Botox challenge failed to block vesicle fusion');
  }
  console.log('Botox block event confirmed.');

  // Test GABA hyperpolarization
  console.log('Testing GABA inhibitory hyperpolarization...');
  lab.setDrugChallenge('normal');
  lab.setNeurotransmitter('gaba');
  lab.initBiologicalStructures();

  // Simulate GABA binding
  lab.receptors[0].isBound = true;
  lab.receptors[0].boundTimer = 1.0;
  lab.receptors[1].isBound = true;
  lab.receptors[1].boundTimer = 1.0;

  for (let s = 0; s < 20; s++) {
    lab.updatePhysics(0.02);
  }

  if (lab.currentVm >= -70.0) {
    throw new Error(`GABA should cause hyperpolarization (< -70 mV), got ${lab.currentVm} mV`);
  }
  console.log(`GABA Hyperpolarization confirmed: Vm = ${lab.currentVm.toFixed(1)} mV`);

  // Test Glutamate Action Potential threshold crossing
  console.log('Testing Glutamate EPSP threshold crossing...');
  lab.setNeurotransmitter('glutamate');
  lab.initBiologicalStructures();

  // Simulate massive simultaneous receptor opening
  lab.receptors.forEach(r => {
    r.isBound = true;
    r.boundTimer = 1.5;
  });

  for (let s = 0; s < 45; s++) {
    lab.updatePhysics(0.02);
  }

  if (lab.currentVm <= -55.0 && !lab.isInActionPotential) {
    throw new Error(`Glutamate summation should cross threshold (-55 mV), got ${lab.currentVm}`);
  }
  console.log(`Threshold crossed! Vm = ${lab.currentVm.toFixed(1)} mV (AP active=${lab.isInActionPotential})`);

  // Test Spike Train management
  console.log('Testing Continuous Spike Train toggle...');
  lab.toggleSpikeTrain(true);
  if (lab.isSpikeTrainActive !== true || !lab.spikeTrainInterval) {
    throw new Error('toggleSpikeTrain(true) failed to start interval');
  }
  lab.toggleSpikeTrain(false);
  if (lab.isSpikeTrainActive !== false || lab.spikeTrainInterval !== null) {
    throw new Error('toggleSpikeTrain(false) failed to clear interval');
  }

  lab.stopLoop();
  console.log('SynapseLaboratory verified successfully!');
  console.log('ALL Synapse & Cellular Neurotransmission unit tests PASSED!');
}

testSynapseLab().catch(err => {
  console.error('Test FAILED:', err);
  process.exit(1);
});
