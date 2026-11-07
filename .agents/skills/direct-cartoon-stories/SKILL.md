---
name: direct-cartoon-stories
description: Produce editable animated cartoon stories with consistent characters, Thai dialogue and captions, and verified video output. Use for stickman storytelling, two-character conversations, vintage rubber-hose cartoons, educational explainers, การ์ตูนเล่าเรื่อง, สติ๊กแมน, การ์ตูนคุยกัน, or turning a script into an animated MP4 in Antigravity or another coding agent. Supports local code animation, externally generated assets, and storyboard-only requests.
---

# Cartoon Story Director

Produce an actual directed cartoon, not a succession of title slides. Follow the user's language; default to Thai. Treat this as a production workflow, not a video model or a promise of free generation. This file is self-contained; no companion skill is required to understand it. Write project code and obtain dependencies when executing it.

## 1. Establish the brief and available capabilities

Read the user's script, reference images, existing project, and constraints. Ask only questions that block execution; otherwise state assumptions and continue. Preserve user edits. Do not scan the entire computer to locate projects.

Record `production/brief.json` with:
- topic, purpose, audience, language, target_seconds;
- aspect_ratio, width, height, fps, style, animation_mode;
- voice_mode, caption_mode, budget_limit, provided_assets;
- desired deliverables and any explicit stop/approval point.

Defaults when unspecified: 60 seconds, 1920x1080, 30 fps, two original characters, Thai, `dialogue-stickman`, local-code animation, burned captions plus SRT, no external generation spending. Use 1080x1920 for an explicit Reels/Shorts brief. Do not silently shorten a requested long video; divide it into chapters. A first test may be short while the complete output retains its requested duration.

Inspect only the selected workspace: OS/shell, Node/npm, project dependencies, Chromium availability, ffmpeg/ffprobe, Thai fonts, and usable audio/image tools. Record versions and blockers in `production/environment.md`. Do not assume that an Antigravity subscription includes a video-generation endpoint, a TTS service, or unlimited credits.

Choose the production route:

| Route | Use | Dependency | Honest output |
| --- | --- | --- | --- |
| Local code, default | Reusable stickman rigs, controlled action, dialogue | Node, compatible Remotion/React, browser renderer; audio optional | Editable animation and MP4 when rendering works |
| Hybrid | Illustrated backgrounds or designed characters with code motion | Available image tool or supplied images, plus renderer | Composite animation; label limited-motion scenes accurately |
| Generated clips | Complex fluid performance or a specific video-model request | A verified authorized video service and budget | Generated clips assembled into a video; continuity needs checking |
| Director only | User asks for script/storyboard/prompts | No media service | Production plan, never claim a finished video |

Prefer user recordings for voice. Otherwise use a verified configured Thai TTS service within the authorized budget; use installed local TTS only if it actually supports usable Thai. If none is available, finish a clearly labelled silent animatic, script and timed recording guide. Do not invent an audio file or hold all progress waiting for a voice provider. If full narration is mandatory, mark the remaining deliverable blocked and ask only for the missing recording/provider choice.

## 2. Build a story with visible causality

Create `production/script.md` and `production/storyboard.json`. For a short story, use an opening situation, a concrete problem, an attempt, a visible consequence, and a payoff. For educational work, state one observable learning objective and include a moment where the learner predicts, tests, compares, or explains. Avoid making the AI character an infallible authority. Verify factual claims when they need sources; store claim-to-source notes in `production/sources.md`.

Keep dialogue speakable and concise. Do not infer Thai speech duration from whitespace word counts. Read or synthesize a short representative passage, measure it, and plan from that rate. If voice is absent, mark estimates as provisional.

Specify each shot with a stable ID, purpose, framing, characters, stage positions, props, dialogue, acting beats, sound cues, and exit state. Give every shot a visible action or meaningful change in expression. Use cuts for narrative meaning, not a compulsory cut every few seconds. Avoid excessive motion in an instructional explanation.

Use this JSON contract; expand it for the real project:

```json
{
  "version": 1,
  "fps": 30,
  "width": 1920,
  "height": 1080,
  "style": "dialogue-stickman",
  "duration_frames": 180,
  "characters": ["learner", "partner"],
  "shots": [{
    "id": "s01",
    "start_frame": 0,
    "duration_frames": 180,
    "purpose": "Raise a question",
    "framing": "medium two-shot",
    "characters": ["learner", "partner"],
    "props": ["paper-bridge"],
    "entry_state": "Bridge lies flat; learner holds one coin",
    "exit_state": "Learner points to the sagging bridge",
    "dialogue": [{
      "id": "u01", "speaker": "learner",
      "text": "ทำไมสะพานกระดาษถึงแอ่นนะ",
      "start_frame": 30, "end_frame": 130,
      "audio_path": null, "timing_status": "estimated"
    }],
    "beats": [{"frame": 15, "actor": "learner", "action": "Place coin; paper bends"}],
    "caption_ids": ["c01"],
    "sfx": [],
    "transition": "cut"
  }],
  "captions": [{"id": "c01", "shot_id": "s01", "start_frame": 30,
    "end_frame": 130, "text": "ทำไมสะพานกระดาษถึงแอ่นนะ"}]
}
```

All dialogue, beat, caption and SFX frames are SHOT-LOCAL. Shot starts are GLOBAL. Ranges use inclusive start and exclusive end. Convert to global exactly once when composing/exporting SRT. The example is six seconds, not the default full brief.

## 3. Lock character design and choose one style

Write `production/character-bible.json`: stable ID, silhouette, proportions, palette, distinctive accessory, stroke width, eye/mouth set, personality, voice assignment, and allowed expressions. Create one reusable rig per character; change pose and expression, not identity, between shots. Track held objects, facing, relative scale, and screen direction across cuts. Do not mirror text with a flipped character.

| Preset | Design | Performance |
| --- | --- | --- |
| `bold-stickman` | Rounded black limbs, clear circular head, restrained accent colour | Clear silhouette, anticipation, one readable action, reaction hold |
| `dialogue-stickman` | Two distinguishable rigs, restrained simple setting | Turn taking, eyelines, listening poses, gestures tied to meaning |
| `rubber-hose-1930` | Original monochrome characters, curved flexible limbs, optional cream background | Smooth arcs, squash/stretch, elastic recovery, gentle vintage texture |

For rubber-hose, construct limbs from curved vector paths; straight sticks with a sepia filter are insufficient. Keep grain subtle and deterministic. Do not introduce violent flicker. Use original designs, not recognizable studio characters or copied scenes.

Define a small pose library: idle, listen, point, think, explain, surprise, agree, walk. Anchor feet to the ground and hands to held props. Use anticipation/action/settle phases rather than moving every element at constant speed. Keep the listener's mouth closed except for their own dialogue; permit small listening reactions.

Render a character sheet and a representative 5–10 second shot with Thai text, two speakers if relevant, a hand/prop interaction, and the chosen style. Inspect it before expanding. This is an internal quality gate: continue automatically after correcting issues unless the user explicitly asked to approve it first.

## 4. Build the renderer reproducibly

Prefer React + TypeScript + Remotion with SVG character rigs. If the workspace already has a valid renderer, reuse it. Otherwise create an isolated subdirectory, never overwrite an unrelated application. Use a compatible current scaffold from official documentation, then pin actual versions with a lockfile. Keep Remotion packages on matching versions; use APIs present in the installed version.

Consult the official Remotion skills when available, loading only relevant animation, audio, captions and rendering guidance. Do not download a large collection of unrelated skills or execute third-party install scripts blindly. Record any borrowed code and retain its license. This skill is an original workflow synthesis; it does not ship those projects' engines.

Suggested project components:
- `src/Root.tsx`: composition registration and metadata;
- `src/Story.tsx`: shot timeline;
- `src/characters/`: reusable rigs and pose utilities;
- `src/scenes/`: independently editable scenes;
- `src/overlays/`: Thai captions and optional branding;
- `public/`: local audio, fonts and licensed assets;
- `production/`: brief, script, storyboard, timing, sources and QA;
- `out/`: renders and inspection images.

Derive render state from the current frame. Use the project's supported frame/interpolation APIs; avoid wall-clock timers, CSS keyframe animation, unseeded randomness, and network fetching during rendering. Preserve local/global frame semantics. Wait for fonts and assets before capturing frames. Use semantic beat anchors so dialogue changes can retime action without rewriting every scene.

Expose props for style, caption visibility, audio levels and brand image. Implement separate layout rules for landscape and portrait instead of stretching or cropping the same stage. Reserve a caption region and account for the intended platform's interface overlays. Defaults: approximately 5% content margin and captions away from the bottom edge; inspect at actual phone size and adjust.

Use provided branding only when requested. If the user asks for a subtle logo without further values, propose or apply 0.15 opacity with proportional sizing, away from subtitles. Never invent an official organizational logo.

## 5. Produce audio, timing and Thai captions

Prefer one audio file per dialogue turn; map each to its character and measure duration. Maintain stable voice settings. Spell out ambiguous abbreviations in the speech script while preserving the intended display text. Check Thai names, numbers and technical terms.

Finalize audio before locking final shot lengths. Align supplied audio using a supported transcriber/aligner, then inspect Thai transcription and timings against the actual script. Do not treat generated word timestamps as ground truth. If tools cannot align Thai well, use manually checked phrase boundaries. If narration is longer than the target, shorten the script or extend the shot according to the brief; never truncate speech silently.

Label mouth animation accurately:
- speaker-interval or amplitude-driven open/closed mouths = approximate talking animation;
- timed phoneme/viseme shapes = phoneme-based lip sync only after a compatible alignment method is verified.
Do not claim precise Thai lip sync from a sine wave or generic amplitude envelope. Close mouths during silent intervals.

Render captions as text overlays, not text baked into AI-generated pictures. Use an available licensed Thai font and wait for it to load. Segment Thai at sensible phrase boundaries; preserve combining marks and use a Thai-aware segmenter where available. Avoid English-style space splitting and character-by-character slicing. Prefer one or two lines, inspect wrapping and reading pace, and shorten crowded phrases. The JSON timing drives both burn-in and SRT. Label provisional SRT as estimated until audio is aligned.

Duck background music under speech. Use only authorized audio or original synthesis. Measure peaks and loudness when tools exist and listen when possible. Treat a loudness target as a project choice, not a universal platform requirement; never report listening verification if audio playback was unavailable.

## 6. Validate before full rendering

Create and RUN project-local validation code using the data contract, with errors that include shot/cue IDs. Verify:
1. Positive integer fps, dimensions, duration and shot durations; unique IDs.
2. Shots in chronological order; no gaps or overlaps in the base shot timeline; first starts at zero and last ends at duration_frames. Implement transitions within allocated ranges unless explicitly modelling overlaps.
3. Every local cue satisfies 0 <= start < end <= shot duration; every beat lies within its shot.
4. Character/speaker IDs, caption references and asset paths resolve; placeholder null audio is allowed only in a declared animatic.
5. Captions and dialogue map consistently to the correct shots; no accidental duplicate audio.
6. Exact total duration matches the final brief or a disclosed accepted revision.

Test the validator with one valid fixture and invalid fixtures for an out-of-bounds cue, a missing speaker and a timeline gap. Run TypeScript/build checks supported by the project. Render low-resolution previews before final export.

Inspect representative stills: first/middle/last frame per shot, important action frames, and cut boundaries. Make a contact sheet; open it, not merely save it. Watch a moving preview to inspect movement and audio/video synchronization when playback is available. Still images cannot prove smooth motion or correct sound. Verify at least one portrait preview if portrait is requested.

Score each dimension 0 (failed), 1 (needs correction), 2 (meets brief): story clarity, character continuity, meaningful acting, speech/timing, Thai captions, composition, technical output. Use 12/14 with no zero as a working acceptance target, not a validated scientific benchmark. Mark unavailable checks `not tested`; do not count them as passes or fabricate an aggregate score. Fix failed dimensions scene by scene, preserving working scenes. After two unsuccessful attempts at the same issue, identify the concrete blocker and provide the usable output plus next action.

## 7. Render, verify and hand off

Use the local project's actual composition ID, entry point and installed CLI. Inspect CLI help when version flags differ. Example command shape, only after confirming those values:

```sh
npx remotion render src/index.ts Story out/story.mp4
ffprobe -v error -show_entries format=duration:stream=codec_type,codec_name,width,height,r_frame_rate -of json out/story.mp4
```

Export an interoperable MP4 (normally H.264, yuv420p; AAC when audio exists) using supported renderer/encoder settings. Verify the actual file, size, resolution, frame rate, duration tolerance of one frame, expected audio stream, and last frame. Do not merely rename a preview to MP4. Render a separate silent animatic filename if narration is missing. Test output playback when possible.

Deliver only files actually created: MP4 or clearly labelled animatic, editable project and lockfile, script/storyboard, SRT, character sheet/contact sheet, and `production/qa-report.md`. Keep user-facing status concise: completed, remaining limitations, and how to revise one scene. Record precise rerender commands and actual versions in the project. Never claim an Antigravity end-to-end test unless it ran there. A successful code or metadata check alone is not visual validation.

Preserve a project manifest of input hashes, chosen settings and asset paths. On revisions, rebuild affected scenes/assets and dependent timing only. Avoid repeated media generation when inputs have not changed. Do not upload or publish automatically unless requested. Keep API keys out of files and logs; respect the user's stated spending limit.

## Example requests

- "ใช้ direct-cartoon-stories สร้างการ์ตูนคุยกันภาษาไทย 60 วินาที เรื่อง AI เป็นคู่คิด สำหรับครูประถม แนวนอน ใช้ตัวละคร 2 คน ไม่ใช้บริการเสียเงิน ถ้ายังไม่มีเสียงให้ทำ animatic พร้อมบทอัดเสียงก่อน"
- "สร้างการ์ตูนเส้นดำหนา 45 วินาที เรื่องแรงเสียดทาน ให้ตัวละครทดลองผลักกล่องบนสองพื้นผิว ใช้เสียงที่แนบและทำซับไทย"
- "สร้างการ์ตูน rubber-hose ขาวดำ 30 วินาที ตัวละครพยายามหยิบหมวกที่ลมพัด ให้เห็นการเคลื่อนไหวจริงและส่ง MP4 พร้อมไฟล์แก้ไข"
- "แก้เฉพาะฉาก s03 ให้ตัวละครหยุดคิดก่อนตอบหนึ่งวินาที คงหน้าตาและเสียงเดิม แล้วตรวจซับกับระยะเวลาทั้งเรื่องใหม่"

## Source notes and capability boundaries

Research snapshot: 7 November 2026. Recheck current documentation when installing; these are references, not instructions to execute arbitrary downloaded code.

- Antigravity skill specification: https://antigravity.google/docs/skills — folder + SKILL.md, descriptions for discovery. Current workspace path: `.agents/skills/direct-cartoon-stories/SKILL.md`; documentation also retains `.agent/skills` compatibility. Global paths can vary by release; verify before using one.
- Google authoring codelab: https://codelabs.developers.google.com/getting-started-with-antigravity-skills — focused procedures and optional supporting resources.
- Official renderer skills: https://www.remotion.dev/docs/ai/skills and https://github.com/remotion-dev/skills — consult for installed-version implementation. Check renderer licensing for the intended usage rather than equating no API key with no cost.
- Frame API: https://www.remotion.dev/docs/use-current-frame — frame-based rendering and sequence-relative time.
- Creator project: https://github.com/nispa/stickman-video — demonstrates reusable action rigs, recorded-voice retiming and render inspection. Its engine is NOT included here.
- Creator project: https://github.com/kaomei/stickman-video-director — distinguishes shot planning from assembled illustrated videos; it reports agent-dependent outcomes. Its assets/services are NOT included here.
- Practitioner report: https://www.reddit.com/r/ClaudeAI/comments/1tbcoft/claude_code_wrote_every_line_of_our_50s_launch/ — one user's experience favours a clear creative brief and scene-level iteration. Anecdotal, not a comparative benchmark.
- Practitioner report: https://www.reddit.com/r/ClaudeCode/comments/1qm976d/tried_the_new_remotion_agent_skills_with_claude/ — reports useful motion-graphics results. Does not establish cartoon-animation quality or Thai speech support.

The Genhaha promotional image is a visual reference, not a verified specification of its downloadable skills. Do not claim this workflow is Genhaha's code, an official Google skill, or proven optimal across agents. It is an original synthesis designed for practical iteration.
