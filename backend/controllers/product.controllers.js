const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

exports.getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.json(products);
});

exports.getProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.productId);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product Not Found");
	}
});

exports.deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.productId);
	if (product) {
		await product.remove();
		res.json({ message: "Product removed successfully" });
	} else {
		res.status(404);
		throw new Error("Product Not Found");
	}
});
