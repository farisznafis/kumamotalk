'use client';
import { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';

interface MicRecorderProps {
  faceDetected: boolean;
}

export default function MicRecorder({ faceDetected }: MicRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string>('');
  const [timerStarted, setTimerStarted] = useState(false);
  const [messageShown, setMessageShown] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordFinished, setRecordFinished] = useState(false);
  const [canRecordAgain, setCanRecordAgain] = useState(true);

  useEffect(() => {
    if (faceDetected && !timerStarted && canRecordAgain) {
      setRecording(true);
      setMessageShown(true);
      setTimerStarted(true);

      setRecordFinished(false);
      setTimeout(() => {
        setRecording(false);
        setTimerStarted(false);
        setCanRecordAgain(false);

        if (!recordFinished) {
          setMessageShown(false);
        }
      }, 10000);
    }

    if (recording) {
      setAudioURL("");
    }
  }, [faceDetected, timerStarted, canRecordAgain]);

  const onStopRecording = (recordedData: any) => {
    const newAudioBlob = recordedData.blob;
    setRecordedBlob(newAudioBlob);

    const newAudioURL = URL.createObjectURL(newAudioBlob);

    setIsProcessing(true);

    setTimeout(() => {
      setAudioURL(newAudioURL);
      setIsProcessing(false);
      setRecordFinished(true);

      setMessageShown(true);

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
          messageShown ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {recordFinished ? 'next record..' : '質問してください'}
      </p>

      <div className="w-full sm:w-[400px] h-[100px] rounded-full overflow-hidden flex items-center justify-center">
        <ReactMic
          record={recording}
          className="react-mic"
          onStop={onStopRecording}
          mimeType="audio/wav"
        />
      </div>

      {audioURL && (
        <div className="mt-5">
          <p className="text-white text-xl hidden">Playback Rekaman:</p>
          {/* <audio controls>
            <source src={audioURL} type="audio/wav" />
            Your browser does not support the audio element.
          </audio> */}
        </div>
      )}
    </div>
  );
}
