const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:' + process.env.PASSWORD + '@localhost:5432/RedBadge')

module.exports = sequelize