import express from "express";
import {
  addActivity,
  getActivities,
} from "../controllers/activitiesController.js";

const activityRouter = express.Router();

activityRouter.post("/", addActivity);
activityRouter.get("/", getActivities);

export default activityRouter;
