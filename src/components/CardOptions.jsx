import React, { useState } from 'react';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';

const CardOptions = ({ openInterviewPopup, openUploadPopup }) => {
  return (
    <>
      <div className="card" id="mockInterviewOptions">
        <h2>Select Professional Career Interview</h2>
        <div className="card-container">
          <div className="option-container">
            <div onClick={openInterviewPopup} className="option-card">
              <div className="smile-job">
                <img src={img2} alt="Start Mock Interview" className="option-image" />
              </div>
              <p className='job-name'>Behavioral Interview </p>
              <p className='content-job'>This section contains information and resources related to behavioral interviews. You can find tips, common questions, and practice exercises here to help you prepare for behavioral aspects of your interviews.</p>
              <br />
              <br />
              <p className='no-of-question'>5 Questions</p>
            </div>

            <div onClick={openUploadPopup} className="option-card">
              <div className="smile-job">
                <img src={img1} alt='Resume Questionnaire' className="option-image" />
              </div>
              <p className='job-name'>Resume Questionnaire</p>
              <p className='content-job'>This section provides a questionnaire to help you build and improve your resume. Answer the questions to get personalized suggestions on how to enhance your resume and make it stand out to potential employers.</p>
              <br />
              <br />
              <p className='no-of-question'>Upload a PDF or DOC file</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardOptions;
