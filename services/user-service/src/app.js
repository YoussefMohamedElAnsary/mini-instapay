const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const { User } = require("../models");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/profile", require("./middlewares/auth"), (req, res) => {
  res.json({ user: req.user.toJSON() });
});


app.post("/api/user/update-balance", async (req, res) => {
  const { senderUserId, receiverUserId, amount } = req.body;

  try {
    // Parse amount to ensure it's a valid number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return res.status(400).json({ message: "Invalid amount format" });
    }

    console.log(`Updating balances: ${senderUserId} -> ${receiverUserId}, amount: ${parsedAmount}`);

    // Fetch sender and receiver
    const sender = await User.findByPk(senderUserId);
    const receiver = await User.findByPk(receiverUserId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or Receiver not found" });
    }

    // Check if sender has sufficient balance
    if (sender.balance < parsedAmount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update balances
    sender.balance -= parsedAmount;
    receiver.balance += parsedAmount;

    await sender.save();
    await receiver.save();

    console.log(`Balances updated successfully. Sender: ${sender.balance}, Receiver: ${receiver.balance}`);
    res.status(200).json({ message: "Balances updated successfully" });
  } catch (error) {
    console.error("Update Balance Error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update balances", error: error.message });
  }
});


app.get("/api/user/:phoneNumber", async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const user = await User.findOne({ where: { phoneNumber } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Fetch User Error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User service is running on port ${PORT}`);
});

module.exports = app;
