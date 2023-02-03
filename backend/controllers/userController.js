const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// @desc Log in a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean().exec();
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: `User ${user.name} (${email}) logged`,
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// @desc Get current user
// @route GET /api/users/me
// @access Private
const getLoggedInUser = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getLoggedInUser,
};
