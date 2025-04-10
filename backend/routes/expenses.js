import express from "express";
import { Add_expense, getExpenses } from "../controllers/expenseController.js";

const expenseRouter = express.Router();

// Route to add a new expense
expenseRouter.post("/expenses", Add_expense);

// Route to get all expenses for a user
expenseRouter.get("/getexpenses", getExpenses);

export default expenseRouter;

