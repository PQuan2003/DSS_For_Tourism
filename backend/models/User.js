"use strict";

const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user" + Date.now() + Math.floor(Math.random() * 1000),
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 999],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
          }
          console.log(`[USER CREATED] ${user.email}`);
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
            console.log(`[USER UPDATED] ${user.email}`);
          }
        },
      },
    }
  );

  User.associate = (models) => {
    User.hasMany(models.User_Preference, { foreignKey: "hotel_id" });
  };

  module.exports = User;
  return User;
};
