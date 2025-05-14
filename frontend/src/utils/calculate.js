import axios from 'axios';

export const calculateTotalSpending = async () => {
  try {
    // Fetch expenses
    const expensesResponse = await axios.get(
      import.meta.env.VITE_API_URL + '/expenses',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    const expenses =
      expensesResponse.data.filter((expense) => expense.recurring == true) ||
      [];
    const activities =
      expensesResponse.data.filter((expense) => expense.recurring == false) ||
      [];

    const spendingByCategory = {};

    // Process expenses
    expenses.forEach((expense) => {
      const category = expense.expenseType;
      if (!spendingByCategory[category]) {
        spendingByCategory[category] = 0;
      }
      spendingByCategory[category] += expense.amount;
    });

    // Process activities
    activities.forEach((activity) => {
      const category = activity.expenseType;
      if (!spendingByCategory[category]) {
        spendingByCategory[category] = 0;
      }
      spendingByCategory[category] += activity.amount;
    });

    // Calculate totals
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    const totalActivities = activities.reduce(
      (sum, activity) => sum + activity.price,
      0,
    );
    const combinedTotal = totalExpenses + totalActivities;

    return {
      spendingByCategory,
      totalExpenses,
      totalActivities,
      combinedTotal,
      expenses,
      activities,
    };
  } catch (error) {
    console.error('Error calculating spending:', error);
    throw error;
  }
};

/**
 * Updates budget data with current spending from activities and expenses
 * @param {Array} budgets - The list of budget categories
 * @param {Object} spendingByCategory - Object containing spending by category
 * @returns {Array} Updated budgets with current spending
 */
export const updateBudgetsWithSpending = (budgets, spendingByCategory) => {
  return budgets.map((budget) => {
    // Find spending for this budget category
    let currentSpending = 0;

    // Check if this budget's category appears in our spending data
    if (budget.categories && budget.categories.length > 0) {
      budget.categories.forEach((category) => {
        if (spendingByCategory[category]) {
          currentSpending += spendingByCategory[category];
        }
      });
    } else if (spendingByCategory[budget.title]) {
      // Fallback to using the budget title if categories aren't set
      currentSpending = spendingByCategory[budget.title];
    }

    return {
      ...budget,
      currentSpending,
    };
  });
};

export const getBudgetsWithCurrentSpending = async () => {
  try {
    // Get spending data
    const spendingData = await calculateTotalSpending();

    // Fetch budgets
    const budgetsResponse = await axios.get(
      import.meta.env.VITE_API_URL + '/budgets',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );

    const budgets = budgetsResponse.data || [];

    // Update budgets with current spending information
    const updatedBudgets = updateBudgetsWithSpending(
      budgets,
      spendingData.spendingByCategory,
    );

    return updatedBudgets;
  } catch (error) {
    console.error('Error fetching budgets with spending:', error);
    throw error;
  }
};
