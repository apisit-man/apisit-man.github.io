# Curriculum, control metadata and accuracy notes

## Language and teaching

Use `content/lessons.json` as original seed content; expand each lesson with 3–5 concise code explanations, component specifications, a prediction prompt, progressive hint and connection details. Preserve the Thai/English meaning and model contract. The supplied connection list is an electrical design plan, **not yet a terminal-complete netlist**. Expand resistor terminals, LED anode/cathode, supply nodes and multi-pin shorthand into actual named nets before rendering. Record a per-lesson consistency review.

| English | Preferred Thai |
|---|---|
| Microcontroller | ไมโครคอนโทรลเลอร์ |
| Input / output | ข้อมูลเข้า / ผลส่งออก (or อินพุต / เอาต์พุต in component specifications) |
| Ground (GND) | กราวด์ (GND) |
| Pull-up resistor | ตัวต้านทานพูลอัป |
| Duty cycle | สัดส่วนเวลา HIGH ต่อหนึ่งคาบ |
| Threshold | เกณฑ์ตัดสินใจ |
| Analog-to-digital converter | ตัวแปลงสัญญาณแอนะล็อกเป็นดิจิทัล |
| Guided model | แบบจำลองบทเรียน |
| Relative moisture level | ระดับความชื้นสัมพัทธ์ |
| No echo | ไม่มีสัญญาณสะท้อน |

Keep identifiers `pinMode`, `INPUT_PULLUP`, `HIGH`, `LOW`, units and pin names unchanged. Human prose, tab names, hints, badges, alt text and user-facing log descriptions follow the selected language. A raw technical token such as `NO_ECHO` can appear in code, but translate the adjacent UI explanation. Use Thai-capable fonts and normal wrapping; never insert arbitrary spaces into Thai words. Physical OLED example text is ASCII because the default Adafruit display font has no Thai glyphs; explain that exception in the lesson. The web OLED representation and all browser text must still support Thai.

## Controls

`P` changes a generated sketch parameter; `I` changes the simulated environment/input, so the sketch need not change. Normalization in `seed/model.mjs` is authoritative. Add localized labels, units and bounds to the application metadata.

| Lesson | Parameter controls (P) | Input controls (I) |
|---|---|---|
| board | none | Select USB, controller, power/digital/analog pin groups |
| blink | onMs/offMs 50–3000, default 500 | none |
| button | hold/toggle; debounceMs 10–100, default 30 | Press/release, keyboard Space while focused |
| knob | none | adc 0–1023, default 512; knob drag + slider |
| rgb | r/g/b 0–255, defaults 128/64/0 | none |
| light | threshold 0–1023, default 400 | lightAdc 0–1023, default 600; brighter means higher in the chosen divider |
| sensor | timeoutUs 1000–30000, default 25000 | distanceCm 2–400, default 30; explicit no-echo checkbox maps to null |
| sound | hz 100–2000, default 440; durationMs 100–3000, default 1000 | Replay via reset/start; browser audio permission via user gesture |
| piano | octave 4 or 5 | Key 0–7 or null; pointer/keyboard; one note at a time |
| motor | pwm 0–255, default 128 | none; do not label relative speed as RPM |
| heat | none | tempC −40 to 125, default 25 |
| servo | angle 0–180, default 90 | Drag arm or use slider |
| stepper | stepsPerRev 200–4096 default 2048; speedRpm 1–15 default 10; direction ±1 | none |
| plant | wetRaw 0–973, dryRaw ≥wetRaw+50 and ≤1023; defaults 350/800 | moistureRaw 0–1023, default 600 |
| force | threshold 1–1023, default 700 | fsrAdc 0–1023, default 0; drag pad + slider |
| project | nearCm 2–100 default 15; farCm ≥ near + 1 and ≤200 default 40 | distanceCm 2–400 default 30; no echo |

When dependent limits change, normalize once, reflect the accepted values in controls/code/model, and explain adjustments unobtrusively. Do not let the UI show one value while using another. Source-generation parameters must not change silently when switching visual mode or language.

## Per-model rules and limits

- Board: D13 is HIGH while the guided example runs. Stopped mode is a preview, with physical outputs visually inactive and a clear stopped badge.
- Blink: equal 250ms on/off gives a 500ms period and 2Hz; show time in ms and period/frequency explicitly.
- Button: active-low raw D2; debounce stable state; toggle only on the debounced released→pressed edge. Press/release must work after pointer cancellation. For hold mode, code and model both follow the debounced state.
- Knob: ADC 0–1023 mapped with integer truncation to PWM 0–255. Input 512 gives PWM127, not128. Display duty as pwm/255.
- RGB: common cathode; independently current-limited channels; PWM values are simplified command intensities, not calibrated photometry.
- Light: dark when ADC is **strictly less than** threshold; equal means off. No lux claim. UI environment input is an ADC fixture, not a calibrated light-distance model.
- Distance: classic 5V HC-SR04, not the Qwiic/I2C variant. Sound speed constant 0.0343cm/µs is an approximation at ordinary room conditions. Echo duration is integer-microsecond quantized in the seed; small differences near thresholds are expected. Show enough precision or an appropriate note. No echo/timeout returns null and translated missing-data state. The source example pulseIn timeout is finite.
- Sound: passive piezo, one tone on start for configured duration. Run/Stop/replay must match the source. No sound when hidden or stopped.
- Piano: eight notes C4–C5 or C5–C6, approximated integer frequencies, single voice; lowest-index held key wins. No polyphony claim.
- Motor: relative speed=pwm/255 is a deliberately simple visual relation; it excludes startup torque, inertia, load and actual RPM. Show driver and flyback diode, common ground and external power. Do not imply motor current flows through D5.
- Heat: ideal TMP36 voltage=0.5+0.01T; ADC=round(V/5×1023); reconstructed T=(ADC×5/1023−0.5)×100. Use 1023 here consistently as an endpoint mapping convention, not a claim that real ADC transitions are exact endpoint interpolation. Quantization tolerance for the model's reconstructed temperature is about ±0.25°C; real sensor/reference errors are additional.
- Servo: nominal command and orientation; no torque, stall or feedback simulation. Avoid a false displayed measured position.
- Stepper: full-step sequence through ULN2003; default nominal 2048; explain possible real gearbox deviation and different half-step counts. Display commanded step count/angle, not guaranteed physical position. A physical motor can miss steps.
- Plant: chosen module orientation dryRaw>wetRaw; clamp mapped relative value 0–100, and require at least 50 raw counts between endpoints. Default raw 575 maps to 50. Not volumetric water content. OLED is SSD1306 128×64/I2C at 0x3C; verify actual module voltage/address before building.
- Force: qualitative ADC only. Servo command=trunc(raw×180/1023); bell activates at raw≥threshold. No calibrated N, kg or pressure units. Excludes hysteresis and sensor variation.
- Project: red at measured cm≤near; yellow at near<cm≤far; green above far. Missing echo: lights off and unknown indicator. Use quantized measured distance for decisions and show the raw underlying reading when a boundary needs explanation. This is a learning activity, not a safety product.

## Physical example verification

The seed examples are original C++ teaching templates. Node tests check generation and selected logic but **do not compile C++**. Before presenting downloads as hardware-verified, run Arduino CLI against `arduino:avr:uno` with the selected core and libraries; record versions and results. Needed libraries: Servo, Stepper, Adafruit GFX Library, Adafruit SSD1306 and their dependencies. If CLI is unavailable, label examples as not compiler-verified in the release report and the download help. Compile on the developer machine; this does not require a compilation backend in the deployed app.

For physical circuits, verify exact component package pinouts, LED current, transistor/MOSFET drive requirements, supply current and I2C voltage compatibility. Do not infer pin order from a generic mesh. Keep any construction note relevant and local to its lesson.

## Curriculum additions to generate

For each lesson, create: brief specs with sources; 3–5 code explanation steps linked by semantic markers; 2 graduated hints; a teacher discussion note; a compact component inspector entry. Avoid adding invented universal sensor accuracy or motor ratings. Add a factual source only where it supports the exact part/variant.
