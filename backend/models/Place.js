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
      const tolerance = 0.1; // 10% tolerance
      const underTolerance = 0.5; // 50% tolerance before making the place have full score
      const bias = 0.05; // 5% advantage for under-budget

      let score = 0;
      // If user doesnt have either parameter in the request => use 0.5 for all places as default
      if (userBudget <= 0 || totalTravelDays <= 0)
        return {
          score: 0.5,
          totalBudgetNeeded: -1,
        };

      const totalBudgetNeeded = this.avg_cost_per_day * totalTravelDays;

      const difference = Math.abs(userBudget - totalBudgetNeeded);

      const percentageDiff = difference / totalBudgetNeeded;

      //over budget and out of tolerance
      if (userBudget < totalBudgetNeeded && percentageDiff > tolerance) {
        return {
          score: 0,
          totalBudgetNeeded,
        };
      }

      if (userBudget < totalBudgetNeeded) {
        // Over budget but within tolerance
        const ratio = percentageDiff / tolerance;
        score = 0.5 * (1 - ratio ** 2); // curve downward smoothly
        score = Math.max(0, score - bias * 0.5);
      } else {
        if (percentageDiff > underTolerance) {
          // Way under budget → max score
          return {
            score: 1,
            totalBudgetNeeded,
          };
        }

        // Under budget with smaller difference
        const ratio = percentageDiff / underTolerance;
        score = 0.5 + 0.5 * ratio ** 0.5; // sqrt curve - not linear, reward better score for being further under budget
        score = Math.min(score, 1);
      }
      return {
        score: Number(Math.max(0, Math.min(1, score)).toFixed(3)),
        totalBudgetNeeded,
      };
    }

    calculatedSceneryPoint(user_scenery_preferences) {
      //Default value when the user doesnt set their scenery preferences
      if (
        !Array.isArray(user_scenery_preferences) ||
        user_scenery_preferences.length === 0
      ) {
        return 0.5;
      }

      let placeTags = this.getDataValue("tags");
      if (!placeTags) {
        placeTags = [];
      } else if (typeof placeTags === "string") {
        try {
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

      // normalize
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

      const bias = 0.1;
      // additional matches add bias
      let score = 0.5 + bias * (matchesCount - 1);

      // cap at 1
      if (score > 1) score = 1;


      return Number(score.toFixed(3));
    }

    async calculatedActivityPoint(user_activity_preference) {
      if (
        !Array.isArray(user_activity_preference) ||
        user_activity_preference.length === 0
      ) {
        // console.log("Default option choosen", user_activity_preference);
        return 0.5;
      }

      // console.log("Running activity normally");
      const prefsLower = user_activity_preference.map((a) =>
        String(a).toLowerCase().trim()
      );

      const pois = await sequelize.models.POI.findAll({
        where: { place_id: this.place_id },
        include: [
          {
            model: sequelize.models.POI_Activity,
            include: [
              {
                model: sequelize.models.Activity,
                attributes: ["activity_name"],
              },
            ],
          },
        ],
      });


      const allActivityNames = pois.flatMap(
        (poi) =>
          poi.POI_Activities?.map((pa) =>
            pa.Activity?.activity_name?.toLowerCase().trim()
          ) || []
      );

      const matchedSet = new Set();
      for (const pref of prefsLower) {
        if (allActivityNames.includes(pref)) matchedSet.add(pref);
      }

      const matchesCount = matchedSet.size;

      if (matchesCount === 0)
        return {
          score: 0,
          place_activity_tags: allActivityNames,
        };
      if (matchesCount === 1)
        return {
          score: 0.5,
          place_activity_tags: allActivityNames,
        };

      const bias = 0.1;
      let score = 0.5 + bias * (matchesCount - 1);

      if (score > 1) score = 1;

      return {
        score: Number(score.toFixed(2)),
        place_activity_tags: allActivityNames,
      };
    }

    async calculatedWeatherPoint(user_weather_preference, travel_month) {
      if (!user_weather_preference) return { score: 0.5, weather_data: null };

      const weather = await sequelize.models.Weather_Conditions.findOne({
        where: {
          place_id: this.place_id,
          month: travel_month,  
        },
      });

      if (!weather) return { score: 0, weather_data: null };

      const { avg_temp, humidity, weather_type } = user_weather_preference;

      let tempScore = 0.5;
      if (avg_temp !== undefined && avg_temp !== null) {
        const tempDiff = Math.abs(weather.avg_temp - avg_temp);
        tempScore = Math.max(0, 1 - tempDiff / 20); // Max 20°C tolerance
      }

      let humidityScore = 0.5;
      if (humidity !== undefined && humidity !== null) {
        const humDiff = Math.abs(weather.humidity - humidity);
        humidityScore = Math.max(0, 1 - humDiff / 50); // 50% tolerance
      }

      let typeScore = 0.5;
      if (weather_type) {
        const weatherTypeLower = weather.weather_type?.toLowerCase().trim();
        const userTypeLower = weather_type.toLowerCase().trim();
        typeScore = weatherTypeLower === userTypeLower ? 1 : 0;
      }

      const totalScore = (tempScore + humidityScore + typeScore) / 3;

      return {
        score: Number(totalScore.toFixed(3)),
        weather_data: {
          month: weather.month,
          avg_temp: weather.avg_temp,
          humidity: weather.humidity,
          weather_type: weather.weather_type,
        },
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

/*Note: 
      structure:
      user_weather_preference = {
        avg_temp: 17,
        humidity: 50,
        weather_type: "Sunny"
      }
      travel_month = "Feb"
      
      score là avg của cả 3 category
      giả sử 1 trong 3 thiếu / ng dùng k điền thì cho default = 0.5

      json trả về: gồm điểm + 3 giá trị trên để tiện debug
      
*/



      //in testing
      /* 
      const bias = 0.1;
      const normalized = Math.min(1, (matchesCount - 1) / 5); // 5 or more matches = full score
      const curve = normalized ** 0.5; // non-linear curve for score increase
      let score = 0.5 + 0.5 * curve; // ranges smoothly 0.5–1
      score = Math.min(score, 1); 
       */