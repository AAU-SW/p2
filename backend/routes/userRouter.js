import express from "express";
import { getUser } from "../controllers/userProfileController.js";
const userRouter = express.Router();

// API Routes for posting and fetching timeplans.
userRouter.get("/", getUser);

export default userRouter;
