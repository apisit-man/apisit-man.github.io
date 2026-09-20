# Product & Engineering Backlog
Focus: `projects/home-sort-game` & Personal Website

## Priority Definitions
- **P0**: Critical bug, crash/hang vulnerability, broken core functionality, blocking regression, data loss.
- **P1**: Significant UX defect, advertised feature missing, accessibility barrier, visual glitch affecting comprehension.
- **P2**: Enhancement, polishing, bonus feature, performance optimization, refactoring.

---

## Active Backlog Items

### [P1] Freeze Falling Card Animation on Answer & Add Keyboard Badges (1-5)
- **Problem**: When a child taps the correct room or misses, the card continues to slide downward while confetti or wrong feedback appears, causing visual clipping into category buttons. Also, category buttons don't indicate keyboard shortcuts (1-5) for teacher keypads or desktop players.
- **Impact**: High (improves game feel, prevents visual overlap, makes keyboard shortcuts discoverable).
- **Effort**: Low (1-2 hours).
- **Risk**: Low.
- **Acceptance Criteria**:
  - Upon answer evaluation (`handleCorrect` or 3rd `handleWrong`), `card.style.transitionDuration` is stopped at its current position.
  - Category buttons show keyboard number badges `[1]`, `[2]`, `[3]`, etc.
  - Pressing 1-5 continues to work reliably.

### [P1] Round Length Selection (8, 10, 12 cards) & Speed Options
- **Problem**: README lists "เลือก 8, 10 หรือ 12 บัตรต่อรอบ" and "เลือกความเร็ว", but current UI hardcodes `rounds = 10` and `speed = "normal"` without selector controls.
- **Impact**: Medium-High (fulfills README feature promise, enables quick rounds for younger kids).
- **Effort**: Medium.
- **Risk**: Low.
- **Acceptance Criteria**:
  - Settings or start screen chips allowing selection of 8, 10, or 12 cards per round.
  - Speed selector (ช้า / ปานกลาง / เร็ว) integrated with `speedMs`.

### [P1] Web Audio Context Unlock & Speech Synthesis Fallback
- **Problem**: Mobile browsers (especially iOS Safari) can block Web Speech API or AudioContext if not triggered inside an active touch gesture, leading to silent gameplay.
- **Impact**: Medium (ensures audio plays on mobile tablets/iPads in schools).
- **Effort**: Medium.
- **Risk**: Low.
- **Acceptance Criteria**:
  - First touch / click explicitly resumes AudioContext.
  - Speech synthesis failure has visual text fallback so kids aren't left stranded.

### [P2] Teacher / Whole-Class Projector Mode
- **Problem**: In classroom settings on projectors, large buttons and automatic pause after each card give the teacher time to discuss before moving on.
- **Impact**: Medium (enhances educational value in kindergarten classrooms).
- **Effort**: Medium.
- **Risk**: Low.
- **Acceptance Criteria**:
  - Toggle for "โหมดครูสอน (Teacher Mode)" which pauses after each card until spacebar or next button is pressed.

### [P2] Per-Difficulty High Score Storage
- **Problem**: High scores are currently saved globally in `localStorage["homeSortHighScore"]`, merging 3-room (easy) scores with 5-room (hard) scores.
- **Impact**: Low-Medium.
- **Effort**: Low.
- **Risk**: Low.
- **Acceptance Criteria**:
  - Separate high score tracking per difficulty level (`homeSortHighScore_easy`, etc.).
