import express from "express";
import { add_expense, getExpenses } from "../controllers/expenseController.js";

const expenseRouter = express.Router();

// API Routes for posting and fetching timeplans.
expenseRouter.post("/expenses", Add_expense);
expenseRouter.get("/getexpenses", getExpenses);

export default expenseRouter;