import { React, useState, useEffect } from "react";
import SidebarMainDashboard from "../components/SidebarMainDashboard";
import NavbarMainDashboard from "../components/NavbarMainDashboard";
import "../style/Result.css";
import axios from "axios";

const Result = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar open/close
  const [feedback, setFeedback] = useState(""); // State for feedback
  const [comment, setComment] = useState([]); // State for comment
  const [score, setScore] = useState(""); // State for score
  const [hasFeedback, setHasFeedback] = useState(false); // State for feedback existence
  const [isLoading, setIsLoading] = useState(false); // State for loading state

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Toggle the sidebar state
  };

  const fetchFeedback = async () => {
    try {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await axios.get(`http://localhost:5000/api/result`);

        // Check if the feedback object exists
        if (response.data.feedback) {
          setFeedback(response.data.feedback.feedback); // Set feedback state
          setComment(response.data.feedback.comments); // Set comment state
          setScore(response.data.feedback.overallScore); // Set score state
          setHasFeedback(true); // Set hasFeedback to true if feedback exists
        } else {
          setHasFeedback(false); // No feedback found
        }
      } catch (error) {
        console.error("Error fetching feedback", error);
        setHasFeedback(false); // Set to false if there's an error
      } finally {
        setIsLoading(false); // Set loading state to false at the end
      }
    } catch (error) {
      console.error("Error fetching feedback", error);
      setHasFeedback(false); // Set to false if there's an error
    } finally {
      setIsLoading(false); // Set loading state to false at the end
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

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
              <h3 className="rating">Overall Rating</h3>
              <div className="score-point">
                <p>
                  {score}
                  <span className="over-by-ten">/10</span>
                </p>
              </div>

              <h3>Feedback</h3>
              <p className="feedback">{feedback}</p>

              <h3>Comments</h3>
              <ul className="comment">
                {comment.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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
