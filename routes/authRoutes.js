const express=require('express');
const { registerController, loginController } = require('../controllers/authController');

//router object
const router=express.Router();

//routes
//register
router.post('/register',registerController)

//login
router.post('/login',loginController);




//export
module.exports=router