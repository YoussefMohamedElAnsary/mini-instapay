"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const TransactionModel = require("./transaction");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
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
