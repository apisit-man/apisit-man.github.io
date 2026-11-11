/**
 * Domain calculation model for LED Polarity & Current Limiting circuits
 * Educational approximation based on constant forward-voltage drop (KVL)
 */

export type Polarity = 'forward' | 'reverse';

export interface LedCircuitInput {
  voltage: number;          // Supply voltage in Volts (e.g. 3.0)
  forwardVoltage: number;   // LED forward voltage drop in Volts (e.g. 2.0)
  resistance: number;       // Resistor in Ohms (e.g. 220)
  power: boolean;           // Power switch (true = on, false = off)
  polarity: Polarity;       // 'forward' or 'reverse'
  closedCircuit?: boolean;  // Complete circuit loop (default true)
}

export interface LedCircuitResult {
  isValid: boolean;
  errorMessage?: string;
  actualCurrent: number;      // Amperes
  predictedCurrent: number;   // What current would be if energized and forward
  resistorVoltage: number;    // Volts across resistor
  resistorPower: number;      // Watts consumed by resistor
  ledVoltage: number;         // Volts across LED
  glowIntensity: number;      // 0.0 to 1.0 visual representation
  isReverseBiased: boolean;
  isBelowThreshold: boolean;
  isOvercurrent: boolean;     // Exceeds safe model limit (20 mA)
  isTargetMet: boolean;       // Meets classroom target (10 mA)
  kvlSatisfied: boolean;      // Vs = Vr + Vf during conduction
}

export const CLASSROOM_TARGET_CURRENT = 0.010; // 10 mA
export const MODEL_WARNING_CURRENT = 0.020;     // 20 mA

export function calculateLedCircuit(input: LedCircuitInput): LedCircuitResult {
  const {
    voltage,
    forwardVoltage,
    resistance,
    power,
    polarity,
    closedCircuit = true
  } = input;

  // 1. Rigorous input validation
  const isVoltageValid = Number.isFinite(voltage) && voltage >= 0;
  const isFvValid = Number.isFinite(forwardVoltage) && forwardVoltage >= 0;
  const isResistanceValid = Number.isFinite(resistance) && resistance > 0;

  if (!isVoltageValid || !isFvValid || !isResistanceValid) {
    return {
      isValid: false,
      errorMessage: !isResistanceValid
        ? 'Resistance must be greater than zero and finite'
        : 'Supply and forward voltages must be non-negative finite numbers',
      actualCurrent: NaN,
      predictedCurrent: NaN,
      resistorVoltage: NaN,
      resistorPower: NaN,
      ledVoltage: NaN,
      glowIntensity: 0,
      isReverseBiased: polarity === 'reverse',
      isBelowThreshold: false,
      isOvercurrent: false,
      isTargetMet: false,
      kvlSatisfied: false
    };
  }

  // Predicted current when energized & forward-biased
  const predictedConducting = voltage > forwardVoltage
    ? (voltage - forwardVoltage) / resistance
    : 0;

  // 2. Power off or open circuit
  if (!power || !closedCircuit) {
    return {
      isValid: true,
      actualCurrent: 0,
      predictedCurrent: predictedConducting,
      resistorVoltage: 0,
      resistorPower: 0,
      ledVoltage: 0,
      glowIntensity: 0,
      isReverseBiased: polarity === 'reverse',
      isBelowThreshold: voltage <= forwardVoltage,
      isOvercurrent: false,
      isTargetMet: false,
      kvlSatisfied: false
    };
  }

  // 3. Reverse bias
  if (polarity === 'reverse') {
    return {
      isValid: true,
      actualCurrent: 0,
      predictedCurrent: predictedConducting,
      resistorVoltage: 0,
      resistorPower: 0,
      ledVoltage: voltage, // Full voltage appears across reverse diode
      glowIntensity: 0,
      isReverseBiased: true,
      isBelowThreshold: false,
      isOvercurrent: false,
      isTargetMet: false,
      kvlSatisfied: false
    };
  }

  // 4. Forward bias but supply voltage <= forward voltage threshold
  if (voltage <= forwardVoltage) {
    return {
      isValid: true,
      actualCurrent: 0,
      predictedCurrent: 0,
      resistorVoltage: 0,
      resistorPower: 0,
      ledVoltage: voltage,
      glowIntensity: 0,
      isReverseBiased: false,
      isBelowThreshold: true,
      isOvercurrent: false,
      isTargetMet: false,
      kvlSatisfied: false
    };
  }

  // 5. Conducting forward bias (Vs > Vf)
  const actualCurrent = (voltage - forwardVoltage) / resistance;
  const resistorVoltage = actualCurrent * resistance;
  const resistorPower = actualCurrent * actualCurrent * resistance;
  const ledVoltage = forwardVoltage;

  // Bounded glow presentation function: scales smoothly from 0.2 up to 1.0
  const glowIntensity = Math.min(1.0, Math.max(0.2, actualCurrent / MODEL_WARNING_CURRENT));

  return {
    isValid: true,
    actualCurrent,
    predictedCurrent: predictedConducting,
    resistorVoltage,
    resistorPower,
    ledVoltage,
    glowIntensity,
    isReverseBiased: false,
    isBelowThreshold: false,
    isOvercurrent: actualCurrent > MODEL_WARNING_CURRENT,
    isTargetMet: actualCurrent >= CLASSROOM_TARGET_CURRENT,
    kvlSatisfied: Math.abs(voltage - (resistorVoltage + ledVoltage)) < 1e-9
  };
}

/**
 * Format Amperes into human-readable mA / A with consistent precision
 */
export function formatCurrent(amperes: number, _locale: 'th' | 'en' = 'th'): string {
  if (!Number.isFinite(amperes)) return '---';
  const mA = amperes * 1000;
  if (Math.abs(mA) < 0.0001) {
    return `0.00 mA`;
  }
  const formatted = mA.toFixed(2);
  return `${formatted} mA`;
}

/**
 * Format Volts
 */
export function formatVoltage(volts: number): string {
  if (!Number.isFinite(volts)) return '---';
  return `${volts.toFixed(2)} V`;
}

/**
 * Format Resistance
 */
export function formatResistance(ohms: number): string {
  if (!Number.isFinite(ohms)) return '---';
  if (ohms >= 1000) {
    return `${(ohms / 1000).toFixed(1)} kΩ`;
  }
  return `${ohms.toFixed(0)} Ω`;
}
