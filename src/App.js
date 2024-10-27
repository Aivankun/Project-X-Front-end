import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Main landing page with Navbar
import Login from './pages/Login'; // Login component
import Register from './pages/Register'; // Registration component
import Home from './pages/MainDashboard'; // Home component
import ResultPages from './pages/Result';
import ResumePage from './pages/ResumeEvaluator';

function App() {
    return (
        <Router>
            <div className="app">
                <div className="main-content">  
                    <Routes>
                        <Route path="/" element={<LandingPage />} /> {/* Main landing page */}
                        <Route path="/login" element={<Login />} /> {/* Login page */}
                        <Route path="/register" element={<Register />} /> {/* Registration page */}
                        <Route path="/MainDashboard" element={<Home />} /> {/* Home page after login */}
                        <Route path="/result" element={<ResultPages />} /> {/* Result page  */}
                        <Route path="/ResumeEvaluator" element={<ResumePage />} /> {/* Result page  */}
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
