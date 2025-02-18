import { useState, useEffect } from "react";
import ConversationArea from "./ConversationArea";
import Footer from "./Footer";

export default function MainComponent() {
    const [faceDistanceParam, setFaceDistanceParam] = useState(() => {
        if (typeof window !== "undefined") {
            // Access localStorage only when window is defined (i.e., in the browser)
            const storedValue = localStorage.getItem("faceDistanceParam");
            return storedValue ? Number(storedValue) : 90; // Default to 90 if not found
        }
        return 90; // Fallback value if not in the browser
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("faceDistanceParam", String(faceDistanceParam));
        }
    }, [faceDistanceParam]); // This effect runs whenever faceDistanceParam changes

    const [selectedLanguage, setSelectedLanguage] = useState("");

    return (
        <div className="w-[1117.86px] h-[736px] relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between items-center">
            <ConversationArea faceDistanceParam={faceDistanceParam} selectedLanguage={selectedLanguage}/>
            <Footer selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
        </div>
    );
}
