// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">Expense Tracker</h1>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/login" className="navbar-link">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
