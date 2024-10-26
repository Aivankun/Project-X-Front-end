import React, { useState, useRef } from "react";
import SidebarMainDashboard from "../components/SidebarMainDashboard";
import StartMockInterviewPopup from "../components/StartMockInterviewPopup";
import CardOptions from "../components/CardOptions";
import NavbarMainDashboard from "../components/NavbarMainDashboard";
import UploadResumePopUp from "../components/UploadResumePopUp";
import "../style/UploadResumePopUp.css";

const MainDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isUploadVisible, setUploadVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  // const [isError, ,setError] = useState(false); // Ensure this state is defined
  const videoRef = useRef(null);
  // const [firstQuestion, setFirstQuestion] = useState(""); // Initialize the state
  const [question, setQuestion] = useState([]); // Initialize the state
  const [isLoading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0); // State for current question

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const startMockInterview = () => setPopupVisible(true);
  const closePopup = () => {
    setPopupVisible(false);
    setCurrentQuestion(0); // Reset to the first question when closing
  };
  const openUploadPopup = () => setUploadVisible(true);

  const closeUploadPopup = () => {
    setUploadVisible(false);
  };

  const updateQuestion = (question) => {
    setQuestion(question); // Update the state when the question is fetched
    setLoading(false); // Stop loading when question is ready
    closeUploadPopup(); // Close the upload popup after fetching the question
    setPopupVisible(true); // Open mock interview popup when the first question is available
  };

  return (
    <>
      <SidebarMainDashboard
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <section className="home-section">
        <NavbarMainDashboard
          isDropdownVisible={isDropdownVisible}
          setDropdownVisible={setDropdownVisible}
        />
        <CardOptions
          startMockInterview={startMockInterview}
          openUploadPopup={openUploadPopup}
        />
      </section>
      <StartMockInterviewPopup
        isPopupVisible={isPopupVisible}
        closePopup={closePopup}
        videoRef={videoRef}
        question={question}
        currentQuestion={currentQuestion} // Pass current question
        setCurrentQuestion={setCurrentQuestion} // Pass setter function
      />

      <UploadResumePopUp
        isVisible={isUploadVisible}
        closePopup={closeUploadPopup}
        // isError={isError} // Pass the error state if needed
        startMockInterview={startMockInterview} // Pass the function here
        updateQuestion={updateQuestion}
        setLoading={setLoading} // Set loading state from here
        isLoading={isLoading} // Pass loading state to the child
      />
    </>
  );
};

export default MainDashboard;
