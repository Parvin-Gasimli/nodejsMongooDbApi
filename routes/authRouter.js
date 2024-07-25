const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/reset").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
