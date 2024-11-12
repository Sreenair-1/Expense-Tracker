import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
    // Prepare data for the chart
    const chartData = {
        labels: expenses.map((expense) => expense.date), // Date as labels on x-axis
        datasets: [
            {
                label: 'Expense Amount',
                data: expenses.map((expense) => expense.amount),
                borderColor: '#f1c40f', // Gold color for the line
                backgroundColor: 'rgba(241, 196, 15, 0.2)', // Light gold for the fill
                tension: 0.4,
                fill: true,
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Expense Tracking Over Time',
                font: { size: 18 },
            },
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="expense-chart-container">
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default ExpenseChart;
