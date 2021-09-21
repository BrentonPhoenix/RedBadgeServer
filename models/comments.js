const { DataTypes} = require('sequelize')
const db = require('../db')

const Comment = db.define('comment', {
    commentID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        require: true
    },
})

module.exports = Comment