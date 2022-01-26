const express = require("express");
const {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
} = require("../controllers/user.controllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

module.exports = router;
