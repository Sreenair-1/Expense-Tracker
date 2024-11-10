// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can add login logic (e.g., authenticate the user)
    // For now, we'll just simulate a successful login

    if (email && password) {
      // Simulate a successful login
      navigate('/dashboard'); // Redirect to the Dashboard page
    } else {
      alert('Please enter a valid email and password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="cta-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
