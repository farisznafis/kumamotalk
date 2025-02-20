import { useState } from "react";
import FaceDetection from "./FaceDetection";

interface ConversationAreaProps {
    faceDistanceParam: number;
    selectedLanguage: string;
}

export default function ConversationArea({faceDistanceParam, selectedLanguage}: ConversationAreaProps) {
  return (
    <div className="h-[672.25px] relative overflow-visible">
        <div data-svg-wrapper data-layer="mainBase" className="mainBase">
          <svg width="1180" height="777" viewBox="0 0 1180 777" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Gradient untuk efek 3D */}
              <linearGradient id="gradient1" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#E70012" />
                {/* <stop offset="50%" stopColor="#F76B1C" /> */}
                <stop offset="100%" stopColor="#000000" />
              </linearGradient> 
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ffffff" />
              </filter>
              {/* gaussian blur */}
              <filter id="featherShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"/>
                <feOffset dx="5" dy="5" result="offsetBlur"/>
                <feMerge>
                  <feMergeNode in="offsetBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <path d="M100 592H1080L1180 665V780H0V665L100 592Z" fill="#000000"/>
            
            {/* Path pertama dengan gradient dan shadow */}
            <path d="M90.5654 55.5C165.315 -19.25 1011.82 -17.7501 1085.07 55.5C1148.11 118.543 1150.6 445.842 1108.79 577.11C1098.3 610.037 1067.74 628.074 1033.37 631.642C844.837 651.216 282.09 653.707 125.85 631.506C101.907 628.104 81.3983 614.584 73.0382 591.892C29.7998 474.528 23.9794 122.086 90.5654 55.5Z"
              fill="url(#gradient1)"
              filter="url(#shadow)"
              stroke="white"
              strokeWidth={5}
              strokeOpacity={0.5}
              />

            {/* Path kedua tetap dengan warna solid sebagai layar */}
            <path d="M115.801 83.0255C166.875 7.55106 1008.92 12.0511 1061.08 83.0255C1108.8 147.976 1101.55 382.53 1085.68 504.936C1083.21 523.955 1069.6 538.89 1050.57 541.236C887.746 561.304 263.404 564.252 120.631 541.871C104.567 539.353 93.9747 526.486 91.7833 510.374C76.5115 398.095 68.7204 152.6 115.801 83.0255Z"
              fill="#ffffff" filter="url(#shadow)"/>

            {/* <svg width="1180" height="188" viewBox="0 0 1180 188" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
            
          </svg>
        </div>

        {/* Audio wave */}
        <FaceDetection faceDistanceParam={faceDistanceParam} selectedLanguange={selectedLanguage}/>
    </div>
  );
}