import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/LoadScreen.css'; 

const LoadScreenResult = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result");
    }, 3000); // 3-second delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return (
    <div className="load-screen">
        <div className="loader"></div>
        <p>Loading your results...</p>
    </div>
  );
};

export default LoadScreenResult;
