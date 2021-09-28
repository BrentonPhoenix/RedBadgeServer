require('dotenv').config()
const Express = require('express')
const app = Express()
const dbConnection = require('./db')
app.use(require('./middleware/headers'))
app.use(Express.json())



const controllers = require('./controllers')

// app.use(require('./middleware/headers'))


//----------------------------------------------------------
// app.use('/test', (req,res)=> {
//     res.send('testing endpoints on the server')
// }) ---------------------------------------------------WORKS


app.use('/users', controllers.userControllers)
app.use('/topic', controllers.topicControllers)
app.use('/posts', controllers.postControllers)
// app.use('/comment', controllers.commentControllers)


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