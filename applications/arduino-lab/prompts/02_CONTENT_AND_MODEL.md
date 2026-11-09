# Stage02 — complete content and domain logic

Read the catalog, both seed modules and CONTENT_GUIDE. Integrate all 16 lessons in their fixed order, preserving bilingual objectives/meaning and canonical IDs. Expand each with translated control metadata, specs supported by sources, code walkthrough markers, two hints, prediction/observation/reflection prompts and component inspector descriptions. Audit each expansion for invented part ratings or overly precise claims.

Port or wrap the seed model/code generator with proper TypeScript types. One normalized parameter object drives the model, generated source and displays. Distinguish code settings from environmental inputs; never alter source merely because a simulated button is pressed. Keep the seed executable as an independent oracle for fixture comparison.

Expand the connection plans to terminal-complete netlists. Define parts and ports, nets and junctions, board pins, resistor endpoints, LED polarity and supply connections. Expand shorthand such as D2–D9 into actual pins. Check every lesson against its sketch. Ensure button wiring uses pull-up to GND; PWM pins are valid; RGB has three resistors; motor current bypasses GPIO; ground references are explicit.

Add meaningful tests: independent numeric fixtures, parameter normalization, all IDs, translation completeness, no NaN, edge cases, debounce, timeout, calibrated scale boundaries, code settings reflected in generated source, unknown inputs rejected. Do not assert only that functions return an object. Keep output units and model limitations explicit. Gate: all 16 content/model/netlist/code implementations complete and checked. Continue to 03.
