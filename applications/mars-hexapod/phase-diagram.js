/**
 * Interactive Martian Water Phase Diagram (P-T Thermodynamic Simulator)
 * Dr. Apisit Tongchai - STEM Educational Robotics & Planetary Science
 * 
 * Simulates pure H2O phase equilibria (Sublimation, Melting, Boiling curves, Triple Point)
 * versus Chryse Planitia atmospheric pressure (0.63 kPa) and Noachian paleoclimate (120 kPa).
 * Includes Perchlorate Eutectic Brine freezing-point depression (-68°C).
 */
export class WaterPhaseDiagram {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    
    // Bounds for plotting (T: -100°C to +80°C, P: 0.01 kPa to 200 kPa on log10 scale)
    this.minT = -100;
    this.maxT = 80;
    this.minLogP = Math.log10(0.02);  // ~ -1.70
    this.maxLogP = Math.log10(200);   // ~ 2.30

    // Current thermodynamic state (Default: Chryse Planitia present conditions)
    this.temp = -55;       // °C
    this.pressure = 0.63;  // kPa
    this.isBrine = false;  // Perchlorate brine mode

    // Triple point of pure water
    this.tripleT = 0.01;   // °C
    this.tripleP = 0.6116; // kPa

    // Dragging state on canvas
    this.isDragging = false;

    // Molecular micro-animation particles
    this.particles = [];
    for (let i = 0; i < 28; i++) {
      this.particles.push({
        x: Math.random() * 40,
        y: Math.random() * 40,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        baseX: (i % 6) * 7 + 4,
        baseY: Math.floor(i / 6) * 8 + 4
      });
    }

    this.animTime = 0;
    this.initCanvasSize();
    this.bindEvents();
  }

  initCanvasSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const w = rect.width || 560;
    const h = rect.height || 250;

    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.width = w;
    this.height = h;

    // Plot margin
    this.padLeft = 65;
    this.padRight = 25;
    this.padTop = 25;
    this.padBottom = 42;
    this.plotW = this.width - this.padLeft - this.padRight;
    this.plotH = this.height - this.padTop - this.padBottom;
  }

  /**
   * Transforms temperature (°C) to canvas X
   */
  tToX(t) {
    return this.padLeft + ((t - this.minT) / (this.maxT - this.minT)) * this.plotW;
  }

  /**
   * Transforms pressure (kPa) to canvas Y (logarithmic scale)
   */
  pToY(p) {
    const logP = Math.log10(Math.max(0.01, p));
    const ratio = (logP - this.minLogP) / (this.maxLogP - this.minLogP);
    return this.padTop + (1.0 - ratio) * this.plotH;
  }

  /**
   * Transforms canvas X to temperature (°C)
   */
  xToT(x) {
    const ratio = (x - this.padLeft) / this.plotW;
    return this.minT + Math.max(0, Math.min(1, ratio)) * (this.maxT - this.minT);
  }

  /**
   * Transforms canvas Y to pressure (kPa)
   */
  yToP(y) {
    const ratio = 1.0 - (y - this.padTop) / this.plotH;
    const clamped = Math.max(0, Math.min(1, ratio));
    const logP = this.minLogP + clamped * (this.maxLogP - this.minLogP);
    return Math.pow(10, logP);
  }

  /**
   * Sublimation vapor pressure curve: P_subl(T) for T <= 0.01°C (Clausius-Clapeyron)
   */
  getSublimationP(t) {
    if (t > this.tripleT) return this.tripleP;
    const T_kelvin = t + 273.15;
    const T_triple = 273.16;
    // Antoine / Clausius-Clapeyron approximation for ice
    return this.tripleP * Math.exp(6108.6 * (1 / T_triple - 1 / T_kelvin));
  }

  /**
   * Boiling / Vaporization curve: P_boil(T) for T >= 0.01°C (Tetens equation)
   */
  getBoilingP(t) {
    if (t < this.tripleT) return this.tripleP;
    // Tetens formula in kPa
    return 0.61078 * Math.exp((17.27 * t) / (t + 237.3));
  }

  /**
   * Boiling temperature for a given pressure (inverse Tetens)
   */
  getBoilingT(p) {
    if (p <= this.tripleP) return this.tripleT;
    const lnRatio = Math.log(p / 0.61078);
    return (237.3 * lnRatio) / (17.27 - lnRatio);
  }

  /**
   * Evaluates current state of matter
   */
  evaluateState() {
    const T = this.temp;
    const P = this.pressure;
    const effectiveMeltT = this.isBrine ? -68.0 : 0.0; // Eutectic point of Mg(ClO4)2 brine

    if (P < (this.isBrine ? 0.15 : this.tripleP)) {
      // Below triple point: pure liquid cannot exist at equilibrium
      const pSub = this.getSublimationP(T);
      if (P >= pSub) {
        return {
          phase: 'ice',
          name: '❄️ น้ำแข็งบริสุทธิ์ (Solid Ice Ih)',
          status: 'เสี่ยงระเหิดฉับพลันหากอุณหภูมิสูงขึ้น (Sublimation Risk)',
          color: '#38bdf8'
        };
      } else {
        return {
          phase: 'gas',
          name: '💨 ไอน้ำ / ระเหิดฉับพลัน (Sublimed Vapor)',
          status: 'น้ำแข็งระเหิดกลายเป็นไอกระจายสู่บรรยากาศทันที',
          color: '#f97316'
        };
      }
    } else {
      // Above triple point: Solid, Liquid, and Gas all exist
      if (T < effectiveMeltT) {
        return {
          phase: 'ice',
          name: this.isBrine ? '❄️ น้ำเกลือเยือกแข็ง (Frozen Eutectic Salt)' : '❄️ น้ำแข็งบริสุทธิ์ (Solid Ice Ih)',
          status: 'ผลึกน้ำแข็งคงตัว ไม่มีการหลอมเหลว',
          color: '#38bdf8'
        };
      } else {
        const boilT = this.getBoilingT(P);
        if (T <= boilT) {
          return {
            phase: 'liquid',
            name: this.isBrine ? '💧 น้ำเกลือเพอร์คลอเรตคงตัว (Stable Brine)' : '💧 น้ำของเหลวคงตัว (Stable Liquid Water)',
            status: this.isBrine 
              ? 'เกลือลดจุดเยือกแข็งเหลือ -68°C ทำให้คงรูปของเหลวได้แม้ในอากาศหนาวจัดของดาวอังคาร!'
              : 'สภาวะเอื้อต่อการไหลและทำปฏิกิริยาเคมีกับหินบะซอลต์ เกิดแร่ดินเหนียว (Phyllosilicates)',
            color: '#10b981'
          };
        } else {
          return {
            phase: 'gas',
            name: '💨 ไอน้ำเดือดพล่าน (Boiling Vapor)',
            status: `ความดันบรรยากาศต่ำทำให้น้ำเดือดที่อุณหภูมิเพียง ${boilT.toFixed(1)}°C`,
            color: '#f43f5e'
          };
        }
      }
    }
  }

  setState(temp, pressure, isBrine = null) {
    this.temp = Math.max(this.minT, Math.min(this.maxT, temp));
    this.pressure = Math.max(0.02, Math.min(200, pressure));
    if (isBrine !== null) this.isBrine = isBrine;
    this.syncUI();
    this.render();
  }

  syncUI() {
    const sliderT = document.getElementById('atmo-slider-temp');
    const sliderP = document.getElementById('atmo-slider-press');
    const valT = document.getElementById('atmo-val-temp');
    const valP = document.getElementById('atmo-val-press');
    const stateBadge = document.getElementById('atmo-phase-state');
    const descPill = document.getElementById('atmo-phase-desc');
    const brineToggle = document.getElementById('atmo-toggle-brine');

    if (sliderT) sliderT.value = this.temp;
    if (sliderP) {
      // Linear representation of logP
      const logP = Math.log10(this.pressure);
      sliderP.value = ((logP - this.minLogP) / (this.maxLogP - this.minLogP)) * 100;
    }
    if (valT) valT.textContent = `${this.temp.toFixed(1)}°C`;
    if (valP) valP.textContent = `${this.pressure.toFixed(2)} kPa (${(this.pressure * 10).toFixed(1)} mbar)`;

    const st = this.evaluateState();
    if (stateBadge) {
      stateBadge.textContent = st.name;
      stateBadge.style.color = st.color;
      stateBadge.style.borderColor = st.color;
    }
    if (descPill) {
      descPill.innerHTML = `<strong>คำอธิบายทางอุณหพลศาสตร์:</strong> ${st.status}`;
    }
    if (brineToggle) {
      brineToggle.checked = this.isBrine;
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.initCanvasSize();
      this.render();
    });

    // Direct Canvas drag / click
    const handlePointer = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= this.padLeft && x <= this.width - this.padRight &&
          y >= this.padTop && y <= this.height - this.padBottom) {
        this.temp = Math.round(this.xToT(x) * 10) / 10;
        this.pressure = Math.round(this.yToP(y) * 100) / 100;
        this.syncUI();
        this.render();
      }
    };

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      handlePointer(e);
    });
    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) handlePointer(e);
    });
    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('touchstart', (e) => {
      this.isDragging = true;
      handlePointer(e);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (this.isDragging) handlePointer(e);
    }, { passive: true });
    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Sliders
    const sliderT = document.getElementById('atmo-slider-temp');
    if (sliderT) {
      sliderT.addEventListener('input', (e) => {
        this.temp = parseFloat(e.target.value);
        this.syncUI();
        this.render();
      });
    }

    const sliderP = document.getElementById('atmo-slider-press');
    if (sliderP) {
      sliderP.addEventListener('input', (e) => {
        const pct = parseFloat(e.target.value) / 100;
        const logP = this.minLogP + pct * (this.maxLogP - this.minLogP);
        this.pressure = Math.pow(10, logP);
        this.syncUI();
        this.render();
      });
    }

    // Presets
    const btnCur = document.getElementById('btn-preset-current');
    if (btnCur) btnCur.addEventListener('click', () => this.setState(-55, 0.63, false));

    const btnTrip = document.getElementById('btn-preset-triple');
    if (btnTrip) btnTrip.addEventListener('click', () => this.setState(0.01, 0.6116, false));

    const btnNoach = document.getElementById('btn-preset-noachian');
    if (btnNoach) btnNoach.addEventListener('click', () => this.setState(15, 120, false));

    const btnBrine = document.getElementById('btn-preset-brine');
    if (btnBrine) btnBrine.addEventListener('click', () => this.setState(-35, 0.85, true));

    const brineToggle = document.getElementById('atmo-toggle-brine');
    if (brineToggle) {
      brineToggle.addEventListener('change', (e) => {
        this.isBrine = e.target.checked;
        this.syncUI();
        this.render();
      });
    }
  }

  render() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Background Grid & Framing
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(this.padLeft, this.padTop, this.plotW, this.plotH);

    // 2. Draw Phase Regions (Shaded polygons)
    // Liquid Water Region
    const meltT = this.isBrine ? -68 : 0.01;
    const meltX = this.tToX(meltT);
    const topY = this.padTop;
    const tripleX = this.tToX(this.tripleT);
    const tripleY = this.pToY(this.tripleP);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(meltX, topY);
    ctx.lineTo(this.tToX(this.maxT), topY);

    // Trace down boiling curve
    for (let t = this.maxT; t >= this.tripleT; t -= 2) {
      const p = this.getBoilingP(t);
      if (p <= 200) {
        ctx.lineTo(this.tToX(t), this.pToY(p));
      }
    }
    ctx.lineTo(tripleX, tripleY);
    if (this.isBrine) {
      ctx.lineTo(this.tToX(-68), this.pToY(0.15));
    }
    ctx.lineTo(meltX, topY);
    ctx.closePath();
    ctx.fillStyle = this.isBrine ? 'rgba(16, 185, 129, 0.28)' : 'rgba(16, 185, 129, 0.18)';
    ctx.fill();

    // Solid Ice Region
    ctx.beginPath();
    ctx.moveTo(this.padLeft, topY);
    ctx.lineTo(meltX, topY);
    ctx.lineTo(tripleX, tripleY);
    // Sublimation curve down to minT
    for (let t = this.tripleT; t >= this.minT; t -= 2) {
      const p = this.getSublimationP(t);
      ctx.lineTo(this.tToX(t), this.pToY(p));
    }
    ctx.lineTo(this.padLeft, this.padTop + this.plotH);
    ctx.closePath();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.14)';
    ctx.fill();

    // Gas / Vapor Region (Remaining area)
    ctx.beginPath();
    ctx.moveTo(this.tToX(this.maxT), this.padTop + this.plotH);
    ctx.lineTo(this.padLeft, this.padTop + this.plotH);
    for (let t = this.minT; t <= this.tripleT; t += 2) {
      const p = this.getSublimationP(t);
      ctx.lineTo(this.tToX(t), this.pToY(p));
    }
    for (let t = this.tripleT; t <= this.maxT; t += 2) {
      const p = this.getBoilingP(t);
      if (p <= 200) {
        ctx.lineTo(this.tToX(t), this.pToY(p));
      }
    }
    ctx.lineTo(this.tToX(this.maxT), this.padTop + this.plotH);
    ctx.closePath();
    ctx.fillStyle = 'rgba(249, 115, 22, 0.12)';
    ctx.fill();
    ctx.restore();

    // 3. Grid lines & Axis labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    // Horizontal Pressure ticks: 0.1, 0.63 (Mars), 1, 10, 101.3 (Earth 1 atm), 100
    const pTicks = [
      { val: 0.1, label: '0.1' },
      { val: 0.63, label: '0.63 (Chryse)' },
      { val: 1.0, label: '1.0' },
      { val: 10.0, label: '10' },
      { val: 101.3, label: '101.3 (โลก 1 atm)' }
    ];

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    pTicks.forEach(tick => {
      const y = this.pToY(tick.val);
      if (y >= this.padTop && y <= this.padTop + this.plotH) {
        ctx.beginPath();
        ctx.moveTo(this.padLeft, y);
        ctx.lineTo(this.padLeft + this.plotW, y);
        ctx.stroke();

        ctx.fillStyle = tick.val === 0.63 ? '#f97316' : (tick.val === 101.3 ? '#4ade80' : '#64748b');
        ctx.fillText(tick.label, this.padLeft - 6, y);
      }
    });

    // Vertical Temperature ticks: -80, -55 (Mars), 0 (Triple), 20, 50
    const tTicks = [
      { val: -80, label: '-80°' },
      { val: -55, label: '-55° (Chryse)' },
      { val: 0, label: '0°' },
      { val: 20, label: '20°' },
      { val: 60, label: '60°' }
    ];

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    tTicks.forEach(tick => {
      const x = this.tToX(tick.val);
      if (x >= this.padLeft && x <= this.padLeft + this.plotW) {
        ctx.beginPath();
        ctx.moveTo(x, this.padTop);
        ctx.lineTo(x, this.padTop + this.plotH);
        ctx.stroke();

        ctx.fillStyle = tick.val === -55 ? '#f97316' : (tick.val === 0 ? '#fde047' : '#64748b');
        ctx.fillText(tick.label, x, this.padTop + this.plotH + 6);
      }
    });

    // 4. Draw Phase Boundary Lines
    ctx.lineWidth = 2;

    // Sublimation Curve (Ice -> Gas)
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    for (let t = this.minT; t <= this.tripleT; t += 1) {
      const p = this.getSublimationP(t);
      const x = this.tToX(t);
      const y = this.pToY(p);
      if (t === this.minT) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Boiling Curve (Liquid -> Gas)
    ctx.strokeStyle = '#10b981';
    ctx.beginPath();
    ctx.moveTo(tripleX, tripleY);
    for (let t = this.tripleT; t <= this.maxT; t += 1) {
      const p = this.getBoilingP(t);
      if (p <= 200) {
        ctx.lineTo(this.tToX(t), this.pToY(p));
      }
    }
    ctx.stroke();

    // Melting Curve (Ice -> Liquid)
    ctx.strokeStyle = '#60a5fa';
    ctx.beginPath();
    ctx.moveTo(tripleX, tripleY);
    ctx.lineTo(meltX, topY);
    ctx.stroke();

    // Brine depression dashed line if enabled
    if (this.isBrine) {
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(this.tToX(-68), topY);
      ctx.lineTo(this.tToX(-68), this.pToY(0.15));
      ctx.lineTo(tripleX, tripleY);
      ctx.stroke();
      ctx.restore();
    }

    // 5. Phase Region Watermark Text
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.fillText('ของแข็ง (ICE Ih)', this.tToX(-60), this.pToY(20));

    ctx.fillStyle = 'rgba(16, 185, 129, 0.55)';
    ctx.fillText('ของเหลว (LIQUID)', this.tToX(22), this.pToY(25));

    ctx.fillStyle = 'rgba(249, 115, 22, 0.45)';
    ctx.fillText('ไอน้ำ / ก๊าซ (VAPOR)', this.tToX(30), this.pToY(0.12));

    // 6. Triple Point Star Landmark
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(tripleX, tripleY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('★ จุดร่วมสาม (0.01°C, 0.61 kPa)', tripleX + 7, tripleY - 6);

    // 7. Earth 1 atm Landmark
    const earthX = this.tToX(20);
    const earthY = this.pToY(101.3);
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(earthX, earthY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText('🌍 โลก (20°C, 1 atm)', earthX + 6, earthY + 2);

    // 8. Mars Chryse Landmark
    const marsX = this.tToX(-55);
    const marsY = this.pToY(0.63);
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(marsX, marsY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText('🪐 Chryse (-55°C, 0.63 kPa)', marsX + 6, marsY + 2);

    // 9. Interactive Active State Cursor with Crosshairs
    const curX = this.tToX(this.temp);
    const curY = this.pToY(this.pressure);

    ctx.save();
    ctx.setLineDash([2, 3]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(curX, this.padTop);
    ctx.lineTo(curX, this.padTop + this.plotH);
    ctx.moveTo(this.padLeft, curY);
    ctx.lineTo(this.padLeft + this.plotW, curY);
    ctx.stroke();
    ctx.restore();

    // Glowing target ring around current point
    const state = this.evaluateState();
    ctx.strokeStyle = state.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(curX, curY, 8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(curX, curY, 3, 0, Math.PI * 2);
    ctx.fill();

    // 10. Axis Labels
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('อุณหภูมิ Temperature (°C)', this.padLeft + this.plotW / 2, h - 8);

    ctx.save();
    ctx.translate(14, this.padTop + this.plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('ความดัน Pressure (kPa, log)', 0, 0);
    ctx.restore();
  }
}
