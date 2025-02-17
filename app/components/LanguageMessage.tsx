import { useState, useEffect } from "react";

const messages = [
  { lang: "日本語", text: "もしBotが異なる言語で返答する場合は、以下の言語選択ボタンを使用してください！" },
  { lang: "台湾語", text: "如果Bot經常用錯誤的語言回應，請使用下面的語言選擇按鈕！" },
  { lang: "English", text: "Please use the language selection button below if Bot often responds in the wrong language!" },
];

export default function LanguageMessage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-white text-xl font-['Noto Sans JP'] font-medium leading-tight">
      {messages[currentMessageIndex].text}
    </p>
  );
}
