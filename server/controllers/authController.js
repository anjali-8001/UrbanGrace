const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).send({
        success: false,
        message: "Email is required!",
      });
      return;
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).send({
        success: false,
        message: "User doesnot exist!",
      });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    var otpToken = JWT.sign(
      {
        // exp: Math.floor(Date.now() / 1000) + 60 * 10,
        otp: otp,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    res.cookie("oid", otpToken, {
      maxAge: 10 * 60 * 1000,
      withCredentials: true,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password reset OTP",
      text: `Your OTP for password reset is: ${otp}. Please use this OTP to reset your password.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in forgot password controller",
      error,
    });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const oid = req.cookies?.oid;

    const decodedoid = JWT.verify(oid, process.env.JWT_SECRET);

    if (!email) {
      res.status(400).send({
        success: false,
        message: "Email is required!",
      });
      return;
    }
    if (!otp) {
      res.status(400).send({
        success: false,
        message: "otp is required!",
      });
      return;
    }

    if (decodedoid.otp === otp) {
      return res.status(200).send({
        success: true,
        message: "OTP verified",
      });
    }
    res.status(400).send({
      success: false,
      message: "Incorrect otp!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in verify controller",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send({
        success: false,
        message: "Email is required!",
      });
      return;
    }
    if (!password) {
      res.status(400).send({
        success: false,
        message: "Password is required!",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await userModel.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    res.clearCookie("oid");

    if (!updatedUser) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
      });
    }

    res.status(200).send({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in verify controller",
      error,
    });
  }
};

const updateUserDetailsController = async (req, res) => {
  try {
    const { email, name, phone, address } = req.body;

    const updatedUser = await userModel.findOneAndUpdate(
      { email: email },
      { name: name, phone: phone, address: address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong!",
      });
    }

    res.status(200).send({
      success: true,
      message: "User details updated",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  verifyOtpController,
  resetPasswordController,
  updateUserDetailsController,
};
