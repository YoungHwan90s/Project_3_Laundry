'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      UserId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      pwd: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userName: {
        type: Sequelize.STRING,
      },
      userEmail: {
        type: Sequelize.STRING,
      },
      userPhone: {
        type: Sequelize.STRING,
      },
      userAddress: {
        type: Sequelize.STRING,
      },
      userPoint: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};