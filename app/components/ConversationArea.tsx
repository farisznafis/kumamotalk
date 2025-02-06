// import LanguageSelector from "./LanguageSelector";
// import MicRecorder from "./MicRecorder";

import FaceDetection from "./FaceDetection";
import LanguageSelector from "./LanguageSelector";

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

export default function ConversationArea() {
  return (
    <div className="relative w-full">
      <img
        src="../kumamon.svg"
        className="opacity-100 w-full h-auto block"
        alt="Header Text"
      />
      <div className="flex flex-col items-center justify-center">
        <div className="absolute top-[20vh]">
          <FaceDetection/>
        </div>
        <div className="absolute top-[30vh] z-50 w-full h-full scale-110">
          <LanguageSelector/>
        </div>
      </div>
    </div>
  );
}