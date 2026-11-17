"""
YouTube Shorts Automated Uploader using YouTube Data API v3
Allows headless or CLI uploading of generated MP4 videos to YouTube Shorts with scheduling.
"""

import os
import sys
import json
import argparse
from datetime import datetime
from pathlib import Path

from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.readonly"
]

DEFAULT_CLIENT_SECRETS = r"C:\Users\atong\Documents\antigravity\client_secret_488326214568-dpva4fd8c1l0ihjlg6asufdpf7vmrdsq.apps.googleusercontent.com.json"
DEFAULT_TOKEN_FILE = r"C:\Users\atong\Documents\antigravity\youtube_token.json"


def get_authenticated_service(client_secrets_path: str = DEFAULT_CLIENT_SECRETS, token_path: str = DEFAULT_TOKEN_FILE):
    """Authenticate and return the YouTube service object."""
    creds = None
    if os.path.exists(token_path):
        try:
            creds = Credentials.from_authorized_user_file(token_path, SCOPES)
        except Exception as e:
            print(f"⚠️ Failed to load existing token: {e}")
            creds = None

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("🔄 Refreshing expired OAuth token...")
            creds.refresh(Request())
        else:
            if not os.path.exists(client_secrets_path):
                raise FileNotFoundError(f"Client secret JSON file not found at: {client_secrets_path}")
            
            print("🌐 Starting OAuth browser authentication flow...")
            print("👉 A browser tab will open. Please log in and authorize the application.")
            flow = InstalledAppFlow.from_client_secrets_file(client_secrets_path, SCOPES)
            creds = flow.run_local_server(port=0)

        with open(token_path, "w", encoding="utf-8") as token_file:
            token_file.write(creds.to_json())
            print(f"✅ Token successfully saved to: {token_path}")

    return build("youtube", "v3", credentials=creds)


def upload_short(
    file_path: str,
    title: str,
    description: str = "",
    tags: list = None,
    privacy_status: str = "private",
    publish_at: str = None,
    category_id: str = "27",  # 27 = Education, 22 = People & Blogs
    client_secrets_path: str = DEFAULT_CLIENT_SECRETS,
    token_path: str = DEFAULT_TOKEN_FILE
):
    """
    Upload a vertical MP4 video as a YouTube Short.
    If publish_at is given (ISO 8601 format e.g. 2026-11-18T11:00:00Z), privacy_status is forced to 'private'.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Video file not found: {file_path}")

    youtube = get_authenticated_service(client_secrets_path, token_path)

    if tags is None:
        tags = ["Shorts", "ปรัชญาชีวิต", "ข้อคิดเตือนใจ", "พัฒนาตนเอง", "mindset", "แรงบันดาลใจ"]

    status_body = {
        "privacyStatus": "private" if publish_at else privacy_status,
        "selfDeclaredMadeForKids": False
    }

    if publish_at:
        status_body["publishAt"] = publish_at

    body = {
        "snippet": {
            "title": title[:100],  # Max 100 chars
            "description": description,
            "tags": tags,
            "categoryId": category_id
        },
        "status": status_body
    }

    media = MediaFileUpload(file_path, chunksize=-1, resumable=True, mimetype="video/mp4")

    print(f"🚀 Uploading '{Path(file_path).name}' to YouTube...")
    print(f"📝 Title: {title}")
    if publish_at:
        print(f"⏰ Scheduled Release: {publish_at}")
    else:
        print(f"🔒 Privacy: {privacy_status}")

    request = youtube.videos().insert(
        part="snippet,status",
        body=body,
        media_body=media
    )

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"📤 Upload progress: {int(status.progress() * 100)}%")

    video_id = response.get("id")
    video_url = f"https://youtube.com/shorts/{video_id}"
    print(f"✨ Successfully Uploaded! Video ID: {video_id}")
    print(f"🔗 Video URL: {video_url}")
    return response


def get_channel_info(client_secrets_path: str = DEFAULT_CLIENT_SECRETS, token_path: str = DEFAULT_TOKEN_FILE):
    """Get authenticated channel's title and ID to verify connection."""
    youtube = get_authenticated_service(client_secrets_path, token_path)
    res = youtube.channels().list(part="snippet,statistics", mine=True).execute()
    items = res.get("items", [])
    if items:
        ch = items[0]
        title = ch["snippet"]["title"]
        ch_id = ch["id"]
        subs = ch["statistics"].get("subscriberCount", "N/A")
        print(f"📺 Connected to YouTube Channel: {title} (ID: {ch_id}, Subscribers: {subs})")
        return ch
    return None


def main():
    parser = argparse.ArgumentParser(description="YouTube Shorts Automated Uploader")
    parser.add_argument("--file", help="Path to MP4 video file")
    parser.add_argument("--title", help="Video Title")
    parser.add_argument("--desc", default="─── © AT ───\n\n#Shorts #ปรัชญาชีวิต #ข้อคิดเตือนใจ", help="Description")
    parser.add_argument("--tags", default="Shorts,ปรัชญาชีวิต,ข้อคิดเตือนใจ,พัฒนาตนเอง,mindset", help="Comma-separated tags")
    parser.add_argument("--privacy", choices=["private", "unlisted", "public"], default="private", help="Privacy status")
    parser.add_argument("--schedule", help="ISO 8601 publish time (e.g. 2026-11-18T18:00:00+07:00)")
    parser.add_argument("--client-secret", default=DEFAULT_CLIENT_SECRETS, help="Path to client secret JSON")
    parser.add_argument("--auth-only", action="store_true", help="Authorize channel only")

    args = parser.parse_args()

    if args.auth_only:
        get_channel_info(args.client_secret)
        return

    if not args.file or not args.title:
        print("❌ Error: Both --file and --title are required when uploading.")
        parser.print_help()
        sys.exit(1)

    tag_list = [t.strip() for t in args.tags.split(",") if t.strip()]
    upload_short(
        file_path=args.file,
        title=args.title,
        description=args.desc,
        tags=tag_list,
        privacy_status=args.privacy,
        publish_at=args.schedule,
        client_secrets_path=args.client_secret
    )


if __name__ == "__main__":
    main()
