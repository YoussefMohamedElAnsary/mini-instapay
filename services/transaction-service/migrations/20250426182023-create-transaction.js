'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      senderUserId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      receiverUserId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(19, 4),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('SENT', 'COLLECTED'),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'COMPLETED', 'FAILED'),
        allowNull: false,
        defaultValue: 'PENDING'
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};