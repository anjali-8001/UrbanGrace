const { default: mongoose } = require("mongoose");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");

const getCartController = async (req, res) => {
  try {
    const { user } = req.body;

    const cart = await cartModel.findOne({ userId: user._id });
    if (cart && cart.products.length > 0) {
      res.status(200).send({
        success: true,
        message: "Cart fetched successfully",
        cart,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Cart fetched successfully",
        cart: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get cart controller",
      error,
    });
  }
};

const addProductController = async (req, res) => {
  try {
    const { user, productId, quantity, size } = req.body;

    const prodId = new mongoose.Types.ObjectId(productId);
    if (!quantity || quantity < 1) {
      res.status(404).send({
        success: false,
        message: "Quantity is required!",
      });
      return;
    }

    if (!size) {
      res.status(404).send({
        success: false,
        message: "Size is required!",
      });
      return;
    }

    const cart = await cartModel.findOne({ userId: user._id });
    const product = await productModel.findById(productId);

    if (!product) {
      res.status(404).send({
        success: false,
        message: "Product not found!",
      });
      return;
    }

    const price = product.price;
    const name = product.name;
    const image = product.image;

    if (!cart) {
      const newCart = await cartModel.create({
        userId: user._id,
        products: [{ productId, name, quantity, price, image, size }],
        bill: quantity * price,
      });
    } else {
      const productIndex = cart.products.findIndex((item) =>
        item.productId.equals(prodId)
      );

      if (productIndex > -1) {
        let item = cart.products[productIndex];
        if (item.size === size) {
          item.quantity += quantity;
          cart.bill = cart.products.reduce((total, curr) => {
            return total + curr.quantity * curr.price;
          }, 0);
          cart.products[productIndex] = item;
          await cart.save();
        } else {
          cart.products.push({ productId, name, quantity, price, image, size });
          cart.bill = cart.products.reduce((total, curr) => {
            return total + curr.quantity * curr.price;
          }, 0);
          await cart.save();
        }
      } else {
        cart.products.push({ productId, name, quantity, price, image, size });
        cart.bill = cart.products.reduce((total, curr) => {
          return total + curr.quantity * curr.price;
        }, 0);
        await cart.save();
      }
    }
    res.status(200).send({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in cart controller",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { user, productId, size } = req.body;
    const prodId = new mongoose.Types.ObjectId(productId);

    let cart = await cartModel.findOne({ userId: user._id });

    const productIndex = cart.products.findIndex((item) => {
      return item.productId.equals(prodId) && item.size === size;
    });

    if (productIndex > -1) {
      let item = cart.products[productIndex];
      // cart.bill -= item.price * item.quantity;
      if (cart.bill < 0) {
        cart.bill = 0;
      }
      cart.products.splice(productIndex, 1);
      cart.bill = cart.products.reduce((total, curr) => {
        return total + curr.quantity * curr.price;
      }, 0);
      cart = await cart.save();
      res.status(200).send({
        success: true,
        message: "Product deleted successfully",
        cart,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in cart controller",
      error,
    });
  }
};

module.exports = {
  addProductController,
  getCartController,
  deleteProductController,
};
