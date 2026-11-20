# Storyboard contract

`storyboard.json` must contain:

```json
{
  "version": 1,
  "title": "เรื่องสั้น",
  "language": "th",
  "aspect_ratio": "9:16",
  "source": "ที่มา: แหล่งข้อมูลอ้างอิง (ตัวเลือก)",
  "shots": [
    {
      "duration": 5.0,
      "headline": "ข้อความพาดหัว **เน้นคำสำคัญ**",
      "badge": "สถิติเด่น (ตัวเลือก)",
      "caption": "ประโยคสรุปภาษาไทย สามารถใส่ **ไฮไลต์คำสำคัญ** ได้",
      "narration": "บทเสียงพากย์สำหรับฉากนี้ (ระบบจะรวมทุกฉากสังเคราะห์รวดเดียวเพื่อความคงที่ของเสียง)",
      "source": "ที่มาเฉพาะฉาก (หากต้องการต่างจากภาพรวม)",
      "motif": "robot",
      "art": "art/scene_1.png",
      "art_prompt": "Detailed English visual prompt for 3D papercraft/claymation cutout generation"
    }
  ]
}
```

- Supported `motif`: `student`, `teacher`, `robot`, `ai`, `chatbot`, `book`, `bulb`, `idea`, `school`, `classroom`, `plant`, `earth`, `phone`, `recycle`, `heart`, `question`.
- Each shot needs a nonempty `headline` and `caption`, and `duration` from 1 to 180 seconds.
- Target 3–7 second shots, 5–10 words of meaningful headline or less where possible; Thai text should fit within 3 lines headline / 4 lines caption.
- Renderer uses an original deterministic paper-collage illustration library. It is not generative image-to-video.
- Narration is optional. When supplied as `--audio recording.wav`, it is muxed in. Without it, the video has captioned visuals and optionally original instrumental BGM; don't claim spoken narration.
- The deterministic paragraph importer is a fallback; an Antigravity AI agent should reason about the user story and author better shot semantics and a concise, faithful script.
- Output `.mp4`, `.srt`, `.qa.json`, and contact sheet JPG.

For improved assets, an agent may add original/licensed transparent illustrations as a later extension, but should not claim arbitrary image-to-video compatibility in the bundled renderer.

## Optional custom artwork per shot

Add `"art": "art/scene1.png"` inside a shot; path is relative to the storyboard JSON. Use a transparent PNG or WebP cutout (preferred), JPG also works. The renderer uses this original/supplied artwork instead of its generic motif and still adds motion/paper textures. Make your own assets or use licensed work; no API required.
