import { Timeplan } from "../models/timeplan.js";
import { getUserIdByCookies } from "../util/auth/getUserIdByCookies.js";


export const getTimeplan = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req);
        const timeplans = await Timeplan.find({ user: userId });
        res.status(200).json(timeplans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const postTimeplan = async (req, res,) => {
    try{
        const userId = getUserIdByCookies(req);
        const { job, wage, hours } = req.body;
        const newTimeplan = new Timeplan({
            job,
            wage,
            hours,
            user: userId,
        });
        await newTimeplan.save();
        res.status(201).json(newTimeplan);
    } catch(error){
        console.error("req.user:", req.user); 
        res.status(500).json({error: error.message});
    }
}