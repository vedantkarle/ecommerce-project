const express = require("express");
const router = express.Router();
const { addOrderItems, getOrder } = require("../controllers/order.controllers");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrder);

module.exports = router;
