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

    calculatedSceneryPoint(user_scenery_preferences) {
      if (
        !Array.isArray(user_scenery_preferences) ||
        user_scenery_preferences.length === 0
      ) {
        return 0.5;
      }
      const bias = 0.15; // increase per extra match after first
      let placeTags = this.getDataValue("tags");
      if (!placeTags) {
        placeTags = [];
      } else if (typeof placeTags === "string") {
        try {
          console.log("Defensive fallback run");
          placeTags = JSON.parse(placeTags);
        } catch (e) {
          placeTags = placeTags
            .replace(/[\[\]']/g, "") // remove [ ] and single quotes
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
        }
      }

      if (!Array.isArray(placeTags)) placeTags = [];

      // normalize to lowercase
      const userPrefsLower = user_scenery_preferences.map((p) =>
        String(p).toLowerCase().trim()
      );
      const tagsLower = placeTags.map((t) => String(t).toLowerCase().trim());

      // count unique matches (so duplicates in either list don't inflate score)
      const matchedSet = new Set();
      for (const pref of userPrefsLower) {
        if (tagsLower.includes(pref)) matchedSet.add(pref);
      }
      const matchesCount = matchedSet.size;
      if (matchesCount === 0) return 0; // no match = 0
      if (matchesCount === 1) return 0.5; // one match = 0.5

      // Additional matches increase score by bias
      let score = 0.5 + bias * (matchesCount - 1);

      // Cap at 1.0
      if (score > 1) score = 1;

      return Number(score.toFixed(2));
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
      // tags: DataTypes.STRING,
      tags: {
        type: DataTypes.JSON,
        allowNull: true,
        // getter: return an array always
        get() {
          const raw = this.getDataValue("tags");
          if (!raw) return [];
          if (Array.isArray(raw)) return raw;
          try {
            return JSON.parse(raw);
          } catch {
            // fallback for weird string format
            return String(raw)
              .replace(/[\[\]']/g, "")
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean);
          }
        },
        // setter: accept arrays and strings; store array directly for JSON column
        set(val) {
          if (Array.isArray(val)) {
            this.setDataValue("tags", val);
          } else {
            // leave as-is (Sequelize will stringify when storing in JSON column)
            this.setDataValue("tags", val);
          }
        },
      },
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
