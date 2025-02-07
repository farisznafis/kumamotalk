'use client';
import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import MicRecorder from './MicRecorder';

export default function FaceDetection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [recording, setRecording] = useState(false);

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
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      console.log('Face detection result:', detections);

      // If face is detected, start recording
      if (detections.length > 0 && !faceDetected) {
        setFaceDetected(true);
        startRecording(); // Start recording when face is detected
      } else if (detections.length === 0 && faceDetected) {
        setFaceDetected(false);
      }

      // Keep detecting faces continuously
      requestAnimationFrame(detectFaces);
    };

    detectFaces();
  };

  const startRecording = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false); // Stop recording after 10 seconds
    }, 10000);
  };

  return (
    <>
      <video ref={videoRef} autoPlay muted playsInline className="fixed bottom-0 left-0 w-[200px] h-[200px] z-50" />
      {modelsLoaded ? <p className='hidden'>Face API models loaded</p> : <p>Loading Face API...</p>}

      {/* Show message when face is detected */}
      {faceDetected && <p className="text-white text-[36px] font-bold hidden">Silakan ngomong</p>}

      {/* Pass faceDetected and recording status to MicRecorder */}
      <MicRecorder faceDetected={faceDetected && recording} />
    </>
  );
}
