'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { convertSpeechToTextResponse } from '../utils/api';

const ReactMic = dynamic(() => import('react-mic').then((mod) => mod.ReactMic), { ssr: false });

interface MicRecorderProps {
    faceDetected: boolean;
    selectedLanguage: string;
}

const ChatComponent = ({ chatData }: { chatData: any }) => {
    const [displayedText, setDisplayedText] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < chatData.data.chat_response.length) {
            const currentMessage = chatData.data.chat_response[currentIndex];
            setDisplayedText(currentMessage.text);
            const timeoutId = setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, currentMessage.time_range * 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [currentIndex, chatData]);

    return (
        <div className="flex items-center justify-center h-full text-white text-center">
            <p className="text-[52px] opacity-100 transition-opacity duration-500 leading-[1.15] -mb-[20px] top-[5vh]">{displayedText}</p>
        </div>
    );
};

export default function MicRecorder({ faceDetected, selectedLanguage }: MicRecorderProps) {
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [canRecordAgain, setCanRecordAgain] = useState(true);
    const [chatResponse, setChatResponse] = useState('');
    const [showChatResponse, setShowChatResponse] = useState(false);
    const [chatData, setChatData] = useState<any | null>(null);
    const [totalSeconds, setTotalSeconds] = useState(0);

    const selectedLanguageRef = useRef(selectedLanguage);
    useEffect(() => {
        selectedLanguageRef.current = selectedLanguage;
    }, [selectedLanguage]);

    const standbyMessages = [
        "こんにちはもん！",
        "質問してねもん！",
        "展示会どうだったもん？"
    ];

    // Initial default value to avoid hydration mismatch
    const [standbyMessage, setStandbyMessage] = useState(standbyMessages[0]);

    // Randomize standby messages after mounting on the client-side
    useEffect(() => {
        // Check if running on the client-side (window object available)
        if (typeof window !== "undefined") {
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
        }
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
        let totalSeconds = 0;
        setIsProcessing(true);
        setAudioURL(newAudioURL);

        try {
            const response = await convertSpeechToTextResponse(newAudioBlob, selectedLanguageRef.current);

            if (response.data) {
                setChatResponse(response.data.chat_response.map((res: any) => res.text).join(' '));
                totalSeconds = response.data.chat_response.reduce((sum: number, item: { time_range: number }) => {
                    return (sum + item.time_range);
                }, 0);
                totalSeconds = totalSeconds * 1000;
                setChatData(response); 
            } else {
                setChatResponse('An error occurred.');
                console.error('Upload failed:', response);
            }
        } catch (error) {
            console.error('Error processing audio:', error);
            setChatResponse('An error occurred.');
        } finally {
            setIsProcessing(false);
            setShowChatResponse(true);
            setTimeout(() => {
                setShowChatResponse(false);
                setCanRecordAgain(true);
                setStandbyMessage("")
            }, totalSeconds);
        }       
    }, [selectedLanguage]);

    return (
        <div className="flex flex-col items-center justify-center space-y-6 z-20">
            <div className="text-[#333333] font-bold text-[36px] transition-opacity duration-300 text-center h-6 top-[28vh] absolute">
                {isProcessing ? (
                    <span className="text-[64px]">くまモン考え中...</span>
                ) : showChatResponse && chatData ? (
                    <ChatComponent chatData={chatData} />
                ) : (
                    <span className="text-[64px]">{standbyMessage}</span>
                )}
            </div>

            <div className="w-full sm:w-[628px] h-[110px] rounded-full overflow-hidden flex items-center justify-center top-[58vh] absolute">
                <ReactMic
                    record={recording}
                    className="react-mic"
                    onStop={onStopRecording}
                    mimeType="audio/wav"
                    backgroundColor="#2e7b99"
                    strokeColor="#c8dfef"
                />
            </div>
        </div>
    );
}