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
    <main className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gray-100">
      <Header/>
      <WaveBackground/>
      <MicRecorder/>
      {/* <LanguageSelector/> */}
      {/* <FaceDetection/> */}
      <ConversationArea/> 
      {/* <BackgroundMusic/> */}
    </main>
  )
}
