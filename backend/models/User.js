// "use strict";

// const sequelize = require("sequelize");
// const { Model, DataTypes } = require("sequelize");
// const bcrypt = require("bcrypt");

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {}
//   User.init(
//     {
//       user_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         unique: true,
//       },
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: "user" + Date.now() + Math.floor(Math.random() * 1000),
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [6, 999],
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: "User",
//       tableName: "Users",
//       timestamps: true,
//       hooks: {
//         beforeCreate: async (user) => {
//           if (user.password) {
//             const salt = await bcrypt.genSalt();
//             user.password = await bcrypt.hash(user.password, salt);
//           }
//           console.log(`[USER CREATED] ${user.email}`);
//         },
//         beforeUpdate: async (user) => {
//           if (user.changed("password")) {
//             const salt = await bcrypt.genSalt();
//             user.password = await bcrypt.hash(user.password, salt);
//             console.log(`[USER UPDATED] ${user.email}`);
//           }
//         },
//       },
//     }
//   );

//   User.associate = (models) => {
//     User.hasMany(models.User_Preference, { foreignKey: "user_id" });
//   };

//   module.exports = User;
//   return User;
// };

"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.User_Preference, { foreignKey: "user_id" });
      User.hasMany(models.Result, { foreignKey: "user_id" });
    }
  }

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
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [6, 999] },
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
          console.log(`[USER CREATED] ${user.username}`);
        },
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
            console.log(`[USER UPDATED] ${user.username}`);
          }
        },
      },
    }
  );

  return User;
};
