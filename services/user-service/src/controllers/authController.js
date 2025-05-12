const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { Op } = require("sequelize");
const authConfig = require("../../config/auth");

exports.register = async (req, res) => {
  try {
    const { username, password, phoneNumber, cardNumber, pin } = req.body;

    // Check if email or username already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ phoneNumber }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User with this phone number or username already exists",
      });
    }

    const user = await User.create({
      username,
      password,
      phoneNumber,
      cardNumber,
      pin,
    });

    const token = jwt.sign(
      { id: user.id, phoneNumber: user.phoneNumber },
      authConfig.secret,
      { expiresIn: authConfig.expiresIn }
    );

    return res.status(201).json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ where: { phoneNumber } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.validPassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, phoneNumber: user.phoneNumber },
      authConfig.secret,
      { expiresIn: authConfig.expiresIn }
    );

    return res.json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
};
exports.verifyPin = async (req, res) => {
  try {
    const { pin } = req.body;

    // Ensure the authenticated user is fetched from the middleware
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Compare the provided PIN with the user's stored PIN
    if (user.pin !== pin) {
      return res.status(400).json({ error: "Invalid PIN" });
    }

    return res.status(200).json({ message: "PIN verified successfully" });
  } catch (error) {
    console.error("Verify PIN error:", error);
    return res.status(500).json({ error: "Failed to verify PIN" });
  }
};
