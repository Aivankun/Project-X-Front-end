import React, { useState, useRef } from 'react';
import LoadScreenPopUp from '../components/LoadScreenPopUp'; // Import LoadScreenPopUp
import SidebarMainDashboard from '../components/SidebarMainDashboard';
import NavbarMainDashboard from '../components/NavbarMainDashboard';
import UploadResume from '../components/UploadResume';
// import StartMockInterviewPopup from '../components/StartMockInterviewPopup';
import '../style/ResumeEvaluatorPage.css';

const ResumeEvaluator = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false); 
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar open/close
  const [isLoading, setIsLoading] = useState(false); // Single declaration of loading state
  const [isError, setIsError] = useState(false); // State to track error
  // const [isPopupVisible, setPopupVisible] = useState(false);
  // const videoRef = useRef(null);
  // const [question, setQuestion] = useState([]); // Initialize the state
  // const [currentQuestion, setCurrentQuestion] = useState(0); // State for current question

  // const startMockInterview = () => {
  //   setPopupVisible(true);
  // };

  // const closePopup = () => {
  //   setPopupVisible(false);
  //   setCurrentQuestion(0); // Reset to the first question when closing
  // };

  // const updateQuestion = (question) => {
  //   setQuestion(question); // Update the state when the question is fetched
  //   setIsLoading(false); // Stop loading when question is ready
  //   setPopupVisible(true); // Open mock interview popup when the first question is available
  // };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Toggle the sidebar state
  };
  
  const handleRetry = () => {
    setIsLoading(false);
    setIsError(false);
  };

  return (
    <>
      <SidebarMainDashboard toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <section className="home-section">
        <NavbarMainDashboard 
          isDropdownVisible={isDropdownVisible} 
          setDropdownVisible={setDropdownVisible} 
        />

        <div className="resume-evaluator-container">
          <h2>Resume Evaluator</h2>
          {/* Upload Resume Card */}
          <UploadResume 
            // updateQuestion={updateQuestion} 
            setLoading={setIsLoading} // Pass setIsLoading to manage loading state
          />
        </div>
        
      </section>

      {/* LoadScreenPopUp for loading and error handling */}
      {isLoading && (
        <LoadScreenPopUp 
          isError={isError} 
          onRetry={handleRetry} 
          checkConnection={true} 
          closePopup={() => setIsLoading(false)} // Pass the close function
        />
      )}
      {/* <StartMockInterviewPopup
        isPopupVisible={isPopupVisible}
        closePopup={closePopup}
        videoRef={videoRef}
        question={question}
        currentQuestion={currentQuestion} // Pass current question
        setCurrentQuestion={setCurrentQuestion} // Pass setter function
      /> */}
    </>
  );
};

export default ResumeEvaluator;
