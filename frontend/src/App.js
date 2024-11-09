// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';  // Import Navbar

function App() {
  return (
    <Router>
      <Navbar />  {/* Add Navbar component here */}
      <Routes>
        <Route path="/" element={<Home />} />       {/* Home Page */}
        <Route path="/login" element={<Login />} />  {/* Login Page */}
      </Routes>
    </Router>
  );
}

export default App;
