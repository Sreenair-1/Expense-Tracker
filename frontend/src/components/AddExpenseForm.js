import React, { useState } from 'react';

function AddExpenseForm({ addExpense }) {
    const [title, setTitle] = useState(''); // State for expense title
    const [amount, setAmount] = useState(''); // State for expense amount
    const [date, setDate] = useState(''); // State for expense date
    const [category, setCategory] = useState(''); // State for expense category

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!title || !amount || !date || !category) return; // Validate input

        // Create new expense object
        const newExpense = {
            title,
            amount: parseFloat(amount), // Convert amount to a number
            date,
            category,
        };

        // Call the addExpense function passed from the parent component
        addExpense(newExpense);

        // Reset form fields
        setTitle('');
        setAmount('');
        setDate('');
        setCategory('');
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <h2>Add New Expense</h2>
            <div className="input-group">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update title state
                    placeholder="Expense Title"
                    required
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} // Update amount state
                    placeholder="Amount"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} // Update date state
                    required
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} // Update category state
                    required
                >
                    <option value="" disabled>Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Housing">Housing</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <button type="submit">Add Expense</button>
        </form>
    );
}

export default AddExpenseForm;