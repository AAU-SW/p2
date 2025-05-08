import { Budget } from "../models/budgetSchema.js";
import { getUserIdByCookies } from "../util/auth/getUserIdByCookies.js";

// Create a new budget category
export const createBudget = async (req, res) => {
  try {
    const userId = getUserIdByCookies(req);
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or missing user ID" });
    }

    const { title, maxSpending, categories } = req.body;

    if (!title || !maxSpending) {
      return res
        .status(400)
        .json({ error: "Title and max spending amount are required" });
    }

    const newBudget = new Budget({
      user: userId,
      title,
      maxSpending,
      categories,
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
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or missing user ID" });
    }

    const budgets = await Budget.find({ user: userId });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete row in budget table
export const deleteRow = async (req, res) => {
  try {
    const userId = getUserIdByCookies(req); // Gets current logged in user by using cookie token within browser.
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or missing user ID" });
    }
    const { id } = req.params; // Gets the id of the row to be deleted.
    const budgets = await Budget.findByIdAndDelete(id); // Deletes the row with the given id.
    if (!budgets) {
      return res.status(404).json({ error: "Budgets not found" });
    }
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
