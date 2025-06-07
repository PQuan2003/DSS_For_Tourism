"use strict";

const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");
const Place = require("./Place");

module.exports = (sequelize, DataTypes) => {
  class Weather_Conditions extends Model {}

  Weather_Conditions.init(
    {
      condition_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      place_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      month: {
        type: DataTypes.ENUM(
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ),
        allowNull: false,
        validate: {
          isIn: {
            args: [
              [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
            ],
            msg: "Invalid month",
          },
        },
      },
      weather: {
        type: DataTypes.ENUM("any", "sunny", "rainy", "warm", "cool", "cold"),
        defaultValue: "any",
        validate: {
          isIn: {
            args: [["any", "sunny", "rainy", "warm", "cool", "cold"]],
            msg: "Invalid weather",
          },
        },
      },
      temperature: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          isFloat: {
            msg: "Value must be a floating-point number.",
          },
        },
      },
      temperature_unit: {
        type: DataTypes.STRING(1),
        allowNull: false,
        validate: {
          isIn: {
            args: [["C", "F"]],
            msg: "Invalid temperature unit",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Weather_Condition",
      tableName: "Weather_Conditions",
      timestamps: true,
    }
  );

  Weather_Conditions.associate = (models) => {
    Weather_Conditions.belongsTo(models.Place, {
      foreignKey: "place_id",
      targetKey: "place_id",
      onDelete: "CASCADE",
    });
  };

  module.exports = Weather_Conditions;
  return Weather_Conditions;
};
