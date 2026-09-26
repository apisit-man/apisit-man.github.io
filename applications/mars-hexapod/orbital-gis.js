/**
 * Orbital Reconnaissance GIS (MRO / HiRISE) & Topographic Transect Engine
 * Inspired by GeoLibre / OpenGeos Cloud-Native Planetary GIS Architecture
 * Developed by Dr. Apisit Tongchai - Mars Hexapod Engineering
 * 
 * Provides:
 * 1. Multi-Layer Orbital GIS Raster Visualization (True-Color RGB, DEM Hypsometric Tint, Slope Hazard, Paleochannels, CRISM)
 * 2. 2D Topographic Elevation Profile & Cross-Section Transect Graph
 * 3. Mars Areographic Coordinate Reference System (Chryse Planitia Datum IAU 2000)
 * 4. RFC 7946 Standard GeoJSON Spatial Data Export for GeoLibre, QGIS, and Google Earth
 */
export class OrbitalGIS {
  constructor(terrain, hexapod) {
    this.terrain = terrain;
    this.hexapod = hexapod;

    // Chryse Planitia landing datum (Viking 1 landing basin region)
    this.datumLat = 22.45; // Degrees North
    this.datumLon = -49.97; // Degrees West (or 310.03° E)
    this.metersToDegLat = 0.0000169; // ~59.16 km/deg on Mars
    this.metersToDegLon = 0.0000183; // ~54.67 km/deg at 22.45° N

    // Bounds in local coordinates (meters)
    this.size = 260; // 260m x 260m exploration theater
    this.halfSize = 130;

    // Active layer: 'dem' | 'ortho' | 'slope' | 'paleochannel' | 'crism'
    this.activeLayer = 'dem';

    // Active transect: 'crater' | 'lander-beta' | 'rover-target' | 'custom'
    this.activeTransect = 'crater';
    this.customPointA = null;
    this.customPointB = null;

    // Breadcrumb trail history for trajectory LineString
    this.roverPath = [];
    this.lastRecordedPos = null;

    // DOM Elements
    this.modal = document.getElementById('orbital-gis-modal');
    this.canvas = document.getElementById('orbital-gis-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

    this.transectCanvas = document.getElementById('gis-transect-canvas');
    this.transectCtx = this.transectCanvas ? this.transectCanvas.getContext('2d') : null;

    // Offscreen cached raster canvases (260x260 pixels, 1m/px resolution)
    this.rasterCaches = {};
    this.rasterRes = 260;

    this.initUI();
    this.generateRasterCaches();
    this.resizeCanvases();
  }

  /**
   * Converts local 3D world coordinates (x, z) to authentic Mars Areographic coordinates (Lat, Lon)
   */
  localToMarsCoords(x, z) {
    const lat = this.datumLat - z * this.metersToDegLat;
    const lon = this.datumLon + x * this.metersToDegLon;
    return {
      lat: lat.toFixed(5),
      lon: lon.toFixed(5),
      latStr: `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}`,
      lonStr: `${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? 'E' : 'W'}`
    };
  }

  /**
   * Converts local (x, z) into GIS canvas screen coordinates (px, py)
   */
  worldToCanvas(x, z, canvasWidth, canvasHeight) {
    const u = (x + this.halfSize) / this.size;
    const v = (z + this.halfSize) / this.size;
    return {
      x: u * canvasWidth,
      y: v * canvasHeight
    };
  }

  /**
   * Converts GIS canvas screen coordinates (px, py) into local (x, z)
   */
  canvasToWorld(px, py, canvasWidth, canvasHeight) {
    const u = px / canvasWidth;
    const v = py / canvasHeight;
    return {
      x: (u * this.size) - this.halfSize,
      z: (v * this.size) - this.halfSize
    };
  }

  /**
   * Pre-renders high-performance offscreen rasters for all 5 scientific GIS layers
   */
  generateRasterCaches() {
    const layers = ['ortho', 'dem', 'slope', 'paleochannel', 'crism'];
    const res = this.rasterRes;

    // Sun directional vector for hillshade bump calculation
    const sunDir = { x: -0.55, y: 0.65, z: -0.52 };
    const sunLen = Math.hypot(sunDir.x, sunDir.y, sunDir.z);
    sunDir.x /= sunLen; sunDir.y /= sunLen; sunDir.z /= sunLen;

    layers.forEach((layer) => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = res;
      offCanvas.height = res;
      const offCtx = offCanvas.getContext('2d');
      const imgData = offCtx.createImageData(res, res);
      const data = imgData.data;

      for (let py = 0; py < res; py++) {
        for (let px = 0; px < res; px++) {
          const wx = -this.halfSize + (px / (res - 1)) * this.size;
          const wz = -this.halfSize + (py / (res - 1)) * this.size;
          const y = this.terrain.getHeight(wx, wz);

          // Central differences surface normal
          const delta = 0.5;
          const hL = this.terrain.getHeight(wx - delta, wz);
          const hR = this.terrain.getHeight(wx + delta, wz);
          const hD = this.terrain.getHeight(wx, wz - delta);
          const hU = this.terrain.getHeight(wx, wz + delta);

          const nx = (hL - hR) / (2 * delta);
          const ny = 1.0;
          const nz = (hD - hU) / (2 * delta);
          const nLen = Math.hypot(nx, ny, nz);
          const normX = nx / nLen;
          const normY = ny / nLen;
          const normZ = nz / nLen;

          // Slope in degrees
          const slopeDeg = Math.acos(Math.max(0, Math.min(1, normY))) * (180 / Math.PI);

          // Hillshade factor
          const hillshade = Math.max(0.2, Math.min(1.0, normX * sunDir.x + normY * sunDir.y + normZ * sunDir.z));

          const idx = (py * res + px) * 4;
          let r = 0, g = 0, b = 0;

          if (layer === 'dem') {
            // Hypsometric Tint: -2.5m to +4.5m
            const normElev = Math.max(0, Math.min(1, (y + 2.5) / 7.0));
            if (normElev < 0.25) {
              // Deep Chryse impact depression & basin floor: Indigo -> Cyan
              const t = normElev / 0.25;
              r = 30 + t * 20; g = 58 + t * 130; b = 138 + t * 74;
            } else if (normElev < 0.55) {
              // Plain & sedimentary apron: Cyan -> Teal -> Lime
              const t = (normElev - 0.25) / 0.3;
              r = 50 + t * 80; g = 188 - t * 20; b = 212 - t * 140;
            } else if (normElev < 0.8) {
              // Rolling dune field & gentle ridges: Yellow -> Terracotta Orange
              const t = (normElev - 0.55) / 0.25;
              r = 234 + t * 15; g = 179 - t * 90; b = 8 + t * 4;
            } else {
              // High escarpment crest & crater rim: Deep Orange -> Crimson -> White
              const t = (normElev - 0.8) / 0.2;
              r = 239 + t * 16; g = 68 + t * 170; b = 68 + t * 170;
            }

            // Blend with hillshade
            r = Math.round(r * (0.55 + hillshade * 0.45));
            g = Math.round(g * (0.55 + hillshade * 0.45));
            b = Math.round(b * (0.55 + hillshade * 0.45));
          } else if (layer === 'ortho') {
            // True-Color HiRISE Satellite Orthomosaic (Iron oxide regolith)
            const duneNoise = (Math.sin(wx * 0.4) * Math.cos(wz * 0.4)) * 12;
            const baseR = 212 + duneNoise;
            const baseG = 101 + duneNoise * 0.5;
            const baseB = 59 + duneNoise * 0.3;

            r = Math.round(baseR * (0.45 + hillshade * 0.55));
            g = Math.round(baseG * (0.45 + hillshade * 0.55));
            b = Math.round(baseB * (0.45 + hillshade * 0.55));
          } else if (layer === 'slope') {
            // Slope Hazard Gradient Heatmap
            if (slopeDeg < 10) {
              // Safe (<10°): Forest Green
              r = 34; g = 197; b = 94;
            } else if (slopeDeg < 18) {
              // Warning (10°-18°): Amber / Yellow (Tripod slip risk zone)
              const t = (slopeDeg - 10) / 8;
              r = 234; g = 179 - t * 40; b = 8;
            } else {
              // Rollover Hazard (>18°): Severe Crimson Red
              const t = Math.min(1, (slopeDeg - 18) / 12);
              r = 239; g = Math.round(68 - t * 40); b = Math.round(68 - t * 40);
            }
            r = Math.round(r * (0.6 + hillshade * 0.4));
            g = Math.round(g * (0.6 + hillshade * 0.4));
            b = Math.round(b * (0.6 + hillshade * 0.4));
          } else if (layer === 'paleochannel') {
            // Hydrological Flow Accumulation & Ancient Outflow Sinks
            // Distances to ancient outflow deposition sites (Alpha sulfates & Beta clays)
            const dAlpha = Math.hypot(wx - (-28), wz - 32);
            const dBeta = Math.hypot(wx - 38, wz - 36);
            const inFlow = (dAlpha < 22 || dBeta < 24 || (wz > 15 && wz < 55 && Math.abs(wx - 5) < 38));

            if (inFlow) {
              // Flow Streamlines & Lacustrine Basin: Bright Cyan
              const stream = Math.sin(wx * 0.6 + wz * 0.4) > 0.3 ? 240 : 180;
              r = 14; g = 165; b = stream;
            } else {
              // Dry Highlands: Muted Terracotta Dark Basalt
              r = Math.round(140 * hillshade);
              g = Math.round(65 * hillshade);
              b = Math.round(40 * hillshade);
            }
          } else if (layer === 'crism') {
            // CRISM Orbital Multispectral Mineral Hydration Index (BD1900)
            const distAlpha = Math.hypot(wx - (-28), wz - 32);
            const distBeta = Math.hypot(wx - 38, wz - 36);
            const distGamma = Math.hypot(wx - (-42), wz - (-45));
            const distDelta = Math.hypot(wx - 36, wz - (-55));

            if (distBeta < 16) {
              // Smectite Phyllosilicate Clay: Intense Magenta / Purple
              r = 168; g = 85; b = 247;
            } else if (distAlpha < 16) {
              // Hydrated Sulfates (Jarosite/Gypsum): Intense Cyan / Sky Blue
              r = 56; g = 189; b = 248;
            } else if (distGamma < 16) {
              // Unaltered Olivine Basalt: Emerald Green
              r = 34; g = 197; b = 94;
            } else if (distDelta < 16) {
              // Paleomagnetic Bedrock: Golden Amber
              r = 245; g = 158; b = 11;
            } else {
              // Neutral background
              r = Math.round(75 * hillshade);
              g = Math.round(45 * hillshade);
              b = Math.round(35 * hillshade);
            }
          }

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }

      offCtx.putImageData(imgData, 0, 0);
      this.rasterCaches[layer] = offCanvas;
    });
  }

  initUI() {
    // 1. Layer switcher buttons
    const layerBtns = document.querySelectorAll('.gis-layer-btn');
    layerBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const layer = e.currentTarget.getAttribute('data-layer');
        this.setLayer(layer);
      });
    });

    // 2. Transect preset buttons
    const transectBtns = document.querySelectorAll('.gis-transect-preset-btn');
    transectBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-transect');
        this.setTransect(mode);
      });
    });

    // 3. Export GeoJSON button
    const btnExportGeoJSON = document.getElementById('btn-export-geojson');
    if (btnExportGeoJSON) {
      btnExportGeoJSON.addEventListener('click', () => this.exportMissionGeoJSON());
    }

    // 4. Modal Open/Close handlers
    const btnOpenGis = document.getElementById('btn-toggle-gis');
    if (btnOpenGis) {
      btnOpenGis.addEventListener('click', () => this.toggleModal());
    }

    const btnNavGis = document.getElementById('btn-orbital-gis');
    if (btnNavGis) {
      btnNavGis.addEventListener('click', () => this.toggleModal());
    }

    // 5. Canvas click interaction (Pick custom transect)
    if (this.canvas) {
      this.canvas.addEventListener('click', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const px = (e.clientX - rect.left);
        const py = (e.clientY - rect.top);
        const world = this.canvasToWorld(px, py, rect.width, rect.height);

        if (!this.customPointA || (this.customPointA && this.customPointB)) {
          this.customPointA = world;
          this.customPointB = null;
        } else {
          this.customPointB = world;
          this.activeTransect = 'custom';
          this.updateTransectButtons();
        }
        this.renderMap();
        this.renderTransectGraph();
      });

      // Mousemove tooltip inspector
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const world = this.canvasToWorld(px, py, rect.width, rect.height);
        const elev = this.terrain.getHeight(world.x, world.z);
        const norm = this.terrain.getNormal(world.x, world.z);
        const slope = Math.acos(Math.max(0, Math.min(1, norm.y))) * (180 / Math.PI);
        const coords = this.localToMarsCoords(world.x, world.z);

        const readoutEl = document.getElementById('gis-cursor-readout');
        if (readoutEl) {
          readoutEl.innerHTML = `
            <strong>พิกัดดาวเคราะห์:</strong> ${coords.latStr}, ${coords.lonStr} &nbsp;|&nbsp; 
            <strong>พิกัดท้องถิ่น:</strong> (${world.x.toFixed(1)}m, ${world.z.toFixed(1)}m) &nbsp;|&nbsp; 
            <strong>ระดับสูง:</strong> ${elev >= 0 ? '+' : ''}${elev.toFixed(2)}m &nbsp;|&nbsp; 
            <strong>ความลาดชัน:</strong> <span style="color:${slope > 18 ? '#f43f5e' : slope > 10 ? '#fde047' : '#4ade80'}">${slope.toFixed(1)}° (${slope > 18 ? 'อันตราย' : slope > 10 ? 'ชันปานกลาง' : 'ปลอดภัย'})</span>
          `;
        }
      });
    }

    window.addEventListener('resize', () => {
      if (this.isModalOpen) {
        this.resizeCanvases();
        this.renderMap();
        this.renderTransectGraph();
      }
    });
  }

  setLayer(layer) {
    this.activeLayer = layer;
    const layerBtns = document.querySelectorAll('.gis-layer-btn');
    layerBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-layer') === layer);
    });

    // Update legend description
    const legendEl = document.getElementById('gis-layer-legend-desc');
    const legendBar = document.getElementById('gis-legend-colorbar');
    if (legendEl && legendBar) {
      if (layer === 'dem') {
        legendEl.innerHTML = '<strong>DEM Hypsometric Tint:</strong> แรเงาระดับสูงต่ำ (-2.5m น้ำเงิน ➔ +0.0m เขียว/ส้ม ➔ +4.5m แดง/ขาว)';
        legendBar.style.background = 'linear-gradient(to right, #1e3a8a, #06b6d4, #84cc16, #f59e0b, #ea580c, #dc2626, #ffffff)';
      } else if (layer === 'slope') {
        legendEl.innerHTML = '<strong>Slope Hazard Heatmap:</strong> แผนที่ความลาดชัน (&lt;10° ปลอดภัย, 10°-18° เสี่ยงลื่นไถล Tripod Slip, &gt;18° เสี่ยงพลิกคว่ำ)';
        legendBar.style.background = 'linear-gradient(to right, #22c55e, #eab308, #ef4444)';
      } else if (layer === 'paleochannel') {
        legendEl.innerHTML = '<strong>Paleochannel Hydrology:</strong> ร่องน้ำโบราณยุค Noachian/Hesperian และแอ่งตะกอนน้ำขัง';
        legendBar.style.background = 'linear-gradient(to right, #1e293b, #0ea5e9, #38bdf8)';
      } else if (layer === 'crism') {
        legendEl.innerHTML = '<strong>CRISM Mineral Indices:</strong> สเปกตรัมการดูดกลืนน้ำในแร่ (ม่วง: ดินเหนียว, ฟ้า: ซัลเฟต, เขียว: โอลิวีน)';
        legendBar.style.background = 'linear-gradient(to right, #38bdf8, #a855f7, #22c55e, #f59e0b)';
      } else {
        legendEl.innerHTML = '<strong>HiRISE True-Color:</strong> ภาพถ่ายพื้นผิวดาวอังคารสีจริง (Terracotta Sand & Basalt)';
        legendBar.style.background = 'linear-gradient(to right, #7c2d12, #c2410c, #ea580c, #fed7aa)';
      }
    }

    this.renderMap();
  }

  setTransect(mode) {
    this.activeTransect = mode;
    this.updateTransectButtons();
    this.renderMap();
    this.renderTransectGraph();
  }

  updateTransectButtons() {
    const transectBtns = document.querySelectorAll('.gis-transect-preset-btn');
    transectBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-transect') === this.activeTransect);
    });
  }

  toggleModal() {
    if (!this.modal) return;
    this.isModalOpen = this.modal.classList.contains('hidden');
    this.modal.classList.toggle('hidden');

    if (this.isModalOpen) {
      setTimeout(() => {
        this.resizeCanvases();
        this.renderMap();
        this.renderTransectGraph();
      }, 50);
    }
  }

  resizeCanvases() {
    const dpr = window.devicePixelRatio || 1;

    if (this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      const w = Math.max(320, rect.width || 560);
      const h = Math.max(300, rect.height || 420);
      this.canvas.width = w * dpr;
      this.canvas.height = h * dpr;
      if (this.ctx) this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    if (this.transectCanvas) {
      const rect = this.transectCanvas.getBoundingClientRect();
      const w = Math.max(320, rect.width || 560);
      const h = 180;
      this.transectCanvas.width = w * dpr;
      this.transectCanvas.height = h * dpr;
      if (this.transectCtx) this.transectCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  /**
   * Periodically called in app.js animate() to record exploration breadcrumbs
   */
  update(roverPos, roverHeading) {
    if (!roverPos) return;

    if (!this.lastRecordedPos || this.lastRecordedPos.distanceTo(roverPos) >= 1.6) {
      this.roverPath.push({
        x: roverPos.x,
        y: roverPos.y,
        z: roverPos.z,
        time: Date.now()
      });
      this.lastRecordedPos = roverPos.clone();

      // Keep up to 600 breadcrumbs
      if (this.roverPath.length > 600) {
        this.roverPath.shift();
      }

      if (this.isModalOpen) {
        this.renderMap();
        if (this.activeTransect === 'rover-target') {
          this.renderTransectGraph();
        }
      }
    }
  }

  /**
   * Resolves start and end coordinates of currently active transect
   */
  getTransectPoints() {
    const roverPos = this.hexapod.position;

    if (this.activeTransect === 'crater') {
      // Impact Crater Diameter Transect: Across Chryse Crater (center: x=8, z=60)
      return {
        a: { x: -14.0, z: 60.0, name: 'Crater West Rim' },
        b: { x: 30.0, z: 60.0, name: 'Crater East Ejecta' },
        title: 'Chryse Meteorite Crater Rim-to-Rim Cross-Section (แอ่งอุกกาบาตไครซี)'
      };
    } else if (this.activeTransect === 'lander-beta') {
      // Lander to Ancient Clay Beds (Site Beta)
      return {
        a: { x: 0, z: -16, name: 'MAV Lander Base' },
        b: { x: 38, z: 36, name: 'Site Beta Clays' },
        title: 'Outflow Sedimentary Basin Transect (ฐานยานสู่แอ่งดินเหนียวบีตา)'
      };
    } else if (this.activeTransect === 'rover-target') {
      // From Rover to nearest unfinished target
      let target = { x: 38, z: 36, name: 'Target Beacon' };
      if (this.terrain && this.terrain.samples) {
        const uncollected = this.terrain.samples.filter(s => !s.collected);
        if (uncollected.length > 0) {
          uncollected.sort((s1, s2) => {
            const d1 = Math.hypot(roverPos.x - s1.x, roverPos.z - s1.z);
            const d2 = Math.hypot(roverPos.x - s2.x, roverPos.z - s2.z);
            return d1 - d2;
          });
          target = { x: uncollected[0].x, z: uncollected[0].z, name: uncollected[0].id.toUpperCase() };
        }
      }
      return {
        a: { x: roverPos.x, z: roverPos.z, name: 'ARES-6 Rover' },
        b: target,
        title: `Rover Approach Transect (ARES-6 ➔ ${target.name})`
      };
    } else if (this.activeTransect === 'custom' && this.customPointA && this.customPointB) {
      return {
        a: { x: this.customPointA.x, z: this.customPointA.z, name: 'Point A' },
        b: { x: this.customPointB.x, z: this.customPointB.z, name: 'Point B' },
        title: 'Custom User Topographic Profile (ภาคตัดขวางกำหนดเอง)'
      };
    }

    // Default fallback
    return {
      a: { x: -35, z: 0, name: 'West Outcrop' },
      b: { x: 35, z: 0, name: 'East Outcrop' },
      title: 'Chryse Equator East-West Transect'
    };
  }

  /**
   * Renders the 2D GIS Map (Map Canvas) with selected raster layer, rover trail, and waypoint beacons
   */
  renderMap() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, w, h);

    // 1. Draw cached raster layer (stretched to canvas)
    const raster = this.rasterCaches[this.activeLayer];
    if (raster) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(raster, 0, 0, w, h);
    }

    // 2. Draw Chryse Planetary Coordinate Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);

    for (let gx = -100; gx <= 100; gx += 50) {
      const pt = this.worldToCanvas(gx, 0, w, h);
      ctx.beginPath();
      ctx.moveTo(pt.x, 0);
      ctx.lineTo(pt.x, h);
      ctx.stroke();
    }
    for (let gz = -100; gz <= 100; gz += 50) {
      const pt = this.worldToCanvas(0, gz, w, h);
      ctx.beginPath();
      ctx.moveTo(0, pt.y);
      ctx.lineTo(w, pt.y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // 3. Draw Rover Trajectory LineString
    if (this.roverPath.length > 1) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i < this.roverPath.length; i++) {
        const pt = this.worldToCanvas(this.roverPath[i].x, this.roverPath[i].z, w, h);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
    }

    // 4. Draw Active Transect Line
    const transect = this.getTransectPoints();
    if (transect && transect.a && transect.b) {
      const ptA = this.worldToCanvas(transect.a.x, transect.a.z, w, h);
      const ptB = this.worldToCanvas(transect.b.x, transect.b.z, w, h);

      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(ptA.x, ptA.y);
      ctx.lineTo(ptB.x, ptB.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point A flag
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(ptA.x, ptA.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Point B flag
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(ptB.x, ptB.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Draw MAV Lander Base Station
    const landerPt = this.worldToCanvas(0, -16, w, h);
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(landerPt.x, landerPt.y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#fdba74';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('MAV LANDER (0, -16)', landerPt.x + 9, landerPt.y + 3);

    // 6. Draw Chryse Crater Center Pin
    const craterPt = this.worldToCanvas(8, 60, w, h);
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    const craterRadiusPx = (14 / this.size) * w;
    ctx.arc(craterPt.x, craterPt.y, craterRadiusPx, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(254, 202, 202, 0.8)';
    ctx.font = '9.5px sans-serif';
    ctx.fillText('Chryse Crater (r=14m)', craterPt.x - 30, craterPt.y - craterRadiusPx - 4);

    // 7. Draw Mineral Sample Beacons
    if (this.terrain && this.terrain.samples) {
      this.terrain.samples.forEach((sample) => {
        const spt = this.worldToCanvas(sample.x, sample.z, w, h);
        const colHex = '#' + sample.color.toString(16).padStart(6, '0');

        ctx.fillStyle = colHex;
        ctx.beginPath();
        ctx.arc(spt.x, spt.y, sample.collected ? 5 : 6.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(
          `${sample.id.toUpperCase()} ${sample.collected ? '✓' : ''}`,
          spt.x + 8,
          spt.y + 3
        );
      });
    }

    // 8. Draw ARES-6 Rover Location & Heading Arrow
    const roverPos = this.hexapod.position;
    const rpt = this.worldToCanvas(roverPos.x, roverPos.z, w, h);

    // Pulsing halo
    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.beginPath();
    ctx.arc(rpt.x, rpt.y, 11, 0, Math.PI * 2);
    ctx.fill();

    // Core rover dot
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(rpt.x, rpt.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Heading vector arrow
    const heading = this.hexapod.rotation.y;
    const arrowLen = 14;
    const ax = rpt.x + Math.sin(heading) * arrowLen;
    const ay = rpt.y + Math.cos(heading) * arrowLen;

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(rpt.x, rpt.y);
    ctx.lineTo(ax, ay);
    ctx.stroke();

    // 9. Metric Scale Bar (50m)
    const scale50mPx = (50 / this.size) * w;
    const sbX = w - scale50mPx - 16;
    const sbY = h - 16;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(sbX, sbY);
    ctx.lineTo(sbX + scale50mPx, sbY);
    ctx.moveTo(sbX, sbY - 4);
    ctx.lineTo(sbX, sbY + 4);
    ctx.moveTo(sbX + scale50mPx, sbY - 4);
    ctx.lineTo(sbX + scale50mPx, sbY + 4);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '10px monospace';
    ctx.fillText('50m', sbX + scale50mPx * 0.35, sbY - 6);
  }

  /**
   * Renders the Topographic Cross-Section Profile Graph
   * Samples elevation along the transect line and displays relief, slope, and rover position
   */
  renderTransectGraph() {
    if (!this.transectCtx || !this.transectCanvas) return;
    const ctx = this.transectCtx;
    const w = this.transectCanvas.width / (window.devicePixelRatio || 1);
    const h = this.transectCanvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#070a12';
    ctx.fillRect(0, 0, w, h);

    const transect = this.getTransectPoints();
    if (!transect || !transect.a || !transect.b) return;

    const ax = transect.a.x; const az = transect.a.z;
    const bx = transect.b.x; const bz = transect.b.z;
    const totalDist = Math.hypot(bx - ax, bz - az);

    if (totalDist < 0.1) return;

    // Sample 120 elevation points
    const samples = 120;
    const elevations = [];
    let minElev = 999;
    let maxElev = -999;
    let maxSlope = 0;
    let sumSlope = 0;

    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const x = ax + t * (bx - ax);
      const z = az + t * (bz - az);
      const elev = this.terrain.getHeight(x, z);
      const norm = this.terrain.getNormal(x, z);
      const slope = Math.acos(Math.max(0, Math.min(1, norm.y))) * (180 / Math.PI);

      elevations.push({ dist: t * totalDist, elev, slope, x, z });
      if (elev < minElev) minElev = elev;
      if (elev > maxElev) maxElev = elev;
      if (slope > maxSlope) maxSlope = slope;
      sumSlope += slope;
    }

    const avgSlope = sumSlope / (samples + 1);
    const elevRange = Math.max(1.5, maxElev - minElev);
    const padX = 45;
    const padY = 25;
    const plotW = w - padX - 25;
    const plotH = h - padY - 30;

    // Y Axis scaling with 0.5m margin
    const yMinBound = minElev - 0.5;
    const yMaxBound = maxElev + 0.5;
    const ySpan = yMaxBound - yMinBound;

    // Draw horizontal grid lines & labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748b';
    ctx.font = '10px monospace';

    for (let v = Math.floor(yMinBound); v <= Math.ceil(yMaxBound); v += 1.0) {
      const py = padY + plotH - ((v - yMinBound) / ySpan) * plotH;
      if (py >= padY && py <= padY + plotH) {
        ctx.beginPath();
        ctx.moveTo(padX, py);
        ctx.lineTo(padX + plotW, py);
        ctx.stroke();

        ctx.fillText(`${v >= 0 ? '+' : ''}${v.toFixed(1)}m`, 6, py + 3);
      }
    }

    // Distance X grid
    const distStep = totalDist > 80 ? 25 : totalDist > 40 ? 10 : 5;
    for (let d = 0; d <= totalDist; d += distStep) {
      const px = padX + (d / totalDist) * plotW;
      ctx.beginPath();
      ctx.moveTo(px, padY);
      ctx.lineTo(px, padY + plotH);
      ctx.stroke();

      ctx.fillText(`${Math.round(d)}m`, px - 8, h - 8);
    }

    // 1. Fill polygon beneath the curve (hypsometric shaded profile)
    ctx.beginPath();
    ctx.moveTo(padX, padY + plotH);
    for (let i = 0; i <= samples; i++) {
      const pt = elevations[i];
      const px = padX + (pt.dist / totalDist) * plotW;
      const py = padY + plotH - ((pt.elev - yMinBound) / ySpan) * plotH;
      ctx.lineTo(px, py);
    }
    ctx.lineTo(padX + plotW, padY + plotH);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, padY, 0, padY + plotH);
    grad.addColorStop(0, 'rgba(234, 88, 12, 0.4)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0.1)');
    ctx.fillStyle = grad;
    ctx.fill();

    // 2. Stroke elevation line
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= samples; i++) {
      const pt = elevations[i];
      const px = padX + (pt.dist / totalDist) * plotW;
      const py = padY + plotH - ((pt.elev - yMinBound) / ySpan) * plotH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // 3. Project rover position onto transect
    const roverPos = this.hexapod.position;
    const rdx = bx - ax;
    const rdz = bz - az;
    const rLenSq = rdx * rdx + rdz * rdz;
    let projT = ((roverPos.x - ax) * rdx + (roverPos.z - az) * rdz) / rLenSq;
    projT = Math.max(0, Math.min(1, projT));

    const projDist = projT * totalDist;
    const roverElev = this.terrain.getHeight(roverPos.x, roverPos.z);
    const roverPx = padX + projT * plotW;
    const roverPy = padY + plotH - ((roverElev - yMinBound) / ySpan) * plotH;

    // Draw rover cursor plumb-line
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(roverPx, padY);
    ctx.lineTo(roverPx, padY + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(roverPx, roverPy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(`ARES-6 (${roverElev.toFixed(2)}m)`, roverPx - 25, roverPy - 10);

    // 4. Update Summary Statistics in DOM
    const titleEl = document.getElementById('gis-transect-title');
    const distEl = document.getElementById('gis-transect-dist');
    const reliefEl = document.getElementById('gis-transect-relief');
    const slopeEl = document.getElementById('gis-transect-slope');

    if (titleEl) titleEl.textContent = transect.title;
    if (distEl) distEl.textContent = `${totalDist.toFixed(1)} m`;
    if (reliefEl) reliefEl.textContent = `${(maxElev - minElev).toFixed(2)} m (min: ${minElev.toFixed(1)}m, max: ${maxElev.toFixed(1)}m)`;
    if (slopeEl) slopeEl.textContent = `เฉลี่ย ${avgSlope.toFixed(1)}° | สูงสุด ${maxSlope.toFixed(1)}°`;
  }

  /**
   * Generates and downloads standard RFC 7946 GeoJSON dataset
   * Fully compatible with GeoLibre, QGIS, ArcGIS, and Python GeoPandas
   */
  exportMissionGeoJSON() {
    // 1. Build rover trajectory LineString coordinates [lon, lat, elev]
    const trajectoryCoords = this.roverPath.map(p => {
      const coords = this.localToMarsCoords(p.x, p.z);
      return [parseFloat(coords.lon), parseFloat(coords.lat), parseFloat(p.y.toFixed(2))];
    });

    if (trajectoryCoords.length === 0) {
      const pos = this.hexapod.position;
      const c = this.localToMarsCoords(pos.x, pos.z);
      trajectoryCoords.push([parseFloat(c.lon), parseFloat(c.lat), parseFloat(pos.y.toFixed(2))]);
    }

    // 2. Build FeatureCollection
    const features = [];

    // Feature 1: Rover Path Trajectory
    features.push({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: trajectoryCoords
      },
      properties: {
        name: 'ARES-6 Autonomous Exploration Track',
        rover: 'ARES-6 Hexapod Rover',
        theater: 'Mars Chryse Planitia Lowlands',
        totalPoints: trajectoryCoords.length,
        exportTimestamp: new Date().toISOString(),
        institutionCredit: 'Dr. Apisit Tongchai - Independent STEM Educational Project'
      }
    });

    // Feature 2: MAV Lander Base Station
    const landerCoords = this.localToMarsCoords(0, -16);
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(landerCoords.lon), parseFloat(landerCoords.lat), 0.0]
      },
      properties: {
        name: 'MAV Lander Extraction Base Station',
        type: 'LandingCraft',
        status: 'Operational'
      }
    });

    // Feature 3: Chryse Meteorite Impact Crater
    const craterCoords = this.localToMarsCoords(8, 60);
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(craterCoords.lon), parseFloat(craterCoords.lat), -2.2]
      },
      properties: {
        name: 'Chryse Meteorite Impact Crater',
        radiusMeters: 14.0,
        depthMeters: -2.2,
        ejectaRimHeightMeters: 1.65,
        geologicalEpoch: 'Amazonian / Late Hesperian'
      }
    });

    // Feature 4-7: Scientific Sample Sites
    if (this.terrain && this.terrain.samples) {
      this.terrain.samples.forEach(sample => {
        const scoords = this.localToMarsCoords(sample.x, sample.z);
        features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(scoords.lon), parseFloat(scoords.lat), parseFloat(this.terrain.getHeight(sample.x, sample.z).toFixed(2))]
          },
          properties: {
            id: sample.id,
            name: sample.name,
            thaiName: sample.thaiName,
            siteType: sample.siteType,
            mineralClassification: sample.options[sample.correctOption],
            hydrationIndexPct: sample.spectralData.hydrationIndex,
            keyAbsorptionBands: sample.spectralData.keyAbsorption,
            collected: !!sample.collected,
            waterEvidenceLevel: sample.waterEvidenceLevel
          }
        });
      });
    }

    const geojsonData = {
      type: 'FeatureCollection',
      name: 'ARES6_Mars_ChrysePlanitia_MissionData',
      crs: {
        type: 'name',
        properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' }
      },
      features
    };

    const blob = new Blob([JSON.stringify(geojsonData, null, 2)], { type: 'application/geo+json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ARES6_ChrysePlanitia_MissionData_${Date.now()}.geojson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
