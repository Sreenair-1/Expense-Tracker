  // src/components/ExpenseList.js
  import React from 'react';

  function ExpenseList({ expenses }) {
    return (
      <div className="expense-list">
        <h2>Expenses</h2>
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <span>   {expense.name}</span>
            <span> / ₹{expense.amount.toFixed(2)}</span>
            <span> / {expense.date}</span>
          </div>
        ))}
      </div>
    );
  }

  export default ExpenseList;
