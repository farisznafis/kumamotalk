import { useState, useEffect } from "react";

export default function MicRecorder() {
  return (
    <div className="flex flex-col items-center justify-center space-y-[6vh] pt-[20vh]">
      {/* Teks Jepang */}
      <p className="text-white text-[68px] font-bold">質問してください</p>

      {/* Animasi Sound Waves */}
      <div className="flex space-x-4 h-16">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-6 bg-white rounded-full animate-wave"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>

      {/* Style animasi */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            height: 12px;
            transform: translateY(-50%);
          }
          50% {
            height: 80px;
            transform: translateY(-50%) scale(1.3);
          }
        }
        .animate-wave {
          transform-origin: center;
          animation: wave 1s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
