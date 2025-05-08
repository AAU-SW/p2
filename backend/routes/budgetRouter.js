import express from "express";
import { createBudget, getBudgets } from "../controllers/budgetController.js";
import { deleteRow } from "../controllers/budgetController.js";

const budgetRouter = express.Router();

budgetRouter.post("/", createBudget);
budgetRouter.get("/", getBudgets);
budgetRouter.delete("/:id", deleteRow);

export default budgetRouter;
