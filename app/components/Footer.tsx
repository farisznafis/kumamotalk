import LanguageSelector from "./LanguageSelector";
import { useState } from "react";

export default function Footer() {

    // State to manage the face distance parameter
    const [faceDistanceParam, setFaceDistanceParam] = useState(90); // Default threshold (in pixels)
    const [selectedLanguage, setSelectedLanguage] = useState("");
    
    return (
        <footer className="h-[76.50px] justify-between items-center flex">
            <div className="bg-neutral-50 rounded-[90px] flex-row justify-center items-center gap-[5px] flex">
                <div className="w-[247.50px] h-[76.50px] px-[21px] justify-center items-center flex">
                    {/* import logo svg */}
                    <img
                        src="../miki-logo.svg"
                        // className="fixed opacity-100 z-10 bottom-0"
                        className="relative"
                        alt="Header Text"
                    />
                </div>
            </div>
            {/* language selector */}
            <div className="">
                <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}/>
            </div>
            {/* <div>
                <select className="bg-transparent text-white border border-white rounded-[10px] p-1">
                    <option value="en">English</option>
                    <option value="id">Indonesia</option>
                </select>
            </div> */}
        </footer>
    );
}