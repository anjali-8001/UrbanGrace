const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) {
      return res.send({ message: "Name is required." });
    }
    if (!email) {
      return res.send({ message: "Email is required." });
    }
    if (!password) {
      return res.send({ message: "Password is required." });
    }
    //check existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered! Please Login",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User registered successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Username and password are required",
      });
    }

    //if existing user
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({
        message: "Invalid username or password",
      });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(400).send({
        message: "Invalid username or password",
      });
    }

    //all conditions are satisfied so token is generated
    const token = JWT.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const user = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone,
      address: existingUser.address,
      isAdmin: existingUser.isAdmin,
    };

    res.status(200).send({
      success: true,
      message: "Successfully logged in",
      user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

const testController = async (req, res) => {
  try {
    return res.send("Protected");
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in testController",
      error,
    });
  }
};

module.exports = { registerController, loginController, testController };
