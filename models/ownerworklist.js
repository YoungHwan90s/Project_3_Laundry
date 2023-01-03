'use strict';
const { Model } = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
  class OwnerWorkList extends Model {

    static associate(models) {
      // define association here
    }
  }

  OwnerWorkList.init(
    {
      workId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ownerId: {
        type: DataTypes.INTEGER
      },
      laundryId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'OwnerWorkList',
    }
  );
  return OwnerWorkList;
};