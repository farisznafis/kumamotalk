'use client';
import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import MicRecorder from './MicRecorder';

export default function FaceDetection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

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
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight
    };

    faceapi.matchDimensions(canvas, displaySize)

    const detectFaces = async () => {
      if (!videoRef.current) return;

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      console.log('Face detection result:', detections);

      // resize bounding box
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // clear canvas before make new box
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      // detect again
      faceapi.draw.drawDetections(canvas, resizedDetections);

      // if face detected, update the setFaceDetected
      setFaceDetected(resizedDetections.length > 0)

      // Keep detecting continuously
      requestAnimationFrame(detectFaces);
    };

    detectFaces();
  };

  return (
    <>
      {/* Hidden video element (not shown in UI) */}
      {/* <video ref={videoRef} autoPlay muted playsInline className="absolute z-50 bottom-0 left-0" />
      {modelsLoaded ? <p className='hidden'>Face API models loaded</p> : <p className='hidden'>Loading Face API...</p>}

      <canvas ref={canvasRef} className='absolute z-50 bottom-0 left-0'/> */}
      <div className='relative z-50 w-auto bg-red-500'>
        <MicRecorder faceDetected={false}/> {/* change to true/false if want to fix status */}
      </div>
    </>
  );
}
