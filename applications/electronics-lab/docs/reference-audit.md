# Reference Audit: Electronics 101 (LED Polarity)

## Overview & Investigation Target
- **Target URL**: `https://electronics-101-six.vercel.app/led-polarity`
- **Methodology**: Static observation and browser inspection (REA principles: separating direct observations, inferences, and design decisions).
- **Date**: 2026-11-10

## Observations Log

| ID | Question / Inspection Area | Action / Input | Observed Result | Source | Confidence | Limitations |
|---|---|---|---|---|---|---|
| **OBS-01** | Content Structure & Navigation | Inspect sidebar / menu | Static navigation lists 48 lessons across 7 categories: Basics (9), Resistors (8), LEDs/diodes (5), Capacitors (9), Switches/buttons (4), Transistors (6), Sensors (7). | DOM inspection | High | Only LED Polarity inspected in detail; remaining 47 lessons unverified. |
| **OBS-02** | LED Polarity Initial State | Load `/led-polarity` | Exposed tabs: Overview, Components, Circuit, Maths. Circuit initialized with 3 V battery, 220 Ω resistor, red LED (forward). | UI inspection | High | Internal simulation engine details not exposed in DOM. |
| **OBS-03** | Polarity Inversion Behavior | Toggle long-leg polarity to minus | Explanation text and calculation formulas updated to reflect reverse bias. | UI interaction | High | Reverse breakdown behavior was not modeled (approximated as non-conducting). |
| **OBS-04** | Breadboard vs Bench & Reset | Toggle bench/breadboard mode; click Reset | Selecting mode changes description; Reset restores forward polarity and bench mode. | UI interaction | High | 3D visual rendering of breadboard was not verified due to WebGL limitations in audit runner. |
| **OBS-05** | Localization & Deep Links | Open language menu; navigate next lesson | Thai is not available in language menu (EN/other). Clicking next lesson navigates to `/led-colours`. | UI interaction | High | Hash-based deep link persistence was unverified. |
| **OBS-06** | Runtime & State Verification | Click Power switch | Power toggle did not yield a stable verified POWER ON state in the test browser. Progress indicator changed from 0/5 to 1/5. | Test environment | Medium | WebGL was unavailable in the test environment. Completion rules not formally documented on site. |

## Unknowns & Boundary Assumptions
1. **WebGL / 3D Rendering**: Not guaranteed across all student devices; 2D SVG schematic must be the 100% capable primary visual interface with lazy-loaded 3D.
2. **Reverse Breakdown**: The reference site approximates reverse current as zero. Physical LEDs break down around 5V reverse voltage, but educational low-voltage circuits (< 5V) can safely treat reverse bias as non-conducting ($I \approx 0$).
3. **Completion Criteria**: The reference site incremented progress on visit/click; our implementation must enforce pedagogical engagement (Predict $\to$ Experiment $\to$ Explain) before awarding completion.
