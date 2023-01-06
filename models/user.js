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
        type: DataTypes.STRING
      },
      pwd: {
        type: DataTypes.INTEGER
      },
      userName: {
        type: DataTypes.STRING,
      },
      userEmail: {
        type: DataTypes.STRING,
      },
      userPhone: {
        type: DataTypes.STRING,
      },
      userAddress: {
        type: DataTypes.STRING,
      },
      userPoint: {
        type: DataTypes.DATE,
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
