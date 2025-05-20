"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const TransactionModel = require("./transaction");
const env = process.env.ENV || "dev";
const config = require(__dirname + "/../config/config.js")[env];

let sequelize;
sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    
    // Sync the model
    await sequelize.sync({ alter: true });
    console.log("Database models synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
})();

// Initialize models
const Transaction = TransactionModel(sequelize, DataTypes);

// Export models and Sequelize instance
module.exports = {
  sequelize,
  Transaction,
  Sequelize,
  DataTypes,
};
