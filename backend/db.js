import { config } from "dotenv";
import mongoose from "mongoose";

config();
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO_URI;

async function startDB() {
	await mongoose.connect(mongoDB);
	console.log("Database connection established!");
}

export { startDB };
