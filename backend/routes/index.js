import express from "express";
import authRouter from "./authRouter.js";
import timeplanRoutes from "./timeplanRoutes.js";
import expenseRouter from "./expenseRouter.js";
import activityRouter from "./activityRouter.js";
const router = express.Router();

router.get("/", (req, res) => res.send("SpareTime API"));
router.use("/auth", authRouter);
router.use("/expenses", expenseRouter);
router.use("/timeplans", timeplanRoutes);
router.use("/activities", activityRouter)

export default router;
