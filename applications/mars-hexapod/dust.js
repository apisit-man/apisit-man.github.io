import * as THREE from 'three';

/**
 * Procedural Martian Dust Particle System
 * Simulates atmospheric billows of fine Martian iron-oxide regolith
 * kicked up by the hexapod's titanium grouser footpads under Mars gravity (3.72 m/s²).
 * 
 * Zero external textures, zero memory leaks, high-performance typed buffer arrays.
 */
export class MarsDustSystem {
  constructor(scene, maxParticles = 140) {
    this.scene = scene;
    this.maxParticles = maxParticles;
    this.particlePool = [];

    // Mars surface gravity (m/s²)
    this.marsGravity = 3.72;

    this.initParticles();
  }

  /**
   * Generates procedural soft circular Gaussian radial puff texture
   */
  createDustTexture() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.35, 'rgba(240, 200, 170, 0.65)');
    grad.addColorStop(0.7, 'rgba(210, 110, 70, 0.25)');
    grad.addColorStop(1, 'rgba(180, 80, 40, 0.0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  initParticles() {
    this.positions = new Float32Array(this.maxParticles * 3);
    this.colors = new Float32Array(this.maxParticles * 3);
    this.sizes = new Float32Array(this.maxParticles);

    // Initialize all offscreen
    for (let i = 0; i < this.maxParticles; i++) {
      this.positions[i * 3 + 0] = 0;
      this.positions[i * 3 + 1] = -500;
      this.positions[i * 3 + 2] = 0;

      this.colors[i * 3 + 0] = 0.85;
      this.colors[i * 3 + 1] = 0.42;
      this.colors[i * 3 + 2] = 0.22;

      this.sizes[i] = 0.0;

      this.particlePool.push({
        active: false,
        x: 0,
        y: -500,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        life: 0,
        maxLife: 0.7,
        baseSize: 0.35,
        r: 0.85,
        g: 0.42,
        b: 0.22
      });
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(this.sizes, 1));

    const dustTex = this.createDustTexture();

    this.material = new THREE.PointsMaterial({
      size: 1.0,
      map: dustTex,
      transparent: true,
      opacity: 0.85,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.scene.add(this.points);
  }

  /**
   * Spawns a dust billow at foot contact location
   * @param {THREE.Vector3} worldPos - Stance foot contact coordinates
   * @param {number} count - Number of particle puffs
   */
  emitFootstepPuff(worldPos, count = 6) {
    let spawned = 0;

    for (let i = 0; i < this.maxParticles && spawned < count; i++) {
      const p = this.particlePool[i];
      if (!p.active) {
        p.active = true;
        // Jitter origin around foot contact
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.08 + Math.random() * 0.16;
        p.x = worldPos.x + Math.cos(angle) * radius;
        p.y = worldPos.y + 0.04;
        p.z = worldPos.z + Math.sin(angle) * radius;

        // Upward & outward billow velocity
        const speedH = 0.35 + Math.random() * 0.75;
        p.vx = Math.cos(angle) * speedH;
        p.vy = 0.55 + Math.random() * 0.85; // Low gravity upward rise
        p.vz = Math.sin(angle) * speedH;

        p.life = 0;
        p.maxLife = 0.55 + Math.random() * 0.35; // Hangs in thin air for ~0.7s
        p.baseSize = 0.45 + Math.random() * 0.35;

        // Martian terracotta / oxidized basalt dust shades
        const shade = Math.random();
        if (shade < 0.6) {
          p.r = 0.85; p.g = 0.38; p.b = 0.20; // Terracotta sand
        } else if (shade < 0.85) {
          p.r = 0.95; p.g = 0.55; p.b = 0.30; // Sunlit dune crest
        } else {
          p.r = 0.65; p.g = 0.28; p.b = 0.16; // Basalt dust
        }

        spawned++;
      }
    }
  }

  /**
   * Frame update under Martian gravity
   * @param {number} dt - Delta time in seconds
   */
  update(dt) {
    const posAttr = this.geometry.attributes.position;
    const colAttr = this.geometry.attributes.color;

    let hasActive = false;

    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.particlePool[i];
      if (p.active) {
        hasActive = true;
        p.life += dt;

        if (p.life >= p.maxLife) {
          p.active = false;
          p.y = -500;
          this.positions[i * 3 + 1] = -500;
          continue;
        }

        const t = p.life / p.maxLife; // 0 to 1

        // Martian Gravity integration
        p.vy -= this.marsGravity * 0.65 * dt;

        // Air drag
        p.vx *= 0.95;
        p.vz *= 0.95;

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;

        // Write positions
        this.positions[i * 3 + 0] = p.x;
        this.positions[i * 3 + 1] = p.y;
        this.positions[i * 3 + 2] = p.z;

        // Billow size expands as dust disperses
        this.sizes[i] = p.baseSize * (1.0 + t * 2.2);

        // Alpha fade
        const alpha = Math.max(0, 1.0 - t * t);
        this.colors[i * 3 + 0] = p.r * alpha;
        this.colors[i * 3 + 1] = p.g * alpha;
        this.colors[i * 3 + 2] = p.b * alpha;
      }
    }

    if (hasActive) {
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      if (this.geometry.attributes.size) {
        this.geometry.attributes.size.needsUpdate = true;
      }
    }
  }
}
