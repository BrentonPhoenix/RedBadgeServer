const { DataTypes} = require('sequelize')
const db = require('../db')


//research how to make tables paranoid for 'policy and abuse' reasons. don't implement here probs too much work
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