import React, { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import { categorizeExpense, generateInsights, generateSummary } from '../utils/aiFeatures';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [categoryData, setCategoryData] = useState({});

    // Fetch expenses from the backend
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/expenses`);
                const data = await response.json();
                console.log("Fetched expenses:", data); // Log fetched expenses
                setExpenses(data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };
        fetchExpenses();
    }, []);

    const addExpense = async (expense) => {
        const categorizedExpense = {
            ...expense,
            category: categorizeExpense(expense.name),
        };
        try {
            const response = await fetch(`http://localhost:3000/api/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categorizedExpense),
            });
            if (response.ok) {
                const newExpense = await response.json();
                console.log("Added expense:", newExpense); // Log the new expense
                setExpenses([...expenses, newExpense]);
            } else {
                console.error('Failed to add expense:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };
    const insights = generateInsights(expenses);
    const summary = generateSummary(expenses);

    useEffect(() => {
        const categories = expenses.reduce((acc, expense) => {
            if (acc[expense.category]) {
                acc[expense.category] += expense.amount;
            } else {
                acc[expense.category] = expense.amount;
            }
            return acc;
        }, {});

        setCategoryData(categories);
    }, [expenses]);

    const lineChartData = {
        labels: expenses.map((expense) => expense.date),
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