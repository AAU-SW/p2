import express from "express";
import authRouter from "./authRouter.js";
import timeplanRoutes from "./timeplanRoutes.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/timeplans", timeplanRoutes);

export default router;
