import os
import shutil
import speech_recognition as sr
import whisper

UPLOAD_DIR = "/src/temp_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Ensure upload directory exists
model = whisper.load_model("base")
recognizer = sr.Recognizer()

def process_audio(file_path: str, language: str) -> dict:
    """Processes the audio file and converts it to text using speech recognition."""
    
    with sr.AudioFile(file_path) as source:
        audio_data = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio_data, language=language)
        return {"filename": os.path.basename(file_path), "transcription": text}
    except sr.UnknownValueError:
        return {"error": "Could not understand the audio"}
    except sr.RequestError:
        return {"error": "Error connecting to speech recognition service"}

def language_detection(file_path: str) -> str:
    result = model.transcribe(file_path, fp16=False)
    return result['language']
