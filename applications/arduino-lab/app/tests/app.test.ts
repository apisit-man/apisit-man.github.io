import { describe, it, expect } from 'vitest';
import { lessonIds, normalize, step, defaults, initialState } from '../src/model';
import { sketch } from '../src/sketches';
import { EQUIPMENT_CATALOG, getEquipmentForLesson, renderEquipmentInspector } from '../src/equipment';
import lessonsRaw from '../src/content/lessons.json';
import uiStringsRaw from '../src/content/ui-strings.json';

describe('Arduino Lab Model & Logic Verification', () => {
  it('covers all 16 unique lesson IDs in fixed order', () => {
    expect(lessonIds).toHaveLength(16);
    expect(lessonIds[0]).toBe('board');
    expect(lessonIds[15]).toBe('project');
  });

  it('normalizes parameters safely without returning undefined or NaN', () => {
    lessonIds.forEach((id) => {
      const p = normalize(id, { invalidKey: 'inject', onMs: -999, threshold: 'bad' });
      expect(p).toBeDefined();
      expect(typeof p).toBe('object');
      Object.values(p).forEach((val) => {
        if (typeof val === 'number') {
          expect(Number.isFinite(val)).toBe(true);
        }
      });
    });
  });

  it('executes simulation step for all 16 lessons without runtime errors', () => {
    lessonIds.forEach((id) => {
      const res = step(id, initialState(), {}, defaults[id] || {}, 50);
      expect(res.state).toBeDefined();
      expect(res.output).toBeDefined();
      expect(typeof res.output).toBe('object');
    });
  });

  it('validates blink period and LED timing', () => {
    const res1 = step('blink', { ...initialState(), timeMs: 100 }, {}, { onMs: 500, offMs: 500 }, 10);
    expect(res1.output.led).toBe(true);

    const res2 = step('blink', { ...initialState(), timeMs: 600 }, {}, { onMs: 500, offMs: 500 }, 10);
    expect(res2.output.led).toBe(false);
  });

  it('verifies button active-low debounce and toggle logic', () => {
    let s = initialState();
    // Press button
    let r = step('button', s, { pressed: true }, { mode: 'toggle', debounceMs: 30 }, 10);
    s = r.state;
    expect(s.stablePressed).toBe(false); // Not debounced yet (only 10ms)

    // Advance 30ms (total 40ms >= debounceMs)
    r = step('button', s, { pressed: true }, { mode: 'toggle', debounceMs: 30 }, 30);
    s = r.state;
    expect(s.stablePressed).toBe(true);
    expect(s.toggled).toBe(true);
    expect(r.output.led).toBe(true);
  });

  it('verifies knob ADC to PWM 8-bit mapping truncation', () => {
    const r1 = step('knob', initialState(), { adc: 0 }, {}, 0);
    expect(r1.output.pwm).toBe(0);
    expect(r1.output.duty).toBe(0);

    const r2 = step('knob', initialState(), { adc: 512 }, {}, 0);
    expect(r2.output.pwm).toBe(127); // Math.trunc(512 * 255 / 1023) === 127
    expect(r2.output.duty).toBeCloseTo(127 / 255, 3);

    const r3 = step('knob', initialState(), { adc: 1023 }, {}, 0);
    expect(r3.output.pwm).toBe(255);
    expect(r3.output.duty).toBe(1);
  });

  it('verifies ultrasonic sensor echo and no-echo condition', () => {
    const rNormal = step('sensor', initialState(), { distanceCm: 25 }, {}, 0);
    expect(rNormal.output.valid).toBe(true);
    expect(rNormal.output.distanceCm).toBeCloseTo(25, 1);

    const rNoEcho = step('sensor', initialState(), { distanceCm: null }, {}, 0);
    expect(rNoEcho.output.valid).toBe(false);
    expect(rNoEcho.output.distanceCm).toBeNull();
  });

  it('generates non-empty C++ sketch with author credits and correct keywords for all 16 lessons', () => {
    lessonIds.forEach((id) => {
      const code = sketch(id, defaults[id] || {});
      expect(code).toContain('void setup()');
      expect(code).toContain('void loop()');
      expect(code).toContain('Dr. Apisit Tongchai');
    });
  });

  it('verifies lessons catalog parity and bilingual fields', () => {
    const lessons = (lessonsRaw as any).lessons;
    expect(lessons).toHaveLength(16);
    lessons.forEach((l: any) => {
      expect(l.id).toBeDefined();
      expect(l.title.th).toBeTruthy();
      expect(l.title.en).toBeTruthy();
      expect(l.objective.th).toBeTruthy();
      expect(l.objective.en).toBeTruthy();
      expect(l.connections).toBeInstanceOf(Array);
      expect(l.connections.length).toBeGreaterThan(0);
    });
  });

  it('verifies ui-strings bilingual parity', () => {
    const ui = uiStringsRaw as any;
    Object.entries(ui).forEach(([key, val]: [string, any]) => {
      expect(val.th).toBeDefined();
      expect(val.en).toBeDefined();
    });
  });

  it('verifies every component in all 16 lessons has complete engineering specs in EQUIPMENT_CATALOG', () => {
    const lessons = (lessonsRaw as any).lessons;
    lessons.forEach((l: any) => {
      const specs = getEquipmentForLesson(l.id, l.components);
      expect(specs.length).toBeGreaterThan(0);
      l.components.forEach((compId: string) => {
        const entry = EQUIPMENT_CATALOG[compId];
        expect(entry, `Missing EQUIPMENT_CATALOG spec for ${compId}`).toBeDefined();
        expect(entry.name.th).toBeTruthy();
        expect(entry.name.en).toBeTruthy();
        expect(entry.principle.th).toBeTruthy();
        expect(entry.principle.en).toBeTruthy();
        expect(entry.labTip.th).toBeTruthy();
        expect(entry.labTip.en).toBeTruthy();
        expect(entry.pins.length).toBeGreaterThan(0);
        expect(entry.focusPoint).toHaveLength(3);
      });
      const htmlTh = renderEquipmentInspector(l.id, l.components, l.components[0], 'th');
      const htmlEn = renderEquipmentInspector(l.id, l.components, l.components[0], 'en');
      expect(htmlTh).toContain('data-part-id');
      expect(htmlEn).toContain('data-part-id');
    });
  });
});
