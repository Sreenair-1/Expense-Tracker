const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addExpense = async (req, res) => {
    const { title, amount, date } = req.body;
    try {
        const newExpense = new Expense({ title, amount, date });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    const { title, amount, date } = req.body;
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { title, amount, date },
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
