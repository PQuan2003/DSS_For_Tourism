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
      opening_hour: DataTypes.STRING,
      closing_hour: DataTypes.STRING,
      entry_fee: DataTypes.FLOAT, 
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
