import express from "express";
import { addActivity } from "../controllers/activitiesController.js";

const activityRouter = express.Router();

activityRouter.post("/", addActivity);

export default activityRouter;
