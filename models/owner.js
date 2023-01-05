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
        autoIncrement: true,
        primaryKey: true
      },
      shopName: {
        type: DataTypes.INTEGER
      },
      pwd: {
        type: DataTypes.INTEGER
      },
      ownerEmail: {
        type: DataTypes.INTEGER,
      },
      ownerPhone: {
        type: DataTypes.INTEGER,
      },
      ownerAddress: {
        type: DataTypes.INTEGER,
      },
      ownerPoint: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Owner',
    }
  );
  return Owner;
};