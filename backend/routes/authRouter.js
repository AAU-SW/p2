import { Signup, Login } from "../controllers/authController.js";
import express from "express";
import { userVerification } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/", userVerification);
authRouter.post("/signup", Signup);
authRouter.post("/login", Login);

export default authRouter;
