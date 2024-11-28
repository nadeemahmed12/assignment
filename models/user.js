const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

// Define roles separately for better management
const roles = ['Admin', 'User', 'Moderator'];

// User schema definition
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true, // Ensures no duplicate usernames
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: roles, // Validates role against predefined roles
    default: 'User',
  },
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);
