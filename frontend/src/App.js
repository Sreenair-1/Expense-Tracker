// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';  // Import the Dashboard page
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />  {/* Signup route */}
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard route */}
            </Routes>
        </Router>
    );
}

export default App;
