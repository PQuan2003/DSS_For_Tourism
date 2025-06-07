"use strict";

const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");
const User = require("./User");

const arrayOfStringValidation = (element, avaliable_array) => {
  if (typeof element !== "string" || element.trim() === "") {
    return true;
  }

  const normalizedElement = element.toLowerCase().trim();
  if (!avaliable_array.includes(avaliable_array)) {
    return true;
  }

  return false;
};

const avaliableScenery = [
  "beach",
  "mountains",
  "city",
  "forest",
  "desert",
  "countryside",
  "any",
];

const avaliableActivities = [
  "adventure",
  "cultural",
  "relaxation",
  "food",
  "history",
  "nightlife",
  "any",
];

module.exports = (sequelize, DataTypes) => {
  class User_Preference extends Model {}
  User_Preference.init(
    {
      preference_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      budget: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0.0,
        },
      },
      scenery: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
        validate: {
          isJsonArray(value) {
            if (!Array.isArray(value)) {
              throw new Error("Must be an array");
            }
            if (
              value.some((scenery) =>
                arrayOfStringValidation(scenery, avaliableScenery)
              )
            ) {
              throw new Error(
                "All choosen sceneries must be non-empty strings and are included in avaliable scenery"
              );
            }
          },
        },
      },
      travelling_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 1,
        validate: {
          isNumeric: true,
          min: 1,
        },
      },
      activities: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
        validate: {
          isJsonArray(value) {
            if (!Array.isArray(value)) {
              throw new Error("Must be an array");
            }
            if (
              value.some((activity) =>
                arrayOfStringValidation(activity, avaliableActivities)
              )
            ) {
              throw new Error(
                "All choosen activities must be non-empty strings and are included in avaliable activities"
              );
            }
          },
        },
      },
      preference_weight: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [1, 1, 1, 1, 1, 1, 1],
        validate: {
          isWeightArrayValid(value) {
            if (!Array.isArray(value)) {
              throw new Error("Field must be an array");
            }

            if (value.length !== 7) {
              throw new Error("Invalid weight array");
            }

            for (let index = 0; index < value.length; index++) {
              const weight_value = value[index];
              if (!Number.isInteger(weight_value)) {
                throw new Error(
                  `Weight value at index ${index} must be an integer`
                );
              }
              if (typeof weight_value !== "number" || weight_value < 1) {
                throw new Error(
                  `Weight value at index ${index} must be a positive number`
                );
              }
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User_Preference",
      tableName: "User_Preferences",
      timestamps: true,
    }
  );
  User_Preference.associate = (models) => {
    User_Preference.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "user_id",
      onDelete: "CASCADE",
    });
  };

  module.exports = User_Preference;
  return User_Preference;
};
