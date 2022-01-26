const express = require("express");
const router = express.Router();
const { addOrderItems } = require("../controllers/order.controllers");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, addOrderItems);
