"use client";

import { useState } from "react";
import WaveBackground from "./components/WaveBackground";
import Header from "./components/Header";
import LanguageSelector from "./components/LanguageSelector";
import ConversationArea from "./components/ConversationArea";
import MicRecorder from "./components/MicRecorder";
import BackgroundMusic from "./components/BackgroundMusic";
import FaceDetection from "./components/FaceDetection";

export default function Home() {
    // State to manage the face distance parameter
    const [faceDistanceParam, setFaceDistanceParam] = useState(90); // Default threshold (in pixels)
    const [selectedLanguage, setSelectedLanguage] = useState("");

    return (
        <main className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden bg-gray-100 z-50">
            <Header />
            <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
            <ConversationArea />
            <WaveBackground />
            <BackgroundMusic />
            {/* Pass the faceDistanceParam as a prop to the FaceDetection component */}
            <FaceDetection faceDistanceParam={faceDistanceParam} selectedLanguange={selectedLanguage}/>
        </main>
    );
}