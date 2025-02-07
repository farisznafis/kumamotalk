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
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordFinished, setRecordFinished] = useState(false);
  const [canRecordAgain, setCanRecordAgain] = useState(true);

  // Memulai atau menghentikan perekaman berdasarkan deteksi wajah
  useEffect(() => {
    if (faceDetected && !timerStarted && canRecordAgain) {
      setRecording(true); // Mulai rekam jika wajah terdeteksi
      setMessageShown(true); // Tampilkan pesan
      setTimerStarted(true); // Menandakan timer dimulai
      
      setRecordFinished(false);
      setTimeout(() => {
        setRecording(false); // stop record after 10 second
        setTimerStarted(false); // Reset timer
        // setMessageShown(false); // reset message so can record again
        setCanRecordAgain(false);

        // prevent message gone after record
        if (!recordFinished) {
          setMessageShown(false);
        }

      }, 10000); // 10 second timer
    }

    // reset URL before update URL
    if (recording) {
      setAudioURL("");
    }
  }, [faceDetected, timerStarted, canRecordAgain]);

  // Saat perekaman selesai, simpan blob audio dan buat URL untuk memutar suara
  const onStopRecording = (recordedData: any) => {
    console.log('Recording stopped. Audio Blob:', recordedData);
    
    setAudioURL("")
    const newAudioBlob = recordedData.blob;
    setRecordedBlob(newAudioBlob);

    const newAudioURL = URL.createObjectURL(newAudioBlob);
  
    console.log('Generated Audio URL:', newAudioURL);
  
    // set processing condition to true
    setIsProcessing(true);
  
    setTimeout(() => {
      setAudioURL(newAudioURL);
      console.log('start delay for audio', newAudioURL);
      setIsProcessing(false);
      setRecordFinished(true);

      // make sure message shown after record done
      setMessageShown(true);
      
      // trigger automatic download
      const downloadLink = document.createElement('a');
      downloadLink.href = newAudioURL;
      downloadLink.download = `recording_${Date.now()}.wav`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }, 3000);

    setTimeout(() => {
      setCanRecordAgain(true);
      setMessageShown(false);
    }, 20000);

    setRecordFinished(false);
  };  

  return (
    <div className="flex flex-col items-center justify-center space-y-[2vh] z-20 relative">
      <p
        className={`text-white text-[36px] font-bold transition-opacity duration-300 ${
          messageShown ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {recordFinished ? "next record.." : "質問してください"}
      </p>


      {/* Animasi Gelombang Suara
      <div className="flex space-x-2 h-16">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 bg-white rounded-full ${
              faceDetected && recording ? 'animate-wave' : 'animate-static' // Animasi berubah berdasarkan faceDetected
            }`}
            style={{
              animationDelay: `${i * 0.2}s`,
              transition: 'height 3s ease, transform 3s ease', // Smooth transition
            }}
          ></div>
        ))}
      </div> */}

      {/* ReactMic untuk merekam suara */}
      <div className='w-[400px] h-[100px] rounded-full overflow-hidden flex items-center justify-center'>
        <ReactMic
          record={recording} // Status perekaman berdasarkan faceDetected
          className="react-mic"
          onStop={onStopRecording}
          mimeType="audio/wav"
        />
      </div>

      {/* Memutar hasil rekaman suara */}
      {audioURL && (
        <div className="mt-5">
          <p className="text-white text-xl hidden">Playback Rekaman:</p>
          <audio controls>
            <source src={audioURL} type="audio/wav"/>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* Style animasi
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
      `}</style> */}
    </div>
  );
}
