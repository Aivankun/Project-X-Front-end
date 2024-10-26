import React from 'react';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';

const CardOptions = ({ startMockInterview, openUploadPopup }) => {
  return (
    <div className="card" id="mockInterviewOptions">
      <h2>Select Professional Career Interview</h2>
      <div className="option-container">
        {/* Clickable Start Mock Interview Card */}
        <div onClick={startMockInterview} className="option-card">
          <img src={img2} alt="Start Mock Interview" className="option-image" />
          <p className='job-name'>Behavioral Interview</p>
          <p className='no-of-question'>5 Questions</p>
        </div>

        {/* Clickable Upload Resume Card */}
        <div onClick={openUploadPopup} className="option-card">
          <img src={img1} alt='Resume Questionare' className="option-image" />
          <p className='job-name'>Basic Resume Questionnaire</p>
          <p className='no-of-question'>Upload a PDF or DOC file</p>
        </div>
        
      </div>
    </div>
  );
};

export default CardOptions;
