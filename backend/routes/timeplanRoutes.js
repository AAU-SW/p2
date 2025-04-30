import express from "express";
import { getTimeplan, postTimeplan, deleteRow } from "../controllers/timeplanController.js";
const timeplanRouter = express.Router();

// API Routes for posting and fetching timeplans.
timeplanRouter.post("/", postTimeplan);
timeplanRouter.get("/", getTimeplan);
timeplanRouter.delete("/", deleteRow);

export default timeplanRouter;

