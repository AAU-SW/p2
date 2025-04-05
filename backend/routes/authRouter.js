import { Signup, Login } from "../controllers/authController.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/signup", Signup);
authRouter.post("/Login", Login);

export default authRouter;
