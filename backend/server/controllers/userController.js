const User = require('../models/User');

// Create a new user
const createUser = async (username, email, password) => {
    try {
        const user = new User({ username, email, password });
        await user.save();
        console.log('User created successfully');
        return user;
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error;
    }
};

module.exports = { createUser };
