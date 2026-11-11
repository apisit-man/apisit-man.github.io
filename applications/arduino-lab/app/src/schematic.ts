import type { LessonData, Locale } from './types';

export function renderSchematicSVG(
  lesson: LessonData,
  output: Record<string, any>,
  isRunning: boolean,
  lang: Locale = 'th'
): string {
  const isDark = document.documentElement.classList.contains('dark');
  const bg = isDark ? '#070b14' : '#f8fafc';
  const cardBg = isDark ? '#0f172a' : '#ffffff';
  const panelBg = isDark ? '#111c33' : '#f1f5f9';
  const stroke = isDark ? '#334155' : '#cbd5e1';
  const wireIdle = isDark ? '#475569' : '#94a3b8';
  const text = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const activeCyan = '#06b6d4';
  const ledRed = '#ef4444';
  const gndColor = isDark ? '#94a3b8' : '#475569';
  const vccColor = '#ef4444';

  const pins = output.pins || {};

  // Helper for standard schematic resistor symbol (horizontal zig-zag)
  function drawResistorSymbol(x: number, y: number, label: string, subLabel = ''): string {
    return `
      <g transform="translate(${x}, ${y})">
        <polyline points="-28,0 -20,0 -16,-7 -8,7 0,-7 8,7 16,-7 20,0 28,0" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linejoin="round"/>
        <text x="0" y="-12" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="#f59e0b">${label}</text>
        ${subLabel ? `<text x="0" y="18" text-anchor="middle" font-size="9" fill="${textMuted}">${subLabel}</text>` : ''}
      </g>
    `;
  }

  // Helper for standard schematic Ground (GND) symbol
  function drawGndSymbol(x: number, y: number): string {
    return `
      <g transform="translate(${x}, ${y})">
        <line x1="0" y1="0" x2="0" y2="10" stroke="${gndColor}" stroke-width="2"/>
        <line x1="-12" y1="10" x2="12" y2="10" stroke="${gndColor}" stroke-width="2.2"/>
        <line x1="-8" y1="15" x2="8" y2="15" stroke="${gndColor}" stroke-width="2"/>
        <line x1="-4" y1="20" x2="4" y2="20" stroke="${gndColor}" stroke-width="1.8"/>
        <text x="0" y="32" text-anchor="middle" font-size="9" font-family="monospace" font-weight="bold" fill="${gndColor}">GND (0V)</text>
      </g>
    `;
  }

  // Helper for +5V Vcc Rail symbol
  function drawVccSymbol(x: number, y: number, label = '+5V'): string {
    return `
      <g transform="translate(${x}, ${y})">
        <line x1="0" y1="0" x2="0" y2="-10" stroke="${vccColor}" stroke-width="2"/>
        <polygon points="-8,-10 8,-10 0,-20" fill="${vccColor}"/>
        <text x="0" y="-24" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="${vccColor}">${label}</text>
      </g>
    `;
  }

  // Helper for standard LED symbol (triangle + bar + light arrows)
  function drawLedSymbol(x: number, y: number, color: string, isOn: boolean, label: string): string {
    const fillCol = isOn ? color : 'none';
    const strokeCol = isOn ? color : textMuted;
    return `
      <g transform="translate(${x}, ${y})">
        ${isOn ? `<circle cx="0" cy="0" r="18" fill="${color}" opacity="0.22"/>` : ''}
        <polygon points="-9,-9 -9,9 9,0" fill="${fillCol}" stroke="${strokeCol}" stroke-width="2"/>
        <line x1="9" y1="-9" x2="9" y2="9" stroke="${strokeCol}" stroke-width="2.2"/>
        <!-- Emitted photon arrows -->
        <line x1="2" y1="-11" x2="10" y2="-19" stroke="${strokeCol}" stroke-width="1.5"/>
        <polygon points="10,-19 6,-18 9,-15" fill="${strokeCol}"/>
        <line x1="8" y1="-8" x2="16" y2="-16" stroke="${strokeCol}" stroke-width="1.5"/>
        <polygon points="16,-16 12,-15 15,-12" fill="${strokeCol}"/>
        <text x="0" y="23" text-anchor="middle" font-size="10" font-weight="bold" fill="${isOn ? color : text}">${label}</text>
      </g>
    `;
  }

  // Left-side Connection Netlist Table
  const connectionItems = lesson.connections
    .map((c, i) => {
      const isHigh = (pins[c.from] ?? 0) > 0 || (pins[c.to] ?? 0) > 0;
      const wireColor = c.from.includes('5V') || c.to.includes('5V')
        ? vccColor
        : isHigh && isRunning
        ? activeCyan
        : wireIdle;
      const y = 92 + i * 38;
      const noteText = c.note ? c.note[lang] || c.note.th : '';

      return `
      <g class="connection-row" transform="translate(22, ${y})">
        <rect x="0" y="-8" width="215" height="30" rx="6" fill="${panelBg}" stroke="${stroke}" stroke-width="1"/>
        <circle cx="12" cy="7" r="4.5" fill="${
          c.from.includes('GND') ? gndColor : c.from.includes('5V') ? vccColor : wireColor
        }"/>
        <text x="22" y="11" font-size="10.5" font-family="monospace" font-weight="bold" fill="${text}">${c.from}</text>
        <line x1="88" y1="7" x2="116" y2="7" stroke="${wireColor}" stroke-width="2" ${
          isHigh && isRunning ? 'stroke-dasharray="4 2"' : ''
        }/>
        <polygon points="116,7 111,4 111,10" fill="${wireColor}"/>
        <text x="122" y="11" font-size="10.5" font-family="monospace" font-weight="bold" fill="${activeCyan}">${c.to}</text>
        ${
          noteText
            ? `<title>${noteText}</title>`
            : ''
        }
      </g>
    `;
    })
    .join('');

  // Center Engineering Circuit Schematic Diagram (250..515)
  let centerSchematic = '';
  switch (lesson.id) {
    case 'board': {
      const ledOn = isRunning && (output.led === true || (pins.D13 ?? 0) > 0);
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="${textMuted}">
            ${lang === 'th' ? 'ผังวงจรภายในบอร์ด Uno R3' : 'Internal Uno R3 D13 Schematic'}
          </text>
          <rect x="20" y="65" width="70" height="75" rx="6" fill="#007480" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="55" y="96" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">ATmega</text>
          <text x="55" y="110" text-anchor="middle" font-size="10" font-family="monospace" fill="#e0f2fe">Pin D13</text>
          <line x1="90" y1="102" x2="115" y2="102" stroke="${ledOn ? activeCyan : wireIdle}" stroke-width="2.2"/>
          ${drawResistorSymbol(143, 102, '1 kΩ', 'RN1')}
          <line x1="171" y1="102" x2="195" y2="102" stroke="${ledOn ? activeCyan : wireIdle}" stroke-width="2.2"/>
          ${drawLedSymbol(204, 102, '#f59e0b', ledOn, 'LED_BUILTIN')}
          <line x1="215" y1="102" x2="232" y2="102" stroke="${gndColor}" stroke-width="2"/>
          <line x1="232" y1="102" x2="232" y2="148" stroke="${gndColor}" stroke-width="2"/>
          ${drawGndSymbol(232, 148)}
        </g>
      `;
      break;
    }

    case 'blink': {
      const ledOn = isRunning && output.led === true;
      const wCol = ledOn ? activeCyan : wireIdle;
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="${textMuted}">
            ${lang === 'th' ? 'วงจรไฟกะพริบอนุกรมตัวต้านทาน' : 'Series Current-Limited LED Circuit'}
          </text>
          <rect x="16" y="84" width="48" height="36" rx="6" fill="${panelBg}" stroke="${wCol}" stroke-width="1.8"/>
          <text x="40" y="106" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="${text}">D13</text>
          <line x1="64" y1="102" x2="90" y2="102" stroke="${wCol}" stroke-width="2.5" ${ledOn ? 'stroke-dasharray="5 3"' : ''}/>
          ${drawResistorSymbol(118, 102, '330 Ω', 'R1')}
          <line x1="146" y1="102" x2="178" y2="102" stroke="${wCol}" stroke-width="2.5" ${ledOn ? 'stroke-dasharray="5 3"' : ''}/>
          ${drawLedSymbol(187, 102, ledRed, ledOn, 'LED1 (Red)')}
          <line x1="198" y1="102" x2="226" y2="102" stroke="${gndColor}" stroke-width="2"/>
          <line x1="226" y1="102" x2="226" y2="148" stroke="${gndColor}" stroke-width="2"/>
          ${drawGndSymbol(226, 148)}
        </g>
      `;
      break;
    }

    case 'button': {
      const pressed = output.pressed === true;
      const ledOn = isRunning && output.led === true;
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="22" text-anchor="middle" font-size="11" font-weight="bold" fill="${textMuted}">
            ${lang === 'th' ? 'วงจรสวิตช์ Active-Low (INPUT_PULLUP)' : 'Active-Low Switch with Internal Pull-Up'}
          </text>
          ${drawVccSymbol(95, 58, '+5V (Internal)')}
          <g transform="translate(95, 78) rotate(90)">
            ${drawResistorSymbol(0, 0, '20kΩ', '')}
          </g>
          <circle cx="95" cy="116" r="4" fill="${activeCyan}"/>
          <line x1="95" y1="106" x2="95" y2="116" stroke="${activeCyan}" stroke-width="2"/>
          <line x1="95" y1="116" x2="155" y2="116" stroke="${activeCyan}" stroke-width="2.2"/>
          <rect x="155" y="102" width="82" height="28" rx="6" fill="${panelBg}" stroke="${activeCyan}" stroke-width="1.5"/>
          <text x="196" y="120" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="${text}">
            D2 = ${pressed ? 'LOW(0)' : 'HIGH(1)'}
          </text>
          <!-- SPST Switch to GND -->
          <line x1="95" y1="116" x2="95" y2="132" stroke="${wireIdle}" stroke-width="2"/>
          <circle cx="95" cy="132" r="3" fill="${text}"/>
          <line x1="95" y1="132" x2="${pressed ? '95' : '81'}" y2="${pressed ? '156' : '152'}" stroke="#f59e0b" stroke-width="2.8" stroke-linecap="round"/>
          <circle cx="95" cy="156" r="3" fill="${text}"/>
          <text x="54" y="148" text-anchor="middle" font-size="10" font-weight="bold" fill="#f59e0b">SW1</text>
          ${drawGndSymbol(95, 156)}
          ${drawLedSymbol(205, 66, ledRed, ledOn, 'D13 LED')}
        </g>
      `;
      break;
    }

    case 'knob': {
      const adc = output.adc ?? 512;
      const volt = ((adc * 5) / 1023).toFixed(2);
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="22" text-anchor="middle" font-size="11" font-weight="bold" fill="${textMuted}">
            ${lang === 'th' ? 'วงจรแบ่งแรงดัน Potentiometer & PWM' : 'Potentiometer Voltage Divider & PWM'}
          </text>
          ${drawVccSymbol(65, 58, '+5V')}
          <g transform="translate(65, 102) rotate(90)">
            ${drawResistorSymbol(0, 0, '10 kΩ', '')}
          </g>
          <line x1="65" y1="58" x2="65" y2="74" stroke="${vccColor}" stroke-width="2"/>
          <line x1="65" y1="130" x2="65" y2="152" stroke="${gndColor}" stroke-width="2"/>
          ${drawGndSymbol(65, 152)}
          <!-- Wiper arrow to A0 -->
          <line x1="115" y1="102" x2="77" y2="102" stroke="#7c3aed" stroke-width="2.2"/>
          <polygon points="75,102 82,98 82,106" fill="#7c3aed"/>
          <rect x="115" y="88" width="122" height="28" rx="6" fill="${panelBg}" stroke="#7c3aed" stroke-width="1.5"/>
          <text x="176" y="106" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="#7c3aed">
            A0: ${volt}V (${adc})
          </text>
          <!-- PWM D9 output to LED -->
          <text x="145" y="146" font-size="10" font-family="monospace" font-weight="bold" fill="#f59e0b">~D9 PWM</text>
          ${drawLedSymbol(212, 146, '#f59e0b', isRunning && (output.pwm ?? 0) > 0, `PWM=${output.pwm ?? 127}`)}
        </g>
      `;
      break;
    }

    case 'rgb': {
      const hex = output.hex || '#804000';
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="22" text-anchor="middle" font-size="11" font-weight="bold" fill="${textMuted}">
            ${lang === 'th' ? 'วงจร RGB LED ขั้วลบร่วม (3 × 330 Ω)' : '3-Channel Common-Cathode RGB Network'}
          </text>
          <!-- D9 Red -->
          <text x="26" y="64" font-size="10" font-family="monospace" font-weight="bold" fill="#ef4444">~D9</text>
          <line x1="50" y1="60" x2="75" y2="60" stroke="#ef4444" stroke-width="2"/>
          ${drawResistorSymbol(103, 60, '330Ω')}
          <line x1="131" y1="60" x2="175" y2="60" stroke="#ef4444" stroke-width="2"/>
          <!-- D10 Green -->
          <text x="22" y="106" font-size="10" font-family="monospace" font-weight="bold" fill="#22c55e">~D10</text>
          <line x1="50" y1="102" x2="75" y2="102" stroke="#22c55e" stroke-width="2"/>
          ${drawResistorSymbol(103, 102, '330Ω')}
          <line x1="131" y1="102" x2="175" y2="102" stroke="#22c55e" stroke-width="2"/>
          <!-- D11 Blue -->
          <text x="22" y="148" font-size="10" font-family="monospace" font-weight="bold" fill="#3b82f6">~D11</text>
          <line x1="50" y1="144" x2="75" y2="144" stroke="#3b82f6" stroke-width="2"/>
          ${drawResistorSymbol(103, 144, '330Ω')}
          <line x1="131" y1="144" x2="175" y2="144" stroke="#3b82f6" stroke-width="2"/>
          <!-- Common Cathode RGB Package -->
          <rect x="175" y="45" width="56" height="115" rx="10" fill="${panelBg}" stroke="${isRunning ? hex : stroke}" stroke-width="2"/>
          <circle cx="203" cy="102" r="18" fill="${isRunning ? hex : '#334155'}"/>
          <text x="203" y="106" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">RGB</text>
          <line x1="203" y1="160" x2="203" y2="168" stroke="${gndColor}" stroke-width="2"/>
          ${drawGndSymbol(203, 168)}
        </g>
      `;
      break;
    }

    case 'light':
    case 'force': {
      const isForce = lesson.id === 'force';
      const adc = output.adc ?? (isForce ? 0 : 600);
      const volt = ((adc * 5) / 1023).toFixed(2);
      const sensorLabel = isForce ? 'FSR-402' : 'LDR (CdS)';
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="22" text-anchor="middle" font-size="11" font-weight="bold" fill="${textMuted}">
            ${lang === 'th' ? `วงจรแบ่งแรงดัน ${sensorLabel} กับ 10 kΩ` : `${sensorLabel} + 10 kΩ Voltage Divider`}
          </text>
          ${drawVccSymbol(80, 52, '+5V')}
          <!-- Upper variable sensor resistor -->
          <circle cx="80" cy="78" r="18" fill="none" stroke="#06b6d4" stroke-width="1.8" stroke-dasharray="3 2"/>
          <g transform="translate(80, 78) rotate(90)">
            ${drawResistorSymbol(0, 0, '', '')}
          </g>
          <text x="34" y="82" text-anchor="middle" font-size="10" font-weight="bold" fill="#06b6d4">${sensorLabel}</text>
          <!-- Midpoint node A0 -->
          <circle cx="80" cy="112" r="4.5" fill="${activeCyan}"/>
          <line x1="80" y1="106" x2="80" y2="122" stroke="${activeCyan}" stroke-width="2"/>
          <line x1="80" y1="112" x2="140" y2="112" stroke="${activeCyan}" stroke-width="2.2"/>
          <rect x="140" y="96" width="104" height="32" rx="6" fill="${panelBg}" stroke="${activeCyan}" stroke-width="1.5"/>
          <text x="192" y="116" text-anchor="middle" font-size="10" font-family="monospace" font-weight="bold" fill="${activeCyan}">
            A0 = ${volt}V (${adc})
          </text>
          <!-- Lower fixed 10k pull-down resistor -->
          <g transform="translate(80, 142) rotate(90)">
            ${drawResistorSymbol(0, 0, '10 kΩ', '')}
          </g>
          ${drawGndSymbol(80, 166)}
        </g>
      `;
      break;
    }

    case 'motor': {
      const pwm = output.pwm ?? 128;
      const active = isRunning && pwm > 0;
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="22" text-anchor="middle" font-size="11" font-weight="bold" fill="${textMuted}">
            ${lang === 'th' ? 'วงจรทรานซิสเตอร์ขับมอเตอร์ + ไดโอดฟลายแบ็ก' : 'Low-Side Transistor Driver & Flyback Diode'}
          </text>
          ${drawVccSymbol(145, 52, 'EXT +6V')}
          <!-- Motor M and parallel Flyback Diode D1 -->
          <circle cx="120" cy="82" r="18" fill="${panelBg}" stroke="#10b981" stroke-width="2.2"/>
          <text x="120" y="87" text-anchor="middle" font-size="13" font-weight="bold" fill="#10b981">M</text>
          <!-- Flyback Diode D1 (Cathode pointing UP to +6V!) -->
          <polygon points="175,90 191,90 183,74" fill="#f59e0b"/>
          <line x1="175" y1="74" x2="191" y2="74" stroke="#ffffff" stroke-width="2.5"/>
          <text x="216" y="85" font-size="9.5" font-family="monospace" font-weight="bold" fill="#f59e0b">1N4007</text>
          <line x1="120" y1="52" x2="183" y2="52" stroke="${vccColor}" stroke-width="2"/>
          <line x1="120" y1="52" x2="120" y2="64" stroke="${vccColor}" stroke-width="2"/>
          <line x1="183" y1="52" x2="183" y2="74" stroke="${vccColor}" stroke-width="2"/>
          <line x1="120" y1="100" x2="120" y2="114" stroke="${active ? activeCyan : wireIdle}" stroke-width="2"/>
          <line x1="183" y1="90" x2="183" y2="114" stroke="${active ? activeCyan : wireIdle}" stroke-width="2"/>
          <line x1="120" y1="114" x2="183" y2="114" stroke="${active ? activeCyan : wireIdle}" stroke-width="2"/>
          <!-- NPN Transistor Q1 -->
          <text x="24" y="142" font-size="10" font-family="monospace" font-weight="bold" fill="${activeCyan}">~D5</text>
          ${drawResistorSymbol(72, 138, '1kΩ')}
          <line x1="100" y1="138" x2="125" y2="138" stroke="${activeCyan}" stroke-width="2"/>
          <line x1="125" y1="124" x2="125" y2="152" stroke="${text}" stroke-width="3"/>
          <line x1="125" y1="132" x2="145" y2="114" stroke="${text}" stroke-width="2"/>
          <line x1="125" y1="144" x2="145" y2="160" stroke="${text}" stroke-width="2"/>
          <text x="162" y="144" font-size="10" font-weight="bold" fill="${text}">Q1 (Driver)</text>
          ${drawGndSymbol(145, 160)}
        </g>
      `;
      break;
    }

    case 'stepper': {
      const coilPins = [pins.D8 ?? 0, pins.D9 ?? 0, pins.D10 ?? 0, pins.D11 ?? 0];
      const coilLabels = [
        { pin: 'D8', inLbl: 'IN1', outLbl: 'A (Blue)', y: 66, col: '#0284c7' },
        { pin: 'D9', inLbl: 'IN2', outLbl: 'B (Pink)', y: 94, col: '#22c55e' },
        { pin: 'D10', inLbl: 'IN3', outLbl: 'C (Yel)', y: 122, col: '#f59e0b' },
        { pin: 'D11', inLbl: 'IN4', outLbl: 'D (Org)', y: 150, col: '#ec4899' },
      ];
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${textMuted}">
            ${lang === 'th' ? 'วงจรขับสเต็ปเปอร์ ULN2003A & ขดลวด 4 เฟส' : 'ULN2003A Darlington Driver & 4-Phase Coils'}
          </text>
          ${drawVccSymbol(212, 48, 'EXT +5V')}
          <!-- ULN2003A Driver Block -->
          <rect x="68" y="48" width="76" height="118" rx="7" fill="${panelBg}" stroke="#f59e0b" stroke-width="1.8"/>
          <text x="106" y="62" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#f59e0b">ULN2003A</text>
          ${coilLabels
            .map((c, idx) => {
              const high = coilPins[idx] > 0;
              const lineCol = high ? c.col : wireIdle;
              return `
                <text x="14" y="${c.y + 3}" font-size="9.5" font-family="monospace" font-weight="bold" fill="${c.col}">${c.pin}</text>
                <line x1="38" y1="${c.y}" x2="68" y2="${c.y}" stroke="${lineCol}" stroke-width="2.2" ${
                high && isRunning ? 'stroke-dasharray="4 2"' : ''
              }/>
                <text x="84" y="${c.y + 3}" font-size="8.5" font-family="monospace" fill="${text}">${c.inLbl}</text>
                <circle cx="132" cy="${c.y}" r="4.5" fill="${high ? '#ef4444' : '#334155'}"/>
                <line x1="144" y1="${c.y}" x2="184" y2="${c.y}" stroke="${lineCol}" stroke-width="2.2"/>
                <rect x="184" y="${c.y - 9}" width="54" height="18" rx="4" fill="${
                high ? c.col : panelBg
              }" stroke="${c.col}" stroke-width="1.2"/>
                <text x="211" y="${c.y + 3}" text-anchor="middle" font-size="8.5" font-family="monospace" font-weight="bold" fill="${
                high ? '#ffffff' : text
              }">${c.outLbl}</text>
              `;
            })
            .join('')}
          <line x1="106" y1="166" x2="106" y2="174" stroke="${gndColor}" stroke-width="2"/>
          ${drawGndSymbol(106, 174)}
        </g>
      `;
      break;
    }

    case 'sensor':
    case 'project': {
      const valid = output.valid !== false && output.distanceCm !== null;
      const cm = output.distanceCm ?? 30;
      const isProj = lesson.id === 'project';
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${textMuted}">
            ${
              isProj
                ? lang === 'th'
                  ? 'วงจรอัลตราโซนิก HC-SR04 + ไฟช่วยจอด 3 โซน'
                  : 'HC-SR04 Sonar + 3-Zone Traffic LEDs'
                : lang === 'th'
                ? 'วงจรวัดระยะคลื่นเสียงสะท้อน HC-SR04'
                : 'HC-SR04 Ultrasonic Time-of-Flight Circuit'
            }
          </text>
          <!-- HC-SR04 Module -->
          <rect x="64" y="42" width="96" height="82" rx="8" fill="#1e3a8a" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="112" y="60" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">HC-SR04</text>
          <text x="18" y="76" font-size="9.5" font-family="monospace" font-weight="bold" fill="#0284c7">D9 Trig</text>
          <line x1="54" y1="72" x2="64" y2="72" stroke="#0284c7" stroke-width="2.2"/>
          <text x="14" y="102" font-size="9.5" font-family="monospace" font-weight="bold" fill="#06b6d4">D10 Echo</text>
          <line x1="56" y1="98" x2="64" y2="98" stroke="#06b6d4" stroke-width="2.2"/>
          <!-- Acoustic waves to Target -->
          <path d="M 168 68 Q 180 82 168 96" fill="none" stroke="${valid ? activeCyan : wireIdle}" stroke-width="2"/>
          <path d="M 182 62 Q 198 82 182 102" fill="none" stroke="${valid ? activeCyan : wireIdle}" stroke-width="2"/>
          <rect x="208" y="48" width="34" height="70" rx="5" fill="${valid ? '#f59e0b' : '#475569'}"/>
          <text x="225" y="86" text-anchor="middle" font-size="8.5" font-family="monospace" font-weight="bold" fill="#ffffff">
            ${valid ? `${Number(cm).toFixed(0)}cm` : 'OUT'}
          </text>
          ${
            isProj
              ? `
            <!-- 3 Traffic LEDs on D4, D3, D2 -->
            <g transform="translate(24, 148)">
              <text x="0" y="4" font-size="9.5" font-family="monospace" font-weight="bold" fill="#ef4444">D4(R)</text>
              <circle cx="44" cy="0" r="8" fill="${output.light === 'red' && isRunning ? '#ef4444' : '#334155'}"/>
              <text x="72" y="4" font-size="9.5" font-family="monospace" font-weight="bold" fill="#eab308">D3(Y)</text>
              <circle cx="116" cy="0" r="8" fill="${output.light === 'yellow' && isRunning ? '#eab308' : '#334155'}"/>
              <text x="144" y="4" font-size="9.5" font-family="monospace" font-weight="bold" fill="#22c55e">D2(G)</text>
              <circle cx="188" cy="0" r="8" fill="${output.light === 'green' && isRunning ? '#22c55e' : '#334155'}"/>
              <text x="105" y="26" text-anchor="middle" font-size="9" fill="${textMuted}">Series 330 Ω × 3 → GND</text>
            </g>
          `
              : `
            <line x1="112" y1="124" x2="112" y2="156" stroke="${gndColor}" stroke-width="2"/>
            ${drawGndSymbol(112, 156)}
          `
          }
        </g>
      `;
      break;
    }

    case 'sound':
    case 'piano': {
      const isPiano = lesson.id === 'piano';
      const hz = output.hz ?? 0;
      const active = isRunning && hz > 0;
      const bzPin = isPiano ? 'D10' : 'D8';
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${textMuted}">
            ${
              isPiano
                ? lang === 'th'
                  ? 'วงจรคีย์บอร์ด 8 ปุ่ม (D2–D9) + ลำโพงเปียโซ D10'
                  : '8-Key INPUT_PULLUP Matrix (D2–D9) & D10 Piezo'
                : lang === 'th'
                ? 'วงจรขับลำโพงเปียโซด้วยคลื่นสี่เหลี่ยม tone(D8)'
                : 'Square-Wave Piezo Transducer Drive (D8)'
            }
          </text>
          ${
            isPiano
              ? `
            <rect x="18" y="42" width="95" height="122" rx="7" fill="${panelBg}" stroke="${activeCyan}" stroke-width="1.5"/>
            <text x="65" y="60" text-anchor="middle" font-size="9.5" font-weight="bold" fill="${text}">8 Keys (SW1–8)</text>
            <text x="65" y="78" text-anchor="middle" font-size="9" font-family="monospace" fill="${activeCyan}">Pins D2..D9</text>
            <text x="65" y="96" text-anchor="middle" font-size="8.5" fill="${textMuted}">INPUT_PULLUP</text>
            <text x="65" y="116" text-anchor="middle" font-size="9.5" font-family="monospace" font-weight="bold" fill="#f59e0b">
              ${output.key !== null && output.key !== undefined ? `Active: D${2 + output.key}` : 'All HIGH (1)'}
            </text>
            ${drawGndSymbol(65, 164)}
          `
              : ''
          }
          <!-- Piezo Buzzer Symbol -->
          <text x="${isPiano ? '132' : '38'}" y="98" font-size="10.5" font-family="monospace" font-weight="bold" fill="#a855f7">${bzPin}</text>
          <line x1="${isPiano ? '158' : '60'}" y1="94" x2="182" y2="94" stroke="${active ? '#a855f7' : wireIdle}" stroke-width="2.5"/>
          <rect x="182" y="68" width="46" height="52" rx="8" fill="${panelBg}" stroke="${active ? '#a855f7' : stroke}" stroke-width="2"/>
          <circle cx="205" cy="94" r="14" fill="${active ? '#a855f7' : '#334155'}"/>
          <text x="205" y="98" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffffff">BZ1</text>
          <line x1="205" y1="120" x2="205" y2="154" stroke="${gndColor}" stroke-width="2"/>
          ${drawGndSymbol(205, 154)}
        </g>
      `;
      break;
    }

    case 'heat': {
      const degC = (output.tempC ?? 25).toFixed(1);
      const volt = (output.voltage ?? 0.75).toFixed(3);
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${textMuted}">
            ${lang === 'th' ? 'วงจรเซนเซอร์อุณหภูมิแอนะล็อก TMP36 (TO-92)' : 'TMP36 Linear Analog Temperature Sensor'}
          </text>
          ${drawVccSymbol(82, 54, '+5V (Pin 1)')}
          <rect x="48" y="68" width="68" height="68" rx="10" fill="${panelBg}" stroke="#f97316" stroke-width="2"/>
          <text x="82" y="98" text-anchor="middle" font-size="11" font-weight="bold" fill="#f97316">TMP36</text>
          <text x="82" y="114" text-anchor="middle" font-size="9.5" font-family="monospace" fill="${text}">${degC} °C</text>
          <line x1="82" y1="54" x2="82" y2="68" stroke="${vccColor}" stroke-width="2"/>
          <line x1="116" y1="102" x2="148" y2="102" stroke="#f59e0b" stroke-width="2.5"/>
          <rect x="148" y="84" width="96" height="36" rx="6" fill="${panelBg}" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="196" y="100" text-anchor="middle" font-size="9.5" font-family="monospace" font-weight="bold" fill="#f59e0b">Pin 2 → A0</text>
          <text x="196" y="114" text-anchor="middle" font-size="9.5" font-family="monospace" fill="${text}">${volt} V</text>
          <line x1="82" y1="136" x2="82" y2="158" stroke="${gndColor}" stroke-width="2"/>
          ${drawGndSymbol(82, 158)}
        </g>
      `;
      break;
    }

    case 'servo': {
      const angle = output.angle ?? 90;
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${textMuted}">
            ${lang === 'th' ? 'วงจรควบคุมเซอร์โวมอเตอร์ SG90 (50Hz PWM)' : 'SG90 Servo 3-Wire Control & External +5V'}
          </text>
          ${drawVccSymbol(176, 52, 'EXT +5V')}
          <text x="20" y="106" font-size="10.5" font-family="monospace" font-weight="bold" fill="#f59e0b">~D9 PWM</text>
          <line x1="74" y1="102" x2="126" y2="102" stroke="#f59e0b" stroke-width="2.5" ${
            isRunning ? 'stroke-dasharray="5 3"' : ''
          }/>
          <rect x="126" y="66" width="102" height="72" rx="10" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
          <text x="177" y="96" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">SG90 SERVO</text>
          <text x="177" y="114" text-anchor="middle" font-size="10" font-family="monospace" fill="#e0f2fe">Angle: ${angle}°</text>
          <line x1="176" y1="52" x2="176" y2="66" stroke="${vccColor}" stroke-width="2.2"/>
          <line x1="176" y1="138" x2="176" y2="160" stroke="${gndColor}" stroke-width="2.2"/>
          ${drawGndSymbol(176, 160)}
        </g>
      `;
      break;
    }

    case 'plant': {
      const rel = output.relativePercent ?? 50;
      const adc = output.adc ?? 600;
      centerSchematic = `
        <g transform="translate(250, 78)">
          <rect x="0" y="0" width="260" height="210" rx="12" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="130" y="21" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${textMuted}">
            ${lang === 'th' ? 'วงจรวัดความชื้นดิน (A0) + จอ I2C OLED (A4/A5)' : 'Soil Probe (A0) + I2C SSD1306 OLED (A4/A5)'}
          </text>
          <!-- Soil Probe Block -->
          <rect x="16" y="46" width="96" height="58" rx="7" fill="${panelBg}" stroke="#10b981" stroke-width="1.6"/>
          <text x="64" y="68" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#10b981">SOIL PROBE</text>
          <text x="64" y="86" text-anchor="middle" font-size="9" font-family="monospace" fill="${text}">AO → A0 (${adc})</text>
          <!-- I2C OLED Block -->
          <rect x="138" y="46" width="106" height="106" rx="8" fill="#040814" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="191" y="66" text-anchor="middle" font-size="9.5" font-family="monospace" font-weight="bold" fill="#facc15">SSD1306 I2C</text>
          <text x="191" y="92" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="#38bdf8">${rel}%</text>
          <text x="191" y="116" text-anchor="middle" font-size="9" font-family="monospace" fill="#94a3b8">SDA → Pin A4</text>
          <text x="191" y="132" text-anchor="middle" font-size="9" font-family="monospace" fill="#94a3b8">SCL → Pin A5</text>
          ${drawGndSymbol(64, 156)}
        </g>
      `;
      break;
    }

    default: {
      centerSchematic = '';
      break;
    }
  }

  // Right-hand side dynamic component telemetry diagram
  let componentVisual = '';

  switch (lesson.id) {
    case 'board':
    case 'blink':
    case 'button':
    case 'light': {
      const ledOn = output.led === true && isRunning;
      const isBuiltin = lesson.id !== 'blink';
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">
            ${isBuiltin ? 'LED_BUILTIN (D13)' : lang === 'th' ? 'สถานะเอาต์พุต LED (D13)' : 'LED Output State (D13)'}
          </text>
          <circle cx="102" cy="95" r="36" fill="${ledOn ? (isBuiltin ? '#f59e0b' : ledRed) : '#1f2937'}" filter="${
            ledOn ? `drop-shadow(0 0 18px ${isBuiltin ? '#f59e0b' : '#ef4444'})` : 'none'
          }"/>
          <text x="102" y="158" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="${
            ledOn ? (isBuiltin ? '#f59e0b' : '#ef4444') : textMuted
          }">
            ${ledOn ? '● HIGH (5.0V / ON)' : '○ LOW (0.0V / OFF)'}
          </text>
          <text x="102" y="182" text-anchor="middle" font-size="10" fill="${textMuted}">
            ${
              lesson.id === 'light'
                ? `ADC A0 = ${output.adc ?? 600}`
                : isBuiltin
                ? 'Onboard SMD LED (Pin 13)'
                : 'If ≈ 9.1 mA (via 330 Ω)'
            }
          </text>
        </g>
      `;
      break;
    }

    case 'rgb': {
      const hex = output.hex || '#804000';
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">RGB Additive Color</text>
          <circle cx="102" cy="92" r="38" fill="${isRunning ? hex : '#1f2937'}" filter="${
            isRunning ? `drop-shadow(0 0 18px ${hex})` : 'none'
          }"/>
          <text x="102" y="154" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="${text}">
            ${isRunning ? hex.toUpperCase() : 'OFF'}
          </text>
          <text x="102" y="178" text-anchor="middle" font-size="10.5" font-family="monospace" fill="${textMuted}">
            R:${output.r ?? 0}  G:${output.g ?? 0}  B:${output.b ?? 0}
          </text>
        </g>
      `;
      break;
    }

    case 'knob': {
      const adc = output.adc ?? 512;
      const duty = (((output.duty ?? 0.5) * 100)).toFixed(1);
      const angle = (adc / 1023) * 270 - 135;
      const rad = (angle * Math.PI) / 180;
      const kx = 102 + Math.sin(rad) * 28;
      const ky = 90 - Math.cos(rad) * 28;
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">Potentiometer (A0)</text>
          <circle cx="102" cy="90" r="36" fill="${isDark ? '#1e293b' : '#e2e8f0'}" stroke="${stroke}" stroke-width="2"/>
          <line x1="102" y1="90" x2="${kx}" y2="${ky}" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
          <circle cx="102" cy="90" r="6" fill="#7c3aed"/>
          <text x="102" y="154" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#7c3aed">
            ADC: ${adc} / 1023
          </text>
          <text x="102" y="178" text-anchor="middle" font-size="11" font-family="monospace" fill="${textMuted}">
            PWM: ${output.pwm ?? 127} (${duty}%)
          </text>
        </g>
      `;
      break;
    }

    case 'servo': {
      const angle = output.angle ?? 90;
      // 0° Left (-X), 90° Top (-Y), 180° Right (+X) matching 3D protractor arc
      const rad = ((angle - 90) * Math.PI) / 180;
      const armX = 102 + Math.sin(rad) * 38;
      const armY = 106 - Math.cos(rad) * 38;
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="26" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">
            ${lang === 'th' ? 'มุมแขนเซอร์โว (SG90 D9)' : 'SG90 Servo Horn (D9)'}
          </text>
          <!-- Protractor semicircle 0° (Left) -> 90° (Top) -> 180° (Right) -->
          <path d="M 60 106 A 42 42 0 0 1 144 106" fill="none" stroke="${stroke}" stroke-width="2" stroke-dasharray="4 2"/>
          <text x="48" y="110" text-anchor="end" font-size="9" font-family="monospace" fill="${textMuted}">0°</text>
          <text x="102" y="56" text-anchor="middle" font-size="9" font-family="monospace" fill="${textMuted}">90°</text>
          <text x="156" y="110" text-anchor="start" font-size="9" font-family="monospace" fill="${textMuted}">180°</text>
          <line x1="102" y1="106" x2="${armX}" y2="${armY}" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
          <circle cx="102" cy="106" r="6" fill="#0f172a"/>
          <text x="102" y="156" text-anchor="middle" font-size="16" font-family="monospace" font-weight="bold" fill="#0284c7">
            ${angle}°
          </text>
          <text x="102" y="180" text-anchor="middle" font-size="10" fill="${textMuted}">
            ${lang === 'th' ? 'ช่วงมุมคำสั่ง 0° ถึง 180°' : 'Command Span: 0° – 180°'}
          </text>
        </g>
      `;
      break;
    }

    case 'sensor':
    case 'project': {
      const valid = output.valid;
      const cm = output.distanceCm;
      const echoUs = output.echoUs ?? 0;
      const light = output.light;
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="26" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">HC-SR04 Sonar</text>
          <circle cx="64" cy="70" r="22" fill="#0284c7" stroke="${stroke}" stroke-width="2"/>
          <circle cx="140" cy="70" r="22" fill="#0284c7" stroke="${stroke}" stroke-width="2"/>
          <text x="64" y="74" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">T</text>
          <text x="140" y="74" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">R</text>
          <text x="102" y="118" text-anchor="middle" font-size="15" font-family="monospace" font-weight="bold" fill="${
            valid ? '#0284c7' : '#ef4444'
          }">
            ${valid && cm !== null ? cm.toFixed(1) + ' cm' : lang === 'th' ? 'ไม่มีคลื่นสะท้อน' : 'NO ECHO'}
          </text>
          <text x="102" y="138" text-anchor="middle" font-size="10" font-family="monospace" fill="${textMuted}">Pulse: ${echoUs} µs</text>
          ${
            lesson.id === 'project'
              ? `
            <g transform="translate(42, 152)">
              <circle cx="20" cy="20" r="12" fill="${
                light === 'green' ? '#22c55e' : '#1f2937'
              }" filter="${light === 'green' ? 'drop-shadow(0 0 8px #22c55e)' : 'none'}"/>
              <circle cx="60" cy="20" r="12" fill="${
                light === 'yellow' ? '#eab308' : '#1f2937'
              }" filter="${light === 'yellow' ? 'drop-shadow(0 0 8px #eab308)' : 'none'}"/>
              <circle cx="100" cy="20" r="12" fill="${
                light === 'red' ? '#ef4444' : '#1f2937'
              }" filter="${light === 'red' ? 'drop-shadow(0 0 8px #ef4444)' : 'none'}"/>
            </g>
          `
              : ''
          }
        </g>
      `;
      break;
    }

    case 'motor': {
      const duty = (((output.duty ?? 0.5) * 100)).toFixed(1);
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">DC Motor & Driver</text>
          <circle cx="102" cy="92" r="34" fill="${isDark ? '#1e293b' : '#f1f5f9'}" stroke="#10b981" stroke-width="2.5"/>
          <text x="102" y="99" text-anchor="middle" font-size="18" font-weight="bold" fill="#059669">M</text>
          <text x="102" y="154" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#059669">
            PWM: ${output.pwm ?? 128} / 255
          </text>
          <text x="102" y="176" text-anchor="middle" font-size="11" font-family="monospace" fill="${textMuted}">Duty: ${duty}%</text>
        </g>
      `;
      break;
    }

    case 'stepper': {
      const numAngle = output.angle ?? 0;
      const angle = numAngle.toFixed(0);
      const steps = output.steps ?? 0;
      const rad = (numAngle * Math.PI) / 180;
      const nx = 102 + Math.sin(rad) * 24;
      const ny = 82 - Math.cos(rad) * 24;
      const coilStates = [pins.D8 ?? 0, pins.D9 ?? 0, pins.D10 ?? 0, pins.D11 ?? 0];
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="26" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">28BYJ-48 + ULN2003</text>
          <circle cx="102" cy="82" r="30" fill="${isDark ? '#1e293b' : '#f1f5f9'}" stroke="#f59e0b" stroke-width="2"/>
          <!-- Rotating CW/CCW Shaft Needle -->
          <line x1="102" y1="82" x2="${nx}" y2="${ny}" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="102" cy="82" r="4.5" fill="#d97706"/>
          <text x="102" y="128" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#d97706">
            ${angle}° | Steps: ${steps}
          </text>
          <!-- 4 ULN2003 Phase LEDs A(D8), B(D9), C(D10), D(D11) -->
          <g transform="translate(32, 146)">
            ${[
              { lbl: 'A:D8', on: coilStates[0] > 0 },
              { lbl: 'B:D9', on: coilStates[1] > 0 },
              { lbl: 'C:D10', on: coilStates[2] > 0 },
              { lbl: 'D:D11', on: coilStates[3] > 0 },
            ]
              .map(
                (item, idx) => `
              <circle cx="${16 + idx * 36}" cy="14" r="8" fill="${
                  item.on ? (isRunning ? '#ef4444' : '#991b1b') : '#334155'
                }"/>
              <text x="${16 + idx * 36}" y="34" text-anchor="middle" font-size="8.5" font-family="monospace" font-weight="bold" fill="${
                  item.on ? '#ef4444' : textMuted
                }">${item.lbl}</text>
            `
              )
              .join('')}
          </g>
        </g>
      `;
      break;
    }

    case 'sound': {
      const hz = output.hz ?? 0;
      const active = isRunning && hz > 0;
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">Piezo Buzzer (D8)</text>
          <circle cx="102" cy="92" r="34" fill="${active ? '#7c3aed' : '#1f2937'}" filter="${
            active ? 'drop-shadow(0 0 16px #7c3aed)' : 'none'
          }"/>
          <circle cx="102" cy="92" r="10" fill="${isDark ? '#090d16' : '#ffffff'}"/>
          <text x="102" y="154" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="${
            active ? '#7c3aed' : textMuted
          }">
            ${active ? `${hz} Hz` : lang === 'th' ? 'เงียบ' : 'Silent'}
          </text>
          <text x="102" y="176" text-anchor="middle" font-size="10" fill="${textMuted}">
            ${active ? 'Square-Wave Tone Active' : 'noTone()'}
          </text>
        </g>
      `;
      break;
    }

    case 'piano': {
      const hz = output.hz ?? 0;
      const active = isRunning && hz > 0;
      const key = output.key;
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">8-Key Synthesizer</text>
          <circle cx="102" cy="92" r="34" fill="${active ? '#06b6d4' : '#1f2937'}" filter="${
            active ? 'drop-shadow(0 0 16px #06b6d4)' : 'none'
          }"/>
          <text x="102" y="97" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">
            ${key !== null && key !== undefined ? `KEY ${key + 1}` : 'IDLE'}
          </text>
          <text x="102" y="154" text-anchor="middle" font-size="14" font-family="monospace" font-weight="bold" fill="${
            active ? '#06b6d4' : textMuted
          }">
            ${active ? `${hz} Hz` : lang === 'th' ? 'ไม่มีการกดคีย์' : 'No Key Pressed'}
          </text>
          <text x="102" y="176" text-anchor="middle" font-size="10" fill="${textMuted}">Keys: D2–D9 | Piezo: D10</text>
        </g>
      `;
      break;
    }

    case 'heat': {
      const degC = (output.tempC ?? 25).toFixed(1);
      const volt = (output.voltage ?? 0.75).toFixed(3);
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">TMP36 Sensor (A0)</text>
          <circle cx="102" cy="92" r="34" fill="${isDark ? '#1e293b' : '#fee2e2'}" stroke="#ef4444" stroke-width="2"/>
          <text x="102" y="97" text-anchor="middle" font-size="16" font-family="monospace" font-weight="bold" fill="#ef4444">
            ${degC} °C
          </text>
          <text x="102" y="154" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="${text}">
            Vout = ${volt} V
          </text>
          <text x="102" y="176" text-anchor="middle" font-size="10" font-family="monospace" fill="${textMuted}">ADC: ${output.adc ?? 153} / 1023</text>
        </g>
      `;
      break;
    }

    case 'plant': {
      const rel = output.relativePercent ?? 50;
      const cond = (output.condition ?? 'ok').toUpperCase();
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">SSD1306 OLED (0x3C)</text>
          <rect x="28" y="48" width="148" height="78" rx="8" fill="#040814" stroke="#38bdf8" stroke-width="1.8"/>
          <text x="102" y="80" text-anchor="middle" font-size="18" font-family="monospace" font-weight="bold" fill="#38bdf8">${rel}%</text>
          <text x="102" y="106" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#facc15">[${cond}]</text>
          <text x="102" y="156" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="${text}">
            Raw ADC: ${output.adc ?? 600}
          </text>
          <text x="102" y="178" text-anchor="middle" font-size="10" fill="${textMuted}">SDA: A4 | SCL: A5 | AO: A0</text>
        </g>
      `;
      break;
    }

    case 'force': {
      const adc = output.adc ?? 0;
      const bell = output.bell === true;
      const angle = output.angle ?? 0;
      componentVisual = `
        <g transform="translate(530, 78)">
          <rect x="0" y="0" width="205" height="210" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="102" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">FSR Gauge & Bell</text>
          <circle cx="102" cy="92" r="34" fill="${bell ? '#f59e0b' : isDark ? '#1e293b' : '#f1f5f9'}" filter="${
            bell ? 'drop-shadow(0 0 16px #f59e0b)' : 'none'
          }"/>
          <text x="102" y="97" text-anchor="middle" font-size="15" font-family="monospace" font-weight="bold" fill="${
            bell ? '#ffffff' : text
          }">
            ${bell ? '🔔 ALARM' : 'QUIET'}
          </text>
          <text x="102" y="154" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="${text}">
            FSR: ${adc} | Dial: ${angle}°
          </text>
          <text x="102" y="176" text-anchor="middle" font-size="10" fill="${textMuted}">Servo: D9 | Buzzer: D8</text>
        </g>
      `;
      break;
    }
  }

  const height = Math.max(320, 105 + lesson.connections.length * 40);

  return `
    <svg viewBox="0 0 760 ${height}" width="100%" height="100%" class="schematic-svg" style="background: ${bg}; border-radius: 12px; font-family: 'Plus Jakarta Sans', 'Prompt', sans-serif;">
      <!-- Header Bar -->
      <rect x="18" y="14" width="724" height="46" rx="10" fill="${cardBg}" stroke="${stroke}" stroke-width="1.2"/>
      <text x="34" y="42" font-size="13.5" font-weight="bold" fill="${text}">${
        lang === 'th' ? 'ผังวงจรอิเล็กทรอนิกส์และสถานะพิน' : 'Engineering Schematic & Pin Telemetry'
      } · ${lesson.title[lang] || lesson.title.th}</text>
      <rect x="628" y="25" width="98" height="24" rx="12" fill="${isRunning ? '#059669' : '#64748b'}"/>
      <text x="677" y="41" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">${
        isRunning ? '● RUNNING' : '○ STOPPED'
      }</text>

      <!-- Left: Pin Connections Netlist -->
      ${connectionItems}

      <!-- Center: Electronic Schematic Diagram -->
      ${centerSchematic}

      <!-- Right: Live Telemetry Readout -->
      ${componentVisual}
    </svg>
  `;
}
