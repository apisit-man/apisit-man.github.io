import sys
import json
import os
import re
import uuid
import subprocess
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path

# Paths
DOWNLOAD_DIR = Path.home() / "Downloads" / "VideoClipper"
DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

PORT = 5050

class VideoHandler(BaseHTTPRequestHandler):
    def _set_cors(self, status=200, content_type="application/json; charset=utf-8"):
        self.send_response(status)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Content-Type", content_type)
        self.end_headers()

    def do_OPTIONS(self):
        self._set_cors(200)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/health":
            self._set_cors(200)
            self.wfile.write(json.dumps({"status": "ok", "download_dir": str(DOWNLOAD_DIR)}).encode("utf-8"))
            return

        if parsed.path.startswith("/api/file/"):
            # Serve downloaded file
            filename = urllib.parse.unquote(parsed.path.replace("/api/file/", ""))
            filepath = DOWNLOAD_DIR / filename
            if filepath.is_file() and filepath.resolve().is_relative_to(DOWNLOAD_DIR.resolve()):
                try:
                    with open(filepath, "rb") as f:
                        file_data = f.read()
                    self.send_response(200)
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.send_header("Content-Type", "video/mp4")
                    self.send_header("Content-Disposition", f'attachment; filename="{filename}"')
                    self.send_header("Content-Length", str(len(file_data)))
                    self.end_headers()
                    self.wfile.write(file_data)
                    return
                except Exception as e:
                    self._set_cors(500)
                    self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
                    return
            else:
                self._set_cors(404)
                self.wfile.write(json.dumps({"error": "File not found"}).encode("utf-8"))
                return

        self._set_cors(404)
        self.wfile.write(json.dumps({"error": "Not Found"}).encode("utf-8"))

    def do_POST(self):
        if self.path != "/api/download":
            self._set_cors(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))
            return

        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length).decode("utf-8")
        
        try:
            data = json.loads(post_data)
        except Exception:
            self._set_cors(400)
            self.wfile.write(json.dumps({"error": "Invalid JSON"}).encode("utf-8"))
            return

        url = data.get("url", "").strip()
        mode = data.get("mode", "full")
        start_time = data.get("start", "00:00:00").strip()
        end_time = data.get("end", "00:00:30").strip()

        if not url:
            self._set_cors(400)
            self.wfile.write(json.dumps({"error": "URL is required"}).encode("utf-8"))
            return

        try:
            import yt_dlp
        except ImportError:
            self._set_cors(500)
            self.wfile.write(json.dumps({"error": "yt-dlp is not installed"}).encode("utf-8"))
            return

        job_id = uuid.uuid4().hex[:8]
        raw_template = str(DOWNLOAD_DIR / f"temp_{job_id}.%(ext)s")
        final_filename = f"clip_{job_id}.mp4"
        final_path = DOWNLOAD_DIR / final_filename

        try:
            ydl_opts = {
                'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                'outtmpl': raw_template,
                'merge_output_format': 'mp4',
                'quiet': True,
                'no_warnings': True,
            }

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                title = info.get('title', 'video')
                safe_title = re.sub(r'[\/:*?"<>|]', '_', title)[:40].strip()

            # Find the downloaded file
            matching_files = list(DOWNLOAD_DIR.glob(f"temp_{job_id}.*"))
            if not matching_files:
                raise Exception("Downloaded file not found")
            source_file = matching_files[0]

            if mode == "clip":
                target_filename = f"{safe_title}_{start_time.replace(':', '.')}-{end_time.replace(':', '.')}_{job_id}.mp4"
                target_path = DOWNLOAD_DIR / target_filename
                
                # Use ffmpeg to cut
                cmd = [
                    "ffmpeg", "-y",
                    "-ss", start_time,
                    "-to", end_time,
                    "-i", str(source_file),
                    "-c:v", "libx264",
                    "-c:a", "aac",
                    "-avoid_negative_ts", "make_zero",
                    str(target_path)
                ]
                res = subprocess.run(cmd, capture_output=True, text=True)
                if res.returncode != 0:
                    # Fallback to copy if re-encoding fails
                    fallback_cmd = [
                        "ffmpeg", "-y",
                        "-ss", start_time,
                        "-to", end_time,
                        "-i", str(source_file),
                        "-c", "copy",
                        str(target_path)
                    ]
                    subprocess.run(fallback_cmd, capture_output=True)

                # Remove temp source
                try:
                    source_file.unlink(missing_ok=True)
                except Exception:
                    pass

                final_name = target_filename
            else:
                target_filename = f"{safe_title}_{job_id}.mp4"
                target_path = DOWNLOAD_DIR / target_filename
                source_file.rename(target_path)
                final_name = target_filename

            download_url = f"http://localhost:{PORT}/api/file/{urllib.parse.quote(final_name)}"
            self._set_cors(200)
            self.wfile.write(json.dumps({
                "status": "success",
                "title": title,
                "filename": final_name,
                "download_url": download_url,
                "save_dir": str(DOWNLOAD_DIR)
            }).encode("utf-8"))

        except Exception as e:
            self._set_cors(500)
            self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))

def run():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, VideoHandler)
    print("=" * 60)
    print(f"🎬 Video Downloader Backend Server is running!")
    print(f"📡 API Address: http://localhost:{PORT}")
    print(f"📁 Download Directory: {DOWNLOAD_DIR}")
    print("=" * 60)
    print("Press Ctrl+C to stop the server.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()

if __name__ == '__main__':
    run()
