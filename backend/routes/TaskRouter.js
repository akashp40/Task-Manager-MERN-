const router = require('express').Router();
const {createTask,fetchAllTasks,updateTaskById,deleteTaskById} = require('../controllers/TaskController')


//to get all the tasks
router.get("/",fetchAllTasks)
//To create Task
router.post("/tasks",createTask)
//to update a task
router.put("/:id",updateTaskById)
//to delete a task
router.delete("/:id",deleteTaskById)


module.exports = router;


