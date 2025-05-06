import express from "express";
import {
	createBudget,
	getBudgets,
} from "../controllers/budgetController.js";

const budgetRouter = express.Router();

budgetRouter.post("/", createBudget);
budgetRouter.get("/", getBudgets);

export default budgetRouter;
