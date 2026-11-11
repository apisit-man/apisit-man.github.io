import { describe, it, expect } from 'vitest';
import { calculateLedCircuit } from '../src/domain/ledModel';

describe('LED Polarity & Current Limiting Model Fixtures', () => {
  it('Fixture 1: 3 V, Vf 2 V, 220 ohm, forward, power on', () => {
    const res = calculateLedCircuit({
      voltage: 3.0,
      forwardVoltage: 2.0,
      resistance: 220,
      power: true,
      polarity: 'forward'
    });

    expect(res.isValid).toBe(true);
    expect(res.actualCurrent).toBeCloseTo(0.0045454545, 7);
    expect(res.resistorVoltage).toBeCloseTo(1.0, 7);
    expect(res.resistorPower).toBeCloseTo(0.0045454545, 7);
    expect(res.ledVoltage).toBeCloseTo(2.0, 7);
    expect(res.kvlSatisfied).toBe(true);
    expect(res.glowIntensity).toBeGreaterThan(0);
  });

  it('Fixture 2: Same values, power off', () => {
    const res = calculateLedCircuit({
      voltage: 3.0,
      forwardVoltage: 2.0,
      resistance: 220,
      power: false,
      polarity: 'forward'
    });

    expect(res.isValid).toBe(true);
    expect(res.actualCurrent).toBe(0);
    expect(res.glowIntensity).toBe(0);
    expect(res.predictedCurrent).toBeCloseTo(0.0045454545, 7);
    expect(res.resistorVoltage).toBe(0);
    expect(res.resistorPower).toBe(0);
  });

  it('Fixture 3: Same values, reverse, power on', () => {
    const res = calculateLedCircuit({
      voltage: 3.0,
      forwardVoltage: 2.0,
      resistance: 220,
      power: true,
      polarity: 'reverse'
    });

    expect(res.isValid).toBe(true);
    expect(res.actualCurrent).toBe(0);
    expect(res.glowIntensity).toBe(0);
    expect(res.isReverseBiased).toBe(true);
    expect(res.resistorVoltage).toBe(0);
    expect(res.resistorPower).toBe(0);
    expect(res.ledVoltage).toBe(3.0); // reverse diode holds full open-circuit supply
  });

  it('Fixture 4: 1.5 V, Vf 2 V, 220 ohm, forward', () => {
    const res = calculateLedCircuit({
      voltage: 1.5,
      forwardVoltage: 2.0,
      resistance: 220,
      power: true,
      polarity: 'forward'
    });

    expect(res.isValid).toBe(true);
    expect(res.actualCurrent).toBe(0);
    expect(res.isBelowThreshold).toBe(true);
    expect(res.glowIntensity).toBe(0);
  });

  it('Fixture 5: 3 V, Vf 2 V, 470 ohm, forward', () => {
    const res = calculateLedCircuit({
      voltage: 3.0,
      forwardVoltage: 2.0,
      resistance: 470,
      power: true,
      polarity: 'forward'
    });

    expect(res.isValid).toBe(true);
    expect(res.actualCurrent).toBeCloseTo(0.0021276596, 7);
  });

  it('Fixture 6: 4.5 V, Vf 2 V, 220 ohm, forward (above 10 mA classroom target)', () => {
    const res = calculateLedCircuit({
      voltage: 4.5,
      forwardVoltage: 2.0,
      resistance: 220,
      power: true,
      polarity: 'forward'
    });

    expect(res.isValid).toBe(true);
    expect(res.actualCurrent).toBeCloseTo(0.0113636364, 7);
    expect(res.isTargetMet).toBe(true);
    expect(res.isOvercurrent).toBe(false);
  });

  it('Fixture 7: 4.5 V, Vf 2 V, 100 ohm, forward (overcurrent warning > 20 mA)', () => {
    const res = calculateLedCircuit({
      voltage: 4.5,
      forwardVoltage: 2.0,
      resistance: 100,
      power: true,
      polarity: 'forward'
    });

    expect(res.isValid).toBe(true);
    expect(res.actualCurrent).toBeCloseTo(0.025, 7);
    expect(res.isOvercurrent).toBe(true);
  });

  it('Fixture 8: R = 0, negative R, NaN, Infinity return explicit invalid input', () => {
    const cases = [
      { voltage: 3.0, forwardVoltage: 2.0, resistance: 0, power: true, polarity: 'forward' as const },
      { voltage: 3.0, forwardVoltage: 2.0, resistance: -100, power: true, polarity: 'forward' as const },
      { voltage: 3.0, forwardVoltage: 2.0, resistance: NaN, power: true, polarity: 'forward' as const },
      { voltage: 3.0, forwardVoltage: 2.0, resistance: Infinity, power: true, polarity: 'forward' as const },
      { voltage: -3.0, forwardVoltage: 2.0, resistance: 220, power: true, polarity: 'forward' as const }
    ];

    for (const c of cases) {
      const res = calculateLedCircuit(c);
      expect(res.isValid).toBe(false);
      expect(Number.isNaN(res.actualCurrent)).toBe(true);
      expect(res.errorMessage).toBeDefined();
    }
  });

  it('Fixture 9: Open circuit while power on', () => {
    const res = calculateLedCircuit({
      voltage: 3.0,
      forwardVoltage: 2.0,
      resistance: 220,
      power: true,
      polarity: 'forward',
      closedCircuit: false
    });

    expect(res.isValid).toBe(true);
    expect(res.actualCurrent).toBe(0);
    expect(res.glowIntensity).toBe(0);
  });
});
