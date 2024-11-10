import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components for Pie Chart
ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ expenses }) => {
  // Prepare data for the Pie chart
  const categoryCounts = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: ['#f1c40f', '#e67e22', '#2ecc71', '#9b59b6', '#34495e'],
        hoverBackgroundColor: ['#f39c12', '#d35400', '#27ae60', '#8e44ad', '#2c3e50'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Expenses by Category',
        font: { size: 18 },
      },
    },
  };

  return (
    <div className="expense-pie-chart-container">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default ExpensePieChart;
