import { Timeplan } from "../models/timeplan.js";
import { getUserIdByHeaders } from "../util/auth/getUserIdByHeaders.js";
import { getFirstDateInMonth } from "../util/getFirstDateInMonth.js";

export const getTimeplan = async (req, res) => {
  try {
    const userId = getUserIdByHeaders(req); // Gets current logged in user by using cookie token within browser.
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or missing user ID" });
    }
    const timeplans = await Timeplan.find({ user: userId });
    const firstDateInMonth = getFirstDateInMonth();
    const filteredTimeplans = timeplans.filter((t) => {
      if (t.type === "Variable income") {
        const workedAtDate = new Date(t.workedAt);
        return (
          workedAtDate >= firstDateInMonth &&
          firstDateInMonth.getFullYear() === workedAtDate.getFullYear()
        );
      }
      return true;
    });
    res.status(200).json(filteredTimeplans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const postTimeplan = async (req, res) => {
  try {
    const userId = getUserIdByHeaders(req); // Gets current logged in user by using cookie token within browser.
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or missing user ID" });
    }
    const {
      type,
      job,
      date,
      wage = null,
      hours = null,
      jobInterval = null,
      fixedIncome = null,
    } = req.body; // Required values to submit a timeplan model, optional fields default to null

    const newTimeplan = await Timeplan.create({
      type,
      job,
      wage,
      workedAt: date,
      hours,
      jobInterval,
      fixedIncome,
      user: userId,
    }); // Creation of a new timeplan, with the current logged user.
    res.status(201).json(newTimeplan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete row in timeplan
export const deleteRow = async (req, res) => {
  try {
    const userId = getUserIdByHeaders(req); // Gets current logged in user by using cookie token within browser.
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or missing user ID" });
    }
    const { id } = req.params; // Gets the id of the row to be deleted.
    const timeplan = await Timeplan.findByIdAndDelete(id); // Deletes the row with the given id.
    if (!timeplan) {
      return res.status(404).json({ error: "Timeplan not found" });
    }
    res.status(200).json({ message: "Timeplan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
