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
    const [isProcessing, setIsProcessing] = useState(false);
    const [canRecordAgain, setCanRecordAgain] = useState(true);
    const [chatResponse, setChatResponse] = useState('');
    const [showChatResponse, setShowChatResponse] = useState(false);

    const standbyMessages = [
        "こんにちはもん！",
        "質問してねもん！",
        "展示会どうだったもん？"
    ];
    const [standbyMessage, setStandbyMessage] = useState(() => {
        const randomIndex = Math.floor(Math.random() * standbyMessages.length);
        return standbyMessages[randomIndex];
    });    

    console.log("Face Detected Status:", faceDetected);

    // Randomize standby messages
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (!faceDetected && !showChatResponse) {
            interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * standbyMessages.length);
                setStandbyMessage(standbyMessages[randomIndex]);
            }, 3000);
        } else {
            setStandbyMessage("しゃべってくださいもん！");
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [faceDetected, showChatResponse]);

    /**
     * Automatically starts and stops recording based on face detection
     */
    useEffect(() => {
        if (faceDetected && canRecordAgain) {
            setRecording(true);
            setTimeout(() => {
                setRecording(false);
                setCanRecordAgain(false);
            }, 7000);
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
            setShowChatResponse(true); // Show chat response

            setTimeout(() => {
                setShowChatResponse(false); // Hide chat response
                setCanRecordAgain(true);
            }, 7000); // Show for 7 seconds
        }       
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-6 z-20 relative -top-[48px]">
            <p className="text-white text-[28px] transition-opacity duration-300 w-[750px] text-center h-6">
                {isProcessing ? (
                    <span className="text-[38px]">くまモン考え中...</span>
                ) : showChatResponse ? (
                    <span className="text-[34px] leading-3">{chatResponse}</span>
                ) : (
                    <span className="text-[38px]">{standbyMessage}</span>
                )}
            </p>

            <div className="w-full sm:w-[200px] h-[80px] rounded-full overflow-hidden flex items-center justify-center top-[22vh] relative">
                <ReactMic
                    record={recording}
                    className="react-mic"
                    onStop={onStopRecording}
                    mimeType="audio/wav"
                    backgroundColor="black"
                    strokeColor="white"
                />
            </div>
        </div>
    );
}