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
	workedAt: {
		type: Date,
		default: new Date(),
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

export const Timeplan = mongoose.model("Timeplan", timeplanSchema);
