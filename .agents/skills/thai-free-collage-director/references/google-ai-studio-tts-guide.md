# Google AI Studio TTS Guide (Gemini API TTS)

The `thai-free-collage-director` skill integrates Google AI Studio's flagship text-to-speech engine (`gemini-3.8-flash-tts` / `gemini-3.1-flash-tts-preview`) to generate lifelike, highly expressive, smooth human-grade Thai narration automatically.

---

## 🌟 Why Google AI Studio TTS?

Traditional synthetic TTS sounds robotic, mechanical, and monotone. Google AI Studio Gemini TTS models are trained natively with conversational prosody, emotional inflection, natural breathing pauses, and accurate Thai pronunciation.

---

## 🎙️ Voice Profiles

| Voice Name | Persona & Tone | Best Suited For |
| :--- | :--- | :--- |
| **`Puck`** *(Default)* | Upbeat, playful, lively, friendly male | Story narrator, Bobby, kid / teen protagonist |
| **`Aoede`** | Breezy, warm, comforting female | Empathetic female narrator, teacher, caring voice |
| **`Zephyr`** | Bright, curious, clear | Educational explainer, science tips, tech guides |
| **`Kore`** | Calm, firm, reflective | Philosophy, mindfulness, serious takeaways |
| **`Fenrir`** | Energetic, excitable | High-action, comedy, urgent announcements |

---

## ⚙️ How It Works in Thai Free Collage Director

### 1. Automatic Synthesis with Storyboard
When rendering with `--tts auto` (or `--tts gemini`):
```powershell
python scripts/render.py --storyboard examples/sample-storyboard.json --output out/demo.mp4 --tts auto --voice Puck --music auto
```

1. **Per-Shot Speech Synthesis**:
   - The engine checks each shot for `"narration"` (or falls back to `"caption"`).
   - Generates the audio clip using Google AI Studio API via `GEMINI_API_KEY` (or `GOOGLE_API_KEY`).
2. **Dynamic Duration Sync (`--sync-duration`)**:
   - Measures the spoken duration with `ffprobe`.
   - If the speech length exceeds the shot's planned duration, it automatically extends the shot duration so words are never truncated.
   - Adds silent padding so each shot's audio exactly matches its visual scene frames.
3. **Master Track Assembly**:
   - Stitches all padded shot audios into `out/<output>-narration.wav`.
4. **Studio Audio Mastering**:
   - Mixes the narration track at volume `1.0` with the procedural lo-fi background music at volume `0.24`.
5. **SRT Subtitle Alignment**:
   - Automatically generates `.srt` subtitles whose timestamps match the synchronized speech.

---

## 🔄 Automatic Offline Fallback

If `GEMINI_API_KEY` is temporarily unreachable or quota is exceeded, the system automatically falls back to Microsoft Edge TTS:
- Male voices (`Puck`, `Fenrir`) ➡️ `th-TH-NiwatNeural`
- Female voices (`Aoede`, `Zephyr`, `Kore`) ➡️ `th-TH-PremwadeeNeural`

Video generation will always complete smoothly without failing.
