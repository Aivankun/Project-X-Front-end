import React, { useState } from 'react';
import LoadScreenPopUp from '../components/LoadScreenPopUp';
import SidebarMainDashboard from '../components/SidebarMainDashboard';
import NavbarMainDashboard from '../components/NavbarMainDashboard';
import UploadResume from '../components/UploadResume';
import '../style/ResumeEvaluatorPage.css';

const ResumeEvaluator = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
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
          <UploadResume 
            setIsLoading={setIsLoading} // Pass setIsLoading to manage loading state
            setIsError={setIsError} // Pass setIsError if needed for error handling
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
    </>
  );
};

export default ResumeEvaluator;
