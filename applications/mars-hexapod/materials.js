import * as THREE from 'three';

/**
 * Procedural Aerospace Texture & Material Generator
 * Generates photorealistic NASA/JPL rover textures dynamically on HTML5 Canvas
 * without external image files or network latency.
 */

function isBrowser() {
  return typeof document !== 'undefined';
}

/**
 * 1. High-Efficiency Photovoltaic Solar Deck Texture
 * Crystalline silicon solar cells with metallic silver busbars and micro-gridlines
 */
export function createSolarTexture() {
  if (!isBrowser()) return new THREE.CanvasTexture({ width: 1, height: 1 });

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep space silicon blue-black base
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#071326');
  grad.addColorStop(0.5, '#0c2340');
  grad.addColorStop(1, '#08172c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Solar wafer grid (8x8 cells)
  const cellSize = 512 / 8;
  const padding = 2.5;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const x = c * cellSize + padding;
      const y = r * cellSize + padding;
      const w = cellSize - padding * 2;
      const h = cellSize - padding * 2;

      // Cell body
      const cellGrad = ctx.createLinearGradient(x, y, x + w, y + h);
      cellGrad.addColorStop(0, '#102e52');
      cellGrad.addColorStop(0.5, '#19497e');
      cellGrad.addColorStop(1, '#0d2746');
      ctx.fillStyle = cellGrad;
      ctx.fillRect(x, y, w, h);

      // Micro-gridlines (fine silicon conductors)
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.22)';
      ctx.lineWidth = 1;
      for (let gy = y + 4; gy < y + h; gy += 4) {
        ctx.beginPath();
        ctx.moveTo(x, gy);
        ctx.lineTo(x + w, gy);
        ctx.stroke();
      }

      // Silver metallic busbars (thick primary conductors)
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.33, y);
      ctx.lineTo(x + w * 0.33, y + h);
      ctx.moveTo(x + w * 0.67, y);
      ctx.lineTo(x + w * 0.67, y + h);
      ctx.stroke();

      // Chamfered silicon cell corners
      ctx.fillStyle = '#071326';
      const ch = 4;
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.lineTo(x + ch, y); ctx.lineTo(x, y + ch); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + w, y); ctx.lineTo(x + w - ch, y); ctx.lineTo(x + w, y + ch); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x, y + h); ctx.lineTo(x + ch, y + h); ctx.lineTo(x, y + h - ch); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + w, y + h); ctx.lineTo(x + w - ch, y + h); ctx.lineTo(x + w, y + h - ch); ctx.fill();
    }
  }

  // Border mounting frame
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * 2. NASA Gold Kapton Thermal Insulation Foil Texture
 * Crinkled vacuum-deposited aluminized polyimide thermal blankets
 */
export function createGoldFoilTexture() {
  if (!isBrowser()) return new THREE.CanvasTexture({ width: 1, height: 1 });

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Rich amber-gold base
  ctx.fillStyle = '#d97706';
  ctx.fillRect(0, 0, 512, 512);

  // Procedural foil crinkles & facet highlights
  for (let i = 0; i < 400; i++) {
    const x1 = Math.random() * 512;
    const y1 = Math.random() * 512;
    const len = 15 + Math.random() * 45;
    const angle = Math.random() * Math.PI * 2;
    const x2 = x1 + Math.cos(angle) * len;
    const y2 = y1 + Math.sin(angle) * len;

    // Specular crease highlight
    ctx.strokeStyle = Math.random() > 0.5 ? 'rgba(254, 240, 138, 0.45)' : 'rgba(180, 83, 9, 0.6)';
    ctx.lineWidth = 1 + Math.random() * 2.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Kapton amber thermal tape strip seams
  ctx.fillStyle = 'rgba(146, 64, 14, 0.55)';
  ctx.fillRect(0, 120, 512, 16);
  ctx.fillRect(0, 260, 512, 16);
  ctx.fillRect(0, 400, 512, 16);
  ctx.fillRect(160, 0, 16, 512);
  ctx.fillRect(340, 0, 16, 512);

  // Fastener rivets
  ctx.fillStyle = '#fef08a';
  for (let y = 128; y <= 400; y += 140) {
    for (let x = 20; x < 512; x += 40) {
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * 3. Aerospace White Thermal Armor & Panel Seam Texture
 * Crisp composite ceramic plates with rivets, caution chevrons, and ARES-6 stencils
 */
export function createAerospacePanelTexture() {
  if (!isBrowser()) return new THREE.CanvasTexture({ width: 1, height: 1 });

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Pure aerospace off-white / titanium base
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 512, 512);

  // Panel seams
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 16, 480, 480);
  ctx.beginPath();
  ctx.moveTo(16, 256); ctx.lineTo(496, 256);
  ctx.moveTo(256, 16); ctx.lineTo(256, 496);
  ctx.stroke();

  // Countersunk titanium rivets
  ctx.fillStyle = '#64748b';
  for (let p = 28; p < 496; p += 28) {
    ctx.beginPath(); ctx.arc(p, 16, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(p, 496, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(16, p, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(496, p, 2.5, 0, Math.PI * 2); ctx.fill();
  }

  // Mars Orange Racing / Caution Chevron Decal
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(32, 32, 180, 24);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('ARES-6 // ROVER', 42, 49);

  // Secondary technical stencils
  ctx.fillStyle = '#475569';
  ctx.font = '9px "JetBrains Mono", monospace';
  ctx.fillText('NASA / JPL EXPLORATION PAYLOAD', 32, 75);
  ctx.fillText('AVIONICS BAY A - PRESSURIZED GN2', 32, 90);
  ctx.fillText('CHASSIS LEVELING SUBSYSTEM v2.4', 32, 105);

  // Warning hazard diagonal stripes
  ctx.fillStyle = '#f97316';
  for (let x = 280; x < 480; x += 22) {
    ctx.beginPath();
    ctx.moveTo(x, 32);
    ctx.lineTo(x + 10, 32);
    ctx.lineTo(x - 6, 56);
    ctx.lineTo(x - 16, 56);
    ctx.closePath();
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * 4. High-Tech 2x2 Twill Carbon Fiber Weave Texture
 */
export function createCarbonFiberTexture() {
  if (!isBrowser()) return new THREE.CanvasTexture({ width: 1, height: 1 });

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 64, 64);

  const size = 8;
  for (let y = 0; y < 64; y += size) {
    for (let x = 0; x < 64; x += size) {
      const isEven = ((x / size) + (y / size)) % 2 === 0;
      ctx.fillStyle = isEven ? '#1e293b' : '#090d16';
      ctx.fillRect(x, y, size, size);

      // Fine anisotropic specular highlight
      ctx.strokeStyle = isEven ? 'rgba(148, 163, 184, 0.15)' : 'rgba(2, 6, 23, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y + size);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

/**
 * 5. Radial Ambient Occlusion Rover Ground Contact Shadow
 */
export function createContactShadowTexture() {
  if (!isBrowser()) return new THREE.CanvasTexture({ width: 1, height: 1 });

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
  grad.addColorStop(0, 'rgba(15, 6, 4, 0.85)');
  grad.addColorStop(0.35, 'rgba(25, 10, 6, 0.55)');
  grad.addColorStop(0.7, 'rgba(40, 15, 10, 0.2)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 6. High-Dynamic-Range Mars Equirectangular Environment Map Generator
 * Generates an atmospheric Martian sky with warm regolith bounce and incandescent sun,
 * providing authentic PBR specular reflections and metallic luster.
 */
export function createMarsEnvironmentMap(renderer) {
  if (!isBrowser() || !renderer) return null;

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // 1. Sky Hemisphere (Zenith to Horizon)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 256);
  skyGrad.addColorStop(0.0, '#100504'); // Deep Martian cosmic space
  skyGrad.addColorStop(0.35, '#45170d'); // Upper dust haze
  skyGrad.addColorStop(0.70, '#8c351b'); // Mid atmosphere
  skyGrad.addColorStop(0.95, '#d95a2b'); // Warm atmospheric glow
  skyGrad.addColorStop(1.0, '#f97316');  // Glowing orange horizon line
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 1024, 256);

  // 2. Martian Sun (Brilliant Specular Reflection Point)
  const sunX = 680;
  const sunY = 105;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 180);
  sunGrad.addColorStop(0.0, '#ffffff'); // Super-incandescent core
  sunGrad.addColorStop(0.08, '#fff7ed');
  sunGrad.addColorStop(0.20, '#fef08a');
  sunGrad.addColorStop(0.45, 'rgba(251, 146, 60, 0.75)');
  sunGrad.addColorStop(0.75, 'rgba(234, 88, 12, 0.3)');
  sunGrad.addColorStop(1.0, 'rgba(194, 65, 12, 0)');
  ctx.fillStyle = sunGrad;
  ctx.fillRect(0, 0, 1024, 256);

  // Diffuse atmospheric corona around sun
  const coronaGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 320);
  coronaGrad.addColorStop(0.0, 'rgba(255, 237, 213, 0.45)');
  coronaGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.15)');
  coronaGrad.addColorStop(1.0, 'rgba(180, 83, 9, 0)');
  ctx.fillStyle = coronaGrad;
  ctx.fillRect(0, 0, 1024, 256);

  // 3. Ground Hemisphere (Martian Regolith Bounce)
  const groundGrad = ctx.createLinearGradient(0, 256, 0, 512);
  groundGrad.addColorStop(0.0, '#d95a2b'); // Warm horizon bounce
  groundGrad.addColorStop(0.08, '#7c2d12'); // Distant basalt ridges
  groundGrad.addColorStop(0.28, '#451a0d'); // Near regolith
  groundGrad.addColorStop(0.65, '#260e07'); // Dark volcanic basalt
  groundGrad.addColorStop(1.0, '#120603');  // Nadir ground shadow
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, 256, 1024, 256);

  // Distant crater rim silhouettes along horizon
  ctx.fillStyle = '#612413';
  ctx.beginPath();
  ctx.moveTo(0, 256);
  for (let x = 0; x <= 1024; x += 16) {
    const rim = Math.sin(x * 0.015) * 6 + Math.cos(x * 0.035) * 4;
    ctx.lineTo(x, 256 - Math.max(0, rim));
  }
  ctx.lineTo(1024, 264);
  ctx.lineTo(0, 264);
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;

  // Use Three.js PMREMGenerator to produce prefiltered radiance mipmaps for PBR
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  pmremGenerator.dispose();
  texture.dispose();

  return envMap;
}

/**
 * Shared Aerospace Material Palette (PBR Standard Materials)
 */
export class AerospaceMaterials {
  constructor() {
    this.solarTex = createSolarTexture();
    this.goldFoilTex = createGoldFoilTexture();
    this.panelTex = createAerospacePanelTexture();
    this.carbonTex = createCarbonFiberTexture();
    this.shadowTex = createContactShadowTexture();

    // 1. Titanium White Armor (Ceramic / Multi-layer blanket)
    // Low metalness preserves crisp white albedo while roughness: 0.32 gives high-specular sheen
    this.whiteArmor = new THREE.MeshStandardMaterial({
      map: this.panelTex,
      color: 0xf8fafc,
      roughness: 0.30,
      metalness: 0.28
    });

    // 2. Gold Kapton Thermal Foil (High metallic brilliance)
    this.goldFoil = new THREE.MeshStandardMaterial({
      map: this.goldFoilTex,
      color: 0xf59e0b,
      roughness: 0.20,
      metalness: 0.96,
      bumpMap: this.goldFoilTex,
      bumpScale: 0.04
    });

    // 3. Solar Panel Photovoltaic Array (Deep crystalline silicon reflection)
    this.solarDeck = new THREE.MeshStandardMaterial({
      map: this.solarTex,
      roughness: 0.10,
      metalness: 0.96,
      emissive: 0x0c2545,
      emissiveIntensity: 0.2
    });

    // 4. Structural Twill Carbon Fiber
    this.carbonFiber = new THREE.MeshStandardMaterial({
      map: this.carbonTex,
      color: 0x1e293b,
      roughness: 0.40,
      metalness: 0.55
    });

    // 5. Mirror-Polished Chrome (Hydraulic Linear Actuator Piston Rods)
    this.chromePiston = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.04,
      metalness: 0.98
    });

    // 6. Gunmetal Anodized Aluminum (Actuator Hubs & Clevis Housings)
    this.gunmetal = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.20,
      metalness: 0.92
    });

    // 7. Dark Basalt / Underchassis Skidplate
    this.darkChassis = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.38,
      metalness: 0.72
    });

    // 8. Mars Orange Anodized Alloy (Bezel accents & bracket braces)
    this.marsOrange = new THREE.MeshStandardMaterial({
      color: 0xea580c,
      roughness: 0.22,
      metalness: 0.88
    });

    // 9. Multi-Coated Optical Camera Glass
    this.cameraLens = new THREE.MeshStandardMaterial({
      color: 0x061826,
      roughness: 0.04,
      metalness: 0.96,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4
    });

    // 10. Glowing Tactile Sensor Elastomer
    this.sensorGlow = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.9,
      roughness: 0.18,
      metalness: 0.75
    });

    // 11. Helical Spring Steel
    this.springSteel = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      roughness: 0.20,
      metalness: 0.90
    });
  }
}

