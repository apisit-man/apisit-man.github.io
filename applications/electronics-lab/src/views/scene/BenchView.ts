import * as THREE from 'three';
import { store, AppState } from '../../state/store';
import { translations } from '../../i18n';
import {
  getResistorColorBands,
  MATERIAL_PROFILES,
  LED_COLOR_PROFILES
} from '../../domain/circuitModels';

export class BenchView {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private animationFrameId: number | null = null;
  private ledDomeMat: THREE.MeshStandardMaterial | null = null;
  private ledDieMat: THREE.MeshBasicMaterial | null = null;
  private ledLight: THREE.PointLight | null = null;
  private ledGroup: THREE.Group | null = null;
  private switchArm: THREE.Group | null = null;
  private bandMeshes: THREE.Mesh[] = [];
  private sampleMesh: THREE.Mesh | null = null;
  private returnWireMesh: THREE.Mesh | null = null;
  private currentParticles: THREE.InstancedMesh | null = null;
  private currentCurve: THREE.CatmullRomCurve3 | null = null;
  private particleCount = 48;
  private particleProgress: Float32Array = new Float32Array(48);
  private currentSpeed = 0;
  private isDisposed = false;

  // Orbit camera spherical state
  private theta = 0.12;
  private phi = 0.62;
  private radius = 9.0;
  private isDragging = false;
  private prevX = 0;
  private prevY = 0;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public init(state: AppState): boolean {
    const t = translations[state.locale];

    // 1. Detect WebGL support gracefully
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        this.renderFallback(t.webglFallbackNotice, t.switchTo2D);
        return false;
      }
    } catch {
      this.renderFallback(t.webglFallbackNotice, t.switchTo2D);
      return false;
    }

    this.container.innerHTML = `
      <div class="bench-3d-wrapper" style="position: relative; width: 100%; height: 340px; border-radius: 14px; overflow: hidden; background: #0b1329;">
        <canvas class="bench-canvas" style="width: 100%; height: 100%; display: block; touch-action: none;"></canvas>
        <div style="position: absolute; bottom: 12px; left: 14px; right: 14px; display: flex; justify-content: space-between; align-items: center; pointer-events: none; gap: 8px; flex-wrap: wrap;">
          <span style="color: #cbd5e1; font-size: 12px; background: rgba(15, 23, 42, 0.84); padding: 5px 10px; border-radius: 6px;">
            ${t.benchHint}
          </span>
          <button id="btn-reset-camera" type="button" style="pointer-events: auto; background: rgba(30, 41, 59, 0.92); color: #f8fafc; border: 1px solid #475569; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; min-height: 44px; min-width: 44px;">
            ↺ ${t.resetCamera}
          </button>
        </div>
      </div>
    `;

    const canvas = this.container.querySelector('.bench-canvas') as HTMLCanvasElement;
    if (!canvas) return false;

    const width = this.container.clientWidth || 640;
    const height = 340;

    try {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0b1329);

      this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      this.updateCameraPosition();

      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      canvas.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        this.renderFallback(t.webglFallbackNotice, t.switchTo2D);
      });
    } catch {
      this.renderFallback(t.webglFallbackNotice, t.switchTo2D);
      return false;
    }

    // Studio Workbench Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    keyLight.position.set(6, 11, 8);
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.45);
    fillLight.position.set(-6, 6, -4);
    this.scene.add(fillLight);

    // Build Realistic 3D Workbench & Components
    this.buildRealisticWorkbench();

    // Bind camera orbit / zoom controls
    this.bindCameraControls(canvas);

    // Start render loop
    this.animate();

    return true;
  }

  private updateCameraPosition() {
    if (!this.camera) return;
    const x = this.radius * Math.sin(this.phi) * Math.sin(this.theta);
    const y = this.radius * Math.cos(this.phi);
    const z = this.radius * Math.sin(this.phi) * Math.cos(this.theta);
    this.camera.position.set(x, y, z);
    this.camera.lookAt(0, 0.35, 0);
  }

  private bindCameraControls(canvas: HTMLCanvasElement) {
    canvas.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isDragging = true;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.prevX;
      const dy = e.clientY - this.prevY;
      this.prevX = e.clientX;
      this.prevY = e.clientY;

      this.theta -= dx * 0.008;
      this.phi = Math.max(0.25, Math.min(1.42, this.phi - dy * 0.008));
      this.updateCameraPosition();
    });

    canvas.addEventListener('pointerup', (e: PointerEvent) => {
      this.isDragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    });

    canvas.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      this.radius = Math.max(5.0, Math.min(14, this.radius + e.deltaY * 0.005));
      this.updateCameraPosition();
    }, { passive: false });

    const resetBtn = this.container.querySelector('#btn-reset-camera');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.theta = 0.12;
        this.phi = 0.62;
        this.radius = 9.0;
        this.updateCameraPosition();
      });
    }
  }

  private createJumperWire(points: THREE.Vector3[], colorHex: number): THREE.Mesh {
    const curve = new THREE.CatmullRomCurve3(points);
    const geo = new THREE.TubeGeometry(curve, 24, 0.045, 10, false);
    const mat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.4, metalness: 0.1 });
    return new THREE.Mesh(geo, mat);
  }

  private buildRealisticWorkbench() {
    if (!this.scene) return;

    // 1. ESD Anti-Static Lab Mat & Workbench Surface
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.85 });
    const table = new THREE.Mesh(new THREE.BoxGeometry(14, 0.2, 9), tableMat);
    table.position.y = -0.1;
    this.scene.add(table);

    // 2. Realistic 400-Point Solderless Breadboard
    const boardGroup = new THREE.Group();
    boardGroup.position.set(0.55, 0, 0);

    const boardBody = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.34, 4.1),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.32 })
    );
    boardBody.position.y = 0.17;
    boardGroup.add(boardBody);

    // Center IC Trench Ravine
    const trench = new THREE.Mesh(
      new THREE.BoxGeometry(6.9, 0.08, 0.32),
      new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.5 })
    );
    trench.position.set(0, 0.31, 0);
    boardGroup.add(trench);

    // Power Rails (+ Red & - Blue lines)
    // Terminal rows are at:
    // Top strip (cols A-E): zOffsets from -1.30 to -0.34
    // Center trench: z = 0
    // Bottom strip (cols F-J): zOffsets from +0.34 to +1.30
    // Top Power Rail (+): z = -1.66 | Bottom Power Rail (-): z = +1.66
    const redStripe = new THREE.Mesh(
      new THREE.BoxGeometry(6.6, 0.02, 0.06),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    redStripe.position.set(0, 0.35, -1.82);
    boardGroup.add(redStripe);

    const blueStripe = new THREE.Mesh(
      new THREE.BoxGeometry(6.6, 0.02, 0.06),
      new THREE.MeshBasicMaterial({ color: 0x2563eb })
    );
    blueStripe.position.set(0, 0.35, 1.82);
    boardGroup.add(blueStripe);

    // Instanced Pin Socket Holes across the Breadboard
    // cols: 22 columns (x: -2.94 to +2.94 with 0.28 pitch)
    // zOffsets:
    // Rail (+) : -1.66
    // Rows A..E: -1.30, -1.06, -0.82, -0.58, -0.34
    // (Center Trench at z = 0)
    // Rows F..J: +0.34, +0.58, +0.82, +1.06, +1.30
    // Rail (-) : +1.66
    const holeGeo = new THREE.BoxGeometry(0.09, 0.02, 0.09);
    const holeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.4 });
    const cols = 22;
    const zOffsets = [-1.66, -1.30, -1.06, -0.82, -0.58, -0.34, 0.34, 0.58, 0.82, 1.06, 1.30, 1.66];
    const totalHoles = cols * zOffsets.length;
    const instancedHoles = new THREE.InstancedMesh(holeGeo, holeMat, totalHoles);
    const dummy = new THREE.Object3D();
    let idx = 0;
    for (let c = 0; c < cols; c++) {
      const x = -2.94 + c * 0.28;
      for (const z of zOffsets) {
        dummy.position.set(x, 0.345, z);
        dummy.updateMatrix();
        instancedHoles.setMatrixAt(idx++, dummy.matrix);
      }
    }
    boardGroup.add(instancedHoles);
    this.scene.add(boardGroup);

    // 3. Realistic 2xAA Battery Holder with Cylindrical AA Cells
    const batteryHolderGroup = new THREE.Group();
    batteryHolderGroup.position.set(-4.35, 0, 0);

    const caseMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.85, 0.55, 2.7),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
    );
    caseMesh.position.y = 0.28;
    batteryHolderGroup.add(caseMesh);

    // Two Cylindrical AA Batteries Inside
    const cellBodyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4, roughness: 0.3 });
    const cellCapMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.5, roughness: 0.3 });
    const nubMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.15 });

    [-0.42, 0.42].forEach((xOff) => {
      const cellGroup = new THREE.Group();
      cellGroup.position.set(xOff, 0.48, 0);

      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.7, 20), cellBodyMat);
      body.rotation.x = Math.PI / 2;
      cellGroup.add(body);

      const copperTop = new THREE.Mesh(new THREE.CylinderGeometry(0.325, 0.325, 0.48, 20), cellCapMat);
      copperTop.rotation.x = Math.PI / 2;
      copperTop.position.z = -0.62;
      cellGroup.add(copperTop);

      const nub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.12, 16), nubMat);
      nub.rotation.x = Math.PI / 2;
      nub.position.z = -1.12;
      cellGroup.add(nub);

      batteryHolderGroup.add(cellGroup);
    });
    this.scene.add(batteryHolderGroup);

    // 4. Curved 3D Jumper Wires from Battery Holder to Breadboard
    // Battery Holder is at (-4.35, 0, 0)
    // Red Wire (+): From battery (+) terminal to Breadboard Positive Power Rail
    const redWire = this.createJumperWire([
      new THREE.Vector3(-3.5, 0.45, -0.62),
      new THREE.Vector3(-2.8, 0.95, -1.35),
      new THREE.Vector3(-1.82, 0.35, -1.66)
    ], 0xef4444);
    this.scene.add(redWire);

    // Red Rail Jumper: Connects Positive Power Rail (-1.82, z=-1.66) into Switch In Terminal (-1.82, z=-0.82)
    const switchInJumper = this.createJumperWire([
      new THREE.Vector3(-1.82, 0.35, -1.66),
      new THREE.Vector3(-1.82, 0.55, -1.24),
      new THREE.Vector3(-1.82, 0.35, -0.82)
    ], 0xef4444);
    this.scene.add(switchInJumper);

    // 5. Realistic Knife Switch on Breadboard Left
    // Placed bridging Col 4 (world x = 0.55 - 2.94 + 4*0.28 = -1.27 -> x=-1.82 is Col 2)
    // Let's use exact column coordinates:
    // Board group offset = +0.55
    // colIndex c = 4 -> local x = -2.94 + 4*0.28 = -1.82 -> world x = -1.82 + 0.55 = -1.27
    // Let's match world x with the actual hole world coordinates:
    // col 4: world x = 0.55 + (-2.94 + 4 * 0.28) = -1.27
    // col 7: world x = 0.55 + (-2.94 + 7 * 0.28) = -0.43
    // col 11: world x = 0.55 + (-2.94 + 11 * 0.28) = 0.69
    // col 15: world x = 0.55 + (-2.94 + 15 * 0.28) = 1.81
    //
    // For visual consistency with existing components:
    // Switch at x = -1.41 (spans -1.83 to -0.99)
    // Resistor at x = -0.43 (spans -0.99 to +0.13)
    // LED at x = 0.69 (spans +0.13 to +1.25)
    // Return wire at x = 1.25
    // All components sit in Row C (z = -0.82)
    const swGroup = new THREE.Group();
    swGroup.position.set(-1.41, 0.35, -0.82);

    const swBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.96, 0.16, 0.38),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })
    );
    swBase.position.y = 0.08;
    swGroup.add(swBase);

    const postMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.2 });
    // Left Post at switch input (Col 4, dx=-0.42 -> world x = -1.83)
    const leftPost = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.26, 0.16), postMat);
    leftPost.position.set(-0.42, 0.2, 0);
    swGroup.add(leftPost);

    // Right Post at switch output (Col 7, dx=+0.42 -> world x = -0.99)
    const rightPost = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.26, 0.16), postMat);
    rightPost.position.set(0.42, 0.2, 0);
    swGroup.add(rightPost);

    // Pivot group at left post (-0.42)
    this.switchArm = new THREE.Group();
    this.switchArm.position.set(-0.42, 0.28, 0);
    const blade = new THREE.Mesh(
      new THREE.BoxGeometry(0.84, 0.06, 0.09),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 })
    );
    blade.position.x = 0.42;
    this.switchArm.add(blade);

    const handle = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.14, 0.16),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 })
    );
    handle.position.x = 0.84;
    this.switchArm.add(handle);

    swGroup.add(this.switchArm);
    this.scene.add(swGroup);

    // 6. Realistic Carbon-Film Resistor with Bulged Ceramic Ends, Bent Leads & 4 Color Bands
    // Resistor bridges Col 7 (x=-0.99) to Col 11 (x=0.13), row C (z=-0.82)
    const resistorGroup = new THREE.Group();
    resistorGroup.position.set(-0.43, 0.62, -0.82);

    const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5d0a9, roughness: 0.38 });
    const centerWaist = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.65, 20), ceramicMat);
    centerWaist.rotation.z = Math.PI / 2;
    resistorGroup.add(centerWaist);

    // Bulged end caps
    [-0.31, 0.31].forEach((xCap) => {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.165, 16, 16), ceramicMat);
      cap.scale.set(1.1, 1.0, 1.0);
      cap.position.x = xCap;
      resistorGroup.add(cap);
    });

    // 4 Dynamic Color Band Rings
    this.bandMeshes = [];
    const bandPositions = [-0.20, -0.07, 0.07, 0.20];
    bandPositions.forEach((xPos) => {
      const ring = new THREE.Mesh(
        new THREE.CylinderGeometry(0.152, 0.152, 0.065, 20),
        new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 })
      );
      ring.rotation.z = Math.PI / 2;
      ring.position.x = xPos;
      this.bandMeshes.push(ring);
      resistorGroup.add(ring);
    });

    // Bent Tinned Copper Axial Leads Inserting into Breadboard Holes at Col 7 (-0.56) and Col 11 (+0.56)
    // Left lead drops straight into hole at (-0.56, -0.27, 0)
    // Right lead drops straight into hole at (+0.56, -0.27, 0)
    const leadWire = this.createJumperWire([
      new THREE.Vector3(-0.56, -0.27, 0),
      new THREE.Vector3(-0.56, 0, 0),
      new THREE.Vector3(0.56, 0, 0),
      new THREE.Vector3(0.56, -0.27, 0)
    ], 0xcbd5e1);
    resistorGroup.add(leadWire);
    this.scene.add(resistorGroup);

    // 7. Optional Test Specimen Block (Visible in Lesson 2: Conductors & Insulators)
    this.sampleMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.22, 0.32),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.7, roughness: 0.25 })
    );
    this.sampleMesh.position.set(-0.43, 0.46, -0.58);
    this.sampleMesh.visible = false;
    this.scene.add(this.sampleMesh);

    // 8. Realistic 5mm Translucent Epoxy Dome LED with Internal Anvil & Post Cup
    // Anode leg in Col 11 (x=0.13), Cathode leg in Col 15 (x=1.25)
    // Midpoint x = (0.13 + 1.25)/2 = 0.69, Row C (z=-0.82)
    // Leg span = 1.25 - 0.13 = 1.12 -> Anode at dx = -0.56, Cathode at dx = +0.56
    this.ledGroup = new THREE.Group();
    this.ledGroup.position.set(0.69, 0.35, -0.82);

    this.ledDomeMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x000000,
      roughness: 0.12,
      metalness: 0.05,
      transparent: true,
      opacity: 0.78
    });

    // Cylindrical body + hemispherical dome top
    const ledCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.56, 24), this.ledDomeMat);
    ledCyl.position.y = 0.58;
    this.ledGroup.add(ledCyl);

    const ledTopDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      this.ledDomeMat
    );
    ledTopDome.position.y = 0.86;
    this.ledGroup.add(ledTopDome);

    // Base Flange Rim + Cathode Flat Notch Indicator
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.41, 0.1, 24), this.ledDomeMat);
    rim.position.y = 0.28;
    this.ledGroup.add(rim);

    const flatNotch = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.14, 0.45),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc })
    );
    flatNotch.position.set(0.38, 0.28, 0);
    this.ledGroup.add(flatNotch);

    // Internal Leadframe: Post (Anode -X) and Anvil Cup (Cathode +X)
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.92, roughness: 0.15 });
    const internalPost = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.42, 0.05), frameMat);
    internalPost.position.set(-0.14, 0.46, 0);
    this.ledGroup.add(internalPost);

    const internalAnvil = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.05, 0.45, 12), frameMat);
    internalAnvil.position.set(0.14, 0.48, 0);
    this.ledGroup.add(internalAnvil);

    // Tiny Semiconductor Glowing Die inside Anvil Cup
    this.ledDieMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
    const dieMesh = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 12), this.ledDieMat);
    dieMesh.position.set(0.14, 0.68, 0);
    this.ledGroup.add(dieMesh);

    // External Tinned Leads connecting into Col 11 (-0.56) and Col 15 (+0.56)
    // Anode lead (longer lead bent to hole)
    const anodeLeadWire = this.createJumperWire([
      new THREE.Vector3(-0.56, 0, 0),
      new THREE.Vector3(-0.56, 0.22, 0),
      new THREE.Vector3(-0.16, 0.28, 0)
    ], 0xcbd5e1);
    this.ledGroup.add(anodeLeadWire);

    // Cathode lead (bent to hole)
    const cathodeLeadWire = this.createJumperWire([
      new THREE.Vector3(0.56, 0, 0),
      new THREE.Vector3(0.56, 0.22, 0),
      new THREE.Vector3(0.16, 0.28, 0)
    ], 0xcbd5e1);
    this.ledGroup.add(cathodeLeadWire);

    // PointLight for LED Emission
    this.ledLight = new THREE.PointLight(0xff2222, 0, 6.5);
    this.ledLight.position.set(0, 1.05, 0);
    this.ledGroup.add(this.ledLight);

    this.scene.add(this.ledGroup);

    // 9. Return Jumper Wire:
    // Plugs into Col 15 Row E (x=1.25, z=-0.34) -> Negative Power Rail (x=1.25, z=1.66) -> Battery (-) terminal (-3.5, 0.45, 0.62)
    this.returnWireMesh = this.createJumperWire([
      new THREE.Vector3(1.25, 0.35, -0.34),
      new THREE.Vector3(1.25, 0.65, 0.5),
      new THREE.Vector3(1.25, 0.35, 1.66),
      new THREE.Vector3(0.0, 0.85, 1.8),
      new THREE.Vector3(-2.8, 0.95, 1.35),
      new THREE.Vector3(-3.5, 0.45, 0.62)
    ], 0x3b82f6);
    this.scene.add(this.returnWireMesh);

    // 10. Glowing Current Flow Particles (Closed Complete Loop Animation)
    // Continuous circuit path: Battery (+) -> Rail (+) -> Col 4 -> Switch -> Col 7 -> Resistor -> Col 11 -> LED -> Col 15 -> Rail (-) -> Battery (-) -> Battery (+)
    const circuitLoopPoints = [
      new THREE.Vector3(-3.5, 0.45, -0.62),
      new THREE.Vector3(-2.8, 0.95, -1.35),
      new THREE.Vector3(-1.82, 0.38, -1.66),
      new THREE.Vector3(-1.82, 0.42, -0.82),
      new THREE.Vector3(-0.99, 0.42, -0.82),
      new THREE.Vector3(-0.43, 0.65, -0.82),
      new THREE.Vector3(0.13, 0.42, -0.82),
      new THREE.Vector3(0.69, 0.75, -0.82),
      new THREE.Vector3(1.25, 0.42, -0.82),
      new THREE.Vector3(1.25, 0.40, -0.34),
      new THREE.Vector3(1.25, 0.65, 0.5),
      new THREE.Vector3(1.25, 0.38, 1.66),
      new THREE.Vector3(0.0, 0.85, 1.8),
      new THREE.Vector3(-2.8, 0.95, 1.35),
      new THREE.Vector3(-3.5, 0.45, 0.62),
      new THREE.Vector3(-3.5, 0.45, -0.62)
    ];
    this.currentCurve = new THREE.CatmullRomCurve3(circuitLoopPoints, true);

    const particleGeo = new THREE.SphereGeometry(0.048, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    this.currentParticles = new THREE.InstancedMesh(particleGeo, particleMat, this.particleCount);
    this.currentParticles.visible = false;
    for (let i = 0; i < this.particleCount; i++) {
      this.particleProgress[i] = i / this.particleCount;
    }
    this.scene.add(this.currentParticles);
  }

  public update(state: AppState) {
    const result = store.getSimulationResult();
    const isLit = result.actualCurrent > 0 && result.kvlSatisfied;

    // 1. Update Knife Switch Arm Angle
    if (this.switchArm) {
      this.switchArm.rotation.z = state.power ? 0 : 0.48;
    }

    // 2. Update Return Wire Visibility (Lesson 1: Open/Closed Circuit)
    if (this.returnWireMesh) {
      const broken = state.currentLessonId === 'open-closed-circuit' && !state.wireConnected;
      this.returnWireMesh.position.y = broken ? 0.55 : 0;
    }

    // 3. Update Dynamic 4-Band Resistor Color Rings
    const bands = getResistorColorBands(state.resistance);
    this.bandMeshes.forEach((mesh, idx) => {
      if (bands[idx]) {
        (mesh.material as THREE.MeshStandardMaterial).color.set(bands[idx].hex);
      }
    });

    // 4. Update Lesson 2 Test Material Sample
    if (this.sampleMesh) {
      if (state.currentLessonId === 'conductors-insulators') {
        this.sampleMesh.visible = true;
        const matProfile = MATERIAL_PROFILES[state.materialId];
        const sampleMat = this.sampleMesh.material as THREE.MeshStandardMaterial;
        sampleMat.color.set(matProfile.colorHex);
        sampleMat.metalness = state.materialId === 'copper' ? 0.85 : 0.1;
      } else {
        this.sampleMesh.visible = false;
      }
    }

    // 5. Update Realistic 5mm LED Color, Emission, and Orientation
    const ledProfile = state.currentLessonId === 'current-limiting-resistor'
      ? LED_COLOR_PROFILES[state.ledColor]
      : LED_COLOR_PROFILES.red;
    const ledColorObj = new THREE.Color(ledProfile.hex);

    if (this.ledDomeMat && this.ledDieMat && this.ledLight && this.ledGroup) {
      this.ledDomeMat.color.copy(ledColorObj);
      this.ledLight.color.copy(ledColorObj);

      if (isLit) {
        this.ledDomeMat.emissive.copy(ledColorObj);
        this.ledDomeMat.emissiveIntensity = 0.55 + result.glowIntensity * 1.45;
        this.ledDieMat.color.setHex(0xfef08a);
        this.ledLight.intensity = 1.2 + result.glowIntensity * 2.5;
      } else {
        this.ledDomeMat.emissive.setHex(0x000000);
        this.ledDomeMat.emissiveIntensity = 0;
        this.ledDieMat.color.setHex(0x334155);
        this.ledLight.intensity = 0;
      }

      // Rotate 180 degrees when reversed
      this.ledGroup.rotation.y = state.polarity === 'reverse' ? Math.PI : 0;

      // Reposition slightly in Lesson 6 when testing across center gap
      if (state.currentLessonId === 'breadboard-connectivity' && state.breadboardPreset === 'open-center-gap') {
        this.ledGroup.position.z = 0.59;
      } else {
        this.ledGroup.position.z = -0.82;
      }
    }

    // 6. Update 3D Current Flow Animation Speed and Visibility
    if (this.currentParticles) {
      if (isLit) {
        this.currentParticles.visible = true;
        // Current speed proportional to actual current (clamped to comfortable visually distinct speed)
        this.currentSpeed = 0.003 + Math.min(0.015, (result.actualCurrent / 0.025) * 0.01);
      } else {
        this.currentParticles.visible = false;
        this.currentSpeed = 0;
      }
    }
  }

  private animate = () => {
    if (this.isDisposed) return;
    this.animationFrameId = requestAnimationFrame(this.animate);

    if (typeof document !== 'undefined' && document.hidden) {
      return;
    }

    // Advance 3D Current Flow Particles along Circuit Spline Curve
    if (this.currentParticles && this.currentParticles.visible && this.currentCurve && this.currentSpeed > 0) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < this.particleCount; i++) {
        this.particleProgress[i] = (this.particleProgress[i] + this.currentSpeed) % 1.0;
        const pt = this.currentCurve.getPointAt(this.particleProgress[i]);
        dummy.position.copy(pt);
        dummy.updateMatrix();
        this.currentParticles.setMatrixAt(i, dummy.matrix);
      }
      this.currentParticles.instanceMatrix.needsUpdate = true;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  private renderFallback(message: string, buttonText: string) {
    this.container.innerHTML = `
      <div class="webgl-fallback-box" style="background: #1e293b; color: #f8fafc; padding: 24px; border-radius: 12px; text-align: center;">
        <p style="margin-bottom: 14px; font-size: 15px;">⚠️ ${message}</p>
        <button id="switch-to-2d-btn" type="button" style="background: #0d9488; color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; min-height: 44px;">
          ${buttonText}
        </button>
      </div>
    `;
    const btn = this.container.querySelector('#switch-to-2d-btn');
    if (btn) {
      btn.addEventListener('click', () => store.setViewMode('schematic'));
    }
  }

  public dispose() {
    this.isDisposed = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.scene) {
      this.scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) {
          (obj as THREE.Mesh).geometry.dispose();
        }
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach(m => m.dispose());
          } else {
            mat.dispose();
          }
        }
      });
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
    this.scene = null;
    this.camera = null;
  }
}
