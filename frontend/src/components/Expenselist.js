import React from 'react';
import './ExpenseList.css';

function ExpenseList({ expenses }) {
    return (
        <div className="expense-list">
            <h2>Expenses</h2>
            {expenses.length === 0 ? (
                <p>No expenses recorded.</p>
            ) : (
                <div className="expense-items">
                    {expenses.map((expense) => (
                    <div key={expense.id} className="expense-item">
                        <span> {expense.title}</span>
                        <span>  ₹{expense.amount.toFixed(2)}</span>
                        <span>  {expense.date}</span>
                        <span>  {expense.category}</span>
                    </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExpenseList;