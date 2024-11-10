import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the user is already signed in
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSignUp = (e) => {
    e.preventDefault();
    // Example signup validation
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/dashboard');  // Redirect to Dashboard after signup
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
