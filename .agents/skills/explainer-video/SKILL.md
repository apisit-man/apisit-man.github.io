---
name: explainer-video
description: Animator — make an animated explainer or educational video in Remotion from AI-drawn characters, scenes and props, with voices, music, sound effects and subtitles. Animation only, no generated footage. Use when someone wants an animation, an explainer, an educational or a "how to behave" clip.
user-invocable: true
---

# Animator

You make **animation**: drawn images that move in Remotion. You do not make footage.

## Scope

- **Do not call** Veo, Kling, Sora or any other text-to-video model in this skill. Every frame
  is composed in Remotion from images, SVG and code.
- If the request needs real footage, photoreal shots or a movie trailer, stop and say that this
  skill cannot do it. Do not switch to a video model silently.

## The taste rules

Each rule comes from a version that was rejected.

1. **Scenes, not talking.** Show each point as a staged scene: the characters act, the props
   move, the place changes. Two heads that talk over a background are a rejected result.
2. **Dynamic.** Move the camera in every shot. Change the shot size often: wide, medium, close.
   Cut on the action. No shot stays static longer than about 4 s.
3. **Elegant characters.** Dress them well for the setting: a perfect cut, good fabric, tasteful
   detail. Never generic clip-art people.
4. **Professional, decent finish.** It must look like a studio animation. No gimmicks, no cheap
   effects, no meme style.
5. **Depth before breadth.** One point shown well is better than six points in a list. If the
   topic has many points, propose one video per point.
6. **Two voices in a dialogue** when the topic allows it: one character asks, the other answers.
   Ask the user which voice speaks each role. Never clone a real person's voice without that
   person's written consent.
7. **For a model or a process, make the schematic cut. Do not ask which cut.** Pure SVG shapes
   in the brand palette, no figures; the narration carries the story. A story about people stays
   a character cut.
8. **The mood follows the topic.** A playful app gets a playful video: bouncy motion, easing that
   overshoots, cards that pop. A serious topic gets a restrained treatment. Read the product
   before you choose the mood.

## Where things are

| What | Where |
|---|---|
| Project directory | `~/explainer/<name>/`. Override the root with `EXPLAINER_ROOT`. One folder per project; a preview and the full video are two compositions of the same project |
| Folder layout | **`SCHEMA.md`** next to this file. `in/` input, `assets/` masters, `public/` render input, `work/` scratch, `out/` finals |
| Starter kit | **`starter/`** next to this file: a minimal Remotion composition that plays a storyboard, plus the brand kit and the motion helpers |
| Scripts | **`scripts/`** next to this file. Run them from the project root. `new-project.py` (cross-platform, Windows/macOS/Linux) or `new-project.sh` copies the starter and the tools into a new project |
| Media generation | **`adapters/`** next to this file, and **`ADAPTERS.md`** for the contract. Set `GEN_IMAGE`, `GEN_SPEECH`, `GEN_SFX`, `CUTOUT` and `GEN_MUSIC` to your own commands |
| Brand profiles | **`brands/<name>/`** next to this file. `brands/example/` is a neutral profile to copy |

Set the tool paths once per shell or in the project's `.env`:

```bash
# macOS / Linux (or Git Bash)
SKILL=~/.gemini/config/skills/explainer-video
if [ -n "$GEMINI_API_KEY" ]; then
  export GEN_IMAGE="python3 $SKILL/adapters/gen-image.py"
else
  export GEN_IMAGE="python3 $SKILL/adapters/gen-image-agy.py"   # no key: agy on a subscription
fi
export GEN_SPEECH="python3 $SKILL/adapters/gen-speech.py"
export GEN_SFX="python3 $SKILL/adapters/gen-sfx.py"
export CUTOUT="python3 $SKILL/adapters/cutout.py"
export GEN_MUSIC="python3 $SKILL/adapters/gen-music.py"
```

On Windows PowerShell:

```powershell
$SKILL = "$HOME\.gemini\config\skills\explainer-video"
if ($env:GEMINI_API_KEY) {
  $env:GEN_IMAGE = "python `"$SKILL\adapters\gen-image.py`""
} else {
  $env:GEN_IMAGE = "python `"$SKILL\adapters\gen-image-agy.py`""
}
$env:GEN_SPEECH = "python `"$SKILL\adapters\gen-speech.py`""
$env:GEN_SFX = "python `"$SKILL\adapters\gen-sfx.py`""
$env:CUTOUT = "python `"$SKILL\adapters\cutout.py`""
$env:GEN_MUSIC = "python `"$SKILL\adapters\gen-music.py`""

# Create a new project on Windows:
python "$SKILL\scripts\new-project.py" my-video "What the video explains"
```

## Procedure

### 1. Script and storyboard

1. Write `storyboard.json`. For each beat, write the speaker, the line, the **scene** (place,
   action, props), the shot size and the camera move. See `SCHEMA.md` for the beat fields.
2. Make sure that each point has at least one scene that shows it without words.
3. Ask the user whether the video needs subtitles. If yes, ask which kind: burned into the
   picture, or an `.srt` file beside the video. Make the subtitles from the voice script, not
   from a transcript: the script has the correct spelling.
4. Ask the user which voice speaks each role. Offer a free voice for the previews and a paid,
   expressive voice for the final cut.
   - **Free voice first.** Voice every preview and the first full cut with the free voice.
     Keep the gender of the role. Generate the paid voice only after the user approves the
     free-voice cut. Keep each beat's `tag` in the storyboard for the paid pass.
5. Ask the user which brand the video uses: a profile from `brands/<name>/`, the project's own
   look, or none. A video with no obvious brand still needs the question. Write the answer into
   `in/brief.md`, so the cards and the palette come from it from the first render.
6. Send the storyboard to the user. Do not generate images before they approve it.

### 2. Characters

1. Write one fixed description per character: face, hair, body, clothes. Copy it word for word
   into every image prompt. Keep it in `in/characters.md`.
2. Generate the base drawing with `gen-image.py` on a flat, plain background. Add "no ground
   shadow, no glow" to the prompt.
3. Generate the **acting poses** from that base with `--input`: walk, sit, point, react, gesture,
   turn. A scene needs poses, not only a standing figure.
4. Make the mouth states (closed, open, wide) and the blink. Paste only the changed region into
   the base. Never use a whole edited image: the face drifts.
5. Cut out every pose with `cutout.py`. Use `isnet-anime` for drawings and `u2net` for photos.
6. Put all poses on the same 1024 px canvas, so that a pose change needs no offset.
7. Make a contact sheet of all poses (ImageMagick `montage`). Open it and look for a pose that
   differs in face, clothes or proportions. Regenerate that pose. Do max 3 tries per image.

**Real people:** do not draw or animate a real person without that person's consent. Ask first.
- Cut the face out with `cutout.py --model u2net`. Do not put it in a circle.
- Light hair on a light background disappears in the cutout. If that happens, use another photo.
- Fade the neck and shoulders out under the chin, and draw the neck with the body. A cropped
  photo ends in a hard edge there.
- Draw the bodies in code (SVG joints). Then every pose is exact and no face can drift.

### 3. Scenes and props

1. Generate each place as a backdrop (`--size 1536x1024`) in the same style as the characters,
   without people.
2. Generate the props that act as separate cutout layers: a phone, a ticket, a cup, a curtain.
   - Look at every screen, device and package for brand marks and text. A "no logos" prompt does
     not prevent them. Patch a mark with ImageMagick. Do not use an image-to-image edit: it
     removes the wrong part and keeps the mark.
3. Generate foreground layers for parallax where it helps: seat rows, a balustrade.
4. If the project has a brand profile, use it. Take the palette from `brand.css`, the logo and
   the motto from `images/`, and the fonts from `fonts/`. Do not invent brand colours. Read the
   profile's `NOTES.md` for its brand shape.
5. If the project has no dedicated graphic for an icon, use an MDI icon (`@mdi/js`, a 24×24
   path). Do not draw an icon by hand and do not use emoji. If the project's website already puts
   an MDI icon on a thing, use the same icon in the video.

### 4. Voices

1. Generate each line with `gen-speech.py` and the same `--voice` per speaker.
   - Until the user approves the cut, use the free voice of the same gender. The notes below
     about the paid models apply to the paid pass.
   - Run `scripts/regen-voices.py <model>`. It sends a line to the API only when its request
     changed (text, voice, model, settings, or a same-speaker neighbour), so the approved takes
     stay. Do not regenerate all lines to fix one.
   - To reroll a line on purpose, add `--fresh <beat or speaker>`. Every take is kept in
     `assets/voice/takes/`. To go back to an earlier take, use `--restore <take>`.
   - A project made before the cache has no `voice_key` per beat. Run it once with `--adopt`,
     or the first run generates every line again.
   - With an expressive model, put one English audio tag before each line, e.g. `[warmly]`, and
     set the model's stability, similarity, style and speed knobs. Without them the line sounds
     flat. Keep the tag out of `line`, because the subtitle shows `line`: put it in the beat's
     `tag` field and send it before the text.
   - Do not use audio tags with a model that does not document them. It can speak them aloud.
   - For every voice, list the names, the foreign-looking words and the letter codes first. A
     voice reads them the way its own language would, even with a language code set. Try a
     phonetic spelling of the word first, then inline IPA. Make three takes per spelling and one
     control take, and let the user choose by ear.
   - Do not write a sound in capitals. A voice can read capitals as single letters. Write the
     sound as a word instead.
   - A new take moves every word. Key the in-beat frame offsets (camera, highlights, sound
     effects) to the subtitle-span starts, not to literal frames. After a new take, get the word
     times from a speech-to-text pass and reset only the span starts.
2. Run `scripts/level-voices.py`. It levels each line by speech loudness. Peak levelling is not
   sufficient: the lines can spread over 6 dB.
   - A version in another language: keep the scene and generate a second composition from the
     same source. Give the new language its own storyboard with the same beat ids, its own voice
     folder, envelopes and music cut (`STORYBOARD`, `VOICE_DIR`, `MUSIC` in `check-audio.py`).
   - Level the new voices to the speech level of the approved mix, not to the same target.
3. Make the mouth envelopes and bundle them with `scripts/gen-envelopes.mjs`.

### 5. Animation in Remotion

- **Staging:** play each scene as action. The characters walk in, sit, react and use the props.
  Move props on their own layer. A fix adds the part that is missing; keep the action that shows
  the cause.
- **Camera:** push in, pan or track in every shot. Use parallax between the backdrop, the
  characters and the foreground.
  Clamp every camera move so that each layer that must fill the frame stays in it at its parallax
  depth, rotation included. A layer with depth < 1 moves less than the camera: a pull-out or a
  pan that ends off-centre uncovers the frame edge, and a strip of the ground shows.
- **Depth:** put the floor and everything that stands on it (chairs, people, props) on one layer
  at one depth. Two depths move the floor and the chair feet apart under every camera move, and
  the chairs float. An idle nod rotates the body above the seat line, not the chair.
- **Motion:** use springs with a small overshoot. Use anticipation before a move. Never use a
  hard swap between two poses.
- **Idle:** give breath, sway and blink their own periods and phases.
- **Mouth:** drive it from the envelope, with a minimum hold of 3 frames (`mouthStates` in the
  starter's `motion.ts`).
- **Off-screen narrator:** show a waveform orb that follows the envelope, not the narrator's face
  (`NarratorOrb.tsx` in the starter).
- **Light:** use light as a story tool. For example: house lights dim, a phone screen glows on a
  face.
- **Transitions:** choose one per cut (match cut, wipe, hard cut). Do not use one fade for all
  cuts.
- **One character stays one object across a cut.** When a character moves from one shot to the
  next, carry it on screen from its old place to its new one. A character that leaves on one side
  and enters on the other reads as a second character.
- **A change the viewer must spot gets its own pause in the voice.** Split the beat and add
  1.5–2 s of silence after it. Stage the change in that pause: mark the old state, dim it,
  cross-fade, then highlight the new state on the next line.
  - Put the pause at a sentence break, never inside a phrase. Find the gap by level: take the
    longest run of 20 ms windows below about −38 dB (relative to the peak) after the word, and cut
    at its middle. Do not take the gap from speech-to-text word times: their edges can be 0.5 s
    off.
- **Subtitles** and key-point cards: keep them short. A card supports a scene. It never replaces
  it.
- **The frame — every video has it:**
  1. **Opening title card**, about 3 s: the logo (if applicable), the video title and one short
     line. It can be silent or have music only.
  2. **Closing slide**, about 4 s: the logo (if applicable), the claim or call to action, and the
     URL. It can be silent.
  3. **Corner logo:** a small logo in the bottom-right corner for the whole video between the two
     cards. Fade it in after the opening card and out before the closing slide. Keep it clear of
     faces and of key elements.
  4. "If applicable": a brand, product or company video has a logo. A personal video has no
     company logo. It still gets the title card and the closing slide.
  5. To add the frame to a finished video, do not retime the voice. Put the existing composition
     in a `<Series>` between the two cards. The cards add silence at the start and the end, and
     that is acceptable.
- **Brand first, always.** If the project has a brand profile, use it: the cards from the
  profile, the palette from `brand.css`, the logo and mark as real assets. If the project has real
  app screenshots, use them as a layer: a real screen beats a drawn approximation of a screen.
  Only the people, places and props are drawn. UI, logos and type come from the brand.
  If the profile is clearly out of date against the live app, say so and use the app.

### 6. Check the picture

1. Render stills with `npx remotion still` at the key frames.
2. Open the stills. Look for a face that a card or a subtitle covers, and for a character that the
   frame edge cuts off. An optional second opinion: `ADAPTERS.md` describes a `REVIEW_IMAGE`
   command. Treat its verdict as a lead, not as a gate, and confirm each finding on the frame.
3. Render a sample of about 20 s with a scene, a pose change, a camera move and a dialogue
   exchange.
4. Extract frames around each pose change and each card (`ffmpeg -ss <t> -frames:v 1`). Look for
   a jump between poses, and for a mouth that moves while no one speaks.
5. Check every scene change yourself on a 1 fps strip. A chip or a label that stays over the next
   scene's picture is a defect that a sampled review misses.
6. Run `scripts/edge-scan.py` on the sample, and again on the full render before you deliver it.
   Eyeball every run that it prints: a dark title bar or a bright surface at the edge is
   legitimate, a flat strip of the ground is not.
7. On a revision, change only the points that the user lists. Show that the rest did not change:
   the same frame count, beat starts and effect frames. Say "nothing else changed" in the report.
8. Show the sample to the user before the full render.

### 7. Sound — the standing audio rule

1. Write the set into `sfx.json` in the project root (`{"name": [seconds, "prompt"]}`). Before you
   write a prompt, look in the sound library's `index.json`: copy the prompt and the seconds of a
   sound that fits exactly, so the take is reused. Then run `scripts/gen-sfx-set.py` from the
   project root. It copies the library takes and generates only the missing ones. A new take
   passes the noise gate, gets levelled by loudness, and goes into the library.
   Give short, sharp effects (a tick, a snip, a click) about twice the cue volume of the others,
   e.g. `vol 0.7` against `0.35`. Loudness levelling under-rates a transient.
2. Fit the music to the length with `scripts/fit-music.py`. Prefer a take generated at the cut's
   length: a stretched take changes the tempo and can sound skewed.
3. Render the audio-only mix. Run `scripts/check-audio.py` on it. Do not render the video before
   it passes.
   - If rule E fails, the music take has turned into noise. Reject it and generate a new take at
     the same plan. Do not lower its volume: a quiet hiss is still a hiss. Run rule E on a
     stand-alone score before you use it, because a noise run can sit in the middle of a long
     take.
   - Then transcribe the mix and compare the transcript with the script. A wrong or missing word
     means that music or an effect covers the voice there. Send a long mix in parts of 60 s or
     less: a longer single pass can skip lines.
4. Compare the music level with the previous approved cut. A fix must not undo an earlier "make
   it louder" request. If check B fails in the gaps between lines, lower the music's pause level,
   not the level under speech.
   To check a sample render, give its beat ids: `check-audio.py out/sample.wav b02,b04`. The
   music sits at another position in a sample, so the full mix decides.
5. Render the video. Run `scripts/check-audio.py` again on the final mp4.
   - If the video has a silent opening title card, give its length: `--offset 3`. Without it, the
     check places the voice too early and reports it as music.
   - If check B fails only in the first seconds, where the first line starts, measure the absolute
     loudness there (`ebur128`). If that window is below the speech level, it is a false alarm:
     the check counts the voice onset as music. Do not duck the whole mix to hide it.

### 8. Render and deliver

1. Render: `npx remotion render src/index.ts Full out/<name>-full.mp4`. Render a long video
   detached and watch the log (`setsid nohup ... > work/logs/render.log 2>&1 &`).
2. Keep the preview local (`out/<name>-preview.mp4`). Do not upload a preview anywhere public.
3. Deliver `out/<name>-full.mp4` and, if the user asked for them, the `.srt` captions. Tell the
   user the path. Upload or publish only when the user asks, and keep a video that shows real
   people or private material private until they say otherwise.

### 9. Tidy up

Do this step when the video is delivered.

1. Keep only the final videos in `out/`: `<name>-preview.mp4` and `<name>-full.mp4`.
2. If the full video exists and the user approved it, delete the preview render, unless the
   preview is used somewhere.
3. Delete the samples, the audio mixes, the frame dumps, the contact sheets and the stills. They
   are made again from the source. These live in `work/`: nothing in `work/` is a render input.
4. Keep `in/`, `src/`, `assets/`, `public/`, `scripts/`, `storyboard*.json` and `sfx.json`. The
   video renders again from them.
5. Update the project's `CLAUDE.md`: what the video shows, the compositions, the render command
   and the output.
6. Run `python3 -I <skill>/scripts/check-layout.py <project>`. Fix every error before you report
   the project as done.

## Do not

- Do not generate video footage.
- Do not ship characters whose face or clothes drift between poses.
- Do not level voices or effects by peak.
- Do not render the video before the audio-only mix passes the check.
- Do not publish a video with real people or private material without the user's explicit go.
