'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Owners', {
      ownerId: {
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
      },
      ownerPhone: {
        type: Sequelize.STRING,
      },
      ownerAddress: {
        type: Sequelize.STRING,
      },
      ownerPoint: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Owners');
  }
};