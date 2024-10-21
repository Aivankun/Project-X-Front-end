// src/pages/Result.jsx
import React, { useState } from 'react';
import SidebarMainDashboard from '../components/SidebarMainDashboard';
import NavbarMainDashboard from '../components/NavbarMainDashboard';
import '../style/Result.css';
const Result = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false); 
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar open/close

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Toggle the sidebar state
  };

  return (
    <div >
      <SidebarMainDashboard toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <section className="home-section">
        <NavbarMainDashboard 
          isDropdownVisible={isDropdownVisible} 
          setDropdownVisible={setDropdownVisible} 
        />

        <div className="result-container">
          <h2>Interview Results</h2>
          <p>Your interview results will be displayed here.</p>
          <div className="result-details">
            <p className='score'>0</p>
            <p>Result 1: You answered 4 out of 5 questions correctly.</p>
            <p>Result 2: Overall performance was satisfactory.</p>
          </div>
        </div>
        
      </section>
    </div>
  );
};

export default Result;
