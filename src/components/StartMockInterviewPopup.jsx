import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadScreen from "./LoadScreen"; // Import LoadScreen component
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
  const [isLoading, setIsLoading] = useState(false); // State to control loading screen
  const [hasSpoken, setHasSpoken] = useState(false); // State to track if question has been spoken
  const [hasIntroDisplayed, setHasIntroDisplayed] = useState(false); // State to track intro display
  const navigate = useNavigate();

  // const questions = [
  //   question,
  //   "What are the main differences between class and id selectors in CSS?",
  //   "Explain the box model in CSS?",
  //   "What is a responsive web design?",
  //   "What is the purpose of JavaScript in web development?",
  // ];
  // const questions = [
  //   firstQuestion,
  //   "What are the main differences between class and id selectors in CSS?",
  //   "Explain the box model in CSS?",
  //   "What is responsive web design?",
  //   "What is the purpose of JavaScript in web development?",
  // ];

  const totalQuestions = question.length;
  const questionTimeLimit = 120; // 2 minutes per question

  const speakQuestion = useCallback((text) => {
    console.log("Speaking question:", text); // Log the text being spoken
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
      setHasSpoken(false); // Reset hasSpoken for the new question
    } else {
      setTimeElapsed(0);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
      closePopup();
      navigate("/result");
    }
  }, [currentQuestion, totalQuestions, closePopup, isRecording, navigate]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
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
        speakQuestion(question[currentQuestion]); // Speak the question only if it hasn't been spoken
        setHasSpoken(true); // Mark the question as spoken
      }
      
      // Start Intro.js only if it hasn't been displayed yet
      if (!hasIntroDisplayed) {
        const intro = introJs();
        intro.setOptions({
          steps: [
            {
              element: '.record-btn',
              intro: 'Click here to start recording your answer.',
              position: 'bottom',
            },
            {
              element: '.timer',
              intro: 'This is the timer. You have 2 minutes to answer each question.',
              position: 'top',
            },
            {
              element: '.sample-question',
              intro: 'Here is the question you need to answer.',
              position: 'right',
            },
            {
              element: '#closePopupBtn',
              intro: 'Click this to close the mock interview.',
              position: 'left',
            },
          ],
          showBullets: false,
          overlayOpacity: 0.8,
          tooltipClass: 'custom-tooltip', // Add custom tooltip class
          buttonClass: 'custom-intro-button', // Add custom button class
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
            uploadVideo();

            setTimeout(() => {
              setIsLoading(false);
              handleNextQuestion();
            }, 2000);
          } else {
            console.error("No video data available after stop");
          }
        };
      }
    } else {
      recordedChunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(stream);
      console.log("Recording");

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
  }, [isRecording, handleNextQuestion]);

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

        <div style={{ position: "relative", maxWidth: "100%", height: "auto" }}>
          <video
            id="video"
            ref={videoRef}
            autoPlay
            style={{ width: "100%", height: "auto" }}
          ></video>
          {isLoading && <LoadScreen />}{" "}
          {/* Show loading screen when isLoading is true */}
        </div>

        <div className="avatar">AVATAR</div>
        <div className="sample-question">
          {currentQuestion < totalQuestions
            ? ` ${question[currentQuestion]}`
            : "Sample Result: You completed the interview!"}
        </div>
        <button className="record-btn" onClick={handleRecordButtonClick}>
          {isRecording ? (
            <i className="bx bx-stop"></i>
          ) : (
            <i className="bx bx-microphone"></i>
          )}
        </button>

        {isTimesUp && <div>Times Up!</div>}
     </div>
    </div>
  ) : null;
};

export default StartMockInterviewPopup;
