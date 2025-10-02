"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
      Hotel.belongsTo(models.Place, { foreignKey: "place_id" });
    }
  }

  Hotel.init(
    {
      hotel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      place_id: DataTypes.INTEGER,
      hotel_name: DataTypes.STRING,
      hotel_description: DataTypes.TEXT,
      hotel_img: DataTypes.STRING,
      star_rating: DataTypes.FLOAT,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Hotel",
      tableName: "Hotels",
      timestamps: true,
    }
  );

  return Hotel;
};
