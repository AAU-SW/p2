import mongoose from "mongoose";

const timeplanSchema = new mongoose.Schema({
	type: {
		type: String,
		required: [true, "Type of work is required"],
	},
	job: {
		type: String,
		required: [true, "Your job type is required"],
	},
	wage: {
		type: Number,
	},
	hours: {
		type: Number,
	},
	jobInterval: {
		type: String,
	},
	fixedIncome: {
		type: Number,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId, // Reference to the User model
		ref: "User", // Name of the User model
		required: true, // Ensure every timeplan is associated with a user
	},
	date: {
		type: Date,
	},
});

export const Timeplan = mongoose.model("Timeplan", timeplanSchema);
