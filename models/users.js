const {DataTypes} = require('sequelize')
const db = require('../db')

const User = db.define('users', {
    userID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(100),
        require: true,
        allowNull:false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        require: true,
        allowNull: false,
    },
    passwordKEY: {
        type: DataTypes.STRING(1000),
    },
    role: {
        type: DataTypes.STRING(50),
        requrie: true
    },
    bio: {
        type: DataTypes.TEXT,
    },
    urlProfilePic: {
        type: DataTypes.STRING(1000)
    },
    isBanned: {
        type: DataTypes.BOOLEAN,
        require: true,
        allowNull: false
    },
    // theme: {
    //    //unknown what will go here 
    // },
}) 

module.exports = User