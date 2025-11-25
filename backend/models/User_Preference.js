"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User_Preference extends Model {
    static associate(models) {
      User_Preference.belongsTo(models.User, { foreignKey: "user_id" });
      // User_Preference.hasOne(models.Result, { foreignKey: "preference_id" });
      User_Preference.belongsTo(models.Preference_Group, {
        foreignKey: "preference_group",
      });
    }
  }

 
  User_Preference.init(
    {
      preference_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      preference_group: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM(
          "activities",
          "budget",
          "scenery",
          "duration",
          "weather"
        ),
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
    },
    {
      sequelize,
      modelName: "User_Preference",
      tableName: "User_Preferences",
      timestamps: true,
    }
  );

  return User_Preference;
};
