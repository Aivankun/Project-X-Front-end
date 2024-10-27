// src/components/InterviewCategoryPopup.jsx

import React from 'react';
import "../style/InterviewCategoryPopup.css";

const InterviewCategoryPopup = ({ onClose, onCategorySelect }) => {
  const featureFrom = "Behavioral Interview"; // Declare the variable
  console.log(featureFrom); // Log the featureFrom variable

  const handleCategoryClick = (category) => {
    console.log(category); // Log the selected category
    onCategorySelect(category); // Pass the selected category to the parent
    onClose(); // Close the popup after selection
  };

  return (
    <div className="interview-popup-overlay">
      <div className="interview-popup-content">
        {/* Close button */}
        <button onClick={onClose} className="interview-close-popup-btn">
          <i className='bx bx-x'></i> {/* Boxicon close icon */}
        </button>
        <h2>Select Category</h2>
        <div className="interview-category-options">
          <button className="interview-category-btn" onClick={() => handleCategoryClick('Adaptability')}>
            Adaptability
          </button>
          <button className="interview-category-btn" onClick={() => handleCategoryClick('Teamwork')}>
            Teamwork
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCategoryPopup;
