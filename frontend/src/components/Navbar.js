// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'; // Import useSpring and animated
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const props = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 500 }, // Animation duration
    });

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-logo">Expense Tracker</h1>
            </div>
            <div className="navbar-right">
                <animated.div style={props}>
                    <Link to="/" className="navbar-link">Home</Link>
                    <Link to="/about" className="navbar-link">About Us</Link>
                    {user ? (
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    ) : (
                        <Link to="/login" className="navbar-link">Login</Link>
                    )}
                </animated.div>
            </div>
        </nav>
    );
};

export default Navbar;