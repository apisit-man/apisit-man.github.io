/**
 * track-renderer.js - High-DPI 2D Canvas Renderer for Roller Coaster Energy Tycoon
 * Developed by Dr. Apisit Tongchai (Independent Educator & Researcher)
 */

export class TrackRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;
    this.width = canvas.width;
    this.height = canvas.height;

    // Viewport transform (Pan & Zoom)
    this.scale = 1.0;
    this.offsetX = 40;
    this.offsetY = 0;
    this.baselineY = 520;
    this.pixelsPerMeter = 14;

    // Visual options
    this.showVectors = true;
    this.showEnergyOverlay = true;
    this.showGrid = true;
    this.selectedNodeIndex = -1;

    this.resize();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.dpr = window.devicePixelRatio || 1;

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);

    // Keep baseline near bottom of screen
    this.baselineY = Math.max(380, this.height - 80);
  }

  /**
   * Main Render Loop
   */
  render(physics, controlPoints, isEditMode = true) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Sky & Scenic Background
    this.drawBackground();

    // 2. Draw Height Grid & Ground
    if (this.showGrid) {
      this.drawHeightGrid();
    }
    this.drawGround();

    // 3. Draw Track Supports (Pylons & Lattice Trusses)
    if (physics.samples && physics.samples.length > 1) {
      this.drawTrackSupports(physics.samples);
      // 4. Draw Modern Tubular Steel Rails & Ties
      this.drawRailsAndTies(physics.samples);
    }

    // 5. Draw Control Nodes (if in edit mode)
    if (isEditMode && controlPoints) {
      this.drawControlNodes(controlPoints);
    }

    // 6. Draw Coaster Train & Passengers
    if (physics.samples && physics.samples.length > 0) {
      this.drawCoasterTrain(physics);
    }

    // 7. Draw Canvas HUD Overlays (Energy Graph, Speedometer, G-meter)
    if (this.showEnergyOverlay) {
      this.drawEnergyGraph(physics);
    }
  }

  drawBackground() {
    const ctx = this.ctx;
    const skyGradient = ctx.createLinearGradient(0, 0, 0, this.baselineY);
    skyGradient.addColorStop(0, '#0f172a'); // slate-900
    skyGradient.addColorStop(0.5, '#1e293b'); // slate-800
    skyGradient.addColorStop(1, '#334155'); // slate-700

    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, this.width, this.baselineY);

    // Draw distant mountain silhouettes
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.beginPath();
    ctx.moveTo(0, this.baselineY);
    ctx.lineTo(0, this.baselineY - 140);
    ctx.lineTo(160, this.baselineY - 220);
    ctx.lineTo(340, this.baselineY - 150);
    ctx.lineTo(520, this.baselineY - 260);
    ctx.lineTo(750, this.baselineY - 170);
    ctx.lineTo(950, this.baselineY - 240);
    ctx.lineTo(this.width, this.baselineY - 130);
    ctx.lineTo(this.width, this.baselineY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawGround() {
    const ctx = this.ctx;
    // Ground gradient
    const groundGrad = ctx.createLinearGradient(0, this.baselineY, 0, this.height);
    groundGrad.addColorStop(0, '#15803d'); // green-700
    groundGrad.addColorStop(0.2, '#166534'); // green-800
    groundGrad.addColorStop(1, '#052e16'); // green-950

    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, this.baselineY, this.width, this.height - this.baselineY);

    // Ground top border highlight
    ctx.strokeStyle = '#4ade80'; // green-400
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, this.baselineY);
    ctx.lineTo(this.width, this.baselineY);
    ctx.stroke();
  }

  drawHeightGrid() {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.lineWidth = 1;

    // Draw horizontal height lines every 10 meters
    for (let h = 0; h <= 60; h += 10) {
      const y = this.baselineY - (h * this.pixelsPerMeter);
      if (y < 20) break;

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();

      // Label on the left
      ctx.fillText(`${h} m`, 8, y - 3);
    }
    ctx.restore();
  }

  /**
   * Draws structural lattice steel pylons anchoring the track to the ground
   */
  drawTrackSupports(samples) {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)'; // slate-400
    ctx.lineWidth = 3;

    // Place a support pillar every ~60 pixels horizontally
    const spacingPx = 65;
    const count = Math.floor(this.width / spacingPx);

    for (let i = 1; i < count; i++) {
      const targetX = i * spacingPx;
      // Find sample closest to targetX
      const sample = samples.find(s => Math.abs(s.x - targetX) < 12);
      if (sample && sample.y < this.baselineY - 15) {
        // Main vertical pole
        ctx.beginPath();
        ctx.moveTo(sample.x, sample.y + 12);
        ctx.lineTo(sample.x, this.baselineY);
        ctx.stroke();

        // Concrete footer at ground
        ctx.fillStyle = '#64748b';
        ctx.fillRect(sample.x - 7, this.baselineY - 4, 14, 6);

        // Diagonal truss cross-bracing if tall
        const pillarHeight = this.baselineY - sample.y;
        if (pillarHeight > 100) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
          ctx.lineWidth = 1.5;
          const numBays = Math.floor(pillarHeight / 50);
          for (let b = 0; b < numBays; b++) {
            const yTop = sample.y + 12 + (b * 50);
            const yBot = yTop + 50;
            ctx.beginPath();
            ctx.moveTo(sample.x - 12, yTop);
            ctx.lineTo(sample.x + 12, yBot);
            ctx.moveTo(sample.x + 12, yTop);
            ctx.lineTo(sample.x - 12, yBot);
            ctx.stroke();
          }
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
          ctx.lineWidth = 3;
        }
      }
    }
    ctx.restore();
  }

  /**
   * Draws realistic dual steel tubular coaster rails and cross ties
   */
  drawRailsAndTies(samples) {
    const ctx = this.ctx;
    const n = samples.length;
    if (n < 2) return;

    const railOffset = 6; // distance from center line to each rail

    // 1. Draw Central Backbone Spine Tube (thick dark steel)
    ctx.save();
    ctx.strokeStyle = '#1e293b'; // dark backbone
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(samples[0].x, samples[0].y + 6);
    for (let i = 1; i < n; i++) {
      ctx.lineTo(samples[i].x, samples[i].y + 6);
    }
    ctx.stroke();
    ctx.restore();

    // 2. Draw Cross-Ties (หมอนรองราง)
    ctx.save();
    ctx.strokeStyle = '#cbd5e1'; // light steel ties
    ctx.lineWidth = 2.5;
    // Step every few samples
    const tieStep = 4;
    for (let i = 0; i < n; i += tieStep) {
      const s = samples[i];
      // Normal vector
      const nx = -Math.sin(s.angle);
      const ny = -Math.cos(s.angle);

      ctx.beginPath();
      ctx.moveTo(s.x - nx * (railOffset + 2), s.y - ny * (railOffset + 2));
      ctx.lineTo(s.x + nx * (railOffset + 2), s.y + ny * (railOffset + 2));
      ctx.stroke();
    }
    ctx.restore();

    // 3. Draw Left/Upper Tubular Rail (Bright Cyan/Teal)
    ctx.save();
    ctx.strokeStyle = '#06b6d4'; // cyan-500
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const s = samples[i];
      const nx = -Math.sin(s.angle);
      const ny = -Math.cos(s.angle);
      const rx = s.x - nx * railOffset;
      const ry = s.y - ny * railOffset;
      if (i === 0) ctx.moveTo(rx, ry);
      else ctx.lineTo(rx, ry);
    }
    ctx.stroke();

    // 4. Draw Right/Lower Tubular Rail (Electric Purple/Rose accent)
    ctx.strokeStyle = '#f43f5e'; // rose-500
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const s = samples[i];
      const nx = -Math.sin(s.angle);
      const ny = -Math.cos(s.angle);
      const rx = s.x + nx * railOffset;
      const ry = s.y + ny * railOffset;
      if (i === 0) ctx.moveTo(rx, ry);
      else ctx.lineTo(rx, ry);
    }
    ctx.stroke();
    ctx.restore();
  }

  /**
   * Draws interactive control nodes for dragging/editing the track
   */
  drawControlNodes(points) {
    const ctx = this.ctx;
    ctx.save();

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const isSelected = (i === this.selectedNodeIndex);
      const heightM = Math.max(0, (this.baselineY - p.y) / this.pixelsPerMeter).toFixed(1);

      // Node shadow & base circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, isSelected ? 12 : 9, 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? '#ec4899' : '#38bdf8'; // pink or cyan
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Pulsing outer ring if selected
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.45)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Height Badge above node
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(p.x - 22, p.y - 28, 44, 18, 4);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 9px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${heightM}m`, p.x, p.y - 16);
    }
    ctx.restore();
  }

  /**
   * Draws the 3-car coaster train, wheels, and passengers with reaction emojis
   */
  drawCoasterTrain(physics) {
    const ctx = this.ctx;
    const carSpacingM = 2.4; // distance between cars in meters
    const numCars = 3;

    // Passenger reaction emoji selection based on physics state
    let emoji = '😃';
    const speedKmh = Math.abs(physics.v) * 3.6;
    const g = physics.gForce;

    if (physics.isDerailing) {
      emoji = '💀';
    } else if (physics.isRollback) {
      emoji = '😱';
    } else if (g < 0.1) {
      emoji = '🤩'; // Airtime excitement
    } else if (g > 4.2) {
      emoji = '😵'; // Blackout danger
    } else if (speedKmh > 85) {
      emoji = '😲';
    } else if (speedKmh > 40) {
      emoji = '😄';
    }

    for (let c = numCars - 1; c >= 0; c--) {
      const carDist = physics.s - (c * carSpacingM * physics.direction);
      const sample = physics.getSampleAtDistance(carDist);
      if (!sample) continue;

      ctx.save();
      ctx.translate(sample.x, sample.y);
      // Rotate car along track tangent
      ctx.rotate(-sample.angle);

      // Invert car drawing if moving backward
      if (physics.direction < 0) {
        ctx.scale(-1, 1);
      }

      // Car Body Dimensions
      const carLength = 26;
      const carHeight = 14;

      // Draw Wheels (Top and Under-friction wheels)
      ctx.fillStyle = '#334155'; // wheel dark slate
      // Front & Rear top wheels
      ctx.beginPath();
      ctx.arc(-8, 3, 4, 0, Math.PI * 2);
      ctx.arc(8, 3, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Car Body
      const carGrad = ctx.createLinearGradient(-carLength / 2, -carHeight, carLength / 2, 0);
      if (c === 0) {
        // Lead Engine Car (Gold/Orange)
        carGrad.addColorStop(0, '#f59e0b');
        carGrad.addColorStop(1, '#ea580c');
      } else {
        // Trailing Passenger Cars (Cyan/Teal)
        carGrad.addColorStop(0, '#06b6d4');
        carGrad.addColorStop(1, '#0284c7');
      }

      ctx.fillStyle = carGrad;
      ctx.beginPath();
      ctx.roundRect(-carLength / 2, -carHeight, carLength, carHeight, [4, 8, 2, 2]);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Front bumper / headlight on lead car
      if (c === 0) {
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(carLength / 2 - 2, -carHeight / 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw 2 Passengers per car
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, -5, -carHeight - 4);
      ctx.fillText(emoji, 5, -carHeight - 4);

      // Draw Coupler to next car
      if (c < numCars - 1) {
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-carLength / 2, -4);
        ctx.lineTo(-carLength / 2 - 6, -4);
        ctx.stroke();
      }

      // Draw Vectors on the Lead Car
      if (c === 0 && this.showVectors && physics.isRunning) {
        this.drawPhysicsVectors(ctx, physics, sample);
      }

      ctx.restore();
    }
  }

  /**
   * Draws Velocity and Normal Force Vectors emanating from the lead coaster car
   */
  drawPhysicsVectors(ctx, physics, sample) {
    const vScale = 0.8;
    const vLen = physics.v * vScale;

    // 1. Velocity Vector (Cyan Arrow along car direction)
    ctx.save();
    ctx.strokeStyle = '#22d3ee'; // cyan-400
    ctx.fillStyle = '#22d3ee';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(vLen, -8);
    ctx.stroke();

    // Arrowhead
    if (Math.abs(vLen) > 4) {
      const dir = Math.sign(vLen);
      ctx.beginPath();
      ctx.moveTo(vLen, -8);
      ctx.lineTo(vLen - 5 * dir, -12);
      ctx.lineTo(vLen - 5 * dir, -4);
      ctx.closePath();
      ctx.fill();
    }

    // 2. Normal / Centripetal Vector (Gold Arrow pointing perpendicular to track)
    const gLen = -(physics.gForce * 12);
    ctx.strokeStyle = '#fbbf24'; // amber-400
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(0, -8 + gLen);
    ctx.stroke();

    if (Math.abs(gLen) > 4) {
      const gDir = Math.sign(gLen);
      ctx.beginPath();
      ctx.moveTo(0, -8 + gLen);
      ctx.lineTo(-4, -8 + gLen - 5 * gDir);
      ctx.lineTo(4, -8 + gLen - 5 * gDir);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  /**
   * Draws Live Stacked Energy Bar on Canvas HUD (Ep, Ek, Loss)
   */
  drawEnergyGraph(physics) {
    const ctx = this.ctx;
    const barX = 20;
    const barY = 20;
    const barW = 200;
    const barH = 14;

    const totalE = physics.initialEnergy || (physics.currentEp + physics.currentEk) || 1;
    const epFraction = Math.max(0, Math.min(1, physics.currentEp / totalE));
    const ekFraction = Math.max(0, Math.min(1, physics.currentEk / totalE));
    const lossFraction = Math.max(0, Math.min(1, physics.accumulatedLoss / totalE));

    ctx.save();
    // Glass HUD container background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.beginPath();
    ctx.roundRect(barX - 8, barY - 10, barW + 16, 68, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Title
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px "Plus Jakarta Sans", Prompt, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('⚡ พลังงานกลรวม (Total Energy Conservation)', barX, barY + 4);

    // Stacked Energy Bar
    const epW = barW * epFraction;
    const ekW = barW * ekFraction;
    const lossW = barW * lossFraction;

    // Bar background
    ctx.fillStyle = 'rgba(51, 65, 85, 0.6)';
    ctx.beginPath();
    ctx.roundRect(barX, barY + 12, barW, barH, 4);
    ctx.fill();

    // Ep Segment (Emerald Green)
    if (epW > 0) {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.roundRect(barX, barY + 12, epW, barH, [4, 0, 0, 4]);
      ctx.fill();
    }

    // Ek Segment (Bright Blue)
    if (ekW > 0) {
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.roundRect(barX + epW, barY + 12, Math.min(barW - epW, ekW), barH, 0);
      ctx.fill();
    }

    // Loss Segment (Orange/Red)
    if (lossW > 0 && barX + epW + ekW < barX + barW) {
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.roundRect(barX + epW + ekW, barY + 12, Math.min(barW - epW - ekW, lossW), barH, [0, 4, 4, 0]);
      ctx.fill();
    }

    // Legend
    ctx.font = '9px Prompt, sans-serif';
    // Ep legend
    ctx.fillStyle = '#34d399';
    ctx.fillRect(barX, barY + 34, 8, 8);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`Ep: ${(physics.currentEp / 1000).toFixed(1)} kJ`, barX + 12, barY + 41);

    // Ek legend
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(barX + 85, barY + 34, 8, 8);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`Ek: ${(physics.currentEk / 1000).toFixed(1)} kJ`, barX + 97, barY + 41);

    ctx.restore();
  }
}
