// import { React, useState, useEffect } from "react";
// import SidebarMainDashboard from "../components/SidebarMainDashboard";
// import NavbarMainDashboard from "../components/NavbarMainDashboard";
// import "../style/Result.css";
// import axios from "axios";

// const Result = () => {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar open/close
//   const [feedback, setFeedback] = useState(""); // State for feedback
//   const [comment, setComment] = useState([]); // State for comment
//   const [score, setScore] = useState(""); // State for score
//   const [hasFeedback, setHasFeedback] = useState(false); // State for feedback existence
//   const [isLoading, setIsLoading] = useState(false); // State for loading state

//   const toggleSidebar = () => {
//     setSidebarOpen((prev) => !prev); // Toggle the sidebar state
//   };

//   const fetchFeedback = async () => {
//     try {
//       try {
//         setIsLoading(true); // Set loading state to true
//         const response = await axios.get(`http://localhost:5000/api/result`);
//         const { feedback, comments, overallScore } = response.data.feedback;
//         setFeedback(feedback); // Set feedback state
//         setComment(comments); // Set comment state
//         setScore(overallScore); // Set score state

//         // Set hasFeedback to true if feedback, comments and overallScore exist
//         setHasFeedback(!!feedback && !!comments.length && !!overallScore);
//       } catch (error) {
//         console.error("Error fetching feedback", error);
//         setHasFeedback(false); // Set to false if there's an error
//       } finally {
//         setIsLoading(false); // Set loading state to false at the end
//       }
//     } catch (error) {
//       console.error("Error fetching feedback", error);
//       setHasFeedback(false); // Set to false if there's an error
//     } finally {
//       setIsLoading(false); // Set loading state to false at the end
//     }
//   };

//   useEffect(() => {
//     fetchFeedback();
//   }, []);

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
//               <h3 className="rating">Overall Rating</h3>
//               <div className="score-point">
//                 <p>
//                   {score}
//                   <span className="over-by-ten">/10</span>
//                 </p>
//               </div>

//               <h3>Feedback</h3>
//               <p className="feedback">{feedback}</p>

//               <h3>Comments</h3>
//               <ul className="comment">
//                 {comment.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
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
  const [feedback, setFeedback] = useState(""); // State for feedback
  const [comment, setComment] = useState([]); // State for comment
  const [score, setScore] = useState(""); // State for score
  const [hasFeedback, setHasFeedback] = useState(false); // State for feedback existence
  const [isLoading, setIsLoading] = useState(false); // State for loading state
  const [isEvaluatorResult, setIsEvaluatorResult] = useState(false); // State for evaluator result check

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Toggle the sidebar state
  };

  const fetchFeedback = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.get(`http://localhost:5000/api/result`);
      const { feedback } = response.data;
      setFeedback(feedback); // Set feedback state
      setHasFeedback(true);
    } catch (error) {
      console.error("Error fetching feedback", error);
      setHasFeedback(false); // Set to false if there's an error
    } finally {
      setIsLoading(false); // Set loading state to false at the end
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
          ) : hasFeedback ? (
            <div className="result-feedback-comment">
              <h2>Interview Result</h2>
              <p className="feedback">{feedback}</p>
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
