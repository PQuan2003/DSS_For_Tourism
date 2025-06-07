"use strict";

const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class POI_Activity extends Model {}
  POI_Activity.init(
    {
      poi_act_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      poi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      poi_act_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      poi_act_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      poi_act__img: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: {
            msg: "Invalid img URL",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "POI_Activity",
      tableName: "POI_Activities",
      timestamps: true,
    }
  );

  POI_Activity.associate = (models) => {
    POI_Activity.belongsTo(models.POI, {
      foreignKey: "poi_id",
      targetKey: "poi_id",
      onDelete: "CASCADE",
    });
  };

  module.exports = POI_Activity;
  return POI_Activity;
};
