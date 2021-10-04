const {DataTypes } = require('sequelize')
const db = require('../db')

const Topic = db.define('topics', {
    TopicID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    TopicTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    url: {
        type: DataTypes.STRING(1000),
    },
    urlImgID: {
        type: DataTypes.STRING(1000)
    },
    Active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        require: true,
        defaultValue: true
    },
    Keywords: {
        type: DataTypes.STRING,
    },
    communityLocked: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        require: true,
        defaultValue: true
    }
})

module.exports = Topic