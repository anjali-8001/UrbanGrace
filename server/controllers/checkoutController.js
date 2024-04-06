const stripe = require("stripe")(process.env.SECRET_KEY);

const createCheckoutController = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart) {
      res.status(400).send({
        success: false,
        message: "Cart is empty!",
      });
    }

    const lineItems = cart.map((product) => ({
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
      mode: "payment",
      success_url: "http://localhost:3000/sucess",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.status(200).send({
      success: true,
      message: "Checkout Successful",
      id: session.id,
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
