const express=require('express')
const authenticate=require('../middlewares/authMiddleware')
const authorize=require('../middlewares/roleMiddleware');
const { getAllUsers, getUserById, updateUserRole, deleteUser } = require('../controllers/adminController');
//router object
const router=express.Router();

// Example: Admin-only route

router.get('/admin', authenticate, authorize(['Admin']), (req, res) => {
  res.send("Welcome, Admin!");
});


// Example: Moderator or Admin
router.get('/moderate', authenticate, authorize(['Admin', 'Moderator']), (req, res) => {
  res.send("Moderation panel");
});

//getalluserlist(admin)
router.get('/getallusers', authenticate, authorize(['Admin']), getAllUsers);


//getuniqueuserbyid
router.get('/get/:id',getUserById);

//update-user-role-admin-only
router.put('/update/:id',authenticate,authorize(['Admin']),updateUserRole);

//deleteuseronlybyadmin
router.delete('/delete/:id',authenticate,authorize(['Admin']),deleteUser);
//export
module.exports=router