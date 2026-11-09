# Acceptance gates — required before a ready-to-publish claim

Record actual pass/fail/blocked with commands and evidence paths. Screenshots alone do not prove a working model. Seed tests alone do not prove an application.

## Automated gates

- Catalog has exactly 16 unique ordered IDs; every lesson has both locales, controls, input metadata, connections/netlist, scene, generated example and learning task.
- Locale key parity, no missing values or third-language selector; `document.lang` and accessible names match selection.
- Typecheck and production build pass with lockfile; no missing assets; no runtime server endpoints or private credentials.
- Pure model and independent fixture tests cover low/mid/high bounds, strict/inclusive thresholds, clamp and invalid values, button edge/debounce and time advancement.
- Code generator and model share normalized parameter values; code snippets use documented pins; unsafe/unknown input values cannot produce `undefined`, NaN, invalid code injection or paths.
- App integration verifies input→model→readout→code where applicable; language/view switching preserves experiment state; Stop cancels pending animation/audio and log timers.
- Unknown hash/locale and corrupt/blocked localStorage degrade safely.
- Built assets load under a non-root URL with no `/assets` or server-route dependency.
- Dependency and asset license inventory exists. No copied reference bundles/artwork in distributable or source.

## Browser checks

Use current desktop Chromium plus at least one other available browser. Test a touch-capable narrow viewport and keyboard-only navigation. If a browser cannot run, record the exact untested case.

| Scenario | Required result |
|---|---|
| Open `index.html?lang=th#button` fresh | Thai, button lesson selected, no 404 or root-path asset request |
| Switch to English, choose project, browser Back | Correct prior lesson; language behavior matches URL/state rules |
| Refresh deep link | Same lesson and valid URL-selected locale |
| Storage permission blocked/corrupt JSON | In-memory application works; translated status if saving fails |
| Run blink at 250/250 |2Hz conceptual period, time-based LED output and matching generated delays |
| Hold button in toggle mode >1s | Exactly one toggle after debounce; release+press adds one more |
| Button drag outside/window blur | No stuck press; next interaction works |
| Knob ADC0,512,1023 | PWM0,127,255; duty0,~49.8%,100%; D9 output |
| RGB255/0/255 | Magenta command, correct three PWM values and separate resistors |
| Light399,400,401 at threshold400 | LED on,off,off |
| Distance30cm then no echo | About1749µs,~30cm; then unknown, not0cm |
| Tone440Hz/1000ms | Single tone begins on user start, ends; Stop/mute/hidden tab stops sound |
| Piano press+release each of 8 keys | Correct pitch; no stuck notes; octave5 doubles modeled frequency |
| Motor PWM0/255 | Stationary/full illustrative speed; driver/diode/common ground shown |
| Temperature25°C |~0.75V and reconstructed value within quantization tolerance |
| Servo30/90/150 | Corresponding nominal orientation; code uses Servo.write values |
| Stepper reversal | Commanded count changes direction without jumping/resetting unexpectedly |
| Plant800,575,350 | Relative0,50,100%; clamped outside endpoints |
| FSR699/700 | Bell off/on at default 700; raw reading never labeled as calibrated force |
| Project near/far and adjacent measured values | Mutually exclusive lights; unknown when no echo; explain µs quantization |
| Switch3D→SVG→3D during interaction | Same parameters/readout/run state |
| WebGL unavailable/context lost | Working SVG view, controls, code and serial remain usable |
| Keyboard only | Every action operable; visible focus; no camera shortcuts while typing |
|320px and200% zoom | No clipped Thai labels or inaccessible offscreen controls |
| Print in both locales | Legible lesson, schematic, pinout, code and task; no cropped code |
|32 lesson changes + repeated Run/Stop | One animation loop; bounded logs; no growing listeners/audio nodes |

Near exact distance thresholds, use the seed's measured value including integer-µs quantization. A displayed rounded15.0cm can represent a value just over15; show additional precision in the diagnostic view and explain this. Tests must assert the model's actual measured value, not the input slider label alone.

## Evidence to retain

`app/RELEASE_REPORT.md` must list: commit/checkpoint, dependency versions, browser/OS/viewports, test command/results, build size, network failures, manual accessibility/Thai review, 3D/fallback status, C++ compilation status, deployment status and unresolved issues. Save local screenshots for Thai desktop, English mobile, one animated scene, SVG fallback and print preview. Do not mark an unavailable verification as passed.

## Release blockers

Missing lessons/translations; dummy interactions; mismatched circuits/code; no working fallback; broken nested hosting; fake compilation claims; runtime secrets or dependence on the reference; unresolved critical accessibility or lifecycle errors. Physical firmware compilation can remain explicitly unverified because this release is a browser learning model, but never label the `.ino` examples compiled or hardware-tested without evidence.
