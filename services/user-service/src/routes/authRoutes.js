const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");
const { validate } = require("../middlewares/validate");
const {
  loginValidation,
  registerValidation,
} = require("../validations/authValidation");

router.post("/register", validate(registerValidation), authController.register);
router.post("/login", validate(loginValidation), authController.login);
router.post("/verify-pin", authMiddleware, authController.verifyPin);

module.exports = router;
