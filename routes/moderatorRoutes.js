const express=require('express');
const authenticate=require('../middlewares/authMiddleware')
const authorize=require('../middlewares/roleMiddleware');
const { resetUserPassword } = require('../controllers/moderatorController');


//router object
const router=express.Router();

// Only moderators can reset password of any user
router.put(
  '/resetpassword/:id', // Moderator will reset user password
  authenticate,          // First authenticate the user
  authorize(['Moderator']),  // Then authorize if the user is a Moderator
  resetUserPassword      // Controller for password reset
);

module.exports = router;