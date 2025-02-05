// import { Mic } from "lucide-react";

import LanguageSelector from "./LanguageSelector";

export default function ConversationArea() {
  return (
    <div className="relative flex flex-col items-center justify-center text-white">
      <div className="absolute bg-[#001300] rounded-t-full w-[2182px] h-[1888px] flex-shrink-0 top-[35vh] left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Lingkaran Merah 1 */}
        <div className="absolute w-[600px] h-[600px] bg-[#e70012] rounded-full bottom-[30vh] -left-[10vh]"></div>

        {/* Lingkaran Merah 2 */}
        <div className="absolute w-[600px] h-[600px] bg-[#e70012] rounded-full bottom-[30vh] -right-[10vh]"></div>
        
        {/* <p className="text-xl mb-4">質問してください</p>
        <button className="bg-white p-4 rounded-full">
        <Mic size={40} className="text-black" />
        </button>
        <p className="text-sm text-center mt-6 w-[80%]">
        もしKumamonが異なる言語で返答する場合は、以下の言語選択ボタンを使用してください！
        </p> */}

      </div>
      <LanguageSelector/>
    </div>
  );
}
