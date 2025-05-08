//database table
import mongoose from "mongoose";
import { BUDGET_CATEGORIES } from "../util/BUDGET_CATEGORIES.js";

const expenseSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	expense: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	expenseType: {
		type: String,
		enum: BUDGET_CATEGORIES,
		required: true,
	},
	recurring: {
		type: Boolean,
		required: true,
		default: false,
	},
});

export const Expense = mongoose.model("Expense", expenseSchema);
