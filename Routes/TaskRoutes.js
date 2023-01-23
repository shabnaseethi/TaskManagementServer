const express=require("express");
const router = express.Router();

const {createTask,getTasks,getTasksDone,getTaskByUser,updateTaskStatus,deleteTask,getTaskById,updateTaskById  } = require('../Controllers/TaskController');



router.post('/task',createTask);
router.post('/tasks',getTasks);
router.post('/tasksdone',getTasksDone);
router.get('/task/:id',getTaskByUser);
router.post('/tasks/:id',getTaskById);
router.post('/update/:id',updateTaskById);
router.post('/task/:id',updateTaskStatus);
router.delete('/task/:id',deleteTask);

  
module.exports= router;