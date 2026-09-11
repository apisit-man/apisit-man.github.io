import * as THREE from 'three';

/**
 * 3-DOF Articulated Robotic Limb with High-Precision Inverse Kinematics
 */
class HexapodLeg {
  constructor(id, mountAngle, mountRadius) {
    this.id = id;
    this.mountAngle = mountAngle;
    this.mountRadius = mountRadius;

    // Segment lengths (meters)
    this.coxaLength = 0.45;
    this.femurLength = 0.85;
    this.tibiaLength = 1.15;

    // Root mount group on chassis
    this.root = new THREE.Group();
    this.root.position.set(
      Math.cos(mountAngle) * mountRadius,
      0,
      Math.sin(mountAngle) * mountRadius
    );
    // Point root radially outward
    this.root.rotation.y = -mountAngle;

    // 1. Coxa Joint (horizontal yaw pivot)
    this.coxaPivot = new THREE.Group();
    this.root.add(this.coxaPivot);

    // 2. Femur Joint (vertical pitch pivot)
    this.femurPivot = new THREE.Group();
    this.femurPivot.position.set(this.coxaLength, 0, 0);
    this.coxaPivot.add(this.femurPivot);

    // 3. Tibia Joint (knee pitch pivot)
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

    this.buildMeshes();
  }

  buildMeshes() {
    // Aerospace Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9, // Crisp Aerospace White/Titanium
      metalness: 0.85,
      roughness: 0.25
    });
    const jointMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Slate Gunmetal
      metalness: 0.9,
      roughness: 0.2
    });
    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xf97316, // Mars Orange Accent
      metalness: 0.5,
      roughness: 0.3
    });
    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Carbon Fiber
      metalness: 0.4,
      roughness: 0.5
    });
    const sensorGlowMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan Tactile Sensor
      emissive: 0x06b6d4,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8
    });

    // 1. Coxa Segment (Shoulder Hub & Arm)
    const coxaHubGeom = new THREE.CylinderGeometry(0.2, 0.22, 0.28, 16);
    const coxaHub = new THREE.Mesh(coxaHubGeom, jointMat);
    coxaHub.castShadow = true;
    this.coxaPivot.add(coxaHub);

    const coxaCapGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.3, 16);
    const coxaCap = new THREE.Mesh(coxaCapGeom, orangeMat);
    this.coxaPivot.add(coxaCap);

    const coxaArmGeom = new THREE.BoxGeometry(this.coxaLength, 0.16, 0.18);
    const coxaArm = new THREE.Mesh(coxaArmGeom, titaniumMat);
    coxaArm.position.set(this.coxaLength * 0.5, 0, 0);
    coxaArm.castShadow = true;
    this.coxaPivot.add(coxaArm);

    // 2. Femur Segment (Upper Limb & Hydraulic Piston)
    const femurJointGeom = new THREE.SphereGeometry(0.18, 16, 16);
    const femurJoint = new THREE.Mesh(femurJointGeom, jointMat);
    femurJoint.castShadow = true;
    this.femurPivot.add(femurJoint);

    const femurArmGeom = new THREE.BoxGeometry(this.femurLength, 0.14, 0.14);
    const femurArm = new THREE.Mesh(femurArmGeom, titaniumMat);
    femurArm.position.set(this.femurLength * 0.5, 0, 0);
    femurArm.castShadow = true;
    this.femurPivot.add(femurArm);

    // Orange racing stripe on femur
    const femurStripeGeom = new THREE.BoxGeometry(this.femurLength * 0.6, 0.145, 0.04);
    const femurStripe = new THREE.Mesh(femurStripeGeom, orangeMat);
    femurStripe.position.set(this.femurLength * 0.5, 0, 0.06);
    this.femurPivot.add(femurStripe);

    // 3. Tibia Segment (Lower Limb & Knee)
    const kneeGeom = new THREE.SphereGeometry(0.16, 16, 16);
    const knee = new THREE.Mesh(kneeGeom, orangeMat);
    this.tibiaPivot.add(knee);

    const tibiaArmGeom = new THREE.CylinderGeometry(0.06, 0.09, this.tibiaLength, 12);
    tibiaArmGeom.rotateZ(-Math.PI / 2);
    const tibiaArm = new THREE.Mesh(tibiaArmGeom, carbonMat);
    tibiaArm.position.set(this.tibiaLength * 0.5, 0, 0);
    tibiaArm.castShadow = true;
    this.tibiaPivot.add(tibiaArm);

    // 4. Ground Tactile Foot Sensor Pad
    const footGeom = new THREE.SphereGeometry(0.13, 16, 16);
    this.footPad = new THREE.Mesh(footGeom, sensorGlowMat);
    this.footPad.position.set(this.tibiaLength, 0, 0);
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
 */
export class HexapodRobot {
  constructor(scene) {
    this.scene = scene;

    // Main world root group
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Robot body (chassis) group - controlled by BodyLeveler
    this.body = new THREE.Group();
    this.group.add(this.body);

    // Leg array
    this.legs = [];

    // Kinematic parameters
    this.chassisRadius = 1.35;
    this.bodyHeight = 1.35; // Nominal ground clearance

    // State & heading
    this.position = this.group.position;
    this.rotation = this.group.rotation;

    this.buildChassis();
    this.buildLegs();
  }

  buildChassis() {
    // 1. Aerodynamic Hexagonal Titanium Armor Hull
    const hullGeom = new THREE.CylinderGeometry(this.chassisRadius, this.chassisRadius * 1.15, 0.45, 6);
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // Pure Aerospace White
      metalness: 0.85,
      roughness: 0.25
    });
    const hull = new THREE.Mesh(hullGeom, hullMat);
    hull.position.y = 0.22;
    hull.castShadow = true;
    hull.receiveShadow = true;
    this.body.add(hull);

    // Undercarriage Carbon-Fiber Base
    const baseGeom = new THREE.CylinderGeometry(this.chassisRadius * 1.1, this.chassisRadius * 1.05, 0.12, 6);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.6,
      roughness: 0.4
    });
    const base = new THREE.Mesh(baseGeom, baseMat);
    base.position.y = 0.04;
    this.body.add(base);

    // Mars Orange Racing Decals
    const stripeGeom = new THREE.BoxGeometry(0.25, 0.46, 2.4);
    const stripeMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.4,
      roughness: 0.3
    });
    const stripe = new THREE.Mesh(stripeGeom, stripeMat);
    stripe.position.set(0, 0.23, 0);
    this.body.add(stripe);

    // 2. High-Efficiency Hexagonal Solar Panel Array
    const solarGeom = new THREE.CylinderGeometry(this.chassisRadius * 0.82, this.chassisRadius * 0.82, 0.04, 6);
    const solarMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a, // Deep Space Solar Blue
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.25,
      roughness: 0.15,
      metalness: 0.95
    });
    const solar = new THREE.Mesh(solarGeom, solarMat);
    solar.position.y = 0.46;
    this.body.add(solar);

    // 3. Sensor Mast & Stereoscopic 3D Navigation Camera (Pointing Forward along +Z)
    const mastGeom = new THREE.CylinderGeometry(0.06, 0.08, 0.7, 12);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85 });
    const mast = new THREE.Mesh(mastGeom, mastMat);
    mast.position.set(0, 0.75, 0.5); // Placed toward front (+Z)
    this.body.add(mast);

    // Dual-Lens Camera Head
    const camHeadGeom = new THREE.BoxGeometry(0.55, 0.2, 0.28);
    const camHeadMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.7,
      roughness: 0.3
    });
    const camHead = new THREE.Mesh(camHeadGeom, camHeadMat);
    camHead.position.set(0, 1.15, 0.5);
    this.body.add(camHead);

    // Dual Glowing Headlight Lenses (Facing forward along +Z)
    for (const xOffset of [-0.18, 0.18]) {
      const lensGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.08, 16);
      lensGeom.rotateX(Math.PI / 2);
      const lensMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 }); // Glowing Cyan
      const lens = new THREE.Mesh(lensGeom, lensMat);
      lens.position.set(xOffset, 1.15, 0.65);
      this.body.add(lens);

      // High-Intensity Forward Headlight Beam
      const spot = new THREE.SpotLight(0x06b6d4, 2.5, 25, Math.PI / 5, 0.4);
      spot.position.set(xOffset, 1.15, 0.68);
      spot.target.position.set(xOffset, -0.5, 12); // Points forward onto ground
      this.body.add(spot);
      this.body.add(spot.target);
    }

    // 4. High-Gain Communications Dish Antenna (At Rear -Z)
    const dishGeom = new THREE.CylinderGeometry(0.35, 0.08, 0.08, 16);
    dishGeom.rotateX(-Math.PI / 4);
    const dishMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.9,
      roughness: 0.2
    });
    const dish = new THREE.Mesh(dishGeom, dishMat);
    dish.position.set(0, 0.75, -0.6);
    this.body.add(dish);

    // 5. Rover Self-Illumination Specular Light
    const coreLight = new THREE.PointLight(0xffeedd, 2.0, 8);
    coreLight.position.set(0, 1.8, 0);
    this.body.add(coreLight);
  }

  buildLegs() {
    // Symmetrical 6-leg layout:
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
}

/**
 * Gait Kinematics Controller
 * Generates true Tripod & Wave gait phases with terrain grounding
 */
export class HexapodGait {
  constructor(robot, terrain) {
    this.robot = robot;
    this.terrain = terrain;

    // Gait parameters
    this.mode = 'tripod';
    this.phase = 0.0;
    this.cycleSpeed = 1.4; // Cycles per second
    this.stepHeight = 0.42; // Swing apex height
    this.strideLength = 0.9;
    this.bodyHeight = 1.35; // Nominal ground clearance

    // Tripod groups: True opposing tripod triangles
    this.groupA = [0, 2, 4]; // Front-Right, Rear-Right, Mid-Left
    this.groupB = [1, 3, 5]; // Mid-Right, Rear-Left, Front-Left

    // Neutral foot ground stance spread radius
    this.stanceNeutralRadius = 1.95;
  }

  setMode(mode) {
    if (mode === 'tripod' || mode === 'wave') {
      this.mode = mode;
    }
  }

  update(dt, v) {
    const isMoving = v.lengthSq() > 0.001;

    if (isMoving) {
      this.phase = (this.phase + dt * this.cycleSpeed) % 1.0;
    }

    this.robot.legs.forEach((leg) => {
      // Calculate leg phase
      let legPhase = 0;
      let isStance = true;

      if (this.mode === 'tripod') {
        const isGroupA = this.groupA.includes(leg.id);
        legPhase = (isGroupA ? this.phase : this.phase + 0.5) % 1.0;
        // Tripod: 0.0 - 0.5 swing, 0.5 - 1.0 stance
        isStance = legPhase >= 0.5 || !isMoving;
      } else {
        // Wave Gait: 1/6 cycle swing per leg
        legPhase = (this.phase + (leg.id / 6.0)) % 1.0;
        isStance = legPhase >= (1.0 / 6.0) || !isMoving;
      }

      leg.isGrounded = isStance;

      // Update foot pad glow
      if (leg.footPad && leg.footPad.material) {
        leg.footPad.material.emissiveIntensity = isStance ? 0.7 : 0.2;
      }

      // Compute ideal neutral foot ground anchor in world coordinates
      const worldYaw = this.robot.rotation.y;
      const totalAngle = leg.mountAngle + worldYaw;

      const footAnchorX = this.robot.position.x + Math.cos(totalAngle) * this.stanceNeutralRadius;
      const footAnchorZ = this.robot.position.z + Math.sin(totalAngle) * this.stanceNeutralRadius;

      // Motion stride offset along velocity vector
      let motionOffsetX = 0;
      let motionOffsetZ = 0;

      if (isMoving) {
        const strideProgress = isStance ? (0.5 - (legPhase - 0.5)) * 2.0 : (legPhase / 0.5) * 2.0 - 1.0;
        motionOffsetX = v.x * this.strideLength * strideProgress * 0.4;
        motionOffsetZ = v.z * this.strideLength * strideProgress * 0.4;
      }

      const targetWorldX = footAnchorX + motionOffsetX;
      const targetWorldZ = footAnchorZ + motionOffsetZ;

      // Ground terrain elevation
      const groundY = this.terrain ? this.terrain.getHeight(targetWorldX, targetWorldZ) : 0;

      // Swing lift parabolic arc
      let swingLift = 0;
      if (!isStance && isMoving) {
        const swingNorm = this.mode === 'tripod' ? legPhase / 0.5 : legPhase * 6.0;
        swingLift = Math.sin(swingNorm * Math.PI) * this.stepHeight;
      }

      const targetWorldY = groundY + swingLift;
      leg.worldFootPos.set(targetWorldX, targetWorldY, targetWorldZ);

      // Convert world foot target into leg root local coordinate space
      this.robot.scene.updateMatrixWorld(true);
      const localTarget = leg.worldFootPos.clone();
      leg.root.worldToLocal(localTarget);

      // Solve inverse kinematics
      leg.solveIK(localTarget);
    });
  }
}
