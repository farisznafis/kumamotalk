'use client';
import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function FaceDetection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models/');
        setModelsLoaded(true);
        startCamera();
      } catch (error) {
        console.error('Error loading face detection models:', error);
      }
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          startFaceDetection();
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startFaceDetection = async () => {
    if (!videoRef.current) return;

    const detectFaces = async () => {
      if (!videoRef.current) return;

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      console.log('Face detection result:', detections);

      // Keep detecting continuously
      requestAnimationFrame(detectFaces);
    };

    detectFaces();
  };

  return (
    <>
      {/* Hidden video element (not shown in UI) */}
      <video ref={videoRef} autoPlay muted playsInline className="hidden" />
      {modelsLoaded ? <p>Face API models loaded</p> : <p>Loading Face API...</p>}
    </>
  );
}
