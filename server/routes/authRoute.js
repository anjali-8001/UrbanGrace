const express = require("express");
const {
  registerController,
  loginController,
  testController,
} = require("../controllers/authController");
const {
  requireSignIn,
  requireAdmin,
} = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/auth-user", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/auth-admin",requireSignIn, requireAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
