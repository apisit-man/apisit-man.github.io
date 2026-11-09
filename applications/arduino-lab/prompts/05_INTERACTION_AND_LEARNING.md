# Stage05 — integrate experiments and learning

Connect the run clock, normalized controls, transient environment inputs, model, renderers, generated code, readouts and bounded serial log. Use one source of truth. Run starts actual model time without fake compiling/uploading. Stop freezes/cancels active outputs, audio and callbacks. Reset restores documented defaults and elapsed time. Source-generation setting changes during Run update model/source together or explicitly restart consistently. Environmental changes update readings without pretending to edit code.

Implement all 16 interactions from CONTENT_GUIDE, including button hold/toggle/debounce, potentiometer slider/knob, independent RGB channels, light threshold, distance/no echo, one-shot tone, eight-key piano, driver PWM, quantized TMP36 reading, nominal servo command, configurable stepper, relative moisture, qualitative FSR and parking thresholds. Use code walkthrough markers rather than brittle hardcoded line numbers. Do not fake serial outputs unrelated to the model. Announce sampled status accessibly without flooding screen readers.

Implement audio only after user gesture; mute and Stop/blur/visibility/lesson-change release sound. One voice in piano; handle simultaneous keys consistently. Add printable lesson notes with schematic, current generated example, challenge and reflection. Copy/download/share need success/error feedback in both languages.

Add progressive hints and predict/observe/explain prompts. Completion is the learner's explicit action and uses neutral wording such as explored, not proof of mastery. Gate: demonstrate at least one meaningful scenario for each lesson in both visual modes. Continue to 06.
