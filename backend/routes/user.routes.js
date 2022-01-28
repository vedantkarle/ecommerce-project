const express = require("express");
const {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
} = require("../controllers/user.controllers");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

module.exports = router;
