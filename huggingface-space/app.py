import os
import gradio as gr
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from huggingface_hub import InferenceClient
from openai import OpenAI
import httpx

# Create FastAPI app
api_app = FastAPI(title="English Tutor Audio Backend")

# Allow requests from your GitHub Pages frontend
api_app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://apisit-man.github.io"], # Restrict to your GitHub Pages URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Clients
hf_token = os.environ.get("HF_TOKEN")
openai_api_key = os.environ.get("OPENAI_API_KEY")

hf_client = InferenceClient(token=hf_token) if hf_token else None
openai_client = OpenAI(api_key=openai_api_key) if openai_api_key else None

class TTSRequest(BaseModel):
    text: str
    voice: str = "nova" # Nova or alloy are good for tutor

@api_app.post("/stt")
async def speech_to_text(audio: UploadFile = File(...)):
    """
    Receives an audio file (e.g. webm/ogg from browser) and transcribes it using HF's free Whisper.
    """
    if not hf_client:
        raise HTTPException(status_code=500, detail="HF_TOKEN not configured")
    
    try:
        content = await audio.read()
        response = hf_client.automatic_speech_recognition(
            content,
            model="openai/whisper-large-v3-turbo"
        )
        return {"text": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_app.post("/tts")
async def text_to_speech(request: TTSRequest):
    """
    Receives text and streams back MP3 audio using OpenAI TTS.
    """
    if not openai_client:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")
    
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text is empty")

    try:
        response = openai_client.audio.speech.create(
            model="tts-1",
            voice=request.voice,
            input=request.text,
            response_format="mp3"
        )
        return StreamingResponse(
            response.iter_bytes(chunk_size=4096),
            media_type="audio/mpeg"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Create a dummy Gradio interface so Hugging Face Space runs it properly
with gr.Blocks() as demo:
    gr.Markdown("# English Tutor API is Running")
    gr.Markdown("This space is used as a backend API for the AI English Tutor.")

# Mount the Gradio app onto our FastAPI app.
# Gradio spaces look for a variable named 'app'
app = gr.mount_gradio_app(api_app, demo, path="/")
