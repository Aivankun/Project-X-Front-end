import React, { useState, useRef } from 'react';
import SidebarMainDashboard from '../components/SidebarMainDashboard';
import StartMockInterviewPopup from '../components/StartMockInterviewPopup';
import CardOptions from '../components/CardOptions';
import NavbarMainDashboard from '../components/NavbarMainDashboard';
import UploadResumePopUp from '../components/UploadResumePopUp';
import '../style/UploadResumePopUp.css';

const MainDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isUploadVisible, setUploadVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isError] = useState(false); // Ensure this state is defined
  const videoRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const startMockInterview = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);
  
  const openUploadPopup = () => setUploadVisible(true);
  
  const closeUploadPopup = () => {
    setUploadVisible(false);
  };

  return (
    <>
      <SidebarMainDashboard toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
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
      />
      <UploadResumePopUp 
        isVisible={isUploadVisible} 
        closePopup={closeUploadPopup} 
        isError={isError} // Pass the error state if needed
        startMockInterview={startMockInterview} // Pass the function here
      />  
    </>
  );
};

export default MainDashboard;
