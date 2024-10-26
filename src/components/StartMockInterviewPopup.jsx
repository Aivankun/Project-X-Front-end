import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadScreen from "./LoadScreen"; // Import LoadScreen component
import LoadScreenResult from "./LoadScreenResult"; // Import LoadScreenResult component
import introJs from 'intro.js'; // Import Intro.js
import 'intro.js/introjs.css'; // Import Intro.js CSS

const StartMockInterviewPopup = ({
  isPopupVisible,
  closePopup,
  question,
  currentQuestion,
  setCurrentQuestion,
}) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef(null);
  const [isTimesUp, setIsTimesUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadScreenResult, setShowLoadScreenResult] = useState(false); // State for LoadScreenResult
  const [hasSpoken, setHasSpoken] = useState(false);
  const [hasIntroDisplayed, setHasIntroDisplayed] = useState(false);
  const navigate = useNavigate();

  const totalQuestions = question.length;
  const questionTimeLimit = 120; // 2 minutes per question

  const speakQuestion = useCallback((text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }, []);

  const handleNextQuestion = useCallback(() => {
    clearInterval(timerRef.current);
    if (currentQuestion < totalQuestions - 1) {
      if (isRecording) {
        mediaRecorderRef.current.stop();
        recordedChunksRef.current = [];
        setIsRecording(false);
      }
      setCurrentQuestion((prev) => prev + 1);
      setTimeElapsed(0);
      setHasSpoken(false);
    } else {
      // Last question answered, show loading screen result
      setShowLoadScreenResult(true);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  }, [currentQuestion, totalQuestions, closePopup, isRecording, navigate]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { exact: "user" } },
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    if (isPopupVisible) {
      startCamera();
      setTimeElapsed(0);
      if (!hasSpoken) {
        speakQuestion(question[currentQuestion]);
        setHasSpoken(true);
      }

      if (!hasIntroDisplayed) {
        const intro = introJs();
        intro.setOptions({
          steps: [
            {
              element: '.record-btn',
              intro: 'Click here to start recording your answer.',
              position: 'left',
            },
            {
              element: '.timer',
              intro: 'This is the timer. You have 2 minutes to answer each question.',
              position: 'left',
            },
            {
              element: '.sample-question',
              intro: 'Here is the question you need to answer.',
              position: 'left',
            },
            {
              element: '#closePopupBtn',
              intro: 'Click this to close the mock interview.',
              position: 'left',
            },
          ],
          showBullets: false,
          overlayOpacity: 0.8,
          tooltipClass: 'custom-tooltip',
          buttonClass: 'custom-intro-button',
        });
        intro.start();
        setHasIntroDisplayed(true);
      }
    }

    const currentVideoRef = videoRef.current;

    return () => {
      if (currentVideoRef && currentVideoRef.srcObject) {
        const tracks = currentVideoRef.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
      clearInterval(timerRef.current);
    };
  }, [isPopupVisible, currentQuestion, speakQuestion, hasSpoken, hasIntroDisplayed]);

  const handleRecordButtonClick = useCallback(() => {
    const stream = videoRef.current.srcObject;

    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        clearInterval(timerRef.current);

        mediaRecorderRef.current.onstop = () => {
          if (recordedChunksRef.current.length > 0) {
            setIsLoading(true);
            uploadVideo().then(() => {
              // Handle loading screen based on last question
              if (currentQuestion === totalQuestions - 1) {
                setShowLoadScreenResult(true);
              } else {
                setTimeout(() => {
                  setIsLoading(false);
                  handleNextQuestion();
                }, 2000);
              }
            });
          } else {
            console.error("No video data available after stop");
          }
        };
      }
    } else {
      recordedChunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setTimeElapsed(0);

      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
  }, [isRecording, handleNextQuestion, currentQuestion, totalQuestions]);

  const uploadVideo = async () => {
    try {
      if (recordedChunksRef.current.length === 0) {
        throw new Error("No video data to upload");
      }

      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      const formData = new FormData();
      formData.append("videoFile", blob, `question${currentQuestion + 1}.webm`);
      formData.append("question", question[currentQuestion]);

      const response = await axios.post(
        "http://localhost:5000/api/mockInterview",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Video uploaded successfully:", response.data);
    } catch (error) {
      console.log("Error uploading video:", error);
    } finally {
      recordedChunksRef.current = [];
    }
  };

  useEffect(() => {
    if (timeElapsed >= questionTimeLimit) {
      if (currentQuestion === totalQuestions - 1) {
        setIsTimesUp(true);
        if (isRecording) {
          mediaRecorderRef.current.stop();
          recordedChunksRef.current = [];
          setIsRecording(false);
        }
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
        }
      } else {
        handleRecordButtonClick();
        handleNextQuestion();
      }
    }
  }, [
    timeElapsed,
    handleRecordButtonClick,
    handleNextQuestion,
    currentQuestion,
    totalQuestions,
    isRecording,
  ]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleLoadComplete = () => {
    navigate("/result"); // Navigate to the result page after loading
  };

  //Tips and Guides
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: 6, // Center left (0 for x)
      y: 0 // Center vertically (adjusting for half height of the component)
    });
  }, []);

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  if (!isVisible) return null;
  return isPopupVisible ? (
    <div className="popup-container" style={{ display: "flex" }}>
      <div
        className="tips-guides"
        style={{
          position: 'absolute',
          zIndex: 1,
          left: position.x,
          top: position.y,
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp} // Stop dragging when mouse leaves
      >
        <h3>Tips and Guides</h3>
        <br />
        <p>🎥 Let's Get You Set Up!</p>
        <br />
        <p>
          Before Your Interview: • Testing 1-2-3: Quick check of your camera and mic • Internet Check: Make sure your connection is steady and strong • Light it Right: Face a window or lamp to show off your best self • Quiet Zone: Find your perfect peaceful spot • Background Check: Keep it clean and simple behind you
        </p>
        <br />
        <p>
          Pro Tips: ✨ Do a test call with a friend ✨ Close unnecessary browser tabs ✨ Keep your device plugged in ✨ Have a backup plan (phone hotspot) ✨ Position your camera at eye level
        </p>
        <br />
        <p>
          Remember: Being prepared helps you feel confident! Take 5 minutes to check these things, and you'll be ready to shine in your interview. You've got this! 🌟
        </p>
        <br />
        <p>Need help? We're here to guide you through each step! 😊</p>
      </div>
      <div className="popup-content">
        <i className="bx bx-x" id="closePopupBtn" onClick={closePopup}></i>
        <div className="timer" id="timer">
          {formatTime(timeElapsed)} / 02:00
        </div>
        <div className="question-tracking">
          Question {currentQuestion + 1}/{totalQuestions}
        </div>

        <div id="video">
          {isLoading && !showLoadScreenResult && <LoadScreen />}
          {showLoadScreenResult && (
            <LoadScreenResult onLoadComplete={handleLoadComplete} />
          )}
          <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
        </div>

        <div className="sample-question">
          <p className="ans_q_a">Answer the Interview Question</p>
          <p>{question[currentQuestion]}</p>
        </div>
        <button onClick={handleRecordButtonClick} className="record-btn">
          {isRecording ?  <i className="bx bx-stop"></i>: <i className="bx bx-microphone"></i>}
        </button>
      </div>
      
    </div>
  ) : null;
};

export default StartMockInterviewPopup;
