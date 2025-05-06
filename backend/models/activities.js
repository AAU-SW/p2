//database table
import mongoose from "mongoose";
import { BUDGET_CATEGORIES } from "../../shared/BUDGET_CATEGORIES.js";

const activitiesSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",

		required: true,
		// add function that points to user/model
	},
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	activitiesType: {
		type: String,
		enum: BUDGET_CATEGORIES,
		required: true,
	},
});

export const Activities = mongoose.model("Activities", activitiesSchema);
