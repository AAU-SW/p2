const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/user/:userId", async (req, res) => {
	try {
		const userId = getUserIdByCookies(req);
		const user = await User.findById(req.params.userId);
		if (!user) return res.status(404).send({ message: "User not found" });
		res.json(user);
	} catch (err) {
		res.status(500).send({ message: "Server error" });
	}
});

module.exports = router;
