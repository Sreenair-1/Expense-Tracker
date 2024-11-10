import React, { useState } from 'react';

function AddExpenseForm({ addExpense }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');  // New state for category

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date || !category) return; // Validate input

    // Create new expense
    const newExpense = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      date,
      category,  // Add category to the new expense
    };

    addExpense(newExpense);
    setName('');
    setAmount('');
    setDate('');
    setCategory('');  // Reset category after submit
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="input-group">
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="category-input"
        >
          <option value="" disabled>Select Category</option>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Travel">Travel</option>
          <option value="Grocery">Grocery</option>
          <option value="Automobile">Automobile</option>
          <option value="Service">Service</option>
          <option value="Grooming">Grooming</option>
        </select>

        {/* Expense Name Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Expense Name"
          required
        />
      </div>

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
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpenseForm;
