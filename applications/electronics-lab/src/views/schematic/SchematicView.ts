import { store, AppState } from '../../state/store';
import { translations, TranslationDictionary } from '../../i18n';
import { formatCurrent, formatVoltage, formatResistance } from '../../domain/ledModel';
import {
  getResistorColorBands,
  MATERIAL_PROFILES,
  LED_COLOR_PROFILES,
  calculateBreadboardPreset
} from '../../domain/circuitModels';

export class SchematicView {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public render(state: AppState) {
    const t = translations[state.locale];
    const result = store.getSimulationResult();
    const isLit = result.actualCurrent > 0 && result.kvlSatisfied;
    const isReverse = state.polarity === 'reverse';
    const isPowerOn = state.power;
    const bands = getResistorColorBands(state.resistance);

    // Determine active LED color hex
    const ledProfile = state.currentLessonId === 'current-limiting-resistor'
      ? LED_COLOR_PROFILES[state.ledColor]
      : LED_COLOR_PROFILES.red;
    const ledHex = ledProfile.hex;

    // Pulse animation speed scales with current
    const animDuration = isLit ? Math.max(0.55, 2.0 - (result.actualCurrent / 0.025) * 1.4).toFixed(2) : '0';

    // Glow styling
    const glowRadius = isLit ? 22 + result.glowIntensity * 30 : 0;
    const glowOpacity = isLit ? 0.4 + result.glowIntensity * 0.55 : 0;

    if (state.currentLessonId === 'breadboard-connectivity') {
      this.renderBreadboard2D(state, t, result, bands);
      return;
    }

    const ledLeftLabel = isReverse ? t.cathode : t.anode;
    const ledRightLabel = isReverse ? t.anode : t.cathode;
    const isWireBroken = state.currentLessonId === 'open-closed-circuit' && !state.wireConnected;

    const bandSummary = bands
      .map(b => (state.locale === 'th' ? b.nameTh : b.nameEn))
      .join(' · ');

    this.container.innerHTML = `
      <div class="schematic-wrapper" style="position: relative; width: 100%;">
        <svg viewBox="0 0 640 350" class="schematic-svg" role="img" aria-label="${t.view2D}">
          <defs>
            <radialGradient id="ledGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="${ledHex}" stop-opacity="${glowOpacity}" />
              <stop offset="55%" stop-color="${ledHex}" stop-opacity="${glowOpacity * 0.45}" />
              <stop offset="100%" stop-color="${ledHex}" stop-opacity="0" />
            </radialGradient>

            <linearGradient id="resistorBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fde68a" />
              <stop offset="50%" stop-color="#d97706" />
              <stop offset="100%" stop-color="#92400e" />
            </linearGradient>

            <linearGradient id="batteryCaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#1e293b" />
              <stop offset="50%" stop-color="#334155" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>

            <style>
              .wire { stroke: #64748b; stroke-width: 4.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
              .wire-red { stroke: #ef4444; stroke-width: 4.5; fill: none; stroke-linecap: round; }
              .wire-blue { stroke: #38bdf8; stroke-width: 4.5; fill: none; stroke-linecap: round; }
              .active-wire { stroke: #10b981; stroke-width: 4.5; fill: none; stroke-linecap: round; stroke-dasharray: 8 8; }
              @keyframes dash {
                to { stroke-dashoffset: -32; }
              }
              .anim-flow {
                animation: dash ${animDuration}s linear infinite;
              }
              .clickable-part { cursor: pointer; transition: filter 0.15s ease; }
              .clickable-part:hover { filter: drop-shadow(0 0 8px rgba(20, 184, 166, 0.65)); }
              .clickable-part:focus-visible { outline: 3px solid #f59e0b; }
              @media (prefers-reduced-motion: reduce) {
                .anim-flow { animation: none; }
              }
            </style>
          </defs>

          <!-- Background Canvas Grid -->
          <rect width="640" height="350" rx="14" fill="#0b1329" />
          <g opacity="0.12">
            <line x1="80" y1="0" x2="80" y2="350" stroke="#94a3b8" stroke-dasharray="2 4"/>
            <line x1="200" y1="0" x2="200" y2="350" stroke="#94a3b8" stroke-dasharray="2 4"/>
            <line x1="340" y1="0" x2="340" y2="350" stroke="#94a3b8" stroke-dasharray="2 4"/>
            <line x1="480" y1="0" x2="480" y2="350" stroke="#94a3b8" stroke-dasharray="2 4"/>
            <line x1="0" y1="90" x2="640" y2="90" stroke="#94a3b8" stroke-dasharray="2 4"/>
            <line x1="0" y1="245" x2="640" y2="245" stroke="#94a3b8" stroke-dasharray="2 4"/>
          </g>

          <!-- CIRCUIT WIRES -->
          <path d="M 85 115 L 85 90 L 145 90" class="wire-red" />
          <path d="M 215 90 L 265 90" class="wire" />
          <path d="M 385 90 L 440 90" class="wire" />
          ${isWireBroken ? `
            <path d="M 520 90 L 565 90 L 565 245 L 365 245" class="wire-blue" />
            <path d="M 275 245 L 85 245 L 85 220" class="wire-blue" />
          ` : `
            <path d="M 520 90 L 565 90 L 565 245 L 85 245 L 85 220" class="wire-blue" />
          `}

          <!-- Dynamic Current Flow Animation Overlay (Conventional Current + to -) -->
          ${isLit ? `
            <path d="M 85 115 L 85 90 L 145 90" class="active-wire anim-flow" />
            <path d="M 145 90 L 215 90" class="active-wire anim-flow" />
            <path d="M 215 90 L 265 90" class="active-wire anim-flow" />
            <path d="M 385 90 L 440 90" class="active-wire anim-flow" />
            <path d="M 520 90 L 565 90 L 565 245 L 85 245 L 85 220" class="active-wire anim-flow" />
            <polygon points="242,84 254,90 242,96" fill="#10b981" />
            <polygon points="410,84 422,90 410,96" fill="#10b981" />
            <polygon points="559,165 565,177 571,165" fill="#10b981" />
            <polygon points="330,239 318,245 330,251" fill="#10b981" />
          ` : ''}

          <!-- 1. REALISTIC AA BATTERY HOLDER + CELLS -->
          <g transform="translate(85, 168)" class="battery-group">
            <!-- Battery Holder Box -->
            <rect x="-34" y="-52" width="68" height="104" rx="8" fill="url(#batteryCaseGrad)" stroke="#475569" stroke-width="2" />
            <!-- Two AA Cells inside -->
            <rect x="-26" y="-42" width="22" height="84" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1" />
            <rect x="-26" y="-42" width="22" height="22" rx="3" fill="#d97706" />
            <rect x="-19" y="-47" width="8" height="5" rx="1" fill="#fbbf24" />
            <rect x="4" y="-42" width="22" height="84" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1" />
            <rect x="4" y="-42" width="22" height="22" rx="3" fill="#d97706" />
            <rect x="11" y="-47" width="8" height="5" rx="1" fill="#fbbf24" />
            <!-- Terminal Labels -->
            <circle cx="0" cy="-52" r="4" fill="#ef4444" />
            <circle cx="0" cy="52" r="4" fill="#38bdf8" />
            <text x="-42" y="-42" fill="#ef4444" font-size="15" font-weight="bold" text-anchor="end">+</text>
            <text x="-42" y="48" fill="#38bdf8" font-size="15" font-weight="bold" text-anchor="end">−</text>
            <rect x="-28" y="-12" width="56" height="22" rx="4" fill="rgba(15,23,42,0.88)" />
            <text x="0" y="4" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">${formatVoltage(state.voltage)}</text>
          </g>

          <!-- 2. REALISTIC KNIFE / TACTILE SWITCH (INTERACTIVE) -->
          <g id="schematic-switch" class="clickable-part" transform="translate(145, 90)" tabindex="0" role="button" aria-label="${isPowerOn ? t.powerOn : t.powerOff}">
            <rect x="-12" y="-42" width="94" height="78" fill="transparent" />
            <!-- Switch Base Block -->
            <rect x="-6" y="4" width="82" height="12" rx="3" fill="#334155" stroke="#475569" />
            <!-- Brass Terminal Posts -->
            <rect x="-3" y="-6" width="8" height="12" rx="2" fill="#f59e0b" />
            <rect x="65" y="-6" width="8" height="12" rx="2" fill="#f59e0b" />
            ${isPowerOn ? `
              <!-- Closed Copper Knife Blade -->
              <line x1="2" y1="-2" x2="68" y2="-2" stroke="#10b981" stroke-width="5" stroke-linecap="round" />
              <rect x="52" y="-10" width="14" height="10" rx="2" fill="#dc2626" />
              <rect x="14" y="-32" width="42" height="18" rx="4" fill="#065f46" />
              <text x="35" y="-19" fill="#34d399" font-size="10.5" font-weight="bold" text-anchor="middle">${t.switchOnShort}</text>
            ` : `
              <!-- Open Copper Knife Blade -->
              <line x1="2" y1="-2" x2="58" y2="-28" stroke="#f43f5e" stroke-width="5" stroke-linecap="round" />
              <rect x="50" y="-36" width="14" height="10" rx="2" fill="#dc2626" transform="rotate(-24 55 -30)" />
              <rect x="10" y="-38" width="42" height="18" rx="4" fill="#7f1d1d" />
              <text x="31" y="-25" fill="#fca5a5" font-size="10.5" font-weight="bold" text-anchor="middle">${t.switchOffShort}</text>
            `}
            <text x="35" y="30" fill="#cbd5e1" font-size="10.5" text-anchor="middle">${t.switchClickHint}</text>
          </g>

          <!-- 3. REALISTIC CARBON-FILM RESISTOR WITH DYNAMIC 4-BAND COLOR CODE -->
          <g transform="translate(265, 90)">
            <!-- Metallic Axial Leads -->
            <line x1="0" y1="0" x2="22" y2="0" stroke="#cbd5e1" stroke-width="4" />
            <line x1="98" y1="0" x2="120" y2="0" stroke="#cbd5e1" stroke-width="4" />
            <!-- Ceramic Body -->
            <rect x="20" y="-14" width="80" height="28" rx="10" fill="url(#resistorBodyGrad)" stroke="#b45309" stroke-width="1.5" />
            <!-- 4 EIA Color Bands -->
            <rect x="32" y="-14" width="7" height="28" fill="${bands[0].hex}" />
            <rect x="46" y="-14" width="7" height="28" fill="${bands[1].hex}" />
            <rect x="60" y="-14" width="7" height="28" fill="${bands[2].hex}" />
            <rect x="78" y="-14" width="6" height="28" fill="${bands[3].hex}" />
            <!-- Value & Color Band Readout -->
            <text x="60" y="-22" fill="#fbbf24" font-size="13" font-weight="bold" text-anchor="middle">${formatResistance(state.resistance)}</text>
            <text x="60" y="29" fill="#cbd5e1" font-size="10" text-anchor="middle">${bandSummary}</text>
          </g>

          <!-- 4. LOAD ELEMENT: REALISTIC 5MM LED OR TEST MATERIAL / LAMP -->
          ${this.renderLoadElement(state, t, isLit, isReverse, ledHex, glowRadius, ledLeftLabel, ledRightLabel)}

          <!-- 5. OPTIONAL RETURN WIRE BREAK (Lesson 1: Open & Closed Circuit) -->
          ${state.currentLessonId === 'open-closed-circuit' ? `
            <g id="schematic-wire" class="clickable-part" transform="translate(275, 245)" tabindex="0" role="button" aria-label="${state.wireConnected ? t.wireConnected : t.wireDisconnected}">
              <rect x="-10" y="-25" width="110" height="55" fill="transparent" />
              <circle cx="0" cy="0" r="6" fill="#38bdf8" />
              <circle cx="90" cy="0" r="6" fill="#38bdf8" />
              ${state.wireConnected ? `
                <line x1="0" y1="0" x2="90" y2="0" stroke="#38bdf8" stroke-width="5" />
                <text x="45" y="-12" fill="#38bdf8" font-size="10.5" font-weight="bold" text-anchor="middle">${t.wireConnected}</text>
              ` : `
                <line x1="0" y1="0" x2="32" y2="-18" stroke="#f43f5e" stroke-width="4.5" stroke-linecap="round" />
                <line x1="58" y1="-18" x2="90" y2="0" stroke="#f43f5e" stroke-width="4.5" stroke-linecap="round" />
                <rect x="18" y="-36" width="54" height="18" rx="4" fill="#7f1d1d" />
                <text x="45" y="-23" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Vgap = ${formatVoltage(state.voltage)}</text>
              `}
              <text x="45" y="18" fill="#cbd5e1" font-size="10" text-anchor="middle">${t.wireClickHint}</text>
            </g>
          ` : ''}

          <!-- 6. REALISTIC DIGITAL MULTIMETER READOUT PANEL -->
          <g transform="translate(155, 282)">
            <rect x="0" y="0" width="330" height="54" rx="10" fill="#1e293b" stroke="#475569" stroke-width="1.5" />
            <rect x="8" y="7" width="165" height="40" rx="6" fill="#091914" stroke="#065f46" stroke-width="1" />
            <circle cx="22" cy="27" r="6" fill="${isLit ? '#10b981' : '#64748b'}" />
            <text x="34" y="21" fill="#6ee7b7" font-size="9.5" font-weight="600">${t.actualCurrent}</text>
            <text x="34" y="39" fill="${isLit ? '#34d399' : '#f1f5f9'}" font-size="16" font-weight="bold" font-family="monospace">${formatCurrent(result.actualCurrent, state.locale)}</text>

            <text x="185" y="22" fill="#94a3b8" font-size="10" font-weight="600">Vr: <tspan fill="#f8fafc" font-family="monospace">${formatVoltage(result.resistorVoltage)}</tspan></text>
            <text x="185" y="39" fill="#fbbf24" font-size="10" font-weight="600">
              ${!isPowerOn && result.isValid
                ? `${t.predictedCurrent}: ${formatCurrent(state.polarity === 'forward' ? result.predictedCurrent : 0, state.locale)}`
                : `Pr: ${(result.resistorPower * 1000).toFixed(2)} mW`}
            </text>
          </g>
        </svg>
      </div>
    `;

    this.bindSchematicEvents();
  }

  private renderLoadElement(
    state: AppState,
    t: TranslationDictionary,
    isLit: boolean,
    isReverse: boolean,
    ledHex: string,
    glowRadius: number,
    ledLeftLabel: string,
    ledRightLabel: string
  ): string {
    // In Lesson 2 (Conductors & Insulators), show Alligator Clips holding the Test Material + LED indicator
    if (state.currentLessonId === 'conductors-insulators') {
      const mat = MATERIAL_PROFILES[state.materialId];
      return `
        <g transform="translate(440, 90)">
          <!-- Alligator Clip Left & Right -->
          <polygon points="-8,-8 8,-3 8,3 -8,8" fill="#dc2626" />
          <polygon points="62,-3 78,-8 78,8 62,3" fill="#1e293b" stroke="#94a3b8" />
          <!-- Material Specimen Bar -->
          <rect x="5" y="-11" width="60" height="22" rx="4" fill="${mat.colorHex}" stroke="#f8fafc" stroke-width="1.5" />
          <text x="35" y="-19" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">${mat.names[state.locale]}</text>
          <!-- Indicator LED on Right Branch -->
          <g transform="translate(125, 65)">
            ${isLit ? `<circle cx="0" cy="0" r="${glowRadius * 0.85}" fill="url(#ledGlow)" />` : ''}
            <circle cx="0" cy="0" r="14" fill="${isLit ? '#ef4444' : '#334155'}" stroke="#f43f5e" stroke-width="2" />
            <text x="-22" y="4" fill="#f8fafc" font-size="10" text-anchor="end">LED</text>
          </g>
        </g>
      `;
    }

    // In Lesson 3 (Ohm's Law), show a voltage meter probe across the resistor + current indicator
    if (state.currentLessonId === 'ohms-law-resistor') {
      return `
        <g transform="translate(440, 90)">
          <line x1="0" y1="0" x2="80" y2="0" class="wire" />
          <circle cx="40" cy="0" r="20" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5" />
          <text x="40" y="5" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">A</text>
          <text x="40" y="34" fill="#cbd5e1" font-size="10.5" text-anchor="middle">Ammeter</text>
        </g>
      `;
    }

    // Default: Realistic 5mm Translucent Dome LED with Internal Anvil & Post Anatomy
    const anvilX = isReverse ? 24 : 46;
    const postX = isReverse ? 46 : 24;
    const flatNotchX = isReverse ? 10 : 62;

    return `
      <g id="schematic-led" class="clickable-part" transform="translate(440, 90)" tabindex="0" role="button" aria-label="${state.polarity === 'forward' ? t.polarityForward : t.polarityReverse}">
        <rect x="-15" y="-55" width="110" height="115" fill="transparent" />
        ${isLit ? `
          <circle cx="38" cy="-14" r="${glowRadius}" fill="url(#ledGlow)" />
        ` : ''}

        <!-- Metallic Leads Entering Base -->
        <line x1="0" y1="0" x2="24" y2="0" stroke="#cbd5e1" stroke-width="3.5" />
        <line x1="52" y1="0" x2="80" y2="0" stroke="#cbd5e1" stroke-width="3.5" />
        <line x1="24" y1="0" x2="24" y2="-16" stroke="#cbd5e1" stroke-width="3" />
        <line x1="52" y1="0" x2="52" y2="-16" stroke="#cbd5e1" stroke-width="3" />

        <!-- Realistic 5mm Epoxy Dome Outline -->
        <path d="M 14 -6 L 14 -24 A 24 24 0 0 1 62 -24 L 62 -6 Z"
              fill="${isLit ? ledHex : '#334155'}"
              fill-opacity="${isLit ? '0.88' : '0.55'}"
              stroke="${ledHex}" stroke-width="2.5" />

        <!-- Flange Rim at Base with Flat Cathode Edge -->
        <rect x="10" y="-6" width="56" height="6" rx="2" fill="${ledHex}" opacity="0.85" />
        <rect x="${flatNotchX}" y="-8" width="4" height="10" fill="#f8fafc" />

        <!-- Internal Leadframe: Post (Anode +) and Anvil Reflector Cup (Cathode -) -->
        <line x1="${postX}" y1="-6" x2="${postX}" y2="-20" stroke="#e2e8f0" stroke-width="2.5" />
        <polygon points="${anvilX - 6},-6 ${anvilX + 6},-6 ${anvilX + 8},-22 ${anvilX - 4},-22" fill="#cbd5e1" />
        ${isLit ? `<circle cx="${anvilX}" cy="-22" r="4.5" fill="#fef08a" />` : ''}

        <!-- Schematic Diode Symbol Overlay Below Leads -->
        ${isReverse ? `
          <line x1="24" y1="6" x2="24" y2="20" stroke="${ledHex}" stroke-width="2.5" />
          <polygon points="50,6 24,13 50,20" fill="${isLit ? ledHex : '#64748b'}" />
        ` : `
          <polygon points="24,6 50,13 24,20" fill="${isLit ? ledHex : '#64748b'}" />
          <line x1="50" y1="6" x2="50" y2="20" stroke="${ledHex}" stroke-width="2.5" />
        `}

        <!-- Anode / Cathode Terminal labels (Cleanly outside dome) -->
        <text x="4" y="-28" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="end">${ledLeftLabel}</text>
        <text x="72" y="-28" fill="#38bdf8" font-size="11" font-weight="600" text-anchor="start">${ledRightLabel}</text>

        <rect x="-8" y="25" width="92" height="22" rx="4" fill="#1e293b" stroke="#334155" stroke-width="1" />
        <text x="38" y="40" fill="#e2e8f0" font-size="10.5" font-weight="bold" text-anchor="middle">${state.polarity === 'forward' ? t.polarityFwdShort : t.polarityRevShort}</text>
      </g>
    `;
  }

  private renderBreadboard2D(
    state: AppState,
    t: TranslationDictionary,
    _result: any,
    bands: any[]
  ) {
    const bb = calculateBreadboardPreset(
      state.breadboardPreset,
      state.voltage,
      state.resistance,
      state.forwardVoltage,
      state.power
    );

    const cols = Array.from({ length: 16 }, (_, i) => i + 3); // Columns 3..18
    const rowsTop = ['A', 'B', 'C', 'D', 'E'];
    const rowsBot = ['F', 'G', 'H', 'I', 'J'];

    // Coordinates helper: col c -> x, row -> y
    const colX = (c: number) => 115 + (c - 3) * 28;
    const rowY = (r: string) => {
      const idxTop = rowsTop.indexOf(r);
      if (idxTop !== -1) return 68 + idxTop * 18;
      const idxBot = rowsBot.indexOf(r);
      return 190 + idxBot * 18;
    };

    // Determine LED & Resistor hole coordinates per preset
    let resEndHole = { c: 12, r: 'B' };
    let ledAnodeHole = { c: 12, r: 'C' };
    let ledCathodeHole = { c: 16, r: 'C' };
    let returnStartHole = { c: 16, r: 'E' };

    if (state.breadboardPreset === 'shorted-same-strip') {
      ledAnodeHole = { c: 12, r: 'C' };
      ledCathodeHole = { c: 12, r: 'D' };
      returnStartHole = { c: 12, r: 'E' };
    } else if (state.breadboardPreset === 'open-center-gap') {
      resEndHole = { c: 12, r: 'E' };
      ledAnodeHole = { c: 12, r: 'F' };
      ledCathodeHole = { c: 16, r: 'F' };
      returnStartHole = { c: 16, r: 'J' };
    } else if (state.breadboardPreset === 'misaligned-row') {
      resEndHole = { c: 12, r: 'B' };
      ledAnodeHole = { c: 13, r: 'C' };
      ledCathodeHole = { c: 16, r: 'C' };
      returnStartHole = { c: 16, r: 'E' };
    }

    const rX1 = colX(5);
    const rY1 = rowY('B');
    const rX2 = colX(resEndHole.c);
    const rY2 = rowY(resEndHole.r);

    const lX1 = colX(ledAnodeHole.c);
    const lY1 = rowY(ledAnodeHole.r);
    const lX2 = colX(ledCathodeHole.c);
    const lY2 = rowY(ledCathodeHole.r);

    const retX = colX(returnStartHole.c);
    const retY = rowY(returnStartHole.r);

    const animDuration = bb.ledLit ? Math.max(0.55, 2.0 - (bb.ledCurrent / 0.025) * 1.4).toFixed(2) : '0';

    this.container.innerHTML = `
      <div class="schematic-wrapper" style="position: relative; width: 100%;">
        <svg viewBox="0 0 640 350" class="schematic-svg" role="img" aria-label="${t.view2D}">
          <defs>
            <style>
              .active-wire { stroke: #10b981; stroke-width: 4.5; fill: none; stroke-linecap: round; stroke-dasharray: 8 8; }
              @keyframes dash {
                to { stroke-dashoffset: -32; }
              }
              .anim-flow {
                animation: dash ${animDuration}s linear infinite;
              }
              @media (prefers-reduced-motion: reduce) {
                .anim-flow { animation: none; }
              }
            </style>
          </defs>
          <rect width="640" height="350" rx="14" fill="#0b1329" />

          <!-- Breadboard ABS Plastic Body -->
          <rect x="75" y="16" width="525" height="276" rx="12" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" />

          <!-- Top Power Rail (+ Red) and Bottom Ground Rail (- Blue) -->
          <line x1="95" y1="34" x2="580" y2="34" stroke="#ef4444" stroke-width="3" />
          <text x="86" y="38" fill="#ef4444" font-size="13" font-weight="bold">+</text>
          <line x1="95" y1="276" x2="580" y2="276" stroke="#2563eb" stroke-width="3" />
          <text x="86" y="280" fill="#2563eb" font-size="13" font-weight="bold">−</text>

          <!-- Center IC Trench Ravine -->
          <rect x="77" y="150" width="521" height="24" fill="#cbd5e1" />
          <text x="338" y="166" fill="#475569" font-size="10" font-weight="bold" text-anchor="middle">${state.locale === 'th' ? 'ร่องกลางแยกฝั่ง (แยกแถบ A–E ออกจาก F–J)' : 'CENTER TRENCH GAP (Isolates A–E from F–J)'}</text>

          <!-- X-Ray Internal Conductive 5-Hole Strips -->
          ${cols.map(c => {
            const x = colX(c);
            const isTopActive = (c === 5 || c === 12 || (c === 16 && state.breadboardPreset === 'valid-series'));
            const isShorted = c === 12 && state.breadboardPreset === 'shorted-same-strip';
            const isMisaligned = c === 13 && state.breadboardPreset === 'misaligned-row';
            const topColor = isShorted ? '#ef4444' : (isMisaligned ? '#f59e0b' : (isTopActive ? '#10b981' : '#94a3b8'));
            const topOpacity = (isTopActive || isShorted || isMisaligned) ? 0.45 : 0.22;

            const isBotActive = (c === 12 || c === 16) && state.breadboardPreset === 'open-center-gap';
            const botColor = isBotActive ? '#f59e0b' : '#94a3b8';
            const botOpacity = isBotActive ? 0.45 : 0.22;

            return `
              <text x="${x}" y="55" fill="#475569" font-size="9.5" font-weight="bold" text-anchor="middle">${c}</text>
              <rect x="${x - 6}" y="62" width="12" height="82" rx="4" fill="${topColor}" opacity="${topOpacity}" />
              <rect x="${x - 6}" y="184" width="12" height="82" rx="4" fill="${botColor}" opacity="${botOpacity}" />
              ${rowsTop.map(r => `<rect x="${x - 3}" y="${rowY(r) - 3}" width="6" height="6" rx="1" fill="#334155" />`).join('')}
              ${rowsBot.map(r => `<rect x="${x - 3}" y="${rowY(r) - 3}" width="6" height="6" rx="1" fill="#334155" />`).join('')}
            `;
          }).join('')}

          <!-- Row Letters A-E and F-J -->
          ${rowsTop.map(r => `<text x="95" y="${rowY(r) + 4}" fill="#475569" font-size="10" font-weight="bold">${r}</text>`).join('')}
          ${rowsBot.map(r => `<text x="95" y="${rowY(r) + 4}" fill="#475569" font-size="10" font-weight="bold">${r}</text>`).join('')}

          <!-- Battery Left Side + Power Jumper Wires -->
          <rect x="12" y="95" width="48" height="90" rx="6" fill="#1e293b" stroke="#475569" stroke-width="2" />
          <text x="36" y="144" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">${formatVoltage(state.voltage)}</text>
          <!-- Red wire to Col 5 Row A -->
          <path d="M 36 95 L 36 34 L ${colX(5)} 34 L ${colX(5)} ${rowY('A')}" stroke="#ef4444" stroke-width="4" fill="none" stroke-linecap="round" />
          <!-- Blue return wire from returnStartHole to Minus rail -->
          <path d="M ${retX} ${retY} L ${retX} 276 L 36 276 L 36 185" stroke="#2563eb" stroke-width="4" fill="none" stroke-linecap="round" />

          <!-- Realistic Resistor on Breadboard (B5 to resEndHole) -->
          <line x1="${rX1}" y1="${rY1}" x2="${rX2}" y2="${rY2}" stroke="#cbd5e1" stroke-width="3.5" />
          <g transform="translate(${(rX1 + rX2) / 2}, ${(rY1 + rY2) / 2})">
            <rect x="-32" y="-9" width="64" height="18" rx="6" fill="#fde68a" stroke="#b45309" stroke-width="1.5" />
            <rect x="-20" y="-9" width="5" height="18" fill="${bands[0].hex}" />
            <rect x="-10" y="-9" width="5" height="18" fill="${bands[1].hex}" />
            <rect x="0" y="-9" width="5" height="18" fill="${bands[2].hex}" />
            <rect x="14" y="-9" width="5" height="18" fill="${bands[3].hex}" />
          </g>

          <!-- Realistic LED on Breadboard (ledAnodeHole to ledCathodeHole) -->
          <line x1="${lX1}" y1="${lY1}" x2="${(lX1 + lX2) / 2 - 6}" y2="${(lY1 + lY2) / 2 - 18}" stroke="#cbd5e1" stroke-width="3" />
          <line x1="${lX2}" y1="${lY2}" x2="${(lX1 + lX2) / 2 + 6}" y2="${(lY1 + lY2) / 2 - 18}" stroke="#cbd5e1" stroke-width="3" />
          <g transform="translate(${(lX1 + lX2) / 2}, ${(lY1 + lY2) / 2 - 24})">
            ${bb.ledLit ? `<circle cx="0" cy="0" r="28" fill="#ef4444" opacity="0.45" />` : ''}
            <circle cx="0" cy="0" r="14" fill="${bb.ledLit ? '#ef4444' : '#64748b'}" stroke="#991b1b" stroke-width="2" />
            <text x="0" y="4" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">LED</text>
          </g>

          <!-- Dynamic Current Flow Animation Overlay (Conventional Current + to -) -->
          ${bb.ledLit ? `
            <path d="M 36 95 L 36 34 L ${colX(5)} 34 L ${colX(5)} ${rowY('B')} L ${rX2} ${rY2} L ${lX1} ${lY1} L ${(lX1 + lX2) / 2} ${(lY1 + lY2) / 2 - 20} L ${lX2} ${lY2} L ${retX} ${retY} L ${retX} 276 L 36 276 L 36 185" class="active-wire anim-flow" />
          ` : ''}

          <!-- Bottom DMM Summary Bar -->
          <g transform="translate(155, 300)">
            <rect x="0" y="0" width="350" height="42" rx="8" fill="#1e293b" stroke="#475569" />
            <text x="16" y="26" fill="#6ee7b7" font-size="12" font-weight="bold">
              I(LED): ${formatCurrent(bb.ledCurrent, state.locale)} · I(R): ${formatCurrent(bb.resistorCurrent, state.locale)}
            </text>
          </g>
        </svg>
      </div>
    `;
  }

  private bindSchematicEvents() {
    const switchEl = this.container.querySelector('#schematic-switch');
    if (switchEl) {
      switchEl.addEventListener('click', () => store.togglePower());
      switchEl.addEventListener('keydown', (e: Event) => {
        if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
          e.preventDefault();
          store.togglePower();
        }
      });
    }

    const ledEl = this.container.querySelector('#schematic-led');
    if (ledEl) {
      ledEl.addEventListener('click', () => store.togglePolarity());
      ledEl.addEventListener('keydown', (e: Event) => {
        if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
          e.preventDefault();
          store.togglePolarity();
        }
      });
    }

    const wireEl = this.container.querySelector('#schematic-wire');
    if (wireEl) {
      wireEl.addEventListener('click', () => store.toggleWireConnected());
      wireEl.addEventListener('keydown', (e: Event) => {
        if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
          e.preventDefault();
          store.toggleWireConnected();
        }
      });
    }
  }
}
