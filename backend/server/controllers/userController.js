const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('../utils/encryption');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

// Create a new user
const createUser = async (username, email, password) => {
    try {
        // Check for existing user by encrypted email
        const users = await User.find({});
        const existingUser = users.find(user => {
            const decryptedEmail = decrypt(user.email);
            return decryptedEmail === email.toLowerCase();
        });

        if (existingUser) {
            throw new Error('Email already in use');
        }

        // Check for existing username
        const existingUsername = users.find(user => {
            const decryptedUsername = decrypt(user.username);
            return decryptedUsername === username;
        });

        if (existingUsername) {
            throw new Error('Username already in use');
        }

        const user = new User({ username, email: email.toLowerCase(), password });
        await user.save();
        
        const token = generateToken(user._id);
        const userResponse = user.getDecryptedData();
        
        console.log('User created successfully');
        return { user: userResponse, token };
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        console.log(`Attempting to log in with email: ${email}`);

        // Find user by decrypting all emails (not ideal for large datasets, but works for small apps)
        const users = await User.find({});
        const user = users.find(u => {
            const decryptedEmail = decrypt(u.email);
            return decryptedEmail === email.toLowerCase();
        });

        if (!user) {
            console.error('User not found');
            throw new Error('User not found');
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            console.error('Invalid password');
            throw new Error('Invalid password');
        }

        const token = generateToken(user._id);
        const userResponse = user.getDecryptedData();

        console.log('Login successful for user:', userResponse.email);
        return { user: userResponse, token };
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
};

module.exports = { createUser, loginUser };