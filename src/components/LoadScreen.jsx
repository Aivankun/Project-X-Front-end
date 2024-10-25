import React from 'react';
import '../style/LoadScreen.css'; // You can create a CSS file for styles

const LoadScreen = () => {
  return (
    <div className="load-screen">
      <div className="loader"></div>
      <p>Uploading your answer...</p>
    </div>
  );
};

export default LoadScreen;
