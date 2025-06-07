"use strict";

const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");
require("../models");

module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {}
  Hotel.init(
    {
      hotel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      hotel_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      place_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
      },
      hotel_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hotel_img: {
        type: DataTypes.STRING,
        allowNull: false, //Can doi thanh default
        validate: {
          isURL: {
            msg: "Invalid img URL",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Hotel",
      tableName: "Hotels",
      timestamps: true,
    }
  );

  Hotel.associate = (models) => {
    Hotel.belongsTo(models.Place, {
      foreignKey: "place_id",
      targetKey: "place_id",
      onDelete: "CASCADE",
    });

    Hotel.hasMany(models.Hotel_Room, { foreignKey: "hotel_id" });
  };

  module.exports = Hotel;
  return Hotel;
};
