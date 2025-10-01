// "use strict";

// const sequelize = require("sequelize");
// const { Model, DataTypes } = require("sequelize");

// module.exports = (sequelize, DataTypes) => {
//   class Place extends Model {}
//   Place.init(
//     {
//       place_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         unique: true,
//       },
//       place_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       place_description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       country: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       tags: {
//         type: DataTypes.JSON,
//         allowNull: false,
//         defaultValue: [],
//         validate: {
//           isJsonArray(value) {
//             if (!Array.isArray(value)) {
//               throw new Error("Must be an array");
//             }
//             if (
//               value.some((tag) => typeof tag !== "string" || tag.trim() === "")
//             ) {
//               throw new Error("All tags must be non-empty strings");
//             }
//           },
//         },
//       },
//       tourist_density: {
//         type: DataTypes.ENUM("low", "moderate", "high"),
//         allowNull: false,
//         validate: {
//           isIn: {
//             args: [["low", "moderate", "high"]],
//             msg: "Invalid status provided.",
//           },
//         },
//       },
//       avg_cost_per_day: {
//         type: DataTypes.DOUBLE,
//         defaultValue: 0.0,
//         validate: {
//           isFloat: {
//             msg: "Value must be a floating-point number",
//           },
//         },
//       },
//       money_unit: {
//         type: DataTypes.STRING(3),
//         allowNull: false,
//         validate: {
//           isIn: {
//             args: [["USD", "VND"]],
//             msg: "Invalid currency unit",
//           },
//           len: {
//             args: [3, 3],
//             msg: "Currency code must be 3 characters long",
//           },
//         },
//       },
//       place_img: {
//         type: DataTypes.STRING,
//         allowNull: false, //Can doi thanh default
//         validate: {
//           isURL: {
//             msg: "Invalid img URL",
//           },
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: "Place",
//       tableName: "Places",
//       timestamps: true,
//     }
//   );

//   Place.assosiate = (models) => {
//     Place.hasMany(models.Hotel, { foreignKey: "place_id" });
//     Place.hasMany(models.POI, { foreignKey: "place_id" });
//     Place.hasMany(models.Weather_Condition, { foreignKey: "place_id" });
//   };

//   module.exports = Place;
//   return Place;
// };

"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      Place.hasMany(models.POI, { foreignKey: "place_id" });
      Place.hasMany(models.Hotel, { foreignKey: "place_id" });
      Place.hasOne(models.Weather, { foreignKey: "place_id" });
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
