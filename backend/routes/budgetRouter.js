import express from "express";
import { createBudget, getBudgets, calculateBudgetSpending } from "../controllers/budgetController.js";

const budgetRouter = express.Router();

budgetRouter.post("/", createBudget);
budgetRouter.get("/", getBudgets);
budgetRouter.get("/calculate", calculateBudgetSpending);

export default budgetRouter;