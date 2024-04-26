const orderModel = require("../models/orderModel");

const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "Something went wrong!",
        order: {},
      });
    }

    const orders = await orderModel.find({ userId: userId });

    if (!orders) {
      return res.status(200).send({
        success: true,
        message: "You don't have any orders!",
        orders: [],
      });
    }

    res.status(200).send({
      success: true,
      message: "Order fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
    });
  }
};
module.exports = { getOrdersByUserId };
