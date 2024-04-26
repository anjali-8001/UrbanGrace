const express = require("express");
const { getOrdersByUserId } = require("../controllers/orderController");
const { requireSignIn } = require("../middlewares/authmiddleware");
const router = express.Router();

router.get("/get-orders/:userId", requireSignIn, getOrdersByUserId);
module.exports = router;
