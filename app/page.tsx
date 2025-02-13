"use client";

import { useState } from "react";
import WaveBackground from "./components/WaveBackground";
import Header from "./components/Header";
import LanguageSelector from "./components/LanguageSelector";
import ConversationArea from "./components/ConversationArea";
import MicRecorder from "./components/MicRecorder";
import BackgroundMusic from "./components/BackgroundMusic";
import FaceDetection from "./components/FaceDetection";
// import FaceDetection from "./components/FaceDetection";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden bg-gray-100">
      <Header/>
      {/* <MicRecorder faceDetected={faceDetected}/> */}
      <LanguageSelector/>
      <ConversationArea/> 
      <WaveBackground/>
      <BackgroundMusic/>
      <FaceDetection/>
    </main>
  )
}
