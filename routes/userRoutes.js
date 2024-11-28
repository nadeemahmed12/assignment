const express=require('express');

const authenticate=require('../middlewares/authMiddleware')
const authorize=require('../middlewares/roleMiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

//router object
const router=express.Router();

// Get user profile
router.get('/getprofile/:id', authenticate, authorize(['User', 'Moderator']), getUserProfile);

// Update user profile
router.put('/updateprofile', authenticate, authorize(['User', 'Moderator']), updateUserProfile);

module.exports = router;