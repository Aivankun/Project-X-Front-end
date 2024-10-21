// Popup.js
import React, { useEffect, useRef, useState } from 'react';

const Popup = ({ onClose }) => {
    const videoRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [timer, setTimer] = useState("00:00");
    const [seconds, setSeconds] = useState(0);
    let timerInterval = null;

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = handleDataAvailable;
        recorder.onstop = handleStop;
        setMediaRecorder(recorder);
    };

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            setRecordedChunks(prev => [...prev, event.data]);
        }
    };

    const handleStop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        setRecordedChunks([]);
        const saveRecording = window.confirm("Do you want to save the recording?");
        if (saveRecording) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recording.webm';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
            clearInterval(timerInterval);
        } else {
            mediaRecorder.start();
            setIsRecording(true);
            startTimer();
        }
    };

    const startTimer = () => {
        setSeconds(0);
        timerInterval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
    };

    useEffect(() => {
        if (seconds > 0) {
            const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');
            setTimer(`${mins}:${secs}`);
        }
    }, [seconds]);

    useEffect(() => {
        startCamera();
        return () => {
            const stream = videoRef.current.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="popup-container" style={{ display: 'flex' }}>
            <div className="popup-content">
                <i className='bx bx-x' onClick={onClose}></i>
                <div className="timer">{timer}/01:30</div>
                <video ref={videoRef} autoPlay></video>
                <div className="avatar">AVATAR</div>
                <div className="sample-question">Sample Question: What are your strengths?</div>
                <button className="record-btn" onClick={toggleRecording}>
                    <i className='bx bx-video'></i>
                </button>
            </div>
        </div>
    );
};

export default Popup;
