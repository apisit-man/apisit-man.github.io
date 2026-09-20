# Brain Atlas 3D — Iterative Engineering & Pedagogy Changelog

**Target Audience:** Secondary / High School Students (Ages 13–18) & Pre-Med Explorers  
**Author & Technologist:** Dr. Apisit Tongchai (Independent Educator & Researcher)  
**Platform URL:** [https://apisit-man.github.io/applications/brain-atlas/index.html](https://apisit-man.github.io/applications/brain-atlas/index.html)

---

## [Iteration #1] — Gamified Quest System & Procedural Audio Engine
- **Neuro-Pinpoint Quest System (`quest.js`):** 12 gamified missions exploring motor cortex, Broca's area, hippocampus, brainstem, cerebellar folia, and cerebrovascular landmarks.
- **3D Pulsing Centroid Target Beacon:** Dynamic Three.js glowing pinpoint sphere navigating directly to target structures with distance indicators.
- **Zero-Dependency Procedural Audio Engine (`audio.js`):** Web Audio API synthesizer generating glass hover clicks, positive/negative chimes, sonar pulses, and ambient medical audio without external asset files.

---

## [Iteration #2] — Virtual Clinical Lesion & Stroke Simulator
- **Pathology Profiles (`lesion-simulator.js`):** 10+ clinical stroke and traumatic lesion scenarios (MCA ischemic stroke, ACA infarct, PCA homonymous hemianopsia, basilar artery occlusion, traumatic brain injury).
- **Contralateral Homunculus Perimetry:** Interactive sensory-motor homunculus visualizer and 2D visual field deficit perimetry canvas (`#visual-field-canvas`).
- **Synchronized 2D MPR Infarct & Edema Overlays:** Dynamic ischemic core and penumbral edema rendering across Axial, Coronal, and Sagittal cross-section canvases.

---

## [Iteration #3] — Clinical Detective Case Study Mode
- **Diagnostic Case Studies (`case-studies.js`):** 6 historical and clinical benchmark cases (Phineas Gage, Patient H.M., Broca's sudden mutism, acute cerebellar ataxia, homonymous hemianopsia, locked-in syndrome).
- **3-Step Diagnostic Terminal:** Structured Intake Record $\to$ Neurological Exam $\to$ MRI Confirmation $\to$ Differential Diagnosis submission.
- **Claim-Evidence-Reasoning (CER) Generator:** Automated medical report compilation with Markdown clipboard export for classroom submissions.
- **Verification Suite:** `test_cases.js` validating all case structures and CER outputs.

---

## [Iteration #4] — Interactive EEG Brainwave Studio & Cortical Oscillations Lab
- **EEG Laboratory (`eeg-lab.js`):** 5 frequency bands ($\delta: 0.5\text{–}4\text{ Hz}, \theta: 4\text{–}8\text{ Hz}, \alpha: 8\text{–}13\text{ Hz}, \beta: 13\text{–}30\text{ Hz}, \gamma: 30\text{–}50\text{ Hz}$).
- **4-Channel CRT Oscilloscope:** Real-time synthetic multi-lead EEG trace simulator with phosphor persistence and CRT scanline styling.
- **Berger Effect (1924) & Absence Seizures:** Realistic alpha desynchronization on eye-opening / mental math, and 3-Hz generalized spike-and-wave seizure patterns.
- **Procedural Brainwave Sonification & 3D Cortical Ripple Shaders:** Dynamic frequency-modulated sound synthesis and pulsing cortical emissive ripples synchronized with dominant frequency rhythms.
- **Verification Suite:** `test_eeg.js`.

---

## [Iteration #5] — Bilingual Localization (TH/EN) & 3D Stereotaxic MNI Coordinate Probe
- **Bilingual Manager (`i18n.js`):** Seamless one-click Thai/English toggle (`#btn-toggle-lang`) with `localStorage` persistence, updating 140+ UI elements dynamically.
- **3D Stereotaxic MNI Coordinate Probe (`stereotaxic-probe.js`):** Orthogonal 3D crosshair lines, coordinate steppers ($X, Y, Z$), Euclidean distance calculation, nearest anatomical landmark detection, and target lock mechanics (`#btn-probe-lock`).
- **Audio Feedback:** `playStereotaxicLock()` procedural locking chime.
- **Verification Suite:** `test_i18n_probe.js` & `test_dom.js` (132/132 IDs).

---

## [Iteration #6] — Socratic AI Clinical Preceptor & 3D White Matter Tractography
- **Socratic AI Clinical Preceptor (`socratic-tutor.js`):** Built on Posner's Conceptual Change model. Diagnoses cognitive misconceptions for all 6 clinical cases (e.g. Broca vs Wernicke speech production vs comprehension, Parkinson resting tremor vs cerebellar intention tremor, LMN Bell's palsy vs UMN stroke, complete paralysis vs locked-in consciousness). Delivers guided inquiry prompts, real-world analogies, and interactive 3D viewport tweaks.
- **Quest Mode Socratic Scaffolding:** Real-time Socratic hints on incorrect structure clicks comparing anatomical locations and physiological functions.
- **3D White Matter Tractography (`white-matter-tracts.js`):** High-fidelity 3D Catmull-Rom tubular geometries visualizing major axonal pathways:
  1. *Corticospinal Tract (CST)*: Motor cortex descending through internal capsule to medullary decussation.
  2. *Arcuate Fasciculus*: Classical perisylvian language arch connecting Wernicke's STG and Broca's IFG.
  3. *Optic Radiations (Meyer's loop)*: Visual fibers from lateral geniculate nucleus to calcarine sulcus.
  4. *Corpus Callosum Radiations*: Massive interhemispheric commissural fibers connecting bilateral cortices.
- **Axonal Action Potential Flow:** Procedural pulsating emissive animation in render loop simulating neural electrical impulses.
- **Audio Additions (`audio.js`):** `playSocraticPrompt()` (D5 $\to$ A5 inquiry chime) and `playTractFlow()` (arpeggiated harmonic neural sweep).
- **Verification Suite:** `test_socratic_tracts.js` and `test_dom.js` (147/147 DOM IDs). Clean esbuild bundle compilation (`bundle.js`).

---

## [Iteration #7] — Synaptic Biophysics & Neurotransmitter Studio + PWA Offline Classroom
- **Interactive Synaptic Transmission Studio (`synapse-lab.js`):**
  - High-precision 2D Canvas microscopic physics simulation modeling action potential depolarization wave, voltage-gated $Ca^{2+}$ channel influx, SNARE vesicle docking and exocytosis into the 20 nm synaptic cleft, Brownian diffusion, and postsynaptic receptor binding.
  - 5 Major Neurotransmitters:
    1. *Glutamate*: Primary CNS excitatory transmitter $\to Na^+$ influx $\to$ depolarizing EPSP.
    2. *GABA*: Primary CNS inhibitory transmitter $\to Cl^-$ influx $\to$ hyperpolarizing IPSP.
    3. *Acetylcholine (ACh)*: Neuromuscular motor transmitter $\to$ rapid EPSP + enzymatic degradation by Acetylcholinesterase (AChE).
    4. *Dopamine (DA)*: Neuromodulatory reward/basal ganglia signaling with Dopamine Active Transporter (DAT) reuptake.
    5. *Serotonin (5-HT)*: Affective state neuromodulation with Serotonin Transporter (SERT) reuptake.
  - Pharmacology & Neurotoxin Challenge Suite:
    - *Botox (Botulinum Toxin)*: Cleaves SNARE complex, halts vesicle fusion $\to$ 0 molecules released $\to$ flaccid paralysis.
    - *Curare / α-Bungarotoxin*: Competitively blocks nicotinic ACh receptors $\to$ molecules diffuse but cannot bind.
    - *SSRI (Fluoxetine)*: Selectively inhibits SERT reuptake transporter $\to$ 5-HT molecules persist and repeatedly stimulate receptors.
    - *Benzodiazepine (Valium)*: Positive allosteric modulator of $GABA_A$ $\to$ amplifies $Cl^-$ influx $\to$ deep hyperpolarization.
    - *Organophosphate (Sarin)*: Irreversibly inhibits AChE $\to$ acetylcholine storm.
  - Real-Time Postsynaptic Membrane Potential ($V_m$) Oscilloscope:
    - Dynamic graph (-90 mV to +40 mV) showing resting baseline (-70 mV), threshold (-55 mV), graded EPSP/IPSP summation, and all-or-none action potential generation (+30 mV overshoot and repolarization).
  - Continuous 10-Hz Spike Train simulation toggle (`#btn-toggle-spike-train`).
- **Progressive Web App (PWA) Offline Classroom Engine:**
  - `sw.js`: Production service worker utilizing Cache-First offline caching for 3D binary models (`models/brain-atlas.glb`), scripts, stylesheets, and fonts, allowing 100% offline functionality in computer labs and on student tablets.
  - `manifest.json`: Web App Manifest supporting standalone installation (`#btn-pwa-install`) and offline ready status badge (`#pwa-offline-badge`).
- **Procedural Web Audio Engine Additions (`audio.js`):**
  - `playActionPotential()`: Dynamic frequency sweep representing axonal depolarization and repolarization.
  - `playSynapticRelease()`: Micro-frequency vesicular exocytosis sound.
  - `playIonChannelOpen()`: Dual-mode resonant chime distinguishing excitatory ($Na^+$) vs inhibitory ($Cl^-$) channel opening.
- **Verification Suite:**
  - `test_synapse.js`: Validates all 5 neurotransmitters, 6 pharmacology challenges, vesicle kinetics, Botox blockage, GABA hyperpolarization, and Glutamate threshold crossing.
  - `test_dom.js`: 163/163 DOM IDs verified with 100% precision.
  - Production build: `bundle.js` (981.6 kB) cleanly compiled with esbuild.

