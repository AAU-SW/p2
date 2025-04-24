import { Budget } from "../models/budgetSchema.js";
import { Expense } from "../models/expenses.js";
import { getUserIdByCookies } from "../util/auth/getUserIdByCookies.js";

// Create a new budget category
export const createBudget = async (req, res) => {
  try {
    const userId = getUserIdByCookies(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: Invalid or missing user ID" });
    }
    
    const { title, maxSpending, categories } = req.body;
    
    if (!title || !maxSpending) {
      return res.status(400).json({ error: "Title and max spending amount are required" });
    }
    
    const newBudget = new Budget({
      user: userId,
      title,
      maxSpending,
      currentSpending: 0,
      categories: categories // Default to using the title as a category
    });
    
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    console.error("Error creating budget:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all budgets for a user
export const getBudgets = async (req, res) => {
  try {
    const userId = getUserIdByCookies(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: Invalid or missing user ID" });
    }
    
    const budgets = await Budget.find({ user: userId });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Calculate budget spending from expenses
export const calculateBudgetSpending = async (req, res) => {
  try {
    const userId = getUserIdByCookies(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: Invalid or missing user ID" });
    }
    
    // Get all budgets for the user
    const budgets = await Budget.find({ user: userId });
    
    // Get all expenses for the user
    const expenses = await Expense.find({ user: userId });
    
    // For each budget, calculate current spending
    const updatedBudgets = await Promise.all(budgets.map(async (budget) => {
      const matchingExpenses = expenses.filter(expense => 
        budget.categories.includes(expense.expenseType)
      );
      
      const totalSpending = matchingExpenses.reduce(
        (sum, expense) => sum + expense.amount, 0
      );
      
      budget.currentSpending = totalSpending;
      await budget.save();
      return budget;
    }));
    
    res.status(200).json(updatedBudgets);
  } catch (error) {
    console.error("Error calculating budget spending:", error);
    res.status(500).json({ error: error.message });
  }
};