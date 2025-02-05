import { useState, useEffect } from "react";

export default function MicRecorder() {
  return (
    <div className="flex flex-col items-center justify-center space-y-[10vh] z-20">
      {/* Teks Jepang */}
      <p className="text-white text-[36px] font-bold">質問してください</p>

      {/* Animasi Sound Waves */}
      <div className="flex space-x-2 h-16">
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
            height: 10px;
            transform: translateY(-50%);
          }
          50% {
            height: 80px;
            transform: translateY(-50%);
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
