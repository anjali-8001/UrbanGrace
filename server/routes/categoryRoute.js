const express = require("express");
const {
  requireSignIn,
  requireAdmin,
} = require("../middlewares/authmiddleware");
const {
  createCategoryController,
  getCategoriesController,
  deleteCategoryController,
  findCategoryController,
  updateCategoryController,
  createSubCategoryController,
  getSubCategoriesController,
} = require("../controllers/categoryController");

const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  requireAdmin,
  createCategoryController
);

router.post(
  "/create-subcategory",
  requireSignIn,
  requireAdmin,
  createSubCategoryController
);

router.get(
  "/get-categories",
  getCategoriesController
);

router.get(
  "/get-subcategories/:categoryName",
  getSubCategoriesController
);

router.delete(
  "/delete-category/:id",
  requireSignIn,
  requireAdmin,
  deleteCategoryController
);

router.put(
  "/update-category/:id",
  requireSignIn,
  requireAdmin,
  updateCategoryController
);

router.get(
  "/find-category/:id",
  findCategoryController
);

module.exports = router;
