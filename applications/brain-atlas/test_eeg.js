// Unit test for EEG Laboratory module
global.window = {};
global.document = {
  getElementById: (id) => {
    if (id === 'eeg-oscilloscope-canvas') {
      return {
        width: 700,
        height: 260,
        getContext: () => ({
          fillStyle: '',
          fillRect: () => {},
          strokeStyle: '',
          lineWidth: 1,
          beginPath: () => {},
          moveTo: () => {},
          lineTo: () => {},
          stroke: () => {},
          setLineDash: () => {},
          fillText: () => {},
          arc: () => {},
          fill: () => {}
        })
      };
    }
    return null;
  }
};
global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.performance = { now: () => Date.now() };

async function testEEG() {
  const { EEG_BANDS, EEG_STATES, EEGLaboratory } = await import('./eeg-lab.js');

  console.log(`Verifying ${Object.keys(EEG_BANDS).length} EEG frequency bands...`);
  ['delta', 'theta', 'alpha', 'beta', 'gamma'].forEach(b => {
    const band = EEG_BANDS[b];
    if (!band || !band.nameTh || !band.dominantFreq || !band.amplitudeUv) {
      throw new Error(`Invalid EEG band definition for ${b}`);
    }
    console.log(`Band ${b.toUpperCase()}: ${band.nameTh} (${band.dominantFreq} Hz, ${band.amplitudeUv} µV)`);
  });

  console.log(`Verifying ${EEG_STATES.length} EEG physiological state presets...`);
  if (EEG_STATES.length !== 5) {
    throw new Error(`Expected 5 EEG states, got ${EEG_STATES.length}`);
  }

  EEG_STATES.forEach((st, idx) => {
    console.log(`Checking EEG State #${idx + 1}: ${st.nameEn}`);
    if (!st.id || !st.band || !st.channels || !st.socraticTh) {
      throw new Error(`Invalid EEG state configuration for ${st.id}`);
    }
    ['frontal', 'central', 'temporal', 'occipital'].forEach(ch => {
      if (!st.channels[ch]) {
        throw new Error(`Missing channel ${ch} in EEG state ${st.id}`);
      }
    });
  });

  // Test EEGLaboratory instance
  let updatedState = null;
  let dipoleEvent = null;

  const lab = new EEGLaboratory({
    canvasId: 'eeg-oscilloscope-canvas',
    onStateChange: (st) => { updatedState = st; },
    onDipoleUpdate: (dipole) => { dipoleEvent = dipole; }
  });

  lab.init();

  // Test state transitions
  lab.setState(0); // Relaxed Alpha
  if (lab.currentStateIndex !== 0 || updatedState.band !== 'alpha') {
    throw new Error('Failed to set Alpha state');
  }

  lab.setState(1); // Active Beta
  if (lab.currentStateIndex !== 1 || updatedState.band !== 'beta') {
    throw new Error('Failed to set Beta state');
  }

  lab.setState(4); // Absence 3-Hz seizure
  if (lab.currentStateIndex !== 4) {
    throw new Error('Failed to set Absence Seizure state');
  }

  // Test signal synthesis step
  lab.updateSignals();
  if (!dipoleEvent || typeof dipoleEvent.dominantFreq !== 'number') {
    throw new Error('Signal update did not generate dipole event');
  }
  console.log(`Dipole event emitted: band=${dipoleEvent.band}, freq=${dipoleEvent.dominantFreq} Hz, activeLobe=${dipoleEvent.activeLobe}`);

  // Test gain adjustment
  lab.setGain(1.8);
  if (lab.gain !== 1.8) {
    throw new Error('setGain failed');
  }

  lab.stopLoop();
  console.log('ALL EEG Laboratory unit tests PASSED successfully!');
}

testEEG().catch(err => {
  console.error('Test FAILED:', err);
  process.exit(1);
});
