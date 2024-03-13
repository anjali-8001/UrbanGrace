const express = require("express");
const {
  addProductController,
  getCartController,
  deleteProductController,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add-product", addProductController);
router.post("/get-cart", getCartController);
router.post("/delete-product", deleteProductController);

module.exports = router;
