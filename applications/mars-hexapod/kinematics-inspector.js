/**
 * STEM Robotics Kinematics Inspector & 3-DOF Interactive IK Laboratory
 * Dr. Apisit Tongchai - Mars Hexapod Engineering
 * 
 * Provides live 6-leg telemetry (Coxa, Femur, Tibia joint angles),
 * an interactive 2D sagittal plane Inverse Kinematics solver canvas with singularity detection,
 * and academic trigonometric breakdown (Law of Cosines, atan2, workspace limits).
 */
export class KinematicsInspector {
  constructor() {
    this.activeTab = 'telemetry'; // 'telemetry' | 'ik-lab' | 'theory'
    this.canvas = document.getElementById('ik-lab-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

    // Segment lengths (matching HexapodLeg in robot.js)
    this.L1 = 0.45; // Coxa length (m)
    this.L2 = 0.92; // Femur length (m)
    this.L3 = 1.22; // Tibia length (m)
    this.maxReach = (this.L2 + this.L3) * 0.98; // 2.10m
    this.minReach = Math.abs(this.L2 - this.L3) * 1.05; // 0.31m

    // Test slider state for IK Laboratory
    this.testR = 1.95; // Horizontal reach (m)
    this.testZ = -1.15; // Vertical elevation (m)

    this.initUI();
    this.resizeCanvas();
    this.renderIKCanvas();
  }

  initUI() {
    // 1. Tab buttons
    const tabBtns = document.querySelectorAll('.kinematics-tab-btn');
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // 2. Interactive IK Sliders
    const sliderR = document.getElementById('ik-slider-r');
    const sliderZ = document.getElementById('ik-slider-z');
    const valR = document.getElementById('ik-val-r');
    const valZ = document.getElementById('ik-val-z');

    if (sliderR) {
      sliderR.addEventListener('input', (e) => {
        this.testR = parseFloat(e.target.value);
        if (valR) valR.textContent = `${this.testR.toFixed(2)} m`;
        this.renderIKCanvas();
      });
    }

    if (sliderZ) {
      sliderZ.addEventListener('input', (e) => {
        this.testZ = parseFloat(e.target.value);
        if (valZ) valZ.textContent = `${this.testZ.toFixed(2)} m`;
        this.renderIKCanvas();
      });
    }

    // 3. Preset Poses
    const presetBtns = document.querySelectorAll('.ik-preset-btn');
    presetBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const r = parseFloat(e.currentTarget.getAttribute('data-r'));
        const z = parseFloat(e.currentTarget.getAttribute('data-z'));
        this.setPose(r, z);
      });
    });

    window.addEventListener('resize', () => {
      if (this.activeTab === 'ik-lab') {
        this.resizeCanvas();
        this.renderIKCanvas();
      }
    });
  }

  switchTab(tab) {
    this.activeTab = tab;

    const tabBtns = document.querySelectorAll('.kinematics-tab-btn');
    tabBtns.forEach((btn) => {
      const isCurrent = btn.getAttribute('data-tab') === tab;
      btn.classList.toggle('active', isCurrent);
    });

    const panes = document.querySelectorAll('.kinematics-tab-pane');
    panes.forEach((pane) => {
      const isCurrent = pane.id === `tab-pane-${tab}`;
      pane.classList.toggle('hidden', !isCurrent);
    });

    if (tab === 'ik-lab') {
      setTimeout(() => {
        this.resizeCanvas();
        this.renderIKCanvas();
      }, 50);
    }
  }

  setPose(r, z) {
    this.testR = r;
    this.testZ = z;

    const sliderR = document.getElementById('ik-slider-r');
    const sliderZ = document.getElementById('ik-slider-z');
    const valR = document.getElementById('ik-val-r');
    const valZ = document.getElementById('ik-val-z');

    if (sliderR) sliderR.value = r;
    if (sliderZ) sliderZ.value = z;
    if (valR) valR.textContent = `${r.toFixed(2)} m`;
    if (valZ) valZ.textContent = `${z.toFixed(2)} m`;

    this.renderIKCanvas();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(300, rect.width || 560);
    const height = 300;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    if (this.ctx) {
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  /**
   * Solves 3-DOF Analytical Inverse Kinematics for a 2D sagittal limb plane
   */
  solve2DIK(targetR, targetZ) {
    const horiz = targetR - this.L1;
    const vert = targetZ;
    const D = Math.hypot(horiz, vert);

    const isSingularity = D > (this.L2 + this.L3) || D < Math.abs(this.L2 - this.L3);
    const clampedD = Math.max(this.minReach, Math.min(this.maxReach, D));

    // Law of Cosines for Tibia
    const cosTibia = (this.L2 * this.L2 + this.L3 * this.L3 - clampedD * clampedD) / (2 * this.L2 * this.L3);
    const clampedCosTibia = Math.max(-1, Math.min(1, cosTibia));
    const tibiaAngle = Math.PI - Math.acos(clampedCosTibia);

    // Law of Cosines for Femur
    const alpha = Math.atan2(vert, horiz);
    const cosFemur = (this.L2 * this.L2 + clampedD * clampedD - this.L3 * this.L3) / (2 * this.L2 * clampedD);
    const clampedCosFemur = Math.max(-1, Math.min(1, cosFemur));
    const beta = Math.acos(clampedCosFemur);
    const femurAngle = alpha + beta;

    return {
      femurAngle,
      tibiaAngle: -tibiaAngle,
      D,
      clampedD,
      isSingularity,
      cosTibia: clampedCosTibia,
      cosFemur: clampedCosFemur
    };
  }

  /**
   * Renders the interactive 2D schematic of the 3-DOF limb
   */
  renderIKCanvas() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, w, h);

    // Background grid
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, w, h);

    // Coordinate origin mapping:
    // Shoulder hub at (ox, oy)
    const ox = w * 0.24;
    const oy = h * 0.42;
    const scale = Math.min(w, h) * 0.36; // Pixels per meter

    // Draw grid lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Ground plane line at nominal target ground
    const groundScreenY = oy - this.testZ * scale;
    ctx.strokeStyle = 'rgba(234, 88, 12, 0.5)';
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(0, groundScreenY);
    ctx.lineTo(w, groundScreenY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(234, 88, 12, 0.7)';
    ctx.font = '10px monospace';
    ctx.fillText(`พื้นผิว Chryse Planitia (z = ${this.testZ.toFixed(2)}m)`, 10, groundScreenY - 6);

    // Solve kinematics
    const sol = this.solve2DIK(this.testR, this.testZ);

    // Joint forward positions in screen coordinates
    // 1. Chassis center / mounting root
    const rootX = ox - this.L1 * scale;
    const rootY = oy;

    // 2. Coxa / Shoulder joint
    const coxaX = ox;
    const coxaY = oy;

    // 3. Knee joint (end of Femur)
    const kneeX = coxaX + Math.cos(sol.femurAngle) * this.L2 * scale;
    const kneeY = coxaY - Math.sin(sol.femurAngle) * this.L2 * scale; // Canvas Y is downward

    // 4. Foot tip (end of Tibia)
    const totalAngle = sol.femurAngle + sol.tibiaAngle;
    const footX = kneeX + Math.cos(totalAngle) * this.L3 * scale;
    const footY = kneeY - Math.sin(totalAngle) * this.L3 * scale;

    // Reach envelope maximum arc
    ctx.strokeStyle = sol.isSingularity ? 'rgba(244, 63, 94, 0.6)' : 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(coxaX, coxaY, (this.L2 + this.L3) * scale, -Math.PI * 0.5, Math.PI * 0.5);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Links
    // Link 1: Coxa (Chassis to Shoulder)
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    ctx.lineTo(coxaX, coxaY);
    ctx.stroke();

    // Link 2: Femur (Shoulder to Knee)
    ctx.strokeStyle = sol.isSingularity ? '#f43f5e' : '#38bdf8';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(coxaX, coxaY);
    ctx.lineTo(kneeX, kneeY);
    ctx.stroke();

    // Link 3: Tibia (Knee to Foot)
    ctx.strokeStyle = sol.isSingularity ? '#fda4af' : '#22c55e';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(kneeX, kneeY);
    ctx.lineTo(footX, footY);
    ctx.stroke();

    // Joints / Pivots
    // Root pivot
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(rootX, rootY, 7, 0, Math.PI * 2);
    ctx.fill();

    // Shoulder Pivot
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(coxaX, coxaY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Knee Pivot
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.arc(kneeX, kneeY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Foot Pad End-Effector
    ctx.fillStyle = sol.isSingularity ? '#f43f5e' : '#f59e0b';
    ctx.beginPath();
    ctx.arc(footX, footY, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Annotations & Text
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '11px sans-serif';
    ctx.fillText(`Shoulder Hub (0, 0)`, coxaX - 35, coxaY - 14);
    ctx.fillText(`Knee θ₃=${(sol.tibiaAngle * 180 / Math.PI).toFixed(1)}°`, kneeX + 10, kneeY - 8);
    ctx.fillText(`Foot End-Effector (${this.testR.toFixed(2)}, ${this.testZ.toFixed(2)})m`, footX + 12, footY + 4);

    // Singularity Warning Banner
    if (sol.isSingularity) {
      ctx.fillStyle = 'rgba(244, 63, 94, 0.2)';
      ctx.fillRect(w - 240, 12, 228, 54);
      ctx.strokeStyle = '#f43f5e';
      ctx.strokeRect(w - 240, 12, 228, 54);

      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('⚠️ จุดภาวะเอกฐาน (SINGULARITY)', w - 230, 32);
      ctx.fillStyle = '#fda4af';
      ctx.font = '10.5px sans-serif';
      ctx.fillText(`เป้าหมายเกินระยะเอื้อม: ${sol.D.toFixed(2)}m > ${this.maxReach.toFixed(2)}m`, w - 230, 50);
    }

    // Update Numerical Math Output in DOM
    const dEl = document.getElementById('ik-math-d');
    const cosTEl = document.getElementById('ik-math-costibia');
    const femurEl = document.getElementById('ik-math-femur');
    const tibiaEl = document.getElementById('ik-math-tibia');
    const statusEl = document.getElementById('ik-math-status');

    if (dEl) dEl.textContent = `${sol.D.toFixed(3)} m`;
    if (cosTEl) cosTEl.textContent = sol.cosTibia.toFixed(4);
    if (femurEl) femurEl.textContent = `${(sol.femurAngle * 180 / Math.PI).toFixed(1)}°`;
    if (tibiaEl) tibiaEl.textContent = `${(sol.tibiaAngle * 180 / Math.PI).toFixed(1)}°`;
    if (statusEl) {
      if (sol.isSingularity) {
        statusEl.textContent = '❌ นอกขอบเขตการทำงาน (Unreachable Singularity)';
        statusEl.style.color = '#f43f5e';
      } else {
        statusEl.textContent = '✓ มีคำตอบทางจลนศาสตร์ (Valid Geometric Solution)';
        statusEl.style.color = '#4ade80';
      }
    }
  }

  /**
   * Updates the Live Joint Telemetry tab with real-time angles from all 6 robot legs
   * Called every frame in app.js animate() when inspector modal is visible
   */
  updateLiveTelemetry(legs) {
    if (this.activeTab !== 'telemetry' || !legs || legs.length < 6) return;

    const legNames = [
      { id: 'fr', code: 'ขาหน้าขวา (FR)', mount: '+50°' },
      { id: 'mr', code: 'ขากลางขวา (MR)', mount: '0°' },
      { id: 'rr', code: 'ขาหลังขวา (RR)', mount: '-50°' },
      { id: 'rl', code: 'ขาหลังซ้าย (RL)', mount: '-130°' },
      { id: 'ml', code: 'ขากลางซ้าย (ML)', mount: '180°' },
      { id: 'fl', code: 'ขาหน้าซ้าย (FL)', mount: '+130°' }
    ];

    legs.forEach((leg, i) => {
      const info = legNames[i];
      if (!info) return;

      const coxaDeg = ((leg.coxaAngle || 0) * (180 / Math.PI)).toFixed(1);
      const femurDeg = ((leg.femurAngle || 0) * (180 / Math.PI)).toFixed(1);
      const tibiaDeg = ((leg.tibiaAngle || 0) * (180 / Math.PI)).toFixed(1);
      const reach = (leg.reachDist || 1.95).toFixed(2);
      const isGrounded = !!leg.isGrounded;

      const card = document.getElementById(`leg-telemetry-card-${i}`);
      if (card) {
        const badge = card.querySelector('.leg-stance-badge');
        if (badge) {
          badge.textContent = isGrounded ? 'GROUNDED (ค้ำพื้น)' : 'SWING (ก้าวลอย)';
          badge.className = `leg-stance-badge ${isGrounded ? 'badge-grounded' : 'badge-swing'}`;
        }

        const coxaEl = card.querySelector('.leg-val-coxa');
        const femurEl = card.querySelector('.leg-val-femur');
        const tibiaEl = card.querySelector('.leg-val-tibia');
        const reachEl = card.querySelector('.leg-val-reach');
        const barEl = card.querySelector('.leg-reach-bar');

        if (coxaEl) coxaEl.textContent = `${coxaDeg > 0 ? '+' : ''}${coxaDeg}°`;
        if (femurEl) femurEl.textContent = `${femurDeg > 0 ? '+' : ''}${femurDeg}°`;
        if (tibiaEl) tibiaEl.textContent = `${tibiaDeg > 0 ? '+' : ''}${tibiaDeg}°`;
        if (reachEl) reachEl.textContent = `${reach}m / 2.14m`;
        if (barEl) {
          const pct = Math.min(100, Math.round((parseFloat(reach) / 2.14) * 100));
          barEl.style.width = `${pct}%`;
          barEl.style.backgroundColor = pct > 92 ? '#f43f5e' : '#38bdf8';
        }
      }
    });
  }
}
