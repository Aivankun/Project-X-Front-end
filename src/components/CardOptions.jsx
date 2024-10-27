import React from 'react';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';

const CardOptions = ({ startMockInterview, openUploadPopup }) => {
  return (
    <>
    
    <div className="card" id="mockInterviewOptions">
      <h2>Select Professional Career Interview</h2>
      <div className="card-container">
        <div className="option-container">
          {/* Clickable Start Mock Interview Card */}
          <div onClick={startMockInterview} className="option-card">
            <div className="smile-job">
              {/* <i class='bx bx-smile' ></i> */}
              <img src={img2} alt="Start Mock Interview" className="option-image" />

              
            </div>
            <p className='job-name'>Behavioral Interview (IT)</p>
            <p className='content-job' >This section contains information and resources related to behavioral interviews. You can find tips, common questions, and practice exercises here to help you prepare for behavioral aspects of your interviews.</p>
            <br />
            <br />
          
            <p className='no-of-question'>5 Questions</p>
          </div>

          {/* Clickable Upload Resume Card */}
          <div onClick={openUploadPopup} className="option-card">
            <div className="smile-job">
              {/* <i class='bx bx-smile' ></i> */}
              <img src={img1} alt='Resume Questionnaire' className="option-image" />

              
            </div>
            <p className='job-name'>Resume Questionnaire</p>
            <p className='content-job'>This section provides a questionnaire to help you build and improve your resume. Answer the questions to get personalized suggestions on how to enhance your resume and make it stand out to potential employers..</p>
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
