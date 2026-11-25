# Media adapters

The skill generates images, speech, sound effects and music through **five commands**. Nothing
else in the skill knows which provider you use. Swap a command and the rest of the pipeline is
unchanged.

| Variable | Default | Job |
|---|---|---|
| `GEN_IMAGE` | `python3 <skill>/adapters/gen-image.py` | Draw a character, a pose, a backdrop, a prop |
| `GEN_SPEECH` | `python3 <skill>/adapters/gen-speech.py` | Speak one line |
| `GEN_SFX` | `python3 <skill>/adapters/gen-sfx.py` | Make one sound effect |
| `CUTOUT` | `python3 <skill>/adapters/cutout.py` | Remove the background |
| `GEN_MUSIC` | `python3 <skill>/adapters/gen-music.py` | Compose a music bed |
| `REVIEW_IMAGE` | unset | Optional second opinion on a still |

Set them in your shell, or in a `.env` file that you source before you work on a project.

## Install the reference adapters

```bash
python3 -m venv ~/.venvs/explainer
~/.venvs/explainer/bin/pip install -r <skill>/adapters/requirements.txt
export PATH=~/.venvs/explainer/bin:$PATH

export GEMINI_API_KEY=...        # images, AI Studio
export ELEVENLABS_API_KEY=...    # speech, sound effects, music
```

`edge-tts` speech and `rembg` cutouts need no key.

Without `GEMINI_API_KEY`, set `GEN_IMAGE` to `gen-image-agy.py`. It draws through the `agy` CLI
(Antigravity) on the Google subscription that is logged in to it. It follows the same contract,
with three differences:

- It ignores `--model`. agy picks its own image model.
- It takes 40 to 50 s per image, because an agent runs around each call.
- It reads the agy transcript and fails, with no output file, if agy changed the prompt, the
  aspect ratio or the input images. It retries once.

agy uses the account in `~/.gemini/google_accounts.json`. Do not send employer material through a
personal account. A keyless setup can draw nothing, but it can
still build a full schematic video: SVG scenes, free voices, your own music file.

System tools: `ffmpeg` and `ffprobe` on `PATH`, and `numpy` for the audio scripts.

## The contracts

`regen-voices.py` and `gen-sfx-set.py` call the commands through the shell, so a command can be
a program with arguments. Keep the argument order exactly as below.

### gen-image

```
gen-image.py "<prompt>" <out.png> [--size 1536x1024] [--model <name>] [--input <base.png>]
```

- Writes a PNG to `<out.png>`.
- `--input` turns the call into an edit of an existing image. Use it for poses: the base drawing
  goes in, the changed pose comes out.
- `--size` is `<width>x<height>`. An adapter maps it to the closest ratio its provider supports.

### gen-speech

```
gen-speech.py "<text>" <out.mp3> --voice <voice_id> --model <name>
    [--language <iso>] [--stability F] [--similarity F] [--style F] [--speed F]
    [--previous-text "<line>"] [--next-text "<line>"]
```

- Writes an mp3 to `<out.mp3>`.
- `--model edge-tts` must work without a key and must reject the paid-only flags. The preview
  pipeline depends on a free model being available.
- `--previous-text` and `--next-text` keep the intonation continuous across cuts. An adapter
  that cannot support them ignores them.
- An expressive model reads the audio tag at the start of `text`. Keep the tag out of the
  storyboard's `line`: `regen-voices.py` prepends the beat's `tag` for you.

### gen-sfx

```
gen-sfx.py "<prompt>" <out.wav> --seconds <n> --seed <n>
```

- Writes a WAV. Whole seconds only; the caller trims the take to the length it needs.
- The same prompt and seed should give the same take, so a project renders again identically.

### cutout

```
cutout.py <in.png> <out.png> [--model isnet-anime|u2net]
```

- Writes a transparent PNG on the same canvas as the input.

### gen-music

```
gen-music.py <plan.json> <out.mp3>
```

- The plan is `{"prompt": "...", "length_ms": 65000}` or `{"prompt": "...", "composition_plan":
  {...}}`. See `adapters/gen-music.py` for the shape.
- Generate the take at the cut's length. `fit-music.py` only trims, tames the peaks and fades;
  a stretched take changes the tempo.

### review-image (optional)

```
review-image "<question>" <image.png|clip.mp4>
```

- Prints an answer. Use it for a second pair of eyes on a still or a short sample: "List every
  brand mark or logo. If there is none, answer NONE."
- Treat the answer as a lead. Confirm each finding on the frame yourself. Never use a score from
  an external reviewer as a release gate.
- Do not send private or employer material to an external reviewer.

## Bring your own

Any program that obeys a contract works: a local Stable Diffusion server for images, Piper for
speech, a Foley library for effects. Point the variable at it and keep the rest of the skill.

A paid call is a paid call. The scripts cache aggressively (`voice_key` per beat, a recipe key
per effect), so a rerun costs nothing unless a request changed. Keep that property in your own
adapter: write the output file only on success, and never print a key.
