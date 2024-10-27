// import { React, useState, useEffect } from "react";
// import SidebarMainDashboard from "../components/SidebarMainDashboard";
// import NavbarMainDashboard from "../components/NavbarMainDashboard";
// import "../style/Result.css";
// import axios from "axios";
// import EvaluatorResult from "../components/EvaluatorResult"; // Import the EvaluatorResult component
// import { useLocation } from "react-router-dom"; // Import useLocation for route state

// const Result = () => {
//   const location = useLocation(); // Access the location object
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar open/close
//   const [feedback, setFeedback] = useState(""); // State for feedback
//   const [comment, setComment] = useState([]); // State for comment
//   const [score, setScore] = useState(""); // State for score
//   const [hasFeedback, setHasFeedback] = useState(false); // State for feedback existence
//   const [isLoading, setIsLoading] = useState(false); // State for loading state
//   const [isEvaluatorResult, setIsEvaluatorResult] = useState(false); // State for evaluator result check

//   const toggleSidebar = () => {
//     setSidebarOpen((prev) => !prev); // Toggle the sidebar state
//   };

//   const fetchFeedback = async () => {
//     try {
//       setIsLoading(true); // Set loading state to true
//       const response = await axios.get(`http://localhost:5000/api/result`);
//       const { feedback } = response.data;
//       setFeedback(feedback); // Set feedback state
//       setHasFeedback(true);
//     } catch (error) {
//       console.error("Error fetching feedback", error);
//       setHasFeedback(false); // Set to false if there's an error
//     } finally {
//       setIsLoading(false); // Set loading state to false at the end
//     }
//   };

//   useEffect(() => {
//     // Check if featureFrom is "Resume Evaluator"
//     const { featureFrom } = location.state || {}; // Destructure from location state
//     if (featureFrom === "Resume Evaluator") {
//       setIsEvaluatorResult(true);
//     } else {
//       fetchFeedback(); // Fetch feedback if it's not from evaluator
//     }
//   }, [location.state]); // Add location.state to dependency array

//   return (
//     <>
//       <SidebarMainDashboard
//         toggleSidebar={toggleSidebar}
//         isSidebarOpen={isSidebarOpen}
//       />
//       <section className="home-section">
//         <NavbarMainDashboard
//           isDropdownVisible={isDropdownVisible}
//           setDropdownVisible={setDropdownVisible}
//         />

//         <div className="result-container">
//           {isLoading ? (
//             <div>
//               <h1>Loading...</h1>
//             </div>
//           ) : hasFeedback ? (
//             <div className="result-feedback-comment">
//               <h2>Interview Result</h2>
//               <p className="feedback">{feedback}</p>
//             </div>
//           ) : (
//             <div>No feedback</div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };
// export default Result;

import React, { useState, useEffect } from "react";
import SidebarMainDashboard from "../components/SidebarMainDashboard";
import NavbarMainDashboard from "../components/NavbarMainDashboard";
import "../style/Result.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [feedback, setFeedback] = useState(null); // Can be text or object
  const [hasFeedback, setHasFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState("");
  const [marketStrength, setMarketStrength] = useState("");
  const [areaOfImprovement, setAreaOfImprovement] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/result`);
      setFeedback(response.data.feedback); // Can handle either text or object
      setHasFeedback(true);
    } catch (error) {
      console.error("Error fetching feedback", error);
      setHasFeedback(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { feedback, featureFrom } = location.state || {};
    if (featureFrom === "Resume Evaluator") {
      // Use feedback from location.state directly
      setFeedback(feedback);
      setAreaOfImprovement(feedback.areasForImprovement || ""); // Destructure safely
      setScore(feedback.score || "");
      setMarketStrength(feedback.marketStrength || "");
      setHasFeedback(true);
    } else {
      fetchFeedback(); // Fetch feedback from the API if not from "Resume Evaluator"
    }
  }, [location.state]);

  const renderFeedback = () => {
    if (typeof feedback === "string") {
      // Render plain text feedback
      return (
        <div>
          <h1>Interview Result</h1>
          <p className="feedback">{feedback}</p>;
        </div>
      );
    } else if (typeof feedback === "object" && feedback !== null) {
      // Render feedback object with score, market strength, and area of improvement
      return (
        <div>
          <h1>Resume Feedback </h1>
          <br />
          <p>
            <strong>Score:</strong> {score}
          </p>
          <br />
          <p>
            <strong>Market Strength:</strong> {marketStrength}
          </p>
          <br />
          <p>
            <strong>Area of Improvement:</strong> {areaOfImprovement}
          </p>
          <br />
        </div>
      );
    } else {
      return <p>No feedback available</p>;
    }
  };

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
          ) : hasFeedback ? (
            <div className="result-feedback-comment">
              {renderFeedback()}{" "}
              {/* Conditionally render based on feedback format */}
            </div>
          ) : (
            <div>No feedback</div>
          )}
        </div>
      </section>
    </>
  );
};

export default Result;
