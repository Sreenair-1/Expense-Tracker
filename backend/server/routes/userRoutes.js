const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/userController');

// Registration route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await createUser(username, email, password);
        res.status(201).json({ message: 'User  registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser (email, password);
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.log(error.message)
        res.status(401).json({ message: error.message }); // Send the error message back to client
    }
});

module.exports = router;