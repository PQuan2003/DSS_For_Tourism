"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      Place.hasMany(models.POI, { foreignKey: "place_id" });
      Place.hasMany(models.Hotel, { foreignKey: "place_id" });
      Place.hasOne(models.Weather_Conditions, { foreignKey: "place_id" });
    }

    calculatedBudgetPoint(userBudget, totalTravelDays) {
      // console.log("This function is runningggggg");
      const tolerance = 0.1; // 10% tolerance
      const underTolerance = 0.5; // 50% tolerance before making the place have full score
      const bias = 0.05; // 5% advantage for under-budget

      let score = 0;
      // If user doesnt have either parameter in the request => use 0.75 for all places as default
      if (userBudget <= 0 || totalTravelDays <= 0)
        return {
          score: 0.75,
          totalBudgetNeeded: -1,
        };

      const totalBudgetNeeded = this.avg_cost_per_day * totalTravelDays;

      const difference = Math.abs(userBudget - totalBudgetNeeded);

      const percentageDiff = difference / totalBudgetNeeded;

      if (userBudget < totalBudgetNeeded && percentageDiff > tolerance) {
        if (userBudget <= 0 || totalTravelDays <= 0)
          return {
            score: 0,
            totalBudgetNeeded,
          };
      }

      if (userBudget < totalBudgetNeeded) {
        score = 0.75 * (1 - percentageDiff / tolerance);
      } else {
        if (percentageDiff > underTolerance) {
          return {
            score: 1,
            totalBudgetNeeded,
          };
        }

        score = 0.75 + 0.25 * (percentageDiff / tolerance);
        score = Math.max(0, score - bias); // penalty for over-budget
      }
      return {
        score: Math.max(0, Math.min(1, score)),
        totalBudgetNeeded,
      };
    }
  }

  Place.init(
    {
      place_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      place_name: DataTypes.STRING,
      country: DataTypes.STRING,
      money_unit: DataTypes.STRING,
      avg_cost_per_day: DataTypes.FLOAT,
      place_description: DataTypes.TEXT,
      place_img: DataTypes.STRING,
      tags: DataTypes.STRING,
      tourist_density: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Place",
      tableName: "Places",
      timestamps: true,
    }
  );

  return Place;
};
