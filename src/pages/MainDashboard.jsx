// src/components/MainDashboard.jsx

import React, { useState, useRef } from "react";
import SidebarMainDashboard from "../components/SidebarMainDashboard";
import StartMockInterviewPopup from "../components/StartMockInterviewPopup";
import CardOptions from "../components/CardOptions";
import NavbarMainDashboard from "../components/NavbarMainDashboard";
import UploadResumePopUp from "../components/UploadResumePopUp";
import InterviewCategoryPopup from "../components/InterviewCategoryPopup"; // Import the popup
import "../style/UploadResumePopUp.css";

const MainDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isUploadVisible, setUploadVisible] = useState(false);
  const [isInterviewPopupVisible, setInterviewPopupVisible] = useState(false);
  const [videoRef, setVideoRef] = useState(null);
  const [question, setQuestion] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Add this line

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const startMockInterview = () => setPopupVisible(true);
  const closePopup = () => {
    setPopupVisible(false);
    setCurrentQuestion(0);
  };
  const openUploadPopup = () => setUploadVisible(true);
  const closeUploadPopup = () => setUploadVisible(false);

  const openInterviewPopup = () => {
    setInterviewPopupVisible(true);
  };

  const closeInterviewPopup = () => {
    setInterviewPopupVisible(false);
  };

  const updateQuestion = (question) => {
    setQuestion(question);
    setLoading(false);
    closeUploadPopup();
    setPopupVisible(true);
  };

  // New function to handle category selection
  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
    startMockInterview(); // Open the mock interview popup
    // Here you can set the category-related questions based on the selected category if needed
  };

  return (
    <>
      <SidebarMainDashboard toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <section className="home-section">
        <NavbarMainDashboard 
        isDropdownVisible={isDropdownVisible} 
        setDropdownVisible={setDropdownVisible} />
        <CardOptions
          openInterviewPopup={openInterviewPopup}
          openUploadPopup={openUploadPopup}
        />
      </section>

      <StartMockInterviewPopup
        isPopupVisible={isPopupVisible}
        closePopup={closePopup}
        videoRef={videoRef}
        question={question}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />

      <UploadResumePopUp
        isVisible={isUploadVisible}
        closePopup={closeUploadPopup}
        startMockInterview={startMockInterview} 
        updateQuestion={updateQuestion}
        setLoading={setLoading} 
        isLoading={isLoading}
      />

      {isInterviewPopupVisible && (
        <InterviewCategoryPopup onClose={closeInterviewPopup} onCategorySelect={handleCategorySelect} />
      )}
    </>
  );
};

export default MainDashboard;
