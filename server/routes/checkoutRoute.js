const express = require("express");
const {
  createCheckoutController,
} = require("../controllers/checkoutController");

const router = express.Router();

router.post("/create-checkout-session", createCheckoutController);

router.get("/payment-success", (req, res) => {
  res.status(200).send({
    message: "Payment successful! Thankyou for your purchase.",
  });
});
router.get("/payment-cancel", (req, res) => {
  res.status(200).send({
    message: "Payment cancelled! Your order was not processed.",
  });
});

module.exports = router;
