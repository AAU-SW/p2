import express from "express";
import {
	addExpense,
	getExpenses,
	deleteRow,
} from "../controllers/expenseController.js";
const expenseRouter = express.Router();

// API Routes for posting and fetching timeplans.
expenseRouter.post("/", addExpense);
expenseRouter.get("/", getExpenses);

expenseRouter.delete("/:id", deleteRow);

export default expenseRouter;
