import { Activity } from "../models/activities.js";
import { getUserIdByCookies } from "../util/auth/getUserIdByCookies.js";

export const addActivity = async (req, res) => {
  try {
    const userId = await getUserIdByCookies(req);
    const { price, title, date } = req.body;
    const newDate = new Date(date)
    newDate.setHours(newDate.getHours() + 2)

    const activity = await Activity.create({
      price,
      title,
      date: newDate,
      user_id: userId,
    });
    return res.status(201).json({ activity });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
