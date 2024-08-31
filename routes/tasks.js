const express = require('express')
const router = express.Router()

const {getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTasks
} = require('../controllers/tasks')

// app.get('/api/v1/tasks', tasks) -get all the tasks 
//app.post('/api/v1/tasks) -create a new tasks
//app.get('/api/v1/tasks/:id') -get single task
// app.patch('/api/v1/tasks/:id') - update task
//app.delete(/api/v1/tasks/:id) - delete task

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTasks)


module.exports = router 