const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');

// Registration route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await createUser(username, email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
