"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      // An activity can be linked to many POIs through POI_Activities
      Activity.hasMany(models.POI_Activity, { foreignKey: "activity_id" });
    }
  }

  Activity.init(
    {
      activity_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      activity_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      activity_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Activity",
      tableName: "activities",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Activity;
};
