const express = require('express');
const router = express.Router();
const { getExpenses, addExpense, deleteExpense, updateExpense } = require('../controllers/expenseController');
const { authenticateToken } = require('../middleware/auth');
const { validateExpense, handleValidationErrors } = require('../middleware/validation');

// All expense routes require authentication
router.get('/', authenticateToken, getExpenses);
router.post('/', authenticateToken, validateExpense, handleValidationErrors, addExpense);
router.put('/:id', authenticateToken, validateExpense, handleValidationErrors, updateExpense);
router.delete('/:id', authenticateToken, deleteExpense);

module.exports = router;
