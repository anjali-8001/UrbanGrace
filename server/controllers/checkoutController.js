const cartModel = require("../models/cartModel");

const stripe = require("stripe")(process.env.SECRET_KEY);

const createCheckoutController = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "No user found!",
      });
    }
    const cart = await cartModel.findOne({ userId: user._id });
    const products = cart.products;

    if (!products) {
      return res.status(400).send({
        success: false,
        message: "Cart is empty!",
      });
    }

    const customer = await stripe.customers.create({
      metadata: {
        userId: user._id,
        cartId: JSON.stringify(cart._id),
      },
    });

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: [product.image.url],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      customer: customer.id,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["IN", "US"],
      },
      // invoice_creation: {
      //   enabled: true,
      // },
      success_url: "https://urbangrace.vercel.app/",
      cancel_url: "https://urbangrace.vercel.app/",
    });

    res.status(200).send({
      success: true,
      message: "Checkout Successful",
      url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { createCheckoutController };
