const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  verifyOtpController,
  resetPasswordController,
  updateUserDetailsController,
} = require("../controllers/authController");
const {
  requireSignIn,
  requireAdmin,
  requireOid,
} = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/verify-otp", requireOid, verifyOtpController);
router.put("/reset-password", requireOid, resetPasswordController);
router.put("/update", requireSignIn, updateUserDetailsController);


router.get("/auth-user", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/auth-forgotpassword", requireOid, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/auth-admin", requireSignIn, requireAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
