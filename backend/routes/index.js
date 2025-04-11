import express from "express";
import authRouter from "./authRouter.js";
import expenseRouter from "./expenses.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/expenses", expenseRouter);

export default router;

