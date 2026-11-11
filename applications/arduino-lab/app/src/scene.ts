import * as THREE from 'three';
import type { LessonData } from './types';
import { EQUIPMENT_CATALOG } from './equipment';

export type CameraPreset = 'iso' | 'top' | 'closeup' | 'board';

export interface SceneController {
  update: (lesson: LessonData, output: Record<string, any>, isRunning: boolean) => void;
  resetCamera: () => void;
  setCameraPreset: (preset: CameraPreset) => void;
  focusPart: (partId: string) => void;
  setTheme: (isDark: boolean) => void;
  dispose: () => void;
  getCanvas: () => HTMLCanvasElement;
}

interface WirePulseItem {
  curve: THREE.Curve<THREE.Vector3>;
  mesh: THREE.Mesh;
  speed: number;
  offset: number;
  activePin?: string;
  alwaysActive?: boolean;
}

export function init3DScene(
  container: HTMLElement,
  onSelectPart?: (partId: string) => void
): SceneController | null {
  try {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) return null;
  } catch {
    return null;
  }

  const width = container.clientWidth || 640;
  const height = container.clientHeight || 420;

  const scene = new THREE.Scene();
  let isDark = document.documentElement.classList.contains('dark');
  scene.background = new THREE.Color(isDark ? 0x070c18 : 0xf1f5f9);

  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 120);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Studio / Engineering Bench Lighting
  const hemiLight = new THREE.HemisphereLight(0xffffff, isDark ? 0x1e293b : 0xcbd5e1, 0.95);
  hemiLight.position.set(0, 25, 0);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
  keyLight.position.set(12, 24, 16);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 2;
  keyLight.shadow.camera.far = 50;
  const d = 14;
  keyLight.shadow.camera.left = -d;
  keyLight.shadow.camera.right = d;
  keyLight.shadow.camera.top = d;
  keyLight.shadow.camera.bottom = -d;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
  fillLight.position.set(-16, 12, 10);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x7c3aed, 0.55);
  rimLight.position.set(0, 14, -18);
  scene.add(rimLight);

  // ESD Lab Mat & Reference Grid
  const benchGeo = new THREE.PlaneGeometry(34, 24);
  benchGeo.rotateX(-Math.PI / 2);
  const benchMat = new THREE.MeshStandardMaterial({
    color: isDark ? 0x0b1324 : 0xe2e8f0,
    roughness: 0.85,
    metalness: 0.05,
  });
  const benchMesh = new THREE.Mesh(benchGeo, benchMat);
  benchMesh.position.y = -0.04;
  benchMesh.receiveShadow = true;
  scene.add(benchMesh);

  let gridHelper = new THREE.GridHelper(
    34,
    34,
    isDark ? 0x334155 : 0x94a3b8,
    isDark ? 0x1e293b : 0xcbd5e1
  );
  gridHelper.position.y = -0.02;
  scene.add(gridHelper);

  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  // Selection highlight ring for focused equipment part
  const focusRingGeo = new THREE.RingGeometry(0.85, 1.05, 32);
  focusRingGeo.rotateX(-Math.PI / 2);
  const focusRingMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.0,
  });
  const focusRing = new THREE.Mesh(focusRingGeo, focusRingMat);
  focusRing.position.set(-3.8, 0.05, 0);
  rootGroup.add(focusRing);
  let focusRingPulseTime = 0;

  // Shared Static Materials
  const pcbTealMat = new THREE.MeshStandardMaterial({ color: 0x007984, roughness: 0.32, metalness: 0.12 });
  const darkPcbMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.35, metalness: 0.15 });
  const chipMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.55, metalness: 0.1 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.85, roughness: 0.2 });
  const brushedSteelMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.78, roughness: 0.28 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.22 });
  const copperMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.75, roughness: 0.28 });
  const plasticDarkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.45 });
  const whitePlasticMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 });

  // Helper: tag an entire Object3D subtree with a partId for raycast picking
  function tagPart(obj: THREE.Object3D, partId: string) {
    obj.userData.partId = partId;
    obj.traverse((child) => {
      child.userData.partId = partId;
    });
  }

  // Helper: redraw text on a 3D callout sprite canvas
  function drawCalloutCanvas(
    canvas: HTMLCanvasElement,
    text: string,
    bgColor = 'rgba(15, 23, 42, 0.88)',
    borderColor = '#38bdf8',
    textColor = '#f8fafc'
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, 256, 64);
    ctx.fillStyle = bgColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    const r = 14;
    ctx.beginPath();
    ctx.moveTo(10 + r, 8);
    ctx.lineTo(246 - r, 8);
    ctx.quadraticCurveTo(246, 8, 246, 8 + r);
    ctx.lineTo(246, 56 - r);
    ctx.quadraticCurveTo(246, 56, 246 - r, 56);
    ctx.lineTo(10 + r, 56);
    ctx.quadraticCurveTo(10, 56, 10, 56 - r);
    ctx.lineTo(10, 8 + r);
    ctx.quadraticCurveTo(10, 8, 10 + r, 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.font = 'bold 22px "Plus Jakarta Sans", "Prompt", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 33);
  }

  // Helper: create a crisp 3D floating callout badge sprite
  function createCalloutSprite(
    text: string,
    bgColor = 'rgba(15, 23, 42, 0.88)',
    borderColor = '#38bdf8',
    textColor = '#f8fafc',
    scale = 1.65
  ): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    drawCalloutCanvas(canvas, text, bgColor, borderColor, textColor);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(scale, scale * 0.25, 1);
    sprite.renderOrder = 10;
    sprite.userData.callout = { canvas, tex, bgColor, borderColor, textColor, lastText: text };
    return sprite;
  }

  function updateCalloutSprite(sprite: THREE.Sprite | undefined, text: string, borderColor?: string) {
    if (!sprite || !sprite.userData?.callout) return;
    const info = sprite.userData.callout;
    const nextBorder = borderColor || info.borderColor;
    if (info.lastText === text && info.borderColor === nextBorder) return;
    info.lastText = text;
    info.borderColor = nextBorder;
    drawCalloutCanvas(info.canvas, text, info.bgColor, nextBorder, info.textColor);
    info.tex.needsUpdate = true;
  }

  // Procedural Silkscreen Texture for Arduino Uno R3
  function createUnoSilkscreenTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Teal solder mask base
      ctx.fillStyle = '#007480';
      ctx.fillRect(0, 0, 1024, 768);

      // Subtle copper PCB traces under solder mask
      ctx.strokeStyle = 'rgba(0, 168, 181, 0.35)';
      ctx.lineWidth = 4;
      for (let i = 0; i < 14; i++) {
        ctx.beginPath();
        ctx.moveTo(320 + i * 44, 75);
        ctx.lineTo(320 + i * 44, 190);
        ctx.lineTo(440 + i * 26, 360);
        ctx.stroke();
      }
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(640 + i * 52, 690);
        ctx.lineTo(640 + i * 52, 570);
        ctx.lineTo(540 + i * 32, 430);
        ctx.stroke();
      }

      // White PCB border & mounting holes
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 5;
      ctx.strokeRect(18, 18, 988, 732);

      const holes = [
        [210, 65],
        [960, 65],
        [210, 700],
        [950, 680],
      ];
      for (const [hx, hy] of holes) {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(hx, hy, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(hx, hy, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      // Top Header Labels (Digital D0-D13, GND, AREF, SDA, SCL)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      const topPins = [
        'SCL',
        'SDA',
        'AREF',
        'GND',
        '13',
        '12',
        '~11',
        '~10',
        '~9',
        '8',
        '',
        '7',
        '~6',
        '~5',
        '4',
        '~3',
        '2',
        'TX>1',
        'RX<0',
      ];
      topPins.forEach((lbl, idx) => {
        if (!lbl) return;
        const x = 250 + idx * 38;
        ctx.fillText(lbl, x, 110);
      });

      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('DIGITAL (PWM ~)', 620, 148);

      // Center Branding
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('ARDUINO', 310, 265);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText('UNO R3', 565, 265);

      // LED Indicators Silkscreen
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 19px monospace';
      ctx.fillText('L (D13)', 355, 205);
      ctx.fillText('TX', 355, 315);
      ctx.fillText('RX', 355, 355);
      ctx.fillText('ON', 825, 285);
      ctx.fillText('RESET', 95, 130);
      ctx.fillText('ICSP', 925, 360);

      // Bottom Header Labels (POWER & ANALOG IN)
      ctx.textAlign = 'center';
      ctx.font = 'bold 20px monospace';
      const pwrPins = ['IOREF', 'RST', '3.3V', '5V', 'GND', 'GND', 'VIN'];
      pwrPins.forEach((lbl, idx) => {
        const x = 310 + idx * 42;
        ctx.fillText(lbl, x, 665);
      });

      const analogPins = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
      analogPins.forEach((lbl, idx) => {
        const x = 670 + idx * 44;
        ctx.fillText(lbl, x, 665);
      });

      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('POWER', 435, 625);
      ctx.fillText('ANALOG IN', 780, 625);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }

  // Procedural Silkscreen Texture for ATmega328P DIP-28 Chip
  function createAtmegaChipTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, 512, 128);
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 4;
      ctx.strokeRect(4, 4, 504, 120);

      // Pin 1 notch & dot
      ctx.fillStyle = '#52525b';
      ctx.beginPath();
      ctx.arc(4, 64, 22, -Math.PI / 2, Math.PI / 2);
      ctx.fill();
      ctx.fillStyle = '#e4e4e7';
      ctx.beginPath();
      ctx.arc(42, 95, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#d4d4d8';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('ATMEL', 95, 46);
      ctx.font = 'bold 26px monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('ATMEGA328P-PU', 95, 84);
      ctx.font = '18px monospace';
      ctx.fillStyle = '#a1a1aa';
      ctx.fillText('2614  5V-16MHz', 330, 46);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  // Build Detailed Arduino Uno R3 Board
  let d13LedMat!: THREE.MeshBasicMaterial;
  let d13HaloMat!: THREE.MeshBasicMaterial;
  let txLedMat!: THREE.MeshBasicMaterial;
  let rxLedMat!: THREE.MeshBasicMaterial;

  function createUnoBoard(): THREE.Group {
    const board = new THREE.Group();

    const topTex = createUnoSilkscreenTexture();
    const pcbMaterials = [
      pcbTealMat,
      pcbTealMat,
      new THREE.MeshStandardMaterial({ map: topTex, roughness: 0.35, metalness: 0.08 }),
      pcbTealMat,
      pcbTealMat,
      pcbTealMat,
    ];

    const pcbGeo = new THREE.BoxGeometry(7.2, 0.22, 5.5);
    const pcb = new THREE.Mesh(pcbGeo, pcbMaterials);
    pcb.receiveShadow = true;
    pcb.castShadow = true;
    board.add(pcb);

    // ATmega328P DIP-28 Socket + Chip + 28 metallic legs
    const socketGeo = new THREE.BoxGeometry(3.5, 0.16, 0.95);
    const socketMesh = new THREE.Mesh(socketGeo, plasticDarkMat);
    socketMesh.position.set(1.05, 0.18, 0.55);
    board.add(socketMesh);

    const chipTex = createAtmegaChipTexture();
    const chipMaterials = [
      chipMat,
      chipMat,
      new THREE.MeshStandardMaterial({ map: chipTex, roughness: 0.45 }),
      chipMat,
      chipMat,
      chipMat,
    ];
    const chipGeo = new THREE.BoxGeometry(3.35, 0.22, 0.76);
    const chip = new THREE.Mesh(chipGeo, chipMaterials);
    chip.position.set(1.05, 0.32, 0.55);
    chip.castShadow = true;
    board.add(chip);

    // 28 IC Pins (14 per side)
    const icPinGeo = new THREE.BoxGeometry(0.06, 0.22, 0.12);
    for (let i = 0; i < 14; i++) {
      const px = -0.48 + i * 0.235;
      const pinTop = new THREE.Mesh(icPinGeo, metalMat);
      pinTop.position.set(px, 0.24, 0.12);
      const pinBot = new THREE.Mesh(icPinGeo, metalMat);
      pinBot.position.set(px, 0.24, 0.98);
      board.add(pinTop, pinBot);
    }

    // USB Type-B Connector (Top-Left) with inner cavity & tongue
    const usbGroup = new THREE.Group();
    const usbShell = new THREE.Mesh(new THREE.BoxGeometry(1.45, 1.1, 1.25), metalMat);
    usbShell.castShadow = true;
    const usbInner = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.78, 0.92),
      new THREE.MeshBasicMaterial({ color: 0x0f172a })
    );
    usbInner.position.set(-0.55, 0, 0);
    const usbTongue = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.28, 0.55), whitePlasticMat);
    usbTongue.position.set(-0.52, 0, 0);
    usbGroup.add(usbShell, usbInner, usbTongue);
    usbGroup.position.set(-3.15, 0.62, -1.25);
    board.add(usbGroup);

    // DC Barrel Power Jack (Bottom-Left)
    const dcGroup = new THREE.Group();
    const dcBody = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.05, 1.0), plasticDarkMat);
    dcBody.castShadow = true;
    const dcHole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.3, 16),
      new THREE.MeshBasicMaterial({ color: 0x090d16 })
    );
    dcHole.rotation.z = Math.PI / 2;
    dcHole.position.set(-0.68, 0, 0);
    const dcPin = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.5, 12), metalMat);
    dcPin.rotation.z = Math.PI / 2;
    dcPin.position.set(-0.58, 0, 0);
    dcGroup.add(dcBody, dcHole, dcPin);
    dcGroup.position.set(-3.05, 0.6, 1.75);
    board.add(dcGroup);

    // 16 MHz HC-49S Crystal Oscillator
    const crystalBase = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.24, 0.38), metalMat);
    crystalBase.position.set(-0.85, 0.22, 0.15);
    board.add(crystalBase);

    // Electrolytic Filter Capacitors (2 silver cylinders near DC jack)
    const capGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.55, 16);
    const cap1 = new THREE.Mesh(capGeo, brushedSteelMat);
    cap1.position.set(-1.7, 0.36, 1.45);
    const cap2 = new THREE.Mesh(capGeo, brushedSteelMat);
    cap2.position.set(-1.7, 0.36, 2.05);
    board.add(cap1, cap2);

    // 5V Linear Regulator (SOT-223) & ATmega16U2 USB-Serial SMD IC
    const vreg = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.18, 0.45), chipMat);
    vreg.position.set(-2.35, 0.2, 0.55);
    const usbIc = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.5), chipMat);
    usbIc.position.set(-1.75, 0.18, -1.1);
    board.add(vreg, usbIc);

    // Tactile Reset Button (Top-Left Corner)
    const resetBase = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.22, 0.55), metalMat);
    resetBase.position.set(-3.0, 0.21, -2.25);
    const resetCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.22, 16),
      new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.3 })
    );
    resetCap.position.set(-3.0, 0.34, -2.25);
    board.add(resetBase, resetCap);

    // Female Header Banks with Individual Pin Sockets
    function createHeaderStrip(pinCount: number, startX: number, zPos: number) {
      const stripGroup = new THREE.Group();
      const length = pinCount * 0.26 + 0.1;
      const body = new THREE.Mesh(new THREE.BoxGeometry(length, 0.48, 0.32), plasticDarkMat);
      body.position.set(startX + length / 2 - 0.13, 0.34, zPos);
      stripGroup.add(body);

      const holeGeo = new THREE.BoxGeometry(0.12, 0.06, 0.12);
      const holeMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
      for (let i = 0; i < pinCount; i++) {
        const hole = new THREE.Mesh(holeGeo, holeMat);
        hole.position.set(startX + i * 0.26, 0.56, zPos);
        stripGroup.add(hole);
      }
      return stripGroup;
    }

    // Top Digital Headers: 10-pin (SCL..D8) and 8-pin (D7..D0)
    board.add(createHeaderStrip(10, -1.75, -2.48));
    board.add(createHeaderStrip(8, 1.05, -2.48));
    // Bottom Headers: 8-pin Power and 6-pin Analog In (A0..A5)
    board.add(createHeaderStrip(8, -1.45, 2.48));
    board.add(createHeaderStrip(6, 1.05, 2.48));

    // 6-Pin ICSP Male Header on Right Edge
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 2; c++) {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.45, 8), goldMat);
        pin.position.set(3.15 + c * 0.2, 0.32, -0.25 + r * 0.2);
        board.add(pin);
      }
    }

    // Onboard SMD LEDs: ON (Green), L/D13 (Amber/Red), TX & RX
    const onLed = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.12, 0.14),
      new THREE.MeshBasicMaterial({ color: 0x22c55e })
    );
    onLed.position.set(2.35, 0.16, -0.65);
    const onHalo = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.28 })
    );
    onHalo.position.copy(onLed.position);
    board.add(onLed, onHalo);

    d13LedMat = new THREE.MeshBasicMaterial({ color: 0x475569 });
    const d13Led = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.16), d13LedMat);
    d13Led.position.set(-0.95, 0.17, -1.35);

    d13HaloMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.0 });
    const d13Halo = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), d13HaloMat);
    d13Halo.position.copy(d13Led.position);
    board.add(d13Led, d13Halo);

    txLedMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
    const txLed = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.12), txLedMat);
    txLed.position.set(-0.95, 0.16, -0.65);

    rxLedMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
    const rxLed = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.12), rxLedMat);
    rxLed.position.set(-0.95, 0.16, -0.35);
    board.add(txLed, rxLed);

    tagPart(board, 'uno');
    return board;
  }

  const unoBoard = createUnoBoard();
  unoBoard.position.set(-3.9, 0.12, 0);
  rootGroup.add(unoBoard);

  // Uno Pin Coordinate Lookup in World Space (for accurate jumper wire connections!)
  function getUnoPinPos(pinName: string): THREE.Vector3 {
    const bx = -3.9;
    const by = 0.68;
    const map: Record<string, [number, number]> = {
      SCL: [-1.75, -2.48],
      SDA: [-1.49, -2.48],
      AREF: [-1.23, -2.48],
      GND_TOP: [-0.97, -2.48],
      D13: [-0.71, -2.48],
      D12: [-0.45, -2.48],
      D11: [-0.19, -2.48],
      D10: [0.07, -2.48],
      D9: [0.33, -2.48],
      D8: [0.59, -2.48],
      D7: [1.05, -2.48],
      D6: [1.31, -2.48],
      D5: [1.57, -2.48],
      D4: [1.83, -2.48],
      D3: [2.09, -2.48],
      D2: [2.35, -2.48],
      D1: [2.61, -2.48],
      D0: [2.87, -2.48],
      '3.3V': [-0.93, 2.48],
      '5V': [-0.67, 2.48],
      GND: [-0.41, 2.48],
      GND2: [-0.15, 2.48],
      VIN: [0.11, 2.48],
      A0: [1.05, 2.48],
      A1: [1.31, 2.48],
      A2: [1.57, 2.48],
      A3: [1.83, 2.48],
      A4: [2.09, 2.48],
      A5: [2.35, 2.48],
    };
    const [dx, dz] = map[pinName] || [0, 0];
    return new THREE.Vector3(bx + dx, by, dz);
  }

  // Procedural Half-Size Solderless Breadboard with Tie-Point Grid Texture
  let sharedBreadboardTex: THREE.CanvasTexture | null = null;
  function getBreadboardTexture(): THREE.CanvasTexture {
    if (sharedBreadboardTex) return sharedBreadboardTex;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 512, 768);

      // Center DIP ravine trench
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(238, 16, 36, 736);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.strokeRect(238, 16, 36, 736);

      // Power rails red (+) and blue (-) lines on left and right edges
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(24, 36);
      ctx.lineTo(24, 732);
      ctx.moveTo(446, 36);
      ctx.lineTo(446, 732);
      ctx.stroke();

      ctx.strokeStyle = '#2563eb';
      ctx.beginPath();
      ctx.moveTo(72, 36);
      ctx.lineTo(72, 732);
      ctx.moveTo(490, 36);
      ctx.lineTo(490, 732);
      ctx.stroke();

      // + and - symbols
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('+', 18, 26);
      ctx.fillText('+', 440, 26);
      ctx.fillStyle = '#2563eb';
      ctx.fillText('-', 66, 26);
      ctx.fillText('-', 484, 26);

      // Column headers a b c d e | f g h i j
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      const colsL = ['a', 'b', 'c', 'd', 'e'];
      const colsR = ['f', 'g', 'h', 'i', 'j'];
      colsL.forEach((c, i) => ctx.fillText(c, 122 + i * 24, 26));
      colsR.forEach((c, i) => ctx.fillText(c, 300 + i * 24, 26));

      // 30 Rows of tie-point holes
      for (let r = 0; r < 30; r++) {
        const y = 46 + r * 23.2;
        if ((r + 1) % 5 === 0 || r === 0) {
          ctx.fillStyle = '#64748b';
          ctx.font = 'bold 13px monospace';
          ctx.fillText(String(r + 1), 96, y + 4);
          ctx.fillText(String(r + 1), 418, y + 4);
        }
        ctx.fillStyle = '#1e293b';
        // Left 5 columns (a-e)
        for (let c = 0; c < 5; c++) {
          ctx.fillRect(117 + c * 24, y - 4, 9, 9);
        }
        // Right 5 columns (f-j)
        for (let c = 0; c < 5; c++) {
          ctx.fillRect(295 + c * 24, y - 4, 9, 9);
        }
        // Power rail holes
        if (r % 6 !== 5) {
          ctx.fillRect(36, y - 4, 9, 9);
          ctx.fillRect(54, y - 4, 9, 9);
          ctx.fillRect(456, y - 4, 9, 9);
          ctx.fillRect(474, y - 4, 9, 9);
        }
      }
    }
    sharedBreadboardTex = new THREE.CanvasTexture(canvas);
    sharedBreadboardTex.colorSpace = THREE.SRGBColorSpace;
    sharedBreadboardTex.anisotropy = 4;
    return sharedBreadboardTex;
  }

  function createBreadboardMesh(): THREE.Mesh {
    const bbTex = getBreadboardTexture();
    const mats = [
      whitePlasticMat,
      whitePlasticMat,
      new THREE.MeshStandardMaterial({ map: bbTex, roughness: 0.4 }),
      whitePlasticMat,
      whitePlasticMat,
      whitePlasticMat,
    ];
    const bb = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.36, 7.8), mats);
    bb.position.set(4.2, 0.18, 0);
    bb.receiveShadow = true;
    bb.castShadow = true;
    tagPart(bb, 'breadboard');
    return bb;
  }

  // Reusable Component Builders
  // 1. 4-Band Color-Coded Axial Resistor
  function createResistorMesh(
    pos: THREE.Vector3,
    ohms: '330' | '10k',
    rotationY = 0
  ): THREE.Group {
    const g = new THREE.Group();
    g.position.copy(pos);
    g.rotation.y = rotationY;

    // Metal axial leads going into breadboard
    const leadHoriz = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.028, 1.3, 8),
      metalMat
    );
    leadHoriz.rotation.z = Math.PI / 2;
    leadHoriz.position.y = 0.26;
    const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.32, 8), metalMat);
    legL.position.set(-0.65, 0.1, 0);
    const legR = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.32, 8), metalMat);
    legR.position.set(0.65, 0.1, 0);
    g.add(leadHoriz, legL, legR);

    // Ceramic resistor body
    const bodyMat = new THREE.MeshStandardMaterial({
      color: ohms === '330' ? 0xfde68a : 0xbae6fd,
      roughness: 0.35,
    });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.72, 16), bodyMat);
    body.rotation.z = Math.PI / 2;
    body.position.y = 0.26;
    g.add(body);

    // 4 Color Bands
    // 330 ohm: Orange, Orange, Brown, Gold
    // 10k ohm: Brown, Black, Orange, Gold
    const bandColors =
      ohms === '330'
        ? [0xf97316, 0xf97316, 0x78350f, 0xeab308]
        : [0x78350f, 0x111827, 0xf97316, 0xeab308];
    const bandOffsets = [-0.22, -0.09, 0.04, 0.22];
    bandColors.forEach((col, i) => {
      const band = new THREE.Mesh(
        new THREE.CylinderGeometry(0.136, 0.136, 0.055, 16),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.3, metalness: i === 3 ? 0.7 : 0.1 })
      );
      band.rotation.z = Math.PI / 2;
      band.position.set(bandOffsets[i], 0.26, 0);
      g.add(band);
    });

    tagPart(g, 'resistor');
    return g;
  }

  // 2. Realistic 5mm Translucent LED with Internal Anvil/Post & Halo Glow
  function createLedAssembly(
    pos: THREE.Vector3,
    baseColorHex: number,
    partId = 'led'
  ): {
    group: THREE.Group;
    domeMat: THREE.MeshStandardMaterial;
    haloMat: THREE.MeshBasicMaterial;
  } {
    const g = new THREE.Group();
    g.position.copy(pos);

    // Anode (+) & Cathode (-) vertical leads
    const anodeLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.55, 8), metalMat);
    anodeLeg.position.set(-0.12, 0.25, 0);
    const cathodeLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.55, 8), metalMat);
    cathodeLeg.position.set(0.12, 0.25, 0);
    // Internal anvil & post inside the dome
    const anvil = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.18, 8), metalMat);
    anvil.rotation.x = Math.PI;
    anvil.position.set(0.08, 0.62, 0);
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.04), metalMat);
    post.position.set(-0.08, 0.6, 0);
    g.add(anodeLeg, cathodeLeg, anvil, post);

    const domeMat = new THREE.MeshStandardMaterial({
      color: baseColorHex,
      emissive: 0x000000,
      emissiveIntensity: 1.4,
      roughness: 0.15,
      metalness: 0.05,
      transparent: true,
      opacity: 0.86,
    });

    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.42, 20), domeMat);
    cyl.position.y = 0.65;
    const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.08, 20), domeMat);
    flange.position.y = 0.44;
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.26, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      domeMat
    );
    dome.position.y = 0.86;
    g.add(cyl, flange, dome);

    const haloMat = new THREE.MeshBasicMaterial({
      color: baseColorHex,
      transparent: true,
      opacity: 0.0,
    });
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.58, 16, 16), haloMat);
    halo.position.y = 0.78;
    g.add(halo);

    tagPart(g, partId);
    return { group: g, domeMat, haloMat };
  }

  // 3. Jumper Wire with DuPont Connector Housings & Animated Signal Pulse
  let wirePulses: WirePulseItem[] = [];

  function createJumperWire(
    start: THREE.Vector3,
    end: THREE.Vector3,
    colorHex: number,
    options?: { activePin?: string; alwaysActive?: boolean }
  ): THREE.Group {
    const wireGroup = new THREE.Group();

    // Black DuPont connector pins at both ends
    const dupontGeo = new THREE.BoxGeometry(0.14, 0.36, 0.14);
    const housingStart = new THREE.Mesh(dupontGeo, plasticDarkMat);
    housingStart.position.set(start.x, start.y + 0.12, start.z);
    const housingEnd = new THREE.Mesh(dupontGeo, plasticDarkMat);
    housingEnd.position.set(end.x, end.y + 0.12, end.z);
    wireGroup.add(housingStart, housingEnd);

    const p0 = new THREE.Vector3(start.x, start.y + 0.28, start.z);
    const p3 = new THREE.Vector3(end.x, end.y + 0.28, end.z);
    const dist = p0.distanceTo(p3);
    const lift = Math.min(2.6, Math.max(0.9, dist * 0.32));

    const p1 = new THREE.Vector3().lerpVectors(p0, p3, 0.28);
    p1.y += lift;
    const p2 = new THREE.Vector3().lerpVectors(p0, p3, 0.72);
    p2.y += lift;

    const curve = new THREE.CubicBezierCurve3(p0, p1, p2, p3);
    const tubeGeo = new THREE.TubeGeometry(curve, 28, 0.052, 10, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.35,
      metalness: 0.08,
    });
    const wireMesh = new THREE.Mesh(tubeGeo, tubeMat);
    wireMesh.castShadow = true;
    wireGroup.add(wireMesh);

    // Signal flow pulse sphere along wire
    const pulseMat = new THREE.MeshBasicMaterial({
      color: colorHex === 0x334155 ? 0x38bdf8 : 0xffffff,
      transparent: true,
      opacity: 0.95,
    });
    const pulseMesh = new THREE.Mesh(new THREE.SphereGeometry(0.095, 10, 10), pulseMat);
    pulseMesh.visible = false;
    wireGroup.add(pulseMesh);

    wirePulses.push({
      curve,
      mesh: pulseMesh,
      speed: 0.65,
      offset: (wirePulses.length * 0.23) % 1,
      activePin: options?.activePin,
      alwaysActive: options?.alwaysActive,
    });

    return wireGroup;
  }

  // Recursive Memory Disposal Helper (prevents GPU leaks when switching lessons)
  function disposeHierarchy(obj: THREE.Object3D) {
    const sharedMats = new Set<THREE.Material>([
      pcbTealMat,
      darkPcbMat,
      chipMat,
      metalMat,
      brushedSteelMat,
      goldMat,
      copperMat,
      plasticDarkMat,
      whitePlasticMat,
    ]);

    obj.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }
      if (mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) {
          if (!sharedMats.has(m)) {
            const stdMat = m as THREE.MeshStandardMaterial;
            if (stdMat.map && stdMat.map !== sharedBreadboardTex) {
              stdMat.map.dispose();
            }
            m.dispose();
          }
        }
      }
    });
  }

  // Build Specific 3D Equipment Assemblies for All 16 Lessons
  let lessonGroup: THREE.Group | null = null;
  let dynamicMeshes: Record<string, any> = {};
  let currentLessonId = '';
  let lastIsRunning = false;
  let lastOutput: Record<string, any> = {};

  function buildLessonComponents(lesson: LessonData): THREE.Group {
    const group = new THREE.Group();
    dynamicMeshes = {};
    wirePulses = [];

    if (lesson.id !== 'board') {
      group.add(createBreadboardMesh());
    }

    switch (lesson.id) {
      case 'board': {
        // Callout badges highlighting key sections on the Uno R3 board
        const b1 = createCalloutSprite('USB Serial & 5V', 'rgba(15,23,42,0.9)', '#38bdf8');
        b1.position.set(-7.0, 1.6, -1.25);
        const b2 = createCalloutSprite('DC 7–12V Jack', 'rgba(15,23,42,0.9)', '#f59e0b');
        b2.position.set(-6.95, 1.5, 1.75);
        const b3 = createCalloutSprite('ATmega328P MCU', 'rgba(15,23,42,0.9)', '#a855f7');
        b3.position.set(-2.8, 1.4, 0.55);
        const b4 = createCalloutSprite('Digital D0–D13 (PWM~)', 'rgba(15,23,42,0.9)', '#0284c7', '#f8fafc', 2.0);
        b4.position.set(-3.5, 1.55, -2.55);
        const b5 = createCalloutSprite('5V / GND / Analog A0–A5', 'rgba(15,23,42,0.9)', '#ef4444', '#f8fafc', 2.1);
        b5.position.set(-3.5, 1.55, 2.55);
        const b6 = createCalloutSprite('LED_BUILTIN (D13)', 'rgba(15,23,42,0.9)', '#22c55e');
        b6.position.set(-4.85, 1.25, -1.35);
        group.add(b1, b2, b3, b4, b5, b6);
        break;
      }

      case 'blink': {
        const ledObj = createLedAssembly(new THREE.Vector3(4.2, 0.36, -1.3), 0xef4444, 'led');
        group.add(ledObj.group);
        dynamicMeshes.extLed = ledObj.domeMat;
        dynamicMeshes.extLedHalo = ledObj.haloMat;

        const res = createResistorMesh(new THREE.Vector3(3.4, 0.36, -1.3), '330');
        group.add(res);

        const lblLed = createCalloutSprite('LED (D13)', 'rgba(15,23,42,0.88)', '#ef4444', '#ffffff', 1.35);
        lblLed.position.set(4.2, 1.65, -1.3);
        const lblRes = createCalloutSprite('R1: 330 Ω', 'rgba(15,23,42,0.88)', '#f59e0b', '#ffffff', 1.3);
        lblRes.position.set(3.4, 1.15, -0.5);
        group.add(lblLed, lblRes);

        group.add(
          createJumperWire(getUnoPinPos('D13'), new THREE.Vector3(2.75, 0.36, -1.3), 0x0284c7, {
            activePin: 'D13',
          })
        );
        group.add(
          createJumperWire(new THREE.Vector3(4.35, 0.36, -1.3), getUnoPinPos('GND'), 0x334155, {
            activePin: 'D13',
          })
        );
        break;
      }

      case 'button': {
        // Onboard LED_BUILTIN (D13) + 4-pin Tactile Push Button straddling center trench
        const lblBuiltin = createCalloutSprite('LED_BUILTIN (D13)', 'rgba(15,23,42,0.9)', '#f59e0b', '#ffffff', 1.65);
        lblBuiltin.position.set(-4.85, 1.25, -1.35);
        group.add(lblBuiltin);

        // 6x6mm Tactile Switch
        const swGroup = new THREE.Group();
        swGroup.position.set(4.2, 0.36, 0.2);
        const swBase = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.28, 0.95), plasticDarkMat);
        swBase.position.y = 0.2;
        const swPlate = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.04, 0.88), metalMat);
        swPlate.position.y = 0.35;
        const plungerMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.25 });
        const plunger = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.26, 20), plungerMat);
        plunger.position.y = 0.45;
        // 4 corner legs straddling trench
        for (const lx of [-0.38, 0.38]) {
          for (const lz of [-0.35, 0.35]) {
            const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.28, 0.05), metalMat);
            leg.position.set(lx, 0.08, lz);
            swGroup.add(leg);
          }
        }
        swGroup.add(swBase, swPlate, plunger);
        tagPart(swGroup, 'button');
        group.add(swGroup);
        dynamicMeshes.btnActuator = plunger;

        const lblBtn = createCalloutSprite('SW1 (D2 Pull-Up)', 'rgba(15,23,42,0.88)', '#38bdf8', '#ffffff', 1.6);
        lblBtn.position.set(4.2, 1.35, 0.2);
        group.add(lblBtn);

        group.add(
          createJumperWire(getUnoPinPos('D2'), new THREE.Vector3(3.8, 0.36, -0.15), 0x06b6d4, {
            alwaysActive: true,
          })
        );
        group.add(
          createJumperWire(new THREE.Vector3(4.6, 0.36, 0.55), getUnoPinPos('GND'), 0x334155, {
            alwaysActive: true,
          })
        );
        break;
      }

      case 'knob': {
        // 10k Rotary Potentiometer + PWM Dimmed LED on D9
        const potGroup = new THREE.Group();
        potGroup.position.set(4.2, 0.36, -0.9);

        const potBase = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.45, 28), brushedSteelMat);
        potBase.position.y = 0.28;
        const bushing = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.3, 16), goldMat);
        bushing.position.y = 0.58;

        // Rotating Shaft + Pointer Line
        const shaftPivot = new THREE.Group();
        shaftPivot.position.y = 0.72;
        const knobCyl = new THREE.Mesh(
          new THREE.CylinderGeometry(0.42, 0.46, 0.55, 24),
          new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3 })
        );
        const marker = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.58, 0.38), whitePlasticMat);
        marker.position.set(0, 0.02, -0.14);
        shaftPivot.add(knobCyl, marker);

        // 3 Terminal pins
        for (let i = -1; i <= 1; i++) {
          const pin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.06), metalMat);
          pin.position.set(i * 0.38, 0.12, 0.75);
          potGroup.add(pin);
        }

        potGroup.add(potBase, bushing, shaftPivot);
        tagPart(potGroup, 'potentiometer');
        group.add(potGroup);
        dynamicMeshes.potShaft = shaftPivot;

        // PWM LED on D9 + 330 ohm resistor
        const pwmLed = createLedAssembly(new THREE.Vector3(4.2, 0.36, 1.8), 0xf59e0b, 'led');
        group.add(pwmLed.group);
        dynamicMeshes.pwmLed = pwmLed.domeMat;
        dynamicMeshes.pwmLedHalo = pwmLed.haloMat;

        const res = createResistorMesh(new THREE.Vector3(3.4, 0.36, 1.8), '330');
        group.add(res);

        const lblPot = createCalloutSprite('10kΩ Pot (A0)', 'rgba(15,23,42,0.88)', '#7c3aed', '#ffffff', 1.5);
        lblPot.position.set(4.2, 1.85, -0.9);
        const lblPwm = createCalloutSprite('PWM LED (~D9)', 'rgba(15,23,42,0.88)', '#f59e0b', '#ffffff', 1.5);
        lblPwm.position.set(4.2, 1.65, 1.8);
        group.add(lblPot, lblPwm);

        group.add(createJumperWire(getUnoPinPos('5V'), new THREE.Vector3(3.82, 0.36, -0.15), 0xdc2626, { alwaysActive: true }));
        group.add(createJumperWire(new THREE.Vector3(4.2, 0.36, -0.15), getUnoPinPos('A0'), 0x7c3aed, { alwaysActive: true }));
        group.add(createJumperWire(new THREE.Vector3(4.58, 0.36, -0.15), getUnoPinPos('GND'), 0x334155));
        group.add(createJumperWire(getUnoPinPos('D9'), new THREE.Vector3(2.75, 0.36, 1.8), 0xf59e0b, { activePin: 'D9' }));
        break;
      }

      case 'rgb': {
        // 4-Pin Common-Cathode Clear RGB LED + Three 330Ω Resistors
        const rgbGroup = new THREE.Group();
        rgbGroup.position.set(4.5, 0.36, 0);

        const pinColors = [0xef4444, 0x94a3b8, 0x22c55e, 0x3b82f6];
        for (let i = 0; i < 4; i++) {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.65, 8), metalMat);
          leg.position.set(0, 0.3, -0.45 + i * 0.3);
          const ring = new THREE.Mesh(
            new THREE.CylinderGeometry(0.045, 0.045, 0.08, 8),
            new THREE.MeshBasicMaterial({ color: pinColors[i] })
          );
          ring.position.set(0, 0.16, -0.45 + i * 0.3);
          rgbGroup.add(leg, ring);
        }

        const rgbDomeMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0x804000,
          emissiveIntensity: 1.5,
          roughness: 0.1,
          transparent: true,
          opacity: 0.88,
        });
        const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.52, 24), rgbDomeMat);
        cyl.position.y = 0.82;
        const dome = new THREE.Mesh(
          new THREE.SphereGeometry(0.38, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
          rgbDomeMat
        );
        dome.position.y = 1.08;
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0x804000,
          transparent: true,
          opacity: 0.35,
        });
        const halo = new THREE.Mesh(new THREE.SphereGeometry(0.85, 20, 20), haloMat);
        halo.position.y = 0.95;

        rgbGroup.add(cyl, dome, halo);
        tagPart(rgbGroup, 'rgb');
        group.add(rgbGroup);
        dynamicMeshes.rgbDome = rgbDomeMat;
        dynamicMeshes.rgbHalo = haloMat;

        // 3 Individual 330 ohm resistors for R, G, B
        group.add(createResistorMesh(new THREE.Vector3(3.3, 0.36, -0.9), '330'));
        group.add(createResistorMesh(new THREE.Vector3(3.3, 0.36, 0.15), '330'));
        group.add(createResistorMesh(new THREE.Vector3(3.3, 0.36, 0.9), '330'));

        const lblRgb = createCalloutSprite('RGB LED (R, K, G, B)', 'rgba(15,23,42,0.9)', '#ec4899', '#ffffff', 1.7);
        lblRgb.position.set(4.5, 2.0, 0);
        group.add(lblRgb);

        group.add(createJumperWire(getUnoPinPos('D9'), new THREE.Vector3(2.65, 0.36, -0.9), 0xef4444, { activePin: 'D9' }));
        group.add(createJumperWire(getUnoPinPos('D10'), new THREE.Vector3(2.65, 0.36, 0.15), 0x22c55e, { activePin: 'D10' }));
        group.add(createJumperWire(getUnoPinPos('D11'), new THREE.Vector3(2.65, 0.36, 0.9), 0x3b82f6, { activePin: 'D11' }));
        group.add(createJumperWire(new THREE.Vector3(4.5, 0.36, -0.15), getUnoPinPos('GND'), 0x334155));
        break;
      }

      case 'light': {
        // CdS Photoresistor (LDR) with serpentine track + 10k pull-down resistor + 3D Sun source + LED
        const ldrGroup = new THREE.Group();
        ldrGroup.position.set(4.2, 0.36, 1.3);

        const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8), metalMat);
        leg1.position.set(-0.18, 0.25, 0);
        const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8), metalMat);
        leg2.position.set(0.18, 0.25, 0);

        // Serpentine CdS face texture
        const ldrCan = document.createElement('canvas');
        ldrCan.width = 128;
        ldrCan.height = 128;
        const lctx = ldrCan.getContext('2d');
        if (lctx) {
          lctx.fillStyle = '#fde68a';
          lctx.beginPath();
          lctx.arc(64, 64, 60, 0, Math.PI * 2);
          lctx.fill();
          lctx.strokeStyle = '#c2410c';
          lctx.lineWidth = 8;
          for (let y = 28; y <= 100; y += 18) {
            lctx.beginPath();
            lctx.moveTo(26, y);
            lctx.lineTo(102, y);
            lctx.stroke();
          }
        }
        const ldrTex = new THREE.CanvasTexture(ldrCan);
        ldrTex.colorSpace = THREE.SRGBColorSpace;
        const wafer = new THREE.Mesh(
          new THREE.CylinderGeometry(0.36, 0.36, 0.14, 24),
          [
            new THREE.MeshStandardMaterial({ color: 0xd97706 }),
            new THREE.MeshStandardMaterial({ map: ldrTex, roughness: 0.25 }),
            new THREE.MeshStandardMaterial({ color: 0xfde68a }),
          ]
        );
        wafer.position.y = 0.55;
        ldrGroup.add(leg1, leg2, wafer);
        tagPart(ldrGroup, 'ldr');
        group.add(ldrGroup);

        // 3D Ambient Light / Sun Indicator above LDR
        const sunMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
        const sunHaloMat = new THREE.MeshBasicMaterial({
          color: 0xfef08a,
          transparent: true,
          opacity: 0.35,
        });
        const sunGroup = new THREE.Group();
        const sunCore = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), sunMat);
        const sunHalo = new THREE.Mesh(new THREE.SphereGeometry(0.58, 16, 16), sunHaloMat);
        sunGroup.add(sunCore, sunHalo);
        sunGroup.position.set(4.2, 2.35, 1.3);
        tagPart(sunGroup, 'ldr');
        group.add(sunGroup);
        dynamicMeshes.sunMat = sunMat;
        dynamicMeshes.sunHaloMat = sunHaloMat;
        dynamicMeshes.sunGroup = sunGroup;

        // 10k Pull-down Resistor
        group.add(createResistorMesh(new THREE.Vector3(3.3, 0.36, 1.3), '10k'));

        // Onboard LED_BUILTIN (D13) Night-light Indicator Callout
        const lblBuiltin = createCalloutSprite('LED_BUILTIN (D13)', 'rgba(15,23,42,0.9)', '#f59e0b', '#ffffff', 1.65);
        lblBuiltin.position.set(-4.85, 1.25, -1.35);
        group.add(lblBuiltin);

        const lblLdr = createCalloutSprite('LDR + 10kΩ Divider (A0)', 'rgba(15,23,42,0.9)', '#eab308', '#ffffff', 1.75);
        lblLdr.position.set(4.2, 1.45, 2.2);
        group.add(lblLdr);

        group.add(createJumperWire(getUnoPinPos('5V'), new THREE.Vector3(4.4, 0.36, 1.3), 0xdc2626, { alwaysActive: true }));
        group.add(createJumperWire(new THREE.Vector3(4.0, 0.36, 1.3), getUnoPinPos('A0'), 0x06b6d4, { alwaysActive: true }));
        group.add(createJumperWire(new THREE.Vector3(2.65, 0.36, 1.3), getUnoPinPos('GND'), 0x334155));
        break;
      }

      case 'sensor':
      case 'project': {
        // HC-SR04 Ultrasonic Module facing right (+X) toward a movable 3D Target Obstacle!
        const hcGroup = new THREE.Group();
        hcGroup.position.set(2.8, 0.36, -0.6);

        const hcPcb = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.65, 3.6), darkPcbMat);
        hcPcb.position.y = 1.05;
        hcGroup.add(hcPcb);

        // Two ultrasonic cans (T & R) facing +X
        for (const zOff of [-0.95, 0.95]) {
          const can = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.75, 24), metalMat);
          can.rotation.z = Math.PI / 2;
          can.position.set(0.42, 1.05, zOff);
          const meshGrid = new THREE.Mesh(
            new THREE.CylinderGeometry(0.48, 0.48, 0.78, 20),
            new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7, metalness: 0.5 })
          );
          meshGrid.rotation.z = Math.PI / 2;
          meshGrid.position.set(0.42, 1.05, zOff);
          hcGroup.add(can, meshGrid);
        }

        // 4 Header pins into breadboard
        for (let i = 0; i < 4; i++) {
          const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8), goldMat);
          pin.position.set(0, 0.15, -0.45 + i * 0.3);
          hcGroup.add(pin);
        }

        tagPart(hcGroup, 'ultrasonic');
        group.add(hcGroup);

        // Animated Ultrasonic Acoustic Wave Rings traveling along +X
        const waveRings: THREE.Mesh[] = [];
        for (let i = 0; i < 3; i++) {
          const ringGeo = new THREE.RingGeometry(0.25 + i * 0.15, 0.33 + i * 0.15, 24);
          ringGeo.rotateY(Math.PI / 2);
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.65,
          });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.position.set(3.8 + i * 0.8, 1.4, -0.6);
          group.add(ring);
          waveRings.push(ring);
        }
        dynamicMeshes.sonarRings = waveRings;

        // Movable 3D Target Obstacle Wall / Car
        const obstacleGroup = new THREE.Group();
        const wallMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.35,
          transparent: true,
          opacity: 0.95,
        });
        const wall = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.2, 3.2), wallMat);
        wall.position.y = 1.1;
        wall.castShadow = true;
        const stripe = new THREE.Mesh(
          new THREE.BoxGeometry(0.38, 0.35, 3.0),
          new THREE.MeshBasicMaterial({ color: 0x1e293b })
        );
        stripe.position.y = 1.1;
        obstacleGroup.add(wall, stripe);

        const distSprite = createCalloutSprite('30.0 cm', 'rgba(15,23,42,0.92)', '#06b6d4', '#ffffff', 1.5);
        distSprite.position.set(0, 2.65, 0);
        obstacleGroup.add(distSprite);
        dynamicMeshes.distSprite = distSprite;

        obstacleGroup.position.set(6.5, 0.36, -0.6);
        tagPart(obstacleGroup, 'obstacle');
        group.add(obstacleGroup);
        dynamicMeshes.obstacleGroup = obstacleGroup;
        dynamicMeshes.obstacleWallMat = wallMat;

        const lblHc = createCalloutSprite('HC-SR04 (Trig D9 / Echo D10)', 'rgba(15,23,42,0.9)', '#0284c7', '#ffffff', 1.85);
        lblHc.position.set(2.8, 2.5, -0.6);
        group.add(lblHc);

        group.add(createJumperWire(getUnoPinPos('5V'), new THREE.Vector3(2.8, 0.36, -1.05), 0xdc2626, { alwaysActive: true }));
        group.add(createJumperWire(getUnoPinPos('D9'), new THREE.Vector3(2.8, 0.36, -0.75), 0x0284c7, { alwaysActive: true }));
        group.add(createJumperWire(new THREE.Vector3(2.8, 0.36, -0.45), getUnoPinPos('D10'), 0x06b6d4, { alwaysActive: true }));
        group.add(createJumperWire(new THREE.Vector3(2.8, 0.36, -0.15), getUnoPinPos('GND'), 0x334155));

        if (lesson.id === 'project') {
          // 3 Traffic Light LEDs (Red D4, Yellow D3, Green D2) + 3 x 330 ohm resistors
          const ledSpecs = [
            { col: 0xef4444, x: 3.2, pin: 'D4' },
            { col: 0xeab308, x: 4.2, pin: 'D3' },
            { col: 0x22c55e, x: 5.2, pin: 'D2' },
          ];
          dynamicMeshes.projectLeds = [];
          dynamicMeshes.projectHalos = [];
          ledSpecs.forEach((sp) => {
            const lObj = createLedAssembly(new THREE.Vector3(sp.x, 0.36, 2.3), sp.col, 'traffic-led');
            group.add(lObj.group);
            dynamicMeshes.projectLeds.push(lObj.domeMat);
            dynamicMeshes.projectHalos.push(lObj.haloMat);
            group.add(createResistorMesh(new THREE.Vector3(sp.x, 0.36, 1.55), '330', Math.PI / 2));
            group.add(createJumperWire(getUnoPinPos(sp.pin), new THREE.Vector3(sp.x, 0.36, 1.1), sp.col, { activePin: sp.pin }));
          });
          const lblTraffic = createCalloutSprite('Parking Zone LEDs (D4/D3/D2)', 'rgba(15,23,42,0.9)', '#22c55e', '#ffffff', 1.8);
          lblTraffic.position.set(4.2, 1.75, 2.3);
          group.add(lblTraffic);
        }
        break;
      }

      case 'sound': {
        // Passive Piezo Buzzer on D8 + Expanding Acoustic Sound Wave Rings
        const bzGroup = new THREE.Group();
        bzGroup.position.set(4.2, 0.36, 0);

        const bzBody = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.68, 28), chipMat);
        bzBody.position.y = 0.38;
        const bzHole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.22, 0.22, 0.7, 16),
          new THREE.MeshBasicMaterial({ color: 0xd97706 })
        );
        bzHole.position.y = 0.38;
        bzGroup.add(bzBody, bzHole);

        const soundRings: THREE.Mesh[] = [];
        for (let i = 0; i < 3; i++) {
          const rGeo = new THREE.RingGeometry(0.45 + i * 0.35, 0.53 + i * 0.35, 28);
          rGeo.rotateX(-Math.PI / 2);
          const rMat = new THREE.MeshBasicMaterial({
            color: 0xa855f7,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.0,
          });
          const rMesh = new THREE.Mesh(rGeo, rMat);
          rMesh.position.y = 0.85 + i * 0.25;
          bzGroup.add(rMesh);
          soundRings.push(rMesh);
        }
        dynamicMeshes.soundRings = soundRings;

        tagPart(bzGroup, 'piezo');
        group.add(bzGroup);

        const lblBz = createCalloutSprite('Passive Piezo (D8)', 'rgba(15,23,42,0.9)', '#a855f7', '#ffffff', 1.55);
        lblBz.position.set(4.2, 1.85, 0);
        group.add(lblBz);

        group.add(createJumperWire(getUnoPinPos('D8'), new THREE.Vector3(3.8, 0.36, 0), 0x7c3aed, { activePin: 'D8' }));
        group.add(createJumperWire(new THREE.Vector3(4.6, 0.36, 0), getUnoPinPos('GND'), 0x334155));
        break;
      }

      case 'piano': {
        // 8 Tactile Note Keys (D2..D9) along the breadboard + Piezo Speaker on D10
        dynamicMeshes.pianoKeys = [];
        const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2'];
        const keyColors = [0xef4444, 0xf97316, 0xeab308, 0x22c55e, 0x06b6d4, 0x3b82f6, 0x8b5cf6, 0xec4899];

        for (let i = 0; i < 8; i++) {
          const zPos = -2.8 + i * 0.8;
          const kGroup = new THREE.Group();
          kGroup.position.set(3.8, 0.36, zPos);

          const kBase = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.24, 0.62), plasticDarkMat);
          kBase.position.y = 0.16;
          const actuatorMat = new THREE.MeshStandardMaterial({
            color: keyColors[i],
            roughness: 0.3,
          });
          const actuator = new THREE.Mesh(
            new THREE.CylinderGeometry(0.18, 0.18, 0.24, 16),
            actuatorMat
          );
          actuator.position.y = 0.36;
          kGroup.add(kBase, actuator);
          tagPart(kGroup, 'button');
          group.add(kGroup);
          dynamicMeshes.pianoKeys.push({ mesh: actuator, mat: actuatorMat, baseColor: keyColors[i] });

          if (i % 2 === 0 || i === 7) {
            const pinName = `D${2 + i}`;
            group.add(createJumperWire(getUnoPinPos(pinName), new THREE.Vector3(3.4, 0.36, zPos), keyColors[i]));
          }
        }

        // Piezo speaker on D10
        const spk = new THREE.Group();
        spk.position.set(5.3, 0.36, 0);
        const spkBody = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.55, 24), chipMat);
        spkBody.position.y = 0.3;
        const spkHole = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.58, 16), goldMat);
        spkHole.position.y = 0.3;
        spk.add(spkBody, spkHole);
        tagPart(spk, 'piezo');
        group.add(spk);

        const lblPiano = createCalloutSprite(`8 Keys (${noteNames.join(' ')})`, 'rgba(15,23,42,0.9)', '#06b6d4', '#ffffff', 1.75);
        lblPiano.position.set(3.8, 1.45, 0);
        group.add(lblPiano);

        group.add(createJumperWire(getUnoPinPos('D10'), new THREE.Vector3(5.3, 0.36, -0.4), 0x06b6d4, { activePin: 'D10' }));
        break;
      }

      case 'motor': {
        // Brushed DC Motor with 3-Blade Spinning Impeller + NPN Transistor Driver + 1N4007 Flyback Diode + External Supply
        const motorGroup = new THREE.Group();
        motorGroup.position.set(4.8, 1.25, -1.4);

        const can = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 1.65, 24), brushedSteelMat);
        can.rotation.z = Math.PI / 2;
        can.castShadow = true;
        const endCap = new THREE.Mesh(new THREE.CylinderGeometry(0.74, 0.74, 0.2, 24), plasticDarkMat);
        endCap.rotation.z = Math.PI / 2;
        endCap.position.x = -0.85;

        // Output Shaft & 3-Blade Cooling Fan Rotor (rotates in animation loop!)
        const rotorGroup = new THREE.Group();
        rotorGroup.position.x = 1.05;
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.6, 12), metalMat);
        shaft.rotation.z = Math.PI / 2;
        const hub = new THREE.Mesh(
          new THREE.CylinderGeometry(0.24, 0.24, 0.16, 16),
          new THREE.MeshStandardMaterial({ color: 0x059669 })
        );
        hub.rotation.z = Math.PI / 2;
        hub.position.x = 0.15;
        rotorGroup.add(shaft, hub);

        for (let b = 0; b < 3; b++) {
          const bladePivot = new THREE.Group();
          bladePivot.rotation.x = (b * Math.PI * 2) / 3;
          const blade = new THREE.Mesh(
            new THREE.BoxGeometry(0.06, 0.75, 0.24),
            new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.25 })
          );
          blade.position.set(0.15, 0.45, 0);
          bladePivot.add(blade);
          rotorGroup.add(bladePivot);
        }

        motorGroup.add(can, endCap, rotorGroup);
        tagPart(motorGroup, 'dc-motor');
        group.add(motorGroup);
        dynamicMeshes.motorRotor = rotorGroup;

        // TO-220 Transistor / MOSFET Driver (Q1)
        const drvGroup = new THREE.Group();
        drvGroup.position.set(3.5, 0.36, 0.85);
        const to220Body = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.62, 0.22), chipMat);
        to220Body.position.y = 0.55;
        const tab = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35, 0.06), metalMat);
        tab.position.set(0, 0.92, -0.08);
        for (let i = -1; i <= 1; i++) {
          const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.35, 0.05), metalMat);
          leg.position.set(i * 0.16, 0.15, 0);
          drvGroup.add(leg);
        }
        drvGroup.add(to220Body, tab);
        tagPart(drvGroup, 'driver');
        group.add(drvGroup);

        // 1N4007 Flyback Diode (Black DO-41 cylinder + Silver Cathode Band)
        const diodeGroup = new THREE.Group();
        diodeGroup.position.set(4.3, 0.36, -0.15);
        const dLead = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.1, 8), metalMat);
        dLead.rotation.z = Math.PI / 2;
        dLead.position.y = 0.26;
        const dBody = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.55, 16), chipMat);
        dBody.rotation.z = Math.PI / 2;
        dBody.position.y = 0.26;
        const cathodeBand = new THREE.Mesh(new THREE.CylinderGeometry(0.126, 0.126, 0.11, 16), metalMat);
        cathodeBand.rotation.z = Math.PI / 2;
        cathodeBand.position.set(0.16, 0.26, 0);
        diodeGroup.add(dLead, dBody, cathodeBand);
        tagPart(diodeGroup, 'diode');
        group.add(diodeGroup);

        // External 6V Battery Supply Pack
        const batGroup = new THREE.Group();
        batGroup.position.set(6.4, 0.42, 2.2);
        const batBox = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 2.2), plasticDarkMat);
        const batLbl = createCalloutSprite('EXT 6V Supply', 'rgba(15,23,42,0.9)', '#dc2626', '#ffffff', 1.4);
        batLbl.position.set(0, 0.9, 0);
        batGroup.add(batBox, batLbl);
        tagPart(batGroup, 'supply');
        group.add(batGroup);

        const lblMotor = createCalloutSprite('DC Motor + Flyback Diode', 'rgba(15,23,42,0.9)', '#10b981', '#ffffff', 1.75);
        lblMotor.position.set(4.8, 2.35, -1.4);
        group.add(lblMotor);

        group.add(createJumperWire(getUnoPinPos('D5'), new THREE.Vector3(3.34, 0.36, 0.85), 0x0284c7, { activePin: 'D5' }));
        group.add(createJumperWire(new THREE.Vector3(5.8, 0.7, 1.6), new THREE.Vector3(4.6, 0.36, -0.15), 0xdc2626, { alwaysActive: true }));
        group.add(createJumperWire(new THREE.Vector3(3.66, 0.36, 0.85), getUnoPinPos('GND'), 0x334155));
        break;
      }

      case 'heat': {
        // TMP36 in TO-92 Package + 3D Thermal Column Indicator
        const tmpGroup = new THREE.Group();
        tmpGroup.position.set(4.2, 0.36, 0);

        const to92Geo = new THREE.CylinderGeometry(0.34, 0.34, 0.58, 20, 1, false, 0, Math.PI);
        const to92 = new THREE.Mesh(to92Geo, chipMat);
        to92.position.y = 0.52;
        const flatFace = new THREE.Mesh(new THREE.PlaneGeometry(0.68, 0.58), chipMat);
        flatFace.position.y = 0.52;
        flatFace.rotation.y = -Math.PI / 2;

        for (let i = -1; i <= 1; i++) {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.45, 8), metalMat);
          leg.position.set(0, 0.2, i * 0.22);
          tmpGroup.add(leg);
        }

        // Thermal Aura / Thermometer Column beside TMP36
        const auraMat = new THREE.MeshBasicMaterial({
          color: 0xf97316,
          transparent: true,
          opacity: 0.32,
        });
        const aura = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), auraMat);
        aura.position.y = 0.55;
        tmpGroup.add(to92, flatFace, aura);
        tagPart(tmpGroup, 'tmp36');
        group.add(tmpGroup);
        dynamicMeshes.heatAura = auraMat;

        const lblTmp = createCalloutSprite('TMP36 (+Vs, Vout→A0, GND)', 'rgba(15,23,42,0.9)', '#f97316', '#ffffff', 1.85);
        lblTmp.position.set(4.2, 1.65, 0);
        group.add(lblTmp);
        dynamicMeshes.heatLabel = lblTmp;

        group.add(createJumperWire(getUnoPinPos('5V'), new THREE.Vector3(4.2, 0.36, -0.25), 0xdc2626, { alwaysActive: true }));
        group.add(createJumperWire(new THREE.Vector3(4.2, 0.36, 0), getUnoPinPos('A0'), 0xf59e0b, { alwaysActive: true }));
        group.add(createJumperWire(new THREE.Vector3(4.2, 0.36, 0.25), getUnoPinPos('GND'), 0x334155));
        break;
      }

      case 'servo': {
        // SG90 Micro Servo with Translucent Blue Case, Gear Boss, White Horn & Protractor Arc
        const servoGroup = new THREE.Group();
        servoGroup.position.set(4.2, 0.36, -0.3);

        const blueMat = new THREE.MeshStandardMaterial({
          color: 0x0284c7,
          roughness: 0.22,
          transparent: true,
          opacity: 0.9,
        });
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.25, 1.65, 2.3), blueMat);
        body.position.y = 0.85;
        const tabs = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.14, 3.1), blueMat);
        tabs.position.y = 1.15;
        const gearBoss = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.35, 24), blueMat);
        gearBoss.position.set(0, 1.75, -0.55);
        const brassShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.25, 16), goldMat);
        brassShaft.position.set(0, 1.95, -0.55);

        // Degree Protractor Arc around Servo Shaft (0° Left, 90° Top/Center, 180° Right)
        const arcGeo = new THREE.RingGeometry(1.35, 1.6, 32, 1, 0, Math.PI);
        arcGeo.rotateX(-Math.PI / 2);
        const arcMesh = new THREE.Mesh(
          arcGeo,
          new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.38 })
        );
        arcMesh.position.set(0, 1.98, -0.55);

        // White Servo Horn Pivot
        const hornPivot = new THREE.Group();
        hornPivot.position.set(0, 2.04, -0.55);
        const hornHub = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.14, 16), whitePlasticMat);
        const hornArm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.1, 1.45), whitePlasticMat);
        hornArm.position.z = -0.62;
        const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.16, 12), metalMat);
        hornPivot.add(hornHub, hornArm, screw);

        servoGroup.add(body, tabs, gearBoss, brassShaft, arcMesh, hornPivot);
        tagPart(servoGroup, 'servo');
        group.add(servoGroup);
        dynamicMeshes.servoHorn = hornPivot;

        // External Servo Power Supply Block
        const pwrBox = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 1.6), plasticDarkMat);
        pwrBox.position.set(6.2, 0.35, 2.2);
        tagPart(pwrBox, 'supply');
        group.add(pwrBox);

        const lblServo = createCalloutSprite('SG90 Servo (D9, 0°–180°)', 'rgba(15,23,42,0.9)', '#0284c7', '#ffffff', 1.75);
        lblServo.position.set(4.2, 2.85, -0.3);
        group.add(lblServo);

        group.add(createJumperWire(getUnoPinPos('D9'), new THREE.Vector3(3.5, 0.36, -0.6), 0xf59e0b, { activePin: 'D9' }));
        group.add(createJumperWire(new THREE.Vector3(5.6, 0.55, 2.0), new THREE.Vector3(3.5, 0.36, -0.3), 0xdc2626, { alwaysActive: true }));
        group.add(createJumperWire(new THREE.Vector3(3.5, 0.36, 0.0), getUnoPinPos('GND'), 0x334155));
        break;
      }

      case 'stepper': {
        // 28BYJ-48 Stepper Motor + ULN2003 Driver Board with 4 Live Phase LEDs (A, B, C, D) + External 5V Supply
        const stepGroup = new THREE.Group();
        stepGroup.position.set(5.1, 0.36, -1.4);

        const motorCan = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 1.15, 32), brushedSteelMat);
        motorCan.position.y = 0.6;
        const tabPlate = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 0.55), metalMat);
        tabPlate.position.y = 1.12;
        const wireBoot = new THREE.Mesh(
          new THREE.BoxGeometry(0.85, 0.55, 0.45),
          new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 })
        );
        wireBoot.position.set(0, 0.52, 1.12);

        // Rotating Pointer Disk on Output Shaft (0° at top -Z, rotates CW when direction = 1)
        const shaftPivot = new THREE.Group();
        shaftPivot.position.set(0, 1.28, 0.35);
        const brassShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.35, 16), goldMat);
        const pointerDisk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.85, 0.85, 0.08, 24),
          whitePlasticMat
        );
        pointerDisk.position.y = 0.14;
        const pointerArrow = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.12, 0.78),
          new THREE.MeshStandardMaterial({ color: 0xef4444 })
        );
        pointerArrow.position.set(0, 0.18, -0.32);
        shaftPivot.add(brassShaft, pointerDisk, pointerArrow);

        stepGroup.add(motorCan, tabPlate, wireBoot, shaftPivot);
        tagPart(stepGroup, 'stepper');
        group.add(stepGroup);
        dynamicMeshes.stepperGear = shaftPivot;

        // ULN2003 Driver Module PCB with 4 Phase LEDs (A, B, C, D)
        const ulnGroup = new THREE.Group();
        ulnGroup.position.set(3.6, 0.36, 1.45);
        const ulnPcb = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.16, 1.85), darkPcbMat);
        ulnPcb.position.y = 0.15;
        const ulnChip = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.2, 0.45), chipMat);
        ulnChip.position.set(0, 0.28, 0);
        const whiteSocket = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.35, 0.35), whitePlasticMat);
        whiteSocket.position.set(0.4, 0.32, -0.65);
        ulnGroup.add(ulnPcb, ulnChip, whiteSocket);

        // 4 Phase LEDs (A, B, C, D) on ULN2003 board
        dynamicMeshes.ulnLeds = [];
        for (let i = 0; i < 4; i++) {
          const pMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
          const pLed = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), pMat);
          pLed.position.set(-0.65 + i * 0.35, 0.28, 0.62);
          ulnGroup.add(pLed);
          dynamicMeshes.ulnLeds.push(pMat);
        }
        tagPart(ulnGroup, 'uln2003');
        group.add(ulnGroup);

        // External 5V Power Supply Module for Stepper Coils (supply)
        const supplyGroup = new THREE.Group();
        supplyGroup.position.set(6.35, 0.38, 1.95);
        const supplyBox = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.65, 1.85), plasticDarkMat);
        const supplyLbl = createCalloutSprite('EXT 5V Supply', 'rgba(15,23,42,0.9)', '#dc2626', '#ffffff', 1.38);
        supplyLbl.position.set(0, 0.85, 0);
        supplyGroup.add(supplyBox, supplyLbl);
        tagPart(supplyGroup, 'supply');
        group.add(supplyGroup);

        const lblStep = createCalloutSprite('28BYJ-48 + ULN2003 (A–D)', 'rgba(15,23,42,0.9)', '#f59e0b', '#ffffff', 1.8);
        lblStep.position.set(4.5, 2.35, 0);
        group.add(lblStep);

        // 4 MCU Control Signals: D8->IN1(A), D9->IN2(B), D10->IN3(C), D11->IN4(D)
        group.add(createJumperWire(getUnoPinPos('D8'), new THREE.Vector3(2.8, 0.5, 1.15), 0x0284c7, { activePin: 'D8' }));
        group.add(createJumperWire(getUnoPinPos('D9'), new THREE.Vector3(2.8, 0.5, 1.35), 0x22c55e, { activePin: 'D9' }));
        group.add(createJumperWire(getUnoPinPos('D10'), new THREE.Vector3(2.8, 0.5, 1.55), 0xf59e0b, { activePin: 'D10' }));
        group.add(createJumperWire(getUnoPinPos('D11'), new THREE.Vector3(2.8, 0.5, 1.75), 0xec4899, { activePin: 'D11' }));

        // 5-Wire Unipolar Motor Ribbon Harness (Blue, Pink, Yellow, Orange, Red) from ULN2003 Socket to 28BYJ-48
        const harnessCols = [0x3b82f6, 0xf472b6, 0xfacc15, 0xf97316, 0xef4444];
        const harnessPins = ['D8', 'D9', 'D10', 'D11', undefined];
        harnessCols.forEach((hCol, idx) => {
          const xOff = (idx - 2) * 0.14;
          group.add(
            createJumperWire(
              new THREE.Vector3(4.0 + xOff, 0.55, 0.8),
              new THREE.Vector3(5.1 + xOff * 0.85, 0.72, -0.32),
              hCol,
              harnessPins[idx] ? { activePin: harnessPins[idx] } : { alwaysActive: true }
            )
          );
        });

        // External +5V & Common GND jumpers
        group.add(
          createJumperWire(new THREE.Vector3(5.75, 0.65, 1.75), new THREE.Vector3(4.45, 0.5, 2.05), 0xdc2626, {
            alwaysActive: true,
          })
        );
        group.add(createJumperWire(new THREE.Vector3(4.2, 0.5, 2.05), getUnoPinPos('GND'), 0x334155));
        break;
      }

      case 'plant': {
        // 0.96" I2C SSD1306 OLED Display (with live CanvasTexture!) + Soil Pot & Dual-Prong Moisture Fork
        const oledGroup = new THREE.Group();
        oledGroup.position.set(3.5, 0.36, -1.35);

        const oledPcb = new THREE.Mesh(new THREE.BoxGeometry(2.35, 1.75, 0.14), darkPcbMat);
        oledPcb.position.y = 1.05;

        const oledCanvas = document.createElement('canvas');
        oledCanvas.width = 256;
        oledCanvas.height = 128;
        const oledTex = new THREE.CanvasTexture(oledCanvas);
        oledTex.colorSpace = THREE.SRGBColorSpace;
        const oledScreenMat = new THREE.MeshBasicMaterial({ map: oledTex });
        const oledGlass = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.15), oledScreenMat);
        oledGlass.position.set(0, 1.0, 0.08);

        oledGroup.add(oledPcb, oledGlass);
        tagPart(oledGroup, 'oled');
        group.add(oledGroup);
        dynamicMeshes.oledCanvas = oledCanvas;
        dynamicMeshes.oledTex = oledTex;

        // 3D Terracotta Plant Pot + Dynamic Soil Color + Gold-Plated Fork Probe
        const potGroup = new THREE.Group();
        potGroup.position.set(5.4, 0.36, 1.55);

        const potWall = new THREE.Mesh(
          new THREE.CylinderGeometry(1.15, 0.85, 1.35, 24),
          new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.65 })
        );
        potWall.position.y = 0.68;
        const soilMat = new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.9 });
        const soilDisk = new THREE.Mesh(new THREE.CylinderGeometry(1.06, 1.06, 0.15, 24), soilMat);
        soilDisk.position.y = 1.3;
        dynamicMeshes.soilMat = soilMat;

        // Two-prong soil moisture sensor fork inserted into soil
        const probeBridge = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.45, 0.1), pcbTealMat);
        probeBridge.position.y = 1.85;
        const prongL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.9, 0.08), goldMat);
        prongL.position.set(-0.24, 1.45, 0);
        const prongR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.9, 0.08), goldMat);
        prongR.position.set(0.24, 1.45, 0);

        potGroup.add(potWall, soilDisk, probeBridge, prongL, prongR);
        tagPart(potGroup, 'soil-sensor');
        group.add(potGroup);

        group.add(createJumperWire(new THREE.Vector3(5.4, 2.0, 1.55), getUnoPinPos('A0'), 0x10b981, { alwaysActive: true }));
        group.add(createJumperWire(getUnoPinPos('A4'), new THREE.Vector3(3.3, 0.36, -1.35), 0x06b6d4, { alwaysActive: true }));
        group.add(createJumperWire(getUnoPinPos('A5'), new THREE.Vector3(3.7, 0.36, -1.35), 0x0284c7, { alwaysActive: true }));
        break;
      }

      case 'force': {
        // Interlink FSR-402 Circular Sensing Pad + Animated Pressure Finger Weight + SG90 Dial Needle + Alarm Bell
        const fsrGroup = new THREE.Group();
        fsrGroup.position.set(3.5, 0.36, 1.65);

        const padBase = new THREE.Mesh(
          new THREE.CylinderGeometry(0.85, 0.85, 0.06, 28),
          new THREE.MeshStandardMaterial({ color: 0x047857, roughness: 0.35 })
        );
        padBase.position.y = 0.05;
        const traces = new THREE.Mesh(
          new THREE.CylinderGeometry(0.65, 0.65, 0.07, 24),
          goldMat
        );
        traces.position.y = 0.055;

        // Animated pressure plunger weight above FSR pad
        const weightMat = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          roughness: 0.3,
          transparent: true,
          opacity: 0.85,
        });
        const weightPlunger = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.32, 0.55, 20), weightMat);
        weightPlunger.position.y = 0.65;
        fsrGroup.add(padBase, traces, weightPlunger);
        tagPart(fsrGroup, 'fsr');
        group.add(fsrGroup);
        dynamicMeshes.fsrPlunger = weightPlunger;

        // 10k Voltage Divider Resistor
        group.add(createResistorMesh(new THREE.Vector3(3.5, 0.36, 0.45), '10k'));

        // Analog Dial Gauge Servo (D9)
        const gaugeGroup = new THREE.Group();
        gaugeGroup.position.set(4.5, 0.36, -1.5);
        const dialFace = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.12, 28), whitePlasticMat);
        dialFace.position.y = 0.12;
        const needlePivot = new THREE.Group();
        needlePivot.position.y = 0.22;
        const needle = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 0.06, 0.9),
          new THREE.MeshStandardMaterial({ color: 0xef4444 })
        );
        needle.position.z = -0.38;
        const needleCap = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.1, 16), chipMat);
        needlePivot.add(needle, needleCap);
        gaugeGroup.add(dialFace, needlePivot);
        tagPart(gaugeGroup, 'servo');
        group.add(gaugeGroup);
        dynamicMeshes.forceNeedle = needlePivot;

        // Alarm Buzzer (D8)
        const alarmGroup = new THREE.Group();
        alarmGroup.position.set(5.5, 0.36, 0.3);
        const alarmBody = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.5, 20), chipMat);
        alarmBody.position.y = 0.28;
        const alarmHaloMat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          transparent: true,
          opacity: 0.0,
        });
        const alarmHalo = new THREE.Mesh(new THREE.SphereGeometry(0.75, 16, 16), alarmHaloMat);
        alarmHalo.position.y = 0.35;
        alarmGroup.add(alarmBody, alarmHalo);
        tagPart(alarmGroup, 'piezo');
        group.add(alarmGroup);
        dynamicMeshes.forceBellHalo = alarmHaloMat;

        const lblFsr = createCalloutSprite('FSR-402 Pad (A0)', 'rgba(15,23,42,0.9)', '#10b981', '#ffffff', 1.45);
        lblFsr.position.set(3.5, 1.45, 1.65);
        const lblGauge = createCalloutSprite('Dial Servo (D9)', 'rgba(15,23,42,0.9)', '#0284c7', '#ffffff', 1.45);
        lblGauge.position.set(4.5, 1.35, -1.5);
        group.add(lblFsr, lblGauge);

        group.add(createJumperWire(getUnoPinPos('5V'), new THREE.Vector3(3.2, 0.36, 1.65), 0xdc2626, { alwaysActive: true }));
        group.add(createJumperWire(new THREE.Vector3(3.5, 0.36, 1.0), getUnoPinPos('A0'), 0x7c3aed, { alwaysActive: true }));
        group.add(createJumperWire(getUnoPinPos('D9'), new THREE.Vector3(4.5, 0.36, -1.5), 0x0284c7, { activePin: 'D9' }));
        group.add(createJumperWire(getUnoPinPos('D8'), new THREE.Vector3(5.5, 0.36, 0.3), 0xf59e0b, { activePin: 'D8' }));
        break;
      }
    }

    return group;
  }

  // Helper to redraw the 3D SSD1306 OLED Screen Canvas Texture live
  function updateOledTexture(output: Record<string, any>, isRunning: boolean) {
    const canvas = dynamicMeshes.oledCanvas as HTMLCanvasElement | undefined;
    const tex = dynamicMeshes.oledTex as THREE.CanvasTexture | undefined;
    if (!canvas || !tex) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#040814';
    ctx.fillRect(0, 0, 256, 128);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;
    ctx.strokeRect(2, 2, 252, 124);

    // Top yellow-band header (classic two-tone 0.96" OLED style!)
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 17px monospace';
    ctx.fillText('SSD1306 I2C 0x3C', 14, 22);
    ctx.fillStyle = isRunning ? '#22c55e' : '#64748b';
    ctx.fillText(isRunning ? '● LIVE' : '○ IDLE', 180, 22);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(8, 30);
    ctx.lineTo(248, 30);
    ctx.stroke();

    const rel = output.relativePercent ?? 50;
    const cond = String(output.condition ?? 'ok').toUpperCase();
    const adc = output.adc ?? 600;

    // Cyan main pixel area
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 34px monospace';
    ctx.fillText(`${rel}%`, 16, 70);

    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = cond === 'DRY' ? '#fbbf24' : cond === 'WET' ? '#60a5fa' : '#34d399';
    ctx.fillText(`[${cond}]`, 125, 68);

    // Progress Bar
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 84, 224, 16);
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(18, 86, Math.max(2, Math.round((rel / 100) * 220)), 12);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px monospace';
    ctx.fillText(`RAW A0: ${adc}`, 16, 118);

    tex.needsUpdate = true;
  }

  // Camera Orbit & Target Interpolation Controls
  let isDragging = false;
  let pointerDownPos = { x: 0, y: 0 };
  let prevMouse = { x: 0, y: 0 };
  let spherical = { radius: 20.5, phi: 0.82, theta: 0.22 };
  let targetSpherical = { radius: 20.5, phi: 0.82, theta: 0.22 };
  const lookTarget = new THREE.Vector3(0.2, 0.4, 0);
  const desiredLookTarget = new THREE.Vector3(0.2, 0.4, 0);

  function applyCameraImmediately() {
    lookTarget.copy(desiredLookTarget);
    spherical = { ...targetSpherical };
    camera.position.x =
      lookTarget.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
    camera.position.y = lookTarget.y + spherical.radius * Math.cos(spherical.phi);
    camera.position.z =
      lookTarget.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
    camera.lookAt(lookTarget);
  }
  applyCameraImmediately();

  // Raycaster for interactive 3D component clicking
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();

  const onPointerDown = (e: MouseEvent | TouchEvent) => {
    isDragging = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    pointerDownPos = { x: clientX, y: clientY };
    prevMouse = { x: clientX, y: clientY };
  };

  const onPointerMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - prevMouse.x;
    const deltaY = clientY - prevMouse.y;
    prevMouse = { x: clientX, y: clientY };

    targetSpherical.theta -= deltaX * 0.008;
    targetSpherical.phi = Math.max(
      0.08,
      Math.min(Math.PI / 2 - 0.06, targetSpherical.phi - deltaY * 0.008)
    );
  };

  const onPointerUp = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    isDragging = false;
    const clientX =
      'changedTouches' in e && e.changedTouches.length > 0
        ? e.changedTouches[0].clientX
        : (e as MouseEvent).clientX;
    const clientY =
      'changedTouches' in e && e.changedTouches.length > 0
        ? e.changedTouches[0].clientY
        : (e as MouseEvent).clientY;

    const moveDist = Math.hypot(clientX - pointerDownPos.x, clientY - pointerDownPos.y);
    if (moveDist < 6 && onSelectPart) {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointerNdc, camera);
        const hits = raycaster.intersectObjects(rootGroup.children, true);
        for (const hit of hits) {
          const partId = hit.object.userData?.partId;
          if (partId && EQUIPMENT_CATALOG[partId]) {
            onSelectPart(partId);
            break;
          }
        }
      }
    }
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    targetSpherical.radius = Math.max(8.5, Math.min(38, targetSpherical.radius + e.deltaY * 0.018));
  };

  renderer.domElement.addEventListener('mousedown', onPointerDown);
  renderer.domElement.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('touchend', onPointerUp);
  renderer.domElement.addEventListener('wheel', onWheel, { passive: false });

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const cr = entry.contentRect;
      if (cr.width > 0 && cr.height > 0) {
        camera.aspect = cr.width / cr.height;
        camera.updateProjectionMatrix();
        renderer.setSize(cr.width, cr.height);
      }
    }
  });
  resizeObserver.observe(container);

  // Main 60 FPS Render & Continuous Animation Loop
  let reqId = 0;
  let prevClock = performance.now();

  function animate(now = performance.now()) {
    reqId = requestAnimationFrame(animate);
    const dtSec = Math.min(0.1, (now - prevClock) / 1000);
    prevClock = now;

    // Smooth camera interpolation
    spherical.radius += (targetSpherical.radius - spherical.radius) * 0.14;
    spherical.phi += (targetSpherical.phi - spherical.phi) * 0.14;
    spherical.theta += (targetSpherical.theta - spherical.theta) * 0.14;
    lookTarget.lerp(desiredLookTarget, 0.14);

    camera.position.x =
      lookTarget.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
    camera.position.y = lookTarget.y + spherical.radius * Math.cos(spherical.phi);
    camera.position.z =
      lookTarget.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
    camera.lookAt(lookTarget);

    // Focus highlight ring fade
    if (focusRingPulseTime > 0) {
      focusRingPulseTime = Math.max(0, focusRingPulseTime - dtSec);
      focusRingMat.opacity = Math.sin(now * 0.01) * 0.3 + 0.45;
      const s = 1 + Math.sin(now * 0.008) * 0.08;
      focusRing.scale.set(s, 1, s);
    } else {
      focusRingMat.opacity = 0;
    }

    // Continuous DC Motor Rotor Spin when running
    if (dynamicMeshes.motorRotor && lastIsRunning) {
      const duty = lastOutput.duty ?? 0.5;
      dynamicMeshes.motorRotor.rotation.x += duty * 16 * dtSec;
    }

    // Continuous Ultrasonic Wave Ring Propagation
    if (dynamicMeshes.sonarRings) {
      const rings = dynamicMeshes.sonarRings as THREE.Mesh[];
      const valid = lastOutput.valid !== false;
      const obsX = dynamicMeshes.obstacleGroup ? dynamicMeshes.obstacleGroup.position.x - 0.25 : 6.2;
      const span = Math.max(0.45, obsX - 3.35);
      rings.forEach((r, idx) => {
        if (lastIsRunning && valid) {
          r.visible = true;
          const phase = ((now * 0.0018 + idx * 0.33) % 1);
          r.position.x = 3.35 + phase * span;
          const mat = r.material as THREE.MeshBasicMaterial;
          mat.opacity = (1 - phase) * 0.7;
          const s = 0.7 + phase * 0.9;
          r.scale.set(s, s, s);
        } else {
          r.visible = false;
        }
      });
    }

    // Continuous Sound Wave Ring Expansion when buzzer active
    if (dynamicMeshes.soundRings) {
      const rings = dynamicMeshes.soundRings as THREE.Mesh[];
      const hz = lastOutput.hz ?? 0;
      const active = lastIsRunning && hz > 0;
      rings.forEach((r, idx) => {
        const mat = r.material as THREE.MeshBasicMaterial;
        if (active) {
          const phase = ((now * 0.0025 + idx * 0.33) % 1);
          r.position.y = 0.75 + phase * 1.1;
          const s = 0.8 + phase * 0.9;
          r.scale.set(s, s, 1);
          mat.opacity = (1 - phase) * 0.75;
        } else {
          mat.opacity = 0;
        }
      });
    }

    // Animated Signal Pulses along Active Jumper Wires
    const pins = lastOutput.pins || {};
    for (const wp of wirePulses) {
      const pinActive = wp.activePin ? (pins[wp.activePin] ?? 0) > 0 : wp.alwaysActive;
      if (lastIsRunning && pinActive) {
        wp.mesh.visible = true;
        const t = (now * 0.001 * wp.speed + wp.offset) % 1;
        wp.curve.getPoint(t, wp.mesh.position);
      } else {
        wp.mesh.visible = false;
      }
    }

    renderer.render(scene, camera);
  }
  animate();

  return {
    update(lesson: LessonData, output: Record<string, any>, isRunning: boolean) {
      lastIsRunning = isRunning;
      lastOutput = output;

      if (lesson.id !== currentLessonId) {
        if (lessonGroup) {
          rootGroup.remove(lessonGroup);
          disposeHierarchy(lessonGroup);
        }
        lessonGroup = buildLessonComponents(lesson);
        rootGroup.add(lessonGroup);
        currentLessonId = lesson.id;
      }

      // 1. Onboard D13 LED & TX/RX status
      const d13Active =
        isRunning && (output.led === true || (output.pins && output.pins.D13 > 0));
      d13LedMat.color.setHex(d13Active ? 0xf59e0b : 0x475569);
      d13HaloMat.opacity = d13Active ? 0.42 : 0.0;

      const serialActive = isRunning && (lesson.id === 'sensor' || lesson.id === 'heat' || lesson.id === 'plant' || lesson.id === 'knob');
      txLedMat.color.setHex(serialActive ? 0xfacc15 : 0x334155);

      // 2. External Red LED (Blink / Button / Light)
      if (dynamicMeshes.extLed) {
        const active = isRunning && output.led === true;
        dynamicMeshes.extLed.emissive.setHex(active ? 0xef4444 : 0x000000);
        if (dynamicMeshes.extLedHalo) {
          dynamicMeshes.extLedHalo.opacity = active ? 0.38 : 0.0;
        }
      }

      // 3. Knob PWM LED & Shaft Rotation
      if (dynamicMeshes.potShaft && output.adc !== undefined) {
        dynamicMeshes.potShaft.rotation.y = ((output.adc / 1023) - 0.5) * Math.PI * 1.5;
      }
      if (dynamicMeshes.pwmLed) {
        const duty = isRunning ? (output.duty ?? 0.5) : 0;
        dynamicMeshes.pwmLed.emissive.setHex(duty > 0.01 ? 0xf59e0b : 0x000000);
        dynamicMeshes.pwmLed.emissiveIntensity = duty * 2.0;
        if (dynamicMeshes.pwmLedHalo) {
          dynamicMeshes.pwmLedHalo.opacity = duty * 0.45;
        }
      }

      // 4. RGB LED Color Mixing
      if (dynamicMeshes.rgbDome) {
        if (isRunning && output.hex) {
          dynamicMeshes.rgbDome.color.set(output.hex);
          dynamicMeshes.rgbDome.emissive.set(output.hex);
          if (dynamicMeshes.rgbHalo) {
            dynamicMeshes.rgbHalo.color.set(output.hex);
            dynamicMeshes.rgbHalo.opacity = 0.42;
          }
        } else {
          dynamicMeshes.rgbDome.color.setHex(0x94a3b8);
          dynamicMeshes.rgbDome.emissive.setHex(0x000000);
          if (dynamicMeshes.rgbHalo) {
            dynamicMeshes.rgbHalo.opacity = 0.0;
          }
        }
      }

      // 5. Light Sensor Sun Intensity
      if (dynamicMeshes.sunMat && output.adc !== undefined) {
        const ratio = Math.max(0.08, output.adc / 1023);
        dynamicMeshes.sunMat.color.setHSL(0.13, 0.95, 0.25 + ratio * 0.45);
        if (dynamicMeshes.sunHaloMat) {
          dynamicMeshes.sunHaloMat.opacity = ratio * 0.5;
        }
        if (dynamicMeshes.sunGroup) {
          dynamicMeshes.sunGroup.scale.setScalar(0.65 + ratio * 0.55);
        }
      }

      // 6. Ultrasonic Obstacle Position (sensor & project)
      if (dynamicMeshes.obstacleGroup) {
        const cm = output.distanceCm;
        const valid = output.valid !== false && cm !== null && cm !== undefined;
        if (valid) {
          const mappedX = 3.8 + Math.min(200, Math.max(2, cm)) * 0.025;
          dynamicMeshes.obstacleGroup.position.x = mappedX;
          dynamicMeshes.obstacleWallMat.opacity = 0.95;
          updateCalloutSprite(dynamicMeshes.distSprite, `${Number(cm).toFixed(1)} cm`, '#06b6d4');
        } else {
          dynamicMeshes.obstacleGroup.position.x = 8.9;
          dynamicMeshes.obstacleWallMat.opacity = 0.22;
          updateCalloutSprite(dynamicMeshes.distSprite, 'NO ECHO', '#ef4444');
        }
      }

      // 7. Tactile Button Plunger
      if (dynamicMeshes.btnActuator && output.pressed !== undefined) {
        dynamicMeshes.btnActuator.position.y = output.pressed ? 0.34 : 0.45;
      }

      // 8. 8-Key Piano Actuators
      if (dynamicMeshes.pianoKeys) {
        const activeKey = output.key;
        dynamicMeshes.pianoKeys.forEach((item: any, idx: number) => {
          const isDown = activeKey === idx;
          item.mesh.position.y = isDown ? 0.26 : 0.36;
          item.mat.emissive.setHex(isDown ? item.baseColor : 0x000000);
        });
      }

      // 9. TMP36 Thermal Aura Color
      if (dynamicMeshes.heatAura && output.tempC !== undefined) {
        const t = output.tempC;
        const norm = Math.max(0, Math.min(1, (t + 40) / 165));
        dynamicMeshes.heatAura.color.setHSL((1 - norm) * 0.58, 0.9, 0.5);
        dynamicMeshes.heatAura.opacity = 0.25 + norm * 0.3;
        updateCalloutSprite(
          dynamicMeshes.heatLabel,
          `TMP36: ${Number(t).toFixed(1)} °C (${Number(output.voltage ?? 0.75).toFixed(2)}V)`,
          '#f97316'
        );
      }

      // 10. SG90 Servo Horn Rotation
      if (dynamicMeshes.servoHorn && output.angle !== undefined) {
        const rad = THREE.MathUtils.degToRad(output.angle - 90);
        dynamicMeshes.servoHorn.rotation.y = -rad;
      }

      // 11. Stepper Shaft & ULN2003 4-Phase LEDs (Full-Step Two-Coil Excitation A:D8, B:D9, C:D10, D:D11)
      if (dynamicMeshes.stepperGear && output.angle !== undefined) {
        dynamicMeshes.stepperGear.rotation.y = -THREE.MathUtils.degToRad(output.angle);
      }
      if (dynamicMeshes.ulnLeds) {
        const p = output.pins || {};
        const coilStates = [p.D8 ?? 0, p.D9 ?? 0, p.D10 ?? 0, p.D11 ?? 0];
        dynamicMeshes.ulnLeds.forEach((mat: THREE.MeshBasicMaterial, idx: number) => {
          mat.color.setHex(coilStates[idx] > 0 ? (isRunning ? 0xef4444 : 0x991b1b) : 0x334155);
        });
      }

      // 12. Plant Soil Moisture Color & Live SSD1306 OLED Screen
      if (dynamicMeshes.soilMat && output.relativePercent !== undefined) {
        const moist = output.relativePercent / 100;
        const dryCol = new THREE.Color(0xb48a64);
        const wetCol = new THREE.Color(0x3b2314);
        dynamicMeshes.soilMat.color.copy(dryCol).lerp(wetCol, moist);
      }
      if (dynamicMeshes.oledCanvas) {
        updateOledTexture(output, isRunning);
      }

      // 13. Force FSR Plunger, Dial Needle & Bell Alarm
      if (dynamicMeshes.fsrPlunger && output.adc !== undefined) {
        const pressRatio = output.adc / 1023;
        dynamicMeshes.fsrPlunger.position.y = 0.7 - pressRatio * 0.34;
      }
      if (dynamicMeshes.forceNeedle && output.angle !== undefined) {
        const rad = THREE.MathUtils.degToRad(output.angle - 90);
        dynamicMeshes.forceNeedle.rotation.y = -rad;
      }
      if (dynamicMeshes.forceBellHalo) {
        const ringing = isRunning && output.bell === true;
        dynamicMeshes.forceBellHalo.opacity = ringing ? 0.45 : 0.0;
      }

      // 14. Project Parking Traffic Light LEDs
      if (dynamicMeshes.projectLeds) {
        const light = output.light;
        const states = [light === 'red', light === 'yellow', light === 'green'];
        const cols = [0xef4444, 0xeab308, 0x22c55e];
        dynamicMeshes.projectLeds.forEach((mat: THREE.MeshStandardMaterial, i: number) => {
          const on = isRunning && states[i];
          mat.emissive.setHex(on ? cols[i] : 0x000000);
          if (dynamicMeshes.projectHalos && dynamicMeshes.projectHalos[i]) {
            dynamicMeshes.projectHalos[i].opacity = on ? 0.42 : 0.0;
          }
        });
      }
    },

    resetCamera() {
      desiredLookTarget.set(0.2, 0.4, 0);
      targetSpherical = { radius: 20.5, phi: 0.82, theta: 0.22 };
    },

    setCameraPreset(preset: CameraPreset) {
      switch (preset) {
        case 'iso':
          desiredLookTarget.set(0.2, 0.4, 0);
          targetSpherical = { radius: 20.5, phi: 0.82, theta: 0.22 };
          break;
        case 'top':
          desiredLookTarget.set(0.2, 0.2, 0);
          targetSpherical = { radius: 21.5, phi: 0.1, theta: 0.0 };
          break;
        case 'closeup':
          desiredLookTarget.set(4.1, 0.7, 0);
          targetSpherical = { radius: 11.8, phi: 0.76, theta: 0.32 };
          break;
        case 'board':
          desiredLookTarget.set(-3.9, 0.5, 0);
          targetSpherical = { radius: 11.5, phi: 0.68, theta: -0.18 };
          break;
      }
    },

    focusPart(partId: string) {
      const spec = EQUIPMENT_CATALOG[partId];
      if (!spec) return;
      const [fx, fy, fz] = spec.focusPoint;
      desiredLookTarget.set(fx, fy, fz);
      targetSpherical = {
        radius: partId === 'uno' || partId === 'breadboard' ? 12.5 : 9.2,
        phi: 0.72,
        theta: fx < 0 ? -0.2 : 0.28,
      };
      focusRing.position.set(fx, 0.06, fz);
      focusRingPulseTime = 3.2;
    },

    setTheme(dark: boolean) {
      isDark = dark;
      scene.background = new THREE.Color(dark ? 0x070c18 : 0xf1f5f9);
      benchMat.color.setHex(dark ? 0x0b1324 : 0xe2e8f0);
      scene.remove(gridHelper);
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
      gridHelper = new THREE.GridHelper(
        34,
        34,
        dark ? 0x334155 : 0x94a3b8,
        dark ? 0x1e293b : 0xcbd5e1
      );
      gridHelper.position.y = -0.02;
      scene.add(gridHelper);
    },

    dispose() {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      if (lessonGroup) disposeHierarchy(lessonGroup);
      disposeHierarchy(unoBoard);
      if (sharedBreadboardTex) sharedBreadboardTex.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    },

    getCanvas() {
      return renderer.domElement;
    },
  };
}
