const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

exports.addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems?.length === 0) {
		res.status(400);
		throw new Error("No order items");
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

exports.getOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email",
	);

	if (order) {
		res.status(200).json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});
