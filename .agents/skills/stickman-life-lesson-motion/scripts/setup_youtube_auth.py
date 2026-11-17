"""
Clean YouTube OAuth Authentication Setup
"""

import os
import sys
import webbrowser
from google_auth_oauthlib.flow import InstalledAppFlow

CLIENT_SECRETS = r"C:\Users\atong\Documents\antigravity\client_secret_488326214568-dpva4fd8c1l0ihjlg6asufdpf7vmrdsq.apps.googleusercontent.com.json"
TOKEN_FILE = r"C:\Users\atong\Documents\antigravity\youtube_token.json"
SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.readonly"
]

def main():
    print("=" * 60, flush=True)
    print("🔑 YouTube OAuth 2.0 Authorization Setup", flush=True)
    print("=" * 60, flush=True)

    flow = InstalledAppFlow.from_client_secrets_file(
        CLIENT_SECRETS,
        scopes=SCOPES
    )

    creds = flow.run_local_server(
        port=8080,
        prompt="consent",
        authorization_prompt_message="👉 Please authorize via the browser tab: {url}"
    )

    with open(TOKEN_FILE, "w", encoding="utf-8") as f:
        f.write(creds.to_json())

    print("\n" + "=" * 60, flush=True)
    print(f"🎉 SUCCESS! Token saved to: {TOKEN_FILE}", flush=True)
    print("=" * 60, flush=True)

    from googleapiclient.discovery import build
    youtube = build("youtube", "v3", credentials=creds)
    res = youtube.channels().list(part="snippet,statistics", mine=True).execute()
    items = res.get("items", [])
    if items:
        title = items[0]["snippet"]["title"]
        subs = items[0]["statistics"].get("subscriberCount", "N/A")
        print(f"📺 Connected to Channel: {title} (Subscribers: {subs})", flush=True)

if __name__ == "__main__":
    main()
