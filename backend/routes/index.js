import express from "express";
import authRouter from "./authRouter.js";
import timeplanRoutes from "./timeplanRoutes.js";
import expenseRouter from "./expenseRouter.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/expenses", expenseRouter);
router.use("/timeplans", timeplanRoutes);

export default router;

