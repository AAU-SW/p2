import express from "express";
import {
	deleteUser,
	getUser,
	updateUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.put("/", updateUser);
userRouter.delete("/", deleteUser);

export default userRouter;
