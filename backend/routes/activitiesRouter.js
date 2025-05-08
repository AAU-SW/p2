import express from "express";
import {
	addActivities,
	getActivities,
	deleteRow,
} from "../controllers/activityController.js";
const activitiesRouter = express.Router();

// API Routes for posting and fetching timeplans.
activitiesRouter.post("/", addActivities);
activitiesRouter.get("/", getActivities);
activitiesRouter.delete("/:id", deleteRow);

export default activitiesRouter;
