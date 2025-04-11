import express from "express";
import { addExpense, getExpenses } from "../controllers/expenseController.js";

const expenseRouter = express.Router();

// API Routes for posting and fetching timeplans.

expenseRouter.post("/expenses", addExpense);
expenseRouter.get("/getexpenses", getExpenses);

export default expenseRouter;
