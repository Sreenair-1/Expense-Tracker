const User = require('../models/User');

// Create a new user
const createUser = async (username, email, password) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const user = new User({ username, email, password });
        await user.save();
        console.log('User  created successfully');
        return user;
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error;
    }
};

const loginUser   = async (email, password) => {
    console.log(`Attempting to log in with email: ${email}`); // Log the email being used to log in

    const user = await User.findOne({ email });
    if (!user) {
        console.error('User  not found'); // Log if user is not found
        throw new Error('User  not found');
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
        console.error('Invalid password'); // Log if password does not match
        throw new Error('Invalid password');
    }

    console.log('Login successful for user:', user.email); // Log successful login
    return user; // Return user details if login is successful
};

module.exports = { createUser, loginUser };