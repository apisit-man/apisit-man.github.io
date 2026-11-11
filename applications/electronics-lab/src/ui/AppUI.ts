import { store, AppState, LessonProgress } from '../state/store';
import { translations, TranslationDictionary } from '../i18n';
import { LESSONS, DEFERRED_TOPICS, Lesson } from '../content/lessons';
import { formatCurrent, formatVoltage, formatResistance, LedCircuitResult } from '../domain/ledModel';
import {
  LessonId,
  MaterialId,
  LedColorId,
  BreadboardPresetId,
  MATERIAL_PROFILES,
  LED_COLOR_PROFILES,
  getResistorColorBands,
  calculateOhmsLaw
} from '../domain/circuitModels';
import { SchematicView } from '../views/schematic/SchematicView';
import type { BenchView } from '../views/scene/BenchView';

export class AppUI {
  private root: HTMLElement;
  private schematicView: SchematicView | null = null;
  private benchView: BenchView | null = null;
  private activeTab: 'overview' | 'inquiry' | 'maths' | 'teacher' = 'inquiry';

  constructor(root: HTMLElement) {
    this.root = root;
    store.subscribe((state) => this.render(state));
  }

  public init() {
    this.render(store.getState());
  }

  private getStatusInfo(
    state: AppState,
    t: TranslationDictionary,
    result: LedCircuitResult
  ): { statusClass: string; statusText: string } {
    if (!result.isValid) {
      return { statusClass: 'status-danger', statusText: t.statusInvalid };
    }

    if (state.currentLessonId === 'open-closed-circuit' && !state.wireConnected) {
      return { statusClass: 'status-warn', statusText: t.statusWireBroken };
    }

    if (!state.power) {
      return { statusClass: 'status-off', statusText: t.statusPowerOff };
    }

    if (state.currentLessonId === 'conductors-insulators') {
      const mat = MATERIAL_PROFILES[state.materialId];
      if (mat.category === 'insulator') {
        return { statusClass: 'status-warn', statusText: t.statusInsulatorBlocked };
      }
      return { statusClass: 'status-success', statusText: t.statusConducting };
    }

    if (state.currentLessonId === 'breadboard-connectivity') {
      if (state.breadboardPreset === 'shorted-same-strip') {
        return { statusClass: 'status-danger', statusText: t.statusShortedStrip };
      }
      if (state.breadboardPreset === 'open-center-gap') {
        return { statusClass: 'status-warn', statusText: t.statusOpenTrench };
      }
      if (state.breadboardPreset === 'misaligned-row') {
        return { statusClass: 'status-warn', statusText: t.statusMisalignedRow };
      }
      return { statusClass: 'status-success', statusText: t.statusConducting };
    }

    if (result.isOvercurrent) {
      return { statusClass: 'status-danger', statusText: t.statusOvercurrent };
    }
    if (result.isReverseBiased) {
      return { statusClass: 'status-warn', statusText: t.statusReverseBiased };
    }
    if (result.isBelowThreshold) {
      return { statusClass: 'status-warn', statusText: t.statusBelowThreshold };
    }
    if (result.actualCurrent > 0) {
      return { statusClass: 'status-success', statusText: t.statusConducting };
    }

    return { statusClass: 'status-off', statusText: t.statusPowerOff };
  }

  public render(state: AppState) {
    const t = translations[state.locale];
    const lesson = store.getCurrentLesson();
    const result = store.getSimulationResult();
    const progress = state.progressMap[lesson.id] || { level: 'visited' };

    if (!state.teacherMode && this.activeTab === 'teacher') {
      this.activeTab = 'inquiry';
    }

    const { statusClass, statusText } = this.getStatusInfo(state, t, result);
    const isFullscreen = typeof document !== 'undefined' && !!document.fullscreenElement;
    const completedCount = LESSONS.filter(l => state.progressMap[l.id]?.level === 'completed').length;

    this.root.innerHTML = `
      <div class="app-layout ${state.teacherMode ? 'teacher-mode-active' : ''}">
        <!-- TOP NAVIGATION BAR -->
        <header class="app-header">
          <div class="header-left">
            <a href="../../index.html" class="btn-nav home-link" title="${t.homeLink}" aria-label="${t.homeLink}">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span class="home-link-label">${t.homeLink}</span>
            </a>

            <div class="brand">
              <span class="brand-icon" aria-hidden="true">⚡</span>
              <div>
                <h1 class="brand-title">${t.siteTitle} <span class="badge badge-neutral" style="font-size: 0.75rem; margin-left: 6px;">${completedCount}/${LESSONS.length}</span></h1>
                <div class="brand-meta">
                  <span class="brand-subtitle">${lesson.titles[state.locale]}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="header-actions">
            <!-- Language toggle -->
            <div class="lang-switch" role="group" aria-label="Language">
              <button class="btn-toggle ${state.locale === 'th' ? 'active' : ''}" id="btn-lang-th" type="button">ไทย</button>
              <button class="btn-toggle ${state.locale === 'en' ? 'active' : ''}" id="btn-lang-en" type="button">EN</button>
            </div>

            <!-- View mode toggle (2D / 3D) -->
            <div class="view-switch" role="group" aria-label="${t.view2D} / ${t.view3D}">
              <button class="btn-toggle ${state.viewMode === 'schematic' ? 'active' : ''}" id="btn-view-2d" type="button">2D</button>
              <button class="btn-toggle ${state.viewMode === 'bench' ? 'active' : ''}" id="btn-view-3d" type="button">3D</button>
            </div>

            <!-- Teacher mode toggle -->
            <button class="btn-nav ${state.teacherMode ? 'btn-teacher-active' : ''}" id="btn-teacher-toggle" type="button">
              ${state.teacherMode ? t.exitTeacherMode : t.teacherMode}
            </button>

            <!-- Theme toggle (Dark / Light) -->
            <button class="btn-nav btn-icon-nav" id="btn-theme-toggle" type="button" title="${t.themeToggle}" aria-label="${t.themeToggle}">
              ${state.theme === 'dark' ? `
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>
                </svg>
              ` : `
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              `}
            </button>

            <!-- Fullscreen toggle -->
            <button class="btn-nav btn-fullscreen" id="btn-fullscreen-toggle" type="button" title="${isFullscreen ? t.exitFullscreen : t.fullscreen}" aria-label="${isFullscreen ? t.exitFullscreen : t.fullscreen}">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                ${isFullscreen ? `
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9L4 4m0 0v4m0-4h4m7 5l5-5m0 0v4m0-4h-4M9 15l-5 5m0 0v-4m0 4h4m7-5l5 5m0 0v-4m0 4h-4"></path>
                ` : `
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4h4m8 0h4v4m0 8v4h-4M8 20H4v-4"></path>
                `}
              </svg>
              <span class="fullscreen-label">${isFullscreen ? t.exitFullscreen : t.fullscreen}</span>
            </button>
          </div>
        </header>

        <!-- P1 6-LESSON PILOT NAVIGATION BAR -->
        <nav class="lesson-strip" aria-label="${t.navLessons}">
          ${LESSONS.map(l => {
            const p = state.progressMap[l.id];
            const isDone = p?.level === 'completed';
            const isActive = !state.routeNotFound && l.id === state.currentLessonId;
            return `
              <button type="button" class="lesson-pill ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}" data-lesson-id="${l.id}">
                <span>${isDone ? '✓ ' : ''}${l.titles[state.locale]}</span>
              </button>
            `;
          }).join('')}
        </nav>

        ${state.routeNotFound ? this.renderUnknownRoute(state, t) : `
          <!-- MAIN LAB CONTENT -->
          <main class="lab-main">
            <!-- LEFT COLUMN: CIRCUIT CANVAS & HARDWARE CONTROLS -->
            <section class="experiment-column">
              <div class="experiment-card">
                <div class="viewport-header">
                  <span class="viewport-title">${state.viewMode === 'schematic' ? t.view2D : t.view3D}</span>
                  <div class="progress-badges">
                    <span class="badge ${progress.level === 'completed' ? 'badge-success' : 'badge-neutral'}">
                      ${progress.level === 'completed' ? '✓ ' + t.progressCompleted : (progress.level === 'experimented' ? '⚙ ' + t.progressExperimented : '👁 ' + t.progressVisited)}
                    </span>
                    ${progress.isCorrect ? `<span class="badge badge-success">★ ${t.progressCorrect}</span>` : ''}
                  </div>
                </div>

                <!-- Viewport Container (Schematic or 3D) -->
                <div id="viewport-canvas-mount" class="viewport-mount"></div>

                <!-- Status Banner -->
                <div class="status-banner ${statusClass}" role="status" aria-live="polite">
                  <span class="status-icon" aria-hidden="true">${statusClass === 'status-success' ? '●' : '▲'}</span>
                  <span>${statusText}</span>
                </div>

                <!-- Quick Hardware Controls -->
                ${this.renderHardwareControls(state, t)}
              </div>
            </section>

            <!-- RIGHT COLUMN: GUIDED INQUIRY TABS -->
            <section class="inquiry-column">
              <div class="inquiry-card">
                <nav class="inquiry-tabs" role="tablist">
                  <button class="tab-btn ${this.activeTab === 'inquiry' ? 'active' : ''}" id="tab-btn-inquiry" role="tab" type="button" aria-selected="${this.activeTab === 'inquiry'}">
                    🧪 ${t.tabExperiment}
                  </button>
                  <button class="tab-btn ${this.activeTab === 'overview' ? 'active' : ''}" id="tab-btn-overview" role="tab" type="button" aria-selected="${this.activeTab === 'overview'}">
                    📖 ${t.tabOverview}
                  </button>
                  <button class="tab-btn ${this.activeTab === 'maths' ? 'active' : ''}" id="tab-btn-maths" role="tab" type="button" aria-selected="${this.activeTab === 'maths'}">
                    🔢 ${t.tabMaths}
                  </button>
                  ${state.teacherMode ? `
                    <button class="tab-btn tab-teacher ${this.activeTab === 'teacher' ? 'active' : ''}" id="tab-btn-teacher" role="tab" type="button" aria-selected="${this.activeTab === 'teacher'}">
                      🎓 ${t.tabTeacher}
                    </button>
                  ` : ''}
                </nav>

                <div class="tab-body">
                  ${this.renderTabContent(state, t, lesson, result, progress)}
                </div>
              </div>
            </section>
          </main>
        `}

        <!-- OFFICIAL PERSONAL WEBSITE FOOTER -->
        <footer class="app-footer">
          <div class="footer-container">
            <div class="footer-social">
              <a href="https://www.linkedin.com/in/apisit-tongchai-3043092a3/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon-link">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.facebook.com/tongchai.apisit/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="social-icon-link">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.youtube.com/@DrApisitTongchai" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="social-icon-link">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://github.com/apisit-man" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="social-icon-link">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
              </a>
            </div>
            <p class="footer-credit">
              ${t.footerDevelopedBy} <a href="../../about.html" class="footer-author-link">${t.footerAuthorName}</a> · ${t.footerRole}
            </p>
            <p class="footer-copyright">
              ${t.footerCopyright} <a href="https://apisit-man.github.io" class="footer-site-link">apisit-man.github.io</a>
            </p>
          </div>
        </footer>
      </div>
    `;

    if (!state.routeNotFound) {
      this.mountViewport(state);
    }

    this.bindEvents(state, t);
  }

  private renderHardwareControls(state: AppState, t: TranslationDictionary): string {
    const bands = getResistorColorBands(state.resistance);
    const bandBadges = bands.map(b => `
      <span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 4px; background: #0f172a; border: 1px solid #334155; font-size: 0.78rem;">
        <span style="width: 10px; height: 10px; border-radius: 50%; background: ${b.hex}; display: inline-block; border: 1px solid rgba(255,255,255,0.3);"></span>
        ${state.locale === 'th' ? b.nameTh : b.nameEn}
      </span>
    `).join('');

    let secondaryControl = `
      <button id="ctrl-polarity-btn" type="button" class="ctrl-btn ctrl-polarity">
        🔄 ${state.polarity === 'forward' ? t.polarityForward : t.polarityReverse}
      </button>
    `;

    if (state.currentLessonId === 'open-closed-circuit') {
      secondaryControl = `
        <button id="ctrl-wire-btn" type="button" class="ctrl-btn ${state.wireConnected ? 'ctrl-polarity' : 'ctrl-power-off'}">
          🔌 ${state.wireConnected ? t.wireConnected : t.wireDisconnected}
        </button>
      `;
    } else if (state.currentLessonId === 'ohms-law-resistor' || state.currentLessonId === 'conductors-insulators' || state.currentLessonId === 'breadboard-connectivity') {
      secondaryControl = '';
    }

    return `
      <div class="hardware-controls">
        <div class="control-row" style="${secondaryControl ? '' : 'grid-template-columns: 1fr;'}">
          <button id="ctrl-power-btn" type="button" class="ctrl-btn ${state.power ? 'ctrl-power-on' : 'ctrl-power-off'}" aria-pressed="${state.power}">
            ${state.power ? '🟢 ' + t.powerOn : '⚪ ' + t.powerOff}
          </button>
          ${secondaryControl}
        </div>

        <!-- Lesson 2: Material Selector -->
        ${state.currentLessonId === 'conductors-insulators' ? `
          <div class="material-selector">
            <label style="font-size: 0.88rem; color: var(--text-muted); display: block; margin-bottom: 6px;">${t.materialLabel}</label>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${(Object.keys(MATERIAL_PROFILES) as MaterialId[]).map(mId => {
                const prof = MATERIAL_PROFILES[mId];
                const active = state.materialId === mId;
                return `
                  <button type="button" class="btn-toggle ${active ? 'active' : ''}" data-material-id="${mId}" style="border: 1px solid var(--border-color);">
                    ${prof.names[state.locale]}
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Lesson 5: LED Color Selector -->
        ${state.currentLessonId === 'current-limiting-resistor' ? `
          <div class="led-color-selector">
            <label style="font-size: 0.88rem; color: var(--text-muted); display: block; margin-bottom: 6px;">${t.ledColorLabel}</label>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${(Object.keys(LED_COLOR_PROFILES) as LedColorId[]).map(cId => {
                const prof = LED_COLOR_PROFILES[cId];
                const active = state.ledColor === cId;
                return `
                  <button type="button" class="btn-toggle ${active ? 'active' : ''}" data-led-color="${cId}" style="border: 1px solid var(--border-color);">
                    ${prof.names[state.locale]}
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Lesson 6: Breadboard Wiring Preset Selector -->
        ${state.currentLessonId === 'breadboard-connectivity' ? `
          <div class="breadboard-preset-selector">
            <label style="font-size: 0.88rem; color: var(--text-muted); display: block; margin-bottom: 6px;">${t.breadboardPresetLabel}</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
              <button type="button" class="btn-toggle ${state.breadboardPreset === 'valid-series' ? 'active' : ''}" data-bb-preset="valid-series" style="border: 1px solid var(--border-color); text-align: left;">
                ${t.presetValidSeries}
              </button>
              <button type="button" class="btn-toggle ${state.breadboardPreset === 'shorted-same-strip' ? 'active' : ''}" data-bb-preset="shorted-same-strip" style="border: 1px solid var(--border-color); text-align: left;">
                ${t.presetShortedStrip}
              </button>
              <button type="button" class="btn-toggle ${state.breadboardPreset === 'open-center-gap' ? 'active' : ''}" data-bb-preset="open-center-gap" style="border: 1px solid var(--border-color); text-align: left;">
                ${t.presetOpenGap}
              </button>
              <button type="button" class="btn-toggle ${state.breadboardPreset === 'misaligned-row' ? 'active' : ''}" data-bb-preset="misaligned-row" style="border: 1px solid var(--border-color); text-align: left;">
                ${t.presetMisaligned}
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Parameter Sliders -->
        <div class="slider-group">
          <div class="slider-item">
            <label for="voltage-range">
              <span>${t.supplyVoltage}:</span>
              <strong id="voltage-readout">${formatVoltage(state.voltage)}</strong>
            </label>
            <input type="range" id="voltage-range" min="1.5" max="6.0" step="1.5" value="${state.voltage}">
          </div>

          <div class="slider-item">
            <label for="resistor-range">
              <span>${t.resistor}:</span>
              <strong id="resistor-readout">${formatResistance(state.resistance)}</strong>
            </label>
            <input type="range" id="resistor-range" min="100" max="1000" step="100" value="${state.resistance}">
          </div>
        </div>

        <!-- Live EIA 4-Band Color Code Strip -->
        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          <span style="font-size: 0.8rem; color: var(--text-muted);">${t.colorBandsLabel}</span>
          ${bandBadges}
        </div>

        <!-- Action Footer -->
        <div class="control-actions">
          <button id="btn-reset-exp" type="button" class="btn-subtle">↺ ${t.resetExperiment}</button>
          <button id="btn-reset-all" type="button" class="btn-subtle btn-danger">🗑 ${t.resetAllProgress}</button>
        </div>
      </div>
    `;
  }

  private renderUnknownRoute(state: AppState, t: TranslationDictionary): string {
    return `
      <main class="lab-main" style="grid-template-columns: 1fr;">
        <section class="experiment-card">
          <h2>⚠️ ${t.unknownRouteTitle}</h2>
          <p class="muted">${t.unknownRouteDesc}</p>

          <h3 style="margin-top: 12px;">${t.availableLessonsTitle}</h3>
          <div class="control-row">
            ${LESSONS.map(l => `
              <div class="step-card" style="justify-content: space-between; align-items: center;">
                <div>
                  <h4>${l.titles[state.locale]}</h4>
                  <p class="muted">${l.subtitles[state.locale]}</p>
                </div>
                <a href="?lang=${state.locale}#/${l.id}" class="btn-step btn-primary" style="text-decoration: none; display: inline-flex; align-items: center;">
                  ${t.openLessonBtn}
                </a>
              </div>
            `).join('')}
          </div>

          <h3 style="margin-top: 16px;">${t.deferredLessonsTitle}</h3>
          <div style="display: grid; gap: 10px;">
            ${DEFERRED_TOPICS.map(topic => `
              <div class="step-card" style="justify-content: space-between; align-items: center; opacity: 0.75;">
                <span>${topic.titles[state.locale]}</span>
                <span class="badge badge-neutral">${topic.stage} · ${t.deferredBadge}</span>
              </div>
            `).join('')}
          </div>
        </section>
      </main>
    `;
  }

  private renderTabContent(
    state: AppState,
    t: TranslationDictionary,
    lesson: Lesson,
    result: LedCircuitResult,
    progress: LessonProgress
  ): string {
    if (this.activeTab === 'overview') {
      return `
        <div class="tab-overview-content prose">
          <h3>${lesson.titles[state.locale]}</h3>
          <p class="lead">${lesson.subtitles[state.locale]}</p>
          <div class="objectives-box" style="margin: 12px 0; padding: 14px; background: var(--bg-card); border-radius: 10px;">
            <strong>🎯 ${t.learningObjectives}</strong>
            <ul style="margin-top: 8px; padding-left: 20px;">
              ${lesson.objectives[state.locale].map((obj: string) => `<li>${obj}</li>`).join('')}
            </ul>
          </div>
          <div class="content-text">${lesson.overviewContent[state.locale].replace(/\n\n/g, '<br><br>')}</div>

          <div class="formula-card" style="margin-top: 16px;">
            <h4>🔍 ${t.realisticAnatomyTitle}</h4>
            <ul style="padding-left: 18px; display: grid; gap: 8px; font-size: 0.9rem;">
              <li>${t.realisticLedNote}</li>
              <li>${t.realisticResistorNote}</li>
              <li>${t.realisticBreadboardNote}</li>
            </ul>
          </div>
        </div>
      `;
    }

    if (this.activeTab === 'maths') {
      const vs = state.voltage;
      const vf = state.forwardVoltage;
      const r = state.resistance;
      const conducts = result.kvlSatisfied && result.actualCurrent > 0;
      const ohmsCurve = calculateOhmsLaw({ voltage: vs, resistance: r, power: state.power });

      return `
        <div class="tab-maths-content">
          <h3>${t.tabMaths}</h3>
          <p class="muted" style="font-size: 0.9rem; margin-bottom: 12px;">${t.modelLimitationsNote}</p>

          <div class="formula-card">
            <h4>${t.mathsKvlTitle}</h4>
            <div class="formula-equation">
              <code>${state.currentLessonId === 'ohms-law-resistor' || state.currentLessonId === 'open-closed-circuit' ? 'Vs = Vr + Vgap' : 'Vs = Vr + Vf'}</code>
            </div>
            <p>${t.mathsKvlDesc}</p>
            <div class="calc-steps">
              <div>${t.supplyVoltage} (Vs): <strong>${formatVoltage(vs)}</strong></div>
              <div>${t.resistorVoltage}: <strong>${formatVoltage(result.resistorVoltage)}</strong></div>
              <div>${state.currentLessonId === 'open-closed-circuit' ? t.gapVoltage : t.ledVoltage}: <strong>${formatVoltage(result.ledVoltage)}</strong></div>
            </div>
          </div>

          <div class="formula-card">
            <h4>${t.mathsOhmTitle}</h4>
            <div class="formula-equation">
              <code>${vf > 0 ? 'I = (Vs − Vf) / R' : 'I = Vs / R'}</code>
            </div>
            ${conducts ? `
              <div class="calc-steps">
                <div>${t.mathsSubstitute} I = (${vs.toFixed(1)} V − ${vf.toFixed(1)} V) / ${r} Ω = ${(vs - vf).toFixed(1)} V / ${r} Ω</div>
                <div class="highlight-result">${t.mathsResultCurrent} <strong>${formatCurrent(result.actualCurrent, state.locale)}</strong> (${result.actualCurrent.toFixed(7)} A)</div>
              </div>
            ` : `
              <div class="calc-steps muted">
                <div><em>${t.mathsNonConducting}</em></div>
                <div>${t.mathsPredictedWhenOn} <strong>${formatCurrent(result.predictedCurrent, state.locale)}</strong></div>
                <div style="font-size: 0.85rem; margin-top: 6px;">${t.mathsZeroCurrentNote}</div>
              </div>
            `}
          </div>

          <!-- SVG I-V Linear Plot -->
          <div class="formula-card">
            <h4>📈 I–V Relationship (R = ${formatResistance(r)})</h4>
            <svg viewBox="0 0 320 120" style="width: 100%; height: auto; background: #0b1329; border-radius: 8px; margin-top: 6px;">
              <line x1="40" y1="15" x2="40" y2="95" stroke="#475569" stroke-width="1.5" />
              <line x1="40" y1="95" x2="295" y2="95" stroke="#475569" stroke-width="1.5" />
              <polyline fill="none" stroke="#14b8a6" stroke-width="2.5"
                points="${ohmsCurve.curvePoints.map(pt => `${40 + (pt.v / 6.0) * 240},${95 - Math.min(75, (pt.iMilliAmps / 60) * 75)}`).join(' ')}" />
              <circle cx="${40 + (vs / 6.0) * 240}" cy="${95 - Math.min(75, ((result.actualCurrent * 1000) / 60) * 75)}" r="5" fill="#fbbf24" />
              <text x="165" y="112" fill="#94a3b8" font-size="9.5" text-anchor="middle">V (0 – 6.0 V)</text>
              <text x="12" y="58" fill="#94a3b8" font-size="9.5">I(mA)</text>
            </svg>
          </div>

          <div class="formula-card">
            <h4>${t.mathsPowerTitle}</h4>
            <div class="formula-equation">
              <code>Pr = I² × R = Vr × I</code>
            </div>
            <div class="calc-steps">
              <div>${t.mathsPowerResult} <strong>${(result.resistorPower * 1000).toFixed(2)} mW</strong></div>
            </div>
          </div>
        </div>
      `;
    }

    if (this.activeTab === 'teacher') {
      return `
        <div class="tab-teacher-content">
          <div class="teacher-banner">
            <h3>🎓 ${t.tabTeacher}</h3>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button id="btn-reveal-answers" type="button" class="btn-action">
                ${state.teacherRevealAnswers ? t.teacherHideAnswers : t.teacherRevealAnswers}
              </button>
              <button id="btn-print-sheet" type="button" class="btn-action">🖨 ${t.printWorksheet}</button>
            </div>
          </div>

          ${state.teacherRevealAnswers ? `
            <div class="teacher-section">
              <h4>${t.teacherAnswerKey}</h4>
              <div class="answer-box">
                <p><strong>${lesson.titles[state.locale]}:</strong> ${lesson.inquiry.teacherAnswerSummary[state.locale]}</p>
                <p style="margin-top: 6px;">${t.teacherRubric}</p>
              </div>
            </div>
          ` : ''}

          <div class="teacher-section">
            <h4>${t.teacherPedagogicalNotes}</h4>
            <div class="notes-box">${lesson.teacherNotes[state.locale].replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      `;
    }

    // Default tab: Guided Inquiry Flow (Predict -> Experiment -> Observe -> Explain)
    const inq = lesson.inquiry;
    const fwdEntry = progress.observedForward;
    const revEntry = progress.observedReverse;

    return `
      <div class="inquiry-flow">
        <!-- Step 1: Predict -->
        <div class="step-card ${progress.prediction ? 'step-completed' : 'step-active'}">
          <div class="step-badge">1</div>
          <div class="step-content">
            <h4>${t.step1PredictTitle}</h4>
            <p>${inq.predictQuestion[state.locale]}</p>

            <div class="predict-options">
              <label class="option-label">
                <input type="radio" name="predict-opt" value="A" ${progress.prediction === 'A' ? 'checked' : ''}>
                <span>A. ${inq.predictOptions.A[state.locale]}</span>
              </label>
              <label class="option-label">
                <input type="radio" name="predict-opt" value="B" ${progress.prediction === 'B' ? 'checked' : ''}>
                <span>B. ${inq.predictOptions.B[state.locale]}</span>
              </label>
              <label class="option-label">
                <input type="radio" name="predict-opt" value="C" ${progress.prediction === 'C' ? 'checked' : ''}>
                <span>C. ${inq.predictOptions.C[state.locale]}</span>
              </label>
            </div>

            <button id="btn-submit-predict" type="button" class="btn-step">
              ${progress.prediction ? '✓ ' + t.predictionSubmitted : t.submitPrediction}
            </button>
          </div>
        </div>

        <!-- Step 2: Experiment -->
        <div class="step-card ${progress.level === 'experimented' || progress.level === 'completed' ? 'step-completed' : ''}">
          <div class="step-badge">2</div>
          <div class="step-content">
            <h4>${t.step2ExperimentTitle}</h4>
            <p>${t.step2ExperimentHint}</p>
            <div class="experiment-checklist">
              ${inq.experimentSteps.map((stepText, idx) => {
                const done = idx === 0 ? !!progress.step1Done : !!progress.step2Done;
                return `
                  <div class="check-item ${done ? 'checked' : ''}">
                    ${done ? '✓' : '○'} ${stepText[state.locale]}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Step 3: Observe -->
        <div class="step-card ${progress.observed ? 'step-completed' : ''}">
          <div class="step-badge">3</div>
          <div class="step-content">
            <h4>${t.step3ObserveTitle}</h4>
            <p>${t.step3ObservePrompt}</p>
            <table class="obs-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem; margin: 6px 0;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-color); text-align: left;">
                  <th style="padding: 6px;">${t.obsTableCondition}</th>
                  <th style="padding: 6px;">${t.obsTableCurrent}</th>
                  <th style="padding: 6px;">${t.obsTableLedState}</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 6px;">${inq.obsRowLabels.row1[state.locale]}</td>
                  <td style="padding: 6px; font-family: monospace;">${fwdEntry ? formatCurrent(fwdEntry.current, state.locale) : t.obsNotRecorded}</td>
                  <td style="padding: 6px;">${fwdEntry ? (fwdEntry.lit ? t.obsLit : t.obsDark) : t.obsNotRecorded}</td>
                </tr>
                <tr>
                  <td style="padding: 6px;">${inq.obsRowLabels.row2[state.locale]}</td>
                  <td style="padding: 6px; font-family: monospace;">${revEntry ? formatCurrent(revEntry.current, state.locale) : t.obsNotRecorded}</td>
                  <td style="padding: 6px;">${revEntry ? (revEntry.lit ? t.obsLit : t.obsDark) : t.obsNotRecorded}</td>
                </tr>
              </tbody>
            </table>
            <button id="btn-record-obs" type="button" class="btn-step">
              ${progress.observed ? '✓ ' + t.observationRecorded : t.recordObservationBtn}
            </button>
          </div>
        </div>

        <!-- Step 4: Explain & Transfer -->
        <div class="step-card ${progress.level === 'completed' ? 'step-completed' : ''}">
          <div class="step-badge">4</div>
          <div class="step-content">
            <h4>${t.step4ExplainTitle}</h4>
            <p>${inq.transferQuestion[state.locale]}</p>
            <div class="predict-options">
              <label class="option-label">
                <input type="radio" name="transfer-opt" value="A" ${progress.transferAnswer === 'A' ? 'checked' : ''}>
                <span>A. ${inq.transferOptions.A[state.locale]}</span>
              </label>
              <label class="option-label">
                <input type="radio" name="transfer-opt" value="B" ${progress.transferAnswer === 'B' ? 'checked' : ''}>
                <span>B. ${inq.transferOptions.B[state.locale]}</span>
              </label>
              <label class="option-label">
                <input type="radio" name="transfer-opt" value="C" ${progress.transferAnswer === 'C' ? 'checked' : ''}>
                <span>C. ${inq.transferOptions.C[state.locale]}</span>
              </label>
            </div>
            ${progress.transferAnswer ? `
              <div class="status-banner ${progress.transferAnswer === inq.correctTransfer ? 'status-success' : 'status-warn'}" style="font-size: 0.85rem;">
                ${progress.transferAnswer === inq.correctTransfer ? inq.transferFeedbackCorrect[state.locale] : inq.transferFeedbackRetry[state.locale]}
              </div>
            ` : ''}

            <label for="explain-input" style="margin-top: 6px; font-weight: 600; font-size: 0.9rem;">${inq.explainPrompt[state.locale]}</label>
            <textarea id="explain-input" class="explain-textarea" placeholder="${t.explainPlaceholder}" rows="3">${progress.explanation || ''}</textarea>
            <button id="btn-save-explain" type="button" class="btn-step btn-primary">
              ${progress.level === 'completed' ? '✓ ' + t.explanationSaved : t.saveExplanationBtn}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private mountViewport(state: AppState) {
    const mount = this.root.querySelector('#viewport-canvas-mount') as HTMLElement;
    if (!mount) return;

    const t = translations[state.locale];

    if (state.viewMode === 'schematic') {
      if (this.benchView) {
        this.benchView.dispose();
        this.benchView = null;
      }
      this.schematicView = new SchematicView(mount);
      this.schematicView.render(state);
    } else {
      if (this.schematicView) {
        this.schematicView = null;
      }
      if (this.benchView) {
        this.benchView.dispose();
        this.benchView = null;
      }

      // Lazy-load 3D BenchView only when requested
      import('../views/scene/BenchView')
        .then(({ BenchView: LoadedBenchView }) => {
          if (store.getState().viewMode !== 'bench') return;
          this.benchView = new LoadedBenchView(mount);
          const ok = this.benchView.init(store.getState());
          if (ok) {
            this.benchView.update(store.getState());
          }
        })
        .catch(() => {
          mount.innerHTML = `
            <div class="webgl-fallback-box" style="background: #1e293b; color: #f8fafc; padding: 24px; border-radius: 12px; text-align: center;">
              <p style="margin-bottom: 14px; font-size: 15px;">⚠️ ${t.webglFallbackNotice}</p>
              <button id="switch-to-2d-fallback-btn" type="button" style="background: #0d9488; color: white; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; min-height: 44px;">
                ${t.switchTo2D}
              </button>
            </div>
          `;
          mount.querySelector('#switch-to-2d-fallback-btn')?.addEventListener('click', () => {
            store.setViewMode('schematic');
          });
        });
    }
  }

  private bindEvents(_state: AppState, t: TranslationDictionary) {
    // Lesson Navigation Pills
    this.root.querySelectorAll('[data-lesson-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.lessonId as LessonId;
        if (id) store.selectLesson(id);
      });
    });

    // Language buttons
    this.root.querySelector('#btn-lang-th')?.addEventListener('click', () => store.setLocale('th'));
    this.root.querySelector('#btn-lang-en')?.addEventListener('click', () => store.setLocale('en'));

    // View mode buttons
    this.root.querySelector('#btn-view-2d')?.addEventListener('click', () => store.setViewMode('schematic'));
    this.root.querySelector('#btn-view-3d')?.addEventListener('click', () => store.setViewMode('bench'));

    // Teacher mode toggle
    this.root.querySelector('#btn-teacher-toggle')?.addEventListener('click', () => store.toggleTeacherMode());
    this.root.querySelector('#btn-reveal-answers')?.addEventListener('click', () => store.toggleTeacherRevealAnswers());

    // Theme toggle
    this.root.querySelector('#btn-theme-toggle')?.addEventListener('click', () => store.toggleTheme());

    // Fullscreen toggle
    this.root.querySelector('#btn-fullscreen-toggle')?.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Hardware buttons
    this.root.querySelector('#ctrl-power-btn')?.addEventListener('click', () => store.togglePower());
    this.root.querySelector('#ctrl-polarity-btn')?.addEventListener('click', () => store.togglePolarity());
    this.root.querySelector('#ctrl-wire-btn')?.addEventListener('click', () => store.toggleWireConnected());

    // Lesson 2 Material buttons
    this.root.querySelectorAll('[data-material-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const matId = (btn as HTMLElement).dataset.materialId as MaterialId;
        if (matId) store.setMaterialId(matId);
      });
    });

    // Lesson 5 LED Color buttons
    this.root.querySelectorAll('[data-led-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        const colorId = (btn as HTMLElement).dataset.ledColor as LedColorId;
        if (colorId) store.setLedColor(colorId);
      });
    });

    // Lesson 6 Breadboard Preset buttons
    this.root.querySelectorAll('[data-bb-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const presetId = (btn as HTMLElement).dataset.bbPreset as BreadboardPresetId;
        if (presetId) store.setBreadboardPreset(presetId);
      });
    });

    // Sliders
    this.root.querySelector('#voltage-range')?.addEventListener('input', (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      store.setVoltage(val);
    });

    this.root.querySelector('#resistor-range')?.addEventListener('input', (e) => {
      const val = parseFloat((e.target as HTMLInputElement).value);
      store.setResistance(val);
    });

    // Resets
    this.root.querySelector('#btn-reset-exp')?.addEventListener('click', () => store.resetExperiment());
    this.root.querySelector('#btn-reset-all')?.addEventListener('click', () => {
      if (confirm(t.confirmResetAll)) {
        store.resetAllProgress();
      }
    });

    // Tabs
    this.root.querySelector('#tab-btn-inquiry')?.addEventListener('click', () => { this.activeTab = 'inquiry'; this.render(store.getState()); });
    this.root.querySelector('#tab-btn-overview')?.addEventListener('click', () => { this.activeTab = 'overview'; this.render(store.getState()); });
    this.root.querySelector('#tab-btn-maths')?.addEventListener('click', () => { this.activeTab = 'maths'; this.render(store.getState()); });
    this.root.querySelector('#tab-btn-teacher')?.addEventListener('click', () => { this.activeTab = 'teacher'; this.render(store.getState()); });

    // Step 1 Predict submit
    this.root.querySelector('#btn-submit-predict')?.addEventListener('click', () => {
      const selected = this.root.querySelector('input[name="predict-opt"]:checked') as HTMLInputElement;
      if (selected) {
        store.submitPrediction(selected.value);
      } else {
        alert(t.selectPredictionAlert);
      }
    });

    // Step 3 Observe record
    this.root.querySelector('#btn-record-obs')?.addEventListener('click', () => {
      store.recordObservation();
    });

    // Step 4 Explain submit
    this.root.querySelector('#btn-save-explain')?.addEventListener('click', () => {
      const input = this.root.querySelector('#explain-input') as HTMLTextAreaElement;
      const transferSelected = this.root.querySelector('input[name="transfer-opt"]:checked') as HTMLInputElement;
      if (input && input.value.trim().length > 0 && transferSelected) {
        store.saveExplanation(input.value.trim(), transferSelected.value);
      } else {
        alert(t.enterExplanationAlert);
      }
    });

    // Print worksheet
    this.root.querySelector('#btn-print-sheet')?.addEventListener('click', () => {
      window.print();
    });
  }
}
