from fastapi import FastAPI, UploadFile
from app.routers import speech, chat, face_detection
import subprocess
from openai import OpenAI

subprocess.run(["ffmpeg", "-version"])
app = FastAPI()

app.include_router(speech.router)
app.include_router(chat.router)
app.include_router(face_detection.router)

@app.get("/")
def root():
    return {"message": "Kumamon Chatbot Service is running!"}