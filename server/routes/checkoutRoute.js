const express = require("express");
const {
  createCheckoutController,
} = require("../controllers/checkoutController");

const router = express.Router();

router.post("/create-checkout-session", createCheckoutController);

module.exports = router;
