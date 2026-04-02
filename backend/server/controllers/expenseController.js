const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
    try {
        // Only get expenses for the authenticated user
        const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.addExpense = async (req, res) => {
    const { title, amount, date, category } = req.body;
    try {
        const newExpense = new Expense({ 
            title, 
            amount, 
            date, 
            category, 
            userId: req.user._id 
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    const { title, amount, date, category } = req.body;
    try {
        // Only update expense if it belongs to the authenticated user
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { title, amount, date, category },
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found or unauthorized' });
        }
        res.json(updatedExpense);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        // Only delete expense if it belongs to the authenticated user
        const deletedExpense = await Expense.findOneAndDelete({ 
            _id: req.params.id, 
            userId: req.user._id 
        });
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found or unauthorized' });
        }
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: error.message });
    }
};