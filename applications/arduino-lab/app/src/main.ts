import {
  lessonIds,
  normalize,
  step,
  defaults,
  type LessonId,
  type SimulationState,
  initialState,
} from './model';
import { sketch } from './sketches';
import lessonsRaw from './content/lessons.json';
import uiStringsRaw from './content/ui-strings.json';
import { init3DScene, type SceneController, type CameraPreset } from './scene';
import { renderSchematicSVG } from './schematic';
import { renderControlsForLesson } from './controls';
import { playTone, stopTone, setMuted, isAudioMuted } from './audio';
import { getEquipmentForLesson, renderEquipmentInspector } from './equipment';
import type { LessonData, Locale, AppState } from './types';

// Load catalog
const lessons: LessonData[] = (lessonsRaw as any).lessons;
const uiStrings: Record<string, { th: string; en: string }> = uiStringsRaw as any;

function t(key: string, lang: Locale): string {
  if (uiStrings[key] && uiStrings[key][lang]) return uiStrings[key][lang];
  return key;
}

// App State
const state: AppState = {
  lessonId: 'board',
  lang: 'th',
  isRunning: false,
  viewMode: '3d',
  params: {},
  inputs: {},
  completedLessons: [],
  theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  simulationTimeMs: 0,
  serialLogs: [],
};

let simEngineState: SimulationState = initialState();
let currentOutput: Record<string, any> = {};
let sceneCtrl: SceneController | null = null;
let lastTimestamp = 0;
let lastSerialLogTime = 0;
let animFrameId = 0;
let activeTab = 'overview';
let selectedPartId = 'uno';
let cachedDistance = 30; // retained distance for no-echo toggle

// Safe localStorage with memory fallback
const memoryStorage: Record<string, string> = {};
function safeStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return memoryStorage[key] || null;
  }
}
function safeStorageSet(key: string, val: string): void {
  try {
    localStorage.setItem(key, val);
  } catch {
    memoryStorage[key] = val;
  }
}

// Parse URL
function parseURL(): { lang: Locale; lessonId: LessonId } {
  const url = new URL(window.location.href);
  const langParam = url.searchParams.get('lang');
  const lang: Locale = langParam === 'en' ? 'en' : 'th';

  let hash = window.location.hash.replace('#', '').trim() as LessonId;
  if (!lessonIds.includes(hash)) {
    hash = 'board';
  }
  return { lang, lessonId: hash };
}

function updateURL(push = true) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', state.lang);
  url.hash = state.lessonId;
  if (push) {
    window.history.pushState({}, '', url.toString());
  } else {
    window.history.replaceState({}, '', url.toString());
  }
}

function getActiveLesson(): LessonData {
  return lessons.find((l) => l.id === state.lessonId) || lessons[0];
}

// Action Dispatcher
export type Action =
  | { type: 'SET_LESSON'; id: LessonId; pushUrl?: boolean }
  | { type: 'SET_PARAM'; key: string; value: any }
  | { type: 'SET_INPUT'; key: string; value: any }
  | { type: 'TOGGLE_RUN' }
  | { type: 'RESET' }
  | { type: 'SET_VIEW'; mode: '3d' | 'svg' }
  | { type: 'SET_LANG'; lang: Locale }
  | { type: 'SET_THEME'; theme: 'dark' | 'light' }
  | { type: 'SET_TAB'; tab: string }
  | { type: 'SELECT_PART'; partId: string; focus3D?: boolean }
  | { type: 'TOGGLE_COMPLETE'; id: LessonId }
  | { type: 'CLEAR_SERIAL' };

export function dispatch(action: Action) {
  switch (action.type) {
    case 'SET_LESSON': {
      if (state.lessonId !== action.id) {
        stopTone();
        state.lessonId = action.id;
        const lesson = getActiveLesson();
        state.params = { ...lesson.defaultParams };
        state.inputs = { ...lesson.defaultInputs };
        simEngineState = initialState();
        state.simulationTimeMs = 0;
        cachedDistance = 30;
        const parts = getEquipmentForLesson(lesson.id, lesson.components);
        selectedPartId = parts.length > 1 && lesson.id !== 'board' ? parts[parts.length - 1].id : 'uno';
        updateURL(action.pushUrl !== false);
        patchLessonPills();
        patchLessonHeader();
        patchControls();
        patchEquipmentPanel();
        patchTabs();
        sceneCtrl?.resetCamera();
      }
      break;
    }

    case 'SET_PARAM': {
      state.params[action.key] = action.value;
      if (state.lessonId === 'plant') {
        if (action.key === 'dryRaw' && action.value < (state.params.wetRaw ?? 350) + 50) {
          state.params.dryRaw = (state.params.wetRaw ?? 350) + 50;
        } else if (action.key === 'wetRaw' && action.value > (state.params.dryRaw ?? 800) - 50) {
          state.params.wetRaw = (state.params.dryRaw ?? 800) - 50;
        }
      } else if (state.lessonId === 'project') {
        if (action.key === 'nearCm' && (state.params.farCm ?? 40) <= action.value) {
          state.params.farCm = action.value + 1;
        } else if (action.key === 'farCm' && action.value <= (state.params.nearCm ?? 15)) {
          state.params.farCm = (state.params.nearCm ?? 15) + 1;
        }
      }
      break;
    }

    case 'SET_INPUT': {
      state.inputs[action.key] = action.value;
      if (action.key === 'distanceCm' && action.value !== null) {
        cachedDistance = action.value;
      }
      break;
    }

    case 'TOGGLE_RUN': {
      state.isRunning = !state.isRunning;
      if (!state.isRunning) stopTone();
      patchRunState();
      break;
    }

    case 'RESET': {
      stopTone();
      const lesson = getActiveLesson();
      state.params = { ...lesson.defaultParams };
      state.inputs = { ...lesson.defaultInputs };
      simEngineState = initialState();
      state.simulationTimeMs = 0;
      cachedDistance = 30;
      patchControls();
      sceneCtrl?.resetCamera();
      break;
    }

    case 'SET_VIEW': {
      state.viewMode = action.mode;
      patchViewMode();
      break;
    }

    case 'SET_LANG': {
      state.lang = action.lang;
      document.documentElement.lang = action.lang;
      updateURL(false);
      patchLanguage();
      patchLessonPills();
      patchLessonHeader();
      patchControls();
      patchEquipmentPanel();
      patchTabs();
      patchRunState();
      patchCompleteButton();
      break;
    }

    case 'SET_THEME': {
      state.theme = action.theme;
      safeStorageSet('theme', action.theme);
      if (action.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      sceneCtrl?.setTheme(action.theme === 'dark');
      patchTheme();
      break;
    }

    case 'SET_TAB': {
      activeTab = action.tab;
      patchTabs();
      break;
    }

    case 'SELECT_PART': {
      selectedPartId = action.partId;
      patchEquipmentPanel();
      if (action.focus3D && sceneCtrl) {
        if (state.viewMode !== '3d') {
          state.viewMode = '3d';
          patchViewMode();
        }
        sceneCtrl.focusPart(action.partId);
      }
      break;
    }

    case 'TOGGLE_COMPLETE': {
      if (!state.completedLessons.includes(action.id)) {
        state.completedLessons.push(action.id);
      } else {
        state.completedLessons = state.completedLessons.filter((id) => id !== action.id);
      }
      safeStorageSet(
        'apisit:arduino-lab:progress',
        JSON.stringify({ completed: state.completedLessons, lastLesson: state.lessonId })
      );
      patchLessonPills();
      patchCompleteButton();
      break;
    }

    case 'CLEAR_SERIAL': {
      state.serialLogs = [];
      const serialBody = document.getElementById('serial-body');
      if (serialBody) serialBody.innerHTML = '';
      break;
    }
  }

  // Derive model output immediately (dt=0 when paused)
  stepSimulation(0);

  // Patch dynamic elements
  patchControlLabels();
  if (activeTab === 'code') patchCodeTab();
}

// Step Simulation
function stepSimulation(dtMs: number) {
  const lesson = getActiveLesson();
  const res = step(state.lessonId, simEngineState, state.inputs, state.params, dtMs);
  simEngineState = res.state;
  currentOutput = res.output;
  state.simulationTimeMs = simEngineState.timeMs;

  // Audio Dispatch
  if (state.isRunning) {
    if (currentOutput.hz && currentOutput.hz > 0) {
      playTone(currentOutput.hz, lesson.id === 'sound' ? state.params.durationMs : undefined);
    } else if (lesson.id === 'piano' && (state.inputs.key === null || state.inputs.key === undefined)) {
      stopTone();
    } else if (lesson.id === 'force' && !currentOutput.bell) {
      stopTone();
    }
  } else {
    stopTone();
  }

  // Update 3D Scene
  if (sceneCtrl) {
    sceneCtrl.update(lesson, currentOutput, state.isRunning);
  }

  // Update 2D SVG
  if (state.viewMode === 'svg') {
    const svgContainer = document.getElementById('schematic-viewport');
    if (svgContainer) {
      svgContainer.innerHTML = renderSchematicSVG(lesson, currentOutput, state.isRunning, state.lang);
    }
  }

  // Live Readout Update
  updateReadoutValues();
}

// Animation loop
function simLoop(now: number) {
  if (lastTimestamp === 0) lastTimestamp = now;
  const dt = Math.min(100, now - lastTimestamp);
  lastTimestamp = now;

  if (state.isRunning) {
    stepSimulation(dt);

    // Timed serial logging at 5Hz (every 200ms)
    if (now - lastSerialLogTime >= 200) {
      lastSerialLogTime = now;
      logSerialOutput();
    }
  }

  animFrameId = requestAnimationFrame(simLoop);
}

function logSerialOutput() {
  const lesson = getActiveLesson();
  let logText = '';
  if (currentOutput.distanceCm !== undefined) {
    logText = currentOutput.valid ? `${currentOutput.distanceCm.toFixed(1)} cm` : 'NO_ECHO';
  } else if (currentOutput.tempC !== undefined) {
    logText = `Temp: ${currentOutput.tempC.toFixed(1)} C (ADC: ${currentOutput.adc})`;
  } else if (currentOutput.relativePercent !== undefined) {
    logText = `Moisture: ${currentOutput.relativePercent}% [${(currentOutput.condition || '').toUpperCase()}]`;
  } else if (currentOutput.pwm !== undefined && currentOutput.adc !== undefined) {
    logText = `ADC: ${currentOutput.adc} -> PWM: ${currentOutput.pwm}`;
  } else if (lesson.id === 'light') {
    logText = `LDR: ${currentOutput.adc} (Threshold: ${state.params.threshold})`;
  } else if (lesson.id === 'force') {
    logText = `FSR: ${currentOutput.adc} -> Needle: ${currentOutput.angle} deg (Bell: ${currentOutput.bell ? 'ON' : 'OFF'})`;
  }

  if (logText) {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    state.serialLogs.push({ time: timeStr, text: logText });
    if (state.serialLogs.length > 200) state.serialLogs.shift();

    const serialBody = document.getElementById('serial-body');
    if (serialBody) {
      const line = document.createElement('div');
      line.className = 'font-mono text-xs py-0.5 text-emerald-400 border-b border-slate-800/40';
      line.textContent = `[${timeStr}] ${logText}`;
      serialBody.appendChild(line);
      serialBody.scrollTop = serialBody.scrollHeight;
    }
  }
}

// Live Readout Update
function updateReadoutValues() {
  const readoutContainer = document.getElementById('live-readout-panel');
  if (!readoutContainer) return;

  const lesson = getActiveLesson();
  const lang = state.lang;
  let html = '';

  switch (lesson.id) {
    case 'blink': {
      const period = (state.params.onMs ?? 500) + (state.params.offMs ?? 500);
      const freq = (1000 / period).toFixed(2);
      const duty = (((state.params.onMs ?? 500) / period) * 100).toFixed(1);
      html = `
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">${lang === 'th' ? 'คาบเวลา (Period)' : 'Period'}</span>
            <span class="font-bold text-brand-600 dark:text-brand-400 text-sm font-mono">${period} ms</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">${lang === 'th' ? 'ความถี่ (Frequency)' : 'Frequency'}</span>
            <span class="font-bold text-cyan-600 dark:text-cyan-400 text-sm font-mono">${freq} Hz</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
            <span class="text-slate-500 dark:text-slate-400 block">${lang === 'th' ? 'สัดส่วนเวลาติด (Duty)' : 'Duty Cycle'}</span>
            <span class="font-bold text-amber-600 dark:text-amber-400 text-sm font-mono">${duty}%</span>
          </div>
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $T = t_{\\text{on}} + t_{\\text{off}}$, $f = \\frac{1}{T}$
        </div>
      `;
      break;
    }

    case 'knob': {
      const adc = currentOutput.adc ?? 512;
      const pwm = currentOutput.pwm ?? 127;
      const volt = ((adc * 5.0) / 1023).toFixed(2);
      const duty = (((currentOutput.duty ?? 0.5) * 100)).toFixed(1);
      html = `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">ADC (A0)</span>
            <span class="font-bold text-brand-600 dark:text-brand-400 text-sm font-mono">${adc} / 1023</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Voltage</span>
            <span class="font-bold text-cyan-600 dark:text-cyan-400 text-sm font-mono">${volt} V</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">PWM (D9)</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400 text-sm font-mono">${pwm} / 255</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Duty Cycle</span>
            <span class="font-bold text-amber-600 dark:text-amber-400 text-sm font-mono">${duty}%</span>
          </div>
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $\\text{PWM} = \\text{trunc}\\left(\\frac{\\text{ADC} \\times 255}{1023}\\right)$, $V_{\\text{in}} = \\frac{\\text{ADC} \\times 5.0}{1023}$
        </div>
      `;
      break;
    }

    case 'sensor':
    case 'project': {
      const valid = currentOutput.valid;
      const cm = currentOutput.distanceCm;
      const echoUs = currentOutput.echoUs ?? 0;
      const light = currentOutput.light;
      html = `
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Echo Pulse</span>
            <span class="font-bold text-cyan-600 dark:text-cyan-400 text-sm font-mono">${
              valid ? echoUs + ' µs' : 'TIMEOUT'
            }</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Calculated Distance</span>
            <span class="font-bold ${
              valid ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
            } text-sm font-mono">
              ${valid && cm !== null ? cm.toFixed(1) + ' cm' : lang === 'th' ? 'ไม่มีสัญญาณสะท้อน' : 'NO ECHO'}
            </span>
          </div>
        </div>
        ${
          lesson.id === 'project'
            ? `
          <div class="mt-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs flex items-center justify-between">
            <span class="text-slate-500">สถานะไฟช่วยจอด:</span>
            <strong class="font-mono uppercase ${
              light === 'red'
                ? 'text-rose-500'
                : light === 'yellow'
                ? 'text-amber-500'
                : light === 'green'
                ? 'text-emerald-500'
                : 'text-slate-400'
            }">${light}</strong>
          </div>
        `
            : ''
        }
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $d = \\frac{t_{\\text{echo}} \\times 0.0343}{2}\\text{ cm}$
        </div>
      `;
      break;
    }

    case 'heat': {
      const c = currentOutput.tempC ?? 25;
      const v = currentOutput.voltage ?? 0.75;
      html = `
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Sensor Output ($V_{\\text{out}}$)</span>
            <span class="font-bold text-amber-600 dark:text-amber-400 text-sm font-mono">${v.toFixed(3)} V</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Reconstructed Temp</span>
            <span class="font-bold text-rose-600 dark:text-rose-400 text-sm font-mono">${c.toFixed(1)} °C</span>
          </div>
        </div>
        <div class="mt-2 text-xs text-slate-500 dark:text-slate-400 font-serif">
          สูตร: $V_{\\text{out}} = 0.5 + 0.01 \\times T$, $T = (V_{\\text{out}} - 0.5) \\times 100$
        </div>
      `;
      break;
    }

    case 'motor': {
      const duty = (((currentOutput.duty ?? 0.5) * 100)).toFixed(1);
      html = `
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">PWM Command (D5)</span>
            <span class="font-bold text-brand-600 dark:text-brand-400 text-sm font-mono">${currentOutput.pwm ?? 128} / 255</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Duty Cycle / Relative Speed</span>
            <span class="font-bold text-emerald-600 dark:text-emerald-400 text-sm font-mono">${duty}%</span>
          </div>
        </div>
      `;
      break;
    }

    case 'stepper': {
      html = `
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Commanded Steps</span>
            <span class="font-bold text-brand-600 dark:text-brand-400 text-sm font-mono">${currentOutput.steps ?? 0}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Shaft Angle</span>
            <span class="font-bold text-amber-500 text-sm font-mono">${(currentOutput.angle ?? 0).toFixed(1)}°</span>
          </div>
        </div>
      `;
      break;
    }

    case 'plant': {
      const rel = currentOutput.relativePercent ?? 50;
      const cond = (currentOutput.condition ?? 'ok').toUpperCase();
      html = `
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Relative Moisture</span>
            <span class="font-bold text-cyan-600 text-sm font-mono">${rel}%</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Condition Status</span>
            <span class="font-bold ${
              cond === 'WET' ? 'text-blue-500' : cond === 'DRY' ? 'text-amber-500' : 'text-emerald-500'
            } text-sm font-mono">${cond}</span>
          </div>
        </div>
      `;
      break;
    }

    case 'force': {
      const bell = currentOutput.bell === true;
      html = `
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Needle Angle (D9)</span>
            <span class="font-bold text-brand-600 text-sm font-mono">${currentOutput.angle ?? 0}°</span>
          </div>
          <div class="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span class="text-slate-500 dark:text-slate-400 block">Buzzer Alarm (D8)</span>
            <span class="font-bold ${bell ? 'text-amber-500' : 'text-slate-400'} text-sm font-mono">${
        bell ? 'ACTIVE (1568 Hz)' : 'OFF'
      }</span>
          </div>
        </div>
      `;
      break;
    }

    default: {
      const pinEntries = Object.entries(currentOutput.pins || {});
      html = `
        <div class="flex flex-wrap gap-2 text-xs">
          ${
            pinEntries
              .map(
                ([k, v]) => `
            <span class="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono">
              <strong>${k}:</strong> ${v}
            </span>
          `
              )
              .join('') || '<span class="text-slate-400">บอร์ดพร้อมทำงาน</span>'
          }
        </div>
      `;
    }
  }

  readoutContainer.innerHTML = html;

  // Render KaTeX dynamically
  if ((window as any).renderMathInElement) {
    (window as any).renderMathInElement(readoutContainer, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ],
      throwOnError: false,
    });
  }
}

// Targeted DOM Patching
function patchLessonPills() {
  document.querySelectorAll('.lesson-pill').forEach((btn) => {
    const id = btn.getAttribute('data-lesson-id');
    const active = id === state.lessonId;
    const done = state.completedLessons.includes(id || '');

    btn.className = `lesson-pill flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
      active
        ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30 ring-2 ring-brand-500/30'
        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
    }`;

    const numSpan = btn.querySelector('.badge-num');
    if (numSpan) {
      numSpan.className = `badge-num w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
        active
          ? 'bg-white/20 text-white'
          : done
          ? 'bg-emerald-500 text-white'
          : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
      }`;
      numSpan.textContent = done ? '✓' : btn.getAttribute('data-order') || '';
    }

    const titleSpan = btn.querySelector('.badge-title');
    if (titleSpan) {
      const lessonObj = lessons.find((l) => l.id === id);
      if (lessonObj) {
        titleSpan.textContent = lessonObj.title[state.lang] || lessonObj.title.th;
      }
    }
  });
}

function patchLessonHeader() {
  const lesson = getActiveLesson();
  const lang = state.lang;
  const titleEl = document.getElementById('lesson-header-title');
  if (titleEl) titleEl.textContent = lesson.title[lang];

  const objEl = document.getElementById('lesson-header-obj');
  if (objEl) objEl.textContent = lesson.objective[lang];

  const idBadge = document.getElementById('lesson-header-id');
  if (idBadge) idBadge.textContent = `id: ${lesson.id}`;

  const orderBadge = document.getElementById('lesson-header-order');
  if (orderBadge) orderBadge.textContent = `${lang === 'th' ? 'บทเรียนที่' : 'Lesson'} ${lesson.order} / 16`;
}

function patchControls() {
  const container = document.getElementById('controls-container');
  if (container) {
    container.innerHTML = renderControlsForLesson(getActiveLesson(), state.params, state.inputs, state.lang);
    bindControlsEventListeners();
  }
}

function patchEquipmentPanel() {
  const eqTitle = document.getElementById('equipment-inspector-title');
  if (eqTitle) {
    eqTitle.textContent =
      state.lang === 'th'
        ? '🔬 สำรวจชิ้นส่วนอุปกรณ์และโครงสร้างขาพิน (คลิกชิ้นส่วนหรือปุ่มด้านล่าง)'
        : '🔬 Interactive Equipment & Pinout Inspector (Click a part to inspect)';
  }

  const eqContainer = document.getElementById('equipment-inspector-body');
  if (!eqContainer) return;

  const lesson = getActiveLesson();
  eqContainer.innerHTML = renderEquipmentInspector(
    lesson.id,
    lesson.components,
    selectedPartId,
    state.lang
  );

  // Bind part selector pills
  eqContainer.querySelectorAll('.equipment-part-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const partId = btn.getAttribute('data-part-id');
      if (partId) {
        dispatch({ type: 'SELECT_PART', partId, focus3D: false });
      }
    });
  });

  // Bind Focus in 3D button
  const focusBtn = document.getElementById('btn-focus-3d-part');
  if (focusBtn) {
    focusBtn.addEventListener('click', () => {
      const partId = focusBtn.getAttribute('data-part-id') || selectedPartId;
      dispatch({ type: 'SELECT_PART', partId, focus3D: true });
    });
  }

  // Render KaTeX formulas inside Equipment Inspector if present
  if ((window as any).renderMathInElement) {
    (window as any).renderMathInElement(eqContainer, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
      ],
      throwOnError: false,
    });
  }
}

function patchControlLabels() {
  const onMsLabel = document.getElementById('label-onMs');
  if (onMsLabel) onMsLabel.textContent = `${state.params.onMs ?? 500} ms`;

  const offMsLabel = document.getElementById('label-offMs');
  if (offMsLabel) offMsLabel.textContent = `${state.params.offMs ?? 500} ms`;

  const debounceLabel = document.getElementById('label-debounce');
  if (debounceLabel) debounceLabel.textContent = `${state.params.debounceMs ?? 30} ms`;

  const adcLabel = document.getElementById('label-adc');
  if (adcLabel) adcLabel.textContent = `${state.inputs.adc ?? 512} / 1023`;

  const rLabel = document.getElementById('label-rgb-r');
  if (rLabel) rLabel.textContent = `${state.params.r ?? 128}`;

  const gLabel = document.getElementById('label-rgb-g');
  if (gLabel) gLabel.textContent = `${state.params.g ?? 64}`;

  const bLabel = document.getElementById('label-rgb-b');
  if (bLabel) bLabel.textContent = `${state.params.b ?? 0}`;

  const ldrLabel = document.getElementById('label-lightAdc');
  if (ldrLabel) ldrLabel.textContent = `${state.inputs.lightAdc ?? 600}`;

  const threshLabel = document.getElementById('label-threshold');
  if (threshLabel) threshLabel.textContent = `${state.params.threshold ?? 400}`;

  const distLabel = document.getElementById('label-distance');
  if (distLabel) {
    distLabel.textContent = state.inputs.distanceCm === null ? 'No Echo' : `${state.inputs.distanceCm} cm`;
  }

  const timeoutLabel = document.getElementById('label-timeout');
  if (timeoutLabel) timeoutLabel.textContent = `${state.params.timeoutUs ?? 25000} µs`;

  const hzLabel = document.getElementById('label-hz');
  if (hzLabel) hzLabel.textContent = `${state.params.hz ?? 440} Hz`;

  const durLabel = document.getElementById('label-duration');
  if (durLabel) durLabel.textContent = `${state.params.durationMs ?? 1000} ms`;

  const motorPwmLabel = document.getElementById('label-motor-pwm');
  if (motorPwmLabel) {
    const pwm = state.params.pwm ?? 128;
    const duty = ((pwm / 255) * 100).toFixed(1);
    motorPwmLabel.textContent = `${pwm} / 255 (${duty}%)`;
  }

  const tempLabel = document.getElementById('label-tempC');
  if (tempLabel) tempLabel.textContent = `${state.inputs.tempC ?? 25} °C`;

  const angleLabel = document.getElementById('label-angle');
  if (angleLabel) angleLabel.textContent = `${state.params.angle ?? 90}°`;

  const stepsLabel = document.getElementById('label-stepsPerRev');
  if (stepsLabel) stepsLabel.textContent = `${state.params.stepsPerRev ?? 2048}`;

  const rpmLabel = document.getElementById('label-speedRpm');
  if (rpmLabel) rpmLabel.textContent = `${state.params.speedRpm ?? 10} RPM`;

  const moistLabel = document.getElementById('label-moistureRaw');
  if (moistLabel) moistLabel.textContent = `${state.inputs.moistureRaw ?? 600} / 1023`;

  const dryLabel = document.getElementById('label-dryRaw');
  if (dryLabel) dryLabel.textContent = `${state.params.dryRaw ?? 800}`;

  const wetLabel = document.getElementById('label-wetRaw');
  if (wetLabel) wetLabel.textContent = `${state.params.wetRaw ?? 350}`;

  const fsrLabel = document.getElementById('label-fsrAdc');
  if (fsrLabel) fsrLabel.textContent = `${state.inputs.fsrAdc ?? 0} / 1023`;

  const forceThreshLabel = document.getElementById('label-force-thresh');
  if (forceThreshLabel) forceThreshLabel.textContent = `${state.params.threshold ?? 700}`;

  const projDistLabel = document.getElementById('label-proj-dist');
  if (projDistLabel) {
    projDistLabel.textContent = state.inputs.distanceCm === null ? 'No Echo' : `${state.inputs.distanceCm} cm`;
  }

  const nearLabel = document.getElementById('label-nearCm');
  if (nearLabel) nearLabel.textContent = `${state.params.nearCm ?? 15} cm`;

  const farLabel = document.getElementById('label-farCm');
  if (farLabel) farLabel.textContent = `${state.params.farCm ?? 40} cm`;

  const d2Readout = document.getElementById('readout-d2');
  if (d2Readout) {
    const isPressed = state.inputs.pressed === true;
    d2Readout.textContent = isPressed ? '0 (LOW/Pressed)' : '1 (HIGH/Pull-Up)';
    d2Readout.className = `font-mono ${isPressed ? 'text-amber-500' : 'text-slate-400'}`;
  }
}

function patchTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    const tab = btn.getAttribute('data-tab');
    const active = tab === activeTab;
    btn.className = `tab-btn px-3 py-1.5 rounded-lg transition-colors ${
      active
        ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-bold'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 font-medium'
    }`;
  });

  const tabContainer = document.getElementById('tab-content');
  if (tabContainer) {
    tabContainer.innerHTML = renderTabContent(getActiveLesson(), state.lang, activeTab);
    bindTabEventListeners();
  }
}

function patchCodeTab() {
  const codeBlock = document.querySelector('#tab-content pre code');
  if (codeBlock) {
    const generated = sketch(state.lessonId, state.params);
    codeBlock.textContent = generated;
  }
}

function renderTabContent(lesson: LessonData, lang: Locale, tab: string): string {
  switch (tab) {
    case 'overview':
      return `
        <div class="space-y-4 text-xs sm:text-sm">
          <div>
            <h4 class="font-bold text-slate-800 dark:text-white mb-1">${lang === 'th' ? 'ภาพรวม' : 'Overview'}</h4>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">${lesson.overview[lang]}</p>
          </div>
          <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
            <h4 class="font-bold text-amber-800 dark:text-amber-300 mb-1">🎯 ${lang === 'th' ? 'โจทย์ท้าทาย (Challenge)' : 'Challenge'}</h4>
            <p class="text-amber-900 dark:text-amber-200 text-xs">${lesson.challenge[lang]}</p>
          </div>
          <div class="p-3.5 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/60">
            <h4 class="font-bold text-brand-800 dark:text-brand-300 mb-1">💡 ${lang === 'th' ? 'ชวนคิด (Reflection)' : 'Reflection'}</h4>
            <p class="text-brand-900 dark:text-brand-200 text-xs">${lesson.reflection[lang]}</p>
          </div>
        </div>
      `;
    case 'pinout':
      return `
        <div class="overflow-x-auto text-xs">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th class="py-2 px-2.5">จากขา (From)</th>
                <th class="py-2 px-2.5">ไปยัง (To)</th>
                <th class="py-2 px-2.5">คำอธิบาย (Notes)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
              ${lesson.connections
                .map(
                  (c) => `
                <tr>
                  <td class="py-2 px-2.5 font-bold font-mono text-brand-600 dark:text-brand-400">${c.from}</td>
                  <td class="py-2 px-2.5 font-semibold text-slate-800 dark:text-white">${c.to}</td>
                  <td class="py-2 px-2.5 text-slate-500">${c.note ? c.note[lang] || c.note.th : '-'}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `;
    case 'code': {
      const generated = sketch(lesson.id, state.params);
      return `
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-slate-500 font-mono">Arduino Uno C++ (.ino)</span>
            <div class="flex items-center gap-2">
              <button id="btn-copy-code" class="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors">
                ${lang === 'th' ? 'คัดลอกโค้ด' : 'Copy Code'}
              </button>
              <button id="btn-download-ino" class="px-2.5 py-1 rounded bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white transition-colors">
                ${lang === 'th' ? 'ดาวน์โหลด .ino' : 'Download .ino'}
              </button>
            </div>
          </div>
          <pre class="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-72 leading-relaxed border border-slate-800"><code>${generated
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')}</code></pre>
        </div>
      `;
    }
    case 'serial':
      return `
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-slate-500 font-mono">Baud Rate: 9600</span>
            <button id="btn-clear-serial" class="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs text-slate-600 dark:text-slate-300">
              ${lang === 'th' ? 'ล้างข้อความ' : 'Clear'}
            </button>
          </div>
          <div id="serial-body" class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs h-56 overflow-y-auto space-y-1">
            ${
              state.serialLogs
                .map(
                  (log) => `
              <div class="font-mono text-xs py-0.5 text-emerald-400 border-b border-slate-800/40">
                [${log.time}] ${log.text}
              </div>
            `
                )
                .join('') ||
              `<div class="text-slate-600 text-xs italic">${
                lang === 'th' ? 'ยังไม่มีข้อมูล Serial ออกมา... กดปุ่มเริ่มจำลอง' : 'No serial output yet... Click Run'
              }</div>`
            }
          </div>
        </div>
      `;
    default:
      return '';
  }
}

function patchRunState() {
  const btnRun = document.getElementById('btn-toggle-run');
  const badgeRun = document.getElementById('floating-badge-run');
  const lang = state.lang;

  if (btnRun) {
    btnRun.className = `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all shadow-md ${
      state.isRunning
        ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20'
        : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-brand-500/25'
    }`;
    btnRun.innerHTML = state.isRunning
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> <span>${
          lang === 'th' ? 'พักแบบจำลอง' : 'Pause'
        }</span>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> <span>${
          lang === 'th' ? 'เริ่มจำลอง' : 'Run'
        }</span>`;
  }

  if (badgeRun) {
    badgeRun.className = `px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
      state.isRunning ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-500/80 text-white'
    }`;
    badgeRun.textContent = state.isRunning
      ? lang === 'th'
        ? '● กำลังจำลอง'
        : '● RUNNING'
      : lang === 'th'
      ? '○ พักการทดลอง'
      : '○ STOPPED';
  }
}

function patchViewMode() {
  const btn3D = document.getElementById('btn-view-3d');
  const btnSVG = document.getElementById('btn-view-svg');
  const threeContainer = document.getElementById('three-viewport');
  const svgContainer = document.getElementById('schematic-viewport');
  const badgeView = document.getElementById('floating-badge-view');
  const camPresetBar = document.getElementById('cam-preset-bar');

  if (btn3D && btnSVG) {
    btn3D.className = `px-2.5 py-1 rounded-md font-semibold transition-all ${
      state.viewMode === '3d'
        ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
    }`;
    btnSVG.className = `px-2.5 py-1 rounded-md font-semibold transition-all ${
      state.viewMode === 'svg'
        ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
    }`;
  }

  if (threeContainer && svgContainer) {
    if (state.viewMode === '3d') {
      threeContainer.classList.remove('hidden');
      svgContainer.classList.add('hidden');
      camPresetBar?.classList.remove('hidden');
    } else {
      threeContainer.classList.add('hidden');
      svgContainer.classList.remove('hidden');
      camPresetBar?.classList.add('hidden');
    }
  }

  if (badgeView) {
    badgeView.textContent = state.viewMode === '3d' ? '3D Lab Bench' : '2D Schematic';
  }
}

function patchLanguage() {
  const btnLang = document.getElementById('btn-lang-toggle');
  if (btnLang) {
    btnLang.textContent = state.lang === 'th' ? 'EN' : 'TH';
  }
  const title = document.getElementById('brand-title');
  if (title) {
    title.textContent = state.lang === 'th' ? 'ห้องทดลองอาร์ดูอิโน' : 'Arduino Lab';
  }
}

function patchTheme() {
  const btnTheme = document.getElementById('btn-theme-toggle');
  const isDark = state.theme === 'dark';
  if (btnTheme) {
    btnTheme.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${
          isDark
            ? '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'
            : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
        }
      </svg>
    `;
  }
}

function patchCompleteButton() {
  const btnComplete = document.getElementById('btn-mark-complete');
  if (btnComplete) {
    const isDone = state.completedLessons.includes(state.lessonId);
    const lang = state.lang;
    btnComplete.className = `inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
      isDone
        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white'
    }`;
    btnComplete.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${
        isDone
          ? lang === 'th'
            ? 'ทำเสร็จแล้ว'
            : 'Completed'
          : lang === 'th'
          ? 'บันทึกว่าทำเสร็จแล้ว'
          : 'Mark as Done'
      }</span>
    `;
  }
}

// Bind Control Event Listeners with Pointer Events & Keyboard Events
function bindControlsEventListeners() {
  document.querySelectorAll('.param-slider').forEach((slider) => {
    slider.addEventListener('input', (e: any) => {
      const paramKey = e.target.getAttribute('data-param');
      if (paramKey) {
        dispatch({ type: 'SET_PARAM', key: paramKey, value: parseFloat(e.target.value) });
      }
    });
  });

  document.querySelectorAll('.input-slider').forEach((slider) => {
    slider.addEventListener('input', (e: any) => {
      const inputKey = e.target.getAttribute('data-input');
      if (inputKey) {
        dispatch({ type: 'SET_INPUT', key: inputKey, value: parseFloat(e.target.value) });
      }
    });
  });

  const selectMode = document.getElementById('select-btn-mode') as HTMLSelectElement;
  if (selectMode) {
    selectMode.addEventListener('change', (e: any) => {
      dispatch({ type: 'SET_PARAM', key: 'mode', value: e.target.value });
    });
  }

  const btnPress = document.getElementById('btn-press-input');
  if (btnPress) {
    const handlePressDown = (e: PointerEvent) => {
      try {
        btnPress.setPointerCapture(e.pointerId);
      } catch {}
      dispatch({ type: 'SET_INPUT', key: 'pressed', value: true });
    };

    const handlePressUp = (e: PointerEvent) => {
      try {
        btnPress.releasePointerCapture(e.pointerId);
      } catch {}
      dispatch({ type: 'SET_INPUT', key: 'pressed', value: false });
    };

    btnPress.addEventListener('pointerdown', handlePressDown);
    btnPress.addEventListener('pointerup', handlePressUp);
    btnPress.addEventListener('pointercancel', handlePressUp);
    btnPress.addEventListener('lostpointercapture', handlePressUp);

    btnPress.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'Enter') && !e.repeat) {
        e.preventDefault();
        dispatch({ type: 'SET_INPUT', key: 'pressed', value: true });
      }
    });
    btnPress.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        dispatch({ type: 'SET_INPUT', key: 'pressed', value: false });
      }
    });
  }

  const chkNoEcho = document.getElementById('chk-no-echo') as HTMLInputElement;
  if (chkNoEcho) {
    chkNoEcho.addEventListener('change', (e: any) => {
      const isChecked = e.target.checked;
      dispatch({ type: 'SET_INPUT', key: 'distanceCm', value: isChecked ? null : cachedDistance });
      const sliderDist = document.querySelector('input[data-input="distanceCm"]') as HTMLInputElement;
      if (sliderDist) sliderDist.disabled = isChecked;
    });
  }

  document.querySelectorAll('.piano-key').forEach((keyBtn) => {
    const keyIdx = parseInt(keyBtn.getAttribute('data-key') || '0', 10);

    const onDown = (e: PointerEvent) => {
      try {
        (keyBtn as HTMLElement).setPointerCapture(e.pointerId);
      } catch {}
      dispatch({ type: 'SET_INPUT', key: 'key', value: keyIdx });
    };

    const onUp = (e: PointerEvent) => {
      try {
        (keyBtn as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      dispatch({ type: 'SET_INPUT', key: 'key', value: null });
    };

    keyBtn.addEventListener('pointerdown', onDown as any);
    keyBtn.addEventListener('pointerup', onUp as any);
    keyBtn.addEventListener('pointercancel', onUp as any);
    keyBtn.addEventListener('lostpointercapture', onUp as any);
  });

  document.querySelectorAll('.btn-octave').forEach((btn) => {
    btn.addEventListener('click', () => {
      const oct = parseInt(btn.getAttribute('data-octave') || '4', 10);
      dispatch({ type: 'SET_PARAM', key: 'octave', value: oct });
      patchControls();
    });
  });

  const btnDir = document.getElementById('btn-toggle-direction');
  if (btnDir) {
    btnDir.addEventListener('click', () => {
      const curDir = state.params.direction ?? 1;
      dispatch({ type: 'SET_PARAM', key: 'direction', value: curDir === 1 ? -1 : 1 });
      patchControls();
    });
  }
}

// Bind Tab Actions
function bindTabEventListeners() {
  const btnCopy = document.getElementById('btn-copy-code');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const code = sketch(state.lessonId, state.params);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(code)
          .then(() => {
            btnCopy.textContent = state.lang === 'th' ? 'คัดลอกสำเร็จ!' : 'Copied!';
            setTimeout(
              () => (btnCopy.textContent = state.lang === 'th' ? 'คัดลอกโค้ด' : 'Copy Code'),
              2000
            );
          })
          .catch(() => fallbackCopy(code));
      } else {
        fallbackCopy(code);
      }
    });
  }

  function fallbackCopy(text: string) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      if (btnCopy) {
        btnCopy.textContent = state.lang === 'th' ? 'คัดลอกสำเร็จ!' : 'Copied!';
        setTimeout(
          () => (btnCopy.textContent = state.lang === 'th' ? 'คัดลอกโค้ด' : 'Copy Code'),
          2000
        );
      }
    } catch {}
    document.body.removeChild(ta);
  }

  const btnDownload = document.getElementById('btn-download-ino');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const code = sketch(state.lessonId, state.params);
      const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.lessonId}_sketch.ino`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    });
  }

  const btnClear = document.getElementById('btn-clear-serial');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      dispatch({ type: 'CLEAR_SERIAL' });
    });
  }
}

// Render Initial Shell Once
function renderShell() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const lesson = getActiveLesson();
  const lang = state.lang;
  const isDark = state.theme === 'dark';

  appEl.innerHTML = `
    <!-- Topbar Navigation -->
    <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <!-- Brand & Title -->
        <div class="flex items-center gap-3 min-w-0">
          <a href="../../index.html" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="กลับหน้าหลัก">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span class="hidden sm:inline">กลับหน้าหลัก</span>
          </a>
          <div class="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
          <div class="min-w-0">
            <h1 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate flex items-center gap-2">
              <span id="brand-title">${lang === 'th' ? 'ห้องทดลองอาร์ดูอิโน' : 'Arduino Lab'}</span>
              <span class="text-xs px-2 py-0.5 rounded-full font-normal bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800/60 hidden md:inline">
                ดร.อภิสิทธิ์ ธงไชย
              </span>
            </h1>
          </div>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center gap-2">
          <!-- View Mode Toggle -->
          <div class="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            <button id="btn-view-3d" class="px-2.5 py-1 rounded-md font-semibold transition-all ${
              state.viewMode === '3d'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }">
              3D View
            </button>
            <button id="btn-view-svg" class="px-2.5 py-1 rounded-md font-semibold transition-all ${
              state.viewMode === 'svg'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }">
              2D Circuit
            </button>
          </div>

          <!-- Mute / Audio Toggle -->
          <button id="btn-mute-toggle" class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="${
            isAudioMuted() ? 'เปิดเสียง' : 'ปิดเสียง'
          }">
            <svg id="icon-audio" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${
                isAudioMuted()
                  ? '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>'
                  : '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>'
              }
            </svg>
          </button>

          <!-- Theme Toggle -->
          <button id="btn-theme-toggle" class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="สลับธีม สว่าง/มืด">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${
                isDark
                  ? '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'
                  : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
              }
            </svg>
          </button>

          <!-- Language Toggle -->
          <button id="btn-lang-toggle" class="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Switch Language">
            ${lang === 'th' ? 'EN' : 'TH'}
          </button>

          <!-- Fullscreen Toggle Button -->
          <button id="btn-fullscreen-toggle" class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="เต็มหน้าจอ">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Lesson Navigation Bar -->
    <nav class="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-x-auto py-2.5 px-4 sm:px-6">
      <div id="lesson-nav-bar" class="max-w-7xl mx-auto flex items-center gap-2">
        ${lessons
          .map((l) => {
            const active = l.id === state.lessonId;
            const done = state.completedLessons.includes(l.id);
            return `
            <button class="lesson-pill flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              active
                ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/30 ring-2 ring-brand-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }" data-lesson-id="${l.id}" data-order="${l.order}">
              <span class="badge-num w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                active
                  ? 'bg-white/20 text-white'
                  : done
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }">
                ${done ? '✓' : l.order}
              </span>
              <span class="badge-title">${l.title[lang]}</span>
            </button>
          `;
          })
          .join('')}
      </div>
    </nav>

    <!-- Main Workspace Grid (Single Window Scroll - No Nested Scrollbars) -->
    <main class="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Right Column on Desktop, Top on Mobile: 3D/SVG Viewport & Live Readout (order-1 lg:order-2) -->
      <section class="lg:col-span-7 flex flex-col gap-4 order-1 lg:order-2">
        
        <!-- Viewport Container (Three.js canvas is mounted once here) -->
        <div class="relative w-full h-[380px] sm:h-[460px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm">
          
          <div id="three-viewport" class="w-full h-full ${state.viewMode === '3d' ? 'block' : 'hidden'}"></div>
          <div id="schematic-viewport" class="w-full h-full p-2 overflow-auto ${
            state.viewMode === 'svg' ? 'block' : 'hidden'
          }"></div>

          <!-- Floating Badges -->
          <div class="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-none">
            <span id="floating-badge-run" class="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
              state.isRunning ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-500/80 text-white'
            }">
              ${
                state.isRunning
                  ? lang === 'th'
                    ? '● กำลังจำลอง'
                    : '● RUNNING'
                  : lang === 'th'
                  ? '○ พักการทดลอง'
                  : '○ STOPPED'
              }
            </span>
            <span id="floating-badge-view" class="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/60 text-white backdrop-blur-sm">
              ${state.viewMode === '3d' ? '3D Lab Bench' : '2D Schematic'}
            </span>
          </div>

          <!-- Camera View Presets & Reset Bar -->
          <div id="cam-preset-bar" class="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 z-10 pointer-events-auto">
            <div class="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900/75 backdrop-blur-md border border-slate-700/80 text-[11px] text-slate-200">
              <button type="button" class="btn-cam-preset px-2.5 py-1 rounded-lg hover:bg-brand-600 hover:text-white font-semibold transition-colors" data-preset="iso">
                3D มุมปกติ
              </button>
              <button type="button" class="btn-cam-preset px-2.5 py-1 rounded-lg hover:bg-brand-600 hover:text-white font-semibold transition-colors" data-preset="top">
                มุมบน (Top)
              </button>
              <button type="button" class="btn-cam-preset px-2.5 py-1 rounded-lg hover:bg-brand-600 hover:text-white font-semibold transition-colors" data-preset="board">
                ซูมบอร์ด Uno
              </button>
              <button type="button" class="btn-cam-preset px-2.5 py-1 rounded-lg hover:bg-brand-600 hover:text-white font-semibold transition-colors" data-preset="closeup">
                ซูมวงจรทดลอง
              </button>
            </div>

            <button id="btn-reset-cam" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center gap-1.5" title="รีเซ็ตมุมกล้อง">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
              <span>รีเซ็ตมุมมอง</span>
            </button>
          </div>
        </div>

        <!-- Simulation Run / Stop / Reset Bar -->
        <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div class="flex items-center gap-2">
            <button id="btn-toggle-run" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all shadow-md ${
              state.isRunning
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20'
                : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-brand-500/25'
            }">
              ${
                state.isRunning
                  ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg> <span>${
                      lang === 'th' ? 'พักแบบจำลอง' : 'Pause'
                    }</span>`
                  : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> <span>${
                      lang === 'th' ? 'เริ่มจำลอง' : 'Run'
                    }</span>`
              }
            </button>

            <button id="btn-reset-exp" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="เริ่มการทดลองใหม่">
              ${lang === 'th' ? 'เริ่มใหม่' : 'Reset'}
            </button>
          </div>

          <button id="btn-mark-complete" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
            state.completedLessons.includes(state.lessonId)
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white'
          }">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span>${
              state.completedLessons.includes(state.lessonId)
                ? lang === 'th'
                  ? 'ทำเสร็จแล้ว'
                  : 'Completed'
                : lang === 'th'
                ? 'บันทึกว่าทำเสร็จแล้ว'
                : 'Mark as Done'
            }</span>
          </button>
        </div>

        <!-- Live Math & Status Readout Panel -->
        <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <h3 class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            ${lang === 'th' ? 'การคำนวณและค่าทางไฟฟ้า (Live Formulas)' : 'Live Calculations & Physics'}
          </h3>
          <div id="live-readout-panel"></div>
        </div>

        <!-- Interactive Equipment & Parts Inspector -->
        <div id="equipment-inspector-panel" class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <h3 id="equipment-inspector-title" class="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-3">
            ${
              lang === 'th'
                ? '🔬 สำรวจชิ้นส่วนอุปกรณ์และโครงสร้างขาพิน (คลิกชิ้นส่วนหรือปุ่มด้านล่าง)'
                : '🔬 Interactive Equipment & Pinout Inspector (Click a part to inspect)'
            }
          </h3>
          <div id="equipment-inspector-body"></div>
        </div>

      </section>

      <!-- Left Column on Desktop, Bottom on Mobile: Controls, Tabs & Learning Guide (order-2 lg:order-1) -->
      <section class="lg:col-span-5 flex flex-col gap-4 order-2 lg:order-1">
        
        <!-- Lesson Header Card -->
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <div class="flex items-center gap-2 mb-1.5">
            <span id="lesson-header-order" class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
              ${lang === 'th' ? 'บทเรียนที่' : 'Lesson'} ${lesson.order} / 16
            </span>
            <span id="lesson-header-id" class="text-xs text-slate-400 font-mono">id: ${lesson.id}</span>
          </div>
          <h2 id="lesson-header-title" class="text-lg font-bold text-slate-900 dark:text-white mb-2">${lesson.title[lang]}</h2>
          <p id="lesson-header-obj" class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${lesson.objective[lang]}</p>
        </div>

        <!-- Interactive Control Panel (Sliders & Buttons) -->
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <h3 class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            ${lang === 'th' ? 'ปรับแต่งตัวแปรและการทดลอง' : 'Experiment Controls'}
          </h3>
          
          <div id="controls-container" class="space-y-4">
            ${renderControlsForLesson(lesson, state.params, state.inputs, lang)}
          </div>
        </div>

        <!-- Information & Code Walkthrough Tabs -->
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <!-- Tab Navigation -->
          <div id="tab-nav" class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 text-xs font-semibold overflow-x-auto">
            <button class="tab-btn px-3 py-1.5 rounded-lg transition-colors bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-bold" data-tab="overview">
              ${lang === 'th' ? 'สาระสำคัญ & ท้าทาย' : 'Overview & Task'}
            </button>
            <button class="tab-btn px-3 py-1.5 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 font-medium" data-tab="pinout">
              ${lang === 'th' ? 'จุดต่อขาพิน' : 'Connections'}
            </button>
            <button class="tab-btn px-3 py-1.5 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 font-medium" data-tab="code">
              ${lang === 'th' ? 'โค้ด Arduino (.ino)' : 'Code (.ino)'}
            </button>
            <button class="tab-btn px-3 py-1.5 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 font-medium" data-tab="serial">
              ${lang === 'th' ? 'Serial Monitor' : 'Serial Monitor'}
            </button>
          </div>

          <!-- Tab Contents -->
          <div id="tab-content">
            ${renderTabContent(lesson, lang, activeTab)}
          </div>
        </div>

      </section>

    </main>

    <!-- Official Author Profile Card & Footer -->
    <footer class="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 py-10 px-4 sm:px-6">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            AT
          </div>
          <div>
            <div class="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>ดร.อภิสิทธิ์ ธงไชย</span>
              <span class="text-brand-600 dark:text-brand-400 text-xs px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800">
                นักวิจัยและนักการศึกษา
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ph.D. วิทยาศาสตร์และเทคโนโลยีศึกษา · Independent Educator & Researcher
            </p>
          </div>
        </div>

        <div class="text-xs text-slate-500 dark:text-slate-400 text-center md:text-right">
          <p>© 2026 ดร.อภิสิทธิ์ ธงไชย (Dr. Apisit Tongchai) · All rights reserved.</p>
          <p class="mt-1">แบบจำลองเพื่อการเรียนรู้ทางฟิสิกส์และอิเล็กทรอนิกส์เชิงโต้ตอบ (Guided Educational Simulation)</p>
        </div>

      </div>
    </footer>
  `;

  // Bind Header & Shell Actions
  bindShellListeners();

  // Initialize 3D Scene once with interactive part selection callback
  const threeContainer = document.getElementById('three-viewport');
  if (threeContainer && !sceneCtrl) {
    sceneCtrl = init3DScene(threeContainer, (partId) => {
      dispatch({ type: 'SELECT_PART', partId, focus3D: true });
    });
    if (!sceneCtrl) {
      state.viewMode = 'svg';
      patchViewMode();
    }
  }

  // Initial step & bindings
  patchEquipmentPanel();
  bindControlsEventListeners();
  bindTabEventListeners();
  stepSimulation(0);
}

function bindShellListeners() {
  // Lesson pills delegation
  document.getElementById('lesson-nav-bar')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.lesson-pill');
    if (btn) {
      const id = btn.getAttribute('data-lesson-id') as LessonId;
      if (id) dispatch({ type: 'SET_LESSON', id });
    }
  });

  // Run / Stop button
  document.getElementById('btn-toggle-run')?.addEventListener('click', () => {
    dispatch({ type: 'TOGGLE_RUN' });
  });

  // Reset button
  document.getElementById('btn-reset-exp')?.addEventListener('click', () => {
    dispatch({ type: 'RESET' });
  });

  // Complete button
  document.getElementById('btn-mark-complete')?.addEventListener('click', () => {
    dispatch({ type: 'TOGGLE_COMPLETE', id: state.lessonId });
  });

  // View switch buttons
  document.getElementById('btn-view-3d')?.addEventListener('click', () => {
    dispatch({ type: 'SET_VIEW', mode: '3d' });
  });
  document.getElementById('btn-view-svg')?.addEventListener('click', () => {
    dispatch({ type: 'SET_VIEW', mode: 'svg' });
  });

  // Camera Preset buttons
  document.querySelectorAll('.btn-cam-preset').forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset') as CameraPreset;
      if (preset && sceneCtrl) {
        sceneCtrl.setCameraPreset(preset);
      }
    });
  });

  // Mute button
  document.getElementById('btn-mute-toggle')?.addEventListener('click', () => {
    setMuted(!isAudioMuted());
    const icon = document.getElementById('icon-audio');
    if (icon) {
      icon.innerHTML = isAudioMuted()
        ? '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>'
        : '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
    }
  });

  // Theme button
  document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    dispatch({ type: 'SET_THEME', theme: nextTheme });
  });

  // Language button
  document.getElementById('btn-lang-toggle')?.addEventListener('click', () => {
    const nextLang: Locale = state.lang === 'th' ? 'en' : 'th';
    dispatch({ type: 'SET_LANG', lang: nextLang });
  });

  // Fullscreen toggle
  document.getElementById('btn-fullscreen-toggle')?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // Reset Camera button
  document.getElementById('btn-reset-cam')?.addEventListener('click', () => {
    sceneCtrl?.resetCamera();
  });

  // Tab buttons delegation
  document.getElementById('tab-nav')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.tab-btn');
    if (btn) {
      const tab = btn.getAttribute('data-tab');
      if (tab) dispatch({ type: 'SET_TAB', tab });
    }
  });
}

// Window popstate / hashchange listeners
window.addEventListener('popstate', () => {
  const { lang, lessonId } = parseURL();
  if (state.lang !== lang) {
    dispatch({ type: 'SET_LANG', lang });
  }
  if (state.lessonId !== lessonId) {
    dispatch({ type: 'SET_LESSON', id: lessonId, pushUrl: false });
  }
});

// App Entry Point
function init() {
  try {
    const savedProgress = safeStorageGet('apisit:arduino-lab:progress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      if (Array.isArray(parsed.completed)) {
        state.completedLessons = parsed.completed;
      }
    }
  } catch {}

  const { lang, lessonId } = parseURL();
  state.lang = lang;
  state.lessonId = lessonId;
  const lesson = getActiveLesson();
  state.params = { ...lesson.defaultParams };
  state.inputs = { ...lesson.defaultInputs };
  const parts = getEquipmentForLesson(lesson.id, lesson.components);
  selectedPartId = parts.length > 1 && lesson.id !== 'board' ? parts[parts.length - 1].id : 'uno';

  updateURL(false);
  renderShell();
  animFrameId = requestAnimationFrame(simLoop);
}

init();
