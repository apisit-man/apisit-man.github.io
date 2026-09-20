# Product & Engineering Backlog
Focus: `projects/home-sort-game` & Personal Website

## Priority Definitions
- **P0**: Critical bug, crash/hang vulnerability, broken core functionality, blocking regression, data loss.
- **P1**: Significant UX defect, advertised feature missing, accessibility barrier, visual glitch affecting comprehension.
- **P2**: Enhancement, polishing, bonus feature, performance optimization, refactoring.

---

## Completed Items
- **[Iteration 1] [P0] Automated Test Harness & Data/Queue Safety**: Set up `node --test`, CommonJS export, pure `GameLogic`, infinite loop protection in `createQueue`, data verification of 30 cards / 5 rooms, and documentation accuracy.
- **[Iteration 2] [P1] Freeze Falling Card on Answer & Keyboard Shortcut Badges (1-5)**: Froze card transition in place upon answer feedback and miss; added accessible `.cat-key` badges to category buttons with dark-mode support.
- **[Iteration 3] [P1] Round Length Selection (8, 10, 12 cards) & Speed Options**: Added start screen chips for rounds and falling speeds (slow 15s, normal 12s, fast 9s), dynamic score and progress bar scaling.
- **[Iteration 4] [P1] Web Audio Context Unlock & Mobile Fallback**: Added explicit user gesture unpausing for AudioContext and SpeechSynthesis on mobile/iPad Safari, plus headless node testing safety.

---

## Active Backlog Items

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
