const express=require("express");
const router = express.Router();

const { createUser,getUserById,getUsers,updateUser,deleteUser } = require('../Controllers/userController');



router.post('/register',createUser);
router.get('/users',getUsers);
router.get('/user/:id',getUserById);
router.patch('/user',updateUser);
router.delete('/user',deleteUser);

  
module.exports= router;