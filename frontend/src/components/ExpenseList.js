import React, { useState } from 'react';
import './ExpenseList.css';

function ExpenseList({ expenses, onUpdateExpense, onDeleteExpense }) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        amount: '',
        date: '',
        category: ''
    });

    const handleEditStart = (expense) => {
        setEditingId(expense._id);
        setEditForm({
            title: expense.title,
            amount: expense.amount.toString(),
            date: new Date(expense.date).toISOString().split('T')[0],
            category: expense.category
        });
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditForm({
            title: '',
            amount: '',
            date: '',
            category: ''
        });
    };

    const handleEditSave = async (id) => {
        try {
            const updatedExpense = {
                title: editForm.title,
                amount: parseFloat(editForm.amount),
                date: editForm.date,
                category: editForm.category
            };
            
            await onUpdateExpense(id, updatedExpense);
            setEditingId(null);
        } catch (error) {
            console.error('Error updating expense:', error);
            alert('Failed to update expense');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await onDeleteExpense(id);
            } catch (error) {
                console.error('Error deleting expense:', error);
                alert('Failed to delete expense');
            }
        }
    };

    const handleFormChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="expense-list">
            <h2>Expenses</h2>
            {expenses.length === 0 ? (
                <p>No expenses recorded.</p>
            ) : (
                <div className="expense-items">
                    {expenses.map((expense) => (
                        <div key={expense._id} className="expense-item">
                            {editingId === expense._id ? (
                                // Edit mode
                                <div className="expense-edit-form">
                                    <input
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) => handleFormChange('title', e.target.value)}
                                        placeholder="Title"
                                    />
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={editForm.amount}
                                        onChange={(e) => handleFormChange('amount', e.target.value)}
                                        placeholder="Amount"
                                    />
                                    <input
                                        type="date"
                                        value={editForm.date}
                                        onChange={(e) => handleFormChange('date', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={editForm.category}
                                        onChange={(e) => handleFormChange('category', e.target.value)}
                                        placeholder="Category"
                                    />
                                    <div className="edit-buttons">
                                        <button onClick={() => handleEditSave(expense._id)} className="save-btn">Save</button>
                                        <button onClick={handleEditCancel} className="cancel-btn">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                // Display mode
                                <>
                                    <div className="expense-details">
                                        <span className="expense-title">{expense.title}</span>
                                        <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
                                        <span className="expense-date">{new Date(expense.date).toLocaleDateString('en-IN')}</span>
                                        <span className="expense-category">{expense.category}</span>
                                    </div>
                                    <div className="expense-actions">
                                        <button onClick={() => handleEditStart(expense)} className="edit-btn">Edit</button>
                                        <button onClick={() => handleDelete(expense._id)} className="delete-btn">Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExpenseList;