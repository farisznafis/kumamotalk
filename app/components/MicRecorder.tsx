'use client';
import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { convertSpeechToTextResponse } from '../utils/api';

const ReactMic = dynamic(() => import('react-mic').then((mod) => mod.ReactMic), { ssr: false });

interface MicRecorderProps {
    faceDetected: boolean;
}

export default function MicRecorder({ faceDetected }: MicRecorderProps) {
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string>('');
    const [messageShown, setMessageShown] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [recordFinished, setRecordFinished] = useState(false);
    const [canRecordAgain, setCanRecordAgain] = useState(true);
    const [chatResponse, setChatResponse] = useState('');

   /**
   * Automatically starts and stops recording based on face detection
   */
    useEffect(() => {
        if (faceDetected && canRecordAgain) {
            setRecording(true);
            setMessageShown(true);
            setRecordFinished(false);

            setTimeout(() => {
              setRecording(false);
              setCanRecordAgain(false);
            }, 10000);
        }

        if (recording) {
            setAudioURL('');
        }
    }, [faceDetected, canRecordAgain]);

    /**
     * Handles processing of recorded audio and API response
     */
    const onStopRecording = useCallback(async (recordedData: any) => {
        const newAudioBlob = recordedData.blob;
        const newAudioURL = URL.createObjectURL(newAudioBlob);
        
        setIsProcessing(true);
        setAudioURL(newAudioURL);

        try {
            const response = await convertSpeechToTextResponse(newAudioBlob);

            if (response.success) {
                setChatResponse(response.response);
            } else {
                setChatResponse(response.error);
                console.error('Upload failed:', response.error);
            }
        } catch (error) {
            console.error('Error processing audio:', error);
            setChatResponse('An error occurred.');
        } finally {
            setIsProcessing(false);
            setRecordFinished(true);
            setMessageShown(true);

            setTimeout(() => {
                setCanRecordAgain(true);
                setMessageShown(false);
            }, 20000);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-[2vh] z-20 relative">
            <p className={`text-white text-[36px] font-bold transition-opacity duration-300 ${messageShown ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {recordFinished ? chatResponse : '質問してください'}
            </p>

            <div className="w-full sm:w-[400px] h-[100px] rounded-full overflow-hidden flex items-center justify-center">
                <ReactMic record={recording} className="react-mic" onStop={onStopRecording} mimeType="audio/wav" />
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
