# TikTok / Reels / Shorts Technical Specifications & UI Safe Zones

---

## 📱 Video Resolution & Encoding

* **Resolution:** `1080 x 1920` px (Aspect Ratio: `9:16` Vertical).
* **Frame Rate:** `30 fps` (smooth motion, minimal rendering footprint).
* **Video Codec:** `H.264` (`libx264`), Profile `High`, Pixel Format `yuv420p`.
* **Audio Codec:** `AAC` stereo, Bitrate `192 kbps`, Sample Rate `44.1 kHz`.
* **Total Video Length:** `28` to `34` seconds (ideal retention sweet spot).

---

## 🛡️ Safe Zones for TikTok & Reels Overlay

TikTok and Instagram overlays cover significant portions of the vertical canvas:
* **Top 15% (0 - 280 px):** Search bar, LIVE pill, Following/For You tabs. Keep faces and focal text below `y = 280`.
* **Right 15% (920 - 1080 px):** Creator avatar, Like, Comment, Bookmark, Share icons. Keep action left/centered.
* **Bottom 22% (1500 - 1920 px):** Account handle, sound ticker, auto-captions, search bar.
  * **Optimal Burned-In Subtitle Position:** `y = h - th - 320` (centered horizontally at `x = (w - text_w)/2`). This keeps the subtitle clearly readable directly above the TikTok description box.

---

## ✍️ Subtitle Styling Best Practices
* **Font Choice:** Modern high-legibility Thai sans-serif fonts:
  * `Leelawadee UI` (`LeelawUI.ttf`)
  * `Tahoma Bold` (`tahomabd.ttf`)
  * `Sarabun / Prompt`
* **Size:** `44 - 48 px` for 1080p canvas.
* **Background Pill:** Semi-transparent black box (`box=1:boxcolor=black@0.55:boxborderw=20`) to guarantee 100% legibility over any bright or dark background art.
