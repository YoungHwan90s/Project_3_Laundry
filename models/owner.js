'use strict';
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {

    static associate(models) {
      // define association here
    }
  }

  Owner.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      shopName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      pwd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerPhone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerPoint: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Owner',
    }
  );
  return Owner;
};