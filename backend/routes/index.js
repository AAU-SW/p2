import express from "express";
import authRouter from "./authRouter.js";
import timeplanRoutes from "./timeplanRoutes.js";
import expenseRouter from "./expenseRouter.js";
import budgetRouter from "./budgetRouter.js";
import activitiesRouter from "./activitiesRouter.js";

const router = express.Router();

router.get("/", (req, res) => res.send("SpareTime API"));
router.use("/auth", authRouter);
router.use("/expenses", expenseRouter);
router.use("/timeplans", timeplanRoutes);
router.use("/budgets", budgetRouter);
router.use("/activities", activitiesRouter);

export default router;
