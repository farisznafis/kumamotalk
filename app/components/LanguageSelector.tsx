import { useState } from "react";
import LanguageMessage from "./LanguageMessage";
import { Inter } from "next/font/google";
import { div } from "@tensorflow/tfjs-core";

const languages = [
  { code: "日本語", label: "日本語" },
  { code: "台湾語", label: "台湾語" },
  { code: "English", label: "English" },
];

const inter = Inter({ subsets: ['latin'] })

interface LanguageSelectorProps {
    selectedLanguage: string;
    setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
};

export default function LanguageSelector({selectedLanguage, setSelectedLanguage}: LanguageSelectorProps) {
    const handleLanguangeChange = (langCode : string) => {
        if (langCode == selectedLanguage) {
            setSelectedLanguage("");
        } else {
            setSelectedLanguage(langCode);
        }
    }

    return (
        // <div className="flex flex-row justify-center items-center space-y-20 z-20 scale-50 bottom-0 w-full bg-black">
        <div className="justify-start items-center gap-2 flex scale-50">
            {/* Komponen pesan */}
            <div className="relative w-[360px] justify-start items-center flex mr-[15vh] max-w-2xl scale-150 mr-10">
                <LanguageMessage />
            </div>

            {/* Tombol pemilih bahasa */}
            <div className="relative flex space-x-2 bg-transparent p-2 rounded-full scale-[2.8] {inter.className} justify-end inline-flex">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        /*onClick={() => setSelectedLanguage(lang.code)}*/
                        onClick = {() => handleLanguangeChange(lang.code)}
                        className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 border-2 ${
                            selectedLanguage === lang.code
                            ? "bg-black text-white border-transparent"
                            : "bg-white text-black border-black"
                        }`}
                    >    
                        {lang.label}
                    </button>
                ))}
            </div>
        </div>
    );
}