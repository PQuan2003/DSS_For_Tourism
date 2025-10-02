"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Weather_Conditions extends Model {
    static associate(models) {
      Weather_Conditions.belongsTo(models.Place, { foreignKey: "place_id" });
    }
  }

  Weather_Conditions.init(
    {
      weather_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      place_id: DataTypes.INTEGER,
      month: DataTypes.ENUM(
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ),
      avg_temp: DataTypes.FLOAT,
      temp_unit: DataTypes.STRING,
      humidity: DataTypes.INTEGER,
      weather_type: DataTypes.ENUM(
        "Sunny",
        "Rainy",
        "Snowy",
        "Cloudy",
        "Windy",
        "Stormy",
        "Foggy",
        "Humid",
        "Hot",
        "Cool",
        "Dry"
      ),
    },
    {
      sequelize,
      modelName: "Weather_Conditions",
      tableName: "Weather",
      timestamps: true,
    }
  );

  return Weather_Conditions;
};
