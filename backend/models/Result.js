"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    static associate(models) {
      // Result.belongsTo(models.User_Preference, { foreignKey: "preference_id" });
      Result.belongsTo(models.Preference_Group, {
        foreignKey: "preference_group_id",
      });
      Result.belongsTo(models.User, { foreignKey: "user_id" });
      Result.hasMany(models.Result_Location, { foreignKey: "result_id" });
    }
  }

  Result.init(
    {
      result_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      preference_group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Result",
      tableName: "Results",
      timestamps: true,
    }
  );

  return Result;
};
