const {DataTypes } = require('sequelize')


const Topic = db.define('topics', {
    TopicID: {
        // look into the uuid before final decision
    },
    TopicTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    url: {
        type: DataTypes.STRING(1000),
    },
    Active: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        require: true
    },
    Keywords: {
        type: DataTypes.STRING,
    },
    communityLocked: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        require: true  
    }
})

module.exports = Topic