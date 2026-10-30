# STEM Tug of War — QA report

## Automated tests performed

| Test | Result |
|---|---|
| 100 question schemas, 20 in each category, unique IDs | PASS |
| Scoring: blue/red correct +1 tug, incorrect opponent +0.5 | PASS |
| Clamping at ±6, ties, round wins, match wins | PASS |
| Paired questions matched category and difficulty | PASS |
| Desktop game navigation & simultaneous side button input | PASS |
| Mobile 390×844 no horizontal overflow, quiz buttons visible | PASS |
| Timer pause and resume | PASS |
| Play 2 rounds by correctly answering 6 times per round | PASS |
| Winning at tug -6 / match winner / rematch reset | PASS |
| 60-second timeout with equal tug => draw | PASS |
| Teacher Studio add, edit, delete | PASS |
| Teacher Studio JSON import, export, reset | PASS |
| Browser JS page errors from exercised flows | NONE |

## Known limitations
- Two teams play on one shared screen only; true network multiplayer has not been implemented.
- SVG/animation implemented and tested in Chromium, not physically measured on a hardware Interactive Whiteboard.
- Questions are newly authored educational content; teachers should review suitability against local grade-level curricula.
- Teacher changes live in browser localStorage and must be exported for portable backup.
- The standalone file uses system fonts offline. The multi-file website may load Noto Sans Thai/Outfit when online.
