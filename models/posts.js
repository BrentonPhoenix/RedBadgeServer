const {DataTypes} = require('sequelize')
const db = require('../db')


const Post = db.define('posts',{
    postID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    postTitle: {
        type: DataTypes.TEXT,
        allowNull: false,
        require: true
    },
    postContent: {
        type: DataTypes.TEXT(8000),
        allowNull: false,
        require: true
    },
    postKeywords: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.TEXT
    },
    order: {
        type: DataTypes.INTEGER
    },
})

module.exports =  Post