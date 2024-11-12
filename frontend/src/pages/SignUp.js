import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the user is already signed in
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (username && email && password) {
      try {
        const response = await axios.post('http://localhost:3000/api/users/register', {
          username,
          email,
          password
        });
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');  // Redirect to Dashboard after signup
      } catch (error) {
        console.error('Error signing up:', error.response.data.message);
        alert(error.response.data.message); // Display error message to user

        // Clear all fields after showing the error message
        setUsername('');
        setEmail('');
        setPassword('');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Log In</a></p>
    </div>
  );
}

export default SignUp;