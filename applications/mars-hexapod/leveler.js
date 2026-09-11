import * as THREE from 'three';

/**
 * Chassis Leveling Controller (BodyLeveler)
 * Computes support plane orientation from grounded foot contacts
 * and applies damped pitch, roll, and elevation compensation to the body.
 * 
 * Based on Dr. Apisit Tongchai's terrain-adaptive hexapod robotics kinematics.
 */
export class BodyLeveler {
  constructor(robot) {
    this.robot = robot;

    // Active state toggle
    this.enabled = true;

    // Smoothing filter coefficients (0.05 = heavy damping, 0.2 = fast reaction)
    this.damping = 0.08;

    // Dynamic state
    this.currentElevation = 1.4;
    this.currentPitch = 0.0;
    this.currentRoll = 0.0;

    // Target state
    this.targetElevation = 1.4;
    this.targetPitch = 0.0;
    this.targetRoll = 0.0;

    // Working math vectors
    this.tempPlane = new THREE.Plane();
    this.tempNormal = new THREE.Vector3(0, 1, 0);
    this.up = new THREE.Vector3(0, 1, 0);
    this.calculatedCentroid = new THREE.Vector3();

    // Stability metrics for telemetry
    this.stabilityIndex = 100; // 0 - 100%
    this.tiltAngleDeg = 0;
  }

  /**
   * Updates body orientation using active stance leg foot positions.
   * @param {Array<THREE.Vector3>} groundedFootPositions - World-space positions of grounded feet
   * @param {number} nominalElevation - Base ground clearance height
   */
  update(groundedFootPositions, nominalElevation = 1.4) {
    if (!this.robot || !this.robot.body) return;

    if (!this.enabled) {
      // When leveling is OFF, body maintains default local orientation
      // but follows terrain elevation with raw baseline response
      if (groundedFootPositions.length >= 3) {
        let avgY = 0;
        groundedFootPositions.forEach((pos) => { avgY += pos.y; });
        const groundCentroidY = avgY / groundedFootPositions.length;
        const targetRelElev = (groundCentroidY - this.robot.position.y) + nominalElevation;
        this.currentElevation += (targetRelElev - this.currentElevation) * 0.15;
        this.robot.body.position.y = this.currentElevation;
      }
      // Without leveling, body tilts according to rough chassis inertia or stays rigid relative to gravity
      this.currentPitch += (0.0 - this.currentPitch) * 0.05;
      this.currentRoll += (0.0 - this.currentRoll) * 0.05;
      this.robot.body.rotation.x = this.currentPitch;
      this.robot.body.rotation.z = this.currentRoll;
      this.tiltAngleDeg = Math.round(Math.sqrt(this.currentPitch * this.currentPitch + this.currentRoll * this.currentRoll) * (180 / Math.PI));
      this.stabilityIndex = Math.max(0, 100 - this.tiltAngleDeg * 3.5);
      return;
    }

    if (groundedFootPositions.length < 3) return;

    // 1. Calculate centroid (average ground elevation of stance feet)
    let avgY = 0;
    let avgX = 0;
    let avgZ = 0;
    groundedFootPositions.forEach((pos) => {
      avgX += pos.x;
      avgY += pos.y;
      avgZ += pos.z;
    });
    const len = groundedFootPositions.length;
    this.calculatedCentroid.set(avgX / len, avgY / len, avgZ / len);
    const groundCentroidY = avgY / len;

    // 2. Solve support plane normal using a 3-point sample (tripod support)
    // For hexapods with 3+ feet on the ground, use the first 3 stance contacts
    const p1 = groundedFootPositions[0];
    const p2 = groundedFootPositions[1];
    const p3 = groundedFootPositions[2];

    try {
      this.tempPlane.setFromCoplanarPoints(p1, p2, p3);
      this.tempNormal.copy(this.tempPlane.normal);

      // Ensure normal points upward
      if (this.tempNormal.y < 0) {
        this.tempNormal.negate();
      }

      // If normal is degenerate (e.g. collinear points), fallback to (0, 1, 0)
      if (isNaN(this.tempNormal.y) || this.tempNormal.lengthSq() < 0.001) {
        this.tempNormal.set(0, 1, 0);
      } else {
        this.tempNormal.normalize();
      }
    } catch (e) {
      this.tempNormal.set(0, 1, 0);
    }

    // 3. Extract pitch (around X-axis) and roll (around Z-axis)
    // Pitch: inclination in Z direction
    this.targetPitch = Math.atan2(this.tempNormal.z, this.tempNormal.y);
    // Roll: inclination in X direction
    this.targetRoll = -Math.atan2(this.tempNormal.x, this.tempNormal.y);

    this.targetElevation = (groundCentroidY - this.robot.position.y) + nominalElevation;

    // 4. Low-pass exponential smoothing to eliminate high-frequency jitter
    this.currentElevation += (this.targetElevation - this.currentElevation) * this.damping;
    this.currentPitch += (this.targetPitch - this.currentPitch) * this.damping;
    this.currentRoll += (this.targetRoll - this.currentRoll) * this.damping;

    // 5. Apply transformations to chassis group
    this.robot.body.position.y = this.currentElevation;
    this.robot.body.rotation.x = this.currentPitch;
    this.robot.body.rotation.z = this.currentRoll;

    // Calculate stability telemetry
    const totalTilt = Math.sqrt(this.currentPitch * this.currentPitch + this.currentRoll * this.currentRoll);
    this.tiltAngleDeg = Math.round(totalTilt * (180 / Math.PI));
    this.stabilityIndex = Math.max(0, Math.min(100, Math.round(100 - (this.tiltAngleDeg / 30) * 100)));
  }
}
