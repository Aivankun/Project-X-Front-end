import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadScreen from "./LoadScreen"; // Import LoadScreen component
import LoadScreenResult from "./LoadScreenResult"; // Import LoadScreenResult component
import introJs from "intro.js"; // Import Intro.js
import "intro.js/introjs.css"; // Import Intro.js CSS

const StartMockInterviewPopupInBehavior = ({
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
          video: { facingMode: "user" },
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
              element: ".record-btn",
              intro: "Click here to start and stop recording your answer.",
              position: "left",
            },
            {
              element: ".timer",
              intro:
                "This is the timer. You have 2 minutes to answer each question.",
              position: "left",
            },
            {
              element: ".questions",
              intro: "Here is the interview question you need to answer.",
              position: "left",
            },
            {
              element: '#closePopupBtn',
              intro: 'Click this to close the mock interview.',
              position: 'left',
            },
            {
              intro: `
                🎥 <b>Quick Tips for Your Interview!</b><br>
                <br>
                <p>Here are some tips to help you have a great Interview</p><br>
                <ul>

                  <li>Ensure your camera and microphone are working properly</li><br>
                  <li>Find a quiet place with good lighting</li><br>
                  <li>Maintain eye contact with the camera</li><br>
                  <li>Speak clearly and at a moderate pace</li><br><br>
                </ul>
              `,
              position: 'center',
              tooltipClass: 'custom-tooltip-last custom-width-500', // Custom class for last step
            },
          ],
          showBullets: false,
          overlayOpacity: 0.8,
          tooltipClass: 'custom-tooltip',
          buttonClass: 'custom-intro-button',
          doneLabel: 'Got It', // Label for final button
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
  }, [
    isPopupVisible,
    currentQuestion,
    speakQuestion,
    hasSpoken,
    hasIntroDisplayed,
  ]);

  const handleRecordButtonClick = useCallback(() => {
    const stream = videoRef.current.srcObject;

    if (isRecording) {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleLoadComplete = () => {
    navigate("/result"); // Navigate to the result page after loading
  };

  return isPopupVisible ? (
    <div className="popup-container" style={{ display: "flex" }}>

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
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%" }}
          />
        </div>

        <div className="sample-question">
          <p className="ans_q_a">Interview Question</p>
          <p className="questions">{question[currentQuestion]}</p>
        </div>
        <button onClick={handleRecordButtonClick} className="record-btn">
          {isRecording ? (
            <i className="bx bx-stop"></i>
          ) : (
            <i className="bx bx-microphone"></i>
          )}
        </button>
      </div>

    </div>
  ) : null;
};

export default StartMockInterviewPopupInBehavior;
