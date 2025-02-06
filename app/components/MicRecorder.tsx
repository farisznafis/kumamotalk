import { useState, useEffect } from 'react';

interface MicRecorderProps {
  faceDetected: boolean;
}

export default function MicRecorder({ faceDetected }: MicRecorderProps) {
  return (
    <div
      // className="flex flex-col items-center justify-center space-y-[5vh] z-20"
      className='flex flex-col items-center justify-center space-y-[5vh]'
    >
      {/* Teks Jepang */}
      <p className="text-white text-[36px] font-bold">質問してください</p>

      {/* Animasi Sound Waves */}
      <div className="flex space-x-2 h-16">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 bg-white rounded-full ${
              faceDetected ? 'animate-wave' : 'animate-static' // ✨ Animasi berubah
            }`}
            style={{
              animationDelay: `${i * 0.2}s`,
              transition: 'height 3s ease, transform 3s ease', // Smooth transition
            }}
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

        @keyframes static {
          0%, 100% {
            height: 10px;
            transform: translateY(-50%);
          }
        }

        .animate-wave {
          transform-origin: center;
          animation: wave 1s infinite ease-in-out;
        }

        .animate-static {
          transform-origin: center;
          animation: static 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
