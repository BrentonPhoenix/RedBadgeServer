const { DataTypes} = require('sequelize')


const Comment = db.define('comment', {
    commentID: {
        //pending extra reading
    },
    username: {
        //do i actually need this? i think we can get this from req.body of the POST method
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        require: true
    },
})

module.exports = Comment