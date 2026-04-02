const { body, validationResult } = require('express-validator');

// Validation rules for user registration
const validateUserRegistration = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_-]+$/)
        .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
    
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address')
        .isLength({ max: 255 })
        .withMessage('Email must not exceed 255 characters'),
    
    body('password')
        .isLength({ min: 8, max: 128 })
        .withMessage('Password must be between 8 and 128 characters')
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
        .withMessage('Password must contain at least one letter, one number, and one special character')
];

// Validation rules for user login
const validateUserLogin = [
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

// Validation rules for expenses
const validateExpense = [
    body('title')
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('Title must be between 1 and 255 characters')
        .escape(), // Prevent XSS
    
    body('amount')
        .isFloat({ min: 0 })
        .withMessage('Amount must be a positive number'),
    
    body('date')
        .isISO8601()
        .toDate()
        .withMessage('Please provide a valid date'),
    
    body('category')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Category must be between 1 and 100 characters')
        .escape()
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation errors',
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateExpense,
    handleValidationErrors
};