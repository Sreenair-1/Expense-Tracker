import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import ExpenseList from '../components/Expenselist';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]); // State to store expenses
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }

    // Example: Fetching stored expenses from localStorage
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, [navigate]);

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expenses'); // Clear expenses on logout if necessary
    navigate('/');
  };

  // Function to add an expense
  const addExpense = (expense) => {
    const newExpenses = [...expenses, expense];
    setExpenses(newExpenses);
    localStorage.setItem('expenses', JSON.stringify(newExpenses)); // Save to localStorage
  };

  return (
    <div className="dashboard-container">
      {user ? (
        <div>
          <h2>Welcome to your Dashboard, {user.email}!</h2>

          {/* Expense List */}
          <ExpenseList expenses={expenses} />

          {/* Button to add expense */}
          <button onClick={() => addExpense({ name: 'New Expense', amount: 20.00, date: '2024-11-10' })}>
            Add New Expense
          </button>

          {/* Logout Button */}
          <button onClick={handleLogout} className="cta-button">Logout</button>
        </div>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
