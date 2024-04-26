const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(401).send({
        message: "Name is required",
      });
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      res.status(401).send({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category Controller",
      error,
    });
  }
};

const createSubCategoryController = async (req, res) => {
  try {
    const { categoryName, name } = req.body;
    if (!name || !categoryName) {
      res.status(401).send({
        message: "Category and sub-category are required",
      });
    }

    const existingCategory = await categoryModel.findOne({
      name: categoryName,
    });

    if (!existingCategory) {
      res.status(401).send({
        success: false,
        message: "No such category exists",
      });
    }

    if (
      existingCategory.subCategories.some(
        (subCategory) => subCategory.name === name
      )
    ) {
      return res.status(401).send({
        success: false,
        message: "Subcategory already exists",
      });
    }

    existingCategory.subCategories.push({ name, slug: slugify(name) });
    await existingCategory.save();

    res.status(201).send({
      success: true,
      message: "Sub-category created successfully",
      category: existingCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in sub-category Controller",
      error,
    });
  }
};

const getCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).send({
      success: true,
      message: "Fetched categories successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get category controller",
      error,
    });
  }
};
const getSubCategoriesController = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const category = await categoryModel.findOne({ name: categoryName });
    if (!category) {
      res.status(200).send({
        success: false,
        message: "No such category exists",
      });
    }
    const subcategories = category.subCategories;
    res.status(200).send({
      success: true,
      message: "Fetched categories successfully",
      subcategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get category controller",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Deleted Category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting the category",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const editedcategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        name: name,
        slug: slugify(name),
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      success: true,
      message: "Updated Category",
      editedcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating the category",
      error,
    });
  }
};

const findCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryname = await categoryModel.findById(id);
    res.status(200).send({
      success: true,
      message: "Found category name successfully",
      categoryName: categoryname.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in finding category controller",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  createSubCategoryController,
  getCategoriesController,
  deleteCategoryController,
  updateCategoryController,
  findCategoryController,
  getSubCategoriesController,
};
