import React, { useState } from 'react';

function AddExpenseForm({ addExpense }) {
    const [title, setTitle] = useState(''); 
    const [amount, setAmount] = useState(''); 
    const [date, setDate] = useState(''); 
    const [category, setCategory] = useState(''); 
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (!title || !amount || !date || !category) {
            setError('Please fill in all fields');
            return;
        }

        const newExpense = {
            title,
            amount: parseFloat(amount), 
            date,
            category,
        };

        addExpense(newExpense);

        setTitle('');
        setAmount('');
        setDate('');
        setCategory('');
        setError(null);
    };

    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <h2>Add New Expense</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="input-group">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Expense Title"
                    required
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="Amount"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} 
                    required
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} 
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