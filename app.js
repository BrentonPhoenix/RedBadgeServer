require('dotenv').config()
const Express = require('express')
const app = Express()
const dbConnection = require('./db')

app.use(Express.json())

const controllers = require('./controllers')

// app.use(require('./middleware/headers'))


//----------------------------------------------------------
// app.use('/test', (req,res)=> {
//     res.send('testing endpoints on the server')
// }) ---------------------------------------------------WORKS


// app.use('/users', controllers.userController)
// app.use('/topic', controllers.topicController)
// app.use('/posts', controllers.postController)
app.use('/comment', controllers.commentController)


dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on HIDDEN PORT`)
        })
    })
    .catch((err) =>{
        console.log(`[Server]: Server crashed. Error = ${err}`)
    })