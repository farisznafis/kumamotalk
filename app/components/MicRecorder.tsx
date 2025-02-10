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
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

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

    // Get list of microphones
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const audioDevices = devices.filter(device => device.kind === 'audioinput');
                setDevices(audioDevices);
                if (audioDevices.length > 0) {
                    setSelectedDevice(audioDevices[0].deviceId); // Select first mic by default
                }
            })
            .catch(error => console.error("Error fetching devices:", error));
    }, []);

    // Update media stream when the mic selection changes
    useEffect(() => {
        if (selectedDevice) {
            navigator.mediaDevices.getUserMedia({ audio: { deviceId: { exact: selectedDevice } } })
                .then(stream => setMediaStream(stream))
                .catch(error => console.error("Error accessing microphone:", error));
        }
    }, [selectedDevice]);

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
        <div className="flex flex-col items-center justify-center space-y-8 z-20 relative">
            <p className={`text-white text-[24px] transition-opacity duration-300 w-[700px] text-center h-6 ${messageShown ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {recordFinished ? "これはさまざまな言語をテストするために設計されたシンプルなテキストテンプレートです。200文字の制限内に収まるようにテキストの長さとフォーマットを確認することが重要です。"
                :
                <span className='text-[36px]'>質問してください</span>}
            </p>

            <div className="w-full sm:w-[200px] h-[80px] rounded-full overflow-hidden flex items-center justify-center top-[15vh] relative">
                <ReactMic record={recording} className="react-mic" onStop={onStopRecording} mimeType="audio/wav" />
            </div>
            {/* Dropdown to select microphone */}
            <select
                value={selectedDevice || ''}
                onChange={e => setSelectedDevice(e.target.value)}
                className="fixed top-0 right-0 p-2 border rounded text-black"
            >
                {devices.map(device => (
                    <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Microphone ${devices.indexOf(device) + 1}`}
                    </option>
                ))}
            </select>

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
