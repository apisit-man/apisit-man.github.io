# Product specification — Arduino Lab TH–EN

## 1. Goal and scope

Build an original browser-based introductory electronics course inspired by the reference's lesson–circuit–code relationship. The product should help learners predict an output, manipulate an input, observe evidence, and explain the relationship. The reference is not assumed to be open source. Do not copy its bundled application code, text, textures, branding or model geometry.

Release one is a **guided educational simulator**, not a SPICE circuit solver or a compiler for arbitrary Arduino sketches. A clear translated mode label explains this. Code is read-only and generated from supported lesson settings; users can copy/download `.ino` examples. A future code editor must be a separate, genuinely implemented feature.

## 2. Required experience

| Area | Behavior |
|---|---|
| Navigation | Home/about, 16 searchable lesson cards, component catalogue, settings; direct hash links and browser back/forward |
| Lesson | Title, objective, overview, interactive model, connection table, code walkthrough, specifications, challenge, reflection |
| Workspace | Large scene; resizable/collapsible content/code panels on desktop; ordered panels on narrow screens |
| Visual modes | Procedural 3D and circuit SVG; explicit mode switch; automatic fallback |
| Controls | Run, stop, reset experiment, parameter controls, camera rotate/zoom/reset, copy/share/download, progress |
| Simulation | Model outputs change with supported inputs, run-state and elapsed simulation time; bounded serial log with timestamps |
| Learning | Predict → change one input → observe → explain; hints progressive; completion is explicit, not automatically awarded by Run |
| Persistence | Local settings, completed lesson IDs, last lesson and parameters; reset only this app's keys |
| Language | Thai default; English switch; deep-link language override; persistent user choice; no third language selector |
| Printing | Current lesson, pinout, default/current code, challenge and reflection; hide controls/canvas and use schematic |

## 3. Visual design

Use a clean contemporary maker-lab identity: warm off-white `#F5F3EA`, deep ink `#182D39`, teal `#087F83`, amber `#A65B00`, restrained grid, generous spacing. Do not reproduce the reference's exact composition. Use system Thai-capable sans fonts; self-host Noto Sans Thai only if its licensed font files and OFL notice are bundled. Use a monospace code font. Thai body ≥16px, line-height ≥1.65; headings never depend on forced uppercase or letter-spacing. Minimum touch targets 44px.

Desktop ≥1100px: left rail (~220px), scene about 60% of remaining workspace, information/code about 40%, compact lesson navigation below. Tablet: compact navigation plus two columns. Mobile ≤720px: header/language, lesson selector, 3D/SVG, controls/readout, lesson tabs, code/serial, challenge. Canvas must not consume all scrolling gestures; implement a deliberate orbit interaction mode for touch and document it. No content clipping at 320px, 390px, 768px, 1024px, 1440px or 200% zoom.

## 4. Architecture

```text
app/
  index.html
  src/
    main.ts
    app/             state, routing, storage, actions
    content/         lessons, locale dictionaries, glossary
    simulation/      model, normalized parameters, run clock
    code/            generated Arduino examples + semantic line markers
    scene/           board, components, wires, camera, picking, lifecycle
    schematic/       netlist renderer, labels, SVG interaction
    ui/              navigation, lesson tabs, controls, code, serial, challenge
    styles/          design tokens, responsive styles, print
  public/            only app-owned static assets and notices
  tests/             model, content, integration, browser
  BUILD_STATUS.md
  RELEASE_REPORT.md
```

Use typed state and a small explicit action dispatcher rather than a global collection of DOM callbacks. Avoid a large UI framework unless necessary. Read all supplied seeds before deciding whether to port them to TypeScript. Keep one implementation of each model calculation; compare a port against supplied fixtures and tests. References for app components should refer to stable `data-testid` identifiers to make browser tests resilient to translation.

State includes `lessonId`, `lang`, `runState`, `simulationElapsedMs`, normalized `params`, transient `inputs`, model `output`, `viewMode`, `settings`, completed IDs. Derive `output` from model state and actions. Use monotonic elapsed simulation time; reset on explicit reset. Switching language must not reset an experiment. Changing lessons stops the old clock, sound and listeners. Changing a parameter while stopped updates the preview; time-based animation advances only while running. If source-generation settings change while running, update code and model together from that instant, or explicitly restart and tell the user.

## 5. Model/render contract

Each lesson adapter exposes `defaults`, `normalize`, `step(previous, input, params, dt)`, `reset`, `describeOutput`, `generateSketch`, `sceneSpec`, `netlist`. A UI action changes state once; 3D and SVG consume the same output. Avoid a second hidden implementation of physics in the renderer.

Clock: cap a resumed animation delta to avoid huge jumps; stop simulation while document is hidden; refresh drawing only when needed if stopped; respect reduced motion. Logs are sampled at ≤5 messages/second and capped at 200 rows. Tone requires a user gesture, gain limit and mute; do not create repeated AudioContexts.

Current-flow dots are qualitative **signal/activity indicators**. Label them as such; they are not measured electron velocities or a complete circuit solution. Do not show numeric current values without an actual resistor/supply model.

## 6. Circuit and 3D requirements

Create original Uno-compatible procedural geometry, board labels and all educational components. No official Arduino logo or copied branded board texture is necessary. Mesh visual accuracy must preserve connector roles and circuit meaning; exact mechanical CAD is optional. Add pin hotspots, component inspector, focus camera, visible wire routing and highlighted active signals. Use Catmull–Rom curves/TubeGeometry with controlled segment counts for wires. Share geometry/materials only when lifecycle ownership is explicit.

Use one canonical per-lesson netlist with named component terminals. Breadboard rows of five are connected; the centre trench separates the sides; specify whether a power rail is split. Draw actual connected nodes, junction dots and bridges; intersecting wires are not automatically connected. Avoid decorative wires that contradict the connection table. Treat button legs correctly: the same-side pair is internally connected, pressing joins opposite sides.

Dispose replaced geometries, materials, textures and listeners; reuse the board; maintain only one animation loop. Cap device-pixel ratio (e.g. 1.5 on smaller devices), support quality low/auto, and avoid heavy postprocessing. Do not claim performance thresholds until measuring on a named device/browser. Target smooth interaction on an ordinary laptop; measure load/bundle size and memory across 32 lesson changes.

SVG mode must remain fully interactive and readable, with text descriptions and HTML controls. A blank image plus a WebGL warning is not an acceptable fallback. Handle `webglcontextlost` without losing current parameters or progress.

## 7. Language and URL contract

UI locale set is exactly `{th,en}`. Priority: valid URL `lang` → stored locale → Thai. Invalid values fall back to Thai. Use `new URL(location.href)`/`URLSearchParams`; preserve other query parameters and the current filename/path. Set `document.documentElement.lang`, title, description and all accessible names. Write `th` and `en` dictionaries with exactly matching keys and no dynamic concatenation of sentences.

Share example (proposed destination): `index.html?lang=th#button`. Hashes use the 16 IDs from the catalogue; unknown/empty hash opens `board` with a helpful translated message if needed. Do not introduce server-only routes `/th/button` or `/en/button`. Same-origin static import URLs and `new URL(asset, import.meta.url)` must resolve below nested hosting paths. Never hardcode `/assets` or the user's domain in runtime code.

## 8. Local data and imports

Use namespaced keys such as `apisit:arduino-lab:v1:settings` and `…:progress`. Save a small versioned JSON object; validate IDs, locale, booleans and finite numeric parameter bounds. Reject untrusted keys and unexpected prototypes. Corrupt/blocked/quota-exceeded storage produces a translated nonblocking message and in-memory fallback. Export progress JSON is optional; if provided, validate size/schema and render all imported text as text. Do not use `innerHTML` on user-controlled content.

## 9. Electronics accuracy

Scope to Uno R3/ATmega328P, 5V logic, 10-bit ADC and 8-bit PWM on D3/D5/D6/D9/D10/D11. PWM represents duty cycle, not a real variable DC output on Uno R3. Use 220–330Ω LED resistors and one resistor per RGB channel. Physical LED choice/current must be checked against component data before construction.

The supplied button lesson deliberately uses `INPUT_PULLUP` and a switch to GND; pressed = LOW. This differs from the reference's external pull-down design and simplifies physical wiring. Explain the active-low logic explicitly. Edge-toggle mode must use debounce, and simulation must agree with the generated code.

External supplies for motors/servos must have a suitable rating and common ground. DC motor uses a driver transistor/MOSFET with flyback protection; no motor directly from an I/O pin. Do not generalize one transistor package's lead order. Servo endpoints are nominal commands and not guaranteed mechanical travel. Stepper step count is configurable and mode-dependent. Soil moisture is a calibrated relative scale, not a universal water percentage. FSR output is qualitative unless calibrated. HC-SR04 timeout returns no echo, never a false zero-distance reading. Full specifications and pin plans are in `CONTENT_GUIDE.md`.

## 10. Explicit exclusions for release one

No arbitrary code compilation, cloud AI assistant, logins, classroom accounts, analytics, saving to a server, direct hardware programming, generic free-wiring circuit solver or PWA caching. These are separate projects. Their absence must not block the requested guided course. Do not display disabled menu items advertising unimplemented features.

## 11. Completion

Pass every gate in `ACCEPTANCE.md`; produce `dist/`, a release report with real test results, dependency/license inventory and deployment instructions. A completed implementation must not rely on the reference site's uptime. Publish only the built application subtree after the user invokes the deployment prompt.
