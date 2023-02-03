const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email }).lean().exec();
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Hash password 10 salt rounds
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: `New user ${name} (${email}) created`,
    });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

const loginUser = (req, res) => {
  res.send("Login Route");
};

module.exports = {
  registerUser,
  loginUser,
};
