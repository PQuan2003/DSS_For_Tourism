"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Result, { foreignKey: "user_id" });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hashed_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [6, 999] },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
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
          if (user.hashed_password) {
            const salt = await bcrypt.genSalt();
            user.hashed_password = await bcrypt.hash(
              user.hashed_password,
              salt
            );
          }
          console.log(`[USER CREATED] ${user.username}`);
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt();
            user.hashed_password = await bcrypt.hash(
              user.hashed_password,
              salt
            );
            console.log(`[USER UPDATED] ${user.username}`);
          }
        },
      },
    }
  );

  return User;
};
