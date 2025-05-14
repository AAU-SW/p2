import { getUserIdByHeaders } from "../util/auth/getUserIdByHeaders.js";
import { User } from "../models/users.js";

export const getUser = async (req, res) => {
	try {
		const userId = getUserIdByHeaders(req);
		const user = await User.findById(userId);
		if (!user) return res.status(404).send({ message: "User not found" });
		res.json(user);
	} catch (err) {
		res.status(500).send({ message: "Server error" });
	}
};

export const updateUser = async (req, res) => {
	try {
		const userId = getUserIdByHeaders(req);
		const { username, email } = req.body;
		if (!userId) return res.status(401).json({ message: "Unauthorized" });
		const user = await User.findByIdAndUpdate(userId, { username, email });

		if (!user) return res.status(404).json({ message: "User not found" });
		res.json(user);
	} catch (err) {
		console.error("Error updating user:", err);
		res.status(500).json({ message: "Server error" });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const userId = getUserIdByHeaders(req);
		if (!userId) return res.status(401).json({ message: "Unauthorized" });
		const user = await User.findByIdAndDelete(userId);
		if (!user) return res.status(404).json({ message: "User not found" });
		res.json({ message: "User deleted successfully" });
	} catch (err) {
		console.error("Error deleting user:", err);
		res.status(500).json({ message: "Server error" });
	}
};
