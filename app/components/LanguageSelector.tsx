import { useState } from "react";
import LanguageMessage from "./LanguageMessage";

const languages = [
  { code: "日本語", label: "日本語" },
  { code: "台湾語", label: "台湾語" },
  { code: "English", label: "English" },
];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("日本語");

  return (
    <div className="relative flex flex-col justify-center items-center space-y-20 top-[20vh]">
      {/* Komponen pesan */}
      <LanguageMessage />

      {/* Tombol pemilih bahasa */}
      <div className="relative flex space-x-4 bg-transparent p-2 rounded-full scale-[2.8]">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLanguage(lang.code)}
            className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 border-2 ${
              selectedLanguage === lang.code
                ? "bg-white text-black border-transparent"
                : "bg-black text-white border-white"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
