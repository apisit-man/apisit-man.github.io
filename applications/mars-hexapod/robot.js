import * as THREE from 'three';
import { AerospaceMaterials } from './materials.js';

// Shared materials instance across all robot components
let materials = null;
function getMaterials() {
  if (!materials) {
    materials = new AerospaceMaterials();
  }
  return materials;
}

/**
 * Procedural Helical Coil Suspension Spring
 */
function createSpringGeometry(radius, tubeRadius, turns, length, segments = 48) {
  const points = [];
  const totalPoints = turns * segments;
  for (let i = 0; i <= totalPoints; i++) {
    const t = i / totalPoints;
    const angle = t * turns * Math.PI * 2;
    // Spring axis along local X
    const x = t * length;
    const y = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    points.push(new THREE.Vector3(x, y, z));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, totalPoints, tubeRadius, 6, false);
}

/**
 * High-Precision 3-DOF Articulated Robotic Limb
 * Designed with authentic aerospace robotics engineering (titanium trusses,
 * hydraulic linear actuators, heavy-duty rotary actuators, and suspension springs).
 */
class HexapodLeg {
  constructor(id, mountAngle, mountRadius) {
    this.id = id;
    this.mountAngle = mountAngle;
    this.mountRadius = mountRadius;

    // Kinematic segment lengths (meters)
    this.coxaLength = 0.45;
    this.femurLength = 0.92;
    this.tibiaLength = 1.22;

    // Root mount group on chassis
    this.root = new THREE.Group();
    this.root.position.set(
      Math.cos(mountAngle) * mountRadius,
      0,
      Math.sin(mountAngle) * mountRadius
    );
    // Point root radially outward
    this.root.rotation.y = -mountAngle;

    // 1. Coxa Joint (horizontal yaw pivot around local Y)
    this.coxaPivot = new THREE.Group();
    this.root.add(this.coxaPivot);

    // 2. Femur Joint (vertical pitch pivot around local Z)
    this.femurPivot = new THREE.Group();
    this.femurPivot.position.set(this.coxaLength, 0, 0);
    this.coxaPivot.add(this.femurPivot);

    // 3. Tibia Joint (knee pitch pivot around local Z)
    this.tibiaPivot = new THREE.Group();
    this.tibiaPivot.position.set(this.femurLength, 0, 0);
    this.femurPivot.add(this.tibiaPivot);

    // 4. Foot tip marker
    this.footTip = new THREE.Group();
    this.footTip.position.set(this.tibiaLength, 0, 0);
    this.tibiaPivot.add(this.footTip);

    // State
    this.worldFootPos = new THREE.Vector3();
    this.isGrounded = true;
    this.wasGrounded = true;

    this.buildMeshes();
  }

  buildMeshes() {
    const mats = getMaterials();

    // ==========================================
    // 1. COXA SEGMENT (Shoulder Hub & Extension)
    // ==========================================

    // Titanium mounting flange
    const flangeGeom = new THREE.CylinderGeometry(0.24, 0.26, 0.08, 16);
    const flange = new THREE.Mesh(flangeGeom, mats.gunmetal);
    flange.position.y = -0.02;
    flange.castShadow = true;
    this.coxaPivot.add(flange);

    // Hex bolt heads on mounting ring
    const boltGeom = new THREE.CylinderGeometry(0.016, 0.016, 0.03, 6);
    for (let i = 0; i < 8; i++) {
      const bAngle = (i * Math.PI * 2) / 8;
      const bolt = new THREE.Mesh(boltGeom, mats.chromePiston);
      bolt.position.set(Math.cos(bAngle) * 0.22, 0.03, Math.sin(bAngle) * 0.22);
      this.coxaPivot.add(bolt);
    }

    // Heavy-duty Harmonic Drive Servo Housing
    const servoGeom = new THREE.CylinderGeometry(0.18, 0.20, 0.32, 16);
    const servo = new THREE.Mesh(servoGeom, mats.gunmetal);
    servo.position.y = 0.08;
    servo.castShadow = true;
    this.coxaPivot.add(servo);

    // Anodized orange cooling fin rings
    for (const finY of [0.0, 0.08, 0.16]) {
      const finGeom = new THREE.TorusGeometry(0.19, 0.015, 6, 20);
      finGeom.rotateX(Math.PI / 2);
      const fin = new THREE.Mesh(finGeom, mats.marsOrange);
      fin.position.y = finY;
      this.coxaPivot.add(fin);
    }

    // Coxa Structural Arm (dual-spar composite truss)
    const armGeom = new THREE.BoxGeometry(this.coxaLength * 0.88, 0.16, 0.18);
    const arm = new THREE.Mesh(armGeom, mats.whiteArmor);
    arm.position.set(this.coxaLength * 0.44, 0.08, 0);
    arm.castShadow = true;
    this.coxaPivot.add(arm);

    // Carbon-fiber reinforcement plates on coxa sides
    for (const zOff of [-0.095, 0.095]) {
      const sideGeom = new THREE.BoxGeometry(this.coxaLength * 0.7, 0.12, 0.02);
      const side = new THREE.Mesh(sideGeom, mats.carbonFiber);
      side.position.set(this.coxaLength * 0.44, 0.08, zOff);
      this.coxaPivot.add(side);
    }

    // Telemetry status micro-LED on coxa top
    const ledGeom = new THREE.BoxGeometry(0.04, 0.02, 0.04);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x10b981 }); // Green telemetry OK
    const led = new THREE.Mesh(ledGeom, ledMat);
    led.position.set(this.coxaLength * 0.3, 0.17, 0);
    this.coxaPivot.add(led);

    // ==========================================
    // 2. FEMUR SEGMENT (Upper Limb & Hydraulic Piston)
    // ==========================================

    // Double-shear titanium shoulder clevis bracket
    const clevisGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.22, 16);
    clevisGeom.rotateX(Math.PI / 2);
    const clevis = new THREE.Mesh(clevisGeom, mats.gunmetal);
    clevis.castShadow = true;
    this.femurPivot.add(clevis);

    // Stainless steel pivot pin with endcaps
    const pinGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.26, 16);
    pinGeom.rotateX(Math.PI / 2);
    const pin = new THREE.Mesh(pinGeom, mats.chromePiston);
    this.femurPivot.add(pin);

    // Main structural skeletonized I-beam spar
    const femurMainGeom = new THREE.BoxGeometry(this.femurLength, 0.14, 0.12);
    const femurMain = new THREE.Mesh(femurMainGeom, mats.whiteArmor);
    femurMain.position.set(this.femurLength * 0.5, 0, 0);
    femurMain.castShadow = true;
    this.femurPivot.add(femurMain);

    // Carbon-fiber side reinforcement web with weight cutouts
    for (const zOff of [-0.065, 0.065]) {
      const webGeom = new THREE.BoxGeometry(this.femurLength * 0.85, 0.11, 0.015);
      const web = new THREE.Mesh(webGeom, mats.carbonFiber);
      web.position.set(this.femurLength * 0.5, 0, zOff);
      this.femurPivot.add(web);
    }

    // Mars Orange aerospace racing stripe on femur top
    const stripeGeom = new THREE.BoxGeometry(this.femurLength * 0.7, 0.02, 0.08);
    const stripe = new THREE.Mesh(stripeGeom, mats.marsOrange);
    stripe.position.set(this.femurLength * 0.5, 0.08, 0);
    this.femurPivot.add(stripe);

    // --- VISIBLE HYDRAULIC LINEAR ACTUATOR (PISTON) ---
    // Actuator cylinder barrel (gunmetal)
    const barrelLength = this.femurLength * 0.45;
    const barrelGeom = new THREE.CylinderGeometry(0.038, 0.042, barrelLength, 12);
    barrelGeom.rotateZ(-Math.PI / 2);
    const barrel = new THREE.Mesh(barrelGeom, mats.gunmetal);
    barrel.position.set(this.femurLength * 0.28, 0.13, 0);
    barrel.castShadow = true;
    this.femurPivot.add(barrel);

    // Mirror-polished shiny chrome piston rod
    const rodLength = this.femurLength * 0.38;
    const rodGeom = new THREE.CylinderGeometry(0.022, 0.022, rodLength, 12);
    rodGeom.rotateZ(-Math.PI / 2);
    const rod = new THREE.Mesh(rodGeom, mats.chromePiston);
    rod.position.set(this.femurLength * 0.62, 0.13, 0);
    rod.castShadow = true;
    this.femurPivot.add(rod);

    // Hydraulic high-pressure hose coupling
    const hoseGeom = new THREE.TorusGeometry(0.05, 0.012, 6, 16);
    const hose = new THREE.Mesh(hoseGeom, mats.marsOrange);
    hose.position.set(this.femurLength * 0.15, 0.13, 0);
    this.femurPivot.add(hose);

    // ==========================================
    // 3. TIBIA SEGMENT (Knee & Lower Suspension)
    // ==========================================

    // Heavy-duty rotary knee actuator hub
    const kneeHubGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.20, 16);
    kneeHubGeom.rotateX(Math.PI / 2);
    const kneeHub = new THREE.Mesh(kneeHubGeom, mats.gunmetal);
    kneeHub.castShadow = true;
    this.tibiaPivot.add(kneeHub);

    // Orange protective knee cap shield
    const shieldGeom = new THREE.BoxGeometry(0.14, 0.18, 0.22);
    const shield = new THREE.Mesh(shieldGeom, mats.marsOrange);
    shield.position.set(-0.02, 0.03, 0);
    this.tibiaPivot.add(shield);

    // Telescopic upper cylinder sleeve (gunmetal)
    const upperTibiaGeom = new THREE.CylinderGeometry(0.07, 0.075, this.tibiaLength * 0.3, 14);
    upperTibiaGeom.rotateZ(-Math.PI / 2);
    const upperTibia = new THREE.Mesh(upperTibiaGeom, mats.gunmetal);
    upperTibia.position.set(this.tibiaLength * 0.15, 0, 0);
    upperTibia.castShadow = true;
    this.tibiaPivot.add(upperTibia);

    // Mirror chrome suspension damper shaft inside spring
    const shaftGeom = new THREE.CylinderGeometry(0.035, 0.035, this.tibiaLength * 0.45, 12);
    shaftGeom.rotateZ(-Math.PI / 2);
    const shaft = new THREE.Mesh(shaftGeom, mats.chromePiston);
    shaft.position.set(this.tibiaLength * 0.45, 0, 0);
    this.tibiaPivot.add(shaft);

    // --- HEAVY-DUTY COILED SUSPENSION SPRING ---
    const springLength = this.tibiaLength * 0.42;
    const springGeom = createSpringGeometry(0.065, 0.016, 6, springLength);
    const springMesh = new THREE.Mesh(springGeom, mats.springSteel);
    springMesh.position.set(this.tibiaLength * 0.24, 0, 0);
    springMesh.castShadow = true;
    this.tibiaPivot.add(springMesh);

    // Rubber dust gaiter (bellows boot)
    const bellowsGeom = new THREE.CylinderGeometry(0.055, 0.055, this.tibiaLength * 0.15, 12);
    bellowsGeom.rotateZ(-Math.PI / 2);
    const bellows = new THREE.Mesh(bellowsGeom, mats.darkChassis);
    bellows.position.set(this.tibiaLength * 0.68, 0, 0);
    this.tibiaPivot.add(bellows);

    // Lower tapered carbon-fiber strut
    const lowerStrutGeom = new THREE.CylinderGeometry(0.045, 0.065, this.tibiaLength * 0.38, 14);
    lowerStrutGeom.rotateZ(-Math.PI / 2);
    const lowerStrut = new THREE.Mesh(lowerStrutGeom, mats.carbonFiber);
    lowerStrut.position.set(this.tibiaLength * 0.88, 0, 0);
    lowerStrut.castShadow = true;
    this.tibiaPivot.add(lowerStrut);

    // ==========================================
    // 4. MARTIAN COMPLIANT FOOTPAD (OMNI GROUSER)
    // ==========================================

    // Ankle spherical universal joint
    const ankleGeom = new THREE.SphereGeometry(0.07, 14, 14);
    const ankle = new THREE.Mesh(ankleGeom, mats.gunmetal);
    ankle.position.set(this.tibiaLength, 0, 0);
    this.tibiaPivot.add(ankle);

    // Flared titanium flex-disc footpad
    const footDiscGeom = new THREE.CylinderGeometry(0.16, 0.12, 0.06, 16);
    footDiscGeom.rotateZ(Math.PI / 2);
    const footDisc = new THREE.Mesh(footDiscGeom, mats.gunmetal);
    footDisc.position.set(this.tibiaLength + 0.04, 0, 0);
    footDisc.castShadow = true;
    this.tibiaPivot.add(footDisc);

    // High-traction chevron grouser tread rim
    const treadGeom = new THREE.TorusGeometry(0.14, 0.025, 8, 20);
    treadGeom.rotateY(Math.PI / 2);
    const tread = new THREE.Mesh(treadGeom, mats.darkChassis);
    tread.position.set(this.tibiaLength + 0.05, 0, 0);
    this.tibiaPivot.add(tread);

    // Tactile ground force sensor glowing ring
    const sensorGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.025, 16);
    sensorGeom.rotateZ(Math.PI / 2);
    this.footPad = new THREE.Mesh(sensorGeom, mats.sensorGlow);
    this.footPad.position.set(this.tibiaLength + 0.07, 0, 0);
    this.tibiaPivot.add(this.footPad);
  }

  /**
   * Analytical 3-DOF Inverse Kinematics
   * Mathematically exact: calculates coxa, femur, and tibia rotations
   */
  solveIK(targetLocal) {
    // 1. Coxa yaw angle around local Y
    const coxaAngle = -Math.atan2(targetLocal.z, targetLocal.x);
    this.coxaPivot.rotation.y = coxaAngle;

    // 2. Project target onto sagittal limb plane
    const horiz = Math.sqrt(targetLocal.x * targetLocal.x + targetLocal.z * targetLocal.z) - this.coxaLength;
    const vert = targetLocal.y;

    const D = Math.sqrt(horiz * horiz + vert * vert);

    // Clamp D to prevent kinematic singularities
    const maxReach = (this.femurLength + this.tibiaLength) * 0.98;
    const minReach = Math.abs(this.femurLength - this.tibiaLength) * 1.05;
    const clampedD = Math.max(minReach, Math.min(maxReach, D));

    // Law of Cosines for Tibia angle
    const cosTibia = (this.femurLength * this.femurLength + this.tibiaLength * this.tibiaLength - clampedD * clampedD) /
                     (2 * this.femurLength * this.tibiaLength);
    const tibiaAngle = Math.PI - Math.acos(Math.max(-1, Math.min(1, cosTibia)));

    // Law of Cosines for Femur angle
    const alpha = Math.atan2(vert, horiz);
    const cosFemur = (this.femurLength * this.femurLength + clampedD * clampedD - this.tibiaLength * this.tibiaLength) /
                     (2 * this.femurLength * clampedD);
    const beta = Math.acos(Math.max(-1, Math.min(1, cosFemur)));
    const femurAngle = (alpha + beta);

    this.femurPivot.rotation.z = femurAngle;
    this.tibiaPivot.rotation.z = -tibiaAngle;
  }
}

/**
 * ARES-6 Autonomous Martian Hexapod Rover
 * Features an authentic NASA/JPL space exploration chassis:
 * Multi-layer insulation (MLI), gold Kapton thermal blankets, segmented
 * crystalline solar array deck, stereoscopic Mastcam-Z remote sensing mast,
 * radioisotope thermoelectric generator (RTG), and steerable high-gain parabolic antenna.
 */
export class HexapodRobot {
  constructor(scene) {
    this.scene = scene;

    // Main world root group
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Robot body (chassis) group - dynamically adjusted by BodyLeveler
    this.body = new THREE.Group();
    this.group.add(this.body);

    // Leg array
    this.legs = [];

    // Kinematic parameters
    this.chassisRadius = 1.35;
    this.bodyHeight = 1.15; // Nominal ground clearance

    // State & heading
    this.position = this.group.position;
    this.rotation = this.group.rotation;

    this.buildChassis();
    this.buildLegs();
    this.buildContactShadow();
  }

  buildChassis() {
    const mats = getMaterials();

    // ==========================================
    // 1. LOWER HULL & CARBON-FIBER SKIDPLATE
    // ==========================================

    // Carbon-composite armored undercarriage pan
    const skidGeom = new THREE.CylinderGeometry(this.chassisRadius * 1.05, this.chassisRadius * 0.95, 0.16, 6);
    const skid = new THREE.Mesh(skidGeom, mats.darkChassis);
    skid.position.y = -0.04;
    skid.castShadow = true;
    skid.receiveShadow = true;
    this.body.add(skid);

    // Titanium mounting bulkhead ring
    const bulkGeom = new THREE.CylinderGeometry(this.chassisRadius * 1.15, this.chassisRadius * 1.12, 0.12, 6);
    const bulk = new THREE.Mesh(bulkGeom, mats.gunmetal);
    bulk.position.y = 0.08;
    bulk.castShadow = true;
    this.body.add(bulk);

    // ==========================================
    // 2. CENTRAL AVIONICS HULL (GOLD KAPTON & WHITE ARMOR)
    // ==========================================

    // Main hexagonal hull body with White Aerospace Armor
    const hullGeom = new THREE.CylinderGeometry(this.chassisRadius, this.chassisRadius * 1.12, 0.42, 6);
    const hull = new THREE.Mesh(hullGeom, mats.whiteArmor);
    hull.position.y = 0.32;
    hull.castShadow = true;
    hull.receiveShadow = true;
    this.body.add(hull);

    // Gold Kapton Thermal Insulation Blanket Bays (on side equipment pods)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + Math.PI / 6;
      const bayGeom = new THREE.BoxGeometry(0.85, 0.28, 0.08);
      const bay = new THREE.Mesh(bayGeom, mats.goldFoil);
      bay.position.set(
        Math.cos(angle) * (this.chassisRadius * 1.02),
        0.32,
        Math.sin(angle) * (this.chassisRadius * 1.02)
      );
      bay.rotation.y = -angle + Math.PI / 2;
      bay.castShadow = true;
      this.body.add(bay);
    }

    // Mars Orange Racing / Stencil Striping across upper hull
    const stripeGeom = new THREE.BoxGeometry(0.28, 0.44, 2.5);
    const stripe = new THREE.Mesh(stripeGeom, mats.marsOrange);
    stripe.position.set(0, 0.33, 0);
    this.body.add(stripe);

    // Downward-facing front stereoscopic Hazard Cameras (Hazcams)
    for (const xOff of [-0.35, 0.35]) {
      const hazGeom = new THREE.BoxGeometry(0.16, 0.12, 0.14);
      const haz = new THREE.Mesh(hazGeom, mats.gunmetal);
      haz.position.set(xOff, 0.06, 1.25);
      haz.rotation.x = 0.35; // Angled down toward ground
      this.body.add(haz);

      const hazLensGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 14);
      hazLensGeom.rotateX(Math.PI / 2);
      const hazLens = new THREE.Mesh(hazLensGeom, mats.cameraLens);
      hazLens.position.set(xOff, 0.05, 1.33);
      this.body.add(hazLens);
    }

    // ==========================================
    // 3. SEGMENTED PHOTOVOLTAIC SOLAR DECK
    // ==========================================

    // Standoff spacer ring
    const standGeom = new THREE.CylinderGeometry(this.chassisRadius * 0.88, this.chassisRadius * 0.90, 0.04, 6);
    const stand = new THREE.Mesh(standGeom, mats.gunmetal);
    stand.position.y = 0.54;
    this.body.add(stand);

    // High-efficiency segmented crystalline solar array deck
    const solarGeom = new THREE.CylinderGeometry(this.chassisRadius * 0.85, this.chassisRadius * 0.85, 0.05, 6);
    const solar = new THREE.Mesh(solarGeom, mats.solarDeck);
    solar.position.y = 0.58;
    solar.castShadow = true;
    this.body.add(solar);

    // Titanium perimeter hold-down clamps with micro-bolts
    for (let i = 0; i < 6; i++) {
      const cAngle = (i * Math.PI) / 3;
      const clampGeom = new THREE.BoxGeometry(0.14, 0.07, 0.08);
      const clamp = new THREE.Mesh(clampGeom, mats.chromePiston);
      clamp.position.set(
        Math.cos(cAngle) * (this.chassisRadius * 0.85),
        0.59,
        Math.sin(cAngle) * (this.chassisRadius * 0.85)
      );
      clamp.rotation.y = -cAngle;
      this.body.add(clamp);
    }

    // ==========================================
    // 4. PERSEVERANCE-STYLE SENSOR MAST (MASTCAM-Z)
    // ==========================================

    // Articulated tubular mast pole (titanium)
    const mastGeom = new THREE.CylinderGeometry(0.075, 0.09, 0.85, 16);
    const mast = new THREE.Mesh(mastGeom, mats.gunmetal);
    mast.position.set(0, 1.0, 0.55); // Towards front (+Z)
    mast.castShadow = true;
    this.body.add(mast);

    // Coiled wire conduit spiral around mast
    const wireGeom = new THREE.TorusGeometry(0.095, 0.015, 6, 24);
    wireGeom.rotateX(Math.PI / 2);
    for (let wy = 0.7; wy <= 1.25; wy += 0.16) {
      const wire = new THREE.Mesh(wireGeom, mats.marsOrange);
      wire.position.set(0, wy, 0.55);
      this.body.add(wire);
    }

    // Pan-Tilt Gimbal Base
    const gimbalGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.16, 16);
    const gimbal = new THREE.Mesh(gimbalGeom, mats.gunmetal);
    gimbal.position.set(0, 1.48, 0.55);
    this.body.add(gimbal);

    // Stereoscopic Navigation Camera Head Housing
    const headGeom = new THREE.BoxGeometry(0.68, 0.26, 0.34);
    const head = new THREE.Mesh(headGeom, mats.whiteArmor);
    head.position.set(0, 1.62, 0.55);
    head.castShadow = true;
    this.body.add(head);

    // Twin Multispectral Telephoto Lenses (Navcams) with square sunshades
    for (const xOff of [-0.22, 0.22]) {
      // Cylindrical lens barrel
      const barrelGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.15, 16);
      barrelGeom.rotateX(Math.PI / 2);
      const barrel = new THREE.Mesh(barrelGeom, mats.gunmetal);
      barrel.position.set(xOff, 1.62, 0.74);
      barrel.castShadow = true;
      this.body.add(barrel);

      // Gold aperture ring
      const ringGeom = new THREE.TorusGeometry(0.082, 0.01, 8, 20);
      const ring = new THREE.Mesh(ringGeom, mats.goldFoil);
      ring.position.set(xOff, 1.62, 0.81);
      this.body.add(ring);

      // Multi-coated glass lens
      const lensGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.04, 16);
      lensGeom.rotateX(Math.PI / 2);
      const lens = new THREE.Mesh(lensGeom, mats.cameraLens);
      lens.position.set(xOff, 1.62, 0.82);
      this.body.add(lens);

      // Square sunshade protective hood
      const hoodGeom = new THREE.BoxGeometry(0.18, 0.18, 0.08);
      const hood = new THREE.Mesh(hoodGeom, mats.darkChassis);
      hood.position.set(xOff, 1.62, 0.84);
      this.body.add(hood);

      // High-Intensity Forward Headlight Beam
      const spot = new THREE.SpotLight(0x06b6d4, 3.2, 35, Math.PI / 4.5, 0.4);
      spot.position.set(xOff, 1.62, 0.88);
      spot.target.position.set(xOff, -0.5, 14);
      this.body.add(spot);
      this.body.add(spot.target);
    }

    // Central SuperCam Laser Spectrometer Aperture
    const superCamGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.12, 16);
    superCamGeom.rotateX(Math.PI / 2);
    const superCam = new THREE.Mesh(superCamGeom, mats.goldFoil);
    superCam.position.set(0, 1.66, 0.73);
    this.body.add(superCam);

    // Twin MEDA Wind & Environmental Sensor Boom Arms
    for (const side of [-1, 1]) {
      const boomGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.45, 8);
      boomGeom.rotateZ(Math.PI / 2);
      const boom = new THREE.Mesh(boomGeom, mats.chromePiston);
      boom.position.set(side * 0.52, 1.62, 0.55);
      this.body.add(boom);

      // Anemometer tip sensor
      const tipGeom = new THREE.SphereGeometry(0.035, 8, 8);
      const tip = new THREE.Mesh(tipGeom, mats.marsOrange);
      tip.position.set(side * 0.75, 1.62, 0.55);
      this.body.add(tip);
    }

    // ==========================================
    // 5. REAR POWER & TELECOM DECK
    // ==========================================

    // Radioisotope Thermoelectric Generator (RTG) with 8 radial cooling fins
    const rtgCoreGeom = new THREE.CylinderGeometry(0.18, 0.22, 0.48, 16);
    const rtgCore = new THREE.Mesh(rtgCoreGeom, mats.gunmetal);
    rtgCore.position.set(0, 0.72, -0.85);
    rtgCore.castShadow = true;
    this.body.add(rtgCore);

    // RTG cooling fins
    for (let f = 0; f < 8; f++) {
      const fAngle = (f * Math.PI) / 4;
      const finGeom = new THREE.BoxGeometry(0.02, 0.44, 0.22);
      const fin = new THREE.Mesh(finGeom, mats.darkChassis);
      fin.position.set(
        Math.cos(fAngle) * 0.26,
        0.72,
        -0.85 + Math.sin(fAngle) * 0.26
      );
      fin.rotation.y = -fAngle;
      fin.castShadow = true;
      this.body.add(fin);
    }

    // High-Gain Parabolic Communications Dish Antenna (HGA)
    const dishGeom = new THREE.SphereGeometry(0.38, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const dish = new THREE.Mesh(dishGeom, mats.goldFoil);
    dish.position.set(0.48, 0.85, -0.45);
    dish.rotation.x = -Math.PI * 0.65;
    dish.rotation.y = 0.25;
    dish.castShadow = true;
    this.body.add(dish);

    // Central feed horn for dish
    const feedGeom = new THREE.CylinderGeometry(0.025, 0.04, 0.28, 8);
    const feed = new THREE.Mesh(feedGeom, mats.chromePiston);
    feed.position.set(0.48, 0.98, -0.40);
    this.body.add(feed);

    // Low-Gain Omni Antenna (LGA) Whip
    const lgaGeom = new THREE.CylinderGeometry(0.012, 0.025, 0.65, 8);
    const lga = new THREE.Mesh(lgaGeom, mats.chromePiston);
    lga.position.set(-0.55, 0.90, -0.45);
    this.body.add(lga);

    // Self-Illumination Specular Light (soft vehicle envelope fill)
    const coreLight = new THREE.PointLight(0xffeedd, 1.8, 8);
    coreLight.position.set(0, 1.8, 0);
    this.body.add(coreLight);
  }

  buildLegs() {
    // Symmetrical 6-leg arrangement:
    // +Z is Forward, +X is Right
    const legMountAngles = [
      (50 * Math.PI) / 180,   // Leg 0: Front Right
      0,                      // Leg 1: Mid Right
      (-50 * Math.PI) / 180,  // Leg 2: Rear Right
      (-130 * Math.PI) / 180, // Leg 3: Rear Left
      Math.PI,                // Leg 4: Mid Left
      (130 * Math.PI) / 180   // Leg 5: Front Left
    ];

    for (let i = 0; i < 6; i++) {
      const leg = new HexapodLeg(i, legMountAngles[i], this.chassisRadius);
      this.body.add(leg.root);
      this.legs.push(leg);
    }
  }

  buildContactShadow() {
    const mats = getMaterials();

    // Soft Gaussian ambient occlusion contact shadow plane beneath the rover
    const shadowGeom = new THREE.PlaneGeometry(6.4, 6.4);
    shadowGeom.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: mats.shadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    this.contactShadow = new THREE.Mesh(shadowGeom, shadowMat);
    this.contactShadow.position.y = 0.04;
    this.group.add(this.contactShadow);
  }
}

/**
 * Gait Kinematics Controller
 * Generates true Tripod & Wave gait phases with terrain grounding
 */
export class HexapodGait {
  constructor(robot, terrain, audio = null) {
    this.robot = robot;
    this.terrain = terrain;
    this.audio = audio;

    // Gait parameters
    this.mode = 'tripod';
    this.phase = 0.0;
    this.cycleSpeed = 1.35; // Nominal gait frequency (Hz)
    this.stepHeight = 0.38; // Swing apex vertical lift (m)
    this.bodyHeight = 1.15; // Nominal ground clearance (m)

    // Tripod groups: Two opposing triangular support tripods
    this.groupA = [0, 2, 4]; // Front-Right, Rear-Right, Mid-Left
    this.groupB = [1, 3, 5]; // Mid-Right, Rear-Left, Front-Left

    // Neutral foot ground stance spread radii (calibrated for authentic expansive hexapod geometry)
    this.stanceRadiusMid = 2.80;        // Mid legs reach further outward (m)
    this.stanceRadiusFrontRear = 2.75;   // Front & rear legs splay outward (m)
  }

  setMode(mode) {
    if (mode === 'tripod' || mode === 'wave') {
      this.mode = mode;
    }
  }

  /**
   * Updates Hexapod Gait Kinematics
   * Supports forward/reverse linear locomotion, zero-radius yaw rotation (turn in place),
   * and curvilinear combined walking/turning via differential circular kinematics.
   * 
   * @param {number} dt - Frame delta time in seconds
   * @param {number|THREE.Vector3} linearSpeedOrVector - Commanded linear forward speed (m/s) or input vector
   * @param {number} [yawRate=0] - Commanded yaw rotation rate (rad/s), positive = turning right
   */
  update(dt, linearSpeedOrVector, yawRate = 0) {
    let linearSpeed = 0;
    let actualYawRate = yawRate;

    if (linearSpeedOrVector instanceof THREE.Vector3) {
      linearSpeed = linearSpeedOrVector.length() * Math.sign(linearSpeedOrVector.z || 1);
    } else {
      linearSpeed = Number(linearSpeedOrVector) || 0;
    }

    // Effective kinematic speed combining linear translation and perimeter rotation speed
    const avgRadius = 2.75;
    const effectiveSpeed = Math.hypot(linearSpeed, actualYawRate * avgRadius);
    const isMoving = effectiveSpeed > 0.025;

    if (isMoving) {
      // Dynamic stepping cadence: steps faster when moving/turning faster
      const speedScale = Math.min(2.2, Math.max(0.65, effectiveSpeed / 2.8));
      this.phase = (this.phase + dt * this.cycleSpeed * speedScale) % 1.0;
    }

    // Effective step duration scaling
    const speedScale = isMoving ? Math.min(2.2, Math.max(0.65, effectiveSpeed / 2.8)) : 1.0;
    const timeScale = 0.5 / (this.cycleSpeed * speedScale);

    this.robot.legs.forEach((leg) => {
      // 1. Determine leg phase and stance/swing state
      let legPhase = 0;
      let isStance = true;

      if (this.mode === 'tripod') {
        const isGroupA = this.groupA.includes(leg.id);
        legPhase = (isGroupA ? this.phase : this.phase + 0.5) % 1.0;
        // Tripod duty cycle: 0.0 - 0.5 Swing, 0.5 - 1.0 Stance
        isStance = legPhase >= 0.5 || !isMoving;
      } else {
        // Wave Gait: Sequential 1/6 cycle swing per leg
        legPhase = (this.phase + (leg.id / 6.0)) % 1.0;
        isStance = legPhase >= (1.0 / 6.0) || !isMoving;
      }

      // Audio footstep feedback when transitioning from swing to stance contact
      if (isStance && !leg.wasGrounded && isMoving && this.audio) {
        this.audio.playFootstep();
      }
      leg.wasGrounded = isStance;
      leg.isGrounded = isStance;

      // Update tactile foot pad glow
      if (leg.footPad && leg.footPad.material) {
        leg.footPad.material.emissiveIntensity = isStance ? 0.95 : 0.25;
      }

      // 2. Neutral foot stance position in robot's local chassis coordinate frame
      const radius = (leg.id === 1 || leg.id === 4) ? this.stanceRadiusMid : this.stanceRadiusFrontRear;
      const neutralX = Math.cos(leg.mountAngle) * radius;
      const neutralZ = Math.sin(leg.mountAngle) * radius;

      // 3. Differential Circular Stride Vector:
      // Computes tangent circular velocity for yaw rotation + forward linear velocity
      let targetLocalX = neutralX;
      let targetLocalZ = neutralZ;
      let swingLift = 0;

      if (isMoving) {
        // Ground velocity at foot contact relative to chassis:
        // Rotational component: V_rot = omega x r = (yawRate * Z, -yawRate * X)
        // Linear component: (0, linearSpeed)
        const v_rel_x = actualYawRate * neutralZ;
        const v_rel_z = linearSpeed - actualYawRate * neutralX;

        // Clamp maximum half-stride reach to prevent kinematic singularities
        const maxStride = (this.mode === 'tripod') ? 0.72 : 0.50;
        let strideX = v_rel_x * timeScale;
        let strideZ = v_rel_z * timeScale;
        const strideDist = Math.hypot(strideX, strideZ);
        if (strideDist > maxStride) {
          strideX = (strideX / strideDist) * maxStride;
          strideZ = (strideZ / strideDist) * maxStride;
        }

        if (isStance) {
          // Stance Phase: Foot firmly planted on ground, pushing backward relative to motion
          const s = this.mode === 'tripod'
            ? (legPhase - 0.5) / 0.5
            : (legPhase - 1.0 / 6.0) / (5.0 / 6.0);
          const clampedS = Math.max(0, Math.min(1, s));
          // pushProgress sweeps linearly from +1 (touchdown ahead) to -1 (liftoff behind)
          const pushProgress = 1.0 - 2.0 * clampedS;
          targetLocalX = neutralX + strideX * pushProgress;
          targetLocalZ = neutralZ + strideZ * pushProgress;
        } else {
          // Swing Phase: Foot lifted in air, swinging ahead along the circular arc
          const s = this.mode === 'tripod' ? legPhase / 0.5 : legPhase * 6.0;
          const clampedS = Math.max(0, Math.min(1, s));
          // S-curve Hermite interpolation for smooth natural acceleration
          const p = 3.0 * clampedS * clampedS - 2.0 * clampedS * clampedS * clampedS;
          // Interpolate from liftoff (-stride) to touchdown (+stride)
          targetLocalX = neutralX - strideX + 2.0 * strideX * p;
          targetLocalZ = neutralZ - strideZ + 2.0 * strideZ * p;
          // Smooth parabolic apex lift
          swingLift = Math.sin(clampedS * Math.PI) * this.stepHeight;
        }
      }

      // 4. Transform target foot position from local body space into 3D world space
      const worldPos = new THREE.Vector3(targetLocalX, 0, targetLocalZ);
      worldPos.applyEuler(new THREE.Euler(0, this.robot.rotation.y, 0));
      worldPos.add(this.robot.position);

      // Track authentic Martian terrain elevation
      const groundY = this.terrain ? this.terrain.getHeight(worldPos.x, worldPos.z) : 0;
      const targetWorldY = groundY + swingLift;
      leg.worldFootPos.set(worldPos.x, targetWorldY, worldPos.z);

      // 5. Convert world foot target into leg root local coordinate space
      this.robot.scene.updateMatrixWorld(true);
      const localTarget = leg.worldFootPos.clone();
      leg.root.worldToLocal(localTarget);

      // 6. Analytical 3-DOF Inverse Kinematics solution
      leg.solveIK(localTarget);
    });
  }
}
