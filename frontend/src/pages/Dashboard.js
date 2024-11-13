import React, { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { categorizeExpense, generateInsights, generateSummary } from '../utils/aiFeatures';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [categoryData, setCategoryData] = useState({});

    // Fetch expenses from the backend
    useEffect(() => {
        const fetchExpenses = async () => {
            const token = localStorage.getItem('token'); // Make sure you have the token
            if (!token) {
                console.error('No token found');
                return;
            }
        
            try {
                const response = await fetch(`http://localhost:3000/api/expenses`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include token in headers
                    },
                });
                const data = await response.json();
                console.log("Fetched expenses:", data); // Log the data
        
                // Check if data is an array
                if (Array.isArray(data)) {
                    setExpenses(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setExpenses([]); // Set to empty array if not an array
                }
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };
        fetchExpenses();
    }, []);

    // Function to add an expense
    const addExpense = async (expense) => {
        const categorizedExpense = {
            ...expense,
            category: categorizeExpense(expense.name),
        };
        console.log("Categorized Expense:", categorizedExpense); // Debugging line
        try {
            const response = await fetch(`http://localhost:3000/api/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categorizedExpense),
            });
            console.log("Response from server:", response); // Debugging line
            if (response.ok) {
                const newExpense = await response.json();
                console.log("Added expense:", newExpense); // Log the new expense
                setExpenses((prevExpenses) => [...prevExpenses, newExpense]); // Update state correctly
            } else {
                console.error('Failed to add expense:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
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
        labels: expenses.map((expense) => new Date(expense.date).toLocaleDateString()), // Format date for x-axis
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

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <AddExpenseForm addExpense={addExpense} />
            <ExpenseList expenses={expenses} />

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