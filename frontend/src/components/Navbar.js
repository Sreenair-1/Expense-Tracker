// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">Expense Tracker</h1>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/login" className="navbar-link">Login</Link>
        <Link to="/about-us" className="navbar-link">About Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
