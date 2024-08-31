const {CustomAPIError} = require('../errors/custom-error')

const errorHandlerMiddleware = (err,req,res,next) => {
    //will check if the error occured is our custom api error , if not then it will work 
    //this will occur when there is no id present with given id
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    //this will occur when the syntax of the mongo id is altered 
    return res.status(500).json({ msg :'Something went wrong, please try again'})
}

module.exports = errorHandlerMiddleware