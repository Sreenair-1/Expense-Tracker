const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/userController');
const { 
    validateUserRegistration, 
    validateUserLogin, 
    handleValidationErrors 
} = require('../middleware/validation');

// Registration route
router.post('/register', validateUserRegistration, handleValidationErrors, async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const { user, token } = await createUser(username, email, password);
        res.status(201).json({ 
            message: 'User registered successfully', 
            user,
            token 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login route
router.post('/login', validateUserLogin, handleValidationErrors, async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await loginUser(email, password);
        res.status(200).json({ 
            message: 'Login successful', 
            user,
            token 
        });
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;