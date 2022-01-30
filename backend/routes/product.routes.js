const express = require("express");
const {
	getProducts,
	getProduct,
	deleteProduct,
	updateProduct,
	createProduct,
} = require("../controllers/product.controllers");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router
	.route("/:productId")
	.get(getProduct)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

module.exports = router;
