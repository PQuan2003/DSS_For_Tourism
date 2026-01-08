"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Preference_Group extends Model {
    static associate(models) {
      Preference_Group.belongsTo(models.User, { foreignKey: "user_id" });

      // Preference_Group.hasMany(models.User_Preference, {
      //   foreignKey: "preference_group",
      // });
    }
  }

  //   Preference_Group.init(
  //     {
  //       group_id: {
  //         type: DataTypes.INTEGER,
  //         primaryKey: true,
  //         autoIncrement: true,
  //       },
  //       user_id: {
  //         type: DataTypes.INTEGER,
  //         allowNull: false,
  //       },
  //     },
  //     {
  //       sequelize,
  //       modelName: "Preference_Group",
  //       tableName: "Preference_Groups",
  //       timestamps: true,
  //       createdAt: "created_at",
  //       updatedAt: false,
  //     }
  //   );

  //   return Preference_Group;
  // };

  Preference_Group.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      preferences: {
        type: DataTypes.JSON,
        allowNull: false,

        get() {
          const raw = this.getDataValue("preferences");
          return raw ?? {};
        },

        set(value) {
          this.setDataValue("preferences", value);
        },
      },
    },
    {
      sequelize,
      modelName: "Preference_Group",
      tableName: "Preference_Groups",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return Preference_Group;
};
