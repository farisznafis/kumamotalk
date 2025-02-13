import { useState } from "react";
import LanguageMessage from "./LanguageMessage";
import { Inter } from "next/font/google";

const languages = [
  { code: "日本語", label: "日本語" },
  { code: "台湾語", label: "台湾語" },
  { code: "English", label: "English" },
];

const inter = Inter({ subsets: ['latin'] })

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("日本語");

  return (
    <div className="fixed flex flex-col justify-center items-center space-y-20 z-20 scale-50 bottom-0 w-full">
      {/* Komponen pesan */}
      <LanguageMessage />

      {/* Tombol pemilih bahasa */}
      <div className="relative flex space-x-4 bg-transparent p-2 rounded-full scale-[2.8] {inter.className}">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLanguage(lang.code)}
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
