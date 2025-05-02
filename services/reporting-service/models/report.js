'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Report.init({
    id: DataTypes.UUID,
    userId: DataTypes.UUID,
    reportType: DataTypes.ENUM,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    totalTransactions: DataTypes.INTEGER,
    totalSent: DataTypes.DECIMAL,
    totalRecieved: DataTypes.DECIMAL,
    generatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};