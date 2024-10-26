import React, { useState, useRef } from "react";
import LoadScreenPopUp from "./LoadScreenPopUp";
import "../style/UploadResumePopUp.css";
import axios from "axios";

const UploadResumePopUp = ({
  isVisible,
  closePopup,
  // isError,
  // startMockInterview,
  updateQuestion,
  setLoading,
  isLoading,
}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // const [isLoading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [retrying, setRetrying] = useState(false); // State to track if we are retrying

  const validExtensions = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (selectedFile) => {
    if (selectedFile && validExtensions.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
      console.log(`Selected file: ${selectedFile.name}`);
      handleUploadClick(selectedFile);
    } else {
      setFile(null);
      setError("Please upload a valid PDF or DOC file.");
      console.log("Invalid file type selected.");
    }
  };

  //This function will be used to upload the file and the return will the first question base on te Resume and pass to StartMockInterviewPopup component
  const handleUploadClick = async (selectedFile) => {
    // setLoading(true);
    // console.log("Starting upload process...");

    // // Simulate upload completion
    // setTimeout(() => {
    //   setLoading(false);
    //   console.log("Upload process completed:", selectedFile.name);
    //   setLoading(true); // Trigger LoadScreenPopUp to check connection
    // }, 1000); // Simulating a 1-second upload time
    try {
      setLoading(true);
      console.log("Starting upload process...");
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:5000/api/generateQuestions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.question);
      updateQuestion(response.data.question);
    } catch (err) {
      console.log("An error occurred during upload:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetryUpload = () => {
    setRetrying(true);
    resetUpload(); // Reset upload state
  };

  const resetUpload = () => {
    setFile(null);
    setError("");
    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    console.log("File dropped:", droppedFile.name);
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    console.log("File is being dragged over the upload area.");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    console.log("File drag left the upload area.");
  };

  return (
    isVisible && (
      <div className="upload-container">
        <div className="upload-popup">
          {isLoading ? (
            <LoadScreenPopUp
            // isError={isError}
            // onRetry={handleRetryUpload} // Pass the retry logic
            // closePopup={closePopup}
            // checkConnection={true} // Trigger connection check
            // startMockInterview={startMockInterview} // Pass the function to LoadScreenPopUp
            />
          ) : (
            <div
              className="upload-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="upload-content">
                <i className="bx bx-upload upload-icon"></i>
                <p>Drag and Drop files to upload</p>
                <p>or</p>
                <button
                  className="browse-btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  Browse
                </button>
                <p className="file-support">Supported files: PDF, DOC, DOCX</p>
                {error && <p className="error-message">{error}</p>}
                {file && (
                  <p className="selected-file">Selected File: {file.name}</p>
                )}
                {retrying && (
                  <p className="warning-message"> 
                    An error has occurred. Please upload your file again.
                  </p>
                )}{" "}
                {/* Warning message */}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e.target.files[0])}
                accept=".pdf, .doc, .docx"
                style={{ display: "none" }}
              />
            </div>
          )}
          <button className="close-popup" onClick={closePopup}>
            <i className="bx bx-x"></i> {/* Close icon */}
          </button>
        </div>
      </div>
    )
  );
};

export default UploadResumePopUp;
