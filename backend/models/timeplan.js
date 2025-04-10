import mongoose from "mongoose";

const timeplanSchema = new mongoose.Schema({
  job: {
    type: String,
    required: [true, "Your job type is required"],
  },
  wage: {
    type: Number,
    required: [true, "Your wage is required"],
  },
  hours: {
    type: Number,
    required: [true, "Your hours is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User", // Name of the User model
    required: true, // Ensure every timeplan is associated with a user
  },
});

export const Timeplan = mongoose.model("Timeplan", timeplanSchema);
