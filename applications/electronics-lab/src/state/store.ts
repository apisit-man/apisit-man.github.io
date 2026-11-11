import { Locale } from '../i18n';
import { Polarity, calculateLedCircuit, LedCircuitResult } from '../domain/ledModel';
import {
  LessonId,
  MaterialId,
  LedColorId,
  BreadboardPresetId,
  LED_COLOR_PROFILES,
  calculateOpenClosedCircuit,
  calculateConductorTest,
  calculateOhmsLaw,
  calculateBreadboardPreset
} from '../domain/circuitModels';
import { LESSONS, Lesson } from '../content/lessons';

export type ViewMode = 'schematic' | 'bench';
export type ProgressLevel = 'visited' | 'experimented' | 'completed';

export interface ObservationEntry {
  current: number;
  lit: boolean;
}

export interface LessonProgress {
  level: ProgressLevel;
  prediction?: string;
  observedForward?: ObservationEntry;
  observedReverse?: ObservationEntry;
  step1Done?: boolean;
  step2Done?: boolean;
  observed?: boolean;
  transferAnswer?: string;
  isCorrect?: boolean;
  explanation?: string;
}

export interface AppState {
  currentLessonId: LessonId;
  routeNotFound: boolean;
  locale: Locale;
  theme: 'dark' | 'light';
  viewMode: ViewMode;
  teacherMode: boolean;
  teacherRevealAnswers: boolean;
  // Shared & lesson-specific circuit parameters
  voltage: number;
  forwardVoltage: number;
  resistance: number;
  power: boolean;
  polarity: Polarity;
  closedCircuit: boolean;
  wireConnected: boolean;
  materialId: MaterialId;
  ledColor: LedColorId;
  breadboardPreset: BreadboardPresetId;
  // Progress map keyed by lesson ID
  progressMap: Record<string, LessonProgress>;
}

const STORAGE_KEY = 'electronics_lab_state_v1';

export class AppStore {
  private state: AppState;
  private listeners: Set<(state: AppState) => void> = new Set();

  constructor() {
    this.state = this.loadInitialState();
  }

  private getDefaultLesson(): Lesson {
    return LESSONS.find(l => l.id === 'led-polarity') || LESSONS[0];
  }

  private loadInitialState(): AppState {
    let initialLocale: Locale = 'th';
    if (typeof window !== 'undefined' && window.location) {
      const urlParams = new URLSearchParams(window.location.search);
      initialLocale = urlParams.get('lang') === 'en' ? 'en' : 'th';
    }

    let initialTheme: 'dark' | 'light' = 'dark';
    if (typeof localStorage !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
          initialTheme = savedTheme;
        }
      } catch {
        // Ignore storage read error
      }
    }

    const defaultLesson = this.getDefaultLesson();
    const baseState: AppState = {
      currentLessonId: defaultLesson.id,
      routeNotFound: false,
      locale: initialLocale,
      theme: initialTheme,
      viewMode: 'schematic',
      teacherMode: false,
      teacherRevealAnswers: false,
      voltage: defaultLesson.initialCircuit.voltage,
      forwardVoltage: defaultLesson.initialCircuit.forwardVoltage,
      resistance: defaultLesson.initialCircuit.resistance,
      power: defaultLesson.initialCircuit.power,
      polarity: defaultLesson.initialCircuit.polarity,
      closedCircuit: true,
      wireConnected: defaultLesson.initialCircuit.wireConnected ?? true,
      materialId: defaultLesson.initialCircuit.materialId ?? 'copper',
      ledColor: defaultLesson.initialCircuit.ledColor ?? 'red',
      breadboardPreset: defaultLesson.initialCircuit.breadboardPreset ?? 'valid-series',
      progressMap: {
        [defaultLesson.id]: { level: 'visited' }
      }
    };

    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            if (parsed.progressMap && typeof parsed.progressMap === 'object') {
              baseState.progressMap = parsed.progressMap;
            }
            if (parsed.viewMode === 'schematic' || parsed.viewMode === 'bench') {
              baseState.viewMode = parsed.viewMode;
            }
          }
        }
      } catch {
        // Graceful fallback if localStorage is blocked or corrupt
      }
    }

    return baseState;
  }

  private persist() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          progressMap: this.state.progressMap,
          viewMode: this.state.viewMode
        }));
      } catch {
        // Ignore write errors
      }
    }
  }

  public getState(): AppState {
    return this.state;
  }

  public getCurrentLesson(): Lesson {
    return LESSONS.find(l => l.id === this.state.currentLessonId) || this.getDefaultLesson();
  }

  /**
   * Evaluates the active lesson's circuit model and returns a unified LedCircuitResult
   * so all views, meters, and maths stay 100% synchronized.
   */
  public getSimulationResult(): LedCircuitResult {
    const lessonId = this.state.currentLessonId;

    if (lessonId === 'open-closed-circuit') {
      const res = calculateOpenClosedCircuit({
        voltage: this.state.voltage,
        loadResistance: this.state.resistance,
        switchClosed: this.state.power,
        wireConnected: this.state.wireConnected
      });
      return {
        isValid: res.isValid,
        actualCurrent: res.actualCurrent,
        predictedCurrent: this.state.voltage / this.state.resistance,
        resistorVoltage: res.loadVoltage,
        resistorPower: res.loadPower,
        ledVoltage: res.gapVoltage,
        glowIntensity: res.glowIntensity,
        isReverseBiased: false,
        isBelowThreshold: false,
        isOvercurrent: res.actualCurrent > 0.025,
        isTargetMet: res.actualCurrent >= 0.01,
        kvlSatisfied: res.isLoopClosed
      };
    }

    if (lessonId === 'conductors-insulators') {
      const res = calculateConductorTest({
        voltage: this.state.voltage,
        fixedResistance: this.state.resistance,
        forwardVoltage: this.state.forwardVoltage,
        materialId: this.state.materialId,
        power: this.state.power
      });
      return {
        isValid: res.isValid,
        actualCurrent: res.actualCurrent,
        predictedCurrent: (this.state.voltage - this.state.forwardVoltage) / this.state.resistance,
        resistorVoltage: res.resistorVoltageDrop,
        resistorPower: res.actualCurrent * res.actualCurrent * this.state.resistance,
        ledVoltage: res.ledVoltageDrop,
        glowIntensity: res.glowIntensity,
        isReverseBiased: false,
        isBelowThreshold: false,
        isOvercurrent: res.actualCurrent > 0.02,
        isTargetMet: res.isConducting,
        kvlSatisfied: res.isConducting
      };
    }

    if (lessonId === 'ohms-law-resistor') {
      const res = calculateOhmsLaw({
        voltage: this.state.voltage,
        resistance: this.state.resistance,
        power: this.state.power
      });
      return {
        isValid: res.isValid,
        actualCurrent: res.actualCurrent,
        predictedCurrent: res.predictedCurrent,
        resistorVoltage: this.state.power ? this.state.voltage : 0,
        resistorPower: res.powerWatts,
        ledVoltage: 0,
        glowIntensity: this.state.power ? Math.min(1, res.actualCurrent / 0.02) : 0,
        isReverseBiased: false,
        isBelowThreshold: false,
        isOvercurrent: res.actualCurrent > 0.03,
        isTargetMet: res.actualCurrent > 0,
        kvlSatisfied: this.state.power
      };
    }

    if (lessonId === 'breadboard-connectivity') {
      const bb = calculateBreadboardPreset(
        this.state.breadboardPreset,
        this.state.voltage,
        this.state.resistance,
        this.state.forwardVoltage,
        this.state.power
      );
      return {
        isValid: bb.isValid,
        actualCurrent: bb.resistorCurrent,
        predictedCurrent: (this.state.voltage - this.state.forwardVoltage) / this.state.resistance,
        resistorVoltage: bb.resistorCurrent * this.state.resistance,
        resistorPower: bb.resistorCurrent * bb.resistorCurrent * this.state.resistance,
        ledVoltage: bb.ledLit ? this.state.forwardVoltage : 0,
        glowIntensity: bb.glowIntensity,
        isReverseBiased: false,
        isBelowThreshold: false,
        isOvercurrent: bb.resistorCurrent > 0.02,
        isTargetMet: bb.ledLit,
        kvlSatisfied: bb.ledLit
      };
    }

    // Default: 'led-polarity' and 'current-limiting-resistor'
    return calculateLedCircuit({
      voltage: this.state.voltage,
      forwardVoltage: this.state.forwardVoltage,
      resistance: this.state.resistance,
      power: this.state.power,
      polarity: this.state.polarity,
      closedCircuit: this.state.closedCircuit
    });
  }

  public subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.persist();
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  public setRoute(routeId: string) {
    const cleanId = routeId.trim();
    if (!cleanId) {
      this.selectLesson('led-polarity');
      return;
    }

    const found = LESSONS.find(l => l.id === cleanId);
    if (found) {
      if (this.state.currentLessonId !== found.id || this.state.routeNotFound) {
        this.selectLesson(found.id);
      }
    } else {
      this.state.routeNotFound = true;
      this.notify();
    }
  }

  public selectLesson(lessonId: LessonId) {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson) {
      this.state.routeNotFound = true;
      this.notify();
      return;
    }

    this.state.currentLessonId = lesson.id;
    this.state.routeNotFound = false;
    this.state.voltage = lesson.initialCircuit.voltage;
    this.state.forwardVoltage = lesson.initialCircuit.forwardVoltage;
    this.state.resistance = lesson.initialCircuit.resistance;
    this.state.power = lesson.initialCircuit.power;
    this.state.polarity = lesson.initialCircuit.polarity;
    this.state.wireConnected = lesson.initialCircuit.wireConnected ?? true;
    this.state.materialId = lesson.initialCircuit.materialId ?? 'copper';
    this.state.ledColor = lesson.initialCircuit.ledColor ?? 'red';
    this.state.breadboardPreset = lesson.initialCircuit.breadboardPreset ?? 'valid-series';

    if (!this.state.progressMap[lesson.id]) {
      this.state.progressMap[lesson.id] = { level: 'visited' };
    }

    if (typeof window !== 'undefined' && window.location) {
      const targetHash = `#/${lesson.id}`;
      if (window.location.hash !== targetHash) {
        window.location.hash = targetHash;
      }
    }

    this.notify();
  }

  // Actions
  public setPower(power: boolean) {
    this.state.power = power;
    this.markExperimented();
    this.autoLogObservation();
    this.notify();
  }

  public togglePower() {
    this.setPower(!this.state.power);
  }

  public setWireConnected(connected: boolean) {
    this.state.wireConnected = connected;
    this.markExperimented();
    this.autoLogObservation();
    this.notify();
  }

  public toggleWireConnected() {
    this.setWireConnected(!this.state.wireConnected);
  }

  public setPolarity(polarity: Polarity) {
    this.state.polarity = polarity;
    this.markExperimented();
    this.autoLogObservation();
    this.notify();
  }

  public togglePolarity() {
    this.setPolarity(this.state.polarity === 'forward' ? 'reverse' : 'forward');
  }

  public setMaterialId(materialId: MaterialId) {
    this.state.materialId = materialId;
    this.markExperimented();
    this.autoLogObservation();
    this.notify();
  }

  public setLedColor(colorId: LedColorId) {
    this.state.ledColor = colorId;
    this.state.forwardVoltage = LED_COLOR_PROFILES[colorId].forwardVoltage;
    this.markExperimented();
    this.autoLogObservation();
    this.notify();
  }

  public setBreadboardPreset(preset: BreadboardPresetId) {
    this.state.breadboardPreset = preset;
    this.markExperimented();
    this.autoLogObservation();
    this.notify();
  }

  public setVoltage(voltage: number) {
    this.state.voltage = voltage;
    this.markExperimented();
    this.autoLogObservation();
    this.notify();
  }

  public setResistance(resistance: number) {
    this.state.resistance = resistance;
    this.markExperimented();
    this.autoLogObservation();
    this.notify();
  }

  public setViewMode(viewMode: ViewMode) {
    this.state.viewMode = viewMode;
    this.notify();
  }

  public setLocale(locale: Locale) {
    this.state.locale = locale;
    if (typeof window !== 'undefined' && window.location) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', locale);
        window.history.replaceState({}, '', url.toString());
      } catch {
        // Ignore URL error
      }
    }
    this.notify();
  }

  public toggleTeacherMode() {
    this.state.teacherMode = !this.state.teacherMode;
    this.notify();
  }

  public toggleTeacherRevealAnswers() {
    this.state.teacherRevealAnswers = !this.state.teacherRevealAnswers;
    this.notify();
  }

  public toggleTheme() {
    this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', this.state.theme === 'dark');
    }
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('theme', this.state.theme);
      } catch {
        // Ignore storage write error
      }
    }
    this.notify();
  }

  private markExperimented() {
    const id = this.state.currentLessonId;
    const current = this.state.progressMap[id] || { level: 'visited' };
    if (current.level === 'visited') {
      this.state.progressMap[id] = {
        ...current,
        level: 'experimented'
      };
    }
  }

  private autoLogObservation(forceUpdate = false) {
    const id = this.state.currentLessonId;
    const current = this.state.progressMap[id] || { level: 'visited' };
    const sim = this.getSimulationResult();
    if (!sim.isValid) return;

    if (id === 'open-closed-circuit') {
      const isClosed = this.state.power && this.state.wireConnected;
      if (isClosed) {
        current.observedForward = { current: sim.actualCurrent, lit: true };
        current.step1Done = true;
      } else if (current.step1Done) {
        current.observedReverse = { current: 0, lit: false };
        current.step2Done = true;
      }
    } else if (id === 'conductors-insulators') {
      if (!this.state.power) return;
      if (sim.actualCurrent > 0) {
        current.observedForward = { current: sim.actualCurrent, lit: true };
        current.step1Done = true;
      } else {
        current.observedReverse = { current: 0, lit: false };
        current.step2Done = true;
      }
    } else if (id === 'ohms-law-resistor') {
      if (!this.state.power) return;
      if (this.state.voltage === 3.0 && this.state.resistance === 300) {
        current.observedForward = { current: sim.actualCurrent, lit: true };
        current.step1Done = true;
      } else {
        current.observedReverse = { current: sim.actualCurrent, lit: sim.actualCurrent > 0 };
        current.step2Done = true;
      }
    } else if (id === 'current-limiting-resistor') {
      if (!this.state.power) return;
      if (!sim.isOvercurrent) {
        current.observedForward = { current: sim.actualCurrent, lit: sim.actualCurrent > 0 };
        current.step1Done = true;
      } else {
        current.observedReverse = { current: sim.actualCurrent, lit: true };
        current.step2Done = true;
      }
    } else if (id === 'breadboard-connectivity') {
      if (!this.state.power) return;
      if (this.state.breadboardPreset === 'valid-series') {
        current.observedForward = { current: sim.actualCurrent, lit: true };
        current.step1Done = true;
      } else {
        current.observedReverse = { current: sim.actualCurrent, lit: false };
        current.step2Done = true;
      }
    } else {
      // led-polarity
      if (!this.state.power) return;
      const entry: ObservationEntry = {
        current: sim.actualCurrent,
        lit: sim.actualCurrent > 0
      };
      if (this.state.polarity === 'forward') {
        if (forceUpdate || !current.observedForward) {
          current.observedForward = entry;
          current.step1Done = true;
        }
      } else {
        if (forceUpdate || !current.observedReverse) {
          current.observedReverse = entry;
          current.step2Done = true;
        }
      }
    }

    if (current.observedForward && current.observedReverse) {
      current.observed = true;
    }
    this.state.progressMap[id] = { ...current };
  }

  public submitPrediction(prediction: string) {
    const id = this.state.currentLessonId;
    const current = this.state.progressMap[id] || { level: 'visited' };
    this.state.progressMap[id] = {
      ...current,
      prediction
    };
    this.notify();
  }

  public recordObservation() {
    this.autoLogObservation(true);
    const id = this.state.currentLessonId;
    const current = this.state.progressMap[id] || { level: 'visited' };
    this.state.progressMap[id] = {
      ...current,
      observed: true
    };
    this.notify();
  }

  public saveExplanation(explanation: string, transferAnswer?: string) {
    const id = this.state.currentLessonId;
    const lesson = this.getCurrentLesson();
    const current = this.state.progressMap[id] || { level: 'visited' };
    const chosenTransfer = transferAnswer ?? current.transferAnswer;
    const isCorrect =
      current.prediction === lesson.inquiry.correctPrediction &&
      chosenTransfer === lesson.inquiry.correctTransfer;

    this.state.progressMap[id] = {
      ...current,
      transferAnswer: chosenTransfer,
      isCorrect,
      explanation,
      level: 'completed'
    };
    this.notify();
  }

  public resetExperiment() {
    const lesson = this.getCurrentLesson();
    this.state.voltage = lesson.initialCircuit.voltage;
    this.state.forwardVoltage = lesson.initialCircuit.forwardVoltage;
    this.state.resistance = lesson.initialCircuit.resistance;
    this.state.power = lesson.initialCircuit.power;
    this.state.polarity = lesson.initialCircuit.polarity;
    this.state.wireConnected = lesson.initialCircuit.wireConnected ?? true;
    this.state.materialId = lesson.initialCircuit.materialId ?? 'copper';
    this.state.ledColor = lesson.initialCircuit.ledColor ?? 'red';
    this.state.breadboardPreset = lesson.initialCircuit.breadboardPreset ?? 'valid-series';
    this.notify();
  }

  public resetAllProgress() {
    this.state.progressMap = {};
    for (const lesson of LESSONS) {
      this.state.progressMap[lesson.id] = { level: 'visited' };
    }
    this.resetExperiment();
    this.notify();
  }
}

export const store = new AppStore();
