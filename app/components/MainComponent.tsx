import { useState } from "react";
import ConversationArea from "./ConversationArea";
import Footer from "./Footer";

export default function MainComponent() {
    const [faceDistanceParam, setFaceDistanceParam] = useState(90); // Default threshold (in pixels)
    const [selectedLanguage, setSelectedLanguage] = useState("");
    return (
        <div className="w-[1117.86px] h-[736px] relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center">
            <ConversationArea faceDistanceParam={faceDistanceParam} selectedLanguage={selectedLanguage}/>
            <Footer selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
        </div>
    );
}