// import LanguageSelector from "./LanguageSelector";
// import MicRecorder from "./MicRecorder";

// export default function ConversationArea() {
//   return (
//     <div className="relative flex flex-col items-center justify-center text-white">
//       <div className="absolute bg-[#001300] rounded-t-full w-[2182px] h-[1888px] flex-shrink-0 top-[20vh] left-1/2 -translate-x-1/2 -translate-y-1/2">
//         {/* Lingkaran Merah 1 */}
//         <div className="absolute w-[600px] h-[600px] bg-[#e70012] rounded-full bottom-[30vh] -left-[10vh]"></div>

//         {/* Lingkaran Merah 2 */}
//         <div className="absolute w-[600px] h-[600px] bg-[#e70012] rounded-full bottom-[30vh] -right-[10vh]"></div>

//         <MicRecorder/>
//         <LanguageSelector/>
//       </div>
//     </div>
//   );
// }

// export default function ConversationArea() {
//   return (
//     <img
//       src="../kumamon-2.svg"
//       className="fixed opacity-100 z-10 bottom-0"
//       alt="Header Text"
//     />
//   );
// }

import { useState } from "react";
import FaceDetection from "./FaceDetection";

export default function ConversationArea() {
  // State to manage the face distance parameter
  const [faceDistanceParam, setFaceDistanceParam] = useState(90); // Default threshold (in pixels)
  const [selectedLanguage, setSelectedLanguage] = useState("");

  return (
    <div className="h-[672.25px] relative">
        <div data-svg-wrapper data-layer="mainBase" className="mainBase">
          {/* <div data-svg-wrapper data-layer="Group 5" className="Group5 left-[21px] top-0 absolute"> */}
          <svg width="1097" height="648" viewBox="0 0 1097 648" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50.5654 55.5C125.315 -19.25 971.815 -17.7501 1045.07 55.5C1108.11 118.543 1110.6 445.842 1068.79 577.11C1058.3 610.037 1027.74 628.074 993.371 631.642C804.837 651.216 242.09 653.707 85.8495 631.506C61.907 628.104 41.3983 614.584 33.0382 591.892C-10.2002 474.528 -16.0206 122.086 50.5654 55.5Z" fill="#C8DFEF"/>
            <path d="M75.8013 83.0255C126.875 7.55106 968.924 12.0511 1021.08 83.0255C1068.8 147.976 1061.55 382.53 1045.68 504.936C1043.21 523.955 1029.6 538.89 1010.57 541.236C847.746 561.304 223.404 564.252 80.6314 541.871C64.5674 539.353 53.9747 526.486 51.7833 510.374C36.5115 398.095 28.7204 152.6 75.8013 83.0255Z" fill="#62B9A5"/>
          </svg>
          {/* </div>   */}
        </div>

        {/* audio wave */}
        <FaceDetection faceDistanceParam={faceDistanceParam} selectedLanguange={selectedLanguage}/>
    </div>
  );
}
