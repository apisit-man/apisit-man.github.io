import { describe, it, expect, beforeEach } from 'vitest';
import { AppStore } from '../src/state/store';

describe('AppStore & Interaction State Tests', () => {
  let store: AppStore;

  beforeEach(() => {
    // Reset store before each test
    store = new AppStore();
  });

  it('Initializes with default LED Polarity values', () => {
    const state = store.getState();
    expect(state.currentLessonId).toBe('led-polarity');
    expect(state.voltage).toBe(3.0);
    expect(state.resistance).toBe(220);
    expect(state.forwardVoltage).toBe(2.0);
    expect(state.power).toBe(false);
    expect(state.polarity).toBe('forward');
    expect(state.viewMode).toBe('schematic');
  });

  it('Toggles power state correctly', () => {
    expect(store.getState().power).toBe(false);
    store.togglePower();
    expect(store.getState().power).toBe(true);

    const res = store.getSimulationResult();
    expect(res.actualCurrent).toBeGreaterThan(0);
    expect(res.isReverseBiased).toBe(false);

    store.togglePower();
    expect(store.getState().power).toBe(false);
    expect(store.getSimulationResult().actualCurrent).toBe(0);
  });

  it('Toggles polarity and updates model state correctly', () => {
    store.setPower(true);
    store.setPolarity('reverse');

    const state = store.getState();
    expect(state.polarity).toBe('reverse');

    const res = store.getSimulationResult();
    expect(res.isReverseBiased).toBe(true);
    expect(res.actualCurrent).toBe(0);
    expect(res.ledVoltage).toBe(3.0);
  });

  it('Reset experiment restores default circuit values without clearing progress', () => {
    store.submitPrediction('B');
    store.recordObservation();
    store.setVoltage(4.5);
    store.setResistance(100);
    store.setPower(true);

    store.resetExperiment();

    const state = store.getState();
    expect(state.voltage).toBe(3.0);
    expect(state.resistance).toBe(220);
    expect(state.power).toBe(false);

    // Progress preserved
    expect(state.progressMap['led-polarity'].prediction).toBe('B');
    expect(state.progressMap['led-polarity'].observed).toBe(true);
  });

  it('Reset all progress clears user responses and resets experiment', () => {
    store.submitPrediction('B');
    store.saveExplanation('Diode blocks reverse current');

    store.resetAllProgress();

    const state = store.getState();
    expect(state.progressMap['led-polarity'].prediction).toBeUndefined();
    expect(state.progressMap['led-polarity'].explanation).toBeUndefined();
    expect(state.power).toBe(false);
  });

  it('Switching view modes preserves circuit electrical state', () => {
    store.setPower(true);
    store.setVoltage(4.5);
    const beforeResult = store.getSimulationResult();

    store.setViewMode('bench');
    expect(store.getState().viewMode).toBe('bench');
    expect(store.getSimulationResult().actualCurrent).toBe(beforeResult.actualCurrent);

    store.setViewMode('schematic');
    expect(store.getState().viewMode).toBe('schematic');
    expect(store.getSimulationResult().actualCurrent).toBe(beforeResult.actualCurrent);
  });
});
