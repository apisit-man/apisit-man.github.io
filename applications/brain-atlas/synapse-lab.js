/**
 * Brain Atlas 3D - Interactive Synaptic Transmission & Neurotransmitter Studio
 * Educational Cellular Biophysics Engine for High School Biology & Pre-Med
 * Simulates: Action potential arrival, Ca2+ influx, SNARE vesicle fusion,
 * cleft diffusion, ligand-gated receptor binding, EPSP/IPSP membrane potential (Vm),
 * enzymatic degradation (AChE), reuptake transporters, and neurotoxin/drug challenges.
 */

import { sound } from './audio.js';

export const NEUROTRANSMITTERS = {
  glutamate: {
    id: 'glutamate',
    nameTh: 'กลูตาเมต (Glutamate)',
    nameEn: 'Glutamate (Glu)',
    type: 'excitatory',
    ion: 'Na+',
    deltaVm: 16, // mV depolarizing EPSP
    color: '#38bdf8', // Cyan
    receptorNameTh: 'AMPA / NMDA Receptors',
    receptorNameEn: 'AMPA / NMDA Receptors',
    summaryTh: 'สารสื่อประสาทกระตุ้นหลัก (Major Excitatory) ของระบบประสาทส่วนกลาง เปิดช่อง Na+ นำไปสู่การเกิด EPSP',
    summaryEn: 'Primary excitatory neurotransmitter in the CNS. Opens ligand-gated Na+ channels causing depolarizing EPSPs.'
  },
  gaba: {
    id: 'gaba',
    nameTh: 'กาบา (GABA)',
    nameEn: 'GABA (γ-Aminobutyric acid)',
    type: 'inhibitory',
    ion: 'Cl-',
    deltaVm: -14, // mV hyperpolarizing IPSP
    color: '#a855f7', // Royal Purple
    receptorNameTh: 'GABA_A Receptors',
    receptorNameEn: 'GABA_A Receptors',
    summaryTh: 'สารสื่อประสาทชนิดยับยั้งหลัก (Major Inhibitory) เปิดช่อง Cl- ให้ประจุลบไหลเข้าเซลล์ ทำให้เกิด IPSP (Hyperpolarization)',
    summaryEn: 'Primary inhibitory neurotransmitter. Opens ligand-gated Cl- channels, influxing negative charges causing IPSP hyperpolarization.'
  },
  acetylcholine: {
    id: 'acetylcholine',
    nameTh: 'แอซีทิลโคลีน (Acetylcholine - ACh)',
    nameEn: 'Acetylcholine (ACh)',
    type: 'excitatory',
    ion: 'Na+',
    deltaVm: 15,
    color: '#f59e0b', // Amber
    receptorNameTh: 'Nicotinic AChR (nAChR)',
    receptorNameEn: 'Nicotinic AChR (nAChR)',
    hasAChE: true,
    summaryTh: 'สารสื่อประสาทสั่งการกล้ามเนื้อ (Neuromuscular Junction) และความจำ สลายตัวอย่างรวดเร็วด้วยเอนไซม์ AChE',
    summaryEn: 'Key transmitter at neuromuscular junctions and autonomic ganglia. Rapidly hydrolyzed by Acetylcholinesterase (AChE).'
  },
  dopamine: {
    id: 'dopamine',
    nameTh: 'โดพามีน (Dopamine - DA)',
    nameEn: 'Dopamine (DA)',
    type: 'neuromodulatory',
    ion: 'Na+',
    deltaVm: 9,
    color: '#10b981', // Emerald
    receptorNameTh: 'D1/D2 Dopamine Receptors',
    receptorNameEn: 'D1/D2 Dopamine Receptors',
    hasReuptake: true,
    summaryTh: 'สารสื่อประสาทระบบการให้รางวัล (Reward pathway) และการควบคุมกล้ามเนื้ออย่างละเอียด (Substantia Nigra)',
    summaryEn: 'Critical for reward, motivation, and basal ganglia fine motor control. Cleared by Dopamine Transporter (DAT).'
  },
  serotonin: {
    id: 'serotonin',
    nameTh: 'เซโรโทนิน (Serotonin - 5-HT)',
    nameEn: 'Serotonin (5-HT)',
    type: 'neuromodulatory',
    ion: 'Na+',
    deltaVm: 8,
    color: '#ec4899', // Pink
    receptorNameTh: '5-HT3 / GPCR Receptors',
    receptorNameEn: '5-HT3 / GPCR Receptors',
    hasReuptake: true,
    summaryTh: 'ควบคุมอารมณ์ วงจรการนอนหลับ และความหิว นำกลับเข้าเซลล์ผ่าน SERT transporter',
    summaryEn: 'Regulates mood, sleep-wake cycles, and appetite. Recycled through Serotonin Transporter (SERT).'
  }
};

export const PHARMACOLOGY_CHALLENGES = {
  normal: {
    id: 'normal',
    nameTh: 'สภาวะสรีรวิทยาปกติ (Normal Physiology)',
    nameEn: 'Normal Physiology',
    effectTh: 'การทำงานปกติของไซแนปส์: สารสื่อประสาทหลั่งจากถุง บรรจบตัวรับ และถูกกำจัดตามกลไกธรรมชาติ',
    effectEn: 'Baseline physiological transmission: standard vesicle exocytosis, receptor binding, and normal clearance.',
    vesicleFusionBlocked: false,
    receptorBlocked: false,
    reuptakeInhibited: false,
    degradationInhibited: false,
    allostericGaba: false
  },
  botox: {
    id: 'botox',
    nameTh: 'สารพิษโบทูลินัม (Botulinum Toxin / Botox)',
    nameEn: 'Botulinum Toxin (Botox)',
    effectTh: 'ตัดทำลายโปรตีน SNARE complex ทำให้ถุงไซแนปส์ไม่สามารถหลอมรวมกับเยื่อหุ้มเซลล์ได้ $\\to$ ไม่มีการหลั่งสารสื่อประสาท ทำให้กล้ามเนื้อเป็นอัมพาตแบบอ่อนเปลี้ย (Flaccid Paralysis)',
    effectEn: 'Cleaves SNARE proteins preventing synaptic vesicles from fusing with the presynaptic membrane -> Zero transmitter release -> Flaccid paralysis.',
    vesicleFusionBlocked: true,
    receptorBlocked: false,
    reuptakeInhibited: false,
    degradationInhibited: false,
    allostericGaba: false
  },
  curare: {
    id: 'curare',
    nameTh: 'คูราเร่ / พิษงูสามเหลี่ยม (Curare / α-Bungarotoxin)',
    nameEn: 'Curare / α-Bungarotoxin (Snake Toxin)',
    effectTh: 'แย่งจับกับตัวรับ Nicotinic ACh Receptors ที่เยื่อหุ้มหลังไซแนปส์อย่างถาวร ทำให้สารสื่อประสาทจับไม่ได้ $\\to$ ไม่มี Na+ ไหลเข้า $\\to$ อัมพาตกล้ามเนื้อหายใจ',
    effectEn: 'Competitively blocks postsynaptic nicotinic ACh receptors. Neurotransmitter diffuses freely but cannot bind -> No EPSP -> Asphyxiation/paralysis.',
    vesicleFusionBlocked: false,
    receptorBlocked: true,
    reuptakeInhibited: false,
    degradationInhibited: false,
    allostericGaba: false
  },
  ssri: {
    id: 'ssri',
    nameTh: 'ยาต้านเศร้ากลุ่ม SSRI (Fluoxetine / Prozac)',
    nameEn: 'SSRI Antidepressant (Fluoxetine)',
    effectTh: 'ยับยั้งโปรตีนขนส่ง SERT ทำให้เซโรโทนินค้างอยู่ในช่องว่างไซแนปส์นานขึ้น และกระตุ้นตัวรับได้อย่างต่อเนื่อง',
    effectEn: 'Inhibits Serotonin Reuptake Transporter (SERT). Serotonin molecules linger in the synaptic cleft, prolonging postsynaptic signaling.',
    vesicleFusionBlocked: false,
    receptorBlocked: false,
    reuptakeInhibited: true,
    degradationInhibited: false,
    allostericGaba: false
  },
  benzodiazepine: {
    id: 'benzodiazepine',
    nameTh: 'ยานอนหลับกลุ่มเบนโซไดอะซีปีน (Diazepam / Valium)',
    nameEn: 'Benzodiazepine (Diazepam / Valium)',
    effectTh: 'ทำหน้าที่เป็น Positive Allosteric Modulator ของตัวรับ GABA_A เพิ่มความถี่การเปิดของช่อง Cl- $\\to$ เกิด Hyperpolarization รุนแรง $\\to$ กดระบบประสาทอย่างลึก',
    effectEn: 'Positive allosteric modulator of GABA_A receptors. Increases Cl- channel opening frequency -> massive hyperpolarization -> profound CNS depression.',
    vesicleFusionBlocked: false,
    receptorBlocked: false,
    reuptakeInhibited: false,
    degradationInhibited: false,
    allostericGaba: true
  },
  organophosphate: {
    id: 'organophosphate',
    nameTh: 'ยาฆ่าแมลงออร์กาโนฟอสเฟต (Organophosphate / Nerve Agent)',
    nameEn: 'Organophosphate Pesticide / Sarin',
    effectTh: 'ยับยั้งเอนไซม์ Acetylcholinesterase (AChE) ถาวร $\\to$ ACh คั่งค้างไม่ถูกย่อยสลาย $\\to$ ตัวรับถูกกระตุ้นตลอดเวลาจนเกิดตะคริวเกร็งและหมดสติ (Cholinergic Toxidrome)',
    effectEn: 'Irreversibly inhibits Acetylcholinesterase (AChE). ACh floods the cleft unchecked -> continuous depolarizing bombardment -> cholinergic crisis.',
    vesicleFusionBlocked: false,
    receptorBlocked: false,
    reuptakeInhibited: false,
    degradationInhibited: true,
    allostericGaba: false
  }
};

export class SynapseLaboratory {
  constructor(options = {}) {
    this.canvasId = options.canvasId || 'synapse-canvas';
    this.vmCanvasId = options.vmCanvasId || 'synapse-vm-canvas';
    this.onVmChange = options.onVmChange || (() => {});
    this.onEventLogged = options.onEventLogged || (() => {});

    this.canvas = null;
    this.ctx = null;
    this.vmCanvas = null;
    this.vmCtx = null;

    this.activeNeurotransmitter = 'glutamate';
    this.activeDrug = 'normal';
    this.isSpikeTrainActive = false;
    this.spikeTrainInterval = null;

    // Membrane Potential dynamics
    this.restingVm = -70.0; // mV
    this.thresholdVm = -55.0; // mV
    this.peakVm = 30.0; // mV
    this.currentVm = -70.0;
    this.targetVm = -70.0;
    this.vmHistory = new Array(200).fill(-70.0);
    this.isInActionPotential = false;
    this.apTimer = 0;

    // Biological Particles
    this.vesicles = [];
    this.calciumIons = [];
    this.transmitterMolecules = [];
    this.receptors = [];
    this.enzymes = [];
    this.flowingIons = [];

    // Animation loop state
    this.animationFrameId = null;
    this.lastTimestamp = performance.now();
    this.isPresynapticDepolarized = false;
    this.depolTimer = 0;

    // Socratic questions & feedback
    this.socraticLog = [];
  }

  init() {
    if (typeof document === 'undefined') return;

    this.canvas = document.getElementById(this.canvasId);
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }

    this.vmCanvas = document.getElementById(this.vmCanvasId);
    if (this.vmCanvas) {
      this.vmCtx = this.vmCanvas.getContext('2d');
    }

    this.initBiologicalStructures();
    this.startLoop();
  }

  initBiologicalStructures() {
    const w = this.canvas ? this.canvas.width : 700;
    const h = this.canvas ? this.canvas.height : 380;

    // 1. Receptors along the postsynaptic membrane (y ≈ 240)
    this.receptors = [];
    const receptorCount = 8;
    const step = (w - 160) / (receptorCount - 1);
    for (let i = 0; i < receptorCount; i++) {
      this.receptors.push({
        id: i,
        x: 80 + i * step,
        y: 240,
        isBound: false,
        boundTimer: 0,
        channelOpen: false,
        openIntensity: 0
      });
    }

    // 2. Initial Synaptic Vesicles in Presynaptic Terminal (y between 50 and 130)
    this.vesicles = [];
    for (let i = 0; i < 14; i++) {
      this.vesicles.push({
        x: 100 + Math.random() * (w - 200),
        y: 50 + Math.random() * 80,
        targetY: 50 + Math.random() * 80,
        radius: 11,
        contentCount: 8,
        fused: false,
        fuseProgress: 0
      });
    }

    // 3. AChE Enzymes / Transporters floating in cleft
    this.enzymes = [];
    for (let i = 0; i < 6; i++) {
      this.enzymes.push({
        x: 120 + Math.random() * (w - 240),
        y: 180 + Math.random() * 35,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.2
      });
    }

    this.transmitterMolecules = [];
    this.calciumIons = [];
    this.flowingIons = [];
  }

  setNeurotransmitter(id) {
    if (!NEUROTRANSMITTERS[id]) return;
    this.activeNeurotransmitter = id;
    sound.playHoverTick();
    this.initBiologicalStructures();
    return NEUROTRANSMITTERS[id];
  }

  setDrugChallenge(drugId) {
    if (!PHARMACOLOGY_CHALLENGES[drugId]) return;
    this.activeDrug = drugId;
    sound.playSocraticPrompt();
    return PHARMACOLOGY_CHALLENGES[drugId];
  }

  /**
   * Action Potential Trigger
   */
  fireActionPotential() {
    const drug = PHARMACOLOGY_CHALLENGES[this.activeDrug];
    this.isPresynapticDepolarized = true;
    this.depolTimer = 0.35; // seconds of depolarization glow
    sound.playActionPotential();

    const w = this.canvas ? this.canvas.width : 700;

    // 1. Influx Calcium Ions through voltage-gated Ca2+ channels at flanks
    for (let i = 0; i < 16; i++) {
      const isLeft = Math.random() < 0.5;
      this.calciumIons.push({
        x: isLeft ? 60 + Math.random() * 40 : w - 100 + Math.random() * 40,
        y: 130 + Math.random() * 20,
        vx: isLeft ? 1.5 + Math.random() * 1.5 : -1.5 - Math.random() * 1.5,
        vy: -0.5 - Math.random() * 1.0,
        life: 1.0
      });
    }

    // 2. Check if Botox blocks vesicle fusion
    if (drug.vesicleFusionBlocked) {
      this.onEventLogged({
        type: 'blocked',
        textTh: '🚫 Botox สลายโปรตีน SNARE! ถุงไซแนปส์ไม่สามารถหลอมรวมได้ ไม่มีการหลั่งสารสื่อประสาท',
        textEn: '🚫 Botox cleaved SNARE complex! Vesicles cannot fuse. Transmitter release halted completely.'
      });
      return;
    }

    // 3. Trigger vesicle movement toward active zone and exocytosis
    let fusedCount = 0;
    for (let i = 0; i < this.vesicles.length; i++) {
      const v = this.vesicles[i];
      if (!v.fused && fusedCount < 3) {
        v.targetY = 160;
        v.fused = true;
        v.fuseProgress = 0;
        fusedCount++;
      }
    }

    sound.playSynapticRelease();
  }

  toggleSpikeTrain(active) {
    this.isSpikeTrainActive = !!active;
    if (this.isSpikeTrainActive) {
      this.fireActionPotential();
      this.spikeTrainInterval = setInterval(() => {
        this.fireActionPotential();
      }, 750);
    } else if (this.spikeTrainInterval) {
      clearInterval(this.spikeTrainInterval);
      this.spikeTrainInterval = null;
    }
  }

  updatePhysics(dt) {
    const w = this.canvas ? this.canvas.width : 700;
    const h = this.canvas ? this.canvas.height : 380;
    const nt = NEUROTRANSMITTERS[this.activeNeurotransmitter];
    const drug = PHARMACOLOGY_CHALLENGES[this.activeDrug];

    // Depolarization timer
    if (this.depolTimer > 0) {
      this.depolTimer -= dt;
      if (this.depolTimer <= 0) this.isPresynapticDepolarized = false;
    }

    // 1. Update Calcium ions
    for (let i = this.calciumIons.length - 1; i >= 0; i--) {
      const ca = this.calciumIons[i];
      ca.x += ca.vx;
      ca.y += ca.vy;
      ca.life -= dt * 1.2;
      if (ca.life <= 0) {
        this.calciumIons.splice(i, 1);
      }
    }

    // 2. Update Synaptic Vesicles
    this.vesicles.forEach(v => {
      if (v.fused) {
        if (v.targetY - v.y > 1.5) {
          v.y += (v.targetY - v.y) * 0.25;
        } else {
          v.y = v.targetY;
          v.fuseProgress += dt * 4.0;
          if (v.fuseProgress >= 1.0 && v.contentCount > 0) {
            // Burst neurotransmitters into synaptic cleft
            for (let k = 0; k < v.contentCount; k++) {
              this.transmitterMolecules.push({
                x: v.x + (Math.random() - 0.5) * 14,
                y: 172,
                vx: (Math.random() - 0.5) * 1.8,
                vy: 0.8 + Math.random() * 1.5,
                bound: false,
                life: 6.0
              });
            }
            v.contentCount = 0;
            // Reset vesicle after delay
            setTimeout(() => {
              v.fused = false;
              v.fuseProgress = 0;
              v.y = 50 + Math.random() * 80;
              v.contentCount = 8;
            }, 2500);
          }
        }
      }
    });

    // 3. Update Neurotransmitter Molecules (Diffusion in cleft)
    for (let i = this.transmitterMolecules.length - 1; i >= 0; i--) {
      const mol = this.transmitterMolecules[i];

      if (!mol.bound) {
        mol.x += mol.vx + (Math.random() - 0.5) * 0.8;
        mol.y += mol.vy + (Math.random() - 0.5) * 0.4;
        mol.vx *= 0.96;
        mol.vy *= 0.96;

        // Bounce off lateral boundaries
        if (mol.x < 40 || mol.x > w - 40) mol.vx *= -1;

        // Keep inside synaptic cleft (y: 165 - 240)
        if (mol.y < 165) mol.y = 165;

        // AChE enzymatic breakdown
        if (nt.hasAChE && !drug.degradationInhibited && Math.random() < 0.015) {
          this.transmitterMolecules.splice(i, 1);
          continue;
        }

        // Reuptake into presynaptic terminal
        if (nt.hasReuptake && !drug.reuptakeInhibited && mol.y < 175 && Math.random() < 0.02) {
          this.transmitterMolecules.splice(i, 1);
          continue;
        }

        // Check receptor collision
        if (mol.y >= 232 && mol.y <= 245) {
          if (!drug.receptorBlocked) {
            let matchedReceptor = null;
            for (const rec of this.receptors) {
              if (!rec.isBound && Math.abs(mol.x - rec.x) < 22) {
                matchedReceptor = rec;
                break;
              }
            }

            if (matchedReceptor) {
              mol.bound = true;
              mol.x = matchedReceptor.x;
              mol.y = matchedReceptor.y - 4;
              matchedReceptor.isBound = true;
              matchedReceptor.boundTimer = drug.allostericGaba ? 2.5 : 1.4;
              matchedReceptor.channelOpen = true;

              sound.playIonChannelOpen(nt.type === 'inhibitory');

              // Influx ions through channel
              for (let k = 0; k < (drug.allostericGaba ? 8 : 4); k++) {
                this.flowingIons.push({
                  x: matchedReceptor.x + (Math.random() - 0.5) * 6,
                  y: matchedReceptor.y + 10,
                  vy: 1.5 + Math.random() * 2.0,
                  type: nt.ion,
                  life: 0.8
                });
              }
            }
          }
        }
      }

      mol.life -= dt;
      if (mol.life <= 0) {
        this.transmitterMolecules.splice(i, 1);
      }
    }

    // 4. Update Receptors & calculate cumulative Vm impact
    let openCount = 0;
    this.receptors.forEach(rec => {
      if (rec.isBound) {
        rec.boundTimer -= dt;
        rec.openIntensity = Math.min(1.0, rec.openIntensity + dt * 4);
        openCount++;
        if (rec.boundTimer <= 0) {
          rec.isBound = false;
          rec.channelOpen = false;
          // Unbind molecule
          const bMolIdx = this.transmitterMolecules.findIndex(m => m.bound && Math.abs(m.x - rec.x) < 5);
          if (bMolIdx !== -1) {
            this.transmitterMolecules.splice(bMolIdx, 1);
          }
        }
      } else {
        rec.openIntensity = Math.max(0, rec.openIntensity - dt * 2);
      }
    });

    // 5. Update Flowing Postsynaptic Ions
    for (let i = this.flowingIons.length - 1; i >= 0; i--) {
      const ion = this.flowingIons[i];
      ion.y += ion.vy;
      ion.life -= dt * 1.5;
      if (ion.life <= 0 || ion.y > h - 20) {
        this.flowingIons.splice(i, 1);
      }
    }

    // 6. Calculate Membrane Potential (Vm)
    if (this.isInActionPotential) {
      this.apTimer += dt;
      if (this.apTimer < 0.08) {
        // Rapid depolarization spike up to +30 mV
        this.currentVm += (this.peakVm - this.currentVm) * 0.4;
      } else if (this.apTimer < 0.22) {
        // Repolarization / hyperpolarization overshoot
        this.currentVm += (-78.0 - this.currentVm) * 0.3;
      } else {
        // Return to resting -70 mV
        this.currentVm += (-70.0 - this.currentVm) * 0.15;
        if (this.apTimer >= 0.35) {
          this.isInActionPotential = false;
          this.apTimer = 0;
        }
      }
    } else {
      // Passive summation of EPSP / IPSP
      const deltaPerReceptor = nt.deltaVm * (drug.allostericGaba ? 1.8 : 1.0);
      const netTarget = this.restingVm + openCount * (deltaPerReceptor / this.receptors.length);
      this.currentVm += (netTarget - this.currentVm) * 0.08;

      // Check if threshold reached (-55 mV)
      if (this.currentVm >= this.thresholdVm && nt.type !== 'inhibitory') {
        this.isInActionPotential = true;
        this.apTimer = 0;
        sound.playActionPotential();
        this.onEventLogged({
          type: 'spike',
          textTh: '⚡ จุดติดศักย์ไฟกระทำสมบูรณ์ (All-or-None Postsynaptic Action Potential fired)!',
          textEn: '⚡ Threshold crossed (-55 mV): All-or-none postsynaptic action potential generated!'
        });
      }
    }

    // Update Vm history array for oscilloscope
    this.vmHistory.push(this.currentVm);
    this.vmHistory.shift();

    this.onVmChange(this.currentVm);
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const nt = NEUROTRANSMITTERS[this.activeNeurotransmitter];
    const drug = PHARMACOLOGY_CHALLENGES[this.activeDrug];

    ctx.clearRect(0, 0, w, h);

    // Dark neuro-gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#0a0f1d');
    bgGrad.addColorStop(0.45, '#0d1527');
    bgGrad.addColorStop(0.55, '#070b14');
    bgGrad.addColorStop(1, '#0a0f1d');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Synaptic Cleft Glow
    ctx.fillStyle = 'rgba(56, 189, 248, 0.03)';
    ctx.fillRect(40, 160, w - 80, 80);

    // 1. Presynaptic Axon Terminal (Top Bulb)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(w * 0.35, 0);
    ctx.lineTo(w * 0.35, 40);
    ctx.bezierCurveTo(w * 0.2, 70, 50, 110, 60, 160);
    ctx.lineTo(w - 60, 160);
    ctx.bezierCurveTo(w - 50, 110, w * 0.8, 70, w * 0.65, 40);
    ctx.lineTo(w * 0.65, 0);
    ctx.closePath();

    ctx.fillStyle = this.isPresynapticDepolarized ? 'rgba(234, 179, 8, 0.18)' : 'rgba(30, 41, 59, 0.85)';
    ctx.fill();
    ctx.strokeStyle = this.isPresynapticDepolarized ? '#facc15' : '#38bdf8';
    ctx.lineWidth = this.isPresynapticDepolarized ? 3.5 : 2;
    ctx.shadowColor = this.isPresynapticDepolarized ? '#facc15' : '#0284c7';
    ctx.shadowBlur = this.isPresynapticDepolarized ? 16 : 6;
    ctx.stroke();
    ctx.restore();

    // Active Zone Bar along bottom of presynaptic membrane
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(80, 157, w - 160, 4);

    // 2. Postsynaptic Dendritic Spine (Bottom)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(40, 240);
    ctx.lineTo(w - 40, 240);
    ctx.bezierCurveTo(w - 30, 290, w * 0.75, 330, w * 0.6, h);
    ctx.lineTo(w * 0.4, h);
    ctx.bezierCurveTo(w * 0.25, 330, 30, 290, 40, 240);
    ctx.closePath();

    const postGrad = ctx.createLinearGradient(0, 240, 0, h);
    postGrad.addColorStop(0, 'rgba(30, 41, 59, 0.9)');
    postGrad.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
    ctx.fillStyle = postGrad;
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Postsynaptic Density (PSD) bar
    ctx.fillStyle = '#475569';
    ctx.fillRect(60, 241, w - 120, 5);

    // 3. Draw Synaptic Vesicles
    this.vesicles.forEach(v => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(v.x, v.y, v.radius, 0, Math.PI * 2);
      ctx.fillStyle = v.fused ? 'rgba(245, 158, 11, 0.6)' : 'rgba(56, 189, 248, 0.45)';
      ctx.fill();
      ctx.strokeStyle = v.fused ? '#f59e0b' : '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw transmitter dots inside vesicle
      if (v.contentCount > 0) {
        ctx.fillStyle = nt.color;
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(v.x + Math.cos(angle) * 4, v.y + Math.sin(angle) * 4, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    });

    // 4. Draw Calcium Ions (Ca2+)
    this.calciumIons.forEach(ca => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(ca.x, ca.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#fde047';
      ctx.shadowColor = '#eab308';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    });

    // 5. Draw Receptors on Postsynaptic Membrane
    this.receptors.forEach(rec => {
      ctx.save();
      ctx.translate(rec.x, rec.y);

      // Receptor channel barrel
      ctx.fillStyle = rec.isBound ? '#10b981' : (drug.receptorBlocked ? '#ef4444' : '#64748b');
      ctx.fillRect(-10, -6, 20, 14);

      // Binding pocket
      ctx.beginPath();
      ctx.arc(0, -6, 6, Math.PI, 0, false);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = rec.isBound ? '#34d399' : (drug.receptorBlocked ? '#f87171' : '#94a3b8');
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Open channel pore if bound
      if (rec.channelOpen) {
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(-3, 0, 6, 12);
      }

      ctx.restore();
    });

    // 6. Draw Free Neurotransmitter Molecules in Synaptic Cleft
    this.transmitterMolecules.forEach(mol => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(mol.x, mol.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = nt.color;
      ctx.shadowColor = nt.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    });

    // 7. Draw Flowing Postsynaptic Ions (Na+ or Cl-)
    this.flowingIons.forEach(ion => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(ion.x, ion.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = ion.type === 'Cl-' ? '#c084fc' : '#67e8f9';
      ctx.fill();
      ctx.restore();
    });

    // 8. Visual Annotations & Badges
    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Presynaptic Terminal (ปลายแอกซอน)', 18, 25);
    ctx.fillText('Synaptic Cleft 20 nm (ช่องไซแนปส์)', 18, 195);
    ctx.fillText('Postsynaptic Spine (เดนไดรต์หลังไซแนปส์)', 18, 270);

    // Active Drug Challenge Watermark
    if (drug.id !== 'normal') {
      ctx.save();
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(`⚠️ Challenge: ${drug.nameEn}`, w - 280, 25);
      ctx.restore();
    }
  }

  drawVmOscilloscope() {
    if (!this.vmCtx || !this.vmCanvas) return;
    const ctx = this.vmCtx;
    const w = this.vmCanvas.width;
    const h = this.vmCanvas.height;

    ctx.clearRect(0, 0, w, h);

    // Dark phosphor CRT background
    ctx.fillStyle = '#060913';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let y = 0; y < h; y += 20) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    for (let x = 0; x < w; x += 30) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    ctx.stroke();

    // Map -90 mV to +40 mV to canvas height
    // y = 0 is +40 mV, y = h is -90 mV
    const vmToY = (vm) => {
      const minVm = -90;
      const maxVm = 40;
      const normalized = (vm - minVm) / (maxVm - minVm);
      return h - normalized * h;
    };

    // Threshold Line (-55 mV) - Dashed Red
    const threshY = vmToY(this.thresholdVm);
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, threshY);
    ctx.lineTo(w, threshY);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.font = '10px monospace';
    ctx.fillText('Threshold -55 mV', w - 105, threshY - 3);
    ctx.restore();

    // Resting Line (-70 mV) - Solid Cyan
    const restY = vmToY(this.restingVm);
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0, restY);
    ctx.lineTo(w, restY);
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.font = '10px monospace';
    ctx.fillText('Resting -70 mV', w - 95, restY - 3);
    ctx.restore();

    // Vm Waveform Line
    ctx.save();
    ctx.strokeStyle = this.currentVm >= -55 ? '#facc15' : (this.currentVm < -72 ? '#c084fc' : '#38bdf8');
    ctx.lineWidth = 2.2;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 8;
    ctx.beginPath();

    const stepX = w / (this.vmHistory.length - 1);
    this.vmHistory.forEach((vm, idx) => {
      const x = idx * stepX;
      const y = vmToY(vm);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.restore();

    // Live Readout badge
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`Vm = ${this.currentVm.toFixed(1)} mV`, 12, 20);
  }

  startLoop() {
    const loop = (ts) => {
      const dt = Math.min(0.05, (ts - this.lastTimestamp) * 0.001);
      this.lastTimestamp = ts;

      this.updatePhysics(dt);
      this.draw();
      this.drawVmOscilloscope();

      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  stopLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.spikeTrainInterval) {
      clearInterval(this.spikeTrainInterval);
      this.spikeTrainInterval = null;
    }
  }
}

export const synapseLab = new SynapseLaboratory();
