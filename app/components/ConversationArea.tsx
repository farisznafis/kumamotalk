// import { Mic } from "lucide-react";

import LanguageSelector from "./LanguageSelector";
import MicRecorder from "./MicRecorder";

export default function ConversationArea() {
  return (
    <div className="relative flex flex-col items-center justify-center text-white">
      <div className="absolute bg-[#001300] rounded-t-full w-[2182px] h-[1888px] flex-shrink-0 top-[20vh] left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Lingkaran Merah 1 */}
        <div className="absolute w-[600px] h-[600px] bg-[#e70012] rounded-full bottom-[30vh] -left-[10vh]"></div>

        {/* Lingkaran Merah 2 */}
        <div className="absolute w-[600px] h-[600px] bg-[#e70012] rounded-full bottom-[30vh] -right-[10vh]"></div>

        <MicRecorder/>
        <LanguageSelector/>
      </div>
    </div>
  );
}
