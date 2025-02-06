from fastapi import HTTPException

def detect_faces(detections: list) -> dict:
    if not detections:
        raise HTTPException(status_code=400, detail="No face detected")

    # Proses data deteksi wajah, misalnya menyimpan data atau analisis lebih lanjut
    print("Detected Faces Data:", detections)

    # Sebagai contoh, Anda bisa mengembalikan data atau hasil analisis
    return {"face_count": len(detections), "faces": detections}