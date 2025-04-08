import express from "express";
import { getTimeplan, postTimeplan } from "../controllers/timeplanController.js";
import { userVerification } from "../middlewares/authMiddleware.js";

const timeplanRouter = express.Router();

timeplanRouter.post("/post", postTimeplan);
timeplanRouter.get("/get", getTimeplan);

export default timeplanRouter;