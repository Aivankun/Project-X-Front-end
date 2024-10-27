import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadResume = ({ setIsLoading }) => {
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const validExtensions = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  // New variable to track feature source
  const featureFrom = "Resume Evaluator"; // Specify feature source

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

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    console.log("File dropped:", droppedFile.name);
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleUploadClick = async (selectedFile) => {
    try {
      const featureFrom = "Resume Evaluator"; // Specify feature source
      // setLoading(true);
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post(
        "http://localhost:5000/api/getResumeFeedback",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { feedback } = response.data;
      console.log("Feedback:", feedback);
      setIsLoading(false);
      navigate("/result", { state: { feedback, featureFrom} });
    } catch (error) {
      console.log("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-section">
      <div
        className="upload-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="upload-content">
          <i className="bx bx-upload upload-icon"></i>
          {loading ? (
            <p>Uploading...</p>
          ) : (
            <>
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
            </>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files[0])}
          accept=".pdf, .doc, .docx"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default UploadResume;
