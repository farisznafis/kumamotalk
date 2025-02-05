"use client";

import { useState } from "react";
import WaveBackground from "./components/WaveBackground";
import RecordingView from "./components/RecordingView";
import KumamonTitle from "./components/KumamonTitle";
import Background from "./components/ConversationArea";
import LanguageSelector from "./components/LanguageSelector";
import BackgroundCircles, { RedCircles } from "./components/RedCircles";
import ConversationArea from "./components/ConversationArea";
// import FaceDetection from "./components/FaceDetection";

export default function Home() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingComplete, setRecordComplete] = useState<boolean>(false);  
  const [transcript, setTranscript] = useState<string>("")

  const startRecording = () => {
    setIsRecording(true);
    setTranscript("blablabla");
  }

  const stopRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gray-100">
      <WaveBackground/>
      <ConversationArea/> 
      {/* <LanguageSelector/> */}
      {/* <KumamonTitle/> */}
      {/* <RedCircles/> */}
      {/* <div className="relative w-full max-w-lg rounded-lg text-center">
        <KumamonTitle/>
      </div> */}
      {/* <div className="relative items-center w-[100px] h-[1888px] left-[209px] top-0 bg-[#001300] rounded-full">
        <LanguageSelector/>
      </div> */}
      {/* <Background/> */}
      {/* <div className="w-[2360px] h-[1640px] relative bg-neutral-50 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  overflow-hidden">
        <div className="w-[2596px] h-[1888px] left-[-118px] top-[372px] absolute">
          <div className="w-[2182px] h-[1888px] left-[209px] top-0 absolute bg-[#001300] rounded-full"></div>
          <div className="w-[602px] h-[602px] left-0 top-[789px] absolute bg-[#e70012] rounded-full"></div>
          <div className="w-[602px] h-[602px] left-[1994px] top-[789px] absolute bg-[#e70012] rounded-full"></div>
          <div className="w-[1170px] h-[81px] left-[713px] top-[913px] absolute justify-center items-center inline-flex">
            <div className="w-[1170px] text-neutral-50 text-[42px] font-bold font-['Noto Sans JP']">もしKumamonが異なる言語で返答する場合は、以下の言語選択ボタンを使用してください！</div>
          </div>
          <div className="p-[8.30px] left-[672.36px] top-[1033.77px] absolute justify-center items-center gap-[50.72px] inline-flex">
            <div className="px-[58.11px] py-[44.83px] bg-white rounded-[43.48px] justify-center items-center gap-[14.49px] flex">
              <div className="text-[#001300] text-[81.36px] font-bold font-['Noto Sans JP']">日本語</div>
            </div>
            <div className="px-[58.11px] py-[44.83px] bg-white rounded-[43.48px] justify-center items-center gap-[14.49px] flex">
              <div className="text-[#001300] text-[81.36px] font-bold font-['Noto Sans JP']">台湾語</div>
            </div>
            <div className="px-[58.11px] py-[44.83px] bg-white rounded-[43.48px] justify-center items-center gap-[14.49px] flex">
              <div className="text-[#001300] text-[81.36px] font-bold font-['Noto Sans JP']">English</div>
            </div>
          </div>
          <div className="w-[153px] px-[31px] py-[30px] left-[1207px] top-[338px] absolute bg-neutral-50 rounded-[80px] justify-center items-center gap-2.5 inline-flex overflow-hidden"></div>
        </div>
        <div className="w-[1148.44px] h-[336.59px] left-[606px] top-[107px] absolute">
          <div className="w-[194.41px] h-[233.78px] left-0 top-[115.54px] absolute origin-top-left rotate-[-19deg] text-black text-[158px] font-bold font-['Noto Sans JP']">コ</div>
          <div className="w-[194.41px] h-[233.78px] left-[186.11px] top-[51.63px] absolute origin-top-left rotate-[-11.40deg] text-black text-[158px] font-bold font-['Noto Sans JP']">マ</div>
          <div className="w-[194.41px] h-[233.78px] left-[379.05px] top-[12.88px] absolute origin-top-left rotate-[-3.80deg] text-black text-[158px] font-bold font-['Noto Sans JP']">モ</div>
          <div className="w-[194.41px] h-[233.78px] left-[575.41px] top-0 absolute origin-top-left rotate-[3.80deg] text-black text-[158px] font-bold font-['Noto Sans JP']">ン</div>
          <div className="w-[194.41px] h-[233.78px] left-[771.75px] top-[13.20px] absolute origin-top-left rotate-[11.40deg] text-black text-[158px] font-bold font-['Noto Sans JP']">だ</div>
          <div className="w-[194.41px] h-[233.78px] left-[964.62px] top-[52.25px] absolute origin-top-left rotate-[19deg] text-black text-[158px] font-bold font-['Noto Sans JP']">よ</div>
        </div>
      </div> */}
      {/* <RecordingView/> */}
      {/* <FaceDetection/> */}

    </main>
  )
}
