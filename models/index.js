// const db = require('../db')

const UserModel = require('./users')
const TopicModel = require('./topics')
const PostModel = require('./posts')
const CommentModel = require('./comments')
// const User = require('./users')



//ASSOICATIONS

//-----USER-----
UserModel.hasMany(TopicModel)
UserModel.hasMany(PostModel)
UserModel.hasMany(CommentModel)

//-----TOPIC-----
TopicModel.hasMany(PostModel)
TopicModel.belongsTo(UserModel)

//-----POST-----
PostModel.hasMany(CommentModel)
PostModel.belongsTo(TopicModel)
PostModel.belongsTo(UserModel)

//-----COMMENT-----
CommentModel.belongsTo(PostModel)
CommentModel.belongsTo(UserModel)

module.exports = {
    // dbConnection: db,
    UserModel,
    TopicModel,
    PostModel,
    CommentModel
}