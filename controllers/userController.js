const User=require('../models/user');
const bcrypt=require('bcryptjs');
// Get user profile
const getUserProfile = async (req, res) => {
  try {
     const userId = req.user.id;
    // Access user from req.user (set in authorize middleware)
    const user = await User.findById(userId).select('-password');
    console.log(user);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'User profile fetched successfully',
      data: user,
    });
  } catch (error) {
    console.log('Error in getUserProfile:', error);
    res.status(500).send({
      success: false,
      message: 'Error in fetching user profile',
    });
  }
};

// Update user details (Including password update with current password check)
const updateUserProfile = async (req, res) => {
  try {
    const { currentpassword, newpassword, username } = req.body;

    // Find user using decoded token ID
    const user = await User.findById(req.user.id); // Use decoded user ID from token
    if (!user) {
      return res.status(400).send({ success: false, message: 'User not found' });
    }

    // If currentPassword is provided, check if it matches
    if (currentpassword && newpassword) {
      const isMatch = await bcrypt.compare(currentpassword, user.password);
      if (!isMatch) {
        return res.status(400).send({
            success: false,
            message: 'Current password is incorrect' });
      }

      // Hash the new password before updating
      user.password = await bcrypt.hash(newpassword, 10);
    }

    // If username is provided, update it
    if (username) {
      user.username = username;
    }

    // Save updated user details
    await user.save();

    // Remove password field from response for security
    const updatedUser = await User.findById(req.user.id).select('-password');

    res.status(200).send({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.log('Error in updateUserProfile:', error);
    res.status(500).send({
      success: false,
      message: 'Error in updating user profile',
    });
  }
};

module.exports={getUserProfile,updateUserProfile};