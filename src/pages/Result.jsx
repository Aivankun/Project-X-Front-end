// src/pages/Result.jsx
import { React, useState, useEffect } from "react";
import SidebarMainDashboard from "../components/SidebarMainDashboard";
import NavbarMainDashboard from "../components/NavbarMainDashboard";
import "../style/Result.css";
import axios from "axios";

const Result = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar open/close
  const [feedback, setFeedback] = useState(""); // State for feedback message
  const [isLoading, setIsLoading] = useState(false); // State for loading state

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
    fetchFeedback();
  }, []);

  return (
    <div>
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
          ) : (
            <div>
              <h1>Interview Result</h1>
              <div className="result-details">
                <p>{feedback}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Result;
