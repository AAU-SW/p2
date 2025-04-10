import { expenses } from "../models/expenses.js";
import { getUserIdByCookies } from "../util/auth/getUserIdByCookies.js";

export const Add_expense = async (req, res, next) => {
    try {
        const { Expense, Amount, Date } = req.body;

        if (!Expense || !Amount || !Date) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newExpense = await expenses.create({ Expense, Amount, Date });

        // informs user of successful creation
        res.status(201).json(newExpense);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add expense" });
    }
};

export const getExpenses = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req)
        const expenses = await expenses.find({user: userId});
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch expenses" });
    }
}