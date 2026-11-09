# Build-kit validation

Validated on 9 November 2026 using Node.js v24.22.1.

## Executed successfully

```text
node scripts/verify-kit.mjs
PASS: 16 bilingual lessons; 64 UI phrases; 11 prompts;
seed/source coverage and required files.

node --test tests/seed.test.mjs
25 tests; 25 passed; 0 failed; 0 skipped.
```

Coverage includes all lesson model/code exports, timing, active-low/debounced button behavior, one-toggle-per-press, ADC/PWM endpoint/integer mapping, RGB, strict light threshold, ultrasound timeout, one-shot sound, piano octave, illustrative motor duty, quantized TMP36 conversion, nominal servo bounds, stepper reversal, relative moisture calibration/clamping, FSR threshold and mutually exclusive parking indicators. The helper checks actually export sketch files and stage a build in a temporary Git checkout, verifying dry-run behavior, preservation of the original site entry, and refusal to overwrite uncommitted/edited app files.

These are seed/helper checks. They do not establish completed application UI, WebGL rendering, physical hardware performance, successful Arduino C++ compilation or live GitHub deployment. The corresponding acceptance gates are assigned to Antigravity explicitly.

The report's links/anchors, JSON data, prompt sequence, required-file references and archive inventory are also checked during packaging. No reference application bundles are included.
