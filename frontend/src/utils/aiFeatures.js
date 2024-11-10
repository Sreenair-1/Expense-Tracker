// src/utils/aiFeatures.js
// Basic categorization function
export const categorizeExpense = (name) => {
    if (/grocery|food|restaurant/i.test(name)) return 'Food';
    if (/rent|mortgage/i.test(name)) return 'Housing';
    if (/electricity|water|utilities/i.test(name)) return 'Utilities';
    if (/gas|fuel|transport/i.test(name)) return 'Transportation';
    return 'Other';
  };
  
  // Generate expense insights
  export const generateInsights = (expenses) => {
    if (expenses.length === 0) return [];
    
    let totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    let highestExpense = expenses.reduce((prev, current) => (prev.amount > current.amount) ? prev : current);
  
    return [
      `Total spent:  ₹${totalSpent.toFixed(2)}`,
      `Highest expense:  ${highestExpense.name} - ₹${highestExpense.amount.toFixed(2)}`,
      `Total transactions:  ${expenses.length}`
    ];
  };
  
  // Generate natural language summary
  export const generateSummary = (expenses) => {
    if (expenses.length === 0) return 'No expenses recorded.';
  
    let foodExpenses = expenses.filter(expense => expense.category === 'Food')
      .reduce((sum, expense) => sum + expense.amount, 0);
    let transportExpenses = expenses.filter(expense => expense.category === 'Transportation')
      .reduce((sum, expense) => sum + expense.amount, 0);
  
    return `This month, you spent most on food with ₹${foodExpenses.toFixed(2)}, and on transportation with ₹${transportExpenses.toFixed(2)}.`;
  };
  