"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class POI_Activity extends Model {
    static associate(models) {
      POI_Activity.belongsTo(models.POI, { foreignKey: "poi_id" });
      POI_Activity.belongsTo(models.Activity, { foreignKey: "activity_id" });
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
      activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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
