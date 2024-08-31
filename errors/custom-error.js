class CustomAPIError extends Error{
    constructor(message,statusCode){
        //it is invoked when we create a new isntance of the class 
        super(message)//we are extending error class so it takes all the constructor property from the parent class 
        this.statusCode = statusCode
    }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg,statusCode)  
} 

module.exports = {createCustomError, CustomAPIError};