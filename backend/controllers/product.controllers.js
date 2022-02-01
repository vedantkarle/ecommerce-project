const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

exports.getProducts = asyncHandler(async (req, res) => {
	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};

	const count = await Product.count(keyword);
	const products = await Product.find(keyword)
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

exports.createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			r => r.user.toString() === req.user._id.toString(),
		);

		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Product already reviewed");
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, i) => i.rating + acc, 0) /
			product.reviews.length;

		await product.save();

		res.status(201).json({ message: "Review added" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});
