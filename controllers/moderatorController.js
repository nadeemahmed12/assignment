const User = require('../models/user');
const bcrypt = require('bcryptjs');

const resetUserPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.params.id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    ).select('-password'); // Don't return the password in response

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'User password reset successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error in resetUserPassword:', error);
    res.status(500).send({
      success: false,
      message: 'Error in resetting password',
    });
  }
};

module.exports = { resetUserPassword };