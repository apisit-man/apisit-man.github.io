# Explainer project layout — schema v1

This file is the single source for the folder layout of an explainer project.
`scripts/check-layout.py` checks a project against it. `scripts/new-project.sh` creates one.

A project has one job: it renders again from its own files. Anything that the render needs is
kept. Anything that you can make again in a minute is scratch.

## The tree

```
<project>/
├── CLAUDE.md            Project card. Fixed sections (see "CLAUDE.md template").
├── storyboard.json      The active storyboard. Code imports it, tools read and update it.
├── storyboard-<comp>.json   One more storyboard per extra composition (optional).
├── sfx.json             Sound-effect set for gen-sfx-set.py (optional).
├── package.json  tsconfig.json
├── node_modules         Installed by npm, or a symlink to a shared copy.
│
├── in/                  INPUT. What a person wrote, gave or approved. Nothing here is generated.
│   ├── brief.md             The request: audience, goal, voices, subtitles, brand.
│   ├── script.md            The voice script, if it is more than the storyboard lines.
│   ├── characters.md        Fixed text description of each character.
│   ├── music-plan.json      The request for the music.
│   ├── storyboards/         Older or alternative storyboards: <variant>.json
│   └── ref/                 Material from the person: photos, screenshots, documents.
│
├── assets/              MASTERS. Made or processed by us, costly to make again. Kept after delivery.
│   ├── voice/               Raw takes <beat>.mp3. takes/ keeps every take.
│   ├── voice-norm/          Levelled voice <beat>.wav (master copy of public/voice-norm).
│   ├── music/               Raw music takes before fit-music.py.
│   ├── characters/<name>/   Drawings and cut-outs of one character, one folder per character.
│   ├── backgrounds/  props/  screens/  faces/  brand/    Same kinds as in public/.
│   └── <anything the pipeline needs between steps>
│
├── public/              RENDER INPUT. Remotion's static root. src/ reads it through staticFile().
│   ├── voice-norm/          <beat>.wav, the levelled voice.
│   ├── mouth/               <beat>.json, the loudness envelopes.
│   ├── sfx/                 Sound effects.
│   ├── music.mp3            The fitted music of the main composition.
│   ├── music-<variant>.mp3  The fitted music of another composition.
│   ├── brand/  fonts/       From the brand profile (palette, logo, motto, fonts).
│   ├── characters/<name>/   Final cut-outs.
│   └── backgrounds/  props/  screens/  faces/
│
├── src/                 Remotion code. index.ts registers the compositions in Root.tsx.
├── scripts/             Tools for this project: copies of the shared tools and project-only scripts.
├── work/                SCRATCH. Delete any of it at any time. No code and no tool may read it.
│   ├── logs/  stills/  sheets/  mix/  review/  takes/  drafts/  old/   Where a loose file belongs.
│   └── ...
└── out/                 OUTPUT. The final videos only.
    ├── <project>-full.mp4
    └── <project>-preview.mp4
```

## The five rules

1. **Four zones, four meanings.** `in/` is input from people. `assets/` is masters. `public/` is
   what the render reads. `out/` is the result. `work/` is scratch. A file lives in exactly one
   zone.
2. **Fixed names for the kinds.** A kind of asset has one folder name in `assets/` and in
   `public/`: `voice`, `voice-norm`, `mouth`, `music`, `sfx`, `brand`, `fonts`, `characters`,
   `backgrounds`, `props`, `screens`, `faces`. Do not invent `bg`, `char`, `shots`, `ui` or
   `cast`.
3. **The tools fix some paths.** `regen-voices.py`, `level-voices.py`, `fit-music.py`,
   `check-audio.py` and `gen-envelopes.mjs` read `storyboard.json` in the project root and use
   `public/voice-norm`, `public/mouth`, `public/music.mp3`, `assets/voice` and
   `assets/voice-norm`. These paths never move. That is why the active storyboard stays in the
   root and not in `in/`.
4. **`work/` is not read by anything.** If `src/` or a tool needs a file, the file belongs in
   `assets/`, `public/` or `in/`. A generated file that a tool rewrites is allowed in `work/`
   only if the next run makes it again.
5. **`out/` holds finals.** Previews, samples, mixes and frame dumps are scratch. Delete them
   when the video is delivered (SKILL.md, step 9).

## storyboard.json

The storyboard is the source of truth for the script, the timings and the voices. The renderer
imports it and the tools rewrite it.

```
{
  "gap_s": 0.4,
  "voices": {"narrator": {"voice_id": "en-GB-SoniaNeural"},
             "guide":    {"voice_id": "en-US-GuyNeural"}},
  "beats": [
    {"id": "b01", "speaker": "narrator", "line": "The line that is spoken.",
     "tag": "warmly",
     "scene": "what the viewer sees: place, action, props",
     "shot": "medium", "camera": "slow push in"}
  ]
}
```

- `gap_s` is the silence between two beats, in seconds. Required.
- `voices` maps a speaker name to the voice id that the speech tool understands. Required.
- `tag` is an optional audio tag for an expressive speech model. It is not part of `line`,
  because the subtitle shows `line`.
- `scene`, `shot` and `camera` are for the person or the agent that writes the composition. The
  tools do not read them.
- A beat can carry an absolute `start` frame. It then wins over the running sum.

`regen-voices.py` adds the fields that the renderer and the audio check read:

| Field | Meaning |
|---|---|
| `voice_key` | Hash of the request. A beat regenerates only when it changes. |
| `voice_s`, `frames` | Length of the take, in seconds and in frames at 30 fps. |
| `gain_db` | Peak normalisation that was applied. |
| `start_s`, `start_frame` | Where the beat starts in the composition. |
| `voice_file` | `assets/voice-norm/<id>.wav`. |
| `total_s`, `voice_model` | On the storyboard: the full length and the model that spoke it. |

## Where does a new file go?

| The file is | It goes to |
|---|---|
| A request or note from a person | `in/` |
| A screenshot, photo or document from a person | `in/ref/` |
| An older storyboard, or one that you do not use now | `in/storyboards/` |
| A raw voice take | `assets/voice/` |
| A levelled voice | `assets/voice-norm/` and `public/voice-norm/` |
| A raw music take | `assets/music/` |
| A cut-out of a character | `assets/characters/<name>/` and `public/characters/<name>/` |
| A generated place, prop or UI screen that the video shows | `public/backgrounds/`, `public/props/`, `public/screens/` (and a master in `assets/` if it was cut or processed) |
| A logo, mark or font | `public/brand/`, `public/fonts/` (copy from the brand profile) |
| A log, a still, a contact sheet, a review answer, a mix, a draft render | `work/<kind>/` |
| A final video | `out/` |

## CLAUDE.md template

Every project card has these sections in this order. Keep the first line, the router marker.

```
<!-- router: <one line: what the video is, status, where the final is> -->
# <project> — <title>
## What it is        Topic, language, voices, brand, length. 3–6 lines.
## Compositions      Id → storyboard file → output file. One row each.
## Status            Dated list. The newest entry first. Approved / delivered.
## Render            The exact commands: stills, preview, full.
## Layout            "Follows ../SCHEMA.md" and every deviation, with the reason. No deviation: say "none".
## Decisions         Choices that the user made, with the date and the reason.
```

## Deviations

A project can deviate when a tool or an old composition forces it. Write the deviation in the
project's `## Layout` section. `check-layout.py` then shows it as a note, not as an error.
