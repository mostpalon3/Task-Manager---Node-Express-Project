const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const getAllTasks = asyncWrapper(async (req, res) => {
    //used asyncWrapper
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
})
const createTask = asyncWrapper(async (req,res) => {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
})
const getTask = asyncWrapper(async (req,res,next) => {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if (!task){
            //yha par ek naya error bana diye , jab task nai exist karta hai, so jab ye error fekega iske wjh se tp task handler me jab run hoga to wha check hoga kee kya ye error iss class ka instance hai?so hamara custom error run hoga
            return next(createCustomError(`No task with id: ${taskID}`,404))
            //we are creating the error msg ourself rather than getitng that from mongoosez
            // const error = new Error('Not Found');
            // error.status = 404;
            // return next(error)
            // return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        
        res.status(200).json({ task })
})
const deleteTasks = asyncWrapper(async (req,res) => {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID})
        if (!task){
            return next(createCustomError('No task with id: ${taskID}',404))
            // return res.status(404).json({ msg:`No task with id : ${ taskID }`})
        }

        res.status(200).json({task: null, status:'success'})
})
const updateTask = asyncWrapper(async (req,res) => {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators: true,
        })

        if (!task){
            return next(createCustomError('No task with id: ${taskID}',404))
            // return res.status(404).json({ msg:`No task with id : ${ taskID }`})
        }        
        res.status(200).json({ task })
})

// const editTask = async (req,res) => {
//     try {
//         const {id:taskID} = req.params; 
//         //if we dont use the options object we will be successfully but the updated value wont be fetched and seen in the patch section of the postman also we wont be able to use validator and can update a the data without validations , thats why option object is necessary 
//         const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
//             new:true,//this we return the updated value 
//             runValidators: true,//this will run the validator 
//             overwrite:true,//to change the value that is passed , and remove the rest value 
//         })
//         if (!task){
//             return res.status(404).json({ msg:`No task with id : ${ taskID }`})
//         }        
//         res.status(200).json({ task })
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// }

//difference in put and patch
// put - replaces the whole data 
//patch - just updates the changed data , so we can send only the required data not the whole , like here we have name and completed , if we change the name then the name will only be updated and the rest of them will remain unaffected , while in put everything gets replaced 
module.exports = { 
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTasks
}



//A MONGOOSE query has a .then() function , and thus can be used as a promise 
// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         //in axios the data property is already there , so here writing data is redundant , but has written in case if the frontend user may not use the data property 
//         // res.status(200).json({ status: 'success',data:{ tasks, nbHits: tasks.length } })
//         res.status(200).json({ tasks })
//     } catch (error) {
//         res.status(500).json({msg:error.message})
// }
// }
// const createTask = async (req,res) => {
//     try {
//         const task = await Task.create(req.body)
//         res.status(201).json({ task })
//     } catch (error) {
//         //500 is general server error
//         res.status(500).json({msg:error.message})
//     }
// }
// const getTask = async (req,res) => {
//     try {
//         const {id:taskID} = req.params
//         const task = await Task.findOne({_id:taskID})
//         if (!task){
//             //dont change the format of the id in postman while sending just replace the characters , nahi toh  it will be a format error that need seperate handling 
//             //return is necessary here if dont to send several response , which will throw the error called casterror
//             return res.status(404).json({msg: `No task with id: ${taskID}`})
//         }
        
//         res.status(200).json({ task })//this should be sent after if statememt is evaluated 
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// }
// const deleteTasks = async (req,res) => {
//     try {
//         const {id:taskID} = req.params;
//         const task = await Task.findOneAndDelete({_id:taskID})
//         if (!task){
//             return res.status(404).json({ msg:`No task with id : ${ taskID }`})
//         }
//         // res.status(200).json({task})
//         // res.status(200).send()
//         res.status(200).json({task: null, status:'success'})
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// }
// const updateTask = async (req,res) => {
//     try {
//         const {id:taskID} = req.params;
        
//         //if we dont use the options object we will be successfully but the updated value wont be fetched and seen in the patch section of the postman also we wont be able to use validator and can update a the data without validations , thats why option object is necessary 
//         const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
//             new:true,//this we return the updated value 
//             runValidators: true,//this will run the validator 
//         })

//         if (!task){
//             return res.status(404).json({ msg:`No task with id : ${ taskID }`})
//         }        
//         res.status(200).json({ task })
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// }