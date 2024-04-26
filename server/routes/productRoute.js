const express = require("express");
const {
  createProductController,
  getProductsByCategoryController,
  getProductController,
  searchProductController,
  getProductsBySubCategoryController,
  getFeaturedProductsController,
} = require("../controllers/productController");
const {
  requireSignIn,
  requireAdmin,
} = require("../middlewares/authmiddleware");
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  requireAdmin,
  createProductController
);

router.post("/get-products/:categoryName", getProductsByCategoryController);

router.post(
  "/get-productsByType/:catName/:subcatName",
  getProductsBySubCategoryController
);

router.get("/get-featuredProducts", getFeaturedProductsController);

router.get("/get-product/:productId", getProductController);

router.delete("/delete-product/:id", requireSignIn, requireAdmin);

router.put("/update-product/:id", requireSignIn, requireAdmin);

router.get("/search/:keyword", searchProductController);

module.exports = router;
