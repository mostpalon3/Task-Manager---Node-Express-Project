const mongoose = require('mongoose')

// mongoose.connect(connectionString).then(()=>console.log('CONNECTED TO THE DB ....'))
//     .catch((err) => console.log(err))

//if we invoke it here the db gets connected after the loading of the server which will ruin the app , so we will invoke it in app.js 


const connectDB = (url) => {
    return mongoose.connect(url).then(
        console.log('Connected to the DB')
    )
}

module.exports = connectDB