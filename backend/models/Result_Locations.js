"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Result_Location extends Model {
    static associate(models) {
      Result_Location.belongsTo(models.Result, { foreignKey: "result_id" });
      Result_Location.belongsTo(models.Place, { foreignKey: "place_id" });
    }
  }

  Result_Location.init(
    {
      result_location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      result_id: DataTypes.INTEGER,
      top_place_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Result_Location",
      tableName: "Result_Locations",
      timestamps: true,
    }
  );

  return Result_Location;
};
