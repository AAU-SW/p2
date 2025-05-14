import { User } from "../models/users.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const userVerification = (req, res) => {
	const rawToken = req.header("Authorization");
	const token = rawToken.split("Bearer ")[1];
	if (!token) {
		return res.json({ status: false });
	}
	jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
		if (err) {
			return res.json({ status: false });
		}

		const user = await User.findById(data.id);
		if (user) {
			return res.json({ status: true, user: user.username });
		}

		return res.json({ status: false });
	});
};
