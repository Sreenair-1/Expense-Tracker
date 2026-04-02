const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config({path: '../vars/.env'});

const app = express();

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable for tests
    crossOriginEmbedderPolicy: false
}));

// Rate limiting for tests (more permissive)
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100,
    message: {
        message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
    message: {
        message: 'Too many authentication attempts, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/users', authLimiter, userRoutes);
app.use('/api/expenses', expenseRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Test server error:', error);
    res.status(error.status || 500).json({
        message: error.message || 'Internal server error'
    });
});

module.exports = app;