'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OwnerWorkLists', {
      workId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ownerId: {
        type: Sequelize.INTEGER,
      },
      laundryId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OwnerWorkLists');
  }
};