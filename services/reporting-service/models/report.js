'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Report = sequelize.define('Report', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    reportType: {
      type: DataTypes.ENUM('DAILY', 'WEEKLY', 'MONTHLY'),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalTransactions: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalSent: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    totalReceived: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    generatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return Report;
};