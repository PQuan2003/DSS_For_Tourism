"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    static associate(models) {
      // Result.belongsTo(models.User_Preference, { foreignKey: "preference_id" });
      // Result.belongsTo(models.Preference_Group, {
      //   foreignKey: "preference_group_id",
      // });
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
      // preference_group_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      top_location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      preferences: {
        type: DataTypes.JSON,
        allowNull: false,

        get() {
          const raw = this.getDataValue("preferences");
          return raw ?? {};
        },

        set(value) {
          this.setDataValue("preferences", value);
        },
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
