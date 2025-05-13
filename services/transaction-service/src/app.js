const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Transaction } = require("../models"); // Updated import path
const { Op } = require("sequelize");
const axios = require("axios"); // For inter-service communication
require("dotenv").config({
  path: "../../../envs/.env." + (process.env.NODE_ENV || "development"),
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Environment variables for other services
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const REPORTING_SERVICE_URL = process.env.REPORTING_SERVICE_URL;

// Route: Create a transaction
app.post("/api/transactions", async (req, res) => {
  const { senderUserId, receiverPhoneNumber, amount, description } = req.body;

  try {
    console.log(
      "Transaction Request:",
      `${USER_SERVICE_URL}/api/user/${receiverPhoneNumber}`
    );
    const receiverResponse = await axios.get(
      `${USER_SERVICE_URL}/api/user/${receiverPhoneNumber}`
    );

    if (!receiverResponse.data) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    console.log("Receiver Response:", receiverResponse.data);
    // Create transaction
    const transaction = await Transaction.create({
      senderUserId,
      receiverUserId: receiverResponse.data.id,
      amount,
      type: "SENT",
      status: "PENDING",
      description,
    });

    // Update balances via User Service
    await axios.post(`${USER_SERVICE_URL}/api/user/update-balance`, {
      senderUserId,
      receiverUserId: receiverResponse.data.id,
      amount,
    });

    // Notify Reporting Service
    // await axios.post(`${REPORTING_SERVICE_URL}/api/reports/transactions`, {
    //   transactionId: transaction.id,
    //   senderUserId,
    //   receiverUserId,
    //   amount,
    // });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Transaction Error:", error.message);
    res
      .status(500)
      .json({ message: "Transaction failed", error: error.message });
  }
});

// Route: Get all transactions
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Fetch Transactions Error:", error.message);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

app.get("/api/transactions/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userTransactions = await Transaction.findAll({
      where: {
        [Op.or]: [{ senderUserId: userId }, { receiverUserId: userId }],
      },
    });

    if (!userTransactions || userTransactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }

    res.status(200).json(userTransactions);
  } catch (error) {
    console.error("Fetch User Transactions Error:", error.message);
    res.status(500).json({ message: "Failed to fetch user transactions" });
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Transaction Service running on port ${PORT}`);
});

module.exports = app;
