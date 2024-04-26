const { default: slugify } = require("slugify");
const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const cloudinary = require("../config/cloudinary");
const { default: mongoose } = require("mongoose");

const createProductController = async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      description,
      price,
      image,
      isFeatured,
    } = req.body;

    if (!name) {
      res.status(401).send({
        success: false,
        message: "Name is required.",
      });
      return;
    }
    if (!category) {
      res.status(401).send({
        success: false,
        message: "Category is required.",
      });
      return;
    }
    if (!subcategory) {
      res.status(401).send({
        success: false,
        message: "Sub-category is required.",
      });
      return;
    }
    if (!description) {
      res.status(401).send({
        success: false,
        message: "Description is required.",
      });
      return;
    }
    if (!price) {
      res.status(401).send({
        success: false,
        message: "Price is required.",
      });
      return;
    }

    if (!image) {
      res.status(401).send({
        success: false,
        message: "Image is required.",
      });
      return;
    }
    const existingProduct = await productModel.findOne({ name: name });

    if (existingProduct) {
      res.status(401).send({
        success: false,
        message: "Product already exists",
      });
      return;
    }

    const existingCategory = await categoryModel.findById(category);

    if (!existingCategory) {
      res.status(401).send({
        success: false,
        message: "Category doesnot exists",
      });
      return;
    }

    const existingSubCategory = existingCategory.subCategories.find(
      (subCat) => {
        return subCat._id == subcategory;
      }
    );

    if (!existingSubCategory) {
      res.status(401).send({
        success: false,
        message: "Subcategory doesnot exists",
      });
      return;
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "products",
      // width: 300,
      // crop: "scale"
    });

    const product = await new productModel({
      name,
      slug: slugify(name),
      description: description,
      price: price,
      category: category,
      subcategory: subcategory,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      isFeatured: isFeatured,
    }).save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in create Product Controller",
    });
  }
};

const getFeaturedProductsController = async (req, res) => {
  try {
    const pipeline = [
      {
        $match: {
          isFeatured: true,
        },
      },
    ];

    const products = await productModel.aggregate(pipeline);

    res.status(200).send({
      success: true,
      products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getFeaturedProductsController Controller",
    });
  }
};

const getProductsByCategoryController = async (req, res) => {
  try {
    const { categoryName } = req.params;

    const pageSize = 8;
    const { page = 1 } = req.body;
    const skip = (page - 1) * pageSize;

    const pipeline = [
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },

      {
        $match: { "category.name": categoryName },
      },
      {
        $skip: skip,
      },
      {
        $limit: parseInt(pageSize),
      },
    ];

    const products = await productModel.aggregate(pipeline);

    res.status(200).send({
      success: true,
      products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getProductByCategory Controller",
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(productId),
        },
      },
    ];

    const product = await productModel.aggregate(pipeline);

    res.status(200).send({
      success: true,
      product: product[0],
      message: "Product fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getProduct Controller",
    });
  }
};

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const products = await productModel.find({
      $or: [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).send({
      success: true,
      products: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in searchProduct Controller",
    });
  }
};
const getProductsBySubCategoryController = async (req, res) => {
  try {
    const { catName, subcatName } = req.params;

    const category = await categoryModel.findOne({ name: catName });

    const subcat = category.subCategories.find((subcat) => {
      return subcat.name === subcatName;
    });
    const subcatId = subcat._id;
    const pageSize = 8;
    const { page = 1 } = req.body;
    const skip = (page - 1) * pageSize;

    const pipeline = [
      {
        $match: {
          subcategory: new mongoose.Types.ObjectId(subcatId),
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: parseInt(pageSize),
      },
    ];

    const products = await productModel.aggregate(pipeline);

    res.status(200).send({
      success: true,
      products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in Controller",
    });
  }
};

module.exports = {
  createProductController,
  getProductsByCategoryController,
  getProductController,
  searchProductController,
  getProductsBySubCategoryController,
  getFeaturedProductsController,
};
