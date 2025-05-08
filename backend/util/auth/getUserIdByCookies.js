import "dotenv/config";
import jwt from "jsonwebtoken";

export const getUserIdByCookies = (req) => {
	const token = req.cookies.token;
	if (!token) throw Error("No token");

	const data = jwt.verify(token, process.env.TOKEN_KEY);

	if (data.id) {
		return data.id;
	}

	throw Error("Error parsing token");
};
