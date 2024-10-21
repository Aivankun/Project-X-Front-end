import React, { useEffect, useState } from 'react';
import '../style/LoadScreenPopUp.css';

const LoadScreenPopUp = ({ isError, onRetry, closePopup, checkConnection, startMockInterview }) => {
  const [message, setMessage] = useState('Uploading your resume, please wait...');
  const [isLoading, setIsLoading] = useState(true);
  const [connectionSuccessful, setConnectionSuccessful] = useState(false);

  useEffect(() => {
    if (isError) {
      setMessage('Unexpected error, please check your internet or try again.');
      setIsLoading(false);
    } else if (checkConnection && !connectionSuccessful) {
      const connectionCheckTimeout = setTimeout(() => {
        console.log('Checking connection to the backend...');
        setMessage('Checking connection to the backend...');

        // Simulate a successful connection
        const connectionCheck = true ; // Change this to false to simulate failure

        if (connectionCheck) {
          setMessage('Connection successful!');
          setConnectionSuccessful(true); // Set the flag to true if connection is successful
        } else {
          setIsLoading(false); // End loading if connection fails
        }
      }, 2000); // Simulating a 2-second connection check

      return () => clearTimeout(connectionCheckTimeout);
    } else if (connectionSuccessful) {
      // Only run the analysis and preparation steps if the connection is successful
      const messageTimer1 = setTimeout(() => {
        setMessage('Analyzing Resume...');
        console.log('Loading message updated to: Analyzing Resume...');
      }, 4000);

      const messageTimer2 = setTimeout(() => {
        setMessage('Preparing Interview Questions...');
        console.log('Loading message updated to: Preparing Interview Questions...');
        setIsLoading(false); // Stop loading state
        startMockInterview(); // Trigger the mock interview popup
        closePopup(); // Close the LoadScreenPopUp after preparing questions
      }, 8000);

      return () => {
        clearTimeout(messageTimer1);
        clearTimeout(messageTimer2);
      };
    }
  }, [isError, checkConnection, connectionSuccessful, startMockInterview, closePopup]);

  const handleRetry = () => {
    setMessage('Retrying upload...');
    setConnectionSuccessful(false); // Reset connection check on retry
    onRetry(); // Call the retry function passed from the parent
  };

  return (
    <div className='upload-container'>
      <div className="upload-popup loading-popup">
        {isLoading ? (
          <>
            <div className="spinner"></div> {/* Add your spinner styles here */}
            <p>{message}</p>
            <button className="close-popup" onClick={closePopup}>
              <i className="bx bx-x"></i> {/* Close icon */}
            </button>
          </>
        ) : (
          <div className="error-message">
            <p>{message}</p>
            {isError ? (
              <button onClick={handleRetry} className="retry-button">
                Try Again
              </button>
            ) : null}
            <button className="close-popup" onClick={closePopup}>
              <i className="bx bx-x"></i> {/* Close icon */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadScreenPopUp;
