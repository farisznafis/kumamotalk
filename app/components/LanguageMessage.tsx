import { useState, useEffect } from "react";

const messages = [
  { lang: "日本語", text: "もしKumamonが異なる言語で返答する場合は、以下の言語選択ボタンを使用してください！" },
  { lang: "台湾語", text: "如果Kumamon經常用錯誤的語言回應，請使用下面的語言選擇按鈕！" },
  { lang: "English", text: "Please use the language selection button below if Kumamon often responds in the wrong language!" },
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
    <p className="relative text-black text-2xl max-w-2xl text-center scale-150 font-['Noto Sans JP'] font-medium">
      {messages[currentMessageIndex].text}
    </p>
  );
}
