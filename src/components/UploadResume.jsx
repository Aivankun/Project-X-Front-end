import React, { useState, useRef } from "react";
import axios from "axios";
import LoadScreenPopUp from "./LoadScreenPopUp"; // Keep the loading screen component

const UploadResume = ({ updateQuestion, setLoading }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const fileInputRef = useRef(null);

  const validExtensions = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (selectedFile) => {
    if (selectedFile && validExtensions.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
      handleUploadClick(selectedFile);
    } else {
      setFile(null);
      setError("Please upload a valid PDF or DOC file.");
    }
  };

  const handleUploadClick = async (selectedFile) => {
    setLoading(true); // Start loading
    setIsLoading(true);
    try {
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
      updateQuestion(response.data.question);
    } catch (err) {
      console.log("An error occurred during upload:", err.message);
      setError("An error occurred. Please try again.");
      setRetrying(true);
    } finally {
      setIsLoading(false);
      setLoading(false); // Stop loading
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="upload-area" onDrop={handleDrop} onDragOver={handleDragOver}>
      {isLoading ? (
        <LoadScreenPopUp isError={!!error} closePopup={() => setIsLoading(false)} />
      ) : (
        <div className="upload-content">
          <i className="bx bx-upload upload-icon"></i>
          <p>Drag and Drop files to upload</p>
          <p>or</p>
          <button className="browse-btn" onClick={() => fileInputRef.current.click()}>
            Browse
          </button>
          <p className="file-support">Supported files: PDF, DOC, DOCX</p>
          {error && <p className="error-message">{error}</p>}
          {file && <p className="selected-file">Selected File: {file.name}</p>}
          {retrying && (
            <p className="warning-message">
              An error has occurred. Please upload your file again.
            </p>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e.target.files[0])}
            accept=".pdf, .doc, .docx"
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadResume;
