import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	maxSpending: {
		type: Number,
		required: true,
	},
	categories: [String],
});

export const Budget = mongoose.model("Budget", budgetSchema);
