// "use strict";

// const sequelize = require("sequelize");
// const { Model, DataTypes } = require("sequelize");

// module.exports = (sequelize, DataTypes) => {
//   class POI_Activity extends Model {}
//   POI_Activity.init(
//     {
//       poi_act_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         unique: true,
//       },
//       poi_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       poi_act_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       poi_act_description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       poi_act_img: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isURL: {
//             msg: "Invalid img URL",
//           },
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: "POI_Activity",
//       tableName: "POI_Activities",
//       timestamps: true,
//     }
//   );

//   POI_Activity.associate = (models) => {
//     POI_Activity.belongsTo(models.POI, {
//       foreignKey: "poi_id",
//       targetKey: "poi_id",
//       onDelete: "CASCADE",
//     });
//   };

//   module.exports = POI_Activity;
//   return POI_Activity;
// };

"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class POI_Activity extends Model {
    static associate(models) {
      POI_Activity.belongsTo(models.POI, { foreignKey: "poi_id" });
    }
  }

  POI_Activity.init(
    {
      poi_act_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      poi_id: DataTypes.INTEGER,
      poi_act_name: DataTypes.STRING,
      poi_act_description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "POI_Activity",
      tableName: "POI_Activities",
      timestamps: true,
    }
  );

  return POI_Activity;
};
