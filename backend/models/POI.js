// "use strict";

// const sequelize = require("sequelize");
// const { Model, DataTypes } = require("sequelize");

// module.exports = (sequelize, DataTypes) => {
//   class POI extends Model {}

//   POI.init(
//     {
//       poi_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         unique: true,
//       },
//       poi_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       place_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       poi_description: {
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
//       rating: {
//         type: DataTypes.DOUBLE,
//         allowNull: false,
//         validate: {
//           min: 0,
//           max: 5,
//         },
//       },
//       entry_fee: {
//         type: DataTypes.DOUBLE,
//         defaultValue: 0.0,
//         validate: {
//           isFloat: {
//             msg: "Value must be a floating-point number",
//           },
//         },
//       },
//       additional_fee: {
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
//       openingHour: {
//         type: DataTypes.TIME,
//         allowNull: false,
//         defaultValue: "08:00:00",
//         validate: {
//           is: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
//           isTimeFormat(value) {
//             const timeRegex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/;
//             if (!timeRegex.test(value)) {
//               throw new Error(
//                 "Opening hour must be in HH:MM:SS 24-hour format."
//               );
//             }
//           },
//         },
//       },
//       closingHour: {
//         type: DataTypes.TIME,
//         allowNull: false,
//         defaultValue: "20:00:00",
//         validate: {
//           is: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
//           isTimeFormat(value) {
//             const timeRegex = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/;
//             if (!timeRegex.test(value)) {
//               throw new Error(
//                 "Closing hour must be in HH:MM:SS 24-hour format."
//               );
//             }
//           },
//           isAfterOpeningHour(value) {
//             if (this.openingHour && value <= this.openingHour) {
//               throw new Error("Closing hour must be after opening hour.");
//             }
//           },
//         },
//       },
//       timezone: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       poi_img: {
//         type: DataTypes.STRING,
//         allowNull: false, //Can doi thanh default value sau
//         validate: {
//           isURL: {
//             msg: "Invalid img URL",
//           },
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: "POI",
//       tableName: "POIs",
//       timestamps: true,
//     }
//   );

//   POI.associate = (models) => {
//     POI.belongsTo(models.Place, {
//       foreignKey: "place_id",
//       targetKey: "place_id",
//       onDelete: "CASCADE",
//     });
//     POI.hasMany(models.POI_Activity, { foreignKey: "poi_id" });
//   };

//   module.exports = POI;
//   return POI;
// };

"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class POI extends Model {
    static associate(models) {
      POI.belongsTo(models.Place, { foreignKey: "place_id" });
      POI.hasMany(models.POI_Activity, { foreignKey: "poi_id" });
    }
  }

  POI.init(
    {
      poi_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      place_id: DataTypes.INTEGER,
      poi_name: DataTypes.STRING,
      poi_description: DataTypes.TEXT,
      poi_img: DataTypes.STRING,
      openingHour: DataTypes.STRING,
      closingHour: DataTypes.STRING,
      entry_fee: DataTypes.FLOAT,
      money_unit: DataTypes.STRING,
      additional_fee: DataTypes.FLOAT,
      rating: DataTypes.FLOAT,
      tags: DataTypes.STRING,
      timezone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "POI",
      tableName: "POIs",
      timestamps: true,
    }
  );

  return POI;
};
