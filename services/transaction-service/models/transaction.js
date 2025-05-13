"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // Define associations if needed
    }
  }

  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      senderUserId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      receiverUserId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("SENT", "COLLECTED"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "COMPLETED", "FAILED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );

  return Transaction;
};
