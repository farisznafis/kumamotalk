import { useState } from "react";
import FaceDetection from "./FaceDetection";

interface ConversationAreaProps {
    faceDistanceParam: number;
    selectedLanguage: string;
}

export default function ConversationArea({faceDistanceParam, selectedLanguage}: ConversationAreaProps) {

    return (
        <div className="h-[672.25px] relative">
            <div data-svg-wrapper data-layer="mainBase" className="mainBase">
                {/* <div data-svg-wrapper data-layer="Group 5" className="Group5 left-[21px] top-0 absolute"> */}
                <svg width="1097" height="640" viewBox="0 0 1097 648" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        {/* <!-- Gradient untuk warna #EDC531 ke #DBB42C --> */}
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#EDC531"/>
                            <stop offset="100%" stopColor="#DBB42C"/>
                        </linearGradient>
                    </defs>

                    {/* <!-- Path pertama dengan gradient --> */}
                    <path d="M50.5654 55.5C125.315 -19.25 971.815 -17.7501 1045.07 55.5C1108.11 118.543 1110.6 445.842 1068.79 577.11C1058.3 610.037 1027.74 628.074 993.371 631.642C804.837 651.216 242.09 653.707 85.8495 631.506C61.907 628.104 41.3983 614.584 33.0382 591.892C-10.2002 474.528 -16.0206 122.086 50.5654 55.5Z" fill="url(#gradient1)"/>

                    {/* <!-- Path kedua tetap dengan warna solid --> */}
                    <path d="M75.8013 83.0255C126.875 7.55106 968.924 12.0511 1021.08 83.0255C1068.8 147.976 1061.55 382.53 1045.68 504.936C1043.21 523.955 1029.6 538.89 1010.57 541.236C847.746 561.304 223.404 564.252 80.6314 541.871C64.5674 539.353 53.9747 526.486 51.7833 510.374C36.5115 398.095 28.7204 152.6 75.8013 83.0255Z" fill="#ffffff"/>
                </svg>

                {/* </div>   */}
            </div>

            {/* audio wave */}
            <FaceDetection faceDistanceParam={faceDistanceParam} selectedLanguange={selectedLanguage}/>
        </div>
    );
}
