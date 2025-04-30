import { Expense } from "../models/expenses.js";
import { getUserIdByCookies } from "../util/auth/getUserIdByCookies.js";

// post request to add a new expense
export const addExpense = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req); // Gets current logged in user by using cookie token within browser.
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid or missing user ID" });
        }
        const { expense, amount, date } = req.body;

        if (!expense || !amount || !date) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newExpense = new Expense({
            expense,
            amount,
            date,
            user: userId,
        }); // Creation of a new expense, with the current logged user.
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch(error){
        console.error("Error adding expense:", error);
        res.status(500).json({error: error.message});
    };
}

// get all expenses for a user
export const getExpenses = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req); // Gets current logged in user by using cookie token within browser.
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid or missing user ID" });
        }
        const expenses = await Expense.find({ user: userId }); // Finds the timeplan of the logged user.
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete row in expense table 
export const deleteRow = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req); // Gets current logged in user by using cookie token within browser.
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid or missing user ID" });
        }
        const { id } = req.params; // Gets the id of the row to be deleted.
        const expense = await expense.findByIdAndDelete(id); // Deletes the row with the given id.
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}