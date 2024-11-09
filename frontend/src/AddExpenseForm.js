// src/components/AddExpenseForm.js
import React, { useState } from 'react';

function AddExpenseForm({ addExpense }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ name, amount: parseFloat(amount), date });
    setName('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Expense Name" required />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpenseForm;
