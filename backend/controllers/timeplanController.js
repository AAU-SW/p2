import { Timeplan } from "../models/timeplan.js";
import { userVerification } from "../middlewares/authMiddleware.js";

export const getTimeplan = async (req, res, next) => {
    try {
        const timeplans = await Timeplan.find(); 
        res.status(200).json(timeplans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const postTimeplan = async (req, res, next) => {
    try{
        const { job, wage, hours } = req.body;
        const newTimeplan = new Timeplan({
            job,
            wage,
            hours,
            /*user: req.user.id,*/
        });
        await newTimeplan.save();
        res.status(201).json(newTimeplan);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}