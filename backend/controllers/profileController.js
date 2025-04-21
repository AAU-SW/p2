import { User } from "../models/users.js";
import { getUserIdByCookies } from "../util/auth/getUserIdByCookies.js";


export const getUser = async (req, res) => {
    console.log("fisse");
    try {
        const userId = req.params.userId; // Gets current logged in user by using cookie token within browser.
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid or missing user ID" });
        }
        const user = await User.find(userId); // Finds the data from the login user.
        console.log("ostemad" + user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}