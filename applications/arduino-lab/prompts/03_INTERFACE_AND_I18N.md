# Stage03 — interface, language and persistence

Implement the complete responsive shell from PRODUCT_SPEC, using original design and Thai-first typography. Navigation: home/about, lessons/search, components and settings. Lesson workspace: view mode, model controls/readout, overview/connections/code/specs, code and serial, challenge/reflection and lesson navigation. Do not leave fake controls or placeholder panels.

Create exactly th/en dictionaries from the supplied seed and expand missing entries. All visible and accessible text follows locale, including tooltips, error messages, print and serial descriptions. Keep code identifiers unchanged. Locale precedence: valid URL lang, saved choice, Thai. Switching locale preserves model state and selected lesson; update document language/title. Avoid translating UI by scanning/replacing DOM strings.

Implement hash routing with fixed IDs, refresh/back/forward, unknown route fallback and share links that preserve nested pathname. Namespaced versioned local storage must tolerate unavailable/corrupted/quota-limited storage. Track explicit lesson completion, not automatic completion on Run. Reset only this application's keys and provide undo/confirmation for clearing its progress.

Use semantic controls, focus handling, skip link, non-colour status indicators and accessible tabs. Keep camera keys inactive in text fields/controls. Test Thai and English at 320/390/768/1440px and200% zoom. Gate: navigation/localization/persistence work before integrating3D. Continue to 04.
