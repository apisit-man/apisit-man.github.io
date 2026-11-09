import type { LessonData, Locale } from './types';

export function renderSchematicSVG(
  lesson: LessonData,
  output: Record<string, any>,
  isRunning: boolean,
  lang: Locale = 'th'
): string {
  const isDark = document.documentElement.classList.contains('dark');
  const bg = isDark ? '#090d16' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#ffffff';
  const stroke = isDark ? '#374151' : '#e2e8f0';
  const text = isDark ? '#f9fafb' : '#0f172a';
  const textMuted = isDark ? '#9ca3af' : '#64748b';
  const activeCyan = '#06b6d4';
  const ledRed = '#ef4444';
  const gndColor = isDark ? '#6b7280' : '#475569';
  const vccColor = '#dc2626';

  const pins = output.pins || {};

  // Connection rows on the left side
  const connectionItems = lesson.connections
    .map((c, i) => {
      const isHigh = (pins[c.from] ?? 0) > 0 || (pins[c.to] ?? 0) > 0;
      const wireColor = isHigh && isRunning ? activeCyan : stroke;
      const wireWidth = isHigh && isRunning ? '2.5' : '1.5';
      const y = 80 + i * 36;
      const noteText = c.note ? c.note[lang] || c.note.th : '';

      return `
      <g class="connection-row" transform="translate(30, ${y})">
        <circle cx="10" cy="10" r="5" fill="${
          c.from.includes('GND') ? gndColor : c.from.includes('5V') ? vccColor : wireColor
        }"/>
        <line x1="15" y1="10" x2="160" y2="10" stroke="${wireColor}" stroke-width="${wireWidth}" stroke-linecap="round" ${
        isHigh && isRunning ? 'stroke-dasharray="4 2"' : ''
      }/>
        <text x="25" y="6" font-size="11" font-weight="bold" fill="${text}">${c.from}</text>
        <circle cx="160" cy="10" r="5" fill="${wireColor}"/>
        <text x="175" y="14" font-size="12" font-weight="600" fill="${text}">${c.to}</text>
        ${noteText ? `<text x="270" y="14" font-size="11" fill="${textMuted}">(${noteText})</text>` : ''}
      </g>
    `;
    })
    .join('');

  // Right-hand side dynamic component diagram
  let componentVisual = '';

  switch (lesson.id) {
    case 'board':
    case 'blink':
    case 'button':
    case 'light': {
      const ledOn = output.led === true && isRunning;
      componentVisual = `
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="170" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="30" text-anchor="middle" font-size="13" font-weight="bold" fill="${text}">
            ${lang === 'th' ? 'สถานะ LED (D13)' : 'LED Output (D13)'}
          </text>
          <circle cx="95" cy="85" r="32" fill="${ledOn ? ledRed : '#1f2937'}" filter="${
            ledOn ? 'drop-shadow(0 0 16px #ef4444)' : 'none'
          }"/>
          <text x="95" y="142" text-anchor="middle" font-size="12" font-weight="bold" fill="${
            ledOn ? '#ef4444' : textMuted
          }">
            ${ledOn ? '● ACTIVE (HIGH)' : '○ OFF (LOW)'}
          </text>
        </g>
      `;
      break;
    }

    case 'rgb': {
      const hex = output.hex || '#804000';
      componentVisual = `
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">RGB (D9, D10, D11)</text>
          <circle cx="95" cy="85" r="36" fill="${isRunning ? hex : '#1f2937'}" filter="${
            isRunning ? `drop-shadow(0 0 18px ${hex})` : 'none'
          }"/>
          <text x="95" y="145" text-anchor="middle" font-size="13" font-mono font-weight="bold" fill="${text}">
            ${isRunning ? hex.toUpperCase() : 'OFF'}
          </text>
          <text x="95" y="165" text-anchor="middle" font-size="10" fill="${textMuted}">
            R:${output.r ?? 0} G:${output.g ?? 0} B:${output.b ?? 0}
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
      const kx = 95 + Math.sin(rad) * 26;
      const ky = 85 - Math.cos(rad) * 26;
      componentVisual = `
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">Potentiometer (A0)</text>
          <circle cx="95" cy="85" r="34" fill="${isDark ? '#1e293b' : '#e2e8f0'}" stroke="${stroke}" stroke-width="2"/>
          <line x1="95" y1="85" x2="${kx}" y2="${ky}" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
          <circle cx="95" cy="85" r="6" fill="#7c3aed"/>
          <text x="95" y="145" text-anchor="middle" font-size="13" font-mono font-weight="bold" fill="#7c3aed">
            ADC: ${adc}
          </text>
          <text x="95" y="165" text-anchor="middle" font-size="11" fill="${textMuted}">PWM: ${output.pwm ?? 127} (${duty}%)</text>
        </g>
      `;
      break;
    }

    case 'servo': {
      const angle = output.angle ?? 90;
      const rad = ((angle - 90) * Math.PI) / 180;
      const armX = 95 + Math.cos(rad) * 45;
      const armY = 85 + Math.sin(rad) * 45;
      componentVisual = `
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="26" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">
            ${lang === 'th' ? 'มุมของเซอร์โว (D9)' : 'Servo Arm (D9)'}
          </text>
          <circle cx="95" cy="85" r="28" fill="${isDark ? '#1e293b' : '#e2e8f0'}" stroke="${stroke}"/>
          <line x1="95" y1="85" x2="${armX}" y2="${armY}" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
          <circle cx="95" cy="85" r="6" fill="#0f172a"/>
          <text x="95" y="145" text-anchor="middle" font-size="16" font-mono font-weight="bold" fill="#0284c7">
            ${angle}°
          </text>
          <text x="95" y="165" text-anchor="middle" font-size="10" fill="${textMuted}">
            ${lang === 'th' ? 'ช่วง 0° ถึง 180°' : 'Nominal Span: 0° - 180°'}
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
        <g transform="translate(520, 80)">
          <rect x="0" y="0" width="210" height="200" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="105" y="26" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">HC-SR04 Sonar</text>
          <circle cx="65" cy="70" r="24" fill="#0284c7" stroke="${stroke}" stroke-width="2"/>
          <circle cx="145" cy="70" r="24" fill="#0284c7" stroke="${stroke}" stroke-width="2"/>
          <text x="65" y="74" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">T</text>
          <text x="145" y="74" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">R</text>
          <text x="105" y="118" text-anchor="middle" font-size="15" font-mono font-weight="bold" fill="${
            valid ? '#0284c7' : '#ef4444'
          }">
            ${valid && cm !== null ? cm.toFixed(1) + ' cm' : (lang === 'th' ? 'ไม่มีคลื่นสะท้อน' : 'NO ECHO')}
          </text>
          <text x="105" y="136" text-anchor="middle" font-size="10" fill="${textMuted}">Pulse: ${echoUs} µs</text>
          ${
            lesson.id === 'project'
              ? `
            <g transform="translate(45, 148)">
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
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">DC Motor & Driver</text>
          <circle cx="95" cy="85" r="32" fill="${isDark ? '#1e293b' : '#f1f5f9'}" stroke="${stroke}" stroke-width="2"/>
          <text x="95" y="92" text-anchor="middle" font-size="18" font-weight="bold" fill="#059669">M</text>
          <text x="95" y="142" text-anchor="middle" font-size="13" font-mono font-weight="bold" fill="#059669">
            PWM: ${output.pwm ?? 128}
          </text>
          <text x="95" y="162" text-anchor="middle" font-size="11" fill="${textMuted}">Duty: ${duty}%</text>
        </g>
      `;
      break;
    }

    case 'stepper': {
      const angle = (output.angle ?? 0).toFixed(0);
      const steps = output.steps ?? 0;
      componentVisual = `
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">28BYJ-48 Stepper</text>
          <circle cx="95" cy="85" r="32" fill="${isDark ? '#1e293b' : '#f1f5f9'}" stroke="${stroke}" stroke-width="2"/>
          <text x="95" y="92" text-anchor="middle" font-size="14" font-mono font-weight="bold" fill="#d97706">${angle}°</text>
          <text x="95" y="142" text-anchor="middle" font-size="12" font-mono font-weight="bold" fill="${text}">
            Steps: ${steps}
          </text>
          <text x="95" y="162" text-anchor="middle" font-size="10" fill="${textMuted}">Phase: ${output.phase ?? 0} (ULN2003)</text>
        </g>
      `;
      break;
    }

    case 'sound': {
      const hz = output.hz ?? 0;
      const active = isRunning && hz > 0;
      componentVisual = `
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">Piezo Buzzer (D8)</text>
          <circle cx="95" cy="85" r="32" fill="${active ? '#7c3aed' : '#1f2937'}" filter="${
            active ? 'drop-shadow(0 0 16px #7c3aed)' : 'none'
          }"/>
          <circle cx="95" cy="85" r="10" fill="${isDark ? '#090d16' : '#ffffff'}"/>
          <text x="95" y="142" text-anchor="middle" font-size="14" font-mono font-weight="bold" fill="${
            active ? '#7c3aed' : textMuted
          }">
            ${active ? `${hz} Hz` : (lang === 'th' ? 'เงียบ' : 'Silent')}
          </text>
          <text x="95" y="162" text-anchor="middle" font-size="10" fill="${textMuted}">
            ${active ? 'Tone output active' : 'noTone'}
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
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">8-Key Synthesizer</text>
          <circle cx="95" cy="85" r="32" fill="${active ? '#06b6d4' : '#1f2937'}" filter="${
            active ? 'drop-shadow(0 0 16px #06b6d4)' : 'none'
          }"/>
          <text x="95" y="90" text-anchor="middle" font-size="14" font-mono font-weight="bold" fill="#ffffff">
            ${key !== null && key !== undefined ? `KEY ${key + 1}` : 'IDLE'}
          </text>
          <text x="95" y="142" text-anchor="middle" font-size="14" font-mono font-weight="bold" fill="${
            active ? '#06b6d4' : textMuted
          }">
            ${active ? `${hz} Hz` : (lang === 'th' ? 'ไม่มีการกดคีย์' : 'No Key Pressed')}
          </text>
          <text x="95" y="162" text-anchor="middle" font-size="10" fill="${textMuted}">Keys: D2–D9 | Sound: D10</text>
        </g>
      `;
      break;
    }

    case 'heat': {
      const degC = (output.tempC ?? 25).toFixed(1);
      const volt = (output.voltage ?? 0.75).toFixed(3);
      componentVisual = `
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">TMP36 Sensor (A0)</text>
          <circle cx="95" cy="85" r="30" fill="${isDark ? '#1e293b' : '#fee2e2'}" stroke="${stroke}"/>
          <text x="95" y="90" text-anchor="middle" font-size="16" font-mono font-weight="bold" fill="#ef4444">
            ${degC} °C
          </text>
          <text x="95" y="142" text-anchor="middle" font-size="13" font-mono font-weight="bold" fill="${text}">
            ${volt} V
          </text>
          <text x="95" y="162" text-anchor="middle" font-size="10" fill="${textMuted}">ADC: ${output.adc ?? 153}</text>
        </g>
      `;
      break;
    }

    case 'plant': {
      const rel = output.relativePercent ?? 50;
      const cond = (output.condition ?? 'ok').toUpperCase();
      componentVisual = `
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">OLED & Moisture (A0)</text>
          <rect x="25" y="50" width="140" height="70" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="95" y="80" text-anchor="middle" font-size="16" font-mono font-weight="bold" fill="#38bdf8">${rel}%</text>
          <text x="95" y="105" text-anchor="middle" font-size="11" font-mono font-weight="bold" fill="#38bdf8">${cond}</text>
          <text x="95" y="145" text-anchor="middle" font-size="12" font-mono font-weight="bold" fill="${text}">
            ADC: ${output.adc ?? 600}
          </text>
          <text x="95" y="165" text-anchor="middle" font-size="10" fill="${textMuted}">SSD1306 OLED (I2C 0x3C)</text>
        </g>
      `;
      break;
    }

    case 'force': {
      const adc = output.adc ?? 0;
      const bell = output.bell === true;
      const angle = output.angle ?? 0;
      componentVisual = `
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">FSR Pressure & Bell</text>
          <circle cx="95" cy="85" r="30" fill="${bell ? '#f59e0b' : isDark ? '#1e293b' : '#f1f5f9'}" filter="${
            bell ? 'drop-shadow(0 0 16px #f59e0b)' : 'none'
          }"/>
          <text x="95" y="90" text-anchor="middle" font-size="16" font-mono font-weight="bold" fill="${
            bell ? '#ffffff' : text
          }">
            ${bell ? '🔔 ALARM' : 'QUIET'}
          </text>
          <text x="95" y="142" text-anchor="middle" font-size="13" font-mono font-weight="bold" fill="${text}">
            FSR: ${adc} | Needle: ${angle}°
          </text>
          <text x="95" y="162" text-anchor="middle" font-size="10" fill="${textMuted}">Servo: D9 | Buzzer: D8</text>
        </g>
      `;
      break;
    }

    default: {
      componentVisual = `
        <g transform="translate(530, 80)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="${cardBg}" stroke="${stroke}" stroke-width="1.5"/>
          <text x="95" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="${text}">Pin State Monitor</text>
          <text x="95" y="95" text-anchor="middle" font-size="12" fill="${textMuted}">Circuit Ready</text>
        </g>
      `;
    }
  }

  const height = Math.max(340, 110 + lesson.connections.length * 38);

  return `
    <svg viewBox="0 0 760 ${height}" width="100%" height="100%" class="schematic-svg" style="background: ${bg}; border-radius: 12px; font-family: 'Plus Jakarta Sans', 'Prompt', sans-serif;">
      <!-- Title & Header -->
      <rect x="15" y="15" width="730" height="46" rx="8" fill="${cardBg}" stroke="${stroke}" stroke-width="1"/>
      <text x="32" y="42" font-size="14" font-weight="bold" fill="${text}">${
        lang === 'th' ? 'วงจรและจุดต่อขาพิน' : 'Circuit Schematic'
      } · ${lesson.title[lang] || lesson.title.th}</text>
      <rect x="630" y="26" width="95" height="24" rx="12" fill="${isRunning ? '#059669' : '#64748b'}"/>
      <text x="677" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">${
        isRunning ? 'RUNNING' : 'STOPPED'
      }</text>

      <!-- Connections List -->
      ${connectionItems}

      <!-- Component Dynamic Output -->
      ${componentVisual}
    </svg>
  `;
}
