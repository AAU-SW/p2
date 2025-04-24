import express from "express";
import authRouter from "./authRouter.js";
import timeplanRoutes from "./timeplanRoutes.js";
import expenseRouter from "./expenseRouter.js";
import budgetRouter from "./budgetRouter.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/expenses", expenseRouter);
router.use("/timeplans", timeplanRoutes);
router.use("/budgets", budgetRouter);

export default router;

