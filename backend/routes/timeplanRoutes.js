import express from "express";
import { getTimeplan, postTimeplan } from "../controllers/timeplanController.js";
const timeplanRouter = express.Router();

// API Routes for posting and fetching timeplans.
timeplanRouter.post("/post", postTimeplan);
timeplanRouter.get("/get", getTimeplan);

export default timeplanRouter;