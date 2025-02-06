from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.face_detection_service import detect_faces  # Impor service deteksi wajah

router = APIRouter(prefix="/face-detection", tags=["Face Detection"])

class FaceDetectionRequest(BaseModel):
    detections: list  # List of detected faces or face data

@router.post("/")
async def detect_face(request: FaceDetectionRequest) -> dict:
    try:
        # Panggil service untuk memproses deteksi wajah
        result = detect_faces(request.detections)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
