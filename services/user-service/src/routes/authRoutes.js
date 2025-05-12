const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validate } = require("../middlewares/validate");
const {
  loginValidation,
  registerValidation,
} = require("../validations/authValidation");

router.post("/register", validate(registerValidation), authController.register);
router.post("/login", validate(loginValidation), authController.login);

module.exports = router;
