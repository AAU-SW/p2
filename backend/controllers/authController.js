import { User } from "../models/users.js";
import { createSecretToken } from "../util/secretToken.js";
import bcrypt from "bcrypt";

export const Signup = async (req, res, next) => {
	try {
		const { email, password, username, createdAt } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}
		const user = await User.create({ email, password, username, createdAt });
		const token = createSecretToken(user._id);
		res.status(201).json({ token, user });
		return next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
};

export const Login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Missing email or password" });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "Email not found" });
		}
		const auth = await bcrypt.compare(password, user.password);
		if (!auth) {
			return res.status(403).json({ message: "Incorrect password" });
		}
		const token = createSecretToken(user._id);
		res.status(201).json({ token });
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
		return next();
	}
};

export const Logout = async (_, res, next) => {
	try {
		res
			.status(200)
			.json({ message: "User logged out successfully", success: true });
		return next();
	} catch (error) {
		console.error(error);
		res.status(500);
	}
};
