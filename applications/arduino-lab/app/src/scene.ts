import * as THREE from 'three';
import type { LessonData } from './types';

export interface SceneController {
  update: (lesson: LessonData, output: Record<string, any>, isRunning: boolean) => void;
  resetCamera: () => void;
  dispose: () => void;
  getCanvas: () => HTMLCanvasElement;
}

export function init3DScene(container: HTMLElement): SceneController | null {
  try {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) return null;
  } catch {
    return null;
  }

  const width = container.clientWidth || 600;
  const height = container.clientHeight || 420;

  const scene = new THREE.Scene();
  const isDark = document.documentElement.classList.contains('dark');
  scene.background = new THREE.Color(isDark ? 0x050914 : 0xf1f5f9);

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 14, 18);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(10, 20, 15);
  dirLight.castShadow = true;
  scene.add(dirLight);

  const rimLight = new THREE.DirectionalLight(0x7c3aed, 0.6); // Brand violet rim light
  rimLight.position.set(-15, 10, -10);
  scene.add(rimLight);

  // Reference Grid
  const gridHelper = new THREE.GridHelper(30, 30, isDark ? 0x334155 : 0xcbd5e1, isDark ? 0x1e293b : 0xe2e8f0);
  gridHelper.position.y = -0.01;
  scene.add(gridHelper);

  // Root group for all lesson objects
  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  // Shared Procedural Materials
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x00838f, roughness: 0.3, metalness: 0.1 });
  const chipMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.7 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.8, roughness: 0.2 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.7, roughness: 0.3 });
  const plasticMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });

  // Procedural Arduino Uno R3 Board
  function createUnoBoard(): THREE.Group {
    const board = new THREE.Group();

    // PCB substrate
    const pcbGeo = new THREE.BoxGeometry(6.8, 0.2, 5.3);
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.receiveShadow = true;
    board.add(pcb);

    // ATmega328P DIP-28 IC
    const chipGeo = new THREE.BoxGeometry(3.5, 0.25, 0.8);
    const chip = new THREE.Mesh(chipGeo, chipMat);
    chip.position.set(0.6, 0.2, 0.4);
    board.add(chip);

    // USB Type B Connector
    const usbGeo = new THREE.BoxGeometry(1.2, 1.1, 1.2);
    const usb = new THREE.Mesh(usbGeo, metalMat);
    usb.position.set(-3.0, 0.6, -1.5);
    board.add(usb);

    // DC Power Barrel Jack
    const dcGeo = new THREE.BoxGeometry(1.4, 1.0, 0.9);
    const dc = new THREE.Mesh(dcGeo, plasticMat);
    dc.position.set(-2.8, 0.5, 1.8);
    board.add(dc);

    // Crystal Oscillator
    const crystalGeo = new THREE.BoxGeometry(0.8, 0.3, 0.3);
    const crystal = new THREE.Mesh(crystalGeo, metalMat);
    crystal.position.set(-1.0, 0.2, -0.2);
    board.add(crystal);

    // Reset button
    const resetBaseGeo = new THREE.BoxGeometry(0.6, 0.3, 0.6);
    const resetBase = new THREE.Mesh(resetBaseGeo, metalMat);
    resetBase.position.set(-3.0, 0.2, -0.4);
    const resetBtnGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.2, 16);
    const resetBtn = new THREE.Mesh(resetBtnGeo, new THREE.MeshStandardMaterial({ color: 0xd97706 }));
    resetBtn.position.set(-3.0, 0.4, -0.4);
    board.add(resetBase, resetBtn);

    // Pin headers
    const digitalHeaderGeo = new THREE.BoxGeometry(4.0, 0.45, 0.3);
    const digitalHeader = new THREE.Mesh(digitalHeaderGeo, plasticMat);
    digitalHeader.position.set(0.6, 0.3, -2.4);
    board.add(digitalHeader);

    const analogHeaderGeo = new THREE.BoxGeometry(3.6, 0.45, 0.3);
    const analogHeader = new THREE.Mesh(analogHeaderGeo, plasticMat);
    analogHeader.position.set(0.8, 0.3, 2.4);
    board.add(analogHeader);

    // Power indicator LED (Green)
    const onLedGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 8);
    const onLed = new THREE.Mesh(onLedGeo, new THREE.MeshBasicMaterial({ color: 0x22c55e }));
    onLed.position.set(-1.2, 0.15, -1.2);
    board.add(onLed);

    return board;
  }

  const unoBoard = createUnoBoard();
  unoBoard.position.set(-3.5, 0.1, 0);
  rootGroup.add(unoBoard);

  // Dynamic D13 Built-in LED on board
  const d13LedGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 8);
  const d13LedMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
  const d13Led = new THREE.Mesh(d13LedGeo, d13LedMat);
  d13Led.position.set(-0.8, 0.15, -1.2);
  unoBoard.add(d13Led);

  let lessonGroup: THREE.Group | null = null;
  let dynamicMeshes: Record<string, any> = {};

  // Orbit Controls implementation
  let isDragging = false;
  let prevMouse = { x: 0, y: 0 };
  let spherical = { radius: 24, phi: 0.85, theta: 0.3 };

  function updateCamera() {
    camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
    camera.position.y = spherical.radius * Math.cos(spherical.phi);
    camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
    camera.lookAt(0, 0, 0);
  }
  updateCamera();

  const onPointerDown = (e: MouseEvent | TouchEvent) => {
    isDragging = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    prevMouse = { x: clientX, y: clientY };
  };

  const onPointerMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - prevMouse.x;
    const deltaY = clientY - prevMouse.y;
    prevMouse = { x: clientX, y: clientY };

    spherical.theta -= deltaX * 0.008;
    spherical.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, spherical.phi - deltaY * 0.008));
    updateCamera();
  };

  const onPointerUp = () => {
    isDragging = false;
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    spherical.radius = Math.max(8, Math.min(45, spherical.radius + e.deltaY * 0.02));
    updateCamera();
  };

  renderer.domElement.addEventListener('mousedown', onPointerDown);
  renderer.domElement.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('touchend', onPointerUp);
  renderer.domElement.addEventListener('wheel', onWheel, { passive: false });

  // ResizeObserver for responsive canvas
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

  // Animation Loop
  let reqId = 0;
  function animate() {
    reqId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Create wires between two 3D positions
  function createWire(start: THREE.Vector3, end: THREE.Vector3, color: number): THREE.Mesh {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.y += Math.min(3, start.distanceTo(end) * 0.4);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.06, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({ color, roughness: 0.4 });
    return new THREE.Mesh(tubeGeo, tubeMat);
  }

  // Build specific 3D components for all 16 lessons
  function buildLessonComponents(lesson: LessonData): THREE.Group {
    const group = new THREE.Group();
    dynamicMeshes = {};

    // Standard Breadboard (placed on right side)
    const bbGeo = new THREE.BoxGeometry(5.5, 0.4, 8.2);
    const bb = new THREE.Mesh(bbGeo, whiteMat);
    bb.position.set(4.5, 0.2, 0);
    bb.receiveShadow = true;
    group.add(bb);

    switch (lesson.id) {
      case 'board': {
        // Just the Uno board
        break;
      }

      case 'blink':
      case 'button':
      case 'light': {
        // External 5mm LED
        const ledDomeGeo = new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const ledBaseGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 16);
        const ledMat = new THREE.MeshStandardMaterial({
          color: 0xef4444,
          emissive: 0x000000,
          roughness: 0.2,
          transparent: true,
          opacity: 0.85,
        });
        const dome = new THREE.Mesh(ledDomeGeo, ledMat);
        dome.position.y = 0.25;
        const base = new THREE.Mesh(ledBaseGeo, ledMat);
        const extLed = new THREE.Group();
        extLed.add(dome, base);
        extLed.position.set(4.5, 0.9, -1.5);
        group.add(extLed);
        dynamicMeshes.extLed = ledMat;

        // Series Resistor 330 ohm
        const resGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.9, 12);
        resGeo.rotateZ(Math.PI / 2);
        const resMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });
        const res = new THREE.Mesh(resGeo, resMat);
        res.position.set(4.5, 0.6, 0);
        group.add(res);

        if (lesson.id === 'button') {
          // Tactile push button
          const btnBodyGeo = new THREE.BoxGeometry(0.9, 0.35, 0.9);
          const btnBody = new THREE.Mesh(btnBodyGeo, chipMat);
          const btnActuatorGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.3, 16);
          const btnActuatorMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
          const btnActuator = new THREE.Mesh(btnActuatorGeo, btnActuatorMat);
          btnActuator.position.y = 0.25;
          const btnGroup = new THREE.Group();
          btnGroup.add(btnBody, btnActuator);
          btnGroup.position.set(4.5, 0.6, 2.0);
          group.add(btnGroup);
          dynamicMeshes.btnActuator = btnActuator;
        }

        if (lesson.id === 'light') {
          // LDR Photoresistor
          const ldrGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
          const ldrMat = new THREE.MeshStandardMaterial({ color: 0xd97706 });
          const ldr = new THREE.Mesh(ldrGeo, ldrMat);
          ldr.position.set(4.5, 0.7, 1.8);
          group.add(ldr);
        }

        group.add(createWire(new THREE.Vector3(-0.5, 0.5, -2.4), new THREE.Vector3(4.5, 0.8, -1.5), 0x0284c7)); // D13
        group.add(createWire(new THREE.Vector3(4.5, 0.5, 0.5), new THREE.Vector3(-1.0, 0.5, 2.4), 0x334155)); // GND
        break;
      }

      case 'knob': {
        const potBodyGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.6, 24);
        const potBody = new THREE.Mesh(potBodyGeo, metalMat);
        const shaftGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 16);
        const shaftMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
        const shaft = new THREE.Mesh(shaftGeo, shaftMat);
        shaft.position.y = 0.5;
        const pot = new THREE.Group();
        pot.add(potBody, shaft);
        pot.position.set(4.5, 0.7, 0);
        group.add(pot);
        dynamicMeshes.potShaft = shaft;
        break;
      }

      case 'rgb': {
        const rgbDomeMat = new THREE.MeshStandardMaterial({
          color: 0x888888,
          emissive: 0x000000,
          transparent: true,
          opacity: 0.9,
        });
        const rgbDome = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), rgbDomeMat);
        rgbDome.position.set(4.5, 1.0, 0);
        group.add(rgbDome);
        dynamicMeshes.rgbDome = rgbDomeMat;
        break;
      }

      case 'sound': {
        // Piezo Buzzer Cylinder
        const buzzerBodyGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.7, 24);
        const buzzerBody = new THREE.Mesh(buzzerBodyGeo, chipMat);
        const buzzerHoleGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.72, 16);
        const buzzerHole = new THREE.Mesh(buzzerHoleGeo, metalMat);
        const buzzer = new THREE.Group();
        buzzer.add(buzzerBody, buzzerHole);
        buzzer.position.set(4.5, 0.75, 0);
        group.add(buzzer);
        dynamicMeshes.buzzer = buzzer;
        break;
      }

      case 'piano': {
        // 8 Miniature tactile push buttons in a keyboard line
        const pianoRow = new THREE.Group();
        dynamicMeshes.pianoKeys = [];
        for (let i = 0; i < 8; i++) {
          const keyBody = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.8), chipMat);
          const keyActuator = new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.15, 0.25, 12),
            new THREE.MeshStandardMaterial({ color: 0xffffff })
          );
          keyActuator.position.y = 0.2;
          const kGroup = new THREE.Group();
          kGroup.add(keyBody, keyActuator);
          kGroup.position.set(2.5 + i * 0.6, 0.6, 0);
          pianoRow.add(kGroup);
          dynamicMeshes.pianoKeys.push(keyActuator);
        }
        group.add(pianoRow);
        break;
      }

      case 'motor': {
        // DC Motor & Transistor Driver
        const motorBodyGeo = new THREE.CylinderGeometry(0.9, 0.9, 1.8, 20);
        motorBodyGeo.rotateZ(Math.PI / 2);
        const motorBody = new THREE.Mesh(motorBodyGeo, metalMat);
        const shaftGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 12);
        shaftGeo.rotateZ(Math.PI / 2);
        const shaft = new THREE.Mesh(shaftGeo, goldMat);
        shaft.position.x = 1.2;
        const motor = new THREE.Group();
        motor.add(motorBody, shaft);
        motor.position.set(4.5, 1.2, 0);
        group.add(motor);
        dynamicMeshes.motorShaft = shaft;
        break;
      }

      case 'heat': {
        // TMP36 TO-92 Transistor Package
        const to92Geo = new THREE.CylinderGeometry(0.3, 0.3, 0.6, 16, 1, false, 0, Math.PI);
        const to92 = new THREE.Mesh(to92Geo, chipMat);
        to92.position.set(4.5, 0.8, 0);
        group.add(to92);
        break;
      }

      case 'servo': {
        // SG90 Micro Servo
        const servoBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.2, 2.4), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
        servoBody.position.set(4.5, 1.5, 0);
        const hornGeo = new THREE.BoxGeometry(0.2, 0.1, 2.2);
        const hornMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const horn = new THREE.Mesh(hornGeo, hornMat);
        horn.position.set(0, 1.2, 0);
        servoBody.add(horn);
        group.add(servoBody);
        dynamicMeshes.servoHorn = horn;
        break;
      }

      case 'stepper': {
        // 28BYJ-48 Stepper Motor
        const stepBody = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 1.8, 24), metalMat);
        stepBody.position.set(4.5, 1.3, 0);
        const gearGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8);
        const gear = new THREE.Mesh(gearGeo, goldMat);
        gear.position.y = 1.1;
        stepBody.add(gear);
        group.add(stepBody);
        dynamicMeshes.stepperGear = gear;
        break;
      }

      case 'plant': {
        // OLED Display (SSD1306) & Soil Moisture Fork
        const oledGeo = new THREE.BoxGeometry(2.5, 1.8, 0.2);
        const oledScreen = new THREE.Mesh(oledGeo, new THREE.MeshBasicMaterial({ color: 0x0f172a }));
        oledScreen.position.set(4.5, 1.5, -1.0);
        group.add(oledScreen);
        dynamicMeshes.oledScreen = oledScreen;
        break;
      }

      case 'force': {
        // FSR Pressure Sensor & Servo Indicator Needle
        const fsrGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.05, 24);
        const fsr = new THREE.Mesh(fsrGeo, new THREE.MeshStandardMaterial({ color: 0x059669 }));
        fsr.position.set(4.5, 0.45, 1.5);
        group.add(fsr);

        const gauge = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.1, 24), whiteMat);
        gauge.position.set(4.5, 0.5, -1.5);
        const needleGeo = new THREE.BoxGeometry(0.08, 0.05, 0.8);
        const needle = new THREE.Mesh(needleGeo, new THREE.MeshStandardMaterial({ color: 0xef4444 }));
        needle.position.set(4.5, 0.6, -1.5);
        group.add(gauge, needle);
        dynamicMeshes.forceNeedle = needle;
        break;
      }

      case 'sensor':
      case 'project': {
        // Ultrasonic HC-SR04
        const sensorPcb = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.0, 0.2), pcbMat);
        sensorPcb.position.set(4.5, 1.5, 0);
        const eyeGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.8, 20);
        eyeGeo.rotateX(Math.PI / 2);
        const eye1 = new THREE.Mesh(eyeGeo, metalMat);
        eye1.position.set(-1.1, 0, 0.4);
        const eye2 = new THREE.Mesh(eyeGeo, metalMat);
        eye2.position.set(1.1, 0, 0.4);
        sensorPcb.add(eye1, eye2);
        group.add(sensorPcb);

        if (lesson.id === 'project') {
          // 3 Traffic LEDs on breadboard (Red, Yellow, Green)
          const ledColors = [0xef4444, 0xeab308, 0x22c55e];
          dynamicMeshes.projectLeds = [];
          for (let i = 0; i < 3; i++) {
            const pLedMat = new THREE.MeshStandardMaterial({
              color: ledColors[i],
              emissive: 0x000000,
              roughness: 0.2,
            });
            const pLed = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), pLedMat);
            pLed.position.set(3.5 + i * 1.0, 0.8, 2.0);
            group.add(pLed);
            dynamicMeshes.projectLeds.push(pLedMat);
          }
        }
        break;
      }
    }

    return group;
  }

  let currentLessonId = '';

  return {
    update(lesson: LessonData, output: Record<string, any>, isRunning: boolean) {
      if (lesson.id !== currentLessonId) {
        if (lessonGroup) {
          rootGroup.remove(lessonGroup);
        }
        lessonGroup = buildLessonComponents(lesson);
        rootGroup.add(lessonGroup);
        currentLessonId = lesson.id;
      }

      // Update D13 LED
      const d13Active = isRunning && (output.led === true || (output.pins && output.pins.D13 > 0));
      d13LedMat.color.setHex(d13Active ? 0xef4444 : 0x334155);

      // Update dynamic parts based on outputs
      if (dynamicMeshes.extLed) {
        const active = isRunning && output.led === true;
        dynamicMeshes.extLed.emissive.setHex(active ? 0xef4444 : 0x000000);
      }

      if (dynamicMeshes.rgbDome) {
        if (isRunning && output.hex) {
          dynamicMeshes.rgbDome.color.set(output.hex);
          dynamicMeshes.rgbDome.emissive.set(output.hex);
        } else {
          dynamicMeshes.rgbDome.color.setHex(0x334155);
          dynamicMeshes.rgbDome.emissive.setHex(0x000000);
        }
      }

      if (dynamicMeshes.servoHorn && output.angle !== undefined) {
        const rad = THREE.MathUtils.degToRad(output.angle - 90);
        dynamicMeshes.servoHorn.rotation.y = rad;
      }

      if (dynamicMeshes.stepperGear && output.angle !== undefined) {
        dynamicMeshes.stepperGear.rotation.y = THREE.MathUtils.degToRad(output.angle);
      }

      if (dynamicMeshes.btnActuator && output.pressed !== undefined) {
        dynamicMeshes.btnActuator.position.y = output.pressed ? 0.12 : 0.25;
      }

      if (dynamicMeshes.potShaft && output.adc !== undefined) {
        dynamicMeshes.potShaft.rotation.y = (output.adc / 1023) * Math.PI * 1.5;
      }

      if (dynamicMeshes.forceNeedle && output.angle !== undefined) {
        dynamicMeshes.forceNeedle.rotation.y = THREE.MathUtils.degToRad(output.angle - 90);
      }

      if (dynamicMeshes.projectLeds) {
        const light = output.light;
        dynamicMeshes.projectLeds[0].emissive.setHex(light === 'red' && isRunning ? 0xef4444 : 0x000000);
        dynamicMeshes.projectLeds[1].emissive.setHex(light === 'yellow' && isRunning ? 0xeab308 : 0x000000);
        dynamicMeshes.projectLeds[2].emissive.setHex(light === 'green' && isRunning ? 0x22c55e : 0x000000);
      }
    },

    resetCamera() {
      spherical = { radius: 24, phi: 0.85, theta: 0.3 };
      updateCamera();
    },

    dispose() {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
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
