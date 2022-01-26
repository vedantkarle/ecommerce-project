const express = require("express");
const {
	getProducts,
	getProduct,
} = require("../controllers/product.controllers");
const router = express.Router();

router.get("/", getProducts);

router.get("/:productId", getProduct);

module.exports = router;
