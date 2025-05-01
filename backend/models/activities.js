import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
	price: {
		type: Number,
		required: [true, "Price is required"],
	},
	title: {
		type: String,
		required: [true, "Title is required"],
	},
	date: {
		type: Date,
		default: new Date(),
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "user_id is required"],
	},
});

export const Activity = mongoose.model("Activity", activitySchema);
