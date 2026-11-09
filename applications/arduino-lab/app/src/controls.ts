import type { LessonData, Locale } from './types';

export function renderControlsForLesson(
  lesson: LessonData,
  params: Record<string, any>,
  inputs: Record<string, any>,
  lang: Locale = 'th'
): string {
  switch (lesson.id) {
    case 'board': {
      return `
        <div class="space-y-3 text-xs">
          <p class="text-slate-600 dark:text-slate-300">
            ${
              lang === 'th'
                ? 'สำรวจบอร์ด Arduino Uno R3: พินดิจิทัล (D0-D13), แอนะล็อก (A0-A5), จ่ายไฟ (5V, 3.3V, GND) และพอร์ต USB Type-B'
                : 'Explore Arduino Uno R3: Digital I/O (D0-D13), Analog inputs (A0-A5), Power rails (5V, 3.3V, GND), and USB.'
            }
          </p>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span class="font-bold text-slate-800 dark:text-white block mb-1">
              ${lang === 'th' ? 'ไฟ LED บนบอร์ด (D13 - Built-in)' : 'On-Board LED (D13)'}
            </span>
            <span class="text-slate-500">
              ${
                lang === 'th'
                  ? 'เชื่อมต่อกับขา D13 บนบอร์ดโดยตรง เมื่อรันแบบจำลอง ไฟจะติดสว่างเป็นสีแดง'
                  : 'Directly wired to pin D13. When running, the built-in LED illuminates.'
              }
            </span>
          </div>
        </div>
      `;
    }

    case 'blink': {
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-onMs" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'เวลาเปิด (On Time - ton)' : 'On Time (ton)'}</span>
              <span id="label-onMs" class="font-mono text-brand-600 font-bold">${params.onMs ?? 500} ms</span>
            </label>
            <input id="slider-onMs" type="range" class="param-slider w-full accent-brand-600" min="50" max="2000" step="50" value="${
              params.onMs ?? 500
            }" data-param="onMs" aria-label="On Time in ms">
          </div>
          <div>
            <label for="slider-offMs" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'เวลาปิด (Off Time - toff)' : 'Off Time (toff)'}</span>
              <span id="label-offMs" class="font-mono text-brand-600 font-bold">${params.offMs ?? 500} ms</span>
            </label>
            <input id="slider-offMs" type="range" class="param-slider w-full accent-brand-600" min="50" max="2000" step="50" value="${
              params.offMs ?? 500
            }" data-param="offMs" aria-label="Off Time in ms">
          </div>
        </div>
      `;
    }

    case 'button': {
      const isPressed = inputs.pressed === true;
      return `
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <div class="text-sm font-bold text-slate-800 dark:text-white">
                ${lang === 'th' ? 'ปุ่มกดจำลอง (D2 Active-Low)' : 'Tactile Push Button (D2)'}
              </div>
              <div class="text-xs text-slate-500 mt-0.5">
                D2: <strong id="readout-d2" class="font-mono ${isPressed ? 'text-amber-500' : 'text-slate-400'}">${
        isPressed ? '0 (LOW/Pressed)' : '1 (HIGH/Pull-Up)'
      }</strong>
              </div>
            </div>
            <button id="btn-press-input" class="px-5 py-3 rounded-xl font-bold text-sm text-white select-none transition-transform active:scale-95 shadow-md ${
              isPressed ? 'bg-amber-600 shadow-amber-500/30' : 'bg-brand-600 hover:bg-brand-500 shadow-brand-500/25'
            }" aria-label="Push Button Input">
              ${isPressed ? (lang === 'th' ? 'ปล่อยปุ่ม' : 'Release') : (lang === 'th' ? 'กดปุ่ม (Press)' : 'Press Button')}
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label for="select-btn-mode" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                ${lang === 'th' ? 'โหมดสวิตช์ (Switch Mode)' : 'Switch Mode'}
              </label>
              <select id="select-btn-mode" class="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium">
                <option value="hold" ${params.mode === 'hold' ? 'selected' : ''}>${
        lang === 'th' ? 'กดติด-ปล่อยดับ (Hold)' : 'Momentary Hold'
      }</option>
                <option value="toggle" ${params.mode === 'toggle' ? 'selected' : ''}>${
        lang === 'th' ? 'กดติด-กดดับ (Push Toggle)' : 'Push Toggle'
      }</option>
              </select>
            </div>
            <div>
              <label for="slider-debounce" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>${lang === 'th' ? 'หน่วงเวลา Debounce' : 'Debounce Filter'}</span>
                <span id="label-debounce" class="font-mono text-brand-600 font-bold">${params.debounceMs ?? 30} ms</span>
              </label>
              <input id="slider-debounce" type="range" class="param-slider w-full accent-brand-600" min="10" max="100" step="5" value="${
                params.debounceMs ?? 30
              }" data-param="debounceMs" aria-label="Debounce duration in ms">
            </div>
          </div>
        </div>
      `;
    }

    case 'knob': {
      const adc = inputs.adc ?? 512;
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-adc" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'หมุนลูกบิด Potentiometer (แอนะล็อก A0)' : 'Potentiometer Wiper (A0)'}</span>
              <span id="label-adc" class="font-mono text-brand-600 font-bold">${adc} / 1023</span>
            </label>
            <input id="slider-adc" type="range" class="input-slider w-full accent-brand-600" min="0" max="1023" step="1" value="${adc}" data-input="adc" aria-label="Potentiometer ADC value">
          </div>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
            ${
              lang === 'th'
                ? 'แปลงแรงดัน 0-5V เป็นค่าดิจิทัล 10 บิต (0-1023) และส่งออกผ่าน PWM ขา D9 (0-255)'
                : 'Maps 0-5V input to 10-bit digital value (0-1023) and outputs PWM on D9 (0-255).'
            }
          </div>
        </div>
      `;
    }

    case 'rgb': {
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-rgb-r" class="flex justify-between text-xs font-semibold text-rose-500 mb-1">
              <span>Red (D9 PWM: 0–255)</span>
              <span id="label-rgb-r" class="font-mono font-bold">${params.r ?? 128}</span>
            </label>
            <input id="slider-rgb-r" type="range" class="param-slider w-full accent-rose-500" min="0" max="255" value="${
              params.r ?? 128
            }" data-param="r" aria-label="Red Channel PWM">
          </div>
          <div>
            <label for="slider-rgb-g" class="flex justify-between text-xs font-semibold text-emerald-500 mb-1">
              <span>Green (D10 PWM: 0–255)</span>
              <span id="label-rgb-g" class="font-mono font-bold">${params.g ?? 64}</span>
            </label>
            <input id="slider-rgb-g" type="range" class="param-slider w-full accent-emerald-500" min="0" max="255" value="${
              params.g ?? 64
            }" data-param="g" aria-label="Green Channel PWM">
          </div>
          <div>
            <label for="slider-rgb-b" class="flex justify-between text-xs font-semibold text-blue-500 mb-1">
              <span>Blue (D11 PWM: 0–255)</span>
              <span id="label-rgb-b" class="font-mono font-bold">${params.b ?? 0}</span>
            </label>
            <input id="slider-rgb-b" type="range" class="param-slider w-full accent-blue-500" min="0" max="255" value="${
              params.b ?? 0
            }" data-param="b" aria-label="Blue Channel PWM">
          </div>
        </div>
      `;
    }

    case 'light': {
      const ldr = inputs.lightAdc ?? 600;
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-lightAdc" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'ระดับแสงตกกระทบ LDR (A0)' : 'Ambient Light ADC (A0)'}</span>
              <span id="label-lightAdc" class="font-mono text-cyan-600 font-bold">${ldr}</span>
            </label>
            <input id="slider-lightAdc" type="range" class="input-slider w-full accent-cyan-600" min="0" max="1023" value="${ldr}" data-input="lightAdc" aria-label="Light sensor ADC input">
          </div>
          <div>
            <label for="slider-threshold" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'เกณฑ์ตัดสินใจเปิดไฟ (Threshold)' : 'Light Threshold'}</span>
              <span id="label-threshold" class="font-mono text-brand-600 font-bold">${params.threshold ?? 400}</span>
            </label>
            <input id="slider-threshold" type="range" class="param-slider w-full accent-brand-600" min="0" max="1023" value="${
              params.threshold ?? 400
            }" data-param="threshold" aria-label="Light threshold setting">
          </div>
        </div>
      `;
    }

    case 'sensor': {
      const dist = inputs.distanceCm ?? 30;
      const noEcho = inputs.distanceCm === null;
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-distance" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'ระยะวัตถุจำลอง (Distance)' : 'Target Distance'}</span>
              <span id="label-distance" class="font-mono text-cyan-600 font-bold">${noEcho ? 'No Echo' : dist + ' cm'}</span>
            </label>
            <input id="slider-distance" type="range" class="input-slider w-full accent-cyan-600" min="2" max="200" step="1" value="${
              dist ?? 30
            }" data-input="distanceCm" ${noEcho ? 'disabled' : ''} aria-label="Target distance in cm">
          </div>
          <div>
            <label for="slider-timeout" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'หมดเวลาสัญญาณสะท้อน (Timeout)' : 'PulseIn Timeout'}</span>
              <span id="label-timeout" class="font-mono text-brand-600 font-bold">${params.timeoutUs ?? 25000} µs</span>
            </label>
            <input id="slider-timeout" type="range" class="param-slider w-full accent-brand-600" min="1000" max="30000" step="1000" value="${
              params.timeoutUs ?? 25000
            }" data-param="timeoutUs" aria-label="Ultrasonic timeout in microseconds">
          </div>
          <div class="flex items-center gap-2 pt-1">
            <input type="checkbox" id="chk-no-echo" class="rounded accent-brand-600 cursor-pointer" ${noEcho ? 'checked' : ''}>
            <label for="chk-no-echo" class="text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
              ${lang === 'th' ? 'จำลองคลื่นไม่สะท้อนกลับ (No Echo / Out of range)' : 'Simulate No Echo / Out of range'}
            </label>
          </div>
        </div>
      `;
    }

    case 'sound': {
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-hz" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'ความถี่เสียง (Frequency)' : 'Tone Frequency'}</span>
              <span id="label-hz" class="font-mono text-brand-600 font-bold">${params.hz ?? 440} Hz</span>
            </label>
            <input id="slider-hz" type="range" class="param-slider w-full accent-brand-600" min="100" max="2000" step="10" value="${
              params.hz ?? 440
            }" data-param="hz" aria-label="Buzzer frequency in Hz">
          </div>
          <div>
            <label for="slider-duration" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'ระยะเวลาดัง (Duration)' : 'Sound Duration'}</span>
              <span id="label-duration" class="font-mono text-brand-600 font-bold">${params.durationMs ?? 1000} ms</span>
            </label>
            <input id="slider-duration" type="range" class="param-slider w-full accent-brand-600" min="100" max="3000" step="100" value="${
              params.durationMs ?? 1000
            }" data-param="durationMs" aria-label="Buzzer duration in ms">
          </div>
        </div>
      `;
    }

    case 'piano': {
      const octave = params.octave === 5 ? 5 : 4;
      const notes = [
        { name: 'C', freq: 262 * (octave === 5 ? 2 : 1), solfege: 'โด' },
        { name: 'D', freq: 294 * (octave === 5 ? 2 : 1), solfege: 'เร' },
        { name: 'E', freq: 330 * (octave === 5 ? 2 : 1), solfege: 'มี' },
        { name: 'F', freq: 349 * (octave === 5 ? 2 : 1), solfege: 'ฟา' },
        { name: 'G', freq: 392 * (octave === 5 ? 2 : 1), solfege: 'ซอล' },
        { name: 'A', freq: 440 * (octave === 5 ? 2 : 1), solfege: 'ลา' },
        { name: 'B', freq: 494 * (octave === 5 ? 2 : 1), solfege: 'ที' },
        { name: 'C2', freq: 523 * (octave === 5 ? 2 : 1), solfege: 'โดสูง' },
      ];

      return `
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              ${lang === 'th' ? 'ระดับเสียง (Octave):' : 'Octave Selection:'}
            </span>
            <div class="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <button class="btn-octave px-2.5 py-1 rounded font-semibold ${
                octave === 4 ? 'bg-brand-600 text-white' : 'text-slate-600 dark:text-slate-300'
              }" data-octave="4">Octave 4</button>
              <button class="btn-octave px-2.5 py-1 rounded font-semibold ${
                octave === 5 ? 'bg-brand-600 text-white' : 'text-slate-600 dark:text-slate-300'
              }" data-octave="5">Octave 5</button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              ${lang === 'th' ? 'แป้นคีย์เปียโน 8 เสียง (คลิกค้างเพื่อเล่นเสียง):' : 'Piano Keys (Hold to play):'}
            </label>
            <div class="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              ${notes
                .map(
                  (n, i) => `
                <button class="piano-key px-1.5 py-3.5 rounded-lg font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-brand-600 hover:text-white active:scale-95 transition-all text-center select-none" data-key="${i}" aria-label="Piano note ${n.name}">
                  <span class="block">${n.name}</span>
                  <span class="block text-[10px] text-slate-400 font-normal">${lang === 'th' ? n.solfege : n.freq + 'Hz'}</span>
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      `;
    }

    case 'motor': {
      const pwm = params.pwm ?? 128;
      const duty = ((pwm / 255) * 100).toFixed(1);
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-motor-pwm" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'ความเร็วสัญญาณขับ PWM (D5)' : 'Motor PWM Command (D5)'}</span>
              <span id="label-motor-pwm" class="font-mono text-brand-600 font-bold">${pwm} / 255 (${duty}%)</span>
            </label>
            <input id="slider-motor-pwm" type="range" class="param-slider w-full accent-brand-600" min="0" max="255" value="${pwm}" data-param="pwm" aria-label="Motor PWM value">
          </div>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            ${
              lang === 'th'
                ? 'มอเตอร์ต้องการกระแสสูง ต้องควบคุมผ่านทรานซิสเตอร์หรือมอเตอร์ไดรเวอร์ พร้อมไดโอดฟลายแบ็กป้องกันแรงดันย้อนกลับ (ไม่ระบุรอบต่อนาที RPM เนื่องจากขึ้นกับภาระโหลดจริง)'
                : 'High-current DC motor is controlled via a driver transistor and flyback diode. Displays relative duty/speed (no calibrated RPM claim).'
            }
          </div>
        </div>
      `;
    }

    case 'heat': {
      const t = inputs.tempC ?? 25;
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-tempC" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'อุณหภูมิสภาพแวดล้อม (Temperature)' : 'Ambient Temperature'}</span>
              <span id="label-tempC" class="font-mono text-rose-500 font-bold">${t} °C</span>
            </label>
            <input id="slider-tempC" type="range" class="input-slider w-full accent-rose-500" min="-40" max="125" step="1" value="${t}" data-input="tempC" aria-label="Environment temperature in celsius">
          </div>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            ${
              lang === 'th'
                ? 'เซนเซอร์ TMP36 จ่ายแรงดันเชิงเส้น 10mV/°C โดยมี Offset 500mV ที่ 0°C (ความคลาดเคลื่อนจากการปัดเศษ ADC ประมาณ ±0.25°C)'
                : 'TMP36 provides linear 10mV/°C output with 500mV offset at 0°C (ADC quantization error is ~±0.25°C).'
            }
          </div>
        </div>
      `;
    }

    case 'servo': {
      const angle = params.angle ?? 90;
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-angle" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'มุมคำสั่งของเซอร์โว (Servo Angle)' : 'Servo Command Angle'}</span>
              <span id="label-angle" class="font-mono text-brand-600 font-bold">${angle}°</span>
            </label>
            <input id="slider-angle" type="range" class="param-slider w-full accent-brand-600" min="0" max="180" value="${angle}" data-param="angle" aria-label="Servo angle command">
          </div>
          <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            ${
              lang === 'th'
                ? 'ควบคุมเซอร์โวมอเตอร์ SG90 ผ่านคำสั่ง Servo.write() โดยจำลองตำแหน่งมุมเชิงนามธรรม (0–180°)'
                : 'Commands SG90 micro-servo arm position via Servo.write() between 0° and 180°.'
            }
          </div>
        </div>
      `;
    }

    case 'stepper': {
      const steps = params.stepsPerRev ?? 2048;
      const rpm = params.speedRpm ?? 10;
      const dir = params.direction ?? 1;
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-stepsPerRev" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'จำนวนก้าวต่อรอบ (Steps/Rev)' : 'Steps Per Revolution'}</span>
              <span id="label-stepsPerRev" class="font-mono text-brand-600 font-bold">${steps}</span>
            </label>
            <input id="slider-stepsPerRev" type="range" class="param-slider w-full accent-brand-600" min="200" max="4096" step="64" value="${steps}" data-param="stepsPerRev" aria-label="Steps per rev">
          </div>
          <div>
            <label for="slider-speedRpm" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'ความเร็วรอบ (Speed RPM)' : 'Motor Speed (RPM)'}</span>
              <span id="label-speedRpm" class="font-mono text-brand-600 font-bold">${rpm} RPM</span>
            </label>
            <input id="slider-speedRpm" type="range" class="param-slider w-full accent-brand-600" min="1" max="15" value="${rpm}" data-param="speedRpm" aria-label="Speed in RPM">
          </div>
          <div class="flex items-center justify-between pt-1">
            <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              ${lang === 'th' ? 'ทิศทางการหมุน:' : 'Direction:'}
            </span>
            <button id="btn-toggle-direction" class="px-3 py-1.5 rounded-lg text-xs font-bold ${
              dir === 1 ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
            }">
              ${dir === 1 ? (lang === 'th' ? '↻ ตามเข็ม (CW)' : '↻ Clockwise') : (lang === 'th' ? '↺ ทวนเข็ม (CCW)' : '↺ Counter-Clockwise')}
            </button>
          </div>
        </div>
      `;
    }

    case 'plant': {
      const raw = inputs.moistureRaw ?? 600;
      const dry = params.dryRaw ?? 800;
      const wet = params.wetRaw ?? 350;
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-moistureRaw" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'ค่าแอนะล็อกจากเซนเซอร์ (Raw ADC A0)' : 'Moisture Sensor Raw ADC (A0)'}</span>
              <span id="label-moistureRaw" class="font-mono text-brand-600 font-bold">${raw} / 1023</span>
            </label>
            <input id="slider-moistureRaw" type="range" class="input-slider w-full accent-brand-600" min="0" max="1023" value="${raw}" data-input="moistureRaw" aria-label="Moisture sensor raw ADC">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label for="slider-dryRaw" class="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                <span>${lang === 'th' ? 'เกณฑ์แห้ง (Dry)' : 'Dry Calib'}</span>
                <span id="label-dryRaw" class="font-mono text-amber-500 font-bold">${dry}</span>
              </label>
              <input id="slider-dryRaw" type="range" class="param-slider w-full accent-amber-500" min="400" max="1023" value="${dry}" data-param="dryRaw" aria-label="Dry calibration">
            </div>
            <div>
              <label for="slider-wetRaw" class="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                <span>${lang === 'th' ? 'เกณฑ์ชื้น (Wet)' : 'Wet Calib'}</span>
                <span id="label-wetRaw" class="font-mono text-cyan-500 font-bold">${wet}</span>
              </label>
              <input id="slider-wetRaw" type="range" class="param-slider w-full accent-cyan-500" min="0" max="600" value="${wet}" data-param="wetRaw" aria-label="Wet calibration">
            </div>
          </div>
        </div>
      `;
    }

    case 'force': {
      const adc = inputs.fsrAdc ?? 0;
      const thresh = params.threshold ?? 700;
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-fsrAdc" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'แรงกดบนแผ่น FSR (แอนะล็อก A0)' : 'FSR Pressure Input (A0)'}</span>
              <span id="label-fsrAdc" class="font-mono text-brand-600 font-bold">${adc} / 1023</span>
            </label>
            <input id="slider-fsrAdc" type="range" class="input-slider w-full accent-brand-600" min="0" max="1023" value="${adc}" data-input="fsrAdc" aria-label="Force sensor ADC">
          </div>
          <div>
            <label for="slider-force-thresh" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'เกณฑ์ส่งสัญญาณเตือน (Threshold)' : 'Alarm Threshold'}</span>
              <span id="label-force-thresh" class="font-mono text-amber-500 font-bold">${thresh}</span>
            </label>
            <input id="slider-force-thresh" type="range" class="param-slider w-full accent-amber-500" min="1" max="1023" value="${thresh}" data-param="threshold" aria-label="Force threshold">
          </div>
        </div>
      `;
    }

    case 'project': {
      const dist = inputs.distanceCm ?? 30;
      const noEcho = inputs.distanceCm === null;
      const near = params.nearCm ?? 15;
      const far = params.farCm ?? 40;
      return `
        <div class="space-y-3">
          <div>
            <label for="slider-proj-dist" class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>${lang === 'th' ? 'ระยะวัตถุจำลอง (Distance)' : 'Obstacle Distance'}</span>
              <span id="label-proj-dist" class="font-mono text-cyan-600 font-bold">${noEcho ? 'No Echo' : dist + ' cm'}</span>
            </label>
            <input id="slider-proj-dist" type="range" class="input-slider w-full accent-cyan-600" min="2" max="200" value="${
              dist ?? 30
            }" data-input="distanceCm" ${noEcho ? 'disabled' : ''} aria-label="Obstacle distance">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label for="slider-nearCm" class="flex justify-between text-[11px] font-semibold text-rose-500 mb-1">
                <span>${lang === 'th' ? 'เกณฑ์ใกล้ (แดง ≤)' : 'Near (Red ≤)'}</span>
                <span id="label-nearCm" class="font-mono font-bold">${near} cm</span>
              </label>
              <input id="slider-nearCm" type="range" class="param-slider w-full accent-rose-500" min="2" max="100" value="${near}" data-param="nearCm" aria-label="Near threshold">
            </div>
            <div>
              <label for="slider-farCm" class="flex justify-between text-[11px] font-semibold text-amber-500 mb-1">
                <span>${lang === 'th' ? 'เกณฑ์กลาง (เหลือง ≤)' : 'Far (Yellow ≤)'}</span>
                <span id="label-farCm" class="font-mono font-bold">${far} cm</span>
              </label>
              <input id="slider-farCm" type="range" class="param-slider w-full accent-amber-500" min="${near + 1}" max="200" value="${far}" data-param="farCm" aria-label="Far threshold">
            </div>
          </div>
          <div class="flex items-center gap-2 pt-1">
            <input type="checkbox" id="chk-no-echo" class="rounded accent-brand-600 cursor-pointer" ${noEcho ? 'checked' : ''}>
            <label for="chk-no-echo" class="text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
              ${lang === 'th' ? 'จำลองกรณีไม่พบวัตถุ (No Echo)' : 'Simulate No Echo'}
            </label>
          </div>
        </div>
      `;
    }

    default:
      return '';
  }
}
