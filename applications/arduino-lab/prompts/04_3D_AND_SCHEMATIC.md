# Stage04 — procedural 3D and circuit fallback

Implement an original Uno-compatible board and the full reusable component set required by the 16 lessons. Read the per-lesson parts/netlists before building scenes. Use procedural Three.js geometry; do not fetch reference assets. Make pin group roles, polarity and wiring readable. Every scene must show its actual distinct parts; no repeated generic board passed off as16 completed circuits.

Create camera controls with mouse/touch plus HTML rotate/zoom/reset buttons. Add pin/component picking, selection inspector and focus camera. Implement drag/press gestures for supported inputs with capture and cancellation cleanup. Use the same state actions as HTML inputs. Prevent camera motion from swallowing normal page scroll. Bound zoom/pan and offer reset.

Build a legible SVG electrical schematic from the same terminal-complete netlist, with correct connectivity, junction dots, labels and state indicators. Supply accessible HTML control alternatives. Automatically use SVG if WebGL2 creation fails or context is lost. The simulation must be independent of renderer availability. Keep parameters and current output across mode switches.

Reuse the board; dispose per-lesson resources/listeners and maintain one loop. Limit DPR/geometry cost; reduce motion; avoid constant rendering while stopped. Qualitative moving dots must be labeled signal activity, not current measurements.

Test every lesson in 3D and SVG, context loss, camera reset, pointer cancellation and 32 lesson changes. Record unverified rendering if the browser lacks WebGL rather than claiming it passed. Continue to 05 after the visual gate.
