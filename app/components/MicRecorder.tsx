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
        <div className="flex items-center justify-center h-full text-[#333333] text-center w-[90vh]">
            <p className="text-[64px] opacity-100 transition-opacity duration-500 leading-[1.05] top-[10vh] mt-16">{displayedText}</p>
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
        "こんにちは、お元気ですか？",
        "ご質問があれば、お気軽にどうぞ",
        "展示会はいかがでしたか？"
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
                setStandbyMessage("お話しください");
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
        let isError = false;
        setIsProcessing(true);
        setAudioURL(newAudioURL);

        try {
            const response = await convertSpeechToTextResponse(newAudioBlob, selectedLanguageRef.current);

            if (response.success && response.data) {
                setChatResponse(response.data.chat_response.map((res: any) => res.text).join(' '));
                totalSeconds = response.data.chat_response.reduce((sum: number, item: { time_range: number }) => {
                    return (sum + item.time_range);
                }, 0);
                totalSeconds = totalSeconds * 1000;
                console.log("response : ", response);
                setChatData(response); 
            } else {
                setChatResponse('An error occurred.');
                totalSeconds = 4000
                let errResponse = {
                    "data" : {
                        "chat_response": [
                            {
                                "text" : "声が聞こえません！もう一度話してみてください",
                                "time_range" : 4
                            }
                        ]
                    }
                }
                setChatData(errResponse);
                isError = true;
                // console.error('Upload failed:', response);
            }
        } catch (error) {
            // console.error('Error processing audio:', error);
            setStandbyMessage('声が聞こえません！もう一度話してみてください');
            setChatResponse('An error occurred.');
            totalSeconds = 4000
                let errResponse = {
                    "data" : {
                        "chat_response": [
                            {
                                "text" : "声が聞こえません！もう一度話してみてください",
                                "time_range" : 4
                            }
                        ]
                    }
                }
            setChatData(errResponse);
            isError = true;
        } finally {
            setIsProcessing(false);
            setShowChatResponse(true);
            setTimeout(() => {
                setShowChatResponse(false);
                setCanRecordAgain(true);
                setStandbyMessage("")
            }, totalSeconds);
            if (isError) {
                setTimeout(() => {
                    window.location.reload(); // Reload the page after 2 seconds
                }, 2500);
            }
        }       
    }, [selectedLanguage]);

    return (
        <div className="flex flex-col items-center justify-center space-y-6 z-20">
            <div className="text-[#333333] font-bold text-[36px] transition-opacity duration-300 text-center h-6 top-[28vh] absolute">
                {isProcessing ? (
                    <span className="text-[64px]">考え中...</span>
                ) : showChatResponse && chatData ? (
                    <ChatComponent chatData={chatData} />
                ) : (
                    <span className="text-[64px]">{standbyMessage}</span>
                )}
            </div>

            <div className="w-full sm:w-[600px] h-[100px] rounded-full overflow-hidden flex items-center justify-center top-[61vh] absolute">
                <ReactMic
                    record={recording}
                    className="react-mic"
                    onStop={onStopRecording}
                    mimeType="audio/wav"
                    backgroundColor="#131313"
                    strokeColor="white"
                    style={{
                        border: '2px solid rgba(255, 255, 255, 0.5)', // White border with 50% opacity
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' // Optional shadow effect
                    }}
                />
            </div>

        </div>
    );
}