import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if the user is already logged in
        if (localStorage.getItem('user')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(`Logging in with email: ${email}`); // Log the email being used to log in

        if (email && password) {
            try {
                const response = await axios.post('http://localhost:3000/api/users/login', {
                    email,
                    password
                });
                console.log('Login response:', response.data); // Log the response from the server
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/dashboard');  // Redirect to Dashboard after login
            } catch (error) {
                const errorMessage = error.response.data.message || 'An error occurred during login.';
                console.error('Error logging in:', errorMessage);
                alert(errorMessage); // Display error message to user
            }
        } else {
            console.error('Email or password is empty');
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
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
}

export default Login;