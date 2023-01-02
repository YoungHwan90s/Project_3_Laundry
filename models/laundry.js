'use strict';
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
  class Laundry extends Model {

    static associate(models) {
      // define association here
    }
  }

  Laundry.init(
    {
      laundryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      laundryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.BLOB('medium'),
        allowNull: true,
      },
      request: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Laundry',
    }
  );
  return Laundry;
};