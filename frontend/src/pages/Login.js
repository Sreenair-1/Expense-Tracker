import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { tokenStorage } from '../utils/secureStorage';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        if (tokenStorage.isLoggedIn()) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await authAPI.login({ email, password });
            
            // Store token and minimal user data securely
            if (response.token) {
                tokenStorage.setToken(response.token);
            }
            
            if (response.user) {
                tokenStorage.setUserData(response.user);
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || 
                                 error.response?.data?.errors?.[0]?.msg ||
                                 'An error occurred during login.';
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                    placeholder="Password"
                    required
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
}

export default Login;