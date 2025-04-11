import { Timeplan } from "../models/timeplan.js";
import { getUserIdByCookies } from "../util/auth/getUserIdByCookies.js";


export const getTimeplan = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req); // Gets current logged in user by using cookie token within browser.
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid or missing user ID" });
        }
        const timeplans = await Timeplan.find({ user: userId }); // Finds the timeplan of the logged user.
        res.status(200).json(timeplans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const postTimeplan = async (req, res,) => {
    try{
        const userId = getUserIdByCookies(req); // Gets current logged in user by using cookie token within browser.
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid or missing user ID" });
        }
        const { type, job, wage, hours } = req.body; // Required values to submit a timeplan model
        const newTimeplan = new Timeplan({
            type,
            job,
            wage,
            hours,
            user: userId,
        }); // Creation of a new timeplan, with the current logged user.
        await newTimeplan.save();
        res.status(201).json(newTimeplan);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}