import { describe, it, expect } from 'vitest';
import {
  calculateOpenClosedCircuit,
  calculateConductorTest,
  calculateOhmsLaw,
  calculateBreadboardPreset,
  getResistorColorBands
} from '../src/domain/circuitModels';

describe('P1 Six-Lesson Domain Model Contracts', () => {
  describe('Lesson 1: Open & Closed Circuit Model', () => {
    it('Computes 20 mA when switch is closed and wire is connected (3 V, 150 Ohm)', () => {
      const res = calculateOpenClosedCircuit({
        voltage: 3.0,
        loadResistance: 150,
        switchClosed: true,
        wireConnected: true
      });
      expect(res.isValid).toBe(true);
      expect(res.isLoopClosed).toBe(true);
      expect(res.actualCurrent).toBeCloseTo(0.02, 7);
      expect(res.loadVoltage).toBeCloseTo(3.0, 7);
      expect(res.gapVoltage).toBe(0);
    });

    it('Zero current and full supply voltage across gap when switch is open or wire disconnected', () => {
      const openSwitch = calculateOpenClosedCircuit({
        voltage: 3.0,
        loadResistance: 150,
        switchClosed: false,
        wireConnected: true
      });
      expect(openSwitch.isLoopClosed).toBe(false);
      expect(openSwitch.actualCurrent).toBe(0);
      expect(openSwitch.gapVoltage).toBe(3.0);

      const brokenWire = calculateOpenClosedCircuit({
        voltage: 3.0,
        loadResistance: 150,
        switchClosed: true,
        wireConnected: false
      });
      expect(brokenWire.isLoopClosed).toBe(false);
      expect(brokenWire.actualCurrent).toBe(0);
      expect(brokenWire.gapVoltage).toBe(3.0);
    });
  });

  describe('Lesson 2: Conductors & Insulators Model', () => {
    it('Conducts high current through copper (0.05 Ohm) and moderate current through graphite (180 Ohm)', () => {
      const copperRes = calculateConductorTest({
        voltage: 3.0,
        fixedResistance: 220,
        forwardVoltage: 2.0,
        materialId: 'copper',
        power: true
      });
      expect(copperRes.isConducting).toBe(true);
      expect(copperRes.actualCurrent).toBeCloseTo(1.0 / 220.05, 6);

      const graphiteRes = calculateConductorTest({
        voltage: 3.0,
        fixedResistance: 220,
        forwardVoltage: 2.0,
        materialId: 'graphite',
        power: true
      });
      expect(graphiteRes.isConducting).toBe(true);
      expect(graphiteRes.actualCurrent).toBeCloseTo(1.0 / 400, 6); // 2.5 mA
    });

    it('Blocks current completely for insulators (plastic, wood, rubber)', () => {
      for (const mat of ['plastic', 'wood', 'rubber'] as const) {
        const res = calculateConductorTest({
          voltage: 3.0,
          fixedResistance: 220,
          forwardVoltage: 2.0,
          materialId: mat,
          power: true
        });
        expect(res.isConducting).toBe(false);
        expect(res.actualCurrent).toBe(0);
        expect(res.glowIntensity).toBe(0);
      }
    });
  });

  describe('Lesson 3: Ohm\'s Law with a Resistor & EIA Color Bands', () => {
    it('Calculates I = V / R and P = V * I accurately', () => {
      const res = calculateOhmsLaw({
        voltage: 4.5,
        resistance: 300,
        power: true
      });
      expect(res.isValid).toBe(true);
      expect(res.actualCurrent).toBeCloseTo(0.015, 7); // 15 mA
      expect(res.powerWatts).toBeCloseTo(0.0675, 7);
      expect(res.curvePoints.length).toBeGreaterThan(3);
    });

    it('Returns Red-Red-Brown-Gold for 220 Ohm and Yellow-Violet-Brown-Gold for 470 Ohm', () => {
      const bands220 = getResistorColorBands(220);
      expect(bands220[0].nameEn).toBe('Red');
      expect(bands220[1].nameEn).toBe('Red');
      expect(bands220[2].nameEn).toBe('Brown (×10)');

      const bands470 = getResistorColorBands(470);
      expect(bands470[0].nameEn).toBe('Yellow');
      expect(bands470[1].nameEn).toBe('Violet');
      expect(bands470[2].nameEn).toBe('Brown (×10)');
    });
  });

  describe('Lesson 6: Breadboard Connectivity Net Analysis', () => {
    it('Conducts 4.545 mA through LED in valid-series preset', () => {
      const res = calculateBreadboardPreset('valid-series', 3.0, 220, 2.0, true);
      expect(res.ledLit).toBe(true);
      expect(res.ledCurrent).toBeCloseTo(1.0 / 220, 6);
      expect(res.faultType).toBe('none');
    });

    it('Detects shorted LED when both leads are plugged into the same 5-hole strip', () => {
      const res = calculateBreadboardPreset('shorted-same-strip', 3.0, 220, 2.0, true);
      expect(res.ledLit).toBe(false);
      expect(res.ledCurrent).toBe(0);
      expect(res.resistorCurrent).toBeCloseTo(3.0 / 220, 6);
      expect(res.faultType).toBe('led-shorted-by-strip');
    });

    it('Detects open circuit across center trench gap and misaligned row', () => {
      const gap = calculateBreadboardPreset('open-center-gap', 3.0, 220, 2.0, true);
      expect(gap.ledLit).toBe(false);
      expect(gap.resistorCurrent).toBe(0);
      expect(gap.faultType).toBe('open-across-trench');

      const misaligned = calculateBreadboardPreset('misaligned-row', 3.0, 220, 2.0, true);
      expect(misaligned.ledLit).toBe(false);
      expect(misaligned.resistorCurrent).toBe(0);
      expect(misaligned.faultType).toBe('open-unconnected-strip');
    });
  });
});
