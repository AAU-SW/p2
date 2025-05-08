import { Activities } from "../models/activities.js";
import { getUserIdByCookies } from "../util/auth/getUserIdByCookies.js";
import { Budget } from "../models/budgetSchema.js";


// post request to add a new activity
export const addActivities = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req); // Gets current logged in user by using cookie token within browser.
        if (!userId) {
            return res
                .status(401)
                .json({ error: "Unauthorized: Invalid or missing user ID" });
        }
        const { title, price, date, activitiesType } = req.body;

        if (!title || !price || !date) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newActivity = new Activities({
            title,
            price,
            date,
            user: userId,
            activitiesType,
        }); // Creation of a new activity, with the current logged user.
        await newActivity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        console.error("Error adding activity:", error);
        res.status(500).json({ error: error.message });
    }
};

// get all activities for a user
export const getActivities = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req); // Gets current logged in user by using cookie token within browser.
        if (!userId) {
            return res
                .status(401)
                .json({ error: "Unauthorized: Invalid or missing user ID" });
        }
        const activities = await Activities.find({ user: userId }); // Finds the timeplan of the logged user.
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete row in activities table
export const deleteRow = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req); // Gets current logged in user by using cookie token within browser.
        if (!userId) {
            return res
                .status(401)
                .json({ error: "Unauthorized: Invalid or missing user ID" });
        }
        const { id } = req.params; // Gets the id of the row to be deleted.
        const activites = await Activities.findByIdAndDelete(id); // Deletes the row with the given id.
        if (!activites) {
            return res.status(404).json({ error: "Activites not found" });
        }
        res.status(200).json({ message: "Activites deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new budget category
export const createBudget = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req);
        if (!userId) {
            return res
                .status(401)
                .json({ error: "Unauthorized: Invalid or missing user ID" });
        }

        const { title, maxSpending, categories } = req.body;

        if (!title || !maxSpending) {
            return res
                .status(400)
                .json({ error: "Title and max spending amount are required" });
        }

        const newBudget = new Budget({
            user: userId,
            title,
            maxSpending,
            categories,
        });

        await newBudget.save();
        res.status(201).json(newBudget);
    } catch (error) {
        console.error("Error creating budget:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all budgets for a user
export const getBudgets = async (req, res) => {
    try {
        const userId = getUserIdByCookies(req);
        if (!userId) {
            return res
                .status(401)
                .json({ error: "Unauthorized: Invalid or missing user ID" });
        }

        const budgets = await Budget.find({ user: userId });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
