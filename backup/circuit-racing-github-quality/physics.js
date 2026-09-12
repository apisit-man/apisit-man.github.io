/**
 * ==========================================================================
 * Professional Circuit Racing - Vehicle Dynamics & Physics Engine
 * Multi-gear transmission, RPM curves, speed-sensitive steering,
 * lateral drift grip, off-track penalties, barrier and car-to-car collisions.
 * ==========================================================================
 */

import * as THREE from 'three';

export class VehiclePhysics {
  constructor(carInstance, isPlayer = true) {
    this.car = carInstance;
    this.isPlayer = isPlayer;

    // Kinematics
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.yaw = 0; // Heading angle in radians (0 = Facing -Z / Forward)
    this.speed = 0; // Forward speed in m/s
    this.speedKmh = 0; // km/h for telemetry
    this.angularVelocity = 0;
    this.steeringAngle = 0;
    this.filteredSteer = 0; // Progressive keyboard steering rack position (-1 to +1)

    // Body dynamics (Visual roll & pitch)
    this.bodyRoll = 0;
    this.bodyPitch = 0;

    // Transmission & Engine
    this.rpm = 1000;
    this.currentGear = 1;
    this.maxGears = 7;
    this.gearRatios = [3.8, 2.9, 2.1, 1.6, 1.25, 1.0, 0.82]; // 1st to 7th
    this.finalDrive = 3.6;

    // Handling & Performance Attributes (Derived from car model specs)
    const cfg = this.car.modelConfig;
    this.maxSpeedMps = (cfg.topSpeed || 330) / 3.6; // convert km/h to m/s
    this.accelPower = 28.0 / (cfg.acceleration || 2.8); // Acceleration coefficient
    this.brakePower = 34.0;
    this.maxGrip = (cfg.handling || 9.5) * 1.8;
    this.driftFactor = 0; // 0 = full grip, 1 = full slide

    // Collision capsule
    this.collisionRadius = 1.1; // meters
    this.collisionLength = 3.8;

    // Race progress tracking
    this.trackProgress = 0; // 0..1 along circuit
    this.lapCount = 0;
    this.lapStartTime = 0;
    this.lastCheckpoint = 0;
    this.hasCrossedFinishLine = false;
    this.offTrack = false;
    this.offTrackPenalty = 1.0;
    this.hitBarrierThisFrame = false;
    this.lastImpactNormal = new THREE.Vector3();
  }

  get steerAngle() {
    return this.steeringAngle;
  }

  setPosition(pos, headingYaw = 0) {
    this.position.copy(pos);
    this.yaw = headingYaw;
    this.speed = 0;
    this.speedKmh = 0;
    this.velocity.set(0, 0, 0);
    this.angularVelocity = 0;
    this.filteredSteer = 0;
    this.steeringAngle = 0;
    this.updateCarMeshTransform();
  }

  update(dt, controls, track, audio) {
    if (dt > 0.1) dt = 0.1; // Clamp delta to avoid physics explosion
    this.hitBarrierThisFrame = false;

    // 1. Inputs
    const throttle = controls.throttle || 0;
    const brake = controls.brake || 0;
    const steer = controls.steer || 0; // +1 (left) to -1 (right)
    const handbrake = controls.handbrake || false;

    // 2. Surface Evaluation (Tarmac vs Curb vs Gravel vs Grass)
    const surface = track.evaluateSurface(this.position);
    this.offTrack = (surface.type === 'gravel' || surface.type === 'grass');
    this.offTrackPenalty = surface.drag;
    const surfaceGrip = surface.grip;

    // 3. Progressive Steering Rack Filter (Keyboard Smoothing & Speed-Sensitive Lock)
    const rawSteer = steer; // +1.0 (Left), -1.0 (Right), 0.0 (Neutral)
    const absSpeed = Math.abs(this.speed);
    const speedKmh = absSpeed * 3.6;
    const speedFactor = 1.0 / (1.0 + Math.pow(speedKmh / 48.0, 1.35));

    // Speed-adaptive attack rate: agile at hairpin speeds, ultra-smooth and stable at 200+ km/h
    const baseRiseRate = THREE.MathUtils.lerp(2.6, 3.8, speedFactor);
    let steerRate = baseRiseRate;
    let rackDampRate = 14.0;

    if (rawSteer === 0) {
      steerRate = 18.0; // Rapid self-aligning caster return-to-center
      rackDampRate = 22.0;
    } else if (this.filteredSteer !== 0 && Math.sign(rawSteer) !== Math.sign(this.filteredSteer)) {
      steerRate = 11.0; // Fast counter-steer response
      rackDampRate = 18.0;
    }

    this.filteredSteer = THREE.MathUtils.damp(this.filteredSteer, rawSteer, steerRate, dt);
    if (rawSteer === 0 && Math.abs(this.filteredSteer) < 0.01) {
      this.filteredSteer = 0;
    }

    // Exponential Non-Linear Response (Gamma Curve):
    // Gentle deadband precision near center for straight-line micro-adjustments, progressive lock in hairpins
    const curvedSteer = Math.sign(this.filteredSteer) * Math.pow(Math.abs(this.filteredSteer), 1.55);

    // Realistic Speed-Sensitive Steering Lock:
    // Low speed (0-30 km/h): Up to 0.45 rad (~25.8 deg) for tight hairpins and grid maneuvering
    // Medium speed (80-120 km/h): Scaled down to ~0.11-0.15 rad (~6.3-8.6 deg)
    // High speed (180-300 km/h): Scaled down to ~0.055-0.075 rad (~3.1-4.3 deg)
    const maxSteerAngle = THREE.MathUtils.lerp(0.055, 0.45, speedFactor);

    const targetSteerAngle = curvedSteer * maxSteerAngle;
    this.steeringAngle = THREE.MathUtils.damp(this.steeringAngle, targetSteerAngle, rackDampRate, dt);
    if (rawSteer === 0 && Math.abs(this.steeringAngle) < 0.003) {
      this.steeringAngle = 0;
    }
    if (this.car && typeof this.car.setSteeringAngle === 'function') {
      this.car.setSteeringAngle(this.steeringAngle);
    }

    // 4. Acceleration & Braking Forces
    let driveForce = 0;
    if (throttle > 0) {
      // Power drops naturally near top speed
      const powerCurve = Math.max(0.05, 1.0 - (this.speed / this.maxSpeedMps));
      driveForce = throttle * this.accelPower * powerCurve * surfaceGrip;
      if (this.speed < 0) driveForce *= 2.0; // Reverse braking effect
    }

    let brakeForce = 0;
    if (brake > 0) {
      if (this.speed > 0.5) {
        brakeForce = brake * this.brakePower * surfaceGrip;
      } else {
        // Reverse gear
        driveForce = -brake * (this.accelPower * 0.4);
      }
    }

    // Drag & Air Resistance
    const airDrag = 0.0022 * this.speed * Math.abs(this.speed);
    const rollingResistance = 0.8 * this.offTrackPenalty;

    // Net longitudinal acceleration
    const netAccel = driveForce - (Math.sign(this.speed) * (brakeForce + rollingResistance + airDrag));
    this.speed += netAccel * dt;

    // Max reverse speed limit
    if (this.speed < -12.0) this.speed = -12.0;

    // Off-track max speed cap
    if (this.offTrack && Math.abs(this.speed) > 18.0) {
      this.speed = THREE.MathUtils.lerp(this.speed, Math.sign(this.speed) * 16.0, dt * 3.0);
    }

    // 5. Lateral Drift & Realistic Tire Grip Constrained Yaw Physics
    const isDrifting = handbrake && absSpeed > 10.0;

    if (isDrifting) {
      this.driftFactor = THREE.MathUtils.lerp(this.driftFactor, 1.0, dt * 7);
    } else {
      this.driftFactor = THREE.MathUtils.lerp(this.driftFactor, 0.0, dt * 4.5);
    }

    // Kinematic Ackermann Yaw Rate: w = (v / L) * tan(delta)
    // Real Ferrari SF90 wheelbase L = 2.65m
    const wheelbase = 2.65;
    const kinematicYawRate = (this.speed / wheelbase) * Math.tan(this.steeringAngle);

    // Physical Lateral Tire Grip Limit:
    // On dry asphalt, supercars pull ~1.45g (14.2 m/s^2) maximum before tires scrub/slide
    // Understeer occurs naturally when steering faster than tire friction allows
    const maxLateralGripAcc = (this.maxGrip || 14.5) * surfaceGrip; // m/s^2
    const gripLimitedYawRate = maxLateralGripAcc / Math.max(3.5, absSpeed);

    // In normal cornering, yaw rate is physically capped by tire grip
    // In handbrake drift, tire slip angle expands by 1.7x
    const allowedYawLimit = isDrifting ? gripLimitedYawRate * 1.7 : gripLimitedYawRate;
    const targetYawRate = Math.sign(kinematicYawRate) * Math.min(Math.abs(kinematicYawRate), allowedYawLimit);

    // Rotational inertia damping gives the vehicle mass and weight, eliminating digital twitchiness
    const yawDampRate = (rawSteer === 0) ? 26.0 : 12.5;
    this.angularVelocity = THREE.MathUtils.damp(this.angularVelocity, targetYawRate, yawDampRate, dt);
    if (rawSteer === 0 && Math.abs(this.steeringAngle) === 0 && Math.abs(this.angularVelocity) < 0.08) {
      this.angularVelocity = 0;
    }
    this.yaw += this.angularVelocity * dt;

    // Forward direction vector
    const forwardX = -Math.sin(this.yaw);
    const forwardZ = -Math.cos(this.yaw);

    // Velocity update with drift slip angle
    const forwardSpeed = this.speed * (1.0 - this.driftFactor * 0.35);
    this.velocity.set(forwardX * forwardSpeed, 0, forwardZ * forwardSpeed);

    if (this.driftFactor > 0.2) {
      // Lateral slide component
      const rightX = -Math.cos(this.yaw);
      const rightZ = Math.sin(this.yaw);
      const slipSign = Math.sign(this.steeringAngle);
      const lateralSlide = this.speed * this.driftFactor * 0.45 * slipSign;
      this.velocity.x += rightX * lateralSlide;
      this.velocity.z += rightZ * lateralSlide;
    }

    // 6. Sub-stepped Position Integration & Unbreakable Barrier Collisions
    const steps = Math.abs(this.speed) > 28.0 ? 2 : 1;
    const subDt = dt / steps;
    for (let step = 0; step < steps; step++) {
      this.position.x += this.velocity.x * subDt;
      this.position.z += this.velocity.z * subDt;
      this.resolveBarrierCollisions(track, audio);
    }

    // 7. Transmission & RPM Simulation
    this.speedKmh = Math.round(this.speed * 3.6);
    this.updateTransmission(throttle, brake, audio);

    // 8. Body Visual Roll and Pitch based on real lateral G-forces
    const lateralAcc = this.speed * this.angularVelocity;
    // Car body rolls outward from turn due to centrifugal force
    const targetRoll = (lateralAcc / 16.0) * 0.065;
    const targetPitch = (driveForce - brakeForce) * 0.002;
    this.bodyRoll = THREE.MathUtils.lerp(this.bodyRoll, targetRoll, dt * 8);
    this.bodyPitch = THREE.MathUtils.lerp(this.bodyPitch, targetPitch, dt * 8);

    // 9. Wheel Spin & Brake Lights
    const wheelRotDelta = (this.speed * dt) / 0.36;
    this.car.spinWheels(wheelRotDelta);
    this.car.setBrakeLights(brake > 0.1 || handbrake);

    // 10. Update 3D Transform
    this.updateCarMeshTransform();

    // 11. Audio Telemetry
    if (this.isPlayer && audio) {
      audio.updateEngine(this.rpm, this.speedKmh, throttle > 0.1, netAccel > 0);
      audio.updateTireSkid(this.driftFactor + (handbrake ? 0.4 : 0));
    }
  }

  updateTransmission(throttle, brake, audio) {
    const absSpeed = Math.abs(this.speedKmh);

    // Speed boundaries for 7-speed automatic gearbox
    const gearShiftSpeeds = [0, 52, 98, 148, 198, 248, 295, 380];

    let gear = 1;
    for (let i = 1; i < this.maxGears; i++) {
      if (absSpeed > gearShiftSpeeds[i]) {
        gear = i + 1;
      }
    }

    if (gear !== this.currentGear) {
      this.currentGear = gear;
      if (this.isPlayer && audio) audio.playGearShift();
    }

    // Calculate RPM inside current gear
    const minGearSpeed = gearShiftSpeeds[this.currentGear - 1];
    const maxGearSpeed = gearShiftSpeeds[this.currentGear];
    const gearProgress = Math.max(0, Math.min(1.0, (absSpeed - minGearSpeed) / (maxGearSpeed - minGearSpeed)));

    if (throttle > 0) {
      this.rpm = THREE.MathUtils.lerp(2800, 8800, gearProgress);
    } else if (brake > 0) {
      this.rpm = THREE.MathUtils.lerp(1800, 6000, gearProgress);
    } else {
      this.rpm = THREE.MathUtils.lerp(1100, 5000, gearProgress);
    }

    if (absSpeed < 2 && throttle === 0) {
      this.rpm = 1050 + Math.sin(Date.now() * 0.01) * 60; // Smooth idle pulse
    }
  }

  resolveBarrierCollisions(track, audio) {
    if (!track || !track.samples || track.samples.length === 0) return;
    const sample = track.getClosestSplineSample(this.position);
    if (!sample) return;

    const toCar = this.position.clone().sub(sample.pos);
    const N = sample.norm; // Unit normal perpendicular to track centerline (+N is track Right)
    const T = sample.tan;  // Unit tangent pointing along track (+T is Forward)

    // Calculate signed lateral perpendicular distance from track centerline
    // Positive = Right side of track, Negative = Left side of track
    const lateralDist = toCar.dot(N);
    const absLateralDist = Math.abs(lateralDist);

    // Barrier boundary: track barrier distance minus vehicle physical half-width (1.15m)
    const barrierDist = track.barrierDistance || (track.roadWidth * 0.5 + track.curbWidth + 3.8);
    const carHalfWidth = 1.15;
    const maxAllowedDist = barrierDist - carHalfWidth;

    if (absLateralDist > maxAllowedDist) {
      const penetration = absLateralDist - maxAllowedDist;
      const side = Math.sign(lateralDist) || 1; // +1 = Right wall, -1 = Left wall

      // 1. HARD POSITION CLAMP (Zero pass-through guarantee!)
      // Shift car strictly back inside the barrier boundary along normal
      this.position.sub(N.clone().multiplyScalar(side * penetration));

      // 2. VELOCITY DECOMPOSITION & ELASTIC REBOUND
      const vLateral = this.velocity.dot(N);
      const vLong = this.velocity.dot(T);

      // Check if vehicle is moving towards the barrier
      if (vLateral * side > 0) {
        // Elastic rebound away from barrier (restitution 0.35)
        const restitution = 0.35;
        const reboundVLateral = -vLateral * restitution;

        // Heavy scraping friction on longitudinal forward motion
        const scrapeFriction = Math.max(0.60, 0.90 - (Math.abs(vLateral) * 0.04));
        const newVLong = vLong * scrapeFriction;

        this.velocity.set(
          T.x * newVLong + N.x * reboundVLateral,
          0,
          T.z * newVLong + N.z * reboundVLateral
        );

        // Reduce forward speed accordingly
        this.speed = Math.sign(this.speed) * Math.max(0, (Math.abs(this.speed) * scrapeFriction) - (Math.abs(vLateral) * 0.3));

        // 3. YAW TORQUE: Glance off barrier (align car heading with track tangent)
        const trackYaw = Math.atan2(-T.x, -T.z);
        let yawDiff = trackYaw - this.yaw;
        while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
        while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
        this.yaw += yawDiff * 0.35;

        // 4. AUDIO & SPARK TELEMETRY
        if (audio && (this.isPlayer || Math.abs(vLateral) > 6)) {
          const impactSeverity = Math.min(1.0, (Math.abs(vLateral) / 12.0) + (Math.abs(this.speed) / 45.0));
          audio.playCollision(impactSeverity);
        }

        this.hitBarrierThisFrame = true;
        this.lastImpactNormal = N.clone().multiplyScalar(-side);
      }
    }
  }

  updateCarMeshTransform() {
    this.car.mesh.position.set(this.position.x, 0, this.position.z);
    this.car.mesh.rotation.set(this.bodyPitch, this.yaw, this.bodyRoll);
  }

  /**
   * Resolves collision between two cars
   */
  static checkCarCollision(carA, carB, audio) {
    const dist = carA.position.distanceTo(carB.position);
    const minDist = carA.collisionRadius + carB.collisionRadius;

    if (dist < minDist && dist > 0.001) {
      const normal = carA.position.clone().sub(carB.position).normalize();
      const overlap = minDist - dist;

      // Push apart equally
      carA.position.addScaledVector(normal, overlap * 0.5);
      carB.position.addScaledVector(normal, -overlap * 0.5);

      // Exchange some forward momentum
      const avgSpeed = (carA.speed + carB.speed) * 0.5;
      carA.speed = avgSpeed * 0.95;
      carB.speed = avgSpeed * 0.95;

      if (audio && (carA.isPlayer || carB.isPlayer)) {
        audio.playCollision(0.8);
      }
    }
  }
}
