import "dotenv/config";
import jwt from "jsonwebtoken";

export const getUserIdByHeaders = (req) => {
  const rawToken = req.header("Authorization");
  const token = rawToken.split("Bearer ")[1];
  if (!token) throw Error("No token");

  const data = jwt.verify(token, process.env.TOKEN_KEY);

  if (data.id) {
    return data.id;
  }

  throw Error("Error parsing token");
};
