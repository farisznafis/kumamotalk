'use client';
import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function FaceDetection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models/');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models/');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models/');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models/');
        await faceapi.nets.ageGenderNet.loadFromUri('/models/');
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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 360, ideal: 720, max: 1080 },
        },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startFaceDetection = async () => {
    if (!modelsLoaded || !videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();
      
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      
      resizedDetections.forEach(detection => {
        const { age, gender, genderProbability } = detection;
        const box = detection.detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: `${Math.round(age)}y, ${gender} (${(genderProbability * 100).toFixed(1)}%)`
        });
        drawBox.draw(canvas);
      });
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Face Detection with Face API</h1>
      <div className="relative">
        <video ref={videoRef} autoPlay muted className="border border-white rounded-lg" onPlay={startFaceDetection} />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>
    </div>
  );
}
