// src/components/SidebarMainDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import "../style/Sidebar_Home.css";

const SidebarMainDashboard = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? "" : "open"}`}>
      <div className="logo-details">
        <div className="avatar">AVATAR</div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul className="nav-list">
        <li className="active">
          <Link to="/MainDashboard">
            <i className="bx bx-home"></i>
            <span className="links_name">Mock Interview</span>
          </Link>
          <span className="tooltip">Mock Interview</span>
        </li>
        <li className="active">
          <Link to="/ResumeEvaluator">
            <i className="bx bx-upload"></i>
            <span className="links_name">Resume Evaluator</span>
          </Link>
          <span className="tooltip">Resume Evaluator</span>
        </li>
        <li>
          <Link to="/result"> 
            <i className="bx bx-clipboard"></i>
            <span className="links_name">Result</span>
          </Link>
          <span className="tooltip">Result</span>
        </li>

        <li className="profile">
          <div className="Logout" onClick={() => alert("Logout functionality not implemented yet.")}>LOGOUT</div>
          <i className="bx bx-log-out" id="log_out"></i>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMainDashboard;
