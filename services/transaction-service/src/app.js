const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Transaction } = require("../models"); // Updated import path
const { Op } = require("sequelize");
const axios = require("axios"); // For inter-service communication
const path = require("path");

// Load environment variables
const env = process.env.NODE_ENV || "dev";
const envPath = path.resolve(__dirname, "../../../envs/.env." + env);
require("dotenv").config({ path: envPath });
console.log(`Loaded .env file from: ${envPath}`);

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
    // Ensure amount is a valid number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      return res.status(400).json({ message: "Invalid amount format" });
    }

    // Log the environment variables and request data
    console.log("Environment variables:", {
      USER_SERVICE_URL: process.env.USER_SERVICE_URL,
      NODE_ENV: process.env.NODE_ENV
    });
    console.log("Transaction request data:", {
      senderUserId,
      receiverPhoneNumber,
      amount: parsedAmount,
      description
    });
    
    console.log(
      "Transaction Request URL:",
      `${USER_SERVICE_URL}/api/user/${receiverPhoneNumber}`
    );
    
    const receiverResponse = await axios.get(
      `${USER_SERVICE_URL}/api/user/${receiverPhoneNumber}`
    );

    if (!receiverResponse.data) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    console.log("Receiver Response:", receiverResponse.data);
    
    // Create transaction in PENDING state without updating balances yet
    const transaction = await Transaction.create({
      senderUserId,
      receiverUserId: receiverResponse.data.id,
      amount: parsedAmount,
      type: "SENT",
      status: "PENDING",
      description,
    });

    console.log("Transaction created:", transaction.id);
    
    // Return the transaction info immediately
    // Balances will be updated after PIN verification
    res.status(201).json(transaction);
    
  } catch (error) {
    // More detailed error logging
    console.error("Transaction Error:", {
      message: error.message,
      stack: error.stack,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : 'No response data'
    });
    res
      .status(500)
      .json({ message: "Transaction failed", error: error.message });
  }
});


// New endpoint: Confirm transaction after PIN verification
app.post("/api/transactions/:transactionId/confirm", async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findByPk(transactionId);
    
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status !== "PENDING") {
      return res.status(400).json({ message: "Only pending transactions can be confirmed" });
    }

    // Ensure amount is a valid number
    const amount = parseFloat(transaction.amount);
    if (isNaN(amount)) {
      return res.status(400).json({ message: "Invalid transaction amount" });
    }

    console.log(`Confirming transaction ${transactionId} with amount ${amount}`);
    
    // Update balances via User Service
    try {
      const balanceResponse = await axios.post(`${USER_SERVICE_URL}/api/user/update-balance`, {
        senderUserId: transaction.senderUserId,
        receiverUserId: transaction.receiverUserId,
        amount: amount
      });
      
      console.log('Balance update response:', balanceResponse.data);
      
      // Update original transaction status to COMPLETED
      transaction.status = "COMPLETED";
      await transaction.save();
      
      console.log(`Transaction ${transactionId} confirmed and balances updated`);
      
      res.status(200).json({ 
        message: "Transaction confirmed successfully", 
        transaction,
        balanceUpdate: balanceResponse.data
      });
    } catch (error) {
      // If balance update fails, keep transaction as PENDING
      console.error("Balance update failed:", error.message);
      res.status(500).json({ 
        message: "Failed to update balances", 
        error: error.response ? error.response.data : error.message 
      });
    }
  } catch (error) {
    console.error("Confirm Transaction Error:", error.message);
    res.status(500).json({ message: "Failed to confirm transaction", error: error.message });
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

// Route: Get transactions for a specific user
// params: userId 
// returns: all transactions for the user
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

// Route: Cancel a transactionx
// params: transactionId
// returns: message
app.post("/api/transactions/:transactionId/cancel", async (req, res) => {
  const { transactionId } = req.params;

  try {
    console.log(`Attempting to cancel transaction ${transactionId}`);
    const transaction = await Transaction.findByPk(transactionId);
    
    if (!transaction) {
      console.log(`Transaction ${transactionId} not found`);
      return res.status(404).json({ message: "Transaction not found" });
    }

    console.log(`Current transaction status: ${transaction.status}`);
    if (transaction.status !== "PENDING") {
      console.log(`Cannot cancel - transaction ${transactionId} is not in PENDING state`);
      return res.status(400).json({ message: "Only pending transactions can be cancelled" });
    }

    // Update transaction status
    transaction.status = "FAILED";
    await transaction.save();
    console.log(`Transaction ${transactionId} status updated to FAILED`);

    // We don't need to revert balances since they are only updated after confirmation
    console.log(`Transaction ${transactionId} cancelled successfully`);
    res.status(200).json({ message: "Transaction cancelled successfully" });
  } catch (error) {
    console.error("Cancel Transaction Error:", error.message);
    res.status(500).json({ message: "Failed to cancel transaction", error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Transaction Service running on port ${PORT}`);
});

module.exports = app;
