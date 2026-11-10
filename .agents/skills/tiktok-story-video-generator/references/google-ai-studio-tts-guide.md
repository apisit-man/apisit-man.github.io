# Google AI Studio TTS Guide (Gemini API TTS)

The skill utilizes Google AI Studio's flagship text-to-speech engine (`gemini-3.1-flash-tts-preview`) to deliver lifelike, highly expressive, smooth human-grade Thai narration.

---

## 🌟 Why Google AI Studio TTS?

Traditional synthetic TTS sounds mechanical and flat. Google AI Studio TTS models are trained natively on emotional prosody, natural pauses, speech cadence, and subtle breathing cues, making them sound like an authentic voice actor recording a cartoon storybook.

---

## 🎙️ Key Voice Profiles for Cartoon Storytelling

| Voice Name | Tone / Persona | Best Role in Cartoon |
| :--- | :--- | :--- |
| **`Puck`** | Upbeat, playful, lively, friendly male | Narrator, Bobby, Youthful protagonist |
| **`Aoede`** | Breezy, warm, comforting female | Warm feminine narrator, empathetic voice |
| **`Zephyr`** | Bright, curious, clear | Educational explainers, science / tech tips |
| **`Kore`** | Firm, dignified, calm | Serious realization, mindfulness, stoic advice |
| **`Fenrir`** | Energetic, excitable | High-action, comedy panic moments |

---

## ⚙️ Technical Implementation

```python
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})
interaction = client.interactions.create(
    model="gemini-3.1-flash-tts-preview",
    input=[{
        "type": "user_input",
        "content": [{
            "type": "text",
            "text": "ข้อความบทพากย์ภาษาไทย..."
        }]
    }],
    response_format={"type": "audio"},
    generation_config={
        "speech_config": [
            {"voice": "Puck"}
        ]
    }
)

# Output audio is 24000Hz 16-bit mono PCM.
# Converted to 192k MP3 via FFmpeg:
# ffmpeg -f s16le -ar 24000 -ac 1 -i tmp.pcm -c:a libmp3lame -b:a 192k output.mp3
```

### Automatic Fallback Architecture:
If `GEMINI_API_KEY` is not present in the environment or API quota is reached, the generator automatically switches to `edge-tts` (`th-TH-NiwatNeural` / `th-TH-PremwadeeNeural`), guaranteeing that video generation never halts or crashes.
