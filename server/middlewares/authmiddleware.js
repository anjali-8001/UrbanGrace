const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireSignIn = async (req, res, next) => {
  //verifying JWT token
  try {
    //decoding the encoded token in headers
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.userId);
    if (!user.isAdmin) {
      res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Auth failed",
    });
  }
};

const requireOid = async (req, res, next) => {
  try {
    const oid = req.cookies?.oid;
    if (!oid) {
      res.status(200).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Auth failed",
    });
  }
};

module.exports = { requireSignIn, requireAdmin, requireOid };
