const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cartModel = require("./models/cartModel.js");
const orderModel = require("./models/orderModel.js");

require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: process.env.ORG_URL,
    origin: "https://urbangrace.vercel.app",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const stripe = require("stripe")(process.env.SECRET_KEY);

const endpointSecret = process.env.ENDPOINT_SECRET;
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    try {
      const payload = request.body;
      const sig = request.headers["stripe-signature"];

      let event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

      let data = event.data.object;
      let eventType = event.type;

      // Handle the checkout.session.completed event
      if (event.type === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer).then(async (customer) => {
          // console.log("customer", customer);
          // console.log("data: ", data);

          const cartId = JSON.parse(customer.metadata.cartId);

          const cart = await cartModel.findById(cartId);
          const items = cart.products;

          const newOrder = await new orderModel({
            userId: customer.metadata.userId,
            customerId: data.customer,
            paymentIntentId: data.payment_intent,
            products: items,
            total: data.amount_total,
            shipping: data.customer_details,
            status: data.payment_status,
          }).save();

          await cartModel.findByIdAndDelete(cartId);
        });
      }
      response.status(200).send({
        success: true,
      });
    } catch (error) {
      console.log(error);
      response.status(500).send({
        success: false,
        message: "Something went wrong in processing order!",
      });
    }
  }
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("<h1>Hello! Welcome to the Ecommerce Website</h1>");
});

app.use("/auth", require("./routes/authRoute.js"));
app.use("/category", require("./routes/categoryRoute.js"));
app.use("/product", require("./routes/productRoute.js"));
app.use("/cart", require("./routes/cartRoute.js"));
app.use("/checkout", require("./routes/checkoutRoute.js"));
app.use("/order", require("./routes/orderRoute.js"));


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
