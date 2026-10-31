---
name: extract-video-from-link
description: Extract, download, or save videos and audio from links (Twitter/X, YouTube, TikTok, Reddit, Instagram, Facebook, Vimeo, and other web links) directly to the user's PC (defaulting to the user's Downloads folder). Use whenever the user asks to download, extract, rip, save, or fetch a video from a link or URL, or mentions 'download video', 'save video', 'extract video', or provides a media link to store locally.
---

# Extract Video from Link

Download and save videos or media from URLs (such as X/Twitter, YouTube, Reddit, TikTok, Vimeo, etc.) directly onto the user's computer, defaulting to their local `Downloads` folder.

## Core Principles

1. **Be Autonomous**: When given a URL to download/extract, do not ask unnecessary questions. Execute immediately and deliver the result.
2. **Robust Invocation**: Always invoke `yt-dlp` via `python -m yt_dlp` instead of raw `yt-dlp.exe`, because on Windows Python script directories (`AppData\Roaming\Python\Python3xx\Scripts`) are often not in system `PATH`.
3. **Self-Healing Dependencies**: If `yt-dlp` is missing, silently or promptly install it with `pip install yt-dlp` and immediately proceed.
4. **Always Verify**: Check the downloaded file's existence, filename, and size in the target folder before confirming completion to the user.

---

## Workflow Steps

### 1. Check / Install Dependencies
Check if `yt-dlp` is available:
```powershell
python -m yt_dlp --version
```
If not installed or errors out:
```powershell
pip install yt-dlp
```

### 2. Determine Output Directory
Unless specified otherwise by the user, default to the user's `Downloads` folder:
- Windows: `$HOME\Downloads` (e.g. `C:\Users\<User>\Downloads`)

### 3. Download the Media
Run `yt-dlp` pointing to the target directory:

```powershell
python -m yt_dlp "<URL>" -P "$HOME\Downloads"
```

#### Common Options:
- **Default (Best single stream or auto-mux)**:
  ```powershell
  python -m yt_dlp "<URL>" -P "$HOME\Downloads"
  ```
- **Custom Filename Template**:
  ```powershell
  python -m yt_dlp "<URL>" -o "$HOME\Downloads\%(title)s [%(id)s].%(ext)s"
  ```
- **Extract Audio Only (e.g. MP3/M4A)**:
  ```powershell
  python -m yt_dlp -x --audio-format mp3 "<URL>" -P "$HOME\Downloads"
  ```

### 4. Verify Downloaded File
Check the file in the download directory:
```powershell
Get-ChildItem -Path "$HOME\Downloads" | Sort-Object LastWriteTime -Descending | Select-Object -First 3 Name, Length, LastWriteTime
```

### 5. Final Report
Report clearly to the user:
- **File Name**: (e.g. `video_title.mp4`)
- **Full Path**: (e.g. `C:\Users\username\Downloads\video_title.mp4`)
- **File Size**: in MB or KB

---

## Common Pitfalls & Edge Cases

- **`yt-dlp` not recognized in PATH**: Never run `yt-dlp` directly in PowerShell without checking. Always use `python -m yt_dlp`.
- **Twitter / X Links**: Links ending in `/video/1` or standard tweet URLs (e.g., `https://x.com/<user>/status/<id>`) work directly with `python -m yt_dlp`.
- **Missing `ffmpeg`**: Twitter videos and many web videos download directly as single MP4 streams without needing `ffmpeg`. If a service requires muxing and `ffmpeg` is absent, yt-dlp will select the best single-file format available.
