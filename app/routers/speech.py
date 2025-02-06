from fastapi import APIRouter, File, UploadFile, HTTPException
import shutil
import os
from pathlib import Path
from src.services.speech_service import process_audio, language_detection
from src.services.chatgpt_service import call_gpt

router = APIRouter(prefix="/speech", tags=["Speech Recognition"])

# Define the directory for temporary files
TEMP_DIR = Path(__file__).resolve().parent.parent / "temp_files"
TEMP_DIR.mkdir(parents=True, exist_ok=True)  # Ensure directory exists

def save_uploaded_file(uploaded_file: UploadFile) -> Path:
    """
    Saves the uploaded file to the temporary directory and returns the file path.
    """
    file_path = TEMP_DIR / uploaded_file.filename

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(uploaded_file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {str(e)}")

    if not file_path.exists():
        raise HTTPException(status_code=500, detail="File saving failed unexpectedly.")

    return file_path

def delete_uploaded_file(file_path: Path):
    """
    Deletes the specified uploaded file from the temporary directory.
    """
    try:
        if file_path.exists():
            file_path.unlink()  # Deletes the file
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting file: {str(e)}")

@router.post("/transcribe/")
async def transcribe(file: UploadFile = File(...)):
    """
    Upload an audio file and convert speech to text.
    """
    file_path = save_uploaded_file(file)
    delete_uploaded_file(file_path)

    try:
        language = language_detection(str(file_path))

        if not language:
            raise HTTPException(status_code=400, detail="Failed to detect language.")

        return process_audio(str(file_path), language)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error : {str(e)}")
    

@router.post("/conversation/")
async def conversation(file: UploadFile = File(...)):
    """
    Upload an audio file, process speech, and return a conversational response.
    """
    file_path = save_uploaded_file(file)
    try:
        language = language_detection(str(file_path))

        if not language:
            raise HTTPException(status_code=400, detail="Failed to detect language.")

        process_audio_result = process_audio(str(file_path), language)
        delete_uploaded_file(file_path)

        prompt = """あなたはくまモン。返事はくまモン口調で全年齢向けの質問だけ答えて下さい。 
        政治、性的、暴力などに関する質問を断る。
        質問の言語に合わせて、返事その言語で行う。
        語尾の「モン」を自然なところで使ってください

        質問：
        """
        if "error" in process_audio_result:
            return process_audio_result

        return call_gpt(process_audio_result['transcription'], prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error : {str(e)}")
    
