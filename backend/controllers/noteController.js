const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Note = require("../models/Note");

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

// @desc Get user notes
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).lean().exec();
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const notes = await Note.find({ user: req.user._id }).lean().exec();

  res.status(200).json(notes);
});

// @desc Create new note
// @route POST /api/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
  const { title, content, categories } = req.body;

  if (!title) {
    return res.status(400).json({ message: "The title is required" });
  }
  const user = await User.findById(req.user._id).lean().exec();
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const duplicatedTitle = await Note.findOne({ title }).lean().exec();
  if (duplicatedTitle) {
    return res.status(409).json({ message: "Duplicated title" });
  }

  const note = await Note.create({
    user,
    title,
    content,
    categories,
  });

  if (note) {
    res.status(201).json(note);
  } else {
    res.status(400).json({ message: "Invalid note data received" });
  }
});

module.exports = {
  getNotes,
  createNote,
};
