import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">Expense Tracker</h1>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/about" className="navbar-link">About Us</Link>
        {user ? (
          <button onClick={handleLogout} className="navbar-link">Logout</button>
        ) : (
          <Link to="/login" className="navbar-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
