const express = require('express')
const app = express()
const tasks = require('../starter/routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

require('dotenv').config()
//middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', tasks)
app.use(notFound)//if the middleware above doesnt work then this will wxecure
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;
//connectDB returns a promise 
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on ${port}...`))
    }catch(error){
        console.log(error)
    }
}
start()
//Rest API - a way to set up api - Representational State Transfer Application Programming Interface - in which we set the routes and resource seperately - json method is common format to send and recieve - we deviate the weight - we can use crud operation create read update delete

// MongoDB - NoSQL or non relational database by the name of monogoDB - in this store every thing in json unlike the traditional rows and columns method - it doesnt care how the data relates to each other - instead of we have collections which rep. collection , instead of rows we have doc which represents single item - a doc is set of key value pair and as far as data types we use everything like string array ....