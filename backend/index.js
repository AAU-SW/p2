import { startDB } from "./db.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import morgan from "morgan";

const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: ["http://localhost:5173", "https://aau-sw.github.io"],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}),
);
app.use(cookieParser());

app.use("/", routes);

startDB();

app.listen(4000, () => {
	console.log("Server is running on port 4000");
});
