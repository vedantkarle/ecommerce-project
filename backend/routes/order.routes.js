const express = require("express");
const router = express.Router();
const {
	addOrderItems,
	getOrder,
	updateOrderToPaid,
	payRazorpay,
	getUserOrders,
} = require("../controllers/order.controllers");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, addOrderItems);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = router;
