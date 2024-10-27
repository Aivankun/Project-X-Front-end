// src/pages/Result.jsx
import { React, useState, useEffect } from "react";
import SidebarMainDashboard from "../components/SidebarMainDashboard";
import NavbarMainDashboard from "../components/NavbarMainDashboard";
import "../style/Result.css";
import axios from "axios";
import EvaluatorResult from "../components/EvaluatorResult"; // Import the EvaluatorResult component
import { useLocation } from "react-router-dom"; // Import useLocation for route state

const Result = () => {
  const location = useLocation(); // Access the location object
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar open/close
  const [feedback, setFeedback] = useState(""); // State for feedback message
  const [isLoading, setIsLoading] = useState(false); // State for loading state
  const [isEvaluatorResult, setIsEvaluatorResult] = useState(false); // State for evaluator result check

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Toggle the sidebar state
  };

  const fetchFeedback = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.get(`http://localhost:5000/api/result`);
      setFeedback(response.data.feedback); // Set the feedback
      console.log(response.data.feedback);
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.error("Error fetching feedback", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if featureFrom is "Resume Evaluator"
    const { featureFrom } = location.state || {}; // Destructure from location state
    if (featureFrom === "Resume Evaluator") {
      setIsEvaluatorResult(true);
    } else {
      fetchFeedback(); // Fetch feedback if it's not from evaluator
    }
  }, [location.state]); // Add location.state to dependency array

  return (
    <>
      <SidebarMainDashboard
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <section className="home-section">
        <NavbarMainDashboard
          isDropdownVisible={isDropdownVisible}
          setDropdownVisible={setDropdownVisible}
        />

        <div className="result-container">
          {isLoading ? (
            <div>
              <h1>Loading...</h1>
            </div>
          ) : isEvaluatorResult ? (
            <EvaluatorResult /> // Render EvaluatorResult if the flag is true
          ) : (
            <div className="result-feedback-comment">
              <h2>Interview Result</h2>
              <h3 className="rating">Overall Rating</h3>
              <div className="score-point">
                <p>7.8
                  <p className="over-by-ten">/10</p></p>
              </div>

              <h3>Feedback</h3>
              
              <p className="feedback">"{feedback}"</p>
              <h3>Comments</h3>
              <ul className="comment">
                <li>Strong problem-solving skills demonstrated</li>
                <li>Excellent knowledge of React and state management</li>
                <li>Good communication throughout the interview</li>
                <li>Could improve on system design concepts</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Result;
