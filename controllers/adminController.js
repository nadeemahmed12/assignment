const User = require('../models/user');


// Get All Users (Admin Access Only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Avoid sending passwords
    res.status(200).send({
      success: true,
      message: 'All users fetched successfully',
      users,
    });
  } catch (error) {
    console.log('Error in getAllUsers:', error);
    res.status(500).send({
      success: false,
      message: 'Error in fetching users',
      error,
    });
  }
};


// Get a Specific User by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    console.log('Error in getUserById:', error);
    res.status(500).send({
      success: false,
      message: 'Error in fetching user',
      error,
    });
  }
};


// Update User Role (Admin Access Only)
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate role
    const validRoles = ['Admin', 'User', 'Moderator'];
    if (!validRoles.includes(role)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid role provided',
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'User role updated successfully',
      user,
    });
  } catch (error) {
    console.log('Error in updateUserRole:', error);
    res.status(500).send({
      success: false,
      message: 'Error in updating user role',
      error,
    });
  }
};

// Delete User (Admin Access Only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'User deleted successfully',
      user,
    });
  } catch (error) {
    console.log('Error in deleteUser:', error);
    res.status(500).send({
      success: false,
      message: 'Error in deleting user',
      error,
    });
  }
};

module.exports = {
  getAllUsers,getUserById,
  updateUserRole,deleteUser

};