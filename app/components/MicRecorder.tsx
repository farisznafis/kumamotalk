'use client';
import { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';

interface MicRecorderProps {
  faceDetected: boolean;
}

export default function MicRecorder({ faceDetected }: MicRecorderProps) {
  const [recording, setRecording] = useState(false); // Menyimpan status perekaman
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null); // Menyimpan hasil rekaman
  const [audioURL, setAudioURL] = useState<string>(''); // Menyimpan URL audio yang bisa diputar
  const [timerStarted, setTimerStarted] = useState(false); // Menyimpan status timer
  const [messageShown, setMessageShown] = useState(false); // Menyimpan status apakah pesan sudah muncul

  // Memulai atau menghentikan perekaman berdasarkan deteksi wajah
  useEffect(() => {
    if (faceDetected && !timerStarted && !messageShown) {
      setRecording(true); // Mulai rekam jika wajah terdeteksi
      setMessageShown(true); // Tampilkan pesan
      setTimerStarted(true); // Menandakan timer dimulai
      setTimeout(() => {
        setRecording(false); // Hentikan rekam setelah 10 detik
        setTimerStarted(false); // Reset timer
      }, 10000); // 10 detik timer
    }
  }, [faceDetected, timerStarted, messageShown]);

  // Saat perekaman selesai, simpan blob audio dan buat URL untuk memutar suara
  const onStopRecording = (recordedData: any) => {
    console.log('Recording stopped. Audio Blob:', recordedData);
    setRecordedBlob(recordedData.blob); // Simpan data audio dalam bentuk Blob
    const audioURL = URL.createObjectURL(recordedData.blob); // Buat URL untuk memutar audio
    setAudioURL(audioURL); // Simpan URL audio
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-[5vh] z-20">
      {/* Teks Jepang */}
      {messageShown && (
        <p className="text-white text-[36px] font-bold">質問してください</p>
      )}

      {/* Animasi Gelombang Suara */}
      <div className="flex space-x-2 h-16">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-6 bg-white rounded-full ${
              faceDetected && recording ? 'animate-wave' : 'animate-static' // Animasi berubah berdasarkan faceDetected
            }`}
            style={{
              animationDelay: `${i * 0.2}s`,
              transition: 'height 3s ease, transform 3s ease', // Smooth transition
            }}
          ></div>
        ))}
      </div>

      {/* ReactMic untuk merekam suara */}
      <ReactMic
        record={recording} // Status perekaman berdasarkan faceDetected
        className="react-mic"
        onStop={onStopRecording}
        mimeType="audio/wav"
      />

      {/* Memutar hasil rekaman suara */}
      {audioURL && (
        <div className="mt-5">
          <p className="text-white text-xl">Playback Rekaman:</p>
          <audio controls>
            <source src={audioURL} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

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
          animation: static 1s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
