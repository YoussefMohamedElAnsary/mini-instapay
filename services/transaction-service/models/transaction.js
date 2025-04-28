'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    id: DataTypes.UUID,
    senderUserId: DataTypes.UUID,
    receiverUserId: DataTypes.UUID,
    amount: DataTypes.DECIMAL,
    type: DataTypes.ENUM,
    status: DataTypes.ENUM,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};