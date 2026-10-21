/**
 * physics.js - Roller Coaster Energy Tycoon Physics Engine
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 * 
 * Implements:
 * 1. Catmull-Rom Track Spline Arc-Length Parameterization
 * 2. Conservation of Mechanical Energy (Ep = mgh, Ek = 1/2 m v^2)
 * 3. Rolling Friction & Aerodynamic Drag (W_loss)
 * 4. Normal Force & Real-time G-Force (N / mg)
 * 5. Critical Velocity & Inversion Fall-off Detection (v_min = sqrt(g*R))
 */

export class CoasterPhysics {
  constructor(options = {}) {
    this.gravity = options.gravity ?? 9.8; // m/s^2 (Earth=9.8, Moon=1.62, Mars=3.71)
    this.cartMass = options.cartMass ?? 1200; // kg (3-car train with passengers)
    this.frictionCoeff = options.frictionCoeff ?? 0.00; // rolling resistance (0.00 in ideal mode)
    this.airDragCoeff = options.airDragCoeff ?? 0.00; // aerodynamic drag (0.00 in ideal mode)
    this.airDensity = 1.225; // kg/m^3
    this.frontalArea = 1.8; // m^2
    this.dragCoeffCd = 0.45; // sleek coaster car

    // Track arc-length sampled cache
    this.trackLength = 0;
    this.samples = []; // array of { s, x, y, h, angle, curvature, radius, curveSign }

    // Simulation dynamic state
    this.s = 0; // current position along track in meters
    this.v = 0; // velocity in m/s
    this.a = 0; // acceleration in m/s^2
    this.direction = 1; // +1 forward, -1 backward (rollback)
    this.isRunning = false;
    this.isDerailing = false;
    this.isRollback = false;
    this.isFinished = false;

    // Energy stats
    this.initialHeight = 0;
    this.initialEnergy = 0;
    this.currentEp = 0;
    this.currentEk = 0;
    this.accumulatedLoss = 0;
    this.gForce = 1.0;
    this.maxSpeed = 0;
    this.maxG = 1.0;
    this.minG = 1.0;
    this.airtimeSeconds = 0;
    this.inversionCount = 0;
  }

  setGravity(g) {
    this.gravity = Number(g) || 9.8;
  }

  setFrictionMode(isRealistic) {
    if (isRealistic) {
      this.frictionCoeff = 0.015;
      this.airDragCoeff = 0.5 * this.airDensity * this.frontalArea * this.dragCoeffCd;
    } else {
      this.frictionCoeff = 0.0;
      this.airDragCoeff = 0.0;
    }
  }

  /**
   * Builds an arc-length parameterized track from an array of 2D control points [{x, y}, ...].
   * Converts Canvas Y (downwards) to physical Height (meters from baseline).
   */
  buildTrack(controlPoints, baselineY = 600, scalePixelsPerMeter = 20) {
    if (!controlPoints || controlPoints.length < 2) {
      this.samples = [];
      this.trackLength = 0;
      return;
    }

    const n = controlPoints.length;
    const rawPoints = [];
    const stepT = 0.02; // fine interpolation step

    // Catmull-Rom spline sampling
    for (let i = 0; i < n - 1; i++) {
      const p0 = controlPoints[Math.max(0, i - 1)];
      const p1 = controlPoints[i];
      const p2 = controlPoints[i + 1];
      const p3 = controlPoints[Math.min(n - 1, i + 2)];

      for (let t = 0; t <= 1; t += stepT) {
        const t2 = t * t;
        const t3 = t2 * t;

        // Standard Catmull-Rom formula
        const x = 0.5 * (
          (2 * p1.x) +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
        );
        const y = 0.5 * (
          (2 * p1.y) +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
        );

        // First derivative (dx/dt, dy/dt)
        const dx = 0.5 * (
          (-p0.x + p2.x) +
          2 * (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t +
          3 * (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t2
        );
        const dy = 0.5 * (
          (-p0.y + p2.y) +
          2 * (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t +
          3 * (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t2
        );

        // Second derivative (d2x/dt2, d2y/dt2)
        const d2x = 0.5 * (
          2 * (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) +
          6 * (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t
        );
        const d2y = 0.5 * (
          2 * (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) +
          6 * (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t
        );

        // Curvature kappa = |x' y'' - y' x''| / (x'^2 + y'^2)^(3/2)
        const speedSq = dx * dx + dy * dy;
        const speed = Math.sqrt(speedSq) || 1e-6;
        const curvature = Math.abs(dx * d2y - dy * d2x) / Math.pow(speedSq, 1.5);
        // Signed curvature: positive if turning left/up (concave up), negative if concave down
        const signedCross = dx * d2y - dy * d2x;
        const curveSign = signedCross < 0 ? 1 : -1;

        // Angle in radians (in standard math coordinates: y is flipped)
        const angle = Math.atan2(-dy, dx);

        rawPoints.push({
          x,
          y,
          dx,
          dy,
          angle,
          curvature: curvature * scalePixelsPerMeter, // convert 1/px to 1/m
          curveSign
        });
      }
    }

    // Now build arc-length parameterization
    this.samples = [];
    let accumulatedDistance = 0;
    this.samples.push({
      s: 0,
      x: rawPoints[0].x,
      y: rawPoints[0].y,
      h: (baselineY - rawPoints[0].y) / scalePixelsPerMeter,
      angle: rawPoints[0].angle,
      curvature: rawPoints[0].curvature,
      radius: rawPoints[0].curvature > 1e-5 ? 1 / rawPoints[0].curvature : 9999,
      curveSign: rawPoints[0].curveSign
    });

    for (let i = 1; i < rawPoints.length; i++) {
      const pPrev = rawPoints[i - 1];
      const pCurr = rawPoints[i];
      const distPx = Math.hypot(pCurr.x - pPrev.x, pCurr.y - pPrev.y);
      const distM = distPx / scalePixelsPerMeter;
      accumulatedDistance += distM;

      const heightM = (baselineY - pCurr.y) / scalePixelsPerMeter;
      const radiusM = pCurr.curvature > 1e-4 ? Math.max(1.5, 1 / pCurr.curvature) : 9999;

      this.samples.push({
        s: accumulatedDistance,
        x: pCurr.x,
        y: pCurr.y,
        h: Math.max(0, heightM),
        angle: pCurr.angle,
        curvature: pCurr.curvature,
        radius: radiusM,
        curveSign: pCurr.curveSign
      });
    }

    this.trackLength = accumulatedDistance;
    this.resetSimulation();
  }

  /**
   * Resets coaster to starting position on track.
   */
  resetSimulation() {
    this.s = 0;
    this.v = 0.5; // slight starting push out of station (0.5 m/s)
    this.a = 0;
    this.direction = 1;
    this.isRunning = false;
    this.isDerailing = false;
    this.isRollback = false;
    this.isFinished = false;
    this.accumulatedLoss = 0;
    this.maxSpeed = 0;
    this.maxG = 1.0;
    this.minG = 1.0;
    this.airtimeSeconds = 0;
    this.inversionCount = 0;

    if (this.samples.length > 0) {
      this.initialHeight = this.samples[0].h;
      this.initialEnergy = this.cartMass * this.gravity * this.initialHeight;
      this.updateStateAtDistance(0);
    }
  }

  /**
   * Interpolate sample at arc length s meters.
   */
  getSampleAtDistance(distance) {
    if (this.samples.length === 0) return null;
    const clampedS = Math.max(0, Math.min(distance, this.trackLength));

    // Binary search for efficiency
    let low = 0;
    let high = this.samples.length - 1;

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (this.samples[mid].s < clampedS) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const idx = Math.max(0, Math.min(low, this.samples.length - 1));
    if (idx === 0) return this.samples[0];

    const s0 = this.samples[idx - 1];
    const s1 = this.samples[idx];
    const segmentLen = s1.s - s0.s;
    const alpha = segmentLen > 1e-6 ? (clampedS - s0.s) / segmentLen : 0;

    return {
      s: clampedS,
      x: s0.x + (s1.x - s0.x) * alpha,
      y: s0.y + (s1.y - s0.y) * alpha,
      h: s0.h + (s1.h - s0.h) * alpha,
      angle: s0.angle + (s1.angle - s0.angle) * alpha,
      curvature: s0.curvature + (s1.curvature - s0.curvature) * alpha,
      radius: s0.radius + (s1.radius - s0.radius) * alpha,
      curveSign: alpha > 0.5 ? s1.curveSign : s0.curveSign
    };
  }

  updateStateAtDistance(sDist) {
    const sample = this.getSampleAtDistance(sDist);
    if (!sample) return;

    // Potential energy Ep = m * g * h
    this.currentEp = this.cartMass * this.gravity * sample.h;

    // Kinetic energy Ek = 1/2 * m * v^2
    this.currentEk = 0.5 * this.cartMass * (this.v * this.v);

    // Centripetal acceleration a_c = v^2 / R
    const a_c = (this.v * this.v) / (sample.radius || 9999);

    // G-Force calculation:
    // Normal force per unit mass:
    // When upright on flat: G = 1.0
    // In a valley (curveSign > 0): G = cos(theta) + a_c / g
    // At hill crest (curveSign < 0): G = cos(theta) - a_c / g
    // In vertical loop: angle passes +- PI
    const cosAngle = Math.cos(sample.angle);
    const gCentripetal = (a_c / this.gravity) * sample.curveSign;
    this.gForce = cosAngle + gCentripetal;

    // Check stats
    const speedKmh = Math.abs(this.v) * 3.6;
    if (speedKmh > this.maxSpeed) this.maxSpeed = speedKmh;
    if (this.gForce > this.maxG) this.maxG = this.gForce;
    if (this.gForce < this.minG) this.minG = this.gForce;

    // Airtime (weightlessness) count
    if (this.gForce < 0.2 && this.isRunning) {
      this.airtimeSeconds += 0.016; // approx 1 frame
    }
  }

  /**
   * Main Physics Tick (dt in seconds)
   */
  update(dt) {
    if (!this.isRunning || this.isDerailing || this.isFinished || this.samples.length < 2) {
      return;
    }

    // Clamp dt to avoid physics explosion
    const clampedDt = Math.min(dt, 0.04);
    const sample = this.getSampleAtDistance(this.s);
    if (!sample) return;

    // 1. Gravity acceleration along track tangent: a_tangent = -g * sin(theta)
    // When moving forward and track slopes downward (sin(theta) < 0), cart accelerates forward (+a)
    const sinAngle = Math.sin(sample.angle);
    let a_gravity = -this.gravity * sinAngle;

    // 2. Friction & Air Drag losses
    let frictionForce = 0;
    if (this.frictionCoeff > 0 || this.airDragCoeff > 0) {
      const normalForce = Math.abs(this.cartMass * this.gravity * Math.cos(sample.angle));
      const rollingResistance = this.frictionCoeff * normalForce;
      const aerodynamicDrag = this.airDragCoeff * (this.v * this.v);
      frictionForce = rollingResistance + aerodynamicDrag;
      this.accumulatedLoss += (frictionForce * Math.abs(this.v) * clampedDt);
    }

    const a_friction = (frictionForce / this.cartMass) * Math.sign(this.v);

    // Net acceleration
    this.a = a_gravity - a_friction;

    // Integrate velocity and position
    this.v += this.a * clampedDt;
    this.s += this.v * clampedDt;

    // Check for roll-back (insufficient energy to crest hill)
    if (this.v <= 0 && this.s > 5) {
      // Cart came to a halt on an uphill section
      this.isRollback = true;
      // In realistic coaster, anti-rollback ratchets catch it or it rolls backward
      this.v = 0;
      this.isRunning = false;
    }

    // Check for loop derailment (Centripetal force insufficient at upside-down point)
    // If angle is inverted (abs(angle) > 2.2 rad or ~125 deg) and G-force < -0.1g (rider falls off track)
    if (Math.abs(sample.angle) > 2.2 && this.gForce < -0.2) {
      this.isDerailing = true;
      this.isRunning = false;
    }

    // Check for track completion
    if (this.s >= this.trackLength) {
      this.s = this.trackLength;
      this.v = 0;
      this.isRunning = false;
      this.isFinished = true;
    }

    this.updateStateAtDistance(this.s);
  }

  /**
   * Computes Tycoon Scores based on real roller coaster engineering metrics
   */
  getTycoonRatings() {
    // Excitement Score (0-100): Rewards high speed, airtime, and safe loops
    let excitement = 30;
    excitement += Math.min(35, (this.maxSpeed / 100) * 35); // up to 35 pts from speed
    excitement += Math.min(25, this.airtimeSeconds * 12); // up to 25 pts from airtime
    if (this.maxG >= 2.5 && this.maxG <= 4.0) excitement += 10; // optimal intense sweet spot

    // Intensity Score (0-100): High G-forces and rapid drops
    let intensity = (this.maxG / 5.0) * 60 + (this.maxSpeed / 120) * 40;

    // Nausea / Danger Score (0-100)
    let nausea = 10;
    if (this.maxG > 4.2) nausea += (this.maxG - 4.2) * 30;
    if (this.minG < -1.0) nausea += Math.abs(this.minG + 1.0) * 40;

    // Safety Verdict
    let safetyStatus = 'EXCELLENT';
    let safetyColor = 'emerald';
    let message = 'รถไฟเหาะวิ่งอย่างราบรื่นและปลอดภัยตามกฎการอนุรักษ์พลังงานกล!';

    if (this.isDerailing) {
      safetyStatus = 'DERAILED';
      safetyColor = 'rose';
      message = '⚠️ อันตราย! ความเร็วที่จุดยอด Loop ต่ำกว่าความเร็ววิกฤต (v < √(g·R)) รถร่วงหลุดจากราง!';
    } else if (this.isRollback) {
      safetyStatus = 'ROLLBACK';
      safetyColor = 'amber';
      message = '⚡ พลังงานจลน์ไม่เพียงพอข้ามยอดเนิน (Ek < Ep) รถไหลถอยหลังกลับ!';
    } else if (this.maxG > 4.5) {
      safetyStatus = 'DANGEROUS G-FORCE';
      safetyColor = 'rose';
      message = '⚠️ แรง G สูงเกิน 4.5g ผู้โดยสารเสี่ยงหมดสติ (Blackout Risk)! ควรกว้างรัศมีหุบเขาเพิ่มขึ้น';
    } else if (this.minG < -1.5) {
      safetyStatus = 'EXTREME NEGATIVE G';
      safetyColor = 'rose';
      message = '⚠️ แรง G ติดลบเกิน -1.5g ผู้โดยสารเสี่ยงเส้นเลือดในตาแตก (Redout Risk)!';
    }

    return {
      excitement: Math.min(100, Math.round(excitement)),
      intensity: Math.min(100, Math.round(intensity)),
      nausea: Math.min(100, Math.round(nausea)),
      safetyStatus,
      safetyColor,
      message,
      maxSpeedKmh: Math.round(this.maxSpeed),
      maxG: this.maxG.toFixed(2),
      minG: this.minG.toFixed(2),
      airtimeSec: this.airtimeSeconds.toFixed(1)
    };
  }
}
