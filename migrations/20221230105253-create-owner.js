'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Owners', {
      onwerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      shopName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      pwd: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ownerEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ownerPhone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ownerAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ownerPoint: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Owners');
  }
};