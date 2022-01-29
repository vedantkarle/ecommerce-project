const express = require("express");
const {
	getProducts,
	getProduct,
	deleteProduct,
} = require("../controllers/product.controllers");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getProducts);

router
	.route("/:productId")
	.get(getProduct)
	.delete(protect, admin, deleteProduct);

module.exports = router;
