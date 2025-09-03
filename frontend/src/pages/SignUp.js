import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { tokenStorage } from '../utils/secureStorage';
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the user is already signed in
    if (tokenStorage.isLoggedIn()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.register({
        username,
        email,
        password
      });

      // Store token and minimal user data securely
      if (response.token) {
        tokenStorage.setToken(response.token);
      }
      
      if (response.user) {
        tokenStorage.setUserData(response.user);
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
      
      let errorMessage = 'An error occurred during registration.';
      
      if (error.response?.data?.errors) {
        // Handle validation errors
        const errors = error.response.data.errors;
        errorMessage = errors.map(err => err.msg).join('\n');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      alert(errorMessage);

      // Clear fields after error
      setUsername('');
      setEmail('');
      setPassword('');
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={isLoading}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 8 chars, include letter, number, special char)"
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <p>Already have an account? <a href="/login">Log In</a></p>
    </div>
  );
}

export default SignUp;