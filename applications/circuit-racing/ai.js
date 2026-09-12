/**
 * ==========================================================================
 * Professional Circuit Racing - Autonomous AI Racing Opponents
 * Waypoint navigation, corner curvature braking, lane offset,
 * overtaking maneuvers, and dynamic competitor randomization.
 * ==========================================================================
 */

import * as THREE from 'three';
import { RacingCar, CAR_MODELS_DATA } from './car.js';
import { VehiclePhysics } from './physics.js';

export const AI_NAMES_POOL = [
  { name: 'Marco Bellini', country: '🇮🇹', flag: '🇮🇹' },
  { name: 'Kenji Sato', country: '🇯🇵', flag: '🇯🇵' },
  { name: 'Sebastian Weber', country: '🇩🇪', flag: '🇩🇪' },
  { name: 'Lewis Sterling', country: '🇬🇧', flag: '🇬🇧' },
  { name: 'Carlos Mendez', country: '🇪🇸', flag: '🇪🇸' },
  { name: 'Pierre Dubois', country: '🇫🇷', flag: '🇫🇷' },
  { name: 'Mateo Silva', country: '🇧🇷', flag: '🇧🇷' },
  { name: 'Max Bauer', country: '🇳🇱', flag: '🇳🇱' },
  { name: 'Liam O\'Connor', country: '🇦🇺', flag: '🇦🇺' },
  { name: 'Alexandre Roy', country: '🇨🇦', flag: '🇨🇦' },
  { name: 'Somchai Thongchai', country: '🇹🇭', flag: '🇹🇭' }
];

export const AI_COLORS_POOL = [
  '#dc2626', // Rosso
  '#facc15', // Giallo Modena
  '#2563eb', // Blu Tour de France
  '#16a34a', // British Racing Green
  '#9333ea', // Royal Purple
  '#ea580c', // Orange Papaya
  '#06b6d4', // Cyan Riviera
  '#cbd5e1', // Silver Arrow
  '#1e293b'  // Nero Carbon
];

export class AIRacingController {
  constructor(aiCar, physics, track, options = {}) {
    this.car = aiCar;
    this.physics = physics;
    this.track = track;

    // AI Personality & Tuning
    this.aggression = options.aggression || (0.85 + Math.random() * 0.25);
    this.preferredLaneOffset = options.laneOffset || (Math.random() * 6.0 - 3.0); // -3m (left) to +3m (right)
    this.currentLaneOffset = this.preferredLaneOffset;
    this.lookAheadDistance = 22 + Math.random() * 8; // meters ahead to track

    this.controls = {
      throttle: 0,
      brake: 0,
      steer: 0,
      handbrake: false
    };
  }

  update(dt, allCars) {
    const currentPos = this.physics.position;

    // 1. Current track progression
    const currentSample = this.track.getClosestSplineSample(currentPos);
    if (!currentSample) return;

    // 2. Find target waypoint ahead on track spline
    const splineLength = this.track.trackLength;
    const currentU = currentSample.u;
    const lookAheadU = (currentU + (this.lookAheadDistance / splineLength)) % 1.0;
    const targetSample = this.track.curve.getPointAt(lookAheadU);
    const targetTan = this.track.curve.getTangentAt(lookAheadU).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const targetNorm = new THREE.Vector3().crossVectors(targetTan, up).normalize();

    // Apply lateral racing line offset for dynamic lane racing
    const targetPoint = targetSample.clone().addScaledVector(targetNorm, this.currentLaneOffset);

    // 3. Collision Avoidance & Overtaking Logic
    this.evaluateOvertakingAndAvoidance(allCars);

    // 4. Steering Calculation
    // Vector from car to target
    const toTarget = targetPoint.clone().sub(currentPos);
    const forwardX = -Math.sin(this.physics.yaw);
    const forwardZ = -Math.cos(this.physics.yaw);
    const carForward = new THREE.Vector3(forwardX, 0, forwardZ).normalize();
    // Unit vector pointing to the car's LEFT side (-X when yaw = 0)
    const carLeft = new THREE.Vector3(-Math.cos(this.physics.yaw), 0, Math.sin(this.physics.yaw)).normalize();

    const forwardDot = carForward.dot(toTarget.clone().normalize());
    const leftDot = carLeft.dot(toTarget.clone().normalize());

    // Steer command: +1.0 = full left, -1.0 = full right
    let steerCmd = leftDot * 3.2;
    this.controls.steer = Math.max(-1.0, Math.min(1.0, steerCmd));

    // 5. Corner Curvature & Target Speed Calculation
    // Measure angle difference over upcoming 40 meters
    const farU = (currentU + (42.0 / splineLength)) % 1.0;
    const farTan = this.track.curve.getTangentAt(farU).normalize();
    const curveSharpness = 1.0 - Math.max(0, targetTan.dot(farTan)); // 0 = straight, ~1 = hairpin

    // Calculate maximum safe cornering speed
    // Straight line: 300+ km/h; Moderate curve: 180 km/h; Hairpin: 85 km/h
    const baseCornerSpeedMps = THREE.MathUtils.lerp(this.physics.maxSpeedMps, 22.0, Math.min(1.0, curveSharpness * 3.5));
    const targetSpeedMps = baseCornerSpeedMps * this.aggression;

    // 6. Throttle & Brake Modulation
    const currentSpeed = this.physics.speed;

    if (currentSpeed < targetSpeedMps - 1.5) {
      // Need to accelerate
      this.controls.throttle = 1.0;
      this.controls.brake = 0.0;
    } else if (currentSpeed > targetSpeedMps + 2.0) {
      // Heavy braking for corner entry
      this.controls.throttle = 0.0;
      this.controls.brake = Math.min(1.0, (currentSpeed - targetSpeedMps) * 0.18);
    } else {
      // Balanced cruising / throttle feathering
      this.controls.throttle = 0.55;
      this.controls.brake = 0.0;
    }

    // Recover if stuck against wall
    if (Math.abs(currentSpeed) < 1.0 && this.controls.throttle > 0.5) {
      this.controls.steer = (Math.random() > 0.5 ? 1 : -1);
    }
  }

  evaluateOvertakingAndAvoidance(allCars) {
    if (!allCars) return;
    const myPos = this.physics.position;
    const myForward = new THREE.Vector3(-Math.sin(this.physics.yaw), 0, -Math.cos(this.physics.yaw));

    let carAhead = null;
    let closestDist = 18.0; // Avoidance proximity zone

    for (const other of allCars) {
      if (other === this.physics) continue;
      const diff = other.position.clone().sub(myPos);
      const dist = diff.length();

      if (dist < closestDist) {
        const dot = myForward.dot(diff.clone().normalize());
        if (dot > 0.7) { // Directly ahead
          closestDist = dist;
          carAhead = other;
        }
      }
    }

    if (carAhead) {
      // Car is blocking directly ahead: Initiate overtake by shifting lane!
      const myLane = this.currentLaneOffset;
      if (myLane > 0) {
        this.currentLaneOffset = THREE.MathUtils.lerp(this.currentLaneOffset, -3.5, 0.08); // Dive left
      } else {
        this.currentLaneOffset = THREE.MathUtils.lerp(this.currentLaneOffset, 3.5, 0.08); // Dive right
      }

      // If dangerously close, tap brakes to avoid rear-end collision
      if (closestDist < 4.5 && this.physics.speed > carAhead.speed) {
        this.controls.brake = 0.7;
        this.controls.throttle = 0.0;
      }
    } else {
      // Return gradually to preferred racing line
      this.currentLaneOffset = THREE.MathUtils.lerp(this.currentLaneOffset, this.preferredLaneOffset, 0.03);
    }
  }

  /**
   * Spawns 5 randomized AI competitors
   */
  static generateRandomGrid(excludeModelId = '') {
    const aiCars = [];
    const availableModels = CAR_MODELS_DATA.filter(m => m.id !== excludeModelId);
    if (availableModels.length < 5) availableModels.push(...CAR_MODELS_DATA);

    // Shuffle names and colors
    const shuffledNames = [...AI_NAMES_POOL].sort(() => Math.random() - 0.5);
    const shuffledColors = [...AI_COLORS_POOL].sort(() => Math.random() - 0.5);

    for (let i = 0; i < 5; i++) {
      const model = availableModels[i % availableModels.length];
      const driver = shuffledNames[i % shuffledNames.length];
      const paintColor = shuffledColors[i % shuffledColors.length];

      const car = new RacingCar(model.id, {
        driverName: driver.name,
        nationality: driver.flag,
        racingNumber: Math.floor(Math.random() * 80 + 10),
        paintColor: paintColor,
        isAI: true
      });

      const physics = new VehiclePhysics(car, false);
      aiCars.push({ car, physics, driver });
    }

    return aiCars;
  }
}
