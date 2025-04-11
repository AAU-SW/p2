import { Expenses } from "../models/expenses.js";
import { getUserIdByCookies } from "../util/auth/getUserIdByCookies.js";

// post request to add a new expense
export const Add_expense = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req); // Gets current logged in user by using cookie token within browser.
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid or missing user ID" });
        }
        const { Expense, Amount, Date } = req.body;

        if (!Expense || !Amount || !Date) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newExpense = new Expense({
            Expense,
            Amount,
            Date,
            user: userId,
        }); // Creation of a new expense, with the current logged user.
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch(error){
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
        const expenses = await Expenses.find({ user: userId }); // Finds the timeplan of the logged user.
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}