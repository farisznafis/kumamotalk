import LanguageSelector from "./LanguageSelector";
import { useState } from "react";

interface FooterProps {
    selectedLanguage: string;
    setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Footer({selectedLanguage, setSelectedLanguage}: FooterProps) {
    
    return (
        <footer className="h-[76.50px] justify-between items-center flex space-x-14">
            {/* <div className="bg-neutral-50 rounded-[90px] flex-row justify-center items-center gap-[5px] flex scale-90"> */}
                <div className="w-[150px] h-[76.50px] px-[21px] justify-center items-center flex">
                    {/* import logo svg */}
                    <img
                        src="../MIKI-500_logo.svg"
                        // className="fixed opacity-100 z-10 bottom-0"
                        className="relative"
                        alt="Header Text"
                    />
                </div>
            {/* </div> */}
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