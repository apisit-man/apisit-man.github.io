/**
 * ==========================================================================
 * Ferrari Circuit Racing 3D - Mobile Edition
 * Broadcast HUD & Telemetry Controller
 * Compact Digital Cluster, F1 Shift Lights, Mobile Mini-Map Radar,
 * Dynamic Position Tracking, and Lap Timers.
 * ==========================================================================
 */

export class RacingHUD {
  constructor(track) {
    this.track = track;

    // DOM Elements
    this.speedEl = document.getElementById('hud-speed-val');
    this.gearEl = document.getElementById('hud-gear-val');
    this.rpmNeedleEl = document.getElementById('hud-rpm-needle');
    this.rpmProgressEl = document.getElementById('hud-rpm-progress-bar');
    this.shiftLightsEl = document.getElementById('hud-shift-lights');
    this.lapCounterEl = document.getElementById('hud-lap-counter');
    this.currentTimerEl = document.getElementById('hud-current-timer');
    this.bestTimerEl = document.getElementById('hud-best-timer');
    this.leaderboardEl = document.getElementById('hud-leaderboard-list');
    this.positionPillEl = document.getElementById('hud-pos-pill-val');
    this.offTrackWarningEl = document.getElementById('hud-offtrack-warning');
    this.wrongWayWarningEl = document.getElementById('hud-wrongway-warning');

    // Mini-map Canvas
    this.mapCanvas = document.getElementById('hud-minimap-canvas');
    this.mapCtx = this.mapCanvas ? this.mapCanvas.getContext('2d') : null;

    // Cache track 2D boundary for mini-map
    this.cachedMapPoints = [];
    this.initMiniMapBounds();

    // Toggle leaderboard drawer on mobile tap
    const lbBtn = document.getElementById('btn-toggle-leaderboard');
    const lbPanel = document.getElementById('hud-leaderboard-drawer');
    if (lbBtn && lbPanel) {
      lbBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        lbPanel.classList.toggle('active');
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#hud-leaderboard-drawer') && !e.target.closest('#btn-toggle-leaderboard')) {
          lbPanel.classList.remove('active');
        }
      });
    }
  }

  initMiniMapBounds() {
    if (!this.track || !this.track.samples) return;

    let minX = Infinity, maxX = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    this.track.samples.forEach(s => {
      if (s.pos.x < minX) minX = s.pos.x;
      if (s.pos.x > maxX) maxX = s.pos.x;
      if (s.pos.z < minZ) minZ = s.pos.z;
      if (s.pos.z > maxZ) maxZ = s.pos.z;
    });

    const padding = 35;
    const width = maxX - minX + padding * 2;
    const height = maxZ - minZ + padding * 2;

    this.mapBounds = { minX: minX - padding, minZ: minZ - padding, width, height };

    // Normalized points [0..1]
    this.cachedMapPoints = this.track.samples.map(s => ({
      nx: (s.pos.x - this.mapBounds.minX) / this.mapBounds.width,
      nz: (s.pos.z - this.mapBounds.minZ) / this.mapBounds.height
    }));
  }

  setTrack(track) {
    this.track = track;
    this.initMiniMapBounds();
  }

  update(playerPhysics, allCars, raceState) {
    this.updateGauges(playerPhysics);
    this.updateMiniMap(playerPhysics, allCars);
    this.updateLeaderboard(allCars, playerPhysics);
    this.updateTimers(playerPhysics, raceState);
    this.updateWarnings(playerPhysics);
  }

  updateGauges(physics) {
    if (this.speedEl) {
      this.speedEl.textContent = `${Math.max(0, Math.round(Math.abs(physics.speedKmh)))}`;
    }

    if (this.gearEl) {
      if (physics.speed < -0.5) {
        this.gearEl.textContent = 'R';
        this.gearEl.style.color = '#ef4444';
      } else if (Math.abs(physics.speed) < 0.5 && physics.currentGear === 1) {
        this.gearEl.textContent = 'N';
        this.gearEl.style.color = '#94a3b8';
      } else {
        this.gearEl.textContent = `${physics.currentGear}`;
        this.gearEl.style.color = '#38bdf8';
      }
    }

    // RPM Gauge Needle Rotation (-110 deg to +110 deg)
    const normRpm = Math.max(0, Math.min(1.0, (physics.rpm - 1000) / 8000));
    if (this.rpmNeedleEl) {
      const needleDeg = -110 + normRpm * 220;
      this.rpmNeedleEl.style.transform = `rotate(${needleDeg}deg)`;
    }

    // RPM Linear Bar (for mobile compact HUD)
    if (this.rpmProgressEl) {
      this.rpmProgressEl.style.width = `${Math.round(normRpm * 100)}%`;
      if (normRpm > 0.9) {
        this.rpmProgressEl.style.backgroundColor = '#ef4444';
      } else if (normRpm > 0.7) {
        this.rpmProgressEl.style.backgroundColor = '#fbbf24';
      } else {
        this.rpmProgressEl.style.backgroundColor = '#22c55e';
      }
    }

    // F1 LED Shift Light Bar (5 LEDs)
    if (this.shiftLightsEl) {
      const leds = this.shiftLightsEl.querySelectorAll('.shift-led');
      leds.forEach((led, idx) => {
        const threshold = 0.5 + idx * 0.1;
        if (normRpm >= threshold) {
          led.classList.add('active');
        } else {
          led.classList.remove('active');
        }
      });

      // Redline flash
      if (normRpm > 0.94) {
        this.shiftLightsEl.classList.add('redline-blink');
      } else {
        this.shiftLightsEl.classList.remove('redline-blink');
      }
    }
  }

  updateMiniMap(playerPhysics, allCars) {
    if (!this.mapCtx || !this.mapCanvas || !this.mapBounds) return;

    const ctx = this.mapCtx;
    const w = this.mapCanvas.width;
    const h = this.mapCanvas.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw Track Ribbon
    if (this.cachedMapPoints.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      this.cachedMapPoints.forEach((pt, i) => {
        const x = pt.nx * w;
        const y = pt.nz * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();

      // Track inner neon line
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Finish line marker
      const startPt = this.cachedMapPoints[0];
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(startPt.nx * w - 3, startPt.nz * h - 3, 6, 6);
    }

    // 2. Draw AI Cars (Small Colored Dots)
    allCars.forEach(item => {
      if (item === playerPhysics) return;
      const nx = (item.position.x - this.mapBounds.minX) / this.mapBounds.width;
      const nz = (item.position.z - this.mapBounds.minZ) / this.mapBounds.height;

      ctx.fillStyle = item.car.paintColor || '#ef4444';
      ctx.beginPath();
      ctx.arc(nx * w, nz * h, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // 3. Draw Player Car (Pulsing Large Gold / Cyan Dot with Heading Pointer)
    const pnx = (playerPhysics.position.x - this.mapBounds.minX) / this.mapBounds.width;
    const pnz = (playerPhysics.position.z - this.mapBounds.minZ) / this.mapBounds.height;
    const px = pnx * w;
    const py = pnz * h;

    ctx.save();
    ctx.translate(px, py);

    // Glowing Halo
    ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.beginPath();
    ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Player Marker
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Heading Pointer
    ctx.rotate(playerPhysics.yaw);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(3, -3.5);
    ctx.lineTo(-3, -3.5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  updateLeaderboard(allCars, playerPhysics) {
    if (!allCars || allCars.length === 0) return;

    // Calculate score for each racer: Laps completed + normalized track progression
    const sorted = [...allCars].map(physics => {
      const sample = this.track.getClosestSplineSample(physics.position);
      const u = sample ? sample.u : 0;
      const totalScore = physics.lapCount + u;
      return { physics, totalScore };
    }).sort((a, b) => b.totalScore - a.totalScore);

    // Find player rank
    const playerIdx = sorted.findIndex(item => item.physics.isPlayer);
    const playerRank = playerIdx >= 0 ? playerIdx + 1 : 1;

    // Update compact position pill on mobile HUD
    if (this.positionPillEl) {
      this.positionPillEl.textContent = `P${playerRank}`;
      if (playerRank === 1) {
        this.positionPillEl.style.color = '#fbbf24';
      } else if (playerRank <= 3) {
        this.positionPillEl.style.color = '#38bdf8';
      } else {
        this.positionPillEl.style.color = '#f8fafc';
      }
    }

    // Render full drawer list
    if (this.leaderboardEl) {
      let html = '';
      sorted.forEach((item, idx) => {
        const car = item.physics.car;
        const isPlayer = item.physics.isPlayer;
        const pos = idx + 1;
        const posClass = pos === 1 ? 'pos-p1' : (pos === 2 ? 'pos-p2' : (pos === 3 ? 'pos-p3' : ''));
        const playerHighlight = isPlayer ? 'leaderboard-row-player' : '';

        html += `
          <div class="leaderboard-row ${playerHighlight}">
            <span class="lb-pos ${posClass}">${pos}</span>
            <span class="lb-flag">${car.nationality || '🏁'}</span>
            <span class="lb-name">${car.driverName || 'Racer'}</span>
            <span class="lb-gap">${isPlayer ? 'YOU' : `${Math.round(item.physics.speedKmh)} km/h`}</span>
          </div>
        `;
      });
      this.leaderboardEl.innerHTML = html;
    }
  }

  updateTimers(playerPhysics, raceState) {
    if (this.lapCounterEl) {
      const currentLap = Math.min(raceState.totalLaps, playerPhysics.lapCount + 1);
      this.lapCounterEl.textContent = `LAP ${currentLap}/${raceState.totalLaps}`;
    }

    if (this.currentTimerEl && raceState.currentLapTime !== undefined) {
      this.currentTimerEl.textContent = this.formatTime(raceState.currentLapTime);
    }

    if (this.bestTimerEl && raceState.bestLapTime !== undefined) {
      this.bestTimerEl.textContent = raceState.bestLapTime > 0 ? this.formatTime(raceState.bestLapTime) : '--:--.--';
    }
  }

  updateWarnings(playerPhysics) {
    if (this.offTrackWarningEl) {
      if (playerPhysics.offTrack && Math.abs(playerPhysics.speedKmh) > 10) {
        this.offTrackWarningEl.style.display = 'flex';
      } else {
        this.offTrackWarningEl.style.display = 'none';
      }
    }
  }

  formatTime(seconds) {
    if (!seconds || seconds <= 0) return '00:00.00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    const mm = m < 10 ? `0${m}` : `${m}`;
    const ss = s < 10 ? `0${s}` : `${s}`;
    const mss = ms < 10 ? `0${ms}` : `${ms}`;
    return `${mm}:${ss}.${mss}`;
  }
}
