// "use strict";

// const sequelize = require("sequelize");
// const { Model, DataTypes } = require("sequelize");
// require("../models");

// module.exports = (sequelize, DataTypes) => {
//   class Result extends Model {}
//   Result.init(
//     {
//       result_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         unique: true,
//       },
//       preference_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       place_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: "Result",
//       tableName: "Results",
//       timestamps: true,
//     }
//   );

//   Result.associate = (models) => {
//     Result.belongsTo(models.User_Preference, {
//       foreignKey: "preference_id",
//       targetKey: "preference_id",
//       onDelete: "CASCADE",
//     });
//     Result.hasMany(models.Result_Location, {
//       foreignKey: "result_id",
//     });
//   };
//   module.exports = Result;
//   return Result;
// };

"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    static associate(models) {
      Result.belongsTo(models.User_Preference, { foreignKey: "preference_id" });
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
      preference_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
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
