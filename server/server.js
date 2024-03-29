const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://urbangrace.vercel.app",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("<h1>Hello! Welcome to the Ecommerce Website</h1>");
});

app.use("/auth", require("./routes/authRoute.js"));

app.use("/category", require("./routes/categoryRoute.js"));

app.use("/product", require("./routes/productRoute.js"));
app.use("/cart", require("./routes/cartRoute.js"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started st ${PORT}`);
});
