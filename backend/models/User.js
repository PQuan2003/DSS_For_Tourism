'use strict';

const sequelize = require('sequelize')
const {Model, DataTypes} = require('sequelize')
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init({
    id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            defaultValue: 'user'+Date.now()+Math.floor(Math.random()*1000),
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: true,
    })

    return User
}