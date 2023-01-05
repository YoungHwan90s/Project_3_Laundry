
'use strict';
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ID: {
        type: DataTypes.INTEGER
      },
      pwd: {
        type: DataTypes.INTEGER
      },
      userName: {
        type: DataTypes.INTEGER,
      },
      userEmail: {
        type: DataTypes.INTEGER,
      },
      userPhone: {
        type: DataTypes.INTEGER,
      },
      userAddress: {
        type: DataTypes.INTEGER,
      },
      userPoint: {
        type: DataTypes.INTEGER,
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'User',
    }
  );
  return User;
};
