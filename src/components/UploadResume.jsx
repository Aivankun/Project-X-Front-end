import React, { useState, useRef } from 'react';

const UploadResume = ({ setIsError, setIsLoading }) => {
  const [file, setFile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const fileInputRef = useRef(null);

  const validExtensions = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  const handleFileChange = (selectedFile) => {
    if (selectedFile && validExtensions.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError('');
      console.log(`Selected file: ${selectedFile.name}`);
      handleUploadClick(selectedFile);
    } else {
      setFile(null);
      setError('Please upload a valid PDF or DOC file.');
      console.log('Invalid file type selected.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    console.log('File dropped:', droppedFile.name);
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleUploadClick = (selectedFile) => {
    setLoading(true);
    setError(false);
    console.log('Starting upload process...');

    // Simulate upload completion
    setTimeout(() => {
      setLoading(false);
      console.log('Upload process completed:', selectedFile.name);
      setIsLoading(true); // Trigger LoadScreenPopUp to check connection
    }, 1000); // Simulating a 1-second upload time
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
          {loading ? ( // Conditional rendering based on loading state
            <p>Uploading...</p> // Show loading text or spinner here
          ) : (
            <>
              <p>Drag and Drop files to upload</p>
              <p>or</p>
              <button className="browse-btn" onClick={() => fileInputRef.current.click()}>
                Browse
              </button>
              <p className="file-support">Supported files: PDF, DOC, DOCX</p>
              {error && <p className="error-message">{error}</p>}
              {file && <p className="selected-file">Selected File: {file.name}</p>}
            </>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e.target.files[0])}
          accept=".pdf, .doc, .docx"
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default UploadResume;
