const {DataTypes} = require('sequelize')

const Post = db.define('posts',{
    postID: {
        // type: DataTypes.TEXT look into the uuid thing before final decision
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
        type: DataTypes.TINYINT
    },
})

module.exports =  Post