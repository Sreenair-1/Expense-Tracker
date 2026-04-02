import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { generateInsights, generateSummary } from '../utils/aiFeatures';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { expenseAPI, authAPI } from '../utils/api';
import { tokenStorage } from '../utils/secureStorage';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [categoryData, setCategoryData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication
        if (!tokenStorage.isLoggedIn()) {
            navigate('/login');
            return;
        }

        // Get user data
        const userData = tokenStorage.getUserData();
        setUser(userData);

        // Fetch expenses
        const fetchExpenses = async () => {
            try {
                setIsLoading(true);
                const data = await expenseAPI.getExpenses();
                
                if (Array.isArray(data)) {
                    setExpenses(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setExpenses([]);
                }
            } catch (error) {
                console.error('Error fetching expenses:', error);
                if (error.response?.status === 401) {
                    // Token expired or invalid
                    authAPI.logout();
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchExpenses();
    }, [navigate]);

    // Function to add an expense
    const addExpense = async (expense) => {
        try {
            const newExpense = await expenseAPI.addExpense(expense);
            console.log("Added expense:", newExpense);
            setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Failed to add expense. Please try again.');
        }
    };

    // Function to update an expense
    const updateExpense = async (id, updatedExpense) => {
        try {
            const expense = await expenseAPI.updateExpense(id, updatedExpense);
            setExpenses((prevExpenses) =>
                prevExpenses.map((exp) => (exp._id === id ? expense : exp))
            );
        } catch (error) {
            console.error('Error updating expense:', error);
            alert('Failed to update expense. Please try again.');
        }
    };

    // Function to delete an expense
    const deleteExpense = async (id) => {
        try {
            await expenseAPI.deleteExpense(id);
            setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp._id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
            alert('Failed to delete expense. Please try again.');
        }
    };

    // Logout function
    const handleLogout = () => {
        authAPI.logout();
        navigate('/login');
    };

    // Generate insights and summary
    const insights = generateInsights(expenses);
    const summary = generateSummary(expenses);

    // Update category data whenever expenses change
    useEffect(() => {
        const categories = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});
        setCategoryData(categories);
    }, [expenses]);

    // Prepare data for line chart
    const lineChartData = {
        labels: expenses.map((expense) => new Date(expense.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Amount Spent',
                data: expenses.map((expense) => expense.amount),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    // Prepare data for pie chart
    const pieChartData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', '#ffb3e6'],
                hoverBackgroundColor: ['#ff6666', '#3399ff', '#66ff66', '#ff9933', '#9999ff', '#ff66cc'],
            },
        ],
    };

    if (isLoading) {
        return <div className="dashboard loading">Loading...</div>;
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="user-info">
                    <span>Welcome, {user?.username || 'User'}!</span>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </header>
            
            <AddExpenseForm addExpense={addExpense} />
            <ExpenseList 
                expenses={expenses} 
                onUpdateExpense={updateExpense}
                onDeleteExpense={deleteExpense}
            />

            <div className="ai-insights">
                <h2>Insights</h2>
                <p>{summary}</p>
                <ul>
                    {insights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                    ))}
                </ul>
            </div>

            <div className="charts-container">
                <div className="chart-item">
                    <h3>Expense Over Time</h3>
                    <Line data={lineChartData} />
                </div>

                <div className="chart-item">
                    <h3>Expense by Category</h3>
                    <Pie data={pieChartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;