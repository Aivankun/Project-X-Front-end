import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StartMockInterviewPopup = ({ isPopupVisible, closePopup }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef(null); // Ref to store the timer ID
  const [isTimesUp, setIsTimesUp] = useState(false); // State to track if time is up
  const navigate = useNavigate(); // Initialize useNavigate

  const questions = [
    "What are your strengths?",
    "What are your weaknesses?",
    "Why do you want this job?",
    "Describe a challenge you've faced at work?",
    "Where do you see yourself in five years?",
  ];
  const totalQuestions = questions.length;
  const questionTimeLimit = 3; // Set time limit to 3 seconds

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    if (isPopupVisible) {
      startCamera();
      setTimeElapsed(0); // Reset time when popup becomes visible
      setIsTimesUp(false); // Reset times up state
    }

    // Use a local variable to store the videoRef.current value for cleanup
    const currentVideoRef = videoRef.current;

    return () => {
      if (currentVideoRef && currentVideoRef.srcObject) {
        const tracks = currentVideoRef.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
      clearInterval(timerRef.current); // Clear timer on unmount
    };
  }, [isPopupVisible]);

  const handleRecordButtonClick = useCallback(() => {
    const stream = videoRef.current.srcObject;
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current); // Stop the timer when recording stops
    } else {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        recordedChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setTimeElapsed(0); // Reset time when starting a new recording

      // Start the timer when recording starts
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
  }, [isRecording]);

  const handleNextQuestion = useCallback(() => {
    clearInterval(timerRef.current); // Stop the timer when moving to the next question
    if (currentQuestion < totalQuestions - 1) {
      // Stop recording before moving to the next question
      if (isRecording) {
        mediaRecorderRef.current.stop(); // Stop recording
        recordedChunksRef.current = []; // Clear recorded chunks for the next question
        setIsRecording(false); // Update the recording state
      }
      setCurrentQuestion(prev => prev + 1);
      setTimeElapsed(0); // Reset time for the next question
      setIsTimesUp(false); // Reset times up state
    } else {
      // Stop the camera and clear the timer when viewing results
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
      closePopup(); // Close the popup
      navigate('/result'); // Redirect to the /result page
    }
  }, [currentQuestion, totalQuestions, closePopup, isRecording, navigate]);

  useEffect(() => {
    if (timeElapsed >= questionTimeLimit) {
      if (currentQuestion === totalQuestions - 1) {
        setIsTimesUp(true); // Set times up state for the last question
        // Stop recording and camera when time is up on the last question
        if (isRecording) {
          mediaRecorderRef.current.stop(); // Stop recording
          recordedChunksRef.current = []; // Clear recorded chunks for the next question
          setIsRecording(false); // Update the recording state
        }
        // Stop the camera
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
      } else {
        handleRecordButtonClick();
        handleNextQuestion();
      }
    }
  }, [timeElapsed, handleRecordButtonClick, handleNextQuestion, currentQuestion, totalQuestions, isRecording]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return isPopupVisible ? (
    <div className="popup-container" style={{ display: "flex" }}>
      <div className="popup-content">
        <i className="bx bx-x" id="closePopupBtn" onClick={closePopup}></i>

        {/* Question Tracking */}
        <div className="question-tracking">
          Question {currentQuestion + 1}/{totalQuestions}
        </div>

        {!isTimesUp ? (
          <>
            <div className="timer" id="timer">{formatTime(timeElapsed)} / 00:03</div>
            <video ref={videoRef} autoPlay style={{ width: "100%", height: "auto", transform: 'scale(-1, 1)' }}></video>
            <div className="avatar">AVATAR</div>

            <div className="sample-question">
              {currentQuestion < totalQuestions
                ? `Question ${currentQuestion + 1}: ${questions[currentQuestion]}`
                : "Sample Result: You completed the interview!"}
            </div>
            <button className="record-btn" onClick={handleRecordButtonClick}>
              {isRecording ? <i className="bx bx-stop"></i> : <i className="bx bx-video"></i>}
            </button>
          </>
        ) : (
          <>
            <div className="times-up-message">Times Up!</div>
            <div className="avatar">AVATAR</div>
            <div className="sample-question">Analyzing Results</div>
          </>
        )}

        <button 
          className="next-btn" 
          onClick={handleNextQuestion} 
          disabled={currentQuestion >= totalQuestions}
        >
          {currentQuestion < totalQuestions - 1 ? 'Next' : 'Results'} 
          <i className="bx bx-right-arrow-alt"></i>
        </button>
      </div>
    </div>
  ) : null;
};

export default StartMockInterviewPopup;
