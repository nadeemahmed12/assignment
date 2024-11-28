const userModel = require("../models/user");
const bcrypt=require('bcryptjs');
const JWT=require('jsonwebtoken');

const registerController = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validation for missing fields
    if (!username || !password || !role) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields: username, password, and role",
      });
    }

    // Validate role against predefined roles (to avoid invalid roles being added)
    const allowedRoles = ['Admin', 'User', 'Moderator'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).send({
        success: false,
        message: `Invalid role provided. Allowed roles are: ${allowedRoles.join(', ')}`,
      });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Username already exists. Please try a different username.",
      });
    }

    // Hashing the password securely
    var salt=bcrypt.genSaltSync(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    // Creating a new user
    const user = await userModel.create({
      username,
      password: hashedPassword,
      role:role||'User',
    });

    // Respond with success
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,    //jo user a raha hai usko display
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error
    });
  }
};


//login
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input fields
    if (!username || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide both username and password",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT Token
    const token = JWT.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Exclude password in the response
    user.password = undefined;

    // Success response
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user, // Return user details except password
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error
    });
  }
};




module.exports={registerController,loginController};
