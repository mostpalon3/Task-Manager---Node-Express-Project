const mongoose = require('mongoose')

//using schema we set up structure for all the documents that eventually we'll have in our collection 

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        //validators
        required:[true,'must provide name'],
        trim:true,//removes extra whitespaces
        maxlength:[20,'name can not be more than 20 characters'],
    },
    completed:{
        type:Boolean,
        default:false,
    }
})

module.exports = mongoose.model('Task', TaskSchema)

//model is wrapper for the schema , schema provide the structure to the doc type vald. etc , model provide the interface to db crud our doc.