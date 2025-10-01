"use strict";

const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");
require("../models");

module.exports = (sequelize, DataTypes) => {
  class Result_Location extends Model {}
  Result_Location.init(
    {
      result_location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      result_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      location_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Result_Location",
      tableName: "Result_Locations",
      timestamps: true,
    }
  );

  Result_Location.associate = (models) => {
    Result_Location.belongsTo(models.Result, {
      foreignKey: "result_id",
    });
  };
  module.exports = Result_Location;
  return Result_Location;
};
