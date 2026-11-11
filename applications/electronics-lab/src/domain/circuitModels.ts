/**
 * Domain Models for the P1 Six-Lesson Classroom Pilot
 * Each lesson has an explicit, pure mathematical model contract using SI units.
 */

import { calculateLedCircuit, LedCircuitResult, Polarity } from './ledModel';

export type LessonId =
  | 'open-closed-circuit'
  | 'conductors-insulators'
  | 'ohms-law-resistor'
  | 'led-polarity'
  | 'current-limiting-resistor'
  | 'breadboard-connectivity';

// ============================================================================
// Resistor EIA 4-Band Color Code Helper
// ============================================================================
export interface ResistorColorBand {
  nameTh: string;
  nameEn: string;
  hex: string;
}

const DIGIT_BANDS: Record<number, ResistorColorBand> = {
  0: { nameTh: 'ดำ', nameEn: 'Black', hex: '#1e293b' },
  1: { nameTh: 'น้ำตาล', nameEn: 'Brown', hex: '#78350f' },
  2: { nameTh: 'แดง', nameEn: 'Red', hex: '#dc2626' },
  3: { nameTh: 'ส้ม', nameEn: 'Orange', hex: '#ea580c' },
  4: { nameTh: 'เหลือง', nameEn: 'Yellow', hex: '#eab308' },
  5: { nameTh: 'เขียว', nameEn: 'Green', hex: '#16a34a' },
  6: { nameTh: 'น้ำเงิน', nameEn: 'Blue', hex: '#2563eb' },
  7: { nameTh: 'ม่วง', nameEn: 'Violet', hex: '#9333ea' },
  8: { nameTh: 'เทา', nameEn: 'Grey', hex: '#64748b' },
  9: { nameTh: 'ขาว', nameEn: 'White', hex: '#f8fafc' }
};

const MULTIPLIER_BANDS: Record<number, ResistorColorBand> = {
  0: { nameTh: 'ดำ (×1)', nameEn: 'Black (×1)', hex: '#1e293b' },
  1: { nameTh: 'น้ำตาล (×10)', nameEn: 'Brown (×10)', hex: '#78350f' },
  2: { nameTh: 'แดง (×100)', nameEn: 'Red (×100)', hex: '#dc2626' },
  3: { nameTh: 'ส้ม (×1k)', nameEn: 'Orange (×1k)', hex: '#ea580c' }
};

const GOLD_TOLERANCE: ResistorColorBand = {
  nameTh: 'ทอง (±5%)',
  nameEn: 'Gold (±5%)',
  hex: '#d97706'
};

export function getResistorColorBands(ohms: number): [ResistorColorBand, ResistorColorBand, ResistorColorBand, ResistorColorBand] {
  if (!Number.isFinite(ohms) || ohms <= 0) {
    return [DIGIT_BANDS[0], DIGIT_BANDS[0], MULTIPLIER_BANDS[0], GOLD_TOLERANCE];
  }
  const rounded = Math.round(ohms);
  const str = String(rounded);
  if (rounded < 10) {
    return [DIGIT_BANDS[0], DIGIT_BANDS[rounded] || DIGIT_BANDS[0], MULTIPLIER_BANDS[0], GOLD_TOLERANCE];
  }
  const d1 = parseInt(str[0], 10) || 0;
  const d2 = parseInt(str[1], 10) || 0;
  const multExp = Math.max(0, Math.min(3, str.length - 2));
  return [
    DIGIT_BANDS[d1] || DIGIT_BANDS[0],
    DIGIT_BANDS[d2] || DIGIT_BANDS[0],
    MULTIPLIER_BANDS[multExp] || MULTIPLIER_BANDS[0],
    GOLD_TOLERANCE
  ];
}

// ============================================================================
// 1. Open & Closed Circuit Model Contract
// ============================================================================
export interface OpenClosedCircuitInput {
  voltage: number;         // Supply voltage (V)
  loadResistance: number;  // Indicator lamp/resistor resistance (Ohms)
  switchClosed: boolean;   // Primary switch state
  wireConnected: boolean;  // Return wire continuity state
}

export interface OpenClosedCircuitResult {
  isValid: boolean;
  isLoopClosed: boolean;
  actualCurrent: number;
  loadVoltage: number;
  gapVoltage: number;      // Voltage across open break when loop is open
  loadPower: number;
  glowIntensity: number;
}

export function calculateOpenClosedCircuit(input: OpenClosedCircuitInput): OpenClosedCircuitResult {
  const { voltage, loadResistance, switchClosed, wireConnected } = input;
  if (!Number.isFinite(voltage) || voltage < 0 || !Number.isFinite(loadResistance) || loadResistance <= 0) {
    return {
      isValid: false,
      isLoopClosed: false,
      actualCurrent: NaN,
      loadVoltage: NaN,
      gapVoltage: NaN,
      loadPower: NaN,
      glowIntensity: 0
    };
  }

  const isLoopClosed = switchClosed && wireConnected;
  if (!isLoopClosed) {
    return {
      isValid: true,
      isLoopClosed: false,
      actualCurrent: 0,
      loadVoltage: 0,
      gapVoltage: voltage, // Full source potential appears across open break
      loadPower: 0,
      glowIntensity: 0
    };
  }

  const actualCurrent = voltage / loadResistance;
  const loadVoltage = voltage;
  const loadPower = voltage * actualCurrent;
  const glowIntensity = Math.min(1.0, Math.max(0.25, actualCurrent / 0.025));

  return {
    isValid: true,
    isLoopClosed: true,
    actualCurrent,
    loadVoltage,
    gapVoltage: 0,
    loadPower,
    glowIntensity
  };
}

// ============================================================================
// 2. Conductors & Insulators Model Contract
// ============================================================================
export type MaterialId = 'copper' | 'graphite' | 'plastic' | 'wood' | 'rubber';

export interface MaterialProfile {
  id: MaterialId;
  category: 'conductor' | 'partial-conductor' | 'insulator';
  resistanceOhms: number; // Infinity for ideal educational insulators
  names: { th: string; en: string };
  colorHex: string;
}

export const MATERIAL_PROFILES: Record<MaterialId, MaterialProfile> = {
  copper: {
    id: 'copper',
    category: 'conductor',
    resistanceOhms: 0.05,
    names: { th: 'แผ่นทองแดง (Copper)', en: 'Copper Strip' },
    colorHex: '#d97706'
  },
  graphite: {
    id: 'graphite',
    category: 'partial-conductor',
    resistanceOhms: 180,
    names: { th: 'ไส้ดินสอกราไฟต์ (Graphite)', en: 'Pencil Graphite' },
    colorHex: '#475569'
  },
  plastic: {
    id: 'plastic',
    category: 'insulator',
    resistanceOhms: Infinity,
    names: { th: 'ไม้บรรทัดพลาสติก (Plastic)', en: 'Plastic Ruler' },
    colorHex: '#38bdf8'
  },
  wood: {
    id: 'wood',
    category: 'insulator',
    resistanceOhms: Infinity,
    names: { th: 'แท่งไม้แห้ง (Dry Wood)', en: 'Dry Wood Stick' },
    colorHex: '#a16207'
  },
  rubber: {
    id: 'rubber',
    category: 'insulator',
    resistanceOhms: Infinity,
    names: { th: 'ยางลบ (Rubber)', en: 'Rubber Eraser' },
    colorHex: '#f43f5e'
  }
};

export interface ConductorTestInput {
  voltage: number;
  fixedResistance: number;
  forwardVoltage: number;
  materialId: MaterialId;
  power: boolean;
}

export interface ConductorTestResult {
  isValid: boolean;
  material: MaterialProfile;
  isConducting: boolean;
  totalResistance: number;
  actualCurrent: number;
  sampleVoltageDrop: number;
  resistorVoltageDrop: number;
  ledVoltageDrop: number;
  glowIntensity: number;
}

export function calculateConductorTest(input: ConductorTestInput): ConductorTestResult {
  const { voltage, fixedResistance, forwardVoltage, materialId, power } = input;
  const material = MATERIAL_PROFILES[materialId];

  if (!material || !Number.isFinite(voltage) || voltage < 0 || !Number.isFinite(fixedResistance) || fixedResistance <= 0) {
    return {
      isValid: false,
      material: material || MATERIAL_PROFILES.copper,
      isConducting: false,
      totalResistance: NaN,
      actualCurrent: NaN,
      sampleVoltageDrop: NaN,
      resistorVoltageDrop: NaN,
      ledVoltageDrop: NaN,
      glowIntensity: 0
    };
  }

  const totalResistance = fixedResistance + material.resistanceOhms;
  if (!power || !Number.isFinite(totalResistance) || voltage <= forwardVoltage) {
    return {
      isValid: true,
      material,
      isConducting: false,
      totalResistance,
      actualCurrent: 0,
      sampleVoltageDrop: power && !Number.isFinite(totalResistance) ? voltage : 0,
      resistorVoltageDrop: 0,
      ledVoltageDrop: 0,
      glowIntensity: 0
    };
  }

  const actualCurrent = (voltage - forwardVoltage) / totalResistance;
  const sampleVoltageDrop = actualCurrent * material.resistanceOhms;
  const resistorVoltageDrop = actualCurrent * fixedResistance;
  const glowIntensity = Math.min(1.0, Math.max(0.2, actualCurrent / 0.006));

  return {
    isValid: true,
    material,
    isConducting: actualCurrent > 0,
    totalResistance,
    actualCurrent,
    sampleVoltageDrop,
    resistorVoltageDrop,
    ledVoltageDrop: forwardVoltage,
    glowIntensity
  };
}

// ============================================================================
// 3. Ohm's Law with a Resistor Model Contract
// ============================================================================
export interface OhmsLawInput {
  voltage: number;
  resistance: number;
  power: boolean;
}

export interface OhmsLawResult {
  isValid: boolean;
  actualCurrent: number;
  predictedCurrent: number;
  powerWatts: number;
  curvePoints: Array<{ v: number; iMilliAmps: number }>;
}

export function calculateOhmsLaw(input: OhmsLawInput): OhmsLawResult {
  const { voltage, resistance, power } = input;
  if (!Number.isFinite(voltage) || voltage < 0 || !Number.isFinite(resistance) || resistance <= 0) {
    return {
      isValid: false,
      actualCurrent: NaN,
      predictedCurrent: NaN,
      powerWatts: NaN,
      curvePoints: []
    };
  }

  const predictedCurrent = voltage / resistance;
  const actualCurrent = power ? predictedCurrent : 0;
  const powerWatts = actualCurrent * actualCurrent * resistance;

  const curvePoints: Array<{ v: number; iMilliAmps: number }> = [];
  for (let v = 0; v <= 6.0; v += 1.5) {
    curvePoints.push({ v, iMilliAmps: (v / resistance) * 1000 });
  }

  return {
    isValid: true,
    actualCurrent,
    predictedCurrent,
    powerWatts,
    curvePoints
  };
}

// ============================================================================
// 5. Current-Limiting Resistor Model Contract
// ============================================================================
export type LedColorId = 'red' | 'green' | 'blue';

export interface LedColorProfile {
  id: LedColorId;
  forwardVoltage: number;
  hex: string;
  names: { th: string; en: string };
}

export const LED_COLOR_PROFILES: Record<LedColorId, LedColorProfile> = {
  red: { id: 'red', forwardVoltage: 2.0, hex: '#ef4444', names: { th: 'LED สีแดง (Vf = 2.0 V)', en: 'Red LED (Vf = 2.0 V)' } },
  green: { id: 'green', forwardVoltage: 2.2, hex: '#22c55e', names: { th: 'LED สีเขียว (Vf = 2.2 V)', en: 'Green LED (Vf = 2.2 V)' } },
  blue: { id: 'blue', forwardVoltage: 3.0, hex: '#3b82f6', names: { th: 'LED สีน้ำเงิน (Vf = 3.0 V)', en: 'Blue LED (Vf = 3.0 V)' } }
};

// ============================================================================
// 6. Breadboard Connectivity Model Contract
// ============================================================================
export type BreadboardPresetId =
  | 'valid-series'
  | 'shorted-same-strip'
  | 'open-center-gap'
  | 'misaligned-row';

export interface BreadboardNetAnalysis {
  isValid: boolean;
  presetId: BreadboardPresetId;
  faultType: 'none' | 'led-shorted-by-strip' | 'open-across-trench' | 'open-unconnected-strip';
  resistorCurrent: number;
  ledCurrent: number;
  ledLit: boolean;
  glowIntensity: number;
  activeStrips: string[]; // e.g. ['col-5-top', 'col-12-top', 'col-16-top']
}

export function calculateBreadboardPreset(
  presetId: BreadboardPresetId,
  voltage: number,
  resistance: number,
  forwardVoltage: number,
  power: boolean
): BreadboardNetAnalysis {
  if (!Number.isFinite(voltage) || voltage < 0 || !Number.isFinite(resistance) || resistance <= 0) {
    return {
      isValid: false,
      presetId,
      faultType: 'none',
      resistorCurrent: NaN,
      ledCurrent: NaN,
      ledLit: false,
      glowIntensity: 0,
      activeStrips: []
    };
  }

  if (presetId === 'valid-series') {
    const ledRes = calculateLedCircuit({
      voltage,
      forwardVoltage,
      resistance,
      power,
      polarity: 'forward'
    });
    return {
      isValid: true,
      presetId,
      faultType: 'none',
      resistorCurrent: ledRes.actualCurrent,
      ledCurrent: ledRes.actualCurrent,
      ledLit: ledRes.actualCurrent > 0,
      glowIntensity: ledRes.glowIntensity,
      activeStrips: ['rail-plus', 'strip-top-5', 'strip-top-12', 'strip-top-16', 'rail-minus']
    };
  }

  if (presetId === 'shorted-same-strip') {
    // Both LED leads plugged into strip-top-12 -> LED is bypassed (0 V across LED), resistor takes full supply voltage!
    const resistorCurrent = power ? voltage / resistance : 0;
    return {
      isValid: true,
      presetId,
      faultType: 'led-shorted-by-strip',
      resistorCurrent,
      ledCurrent: 0,
      ledLit: false,
      glowIntensity: 0,
      activeStrips: ['rail-plus', 'strip-top-5', 'strip-top-12-shorted', 'rail-minus']
    };
  }

  if (presetId === 'open-center-gap') {
    // Resistor ends on strip-top-12 (E12), LED Anode on strip-bot-12 (F12) without jumper across center trench
    return {
      isValid: true,
      presetId,
      faultType: 'open-across-trench',
      resistorCurrent: 0,
      ledCurrent: 0,
      ledLit: false,
      glowIntensity: 0,
      activeStrips: ['rail-plus', 'strip-top-5', 'strip-top-12', 'trench-gap-12', 'strip-bot-12']
    };
  }

  // misaligned-row: Resistor ends at strip-top-12 (B12), LED Anode in strip-top-13 (C13)
  return {
    isValid: true,
    presetId,
    faultType: 'open-unconnected-strip',
    resistorCurrent: 0,
    ledCurrent: 0,
    ledLit: false,
    glowIntensity: 0,
    activeStrips: ['rail-plus', 'strip-top-5', 'strip-top-12', 'strip-top-13-isolated']
  };
}

export { calculateLedCircuit, type LedCircuitResult, type Polarity };
