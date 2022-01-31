const express = require("express");
const router = express.Router();
const {
	addOrderItems,
	getOrder,
	updateOrderToPaid,
	payRazorpay,
	getUserOrders,
	getAllOrders,
} = require("../controllers/order.controllers");
const { protect, admin } = require("../middlewares/authMiddleware");

router
	.route("/")
	.post(protect, addOrderItems)
	.get(protect, admin, getAllOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = router;
