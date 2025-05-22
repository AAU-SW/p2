import { Expense } from "../models/expenses.js";
import { getUserIdByHeaders } from "../util/auth/getUserIdByHeaders.js";
import { BUDGET_CATEGORIES } from "../util/BUDGET_CATEGORIES.js";
import { getFirstDateInMonth } from "../util/getFirstDateInMonth.js";

export const addExpense = async (req, res) => {
	try {
		const userId = getUserIdByHeaders(req);
		if (!userId) {
			return res
				.status(401)
				.json({ error: "Unauthorized: Invalid or missing user ID" });
		}
		const {
			expense,
			amount,
			date,
			expenseType = BUDGET_CATEGORIES[0],
			recurring = false,
		} = req.body;

		if (!expense || !amount || !date) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const newExpense = Expense.create({
			expense,
			amount,
			date,
			user: userId,
			expenseType,
			recurring,
		});

		res.status(201).json(newExpense);
	} catch (error) {
		console.error("Error adding expense:", error);
		res.status(500).json({ error: error.message });
	}
};

export const getExpenses = async (req, res) => {
	try {
		const userId = getUserIdByHeaders(req);
		if (!userId) {
			return res
				.status(401)
				.json({ error: "Unauthorized: Invalid or missing user ID" });
		}
		const expenses = await Expense.find({ user: userId });
		const firstDateInMonth = getFirstDateInMonth();
		const filteredExpenses = expenses.filter((e) => {
			if (!e.recurring) {
				return new Date(e.date) >= firstDateInMonth;
			}
			return true;
		});
		res.status(200).json(filteredExpenses);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const deleteRow = async (req, res) => {
	try {
		const userId = getUserIdByHeaders(req);
		if (!userId) {
			return res
				.status(401)
				.json({ error: "Unauthorized: Invalid or missing user ID" });
		}
		const { id } = req.params;
		const expense = await Expense.findByIdAndDelete(id);
		if (!expense) {
			return res.status(404).json({ error: "Expense not found" });
		}
		res.status(200).json({ message: "Expense deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
