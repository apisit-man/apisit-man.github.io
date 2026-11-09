import { describe, it, expect } from 'vitest';
import { lessonIds, normalize, step, defaults, initialState } from '../src/model';
import { sketch } from '../src/sketches';
import lessonsRaw from '../src/content/lessons.json';

describe('Audit Regression & UI Integration Tests', () => {
  it('Blink: onMs changed 500 -> 50 updates code, period = 550ms, freq approx 1.82Hz', () => {
    const params = normalize('blink', { onMs: 50, offMs: 500 });
    expect(params.onMs).toBe(50);
    expect(params.offMs).toBe(500);

    const period = params.onMs + params.offMs;
    expect(period).toBe(550);
    const freq = 1000 / period;
    expect(freq).toBeCloseTo(1.818, 2);

    const code = sketch('blink', params);
    expect(code).toContain('delay(50);');
    expect(code).toContain('delay(500);');
  });

  it('Paused Servo: angle 180 -> Reset returns to 90 immediately', () => {
    // Initial paused step at 180
    const r1 = step('servo', initialState(), {}, { angle: 180 }, 0);
    expect(r1.params.angle).toBe(180);
    expect(r1.output.angle).toBe(180);

    // Reset action: parameters reset to default (90)
    const def = defaults.servo;
    const rReset = step('servo', initialState(), {}, def, 0);
    expect(rReset.params.angle).toBe(90);
    expect(rReset.output.angle).toBe(90);

    const code = sketch('servo', rReset.params);
    expect(code).toContain('arm.write(90);');
  });

  it('Paused state: step with dt=0 produces non-empty valid output across all lessons', () => {
    lessonIds.forEach((id) => {
      const res = step(id, initialState(), {}, defaults[id] || {}, 0);
      expect(res.output).toBeDefined();
      expect(Object.keys(res.output).length).toBeGreaterThan(0);
    });
  });

  it('Button: pointer release / drag outside sets pressed=false and D2=1 (HIGH pull-up)', () => {
    // When pressed
    const rPressed = step('button', initialState(), { pressed: true }, { mode: 'hold', debounceMs: 30 }, 50);
    expect(rPressed.output.pressed).toBe(true);
    expect(rPressed.output.pins.D2).toBe(0); // Active-low: 0 when pressed

    // When released (or pointer cancelled)
    const rReleased = step('button', rPressed.state, { pressed: false }, { mode: 'hold', debounceMs: 30 }, 50);
    expect(rReleased.output.pressed).toBe(false);
    expect(rReleased.output.pins.D2).toBe(1); // Pull-up: 1 when released
    expect(rReleased.output.led).toBe(false);
  });

  it('Verifies Motor controls metadata and limits', () => {
    const p0 = normalize('motor', { pwm: 0 });
    expect(p0.pwm).toBe(0);
    const r0 = step('motor', initialState(), {}, p0, 0);
    expect(r0.output.duty).toBe(0);
    expect(r0.output.relativeSpeed).toBe(0);

    const p255 = normalize('motor', { pwm: 255 });
    expect(p255.pwm).toBe(255);
    const r255 = step('motor', initialState(), {}, p255, 0);
    expect(r255.output.duty).toBe(1);
    expect(r255.output.relativeSpeed).toBe(1);
  });

  it('Verifies Stepper controls metadata, reversal, and step counts', () => {
    const pFwd = normalize('stepper', { stepsPerRev: 2048, speedRpm: 10, direction: 1 });
    expect(pFwd.direction).toBe(1);

    const pRev = normalize('stepper', { stepsPerRev: 2048, speedRpm: 10, direction: -1 });
    expect(pRev.direction).toBe(-1);

    const rFwd = step('stepper', initialState(), {}, pFwd, 100);
    expect(rFwd.output.steps).toBeGreaterThan(0);

    const rRev = step('stepper', initialState(), {}, pRev, 100);
    expect(rRev.output.steps).toBeLessThan(0);
  });

  it('Verifies Plant soil moisture calibration endpoints and clamp', () => {
    const p = normalize('plant', { wetRaw: 350, dryRaw: 800 });
    expect(p.dryRaw).toBeGreaterThanOrEqual(p.wetRaw + 50);

    // Dry condition (raw = 800) -> 0%
    const rDry = step('plant', initialState(), { moistureRaw: 800 }, p, 0);
    expect(rDry.output.relativePercent).toBe(0);
    expect(rDry.output.condition).toBe('dry');

    // Mid condition (raw = 575) -> 50%
    const rMid = step('plant', initialState(), { moistureRaw: 575 }, p, 0);
    expect(rMid.output.relativePercent).toBe(50);
    expect(rMid.output.condition).toBe('ok');

    // Wet condition (raw = 350) -> 100%
    const rWet = step('plant', initialState(), { moistureRaw: 350 }, p, 0);
    expect(rWet.output.relativePercent).toBe(100);
    expect(rWet.output.condition).toBe('wet');
  });

  it('Verifies Force sensor threshold and needle angle mapping', () => {
    const p = normalize('force', { threshold: 700 });
    const rBelow = step('force', initialState(), { fsrAdc: 699 }, p, 0);
    expect(rBelow.output.bell).toBe(false);
    expect(rBelow.output.hz).toBe(0);

    const rAbove = step('force', initialState(), { fsrAdc: 700 }, p, 0);
    expect(rAbove.output.bell).toBe(true);
    expect(rAbove.output.hz).toBe(1568);
  });

  it('Verifies Project parking indicator zones (red, yellow, green, no echo)', () => {
    const p = normalize('project', { nearCm: 15, farCm: 40 });

    // Close zone: <= 15cm -> red
    const rNear = step('project', initialState(), { distanceCm: 10 }, p, 0);
    expect(rNear.output.light).toBe('red');
    expect(rNear.output.pins.D4).toBe(1);
    expect(rNear.output.pins.D3).toBe(0);
    expect(rNear.output.pins.D2).toBe(0);

    // Medium zone: > 15cm and <= 40cm -> yellow
    const rMid = step('project', initialState(), { distanceCm: 25 }, p, 0);
    expect(rMid.output.light).toBe('yellow');
    expect(rMid.output.pins.D3).toBe(1);

    // Far zone: > 40cm -> green
    const rFar = step('project', initialState(), { distanceCm: 60 }, p, 0);
    expect(rFar.output.light).toBe('green');
    expect(rFar.output.pins.D2).toBe(1);

    // No echo -> unknown / all lights off
    const rNoEcho = step('project', initialState(), { distanceCm: null }, p, 0);
    expect(rNoEcho.output.light).toBe('unknown');
    expect(rNoEcho.output.pins.D4).toBe(0);
    expect(rNoEcho.output.pins.D3).toBe(0);
    expect(rNoEcho.output.pins.D2).toBe(0);
  });
});
