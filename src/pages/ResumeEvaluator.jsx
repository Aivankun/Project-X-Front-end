import React, { useState, useRef } from 'react';
import LoadScreenPopUp from '../components/LoadScreenPopUp'; // Import LoadScreenPopUp
import SidebarMainDashboard from '../components/SidebarMainDashboard';
import NavbarMainDashboard from '../components/NavbarMainDashboard';
import UploadResume from '../components/UploadResume';
import StartMockInterviewPopup from '../components/StartMockInterviewPopup';
import '../style/ResumeEvaluatorPage.css';

const ResumeEvaluator = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false); 
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar open/close
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false); // State to track error
  const [isPopupVisible, setPopupVisible] = useState(false);
  const videoRef = useRef(null);

  const startMockInterview = () => {
    setPopupVisible(true);
    console.log("Starting mock interview...");
  };

  const closePopup = () => setPopupVisible(false);
  
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Toggle the sidebar state
  };
  
  const handleUploadClick = (file) => {

    setIsLoading(true); // Start loading
  };

  const handleRetry = () => {
    setIsLoading(false);
    setIsError(false);
  };

  // Close LoadScreenPopUp
  const closeLoadScreenPopUp = () => {
    setIsLoading(false);
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
            handleUploadClick={handleUploadClick} 
            startMockInterview={startMockInterview} 
            isError={isError} 
            setIsError={setIsError} // Pass setIsError to manage error state
            setIsLoading={setIsLoading} // Pass setIsLoading to manage loading state
          />
        </div>
        
      </section>

      {/* LoadScreenPopUp for loading and error handling */}
      {isLoading && (
        <LoadScreenPopUp 
          isError={isError} 
          onRetry={handleRetry} 
          checkConnection={true} 
          startMockInterview={startMockInterview} 
          closePopup={closeLoadScreenPopUp} // Pass the close function
        />
      )}

      <StartMockInterviewPopup 
        isPopupVisible={isPopupVisible} 
        closePopup={closePopup} 
        videoRef={videoRef} 
      />
    </>
  );
};

export default ResumeEvaluator;
