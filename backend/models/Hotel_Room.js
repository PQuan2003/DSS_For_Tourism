"use strict";

const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Hotel_Room extends Model {}
  Hotel_Room.init(
    {
      room_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
        validate: {
          isFloat: {
            msg: "Value must be a floating-point number",
          },
        },
      },
      money_unit: {
        type: DataTypes.STRING(3),
        allowNull: false,
        validate: {
          isIn: {
            args: [["USD", "VND"]],
            msg: "Invalid currency unit",
          },
          len: {
            args: [3, 3],
            msg: "Currency code must be 3 characters long",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Hotel_Room",
      tableName: "Hotel_Rooms",
      timestamps: true,
    }
  );

  Hotel_Room.associate = (models) => {
    Hotel_Room.belongsTo(models.Hotel, {
      foreignKey: "hotel_id",
      targetKey: "hotel_id",
      onDelete: "CASCADE",
    });
  };

  module.exports = Hotel_Room;
  return Hotel_Room;
};
