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

exports.createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "Sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		brand: "Sample brand",
		category: "Sample category",
		countInStock: 0,
		numReviews: 0,
		description: "Sample description",
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

exports.updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body;

	const product = await Product.findById(req.params.productId);

	if (product) {
		product.name = name || product.name;
		product.price = price || product.price;
		product.description = description || product.description;
		product.category = category || product.category;
		product.countInStock = countInStock || product.countInStock;
		product.image = image || product.image;
		product.brand = brand || product.brand;

		const updatedProduct = await product.save();

		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});
